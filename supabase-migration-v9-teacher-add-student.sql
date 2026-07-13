-- Arab Fonetika Platformasi — Migration v9
-- O'qituvchilarga o'quvchi qo'shish va o'chirish ruxsati
--
-- MUAMMO: afp_add_user va afp_remove_user faqat CEO ga ruxsat beradi.
-- Natijada o'qituvchi (teacher) OquvchilarView orqali o'quvchi qo'sha olmaydi
-- (Supabase "Ruxsat berilmagan" xatosini qaytaradi).
--
-- YECHIM:
--   - afp_add_user: CEO yoki teacher qo'sha oladi.
--     Teacher faqat role="student" ni qo'sha oladi (teacher/assistant/ceo emas).
--   - afp_remove_user: CEO yoki teacher o'chira oladi.
--     Teacher faqat role="student" ni o'chira oladi.
--
-- Supabase dashboard → SQL Editor da, v8 dan KEYIN ishga tushiring.

DROP FUNCTION IF EXISTS afp_add_user(TEXT, JSONB);
CREATE FUNCTION afp_add_user(p_session_token TEXT, p_user JSONB) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  caller_role TEXT;
  new_role TEXT;
  users JSONB;
  new_login TEXT := trim(p_user->>'login');
  new_id TEXT := 'u' || (extract(epoch FROM clock_timestamp()) * 1000)::BIGINT::TEXT;
  new_user JSONB;
  taken BOOLEAN;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Sessiya topilmadi');
  END IF;
  caller_role := caller->>'role';
  new_role    := p_user->>'role';

  -- CEO hamma turdagi foydalanuvchi qo'sha oladi;
  -- Teacher faqat student qo'sha oladi.
  IF caller_role = 'ceo' THEN
    NULL; -- ruxsat
  ELSIF caller_role = 'teacher' THEN
    IF new_role <> 'student' THEN
      RETURN jsonb_build_object('ok', false, 'error', 'O''qituvchi faqat o''quvchi qo''sha oladi');
    END IF;
  ELSE
    RETURN jsonb_build_object('ok', false, 'error', 'Ruxsat berilmagan');
  END IF;

  users := afp_users_raw();
  SELECT EXISTS (
    SELECT 1 FROM jsonb_array_elements(users) AS u
    WHERE lower(u->>'login') = lower(new_login)
  ) INTO taken;
  IF taken THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Bu login band');
  END IF;
  new_user := p_user || jsonb_build_object(
    'id', new_id,
    'login', new_login,
    'parol', crypt(p_user->>'parol', gen_salt('bf'))
  );
  PERFORM afp_save_users(users || jsonb_build_array(new_user));
  RETURN jsonb_build_object('ok', true, 'user', afp_sanitize_user(new_user));
END;
$$;
GRANT EXECUTE ON FUNCTION afp_add_user(TEXT, JSONB) TO anon, authenticated;

DROP FUNCTION IF EXISTS afp_remove_user(TEXT, TEXT);
CREATE FUNCTION afp_remove_user(p_session_token TEXT, p_id TEXT) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller JSONB;
  caller_role TEXT;
  target JSONB;
BEGIN
  caller := afp_session_user(p_session_token);
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Sessiya topilmadi';
  END IF;
  caller_role := caller->>'role';

  IF caller_role = 'ceo' THEN
    NULL; -- CEO hamma foydalanuvchini o'chira oladi
  ELSIF caller_role = 'teacher' THEN
    -- Teacher faqat student o'chira oladi
    SELECT u INTO target
    FROM jsonb_array_elements(afp_users_raw()) AS u
    WHERE u->>'id' = p_id;
    IF target IS NULL OR (target->>'role') <> 'student' THEN
      RAISE EXCEPTION 'O''qituvchi faqat o''quvchi o''chira oladi';
    END IF;
  ELSE
    RAISE EXCEPTION 'Ruxsat berilmagan';
  END IF;

  PERFORM afp_save_users(
    COALESCE(
      (SELECT jsonb_agg(u) FROM jsonb_array_elements(afp_users_raw()) AS u WHERE u->>'id' <> p_id),
      '[]'::jsonb
    )
  );
END;
$$;
GRANT EXECUTE ON FUNCTION afp_remove_user(TEXT, TEXT) TO anon, authenticated;
