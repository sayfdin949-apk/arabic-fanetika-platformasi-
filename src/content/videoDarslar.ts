export interface VideoDars {
  id: number;
  sarlavha: string;
  daraja: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  mavzu: string;
  davomiylik: string; // "12:30" formatida
  tavsif: string;
  thumbnail: string; // emoji yoki harf
  rang: string;
  videoUrl?: string; // haqiqiy URL bo'lganda qo'shiladi
  korinishlar?: number;
  yuklab?: boolean; // offline uchun saqlangan
}

export interface VideoToifa {
  id: string;
  nomi: string;
  icon: string;
  rang: string;
}

export const VIDEO_TOIFALAR: VideoToifa[] = [
  { id: "barchasi", nomi: "Barchasi", icon: "🎬", rang: "#0D3A1A" },
  { id: "A0", nomi: "A0", icon: "🌱", rang: "#0891B2" },
  { id: "A1", nomi: "A1", icon: "📘", rang: "#2563EB" },
  { id: "A2", nomi: "A2", icon: "📗", rang: "#059669" },
  { id: "B1", nomi: "B1", icon: "📙", rang: "#CA8A04" },
  { id: "B2", nomi: "B2", icon: "📕", rang: "#DC2626" },
  { id: "C1", nomi: "C1", icon: "🏆", rang: "#7C3AED" },
  { id: "C2", nomi: "C2", icon: "👑", rang: "#BE185D" },
];

