/* Yangi dars tuzilmasi — 13 dars, 28 harf */

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

export interface MaxrajInfo {
  joy: string;
  tavsif: string;
  yangiHarflar: string;
}

export interface DarsMavzu {
  /** 1-dars uchun "Kirish", qolganlar uchun oldingi darslar xulosa */
  takroriy: string;
  yangiSifat: string;
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
];

/* ── Yordamchi: N-dars uchun jami harflar ro'yxati ── */
export function getLettersForLesson(lessonId: number): string[] {
  const out: string[] = [];
  for (const d of DARSLAR) {
    if (d.id >= 1 && d.id <= lessonId) out.push(...d.yangiHarflar);
  }
  return out;
}
