import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { T } from "../../theme/tokens";
import { store } from "../../lib/storage";
import type { Guruh } from "../guruh/GuruhlarView";
import { GURUHLAR_KEY } from "../guruh/GuruhlarView";
import type { User } from "../../auth/types";

export interface TeacherRating {
  id: string;
  studentId: string;
  teacherId: string;
  weekKey: string;
  score: number;
  reason?: string;
  createdAt: string;
}

const RATINGS_KEY = "teacher_ratings";
const GROUPS_KEY = GURUHLAR_KEY;

function weekKey(d = new Date()): string {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  const weekNo = 1 + Math.round(((date.getTime() - week1.getTime()) / 86_400_000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return `${date.getFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

export function WeeklyRatingGate({ user, users }: { user: User; users: User[] }) {
  const [ready, setReady] = useState(false);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [needsRating, setNeedsRating] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      const [groups, ratings] = await Promise.all([
        store.get<Guruh[]>(GROUPS_KEY),
        store.get<TeacherRating[]>(RATINGS_KEY),
      ]);
      if (!alive) return;
      const myGroup = (groups ?? []).find((g) => g.oquvchiIds.includes(user.id) && g.ogtuvchiId);
      const tId = myGroup?.ogtuvchiId ?? null;
      setTeacherId(tId);
      if (tId) {
        const wk = weekKey();
        const already = (ratings ?? []).some((r) => r.studentId === user.id && r.teacherId === tId && r.weekKey === wk);
        setNeedsRating(!already);
      }
      setReady(true);
    })();
    return () => { alive = false; };
  }, [user.id]);

  if (!ready || !needsRating || !teacherId) return null;

  const teacher = users.find((u) => u.id === teacherId);
  const teacherName = teacher ? `${teacher.ism} ${teacher.familya}` : "O'qituvchi";

  const submit = async () => {
    if (score === null) { setErr("Bahoni tanlang"); return; }
    if (score < 10 && !reason.trim()) { setErr("Sababini yozing"); return; }
    const ratings = (await store.get<TeacherRating[]>(RATINGS_KEY)) ?? [];
    const rec: TeacherRating = {
      id: "tr" + Date.now(),
      studentId: user.id,
      teacherId,
      weekKey: weekKey(),
      score,
      reason: score < 10 ? reason.trim() : undefined,
      createdAt: new Date().toISOString(),
    };
    await store.set(RATINGS_KEY, [...ratings, rec]);
    setNeedsRating(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 22, width: "100%", maxWidth: 360, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Star size={18} color="#eab308" />
          <span style={{ fontSize: 15, fontWeight: 700, color: T.green }}>Haftalik baholash</span>
        </div>
        <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.5, marginBottom: 16 }}>
          Ushbu haftada <b>{teacherName}</b> ustozni 1 dan 10 gacha baholang.
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => { setScore(n); setErr(""); }}
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                border: score === n ? `2px solid ${T.lime}` : "1px solid rgba(13,58,26,.15)",
                background: score === n ? "rgba(46,184,46,.12)" : "#fff",
                color: score === n ? T.green : T.text2,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {n}
            </button>
          ))}
        </div>

        {score !== null && score < 10 && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>
              Nega {score} ball berdingiz? *
            </label>
            <textarea
              value={reason}
              onChange={(e) => { setReason(e.target.value); setErr(""); }}
              rows={3}
              placeholder="Sababini yozing..."
              style={{ width: "100%", border: "1px solid rgba(13,58,26,.15)", borderRadius: 9, padding: "9px 12px", fontSize: 13, color: T.text, outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
        )}

        {err && (
          <div style={{ fontSize: 12, color: T.red, background: "rgba(230,0,35,.05)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
            {err}
          </div>
        )}

        <button
          onClick={submit}
          style={{ width: "100%", background: T.gGreen, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
        >
          Yuborish
        </button>
      </div>
    </div>
  );
}
