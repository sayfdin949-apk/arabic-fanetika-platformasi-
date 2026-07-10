import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Plus, X, Users, Clock, CalendarDays, ChevronDown, ChevronUp, Trash2, Edit2 } from "lucide-react";
import { T } from "../../theme/tokens";
import { store } from "../../lib/storage";
import { useAuth } from "../../auth/AuthContext";

export interface Guruh {
  id: string;
  nom: string;
  kunlar: number[]; // 1=Dush, 2=Sesh, 3=Chor, 4=Pay, 5=Juma, 6=Shan
  soat: string;
  juftToq: "juft" | "toq" | "hammasi";
  oquvchiIds: string[];
  /** Bu guruhga biriktirilgan o'qituvchi (faqat CEO belgilaydi) */
  ogtuvchiId?: string;
}

const KUN_NOMI = ["", "Dush", "Sesh", "Chor", "Pay", "Juma", "Shan"];
const KUN_FULL = ["", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
const KUNLAR = [1, 2, 3, 4, 5, 6];

const JT_OPTS: { val: Guruh["juftToq"]; label: string; desc: string }[] = [
  { val: "hammasi", label: "Har hafta", desc: "Har haftada takrorlanadi" },
  { val: "juft",   label: "Juft haftalar", desc: "2, 4, 6... haftalar" },
  { val: "toq",    label: "Toq haftalar", desc: "1, 3, 5... haftalar" },
];

export const GURUHLAR_KEY = "guruhlar";
const STORE_KEY = GURUHLAR_KEY;

async function loadGuruhlar(): Promise<Guruh[]> {
  return (await store.get<Guruh[]>(STORE_KEY)) ?? [];
}
async function saveGuruhlar(list: Guruh[]): Promise<void> {
  await store.set(STORE_KEY, list);
}

function juftToqBadge(jt: Guruh["juftToq"]) {
  const map = { hammasi: { label: "Har hafta", bg: "rgba(46,184,46,.12)", color: T.lime },
                juft:    { label: "Juft ✦", bg: "rgba(59,130,246,.12)", color: "#3b82f6" },
                toq:     { label: "Toq ✦", bg: "rgba(234,88,12,.12)", color: "#ea580c" } };
  const s = map[jt];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, borderRadius: 6, padding: "2px 7px" }}>
      {s.label}
    </span>
  );
}

interface FormState {
  nom: string;
  kunlar: number[];
  soat: string;
  juftToq: Guruh["juftToq"];
  oquvchiIds: string[];
  ogtuvchiId: string;
}

const emptyForm = (): FormState => ({
  nom: "", kunlar: [], soat: "10:00", juftToq: "hammasi", oquvchiIds: [], ogtuvchiId: "",
});

