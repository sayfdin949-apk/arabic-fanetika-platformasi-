import { AlertTriangle } from "lucide-react";
import { T } from "./theme/tokens";

/**
 * Prod build'da Supabase sozlanmagan bo'lsa (VITE_SUPABASE_URL /
 * VITE_SUPABASE_ANON_KEY yo'q) ko'rsatiladi. Muhim: aks holda ilova
 * JIMGINA localStorage rejimiga tushardi — bu esa foydalanuvchini
 * boshqa, ajratilgan backendga ulab, ma'lumot bo'linishiga
 * (biri Supabase'da, biri localStorage'da) olib kelardi. Loud-fail
 * silent-fallback'dan xavfsizroq: buzuq deploy darrov ko'rinadi.
 */
export function ConfigError() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
        background: T.meshHero,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          background: "rgba(255,138,149,.18)",
          border: "1px solid rgba(255,138,149,.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AlertTriangle size={30} color="#ff8a95" />
      </div>
      <div style={{ fontSize: 19, fontWeight: 700, color: "#fff" }}>
        Sozlama xatosi
      </div>
      <div
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,.72)",
          maxWidth: 360,
          lineHeight: 1.6,
        }}
      >
        Ilova serverga ulanish sozlamasini topa olmadi. Iltimos, keyinroq qayta
        urinib ko'ring yoki administrator bilan bog'laning.
      </div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,.4)",
          maxWidth: 360,
          lineHeight: 1.6,
          marginTop: 4,
        }}
      >
        Administrator uchun: deploy muhitida <code>VITE_SUPABASE_URL</code> va{" "}
        <code>VITE_SUPABASE_ANON_KEY</code> o'rnatilishi kerak.
      </div>
    </div>
  );
}
