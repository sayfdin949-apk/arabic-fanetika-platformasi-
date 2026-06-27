import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserPlus, Trash2, X, Users } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";

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

export function OquvchilarView() {
  const { user, users, addUser, removeUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ism: "", familya: "", login: "", parol: "", tel: "", tugilgan: "" });
  const [err, setErr] = useState("");

  if (user?.role !== "teacher") return <Navigate to="/" replace />;

  const students = users.filter((u) => u.role === "student");

  const upd = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErr("");
  };

  const save = () => {
    if (!form.ism.trim() || !form.login.trim() || !form.parol.trim()) {
      setErr("Ism, login va parol majburiy");
      return;
    }
    const res = addUser({
      ism: form.ism.trim(),
      familya: form.familya.trim(),
      login: form.login.trim(),
      parol: form.parol.trim(),
      role: "student",
      tel: form.tel.trim() || undefined,
      tugilgan: form.tugilgan.trim() || undefined,
      avatar: null,
    });
    if (!res.ok) { setErr(res.error ?? "Xatolik"); return; }
    setForm({ ism: "", familya: "", login: "", parol: "", tel: "", tugilgan: "" });
    setOpen(false);
  };

  const del = (id: string, name: string) => {
    if (window.confirm(`${name} o'chirilsinmi?`)) removeUser(id);
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
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 28px" }}>
        {/* Add student button / form */}
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
              <input placeholder="Parol *" value={form.parol} onChange={(e) => upd("parol", e.target.value)} style={inp} />
              <div style={{ display: "flex", gap: 9 }}>
                <input placeholder="Telefon" value={form.tel} onChange={(e) => upd("tel", e.target.value)} style={inp} />
                <input placeholder="Tug'ilgan yil" value={form.tugilgan} onChange={(e) => upd("tugilgan", e.target.value)} style={inp} />
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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {students.map((s, idx) => (
            <div
              key={s.id}
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
                {s.ism[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>
                  {s.ism} {s.familya}
                </div>
                <div style={{ fontSize: 11, color: T.hint, marginTop: 1 }}>
                  {idx + 1} · @{s.login} · parol: <span style={{ fontWeight: 600, color: T.text2 }}>{s.parol}</span>
                </div>
              </div>
              <button
                onClick={() => del(s.id, `${s.ism} ${s.familya}`)}
                style={{ background: "rgba(230,0,35,.07)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: T.red, cursor: "pointer", flexShrink: 0 }}
                aria-label="O'chirish"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}

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
