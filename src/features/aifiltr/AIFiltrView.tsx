import { useState } from "react";
import { Sparkles, RefreshCw, Send, X } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";

// ─── token types ─────────────────────────────────────────────────────────────
type TurType = "arabcha" | "boshqa" | "boshliq" | "belgi";
interface Token { matn: string; tur: TurType }

// ─── analysis result ─────────────────────────────────────────────────────────
interface Metrik {
  nomi: string;
  qiymat: number;  // 0-100
  label: string;
  rang: string;
  izoh: string;
}
interface FiltrNatija {
  umumiyBall: number;
  daraja: string;
  arabchaNisbati: number;
  sozSoni: number;
  noyobSoz: number;
  jumlaSoni: number;
  metriklar: Metrik[];
  tokenlar: Token[];
  tavsiya: string;
  rang: string;
}

const DARAJA_RANG: Record<string, string> = {
  "A0": "#0891B2", "A1": "#2563EB", "A2": "#059669",
  "B1": "#CA8A04", "B2": "#DC2626", "C1": "#7C3AED", "C2": "#BE185D",
};

// ─── tokenizer ───────────────────────────────────────────────────────────────
function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  // Split on Arabic vs non-Arabic sequences, preserving whitespace and punctuation
  const regex = /([ء-يً-ٰٟﭐ-﷿ﹰ-﻿]+|\s+|[^؀-ۿ\s]+)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const s = m[0];
    if (/^\s+$/.test(s)) {
      tokens.push({ matn: s, tur: "boshliq" });
    } else if (/[ء-ي]/.test(s)) {
      tokens.push({ matn: s, tur: "arabcha" });
    } else if (/^[^\w؀-ۿ]+$/.test(s)) {
      tokens.push({ matn: s, tur: "belgi" });
    } else {
      tokens.push({ matn: s, tur: "boshqa" });
    }
  }
  return tokens;
}

// ─── analysis engine ─────────────────────────────────────────────────────────
const HARAKAT_RE = /[ً-ٰٟ]/;

