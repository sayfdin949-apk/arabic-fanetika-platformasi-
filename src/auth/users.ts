import type { User } from "./types";

/* Boshlang'ich foydalanuvchilar (lokal bosqich).
 * Bosqich B'da bu ro'yxat Supabase bazasiga ko'chiriladi va parollar hash qilinadi.
 * A6'da o'qituvchi o'quvchi qo'shishi/o'chirishi qo'shiladi (localStorage bilan).
 */
export const SEED_USERS: User[] = [
  { id: "t1", login: "ustoz", parol: "1234", ism: "Ozodbek", familya: "Rahimov", role: "teacher", avatar: null },
  { id: "s6", login: "abduhollaxov", parol: "abd2006", ism: "Abdulloh", familya: "Abduhollaxov", role: "student", tugilgan: "14.05.2006", tel: "+998918200006", avatar: null },
  { id: "s7", login: "xislatbek", parol: "xis2006", ism: "Xislatbek", familya: "Normatov", role: "student", tugilgan: "11.08.2006", tel: "+998950720206", avatar: null },
  { id: "s8", login: "azim", parol: "azim1995", ism: "Azim", familya: "Valijonov", role: "student", tugilgan: "18.02.1995", tel: "+998909871266", avatar: null },
  { id: "s9", login: "oybek", parol: "oybek2001", ism: "Oybek", familya: "Uktamov", role: "student", tugilgan: "01.11.2001", tel: "+998335050011", avatar: null },
  { id: "s10", login: "salohiddin", parol: "salo2008", ism: "Salohiddin", familya: "Jumayev", role: "student", tugilgan: "26.01.2008", tel: "+998947800826", avatar: null },
];
