-- Arab Fonetika Platformasi — Xavfsizlik yamog'i v6
-- afp_kv jadvalining QOLGAN barcha kalitlarini (users'dan tashqari
-- hammasi — davomat, guruhlar, progress, reyting, shikoyat, avatar va h.k.)
-- ochiq RLS'dan yopish.
--
-- MUAMMO: v2 faqat "users" kalitini yopgan edi. Qolgan har bir kalit
-- hali ham "USING (true) WITH CHECK (true)" siyosati ostida qolgan,
-- ya'ni anon kalitga ega BO'LGAN HAR KIM (login qilmasdan ham!)
-- boshqa birovning davomatini, baholarini, shikoyatlarini o'qiy yoki
-- YOZIB O'ZGARTIRA oladi.
--
-- YECHIM: jadvalga to'g'ridan-to'g'ri kirish butunlay yopiladi (RLS —
-- hech qanday siyosat qolmaydi, ya'ni hamma so'rov rad etiladi). Kirish
-- endi FAQAT quyidagi SECURITY DEFINER funksiyalar orqali, va ular
-- HAQIQIY (server tomonida tekshirilgan) sessiya tokeni talab qiladi —
-- ya'ni foydalanuvchi avval login qilgan bo'lishi shart.
--
-- ESLATMA: bu hali to'liq rol-asosidagi (masalan, "faqat CEO progress
-- yoza oladi") ruxsat modeli emas — bu yerda faqat "login qilgan
-- bo'lish" talab qilinadi, chunki har bir feature (davomat/reyting/
-- shikoyat/...) o'zining yozish qoidalariga ega va buni to'liq ajratish
-- alohida ish. Lekin bu "hech qanday login talab qilinmasdan, hamma
-- narsani o'chirib/yozib yuborish mumkin" bo'lgan eng katta teshikni yopadi.
--
-- Supabase dashboard → SQL Editor da, v5 dan KEYIN ishga tushiring.

-- 1) Eski "non_users" siyosatlarni olib tashlaymiz — endi jadvalga
--    to'g'ridan-to'g'ri HECH QANDAY (na anon, na authenticated) kirish yo'q.
DROP POLICY IF EXISTS afp_kv_select_non_users ON afp_kv;
DROP POLICY IF EXISTS afp_kv_insert_non_users ON afp_kv;
DROP POLICY IF EXISTS afp_kv_update_non_users ON afp_kv;
DROP POLICY IF EXISTS afp_kv_delete_non_users ON afp_kv;

-- Optimistik lock (race condition oldini olish) uchun versiya ustuni.
ALTER TABLE afp_kv ADD COLUMN IF NOT EXISTS version INT NOT NULL DEFAULT 0;

-- 2) Umumiy o'qish funksiyasi — login qilingan bo'lishi shart, "users"
--    kalitiga esa bu orqali umuman kirib bo'lmaydi (u afp_users_raw()
--    ichida, alohida qat'iy nazorat ostida qoladi).
CREATE OR REPLACE FUNCTION afp_kv_get(p_key TEXT, p_session_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  v JSONB;
BEGIN
  IF p_key = 'users' THEN
    RETURN NULL;
  END IF;
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN NULL;
  END IF;
  SELECT value INTO v FROM afp_kv WHERE key = p_key;
  RETURN v;
END;
$$;
REVOKE ALL ON FUNCTION afp_kv_get(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION afp_kv_get(TEXT, TEXT) TO anon, authenticated;

-- 3) Umumiy o'qish, versiyasi bilan (optimistik lock uchun) — read-modify-
--    write qiladigan chaqiruvchilar joriy versiyani ham olishi kerak.
CREATE OR REPLACE FUNCTION afp_kv_get_versioned(p_key TEXT, p_session_token TEXT)
RETURNS TABLE(value JSONB, version INT)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
BEGIN
  IF p_key = 'users' THEN
    RETURN;
  END IF;
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN;
  END IF;
  RETURN QUERY SELECT afp_kv.value, afp_kv.version FROM afp_kv WHERE key = p_key;
END;
$$;
REVOKE ALL ON FUNCTION afp_kv_get_versioned(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION afp_kv_get_versioned(TEXT, TEXT) TO anon, authenticated;

-- 4) Umumiy yozish funksiyasi. p_expected_version berilsa (NULL bo'lmasa),
--    bazadagi joriy versiya u bilan mos kelmasa, yozish rad etiladi
--    (ok=false, error='conflict') — shu orqali ikkita client bir vaqtda
--    yozganda, ikkinchisi birinchisini sezmasdan bosib yubormaydi.
CREATE OR REPLACE FUNCTION afp_kv_set(
  p_key TEXT, p_value JSONB, p_session_token TEXT, p_expected_version INT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  cur_version INT;
  new_version INT;
BEGIN
  IF p_key = 'users' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Sessiya yaroqsiz');
  END IF;

  SELECT version INTO cur_version FROM afp_kv WHERE key = p_key;
  IF p_expected_version IS NOT NULL AND COALESCE(cur_version, 0) <> p_expected_version THEN
    RETURN jsonb_build_object('ok', false, 'error', 'conflict', 'version', COALESCE(cur_version, 0));
  END IF;

  new_version := COALESCE(cur_version, 0) + 1;
  INSERT INTO afp_kv (key, value, updated_at, version)
    VALUES (p_key, p_value, NOW(), new_version)
  ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at, version = new_version;

  RETURN jsonb_build_object('ok', true, 'version', new_version);
END;
$$;
REVOKE ALL ON FUNCTION afp_kv_set(TEXT, JSONB, TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION afp_kv_set(TEXT, JSONB, TEXT, INT) TO anon, authenticated;

-- 5) Umumiy o'chirish funksiyasi.
CREATE OR REPLACE FUNCTION afp_kv_del(p_key TEXT, p_session_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
BEGIN
  IF p_key = 'users' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Sessiya yaroqsiz');
  END IF;
  DELETE FROM afp_kv WHERE key = p_key;
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION afp_kv_del(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION afp_kv_del(TEXT, TEXT) TO anon, authenticated;

-- 6) Jadvalga to'g'ridan-to'g'ri kirishni butunlay o'chiramiz — RLS yoqilgan
--    holda hech qanday siyosat qolmasa, PostgREST orqali (.from("afp_kv"))
--    hech qanday satr qaytmaydi/yozilmaydi, hatto RLS yoqilgan bo'lsa ham
--    grantlarni ham olib tashlaymiz (ikki qavatli himoya).
REVOKE ALL ON afp_kv FROM anon, authenticated;
