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
    jadval: [],
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
    jadval: [],
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
    jadval: [],
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
