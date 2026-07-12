import type { GramDars, GramDarajaInfo } from "./gramTypes";

export const GRAM_DARSLAR: GramDars[] = [
  // ─── A0 ─────────────────────────────────────────────────────────────────────
  {
    id: 4,
    nomi: "Arab alifbosi — harflar",
    daraja: "A0",
    icon: "🔤",
    rang: "#0891B2",
    mavzu: "28 ta arab harfi va ularning shakllari",
    qoida: [
      {
        sarlavha: "Arab alifbosining asoslari",
        tavsif:
          "Arab alifbosida 28 ta harf bor. Ular o'ngdan chapga yoziladi. " +
          "Har bir harfning 4 xil shakli bo'ladi: alohida, so'z boshida, o'rtasida va oxirida.",
        jadval: [
          { arabcha: "أ", oqilishi: "alif", tarjima: "a/o'", izoh: "birinchi harf" },
          { arabcha: "ب", oqilishi: "ba", tarjima: "b", izoh: "1 nuqta pastda" },
          { arabcha: "ت", oqilishi: "ta", tarjima: "t", izoh: "2 nuqta ustida" },
          { arabcha: "ث", oqilishi: "tha", tarjima: "th (inglizcha)", izoh: "3 nuqta ustida" },
          { arabcha: "ج", oqilishi: "jim", tarjima: "j", izoh: "1 nuqta ichida" },
          { arabcha: "ح", oqilishi: "ha", tarjima: "h (tomoqdan)", izoh: "nuqtasiz" },
          { arabcha: "خ", oqilishi: "xo", tarjima: "x", izoh: "1 nuqta ustida" },
          { arabcha: "د", oqilishi: "dal", tarjima: "d", izoh: "nuqtasiz" },
        ],
      },
      {
        sarlavha: "Qolgan harflar",
        tavsif:
          "Arabcha 28 harfning qolgan 20 tasi. Ko'p harflar o'xshash shaklga ega — " +
          "ularni nuqtalar (noqat) bilan ajratish mumkin.",
        jadval: [
          { arabcha: "ذ", oqilishi: "zal", tarjima: "z (til uchi)", izoh: "1 nuqta ustida" },
          { arabcha: "ر", oqilishi: "ro", tarjima: "r", izoh: "nuqtasiz" },
          { arabcha: "ز", oqilishi: "zay", tarjima: "z", izoh: "1 nuqta ustida" },
          { arabcha: "س", oqilishi: "sin", tarjima: "s", izoh: "nuqtasiz (3 tish)" },
          { arabcha: "ش", oqilishi: "shin", tarjima: "sh", izoh: "3 nuqta ustida" },
          { arabcha: "ص", oqilishi: "sod", tarjima: "s (qattiq)", izoh: "nuqtasiz" },
          { arabcha: "ض", oqilishi: "dod", tarjima: "d (qattiq)", izoh: "1 nuqta ustida" },
          { arabcha: "ع", oqilishi: "'ayn", tarjima: "' (tomoqdan)", izoh: "xos arab harfi" },
        ],
        misol: [
          "ف (fa) — 1 nuqta oldida",
          "ق (qof) — 2 nuqta ustida",
          "ك (kof) — k",
          "ل (lam) — l",
          "م (mim) — m",
          "ن (nun) — n, 1 nuqta ustida",
          "ه (ha) — h (yengil)",
          "و (wow) — v/u",
          "ي (ya) — y/i",
        ],
      },
    ],
    qiroa: [
      { arabcha: "بَيْت", oqilishi: "bayt", tarjima: "uy", izoh: "ب + يت" },
      { arabcha: "كِتَاب", oqilishi: "kitab", tarjima: "kitob", izoh: "ك + ت + ا + ب" },
      { arabcha: "قَلَم", oqilishi: "qalam", tarjima: "qalam", izoh: "ق + ل + م" },
      { arabcha: "بَاب", oqilishi: "bab", tarjima: "eshik", izoh: "ب + ا + ب" },
      { arabcha: "سَمَاء", oqilishi: "sama", tarjima: "osmon", izoh: "س + م + ا + ء" },
      { arabcha: "أَرْض", oqilishi: "ard", tarjima: "yer", izoh: "أ + ر + ض" },
    ],
    istima: [
      { arabcha: "ب", oqilishi: "ba", tarjima: "b harfi", izoh: "pastda 1 nuqta" },
      { arabcha: "ت", oqilishi: "ta", tarjima: "t harfi", izoh: "ustida 2 nuqta" },
      { arabcha: "ث", oqilishi: "tha", tarjima: "th harfi", izoh: "ustida 3 nuqta" },
      { arabcha: "ج", oqilishi: "jim", tarjima: "j harfi", izoh: "ichida 1 nuqta" },
      { arabcha: "س", oqilishi: "sin", tarjima: "s harfi", izoh: "3 tishli, nuqtasiz" },
      { arabcha: "ش", oqilishi: "shin", tarjima: "sh harfi", izoh: "3 tishli, 3 nuqta" },
    ],
    kitoba: [
      { topshiriq: "Quyidagi harflarni tartibda yozing: ب، ت، ث", misol: "→ ب ت ث" },
      { topshiriq: "بَيْت so'zini tashkil qiluvchi harflarni aniqlang", misol: "→ ب + ي + ت" },
      { topshiriq: "Sin va shin harflarining farqini tushuntiring", misol: "→ س (nuqtasiz), ش (3 nuqta)" },
      { topshiriq: "Quyidagi harflardan 3 ta so'z tuzing: ب، ا، ب، ت", misol: "→ بَاب (eshik)" },
    ],
    test: [
      { savol: "ب harfi qanday talaffuz qilinadi?", variantlar: ["ta", "ba", "sa", "na"], togri: 1 },
      { savol: "ش harfining belgisi nechta nuqtaga ega?", variantlar: ["1", "2", "3", "0"], togri: 2 },
      { savol: "Arab harflari qaysi yo'nalishda yoziladi?", variantlar: ["Chapdan o'ngga", "O'ngdan chapga", "Yuqoridan pastga", "Pastdan yuqoriga"], togri: 1 },
      { savol: "Arab alifbosida nechta harf bor?", variantlar: ["24", "26", "28", "30"], togri: 2 },
      { savol: "ت va ث harflari o'rtasidagi farq nima?", variantlar: ["Shakli boshqa", "Nuqtalar soni", "Kattaligi", "Rangi"], togri: 1 },
    ],
  },

  {
    id: 5,
    nomi: "Harakat belgilari",
    daraja: "A0",
    icon: "✨",
    rang: "#2563EB",
    mavzu: "Fatha, kasra, damma, sukun — harflar ustidagi belgilar",
    qoida: [
      {
        sarlavha: "Asosiy harakat belgilari",
        tavsif:
          "Harakat belgilari (tashkil) harflar qanday o'qilishini bildiradi. " +
          "Ular asosan o'quv kitoblarida va boshlang'ich darslarda ishlatiladi.",
        jadval: [
          { arabcha: "بَ", oqilishi: "ba", tarjima: "ba (a ovozi bilan)", izoh: "fatha — ustida kichik chiziq" },
          { arabcha: "بِ", oqilishi: "bi", tarjima: "bi (i ovozi bilan)", izoh: "kasra — ostida kichik chiziq" },
          { arabcha: "بُ", oqilishi: "bu", tarjima: "bu (u ovozi bilan)", izoh: "damma — ustida kichik o' shakl" },
          { arabcha: "بْ", oqilishi: "b (undosh)", tarjima: "b, unli yo'q", izoh: "sukun — ustida kichik doira" },
          { arabcha: "بَّ", oqilishi: "bba", tarjima: "b ikki marta", izoh: "shadda — ustida tish belgisi" },
        ],
      },
      {
        sarlavha: "Tanvin — ikki harakat",
        tavsif:
          "Tanvin — so'z oxirida ikki harakat belgisi qo'yiladi va n ovozi qo'shiladi. " +
          "Tanvin faqat aniqlanmagan otlarda so'z oxirida ishlatiladi.",
        jadval: [
          { arabcha: "بَيْتٌ", oqilishi: "baytun", tarjima: "uy (aniqlanmagan)", izoh: "tanvin damma — un ovozi" },
          { arabcha: "بَيْتٍ", oqilishi: "baytin", tarjima: "uyning (tushum)", izoh: "tanvin kasra — in ovozi" },
          { arabcha: "بَيْتاً", oqilishi: "baytan", tarjima: "uyni (tushum)", izoh: "tanvin fatha — an ovozi" },
          { arabcha: "كِتَابٌ", oqilishi: "kitabun", tarjima: "kitob (aniqlanmagan)", izoh: "tanvin damma" },
        ],
        misol: [
          "بَ = ba (fatha = a ovozi)",
          "بِ = bi (kasra = i ovozi)",
          "بُ = bu (damma = u ovozi)",
          "بْ = b (sukun = unli yo'q)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "بَ بِ بُ بْ", oqilishi: "ba — bi — bu — b", tarjima: "Ba harfi to'rt holatda" },
      { arabcha: "كَتَبَ", oqilishi: "kataba", tarjima: "yozdi", izoh: "k-a + t-a + b-a" },
      { arabcha: "كِتَابٌ", oqilishi: "kitabun", tarjima: "kitob", izoh: "tanvin damma" },
      { arabcha: "قَلَمٌ", oqilishi: "qalamun", tarjima: "qalam", izoh: "tanvin damma" },
      { arabcha: "بَيْتٌ كَبِيرٌ", oqilishi: "baytun kabirun", tarjima: "katta uy", izoh: "ikki tanvin" },
      { arabcha: "مَدْرَسَةٌ", oqilishi: "madrasatun", tarjima: "maktab", izoh: "tanvin + ta marbuta" },
    ],
    istima: [
      { arabcha: "بَ", oqilishi: "ba", tarjima: "fatha bilan", izoh: "ustida — a ovozi" },
      { arabcha: "بِ", oqilishi: "bi", tarjima: "kasra bilan", izoh: "ostida — i ovozi" },
      { arabcha: "بُ", oqilishi: "bu", tarjima: "damma bilan", izoh: "ustida doira — u ovozi" },
      { arabcha: "بْ", oqilishi: "b", tarjima: "sukun bilan", izoh: "ustida o — unli yo'q" },
      { arabcha: "كِتَابٌ", oqilishi: "kitabun", tarjima: "kitob", izoh: "tanvin damma so'z oxirida" },
      { arabcha: "بَيْتاً", oqilishi: "baytan", tarjima: "uyni", izoh: "tanvin fatha" },
    ],
    kitoba: [
      { topshiriq: "بَ، بِ، بُ ni yozing va talaffuz qiling", misol: "ba, bi, bu" },
      { topshiriq: "كِتَابٌ so'zida qanday harakat belgilari bor?", misol: "→ kasra (ki), fatha (ta), damma tanvin (bun)" },
      { topshiriq: "Fatha, kasra, damma farqini misollar bilan tushuntiring", misol: "بَ=ba, بِ=bi, بُ=bu" },
      { topshiriq: "بَيْتٌ so'zini yozing va barcha harakatlarini aniqlang", misol: "→ b(fatha)y(sukun)t(tanvin damma)" },
    ],
    test: [
      { savol: "Fatha qanday ovoz beradi?", variantlar: ["i", "u", "a", "n"], togri: 2 },
      { savol: "Kasra belgisi harfning qayeriga qo'yiladi?", variantlar: ["Ustiga", "Ostiga", "O'rtasiga", "Ichiga"], togri: 1 },
      { savol: "Sukun nimani bildiradi?", variantlar: ["a ovozi", "Harf ikkilanishi", "Unli ovoz yo'q", "n ovozi"], togri: 2 },
      { savol: "كِتَابٌ so'zidagi ٌ belgisi nima?", variantlar: ["Fatha", "Kasra", "Tanvin damma", "Shadda"], togri: 2 },
      { savol: "Shadda ( ّ ) nimani bildiradi?", variantlar: ["a ovozi", "Harf ikki marta talaffuz", "Sukun", "Tanvin"], togri: 1 },
    ],
  },

  {
    id: 6,
    nomi: "Aniqlik artikli — الـ",
    daraja: "A0",
    icon: "🔑",
    rang: "#059669",
    mavzu: "ال (al-) artikli: quyosh va oy harflari",
    qoida: [
      {
        sarlavha: "الـ artikli nima?",
        tavsif:
          "الـ (al-) — aniqlik artikli. Inglizcha 'the' kabi ishlaydi. " +
          "Otning oldiga qo'shilganda u aniq, ma'lum narsani bildiradi. " +
          "Artikl qo'shilganda tanvin (un/in/an) tushib qoladi.",
        jadval: [
          { arabcha: "بَيْتٌ → الْبَيْتُ", oqilishi: "baytun → al-baytu", tarjima: "uy → uy (ma'lum)", izoh: "al + muzakkar ot" },
          { arabcha: "كِتَابٌ → الْكِتَابُ", oqilishi: "kitabun → al-kitabu", tarjima: "kitob → kitob (ma'lum)", izoh: "al + muzakkar ot" },
          { arabcha: "مَدْرَسَةٌ → الْمَدْرَسَةُ", oqilishi: "madrasatun → al-madrasatu", tarjima: "maktab → maktab (ma'lum)", izoh: "al + muannash ot" },
          { arabcha: "سَيَّارَةٌ → السَّيَّارَةُ", oqilishi: "sayyaratun → as-sayyaratu", tarjima: "mashina → mashina (ma'lum)", izoh: "quyosh harfi — l o'zgaradi" },
        ],
      },
      {
        sarlavha: "Quyosh va oy harflari",
        tavsif:
          "الـ artikli harf turiga qarab ikki xil o'qiladi. " +
          "Oy harflarida 'al-' to'liq o'qiladi. " +
          "Quyosh harflarida 'al-' ning 'l' si o'rniga keyingi harf ikkilanadi.",
        jadval: [
          { arabcha: "الْكِتَابُ", oqilishi: "al-kitabu", tarjima: "kitob (ma'lum)", izoh: "ك — oy harfi, al to'liq o'qiladi" },
          { arabcha: "الْبَيْتُ", oqilishi: "al-baytu", tarjima: "uy (ma'lum)", izoh: "ب — oy harfi, al to'liq" },
          { arabcha: "الشَّمْسُ", oqilishi: "ash-shamsu", tarjima: "quyosh", izoh: "ش — quyosh harfi, l→sh" },
          { arabcha: "النَّجْمُ", oqilishi: "an-najmu", tarjima: "yulduz", izoh: "ن — quyosh harfi, l→n" },
          { arabcha: "الطَّالِبُ", oqilishi: "at-talibu", tarjima: "o'quvchi (ma'lum)", izoh: "ط — quyosh harfi, l→t" },
          { arabcha: "الْمُعَلِّمُ", oqilishi: "al-muallimu", tarjima: "o'qituvchi (ma'lum)", izoh: "م — oy harfi, al to'liq" },
        ],
        misol: [
          "Oy harflari (al- to'liq): ا ب ج ح خ ع غ ف ق ك م ه و ي",
          "Quyosh harflari (l ikkilanadi): ت ث د ذ ر ز س ش ص ض ط ظ ل ن",
        ],
      },
    ],
    qiroa: [
      { arabcha: "الْبَيْتُ كَبِيرٌ", oqilishi: "al-baytu kabirun", tarjima: "Uy katta" },
      { arabcha: "الْكِتَابُ جَدِيدٌ", oqilishi: "al-kitabu jadidun", tarjima: "Kitob yangi" },
      { arabcha: "الطَّالِبُ مُجْتَهِدٌ", oqilishi: "at-talibu mujtahidun", tarjima: "O'quvchi tirishqoq" },
      { arabcha: "الشَّمْسُ مُشْرِقَةٌ", oqilishi: "ash-shamsu mushriqatun", tarjima: "Quyosh charaqlamoqda" },
      { arabcha: "الْمَدْرَسَةُ بَعِيدَةٌ", oqilishi: "al-madrasatu ba'idatun", tarjima: "Maktab uzoqda" },
      { arabcha: "السَّيَّارَةُ سَرِيعَةٌ", oqilishi: "as-sayyaratu sari'atun", tarjima: "Mashina tez" },
    ],
    istima: [
      { arabcha: "الْكِتَابُ", oqilishi: "al-kitabu", tarjima: "kitob (ma'lum)", izoh: "oy harfi — al to'liq" },
      { arabcha: "الشَّمْسُ", oqilishi: "ash-shamsu", tarjima: "quyosh", izoh: "quyosh harfi — l→sh" },
      { arabcha: "الطَّالِبُ", oqilishi: "at-talibu", tarjima: "o'quvchi", izoh: "quyosh harfi — l→t" },
      { arabcha: "الْمُعَلِّمُ", oqilishi: "al-muallimu", tarjima: "o'qituvchi", izoh: "oy harfi — al to'liq" },
      { arabcha: "الْبَيْتُ", oqilishi: "al-baytu", tarjima: "uy", izoh: "oy harfi — al to'liq" },
      { arabcha: "النَّجْمُ", oqilishi: "an-najmu", tarjima: "yulduz", izoh: "quyosh harfi — l→n" },
    ],
    kitoba: [
      { topshiriq: "بَيْتٌ so'ziga الـ artikl qo'shing", misol: "→ الْبَيْتُ (al-baytu)" },
      { topshiriq: "مَدْرَسَةٌ so'ziga الـ artikl qo'shing", misol: "→ الْمَدْرَسَةُ (al-madrasatu)" },
      { topshiriq: "الشَّمْسُ dan qaysi harf quyosh harfi ekanini aniqlang", misol: "→ ش (shin) — quyosh harfi" },
      { topshiriq: "Quyidagi so'zlarga الـ qo'shing: قَلَمٌ، سَيَّارَةٌ، طَالِبٌ", misol: "الْقَلَمُ، السَّيَّارَةُ، الطَّالِبُ" },
    ],
    test: [
      { savol: "الـ artikli qanday ma'no bildiradi?", variantlar: ["Ko'plik", "Aniqlik (the)", "Inkor", "Savol"], togri: 1 },
      { savol: "الشَّمْسُ so'zi qanday o'qiladi?", variantlar: ["al-shamsu", "ash-shamsu", "al-shhamsu", "a-shamsu"], togri: 1 },
      { savol: "Quyosh harfi qaysi?", variantlar: ["ك", "م", "ب", "ن"], togri: 3 },
      { savol: "الْكِتَابُ so'zi qanday o'qiladi?", variantlar: ["ak-kitabu", "ash-kitabu", "al-kitabu", "a-kitabu"], togri: 2 },
      { savol: "بَيْتٌ so'ziga الـ qo'shilsa nima bo'ladi?", variantlar: ["البَيْتَ", "الْبَيْتُ", "بَيْتال", "الَّبَيْتُ"], togri: 1 },
    ],
  },

  // ─── A1 ─────────────────────────────────────────────────────────────────────
  {
    id: 1,
    nomi: "Ismlar — Muzakkar va Muannash",
    daraja: "A1",
    icon: "🏷️",
    rang: "#2563EB",
    mavzu: "Arabchada ism jinslari: erkak va ayol shakllari",
    qoida: [
      {
        sarlavha: "Arabchada ism jinsi",
        tavsif:
          "Arabchada har bir ism muzakkar (erkak) yoki muannash (ayol) jinsiga mansub. " +
          "Muannash ismlar ko'pincha ة (ta marbutah) harfi bilan tugaydi.",
        jadval: [
          { arabcha: "مُعَلِّم", oqilishi: "muallim", tarjima: "o'qituvchi (erkak)", izoh: "muzakkar" },
          { arabcha: "مُعَلِّمَة", oqilishi: "muallimat", tarjima: "o'qituvchi (ayol)", izoh: "muannash — ة qo'shildi" },
          { arabcha: "طَالِب", oqilishi: "tolib", tarjima: "o'quvchi (erkak)", izoh: "muzakkar" },
          { arabcha: "طَالِبَة", oqilishi: "toliba", tarjima: "o'quvchi (ayol)", izoh: "muannash — ة qo'shildi" },
          { arabcha: "مُدِير", oqilishi: "mudir", tarjima: "direktor (erkak)", izoh: "muzakkar" },
          { arabcha: "مُدِيرَة", oqilishi: "mudira", tarjima: "direktor (ayol)", izoh: "muannash — ة qo'shildi" },
          { arabcha: "صَدِيق", oqilishi: "sadiq", tarjima: "do'st (erkak)", izoh: "muzakkar" },
          { arabcha: "صَدِيقَة", oqilishi: "sadiqa", tarjima: "do'st (ayol)", izoh: "muannash — ة qo'shildi" },
        ],
        misol: [
          "كِتَاب (kitob) — muzakkar, ة yo'q",
          "شَجَرَة (daraxt) — muannash, ة bilan tugaydi",
          "يَد (qo'l) — muannash (ma'no jihatdan)",
        ],
      },
      {
        sarlavha: "Qoida yodlash",
        tavsif:
          "Agar ismning oxirida ة bo'lsa — u muannash. " +
          "Agar ة bo'lmasa — odatda muzakkar. " +
          "Lekin ba'zi istisnolar bor: ayrim jufta a'zolar (ko'z, qo'l, oyoq) va mamlakatlar muannash bo'ladi.",
        misol: [
          "مَدْرَسَة = maktab (muannash, ة bor)",
          "بَيْت = uy (muzakkar, ة yo'q)",
          "سَيَّارَة = mashina (muannash, ة bor)",
          "قَلَم = qalam (muzakkar, ة yo'q)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "هَذَا مُعَلِّمٌ", oqilishi: "Haza muallimun", tarjima: "Bu o'qituvchi (erkak)" },
      { arabcha: "هَذِهِ مُعَلِّمَةٌ", oqilishi: "Hazihi muallimatun", tarjima: "Bu o'qituvchi (ayol)" },
      { arabcha: "الطَّالِبُ مُجْتَهِدٌ", oqilishi: "At-tolibu mujtahidun", tarjima: "O'quvchi (erkak) tirishqoq" },
      { arabcha: "الطَّالِبَةُ مُجْتَهِدَةٌ", oqilishi: "At-tolibatu mujtahidatun", tarjima: "O'quvchi (ayol) tirishqoq" },
      { arabcha: "الْكِتَابُ جَدِيدٌ", oqilishi: "Al-kitobu jadidun", tarjima: "Kitob yangi" },
      { arabcha: "السَّيَّارَةُ سَرِيعَةٌ", oqilishi: "As-sayyaratu sari'atun", tarjima: "Mashina tez" },
    ],
    istima: [
      { arabcha: "مُعَلِّم", oqilishi: "muallim", tarjima: "o'qituvchi (erkak)", izoh: "m-u-a-ll-i-m" },
      { arabcha: "مُعَلِّمَة", oqilishi: "muallimat", tarjima: "o'qituvchi (ayol)", izoh: "m-u-a-ll-i-m-a-t" },
      { arabcha: "طَالِب", oqilishi: "tolib", tarjima: "o'quvchi (erkak)", izoh: "t-o-l-i-b" },
      { arabcha: "طَالِبَة", oqilishi: "toliba", tarjima: "o'quvchi (ayol)", izoh: "t-o-l-i-b-a" },
      { arabcha: "مَدْرَسَة", oqilishi: "madrasa", tarjima: "maktab", izoh: "m-a-d-r-a-s-a" },
      { arabcha: "سَيَّارَة", oqilishi: "sayyara", tarjima: "mashina", izoh: "s-a-yy-a-r-a" },
    ],
    kitoba: [
      { topshiriq: "مُعَلِّم so'zining muannash shaklini yozing", misol: "→ مُعَلِّمَة" },
      { topshiriq: "طَالِب so'zining muannash shaklini yozing", misol: "→ طَالِبَة" },
      { topshiriq: "مُدِير so'zining muannash shaklini yozing", misol: "→ مُدِيرَة" },
      { topshiriq: "Quyidagi ismlardan muannashlarini aniqlang: كِتَاب، مَدْرَسَة، قَلَم، شَجَرَة، بَيْت", misol: "→ مَدْرَسَة, شَجَرَة" },
    ],
    test: [
      { savol: "طَالِبَة so'zi qaysi jinsga mansub?", variantlar: ["Muzakkar", "Muannash", "Ikkisi ham", "Hech biri"], togri: 1 },
      { savol: "Muannash ismlar odatda qaysi harf bilan tugaydi?", variantlar: ["ب", "ة", "ن", "م"], togri: 1 },
      { savol: "مُدِير so'zining muannash shakli qaysi?", variantlar: ["مُدِيرُون", "مُدِيرَة", "الْمُدِير", "مُدَرِّس"], togri: 1 },
      { savol: "كِتَاب so'zi qaysi jinsga mansub?", variantlar: ["Muzakkar", "Muannash", "Ikkalasi", "Aniqlab bo'lmaydi"], togri: 0 },
      { savol: "Quyidagilardan qaysi biri muannash?", variantlar: ["بَاب", "قَلَم", "مَدْرَسَة", "طَالِب"], togri: 2 },
    ],
  },

  {
    id: 2,
    nomi: "Shaxs olmoshlari",
    daraja: "A1",
    icon: "👤",
    rang: "#7C3AED",
    mavzu: "أنا، أنتَ، هو — men, sen, u va boshqa olmoshlar",
    qoida: [
      {
        sarlavha: "Yagona shaxs olmoshlari",
        tavsif:
          "Arabchada shaxs olmoshlari jins va songa ko'ra farqlanadi. " +
          "Birinchi shaxs (men/biz), ikkinchi shaxs (sen), uchinchi shaxs (u).",
        jadval: [
          { arabcha: "أنا", oqilishi: "ana", tarjima: "Men", izoh: "1-shaxs yagona" },
          { arabcha: "أنتَ", oqilishi: "anta", tarjima: "Sen (erkak)", izoh: "2-shaxs yagona erkak" },
          { arabcha: "أنتِ", oqilishi: "anti", tarjima: "Sen (ayol)", izoh: "2-shaxs yagona ayol" },
          { arabcha: "هو", oqilishi: "huva", tarjima: "U (erkak)", izoh: "3-shaxs yagona erkak" },
          { arabcha: "هي", oqilishi: "hiya", tarjima: "U (ayol)", izoh: "3-shaxs yagona ayol" },
        ],
      },
      {
        sarlavha: "Ko'plik shaxs olmoshlari",
        tavsif: "Ko'plikda ham jins bo'yicha farqlanish saqlanadi.",
        jadval: [
          { arabcha: "نَحْنُ", oqilishi: "nahnu", tarjima: "Biz", izoh: "1-shaxs ko'plik" },
          { arabcha: "أنتُمْ", oqilishi: "antum", tarjima: "Sizlar (erkaklar)", izoh: "2-shaxs ko'plik erkak" },
          { arabcha: "أنتُنَّ", oqilishi: "antunna", tarjima: "Sizlar (ayollar)", izoh: "2-shaxs ko'plik ayol" },
          { arabcha: "هُمْ", oqilishi: "hum", tarjima: "Ular (erkaklar)", izoh: "3-shaxs ko'plik erkak" },
          { arabcha: "هُنَّ", oqilishi: "hunna", tarjima: "Ular (ayollar)", izoh: "3-shaxs ko'plik ayol" },
        ],
        misol: [
          "أنتُمَا (antuma) — Ikkalangiz (juft shakl)",
          "هُمَا (huma) — Ikkalasi (juft shakl, erkak va ayol uchun ham)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "أنا طَالِبٌ", oqilishi: "Ana tolibun", tarjima: "Men o'quvchiman" },
      { arabcha: "أنتَ مُعَلِّمٌ", oqilishi: "Anta muallimun", tarjima: "Sen o'qituvchisan (erkak)" },
      { arabcha: "هو مُدِيرٌ", oqilishi: "Huva mudirun", tarjima: "U direktorda (erkak)" },
      { arabcha: "هي طَبِيبَةٌ", oqilishi: "Hiya tabibatun", tarjima: "U shifokor (ayol)" },
      { arabcha: "نَحْنُ أصدقاءُ", oqilishi: "Nahnu asdiqa'u", tarjima: "Biz do'stmiz" },
      { arabcha: "هُمْ طُلَّابٌ", oqilishi: "Hum tullabun", tarjima: "Ular o'quvchilar" },
    ],
    istima: [
      { arabcha: "أنا", oqilishi: "ana", tarjima: "Men", izoh: "a-na" },
      { arabcha: "أنتَ", oqilishi: "anta", tarjima: "Sen (erkak)", izoh: "an-ta" },
      { arabcha: "أنتِ", oqilishi: "anti", tarjima: "Sen (ayol)", izoh: "an-ti" },
      { arabcha: "هو", oqilishi: "huva", tarjima: "U (erkak)", izoh: "hu-va" },
      { arabcha: "هي", oqilishi: "hiya", tarjima: "U (ayol)", izoh: "hi-ya" },
      { arabcha: "نَحْنُ", oqilishi: "nahnu", tarjima: "Biz", izoh: "nah-nu" },
    ],
    kitoba: [
      { topshiriq: "أنا ishlatib gap tuzing (misol: أنا طَالِبٌ)", misol: "أنا مُعَلِّمٌ — Men o'qituvchiman" },
      { topshiriq: "هو ni هي ga almashtiring: هو مُدِيرٌ → ?", misol: "→ هي مُدِيرَةٌ" },
      { topshiriq: "نَحْنُ ishlatib gap tuzing", misol: "نَحْنُ طُلَّابٌ — Biz o'quvchilamiz" },
      { topshiriq: "Quyidagi olmoshlarni tarjima qiling: أنتَ، هُمْ، هي", misol: "Sen (erkak), Ular (erkaklar), U (ayol)" },
    ],
    test: [
      { savol: "أنتِ olmoshi nimani anglatadi?", variantlar: ["Men", "U (ayol)", "Sen (ayol)", "Biz"], togri: 2 },
      { savol: "Biz arabchada qanday aytiladi?", variantlar: ["أنتُم", "نَحْنُ", "هُمْ", "أنا"], togri: 1 },
      { savol: "هو va هي olmoshlari qanday farqlanadi?", variantlar: ["Sonda", "Jinsda", "Shaxsda", "Farq yo'q"], togri: 1 },
      { savol: "Erkak uchun 2-shaxs yagona olmoshi qaysi?", variantlar: ["أنتِ", "أنتَ", "أنا", "هو"], togri: 1 },
      { savol: "Ular (erkak ko'plik) arabchada qanday?", variantlar: ["هُنَّ", "أنتُم", "هُمْ", "نَحْنُ"], togri: 2 },
    ],
  },

  {
    id: 3,
    nomi: "Ishorali olmoshlar",
    daraja: "A1",
    icon: "👉",
    rang: "#059669",
    mavzu: "هذا، هذه، ذلك، تلك — bu va o'sha",
    qoida: [
      {
        sarlavha: "Yaqin narsalarga ishora",
        tavsif:
          "هذا (haza) — bu (muzakkar ismlar uchun). " +
          "هذه (hazihi) — bu (muannash ismlar uchun). " +
          "Ishorali olmosh jinsda ism bilan mos kelishi shart.",
        jadval: [
          { arabcha: "هَذَا كِتَابٌ", oqilishi: "Haza kitabun", tarjima: "Bu kitob", izoh: "كِتَاب — muzakkar → هذا" },
          { arabcha: "هَذِهِ مَدْرَسَةٌ", oqilishi: "Hazihi madrasatun", tarjima: "Bu maktab", izoh: "مَدْرَسَة — muannash → هذه" },
          { arabcha: "هَذَا قَلَمٌ", oqilishi: "Haza qalamun", tarjima: "Bu qalam", izoh: "قَلَم — muzakkar → هذا" },
          { arabcha: "هَذِهِ سَيَّارَةٌ", oqilishi: "Hazihi sayyaratun", tarjima: "Bu mashina", izoh: "سَيَّارَة — muannash → هذه" },
        ],
      },
      {
        sarlavha: "Uzoq narsalarga ishora",
        tavsif:
          "ذلك (zalika) — u/o'sha (muzakkar). " +
          "تلك (tilka) — u/o'sha (muannash). " +
          "Ko'plik uchun: هؤلاء (ha'ula'i) — bular, أولئك (ula'ika) — o'shalar.",
        jadval: [
          { arabcha: "ذلك", oqilishi: "zalika", tarjima: "U/o'sha (muzakkar)", izoh: "uzoq + muzakkar" },
          { arabcha: "تلك", oqilishi: "tilka", tarjima: "U/o'sha (muannash)", izoh: "uzoq + muannash" },
          { arabcha: "هؤلاء", oqilishi: "ha'ula'i", tarjima: "Bular (ko'plik)", izoh: "yaqin ko'plik" },
          { arabcha: "أولئك", oqilishi: "ula'ika", tarjima: "O'shalar (ko'plik)", izoh: "uzoq ko'plik" },
        ],
        misol: [
          "ذلك بَيْتٌ (Zalika baytun) — O'sha uy",
          "تلك شَجَرَةٌ (Tilka shajaratun) — O'sha daraxt",
        ],
      },
    ],
    qiroa: [
      { arabcha: "هَذَا قَلَمٌ", oqilishi: "Haza qalamun", tarjima: "Bu qalam" },
      { arabcha: "هَذِهِ حَقِيبَةٌ", oqilishi: "Hazihi haqibatun", tarjima: "Bu sumka" },
      { arabcha: "ذَلِكَ بَيْتٌ كَبِيرٌ", oqilishi: "Zalika baytun kabirun", tarjima: "O'sha katta uy" },
      { arabcha: "تِلْكَ سَيَّارَةٌ جَدِيدَةٌ", oqilishi: "Tilka sayyaratun jadidatun", tarjima: "O'sha yangi mashina" },
      { arabcha: "هَذَا الْكِتَابُ جَدِيدٌ", oqilishi: "Hazal-kitobu jadidun", tarjima: "Bu kitob yangi" },
      { arabcha: "هَؤُلاءِ طُلَّابٌ مُجْتَهِدُونَ", oqilishi: "Ha'ula'i tullabun mujtahidun", tarjima: "Bular tirishqoq o'quvchilar" },
    ],
    istima: [
      { arabcha: "هذا", oqilishi: "haza", tarjima: "bu (muzakkar)", izoh: "ha-za" },
      { arabcha: "هذه", oqilishi: "hazihi", tarjima: "bu (muannash)", izoh: "ha-zi-hi" },
      { arabcha: "ذلك", oqilishi: "zalika", tarjima: "o'sha (muzakkar)", izoh: "za-li-ka" },
      { arabcha: "تلك", oqilishi: "tilka", tarjima: "o'sha (muannash)", izoh: "til-ka" },
      { arabcha: "هَذَا بَيْتٌ", oqilishi: "Haza baytun", tarjima: "Bu uy", izoh: "yaqin + muzakkar" },
      { arabcha: "تِلْكَ مَدْرَسَةٌ", oqilishi: "Tilka madrasatun", tarjima: "O'sha maktab", izoh: "uzoq + muannash" },
    ],
    kitoba: [
      { topshiriq: "هذا yoki هذه ni to'g'ri tanlang: ___ كِتَابٌ", misol: "→ هذا كِتَابٌ (muzakkar)" },
      { topshiriq: "ذلك yoki تلك ni to'g'ri tanlang: ___ شَجَرَةٌ", misol: "→ تلك شَجَرَةٌ (muannash)" },
      { topshiriq: "هذا kabi jumla tuzing: Bu qalam → arabchada yozing", misol: "→ هذا قَلَمٌ" },
      { topshiriq: "Bu maktab → arabchada yozing (مَدْرَسَة — muannash)", misol: "→ هذه مَدْرَسَةٌ" },
    ],
    test: [
      { savol: "Bu (muannash) arabchada qanday?", variantlar: ["هذا", "ذلك", "هذه", "تلك"], togri: 2 },
      { savol: "ذلك nimani anglatadi?", variantlar: ["Bu (muzakkar)", "Bu (muannash)", "U/o'sha (muzakkar)", "U/o'sha (muannash)"], togri: 2 },
      { savol: "هَذِهِ سَيَّارَةٌ gapini tarjima qiling", variantlar: ["U mashina", "Bu mashina", "O'sha mashina", "Mashina bor"], togri: 1 },
      { savol: "هَذَا olmoshi qaysi ism bilan ishlatiladi?", variantlar: ["Muannash", "Muzakkar", "Ko'plik", "Aniqlanmagan"], togri: 1 },
      { savol: "Yaqin + muannash uchun qaysi olmosh ishlatiladi?", variantlar: ["ذلك", "تلك", "هذا", "هذه"], togri: 3 },
    ],
  },

  // ─── A2 ─────────────────────────────────────────────────────────────────────
  {
    id: 7,
    nomi: "O'tgan zamon fe'li",
    daraja: "A2",
    icon: "⏰",
    rang: "#CA8A04",
    mavzu: "الفعل الماضي — o'tgan zamonda fe'l tuslanishi",
    qoida: [
      {
        sarlavha: "O'tgan zamon fe'lining asosi",
        tavsif:
          "Arabcha o'tgan zamon fe'li (fi'l madi) ildizdan hosil bo'ladi. " +
          "Asosiy shakl 3-shaxs yagona erkak (u qildi) hisoblanadi. " +
          "Fe'l shaxs, jins va songa qarab o'zgaradi — so'z oxiriga qo'shimcha qo'shiladi.",
        jadval: [
          { arabcha: "كَتَبَ", oqilishi: "kataba", tarjima: "u yozdi (erkak)", izoh: "3-shaxs yagona erkak — asosiy shakl" },
          { arabcha: "كَتَبَتْ", oqilishi: "katabat", tarjima: "u yozdi (ayol)", izoh: "3-shaxs yagona ayol — ت qo'shildi" },
          { arabcha: "كَتَبْتُ", oqilishi: "katabtu", tarjima: "men yozdim", izoh: "1-shaxs yagona — تُ qo'shildi" },
          { arabcha: "كَتَبْتَ", oqilishi: "katabta", tarjima: "sen yozding (erkak)", izoh: "2-shaxs yagona erkak — تَ qo'shildi" },
          { arabcha: "كَتَبْتِ", oqilishi: "katabti", tarjima: "sen yozding (ayol)", izoh: "2-shaxs yagona ayol — تِ qo'shildi" },
          { arabcha: "كَتَبْنَا", oqilishi: "katabna", tarjima: "biz yozdik", izoh: "1-shaxs ko'plik — نَا qo'shildi" },
        ],
      },
      {
        sarlavha: "Ko'plik shakllari",
        tavsif:
          "Ko'plikda fe'l qo'shimchalari o'zgaradi. " +
          "Ko'plik 3-shaxs: ular (erkaklar) — وا qo'shimchasi, ular (ayollar) — نَ qo'shimchasi.",
        jadval: [
          { arabcha: "كَتَبُوا", oqilishi: "katabu", tarjima: "ular yozdi (erkaklar)", izoh: "3-shaxs ko'plik erkak — وا" },
          { arabcha: "كَتَبْنَ", oqilishi: "katabna", tarjima: "ular yozdi (ayollar)", izoh: "3-shaxs ko'plik ayol — نَ" },
          { arabcha: "كَتَبْتُمْ", oqilishi: "katabtum", tarjima: "sizlar yozdingiz (erkaklar)", izoh: "2-shaxs ko'plik erkak — تُمْ" },
          { arabcha: "كَتَبْتُنَّ", oqilishi: "katabtunna", tarjima: "sizlar yozdingiz (ayollar)", izoh: "2-shaxs ko'plik ayol — تُنَّ" },
        ],
        misol: [
          "ذَهَبَ (zahaba) — u bordi",
          "ذَهَبْتُ (zahabtu) — men bordim",
          "ذَهَبُوا (zahabu) — ular bordi",
          "أَكَلَ (akala) — u yedi",
          "شَرِبَ (shariba) — u ichdi",
        ],
      },
    ],
    qiroa: [
      { arabcha: "ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ", oqilishi: "zahaba t-talibu ilal-madrasati", tarjima: "O'quvchi maktabga bordi" },
      { arabcha: "كَتَبَتِ الطَّالِبَةُ الدَّرْسَ", oqilishi: "katabatit-tolibatud-darsa", tarjima: "O'quvchi (ayol) darsni yozdi" },
      { arabcha: "أَكَلْتُ التُّفَّاحَةَ", oqilishi: "akaltu t-tuffaha", tarjima: "Men olmani yedim" },
      { arabcha: "شَرِبْنَا الْمَاءَ", oqilishi: "sharibnal-ma'a", tarjima: "Biz suv ichdik" },
      { arabcha: "فَتَحْتَ الْبَابَ", oqilishi: "fatahtal-baba", tarjima: "Sen eshikni ochdim" },
      { arabcha: "جَلَسُوا فِي الْغُرْفَةِ", oqilishi: "jalasufi l-ghurfati", tarjima: "Ular xonada o'tirishdi" },
    ],
    istima: [
      { arabcha: "كَتَبَ", oqilishi: "kataba", tarjima: "u yozdi", izoh: "3-shaxs yagona erkak" },
      { arabcha: "كَتَبَتْ", oqilishi: "katabat", tarjima: "u yozdi (ayol)", izoh: "3-shaxs yagona ayol" },
      { arabcha: "كَتَبْتُ", oqilishi: "katabtu", tarjima: "men yozdim", izoh: "1-shaxs" },
      { arabcha: "كَتَبُوا", oqilishi: "katabu", tarjima: "ular yozdi", izoh: "ko'plik erkak" },
      { arabcha: "ذَهَبَ", oqilishi: "zahaba", tarjima: "u bordi", izoh: "asosiy shakl" },
      { arabcha: "ذَهَبْنَا", oqilishi: "zahabna", tarjima: "biz bordik", izoh: "ko'plik" },
    ],
    kitoba: [
      { topshiriq: "كَتَبَ fe'lini 1-shaxs yagona shaklida yozing", misol: "→ كَتَبْتُ (katabtu)" },
      { topshiriq: "كَتَبَ ni ayol uchun 3-shaxsga o'zgartiring", misol: "→ كَتَبَتْ (katabat)" },
      { topshiriq: "ذَهَبَ fe'lini ko'plik (ular-erkak) shaklida yozing", misol: "→ ذَهَبُوا (zahabu)" },
      { topshiriq: "Quyidagi fe'lni tarjima qiling: شَرِبْتُمْ", misol: "→ Sizlar (erkaklar) ichdingiz" },
    ],
    test: [
      { savol: "كَتَبَتْ so'zi nimani bildiradi?", variantlar: ["Men yozdim", "U yozdi (erkak)", "U yozdi (ayol)", "Ular yozdi"], togri: 2 },
      { savol: "1-shaxs yagona o'tgan zamon qo'shimchasi qaysi?", variantlar: ["تَ", "تُ", "نَا", "وا"], togri: 1 },
      { savol: "كَتَبُوا so'zi kim haqida gapiradi?", variantlar: ["Men", "Sen (ayol)", "U (erkak)", "Ular (erkaklar)"], togri: 3 },
      { savol: "Biz yozdik arabchada qanday?", variantlar: ["كَتَبُوا", "كَتَبْتُمْ", "كَتَبْنَا", "كَتَبَ"], togri: 2 },
      { savol: "O'tgan zamon fe'lining asosiy shakli qaysi shaxs?", variantlar: ["1-shaxs erkak", "2-shaxs ayol", "3-shaxs erkak yagona", "Ko'plik"], togri: 2 },
    ],
  },

  {
    id: 8,
    nomi: "Kelishik harflari",
    daraja: "A2",
    icon: "🔗",
    rang: "#DC2626",
    mavzu: "حروف الجر — oldindi, ustida, dan, ga va boshqa predloglar",
    qoida: [
      {
        sarlavha: "Asosiy kelishik harflari",
        tavsif:
          "Arabchada kelishik harflari (harf al-jarr) otdan oldin kelib, " +
          "joy, yo'nalish va munosabatni bildiradi. " +
          "Kelishik harfidan keyin ot kasra (i) harakati oladi.",
        jadval: [
          { arabcha: "فِي", oqilishi: "fi", tarjima: "da/da ichida", izoh: "joy bildiradi" },
          { arabcha: "عَلَى", oqilishi: "'ala", tarjima: "ustida/ustiga", izoh: "ustki joy" },
          { arabcha: "مِنْ", oqilishi: "min", tarjima: "dan/dan chiqib", izoh: "manba, asl" },
          { arabcha: "إِلَى", oqilishi: "ila", tarjima: "ga/tomon", izoh: "yo'nalish" },
          { arabcha: "عَنْ", oqilishi: "'an", tarjima: "haqida/dan (narida)", izoh: "mavzu, uzoqlashish" },
          { arabcha: "مَعَ", oqilishi: "ma'a", tarjima: "bilan", izoh: "birgalik" },
          { arabcha: "بِ", oqilishi: "bi", tarjima: "bilan (vosita)", izoh: "vosita, qo'shni" },
          { arabcha: "لِ", oqilishi: "li", tarjima: "uchun/ga (egalik)", izoh: "maqsad, egalik" },
        ],
      },
      {
        sarlavha: "Misollar va qo'llanilishi",
        tavsif:
          "Kelishik harflaridan keyin ot kasra oladi (garr holati). " +
          "الـ bilan birikkan otda bu kasra artikl ichida ko'rinmaydi.",
        jadval: [
          { arabcha: "فِي الْبَيْتِ", oqilishi: "fi l-bayti", tarjima: "uyda", izoh: "fi + aniq ot" },
          { arabcha: "عَلَى الطَّاوِلَةِ", oqilishi: "'alat-tawilati", tarjima: "stolning ustida", izoh: "'ala + aniq muannash" },
          { arabcha: "مِنَ الْمَدْرَسَةِ", oqilishi: "minal-madrasati", tarjima: "maktabdan", izoh: "min + aniq muannash" },
          { arabcha: "إِلَى الْبَيْتِ", oqilishi: "ilal-bayti", tarjima: "uyga", izoh: "ila + aniq muzakkar" },
          { arabcha: "مَعَ صَدِيقِي", oqilishi: "ma'a sadiqiy", tarjima: "do'stim bilan", izoh: "ma'a + egalik" },
          { arabcha: "لِلطَّالِبِ", oqilishi: "lit-talibi", tarjima: "o'quvchi uchun", izoh: "li + aniq muzakkar" },
        ],
      },
    ],
    qiroa: [
      { arabcha: "الْكِتَابُ عَلَى الطَّاوِلَةِ", oqilishi: "al-kitabu 'alat-tawilati", tarjima: "Kitob stolning ustida" },
      { arabcha: "ذَهَبْتُ إِلَى الْمَدْرَسَةِ", oqilishi: "zahabtu ilal-madrasati", tarjima: "Men maktabga bordim" },
      { arabcha: "جِئْتُ مِنَ الْبَيْتِ", oqilishi: "ji'tu minal-bayti", tarjima: "Men uydan keldim" },
      { arabcha: "الْقَلَمُ فِي الْحَقِيبَةِ", oqilishi: "al-qalamu fil-haqibati", tarjima: "Qalam sumkada" },
      { arabcha: "ذَهَبَ مَعَ أَخِيهِ", oqilishi: "zahaba ma'a axiyhi", tarjima: "U ukasi bilan bordi" },
      { arabcha: "هَذَا الْكِتَابُ لِلْمُعَلِّمِ", oqilishi: "hazal-kitabu lil-muallimi", tarjima: "Bu kitob o'qituvchi uchun" },
    ],
    istima: [
      { arabcha: "فِي", oqilishi: "fi", tarjima: "da/ichida", izoh: "joy" },
      { arabcha: "عَلَى", oqilishi: "'ala", tarjima: "ustida", izoh: "yuqori joy" },
      { arabcha: "مِنْ", oqilishi: "min", tarjima: "dan", izoh: "manba" },
      { arabcha: "إِلَى", oqilishi: "ila", tarjima: "ga/tomon", izoh: "yo'nalish" },
      { arabcha: "فِي الْبَيْتِ", oqilishi: "fil-bayti", tarjima: "uyda", izoh: "fi + aniq ot" },
      { arabcha: "مِنَ الْمَدْرَسَةِ", oqilishi: "minal-madrasati", tarjima: "maktabdan", izoh: "min + aniq" },
    ],
    kitoba: [
      { topshiriq: "Kitob stolning ustida → arabchada yozing", misol: "→ الْكِتَابُ عَلَى الطَّاوِلَةِ" },
      { topshiriq: "Men maktabga bordim → arabchada yozing", misol: "→ ذَهَبْتُ إِلَى الْمَدْرَسَةِ" },
      { topshiriq: "فِي va عَلَى farqini misollar bilan tushuntiring", misol: "فِي الْبَيْتِ=uyda, عَلَى الطَّاوِلَةِ=stolda" },
      { topshiriq: "لِ harfini ishlatib gap tuzing", misol: "هَذَا لِلطَّالِبِ — Bu o'quvchi uchun" },
    ],
    test: [
      { savol: "فِي harfi qanday ma'no bildiradi?", variantlar: ["Ustida", "Da/ichida", "Dan", "Ga/tomon"], togri: 1 },
      { savol: "إِلَى harfi qanday ma'no bildiradi?", variantlar: ["Bilan", "Da", "Uchun", "Ga/tomon"], togri: 3 },
      { savol: "الْكِتَابُ عَلَى الطَّاوِلَةِ gapini tarjima qiling", variantlar: ["Kitob sumkada", "Kitob stolning ustida", "Kitob yerda", "Kitob o'qituvchida"], togri: 1 },
      { savol: "مِنْ harfi qanday ma'no bildiradi?", variantlar: ["Ga/tomon", "Uchun", "Dan/manba", "Bilan"], togri: 2 },
      { savol: "Kelishik harfidan keyin ot qanday harakat oladi?", variantlar: ["Fatha (a)", "Damma (u)", "Kasra (i)", "Sukun"], togri: 2 },
    ],
  },

  {
    id: 9,
    nomi: "Sifat moslashuvi",
    daraja: "A2",
    icon: "🎨",
    rang: "#7C3AED",
    mavzu: "النعت — sifat jins, son va aniqlikda ism bilan mos keladi",
    qoida: [
      {
        sarlavha: "Arabchada sifat qoidasi",
        tavsif:
          "Arabchada sifat (na't) doimo ot (man'ut) dan KEYIN keladi. " +
          "Sifat otning jinsi, soni va aniqligiga mos kelishi shart. " +
          "Bu ingliz tilidan farqli — inglizda sifat otdan oldin keladi.",
        jadval: [
          { arabcha: "كِتَابٌ كَبِيرٌ", oqilishi: "kitabun kabirun", tarjima: "katta kitob", izoh: "muzakkar + aniqlanmagan" },
          { arabcha: "مَدْرَسَةٌ كَبِيرَةٌ", oqilishi: "madrasatun kabiratun", tarjima: "katta maktab", izoh: "muannash — ة qo'shildi" },
          { arabcha: "الْكِتَابُ الْكَبِيرُ", oqilishi: "al-kitabul-kabiru", tarjima: "katta kitob (ma'lum)", izoh: "aniq — al qo'shildi" },
          { arabcha: "الْمَدْرَسَةُ الْكَبِيرَةُ", oqilishi: "al-madrasatul-kabiratu", tarjima: "katta maktab (ma'lum)", izoh: "aniq muannash" },
          { arabcha: "طُلَّابٌ مُجْتَهِدُونَ", oqilishi: "tullabun mujtahidun", tarjima: "tirishqoq o'quvchilar", izoh: "ko'plik erkak — ون" },
          { arabcha: "بَيْتٌ جَدِيدٌ", oqilishi: "baytun jadidun", tarjima: "yangi uy", izoh: "muzakkar + aniqlanmagan" },
        ],
      },
      {
        sarlavha: "Keng tarqalgan sifatlar",
        tavsif:
          "Ko'p ishlatiladigan sifatlar va ularning muzakkar/muannash shakllari. " +
          "Muannash sifat hosil qilish uchun ko'pincha ة qo'shiladi.",
        jadval: [
          { arabcha: "كَبِير / كَبِيرَة", oqilishi: "kabir / kabira", tarjima: "katta", izoh: "erkak / ayol" },
          { arabcha: "صَغِير / صَغِيرَة", oqilishi: "saghir / saghira", tarjima: "kichik", izoh: "erkak / ayol" },
          { arabcha: "جَدِيد / جَدِيدَة", oqilishi: "jadid / jadida", tarjima: "yangi", izoh: "erkak / ayol" },
          { arabcha: "قَدِيم / قَدِيمَة", oqilishi: "qadim / qadima", tarjima: "eski, qadim", izoh: "erkak / ayol" },
          { arabcha: "جَمِيل / جَمِيلَة", oqilishi: "jamil / jamila", tarjima: "chiroyli", izoh: "erkak / ayol" },
          { arabcha: "طَوِيل / طَوِيلَة", oqilishi: "tawil / tawila", tarjima: "uzun/baland", izoh: "erkak / ayol" },
          { arabcha: "قَصِير / قَصِيرَة", oqilishi: "qasir / qasira", tarjima: "qisqa/past", izoh: "erkak / ayol" },
          { arabcha: "سَرِيع / سَرِيعَة", oqilishi: "sari' / sari'a", tarjima: "tez", izoh: "erkak / ayol" },
        ],
        misol: [
          "بَيْتٌ كَبِيرٌ (katta uy) — muzakkar + muzakkar sifat",
          "سَيَّارَةٌ سَرِيعَةٌ (tez mashina) — muannash + muannash sifat",
          "الْبَيْتُ الْكَبِيرُ (katta uy, ma'lum) — al + al",
        ],
      },
    ],
    qiroa: [
      { arabcha: "هَذَا بَيْتٌ كَبِيرٌ", oqilishi: "Haza baytun kabirun", tarjima: "Bu katta uy" },
      { arabcha: "هَذِهِ سَيَّارَةٌ سَرِيعَةٌ", oqilishi: "Hazihi sayyaratun sari'atun", tarjima: "Bu tez mashina" },
      { arabcha: "الْكِتَابُ الْجَدِيدُ عَلَى الطَّاوِلَةِ", oqilishi: "al-kitabul-jadidu 'alat-tawilati", tarjima: "Yangi kitob stolda" },
      { arabcha: "الْمَدْرَسَةُ الْكَبِيرَةُ بَعِيدَةٌ", oqilishi: "al-madrasatul-kabirati ba'idatun", tarjima: "Katta maktab uzoqda" },
      { arabcha: "رَأَيْتُ طَالِبًا مُجْتَهِدًا", oqilishi: "ra'aytu taliban mujtahidan", tarjima: "Men tirishqoq o'quvchini ko'rdim" },
      { arabcha: "اشْتَرَيْتُ قَلَمًا جَدِيدًا", oqilishi: "ishtaraytu qalaman jadidan", tarjima: "Men yangi qalam sotib oldim" },
    ],
    istima: [
      { arabcha: "كَبِير", oqilishi: "kabir", tarjima: "katta (muzakkar)", izoh: "k-a-b-i-r" },
      { arabcha: "كَبِيرَة", oqilishi: "kabira", tarjima: "katta (muannash)", izoh: "ة qo'shildi" },
      { arabcha: "جَدِيد", oqilishi: "jadid", tarjima: "yangi (muzakkar)", izoh: "j-a-d-i-d" },
      { arabcha: "جَدِيدَة", oqilishi: "jadida", tarjima: "yangi (muannash)", izoh: "ة qo'shildi" },
      { arabcha: "بَيْتٌ كَبِيرٌ", oqilishi: "baytun kabirun", tarjima: "katta uy", izoh: "muzakkar + muzakkar sifat" },
      { arabcha: "سَيَّارَةٌ جَدِيدَةٌ", oqilishi: "sayyaratun jadidatun", tarjima: "yangi mashina", izoh: "muannash + muannash sifat" },
    ],
    kitoba: [
      { topshiriq: "كَبِير sifatini مَدْرَسَة bilan ishlating (muannash)", misol: "→ مَدْرَسَةٌ كَبِيرَةٌ" },
      { topshiriq: "جَدِيد sifatini الْكِتَابُ bilan ishlating (aniq)", misol: "→ الْكِتَابُ الْجَدِيدُ" },
      { topshiriq: "Yangi mashina → arabchada yozing (سَيَّارَة — muannash)", misol: "→ سَيَّارَةٌ جَدِيدَةٌ" },
      { topshiriq: "Quyidagi birikmalarda xatoni toping: سَيَّارَةٌ كَبِيرٌ", misol: "→ Xato: سَيَّارَة muannash, sifat ham muannash bo'lishi kerak: سَيَّارَةٌ كَبِيرَةٌ" },
    ],
    test: [
      { savol: "سَيَّارَةٌ كَبِيرَةٌ nimani anglatadi?", variantlar: ["Kichik mashina", "Yangi mashina", "Katta mashina", "Tez mashina"], togri: 2 },
      { savol: "Arabchada sifat ismdan qayerda turadi?", variantlar: ["Oldida", "Keyin", "O'rtada", "Alohida gapda"], togri: 1 },
      { savol: "كَبِيرَة qanday sifat?", variantlar: ["Muzakkar", "Muannash", "Ko'plik", "Aniqlanmagan"], togri: 1 },
      { savol: "الْكِتَابُ الْجَدِيدُ da sifat aniqmi?", variantlar: ["Yo'q, aniqlanmagan", "Ha, الـ bor", "Ha, tanvin bor", "Aniq emas"], togri: 1 },
      { savol: "Yangi kitob arabchada qanday?", variantlar: ["كِتَابٌ جَدِيدَةٌ", "جَدِيدٌ كِتَابٌ", "كِتَابٌ جَدِيدٌ", "الْكِتَابُ جَدِيدَةٌ"], togri: 2 },
    ],
  },

  // ─── B1 ─────────────────────────────────────────────────────────────────────
  {
    id: 10,
    nomi: "Hozirgi/kelasi zamon fe'li",
    daraja: "B1",
    icon: "▶️",
    rang: "#2563EB",
    mavzu: "الفعل المضارع — hozirda va kelajakda qilinadigan ishlar",
    qoida: [
      {
        sarlavha: "Mudori' fe'lining yasalishi",
        tavsif:
          "Hozirgi/kelasi zamon fe'li (fi'l mudori') o'tgan zamon asosiga " +
          "shaxs prefikslari (أ، ت، ي، ن) qo'shish bilan hosil bo'ladi. " +
          "Fe'l oxiri odatda damma (u) bilan tugaydi.",
        jadval: [
          { arabcha: "أَكْتُبُ", oqilishi: "aktubu", tarjima: "men yozaman", izoh: "1-shaxs yagona — أَ prefiksi" },
          { arabcha: "تَكْتُبُ", oqilishi: "taktubu", tarjima: "sen yozasan (erkak)", izoh: "2-shaxs yagona erkak — تَ prefiksi" },
          { arabcha: "تَكْتُبِينَ", oqilishi: "taktubina", tarjima: "sen yozasan (ayol)", izoh: "2-shaxs yagona ayol — تَ + ينَ" },
          { arabcha: "يَكْتُبُ", oqilishi: "yaktubu", tarjima: "u yozadi (erkak)", izoh: "3-shaxs yagona erkak — يَ prefiksi" },
          { arabcha: "تَكْتُبُ", oqilishi: "taktubu", tarjima: "u yozadi (ayol)", izoh: "3-shaxs yagona ayol — تَ prefiksi" },
          { arabcha: "نَكْتُبُ", oqilishi: "naktubu", tarjima: "biz yozamiz", izoh: "1-shaxs ko'plik — نَ prefiksi" },
        ],
      },
      {
        sarlavha: "Ko'plik va kelasi zamon",
        tavsif:
          "Ko'plik shakllari o'zgacha qo'shimchalarga ega. " +
          "سَ yoki سَوْفَ qo'shilsa fe'l kelasi zamonni bildiradi.",
        jadval: [
          { arabcha: "يَكْتُبُونَ", oqilishi: "yaktubun", tarjima: "ular yozadi (erkaklar)", izoh: "3-shaxs ko'plik erkak — ونَ" },
          { arabcha: "يَكْتُبْنَ", oqilishi: "yaktubna", tarjima: "ular yozadi (ayollar)", izoh: "3-shaxs ko'plik ayol — نَ" },
          { arabcha: "تَكْتُبُونَ", oqilishi: "taktubun", tarjima: "sizlar yozasiz", izoh: "2-shaxs ko'plik — تَ + ونَ" },
          { arabcha: "سَأَكْتُبُ", oqilishi: "sa-aktubu", tarjima: "men yozaman (kelasi)", izoh: "سَ prefiksi — kelasi zamon" },
          { arabcha: "سَوْفَ يَذْهَبُ", oqilishi: "sawfa yazhabu", tarjima: "u borad (kelasi)", izoh: "سَوْفَ — kelasi zamon" },
        ],
        misol: [
          "أَذْهَبُ كُلَّ يَوْمٍ (men har kuni boraman)",
          "يَأْكُلُ الطِّفْلُ (bola yeyapti)",
          "سَنَذْهَبُ غَدًا (biz erta boramiz)",
          "هَلْ تَفْهَمُ؟ (tushunasanmi?)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "أَذْهَبُ إِلَى الْعَمَلِ كُلَّ يَوْمٍ", oqilishi: "azhabu ilal-'amali kulla yawm", tarjima: "Men har kuni ishga boraman" },
      { arabcha: "يَدْرُسُ الطَّالِبُ فِي الْمَكْتَبَةِ", oqilishi: "yadrusu t-talibu fil-maktabati", tarjima: "O'quvchi kutubxonada o'qiydi" },
      { arabcha: "مَاذَا تَأْكُلُ فِي الْغَدَاء؟", oqilishi: "maza ta'kulu fil-ghada'?", tarjima: "Tushlikda nima eysan?" },
      { arabcha: "سَنَذْهَبُ إِلَى الْمَطَارِ غَدًا", oqilishi: "sanazhbu ilal-matari ghadan", tarjima: "Erta biz aeroportga boramiz" },
      { arabcha: "هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟", oqilishi: "hal tatakallamu l-'arabiyya?", tarjima: "Arabcha gaplashasan?" },
      { arabcha: "يَكْتُبُونَ الدَّرْسَ الْآنَ", oqilishi: "yaktubun ad-darsa l-an", tarjima: "Ular hozir darsni yozishmoqda" },
    ],
    istima: [
      { arabcha: "أَكْتُبُ", oqilishi: "aktubu", tarjima: "men yozaman", izoh: "1-shaxs, أ- prefiksi" },
      { arabcha: "يَكْتُبُ", oqilishi: "yaktubu", tarjima: "u yozadi (erkak)", izoh: "3-shaxs erkak, يَ prefiksi" },
      { arabcha: "نَكْتُبُ", oqilishi: "naktubu", tarjima: "biz yozamiz", izoh: "1-shaxs ko'plik, نَ prefiksi" },
      { arabcha: "يَكْتُبُونَ", oqilishi: "yaktubun", tarjima: "ular yozadi", izoh: "ko'plik erkak, ونَ qo'shimchasi" },
      { arabcha: "سَأَكْتُبُ", oqilishi: "sa-aktubu", tarjima: "men yozaman (kelajak)", izoh: "سَ + mudori'" },
      { arabcha: "تَكْتُبُ", oqilishi: "taktubu", tarjima: "u yozadi (ayol)", izoh: "3-shaxs ayol yoki 2-shaxs erkak" },
    ],
    kitoba: [
      { topshiriq: "يَكْتُبُ ni 1-shaxsga o'zgartiring", misol: "→ أَكْتُبُ (men yozaman)" },
      { topshiriq: "يَذْهَبُ ni ko'plik (ular-erkak) shaklida yozing", misol: "→ يَذْهَبُونَ (ular boradilar)" },
      { topshiriq: "سَ ishlatib kelasi zamon gapi tuzing", misol: "→ سَأَذْهَبُ غَدًا (men erta boraman)" },
      { topshiriq: "أَكَلَ (yedi) dan hozirgi zamon yasang, 3-shaxs erkak", misol: "→ يَأْكُلُ (u yeydi)" },
    ],
    test: [
      { savol: "يَكْتُبُ so'zi qaysi shaxs?", variantlar: ["1-shaxs erkak", "2-shaxs erkak", "3-shaxs erkak", "3-shaxs ayol"], togri: 2 },
      { savol: "Men boraman arabchada qanday?", variantlar: ["يَذْهَبُ", "تَذْهَبُ", "أَذْهَبُ", "نَذْهَبُ"], togri: 2 },
      { savol: "سَ prefiksi nima bildiradi?", variantlar: ["O'tgan zamon", "Inkor", "Kelasi zamon", "Buyruq"], togri: 2 },
      { savol: "Biz yozamiz arabchada qanday?", variantlar: ["أَكْتُبُ", "يَكْتُبُ", "تَكْتُبُ", "نَكْتُبُ"], togri: 3 },
      { savol: "يَكْتُبُونَ so'zi kim haqida?", variantlar: ["Men", "Sen", "U (erkak)", "Ular (erkaklar)"], togri: 3 },
    ],
  },

  {
    id: 11,
    nomi: "Inkor va buyruq mayli",
    daraja: "B1",
    icon: "🚫",
    rang: "#DC2626",
    mavzu: "النفي والأمر — yo'q deyish va buyurish usullari",
    qoida: [
      {
        sarlavha: "Inkor shakllari",
        tavsif:
          "Arabchada inkor qilish fe'l turiga qarab turlicha ifodalanadi. " +
          "لَا + mudori' = hozirgi inkor. لَمْ + majzum = o'tgan inkor. لَنْ + mansub = kelajak inkor.",
        jadval: [
          { arabcha: "لَا أَفْهَمُ", oqilishi: "la afham", tarjima: "Men tushunmayman", izoh: "لَا + mudori' = hozirgi inkor" },
          { arabcha: "لَمْ أَذْهَبْ", oqilishi: "lam azhhab", tarjima: "Men bormadim", izoh: "لَمْ + majzum = o'tgan inkor" },
          { arabcha: "لَنْ أَكْتُبَ", oqilishi: "lan aktuba", tarjima: "Men yozmayman (kelajakda)", izoh: "لَنْ + mansub = kelajak inkor" },
          { arabcha: "لَيْسَ كَبِيرًا", oqilishi: "laysa kabiran", tarjima: "U katta emas", izoh: "لَيْسَ = emas (ot inkori)" },
          { arabcha: "لَا تَذْهَبْ!", oqilishi: "la tazhab!", tarjima: "Borma!", izoh: "لَا + majzum = taqiq buyruq" },
        ],
      },
      {
        sarlavha: "Buyruq mayli (fi'l amr)",
        tavsif:
          "Buyruq mayli ikkinchi shaxsga qaratilgan buyruq yoki iltimos bildiradi. " +
          "U mudori' fe'lidan تَ prefiksini olib, oxirida sukun qo'yish bilan yasaladi.",
        jadval: [
          { arabcha: "اُكْتُبْ!", oqilishi: "uktub!", tarjima: "Yoz! (erkakka)", izoh: "2-shaxs yagona erkak buyruq" },
          { arabcha: "اُكْتُبِي!", oqilishi: "uktubi!", tarjima: "Yoz! (ayolga)", izoh: "2-shaxs yagona ayol — ي qo'shildi" },
          { arabcha: "اُكْتُبُوا!", oqilishi: "uktubu!", tarjima: "Yozinglar! (erkaklarga)", izoh: "2-shaxs ko'plik erkak — وا" },
          { arabcha: "اِذْهَبْ!", oqilishi: "izhhab!", tarjima: "Bor!", izoh: "ذَهَبَ dan buyruq" },
          { arabcha: "تَعَالَ!", oqilishi: "ta'ala!", tarjima: "Kel! (erkakka)", izoh: "keng ishlatiladigan buyruq" },
          { arabcha: "اِجْلِسْ!", oqilishi: "ijlis!", tarjima: "O'tir!", izoh: "جَلَسَ dan buyruq" },
        ],
        misol: [
          "لَا تَأْكُلْ كَثِيرًا (ko'p yema!)",
          "اِقْرَأ هَذَا الْكِتَابَ (bu kitobni o'qi!)",
          "لَمْ يَذْهَبْ أَحَدٌ (hech kim bormadi)",
          "لَنْ أَنْسَى هَذَا (men buni hech unutmayman)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "لَا أُحِبُّ الطَّقْسَ الْبَارِدَ", oqilishi: "la uhibbu t-taqsa l-barid", tarjima: "Men sovuq havoni yoqtirmayman" },
      { arabcha: "لَمْ أَنَمْ جَيِّدًا الْبَارِحَةَ", oqilishi: "lam anam jayyidan al-bariha", tarjima: "Kecha yaxshi uxlamadim" },
      { arabcha: "لَنْ أَنْسَى هَذَا الْيَوْمَ", oqilishi: "lan ansa haza l-yawm", tarjima: "Men bu kunni unutmayman (hech qachon)" },
      { arabcha: "اِجْلِسْ وَاسْمَعْ جَيِّدًا", oqilishi: "ijlis wasma' jayyidan", tarjima: "O'tir va yaxshilab tingla" },
      { arabcha: "لَا تَتَأَخَّرْ غَدًا", oqilishi: "la tata'akhkhar ghadan", tarjima: "Erta kechikma" },
      { arabcha: "لَيْسَ هَذَا صَعْبًا", oqilishi: "laysa haza sa'ban", tarjima: "Bu qiyin emas" },
    ],
    istima: [
      { arabcha: "لَا أَعْرِفُ", oqilishi: "la a'rifu", tarjima: "Men bilmayman", izoh: "لَا + mudori' inkor" },
      { arabcha: "لَمْ يَذْهَبْ", oqilishi: "lam yazhhab", tarjima: "U bormadi", izoh: "لَمْ + majzum" },
      { arabcha: "لَنْ أَرْجِعَ", oqilishi: "lan arji'a", tarjima: "Men qaytmayman", izoh: "لَنْ + mansub" },
      { arabcha: "اُكْتُبْ!", oqilishi: "uktub!", tarjima: "Yoz!", izoh: "buyruq mayli" },
      { arabcha: "لَا تَذْهَبْ!", oqilishi: "la tazhab!", tarjima: "Borma!", izoh: "taqiq buyruq" },
      { arabcha: "لَيْسَ هُنَا", oqilishi: "laysa huna", tarjima: "U bu yerda emas", izoh: "لَيْسَ — emas" },
    ],
    kitoba: [
      { topshiriq: "أَذْهَبُ ni o'tgan zamon inkori (لَمْ) bilan yozing", misol: "→ لَمْ أَذْهَبْ (men bormadim)" },
      { topshiriq: "يَكْتُبُ ni hozirgi inkor (لَا) bilan yozing", misol: "→ لَا يَكْتُبُ (u yozmaydi)" },
      { topshiriq: "اِذْهَبْ dan taqiq shakl yasang (لَا bilan)", misol: "→ لَا تَذْهَبْ! (borma!)" },
      { topshiriq: "لَيْسَ ishlatib gap tuzing", misol: "→ لَيْسَ الطَّقْسُ جَيِّدًا (havo yaxshi emas)" },
    ],
    test: [
      { savol: "لَمْ أَذْهَبْ gapini tarjima qiling", variantlar: ["Men boraman", "Men bormadim", "Men bormayman (kelajak)", "U bormadi"], togri: 1 },
      { savol: "Kelajak inkori uchun qaysi zarracha ishlatiladi?", variantlar: ["لَا", "لَمْ", "لَنْ", "لَيْسَ"], togri: 2 },
      { savol: "اُكْتُبْ! so'zi nima?", variantlar: ["Hozirgi zamon", "O'tgan zamon", "Buyruq mayli", "Inkor"], togri: 2 },
      { savol: "لَا تَذْهَبْ! nima degan ma'no?", variantlar: ["Bor!", "Sen borasan", "Borma!", "U bormadi"], togri: 2 },
      { savol: "لَيْسَ qanday ma'no bildiradi?", variantlar: ["Bor/mavjud", "Emas/yo'q", "Va", "Lekin"], togri: 1 },
    ],
  },

  {
    id: 12,
    nomi: "Masdar va ism fa'il",
    daraja: "B1",
    icon: "🔧",
    rang: "#059669",
    mavzu: "المصدر واسم الفاعل — harakat nomi va bajaruvchi",
    qoida: [
      {
        sarlavha: "Masdar — harakat nomi",
        tavsif:
          "Masdar fe'lning ot shakli — harakat nomi. " +
          "U arabchada bir necha vazn (wazn) bo'yicha yasaladi. " +
          "Eng ko'p uchraydigan vazn: فِعَالَة, فُعُول, فَعْل, تَفْعِيل.",
        jadval: [
          { arabcha: "كِتَابَة", oqilishi: "kitaba", tarjima: "yozish", izoh: "كَتَبَ → فِعَالَة vazni" },
          { arabcha: "قِرَاءَة", oqilishi: "qira'a", tarjima: "o'qish", izoh: "قَرَأَ → فِعَالَة vazni" },
          { arabcha: "ذَهَاب", oqilishi: "zahab", tarjima: "borish", izoh: "ذَهَبَ → فَعَال vazni" },
          { arabcha: "تَعَلُّم", oqilishi: "ta'allum", tarjima: "o'rganish", izoh: "تَعَلَّمَ → تَفَعُّل vazni" },
          { arabcha: "دِرَاسَة", oqilishi: "dirasa", tarjima: "o'qish/ta'lim", izoh: "دَرَسَ → فِعَالَة vazni" },
          { arabcha: "عَمَل", oqilishi: "'amal", tarjima: "ish/ishlash", izoh: "عَمِلَ → فَعَل vazni" },
        ],
      },
      {
        sarlavha: "Ism fa'il va ism maf'ul",
        tavsif:
          "Ism fa'il — ish bajaruvchi (faol). Vazni: فَاعِل. " +
          "Ism maf'ul — ish bajarilgan ob'ekt (passiv). Vazni: مَفْعُول.",
        jadval: [
          { arabcha: "كَاتِب", oqilishi: "katib", tarjima: "yozuvchi", izoh: "ism fa'il: فَاعِل vazni" },
          { arabcha: "قَارِئ", oqilishi: "qari'", tarjima: "o'quvchi (kitob)", izoh: "ism fa'il: فَاعِل vazni" },
          { arabcha: "مُعَلِّم", oqilishi: "muallim", tarjima: "o'qituvchi", izoh: "ism fa'il: مُفَعِّل vazni" },
          { arabcha: "مَكْتُوب", oqilishi: "maktub", tarjima: "yozilgan (xat)", izoh: "ism maf'ul: مَفْعُول vazni" },
          { arabcha: "مَفْتُوح", oqilishi: "maftuh", tarjima: "ochilgan", izoh: "ism maf'ul: مَفْعُول vazni" },
          { arabcha: "مَسْمُوع", oqilishi: "masmu'", tarjima: "eshitilgan", izoh: "ism maf'ul: مَفْعُول vazni" },
        ],
        misol: [
          "كَاتِب (yozuvchi) — ism fa'il",
          "مَكْتُوب (yozilgan) — ism maf'ul",
          "تَعَلُّم الْعَرَبِيَّة مُمْتِع (arabcha o'rganish qiziq)",
          "الدِّرَاسَةُ مُهِمَّةٌ (o'qish muhim)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "الْكِتَابَةُ مَهَارَةٌ مُهِمَّةٌ", oqilishi: "al-kitabatu maharatun muhimma", tarjima: "Yozish muhim ko'nikma" },
      { arabcha: "هُوَ كَاتِبٌ مَشْهُورٌ", oqilishi: "huwa katibun mashhur", tarjima: "U mashhur yozuvchi" },
      { arabcha: "هَذِهِ الرِّسَالَةُ مَكْتُوبَةٌ بِالْعَرَبِيَّةِ", oqilishi: "hazihi r-risalatu maktubatun bil-'arabiyya", tarjima: "Bu xat arabcha yozilgan" },
      { arabcha: "أُحِبُّ الْقِرَاءَةَ كُلَّ يَوْمٍ", oqilishi: "uhibbu l-qira'ata kulla yawm", tarjima: "Men har kuni o'qishni yaxshi ko'raman" },
      { arabcha: "الْبَابُ مَفْتُوحٌ", oqilishi: "al-babu maftuh", tarjima: "Eshik ochiq (ochilgan)" },
      { arabcha: "تَعَلُّمُ لُغَةٍ جَدِيدَةٍ صَعْبٌ وَمُمْتِعٌ", oqilishi: "ta'allumal lughatun jadidatin sa'bun wa mumti'", tarjima: "Yangi til o'rganish qiyin va qiziqarli" },
    ],
    istima: [
      { arabcha: "كِتَابَة", oqilishi: "kitaba", tarjima: "yozish (masdar)", izoh: "فِعَالَة vazni" },
      { arabcha: "دِرَاسَة", oqilishi: "dirasa", tarjima: "o'qish/ta'lim (masdar)", izoh: "فِعَالَة vazni" },
      { arabcha: "كَاتِب", oqilishi: "katib", tarjima: "yozuvchi (ism fa'il)", izoh: "فَاعِل vazni" },
      { arabcha: "مَكْتُوب", oqilishi: "maktub", tarjima: "yozilgan (ism maf'ul)", izoh: "مَفْعُول vazni" },
      { arabcha: "مَفْتُوح", oqilishi: "maftuh", tarjima: "ochilgan", izoh: "مَفْعُول vazni" },
      { arabcha: "تَعَلُّم", oqilishi: "ta'allum", tarjima: "o'rganish (masdar)", izoh: "تَفَعُّل vazni" },
    ],
    kitoba: [
      { topshiriq: "كَتَبَ dan masdar (harakat nomi) yasang", misol: "→ كِتَابَة (yozish)" },
      { topshiriq: "كَتَبَ dan ism fa'il yasang", misol: "→ كَاتِب (yozuvchi)" },
      { topshiriq: "كَتَبَ dan ism maf'ul yasang", misol: "→ مَكْتُوب (yozilgan)" },
      { topshiriq: "مَفْتُوح so'zini gapda ishlating", misol: "→ الْبَابُ مَفْتُوحٌ (eshik ochiq)" },
    ],
    test: [
      { savol: "كِتَابَة so'zi nima?", variantlar: ["Fe'l", "Sifat", "Masdar (harakat nomi)", "Olmosh"], togri: 2 },
      { savol: "Ism fa'il qanday vazn bo'yicha yasaladi?", variantlar: ["مَفْعُول", "فَاعِل", "فِعَالَة", "تَفَعُّل"], togri: 1 },
      { savol: "مَكْتُوب so'zi nima ma'noni anglatadi?", variantlar: ["Yozuvchi", "Yozish", "Yozilgan", "Yozmoq"], togri: 2 },
      { savol: "قَارِئ so'zi nima?", variantlar: ["O'qilgan", "O'qish", "O'quvchi (kitob)", "O'qituvchi"], togri: 2 },
      { savol: "مَفْتُوح qaysi vazn?", variantlar: ["فَاعِل", "فِعَالَة", "مَفْعُول", "تَفَعُّل"], togri: 2 },
    ],
  },

  // ─── B2 ─────────────────────────────────────────────────────────────────────
  {
    id: 13,
    nomi: "Kaan va naqis fe'llar",
    daraja: "B2",
    icon: "⚡",
    rang: "#CA8A04",
    mavzu: "كَانَ وَأَخَوَاتُهَا — o'tgan davomli holat fe'llari",
    qoida: [
      {
        sarlavha: "كَانَ va uning qo'llanilishi",
        tavsif:
          "كَانَ (kana) — 'edi/bo'ldi' ma'nosidagi naqis fe'l. " +
          "U gapning mubtado (ega) va xabarini (kesim) bog'laydi. " +
          "كَانَ dan keyin mubtado rafa' (damma), xabar esa nasb (fatha) oladi.",
        jadval: [
          { arabcha: "كَانَ الطَّقْسُ بَارِدًا", oqilishi: "kanat-taqsu baridan", tarjima: "Havo sovuq edi", izoh: "كَانَ + mubtado(rafa') + xabar(nasb)" },
          { arabcha: "كُنْتُ طَالِبًا", oqilishi: "kuntu taliban", tarjima: "Men o'quvchi edim", izoh: "كَانَ 1-shaxs yagona" },
          { arabcha: "كَانَتِ الْمَدِينَةُ صَغِيرَةً", oqilishi: "kanatil-madinatu saghiratan", tarjima: "Shahar kichik edi", izoh: "muannash + xabar nasb" },
          { arabcha: "كَانُوا أَصْدِقَاءَ", oqilishi: "kanu asdiqa'a", tarjima: "Ular do'st edilar", izoh: "ko'plik shakli" },
          { arabcha: "كَانَ يَعْمَلُ هُنَا", oqilishi: "kana ya'malu huna", tarjima: "U bu yerda ishlar edi", izoh: "كَانَ + mudori' = davomli o'tgan" },
        ],
      },
      {
        sarlavha: "Kaan ning inkor va boshqa naqis fe'llar",
        tavsif:
          "كَانَ ning inkori: لَمْ يَكُنْ (bo'lmadi/emas edi). " +
          "Boshqa naqis fe'llar: أَصْبَحَ (bo'ldi/tong bo'ldi), صَارَ (aylandi), لَيْسَ (emas hozir).",
        jadval: [
          { arabcha: "لَمْ يَكُنْ مَوْجُودًا", oqilishi: "lam yakun mawjudan", tarjima: "U mavjud emas edi", izoh: "لَمْ + يَكُنْ = o'tgan inkor" },
          { arabcha: "لَيْسَ الْجَوُّ حَارًّا", oqilishi: "laysa l-jawwu harran", tarjima: "Havo issiq emas", izoh: "لَيْسَ = hozirgi inkor" },
          { arabcha: "أَصْبَحَ مُهَنْدِسًا", oqilishi: "asbaha muhandisan", tarjima: "U muhandis bo'ldi", izoh: "أَصْبَحَ = bo'ldi" },
          { arabcha: "صَارَ الطِّفْلُ كَبِيرًا", oqilishi: "sarat-tiflul kabiran", tarjima: "Bola katta bo'ldi", izoh: "صَارَ = aylandi/bo'ldi" },
        ],
        misol: [
          "كُنَّا أَصْدِقَاءَ (biz do'st edik)",
          "كَانَ الْجَوُّ جَمِيلًا (havo chiroyli edi)",
          "لَيْسَ هَذَا صَحِيحًا (bu to'g'ri emas)",
          "أَصْبَحَ مَشْهُورًا (u mashhur bo'ldi)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "كَانَتِ السَّمَاءُ صَافِيَةً أَمْسِ", oqilishi: "kanatissama'u safiyatan amsi", tarjima: "Kecha osmon ochiq edi" },
      { arabcha: "كُنْتُ أَعِيشُ فِي مَدِينَةٍ صَغِيرَةٍ", oqilishi: "kuntu a'ishu fi madinatin saghiratin", tarjima: "Men kichik shaharda yashar edim" },
      { arabcha: "لَمْ يَكُنِ الطَّرِيقُ مُزْدَحِمًا", oqilishi: "lam yakunit-tariqu muzdahiman", tarjima: "Yo'l gavjum emas edi" },
      { arabcha: "أَصْبَحَتِ الشَّرِكَةُ كَبِيرَةً", oqilishi: "asbahatish-sharikatu kabiratan", tarjima: "Kompaniya katta bo'ldi" },
      { arabcha: "لَيْسَ الْأَمْرُ بِتِلْكَ الصُّعُوبَةِ", oqilishi: "laysal-amru bitilkas-su'uba", tarjima: "Ish o'sha qadar qiyin emas" },
      { arabcha: "كَانَ يَدْرُسُ كُلَّ لَيْلَةٍ", oqilishi: "kana yadrusu kulla layla", tarjima: "U har kecha o'qir edi" },
    ],
    istima: [
      { arabcha: "كَانَ", oqilishi: "kana", tarjima: "edi/bo'ldi (erkak)", izoh: "naqis fe'l asosiy shakli" },
      { arabcha: "كُنْتُ", oqilishi: "kuntu", tarjima: "men edim", izoh: "1-shaxs yagona" },
      { arabcha: "كَانُوا", oqilishi: "kanu", tarjima: "ular edilar", izoh: "ko'plik erkak" },
      { arabcha: "لَمْ يَكُنْ", oqilishi: "lam yakun", tarjima: "u emas edi", izoh: "inkor shakl" },
      { arabcha: "لَيْسَ", oqilishi: "laysa", tarjima: "emas (hozir)", izoh: "hozirgi inkor naqis fe'l" },
      { arabcha: "أَصْبَحَ", oqilishi: "asbaha", tarjima: "bo'ldi/aylandi", izoh: "kaan ning sinonimlari" },
    ],
    kitoba: [
      { topshiriq: "كَانَ ishlatib gap tuzing (o'tgan holat)", misol: "→ كَانَ الطَّقْسُ جَمِيلًا (havo chiroyli edi)" },
      { topshiriq: "كُنْتُ بilan o'tgan davomli gap tuzing", misol: "→ كُنْتُ أَعْمَلُ فِي الْمَكْتَبِ (idorada ishlar edim)" },
      { topshiriq: "لَيْسَ ishlatib inkor gapi tuzing", misol: "→ لَيْسَ هَذَا صَحِيحًا (bu to'g'ri emas)" },
      { topshiriq: "كَانَ ning ko'plik shaklini yozing", misol: "→ كَانُوا طُلَّابًا (ular o'quvchi edilar)" },
    ],
    test: [
      { savol: "كَانَ الطَّقْسُ بَارِدًا gapini tarjima qiling", variantlar: ["Havo sovuq", "Havo sovuq edi", "Havo sovuq bo'ladi", "Havo sovuq emas"], togri: 1 },
      { savol: "كَانَ ning inkori qanday?", variantlar: ["لَا كَانَ", "لَمْ يَكُنْ", "لَنْ يَكُنَ", "لَيْسَ كَانَ"], togri: 1 },
      { savol: "لَيْسَ va لَمْ يَكُنْ farqi nima?", variantlar: ["Farq yo'q", "لَيْسَ hozirgi, لَمْ يَكُنْ o'tgan", "لَيْسَ o'tgan, لَمْ يَكُنْ hozirgi", "Ikkalasi kelajak"], togri: 1 },
      { savol: "أَصْبَحَ فَنَّانًا gapini tarjima qiling", variantlar: ["U rassom edi", "U rassom bo'ldi", "U rassom emas", "U rassom bo'ladi"], togri: 1 },
      { savol: "كُنَّا أَصْدِقَاءَ gapini tarjima qiling", variantlar: ["Biz do'stmiz", "Biz do'st edik", "Ular do'st edilar", "Men do'st edim"], togri: 1 },
    ],
  },

  {
    id: 14,
    nomi: "Shart gaplari",
    daraja: "B2",
    icon: "🔀",
    rang: "#0E7490",
    mavzu: "الجملة الشرطية — agar ... bo'lsa ... tuzilmasi",
    qoida: [
      {
        sarlavha: "إِذَا — voqelikka yaqin shart",
        tavsif:
          "إِذَا (iza) — voqelikka yaqin yoki muqarrar shartni bildiradi. " +
          "Shart qismi o'tgan zamonda, natija qismi ham o'tgan yoki hozirgi zamonda bo'ladi. " +
          "إِنْ (in) ham xuddi shu ma'noda ishlatiladi.",
        jadval: [
          { arabcha: "إِذَا دَرَسْتَ نَجَحْتَ", oqilishi: "iza darastal najahta", tarjima: "Agar o'qisang, muvaffaq bo'lasan", izoh: "إِذَا + o'tgan + natija" },
          { arabcha: "إِذَا أَكَلْتَ كَثِيرًا سَمِنْتَ", oqilishi: "iza akaltal kathiran samintal", tarjima: "Agar ko'p yesang, semirasan", izoh: "tabiiy shart" },
          { arabcha: "إِنْ جِئْتَ مُبَكِّرًا وَجَدْتَ مَكَانًا", oqilishi: "in ji'tal mubakkiran wajadtal makanal", tarjima: "Erta kelsan, joy topasan", izoh: "إِنْ = إِذَا (zamonaviy)" },
          { arabcha: "إِذَا أَرَدْتَ النَّجَاحَ فَاعْمَلْ", oqilishi: "iza araddtan-najaha fa'mal", tarjima: "Muvaffaqiyat istasang, ish qil", izoh: "natijada buyruq mayli" },
        ],
      },
      {
        sarlavha: "لَوْ — xayoliy (haqiqatga zid) shart",
        tavsif:
          "لَوْ (law) — haqiqatda bo'lmagan yoki imkonsiz shartni bildiradi. " +
          "Ikkala qism ham o'tgan zamonda bo'ladi. " +
          "Natija qismida ko'pincha لَ prefiksi keladi.",
        jadval: [
          { arabcha: "لَوْ دَرَسْتَ لَنَجَحْتَ", oqilishi: "law darastal lanajahta", tarjima: "O'qiganingda edi, muvaffaq bo'lar eding", izoh: "haqiqatda o'qimadi" },
          { arabcha: "لَوْ كَانَ مَعِي لَسَاعَدَنِي", oqilishi: "law kana ma'i lasa'adani", tarjima: "Yonimda bo'lganida, yordam berar edi", izoh: "haqiqatda yonida emas edi" },
          { arabcha: "لَوْ كُنْتُ طَيَّارًا لَطِرْتُ", oqilishi: "law kuntu tayyaran latirtu", tarjima: "Uchuvchi bo'lganimda, uchgan bo'lardim", izoh: "imkonsiz shart" },
        ],
        misol: [
          "إِذَا تَعِبْتَ اسْتَرِحْ (charchasan, dam ol)",
          "إِنْ أَرَدْتَ أُسَاعِدُكَ (istasang, yordam beraman)",
          "لَوْ عَرَفْتُ لَأَخْبَرْتُكَ (bilganimda, aytib berar edim)",
          "لَوْ كَانَ الْأَمْرُ سَهْلًا... (ish oson bo'lganda edi...)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "إِذَا أَرَدْتَ النَّجَاحَ فَابْدَأْ الْآنَ", oqilishi: "iza araddtan-najaha fabda' al-an", tarjima: "Muvaffaqiyat istasang, hoziroq boshla" },
      { arabcha: "إِنْ سَاعَدْتَنِي سَأُسَاعِدُكَ", oqilishi: "in sa'adtani sa-usa'iduka", tarjima: "Yordam bersang, men ham yordam beraman" },
      { arabcha: "لَوْ كُنْتُ أَعْرِفُ لَأَخْبَرْتُكَ", oqilishi: "law kuntu a'rifu la-akhbartuka", tarjima: "Bilganimda aytib berar edim" },
      { arabcha: "إِذَا جَاءَ الْمَطَرُ أَبْقَى فِي الْبَيْتِ", oqilishi: "iza ja'al-mataru abqa fil-bayt", tarjima: "Yomg'ir yog'sa, uyda qolaman" },
      { arabcha: "لَوْ كَانَ عِنْدِي وَقْتٌ لَزُرْتُكَ", oqilishi: "law kana 'indi waqtun lazurtuka", tarjima: "Vaqtim bo'lganida, huzuringga borardim" },
      { arabcha: "إِنْ تَجْتَهِدْ تَنْجَحْ", oqilishi: "in tajtahid tanjih", tarjima: "Tirishsang, muvaffaq bo'lasan" },
    ],
    istima: [
      { arabcha: "إِذَا", oqilishi: "iza", tarjima: "agar (voqelikka yaqin)", izoh: "shart bog'lovchisi" },
      { arabcha: "إِنْ", oqilishi: "in", tarjima: "agar (qisqa shakl)", izoh: "إِذَا ning qisqa shakli" },
      { arabcha: "لَوْ", oqilishi: "law", tarjima: "agar (xayoliy)", izoh: "haqiqatga zid shart" },
      { arabcha: "إِذَا دَرَسْتَ نَجَحْتَ", oqilishi: "iza darastal najahta", tarjima: "O'qisang, muvaffaq bo'lasan", izoh: "voqelikka yaqin shart" },
      { arabcha: "لَوْ دَرَسْتَ لَنَجَحْتَ", oqilishi: "law darastal lanajahta", tarjima: "O'qiganingda, muvaffaq bo'lar eding", izoh: "xayoliy shart" },
      { arabcha: "إِنْ جِئْتَ وَجَدْتَنِي", oqilishi: "in ji'tal wajadtani", tarjima: "Kelsan, meni topasan", izoh: "إِنْ shart" },
    ],
    kitoba: [
      { topshiriq: "إِذَا ishlatib shart gapi tuzing", misol: "→ إِذَا أَكَلْتَ كَثِيرًا مَرِضْتَ (ko'p yesang, kasal bo'lasan)" },
      { topshiriq: "لَوْ ishlatib xayoliy shart tuzing", misol: "→ لَوْ كُنْتُ غَنِيًّا لَسَافَرْتُ (boy bo'lganimda, sayohat qilardim)" },
      { topshiriq: "إِذَا va لَوْ farqini misollar bilan tushuntiring", misol: "إِذَا = muqarrar shart, لَوْ = amalga oshmaydigan shart" },
      { topshiriq: "إِنْ تَجْتَهِدْ تَنْجَحْ gapini tarjima qiling", misol: "→ Tirishsang, muvaffaq bo'lasan" },
    ],
    test: [
      { savol: "إِذَا va لَوْ o'rtasidagi asosiy farq nima?", variantlar: ["Farq yo'q", "إِذَا voqelikka yaqin, لَوْ xayoliy", "إِذَا kelajak, لَوْ o'tgan", "إِذَا inkor, لَوْ tasdiq"], togri: 1 },
      { savol: "لَوْ دَرَسْتَ لَنَجَحْتَ gapini tarjima qiling", variantlar: ["O'qisang, muvaffaq bo'lasan", "O'qiganingda, muvaffaq bo'lar eding", "O'qi va muvaffaq bo'l", "O'qimadim, muvaffaq bo'lmadim"], togri: 1 },
      { savol: "إِذَا dan keyin fe'l qaysi zamonda keladi?", variantlar: ["Hozirgi zamon", "O'tgan zamon (shart uchun)", "Kelasi zamon", "Buyruq"], togri: 1 },
      { savol: "إِنْ تَجْتَهِدْ تَنْجَحْ gapini tarjima qiling", variantlar: ["Tirishtim, muvaffaq bo'ldim", "Tirishsang, muvaffaq bo'lasan", "Tirishganimda, muvaffaq bo'lar edim", "Tirish va muvaffaq bo'l"], togri: 1 },
      { savol: "لَوْ shart gapida natija qismida odatda qanday prefiks keladi?", variantlar: ["سَ", "لَ", "لَنْ", "لَمْ"], togri: 1 },
    ],
  },

  {
    id: 15,
    nomi: "Fe'l tizimlari (mazid)",
    daraja: "B2",
    icon: "🌳",
    rang: "#7C3AED",
    mavzu: "الأفعال المزيدة — fe'l ildizidan yasalgan kengaytirilgan shakllar",
    qoida: [
      {
        sarlavha: "Mujarrad va mazid fe'llar",
        tavsif:
          "Arabcha fe'llarning asosi 3 harfli ildiz (mujarrad). " +
          "Bu ildizga harf qo'shib yangi ma'noli mazid fe'llar hosil qilinadi. " +
          "Eng ko'p ishlatiladigan vazn II: fakkala — ikkinchi harf ikkilanadi va ma'no kuchayadi.",
        jadval: [
          { arabcha: "كَتَبَ → كَتَّبَ", oqilishi: "kataba → kattaba", tarjima: "yozdi → yozdirib topshirdi", izoh: "vazn II: ikkinchi harf ikkilanadi" },
          { arabcha: "دَرَسَ → دَرَّسَ", oqilishi: "darasa → darrasa", tarjima: "o'qidi → o'qitdi", izoh: "vazn II: o'qituvchi qilish" },
          { arabcha: "خَرَجَ → أَخْرَجَ", oqilishi: "kharaja → akhraja", tarjima: "chiqdi → chiqardi", izoh: "vazn IV: أَ prefiksi = sabab" },
          { arabcha: "فَهِمَ → فَهَّمَ", oqilishi: "fahima → fahhama", tarjima: "tushundi → tushuntirdi", izoh: "vazn II: tushuntirish" },
          { arabcha: "جَلَسَ → أَجْلَسَ", oqilishi: "jalasa → ajlasa", tarjima: "o'tirdi → o'tqizdi", izoh: "vazn IV: sabab bildirish" },
          { arabcha: "عَلِمَ → عَلَّمَ", oqilishi: "'alima → 'allama", tarjima: "bildi → o'rgatti", izoh: "vazn II" },
        ],
      },
      {
        sarlavha: "Vazn V va VI — o'zlikka va o'zaro",
        tavsif:
          "Vazn V (تَفَعَّلَ): o'zlik ma'nosini bildiradi — o'z-o'ziga bajarilgan ish. " +
          "Vazn VI (تَفَاعَلَ): o'zaro, ikki tomon o'rtasidagi ish.",
        jadval: [
          { arabcha: "عَلَّمَ → تَعَلَّمَ", oqilishi: "'allama → ta'allama", tarjima: "o'rgatti → o'rgandi", izoh: "vazn V: تَ prefiksi = o'zlik" },
          { arabcha: "كَسَرَ → تَكَسَّرَ", oqilishi: "kasara → takassara", tarjima: "sindirdi → sindi (o'z-o'zidan)", izoh: "vazn V: passiv o'zlik" },
          { arabcha: "كَتَبَ → تَكَاتَبَ", oqilishi: "kataba → takataba", tarjima: "yozdi → yozishdillar (bir-biriga)", izoh: "vazn VI: o'zaro" },
          { arabcha: "صَادَقَ → تَصَادَقَ", oqilishi: "sadaqa → tasadaqa", tarjima: "do'stlashdi → o'zaro do'stlashdi", izoh: "vazn VI: ikki taraflama" },
        ],
        misol: [
          "دَرَّسَ الْمُعَلِّمُ (o'qituvchi o'qitdi) — vazn II",
          "تَعَلَّمَ الطَّالِبُ (o'quvchi o'rgandi) — vazn V",
          "أَخْرَجَ الْمُدِيرُ الْمَلَفَّ (direktor faylni chiqardi) — vazn IV",
          "تَكَاتَبَ الْأَصْدِقَاءُ (do'stlar xat yozdillar) — vazn VI",
        ],
      },
    ],
    qiroa: [
      { arabcha: "دَرَّسَ الْأُسْتَاذُ النَّحْوَ بِوُضُوح", oqilishi: "darrasa l-ustazu n-nahwa biwuduh", tarjima: "Ustoz grammatikani aniq o'qitdi" },
      { arabcha: "تَعَلَّمَ مُحَمَّدٌ الْإِنْجِلِيزِيَّةَ بِسُرْعَة", oqilishi: "ta'allama muhammadun al-injiliziyya bisur'a", tarjima: "Muhammad inglizchani tez o'rgandi" },
      { arabcha: "أَخْرَجَ الطَّبِيبُ الْمَرِيضَ مِنَ الْمُسْتَشْفَى", oqilishi: "akhrajat-tabibu l-marida minal-mustashfa", tarjima: "Shifokor bemorni kasalxonadan chiqardi" },
      { arabcha: "تَكَاتَبَ الصَّدِيقَانِ كُلَّ أُسْبُوع", oqilishi: "takataba s-sadiqani kulla usbu'", tarjima: "Ikki do'st har hafta xat yozishdi" },
      { arabcha: "كَسَرَ الطِّفْلُ الْكُوبَ وَتَكَسَّرَ", oqilishi: "kasarat-tiflu l-kuba watakassara", tarjima: "Bola kosani sindirdi va u sindi" },
      { arabcha: "عَلَّمَنِي أَبِي الرِّيَاضِيَّات", oqilishi: "'allamani abi r-riyadiyyat", tarjima: "Otam menga matematika o'rgatti" },
    ],
    istima: [
      { arabcha: "دَرَّسَ", oqilishi: "darrasa", tarjima: "o'qitdi (vazn II)", izoh: "دَرَسَ → دَرَّسَ" },
      { arabcha: "تَعَلَّمَ", oqilishi: "ta'allama", tarjima: "o'rgandi (vazn V)", izoh: "عَلَّمَ → تَعَلَّمَ" },
      { arabcha: "أَخْرَجَ", oqilishi: "akhraja", tarjima: "chiqardi (vazn IV)", izoh: "خَرَجَ → أَخْرَجَ" },
      { arabcha: "فَهَّمَ", oqilishi: "fahhama", tarjima: "tushuntirdi (vazn II)", izoh: "فَهِمَ → فَهَّمَ" },
      { arabcha: "تَكَاتَبَ", oqilishi: "takataba", tarjima: "xat yozishdi (vazn VI)", izoh: "o'zaro fe'l" },
      { arabcha: "أَجْلَسَ", oqilishi: "ajlasa", tarjima: "o'tqizdi (vazn IV)", izoh: "جَلَسَ → أَجْلَسَ" },
    ],
    kitoba: [
      { topshiriq: "دَرَسَ dan vazn II yasang va ma'nosini ayting", misol: "→ دَرَّسَ (o'qitdi)" },
      { topshiriq: "عَلَّمَ dan vazn V yasang va ma'nosini ayting", misol: "→ تَعَلَّمَ (o'rgandi)" },
      { topshiriq: "خَرَجَ dan vazn IV yasang va ma'nosini ayting", misol: "→ أَخْرَجَ (chiqardi/chiqazdi)" },
      { topshiriq: "Vazn II va V ning asosiy farqini misollar bilan tushuntiring", misol: "دَرَّسَ = o'qitdi (boshqaga), تَعَلَّمَ = o'rgandi (o'zi)" },
    ],
    test: [
      { savol: "دَرَّسَ so'zi qaysi vazn?", variantlar: ["Mujarrad (I)", "Vazn II", "Vazn IV", "Vazn V"], togri: 1 },
      { savol: "تَعَلَّمَ so'zi qaysi mujarrad fe'ldan yasalgan?", variantlar: ["دَرَسَ", "كَتَبَ", "عَلَّمَ", "عَلِمَ"], togri: 3 },
      { savol: "Vazn IV (أَفْعَلَ) qanday ma'no qo'shadi?", variantlar: ["O'zlik", "Sabab/ettirish", "O'zaro", "Ko'plik"], togri: 1 },
      { savol: "أَخْرَجَ so'zi nima degan ma'no?", variantlar: ["Chiqdi", "Chiqardi/chiqazdi", "Chiqing!", "Chiqqan"], togri: 1 },
      { savol: "Vazn VI (تَفَاعَلَ) qanday ma'no bildiradi?", variantlar: ["O'zlik (o'z-o'ziga)", "O'zaro (ikki taraf)", "Sabab", "Passiv"], togri: 1 },
    ],
  },
];

export const GRAM_DARAJALAR: GramDarajaInfo[] = [
  {
    kod: "A0-A1",
    nomi: "Boshlang'ich daraja",
    rang: "#2563EB",
    davomiyligi: "2 oy",
    oylar: 2,
    haftalar: 8,
    jami_kunlar: 48,
    darslar: 16,
    jadval: [
      {
        hafta: 1,
        kunlar: [
          { kuni: 1, mavzu: "Kirish — arabcha va grammatika nima?", tur: "dars" },
          { kuni: 2, mavzu: "Ismlar: muzakkar va muannash (1-dars)", darsId: 1, tur: "dars" },
          { kuni: 3, mavzu: "1-darsni tahlil va mashq qilish", tur: "tahlil" },
          { kuni: 4, mavzu: "Shaxs olmoshlari — yagona (2-dars)", darsId: 2, tur: "dars" },
          { kuni: 5, mavzu: "2-darsni tahlil va mashq qilish", tur: "tahlil" },
          { kuni: 6, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 2,
        kunlar: [
          { kuni: 7, mavzu: "Ko'plik olmoshlari (2-dars davomi)", darsId: 2, tur: "dars" },
          { kuni: 8, mavzu: "Ishorali olmoshlar (3-dars)", darsId: 3, tur: "dars" },
          { kuni: 9, mavzu: "3-darsni tahlil va mashq", tur: "tahlil" },
          { kuni: 10, mavzu: "1–3 darslar takrori", tur: "tahlil" },
          { kuni: 11, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 12, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 3,
        kunlar: [
          { kuni: 13, mavzu: "Al- aniqlik artikli", tur: "dars" },
          { kuni: 14, mavzu: "Al- mashq va misollar", tur: "tahlil" },
          { kuni: 15, mavzu: "Ot va sifat birikmas", tur: "dars" },
          { kuni: 16, mavzu: "Sifat mosligi mashqi", tur: "tahlil" },
          { kuni: 17, mavzu: "Yangi lug'atlar: kundalik hayot so'zlari", tur: "dars" },
          { kuni: 18, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 4,
        kunlar: [
          { kuni: 19, mavzu: "Oddiy gap tuzilmasi (SVO)", tur: "dars" },
          { kuni: 20, mavzu: "Gap tuzilmasi mashqi", tur: "tahlil" },
          { kuni: 21, mavzu: "Tanishuv jumlalari", tur: "dars" },
          { kuni: 22, mavzu: "Tanishuv dialogini yozish", tur: "tahlil" },
          { kuni: 23, mavzu: "Oy davomidagi o'quv natijalarini tahlil qilish", tur: "tahlil" },
          { kuni: 24, mavzu: "1-oy yakuniy imtihon", tur: "imtihon" },
        ],
      },
      {
        hafta: 5,
        kunlar: [
          { kuni: 25, mavzu: "Sonlar 1–10", tur: "dars" },
          { kuni: 26, mavzu: "Sonlar 11–100", tur: "dars" },
          { kuni: 27, mavzu: "Son + ism birikmas", tur: "tahlil" },
          { kuni: 28, mavzu: "Ranglar va tavsif", tur: "dars" },
          { kuni: 29, mavzu: "Ranglar mashqi", tur: "tahlil" },
          { kuni: 30, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 6,
        kunlar: [
          { kuni: 31, mavzu: "Predloglar: في، على، من، إلى", tur: "dars" },
          { kuni: 32, mavzu: "Predloglar bilan gaplar tuzish", tur: "tahlil" },
          { kuni: 33, mavzu: "Fe'l: o'tgan zamon kirish", tur: "dars" },
          { kuni: 34, mavzu: "Fe'l o'tgan zamon mashqi", tur: "tahlil" },
          { kuni: 35, mavzu: "Dialog: Qayerda turasan?", tur: "dars" },
          { kuni: 36, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 7,
        kunlar: [
          { kuni: 37, mavzu: "Fe'l: hozirgi zamon kirish", tur: "dars" },
          { kuni: 38, mavzu: "Fe'l hozirgi zamon mashqi", tur: "tahlil" },
          { kuni: 39, mavzu: "Savol gaplari: هل va ما", tur: "dars" },
          { kuni: 40, mavzu: "Savol-javob mashqi", tur: "tahlil" },
          { kuni: 41, mavzu: "Inkor shakli: لا va لَيْسَ", tur: "dars" },
          { kuni: 42, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 8,
        kunlar: [
          { kuni: 43, mavzu: "Kundalik hayot dialoglari", tur: "dars" },
          { kuni: 44, mavzu: "Barcha mavzular takrori", tur: "tahlil" },
          { kuni: 45, mavzu: "Yozma test (A0-A1 barcha mavzulari)", tur: "imtihon" },
          { kuni: 46, mavzu: "Og'zaki dialog mashqi", tur: "tahlil" },
          { kuni: 47, mavzu: "Natijalar tahlili va A1 sertifikat", tur: "tahlil" },
          { kuni: 48, mavzu: "A0-A1 yakuniy imtihon", tur: "imtihon" },
        ],
      },
    ],
  },
  {
    kod: "A1-A2",
    nomi: "Boshlang'ich-o'rta daraja",
    rang: "#0891B2",
    davomiyligi: "2 oy",
    oylar: 2,
    haftalar: 8,
    jami_kunlar: 48,
    darslar: 20,
    jadval: [
      {
        hafta: 1,
        kunlar: [
          { kuni: 1, mavzu: "Kirish — A1 dan A2 ga o'tish", tur: "dars" },
          { kuni: 2, mavzu: "O'tgan zamon fe'li: tuzilishi (7-dars)", darsId: 7, tur: "dars" },
          { kuni: 3, mavzu: "O'tgan zamon: 3 va 2-shaxs shakllari", darsId: 7, tur: "dars" },
          { kuni: 4, mavzu: "O'tgan zamon mashqi va misollar", darsId: 7, tur: "tahlil" },
          { kuni: 5, mavzu: "O'tgan zamon: inkor shakli", darsId: 7, tur: "dars" },
          { kuni: 6, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 2,
        kunlar: [
          { kuni: 7, mavzu: "O'tgan zamon: savol shakllari", darsId: 7, tur: "dars" },
          { kuni: 8, mavzu: "O'tgan zamon: murakkab gaplar", darsId: 7, tur: "tahlil" },
          { kuni: 9, mavzu: "O'tgan zamon — yozma mashq", tur: "tahlil" },
          { kuni: 10, mavzu: "O'tgan zamon takrori", tur: "tahlil" },
          { kuni: 11, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 12, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 3,
        kunlar: [
          { kuni: 13, mavzu: "Kelishik harflari: في، على، من (8-dars)", darsId: 8, tur: "dars" },
          { kuni: 14, mavzu: "Kelishik harflari: إلى، عن، مع", darsId: 8, tur: "dars" },
          { kuni: 15, mavzu: "Kelishik harflari mashqi", darsId: 8, tur: "tahlil" },
          { kuni: 16, mavzu: "Kelishik harflari bilan gaplar", darsId: 8, tur: "tahlil" },
          { kuni: 17, mavzu: "Kelishik harflari: ko'p ma'noli ishlatish", darsId: 8, tur: "dars" },
          { kuni: 18, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 4,
        kunlar: [
          { kuni: 19, mavzu: "Kelishik harflari takrori", darsId: 8, tur: "tahlil" },
          { kuni: 20, mavzu: "Kelishik va o'tgan zamon birga", tur: "tahlil" },
          { kuni: 21, mavzu: "Oy yakuniy test (o'tgan zamon + kelishik)", tur: "imtihon" },
          { kuni: 22, mavzu: "Xatolar ustida ishlash", tur: "tahlil" },
          { kuni: 23, mavzu: "Sifat moslashuvi kirish (9-dars)", darsId: 9, tur: "dars" },
          { kuni: 24, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 5,
        kunlar: [
          { kuni: 25, mavzu: "Sifat: muzakkar va muannash moslashuvi", darsId: 9, tur: "dars" },
          { kuni: 26, mavzu: "Sifat: aniq va noaniq holat", darsId: 9, tur: "dars" },
          { kuni: 27, mavzu: "Sifat moslashuvi mashqi", darsId: 9, tur: "tahlil" },
          { kuni: 28, mavzu: "Sifat ko'pligi", darsId: 9, tur: "dars" },
          { kuni: 29, mavzu: "Sifat + ot birikmalari", darsId: 9, tur: "tahlil" },
          { kuni: 30, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 6,
        kunlar: [
          { kuni: 31, mavzu: "Sifat: taqqoslash darajasi", darsId: 9, tur: "dars" },
          { kuni: 32, mavzu: "Sifat mashqi — gaplar tuzish", darsId: 9, tur: "tahlil" },
          { kuni: 33, mavzu: "Murakkab sifat birikmalari", darsId: 9, tur: "dars" },
          { kuni: 34, mavzu: "O'tgan zamon + kelishik + sifat birga", tur: "tahlil" },
          { kuni: 35, mavzu: "Dialog: tavsif qilish", tur: "dars" },
          { kuni: 36, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 7,
        kunlar: [
          { kuni: 37, mavzu: "Barcha A2 mavzulari takrori", tur: "tahlil" },
          { kuni: 38, mavzu: "Og'zaki amaliyot: qisqa matn", tur: "tahlil" },
          { kuni: 39, mavzu: "Yozma mashq: 5-7 ta gap", tur: "tahlil" },
          { kuni: 40, mavzu: "Lug'at: A2 asosiy so'zlar", tur: "dars" },
          { kuni: 41, mavzu: "Mock test — A1-A2 umumiy", tur: "imtihon" },
          { kuni: 42, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 8,
        kunlar: [
          { kuni: 43, mavzu: "Xatolar tahlili va mustahkamlash", tur: "tahlil" },
          { kuni: 44, mavzu: "Yozma imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 45, mavzu: "A1-A2 yakuniy yozma imtihon", tur: "imtihon" },
          { kuni: 46, mavzu: "Og'zaki imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 47, mavzu: "Natijalar tahlili va A2 sertifikat", tur: "tahlil" },
          { kuni: 48, mavzu: "A1-A2 yakuniy imtihon", tur: "imtihon" },
        ],
      },
    ],
  },
  {
    kod: "A2-B1",
    nomi: "O'rta daraja",
    rang: "#16A34A",
    davomiyligi: "3 oy",
    oylar: 3,
    haftalar: 12,
    jami_kunlar: 72,
    darslar: 28,
    jadval: [
      {
        hafta: 1,
        kunlar: [
          { kuni: 1, mavzu: "Kirish — B1 darajasiga kirish", tur: "dars" },
          { kuni: 2, mavzu: "Hozirgi zamon fe'li: tuzilishi (10-dars)", darsId: 10, tur: "dars" },
          { kuni: 3, mavzu: "Hozirgi zamon: shaxs-son qo'shimchalari", darsId: 10, tur: "dars" },
          { kuni: 4, mavzu: "Hozirgi zamon mashqi va misollar", darsId: 10, tur: "tahlil" },
          { kuni: 5, mavzu: "Kelasi zamon: o'zgarishlar va foydalanish", darsId: 10, tur: "dars" },
          { kuni: 6, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 2,
        kunlar: [
          { kuni: 7, mavzu: "Hozirgi va kelasi zamon taqqoslash", darsId: 10, tur: "tahlil" },
          { kuni: 8, mavzu: "Fe'l zamonlari: uch zamon birga", darsId: 10, tur: "dars" },
          { kuni: 9, mavzu: "Zamon fe'llari mashqi", tur: "tahlil" },
          { kuni: 10, mavzu: "Zamon fe'llari — yozma mashq", tur: "tahlil" },
          { kuni: 11, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 12, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 3,
        kunlar: [
          { kuni: 13, mavzu: "Hozirgi zamon murakkab shakllari", darsId: 10, tur: "dars" },
          { kuni: 14, mavzu: "Fe'l zamon: gap ichida qo'llash", darsId: 10, tur: "tahlil" },
          { kuni: 15, mavzu: "Matn yozish: zamon fe'llari bilan", tur: "tahlil" },
          { kuni: 16, mavzu: "10-dars yakuniy takror", darsId: 10, tur: "tahlil" },
          { kuni: 17, mavzu: "1-oy imtihon (10-dars)", tur: "imtihon" },
          { kuni: 18, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 4,
        kunlar: [
          { kuni: 19, mavzu: "Inkor shakllari: لا va لَمْ (11-dars)", darsId: 11, tur: "dars" },
          { kuni: 20, mavzu: "Inkor: لَيْسَ va مَا", darsId: 11, tur: "dars" },
          { kuni: 21, mavzu: "Inkor shakllari mashqi", darsId: 11, tur: "tahlil" },
          { kuni: 22, mavzu: "Buyruq mayli: musbat shakl", darsId: 11, tur: "dars" },
          { kuni: 23, mavzu: "Buyruq mayli: inkor shakl", darsId: 11, tur: "dars" },
          { kuni: 24, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 5,
        kunlar: [
          { kuni: 25, mavzu: "Buyruq mayli mashqi", darsId: 11, tur: "tahlil" },
          { kuni: 26, mavzu: "Inkor + buyruq mayli birga", darsId: 11, tur: "tahlil" },
          { kuni: 27, mavzu: "Dialog: buyruq va taqiq ifodalash", darsId: 11, tur: "dars" },
          { kuni: 28, mavzu: "11-dars yakuniy mashq", darsId: 11, tur: "tahlil" },
          { kuni: 29, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 30, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 6,
        kunlar: [
          { kuni: 31, mavzu: "Inkor va buyruq: amaliy matn", darsId: 11, tur: "tahlil" },
          { kuni: 32, mavzu: "2-oy imtihon (10 va 11-darslar)", tur: "imtihon" },
          { kuni: 33, mavzu: "Masdar: ta'rif va turlari (12-dars)", darsId: 12, tur: "dars" },
          { kuni: 34, mavzu: "Masdar: qo'llanishi va misollar", darsId: 12, tur: "dars" },
          { kuni: 35, mavzu: "Masdar mashqi", darsId: 12, tur: "tahlil" },
          { kuni: 36, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 7,
        kunlar: [
          { kuni: 37, mavzu: "Ism fa'il: fa'ollik shakli", darsId: 12, tur: "dars" },
          { kuni: 38, mavzu: "Ism maf'ul: passiv shakl", darsId: 12, tur: "dars" },
          { kuni: 39, mavzu: "Masdar va ism fa'il mashqi", darsId: 12, tur: "tahlil" },
          { kuni: 40, mavzu: "Masdar va ism fa'il: gaplarda", darsId: 12, tur: "tahlil" },
          { kuni: 41, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 42, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 8,
        kunlar: [
          { kuni: 43, mavzu: "12-dars: murakkab misollar", darsId: 12, tur: "dars" },
          { kuni: 44, mavzu: "Masdar bilan gaplar tuzish", darsId: 12, tur: "tahlil" },
          { kuni: 45, mavzu: "B1 mavzulari takrori (zamon, inkor, masdar)", tur: "tahlil" },
          { kuni: 46, mavzu: "Og'zaki amaliyot: B1 mavzulari", tur: "tahlil" },
          { kuni: 47, mavzu: "Mock test — A2-B1 umumiy", tur: "imtihon" },
          { kuni: 48, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 9,
        kunlar: [
          { kuni: 49, mavzu: "B1 yozma amaliyot: qisqa insho", tur: "tahlil" },
          { kuni: 50, mavzu: "Lug'at: B1 asosiy so'zlar", tur: "dars" },
          { kuni: 51, mavzu: "B1 grammatika mustahkamlash", tur: "tahlil" },
          { kuni: 52, mavzu: "Tinglab tushunish mashqi", tur: "tahlil" },
          { kuni: 53, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 54, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 10,
        kunlar: [
          { kuni: 55, mavzu: "B1 matn tahlili", tur: "tahlil" },
          { kuni: 56, mavzu: "B1 barcha mavzular takrori", tur: "tahlil" },
          { kuni: 57, mavzu: "Yozma mashq: 10+ ta gap", tur: "tahlil" },
          { kuni: 58, mavzu: "3-oy imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 59, mavzu: "Mock test — B1 yakuniy", tur: "imtihon" },
          { kuni: 60, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 11,
        kunlar: [
          { kuni: 61, mavzu: "Xatolar tahlili va mustahkamlash", tur: "tahlil" },
          { kuni: 62, mavzu: "Og'zaki imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 63, mavzu: "Yozma imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 64, mavzu: "B1 yakuniy yozma imtihon", tur: "imtihon" },
          { kuni: 65, mavzu: "Natijalar tahlili", tur: "tahlil" },
          { kuni: 66, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 12,
        kunlar: [
          { kuni: 67, mavzu: "B1 og'zaki imtihon", tur: "imtihon" },
          { kuni: 68, mavzu: "B1 barcha test takrori", tur: "tahlil" },
          { kuni: 69, mavzu: "A2-B1 yakuniy imtihon", tur: "imtihon" },
          { kuni: 70, mavzu: "Natijalar muhokamasi", tur: "tahlil" },
          { kuni: 71, mavzu: "B1 sertifikat va B2 rejasi", tur: "tahlil" },
          { kuni: 72, mavzu: "Dam olish", tur: "dam" },
        ],
      },
    ],
  },
  {
    kod: "B1-B2",
    nomi: "O'rta-yuqori daraja",
    rang: "#CA8A04",
    davomiyligi: "3 oy",
    oylar: 3,
    haftalar: 12,
    jami_kunlar: 72,
    darslar: 28,
    jadval: [
      {
        hafta: 1,
        kunlar: [
          { kuni: 1, mavzu: "Kirish — B2 darajasiga kirish", tur: "dars" },
          { kuni: 2, mavzu: "Kaan va naqis fe'llar: kirish (13-dars)", darsId: 13, tur: "dars" },
          { kuni: 3, mavzu: "Kaan: o'tgan zamon ifodalash", darsId: 13, tur: "dars" },
          { kuni: 4, mavzu: "Naqis fe'llar: tur va shakllari", darsId: 13, tur: "dars" },
          { kuni: 5, mavzu: "Kaan va naqis fe'llar mashqi", darsId: 13, tur: "tahlil" },
          { kuni: 6, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 2,
        kunlar: [
          { kuni: 7, mavzu: "Naqis fe'llar: inkor va savol shakli", darsId: 13, tur: "dars" },
          { kuni: 8, mavzu: "Kaan va naqis fe'llar: gaplarda qo'llash", darsId: 13, tur: "tahlil" },
          { kuni: 9, mavzu: "Murakkab misollar tahlili", darsId: 13, tur: "tahlil" },
          { kuni: 10, mavzu: "13-dars yozma mashqi", tur: "tahlil" },
          { kuni: 11, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 12, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 3,
        kunlar: [
          { kuni: 13, mavzu: "Kaan va naqis fe'llar takrori", darsId: 13, tur: "tahlil" },
          { kuni: 14, mavzu: "13-dars: matn tahlili", darsId: 13, tur: "tahlil" },
          { kuni: 15, mavzu: "Og'zaki amaliyot: naqis fe'llar", darsId: 13, tur: "tahlil" },
          { kuni: 16, mavzu: "1-oy imtihon (13-dars)", tur: "imtihon" },
          { kuni: 17, mavzu: "Shart gaplari kirish (14-dars)", darsId: 14, tur: "dars" },
          { kuni: 18, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 4,
        kunlar: [
          { kuni: 19, mavzu: "Shart: إِنْ bilan real shart", darsId: 14, tur: "dars" },
          { kuni: 20, mavzu: "Shart: لَوْ bilan noreal shart", darsId: 14, tur: "dars" },
          { kuni: 21, mavzu: "Shart gaplari mashqi", darsId: 14, tur: "tahlil" },
          { kuni: 22, mavzu: "Shart gaplari: murakkab tuzilmalar", darsId: 14, tur: "dars" },
          { kuni: 23, mavzu: "Shart gaplari yozma mashqi", darsId: 14, tur: "tahlil" },
          { kuni: 24, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 5,
        kunlar: [
          { kuni: 25, mavzu: "Shart gaplari: dialog va amaliyot", darsId: 14, tur: "tahlil" },
          { kuni: 26, mavzu: "Shart gaplari takrori", darsId: 14, tur: "tahlil" },
          { kuni: 27, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 28, mavzu: "14-dars: matn tahlili", darsId: 14, tur: "tahlil" },
          { kuni: 29, mavzu: "Kaan + shart gaplari birga", tur: "tahlil" },
          { kuni: 30, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 6,
        kunlar: [
          { kuni: 31, mavzu: "2-oy imtihon (13 va 14-darslar)", tur: "imtihon" },
          { kuni: 32, mavzu: "Fe'l tizimlari (mazid): kirish (15-dars)", darsId: 15, tur: "dars" },
          { kuni: 33, mavzu: "Mazid: II tizim (فَعَّلَ shakli)", darsId: 15, tur: "dars" },
          { kuni: 34, mavzu: "Mazid: III tizim (فَاعَلَ shakli)", darsId: 15, tur: "dars" },
          { kuni: 35, mavzu: "II va III tizimlar mashqi", darsId: 15, tur: "tahlil" },
          { kuni: 36, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 7,
        kunlar: [
          { kuni: 37, mavzu: "Mazid: IV tizim (أَفْعَلَ shakli)", darsId: 15, tur: "dars" },
          { kuni: 38, mavzu: "Mazid: V tizim (تَفَعَّلَ shakli)", darsId: 15, tur: "dars" },
          { kuni: 39, mavzu: "IV va V tizimlar mashqi", darsId: 15, tur: "tahlil" },
          { kuni: 40, mavzu: "Mazid: VI tizim (تَفَاعَلَ shakli)", darsId: 15, tur: "dars" },
          { kuni: 41, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 42, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 8,
        kunlar: [
          { kuni: 43, mavzu: "Mazid: VII–X tizimlar kirish", darsId: 15, tur: "dars" },
          { kuni: 44, mavzu: "Mazid tizimlar: ma'no o'zgarishlari", darsId: 15, tur: "tahlil" },
          { kuni: 45, mavzu: "Mazid fe'llar mashqi — gaplar tuzish", darsId: 15, tur: "tahlil" },
          { kuni: 46, mavzu: "15-dars: matn tahlili", darsId: 15, tur: "tahlil" },
          { kuni: 47, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 48, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 9,
        kunlar: [
          { kuni: 49, mavzu: "B2 barcha mavzular takrori", tur: "tahlil" },
          { kuni: 50, mavzu: "Og'zaki amaliyot: B2 mavzulari", tur: "tahlil" },
          { kuni: 51, mavzu: "Yozma mashq: B2 grammatika", tur: "tahlil" },
          { kuni: 52, mavzu: "Lug'at: B2 asosiy so'zlar", tur: "dars" },
          { kuni: 53, mavzu: "Mock test — B1-B2 umumiy", tur: "imtihon" },
          { kuni: 54, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 10,
        kunlar: [
          { kuni: 55, mavzu: "B2 matn tahlili va tarjima", tur: "tahlil" },
          { kuni: 56, mavzu: "Murakkab gaplar tahlili", tur: "tahlil" },
          { kuni: 57, mavzu: "Yozma insho: 15+ ta gap", tur: "tahlil" },
          { kuni: 58, mavzu: "3-oy imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 59, mavzu: "Mock test — B2 yakuniy", tur: "imtihon" },
          { kuni: 60, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 11,
        kunlar: [
          { kuni: 61, mavzu: "Xatolar tahlili va mustahkamlash", tur: "tahlil" },
          { kuni: 62, mavzu: "Og'zaki imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 63, mavzu: "Yozma imtihon tayyorgarligi", tur: "tahlil" },
          { kuni: 64, mavzu: "B2 yakuniy yozma imtihon", tur: "imtihon" },
          { kuni: 65, mavzu: "Natijalar tahlili", tur: "tahlil" },
          { kuni: 66, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 12,
        kunlar: [
          { kuni: 67, mavzu: "B2 og'zaki imtihon", tur: "imtihon" },
          { kuni: 68, mavzu: "B2 barcha test takrori", tur: "tahlil" },
          { kuni: 69, mavzu: "B1-B2 yakuniy imtihon", tur: "imtihon" },
          { kuni: 70, mavzu: "Natijalar muhokamasi", tur: "tahlil" },
          { kuni: 71, mavzu: "B2 sertifikat va C1 rejasi", tur: "tahlil" },
          { kuni: 72, mavzu: "Dam olish", tur: "dam" },
        ],
      },
    ],
  },
  {
    kod: "B2-C1",
    nomi: "Yuqori daraja",
    rang: "#DC2626",
    davomiyligi: "4 oy",
    oylar: 4,
    haftalar: 16,
    jami_kunlar: 96,
    darslar: 36,
    jadval: [],
  },
  {
    kod: "C1-C2",
    nomi: "Professional daraja",
    rang: "#7C3AED",
    davomiyligi: "4 oy",
    oylar: 4,
    haftalar: 16,
    jami_kunlar: 96,
    darslar: 36,
    jadval: [],
  },
];
