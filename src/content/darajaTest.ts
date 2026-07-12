export type DarajaLevel = "A0" | "A1" | "A2" | "B1" | "B2";

export interface DarajaSavol {
  id: number;
  daraja: DarajaLevel;
  savol: string;
  variantlar: string[];
  togri: number;
}

export const DARAJA_ARABIC: Record<DarajaLevel, { uz: string; ar: string }> = {
  A0: { uz: "Boshlang'ich",  ar: "مبتدئ تمامًا" },
  A1: { uz: "Elementar",     ar: "مبتدئ" },
  A2: { uz: "O'rta pastki",  ar: "أساسي" },
  B1: { uz: "O'rta",         ar: "متوسط" },
  B2: { uz: "O'rta yuqori",  ar: "فوق المتوسط" },
};

export const DARAJA_TEST_SAVOLLAR: DarajaSavol[] = [
  {
    id: 1, daraja: "A0",
    savol: "أيٌّ من الحروف التالية يُقرأ «ثا»؟",
    variantlar: ["ت", "ث", "س", "ص"],
    togri: 1,
  },
  {
    id: 2, daraja: "A0",
    savol: "ما اسم الحركة الموجودة في «كَ»؟",
    variantlar: ["الكسرة", "الضمة", "السكون", "الفتحة"],
    togri: 3,
  },
  {
    id: 3, daraja: "A1",
    savol: "التنوين بالفتح يُكتب هكذا:",
    variantlar: ["اً", "اٍ", "اٌ", "ا"],
    togri: 0,
  },
  {
    id: 4, daraja: "A1",
    savol: "في كلمة «نُور» ما نوع الصوت في «و»؟",
    variantlar: ["مدّ بالواو", "سكون", "تنوين", "فتحة قصيرة"],
    togri: 0,
  },
  {
    id: 5, daraja: "A2",
    savol: "في «الشمس» كيف تُنطق لام التعريف؟",
    variantlar: ["تُدغم في الشين", "تُنطق واضحة", "تُحذف", "تُقلب ميمًا"],
    togri: 0,
  },
  {
    id: 6, daraja: "A2",
    savol: "كلمة «مَدَّ» تحتوي على كم حرف «د»؟",
    variantlar: ["حرف واحد", "حرفان (الشدة)", "ثلاثة أحرف", "لا يوجد"],
    togri: 1,
  },
  {
    id: 7, daraja: "B1",
    savol: "صفة «الجهر» تعني أن الحرف:",
    variantlar: [
      "يخرج مع اهتزاز الأوتار الصوتية",
      "يخرج بدون صوت",
      "يخرج من الشفتين فقط",
      "يخرج من الخيشوم",
    ],
    togri: 0,
  },
  {
    id: 8, daraja: "B2",
    savol: "حرفا «ع» و«غ» ينتميان إلى مخرج:",
    variantlar: ["وسط الحلق", "أقصى الحلق", "اللسان", "الشفتين"],
    togri: 0,
  },
];

export function hisoblaDaraja(togrilar: boolean[]): DarajaLevel {
  const ball = togrilar.filter(Boolean).length;
  if (ball <= 1) return "A0";
  if (ball <= 3) return "A1";
  if (ball <= 5) return "A2";
  if (ball === 6) return "B1";
  return "B2";
}

export function saveDaraja(uid: string, daraja: DarajaLevel) {
  localStorage.setItem(`afp:daraja_${uid}`, daraja);
}

export function loadDaraja(uid: string): DarajaLevel | null {
  return (localStorage.getItem(`afp:daraja_${uid}`) as DarajaLevel) || null;
}
