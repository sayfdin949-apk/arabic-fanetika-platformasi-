import type { GramDars, GramDarajaInfo } from "./gramTypes";

export const GRAM_DARSLAR: GramDars[] = [
  {
    id: 1,
    nomi: "Ismlar — Muzakkar va Muannash",
    daraja: "A1",
    icon: "🏷️",
    rang: "#2563EB",
    mavzu: "Arabchada ism jinslari: erkak va ayol shakllari",
    qoida: [
      {
        sarlavha: "Arabchada ism jinsi",
        tavsif:
          "Arabchada har bir ism muzakkar (erkak) yoki muannash (ayol) jinsiga mansub. " +
          "Muannash ismlar ko'pincha ة (ta marbutah) harfi bilan tugaydi.",
        jadval: [
          { arabcha: "مُعَلِّم", oqilishi: "muallim", tarjima: "o'qituvchi (erkak)", izoh: "muzakkar" },
          { arabcha: "مُعَلِّمَة", oqilishi: "muallimat", tarjima: "o'qituvchi (ayol)", izoh: "muannash — ة qo'shildi" },
          { arabcha: "طَالِب", oqilishi: "tolib", tarjima: "o'quvchi (erkak)", izoh: "muzakkar" },
          { arabcha: "طَالِبَة", oqilishi: "toliba", tarjima: "o'quvchi (ayol)", izoh: "muannash — ة qo'shildi" },
          { arabcha: "مُدِير", oqilishi: "mudir", tarjima: "direktor (erkak)", izoh: "muzakkar" },
          { arabcha: "مُدِيرَة", oqilishi: "mudira", tarjima: "direktor (ayol)", izoh: "muannash — ة qo'shildi" },
          { arabcha: "صَدِيق", oqilishi: "sadiq", tarjima: "do'st (erkak)", izoh: "muzakkar" },
          { arabcha: "صَدِيقَة", oqilishi: "sadiqa", tarjima: "do'st (ayol)", izoh: "muannash — ة qo'shildi" },
        ],
        misol: [
          "كِتَاب (kitob) — muzakkar, ة yo'q",
          "شَجَرَة (daraxt) — muannash, ة bilan tugaydi",
          "يَد (qo'l) — muannash (ma'no jihatdan)",
        ],
      },
      {
        sarlavha: "Qoida yodlash",
        tavsif:
          "Agar ismning oxirida ة bo'lsa — u muannash. " +
          "Agar ة bo'lmasa — odatda muzakkar. " +
          "Lekin ba'zi istisnolar bor: ayrim jufta a'zolar (ko'z, qo'l, oyoq) va mamlakatlar muannash bo'ladi.",
        misol: [
          "مَدْرَسَة = maktab (muannash, ة bor)",
          "بَيْت = uy (muzakkar, ة yo'q)",
          "سَيَّارَة = mashina (muannash, ة bor)",
          "قَلَم = qalam (muzakkar, ة yo'q)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "هَذَا مُعَلِّمٌ", oqilishi: "Haza muallimun", tarjima: "Bu o'qituvchi (erkak)" },
      { arabcha: "هَذِهِ مُعَلِّمَةٌ", oqilishi: "Hazihi muallimatun", tarjima: "Bu o'qituvchi (ayol)" },
      { arabcha: "الطَّالِبُ مُجْتَهِدٌ", oqilishi: "At-tolibu mujtahidun", tarjima: "O'quvchi (erkak) tirishqoq" },
      { arabcha: "الطَّالِبَةُ مُجْتَهِدَةٌ", oqilishi: "At-tolibatu mujtahidatun", tarjima: "O'quvchi (ayol) tirishqoq" },
      { arabcha: "الْكِتَابُ جَدِيدٌ", oqilishi: "Al-kitobu jadidun", tarjima: "Kitob yangi" },
      { arabcha: "السَّيَّارَةُ سَرِيعَةٌ", oqilishi: "As-sayyaratu sari'atun", tarjima: "Mashina tez" },
    ],
    istima: [
      { arabcha: "مُعَلِّم", oqilishi: "muallim", tarjima: "o'qituvchi (erkak)", izoh: "m-u-a-ll-i-m" },
      { arabcha: "مُعَلِّمَة", oqilishi: "muallimat", tarjima: "o'qituvchi (ayol)", izoh: "m-u-a-ll-i-m-a-t" },
      { arabcha: "طَالِب", oqilishi: "tolib", tarjima: "o'quvchi (erkak)", izoh: "t-o-l-i-b" },
      { arabcha: "طَالِبَة", oqilishi: "toliba", tarjima: "o'quvchi (ayol)", izoh: "t-o-l-i-b-a" },
      { arabcha: "مَدْرَسَة", oqilishi: "madrasa", tarjima: "maktab", izoh: "m-a-d-r-a-s-a" },
      { arabcha: "سَيَّارَة", oqilishi: "sayyara", tarjima: "mashina", izoh: "s-a-yy-a-r-a" },
    ],
    kitoba: [
      { topshiriq: "مُعَلِّم so'zining muannash shaklini yozing", misol: "→ مُعَلِّمَة" },
      { topshiriq: "طَالِب so'zining muannash shaklini yozing", misol: "→ طَالِبَة" },
      { topshiriq: "مُدِير so'zining muannash shaklini yozing", misol: "→ مُدِيرَة" },
      { topshiriq: "Quyidagi ismlardan muannashlarini aniqlang: كِتَاب، مَدْرَسَة، قَلَم، شَجَرَة، بَيْت", misol: "→ مَدْرَسَة, شَجَرَة" },
    ],
    test: [
      { savol: "طَالِبَة so'zi qaysi jinsga mansub?", variantlar: ["Muzakkar", "Muannash", "Ikkisi ham", "Hech biri"], togri: 1 },
      { savol: "Muannash ismlar odatda qaysi harf bilan tugaydi?", variantlar: ["ب", "ة", "ن", "م"], togri: 1 },
      { savol: "مُدِير so'zining muannash shakli qaysi?", variantlar: ["مُدِيرُون", "مُدِيرَة", "الْمُدِير", "مُدَرِّس"], togri: 1 },
      { savol: "كِتَاب so'zi qaysi jinsga mansub?", variantlar: ["Muzakkar", "Muannash", "Ikkalasi", "Aniqlab bo'lmaydi"], togri: 0 },
      { savol: "Quyidagilardan qaysi biri muannash?", variantlar: ["بَاب", "قَلَم", "مَدْرَسَة", "طَالِب"], togri: 2 },
    ],
  },

  {
    id: 2,
    nomi: "Shaxs olmoshlari",
    daraja: "A1",
    icon: "👤",
    rang: "#7C3AED",
    mavzu: "أنا، أنتَ، هو — men, sen, u va boshqa olmoshlar",
    qoida: [
      {
        sarlavha: "Yagona shaxs olmoshlari",
        tavsif:
          "Arabchada shaxs olmoshlari jins va songa ko'ra farqlanadi. " +
          "Birinchi shaxs (men/biz), ikkinchi shaxs (sen), uchinchi shaxs (u).",
        jadval: [
          { arabcha: "أنا", oqilishi: "ana", tarjima: "Men", izoh: "1-shaxs yagona" },
          { arabcha: "أنتَ", oqilishi: "anta", tarjima: "Sen (erkak)", izoh: "2-shaxs yagona erkak" },
          { arabcha: "أنتِ", oqilishi: "anti", tarjima: "Sen (ayol)", izoh: "2-shaxs yagona ayol" },
          { arabcha: "هو", oqilishi: "huva", tarjima: "U (erkak)", izoh: "3-shaxs yagona erkak" },
          { arabcha: "هي", oqilishi: "hiya", tarjima: "U (ayol)", izoh: "3-shaxs yagona ayol" },
        ],
      },
      {
        sarlavha: "Ko'plik shaxs olmoshlari",
        tavsif: "Ko'plikda ham jins bo'yicha farqlanish saqlanadi.",
        jadval: [
          { arabcha: "نَحْنُ", oqilishi: "nahnu", tarjima: "Biz", izoh: "1-shaxs ko'plik" },
          { arabcha: "أنتُمْ", oqilishi: "antum", tarjima: "Sizlar (erkaklar)", izoh: "2-shaxs ko'plik erkak" },
          { arabcha: "أنتُنَّ", oqilishi: "antunna", tarjima: "Sizlar (ayollar)", izoh: "2-shaxs ko'plik ayol" },
          { arabcha: "هُمْ", oqilishi: "hum", tarjima: "Ular (erkaklar)", izoh: "3-shaxs ko'plik erkak" },
          { arabcha: "هُنَّ", oqilishi: "hunna", tarjima: "Ular (ayollar)", izoh: "3-shaxs ko'plik ayol" },
        ],
        misol: [
          "أنتُمَا (antuma) — Ikkalangiz (juft shakl)",
          "هُمَا (huma) — Ikkalasi (juft shakl, erkak va ayol uchun ham)",
        ],
      },
    ],
    qiroa: [
      { arabcha: "أنا طَالِبٌ", oqilishi: "Ana tolibun", tarjima: "Men o'quvchiman" },
      { arabcha: "أنتَ مُعَلِّمٌ", oqilishi: "Anta muallimun", tarjima: "Sen o'qituvchisan (erkak)" },
      { arabcha: "هو مُدِيرٌ", oqilishi: "Huva mudirun", tarjima: "U direktorda (erkak)" },
      { arabcha: "هي طَبِيبَةٌ", oqilishi: "Hiya tabibatun", tarjima: "U shifokor (ayol)" },
      { arabcha: "نَحْنُ أصدقاءُ", oqilishi: "Nahnu asdiqa'u", tarjima: "Biz do'stmiz" },
      { arabcha: "هُمْ طُلَّابٌ", oqilishi: "Hum tullabun", tarjima: "Ular o'quvchilar" },
    ],
    istima: [
      { arabcha: "أنا", oqilishi: "ana", tarjima: "Men", izoh: "a-na" },
      { arabcha: "أنتَ", oqilishi: "anta", tarjima: "Sen (erkak)", izoh: "an-ta" },
      { arabcha: "أنتِ", oqilishi: "anti", tarjima: "Sen (ayol)", izoh: "an-ti" },
      { arabcha: "هو", oqilishi: "huva", tarjima: "U (erkak)", izoh: "hu-va" },
      { arabcha: "هي", oqilishi: "hiya", tarjima: "U (ayol)", izoh: "hi-ya" },
      { arabcha: "نَحْنُ", oqilishi: "nahnu", tarjima: "Biz", izoh: "nah-nu" },
    ],
    kitoba: [
      { topshiriq: "أنا ishlatib gap tuzing (misol: أنا طَالِبٌ)", misol: "أنا مُعَلِّمٌ — Men o'qituvchiman" },
      { topshiriq: "هو ni هي ga almashtiring: هو مُدِيرٌ → ?", misol: "→ هي مُدِيرَةٌ" },
      { topshiriq: "نَحْنُ ishlatib gap tuzing", misol: "نَحْنُ طُلَّابٌ — Biz o'quvchilamiz" },
      { topshiriq: "Quyidagi olmoshlarni tarjima qiling: أنتَ، هُمْ، هي", misol: "Sen (erkak), Ular (erkaklar), U (ayol)" },
    ],
    test: [
      { savol: "أنتِ olmoshi nimani anglatadi?", variantlar: ["Men", "U (ayol)", "Sen (ayol)", "Biz"], togri: 2 },
      { savol: "Biz arabchada qanday aytiladi?", variantlar: ["أنتُم", "نَحْنُ", "هُمْ", "أنا"], togri: 1 },
      { savol: "هو va هي olmoshlari qanday farqlanadi?", variantlar: ["Sonda", "Jinsda", "Shaxsda", "Farq yo'q"], togri: 1 },
      { savol: "Erkak uchun 2-shaxs yagona olmoshi qaysi?", variantlar: ["أنتِ", "أنتَ", "أنا", "هو"], togri: 1 },
      { savol: "Ular (erkak ko'plik) arabchada qanday?", variantlar: ["هُنَّ", "أنتُم", "هُمْ", "نَحْنُ"], togri: 2 },
    ],
  },

  {
    id: 3,
    nomi: "Ishorali olmoshlar",
    daraja: "A1",
    icon: "👉",
    rang: "#059669",
    mavzu: "هذا، هذه، ذلك، تلك — bu va o'sha",
    qoida: [
      {
        sarlavha: "Yaqin narsalarga ishora",
        tavsif:
          "هذا (haza) — bu (muzakkar ismlar uchun). " +
          "هذه (hazihi) — bu (muannash ismlar uchun). " +
          "Ishorali olmosh jinsda ism bilan mos kelishi shart.",
        jadval: [
          { arabcha: "هَذَا كِتَابٌ", oqilishi: "Haza kitabun", tarjima: "Bu kitob", izoh: "كِتَاب — muzakkar → هذا" },
          { arabcha: "هَذِهِ مَدْرَسَةٌ", oqilishi: "Hazihi madrasatun", tarjima: "Bu maktab", izoh: "مَدْرَسَة — muannash → هذه" },
          { arabcha: "هَذَا قَلَمٌ", oqilishi: "Haza qalamun", tarjima: "Bu qalam", izoh: "قَلَم — muzakkar → هذا" },
          { arabcha: "هَذِهِ سَيَّارَةٌ", oqilishi: "Hazihi sayyaratun", tarjima: "Bu mashina", izoh: "سَيَّارَة — muannash → هذه" },
        ],
      },
      {
        sarlavha: "Uzoq narsalarga ishora",
        tavsif:
          "ذلك (zalika) — u/o'sha (muzakkar). " +
          "تلك (tilka) — u/o'sha (muannash). " +
          "Ko'plik uchun: هؤلاء (ha'ula'i) — bular, أولئك (ula'ika) — o'shalar.",
        jadval: [
          { arabcha: "ذلك", oqilishi: "zalika", tarjima: "U/o'sha (muzakkar)", izoh: "uzoq + muzakkar" },
          { arabcha: "تلك", oqilishi: "tilka", tarjima: "U/o'sha (muannash)", izoh: "uzoq + muannash" },
          { arabcha: "هؤلاء", oqilishi: "ha'ula'i", tarjima: "Bular (ko'plik)", izoh: "yaqin ko'plik" },
          { arabcha: "أولئك", oqilishi: "ula'ika", tarjima: "O'shalar (ko'plik)", izoh: "uzoq ko'plik" },
        ],
        misol: [
          "ذلك بَيْتٌ (Zalika baytun) — O'sha uy",
          "تلك شَجَرَةٌ (Tilka shajaratun) — O'sha daraxt",
        ],
      },
    ],
    qiroa: [
      { arabcha: "هَذَا قَلَمٌ", oqilishi: "Haza qalamun", tarjima: "Bu qalam" },
      { arabcha: "هَذِهِ حَقِيبَةٌ", oqilishi: "Hazihi haqibatun", tarjima: "Bu sumka" },
      { arabcha: "ذَلِكَ بَيْتٌ كَبِيرٌ", oqilishi: "Zalika baytun kabirun", tarjima: "O'sha katta uy" },
      { arabcha: "تِلْكَ سَيَّارَةٌ جَدِيدَةٌ", oqilishi: "Tilka sayyaratun jadidatun", tarjima: "O'sha yangi mashina" },
      { arabcha: "هَذَا الْكِتَابُ جَدِيدٌ", oqilishi: "Hazal-kitobu jadidun", tarjima: "Bu kitob yangi" },
      { arabcha: "هَؤُلاءِ طُلَّابٌ مُجْتَهِدُونَ", oqilishi: "Ha'ula'i tullabun mujtahidun", tarjima: "Bular tirishqoq o'quvchilar" },
    ],
    istima: [
      { arabcha: "هذا", oqilishi: "haza", tarjima: "bu (muzakkar)", izoh: "ha-za" },
      { arabcha: "هذه", oqilishi: "hazihi", tarjima: "bu (muannash)", izoh: "ha-zi-hi" },
      { arabcha: "ذلك", oqilishi: "zalika", tarjima: "o'sha (muzakkar)", izoh: "za-li-ka" },
      { arabcha: "تلك", oqilishi: "tilka", tarjima: "o'sha (muannash)", izoh: "til-ka" },
      { arabcha: "هَذَا بَيْتٌ", oqilishi: "Haza baytun", tarjima: "Bu uy", izoh: "yaqin + muzakkar" },
      { arabcha: "تِلْكَ مَدْرَسَةٌ", oqilishi: "Tilka madrasatun", tarjima: "O'sha maktab", izoh: "uzoq + muannash" },
    ],
    kitoba: [
      { topshiriq: "هذا yoki هذه ni to'g'ri tanlang: ___ كِتَابٌ", misol: "→ هذا كِتَابٌ (muzakkar)" },
      { topshiriq: "ذلك yoki تلك ni to'g'ri tanlang: ___ شَجَرَةٌ", misol: "→ تلك شَجَرَةٌ (muannash)" },
      { topshiriq: "هذا kabi jumla tuzing: Bu qalam → arabchada yozing", misol: "→ هذا قَلَمٌ" },
      { topshiriq: "Bu maktab → arabchada yozing (مَدْرَسَة — muannash)", misol: "→ هذه مَدْرَسَةٌ" },
    ],
    test: [
      { savol: "Bu (muannash) arabchada qanday?", variantlar: ["هذا", "ذلك", "هذه", "تلك"], togri: 2 },
      { savol: "ذلك nimani anglatadi?", variantlar: ["Bu (muzakkar)", "Bu (muannash)", "U/o'sha (muzakkar)", "U/o'sha (muannash)"], togri: 2 },
      { savol: "هَذِهِ سَيَّارَةٌ gapini tarjima qiling", variantlar: ["U mashina", "Bu mashina", "O'sha mashina", "Mashina bor"], togri: 1 },
      { savol: "هَذَا olmoshi qaysi ism bilan ishlatiladi?", variantlar: ["Muannash", "Muzakkar", "Ko'plik", "Aniqlanmagan"], togri: 1 },
      { savol: "Yaqin + muannash uchun qaysi olmosh ishlatiladi?", variantlar: ["ذلك", "تلك", "هذا", "هذه"], togri: 3 },
    ],
  },
];

export const GRAM_DARAJALAR: GramDarajaInfo[] = [
  {
    kod: "A0-A1",
    nomi: "Boshlang'ich daraja",
    rang: "#2563EB",
    davomiyligi: "2 oy",
    oylar: 2,
    haftalar: 8,
    jami_kunlar: 48,
    darslar: 16,
    jadval: [
      {
        hafta: 1,
        kunlar: [
          { kuni: 1, mavzu: "Kirish — arabcha va grammatika nima?", tur: "dars" },
          { kuni: 2, mavzu: "Ismlar: muzakkar va muannash (1-dars)", darsId: 1, tur: "dars" },
          { kuni: 3, mavzu: "1-darsni tahlil va mashq qilish", tur: "tahlil" },
          { kuni: 4, mavzu: "Shaxs olmoshlari — yagona (2-dars)", darsId: 2, tur: "dars" },
          { kuni: 5, mavzu: "2-darsni tahlil va mashq qilish", tur: "tahlil" },
          { kuni: 6, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 2,
        kunlar: [
          { kuni: 7, mavzu: "Ko'plik olmoshlari (2-dars davomi)", darsId: 2, tur: "dars" },
          { kuni: 8, mavzu: "Ishorali olmoshlar (3-dars)", darsId: 3, tur: "dars" },
          { kuni: 9, mavzu: "3-darsni tahlil va mashq", tur: "tahlil" },
          { kuni: 10, mavzu: "1–3 darslar takrori", tur: "tahlil" },
          { kuni: 11, mavzu: "Haftalik test", tur: "imtihon" },
          { kuni: 12, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 3,
        kunlar: [
          { kuni: 13, mavzu: "Al- aniqlik artikli", tur: "dars" },
          { kuni: 14, mavzu: "Al- mashq va misollar", tur: "tahlil" },
          { kuni: 15, mavzu: "Ot va sifat birikmas", tur: "dars" },
          { kuni: 16, mavzu: "Sifat mosligi mashqi", tur: "tahlil" },
          { kuni: 17, mavzu: "Yangi lug'atlar: kundalik hayot so'zlari", tur: "dars" },
          { kuni: 18, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 4,
        kunlar: [
          { kuni: 19, mavzu: "Oddiy gap tuzilmasi (SVO)", tur: "dars" },
          { kuni: 20, mavzu: "Gap tuzilmasi mashqi", tur: "tahlil" },
          { kuni: 21, mavzu: "Tanishuv jumlalari", tur: "dars" },
          { kuni: 22, mavzu: "Tanishuv dialogini yozish", tur: "tahlil" },
          { kuni: 23, mavzu: "Oy davomidagi o'quv natijalarini tahlil qilish", tur: "tahlil" },
          { kuni: 24, mavzu: "1-oy yakuniy imtihon", tur: "imtihon" },
        ],
      },
      {
        hafta: 5,
        kunlar: [
          { kuni: 25, mavzu: "Sonlar 1–10", tur: "dars" },
          { kuni: 26, mavzu: "Sonlar 11–100", tur: "dars" },
          { kuni: 27, mavzu: "Son + ism birikmas", tur: "tahlil" },
          { kuni: 28, mavzu: "Ranglar va tavsif", tur: "dars" },
          { kuni: 29, mavzu: "Ranglar mashqi", tur: "tahlil" },
          { kuni: 30, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 6,
        kunlar: [
          { kuni: 31, mavzu: "Predloglar: في، على، من، إلى", tur: "dars" },
          { kuni: 32, mavzu: "Predloglar bilan gaplar tuzish", tur: "tahlil" },
          { kuni: 33, mavzu: "Fe'l: o'tgan zamon kirish", tur: "dars" },
          { kuni: 34, mavzu: "Fe'l o'tgan zamon mashqi", tur: "tahlil" },
          { kuni: 35, mavzu: "Dialog: Qayerda turasan?", tur: "dars" },
          { kuni: 36, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 7,
        kunlar: [
          { kuni: 37, mavzu: "Fe'l: hozirgi zamon kirish", tur: "dars" },
          { kuni: 38, mavzu: "Fe'l hozirgi zamon mashqi", tur: "tahlil" },
          { kuni: 39, mavzu: "Savol gaplari: هل va ما", tur: "dars" },
          { kuni: 40, mavzu: "Savol-javob mashqi", tur: "tahlil" },
          { kuni: 41, mavzu: "Inkor shakli: لا va لَيْسَ", tur: "dars" },
          { kuni: 42, mavzu: "Dam olish", tur: "dam" },
        ],
      },
      {
        hafta: 8,
        kunlar: [
          { kuni: 43, mavzu: "Kundalik hayot dialoglari", tur: "dars" },
          { kuni: 44, mavzu: "Barcha mavzular takrori", tur: "tahlil" },
          { kuni: 45, mavzu: "Yozma test (A0-A1 barcha mavzulari)", tur: "imtihon" },
          { kuni: 46, mavzu: "Og'zaki dialog mashqi", tur: "tahlil" },
          { kuni: 47, mavzu: "Natijalar tahlili va A1 sertifikat", tur: "tahlil" },
          { kuni: 48, mavzu: "A0-A1 yakuniy imtihon", tur: "imtihon" },
        ],
      },
    ],
  },
  {
    kod: "A1-A2",
    nomi: "Boshlang'ich-o'rta daraja",
    rang: "#0891B2",
    davomiyligi: "2 oy",
    oylar: 2,
    haftalar: 8,
    jami_kunlar: 48,
    darslar: 20,
    jadval: [],
  },
  {
    kod: "A2-B1",
    nomi: "O'rta daraja",
    rang: "#16A34A",
    davomiyligi: "3 oy",
    oylar: 3,
    haftalar: 12,
    jami_kunlar: 72,
    darslar: 28,
    jadval: [],
  },
  {
    kod: "B1-B2",
    nomi: "O'rta-yuqori daraja",
    rang: "#CA8A04",
    davomiyligi: "3 oy",
    oylar: 3,
    haftalar: 12,
    jami_kunlar: 72,
    darslar: 28,
    jadval: [],
  },
  {
    kod: "B2-C1",
    nomi: "Yuqori daraja",
    rang: "#DC2626",
    davomiyligi: "4 oy",
    oylar: 4,
    haftalar: 16,
    jami_kunlar: 96,
    darslar: 36,
    jadval: [],
  },
  {
    kod: "C1-C2",
    nomi: "Professional daraja",
    rang: "#7C3AED",
    davomiyligi: "4 oy",
    oylar: 4,
    haftalar: 16,
    jami_kunlar: 96,
    darslar: 36,
    jadval: [],
  },
];
