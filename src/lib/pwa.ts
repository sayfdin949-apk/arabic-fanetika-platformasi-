const BASE = import.meta.env.BASE_URL; // "/arabic-fanetika-platformasi-/"

export async function registerSW(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register(BASE + "sw.js", { scope: BASE });
  } catch { /**/ }
}

export function getNotifPermission(): NotificationPermission {
  if (!("Notification" in window)) return "denied";
  return Notification.permission;
}

export async function requestNotifPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) return "denied";
  if (Notification.permission !== "default") return Notification.permission;
  return Notification.requestPermission();
}

export function showLocalNotif(title: string, body: string, tag = "afp"): void {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready
      .then((reg) => reg.showNotification(title, { body, icon: BASE + "icon.svg", tag }))
      .catch(() => {});
  } else {
    new Notification(title, { body, icon: BASE + "icon.svg", tag });
  }
}

const REMINDER_KEY = "afp:last_streak_reminder";
const ACTIVITY_KEY = "afp:last_activity";

/** Called from ProgressContext on every touchStreak() to record today's activity. */
export function markActivityToday(): void {
  try { localStorage.setItem(ACTIVITY_KEY, new Date().toDateString()); } catch { /**/ }
}

/** Show streak reminder if user hasn't studied today and it's evening (17–22h). */
export function checkStreakReminder(streakDays: number): void {
  if (getNotifPermission() !== "granted") return;
  try {
    const today = new Date().toDateString();
    if (localStorage.getItem(REMINDER_KEY) === today) return;
    if (localStorage.getItem(ACTIVITY_KEY) === today) return;
    const h = new Date().getHours();
    if (h < 17 || h > 22) return;
    localStorage.setItem(REMINDER_KEY, today);
    showLocalNotif(
      "Bugun dars bajarmadingiz!",
      streakDays > 0
        ? `${streakDays} kunlik strek uzilmasin — hoziroq o'qing!`
        : "Bugun arabcha mashq qiling va strekingizni boshlang!",
      "streak"
    );
  } catch { /**/ }
}
