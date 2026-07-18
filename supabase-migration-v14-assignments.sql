-- Arab Fonetika Platformasi — Migration v14
-- TOPSHIRIQLAR (Assignments) — Spec 3-bosqichi
--
-- 1-bosqich (v12) `assignments`/`assignment_students` skeleton jadvallarini
-- RLS bilan yaratgan edi, lekin UI yo'q edi. Bu migratsiya:
--
--   1) Xavfsizlik teshigini yopadi: `assignment_students`ning yozish
--      siyosati `student_id = auth.uid()` edi — bu o'quvchiga o'z holatini
--      ("status"/"score") to'g'ridan-to'g'ri o'zgartirishga (hech narsa
--      qilmasdan o'ziga "graded"/100 ball qo'yishga) ruxsat berardi. Endi
--      to'g'ridan-to'g'ri yozish faqat CEO/teacher uchun (topshiriq
--      yaratish/fan-out) — o'quvchi tomonidan "bajarildi" belgilanishi
--      esa AVTOMATIK, quyidagi kengaytirilgan RPC ichida.
--
--   2) `record_lesson_complete`ni kengaytiradi: dars/mashq tugallanganda
--      (nazariy/amaliy/grammatika — barchasi shu RPC orqali o'tadi) shu
--      darsga bog'langan topshiriqlar (`assignments.lesson_id`) bo'yicha
--      o'quvchining `assignment_students` qatori avtomatik
--      `status='graded'`, `score=eng yaxshi urinish %` bilan yangilanadi.
--      Barcha mavjud darslar test-asosli va avtomatik baholanadi, shuning
--      uchun qo'lda baholash UI'siga hozircha ehtiyoj yo'q.
--
-- Ishlatish: Supabase Dashboard → SQL Editor'da, v13 dan KEYIN, bitta
-- marta ishga tushiring.

-- ============================================================
-- 1. assignment_students — yozish siyosatini qattiqlashtirish
-- ============================================================

DROP POLICY IF EXISTS assignment_students_write ON assignment_students;
CREATE POLICY assignment_students_write ON assignment_students FOR ALL
  USING (
    is_ceo()
    OR assignment_id IN (SELECT id FROM assignments WHERE teacher_id = auth.uid())
  )
  WITH CHECK (
    is_ceo()
    OR assignment_id IN (SELECT id FROM assignments WHERE teacher_id = auth.uid())
  );

CREATE INDEX IF NOT EXISTS idx_assignment_students_student ON assignment_students(student_id);
CREATE INDEX IF NOT EXISTS idx_assignments_teacher ON assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_assignments_lesson ON assignments(lesson_id);

-- ============================================================
-- 2. record_lesson_complete — to'liq qayta e'lon qilinadi (v13'dagi tana
--    + topshiriq avtomatik-bajarish bloki, "assignment auto-grade" izohli
--    qismi yangi).
-- ============================================================

CREATE OR REPLACE FUNCTION record_lesson_complete(p_source_key TEXT, p_score_pct INT)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid UUID := auth.uid();
  lid UUID;
  prev RECORD;
  pct INT := GREATEST(0, LEAST(100, COALESCE(p_score_pct, 0)));
  xp_gain INT := 0;
  new_status TEXT;
  newly_perfect BOOLEAN := false;
  streak_row RECORD;
  completed_count INT;
  achievement_row RECORD;
  new_achievements JSONB := '[]'::jsonb;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Sessiya topilmadi';
  END IF;

  SELECT id INTO lid FROM lessons WHERE source_key = p_source_key;
  IF lid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Dars topilmadi (urug''lanmagan source_key)');
  END IF;

  SELECT status, score INTO prev FROM user_progress WHERE user_id = uid AND lesson_id = lid;
  new_status := CASE WHEN pct >= 60 THEN 'completed' ELSE 'in_progress' END;

  IF prev IS NULL OR prev.status IS DISTINCT FROM 'completed' THEN
    IF new_status = 'completed' THEN
      xp_gain := 10 + ROUND(20 * pct / 100.0);
      IF pct = 100 THEN
        xp_gain := xp_gain + 15;
        newly_perfect := true;
      END IF;
    END IF;
  ELSIF pct > prev.score THEN
    xp_gain := ROUND(20 * pct / 100.0) - ROUND(20 * prev.score / 100.0);
    IF pct = 100 AND prev.score < 100 THEN
      xp_gain := xp_gain + 15;
      newly_perfect := true;
    END IF;
  END IF;

  INSERT INTO user_progress (user_id, lesson_id, status, score, attempts, completed_at, updated_at)
  VALUES (uid, lid, new_status, pct, 1, CASE WHEN new_status = 'completed' THEN now() ELSE NULL END, now())
  ON CONFLICT (user_id, lesson_id) DO UPDATE SET
    status = CASE WHEN user_progress.status = 'completed' THEN 'completed' ELSE EXCLUDED.status END,
    score = GREATEST(user_progress.score, EXCLUDED.score),
    attempts = user_progress.attempts + 1,
    completed_at = COALESCE(user_progress.completed_at, EXCLUDED.completed_at),
    updated_at = now();

  -- v14: shu darsga (lid) bog'langan topshiriqlar bo'yicha o'quvchining
  -- assignment_students qatorini avtomatik bajarilgan/baholangan deb
  -- belgilaydi. SECURITY DEFINER funksiya jadval egasi nomidan ishlaydi,
  -- shuning uchun yuqoridagi qattiqlashtirilgan RLS'ni chetlab o'tadi —
  -- bu yerda alohida "afp.system_write" bayrog'iga hojat yo'q, chunki
  -- assignment_students'da (profiles'dagidek) guard trigger yo'q.
  UPDATE assignment_students SET
    status = 'graded',
    score = GREATEST(COALESCE(score, 0), pct),
    submitted_at = COALESCE(submitted_at, now())
  WHERE student_id = uid
    AND assignment_id IN (SELECT id FROM assignments WHERE lesson_id = lid);

  PERFORM set_config('afp.system_write', 'on', true);
  IF xp_gain > 0 THEN
    UPDATE profiles SET xp_total = xp_total + xp_gain WHERE id = uid;
  END IF;

  SELECT * INTO streak_row FROM bump_streak(uid);

  INSERT INTO daily_activity (user_id, activity_date, lessons_done, xp_earned)
  VALUES (uid, CURRENT_DATE, 1, xp_gain)
  ON CONFLICT (user_id, activity_date) DO UPDATE SET
    lessons_done = daily_activity.lessons_done + 1,
    xp_earned = daily_activity.xp_earned + xp_gain;

  SELECT count(*) INTO completed_count FROM user_progress WHERE user_id = uid AND status = 'completed';

  FOR achievement_row IN
    SELECT a.id, a.code FROM achievements a
    WHERE a.code IN (
      SELECT code FROM (VALUES
        ('lessons_1', completed_count >= 1),
        ('lessons_10', completed_count >= 10),
        ('lessons_50', completed_count >= 50),
        ('lessons_100', completed_count >= 100),
        ('streak_7', streak_row.streak_current >= 7),
        ('streak_30', streak_row.streak_current >= 30),
        ('streak_100', streak_row.streak_current >= 100),
        ('perfect_score', newly_perfect)
      ) AS conds(code, met) WHERE met
    )
    AND NOT EXISTS (SELECT 1 FROM user_achievements ua WHERE ua.user_id = uid AND ua.achievement_id = a.id)
  LOOP
    INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, achievement_row.id) ON CONFLICT DO NOTHING;
    new_achievements := new_achievements || jsonb_build_object('code', achievement_row.code);
  END LOOP;

  RETURN jsonb_build_object(
    'ok', true,
    'xpEarned', xp_gain,
    'streakCurrent', streak_row.streak_current,
    'newAchievements', new_achievements
  );
END;
$$;

GRANT EXECUTE ON FUNCTION record_lesson_complete(TEXT, INT) TO authenticated;

-- ============================================================
-- Eslatma — bu bosqichda ataylab qilinmagan narsalar:
--   - max_attempts hali majburlanmaydi (faqat saqlanadi/ko'rsatiladi).
--   - Muddat (due_date) o'tgach topshirish bloklanmaydi — faqat UI'da
--     vizual "muddati o'tdi" belgisi.
--   - Qo'lda baholash / erkin matn topshiriqlari yo'q — barcha hozirgi
--     darslar test-asosli, shuning uchun avtomatik baholash yetarli.
-- ============================================================
