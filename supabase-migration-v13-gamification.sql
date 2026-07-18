-- Arab Fonetika Platformasi — Migration v13
-- GAMIFIKATSIYA: XP, Yutuqlar, Reyting (Spec 2-bosqichi)
--
-- 1-bosqich (v12) `profiles.xp_total/streak_current/streak_max` ustunlarini
-- va bo'sh `achievements`/`user_achievements`/`daily_activity`/`user_progress`
-- jadvallarini qo'shgan edi, lekin ularni to'ldiradigan hech qanday mantiq
-- yo'q edi. Bu migratsiya haqiqiy award-mexanizmini qo'shadi.
--
-- MUHIM — xavfsizlik teshigi yopiladi: v12'da `user_achievements` va
-- `daily_activity` jadvallarining YOZISH siyosati `user_id = auth.uid()`
-- edi — bu degani, har qanday o'quvchi brauzer konsolidan
-- `supabase.from('user_achievements').insert(...)` chaqirib, o'ziga
-- istalgan yutuqni bera olardi. Bu yerda bu ikkala jadvalning yozish
-- huquqi CEO-only qilinadi — haqiqiy yozish faqat quyidagi SECURITY
-- DEFINER RPC funksiyalari orqali (jadval egasi sifatida, RLS'ni
-- chetlab) amalga oshadi.
--
-- `profiles.xp_total`/`streak_*` uchun v12'da qo'yilgan
-- `guard_profiles_update()` trigger endi ham kerak (rolni/teacher_id'ni
-- o'zboshimchalik bilan o'zgartirishni to'xtatadi), lekin RPC'lar server
-- tomonida tekshirilgan XP/streak yangilanishlarini kirita olishi kerak —
-- shuning uchun trigger `afp.system_write` mahalliy (transaction-local)
-- sozlamasini ham tekshiradigan qilib yangilanadi; RPC'lar shu sozlamani
-- yozishdan oldin yoqadi.
--
-- Ishlatish: Supabase Dashboard → SQL Editor'da, v12 dan KEYIN, bitta
-- marta ishga tushiring.

-- ============================================================
-- 1. RLS qattiqlashtirish — user_achievements / daily_activity
-- ============================================================

DROP POLICY IF EXISTS user_achievements_write ON user_achievements;
CREATE POLICY user_achievements_write ON user_achievements FOR ALL
  USING (is_ceo())
  WITH CHECK (is_ceo());

DROP POLICY IF EXISTS daily_activity_write ON daily_activity;
CREATE POLICY daily_activity_write ON daily_activity FOR ALL
  USING (is_ceo())
  WITH CHECK (is_ceo());

-- `user_progress`ning yozish siyosati (`user_id = auth.uid()`) BU
-- MIGRATSIYADA o'zgarmaydi — buni to'liq yopish uchun test/mashq
-- baholashni ham server tomoniga ko'chirish kerak bo'lardi (kontent hali
-- klientda, katta alohida ish). Hujjatlashtirilgan, qoldirilgan cheklov.

-- ============================================================
-- 2. guard_profiles_update — RPC'lar uchun ishonchli yozish yo'li
-- ============================================================

CREATE OR REPLACE FUNCTION guard_profiles_update() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.role <> OLD.role AND NOT is_ceo() THEN
    RAISE EXCEPTION 'Faqat CEO rolni o''zgartira oladi';
  END IF;
  IF (NEW.teacher_id IS DISTINCT FROM OLD.teacher_id
      OR NEW.xp_total <> OLD.xp_total
      OR NEW.streak_current <> OLD.streak_current
      OR NEW.streak_max <> OLD.streak_max
      OR NEW.is_active <> OLD.is_active)
     AND NOT (is_ceo() OR is_teacher() OR current_setting('afp.system_write', true) = 'on') THEN
    RAISE EXCEPTION 'Ruxsat berilmagan';
  END IF;
  NEW.last_active := CASE WHEN NEW.id = auth.uid() THEN now() ELSE OLD.last_active END;
  RETURN NEW;
END;
$$;

-- ============================================================
-- 3. bump_streak — kunlik faollik asosida streakni yangilaydi
--    (faqat ichki RPC'lar chaqiradi — client'ga ochilmaydi)
-- ============================================================

CREATE OR REPLACE FUNCTION bump_streak(p_user_id UUID)
RETURNS TABLE(streak_current INT, streak_max INT, is_new_day BOOLEAN)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  last_date DATE;
  cur INT;
  mx INT;
  new_day BOOLEAN := false;
BEGIN
  SELECT MAX(activity_date) INTO last_date FROM daily_activity
    WHERE user_id = p_user_id AND activity_date < CURRENT_DATE;
  SELECT p.streak_current, p.streak_max INTO cur, mx FROM profiles p WHERE p.id = p_user_id;

  IF NOT EXISTS (SELECT 1 FROM daily_activity WHERE user_id = p_user_id AND activity_date = CURRENT_DATE) THEN
    new_day := true;
    IF last_date = CURRENT_DATE - 1 THEN
      cur := cur + 1;
    ELSE
      cur := 1;
    END IF;
    mx := GREATEST(mx, cur);
    PERFORM set_config('afp.system_write', 'on', true);
    UPDATE profiles SET streak_current = cur, streak_max = mx WHERE id = p_user_id;
  END IF;

  RETURN QUERY SELECT cur, mx, new_day;
END;
$$;

REVOKE ALL ON FUNCTION bump_streak(UUID) FROM PUBLIC;

-- ============================================================
-- 4. record_lesson_complete — dars/mashq tugallanganda XP+streak+
--    user_progress+yutuqlarni bitta atomik amalda yangilaydi.
--
--    Farming'ga qarshi: to'liq XP faqat DARSNI BIRINCHI MARTA
--    tugallashda beriladi; qayta topshirishda faqat ball OLDINGISIDAN
--    YUQORI bo'lsa, farqi beriladi — past/teng balldan XP berilmaydi.
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
-- 5. touch_daily_activity — darsga bog'lanmagan faoliyat (o'yin,
--    grammatika mashqi va h.k) uchun streak + kichik kunlik XP.
--    Kuniga bir marta +5 XP (spec 09: "Kunlik streak saqlanishi: +5 XP").
-- ============================================================

