import type { User } from "./types";

/* DEV-ONLY fixture ma'lumotlar. Bu ro'yxat FAQAT Supabase sozlanmagan
 * (VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY yo'q) holatda, LocalUsersApi
 * fallback rejimida ishlatiladi — production'da (Supabase sozlangan
 * bo'lsa) hech qachon o'qilmaydi, real foydalanuvchilar bazadagi "users"
 * kalitida (bcrypt bilan xeshlangan parollar) saqlanadi. Shunga qaramay,
 * bu fayl bundle'ga qo'shiladi — shu sabab bu yerga REAL parol/PII
 * qo'yilmasin, faqat demo qiymatlar.
 */
export const SEED_USERS: User[] = [
  { id: "t1", login: "ustoz", parol: "1234", ism: "Ozodbek", familya: "Rahimov", role: "ceo", avatar: null },
  { id: "s6", login: "abduhollaxov", parol: "a2006", ism: "Abdulloh", familya: "Abduhollaxov", role: "student", tugilgan: "14.05.2006", tel: "+998918200006", avatar: null },
  { id: "s7", login: "xislatbek", parol: "x2006", ism: "Xislatbek", familya: "Normatov", role: "student", tugilgan: "11.08.2006", tel: "+998950720206", avatar: null },
  { id: "s8", login: "azim", parol: "1995", ism: "Azim", familya: "Valijonov", role: "student", tugilgan: "18.02.1995", tel: "+998909871266", avatar: null },
  { id: "s9", login: "oybek", parol: "2001", ism: "Oybek", familya: "Uktamov", role: "student", tugilgan: "01.11.2001", tel: "+998335050011", avatar: null },
  { id: "s10", login: "salohiddin", parol: "2008", ism: "Salohiddin", familya: "Jumayev", role: "student", tugilgan: "26.01.2008", tel: "+998947800826", avatar: null },
];
