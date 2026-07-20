import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Users, UserPlus, Flame, Trophy, GraduationCap, Target } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { T, card } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { supabase, isSupabaseMode } from "../../lib/supabaseClient";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { GRAM_DARSLAR } from "../../content/gramContent";
import { store } from "../../lib/storage";

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const lastNDays = (n: number): string[] => {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toISO(d));
  }
  return days;
};

interface StatCardProps {
  icon: typeof Users;
  label: string;
  value: string;
  color: string;
}
function StatTile({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div style={{ ...card(), padding: 14, flex: 1, minWidth: 130 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <Icon size={13} color={color} />
        <span style={{ fontSize: 10, color: T.hint, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>{value}</div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ ...card(), padding: 18, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime, flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

interface ModuleStat {
  key: string;
  label: string;
  completionPct: number;
  avgScore: number;
}

interface LeaderRow {
  id: string;
  ism: string;
  familya: string;
  xp_total: number;
}

export function CeoAnalyticsView() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({});
  const [newThisWeek, setNewThisWeek] = useState(0);
  const [activeToday, setActiveToday] = useState(0);
  const [dau, setDau] = useState<{ date: string; count: number }[]>([]);
  const [modules, setModules] = useState<ModuleStat[]>([]);
  const [leaders, setLeaders] = useState<LeaderRow[]>([]);
  const [attendancePct, setAttendancePct] = useState<number | null>(null);

  useEffect(() => {
    if (!isSupabaseMode || !supabase || user?.role !== "ceo") {
      setLoading(false);
      return;
    }
    let alive = true;
    (async () => {
      const sb = supabase!;

      // 1) Umumiy foydalanuvchi statistikasi
      const { data: profilesData } = await sb.from("profiles").select("role, tur, created_at");
      const profiles = profilesData ?? [];
      const counts: Record<string, number> = {};
      const weekAgo = Date.now() - 7 * 86400000;
      let weekNew = 0;
      let fonetikaStudents = 0;
      let grammatikaStudents = 0;
      for (const p of profiles as { role: string; tur: string | null; created_at: string }[]) {
        counts[p.role] = (counts[p.role] ?? 0) + 1;
        if (new Date(p.created_at).getTime() >= weekAgo) weekNew++;
        if (p.role === "student") {
          if (p.tur === "fonetika") fonetikaStudents++;
          if (p.tur === "grammatika") grammatikaStudents++;
        }
      }
      if (!alive) return;
      setRoleCounts(counts);
      setNewThisWeek(weekNew);

      // 2) Kunlik faol foydalanuvchilar (30 kun)
      const since = lastNDays(30)[0];
      const { data: activityData } = await sb.from("daily_activity").select("activity_date, user_id").gte("activity_date", since);
      const byDate = new Map<string, Set<string>>();
      for (const row of (activityData ?? []) as { activity_date: string; user_id: string }[]) {
        if (!byDate.has(row.activity_date)) byDate.set(row.activity_date, new Set());
        byDate.get(row.activity_date)!.add(row.user_id);
      }
      const dauSeries = lastNDays(30).map((iso) => ({
        date: iso.slice(5), // MM-DD
        count: byDate.get(iso)?.size ?? 0,
      }));
      if (!alive) return;
      setDau(dauSeries);
      setActiveToday(byDate.get(toISO(new Date()))?.size ?? 0);

      // 3) Modul bo'yicha tugallanish % va o'rtacha ball
      const { data: lessonsData } = await sb.from("lessons").select("id, source_key");
      const { data: progressData } = await sb.from("user_progress").select("lesson_id, status, score");
      const lessonPrefix = new Map<string, string>();
      for (const l of (lessonsData ?? []) as { id: string; source_key: string }[]) {
        lessonPrefix.set(l.id, l.source_key.split(":")[0]);
      }
      const agg: Record<string, { completed: number; scoreSum: number; scoreCount: number }> = {
        naz: { completed: 0, scoreSum: 0, scoreCount: 0 },
        amal: { completed: 0, scoreSum: 0, scoreCount: 0 },
        gram: { completed: 0, scoreSum: 0, scoreCount: 0 },
      };
      for (const row of (progressData ?? []) as { lesson_id: string; status: string; score: number | null }[]) {
        const prefix = lessonPrefix.get(row.lesson_id);
        if (!prefix || !agg[prefix]) continue;
        if (row.status === "completed") {
          agg[prefix].completed++;
          if (row.score !== null) {
            agg[prefix].scoreSum += row.score;
            agg[prefix].scoreCount++;
          }
        }
      }
      const moduleStats: ModuleStat[] = [
        {
          key: "naz",
          label: "Nazariy",
          completionPct: fonetikaStudents > 0 ? Math.round((agg.naz.completed / (fonetikaStudents * NAZARIY.length)) * 100) : 0,
          avgScore: agg.naz.scoreCount > 0 ? Math.round(agg.naz.scoreSum / agg.naz.scoreCount) : 0,
        },
        {
          key: "amal",
          label: "Amaliy",
          completionPct: fonetikaStudents > 0 ? Math.round((agg.amal.completed / (fonetikaStudents * AMALIY.length)) * 100) : 0,
          avgScore: agg.amal.scoreCount > 0 ? Math.round(agg.amal.scoreSum / agg.amal.scoreCount) : 0,
        },
        {
          key: "gram",
          label: "Grammatika",
          completionPct: grammatikaStudents > 0 ? Math.round((agg.gram.completed / (grammatikaStudents * GRAM_DARSLAR.length)) * 100) : 0,
          avgScore: agg.gram.scoreCount > 0 ? Math.round(agg.gram.scoreSum / agg.gram.scoreCount) : 0,
        },
      ];
      if (!alive) return;
      setModules(moduleStats);

      // 4) Reyting — top 5
      const { data: leaderData } = await sb
        .from("leaderboard_public")
        .select("id, ism, familya, xp_total")
        .order("xp_total", { ascending: false })
        .limit(5);
      if (!alive) return;
      setLeaders((leaderData as LeaderRow[]) ?? []);

      // 5) Davomat (oxirgi 30 kun, KV bloklardan)
      const students = (profiles as { role: string }[]).filter((p) => p.role === "student");
      if (students.length > 0) {
        const days = lastNDays(30);
        const blobs = await Promise.all(days.map((iso) => store.get<Record<string, string>>(`davomat_${iso}`)));
        let totalMarked = 0;
        let totalCame = 0;
        for (const blob of blobs) {
          if (!blob) continue;
          for (const status of Object.values(blob)) {
            totalMarked++;
            if (status === "keldi") totalCame++;
          }
        }
        if (!alive) return;
        setAttendancePct(totalMarked > 0 ? Math.round((totalCame / totalMarked) * 100) : null);
      }

      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [user]);

  if (!user) return null;
  if (user.role !== "ceo") return <Navigate to="/" replace />;

  const worstModule = modules.length > 0 ? [...modules].sort((a, b) => a.completionPct - b.completionPct)[0] : null;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, padding: "18px 16px 16px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>
            CEO
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Analitika</div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {!isSupabaseMode ? (
          <div style={{ ...card(), padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>
            Bu funksiya faqat onlayn (Supabase) rejimida ishlaydi.
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", color: T.hint, fontSize: 13, padding: 30 }}>Yuklanmoqda…</div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              <StatTile icon={Users} label="Jami foydalanuvchi" value={`${Object.values(roleCounts).reduce((a, b) => a + b, 0)}`} color={T.lime} />
              <StatTile icon={UserPlus} label="Bu hafta yangi" value={`+${newThisWeek}`} color="#0891B2" />
              <StatTile icon={Flame} label="Bugun faol" value={`${activeToday}`} color="#FF6B35" />
              <StatTile icon={Users} label="O'quvchilar" value={`${roleCounts.student ?? 0}`} color={T.lime} />
            </div>

            <SectionCard title="Faoliyat grafigi (30 kun)">
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer>
                  <LineChart data={dau}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,58,26,.08)" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: T.hint }} />
                    <YAxis tick={{ fontSize: 10, fill: T.hint }} allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" name="Faol foydalanuvchi" stroke={T.lime} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="Kurs yakunlanishi (modul bo'yicha)">
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer>
                  <BarChart data={modules}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,58,26,.08)" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: T.hint }} />
                    <YAxis tick={{ fontSize: 10, fill: T.hint }} unit="%" />
                    <Tooltip />
                    <Bar dataKey="completionPct" name="Tugallanish %" fill={T.lime} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {worstModule && worstModule.completionPct < 50 && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#B45309", background: "rgba(245,158,11,.12)", borderRadius: 8, padding: "8px 10px" }}>
                  <Target size={13} /> "{worstModule.label}" moduli e'tibor talab qiladi — tugallanish {worstModule.completionPct}%
                </div>
              )}
            </SectionCard>

            <SectionCard title="Test natijalari (o'rtacha ball)">
              <div style={{ display: "flex", gap: 10 }}>
                {modules.map((m) => (
                  <div key={m.key} style={{ flex: 1, textAlign: "center", padding: "10px 6px", background: "rgba(13,58,26,.03)", borderRadius: 10 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: m.avgScore >= 70 ? T.lime : "#F59E0B" }}>{m.avgScore}%</div>
                    <div style={{ fontSize: 11, color: T.hint, marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {attendancePct !== null && (
              <SectionCard title="Davomat (oxirgi 30 kun)">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: attendancePct >= 75 ? T.lime : "#F59E0B" }}>{attendancePct}%</div>
                  <div style={{ fontSize: 12, color: T.hint }}>o'rtacha kelish darajasi (barcha guruhlar, belgilangan kunlar bo'yicha)</div>
                </div>
              </SectionCard>
            )}

            <SectionCard title="Reyting — top 5">
              {leaders.length === 0 ? (
                <div style={{ fontSize: 12, color: T.hint, textAlign: "center", padding: "8px 0" }}>Hozircha ma'lumot yo'q</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {leaders.map((l, i) => (
                    <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "rgba(13,58,26,.03)", borderRadius: 9 }}>
                      <div style={{ width: 22, textAlign: "center", fontSize: 13, fontWeight: 700, color: T.hint }}>{i + 1}</div>
                      <div style={{ flex: 1, fontSize: 12.5, color: T.green, fontWeight: 600 }}>{l.ism} {l.familya}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.lime }}>{l.xp_total} XP</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10, fontSize: 11, color: T.hint }}>
                <Trophy size={12} /> To'liq reyting: <a href="#/reyting" style={{ color: T.lime, fontWeight: 600 }}>/reyting</a>
              </div>
            </SectionCard>

            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: T.hint, padding: "0 4px" }}>
              <GraduationCap size={13} /> Mock-test natijalari va o'qish vaqti hozircha bu tahlilga kirmaydi (alohida ish).
            </div>
          </>
        )}
      </div>
    </div>
  );
}