CREATE OR REPLACE FUNCTION touch_daily_activity() RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid UUID := auth.uid();
  streak_row RECORD;
  xp_gain INT := 0;
  already_today BOOLEAN;
  is_first_ever BOOLEAN;
  achv_id UUID;
  new_achievements JSONB := '[]'::jsonb;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Sessiya topilmadi';
  END IF;

  SELECT EXISTS(SELECT 1 FROM daily_activity WHERE user_id = uid AND activity_date = CURRENT_DATE) INTO already_today;
  SELECT NOT EXISTS(SELECT 1 FROM daily_activity WHERE user_id = uid) INTO is_first_ever;

  IF NOT already_today THEN
    xp_gain := 5;
  END IF;

  PERFORM set_config('afp.system_write', 'on', true);

  INSERT INTO daily_activity (user_id, activity_date, lessons_done, xp_earned)
  VALUES (uid, CURRENT_DATE, 0, xp_gain)
  ON CONFLICT (user_id, activity_date) DO NOTHING;

  IF xp_gain > 0 THEN
    UPDATE profiles SET xp_total = xp_total + xp_gain WHERE id = uid;
  END IF;

  SELECT * INTO streak_row FROM bump_streak(uid);

  IF is_first_ever THEN
    SELECT id INTO achv_id FROM achievements WHERE code = 'first_login';
    IF achv_id IS NOT NULL THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, achv_id) ON CONFLICT DO NOTHING;
      new_achievements := jsonb_build_array(jsonb_build_object('code', 'first_login'));
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'ok', true,
    'xpEarned', xp_gain,
    'streakCurrent', streak_row.streak_current,
    'newAchievements', new_achievements
  );
END;
$$;

GRANT EXECUTE ON FUNCTION touch_daily_activity() TO authenticated;

-- ============================================================
-- 6. check_profile_achievement — profil to'liq to'ldirilganda
--    "profile_complete" yutug'ini beradi.
-- ============================================================

CREATE OR REPLACE FUNCTION check_profile_achievement() RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid UUID := auth.uid();
  p RECORD;
  achv_id UUID;
BEGIN
  IF uid IS NULL THEN
    RETURN;
  END IF;
  SELECT ism, familya, phone, tugilgan, avatar_url INTO p FROM profiles WHERE id = uid;
  IF COALESCE(trim(p.ism), '') <> ''
     AND COALESCE(trim(p.familya), '') <> ''
     AND COALESCE(trim(p.phone), '') <> ''
     AND COALESCE(trim(p.tugilgan), '') <> ''
     AND COALESCE(trim(p.avatar_url), '') <> '' THEN
    SELECT id INTO achv_id FROM achievements WHERE code = 'profile_complete';
    IF achv_id IS NOT NULL THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, achv_id) ON CONFLICT DO NOTHING;
    END IF;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION check_profile_achievement() TO authenticated;

