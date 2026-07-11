/*
 * Joriy sessiya tokenini saqlash/o'qish — bitta joyda, shu brauzerga xos
 * localStorage'da (qarang: supabase-migration-v5-session-tokens.sql,
 * supabase-migration-v6-lockdown-kv.sql). AuthContext login/logout paytida
 * yozadi; SupabaseAdapter har bir "afp_kv_*" RPC chaqiruvida shu yerdan o'qiydi.
 */
const SESSION_TOKEN_KEY = "afp:session_token";

export function getSessionToken(): string | null {
  try {
    return localStorage.getItem(SESSION_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setSessionToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(SESSION_TOKEN_KEY, token);
    else localStorage.removeItem(SESSION_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}
