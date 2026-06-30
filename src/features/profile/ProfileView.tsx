import { useRef, useState } from "react";
import { Camera, LogOut, Phone, Calendar, Shield, Lock, Eye, EyeOff, CheckCircle, Edit2, X } from "lucide-react";
import { T, FONT } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";
import type { Role } from "../../auth/types";

const ROLE_LABELS: Record<Role, string> = { ceo: "CEO", teacher: "O'qituvchi", assistant: "Yordamchi ustoz", student: "O'quvchi" };

const Inp = ({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
  <div>
    <label style={{ fontSize: 11, color: T.hint, display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", border: "1px solid rgba(13,58,26,.2)", borderRadius: 9, padding: "10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box", color: T.text, background: "rgba(13,58,26,.03)", fontFamily: FONT }}
    />
  </div>
);

export function ProfileView() {
  const { user, avatar, updateAvatar, updateProfile, logout, changePassword } = useAuth();
  const { nazDone, amalDone, streak } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);

  // Edit profile state
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ism: "", familya: "", tel: "", tugilgan: "" });
  const [editErr, setEditErr] = useState("");
  const [editOk, setEditOk] = useState(false);

  // Password state
  const [parolOpen, setParolOpen] = useState(false);
  const [eskiParol, setEskiParol] = useState("");
  const [yangiParol, setYangiParol] = useState("");
  const [yangiParol2, setYangiParol2] = useState("");
  const [showEski, setShowEski] = useState(false);
  const [showYangi, setShowYangi] = useState(false);
  const [parolErr, setParolErr] = useState("");
  const [parolOk, setParolOk] = useState(false);

  if (!user) return null;

  const openEdit = () => {
    setEditForm({ ism: user.ism, familya: user.familya, tel: user.tel ?? "", tugilgan: user.tugilgan ?? "" });
    setEditErr("");
    setEditOk(false);
    setEditOpen(true);
  };

  const saveEdit = () => {
    setEditErr("");
    const res = updateProfile({ ism: editForm.ism, familya: editForm.familya, tel: editForm.tel || undefined, tugilgan: editForm.tugilgan || undefined });
    if (res.ok) {
      setEditOk(true);
      setTimeout(() => { setEditOk(false); setEditOpen(false); }, 1400);
    } else {
      setEditErr(res.error ?? "Xatolik");
    }
  };

  const handleChangePassword = () => {
    setParolErr("");
    if (!eskiParol || !yangiParol || !yangiParol2) { setParolErr("Barcha maydonlarni to'ldiring"); return; }
    if (yangiParol !== yangiParol2) { setParolErr("Yangi parollar mos kelmadi"); return; }
    const res = changePassword(eskiParol, yangiParol);
    if (res.ok) {
      setParolOk(true);
      setEskiParol(""); setYangiParol(""); setYangiParol2("");
      setTimeout(() => { setParolOk(false); setParolOpen(false); }, 2000);
    } else {
      setParolErr(res.error ?? "Xatolik yuz berdi");
    }
  };

  const nazPass = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const amalDoneCount = Object.keys(amalDone).length;
  const nazPct = Math.round((nazPass / NAZARIY.length) * 100);
  const amalPct = Math.round((amalDoneCount / AMALIY.length) * 100);
  const overall = Math.round((nazPct + amalPct) / 2);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => updateAvatar(String(r.result));
    r.readAsDataURL(f);
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "22px 20px 28px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 16 }}>Hisob</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              {avatar ? (
                <img src={avatar} alt="" style={{ width: 76, height: 76, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,.3)" }} />
              ) : (
                <div style={{ width: 76, height: 76, borderRadius: "50%", background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: T.onCta, border: "3px solid rgba(255,255,255,.2)" }}>
                  {user.ism[0]?.toUpperCase()}
                </div>
              )}
              <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: T.lime, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Camera size={13} color={T.onCta} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={pick} style={{ display: "none" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{user.ism} {user.familya}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 3 }}>@{user.login}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 13 }}>🔥</span>
                <span style={{ fontSize: 12, color: T.limeBrt, fontWeight: 600 }}>{streak.days} kun streak</span>
              </div>
            </div>
            <div style={{ flexShrink: 0, background: "rgba(255,255,255,.12)", borderRadius: 12, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.limeBrt }}>{overall}%</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.55)", marginTop: 1 }}>kurs</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {[
            { l: "Nazariy o'tilgan", v: `${nazPass}/${NAZARIY.length}`, pct: nazPct },
            { l: "Amaliy bajarilgan", v: `${amalDoneCount}/${AMALIY.length}`, pct: amalPct },
          ].map((s) => (
            <div key={s.l} style={{ flex: 1, background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 4px 12px rgba(13,58,26,.06)", padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.pct >= 80 ? T.lime : T.green }}>{s.v}</div>
              <div style={{ height: 5, borderRadius: 3, background: "rgba(13,58,26,.08)", overflow: "hidden", margin: "6px 0" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, background: s.pct >= 80 ? T.gLimeH : "linear-gradient(90deg,#FFA500,#FF8C00)", borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 10, color: T.text2, lineHeight: 1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Profile info + Edit */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 4px 12px rgba(13,58,26,.06)", marginBottom: 14, overflow: "hidden" }}>
          {/* Info rows */}
          {[
            user.tel ? { icon: Phone, label: "Telefon", value: user.tel } : null,
            user.tugilgan ? { icon: Calendar, label: "Tug'ilgan yil", value: user.tugilgan } : null,
            { icon: Shield, label: "Rol", value: ROLE_LABELS[user.role] },
          ].filter(Boolean).map((it, i, arr) => {
            const Icon = it!.icon;
            return (
              <div key={it!.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < arr.length - 1 ? "1px solid rgba(13,58,26,.07)" : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(13,58,26,.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} color={T.green500} />
                </div>
                <span style={{ flex: 1, fontSize: 13, color: T.text2 }}>{it!.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{it!.value}</span>
              </div>
            );
          })}

          {/* Edit button */}
          <div style={{ borderTop: "1px solid rgba(13,58,26,.07)", padding: "10px 16px" }}>
            {!editOpen ? (
              <button
                onClick={openEdit}
                style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(13,58,26,.06)", border: "none", borderRadius: 9, padding: "9px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: T.text2 }}
              >
                <Edit2 size={14} /> Ma'lumotlarni tahrirlash
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Tahrirlash</span>
                  <button onClick={() => setEditOpen(false)} style={{ background: "rgba(13,58,26,.07)", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.text2 }}><X size={13} /></button>
                </div>

                {editOk && (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(46,184,46,.08)", border: "1px solid rgba(46,184,46,.2)", borderRadius: 9, padding: "9px 12px", fontSize: 13, fontWeight: 600, color: T.green }}>
                    <CheckCircle size={14} /> Saqlandi!
                  </div>
                )}

                <div style={{ display: "flex", gap: 9 }}>
                  <Inp label="Ism *" value={editForm.ism} onChange={(v) => setEditForm((p) => ({ ...p, ism: v }))} />
                  <Inp label="Familya" value={editForm.familya} onChange={(v) => setEditForm((p) => ({ ...p, familya: v }))} />
                </div>
                <Inp label="Telefon" value={editForm.tel} onChange={(v) => setEditForm((p) => ({ ...p, tel: v }))} placeholder="+998..." />
                <Inp label="Tug'ilgan yil" value={editForm.tugilgan} onChange={(v) => setEditForm((p) => ({ ...p, tugilgan: v }))} placeholder="2005" />

                {editErr && <div style={{ fontSize: 12, color: T.red, background: "rgba(230,0,35,.05)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 8, padding: "8px 12px" }}>{editErr}</div>}

                <button
                  onClick={saveEdit}
                  style={{ background: T.gGreen, color: "#fff", border: "none", borderRadius: 9, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >
                  Saqlash
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Password change */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 4px 12px rgba(13,58,26,.06)", marginBottom: 14, overflow: "hidden" }}>
          <button
            onClick={() => { setParolOpen((p) => !p); setParolErr(""); setParolOk(false); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(13,58,26,.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Lock size={15} color={T.green500} />
            </div>
            <span style={{ flex: 1, fontSize: 13, color: T.text, fontWeight: 500 }}>Parolni o'zgartirish</span>
            <span style={{ fontSize: 12, color: T.hint, fontWeight: 700 }}>{parolOpen ? "▲" : "▼"}</span>
          </button>

          {parolOpen && (
            <div style={{ padding: "0 16px 16px", borderTop: "1px solid rgba(13,58,26,.07)", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ height: 0 }} />
              {parolOk && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(46,184,46,.08)", border: "1px solid rgba(46,184,46,.2)", borderRadius: 9, padding: "10px 12px", color: T.green, fontSize: 13, fontWeight: 600 }}>
                  <CheckCircle size={15} /> Parol muvaffaqiyatli o'zgartirildi!
                </div>
              )}
              {[
                { label: "Eski parol", val: eskiParol, set: setEskiParol, show: showEski, toggleShow: () => setShowEski((s) => !s) },
                { label: "Yangi parol", val: yangiParol, set: setYangiParol, show: showYangi, toggleShow: () => setShowYangi((s) => !s) },
                { label: "Yangi parolni tasdiqlang", val: yangiParol2, set: setYangiParol2, show: showYangi, toggleShow: () => setShowYangi((s) => !s) },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: 11, color: T.hint, display: "block", marginBottom: 4, fontWeight: 600 }}>{f.label}</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={f.show ? "text" : "password"}
                      value={f.val}
                      onChange={(e) => { f.set(e.target.value); setParolErr(""); }}
                      placeholder="••••"
                      style={{ width: "100%", border: `1px solid ${parolErr ? T.red : "rgba(13,58,26,.2)"}`, borderRadius: 9, padding: "10px 40px 10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box", color: T.text, background: "rgba(13,58,26,.03)", fontFamily: FONT }}
                    />
                    <button type="button" onClick={f.toggleShow} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.hint, display: "flex", alignItems: "center" }}>
                      {f.show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}
              {parolErr && <div style={{ fontSize: 12, color: T.red, background: "rgba(230,0,35,.05)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 8, padding: "8px 12px" }}>{parolErr}</div>}
              <button onClick={handleChangePassword} style={{ background: T.gGreen, color: "#fff", border: "none", borderRadius: 9, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 2 }}>
                Saqlash
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={logout} style={{ width: "100%", background: "rgba(230,0,35,.07)", color: T.red, border: "1px solid rgba(230,0,35,.18)", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <LogOut size={17} /> Chiqish
        </button>
      </div>
    </div>
  );
}
