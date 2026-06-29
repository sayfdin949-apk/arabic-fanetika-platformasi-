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
  twa.expand();
}

export function getTelegramSafeInsets(): { top: number; bottom: number } {
  const twa = window.Telegram?.WebApp as any;
  if (!twa) return { top: 0, bottom: 0 };
  const sa = twa.safeAreaInset;
  if (!sa) return { top: 0, bottom: 0 };
  return {
    top: typeof sa.top === "number" ? sa.top : 0,
    bottom: typeof sa.bottom === "number" ? sa.bottom : 0,
  };
}
