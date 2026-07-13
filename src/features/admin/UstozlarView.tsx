import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserPlus, Trash2, X, Send, Check, UserCog, Star } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import type { Role } from "../../auth/types";

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

type Tab = "teacher" | "assistant";

export function UstozlarView() {
  const { user, users, addUser, removeUser, patchUser } = useAuth();
  const [tab, setTab] = useState<Tab>("teacher");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ism: "", familya: "", tel: "", telegramId: "", tur: "" });
  const [err, setErr] = useState("");
  const [editTg, setEditTg] = useState<string | null>(null);
  const [tgInput, setTgInput] = useState("");

  if (user?.role !== "ceo") return <Navigate to="/" replace />;

  const teachers = users.filter((u) => u.role === "teacher");
  const assistants = users.filter((u) => u.role === "assistant");
  const list = tab === "teacher" ? teachers : assistants;

  const upd = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErr("");
  };

  const save = async () => {
    if (!form.ism.trim()) { setErr("Ism majburiy"); return; }
    if (!form.tur) { setErr("Yo'nalishni tanlang"); return; }
    const tgIdNum = form.telegramId.trim() ? parseInt(form.telegramId.trim()) : undefined;
    const role: Role = tab;
    const res = await addUser({
      ism: form.ism.trim(),
      familya: form.familya.trim(),
      login: `${role}_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`,
      parol: Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b => b.toString(36).padStart(2, '0')).join('').slice(0, 8),
      role,
      tel: form.tel.trim() || undefined,
      avatar: null,
      telegramId: tgIdNum,
      tur: form.tur as "grammatika" | "fonetika",
      ...(role === "assistant" ? { assistantRating: 100 } : {}),
    });
    if (!res.ok) { setErr(res.error ?? "Xatolik"); return; }
    setForm({ ism: "", familya: "", tel: "", telegramId: "", tur: "" });
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

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>CEO</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16 }}>O'qituvchilar</div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, paddingBottom: 16 }}>
            {([
              { key: "teacher" as Tab, label: "O'qituvchilar", count: teachers.length },
              { key: "assistant" as Tab, label: "Yordamchi ustozlar", count: assistants.length },
            ]).map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setOpen(false); setErr(""); }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: tab === t.key ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)",
                  border: tab === t.key ? "1px solid rgba(255,255,255,.3)" : "1px solid transparent",
                  borderRadius: 10,
                  padding: "9px 10px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 28px" }}>
        {/* Add */}
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
            <UserPlus size={18} /> {tab === "teacher" ? "O'qituvchi qo'shish" : "Yordamchi ustoz qo'shish"}
          </button>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)", padding: 16, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>
                  {tab === "teacher" ? "Yangi o'qituvchi" : "Yangi yordamchi ustoz"}
                </span>
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
              <input placeholder="Telefon" value={form.tel} onChange={(e) => upd("tel", e.target.value)} style={inp} />
              <input placeholder="Telegram ID (ixtiyoriy)" value={form.telegramId} onChange={(e) => upd("telegramId", e.target.value)} style={inp} type="number" />
              {/* Yo'nalish */}
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
              <div style={{ fontSize: 11, color: T.hint, lineHeight: 1.5 }}>
                Login/parol talab qilinmaydi — kirish faqat Telegram orqali bo'ladi. Telegram ID ni bilmasangiz, bo'sh qoldiring va keyinroq ro'yxatdan "TG ulash" orqali biriktiring.
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

        {/* List */}
        {list.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "40px 20px", textAlign: "center" }}>
            <UserCog size={36} color="rgba(13,58,26,.18)" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: T.hint, marginBottom: 6 }}>
              {tab === "teacher" ? "O'qituvchilar yo'q" : "Yordamchi ustozlar yo'q"}
            </div>
            <div style={{ fontSize: 13, color: T.hint }}>Yuqoridagi tugma orqali qo'shing</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((u, idx) => (
            <div
              key={u.id}
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid rgba(13,58,26,.08)",
                boxShadow: "0 1px 2px rgba(13,58,26,.04)",
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                {u.ism[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>
                  {u.ism} {u.familya}
                </div>
                <div style={{ fontSize: 11, color: T.hint, marginTop: 1, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span>{idx + 1}</span>
                  {tab === "assistant" && (
                    <span style={{ display: "flex", alignItems: "center", gap: 3, color: T.text2, fontWeight: 600 }}>
                      <Star size={11} color="#eab308" /> {u.assistantRating ?? 100}
                    </span>
                  )}
                  {u.tel && <span>{u.tel}</span>}
                  {u.tur && (
                    <span style={{ background: u.tur === "fonetika" ? "rgba(8,145,178,.12)" : "rgba(124,58,237,.12)", color: u.tur === "fonetika" ? "#0891B2" : "#7C3AED", borderRadius: 5, padding: "1px 6px", fontWeight: 700, fontSize: 10 }}>
                      {u.tur === "fonetika" ? "Fonetika" : "Grammatika"}
                    </span>
                  )}
                </div>
                {editTg === u.id ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
                    <input
                      autoFocus
                      type="number"
                      placeholder="Telegram ID"
                      value={tgInput}
                      onChange={(e) => setTgInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") saveTgId(u.id); if (e.key === "Escape") setEditTg(null); }}
                      style={{ fontSize: 11, border: "1px solid rgba(13,58,26,.2)", borderRadius: 6, padding: "3px 7px", width: 130, outline: "none", color: T.green }}
                    />
                    <button onClick={() => saveTgId(u.id)} style={{ background: T.gGreen, border: "none", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <Check size={12} color="#fff" />
                    </button>
                    <button onClick={() => setEditTg(null)} style={{ background: "rgba(13,58,26,.08)", border: "none", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <X size={12} color={T.text2} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => { setEditTg(u.id); setTgInput(String(u.telegramId ?? "")); }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, cursor: "pointer", background: u.telegramId ? "rgba(46,184,46,.1)" : "rgba(13,58,26,.06)", borderRadius: 6, padding: "2px 7px", border: `1px solid ${u.telegramId ? "rgba(46,184,46,.25)" : "rgba(13,58,26,.12)"}` }}
                  >
                    <Send size={9} color={u.telegramId ? T.green : T.hint} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: u.telegramId ? T.green : T.hint }}>
                      {u.telegramId ? `TG: ${u.telegramId}` : "TG ulash"}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => del(u.id, `${u.ism} ${u.familya}`)}
                style={{ background: "rgba(230,0,35,.07)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: T.red, cursor: "pointer", flexShrink: 0 }}
                aria-label="O'chirish"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
