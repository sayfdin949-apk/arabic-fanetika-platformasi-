import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserPlus, Trash2, X, Users, ChevronDown, ChevronUp, BookOpen, Layers, BarChart2, Send, Check, CreditCard } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { store } from "../../lib/storage";
import type { DoneMap } from "../progress/ProgressContext";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";

type TolovStatus = "trial" | "pending" | "active" | "blocked";
interface TolovMalumat { status: TolovStatus; summа?: number; tarif?: string; keyingioyliklTolov?: string }

const TOLOV_RANG: Record<TolovStatus, string> = {
  trial: "#F59E0B", pending: "#0891B2", active: "#16A34A", blocked: "#DC2626",
};
const TOLOV_LABEL: Record<TolovStatus, string> = {
  trial: "Sinov", pending: "Kutilmoqda", active: "Faol", blocked: "Bloklangan",
};

const NAZ_TOTAL = NAZARIY.length;
const AMAL_TOTAL = AMALIY.length;

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

function ProgBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(13,58,26,.08)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: color, transition: "width .4s ease" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 28, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

export function OquvchilarView() {
  const { user, users, addUser, removeUser, patchUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ism: "", familya: "", login: "", tel: "", tugilgan: "", telegramId: "", tur: "" });
  const [err, setErr] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [progData, setProgData] = useState<Record<string, { naz: DoneMap; amal: DoneMap }>>({});
  const [editTg, setEditTg] = useState<string | null>(null);
  const [tgInput, setTgInput] = useState("");
  const [tolovlar, setTolovlar] = useState<Record<string, TolovMalumat>>({});

  const students = users.filter((u) => u.role === "student");

  useEffect(() => {
    students.forEach((s) => {
      void store.get<TolovMalumat>(`tolov_${s.id}`).then((d) => {
        if (d) setTolovlar((prev) => ({ ...prev, [s.id]: d }));
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  if (user?.role !== "teacher" && user?.role !== "ceo") return <Navigate to="/" replace />;

  const tasdiqlaTolov = async (uid: string) => {
    const cur = tolovlar[uid] ?? { status: "trial" as TolovStatus };
    const updated: TolovMalumat = {
      ...cur,
      status: "active",
      keyingioyliklTolov: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setTolovlar((prev) => ({ ...prev, [uid]: updated }));
    await store.set(`tolov_${uid}`, updated);
    try { localStorage.setItem(`afp:tolov_${uid}`, JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const bekorQilTolov = async (uid: string) => {
    const cur = tolovlar[uid] ?? { status: "trial" as TolovStatus };
    const updated: TolovMalumat = { ...cur, status: "trial" };
    setTolovlar((prev) => ({ ...prev, [uid]: updated }));
    await store.set(`tolov_${uid}`, updated);
    try { localStorage.setItem(`afp:tolov_${uid}`, JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const upd = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErr("");
  };

  const save = async () => {
    if (!form.ism.trim() || !form.login.trim()) {
      setErr("Ism va login majburiy");
      return;
    }
    if (!form.tur) {
      setErr("Yo'nalishni tanlang");
      return;
    }
    const tgIdNum = form.telegramId.trim() ? parseInt(form.telegramId.trim()) : undefined;
    const res = await addUser({
      ism: form.ism.trim(),
      familya: form.familya.trim(),
      login: form.login.trim(),
      parol: Math.random().toString(36).slice(2, 10),
      role: "student",
      tel: form.tel.trim() || undefined,
      tugilgan: form.tugilgan.trim() || undefined,
      avatar: null,
      telegramId: tgIdNum,
      tur: form.tur as "grammatika" | "fonetika",
    });
    if (!res.ok) { setErr(res.error ?? "Xatolik"); return; }
    setForm({ ism: "", familya: "", login: "", tel: "", tugilgan: "", telegramId: "", tur: "" });
    setOpen(false);
  };

  const saveTgId = (id: string) => {
    const num = tgInput.trim() ? parseInt(tgInput.trim()) : undefined;
    void patchUser(id, { telegramId: num });
    setEditTg(null);
    setTgInput("");
  };

  const del = (id: string, name: string) => {
    if (window.confirm(`${name} o'chirilsinmi?`)) void removeUser(id);
  };

  const toggleExpand = async (id: string) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    if (!progData[id]) {
      const [nd, ad] = await Promise.all([
        store.get<DoneMap>(`naz_done_${id}`),
        store.get<DoneMap>(`amal_done_${id}`),
      ]);
      setProgData((p) => ({ ...p, [id]: { naz: nd ?? {}, amal: ad ?? {} } }));
    }
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>O'qituvchi</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>O'quvchilar</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "6px 12px" }}>
              <Users size={13} color={T.limeBrt} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>Jami:</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{students.length} o'quvchi</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "6px 12px" }}>
              <BarChart2 size={13} color={T.limeBrt} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>Ko'rsatkich:</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>bosing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 28px" }}>
        {/* Add student */}
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            style={{
              width: "100%",
              background: T.gLime,
              color: T.onCta,
              border: "none",
              borderRadius: 14,
              padding: "14px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 16,
              boxShadow: "0 4px 14px rgba(46,184,46,.35)",
            }}
          >
            <UserPlus size={18} /> O'quvchi qo'shish
          </button>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)", padding: 16, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Yangi o'quvchi</span>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "rgba(13,58,26,.07)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: T.text2, cursor: "pointer" }}>
                <X size={15} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ display: "flex", gap: 9 }}>
                <input placeholder="Ism *" value={form.ism} onChange={(e) => upd("ism", e.target.value)} style={inp} />
                <input placeholder="Familya" value={form.familya} onChange={(e) => upd("familya", e.target.value)} style={inp} />
              </div>
              <input placeholder="Login *" value={form.login} onChange={(e) => upd("login", e.target.value)} style={inp} />
              <div style={{ display: "flex", gap: 9 }}>
                <input placeholder="Telefon" value={form.tel} onChange={(e) => upd("tel", e.target.value)} style={inp} />
                <input placeholder="Tug'ilgan yil" value={form.tugilgan} onChange={(e) => upd("tugilgan", e.target.value)} style={inp} />
              </div>
              <input placeholder="Telegram ID (ixtiyoriy)" value={form.telegramId} onChange={(e) => upd("telegramId", e.target.value)} style={inp} type="number" />
              {/* Yo'nalish tanlash */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.text2, marginBottom: 6 }}>Yo'nalish *</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {([
                    { val: "fonetika", label: "Fonetika" },
                    { val: "grammatika", label: "Grammatika" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => upd("tur", opt.val)}
                      style={{
                        flex: 1, padding: "10px 0", borderRadius: 9, border: "none",
                        background: form.tur === opt.val ? T.gGreen : "rgba(13,58,26,.06)",
                        color: form.tur === opt.val ? "#fff" : T.text2,
                        fontSize: 13, fontWeight: 700, cursor: "pointer",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              {err && (
                <div style={{ fontSize: 12, color: T.red, background: "rgba(230,0,35,.05)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 8, padding: "8px 12px" }}>{err}</div>
              )}
              <button
                onClick={save}
                style={{ background: T.gGreen, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 2 }}
              >
                Saqlash
              </button>
            </div>
          </div>
        )}

        {/* Student list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {students.map((s, idx) => {
            const isExp = expanded === s.id;
            const prog = progData[s.id];
            const tolov = tolovlar[s.id];
            const nazCount = prog ? Object.values(prog.naz).filter((r) => r.pct >= 80).length : null;
            const amalCount = prog ? Object.values(prog.amal).filter((r) => r.pct >= 80).length : null;

            return (
              <div
                key={s.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid rgba(13,58,26,.08)",
                  boxShadow: "0 1px 2px rgba(13,58,26,.04)",
                  overflow: "hidden",
                }}
              >
                {/* Main row */}
                <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                    {s.ism[0]?.toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>
                      {s.ism} {s.familya}
                    </div>
                    <div style={{ fontSize: 11, color: T.hint, marginTop: 1, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>{idx + 1} · @{s.login}</span>
                      {s.tur && (
                        <span style={{ background: s.tur === "fonetika" ? "rgba(8,145,178,.12)" : "rgba(124,58,237,.12)", color: s.tur === "fonetika" ? "#0891B2" : "#7C3AED", borderRadius: 5, padding: "1px 6px", fontWeight: 700, fontSize: 10 }}>
                          {s.tur === "fonetika" ? "Fonetika" : "Grammatika"}
                        </span>
                      )}
                    </div>
                    {editTg === s.id ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
                        <input
                          autoFocus
                          type="number"
                          placeholder="Telegram ID"
                          value={tgInput}
                          onChange={(e) => setTgInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") saveTgId(s.id); if (e.key === "Escape") setEditTg(null); }}
                          style={{ fontSize: 11, border: "1px solid rgba(13,58,26,.2)", borderRadius: 6, padding: "3px 7px", width: 130, outline: "none", color: T.green }}
                        />
                        <button onClick={() => saveTgId(s.id)} style={{ background: T.gGreen, border: "none", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <Check size={12} color="#fff" />
                        </button>
                        <button onClick={() => setEditTg(null)} style={{ background: "rgba(13,58,26,.08)", border: "none", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <X size={12} color={T.text2} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => { setEditTg(s.id); setTgInput(String(s.telegramId ?? "")); }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, cursor: "pointer", background: s.telegramId ? "rgba(46,184,46,.1)" : "rgba(13,58,26,.06)", borderRadius: 6, padding: "2px 7px", border: `1px solid ${s.telegramId ? "rgba(46,184,46,.25)" : "rgba(13,58,26,.12)"}` }}
                      >
                        <Send size={9} color={s.telegramId ? T.green : T.hint} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: s.telegramId ? T.green : T.hint }}>
                          {s.telegramId ? `TG: ${s.telegramId}` : "TG ulash"}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => void toggleExpand(s.id)}
                    style={{
                      background: isExp ? "rgba(46,184,46,.12)" : "rgba(13,58,26,.06)",
                      border: isExp ? "1px solid rgba(46,184,46,.25)" : "1px solid transparent",
                      borderRadius: 10,
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: isExp ? T.green : T.text2,
                      cursor: "pointer",
                      flexShrink: 0,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    <BarChart2 size={12} />
                    {isExp ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  <button
                    onClick={() => del(s.id, `${s.ism} ${s.familya}`)}
                    style={{ background: "rgba(230,0,35,.07)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: T.red, cursor: "pointer", flexShrink: 0 }}
                    aria-label="O'chirish"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Progress panel */}
                {isExp && (
                  <div style={{ borderTop: "1px solid rgba(13,58,26,.07)", padding: "14px 16px 16px", background: "rgba(13,58,26,.015)" }}>
                    {/* To'lov holati (CEO uchun) */}
                    {user?.role === "ceo" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "10px 12px", background: "#fff", borderRadius: 10, border: "1px solid rgba(13,58,26,.08)" }}>
                        <CreditCard size={13} color={TOLOV_RANG[tolov?.status ?? "trial"]} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: TOLOV_RANG[tolov?.status ?? "trial"], flex: 1 }}>
                          To'lov: {TOLOV_LABEL[tolov?.status ?? "trial"]}
                          {tolov?.tarif && ` · ${tolov.tarif}`}
                        </span>
                        {tolov?.status !== "active" ? (
                          <button
                            onClick={() => void tasdiqlaTolov(s.id)}
                            style={{ background: "rgba(22,163,74,.12)", color: "#16A34A", border: "1px solid rgba(22,163,74,.3)", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                          >
                            Tasdiqlash
                          </button>
                        ) : (
                          <button
                            onClick={() => void bekorQilTolov(s.id)}
                            style={{ background: "rgba(220,38,38,.08)", color: "#DC2626", border: "1px solid rgba(220,38,38,.2)", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                          >
                            Bekor
                          </button>
                        )}
                      </div>
                    )}
                    {!prog ? (
                      <div style={{ textAlign: "center", color: T.hint, fontSize: 12, padding: "10px 0" }}>Yuklanmoqda...</div>
                    ) : (
                      <>
                        {/* Stat cards */}
                        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                          <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 12px", border: "1px solid rgba(13,58,26,.07)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                              <BookOpen size={11} color={T.green500} />
                              <span style={{ fontSize: 10, fontWeight: 700, color: T.green500, textTransform: "uppercase", letterSpacing: ".04em" }}>Nazariy</span>
                            </div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: T.green, lineHeight: 1, marginBottom: 5 }}>
                              {nazCount}<span style={{ fontSize: 11, fontWeight: 500, color: T.hint }}>/{NAZ_TOTAL}</span>
                            </div>
                            <ProgBar value={nazCount ?? 0} max={NAZ_TOTAL} color={T.lime} />
                          </div>
                          <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 12px", border: "1px solid rgba(13,58,26,.07)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                              <Layers size={11} color={T.green500} />
                              <span style={{ fontSize: 10, fontWeight: 700, color: T.green500, textTransform: "uppercase", letterSpacing: ".04em" }}>Amaliy</span>
                            </div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: T.green, lineHeight: 1, marginBottom: 5 }}>
                              {amalCount}<span style={{ fontSize: 11, fontWeight: 500, color: T.hint }}>/{AMAL_TOTAL}</span>
                            </div>
                            <ProgBar value={amalCount ?? 0} max={AMAL_TOTAL} color="#f59e0b" />
                          </div>
                        </div>

                        {/* Overall */}
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: T.text2, marginBottom: 5 }}>Umumiy progress</div>
                          <ProgBar value={(nazCount ?? 0) + (amalCount ?? 0)} max={NAZ_TOTAL + AMAL_TOTAL} color={T.green} />
                        </div>

                        {/* Nazariy badge grid */}
                        {Object.keys(prog.naz).length > 0 && (
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: T.hint, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>O'tilgan nazariy darslar</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {Object.entries(prog.naz).sort(([a], [b]) => Number(a) - Number(b)).map(([id, rec]) => (
                                <div
                                  key={id}
                                  style={{
                                    background: rec.pct >= 80 ? "rgba(46,184,46,.12)" : "rgba(230,0,35,.08)",
                                    border: `1px solid ${rec.pct >= 80 ? "rgba(46,184,46,.28)" : "rgba(230,0,35,.2)"}`,
                                    borderRadius: 6,
                                    padding: "3px 8px",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: rec.pct >= 80 ? T.green : T.red,
                                  }}
                                >
                                  N{id}: {rec.pct}%
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Amaliy badge grid */}
                        {Object.keys(prog.amal).length > 0 && (
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: T.hint, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>O'tilgan amaliy boblar</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {Object.entries(prog.amal).sort(([a], [b]) => Number(a) - Number(b)).map(([id, rec]) => (
                                <div
                                  key={id}
                                  style={{
                                    background: rec.pct >= 80 ? "rgba(46,184,46,.12)" : "rgba(230,0,35,.08)",
                                    border: `1px solid ${rec.pct >= 80 ? "rgba(46,184,46,.28)" : "rgba(230,0,35,.2)"}`,
                                    borderRadius: 6,
                                    padding: "3px 8px",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: rec.pct >= 80 ? T.green : T.red,
                                  }}
                                >
                                  A{id}: {rec.pct}%
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {Object.keys(prog.naz).length === 0 && Object.keys(prog.amal).length === 0 && (
                          <div style={{ textAlign: "center", color: T.hint, fontSize: 12, padding: "8px 0" }}>
                            Hali birorta test topshirilmagan
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {students.length === 0 && (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "32px 20px", textAlign: "center" }}>
              <Users size={32} color="rgba(13,58,26,.2)" style={{ margin: "0 auto 10px" }} />
              <div style={{ fontSize: 14, color: T.hint }}>O'quvchilar yo'q. Yuqoridan qo'shing.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
