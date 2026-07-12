import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, GraduationCap, Coins, ChevronRight } from "lucide-react";
import { T } from "../../theme/tokens";
import { RoadmapView } from "./RoadmapView";
import { GRAM_DARSLAR } from "../../content/gramContent";
import { useCoins } from "../../context/CoinContext";
import { useAuth } from "../../auth/AuthContext";

type Tab = "xarita" | "darslar";

const DARAJA_BADGE: Record<string, string> = {
  A0: "#6B7280", A1: "#2563EB", A2: "#0891B2",
  B1: "#16A34A", B2: "#CA8A04", C1: "#DC2626", C2: "#7C3AED",
};

function DarslarTab() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const doneMap: Record<number, { pct: number }> = (() => {
    if (!user) return {};
    try {
      const raw = localStorage.getItem(`afp:gram_done_${user.id}`);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  })();

  return (
    <div style={{ padding: "14px 16px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
      {GRAM_DARSLAR.map((d) => {
        const done = doneMap[d.id];
        const pct = done?.pct ?? 0;
        return (
          <button
            key={d.id}
            onClick={() => navigate(`/grammatika/dars/${d.id}`)}
            style={{
              width: "100%", background: "#fff",
              border: "1px solid rgba(13,58,26,.08)",
              borderLeft: `4px solid ${d.rang}`,
              borderRadius: 14, padding: "14px 14px",
              cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 12,
              boxShadow: "0 1px 3px rgba(13,58,26,.05)",
            }}
          >
            <div style={{ fontSize: 28, lineHeight: 1, width: 40, textAlign: "center", flexShrink: 0 }}>{d.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: DARAJA_BADGE[d.daraja] ?? T.hint, background: `${DARAJA_BADGE[d.daraja] ?? T.hint}18`, padding: "1px 7px", borderRadius: 10 }}>
                  {d.daraja}
                </span>
                {pct >= 80 && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.lime, background: "rgba(46,184,46,.12)", padding: "1px 7px", borderRadius: 10 }}>
                    ✓ Tugallandi
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 2 }}>{d.nomi}</div>
              <div style={{ fontSize: 11, color: T.hint, lineHeight: 1.3 }}>{d.mavzu}</div>
              {pct > 0 && (
                <div style={{ marginTop: 6 }}>
                  <div style={{ height: 4, borderRadius: 2, background: "rgba(13,58,26,.1)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: pct >= 80 ? T.gLimeH : T.gGreen, transition: "width .6s" }} />
                  </div>
                </div>
              )}
            </div>
            <ChevronRight size={16} color={T.hint} style={{ flexShrink: 0 }} />
          </button>
        );
      })}
    </div>
  );
}

export function GrammarView() {
  const [tab, setTab] = useState<Tab>("xarita");
  const { coins } = useCoins();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 17 ? "Xayrli kun" : "Xayrli kech";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>{greeting}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Arab grammatikasi</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>A0 dan C2 gacha bosqichma-bosqich</div>
            </div>
            {/* Coin display */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "6px 12px" }}>
              <Coins size={16} color="#FCD34D" />
              <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{coins}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>coin</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0 }}>
            {([
              { k: "xarita" as Tab, label: "Yo'l xaritasi", icon: Map },
              { k: "darslar" as Tab, label: "Darslar", icon: GraduationCap },
            ] as const).map(({ k, label, icon: Icon }) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "10px 0 12px",
                  background: "transparent", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600,
                  color: tab === k ? "#fff" : "rgba(255,255,255,.55)",
                  borderBottom: tab === k ? "2px solid #6AEF5A" : "2px solid transparent",
                  transition: "color .15s",
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {tab === "xarita" ? <RoadmapView /> : <DarslarTab />}
    </div>
  );
}
