import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, TestTube2, Coffee } from "lucide-react";
import { T } from "../../theme/tokens";
import { GRAM_DARAJALAR } from "../../content/gramContent";
import type { GramDarajaKun } from "../../content/gramTypes";

const TUR_CONFIG: Record<GramDarajaKun["tur"], { label: string; color: string; bg: string }> = {
  dars:    { label: "Dars",    color: T.green,  bg: "rgba(13,58,26,.08)" },
  tahlil: { label: "Tahlil", color: "#0891B2", bg: "rgba(8,145,178,.08)" },
  imtihon: { label: "Test",    color: "#DC2626", bg: "rgba(220,38,38,.08)" },
  dam:     { label: "Dam",     color: T.hint,   bg: "rgba(13,58,26,.05)" },
};

function TurBadge({ tur }: { tur: GramDarajaKun["tur"] }) {
  const cfg = TUR_CONFIG[tur];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: "2px 7px", borderRadius: 10 }}>
      {cfg.label}
    </span>
  );
}

function TurIcon({ tur, size = 16 }: { tur: GramDarajaKun["tur"]; size?: number }) {
  const color = TUR_CONFIG[tur].color;
  if (tur === "dars") return <BookOpen size={size} color={color} />;
  if (tur === "imtihon") return <TestTube2 size={size} color={color} />;
  if (tur === "dam") return <Coffee size={size} color={color} />;
  return <CheckCircle2 size={size} color={color} />;
}

export function DarajaDetail() {
  const { kod } = useParams<{ kod: string }>();
  const navigate = useNavigate();
  const daraja = GRAM_DARAJALAR.find((d) => d.kod === kod);

  if (!daraja) {
    return (
      <div style={{ padding: 24, color: T.hint, textAlign: "center" }}>
        Daraja topilmadi
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: daraja.rang, position: "relative", overflow: "hidden", padding: "16px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 12 }}
          >
            <ArrowLeft size={16} color="#fff" />
          </button>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>
            {daraja.kod}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{daraja.nomi}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            {daraja.davomiyligi} · {daraja.haftalar} hafta · {daraja.darslar} dars
          </div>
        </div>
      </div>

      {/* Jadval yo'q bo'lsa */}
      {daraja.jadval.length === 0 ? (
        <div style={{ padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔜</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.green, marginBottom: 6 }}>Tez orada!</div>
          <div style={{ fontSize: 13, color: T.hint }}>
            Bu darajaning o'quv rejasi tayyorlanmoqda.
          </div>
        </div>
      ) : (
        <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {daraja.jadval.map((hafta) => (
            <div key={hafta.hafta} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.05)", overflow: "hidden" }}>
              {/* Hafta sarlavha */}
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(13,58,26,.06)", background: "rgba(13,58,26,.02)", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: daraja.rang }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{hafta.hafta}-hafta</span>
              </div>

              {/* Kunlar */}
              <div>
                {hafta.kunlar.map((kun, ki) => (
                  <div
                    key={kun.kuni}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 16px",
                      borderBottom: ki < hafta.kunlar.length - 1 ? "1px solid rgba(13,58,26,.05)" : "none",
                      background: kun.tur === "imtihon" ? "rgba(220,38,38,.03)" : "transparent",
                      cursor: kun.darsId ? "pointer" : "default",
                      transition: "background .15s",
                    }}
                    onClick={() => kun.darsId && navigate(`/grammatika/dars/${kun.darsId}`)}
                  >
                    {/* Kun raqami */}
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: TUR_CONFIG[kun.tur].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <TurIcon tur={kun.tur} size={14} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.3 }}>{kun.mavzu}</div>
                    </div>

                    <TurBadge tur={kun.tur} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
