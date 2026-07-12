import { useState } from "react";
import { BookOpen, ChevronRight, X, FileText, BookMarked, List, BookCopy } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { KITOBLAR, type Kitob, type KitobBob } from "../../content/kitoblar";

const TUR_ICON: Record<string, string> = {
  darslik: "📗",
  lugat: "📖",
  qoida: "📋",
  matn: "📚",
};

const TUR_LABEL: Record<string, string> = {
  darslik: "Darslik",
  lugat: "Lug'at",
  qoida: "Qoida",
  matn: "Matn",
};

const DARAJA_RANG: Record<string, string> = {
  A0: "#0891B2",
  A1: "#2563EB",
  A2: "#059669",
  B1: "#CA8A04",
  B2: "#DC2626",
  C1: "#7C3AED",
  C2: "#BE185D",
};

function KitobCard({ kitob, onClick }: { kitob: Kitob; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff", borderRadius: 16, overflow: "hidden",
        border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)",
        cursor: "pointer", display: "flex", flexDirection: "column",
        transition: "transform .12s, box-shadow .12s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(13,58,26,.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(13,58,26,.06)"; }}
    >
      {/* Cover */}
      <div style={{
        background: `linear-gradient(135deg,${kitob.rang}22,${kitob.rang}44)`,
        height: 88, display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: `2px solid ${kitob.rang}25`, position: "relative",
      }}>
        <span style={{ fontSize: 36 }}>{kitob.icon}</span>
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: DARAJA_RANG[kitob.daraja] ?? kitob.rang, color: "#fff",
          borderRadius: 7, fontSize: 9, fontWeight: 700, padding: "2px 6px",
        }}>
          {kitob.daraja}
        </div>
        <div style={{
          position: "absolute", bottom: 8, left: 8,
          background: "rgba(255,255,255,.8)", borderRadius: 7, fontSize: 9, fontWeight: 600,
          padding: "2px 7px", color: kitob.rang,
        }}>
          {TUR_LABEL[kitob.tur]}
        </div>
      </div>

      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 3, lineHeight: 1.3 }}>{kitob.nomi}</div>
        <div style={{ fontSize: 10, color: T.hint, lineHeight: 1.4, flex: 1 }}>{kitob.tavsif}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint, fontSize: 10 }}>
            <FileText size={10} />
            <span>{kitob.sahifalar} sahifa</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint, fontSize: 10 }}>
            <List size={10} />
            <span>{kitob.boblar.length} bob</span>
          </div>
          <ChevronRight size={14} color={T.hint} />
        </div>
      </div>
    </div>
  );
}

function KitobReader({
  kitob,
  onClose,
}: {
  kitob: Kitob;
  onClose: () => void;
}) {
  const [activeBob, setActiveBob] = useState<KitobBob>(kitob.boblar[0]);
  const [showBoblar, setShowBoblar] = useState(false);

  return (
    <div style={{ position: "fixed", inset: 0, background: T.meshLight, zIndex: 200, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: T.gGreen, padding: "14px 16px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onClose}
            style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12, fontWeight: 600, flexShrink: 0 }}
          >
            <X size={14} color="#fff" />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{kitob.nomi}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>{activeBob.nomi}</div>
          </div>
          <button
            onClick={() => setShowBoblar((v) => !v)}
            style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12, fontWeight: 600, flexShrink: 0 }}
          >
            <BookMarked size={14} color="#fff" />
          </button>
        </div>
      </div>

      {/* Bob tanlash panel */}
      {showBoblar && (
        <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,58,26,.08)", padding: "10px 14px", flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, marginBottom: 8 }}>BOBLAR</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {kitob.boblar.map((bob) => (
              <button
                key={bob.id}
                onClick={() => { setActiveBob(bob); setShowBoblar(false); }}
                style={{
                  background: activeBob.id === bob.id ? "rgba(13,58,26,.07)" : "transparent",
                  border: "none", borderRadius: 8, padding: "8px 10px",
                  textAlign: "left", cursor: "pointer", fontSize: 12, fontWeight: activeBob.id === bob.id ? 700 : 500,
                  color: activeBob.id === bob.id ? T.green : T.text2,
                }}
              >
                {bob.nomi}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.green, marginBottom: 16 }}>{activeBob.nomi}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activeBob.matn.map((satir, i) => (
            <div
              key={i}
              style={{
                background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)",
                boxShadow: "0 1px 4px rgba(13,58,26,.04)", overflow: "hidden",
              }}
            >
              {/* Arabcha */}
              <div style={{
                background: `${kitob.rang}0f`,
                padding: "12px 16px", textAlign: "right",
                borderBottom: `1px solid ${kitob.rang}20`,
              }}>
                <span style={{ fontFamily: AR, fontSize: 24, color: kitob.rang, lineHeight: 1.6 }}>
                  {satir.arabcha}
                </span>
              </div>
              {/* Transliteratsiya va tarjima */}
              <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ fontSize: 13, color: T.text2, fontStyle: "italic" }}>{satir.oqilishi}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{satir.tarjima}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigatsiya */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {kitob.boblar.findIndex((b) => b.id === activeBob.id) > 0 && (
            <button
              onClick={() => {
                const idx = kitob.boblar.findIndex((b) => b.id === activeBob.id);
                setActiveBob(kitob.boblar[idx - 1]);
              }}
              style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(13,58,26,.15)", background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: T.text2 }}
            >
              ← Oldingi bob
            </button>
          )}
          {kitob.boblar.findIndex((b) => b.id === activeBob.id) < kitob.boblar.length - 1 && (
            <button
              onClick={() => {
                const idx = kitob.boblar.findIndex((b) => b.id === activeBob.id);
                setActiveBob(kitob.boblar[idx + 1]);
              }}
              style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, cursor: "pointer", fontSize: 13, fontWeight: 700 }}
            >
              Keyingi bob →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function KitobxonaView() {
  const { user } = useAuth();
  const [activeTur, setActiveTur] = useState<string>("barchasi");
  const [activeKitob, setActiveKitob] = useState<Kitob | null>(null);

  const turlar = [
    { id: "barchasi", label: "Barchasi", icon: <BookCopy size={12} /> },
    { id: "darslik", label: "Darslik", icon: "📗" },
    { id: "lugat", label: "Lug'at", icon: "📖" },
    { id: "qoida", label: "Qoida", icon: "📋" },
    { id: "matn", label: "Matn", icon: "📚" },
  ];

  const filtered = activeTur === "barchasi" ? KITOBLAR : KITOBLAR.filter((k) => k.tur === activeTur);

  if (!user) return null;

  if (activeKitob) {
    return <KitobReader kitob={activeKitob} onClose={() => setActiveKitob(null)} />;
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Ta'lim</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Kitobxona</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            {KITOBLAR.length} ta kitob mavjud
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 14px 32px" }}>
        {/* Tur filtri */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4, scrollbarWidth: "none" }}>
          {turlar.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTur(t.id)}
              style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: 5,
                padding: "7px 14px", borderRadius: 20, border: "none",
                background: activeTur === t.id ? T.green : "rgba(13,58,26,.07)",
                color: activeTur === t.id ? "#fff" : T.text2,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "background .15s",
              }}
            >
              {typeof t.icon === "string" ? <span>{t.icon}</span> : t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Kitoblar grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map((kitob) => (
            <KitobCard key={kitob.id} kitob={kitob} onClick={() => setActiveKitob(kitob)} />
          ))}
        </div>

        {/* Bo'sh holat */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: T.hint }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Bu turda kitob yo'q</div>
          </div>
        )}
      </div>
    </div>
  );
}