-- ============================================================
-- 7. Reyting (Leaderboard) — profiles'ning to'liq RLS'ini bo'shatish
--    o'rniga, faqat xavfsiz maydonlarni (email/telefon/login YO'Q)
--    ko'rsatuvchi VIEW/RPC. View/funksiya egasi (postgres) profiles'ning
--    RLS'ini chetlab o'tadi, lekin faqat quyidagi ustunlarni qaytaradi.
-- ============================================================

CREATE OR REPLACE VIEW leaderboard_public AS
SELECT id, ism, familya, avatar_url, xp_total, streak_current, teacher_id
FROM profiles
WHERE role = 'student' AND is_active = true;

GRANT SELECT ON leaderboard_public TO authenticated;

CREATE OR REPLACE FUNCTION leaderboard_period(p_since TIMESTAMPTZ)
RETURNS TABLE(id UUID, ism TEXT, familya TEXT, avatar_url TEXT, teacher_id UUID, period_xp BIGINT)
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT p.id, p.ism, p.familya, p.avatar_url, p.teacher_id,
         COALESCE(SUM(da.xp_earned), 0)::BIGINT AS period_xp
  FROM profiles p
  LEFT JOIN daily_activity da ON da.user_id = p.id AND da.activity_date >= p_since::date
  WHERE p.role = 'student' AND p.is_active = true
  GROUP BY p.id, p.ism, p.familya, p.avatar_url, p.teacher_id
  ORDER BY period_xp DESC;
$$;

GRANT EXECUTE ON FUNCTION leaderboard_period(TIMESTAMPTZ) TO authenticated;

-- ============================================================
-- 8. Yutuqlar katalogi (boshlang'ich to'plam, spec 09-bo'lim)
-- ============================================================

INSERT INTO achievements (code, title, description, icon) VALUES
  ('streak_7', '7 kunlik seriya', '7 kun ketma-ket mashq qildingiz', '🔥'),
  ('streak_30', '30 kunlik seriya', '30 kun ketma-ket — ajoyib intizom', '🔥'),
  ('streak_100', '100 kunlik seriya', '100 kun ketma-ket — siz usta', '🔥'),
  ('lessons_1', 'Birinchi dars', 'Birinchi darsni tugatdingiz', '📚'),
  ('lessons_10', '10 dars', '10 ta darsni tugatdingiz', '📚'),
  ('lessons_50', '50 dars', '50 ta darsni tugatdingiz', '📚'),
  ('lessons_100', '100 dars', '100 ta darsni tugatdingiz', '📚'),
  ('perfect_score', 'Mukammal ball', 'Darsni 100% ball bilan tugatdingiz', '🎯'),
  ('first_login', 'Birinchi qadam', 'Platformaga birinchi marta kirdingiz', '🌟'),
  ('profile_complete', 'Profil to''ldirildi', 'Profil ma''lumotlaringizni to''ldirdingiz', '🌟')
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- 9. Amaliy (fonetika mashqi) va grammatika darslarini "lessons"ga
--    urug'lash — v12'dagi "naz:" patterni bilan bir xil.
-- ============================================================

INSERT INTO lessons (title, track, order_index, source_key, is_published)
SELECT 'Amaliy bob ' || n, 'fonetika', 100 + n, 'amal:' || n, true
FROM generate_series(1, 20) AS n
ON CONFLICT (source_key) DO NOTHING;

INSERT INTO lessons (title, track, order_index, source_key, is_published)
SELECT 'Grammatika darsi ' || n, 'grammatika', n, 'gram:' || n, true
FROM generate_series(1, 21) AS n
ON CONFLICT (source_key) DO NOTHING;

-- ============================================================
-- Eslatma: v12'dagi eski RPC/auth cleanup ishi ("v13 cleanup" deb
-- forward-reference qilingan edi) BU FAYLDA emas — u endi kelajakdagi
-- alohida "v14 cleanup" migratsiyasiga qoldiriladi, chunki bu fayl
-- gamifikatsiya uchun band qilindi.
-- ============================================================
