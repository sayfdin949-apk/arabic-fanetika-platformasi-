import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Role } from "./types";
import { SEED_USERS } from "./users";
import { getUsers, saveUsers } from "../lib/usersRepo";
import { store } from "../lib/storage";

interface AuthValue {
  user: User | null;
  ready: boolean;
  avatar: string | null;
  users: User[];
  login: (login: string, parol: string, role: Role) => User | null;
  logout: () => void;
  updateAvatar: (dataUrl: string) => void;
  addUser: (u: Omit<User, "id">) => { ok: boolean; error?: string };
  removeUser: (id: string) => void;
  changePassword: (eskiParol: string, yangiParol: string) => { ok: boolean; error?: string };
}

const AuthCtx = createContext<AuthValue | null>(null);
const SESSION_KEY = "session_user_id";

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
      const list = await getUsers();
      setUsers(list);
      const id = await store.get<string>(SESSION_KEY);
      if (id) {
        const u = list.find((x) => x.id === id);
        if (u) {
          setUser(u);
          await loadAvatar(u.id);
        }
      }
      setReady(true);
    })();
  }, []);

  const login = (login: string, parol: string, role: Role): User | null => {
    const u = users.find((x) => x.login.toLowerCase() === login.trim().toLowerCase() && x.parol === parol && x.role === role);
    if (u) {
      setUser(u);
      void store.set(SESSION_KEY, u.id);
      void loadAvatar(u.id);
      return u;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    setAvatar(null);
    void store.del(SESSION_KEY);
  };

  const updateAvatar = (dataUrl: string) => {
    if (!user) return;
    setAvatar(dataUrl);
    void store.set(`avatar_${user.id}`, dataUrl);
  };

  const addUser = (u: Omit<User, "id">): { ok: boolean; error?: string } => {
    const loginTaken = users.some((x) => x.login.toLowerCase() === u.login.trim().toLowerCase());
    if (loginTaken) return { ok: false, error: "Bu login band" };
    const id = "u" + Date.now();
    const list = [...users, { ...u, id, login: u.login.trim() }];
    setUsers(list);
    void saveUsers(list);
    return { ok: true };
  };

  const removeUser = (id: string) => {
    const list = users.filter((x) => x.id !== id);
    setUsers(list);
    void saveUsers(list);
  };

  const changePassword = (eskiParol: string, yangiParol: string): { ok: boolean; error?: string } => {
    if (!user) return { ok: false, error: "Foydalanuvchi topilmadi" };
    if (user.parol !== eskiParol) return { ok: false, error: "Eski parol noto'g'ri" };
    if (yangiParol.trim().length < 4) return { ok: false, error: "Yangi parol kamida 4 ta belgi bo'lishi kerak" };
    const updated = { ...user, parol: yangiParol.trim() };
    const list = users.map((x) => (x.id === user.id ? updated : x));
    setUsers(list);
    setUser(updated);
    void saveUsers(list);
    return { ok: true };
  };

  return (
    <AuthCtx.Provider value={{ user, ready, avatar, users, login, logout, updateAvatar, addUser, removeUser, changePassword }}>
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
