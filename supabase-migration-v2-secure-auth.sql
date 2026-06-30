-- Arab Fonetika Platformasi — Xavfsizlik yamog'i v2
-- Server-side login + "users" qatorini ochiq RLS dan yopish
--
-- MUAMMO: avvalgi "afp_open" siyosati afp_kv jadvalining BARCHA qatorlarini
-- (jumladan "users" — barcha login/parol/PII) anon kalit bilan har kimga
-- o'qish/yozishga ochiq qoldirgan edi.
--
-- YECHIM: "users" qatori endi to'g'ridan-to'g'ri o'qib/yozib bo'lmaydi.
-- Unga faqat quyidagi SECURITY DEFINER funksiyalar orqali kirish mumkin —
-- ular parolni hech qachon brauzerga qaytarmaydi (login tekshiruvidan tashqari,
-- u ham faqat to'g'ri/noto'g'ri natija beradi, parolning o'zini emas).
--
-- Supabase dashboard → SQL Editor da ishga tushiring.

-- 1) Eski "hammaga ochiq" siyosatni olib tashlaymiz
DROP POLICY IF EXISTS "afp_open" ON afp_kv;

-- 2) "users" kalitidan tashqari hamma narsa anon uchun ochiq qoladi
--    (progress, davomat, avatar, bookings va h.k. — parol emas)
CREATE POLICY afp_kv_select_non_users ON afp_kv
  FOR SELECT USING (key <> 'users');

CREATE POLICY afp_kv_insert_non_users ON afp_kv
  FOR INSERT WITH CHECK (key <> 'users');

CREATE POLICY afp_kv_update_non_users ON afp_kv
  FOR UPDATE USING (key <> 'users') WITH CHECK (key <> 'users');

CREATE POLICY afp_kv_delete_non_users ON afp_kv
  FOR DELETE USING (key <> 'users');

-- 3) "users" qatoriga xom kirish — FAQAT shu fayldagi funksiyalar ichidan
--    chaqiriladi, shuning uchun PUBLIC/anon uchun EXECUTE huquqi qaytarib olinadi.

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

-- 4) Boshlang'ich seed (agar "users" qatori hali yo'q bo'lsa) — src/auth/users.ts
--    dagi SEED_USERS bilan bir xil. Agar qator allaqachon mavjud bo'lsa, tegilmaydi.
INSERT INTO afp_kv (key, value)
VALUES ('users', '[
  {"id":"t1","login":"ustoz","parol":"1234","ism":"Ozodbek","familya":"Rahimov","role":"ceo","avatar":null},
  {"id":"s6","login":"abduhollaxov","parol":"a2006","ism":"Abdulloh","familya":"Abduhollaxov","role":"student","tugilgan":"14.05.2006","tel":"+998918200006","avatar":null},
  {"id":"s7","login":"xislatbek","parol":"x2006","ism":"Xislatbek","familya":"Normatov","role":"student","tugilgan":"11.08.2006","tel":"+998950720206","avatar":null},
  {"id":"s8","login":"azim","parol":"1995","ism":"Azim","familya":"Valijonov","role":"student","tugilgan":"18.02.1995","tel":"+998909871266","avatar":null},
  {"id":"s9","login":"oybek","parol":"2001","ism":"Oybek","familya":"Uktamov","role":"student","tugilgan":"01.11.2001","tel":"+998335050011","avatar":null},
  {"id":"s10","login":"salohiddin","parol":"2008","ism":"Salohiddin","familya":"Jumayev","role":"student","tugilgan":"26.01.2008","tel":"+998947800826","avatar":null}
]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 5) Ommabop (anon) funksiyalar — parolni hech qachon qaytarmaydi

CREATE OR REPLACE FUNCTION afp_get_users() RETURNS JSONB
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(jsonb_agg(afp_sanitize_user(u)), '[]'::jsonb)
  FROM jsonb_array_elements(afp_users_raw()) AS u;
$$;
GRANT EXECUTE ON FUNCTION afp_get_users() TO anon, authenticated;

CREATE OR REPLACE FUNCTION afp_login(p_login TEXT, p_parol TEXT, p_role TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  found JSONB;
BEGIN
  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE lower(u->>'login') = lower(trim(p_login))
    AND (u->>'parol') = p_parol
    AND (u->>'role') = p_role
  LIMIT 1;
  IF found IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN afp_sanitize_user(found);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_login(TEXT, TEXT, TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION afp_login_telegram(p_tg_id BIGINT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  found JSONB;
BEGIN
  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE (u->>'telegramId')::BIGINT = p_tg_id
  LIMIT 1;
  IF found IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN afp_sanitize_user(found);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_login_telegram(BIGINT) TO anon, authenticated;

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
  new_user := p_user || jsonb_build_object('id', new_id, 'login', new_login);
  PERFORM afp_save_users(users || jsonb_build_array(new_user));
  RETURN jsonb_build_object('ok', true, 'user', afp_sanitize_user(new_user));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_add_user(JSONB) TO anon, authenticated;

CREATE OR REPLACE FUNCTION afp_remove_user(p_id TEXT) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM afp_save_users(
    COALESCE(
      (SELECT jsonb_agg(u) FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' <> p_id),
      '[]'::jsonb
    )
  );
END;
$$;
GRANT EXECUTE ON FUNCTION afp_remove_user(TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION afp_patch_user(p_id TEXT, p_patch JSONB) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  users JSONB;
  safe_patch JSONB;
  updated JSONB;
BEGIN
  -- "id", "login", "parol", "role" ni patch orqali o'zgartirib bo'lmaydi
  safe_patch := p_patch - 'id' - 'login' - 'parol' - 'role';
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
GRANT EXECUTE ON FUNCTION afp_patch_user(TEXT, JSONB) TO anon, authenticated;

CREATE OR REPLACE FUNCTION afp_update_profile(
  p_user_id TEXT, p_ism TEXT, p_familya TEXT, p_tel TEXT, p_tugilgan TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  users JSONB;
  cur JSONB;
  updated JSONB;
  patch JSONB;
BEGIN
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
  IF (cur->>'parol') IS DISTINCT FROM p_eski_parol THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Eski parol noto''g''ri');
  END IF;
  IF p_yangi_parol IS NULL OR length(trim(p_yangi_parol)) < 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Yangi parol kamida 4 ta belgi bo''lishi kerak');
  END IF;
  updated := cur || jsonb_build_object('parol', trim(p_yangi_parol));
  SELECT jsonb_agg(CASE WHEN u->>'id' = p_user_id THEN updated ELSE u END) INTO users
  FROM jsonb_array_elements(afp_users_raw()) AS u;
  PERFORM afp_save_users(users);
  RETURN jsonb_build_object('ok', true);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_change_password(TEXT, TEXT, TEXT) TO anon, authenticated;
