# UX Audit va Reja — 2026-06-27

Bosqich A tugagach o'tkazilgan UX/qulaylik auditi va yaxshilash rejasi.

## Audit (topilgan kamchiliklar)

### Korreksiya (bug)
1. **Quiz variantlari qayta aralashadi** — `questions` har render'da yangi massiv bo'lib yaratilgani uchun, test topshirilgach (ProgressContext yangilanishi → parent re-render) variantlar qayta aralashadi va natija belgilanishi (to'g'ri/xato) buziladi. → `useMemo` bilan barqarorlashtirish.

### Navigatsiya / oqim
2. **Sahifa o'tishda scroll yuqoriga qaytmaydi** — ro'yxatdan detalga o'tganda detal o'rtadan ochilishi mumkin (ayniqsa mobil). → route o'zgarishida `main` scroll reset.
3. **Nazariy: testdan keyin "Keyingi dars" yo'q** — ≥80% olgach keyingi dars ochiladi, lekin unga o'tish tugmasi yo'q. → CTA qo'shish.
4. **Amaliy: boblar orasida o'tish yo'q** — har bob ichida oldingi/keyingi bobga o'tish kerak. → prev/next tugma.
5. **Qulflangan dars sababi ko'rinmaydi** — nega qulf ekani tushunarsiz. → qisqa izoh.

### Mikro-qulaylik
6. **Bosish (tap) feedback yo'q** — tugmalar bosilganda hech qanday vizual javob yo'q; mobil tap-highlight ko'rinadi; 300ms kechikish. → global `:active` scale + `touch-action:manipulation` + tap-highlight o'chirish.
7. **Quiz: topshirgach natijaga scroll yo'q** — uzun testda natija ko'rinmay qoladi. → natijaga scroll.
8. **Login: parol ko'rinmaydi / Login maydonida Enter ishlamaydi** — → ko'z (show/hide) toggle + Enter.
9. **Mobil header doim "Fonetika Kursi"** — joriy bo'lim nomi ko'rinmaydi. → joriy bo'lim sarlavhasi.

## Reja (fazalar)

- **U1:** Global tap-feedback (index.css) + route o'zgarishida scroll-to-top (AppShell).
- **U2:** Quiz reshuffle bug fix (useMemo) + topshirgach natijaga scroll.
- **U3:** Nazariy detali — "Keyingi dars" CTA (≥80% va ochiq bo'lsa) + Dars ro'yxatida qulf izohi.
- **U4:** Amaliy detali — oldingi/keyingi bob navigatsiyasi + faol tab'ni ko'rinishga scroll.
- **U5:** Login — parol show/hide + Enter; AppShell mobil header'da joriy bo'lim nomi.

Har faza: build + alohida commit. Yakunda push.
