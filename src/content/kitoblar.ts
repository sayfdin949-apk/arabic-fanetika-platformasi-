export interface Kitob {
  id: number;
  nomi: string;
  muallif: string;
  daraja: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  tur: "darslik" | "lugat" | "qoida" | "matn";
  /** Qaysi bo'limga tegishli */
  bolim: "fonetika" | "grammatika" | "umumiy";
  tavsif: string;
  sahifalar: number;
  icon: string;
  rang: string;
  boblar: KitobBob[];
}

export interface KitobBob {
  id: number;
  nomi: string;
  matn: KitobSatir[];
}

export interface KitobSatir {
  arabcha: string;
  oqilishi: string;
  tarjima: string;
}

export const KITOBLAR: Kitob[] = [
  // ─── UMUMIY ─────────────────────────────────────────────────────────────────
  {
    id: 1,
    nomi: "Arab tili — boshlang'ichlar uchun",
    muallif: "AFP Ta'lim",
    daraja: "A0",
    tur: "darslik",
    bolim: "umumiy",
    tavsif: "Alifbodan boshlab, harflar va ularning shakllari, harakat belgilari.",
    sahifalar: 48,
    icon: "📗",
    rang: "#0891B2",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Alifbo",
        matn: [
          { arabcha: "أ", oqilishi: "alif", tarjima: "Alif — birinchi harf" },
          { arabcha: "ب", oqilishi: "ba", tarjima: "Ba — ikkinchi harf" },
          { arabcha: "ت", oqilishi: "ta", tarjima: "Ta — uchinchi harf" },
          { arabcha: "ث", oqilishi: "sa", tarjima: "Sa — to'rtinchi harf" },
          { arabcha: "ج", oqilishi: "jim", tarjima: "Jim — beshinchi harf" },
        ],
      },
      {
        id: 2,
        nomi: "2-bob: Harakat belgilari",
        matn: [
          { arabcha: "بَ", oqilishi: "ba", tarjima: "Fatha — 'a' ovozi" },
          { arabcha: "بِ", oqilishi: "bi", tarjima: "Kasra — 'i' ovozi" },
          { arabcha: "بُ", oqilishi: "bu", tarjima: "Zamma — 'u' ovozi" },
          { arabcha: "بْ", oqilishi: "b (sukun)", tarjima: "Sukun — undosh, unli yo'q" },
          { arabcha: "بَبَ", oqilishi: "baba", tarjima: "Ikkita harf, fatha" },
        ],
      },
    ],
  },
  {
    id: 2,
    nomi: "Oddiy so'zlashuv iboralari",
    muallif: "AFP Ta'lim",
    daraja: "A1",
    tur: "darslik",
    bolim: "umumiy",
    tavsif: "Kundalik hayotda ishlatiladigan eng zarur iboralar va so'zlar.",
    sahifalar: 64,
    icon: "💬",
    rang: "#2563EB",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Salomlashish",
        matn: [
          { arabcha: "مَرْحَبًا", oqilishi: "marhaban", tarjima: "Salom (xush kelibsiz)" },
          { arabcha: "أَهْلاً", oqilishi: "ahlan", tarjima: "Xush kelibsiz" },
          { arabcha: "صَبَاحُ الْخَيْرِ", oqilishi: "sabaahul-xayr", tarjima: "Xayrli tong" },
          { arabcha: "مَسَاءُ الْخَيْرِ", oqilishi: "masaa'ul-xayr", tarjima: "Xayrli kech" },
          { arabcha: "كَيْفَ حَالُكَ؟", oqilishi: "kayfa haaluka?", tarjima: "Yaxshimisiz?" },
          { arabcha: "بِخَيْرٍ، شُكْرًا", oqilishi: "bixayr, shukran", tarjima: "Yaxshi, rahmat" },
        ],
      },
      {
        id: 2,
        nomi: "2-bob: Tanishish",
        matn: [
          { arabcha: "مَا اسْمُكَ؟", oqilishi: "ma ismuka?", tarjima: "Ismingiz nima?" },
          { arabcha: "اسْمِي أَحْمَد", oqilishi: "ismii Ahmad", tarjima: "Mening ismim Ahmad" },
          { arabcha: "مِنْ أَيْنَ أَنْتَ؟", oqilishi: "min ayna anta?", tarjima: "Qayerdansiz?" },
          { arabcha: "أَنَا مِنَ الأُزْبَك", oqilishi: "anaa minal-uzbek", tarjima: "Men O'zbekistondan" },
          { arabcha: "تَشَرَّفْنَا", oqilishi: "tasharrafnaa", tarjima: "Tanishganimizdan xursandman" },
        ],
      },
    ],
  },
  {
    id: 3,
    nomi: "Arab-o'zbek lug'ati (A1-A2)",
    muallif: "AFP Ta'lim",
    daraja: "A1",
    tur: "lugat",
    bolim: "umumiy",
    tavsif: "500 ta eng ko'p ishlatiladigan arabcha so'zlar va ularning tarjimalari.",
    sahifalar: 80,
    icon: "📖",
    rang: "#059669",
    boblar: [
      {
        id: 1,
        nomi: "A harfi",
        matn: [
          { arabcha: "أَب", oqilishi: "ab", tarjima: "ota" },
          { arabcha: "أُم", oqilishi: "umm", tarjima: "ona" },
          { arabcha: "أَخ", oqilishi: "ax", tarjima: "aka/uka" },
          { arabcha: "أُخْت", oqilishi: "uxt", tarjima: "singil/opa" },
          { arabcha: "اِبْن", oqilishi: "ibn", tarjima: "o'g'il" },
          { arabcha: "اِبْنَة", oqilishi: "ibna", tarjima: "qiz" },
        ],
      },
    ],
  },

  // ─── FONETIKA ────────────────────────────────────────────────────────────────
  {
    id: 10,
    nomi: "Manhaj al-Alamiy",
    muallif: "Al-Arabiyya bayna Yadayk guruhi",
    daraja: "A0",
    tur: "darslik",
    bolim: "fonetika",
    tavsif: "Xalqaro talabalar uchun arabcha alifbo va fonetika. Harflar, harakatlar va birinchi so'zlar bosqichma-bosqich o'rgatiladi.",
    sahifalar: 120,
    icon: "🌐",
    rang: "#0891B2",
    boblar: [
      {
        id: 1,
        nomi: "1-dars: Harflar — yuqori qator",
        matn: [
          { arabcha: "أ، إ، آ", oqilishi: "Alif (hamza bilan)", tarjima: "Alif — 3 xil ko'rinish" },
          { arabcha: "بَاء", oqilishi: "Baa'", tarjima: "Ba — ikki nuqtali" },
          { arabcha: "تَاء", oqilishi: "Taa'", tarjima: "Ta — uch nuqtali" },
          { arabcha: "ثَاء", oqilishi: "Saa'", tarjima: "Sa — uch nuqtali" },
        ],
      },
      {
        id: 2,
        nomi: "2-dars: Fatha, kasra, zamma",
        matn: [
          { arabcha: "بَ / بِ / بُ", oqilishi: "ba / bi / bu", tarjima: "Uch asosiy harakat" },
          { arabcha: "دَرَسَ", oqilishi: "darasa", tarjima: "U o'qidi" },
          { arabcha: "كَتَبَ", oqilishi: "kataba", tarjima: "U yozdi" },
          { arabcha: "فَتَحَ", oqilishi: "fataha", tarjima: "U ochdi" },
        ],
      },
    ],
  },
  {
    id: 11,
    nomi: "Attanal — Fonetika Kursi",
    muallif: "Attanal nashriyoti",
    daraja: "A1",
    tur: "darslik",
    bolim: "fonetika",
    tavsif: "Arab tilini zamonaviy metodika bilan o'rgatuvchi kurs. Fonetika, mahrajlar va sifatlar batafsil yoritiladi.",
    sahifalar: 200,
    icon: "🎙️",
    rang: "#DC2626",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Mahrajlar (chiqish joylari)",
        matn: [
          { arabcha: "مَخَارِج الْحُرُوف", oqilishi: "Maxarijul-huruf", tarjima: "Harflarning chiqish joylari" },
          { arabcha: "الجَوْف", oqilishi: "Al-Jawf", tarjima: "Bo'shliq (alif, vav, ya)" },
          { arabcha: "الحَلْق", oqilishi: "Al-Halq", tarjima: "Tomoq (hamza, ha, ayn, ghayn, xa, xa')" },
          { arabcha: "اللِّسَان", oqilishi: "Al-Lisaan", tarjima: "Til (ko'p harflar)" },
          { arabcha: "الشَّفَتَان", oqilishi: "Ash-Shafataan", tarjima: "Lablar (ba, mim, vav, fa)" },
        ],
      },
      {
        id: 2,
        nomi: "2-bob: Sifatlar",
        matn: [
          { arabcha: "الجَهْر", oqilishi: "Al-Jahr", tarjima: "Jahriy — ovoz qo'shiladi" },
          { arabcha: "الهَمْس", oqilishi: "Al-Hams", tarjima: "Mahmuziy — ovoz qo'shilmaydi" },
          { arabcha: "الشِّدَّة", oqilishi: "Ash-Shidda", tarjima: "Qattiq — harf to'siq" },
          { arabcha: "الرَّخَاوَة", oqilishi: "Ar-Rxaawa", tarjima: "Yumshoq — harf oqib o'tadi" },
          { arabcha: "الاسْتِعْلَاء", oqilishi: "Al-Isti'laa'", tarjima: "Til ko'tariladi (qalin)" },
        ],
      },
    ],
  },
  {
    id: 12,
    nomi: "Al-Kamil fit-Tajwid",
    muallif: "Kamil nashriyoti",
    daraja: "A2",
    tur: "qoida",
    bolim: "fonetika",
    tavsif: "Tajvid qoidalari bo'yicha to'liq qo'llanma. Idg'om, ikhfa, iqlab va izhor qoidalari.",
    sahifalar: 160,
    icon: "📜",
    rang: "#059669",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Nun Sakin va Tanvin",
        matn: [
          { arabcha: "الإِظْهَار", oqilishi: "Al-Izhhaar", tarjima: "Izhor — aniq o'qish" },
          { arabcha: "الإِدْغَام", oqilishi: "Al-Idg'aam", tarjima: "Idg'om — kiritish/qo'shish" },
          { arabcha: "الإِقْلَاب", oqilishi: "Al-Iqlaab", tarjima: "Iqlab — mim'ga aylantirish" },
          { arabcha: "الإِخْفَاء", oqilishi: "Al-Ikhfaa'", tarjima: "Ikhfa — yashirish (o'rta holat)" },
        ],
      },
    ],
  },
  {
    id: 13,
    nomi: "Mabda' 1 — Fonetika",
    muallif: "Mabda' nashriyoti",
    daraja: "A0",
    tur: "darslik",
    bolim: "fonetika",
    tavsif: "Yangi boshlovchilar uchun birinchi kitob. Harflar va tovushlarni to'g'ri talaffuz qilish asoslari.",
    sahifalar: 88,
    icon: "1️⃣",
    rang: "#6366F1",
    boblar: [
      {
        id: 1,
        nomi: "Dars 1: Harflarni tanish",
        matn: [
          { arabcha: "ا ب ت ث", oqilishi: "Alif, Ba, Ta, Sa", tarjima: "Birinchi to'rtta harf" },
          { arabcha: "ج ح خ د", oqilishi: "Jim, Ha, Xo, Dal", tarjima: "Keyingi to'rtta harf" },
        ],
      },
    ],
  },
  {
    id: 14,
    nomi: "Mabda' 2 — Fonetika",
    muallif: "Mabda' nashriyoti",
    daraja: "A1",
    tur: "darslik",
    bolim: "fonetika",
    tavsif: "Ikkinchi bosqich: harflar birikmalari, so'z tuzilishi va qisqa matnlar.",
    sahifalar: 96,
    icon: "2️⃣",
    rang: "#7C3AED",
    boblar: [
      {
        id: 1,
        nomi: "Dars 1: So'z tuzilishi",
        matn: [
          { arabcha: "ك-تَ-بَ = كَتَبَ", oqilishi: "ka-ta-ba", tarjima: "Yozdi — uch harfli o'zak" },
          { arabcha: "دَ-رَ-سَ = دَرَسَ", oqilishi: "da-ra-sa", tarjima: "O'qidi — uch harfli o'zak" },
        ],
      },
    ],
  },
  {
    id: 15,
    nomi: "Mabda' 3 — Fonetika",
    muallif: "Mabda' nashriyoti",
    daraja: "A2",
    tur: "darslik",
    bolim: "fonetika",
    tavsif: "Uchinchi bosqich: tajvid asoslari, uzun unlilar va tanvin.",
    sahifalar: 104,
    icon: "3️⃣",
    rang: "#EC4899",
    boblar: [
      {
        id: 1,
        nomi: "Dars 1: Madd — uzun unlilar",
        matn: [
          { arabcha: "بَاب", oqilishi: "baab", tarjima: "Eshik — alifli madd" },
          { arabcha: "نُور", oqilishi: "nuur", tarjima: "Nur — vavli madd" },
          { arabcha: "بِئْر", oqilishi: "bi'r", tarjima: "Quduq — yali madd" },
        ],
      },
    ],
  },

  // ─── GRAMMATIKA ──────────────────────────────────────────────────────────────
  {
    id: 20,
    nomi: "Janaahu at-Tolib",
    muallif: "Sh. Fozilov",
    daraja: "A2",
    tur: "darslik",
    bolim: "grammatika",
    tavsif: "O'zbekiston madrasalarida keng qo'llaniladigan grammatika darsligining yangi nashri. Ism, fe'l, harf qoidalari.",
    sahifalar: 240,
    icon: "📘",
    rang: "#1D4ED8",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Ism, fe'l, harf",
        matn: [
          { arabcha: "الاسم", oqilishi: "Al-Ism", tarjima: "Ot — ma'noga ega, fe'ldan mustaqil so'z" },
          { arabcha: "الفِعْل", oqilishi: "Al-Fi'l", tarjima: "Fe'l — vaqtga bog'liq harakat/holat" },
          { arabcha: "الحَرْف", oqilishi: "Al-Harf", tarjima: "Harf — yolg'iz ma'no bermaydi" },
        ],
      },
      {
        id: 2,
        nomi: "2-bob: Mubtado va Xabar",
        matn: [
          { arabcha: "المُبْتَدَأ", oqilishi: "Al-Mubtada'", tarjima: "Mubtado — jumlaning egasi (rafa')" },
          { arabcha: "الخَبَر", oqilishi: "Al-Xabar", tarjima: "Xabar — mubtado haqida xabar (rafa')" },
          { arabcha: "مُحَمَّدٌ طَالِبٌ", oqilishi: "Muhammadun taalibun", tarjima: "Muhammad — talaba" },
        ],
      },
    ],
  },
  {
    id: 21,
    nomi: "Mabda' an-Nahw",
    muallif: "Mabda' guruhi",
    daraja: "A1",
    tur: "darslik",
    bolim: "grammatika",
    tavsif: "Nahu (grammatika) bo'yicha boshlang'ich qo'llanma. Ismlardagi hollar va asosiy qoidalar.",
    sahifalar: 160,
    icon: "📙",
    rang: "#CA8A04",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Ism turlari",
        matn: [
          { arabcha: "النَّكِرَة", oqilishi: "An-Nakira", tarjima: "Noaniq ism — tanvin bilan: رَجُلٌ" },
          { arabcha: "المَعْرِفَة", oqilishi: "Al-Ma'rifa", tarjima: "Aniq ism — al bilan: الرَّجُل" },
          { arabcha: "المُذَكَّر", oqilishi: "Al-Muzakkar", tarjima: "Erkak jins: كِتَابٌ" },
          { arabcha: "المُؤَنَّث", oqilishi: "Al-Mu'annas", tarjima: "Ayol jins: مَدْرَسَةٌ" },
        ],
      },
    ],
  },
  {
    id: 22,
    nomi: "Mabda' as-Sarf",
    muallif: "Mabda' guruhi",
    daraja: "A2",
    tur: "qoida",
    bolim: "grammatika",
    tavsif: "Sarf (morfologiya) qoidalari. Fe'l vaznlari va ulardan yasalgan so'zlar.",
    sahifalar: 180,
    icon: "📓",
    rang: "#059669",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Uch harfli o'zak",
        matn: [
          { arabcha: "فَعَلَ", oqilishi: "Fa'ala", tarjima: "Asosiy vazon — u qildi" },
          { arabcha: "كَتَبَ — كَاتِب — مَكْتُوب", oqilishi: "Kataba — Kaatib — Maktuub", tarjima: "Yozdi — yozuvchi — yozilgan" },
          { arabcha: "دَرَسَ — دَارِس — مَدْرُوس", oqilishi: "Darasa — Daaris — Madruus", tarjima: "O'qidi — o'quvchi — o'qilgan" },
        ],
      },
    ],
  },
  {
    id: 23,
    nomi: "Durus al-Lugha al-Arabiyya",
    muallif: "Shayx Agha",
    daraja: "A2",
    tur: "darslik",
    bolim: "grammatika",
    tavsif: "Klassik nahu va lug'at kursi. Madinah universiteti dasturiga asoslangan.",
    sahifalar: 300,
    icon: "📚",
    rang: "#7C3AED",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Jumlai ismiyya",
        matn: [
          { arabcha: "هَذَا كِتَابٌ", oqilishi: "Haazaa kitaabun", tarjima: "Bu kitob (erkak ism)" },
          { arabcha: "هَذِهِ مَدْرَسَةٌ", oqilishi: "Haazihi madrasatun", tarjima: "Bu maktab (ayol ism)" },
          { arabcha: "ذَلِكَ بَيْتٌ", oqilishi: "Zaalikal baytun", tarjima: "U uy (uzoq, erkak)" },
        ],
      },
    ],
  },
  {
    id: 24,
    nomi: "Nahu at-Tatbiqiy",
    muallif: "Rajab Ibrahimov",
    daraja: "B1",
    tur: "qoida",
    bolim: "grammatika",
    tavsif: "Amaliy nahu — qoidalar mashqlar bilan mustahkamlanadi. Har bir mavzuda test va misollar.",
    sahifalar: 220,
    icon: "✏️",
    rang: "#DC2626",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Hollar (I'rab)",
        matn: [
          { arabcha: "الرَّفْع", oqilishi: "Ar-Rafa'", tarjima: "Rafa' holati — zamma (ُ) yoki vav" },
          { arabcha: "النَّصْب", oqilishi: "An-Nasb", tarjima: "Nasb holati — fatha (َ) yoki alif" },
          { arabcha: "الجَرّ", oqilishi: "Al-Jarr", tarjima: "Jarr holati — kasra (ِ) yoki ya" },
        ],
      },
    ],
  },
  {
    id: 25,
    nomi: "Al-Ajrumiyya",
    muallif: "Ibn Ajrum (sharh: Ibn Aqil)",
    daraja: "B1",
    tur: "qoida",
    bolim: "grammatika",
    tavsif: "Klassik nahu matni — al-Muqaddima al-Ajrumiyya. Yangi boshlovchilar uchun qisqa va qulay.",
    sahifalar: 96,
    icon: "🏛️",
    rang: "#0891B2",
    boblar: [
      {
        id: 1,
        nomi: "Muqaddima",
        matn: [
          { arabcha: "الكَلَامُ هُوَ اللَّفْظُ المُرَكَّبُ المُفِيد", oqilishi: "Al-Kalaamu huwal-lafzul-murakkabul-mufiid", tarjima: "Kalom — ma'no anglatuvchi murakkab lafz" },
          { arabcha: "أَقْسَامُهُ ثَلَاثَة", oqilishi: "Aqsaamuhu salaasa", tarjima: "Uning qismlari uch: ism, fe'l, harf" },
        ],
      },
    ],
  },
  {
    id: 26,
    nomi: "Tatbiqu an-Nahwiy",
    muallif: "Abdulhamid as-Sayyid",
    daraja: "B2",
    tur: "matn",
    bolim: "grammatika",
    tavsif: "Nahu qoidalarini matnlar orqali amalda qo'llash. B2 darajasida nahu tahlili.",
    sahifalar: 280,
    icon: "🔍",
    rang: "#CA8A04",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: I'rob tahlili",
        matn: [
          { arabcha: "جَاءَ الطَّالِبُ", oqilishi: "Jaa'at-taalib", tarjima: "Talaba keldi — fayl wa fi'l" },
          { arabcha: "قَرَأَ الوَلَدُ الكِتَابَ", oqilishi: "Qara'a l-waladu l-kitaab", tarjima: "Bola kitobni o'qidi" },
        ],
      },
    ],
  },
  {
    id: 27,
    nomi: "Ilm al-Balagha",
    muallif: "Miftohul-Ulum guruhi",
    daraja: "B2",
    tur: "qoida",
    bolim: "grammatika",
    tavsif: "Balaghat ilmi — ma'oniy, bayan va badi'. Arabcha nutq go'zalligi va san'atlari.",
    sahifalar: 260,
    icon: "🌸",
    rang: "#BE185D",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Ma'oniy — Jumlaning holatlari",
        matn: [
          { arabcha: "الإِيجَاز", oqilishi: "Al-Iijaz", tarjima: "Qisqalik — kam so'z ko'p ma'no" },
          { arabcha: "الإِطْنَاب", oqilishi: "Al-Itnaab", tarjima: "Kengaytirish — ma'noni izohlab kengaytirish" },
          { arabcha: "التَّشْبِيه", oqilishi: "At-Tashibah", tarjima: "O'xshatish — simile" },
          { arabcha: "الاسْتِعَارَة", oqilishi: "Al-Isti'aara", tarjima: "Majoz — metafora" },
        ],
      },
    ],
  },
  {
    id: 28,
    nomi: "Al-Mantiq al-Muyassar",
    muallif: "Muxtasar mantiq kursi",
    daraja: "B2",
    tur: "qoida",
    bolim: "grammatika",
    tavsif: "Arabcha mantiq ilmiga kirish. Tushuncha, hukm, dalil va sillogizm asoslari.",
    sahifalar: 200,
    icon: "🧠",
    rang: "#6366F1",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Tushuncha va ta'rif",
        matn: [
          { arabcha: "المَفْهُوم", oqilishi: "Al-Mafhuum", tarjima: "Tushuncha — aqliy obraz" },
          { arabcha: "الحَدّ", oqilishi: "Al-Hadd", tarjima: "Ta'rif — narsa mohiyatini ko'rsatish" },
          { arabcha: "الكُلِّي والجُزْئِي", oqilishi: "Al-Kulli wal-juz'iy", tarjima: "Umumiy va xususiy" },
        ],
      },
    ],
  },
  {
    id: 29,
    nomi: "Shi'r al-Mutanabbi",
    muallif: "Abu Tayyib al-Mutanabbi",
    daraja: "C1",
    tur: "matn",
    bolim: "grammatika",
    tavsif: "Arab adabiyotining eng buyuk shoiri Mutanabbiy she'rlari. Klassik lug'at va qofiyalar.",
    sahifalar: 320,
    icon: "🖊️",
    rang: "#1D4ED8",
    boblar: [
      {
        id: 1,
        nomi: "Mashhur baytlar",
        matn: [
          { arabcha: "عَلى قَدرِ أَهلِ العَزمِ تَأتي العَزائِمُ", oqilishi: "Alaa qadri ahlil-'azmi taa'til-'azaa'im", tarjima: "Qat'iyat sohiblariga yarasha kelur azmu irodalar" },
          { arabcha: "أَعزُّ مَكانٍ في الدُّنا سَرجُ سابِحٍ", oqilishi: "A'azzu makaanin fid-dunya sarcu saabihin", tarjima: "Dunyo sharafi — otning egarida" },
        ],
      },
    ],
  },
  {
    id: 30,
    nomi: "Shi'r Imri'il-Qays",
    muallif: "Imru'ul-Qays",
    daraja: "C2",
    tur: "matn",
    bolim: "grammatika",
    tavsif: "Yetti mu'allaqa she'rlaridan biri — Imru'ul-Qays qasidasining sharhi. Jahiliyya davri lug'ati.",
    sahifalar: 200,
    icon: "🌙",
    rang: "#7C3AED",
    boblar: [
      {
        id: 1,
        nomi: "Muallaqaning boshi",
        matn: [
          { arabcha: "قِفَا نَبكِ مِن ذِكرى حَبيبٍ وَمَنزِلِ", oqilishi: "Qifaa nabki min zikraa habiibun wa manzili", tarjima: "To'xtang, yig'laylik, sevgilim xotirasidan va manziligacha" },
        ],
      },
    ],
  },
  {
    id: 31,
    nomi: "Devoni Sheriyat",
    muallif: "Turli klassik shoirlar",
    daraja: "C1",
    tur: "matn",
    bolim: "grammatika",
    tavsif: "Klassik arab she'riyati majmuasi. Toq, Ka'b ibn Zuhayr va boshqa shoirlarning tanlangan asarlari.",
    sahifalar: 350,
    icon: "📜",
    rang: "#CA8A04",
    boblar: [
      {
        id: 1,
        nomi: "Ka'b ibn Zuhayr — Baanat Su'aad",
        matn: [
          { arabcha: "بَانَتْ سُعَادُ فَقَلْبِي اليَوْمَ مَتْبُول", oqilishi: "Baanat Su'aadu fa-qalbiyyal-yawma matbuul", tarjima: "Su'od ketdi, bugun qalbim mahzun" },
        ],
      },
    ],
  },
  {
    id: 32,
    nomi: "Shifohiyya fil-Luga al-Arabiyya",
    muallif: "Arabcha og'zaki nutq kursi",
    daraja: "B1",
    tur: "darslik",
    bolim: "grammatika",
    tavsif: "Og'zaki arabcha nutqni rivojlantirish uchun maxsus kurs. Muloqot, bahs va taqdimot ko'nikmalari.",
    sahifalar: 180,
    icon: "🗣️",
    rang: "#059669",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Muloqot asoslari",
        matn: [
          { arabcha: "كَيْفَ تُعَبِّرُ عَنْ رَأيِكَ؟", oqilishi: "Kayfa tu'abbiru 'an ra'yik?", tarjima: "Fikringizni qanday bildirasiz?" },
          { arabcha: "في رَأيِي أَنَّ...", oqilishi: "Fii ra'yii anna...", tarjima: "Mening fikrimcha..." },
          { arabcha: "أَتَّفِقُ مَعَكَ في...", oqilishi: "Attafiqu ma'aka fii...", tarjima: "Siz bilan kelishaman..." },
        ],
      },
    ],
  },
  // Grammatika section additional books
  {
    id: 4,
    nomi: "Grammatika qoidalari A2",
    muallif: "AFP Ta'lim",
    daraja: "A2",
    tur: "qoida",
    bolim: "grammatika",
    tavsif: "Fe'l vaznlari, zamon shakllari va gap tuzilishi haqida qisqa qoidalar.",
    sahifalar: 56,
    icon: "📋",
    rang: "#CA8A04",
    boblar: [
      {
        id: 1,
        nomi: "1-bob: Fe'lning o'tgan zamoni",
        matn: [
          { arabcha: "ذَهَبَ", oqilishi: "zahaba", tarjima: "u bordi (erkak)" },
          { arabcha: "ذَهَبَتْ", oqilishi: "zahabat", tarjima: "u bordi (ayol)" },
          { arabcha: "ذَهَبْتُ", oqilishi: "zahabtu", tarjima: "men bordim" },
          { arabcha: "ذَهَبْنَا", oqilishi: "zahabnaa", tarjima: "biz bordik" },
        ],
      },
    ],
  },
  {
    id: 5,
    nomi: "Qisqa hikoyalar B1",
    muallif: "AFP Ta'lim",
    daraja: "B1",
    tur: "matn",
    bolim: "umumiy",
    tavsif: "O'qish va tushunish ko'nikmasi uchun sodda arabcha hikoyalar.",
    sahifalar: 72,
    icon: "📚",
    rang: "#7C3AED",
    boblar: [
      {
        id: 1,
        nomi: "1-hikoya: Maktabga boradigan bola",
        matn: [
          { arabcha: "ذَهَبَ الوَلَدُ إِلَى المَدْرَسَةِ", oqilishi: "Zahaba l-waladu ilal-madrasa", tarjima: "Bola maktabga bordi" },
          { arabcha: "حَمَلَ حَقِيبَتَهُ", oqilishi: "Hamala haqiibatahu", tarjima: "U sumkasini ko'tardi" },
          { arabcha: "قَرَأَ الدَّرْسَ", oqilishi: "Qara'a d-darsa", tarjima: "Darsni o'qidi" },
        ],
      },
    ],
  },
];
