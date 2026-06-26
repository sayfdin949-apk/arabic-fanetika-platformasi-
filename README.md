# Arab Fonetika Platformasi

Arab tili **fonetikasini** o'rgatuvchi web-platforma (LMS): nazariy darslar, amaliy mashqlar, testlar, dastur jadvali, davomat va o'quvchi boshqaruvi.

## Texnologiya

- **Vite + React + TypeScript**
- **React Router** (sahifalar)
- Saqlash: `localStorage` (lokal bosqich) — keyin **Supabase** (server bosqichi)
- Dizayn: NOON yashil tizimi

## Ishga tushirish (lokal)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # ishlab chiqarish uchun build (tsc + vite)
```

## Hisoblar (lokal sinov)

| Rol | Login | Parol |
|-----|-------|-------|
| O'qituvchi | `ustoz` | `1234` |
| O'quvchi | `abdulloh` (yoki yusuf, mariya, diyor, sevara) | `1234` |

O'qituvchi **O'quvchilar** bo'limidan yangi o'quvchi qo'shadi/o'chiradi.

## Bo'limlar

- **Bosh sahifa** — umumiy progress
- **Dars** — Nazariy (8 dars + test, ≥80% da keyingisi ochiladi) va Amaliy (14 harf jufti, 9 tab, TTS)
- **Dastur** — 4.5 oylik jadval
- **Profil** — avatar, ma'lumot, statistika
- **Davomat** / **O'quvchilar** — faqat o'qituvchi

## Tuzilma

```
src/
  theme/      dizayn tokenlari (ranglar, shriftlar)
  content/    darslar ma'lumoti (nazariy, amaliy, dastur)
  lib/        storage, tts, md, useMediaQuery, usersRepo, ai (joy)
  auth/       AuthContext, Login, foydalanuvchilar
  layout/     AppShell (responsive nav), nav
  features/   home, dars, curriculum, profile, attendance, admin, progress
  components/ ui, Quiz
```

## Bosqichlar

- **Bosqich A (lokal) — joriy:** to'liq web-loyiha, localStorage bilan ishlaydi.
- **Bosqich B (server) — keyin:** Supabase (auth, baza, fayl), realtime, deploy.

Batafsil: `docs/superpowers/specs/` (dizayn) va `docs/superpowers/plans/` (reja).

---

> `Arab_Fonetika_Platforma_v3_Toliq.tsx` (repo ildizida) — **eski/legacy prototip** (bitta fayl, 676-qatorda uzilgan). Ma'lumot undan ko'chirilgan. Build'ga kirmaydi; tarixiy ma'lumot uchun saqlangan.
