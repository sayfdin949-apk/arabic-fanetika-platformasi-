import { useRef, useState } from "react";
import { Camera, LogOut, Phone, Calendar, Shield, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { T } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { PageHeader, Page, Card } from "../../components/ui";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";

export function ProfileView() {
  const { user, avatar, updateAvatar, logout, changePassword } = useAuth();
  const { nazDone, amalDone } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);

  const [parolOpen, setParolOpen] = useState(false);
  const [eskiParol, setEskiParol] = useState("");
  const [yangiParol, setYangiParol] = useState("");
  const [yangiParol2, setYangiParol2] = useState("");
  const [showEski, setShowEski] = useState(false);
  const [showYangi, setShowYangi] = useState(false);
  const [parolErr, setParolErr] = useState("");
  const [parolOk, setParolOk] = useState(false);

  const handleChangePassword = () => {
    setParolErr("");
    if (!eskiParol || !yangiParol || !yangiParol2) {
      setParolErr("Barcha maydonlarni to'ldiring");
      return;
    }
    if (yangiParol !== yangiParol2) {
      setParolErr("Yangi parollar mos kelmadi");
      return;
    }
    const res = changePassword(eskiParol, yangiParol);
    if (res.ok) {
      setParolOk(true);
      setEskiParol(""); setYangiParol(""); setYangiParol2("");
      setTimeout(() => { setParolOk(false); setParolOpen(false); }, 2000);
    } else {
      setParolErr(res.error ?? "Xatolik yuz berdi");
    }
  };

  if (!user) return null;

  const nazPass = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const amalDoneCount = Object.keys(amalDone).length;

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => updateAvatar(String(r.result));
    r.readAsDataURL(f);
  };

  const info: { icon: typeof Phone; label: string; value: string }[] = [];
  if (user.tel) info.push({ icon: Phone, label: "Telefon", value: user.tel });
  if (user.tugilgan) info.push({ icon: Calendar, label: "Tug'ilgan yil", value: user.tugilgan });
  info.push({ icon: Shield, label: "Rol", value: user.role === "teacher" ? "O'qituvchi" : "O'quvchi" });

  return (
    <>
      <PageHeader kicker="Hisob" title="Profil" />
      <Page>
        <Card style={{ padding: 20, marginBottom: 16, textAlign: "center" }}>
          <div style={{ position: "relative", width: 88, height: 88, margin: "0 auto 12px" }}>
            {avatar ? (
              <img src={avatar} alt="" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: 88, height: 88, borderRadius: "50%", background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 700, color: T.onCta }}>
                {user.ism[0]?.toUpperCase()}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              style={{ position: "absolute", bottom: 0, right: 0, width: 30, height: 30, borderRadius: "50%", background: T.green, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              aria-label="Rasm yuklash"
            >
              <Camera size={14} color="#fff" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={pick} style={{ display: "none" }} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.green }}>
            {user.ism} {user.familya}
          </div>
          <div style={{ fontSize: 12, color: T.hint, marginTop: 2 }}>@{user.login}</div>
        </Card>

        {/* Statistika */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {[
            { l: "Nazariy o'tilgan", v: `${nazPass}/${NAZARIY.length}` },
            { l: "Amaliy bajarilgan", v: `${amalDoneCount}/${AMALIY.length}` },
          ].map((s) => (
            <Card key={s.l} style={{ flex: 1, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: T.lime }}>{s.v}</div>
              <div style={{ fontSize: 11, color: T.text2, marginTop: 3 }}>{s.l}</div>
            </Card>
          ))}
        </div>

        {/* Ma'lumotlar */}
        <Card style={{ marginBottom: 16 }}>
          {info.map((it, i) => (
            <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < info.length - 1 ? "1px solid rgba(13,58,26,.07)" : "none" }}>
              <it.icon size={17} color={T.green500} />
              <span style={{ flex: 1, fontSize: 13, color: T.text2 }}>{it.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{it.value}</span>
            </div>
          ))}
        </Card>

        {/* Parolni o'zgartirish */}
        <Card style={{ marginBottom: 16, overflow: "hidden" }}>
          <button
            onClick={() => { setParolOpen((p) => !p); setParolErr(""); setParolOk(false); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
          >
            <Lock size={17} color={T.green500} />
            <span style={{ flex: 1, fontSize: 13, color: T.text, fontWeight: 500 }}>Parolni o'zgartirish</span>
            <span style={{ fontSize: 11, color: T.hint }}>{parolOpen ? "▲" : "▼"}</span>
          </button>

          {parolOpen && (
            <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {parolOk && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: T.green, fontSize: 13, fontWeight: 600 }}>
                  <CheckCircle size={15} /> Parol muvaffaqiyatli o'zgartirildi!
                </div>
              )}

              {[
                { label: "Eski parol", val: eskiParol, set: setEskiParol, show: showEski, toggleShow: () => setShowEski((s) => !s) },
                { label: "Yangi parol", val: yangiParol, set: setYangiParol, show: showYangi, toggleShow: () => setShowYangi((s) => !s) },
                { label: "Yangi parolni tasdiqlang", val: yangiParol2, set: setYangiParol2, show: showYangi, toggleShow: () => setShowYangi((s) => !s) },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: 11, color: T.hint, display: "block", marginBottom: 4 }}>{f.label}</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={f.show ? "text" : "password"}
                      value={f.val}
                      onChange={(e) => { f.set(e.target.value); setParolErr(""); }}
                      placeholder="••••"
                      style={{ width: "100%", border: `1px solid ${parolErr ? T.red : "rgba(13,58,26,.2)"}`, borderRadius: 8, padding: "9px 38px 9px 11px", fontSize: 13, outline: "none", boxSizing: "border-box", color: T.text, background: "rgba(13,58,26,.03)" }}
                    />
                    <button
                      type="button"
                      onClick={f.toggleShow}
                      style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.hint, display: "flex", alignItems: "center" }}
                    >
                      {f.show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}

              {parolErr && (
                <div style={{ fontSize: 12, color: T.red }}>{parolErr}</div>
              )}

              <button
                onClick={handleChangePassword}
                style={{ background: T.green, color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 2 }}
              >
                Saqlash
              </button>
            </div>
          )}
        </Card>

        <button
          onClick={logout}
          style={{ width: "100%", background: "rgba(230,0,35,.08)", color: T.red, border: "1px solid rgba(230,0,35,.2)", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          <LogOut size={17} /> Chiqish
        </button>
      </Page>
    </>
  );
}
