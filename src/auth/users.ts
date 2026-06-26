import type { User } from "./types";

/* Boshlang'ich foydalanuvchilar (lokal bosqich).
 * Bosqich B'da bu ro'yxat Supabase bazasiga ko'chiriladi va parollar hash qilinadi.
 * A6'da o'qituvchi o'quvchi qo'shishi/o'chirishi qo'shiladi (localStorage bilan).
 */
export const SEED_USERS: User[] = [
  { id: "t1", login: "ustoz", parol: "1234", ism: "Ozodbek", familya: "Rahimov", role: "teacher", avatar: null },
  { id: "s1", login: "abdulloh", parol: "1234", ism: "Abdulloh", familya: "Karimov", role: "student", tugilgan: "2008", tel: "+998 90 123 45 67", avatar: null },
  { id: "s2", login: "yusuf", parol: "1234", ism: "Yusuf", familya: "Tohirov", role: "student", tugilgan: "2009", tel: "+998 91 234 56 78", avatar: null },
  { id: "s3", login: "mariya", parol: "1234", ism: "Mariya", familya: "Soliyeva", role: "student", tugilgan: "2008", tel: "+998 93 345 67 89", avatar: null },
  { id: "s4", login: "diyor", parol: "1234", ism: "Diyor", familya: "Ergashev", role: "student", tugilgan: "2009", tel: "+998 94 456 78 90", avatar: null },
  { id: "s5", login: "sevara", parol: "1234", ism: "Sevara", familya: "Aliyeva", role: "student", tugilgan: "2008", tel: "+998 95 567 89 01", avatar: null },
];
