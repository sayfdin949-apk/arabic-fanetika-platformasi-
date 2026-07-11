/*
 * Saqlash qatlami (abstraksiya)
 *
 * Agar VITE_SUPABASE_URL va VITE_SUPABASE_ANON_KEY environment
 * o'zgaruvchilari bo'lsa → SupabaseAdapter (haqiqiy backend).
 * Aks holda → LocalStorageAdapter (brauzer localStorage).
 */

import { SupabaseAdapter } from "./supabaseAdapter";

export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  del(key: string): Promise<void>;
  /*
   * O'qi → o'zgartir → yoz, ziddiyatga qarshi himoya bilan (qarang:
   * SupabaseAdapter.update — bir nechta client bir vaqtda yozganda
   * biri ikkinchisini bosib yubormasligi uchun). LocalStorageAdapter'da
   * bitta brauzer/tab doirasida haqiqiy poyga bo'lmagani uchun oddiy
   * get+set yetarli.
   */
  update<T>(key: string, updater: (cur: T | null) => T): Promise<T>;
}

const PREFIX = "afp:";

export class LocalStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* kvota/private rejimda jim o'tamiz */
    }
  }

  async del(key: string): Promise<void> {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {
      /* ignore */
    }
  }

  async update<T>(key: string, updater: (cur: T | null) => T): Promise<T> {
    const cur = await this.get<T>(key);
    const next = updater(cur);
    await this.set(key, next);
    return next;
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const store: StorageAdapter =
  SUPABASE_URL && SUPABASE_KEY
    ? new SupabaseAdapter(SUPABASE_URL, SUPABASE_KEY)
    : new LocalStorageAdapter();

export const usingSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);
