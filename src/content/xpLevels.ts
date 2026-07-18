/* XP daraja tizimi — spec 09-bo'lim. Sof hisoblash, bazaga saqlanmaydi. */

export interface XpLevel {
  level: number;
  nomi: string;
  icon: string;
  min: number;
  max: number | null; // null = eng yuqori daraja (chegarasiz)
}

export const LEVELS: XpLevel[] = [
  { level: 1, nomi: "Yangi o'quvchi", icon: "🌱", min: 0, max: 100 },
  { level: 2, nomi: "Izlovchi", icon: "📖", min: 100, max: 300 },
  { level: 3, nomi: "O'rta daraja", icon: "⭐", min: 300, max: 700 },
  { level: 4, nomi: "Ilg'or", icon: "🔥", min: 700, max: 1500 },
  { level: 5, nomi: "Ustoz", icon: "💎", min: 1500, max: 3000 },
  { level: 6, nomi: "Champion", icon: "👑", min: 3000, max: null },
];

export function getLevel(xp: number): XpLevel {
  const found = LEVELS.find((l) => xp >= l.min && (l.max === null || xp < l.max));
  return found ?? LEVELS[0];
}

/** Joriy daraja ichidagi progress (0-1), keyingi daraja tugmasi uchun. Eng yuqori darajada 1 qaytaradi. */
export function getLevelProgress(xp: number): number {
  const lvl = getLevel(xp);
  if (lvl.max === null) return 1;
  return Math.min(1, Math.max(0, (xp - lvl.min) / (lvl.max - lvl.min)));
}
