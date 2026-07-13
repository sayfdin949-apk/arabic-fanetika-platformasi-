-- ═══════════════════════════════════════════════════════════════════
-- Arab Fonetika Platformasi — TO'LIQ SOZLASH (birinchi marta)
-- Supabase Dashboard → SQL Editor da shu faylni BUTUNLIGICHA
-- nusxalab ishga tushiring. Bir marta ishlatish kifoya.
--
-- DIQQAT: v4 dagi bot token ni to'ldirishni unutmang (quyida).
-- ═══════════════════════════════════════════════════════════════════

-- ── 0. Kengaytmalar ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── 1. Asosiy jadval (afp_kv) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS afp_kv (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE afp_kv ENABLE ROW LEVEL SECURITY;

-- ── 2. Maxfiy kalit jadval (afp_secrets) — RLS yopiq ───────────
CREATE TABLE IF NOT EXISTS afp_secrets (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
ALTER TABLE afp_secrets ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON afp_secrets FROM PUBLIC, anon, authenticated;

-- ── 3. Chat xabarlari jadval (afp_messages) ──────────────────────
CREATE TABLE IF NOT EXISTS afp_messages (
  id               TEXT PRIMARY KEY,
  guruh_id         TEXT NOT NULL,
  user_id          TEXT NOT NULL,
  user_ism_familya TEXT NOT NULL,
  user_role        TEXT NOT NULL,
  matn             TEXT NOT NULL,
  vaqt             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reply_to         JSONB
);
CREATE INDEX IF NOT EXISTS afp_messages_guruh_id_vaqt
  ON afp_messages (guruh_id, vaqt ASC);
ALTER TABLE afp_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "afp_messages_all" ON afp_messages
  FOR ALL USING (true) WITH CHECK (true);
ALTER PUBLICATION supabase_realtime ADD TABLE afp_messages;

-- ── 4. afp_kv uchun RLS siyosatlari ─────────────────────────────
DROP POLICY IF EXISTS "afp_open" ON afp_kv;
DROP POLICY IF EXISTS "afp_kv_select_non_users" ON afp_kv;
DROP POLICY IF EXISTS "afp_kv_insert_non_users" ON afp_kv;
DROP POLICY IF EXISTS "afp_kv_update_non_users" ON afp_kv;
DROP POLICY IF EXISTS "afp_kv_delete_non_users" ON afp_kv;

CREATE POLICY afp_kv_select_non_users ON afp_kv
  FOR SELECT USING (key <> 'users');
CREATE POLICY afp_kv_insert_non_users ON afp_kv
  FOR INSERT WITH CHECK (key <> 'users');
CREATE POLICY afp_kv_update_non_users ON afp_kv
  FOR UPDATE USING (key <> 'users') WITH CHECK (key <> 'users');
CREATE POLICY afp_kv_delete_non_users ON afp_kv
  FOR DELETE USING (key <> 'users');

-- ── 5. Ichki yordamchi funksiyalar (PUBLIC ga yopiq) ─────────────
CREATE OR REPLACE FUNCTION afp_users_raw() RETURNS JSONB
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE((SELECT value FROM afp_kv WHERE key = 'users'), '[]'::jsonb);
$$;
REVOKE ALL ON FUNCTION afp_users_raw() FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_save_users(p_users JSONB) RETURNS VOID
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  INSERT INTO afp_kv (key, value, updated_at) VALUES ('users', p_users, NOW())
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at;
$$;
REVOKE ALL ON FUNCTION afp_save_users(JSONB) FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_sanitize_user(u JSONB) RETURNS JSONB
LANGUAGE sql IMMUTABLE AS $$
  SELECT (u - 'parol');
$$;
REVOKE ALL ON FUNCTION afp_sanitize_user(JSONB) FROM PUBLIC;

-- ── 6. Sessiya tokeni tizimi ──────────────────────────────────────
CREATE OR REPLACE FUNCTION afp_get_or_create_session_secret() RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v TEXT;
BEGIN
  SELECT value INTO v FROM afp_secrets WHERE key = 'session_secret';
  IF v IS NULL THEN
    INSERT INTO afp_secrets (key, value)
      VALUES ('session_secret', encode(gen_random_bytes(32), 'hex'))
      ON CONFLICT (key) DO NOTHING;
    SELECT value INTO v FROM afp_secrets WHERE key = 'session_secret';
  END IF;
  RETURN v;
END;
$$;
REVOKE ALL ON FUNCTION afp_get_or_create_session_secret() FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_make_session_token(p_user_id TEXT) RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  secret TEXT;
  expiry BIGINT;
BEGIN
  secret := afp_get_or_create_session_secret();
  expiry := (extract(epoch FROM NOW()) + 30 * 86400)::BIGINT;
  RETURN p_user_id || '.' || expiry::TEXT || '.' ||
    encode(hmac(p_user_id || '.' || expiry::TEXT, secret, 'sha256'), 'hex');
END;
$$;
REVOKE ALL ON FUNCTION afp_make_session_token(TEXT) FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_session_user(p_token TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  parts TEXT[];
  uid TEXT; expiry BIGINT; sig TEXT; secret TEXT; expected TEXT; u JSONB;
BEGIN
  IF p_token IS NULL OR p_token = '' THEN RETURN NULL; END IF;
  parts := string_to_array(p_token, '.');
  IF array_length(parts, 1) <> 3 THEN RETURN NULL; END IF;
  uid := parts[1]; expiry := parts[2]::BIGINT; sig := parts[3];
  IF expiry < extract(epoch FROM NOW()) THEN RETURN NULL; END IF;
  secret := afp_get_or_create_session_secret();
  expected := encode(hmac(uid || '.' || expiry::TEXT, secret, 'sha256'), 'hex');
  IF expected IS DISTINCT FROM sig THEN RETURN NULL; END IF;
  SELECT u2 INTO u FROM jsonb_array_elements(afp_users_raw()) AS u2
    WHERE u2->>'id' = uid LIMIT 1;
  IF u IS NULL THEN RETURN NULL; END IF;
  RETURN jsonb_build_object('id', u->>'id', 'role', u->>'role');
EXCEPTION WHEN OTHERS THEN RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION afp_session_user(TEXT) FROM PUBLIC;

-- ── 7. Telegram HMAC tasdiqlash ───────────────────────────────────
-- ★ BOT TOKEN: 'PUT_YOUR_BOT_TOKEN_HERE' ni o'z bot tokeningiz bilan
--   almashtiring (faqat Telegram orqali kirish kerak bo'lsa).
--   Telegram Telegramdan foydalanmasangiz shu qatorni shu holda
--   qoldiravering — ilova login/parol bilan ishlashda davom etaveradi.
INSERT INTO afp_secrets (key, value)
  VALUES ('telegram_bot_token', 'PUT_YOUR_BOT_TOKEN_HERE')
  ON CONFLICT (key) DO NOTHING;

CREATE OR REPLACE FUNCTION afp_get_secret(p_key TEXT) RETURNS TEXT
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT value FROM afp_secrets WHERE key = p_key;
$$;
REVOKE ALL ON FUNCTION afp_get_secret(TEXT) FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_url_decode(p_input TEXT) RETURNS TEXT
LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE
  result TEXT := ''; i INT := 1; ch TEXT; hex TEXT; bytes BYTEA := ''::bytea;
BEGIN
  WHILE i <= length(p_input) LOOP
    ch := substr(p_input, i, 1);
    IF ch = '%' AND i + 2 <= length(p_input) THEN
      hex := substr(p_input, i + 1, 2);
      bytes := bytes || decode(hex, 'hex');
      i := i + 3;
    ELSE
      IF length(bytes) > 0 THEN
        result := result || convert_from(bytes, 'UTF8');
        bytes := ''::bytea;
      END IF;
      result := result || CASE WHEN ch = '+' THEN ' ' ELSE ch END;
      i := i + 1;
    END IF;
  END LOOP;
  IF length(bytes) > 0 THEN result := result || convert_from(bytes, 'UTF8'); END IF;
  RETURN result;
END;
$$;
REVOKE ALL ON FUNCTION afp_url_decode(TEXT) FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_verify_telegram_init_data(p_init_data TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  bot_token TEXT; secret_key BYTEA; pairs TEXT[]; pair TEXT; eq_pos INT;
  k TEXT; v TEXT; received_hash TEXT; check_pairs TEXT[] := '{}';
  data_check_string TEXT; computed_hash TEXT; auth_date BIGINT; user_json TEXT;
BEGIN
  bot_token := afp_get_secret('telegram_bot_token');
  IF bot_token IS NULL OR bot_token = '' OR bot_token = 'PUT_YOUR_BOT_TOKEN_HERE' THEN
    RETURN NULL;
  END IF;
  IF p_init_data IS NULL OR p_init_data = '' THEN RETURN NULL; END IF;
  pairs := string_to_array(p_init_data, '&');
  FOREACH pair IN ARRAY pairs LOOP
    eq_pos := position('=' IN pair);
    IF eq_pos = 0 THEN CONTINUE; END IF;
    k := substr(pair, 1, eq_pos - 1);
    v := afp_url_decode(substr(pair, eq_pos + 1));
    IF k = 'hash' THEN received_hash := v;
    ELSE
      check_pairs := array_append(check_pairs, k || '=' || v);
      IF k = 'auth_date' THEN auth_date := v::BIGINT; END IF;
      IF k = 'user' THEN user_json := v; END IF;
    END IF;
  END LOOP;
  IF received_hash IS NULL OR user_json IS NULL THEN RETURN NULL; END IF;
  IF auth_date IS NULL OR auth_date < (extract(epoch FROM NOW()) - 86400) THEN RETURN NULL; END IF;
  SELECT array_to_string(array_agg(p ORDER BY p), E'\n') INTO data_check_string
    FROM unnest(check_pairs) AS p;
  secret_key := hmac(bot_token, 'WebAppData', 'sha256');
  computed_hash := encode(hmac(convert_to(data_check_string, 'UTF8'), secret_key, 'sha256'), 'hex');
  IF computed_hash IS DISTINCT FROM received_hash THEN RETURN NULL; END IF;
  RETURN user_json::jsonb;
EXCEPTION WHEN OTHERS THEN RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION afp_verify_telegram_init_data(TEXT) FROM PUBLIC;

-- ── 8. Ommabop funksiyalar (anon ga ruxsat berilgan) ─────────────

-- Foydalanuvchilar ro'yxati (parolsiz)
CREATE OR REPLACE FUNCTION afp_get_users() RETURNS JSONB
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(jsonb_agg(afp_sanitize_user(u)), '[]'::jsonb)
  FROM jsonb_array_elements(afp_users_raw()) AS u;
$$;
GRANT EXECUTE ON FUNCTION afp_get_users() TO anon, authenticated;

-- Login (bcrypt solishtirish)
CREATE OR REPLACE FUNCTION afp_login(p_login TEXT, p_parol TEXT, p_role TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE found JSONB;
BEGIN
  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE lower(u->>'login') = lower(trim(p_login))
    AND (u->>'parol') = crypt(p_parol, u->>'parol')
    AND (u->>'role') = p_role
  LIMIT 1;
  IF found IS NULL THEN RETURN NULL; END IF;
  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_login(TEXT, TEXT, TEXT) TO anon, authenticated;

-- Telegram orqali kirish
CREATE OR REPLACE FUNCTION afp_login_telegram_secure(p_init_data TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE verified_user JSONB; tg_id BIGINT; found JSONB;
BEGIN
  verified_user := afp_verify_telegram_init_data(p_init_data);
  IF verified_user IS NULL THEN RETURN NULL; END IF;
  tg_id := (verified_user->>'id')::BIGINT;
  SELECT u INTO found FROM jsonb_array_elements(afp_users_raw()) AS u
    WHERE (u->>'telegramId')::BIGINT = tg_id LIMIT 1;
  IF found IS NULL THEN RETURN NULL; END IF;
  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_login_telegram_secure(TEXT) TO anon, authenticated;

-- Foydalanuvchi qo'shish (CEO va teacher ruxsat — teacher faqat student)
DROP FUNCTION IF EXISTS afp_add_user(JSONB);
DROP FUNCTION IF EXISTS afp_add_user(TEXT, JSONB);
CREATE FUNCTION afp_add_user(p_session_token TEXT, p_user JSONB) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB; caller_role TEXT; new_role TEXT;
  users JSONB; new_login TEXT := trim(p_user->>'login');
  new_id TEXT := 'u' || (extract(epoch FROM clock_timestamp()) * 1000)::BIGINT::TEXT;
  new_user JSONB; taken BOOLEAN;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Sessiya topilmadi');
  END IF;
  caller_role := caller->>'role';
  new_role    := p_user->>'role';
  IF caller_role = 'ceo' THEN
    NULL;
  ELSIF caller_role = 'teacher' THEN
    IF new_role <> 'student' THEN
      RETURN jsonb_build_object('ok', false, 'error', 'O''qituvchi faqat o''quvchi qo''sha oladi');
    END IF;
  ELSE
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  users := afp_users_raw();
  SELECT EXISTS (
    SELECT 1 FROM jsonb_array_elements(users) AS u
    WHERE lower(u->>'login') = lower(new_login)
  ) INTO taken;
  IF taken THEN RETURN jsonb_build_object('ok', false, 'error', 'Bu login band'); END IF;
  new_user := p_user || jsonb_build_object(
    'id', new_id, 'login', new_login,
    'parol', crypt(p_user->>'parol', gen_salt('bf'))
  );
  PERFORM afp_save_users(users || jsonb_build_array(new_user));
  RETURN jsonb_build_object('ok', true, 'user', afp_sanitize_user(new_user));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_add_user(TEXT, JSONB) TO anon, authenticated;

-- Foydalanuvchi o'chirish (CEO yoki teacher — teacher faqat student)
DROP FUNCTION IF EXISTS afp_remove_user(TEXT);
DROP FUNCTION IF EXISTS afp_remove_user(TEXT, TEXT);
CREATE FUNCTION afp_remove_user(p_session_token TEXT, p_id TEXT) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB; caller_role TEXT; target JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN RAISE EXCEPTION 'Sessiya topilmadi'; END IF;
  caller_role := caller->>'role';
  IF caller_role = 'ceo' THEN
    NULL;
  ELSIF caller_role = 'teacher' THEN
    SELECT u INTO target FROM jsonb_array_elements(afp_users_raw()) AS u
      WHERE u->>'id' = p_id;
    IF target IS NULL OR (target->>'role') <> 'student' THEN
      RAISE EXCEPTION 'O''qituvchi faqat o''quvchi o''chira oladi';
    END IF;
  ELSE
    RAISE EXCEPTION 'Ruxsat berilmagan';
  END IF;
  PERFORM afp_save_users(
    COALESCE(
      (SELECT jsonb_agg(u) FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' <> p_id),
      '[]'::jsonb
    )
  );
END;
$$;
GRANT EXECUTE ON FUNCTION afp_remove_user(TEXT, TEXT) TO anon, authenticated;

-- Maydon yangilash (patch)
DROP FUNCTION IF EXISTS afp_patch_user(TEXT, JSONB);
DROP FUNCTION IF EXISTS afp_patch_user(TEXT, TEXT, JSONB);
CREATE FUNCTION afp_patch_user(p_session_token TEXT, p_id TEXT, p_patch JSONB) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB; users JSONB; safe_patch JSONB; updated JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN RAISE EXCEPTION 'Ruxsat berilmagan'; END IF;
  safe_patch := p_patch - 'id' - 'login' - 'parol' - 'role';
  IF (caller->>'role') <> 'ceo' THEN
    IF (safe_patch - 'assistantRating' - 'assistantBlockedUntil') <> '{}'::jsonb THEN
      RAISE EXCEPTION 'Ruxsat berilmagan';
    END IF;
  END IF;
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_id THEN u || safe_patch ELSE u END) INTO users
    FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(COALESCE(users, '[]'::jsonb));
  SELECT u INTO updated FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' = p_id;
  IF updated IS NULL THEN RETURN NULL; END IF;
  RETURN afp_sanitize_user(updated);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_patch_user(TEXT, TEXT, JSONB) TO anon, authenticated;

-- Profil yangilash
DROP FUNCTION IF EXISTS afp_update_profile(TEXT, TEXT, TEXT, TEXT, TEXT);
CREATE FUNCTION afp_update_profile(
  p_session_token TEXT, p_ism TEXT, p_familya TEXT, p_tel TEXT, p_tugilgan TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB; p_user_id TEXT; users JSONB; cur JSONB; updated JSONB; patch JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan'); END IF;
  p_user_id := caller->>'id';
  IF p_ism IS NULL OR trim(p_ism) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ism majburiy');
  END IF;
  SELECT u INTO cur FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' = p_user_id;
  IF cur IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'Foydalanuvchi topilmadi'); END IF;
  patch := jsonb_strip_nulls(jsonb_build_object(
    'ism', trim(p_ism),
    'familya', trim(COALESCE(p_familya, '')),
    'tel', NULLIF(trim(COALESCE(p_tel, '')), ''),
    'tugilgan', NULLIF(trim(COALESCE(p_tugilgan, '')), '')
  ));
  updated := (cur - 'tel' - 'tugilgan') || patch;
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_user_id THEN updated ELSE u END) INTO users
    FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(users);
  RETURN jsonb_build_object('ok', true, 'user', afp_sanitize_user(updated));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_update_profile(TEXT, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

-- Parol o'zgartirish
DROP FUNCTION IF EXISTS afp_change_password(TEXT, TEXT, TEXT);
CREATE FUNCTION afp_change_password(
  p_session_token TEXT, p_eski_parol TEXT, p_yangi_parol TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB; p_user_id TEXT; users JSONB; cur JSONB; updated JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan'); END IF;
  p_user_id := caller->>'id';
  SELECT u INTO cur FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' = p_user_id;
  IF cur IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'Foydalanuvchi topilmadi'); END IF;
  IF (cur->>'parol') IS DISTINCT FROM crypt(p_eski_parol, cur->>'parol') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Eski parol noto''g''ri');
  END IF;
  IF p_yangi_parol IS NULL OR length(trim(p_yangi_parol)) < 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Yangi parol kamida 4 ta belgi bo''lishi kerak');
  END IF;
  updated := cur || jsonb_build_object('parol', crypt(trim(p_yangi_parol), gen_salt('bf')));
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_user_id THEN updated ELSE u END) INTO users
    FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(users);
  RETURN jsonb_build_object('ok', true);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_change_password(TEXT, TEXT, TEXT) TO anon, authenticated;

-- Admin tomonidan parol tiklash
CREATE OR REPLACE FUNCTION afp_admin_reset_password(
  p_session_token TEXT, p_target_id TEXT, p_new_parol TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB; target JSONB; all_users JSONB; updated JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'Sessiya topilmadi'); END IF;
  IF (caller->>'role') NOT IN ('ceo', 'teacher') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  IF p_new_parol IS NULL OR length(trim(p_new_parol)) < 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Parol kamida 4 ta belgi bo''lishi kerak');
  END IF;
  SELECT u INTO target FROM jsonb_array_elements(afp_users_raw()) AS u
    WHERE u->>'id' = p_target_id;
  IF target IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'Foydalanuvchi topilmadi'); END IF;
  IF (target->>'role') = 'ceo' AND (caller->>'id') <> p_target_id THEN
    RETURN jsonb_build_object('ok', false, 'error', 'CEO parolini faqat o''zi o''zgartira oladi');
  END IF;
  updated := target || jsonb_build_object('parol', crypt(trim(p_new_parol), gen_salt('bf')));
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_target_id THEN updated ELSE u END) INTO all_users
    FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(COALESCE(all_users, '[]'::jsonb));
  RETURN jsonb_build_object('ok', true);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_admin_reset_password(TEXT, TEXT, TEXT) TO anon, authenticated;

-- ── 9. Boshlang'ich foydalanuvchilar (seed) ───────────────────────
-- Agar "users" qatori allaqachon mavjud bo'lsa — tegilmaydi.
-- CEO login: ustoz | parol: 1234
INSERT INTO afp_kv (key, value)
VALUES ('users', '[
  {"id":"t1","login":"ustoz","parol":"1234","ism":"Ozodbek","familya":"Rahimov","role":"ceo","avatar":null,"tur":"fonetika"},
  {"id":"s6","login":"abduhollaxov","parol":"a2006","ism":"Abdulloh","familya":"Abduhollaxov","role":"student","tugilgan":"14.05.2006","tel":"+998918200006","avatar":null,"tur":"fonetika"},
  {"id":"s7","login":"xislatbek","parol":"x2006","ism":"Xislatbek","familya":"Normatov","role":"student","tugilgan":"11.08.2006","tel":"+998950720206","avatar":null,"tur":"fonetika"},
  {"id":"s8","login":"azim","parol":"1995","ism":"Azim","familya":"Valijonov","role":"student","tugilgan":"18.02.1995","tel":"+998909871266","avatar":null,"tur":"fonetika"},
  {"id":"s9","login":"oybek","parol":"2001","ism":"Oybek","familya":"Uktamov","role":"student","tugilgan":"01.11.2001","tel":"+998335050011","avatar":null,"tur":"fonetika"},
  {"id":"s10","login":"salohiddin","parol":"2008","ism":"Salohiddin","familya":"Jumayev","role":"student","tugilgan":"26.01.2008","tel":"+998947800826","avatar":null,"tur":"fonetika"}
]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ── 10. Parollarni bcrypt bilan xeshlash ─────────────────────────
-- Tekis-matn parollarni bir martalik hash qilamiz.
-- Idempotent: allaqachon $2 bilan boshlangan qiymatlar qayta hash qilinmaydi.
DO $$
DECLARE cur_users JSONB; hashed JSONB;
BEGIN
  SELECT value INTO cur_users FROM afp_kv WHERE key = 'users';
  IF cur_users IS NULL THEN RETURN; END IF;
  SELECT jsonb_agg(
    CASE
      WHEN (u->>'parol') IS NOT NULL AND (u->>'parol') !~ '^\$2[aby]\$'
        THEN u || jsonb_build_object('parol', crypt(u->>'parol', gen_salt('bf')))
      ELSE u
    END
  ) INTO hashed FROM jsonb_array_elements(cur_users) AS u;
  UPDATE afp_kv SET value = hashed, updated_at = NOW() WHERE key = 'users';
END $$;

-- ── 11. Eski "tur" yo'q o'quvchilarga "fonetika" belgilash ───────
UPDATE afp_kv
SET value = (
  SELECT jsonb_agg(
    CASE WHEN (u->>'role') = 'student' AND (u->>'tur') IS NULL
      THEN u || '{"tur":"fonetika"}'::jsonb ELSE u END
  ) FROM jsonb_array_elements(value) AS u
)
WHERE key = 'users';

-- ═══════════════════════════════════════════════════════════════════
-- TAYYOR! Endi GitHub Secrets sozlang (quyidagi ko'rsatmani o'qing).
-- ═══════════════════════════════════════════════════════════════════
