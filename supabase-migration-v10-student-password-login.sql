-- Arab Fonetika Platformasi — Migration v10
-- O'quvchilar parol bilan kira olishi tuzatish
--
-- Muammo: eski o'quvchilar faqat Telegram ID orqali qo'shilgan —
-- ularning login yoki parol maydonlari NULL.
-- afp_login esa login+parol bo'yicha qidiradi, shuning uchun
-- parol bilan kirish ishlamaydi.
--
-- Yechim:
--   1) login yo'q o'quvchilarga: login = 'tg_' + telegramId
--   2) parol yo'q o'quvchilarga: parol = bcrypt('1234')  ← keyinchalik o'zgartiradi
--   3) afp_login yangilanadi: login YOKI telegramId (string) bo'yicha qidiradi
--
-- Supabase dashboard → SQL Editor da, v9 dan KEYIN ishga tushiring.

-- ── 1. Login yo'q o'quvchilarga standart login qo'shish ─────────────
UPDATE afp_kv
SET value = (
  SELECT jsonb_agg(
    CASE
      WHEN (u->>'role') = 'student'
        AND ((u->>'login') IS NULL OR trim(u->>'login') = '')
        AND (u->>'telegramId') IS NOT NULL
      THEN u || jsonb_build_object('login', 'tg_' || (u->>'telegramId'))
      ELSE u
    END
  )
  FROM jsonb_array_elements(value) AS u
)
WHERE key = 'users';

-- ── 2. Parol yo'q o'quvchilarga standart parol qo'shish (1234) ──────
UPDATE afp_kv
SET value = (
  SELECT jsonb_agg(
    CASE
      WHEN (u->>'role') = 'student'
        AND ((u->>'parol') IS NULL OR trim(u->>'parol') = '')
      THEN u || jsonb_build_object('parol', crypt('1234', gen_salt('bf')))
      ELSE u
    END
  )
  FROM jsonb_array_elements(value) AS u
)
WHERE key = 'users';

-- ── 3. afp_login yangilash: login YOKI telegramId bo'yicha qidirish ─
CREATE OR REPLACE FUNCTION afp_login(p_login TEXT, p_parol TEXT, p_role TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE found JSONB;
BEGIN
  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE (
    -- Standart: login maydoni bo'yicha
    lower(u->>'login') = lower(trim(p_login))
    OR
    -- Qo'shimcha: telegramId (raqam string) bo'yicha
    (u->>'telegramId') IS NOT NULL AND (u->>'telegramId') = trim(p_login)
  )
    AND (u->>'parol') IS NOT NULL
    AND (u->>'parol') = crypt(p_parol, u->>'parol')
    AND (u->>'role') = p_role
  LIMIT 1;
  IF found IS NULL THEN RETURN NULL; END IF;
  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END;
$$;

GRANT EXECUTE ON FUNCTION afp_login(TEXT, TEXT, TEXT) TO anon, authenticated;
