import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { onUpdateAvailable, applyUpdate } from "./lib/pwa";
import { T } from "./theme/tokens";

/**
 * Yangi versiya o'rnatilib kutayotgan bo'lsa, pastda kichik banner
 * ko'rsatadi. "Yangilash" bosilganda kutayotgan SW darhol aktivlashadi
 * va sahifa yangilanadi (F3). F1 majburiy reload qilmaydi — bu ixtiyoriy,
 * lekin darhol eng yangi versiyaga o'tish imkonini beradi.
 */
export function UpdateBanner() {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    onUpdateAvailable(() => setShow(true));
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(13,58,26,.96)",
        border: "1px solid rgba(255,255,255,.15)",
        borderRadius: 14,
        padding: "12px 14px",
        boxShadow: "0 8px 28px rgba(0,0,0,.35)",
        maxWidth: 420,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
          Yangi versiya tayyor
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 1 }}>
          Yangilash uchun bosing
        </div>
      </div>
      <button
        onClick={() => {
          setBusy(true);
          applyUpdate();
        }}
        disabled={busy}
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: T.gLime,
          color: T.onCta,
          border: "none",
          borderRadius: 10,
          padding: "9px 15px",
          fontSize: 13,
          fontWeight: 700,
          cursor: busy ? "default" : "pointer",
          opacity: busy ? 0.7 : 1,
        }}
      >
        <RefreshCw size={15} />
        {busy ? "Yangilanmoqda…" : "Yangilash"}
      </button>
    </div>
  );
}
