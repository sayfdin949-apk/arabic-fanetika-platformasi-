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
