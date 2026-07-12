import { useNavigate } from "react-router-dom";
import { ChevronRight, Clock, BookOpen, Calendar } from "lucide-react";
import { T } from "../../theme/tokens";
import { GRAM_DARAJALAR } from "../../content/gramContent";

const DARAJA_LABELS: Record<string, string> = {
  "A0-A1": "A0 → A1",
  "A1-A2": "A1 → A2",
  "A2-B1": "A2 → B1",
  "B1-B2": "B1 → B2",
  "B2-C1": "B2 → C1",
  "C1-C2": "C1 → C2",
};

const BADGE_COLORS: Record<string, string> = {
  "A0-A1": "#DBEAFE",
  "A1-A2": "#CFFAFE",
  "A2-B1": "#DCFCE7",
  "B1-B2": "#FEF9C3",
  "B2-C1": "#FEE2E2",
  "C1-C2": "#EDE9FE",
};

export function RoadmapView() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 13, color: T.hint, marginBottom: 4, lineHeight: 1.5 }}>
        Arabcha grammatikani bosqichma-bosqich o'rganing. Har bir daraja o'z o'quv rejasiga ega.
      </div>

      {GRAM_DARAJALAR.map((d, i) => (
        <button
          key={d.kod}
          onClick={() => navigate(`/grammatika/daraja/${encodeURIComponent(d.kod)}`)}
          style={{
            width: "100%",
            background: "#fff",
            border: "1px solid rgba(13,58,26,.08)",
            borderLeft: `4px solid ${d.rang}`,
            borderRadius: 14,
            padding: "16px 14px",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 1px 4px rgba(13,58,26,.06)",
          }}
        >
          {/* Step number */}
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: d.rang, display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
            color: "#fff", fontSize: 13, fontWeight: 800,
          }}>
            {i + 1}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Badge + title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{
                background: BADGE_COLORS[d.kod] ?? "#F3F4F6",
                color: d.rang, fontSize: 10, fontWeight: 700,
                padding: "2px 8px", borderRadius: 20,
              }}>
                {DARAJA_LABELS[d.kod] ?? d.kod}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 6 }}>{d.nomi}</div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[
                { icon: Clock, label: d.davomiyligi },
                { icon: Calendar, label: `${d.haftalar} hafta` },
                { icon: BookOpen, label: `${d.darslar} dars` },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <s.icon size={11} color={T.hint} />
                  <span style={{ fontSize: 11, color: T.hint }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <ChevronRight size={18} color={T.hint} style={{ flexShrink: 0 }} />
        </button>
      ))}
    </div>
  );
}
