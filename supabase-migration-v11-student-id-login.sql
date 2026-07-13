-- Arab Fonetika Platformasi — Migration v11
-- O'quvchilar faqat Telegram ID bilan kirishi (parolsiz)
--
-- Supabase dashboard → SQL Editor da, v10 dan KEYIN ishga tushiring.

CREATE OR REPLACE FUNCTION afp_student_login_by_telegram_id(p_telegram_id TEXT) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE found JSONB;
BEGIN
  IF p_telegram_id IS NULL OR trim(p_telegram_id) = '' THEN RETURN NULL; END IF;
  SELECT u INTO found
  FROM jsonb_array_elements(afp_users_raw()) AS u
  WHERE (u->>'telegramId') = trim(p_telegram_id)
    AND (u->>'role') = 'student'
  LIMIT 1;
  IF found IS NULL THEN RETURN NULL; END IF;
  RETURN jsonb_build_object('user', afp_sanitize_user(found), 'token', afp_make_session_token(found->>'id'));
END;
$$;

GRANT EXECUTE ON FUNCTION afp_student_login_by_telegram_id(TEXT) TO anon, authenticated;
