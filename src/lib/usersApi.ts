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

export interface UsersApi {
  getUsers(): Promise<User[]>;
  login(login: string, parol: string, role: Role): Promise<User | null>;
  loginWithTelegram(initData: string): Promise<User | null>;
  addUser(u: Omit<User, "id">): Promise<MutationResult>;
  removeUser(id: string): Promise<void>;
  patchUser(id: string, patch: Partial<Omit<User, "id">>): Promise<User | null>;
  updateProfile(
    userId: string,
    data: { ism: string; familya: string; tel?: string; tugilgan?: string }
  ): Promise<MutationResult>;
  changePassword(userId: string, eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }>;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const usersApi: UsersApi =
  SUPABASE_URL && SUPABASE_KEY ? new SupabaseUsersApi(SUPABASE_URL, SUPABASE_KEY) : new LocalUsersApi();
