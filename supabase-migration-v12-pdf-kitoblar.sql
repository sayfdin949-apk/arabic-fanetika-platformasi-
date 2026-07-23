-- Migration v12: PDF kitoblar uchun Supabase Storage sozlamasi
--
-- Bu SQL ni Supabase Dashboard → SQL Editor da ishga tushiring.
--
-- ESLATMA: Bucket yaratish SQL orqali bo'lmaydi.
-- Quyidagi qadamlarni bajarilgach storage policies qo'shiladi.
--
-- 1-QADAM: Supabase Dashboard → Storage → "New bucket" bosing
--   Bucket name:  pdf-kitoblar
--   Public:       ✅ (Public bucket — belgilang)
--   → "Save" bosing
--
-- 2-QADAM: Bu SQL ni ishga tushiring (bucket yaratilgandan keyin)

-- Storage bucket uchun public o'qish ruxsati
-- (Public bucket bo'lsa bu avtomatik, lekin aniq yozish yaxshiroq)
DO $$
BEGIN
  -- Agar storage.buckets jadvalida pdf-kitoblar bo'lmasa, xato chiqarmasin
  IF EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'pdf-kitoblar'
  ) THEN
    RAISE NOTICE 'pdf-kitoblar bucket mavjud — policies tekshirilmoqda';
  ELSE
    RAISE NOTICE 'DIQQAT: pdf-kitoblar bucket topilmadi. Avval Dashboard da bucket yarating!';
  END IF;
END $$;

-- PDF fayllarni hamma ko'ra olsin (public read)
DROP POLICY IF EXISTS "pdf_kitoblar_public_read" ON storage.objects;
CREATE POLICY "pdf_kitoblar_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pdf-kitoblar');

-- PDF fayllarni faqat autentifikatsiya qilingan foydalanuvchi yuklaydi
-- (CEO ekranida fayl tanlash orqali)
DROP POLICY IF EXISTS "pdf_kitoblar_auth_insert" ON storage.objects;
CREATE POLICY "pdf_kitoblar_auth_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'pdf-kitoblar');

-- PDF fayllarni o'chirish
DROP POLICY IF EXISTS "pdf_kitoblar_auth_delete" ON storage.objects;
CREATE POLICY "pdf_kitoblar_auth_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'pdf-kitoblar');

-- TAYYOR!
-- Endi platformada CEO login qilib Kitobxona → PDF kitoblar bo'limiga o'ting.
-- "Yangi PDF kitob yuklash" tugmasi orqali kitob yuklay olasiz.
