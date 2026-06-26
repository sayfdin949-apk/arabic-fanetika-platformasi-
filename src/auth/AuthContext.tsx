import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Role } from "./types";
import { SEED_USERS } from "./users";
import { store } from "../lib/storage";

interface AuthValue {
  user: User | null;
  ready: boolean;
  avatar: string | null;
  login: (login: string, parol: string, role: Role) => User | null;
  logout: () => void;
  updateAvatar: (dataUrl: string) => void;
}

const AuthCtx = createContext<AuthValue | null>(null);
const SESSION_KEY = "session_user_id";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const loadAvatar = async (id: string) => {
    const av = await store.get<string>(`avatar_${id}`);
    setAvatar(av ?? null);
  };

  // Sahifa yangilanganda sessiyani tiklash
  useEffect(() => {
    (async () => {
      const id = await store.get<string>(SESSION_KEY);
      if (id) {
        const u = SEED_USERS.find((x) => x.id === id);
        if (u) {
          setUser(u);
          await loadAvatar(u.id);
        }
      }
      setReady(true);
    })();
  }, []);

  const login = (login: string, parol: string, role: Role): User | null => {
    const u = SEED_USERS.find((x) => x.login === login && x.parol === parol && x.role === role);
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

  return (
    <AuthCtx.Provider value={{ user, ready, avatar, login, logout, updateAvatar }}>{children}</AuthCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthValue {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak");
  return ctx;
}
