-- Arab Fonetika Platformasi — Migration v7
-- Mavjud o'quvchilarga yo'nalish (tur) maydoni qo'shish
--
-- Muammo: s6–s10 ID li seed userlar "tur" maydonisiz saqlangan.
-- Natijada ular barcha yo'nalish bo'limlarini ko'radi (fonetika ham, grammatika ham).
--
-- Yechim: "tur" maydoni bo'lmagan barcha studentlarga "fonetika" belgilanadi.
-- Yangi o'quvchilar ro'yxatdan o'tkazilganda tur majburiy, shuning uchun
-- bu migration faqat eski ma'lumotlarni tuzatadi.
--
-- Supabase dashboard → SQL Editor da, v6 dan KEYIN ishga tushiring.

-- Mavjud studentlarga "tur": "fonetika" qo'shish (tur yo'q bo'lsa)
UPDATE afp_kv
SET value = (
  SELECT jsonb_agg(
    CASE
      WHEN (u->>'role') = 'student' AND (u->>'tur') IS NULL
        THEN u || '{"tur":"fonetika"}'::jsonb
      ELSE u
    END
  )
  FROM jsonb_array_elements(value) AS u
)
WHERE key = 'users';
