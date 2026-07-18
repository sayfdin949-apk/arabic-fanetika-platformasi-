import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { T, card, BtnP } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { supabase, isSupabaseMode } from "../../lib/supabaseClient";
import { sourceKeyToRoute } from "../../lib/lessonLink";

const inp: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(13,58,26,.15)",
  borderRadius: 9,
  padding: "10px 12px",
  fontSize: 13,
  color: T.green,
  outline: "none",
  boxSizing: "border-box",
  background: "rgba(13,58,26,.03)",
};

interface LessonRow {
  id: string;
  title: string;
  track: "fonetika" | "grammatika";
  source_key: string;
}

interface AssignmentRow {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  passing_score: number;
  max_attempts: number | null;
  lesson_id: string | null;
  lessons: { title: string; source_key: string } | null;
}

interface StudentAssignmentRow {
  id: string;
  status: "pending" | "submitted" | "graded";
  score: number | null;
  submitted_at: string | null;
  assignments: AssignmentRow | null;
}

function fmtDue(due: string | null): { label: string; overdue: boolean } {
  if (!due) return { label: "Muddatsiz", overdue: false };
  const d = new Date(due);
  const overdue = d.getTime() < Date.now();
  return { label: d.toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" }), overdue };
}

function OfflineNotice() {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 20, textAlign: "center", color: T.hint, fontSize: 13, margin: 16 }}>
      Bu funksiya faqat onlayn (Supabase) rejimida ishlaydi.
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <div style={{ background: T.gGreen, padding: "18px 16px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>
          Vazifalar
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{title}</div>
      </div>
    </div>
  );
}

// ── O'qituvchi / CEO tomoni ──────────────────────────────────────────

interface AssignmentSummary extends AssignmentRow {
  total: number;
  graded: number;
}

