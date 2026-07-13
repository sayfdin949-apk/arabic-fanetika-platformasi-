import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, Clock, Lock, AlertTriangle, Copy, Check, Send, Coins } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { store } from "../../lib/storage";

type TolovStatus = "trial" | "pending" | "active" | "blocked";

interface TolovMalumat {
  status: TolovStatus;
  trialdarslar: number;
  keyingioyliklTolov?: string;
  summа?: number;
  tarif?: string;
}

const TRIAL_DARS_CHEGARASI = 3;
const TARIF_NARXLARI = [
  { id: "asosiy",  nom: "Asosiy",  narx: 250_000, tavsif: "Barcha darslar, chat, yo'l xaritasi",               rang: T.green  },
  { id: "premium", nom: "Premium", narx: 450_000, tavsif: "Asosiy + video darslar + yordamchi ustoz",           rang: "#7C3AED" },
  { id: "elite",   nom: "Elite",   narx: 700_000, tavsif: "Premium + speaking club + mock test",                rang: "#CA8A04" },
];

// Bank karta ma'lumotlari (CEO o'zgartirishi mumkin)
const BANK_KARTA  = "8600 0000 0000 0000";
const BANK_EGASI  = "Rahimov Ozodbek";
const BANK_NOMI   = "Uzcard";
const TG_USERNAME = "arabic_fanetika_tolov"; // Telegram username

const tolovKey = (uid: string) => `afp:tolov_${uid}`;

function loadTolov(uid: string): TolovMalumat {
  try {
    const raw = localStorage.getItem(tolovKey(uid));
    return raw ? JSON.parse(raw) : { status: "trial", trialdarslar: 0 };
  } catch { return { status: "trial", trialdarslar: 0 }; }
}

function saveTolov(uid: string, d: TolovMalumat) {
  try { localStorage.setItem(tolovKey(uid), JSON.stringify(d)); } catch { /* ignore */ }
  void store.set(`tolov_${uid}`, d);
}

function openTelegram(tarif: string, narx: number) {
  const msg = encodeURIComponent(
    `Salom! To'lov amalga oshirdim.\nTarif: ${tarif}\nSumma: ${narx.toLocaleString()} so'm\nTo'lovni tasdiqlang.`
  );
  const tg = (window.Telegram?.WebApp) as { openLink?: (u: string) => void } | undefined;
  const url = `https://t.me/${TG_USERNAME}?text=${msg}`;
  if (tg?.openLink) tg.openLink(url);
  else window.open(url, "_blank", "noopener,noreferrer");
}

