-- Arab Fonetika Platformasi — Xavfsizlik yamog'i v4
-- Telegram Mini App autentifikatsiyasini HMAC orqali tasdiqlash
--
-- MUAMMO: O'qituvchi, o'quvchi va yordamchi ustoz FAQAT Telegram ID orqali
-- kiradi (parol yo'q). Hozirgi vaqtda klient ilova Telegramning
-- `initDataUnsafe.user.id` qiymatini TEKSHIRMASDAN serverga jo'natadi.
-- Bu qiymatni brauzer devtools orqali istalgan songa o'zgartirish mumkin —
-- demak, ID'ni bilgan har kim o'zini boshqa o'quvchi/o'qituvchi sifatida
-- ko'rsatib, ULARNING hisobiga kira oladi.
--
-- YECHIM: Telegram har bir Mini App ochilishida `initData` deb nomlangan
-- imzolangan satr beradi. Bu satrda bot tokeningiz orqali hisoblangan
-- HMAC-SHA256 imzo (`hash`) bor. Server shu imzoni qayta hisoblab,
-- mos kelganda GINA foydalanuvchi ID'siga ishonadi. Bot tokenisiz
-- bu imzoni hech kim qalbakilashtira olmaydi.
--
-- Supabase dashboard → SQL Editor da, v3 dan KEYIN ishga tushiring.
-- ISHGA TUSHIRGANDAN KEYIN albatta pastdagi 2-bosqichni bajaring
-- (bot tokeningizni kiritish)!

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) Maxfiy qiymatlar uchun alohida jadval — afp_kv'dan butunlay ajratilgan,
--    RLS yoqilgan va HECH KIMGA (anon ham, authenticated ham) siyosat
--    berilmagan, shuning uchun bot tokeni faqat SECURITY DEFINER
--    funksiyalar ichidan o'qiladi.
CREATE TABLE IF NOT EXISTS afp_secrets (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
ALTER TABLE afp_secrets ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON afp_secrets FROM PUBLIC, anon, authenticated;

-- 2-BOSQICH (QO'LDA BAJARING): bot tokeningizni shu yerga kiriting.
-- @BotFather dan olingan tokenni 'PUT_YOUR_BOT_TOKEN_HERE' o'rniga qo'ying:
INSERT INTO afp_secrets (key, value) VALUES ('telegram_bot_token', 'PUT_YOUR_BOT_TOKEN_HERE')
ON CONFLICT (key) DO NOTHING;

CREATE OR REPLACE FUNCTION afp_get_secret(p_key TEXT) RETURNS TEXT
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT value FROM afp_secrets WHERE key = p_key;
$$;
REVOKE ALL ON FUNCTION afp_get_secret(TEXT) FROM PUBLIC;

-- 2) Postgres'da tayyor percent-decode funksiyasi yo'q — Telegram
--    initData'dagi qiymatlar URL-encode qilingan, shuning uchun
--    data_check_string'ni to'g'ri qurish uchun o'zimiz yozamiz.
CREATE OR REPLACE FUNCTION afp_url_decode(p_input TEXT) RETURNS TEXT
LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE
  result TEXT := '';
  i INT := 1;
  ch TEXT;
  hex TEXT;
  bytes BYTEA := ''::bytea;
BEGIN
  WHILE i <= length(p_input) LOOP
    ch := substr(p_input, i, 1);
    IF ch = '%' AND i + 2 <= length(p_input) THEN
      hex := substr(p_input, i + 1, 2);
      bytes := bytes || decode(hex, 'hex');
      i := i + 3;
    ELSE
      IF length(bytes) > 0 THEN
        result := result || convert_from(bytes, 'UTF8');
        bytes := ''::bytea;
      END IF;
      IF ch = '+' THEN
        result := result || ' ';
      ELSE
        result := result || ch;
      END IF;
      i := i + 1;
    END IF;
  END LOOP;
  IF length(bytes) > 0 THEN
    result := result || convert_from(bytes, 'UTF8');
  END IF;
  RETURN result;
END;
$$;
REVOKE ALL ON FUNCTION afp_url_decode(TEXT) FROM PUBLIC;

-- 3) Telegram'ning rasmiy algoritmi bo'yicha initData'ni tasdiqlaydi va
--    tasdiqlangan bo'lsa ichidagi "user" JSON obyektini qaytaradi.
--    Algoritm: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
--      secret_key = HMAC_SHA256(key="WebAppData", data=bot_token)
--      hash       = HMAC_SHA256(key=secret_key, data=data_check_string)
--    data_check_string — "hash"dan tashqari hamma key=value juftliklari,
--    qiymatlar URL-decode qilingan, kalit bo'yicha alifbo tartibida
--    saralangan va "\n" bilan birlashtirilgan.
CREATE OR REPLACE FUNCTION afp_verify_telegram_init_data(p_init_data TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  bot_token TEXT;
  secret_key BYTEA;
  pairs TEXT[];
  pair TEXT;
  eq_pos INT;
  k TEXT;
  v TEXT;
  received_hash TEXT;
  check_pairs TEXT[] := '{}';
  data_check_string TEXT;
  computed_hash TEXT;
  auth_date BIGINT;
  user_json TEXT;
BEGIN
  bot_token := afp_get_secret('telegram_bot_token');
  IF bot_token IS NULL OR bot_token = '' OR bot_token = 'PUT_YOUR_BOT_TOKEN_HERE' THEN
    RETURN NULL;
  END IF;
  IF p_init_data IS NULL OR p_init_data = '' THEN
    RETURN NULL;
  END IF;

  pairs := string_to_array(p_init_data, '&');
  FOREACH pair IN ARRAY pairs LOOP
    eq_pos := position('=' IN pair);
    IF eq_pos = 0 THEN CONTINUE; END IF;
    k := substr(pair, 1, eq_pos - 1);
    v := afp_url_decode(substr(pair, eq_pos + 1));
    IF k = 'hash' THEN
      received_hash := v;
    ELSE
      check_pairs := array_append(check_pairs, k || '=' || v);
      IF k = 'auth_date' THEN auth_date := v::BIGINT; END IF;
      IF k = 'user' THEN user_json := v; END IF;
    END IF;
  END LOOP;

  IF received_hash IS NULL OR user_json IS NULL THEN
    RETURN NULL;
  END IF;

  -- Eskirgan (24 soatdan oshgan) sessiyalarni rad etamiz — qayta hujum
  -- (replay) ehtimolini cheklash uchun.
  IF auth_date IS NULL OR auth_date < (extract(epoch FROM NOW()) - 86400) THEN
    RETURN NULL;
  END IF;

  SELECT array_to_string(array_agg(p ORDER BY p), E'\n') INTO data_check_string
  FROM unnest(check_pairs) AS p;

  secret_key := hmac(bot_token, 'WebAppData', 'sha256');
  computed_hash := encode(hmac(convert_to(data_check_string, 'UTF8'), secret_key, 'sha256'), 'hex');

  IF computed_hash IS DISTINCT FROM received_hash THEN
    RETURN NULL;
  END IF;

  RETURN user_json::jsonb;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION afp_verify_telegram_init_data(TEXT) FROM PUBLIC;

-- 4) Eski, tasdiqlanmagan funksiyadan PUBLIC EXECUTE huquqini qaytarib
--    olamiz — endi hech kim xom Telegram ID bilan to'g'ridan-to'g'ri
--    kira olmasligi kerak.
REVOKE EXECUTE ON FUNCTION afp_login_telegram(BIGINT) FROM anon, authenticated, PUBLIC;

-- 5) Yangi, xavfsiz Telegram login — endi xom ID emas, balki imzolangan
--    initData satrini qabul qiladi va serverda tasdiqlaydi.
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
  RETURN afp_sanitize_user(found);
END;
$$;
GRANT EXECUTE ON FUNCTION afp_login_telegram_secure(TEXT) TO anon, authenticated;
