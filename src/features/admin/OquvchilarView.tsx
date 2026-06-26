import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserPlus, Trash2, X } from "lucide-react";
import { T } from "../../theme/tokens";
import { PageHeader, Page, Card } from "../../components/ui";
import { useAuth } from "../../auth/AuthContext";

const inp = {
  width: "100%",
  border: "1px solid rgba(13,58,26,.15)",
  borderRadius: 9,
  padding: "10px 12px",
  fontSize: 13,
  color: T.green,
  outline: "none",
  boxSizing: "border-box" as const,
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
    if (!res.ok) {
      setErr(res.error ?? "Xatolik");
      return;
    }
    setForm({ ism: "", familya: "", login: "", parol: "", tel: "", tugilgan: "" });
    setOpen(false);
  };

  const del = (id: string, name: string) => {
    if (window.confirm(`${name} o'chirilsinmi?`)) removeUser(id);
  };

  return (
    <>
      <PageHeader kicker="O'qituvchi" title="O'quvchilar" sub={`Jami: ${students.length}`} />
      <Page>
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, boxShadow: "0 2px 8px rgba(46,184,46,.3)" }}
          >
            <UserPlus size={18} /> O'quvchi qo'shish
          </button>
        ) : (
          <Card style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.green }}>Yangi o'quvchi</span>
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
              {err && <div style={{ fontSize: 12, color: T.red }}>{err}</div>}
              <button
                onClick={save}
                style={{ background: T.gLime, color: T.onCta, border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 2 }}
              >
                Saqlash
              </button>
            </div>
          </Card>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {students.map((s) => (
            <Card key={s.id} style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: T.onCta, flexShrink: 0 }}>
                {s.ism[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>
                  {s.ism} {s.familya}
                </div>
                <div style={{ fontSize: 11, color: T.hint }}>
                  @{s.login} · parol: {s.parol}
                </div>
              </div>
              <button
                onClick={() => del(s.id, `${s.ism} ${s.familya}`)}
                style={{ background: "rgba(230,0,35,.08)", border: "none", borderRadius: 9, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: T.red, cursor: "pointer", flexShrink: 0 }}
                aria-label="O'chirish"
              >
                <Trash2 size={16} />
              </button>
            </Card>
          ))}
          {students.length === 0 && <div style={{ fontSize: 13, color: T.hint, textAlign: "center", padding: 20 }}>O'quvchilar yo'q. Yuqoridan qo'shing.</div>}
        </div>
      </Page>
    </>
  );
}