function TeacherAssignments() {
  const { user, users } = useAuth();
  const [items, setItems] = useState<AssignmentSummary[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    lessonId: "",
    dueDate: "",
    passingScore: "70",
    maxAttempts: "",
    wholeClass: true,
    selectedIds: [] as string[],
  });

  const students = users.filter((u) => u.role === "student");
  const isCeo = user?.role === "ceo";

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    let query = supabase
      .from("assignments")
      .select("id, title, description, due_date, passing_score, max_attempts, lesson_id, lessons(title, source_key)")
      .order("created_at", { ascending: false });
    if (!isCeo && user) query = query.eq("teacher_id", user.id);
    const { data: assignmentsData } = await query;
    const list = (assignmentsData as unknown as AssignmentRow[]) ?? [];

    const summaries: AssignmentSummary[] = [];
    for (const a of list) {
      const { count: total } = await supabase
        .from("assignment_students")
        .select("id", { count: "exact", head: true })
        .eq("assignment_id", a.id);
      const { count: graded } = await supabase
        .from("assignment_students")
        .select("id", { count: "exact", head: true })
        .eq("assignment_id", a.id)
        .eq("status", "graded");
      summaries.push({ ...a, total: total ?? 0, graded: graded ?? 0 });
    }
    setItems(summaries);
    setLoading(false);
  };

  useEffect(() => {
    if (!isSupabaseMode || !supabase) {
      setLoading(false);
      return;
    }
    void load();
    void supabase
      .from("lessons")
      .select("id, title, track, source_key")
      .eq("is_published", true)
      .then(({ data }) => setLessons((data as LessonRow[]) ?? []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleStudent = (id: string) =>
    setForm((f) => ({ ...f, selectedIds: f.selectedIds.includes(id) ? f.selectedIds.filter((x) => x !== id) : [...f.selectedIds, id] }));

  const resetForm = () =>
    setForm({ title: "", description: "", lessonId: "", dueDate: "", passingScore: "70", maxAttempts: "", wholeClass: true, selectedIds: [] });

  const save = async () => {
    if (!supabase || !user) return;
    if (!form.title.trim()) { setErr("Topshiriq nomi majburiy"); return; }
    if (!form.lessonId) { setErr("Dars/testni tanlang"); return; }
    const targetIds = form.wholeClass ? students.map((s) => s.id) : form.selectedIds;
    if (targetIds.length === 0) { setErr("Kamida bitta o'quvchi tanlang"); return; }

    setSaving(true);
    setErr("");
    const { data: assignment, error } = await supabase
      .from("assignments")
      .insert({
        teacher_id: user.id,
        lesson_id: form.lessonId,
        title: form.title.trim(),
        description: form.description.trim() || null,
        due_date: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        passing_score: parseInt(form.passingScore, 10) || 70,
        max_attempts: form.maxAttempts.trim() ? parseInt(form.maxAttempts, 10) : null,
      })
      .select()
      .single();

    if (error || !assignment) {
      setSaving(false);
      setErr(error?.message ?? "Xatolik yuz berdi");
      return;
    }

    await supabase.from("assignment_students").insert(targetIds.map((sid) => ({ assignment_id: assignment.id, student_id: sid })));

    setSaving(false);
    setOpen(false);
    resetForm();
    void load();
  };

  if (!isSupabaseMode) return <OfflineNotice />;

  return (
    <div>
      <div style={{ padding: 16 }}>
        <button onClick={() => { resetForm(); setErr(""); setOpen(true); }} style={{ ...BtnP, width: "100%", justifyContent: "center", marginBottom: 16 }}>
          <Plus size={16} /> Yangi topshiriq
        </button>

        {loading ? (
          <div style={{ textAlign: "center", color: T.hint, fontSize: 13, padding: 30 }}>Yuklanmoqda…</div>
        ) : items.length === 0 ? (
          <div style={{ ...card(), padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>Hozircha topshiriq yo'q.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((a) => {
              const due = fmtDue(a.due_date);
              return (
                <div key={a.id} style={{ ...card(), padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{a.title}</div>
                      {a.lessons && <div style={{ fontSize: 11, color: T.hint, marginTop: 2 }}>{a.lessons.title}</div>}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: a.graded === a.total ? T.lime : T.hint, whiteSpace: "nowrap" }}>
                      {a.graded}/{a.total} bajardi
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: due.overdue && a.graded < a.total ? T.red : T.hint }}>
                    <Clock size={12} /> {due.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 540, background: "#fff", borderRadius: "18px 18px 0 0", maxHeight: "92dvh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 12px", borderBottom: "1px solid rgba(13,58,26,.08)", position: "sticky", top: 0, background: "#fff" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: T.green }}>Yangi topshiriq</span>
              <button onClick={() => setOpen(false)} style={{ background: "rgba(13,58,26,.07)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.text2 }}>
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: "16px 18px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Topshiriq nomi *</label>
                <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} style={inp} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Tavsif</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} style={{ ...inp, resize: "vertical" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Test / dars tanlash *</label>
                <select value={form.lessonId} onChange={(e) => setForm((f) => ({ ...f, lessonId: e.target.value }))} style={inp}>
                  <option value="">— tanlang —</option>
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      [{l.track}] {l.title}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Muddat</label>
                  <input type="datetime-local" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} style={inp} />
                </div>
                <div style={{ width: 100 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>O'tish bali</label>
                  <input type="number" value={form.passingScore} onChange={(e) => setForm((f) => ({ ...f, passingScore: e.target.value }))} style={inp} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Urinishlar soni (ixtiyoriy, cheksiz uchun bo'sh qoldiring)</label>
                <input type="number" value={form.maxAttempts} onChange={(e) => setForm((f) => ({ ...f, maxAttempts: e.target.value }))} style={inp} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 8 }}>Kimga berish</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <button
                    onClick={() => setForm((f) => ({ ...f, wholeClass: true }))}
                    style={{ flex: 1, padding: "9px 10px", borderRadius: 9, border: form.wholeClass ? `1.5px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)", background: form.wholeClass ? "rgba(46,184,46,.08)" : "transparent", color: T.green, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    {isCeo ? "Barcha o'quvchilar" : "Mening barcha o'quvchilarim"}
                  </button>
                  <button
                    onClick={() => setForm((f) => ({ ...f, wholeClass: false }))}
                    style={{ flex: 1, padding: "9px 10px", borderRadius: 9, border: !form.wholeClass ? `1.5px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)", background: !form.wholeClass ? "rgba(46,184,46,.08)" : "transparent", color: T.green, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    Tanlangan o'quvchilar
                  </button>
                </div>
                {!form.wholeClass && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 220, overflowY: "auto" }}>
                    {students.map((s) => {
                      const sel = form.selectedIds.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => toggleStudent(s.id)}
                          style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 9, border: sel ? `1.5px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.1)", background: sel ? "rgba(46,184,46,.07)" : "rgba(13,58,26,.02)", cursor: "pointer", textAlign: "left" }}
                        >
                          <div style={{ flex: 1, fontSize: 13, color: T.green }}>{s.ism} {s.familya}</div>
                          {sel && <CheckCircle2 size={16} color={T.lime} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {err && <div style={{ fontSize: 12, color: T.red }}>{err}</div>}

              <button onClick={save} disabled={saving} style={{ ...BtnP, width: "100%", justifyContent: "center", opacity: saving ? 0.7 : 1 }}>
                {saving ? "Saqlanmoqda…" : "Topshiriqni yaratish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── O'quvchi tomoni ──────────────────────────────────────────────────

function StudentAssignments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<StudentAssignmentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseMode || !supabase || !user) {
      setLoading(false);
      return;
    }
    let alive = true;
    (async () => {
      const { data } = await supabase!
        .from("assignment_students")
        .select("id, status, score, submitted_at, assignments(id, title, description, due_date, passing_score, max_attempts, lesson_id, lessons(title, source_key))")
        .eq("student_id", user.id);
      if (!alive) return;
      const list = (data as unknown as StudentAssignmentRow[]) ?? [];
      list.sort((a, b) => {
        const da = a.assignments?.due_date ? new Date(a.assignments.due_date).getTime() : Infinity;
        const db = b.assignments?.due_date ? new Date(b.assignments.due_date).getTime() : Infinity;
        return da - db;
      });
      setRows(list);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [user]);

  if (!isSupabaseMode) return <OfflineNotice />;
  if (loading) return <div style={{ textAlign: "center", color: T.hint, fontSize: 13, padding: 30 }}>Yuklanmoqda…</div>;
  if (rows.length === 0) return <div style={{ ...card(), margin: 16, padding: 20, textAlign: "center", color: T.hint, fontSize: 13 }}>Hozircha sizga topshiriq berilmagan.</div>;

  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      {rows.map((r) => {
        const a = r.assignments;
        if (!a) return null;
        const due = fmtDue(a.due_date);
        const done = r.status === "graded" || r.status === "submitted";
        const passed = done && r.score !== null && r.score >= a.passing_score;
        return (
          <button
            key={r.id}
            onClick={() => a.lessons && navigate(sourceKeyToRoute(a.lessons.source_key))}
            style={{ ...card(), padding: 14, textAlign: "left", cursor: "pointer", border: "1px solid rgba(13,58,26,.08)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{a.title}</div>
                {a.lessons && <div style={{ fontSize: 11, color: T.hint, marginTop: 2 }}>{a.lessons.title}</div>}
              </div>
              {done ? (
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: passed ? T.lime : "#F59E0B" }}>
                  <CheckCircle2 size={14} /> {r.score}%
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: due.overdue ? T.red : T.hint }}>
                  {due.overdue && <AlertCircle size={14} />} Kutilmoqda
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: !done && due.overdue ? T.red : T.hint }}>
              <Clock size={12} /> {due.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function AssignmentsView() {
  const { user } = useAuth();
  if (!user) return null;
  const isStaff = user.role === "ceo" || user.role === "teacher";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <Header title="Topshiriqlar" />
      {isStaff ? <TeacherAssignments /> : <StudentAssignments />}
    </div>
  );
}
