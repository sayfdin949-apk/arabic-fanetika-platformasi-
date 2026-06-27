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
| بِسْمِ | bismi | nomida |
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
    nomi: "Tanvin",
    icon: "ً",
    color: "deep",
    mavzu: `# Tanvin

**Tanvin** — so'z oxiridagi ikki harakat. Bu **noaniq** (artikelsiz) ot va sifatlarda ishlatiladi.

---

## 3 xil Tanvin

| Nom | Belgi | Tovush | Joyi |
|-----|-------|--------|------|
| **Tanvin Fath** | ً | -an | Harfning ustida (ikki chiziq) |
| **Tanvin Kasr** | ٍ | -in | Harfning ostida (ikki chiziq) |
| **Tanvin Damm** | ٌ | -un | Harfning ustida (ikki و) |

---

## Tanvin Fath — Maxsus Qoida

Tanvin Fath ( ً ) ga odatda **Alif qo'shiladi** (ة va ء dan tashqari):

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| كِتَابًا | kitaaban | Alif qo'shildi |
| وَلَدًا | waladan | Alif qo'shildi |
| رَحْمَةً | rahmatan | ة bor — Alif yo'q |
| شَيْئًا | shay'an | ء bor — Alif yo'q |

---

## Tanvin Kasr va Damm

| Arab | O'qilishi | Ma'nosi |
|------|-----------|---------|
| كِتَابٍ | kitaabin | kitobning (jo'nalish) |
| مَلِكٍ | malikin | podshohning |
| كِتَابٌ | kitaabun | kitob (mavjudlik) |
| مَلِكٌ | malikun | podshoh |

---

## To'xtaganda (Vaqf) Tanvin qanday o'qiladi?

| Tanvin turi | To'xtaganda |
|-------------|------------|
| Tanvin Fath ( ً ) | Faqat "aa" — ikkinchi chiziq tushadi |
| Tanvin Kasr ( ٍ ) | Tovush tushadi, oxirgi harf sukun |
| Tanvin Damm ( ٌ ) | Tovush tushadi, oxirgi harf sukun |

**Misol:** كِتَابًا — o'rtasida: kitaaban; to'xtaganda: kitaaba

---

## Aniq va Noaniq

| | Arab | O'qilishi |
|--|------|-----------|
| **Noaniq** (tanvin bor) | كِتَابٌ | kitaabun |
| **Aniq** (AL- bor, tanvin yo'q) | اَلْكِتَابُ | al-kitaabu |`,
    vazifalar: [
      {id:1,savol:"Tanvin qancha harakat (belgi)dan iborat?",variantlar:["1 ta","2 ta","3 ta","4 ta"],togri:1},
      {id:2,savol:"Tanvin Fath qanday o'qiladi?",variantlar:["-un","-in","-an","-aa"],togri:2},
      {id:3,savol:"Tanvin Kasr qayerda joylashadi?",variantlar:["Ustida","Ostida","O'ngida","Chapida"],togri:1},
      {id:4,savol:"Tanvin Fath bilan odatda nima qo'shiladi?",variantlar:["و (Vov)","ي (Ya)","ا (Alif)","ن (Nun)"],togri:2},
      {id:5,savol:"كِتَابًا so'zi qanday o'qiladi?",variantlar:["kitaabun","kitaabin","kitaaban","kitaabaa"],togri:2},
      {id:6,savol:"To'xtaganda Tanvin Fath qanday o'qiladi?",variantlar:["Yo'qoladi","Faqat 'aa' qoladi","'an' qoladi","'un' bo'ladi"],togri:1},
      {id:7,savol:"Tanvin qaysi so'zlarda ishlatiladi?",variantlar:["Faqat fe'llarda","Noaniq ot va sifatlarda","AL- bor so'zlarda","Faqat ismda"],togri:1},
      {id:8,savol:"رَحْمَةً ga nega Alif qo'shilmadi?",variantlar:["Noto'g'ri, qo'shilgan","ة bor bo'lgani uchun","Qisqa so'z","Harakat yo'q"],togri:1},
      {id:9,savol:"Tanvin Damm belgisi qanday ko'rinishda?",variantlar:["Ikki vertikal chiziq","Ikki gorizontal chiziq ostida","Ikki و ustida","Doira"],togri:2},
      {id:10,savol:"اَلْكِتَابُ so'zida tanvin bormi?",variantlar:["Ha, bor","Yo'q, AL- bor so'zda tanvin bo'lmaydi","Faqat oxirida","Faqat boshida"],togri:1},
    ]
  },
  {
    id: 4,
    nomi: "Shaddah (Tashdid)",
    icon: "ّ",
    color: "green",
    mavzu: `# Shaddah — Tashdid

**Shaddah** ( ّ ) — harfning ustida yoziladigan "W" shaklidagi belgi. U harfning **ikki marta** talaffuz etilishini bildiradi.

---

## Asosiy Qoida

Shaddah = birinchi harf **sukun** + ikkinchi harf **harakat** bilan.

| Yozilishi | Aslida | O'qilishi |
|-----------|--------|-----------|
| مَدَّ | مَدْ + دَ | madda |
| رَبَّ | رَبْ + بَ | rabba |
| شَدَّ | شَدْ + دَ | shadda |

---

## Shaddah + Harakat

Shaddah bir vaqtning o'zida harakat bilan birga yoziladi:

| Belgi | O'qilishi | Misol |
|-------|-----------|-------|
| ّ + َ → َّ | -kk-a | رَبَّنَا (rabbana) |
| ّ + ِ → ِّ | -kk-i | رَبِّي (rabbii) |
| ّ + ُ → ُّ | -kk-u | رَبُّنَا (rabbuna) |

---

## Ahamiyati — Ma'no Farqi

Shaddah yo'q va bor so'zlarda ma'no butunlay farqlanadi:

| Shaddasiz | Ma'nosi | Shaddali | Ma'nosi |
|-----------|---------|----------|---------|
| كَتَبَ | yozdi | كَتَّبَ | ko'p yozdirdi |
| عَلَمَ | bildi | عَلَّمَ | o'rgatdi |
| حَرَمَ | taqiqladi | حَرَّمَ | harom qildi |

---

## ن va م ga Shaddah — G'unna

**ن** va **م** harflari shaddah olsa, **G'unna** (burun tovushi) bilan 2 hisobda o'qiladi:

| Arab | O'qilishi | G'unna |
|------|-----------|--------|
| إِنَّ | inna | Ha, 2 hisob |
| ثُمَّ | thumma | Ha, 2 hisob |
| مِمَّا | mimma | Ha, 2 hisob |

---

## Umumiy Misollar

| Arab | O'qilishi | Ma'nosi |
|------|-----------|---------|
| دَرَّسَ | darrasa | o'qitdi |
| الصَّفُّ | as-saff | qator |
| الرَّسَّام | ar-rassaam | rassom |
| إِيَّاكَ | iyyaaka | Faqat Seni |`,
    vazifalar: [
      {id:1,savol:"Shaddah nimani bildiradi?",variantlar:["Harfni o'tkazib yuborish","Harfni ikki marta aytish","Harfni cho'zish","Harfni o'chirib tashlash"],togri:1},
      {id:2,savol:"Shaddah qanday ko'rinishda?",variantlar:["Kichik doira","W shakli","Ikki chiziq","Kichik tosh"],togri:1},
      {id:3,savol:"Shaddah = birinchi harf ___ + ikkinchi harf harakatli",variantlar:["Fatha","Kasra","Damma","Sukun"],togri:3},
      {id:4,savol:"رَبَّنَا so'zi qanday o'qiladi?",variantlar:["rabana","rabbana","raabana","rabbanaa"],togri:1},
      {id:5,savol:"عَلَّمَ va عَلَمَ farqi nima?",variantlar:["Farqi yo'q","عَلَّمَ = o'rgatdi, عَلَمَ = bildi","عَلَمَ = o'rgatdi, عَلَّمَ = bildi","Faqat yozilishida"],togri:1},
      {id:6,savol:"إِنَّ so'zida ن shaddali — qanday o'qiladi?",variantlar:["Ina","Inna (g'unna bilan 2 hisob)","Inaa","Iin"],togri:1},
      {id:7,savol:"دَرَّسَ so'zida shaddah qaysi harfda?",variantlar:["د","س","ر","ا"],togri:2},
      {id:8,savol:"Shaddah bilan birga kasra bo'lsa qanday yoziladi?",variantlar:["ِّ","ًّ","ٌّ","ّْ"],togri:0},
      {id:9,savol:"كَتَبَ va كَتَّبَ orasida qanday farq bor?",variantlar:["Farqi yo'q","كَتَّبَ ko'p yozdirdi, كَتَبَ yozdi","كَتَبَ = o'rgatdi","كَتَّبَ = yozdi"],togri:1},
      {id:10,savol:"G'unna qaysi harflar shaddali bo'lganda hosil bo'ladi?",variantlar:["ر va ل","ن va م","ب va ت","ع va ح"],togri:1},
    ]
  },
  {
    id: 5,
    nomi: "Maxsus Harflar: Ta Marbuta, Alif Layyina, Hamzatul Vasl",
    icon: "ة",
    color: "lime",
    mavzu: `# Maxsus Harflar

Ushbu uchta harf arab yozuvida alohida qoidalarga ega.

---

## 1 — تَاء مَرْبُوطَة (Ta Marbuta) — ة

**Ko'rinishi:** ت ga o'xshash, lekin yumaloq (ة). **Faqat so'z oxirida** bo'ladi.

### Qachon ishlatiladi?
- Ko'pincha **sifat** va **ot**larning **muannats** (urg'ochi) shakli uchun

| Arab | O'qilishi | Ma'nosi |
|------|-----------|---------|
| مَدْرَسَة | madrasa(h) | maktab |
| رَحْمَة | rahma(h) | rahmat |
| مُعَلِّمَة | mu'allima(h) | o'qituvchi (ayol) |

### O'qilishi:
| Holat | O'qilishi |
|-------|-----------|
| So'z davom etsa (Vasl) | **-t-** (ta) |
| So'z oxirida to'xtansa (Vaqf) | **-h** yoki **-a** |

---

## 2 — اَلِف لَيِّنَة (Alif Layyina) — ى

**Ko'rinishi:** ي ga o'xshash, lekin nuqtasiz (ى). **Faqat so'z oxirida** bo'ladi.

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| هُدًى | hudan | yo'l-yo'riq |
| مُوسَى | Muusaa | Muso (ism) |
| عِيسَى | 'Iisaa | Iso (ism) |
| يُصَلِّى | yusallii | namoz o'qiydi |

**Farq:** ي (Ya) — nuqtali, o'rtada va oxirda; ى (Alif Layyina) — nuqtasiz, faqat oxirda.

---

## 3 — هَمْزَةُ الْوَصْل (Hamzatul Vasl) — ٱ

**Ko'rinishi:** ا ustida maxsus belgi (ٱ) yoki oddiy Alif. Bu hamza **bog'lash hamzasi** deyiladi.

### Asosiy Qoida:
- So'z **boshi**da bo'lsa va **oldida** biror so'z bo'lsa — **aytilmaydi**
- So'z **boshida** yolg'iz tursa — **aytiladi**

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| اِبْن | ibn | Yolg'iz: "ibn" |
| اِبْن عَلِي | ibnu ali | Birikib: hamza tushadi |
| اَلْكِتَاب | al-kitaab | AL- harfida |
| قُلِ اسْمَهُ | qulis-mahu | ا tushadi |

### Hamzatul Vasl qayerda bo'ladi?
- **اَلـ** (aniqlik artikli)
- Ba'zi fe'l shakllari (اِفْعَل, اِسْتَفْعَلَ)
- Ba'zi otlar: اِسْم, اِبْن, اِمْرَأَة`,
    vazifalar: [
      {id:1,savol:"Ta Marbuta so'z oxirida to'xtaganda qanday o'qiladi?",variantlar:["T sifatida","H yoki A sifatida","Yo'qoladi","N sifatida"],togri:1},
      {id:2,savol:"Alif Layyina (ى) va Ya (ي) orasidagi asosiy farq?",variantlar:["Shakli boshqa","ى nuqtasiz, فقат oxirda bo'ladi","ى katta, ي kichik","Farqi yo'q"],togri:1},
      {id:3,savol:"Ta Marbuta (ة) qayerda bo'ladi?",variantlar:["So'z boshida","So'z o'rtasida","Faqat so'z oxirida","Istalgan joyda"],togri:2},
      {id:4,savol:"Hamzatul Vasl oldingi so'zga bog'langanda qanday bo'ladi?",variantlar:["Kuchayadi","Aytilmaydi (tushadi)","Ikki marta aytiladi","Sukun oladi"],togri:1},
      {id:5,savol:"مَدْرَسَة so'zida Ta Marbuta qanday ishlatilgan?",variantlar:["Muannats shakli uchun","Tanvin uchun","Shaddah uchun","Mad uchun"],togri:0},
      {id:6,savol:"مُوسَى so'zining oxiridagi harf qaysi?",variantlar:["ي (Ya, nuqtali)","ى (Alif Layyina, nuqtasiz)","ا (Alif)","ة (Ta Marbuta)"],togri:1},
      {id:7,savol:"اَلـ (AL-) artiklidagi hamza qaysi tur?",variantlar:["Hamzatul Qat'","Hamzatul Vasl","Alif Layyina","Ta Marbuta"],togri:1},
      {id:8,savol:"قُلِ اسْمَهُ iborasida اسْم ning boshi qanday o'qiladi?",variantlar:["is-mahu","qulis-mahu (tushadi)","qul-ismahu","i-smahu"],togri:1},
      {id:9,savol:"Quyidagi so'zlardan qaysi birida Ta Marbuta bor?",variantlar:["كِتَاب","دَرْس","رَحْمَة","عِلْم"],togri:2},
      {id:10,savol:"Alif Layyina (ى) so'z o'rtasida ishlatilishi mumkinmi?",variantlar:["Ha, doim","Yo'q, faqat so'z oxirida","Faqat ism so'zlarda","Faqat fe'llarda"],togri:1},
    ]
  },
  {
    id: 6,
    nomi: "Maxraj: Jawf va Halq",
    icon: "ح",
    color: "deep",
    mavzu: `# Maxraj Ilmi — Jawf va Halq

**Maxraj** — harfning chiqish joyi. Arab tilida **5 ta asosiy maxraj** mavjud.

---

## 5 ta Maxraj (Umumiy)

| № | Maxraj | Ma'nosi | Harflar soni |
|---|--------|---------|-------------|
| 1 | **Jawf** | Bo'shliq (og'iz + tomoq) | 3 ta |
| 2 | **Halq** | Tomoq | 6 ta |
| 3 | **Lison** | Til | 18 ta |
| 4 | **Shafatayn** | Ikki lab | 4 ta |
| 5 | **Xayshum** | Burun | G'unna |

---

## 1 — JAWF (الجَوْف) — Bo'shliq

Bu **3 ta harf** og'iz va tomoq bo'shlig'ida hosil bo'ladi. Bular **Mad harflari** deyiladi:

| Harf | Sharti | O'qilishi |
|------|--------|-----------|
| ا | Fathadan keyin | Uzun "aa" — كِتَاب |
| و | Dammadan keyin | Uzun "uu" — نُور |
| ي | Kasradan keyin | Uzun "ii" — قِيل |

**Eslatma:** Bu harflar sukun va oldingi harfning harakati birlashib, uzun tovush hosil qiladi.

---

## 2 — HALQ (الحَلْق) — Tomoq

Tomoqdan 6 ta harf chiqadi. Ular **3 qavat**ga bo'linadi:

| Qavat | Arabcha | Ma'nosi | Harflar |
|-------|---------|---------|---------|
| Aqsal | أَقْصَى | Eng chuqur | غ خ |
| Vasat | وَسَط | O'rta | ع ح |
| Adnal | أَدْنَى | Eng yaqin | ء ه |

### Tafsilot:

**Aqsal Halq — غ va خ:**
- Eng chuqur tomoqdan; tilning orqasi yuqori tanglay bilan
- غ (G'ayn) — jarangli (g'arbliklardagi "r" ga o'xshash)
- خ (Xo) — jarangsiz (rus "х" ga o'xshash)

**Vasat Halq — ع va ح:**
- O'rta tomoqdan; tomoq siqiladi
- ع (Ayn) — jarangli, tomoq siqib
- ح (Ha) — jarangsiz, tomoq siqib

**Adnal Halq — ء va ه:**
- Tomoq kiraverishidan; glottal
- ء (Hamza) — to'liq to'xtash (glottal stop)
- ه (Ha) — nafas oqimi (h)

---

## Yodlash — Halq harflari

**"أَخِي هَاعَ غُصَّةً"** — 6 ta halq harfi: ء خ ه ع غ ح

| Harf | Tasnif |
|------|--------|
| ء ه | Adnal (yaqin) |
| ع ح | Vasat (o'rta) |
| غ خ | Aqsal (chuqur) |`,
    vazifalar: [
      {id:1,savol:"Jawf maxrajidan nechta harf chiqadi?",variantlar:["2 ta","3 ta","4 ta","6 ta"],togri:1},
      {id:2,savol:"Mad harflari qaysi maxrajdan?",variantlar:["Halq","Jawf","Lison","Shafatayn"],togri:1},
      {id:3,savol:"Halq maxrajida nechta harf bor?",variantlar:["3 ta","4 ta","6 ta","8 ta"],togri:2},
      {id:4,savol:"ع va ح qaysi qavat halqdan chiqadi?",variantlar:["Aqsal (chuqur)","Vasat (o'rta)","Adnal (yaqin)","Jawf"],togri:1},
      {id:5,savol:"غ va خ qaysi qavat halqdan chiqadi?",variantlar:["Adnal","Vasat","Aqsal","Jawf"],togri:2},
      {id:6,savol:"Hamza (ء) qaysi qavat halqdan chiqadi?",variantlar:["Aqsal","Vasat","Adnal","Jawf"],togri:2},
      {id:7,savol:"و (Vov) mad harfi sifatida qanday sharoitda?",variantlar:["Fathadan keyin","Dammadan keyin","Kasradan keyin","Sukun bo'lsa"],togri:1},
      {id:8,savol:"ي (Ya) mad harfi bo'lishi uchun oldingi harf qanday harakat olishi kerak?",variantlar:["Fatha","Damma","Kasra","Sukun"],togri:2},
      {id:9,savol:"Arab tilida nechta asosiy maxraj bor?",variantlar:["3 ta","4 ta","5 ta","6 ta"],togri:2},
      {id:10,savol:"ه (Ha) va ء (Hamza) qaysi toifadan?",variantlar:["Aqsal Halq","Vasat Halq","Adnal Halq","Jawf"],togri:2},
    ]
  },
  {
    id: 7,
    nomi: "Maxraj: Lison (Til Harflari)",
    icon: "ل",
    color: "green",
    mavzu: `# Maxraj — Lison (Til)

**Lison** maxrajidan **18 ta harf** chiqadi. Bu harflar tilning turli qismlaridan hosil bo'ladi.

---

## Lison Harflarining Guruhlari

### 1 — Aqsal Lison (Tilning orqasi)

| Harf | Maxraj nuqtasi | Xususiyati |
|------|---------------|-----------|
| ق | Til orqasi + yuqori tanglay | Kuchli, chuqur |
| ك | Til orqasi + yuqori tanglay (pastroq) | Yumshoqroq |

**Farq:** ق (Qof) dan chuqurroq, kuchliroq; ك (Kof) undan pastroqda.

### 2 — Vasat Lison (Tilning o'rtasi)

| Harf | Maxraj nuqtasi |
|------|---------------|
| ج | Til o'rtasi + tanglay |
| ش | Til o'rtasi + tanglay (keng) |
| ي | Til o'rtasi + tanglay (yumshoq) |

### 3 — Janb Lison (Tilning yoni)

| Harf | Maxraj nuqtasi |
|------|---------------|
| ض | Til yoni + yuqori tishlar |
| ل | Til yoni + tish tublariga tegib |

### 4 — Tarf Lison (Til uchi)

| Harf | Maxraj nuqtasi |
|------|---------------|
| ن | Til uci + tish tublariga yaqin (burun bilan) |
| ر | Til uci + tish tubirlariga (titrash) |

### 5 — Interdental (Til uchi + tishlar arasi)

| Harf | Xususiyat |
|------|-----------|
| ث | Til uci + tish arasi — jarangsiz |
| ذ | Til uci + tish arasi — jarangli |
| ظ | Til uci + tish arasi — qalin, jarangli |

### 6 — Lam-alveolar (Til uci + dammasi qovurg'a)

| Harf | Xususiyat |
|------|-----------|
| ت | Til uci + tish tubirlariga — jarangsiz |
| د | Til uci + tish tubirlariga — jarangli |
| ط | Til uci + tish tubirlariga — qalin, jarangli |

### 7 — Sibilant (Til uci + oldingi tish)

| Harf | Xususiyat |
|------|-----------|
| س | Jarangsiz s tovushi |
| ز | Jarangli z tovushi |
| ص | Qalin, jarangsiz s |

---

## Umumiy Jadval — 18 harf

| Guruh | Harflar |
|-------|---------|
| Aqsal | ق ك |
| Vasat | ج ش ي |
| Janb | ض ل |
| Tarf | ن ر |
| Interdental | ث ذ ظ |
| Alveolar | ت د ط |
| Sibilant | س ز ص |`,
    vazifalar: [
      {id:1,savol:"Lison maxrajidan nechta harf chiqadi?",variantlar:["14 ta","16 ta","18 ta","20 ta"],togri:2},
      {id:2,savol:"ق (Qof) harfi tilning qaysi qismidan chiqadi?",variantlar:["Til o'rtasidan","Til yonidan","Tilning orqasidan","Til uchidan"],togri:2},
      {id:3,savol:"ث ذ ظ harflari qaysi guruhga kiradi?",variantlar:["Sibilant","Alveolar","Interdental","Vasat"],togri:2},
      {id:4,savol:"ض (Dod) harfi tilning qaysi qismidan?",variantlar:["Orqasidan","O'rtasidan","Yonidan","Uchidan"],togri:2},
      {id:5,savol:"ر (Ra) harfi qanday xususiyatga ega?",variantlar:["Til yoni","Tilni tishlar arasiga qo'yib","Til uci titrashi (takrir)","Keng yoyilishi"],togri:2},
      {id:6,savol:"س ز ص harflari qaysi guruhga kiradi?",variantlar:["Interdental","Alveolar","Sibilant","Aqsal"],togri:2},
      {id:7,savol:"ك (Kof) va ق (Qof) qayerda farqlanadi?",variantlar:["ق chuqurroq, kuchliroq","ك chuqurroq, kuchliroq","Farqi yo'q","Biri lison, biri halq"],togri:0},
      {id:8,savol:"ت د ط harflari qaysi guruhga kiradi?",variantlar:["Sibilant","Alveolar","Interdental","Vasat"],togri:1},
      {id:9,savol:"ن (Nun) harfida qo'shimcha organ ishtirok etadi?",variantlar:["Tomoq","Lab","Burun","Ko'z"],togri:2},
      {id:10,savol:"ج ش ي harflari tilning qaysi qismidan?",variantlar:["Aqsal (orqa)","Vasat (o'rta)","Janb (yon)","Tarf (uch)"],togri:1},
    ]
  },
  {
    id: 8,
    nomi: "Maxraj: Shafatayn va Xayshum",
    icon: "م",
    color: "lime",
    mavzu: `# Maxraj — Shafatayn va Xayshum

Maxrajning so'nggi ikki turi: **Shafatayn** (ikki lab) va **Xayshum** (burun).

---

## SHAFATAYN — Ikki Lab

Lab harflari 4 ta. Ular lab yoki lab + tish orqali hosil bo'ladi:

### Tafsilot

| Harf | Maxraj | Xususiyati |
|------|--------|-----------|
| **ب** | Ikki labning birlashishi | Jarangli, kuchli |
| **م** | Ikki labning birlashishi + burun | Jarangli + g'unna |
| **و** | Ikki labning yumaloqlashishi | Yumshoq, jarangli |
| **ف** | **Pastki lab** + yuqori tishlar | Jarangsiz |

### Farqlar

| | ب | م | و | ف |
|--|--|--|--|--|
| Organ | Ikki lab | Ikki lab + burun | Ikki lab (yumaloq) | Pastki lab + tish |
| Jarangli? | Ha | Ha | Ha | Yo'q |
| G'unna? | Yo'q | Ha | Yo'q | Yo'q |

---

## XAYSHUM — Burun (G'unna)

**G'unna** — burun bo'shlig'idan chiqadigan tovush. Bu alohida maxraj hisoblanadi.

### G'unna qachon bo'ladi?

| Holat | Misol |
|-------|-------|
| ن yoki م shaddali bo'lsa | إِنَّ, ثُمَّ |
| Idg'om bilan g'unna holida | مِنْ + يَوْم = مِيَّوْم |
| Iqlab holida (ن → م) | مِنْ + بَعْد = مِمْبَعْد |
| Ixfo holida | مِنْ + تَوْب |

### G'unna muddati

**G'unna har doim 2 harakat (2 hisob) davom etadi.**

---

## Umumiy 5 Maxraj Jadvali

| Maxraj | Harflar soni | Harflar |
|--------|-------------|---------|
| Jawf | 3 | ا و ي |
| Halq | 6 | ء ه ع ح غ خ |
| Lison | 18 | ق ك ج ش ي ض ل ن ر ث ذ ظ ت د ط س ز ص |
| Shafatayn | 4 | ب م و ف |
| Xayshum | G'unna | ن م (maxsus holatlarda) |

---

## Mnemоnika

**"فَرَّ مِنْ لُبٍّ"** — lab harflarini yodlash uchun emas, lekin:
Lab harflarimiz: **ب م و ف** — "Ba, Mim, Vov, Fa"`,
    vazifalar: [
      {id:1,savol:"Shafatayn maxrajida nechta harf bor?",variantlar:["2 ta","3 ta","4 ta","5 ta"],togri:2},
      {id:2,savol:"ف (Fa) harfi qanday hosil bo'ladi?",variantlar:["Ikki lab","Yuqori lab + pastki tish","Pastki lab + yuqori tish","Burundan"],togri:2},
      {id:3,savol:"Xayshum maxraji qanday tovush hosil qiladi?",variantlar:["Hushtak","G'unna (burun)","Titrash","Nafas"],togri:1},
      {id:4,savol:"م (Mim) harfini ب (Ba) dan farqlovchi xususiyat?",variantlar:["Mim lab harfi emas","Mim shaddah oladi","Mim g'unna bilan","Mim jarangsiz"],togri:2},
      {id:5,savol:"G'unna necha harakat davom etadi?",variantlar:["1","2","3","4"],togri:1},
      {id:6,savol:"إِنَّ so'zida g'unna bo'lishi uchun sabab?",variantlar:["Hamza bor","ن shaddali","Tanvin bor","Sukun bor"],togri:1},
      {id:7,savol:"و (Vov) lablarning qanday holatida hosil bo'ladi?",variantlar:["Birlashib","Yumaloqlashib","Yon tomonga","Ochilgan holda"],togri:1},
      {id:8,savol:"Barcha maxrajlar soni nechta?",variantlar:["3 ta","4 ta","5 ta","6 ta"],togri:2},
      {id:9,savol:"ب (Ba) va م (Mim) ning umumiy xususiyati?",variantlar:["Ikkalasi ham jarangsiz","Ikkalasi ham lab harfi","Ikkalasi ham g'unna bilan","Ikkalasi ham halq harfi"],togri:1},
      {id:10,savol:"Lison maxrajida nechta harf bor?",variantlar:["14 ta","16 ta","18 ta","20 ta"],togri:2},
    ]
  },
  {
    id: 9,
    nomi: "Sifat Ilmi — 5 Juft Sifat",
    icon: "ص",
    color: "deep",
    mavzu: `# Sifat Ilmi — 5 Juft Sifat

**Sifat** — harfning o'ziga xos tovush xususiyati. **17 ta sifat** mavjud: **5 juft** va **7 mustaqil**.

---

## 1 — جَهْر va هَمْس (Jahr va Hams)

**Jahr** — jarangli (ovoz tori titrashi bilan)
**Hams** — jarangsiz (faqat nafas bilan)

### Hams harflari — 10 ta:
ت ث ح خ س ش ص ف ك ه

**Yodlash:** "فَحَثَّهُ شَخْصٌ سَكَتْ" — barcha Hams harflari shu iborada!

Qolgan **18 ta** — Jahr harflari.

---

## 2 — شِدَّة va رَخَاوَة (Shadid va Raxv)

**Shadid** — havo to'xtab, to'satdan chiqadi (portlatuvchi)
**Raxv** — havo uzluksiz oqib o'tadi

### Shadid harflari — 8 ta:
أ ب ت ج د ك ق ط

**Yodlash:** "أَجِدُ قِطَّكَ"

### Tavassut (o'rta) — 5 ta:
ل ن ع م ر → **"لِنْ عُمَرْ"**

---

## 3 — اِسْتِعْلَاء va اِسْتِفَال (Isti'lo va Istifol)

**Isti'lo** — til ko'tariladi (qalin tovush)
**Istifol** — til pastga tushadi (ingichka tovush)

### Isti'lo harflari — 7 ta:
خ ص ض ط ظ غ ق

**Yodlash:** "خُصَّ ضَغْطٍ قِظْ"

Qolgan **21 ta** — Istifol (ingichka).

---

## 4 — إِطْبَاق va اِنْفِتَاح (Itboq va Infitoh)

**Itboq** — til yuqori tanglay ("qopqoq") bilan yopiladi
**Infitoh** — til ochiq

### Itboq harflari — 4 ta (eng qalin):
ص ض ط ظ

Bu 4 harf **Isti'lo ichidagi Isti'lo** — eng qalin tovush.

---

## 5 — إِذْلَاق va إِصْمَات (Izloq va Ishmoq)

**Izloq** — til uci yoki lab chetidan oson chiqadi
**Ishmoq** — og'ir, sekin chiqadi

### Izloq harflari — 6 ta:
ر م ن ل ب ف → **"فَرَّ مِنْ لُبٍّ"**

### Ishmoq — maxsus:
ق — lablarni biroz yumaloqlantirish

---

## Xulosa Jadvali

| Sifat juft | 1-qism | 2-qism | Asosiy farq |
|-----------|--------|--------|-------------|
| Jahr / Hams | 18 harf | 10 harf | Ovoz tori |
| Shadid / Raxv | 8 harf | qolganlar | Havo oqimi |
| Isti'lo / Istifol | 7 harf | 21 harf | Til holati |
| Itboq / Infitoh | 4 harf | qolganlar | Tanglay |
| Izloq / Ishmoq | 6 harf | qolganlar | Osonligi |`,
    vazifalar: [
      {id:1,savol:"Hams sifatida nechta harf bor?",variantlar:["8 ta","9 ta","10 ta","12 ta"],togri:2},
      {id:2,savol:"'فَحَثَّهُ شَخْصٌ سَكَتْ' qaysi sifatni yodlash uchun?",variantlar:["Jahr","Hams","Shadid","Isti'lo"],togri:1},
      {id:3,savol:"Itboq sifatidagi harflar:",variantlar:["ر م ن ل","ص ض ط ظ","ت ث ح خ","ب ج د ق"],togri:1},
      {id:4,savol:"Isti'lo harflari nechtasi?",variantlar:["4 ta","5 ta","6 ta","7 ta"],togri:3},
      {id:5,savol:"'خُصَّ ضَغْطٍ قِظْ' qaysi sifat uchun yodlash?",variantlar:["Itboq","Isti'lo","Shadid","Izloq"],togri:1},
      {id:6,savol:"Tavassut (o'rta) harflari: ل ن ع م ر — ularning soni?",variantlar:["3 ta","4 ta","5 ta","6 ta"],togri:2},
      {id:7,savol:"'لِنْ عُمَرْ' qaysi sifatni eslatadi?",variantlar:["Izloq","Isti'lo","Tavassut","Itboq"],togri:2},
      {id:8,savol:"Shadid harflari nechtasi?",variantlar:["5 ta","6 ta","7 ta","8 ta"],togri:3},
      {id:9,savol:"'فَرَّ مِنْ لُبٍّ' qaysi sifat uchun?",variantlar:["Itboq","Isti'lo","Hams","Izloq"],togri:3},
      {id:10,savol:"Itboq harflari Isti'lo ichida qanday hisoblanadi?",variantlar:["Eng ingichka","Eng qalin (Isti'lo ichidagi Isti'lo)","Tavassut","Raxv"],togri:1},
    ]
  },
  {
    id: 10,
    nomi: "Sifat Ilmi — 7 Mustaqil Sifat",
    icon: "ر",
    color: "green",
    mavzu: `# Sifat Ilmi — 7 Mustaqil Sifat

Bu 7 sifatning **ziddi yo'q** — ular alohida, mustaqil xususiyatlardir.

---

## 1 — صَفِير (Safir) — Hushtak

Hushtak singari ingichka tovush:

| Harf | Xususiyati |
|------|-----------|
| **س** | Jarangsiz hushtak |
| **ز** | Jarangli hushtak |
| **ص** | Qalin hushtak |

**Misol:** سَلَام (salaam), زَيْت (zayt), صَبْر (sabr)

---

## 2 — لِين (Lin) — Yumshoqlik

و va ي harflari **sukun**da bo'lib, oldidagi harf **fatha** bo'lsa — yumshoq va oson chiqadi:

| Arab | O'qilishi | Lin harfi |
|------|-----------|---------|
| بَيْت | bayt | ي sukunda |
| خَوْف | xawf | و sukunda |
| لَيْل | layl | ي sukunda |

---

## 3 — اِنْحِرَاف (Inhiraf) — Og'ish

Til yon tomonga og'adi:

| Harf | Og'ish tomoni |
|------|--------------|
| **ل** | Til yonga og'ib havo yon tomonga |
| **ر** | Til bukilib, biroz og'adi |

---

## 4 — تَكْرِير (Takrir) — Titrash

Faqat **ر** — til uci titradi. **Aslida bir marta titrash kerak** (ko'p titrash xato).

**Misol:** رَبَّنَا (rabbana) — ر bir marta titrash

---

## 5 — تَفَشِّي (Tafashi) — Yoyilish

Faqat **ش** — havo og'izda keng yoyiladi.

**Misol:** شَمْس (shams), شُكْر (shukr)

---

## 6 — اِسْتِطَالَة (Istitoyla) — Uzayish

Faqat **ض** — tilning yoni uzayib tishga tegadi.

**Misol:** ضَرَبَ (daraba), رِيَاضَة (riyaada — sport)

---

## 7 — غُنَّة (G'unna) — Burun Tovushi

**ن va م** harflari maxsus holatlarda **2 harakat** davom etadigan burun tovushi beradi.

| Holat | G'unna |
|-------|--------|
| ن yoki م shaddali | 2 hisob (kuchli) |
| Ixfo va Iqlab holida | 2 hisob (o'rtacha) |
| Idg'om bilan g'unna | 2 hisob |

---

## Xulosa

| Sifat | Harf(lar) | Xususiyati |
|-------|---------|-----------|
| Safir | ز س ص | Hushtak |
| Lin | و ي | Sukunda, yumshoq |
| Inhiraf | ل ر | Og'ish |
| Takrir | ر | Titrash |
| Tafashi | ش | Yoyilish |
| Istitoyla | ض | Uzayish |
| G'unna | ن م | Burun, 2 hisob |`,
    vazifalar: [
      {id:1,savol:"Safir sifatidagi harflar:",variantlar:["ن م ل","ز س ص","ر ل ن","ب و ف"],togri:1},
      {id:2,savol:"Lin sifati qachon bo'ladi?",variantlar:["و ي sukunda, oldida fatha","و ي fathali","و ي kasrali","و ي shaddali"],togri:0},
      {id:3,savol:"Takrir sifati faqat qaysi harfda?",variantlar:["ل","ن","ر","م"],togri:2},
      {id:4,savol:"Tafashi sifati qaysi harf?",variantlar:["ص","ض","ش","س"],togri:2},
      {id:5,savol:"Istitoyla — qaysi harf va nima xususiyati?",variantlar:["ر — titrash","ش — yoyilish","ض — uzayish","ل — og'ish"],togri:2},
      {id:6,savol:"G'unna necha harakat davom etadi?",variantlar:["1","2","3","4"],togri:1},
      {id:7,savol:"بَيْت so'zidagi ي da qaysi mustaqil sifat bor?",variantlar:["Safir","Lin","Takrir","Tafashi"],togri:1},
      {id:8,savol:"Inhiraf sifatidagi harflar:",variantlar:["ز و ي","ش ص ض","ل ر","ن م"],togri:2},
      {id:9,savol:"7 mustaqil sifatning ziddi bormi?",variantlar:["Ha, bor","Yo'q, ularning ziddi yo'q","Faqat ba'zilarining","Hammaning ziddi bor"],togri:1},
      {id:10,savol:"ض harfida qaysi mustaqil sifat bor?",variantlar:["Safir","Lin","Tafashi","Istitoyla"],togri:3},
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
| آدَم | أَاْدَم | aadam |

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
| إ | Kasra bilan | إِسْلَام (islaam) |
| ؤ | O'rtada damma | يُؤْمِن (yu'min) |
| ئ | O'rtada kasra | بِئْر (bi'r) |
| ء | So'z oxirida | شَيْء (shay') |

