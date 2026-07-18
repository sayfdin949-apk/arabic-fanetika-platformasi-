import { createContext, useContext, useEffect, useCallback, useState, type ReactNode } from "react";
import type { User } from "./types";
import { SEED_USERS } from "./users";
import { usersApi } from "../lib/usersApi";
import { supabase, isSupabaseMode, loginToEmail } from "../lib/supabaseClient";
import { store } from "../lib/storage";

/*
 * Auth — ikki rejim:
 *
 *  - Lokal (isSupabaseMode=false): eski localStorage-asosli oddiy login
 *    (login+parol, seed foydalanuvchilar). Haqiqiy backend yo'q, faqat
 *    lokal dasturchi tajribasi uchun.
 *
 *  - Supabase (isSupabaseMode=true): haqiqiy Supabase Auth
 *    (`auth.users`, email+parol, JWT sessiya — `supabase-js` o'zi
 *    localStorage'da saqlaydi va yangilaydi). Rol/profil `profiles`
 *    jadvalidan o'qiladi (qarang: supabase-migration-v12-auth-schema-
 *    foundation.sql). Ochiq ro'yxatdan o'tish yo'q — yangi foydalanuvchi
 *    faqat CEO/teacher tomonidan `admin-create-user` Edge Function orqali
 *    yaratiladi.
 *
 * Eski Telegram Mini App / parolsiz Telegram-ID kirish usullari OLIB
 * TASHLANDI — spec standart email+parol Auth talab qiladi.
 */

interface ProfileRow {
  id: string;
  login: string;
  email: string;
  ism: string;
  familya: string;
  role: User["role"];
  teacher_id: string | null;
  avatar_url: string | null;
  phone: string | null;
  tugilgan: string | null;
  tur: "fonetika" | "grammatika" | null;
  telegram_id: number | null;
  assistant_blocked_until: string | null;
  assistant_rating: number;
  is_active: boolean;
}

function profileToUser(p: ProfileRow): User {
  return {
    id: p.id,
    login: p.login,
    parol: "",
    email: p.email,
    ism: p.ism,
    familya: p.familya,
    role: p.role,
    tugilgan: p.tugilgan ?? undefined,
    tel: p.phone ?? undefined,
    avatar: p.avatar_url,
    telegramId: p.telegram_id ?? undefined,
    assistantBlockedUntil: p.assistant_blocked_until ?? undefined,
    assistantRating: p.assistant_rating,
    tur: p.tur ?? undefined,
  };
}

const PROFILE_COLUMNS =
  "id, login, email, ism, familya, role, teacher_id, avatar_url, phone, tugilgan, tur, telegram_id, assistant_blocked_until, assistant_rating, is_active";

interface AuthValue {
  user: User | null;
  ready: boolean;
  avatar: string | null;
  users: User[];
  login: (login: string, parol: string) => Promise<User | null>;
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

// ── Lokal rejim uchun sessiya (localStorage) ──
const SESSION_KEY = "afp:session_user_id";
const SESSION_TOKEN_KEY = "afp:session_token";

function getLocalSession(): { id: string; token: string } | null {
  try {
    const id = localStorage.getItem(SESSION_KEY);
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    return id && token ? { id, token } : null;
  } catch {
    return null;
  }
}
function setLocalSession(id: string, token: string): void {
  try {
    localStorage.setItem(SESSION_KEY, id);
    localStorage.setItem(SESSION_TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}
function clearLocalSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_TOKEN_KEY);
  } catch {
    /* ignore */
  }
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

