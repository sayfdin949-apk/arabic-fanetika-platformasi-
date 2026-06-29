export type Role = "teacher" | "student";

export interface User {
  id: string;
  login: string;
  parol: string;
  ism: string;
  familya: string;
  role: Role;
  tugilgan?: string;
  tel?: string;
  avatar?: string | null;
  telegramId?: number;
}
