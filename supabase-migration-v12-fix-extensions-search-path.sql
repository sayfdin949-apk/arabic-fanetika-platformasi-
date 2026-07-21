-- ============================================================================
-- Migration v12: pgcrypto search_path tuzatishi (KIRISH MUAMMOSI FIXI)
-- ============================================================================
--
-- MUAMMO:
--   Supabase'da `pgcrypto` extension'i `extensions` schemasida o'rnatiladi
--   (`public` da emas). Bizning barcha `afp_*` funksiyalarimiz esa
--   `SET search_path = public` bilan yaratilgan edi. Natijada funksiya ichida
--   `crypt()`, `gen_salt()`, `hmac()`, `gen_random_bytes()` chaqirilganda
--   Postgres ularni `public` da topa olmay:
--       ERROR: function crypt(text, text) does not exist
--   xatosini berardi. Oqibat: PAROL bilan kirish (CEO/o'qituvchi/assistant)
--   HECH KIMDA ishlamasdi (o'quvchilar Telegram ID bilan — parolsiz — kirгani
--   uchun ular ta'sirlanmagan edi).
--
-- YECHIM:
--   Barcha `afp_*` funksiyalarining search_path'iga `extensions` ni qo'shamiz.
--   `pgcrypto` joyidan qimirlamaydi — Supabase ichki qismlariga tegmaymiz.
--   (Bu 2026-07-21 da jonli bazaga qo'llangan tuzatishning aynan o'zi.)
--
-- Idempotent: bir necha marta ishga tushirish xavfsiz.
-- ============================================================================

DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname LIKE 'afp_%'
  LOOP
    EXECUTE format('ALTER FUNCTION %s SET search_path = public, extensions', r.sig);
  END LOOP;
END $$;

-- Tekshirish: afp_login endi 'public, extensions' bilan turishi kerak
SELECT p.proname, p.proconfig
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public' AND p.proname = 'afp_login';
