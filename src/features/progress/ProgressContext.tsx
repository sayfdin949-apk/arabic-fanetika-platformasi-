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
export type WrongMap = Record<string, number[]>; // "naz_1" | "amal_3" → wrong question indices

export interface Streak {
  days: number;
  lastDate: string;
}

interface ProgressValue {
  ready: boolean;
  nazDone: DoneMap;
  amalDone: DoneMap;
  unlocked: UnlockedMap;
  wrongMap: WrongMap;
  streak: Streak;
  isNazUnlocked: (id: number) => boolean;
  submitNaz: (darsId: number, ok: number, tot: number) => void;
  submitAmal: (bobId: number, ok: number, tot: number) => void;
  saveWrong: (key: string, indices: number[]) => void;
  clearWrong: (key: string) => void;
}

const Ctx = createContext<ProgressValue | null>(null);

const today = () => new Date().toLocaleDateString("uz");
const allUnlocked = (): UnlockedMap => Object.fromEntries(NAZARIY.map((d) => [d.id, true]));

function calcStreak(prev: Streak): Streak {
  const todayStr = today();
  if (prev.lastDate === todayStr) return prev;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString("uz");
  const days = prev.lastDate === yesterdayStr ? prev.days + 1 : 1;
  return { days, lastDate: todayStr };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isT = user?.role === "teacher";
  const [ready, setReady] = useState(false);
  const [nazDone, setNazDone] = useState<DoneMap>({});
  const [amalDone, setAmalDone] = useState<DoneMap>({});
  const [unlocked, setUnlocked] = useState<UnlockedMap>(isT ? allUnlocked() : { 1: true });
  const [wrongMap, setWrongMap] = useState<WrongMap>({});
  const [streak, setStreak] = useState<Streak>({ days: 1, lastDate: today() });

  useEffect(() => {
    if (!user) return;
    let alive = true;
    (async () => {
      const [nd, ad, ul, wm, st] = await Promise.all([
        store.get<DoneMap>(`naz_done_${user.id}`),
        store.get<DoneMap>(`amal_done_${user.id}`),
        store.get<UnlockedMap>(`unlocked_${user.id}`),
        store.get<WrongMap>(`wrong_${user.id}`),
        store.get<Streak>(`streak_${user.id}`),
      ]);
      if (!alive) return;
      if (nd) setNazDone(nd);
      if (ad) setAmalDone(ad);
      setUnlocked(isT ? allUnlocked() : ul ?? { 1: true });
      if (wm) setWrongMap(wm);
      const newStreak = calcStreak(st ?? { days: 0, lastDate: "" });
      setStreak(newStreak);
      void store.set(`streak_${user.id}`, newStreak);
      setReady(true);
    })();
    return () => { alive = false; };
  }, [user, isT]);

  const isNazUnlocked = (id: number) => isT || !!unlocked[id];

  const submitNaz = (darsId: number, ok: number, tot: number) => {
    if (!user) return;
    const pct = Math.round((ok / tot) * 100);
    const next = { ...nazDone, [darsId]: { ok, tot, pct, sana: today() } };
    setNazDone(next);
    void store.set(`naz_done_${user.id}`, next);
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

  const saveWrong = (key: string, indices: number[]) => {
    if (!user) return;
    const next = { ...wrongMap, [key]: indices };
    setWrongMap(next);
    void store.set(`wrong_${user.id}`, next);
  };

  const clearWrong = (key: string) => {
    if (!user) return;
    const next = { ...wrongMap };
    delete next[key];
    setWrongMap(next);
    void store.set(`wrong_${user.id}`, next);
  };

  return (
    <Ctx.Provider value={{ ready, nazDone, amalDone, unlocked, wrongMap, streak, isNazUnlocked, submitNaz, submitAmal, saveWrong, clearWrong }}>
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