export function TolovView() {
  const { user } = useAuth();
  const [malumat, setMalumat] = useState<TolovMalumat>({ status: "trial", trialdarslar: 0 });
  const [selectedTarif, setSelectedTarif] = useState("asosiy");
  const [copied, setCopied] = useState(false);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    if (user) setMalumat(loadTolov(user.id));
  }, [user?.id]);

  const tarif = TARIF_NARXLARI.find((t) => t.id === selectedTarif) ?? TARIF_NARXLARI[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BANK_KARTA.replace(/\s/g, ""));
    } catch {
      const el = document.createElement("textarea");
      el.value = BANK_KARTA.replace(/\s/g, "");
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTolovQildim = () => {
    if (!user) return;
    const updated: TolovMalumat = { ...malumat, status: "pending", summа: tarif.narx, tarif: tarif.id };
    setMalumat(updated);
    saveTolov(user.id, updated);
    setShowPending(true);
    openTelegram(tarif.nom, tarif.narx);
    setTimeout(() => setShowPending(false), 5000);
  };

  const statusColor = malumat.status === "active" ? T.lime
    : malumat.status === "pending" ? "#0891B2"
    : malumat.status === "blocked" ? "#DC2626" : "#F59E0B";

  const statusLabel = malumat.status === "active" ? "Faol"
    : malumat.status === "pending" ? "Kutilmoqda"
    : malumat.status === "blocked" ? "Bloklangan" : "Sinov rejimi";

  const StatusIcon = malumat.status === "active" ? CheckCircle2
    : malumat.status === "pending" ? Clock
    : malumat.status === "blocked" ? Lock : AlertTriangle;

  const nextDate = malumat.keyingioyliklTolov
    ? new Date(malumat.keyingioyliklTolov).toLocaleDateString("uz-UZ", { day: "numeric", month: "long" })
    : null;

  const fmtNarx = (n: number) => new Intl.NumberFormat("uz-UZ").format(n) + " so'm";

  if (!user) return null;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Hisob</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>To'lov va obuna</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 10, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "8px 12px" }}>
            <StatusIcon size={14} color={statusColor} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{statusLabel}</span>
            {nextDate && <span style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>· {nextDate} gacha</span>}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Holat banners */}
        {malumat.status === "trial" && (
          <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AlertTriangle size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 3 }}>Sinov rejimida</div>
              <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.5 }}>
                <b>{malumat.trialdarslar}/{TRIAL_DARS_CHEGARASI}</b> bepul darsdan foydalanmoqdasiz.
                Quyida to'lov qiling va faollashtiring.
              </div>
            </div>
          </div>
        )}

        {malumat.status === "pending" && (
          <div style={{ background: "#EFF6FF", border: "1px solid #93C5FD", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Clock size={18} color="#0891B2" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1E3A5F", marginBottom: 3 }}>To'lov tekshirilmoqda</div>
              <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>
                Telegram orqali administrator bilan bog'landingiz. Tasdiqlangandan so'ng obuna faollashadi.
              </div>
            </div>
          </div>
        )}

        {malumat.status === "blocked" && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Lock size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#991B1B", marginBottom: 3 }}>Ilova bloklangan</div>
              <div style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5 }}>
                Sinov darsi tugadi. Davom etish uchun quyida to'lov qiling.
              </div>
            </div>
          </div>
        )}

        {malumat.status === "active" && (
          <div style={{ background: "rgba(46,184,46,.07)", border: "1px solid rgba(46,184,46,.3)", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 10, alignItems: "center" }}>
            <CheckCircle2 size={20} color={T.lime} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Obuna faol</div>
              <div style={{ fontSize: 12, color: T.text2 }}>
                Tarif: <b>{TARIF_NARXLARI.find((t) => t.id === malumat.tarif)?.nom ?? "Asosiy"}</b>
                {nextDate && ` · ${nextDate} gacha`}
              </div>
            </div>
            <Coins size={16} color={T.lime} />
          </div>
        )}

        {/* Tarif tanlash */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(13,58,26,.06)", background: "rgba(13,58,26,.02)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Tarif rejasi</div>
          </div>
          {TARIF_NARXLARI.map((t, i) => (
            <label
              key={t.id}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                borderBottom: i < TARIF_NARXLARI.length - 1 ? "1px solid rgba(13,58,26,.06)" : "none",
                cursor: "pointer",
                background: selectedTarif === t.id ? `${t.rang}08` : "transparent",
              }}
            >
              <input
                type="radio" name="tarif" value={t.id}
                checked={selectedTarif === t.id}
                onChange={() => setSelectedTarif(t.id)}
                style={{ accentColor: t.rang, width: 16, height: 16 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{t.nom}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.rang }}>{fmtNarx(t.narx)}/oy</span>
                </div>
                <div style={{ fontSize: 11, color: T.hint }}>{t.tavsif}</div>
              </div>
              {t.id === "premium" && (
                <span style={{ fontSize: 9, fontWeight: 700, background: t.rang, color: "#fff", padding: "2px 7px", borderRadius: 10 }}>OMMABOP</span>
              )}
            </label>
          ))}
        </div>

        {/* Bank karta ma'lumotlari */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", padding: "16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 14 }}>Bank karta ma'lumotlari</div>

          {/* Karta vizual */}
          <div style={{ background: T.gGreen, borderRadius: 14, padding: "16px 18px", position: "relative", overflow: "hidden", marginBottom: 14 }}>
            <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginBottom: 6 }}>{BANK_NOMI}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: 2, fontVariantNumeric: "tabular-nums", marginBottom: 8 }}>
                {BANK_KARTA}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)", fontWeight: 600 }}>{BANK_EGASI}</div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            style={{
              width: "100%", padding: "11px", borderRadius: 10, border: `1px solid rgba(13,58,26,.12)`,
              background: copied ? "rgba(46,184,46,.07)" : "rgba(13,58,26,.03)",
              color: copied ? T.lime : T.green,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              transition: "all .2s",
            }}
          >
            {copied ? <><Check size={14} /> Nusxa olindi!</> : <><Copy size={14} /> Karta raqamini nusxa olish</>}
          </button>

          <div style={{ marginTop: 10, fontSize: 11, color: T.hint, lineHeight: 1.6 }}>
            <b>Qanday to'lash:</b> Ushbu karta raqamiga <b>{fmtNarx(tarif.narx)}</b> o'tkazing, so'ng quyidagi tugmani bosing.
          </div>
        </div>

        {/* Telegram tasdiqlash */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={handleTolovQildim}
            disabled={malumat.status === "active"}
            style={{
              width: "100%", padding: "14px", borderRadius: 14, border: "none",
              background: malumat.status === "active" ? "rgba(13,58,26,.08)" : T.gGreen,
              color: malumat.status === "active" ? T.hint : "#fff",
              fontSize: 14, fontWeight: 700, cursor: malumat.status === "active" ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <Send size={16} />
              {malumat.status === "active" ? "Obuna faol" : "To'lov amalga oshirdim"}
            </span>
          </button>

          {showPending && (
            <div style={{ background: "#EFF6FF", border: "1px solid #93C5FD", borderRadius: 12, padding: "12px 14px", fontSize: 12, color: "#1E3A5F", display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={14} color="#0891B2" />
              Telegram ochildi. Xabar yuborgandan so'ng administrator tasdiqlaydi.
            </div>
          )}

          <div style={{ fontSize: 11, color: T.hint, textAlign: "center", lineHeight: 1.5 }}>
            <CreditCard size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
            To'lov Telegram orqali administrator tomonidan tasdiqlanadi
          </div>
        </div>
      </div>
    </div>
  );
}
