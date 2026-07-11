import type { DasturOy } from "./types";
import { T } from "../theme/tokens";

export const DASTUR: DasturOy[] = [
  {
    oy: 1,
    nomi: "1-OY: Arab Yozuvi va Birinchi Harflar",
    color: T.gGreen,
    imtihon: "Arab yozuvi, 4 ta harakat, tanvin, shaddah, maxsus harflar va أ–ش (Amaliy 1–6) bo'yicha yozma+og'zaki test",
    haftalar: [
      {
        h: 1,
        mavzu: "Nazariy 1–2 + Amaliy 1 (أ ب ت — Jahr va Hams)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 1: Arab yozuviga kirish — alifbo, yo'nalish, ulash qoidalari",
            m: "Harflarni tanish va alifboni ko'chirish",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 2: 4 ta asosiy harakat — fatha, kasra, damma, sukun",
            m: "Harakatli bo'g'inlarni o'qish va yozish mashqi",
          },
          {
            k: "Juma",
            d: "Amaliy Bob 1 (Jahr va Hams): أ (Hamza), ب (Ba) va ت (Ta) — maxraj, sifat, shakl",
            m: "أ ب ت ni barcha harakatlar bilan yozish va o'qish",
          },
        ],
        imtihon: "Test: alifbo tartibi + harakatlar + أ ب ت o'qish",
      },
      {
        h: 2,
        mavzu: "Nazariy 3–4 + Amaliy 2–3 (ج ث | ح خ)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 3: Tanvin (AN, IN, UN) — qoidalari va yozilishi; Amaliy Bob 2 (Shadid va Raxv): ج (Jim) va ث (Sa)",
            m: "Tanvinli so'zlarni o'qish; ج ث ni yozish va talaffuz mashqi",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 4: Shaddah — ta'rifi, yozilishi va talaffuzi; Amaliy Bob 3 (Iste'lo va Istefol): ح (Ha) va خ (Xo)",
            m: "Shaddalik so'zlarni o'qish; ح خ maxraj va sifatini o'rganish",
          },
          {
            k: "Juma",
            d: "Hafta takrori: tanvin, shaddah, ج ث ح خ birgalikda o'qish",
            m: "Diktant: tanvinli va shaddalik so'zlar",
          },
        ],
        imtihon: "Blooket: tanvin + shaddah + ج ث ح خ harflari",
      },
      {
        h: 3,
        mavzu: "Nazariy 5 + Amaliy 4–5 (ذ د | ز ر)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 5: Ta marbuta, Alif layyina, Hamzatul vasl — qoidalar va misollar; Amaliy Bob 4 (Itbaq va Infitah): ذ (Zal) va د (Dal)",
            m: "Maxsus harflarni aniqlash; ذ د ni yozish va o'qish",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 5 (Izlaq va Ismat): ز (Zayn) va ر (Ra) — maxraj, sifat, shakl va so'zlardagi qo'llanishi",
            m: "ز ر bilan tuzilgan so'zlarni o'qish va talaffuz mashqi",
          },
          {
            k: "Juma",
            d: "Hafta takrori: Nazariy 5 + ذ د ز ر birgalikda o'qish va yozish",
            m: "So'z tuzish mashqi: ذ د ز ر ishtirokida",
          },
        ],
        imtihon: "Test: ta marbuta + alif layyina + hamzatul vasl + ذ د ز ر harflari",
      },
      {
        h: 4,
        mavzu: "Amaliy 6 (ش س — Sin va Shin) + 1-Oy Takrori",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 6 (Sin va Shin): ش (Shin) va س (Sin) — maxraj, sifat, to'rt shakl va so'zlar",
            m: "ش س ni barcha harakatlar bilan yozish, so'z tuzish",
          },
          {
            k: "Chorshanba",
            d: "1-oy umumiy takrori: Nazariy 1–5 qoidalari va Amaliy 1–6 harflari",
            m: "O'qish va yozish: harakatlar, tanvin, shaddah, maxsus harflar",
          },
          {
            k: "Juma",
            d: "1-oy imtihoniga tayyorgarlik: barcha o'tilgan mavzular bo'yicha diktant",
            m: "Diktant va og'zaki so'rov: أ–ش harflari va asosiy qoidalar",
          },
        ],
        imtihon: "1-OY IMTIHONI: Nazariy 1–5 + Amaliy 1–6 (أ ب ت ث ج ح خ د ذ ر ز س ش) yozma+og'zaki",
      },
    ],
  },
  {
    oy: 2,
    nomi: "2-OY: Qolgan Harflar va Maxraj Ilmi",
    color: T.gDeep,
    imtihon: "Barcha 28 arab harfi (Amaliy 7–13) + Nazariy 6–8 maxraj ilmi bo'yicha yozma+og'zaki test",
    haftalar: [
      {
        h: 5,
        mavzu: "Amaliy 7–8 (ص ض | ط ظ) + Nazariy 6 (Maxraj: Jawf+Halq)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 7 (Sod va Zod): ص (Sod) va ض (Dod) — maxraj, sifat, shakl va so'zlardagi qo'llanishi",
            m: "ص ض yozish, so'zlar bilan o'qish mashqi",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 8 (To va Zo): ط (To) va ظ (Zo) — maxraj, sifat, shakl va talaffuz",
            m: "ط ظ ni barcha harakatlar bilan yozish va o'qish",
          },
          {
            k: "Juma",
            d: "Nazariy 6: Maxraj — Jawf (bo'shliq harflari) va Halq (tomoq harflari)",
            m: "Jawf va Halq harflarini maxrajiga ko'ra guruhlash va talaffuz",
          },
        ],
        imtihon: "Test: ص ض ط ظ + Jawf va Halq maxrajlari",
      },
      {
        h: 6,
        mavzu: "Amaliy 9–10 (ع غ | ف ق) + Nazariy 7 (Maxraj: Lison)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 9 (Ayn va G'ayn): ع (Ayn) va غ (G'ayn) — maxraj, sifat, shakl va so'zlar",
            m: "ع غ ni yozish va o'qish, ع talaffuziga alohida e'tibor",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 10 (Fa va Qof): ف (Fa) va ق (Qof) — maxraj, sifat, shakl va so'zlar",
            m: "ف ق bilan so'z tuzish va o'qish mashqi",
          },
          {
            k: "Juma",
            d: "Nazariy 7: Maxraj — Lison (til harflari): til uchi, o'rtasi, yon va orqa qismi",
            m: "Lison harflarini maxrajiga ko'ra guruhlash va talaffuz taqqoslash",
          },
        ],
        imtihon: "Blooket: ع غ ف ق + Lison maxrajlari",
      },
      {
        h: 7,
        mavzu: "Amaliy 11–12 (ك ل | م ن) + Nazariy 8 (Maxraj: Shafatayn+Xayshum)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 11 (Kof va Lam): ك (Kof) va ل (Lom) — maxraj, sifat, shakl va so'zlar",
            m: "ك ل yozish va o'qish; ك va ق farqini talaffuzda o'rgatish",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 12 (Mim va Nun): م (Mim) va ن (Nun) — maxraj, sifat, shakl va so'zlar",
            m: "م ن bilan so'z tuzish va o'qish mashqi",
          },
          {
            k: "Juma",
            d: "Nazariy 8: Maxraj — Shafatayn (lab harflari: ب م و ف) va Xayshum (g'unna)",
            m: "Lab harflari va xayshum talaffuzini mashq qilish",
          },
        ],
        imtihon: "Test: ك ل م ن + Shafatayn va Xayshum maxrajlari",
      },
      {
        h: 8,
        mavzu: "Amaliy 13 (ه و ي) + 2-Oy Takrori",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 13 (Ha, Wow va Ya): ه (Ha), و (Vov) va ي (Ya) — maxraj, sifat, shakl",
            m: "ه و ي yozish va o'qish — 28 ta harf yakunlandi!",
          },
          {
            k: "Chorshanba",
            d: "2-oy umumiy takrori: Amaliy 7–13 harflari va Nazariy 6–8 maxraj ilmi",
            m: "Barcha 28 harfni maxrajiga ko'ra talaffuz qilish va yozish",
          },
          {
            k: "Juma",
            d: "2-oy imtihoniga tayyorgarlik: 28 harf diktanti va maxraj bo'yicha og'zaki so'rov",
            m: "Diktant va og'zaki: barcha 28 harf + Jawf, Halq, Lison, Shafatayn, Xayshum",
          },
        ],
        imtihon: "2-OY IMTIHONI: Barcha 28 harf (Amaliy 1–13) + Nazariy 6–8 maxraj ilmi yozma+og'zaki",
      },
    ],
  },
  {
    oy: 3,
    nomi: "3-OY: Sifat Ilmi va Mad Qoidalari",
    color: T.gGreen,
    imtihon: "Nazariy 9–14: sifat ilmi (juft va mustaqil sifatlar), mad tabiiy, mad faro'iy, shamsiyya/qamariyya va qalqala bo'yicha test",
    haftalar: [
      {
        h: 9,
        mavzu: "Nazariy 9–10: Sifat Ilmi",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 9: Sifat — 5 ta juft sifat (Jahr/Hams, Shidda/Rixa, Isti'lo/Istifol, Ithbaq/Infitoh, Izlaq/Ismat)",
            m: "Juft sifatlarni yodlash va har bir sifatga misol harflar",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 10: Sifat — 7 ta mustaqil sifat (Safir, Qalqala, Lin, Inhiraf, Takrir, Tafasshi, Istitola)",
            m: "Mustaqil sifatlarni yodlash va harflar bilan bog'lash",
          },
          {
            k: "Juma",
            d: "Sifat ilmi takrori: har bir harfning sifatlarini kompleks o'rganish",
            m: "Sifat kartochkalari bilan mashq; harfni eshitib sifatini aytish",
          },
        ],
        imtihon: "Test: 5 juft sifat + 7 mustaqil sifat va ularga tegishli harflar",
      },
      {
        h: 10,
        mavzu: "Nazariy 11–12: Mad Tabiiy va Mad Faro'iy",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 11: Mad Tabiiy (asliy mad) — و ي ا harflar bilan, ikki harakat uzunligi",
            m: "Mad tabiiy bo'lgan so'zlarni topish va 2 harakat bilan o'qish",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 12: Mad Faro'iy — Mad Muttasil, Mad Munfasil, Mad Lazim va boshqa turlari",
            m: "Mad faro'iy turlarini misollar bilan o'rganish va talaffuz",
          },
          {
            k: "Juma",
            d: "Mad qoidalari takrori: mad tabiiy va mad faro'iy farqi, misollar bilan mustahkamlash",
            m: "Qisqa matn o'qib madlarni belgilash va uzunliklarini aniqlash",
          },
        ],
        imtihon: "Blooket: Mad Tabiiy vs Mad Faro'iy — turlarini aniqlash va o'qish",
      },
      {
        h: 11,
        mavzu: "Nazariy 13–14: Shamsiyya/Qamariyya va Qalqala",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 13: Shamsiyya va Qamariyya harflari — ال artikli bilan talaffuz farqlari",
            m: "14 shamsiyya va 14 qamariyya harfni yodlash va so'zlarda aniqlash",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 14: Qalqala — ta'rifi, 5 ta qalqala harfi (ق ط ب ج د) va kuchsiz/kuchli qalqala",
            m: "Qalqala harflarini sukunli holda o'qish va sezish mashqi",
          },
          {
            k: "Juma",
            d: "Hafta takrori: Shamsiyya/Qamariyya + Qalqala birgalikda o'rganish",
            m: "Matn o'qib: ال talaffuzini va qalqala pozitsiyalarini belgilash",
          },
        ],
        imtihon: "Test: Shamsiyya/Qamariyya + 5 Qalqala harfi va ularning qoidalari",
      },
      {
        h: 12,
        mavzu: "3-Oy Takrori va Imtihon",
        kunlar: [
          {
            k: "Dushanba",
            d: "Takror 1: Nazariy 9–10 (sifat ilmi) — juft va mustaqil sifatlarni murakkab misollar bilan",
            m: "Sifat testi: harfni ko'rib barcha sifatlarini sanash",
          },
          {
            k: "Chorshanba",
            d: "Takror 2: Nazariy 11–12 (mad) va Nazariy 13–14 (shamsiyya/qamariyya, qalqala)",
            m: "Qisqa arab matnlari bo'yicha mad, shamsiyya/qamariyya, qalqala mashqi",
          },
          {
            k: "Juma",
            d: "3-oy imtihoniga tayyorgarlik: Nazariy 9–14 bo'yicha umumiy takror va mock test",
            m: "Mock test: sifat, mad, shamsiyya/qamariyya, qalqala savollari",
          },
        ],
        imtihon: "3-OY IMTIHONI: Nazariy 9–14 (sifat ilmi, mad tabiiy+faro'iy, shamsiyya/qamariyya, qalqala) yozma+og'zaki",
      },
    ],
  },
  {
    oy: 4,
    nomi: "4-OY: Tajwid Qoidalari",
    color: T.gDeep,
    imtihon: "Nazariy 15–20: nun sakin qoidalari, hamzatul vasl/qat', tafxim/tarqiq, vaqf/vasl, iltiqo sakinayn bo'yicha to'liq test",
    haftalar: [
      {
        h: 13,
        mavzu: "Nazariy 15–16: Nun Sakin Qoidalari",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 15: Nun Sakin — Izhor (aniq talaffuz, 6 halq harfi bilan) va Idg'om (kiritish, ي ر م ل و ن bilan)",
            m: "Izhor va Idg'om misollarini topish, farqlash va o'qish",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 16: Nun Sakin — Iqlab (ب oldida م ga aylanishi) va Ixfo (yashirish, 15 harf bilan)",
            m: "Iqlab va Ixfo misollarini topish va g'unna bilan o'qish",
          },
          {
            k: "Juma",
            d: "Nun sakin 4 qoidasi takrori: Izhor, Idg'om, Iqlab, Ixfo — misollar bilan mustahkamlash",
            m: "Matn o'qib nun sakin qoidasini belgilash va talaffuz",
          },
        ],
        imtihon: "Test: Nun Sakin — Izhor, Idg'om, Iqlab, Ixfo qoidalari va misollar",
      },
      {
        h: 14,
        mavzu: "Nazariy 17–18: Hamzatul Vasl/Qat' va Tafxim/Tarqiq",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 17: Hamzatul Vasl (bog'lovchi hamza — so'z boshida talaffuz qilinadi, o'rtada tushiriladi) va Hamzatul Qat' (har doim talaffuz qilinadi)",
            m: "Hamzatul vasl va qat' ni so'zlarda aniqlash va to'g'ri o'qish",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 18: Tafxim (yo'g'on talaffuz) va Tarqiq (ingichka talaffuz) — qoidalari va tegishli harflar",
            m: "Tafxim harflarini (ص ض ط ظ غ خ ق ر ل) va tarqiq holatlarini o'rganish",
          },
          {
            k: "Juma",
            d: "Hafta takrori: Hamzatul vasl/qat' + Tafxim/Tarqiq birgalikda amaliyot",
            m: "Matn o'qib hamza turini va tafxim/tarqiq pozitsiyalarini belgilash",
          },
        ],
        imtihon: "Blooket: Hamzatul Vasl vs Qat' + Tafxim va Tarqiq qoidalari",
      },
      {
        h: 15,
        mavzu: "Nazariy 19–20: Vaqf/Vasl va Iltiqo Sakinayn",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 19: Vaqf (to'xtatish) va Vasl (davom etish) — qoidalari, vaqf belgilari va to'xtash joylari",
            m: "Matn o'qib vaqf belgilarini aniqlash va to'g'ri to'xtatish mashqi",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 20: Iltiqo Sakinayn (ikki sukunning uchrashuvi) va Yakuniy tajwid qoidalari",
            m: "Iltiqo sakinayn misollarini topish va yechimini o'rganish",
          },
          {
            k: "Juma",
            d: "Tajwid qoidalari umumiy takrori: Nazariy 15–20 barcha mavzular birgalikda",
            m: "Qisqa arab matnlarini to'liq tajwid bilan o'qish amaliyoti",
          },
        ],
        imtihon: "Test: Vaqf/Vasl belgilari + Iltiqo Sakinayn + Nazariy 15–20 umumiy",
      },
      {
        h: 16,
        mavzu: "4-Oy Takrori va Imtihon",
        kunlar: [
          {
            k: "Dushanba",
            d: "Takror 1: Nazariy 15–16 (Nun Sakin: Izhor, Idg'om, Iqlab, Ixfo) — murakkab misollar",
            m: "Nun sakin qoidalarini arab matnlaridan aniqlash va og'zaki izohlash",
          },
          {
            k: "Chorshanba",
            d: "Takror 2: Nazariy 17–20 (Hamzatul vasl/qat', Tafxim/Tarqiq, Vaqf/Vasl, Iltiqo Sakinayn)",
            m: "Barcha tajwid qoidalarini birgalikda qo'llab matn o'qish",
          },
          {
            k: "Juma",
            d: "4-oy imtihoniga tayyorgarlik: Nazariy 15–20 bo'yicha umumiy takror va mock test",
            m: "Mock test: barcha tajwid qoidalari savollari + amaliy o'qish",
          },
        ],
        imtihon: "4-OY IMTIHONI: Nazariy 15–20 (Nun Sakin, Hamzatul Vasl/Qat', Tafxim/Tarqiq, Vaqf/Vasl, Iltiqo Sakinayn) yozma+og'zaki",
      },
    ],
  },
  {
    oy: 5,
    nomi: "4.5-OY: Yakuniy Mustahkamlash",
    color: T.gLime,
    imtihon: "YAKUNIY IMTIHON: barcha 28 harf, maxraj, sifat, mad, shamsiyya/qamariyya, qalqala, tajwid qoidalari bo'yicha to'liq yozma+og'zaki+amaliy o'qish",
    haftalar: [
      {
        h: 17,
        mavzu: "Kurs Takrori: Harflar, Maxraj, Sifat, Mad, Tajwid",
        kunlar: [
          {
            k: "Dushanba",
            d: "Takror 1: 28 harf (Amaliy 1–13) + Maxraj ilmi (Nazariy 6–8) — harflarni maxrajiga ko'ra guruhlash",
            m: "Barcha harflarni maxrajiga ko'ra shart-jadvali bilan takrorlash",
          },
          {
            k: "Chorshanba",
            d: "Takror 2: Sifat ilmi (Nazariy 9–10) + Mad qoidalari (Nazariy 11–12) + Shamsiyya/Qamariyya va Qalqala (Nazariy 13–14)",
            m: "Sifat, mad, qalqala qoidalarini arab matnlaridan aniqlash amaliyoti",
          },
          {
            k: "Juma",
            d: "Takror 3: Barcha tajwid qoidalari (Nazariy 15–20) — Nun Sakin, Hamzatul Vasl/Qat', Tafxim/Tarqiq, Vaqf/Vasl, Iltiqo Sakinayn",
            m: "Arab matnlarini to'liq tajwid bilan o'qish va qoidalarni izohlash",
          },
        ],
        imtihon: "Blooket: barcha kurs — harflar, maxraj, sifat, mad, tajwid savollari aralash",
      },
      {
        h: 18,
        mavzu: "Yakuniy Imtihon Tayyorgarligi",
        kunlar: [
          {
            k: "Dushanba",
            d: "Yakuniy tayyorgarlik 1: yozma qism — harflar diktanti, qoidalar blankasini to'ldirish",
            m: "Diktant: 28 harf + maxraj, sifat, mad, tajwid savollari yozma javob",
          },
          {
            k: "Chorshanba",
            d: "Yakuniy tayyorgarlik 2: og'zaki va amaliy qism — harakatsiz matnni tajwidli o'qish",
            m: "Mock imtihon: harakatsiz arab matni o'qish, barcha qoidalarni qo'llash",
          },
          {
            k: "Juma",
            d: "YAKUNIY IMTIHON: yozma + og'zaki + amaliy o'qish — kurs davomida o'tilgan barcha mavzular",
            m: "Yakuniy imtihon: yozma test + og'zaki so'rov + arab matnlarini tajwidli o'qish",
          },
        ],
        imtihon: "YAKUNIY IMTIHON: Nazariy 1–20 + Amaliy 1–13 — to'liq yozma, og'zaki va amaliy baholash",
      },
    ],
  },
];
