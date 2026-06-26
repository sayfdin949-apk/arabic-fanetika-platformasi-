/* AI yordamchi — joy qoldirildi (hozircha o'chirilgan).
 *
 * Asl prototipda brauzerdan to'g'ridan-to'g'ri api.anthropic.com ga murojaat bor edi —
 * bu XAVFLI (API kalit oshkor bo'ladi) va ishlamaydi. Shuning uchun olib tashlandi.
 *
 * Bosqich B (server): bu interfeys backend-proxy orqali amalga oshiriladi —
 * frontend faqat o'z serveriga so'rov yuboradi, kalit serverda qoladi.
 */

export interface AiAssistant {
  ask(message: string, history?: { role: "user" | "assistant"; content: string }[]): Promise<string>;
}

/** Hozircha faol emas. Bosqich B'da BackendAiAssistant bilan almashtiriladi. */
export const ai: AiAssistant | null = null;
