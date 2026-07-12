import type { NazDars } from "./types";

export const NAZARIY: NazDars[] = [
  {
    id: 1,
    nomi: "Arab Yozuviga Kirish",
    icon: "أ",
    color: "green",
    mavzu: `# Arab Yozuviga Kirish

## Tarix
Arab yozuvi **IV asrda** Nabataean yozuvidan rivojlangan. Bugungi kunda **1.8 milliard** kishi arab tilida yozadi va o'qiydi. Bu yozuv O'rta Sharq, Shimoliy Afrika va Markaziy Osiyoda rasmiy yozuv sifatida qo'llaniladi.

---

## Asosiy Xususiyatlar

| Xususiyat | Qiymat |
|-----------|--------|
| Harflar soni | **28 ta** |
| Yo'nalish | **O'ngdan chapga** |
| Unlilar | Alohida belgi (harakat) |
| Ko'rinishlar | Har harf **4 xil** shaklda |

---

## Harflarning 4 Ko'rinishi

| Holat | Ta'rif | ب misoli | ع misoli |
|-------|--------|---------|---------|
| Mustaqil | Yolg'iz | ب | ع |
| Bosh | So'z boshida | بـ | عـ |
| O'rta | So'z o'rtasida | ـبـ | ـعـ |
| Oxir | So'z oxirida | ـب | ـع |

**Eslatma:** Ba'zi harflar faqat 2 ko'rinishda bo'ladi (mustaqil va oxir) — chunki ular faqat o'ng tomonga ulanadi.

---

## Faqat O'ng Tomonga Ulanadiganlar — 6 ta

Bu harflar **keyingi harfga ulanmaydi**. So'z shu harfdan keyin "uziladi":

| Harf | Nomi | Transkripsiya |
|------|------|--------------|
| ا | Alif | aa/a |
| د | Dal | d |
| ذ | Zal | ź/dh |
| ر | Ra | r |
| ز | Zayn | z |
| و | Vov | w/uu |

**Yodlash:** "أَدْرُزُوا" — bu 6 harf bir so'zda yig'ilgan!

---

## Amaliy Misollar

| Arab | O'qilishi | Uzilish |
|------|-----------|---------|
| كِتَاب | kitaab | ا dan keyin ب uziladi |
| وَلَد | walad | د dan keyin uziladi |
| هَذَا | haazaa | ذ dan keyin uziladi |
| دَرْس | dars | ر dan keyin uziladi |
| يَوْم | yawm | و dan keyin م uziladi |`,
    vazifalar: [
      {id:1,savol:"Arab alifbosida nechta harf bor?",variantlar:["24 ta","26 ta","28 ta","30 ta"],togri:2},
      {id:2,savol:"Arab yozuvi qaysi tomonga yoziladi?",variantlar:["Chapdan o'ngga","O'ngdan chapga","Yuqoridan pastga","Istalgan tomonga"],togri:1},
      {id:3,savol:"Har bir arab harfi necha xil ko'rinishda bo'ladi?",variantlar:["2 xil","3 xil","4 xil","5 xil"],togri:2},
      {id:4,savol:"Faqat o'ng tomonga ulanadiganlar nechta?",variantlar:["4 ta","5 ta","6 ta","7 ta"],togri:2},
      {id:5,savol:"Quyidagilardan qaysi biri faqat o'ng tomonga ulanadi?",variantlar:["ب (Ba)","ر (Ra)","س (Sin)","ك (Kof)"],togri:1},
      {id:6,savol:"و (Vov) harfi keyingi harfga nima qiladi?",variantlar:["Doim ulanadi","Hech ulanmaydi","Faqat boshida ulanadi","Sukun bo'lsa ulanadi"],togri:1},
      {id:7,savol:"'أَدْرُزُوا' yodlash so'zi nimani bildiradi?",variantlar:["6 ta mad harfi","6 ta ulanmaydigan harf","6 ta halq harfi","6 ta sifat"],togri:1},
      {id:8,savol:"Arab yozuvi qaysi yozuvdan rivojlangan?",variantlar:["Qadimgi fors","Nabataean","Qadimgi misr","Yahudiy"],togri:1},
      {id:9,savol:"So'z o'rtasidagi harf qaysi ko'rinishda yoziladi?",variantlar:["Mustaqil","Bosh","O'rta","Oxir"],togri:2},
      {id:10,savol:"هَذَا so'zidagi ذ harfidan keyin harf ulanadimi?",variantlar:["Ha, doim ulanadi","Yo'q, ذ ulanmaydi","Faqat a harakat bo'lsa","Faqat sukun bo'lsa"],togri:1},
    ]
  },
  {
    id: 2,
    nomi: "4 ta Asosiy Harakat",
    icon: "َ",
    color: "lime",
    mavzu: `# 4 ta Asosiy Harakat

**Harakat** — arab harflariga qo'shiladigan maxsus belgilar. Ular harfga tovush beradi va so'zni o'qishni belgilaydi.

---

## 1 — فَتْحَة (Fatha) — "A" tovushi

Harfning **ustida** yoziladi: ( َ ) — kichik chiziq ko'rinishida.

| Arab | O'qilishi | Ma'nosi |
|------|-----------|---------|
| كَتَبَ | kataba | yozdi |
| ذَهَبَ | zahaba | ketdi |
| فَتَحَ | fataha | ochdi |
| قَرَأَ | qara'a | o'qidi |

---

## 2 — كَسْرَة (Kasra) — "I" tovushi

Harfning **ostida** yoziladi: ( ِ ) — kichik chiziq pastda.

| Arab | O'qilishi | Ma'nosi |
|------|-----------|---------|
| كِتَاب | kitaab | kitob |
| مِنْ | min | dan |
| بِنَاء | binaau | bino |
| رِجَال | rijaal | erkaklar |

---

## 3 — ضَمَّة (Damma) — "U" tovushi

Harfning **ustida**, kichik و shaklida: ( ُ )

| Arab | O'qilishi | Ma'nosi |
|------|-----------|---------|
| نُور | nuur | nur, yorug'lik |
| كُتُب | kutub | kitoblar |
| دُخُول | duxul | kirish |
| مُعَلِّم | mu'allim | o'qituvchi |

---

## 4 — سُكُون (Sukun) — Harakat YO'Q

Harfning **ustida** ( ْ ) — kichik doira. Bu harf tovushsiz, ya'ni uning oldidagi harf harakatiga "yopishib" o'qiladi.

| Arab | O'qilishi | Sukun qaysi harfda |
|------|-----------|-------------------|
| بَيْت | bayt | ي da sukun |
| عِلْم | 'ilm | ل da sukun |
| مَكْتَب | maktab | ك da sukun |
| دَرْس | dars | ر da sukun |

---

## Xulosa Jadvali

| Harakat | Belgi | Joyi | Tovush | Misol |
|---------|-------|------|--------|-------|
| Fatha | َ | Ustida | A | بَ → ba |
| Kasra | ِ | Ostida | I | بِ → bi |
| Damma | ُ | Ustida (و) | U | بُ → bu |
| Sukun | ْ | Ustida (○) | — | بْ → b |`,
    vazifalar: [
      {id:1,savol:"Fatha qanday tovush beradi?",variantlar:["I","U","A","O"],togri:2},
      {id:2,savol:"Kasra qayerda joylashadi?",variantlar:["Harfning ustida","Harfning ostida","Harfning o'ngida","Harfning chapida"],togri:1},
      {id:3,savol:"Damma qanday tovush beradi?",variantlar:["A","I","U","E"],togri:2},
      {id:4,savol:"Sukun nimani bildiradi?",variantlar:["Uzun A tovushi","Harakat yo'qligi","Ikki marta aytish","U tovushi"],togri:1},
      {id:5,savol:"بُ qanday o'qiladi?",variantlar:["ba","bi","bu","b (tovushsiz)"],togri:2},
      {id:6,savol:"كِتَاب so'zining birinchi harakati qaysi?",variantlar:["Fatha","Kasra","Damma","Sukun"],togri:1},
      {id:7,savol:"Damma belgisi qanday ko'rinishda?",variantlar:["Kichik ن","Kichik و","Kichik ا","Kichik ي"],togri:1},
      {id:8,savol:"بَيْت so'zidagi ي harfida qaysi harakat?",variantlar:["Fatha","Kasra","Damma","Sukun"],togri:3},
      {id:9,savol:"نُور so'zi qanday o'qiladi?",variantlar:["naar","niir","nuur","noor"],togri:2},
      {id:10,savol:"مَكْتَب so'zida ك harfida qaysi harakat bor?",variantlar:["Fatha","Kasra","Damma","Sukun"],togri:3},
    ]
  },
  {
    id: 3,
    nomi: "Mad — Tovushni Uzatish",
    icon: "آ",
    color: "deep",
    mavzu: `# Mad — Tovushni Uzatish

**Mad** — arabcha tovushni cho'zib aytish. 3 ta mad harfi bor.

---

## 3 ta Mad Harfi

| Mad harfi | Oldingi harakat | Tovush | Misol |
|-----------|----------------|--------|-------|
| ا (alif)  | Fatha ( َ )    | AA     | كَاتِب — kaatib |
| ي (ya)    | Kasra ( ِ )    | II     | كِيس — kiis |
| و (waw)   | Damma ( ُ )    | UU     | نُور — nuur |

---

## Mad Tabiiy (Asosiy Mad)

**Mad Tabiiy** — har doim mavjud, **2 harakat** davom etadigan uzatma.

- كَاتِب → "kaa-tib" (alif bilan cho'ziladi)
- كِيس → "kiis" (ya bilan cho'ziladi)
- نُور → "nuur" (waw bilan cho'ziladi)

---

## Muhim Qoidalar

- Mad harflari **sukun** holatida bo'ladi (ularning o'z harakati yo'q)
- Oldingi harakat mad harfi bilan **mos kelishi** shart
- **Fatha → ا**, **Kasra → ي**, **Damma → و**

---

## Misollar Jadvali

| Arab | O'qilishi | Mad harfi | Hisoblar |
|------|-----------|----------|---------|
| كِتَاب | kitaab | ا | 2 |
| نُور | nuur | و | 2 |
| كِيس | kiis | ي | 2 |
| دَار | daar | ا | 2 |
| نَار | naar | ا | 2 |`,
    vazifalar: [
      {id:1,savol:"Mad degan nima?",variantlar:["Harfni ikki marta aytish","Tovushni cho'zib aytish","Harakatni tushirib qo'yish","Harfni sukun bilan o'qish"],togri:1},
      {id:2,savol:"Nechta mad harfi bor?",variantlar:["2 ta","3 ta","4 ta","5 ta"],togri:1},
      {id:3,savol:"ا (alif) mad harfi bo'lishi uchun oldida qaysi harakat turishi kerak?",variantlar:["Kasra","Damma","Fatha","Sukun"],togri:2},
      {id:4,savol:"كِتَاب so'zida mad bormi?",variantlar:["Yo'q","Ha, ا bilan","Ha, ي bilan","Ha, و bilan"],togri:1},
      {id:5,savol:"نُور so'zidagi mad harfi qaysi?",variantlar:["ن","و","ر","Yo'q"],togri:1},
      {id:6,savol:"ي mad harfi bo'lishi uchun oldida qaysi harakat turishi kerak?",variantlar:["Fatha","Damma","Kasra","Sukun"],togri:2},
      {id:7,savol:"Mad tabiiy necha harakat davom etadi?",variantlar:["1 harakat","2 harakat","4 harakat","6 harakat"],togri:1},
      {id:8,savol:"كِيس so'zidagi mad harfi qaysi?",variantlar:["ك","ي","س","Mad yo'q"],togri:1},
      {id:9,savol:"'AA' tovushi qaysi mad harfi orqali hosil bo'ladi?",variantlar:["ي","و","ا","ء"],togri:2},
      {id:10,savol:"Mad harflarining o'z harakati bormi?",variantlar:["Ha, fatha bor","Ha, kasra bor","Yo'q, ular sukunda bo'ladi","Ha, damma bor"],togri:2},
    ],
    mashq: [
      { ar: "بَاب", oq: "baab" },
      { ar: "كِتَاب", oq: "kitaab" },
      { ar: "دَار", oq: "daar" },
      { ar: "مَال", oq: "maal" },
      { ar: "جَار", oq: "jaar" },
      { ar: "نَار", oq: "naar" },
      { ar: "نُور", oq: "nuur" },
      { ar: "سُور", oq: "suur" },
      { ar: "دُور", oq: "duur" },
      { ar: "كُوز", oq: "kuuz" },
      { ar: "دِين", oq: "diin" },
      { ar: "كِيس", oq: "kiis" },
      { ar: "مِيز", oq: "miiz" },
      { ar: "بِيع", oq: "bii'" },
      { ar: "لِين", oq: "liin" },
      { ar: "زِيت", oq: "zayt" },
    ],
  },
  {
    id: 4,
    nomi: "Hamza Qoidasi",
    icon: "ء",
    color: "green",
    mavzu: `# Hamza Qoidasi

**Hamza** (ء) — arabchaning maxsus harfi. U tovush uzilishini bildiradi (glottal stop — xuddi "uh-oh" deyilganida bo'lgani kabi).

---

## 2 xil Hamza

### 1. Hamzatul Qat' (Ajratuvchi Hamza)
- **Doim o'qiladi** — so'z boshida, o'rtasida yoki oxirida
- Hech qachon tushirilmaydi
- Vaslda ham o'qiladi

### 2. Hamzatul Vasl (Ulovchi Hamza)
- **Faqat so'z boshida** bo'ladi
- Oldingi so'z bilan **biriktirilganda o'qilmaydi** (tushiriladi)
- Yolg'iz o'qilganda aytiladi

---

## Hamzaning 5 ta Shakli

| Shakl | Holat | Misol | O'qilishi |
|-------|-------|-------|-----------|
| أ | Fatha/damma bilan | أَب | ab (ota) |
| إ | Kasra bilan | إِسْم | ism (ot) |
| ؤ | و ustida | سُؤَال | suaal (savol) |
| ئ | ي ustida | بِئْر | bir (quduq) |
| ء | Mustaqil | جُزْء | juz' (qism) |

---

## Hamzatul Vasl Qayerda?

| Joyi | Misol |
|------|-------|
| اَلـ artikeli | اَلْكِتَاب — al-kitaab |
| Fe'l amri | اُكْتُب — uktub (yoz!) |
| Maxsus otlar | اِسْم — ism, اِبْن — ibn |

---

## Amaliy Qoida

- **Hamzatul Qat':** hech qachon tushirilmaydi → **doim o'qi**
- **Hamzatul Vasl:** avvalgi so'z unlisi bilan tugasa → **hamzani o'tkazib o'qi**`,
    vazifalar: [
      {id:1,savol:"Hamza qaysi tovushni ifodalaydi?",variantlar:["Uzun A tovushi","Tovush uzilishi (glottal stop)","Mad tovushi","G'unna tovushi"],togri:1},
      {id:2,savol:"Hamzatul Qat' vaslda (biriktirilganda) nima bo'ladi?",variantlar:["Tushiriladi","Doim o'qiladi","G'unna bo'ladi","Sukun oladi"],togri:1},
      {id:3,savol:"Hamzatul Vasl qayerda bo'ladi?",variantlar:["So'z o'rtasida","So'z oxirida","Faqat so'z boshida","Har joyda"],togri:2},
      {id:4,savol:"أَب so'zidagi hamza shakli qaysi?",variantlar:["ء (mustaqil)","ئ","ؤ","أ (alif ustida)"],togri:3},
      {id:5,savol:"سُؤَال so'zida hamza qaysi shaklda?",variantlar:["أ","إ","ؤ (waw ustida)","ء"],togri:2},
      {id:6,savol:"اَلْكِتَاب so'zidagi bosh hamza qaysi tur?",variantlar:["Hamzatul Qat'","Hamzatul Vasl","Alif mad","Hamza yo'q"],togri:1},
      {id:7,savol:"بِئْر so'zidagi hamza shaklini toping",variantlar:["أ","إ","ؤ","ئ (ya ustida)"],togri:3},
      {id:8,savol:"Hamzaning nechta shakli bor?",variantlar:["3 ta","4 ta","5 ta","6 ta"],togri:2},
      {id:9,savol:"إِسْم so'zidagi hamza shakli qaysi?",variantlar:["أ (fathali)","إ (kasrali)","ؤ","ء"],togri:1},
      {id:10,savol:"Hamzatul Vasl oldingi so'z unli bilan tugasa nima bo'ladi?",variantlar:["O'qiladi","O'tkazib o'qiladi (tushiriladi)","G'unna bo'ladi","Shaddah oladi"],togri:1},
    ],
    mashq: [
      { ar: "أَب", oq: "ab" },
      { ar: "أُم", oq: "um" },
      { ar: "أَكَلَ", oq: "akala" },
      { ar: "أَسَد", oq: "asad" },
      { ar: "إِبِل", oq: "ibil" },
      { ar: "أَمَل", oq: "amal" },
      { ar: "أَرْض", oq: "ard" },
      { ar: "أَنَا", oq: "anaa" },
      { ar: "أَخَذَ", oq: "axaza" },
      { ar: "إِصْبَع", oq: "isba'" },
      { ar: "سُؤَال", oq: "su'aal" },
      { ar: "رُؤْيَة", oq: "ru'ya" },
      { ar: "بِئْر", oq: "bi'r" },
      { ar: "جُزْء", oq: "juz'" },
      { ar: "شَيْء", oq: "shay'" },
      { ar: "يُؤْمِن", oq: "yu'min" },
    ],
  },
  {
    id: 5,
    nomi: "Vasl, Vaqf va Iltiqo Sakinayn",
    icon: "و",
    color: "lime",
    mavzu: `# Vasl, Vaqf va Iltiqo Sakinayn

---

## Vasl — Ulanib O'qish

**Vasl** — so'zlarni to'xtovsiz, uzluksiz biriktirb o'qish.

- Vasl paytida Hamzatul Vasl **o'qilmaydi** (tushiriladi)
- So'zlar orasida pauza qilinmaydi
- Misol: **وَلَدٌ وَبِنْتٌ** vasldа → "waladun-wabintun"

---

## Vaqf — To'xtab O'qish

**Vaqf** — so'z yoki jumladan so'ng to'xtash.

### Vaqf paytida so'z oxiri o'zgaradi:

| So'z oxiri | Vaqfda | Misol |
|-----------|--------|-------|
| Fatha ( َ ) | Sukun oladi | كَتَبَ → katab |
| Kasra ( ِ ) | Sukun oladi | كِتَابٍ → kitaab |
| Damma ( ُ ) | Sukun oladi | وَلَدٌ → walad |
| Tanvin Fath ( ً ) | **-a** saqlanadi | وَلَدًا → walada |
| Tanvin Kasr/Damm ( ٍ ٌ ) | Tushiriladi | كِتَابٍ → kitaab |

---

## Iltiqo Sakinayn — Ikki Sukun Uchrashishi

**Iltiqo Sakinayn** — ketma-ket ikki sukun harfi uchrashganda birinchisiga harakat beriladi.

**Odatda birinchi sukun harfiga kasra beriladi:**

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| قُلِ الْحَقَّ | quilil-haqqa | ل sukun + اَل → kasra qo'shildi |
| مِنَ الْبَيْت | minal-bayt | ن sukun + اَل → kasra qo'shildi |

---

## Xulosa

| Termin | Ma'nosi |
|--------|---------|
| Vasl | Uzluksiz biriktirb o'qish |
| Vaqf | To'xtab o'qish |
| Iltiqo Sakinayn | Ikki sukun uchrashishi |`,
    vazifalar: [
      {id:1,savol:"'Vasl' nima degani?",variantlar:["To'xtab o'qish","Uzluksiz biriktirb o'qish","Cho'zib o'qish","Harfni ikki marta o'qish"],togri:1},
      {id:2,savol:"Vasl paytida Hamzatul Vasl nima bo'ladi?",variantlar:["Kuchayadi","O'qilmaydi (tushiriladi)","G'unna bo'ladi","Shaddah oladi"],togri:1},
      {id:3,savol:"'Vaqf' nima?",variantlar:["Uzluksiz o'qish","To'xtab o'qish","Cho'zish","Singish"],togri:1},
      {id:4,savol:"Vaqf paytida so'z oxiridagi harakat nima bo'ladi?",variantlar:["Kuchayadi","Sukun oladi","Kasra bo'ladi","Fatha bo'ladi"],togri:1},
      {id:5,savol:"Tanvin Kasr ( ٍ ) vaqfda qanday o'qiladi?",variantlar:["-in saqlanadi","-i saqlanadi","Tushiriladi","G'unna bilan"],togri:2},
      {id:6,savol:"Tanvin Fath ( ً ) vaqfda qanday o'qiladi?",variantlar:["Tushiriladi","-a tovushi saqlanadi","-an saqlanadi","Sukun oladi"],togri:1},
      {id:7,savol:"'Iltiqo Sakinayn' nima degani?",variantlar:["Ikki fathaning uchrashishi","Ikki sukun harfining ketma-ket uchrashishi","Ikki mad harfining uchrashishi","Ikki hamzaning uchrashishi"],togri:1},
      {id:8,savol:"Ikki sukun uchrashganda birinchi sukunga odatda qaysi harakat beriladi?",variantlar:["Fatha","Damma","Kasra","Shaddah"],togri:2},
      {id:9,savol:"كِتَابٍ so'zi vaqfda qanday o'qiladi?",variantlar:["kitaabin","kitaabi","kitaab","kitaaban"],togri:2},
      {id:10,savol:"وَلَدًا so'zi vaqfda qanday o'qiladi?",variantlar:["waladan","walad","waladu","walada"],togri:3},
    ]
  },
  {
    id: 6,
    nomi: "Tanvin — AN, IN, UN",
    icon: "ً",
    color: "deep",
    mavzu: `# Tanvin — AN, IN, UN

**Tanvin** — so'z oxiridagi ikki nuqtali harakat belgisi. 3 xil tanvin bor.

---

## 3 xil Tanvin

| Nom | Belgi | Tovush | O'rni |
|-----|-------|--------|-------|
| **Tanvin Fath** | ً | **-AN** | Harfning ustida (ا bilan yoziladi) |
| **Tanvin Kasr** | ٍ | **-IN** | Harfning ostida |
| **Tanvin Damm** | ٌ | **-UN** | Harfning ustida (ikki و) |

---

## Misollar

| Arab | O'qilishi | Ma'nosi |
|------|-----------|---------|
| كِتَابٌ | kitaabun | kitob (noaniq) |
| وَلَدٌ | waladun | bola |
| بَيْتٌ | baytun | uy |
| كِتَابًا | kitaaban | kitobni |
| كِتَابٍ | kitaabin | kitobning |
| قَلَمٌ | qalamun | qalam |

---

## Tanvin Fath — Alif Qoidasi

Tanvin Fath ( ً ) ko'pincha **Alif** bilan birgalikda yoziladi:

- كِتَابًا ✓ (alif + tanvin fath)
- Istisno: **ة** va **ء** harflarida alif qo'shilmaydi

---

## Tanvin va Artikel

- Tanvin faqat **noaniq** so'zlarda bo'ladi
- **اَلـ** (al-) qo'shilsa tanvin yo'qoladi:

| Noaniq | Aniq |
|--------|------|
| كِتَابٌ (kitaabun) | اَلْكِتَابُ (al-kitaabu) |
| وَلَدٌ (waladun) | اَلْوَلَدُ (al-waladu) |`,
    vazifalar: [
      {id:1,savol:"Tanvin nima?",variantlar:["So'z o'rtasidagi ikki harakat","So'z oxiridagi ikki nuqtali harakat belgisi","Mad harfi","Sukun belgisi"],togri:1},
      {id:2,savol:"Nechta xil tanvin bor?",variantlar:["2 ta","3 ta","4 ta","5 ta"],togri:1},
      {id:3,savol:"Tanvin Fath qanday tovush beradi?",variantlar:["-IN","-UN","-AN","-AA"],togri:2},
      {id:4,savol:"Tanvin Kasr belgisi qayerda yoziladi?",variantlar:["Harfning ustida","Harfning ostida","Harfning o'ngida","Alif bilan"],togri:1},
      {id:5,savol:"كِتَابٌ so'zidagi tanvin qaysi xil?",variantlar:["Tanvin Fath","Tanvin Kasr","Tanvin Damm","Tanvin yo'q"],togri:2},
      {id:6,savol:"Tanvin Damm qanday o'qiladi?",variantlar:["-an","-in","-un","-aa"],togri:2},
      {id:7,savol:"وَلَدٌ so'zini to'g'ri o'qing",variantlar:["waladan","waladin","waladun","walad"],togri:2},
      {id:8,savol:"Tanvin Fath yozilganda ko'pincha qaysi harf qo'shiladi?",variantlar:["ي","و","ا (alif)","ء"],togri:2},
      {id:9,savol:"اَلـ qo'shilsa tanvin nima bo'ladi?",variantlar:["Kuchayadi","Yo'qoladi","G'unna bilan o'qiladi","Sukun oladi"],togri:1},
      {id:10,savol:"قَلَمٌ so'zini o'qing",variantlar:["qalaman","qalamin","qalamun","qalam"],togri:2},
    ],
    mashq: [
      { ar: "كِتَابٌ", oq: "kitaabun" },
      { ar: "كِتَابًا", oq: "kitaaban" },
      { ar: "كِتَابٍ", oq: "kitaabin" },
      { ar: "وَلَدٌ", oq: "waladun" },
      { ar: "وَلَدًا", oq: "waladan" },
      { ar: "وَلَدٍ", oq: "waladin" },
      { ar: "بَيْتٌ", oq: "baytun" },
      { ar: "بَيْتًا", oq: "baytan" },
      { ar: "بَيْتٍ", oq: "baytin" },
      { ar: "قَلَمٌ", oq: "qalamun" },
      { ar: "قَلَمًا", oq: "qalaman" },
      { ar: "قَلَمٍ", oq: "qalamin" },
      { ar: "رَجُلٌ", oq: "rajulun" },
      { ar: "رَجُلًا", oq: "rajulan" },
      { ar: "رَجُلٍ", oq: "rajulin" },
    ],
  },
  {
    id: 7,
    nomi: "Tashdid — Qo'shilgan Harf",
    icon: "ّ",
    color: "green",
    mavzu: `# Tashdid — Qo'shilgan Harf

**Tashdid** (ّ) — harfning ikki marta aytilishini bildiradi. Harfning ustida "W" shaklidagi belgi.

---

## Tashdid Nima?

Tashdid = bir harfning sukun + xuddi shu harf harakatli:

**مَّ = مْ + مَ** (sukun + fathali م)

Natijada harf:
1. Birinchi — **sukun bilan** (to'xtash)
2. Ikkinchi — **harakat bilan** (davom etish)

Umumiy effekt: **kuchli, uzaytirilgan** tovush

---

## Qanday O'qiladi?

- Tashdidli harfni aytganda **biroz to'xtang** (birinchi harf sukun)
- Keyin **harakatli** ikkinchi harfni davom ettiring
- Tashqaridan eshitganda: bir harf, lekin **kuchliroq va biroz uzunroq**

---

## Misollar

| Arab | O'qilishi | Tashdidli harf | Ma'nosi |
|------|-----------|--------------|---------|
| مُدَرِّس | mudarris | ر | o'qituvchi |
| أُمّ | umm | م | ona |
| سُكَّر | sukkar | ك | shakar |
| قُوَّة | quwwa | و | kuch |
| مَرَّ | marra | ر | o'tdi |

---

## Tashdid va Harakat

Tashdidli harfda harakat tashdid belgisining **ustida** yoziladi:

- مُدَرِّسٌ — mudarrisun (ر tashdidli, kasrali)
- أُمٌّ — ummun (م tashdidli, dammali)
- سُكَّرٌ — sukkarun (ك tashdidli, fathali)`,
    vazifalar: [
      {id:1,savol:"Tashdid belgisi qanday ko'rinadi?",variantlar:["Kichik doira (○)","'W' shaklidagi belgi","Ikki nuqta","Kichik chiziq"],togri:1},
      {id:2,savol:"Tashdid nima degani?",variantlar:["Harfni qisqartirish","Harfning ikki marta aytilishi","Mad qilish","Harfni tushirish"],togri:1},
      {id:3,savol:"Tashdidli harf aslida nechta harfning qo'shilishidan hosil bo'ladi?",variantlar:["2 ta (sukun + harakatli)","3 ta","4 ta","1 ta harf"],togri:0},
      {id:4,savol:"أُمّ so'zini to'g'ri o'qing",variantlar:["um","uma","umm","umu"],togri:2},
      {id:5,savol:"مُدَرِّس so'zida qaysi harf tashdidli?",variantlar:["م","د","ر","س"],togri:2},
      {id:6,savol:"Tashdidli harfni o'qiganda birinchi harf qanday bo'ladi?",variantlar:["Fathali","Kasrali","Sukun bilan (to'xtash)","Dammali"],togri:2},
      {id:7,savol:"سُكَّر so'zini o'qing",variantlar:["sukar","sukkar","sukkar","sakar"],togri:1},
      {id:8,savol:"Tashdid belgisi qayerda yoziladi?",variantlar:["Harfning ostida","Harfning o'ngida","Harfning ustida","Alif ustida"],togri:2},
      {id:9,savol:"مَرَّ so'zida tashdidli harf qaysi?",variantlar:["م","ا","ر","Tashdid yo'q"],togri:2},
      {id:10,savol:"قُوَّة so'zida tashdid qaysi harfda?",variantlar:["ق","و","ة","Mad harfida"],togri:1},
    ],
    mashq: [
      { ar: "أُمّ", oq: "umm" },
      { ar: "جَدّ", oq: "jadd" },
      { ar: "شَدّ", oq: "shadd" },
      { ar: "مَدّ", oq: "madd" },
      { ar: "فَنّ", oq: "fann" },
      { ar: "رَبّ", oq: "rabb" },
      { ar: "حَقّ", oq: "haqq" },
      { ar: "مَرَّ", oq: "marra" },
      { ar: "مُدَرِّس", oq: "mudarris" },
      { ar: "سُكَّر", oq: "sukkar" },
      { ar: "قُوَّة", oq: "quwwa" },
      { ar: "مُعَلِّم", oq: "mu'allim" },
      { ar: "مُصَوِّر", oq: "musawwir" },
      { ar: "تَقَدَّمَ", oq: "taqaddama" },
      { ar: "كَتَّبَ", oq: "kattaba" },
      { ar: "فَكَّرَ", oq: "fakkara" },
    ],
  },
  {
    id: 8,
    nomi: "Shamsiy va Qamariy Harflar",
    icon: "ش",
    color: "lime",
    mavzu: `# Shamsiy va Qamariy Harflar

Arab tilida **اَلـ** (al-) artikeli bor. Bu artikel undan keyingi harfning turiga qarab turlicha o'qiladi.

---

## 2 xil Harf Turi

### Shamsiy Harflar (14 ta)
**اَلـ** qo'shilganda — **ل o'qilmaydi**, keyingi harf tashdid bilan kuchayadi.

Shamsiy harflar: **ت ث د ذ ر ز س ش ص ض ط ظ ل ن**

Misollar:
- اَلشَّمْس → **ash**-shams (al + shams, lekin ل o'qilmaydi)
- اَلنَّجْم → **an**-najm (al + najm)
- اَلدَّرْس → **ad**-dars (al + dars)

### Qamariy Harflar (14 ta)
**اَلـ** qo'shilganda — **ل aniq o'qiladi**.

Qamariy harflar: **أ ب ج ح خ ع غ ف ق ك م و ه ي**

Misollar:
- اَلْقَمَر → **al**-qamar (ل to'liq o'qiladi)
- اَلْكِتَاب → **al**-kitaab
- اَلْبَيْت → **al**-bayt

---

## Qanday Eslab Qolish Kerak?

| Tur | Eslab qolish | ل holati |
|-----|-------------|---------|
| **Shamsiy** | شَمْس (quyosh) → ل yo'qoladi | O'qilmaydi |
| **Qamariy** | قَمَر (oy) → ل saqlanadi | O'qiladi |

---

## Misollar Jadvali

| Arab | O'qilishi | Turi |
|------|-----------|------|
| اَلشَّمْس | ash-shams | Shamsiy (ش) |
| اَلْقَمَر | al-qamar | Qamariy (ق) |
| اَلنَّجْم | an-najm | Shamsiy (ن) |
| اَلْبَيْت | al-bayt | Qamariy (ب) |
| اَلدَّرْس | ad-dars | Shamsiy (د) |
| اَلْكِتَاب | al-kitaab | Qamariy (ك) |`,
    vazifalar: [
      {id:1,savol:"Arab tilida 'al-' artikelining arabcha yozilishi qanday?",variantlar:["ال","الـ","اَلـ","اَل"],togri:2},
      {id:2,savol:"Shamsiy harflarda اَلـ ning ل i nima bo'ladi?",variantlar:["Aniq o'qiladi","O'qilmaydi, keyingi harf kuchayadi","G'unna bo'ladi","Sukun oladi"],togri:1},
      {id:3,savol:"اَلشَّمْس qanday o'qiladi?",variantlar:["al-shams","ash-shams","al-ash-shams","a-shams"],togri:1},
      {id:4,savol:"اَلْكِتَاب shamsiy yoki qamariyga kiradi?",variantlar:["Shamsiy — ل o'qilmaydi","Qamariy — ل o'qiladi","Ikkalasi ham","Hech biri"],togri:1},
      {id:5,savol:"اَلْقَمَر qanday o'qiladi?",variantlar:["aq-qamar","al-qamar","a-qamar","am-qamar"],togri:1},
      {id:6,savol:"Nechta shamsiy harf bor?",variantlar:["10 ta","12 ta","14 ta","16 ta"],togri:2},
      {id:7,savol:"ن harfi shamsiy yoki qamariy?",variantlar:["Qamariy","Shamsiy","Ikkalasi ham","Hech biri"],togri:1},
      {id:8,savol:"ك harfi shamsiy yoki qamariy?",variantlar:["Shamsiy","Qamariy","Ikkalasi ham","Hech biri"],togri:1},
      {id:9,savol:"Shamsiy harflarda keyingi harf qanday o'qiladi?",variantlar:["Sukun bilan","Tashdid bilan (kuchliroq)","G'unna bilan","O'qilmaydi"],togri:1},
      {id:10,savol:"اَلنَّجْم (yulduz) qanday o'qiladi?",variantlar:["al-najm","an-najm","a-najm","al-an-najm"],togri:1},
    ],
    mashq: [
      { ar: "اَلشَّمْس", oq: "ash-shams" },
      { ar: "اَلنَّجْم", oq: "an-najm" },
      { ar: "اَلرَّجُل", oq: "ar-rajul" },
      { ar: "اَلدَّرْس", oq: "ad-dars" },
      { ar: "اَلسَّمَاء", oq: "as-samaa'" },
      { ar: "اَلزَّمَان", oq: "az-zamaan" },
      { ar: "اَلتَّاج", oq: "at-taaj" },
      { ar: "اَلطِّين", oq: "at-tiin" },
      { ar: "اَلْقَمَر", oq: "al-qamar" },
      { ar: "اَلْكِتَاب", oq: "al-kitaab" },
      { ar: "اَلْبَيْت", oq: "al-bayt" },
      { ar: "اَلْعِلْم", oq: "al-'ilm" },
      { ar: "اَلْجَبَل", oq: "al-jabal" },
      { ar: "اَلْمَاء", oq: "al-maa'" },
      { ar: "اَلْوَلَد", oq: "al-walad" },
      { ar: "اَلْفَجْر", oq: "al-fajr" },
    ],
  },
  {
    id: 9,
    nomi: "Takroriy Dars — 1-8 Sharhi",
    icon: "↺",
    color: "deep",
    mavzu: `# Takroriy Dars — 1-8 Darslar Sharhi

Bu dars 1-8 darslardagi barcha mavzularni qisqacha takrorlaydi.

---

## 1-Dars: Arab Yozuviga Kirish
- **28 ta** harf, o'ngdan chapga
- Har harf **4 xil** ko'rinish: mustaqil, bosh, o'rta, oxir
- 6 ta faqat o'ng tomonga ulanadiganlar: **ا د ذ ر ز و**

---

## 2-Dars: 4 ta Harakat
| Harakat | Belgi | Tovush | O'rni |
|---------|-------|--------|-------|
| Fatha | َ | A | Ustida |
| Kasra | ِ | I | Ostida |
| Damma | ُ | U | Ustida (و) |
| Sukun | ْ | — | Ustida (○) |

---

## 3-Dars: Mad
- 3 mad harfi: **ا ي و**
- **Fatha → ا**, **Kasra → ي**, **Damma → و**
- Mad Tabiiy = **2 harakat**

---

## 4-Dars: Hamza
- **Hamzatul Qat'** — doim o'qiladi
- **Hamzatul Vasl** — vasldа tushiriladi
- 5 shakl: **أ إ ؤ ئ ء**

---

## 5-Dars: Vasl, Vaqf, Iltiqo Sakinayn
- **Vasl** — uzluksiz o'qish (Hamzatul Vasl tushadi)
- **Vaqf** — so'z oxiri sukun oladi; Tanvin Fath -a bo'ladi
- **Iltiqo Sakinayn** — ikki sukun uchrashganda kasra qo'shiladi

---

## 6-Dars: Tanvin
- **Tanvin Fath** ( ً ) → **-AN**
- **Tanvin Kasr** ( ٍ ) → **-IN**
- **Tanvin Damm** ( ٌ ) → **-UN**
- Faqat noaniq so'zlarda; اَلـ qo'shilsa yo'qoladi

---

## 7-Dars: Tashdid
- Harfning **ikki marta** aytilishi
- Sukun + harakatli xuddi shu harf
- Belgi: harfning ustida **W** shakli ( ّ )

---

## 8-Dars: Shamsiy va Qamariy
- **Shamsiy** (14 ta): ل o'qilmaydi, keyingi harf tashdid oladi
- **Qamariy** (14 ta): ل to'liq o'qiladi`,
    vazifalar: [
      {id:1,savol:"Arab alifbosida nechta harf bor?",variantlar:["24 ta","26 ta","28 ta","30 ta"],togri:2},
      {id:2,savol:"Fatha harakati qanday tovush beradi?",variantlar:["I","U","A","E"],togri:2},
      {id:3,savol:"Mad tabiiy necha harakat davom etadi?",variantlar:["1 harakat","2 harakat","4 harakat","6 harakat"],togri:1},
      {id:4,savol:"Hamzatul Qat' vaslda nima bo'ladi?",variantlar:["Tushiriladi","Doim o'qiladi","G'unna bo'ladi","Sukun oladi"],togri:1},
      {id:5,savol:"Vaqf paytida so'z oxiridagi harakat nima bo'ladi?",variantlar:["Fathaga aylanadi","Sukun oladi","Dammaga aylanadi","O'zgarmaydi"],togri:1},
      {id:6,savol:"Tanvin Damm qanday o'qiladi?",variantlar:["-an","-in","-un","-aa"],togri:2},
      {id:7,savol:"Tashdid belgisi nima uchun ishlatiladi?",variantlar:["Mad qilish uchun","Harfni ikki marta aytish uchun","Sukun berish uchun","G'unna uchun"],togri:1},
      {id:8,savol:"اَلشَّمْس qanday o'qiladi?",variantlar:["al-shams","ash-shams","a-shams","al-ash-shams"],togri:1},
      {id:9,savol:"ي mad harfi bo'lishi uchun oldida qaysi harakat turadi?",variantlar:["Fatha","Damma","Kasra","Sukun"],togri:2},
      {id:10,savol:"Shamsiy harflarda اَلـ ning ل i nima bo'ladi?",variantlar:["O'qiladi","O'qilmaydi","Shaddah oladi","Kasra oladi"],togri:1},
    ]
  },
  {
    id: 10,
    nomi: "Yakuniy Test — Fonetika 1",
    icon: "✓",
    color: "green",
    mavzu: `# Yakuniy Test — Fonetika 1

Bu test Fonetika 1 kursining **barcha mavzularini** tekshiradi.

---

## Test Haqida

| | |
|--|--|
| **Savollar soni** | 15 ta |
| **Mavzular** | 1-9 darslar |
| **Maqsad** | Bilimlarni mustahkamlash |

---

## Mavzular Bo'yicha Taqsimot

| Dars | Mavzu |
|------|-------|
| 1 | Arab yozuviga kirish (28 harf, 4 ko'rinish) |
| 2 | 4 ta harakat (Fatha, Kasra, Damma, Sukun) |
| 3 | Mad (3 mad harfi, Mad Tabiiy) |
| 4 | Hamza (Hamzatul Qat', Hamzatul Vasl) |
| 5 | Vasl, Vaqf, Iltiqo Sakinayn |
| 6 | Tanvin (-AN, -IN, -UN) |
| 7 | Tashdid |
| 8 | Shamsiy va Qamariy |

---

## Tayyor Bo'ldingizmi?

Barcha 8 darsni takrorlab chiqing va testni boshlang. Har bir savolga diqqat bilan javob bering!`,
    vazifalar: [
      {id:1,savol:"Arab alifbosida nechta harf bor va yozuv qaysi tomonga?",variantlar:["24 ta, chapdan o'ngga","28 ta, o'ngdan chapga","26 ta, o'ngdan chapga","30 ta, chapdan o'ngga"],togri:1},
      {id:2,savol:"Kasra belgisi qayerda yoziladi va qanday tovush beradi?",variantlar:["Ustida, A tovushi","Ostida, I tovushi","Ustida, U tovushi","Ostida, U tovushi"],togri:1},
      {id:3,savol:"كِتَاب so'zidagi mad harfi qaysi?",variantlar:["ك (kof)","ي (ya)","ا (alif)","ب (ba)"],togri:2},
      {id:4,savol:"Mad Tabiiy necha harakat cho'ziladi?",variantlar:["1 harakat","2 harakat","4 harakat","6 harakat"],togri:1},
      {id:5,savol:"Hamzatul Vasl biriktirilganda nima bo'ladi?",variantlar:["Kuchayadi","Tushiriladi (o'qilmaydi)","Shaddah oladi","G'unna bo'ladi"],togri:1},
      {id:6,savol:"Vaqf paytida Tanvin Fath ( ً ) qanday o'qiladi?",variantlar:["Tushiriladi","-an saqlanadi","-a tovushi saqlanadi","-in bo'ladi"],togri:2},
      {id:7,savol:"Tanvin Damm ( ٌ ) qanday tovush beradi?",variantlar:["-an","-in","-un","-aa"],togri:2},
      {id:8,savol:"Tashdid nima?",variantlar:["Harfni cho'zish","Harfni ikki marta aytish (sukun + harakatli)","Harfni tushirish","G'unna belgisi"],togri:1},
      {id:9,savol:"أُمّ so'zini to'g'ri o'qing",variantlar:["um","uma","umm","ummu"],togri:2},
      {id:10,savol:"اَلشَّمْس qanday o'qiladi? (ش shamsiy harf)",variantlar:["al-shams","ash-shams","a-shams","als-shams"],togri:1},
      {id:11,savol:"Iltiqo Sakinayn holida birinchi sukunga odatda qaysi harakat beriladi?",variantlar:["Fatha","Damma","Kasra","Shaddah"],togri:2},
      {id:12,savol:"Hamzaning nechtа shakli bor?",variantlar:["3 ta","4 ta","5 ta","6 ta"],togri:2},
      {id:13,savol:"و mad harfi bo'lishi uchun oldida qaysi harakat turishi kerak?",variantlar:["Fatha","Kasra","Damma","Sukun"],togri:2},
      {id:14,savol:"اَلْكِتَاب da ك qamariy harf — ل qanday o'qiladi?",variantlar:["O'qilmaydi","To'liq o'qiladi","Shaddah bilan","G'unna bilan"],togri:1},
      {id:15,savol:"Sukun belgisi harfga nima qiladi?",variantlar:["A tovushi beradi","I tovushi beradi","U tovushi beradi","Harfni tovushsiz qoldiradi"],togri:3},
    ]
  },
  {
    id: 11,
    nomi: "Mad Tabiiy (Asosiy Uzatma)",
    icon: "ا",
    color: "lime",
    mavzu: `# Mad Tabiiy — Asosiy Uzatma

**Mad** — tovushni cho'zish. **Mad Tabiiy** — tabiiy, asl uzatma. **2 harakat** davom etadi.

---

## Asosiy Qoida

Mad Tabiiy hosil bo'lishi uchun:
1. **Mad harfi** bo'lishi kerak (ا و ي)
2. Mad harfidan keyin **Hamza yo Sukun** bo'lmasligi kerak

---

## 3 xil Mad Tabiiy

| Mad harfi | Sharti | Tovush | Misol |
|-----------|--------|--------|-------|
| **ا** | Fathadan keyin | aa (2 hisob) | كِتَاب |
| **و** | Dammadan keyin | uu (2 hisob) | نُور |
| **ي** | Kasradan keyin | ii (2 hisob) | قِيل |

---

## Misollar

| Arab | O'qilishi | Mad harfi | Hisoblar |
|------|-----------|----------|---------|
| كِتَاب | kitaab | ا | 2 |
| نُور | nuur | و | 2 |
| دِين | diin | ي | 2 |
| دُخُول | duxul | و | 2 |
| كَمَال | kamaal | ا | 2 |
| نِظَام | nizaam | ا | 2 |

---

## 2 Harakat Nima?

**1 harakat** — bir qisqa tovushni aytish vaqti.
**2 harakat** — bir "ABA" ni aytish vaqti.

Amaliy: Barmog'ingizni qimirlatib hisoblang: بَا — 1, اَ — 2. Shu ikki hisob Mad Tabiiy.

---

## Mad Tabiiy EMAS — Qachon?

| Holat | Misal | Nomi |
|-------|-------|------|
| Mad + Hamza bitta so'zda | جَاءَ | Mad Wajib Muttasil |
| Mad + Hamza keyingi so'zda | قُلْ أُوحِيَ | Mad Ja'iz Munfasil |
| Mad + Sukun doimiy | الضَّالِّين | Mad Lazim |`,
    vazifalar: [
      {id:1,savol:"Mad Tabiiy necha harakat davom etadi?",variantlar:["1 harakat","2 harakat","4 harakat","6 harakat"],togri:1},
      {id:2,savol:"Mad Tabiiy hosil bo'lishi uchun mad harfidan keyin nima bo'lmasligi kerak?",variantlar:["Fatha yoki kasra","Hamza yoki doimiy sukun","Shaddah","G'unna"],togri:1},
      {id:3,savol:"كِتَاب so'zida mad harfi qaysi?",variantlar:["ك","ي","ا","ب"],togri:2},
      {id:4,savol:"ي (Ya) Mad Tabiiy bo'lishi uchun oldidagi harf nima olishi kerak?",variantlar:["Fatha","Damma","Kasra","Sukun"],togri:2},
      {id:5,savol:"نُور so'zida mad harfi qaysi va u nechta hisob cho'ziladi?",variantlar:["ن — 2 hisob","و — 2 hisob","ر — 2 hisob","و — 4 hisob"],togri:1},
      {id:6,savol:"Mad Tabiiy'ning boshqa nomi?",variantlar:["Mad Lazim","Mad Asli","Mad Wajib","Mad Badal"],togri:1},
      {id:7,savol:"Mad harflari nechtasi?",variantlar:["2 ta","3 ta","4 ta","5 ta"],togri:1},
      {id:8,savol:"جَاءَ so'zida mad qanday tur?",variantlar:["Mad Tabiiy","Mad Wajib Muttasil","Mad Lazim","Mad Badal"],togri:1},
      {id:9,savol:"دُخُول so'zida mad harfi qaysi?",variantlar:["د","خ","و","ل"],togri:2},
      {id:10,savol:"2 harakat necha vaqtga to'g'ri keladi?",variantlar:["1 qisqa tovush","2 qisqa tovush (barmog'ingiz 2 marta)","3 qisqa tovush","4 qisqa tovush"],togri:1},
    ]
  },
  {
    id: 12,
    nomi: "Mad Faro'iy (Kengaytirilgan Uzatmalar)",
    icon: "و",
    color: "deep",
    mavzu: `# Mad Faro'iy — Kengaytirilgan Uzatmalar

**Mad Faro'iy** — asosiy maddan kelib chiqadigan, kengaytirilgan uzatmalar. Hamza yoki sukun sabab cho'ziladi.

---

## 1 — Mad Wajib Muttasil — 4-5 harakat (Majburiy)

**Shart:** Mad harfi + Hamza **bitta so'zda**

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| جَاءَ | jaaa'a | ا + ء bitta so'zda |
| جِيءَ | jii'a | ي + ء bitta so'zda |
| سُوءَ | suu'a | و + ء bitta so'zda |
| مَاءَ | maa'a | ا + ء bitta so'zda |

**Hisoblar:** 4 yoki 5 harakat (ba'zi qiroatda farq bor).

---

## 2 — Mad Ja'iz Munfasil — 4-5 harakat (Ixtiyoriy)

**Shart:** Mad harfi + Hamza **keyingi so'zda**

| Arab | O'qilishi |
|------|-----------|
| إِنَّا أَعْطَيْنَاك | innaa a'taynaaak |
| قُلْ أُوحِيَ | qul uuhiya |

**Hisoblar:** 4 yoki 5 harakat (qisqartirish ham mumkin).

---

## 3 — Mad Lazim — 6 harakat (Majburiy, Kuchli)

**Shart:** Mad harfi + **Doimiy sukun** (so'z o'rtasida shaddah sukuni ham)

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| الضَّالِّين | adh-dhaalliiin | ا + ل shaddali sukun |
| حم | Haa-miim | Muqatta'at harflari |

**Hisoblar:** Majburiy **6 harakat**.

---

## 4 — Mad Arid Lissukun — 2, 4 yoki 6 harakat

**Shart:** Mad Tabiiy + to'xtalish (vaqf) sabab sukun kelib chiqsa

| Arab | O'qilishi (to'xtaganda) |
|------|------------------------|
| الصَّحِيح | as-sahiih (ii cho'ziladi) |
| الطَّرِيق | at-tariiq |

---

## 5 — Mad Badal — 2 harakat

**Shart:** Hamza + Mad harfi (asli birinchi harf Hamza edi)

| Arab | Asli | O'qilishi |
|------|------|-----------|
| آمَنَ | أَاْمَنَ | aamana |
| آلَة | أَاْلَة | aalat |

---

## 6 — Mad Lin — 2, 4 yoki 6 harakat

**Shart:** و yoki ي sukunda + oldingi harf fatha + to'xtalish

| Arab | O'qilishi |
|------|-----------|
| خَوْف | xawf (و sukunda, oldida fatha) |
| بَيْت | bayt (ي sukunda, oldida fatha) |`,
    vazifalar: [
      {id:1,savol:"Mad Wajib Muttasil necha harakat cho'ziladi?",variantlar:["2 harakat","4-5 harakat","6 harakat","1 harakat"],togri:1},
      {id:2,savol:"Mad Wajib Muttasil sharti nima?",variantlar:["Mad + Hamza keyingi so'zda","Mad + Hamza bitta so'zda","Mad + Sukun doimiy","Mad + Shaddah"],togri:1},
      {id:3,savol:"Mad Lazim necha harakat?",variantlar:["2","4","6","8"],togri:2},
      {id:4,savol:"Mad Lazimning sharti nima?",variantlar:["Mad + Hamza bitta so'zda","Mad + Doimiy sukun","Mad + To'xtalish","Mad + G'unna"],togri:1},
      {id:5,savol:"جَاءَ so'zida qaysi mad turi?",variantlar:["Mad Tabiiy","Mad Ja'iz Munfasil","Mad Wajib Muttasil","Mad Lazim"],togri:2},
      {id:6,savol:"Mad Badal qanday hosil bo'ladi?",variantlar:["Mad + Hamza bitta so'zda","Hamza + Mad harfi (asli Hamza)","Mad + Doimiy sukun","Mad + Lin"],togri:1},
      {id:7,savol:"Mad Arid Lissukun qachon bo'ladi?",variantlar:["Mad + Hamza","Mad + To'xtalish sabab sukun","Mad + Shaddah","Mad + G'unna"],togri:1},
      {id:8,savol:"Mad Ja'iz Munfasilda hamza qayerda?",variantlar:["Mad bilan bitta so'zda","Keyingi so'zda","Avvalgi so'zda","So'z o'rtasida"],togri:1},
      {id:9,savol:"آمَنَ so'zidagi mad qaysi tur?",variantlar:["Mad Tabiiy","Mad Wajib","Mad Lazim","Mad Badal"],togri:3},
      {id:10,savol:"Mad Lin sharti: و yoki ي sukunda va oldida...",variantlar:["Kasra","Damma","Fatha","Sukun"],togri:2},
    ]
  },
  {
    id: 13,
    nomi: "Shamsiyya va Qamariyya Harflari",
    icon: "ش",
    color: "green",
    mavzu: `# Shamsiyya va Qamariyya

**اَلـ** (AL-) — arab tilidagi aniqlik artikli ("the"). Undan keyin kelgan harfga qarab ikki xil o'qiladi.

---

## Asosiy Farq

| Tur | Qoida | Misol |
|-----|-------|-------|
| **Qamariyya** | ل aniq aytiladi | اَلْقَمَر → **al**-qamar |
| **Shamsiyya** | ل keyingi harfga singib ketadi + shaddah | اَلشَّمْس → **ash**-shams |

---

## QAMARIYYA — 14 ta harf

AL-dan keyin bu harflar kelsa, **ل** aniq aytiladi:

ا ب ج ح خ ع غ ف ق ك م و ه ي

**Yodlash:** "اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ"

| Arab | O'qilishi | Harf |
|------|-----------|------|
| اَلْكِتَابُ | **al**-kitaabu | ك — Qamariyya |
| اَلْحَمْدُ | **al**-hamdu | ح — Qamariyya |
| اَلْعَالَم | **al**-'aalam | ع — Qamariyya |
| اَلْيَوْم | **al**-yawm | ي — Qamariyya |

---

## SHAMSIYYA — 14 ta harf

AL-dan keyin bu harflar kelsa, **ل** SINGIB KETADI, keyingi harf shaddah oladi:

ت ث د ذ ر ز س ش ص ض ط ظ ل ن

**Yodlash:** "طِبْ ثُمَّ صِلْ رَحْمًا تَفُزْ ضِفْ ذَا نِعَم دَعْ سُوءَ ظَنٍّ زُرْ شَرِيفًا لِلْكَرَم"

| Arab | O'qilishi | Harf |
|------|-----------|------|
| اَلشَّمْس | **ash**-shams | ش — Shamsiyya |
| اَلنُّور | **an**-nuur | ن — Shamsiyya |
| اَلرَّحْمَن | **ar**-rahmaan | ر — Shamsiyya |
| اَلدِّين | **ad**-diin | د — Shamsiyya |

---

## Yozilishi va O'qilishi

Shamsiyya harflari **yozilishida** ل ko'rinadi, lekin **o'qilishida** aytilmaydi:

اَلسَّمَاء — yoziladi: al-samaa — o'qiladi: **as**-samaa (as-samaa'u)

---

## Misollar

| Arab | O'qilishi | Shamsiyya/Qamariyya |
|------|-----------|---------------------|
| اَللَّيْل | **al**-layl | ل — Shamsiyya (ل singadi) |
| اَلرَّبِيع | **ar**-rabii' | ر — Shamsiyya |
| اَلْبَيْت | **al**-bayt | ب — Qamariyya |`,
    vazifalar: [
      {id:1,savol:"Shamsiyya harfdan keyin AL-ning ل i nima bo'ladi?",variantlar:["Aniq aytiladi","Singib ketadi, shaddah hosil bo'ladi","Yo'qoladi","Ikki marta aytiladi"],togri:1},
      {id:2,savol:"Qamariyya harflari nechtasi?",variantlar:["10 ta","12 ta","14 ta","16 ta"],togri:2},
      {id:3,savol:"اَلشَّمْس qanday o'qiladi?",variantlar:["al-shams","ash-shams","al-ash-shams","a-shams"],togri:1},
      {id:4,savol:"ك (Kof) — Shamsiyya yoki Qamariyya?",variantlar:["Shamsiyya","Qamariyya","Ikkalasi ham","Hech biri"],togri:1},
      {id:5,savol:"ن (Nun) — Shamsiyya yoki Qamariyya?",variantlar:["Qamariyya","Shamsiyya","Ikkalasi ham","Hech biri"],togri:1},
      {id:6,savol:"اَلرَّبِيع qanday o'qiladi?",variantlar:["al-rabii'","ar-rabii'","al-ar-rabii'","a-rabii'"],togri:1},
      {id:7,savol:"اَلْكِتَابُ so'zida ل qanday o'qiladi?",variantlar:["Singib ketadi","Aniq aytiladi","Yo'qoladi","G'unna bilan"],togri:1},
      {id:8,savol:"Shamsiyya harflari nechtasi?",variantlar:["10 ta","12 ta","14 ta","16 ta"],togri:2},
      {id:9,savol:"اَلْبَيْت da ب Qamariyya bo'lgani uchun qanday o'qiladi?",variantlar:["ab-bayt","al-bayt","a-bayt","alb-bayt"],togri:1},
      {id:10,savol:"Shamsiyya harfidan keyin AL yozilsa shaddah qaysi harfda bo'ladi?",variantlar:["ل da","Keyingi harfda (Shamsiyya harfida)","Oldingi harfda","Shaddah bo'lmaydi"],togri:1},
    ]
  },
  {
    id: 14,
    nomi: "Qalqala",
    icon: "ق",
    color: "lime",
    mavzu: `# Qalqala — Aks-Sado

**Qalqala** — 5 ta maxsus harf **sukun**da bo'lganda ularning oxirida kuchli "aks-sado" (echo) eshitiladi.

---

## Qalqala Harflari — 5 ta

**ق ط ب ج د**

**Yodlash:** "قُطْبُ جَدٍّ" — bu 5 harf bir jumlada!

| Harf | Nomi | Mashhur misol |
|------|------|--------------|
| **ق** | Qof | قُلْ (qul) |
| **ط** | To | يَطْمَع (yatma') |
| **ب** | Ba | يَجْعَل (... بِ...) |
| **ج** | Jim | أَجِد (ajid) |
| **د** | Dal | أَحَد (ahad) |

---

## 3 ta Daraja

### 1 — Kichik Qalqala (So'z o'rtasida)

Harf sukun oladi va so'z davom etadi — **engil aks-sado**:

| Arab | O'qilishi | Qalqala |
|------|-----------|---------|
| يَجْعَل | yaj-'al | ج sukunda |
| يَطْمَع | yat-ma' | ط sukunda |
| أَقْطَر | aq-tar | ق sukunda |

### 2 — O'rta Qalqala (So'z oxiri, davom etsa)

So'z oxirida sukun va keyin so'z davom etsa — **o'rtacha aks-sado**:

| Arab | O'qilishi |
|------|-----------|
| وَلَمْ يَكُن (birikib) | ... yak-un... |

### 3 — Katta Qalqala (Vaqf — to'xtash)

To'xtaganda — **eng kuchli aks-sado**:

| Arab | O'qilishi |
|------|-----------|
| قُلْ | QUL (kuchli q) |
| أَحَد | AHA**D** |
| الصَّمَد | as-Sama**D** |

---

## Amaliy Qoida

To'xtaganda qalqala harfi **ikki marta eshitiladi** — bir marta to'xtab, bir marta "qaytib":

قُلْ → "qul...l" (oxiridagi ل kabi emas, ق qaytish bilan)

---

## Misol — Katta Qalqala (To'xtalish)

وَقَفَ الْوَلَد — **د** da katta qalqala
كَتَبَ الطَّالِب — **ب** da katta qalqala`,
    vazifalar: [
      {id:1,savol:"Qalqala harflari nechtasi?",variantlar:["3 ta","4 ta","5 ta","6 ta"],togri:2},
      {id:2,savol:"Qalqala harflari qaysilar?",variantlar:["ز س ص","ق ط ب ج د","ح خ ع غ","ن م ل ر"],togri:1},
      {id:3,savol:"'قُطْبُ جَدٍّ' nima uchun ishlatiladi?",variantlar:["Halq harflari uchun","Qalqala harflarini yodlash uchun","Shamsiyya harflar uchun","Mad harflari uchun"],togri:1},
      {id:4,savol:"Katta qalqala qachon bo'ladi?",variantlar:["So'z o'rtasida","So'z oxirida davom etsa","To'xtalish (vaqf) paytida","Shaddah bo'lganda"],togri:2},
      {id:5,savol:"قُلْ so'zida qaysi harf qalqala qiladi?",variantlar:["و","ل","ق","Hech biri"],togri:2},
      {id:6,savol:"Kichik qalqala qachon bo'ladi?",variantlar:["To'xtalish paytida","So'z o'rtasida sukun bo'lganda","So'z oxirida","Shaddah bo'lganda"],togri:1},
      {id:7,savol:"Qalqala qaysi holatda hosil bo'ladi?",variantlar:["Harf fatha olganda","Harf sukun olganda","Harf kasra olganda","Harf shaddah olganda"],togri:1},
      {id:8,savol:"أَحَد so'zida qalqala qaysi harfda?",variantlar:["أ","ح","ه","د"],togri:3},
      {id:9,savol:"Qalqala darajalari nechtasi?",variantlar:["2 ta","3 ta","4 ta","5 ta"],togri:1},
      {id:10,savol:"يَجْعَل so'zida ج sukunda — bu qaysi daraja qalqala?",variantlar:["Katta","O'rta","Kichik","Qalqala yo'q"],togri:2},
    ]
  },
  {
    id: 15,
    nomi: "Nun Sakin: Izhor va Idg'om",
    icon: "ن",
    color: "deep",
    mavzu: `# Nun Sakin va Tanvin — Izhor va Idg'om

**Nun Sakin** ( نْ ) va **Tanvin** ( ً ٍ ٌ ) — keyingi harfga qarab 4 xil o'qiladi.

---

## 4 ta Qoida (Umumiy)

| Qoida | Harflar | Xususiyat |
|-------|---------|-----------|
| **Izhor** | ء ه ع ح غ خ | Aniq n |
| **Idg'om** | ي ن م و / ل ر | Singib ketadi |
| **Iqlab** | ب | m ga aylanadi |
| **Ixfo** | 15 harf | Yashirinadi |

---

## 1 — إِظْهَار (Izhor) — Aniq Talaffuz

**Shart:** نْ yoki Tanvindan keyin **6 Halq harfi** kelsa.

Harflar: **ء ه ع ح غ خ**

ن aniq, to'liq aytiladi — **G'unna yo'q**.

| Arab | O'qilishi | Halq harfi |
|------|-----------|-----------|
| مَنْ أَرَادَ | man araada | ء (Hamza) |
| مِنْ هَادٍ | min haadin | ه |
| مَنْ عَمِلَ | man 'amila | ع |
| أَنْحَاء | anhaa' | ح |
| مِنْ غَيْر | min ghayr | غ |
| مِنْ خَارِج | min khaarij | خ |

**Yodlash (Halq harflari):** ء ه ع ح غ خ

---

## 2 — إِدْغَام (Idg'om) — Singib Ketish

نْ yoki Tanvin keyingi harfga **singib ketadi**.

### Idg'om bilan G'unna — 4 harf: ي ن م و
G'unna **2 harakat** davom etadi:

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| مِنْ يَوْم | miY-Yawm | ن → ي ga singidi + g'unna |
| مِنْ نِعَم | miN-Ni'am | ن ن → bitta ن + g'unna |
| مِنْ مَال | miM-Maal | ن → م ga singidi + g'unna |
| مِنْ وَلِي | miW-Walii | ن → و ga singidi + g'unna |

### Idg'om G'unnasiz — 2 harf: ل ر
G'unna **yo'q**, to'liq singish:

| Arab | O'qilishi |
|------|-----------|
| مِنْ لَدُن | milLadun |
| مِنْ رَبِّ | miRRabbi |

**Istisnolar:** Bitta so'zda نْ + و/ي bo'lsa Idg'om bo'lmaydi: بُنْيَان, قِنْوَان

---

## Izhor va Idg'om Farqi

| | Izhor | Idg'om |
|--|-------|--------|
| Harflar | Halq 6 ta | ي ن م و ل ر |
| ن | Aniq | Singib ketadi |
| G'unna | Yo'q | Bor (ي ن م و da) |`,
    vazifalar: [
      {id:1,savol:"Izhor qachon qo'llanadi?",variantlar:["Nun sakindan keyin Shamsiyya harfi kelsa","Nun sakindan keyin Halq harfi kelsa","Nun sakindan keyin ب kelsa","Nun sakindan keyin ي kelsa"],togri:1},
      {id:2,savol:"Izhor harflari nechtasi?",variantlar:["4 ta","5 ta","6 ta","7 ta"],togri:2},
      {id:3,savol:"Izhor'da g'unna bormi?",variantlar:["Ha, 2 hisob","Ha, 4 hisob","Yo'q","Faqat ba'zida"],togri:2},
      {id:4,savol:"Idg'om bilan g'unna — 4 harf qaysilar?",variantlar:["ء ه ع ح","ي ن م و","ل ر ن م","ت ث د ذ"],togri:1},
      {id:5,savol:"مِنْ يَوْم qanday o'qiladi?",variantlar:["min yawm","miy-yawm (g'unna bilan)","miyl yawm","min-yawm"],togri:1},
      {id:6,savol:"Idg'om g'unnasiz qaysi harflarda?",variantlar:["ي و","ل ر","ن م","ب ت"],togri:1},
      {id:7,savol:"مِنْ رَبِّ qanday o'qiladi?",variantlar:["min rabbi","mir-rabbi (g'unnasiz)","ming rabbi","minr rabbi"],togri:1},
      {id:8,savol:"مَنْ عَمِلَ da ع kelganligi uchun qaysi qoida?",variantlar:["Idg'om","Iqlab","Ixfo","Izhor"],togri:3},
      {id:9,savol:"Idg'om g'unna necha harakat davom etadi?",variantlar:["1","2","3","4"],togri:1},
      {id:10,savol:"بُنْيَان so'zida ن + ي — Idg'om bo'ladimi?",variantlar:["Ha, doim","Yo'q, bitta so'zda Idg'om bo'lmaydi","Faqat to'xtaganda","Har doim bo'ladi"],togri:1},
    ]
  },
  {
    id: 16,
    nomi: "Nun Sakin: Iqlab va Ixfo",
    icon: "ب",
    color: "green",
    mavzu: `# Nun Sakin va Tanvin — Iqlab va Ixfo

---

## 3 — إِقْلَاب (Iqlab) — Almashtirish

**Shart:** نْ yoki Tanvindan keyin **faqat ب** kelsa.

ن → **م** ga aylanadi + **G'unna 2 harakat**

| Arab | Asl | O'qilishi |
|------|-----|-----------|
| مِنْ بَعْدِ | min ba'di | mim-ba'di |
| أَنْبِيَاء | anbiyaa' | ambiyaa' |
| سَمِيعٌ بَصِير | samii'un basiir | samii'um-basiir |

**Belgi:** Ba'zi Mus'haflarda ن ustida kichik م ko'rinadi.

**Faqat 1 harf:** ب — boshqa hech qaysi harfda Iqlab bo'lmaydi.

---

## 4 — إِخْفَاء (Ixfo) — Yashirish

**Shart:** نْ yoki Tanvindan keyin **15 harf**dan biri kelsa.

ن yarim yashirinadi — **G'unna 2 harakat** (Izhor ham emas, Idg'om ham emas).

### 15 ta Ixfo harfi:

ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك

**Yodlash:** "صِفْ ذَا ثَنَا كَمْ جَادَ شَخْصٌ قَدْ سَمَا دُمْ طَيِّبًا زِدْ فِي تُقَى ضَعْ ظَالِمًا"

| Arab | O'qilishi | Ixfo harfi |
|------|-----------|-----------|
| مِنْ تَوْبَة | min tawba → nt'awba | ت |
| مَنْ جَاءَ | man jaa'a → nj... | ج |
| أَنْقَضَ | anqada → nq... | ق |
| مِنْ سَلَام | min salaam → ns... | س |

---

## Ixfo Darajalari

| Daraja | Harflar | Sabab |
|--------|---------|-------|
| Eng kuchli (iqlobga yaqin) | ت ث د ذ ظ | Lison harflari, yaqin maxraj |
| O'rtacha | ج س ش ص ض ط ف | O'rta masofada |
| Eng yengil (izhorga yaqin) | ق ك | Uzoq maxraj |

---

## 4 Qoida — Umumiy Jadvali

| Qoida | Harf | G'unna | ن holati |
|-------|------|--------|---------|
| Izhor | 6 halq | Yo'q | Aniq |
| Idg'om (g'unnali) | ي ن م و | 2 hisob | Singadi |
| Idg'om (g'unnasiz) | ل ر | Yo'q | Singadi |
| Iqlab | ب | 2 hisob | م ga aylanadi |
| Ixfo | 15 harf | 2 hisob | Yarim yashirinadi |`,
    vazifalar: [
      {id:1,savol:"Iqlab faqat qaysi harfdan oldin bo'ladi?",variantlar:["ت","م","ب","ف"],togri:2},
      {id:2,savol:"Iqlab'da ن qaysi harfga aylanadi?",variantlar:["ل","ر","م","و"],togri:2},
      {id:3,savol:"Iqlab'da g'unna necha harakat?",variantlar:["1","2","3","4"],togri:1},
      {id:4,savol:"مِنْ بَعْدِ qanday o'qiladi?",variantlar:["min ba'di","mim-ba'di (g'unna bilan)","min-ba'di","mib ba'di"],togri:1},
      {id:5,savol:"Ixfo harflari nechtasi?",variantlar:["10 ta","12 ta","15 ta","18 ta"],togri:2},
      {id:6,savol:"Ixfo'da ن qanday holda?",variantlar:["To'liq aniq","To'liq singib ketadi","Yarim yashirinadi + g'unna","m ga aylanadi"],togri:2},
      {id:7,savol:"مِنْ تَوْبَة da qaysi qoida qo'llanadi?",variantlar:["Izhor","Idg'om","Iqlab","Ixfo"],togri:3},
      {id:8,savol:"Nun sakin qoidalari nechtasi?",variantlar:["2 ta","3 ta","4 ta","5 ta"],togri:2},
      {id:9,savol:"Ixfo'da g'unna necha harakat?",variantlar:["1","2","3","4"],togri:1},
      {id:10,savol:"أَنْبِيَاء so'zida qaysi qoida?",variantlar:["Izhor","Idg'om","Iqlab","Ixfo"],togri:2},
    ]
  },
  {
    id: 17,
    nomi: "Hamzatul Vasl va Hamzatul Qat'",
    icon: "ء",
    color: "lime",
    mavzu: `# Hamzatul Vasl va Hamzatul Qat'

Arab yozuvida **ikki xil** Hamza mavjud. Ular farqli qoidalarga ega.

---

## 1 — هَمْزَةُ الْقَطْع (Hamzatul Qat') — Kesuvchi Hamza

**Har doim aytiladi** — so'z boshida ham, o'rtasida ham.

### Ko'rinishlari:

| Belgi | Holat | Misol |
|-------|-------|-------|
| أ | Fatha/damma bilan | أَكَلَ (akala) |
| إ | Kasra bilan | إِبْرَة (ibra) |
| ؤ | O'rtada damma | يُؤْمِن (yu'min) |
| ئ | O'rtada kasra | بِئْر (bi'r) |
| ء | So'z oxirida | شَيْء (shay') |

### Misollar:

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| أَكَلَ | akala | Hamzatul Qat' — boshi |
| إِنْسَان | insaan | Hamzatul Qat' — boshi |
| يُؤْمِن | yu'minu | Hamzatul Qat' — o'rta |
| قِرَاءَة | qiraa'a | Hamzatul Qat' — o'rta |

---

## 2 — هَمْزَةُ الْوَصْل (Hamzatul Vasl) — Bog'lovchi Hamza

**Faqat so'z boshida** bo'ladi. **Biriktirilganda aytilmaydi.**

### Qayerda uchraydi?

| Holat | Misollar |
|-------|---------|
| اَلـ (artikl) | اَلْكِتَاب, اَلرَّحِيم |
| Triliteral (3 harfli) fe'l amri | اِذْهَب, اِكْتُب |
| Heptahedral (7 harfli) fe'l | اِسْتَغْفَرَ |
| Maxsus otlar | اِسْم, اِبْن, اِمْرَأَة |

### O'qilish qoidasi (yolg'iz bo'lganda):

| Holat | Harakat |
|-------|---------|
| Asli kasra bo'lsa | Kasra bilan boshlang |
| Asli damma bo'lsa | Damma bilan boshlang |
| اَلـ | Fatha bilan (a-l) |

### Biriktirilganda — Tushadi:

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| قُلِ اسْمَهُ | qulis-mahu | اِسْم da Hamzatul Vasl tushdi |
| وَالنَّاس | wan-naas | وَ dan keyin ا tushdi |
| قُلِ اسْمَهُ | qulis-mahu | ل + اِسْم — a tushdi, kasra qoldi |

---

## Farq Jadvali

| | Hamzatul Qat' | Hamzatul Vasl |
|--|--------------|--------------|
| Doim aytiladi | Ha | Faqat boshida |
| Biriktirilganda | Ha, aytiladi | Tushib ketadi |
| Ko'rinish | أ إ ؤ ئ ء | ٱ yoki oddiy ا |`,
    vazifalar: [
      {id:1,savol:"Hamzatul Qat' biriktirilganda nima bo'ladi?",variantlar:["Tushib ketadi","Har doim aytiladi","G'unna bo'ladi","Sukun oladi"],togri:1},
      {id:2,savol:"Hamzatul Vasl biriktirilganda nima bo'ladi?",variantlar:["Har doim aytiladi","Tushib ketadi","Shaddah oladi","Tanvin oladi"],togri:1},
      {id:3,savol:"إِبْرَة so'zidagi bosh hamza qaysi tur?",variantlar:["Hamzatul Vasl","Hamzatul Qat'","Alif Layyina","Ta Marbuta"],togri:1},
      {id:4,savol:"اَلْكِتَاب so'zidagi bosh hamza qaysi tur?",variantlar:["Hamzatul Qat'","Hamzatul Vasl","Alif Layyina","Hamza yo'q"],togri:1},
      {id:5,savol:"قُلِ اسْمَهُ da اِسْم ning boshi qanday o'qiladi?",variantlar:["is-mahu","qulis-mahu (tushadi)","qul-ismahu","i-smahu"],togri:1},
      {id:6,savol:"أَكَلَ so'zidagi hamza qaysi tur?",variantlar:["Hamzatul Vasl","Hamzatul Qat'","Ta Marbuta","Alif Layyina"],togri:1},
      {id:7,savol:"Hamzatul Vasl qayerda topiladi?",variantlar:["So'z o'rtasi va oxirida","Faqat so'z boshida","Istalgan joyda","Faqat so'z oxirida"],togri:1},
      {id:8,savol:"يُؤْمِن so'zidagi و ustidagi hamza qaysi tur?",variantlar:["Hamzatul Vasl","Hamzatul Qat'","Alif Mad","G'unna"],togri:1},
      {id:9,savol:"اِبْن so'zi yolg'iz bo'lganda qanday boshlanadi?",variantlar:["Fatha bilan (ab-n)","Kasra bilan (ib-n)","Damma bilan (ub-n)","Sukun bilan"],togri:1},
      {id:10,savol:"Hamzatul Qat' va Hamzatul Vasl farqi:",variantlar:["Farqi yo'q","Qat' doim aytiladi, Vasl biriktirilganda tushadi","Vasl doim aytiladi, Qat' tushadi","Ikkalasi ham doim tushadi"],togri:1},
    ],
    mashq: [
      { ar: "اِذْهَب", oq: "izhab" },
      { ar: "اِكْتُب", oq: "uktub" },
      { ar: "اِسْم", oq: "ism" },
      { ar: "اِبْن", oq: "ibn" },
      { ar: "اِنْطَلَق", oq: "intalaq" },
      { ar: "اِمْرَأَة", oq: "imra'a" },
      { ar: "اَلْكِتَاب", oq: "al-kitaab" },
      { ar: "اَلْعِلْم", oq: "al-'ilm" },
      { ar: "أَكَلَ", oq: "akala" },
      { ar: "إِنْسَان", oq: "insaan" },
      { ar: "أَمَل", oq: "amal" },
      { ar: "يُؤْمِن", oq: "yu'min" },
      { ar: "أَرْض", oq: "ard" },
      { ar: "بِئْر", oq: "bi'r" },
      { ar: "شَيْء", oq: "shay'" },
      { ar: "جُزْء", oq: "juz'" },
    ],
  },
  {
    id: 18,
    nomi: "Tafxim va Tarqiq — Ra Harfi",
    icon: "ر",
    color: "deep",
    mavzu: `# Tafxim va Tarqiq

**Tafxim** — qalin, "og'ir" talaffuz. **Tarqiq** — ingichka, "yengil" talaffuz.

---

## RA HARFI (ر) — Eng Muhim Harf

ر harfi **doim** Tafxim yoki Tarqiq bilan o'qiladi. Qoida aniq.

---

## ر TAFXIM — Qalin o'qiladi

| Shart | Misol | Izoh |
|-------|-------|------|
| ر fatha olsa | دَرَسَ | Ra fatha — qalin |
| ر damma olsa | رُجُوع | Ra damma — qalin |
| ر sukunda, oldida fatha | مَرْكَز | ر sukun, م fatha |
| ر sukunda, oldida damma | بُرْهَان | ر sukun, ب damma |
| ر sukunda, oldida Isti'lo harfi | قِرْطَاس | ر sukun, oldin ق |
| ر so'z boshida, fatha/damma | رَحْمَة, رُسُل | Bosh Ra |

---

## ر TARQIQ — Ingichka o'qiladi

| Shart | Misol | Izoh |
|-------|-------|------|
| ر kasra olsa | رِجَال | Ra kasra — ingichka |
| ر sukunda, oldida kasra | فِرْعَوْن | ر sukun, ف kasra |
| ر oldida ي (ya) sukunda bo'lsa | في ظِلِّهَا | ي dan keyin ر |

---

## Tarqiq/Tafxim Uchun Isti'lo Qoidasi

Agar ر sukunda va oldida kasra bo'lsa, lekin kasradan ham oldin **Isti'lo harfi** bo'lsa — **tafxim**:

**Misol:** قِرْطَاس — ق Isti'lo, keyin kasra, keyin ر sukun → TAFXIM

---

## UMUMIY — Isti'lo Harflari Doim Tafxim

Isti'lo 7 harfi: **خ ص ض ط ظ غ ق** — DOIM qalin talaffuz:

| Arab | O'qilishi | Tafxim |
|------|-----------|--------|
| صَبَاح | sabaah | ص qalin |
| طَرِيق | tariiq | ط qalin |
| ظُلْم | zulm | ظ qalin |
| غَفُور | ghafuur | غ qalin |

---

## Ra va Waqf (To'xtash)

To'xtaganda ر ga sukun tushadi. Oldingi harakatga qarab:
- Oldida fatha/damma → **Tafxim**
- Oldida kasra → **Tarqiq**`,
    vazifalar: [
      {id:1,savol:"Tafxim nima ma'noni anglatadi?",variantlar:["Ingichka talaffuz","Qalin, og'ir talaffuz","Sukun berish","G'unna qilish"],togri:1},
      {id:2,savol:"ر fatha olganda qanday o'qiladi?",variantlar:["Tarqiq (ingichka)","Tafxim (qalin)","G'unna bilan","Qalqala bilan"],togri:1},
      {id:3,savol:"ر kasra olganda qanday o'qiladi?",variantlar:["Tafxim","Tarqiq","G'unna bilan","Qalqala bilan"],togri:1},
      {id:4,savol:"فِرْعَوْن so'zida ر qanday o'qiladi?",variantlar:["Tafxim — ra damma bor","Tarqiq — oldida kasra bor","G'unna bilan","Qalqala bilan"],togri:1},
      {id:5,savol:"Isti'lo harflari doim qanday talaffuz etiladi?",variantlar:["Tarqiq","Tafxim","G'unna","Qalqala"],togri:1},
      {id:6,savol:"Isti'lo harflari nechtasi?",variantlar:["5 ta","6 ta","7 ta","8 ta"],togri:2},
      {id:7,savol:"دَرَسَ so'zida ر qanday o'qiladi?",variantlar:["Tarqiq — kasra yaqin","Tafxim — ra fatha","G'unna","Qalqala"],togri:1},
      {id:8,savol:"قِرْطَاس da ر sukunda, oldida kasra — lekin qanday o'qiladi?",variantlar:["Tarqiq — kasra bor","Tafxim — ق Isti'lo harfi bor","G'unna","Qalqala"],togri:1},
      {id:9,savol:"صَبَاح so'zida ص harfi qanday sifatga ega?",variantlar:["Tarqiq","Tafxim","G'unna","Lin"],togri:1},
      {id:10,savol:"بُرْهَان da ر sukunda, oldida ب damma — qanday?",variantlar:["Tarqiq — damma yo'q","Tafxim — oldida damma","G'unna","Qalqala"],togri:1},
    ]
  },
  {
    id: 19,
    nomi: "Vaqf va Vasl — To'xtash va Ulanish",
    icon: "و",
    color: "green",
    mavzu: `# Vaqf va Vasl

**Vaqf** — to'xtash. **Vasl** — ulanib o'qish. Arab tilini o'qishda bular juda muhim.

---

## VAQF — To'xtash Qoidalari

To'xtaganda so'z oxiri o'zgaradi:

| So'z oxiri | To'xtaganda | Misol |
|-----------|------------|-------|
| Harakat (fatha/kasra/damma) | Sukun | كِتَابٌ → كِتَاب |
| Tanvin Fath ( ً ) | Faqat "aa" | وَلَدًا → وَلَدا |
| Tanvin Kasr/Damm | Sukun (tanvin tushadi) | كِتَابٍ → كِتَاب |
| Ta Marbuta (ة) | h yoki a | رَحْمَةٌ → رَحْمَة/رَحْمَه |

---

## VAQF BELGILARI (Arab Yozuvida)

| Belgi | Nomi | Ma'nosi |
|-------|------|---------|
| **م** | Lazim | Albatta to'xta |
| **ط** | Mutlaq | To'xtash ma'qul |
| **ج** | Ja'iz | To'xtash mumkin |
| **ز** | Mujawwaz | Davom etish ma'qul |
| **لا** | Mamnua' | To'xtama! |
| **ص** | Muraxxas | Majburan davom et |
| **∴** | Muanaqah | Ikki joydan birida to'xta |

---

## VASL — Ulanib O'qish

Hamzatul Vasl bo'lgan so'zdan oldin ulanib o'qilsa:

| Holat | Qoida |
|-------|-------|
| Oldingi so'z fatha/kasra/damma | Hamzatul Vasl tushadi |
| Oldingi so'z sukun | Kasra qo'shiladi |

**Misol:**
قُلِ اسْمَهُ — قُل + اِسْم → qul + ism → qulis-mahu
(ل sukun + اِسْم → kasra qo'shildi: قُلِ)

---

## To'xtash Turlari

| Tur | Ta'rif |
|-----|--------|
| Vaqf Taam | To'liq to'xtash — ma'no tugagan |
| Vaqf Kaafi | Yetarli to'xtash — ma'no nisbatan tugagan |
| Vaqf Hasan | Yaxshi to'xtash — gap to'liq |
| Vaqf Qabiih | Yomon to'xtash — ma'no buziladi |

---

## Amaliy Misollar

| Arab | Vaqf (to'xtaganda) | Vasl (davom etsa) |
|------|------------------|-----------------|
| اَلصَّحِيحِ | as-sahiih (h sukun) | as-sahiihi (h kasra) |
| وَلَدًا | waladaa | waladan |
| مُعَلِّمُ الصَّفِّ | mu'allimu-ssaff | ... |`,
    vazifalar: [
      {id:1,savol:"Vaqf nima?",variantlar:["Ulanib o'qish","To'xtash","Cho'zish","Singish"],togri:1},
      {id:2,savol:"To'xtaganda Tanvin Fath ( ً ) qanday o'qiladi?",variantlar:["Yo'qoladi","Faqat 'aa' qoladi","'an' bo'lib qoladi","'un' bo'ladi"],togri:1},
      {id:3,savol:"Lazim belgisi ( م ) nimani bildiradi?",variantlar:["To'xtash taqiqlangan","Albatta to'xta","To'xtash mumkin","Davom etish ma'qul"],togri:1},
      {id:4,savol:"لا belgisi nimani bildiradi?",variantlar:["To'xta","To'xtama (davom et)","Ikki joydan birida to'xta","To'xtash mumkin"],togri:1},
      {id:5,savol:"To'xtaganda فَتَحَ so'zining ə oxiri qanday?",variantlar:["Fatha qoladi","Sukun oladi","Kasra oladi","Tanvin oladi"],togri:1},
      {id:6,savol:"رَحْمَةٌ so'zi to'xtaganda qanday o'qiladi?",variantlar:["rahmatun","rahmat yoki rahmah","rahmataa","rahman"],togri:1},
      {id:7,savol:"Vaqf Qabiih nima?",variantlar:["To'liq to'xtash","Yaxshi to'xtash","Ma'noni buzadigan to'xtash","Zarur to'xtash"],togri:2},
      {id:8,savol:"Vasl holida Hamzatul Vasl nima bo'ladi?",variantlar:["Kuchayadi","Tushib ketadi","Shaddah oladi","G'unna bilan aytiladi"],togri:1},
      {id:9,savol:"∴ (Muanaqah) belgisi nimani bildiradi?",variantlar:["Albatta to'xta","Ikki joydan faqat birida to'xta","To'xtama","Cho'zib o'qi"],togri:1},
      {id:10,savol:"قُلِ اسْمَهُ da ل sukun + اِسْم — qanday o'qiladi?",variantlar:["qul-ismahu","qulis-mahu (kasra qo'shildi)","qula-smahu","quil-ismahu"],togri:1},
    ],
    mashq: [
      { ar: "رَحْمَة", oq: "rahma(t)" },
      { ar: "مَدْرَسَة", oq: "madrasa(t)" },
      { ar: "مَدِينَة", oq: "madiina(t)" },
      { ar: "دَوْلَة", oq: "dawla(t)" },
      { ar: "سَيَّارَة", oq: "sayyaara(t)" },
      { ar: "طَاوِلَة", oq: "taawila(t)" },
      { ar: "خَرِيطَة", oq: "xariita(t)" },
      { ar: "حَقِيبَة", oq: "haqiiba(t)" },
      { ar: "كُرَة", oq: "kura(t)" },
      { ar: "مَكْتَبَة", oq: "maktaba(t)" },
      { ar: "صُورَة", oq: "suura(t)" },
      { ar: "قِصَّة", oq: "qissa(t)" },
      { ar: "حَضَارَة", oq: "hadaara(t)" },
      { ar: "سَاعَة", oq: "saa'a(t)" },
      { ar: "مَرْحَلَة", oq: "marhala(t)" },
      { ar: "جُمْلَة", oq: "jumla(t)" },
    ],
  },
  {
    id: 20,
    nomi: "Iltiqo Sakinayn va Yakuniy Takror",
    icon: "ع",
    color: "lime",
    mavzu: `# Iltiqo Sakinayn va Yakuniy Takror

## ILTIQO SAKINAYN — Ikki Sukun Uchrashishi

**Iltiqo Sakinayn** — birinchi so'z sukun bilan tugab, ikkinchi so'z Hamzatul Vasl bilan boshlanganda hosil bo'ladigan holat.

---

## Asosiy Qoida

Birinchi so'z oxiri sukun + keyingi so'z Hamzatul Vasl → **Qisqa harakat qo'shiladi** (odatda kasra).

| Arab | O'qilishi | Qoida |
|------|-----------|-------|
| قُلِ الْحَقَّ | quLIl-haqq | ل sukun + اَلـ → kasra qo'shildi |
| مَنِ اسْتَطَاعَ | maNIs-tataa'a | ن sukun → kasra |
| بَلِ الْإِنسَان | bALIl-insaan | ل sukun → kasra |

---

## Maxsus Holat — Damma

Ba'zi so'zlarda kasra o'rniga **damma** qo'shiladi:

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| وَجَلَسَتِ الطِّفْلَةُ | wa-jalasatit-tiflatu | ت → kasra (odatiy) |
| مِنَ الْبَيْت | minalbayt | ن → kasra |

---

## YAKUNIY TAKROR — 20 Darsdan Asosiylar

### Blok 1 — Arab Yozuvi va Harakatlar
| Mavzu | Asosiy |
|-------|--------|
| 28 harf | O'ngdan chapga, 4 ko'rinish |
| 4 harakat | Fatha (a), Kasra (i), Damma (u), Sukun |
| Tanvin | -an, -in, -un (noaniq) |
| Shaddah | Ikki marta, g'unna (ن م) |
| Maxsus harflar | ة , ى , ٱ |

### Blok 2 — Maxraj (5 ta)
| Maxraj | Harflar |
|--------|---------|
| Jawf | ا و ي (mad) |
| Halq | ء ه ع ح غ خ |
| Lison | 18 harf |
| Shafatayn | ب م و ف |
| Xayshum | G'unna |

### Blok 3 — Sifat (17 ta)
5 juft: Jahr/Hams, Shadid/Raxv, Isti'lo/Istifol, Itboq/Infitoh, Izloq/Ishmoq
7 mustaqil: Safir, Lin, Inhiraf, Takrir, Tafashi, Istitoyla, G'unna

### Blok 4 — Mad
| Mad turi | Hisoblar |
|----------|---------|
| Tabiiy | 2 |
| Wajib Muttasil | 4-5 |
| Ja'iz Munfasil | 4-5 |
| Lazim | 6 |
| Arid Lissukun | 2/4/6 |

### Blok 5 — Tajwid
- Shamsiyya (14) va Qamariyya (14)
- Qalqala: ق ط ب ج د — 3 daraja
- Nun Sakin: Izhor, Idg'om, Iqlab, Ixfo
- Tafxim va Tarqiq (Ra qoidalari)

### Blok 6 — Vaqf va Ulanish
- Vaqf belgilari: م ط ج ز لا ∴
- Hamzatul Vasl vs Hamzatul Qat'
- Iltiqo Sakinayn — kasra/damma qo'shish`,
    vazifalar: [
      {id:1,savol:"Iltiqo Sakinayn nima?",variantlar:["Ikki fathaning uchrashishi","Birinchi so'z sukun + keyingi so'z Hamzatul Vasl","Ikki g'unnaning uchrashishi","Ikki shaddahning uchrashishi"],togri:1},
      {id:2,savol:"قُلِ الْحَقَّ da ل ga kasra qo'shilishining sababi?",variantlar:["ل harfining harakati","Iltiqo Sakinayn — ل sukun + اَلـ","Shamsiyya qoidasi","Qalqala qoidasi"],togri:1},
      {id:3,savol:"Nun Sakin qoidalari nechtasi?",variantlar:["2 ta","3 ta","4 ta","5 ta"],togri:2},
      {id:4,savol:"Mad Lazim necha harakat cho'ziladi?",variantlar:["2","4","6","8"],togri:2},
      {id:5,savol:"Qalqala harflari qaysilar?",variantlar:["ح خ ع غ","ق ط ب ج د","ز س ص","ن م ل ر"],togri:1},
      {id:6,savol:"Shamsiyya harflari nechtasi?",variantlar:["10 ta","12 ta","14 ta","16 ta"],togri:2},
      {id:7,savol:"Iqlab faqat qaysi harfdan oldin?",variantlar:["ت","م","ب","ف"],togri:2},
      {id:8,savol:"Hamzatul Vasl biriktirilganda nima bo'ladi?",variantlar:["Kuchayadi","Tushib ketadi","Shaddah oladi","G'unna bo'ladi"],togri:1},
      {id:9,savol:"G'unna necha harakat davom etadi?",variantlar:["1","2","3","4"],togri:1},
      {id:10,savol:"Arab alifbosida nechta harf bor va yozuv qaysi tomonga?",variantlar:["24 ta, chapdan o'ngga","26 ta, o'ngdan chapga","28 ta, o'ngdan chapga","30 ta, chapdan o'ngga"],togri:2},
    ]
  },

  // ── B1 ───────────────────────────────────────────────────────────────

  {
    id: 21,
    nomi: "Arabcha Ismlar — Jins va Son",
    icon: "🏷",
    color: "blue",
    mavzu: `# Arabcha Ismlar — Jins va Son

## Jins (Muzakkar va Muannash)

Arab tilida har bir ism **muzakkar** (erkak) yoki **muannash** (ayol) jinsiga tegishli:

| Jins | Ta'rif | Misollar |
|------|--------|---------|
| Muzakkar | Erkak | وَلَد (bola), كِتَاب (kitob), بَيْت (uy) |
| Muannash | Ayol/Muannash | بِنْت (qiz), مَدْرَسَة (maktab), شَمْس (quyosh) |

---

## Muannash Belgilari

| Belgi | Nomi | Misol | Izoh |
|-------|------|-------|------|
| **ة** | Ta-marbuta | مُعَلِّمَة | Ko'p ismga qo'shiladi |
| **ـَاء** | Alif-mamduda | حَمْرَاء (qizil) | Ko'pincha sifatlarda |
| **ـَى** | Alif-maqsura | سَلْمَى | Ko'proq ismlarda |

**Tabiiy muannash** — belgisiz, yod olish kerak:
أُمّ (ona) · أَرْض (yer) · شَمْس (quyosh) · يَد (qo'l) · عَيْن (ko'z)

---

## Son Turlari

| Son | Ta'rif | Muzakkar | Muannash |
|-----|--------|---------|---------|
| Mufrad | Bitta | كِتَاب | مَدْرَسَة |
| Saniyya (raf') | Ikkita | كِتَابَان | مَدْرَسَتَان |
| Saniyya (nasb/jarr) | Ikkita | كِتَابَيْن | مَدْرَسَتَيْن |
| Jam' salim (muz.) | Ko'p | مُعَلِّمُون/مُعَلِّمِين | — |
| Jam' salim (muan.) | Ko'p | — | مُعَلِّمَات |

---

## Jam' Taksir — Ichki O'zgarish

O'zakda ichki o'zgarish bo'ladi, yod olish kerak:

| Mufrad | Jam' Taksir | Ma'no |
|--------|------------|-------|
| كِتَاب | كُتُب | kitob |
| بَيْت | بُيُوت | uy |
| وَلَد | أَوْلَاد | bola |
| رَجُل | رِجَال | erkak kishi |
| مَدِينَة | مُدُن | shahar |

---

## Xulosa Jadvali

| Holat | Raf' | Nasb | Jarr |
|-------|------|------|------|
| Mufrad naqira | -ٌ | -ً | -ٍ |
| Mufrad ma'rifa | -ُ | -َ | -ِ |
| Saniyya | -ان | -ين | -ين |
| Jam' muzakkar salim | -ون | -ين | -ين |
| Jam' muannash salim | -اتٌ | -اتٍ | -اتٍ |`,
    vazifalar: [
      {id:1,savol:"Arab tilida ism necha jinsga bo'linadi?",variantlar:["1 ta","2 ta","3 ta","4 ta"],togri:1},
      {id:2,savol:"Ta-marbuta (ة) qaysi jinsni bildiradi?",variantlar:["Muzakkar","Muannash","Har ikkisi","Hech biri"],togri:1},
      {id:3,savol:"مُعَلِّمَة so'zining ma'nosi?",variantlar:["O'quvchi-o'g'il","O'qituvchi-erkak","O'qituvchi-ayol","Maktab"],togri:2},
      {id:4,savol:"Saniyya (juft son) raf' qo'shimchasi qaysi?",variantlar:["-ات","-ان","-ون","-ين"],togri:1},
      {id:5,savol:"Jam' Taksir — eng to'g'ri ta'rif?",variantlar:["Faqat qo'shimcha qo'shiladi","O'zak ichki strukturasi o'zgaradi","Faqat muannash uchun","Faqat saniyya"],togri:1},
      {id:6,savol:"كِتَاب so'zining jam' taksiri?",variantlar:["كِتَابَات","كِتَابُون","كُتُب","كِتَابَان"],togri:2},
      {id:7,savol:"شَمْس (quyosh) — qaysi muannash turi?",variantlar:["Ta-marbuta muannash","Alif-maqsura muannash","Tabiiy muannash","Muzakkar"],togri:2},
      {id:8,savol:"Jam' muzakkar salim nasb holati qo'shimchasi?",variantlar:["-ون","-ان","-ين","-ات"],togri:2},
      {id:9,savol:"وَلَد so'zining jam' taksiri?",variantlar:["وَلَدَان","وَلَدَات","وُلُود","أَوْلَاد"],togri:3},
      {id:10,savol:"مَدْرَسَتَيْن — qaysi holat?",variantlar:["Mufrad raf'","Saniyya raf'","Saniyya nasb/jarr","Jam' salim"],togri:2},
    ]
  },

  {
    id: 22,
    nomi: "Shaxs Olmoshlari",
    icon: "👤",
    color: "indigo",
    mavzu: `# Shaxs Olmoshlari

## Alohida (Munfasil) Olmoshlar

Alohida qo'llaniladigan olmoshlar — odatda mubtada sifatida:

### Mufrad (Yagona)

| Shaxs | Arab | O'zbekcha |
|-------|------|---------|
| 1-shaxs | أَنَا | Men |
| 2-shaxs erkak | أَنْتَ | Sen (erkak) |
| 2-shaxs ayol | أَنْتِ | Sen (ayol) |
| 3-shaxs erkak | هُوَ | U (erkak) |
| 3-shaxs ayol | هِيَ | U (ayol) |

### Ko'plik (Jam')

| Shaxs | Arab | O'zbekcha |
|-------|------|---------|
| 1-shaxs | نَحْنُ | Biz |
| 2-shaxs muzakkar | أَنْتُمْ | Siz/Sizlar (erkak) |
| 2-shaxs muannash | أَنْتُنَّ | Siz/Sizlar (ayol) |
| 3-shaxs muzakkar | هُمْ | Ular (erkak) |
| 3-shaxs muannash | هُنَّ | Ular (ayol) |

---

## Birikkan (Muttasil) Olmoshlar

Ism yoki fe'lga birikib keladi:

| Olmosh | Ism bilan | Fe'l bilan | Ma'no |
|--------|-----------|----------|-------|
| ـي | كِتَابِي | أَعْطَانِي | Mening/Menga |
| ـكَ | كِتَابُكَ | أَعْطَاكَ | Sening/Senga (erkak) |
| ـكِ | كِتَابُكِ | أَعْطَاكِ | Sening/Senga (ayol) |
| ـهُ | كِتَابُهُ | أَعْطَاهُ | Uning/Unga (erkak) |
| ـهَا | كِتَابُهَا | أَعْطَاهَا | Uning/Unga (ayol) |
| ـنَا | كِتَابُنَا | أَعْطَانَا | Bizning/Bizga |
| ـكُمْ | كِتَابُكُمْ | أَعْطَاكُمْ | Sizlarning (erkak) |
| ـهُمْ | كِتَابُهُمْ | أَعْطَاهُمْ | Ularning (erkak) |

---

## Ismliy Gapda Olmosh

Olmosh mubtada sifatida:
- أَنَا طَالِبٌ — Men talabaman (erkak)
- هِيَ مُعَلِّمَةٌ — U o'qituvchi (ayol)
- هُمْ مُهَنْدِسُونَ — Ular muhandislar

---

## Ajratish Olmoshlari (Damirut Tafasul)

Xabar va sifat orasida turadi, aniqlov uchun:

هُوَ الْمُدِيرُ الْكَبِيرُ — U katta direktor (u aynan o'sha katta direktor)`,
    vazifalar: [
      {id:1,savol:"'Men' arabcha olmoshi?",variantlar:["أَنْتَ","نَحْنُ","أَنَا","هُوَ"],togri:2},
      {id:2,savol:"هِيَ olmoshi qaysi shaxsni bildiradi?",variantlar:["1-shaxs erkak","2-shaxs ayol","3-shaxs ayol","3-shaxs erkak"],togri:2},
      {id:3,savol:"نَحْنُ — qaysi son?",variantlar:["Mufrad","Saniyya","Jam'","Muannash"],togri:2},
      {id:4,savol:"كِتَابُهُ — bu yerda ـهُ nima bildiradi?",variantlar:["Mening kitobim","Sening kitobing","Uning kitobi (erkak)","Uning kitobi (ayol)"],togri:2},
      {id:5,savol:"'Biz' arabcha olmoshi?",variantlar:["هُمْ","أَنْتُمْ","نَحْنُ","هِيَ"],togri:2},
      {id:6,savol:"أَنْتِ — qaysi shaxs?",variantlar:["1-shaxs erkak","2-shaxs erkak","2-shaxs ayol","3-shaxs"],togri:2},
      {id:7,savol:"كِتَابِي — bu olmosh nima bildiradi?",variantlar:["Senga","Menga/Mening","Unga","Bizga"],togri:1},
      {id:8,savol:"هُمْ — kim uchun ishlatiladi?",variantlar:["Bitta erkak","Bitta ayol","Ko'p erkaklar","Ko'p ayollar"],togri:2},
      {id:9,savol:"أَنَا طَالِبٌ jumlasida أَنَا qanday vazifa bajaradi?",variantlar:["Xabar","Mubtada","Sifat","Fe'l"],togri:1},
      {id:10,savol:"ـنَا birikkan olmoshi qaysi shaxsni bildiradi?",variantlar:["1-shaxs yagona","2-shaxs erkak","1-shaxs ko'plik (biz)","3-shaxs ko'plik"],togri:2},
    ]
  },

  {
    id: 23,
    nomi: "Jumlah Ismiyya — Ismliy Gap",
    icon: "📝",
    color: "teal",
    mavzu: `# Jumlah Ismiyya — Ismliy Gap

## Tuzilishi

Ismliy gap ikki asosiy bo'lakdan iborat:

| Bo'lak | Arab | Ta'rif | Misol |
|--------|------|--------|-------|
| **Mubtada** | مُبْتَدَأ | Ega (aniq ism) | اَلطَّالِبُ (talaba) |
| **Xabar** | خَبَر | Kesim | مُجْتَهِدٌ (tirishqoq) |

**Misol:** اَلطَّالِبُ مُجْتَهِدٌ — Talaba tirishqoq.

---

## Ma'rifa va Naqira

| Tur | Belgisi | Misol | Ma'no |
|-----|---------|-------|-------|
| **Ma'rifa** (aniq) | اَلـ | اَلْكِتَابُ | U kitob (ma'lum) |
| **Naqira** (noaniq) | Tanvin (-ٌ/-ً/-ٍ) | كِتَابٌ | Bir kitob |

**Qoida:** Mubtada odatda ma'rifa (aniq); xabar odatda naqira (noaniq).

---

## Xabar Turlari

### 1. Ism-Xabar

اَلْبَيْتُ كَبِيرٌ — Uy katta.
اَلطَّقْسُ جَمِيلٌ — Ob-havo yoqimli.

### 2. Zarf-Xabar (Xabar Zarf)

اَلْكِتَابُ عَلَى الطَّاوِلَةِ — Kitob stolda.
اَلْوَلَدُ فِي الْبَيْتِ — Bola uyda.

### 3. Jumlah-Xabar (Gap-Kesim)

اَلرَّجُلُ أَبُوهُ مُعَلِّمٌ — Erkakning otasi o'qituvchi.

---

## Kelishuv Qoidasi

Mubtada va xabar jins va sonda mos kelishi kerak:

| Mubtada | Xabar | Jumlat |
|---------|-------|--------|
| Muzakkar mufrad | Muzakkar mufrad | اَلطَّالِبُ ذَكِيٌّ |
| Muannash mufrad | Muannash mufrad | اَلطَّالِبَةُ ذَكِيَّةٌ |
| Jam' muzakkar | Jam' muzakkar | اَلطُّلَّابُ ذَكِيُّونَ |

---

## Inkor: لَيْسَ

لَيْسَ — "emas" ma'nosini beradi, mubtadani raf', xabari nasb bo'ladi:

لَيْسَ الطَّقْسُ بَارِدًا — Ob-havo sovuq emas.
لَيْسَتِ الْمَدِينَةُ بَعِيدَةً — Shahar uzoqda emas.`,
    vazifalar: [
      {id:1,savol:"Ismliy gapning ikki asosiy bo'lagi?",variantlar:["Fe'l va hol","Mubtada va xabar","Ism va sifat","Fa'il va maf'ul"],togri:1},
      {id:2,savol:"اَلطَّالِبُ مُجْتَهِدٌ jumlasida mubtada?",variantlar:["مُجْتَهِدٌ","اَلطَّالِبُ","Ikkalasi","Hech biri"],togri:1},
      {id:3,savol:"Ma'rifa belgisi qaysi?",variantlar:["Tanvin","اَلـ","Ta-marbuta","Shaddah"],togri:1},
      {id:4,savol:"كِتَابٌ — ma'rifa yoki naqira?",variantlar:["Ma'rifa","Naqira","Har ikkisi","Aniqlab bo'lmaydi"],togri:1},
      {id:5,savol:"'Kitob stolda' — qaysi xabar turi?",variantlar:["Ism-xabar","Zarf-xabar","Jumlah-xabar","Sifat-xabar"],togri:1},
      {id:6,savol:"لَيْسَ nima ma'noni bildiradi?",variantlar:["Ha, bor","Emas","Bor","Yo'q"],togri:1},
      {id:7,savol:"لَيْسَ dan keyingi xabar qaysi holda bo'ladi?",variantlar:["Raf'","Nasb","Jarr","Jazm"],togri:1},
      {id:8,savol:"اَلْبَيْتُ كَبِيرٌ jumlasida xabar?",variantlar:["اَلـ","اَلْبَيْتُ","كَبِيرٌ","بَيْت"],togri:2},
      {id:9,savol:"Muannash mubtadoga qaysi xabar to'g'ri kelishadi?",variantlar:["Muzakkar mufrad xabar","Muannash mufrad xabar","Jam' taksir","Ikkisi ham to'g'ri"],togri:1},
      {id:10,savol:"اَلطَّالِبَةُ ذَكِيَّةٌ jumlasida nima to'g'ri?",variantlar:["Muzakkar mubtada + muzakkar xabar","Muannash mubtada + muannash xabar","Muzakkar mubtada + muannash xabar","Kelishuv noto'g'ri"],togri:1},
    ]
  },

  // ── B2 ───────────────────────────────────────────────────────────────

  {
    id: 24,
    nomi: "Fe'lning Maazi Zamoni — O'tgan Zamon",
    icon: "🕐",
    color: "orange",
    mavzu: `# Fe'lning Maazi Zamoni — O'tgan Zamon

## Asosiy Vazn: فَعَلَ

O'tgan zamon fe'li asosiy ko'rinishi **3-shaxs erkak mufrad** — bu fe'lning lug'aviy shakli:

كَتَبَ — yozdi, ذَهَبَ — ketdi, قَرَأَ — o'qidi, جَلَسَ — o'tirdi

---

## Shaxslarga Ko'ra O'zgarish Jadvali

| Shaxs | Arab | Translit | O'zbekcha |
|-------|------|----------|---------|
| 3.m. yagona | كَتَبَ | kataba | U yozdi (erkak) |
| 3.f. yagona | كَتَبَتْ | katabat | U yozdi (ayol) |
| 3.m. juft | كَتَبَا | katabaa | Ikkalasi yozdi (erkak) |
| 3.f. juft | كَتَبَتَا | katabataa | Ikkalasi yozdi (ayol) |
| 3.m. ko'p | كَتَبُوا | katabuu | Ular yozdi (erkak) |
| 3.f. ko'p | كَتَبْنَ | katabna | Ular yozdi (ayol) |
| 2.m. yagona | كَتَبْتَ | katabta | Sen yozding (erkak) |
| 2.f. yagona | كَتَبْتِ | katab-ti | Sen yozding (ayol) |
| 2.m. juft | كَتَبْتُمَا | katabtumaa | Ikkalingiz yozdingiz |
| 2.m. ko'p | كَتَبْتُمْ | katabtum | Siz yozdingiz (erkak) |
| 2.f. ko'p | كَتَبْتُنَّ | katabtunna | Siz yozdingiz (ayol) |
| 1. yagona | كَتَبْتُ | katabtu | Men yozdim |
| 1. ko'plik | كَتَبْنَا | katabnaa | Biz yozdik |

---

## Inkor: مَا + Fe'l

مَا كَتَبَ — U yozmadi.
مَا ذَهَبَتْ — U (ayol) ketmadi.
مَا قَرَأْنَا — Biz o'qimadik.

---

## Amaliy Misollar

| Arab | O'zbekcha |
|------|---------|
| ذَهَبَ الْوَلَدُ إِلَى الْمَدْرَسَةِ | Bola maktabga ketdi. |
| كَتَبَتِ الطَّالِبَةُ الدَّرْسَ | Talaba qiz darsni yozdi. |
| قَرَأْنَا الْكِتَابَ | Biz kitobni o'qidik. |
| مَا فَهِمُوا السُّؤَالَ | Ular savolni tushunishmadi. |

---

## Harakatlar Qoidasi

- 3-shaxs erkak va ayol o'rtasida faqat **ـتْ** qo'shimchasi farq qiladi
- 1-shaxs qo'shimchasi **ـتُ** (sukun emas, damma)
- Ko'plik erkak qo'shimchasi **ـُوا** (alif yoziladi lekin o'qilmaydi)`,
    vazifalar: [
      {id:1,savol:"كَتَبَ fe'lining asosiy ma'nosi?",variantlar:["O'qidi","Yozdi","Bordi","Tushundi"],togri:1},
      {id:2,savol:"3-shaxs ayol mufrad maazi qo'shimchasi?",variantlar:["ـنَ","ـتُمْ","ـتْ","ـوا"],togri:2},
      {id:3,savol:"كَتَبُوا — qaysi shaxs?",variantlar:["3-shaxs mufrad erkak","3-shaxs ko'plik erkak","2-shaxs ko'plik","1-shaxs ko'plik"],togri:1},
      {id:4,savol:"Maazida inkor qanday hosil bo'ladi?",variantlar:["لَا + fe'l","مَا + fe'l","لَمْ + fe'l","لَنْ + fe'l"],togri:1},
      {id:5,savol:"كَتَبْتُ — qaysi shaxs?",variantlar:["3-shaxs erkak","2-shaxs erkak","1-shaxs mufrad","1-shaxs ko'plik"],togri:2},
      {id:6,savol:"كَتَبَتْ va كَتَبَ o'rtasidagi farq?",variantlar:["Son farqi","Zamon farqi","Jins farqi (ـتْ ayol)","Inkor farqi"],togri:2},
      {id:7,savol:"كَتَبْنَا — 'Biz yozdik' — qaysi shaxs?",variantlar:["3-shaxs ko'plik","2-shaxs ko'plik","1-shaxs ko'plik","1-shaxs mufrad"],togri:2},
      {id:8,savol:"مَا ذَهَبَ — ma'nosi?",variantlar:["U ketdi","U ketmadi","U ketadimi?","U ketsin"],togri:1},
      {id:9,savol:"Lug'aviy forma — 3-shaxs erkak mufrad maazi — nimaga asoslangan?",variantlar:["1-shaxs ko'plik","3-shaxs ayol","3-shaxs erkak mufrad","2-shaxs erkak"],togri:2},
      {id:10,savol:"كَتَبْتُمْ — qaysi shaxs?",variantlar:["2-shaxs erkak mufrad","2-shaxs erkak ko'plik","3-shaxs erkak ko'plik","1-shaxs ko'plik"],togri:1},
    ]
  },

  {
    id: 25,
    nomi: "Fe'lning Muzori' Zamoni — Hozirgi/Kelasi Zamon",
    icon: "⚡",
    color: "cyan",
    mavzu: `# Fe'lning Muzori' Zamoni — Hozirgi/Kelasi Zamon

## Asosiy Vazn: يَفْعَلُ

Muzori' fe'li **muda-ra'a harflari** (أ، ن، ي، ت) bilan boshlanadi:

| Harf | Shaxs | Misol |
|------|-------|-------|
| يـ | 3-shaxs erkak | يَكْتُبُ (yozmoqda) |
| تـ | 3-shaxs ayol / 2-shaxs | تَكْتُبُ |
| أـ | 1-shaxs mufrad | أَكْتُبُ |
| نـ | 1-shaxs ko'plik | نَكْتُبُ |

---

## To'liq Conjugatsiya Jadvali (كَتَبَ/يَكْتُبُ)

| Shaxs | Muzori' | Ma'no |
|-------|---------|-------|
| 3.m. mufrad | يَكْتُبُ | U yozmoqda/Yozadi |
| 3.f. mufrad | تَكْتُبُ | U (ayol) yozmoqda |
| 3.m. juft | يَكْتُبَانِ | Ikkalasi yozmoqda |
| 3.m. ko'p | يَكْتُبُونَ | Ular yozmoqda |
| 2.m. mufrad | تَكْتُبُ | Sen yozmoqdasan |
| 2.f. mufrad | تَكْتُبِينَ | Sen (ayol) yozmoqdasan |
| 2.m. ko'p | تَكْتُبُونَ | Siz yozmoqdasiz |
| 1. mufrad | أَكْتُبُ | Men yozmoqdaman |
| 1. ko'plik | نَكْتُبُ | Biz yozmoqdamiz |

---

## Inkor Yuklаmalari

| Yuklama | Ma'no | Fe'l holati | Misol |
|---------|-------|------------|-------|
| لَا | Yozmaydi (odatiy) | Raf' (rafe') | لَا يَكْتُبُ |
| لَمْ | Yozmadi (o'tgan inkor) | Jazm | لَمْ يَكْتُبْ |
| لَنْ | Yozmaydi (kelajak inkor) | Nasb | لَنْ يَكْتُبَ |

---

## Maqsad Konstruksiyasi

Fe'ldan maqsad bildirish uchun:
- **لِ + Muzori' (jazm):** لِيَكْتُبَ — U yozishi uchun
- **حَتَّى + Muzori' (nasb):** يَذْهَبُ حَتَّى يَتَعَلَّمَ — O'rganish uchun boradi
- **كَيْ + Muzori' (nasb):** جَاءَ كَيْ يَرَى — Ko'rish uchun keldi

---

## Misollar

| Arab | O'zbekcha |
|------|---------|
| يَذْهَبُ الْوَلَدُ إِلَى الْمَدْرَسَةِ | Bola maktabga bormoqda. |
| لَا تَكْتُبِينَ بِسُرْعَةٍ | Sen (ayol) tez yozmaysan. |
| لَمْ يَفْهَمْ | U tushunmadi. |
| لَنْ نَذْهَبَ | Biz bormayapmiz (kelajak). |`,
    vazifalar: [
      {id:1,savol:"Muzori' fe'l qanday harflar bilan boshlanadi?",variantlar:["ف، ع، ل","أ، ن، ي، ت","ب، م، و، ف","ه، ع، غ، خ"],togri:1},
      {id:2,savol:"يَكْتُبُ — qaysi shaxs?",variantlar:["1-shaxs mufrad","2-shaxs erkak","3-shaxs erkak mufrad","1-shaxs ko'plik"],togri:2},
      {id:3,savol:"أَكْتُبُ — qaysi shaxs?",variantlar:["3-shaxs erkak","2-shaxs erkak","1-shaxs mufrad","1-shaxs ko'plik"],togri:2},
      {id:4,savol:"لَمْ dan keyin fe'l qaysi holda bo'ladi?",variantlar:["Raf'","Nasb","Jazm","O'zgarmaydi"],togri:2},
      {id:5,savol:"لَنْ يَكْتُبَ — ma'nosi?",variantlar:["U yozadi","U yozayotir","U yozdi","U yozmaydi (kelajak)"],togri:3},
      {id:6,savol:"1-shaxs ko'plik muzori' harfi?",variantlar:["يـ","تـ","أـ","نـ"],togri:3},
      {id:7,savol:"تَكْتُبِينَ — qaysi shaxs?",variantlar:["3-shaxs ayol ko'plik","2-shaxs ayol mufrad","2-shaxs erkak mufrad","1-shaxs ayol"],togri:1},
      {id:8,savol:"لَا + muzori' — qaysi ma'no?",variantlar:["O'tgan inkor","Oddiy inkor (odatiy)","Kelajak inkor","Buyruq"],togri:1},
      {id:9,savol:"كَيْ + muzori' — nimani bildiradi?",variantlar:["Inkor","Shart","Maqsad","Savol"],togri:2},
      {id:10,savol:"نَكْتُبُ — qaysi shaxs?",variantlar:["3-shaxs ko'plik","2-shaxs ko'plik","1-shaxs mufrad","1-shaxs ko'plik"],togri:3},
    ]
  },

  {
    id: 26,
    nomi: "Izofa — Izofiy Qurilma",
    icon: "🔗",
    color: "amber",
    mavzu: `# Izofa — Izofiy Qurilma

## Ta'rif

Izofa ikkita ismni birlashtiradi — birinchisi **mudof**, ikkinchisi **mudof ilayh** (jarr holida):

**Mudof + Mudof ilayh (jarr)**

مَكْتَبُ الْمُدِيرِ — Direktorning kabineti

---

## Asosiy Qoidalar

### 1. Mudofdan اَلـ (al) tushadi
Mudof hech qachon al olmaydi (hatto ma'rifa bo'lsa ham):

❌ اَلْمَكْتَبُ الْمُدِيرِ — noto'g'ri
✅ مَكْتَبُ الْمُدِيرِ — to'g'ri

### 2. Mudof ilayh jarr holida
Mudof ilayh doimo jarr holida bo'ladi (kasra yoki ـِ):

بَابُ **الْبَيْتِ** — Uyning eshigi
كِتَابُ **الطَّالِبِ** — Talabaning kitobi

### 3. Ta-marbuta 't' shaklida o'qiladi
Mudof oxirida ta-marbuta bo'lsa, u 't' bo'lib o'qiladi:

مَدْرَسَة + الطُّلَّاب → مَدْرَسَةُ الطُّلَّابِ — Talabalar maktabi

---

## Turli Izofa Misollari

| Izofa | Ma'no |
|-------|-------|
| بَابُ الْبَيْتِ | Uy eshigi |
| عَاصِمَةُ الْبِلَادِ | Mamlakatning poytaxti |
| مَطْبَخُ الْمَنْزِلِ | Uydagi oshxona |
| سَيَّارَةُ الْأُسْتَاذِ | O'qituvchining mashinasi |
| لُغَةُ الْعَرَبِ | Arablarning tili |

---

## Uzoq Izofa Zanjiri

Uch yoki undan ortiq ism izofa zanjiri tuzishi mumkin:
مَكْتَبَةُ مَدْرَسَةِ الْمَدِينَةِ — Shahar maktabining kutubxonasi

---

## Sifatning Joyi

Sifat izofaning ikki bo'lagidan keyin keladi:
بَيْتُ الرَّجُلِ الْكَبِيرُ — Katta erkakning uyi
(Sifat الْكَبِيرُ — raf', mudofga tegishli)

---

## Naqira + Ma'rifa Izofa

Naqira mudof + ma'rifa mudof ilayh → butun izofa ma'rifa:
كِتَابُ الطَّالِبِ (ma'rifa) vs كِتَابُ طَالِبٍ (naqira, agar mudof ilayh tanvin olsa)`,
    vazifalar: [
      {id:1,savol:"Izofada mudof ilayh qaysi holda bo'ladi?",variantlar:["Raf'","Nasb","Jarr","Jazm"],togri:2},
      {id:2,savol:"Mudofdan nima tushiriladi?",variantlar:["Ta-marbuta","اَلـ (al)","Tanvin","Shaddah"],togri:1},
      {id:3,savol:"مَكْتَبُ الْمُدِيرِ — ma'nosi?",variantlar:["Katta kabinet","Direktorning kabineti","Yaxshi idora","Yangi kabinet"],togri:1},
      {id:4,savol:"Izofada ta-marbuta qanday o'qiladi?",variantlar:["Jim o'qilmaydi","'t' bo'lib o'qiladi","'h' bo'lib o'qiladi","'a' bo'lib o'qiladi"],togri:1},
      {id:5,savol:"Qaysi shakl noto'g'ri?",variantlar:["بَابُ الْبَيْتِ","مَكْتَبُ الطَّالِبِ","اَلْكِتَابُ الطَّالِبِ","كِتَابُ الطَّالِبِ"],togri:2},
      {id:6,savol:"بَابُ الْبَيْتِ — bu izofada mudof kim?",variantlar:["الْبَيْتِ","بَابُ","Ikkala ism","Jarr harf"],togri:1},
      {id:7,savol:"سَيَّارَةُ الْأُسْتَاذِ — ma'nosi?",variantlar:["Yangi mashina","O'qituvchining mashinasi","Katta mashina","Qizil mashina"],togri:1},
      {id:8,savol:"Uzoq izofa zanjirida nechta ism bo'lishi mumkin?",variantlar:["Faqat 2 ta","Faqat 3 ta","3 ta va undan ortiq","Faqat 1 ta"],togri:2},
      {id:9,savol:"بَيْتُ الرَّجُلِ الْكَبِيرُ — الْكَبِيرُ qaysi so'zga tegishli?",variantlar:["الرَّجُلِ","بَيْتُ","Ikkalasiga","Hech biriga"],togri:1},
      {id:10,savol:"Izofa nima?",variantlar:["Fe'l + hol qurilmasi","Ikkita ismni birlashtiruvchi qurilma","Ism + sifat qurilmasi","Shart + jawab qurilmasi"],togri:1},
    ]
  },

  // ── C1 ───────────────────────────────────────────────────────────────

  {
    id: 27,
    nomi: "Fe'l Vaznlari I–X",
    icon: "🔢",
    color: "violet",
    mavzu: `# Fe'l Vaznlari I–X

## Kirish

Arab fe'llari asosiy uch harfli o'zakdan (triliteral root) turli vaznlar (awzaan) orqali hosil bo'ladi. Har bir vazn o'ziga xos ma'no nozikligini qo'shadi:

---

## Vazn Jadvali

| Vazn | Ko'rinish | Nomi | Ma'no qo'shimchasi | Misol |
|------|-----------|------|--------------------|-------|
| **I** | فَعَلَ | Asosiy | Asosiy harakat | كَتَبَ (yozdi) |
| **II** | فَعَّلَ | Ta'diya | Boshqaga qildirish | كَتَّبَ (yozdirdi) |
| **III** | فَاعَلَ | Musharakah | Bir-biriga | كَاتَبَ (yozishdi) |
| **IV** | أَفْعَلَ | Ta'diya | Boshqaga qildirish | أَكْتَبَ (yozdirdi) |
| **V** | تَفَعَّلَ | Tafakkul | II vazn refleksivi | تَكَتَّبَ (yozildi) |
| **VI** | تَفَاعَلَ | Tafaa'ul | III vazn refleksivi | تَكَاتَبَ (yozishildi) |
| **VII** | اِنْفَعَلَ | Infi'al | Passiv / o'z-o'zidan | اِنْكَسَرَ (sindi) |
| **VIII** | اِفْتَعَلَ | Ifti'al | O'zlik / refleksiv | اِكْتَسَبَ (qo'lga kiritdi) |
| **IX** | اِفْعَلَّ | If'ilal | Rang/nuqs | اِحْمَرَّ (qizardi) |
| **X** | اِسْتَفْعَلَ | Istif'al | Talab/xohish | اِسْتَكْتَبَ (yozdirishni so'radi) |

---

## Amaliy Misol: درس o'zagi

| Vazn | Fe'l | Ma'no |
|------|------|-------|
| I | دَرَسَ | O'qidi, o'rgandi |
| II | دَرَّسَ | O'qitdi (boshqaga) |
| III | دَارَسَ | Birga o'qishdi |
| V | تَدَرَّسَ | O'rganildi |
| VI | تَدَارَسَ | Bir-biridan o'rganishdi |
| X | اِسْتَدْرَسَ | O'qittirishni so'radi |

---

## Masdar (Infinitiv) Shakllari

Har bir vaznda masdar shakli o'ziga xos:

| Vazn | Masdar | Misol |
|------|--------|-------|
| I | فَعْلٌ / فُعُولٌ ... | كِتَابَةٌ (yozish) |
| II | تَفْعِيلٌ | تَدْرِيسٌ (o'qitish) |
| III | فِعَالٌ / مُفَاعَلَةٌ | مُكَاتَبَةٌ (yozishuv) |
| IV | إِفْعَالٌ | إِكْتَابٌ |
| V | تَفَعُّلٌ | تَعَلُّمٌ (o'rganish) |
| VI | تَفَاعُلٌ | تَعَاوُنٌ (hamkorlik) |
| VII | اِنْفِعَالٌ | اِنْكِسَارٌ (sinish) |
| VIII | اِفْتِعَالٌ | اِكْتِسَابٌ (orttirish) |
| IX | اِفْعِلَالٌ | اِحْمِرَارٌ (qizarish) |
| X | اِسْتِفْعَالٌ | اِسْتِقْبَالٌ (qabul qilish) |`,
    vazifalar: [
      {id:1,savol:"I vazn (فَعَلَ) asosiy ma'nosi?",variantlar:["Boshqaga qildirish","Asosiy harakat","Bir-biriga qilish","Passiv"],togri:1},
      {id:2,savol:"II vazn (فَعَّلَ) ning asosiy ma'no qo'shimchasi?",variantlar:["O'z-o'zidan bo'ldi","Passiv","Boshqaga qildirish (ta'diya)","Bir-biriga"],togri:2},
      {id:3,savol:"دَرَّسَ va دَرَسَ o'rtasidagi farq?",variantlar:["Zamon farqi","دَرَّسَ o'qitdi (II vazn), دَرَسَ o'qidi (I vazn)","Son farqi","Jins farqi"],togri:1},
      {id:4,savol:"VII vazn (اِنْفَعَلَ) qaysi ma'no beradi?",variantlar:["Talab/xohish","Rang o'zgarishi","Passiv/o'z-o'zidan","Bir-biriga"],togri:2},
      {id:5,savol:"X vazn (اِسْتَفْعَلَ) qaysi ma'no beradi?",variantlar:["Asosiy harakat","Rang/nuqs","Passiv","Talab/xohish"],togri:3},
      {id:6,savol:"تَعَلَّمَ — qaysi vazn?",variantlar:["I vazn","III vazn","V vazn","VIII vazn"],togri:2},
      {id:7,savol:"IX vazn odatda qaysi ma'no uchun ishlatiladi?",variantlar:["Ta'diya","Rang va nuqs bildirish","Talab","Passiv"],togri:1},
      {id:8,savol:"II vazn masdari qanday ko'rinishda bo'ladi?",variantlar:["فِعَالٌ","تَفْعِيلٌ","إِفْعَالٌ","اِنْفِعَالٌ"],togri:1},
      {id:9,savol:"اِسْتَقْبَلَ — qaysi vazn?",variantlar:["VII vazn","VIII vazn","IX vazn","X vazn"],togri:3},
      {id:10,savol:"تَعَاوَنَ (hamkorlik qildi) — qaysi vazn?",variantlar:["III vazn","V vazn","VI vazn","VIII vazn"],togri:2},
    ]
  },

  {
    id: 28,
    nomi: "Shartli Gaplar — Shart va Jawab",
    icon: "🔀",
    color: "rose",
    mavzu: `# Shartli Gaplar — Shart va Jawab

## Shartli Gap Tuzilishi

Shartli gap ikki qismdan iborat:
- **Shart jumlasi** (ju-mla shart) — agar...
- **Jawab jumlasi** (jawab shart) — ...u holda

---

## Shartli Yuklamalar

### 1. إِنْ — Haqiqiy shart

Yuzaga kelishi aniq bo'lgan yoki real shart:

| Qism | Holat | Misol |
|------|-------|-------|
| إِنْ + Fe'l (jazm) | Shart | إِنْ تَدْرُسْ |
| Jawab (jazm) | Natija | تَنْجَحْ |

**إِنْ تَدْرُسْ تَنْجَحْ** — Agar o'qisang, muvaffaqiyat qozanasan.

### 2. لَوْ — Xayoliy shart

Yuzaga kelmagan yoki real bo'lmagan shart:

| Qism | Holat |
|------|-------|
| لَوْ + Maazi | Shart |
| Maazi yoki لَ + maazi | Jawab |

**لَوْ دَرَسْتَ لَنَجَحْتَ** — Agar o'qiganing bo'lsaydi, muvaffaqiyat qozongan bo'larding.

### 3. إِذَا — Kutilgan shart

Yuzaga kelishi kutilgan, bajarilishi muqarrar shart:

**إِذَا جَاءَ الطَّقْسُ الْجَمِيلُ خَرَجْنَا** — Ob-havo yaxshi bo'lganda, chiqamiz.

---

## إِنْ vs لَوْ Farqi

| | إِنْ | لَوْ |
|-|------|------|
| Shart turi | Real, haqiqiy | Xayoliy, real bo'lmagan |
| Fe'l holati | Jazm | Maazi |
| Jawab | Jazm | لَ + maazi yoki jawab jumlasi |
| Misol | إِنْ تَعْمَلْ تَنْجَحْ | لَوْ عَمِلْتَ لَنَجَحْتَ |

---

## Inkor Shartli Gap

لَوْلَا — "...bo'lmaganda edi" ma'nosida:
لَوْلَا الْعِلْمُ لَجَهِلَ النَّاسُ — Ilm bo'lmaganda edi, odamlar jaholatda qolgan bo'lishardi.

---

## Jawab Bo'laklari

| Turi | Misol |
|------|-------|
| Jazm fe'l | إِنْ تَدْرُسْ تَنْجَحْ |
| لَـ + maazi | لَوْ دَرَسَ لَنَجَحَ |
| Mubtada-xabar | إِنْ دَرَسَ فَهُوَ ذَكِيٌّ |
| فَـ + jumlat | إِنْ جَاءَ فَاسْأَلْهُ |`,
    vazifalar: [
      {id:1,savol:"Shartli gap nechi qismdan iborat?",variantlar:["1 ta","2 ta","3 ta","4 ta"],togri:1},
      {id:2,savol:"إِنْ shartli yuklаmasidan keyin fe'l qaysi holda bo'ladi?",variantlar:["Raf'","Nasb","Jarr","Jazm"],togri:3},
      {id:3,savol:"لَوْ — qaysi shart turi uchun ishlatiladi?",variantlar:["Haqiqiy/real shart","Xayoliy/real bo'lmagan shart","Kutilgan shart","Inkor shart"],togri:1},
      {id:4,savol:"إِنْ تَدْرُسْ تَنْجَحْ — ma'nosi?",variantlar:["Sen o'qidingmi?","Agar o'qisang, muvaffaqiyat qozanasan","Sen o'qimaysan","O'qish yaxshi"],togri:1},
      {id:5,savol:"لَوْلَا nimani bildiradi?",variantlar:["Agar bo'lsa","...bo'lmaganda edi","Chunki","Ammo"],togri:1},
      {id:6,savol:"لَوْ da jawab jumlasi oldiga qanday harf qo'shiladi?",variantlar:["فَـ","إِنْ","لَـ","ثُمَّ"],togri:2},
      {id:7,savol:"إِذَا — qaysi shart turi?",variantlar:["Xayoliy shart","Inkor shart","Kutilgan/muqarrar shart","O'tgan shart"],togri:2},
      {id:8,savol:"لَوْ دَرَسْتَ لَنَجَحْتَ — ma'nosi?",variantlar:["Agar o'qisang, yaxshi bo'ladi","Agar o'qiganing bo'lsaydi, muvaffaqiyat qozongan bo'larding","Sen albatta o'qiysan","O'qish mumkin"],togri:1},
      {id:9,savol:"إِنْ + Fe'l (jazm) + Jawab (jazm) — bu qaysi shart turi?",variantlar:["Xayoliy shart","Haqiqiy/real shart","Inkor shart","Kutilgan shart"],togri:1},
      {id:10,savol:"إِنْ va لَوْ o'rtasidagi asosiy farq?",variantlar:["Zamon farqi","إِنْ haqiqiy shart, لَوْ xayoliy shart","Inkor/tasdiq farqi","Jazm/nasb farqi"],togri:1},
    ]
  },
];
