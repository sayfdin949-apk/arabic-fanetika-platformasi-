/* Arab Fonetika kursi — 1-bosqich: 24 dars (0–23), 28 harf */

export interface MustaqilSifat { nomi: string; izoh: string; }

export interface HarfSifat {
  nomi: string;
  maxraj: string;
  ziddi: string[];
  mustaqil: MustaqilSifat[];
}

export interface SifatInfo {
  nomi: string;
  arNomi: string;
  tavsif: string;
  harflar: string;
}

export interface TajwidQoida {
  nomi: string;
  arNomi: string;
  shart: string;
  tavsif: string;
  harflar?: string;
  misol?: string;
}

export interface MaxrajInfo {
  joy: string;
  tavsif: string;
  yangiHarflar: string;
}

export interface DarsMavzu {
  /** 0–13-darslar uchun oldingi dars xulosa; 14+ da bo'lmaydi */
  takroriy?: string;
  yangiSifat?: string;
  maxraj: string;
  amaliyot: string;
  /** true bo'lsa MavzuPanel "Takroriy" o'rniga "Kirish" label ko'rsatadi */
  kirish?: boolean;
}

export interface Dars {
  id: number;
  nomi: string;
  emoji: string;
  mavzu: DarsMavzu;
  yangiSifatlar: SifatInfo[];
  maxraj: MaxrajInfo;
  yangiHarflar: string[];
  tajwidQoidalar?: TajwidQoida[];
}

/* ── Har bir sifatning rangi ── */
export const SIFAT_RANG: Record<string, { bg: string; text: string }> = {
  "Shidda":   { bg: "#1d4ed8", text: "#fff" },
  "Roxova":   { bg: "#0284c7", text: "#fff" },
  "Bayniyya": { bg: "#7c3aed", text: "#fff" },
  "Iste'lo":  { bg: "#b45309", text: "#fff" },
  "Istefol":  { bg: "#4d7c0f", text: "#fff" },
  "Itbaq":    { bg: "#b91c1c", text: "#fff" },
  "Infitah":  { bg: "#15803d", text: "#fff" },
  "Izlaq":    { bg: "#0e7490", text: "#fff" },
  "Ismat":    { bg: "#6b7280", text: "#fff" },
  "Jahr":     { bg: "#1e1b4b", text: "#fff" },
  "Hams":     { bg: "#4338ca", text: "#fff" },
};

