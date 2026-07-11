-- Arab Fonetika Platformasi — Xavfsizlik yamog'i v7
-- (a) Login urinishlarini cheklash (brute-force himoyasi)
-- (b) Sessiya tokenlarini bekor qilish imkoniyati (parol o'zgarganda yoki
--     CEO tomonidan majburiy chiqarilganda eski tokenlar ishlamay qoladi)
--
-- Supabase dashboard → SQL Editor da, v6 dan KEYIN ishga tushiring.

-- ============================================================
-- (a) Login rate limiting
-- ============================================================

CREATE TABLE IF NOT EXISTS afp_login_attempts (
  login TEXT PRIMARY KEY,
  fail_count INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE afp_login_attempts ENABLE ROW LEVEL SECURITY;
-- To'g'ridan-to'g'ri kirish yo'q — faqat afp_login ichidan (SECURITY DEFINER).

CREATE OR REPLACE FUNCTION afp_login(p_login TEXT, p_parol TEXT, p_role TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  norm_login TEXT := lower(trim(p_login));
  rec RECORD;
  found JSONB;
BEGIN
  SELECT * INTO rec FROM afp_login_attempts WHERE login = norm_login;
  IF rec.locked_until IS NOT NULL AND rec.locked_until > NOW() THEN
    RETURN jsonb_build_object('locked', true, 'until', rec.locked_until);
  END IF;

  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE lower(u->>'login') = norm_login
    AND (u->>'parol') = crypt(p_parol, u->>'parol')
    AND (u->>'role') = p_role
  LIMIT 1;

  IF found IS NULL THEN
    INSERT INTO afp_login_attempts (login, fail_count, locked_until, updated_at)
      VALUES (norm_login, 1, NULL, NOW())
    ON CONFLICT (login) DO UPDATE SET
      fail_count = afp_login_attempts.fail_count + 1,
      locked_until = CASE
        WHEN afp_login_attempts.fail_count + 1 >= 5 THEN NOW() + INTERVAL '15 minutes'
        ELSE NULL
      END,
      updated_at = NOW();
    RETURN NULL;
  END IF;

  -- Muvaffaqiyatli login — hisoblagichni tozalaymiz.
  DELETE FROM afp_login_attempts WHERE login = norm_login;

  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_login(TEXT, TEXT, TEXT) TO anon, authenticated;

-- ============================================================
-- (b) Sessiya tokenlarini bekor qilish (epoch-asosida)
-- ============================================================
-- Har bir foydalanuvchida "sessionEpoch" maydoni (yo'q bo'lsa 0 deb
-- hisoblanadi). Token ichida shu paytdagi epoch ham imzolanadi. Agar
-- foydalanuvchining joriy epoch'i tokendagidan farq qilsa (parol
-- o'zgargani yoki CEO "chiqarib yuborgani" uchun oshirilgan bo'lsa),
-- token endi yaroqsiz hisoblanadi — hatto muddati tugamagan bo'lsa ham.

CREATE OR REPLACE FUNCTION afp_make_session_token(p_user_id TEXT) RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  secret TEXT;
  expiry BIGINT;
  epoch_v INT;
  payload TEXT;
BEGIN
  secret := afp_get_or_create_session_secret();
  expiry := (extract(epoch FROM NOW()) + 30 * 86400)::BIGINT;
  SELECT COALESCE((u->>'sessionEpoch')::INT, 0) INTO epoch_v
  FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' = p_user_id;
  epoch_v := COALESCE(epoch_v, 0);
  payload := p_user_id || '.' || epoch_v::TEXT || '.' || expiry::TEXT;
  RETURN payload || '.' || encode(hmac(payload, secret, 'sha256'), 'hex');
END;
$$;
REVOKE ALL ON FUNCTION afp_make_session_token(TEXT) FROM PUBLIC;

CREATE OR REPLACE FUNCTION afp_session_user(p_token TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  parts TEXT[];
  uid TEXT;
  token_epoch INT;
  expiry BIGINT;
  sig TEXT;
  secret TEXT;
  expected TEXT;
  payload TEXT;
  u JSONB;
  cur_epoch INT;
BEGIN
  IF p_token IS NULL OR p_token = '' THEN
    RETURN NULL;
  END IF;
  parts := string_to_array(p_token, '.');
  IF array_length(parts, 1) <> 4 THEN
    RETURN NULL; -- v6 dan oldingi eski format (3 qism) — endi yaroqsiz, qayta login talab qilinadi.
  END IF;
  uid := parts[1];
  token_epoch := parts[2]::INT;
  expiry := parts[3]::BIGINT;
  sig := parts[4];
  IF expiry < extract(epoch FROM NOW()) THEN
    RETURN NULL;
  END IF;
  secret := afp_get_or_create_session_secret();
  payload := uid || '.' || token_epoch::TEXT || '.' || expiry::TEXT;
  expected := encode(hmac(payload, secret, 'sha256'), 'hex');
  IF expected IS DISTINCT FROM sig THEN
    RETURN NULL;
  END IF;
  SELECT u2 INTO u FROM jsonb_array_elements(afp_users_raw()) AS u2 WHERE u2->>'id' = uid LIMIT 1;
  IF u IS NULL THEN
    RETURN NULL;
  END IF;
  cur_epoch := COALESCE((u->>'sessionEpoch')::INT, 0);
  IF cur_epoch <> token_epoch THEN
    RETURN NULL; -- bekor qilingan (parol o'zgargan / CEO tomonidan chiqarib yuborilgan)
  END IF;
  RETURN jsonb_build_object('id', u->>'id', 'role', u->>'role');
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION afp_session_user(TEXT) FROM PUBLIC;

-- change_password endi epoch'ni oshiradi (shu foydalanuvchining boshqa
-- barcha qurilmalardagi eski sessiyalari darhol bekor bo'ladi) va
-- chaqiruvchiga YANGI token qaytaradi, aks holda u o'zini ham chiqarib
-- yuborgan bo'lardi.
CREATE OR REPLACE FUNCTION afp_change_password(
  p_session_token TEXT, p_eski_parol TEXT, p_yangi_parol TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  p_user_id TEXT;
  users JSONB;
  cur JSONB;
  updated JSONB;
  new_token TEXT;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  p_user_id := caller->>'id';
  SELECT u INTO cur FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' = p_user_id;
  IF cur IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Foydalanuvchi topilmadi');
  END IF;
  IF (cur->>'parol') IS DISTINCT FROM crypt(p_eski_parol, cur->>'parol') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Eski parol noto''g''ri');
  END IF;
  IF p_yangi_parol IS NULL OR length(trim(p_yangi_parol)) < 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Yangi parol kamida 4 ta belgi bo''lishi kerak');
  END IF;
  updated := cur || jsonb_build_object(
    'parol', crypt(trim(p_yangi_parol), gen_salt('bf')),
    'sessionEpoch', COALESCE((cur->>'sessionEpoch')::INT, 0) + 1
  );
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_user_id THEN updated ELSE u END) INTO users
  FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(users);
  new_token := afp_make_session_token(p_user_id);
  RETURN jsonb_build_object('ok', true, 'token', new_token);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_change_password(TEXT, TEXT, TEXT) TO anon, authenticated;

-- CEO uchun: bironta foydalanuvchining barcha faol sessiyalarini majburiy
-- bekor qilish (masalan, hisob buzilgan deb gumon qilinsa yoki xodim
-- ishdan bo'shatilsa).
CREATE OR REPLACE FUNCTION afp_revoke_user_sessions(p_session_token TEXT, p_target_id TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  users JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL OR (caller->>'role') <> 'ceo' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  SELECT jsonb_agg(
    CASE WHEN u->>'id' = p_target_id
      THEN u || jsonb_build_object('sessionEpoch', COALESCE((u->>'sessionEpoch')::INT, 0) + 1)
      ELSE u END
  ) INTO users
  FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(COALESCE(users, '[]'::jsonb));
  RETURN jsonb_build_object('ok', true);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_revoke_user_sessions(TEXT, TEXT) TO anon, authenticated;
