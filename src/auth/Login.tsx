import { useState, useEffect, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, UserCheck, Send, ChevronLeft, XCircle, Eye, EyeOff, Copy, Check } from "lucide-react";
import { T, FONT } from "../theme/tokens";
import { useAuth } from "./AuthContext";
import { isTelegramMiniApp, getTelegramUser, initTelegramApp } from "../lib/telegram";

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showTeacher, setShowTeacher] = useState(false);
  const [login, setLogin] = useState("");
  const [parol, setParol] = useState("");
  const [showParol, setShowParol] = useState(false);
  const [err, setErr] = useState("");
  const [tgNotFound, setTgNotFound] = useState<number | null>(null);
  const [tgChecked, setTgChecked] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyId = (id: number) => {
    navigator.clipboard.writeText(String(id)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (!auth.ready || tgChecked) return;
    setTgChecked(true);
    if (!isTelegramMiniApp()) return;
    initTelegramApp();
    const tgUser = getTelegramUser();
    if (!tgUser) return;
    const u = auth.loginWithTelegram(tgUser.id);
    if (u) {
      navigate("/", { replace: true });
    } else {
      setTgNotFound(tgUser.id);
    }
  }, [auth.ready, tgChecked]);

  const tryLogin = () => {
    const u = auth.login(login, parol, "teacher");
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

  const wrap: CSSProperties = {
    minHeight: "100dvh",
    background: T.meshHero,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONT,
    position: "relative",
    overflow: "hidden",
    padding: 16,
  };

  /* ── Telegram topilmadi ekrani ── */
  if (tgNotFound !== null) {
    return (
      <div style={wrap}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, width: 360, maxWidth: "100%", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <Send size={30} color="#fff" />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Foydalanuvchi topilmadi</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginBottom: 24, lineHeight: 1.6 }}>
            Telegram hisobingiz platformaga ulanmagan. Quyidagi ID ni o'qituvchiga yuboring — u sizni tizimga qo'shadi.
          </div>
          <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>Sizning Telegram ID</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: T.limeBrt, letterSpacing: ".04em" }}>{tgNotFound}</div>
              <button
                onClick={() => copyId(tgNotFound)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: copied ? "rgba(106,239,90,.25)" : "rgba(255,255,255,.12)",
                  border: `1px solid ${copied ? "rgba(106,239,90,.5)" : "rgba(255,255,255,.2)"}`,
                  borderRadius: 10, padding: "8px 14px",
                  color: copied ? T.limeBrt : "rgba(255,255,255,.8)",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  transition: "all .2s",
                  flexShrink: 0,
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Nusxalandi!" : "Nusxalash"}
              </button>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
            ID ni ustozga yuboring. U "O'quvchilar" bo'limida sizning kartangizga ID ni kiritadi. Keyin ilovani qayta oching.
          </div>
        </div>
      </div>
    );
  }

  /* ── Asosiy ekran ── */
  return (
    <div style={wrap}>
      <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, width: 380, maxWidth: "100%" }}>

        {/* Logo + sarlavha */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 4px 16px rgba(13,58,26,.4)" }}>
            <BookOpen size={26} color={T.onCta} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-.015em" }}>Arab Fonetika Kursi</div>
          <div style={{ width: 60, height: 4, background: T.gLimeH, borderRadius: 2, margin: "10px auto 0" }} />
        </div>

        {!showTeacher ? (
          /* ── Rol tanlash ── */
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* O'quvchi kartasi */}
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(41,182,246,.25)", border: "1px solid rgba(41,182,246,.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Send size={22} color="#7dd3fc" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>O'quvchi</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 2 }}>Telegram orqali kirish</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 16 }}>
                O'quvchilar Telegram bot orqali kiradi — parol talab qilinmaydi. Botni ochib, "Ilovani ochish" tugmasini bosing.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { n: "1", t: "Telegram botini oching" },
                  { n: "2", t: "«Ilovani ochish» tugmasini bosing" },
                  { n: "3", t: "Avtomatik kiriladi" },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(41,182,246,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#7dd3fc", flexShrink: 0 }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>{s.t}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* O'qituvchi tugmasi */}
            <button
              onClick={() => setShowTeacher(true)}
              style={{ width: "100%", background: T.gLime, border: "none", borderRadius: 14, padding: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: T.onCta, fontSize: 14, fontWeight: 700, boxShadow: "0 4px 14px rgba(46,184,46,.35)" }}
            >
              <UserCheck size={18} />
              O'qituvchi kirishi
            </button>
          </div>
        ) : (
          /* ── O'qituvchi login formasi ── */
          <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 14, padding: 20 }}>
            <button
              onClick={() => { setShowTeacher(false); setErr(""); setLogin(""); setParol(""); }}
              style={{ background: "rgba(255,255,255,.1)", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,.7)", fontSize: 11, marginBottom: 14 }}
            >
              <ChevronLeft size={12} /> Orqaga
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserCheck size={18} color={T.onCta} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>O'qituvchi kirishi</div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 4 }}>Login</label>
              <input
                value={login}
                onChange={(e) => { setLogin(e.target.value); setErr(""); }}
                onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                placeholder="ustoz"
                style={inp}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 4 }}>Parol</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showParol ? "text" : "password"}
                  value={parol}
                  onChange={(e) => { setParol(e.target.value); setErr(""); }}
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
                <XCircle size={12} /> {err}
              </div>
            )}
            <button
              onClick={tryLogin}
              style={{ width: "100%", background: T.gLime, border: "none", borderRadius: 10, padding: "11px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: T.onCta, marginTop: 5, boxShadow: "0 2px 8px rgba(46,184,46,.4)" }}
            >
              Kirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
