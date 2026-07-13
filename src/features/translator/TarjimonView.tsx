import { useState, useMemo } from "react";
import { Languages, ArrowLeftRight, X, Copy, Check } from "lucide-react";
import { T } from "../../theme/tokens";

// ─── Lug'at ──────────────────────────────────────────────────────────────────
// [arabcha, o'zbekcha, sinonimlar arabcha]
type Entry = [string, string, string[]];

const DICT: Entry[] = [
  // Inson va oila
  ["أب", "ota", ["والد", "جدّ"]],
  ["أم", "ona", ["والدة", "أُمّ"]],
  ["أخ", "aka / uka", ["شقيق"]],
  ["أخت", "opa / singil", ["شقيقة"]],
  ["ابن", "o'g'il", ["ولد"]],
  ["ابنة", "qiz", ["بنت"]],
  ["زوج", "er", ["بعل"]],
  ["زوجة", "xotin", ["امرأة"]],
  ["جد", "bobo", ["جدّ"]],
  ["جدة", "buvi", ["جدّة"]],
  ["عم", "amaki", ["عمّ"]],
  ["عمة", "amma", []],
  ["خال", "tog'a", []],
  ["خالة", "xola", []],
  ["ابن عم", "amakivachcha", []],
  ["صديق", "do'st", ["رفيق", "خليل"]],
  // Kundalik hayot
  ["بيت", "uy", ["منزل", "دار"]],
  ["باب", "eshik", ["بوابة"]],
  ["نافذة", "deraza", ["شباك"]],
  ["كتاب", "kitob", ["مجلد"]],
  ["قلم", "qalam", ["مقلمة"]],
  ["مدرسة", "maktab", ["دار التعليم"]],
  ["جامعة", "universitet", ["كلية"]],
  ["طالب", "talaba / o'quvchi", ["دارس"]],
  ["أستاذ", "ustoz", ["معلم", "مدرّس"]],
  ["درس", "dars", ["حصة"]],
  ["واجب", "vazifa / uy ishi", ["فرض"]],
  ["امتحان", "imtihon", ["اختبار", "اختبار"]],
  ["سيارة", "mashina / avtomobil", ["عربة", "مركبة"]],
  ["طريق", "yo'l", ["سبيل", "صراط"]],
  ["سوق", "bozor", ["مسوق"]],
  ["مسجد", "masjid", ["جامع"]],
  ["مستشفى", "kasalxona", ["دار الشفاء"]],
  ["صيدلية", "dorixona", []],
  // Tabiat
  ["شمس", "quyosh", ["نجم"]],
  ["قمر", "oy", []],
  ["نجم", "yulduz", ["كوكب"]],
  ["ماء", "suv", []],
  ["نار", "olov", []],
  ["هواء", "havo", ["ريح"]],
  ["أرض", "yer", ["تراب"]],
  ["جبل", "tog'", []],
  ["بحر", "dengiz", ["يم", "محيط"]],
  ["نهر", "daryo", []],
  ["شجرة", "daraxt", ["نخلة"]],
  ["زهرة", "gul", ["وردة"]],
  // Raqamlar
  ["واحد", "bir (1)", []],
  ["اثنان", "ikki (2)", []],
  ["ثلاثة", "uch (3)", []],
  ["أربعة", "to'rt (4)", []],
  ["خمسة", "besh (5)", []],
  ["ستة", "olti (6)", []],
  ["سبعة", "yetti (7)", []],
  ["ثمانية", "sakkiz (8)", []],
  ["تسعة", "to'qqiz (9)", []],
  ["عشرة", "o'n (10)", []],
  ["مئة", "yuz (100)", []],
  ["ألف", "ming (1000)", []],
  // Fe'llar
  ["ذهب", "bordi / ketdi", ["مضى"]],
  ["جاء", "keldi", ["وصل"]],
  ["أكل", "yedi", ["تناول"]],
  ["شرب", "ichdi", []],
  ["نام", "uxladi", ["رقد"]],
  ["قام", "turdi / o'rindi", ["نهض"]],
  ["كتب", "yozdi", []],
  ["قرأ", "o'qidi", []],
  ["تكلم", "gapirdi", ["تحدث", "قال"]],
  ["سمع", "eshitdi", []],
  ["رأى", "ko'rdi", []],
  ["أحب", "sevdi", ["عشق", "ودّ"]],
  ["فهم", "tushundi", []],
  ["عمل", "ishladi", ["اشتغل"]],
  ["ساعد", "yordam berdi", ["أعان"]],
  // Sifatlar
  ["كبير", "katta", ["ضخم", "عظيم"]],
  ["صغير", "kichik", []],
  ["جديد", "yangi", []],
  ["قديم", "eski / qadimiy", ["عتيق"]],
  ["جميل", "chiroyli", ["حسن", "بديع"]],
  ["قبيح", "xunuk", []],
  ["سريع", "tez", []],
  ["بطيء", "sekin", []],
  ["قريب", "yaqin", []],
  ["بعيد", "uzoq", []],
  ["حار", "issiq", []],
  ["بارد", "sovuq", []],
  ["طويل", "uzun / baland", []],
  ["قصير", "qisqa / past", []],
  ["صحيح", "to'g'ri", ["سليم", "صواب"]],
  ["خطأ", "xato", ["غلط"]],
  // Fonetika atamalar
  ["حرف", "harf", []],
  ["حركة", "harakat (qisqa unli)", []],
  ["مد", "cho'ziq unli (madd)", []],
  ["سكون", "sukun (unli yo'q)", []],
  ["شدة", "shidda (tashdid)", ["تشديد"]],
  ["تنوين", "tanvin", []],
  ["مخرج", "tovush chiqish joyi (mahraj)", []],
  ["صفة", "sifat (tovush xususiyati)", []],
  ["مجهور", "jahriy (jarangli)", []],
  ["مهموس", "mahmuziy (jarangsiz)", []],
  ["شمسي", "shamsiy", []],
  ["قمري", "qamariy", []],
  // Grammatika atamalar
  ["اسم", "ism (ot)", []],
  ["فعل", "fe'l", []],
  ["حرف جر", "jar harfi (old ko'makchi)", []],
  ["مبتدأ", "mubtado (ega)", []],
  ["خبر", "xabar (kesim)", []],
  ["فاعل", "foil (ega — fe'ldan keyin)", []],
  ["مفعول به", "maf'ul bih (to'ldiruvchi)", []],
  ["نعت", "na't (aniqlovchi)", []],
  ["إضافة", "idofa (bog'lama birikma)", []],
  ["مذكر", "mujakkar (erkak jins)", []],
  ["مؤنث", "muannas (ayol jins)", []],
  ["مفرد", "mufradi (birlik)", []],
  ["مثنى", "musonno (juftlik)", []],
  ["جمع", "jam' (ko'plik)", []],
  ["نكرة", "nakira (noaniq)", []],
  ["معرفة", "ma'rifa (aniq)", []],
  // Foydali iboralar
  ["شكراً", "rahmat", ["جزاك الله خيراً"]],
  ["عفواً", "marhamat / uzr", []],
  ["من فضلك", "iltimos", []],
  ["نعم", "ha", []],
  ["لا", "yo'q", []],
  ["ربما", "balki", []],
  ["الآن", "hozir", []],
  ["غداً", "ertaga", []],
  ["أمس", "kecha", []],
  ["اليوم", "bugun", []],
  ["هنا", "bu yerda", []],
  ["هناك", "u yerda", []],
  ["كيف", "qanday", []],
  ["لماذا", "nega / nima uchun", []],
  ["متى", "qachon", []],
  ["أين", "qayerda", []],
  ["من", "kim", []],
  ["ما / ماذا", "nima", []],
];

