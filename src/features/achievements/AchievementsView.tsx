import { useEffect, useState } from "react";
import { Lock, Trophy } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { supabase, isSupabaseMode } from "../../lib/supabaseClient";

interface AchievementRow {
  id: string;
  code: string;
  title: string;
  description: string | null;
  icon: string | null;
}

export function AchievementsView() {
  const { user } = useAuth();
  const [all, setAll] = useState<AchievementRow[]>([]);
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseMode || !supabase || !user) {
      setLoading(false);
      return;
    }
    let alive = true;
    (async () => {
      const [{ data: achData }, { data: uaData }] = await Promise.all([
        supabase.from("achievements").select("id, code, title, description, icon"),
        supabase.from("user_achievements").select("achievement_id").eq("user_id", user.id),
      ]);
      if (!alive) return;
      setAll((achData as AchievementRow[]) ?? []);
      setEarned(new Set(((uaData ?? []) as { achievement_id: string }[]).map((r) => r.achievement_id)));
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [user]);

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, padding: "18px 16px 16px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>
            Gamifikatsiya
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Yutuqlar</div>
          {!loading && all.length > 0 && (
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)" }}>
              {earned.size} / {all.length} ochilgan
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {!isSupabaseMode ? (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>
            Bu funksiya faqat onlayn (Supabase) rejimida ishlaydi.
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", color: T.hint, fontSize: 13, padding: 30 }}>Yuklanmoqda…</div>
        ) : all.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>
            Hozircha yutuqlar mavjud emas.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
            {all.map((a) => {
              const isEarned = earned.has(a.id);
              return (
                <div
                  key={a.id}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    border: `1px solid ${isEarned ? "rgba(46,184,46,.35)" : "rgba(13,58,26,.1)"}`,
                    padding: 14,
                    textAlign: "center",
                    opacity: isEarned ? 1 : 0.55,
                    position: "relative",
                  }}
                >
                  {!isEarned && (
                    <div style={{ position: "absolute", top: 8, right: 8 }}>
                      <Lock size={13} color={T.hint} />
                    </div>
                  )}
                  <div style={{ fontSize: 32, marginBottom: 6, filter: isEarned ? "none" : "grayscale(1)" }}>{a.icon ?? "🏅"}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 4 }}>{a.title}</div>
                  {a.description && <div style={{ fontSize: 10.5, color: T.hint, lineHeight: 1.4 }}>{a.description}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isSupabaseMode && !loading && all.length > 0 && earned.size === 0 && (
        <div style={{ padding: "0 16px 20px", display: "flex", alignItems: "center", gap: 8, color: T.hint, fontSize: 12 }}>
          <Trophy size={14} /> Birinchi darsni tugatib, birinchi yutug'ingizni oching!
        </div>
      )}
    </div>
  );
}
