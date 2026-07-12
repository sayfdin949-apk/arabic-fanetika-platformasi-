import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, BookOpen, Star, MapPin, PenLine, Lock } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useProgress } from "../progress/ProgressContext";
import { useCoins } from "../../context/CoinContext";
import {
  DARSLAR, HARF_SIFATLAR, TAUGHT_SIFAT, SIFAT_RANG, getLettersForLesson,
  type Dars, type TajwidQoida,
} from "../../content/darslar";
import { NAZARIY } from "../../content/nazariy";
import { DASTUR } from "../../content/dastur";
import { Quiz, type QuizQuestion } from "../../components/Quiz";

/* ── Kichik yordamchi komponentlar ── */

function Badge({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 6,
      fontSize: 11, fontWeight: 700, background: bg, color: text,
      lineHeight: "18px", whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function Section({
  title, icon, children, defaultOpen = false,
}: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid rgba(13,58,26,.12)", borderRadius: 14, overflow: "hidden", marginBottom: 10 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: open ? "rgba(13,58,26,.06)" : "#fff",
          border: "none", cursor: "pointer", padding: "13px 14px",
          display: "flex", alignItems: "center", gap: 9, textAlign: "left",
        }}
      >
        <span style={{ color: T.lime }}>{icon}</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: T.green }}>{title}</span>
        {open
          ? <ChevronUp size={16} color={T.hint} />
          : <ChevronDown size={16} color={T.hint} />}
      </button>
      {open && (
        <div style={{ padding: "0 14px 14px", background: "#fff" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Mavzu paneli ── */
function MavzuPanel({ d }: { d: Dars }) {
  const tajwidDars = d.id >= 14;
  const rows = [
    d.mavzu.takroriy
      ? { label: d.mavzu.kirish ? "Kirish" : "Takroriy", val: d.mavzu.takroriy, color: "#1d4ed8" }
      : null,
    d.mavzu.yangiSifat
      ? { label: "Yangi sifat", val: d.mavzu.yangiSifat, color: "#b45309" }
      : null,
    { label: tajwidDars ? "Mavzu" : "Maxraj", val: d.mavzu.maxraj, color: "#15803d" },
    { label: tajwidDars ? "Mashq" : "Amaliyot", val: d.mavzu.amaliyot, color: "#7c3aed" },
  ].filter(Boolean) as { label: string; val: string; color: string }[];
  return (
    <Section title="Dars mavzusi" icon={<BookOpen size={16} />} defaultOpen>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
        {rows.map(r => (
          <div key={r.label} style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            background: "rgba(13,58,26,.03)", borderRadius: 10, padding: "10px 12px",
            border: "1px solid rgba(13,58,26,.08)",
          }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: r.color,
              background: r.color + "18", borderRadius: 5,
              padding: "2px 7px", whiteSpace: "nowrap", marginTop: 1,
            }}>
              {r.label.toUpperCase()}
            </span>
            <span style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{r.val}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Yangi Sifatlar paneli ── */
function SifatlarPanel({ d }: { d: Dars }) {
  if (d.yangiSifatlar.length === 0) {
    const msg = d.id === 0
      ? "Bu kirish darsi — sifat juftlari 1-darsdan boshlanadi. Sifat tushunchasi: asliy (ziddi bor) va mustaqil (ziddi yo'q) sifatlar mavjud."
      : "Bu darsda yangi juft sifat yo'q — barcha 5 ta juft sifat allaqachon o'rganilgan. Amaliyotda har bir harf uchun barcha sifatlarni ko'rishingiz mumkin.";
    return (
      <Section title="Yangi sifatlar" icon={<Star size={16} />}>
        <div style={{ paddingTop: 8, fontSize: 13, color: T.hint, lineHeight: 1.6 }}>
          {msg}
        </div>
      </Section>
    );
  }
  return (
    <Section title={`Yangi sifatlar (${d.yangiSifatlar.length} ta)`} icon={<Star size={16} />} defaultOpen>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
        {d.yangiSifatlar.map(sf => {
          const rang = SIFAT_RANG[sf.nomi] ?? { bg: T.lime, text: T.onCta };
          return (
            <div key={sf.nomi} style={{
              borderRadius: 12, border: `1px solid ${rang.bg}30`,
              overflow: "hidden",
            }}>
              <div style={{
                background: rang.bg, padding: "8px 12px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontFamily: AR, fontSize: 18, color: "#fff", direction: "rtl" }}>{sf.arNomi}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{sf.nomi}</span>
              </div>
              <div style={{ padding: "10px 12px", background: rang.bg + "0D" }}>
                <p style={{ fontSize: 13, color: T.text, lineHeight: 1.6, margin: "0 0 8px" }}>{sf.tavsif}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", direction: "rtl" }}>
                  {sf.harflar.split(" ").filter(Boolean).map(h => (
                    <span key={h} style={{
                      fontFamily: AR, fontSize: 22, color: rang.bg,
                      background: rang.bg + "18", borderRadius: 8,
                      padding: "4px 10px", border: `1px solid ${rang.bg}30`,
                    }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Maxraj paneli ── */
function MaxrajPanel({ d }: { d: Dars }) {
  return (
    <Section title="Maxraj — chiqish joyi" icon={<MapPin size={16} />}>
      <div style={{ paddingTop: 8 }}>
        <div style={{
          background: "linear-gradient(135deg,rgba(21,128,61,.1),rgba(21,128,61,.04))",
          border: "1px solid rgba(21,128,61,.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 10,
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".04em" }}>
            {d.maxraj.joy}
          </div>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>{d.maxraj.tavsif}</div>
        </div>
        {d.maxraj.yangiHarflar && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", direction: "rtl" }}>
            {d.maxraj.yangiHarflar.split(/[،,]/).map(h => h.trim()).filter(Boolean).map(h => (
              <div key={h} style={{
                fontFamily: AR, fontSize: 28, color: T.green,
                background: "rgba(13,58,26,.07)", borderRadius: 10,
                padding: "6px 14px", border: "1px solid rgba(13,58,26,.15)",
                fontWeight: 700,
              }}>{h}</div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

/* ── Harf kartasi (Amaliyot ichida) ── */
function HarfKarta({ harf, lessonId }: { harf: string; lessonId: number }) {
  const data = HARF_SIFATLAR[harf];
  if (!data) return null;
  const taught = TAUGHT_SIFAT[lessonId] ?? TAUGHT_SIFAT[6];
  const shownZiddi = data.ziddi.filter(s => taught.includes(s));
  const shownMustaqil = data.mustaqil;

  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      border: "1px solid rgba(13,58,26,.10)",
      boxShadow: "0 1px 4px rgba(13,58,26,.06)",
      overflow: "hidden", marginBottom: 10,
    }}>
      {/* Harf sarlavhasi */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
        background: "linear-gradient(135deg,rgba(13,58,26,.07),rgba(13,58,26,.03))",
        borderBottom: "1px solid rgba(13,58,26,.08)",
      }}>
        <div style={{
          fontFamily: AR, fontSize: 36, color: T.green,
          background: "#fff", borderRadius: 10, padding: "4px 14px",
          border: "1px solid rgba(13,58,26,.15)", lineHeight: 1.4,
          boxShadow: "0 1px 4px rgba(13,58,26,.1)",
        }}>{harf}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{data.nomi}</div>
        </div>
      </div>

      <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Maxraj */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>
            Maxraj
          </div>
          <div style={{
            background: "rgba(21,128,61,.07)", border: "1px solid rgba(21,128,61,.18)",
            borderRadius: 8, padding: "7px 10px",
            fontSize: 12, color: T.text, lineHeight: 1.5,
          }}>
            {data.maxraj}
          </div>
        </div>

        {/* 4 shakl × 4 harakat jadvali */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>
            4 Shakl · 4 Harakat
          </div>
          <div style={{ border: "1px solid rgba(29,78,216,.14)", borderRadius: 10, overflow: "hidden" }}>
            {/* ustun sarlavhalari */}
            <div style={{ display: "grid", gridTemplateColumns: "52px repeat(4, 1fr)", background: "rgba(29,78,216,.07)" }}>
              <div />
              {["Mustaqil", "Bosh", "O'rta", "Oxir"].map(s => (
                <div key={s} style={{ padding: "5px 2px", fontSize: 9, fontWeight: 800, color: "#1d4ed8", textAlign: "center" }}>{s}</div>
              ))}
            </div>
            {/* qatorlar: har bir harakat */}
            {[
              { nomi: "Fatha", belgi: "َ", rang: "#b45309" },
              { nomi: "Kasra", belgi: "ِ", rang: "#7c3aed" },
              { nomi: "Damma", belgi: "ُ", rang: "#0e7490" },
              { nomi: "Sukun", belgi: "ْ", rang: "#15803d" },
            ].map((hr, ri) => (
              <div key={hr.nomi} style={{
                display: "grid", gridTemplateColumns: "52px repeat(4, 1fr)",
                background: ri % 2 === 0 ? "#fff" : "rgba(0,0,0,.02)",
                borderTop: "1px solid rgba(0,0,0,.06)",
              }}>
                <div style={{ padding: "6px 6px", fontSize: 10, fontWeight: 700, color: hr.rang, display: "flex", alignItems: "center" }}>
                  {hr.nomi}
                </div>
                {[
                  harf + hr.belgi,
                  harf + hr.belgi + "ـ",
                  "ـ" + harf + hr.belgi + "ـ",
                  "ـ" + harf + hr.belgi,
                ].map((txt, ci) => (
                  <div key={ci} style={{
                    padding: "4px 2px", fontFamily: AR, fontSize: 22,
                    textAlign: "center", direction: "rtl", color: hr.rang,
                    lineHeight: 1.6,
                  }}>
                    {txt}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Ziddi (juft) sifatlar */}
        {shownZiddi.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.hint, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>
              Juft sifatlar (o'rganilganlar)
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {shownZiddi.map(s => {
                const r = SIFAT_RANG[s] ?? { bg: "#6b7280", text: "#fff" };
                return <Badge key={s} label={s} bg={r.bg} text={r.text} />;
              })}
            </div>
          </div>
        )}

        {/* Mustaqil sifatlar */}
        {shownMustaqil.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#b45309", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>
              Mustaqil sifatlar (ziddi yo'q)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {shownMustaqil.map(ms => (
                <div key={ms.nomi} style={{
                  background: "rgba(180,83,9,.08)", border: "1px solid rgba(180,83,9,.2)",
                  borderRadius: 8, padding: "7px 10px",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#b45309" }}>{ms.nomi}</span>
                  <span style={{ fontSize: 11, color: T.text2, marginLeft: 6 }}>— {ms.izoh}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Amaliyot paneli ── */
function AmaliyotPanel({ d }: { d: Dars }) {
  const letters = getLettersForLesson(d.id);
  if (letters.length === 0) {
    return (
      <Section title="Amaliyot" icon={<PenLine size={16} />}>
        <div style={{ paddingTop: 8, fontSize: 13, color: T.hint }}>
          Bu kirish darsi — harflar keyingi darsdan boshlanadi.
        </div>
      </Section>
    );
  }
  return (
    <Section title={`Amaliyot — ${letters.length} ta harf`} icon={<PenLine size={16} />} defaultOpen>
      <div style={{ paddingTop: 8 }}>
        {/* Yangi harflar badge'lari */}
        {d.yangiHarflar.length > 0 && (
          <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.lime, textTransform: "uppercase", letterSpacing: ".06em" }}>
              Bu darsda yangi:
            </span>
            <div style={{ display: "flex", gap: 6, direction: "rtl" }}>
              {d.yangiHarflar.map(h => (
                <span key={h} style={{
                  fontFamily: AR, fontSize: 20, color: T.onCta,
                  background: T.gLime, borderRadius: 8, padding: "3px 10px",
                  fontWeight: 700,
                }}>{h}</span>
              ))}
            </div>
          </div>
        )}
        {letters.map(h => <HarfKarta key={h} harf={h} lessonId={d.id} />)}
      </div>
    </Section>
  );
}

/* ── O'qish amaliyoti — bitta jadval ko'rinishi ── */
function OqishPanel({ d }: { d: Dars }) {
  const letters = getLettersForLesson(d.id);
  const newSet = new Set(d.yangiHarflar);
  if (letters.length === 0) return null;

  const BC = 'rgba(13,58,26,.16)';

  const Row = ({
    items, bg, color, size = 46, weight = 400, firstRow = false,
  }: {
    items: string[]; bg: string; color: string;
    size?: number; weight?: number; firstRow?: boolean;
  }) => (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      background: bg,
      borderLeft: `1px solid ${BC}`,
      borderRight: `1px solid ${BC}`,
      borderBottom: `1px solid ${BC}`,
      ...(firstRow ? { borderTop: `1px solid ${BC}` } : {}),
      direction: 'rtl',
    }}>
      {items.map((ch, i) => (
        <div key={i} style={{
          fontFamily: AR, fontSize: size, color, lineHeight: 2.2,
          textAlign: 'center', fontWeight: weight,
          borderRight: i > 0 ? `1px solid ${BC}` : 'none',
        }}>{ch}</div>
      ))}
    </div>
  );

  return (
    <div style={{ marginBottom: 10, borderRadius: 12, overflow: 'hidden', border: `1px solid ${BC}` }}>
      {/* Sarlavha */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px',
        background: 'rgba(13,58,26,.06)',
        borderBottom: `1px solid ${BC}`,
      }}>
        <span style={{ fontSize: 15 }}>📖</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>O'qish amaliyoti</span>
      </div>

      {/* Mos yozuv qatori: أَ  إِ  أُ */}
      <Row
        items={['أَ', 'إِ', 'أُ']}
        bg='rgba(124,58,237,.07)'
        color='#7c3aed'
        size={50}
        firstRow
      />

      {/* Har bir harf uchun bir qator */}
      {letters.map(h => {
        const isNew = newSet.has(h);
        return (
          <Row
            key={h}
            items={[h + 'َ', h + 'ِ', h + 'ُ']}
            bg={isNew ? 'rgba(13,58,26,.07)' : '#fff'}
            color={isNew ? '#15803d' : '#374151'}
            size={isNew ? 52 : 48}
            weight={isNew ? 700 : 400}
          />
        );
      })}

      {/* Hamza kombinatsiyalari */}
      {d.yangiHarflar.map(h => (
        <Row
          key={'hc-' + h}
          items={['أَ' + h + 'ْ', 'إِ' + h + 'ْ', 'أُ' + h + 'ْ']}
          bg='rgba(180,83,9,.06)'
          color='#b45309'
          size={50}
        />
      ))}

      {/* 4 shakl — yangi harflar uchun */}
      {d.yangiHarflar.map(h => (
        <div key={'sh-' + h} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${BC}`,
          background: '#f9fafb',
        }}>
          {[h, h + 'ـ', 'ـ' + h + 'ـ', 'ـ' + h].map((sh, i) => (
            <div key={i} style={{
              borderRight: i < 3 ? `1px solid ${BC}` : 'none',
              padding: '10px 4px 8px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: AR, fontSize: 40, color: '#15803d', lineHeight: 1.8 }}>{sh}</div>
              <div style={{ fontSize: 9, color: T.hint, fontWeight: 600, marginTop: 2 }}>
                {["Alohida", "Bosh", "O'rta", "Oxir"][i]}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Tajwid qoidalari paneli (dars 14+ asosiy kontent) ── */
function QoidaPanel({ d }: { d: Dars }) {
  if (!d.tajwidQoidalar || d.tajwidQoidalar.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {d.tajwidQoidalar.map((q: TajwidQoida, i: number) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 14,
          padding: "16px 16px 14px", border: "1px solid rgba(13,58,26,.12)",
          boxShadow: "0 1px 4px rgba(0,0,0,.06)",
        }}>
          {/* Sarlavha */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#0d3a1a" }}>{q.nomi}</span>
            <span style={{ fontFamily: AR, fontSize: 17, color: "#7c3aed", direction: "rtl", fontWeight: 700 }}>{q.arNomi}</span>
          </div>
          {/* Shart */}
          {q.shart && (
            <div style={{
              fontSize: 12, color: "#b45309", fontWeight: 700,
              background: "#fef3c7", borderRadius: 7, padding: "5px 10px",
              marginBottom: 10, display: "inline-block",
            }}>
              📌 {q.shart}
            </div>
          )}
          {/* Tavsif */}
          <div style={{ fontSize: 14, color: "#1f2937", lineHeight: 1.7, whiteSpace: "pre-line", marginBottom: 10 }}>
            {q.tavsif}
          </div>
          {/* Harflar */}
          {q.harflar && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(13,58,26,.05)", borderRadius: 8,
              padding: "8px 12px", marginBottom: 10,
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: T.lime, textTransform: "uppercase", flexShrink: 0 }}>Harflar:</span>
              <span style={{ fontFamily: AR, fontSize: 20, color: T.green, direction: "rtl", letterSpacing: 6, flex: 1 }}>{q.harflar}</span>
            </div>
          )}
          {/* Misol */}
          {q.misol && (
            <div style={{
              background: "linear-gradient(135deg,rgba(13,58,26,.07),rgba(13,58,26,.03))",
              borderRadius: 10, padding: "10px 14px",
              borderLeft: "3px solid " + T.lime,
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: T.lime, textTransform: "uppercase", marginBottom: 5, letterSpacing: ".06em" }}>
                Misol
              </div>
              <div style={{
                fontFamily: AR, fontSize: 18, color: "#0d3a1a", direction: "rtl",
                lineHeight: 2.2, letterSpacing: 1,
              }}>
                {q.misol}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── 0-dars: Arabtiliga Kirish — maxsus vizual kontent ── */
function KirishContent() {
  const maxrajZonalar = [
    { rang: "#0e7490", icon: "🌬️", nomi: "Jawf", izoh: "Og'iz bo'shlig'i", harflar: "ا  و  ي", qism: "3 harf — hech qayerga urilmay to'g'ri chiqadi" },
    { rang: "#b45309", icon: "🔴", nomi: "Halq", izoh: "Tomoq — 3 qism", harflar: "أ  ه  ع  ح  غ  خ", qism: "6 harf: pastki (أ ه) · o'rta (ع ح) · yuqori (غ خ)" },
    { rang: "#7c3aed", icon: "👅", nomi: "Lison", izoh: "Til — 10 guruh", harflar: "ق  ك  ج  ش  ي  ض  ل  ن  ر  ط  د  ت  ص  ز  س  ث  ذ  ظ", qism: "18 harf — tilning turli qismlaridan" },
    { rang: "#dc2626", icon: "👄", nomi: "Shafatayn", izoh: "Ikki lab", harflar: "ف  ب  م  و", qism: "4 harf: fa (tish+lab), ba (ikki lab), mim (lab+g'unna), wow (dumaloq lab)" },
    { rang: "#15803d", icon: "👃", nomi: "Xayshum", izoh: "Burun — g'unna", harflar: "ن  م", qism: "Alohida harf emas — ن va م ning g'unna (burun) tovushi" },
  ];

  const asliyJuftlar = [
    { a: "Jahr", b: "Hams", aIzoh: "Ovoz payi titraydi — jarangli", bIzoh: "Ovoz payi titramaydі — nafsiz" },
    { a: "Shadid", b: "Raxv", aIzoh: "Havo to'liq to'xtaydi, keskin chiqadi", bIzoh: "Havo erkin oqib chiqadi, uzayishi mumkin" },
    { a: "Iste'lo", b: "Istefol", aIzoh: "Til orqasi ko'tariladi — 'og'ir' harflar", bIzoh: "Til pastda qoladi — 'yengil' harflar" },
    { a: "Itbaq", b: "Infitah", aIzoh: "Til tanglay bilan yopiladi (4 harf)", bIzoh: "Til va tanglay orasida ochiqlik qoladi" },
    { a: "Izlaq", b: "Ismat", aIzoh: "Til/lab uchidan osonlik bilan chiqadi", bIzoh: "Chiqishi biroz qiyinroq — til ichiga kirib" },
  ];

  const mustaqil = [
    { nomi: "Safir 🎵", izoh: "O'tkir sifildirilgan tovush (س ز ص)" },
    { nomi: "Qalqala ⚡", izoh: "Sokin holda kuchli zarb bilan qo'shimcha jaranglash (ق ط ب ج د)" },
    { nomi: "Lin 🌊", izoh: "Fathadagi harfdan keyin sokin kelganda yumshoq cho'zma (و ي)" },
    { nomi: "Inhiraf ↗️", izoh: "Til yon tomonga og'ib chiqadi (ل ر)" },
    { nomi: "Takrir 🔄", izoh: "Til uchi tez-tez takrorlanib titraydi (ر)" },
    { nomi: "Tafasshi 💨", izoh: "Havo og'iz bo'ylab keng tarqaladi (ش)" },
    { nomi: "Istitola ↔️", izoh: "Til yoni bo'ylab cho'zilib talaffuz (ض)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* 1 — Tarix */}
      <Section title="Arab tili tarixi" icon={<span>📜</span>} defaultOpen>
        <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { kim: "Nasr ibn Osim & Yahya ibn Ya'mar", ish: "Harflarga nuqta qo'shdilar va tartibladilar" },
            { kim: "Abu Aswad Adduali", ish: "E'rob tizimini joriy qildilar — harakatlarni qizil nuqta shaklida qo'ydilar" },
            { kim: "Al-Xalil ibn Ahmad Al-Farohidiy", ish: "Hozirgi harakat tizimiga (fatha, kasra, damma) o'zgartirishlar kiritdilar" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.gLime, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: T.onCta, marginTop: 1 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{t.kim}</div>
                <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>{t.ish}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 2 — Harflar paydo bo'lishi */}
      <Section title="Harflar paydo bo'lishi" icon={<span>🌬️</span>} defaultOpen>
        <div style={{ paddingTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
            {["Havo", "Urilish", "Tebranish", "Ajratish", "Shqalanish", "Tovush"].map((s, i, arr) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ background: i === arr.length - 1 ? T.gLime : "rgba(13,58,26,.09)", borderRadius: 10, padding: "7px 12px", fontSize: 12, fontWeight: 700, color: i === arr.length - 1 ? T.onCta : T.green }}>{s}</div>
                {i < arr.length - 1 && <span style={{ color: T.lime, fontWeight: 700 }}>→</span>}
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: T.text2, lineHeight: 1.6 }}>
            Havo o'pkadan chiqib, turli nutq a'zolari (til, lab, tomoq...) bilan urilib, tebranib, ajralib va ishqalanib — tovushga aylanadi. Har bir tovushning o'z <b style={{ color: T.green }}>maxraji</b> (chiqish joyi) va <b style={{ color: T.green }}>sifati</b> (xususiyati) bor.
          </div>
        </div>
      </Section>

      {/* 3 — Ovoz pardasi */}
      <Section title="Ovoz pardasi — Jahr va Hams" icon={<span>🎙️</span>} defaultOpen>
        <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background: "rgba(30,27,75,.07)", border: "1px solid rgba(30,27,75,.2)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#1e1b4b", marginBottom: 4 }}>⚡ JAHR — Jarangli</div>
              <div style={{ fontSize: 11, color: T.text2, lineHeight: 1.5 }}>Ovoz payi yopiladi va tebranadi. <br />Misol: <span style={{ fontFamily: AR, fontSize: 16, color: "#1e1b4b" }}>ز</span> (Zayn) — «azz» deb aytib bo'g'izga qo'l qo'ying, tebranadi</div>
            </div>
            <div style={{ background: "rgba(67,56,202,.07)", border: "1px solid rgba(67,56,202,.2)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#4338ca", marginBottom: 4 }}>💨 HAMS — Nafsiz</div>
              <div style={{ fontSize: 11, color: T.text2, lineHeight: 1.5 }}>Ovoz payi ochiq qoladi, havo erkin chiqadi. <br />Misol: <span style={{ fontFamily: AR, fontSize: 16, color: "#4338ca" }}>س</span> (Sin) — «ass» deb aytib qo'lni og'iz oldiga qo'ying, havo chiqadi</div>
            </div>
          </div>
          <div style={{ background: "rgba(21,128,61,.06)", border: "1px solid rgba(21,128,61,.18)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>✋ Tekshirish usuli</div>
            <div style={{ fontSize: 12, color: T.text, lineHeight: 1.6 }}>
              <b>1-qo'l</b> — bo'g'izga qo'ying (tebranishni his qilish uchun)<br />
              <b>2-qo'l</b> — og'iz oldiga qo'ying (havo chiqishini his qilish uchun)<br />
              Harfni <b>sukunli</b> holatda (harakatsiz) talaffuz qiling va farqni his qiling
            </div>
          </div>
        </div>
      </Section>

      {/* 4 — Maxraj 5 zona */}
      <Section title="Maxraj — 5 asosiy zona" icon={<span>📍</span>} defaultOpen>
        <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {maxrajZonalar.map((z, i) => (
            <div key={z.nomi} style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${z.rang}30` }}>
              <div style={{ background: z.rang, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{z.icon}</span>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{i + 1}. {z.nomi}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.8)", marginLeft: 8 }}>{z.izoh}</span>
                </div>
              </div>
              <div style={{ background: z.rang + "0D", padding: "8px 12px" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", direction: "rtl", marginBottom: 6 }}>
                  {z.harflar.split("  ").filter(Boolean).map(h => (
                    <span key={h} style={{ fontFamily: AR, fontSize: 22, color: z.rang, background: z.rang + "18", borderRadius: 8, padding: "3px 10px", border: `1px solid ${z.rang}30`, fontWeight: 700 }}>{h}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: T.text2 }}>{z.qism}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5 — Sifatlar */}
      <Section title="Sifatlar tushunchasi" icon={<span>⭐</span>} defaultOpen>
        <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Juft sifatlar */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: T.green, marginBottom: 8 }}>🔄 Ziddi bor sifatlar — 5 juft (10 ta)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {asliyJuftlar.map(j => (
                <div key={j.a} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  <div style={{ background: "rgba(30,27,75,.07)", border: "1px solid rgba(30,27,75,.15)", borderRadius: 9, padding: "7px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#1e1b4b" }}>{j.a}</div>
                    <div style={{ fontSize: 10, color: T.text2, marginTop: 2, lineHeight: 1.4 }}>{j.aIzoh}</div>
                  </div>
                  <div style={{ background: "rgba(67,56,202,.07)", border: "1px solid rgba(67,56,202,.15)", borderRadius: 9, padding: "7px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#4338ca" }}>{j.b}</div>
                    <div style={{ fontSize: 10, color: T.text2, marginTop: 2, lineHeight: 1.4 }}>{j.bIzoh}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mustaqil sifatlar */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#b45309", marginBottom: 8 }}>🌟 Ziddi yo'q (mustaqil) sifatlar — 7 ta</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {mustaqil.map(m => (
                <div key={m.nomi} style={{ background: "rgba(180,83,9,.06)", border: "1px solid rgba(180,83,9,.15)", borderRadius: 9, padding: "7px 10px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#b45309", whiteSpace: "nowrap" }}>{m.nomi}</span>
                  <span style={{ fontSize: 11, color: T.text2 }}>— {m.izoh}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
}

/* ── Dars detail ko'rinishi ── */
function DarsDetail({ d, onBack }: { d: Dars; onBack: () => void }) {
  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, padding: "0 16px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,.12)", border: "none", borderRadius: 8,
              width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", flexShrink: 0,
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: ".06em" }}>
              {d.id}-DARS
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
              {d.emoji} {d.nomi}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "14px 14px 40px" }}>
        {d.id === 0 ? (
          <KirishContent />
        ) : d.id >= 14 ? (
          <>
            <MavzuPanel d={d} />
            <QoidaPanel d={d} />
          </>
        ) : (
          <>
            <MavzuPanel d={d} />
            <SifatlarPanel d={d} />
            <MaxrajPanel d={d} />
            <AmaliyotPanel d={d} />
            <OqishPanel d={d} />
          </>
        )}
      </div>
    </div>
  );
}

/* ── Jadval tab: Fonetika 1 → Haftalar → Kunlar → Quiz ── */
function JadvalTab() {
  const { touchStreak } = useProgress();
  const { addCoins } = useCoins();
  const f1Haftalar = DASTUR.filter(m => m.oy <= 2).flatMap(m => m.haftalar);
  const [open, setOpen] = useState(false);
  const [openH, setOpenH] = useState<number | null>(null);
  const [quizH, setQuizH] = useState<number | null>(null);
  const [quizPct, setQuizPct] = useState<number | null>(null);

  const activeHafta = f1Haftalar.find(h => h.h === quizH) ?? null;
  const quizQuestions: QuizQuestion[] = useMemo(() => {
    if (!activeHafta?.vazifalar) return [];
    return activeHafta.vazifalar.map(v => ({
      q: v.savol,
      options: v.variantlar.map((t, i) => ({ text: t, correct: i === v.togri })),
    }));
  }, [activeHafta]);

  const openQuiz = (h: number) => { setQuizH(h); setQuizPct(null); };
  const closeQuiz = () => { setQuizH(null); setQuizPct(null); };

  /* ── Quiz overlay ── */
  if (quizH !== null && activeHafta) {
    return (
      <div style={{ padding: "12px 14px 32px" }}>
        <div style={{
          background: "#fff", borderRadius: 14,
          border: "1px solid rgba(13,58,26,.12)", overflow: "hidden",
          boxShadow: "0 1px 4px rgba(13,58,26,.06)",
        }}>
          {/* Quiz header */}
          <div style={{ background: T.gGreen, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={closeQuiz}
              style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "5px 10px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              ← Orqaga
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.limeBrt }}>{activeHafta.h}-HAFTA TESTI</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginTop: 1 }}>{activeHafta.mavzu}</div>
            </div>
          </div>
          <div style={{ padding: 14 }}>
            {quizPct === null ? (
              <Quiz
                key={quizH}
                questions={quizQuestions}
                onDone={(ok, tot) => {
                  const pct = Math.round((ok / tot) * 100);
                  setQuizPct(pct);
                  touchStreak();
                  if (pct >= 80) addCoins(5);
                }}
              />
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{quizPct >= 80 ? "🎉" : "📚"}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: quizPct >= 80 ? T.green : T.red, marginBottom: 6 }}>
                  {quizPct}%
                </div>
                <div style={{ fontSize: 13, color: T.text2, marginBottom: 18 }}>
                  {quizPct >= 80 ? "Zo'r natija! Hafta testi yakunlandi." : "80% kerak. Qayta urinib ko'ring."}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => setQuizPct(null)}
                    style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(13,58,26,.15)", background: "rgba(13,58,26,.04)", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  >
                    Qayta boshlash
                  </button>
                  <button
                    onClick={closeQuiz}
                    style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: T.gGreen, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                  >
                    Jadvalga qaytish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px 14px 32px" }}>
      <div style={{
        background: "#fff", borderRadius: 14,
        border: "1px solid rgba(13,58,26,.12)", overflow: "hidden",
        boxShadow: "0 1px 4px rgba(13,58,26,.06)",
      }}>
        {/* Level 1: Fonetika 1 header */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 12,
            padding: "14px 14px", background: open ? "rgba(13,58,26,.04)" : "none",
            border: "none", cursor: "pointer", textAlign: "left",
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: T.gGreen,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontSize: 22 }}>📅</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.hint, letterSpacing: ".06em" }}>FONETIKA 1</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.green }}>2 oylik dastur</div>
            <div style={{ fontSize: 11, color: T.hint, marginTop: 1 }}>8 hafta · 3 kun/hafta</div>
          </div>
          {open
            ? <ChevronUp size={18} color={T.hint} />
            : <ChevronDown size={18} color={T.hint} />}
        </button>

        {/* Level 2: Weeks */}
        {open && (
          <div style={{ borderTop: "1px solid rgba(13,58,26,.08)" }}>
            {f1Haftalar.map((hafta, idx) => (
              <div
                key={hafta.h}
                style={{ borderBottom: idx < f1Haftalar.length - 1 ? "1px solid rgba(13,58,26,.06)" : "none" }}
              >
                <button
                  onClick={() => setOpenH(openH === hafta.h ? null : hafta.h)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "11px 14px",
                    background: openH === hafta.h ? "rgba(13,58,26,.04)" : "none",
                    border: "none", cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, background: T.gLime,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: T.onCta }}>{hafta.h}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.hint }}>{hafta.h}-HAFTA</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.green, lineHeight: 1.35, marginTop: 1 }}>
                      {hafta.mavzu}
                    </div>
                  </div>
                  {openH === hafta.h
                    ? <ChevronUp size={14} color={T.hint} style={{ flexShrink: 0 }} />
                    : <ChevronDown size={14} color={T.hint} style={{ flexShrink: 0 }} />}
                </button>

                {/* Level 3: Days */}
                {openH === hafta.h && (
                  <div style={{ padding: "0 12px 12px 12px", background: "rgba(13,58,26,.02)" }}>
                    {hafta.kunlar.map((kun, ki) => (
                      <div key={ki} style={{
                        marginBottom: 8, background: "#fff", borderRadius: 10,
                        border: "1px solid rgba(13,58,26,.08)", overflow: "hidden",
                      }}>
                        <div style={{
                          background: T.gGreen, padding: "7px 12px",
                          display: "flex", alignItems: "center", gap: 6,
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: T.limeBrt }}>
                            {ki + 1}-KUN
                          </span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>· {kun.k}</span>
                        </div>
                        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
                          <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                            <BookOpen size={13} color={T.green} style={{ flexShrink: 0, marginTop: 2 }} />
                            <span style={{ fontSize: 12, color: T.text, lineHeight: 1.5 }}>{kun.d}</span>
                          </div>
                          <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                            <PenLine size={13} color={T.lime} style={{ flexShrink: 0, marginTop: 2 }} />
                            <span style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>{kun.m}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* TEST chip / button */}
                    <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                      <div style={{
                        flex: 1, background: "rgba(100,188,64,.08)", border: "1px solid rgba(100,188,64,.25)",
                        borderRadius: 10, padding: "9px 12px", display: "flex", gap: 8, alignItems: "flex-start",
                      }}>
                        <span style={{
                          fontSize: 10, fontWeight: 800, color: T.lime,
                          background: "rgba(100,188,64,.18)", borderRadius: 5,
                          padding: "2px 7px", whiteSpace: "nowrap", flexShrink: 0,
                        }}>TEST</span>
                        <span style={{ fontSize: 12, color: T.text, lineHeight: 1.5 }}>{hafta.imtihon}</span>
                      </div>
                      {hafta.vazifalar && hafta.vazifalar.length > 0 && (
                        <button
                          onClick={() => openQuiz(hafta.h)}
                          style={{
                            background: T.gLime, border: "none", borderRadius: 10,
                            padding: "9px 14px", cursor: "pointer", flexShrink: 0,
                            fontSize: 12, fontWeight: 700, color: T.onCta,
                            display: "flex", alignItems: "center", gap: 5,
                          }}
                        >
                          ▶ Boshlash
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Fonetika darajalari ro'yxati ── */
function CurriculumList({ onSelectAmal }: { onSelectAmal: (d: Dars) => void }) {
  const navigate = useNavigate();
  const [fonetika, setFonetika] = useState<1 | 2 | 3>(1);
  const [tab, setTab] = useState<"naz" | "am" | "jadval">("am");

  const nazF1 = NAZARIY.slice(0, 10);

  const tabBtn = (active: boolean) => ({
    flex: 1, padding: "9px 0", border: "none", cursor: "pointer", borderRadius: 10,
    background: active ? T.limeBrt : "transparent",
    color: active ? T.green : "rgba(255,255,255,.55)",
    fontSize: 13, fontWeight: 700, transition: "all .15s",
  });

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero + level tabs */}
      <div style={{ background: T.gGreen, padding: "18px 16px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.limeBrt, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>
            O'quv Dasturi
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 14 }}>
            Arab Fonetikasi
          </div>
          {/* Fonetika 1 / 2 / 3 */}
          <div style={{ display: "flex", gap: 6, paddingBottom: 14 }}>
            {([1, 2, 3] as const).map(n => (
              <button
                key={n}
                onClick={() => n === 1 && setFonetika(n)}
                style={{
                  flex: 1, padding: "9px 0", borderRadius: 10, border: "none",
                  cursor: n === 1 ? "pointer" : "default",
                  background: fonetika === n ? T.limeBrt : n === 1 ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.06)",
                  color: fonetika === n ? T.green : n === 1 ? "#fff" : "rgba(255,255,255,.3)",
                  fontSize: 13, fontWeight: 700, transition: "all .15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}
              >
                {n > 1 && <Lock size={11} />}
                Fonetika {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {fonetika === 1 ? (
        <>
          {/* Amaliy / Nazariy / Jadval tab picker */}
          <div style={{ background: T.gGreen, padding: "0 14px 12px" }}>
            <div style={{ display: "flex", gap: 3, background: "rgba(0,0,0,.22)", borderRadius: 12, padding: 4 }}>
              <button onClick={() => setTab("am")} style={{ ...tabBtn(tab === "am"), fontSize: 12 }}>
                ✍ Amaliy (14)
              </button>
              <button onClick={() => setTab("naz")} style={{ ...tabBtn(tab === "naz"), fontSize: 12 }}>
                📖 Nazariy (10)
              </button>
              <button onClick={() => setTab("jadval")} style={{ ...tabBtn(tab === "jadval"), fontSize: 12 }}>
                📅 Jadval
              </button>
            </div>
          </div>

          {tab === "jadval" ? (
            <JadvalTab />
          ) : tab === "naz" ? (
            /* ── Nazariy 1–10 ── */
            <div style={{ padding: "12px 14px 32px", display: "flex", flexDirection: "column", gap: 8 }}>
              {nazF1.map((naz, idx) => (
                <button
                  key={naz.id}
                  onClick={() => navigate(`/dars/nazariy/${naz.id}`)}
                  style={{
                    width: "100%", background: "#fff", border: "1px solid rgba(13,58,26,.10)",
                    borderRadius: 14, cursor: "pointer", textAlign: "left",
                    boxShadow: "0 1px 4px rgba(13,58,26,.06)",
                    padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: T.gGreen,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: AR, fontSize: 18, color: T.limeBrt,
                  }}>
                    {naz.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.hint }}>{idx + 1}-nazariy</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginTop: 1 }}>{naz.nomi}</div>
                  </div>
                  <ChevronLeft size={16} color={T.hint} style={{ transform: "rotate(180deg)", flexShrink: 0 }} />
                </button>
              ))}
            </div>
          ) : (
            /* ── Amaliy 1–14 ── */
            <div style={{ padding: "12px 14px 32px", display: "flex", flexDirection: "column", gap: 8 }}>
              {DARSLAR.map(d => {
                const letterCount = getLettersForLesson(d.id);
                const isIntro = d.id === 0;
                const hasSifat = d.yangiSifatlar.length > 0;
                return (
                  <button
                    key={d.id}
                    onClick={() => onSelectAmal(d)}
                    style={{
                      width: "100%", background: "#fff", border: "1px solid rgba(13,58,26,.10)",
                      borderRadius: 14, cursor: "pointer", textAlign: "left",
                      boxShadow: "0 1px 4px rgba(13,58,26,.06)",
                      padding: 0, overflow: "hidden",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                        background: isIntro ? T.gGreen : hasSifat ? T.gLime : "rgba(13,58,26,.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 20, lineHeight: 1,
                      }}>
                        {d.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: T.hint }}>{d.id}-amaliy</span>
                          {hasSifat && (
                            <span style={{
                              fontSize: 9, fontWeight: 800, color: "#b45309",
                              background: "#b4530912", borderRadius: 4, padding: "1px 5px",
                            }}>YANGI SIFAT</span>
                          )}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginTop: 1 }}>{d.nomi}</div>
                        {d.yangiHarflar.length > 0 && (
                          <div style={{ display: "flex", gap: 4, marginTop: 4, direction: "rtl", justifyContent: "flex-end" }}>
                            {d.yangiHarflar.map(h => (
                              <span key={h} style={{
                                fontFamily: AR, fontSize: 16, color: T.green500,
                                background: "rgba(13,58,26,.06)", borderRadius: 6,
                                padding: "2px 8px", border: "1px solid rgba(13,58,26,.1)",
                              }}>{h}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      {letterCount.length > 0 && (
                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                          <div style={{ fontSize: 18, fontWeight: 800, color: T.lime }}>{letterCount.length}</div>
                          <div style={{ fontSize: 9, color: T.hint, fontWeight: 600 }}>HARF</div>
                        </div>
                      )}
                    </div>
                    {letterCount.length > 0 && (
                      <div style={{ height: 3, background: "rgba(13,58,26,.06)" }}>
                        <div style={{ height: "100%", width: `${(letterCount.length / 28) * 100}%`, background: T.gLimeH }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* ── Fonetika 2 / 3 — Tez kunda ── */
        <div style={{ padding: "60px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>🔒</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.green, marginBottom: 8 }}>
            Fonetika {fonetika} — Tez kunda
          </div>
          <div style={{ fontSize: 14, color: T.hint, lineHeight: 1.7 }}>
            Bu daraja Fonetika {fonetika - 1} tugagandan<br />so'ng ochiladi
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Asosiy komponent ── */
export function DasturView() {
  const [selected, setSelected] = useState<Dars | null>(null);

  if (selected) {
    return <DarsDetail d={selected} onBack={() => setSelected(null)} />;
  }
  return <CurriculumList onSelectAmal={setSelected} />;
}