### Misollar:

| Arab | O'qilishi | Izoh |
|------|-----------|------|
| أَكَلَ | akala | Hamzatul Qat' — boshi |
| إِسْلَام | islaam | Hamzatul Qat' — boshi |
| يُؤْمِن | yu'minu | Hamzatul Qat' — o'rta |
| قُرْآن | Qur'aan | Hamzatul Qat' — o'rta |

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
      {id:3,savol:"إِسْلَام so'zidagi bosh hamza qaysi tur?",variantlar:["Hamzatul Vasl","Hamzatul Qat'","Alif Layyina","Ta Marbuta"],togri:1},
      {id:4,savol:"اَلْكِتَاب so'zidagi bosh hamza qaysi tur?",variantlar:["Hamzatul Qat'","Hamzatul Vasl","Alif Layyina","Hamza yo'q"],togri:1},
      {id:5,savol:"قُلِ اسْمَهُ da اِسْم ning boshi qanday o'qiladi?",variantlar:["is-mahu","qulis-mahu (tushadi)","qul-ismahu","i-smahu"],togri:1},
      {id:6,savol:"أَكَلَ so'zidagi hamza qaysi tur?",variantlar:["Hamzatul Vasl","Hamzatul Qat'","Ta Marbuta","Alif Layyina"],togri:1},
      {id:7,savol:"Hamzatul Vasl qayerda topiladi?",variantlar:["So'z o'rtasi va oxirida","Faqat so'z boshida","Istalgan joyda","Faqat so'z oxirida"],togri:1},
      {id:8,savol:"يُؤْمِن so'zidagi و ustidagi hamza qaysi tur?",variantlar:["Hamzatul Vasl","Hamzatul Qat'","Alif Mad","G'unna"],togri:1},
      {id:9,savol:"اِبْن so'zi yolg'iz bo'lganda qanday boshlanadi?",variantlar:["Fatha bilan (ab-n)","Kasra bilan (ib-n)","Damma bilan (ub-n)","Sukun bilan"],togri:1},
      {id:10,savol:"Hamzatul Qat' va Hamzatul Vasl farqi:",variantlar:["Farqi yo'q","Qat' doim aytiladi, Vasl biriktirilganda tushadi","Vasl doim aytiladi, Qat' tushadi","Ikkalasi ham doim tushadi"],togri:1},
    ]
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
| ر fatha olsa | رَبَّنَا | Ra fatha — qalin |
| ر damma olsa | رُحَمَاء | Ra damma — qalin |
| ر sukunda, oldida fatha | مَرْيَم | ر sukun, م fatha |
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
| صَلَاة | salaah | ص qalin |
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
      {id:7,savol:"رَبَّنَا so'zida ر qanday o'qiladi?",variantlar:["Tarqiq — kasra yaqin","Tafxim — ra fatha","G'unna","Qalqala"],togri:1},
      {id:8,savol:"قِرْطَاس da ر sukunda, oldida kasra — lekin qanday o'qiladi?",variantlar:["Tarqiq — kasra bor","Tafxim — ق Isti'lo harfi bor","G'unna","Qalqala"],togri:1},
      {id:9,savol:"صَلَاة so'zida ص harfi qanday sifatga ega?",variantlar:["Tarqiq","Tafxim","G'unna","Lin"],togri:1},
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
    ]
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
| وَقَالَتِ اخْرُجْ | wa-qaalatix-ruj | ت → kasra (odatiy) |
| مِنَ الْجَنَّة | minaljannat | ن → kasra |

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
];
