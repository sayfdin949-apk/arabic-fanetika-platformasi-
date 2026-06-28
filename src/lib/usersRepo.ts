import { store } from "./storage";
import { SEED_USERS } from "../auth/users";
import type { User } from "../auth/types";

/* Foydalanuvchilar ombori (lokal bosqich).
 * Birinchi ishga tushishda SEED_USERS bilan boshlanadi, keyin localStorage'da saqlanadi.
 * O'qituvchi o'quvchi qo'shsa/o'chirsa shu yerga yoziladi.
 * Bosqich B: bu Supabase 'users' jadvaliga ko'chiriladi.
 */
const KEY = "users";

const OLD_DEMO_IDS = new Set(["s1", "s2", "s3", "s4", "s5"]);

export async function getUsers(): Promise<User[]> {
  const stored = await store.get<User[]>(KEY);
  if (!stored || !stored.length) {
    await store.set(KEY, SEED_USERS);
    return SEED_USERS;
  }

  const storedMap = new Map(stored.map((u) => [u.id, u]));
  const seedIds = new Set(SEED_USERS.map((u) => u.id));
  const needsMerge =
    SEED_USERS.some((s) => !storedMap.has(s.id)) ||
    stored.some((u) => OLD_DEMO_IDS.has(u.id));

  if (!needsMerge) return stored;

  // SEED o'quvchilarni saqlangan versiya bilan birlashtir (parol o'zgarishlarini saqlab),
  // eski demo hisoblari (s1-s5) ni chiqarib tashla, UI orqali qo'shilganlarni saqlaysiz
  const merged = [
    ...SEED_USERS.map((s) => storedMap.get(s.id) ?? s),
    ...stored.filter((u) => !seedIds.has(u.id) && !OLD_DEMO_IDS.has(u.id)),
  ];
  await store.set(KEY, merged);
  return merged;
}

export async function saveUsers(users: User[]): Promise<void> {
  await store.set(KEY, users);
}
