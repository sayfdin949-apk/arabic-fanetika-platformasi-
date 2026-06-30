-- Arab Fonetika Platformasi — Xavfsizlik yamog'i v3
-- Parollarni xeshlash (pgcrypto / bcrypt)
--
-- MUAMMO: "users" qatorida parollar TEKIS MATN (plaintext) holda saqlangan.
-- v2 RLS'ni yopib, parolni anon kalit orqali to'g'ridan-to'g'ri o'qib
-- bo'lmaydigan qildi — lekin bazaga to'g'ridan-to'g'ri kirish huquqi
-- bo'lgan har qanday joyda (Supabase dashboard, backup, service-role
-- kaliti, xodim) parol baribir ochiq ko'rinardi.
--
-- YECHIM: pgcrypto kengaytmasi orqali barcha parollarni bcrypt bilan
-- xeshlaymiz. Login endi xesh bilan solishtiriladi; asl parol bazada
-- hech qachon saqlanmaydi va hech kim (administrator ham) uni qayta
-- o'qiy olmaydi.
--
-- Supabase dashboard → SQL Editor da, v2 dan KEYIN ishga tushiring.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) Mavjud "users" qatoridagi tekis-matn parollarni bir martalik xeshlaymiz.
--    Idempotent: allaqachon bcrypt formatida ($2a$/$2b$/$2y$ bilan
--    boshlanadigan) qiymatlarni qayta xeshlamaydi — shuning uchun bu
--    blokni xavfsiz qayta ishga tushirish mumkin.
DO $$
DECLARE
  cur_users JSONB;
  hashed JSONB;
BEGIN
  SELECT value INTO cur_users FROM afp_kv WHERE key = 'users';
  IF cur_users IS NULL THEN
    RETURN;
  END IF;
  SELECT jsonb_agg(
    CASE
      WHEN (u->>'parol') IS NOT NULL AND (u->>'parol') !~ '^\$2[aby]\$'
        THEN u || jsonb_build_object('parol', crypt(u->>'parol', gen_salt('bf')))
      ELSE u
    END
  ) INTO hashed
  FROM jsonb_array_elements(cur_users) AS u;
  UPDATE afp_kv SET value = hashed, updated_at = NOW() WHERE key = 'users';
END $$;

-- 2) afp_login — endi xesh bilan solishtiradi
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
  RETURN afp_sanitize_user(found);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_login(TEXT, TEXT, TEXT) TO anon, authenticated;

-- 3) afp_add_user — kiritilgan parolni saqlashdan oldin xeshlaymiz
CREATE OR REPLACE FUNCTION afp_add_user(p_user JSONB) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  users JSONB;
  new_login TEXT := trim(p_user->>'login');
  new_id TEXT := 'u' || (extract(epoch FROM clock_timestamp()) * 1000)::BIGINT::TEXT;
  new_user JSONB;
  taken BOOLEAN;
BEGIN
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
GRANT EXECUTE ON FUNCTION afp_add_user(JSONB) TO anon, authenticated;

-- 4) afp_change_password — eski parolni xesh bilan tekshiradi, yangisini xeshlab saqlaydi
CREATE OR REPLACE FUNCTION afp_change_password(
  p_user_id TEXT, p_eski_parol TEXT, p_yangi_parol TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  users JSONB;
  cur JSONB;
  updated JSONB;
BEGIN
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
