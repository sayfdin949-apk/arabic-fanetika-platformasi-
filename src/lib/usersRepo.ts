import { store } from "./storage";
import { SEED_USERS } from "../auth/users";
import type { User } from "../auth/types";

/* Foydalanuvchilar ombori (lokal bosqich).
 * Birinchi ishga tushishda SEED_USERS bilan boshlanadi, keyin localStorage'da saqlanadi.
 * O'qituvchi o'quvchi qo'shsa/o'chirsa shu yerga yoziladi.
 * Bosqich B: bu Supabase 'users' jadvaliga ko'chiriladi.
 */
const KEY = "users";

export async function getUsers(): Promise<User[]> {
  const stored = await store.get<User[]>(KEY);
  if (stored && stored.length) return stored;
  await store.set(KEY, SEED_USERS);
  return SEED_USERS;
}

export async function saveUsers(users: User[]): Promise<void> {
  await store.set(KEY, users);
}
