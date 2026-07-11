import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { StorageAdapter } from "./storage";
import { getSessionToken } from "./session";

/*
 * Supabase backend adapteri.
 * "afp_kv" jadvalida barcha ma'lumotlar key→value ko'rinishida saqlanadi,
 * LEKIN jadvalga to'g'ridan-to'g'ri (.from("afp_kv")) kirish YOPIQ —
 * barcha o'qish/yozish/o'chirish FAQAT quyidagi SECURITY DEFINER RPC
 * funksiyalar orqali, va ular chaqiruvchining HAQIQIY (server tomonida
 * tasdiqlangan) sessiya tokenini talab qiladi, ya'ni login qilinmagan
 * bo'lsa hech narsa o'qilmaydi/yozilmaydi.
 * Qarang: supabase-migration-v6-lockdown-kv.sql.
 */

export class SupabaseAdapter implements StorageAdapter {
  private client: SupabaseClient;

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey);
  }

  async get<T>(key: string): Promise<T | null> {
    const token = getSessionToken();
    if (!token) return null;
    try {
      const { data, error } = await this.client.rpc("afp_kv_get", {
        p_key: key,
        p_session_token: token,
      });
      if (error || data == null) return null;
      return data as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    const token = getSessionToken();
    if (!token) return;
    try {
      await this.client.rpc("afp_kv_set", {
        p_key: key,
        p_value: value as unknown as object,
        p_session_token: token,
      });
    } catch {
      /* tarmoq xatosida jim o'tamiz */
    }
  }

  async del(key: string): Promise<void> {
    const token = getSessionToken();
    if (!token) return;
    try {
      await this.client.rpc("afp_kv_del", { p_key: key, p_session_token: token });
    } catch {
      /* ignore */
    }
  }

  /*
   * O'qi → o'zgartir → yoz — versiya (optimistik lock) bilan. Ikkita
   * client bir xil kalitni bir vaqtda yangilasa, kech qolgani "conflict"
   * javobini oladi va joriy qiymatni qayta o'qib, updater'ni qayta
   * ishga tushiradi — shu orqali biri ikkinchisini sezmasdan bosib
   * yubormaydi (qarang: afp_kv_set ichidagi p_expected_version).
   */
  async update<T>(key: string, updater: (cur: T | null) => T, maxRetries = 5): Promise<T> {
    const token = getSessionToken();
    if (!token) throw new Error("Sessiya topilmadi");
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const { data: rows } = await this.client.rpc("afp_kv_get_versioned", {
        p_key: key,
        p_session_token: token,
      });
      const row = Array.isArray(rows) ? rows[0] : undefined;
      const cur = (row?.value ?? null) as T | null;
      const version = (row?.version ?? 0) as number;
      const next = updater(cur);
      const { data: res } = await this.client.rpc("afp_kv_set", {
        p_key: key,
        p_value: next as unknown as object,
        p_session_token: token,
        p_expected_version: version,
      });
      if (res?.ok) return next;
    }
    throw new Error("Yozishda ziddiyat: qayta urinishlar tugadi");
  }
}
