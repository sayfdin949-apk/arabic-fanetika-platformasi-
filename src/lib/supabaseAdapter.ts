import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { StorageAdapter } from "./storage";

/*
 * Supabase backend adapteri.
 * "afp_kv" jadvalida barcha ma'lumotlar key→value ko'rinishida saqlanadi.
 * Bu jadval Supabase dashboard-da quyidagi SQL bilan yaratiladi:
 *
 *   CREATE TABLE afp_kv (
 *     key TEXT PRIMARY KEY,
 *     value JSONB,
 *     updated_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 *   ALTER TABLE afp_kv ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "open" ON afp_kv FOR ALL USING (true) WITH CHECK (true);
 */

export class SupabaseAdapter implements StorageAdapter {
  private client: SupabaseClient;

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey);
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const { data, error } = await this.client
        .from("afp_kv")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error || !data) return null;
      return data.value as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await this.client
        .from("afp_kv")
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    } catch {
      /* tarmoq xatosida jim o'tamiz */
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.from("afp_kv").delete().eq("key", key);
    } catch {
      /* ignore */
    }
  }
}
