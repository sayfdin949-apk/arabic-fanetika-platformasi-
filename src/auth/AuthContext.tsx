import { createContext, useContext, useEffect, useCallback, useState, type ReactNode } from "react";
import type { User, Role } from "./types";
import { SEED_USERS } from "./users";
import { usersApi, isSupabaseMode } from "../lib/usersApi";
import { store } from "../lib/storage";
import { isTelegramMiniApp, getTelegramInitData, initTelegramApp } from "../lib/telegram";

const USERS_BACKUP_KEY = "afp:users_backup";
function saveUsersBackup(list: User[]) {
  try { localStorage.setItem(USERS_BACKUP_KEY, JSON.stringify(list)); } catch { /* ignore */ }
}
function loadUsersBackup(): User[] {
  try {
    const raw = localStorage.getItem(USERS_BACKUP_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch { return []; }
}

interface AuthValue {
  user: User | null;
  ready: boolean;
  avatar: string | null;
  users: User[];
  login: (login: string, parol: string, role: Role) => Promise<User | null>;
  loginWithTelegram: (initData: string) => Promise<User | null>;
  loginStudentById: (telegramId: string) => Promise<User | null>;
  logout: () => void;
  updateAvatar: (dataUrl: string) => void;
  updateProfile: (data: { ism: string; familya: string; tel?: string; tugilgan?: string }) => Promise<{ ok: boolean; error?: string }>;
  addUser: (u: Omit<User, "id">) => Promise<{ ok: boolean; error?: string }>;
  removeUser: (id: string) => Promise<void>;
  patchUser: (id: string, patch: Partial<Omit<User, "id">>) => Promise<void>;
  changePassword: (eskiParol: string, yangiParol: string) => Promise<{ ok: boolean; error?: string }>;
  adminResetPassword: (targetId: string, newParol: string) => Promise<{ ok: boolean; error?: string }>;
}

const AuthCtx = createContext<AuthValue | null>(null);

// Sessiya HAR DOIM shu brauzerga xos localStorage'da saqlanadi — umumiy
// `store` (Supabase) orqali emas. `store` barcha qurilmalar uchun bitta
// umumiy kalit-qiymat jadvali, shuning uchun sessiyani u yerda saqlash
// bir o'quvchi login qilganda BOSHQA QURILMALARDAGI o'quvchilarni ham
// avtomatik shu hisobga kirgizib yuborardi.
const SESSION_KEY = "afp:session_user_id";
// Login paytida olingan sessiya tokeni — "yozish" so'rovlarida (addUser/
// removeUser/patchUser/updateProfile/changePassword) chaqiruvchini server
// tomonida tasdiqlash uchun localStorage'da sessiya id'si bilan birga
// saqlanadi (qarang: supabase-migration-v5-session-tokens.sql).
const SESSION_TOKEN_KEY = "afp:session_token";

function getLocalSession(): { id: string; token: string } | null {
  try {
    const id = localStorage.getItem(SESSION_KEY);
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    return id && token ? { id, token } : null;
  } catch { return null; }
}
function setLocalSession(id: string, token: string): void {
  try {
    localStorage.setItem(SESSION_KEY, id);
    localStorage.setItem(SESSION_TOKEN_KEY, token);
  } catch { /* ignore */ }
}
function clearLocalSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_TOKEN_KEY);
  } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  // Darhol zaxiradan yuklash — Supabase kelgunga qadar o'quvchilar ko'rinadi
  const [users, setUsers] = useState<User[]>(() => {
    const backup = loadUsersBackup();
    return backup.length > 0 ? backup : SEED_USERS;
  });
  const [ready, setReady] = useState(false);

  const loadAvatar = async (id: string) => {
    const av = await store.get<string>(`avatar_${id}`);
    setAvatar(av ?? null);
  };

  // Mount: foydalanuvchilarni va sessiyani yuklash
  useEffect(() => {
    (async () => {
      try {
        const fetched = await usersApi.getUsers();
        let effectiveList: User[];
        if (fetched.length > 0) {
          saveUsersBackup(fetched);
          setUsers(fetched);
          effectiveList = fetched;
        } else {
          // Supabase bo'sh qaytardi (pauza/xato) — mahalliy zaxiradan foydalanamiz
          const backup = loadUsersBackup();
          if (backup.length > 0) {
            setUsers(backup);
            effectiveList = backup;
          } else {
            effectiveList = SEED_USERS;
          }
        }

        // Telegram Mini App ichida bo'lsak, Telegram orqali HMAC bilan
        // tasdiqlangan joriy hisob HAR DOIM shu qurilmada eski saqlangan
        // sessiyadan (masalan, avval CEO parol bilan kirilgan bo'lsa) ustun
        // turishi kerak — aks holda bitta qurilmada avval boshqa hisob bilan
        // kirilgan bo'lsa, Telegram orqali ochilganda ham o'sha eski
        // foydalanuvchi ko'rsatilib qolar edi.
        if (isTelegramMiniApp()) {
          initTelegramApp();
          const initData = getTelegramInitData();
          if (initData) {
            const res = await usersApi.loginWithTelegram(initData);
            if (res) {
              setUser(res.user);
              setToken(res.token);
              setLocalSession(res.user.id, res.token);
              await loadAvatar(res.user.id);
              setReady(true);
              return;
            }
          }
        }

        const session = getLocalSession();
        if (session) {
          // Supabase rejimida token format: "userId.expiry.hmac" (2 ta nuqta).
          // Eski localStorage tokeni faqat ID ("t1", "s6") — Supabase rad etadi.
          const isValidSupabaseToken = session.token.split('.').length === 3;
          if (isSupabaseMode && !isValidSupabaseToken) {
            clearLocalSession();
          } else {
            const u = effectiveList.find((x) => x.id === session.id);
            if (u) {
              setUser(u);
              setToken(session.token);
              await loadAvatar(u.id);
            } else {
              clearLocalSession();
            }
          }
        }
      } catch {
        // Supabase yoki boshqa tarmoq xatosi — SEED_USERS bilan davom etamiz
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const login = async (login: string, parol: string, role: Role): Promise<User | null> => {
    const res = await usersApi.login(login, parol, role);
    if (res) {
      setUser(res.user);
      setToken(res.token);
      setLocalSession(res.user.id, res.token);
      void loadAvatar(res.user.id);
    }
    return res?.user ?? null;
  };

  const loginStudentById = async (telegramId: string): Promise<User | null> => {
    const res = await usersApi.loginStudentById(telegramId);
    if (res) {
      setUser(res.user);
      setToken(res.token);
      setLocalSession(res.user.id, res.token);
      void loadAvatar(res.user.id);
    }
    return res?.user ?? null;
  };

  const loginWithTelegram = async (initData: string): Promise<User | null> => {
    const res = await usersApi.loginWithTelegram(initData);
    if (res) {
      setUser(res.user);
      setToken(res.token);
      setLocalSession(res.user.id, res.token);
      void loadAvatar(res.user.id);
    }
    return res?.user ?? null;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAvatar(null);
    clearLocalSession();
  };

  const updateAvatar = (dataUrl: string) => {
    if (!user) return;
    setAvatar(dataUrl);
    void store.set(`avatar_${user.id}`, dataUrl);
  };

  const addUser = async (u: Omit<User, "id">): Promise<{ ok: boolean; error?: string }> => {
    if (!token) return { ok: false, error: "Sessiya topilmadi" };
    const res = await usersApi.addUser(token, u);
    if (res.ok && res.user) setUsers((cur) => { const next = [...cur, res.user!]; saveUsersBackup(next); return next; });
    return { ok: res.ok, error: res.error };
  };

  const removeUser = async (id: string): Promise<void> => {
    if (!token) return;
    await usersApi.removeUser(token, id);
    setUsers((cur) => { const next = cur.filter((x) => x.id !== id); saveUsersBackup(next); return next; });
  };

  const updateProfile = async (data: { ism: string; familya: string; tel?: string; tugilgan?: string }): Promise<{ ok: boolean; error?: string }> => {
    if (!user || !token) return { ok: false, error: "Foydalanuvchi topilmadi" };
    const res = await usersApi.updateProfile(token, data);
    if (res.ok && res.user) {
      setUser(res.user);
      setUsers((cur) => cur.map((x) => (x.id === user.id ? res.user! : x)));
    }
    return { ok: res.ok, error: res.error };
  };

  const patchUser = useCallback(async (id: string, patch: Partial<Omit<User, "id">>): Promise<void> => {
    if (!token) return;
    const updated = await usersApi.patchUser(token, id, patch);
    if (updated) setUsers((cur) => cur.map((x) => (x.id === id ? updated : x)));
  }, [token]);

  const changePassword = async (eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }> => {
    if (!token) return { ok: false, error: "Foydalanuvchi topilmadi" };
    return usersApi.changePassword(token, eskiParol, yangiParol);
  };

  const adminResetPassword = async (targetId: string, newParol: string): Promise<{ ok: boolean; error?: string }> => {
    if (!token) return { ok: false, error: "Sessiya topilmadi" };
    return usersApi.adminResetPassword(token, targetId, newParol);
  };

  return (
    <AuthCtx.Provider value={{ user, ready, avatar, users, login, loginWithTelegram, loginStudentById, logout, updateAvatar, updateProfile, addUser, removeUser, patchUser, changePassword, adminResetPassword }}>
      {children}
    </AuthCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthValue {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak");
  return ctx;
}
