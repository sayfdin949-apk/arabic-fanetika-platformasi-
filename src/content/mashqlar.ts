/* Yozish va talaffuz mashqlari — dars 1–13 */

export interface MashqQatori {
  nomi: string;
  arabcha: string[];
  rang?: string;
}

export interface HarfMashq {
  harf: string;
  xusnixatIzoh?: string;
  qatorlar: MashqQatori[];
  sozlar?: { arab: string; ozb: string }[];
}

export interface DarsMashqlar {
  harflar: HarfMashq[];
}

export const DARS_MASHQLAR: Record<number, DarsMashqlar> = {
  1: {
    harflar: [
      {
        harf: "أ",
        xusnixatIzoh: "Bo'g'izdan keskin to'xtatish bilan. Alif ustidagi hamza '◌ أ' belgisiga e'tibor bering",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["أَ", "أَبَ", "أَتَ", "أَبَتَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["أِ", "أِبِ", "أِتِ", "أِبِتِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["أُ", "أُبُ", "أُتُ", "أُبُتُ"], rang: "#0e7490" },
          { nomi: "Sukun", arabcha: ["بَأْ", "تَأْ", "بَأْتَ", "تَأَبَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "أَب", ozb: "ota" }],
      },
      {
        harf: "ب",
        xusnixatIzoh: "Ikki lab yopilib keskin ochiladi — Shidda. Pastki nuqtaga e'tibor bering",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["بَ", "بَأَ", "بَتَ", "بَأَتَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["بِ", "بِأِ", "بِتِ", "بِأِتِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["بُ", "بُأُ", "بُتُ", "بُأُتُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["أَبَتَ", "تَبَأَ", "أَتَبَ", "بَتَبَ"], rang: "#15803d" },
        ],
      },
      {
        harf: "ت",
        xusnixatIzoh: "Til uchi yuqori tishlarning ichiga tegadi — Hams (nafsiz). Ustki ikki nuqta",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["تَ", "تَبَ", "تَأَ", "تَبَأَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["تِ", "تِبِ", "تِأِ", "تِبِأِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["تُ", "تُبُ", "تُأُ", "تُبُأُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["أَبَتَ", "بَتَأَ", "تَأَبَ", "أَتَبَأَ"], rang: "#15803d" },
        ],
      },
    ],
  },

  2: {
    harflar: [
      {
        harf: "ث",
        xusnixatIzoh: "Til uchi tishlar orasida — inglizcha 'th' (thing) kabi, nafsiz. Ustki uch nuqta",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["ثَ", "ثَبَ", "ثَأَ", "ثَتَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["ثِ", "ثِبِ", "ثِأِ", "ثِتِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["ثُ", "ثُبُ", "ثُأُ", "ثُتُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["ثَبَتَ", "أَبَثَ", "تَثَبَ", "بَثَتَ"], rang: "#15803d" },
        ],
      },
      {
        harf: "ج",
        xusnixatIzoh: "Til o'rtasi va tanglay birlashadi — Shidda+Jahr. Qalqala sifati: sokin holda zarb bilan",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["جَ", "جَبَ", "جَثَ", "جَأَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["جِ", "جِبِ", "جِثِ", "جِأِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["جُ", "جُبُ", "جُثُ", "جُأُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["أَجَبَ", "تَجَبَ", "بَجَثَ", "جَثَبَ"], rang: "#15803d" },
        ],
      },
    ],
  },

  3: {
    harflar: [
      {
        harf: "ح",
        xusnixatIzoh: "Halq o'rtasidan nafsiz nafas — Hams+Roxova. Bo'g'iz siqiladi, ammo jarang yo'q",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["حَ", "حَبَ", "حَجَ", "حَثَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["حِ", "حِبِ", "حِجِ", "حِثِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["حُ", "حُبُ", "حُجُ", "حُثُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["بَحَثَ", "أَحَبَ", "جَحَبَ", "حَجَبَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "حَجَر", ozb: "tosh" }],
      },
      {
        harf: "خ",
        xusnixatIzoh: "Halq yuqorisidan sirpanish tovushi — Hams+Roxova+Iste'lo. O'zbekcha 'x' kabi",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["خَ", "خَبَ", "خَجَ", "خَحَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["خِ", "خِبِ", "خِجِ", "خِحِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["خُ", "خُبُ", "خُجُ", "خُحُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["جَخَبَ", "حَخَجَ", "بَخَجَ", "ثَخَبَ"], rang: "#15803d" },
        ],
      },
    ],
  },

  4: {
    harflar: [
      {
        harf: "د",
        xusnixatIzoh: "Til uchi tishlar bilan — Jahr+Shidda+Qalqala. 'd' tovushi, sokin holda zarb bilan",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["دَ", "دَبَ", "دَخَ", "دَجَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["دِ", "دِبِ", "دِخِ", "دِجِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["دُ", "دُبُ", "دُخُ", "دُجُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["أَدَبَ", "جَدَخَ", "بَدَجَ", "حَدَثَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "أَدَب", ozb: "odoblilik" },
          { arab: "جَدَد", ozb: "yangilik" },
        ],
      },
      {
        harf: "ذ",
        xusnixatIzoh: "Tish oralig'idan jarangli — Jahr+Roxova. Inglizcha 'th' (this) kabi, jarangli",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["ذَ", "ذَبَ", "ذَدَ", "ذَجَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["ذِ", "ذِبِ", "ذِدِ", "ذِجِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["ذُ", "ذُبُ", "ذُدُ", "ذُجُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["أَذَبَ", "بَذَخَ", "دَذَجَ", "جَذَبَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "جَذَب", ozb: "tortdi, jalb qildi" }],
      },
    ],
  },

  5: {
    harflar: [
      {
        harf: "ر",
        xusnixatIzoh: "Til uchi milkka tez-tez tegib tebranadi — Takrir (trill). Jahr+Bayniyya+Izlaq",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["رَ", "رَبَ", "رَدَ", "رَجَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["رِ", "رِبِ", "رِدِ", "رِجِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["رُ", "رُبُ", "رُدُ", "رُجُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["دَرَجَ", "بَرَدَ", "جَرَحَ", "أَرَبَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "دَرَج", ozb: "pog'on/daraja" },
          { arab: "جَرَح", ozb: "yara" },
        ],
      },
      {
        harf: "ز",
        xusnixatIzoh: "Tish orasidan jarangli sibilyant — Safir+Jahr+Roxova. 'z' tovushi",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["زَ", "زَرَ", "زَبَ", "زَدَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["زِ", "زِرِ", "زِبِ", "زِدِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["زُ", "زُرُ", "زُبُ", "زُدُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["زَرَدَ", "جَزَرَ", "أَرَزَ", "دَزَجَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "جَزَر", ozb: "sabzi" }],
      },
    ],
  },

  6: {
    harflar: [
      {
        harf: "س",
        xusnixatIzoh: "Tish orasidan nafsiz sifildirilgan — Safir+Hams+Roxova. O'zbekcha 's' kabi",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["سَ", "سَرَ", "سَبَ", "سَدَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["سِ", "سِرِ", "سِبِ", "سِدِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["سُ", "سُرُ", "سُبُ", "سُدُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["دَرَسَ", "سَبَرَ", "جَسَدَ", "أَسَدَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "دَرَسَ", ozb: "o'qidi" },
          { arab: "جَسَد", ozb: "tana" },
        ],
      },
      {
        harf: "ش",
        xusnixatIzoh: "Til o'rtasidan keng tarqalgan nafsiz — Tafasshi+Hams. 'sh' tovushi",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["شَ", "شَرَ", "شَسَ", "شَبَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["شِ", "شِرِ", "شِسِ", "شِبِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["شُ", "شُرُ", "شُسُ", "شُبُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["بَشَرَ", "شَرَسَ", "دَشَرَ", "أَشَدَّ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "بَشَر", ozb: "inson" }],
      },
    ],
  },

  7: {
    harflar: [
      {
        harf: "ص",
        xusnixatIzoh: "Tish yaqinida og'ir sibilyant — Safir+Hams+Iste'lo+Itbaq. 'س' ning og'ir shakli",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["صَ", "صَبَ", "صَرَ", "صَسَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["صِ", "صِبِ", "صِرِ", "صِسِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["صُ", "صُبُ", "صُرُ", "صُسُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["صَبَرَ", "صَدَرَ", "أَصَبَ", "جَصَدَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "صَبَر", ozb: "sabr-toqat" },
          { arab: "صَدَر", ozb: "ko'krak" },
        ],
      },
      {
        harf: "ض",
        xusnixatIzoh: "Til yoni orqa tishlar bilan — Istitola+Jahr+Iste'lo+Itbaq. Eng noyob arabcha harf",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["ضَ", "ضَرَ", "ضَبَ", "ضَصَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["ضِ", "ضِرِ", "ضِبِ", "ضِصِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["ضُ", "ضُرُ", "ضُبُ", "ضُصُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["ضَرَبَ", "أَرَضَ", "صَضَرَ", "دَضَرَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "ضَرَبَ", ozb: "urdi" }],
      },
    ],
  },

  8: {
    harflar: [
      {
        harf: "ط",
        xusnixatIzoh: "Til uchi tishlar bilan og'ir keskin — Qalqala+Jahr+Iste'lo+Itbaq. 'ت' ning og'ir shakli",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["طَ", "طَبَ", "طَرَ", "طَدَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["طِ", "طِبِ", "طِرِ", "طِدِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["طُ", "طُبُ", "طُرُ", "طُدُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["طَرَدَ", "أَطَرَ", "ضَطَرَ", "صَدَطَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "طَرَد", ozb: "quvdi" }],
      },
      {
        harf: "ظ",
        xusnixatIzoh: "Tish oralig'idan og'ir jarangli — Jahr+Roxova+Iste'lo+Itbaq. 'ذ' ning og'ir shakli",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["ظَ", "ظَرَ", "ظَبَ", "ظَطَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["ظِ", "ظِرِ", "ظِبِ", "ظِطِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["ظُ", "ظُرُ", "ظُبُ", "ظُطُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["أَظَرَ", "ظَرَبَ", "طَرَظَ", "رَظَبَ"], rang: "#15803d" },
        ],
      },
    ],
  },

  9: {
    harflar: [
      {
        harf: "ع",
        xusnixatIzoh: "Halq o'rtasida tomir qisqarishi bilan jarangli — Jahr+Bayniyya. O'zbekchada yo'q tovush",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["عَ", "عَبَ", "عَرَ", "عَدَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["عِ", "عِبِ", "عِرِ", "عِدِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["عُ", "عُبُ", "عُرُ", "عُدُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["عَبَرَ", "صَعَدَ", "عَصَرَ", "جَعَلَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "عَبَرَ", ozb: "o'tdi" },
          { arab: "صَعَدَ", ozb: "ko'tarildi" },
        ],
      },
      {
        harf: "غ",
        xusnixatIzoh: "Halq yuqorisida sirpanish jarangli — Jahr+Roxova+Iste'lo. 'خ' ning jarangli shakli",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["غَ", "غَبَ", "غَرَ", "غَعَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["غِ", "غِبِ", "غِرِ", "غِعِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["غُ", "غُبُ", "غُرُ", "غُعُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["غَرَبَ", "صَغَرَ", "بَغَضَ", "عَغَرَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "غَرَب", ozb: "g'arb" }],
      },
    ],
  },

  10: {
    harflar: [
      {
        harf: "ف",
        xusnixatIzoh: "Pastki lab va yuqori tishlar birikadi — Hams+Roxova+Izlaq. 'f' tovushi",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["فَ", "فَرَ", "فَبَ", "فَعَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["فِ", "فِرِ", "فِبِ", "فِعِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["فُ", "فُرُ", "فُبُ", "فُعُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["فَرَغَ", "عَصَفَ", "فَرَحَ", "صَفَرَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "فَرَغ", ozb: "bo'shadi" },
          { arab: "صَفَر", ozb: "nol; sayohat" },
        ],
      },
      {
        harf: "ق",
        xusnixatIzoh: "Til orqasi va uvula birlashadi — Jahr+Shidda+Iste'lo+Qalqala. Chuqur 'q'",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["قَ", "قَبَ", "قَرَ", "قَفَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["قِ", "قِبِ", "قِرِ", "قِفِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["قُ", "قُبُ", "قُرُ", "قُفُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["قَرَبَ", "فَرَقَ", "صَدَقَ", "عَبَقَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "صَدَق", ozb: "haqiqat aytdi" },
          { arab: "فَرَق", ozb: "ajratdi" },
        ],
      },
    ],
  },

  11: {
    harflar: [
      {
        harf: "ك",
        xusnixatIzoh: "Til orqasi yumshoq tanglay — Hams+Shidda. O'zbekcha 'k' ga yaqin",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["كَ", "كَبَ", "كَرَ", "كَقَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["كِ", "كِبِ", "كِرِ", "كِقِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["كُ", "كُبُ", "كُرُ", "كُقُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["فَكَرَ", "كَسَرَ", "عَرَكَ", "صَكَبَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "فَكَرَ", ozb: "o'yladi" },
          { arab: "كَسَرَ", ozb: "sindirdi" },
        ],
      },
      {
        harf: "ل",
        xusnixatIzoh: "Til chetlari tish milklari bilan — Inhiraf+Jahr+Bayniyya. 'l' tovushi",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["لَ", "لَكَ", "لَرَ", "لَبَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["لِ", "لِكِ", "لِرِ", "لِبِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["لُ", "لُكُ", "لُرُ", "لُبُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["أَكَلَ", "فَعَلَ", "كَلَبَ", "عَلَقَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "أَكَلَ", ozb: "yedi" },
          { arab: "فَعَلَ", ozb: "qildi" },
        ],
      },
    ],
  },

  12: {
    harflar: [
      {
        harf: "م",
        xusnixatIzoh: "Ikki lab yopilib ochiladi — Jahr+Bayniyya+Izlaq. Burun rezonansi bor",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["مَ", "مَلَ", "مَكَ", "مَبَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["مِ", "مِلِ", "مِكِ", "مِبِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["مُ", "مُلُ", "مُكُ", "مُبُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["عَلِمَ", "كَلَّمَ", "عَلَمَ", "أَكَلَمَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "عَلِمَ", ozb: "bildi" },
          { arab: "عَلَم", ozb: "bayroq; ilm" },
        ],
      },
      {
        harf: "ن",
        xusnixatIzoh: "Til uchi oldingi tanglay bilan — burun yo'lidan o'tadi. Bayniyya+Jahr+Izlaq",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["نَ", "نَمَ", "نَلَ", "نَكَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["نِ", "نِمِ", "نِلِ", "نِكِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["نُ", "نُمُ", "نُلُ", "نُكُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["نَظَرَ", "كَنَسَ", "عَلَنَ", "نَمَلَ"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "نَظَرَ", ozb: "qaradi" },
          { arab: "كَنَسَ", ozb: "supurdi" },
        ],
      },
    ],
  },

  13: {
    harflar: [
      {
        harf: "ه",
        xusnixatIzoh: "Eng chuqur halqdan nafsiz nafas — Hams+Roxova. 'h' kabi, ammo chuqurroq",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["هَ", "هَلَ", "هَنَ", "هَمَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["هِ", "هِلِ", "هِنِ", "هِمِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["هُ", "هُلُ", "هُنُ", "هُمُ"], rang: "#0e7490" },
          { nomi: "Kombinatsiya", arabcha: ["نَهَلَ", "كَلَمَهَ", "أَنَهَ", "مَلَكَهَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "نَهَل", ozb: "ho'pladi, qondi" }],
      },
      {
        harf: "و",
        xusnixatIzoh: "Ikki lab dumaloqlanib — Jahr+Roxova. Lin sifati: fathadagi harfdan keyin sokin و → cho'zma 'aw'",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["وَ", "وَلَ", "وَهَ", "وَنَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["وِ", "وِلِ", "وِهِ", "وِنِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["وُ", "وُلُ", "وُهُ", "وُنُ"], rang: "#0e7490" },
          { nomi: "Lin mashqi", arabcha: ["اَوْ", "كَوْنَ", "وَلَدَ", "هَوَلَ"], rang: "#15803d" },
        ],
        sozlar: [{ arab: "وَلَد", ozb: "bola (o'g'il)" }],
      },
      {
        harf: "ي",
        xusnixatIzoh: "Til o'rtasi yumshoq tanglayga yaqin — Jahr+Roxova. Lin sifati: fathadagi harfdan keyin sokin ي → 'ay'",
        qatorlar: [
          { nomi: "Fatha", arabcha: ["يَ", "يَلَ", "يَوَ", "يَهَ"], rang: "#b45309" },
          { nomi: "Kasra", arabcha: ["يِ", "يِلِ", "يِوِ", "يِهِ"], rang: "#7c3aed" },
          { nomi: "Damma", arabcha: ["يُ", "يُلُ", "يُوُ", "يُهُ"], rang: "#0e7490" },
          { nomi: "Lin mashqi", arabcha: ["اَيْ", "يَكُونُ", "وَيَلَ", "بَيْت"], rang: "#15803d" },
        ],
        sozlar: [
          { arab: "يَد", ozb: "qo'l" },
          { arab: "بَيْت", ozb: "uy" },
        ],
      },
    ],
  },
};