function tahlilQil(matn: string): FiltrNatija | null {
  if (!matn.trim()) return null;

  const tokenlar = tokenize(matn);

  // Arabic words (filter tokens, strip harakat for dedup)
  const arabTokenlar = tokenlar.filter((t) => t.tur === "arabcha");
  const arabSozlar = arabTokenlar.map((t) => t.matn.replace(/[ً-ٰٟ]/g, ""));

  // Character ratio
  const jamilHarflar = matn.replace(/\s/g, "").length;
  const arabHarflar = (matn.match(/[ء-ي]/g) ?? []).length;
  const arabNisbati = jamilHarflar > 0 ? Math.round((arabHarflar / jamilHarflar) * 100) : 0;

  // Harakat quality: % of Arabic tokens that carry at least one harakat mark
  const harakatliSon = arabTokenlar.filter((t) => HARAKAT_RE.test(t.matn)).length;
  const harakatNisbati = arabSozlar.length > 0
    ? Math.round((harakatliSon / arabSozlar.length) * 100) : 0;

  // Vocabulary richness: unique / total Arabic words
  const noyobSoz = new Set(arabSozlar).size;
  const boylikNisbati = arabSozlar.length > 0
    ? Math.round((noyobSoz / arabSozlar.length) * 100) : 0;

  // Word length complexity: % of Arabic words with 5+ letters
  const uzunSozSon = arabSozlar.filter((w) => w.length >= 5).length;
  const murakkabNisbati = arabSozlar.length > 0
    ? Math.round((uzunSozSon / arabSozlar.length) * 100) : 0;

  // Sentence count (by terminal punctuation)
  const jumlaSoni = Math.max(1, (matn.match(/[.!?؟]/g) ?? []).length);
  const ortachaSoz = arabSozlar.length / jumlaSoni;

  // ── Level detection ──────────────────────────────────────────────────────
  const n = arabSozlar.length;
  const avgLen = n > 0 ? arabSozlar.reduce((s, w) => s + w.length, 0) / n : 0;
  let daraja: string;
  if (n === 0)                         daraja = "noma'lum";
  else if (n <= 5  && avgLen <= 3.5)   daraja = "A0";
  else if (n <= 20 && avgLen <= 4.5)   daraja = "A1";
  else if (n <= 45)                    daraja = "A2";
  else if (n <= 90)                    daraja = "B1";
  else if (n <= 170)                   daraja = "B2";
  else if (n <= 280)                   daraja = "C1";
  else                                 daraja = "C2";

  // ── Composite score ──────────────────────────────────────────────────────
  const umumiyBall = Math.round(
    arabNisbati   * 0.35 +
    harakatNisbati * 0.25 +
    boylikNisbati  * 0.20 +
    murakkabNisbati * 0.20
  );

  // ── Metriklar ────────────────────────────────────────────────────────────
  const metriklar: Metrik[] = [
    {
      nomi: "Arabcha nisbati",
      qiymat: arabNisbati,
      label: `${arabNisbati}%`,
      rang: arabNisbati >= 80 ? T.lime : arabNisbati >= 50 ? "#CA8A04" : "#EF4444",
      izoh: arabNisbati >= 80 ? "Asosan arabcha" : arabNisbati >= 50 ? "Aralash matn" : "Arabcha kam",
    },
    {
      nomi: "Harakat sifati",
      qiymat: harakatNisbati,
      label: `${harakatNisbati}%`,
      rang: harakatNisbati >= 70 ? T.lime : harakatNisbati >= 30 ? "#CA8A04" : "#EF4444",
      izoh: harakatNisbati >= 70 ? "To'liq harakatlangan" : harakatNisbati >= 30 ? "Qisman harakat" : "Harakat yo'q",
    },
    {
      nomi: "Lug'at boyliği",
      qiymat: boylikNisbati,
      label: `${noyobSoz} / ${arabSozlar.length}`,
      rang: boylikNisbati >= 65 ? T.lime : boylikNisbati >= 35 ? "#CA8A04" : "#EF4444",
      izoh: boylikNisbati >= 65 ? "Xilma-xil so'zlar" : boylikNisbati >= 35 ? "O'rtacha" : "So'zlar takroriy",
    },
    {
      nomi: "So'z murakkabligi",
      qiymat: murakkabNisbati,
      label: `${murakkabNisbati}%`,
      rang: murakkabNisbati >= 40 ? T.lime : murakkabNisbati >= 20 ? "#CA8A04" : "#EF4444",
      izoh: murakkabNisbati >= 40 ? "Murakkab morfologiya" : murakkabNisbati >= 20 ? "O'rtacha" : "Qisqa so'zlar",
    },
  ];

  // ── Advice ───────────────────────────────────────────────────────────────
  let tavsiya: string;
  let rang: string;
  if (arabNisbati === 0) {
    tavsiya = "Arabcha harf topilmadi. Arabcha matn kiriting.";
    rang = "#EF4444";
  } else if (arabNisbati < 50) {
    tavsiya = "Ko'proq arabcha yozing — hozir harflarning yarmi boshqa tilda.";
    rang = "#EF4444";
  } else if (arabNisbati < 80) {
    tavsiya = "Yaxshi, lekin aralash matn bor. Faqat arabchaga o'tishga harakat qiling.";
    rang = "#CA8A04";
  } else if (harakatNisbati < 30) {
    tavsiya = "Arabcha nisbat yaxshi! Harakat belgilarini qo'shsangiz sifat oshadi.";
    rang = "#CA8A04";
  } else {
    tavsiya = "Mukammal arabcha matn — harakat va morfologiya ham yuqori darajada!";
    rang = T.lime;
  }

  // Secondary stats for display
  void ortachaSoz; // used in jumlaSoni display

  return {
    umumiyBall, daraja, arabchaNisbati: arabNisbati,
    sozSoni: arabSozlar.length, noyobSoz, jumlaSoni,
    metriklar, tokenlar, tavsiya, rang,
  };
}

