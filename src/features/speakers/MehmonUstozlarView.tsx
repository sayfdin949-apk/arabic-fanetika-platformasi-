import { useState } from "react";
import { UserCheck, Globe, Calendar, Clock, Star, ChevronRight, CheckCircle2, Play, ExternalLink } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";

const MEHMON_TG = "arabic_mehmon_ustozlar";

function openLink(url: string) {
  const tg = (window.Telegram?.WebApp) as { openLink?: (u: string) => void } | undefined;
  if (tg?.openLink) tg.openLink(url);
  else window.open(url, "_blank", "noopener,noreferrer");
}

interface MehmonUstoz {
  id: number;
  ism: string;
  unvon: string;
  mamlakat: string;
  ixtisoslashuv: string[];
  tarjimayi_hol: string;
  reyting: number;
  icon: string;
  rang: string;
  tadbirlar: MehmonTadbir[];
}

interface MehmonTadbir {
  id: number;
  mavzu: string;
  sana: string;
  vaqt: string;
  davomiylik: number;
  tur: "jonli" | "yozib_olingan";
  bepul: boolean;
}

const MEHMON_USTOZLAR: MehmonUstoz[] = [
  {
    id: 1,
    ism: "Dr. Ahmad Al-Masri",
    unvon: "Arab tili professori",
    mamlakat: "🇪🇬 Misr",
    ixtisoslashuv: ["Fonetika", "Qiroat", "Tajvid"],
    tarjimayi_hol: "Qohira universitetida 15 yil arab fonetikasini o'qitgan. 3 ta darslik muallifi.",
    reyting: 4.9,
    icon: "👨‍🏫",
    rang: "#CA8A04",
    tadbirlar: [
      {
        id: 1,
        mavzu: "Arab fonetikasining asriy sirlari",
        sana: "2026-07-18",
        vaqt: "15:00",
        davomiylik: 90,
        tur: "jonli",
        bepul: true,
      },
      {
        id: 2,
        mavzu: "Qiroat uslublari: Hafs va Warsh",
        sana: "2026-07-25",
        vaqt: "16:00",
        davomiylik: 120,
        tur: "jonli",
        bepul: false,
      },
    ],
  },
  {
    id: 2,
    ism: "Ustoza Fatima Al-Qasim",
    unvon: "Arab tili o'qituvchisi",
    mamlakat: "🇸🇦 Saudiya Arabistoni",
    ixtisoslashuv: ["So'zlashuv", "Grammatika", "Lug'at"],
    tarjimayi_hol: "Riyadda xorijliklar uchun arab tili o'qitish bo'yicha 10 yillik tajribaga ega.",
    reyting: 4.8,
    icon: "👩‍🏫",
    rang: "#2563EB",
    tadbirlar: [
      {
        id: 3,
        mavzu: "Kundalik arabcha: Bozordan ofisga",
        sana: "2026-07-20",
        vaqt: "18:00",
        davomiylik: 60,
        tur: "jonli",
        bepul: true,
      },
      {
        id: 4,
        mavzu: "Arabcha gapirish qo'rquvini yengish",
        sana: "2026-07-22",
        vaqt: "19:00",
        davomiylik: 60,
        tur: "yozib_olingan",
        bepul: true,
      },
    ],
  },
  {
    id: 3,
    ism: "Prof. Yusuf Al-Libi",
    unvon: "Lingvist va tarjimon",
    mamlakat: "🇱🇾 Liviya",
    ixtisoslashuv: ["Morfologiya", "Sintaksis", "Tarjima"],
    tarjimayi_hol: "Tripoli universitetida arab morfologiyasi va sintaksisi bo'yicha tadqiqotchi.",
    reyting: 4.7,
    icon: "👨‍💼",
    rang: "#059669",
    tadbirlar: [
      {
        id: 5,
        mavzu: "Fe'l vaznlari: amaliy yondashuv",
        sana: "2026-07-27",
        vaqt: "17:30",
        davomiylik: 90,
        tur: "jonli",
        bepul: false,
      },
      {
        id: 6,
        mavzu: "Arabcha tarjima san'ati",
        sana: "2026-08-03",
        vaqt: "18:00",
        davomiylik: 60,
        tur: "jonli",
        bepul: true,
      },
    ],
  },
  {
    id: 4,
    ism: "Ustoza Layla Nasser",
    unvon: "Bolalar arab tili mutaxassisi",
    mamlakat: "🇯🇴 Iordaniya",
    ixtisoslashuv: ["Boshlang'ich daraja", "Alifbo", "Qo'shiqlar"],
    tarjimayi_hol: "Ammonda boshlang'ich darajadagi o'quvchilar uchun innovatsion metodlar ishlab chiqqan.",
    reyting: 4.9,
    icon: "👩‍🎓",
    rang: "#7C3AED",
    tadbirlar: [
      {
        id: 7,
        mavzu: "A0 uchun: Alifboni o'ynoqqi o'rganish",
        sana: "2026-07-16",
        vaqt: "16:00",
        davomiylik: 45,
        tur: "jonli",
        bepul: true,
      },
    ],
  },
];

