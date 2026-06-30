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

  // SEED foydalanuvchilarining login/parol/role har doim yangi SEED dan olinadi
  // (masalan, t1 oldin "teacher" bo'lgan, hozir "ceo" — eski saqlangan rol
  // bilan parol to'g'ri kiritilsa ham kirish rad etilmasligi uchun)
  // (profil ma'lumotlari — ism, tel, avatar — saqlangan versiyadan olinadi)
  const merged = [
    ...SEED_USERS.map((s) => {
      const sv = storedMap.get(s.id);
      if (!sv) return s;
      return { ...sv, login: s.login, parol: s.parol, role: s.role };
    }),
    ...stored.filter((u) => !seedIds.has(u.id) && !OLD_DEMO_IDS.has(u.id)),
  ];

  await store.set(KEY, merged);
  return merged;
}

export async function saveUsers(users: User[]): Promise<void> {
  await store.set(KEY, users);
}
