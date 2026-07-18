import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
 * Yagona Supabase klienti — Auth sessiyasi shu orqali boshqariladi
 * (localStorage'da Supabase o'zi saqlaydi, avtomatik refresh bilan).
 * `lib/storage.ts` (afp_kv uchun) va bu fayl bir xil loyihaga ulanadi,
 * lekin bu klient auth-aware (getSession/onAuthStateChange ishlaydi).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseMode = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient | null = isSupabaseMode
  ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

/** Faqat Supabase rejimida chaqirilishi kerak bo'lgan joylar uchun — null bo'lsa xato beradi. */
export function requireSupabase(): SupabaseClient {
  if (!supabase) throw new Error("Supabase sozlanmagan (VITE_SUPABASE_URL/ANON_KEY yo'q)");
  return supabase;
}

function slugify(login: string): string {
  return (
    login
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "user"
  );
}

/**
 * O'quvchi/o'qituvchilar odatda email emas, "login" (username) bilan
 * ro'yxatga olinadi (spec ochiq ro'yxatdan o'tishni taqiqlaydi — admin
 * login+parol tanlaydi). Supabase Auth esa email talab qiladi, shuning
 * uchun login sintetik ichki domenga deterministik tarzda moslanadi.
 * Agar "login" allaqachon email ko'rinishida bo'lsa (masalan CEO/teacher
 * haqiqiy email kiritgan bo'lsa), o'zgarishsiz ishlatiladi. Bu funksiya
 * `admin-create-user` Edge Function’dagi bir xil mantiqning frontend
 * nusxasi — ikkalasi ham bir xil email hosil qilishi SHART.
 */
export function loginToEmail(login: string): string {
  const trimmed = login.trim().toLowerCase();
  if (trimmed.includes("@")) return trimmed;
  return `${slugify(trimmed)}@ichki.arabcha-fanetika.uz`;
}
