# UI Polish Audit va Reja — 2026-06-27

UX passidan keyin vizual sayqallash. NOON V4 Green System saqlanadi (forest green + lime + red; gold/teal yo'q). Tamoyil: ko'zni charchatmaydigan, restraint, glaring oq emas.

## Audit (vizual kamchiliklar)

1. **Tekis fon** — hamma joyda yagona `#eaf4ea`; chuqurlik yo'q. → nozik radial mesh fon (meshLight).
2. **Kartalar qattiqroq soya/radius** — `0 2px 8px` + radius 14; biroz quruq. → yumshoqroq soya, radius 16, izchillik.
3. **Bosh sahifa progress** — faqat raqam+ikki bar; markaziy vizual yo'q. → doiraviy progress ring (SVG) + tozaroq layout.
4. **Input focus holati yo'q** — bosilганда vizual javob yo'q (login, admin, davomat). → global focus ring (lime).
5. **Dars ro'yxatida umumiy ko'rsatkich yo'q** — qancha o'tilgani yuqorida ko'rinmaydi. → summary chiplar.
6. **Matn tanlash rangi** — default ko'k. → brend lime selection.

## Reja (fazalar)

- **I1 — Foundation:** index.css (mesh fon, input focus ring, selection), tokens/ui yumshoq soya + radius 16, AppShell main fon mesh.
- **I2 — Bosh sahifa:** doiraviy progress ring (SVG) + stat layout.
- **I3 — Dars ro'yxati:** yuqorida umumiy progress chiplari (Nazariy X/8 · Amaliy Y/14).

Har faza: build + commit. Yakunda push. Funksionallik o'zgarmaydi — faqat vizual.
