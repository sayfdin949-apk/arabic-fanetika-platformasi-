export type Role = "ceo" | "teacher" | "assistant" | "student";

export interface User {
  id: string;
  login: string;
  parol: string;
  /** Faqat Supabase rejimida to'ldiriladi (Auth email — login/parol o'zgartirishda ishlatiladi). */
  email?: string;
  ism: string;
  familya: string;
  role: Role;
  tugilgan?: string;
  tel?: string;
  avatar?: string | null;
  telegramId?: number;
  /** O'quvchi "Yordamchi ustoz" bo'limidan vaqtinchalik bloklangan bo'lsa, shu vaqtgacha (ISO) */
  assistantBlockedUntil?: string;
  /** Yordamchi ustoz ishonchlilik ko'rsatkichi (100 dan boshlanadi, kelishmaganda kamayadi) */
  assistantRating?: number;
  /** O'quv yo'nalishi: fonetika yoki grammatika */
  tur?: "grammatika" | "fonetika";
  /** Faqat Supabase rejimida to'ldiriladi (gamifikatsiya — spec 09-bo'lim). */
  xpTotal?: number;
  streakCurrent?: number;
  streakMax?: number;
  /** O'quvchi uchun — biriktirilgan o'qituvchi id'si (guruh reytingi uchun). */
  teacherId?: string;
}
