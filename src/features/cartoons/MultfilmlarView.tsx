import { useState } from "react";
import { Tv2, Play, Star, Clock, ChevronRight } from "lucide-react";
import { T } from "../../theme/tokens";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface Multfilm {
  id: number;
  nomi: string;
  arabcha: string;
  daraja: Level;
  tavsif: string;
  davomiylik: string;
  epizodlar: number;
  rang: string;
  emoji: string;
  xususiyat: string[];
}

const MULTFILMLAR: Multfilm[] = [
  {
    id: 1,
    nomi: "Iftah ya Simsim",
    arabcha: "افتح يا سمسم",
    daraja: "A1",
    tavsif: "Arab olamidagi Sesame Street. Alifbo, raqamlar va asosiy so'zlar sodda arabcha bilan o'qitiladi.",
    davomiylik: "25 daq",
    epizodlar: 130,
    rang: "#F59E0B",
    emoji: "🌟",
    xususiyat: ["Sekin nutq", "Vizual qo'llab-quvvatlash", "Qo'shiqlar"],
  },
  {
    id: 2,
    nomi: "Freej",
    arabcha: "فريج",
    daraja: "A2",
    tavsif: "Emiratdagi to'rt xotin haqida komediya. Xalij lahjasida bo'lsa-da, asosiy so'zlar tushuniladi.",
    davomiylik: "25 daq",
    epizodlar: 160,
    rang: "#10B981",
    emoji: "😄",
    xususiyat: ["Xalij lahjasi", "Kundalik hayot", "Kulgili"],
  },
  {
    id: 3,
    nomi: "Makkah Al-Mukarramah",
    arabcha: "مكة المكرمة",
    daraja: "A1",
    tavsif: "Bolalar uchun sodda animatsiya. Ravon fusha arabcha bilan tarix va qadriyatlar yoritiladi.",
    davomiylik: "15 daq",
    epizodlar: 52,
    rang: "#6366F1",
    emoji: "📚",
    xususiyat: ["Fusha arabcha", "Bolalar uchun", "Tarbiyaviy"],
  },
  {
    id: 4,
    nomi: "Bakar",
    arabcha: "بكار",
    daraja: "A2",
    tavsif: "Yosh yigitcha va do'stlari haqida Misrcha animatsiya. Sekin va ravon til.",
    davomiylik: "20 daq",
    epizodlar: 100,
    rang: "#EC4899",
    emoji: "🧒",
    xususiyat: ["Misrcha lahja", "Sekin til", "Oilaviy"],
  },
  {
    id: 5,
    nomi: "Hikayat Bil-Arabiyya",
    arabcha: "حكايات بالعربية",
    daraja: "A1",
    tavsif: "Al-Jazeera bolalar kanali uchun maxsus animatsiyalar. Fusha arabcha, qisqa hikoyalar.",
    davomiylik: "10 daq",
    epizodlar: 80,
    rang: "#0891B2",
    emoji: "📖",
    xususiyat: ["Fusha arabcha", "Qisqa", "Mazmunli"],
  },
  {
    id: 6,
    nomi: "Nimnim",
    arabcha: "نمنم",
    daraja: "A2",
    tavsif: "Arab bolalar uchun mahalliy animatsiya. Kundalik gaplashuv tili, amaliy lug'at.",
    davomiylik: "15 daq",
    epizodlar: 65,
    rang: "#7C3AED",
    emoji: "🐛",
    xususiyat: ["Gaplashuv tili", "Kundalik lug'at", "Vizual kontekst"],
  },
  {
    id: 7,
    nomi: "Jeem TV Shows",
    arabcha: "برامج جيم",
    daraja: "B1",
    tavsif: "Arabcha ilmiy-ommabop seriallar. O'rta darajadagi lug'at bilan fan va texnologiya mavzulari.",
    davomiylik: "20 daq",
    epizodlar: 50,
    rang: "#DC2626",
    emoji: "🔬",
    xususiyat: ["Fan mavzulari", "O'rta daraja", "Fusha arabcha"],
  },
  {
    id: 8,
    nomi: "Al-Ittihad Al-Madrasi",
    arabcha: "الاتحاد المدرسي",
    daraja: "B1",
    tavsif: "Maktab davri haqida animatsiya seriali. Yoshlar tiliga xos so'zlar va iboralar.",
    davomiylik: "22 daq",
    epizodlar: 40,
    rang: "#CA8A04",
    emoji: "🏫",
    xususiyat: ["Yoshlar tili", "Maktab mavzusi", "Zamonaviy so'zlar"],
  },
  {
    id: 9,
    nomi: "Kalila wa Dimna",
    arabcha: "كليلة ودمنة",
    daraja: "B2",
    tavsif: "Hayvonlar tilida hikmatli ertaklar. Klassik arabcha, boy lug'at va maqollar.",
    davomiylik: "25 daq",
    epizodlar: 30,
    rang: "#059669",
    emoji: "🦁",
    xususiyat: ["Klassik til", "Hikmatli", "Boy lug'at"],
  },
  {
    id: 10,
    nomi: "Alf Layla wa Layla",
    arabcha: "ألف ليلة وليلة",
    daraja: "B2",
    tavsif: "Ming bir kecha ertaklari animatsiya shaklida. Ravon fusha arabcha, boy lug'at.",
    davomiylik: "25 daq",
    epizodlar: 60,
    rang: "#7C3AED",
    emoji: "🌙",
    xususiyat: ["Ertaklar", "Ravon til", "Klassik mavzu"],
  },
  {
    id: 11,
    nomi: "Arabiyya Baynayadayk (Video)",
    arabcha: "العربية بين يديك",
    daraja: "B1",
    tavsif: "Mashhur darslikka asoslangan video darslar. Fusha arabcha, sistematik o'qitish.",
    davomiylik: "30 daq",
    epizodlar: 48,
    rang: "#0891B2",
    emoji: "🎓",
    xususiyat: ["O'quv video", "Fusha arabcha", "Sistematik"],
  },
  {
    id: 12,
    nomi: "Al-Qantara",
    arabcha: "القنطرة",
    daraja: "C1",
    tavsif: "Madaniyat va jamiyat haqida hujjatli filmlar. Og'zaki va yozma fusha arabcha.",
    davomiylik: "45 daq",
    epizodlar: 24,
    rang: "#BE185D",
    emoji: "🌉",
    xususiyat: ["Hujjatli", "Madaniyat", "Murakkab nutq"],
  },
  {
    id: 13,
    nomi: "Al-Jazeera Documentaries",
    arabcha: "وثائقيات الجزيرة",
    daraja: "C2",
    tavsif: "Al-Jazeera kanalining hujjatli filmlari. Siyosat, tarix va iqtisodiyot mavzulari.",
    davomiylik: "50 daq",
    epizodlar: 100,
    rang: "#1D4ED8",
    emoji: "📺",
    xususiyat: ["Xabarlar tili", "Yuqori daraja", "Haqiqiy material"],
  },
];

