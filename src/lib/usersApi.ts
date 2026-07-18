import type { User } from "../auth/types";
import { LocalUsersApi } from "./usersApi.local";

/*
 * Lokal (localStorage) rejim uchun foydalanuvchilar bilan ishlash qatlami.
 *
 * Supabase rejimida bu qatlam ENDI ISHLATILMAYDI — login/parol haqiqiy
 * Supabase Auth (`auth.users`, `supabase.auth.signInWithPassword`) orqali
 * amalga oshiriladi, `AuthContext.tsx` da to'g'ridan-to'g'ri (qarang: profiles
 * jadvali, supabase-migration-v12-auth-schema-foundation.sql). Bu fayl faqat
 * Supabase sozlanmagan (`VITE_SUPABASE_URL`/`ANON_KEY` yo'q) lokal-dev
 * muhitida ishlatiladi — haqiqiy backend yo'q, shuning uchun xavfsizlik
 * chegarasi yo'q.
 */

export interface MutationResult {
  ok: boolean;
  error?: string;
  user?: User;
}

export interface LoginResult {
  user: User;
  /** Lokal rejimda shunchaki foydalanuvchi id'si — hech qachon tasdiqlanmaydi. */
  token: string;
}

export interface UsersApi {
  getUsers(): Promise<User[]>;
  login(login: string, parol: string): Promise<LoginResult | null>;
  addUser(token: string, u: Omit<User, "id">): Promise<MutationResult>;
  removeUser(token: string, id: string): Promise<void>;
  patchUser(token: string, id: string, patch: Partial<Omit<User, "id">>): Promise<User | null>;
  updateProfile(
    token: string,
    data: { ism: string; familya: string; tel?: string; tugilgan?: string }
  ): Promise<MutationResult>;
  changePassword(token: string, eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }>;
  adminResetPassword(token: string, targetId: string, newParol: string): Promise<{ ok: boolean; error?: string }>;
}

export const usersApi: UsersApi = new LocalUsersApi();
