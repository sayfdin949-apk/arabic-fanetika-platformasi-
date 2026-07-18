-- Arab Fonetika Platformasi — Migration v12
-- FUNDAMENT: Supabase Auth (auth.users) + normal relatsion jadvallar
--
-- Bu migratsiya "Texnik Spetsifikatsiya v1.0" hujjatining 1-bosqichini
-- (Fundament) amalga oshiradi:
--   - Login endi haqiqiy Supabase Auth (auth.users, email+parol) orqali.
--     Eski bcrypt-in-JSONB (afp_login) va Telegram HMAC/parolsiz-ID
--     kirish usullari BU MIGRATSIYADAN KEYIN ishlatilmaydi (frontend
--     ularni chaqirmaydi). Eski RPC funksiyalari va afp_kv dagi "users"
--     kaliti hozircha o'chirilmaydi (xavfsiz orqaga qaytish uchun) —
--     keyingi "v13 cleanup" migratsiyasida olib tashlanadi.
--   - "profiles" jadvali — auth.users(id) ga 1:1 bog'langan profil:
--     rol, ism/familya, yo'nalish (tur), o'qituvchi bog'lanishi va h.k.
--   - Kelajakdagi bosqichlar (gamifikatsiya, topshiriqlar, AI) uchun
--     skeleton jadvallar: lessons, user_progress, achievements,
--     user_achievements, assignments, assignment_students, daily_activity.
--
-- Ishlatish: Supabase Dashboard → SQL Editor’da, v11 dan KEYIN, bitta marta
-- ishga tushiring. Production’da haqiqiy foydalanuvchi ma’lumoti yo‘q deb
-- kelishilgan — shuning uchun bu yerda afp_kv’dan profiles’ga ma’lumot
-- ko‘chirish (data migration) skripti YO‘Q. Agar kelajakda kerak bo‘lsa,
-- alohida bir martalik skript yozib qo‘shish kerak.

-- ============================================================
-- 1. profiles — har bir auth.users yozuviga mos profil
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id                     UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  login                  TEXT UNIQUE NOT NULL,
  email                  TEXT UNIQUE NOT NULL,
  ism                    TEXT NOT NULL DEFAULT '',
  familya                TEXT NOT NULL DEFAULT '',
  role                   TEXT NOT NULL CHECK (role IN ('ceo', 'teacher', 'assistant', 'student')),
  teacher_id             UUID REFERENCES profiles(id),
  avatar_url             TEXT,
  phone                  TEXT,
  tugilgan               TEXT,
  tur                    TEXT CHECK (tur IN ('fonetika', 'grammatika')),
  telegram_id            BIGINT,
  assistant_blocked_until TIMESTAMPTZ,
  assistant_rating       INT NOT NULL DEFAULT 100,
  xp_total               INT NOT NULL DEFAULT 0,
  streak_current         INT NOT NULL DEFAULT 0,
  streak_max             INT NOT NULL DEFAULT 0,
  is_active              BOOLEAN NOT NULL DEFAULT true,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_active            TIMESTAMPTZ
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Rol tekshiruvchi yordamchi funksiyalar — SECURITY DEFINER, chunki
-- profiles RLS ichida profiles'ga o'z-o'ziga murojaat qilish (recursive
-- policy) muammosini oldini oladi.
CREATE OR REPLACE FUNCTION current_profile_role() RETURNS TEXT
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION is_ceo() RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT current_profile_role() = 'ceo';
$$;

CREATE OR REPLACE FUNCTION is_teacher() RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT current_profile_role() = 'teacher';
$$;

CREATE OR REPLACE FUNCTION is_assistant() RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT current_profile_role() = 'assistant';
$$;

CREATE OR REPLACE FUNCTION is_staff() RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT current_profile_role() IN ('ceo', 'teacher', 'assistant');
$$;

-- SELECT: o'zi, CEO (hammasi), o'qituvchi (o'z o'quvchilari),
-- yordamchi (barcha o'quvchilar — o'qituvchiga yordam berish uchun)
DROP POLICY IF EXISTS profiles_select ON profiles;
CREATE POLICY profiles_select ON profiles FOR SELECT
  USING (
    id = auth.uid()
    OR is_ceo()
    OR (is_teacher() AND teacher_id = auth.uid())
    OR (is_assistant() AND role = 'student')
  );

-- INSERT: faqat service-role (Edge Function) orqali — authenticated/anon
-- uchun INSERT siyosati yo'q, shuning uchun RLS ularni avtomatik rad etadi.

-- UPDATE: o'zi (rol/teacher_id/xp/streak dan tashqari — quyidagi trigger
-- orqali cheklanadi), CEO (hammasi), o'qituvchi (faqat o'z o'quvchilari)
DROP POLICY IF EXISTS profiles_update ON profiles;
CREATE POLICY profiles_update ON profiles FOR UPDATE
  USING (
    id = auth.uid()
    OR is_ceo()
    OR (is_teacher() AND teacher_id = auth.uid())
  )
  WITH CHECK (
    id = auth.uid()
    OR is_ceo()
    OR (is_teacher() AND teacher_id = auth.uid())
  );

