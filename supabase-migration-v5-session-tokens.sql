-- Arab Fonetika Platformasi — Xavfsizlik yamog'i v5
-- Sessiya tokenlari: kim ekanini server tomonida tasdiqlash
--
-- MUAMMO: Supabase Auth ishlatilmagani uchun barcha SECURITY DEFINER
-- funksiyalar (afp_add_user, afp_remove_user, afp_patch_user,
-- afp_update_profile, afp_change_password) chaqiruvchining KIM ekanini
-- HECH QANDAY tekshirmasdan, faqat klient yuborgan parametrlarga ishongan.
-- Natijada anon kalit qo'lida bo'lgan har kim:
--   - o'zini "role":"ceo" qilib ro'yxatdan o'tkaza olardi (afp_add_user),
--   - istalgan foydalanuvchini (jumladan CEO'ni) o'chira olardi (afp_remove_user),
--   - istalgan foydalanuvchining istalgan maydonini (masalan boshqa birovning
--     ismini, profilini) o'zgartira olardi (afp_patch_user / afp_update_profile).
--
-- YECHIM: afp_login / afp_login_telegram_secure endi muvaffaqiyatli kirishda
-- imzolangan sessiya tokeni ham qaytaradi (HMAC-SHA256, afp_secrets'dagi
-- maxfiy kalit bilan, 30 kunlik amal qilish muddati). Yuqoridagi barcha
-- "yozish" funksiyalari endi shu tokenni talab qiladi va undan chaqiruvchining
-- HAQIQIY id/role'ini serverda o'zi hisoblab oladi — klient yuborgan
-- id/role'ga ishonmaydi.
--
-- Supabase dashboard → SQL Editor da, v4 dan KEYIN ishga tushiring.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) Sessiya tokenlari uchun maxfiy kalit — afp_secrets'da, hech kimga
--    to'g'ridan-to'g'ri ochilmaydi (jadval allaqachon v4'da RLS bilan yopilgan).
CREATE OR REPLACE FUNCTION afp_get_or_create_session_secret() RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v TEXT;
BEGIN
  SELECT value INTO v FROM afp_secrets WHERE key = 'session_secret';
  IF v IS NULL THEN
    INSERT INTO afp_secrets (key, value) VALUES ('session_secret', encode(gen_random_bytes(32), 'hex'))
      ON CONFLICT (key) DO NOTHING;
    SELECT value INTO v FROM afp_secrets WHERE key = 'session_secret';
  END IF;
  RETURN v;
END;
$$;
REVOKE ALL ON FUNCTION afp_get_or_create_session_secret() FROM PUBLIC;

-- 2) Token yaratish — faqat ichki foydalanish uchun (afp_login va h.k. ichidan).
--    Format: "<user_id>.<expiry_epoch>.<hex_hmac_sha256>"
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

-- 3) Token tasdiqlash — imzoni va amal qilish muddatini tekshiradi, to'g'ri
--    bo'lsa chaqiruvchining HOZIRGI (bazadagi) id/role'ini qaytaradi.
--    Parolni o'z ichiga olmaydi.
CREATE OR REPLACE FUNCTION afp_session_user(p_token TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  parts TEXT[];
  uid TEXT;
  expiry BIGINT;
  sig TEXT;
  secret TEXT;
  expected TEXT;
  u JSONB;
BEGIN
  IF p_token IS NULL OR p_token = '' THEN
    RETURN NULL;
  END IF;
  parts := string_to_array(p_token, '.');
  IF array_length(parts, 1) <> 3 THEN
    RETURN NULL;
  END IF;
  uid := parts[1];
  expiry := parts[2]::BIGINT;
  sig := parts[3];
  IF expiry < extract(epoch FROM NOW()) THEN
    RETURN NULL;
  END IF;
  secret := afp_get_or_create_session_secret();
  expected := encode(hmac(uid || '.' || expiry::TEXT, secret, 'sha256'), 'hex');
  IF expected IS DISTINCT FROM sig THEN
    RETURN NULL;
  END IF;
  SELECT u2 INTO u FROM jsonb_array_elements(afp_users_raw()) AS u2 WHERE u2->>'id' = uid LIMIT 1;
  IF u IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN jsonb_build_object('id', u->>'id', 'role', u->>'role');
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION afp_session_user(TEXT) FROM PUBLIC;

-- 4) afp_login / afp_login_telegram_secure — endi { user, token } qaytaradi.
--    Imzo bir xil (JSONB qaytaradi), shuning uchun CREATE OR REPLACE yetarli.

