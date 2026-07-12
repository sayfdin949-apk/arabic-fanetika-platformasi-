import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "../auth/AuthContext";

interface CoinValue {
  coins: number;
  addCoins: (amount: number) => void;
}

const CoinCtx = createContext<CoinValue | null>(null);

const coinKey = (id: string) => `afp:coins_${id}`;

export function CoinProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (!user) { setCoins(0); return; }
    try {
      const stored = localStorage.getItem(coinKey(user.id));
      setCoins(stored ? parseInt(stored, 10) : 0);
    } catch { /* ignore */ }
  }, [user?.id]);

  const addCoins = (amount: number) => {
    if (!user) return;
    setCoins((c) => {
      const next = c + amount;
      try { localStorage.setItem(coinKey(user.id), String(next)); } catch { /* ignore */ }
      return next;
    });
  };

  return <CoinCtx.Provider value={{ coins, addCoins }}>{children}</CoinCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCoins(): CoinValue {
  const ctx = useContext(CoinCtx);
  if (!ctx) throw new Error("useCoins CoinProvider ichida ishlatilishi kerak");
  return ctx;
}
