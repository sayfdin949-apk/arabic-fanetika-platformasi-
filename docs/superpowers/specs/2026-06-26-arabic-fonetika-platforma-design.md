# Arab Fonetika Platformasi — Dizayn Hujjati (Spec)

**Sana:** 2026-06-26
**Repo:** sayfdin949-apk/arabic-fanetika-platformasi-
**Holat:** Tasdiqlangan dizayn → ish rejasiga tayyor

---

## 1. Maqsad va kontekst

Arab tili **fonetikasini** o'rgatuvchi web-platforma (LMS).

- **Auditoriya:** hozir muallifning shaxsiy o'quvchilari (Noon Academy emas, shaxsiy loyiha). Kelajakda ochiq platformaga aylantiriladi.
- **Hajm:** hozir 50–100 o'quvchi, kelajakda yuzlab.
- **Qurilma:** telefon ham, kompyuter ham — **telefon ustun**. To'liq responsive (mobil-birinchi) kerak.
- **Muddat:** yo'q. **Sifat birinchi o'rinda.**

## 2. Boshlang'ich holat (nimadan boshlayapmiz)

Repoda bitta `Arab_Fonetika_Platforma_v3_Toliq.tsx` (677 qator) — to'liq ishlaydigan prototip, lekin:

- **Loyiha karkasi yo'q** (`package.json`, Vite, `index.html`, `tsconfig` yo'q) — `npm` bilan ishga tushib bo'lmaydi; Claude artifact / sandbox uchun yozilgan.
- **`window.storage`** — standart bo'lmagan API; haqiqiy saqlash kerak.
- **AI chat buzuq + xavfli** — `api.anthropic.com` ga to'g'ridan-to'g'ri, kalitsiz murojaat.
- **Auth soxta** — `USERS_DB` da ochiq parollar, faqat klient tomonda.
- **Bitta ulkan inline-style fayl** — saqlash/kengaytirish qiyin.

**Kuchli tomoni — kontent:** 8 nazariy dars (test bilan), 14 amaliy bob (har harf jufti: maxraj/sifat/shakl/harakat/so'z/o'qish/yozish/uy vazifa/test), 5 oylik dastur. Bu saqlanadi.

## 3. Texnik tanlov

- **Frontend:** Vite + React + TypeScript.
- **Navigatsiya:** React Router (bo'limlar → route'lar).
- **Holat (state):** React state + Context; saqlash alohida qatlam orqali.
- **Backend (Bosqich B):** **Supabase** — auth, Postgres baza, realtime (chat), fayl saqlash (avatar). O'z server kodi yozilmaydi; yuzlab foydalanuvchiga chidaydi.
- **Dizayn:** mavjud NOON yashil tizimi (tokenlar `T`) saqlanadi, alohida modulga chiqariladi.

> **Asosiy prinsip:** frontend Bosqich A va Bosqich B da bir xil qoladi. Faqat saqlash qatlamining amalga oshirilishi (localStorage → Supabase) almashadi. Shuning uchun lokal ish keyin qayta yozilmaydi.

## 4. Bosqichlar

### Bosqich A — Lokal (hozir)
Maqsad: prototipni to'g'ri web-loyihaga aylantirib, kompyuterda ishga tushirish va birga sinash.