// Build reverse lookup: uzbekcha → arabcha candidates
function buildReverseMap(dict: Entry[]): Map<string, { ar: string; syns: string[] }[]> {
  const map = new Map<string, { ar: string; syns: string[] }[]>();
  for (const [ar, uz, syns] of dict) {
    const keys = uz.toLowerCase().split(/[/،,]/).map((s) => s.trim()).filter(Boolean);
    for (const k of keys) {
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push({ ar, syns });
    }
  }
  return map;
}

const REVERSE_MAP = buildReverseMap(DICT);

type Dir = "ar2uz" | "uz2ar";

interface Result {
  main: string;
  syns: string[];
  found: boolean;
}

function search(query: string, dir: Dir): Result {
  const q = query.trim();
  if (!q) return { main: "", syns: [], found: false };

  if (dir === "ar2uz") {
    const hit = DICT.find(([ar]) => ar === q);
    if (hit) return { main: hit[1], syns: hit[2], found: true };
    // Partial match
    const partial = DICT.filter(([ar]) => ar.includes(q));
    if (partial.length) return { main: partial[0][1], syns: partial[0][2], found: true };
    return { main: "", syns: [], found: false };
  } else {
    const lower = q.toLowerCase();
    const direct = REVERSE_MAP.get(lower);
    if (direct?.length) return { main: direct[0].ar, syns: direct[0].syns, found: true };
    // Partial match
    for (const [key, entries] of REVERSE_MAP.entries()) {
      if (key.includes(lower) || lower.includes(key)) {
        return { main: entries[0].ar, syns: entries[0].syns, found: true };
      }
    }
    return { main: "", syns: [], found: false };
  }
}