/* ── 28 harfning to'liq sifat ma'lumotlari ── */
export const HARF_SIFATLAR: Record<string, HarfSifat> = {
  "أ": {
    nomi: "Alif (Hamza)", maxraj: "Halq — eng chuqur bo'g'izdan keskin to'xtash",
    ziddi: ["Jahr", "Shidda", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "ب": {
    nomi: "Ba", maxraj: "Shafatayn — ikki lab yopilib keskin ochiladi",
    ziddi: ["Jahr", "Shidda", "Istefol", "Infitah", "Izlaq"],
    mustaqil: [{ nomi: "Qalqala", izoh: "Sokin holda talaffuzda kuchli zarb bilan qo'shimcha jaranglash hosil bo'ladi" }],
  },
  "ت": {
    nomi: "Ta", maxraj: "Lison uchi — til uchi yuqori tishlarning ichki tomoni bilan",
    ziddi: ["Hams", "Shidda", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "ث": {
    nomi: "Sa", maxraj: "Lison uchi — til uchi pastki va yuqori tishlar orasidan",
    ziddi: ["Hams", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "ج": {
    nomi: "Jim", maxraj: "Lison o'rtasi — til o'rtasi va oldingi yumshoq tanglay",
    ziddi: ["Jahr", "Shidda", "Istefol", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Qalqala", izoh: "Sokin holda talaffuzda kuchli zarb bilan qo'shimcha jaranglash hosil bo'ladi" }],
  },
  "ح": {
    nomi: "Ha", maxraj: "Halq o'rtasi — nafas bilan, havo erkin chiqadi",
    ziddi: ["Hams", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "خ": {
    nomi: "Xa", maxraj: "Halq yuqorisi — sirpanish tovushi bilan",
    ziddi: ["Hams", "Roxova", "Iste'lo", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "د": {
    nomi: "Dal", maxraj: "Lison uchi — til uchi yuqori tishlar bilan",
    ziddi: ["Jahr", "Shidda", "Istefol", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Qalqala", izoh: "Sokin holda talaffuzda kuchli zarb bilan qo'shimcha jaranglash hosil bo'ladi" }],
  },
  "ذ": {
    nomi: "Zal", maxraj: "Lison uchi — tish oralig'idan jarangli; ث ning jarangli shakli",
    ziddi: ["Jahr", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "ر": {
    nomi: "Ra", maxraj: "Lison uchi — milkka tegib tez titraydi",
    ziddi: ["Jahr", "Bayniyya", "Istefol", "Infitah", "Izlaq"],
    mustaqil: [
      { nomi: "Inhiraf", izoh: "Til yon tomonga biroz og'ib talaffuz qilinadi, havo yon tarafdan o'tadi" },
      { nomi: "Takrir", izoh: "Til uchi tez-tez takrorlanib titraydi (trill)" },
    ],
  },
  "ز": {
    nomi: "Zayn", maxraj: "Lison uchi — tish oralig'idan jarangli sifildirilgan tovush",
    ziddi: ["Jahr", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Safir", izoh: "Til uchi va tish orasidan o'tkir sifildirilgan jarangli tovush chiqadi" }],
  },
  "س": {
    nomi: "Sin", maxraj: "Lison uchi — tish oralig'idan nafsiz sifildirilgan tovush",
    ziddi: ["Hams", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Safir", izoh: "Til uchi va tish orasidan o'tkir sifildirilgan nafsiz tovush chiqadi" }],
  },
  "ش": {
    nomi: "Shin", maxraj: "Lison o'rtasi — keng tarqaluvchi nafsiz tovush",
    ziddi: ["Hams", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Tafasshi", izoh: "Havo og'iz bo'ylab keng tarqalib chiqadi — sh tovushining xususiyati" }],
  },
  "ص": {
    nomi: "Sod", maxraj: "Lison uchi — tish yaqinida og'ir (mahkam) sibilyant",
    ziddi: ["Hams", "Roxova", "Iste'lo", "Itbaq", "Ismat"],
    mustaqil: [{ nomi: "Safir", izoh: "Og'ir sifildirilgan tovush — س ning iste'loli, itboqli shakli" }],
  },
  "ض": {
    nomi: "Zod", maxraj: "Lison yon tomoni — til yoni orqa tishlar bilan; og'ir jarangli",
    ziddi: ["Jahr", "Roxova", "Iste'lo", "Itbaq", "Ismat"],
    mustaqil: [{ nomi: "Istitola", izoh: "Til yoni bo'ylab cho'zilib talaffuz qilinadi" }],
  },
  "ط": {
    nomi: "To", maxraj: "Lison uchi — til uchi tishlar bilan; og'ir keskin",
    ziddi: ["Jahr", "Shidda", "Iste'lo", "Itbaq", "Ismat"],
    mustaqil: [{ nomi: "Qalqala", izoh: "Sokin holda talaffuzda kuchli zarb bilan qo'shimcha jaranglash hosil bo'ladi" }],
  },
  "ظ": {
    nomi: "Zo", maxraj: "Lison uchi — tish oralig'idan og'ir jarangli; ذ ning og'ir shakli",
    ziddi: ["Jahr", "Roxova", "Iste'lo", "Itbaq", "Ismat"],
    mustaqil: [],
  },
  "ع": {
    nomi: "Ayn", maxraj: "Halq o'rtasi — jarangli bo'g'iz, tomir siqilishi bilan",
    ziddi: ["Jahr", "Bayniyya", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "غ": {
    nomi: "G'ayn", maxraj: "Halq yuqorisi — jarangli sirpanish; خ ning jarangli shakli",
    ziddi: ["Jahr", "Roxova", "Iste'lo", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "ف": {
    nomi: "Fa", maxraj: "Shafatayn-tish — pastki lab va yuqori tishlar",
    ziddi: ["Hams", "Roxova", "Istefol", "Infitah", "Izlaq"],
    mustaqil: [],
  },
  "ق": {
    nomi: "Qof", maxraj: "Lison orqasi — til orqasi va tovush payi (uvula)",
    ziddi: ["Jahr", "Shidda", "Iste'lo", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Qalqala", izoh: "Sokin holda talaffuzda kuchli zarb bilan qo'shimcha jaranglash hosil bo'ladi" }],
  },
  "ك": {
    nomi: "Kof", maxraj: "Lison orqasi — til orqasi va yumshoq tanglay; ق dan biroz oldin",
    ziddi: ["Hams", "Shidda", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "ل": {
    nomi: "Lam", maxraj: "Lison yon — til chetlari tish milklari bilan",
    ziddi: ["Jahr", "Bayniyya", "Istefol", "Infitah", "Izlaq"],
    mustaqil: [{ nomi: "Inhiraf", izoh: "Til biroz yon tomonga og'ib chiqadi, havo yon tarafdan o'tadi" }],
  },
  "م": {
    nomi: "Mim", maxraj: "Shafatayn — ikki lab yopilib ochiladi; ب dan yumshoqroq",
    ziddi: ["Jahr", "Bayniyya", "Istefol", "Infitah", "Izlaq"],
    mustaqil: [],
  },
  "ن": {
    nomi: "Nun", maxraj: "Lison uchi — til uchi va oldingi tanglay, burun yo'lidan ham",
    ziddi: ["Jahr", "Bayniyya", "Istefol", "Infitah", "Izlaq"],
    mustaqil: [],
  },
  "ه": {
    nomi: "Ha (kichik)", maxraj: "Halq pastki — eng chuqur nafas tovushi",
    ziddi: ["Hams", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [],
  },
  "و": {
    nomi: "Wow", maxraj: "Shafatayn — ikki lab biroz dumaloqlanib, ochiqroq",
    ziddi: ["Jahr", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Lin", izoh: "Fathadagi harfdan keyin sokin kelganda yumshoq cho'zma tovush hosil bo'ladi (اَوْ)" }],
  },
  "ي": {
    nomi: "Ya", maxraj: "Lison o'rtasi — til o'rtasi yumshoq tanglayga yaqin",
    ziddi: ["Jahr", "Roxova", "Istefol", "Infitah", "Ismat"],
    mustaqil: [{ nomi: "Lin", izoh: "Fathadagi harfdan keyin sokin kelganda yumshoq cho'zma tovush hosil bo'ladi (اَيْ)" }],
  },
};

/* ── Har bir dars uchun kumulativ (jami) o'rganilgan sifatlar ── */
const _ALL = ["Jahr", "Hams", "Shidda", "Roxova", "Bayniyya", "Iste'lo", "Istefol", "Itbaq", "Infitah", "Izlaq", "Ismat"];
export const TAUGHT_SIFAT: Record<number, string[]> = {
  0:  [],
  1:  ["Jahr", "Hams"],
  2:  ["Jahr", "Hams", "Shidda", "Roxova", "Bayniyya"],
  3:  ["Jahr", "Hams", "Shidda", "Roxova", "Bayniyya", "Iste'lo", "Istefol"],
  4:  ["Jahr", "Hams", "Shidda", "Roxova", "Bayniyya", "Iste'lo", "Istefol", "Itbaq", "Infitah"],
  5:  _ALL, 6:  _ALL, 7:  _ALL, 8:  _ALL, 9:  _ALL,
  10: _ALL, 11: _ALL, 12: _ALL, 13: _ALL,
  14: _ALL, 15: _ALL, 16: _ALL, 17: _ALL, 18: _ALL, 19: _ALL,
  20: _ALL, 21: _ALL, 22: _ALL, 23: _ALL, 24: _ALL,
};

/* ── 14 darslik ma'lumot (0–13) ── */
export const DARSLAR: Dars[] = [
  {
    id: 0, nomi: "Arabtiliga Kirish", emoji: "📖",
    mavzu: {
      kirish: true,
      takroriy: "Bu kurs bo'yicha umumiy kirish — oldingi bilim talab qilinmaydi",
      yangiSifat: "Sifat tushunchasi: asliy/ziddi bor (11 ta juft) va mustaqil/ziddi yo'q (7 ta); ovoz pardasi — jarangli va nafsiz farqi",
      maxraj: "Maxraj nima? 5 asosiy zona: Jawf (og'iz bo'shlig'i), Halq/Tomoq (3 qism), Lison/Til (10 guruh), Shafatayn/Lablar (4 harf), Xayshum/Burun (g'unna)",
      amaliyot: "Ovoz pardasini qo'l bilan tekshirish usuli — bir qo'l bo'g'izga, ikkinchisi og'iz oldiga; أ، ب، ت harflari bilan birinchi tanishish",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Barcha 5 maxraj zonasiga umumiy kirish",
      tavsif: "Arab harflari 5 asosiy joydan chiqadi:\n• Jawf (og'iz bo'shlig'i) — 3 harf: ا، و، ي — hech qayerga urilmay to'g'ri chiqadi\n• Halq (tomoq) — 3 qism, 6 harf: أ، ه (pastki), ع، ح (o'rta), غ، خ (yuqori)\n• Lison (til) — 10 guruh, 18 harf: ق، ك، ج، ش، ي، ض، ل، ن، ر، ط، د، ت، ص، ز، س، ث، ذ، ظ\n• Shafatayn (lablar) — 4 harf: ف، ب، م، و\n• Xayshum (burun) — g'unna maxraji: ن va م maxsus holatlarda",
      yangiHarflar: "",
    },
    yangiHarflar: [],
  },
  {
    id: 1, nomi: "Jahr va Hams", emoji: "🔊",
    mavzu: {
      kirish: true,
      takroriy: "Arab alifbosi, 28 harf, yozuv yo'nalishi (o'ngdan chapga), harflarni ulash qoidalari",
      yangiSifat: "Jahr (الْجَهْر) — jarangli; Hams (الْهَمْس) — nafsiz",
      maxraj: "Halq (bo'g'iz/tomoq) — Arab harflari chiqadigan 5 zonadan biri; أ, ب, ت chiqish joylari",
      amaliyot: "أ (Hamza), ب (Ba), ت (Ta) — Jahr yoki Hams sifati + mustaqil sifatlar + maxraj",
    },
    yangiSifatlar: [
      {
        nomi: "Jahr", arNomi: "الْجَهْر",
        tavsif: "Harf talaffuz qilinganda ovoz payi titraydi — jarangli tovush hosil bo'ladi. 19 ta harf: أ، ب، ج، د، ذ، ر، ز، ض، ط، ظ، ع، غ، ق، ل، م، ن، و، ي (eslatma: جَهر هؤلاء — barcha jarangli harflar)",
        harflar: "أ ب ج د ذ ر ز ض ط ظ ع غ ق ل م ن و ي",
      },
      {
        nomi: "Hams", arNomi: "الْهَمْس",
        tavsif: "Harf talaffuz qilinganda ovoz payi titramaydі — nafas bilan (nafsiz) chiqadi. 10 ta harf: ف، ح، ث، ه، ش، خ، ص، س، ك، ت (eslatma: فحثه شخص سكت)",
        harflar: "ف ح ث ه ش خ ص س ك ت",
      },
    ],
    maxraj: {
      joy: "Halq (bo'g'iz/tomoq) — va boshqa chiqish joylari",
      tavsif: "Arabtilidagi harflar 5 asosiy joydan chiqadi: Jawf, Halq (bo'g'iz/tomoq), Lison (til), Shafatayn (ikki lab), Xayshum (burun). Bu darsda: أ — Halqning eng chuqur nuqtasidan (bo'g'izdan to'liq to'xtash bilan); ب — Shafatayn (ikki lab yopilib-ochilish bilan); ت — Lison uchi (til uchi yuqori tishlarning ichki tomoniga tegadi).",
      yangiHarflar: "أ، ب، ت",
    },
    yangiHarflar: ["أ", "ب", "ت"],
  },
  {
    id: 2, nomi: "Shidda va Roxova", emoji: "💪",
    mavzu: {
      takroriy: "1-dars: Jahr (19 harf: أ ب ج...), Hams (10 harf: ف ح ث...); أ، ب، ت harflari",
      yangiSifat: "Shidda (الشِّدَّة) — keskin to'xtash; Roxova (الرَّخَاوَة) — erkin oqish; Bayniyya (الْبَيْنِيَّة) — o'rta",
      maxraj: "Lison uchi — ث (tish oralig'i); Lison o'rtasi — ج (til o'rtasi va tanglay)",
      amaliyot: "أ، ب، ت، ث، ج — 5 harf; Jahr/Hams + Shidda/Roxova nuqtai nazaridan",
    },
    yangiSifatlar: [
      {
        nomi: "Shidda", arNomi: "الشِّدَّة",
        tavsif: "Harf talaffuz qilinganda havo oqimi to'liq to'xtab, so'ngra keskin chiqadi. 8 ta harf: أ، ج، د، ق، ط، ب، ك، ت (eslatma: أجد قط بكت)",
        harflar: "أ ج د ق ط ب ك ت",
      },
      {
        nomi: "Roxova", arNomi: "الرَّخَاوَة",
        tavsif: "Harf talaffuz qilinganda havo oqimi erkin o'tib, tovush uzayishi mumkin. 15 ta harf: ث، ح، خ، ذ، ز، س، ش، ص، ض، ظ، غ، ف، ه، و، ي",
        harflar: "ث ح خ ذ ز س ش ص ض ظ غ ف ه و ي",
      },
      {
        nomi: "Bayniyya", arNomi: "الْبَيْنِيَّة",
        tavsif: "Shidda va Roxova orasidagi o'rta holat — havo qisman to'xtaydi. 5 ta harf: ع، ل، م، ن، ر (eslatma: عمر لين)",
        harflar: "ع ل م ن ر",
      },
    ],
    maxraj: {
      joy: "Lison uchi va Lison o'rtasi",
      tavsif: "ث — til uchi pastki va yuqori tishlar orasidan chiqadi (Hams+Roxova); ج — til o'rtasi va oldingi yumshoq tanglay birlashgan joydan chiqadi (Jahr+Shidda).",
      yangiHarflar: "ث، ج",
    },
    yangiHarflar: ["ث", "ج"],
  },
  {
    id: 3, nomi: "Iste'lo va Istefol", emoji: "⬆️",
    mavzu: {
      takroriy: "2-dars: Shidda (أ ب ت ج...), Roxova, Bayniyya; ث، ج harflari; jami 5 harf",
      yangiSifat: "Iste'lo (الاِسْتِعْلَاء) — til ko'tarilishi; Istefol (الاِسْتِفَال) — til pastligi",
      maxraj: "Halq — bo'g'izning uch qismi; ح va خ harflari",
      amaliyot: "أ، ب، ت، ث، ج، ح، خ — 7 harf; barcha o'rganilgan sifatlar bilan",
    },
    yangiSifatlar: [
      {
        nomi: "Iste'lo", arNomi: "الاِسْتِعْلَاء",
        tavsif: "Harf talaffuz qilinganda til orqasi tanglay tomon ko'tariladi — 'og'ir' harflar. 7 ta harf: خ، ص، ض، ط، ظ، غ، ق (eslatma: خص ضغط ظق)",
        harflar: "خ ص ض ط ظ غ ق",
      },
      {
        nomi: "Istefol", arNomi: "الاِسْتِفَال",
        tavsif: "Harf talaffuz qilinganda til pastga tushgan holda qoladi — 'yengil' harflar. Qolgan 21 ta harf Istefol guruhiga kiradi.",
        harflar: "أ ب ت ث ج ح د ذ ر ز س ش ع ف ك ل م ن ه و ي",
      },
    ],
    maxraj: {
      joy: "Halq (bo'g'iz) — uch qism",
      tavsif: "Halq 3 qismga bo'linadi: pastki (أ, ه), o'rta (ع, ح) va yuqori (غ, خ). Bu darsda: ح — halq o'rtasidan nafas bilan (Hams+Roxova+Istefol); خ — halq yuqorisidan sirpanish tovushi bilan (Hams+Roxova+Iste'lo).",
      yangiHarflar: "ح، خ",
    },
    yangiHarflar: ["ح", "خ"],
  },
  {
    id: 4, nomi: "Itbaq va Infitah", emoji: "🔒",
    mavzu: {
      takroriy: "3-dars: Iste'lo (خ ص ض ط ظ غ ق), Istefol; ح، خ harflari; jami 7 harf",
      yangiSifat: "Itbaq (الإِطْبَاق) — yopilish (til+tanglay); Infitah (الاِنْفِتَاح) — ochiqlik",
      maxraj: "Lison uchi — til uchi tish orqasidan; د va ذ harflari",
      amaliyot: "أ–خ، د، ذ — 9 harf; barcha o'rganilgan sifatlar bilan",
    },
    yangiSifatlar: [
      {
        nomi: "Itbaq", arNomi: "الإِطْبَاق",
        tavsif: "Harf talaffuz qilinganda til orqasi tanglay bilan mahkam yopiladi — og'ir to'siq hosil bo'ladi. Faqat 4 ta harf: ص، ض، ط، ظ",
        harflar: "ص ض ط ظ",
      },
      {
        nomi: "Infitah", arNomi: "الاِنْفِتَاح",
        tavsif: "Harf talaffuz qilinganda til va tanglay orasida ochiqlik saqlanadi — 'ochiq' harflar. Qolgan 24 ta harf Infitah guruhiga kiradi.",
        harflar: "أ ب ت ث ج ح خ د ذ ر ز س ش ع غ ف ق ك ل م ن ه و ي",
      },
    ],
    maxraj: {
      joy: "Lison uchi — tish orqasi",
      tavsif: "د — til uchi yuqori tishlarning orqa tomoni bilan (ت ga o'xshash, lekin Jahr); ذ — til uchi pastki va yuqori tishlar orasidan, jarangli (ث ning jarangli shakli — Jahr+Roxova).",
      yangiHarflar: "د، ذ",
    },
    yangiHarflar: ["د", "ذ"],
  },
  {
    id: 5, nomi: "Izlaq va Ismat", emoji: "🌊",
    mavzu: {
      takroriy: "4-dars: Itbaq (ص ض ط ظ), Infitah; د، ذ harflari; jami 9 harf; endi barcha 5 juft sifat o'rganildi",
      yangiSifat: "Izlaq (الإِذْلَاق) — oson chiqish; Ismat (الإِصْمَات) — to'siqli chiqish",
      maxraj: "Lison uchi — ر ning titrab talaffuzi va ز ning Safir sifati",
      amaliyot: "أ–ذ، ر، ز — 11 harf; barcha 5 juft sifat + mustaqil sifatlar",
    },
    yangiSifatlar: [
      {
        nomi: "Izlaq", arNomi: "الإِذْلَاق",
        tavsif: "Harf talaffuz qilinganda til uchi yoki lab uchidan osonlik bilan chiqadi — oqilona chiqish. 6 ta harf: ف، ر، م، ل، ن، ب (eslatma: فر من لب)",
        harflar: "ف ر م ل ن ب",
      },
      {
        nomi: "Ismat", arNomi: "الإِصْمَات",
        tavsif: "Chiqishi nisbatan qiyinroq — ko'proq til ichiga kirib talaffuz qilinadi. Qolgan 22 ta harf Ismat guruhiga kiradi.",
        harflar: "أ ت ث ج ح خ د ذ ز س ش ص ض ط ظ ع غ ق ك ه و ي",
      },
    ],
    maxraj: {
      joy: "Lison uchi — Ra va Zayn",
      tavsif: "ر — til uchi tish milkiga tez-tez tegib tebranadi (Jahr+Bayniyya+Izlaq; mustaqil: Inhiraf, Takrir); ز — til uchi va tish orasidan jarangli sifildirilgan tovush (Jahr+Roxova+Izlaq→Ismat; mustaqil: Safir).",
      yangiHarflar: "ر، ز",
    },
    yangiHarflar: ["ر", "ز"],
  },
  {
    id: 6, nomi: "Sin va Shin", emoji: "🐍",
    mavzu: {
      takroriy: "5-dars: Izlaq (ف ر م ل ن ب), Ismat; ر، ز harflari; barcha 5 juft sifat to'liq o'rganildi",
      yangiSifat: "Barcha 5 juft sifat mustahkamlash: Jahr/Hams, Shidda/Roxova, Iste'lo/Istefol, Itbaq/Infitah, Izlaq/Ismat",
      maxraj: "Lison uchi — Sin (Safir); Lison o'rtasi — Shin (Tafasshi)",
      amaliyot: "أ–ز، س، ش — 13 harf; mustaqil sifat: Safir (ز، س) va Tafasshi (ش)",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Lison uchi (Sin) va Lison o'rtasi (Shin)",
      tavsif: "س — til uchi va tish orasidan nafsiz sifildirilgan tovush (Hams+Roxova+Istefol+Infitah+Ismat; mustaqil: Safir); ش — til o'rtasi keng tarqalgan nafsiz tovush (Hams+Roxova+Istefol+Infitah+Ismat; mustaqil: Tafasshi).",
      yangiHarflar: "س، ش",
    },
    yangiHarflar: ["س", "ش"],
  },
  {
    id: 7, nomi: "Sod va Zod", emoji: "⚖️",
    mavzu: {
      takroriy: "6-dars: Sin va Shin; Safir (ز، س), Tafasshi (ش); jami 13 harf",
      yangiSifat: "Mustahkamlash: ص — Hams+Roxova+Iste'lo+Itbaq+Ismat+Safir; ض — Jahr+Roxova+Iste'lo+Itbaq+Ismat+Istitola",
      maxraj: "Lison uchi (Sod) va Lison yon tomoni (Zod)",
      amaliyot: "أ–ش، ص، ض — 15 harf",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Lison uchi va Lison yoni",
      tavsif: "ص — til uchi va tish yaqinida og'ir mahkam sibilyant (Hams+Roxova+Iste'lo+Itbaq+Ismat; mustaqil: Safir); ض — til yon tomoni orqa tishlar bilan, og'ir jarangli (Jahr+Roxova+Iste'lo+Itbaq+Ismat; mustaqil: Istitola).",
      yangiHarflar: "ص، ض",
    },
    yangiHarflar: ["ص", "ض"],
  },
  {
    id: 8, nomi: "To va Zo", emoji: "🏋️",
    mavzu: {
      takroriy: "7-dars: Sod va Zod; Safir (ص), Istitola (ض); jami 15 harf",
      yangiSifat: "Mustahkamlash: ط — Jahr+Shidda+Iste'lo+Itbaq+Ismat+Qalqala; ظ — Jahr+Roxova+Iste'lo+Itbaq+Ismat",
      maxraj: "Lison uchi — tish bilan; og'ir harflar",
      amaliyot: "أ–ض، ط، ظ — 17 harf",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Lison uchi — tish bilan (og'ir)",
      tavsif: "ط — til uchi yuqori tishlar bilan, og'ir keskin (Jahr+Shidda+Iste'lo+Itbaq+Ismat; mustaqil: Qalqala); ظ — til uchi tish oralig'idan og'ir jarangli (Jahr+Roxova+Iste'lo+Itbaq+Ismat — ذ ning og'ir shakli).",
      yangiHarflar: "ط، ظ",
    },
    yangiHarflar: ["ط", "ظ"],
  },
  {
    id: 9, nomi: "Ayn va G'ayn", emoji: "👁️",
    mavzu: {
      takroriy: "8-dars: To va Zo; og'ir lison harflari; jami 17 harf",
      yangiSifat: "Mustahkamlash: ع — Jahr+Bayniyya+Istefol+Infitah+Ismat; غ — Jahr+Roxova+Iste'lo+Infitah+Ismat",
      maxraj: "Halq o'rtasi (Ayn) va Halq yuqorisi (G'ayn)",
      amaliyot: "أ–ظ، ع، غ — 19 harf",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Halq o'rtasi va Halq yuqorisi",
      tavsif: "ع — halq o'rtasida tomir qisqarishi bilan jarangli (Jahr+Bayniyya+Istefol+Infitah+Ismat); غ — halq yuqorisida sirpanish tovushi bilan (Jahr+Roxova+Iste'lo+Infitah+Ismat — خ ning jarangli shakli).",
      yangiHarflar: "ع، غ",
    },
    yangiHarflar: ["ع", "غ"],
  },
  {
    id: 10, nomi: "Fa va Qof", emoji: "💨",
    mavzu: {
      takroriy: "9-dars: Ayn va G'ayn; halq o'rta va yuqorisi; jami 19 harf",
      yangiSifat: "Mustahkamlash: ف — Hams+Roxova+Istefol+Infitah+Izlaq; ق — Jahr+Shidda+Iste'lo+Infitah+Ismat+Qalqala",
      maxraj: "Shafatayn-tish (Fa) va Lison orqasi (Qof)",
      amaliyot: "أ–غ، ف، ق — 21 harf",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Shafatayn-tish va Lison orqasi",
      tavsif: "ف — pastki lab va yuqori tishlar birga (Hams+Roxova+Istefol+Infitah+Izlaq); ق — til orqasi va uvula (tovush payi) birlashgan joydan chuqur (Jahr+Shidda+Iste'lo+Infitah+Ismat; mustaqil: Qalqala).",
      yangiHarflar: "ف، ق",
    },
    yangiHarflar: ["ف", "ق"],
  },
  {
    id: 11, nomi: "Kof va Lam", emoji: "🗝️",
    mavzu: {
      takroriy: "10-dars: Fa va Qof; shafatayn-tish va lison orqasi; jami 21 harf",
      yangiSifat: "Mustahkamlash: ك — Hams+Shidda+Istefol+Infitah+Ismat; ل — Jahr+Bayniyya+Istefol+Infitah+Izlaq+Inhiraf",
      maxraj: "Lison orqasi (Kof) va Lison yoni (Lam)",
      amaliyot: "أ–ق، ك، ل — 23 harf",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Lison orqasi va Lison yoni",
      tavsif: "ك — til orqasi va yumshoq tanglay (ق dan biroz oldinda, Hams+Shidda+Istefol+Infitah+Ismat); ل — til chetlari tish milklari bilan, havo yon tomondan o'tadi (Jahr+Bayniyya+Istefol+Infitah+Izlaq; mustaqil: Inhiraf).",
      yangiHarflar: "ك، ل",
    },
    yangiHarflar: ["ك", "ل"],
  },
  {
    id: 12, nomi: "Mim va Nun", emoji: "🫦",
    mavzu: {
      takroriy: "11-dars: Kof va Lam; lison orqasi va yoni; jami 23 harf",
      yangiSifat: "Mustahkamlash: م — Jahr+Bayniyya+Istefol+Infitah+Izlaq; ن — Jahr+Bayniyya+Istefol+Infitah+Izlaq",
      maxraj: "Shafatayn (Mim) va Xayshum+Lison uchi (Nun)",
      amaliyot: "أ–ل، م، ن — 25 harf",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Shafatayn va Xayshum",
      tavsif: "م — ikki lab yopilib ochiladi, burun rezonansida (Jahr+Bayniyya+Istefol+Infitah+Izlaq); ن — til uchi oldingi tanglay bilan, burun yo'lidan ham o'tadi — Xayshum ta'siri (Jahr+Bayniyya+Istefol+Infitah+Izlaq).",
      yangiHarflar: "م، ن",
    },
    yangiHarflar: ["م", "ن"],
  },
  {
    id: 13, nomi: "Ha, Wow va Ya", emoji: "🌟",
    mavzu: {
      takroriy: "12-dars: Mim va Nun; shafatayn va xayshum; jami 25 harf",
      yangiSifat: "Mustahkamlash: ه — Hams+Roxova+Halq; و va ي — Lin sifati (ziddi yo'q)",
      maxraj: "Halq pastki (Ha), Shafatayn (Wow) va Lison o'rtasi (Ya)",
      amaliyot: "Barcha 28 harf — to'liq arab alifbosi! و va ي ning Lin sifatiga alohida e'tibor",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Halq pastki, Shafatayn va Lison o'rtasi",
      tavsif: "ه — eng chuqur halqdan nafsiz nafas tovushi (Hams+Roxova+Istefol+Infitah+Ismat); و — ikki lab dumaloqlanib biroz ochiqroq (Jahr+Roxova+Istefol+Infitah+Ismat; mustaqil: Lin); ي — til o'rtasi yumshoq tanglayga yaqin (Jahr+Roxova+Istefol+Infitah+Ismat; mustaqil: Lin).",
      yangiHarflar: "ه، و، ي",
    },
    yangiHarflar: ["ه", "و", "ي"],
  },

  /* ── 1-bosqich: Tajwid qoidalari (14–23) ── */
  {
    id: 14, nomi: "Hamza Turlari", emoji: "ء",
    mavzu: {
      maxraj: "Arabchada ء (hamza) harfi bo'g'izdan chiqadigan to'xtatish tovushi. Ikki xil bo'ladi: har doim o'qiladigan va ulanganda o'qilmaydigan.",
      amaliyot: "أَعُوذُ بِاللَّهِ — قُلْ أَعُوذُ — إِيَّاكَ نَعْبُدُ — بِسْمِ اللَّهِ kabi oyatlarda hamzalarni toping",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Halq yuqori qismi",
      tavsif: "Hamza (ء) bo'g'izdan chiqadigan to'xtatish tovushi. 2 asosiy turi: har doim o'qiladigan va ulanganda o'qilmaydigan.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "Har doim o'qiladigan hamza",
        arNomi: "هَمْزَةُ القَطْعِ",
        shart: "So'z boshida, o'rtasida yoki oxirida ء yozilgan bo'lsa",
        tavsif: "Ba'zi so'zlarda ء (hamza) harfi yoziladi — bu harf har doim o'qiladi. Oldingi so'z bilan ulashilsa ham, alohida o'qilsa ham o'zgarishi yo'q. Shu hamzani ko'rsangiz — doim o'qing.\n\nMisol: أَعُوذُ da birinchi harf hamza — doim o'qiladi. أَحَدٌ, إِيَّاكَ, أَكَلَ — hammasida hamza doim eshitiladi.",
        harflar: "أ إ آ ؤ ئ ء",
        misol: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nقُلْ هُوَ اللَّهُ أَحَدٌ",
      },
      {
        nomi: "Ulanganda o'qilmaydigan hamza",
        arNomi: "هَمْزَةُ الوَصْلِ",
        shart: "الـ yoki بِاسْمِ kabi so'zlarda — oldidan harakat kelsa tushib qoladi",
        tavsif: "Ba'zi so'zlar alif (ا) bilan boshlanadi. Bu alif so'zni yolg'iz boshlash uchun kerak. Lekin oldingi so'z bilan birikib o'qilganda — bu alif eshitilmaydi, oldingi so'zning oxirgi tovushi bevosita davom etadi.\n\nMasalan: بِسْمِ اللَّهِ da 'bismillahi' deymiz — 'allahi' ning 'a' si eshitilmaydi, chunki 'mi' harakati uni egallaydi.\n\nYodlang: mushafda bunday alif ustida hamza belgisi (ء) bo'lmaydi.",
        misol: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nمِنَ النَّاسِ — minan-naas\nفِي الْأَرْضِ — fil-ardhi\nرَبِّ الْعَالَمِينَ — rabbil-'aalamiin",
      },
    ],
  },
  {
    id: 15, nomi: "Ta Marbuta", emoji: "ة",
    mavzu: {
      maxraj: "So'z oxiridagi ة (ta marbuta) harakatli bo'lganda 't', to'xtalib o'qilganda 'h' deb talaffuz qilinadi.",
      amaliyot: "رَحْمَةُ اللَّهِ — جَنَّةٌ — سُورَةُ الْبَقَرَةِ kabi so'zlarda ta marbutani toping va to'g'ri o'qing",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Lison uchi + yuqori tish (ت ning maxraji)",
      tavsif: "Ta Marbuta (ة) so'z oxirida ishlatiladigan maxsus shakl. Harakali: t. Vaqfda: h.",
      yangiHarflar: "ة",
    },
    yangiHarflar: ["ة"],
    tajwidQoidalar: [
      {
        nomi: "ة — davom etib o'qilganda 't' bo'ladi",
        arNomi: "التَّاءُ المَرْبُوطَة — حَالَةُ الوَصْل",
        shart: "ة dan keyin so'z davom etsa yoki harakali bo'lsa",
        tavsif: "رَحْمَةُ اللَّهِ kabi birikib o'qiladigan iboralarda ة harfi 't' deb o'qiladi — 'rahmatullahi'. Bu faqat ة dan keyin so'z davom etganda bo'ladi.\n\nQuronni uzluksiz o'qiyotganda bu holat ko'p uchraydi. Harakat bilan (َ ِ ُ) yozilgan ة ni ko'rsangiz — 't' deb o'qing.",
        misol: "رَحْمَةُ اللَّهِ وَبَرَكَاتُهُ — rahmatullahi wa barakaatuh\nنِعْمَةَ اللَّهِ — ni'matallahi\nسُنَّةَ اللَّهِ — sunnatallahi\nحِكْمَةُ اللَّهِ — hikmatullahi",
      },
      {
        nomi: "ة — to'xtalib o'qilganda 'h' bo'ladi",
        arNomi: "التَّاءُ المَرْبُوطَة — حَالَةُ الوَقْف",
        shart: "ة da to'xtalib o'qilganda",
        tavsif: "Nafas olib to'xtalganingizda — shu so'zdagi ة harfi 'h' deb o'qiladi. Masalan جَنَّةٌ da to'xtalib o'qisangiz 'jannah' eshitiladi, 'jannat' emas.\n\nSurani yoki oyatni tugatganingizda, nafas olish uchun to'xtalganingizda — oxiridagi ة doim 'h' bo'ladi. Bu qoida istisnosiz ishlaydi.",
        misol: "جَنَّةٌ → جَنَّهْ (jannah)\nرَحْمَةٌ → رَحْمَهْ (rahmah)\nنِعْمَةٌ → نِعْمَهْ (ni'mah)\nسُورَةٌ → سُورَهْ (suurah)\nالْبَقَرَةُ → الْبَقَرَهْ (al-baqarah)\nآيَةٌ → آيَهْ (aayah)",
      },
    ],
  },
  {
    id: 16, nomi: "Madd — Cho'zish", emoji: "〰️",
    mavzu: {
      maxraj: "Arabchada ا و ي cho'zish harflari. Cho'zish uzunligi keyingi harfga qarab o'zgaradi — 2 ta, 4 ta yoki 5 ta harf uzunligi.",
      amaliyot: "الرَّحْمَنِ الرَّحِيمِ — مَالِكِ يَوْمِ الدِّينِ — قُلْ هُوَ اللَّهُ أَحَدٌ kabi oyatlarda cho'zishlarni sanab o'qing",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Jawf — og'iz bo'shlig'idan erkin chiquvchi 3 harf",
      tavsif: "Madd harflari 3 ta: ا و ي. Cho'zish uzunligi keyingi harfga qarab o'zgaradi.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "Oddiy cho'zish — 2 harf uzunligi",
        arNomi: "المَدُّ الطَّبِيعِي",
        shart: "ا و ي dan keyin hamza (ء) yoki sukun (ْ) bo'lmasa",
        tavsif: "Arabchada cho'zish belgilari 3 ta: ا (aa), و (uu), ي (ii). Ular oldidagi harfga qarab o'qiladi. Agar cho'zish harfidan keyin hamza yoki sukun kelmasa — 2 ta harf uzunligida cho'zilib o'qiladi.\n\nBu eng ko'p uchraydigan cho'zish. Quronning deyarli har oyatida bor. Sanash uchun ikkita barmoq — 'aa', 'uu', 'ii'.",
        harflar: "ا و ي",
        misol: "الرَّحْمَنِ الرَّحِيمِ — ar-rahmaan, ar-rahiim\nمَالِكِ يَوْمِ الدِّينِ — maalik, yawm, diin\nصِرَاطَ الَّذِينَ — laziina\nيَقُولُ — yaquul (و cho'zish)\nقَالَ — qaala (ا cho'zish)",
      },
      {
        nomi: "Bitta so'z ichida hamza kelsa — 4-5 harf uzunligi",
        arNomi: "المَدُّ الوَاجِبُ المُتَّصِل",
        shart: "Bitta so'zda: cho'zish harfi + ء",
        tavsif: "Cho'zish harfidan keyin o'sha so'zning ichida hamza (ء) kelsa — cho'zish uzayadi: 4 yoki 5 harf uzunligi. Bu cho'zish majburiy — qisqartirish bo'lmaydi.\n\nSanash: to'rt yoki besh barmoq — 'aaaa' yoki 'aaaaa'. Qur'on o'qishda juda ko'p uchraydi.",
        harflar: "ا و ي + ء",
        misol: "جَاءَ بِالْحَقِّ — jaaaa'a bil-haqq\nالسَّمَاءِ — as-samaaa'i\nشَيْءٌ — shayyyy'\nجِيءَ بِالنَّبِيِّينَ — jiiii'a\nسُوءَ الْعَذَابِ — suuuu'al-'azaab",
      },
      {
        nomi: "Ikki so'z orasida hamza kelsa — 4-5 harf uzunligi",
        arNomi: "المَدُّ الجَائِزُ المُنفَصِل",
        shart: "So'z cho'zish harfi bilan tugab, keyingi so'z ء bilan boshlanса",
        tavsif: "Birinchi so'z cho'zish harfiga tugasa va keyingi so'z hamza bilan boshlansa — cho'zish yene uzayadi: 4 yoki 5 harf. Oyat o'qishda bu holat juda ko'p uchraydi.\n\nIkki so'z bo'lsa ham — cho'zish uzaydi. Buni eslab qolish uchun: 'So'z chegarasida hamza kelsa — cho'zaman'.",
        misol: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ — innaaaa a'taynaak\nوَمَا أَنزَلْنَا — wamaaa anzalnaa\nقُوا أَنفُسَكُمْ — quuuu anfusakum\nإِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ — inniiiii a'lam",
      },
    ],
  },
  {
    id: 17, nomi: "Tanvin — Yashirin N", emoji: "◌ٌ",
    mavzu: {
      maxraj: "So'z oxiridagi ikki harakat belgisi (ًً ٍ ٌ) yashirin 'n' tovushi. U faqat bo'g'iz harflari (أ ه ع ح غ خ) oldida aniq eshitiladi.",
      amaliyot: "عَلِيمٌ حَكِيمٌ — سَمِيعٌ عَلِيمٌ — غَفُورٌ رَحِيمٌ kabi iboralarda tanvinni topib aniq o'qing",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Burun (g'unna) — tanvinning asosi",
      tavsif: "Tanvin so'z oxirida yashirin n tovushi. 3 turi: ًً (-an), ٍ (-in), ٌ (-un).",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "Tanvin nima va uning 3 ko'rinishi",
        arNomi: "أَنْوَاعُ التَّنْوِين",
        shart: "So'z oxirida ikki harakat belgisi (ًً ٍ ٌ) bo'lsa",
        tavsif: "Arabcha so'z oxirida ikki harakat belgisi yozilsa — bu 'tanvin'. U so'z oxirida yashirin 'n' tovushi hosil qiladi. Uch ko'rinishi bor:\n\n• ًً (fathatayni) — so'z 'an' bilan tugaydi: كِتَابًا → kitaaban\n• ٍ (kasratayni) — so'z 'in' bilan tugaydi: كِتَابٍ → kitaabin\n• ٌ (dammatayni) — so'z 'un' bilan tugaydi: كِتَابٌ → kitaabun\n\nQuronni o'qiganda bu belgilarni ko'rsangiz — oxirida 'n' tovushi qo'shing.",
        misol: "رَحِيمٌ — rahiimun\nكَرِيمًا — kariiman\nعَلِيمٍ — aliimin\nاللَّهُ غَفُورٌ رَّحِيمٌ — ghafuurun rahiim\nوَكَانَ اللَّهُ سَمِيعًا بَصِيرًا — samii'an basiiraa",
      },
      {
        nomi: "Tanvin + bo'g'iz 6 harf — 'n' aniq eshitiladi",
        arNomi: "الإِظْهَار الحَلْقِي",
        shart: "Tanvin + أ ه ع ح غ خ",
        tavsif: "Tanvin belgisidan keyingi so'z quyidagi 6 harfdan biri bilan boshlansa — yashirin 'n' tovushi aniq va to'liq eshitiladi: أ ه ع ح غ خ.\n\nNima uchun? Bu 6 harf bo'g'iz (tomoq)dan chiqadi. 'N' esa burundan chiqadi. Ular bir-biriga o'xshamasligi sababli 'n' qo'shilmaydi — alohida-alohida eshitiladi.\n\nMasalan: عَلِيمٌ حَكِيمٌ — 'aliimun hakiim' — 'un' da 'n' aniq eshitiladi.",
        harflar: "أ ه ع ح غ خ",
        misol: "عَلِيمٌ حَكِيمٌ — aliimun hakiim\nسَمِيعٌ عَلِيمٌ — samii'un 'aliim\nغَفُورٌ حَلِيمٌ — ghafuurun haliim\nعَزِيزٌ حَكِيمٌ — 'aziizun hakiim\nوَاسِعٌ عَلِيمٌ — waasi'un 'aliim\nرَحِيمٌ أَلِيمٌ — rahiimun aliim",
      },
    ],
  },
  {
    id: 18, nomi: "Sukun", emoji: "◌ْ",
    mavzu: {
      maxraj: "Sukun (ْ) belgisi harfning harakatsiz ekanini bildiradi. Sokin 'n' (نْ) va sokin 'm' (مْ) harflari bo'g'iz 6 harfi oldida aniq o'qiladi.",
      amaliyot: "نَعْبُدُ — مِنْ أَهْلِ — هُمْ يَعْلَمُونَ — أَنعَمْتَ kabi oyatlarda sukun va sokin harflarni toping",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Sukun — har harf o'z o'rnida harakatsiz talaffuz qilinadi",
      tavsif: "Sukun (ْ) harakatsizlik belgisi. Sokin n va m bo'g'iz 6 harfi oldida aniq o'qiladi.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "Sukun — harakatsiz harf qanday o'qiladi",
        arNomi: "السُّكُون",
        shart: "Harfning ustida (ْ) belgisi bo'lsa",
        tavsif: "Arabcha harflarning ustida (ْ) belgisi bo'lsa — bu harf harakatsiz. Ya'ni u 'a', 'i', 'u' tovushlarisiz, qisqacha va aniq aytiladi. Keyingisiga cho'zilmaydi, uzaymaydi.\n\nMasalan: نَعْبُدُ da عْ sokin — 'na'-budu' deb o'qiladi. يَذْهَبُ da ذْ sokin — 'yazh-habu'.\n\nQuronni o'qiganda sukunni ko'rsangiz — o'sha harfni qisqacha aytib, darhol keyingi harfga o'ting.",
        misol: "نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ — na'-budu\nأَنعَمْتَ — an-'am-ta\nإِيَّاكَ — iy-yaaka\nوَلَمْ يَكُن لَّهُ — walam yakun\nصِرَاطَ الْمُسْتَقِيمَ — mustaqiim",
      },
      {
        nomi: "Sokin 'n' (نْ) + bo'g'iz 6 harf — 'n' aniq o'qiladi",
        arNomi: "إِظْهَارُ النُّونِ السَّاكِنَة",
        shart: "نْ + أ ه ع ح غ خ",
        tavsif: "So'z ichida yoki oxirida نْ ko'rsangiz va undan keyingi harf أ ه ع ح غ خ dan biri bo'lsa — 'n' ni aniq va to'liq o'qing. Burundan hech narsa qo'shilmaydi, harf-harf alohida eshitiladi.\n\nNima uchun? Bu 6 harf bo'g'izdan chiqadi, sokin 'n' esa burundan. Ular bir-biriga birikib ketmaydi — alohida qoladi.\n\nEslash usuli: bo'g'iz harflari oldida — 'n' aniq.",
        harflar: "أ ه ع ح غ خ",
        misol: "مِنْ أَهْلِ الْكِتَابِ — min ahli\nمِنْ عِلْمٍ إِلَّا مَا شَاءَ اللَّهُ — min ilmin\nمَنْ هَدَى اللَّهُ — man hadaa\nعَنْ أَنفُسِكُمْ — 'an anfusikum\nمِنْ حَوْلِهِ — min haulih\nمِنْ هَادٍ — min haadin",
      },
      {
        nomi: "Sokin 'm' (مْ) + bo'g'iz 6 harf emas — 'm' aniq o'qiladi",
        arNomi: "الإِظْهَار الشَّفَوِي",
        shart: "مْ + م va ب dan boshqa barcha harflar",
        tavsif: "So'z ichida yoki oxirida مْ ko'rsangiz va keyingisi م yoki ب bo'lmasa — 'm' ni aniq va to'liq o'qing. Hech narsa qo'shilmaydi.\n\nQuronni o'qiganda هُمْ so'zi juda ko'p uchraydi. هُمْ يَعْلَمُونَ — 'hum ya'lamuun' — 'm' aniq eshitiladi.",
        misol: "هُمْ يَعْلَمُونَ — hum ya'lamuun\nلَهُمْ فِيهَا خَالِدُونَ — lahum fiihaa\nعَلَيْهِمْ غَيْرِ — 'alayhim ghayri\nوَهُمْ فِيهَا خَالِدُونَ — wahum\nأَنعَمْتَ عَلَيْهِمْ — an'amta 'alayhim\nوَلَهُمْ عَذَابٌ — walahum 'azaab",
      },
    ],
  },
  {
    id: 19, nomi: "Qalqala — Zarb Tovushi", emoji: "⚡",
    mavzu: {
      maxraj: "5 harf: ق ط ب ج د — sokin holda zarb-echo tovushi chiqaradi. So'z ichida kichik, so'z oxirida kuchli zarb.",
      amaliyot: "نَعْبُدُ — خَلَقَ — لَمْ يَلِدْ — قُلْ هُوَ اللَّهُ أَحَدٌ kabi oyatlarda zarb tovushini toping va kuchaytiring",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Har xil o'rinlar — lekin barchasida zarb-echo bor",
      tavsif: "5 harf: ق ط ب ج د — sokin holda echo (zarb) tovushi hosil qiladi.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "Zarb tovushi — so'z ichida (kichik zarb)",
        arNomi: "القَلْقَلَة الصُّغْرَى",
        shart: "ق ط ب ج د dan biri so'z ichida sokin bo'lsa",
        tavsif: "5 harf bor: ق ط ب ج د. Bu harflarni yodlash uchun 'qutb jad' deb eslab qoling.\n\nBu harflar so'z ichida sukun belgisi (ْ) bilan kelganda — harf aytilgandan keyin kuchli zarb-echo tovushi chiqadi. Oddiy harfdan farqli — go'yo harf zarb bilan chiqib ketadi.\n\nMasalan: نَعْبُدُ da بْ bor — 'na'-budu' deganda 'b' dan keyin kichik zarb eshitiladi.",
        harflar: "ق ط ب ج د",
        misol: "نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ — na'-budu (ب zarb)\nيَطْمَعُ — yaT-ma'u (ط zarb)\nاقْتَرَبَ الْأَمْرُ — iqtaraba (ق zarb)\nخَلَقْنَا الْإِنسَانَ — khalaq-naa (ق zarb)\nوَمَن يَتَّبِعْ — yattaBI' (ب zarb)",
      },
      {
        nomi: "Zarb tovushi — so'z oxirida (kuchli zarb)",
        arNomi: "القَلْقَلَة الكُبْرَى",
        shart: "ق ط ب ج د dan biri so'z oxirida to'xtab o'qilsa",
        tavsif: "Shu 5 harf: ق ط ب ج د — so'z oxirida yoki to'xtab o'qilganda zarb tovushi ancha kuchliroq eshitiladi. Surani tugagan joyida yoki oyat oxirida to'xtalganingizda bu zarb aniq sezilishi kerak.\n\nMasalan: قُلْ هُوَ اللَّهُ أَحَدٌ surasini o'qib أَحَدٌ da to'xtalganingizda — 'ahaD' deb kuchli zarb bilan tugaydi. Eshituvchi zarb tovushini aniq sezishi kerak.",
        harflar: "ق ط ب ج د",
        misol: "قُلْ هُوَ اللَّهُ أَحَدٌ — ahaD (kuchli D zarbi)\nلَمْ يَلِدْ وَلَمْ يُولَدْ — yaliD, yuulaD\nخَلَقَ — khalaQ (kuchli Q)\nوَتَبَّ — wataB-B (kuchli B)\nبِالْحَقِّ — bil-haqQ",
      },
    ],
  },
  {
    id: 20, nomi: "Lam Shamsiyya va Qomariyya", emoji: "☀️",
    mavzu: {
      maxraj: "'الـ' (al) dan keyingi harfga qarab: ba'zi harflar oldida 'l' eshitilmaydi (quyosh), ba'zilarida eshitiladi (oy).",
      amaliyot: "الْحَمْدُ لِلَّهِ — الرَّحْمَنِ الرَّحِيمِ — مَالِكِ يَوْمِ الدِّينِ kabi oyatlarda 'l' eshitilganini va eshitilmaganini farqlang",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Lison uchi + tish pastki tomoni (ل ning o'rni)",
      tavsif: "الـ artikli ikki xil o'qiladi: Shamsiyya — l eshitilmaydi; Qomariyya — l aniq o'qiladi.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "'Al' + quyosh harflari — 'l' eshitilmaydi",
        arNomi: "اللَّامُ الشَّمْسِيَّة",
        shart: "الـ + ت ث د ذ ر ز س ش ص ض ط ظ ل ن",
        tavsif: "'الـ' (al) dan keyingi harf quyidagilardan biri bo'lsa — 'l' eshitilmaydi, keyingi harf ikki marta aytiladi:\nت ث د ذ ر ز س ش ص ض ط ظ ل ن\n\nBu 14 harfni 'quyosh harflari' deyishadi. Nima uchun? الشَّمْسُ (quyosh) so'zida 'l' eshitilmaydi — 'ash-shamsu' deyiladi, 'al-shamsu' emas.\n\nEslash: keyingi harf 'l' dan ustun keladi — uni yutib yuboradi.",
        harflar: "ت ث د ذ ر ز س ش ص ض ط ظ ل ن",
        misol: "الرَّحْمَنِ الرَّحِيمِ — ar-rahmaanir-rahiim\nالنَّاسِ — an-naas (l yo'q)\nالدِّينِ — ad-diin\nالصِّرَاطَ — as-siraata\nالشَّيْطَانِ — ash-shaytaan\nالزَّكَاةَ — az-zakaata",
      },
      {
        nomi: "'Al' + oy harflari — 'l' aniq o'qiladi",
        arNomi: "اللَّامُ القَمَرِيَّة",
        shart: "الـ + أ ب ج ح خ ع غ ف ق ك م و ه ي",
        tavsif: "'الـ' (al) dan keyingi harf quyidagilardan biri bo'lsa — 'l' aniq va to'liq o'qiladi:\nأ ب ج ح خ ع غ ف ق ك م و ه ي\n\nBu 14 harfni 'oy harflari' deyishadi. Nima uchun? الْقَمَرُ (oy) so'zida 'l' aniq eshitiladi — 'al-qamaru'.\n\nFotiha surasida الْحَمْدُ va الْعَالَمِينَ — ikkalasida ham 'l' aniq o'qiladi.",
        harflar: "أ ب ج ح خ ع غ ف ق ك م و ه ي",
        misol: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ — al-hamdu, al-'aalamiin\nالْقُرْآنَ — al-qur'aan\nالْكِتَابَ — al-kitaab\nالْمُؤْمِنِينَ — al-mu'miniin\nالْيَوْمَ — al-yawm\nالْبَيْتَ الْحَرَامَ — al-bayt al-haraam",
      },
    ],
  },
  {
    id: 21, nomi: "Shadda — Ikkilangan Harf", emoji: "◌ّ",
    mavzu: {
      maxraj: "Harfning ustida ّ belgisi bo'lsa — u harf ikki marta aytiladi: birinchisi to'xtab, ikkinchisi davom etib. Shaddali nun va mim da burun ovozi ham kuchayadi.",
      amaliyot: "الرَّحِيمِ — رَبِّ الْعَالَمِينَ — إِيَّاكَ نَعْبُدُ — إِنَّ اللَّهَ kabi oyatlarda shaddalarni toping",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Shaddali harf — o'z o'rnida ikkilantirilib talaffuz qilinadi",
      tavsif: "Shadda (ّ) harfni ikki marta aytishni bildiradi. Shaddali n va m da burun ovozi kuchayadi.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "Shadda — harfni ikki marta aytish",
        arNomi: "الشَّدَّة",
        shart: "Harfning ustida ّ belgisi bo'lsa",
        tavsif: "Harfning ustida ّ (shadda) belgisi bo'lsa — u harf ikki marta aytiladi:\n• Birinchisi: sukun bilan (to'xtab, harakatsiz)\n• Ikkinchisi: harakat bilan (davom etib)\n\nMasalan: رَبَّنَا da 'b' ustida shadda bor — 'rab-banaa' deb o'qiladi. Og'iz bir joyda ikki marta harakat qiladi.\n\nFotiha surasidagi الرَّحِيمِ da 'r' va 'h' da shadda bor — 'ar-rahiim' deganda 'r' va 'h' ikki marta eshitiladi.",
        misol: "الرَّحْمَنِ الرَّحِيمِ — ar-rahmaanir-rahiim (r ikki marta)\nرَبِّ الْعَالَمِينَ — rab-bil-'aalamiin (b ikki marta)\nإِيَّاكَ نَعْبُدُ — iy-yaaka (y ikki marta)\nالضَّالِّينَ — ad-daal-liin (l ikki marta)\nمَكَّةَ — mak-kata (k ikki marta)",
      },
      {
        nomi: "Shaddali nun yoki mim — burun ovozi kuchayadi",
        arNomi: "الغُنَّة مَعَ الشَّدَّة",
        shart: "نّ yoki مّ — shaddali nun yoki mim",
        tavsif: "Shaddali nun (نّ) yoki shaddali mim (مّ) bo'lganda — ikki marta aytish bilan birga burun orqali kuchli tovush ham chiqadi. Bu tovush 2 harf uzunligida davom etadi.\n\nMasalan: إِنَّ اللَّهَ da نّ bor — 'in-nallaha' deganda 'n' ikki marta + burundan kuchli tovush chiqadi.\n\nFotiha surasidagi إِيَّاكَ da yy ikkilanadi lekin burun yo'q — chunki ي emas, bu yerda فaqat shadda. Ammo إِنَّ da burun kuchayadi.",
        harflar: "ن م",
        misol: "إِنَّ اللَّهَ — in-nallaha (n ikki + burun)\nإِنَّا أَعْطَيْنَاكَ — innaa (n kuchli)\nوَإِنَّكَ لَعَلَى خُلُقٍ عَظِيمٍ — wa-innaka\nثُمَّ كَلَّا — thum-ma (m ikki + burun)\nمِمَّا رَزَقْنَاكُمْ — mim-maa\nأَنَّ اللَّهَ — an-nallaha",
      },
    ],
  },
  {
    id: 22, nomi: "Vaqf — To'xtalib O'qish", emoji: "⏸️",
    mavzu: {
      maxraj: "Qur'on o'qishda to'xtalib nafas olganingizda so'z oxiri o'zgaradi: harakat o'chadi, ة → 'h', tanvin ًً → 'aa'.",
      amaliyot: "Al-Fotiha surasini o'qib har oyat oxirida to'xtalib qoidani qo'llang: الرَّحِيمِ → rahiim; الضَّالِّينَ → daalliim",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Vaqfda so'z oxiri sukun holga o'tadi",
      tavsif: "Vaqf (to'xtalish) qoidasi: harakat yo'qoladi, ة → h, tanvin ًً → aa.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "To'xtalib o'qish — harakat o'chadi",
        arNomi: "الوَقْف عَلَى آخِرِ الكَلِمَة",
        shart: "Nafas olib to'xtalganingizda so'z oxiri",
        tavsif: "Qur'on o'qishda nafas olib to'xtalganingizda — so'z oxiridagi harakat (a, i, u) o'chadi. Harf harakatsiz aytiladi.\n\nMasalan: الرَّحِيمِ ni tugatiб to'xtalganingizda — 'ar-rahiim' (oxirida 'i' emas, faqat 'm' sokin). مُحَمَّدٌ ni to'xtalib o'qisangiz — 'muhammaD' ('un' emas, 'd' sokin).\n\nBir istisno: tanvin ًً bilan yozilgan so'z to'xtalganda 'aa' bilan tugaydi.",
        misol: "الرَّحِيمِ → الرَّحِيمْ (rahiim)\nمَالِكِ يَوْمِ الدِّينِ → الدِّينْ (diin)\nكِتَابًا → كِتَابَا (kitaabaa — aa bilan)\nغَفُورًا رَّحِيمًا → rahiimaa (aa bilan)\nوَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ → ahaD",
      },
      {
        nomi: "To'xtalib o'qishda ة → 'h' bo'ladi",
        arNomi: "الوَقْف عَلَى التَّاءِ المَرْبُوطَة",
        shart: "So'z oxirida ة bo'lib to'xtalib o'qilganda",
        tavsif: "So'z oxirida ة harfi bo'lib, shu joyda nafas olib to'xtalib o'qilsa — ة 'h' deb o'qiladi.\n\nQur'on suralari nomlarida ko'p uchraydi: سُورَةُ الْبَقَرَة — 'suuratul-baqarah' deyiladi. جَنَّةٌ so'zida to'xtalib — 'jannah'.\n\nDavom etib o'qilsa 't', to'xtalib o'qilsa 'h' — doim shunday.",
        misol: "جَنَّةٌ → جَنَّهْ (jannah)\nرَحْمَةٌ → رَحْمَهْ (rahmah)\nنِعْمَةٌ → نِعْمَهْ (ni'mah)\nسُورَةٌ → سُورَهْ (suurah)\nالْبَقَرَةُ → الْبَقَرَهْ (al-baqarah)\nآيَةٌ → آيَهْ (aayah)",
      },
      {
        nomi: "'Al' bilan ulashib o'qishda 'a' yo'qoladi",
        arNomi: "هَمْزَةُ الوَصْل",
        shart: "Oldingi so'z harakati bilan davom etganda الـ boshli so'z kelsa",
        tavsif: "'الـ' bilan boshlangan so'z oldidagi so'zga ulanib o'qilganda — 'al' ning 'a' si eshitilmaydi. Oldingi so'zning oxirgi harakati bevosida davom etadi.\n\nMasalan: بِسْمِ اللَّهِ da 'bismi' va 'allah' birikadi — 'bismillahi'. 'Mi' va 'al' birgalashib — 'mi-l-lahi' bo'ladi.\n\nYodlang: birikib o'qilganda 'al' ning 'a' si tushib qoladi, oldingi tovush davom etadi.",
        misol: "بِسْمِ اللَّهِ — bismillahi\nمِنَ النَّاسِ — minan-naas\nفِي الْأَرْضِ — fil-ardhi\nرَبِّ الْعَالَمِينَ — rabbil-'aalamiin\nإِلَهِ النَّاسِ — ilahin-naas\nمَلِكِ النَّاسِ — malikin-naas",
      },
    ],
  },
  {
    id: 23, nomi: "1-Bosqich Yakuniy", emoji: "🏆",
    mavzu: {
      maxraj: "1-bosqich tugadi! 28 Arab harfi va asosiy o'qish qoidalarini bilasiz. Endi Al-Fotiha surasini barcha qoidalarni qo'llab o'qing.",
      amaliyot: "Al-Fotiha surasini to'liq o'qing: har harfni to'g'ri, cho'zishlarni sanab, zarb tovushlarini kuchaytirb, to'xtagan joyda vaqf qoidasini qo'llab",
    },
    yangiSifatlar: [],
    maxraj: {
      joy: "Barcha 5 o'rin — yakuniy takror",
      tavsif: "1-bosqich barcha darslari xulosa.",
      yangiHarflar: "",
    },
    yangiHarflar: [],
    tajwidQoidalar: [
      {
        nomi: "Al-Fotiha — barcha qoidalar birgalikda",
        arNomi: "الفَاتِحَة — تَطْبِيق الأَحْكَام",
        shart: "Barcha 24 dars o'rganilgandan keyin",
        tavsif: "Al-Fotiha surasini o'qib quyidagi qoidalarni qo'llang:\n\n• الرَّحْمَنِ الرَّحِيمِ — 'r' va 'h' larda shadda (ar-rahmaanir-rahiim)\n• الرَّحِيمِ → oyat oxirida to'xtalib: rahiim (vaqf)\n• مَالِكِ يَوْمِ الدِّينِ — maa, yawm, diin da cho'zish (2 harf)\n• إِيَّاكَ — yy da shadda (iy-yaaka)\n• نَعْبُدُ — بْ da zarb tovushi (na'-budu)\n• صِرَاطَ الَّذِينَ — as-siraata, allaziina (shamsiyya)\n• الضَّالِّينَ → to'xtalib: daalliim + kuchli zarb yo'q lekin ll shadda\n• الْحَمْدُ — al-hamdu (qomariyya, l aniq)",
        misol: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      },
    ],
  },
];

/* ── Yordamchi: N-dars uchun jami harflar ro'yxati ── */
export function getLettersForLesson(lessonId: number): string[] {
  const out: string[] = [];
  for (const d of DARSLAR) {
    if (d.id >= 1 && d.id <= lessonId) out.push(...d.yangiHarflar);
  }
  return out;
}