1. Vite + React + TS karkasini qo'shish (`package.json`, `index.html`, `tsconfig`, `vite.config`).
2. Bitta faylni modullarga bo'lish (5-bo'limga qarang).
3. Saqlash qatlamini abstraksiya qilish: `Storage` interfeysi + `LocalStorageAdapter` (hozircha).
4. AI qismlarini olib tashlash (keyin xavfsiz qaytarish uchun interfeys joyi qoldiriladi).
5. Mobil-birinchi responsive layout (6-bo'lim).
6. O'qituvchi uchun **o'quvchi boshqaruvi paneli** (qo'shish/o'chirish, login-parol).
7. Lokalda `npm run dev` bilan ishlaydi; funksiya-funksiya birga sinaymiz.

### Bosqich B — Server (keyin)
Hammasi lokalda ishlagach:

1. Supabase loyihasi: jadvallar (users, progress, unlocked, attendance, chat, avatars).
2. `SupabaseAdapter` yozish (interfeys bir xil) → `LocalStorageAdapter` o'rniga ulanadi.
3. Haqiqiy xavfsiz auth (parollar hash, server tomonda).
4. Chat realtime, avatar fayl saqlash.
5. Serverga deploy (hosting).

## 5. Loyiha tuzilishi (modullarga bo'lish)

```
src/
  main.tsx                 # kirish nuqtasi
  App.tsx                  # router + auth gate
  theme/
    tokens.ts              # T (ranglar), shriftlar (FONT, AR), card/Btn uslublari
  content/
    nazariy.ts             # 8 nazariy dars
    amaliy.ts              # 14 amaliy bob
    dastur.ts              # 5 oylik dastur
  lib/
    storage.ts             # Storage interfeysi + LocalStorageAdapter (keyin SupabaseAdapter)
    tts.ts                 # speakAr (arabcha o'qib berish)
    md.tsx                 # Markdown renderer (MD)
  auth/
    AuthContext.tsx        # joriy foydalanuvchi, login/logout
    Login.tsx              # login ekrani
  layout/
    AppShell.tsx           # desktop sidebar / mobile tab bar (responsive)
  features/
    home/                  # bosh sahifa + progress
    theory/                # nazariy dars + test
    practice/              # amaliy bob (tab'lar)
    curriculum/            # dastur jadvali
    chat/                  # o'quvchilar chati
    attendance/            # davomat (o'qituvchi)
    profile/               # profil + avatar
    admin/                 # o'quvchi boshqaruvi (o'qituvchi)
  components/              # qayta ishlatiladigan UI (tugma, karta, badge ...)
```

Har modul bitta aniq vazifaga ega, alohida tushunilishi va sinalishi mumkin.

## 6. Responsive layout

- **Telefon:** pastki tab bar (Bosh / Darslar / Amaliy / Chat / Profil), ixcham; o'qituvchida qo'shimcha bo'limlar drawer/menyuda.
- **Kompyuter:** hozirgidek chap yon panel.
- Barcha sahifalar barmoqqa qulay (tap target yetarli), NOON yashil dizayni saqlanadi.

## 7. Funksiyalar ro'yxati

> **Yangilanish (2026-06-26):** (1) **Nazariy + Amaliy bitta "Dars" bo'limida birlashtirildi** — bitta nav element, ichida Nazariy/Amaliy o'tkagich. (2) **Chat butunlay olib tashlanadi** (ham AI chat, ham o'quvchilar chati).

**Qoladi:**
- **Dars** bo'limi: Nazariy darslar + testlar (shuffle, ≥80% da keyingi dars ochiladi) **va** Amaliy boblar (maxraj/sifat/shakl/harakat/so'z/o'qish/yozish/uy vazifa/test) — bitta bo'limda
- 5 oylik dastur jadvali
- Login + rollar (o'qituvchi / o'quvchi)
- Davomat (o'qituvchi)
- Avatar
- Progress kuzatuvi
- TTS (arabcha o'qib berish)

**Olib tashlanadi:**
- AI chat va AI yordamchi (`sendAi`, `api.anthropic.com` chaqiruvi).
- O'quvchilar chati (butunlay).

**Qo'shiladi:**
- O'qituvchi uchun o'quvchi boshqaruvi paneli (CRUD: qo'shish/o'chirish, login-parol).

**Tuzatiladi:**
- Soxta/ochiq parollar → to'g'ri tartib (Bosqich B da haqiqiy auth).
- `window.storage` → `Storage` abstraksiyasi.

## 8. Ma'lumot modeli (saqlanadigan narsalar)

- **Users:** id, login, parol(hash — Bosqich B), ism, familya, role, tug'ilgan, tel, avatar.
- **Progress (naz_done / amal_done):** har user uchun dars bo'yicha {ok, tot, pct, sana}.
- **Unlocked:** har user uchun ochilgan darslar.
- **Attendance (davomat):** har sana bo'yicha o'quvchi holati (keldi/kelmadi).
- **Chat:** xabarlar (id, uid, ism, text, time).
- **Content (NAZARIY/AMALIY/DASTUR):** statik — repoda kod-data sifatida (keyin kerak bo'lsa bazaga ko'chiriladi).

## 9. Sinash strategiyasi

- Har bosqich kompyuterda `npm run dev` bilan ishga tushiriladi.
- Funksiya-funksiya, sahifa-sahifa sinab boramiz (bittada hammasini emas).
- Lokalda ma'lumot localStorage'da; sinash uchun namuna o'quvchilar bilan.

## 10. Ko'lamdan tashqari (hozir emas)

- AI yordamchi (keyin, backend-proxy bilan)
- Ochiq platforma / self-registration / landing-sahifa (kelajak)
- To'lov, sertifikat, bildirishnoma (push) — kelgusi