export function TarjimonView() {
  const [dir, setDir] = useState<Dir>("ar2uz");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => search(query, dir), [query, dir]);

  const flip = () => {
    setDir((d) => (d === "ar2uz" ? "uz2ar" : "ar2uz"));
    setQuery("");
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const placeholder = dir === "ar2uz" ? "Arabcha so'z kiriting…" : "O'zbekcha so'z kiriting…";
  const fromLabel = dir === "ar2uz" ? "Arabcha" : "O'zbekcha";
  const toLabel = dir === "ar2uz" ? "O'zbekcha" : "Arabcha";
  const isAr = dir === "ar2uz";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 24px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Languages size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase" }}>Lug'at · {DICT.length}+ so'z</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Tarjimon</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Direction selector */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 700, color: isAr ? T.green : T.hint }}>
            {fromLabel}
          </div>
          <button
            onClick={flip}
            style={{ background: T.gGreen, border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <ArrowLeftRight size={16} color="#fff" />
          </button>
          <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 700, color: !isAr ? T.green : T.hint }}>
            {toLabel}
          </div>
        </div>

        {/* Input */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(13,58,26,.06)" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.hint, flex: 1 }}>{fromLabel}</span>
            {query && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.hint }}>
                <X size={14} />
              </button>
            )}
          </div>
          <input
            dir={isAr ? "rtl" : "ltr"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            style={{
              width: "100%", border: "none", outline: "none", padding: "14px 16px",
              fontSize: isAr ? 20 : 15,
              fontFamily: isAr ? "'Amiri', 'Scheherazade New', serif" : "inherit",
              color: T.green, background: "transparent", boxSizing: "border-box",
              textAlign: isAr ? "right" : "left",
            }}
          />
        </div>

        {/* Result */}
        {query.trim() && (
          <div style={{ background: "#fff", borderRadius: 14, border: result.found ? `1px solid ${T.lime}60` : "1px solid rgba(13,58,26,.08)", overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(13,58,26,.06)", background: result.found ? "rgba(46,184,46,.04)" : "transparent" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: result.found ? T.green : T.hint, flex: 1 }}>{toLabel}</span>
              {result.found && (
                <button
                  onClick={() => copy(result.main)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.hint }}
                >
                  {copied ? <Check size={14} color={T.lime} /> : <Copy size={14} />}
                </button>
              )}
            </div>
            <div style={{ padding: "14px 16px" }}>
              {result.found ? (
                <>
                  <div
                    dir={!isAr ? "rtl" : "ltr"}
                    style={{
                      fontSize: !isAr ? 24 : 18,
                      fontFamily: !isAr ? "'Amiri', 'Scheherazade New', serif" : "inherit",
                      fontWeight: 700, color: T.green,
                      textAlign: !isAr ? "right" : "left",
                      marginBottom: result.syns.length > 0 ? 10 : 0,
                    }}
                  >
                    {result.main}
                  </div>
                  {result.syns.length > 0 && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: T.hint, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>
                        Sinonimlar
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {result.syns.map((s) => (
                          <div
                            key={s}
                            dir={dir === "ar2uz" ? "rtl" : "ltr"}
                            style={{
                              background: "rgba(13,58,26,.06)", borderRadius: 8, padding: "4px 10px",
                              fontSize: dir === "ar2uz" ? 15 : 12, fontWeight: 600, color: T.text,
                              fontFamily: dir === "ar2uz" ? "'Amiri', serif" : "inherit",
                            }}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "12px 0", color: T.hint, fontSize: 13 }}>
                  Lug'atda topilmadi
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick suggestions */}
        {!query && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.hint, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>
              Tez kirish
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(isAr
                ? ["أب", "بيت", "كتاب", "مدرسة", "صديق", "جميل", "ذهب", "شكراً"]
                : ["ota", "uy", "kitob", "do'st", "bordi", "rahmat", "katta", "yangi"]
              ).map((w) => (
                <button
                  key={w}
                  onClick={() => setQuery(w)}
                  dir={isAr ? "rtl" : "ltr"}
                  style={{
                    background: "#fff", border: "1px solid rgba(13,58,26,.1)", borderRadius: 8,
                    padding: "6px 12px", cursor: "pointer", fontSize: isAr ? 15 : 12, fontWeight: 600,
                    color: T.green, fontFamily: isAr ? "'Amiri', serif" : "inherit",
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