// ─── components ──────────────────────────────────────────────────────────────
function MetrikKarta({ m }: { m: Metrik }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "11px 13px", border: "1px solid rgba(13,58,26,.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.hint }}>{m.nomi}</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: m.rang, fontVariantNumeric: "tabular-nums" }}>{m.label}</div>
      </div>
      <div style={{ height: 4, background: "rgba(13,58,26,.08)", borderRadius: 2, marginBottom: 5 }}>
        <div style={{ height: "100%", width: `${m.qiymat}%`, background: m.rang, borderRadius: 2, transition: "width .5s ease" }} />
      </div>
      <div style={{ fontSize: 10, color: m.rang, fontWeight: 600 }}>{m.izoh}</div>
    </div>
  );
}

function MatnKorinish({ tokenlar }: { tokenlar: Token[] }) {
  return (
    <div style={{
      padding: "12px 14px",
      background: "rgba(13,58,26,.03)",
      borderRadius: 12,
      border: "1px solid rgba(13,58,26,.08)",
      fontFamily: AR,
      fontSize: 18,
      lineHeight: 2.2,
      direction: "rtl",
      textAlign: "right",
      wordBreak: "break-word",
    }}>
      {tokenlar.map((t, i) => {
        if (t.tur === "boshliq") return <span key={i}>{t.matn}</span>;
        if (t.tur === "arabcha") {
          return (
            <span key={i} style={{ background: "rgba(46,184,46,.18)", color: T.green, borderRadius: 3, padding: "0 2px" }}>
              {t.matn}
            </span>
          );
        }
        if (t.tur === "belgi") {
          return <span key={i} style={{ color: T.hint, fontFamily: "system-ui,sans-serif", fontSize: 14 }}>{t.matn}</span>;
        }
        // boshqa (non-Arabic — highlighted red)
        return (
          <span key={i} style={{ background: "rgba(239,68,68,.12)", color: "#DC2626", borderRadius: 3, padding: "0 2px", fontFamily: "system-ui,sans-serif", fontSize: 14, direction: "ltr", display: "inline-block" }}>
            {t.matn}
          </span>
        );
      })}
    </div>
  );
}

// ─── sample texts ─────────────────────────────────────────────────────────────
const NAMUNALAR = [
  { label: "A0 — Alifbo",     matn: "أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي" },
  { label: "A1 — Salomlashish", matn: "مَرْحَبًا كَيْفَ حَالُكَ؟ أَنَا بِخَيْرٍ، شُكْرًا جَزِيلًا" },
  { label: "A2 — Qisqa gap",  matn: "ذَهَبَ الوَلَدُ إِلَى المَدْرَسَةِ وَقَرَأَ الدَّرْسَ بِاجْتِهَادٍ كَبِيرٍ" },
  { label: "B1 — Murakkab",   matn: "تَعَلَّمْتُ اللُّغَةَ الْعَرَبِيَّةَ مُنْذُ سَنَتَيْنِ. أَتَكَلَّمُ بِهَا بِطَلَاقَةٍ الآنَ وَأَكْتُبُ النُّصُوصَ الطَّوِيلَة." },
  { label: "Aralash",         matn: "Bu arabcha: مَرْحَبًا va bu o'zbekcha" },
];

