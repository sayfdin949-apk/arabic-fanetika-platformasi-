import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const BUCKET = "pdf-kitoblar";
const META_KEY = "pdf_kitoblar_meta";

export interface PdfKitob {
  id: string;
  nomi: string;
  tavsif: string;
  rang: string;
  icon: string;
  daraja: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Barchasi";
  tur: "darslik" | "lugat" | "qoida" | "matn";
  url: string;
  fayl_nomi: string;
  hajm_kb: number;
  qoshilgan: string;
}

function sb() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

export const pdfApi = {
  available: Boolean(SUPABASE_URL && SUPABASE_KEY),

  async list(): Promise<PdfKitob[]> {
    const client = sb();
    if (!client) return [];
    try {
      const { data } = await client.from("afp_kv").select("value").eq("key", META_KEY).maybeSingle();
      return (data?.value as { kitoblar: PdfKitob[] } | null)?.kitoblar ?? [];
    } catch { return []; }
  },

  async upload(
    file: File,
    meta: Pick<PdfKitob, "nomi" | "tavsif" | "rang" | "icon" | "daraja" | "tur">
  ): Promise<{ ok: boolean; error?: string }> {
    const client = sb();
    if (!client) return { ok: false, error: "Supabase ulanmagan" };
    const id = crypto.randomUUID();
    const path = `${id}/${file.name}`;
    const { error: uploadErr } = await client.storage
      .from(BUCKET)
      .upload(path, file, { contentType: "application/pdf", upsert: false });
    if (uploadErr) return { ok: false, error: uploadErr.message };
    const { data: urlData } = client.storage.from(BUCKET).getPublicUrl(path);
    const kitob: PdfKitob = {
      ...meta, id,
      url: urlData.publicUrl,
      fayl_nomi: file.name,
      hajm_kb: Math.round(file.size / 1024),
      qoshilgan: new Date().toISOString(),
    };
    const existing = await this.list();
    await client.from("afp_kv").upsert({
      key: META_KEY,
      value: { kitoblar: [...existing, kitob] },
      updated_at: new Date().toISOString(),
    });
    return { ok: true };
  },

  async remove(kitob: PdfKitob): Promise<void> {
    const client = sb();
    if (!client) return;
    try {
      const match = kitob.url.match(/\/pdf-kitoblar\/(.+)$/);
      if (match?.[1]) await client.storage.from(BUCKET).remove([decodeURIComponent(match[1])]);
    } catch { /* ignore */ }
    const existing = await this.list();
    await client.from("afp_kv").upsert({
      key: META_KEY,
      value: { kitoblar: existing.filter((k) => k.id !== kitob.id) },
      updated_at: new Date().toISOString(),
    });
  },
};
