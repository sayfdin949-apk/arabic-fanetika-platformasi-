import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, Clock, Lock, AlertTriangle, Coins } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";

type TolovStatus = "trial" | "active" | "blocked";

interface TolovMalumat {
  status: TolovStatus;
  trialdarslar: number; // necha dars o'tildi (trial da)
  keyingioyliklTolov?: string; // ISO
  summа?: number; // UZS
  tarif?: string;
}

const TRIAL_DARS_CHEGARASI = 3;
const TARIF_NARXLARI = [
  { id: "asosiy", nom: "Asosiy", narx: 250000, tavsif: "Barcha darslar, chat, yo'l xaritasi", rang: T.green },
  { id: "premium", nom: "Premium", narx: 450000, tavsif: "Asosiy + video darslar + yordamchi ustoz", rang: "#7C3AED" },
  { id: "elite", nom: "Elite", narx: 700000, tavsif: "Premium + speaking club + mock test", rang: "#CA8A04" },
];

const tolovKey = (uid: string) => `afp:tolov_${uid}`;

function loadTolov(uid: string): TolovMalumat {
  try {
    const raw = localStorage.getItem(tolovKey(uid));
    return raw ? JSON.parse(raw) : { status: "trial", trialdarslar: 0 };
  } catch { return { status: "trial", trialdarslar: 0 }; }
}

export function TolovView() {
  const { user } = useAuth();
  const [malumat, setMalumat] = useState<TolovMalumat>({ status: "trial", trialdarslar: 0 });
  const [selectedTarif, setSelectedTarif] = useState("asosiy");
  const [selectedUsul, setSelectedUsul] = useState<"payme" | "click" | "uzcard">("payme");
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) setMalumat(loadTolov(user.id));
  }, [user?.id]);

  const tarif = TARIF_NARXLARI.find((t) => t.id === selectedTarif) ?? TARIF_NARXLARI[0];

  const handleTolov = () => {
    if (!user) return;
    setProcessing(true);
    // Haqiqiy to'lov integratsiyasida bu yerda Payme/Click API chaqiriladi
    setTimeout(() => {
      const updated: TolovMalumat = {
        ...malumat,
        status: "active",
        keyingioyliklTolov: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        summа: tarif.narx,
        tarif: tarif.id,
      };
      setMalumat(updated);
      try { localStorage.setItem(tolovKey(user.id), JSON.stringify(updated)); } catch { /* ignore */ }
      setProcessing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const statusColor = malumat.status === "active" ? T.lime : malumat.status === "blocked" ? "#DC2626" : "#F59E0B";
  const statusLabel = malumat.status === "active" ? "Faol" : malumat.status === "blocked" ? "Bloklangan" : "Sinov rejimi";
  const StatusIcon = malumat.status === "active" ? CheckCircle2 : malumat.status === "blocked" ? Lock : Clock;

  const nextDate = malumat.keyingioyliklTolov
    ? new Date(malumat.keyingioyliklTolov).toLocaleDateString("uz-UZ", { day: "numeric", month: "long" })
    : null;

  const fmtNarx = (n: number) => new Intl.NumberFormat("uz-UZ").format(n) + " so'm";

  // Ichki komponent: to'lov usuli tugmasi
  const UsulBtn = ({ id, label, logo }: { id: typeof selectedUsul; label: string; logo: string }) => (
    <button
      onClick={() => setSelectedUsul(id)}
      style={{
        flex: 1, padding: "10px 8px", borderRadius: 10,
        border: selectedUsul === id ? `2px solid ${T.lime}` : "1px solid rgba(13,58,26,.15)",
        background: selectedUsul === id ? "rgba(46,184,46,.07)" : "#fff",
        cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      }}
    >
      <span style={{ fontSize: 22 }}>{logo}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{label}</span>
    </button>
  );

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
            {nextDate && (
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>· {nextDate} gacha</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Trial holat */}
        {malumat.status === "trial" && (
          <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AlertTriangle size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 3 }}>Sinov rejimida</div>
              <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.5 }}>
                Siz hozir <b>{malumat.trialdarslar}/{TRIAL_DARS_CHEGARASI}</b> ta bepul darsdan foydalanmoqdasiz.
                {TRIAL_DARS_CHEGARASI - malumat.trialdarslar} ta dars qolgandan so'ng to'lov qilishingiz kerak.
              </div>
            </div>
          </div>
        )}

        {/* Bloklangan holat */}
        {malumat.status === "blocked" && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Lock size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#991B1B", marginBottom: 3 }}>Ilova bloklangan</div>
              <div style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5 }}>
                3 ta sinov darsi tugadi. Davom etish uchun quyida to'lov qiling.
              </div>
            </div>
          </div>
        )}

        {/* Faol obuna */}
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
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                  type="radio"
                  name="tarif"
                  value={t.id}
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
        </div>

        {/* To'lov usuli */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 12 }}>To'lov usuli</div>
          <div style={{ display: "flex", gap: 8 }}>
            <UsulBtn id="payme" label="Payme" logo="🔵" />
            <UsulBtn id="click" label="Click" logo="🟠" />
            <UsulBtn id="uzcard" label="UzCard" logo="🟢" />
          </div>
          <div style={{ fontSize: 11, color: T.hint, marginTop: 8, display: "flex", alignItems: "center", gap: 5 }}>
            <CreditCard size={11} />
            To'lov xavfsiz shifrlangan kanal orqali amalga oshiriladi
          </div>
        </div>

        {/* Jami va to'lov tugmasi */}
        <div style={{ background: T.gGreen, borderRadius: 16, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>Jami to'lov:</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{fmtNarx(tarif.narx)}</span>
            </div>
            <button
              onClick={handleTolov}
              disabled={processing || showSuccess}
              style={{
                width: "100%", padding: "14px", borderRadius: 12, border: "none",
                background: showSuccess ? T.gLime : "rgba(255,255,255,.15)",
                color: showSuccess ? T.onCta : "#fff",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "background .2s",
              }}
            >
              {showSuccess
                ? "✓ To'lov muvaffaqiyatli!"
                : processing
                ? "To'lov amalga oshirilmoqda…"
                : `${selectedUsul === "payme" ? "Payme" : selectedUsul === "click" ? "Click" : "UzCard"} orqali to'lash`}
            </button>
          </div>
        </div>

        <div style={{ fontSize: 11, color: T.hint, textAlign: "center", lineHeight: 1.5 }}>
          To'lov qilish orqali foydalanish shartlari va maxfiylik siyosatiga rozilik bildirasiz.
        </div>
      </div>
    </div>
  );
}