  const fetchProfile = useCallback(async (id: string): Promise<User | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase.from("profiles").select(PROFILE_COLUMNS).eq("id", id).single();
    if (error || !data) return null;
    return profileToUser(data as ProfileRow);
  }, []);

  const refreshUsers = useCallback(async () => {
    if (isSupabaseMode && supabase) {
      const { data, error } = await supabase.from("profiles").select(PROFILE_COLUMNS);
      if (!error && data) setUsers((data as ProfileRow[]).map(profileToUser));
    } else {
      setUsers(await usersApi.getUsers());
    }
  }, []);

  // Mount: sessiyani tiklash
  useEffect(() => {
    (async () => {
      try {
        if (isSupabaseMode && supabase) {
          const { data } = await supabase.auth.getSession();
          const authUser = data.session?.user;
          if (authUser) {
            const profile = await fetchProfile(authUser.id);
            if (profile) {
              setUser(profile);
              void loadAvatar(profile.id);
            }
          }
          await refreshUsers();

          supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
              setUser(null);
              setAvatar(null);
              return;
            }
            void fetchProfile(session.user.id).then((profile) => {
              if (profile) {
                setUser(profile);
                void loadAvatar(profile.id);
              }
            });
          });
        } else {
          await refreshUsers();
          const session = getLocalSession();
          if (session) {
            const list = await usersApi.getUsers();
            const u = list.find((x) => x.id === session.id);
            if (u) {
              setUser(u);
              await loadAvatar(u.id);
            } else {
              clearLocalSession();
            }
          }
        }
      } catch {
        // tarmoq xatosi — ready baribir true bo'ladi, Login ekrani ko'rsatiladi
      } finally {
        setReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (loginOrEmail: string, parol: string): Promise<User | null> => {
    if (isSupabaseMode && supabase) {
      const email = loginToEmail(loginOrEmail);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: parol });
      if (error || !data.user) return null;
      const profile = await fetchProfile(data.user.id);
      if (!profile) {
        await supabase.auth.signOut();
        return null;
      }
      setUser(profile);
      void loadAvatar(profile.id);
      return profile;
    }
    const res = await usersApi.login(loginOrEmail, parol);
    if (res) {
      setUser(res.user);
      setLocalSession(res.user.id, res.token);
      void loadAvatar(res.user.id);
    }
    return res?.user ?? null;
  };

  const logout = () => {
    if (isSupabaseMode && supabase) void supabase.auth.signOut();
    setUser(null);
    setAvatar(null);
    clearLocalSession();
  };

  const updateAvatar = (dataUrl: string) => {
    if (!user) return;
    setAvatar(dataUrl);
    void store.set(`avatar_${user.id}`, dataUrl);
    if (isSupabaseMode && supabase) {
      void supabase.from("profiles").update({ avatar_url: dataUrl }).eq("id", user.id);
    }
  };

  const addUser = async (u: Omit<User, "id">): Promise<{ ok: boolean; error?: string }> => {
    if (isSupabaseMode && supabase) {
      const { data, error } = await supabase.functions.invoke("admin-create-user", {
        body: {
          action: "create",
          login: u.login,
          parol: u.parol,
          ism: u.ism,
          familya: u.familya,
          role: u.role,
          tel: u.tel,
          tugilgan: u.tugilgan,
          telegramId: u.telegramId,
          tur: u.tur,
        },
      });
      if (error) return { ok: false, error: error.message };
      const res = data as { ok: boolean; error?: string; user?: ProfileRow };
      if (res.ok && res.user) setUsers((cur) => [...cur, profileToUser(res.user!)]);
      return { ok: res.ok, error: res.error };
    }
    if (!user) return { ok: false, error: "Sessiya topilmadi" };
    const res = await usersApi.addUser(user.id, u);
    if (res.ok && res.user) setUsers((cur) => [...cur, res.user!]);
    return { ok: res.ok, error: res.error };
  };

  const removeUser = async (id: string): Promise<void> => {
    if (isSupabaseMode && supabase) {
      // Yumshoq o'chirish (bloklash) — auth.users yozuvini o'chirish uchun
      // service-role kerak bo'lardi; is_active=false RLS orqali (CEO/teacher)
      // ruxsat etilgan va spec'dagi "bloklash/faollashtirish" bilan mos.
      await supabase.from("profiles").update({ is_active: false }).eq("id", id);
      setUsers((cur) => cur.filter((x) => x.id !== id));
      return;
    }
    if (!user) return;
    await usersApi.removeUser(user.id, id);
    setUsers((cur) => cur.filter((x) => x.id !== id));
  };

  const updateProfile = async (data: { ism: string; familya: string; tel?: string; tugilgan?: string }): Promise<{ ok: boolean; error?: string }> => {
    if (!user) return { ok: false, error: "Foydalanuvchi topilmadi" };
    if (!data.ism.trim()) return { ok: false, error: "Ism majburiy" };
    if (isSupabaseMode && supabase) {
      const { data: row, error } = await supabase
        .from("profiles")
        .update({ ism: data.ism.trim(), familya: data.familya.trim(), phone: data.tel?.trim() || null, tugilgan: data.tugilgan?.trim() || null })
        .eq("id", user.id)
        .select(PROFILE_COLUMNS)
        .single();
      if (error || !row) return { ok: false, error: error?.message ?? "Server xatosi" };
      const updated = profileToUser(row as ProfileRow);
      setUser(updated);
      setUsers((cur) => cur.map((x) => (x.id === user.id ? updated : x)));
      return { ok: true };
    }
    const res = await usersApi.updateProfile(user.id, data);
    if (res.ok && res.user) {
      setUser(res.user);
      setUsers((cur) => cur.map((x) => (x.id === user.id ? res.user! : x)));
    }
    return { ok: res.ok, error: res.error };
  };

  const patchUser = useCallback(
    async (id: string, patch: Partial<Omit<User, "id">>): Promise<void> => {
      if (isSupabaseMode && supabase) {
        const payload: Record<string, unknown> = {};
        if (patch.ism !== undefined) payload.ism = patch.ism;
        if (patch.familya !== undefined) payload.familya = patch.familya;
        if (patch.tel !== undefined) payload.phone = patch.tel;
        if (patch.tugilgan !== undefined) payload.tugilgan = patch.tugilgan;
        if (patch.tur !== undefined) payload.tur = patch.tur;
        if (patch.telegramId !== undefined) payload.telegram_id = patch.telegramId;
        if (patch.avatar !== undefined) payload.avatar_url = patch.avatar;
        if (patch.assistantBlockedUntil !== undefined) payload.assistant_blocked_until = patch.assistantBlockedUntil;
        if (patch.assistantRating !== undefined) payload.assistant_rating = patch.assistantRating;
        const { data: row, error } = await supabase.from("profiles").update(payload).eq("id", id).select(PROFILE_COLUMNS).single();
        if (!error && row) {
          const updated = profileToUser(row as ProfileRow);
          setUsers((cur) => cur.map((x) => (x.id === id ? updated : x)));
        }
        return;
      }
      if (!user) return;
      const updated = await usersApi.patchUser(user.id, id, patch);
      if (updated) setUsers((cur) => cur.map((x) => (x.id === id ? updated : x)));
    },
    [user]
  );

  const changePassword = async (eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }> => {
    if (!user) return { ok: false, error: "Foydalanuvchi topilmadi" };
    if (yangiParol.trim().length < 4) return { ok: false, error: "Yangi parol kamida 4 ta belgi bo'lishi kerak" };
    if (isSupabaseMode && supabase) {
      if (!user.email) return { ok: false, error: "Email topilmadi" };
      const { error: reauthErr } = await supabase.auth.signInWithPassword({ email: user.email, password: eskiParol });
      if (reauthErr) return { ok: false, error: "Eski parol noto'g'ri" };
      const { error } = await supabase.auth.updateUser({ password: yangiParol.trim() });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    }
    return usersApi.changePassword(user.id, eskiParol, yangiParol);
  };

  const adminResetPassword = async (targetId: string, newParol: string): Promise<{ ok: boolean; error?: string }> => {
    if (!user) return { ok: false, error: "Sessiya topilmadi" };
    if (isSupabaseMode && supabase) {
      const { data, error } = await supabase.functions.invoke("admin-create-user", {
        body: { action: "resetPassword", targetId, newParol },
      });
      if (error) return { ok: false, error: error.message };
      return data as { ok: boolean; error?: string };
    }
    return usersApi.adminResetPassword(user.id, targetId, newParol);
  };

  return (
    <AuthCtx.Provider
      value={{ user, ready, avatar, users, login, logout, updateAvatar, updateProfile, addUser, removeUser, patchUser, changePassword, adminResetPassword }}
    >
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