-- Trigger: rolni faqat CEO o'zgartira oladi; teacher_id, xp_total,
-- streak_* maydonlarini faqat CEO yoki o'qituvchi (o'z o'quvchisi uchun)
-- o'zgartira oladi — oddiy foydalanuvchi o'zini "ceo" qilib qo'ya olmaydi
-- yoki o'zига XP qo'sha olmaydi.
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
     AND NOT (is_ceo() OR is_teacher()) THEN
    RAISE EXCEPTION 'Ruxsat berilmagan';
  END IF;
  NEW.last_active := CASE WHEN NEW.id = auth.uid() THEN now() ELSE OLD.last_active END;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_profiles_update ON profiles;
CREATE TRIGGER trg_guard_profiles_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION guard_profiles_update();

CREATE INDEX IF NOT EXISTS idx_profiles_teacher_id ON profiles(teacher_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ============================================================
-- 2. lessons — dars metadatasi (kontentning o'zi hozircha
--    src/content/*.ts statik fayllarida qoladi; bu jadval faqat
--    progress/topshiriq bog'lash uchun "anchor")
-- ============================================================

CREATE TABLE IF NOT EXISTS lessons (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  track          TEXT NOT NULL CHECK (track IN ('fonetika', 'grammatika')),
  level          TEXT,
  order_index    INT NOT NULL DEFAULT 0,
  source_key     TEXT UNIQUE NOT NULL, -- masalan "naz:3", "amal:7", "gram:A1:5"
  duration_min   INT,
  is_published   BOOLEAN NOT NULL DEFAULT true,
  prerequisite_id UUID REFERENCES lessons(id),
  created_by     UUID REFERENCES profiles(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS lessons_select ON lessons;
CREATE POLICY lessons_select ON lessons FOR SELECT
  USING (is_published = true OR is_staff());

DROP POLICY IF EXISTS lessons_write ON lessons;
CREATE POLICY lessons_write ON lessons FOR ALL
  USING (is_ceo())
  WITH CHECK (is_ceo());

-- ============================================================
-- 3. user_progress — har bir foydalanuvchi/dars bo'yicha progress
-- ============================================================

CREATE TABLE IF NOT EXISTS user_progress (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id       UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status          TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  score           INT,
  attempts        INT NOT NULL DEFAULT 0,
  time_spent_sec  INT NOT NULL DEFAULT 0,
  completed_at    TIMESTAMPTZ,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS user_progress_select ON user_progress;
CREATE POLICY user_progress_select ON user_progress FOR SELECT
  USING (
    user_id = auth.uid()
    OR is_ceo()
    OR (is_teacher() AND user_id IN (SELECT id FROM profiles WHERE teacher_id = auth.uid()))
  );

DROP POLICY IF EXISTS user_progress_write ON user_progress;
CREATE POLICY user_progress_write ON user_progress FOR ALL
  USING (user_id = auth.uid() OR is_ceo())
  WITH CHECK (user_id = auth.uid() OR is_ceo());

CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);

-- ============================================================
-- 4. achievements / user_achievements — skeleton (award logikasi
--    keyingi "gamifikatsiya" bosqichida qo'shiladi)
-- ============================================================

CREATE TABLE IF NOT EXISTS achievements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS achievements_select ON achievements;
CREATE POLICY achievements_select ON achievements FOR SELECT USING (true);

DROP POLICY IF EXISTS achievements_write ON achievements;
CREATE POLICY achievements_write ON achievements FOR ALL
  USING (is_ceo()) WITH CHECK (is_ceo());

CREATE TABLE IF NOT EXISTS user_achievements (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS user_achievements_select ON user_achievements;
CREATE POLICY user_achievements_select ON user_achievements FOR SELECT
  USING (
    user_id = auth.uid()
    OR is_ceo()
    OR (is_teacher() AND user_id IN (SELECT id FROM profiles WHERE teacher_id = auth.uid()))
  );

DROP POLICY IF EXISTS user_achievements_write ON user_achievements;
CREATE POLICY user_achievements_write ON user_achievements FOR ALL
  USING (user_id = auth.uid() OR is_ceo())
  WITH CHECK (user_id = auth.uid() OR is_ceo());

-- ============================================================
-- 5. assignments / assignment_students — skeleton (o'qituvchi
--    paneli UI keyingi bosqichda qo'shiladi)
-- ============================================================

CREATE TABLE IF NOT EXISTS assignments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id     UUID NOT NULL REFERENCES profiles(id),
  lesson_id      UUID REFERENCES lessons(id),
  title          TEXT NOT NULL,
  description    TEXT,
  due_date       TIMESTAMPTZ,
  passing_score  INT NOT NULL DEFAULT 70,
  max_attempts   INT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS assignments_select ON assignments;
CREATE POLICY assignments_select ON assignments FOR SELECT
  USING (
    teacher_id = auth.uid()
    OR is_ceo()
    OR id IN (SELECT assignment_id FROM assignment_students WHERE student_id = auth.uid())
  );

DROP POLICY IF EXISTS assignments_write ON assignments;
CREATE POLICY assignments_write ON assignments FOR ALL
  USING (teacher_id = auth.uid() OR is_ceo())
  WITH CHECK (teacher_id = auth.uid() OR is_ceo());

CREATE TABLE IF NOT EXISTS assignment_students (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'graded')),
  score         INT,
  submitted_at  TIMESTAMPTZ,
  UNIQUE (assignment_id, student_id)
);

ALTER TABLE assignment_students ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS assignment_students_select ON assignment_students;
CREATE POLICY assignment_students_select ON assignment_students FOR SELECT
  USING (
    student_id = auth.uid()
    OR is_ceo()
    OR assignment_id IN (SELECT id FROM assignments WHERE teacher_id = auth.uid())
  );

DROP POLICY IF EXISTS assignment_students_write ON assignment_students;
CREATE POLICY assignment_students_write ON assignment_students FOR ALL
  USING (
    student_id = auth.uid()
    OR is_ceo()
    OR assignment_id IN (SELECT id FROM assignments WHERE teacher_id = auth.uid())
  )
  WITH CHECK (
    student_id = auth.uid()
    OR is_ceo()
    OR assignment_id IN (SELECT id FROM assignments WHERE teacher_id = auth.uid())
  );

-- ============================================================
-- 6. daily_activity — kunlik faollik (streak/heatmap uchun fundament;
--    hozircha ProgressContext streakni afp_kv'da saqlashda davom etadi,
--    bu jadval keyingi gamifikatsiya bosqichida ishlatiladi)
-- ============================================================

CREATE TABLE IF NOT EXISTS daily_activity (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  lessons_done INT NOT NULL DEFAULT 0,
  xp_earned    INT NOT NULL DEFAULT 0,
  UNIQUE (user_id, activity_date)
);

ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS daily_activity_select ON daily_activity;
CREATE POLICY daily_activity_select ON daily_activity FOR SELECT
  USING (
    user_id = auth.uid()
    OR is_ceo()
    OR (is_teacher() AND user_id IN (SELECT id FROM profiles WHERE teacher_id = auth.uid()))
  );

DROP POLICY IF EXISTS daily_activity_write ON daily_activity;
CREATE POLICY daily_activity_write ON daily_activity FOR ALL
  USING (user_id = auth.uid() OR is_ceo())
  WITH CHECK (user_id = auth.uid() OR is_ceo());

-- ============================================================
-- 7. Fonetika (nazariy) darslarni "lessons" metadata sifatida urug'lash
--    — bu fundament ishlaganini isbotlaydigan birinchi real oqim uchun
--    (ProgressContext.submitNaz endi user_progress'ga ham yozadi).
--    Sarlavhalar hozircha umumiy ("Nazariy dars N") — haqiqiy nomlar
--    src/content/nazariy.ts'da qoladi (UI o'shandan o'qiydi); bu jadval
--    faqat progress/topshiriq/CEO-analitika bog'lash uchun ishlatiladi.
--    Amaliy (fonetika mashq) va grammatika darslari uchun xuddi shunday
--    urug'lash keyingi bosqichda (gamifikatsiya/topshiriqlar) qo'shiladi.
-- ============================================================

INSERT INTO lessons (title, track, order_index, source_key, is_published)
SELECT 'Nazariy dars ' || n, 'fonetika', n, 'naz:' || n, true
FROM generate_series(1, 28) AS n
ON CONFLICT (source_key) DO NOTHING;

-- ============================================================
-- Eslatma: eski afp_kv/afp_secrets/afp_messages va afp_login/afp_add_user/
-- afp_session_user kabi RPC funksiyalari BU MIGRATSIYADA o'zgarmaydi —
-- ular hali ham mavjud (orqaga qaytish imkoniyati uchun), lekin frontend
-- ulardan endi foydalanmaydi. Yangi auth ishlashi tasdiqlangach, alohida
-- "v13 cleanup" migratsiyasida quyidagilar o'chiriladi:
--   afp_login, afp_login_telegram_secure, afp_student_login_by_telegram_id,
--   afp_verify_telegram_init_data, afp_make_session_token, afp_session_user,
--   afp_add_user, afp_remove_user, afp_patch_user (users bo'yicha),
--   afp_update_profile, afp_change_password, afp_admin_reset_password,
--   va afp_kv ichidagi "users" qatori.
