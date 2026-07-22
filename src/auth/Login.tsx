import { useState, useEffect, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, UserCheck, Send, XCircle, Eye, EyeOff, Copy, Check, Hash } from "lucide-react";
import { T, FONT } from "../theme/tokens";
import { useAuth } from "./AuthContext";
import { isTelegramMiniApp, getTelegramUser, getTelegramInitData, initTelegramApp } from "../lib/telegram";

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [parol, setParol] = useState("");
  const [showParol, setShowParol] = useState(false);
  const [err, setErr] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentErr, setStudentErr] = useState("");
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
    const initData = getTelegramInitData();
    if (!tgUser || !initData) return;
    (async () => {
      const u = await auth.loginWithTelegram(initData);
      if (u) {
        navigate("/", { replace: true });
      } else {
        // tgUser.id bu yerda FAQAT ekranda ko'rsatish uchun ishlatiladi
        // (tasdiqlanmagan) — kirish qarori serverda HMAC orqali tasdiqlangan
        // initData asosida qabul qilinadi.
        setTgNotFound(tgUser.id);
      }
    })();
  }, [auth.ready, tgChecked]);

  const tryLogin = async () => {
    const roles = ["ceo", "teacher", "assistant"] as const;
    for (const role of roles) {
      const u = await auth.login(login, parol, role);
      if (u) { navigate("/", { replace: true }); return; }
    }
    setErr("Login yoki parol xato!");
  };

  const tryStudentLogin = async () => {
    const id = studentId.trim();
    if (!id) { setStudentErr("ID ni kiriting"); return; }
    const u = await auth.loginStudentById(id);
    if (u) { navigate("/", { replace: true }); return; }
    setStudentErr("Bunday ID li o'quvchi topilmadi");
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
    padding: "32px 16px 40px",
  };

  const ceoBox = (
    <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <UserCheck size={18} color={T.onCta} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Login va parol bilan kirish</div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 4 }}>Login</label>
        <input
          value={login}
          onChange={(e) => { setLogin(e.target.value); setErr(""); }}
          onKeyDown={(e) => e.key === "Enter" && tryLogin()}
          placeholder="login"
          style={inp}
        />
      </div>

      <div style={{ marginBottom: err ? 6 : 14 }}>
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
        <div style={{ fontSize: 12, color: "#ff8a95", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
          <XCircle size={12} /> {err}
        </div>
      )}

      <button
        onClick={tryLogin}
        style={{ width: "100%", background: T.gLime, border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", fontSize: 14, fontWeight: 700, color: T.onCta, boxShadow: "0 4px 14px rgba(46,184,46,.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <UserCheck size={17} /> Kirish
      </button>
    </div>
  );

  /* ── Telegram topilmadi ekrani ── */
  if (tgNotFound !== null) {
    return (
      <div style={page}>
        <div style={{ position: "fixed", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, width: 360, maxWidth: "100%", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <Send size={30} color="#fff" />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Foydalanuvchi topilmadi</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginBottom: 24, lineHeight: 1.6 }}>
            Telegram hisobingiz platformaga ulanmagan. Quyidagi ID ni mas'ul shaxsga yuboring — u sizni tizimga qo'shadi.
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
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.6, marginBottom: 24 }}>
            ID ni mas'ul shaxsga yuboring. U sizning kartangizga ID ni kiritadi. Keyin ilovani qayta oching.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.15)" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 600, letterSpacing: ".05em" }}>YOKI</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.15)" }} />
          </div>

          <div style={{ textAlign: "left" }}>{ceoBox}</div>
        </div>
      </div>
    );
  }

  /* ── Asosiy ekran ── */
  return (
    <div style={page}>
      <div style={{ position: "fixed", inset: 0, background: T.sheen, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, width: 400, maxWidth: "100%" }}>

        {/* Logo + sarlavha */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 4px 16px rgba(13,58,26,.4)" }}>
            <BookOpen size={26} color={T.onCta} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-.015em" }}>Arab Fonetika Kursi</div>
          <div style={{ width: 60, height: 4, background: T.gLimeH, borderRadius: 2, margin: "10px auto 0" }} />
        </div>

        {/* ── O'quvchi kirishi ── */}
        <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 16, padding: 18, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(41,182,246,.25)", border: "1px solid rgba(41,182,246,.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Hash size={18} color="#7dd3fc" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>O'quvchi kirishi</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>Telegram ID raqamingizni kiriting</div>
            </div>
          </div>
          <input
            value={studentId}
            onChange={(e) => { setStudentId(e.target.value); setStudentErr(""); }}
            onKeyDown={(e) => e.key === "Enter" && tryStudentLogin()}
            placeholder="Telegram ID (masalan: 123456789)"
            inputMode="numeric"
            style={inp}
          />
          {studentErr && (
            <div style={{ fontSize: 12, color: "#ff8a95", margin: "6px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
              <XCircle size={12} /> {studentErr}
            </div>
          )}
          <button
            onClick={tryStudentLogin}
            style={{ width: "100%", marginTop: 10, background: "rgba(41,182,246,.3)", border: "1px solid rgba(41,182,246,.5)", borderRadius: 10, padding: "12px", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <Send size={16} /> Kirish
          </button>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 8, textAlign: "center" }}>
            ID ni bilmasangiz — Telegram botni oching, u sizning ID raqamingizni ko'rsatadi
          </div>
        </div>

        {/* Ajratuvchi */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.15)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 600, letterSpacing: ".05em" }}>ADMIN</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.15)" }} />
        </div>

        {/* ── Boshqaruv (CEO) bo'limi ── */}
        {ceoBox}

        {/* Versiya — support uchun */}
        <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 16 }}>
          versiya {__APP_VERSION__}
        </div>
      </div>
    </div>
  );
}
