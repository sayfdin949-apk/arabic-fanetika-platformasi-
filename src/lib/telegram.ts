declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  ready(): void;
  expand(): void;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
  };
}

export function isTelegramMiniApp(): boolean {
  return !!(window.Telegram?.WebApp?.initDataUnsafe?.user);
}

export function getTelegramUser() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user ?? null;
}

export function initTelegramApp() {
  const twa = window.Telegram?.WebApp;
  if (!twa) return;
  twa.ready();
  // expand() olib tashlandi: u ilovani Telegram header ostiga render qiladi,
  // natijada logout va lightbox X tugmalari header ortida berkilib qoladi.
}

export function getTelegramSafeInsets(): { top: number; bottom: number } {
  const twa = window.Telegram?.WebApp as any;
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
