import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, UserCheck, XCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { T, FONT } from "../theme/tokens";
import { useAuth } from "./AuthContext";
import { supabase, isSupabaseMode, loginToEmail } from "../lib/supabaseClient";

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [parol, setParol] = useState("");
  const [showParol, setShowParol] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotErr, setForgotErr] = useState("");

  const tryLogin = async () => {
    if (!login.trim() || !parol) { setErr("Login/email va parolni kiriting"); return; }
    setBusy(true);
    setErr("");
    try {
      const u = await auth.login(login.trim(), parol);
      if (u) { navigate("/", { replace: true }); return; }
      setErr("Login yoki parol xato!");
    } finally {
      setBusy(false);
    }
  };

  const sendResetEmail = async () => {
    if (!isSupabaseMode || !supabase) {
      setForgotErr("Bu funksiya faqat onlayn rejimda ishlaydi");
      return;
    }
    if (!login.trim()) { setForgotErr("Avval login/email kiriting"); return; }
    setForgotErr("");
    const { error } = await supabase.auth.resetPasswordForEmail(loginToEmail(login));
    if (error) { setForgotErr(error.message); return; }
    setForgotSent(true);
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

  const page: CSSProperties = {
    minHeight: "100dvh",
    background: T.meshHero,
    fontFamily: FONT,
    position: "relative",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px 40px",
  };

  return (
    <div style={page}>
      <div style={{ position: "fixed", inset: 0, background: T.sheen, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, width: 380, maxWidth: "100%" }}>
        {/* Logo + sarlavha */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 4px 16px rgba(13,58,26,.4)" }}>
            <BookOpen size={26} color={T.onCta} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-.015em" }}>Arab Fonetika Kursi</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 6 }}>Xush kelibsiz</div>
          <div style={{ width: 60, height: 4, background: T.gLimeH, borderRadius: 2, margin: "10px auto 0" }} />
        </div>

        <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: 20 }}>
          {!forgotOpen ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <UserCheck size={18} color={T.onCta} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Kirish</div>
              </div>

              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 4 }}>Login yoki email</label>
                <input
                  value={login}
                  onChange={(e) => { setLogin(e.target.value); setErr(""); }}
                  onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                  placeholder="login"
                  autoComplete="username"
                  style={inp}
                />
              </div>

              <div style={{ marginBottom: err ? 6 : 10 }}>
                <label style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 4 }}>Parol</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showParol ? "text" : "password"}
                    value={parol}
                    onChange={(e) => { setParol(e.target.value); setErr(""); }}
                    onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                    placeholder="••••"
                    autoComplete="current-password"
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

              <div style={{ textAlign: "right", marginBottom: err ? 6 : 14 }}>
                <button
                  type="button"
                  onClick={() => { setForgotOpen(true); setForgotSent(false); setForgotErr(""); }}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,.55)", fontSize: 11, cursor: "pointer", padding: 0 }}
                >
                  Parolni unutdim?
                </button>
              </div>

              {err && (
                <div style={{ fontSize: 12, color: "#ff8a95", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                  <XCircle size={12} /> {err}
                </div>
              )}

              <button
                onClick={tryLogin}
                disabled={busy}
                style={{ width: "100%", background: T.gLime, border: "none", borderRadius: 10, padding: "13px", cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1, fontSize: 14, fontWeight: 700, color: T.onCta, boxShadow: "0 4px 14px rgba(46,184,46,.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <UserCheck size={17} /> {busy ? "Tekshirilmoqda…" : "Kirish"}
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Parolni tiklash</div>
              {forgotSent ? (
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.85)", display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.5 }}>
                  <CheckCircle2 size={18} color={T.limeBrt} style={{ flexShrink: 0, marginTop: 1 }} />
                  Parolni tiklash havolasi yuborildi. Emailingizni tekshiring.
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 12 }}>
                    Login yoki emailingizni kiriting — tiklash havolasi yuboriladi.
                  </div>
                  <input
                    value={login}
                    onChange={(e) => { setLogin(e.target.value); setForgotErr(""); }}
                    placeholder="login"
                    style={{ ...inp, marginBottom: 10 }}
                  />
                  {forgotErr && (
                    <div style={{ fontSize: 12, color: "#ff8a95", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                      <XCircle size={12} /> {forgotErr}
                    </div>
                  )}
                  <button
                    onClick={sendResetEmail}
                    style={{ width: "100%", background: T.gLime, border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontSize: 14, fontWeight: 700, color: T.onCta }}
                  >
                    Havola yuborish
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setForgotOpen(false)}
                style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "rgba(255,255,255,.55)", fontSize: 12, cursor: "pointer", padding: 6 }}
              >
                ← Kirish sahifasiga qaytish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
