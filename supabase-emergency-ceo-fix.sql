-- FAVQULODDA TUZATISH: CEO kirishi
-- Supabase SQL Editor da ishga tushiring

-- 1. Kerakli extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Jadval
CREATE TABLE IF NOT EXISTS afp_kv (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE afp_kv ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "afp_kv_all" ON afp_kv;
CREATE POLICY "afp_kv_all" ON afp_kv FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS afp_secrets (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
ALTER TABLE afp_secrets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "afp_secrets_deny" ON afp_secrets;
CREATE POLICY "afp_secrets_deny" ON afp_secrets FOR ALL USING (false);

-- 3. Asosiy yordamchi funksiyalar
CREATE OR REPLACE FUNCTION afp_users_raw() RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN COALESCE((SELECT value FROM afp_kv WHERE key = 'users'), '[]'::jsonb);
END; $$;

CREATE OR REPLACE FUNCTION afp_save_users(p_users JSONB) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO afp_kv (key, value) VALUES ('users', p_users)
  ON CONFLICT (key) DO UPDATE SET value = p_users, updated_at = NOW();
END; $$;

CREATE OR REPLACE FUNCTION afp_sanitize_user(p_user JSONB) RETURNS JSONB
LANGUAGE sql IMMUTABLE AS $$ SELECT p_user - 'parol'; $$;

CREATE OR REPLACE FUNCTION afp_get_or_create_session_secret() RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE s TEXT;
BEGIN
  SELECT value INTO s FROM afp_secrets WHERE key = 'session_secret';
  IF s IS NULL THEN
    s := encode(gen_random_bytes(32), 'hex');
    INSERT INTO afp_secrets VALUES ('session_secret', s) ON CONFLICT DO NOTHING;
  END IF;
  RETURN s;
END; $$;
REVOKE ALL ON FUNCTION afp_get_or_create_session_secret() FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_make_session_token(p_user_id TEXT) RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT; expiry BIGINT;
BEGIN
  secret := afp_get_or_create_session_secret();
  expiry := (extract(epoch FROM NOW()) + 30 * 86400)::BIGINT;
  RETURN p_user_id || '.' || expiry::TEXT || '.' ||
    encode(hmac(p_user_id || '.' || expiry::TEXT, secret, 'sha256'), 'hex');
END; $$;
REVOKE ALL ON FUNCTION afp_make_session_token(TEXT) FROM PUBLIC;

-- 4. Foydalanuvchilar ro'yxati (parolsiz)
CREATE OR REPLACE FUNCTION afp_get_users() RETURNS JSONB
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(jsonb_agg(afp_sanitize_user(u)), '[]'::jsonb)
  FROM jsonb_array_elements(afp_users_raw()) AS u;
$$;
GRANT EXECUTE ON FUNCTION afp_get_users() TO anon, authenticated;

-- 5. Login funksiyasi
CREATE OR REPLACE FUNCTION afp_login(p_login TEXT, p_parol TEXT, p_role TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE found JSONB;
BEGIN
  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE lower(u->>'login') = lower(trim(p_login))
    AND (u->>'parol') IS NOT NULL
    AND (u->>'parol') = crypt(p_parol, u->>'parol')
    AND (u->>'role') = p_role
  LIMIT 1;
  IF found IS NULL THEN RETURN NULL; END IF;
  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END; $$;
GRANT EXECUTE ON FUNCTION afp_login(TEXT, TEXT, TEXT) TO anon, authenticated;

-- 6. CEO ni to'g'ri parol bilan o'rnatish
DO $$
DECLARE
  cur_users JSONB;
  ceo_obj   JSONB;
  new_users JSONB;
BEGIN
  cur_users := afp_users_raw();

  ceo_obj := jsonb_build_object(
    'id',      't1',
    'login',   'ustoz',
    'parol',   crypt('1234', gen_salt('bf')),
    'ism',     'Ozodbek',
    'familya', 'Rahimov',
    'role',    'ceo',
    'telegramId', 7608492778,
    'tur',     'fonetika',
    'avatar',  null
  );

  -- CEO mavjud bo'lsa almashtir, bo'lmasa qo'sh
  IF EXISTS (SELECT 1 FROM jsonb_array_elements(cur_users) u WHERE (u->>'role') = 'ceo') THEN
    SELECT jsonb_agg(CASE WHEN (u->>'role') = 'ceo' THEN ceo_obj ELSE u END)
    INTO new_users FROM jsonb_array_elements(cur_users) u;
  ELSE
    new_users := cur_users || jsonb_build_array(ceo_obj);
  END IF;

  PERFORM afp_save_users(new_users);
END $$;

-- 7. Tekshirish
SELECT
  u->>'id'    AS id,
  u->>'login' AS login,
  u->>'role'  AS role,
  left(u->>'parol', 7) AS parol_boshi
FROM jsonb_array_elements((SELECT value FROM afp_kv WHERE key='users')) u
WHERE (u->>'role') = 'ceo';
