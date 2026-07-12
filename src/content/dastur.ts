import type { DasturOy } from "./types";
import { T } from "../theme/tokens";

export const DASTUR: DasturOy[] = [
  {
    oy: 1,
    nomi: "1-OY: Arab Yozuvi va Birinchi Harflar",
    color: T.gGreen,
    imtihon: "Arab yozuvi, 4 ta harakat, tanvin, shaddah, maxsus harflar va أ–س (Amaliy 1–6) bo'yicha yozma+og'zaki test",
    haftalar: [
      {
        h: 1,
        mavzu: "Nazariy 1–2 + Amaliy 1 (أ ب)",
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
            d: "Amaliy Bob 1: أ (Hamza) va ب (Ba) — maxraj, sifat, to'rt shakl",
            m: "أ ب ni barcha harakatlar bilan yozish va o'qish",
          },
        ],
        imtihon: "Test: alifbo tartibi + harakatlar + أ ب o'qish",
        vazifalar: [
          { savol: "Arab yozuvi qaysi yo'nalishda o'qiladi?", variantlar: ["Chapdan o'ngga", "O'ngdan chapga", "Yuqoridan pastga", "Pastdan yuqoriga"], togri: 1 },
          { savol: "Arab alifbosida nechta harf bor?", variantlar: ["24 ta", "26 ta", "28 ta", "30 ta"], togri: 2 },
          { savol: "Fatha belgisi harfning qayerida yoziladi?", variantlar: ["Harf ostida", "Harf ustida", "Harf o'ngida", "Harf ichida"], togri: 1 },
          { savol: "Sukun belgisi nimani bildiradi?", variantlar: ["Uzun tovush", "Ikkilanma tovush", "Harakat yo'qligi (unli yo'q)", "Tanvin"], togri: 2 },
          { savol: "أ harfi bu kursda nima deb ataladi?", variantlar: ["Alif", "Ba", "Hamza", "Ta"], togri: 2 },
          { savol: "Kasra belgisi harfning qayerida yoziladi?", variantlar: ["Harf ustida", "Harf ostida", "Harf o'ngida", "Harf ichida"], togri: 1 },
          { savol: "Damma belgisi qanday ko'rinadi?", variantlar: ["Harf ostidagi chiziq", "Harf ustidagi kichik vav shakli", "Harf ustidagi nuqta", "Harf o'ngidagi belgi"], togri: 1 },
          { savol: "ب harfi nima deb ataladi?", variantlar: ["Ba", "Ta", "Hamza", "Alif"], togri: 0 },
          { savol: "Arab yozuvida harflar qaysi yo'nalishda ulanadi?", variantlar: ["O'ngdan chapga", "Chapdan o'ngga", "Yuqoridan pastga", "Harflar ulanmaydi"], togri: 0 },
          { savol: "Harakatlarning asosiy vazifasi nima?", variantlar: ["Undosh tovushlarni belgilash", "Unli tovushlarni belgilash", "Harflarni ulash", "Nuqtalarni qo'yish"], togri: 1 },
        ],
      },
      {
        h: 2,
        mavzu: "Nazariy 3–4 + Amaliy 2–3 (ت ث | ج ح)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 3: Tanvin (AN, IN, UN) — qoidalari va yozilishi; Amaliy Bob 2: ت (Ta) va ث (Sa)",
            m: "Tanvinli so'zlarni o'qish; ت ث ni yozish va talaffuz mashqi",
          },
          {
            k: "Chorshanba",
            d: "Nazariy 4: Shaddah — ta'rifi, yozilishi va talaffuzi; Amaliy Bob 3: ج (Jim) va ح (Ha)",
            m: "Shaddalik so'zlarni o'qish; ج ح maxraj va sifatini o'rganish",
          },
          {
            k: "Juma",
            d: "Hafta takrori: tanvin, shaddah, ت ث ج ح birgalikda o'qish",
            m: "Diktant: tanvinli va shaddalik so'zlar",
          },
        ],
        imtihon: "Blooket: tanvin + shaddah + ت ث ج ح harflari",
        vazifalar: [
          { savol: "Tanvin UN ko'rinishi qanday?", variantlar: ["Bitta kasra", "Ikki fatha", "Ikki damma", "Bitta fatha"], togri: 2 },
          { savol: "Shaddah harfni qanday o'qitadi?", variantlar: ["Cho'zib o'qish", "Ikki marta (qo'shilgan) o'qish", "Harakat yo'qligi", "Uzun unli"], togri: 1 },
          { savol: "ث harfi nima deb ataladi?", variantlar: ["Ta", "Sa", "Ba", "Jim"], togri: 1 },
          { savol: "ج harfining maxraj joyi qayer?", variantlar: ["Lab", "Tomoq", "Til o'rtasi va tanglay", "Til uchi"], togri: 2 },
          { savol: "ح harfi nima deb ataladi?", variantlar: ["Jim", "Ha (halqiy Ha)", "Xo", "Ba"], togri: 1 },
          { savol: "Tanvin IN qanday ko'rinadi?", variantlar: ["Ikki kasra", "Ikki fatha", "Ikki damma", "Bitta kasra"], togri: 0 },
          { savol: "ت harfi ب dan qanday farqlanadi?", variantlar: ["ت da ikki nuqta ustida, ب da bitta nuqta ostida", "Shakli butunlay boshqacha", "ت katta, ب kichik", "Farqi yo'q"], togri: 0 },
          { savol: "Shaddah harfning qayerida yoziladi?", variantlar: ["Harf ostida", "Harf ustida (W shakl)", "Harf o'ngida", "Harf ichida"], togri: 1 },
          { savol: "ج va ح harflarining o'xshashligi nima?", variantlar: ["Bir xil maxrajga ega", "Bir xil asosiy shaklga ega, lekin ج nuqtali", "Bir xil sifatga ega", "Farqi yo'q"], togri: 1 },
          { savol: "Tanvin so'zning qayeriga qo'shiladi?", variantlar: ["Faqat so'z boshiga", "Faqat so'z oxiridagi harfga", "Har qanday harfga", "Faqat alif harfiga"], togri: 1 },
        ],
      },
      {
        h: 3,
        mavzu: "Nazariy 5 + Amaliy 4–5 (خ د | ذ ر)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Nazariy 5: Ta marbuta, Alif layyina, Hamzatul vasl — qoidalar va misollar; Amaliy Bob 4: خ (Xo) va د (Dal)",
            m: "Maxsus harflarni aniqlash; خ د ni yozish va o'qish",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 5: ذ (Zal) va ر (Ra) — maxraj, sifat, shakl va so'zlardagi qo'llanishi",
            m: "ذ ر bilan tuzilgan so'zlarni o'qish va talaffuz mashqi",
          },
          {
            k: "Juma",
            d: "Hafta takrori: Nazariy 5 + خ د ذ ر birgalikda o'qish va yozish",
            m: "So'z tuzish mashqi: خ د ذ ر ishtirokida",
          },
        ],
        imtihon: "Test: ta marbuta + alif layyina + hamzatul vasl + خ د ذ ر harflari",
        vazifalar: [
          { savol: "Ta marbuta so'z oxirida to'xtaganda qanday o'qiladi?", variantlar: ["'T' deb", "'H' deb yoki jim turiladi", "'A' uzun deb", "Umuman o'qilmaydi"], togri: 1 },
          { savol: "Alif layyina harfi asosan qayerda uchraydi?", variantlar: ["So'z boshida", "So'z o'rtasida", "So'z oxirida", "Hamma joyda"], togri: 2 },
          { savol: "خ harfi nima deb ataladi?", variantlar: ["Ha", "Xo", "Jim", "G'ayn"], togri: 1 },
          { savol: "ذ va ز harflarining asosiy farqi nima?", variantlar: ["Shaklida", "Maxrajida: ذ til uchi+tish, ز til uchi+tish osti", "Nuqtalar sonida", "Ikkalasi bir xil"], togri: 1 },
          { savol: "ر harfi qaysi maxraj guruhiga kiradi?", variantlar: ["Jawf (bo'shliq)", "Halq (tomoq)", "Lison (til)", "Shafatayn (lab)"], togri: 2 },
          { savol: "Hamzatul vasl so'z o'rtasida qanday o'qiladi?", variantlar: ["Har doim o'qiladi", "Tushirib o'qiladi (sezilmaydi)", "Ba deb o'qiladi", "Hamza deb o'qiladi"], togri: 1 },
          { savol: "د harfi nima deb ataladi?", variantlar: ["Dal", "Zal", "Ra", "Zayn"], togri: 0 },
          { savol: "خ va ح harflarining farqi nima?", variantlar: ["خ nuqtali va yo'g'on, ح nuqtasiz va ingichka", "Shakllari butunlay boshqacha", "Ikkalasi bir xil talaffuz", "خ lab, ح tomoq"], togri: 0 },
          { savol: "ر harfini to'g'ri talaffuz qilganda til qayerda bo'ladi?", variantlar: ["Til uchi yuqori tish etiga yaqin", "Til orqa qismida", "Lablar yopiladi", "Hech qanday harakat kerak emas"], togri: 0 },
          { savol: "Ta marbuta (ة) belgisi qaysi harfga o'xshaydi?", variantlar: ["ت (Ta) — lekin yopiq shaklda", "ب (Ba)", "ح (Ha)", "ه (Ha)"], togri: 0 },
        ],
      },
      {
        h: 4,
        mavzu: "Amaliy 6 (ز س) + 1-Oy Takrori",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 6: ز (Zayn) va س (Sin) — maxraj, sifat, to'rt shakl va so'zlar",
            m: "ز س ni barcha harakatlar bilan yozish, so'z tuzish",
          },
          {
            k: "Chorshanba",
            d: "1-oy umumiy takrori: Nazariy 1–5 qoidalari va Amaliy 1–6 harflari",
            m: "O'qish va yozish: harakatlar, tanvin, shaddah, maxsus harflar",
          },
          {
            k: "Juma",
            d: "1-oy imtihoniga tayyorgarlik: barcha o'tilgan mavzular bo'yicha diktant",
            m: "Diktant va og'zaki so'rov: أ–س harflari va asosiy qoidalar",
          },
        ],
        imtihon: "1-OY IMTIHONI: Nazariy 1–5 + Amaliy 1–6 (أ ب ت ث ج ح خ د ذ ر ز س) yozma+og'zaki",
        vazifalar: [
          { savol: "ز harfi nima deb ataladi?", variantlar: ["Sin", "Zayn", "Shin", "Sod"], togri: 1 },
          { savol: "Damma qanday unli tovushni bildiradi?", variantlar: ["A tovushi", "I tovushi", "U tovushi", "E tovushi"], togri: 2 },
          { savol: "Tanvin AN belgisi qaysi?", variantlar: ["Bitta kasra", "Bitta fatha", "Ikki fatha", "Ikki damma"], togri: 2 },
          { savol: "Arab alifbosida tartib: أ ب ت ث — to'g'rimi?", variantlar: ["Ha, to'g'ri tartib", "Yo'q, ت ث oldin", "Yo'q, ب keyin أ", "Yo'q, ث boshqa joyda"], togri: 0 },
          { savol: "1-oyda qaysi harflar o'rganildi?", variantlar: ["أ ب ت ث ج ح خ د ذ ر ز س", "ش ص ض ط ظ ع غ ف", "ق ك ل م ن ه و ي", "Barcha 28 harf"], togri: 0 },
          { savol: "س harfi nima deb ataladi?", variantlar: ["Sin", "Zayn", "Shin", "Sod"], togri: 0 },
          { savol: "Kasra qanday unli tovushni bildiradi?", variantlar: ["A tovushi", "I tovushi", "U tovushi", "E tovushi"], togri: 1 },
          { savol: "1-oyda nechta nazariy mavzu o'rganildi?", variantlar: ["3 ta", "4 ta", "5 ta", "6 ta"], togri: 2 },
          { savol: "Arab harflarining qancha ko'pchiligi to'rt xil shaklga ega?", variantlar: ["Faqat 5 ta harf", "Faqat 10 ta harf", "Ko'pchilik harflar (alohida, bosh, o'rta, oxir)", "Hech bir harf shaklini o'zgartirmaydi"], togri: 2 },
          { savol: "ز va ر harflarining farqi nima?", variantlar: ["ز da bir nuqta ustida bor, ر nuqtasiz", "Shakllari butunlay boshqacha", "Ikkalasi bir xil", "ز lab, ر til"], togri: 0 },
        ],
      },
    ],
  },
  {
    oy: 2,
    nomi: "2-OY: Qolgan Harflar va Maxraj Ilmi",
    color: T.gDeep,
    imtihon: "Barcha 28 arab harfi (Amaliy 7–14) + Nazariy 6–8 maxraj ilmi bo'yicha yozma+og'zaki test",
    haftalar: [
      {
        h: 5,
        mavzu: "Amaliy 7–8 (ش ص | ض ط) + Nazariy 6 (Maxraj: Jawf+Halq)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 7: ش (Shin) va ص (Sod) — maxraj, sifat, shakl va so'zlardagi qo'llanishi",
            m: "ش ص yozish, so'zlar bilan o'qish mashqi",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 8: ض (Dod) va ط (To) — maxraj, sifat, shakl va talaffuz",
            m: "ض ط ni barcha harakatlar bilan yozish va o'qish",
          },
          {
            k: "Juma",
            d: "Nazariy 6: Maxraj — Jawf (bo'shliq harflari) va Halq (tomoq harflari)",
            m: "Jawf va Halq harflarini maxrajiga ko'ra guruhlash va talaffuz",
          },
        ],
        imtihon: "Test: ش ص ض ط + Jawf va Halq maxrajlari",
        vazifalar: [
          { savol: "Jawf (bo'shliq) maxrajiga tegishli harflar qaysilar?", variantlar: ["ب م و ف", "و ي ا (uzun unlili harflar)", "ق ط ب ج د", "غ خ ع ح ه ء"], togri: 1 },
          { savol: "ط harfining asosiy xususiyati nima?", variantlar: ["Ingichka (tarqiq) harf", "Yo'g'on (isti'lo) harf", "Lab harfi", "Tomoq harfi"], togri: 1 },
          { savol: "Halq maxrajiga qaysi harflar kiradi?", variantlar: ["غ خ ع ح ه ء", "و ا ي", "ب م و ف", "ن م"], togri: 0 },
          { savol: "ض harfi nima deb ataladi?", variantlar: ["Sod", "To", "Dod", "Zo"], togri: 2 },
          { savol: "ش va س harflarining asosiy farqi nima?", variantlar: ["Shaklida", "ش til o'rtasi+tanglay, س til uchi+tish ostida", "Nuqtalar sonida", "Ikkalasi bir xil maxrajda"], togri: 1 },
          { savol: "ش harfi nima deb ataladi?", variantlar: ["Sin", "Shin", "Sod", "Zayn"], togri: 1 },
          { savol: "Halq (tomoq) nechta qismga bo'linadi?", variantlar: ["1 ta qism", "2 ta qism", "3 ta qism", "4 ta qism"], togri: 2 },
          { savol: "ص harfining asosiy sifati qaysi?", variantlar: ["Yo'g'on (isti'lo) va yopiq (ithbaq)", "Ingichka (tarqiq) harf", "Lab harfi", "Tomoq harfi"], togri: 0 },
          { savol: "Jawf maxrajida nechta harf bor?", variantlar: ["3 ta (و ي ا)", "5 ta", "6 ta", "2 ta"], togri: 0 },
          { savol: "ط harfi ت dan qanday farqlanadi?", variantlar: ["ط yo'g'on (isti'lo), ت ingichka (tarqiq)", "Shakllari bir xil", "ط lab, ت til", "Farqi yo'q"], togri: 0 },
        ],
      },
      {
        h: 6,
        mavzu: "Amaliy 9–10 (ظ ع | غ ف) + Nazariy 7 (Maxraj: Lison)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 9: ظ (Zo) va ع (Ayn) — maxraj, sifat, shakl va so'zlar",
            m: "ظ ع ni yozish va o'qish, ع talaffuziga alohida e'tibor",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 10: غ (G'ayn) va ف (Fa) — maxraj, sifat, shakl va so'zlar",
            m: "غ ف bilan so'z tuzish va o'qish mashqi",
          },
          {
            k: "Juma",
            d: "Nazariy 7: Maxraj — Lison (til harflari): til uchi, o'rtasi, yon va orqa qismi",
            m: "Lison harflarini maxrajiga ko'ra guruhlash va talaffuz taqqoslash",
          },
        ],
        imtihon: "Blooket: ظ ع غ ف + Lison maxrajlari",
        vazifalar: [
          { savol: "ع harfi qaysi maxraj guruhiga kiradi?", variantlar: ["Jawf", "Halq", "Lison", "Shafatayn"], togri: 1 },
          { savol: "Lison (til) maxraji qanday qismlarga bo'linadi?", variantlar: ["Faqat til uchi", "Til uchi, o'rtasi, yon tomoni, orqa qismi", "Faqat til orqa qismi", "Til va tishlar"], togri: 1 },
          { savol: "غ harfi nima deb ataladi?", variantlar: ["G'ayn", "Fa", "Ayn", "Zo"], togri: 0 },
          { savol: "ف harfining maxraji qayer?", variantlar: ["Til uchi va tish", "Yuqori tishlar va pastki lab", "Ikkala lab", "Tomoq"], togri: 1 },
          { savol: "ظ harfi nima deb ataladi?", variantlar: ["Zal", "Ayn", "Zo", "G'ayn"], togri: 2 },
          { savol: "ع harfining talaffuzida qanday xususiyat bor?", variantlar: ["Tomoqdan tortib chiqariladigan harf", "Lab harfi", "Burundan chiquvchi harf", "Til uchidan chiquvchi harf"], togri: 0 },
          { savol: "غ va خ harflarining o'xshashligi nima?", variantlar: ["Ikkalasi til orqa qismi va tomoq orasidan chiqadi", "Ikkalasi ingichka", "Bir xil talaffuz", "Ikkalasi lab harfi"], togri: 0 },
          { savol: "ف harfi nima uchun ingichka (tarqiq) hisoblanadi?", variantlar: ["Isti'lo sifati yo'qligi (tarqiq)", "Kichik harf bo'lgani uchun", "Lab harfi bo'lgani uchun", "Tomoq harfi bo'lgani uchun"], togri: 0 },
          { savol: "ظ harfi ذ dan qanday farqlanadi?", variantlar: ["ظ yo'g'on (isti'lo), ذ ingichka (tarqiq)", "Ikkalasi bir xil", "ظ lab, ذ til", "Shaklida farq yo'q"], togri: 0 },
          { savol: "Lison guruhida qaysi harflar eng ko'p uchraydi?", variantlar: ["Faqat til uchi harflari (ت د ط ن ل ر)", "Faqat til orqa harflari", "Til yon tomoni harflari", "Til o'rtasi harflari"], togri: 0 },
        ],
      },
      {
        h: 7,
        mavzu: "Amaliy 11–12 (ق ك | ل م) + Nazariy 8 (Maxraj: Shafatayn+Xayshum)",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 11: ق (Qof) va ك (Kof) — maxraj, sifat, shakl va so'zlar",
            m: "ق ك yozish va o'qish; ق va ك farqini talaffuzda o'rgatish",
          },
          {
            k: "Chorshanba",
            d: "Amaliy Bob 12: ل (Lom) va م (Mim) — maxraj, sifat, shakl va so'zlar",
            m: "ل م bilan so'z tuzish va o'qish mashqi",
          },
          {
            k: "Juma",
            d: "Nazariy 8: Maxraj — Shafatayn (lab harflari: ب م و ف) va Xayshum (g'unna)",
            m: "Lab harflari va xayshum talaffuzini mashq qilish",
          },
        ],
        imtihon: "Test: ق ك ل م + Shafatayn va Xayshum maxrajlari",
        vazifalar: [
          { savol: "Shafatayn (lab) maxrajiga qaysi harflar kiradi?", variantlar: ["ب م و ف", "ن م", "ق ك", "ل ر"], togri: 0 },
          { savol: "Xayshum (g'unna) qaysi harflar bilan bog'liq?", variantlar: ["ن va م", "ق va ك", "ل va ر", "ب va ف"], togri: 0 },
          { savol: "ق va ك harflarining farqi nima?", variantlar: ["Farqi yo'q", "ق til orqa-tomoq chegarasida, ك til o'rta-orqa qismida", "ق lab, ك til", "ق tomoq, ك burun"], togri: 1 },
          { savol: "ل harfining maxraji qayer?", variantlar: ["Til o'rta qismi", "Til uchi va yuqori tish eti", "Lab", "Tomoq"], togri: 1 },
          { savol: "G'unna tovushi qayerdan chiqadi?", variantlar: ["Tomoqdan", "Burundan", "Labdan", "Til uchidan"], togri: 1 },
          { savol: "م harfining maxraji qayer?", variantlar: ["Ikkala lab (ikki lab birikishi)", "Til uchi", "Tomoq", "Burun"], togri: 0 },
          { savol: "ك harfi nima deb ataladi?", variantlar: ["Qof", "Kof", "Lom", "Mim"], togri: 1 },
          { savol: "G'unna (xayshum) tovushi necha harakat davom etadi?", variantlar: ["Bir harakat", "Ikki harakat", "Uch harakat", "To'rt harakat"], togri: 1 },
          { savol: "Shafatayn guruhida nechta harf bor?", variantlar: ["2 ta", "4 ta (ب م و ف)", "6 ta", "8 ta"], togri: 1 },
          { savol: "و harfi Shafatayn guruhiga qachon kiradi?", variantlar: ["Undosh sifatida talaffuz qilinganda", "Har doim", "Faqat uzun unli sifatida", "Sukun bilan kelganda"], togri: 0 },
        ],
      },
      {
        h: 8,
        mavzu: "Amaliy 13–14 (ن ه | و ي) + 2-Oy Takrori",
        kunlar: [
          {
            k: "Dushanba",
            d: "Amaliy Bob 13: ن (Nun) va ه (Ha) — maxraj, sifat, shakl; Amaliy Bob 14: و (Vov) va ي (Ya)",
            m: "ن ه و ي yozish va o'qish — 28 ta harf yakunlandi!",
          },
          {
            k: "Chorshanba",
            d: "2-oy umumiy takrori: Amaliy 7–14 harflari va Nazariy 6–8 maxraj ilmi",
            m: "Barcha 28 harfni maxrajiga ko'ra talaffuz qilish va yozish",
          },
          {
            k: "Juma",
            d: "2-oy imtihoniga tayyorgarlik: 28 harf diktanti va maxraj bo'yicha og'zaki so'rov",
            m: "Diktant va og'zaki: barcha 28 harf + Jawf, Halq, Lison, Shafatayn, Xayshum",
          },
        ],
        imtihon: "2-OY IMTIHONI: Barcha 28 harf (Amaliy 1–14) + Nazariy 6–8 maxraj ilmi yozma+og'zaki",
        vazifalar: [
          { savol: "Arab alifbosidagi oxirgi harf qaysi?", variantlar: ["و", "ن", "ي", "ه"], togri: 2 },
          { savol: "و harfi qanday funksiyalarni bajarishi mumkin?", variantlar: ["Faqat undosh sifatida", "Undosh va uzun unli sifatida", "Faqat uzun unli sifatida", "Hech qanday funksiyasi yo'q"], togri: 1 },
          { savol: "Arab harflari nechta asosiy maxraj guruhiga bo'linadi?", variantlar: ["3 ta", "5 ta", "7 ta", "10 ta"], togri: 1 },
          { savol: "ن harfining xususiyati nima?", variantlar: ["G'unna bilan talaffuz qilinishi mumkin", "Yo'g'on harf", "Lab harfi", "Tomoq harfi"], togri: 0 },
          { savol: "ه harfi qaysi maxraj guruhiga kiradi?", variantlar: ["Shafatayn (lab)", "Jawf (bo'shliq)", "Halq (tomoq)", "Lison (til)"], togri: 2 },
          { savol: "ي harfi qanday funksiyalarni bajarishi mumkin?", variantlar: ["Faqat undosh", "Undosh va uzun unli (i) sifatida", "Faqat uzun unli", "Hech qanday funksiyasi yo'q"], togri: 1 },
          { savol: "2-oyda qaysi maxraj guruhlari o'rganildi?", variantlar: ["Faqat Jawf va Halq", "Jawf, Halq, Lison, Shafatayn, Xayshum", "Faqat Lison", "Hech qanday guruh o'rganilmadi"], togri: 1 },
          { savol: "ن harfi qaysi maxraj guruhiga kiradi?", variantlar: ["Shafatayn (lab)", "Lison (til uchi, tish eti orqali)", "Halq (tomoq)", "Jawf (bo'shliq)"], togri: 1 },
          { savol: "2-oyda nechta yangi harf o'rganildi?", variantlar: ["8 ta", "16 ta (Amaliy 7-14)", "28 ta", "12 ta"], togri: 1 },
          { savol: "Fonetika 1 kursi nechta oylik dasturdan iborat?", variantlar: ["1 oy", "2 oy", "3 oy", "4 oy"], togri: 1 },
        ],
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
            d: "Takror 1: 28 harf (Amaliy 1–14) + Maxraj ilmi (Nazariy 6–8) — harflarni maxrajiga ko'ra guruhlash",
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
        imtihon: "YAKUNIY IMTIHON: Nazariy 1–20 + Amaliy 1–14 — to'liq yozma, og'zaki va amaliy baholash",
      },
    ],
  },
];
