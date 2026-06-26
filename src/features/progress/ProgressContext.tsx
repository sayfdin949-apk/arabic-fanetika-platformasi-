import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { store } from "../../lib/storage";
import { useAuth } from "../../auth/AuthContext";
import { NAZARIY } from "../../content/nazariy";

export interface DoneRec {
  ok: number;
  tot: number;
  pct: number;
  sana: string;
}
export type DoneMap = Record<number, DoneRec>;
export type UnlockedMap = Record<number, boolean>;

interface ProgressValue {
  ready: boolean;
  nazDone: DoneMap;
  amalDone: DoneMap;
  unlocked: UnlockedMap;
  isNazUnlocked: (id: number) => boolean;
  submitNaz: (darsId: number, ok: number, tot: number) => void;
  submitAmal: (bobId: number, ok: number, tot: number) => void;
}

const Ctx = createContext<ProgressValue | null>(null);

const today = () => new Date().toLocaleDateString("uz");
const allUnlocked = (): UnlockedMap => Object.fromEntries(NAZARIY.map((d) => [d.id, true]));

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isT = user?.role === "teacher";
  const [ready, setReady] = useState(false);
  const [nazDone, setNazDone] = useState<DoneMap>({});
  const [amalDone, setAmalDone] = useState<DoneMap>({});
  const [unlocked, setUnlocked] = useState<UnlockedMap>(isT ? allUnlocked() : { 1: true });

  useEffect(() => {
    if (!user) return;
    let alive = true;
    (async () => {
      const [nd, ad, ul] = await Promise.all([
        store.get<DoneMap>(`naz_done_${user.id}`),
        store.get<DoneMap>(`amal_done_${user.id}`),
        store.get<UnlockedMap>(`unlocked_${user.id}`),
      ]);
      if (!alive) return;
      if (nd) setNazDone(nd);
      if (ad) setAmalDone(ad);
      setUnlocked(isT ? allUnlocked() : ul ?? { 1: true });
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [user, isT]);

  const isNazUnlocked = (id: number) => isT || !!unlocked[id];

  const submitNaz = (darsId: number, ok: number, tot: number) => {
    if (!user) return;
    const pct = Math.round((ok / tot) * 100);
    const next = { ...nazDone, [darsId]: { ok, tot, pct, sana: today() } };
    setNazDone(next);
    void store.set(`naz_done_${user.id}`, next);
    // ≥80% bo'lsa keyingi nazariy dars ochiladi
    if (!isT && pct >= 80 && darsId < NAZARIY.length) {
      const nu = { ...unlocked, [darsId + 1]: true };
      setUnlocked(nu);
      void store.set(`unlocked_${user.id}`, nu);
    }
  };

  const submitAmal = (bobId: number, ok: number, tot: number) => {
    if (!user) return;
    const pct = Math.round((ok / tot) * 100);
    const next = { ...amalDone, [bobId]: { ok, tot, pct, sana: today() } };
    setAmalDone(next);
    void store.set(`amal_done_${user.id}`, next);
  };

  return (
    <Ctx.Provider value={{ ready, nazDone, amalDone, unlocked, isNazUnlocked, submitNaz, submitAmal }}>
      {children}
    </Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress ProgressProvider ichida ishlatilishi kerak");
  return ctx;
}