// ─── main view ────────────────────────────────────────────────────────────────
export function AIFiltrView() {
  const { user } = useAuth();
  const [matn, setMatn] = useState("");
  const [natija, setNatija] = useState<FiltrNatija | null>(null);
  const [loading, setLoading] = useState(false);
  const [korinish, setKorinish] = useState(false); // show token highlight

  const handleTahlil = () => {
    if (!matn.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setNatija(tahlilQil(matn));
      setLoading(false);
      setKorinish(false);
    }, 500);
  };

  const handleNamuna = (m: string) => {
    setMatn(m);
    setNatija(tahlilQil(m));
    setKorinish(false);
  };

  const tozala = () => { setMatn(""); setNatija(null); setKorinish(false); };

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
            Arabcha matnni kiriting — daraja, harakat sifati va lug'at boyligini aniqlaydi
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 40px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Sample texts */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Namuna matnlar</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {NAMUNALAR.map((n) => (
              <button
                key={n.label}
                onClick={() => handleNamuna(n.matn)}
                style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(13,58,26,.15)", background: "#fff", fontSize: 11, fontWeight: 600, color: T.text2, cursor: "pointer" }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.12)", overflow: "hidden" }}>
          <div style={{ padding: "8px 12px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(13,58,26,.06)" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.hint }}>MATN KIRITING</span>
            {matn && (
              <button onClick={tozala} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: T.hint }}>
                <X size={11} /> Tozalash
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
              fontSize: 18, fontFamily: AR,
              color: T.green, background: "transparent", lineHeight: 1.9,
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
              {loading
                ? <><RefreshCw size={12} style={{ animation: "spin 1s linear infinite" }} /> Tahlil…</>
                : <><Send size={12} /> Tahlil qilish</>}
            </button>
          </div>
        </div>

        {/* Results */}
        {natija && (
          <>
            {/* Score + level */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                {/* Big score circle */}
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${natija.rang}18`, border: `3px solid ${natija.rang}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: natija.rang }}>{natija.umumiyBall}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.green }}>Umumiy ball</div>
                    {natija.daraja !== "noma'lum" && (
                      <div style={{ fontSize: 11, fontWeight: 700, background: DARAJA_RANG[natija.daraja] ?? T.hint, color: "#fff", borderRadius: 6, padding: "1px 8px" }}>
                        {natija.daraja}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: natija.rang, fontWeight: 600, marginBottom: 4 }}>{natija.tavsiya}</div>
                  {/* Stat chips */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: T.hint }}>So'z: <strong style={{ color: T.green }}>{natija.sozSoni}</strong></span>
                    <span style={{ fontSize: 11, color: T.hint }}>Noyob: <strong style={{ color: T.green }}>{natija.noyobSoz}</strong></span>
                    <span style={{ fontSize: 11, color: T.hint }}>Jumla: <strong style={{ color: T.green }}>{natija.jumlaSoni}</strong></span>
                  </div>
                </div>
              </div>

              {/* Overall progress bar */}
              <div style={{ height: 8, background: "rgba(13,58,26,.08)", borderRadius: 4 }}>
                <div style={{ height: "100%", width: `${natija.umumiyBall}%`, background: `linear-gradient(90deg, ${natija.rang}aa, ${natija.rang})`, borderRadius: 4, transition: "width .6s ease" }} />
              </div>
            </div>

            {/* Metric cards — 2 column grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {natija.metriklar.map((m) => (
                <MetrikKarta key={m.nomi} m={m} />
              ))}
            </div>

            {/* Token highlight section */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", overflow: "hidden" }}>
              <button
                onClick={() => setKorinish((v) => !v)}
                style={{ width: "100%", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>🔍 Matn ko'rinishi</div>
                <div style={{ fontSize: 11, color: T.hint }}>
                  {korinish ? "Yopish ▲" : "Ko'rsatish ▼"}
                </div>
              </button>
              {korinish && (
                <div style={{ padding: "0 14px 14px" }}>
                  <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(46,184,46,.4)" }} />
                      <span style={{ color: T.hint }}>arabcha</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(239,68,68,.3)" }} />
                      <span style={{ color: T.hint }}>boshqa til</span>
                    </div>
                  </div>
                  <MatnKorinish tokenlar={natija.tokenlar} />
                </div>
              )}
            </div>

            {/* Advice card */}
            <div style={{ background: "rgba(46,184,46,.06)", border: "1px solid rgba(46,184,46,.2)", borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.green, marginBottom: 6 }}>💡 Keyingi qadam</div>
              <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.6 }}>
                {natija.arabchaNisbati === 0
                  ? "Alifbo bo'limidan boshlang — harflarni o'rganing va yozishni mashq qiling."
                  : natija.arabchaNisbati < 50
                  ? "Arabcha qismni ko'paytiring. Dars bo'limidan fonetika mashqlarini bajaring."
                  : natija.arabchaNisbati < 80
                  ? "Yaxshi! Faqat arabcha matn yozishga o'ting. Harakat belgilarini qo'shishni unutmang."
                  : natija.metriklar[1]?.qiymat < 30
                  ? "Harakat sifatini oshiring — har bir so'zga harakatlarini qo'shing."
                  : natija.metriklar[2]?.qiymat < 40
                  ? "Yangi so'zlar o'rganing — lug'at boyligini oshirish uchun turli mavzularda yozing."
                  : "Ajoyib daraja! B2+ matnlar yozib, murakkab grammatik tuzilmalarni qo'llang."}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
