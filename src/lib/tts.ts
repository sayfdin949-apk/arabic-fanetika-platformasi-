/* Arabcha matnni ovozli o'qish (browser SpeechSynthesis) */
export function speakAr(text: string): boolean {
  if (!window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.7;
  u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const av = voices.find((v) => v.lang && v.lang.startsWith("ar"));
  if (av) {
    u.voice = av;
  } else if (voices.length === 0) {
    // Ovozlar hali yuklanmagan — keyinroq qayta urinish
    window.speechSynthesis.onvoiceschanged = () => {
      const ar = window.speechSynthesis.getVoices().find((v) => v.lang?.startsWith("ar"));
      const u2 = new SpeechSynthesisUtterance(text);
      u2.lang = "ar-SA";
      u2.rate = 0.7;
      if (ar) u2.voice = ar;
      window.speechSynthesis.speak(u2);
      window.speechSynthesis.onvoiceschanged = null;
    };
    return false;
  }
  // av yo'q bo'lsa default ovoz bilan o'qiydi (noto'g'ri talaffuz bo'lishi mumkin)
  window.speechSynthesis.speak(u);
  return !!av;
}

export function hasArabicVoice(): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  return window.speechSynthesis.getVoices().some((v) => v.lang?.startsWith("ar"));
}

if (typeof window !== "undefined" && window.speechSynthesis)
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
