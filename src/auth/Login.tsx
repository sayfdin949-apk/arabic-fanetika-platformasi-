import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, UserCheck, GraduationCap, ChevronLeft, XCircle, Eye, EyeOff } from "lucide-react";
import { T, FONT } from "../theme/tokens";
import { useAuth } from "./AuthContext";
import type { Role } from "./types";

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [login, setLogin] = useState("");
  const [parol, setParol] = useState("");
  const [showParol, setShowParol] = useState(false);
  const [err, setErr] = useState("");

  const tryLogin = () => {
    if (!role) return;
    const u = auth.login(login, parol, role);
    if (u) navigate("/", { replace: true });
    else setErr("Login yoki parol xato!");
  };

  const inp: CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,.1)",
    border: "1px solid rgba(255,255,255,.2)",
    borderRadius: 10,
    padding: "10px 13px",
    color: "#fff",
    fontSize: 13,
    outline: "none",
    fontFamily: FONT,
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: T.meshHero,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
        padding: 16,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, width: 380, maxWidth: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: T.gLime,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0 4px 16px rgba(13,58,26,.4)",
            }}
          >
            <BookOpen size={24} color={T.onCta} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-.015em" }}>
            Arab Fonetika Kursi
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Kirish uchun rolni tanlang</div>
          <div style={{ width: 78, height: 5, background: T.gLimeH, borderRadius: 3, margin: "12px auto 0" }} />
        </div>

        {!role ? (
          <div style={{ display: "flex", gap: 12 }}>
            {(
              [
                { r: "teacher", ic: <UserCheck size={26} />, t: "O'qituvchi", s: "To'liq kirish" },
                { r: "student", ic: <GraduationCap size={26} />, t: "O'quvchi", s: "Darslar" },
              ] as const
            ).map((o) => (
              <button
                key={o.r}
                onClick={() => {
                  setRole(o.r);
                  setErr("");
                }}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,.1)",
                  border: "1px solid rgba(255,255,255,.18)",
                  borderRadius: 14,
                  padding: "20px 12px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: T.gLime,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.onCta,
                  }}
                >
                  {o.ic}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{o.t}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>{o.s}</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 14, padding: 20 }}>
            <button
              onClick={() => setRole(null)}
              style={{
                background: "rgba(255,255,255,.1)",
                border: "none",
                borderRadius: 7,
                padding: "4px 9px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "rgba(255,255,255,.7)",
                fontSize: 11,
                marginBottom: 13,
              }}
            >
              <ChevronLeft size={12} />
              Orqaga
            </button>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 14 }}>
              {role === "teacher" ? "O'qituvchi kirishi" : "O'quvchi kirishi"}
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 4 }}>Login</label>
              <input
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  setErr("");
                }}
                onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                placeholder={role === "teacher" ? "ustoz" : "abdulloh, yusuf..."}
                style={inp}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 4 }}>Parol</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showParol ? "text" : "password"}
                  value={parol}
                  onChange={(e) => {
                    setParol(e.target.value);
                    setErr("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                  placeholder="••••"
                  style={{ ...inp, paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowParol((p) => !p)}
                  style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.6)", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30 }}
                  aria-label={showParol ? "Yashirish" : "Ko'rsatish"}
                >
                  {showParol ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {err && (
              <div style={{ fontSize: 12, color: "#ff8a95", marginBottom: 9, display: "flex", alignItems: "center", gap: 4 }}>
                <XCircle size={12} />
                {err}
              </div>
            )}
            <button
              onClick={tryLogin}
              style={{
                width: "100%",
                background: T.gLime,
                border: "none",
                borderRadius: 10,
                padding: "11px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: T.onCta,
                marginTop: 5,
                boxShadow: "0 2px 8px rgba(46,184,46,.4)",
              }}
            >
              Kirish
            </button>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textAlign: "center", marginTop: 10 }}>
              {role === "teacher" ? "ustoz / 1234" : "abdulloh / 1234  •  yusuf / 1234  •  mariya / 1234"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
