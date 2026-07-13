-- Arab Fonetika Platformasi — Migration v8
-- Admin (CEO/teacher) tomonidan o'quvchi parolini tiklash
--
-- afp_patch_user ataylab parolni bloklaydi (noto'g'ri hash saqlashdan saqlash uchun).
-- Shu sababli parolni tiklash uchun alohida funksiya kerak bo'ladi:
-- u yangi parolni server tomonida bcrypt bilan hash qilib saqlaydi.
--
-- Supabase dashboard → SQL Editor da, v7 dan KEYIN ishga tushiring.

CREATE OR REPLACE FUNCTION afp_admin_reset_password(
  p_session_token TEXT,
  p_target_id     TEXT,
  p_new_parol     TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller   JSONB;
  target   JSONB;
  all_users JSONB;
  updated  JSONB;
BEGIN
  -- 1) Chaqiruvchini sessiya tokeni orqali aniqlash
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Sessiya topilmadi');
  END IF;

  -- 2) Faqat CEO yoki teacher ruxsat bera oladi
  IF (caller->>'role') NOT IN ('ceo', 'teacher') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;

  -- 3) Yangi parol uzunligini tekshirish
  IF p_new_parol IS NULL OR length(trim(p_new_parol)) < 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Parol kamida 4 ta belgi bo''lishi kerak');
  END IF;

  -- 4) Maqsad foydalanuvchini topish
  SELECT u INTO target
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE u->>'id' = p_target_id;

  IF target IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Foydalanuvchi topilmadi');
  END IF;

  -- 5) Faqat student rolini tiklash mumkin (CEO o'zini tiklay olmaydi)
  IF (target->>'role') = 'ceo' AND (caller->>'id') <> p_target_id THEN
    RETURN jsonb_build_object('ok', false, 'error', 'CEO parolini faqat o''zi o''zgartira oladi');
  END IF;

  -- 6) Parolni hash qilib saqlash
  updated := target || jsonb_build_object('parol', crypt(trim(p_new_parol), gen_salt('bf')));

  SELECT jsonb_agg(CASE WHEN u->>'id' = p_target_id THEN updated ELSE u END)
  INTO all_users
  FROM jsonb_array_elements(afp_users_raw()) AS u;

  PERFORM afp_save_users(COALESCE(all_users, '[]'::jsonb));

  RETURN jsonb_build_object('ok', true);
END;
$$;

GRANT EXECUTE ON FUNCTION afp_admin_reset_password(TEXT, TEXT, TEXT) TO anon, authenticated;
