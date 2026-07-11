declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

interface TelegramSafeAreaInset {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface TelegramWebApp {
  ready(): void;
  expand(): void;
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
  };
  safeAreaInset?: TelegramSafeAreaInset;
  contentSafeAreaInset?: TelegramSafeAreaInset;
  onEvent?(eventType: string, callback: () => void): void;
  offEvent?(eventType: string, callback: () => void): void;
}

export function isTelegramMiniApp(): boolean {
  return !!(window.Telegram?.WebApp?.initDataUnsafe?.user);
}

/* DIQQAT: bu obyekt tasdiqlanmagan (har kim devtools orqali o'zgartirishi
 * mumkin) — faqat ID'ni EKRANDA KO'RSATISH kabi xavfsizlik bilan bog'liq
 * bo'lmagan holatlar uchun ishlatiladi. Haqiqiy autentifikatsiya uchun
 * getTelegramInitData() dan qaytgan imzolangan satrni ishlating — u
 * serverda HMAC orqali tasdiqlanadi (qarang: supabase-migration-v4-telegram-hmac.sql).
 */
export function getTelegramUser() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user ?? null;
}

/* Telegram tomonidan imzolangan, xom (URL-encoded) initData satri.
 * Bot tokeni bilan HMAC-SHA256 orqali tasdiqlanguncha bu yerdagi
 * hech qaysi maydonga (jumladan user.id'ga) ishonib bo'lmaydi. */
export function getTelegramInitData(): string | null {
  const raw = window.Telegram?.WebApp?.initData;
  return raw && raw.length > 0 ? raw : null;
}

export function initTelegramApp() {
  const twa = window.Telegram?.WebApp;
  if (!twa) return;
  twa.ready();
  // expand() olib tashlandi: u ilovani Telegram header ostiga render qiladi,
  // natijada logout va lightbox X tugmalari header ortida berkilib qoladi.
}

export function getTelegramSafeInsets(): { top: number; bottom: number } {
  const twa = window.Telegram?.WebApp;
  if (!twa) return { top: 0, bottom: 0 };

  // safeAreaInset  → device edges (iOS status bar, home indicator)
  // contentSafeAreaInset → Telegram UI (the × Kapat header bar)
  // Both are additive; sum them for total top/bottom padding needed.
  const sa  = twa.safeAreaInset        ?? {};
  const csa = twa.contentSafeAreaInset ?? {};

  const saTop     = typeof sa.top     === "number" ? sa.top     : 0;
  const csaTop    = typeof csa.top    === "number" ? csa.top    : 0;
  const saBottom  = typeof sa.bottom  === "number" ? sa.bottom  : 0;
  const csaBottom = typeof csa.bottom === "number" ? csa.bottom : 0;

  return {
    top:    csaTop + saTop,
    bottom: Math.max(csaBottom, saBottom),
  };
}
