import type { User, Role } from "../auth/types";
import { getUsers, saveUsers } from "./usersRepo";
import type { LoginResult, MutationResult, UsersApi } from "./usersApi";

function parseUnverifiedTelegramId(initData: string): number | null {
  try {
    const params = new URLSearchParams(initData);
    const userJson = params.get("user");
    if (!userJson) return null;
    const id = JSON.parse(userJson)?.id;
    return typeof id === "number" ? id : null;
  } catch {
    return null;
  }
}

/*
 * Lokal (localStorage) fallback — Supabase sozlanmagan muhitlar uchun.
 * Bu yerda haqiqiy backend yo'q, shuning uchun xavfsizlik chegarasi yo'q —
 * "token" shunchaki foydalanuvchi id'sining o'zi (Supabase rejimidagi
 * UsersApi interfeysi bilan mos kelishi uchun saqlanadi, lekin hech qachon
 * tasdiqlanmaydi).
 */
export class LocalUsersApi implements UsersApi {
  async getUsers(): Promise<User[]> {
    return getUsers();
  }

  async login(login: string, parol: string, role: Role): Promise<LoginResult | null> {
    const users = await getUsers();
    const user = users.find(
      (x) => x.login.toLowerCase() === login.trim().toLowerCase() && x.parol === parol && x.role === role
    );
    return user ? { user, token: user.id } : null;
  }

  async loginWithTelegram(initData: string): Promise<LoginResult | null> {
    // Lokal (offline) rejimda haqiqiy backend yo'q, shuning uchun bot
    // tokeni bilan HMAC tasdiqlash imkonsiz — bu yerda faqat initData
    // ichidagi "user.id" ni tasdiqlamasdan o'qib olamiz (Supabase
    // rejimida esa server bu satrni to'liq tasdiqlaydi, qarang:
    // usersApi.supabase.ts / supabase-migration-v4-telegram-hmac.sql).
    const tgId = parseUnverifiedTelegramId(initData);
    if (tgId === null) return null;
    const users = await getUsers();
    const user = users.find((x) => x.telegramId === tgId);
    return user ? { user, token: user.id } : null;
  }

  async addUser(_token: string, u: Omit<User, "id">): Promise<MutationResult> {
    const users = await getUsers();
    const loginTaken = users.some((x) => x.login.toLowerCase() === u.login.trim().toLowerCase());
    if (loginTaken) return { ok: false, error: "Bu login band" };
    const id = "u" + Date.now();
    const newUser: User = { ...u, id, login: u.login.trim() };
    await saveUsers([...users, newUser]);
    return { ok: true, user: newUser };
  }

  async removeUser(_token: string, id: string): Promise<void> {
    const users = await getUsers();
    await saveUsers(users.filter((x) => x.id !== id));
  }

  async patchUser(_token: string, id: string, patch: Partial<Omit<User, "id">>): Promise<User | null> {
    const users = await getUsers();
    let updated: User | null = null;
    const list = users.map((x) => {
      if (x.id !== id) return x;
      updated = { ...x, ...patch };
      return updated;
    });
    await saveUsers(list);
    return updated;
  }

  async updateProfile(
    token: string,
    data: { ism: string; familya: string; tel?: string; tugilgan?: string }
  ): Promise<MutationResult> {
    const userId = token;
    const users = await getUsers();
    const cur = users.find((x) => x.id === userId);
    if (!cur) return { ok: false, error: "Foydalanuvchi topilmadi" };
    if (!data.ism.trim()) return { ok: false, error: "Ism majburiy" };
    const updated: User = {
      ...cur,
      ism: data.ism.trim(),
      familya: data.familya.trim(),
      tel: data.tel?.trim() || undefined,
      tugilgan: data.tugilgan?.trim() || undefined,
    };
    await saveUsers(users.map((x) => (x.id === userId ? updated : x)));
    return { ok: true, user: updated };
  }

  async changePassword(token: string, eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }> {
    const userId = token;
    const users = await getUsers();
    const cur = users.find((x) => x.id === userId);
    if (!cur) return { ok: false, error: "Foydalanuvchi topilmadi" };
    if (cur.parol !== eskiParol) return { ok: false, error: "Eski parol noto'g'ri" };
    if (yangiParol.trim().length < 4) return { ok: false, error: "Yangi parol kamida 4 ta belgi bo'lishi kerak" };
    const updated: User = { ...cur, parol: yangiParol.trim() };
    await saveUsers(users.map((x) => (x.id === userId ? updated : x)));
    return { ok: true };
  }

  async adminResetPassword(token: string, targetId: string, newParol: string): Promise<{ ok: boolean; error?: string }> {
    const callerId = token;
    const users = await getUsers();
    const caller = users.find((x) => x.id === callerId);
    if (!caller || (caller.role !== "ceo" && caller.role !== "teacher")) return { ok: false, error: "Ruxsat berilmagan" };
    const target = users.find((x) => x.id === targetId);
    if (!target) return { ok: false, error: "Foydalanuvchi topilmadi" };
    if (newParol.trim().length < 4) return { ok: false, error: "Parol kamida 4 ta belgi bo'lishi kerak" };
    const updated: User = { ...target, parol: newParol.trim() };
    await saveUsers(users.map((x) => (x.id === targetId ? updated : x)));
    return { ok: true };
  }
}
