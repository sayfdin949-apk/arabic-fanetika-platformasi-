import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { User, Role } from "../auth/types";
import type { LoginResult, MutationResult, UsersApi } from "./usersApi";

/*
 * Supabase rejimida foydalanuvchilar bilan ishlash — FAQAT server tomonidagi
 * SECURITY DEFINER SQL funksiyalari (afp_login, afp_get_users, ...) orqali.
 * "afp_kv" jadvalining "users" qatori RLS bilan to'g'ridan-to'g'ri o'qish/
 * yozishdan yopilgan (qarang: supabase-migration-v2-secure-auth.sql) —
 * shuning uchun bu yerda hech qachon .from("afp_kv") ishlatilmaydi.
 *
 * "Yozish" funksiyalari (addUser/removeUser/patchUser/updateProfile/
 * changePassword) endi login paytida olingan sessiya tokenini talab qiladi —
 * server shu token orqali chaqiruvchining HAQIQIY id/role'ini hisoblaydi,
 * klient yuborgan id/role'ga ishonmaydi (qarang:
 * supabase-migration-v5-session-tokens.sql).
 */
export class SupabaseUsersApi implements UsersApi {
  private client: SupabaseClient;

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey);
  }

  async getUsers(): Promise<User[]> {
    const { data, error } = await this.client.rpc("afp_get_users");
    if (error || !data) return [];
    return data as User[];
  }

  async login(login: string, parol: string, role: Role): Promise<LoginResult | null> {
    const { data, error } = await this.client.rpc("afp_login", {
      p_login: login,
      p_parol: parol,
      p_role: role,
    });
    if (error || !data) return null;
    return data as LoginResult;
  }

  async loginStudentById(telegramId: string): Promise<LoginResult | null> {
    const { data, error } = await this.client.rpc("afp_student_login_by_telegram_id", { p_telegram_id: telegramId });
    if (error || !data) return null;
    return data as LoginResult;
  }

  async loginWithTelegram(initData: string): Promise<LoginResult | null> {
    // initData server tomonida HMAC-SHA256 orqali tasdiqlanadi
    // (qarang: supabase-migration-v4-telegram-hmac.sql) — xom Telegram ID
    // bu yerda ishlatilmaydi.
    const { data, error } = await this.client.rpc("afp_login_telegram_secure", { p_init_data: initData });
    if (error || !data) return null;
    return data as LoginResult;
  }

  async addUser(token: string, u: Omit<User, "id">): Promise<MutationResult> {
    const { data, error } = await this.client.rpc("afp_add_user", { p_session_token: token, p_user: u });
    if (error || !data) return { ok: false, error: "Server xatosi" };
    return data as MutationResult;
  }

  async removeUser(token: string, id: string): Promise<void> {
    await this.client.rpc("afp_remove_user", { p_session_token: token, p_id: id });
  }

  async patchUser(token: string, id: string, patch: Partial<Omit<User, "id">>): Promise<User | null> {
    const { data, error } = await this.client.rpc("afp_patch_user", {
      p_session_token: token,
      p_id: id,
      p_patch: patch,
    });
    if (error || !data) return null;
    return data as User;
  }

  async updateProfile(
    token: string,
    data: { ism: string; familya: string; tel?: string; tugilgan?: string }
  ): Promise<MutationResult> {
    const { data: res, error } = await this.client.rpc("afp_update_profile", {
      p_session_token: token,
      p_ism: data.ism,
      p_familya: data.familya,
      p_tel: data.tel ?? null,
      p_tugilgan: data.tugilgan ?? null,
    });
    if (error || !res) return { ok: false, error: "Server xatosi" };
    return res as MutationResult;
  }

  async changePassword(token: string, eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }> {
    const { data, error } = await this.client.rpc("afp_change_password", {
      p_session_token: token,
      p_eski_parol: eskiParol,
      p_yangi_parol: yangiParol,
    });
    if (error || !data) return { ok: false, error: "Server xatosi" };
    return data as { ok: boolean; error?: string };
  }

  async adminResetPassword(token: string, targetId: string, newParol: string): Promise<{ ok: boolean; error?: string }> {
    const { data, error } = await this.client.rpc("afp_admin_reset_password", {
      p_session_token: token,
      p_target_id: targetId,
      p_new_parol: newParol,
    });
    if (error || !data) return { ok: false, error: "Server xatosi" };
    return data as { ok: boolean; error?: string };
  }
}
