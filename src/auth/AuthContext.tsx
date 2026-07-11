import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Role } from "./types";
import { SEED_USERS } from "./users";
import { usersApi } from "../lib/usersApi";
import { store } from "../lib/storage";
import { isTelegramMiniApp, getTelegramInitData, initTelegramApp } from "../lib/telegram";

interface AuthValue {
  user: User | null;
  ready: boolean;
  avatar: string | null;
  users: User[];
  login: (login: string, parol: string, role: Role) => Promise<User | null>;
  loginWithTelegram: (initData: string) => Promise<User | null>;
  logout: () => void;
  updateAvatar: (dataUrl: string) => void;
  updateProfile: (data: { ism: string; familya: string; tel?: string; tugilgan?: string }) => Promise<{ ok: boolean; error?: string }>;
  addUser: (u: Omit<User, "id">) => Promise<{ ok: boolean; error?: string }>;
  removeUser: (id: string) => Promise<void>;
  patchUser: (id: string, patch: Partial<Omit<User, "id">>) => Promise<void>;
  changePassword: (eskiParol: string, yangiParol: string) => Promise<{ ok: boolean; error?: string }>;
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
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [ready, setReady] = useState(false);

  const loadAvatar = async (id: string) => {
    const av = await store.get<string>(`avatar_${id}`);
    setAvatar(av ?? null);
  };

  // Mount: foydalanuvchilarni va sessiyani yuklash
  useEffect(() => {
    (async () => {
      try {
        const list = await usersApi.getUsers();
        setUsers(list);

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
          // Sessiyadagi foydalanuvchi sanitizatsiya qilingan ro'yxatda bo'lmasligi
          // mumkin emas (parolsiz ham id/role saqlanadi), shuning uchun shu yerdan topiladi.
          const u = list.find((x) => x.id === session.id);
          if (u) {
            setUser(u);
            setToken(session.token);
            await loadAvatar(u.id);
          } else {
            clearLocalSession();
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
    if (res.ok && res.user) setUsers((cur) => [...cur, res.user!]);
    return { ok: res.ok, error: res.error };
  };

  const removeUser = async (id: string): Promise<void> => {
    if (!token) return;
    await usersApi.removeUser(token, id);
    setUsers((cur) => cur.filter((x) => x.id !== id));
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

  const patchUser = async (id: string, patch: Partial<Omit<User, "id">>): Promise<void> => {
    if (!token) return;
    const updated = await usersApi.patchUser(token, id, patch);
    if (updated) setUsers((cur) => cur.map((x) => (x.id === id ? updated : x)));
  };

  const changePassword = async (eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }> => {
    if (!token) return { ok: false, error: "Foydalanuvchi topilmadi" };
    return usersApi.changePassword(token, eskiParol, yangiParol);
  };

  return (
    <AuthCtx.Provider value={{ user, ready, avatar, users, login, loginWithTelegram, logout, updateAvatar, updateProfile, addUser, removeUser, patchUser, changePassword }}>
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
