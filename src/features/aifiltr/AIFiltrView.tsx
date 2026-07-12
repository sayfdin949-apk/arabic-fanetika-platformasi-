import { useState } from "react";
import { Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Send } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";

interface FiltrNatija {
  ball: number; // 0-100, 100 = to'liq arabcha
  daraja: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "noma'lum";
  topilganHarflar: string[];
  arabchaNisbati: number; // %
  tavsiya: string;
  rang: string;
}

// Arabcha Unicode diapazoni va harakat belgilari
const ARAB_REGEX = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/g;

// Sodda daraja aniqlash: harflar va so'z miqdoriga qarab
function aniqlaDaraja(matn: string): "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "noma'lum" {
  const arabSozlar = matn.match(/[؀-ۿ]+/g) ?? [];
  const sozSoni = arabSozlar.length;
  const ortachaUzunlik = sozSoni > 0 ? arabSozlar.reduce((s, w) => s + w.length, 0) / sozSoni : 0;
  if (sozSoni === 0) return "noma'lum";
  if (sozSoni <= 5 && ortachaUzunlik <= 3) return "A0";
  if (sozSoni <= 15 && ortachaUzunlik <= 4) return "A1";
  if (sozSoni <= 30) return "A2";
  if (sozSoni <= 50) return "B1";
  if (sozSoni <= 80) return "B2";
  if (sozSoni <= 120) return "C1";
  return "C2";
}

function tahlilQil(matn: string): FiltrNatija {
  if (!matn.trim()) {
    return {
      ball: 0, daraja: "noma'lum", topilganHarflar: [],
      arabchaNisbati: 0, tavsiya: "Tahlil uchun matn kiriting.", rang: T.hint,
    };
  }

  const arabCharlar = matn.match(ARAB_REGEX) ?? [];
  const jamilHarflar = matn.replace(/\s/g, "").length;
  const arabNisbati = jamilHarflar > 0 ? Math.round((arabCharlar.length / jamilHarflar) * 100) : 0;

  // Noyob arabcha harflar (birinchi 8 tasi)
  const noyob = [...new Set(arabCharlar)].slice(0, 8);

  const daraja = aniqlaDaraja(matn);

  let ball = arabNisbati;
  // Harakat belgilari mavjudligi bonus (to'g'ri o'qish uchun zarur)
  const harakatBelgilari = (matn.match(/[ً-ٟ]/g) ?? []).length;
  if (harakatBelgilari > 0) ball = Math.min(100, ball + 5);

  let tavsiya: string;
  let rang: string;
  if (arabNisbati >= 85) {
    tavsiya = "Matn asosan arabcha. Yaxshi!";
    rang = T.lime;
  } else if (arabNisbati >= 50) {
    tavsiya = "Matnda arabcha va boshqa tillar aralashgan.";
    rang = "#CA8A04";
  } else if (arabNisbati > 0) {
    tavsiya = "Matnda arabcha harflar kam. Ko'proq arabcha yozing.";
    rang = "#DC2626";
  } else {
    tavsiya = "Arabcha harf topilmadi. Arabcha matn kiriting.";
    rang = "#DC2626";
  }

  return { ball: Math.round(ball), daraja, topilganHarflar: noyob, arabchaNisbati: arabNisbati, tavsiya, rang };
}

const NAMUNA_MATNLAR = [
  { label: "Alifbo", matn: "أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي" },
  { label: "Salomlashish", matn: "مَرْحَبًا كَيْفَ حَالُكَ؟ بِخَيْرٍ، شُكْرًا" },
  { label: "Qisqa gap", matn: "ذَهَبَ الوَلَدُ إِلَى المَدْرَسَةِ وَقَرَأَ الدَّرْسَ" },
  { label: "Aralash", matn: "Bu arabcha: مَرْحَبًا va bu o'zbekcha" },
];

