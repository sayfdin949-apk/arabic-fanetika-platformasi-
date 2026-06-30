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

function getLocalSession(): string | null {
  try { return localStorage.getItem(SESSION_KEY); } catch { return null; }
}
function setLocalSession(id: string): void {
  try { localStorage.setItem(SESSION_KEY, id); } catch { /* ignore */ }
}
function clearLocalSession(): void {
  try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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
          const tgUser = await usersApi.loginWithTelegram(initData);
          if (tgUser) {
            setUser(tgUser);
            setLocalSession(tgUser.id);
            await loadAvatar(tgUser.id);
            setReady(true);
            return;
          }
        }
      }

      const id = getLocalSession();
      if (id) {
        // Sessiyadagi foydalanuvchi sanitizatsiya qilingan ro'yxatda bo'lmasligi
        // mumkin emas (parolsiz ham id/role saqlanadi), shuning uchun shu yerdan topiladi.
        const u = list.find((x) => x.id === id);
        if (u) {
          setUser(u);
          await loadAvatar(u.id);
        } else {
          clearLocalSession();
        }
      }
      setReady(true);
    })();
  }, []);

  const login = async (login: string, parol: string, role: Role): Promise<User | null> => {
    const u = await usersApi.login(login, parol, role);
    if (u) {
      setUser(u);
      setLocalSession(u.id);
      void loadAvatar(u.id);
    }
    return u;
  };

  const loginWithTelegram = async (initData: string): Promise<User | null> => {
    const u = await usersApi.loginWithTelegram(initData);
    if (u) {
      setUser(u);
      setLocalSession(u.id);
      void loadAvatar(u.id);
    }
    return u;
  };

  const logout = () => {
    setUser(null);
    setAvatar(null);
    clearLocalSession();
  };

  const updateAvatar = (dataUrl: string) => {
    if (!user) return;
    setAvatar(dataUrl);
    void store.set(`avatar_${user.id}`, dataUrl);
  };

  const addUser = async (u: Omit<User, "id">): Promise<{ ok: boolean; error?: string }> => {
    const res = await usersApi.addUser(u);
    if (res.ok && res.user) setUsers((cur) => [...cur, res.user!]);
    return { ok: res.ok, error: res.error };
  };

  const removeUser = async (id: string): Promise<void> => {
    await usersApi.removeUser(id);
    setUsers((cur) => cur.filter((x) => x.id !== id));
  };

  const updateProfile = async (data: { ism: string; familya: string; tel?: string; tugilgan?: string }): Promise<{ ok: boolean; error?: string }> => {
    if (!user) return { ok: false, error: "Foydalanuvchi topilmadi" };
    const res = await usersApi.updateProfile(user.id, data);
    if (res.ok && res.user) {
      setUser(res.user);
      setUsers((cur) => cur.map((x) => (x.id === user.id ? res.user! : x)));
    }
    return { ok: res.ok, error: res.error };
  };

  const patchUser = async (id: string, patch: Partial<Omit<User, "id">>): Promise<void> => {
    const updated = await usersApi.patchUser(id, patch);
    if (updated) setUsers((cur) => cur.map((x) => (x.id === id ? updated : x)));
  };

  const changePassword = async (eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }> => {
    if (!user) return { ok: false, error: "Foydalanuvchi topilmadi" };
    return usersApi.changePassword(user.id, eskiParol, yangiParol);
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
