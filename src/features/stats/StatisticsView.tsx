import { BarChart2, Flame, TrendingUp } from "lucide-react";
import { T } from "../../theme/tokens";
import { useProgress } from "../progress/ProgressContext";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";

function Bar({ pct }: { pct: number }) {
  const color =
    pct >= 80
      ? T.gLimeH
      : pct > 0
      ? "linear-gradient(90deg,#FFA500,#FF8C00)"
      : "transparent";
  return (
    <div style={{ flex: 1, height: 12, borderRadius: 6, background: "rgba(13,58,26,.08)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 6, background: color, transition: "width .5s ease" }} />
    </div>
  );
}

export function StatisticsView() {
  const { nazDone, amalDone, streak } = useProgress();

  const nazCompleted = Object.keys(nazDone).length;
  const nazPassed = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const nazAvg =
    nazCompleted > 0
      ? Math.round(Object.values(nazDone).reduce((s, d) => s + d.pct, 0) / nazCompleted)
      : 0;

  const amalCompleted = Object.keys(amalDone).length;
  const amalPassed = Object.values(amalDone).filter((d) => d.pct >= 80).length;
  const amalAvg =
    amalCompleted > 0
      ? Math.round(Object.values(amalDone).reduce((s, d) => s + d.pct, 0) / amalCompleted)
      : 0;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
            Ma'lumot
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Statistika</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Streak", value: `${streak.days} kun`, emoji: "🔥" },
              { label: "Nazariy", value: `${nazPassed}/${NAZARIY.length}`, emoji: "📖" },
              { label: "Amaliy", value: `${amalPassed}/${AMALIY.length}`, emoji: "✍️" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ flex: 1, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}
              >
                <div style={{ fontSize: 18, lineHeight: 1 }}>{s.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.65)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Streak card */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Flame size={16} color="#FF6B35" />
            <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Kunlik faollik</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: "#FF6B35", lineHeight: 1 }}>{streak.days}</div>
              <div style={{ fontSize: 11, color: T.hint, marginTop: 4 }}>ketma-ket kun</div>
            </div>
            <div style={{ flex: 1, fontSize: 13, color: T.text2, lineHeight: 1.6 }}>
              Har kuni mashq qilib davom eting. Streakni uzmaslik uchun bugun ham kirganingizga ishoning!
            </div>
          </div>
        </div>

        {/* Nazariy chart */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BarChart2 size={16} color={T.green} />
              <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Nazariy darslar</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.lime }}>
              O'rt: {nazAvg}%
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {NAZARIY.map((d) => {
              const done = nazDone[d.id];
              const pct = done?.pct ?? 0;
              return (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 11, color: T.hint, width: 22, textAlign: "right", flexShrink: 0 }}>{d.id}</div>
                  <Bar pct={pct} />
                  <div
                    style={{
                      fontSize: 11, fontWeight: 600, width: 36, textAlign: "right", flexShrink: 0,
                      color: pct >= 80 ? T.lime : pct > 0 ? "#FFA500" : T.hint,
                    }}
                  >
                    {pct > 0 ? `${pct}%` : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Amaliy chart */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TrendingUp size={16} color={T.green} />
              <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Amaliy boblar</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.lime }}>
              O'rt: {amalAvg}%
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {AMALIY.map((b) => {
              const done = amalDone[b.id];
              const pct = done?.pct ?? 0;
              return (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 11, color: T.hint, width: 22, textAlign: "right", flexShrink: 0 }}>{b.id}</div>
                  <Bar pct={pct} />
                  <div
                    style={{
                      fontSize: 11, fontWeight: 600, width: 36, textAlign: "right", flexShrink: 0,
                      color: pct >= 80 ? T.lime : pct > 0 ? "#FFA500" : T.hint,
                    }}
                  >
                    {pct > 0 ? `${pct}%` : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
