/* Arabcha matnni ovozli o'qish (browser SpeechSynthesis) */
export function speakAr(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.7;
  u.pitch = 1;
  const av = window.speechSynthesis.getVoices().find((v) => v.lang && v.lang.startsWith("ar"));
  if (av) u.voice = av;
  window.speechSynthesis.speak(u);
}

if (typeof window !== "undefined" && window.speechSynthesis)
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
