import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Role } from "./types";
import { SEED_USERS } from "./users";
import { store } from "../lib/storage";

interface AuthValue {
  user: User | null;
  ready: boolean;
  login: (login: string, parol: string, role: Role) => User | null;
  logout: () => void;
}

const AuthCtx = createContext<AuthValue | null>(null);
const SESSION_KEY = "session_user_id";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // Sahifa yangilanganda sessiyani tiklash
  useEffect(() => {
    (async () => {
      const id = await store.get<string>(SESSION_KEY);
      if (id) {
        const u = SEED_USERS.find((x) => x.id === id);
        if (u) setUser(u);
      }
      setReady(true);
    })();
  }, []);

  const login = (login: string, parol: string, role: Role): User | null => {
    const u = SEED_USERS.find((x) => x.login === login && x.parol === parol && x.role === role);
    if (u) {
      setUser(u);
      void store.set(SESSION_KEY, u.id);
      return u;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    void store.del(SESSION_KEY);
  };

  return <AuthCtx.Provider value={{ user, ready, login, logout }}>{children}</AuthCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthValue {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak");
  return ctx;
}
