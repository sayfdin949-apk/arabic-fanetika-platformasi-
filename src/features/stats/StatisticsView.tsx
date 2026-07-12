import { BarChart2, Flame, TrendingUp, Mic, Video, Trophy, Grid3X3, BookOpenText, Coins } from "lucide-react";
import { Navigate } from "react-router-dom";
import { T } from "../../theme/tokens";
import { useProgress } from "../progress/ProgressContext";
import { useAuth } from "../../auth/AuthContext";
import { useCoins } from "../../context/CoinContext";
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

function loadVoiceDone(uid: string): number {
  try {
    const raw = localStorage.getItem(`afp:voice_done_${uid}`);
    return raw ? (JSON.parse(raw) as number[]).length : 0;
  } catch { return 0; }
}

function loadVideoWatched(uid: string): number {
  try {
    const raw = localStorage.getItem(`afp:video_watched_${uid}`);
    return raw ? (JSON.parse(raw) as number[]).length : 0;
  } catch { return 0; }
}

function loadMockResults(uid: string): { ball: number }[] {
  try {
    const raw = localStorage.getItem(`afp:mock_results_${uid}`);
    return raw ? Object.values(JSON.parse(raw)) : [];
  } catch { return []; }
}

function loadGramDone(uid: string): number {
  try {
    const raw = localStorage.getItem(`afp:gram_done_${uid}`);
    return raw ? Object.keys(JSON.parse(raw)).length : 0;
  } catch { return 0; }
}

function getDateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("uz");
}

const DAY_LABELS = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

export function StatisticsView() {
  const { user } = useAuth();
  const { nazDone, amalDone, streak } = useProgress();
  const { coins } = useCoins();

  if (user?.role === "teacher" || user?.role === "ceo" || user?.role === "assistant") {
    return <Navigate to="/oquvchilar" replace />;
  }

  const uid = user?.id ?? "";

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

  const voiceDone = loadVoiceDone(uid);
  const videoWatched = loadVideoWatched(uid);
  const mockResults = loadMockResults(uid);
  const gramDone = loadGramDone(uid);

  // Weekly heatmap: last 7 days
  const activeDates = new Set<string>();
  Object.values(nazDone).forEach((d) => activeDates.add(d.sana));
  Object.values(amalDone).forEach((d) => activeDates.add(d.sana));

  // Hafta kunlari: bugun = index 0 → 6 kun oldin = index 6
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dateStr = getDateStr(6 - i);
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayIdx = (d.getDay() + 6) % 7; // 0=Mon, 6=Sun
    return { dateStr, dayLabel: DAY_LABELS[dayIdx], active: activeDates.has(dateStr) };
  });

  // Streak dan ham active kunlarni belgilash
  const streakActive = Math.min(streak.days, 7);
  for (let i = 0; i < streakActive; i++) {
    const idx = 6 - i;
    if (idx >= 0) weekDays[idx].active = true;
  }

  const mockBest = mockResults.length > 0 ? Math.max(...mockResults.map((r) => r.ball)) : null;
  const mockAvg = mockResults.length > 0
    ? Math.round(mockResults.reduce((s, r) => s + r.ball, 0) / mockResults.length)
    : null;

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
              { label: "Tanga", value: `${coins}`, emoji: "🪙" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ flex: 1, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 4px", textAlign: "center" }}
              >
                <div style={{ fontSize: 18, lineHeight: 1 }}>{s.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.65)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Haftalik faollik */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Flame size={16} color="#FF6B35" />
            <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Haftalik faollik</span>
            <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 800, color: "#FF6B35" }}>{streak.days} kun</span>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            {weekDays.map((day, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div
                  style={{
                    width: "100%", aspectRatio: "1", borderRadius: 10,
                    background: day.active
                      ? "linear-gradient(135deg,#FF6B35,#FF8C00)"
                      : "rgba(13,58,26,.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  {day.active && <span style={{ fontSize: 14 }}>🔥</span>}
                </div>
                <div style={{ fontSize: 9, color: T.hint, fontWeight: 600 }}>{day.dayLabel}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
            Har kuni mashq qilib davom eting. Streakni uzmaslik uchun bugun ham kirganingizga ishoning!
          </div>
        </div>

        {/* Barcha modullar xulosasi */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Grid3X3 size={16} color={T.green} />
            <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Barcha modullar</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: <Mic size={14} color="#0891B2" />, label: "Ovoz yozish", done: voiceDone, total: 20, color: "#0891B2" },
              { icon: <Video size={14} color="#DC2626" />, label: "Video darslar", done: videoWatched, total: 17, color: "#DC2626" },
              { icon: <BookOpenText size={14} color="#7C3AED" />, label: "Grammatika", done: gramDone, total: 30, color: "#7C3AED" },
              { icon: <Trophy size={14} color="#CA8A04" />, label: "Mock test urinishlari", done: mockResults.length, total: null, color: "#CA8A04" },
              { icon: <Coins size={14} color="#EAB308" />, label: "Yig'ilgan tangalar", done: coins, total: null, color: "#EAB308" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, color: T.text2 }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>
                      {item.total !== null ? `${item.done}/${item.total}` : item.done}
                    </span>
                  </div>
                  {item.total !== null && (
                    <div style={{ height: 5, background: "rgba(13,58,26,.08)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(item.done / item.total) * 100}%`, background: item.color, borderRadius: 3, transition: "width .4s" }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock test natijalari */}
        {mockResults.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Trophy size={16} color="#CA8A04" />
                <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Mock test</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "Urinishlar", value: mockResults.length, color: T.green },
                { label: "Eng yuqori", value: `${mockBest}%`, color: mockBest !== null && mockBest >= 80 ? T.lime : "#FFA500" },
                { label: "O'rtacha", value: `${mockAvg}%`, color: T.text2 },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1, textAlign: "center", background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "10px 4px" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: T.hint, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

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