export function AIFiltrView() {
  const { user } = useAuth();
  const [matn, setMatn] = useState("");
  const [natija, setNatija] = useState<FiltrNatija | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTahlil = () => {
    if (!matn.trim()) return;
    setLoading(true);
    // Haqiqiy AI bo'lsa, bu yerda API chaqiruvi bo'ladi
    setTimeout(() => {
      setNatija(tahlilQil(matn));
      setLoading(false);
    }, 600);
  };

  const handleNamuna = (m: string) => {
    setMatn(m);
    setNatija(tahlilQil(m));
  };

  if (!user) return null;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Vosita</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <Sparkles size={18} color={T.limeBrt} />
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Matn tahlilchi</div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            Arabcha matnni kiriting — daraja va sifatini aniqlaydi
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Namunalar */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Namuna matnlar</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {NAMUNA_MATNLAR.map((n) => (
              <button
                key={n.label}
                onClick={() => handleNamuna(n.matn)}
                style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(13,58,26,.15)", background: "#fff", fontSize: 12, fontWeight: 600, color: T.text2, cursor: "pointer" }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kiritish maydoni */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.12)", overflow: "hidden" }}>
          <div style={{ padding: "8px 12px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(13,58,26,.06)" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.hint }}>MATN KIRITING</span>
            {matn && (
              <button onClick={() => { setMatn(""); setNatija(null); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: T.hint }}>
                Tozalash
              </button>
            )}
          </div>
          <textarea
            value={matn}
            onChange={(e) => setMatn(e.target.value)}
            placeholder="Arabcha matn kiriting…"
            rows={5}
            style={{
              width: "100%", boxSizing: "border-box", padding: "12px 14px",
              border: "none", outline: "none", resize: "none",
              fontSize: 16, fontFamily: '"Sakkal Majalla","Traditional Arabic","Noto Naskh Arabic",serif',
              color: T.green, background: "transparent", lineHeight: 1.8,
              direction: "rtl",
            }}
          />
          <div style={{ padding: "8px 14px", borderTop: "1px solid rgba(13,58,26,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: T.hint }}>{matn.length} belgi</span>
            <button
              onClick={handleTahlil}
              disabled={!matn.trim() || loading}
              style={{
                padding: "8px 16px", borderRadius: 10, border: "none",
                background: matn.trim() ? T.gLime : "rgba(13,58,26,.1)",
                color: matn.trim() ? T.onCta : T.hint,
                fontSize: 12, fontWeight: 700, cursor: matn.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {loading ? <><RefreshCw size={12} style={{ animation: "spin 1s linear infinite" }} /> Tahlil…</> : <><Send size={12} /> Tahlil qilish</>}
            </button>
          </div>
        </div>

        {/* Natija */}
        {natija && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Ball */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                {natija.arabchaNisbati >= 85
                  ? <CheckCircle2 size={20} color={T.lime} />
                  : <AlertTriangle size={20} color={natija.arabchaNisbati > 0 ? "#CA8A04" : "#DC2626"} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.green }}>{natija.arabchaNisbati}% arabcha</div>
                  <div style={{ fontSize: 12, color: T.hint }}>{natija.tavsiya}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 8, background: "rgba(13,58,26,.08)", borderRadius: 4, marginBottom: 14 }}>
                <div style={{ height: "100%", width: `${natija.arabchaNisbati}%`, background: natija.rang === T.lime ? T.gLime : `linear-gradient(90deg,${natija.rang}80,${natija.rang})`, borderRadius: 4, transition: "width .4s" }} />
              </div>

              {/* Meta */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(13,58,26,.06)", borderRadius: 10, padding: "7px 12px" }}>
                  <div style={{ fontSize: 10, color: T.hint, marginBottom: 2 }}>Daraja taxmini</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: natija.daraja !== "noma'lum" ? DARAJA_RANGI[natija.daraja] : T.hint }}>
                    {natija.daraja}
                  </div>
                </div>
                <div style={{ background: "rgba(13,58,26,.06)", borderRadius: 10, padding: "7px 12px" }}>
                  <div style={{ fontSize: 10, color: T.hint, marginBottom: 2 }}>Arabcha harflar</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>
                    {natija.topilganHarflar.length > 0 ? natija.topilganHarflar.join(" ") : "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Maslahat */}
            <div style={{ background: "rgba(46,184,46,.06)", border: "1px solid rgba(46,184,46,.2)", borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.green, marginBottom: 6 }}>💡 Maslahat</div>
              <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
                {natija.arabchaNisbati >= 85
                  ? "Yaxshi natija! Harakat belgilarini (harakat) to'liq qo'shing — bu o'qishni osonlashtiradi."
                  : natija.arabchaNisbati >= 50
                  ? "Matnda aralash til bor. Arabcha yozishda faqat arabcha harflardan foydalaning."
                  : natija.arabchaNisbati > 0
                  ? "Arabcha qismni ko'paytiring. Alifbo darslaridan boshlang."
                  : "Arabcha harflar topilmadi. Alifbo bo'limiga o'ting va harflarni o'rganing."}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const DARAJA_RANGI: Record<string, string> = {
  A0: "#0891B2", A1: "#2563EB", A2: "#059669",
  B1: "#CA8A04", B2: "#DC2626", C1: "#7C3AED", C2: "#BE185D",
};
