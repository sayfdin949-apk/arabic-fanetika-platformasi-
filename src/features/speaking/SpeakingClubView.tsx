import { useState } from "react";
import { Mic, Calendar, Clock, Users, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";

interface SpeakingSession {
  id: number;
  mavzu: string;
  daraja: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  sana: string; // ISO
  vaqt: string; // "18:00"
  davomiylik: number; // daqiqa
  joylar: number;
  ustoz: string;
  icon: string;
  rang: string;
  tavsif: string;
}

interface MashqMavzu {
  id: number;
  mavzu: string;
  savol: string;
  daraja: string;
  rang: string;
}

const SESSIONLAR: SpeakingSession[] = [
  {
    id: 1,
    mavzu: "O'zingizni tanishtiring",
    daraja: "A1",
    sana: "2026-07-15",
    vaqt: "18:00",
    davomiylik: 45,
    joylar: 8,
    ustoz: "Ustoz Sardor",
    icon: "👋",
    rang: "#2563EB",
    tavsif: "Isminiz, yoshingiz, qiziqishlaringiz haqida arabcha gaplashing.",
  },
  {
    id: 2,
    mavzu: "Kun tartibi va vaqt",
    daraja: "A1",
    sana: "2026-07-17",
    vaqt: "19:00",
    davomiylik: 45,
    joylar: 8,
    ustoz: "Ustoz Kamola",
    icon: "🕐",
    rang: "#059669",
    tavsif: "Ertalabdan kechgacha kunlik tartibingiz haqida suhbat.",
  },
  {
    id: 3,
    mavzu: "Bozorda savdo-sotiq",
    daraja: "A2",
    sana: "2026-07-19",
    vaqt: "18:30",
    davomiylik: 60,
    joylar: 6,
    ustoz: "Ustoz Alisher",
    icon: "🛒",
    rang: "#CA8A04",
    tavsif: "Narx so'rash, kelishish, narsa tavsifi — amaliy suhbat.",
  },
  {
    id: 4,
    mavzu: "Oila va do'stlar",
    daraja: "A2",
    sana: "2026-07-22",
    vaqt: "17:00",
    davomiylik: 45,
    joylar: 10,
    ustoz: "Ustoz Sardor",
    icon: "👨‍👩‍👧",
    rang: "#DC2626",
    tavsif: "Oila a'zolari, qadrdonlar haqida arabcha tavsif.",
  },
  {
    id: 5,
    mavzu: "Sayohat va transport",
    daraja: "B1",
    sana: "2026-07-24",
    vaqt: "19:30",
    davomiylik: 60,
    joylar: 6,
    ustoz: "Ustoz Kamola",
    icon: "✈️",
    rang: "#7C3AED",
    tavsif: "Yo'l so'rash, transport vositalari, sayohat rejalari.",
  },
  {
    id: 6,
    mavzu: "Kasb va ish hayoti",
    daraja: "B1",
    sana: "2026-07-26",
    vaqt: "18:00",
    davomiylik: 60,
    joylar: 8,
    ustoz: "Ustoz Alisher",
    icon: "💼",
    rang: "#0891B2",
    tavsif: "Kasbingiz, ish joyi, kundalik vazifalar haqida muloqot.",
  },
];

const MASHQ_MAVZULAR: MashqMavzu[] = [
  { id: 1, mavzu: "Tanishuv", savol: "مَا اسْمُكَ؟ مِنْ أَيْنَ أَنْتَ؟ كَمْ عُمْرُكَ؟", daraja: "A1", rang: "#2563EB" },
  { id: 2, mavzu: "Oila tavsifi", savol: "كَمْ فَرْدًا فِي عَائِلَتِكَ؟ مَنْ هُمْ؟", daraja: "A1", rang: "#059669" },
  { id: 3, mavzu: "Yaxshi ko'rgan ovqatlar", savol: "مَا هُوَ طَعَامُكَ المُفَضَّل؟ لِمَاذَا؟", daraja: "A2", rang: "#CA8A04" },
  { id: 4, mavzu: "Kun tartibi", savol: "صِفْ يَوْمَكَ الاعتيادي مِنَ الصَّبَاح حَتَّى المَسَاء", daraja: "A2", rang: "#DC2626" },
  { id: 5, mavzu: "O'tgan hafta", savol: "مَاذَا فَعَلْتَ الأُسْبُوعَ المَاضِي؟ هَلْ كَانَ مُمْتِعًا؟", daraja: "B1", rang: "#7C3AED" },
  { id: 6, mavzu: "Kelajak rejalari", savol: "مَاذَا تُخَطِّطُ لِلمُسْتَقْبَل؟ مَا أَهْدَافُكَ؟", daraja: "B1", rang: "#0891B2" },
];

const regKey = (uid: string) => `afp:speaking_reg_${uid}`;

function loadReg(uid: string): Set<number> {
  try {
    const raw = localStorage.getItem(regKey(uid));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveReg(uid: string, set: Set<number>) {
  try { localStorage.setItem(regKey(uid), JSON.stringify([...set])); } catch { /* ignore */ }
}

function fmtSana(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("uz-UZ", { day: "numeric", month: "long", weekday: "long" });
}

const DARAJA_RANG: Record<string, string> = {
  A0: "#0891B2", A1: "#2563EB", A2: "#059669",
  B1: "#CA8A04", B2: "#DC2626", C1: "#7C3AED", C2: "#BE185D",
};

export function SpeakingClubView() {
  const { user } = useAuth();
  const [registered, setRegistered] = useState<Set<number>>(() => user ? loadReg(user.id) : new Set());
  const [tab, setTab] = useState<"jadval" | "mashq">("jadval");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleReg = (sid: number) => {
    if (!user) return;
    const updated = new Set(registered);
    if (updated.has(sid)) {
      updated.delete(sid);
      showToast("Ro'yxatdan o'chirildingiz");
    } else {
      updated.add(sid);
      showToast("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    }
    setRegistered(updated);
    saveReg(user.id, updated);
  };

  if (!user) return null;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Amaliyot</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <Mic size={18} color={T.limeBrt} />
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Speaking Club</div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            {registered.size} ta sessiyaga yozildingiz
          </div>
        </div>
      </div>

      {/* Tablar */}
      <div style={{ display: "flex", gap: 0, background: "#fff", borderBottom: "1px solid rgba(13,58,26,.08)" }}>
        {[
          { id: "jadval" as const, label: "Jadval", icon: <Calendar size={13} /> },
          { id: "mashq" as const, label: "Mustaqil mashq", icon: <MessageSquare size={13} /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "12px 0", border: "none", background: "transparent",
              borderBottom: tab === t.id ? `2px solid ${T.lime}` : "2px solid transparent",
              color: tab === t.id ? T.green : T.hint,
              fontSize: 13, fontWeight: tab === t.id ? 700 : 500, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "color .15s",
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "14px 14px 32px" }}>
        {/* Jadval tab */}
        {tab === "jadval" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, color: T.hint }}>
              Yaqinlashayotgan sessiyalar — ustoz bilan jonli arabcha suhbat
            </div>
            {SESSIONLAR.map((s) => {
              const isReg = registered.has(s.id);
              return (
                <div
                  key={s.id}
                  style={{
                    background: "#fff", borderRadius: 16, border: isReg ? `1.5px solid ${s.rang}50` : "1px solid rgba(13,58,26,.08)",
                    boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden",
                  }}
                >
                  {/* Top */}
                  <div style={{ background: `${s.rang}12`, padding: "14px 16px 10px", borderBottom: `1px solid ${s.rang}20` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{s.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{s.mavzu}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 10, fontWeight: 700, background: DARAJA_RANG[s.daraja], color: "#fff", borderRadius: 6, padding: "1px 7px" }}>{s.daraja}</span>
                          <span style={{ fontSize: 10, color: T.hint }}>{s.ustoz}</span>
                        </div>
                      </div>
                      {isReg && <CheckCircle2 size={18} color={T.lime} />}
                    </div>
                  </div>

                  <div style={{ padding: "12px 16px" }}>
                    <div style={{ fontSize: 11, color: T.text2, lineHeight: 1.5, marginBottom: 12 }}>{s.tavsif}</div>

                    {/* Meta */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.hint }}>
                        <Calendar size={11} />
                        {fmtSana(s.sana)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.hint }}>
                        <Clock size={11} />
                        {s.vaqt} ({s.davomiylik} daq)
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.hint }}>
                        <Users size={11} />
                        {s.joylar} joy
                      </div>
                    </div>

                    <button
                      onClick={() => handleReg(s.id)}
                      style={{
                        width: "100%", padding: "10px", borderRadius: 11, border: "none",
                        background: isReg ? "rgba(220,38,38,.08)" : `linear-gradient(135deg,${s.rang},${s.rang}cc)`,
                        color: isReg ? "#DC2626" : "#fff",
                        fontSize: 13, fontWeight: 700, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                      }}
                    >
                      {isReg ? "✕ Bekor qilish" : <><ChevronRight size={14} /> Ro'yxatdan o'tish</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mashq tab */}
        {tab === "mashq" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, color: T.hint }}>
              Savollarga arabcha javob bering — yozma yoki ovozli mashq uchun
            </div>
            {MASHQ_MAVZULAR.map((m) => (
              <div
                key={m.id}
                style={{
                  background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)",
                  boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden",
                }}
              >
                <div style={{ background: `${m.rang}12`, padding: "12px 16px 10px", borderBottom: `1px solid ${m.rang}20` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{m.mavzu}</div>
                    <span style={{ fontSize: 10, fontWeight: 700, background: DARAJA_RANG[m.daraja] ?? m.rang, color: "#fff", borderRadius: 6, padding: "1px 7px" }}>{m.daraja}</span>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ textAlign: "right", background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(13,58,26,.08)", fontFamily: '"Sakkal Majalla","Traditional Arabic","Noto Naskh Arabic",serif', fontSize: 20, color: T.green, lineHeight: 1.8, direction: "rtl" }}>
                    {m.savol}
                  </div>
                  <div style={{ fontSize: 11, color: T.hint, marginTop: 10, display: "flex", alignItems: "center", gap: 5 }}>
                    <Mic size={11} />
                    Ushbu savolga arabcha javob berishni mashq qiling
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
          background: T.green, color: "#fff", borderRadius: 20, padding: "10px 18px",
          fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          zIndex: 100, whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
