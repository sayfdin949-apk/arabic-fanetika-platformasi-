import { useEffect, useMemo, useState } from "react";
import { Users, Globe, CalendarDays, CalendarRange } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { supabase, isSupabaseMode } from "../../lib/supabaseClient";

type Tab = "umumiy" | "guruh" | "haftalik" | "oylik";

interface Row {
  id: string;
  ism: string;
  familya: string;
  avatar_url: string | null;
  teacher_id: string | null;
  xp: number;
}

const TABS: { k: Tab; label: string; icon: typeof Globe }[] = [
  { k: "umumiy", label: "Umumiy", icon: Globe },
  { k: "guruh", label: "Guruh", icon: Users },
  { k: "haftalik", label: "Haftalik", icon: CalendarDays },
  { k: "oylik", label: "Oylik", icon: CalendarRange },
];

const MEDALS = ["🥇", "🥈", "🥉"];

export function LeaderboardView() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("umumiy");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseMode || !supabase) {
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    (async () => {
      if (tab === "haftalik" || tab === "oylik") {
        const since = new Date();
        since.setDate(since.getDate() - (tab === "haftalik" ? 7 : 30));
        const { data, error } = await supabase!.rpc("leaderboard_period", { p_since: since.toISOString() });
        if (!alive) return;
        if (!error && data) {
          setRows(
            (data as { id: string; ism: string; familya: string; avatar_url: string | null; teacher_id: string | null; period_xp: number }[]).map((r) => ({
              id: r.id,
              ism: r.ism,
              familya: r.familya,
              avatar_url: r.avatar_url,
              teacher_id: r.teacher_id,
              xp: r.period_xp,
            }))
          );
        }
      } else {
        const { data, error } = await supabase!
          .from("leaderboard_public")
          .select("id, ism, familya, avatar_url, teacher_id, xp_total")
          .order("xp_total", { ascending: false });
        if (!alive) return;
        if (!error && data) {
          setRows(
            (data as { id: string; ism: string; familya: string; avatar_url: string | null; teacher_id: string | null; xp_total: number }[]).map((r) => ({
              id: r.id,
              ism: r.ism,
              familya: r.familya,
              avatar_url: r.avatar_url,
              teacher_id: r.teacher_id,
              xp: r.xp_total,
            }))
          );
        }
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [tab]);

  const visibleRows = useMemo(() => {
    if (tab === "guruh") {
      if (!user?.teacherId) return [];
      return rows.filter((r) => r.teacher_id === user.teacherId);
    }
    return rows;
  }, [rows, tab, user?.teacherId]);

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, padding: "18px 16px 16px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>
            Gamifikatsiya
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Reyting</div>
        </div>
      </div>

      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid rgba(13,58,26,.08)", overflowX: "auto" }}>
        {TABS.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            style={{
              flex: 1,
              minWidth: 84,
              padding: "12px 4px",
              border: "none",
              background: "transparent",
              borderBottom: tab === t.k ? `2px solid ${T.lime}` : "2px solid transparent",
              color: tab === t.k ? T.green : T.hint,
              fontSize: 12,
              fontWeight: tab === t.k ? 700 : 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        {!isSupabaseMode ? (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>
            Bu funksiya faqat onlayn (Supabase) rejimida ishlaydi.
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", color: T.hint, fontSize: 13, padding: 30 }}>Yuklanmoqda…</div>
        ) : tab === "guruh" && !user?.teacherId ? (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>
            Sizga hali guruh/o'qituvchi biriktirilmagan.
          </div>
        ) : visibleRows.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>
            Hozircha ma'lumot yo'q.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {visibleRows.map((r, i) => {
              const isMe = r.id === user?.id;
              return (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: isMe ? "rgba(46,184,46,.1)" : "#fff",
                    border: isMe ? `1.5px solid ${T.lime}` : "1px solid rgba(13,58,26,.08)",
                    borderRadius: 12,
                    padding: "10px 14px",
                  }}
                >
                  <div style={{ width: 28, textAlign: "center", fontSize: i < 3 ? 18 : 13, fontWeight: 700, color: T.hint }}>
                    {i < 3 ? MEDALS[i] : i + 1}
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(13,58,26,.08)", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {r.avatar_url ? (
                      <img src={r.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.hint }}>{r.ism.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.green, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {r.ism} {r.familya} {isMe && <span style={{ color: T.hint, fontWeight: 400 }}>(siz)</span>}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.lime }}>{r.xp} XP</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
