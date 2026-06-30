import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { store } from "../../lib/storage";
import { useAuth } from "../../auth/AuthContext";
import type { User } from "../../auth/types";

export type BookingStatus = "scheduled" | "completed" | "cancelled" | "noshow";

export interface AssistantBooking {
  id: string;
  studentId: string;
  assistantId: string;
  /** ISO sana-vaqt */
  scheduledAt: string;
  status: BookingStatus;
  createdAt: string;
  /** O'quvchi dars vaqti oynasida "QR ko'rsatish" tugmasini bosgan payt (ISO) */
  studentPresentAt?: string;
  /** Yordamchi ustoz QR kodni skanerlagan payt (ISO) */
  checkedInAt?: string;
}

export const QR_PREFIX = "AFPBOOK:";
const LESSON_MIN = 60;
const WINDOW_BEFORE_MIN = 5;
const BLOCK_DAYS = 3;
const KEY = "assistant_bookings";

export const withinBookingWindow = (scheduledAt: string) => {
  const start = new Date(scheduledAt).getTime();
  const now = Date.now();
  return now >= start - WINDOW_BEFORE_MIN * 60_000 && now <= start + LESSON_MIN * 60_000;
};

function resolveExpired(
  list: AssistantBooking[],
  patchUser: (id: string, patch: Partial<Omit<User, "id">>) => void,
  getUser: (id: string) => User | undefined,
): { next: AssistantBooking[]; changed: boolean } {
  const now = Date.now();
  let changed = false;
  const next = list.map((b) => {
    if (b.status !== "scheduled") return b;
    const end = new Date(b.scheduledAt).getTime() + LESSON_MIN * 60_000;
    if (now <= end) return b;
    changed = true;
    if (b.studentPresentAt) {
      const a = getUser(b.assistantId);
      const rating = Math.max(0, (a?.assistantRating ?? 100) - 10);
      patchUser(b.assistantId, { assistantRating: rating });
    } else {
      const until = new Date(now + BLOCK_DAYS * 86_400_000).toISOString();
      patchUser(b.studentId, { assistantBlockedUntil: until });
    }
    return { ...b, status: "noshow" as BookingStatus };
  });
  return { next, changed };
}

interface AssistantValue {
  ready: boolean;
  bookings: AssistantBooking[];
  createBooking: (studentId: string, assistantId: string, scheduledAt: string) => { ok: boolean; error?: string };
  cancelBooking: (id: string, requesterId: string) => { ok: boolean; error?: string };
  markPresent: (id: string, requesterId: string) => { ok: boolean; error?: string };
  checkIn: (code: string, assistantId: string) => { ok: boolean; error?: string; booking?: AssistantBooking };
}

const Ctx = createContext<AssistantValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const { users, patchUser } = useAuth();
  const [bookings, setBookings] = useState<AssistantBooking[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const b = await store.get<AssistantBooking[]>(KEY);
      if (!alive) return;
      setBookings(b ?? []);
      setReady(true);
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      setBookings((cur) => {
        const { next, changed } = resolveExpired(cur, patchUser, (id) => users.find((u) => u.id === id));
        if (changed) void store.set(KEY, next);
        return changed ? next : cur;
      });
    };
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, [ready, users, patchUser]);

  const mutate = (fn: (cur: AssistantBooking[]) => AssistantBooking[]) => {
    setBookings((cur) => {
      const next = fn(cur);
      void store.set(KEY, next);
      return next;
    });
  };

  const createBooking: AssistantValue["createBooking"] = (studentId, assistantId, scheduledAt) => {
    const student = users.find((u) => u.id === studentId);
    if (student?.assistantBlockedUntil && new Date(student.assistantBlockedUntil).getTime() > Date.now()) {
      return { ok: false, error: "Siz vaqtinchalik bloklangansiz" };
    }
    const time = new Date(scheduledAt).getTime();
    if (!scheduledAt || Number.isNaN(time) || time <= Date.now()) {
      return { ok: false, error: "Vaqtni to'g'ri tanlang (kelajakdagi vaqt bo'lishi kerak)" };
    }
    const hasActive = bookings.some((b) => b.studentId === studentId && b.status === "scheduled");
    if (hasActive) {
      return { ok: false, error: "Sizda allaqachon band qilingan dars mavjud" };
    }
    const overlap = bookings.some((b) => {
      if (b.assistantId !== assistantId || b.status !== "scheduled") return false;
      return Math.abs(new Date(b.scheduledAt).getTime() - time) < LESSON_MIN * 60_000;
    });
    if (overlap) {
      return { ok: false, error: "Bu ustoz shu vaqtda band" };
    }
    const booking: AssistantBooking = {
      id: "ab" + Date.now(),
      studentId,
      assistantId,
      scheduledAt: new Date(scheduledAt).toISOString(),
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };
    mutate((cur) => [...cur, booking]);
    return { ok: true };
  };

  const cancelBooking: AssistantValue["cancelBooking"] = (id, requesterId) => {
    const b = bookings.find((x) => x.id === id);
    if (!b || b.studentId !== requesterId) return { ok: false, error: "Topilmadi" };
    if (b.status !== "scheduled") return { ok: false, error: "Bu darsni bekor qilib bo'lmaydi" };
    if (Date.now() >= new Date(b.scheduledAt).getTime()) return { ok: false, error: "Dars vaqti boshlangan, bekor qilib bo'lmaydi" };
    mutate((cur) => cur.map((x) => (x.id === id ? { ...x, status: "cancelled" } : x)));
    return { ok: true };
  };

  const markPresent: AssistantValue["markPresent"] = (id, requesterId) => {
    const b = bookings.find((x) => x.id === id);
    if (!b || b.studentId !== requesterId) return { ok: false, error: "Topilmadi" };
    if (b.status !== "scheduled") return { ok: false, error: "Dars holati mos kelmadi" };
    if (!withinBookingWindow(b.scheduledAt)) return { ok: false, error: "Hozir dars vaqti emas" };
    if (!b.studentPresentAt) {
      mutate((cur) => cur.map((x) => (x.id === id ? { ...x, studentPresentAt: new Date().toISOString() } : x)));
    }
    return { ok: true };
  };

  const checkIn: AssistantValue["checkIn"] = (code, assistantId) => {
    const raw = code.trim();
    const id = raw.startsWith(QR_PREFIX) ? raw.slice(QR_PREFIX.length) : raw;
    const b = bookings.find((x) => x.id === id);
    if (!b) return { ok: false, error: "QR kod tanilmadi" };
    if (b.assistantId !== assistantId) return { ok: false, error: "Bu dars sizga tegishli emas" };
    if (b.status !== "scheduled") return { ok: false, error: "Bu dars allaqachon yakunlangan/bekor qilingan" };
    if (!withinBookingWindow(b.scheduledAt)) return { ok: false, error: "Dars vaqti emas" };
    const now = new Date().toISOString();
    const updated: AssistantBooking = { ...b, status: "completed", checkedInAt: now, studentPresentAt: b.studentPresentAt ?? now };
    mutate((cur) => cur.map((x) => (x.id === id ? updated : x)));
    return { ok: true, booking: updated };
  };

  return (
    <Ctx.Provider value={{ ready, bookings, createBooking, cancelBooking, markPresent, checkIn }}>
      {children}
    </Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAssistant(): AssistantValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAssistant AssistantProvider ichida ishlatilishi kerak");
  return ctx;
}