const LEVEL_COLORS: Record<Level, string> = {
  A1: "#0891B2", A2: "#2563EB", B1: "#CA8A04",
  B2: "#DC2626", C1: "#7C3AED", C2: "#BE185D",
};

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function MultfilmlarView() {
  const [activeLevel, setActiveLevel] = useState<Level | "barchasi">("barchasi");
  const [selected, setSelected] = useState<Multfilm | null>(null);

  const filtered = activeLevel === "barchasi"
    ? MULTFILMLAR
    : MULTFILMLAR.filter((m) => m.daraja === activeLevel);

  if (selected) {
    return (
      <div style={{ minHeight: "100dvh", background: T.meshLight }}>
        {/* Detail header */}
        <div style={{ background: `linear-gradient(135deg, ${selected.rang}, ${selected.rang}bb)`, padding: "20px 18px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <button
              onClick={() => setSelected(null)}
              style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", cursor: "pointer", marginBottom: 16, fontSize: 12, fontWeight: 600 }}
            >
              ← Orqaga
            </button>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
                {selected.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,.7)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
                  Daraja: {selected.daraja}
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{selected.nomi}</div>
                <div dir="rtl" style={{ fontSize: 16, color: "rgba(255,255,255,.8)", fontFamily: "'Amiri', serif" }}>{selected.arabcha}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Info */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: 16 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                <Clock size={14} color={T.hint} style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>{selected.davomiylik}</div>
                <div style={{ fontSize: 10, color: T.hint }}>Davomiyligi</div>
              </div>
              <div style={{ flex: 1, background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                <Tv2 size={14} color={T.hint} style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>{selected.epizodlar}</div>
                <div style={{ fontSize: 10, color: T.hint }}>Epizod</div>
              </div>
              <div style={{ flex: 1, background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                <Star size={14} color={T.hint} style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: LEVEL_COLORS[selected.daraja] }}>{selected.daraja}</div>
                <div style={{ fontSize: 10, color: T.hint }}>Daraja</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: T.text2, lineHeight: 1.7, margin: 0 }}>{selected.tavsif}</p>
          </div>

          {/* Features */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 10 }}>Xususiyatlar</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {selected.xususiyat.map((x) => (
                <div key={x} style={{ background: `${selected.rang}18`, border: `1px solid ${selected.rang}40`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: selected.rang }}>
                  {x}
                </div>
              ))}
            </div>
          </div>

          {/* How to find */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 8 }}>Qayerdan topish mumkin?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { platform: "YouTube", hint: `"${selected.arabcha}" izlang` },
                { platform: "Internet Archive", hint: "archive.org da bepul" },
                { platform: "Al-Jazeera Kids", hint: "kids.aljazeera.net" },
              ].map((item) => (
                <div key={item.platform} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "rgba(13,58,26,.03)", borderRadius: 8 }}>
                  <Play size={12} color={T.green} />
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.green }}>{item.platform}: </span>
                    <span style={{ fontSize: 12, color: T.text2 }}>{item.hint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Tv2 size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase" }}>A1 — C2</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Arabcha Multfilmlar</div>
            </div>
          </div>
          {/* Level tabs */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
            <button
              onClick={() => setActiveLevel("barchasi")}
              style={{ background: activeLevel === "barchasi" ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.08)", border: activeLevel === "barchasi" ? "1px solid rgba(255,255,255,.35)" : "1px solid transparent", borderRadius: 8, padding: "6px 14px", fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Barchasi
            </button>
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                style={{ background: activeLevel === lvl ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.08)", border: activeLevel === lvl ? "1px solid rgba(255,255,255,.35)" : "1px solid transparent", borderRadius: 8, padding: "6px 14px", fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: "14px 14px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelected(m)}
            style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.05)", overflow: "hidden", cursor: "pointer", display: "flex" }}
          >
            {/* Color accent */}
            <div style={{ width: 5, background: m.rang, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "12px 14px 12px 12px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: `${m.rang}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {m.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{m.nomi}</span>
                  <span style={{ background: LEVEL_COLORS[m.daraja], color: "#fff", borderRadius: 5, padding: "1px 6px", fontSize: 9, fontWeight: 700 }}>{m.daraja}</span>
                </div>
                <div dir="rtl" style={{ fontSize: 13, color: T.text2, fontFamily: "'Amiri', serif", textAlign: "right", marginBottom: 3 }}>{m.arabcha}</div>
                <div style={{ display: "flex", gap: 8, fontSize: 10, color: T.hint }}>
                  <span><Clock size={9} style={{ verticalAlign: "middle" }} /> {m.davomiylik}</span>
                  <span><Tv2 size={9} style={{ verticalAlign: "middle" }} /> {m.epizodlar} ep</span>
                </div>
              </div>
              <ChevronRight size={16} color={T.hint} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
