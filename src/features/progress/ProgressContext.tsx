import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { store } from "../../lib/storage";
import { useAuth } from "../../auth/AuthContext";
import { NAZARIY } from "../../content/nazariy";
import { markActivityToday } from "../../lib/pwa";
import { supabase, isSupabaseMode } from "../../lib/supabaseClient";

/*
 * Gamifikatsiya (2-bosqich): dars/mashq tugallanganda mavjud KV-asosli
 * progress (naz_done_${uid}, amal_done_${uid}, unlocked_${uid} — bular
 * unlock/qulflash mantig'ini boshqaradi va o'zgarishsiz qoladi) YONIDA,
 * Supabase rejimida `record_lesson_complete` SECURITY DEFINER RPC
 * chaqiriladi (qarang: supabase-migration-v13-gamification.sql) — bu
 * bitta atomik amalda `user_progress`ni yangilaydi, XP beradi (farming'ga
 * qarshi — faqat birinchi tugallashda to'liq, qayta topshirishda faqat
 * ball yaxshilansa farqi), streakni yangilaydi va yangi yutuqlarni beradi.
 * Natijadagi yutuqlar `newAchievements` state'iga qo'yiladi (banner uchun),
 * so'ng `refreshProfile()` chaqirilib `user.xpTotal/streakCurrent` darhol
 * yangilanadi.
 */
interface LessonRpcResult {
  ok: boolean;
  xpEarned?: number;
  streakCurrent?: number;
  newAchievements?: { code: string }[];
  error?: string;
}

async function callRecordLessonComplete(sourceKey: string, pct: number): Promise<LessonRpcResult | null> {
  if (!isSupabaseMode || !supabase) return null;
  try {
    const { data, error } = await supabase.rpc("record_lesson_complete", { p_source_key: sourceKey, p_score_pct: pct });
    if (error || !data) return null;
    return data as LessonRpcResult;
  } catch {
    // Gamifikatsiya RPC muvaffaqiyatsiz bo'lsa ham KV progress allaqachon
    // saqlangan, shuning uchun jim o'tamiz — foydalanuvchi darsni ko'radi,
    // faqat XP/yutuq kechroq yoki keyingi urinishda hisoblanadi.
    return null;
  }
}

async function callTouchDailyActivity(): Promise<LessonRpcResult | null> {
  if (!isSupabaseMode || !supabase) return null;
  try {
    const { data, error } = await supabase.rpc("touch_daily_activity");
    if (error || !data) return null;
    return data as LessonRpcResult;
  } catch {
    return null;
  }
}

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
  /** Bugun har qanday dars bajarilganda streakni yangilaydi (grammatika va boshqalar uchun) */
  touchStreak: () => void;
  /** Dars qulfini market'dan ishlatib, berilgan darsni ochadi. true qaytarsa muvaffaqiyatli. */
  consumeLessonUnlock: (darsId: number) => boolean;
  /** Grammatika darsi tugallanganda XP/yutuq RPC'sini chaqiradi (progress saqlash usuli o'zgarmaydi). */
  recordGramProgress: (darsId: number, pct: number) => void;
  /** Oxirgi chaqiruvda berilgan yangi yutuqlar (banner ko'rsatish uchun). */
  newAchievements: { code: string }[];
  clearNewAchievements: () => void;
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
  const { user, refreshProfile } = useAuth();
  const isT = user?.role === "teacher" || user?.role === "ceo" || user?.role === "assistant";
  const [ready, setReady] = useState(false);
  const [nazDone, setNazDone] = useState<DoneMap>({});
  const [amalDone, setAmalDone] = useState<DoneMap>({});
  const [unlocked, setUnlocked] = useState<UnlockedMap>(isT ? allUnlocked() : { 1: true });
  const [wrongMap, setWrongMap] = useState<WrongMap>({});
  const [streak, setStreak] = useState<Streak>({ days: 0, lastDate: "" });
  const [newAchievements, setNewAchievements] = useState<{ code: string }[]>([]);

  const applyLessonRpcResult = (res: LessonRpcResult | null) => {
    if (!res) return;
    if (res.newAchievements?.length) setNewAchievements((cur) => [...cur, ...res.newAchievements!]);
    void refreshProfile();
  };

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
      const rawStreak = st ?? { days: 0, lastDate: "" };
      let newStreak = calcStreak(rawStreak);
      // Streak buzilgan bo'lsa, shield tekshir
      if (newStreak.days === 1 && rawStreak.days > 1) {
        try {
          const pRaw = localStorage.getItem(`afp:market_purchases_${user.id}`);
          const p: Record<string, { itemId: string; count: number; lastBought: string }> = pRaw ? JSON.parse(pRaw) : {};
          if (p["streak_shield"] && p["streak_shield"].count > 0) {
            p["streak_shield"].count -= 1;
            if (p["streak_shield"].count <= 0) delete p["streak_shield"];
            localStorage.setItem(`afp:market_purchases_${user.id}`, JSON.stringify(p));
            newStreak = { days: rawStreak.days + 1, lastDate: newStreak.lastDate };
          }
        } catch { /* ignore */ }
      }
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
    void callRecordLessonComplete(`naz:${darsId}`, pct).then(applyLessonRpcResult);
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
    void callRecordLessonComplete(`amal:${bobId}`, pct).then(applyLessonRpcResult);
  };

  const recordGramProgress = (darsId: number, pct: number) => {
    if (!user) return;
    void callRecordLessonComplete(`gram:${darsId}`, pct).then(applyLessonRpcResult);
  };

  const clearNewAchievements = () => setNewAchievements([]);

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

  const touchStreak = () => {
    if (!user) return;
    markActivityToday();
    setStreak((prev) => {
      const updated = calcStreak(prev);
      void store.set(`streak_${user.id}`, updated);
      return updated;
    });
    void callTouchDailyActivity().then(applyLessonRpcResult);
  };

  const consumeLessonUnlock = (darsId: number): boolean => {
    if (!user) return false;
    try {
      const pRaw = localStorage.getItem(`afp:market_purchases_${user.id}`);
      const p: Record<string, { itemId: string; count: number; lastBought: string }> = pRaw ? JSON.parse(pRaw) : {};
      const rec = p["lesson_unlock"];
      if (!rec || rec.count <= 0) return false;
      p["lesson_unlock"] = { ...rec, count: rec.count - 1 };
      if (p["lesson_unlock"].count <= 0) delete p["lesson_unlock"];
      localStorage.setItem(`afp:market_purchases_${user.id}`, JSON.stringify(p));
      const nu = { ...unlocked, [darsId]: true };
      setUnlocked(nu);
      void store.set(`unlocked_${user.id}`, nu);
      return true;
    } catch { return false; }
  };

  return (
    <Ctx.Provider value={{ ready, nazDone, amalDone, unlocked, wrongMap, streak, isNazUnlocked, submitNaz, submitAmal, saveWrong, clearWrong, touchStreak, consumeLessonUnlock, recordGramProgress, newAchievements, clearNewAchievements }}>
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