export function GuruhlarView() {
  const { user, users } = useAuth();
  const [guruhlar, setGuruhlar] = useState<Guruh[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [modal, setModal] = useState<{ open: boolean; editId: string | null }>({ open: false, editId: null });
  const [form, setForm] = useState<FormState>(emptyForm());
  const [err, setErr] = useState("");

  const students = users.filter((u) => u.role === "student");
  const teachers = users.filter((u) => u.role === "teacher");

  useEffect(() => {
    loadGuruhlar().then(setGuruhlar);
  }, []);

  if (user?.role !== "teacher" && user?.role !== "ceo") return <Navigate to="/" replace />;

  const isCeo = user?.role === "ceo";
  const visibleGuruhlar = isCeo ? guruhlar : guruhlar.filter((g) => g.ogtuvchiId === user?.id);

  const openCreate = () => { setForm(emptyForm()); setErr(""); setModal({ open: true, editId: null }); };
  const openEdit = (g: Guruh) => {
    if (!isCeo) return;
    setForm({ nom: g.nom, kunlar: g.kunlar, soat: g.soat, juftToq: g.juftToq, oquvchiIds: g.oquvchiIds, ogtuvchiId: g.ogtuvchiId ?? "" });
    setErr("");
    setModal({ open: true, editId: g.id });
  };
  const closeModal = () => setModal({ open: false, editId: null });

  const toggleKun = (k: number) =>
    setForm((f) => ({ ...f, kunlar: f.kunlar.includes(k) ? f.kunlar.filter((x) => x !== k) : [...f.kunlar, k].sort() }));

  const toggleStudent = (id: string) =>
    setForm((f) => ({ ...f, oquvchiIds: f.oquvchiIds.includes(id) ? f.oquvchiIds.filter((x) => x !== id) : [...f.oquvchiIds, id] }));

  const save = async () => {
    if (!isCeo) return;
    if (!form.nom.trim()) { setErr("Guruh nomini kiriting"); return; }
    if (form.kunlar.length === 0) { setErr("Kamida bitta kun tanlang"); return; }

    const ogtuvchiId = form.ogtuvchiId || undefined;
    let next: Guruh[];
    if (modal.editId) {
      next = guruhlar.map((g) => g.id === modal.editId
        ? { ...g, nom: form.nom.trim(), kunlar: form.kunlar, soat: form.soat, juftToq: form.juftToq, oquvchiIds: form.oquvchiIds, ogtuvchiId }
        : g);
    } else {
      const newG: Guruh = { id: "g" + Date.now(), nom: form.nom.trim(), kunlar: form.kunlar, soat: form.soat, juftToq: form.juftToq, oquvchiIds: form.oquvchiIds, ogtuvchiId };
      next = [...guruhlar, newG];
    }
    await saveGuruhlar(next);
    setGuruhlar(next);
    closeModal();
  };

  const remove = async (id: string) => {
    if (!isCeo) return;
    const next = guruhlar.filter((g) => g.id !== id);
    await saveGuruhlar(next);
    setGuruhlar(next);
    if (expanded === id) setExpanded(null);
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>{isCeo ? "CEO" : "O'qituvchi"}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Guruhlar</div>
            {isCeo && (
              <button
                onClick={openCreate}
                style={{ display: "flex", alignItems: "center", gap: 6, background: T.gLime, border: "none", borderRadius: 10, padding: "9px 14px", fontSize: 13, fontWeight: 700, color: T.onCta, cursor: "pointer", boxShadow: "0 2px 10px rgba(46,184,46,.4)" }}
              >
                <Plus size={15} /> Guruh qo'shish
              </button>
            )}
          </div>

          {/* Summary chips */}
          <div style={{ display: "flex", gap: 8, marginBottom: 0, paddingBottom: 14 }}>
            {[
              { label: "Jami guruh", value: `${visibleGuruhlar.length}` },
              { label: "O'quvchilar", value: `${students.length}` },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "6px 12px" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>{s.label}:</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {visibleGuruhlar.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "40px 20px", textAlign: "center" }}>
            <Users size={36} color="rgba(13,58,26,.18)" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: T.hint, marginBottom: 6 }}>Guruhlar yo'q</div>
            <div style={{ fontSize: 13, color: T.hint }}>{isCeo ? "Yuqoridagi \"Guruh qo'shish\" tugmasini bosing" : "Sizga biriktirilgan guruh yo'q"}</div>
          </div>
        )}

        {visibleGuruhlar.map((g) => {
          const isOpen = expanded === g.id;
          const groupStudents = students.filter((s) => g.oquvchiIds.includes(s.id));
          return (
            <div key={g.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden" }}>
              {/* Card header */}
              <div
                style={{ padding: "14px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                onClick={() => setExpanded(isOpen ? null : g.id)}
              >
                {/* Icon */}
                <div style={{ width: 44, height: 44, borderRadius: 11, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Users size={20} color="#fff" />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: T.green }}>{g.nom}</span>
                    {juftToqBadge(g.juftToq)}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: T.hint }}>
                      <CalendarDays size={11} />
                      <span>{g.kunlar.map((k) => KUN_NOMI[k]).join(", ")}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: T.hint }}>
                      <Clock size={11} />
                      <span>{g.soat}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: T.hint }}>
                      <Users size={11} />
                      <span>{groupStudents.length} o'quvchi</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                  {isCeo && (
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(g); }}
                    style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(46,184,46,.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.lime }}
                  >
                    <Edit2 size={14} />
                  </button>
                  )}
                  {isCeo && (
                  <button
                    onClick={(e) => { e.stopPropagation(); if (confirm(`"${g.nom}" guruhini o'chirasizmi?`)) remove(g.id); }}
                    style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(230,0,35,.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.red }}
                  >
                    <Trash2 size={14} />
                  </button>
                  )}
                  {isOpen ? <ChevronUp size={16} color={T.hint} /> : <ChevronDown size={16} color={T.hint} />}
                </div>
              </div>

              {/* Expanded: schedule + students */}
              {isOpen && (
                <div style={{ borderTop: "1px solid rgba(13,58,26,.07)", padding: "12px 14px 14px" }}>
                  {/* Schedule grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
                    <div style={{ background: "rgba(13,58,26,.04)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: T.hint, fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>Kunlar</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.green }}>{g.kunlar.map((k) => KUN_FULL[k]).join(", ")}</div>
                    </div>
                    <div style={{ background: "rgba(13,58,26,.04)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: T.hint, fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>Soat</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.green }}>{g.soat}</div>
                    </div>
                    <div style={{ background: "rgba(13,58,26,.04)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: T.hint, fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>Hafta</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.green }}>
                        {g.juftToq === "hammasi" ? "Har hafta" : g.juftToq === "juft" ? "Juft" : "Toq"}
                      </div>
                    </div>
                  </div>

                  {isCeo && (
                    <div style={{ fontSize: 12, color: T.hint, marginBottom: 12 }}>
                      O'qituvchi: <span style={{ fontWeight: 700, color: T.green }}>
                        {(() => { const t = teachers.find((x) => x.id === g.ogtuvchiId); return t ? `${t.ism} ${t.familya}` : "Biriktirilmagan"; })()}
                      </span>
                    </div>
                  )}

                  {/* Students */}
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.hint, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>
                    O'quvchilar ({groupStudents.length})
                  </div>
                  {groupStudents.length === 0 ? (
                    <div style={{ fontSize: 12, color: T.hint }}>Bu guruhda o'quvchi yo'q</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {groupStudents.map((s) => (
                        <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(13,58,26,.03)", borderRadius: 9, padding: "8px 10px" }}>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.onCta, flexShrink: 0 }}>
                            {s.ism[0]?.toUpperCase()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{s.ism} {s.familya}</div>
                            {s.tel && <div style={{ fontSize: 11, color: T.hint }}>{s.tel}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          onClick={closeModal}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 540, background: "#fff", borderRadius: "18px 18px 0 0", maxHeight: "92dvh", overflowY: "auto", padding: "0 0 env(safe-area-inset-bottom)" }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 12px", borderBottom: "1px solid rgba(13,58,26,.08)", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: T.green }}>
                {modal.editId ? "Guruhni tahrirlash" : "Yangi guruh"}
              </span>
              <button onClick={closeModal} style={{ background: "rgba(13,58,26,.07)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.text2 }}>
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Name */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Guruh nomi</label>
                <input
                  value={form.nom}
                  onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                  placeholder='Masalan: "1-guruh" yoki "Kechki guruh"'
                  style={{ width: "100%", border: "1.5px solid rgba(13,58,26,.15)", borderRadius: 10, padding: "10px 12px", fontSize: 14, color: T.green, outline: "none", boxSizing: "border-box", background: "rgba(13,58,26,.02)" }}
                />
              </div>

              {/* Days */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 8 }}>Dars kunlari</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {KUNLAR.map((k) => {
                    const active = form.kunlar.includes(k);
                    return (
                      <button
                        key={k}
                        onClick={() => toggleKun(k)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 10,
                          border: active ? "none" : "1.5px solid rgba(13,58,26,.15)",
                          background: active ? T.gGreen : "transparent",
                          color: active ? "#fff" : T.text2,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all .15s",
                        }}
                      >
                        {KUN_FULL[k]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Dars soati</label>
                <input
                  type="time"
                  value={form.soat}
                  onChange={(e) => setForm((f) => ({ ...f, soat: e.target.value }))}
                  style={{ border: "1.5px solid rgba(13,58,26,.15)", borderRadius: 10, padding: "10px 12px", fontSize: 14, color: T.green, outline: "none", background: "rgba(13,58,26,.02)" }}
                />
              </div>

              {/* Juft/Toq */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 8 }}>Hafta tartibi</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {JT_OPTS.map((opt) => {
                    const active = form.juftToq === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => setForm((f) => ({ ...f, juftToq: opt.val }))}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "11px 14px",
                          borderRadius: 11,
                          border: active ? `2px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)",
                          background: active ? "rgba(46,184,46,.07)" : "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${active ? T.lime : "rgba(13,58,26,.25)"}`, background: active ? T.lime : "transparent", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: active ? T.green : T.text }}>{opt.label}</div>
                          <div style={{ fontSize: 11, color: T.hint }}>{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* O'qituvchi (faqat CEO) */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Mas'ul o'qituvchi</label>
                <select
                  value={form.ogtuvchiId}
                  onChange={(e) => setForm((f) => ({ ...f, ogtuvchiId: e.target.value }))}
                  style={{ width: "100%", border: "1.5px solid rgba(13,58,26,.15)", borderRadius: 10, padding: "10px 12px", fontSize: 14, color: T.green, outline: "none", boxSizing: "border-box", background: "rgba(13,58,26,.02)" }}
                >
                  <option value="">Biriktirilmagan</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>{t.ism} {t.familya}</option>
                  ))}
                </select>
              </div>

              {/* Students */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 8 }}>
                  O'quvchilar ({form.oquvchiIds.length} tanlangan)
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {students.map((s) => {
                    const sel = form.oquvchiIds.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggleStudent(s.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: sel ? `1.5px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.1)",
                          background: sel ? "rgba(46,184,46,.07)" : "rgba(13,58,26,.02)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all .15s",
                        }}
                      >
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: sel ? T.gLime : T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                          {s.ism[0]?.toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{s.ism} {s.familya}</div>
                          {s.tugilgan && <div style={{ fontSize: 11, color: T.hint }}>{s.tugilgan}</div>}
                        </div>
                        <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${sel ? T.lime : "rgba(13,58,26,.2)"}`, background: sel ? T.lime : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {sel && <span style={{ color: T.onCta, fontSize: 12, fontWeight: 900 }}>✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {err && (
                <div style={{ background: "rgba(230,0,35,.07)", border: "1px solid rgba(230,0,35,.2)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: T.red }}>
                  {err}
                </div>
              )}

              <button
                onClick={() => void save()}
                style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(46,184,46,.35)" }}
              >
                {modal.editId ? "Saqlash" : "Guruh yaratish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
