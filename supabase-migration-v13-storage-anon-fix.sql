-- Migration v13: storage.buckets jadvaliga anon SELECT ruxsati
--
-- MUAMMO: Platform custom auth ishlatadi (Supabase Auth emas).
-- Foydalanuvchi JWT yo'q, faqat anon key bor.
-- Supabase Storage server bucket qidirganda storage.buckets jadvalini
-- anon role bilan o'qiydi — lekin bu jadvaldagi mavjud policies
-- anon uchun SELECT bermagan, shuning uchun "Bucket not found" qaytariladi.
--
-- YECHIM: storage.buckets ga anon SELECT + storage.objects ga to'liq ruxsat.
--
-- Bu SQL ni Supabase Dashboard → SQL Editor da ishga tushiring:

-- 1. storage.buckets jadvali uchun anon SELECT (asosiy fix)
DROP POLICY IF EXISTS "pdf_kitoblar_bucket_anon_select" ON storage.buckets;
CREATE POLICY "pdf_kitoblar_bucket_anon_select"
  ON storage.buckets FOR SELECT
  USING (id = 'pdf-kitoblar');

-- 2. storage.objects jadvali uchun barcha operatsiyalar (eski policies yangilash)
DROP POLICY IF EXISTS "pdf_kitoblar_public_read"   ON storage.objects;
DROP POLICY IF EXISTS "pdf_kitoblar_auth_insert"   ON storage.objects;
DROP POLICY IF EXISTS "pdf_kitoblar_auth_delete"   ON storage.objects;
DROP POLICY IF EXISTS "pdf_kitoblar_auth_update"   ON storage.objects;
DROP POLICY IF EXISTS "pdf_kitoblar_anon_insert"   ON storage.objects;
DROP POLICY IF EXISTS "pdf_kitoblar_anon_delete"   ON storage.objects;

CREATE POLICY "pdf_kitoblar_select"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pdf-kitoblar');

CREATE POLICY "pdf_kitoblar_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'pdf-kitoblar');

CREATE POLICY "pdf_kitoblar_update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'pdf-kitoblar');

CREATE POLICY "pdf_kitoblar_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'pdf-kitoblar');

-- Tekshirish: bucket mavjudligini ko'rish
SELECT id, name, public FROM storage.buckets WHERE id = 'pdf-kitoblar';
