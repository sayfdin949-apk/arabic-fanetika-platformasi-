import type { User, Role } from "../auth/types";
import { getUsers, saveUsers } from "./usersRepo";
import type { MutationResult, UsersApi } from "./usersApi";

/* Lokal (localStorage) fallback — Supabase sozlanmagan muhitlar uchun. */
export class LocalUsersApi implements UsersApi {
  async getUsers(): Promise<User[]> {
    return getUsers();
  }

  async login(login: string, parol: string, role: Role): Promise<User | null> {
    const users = await getUsers();
    return (
      users.find(
        (x) => x.login.toLowerCase() === login.trim().toLowerCase() && x.parol === parol && x.role === role
      ) ?? null
    );
  }

  async loginWithTelegram(tgId: number): Promise<User | null> {
    const users = await getUsers();
    return users.find((x) => x.telegramId === tgId) ?? null;
  }

  async addUser(u: Omit<User, "id">): Promise<MutationResult> {
    const users = await getUsers();
    const loginTaken = users.some((x) => x.login.toLowerCase() === u.login.trim().toLowerCase());
    if (loginTaken) return { ok: false, error: "Bu login band" };
    const id = "u" + Date.now();
    const newUser: User = { ...u, id, login: u.login.trim() };
    await saveUsers([...users, newUser]);
    return { ok: true, user: newUser };
  }

  async removeUser(id: string): Promise<void> {
    const users = await getUsers();
    await saveUsers(users.filter((x) => x.id !== id));
  }

  async patchUser(id: string, patch: Partial<Omit<User, "id">>): Promise<User | null> {
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
    userId: string,
    data: { ism: string; familya: string; tel?: string; tugilgan?: string }
  ): Promise<MutationResult> {
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

  async changePassword(userId: string, eskiParol: string, yangiParol: string): Promise<{ ok: boolean; error?: string }> {
    const users = await getUsers();
    const cur = users.find((x) => x.id === userId);
    if (!cur) return { ok: false, error: "Foydalanuvchi topilmadi" };
    if (cur.parol !== eskiParol) return { ok: false, error: "Eski parol noto'g'ri" };
    if (yangiParol.trim().length < 4) return { ok: false, error: "Yangi parol kamida 4 ta belgi bo'lishi kerak" };
    const updated: User = { ...cur, parol: yangiParol.trim() };
    await saveUsers(users.map((x) => (x.id === userId ? updated : x)));
    return { ok: true };
  }
}