CREATE OR REPLACE FUNCTION afp_login(p_login TEXT, p_parol TEXT, p_role TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  found JSONB;
BEGIN
  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE lower(u->>'login') = lower(trim(p_login))
    AND (u->>'parol') = crypt(p_parol, u->>'parol')
    AND (u->>'role') = p_role
  LIMIT 1;
  IF found IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END;
$$;

CREATE OR REPLACE FUNCTION afp_login_telegram_secure(p_init_data TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  verified_user JSONB;
  tg_id BIGINT;
  found JSONB;
BEGIN
  verified_user := afp_verify_telegram_init_data(p_init_data);
  IF verified_user IS NULL THEN
    RETURN NULL;
  END IF;
  tg_id := (verified_user->>'id')::BIGINT;

  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE (u->>'telegramId')::BIGINT = tg_id
  LIMIT 1;
  IF found IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END;
$$;

-- 5) Yozish funksiyalari — endi p_session_token talab qiladi. Parametrlar
--    o'zgargani uchun avval eski imzoni DROP qilamiz (aks holda eski,
--    tokensiz versiya ham PUBLIC uchun chaqiriladigan bo'lib qolaveradi).

DROP FUNCTION IF EXISTS afp_add_user(JSONB);
CREATE FUNCTION afp_add_user(p_session_token TEXT, p_user JSONB) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  users JSONB;
  new_login TEXT := trim(p_user->>'login');
  new_id TEXT := 'u' || (extract(epoch FROM clock_timestamp()) * 1000)::BIGINT::TEXT;
  new_user JSONB;
  taken BOOLEAN;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL OR (caller->>'role') <> 'ceo' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  users := afp_users_raw();
  SELECT EXISTS (
    SELECT 1 FROM jsonb_array_elements(users) AS u
    WHERE lower(u->>'login') = lower(new_login)
  ) INTO taken;
  IF taken THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Bu login band');
  END IF;
  new_user := p_user || jsonb_build_object(
    'id', new_id,
    'login', new_login,
    'parol', crypt(p_user->>'parol', gen_salt('bf'))
  );
  PERFORM afp_save_users(users || jsonb_build_array(new_user));
  RETURN jsonb_build_object('ok', true, 'user', afp_sanitize_user(new_user));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_add_user(TEXT, JSONB) TO anon, authenticated;

DROP FUNCTION IF EXISTS afp_remove_user(TEXT);
CREATE FUNCTION afp_remove_user(p_session_token TEXT, p_id TEXT) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL OR (caller->>'role') <> 'ceo' THEN
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

DROP FUNCTION IF EXISTS afp_patch_user(TEXT, JSONB);
CREATE FUNCTION afp_patch_user(p_session_token TEXT, p_id TEXT, p_patch JSONB) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  users JSONB;
  safe_patch JSONB;
  updated JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Ruxsat berilmagan';
  END IF;
  -- "id", "login", "parol", "role" ni patch orqali o'zgartirib bo'lmaydi
  safe_patch := p_patch - 'id' - 'login' - 'parol' - 'role';
  IF (caller->>'role') <> 'ceo' THEN
    -- CEO bo'lmagan chaqiruvchilar faqat Yordamchi ustoz darslar tizimi
    -- avtomatik ishlatadigan ikkita maydonni (boshqa foydalanuvchida)
    -- o'zgartira oladi: assistantRating va assistantBlockedUntil.
    IF (safe_patch - 'assistantRating' - 'assistantBlockedUntil') <> '{}'::jsonb THEN
      RAISE EXCEPTION 'Ruxsat berilmagan';
    END IF;
  END IF;
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_id THEN u || safe_patch ELSE u END) INTO users
  FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(COALESCE(users, '[]'::jsonb));
  SELECT u INTO updated FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' = p_id;
  IF updated IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN afp_sanitize_user(updated);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_patch_user(TEXT, TEXT, JSONB) TO anon, authenticated;

DROP FUNCTION IF EXISTS afp_update_profile(TEXT, TEXT, TEXT, TEXT, TEXT);
CREATE FUNCTION afp_update_profile(
  p_session_token TEXT, p_ism TEXT, p_familya TEXT, p_tel TEXT, p_tugilgan TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  p_user_id TEXT;
  users JSONB;
  cur JSONB;
  updated JSONB;
  patch JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  p_user_id := caller->>'id';
  IF p_ism IS NULL OR trim(p_ism) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ism majburiy');
  END IF;
  SELECT u INTO cur FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' = p_user_id;
  IF cur IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Foydalanuvchi topilmadi');
  END IF;
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

DROP FUNCTION IF EXISTS afp_change_password(TEXT, TEXT, TEXT);
CREATE FUNCTION afp_change_password(
  p_session_token TEXT, p_eski_parol TEXT, p_yangi_parol TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  p_user_id TEXT;
  users JSONB;
  cur JSONB;
  updated JSONB;
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
  updated := cur || jsonb_build_object('parol', crypt(trim(p_yangi_parol), gen_salt('bf')));
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_user_id THEN updated ELSE u END) INTO users
  FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(users);
  RETURN jsonb_build_object('ok', true);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_change_password(TEXT, TEXT, TEXT) TO anon, authenticated;