export const VIDEO_DARSLAR: VideoDars[] = [
  // A0 — boshlang'ich
  {
    id: 1,
    sarlavha: "Arab alifbosi — 1-qism",
    daraja: "A0",
    mavzu: "Alifbo",
    davomiylik: "08:45",
    tavsif: "Alif, Ba, Ta, Sa harflari: yozilishi va talaffuzi.",
    thumbnail: "أ",
    rang: "#0891B2",
    korinishlar: 1240,
    videoUrl: "https://www.youtube.com/watch?v=9XJBWVrXBMU",
  },
  {
    id: 2,
    sarlavha: "Arab alifbosi — 2-qism",
    daraja: "A0",
    mavzu: "Alifbo",
    davomiylik: "09:20",
    tavsif: "Jim, Ha, Xo, Dol, Zol harflari.",
    thumbnail: "ج",
    rang: "#0891B2",
    korinishlar: 980,
    videoUrl: "https://www.youtube.com/watch?v=Ql8vBPi8UOQ",
  },
  {
    id: 3,
    sarlavha: "Arab alifbosi — 3-qism",
    daraja: "A0",
    mavzu: "Alifbo",
    davomiylik: "10:15",
    tavsif: "Ro, Zayn, Sin, Shin harflari.",
    thumbnail: "ر",
    rang: "#0891B2",
    korinishlar: 870,
    videoUrl: "https://www.youtube.com/watch?v=WKVNJ0LHwXA",
  },
  {
    id: 4,
    sarlavha: "Harakat belgilari",
    daraja: "A0",
    mavzu: "Talaffuz",
    davomiylik: "11:00",
    tavsif: "Fatha, kasra, zamma, sukun va tanvin.",
    thumbnail: "◌َ",
    rang: "#0891B2",
    korinishlar: 1120,
    videoUrl: "https://www.youtube.com/watch?v=0v1EiApBiEM",
  },
  // A1 — ism va olmoshlar
  {
    id: 5,
    sarlavha: "Ismlar — muzakkar va muannash",
    daraja: "A1",
    mavzu: "Grammatika",
    davomiylik: "13:30",
    tavsif: "Erkak va ayol jinsdagi ismlar farqi, Ta-marbuta.",
    thumbnail: "🏷",
    rang: "#2563EB",
    korinishlar: 760,
  },
  {
    id: 6,
    sarlavha: "Shaxs olmoshlari",
    daraja: "A1",
    mavzu: "Grammatika",
    davomiylik: "12:45",
    tavsif: "Men, sen, u, biz, siz, ular — arabcha shakllari.",
    thumbnail: "👤",
    rang: "#2563EB",
    korinishlar: 690,
  },
  {
    id: 7,
    sarlavha: "Ishorali olmoshlar",
    daraja: "A1",
    mavzu: "Grammatika",
    davomiylik: "11:15",
    tavsif: "Bu, u (yaqin va uzoq) ko'rsatish olmoshlari.",
    thumbnail: "👉",
    rang: "#2563EB",
    korinishlar: 580,
  },
  {
    id: 8,
    sarlavha: "Kundalik so'zlar — uy jihozlari",
    daraja: "A1",
    mavzu: "Lug'at",
    davomiylik: "10:00",
    tavsif: "Stol, kursi, kitob, qalam va boshqa uy buyumlari.",
    thumbnail: "🪑",
    rang: "#2563EB",
    korinishlar: 510,
  },
  // A2 — fe'llar va gaplar
  {
    id: 9,
    sarlavha: "Hozirgi zamon fe'llari",
    daraja: "A2",
    mavzu: "Grammatika",
    davomiylik: "15:20",
    tavsif: "Fe'lning hozirgi-kelasi zamon shakllari: men boraman, sen borasan…",
    thumbnail: "⚡",
    rang: "#059669",
    korinishlar: 430,
  },
  {
    id: 10,
    sarlavha: "O'tgan zamon fe'llari",
    daraja: "A2",
    mavzu: "Grammatika",
    davomiylik: "14:40",
    tavsif: "Fa'ala vazni asosida o'tgan zamon.",
    thumbnail: "🕐",
    rang: "#059669",
    korinishlar: 390,
  },
  {
    id: 11,
    sarlavha: "Savol gaplari",
    daraja: "A2",
    mavzu: "Nutq",
    davomiylik: "12:10",
    tavsif: "Nima? Kim? Qayer? Qachon? bilan savol tuzish.",
    thumbnail: "❓",
    rang: "#059669",
    korinishlar: 360,
  },
  // B1 — murakkab qurilmalar
  {
    id: 12,
    sarlavha: "Mudof va mudof ilayh",
    daraja: "B1",
    mavzu: "Grammatika",
    davomiylik: "16:00",
    tavsif: "Izofiy qurilma: kitabul-muallim — o'qituvchining kitobi.",
    thumbnail: "🔗",
    rang: "#CA8A04",
    korinishlar: 280,
  },
  {
    id: 13,
    sarlavha: "Sifat va sifatlanmish",
    daraja: "B1",
    mavzu: "Grammatika",
    davomiylik: "15:30",
    tavsif: "Kelishuvchi sifatlar, jins va son mosligï.",
    thumbnail: "🎨",
    rang: "#CA8A04",
    korinishlar: 240,
  },
  // B2 — yuklamalar va morfologiya
  {
    id: 14,
    sarlavha: "Shartli gaplar",
    daraja: "B2",
    mavzu: "Grammatika",
    davomiylik: "18:00",
    tavsif: "Agar (in, law, iza) shartli yuklama konstruktsiyalari.",
    thumbnail: "🔀",
    rang: "#DC2626",
    korinishlar: 180,
  },
  {
    id: 15,
    sarlavha: "Fe'l vaznlari — I dan X gacha",
    daraja: "B2",
    mavzu: "Morfologiya",
    davomiylik: "22:15",
    tavsif: "Arab fe'lining asosiy o'n vazni, ma'no farqlari.",
    thumbnail: "🔢",
    rang: "#DC2626",
    korinishlar: 160,
  },
  // C1 — ilg'or
  {
    id: 16,
    sarlavha: "Bog'langan gaplar va nisbiy olmoshlar",
    daraja: "C1",
    mavzu: "Sintaksis",
    davomiylik: "20:40",
    tavsif: "Allazi/allati/allazina nisbiy olmoshlari.",
    thumbnail: "🧩",
    rang: "#7C3AED",
    korinishlar: 120,
  },
  // C2 — yuqori daraja
  {
    id: 17,
    sarlavha: "Balag'at — majoz va tashbih",
    daraja: "C2",
    mavzu: "Uslub",
    davomiylik: "25:00",
    tavsif: "Arab adabiy tilida metafora, taqqoslash va boshqa uslubiy vositalar.",
    thumbnail: "✨",
    rang: "#BE185D",
    korinishlar: 90,
  },
];
