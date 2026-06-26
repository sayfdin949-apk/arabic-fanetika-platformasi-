# Arab Fonetika Platformasi — Ish Rejasi

**Sana:** 2026-06-26
**Spec:** [2026-06-26-arabic-fonetika-platforma-design.md](../specs/2026-06-26-arabic-fonetika-platforma-design.md)

Har qadam alohida bajariladi, lokalda sinaymiz, keyin keyingisiga o'tamiz.

---

## BOSQICH A — Lokal

### A1. Loyiha karkasi (scaffold)
- Vite + React + TypeScript karkasi (`package.json`, `index.html`, `tsconfig`, `vite.config.ts`).
- React Router qo'shish.
- `npm install` + `npm run dev` ishlashini tekshirish (bo'sh "Hello" sahifa).
- **Sinov:** brauzerda ochilishi.

### A2. Dizayn va kontentni ko'chirish
- `theme/tokens.ts` — ranglar (`T`), shriftlar, uslublar.
- `content/nazariy.ts`, `content/amaliy.ts`, `content/dastur.ts` — mavjud datani ko'chirish (TypeScript tiplari bilan).
- `lib/md.tsx` (Markdown renderer), `lib/tts.ts` (speakAr).
- **Sinov:** kontent import bo'lishi, type xato yo'qligi.

### A3. Saqlash qatlami
- `lib/storage.ts` — `Storage` interfeysi + `LocalStorageAdapter`.
- `window.storage` o'rniga shu interfeys ishlatiladi.
- **Sinov:** yozish/o'qish localStorage'da.

### A4. Auth va layout
- `auth/AuthContext.tsx` + `auth/Login.tsx` (mavjud login ekrani, AI'siz).
- `layout/AppShell.tsx` — desktop sidebar / mobile tab bar (responsive).
- `App.tsx` — router + auth gate.
- **Sinov:** login qilish, bo'limlar orasida o'tish (telefon + kompyuter ko'rinishi).

### A5. Asosiy sahifalar (bittadan)
Har birini alohida ko'chirib, sinaymiz:
1. `features/home` — bosh sahifa + progress
2. `features/theory` — nazariy dars + test (shuffle, ≥80% ochilish)
3. `features/practice` — amaliy bob (tab'lar)
4. `features/curriculum` — dastur jadvali
5. `features/profile` — profil + avatar

### A6. O'qituvchi funksiyalari
1. `features/attendance` — davomat
2. `features/chat` — o'quvchilar chati
3. `features/admin` — **yangi:** o'quvchi boshqaruvi (qo'shish/o'chirish, login-parol)

### A7. AI olib tashlash + tozalash
- `sendAi`, `api.anthropic.com` chaqiruvi, AI tugmalari olib tashlanadi.
- Keyin xavfsiz qaytarish uchun `lib/ai.ts` interfeys joyi (bo'sh) qoldiriladi.
- Eski `Arab_Fonetika_Platforma_v3_Toliq.tsx` o'chiriladi (yangi tuzilma to'liq ishlagach).
- **Sinov:** to'liq oqim lokalda ishlashi.

---

## BOSQICH B — Server (keyin, alohida rejalashtiriladi)

- B1. Supabase loyihasi + jadvallar.
- B2. `SupabaseAdapter` (interfeys bir xil).
- B3. Haqiqiy auth (parol hash).
- B4. Realtime chat + avatar fayl saqlash.
- B5. Deploy (hosting).

> Bosqich B faqat Bosqich A to'liq sinab bo'lingach boshlanadi va o'sha paytda batafsil rejalashtiriladi.

---

## Eslatmalar
- Har qadamdan keyin lokalda birga sinaymiz.
- Commit har qadam uchun alohida (revert nuqtasi sifatida).
- Push faqat so'ralganda (repo egasi: sayfdin949-apk).
