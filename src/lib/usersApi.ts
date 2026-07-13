import type { User, Role } from "../auth/types";
import { LocalUsersApi } from "./usersApi.local";
import { SupabaseUsersApi } from "./usersApi.supabase";

/*
 * Foydalanuvchilar (login/parol) bilan ishlash qatlami.
 *
 * `store` (StorageAdapter) dan farqli o'laroq, bu qatlam orqali parol
 * HECH QACHON brauzerga to'liq holda jo'natilmaydi — Supabase rejimida
 * tekshirish/o'zgartirish server tomonidagi (SECURITY DEFINER) SQL
 * funksiyalari orqali amalga oshiriladi (qarang: supabase-migration-v2-secure-auth.sql).
 * Lokal (localStorage) rejimda haqiqiy backend yo'q, shuning uchun bu yerda
 * xavfsizlik chegarasi yo'q — shunchaki eski sinxron mantiq async qilib o'ralgan.
 */

export interface MutationResult {
  ok: boolean;
  error?: string;
  user?: User;
}

export interface LoginResult {
  user: User;
  /**
   * Server tomonida imzolangan sessiya tokeni — keyingi "yozish" so'rovlarida
   * (addUser/removeUser/patchUser/updateProfile/changePassword) chaqiruvchi
   * KIM ekanini tasdiqlash uchun ishlatiladi. Klient buni o'zgartira olmaydi:
   * Supabase rejimida server token imzosini qayta tekshiradi (qarang:
   * supabase-migration-v5-session-tokens.sql).
   */
  token: string;
}

export interface UsersApi {
  getUsers(): Promise<User[]>;
  login(login: string, parol: string, role: Role): Promise<LoginResult | null>;
  loginWithTelegram(initData: string): Promise<LoginResult | null>;
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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const usersApi: UsersApi =
  SUPABASE_URL && SUPABASE_KEY ? new SupabaseUsersApi(SUPABASE_URL, SUPABASE_KEY) : new LocalUsersApi();