const regKey = (uid: string) => `afp:speaker_reg_${uid}`;

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
  return d.toLocaleDateString("uz-UZ", { day: "numeric", month: "long" });
}

function RatingStars({ reyting }: { reyting: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11} color={i <= Math.round(reyting) ? "#FCD34D" : "rgba(13,58,26,.15)"} fill={i <= Math.round(reyting) ? "#FCD34D" : "none"} />
      ))}
      <span style={{ fontSize: 11, fontWeight: 700, color: "#CA8A04", marginLeft: 3 }}>{reyting}</span>
    </div>
  );
}

export function MehmonUstozlarView() {
  const { user } = useAuth();
  const [registered, setRegistered] = useState<Set<number>>(() => user ? loadReg(user.id) : new Set());
  const [activeUstoz, setActiveUstoz] = useState<MehmonUstoz | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleReg = (tadbirId: number) => {
    if (!user) return;
    const updated = new Set(registered);
    if (updated.has(tadbirId)) {
      updated.delete(tadbirId);
      showToast("Ro'yxatdan o'chirildingiz");
    } else {
      updated.add(tadbirId);
      showToast("Muvaffaqiyatli yozildingiz!");
    }
    setRegistered(updated);
    saveReg(user.id, updated);
  };

  if (!user) return null;

  if (activeUstoz) {
    return (
      <div style={{ minHeight: "100dvh", background: T.meshLight }}>
        {/* Header */}
        <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <button onClick={() => setActiveUstoz(null)} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 10, padding: "7px 12px", cursor: "pointer", color: "#fff", fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
              ← Orqaga
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${activeUstoz.rang}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                {activeUstoz.icon}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>{activeUstoz.ism}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>{activeUstoz.unvon} · {activeUstoz.mamlakat}</div>
                <RatingStars reyting={activeUstoz.reyting} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Bio */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(13,58,26,.08)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.hint, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Haqida</div>
            <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.6 }}>{activeUstoz.tarjimayi_hol}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
              {activeUstoz.ixtisoslashuv.map((s) => (
                <span key={s} style={{ background: `${activeUstoz.rang}15`, color: activeUstoz.rang, borderRadius: 8, fontSize: 11, fontWeight: 600, padding: "3px 10px" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Tadbirlar */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 10 }}>Tadbirlar</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activeUstoz.tadbirlar.map((t) => {
                const isReg = registered.has(t.id);
                return (
                  <div key={t.id} style={{ background: "#fff", borderRadius: 14, border: isReg ? `1.5px solid ${activeUstoz.rang}50` : "1px solid rgba(13,58,26,.08)", overflow: "hidden" }}>
                    <div style={{ background: `${activeUstoz.rang}0f`, padding: "12px 16px 10px", borderBottom: `1px solid ${activeUstoz.rang}20` }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.green, flex: 1, paddingRight: 8 }}>{t.mavzu}</div>
                        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                          {t.tur === "yozib_olingan" && (
                            <span style={{ background: "#0891B2", color: "#fff", borderRadius: 6, fontSize: 9, fontWeight: 700, padding: "2px 7px", display: "flex", alignItems: "center", gap: 3 }}>
                              <Play size={8} fill="#fff" /> Yozilgan
                            </span>
                          )}
                          <span style={{ background: t.bepul ? "rgba(46,184,46,.15)" : "rgba(202,138,4,.15)", color: t.bepul ? T.lime : "#CA8A04", borderRadius: 6, fontSize: 9, fontWeight: 700, padding: "2px 7px" }}>
                            {t.bepul ? "Bepul" : "Pullik"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "10px 16px" }}>
                      <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.hint }}>
                          <Calendar size={11} /> {fmtSana(t.sana)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.hint }}>
                          <Clock size={11} /> {t.vaqt} ({t.davomiylik} daq)
                        </div>
                      </div>
                      <button
                        onClick={() => handleReg(t.id)}
                        style={{
                          width: "100%", padding: "9px", borderRadius: 10, border: "none",
                          background: isReg ? "rgba(220,38,38,.08)" : `linear-gradient(135deg,${activeUstoz.rang},${activeUstoz.rang}cc)`,
                          color: isReg ? "#DC2626" : "#fff",
                          fontSize: 12, fontWeight: 700, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        }}
                      >
                        {isReg ? <><CheckCircle2 size={13} /> Yozilgansiz</> : <><ChevronRight size={13} /> Ro'yxatdan o'tish</>}
                      </button>
                      {isReg && (
                        <button
                          onClick={() => openLink(`https://t.me/${MEHMON_TG}`)}
                          style={{
                            width: "100%", padding: "8px", borderRadius: 9, border: "none",
                            background: "rgba(13,58,26,.06)", color: T.green,
                            fontSize: 11, fontWeight: 600, cursor: "pointer", marginTop: 7,
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                          }}
                        >
                          <ExternalLink size={12} /> Telegram'da qo'shilish
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {toast && (
          <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", background: T.green, color: "#fff", borderRadius: 20, padding: "10px 18px", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,.2)", zIndex: 100, whiteSpace: "nowrap" }}>
            {toast}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Ta'lim</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <Globe size={18} color={T.limeBrt} />
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Mehmon ustozlar</div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            Dunyoning turli burchaklaridan arab tili ekspertlari
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 14px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
        {MEHMON_USTOZLAR.map((u) => {
          const regCount = u.tadbirlar.filter((t) => registered.has(t.id)).length;
          const bepulCount = u.tadbirlar.filter((t) => t.bepul).length;
          return (
            <div
              key={u.id}
              onClick={() => setActiveUstoz(u)}
              style={{
                background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)",
                boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden", cursor: "pointer",
                transition: "transform .12s, box-shadow .12s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(13,58,26,.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(13,58,26,.06)"; }}
            >
              <div style={{ background: `${u.rang}10`, padding: "14px 16px", borderBottom: `1px solid ${u.rang}20` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${u.rang}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    {u.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.green, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.ism}</div>
                    <div style={{ fontSize: 11, color: T.hint }}>{u.unvon}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                      <span style={{ fontSize: 11, color: T.hint }}>{u.mamlakat}</span>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <RatingStars reyting={u.reyting} />
                  </div>
                </div>
              </div>

              <div style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                  {u.ixtisoslashuv.slice(0, 3).map((s) => (
                    <span key={s} style={{ background: `${u.rang}10`, color: u.rang, borderRadius: 8, fontSize: 10, fontWeight: 600, padding: "2px 8px" }}>{s}</span>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ fontSize: 11, color: T.hint }}>
                      <span style={{ fontWeight: 700, color: T.green }}>{u.tadbirlar.length}</span> tadbir
                    </div>
                    {bepulCount > 0 && (
                      <div style={{ fontSize: 11, color: T.lime, fontWeight: 600 }}>
                        {bepulCount} bepul
                      </div>
                    )}
                    {regCount > 0 && (
                      <div style={{ fontSize: 11, color: T.lime, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                        <UserCheck size={10} /> {regCount} yozilgan
                      </div>
                    )}
                  </div>
                  <ChevronRight size={16} color={T.hint} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", background: T.green, color: "#fff", borderRadius: 20, padding: "10px 18px", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,.2)", zIndex: 100, whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
