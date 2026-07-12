export interface Kitob {
  id: number;
  nomi: string;
  muallif: string;
  daraja: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  tur: "darslik" | "lugat" | "qoida" | "matn";
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
  {
    id: 1,
    nomi: "Arab tili — boshlang'ichlar uchun",
    muallif: "AFP Ta'lim",
    daraja: "A0",
    tur: "darslik",
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
      {
        id: 3,
        nomi: "3-bob: Raqamlar",
        matn: [
          { arabcha: "وَاحِد", oqilishi: "waahid", tarjima: "1 — bir" },
          { arabcha: "اثْنَان", oqilishi: "isnaani", tarjima: "2 — ikki" },
          { arabcha: "ثَلَاثَة", oqilishi: "salaasa", tarjima: "3 — uch" },
          { arabcha: "أَرْبَعَة", oqilishi: "arba'a", tarjima: "4 — to'rt" },
          { arabcha: "خَمْسَة", oqilishi: "xamsa", tarjima: "5 — besh" },
          { arabcha: "عَشَرَة", oqilishi: "'ashara", tarjima: "10 — o'n" },
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
      {
        id: 2,
        nomi: "B harfi",
        matn: [
          { arabcha: "بَيْت", oqilishi: "bayt", tarjima: "uy" },
          { arabcha: "بَاب", oqilishi: "baab", tarjima: "eshik" },
          { arabcha: "بَحْر", oqilishi: "bahr", tarjima: "dengiz" },
          { arabcha: "بَلَد", oqilishi: "balad", tarjima: "shahar/yurt" },
          { arabcha: "بَقَرَة", oqilishi: "baqara", tarjima: "sigir" },
        ],
      },
    ],
  },
  {
    id: 4,
    nomi: "Grammatika qoidalari A2",
    muallif: "AFP Ta'lim",
    daraja: "A2",
    tur: "qoida",
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
          { arabcha: "ذَهَبْتُمْ", oqilishi: "zahabtum", tarjima: "sizlar bordingiz" },
        ],
      },
      {
        id: 2,
        nomi: "2-bob: Fe'lning hozirgi zamoni",
        matn: [
          { arabcha: "يَذْهَبُ", oqilishi: "yaz-habu", tarjima: "u boradi (erkak)" },
          { arabcha: "تَذْهَبُ", oqilishi: "taz-habu", tarjima: "u boradi (ayol)" },
          { arabcha: "أَذْهَبُ", oqilishi: "az-habu", tarjima: "men boraman" },
          { arabcha: "نَذْهَبُ", oqilishi: "naz-habu", tarjima: "biz boramiz" },
          { arabcha: "تَذْهَبُونَ", oqilishi: "taz-habuuna", tarjima: "sizlar borасиз" },
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
          { arabcha: "كَتَبَ فِي الكُرَّاسَةِ", oqilishi: "Kataba fil-kurraasa", tarjima: "Daftarga yozdi" },
          { arabcha: "رَجَعَ إِلَى البَيْتِ", oqilishi: "Raja'a ilal-bayt", tarjima: "Uyga qaytdi" },
        ],
      },
      {
        id: 2,
        nomi: "2-hikoya: Bozorda",
        matn: [
          { arabcha: "ذَهَبَتِ الأُمُّ إِلَى السُّوقِ", oqilishi: "Zahabatil-ummu ilas-suuq", tarjima: "Ona bozorga bordi" },
          { arabcha: "اشْتَرَتِ الخُضَارَ والفَوَاكِهَ", oqilishi: "Ishtarat al-xudaara wal-fawaakiha", tarjima: "Sabzavot va meva sotib oldi" },
          { arabcha: "دَفَعَتِ الثَّمَنَ", oqilishi: "Dafa'at as-samana", tarjima: "Pulni to'ladi" },
          { arabcha: "عَادَتْ إِلَى المَنْزِلِ", oqilishi: "'Aadat ilal-manzil", tarjima: "Uyga qaytdi" },
        ],
      },
    ],
  },
];
