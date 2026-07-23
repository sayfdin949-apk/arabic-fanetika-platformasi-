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
  manba?: "storage" | "url"; // qayerdan kelgan
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

  // URL orqali qo'shish — Supabase Storage kerak emas
  async addByUrl(
    url: string,
    meta: Pick<PdfKitob, "nomi" | "tavsif" | "rang" | "icon" | "daraja" | "tur">
  ): Promise<{ ok: boolean; error?: string }> {
    const client = sb();
    if (!client) return { ok: false, error: "Supabase ulanmagan" };
    if (!url.trim()) return { ok: false, error: "URL kiriting" };

    const kitob: PdfKitob = {
      ...meta,
      id: crypto.randomUUID(),
      url: url.trim(),
      fayl_nomi: url.split("/").pop()?.split("?")[0] ?? "kitob.pdf",
      hajm_kb: 0,
      qoshilgan: new Date().toISOString(),
      manba: "url",
    };
    const existing = await this.list();
    try {
      await client.from("afp_kv").upsert({
        key: META_KEY,
        value: { kitoblar: [...existing, kitob] },
        updated_at: new Date().toISOString(),
      });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  },

  // Fayl yuklash — Supabase Storage orqali (agar ishlasa)
  async upload(
    file: File,
    meta: Pick<PdfKitob, "nomi" | "tavsif" | "rang" | "icon" | "daraja" | "tur">
  ): Promise<{ ok: boolean; error?: string }> {
    if (!SUPABASE_URL || !SUPABASE_KEY) return { ok: false, error: "Supabase ulanmagan" };

    const id = crypto.randomUUID();
    const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${id}/${fileName}`;
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`;

    let uploadResp: Response;
    try {
      uploadResp = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
          "Content-Type": "application/pdf",
          "x-upsert": "false",
        },
        body: file,
      });
    } catch (e) {
      return { ok: false, error: "Tarmoq xatosi: " + String(e) };
    }

    if (!uploadResp.ok) {
      let msg = `Supabase Storage xatosi (HTTP ${uploadResp.status})`;
      try {
        const j = await uploadResp.json();
        msg = j.message ?? j.error ?? msg;
      } catch { /* ignore */ }
      return { ok: false, error: msg };
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
    const kitob: PdfKitob = {
      ...meta, id,
      url: publicUrl,
      fayl_nomi: file.name,
      hajm_kb: Math.round(file.size / 1024),
      qoshilgan: new Date().toISOString(),
      manba: "storage",
    };

    const client = sb()!;
    const existing = await this.list();
    await client.from("afp_kv").upsert({
      key: META_KEY,
      value: { kitoblar: [...existing, kitob] },
      updated_at: new Date().toISOString(),
    });
    return { ok: true };
  },

  async remove(kitob: PdfKitob): Promise<void> {
    // Storage faylni o'chirish (faqat storage orqali qo'shilgan bo'lsa)
    if (kitob.manba === "storage" && SUPABASE_URL && SUPABASE_KEY) {
      const match = kitob.url.match(/\/object\/public\/pdf-kitoblar\/(.+)$/);
      if (match?.[1]) {
        const path = decodeURIComponent(match[1]);
        await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${SUPABASE_KEY}`,
            apikey: SUPABASE_KEY,
          },
        }).catch(() => {});
      }
    }

    const client = sb();
    if (!client) return;
    const existing = await this.list();
    await client.from("afp_kv").upsert({
      key: META_KEY,
      value: { kitoblar: existing.filter((k) => k.id !== kitob.id) },
      updated_at: new Date().toISOString(),
    });
  },
};
