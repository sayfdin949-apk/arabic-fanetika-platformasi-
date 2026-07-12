import type { AmalBob } from "./types";

export const AMALIY: AmalBob[] = [
  {id:1,harflar:["أ","ب","ت"],nomlar:["Alif","Ba","Ta"],
   maxraj:[
     {h:"أ",mx:"Adnal Halq",iz:"Tomoqning eng yuqori qismi. Havo to'liq to'xtatiladi — glottal stop."},
     {h:"ب",mx:"Shafatayn (lab-lab)",iz:"Ikki lab bir-biriga yopiladi, portlatib chiqariladi."},
     {h:"ت",mx:"Tarafi Lison (til uchi—tish)",iz:"Til uchining yuqori tish orqasiga teginishi — jarangsiz portlovchi."}
   ],
   sifatlar:[
     {h:"أ",sf:["Shadid","Jahr","Istifol","Infitoh","Ishmoq"]},
     {h:"ب",sf:["Shadid","Jahr","Istifol","Infitoh","Izloq"]},
     {h:"ت",sf:["Shadid","Hams","Istifol","Infitoh","Izloq"]}
   ],
   shakllar:[
     {h:"أ",m:"أ",b:"أ",o:"ـأ",x:"ـأ",iz:"Alif faqat oldingi harfga ulanadi"},
     {h:"ب",m:"ب",b:"بـ",o:"ـبـ",x:"ـب",iz:"Ba to'rt holatda bog'lanadi — 1 nuqta ostida"},
     {h:"ت",m:"ت",b:"تـ",o:"ـتـ",x:"ـت",iz:"Ta to'rt holatda — 2 nuqta ustida"}
   ],
   harakatlar:[
     {h:"أ",f:"أَ",k:"أِ",d:"أُ",s:"أْ",of:"a",ok:"i",od:"u",os:"hamza"},
     {h:"ب",f:"بَ",k:"بِ",d:"بُ",s:"بْ",of:"ba",ok:"bi",od:"bu",os:"b"},
     {h:"ت",f:"تَ",k:"تِ",d:"تُ",s:"تْ",of:"ta",ok:"ti",od:"tu",os:"t"}
   ],
   sozlar:[
     {ar:"أَب",oq:"Ab",tr:"Ota",h:"أ+ب"},
     {ar:"بَيْت",oq:"Bayt",tr:"Uy",h:"ب+ي+ت"},
     {ar:"تَمْر",oq:"Tamr",tr:"Xurmo",h:"ت+م+ر"},
     {ar:"بَاب",oq:"Baab",tr:"Eshik",h:"ب+ا+ب"},
     {ar:"تَاجِر",oq:"Taajir",tr:"Savdogar",h:"ت+ا+ج+ر"}
   ],
   oqish:[
     {ar:"بَ بِ بُ بْ",iz:"Ba ning 4 harakati"},
     {ar:"تَ تِ تُ تْ",iz:"Ta ning 4 harakati"},
     {ar:"أَبٌ",iz:"Ab — ota"},
     {ar:"بَيْتٌ",iz:"Uy"},
     {ar:"تَمْرٌ",iz:"Xurmo"}
   ],
   yozish:[
     {t:"ب ning 4 xil shaklini yozing",m:"بـ ـبـ ـب ب"},
     {t:"ت ning 4 xil shaklini yozing",m:"تـ ـتـ ـت ت"},
     {t:"'Bayt' va 'Tamr' yozing",m:"بَيْتٌ — تَمْرٌ"}
   ],
   uyvazifa:["أ، ب، ت harflarini 5 martadan yozing","Ba ning 4 harakatini aytib bering","'Baab','Ab','Tamr' ni 10 marta o'qing"],
   test:[
     {s:"ب harfining maxraji qaysi?",v:["Halq (tomoq)","Lison (til)","Shafatayn (lab-lab)","Jawf (bo'shliq)"],t:2},
     {s:"ت harfining maxraji qaysi?",v:["Shafatayn","Vasat Halq","Tarafi Lison (til uchi—tish)","Jawf"],t:2},
     {s:"أ harfining maxraji qaysi?",v:["Vasat Halq","Adnal Halq","Aqsal Halq","Shafatayn"],t:1},
     {s:"ب ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Safir","G'unna"],t:1},
     {s:"ت ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Safir","G'unna"],t:1},
     {s:"ب va ت yozuvdagi farqi?",v:["Maxraj farqi","ب ostida 1 nuqta, ت ustida 2 nuqta","Sifat farqi","Shakl tamoman boshqa"],t:1},
     {s:"بَيْت so'zining ma'nosi?",v:["Kitob","Eshik","Uy","Bola"],t:2},
     {s:"تَمْر so'zining ma'nosi?",v:["Kiyim","Xurmo","Uy","Uch"],t:1},
     {s:"أَب so'zining ma'nosi?",v:["Aka","Eshik","Ota","Bola"],t:2},
     {s:"ب ning o'rtadagi (medial) shakli qaysi?",v:["بـ","ـبـ","ـب","ب"],t:1}
   ]},

  {id:2,harflar:["ث","ج"],nomlar:["Sa","Jim"],
   maxraj:[
     {h:"ث",mx:"Tarafi Lison (tish oraliq)",iz:"Til uchi ikki tish orasiga chiqariladi — 'think' dagi 'th'."},
     {h:"ج",mx:"Vasat Lison",iz:"Tilning o'rta qismi tanglay tomon ko'tariladi."}
   ],
   sifatlar:[
     {h:"ث",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq"]},
     {h:"ج",sf:["Shadid","Jahr","Istifol","Infitoh","Ishmoq"]}
   ],
   shakllar:[
     {h:"ث",m:"ث",b:"ثـ",o:"ـثـ",x:"ـث",iz:"Uch nuqta ustida"},
     {h:"ج",m:"ج",b:"جـ",o:"ـجـ",x:"ـج",iz:"Bir nuqta pastida"}
   ],
   harakatlar:[
     {h:"ث",f:"ثَ",k:"ثِ",d:"ثُ",s:"ثْ",of:"θa",ok:"θi",od:"θu",os:"θ"},
     {h:"ج",f:"جَ",k:"جِ",d:"جُ",s:"جْ",of:"ja",ok:"ji",od:"ju",os:"j"}
   ],
   sozlar:[
     {ar:"ثَوْب",oq:"θawb",tr:"Kiyim",h:"ث+و+ب"},
     {ar:"ثَلَاثَة",oq:"θalaθa",tr:"Uch (son)",h:"ث+ل+ا+ث"},
     {ar:"جَمَل",oq:"Jamal",tr:"Tuya",h:"ج+م+ل"},
     {ar:"جَاءَ",oq:"Jaa'a",tr:"Keldi",h:"ج+ا+ء"},
     {ar:"أَجَل",oq:"Ajal",tr:"Ha/Albatta",h:"أ+ج+ل"}
   ],
   oqish:[
     {ar:"ثَ ثِ ثُ ثْ",iz:"Sa (tilni chiqarib jarangsiz)"},
     {ar:"جَ جِ جُ جْ",iz:"Jim 4 harakati"},
     {ar:"ثَوْبٌ",iz:"Kiyim"},
     {ar:"جَمَلٌ كَبِيرٌ",iz:"Katta tuya"},
     {ar:"ثَلَاثَةُ أَجْمَالٍ",iz:"Uch tuya"}
   ],
   yozish:[
     {t:"ث va ت farqini yozing",m:"ت (2 nuqta) — ث (3 nuqta)"},
     {t:"ج ning 4 xil shaklini yozing",m:"جـ ـجـ ـج ج"},
     {t:"'θawb' va 'Jamal' yozing",m:"ثَوْبٌ — جَمَلٌ"}
   ],
   uyvazifa:["ث va ج ni 5 martadan yozing","ث ni tilni chiqarib 20 marta ayting","'θawb','Jamal','θalaθa' yod oling"],
   test:[
     {s:"ث qanday talaffuz qilinadi?",v:["Oddiy 's' kabi","Tilni tishlar orasiga chiqarib jarangsiz","Qalin 's' kabi","Tomoqdan"],t:1},
     {s:"ج harfining maxraji qaysi?",v:["Vasat Halq","Vasat Lison","Adnal Halq","Shafatayn"],t:1},
     {s:"ث ning maxraji qaysi?",v:["Vasat Lison","Shafatayn","Tarafi Lison (tish oraliq)","Halq"],t:2},
     {s:"ج ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Safir","G'unna"],t:1},
     {s:"ث ning kuchli/zaif sifati?",v:["Shadid","Tavassut","Raxv","Qalqala"],t:2},
     {s:"ث va ت yozuvdagi farqi?",v:["Maxraj farqi","ت 2 nuqta, ث 3 nuqta ustida","Sifat farqi","Shakl tamoman boshqa"],t:1},
     {s:"ثَوْب so'zining ma'nosi?",v:["Xurmo","Kiyim","Uy","Uch"],t:1},
     {s:"جَمَل so'zining ma'nosi?",v:["Tosh","Tuya","Sevgi","Keldi"],t:1},
     {s:"ثَلَاثَة nechani anglatadi?",v:["Ikki","Uch","To'rt","Besh"],t:1},
     {s:"ج harfining nuqtasi qayerda?",v:["Ustida","Ichida","Pastida","Yo'q"],t:2}
   ]},

  {id:3,harflar:["ح","خ"],nomlar:["Ha","Xo"],
   maxraj:[
     {h:"ح",mx:"Vasat Halq",iz:"Tomoqning o'rta qismidan chuqur nafas — jarangsiz."},
     {h:"خ",mx:"Aqsal Halq",iz:"Tomoqning pastki qismidan jarangsiz — o'zbek 'x' dan chuqurroq."}
   ],
   sifatlar:[
     {h:"ح",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq"]},
     {h:"خ",sf:["Raxv","Hams","Isti'lo","Infitoh","Ishmoq"]}
   ],
   shakllar:[
     {h:"ح",m:"ح",b:"حـ",o:"ـحـ",x:"ـح",iz:"Nuqtasiz"},
     {h:"خ",m:"خ",b:"خـ",o:"ـخـ",x:"ـخ",iz:"Uch nuqta ustida (ح ga o'xshash shakl)"}
   ],
   harakatlar:[
     {h:"ح",f:"حَ",k:"حِ",d:"حُ",s:"حْ",of:"ħa",ok:"ħi",od:"ħu",os:"ħ"},
     {h:"خ",f:"خَ",k:"خِ",d:"خُ",s:"خْ",of:"xa",ok:"xi",od:"xu",os:"x"}
   ],
   sozlar:[
     {ar:"حَجَر",oq:"Ħajar",tr:"Tosh",h:"ح+ج+ر"},
     {ar:"حُبٌّ",oq:"Ħubb",tr:"Sevgi",h:"ح+ب"},
     {ar:"خُبْز",oq:"Xubz",tr:"Non",h:"خ+ب+ز"},
     {ar:"خَيْر",oq:"Xayr",tr:"Yaxshilik",h:"خ+ي+ر"},
     {ar:"أَخٌ",oq:"Ax",tr:"Aka",h:"أ+خ"}
   ],
   oqish:[
     {ar:"حَ حِ حُ حْ",iz:"Ha (tomoqdan chuqur nafas)"},
     {ar:"خَ خِ خُ خْ",iz:"Xo 4 harakati"},
     {ar:"حُبٌّ كَبِيرٌ",iz:"Katta sevgi"},
     {ar:"خُبْزٌ وَمَاءٌ",iz:"Non va suv"},
     {ar:"أَخُو الخَيْرِ",iz:"Yaxshilik akasi"}
   ],
   yozish:[
     {t:"ح va خ farqini yozing",m:"ح (nuqtasiz) — خ (uch nuqta)"},
     {t:"'Ħajar' va 'Xubz' yozing",m:"حَجَرٌ — خُبْزٌ"},
     {t:"Ikki harfning maxrajini taqqoslang",m:"ح Vasat — خ Aqsal Halq"}
   ],
   uyvazifa:["ح va خ ni 5 martadan yozing","ح ni tomoqdan 20 marta ayting","'Ħajar','Xubz','Xayr' yod oling"],
   test:[
     {s:"ح harfining maxraji qaysi?",v:["Adnal Halq","Aqsal Halq","Vasat Halq","Jawf"],t:2},
     {s:"خ harfining maxraji qaysi?",v:["Adnal Halq","Vasat Halq","Aqsal Halq","Jawf"],t:2},
     {s:"ح ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Safir","G'unna"],t:1},
     {s:"خ ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Tafashi","Safir"],t:1},
     {s:"ح va خ yozuvdagi farqi?",v:["Maxraj farqi","خ uch nuqtali, ح nuqtasiz","Sifat farqi","Shakl tamoman boshqa"],t:1},
     {s:"خ ning ko'tarilish sifati?",v:["Istifol","Isti'lo","Infitoh","Itboq"],t:1},
     {s:"ح va خ ning maxraj farqi nima?",v:["Bir xil","ح Vasat, خ Aqsal (chuqurroq)","خ Vasat, ح Aqsal","Ikkisi ham Adnal"],t:1},
     {s:"حَجَر so'zining ma'nosi?",v:["Tuya","Non","Tosh","Sevgi"],t:2},
     {s:"خُبْز so'zining ma'nosi?",v:["Dars","Non","Aka","Uy"],t:1},
     {s:"أَخٌ so'zining ma'nosi?",v:["Ota","Aka","Uy","Dars"],t:1}
   ]},

  {id:4,harflar:["د","ذ"],nomlar:["Dal","Zal"],
   maxraj:[
     {h:"د",mx:"Tarafi Lison (til uchi—tish)",iz:"Portlovchi jarangli tovush — til uchi tishga."},
     {h:"ذ",mx:"Tarafi Lison (tish oraliq, jarangli)",iz:"Til uchi ikki tish orasiga chiqariladi — 'this' dagi 'dh'."}
   ],
   sifatlar:[
     {h:"د",sf:["Shadid","Jahr","Istifol","Infitoh","Ishmoq"]},
     {h:"ذ",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq"]}
   ],
   shakllar:[
     {h:"د",m:"د",b:"د",o:"ـد",x:"ـد",iz:"Faqat o'ng tomonga — nuqtasiz"},
     {h:"ذ",m:"ذ",b:"ذ",o:"ـذ",x:"ـذ",iz:"Faqat o'ng tomonga — bir nuqta"}
   ],
   harakatlar:[
     {h:"د",f:"دَ",k:"دِ",d:"دُ",s:"دْ",of:"da",ok:"di",od:"du",os:"d"},
     {h:"ذ",f:"ذَ",k:"ذِ",d:"ذُ",s:"ذْ",of:"ða",ok:"ði",od:"ðu",os:"ð"}
   ],
   sozlar:[
     {ar:"دَرْس",oq:"Dars",tr:"Dars",h:"د+ر+س"},
     {ar:"دَار",oq:"Daar",tr:"Uy",h:"د+ا+ر"},
     {ar:"ذَهَبَ",oq:"Zahaba",tr:"Ketdi",h:"ذ+ه+ب"},
     {ar:"هَذَا",oq:"Haazaa",tr:"Bu",h:"ه+ذ+ا"},
     {ar:"ذَكَاء",oq:"Zakaau",tr:"Aql/Ziyraklik",h:"ذ+ك+ا+ء"}
   ],
   oqish:[
     {ar:"دَ دِ دُ دْ",iz:"Dal 4 harakati"},
     {ar:"ذَ ذِ ذُ ذْ",iz:"Zal (tilni chiqarib jarangli)"},
     {ar:"هَذَا الدَّرْسُ",iz:"Bu dars"},
     {ar:"ذَهَبَ إِلَى الدَّارِ",iz:"Uyga ketdi"},
     {ar:"دَارُ الذَّكِيِّ",iz:"Aqllining uyi"}
   ],
   yozish:[
     {t:"د ning shaklini yozing (faqat o'ngga)",m:"د ـد"},
     {t:"ذ va د farqini yozing",m:"د (nuqtasiz) — ذ (bir nuqta)"},
     {t:"'Dars' va 'Zahaba' yozing",m:"دَرْسٌ — ذَهَبَ"}
   ],
   uyvazifa:["د va ذ ni 5 martadan yozing","ذ ni tilni chiqarib 20 marta ayting","'Dars','Zahaba','Haazaa' yod oling"],
   test:[
     {s:"د harfining maxraji qaysi?",v:["Shafatayn","Vasat Lison","Tarafi Lison (til uchi—tish)","Halq"],t:2},
     {s:"ذ qanday talaffuz qilinadi?",v:["Tilni tishlar orasiga chiqarib jarangsiz","Tilni tishlar orasiga chiqarib jarangli","Oddiy z kabi","Tomoqdan"],t:1},
     {s:"د ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Tafashi","Safir"],t:1},
     {s:"ذ ning kuchli/zaif sifati?",v:["Shadid","Tavassut","Raxv","Qalqala"],t:2},
     {s:"ذ va ث ning asosiy farqi?",v:["Maxraj bir xil","ذ jarangli (Jahr), ث jarangsiz (Hams)","Sifat bir xil","Shakl bir xil"],t:1},
     {s:"د faqat qaysi tomonga bog'lanadi?",v:["Ikki tomonga","Chap tomonga","O'ng tomonga (faqat)","Ulanmaydi"],t:2},
     {s:"ذَهَبَ so'zining ma'nosi?",v:["Keldi","Ketdi","O'tirdi","Yozdi"],t:1},
     {s:"هَذَا so'zining ma'nosi?",v:["U","Men","Bu","Siz"],t:2},
     {s:"دَرْس so'zining ma'nosi?",v:["Uy","Non","Dars","Yaxshilik"],t:2},
     {s:"ذ va ز ning asosiy farqi?",v:["Jarangli/jarangsiz farqi","ذ til chiqarib, ز oddiy joyda","Sifat bir xil","Maxraj bir xil"],t:1}
   ]},

  {id:5,harflar:["ر","ز"],nomlar:["Ra","Zayn"],
   maxraj:[
     {h:"ر",mx:"Tarafi Lison (til uchi—milk)",iz:"Til uchi yuqori milkka tegib, titrab chiqadi — Takrir."},
     {h:"ز",mx:"Tarafi Lison (tish izi, jarangli)",iz:"Jarangli z — Safir sifati."}
   ],
   sifatlar:[
     {h:"ر",sf:["Tavassut","Jahr","Istifol/Isti'lo","Infitoh","Takrir","Inhiraf","Izloq"]},
     {h:"ز",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq","Safir"]}
   ],
   shakllar:[
     {h:"ر",m:"ر",b:"ر",o:"ـر",x:"ـر",iz:"Faqat o'ngga — nuqtasiz"},
     {h:"ز",m:"ز",b:"ز",o:"ـز",x:"ـز",iz:"Faqat o'ngga — bir nuqta"}
   ],
   harakatlar:[
     {h:"ر",f:"رَ",k:"رِ",d:"رُ",s:"رْ",of:"ra",ok:"ri",od:"ru",os:"r"},
     {h:"ز",f:"زَ",k:"زِ",d:"زُ",s:"زْ",of:"za",ok:"zi",od:"zu",os:"z"}
   ],
   sozlar:[
     {ar:"رَجُل",oq:"Rajul",tr:"Erkak",h:"ر+ج+ل"},
     {ar:"دَرَسَ",oq:"Darasa",tr:"O'qidi",h:"د+ر+س"},
     {ar:"زَيْد",oq:"Zayd",tr:"(Ism)",h:"ز+ي+د"},
     {ar:"زَرَعَ",oq:"Zaraa",tr:"Ekdi",h:"ز+ر+ع"},
     {ar:"رَأْس",oq:"Ra's",tr:"Bosh",h:"ر+أ+س"}
   ],
   oqish:[
     {ar:"رَ رِ رُ رْ",iz:"Ra (titrab chiqadi — Takrir)"},
     {ar:"زَ زِ زُ زْ",iz:"Zayn (jarangli z — Safir)"},
     {ar:"رَجُلٌ كَبِيرٌ",iz:"Katta erkak"},
     {ar:"زَرَعَ الرَّجُلُ",iz:"Erkak ekdi"},
     {ar:"دَرَسَ زَيْدٌ",iz:"Zayd o'qidi"}
   ],
   yozish:[
     {t:"ر ning Takrir sifatini tushuntir",m:"Til uchi milkka tegib titradi"},
     {t:"ر va ز — ikkalasi ham faqat o'ngga",m:"ـر ـز"},
     {t:"'Rajul' va 'Zaraa' yozing",m:"رَجُلٌ — زَرَعَ"}
   ],
   uyvazifa:["ر va ز ni 5 martadan yozing","Ra ning Takrir sifatini ko'rsating","'Rajul','Darasa','Zayd' yod oling"],
   test:[
     {s:"ر harfining maxraji qaysi?",v:["Vasat Halq","Vasat Lison","Tarafi Lison (til uchi—milk)","Jawf"],t:2},
     {s:"ز harfining maxraji qaysi?",v:["Vasat Halq","Tarafi Lison (tish izi, jarangli)","Shafatayn","Jawf"],t:1},
     {s:"ر ning maxsus sifati (titrab chiqish)?",v:["Safir","Tafashi","Takrir","G'unna"],t:2},
     {s:"ز ning maxsus sifati?",v:["Takrir","Tafashi","Safir","G'unna"],t:2},
     {s:"ر va ز ning jarangli/jarangsiz sifati?",v:["Ikkalasi ham Hams","Ikkalasi ham Jahr","ر Jahr, ز Hams","ر Hams, ز Jahr"],t:1},
     {s:"ر va ز yozuvda qaysi tomonga?",v:["Ikki tomonga","Faqat chap tomonga","Faqat o'ng tomonga","Ulanmaydi"],t:2},
     {s:"ر Tafxim (qalin) yoki Tarqiq (ingichka)?",v:["Har doim qalin","Fatha/damma — qalin, kasra — ingichka","Har doim ingichka","Faqat sukunda qalin"],t:1},
     {s:"رَجُل so'zining ma'nosi?",v:["Bola","Erkak","Ayol","Ota"],t:1},
     {s:"زَرَعَ so'zining ma'nosi?",v:["Ketdi","O'qidi","Ekdi","Keldi"],t:2},
     {s:"دَرَسَ so'zining ma'nosi?",v:["Ketdi","Keldi","O'qidi","Yedi"],t:2}
   ]},

  {id:6,harflar:["س","ش"],nomlar:["Sin","Shin"],
   maxraj:[
     {h:"س",mx:"Tarafi Lison (tish izi, jarangsiz)",iz:"Jarangsiz s — Safir sifati."},
     {h:"ش",mx:"Vasat Lison",iz:"Havo keng yoyiladi — Tafashi sifati."}
   ],
   sifatlar:[
     {h:"س",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq","Safir"]},
     {h:"ش",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq","Tafashi"]}
   ],
   shakllar:[
     {h:"س",m:"س",b:"سـ",o:"ـسـ",x:"ـس",iz:"To'rt tomonga — nuqtasiz"},
     {h:"ش",m:"ش",b:"شـ",o:"ـشـ",x:"ـش",iz:"Uch nuqta ustida (س ga o'xshash)"}
   ],
   harakatlar:[
     {h:"س",f:"سَ",k:"سِ",d:"سُ",s:"سْ",of:"sa",ok:"si",od:"su",os:"s"},
     {h:"ش",f:"شَ",k:"شِ",d:"شُ",s:"شْ",of:"sha",ok:"shi",od:"shu",os:"sh"}
   ],
   sozlar:[
     {ar:"سَمَاء",oq:"Samaau",tr:"Osmon",h:"س+م+ا+ء"},
     {ar:"دَرَسَ",oq:"Darasa",tr:"O'qidi",h:"د+ر+س"},
     {ar:"شَمْس",oq:"Shams",tr:"Quyosh",h:"ش+م+س"},
     {ar:"شَجَر",oq:"Shajar",tr:"Daraxt",h:"ش+ج+ر"},
     {ar:"أَشْجَار",oq:"Ashjaar",tr:"Daraxtlar",h:"أ+ش+ج+ا+ر"}
   ],
   oqish:[
     {ar:"سَ سِ سُ سْ",iz:"Sin 4 harakati"},
     {ar:"شَ شِ شُ شْ",iz:"Shin (Tafashi)"},
     {ar:"شَمْسٌ سَاطِعَةٌ",iz:"Yorqin quyosh"},
     {ar:"سَمَاءٌ صَافِيَةٌ",iz:"Tiniq osmon"},
     {ar:"صَادَ سَمَكًا زَيْدٌ",iz:"Safir harflari (ص س ز)"}
   ],
   yozish:[
     {t:"س va ش farqini yozing",m:"س (nuqtasiz) — ش (3 nuqta)"},
     {t:"Tafashi sifatini tushuntir",m:"Havo og'iz bo'ylab keng yoyiladi"},
     {t:"'Shams' va 'Samaau' yozing",m:"شَمْسٌ — سَمَاءٌ"}
   ],
   uyvazifa:["س va ش ni 5 martadan yozing","Safir: ز، س، ص yod oling","'Shams','Shajar','Samaau' yod oling"],
   test:[
     {s:"Tafashi sifati qaysi harfda bor?",v:["س","ز","ش","ص"],t:2},
     {s:"Safir sifatiga ega harflar?",v:["ل ر ن","ز س ص","ن م","و ي"],t:1},
     {s:"س ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Safir","G'unna"],t:1},
     {s:"ش ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Tafashi","Safir"],t:1},
     {s:"Safir sifati nima?",v:["Havo burundan chiqadi","Hushtak ovozi hosil bo'ladi","Til titraydi","Havo keng yoyiladi"],t:1},
     {s:"ش va س yozuvdagi farqi?",v:["Maxraj farqi","ش uch nuqta, س nuqtasiz","Sifat soni","Shakl tamoman boshqa"],t:1},
     {s:"Tafashi sifati nimani anglatadi?",v:["Til titraydi","Havo burundan chiqadi","Havo og'iz bo'ylab keng yoyiladi","Tomoqdan siqiladi"],t:2},
     {s:"شَمْس so'zining ma'nosi?",v:["Osmon","Daraxt","Quyosh","Bozor"],t:2},
     {s:"سَمَاء so'zining ma'nosi?",v:["Quyosh","Osmon","Bozor","Ism"],t:1},
     {s:"شَجَر so'zining ma'nosi?",v:["Quyosh","Osmon","Daraxt","Non"],t:2}
   ]},

  {id:7,harflar:["ص","ض"],nomlar:["Sod","Dod"],
   maxraj:[
     {h:"ص",mx:"Tarafi Lison (qalin)",iz:"Sin kabi joyda, lekin til orqasi ko'tarilgan — qalin s."},
     {h:"ض",mx:"Hafat Lison (til yon tomoni)",iz:"Tilning yon tomoni milkka — Istitoyla sifati."}
   ],
   sifatlar:[
     {h:"ص",sf:["Raxv","Hams","Isti'lo","Itboq","Ishmoq","Safir"]},
     {h:"ض",sf:["Raxv","Jahr","Isti'lo","Itboq","Ishmoq","Istitoyla"]}
   ],
   shakllar:[
     {h:"ص",m:"ص",b:"صـ",o:"ـصـ",x:"ـص",iz:"Nuqtasiz, yumaloq"},
     {h:"ض",m:"ض",b:"ضـ",o:"ـضـ",x:"ـض",iz:"Nuqtali (ص ga o'xshash)"}
   ],
   harakatlar:[
     {h:"ص",f:"صَ",k:"صِ",d:"صُ",s:"صْ",of:"ṣa",ok:"ṣi",od:"ṣu",os:"ṣ"},
     {h:"ض",f:"ضَ",k:"ضِ",d:"ضُ",s:"ضْ",of:"ḍa",ok:"ḍi",od:"ḍu",os:"ḍ"}
   ],
   sozlar:[
     {ar:"صَارَ",oq:"Ṣaara",tr:"Bo'ldi",h:"ص+ا+ر"},
     {ar:"صَدِيق",oq:"Ṣadiiq",tr:"Do'st",h:"ص+د+ي+ق"},
     {ar:"رِيَاضَة",oq:"Riyaada",tr:"Sport",h:"ر+ي+ا+ض+ة"},
     {ar:"ضَرَبَ",oq:"Ḍaraba",tr:"Urdi",h:"ض+ر+ب"},
     {ar:"أَرْض",oq:"Arḍ",tr:"Yer",h:"أ+ر+ض"}
   ],
   oqish:[
     {ar:"صَ صِ صُ صْ",iz:"Sod (qalin s — Itboq)"},
     {ar:"ضَ ضِ ضُ ضْ",iz:"Dod 4 harakati"},
     {ar:"صَدِيقٌ صَادِقٌ",iz:"To'g'ri so'zli do'st"},
     {ar:"أَرْضٌ وَسَمَاءٌ",iz:"Yer va osmon"},
     {ar:"صَادَ سَمَكًا زَيْدٌ",iz:"Safir iborasi (ص س ز)"}
   ],
   yozish:[
     {t:"ص va س farqini yozing",m:"س ingichka — ص qalin (Itboq+Isti'lo)"},
     {t:"ض va ص farqini yozing",m:"ص nuqtasiz — ض nuqtali"},
     {t:"'Ṣadiiq' va 'Arḍ' yozing",m:"صَدِيقٌ — أَرْضٌ"}
   ],
   uyvazifa:["Itboq sifatiga ega 4 harfni yod oling: ص ض ط ظ","Istitoyla sifatini ko'rsating","'Ṣadiiq','Riyaada','Arḍ' yod oling"],
   test:[
     {s:"Istitoyla sifati qaysi harfda bor?",v:["ط","ص","ض","ظ"],t:2},
     {s:"ص ning ko'tarilish sifati?",v:["Istifol","Isti'lo","Infitoh","Itboq"],t:1},
     {s:"ص ning yopilish sifati?",v:["Infitoh","Istifol","Itboq","Inhiraf"],t:2},
     {s:"ض ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Tafashi","Safir"],t:1},
     {s:"ص ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","G'unna","Takrir"],t:1},
     {s:"ص va ض yozuvdagi farqi?",v:["Maxraj farqi","ص nuqtasiz, ض nuqtali","Sifat soni","Shakl tamoman boshqa"],t:1},
     {s:"Itboq sifatiga ega to'rt harf?",v:["ز س ص ش","ص ض ط ظ","ب ر ف ل","ن م و ي"],t:1},
     {s:"أَرْض so'zining ma'nosi?",v:["Osmon","Yo'l","Yer","Doktor"],t:2},
     {s:"صَدِيق so'zining ma'nosi?",v:["Ota","Do'st","Uy","Dars"],t:1},
     {s:"ضَرَبَ so'zining ma'nosi?",v:["Ketdi","Keldi","O'qidi","Urdi"],t:3}
   ]},

  {id:8,harflar:["ط","ظ"],nomlar:["To","Zo"],
   maxraj:[
     {h:"ط",mx:"Tarafi Lison (til uchi—tish, qalin)",iz:"Qalin t — til orqasi ko'tarilgan, jarangli portlovchi."},
     {h:"ظ",mx:"Tarafi Lison (tish oraliq, qalin, jarangli)",iz:"Tilni chiqarib, til orqasi ko'tarilgan — qalin jarangli."}
   ],
   sifatlar:[
     {h:"ط",sf:["Shadid","Jahr","Isti'lo","Itboq","Ishmoq"]},
     {h:"ظ",sf:["Raxv","Jahr","Isti'lo","Itboq","Ishmoq"]}
   ],
   shakllar:[
     {h:"ط",m:"ط",b:"طـ",o:"ـطـ",x:"ـط",iz:"Nuqtasiz, halqali"},
     {h:"ظ",m:"ظ",b:"ظـ",o:"ـظـ",x:"ـظ",iz:"Bir nuqta ustida (ط ga o'xshash)"}
   ],
   harakatlar:[
     {h:"ط",f:"طَ",k:"طِ",d:"طُ",s:"طْ",of:"ṭa",ok:"ṭi",od:"ṭu",os:"ṭ"},
     {h:"ظ",f:"ظَ",k:"ظِ",d:"ظُ",s:"ظْ",of:"ẓa",ok:"ẓi",od:"ẓu",os:"ẓ"}
   ],
   sozlar:[
     {ar:"طَرِيق",oq:"Ṭariiq",tr:"Yo'l",h:"ط+ر+ي+ق"},
     {ar:"طَبِيب",oq:"Ṭabiib",tr:"Doktor",h:"ط+ب+ي+ب"},
     {ar:"ظَهَرَ",oq:"Ẓahara",tr:"Ko'rindi",h:"ظ+ه+ر"},
     {ar:"عَظِيم",oq:"ʿAẓiim",tr:"Ulug'",h:"ع+ظ+ي+م"},
     {ar:"حَظٌّ",oq:"Ħaẓẓ",tr:"Baxt",h:"ح+ظ"}
   ],
   oqish:[
     {ar:"طَ طِ طُ طْ",iz:"To (qalin t — jarangli)"},
     {ar:"ظَ ظِ ظُ ظْ",iz:"Zo (tilni chiqarib qalin)"},
     {ar:"طَرِيقٌ طَوِيلٌ",iz:"Uzun yo'l"},
     {ar:"ظَهَرَ الْحَقُّ",iz:"Haq namoyon bo'ldi"},
     {ar:"طَبِيبٌ عَظِيمٌ",iz:"Ulug' doktor"}
   ],
   yozish:[
     {t:"ط va ت farqini yozing",m:"ت ingichka — ط qalin (Itboq+Isti'lo)"},
     {t:"ظ va ذ farqini yozing",m:"ذ ingichka — ظ qalin (Itboq)"},
     {t:"'Ṭariiq' va 'ʿAẓiim' yozing",m:"طَرِيقٌ — عَظِيمٌ"}
   ],
   uyvazifa:["Itboq 4 harfni: ص ض ط ظ yod oling","ط va ظ ni talaffuz qiling","'Ṭariiq','Ṭabiib','ʿAẓiim' yod oling"],
   test:[
     {s:"ط harfining maxraji qaysi?",v:["Shafatayn","Vasat Halq","Tarafi Lison (til uchi—tish, qalin)","Jawf"],t:2},
     {s:"ظ qanday talaffuz qilinadi?",v:["Tilni chiqarib jarangsiz ingichka","Tilni chiqarib jarangli qalin","Tomoqdan siqib","Til o'rta qismidan"],t:1},
     {s:"ط ning kuchli/zaif sifati?",v:["Raxv","Tavassut","Shadid","Lin"],t:2},
     {s:"ظ ning kuchli/zaif sifati?",v:["Shadid","Raxv","Tavassut","Qalqala"],t:1},
     {s:"ط va ظ ning umumiy sifati?",v:["Hams+Istifol","Isti'lo+Itboq","Infitoh+Safir","G'unna+Takrir"],t:1},
     {s:"ط va ت farqi?",v:["Shakl farqi","ط qalin (Itboq+Isti'lo), ت ingichka","Maxraj bir xil","Sifat bir xil"],t:1},
     {s:"ظ va ط yozuvdagi farqi?",v:["ط nuqtasiz, ظ bir nuqta ustida","ط nuqtali, ظ nuqtasiz","Ikkisi ham nuqtasiz","Maxraj bir xil"],t:0},
     {s:"طَرِيق so'zining ma'nosi?",v:["Sport","Yo'l","Doktor","Urdi"],t:1},
     {s:"طَبِيب so'zining ma'nosi?",v:["Yo'l","Yer","Doktor","Ota"],t:2},
     {s:"عَظِيم so'zining ma'nosi?",v:["Kichik","Eski","Ulug'","Yangi"],t:2}
   ]},

  {id:9,harflar:["ع","غ"],nomlar:["Ayn","G'ayn"],
   maxraj:[
     {h:"ع",mx:"Vasat Halq",iz:"Tomoqning o'rta qismidan siqib, jarangli."},
     {h:"غ",mx:"Aqsal Halq (jarangli)",iz:"Tomoqning pastki qismidan jarangli — o'zbek g' ga o'xshash."}
   ],
   sifatlar:[
     {h:"ع",sf:["Tavassut","Jahr","Istifol","Infitoh","Ishmoq"]},
     {h:"غ",sf:["Raxv","Jahr","Isti'lo","Infitoh","Ishmoq"]}
   ],
   shakllar:[
     {h:"ع",m:"ع",b:"عـ",o:"ـعـ",x:"ـع",iz:"Maxsus shakl — 4 holat"},
     {h:"غ",m:"غ",b:"غـ",o:"ـغـ",x:"ـغ",iz:"Uch nuqta ustida (ع ga o'xshash)"}
   ],
   harakatlar:[
     {h:"ع",f:"عَ",k:"عِ",d:"عُ",s:"عْ",of:"ʿa",ok:"ʿi",od:"ʿu",os:"ʿ"},
     {h:"غ",f:"غَ",k:"غِ",d:"غُ",s:"غْ",of:"ğa",ok:"ği",od:"ğu",os:"ğ"}
   ],
   sozlar:[
     {ar:"عِلْم",oq:"ʿIlm",tr:"Ilm",h:"ع+ل+م"},
     {ar:"عَمَل",oq:"ʿAmal",tr:"Ish",h:"ع+م+ل"},
     {ar:"غَيْب",oq:"Ğayb",tr:"G'oyib",h:"غ+ي+ب"},
     {ar:"غُرْفَة",oq:"Ğurfa",tr:"Xona",h:"غ+ر+ف"},
     {ar:"بَلَغَ",oq:"Balaği",tr:"Yetdi",h:"ب+ل+غ"}
   ],
   oqish:[
     {ar:"عَ عِ عُ عْ",iz:"Ayn (tomoqdan siqib jarangli)"},
     {ar:"غَ غِ غُ غْ",iz:"G'ayn (jarangli chuqur)"},
     {ar:"عِلْمٌ عَظِيمٌ",iz:"Buyuk ilm"},
     {ar:"غَيْبٌ عَظِيمٌ",iz:"Ulug' g'ayb"},
     {ar:"عَمَلٌ وَعِلْمٌ",iz:"Ish va ilm"}
   ],
   yozish:[
     {t:"ع va غ farqini yozing",m:"ع (nuqtasiz) — غ (uch nuqta)"},
     {t:"ع va غ ning maxraj farqi",m:"ع Vasat — غ Aqsal Halq"},
     {t:"'ʿIlm' va 'Ğayb' yozing",m:"عِلْمٌ — غَيْبٌ"}
   ],
   uyvazifa:["ع ni tomoqdan 20 marta ayting","غ va خ farqini tushuntiring","'ʿIlm','ʿAmal','Ğurfa' yod oling"],
   test:[
     {s:"ع harfining maxraji qaysi?",v:["Adnal Halq","Vasat Halq","Aqsal Halq","Jawf"],t:1},
     {s:"غ harfining maxraji qaysi?",v:["Adnal Halq","Vasat Halq","Aqsal Halq (jarangli)","Shafatayn"],t:2},
     {s:"ع ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Safir","G'unna"],t:1},
     {s:"غ ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Tafashi","Takrir"],t:1},
     {s:"غ va خ ning asosiy farqi?",v:["Maxraj farqi","غ jarangli (Jahr), خ jarangsiz (Hams)","Sifat soni farqi","Shakl farqi"],t:1},
     {s:"ع va غ yozuvdagi farqi?",v:["ع nuqtasiz, غ uch nuqta ustida","ع nuqtali, غ nuqtasiz","Ikkisi ham nuqtasiz","Maxraj bir xil"],t:0},
     {s:"ع ning kuchli/zaif sifati?",v:["Shadid","Raxv","Tavassut","Lin"],t:2},
     {s:"عِلْم so'zining ma'nosi?",v:["Ish","Ilm","Baxt","Ulug'"],t:1},
     {s:"عَمَل so'zining ma'nosi?",v:["Ilm","Baxt","Ish","Ko'rindi"],t:2},
     {s:"غُرْفَة so'zining ma'nosi?",v:["G'oyib","Xona","Sevinch","Yetdi"],t:1}
   ]},

  {id:10,harflar:["ف","ق"],nomlar:["Fa","Qof"],
   maxraj:[
     {h:"ف",mx:"Shafatayn (pastki lab—yuqori tish)",iz:"Pastki lab yuqori tishga tegadi, nafas erkin o'tadi."},
     {h:"ق",mx:"Aqsal Lison (til ildizi—eng orqa)",iz:"Tilning eng orqa qismi — o'zbek q dan chuqurroq."}
   ],
   sifatlar:[
     {h:"ف",sf:["Raxv","Hams","Istifol","Infitoh","Izloq"]},
     {h:"ق",sf:["Shadid","Jahr","Isti'lo","Infitoh","Ishmoq"]}
   ],
   shakllar:[
     {h:"ف",m:"ف",b:"فـ",o:"ـفـ",x:"ـف",iz:"Bir nuqta ustida"},
     {h:"ق",m:"ق",b:"قـ",o:"ـقـ",x:"ـق",iz:"Ikki nuqta ustida"}
   ],
   harakatlar:[
     {h:"ف",f:"فَ",k:"فِ",d:"فُ",s:"فْ",of:"fa",ok:"fi",od:"fu",os:"f"},
     {h:"ق",f:"قَ",k:"قِ",d:"قُ",s:"قْ",of:"qa",ok:"qi",od:"qu",os:"q"}
   ],
   sozlar:[
     {ar:"فِكْر",oq:"Fikr",tr:"Fikr",h:"ف+ك+ر"},
     {ar:"فَرَح",oq:"Faraħ",tr:"Sevinch",h:"ف+ر+ح"},
     {ar:"قَلَم",oq:"Qalam",tr:"Qalam",h:"ق+ل+م"},
     {ar:"قَمَر",oq:"Qamar",tr:"Oy",h:"ق+م+ر"},
     {ar:"فَقَط",oq:"Faqaṭ",tr:"Faqat",h:"ف+ق+ط"}
   ],
   oqish:[
     {ar:"فَ فِ فُ فْ",iz:"Fa (lab-tish)"},
     {ar:"قَ قِ قُ قْ",iz:"Qof (chuqur q — Qalqala)"},
     {ar:"قَلَمٌ وَكِتَابٌ",iz:"Qalam va kitob"},
     {ar:"فِكْرٌ جَيِّدٌ",iz:"Yaxshi fikr"},
     {ar:"خُصَّ ضَغْطٍ قِظْ",iz:"Isti'lo iborasi (ق bor)"}
   ],
   yozish:[
     {t:"ف ning 4 xil shaklini yozing",m:"فـ ـفـ ـف ف"},
     {t:"ق ning 4 xil shaklini yozing",m:"قـ ـقـ ـق ق"},
     {t:"'Fikr' va 'Qalam' yozing",m:"فِكْرٌ — قَلَمٌ"}
   ],
   uyvazifa:["خُصَّ ضَغْطٍ قِظْ yod oling (Isti'lo)","ف va ق ning maxrajini ayting","'Fikr','Faraħ','Qalam' yod oling"],
   test:[
     {s:"ف harfining maxraji qaysi?",v:["Lab-lab (shafatayn)","Pastki lab — yuqori tish","Vasat Halq","Tarafi Lison"],t:1},
     {s:"ق harfining maxraji qaysi?",v:["Vasat Lison","Aqsal Lison (til ildizi)","Tarafi Lison","Jawf"],t:1},
     {s:"ف ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Safir","G'unna"],t:1},
     {s:"ق ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Tafashi","Safir"],t:1},
     {s:"ق ning Qalqala sifati nima?",v:["Til titraydi","Harf sukun holida portlash bilan talaffuz qilinadi","Havo burundan chiqadi","Til cho'zilib chiqadi"],t:1},
     {s:"ف ning maxsus sifati?",v:["G'unna","Tafashi","Izloq","Safir"],t:2},
     {s:"Isti'lo iborasi?",v:["فِرَّ مِنْ لُبّ","خُصَّ ضَغْطٍ قِظْ","لِنْ عُمَرْ","فَحَثَّهُ شَكَسَ"],t:1},
     {s:"فِكْر so'zining ma'nosi?",v:["Fikr","Xona","Sevinch","G'oyib"],t:0},
     {s:"قَلَم so'zining ma'nosi?",v:["Kitob","Oy","Qalam","Katta"],t:2},
     {s:"قَمَر so'zining ma'nosi?",v:["Quyosh","Oy","Yulduz","Osmon"],t:1}
   ]},

  {id:11,harflar:["ك","ل"],nomlar:["Kof","Lom"],
   maxraj:[
     {h:"ك",mx:"Vasat Lison (til o'rta-orqa)",iz:"Tilning o'rta-orqa qismi — q dan oldinroq."},
     {h:"ل",mx:"Tarafi Lison (til uchi yon—milk)",iz:"Til uchi yuqori milkka, havo yon tomoni orqali — Inhiraf."}
   ],
   sifatlar:[
     {h:"ك",sf:["Shadid","Hams","Istifol","Infitoh","Ishmoq"]},
     {h:"ل",sf:["Tavassut","Jahr","Istifol","Infitoh","Inhiraf","Izloq"]}
   ],
   shakllar:[
     {h:"ك",m:"ك",b:"كـ",o:"ـكـ",x:"ـك",iz:"Nuqtasiz, diagonal"},
     {h:"ل",m:"ل",b:"لـ",o:"ـلـ",x:"ـل",iz:"Uzun tik chiziq"}
   ],
   harakatlar:[
     {h:"ك",f:"كَ",k:"كِ",d:"كُ",s:"كْ",of:"ka",ok:"ki",od:"ku",os:"k"},
     {h:"ل",f:"لَ",k:"لِ",d:"لُ",s:"لْ",of:"la",ok:"li",od:"lu",os:"l"}
   ],
   sozlar:[
     {ar:"كِتَاب",oq:"Kitaab",tr:"Kitob",h:"ك+ت+ا+ب"},
     {ar:"كَبِير",oq:"Kabiir",tr:"Katta",h:"ك+ب+ي+ر"},
     {ar:"لَيْل",oq:"Layl",tr:"Kecha",h:"ل+ي+ل"},
     {ar:"كَلَام",oq:"Kalaam",tr:"So'z",h:"ك+ل+ا+م"},
     {ar:"لَمَسَ",oq:"Lamasa",tr:"Tegdi",h:"ل+م+س"}
   ],
   oqish:[
     {ar:"كَ كِ كُ كْ",iz:"Kof 4 harakati"},
     {ar:"لَ لِ لُ لْ",iz:"Lom 4 harakati"},
     {ar:"كِتَابٌ كَبِيرٌ",iz:"Katta kitob"},
     {ar:"كَلَامٌ لَطِيفٌ",iz:"Yoqimli so'z"},
     {ar:"لِنْ عُمَرْ",iz:"Tavassut yodlash: ل ن ع م ر"}
   ],
   yozish:[
     {t:"ك va ق ning maxraj farqi",m:"ق eng orqada — ك undan oldinroq"},
     {t:"Inhiraf sifatini tushuntir",m:"Havo yon tomoni orqali chiqadi"},
     {t:"'Kitaab' va 'Kalaam' yozing",m:"كِتَابٌ — كَلَامٌ"}
   ],
   uyvazifa:["لِنْ عُمَرْ yod oling (Tavassut)","ك va ق farqini ko'rsating","'Kitaab','Kalaam','Layl' yod oling"],
   test:[
     {s:"ك harfining maxraji qaysi?",v:["Aqsal Lison","Vasat Lison (til o'rta-orqa)","Tarafi Lison","Halq"],t:1},
     {s:"ل harfining maxraji qaysi?",v:["Vasat Halq","Shafatayn","Tarafi Lison (til uchi yon—milk)","Jawf"],t:2},
     {s:"ك ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Tafashi","Takrir"],t:1},
     {s:"ل ning maxsus sifati?",v:["G'unna","Tafashi","Inhiraf","Safir"],t:2},
     {s:"Tavassut harflari (لِنْ عُمَرْ)?",v:["ل ن ع م ر","ز س ص","ص ض ط ظ","ب ر ف ل م ن"],t:0},
     {s:"ك va ق maxraj farqi?",v:["ق va ك bir xil joyda","ق eng orqada, ك undan oldinroq","ك eng orqada, ق oldinroq","Ikkalasi halqda"],t:1},
     {s:"ل ning kuchli/zaif sifati?",v:["Shadid","Raxv","Tavassut","Lin"],t:2},
     {s:"كِتَاب so'zining ma'nosi?",v:["Qalam","Oy","Katta","Kitob"],t:3},
     {s:"لَيْل so'zining ma'nosi?",v:["Kun","Kecha","Suv","So'z"],t:1},
     {s:"كَلَام so'zining ma'nosi?",v:["Kecha","Suv","So'z (nutq)","O'qituvchi"],t:2}
   ]},

  {id:12,harflar:["م","ن"],nomlar:["Mim","Nun"],
   maxraj:[
     {h:"م",mx:"Shafatayn (lab-lab)",iz:"Ikki lab yopiladi, nafas burundan — G'unna."},
     {h:"ن",mx:"Tarafi Lison (til uchi—milk)",iz:"Jarangli. Sukun va shadda holida G'unna sifati."}
   ],
   sifatlar:[
     {h:"م",sf:["Shadid","Jahr","Istifol","Infitoh","G'unna","Izloq"]},
     {h:"ن",sf:["Tavassut","Jahr","Istifol","Infitoh","G'unna","Izloq"]}
   ],
   shakllar:[
     {h:"م",m:"م",b:"مـ",o:"ـمـ",x:"ـم",iz:"Halqali shakl"},
     {h:"ن",m:"ن",b:"نـ",o:"ـنـ",x:"ـن",iz:"Bir nuqta ostida"}
   ],
   harakatlar:[
     {h:"م",f:"مَ",k:"مِ",d:"مُ",s:"مْ",of:"ma",ok:"mi",od:"mu",os:"m"},
     {h:"ن",f:"نَ",k:"نِ",d:"نُ",s:"نْ",of:"na",ok:"ni",od:"nu",os:"n"}
   ],
   sozlar:[
     {ar:"مَاء",oq:"Maau",tr:"Suv",h:"م+ا+ء"},
     {ar:"مُعَلِّم",oq:"Muʿallim",tr:"O'qituvchi",h:"م+ع+ل+م"},
     {ar:"نُور",oq:"Nuur",tr:"Nur",h:"ن+و+ر"},
     {ar:"أَنَا",oq:"Anaa",tr:"Men",h:"أ+ن+ا"},
     {ar:"نَهَر",oq:"Nahar",tr:"Daryo",h:"ن+ه+ر"}
   ],
   oqish:[
     {ar:"مَ مِ مُ مْ",iz:"Mim 4 harakati"},
     {ar:"نَ نِ نُ نْ",iz:"Nun 4 harakati"},
     {ar:"نُورٌ وَمَاءٌ",iz:"Nur va suv"},
     {ar:"مُعَلِّمٌ مَاهِرٌ",iz:"Mohir o'qituvchi"},
     {ar:"أَنَا هُنَا",iz:"Men bu yerdaman"}
   ],
   yozish:[
     {t:"م va ن G'unnasini taqqoslang",m:"Ikkisi ham burundan chiqadi"},
     {t:"'Maau' va 'Nuur' yozing",m:"مَاءٌ — نُورٌ"},
     {t:"لِنْ عُمَرْ da م va ن ni toping",m:"Tavassut harflari"}
   ],
   uyvazifa:["G'unna sifatini namoyish qiling","م va ن ning G'unna farqini tushuntiring","'Maau','Muʿallim','Nuur' yod oling"],
   test:[
     {s:"م harfining maxraji qaysi?",v:["Tarafi Lison","Vasat Halq","Shafatayn (lab-lab)","Jawf"],t:2},
     {s:"ن harfining maxraji qaysi?",v:["Shafatayn","Vasat Halq","Tarafi Lison (til uchi—milk)","Jawf"],t:2},
     {s:"G'unna sifatiga ega harflar?",v:["ل ر","ز س","ن م","و ي"],t:2},
     {s:"م ning G'unna sifati qachon yaqqol ko'rinadi?",v:["Har doim","Fatha holida","Shadda va sukun holida","Kasra holida"],t:2},
     {s:"م ning kuchli/zaif sifati?",v:["Raxv","Tavassut","Shadid","Lin"],t:2},
     {s:"ن ning kuchli/zaif sifati?",v:["Shadid","Raxv","Tavassut","Qalqala"],t:2},
     {s:"Nun Sakin holida nechi hukm (qoida) bor?",v:["Ikki","Uch","To'rt","Besh"],t:2},
     {s:"مَاء so'zining ma'nosi?",v:["Kecha","Suv","So'z","O'qituvchi"],t:1},
     {s:"نُور so'zining ma'nosi?",v:["Zulmat","Nur","Daryo","Sovg'a"],t:1},
     {s:"مُعَلِّم so'zining ma'nosi?",v:["O'quvchi","Doktor","O'qituvchi","Muhandis"],t:2}
   ]},

  {id:13,harflar:["ه","و"],nomlar:["Ha","Vov"],
   maxraj:[
     {h:"ه",mx:"Adnal Halq",iz:"Tomoqning og'izga eng yaqin qismidan yengil nafas — jarangsiz h."},
     {h:"و",mx:"Shafatayn + Jawf (mad)",iz:"Lab: ikki lab yumaloqlanadi. Mad holida cho'ziq Ū."}
   ],
   sifatlar:[
     {h:"ه",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq"]},
     {h:"و",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq","Lin (sukunda)"]}
   ],
   shakllar:[
     {h:"ه",m:"ه",b:"هـ",o:"ـهـ",x:"ـه",iz:"Maxsus shakl o'rtada"},
     {h:"و",m:"و",b:"و",o:"ـو",x:"ـو",iz:"Faqat o'ngga"}
   ],
   harakatlar:[
     {h:"ه",f:"هَ",k:"هِ",d:"هُ",s:"هْ",of:"ha",ok:"hi",od:"hu",os:"h"},
     {h:"و",f:"وَ",k:"وِ",d:"وُ",s:"وْ",of:"wa",ok:"wi",od:"wu",os:"w/Ū"}
   ],
   sozlar:[
     {ar:"هَدِيَّة",oq:"Hadiyya",tr:"Sovg'a",h:"ه+د+ي+ة"},
     {ar:"هُنَا",oq:"Hunaa",tr:"Bu yerda",h:"ه+ن+ا"},
     {ar:"وَلَد",oq:"Walad",tr:"Bola",h:"و+ل+د"},
     {ar:"خَوْف",oq:"Xawf",tr:"Qo'rquv",h:"خ+و+ف"},
     {ar:"وَاحِد",oq:"Waahid",tr:"Bir",h:"و+ا+ح+د"}
   ],
   oqish:[
     {ar:"هَ هِ هُ هْ",iz:"Ha (Adnal Halq — yengil h)"},
     {ar:"وَ وِ وُ وْ",iz:"Vov 4 harakati"},
     {ar:"هُنَا وَهُنَاكَ",iz:"Bu va u yerda"},
     {ar:"وَلَدٌ وَبِنْتٌ",iz:"O'g'il va qiz"},
     {ar:"خَوْفٌ وَهَدِيَّةٌ",iz:"Lin sifati ko'rinishi"}
   ],
   yozish:[
     {t:"ه va ح farqini yozing",m:"ه Adnal (yengil) — ح Vasat (chuqur)"},
     {t:"Lin sifatini ko'rsating",m:"خَوْف da و sukun — Lin sifati"},
     {t:"'Walad' va 'Hunaa' yozing",m:"وَلَدٌ — هُنَا"}
   ],
   uyvazifa:["ه va ح farqini ko'rsating","Lin sifatini tushuntiring","'Walad','Hunaa','Hadiyya' yod oling"],
   test:[
     {s:"ه harfining maxraji qaysi?",v:["Vasat Halq","Adnal Halq","Aqsal Halq","Jawf"],t:1},
     {s:"و harfining maxraji qaysi?",v:["Tarafi Lison","Vasat Halq","Shafatayn + Jawf","Adnal Halq"],t:2},
     {s:"ه ning jarangli/jarangsiz sifati?",v:["Jahr","Hams","Safir","G'unna"],t:1},
     {s:"Lin sifati qachon hosil bo'ladi?",v:["ل ر har doim","و ي sukun holida oldingi harfda fatha bo'lsa","ن م shadda holida","ز س fathada"],t:1},
     {s:"Mad Tabiiy (و bilan) qachon hosil bo'ladi?",v:["و dan oldin kasra bo'lsa","و dan oldin damma bo'lsa","و dan oldin fatha bo'lsa","و har doim mad"],t:1},
     {s:"ه va ح ning asosiy farqi?",v:["Maxraj bir xil","ه Adnal (yengil), ح Vasat (chuqur)","Ikkisi ham jarangli","Sifat bir xil"],t:1},
     {s:"هُنَا so'zining ma'nosi?",v:["U yerda","Men","Bu yerda","Biz"],t:2},
     {s:"وَلَد so'zining ma'nosi?",v:["Qiz","Kun","Qo'l","Bola"],t:3},
     {s:"خَوْف da و qanday sifat ko'rsatadi?",v:["Mad (uzun)","Lin (sukun+oldingi fatha)","G'unna","Takrir"],t:1},
     {s:"هَدِيَّة so'zining ma'nosi?",v:["Sovg'a","Bola","Bu yerda","Bir"],t:0}
   ]},

  {id:14,harflar:["ي"],nomlar:["Ya"],
   maxraj:[
     {h:"ي",mx:"Vasat Lison + Jawf (mad)",iz:"Til o'rtasi tanglay tomon ko'tariladi. Mad holida cho'ziq Ī."}
   ],
   sifatlar:[
     {h:"ي",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq","Lin (sukunda)"]}
   ],
   shakllar:[
     {h:"ي",m:"ي",b:"يـ",o:"ـيـ",x:"ـي",iz:"Ikki nuqta ostida — to'rt holatda bog'lanadi"}
   ],
   harakatlar:[
     {h:"ي",f:"يَ",k:"يِ",d:"يُ",s:"يْ",of:"ya",ok:"yi",od:"yu",os:"y/Ī"}
   ],
   sozlar:[
     {ar:"يَوْم",oq:"Yawm",tr:"Kun",h:"ي+و+م"},
     {ar:"يَدٌ",oq:"Yad",tr:"Qo'l",h:"ي+د"},
     {ar:"بَيْت",oq:"Bayt",tr:"Uy",h:"ب+ي+ت"},
     {ar:"أَيْن",oq:"Ayna",tr:"Qayerda",h:"أ+ي+ن"},
     {ar:"يَسِير",oq:"Yasiir",tr:"Oson",h:"ي+س+ي+ر"}
   ],
   oqish:[
     {ar:"يَ يِ يُ يْ",iz:"Ya 4 harakati"},
     {ar:"يَوْمٌ جَمِيلٌ",iz:"Go'zal kun"},
     {ar:"أَيْنَ الْبَيْتُ؟",iz:"Uy qayerda?"},
     {ar:"يَدٌ وَرِجْلٌ",iz:"Qo'l va oyoq"},
     {ar:"كِتَابٌ يَسِيرٌ",iz:"Oson kitob"}
   ],
   yozish:[
     {t:"ي ning 4 xil shaklini yozing",m:"يـ ـيـ ـي ي"},
     {t:"Lin va Mad farqini ko'rsating",m:"بَيْت (Lin) — كِيس (Mad)"},
     {t:"'Yawm' va 'Yad' yozing",m:"يَوْمٌ — يَدٌ"}
   ],
   uyvazifa:["ي ning barcha shakllarini yozing","Lin va Mad sifatlarini taqqoslang","'Yawm','Yad','Ayna' yod oling"],
   test:[
     {s:"ي harfining maxraji qaysi?",v:["Shafatayn","Vasat Halq","Vasat Lison + Jawf","Adnal Halq"],t:2},
     {s:"Lin sifati (ي bilan) qachon hosil bo'ladi?",v:["ي har doim Lin","ي sukun holida oldingi harfda fatha bo'lsa","ي har doim Mad","ي dan oldin damma bo'lsa"],t:1},
     {s:"Mad Tabiiy (ي bilan) qachon hosil bo'ladi?",v:["ي dan oldin fatha bo'lsa","ي dan oldin damma bo'lsa","ي dan oldin kasra bo'lsa","ي har doim mad"],t:2},
     {s:"ي yozuvda qaysi tomonga bog'lanadi?",v:["Faqat o'ngga","Faqat chapga","Ikki tomonga (to'rt holat)","Ulanmaydi"],t:2},
     {s:"ي ning jarangli/jarangsiz sifati?",v:["Hams","Jahr","Safir","G'unna"],t:1},
     {s:"ي va و ning umumiy maxsus sifati?",v:["G'unna","Tafashi","Lin (sukunda)","Safir"],t:2},
     {s:"يَوْم so'zining ma'nosi?",v:["Kecha","Oy","Kun","Yil"],t:2},
     {s:"يَدٌ so'zining ma'nosi?",v:["Oyoq","Bosh","Qo'l","Ko'z"],t:2},
     {s:"أَيْن so'zining ma'nosi?",v:["Qachon","Nima","Qayerda","Kim"],t:2},
     {s:"بَيْت da ي qanday sifat ko'rsatadi?",v:["Mad (uzun)","G'unna","Lin (sukun+oldingi fatha)","Safir"],t:2}
   ]},

  // ── B1 ──────────────────────────────────────────────────────────────

  {id:15,harflar:["مُفْرَد","مُثَنَّى","جَمْع"],nomlar:["Mufrad (yak)","Saniyya (juft)","Jam' (ko'p)"],
   maxraj:[
     {h:"مُفْرَد",mx:"Bitta birlik",iz:"Bitta narsa yoki shaxsni bildiradi. Harakat: raf'=ـٌ, nasb=ـً, jarr=ـٍ (naqira)."},
     {h:"مُثَنَّى",mx:"Ikkita birlik",iz:"Ikki narsani bildiradi. Raf': ـان, Nasb/Jarr: ـيْن qo'shimchasi."},
     {h:"جَمْع",mx:"Ko'plik",iz:"Uch va undan ortiq. Salim: ـون/ـين (muzakkar), ـات (muannash). Taksir: ichki o'zgarish."}
   ],
   sifatlar:[
     {h:"مُزَكَّر",sf:["Erkak jins","Belgi yo'q","كِتَابٌ — kitob","وَلَدٌ — bola","رَجُلٌ — erkak"]},
     {h:"مُؤَنَّث",sf:["Ayol jins","ة yoki tabiiy","مَدْرَسَةٌ — maktab","بِنْتٌ — qiz","شَمْسٌ — quyosh (tabiiy)"]},
     {h:"جَمْع",sf:["Ko'plik: 3+","Salim: qo'shimcha","Taksir: ichki o'zgarish","أَوْلَاد ← وَلَد","كُتُب ← كِتَاب"]}
   ],
   shakllar:[
     {h:"كِتَاب",m:"كِتَابٌ",b:"كِتَابَانِ",o:"كِتَابَيْنِ",x:"كُتُبٌ",iz:"Mufrad → Saniyya → Jam' taksir"},
     {h:"مُعَلِّم",m:"مُعَلِّمٌ",b:"مُعَلِّمَانِ",o:"مُعَلِّمِينَ",x:"مُعَلِّمُونَ",iz:"Mufrad → Saniyya → Jam' salim"},
     {h:"مَدْرَسَة",m:"مَدْرَسَةٌ",b:"مَدْرَسَتَانِ",o:"مَدْرَسَتَيْنِ",x:"مَدَارِسُ",iz:"Muannash: mufrad→saniyya→jam' taksir"}
   ],
   harakatlar:[
     {h:"raf'",f:"ـٌ",k:"ـٌ",d:"ـٌ",s:"ـُ",of:"naqira mufrad",ok:"Nominativ",od:"Ega holati",os:"-un/-u"},
     {h:"nasb",f:"ـً",k:"ـً",d:"ـً",s:"ـَ",of:"naqira mufrad",ok:"Akkuzativ",od:"To'ldiruvchi holati",os:"-an/-a"},
     {h:"jarr",f:"ـٍ",k:"ـٍ",d:"ـٍ",s:"ـِ",of:"naqira mufrad",ok:"Genitiv",od:"Egalik holati",os:"-in/-i"}
   ],
   sozlar:[
     {ar:"كِتَابٌ",oq:"Kitaabun",tr:"Kitob",h:"mufrad naqira"},
     {ar:"اَلْكِتَابُ",oq:"Al-kitaabu",tr:"Kitob (aniq)",h:"mufrad ma'rifa"},
     {ar:"كِتَابَانِ",oq:"Kitaabaani",tr:"Ikki kitob",h:"saniyya raf'"},
     {ar:"كُتُبٌ",oq:"Kutubun",tr:"Kitoblar",h:"jam' taksir"},
     {ar:"مُعَلِّمُونَ",oq:"Mu'allimuuna",tr:"O'qituvchilar",h:"jam' salim muzakkar"}
   ],
   oqish:[
     {ar:"اَلطَّالِبُ مُجْتَهِدٌ",iz:"Talaba (erkak) tirishqoq."},
     {ar:"اَلطَّالِبَةُ مُجْتَهِدَةٌ",iz:"Talaba (ayol) tirishqoq."},
     {ar:"اَلطُّلَّابُ مُجْتَهِدُونَ",iz:"Talabalar (erkak) tirishqoq."},
     {ar:"كِتَابَانِ عَلَى الطَّاوِلَةِ",iz:"Stolda ikki kitob bor."},
     {ar:"كُتُبٌ كَثِيرَةٌ",iz:"Ko'p kitoblar (جَمْع تَكْسِير + sifat)."}
   ],
   yozish:[
     {t:"كِتَاب so'zini mufrad, saniyya, jam' taksir shakllarda yozing",m:"كِتَابٌ — كِتَابَانِ — كُتُبٌ"},
     {t:"مُعَلِّم so'zini mufrad, saniyya, jam' salim shakllarda yozing",m:"مُعَلِّمٌ — مُعَلِّمَانِ — مُعَلِّمُونَ"},
     {t:"Raf', nasb, jarr harakatlarini مُعَلِّم bilan yozing",m:"مُعَلِّمٌ (raf') — مُعَلِّمًا (nasb) — مُعَلِّمٍ (jarr)"}
   ],
   uyvazifa:["وَلَد, بَيْت, رَجُل so'zlarining jam' taksirini yozing","Quyidagi so'zlarni muannash shakliga o'tkazing: طَالِب، مُهَنْدِس، مُدِير","5 ta mufrad ism toping va ularni saniyya shaklida yozing"],
   test:[
     {s:"كِتَابَانِ — qaysi son va holat?",v:["Mufrad raf'","Saniyya raf'","Jam' salim raf'","Jam' taksir"],t:1},
     {s:"مُعَلِّمُونَ — qaysi jam' turi?",v:["Jam' taksir","Jam' muannash salim","Jam' muzakkar salim","Saniyya"],t:2},
     {s:"Ta-marbuta (ة) qaysi jinsni bildiradi?",v:["Muzakkar","Muannash","Har ikkisi","Jinsiz"],t:1},
     {s:"Jam' taksirda nima o'zgaradi?",v:["Faqat qo'shimcha","O'zakning ichki strukturasi","Faqat tanvin","Faqat al"],t:1},
     {s:"كُتُبٌ — qaysi so'zning jam' taksiri?",v:["مَكْتَب","كُتِبَ","كِتَاب","كَتَبَ"],t:2},
     {s:"Saniyya nasb/jarr qo'shimchasi?",v:["-ان","-ين","-ون","-ات"],t:1},
     {s:"شَمْس (quyosh) — qaysi muannash turi?",v:["Ta-marbuta","Alif-mamduda","Tabiiy muannash","Muzakkar"],t:2},
     {s:"Raf' holida naqira mufrad ism qanday harakat oladi?",v:["ـً","ـٍ","ـٌ","ـُ"],t:2},
     {s:"مَدَارِسُ — bu so'z qaysi mufraddan hosil bo'lgan?",v:["مَدْرَسَة","دَرَسَ","مُدَرِّس","دِرَاسَة"],t:0},
     {s:"أَوْلَاد — qaysi so'zning jam' taksiri?",v:["أُمّ","وِلَادَة","وَلَد","أَوَّل"],t:2}
   ]},

  {id:16,harflar:["أَنَا","أَنْتَ","هُوَ","نَحْنُ"],nomlar:["Men","Sen","U","Biz"],
   maxraj:[
     {h:"أَنَا",mx:"1-shaxs mufrad",iz:"Men. Ismliy gap mubtadasi sifatida: أَنَا طَالِبٌ — Men talabaman (erkak)."},
     {h:"أَنْتَ / أَنْتِ",mx:"2-shaxs mufrad",iz:"Sen (أَنْتَ erkak, أَنْتِ ayol). أَنْتَ مُجْتَهِدٌ — Sen tirishqoqsan."},
     {h:"هُوَ / هِيَ",mx:"3-shaxs mufrad",iz:"U (هُوَ erkak, هِيَ ayol). هِيَ مُعَلِّمَةٌ — U o'qituvchi (ayol)."},
     {h:"نَحْنُ",mx:"1-shaxs ko'plik",iz:"Biz. نَحْنُ طُلَّابٌ — Biz talabamiz."}
   ],
   sifatlar:[
     {h:"أَنَا",sf:["1-shaxs mufrad","Jinsiz (erkak/ayol)","Mubtada sifatida","أَنَا + ism"]},
     {h:"أَنْتُمْ",sf:["2-shaxs ko'plik erkak","أَنْتُنَّ ayol ko'plik","Mubtada sifatida","Maazida ـتُمْ"]},
     {h:"هُمْ / هُنَّ",sf:["3-shaxs ko'plik","هُمْ erkak","هُنَّ ayol","Muzori'da يَـ (هُمْ)"]},
     {h:"Birikkan",sf:["ـي (men)","ـكَ (sen erkak)","ـهُ (u erkak)","ـنَا (biz)"]}
   ],
   shakllar:[
     {h:"أَنَا",m:"أَنَا",b:"أَنْتَ",o:"هُوَ",x:"نَحْنُ",iz:"Mufrad olmoshlar — yagona→ikki→u→biz"},
     {h:"أَنْتِ",m:"أَنْتِ",b:"أَنْتُمَا",o:"أَنْتُمْ",x:"أَنْتُنَّ",iz:"2-shaxs: ayol→juft→erkak ko'p→ayol ko'p"},
     {h:"هِيَ",m:"هِيَ",b:"هُمَا",o:"هُمْ",x:"هُنَّ",iz:"3-shaxs ayol→juft→erkak ko'p→ayol ko'p"}
   ],
   harakatlar:[
     {h:"ـي",f:"كِتَابِي",k:"قَلَمِي",d:"بَيْتِي",s:"أَبِي",of:"Mening kitobim",ok:"Mening qalamim",od:"Mening uyim",os:"Mening otam"},
     {h:"ـكَ",f:"كِتَابُكَ",k:"قَلَمُكَ",d:"بَيْتُكَ",s:"أَبُوكَ",of:"Sening kitobing",ok:"Sening qalamim",od:"Sening uying",os:"Sening otang"},
     {h:"ـهُ",f:"كِتَابُهُ",k:"قَلَمُهُ",d:"بَيْتُهُ",s:"أَبُوهُ",of:"Uning kitobi",ok:"Uning qalami",od:"Uning uyi",os:"Uning otasi"}
   ],
   sozlar:[
     {ar:"أَنَا طَالِبٌ",oq:"Anaa taalibun",tr:"Men talabaman (erkak)",h:"1-shaxs + ism"},
     {ar:"هِيَ مُعَلِّمَةٌ",oq:"Hiya mu'allimatun",tr:"U o'qituvchi (ayol)",h:"3-shaxs ayol + ism"},
     {ar:"نَحْنُ طُلَّابٌ",oq:"Nahnu tullaabun",tr:"Biz talabamiz",h:"1-shaxs ko'plik + jam'"},
     {ar:"كِتَابُهُ كَبِيرٌ",oq:"Kitaabuhu kabirun",tr:"Uning kitobi katta",h:"birikkan olmosh"},
     {ar:"هُمْ مُهَنْدِسُونَ",oq:"Hum muhandisuuna",tr:"Ular muhandislar",h:"ko'plik + jam' salim"}
   ],
   oqish:[
     {ar:"أَنَا مُدِيرٌ وَأَنْتَ مُعَلِّمٌ",iz:"Men direktor, sen o'qituvchisan."},
     {ar:"هُوَ ذَكِيٌّ وَهِيَ مُجْتَهِدَةٌ",iz:"U (erkak) aqlli va u (ayol) tirishqoq."},
     {ar:"نَحْنُ فِي الْمَدْرَسَةِ",iz:"Biz maktabdamiz."},
     {ar:"كِتَابُكَ عَلَى مَكْتَبِي",iz:"Sening kitobing mening stolimda."},
     {ar:"هُمْ أَصْدِقَاؤُنَا",iz:"Ular bizning do'stlarimiz."}
   ],
   yozish:[
     {t:"Har bir olmosh bilan bir jumlat yozing",m:"أَنَا + ism, أَنْتَ + sifat..."},
     {t:"Birikkan olmoshlar ـي، ـكَ، ـهُ ni كِتَاب bilan yozing",m:"كِتَابِي، كِتَابُكَ، كِتَابُهُ"},
     {t:"5 ta jumlat: har biri boshqa olmosh bilan",m:"أَنَا...، أَنْتَ...، هُوَ..."}
   ],
   uyvazifa:["10 ta olmoshni yod oling (alohida + birikkan)","هُوَ مُهَنْدِسٌ jumlasini barcha olmoshlar bilan o'zgartiring","Birikkan olmosh bilan 5 ta izofa qurilmasi tuzing"],
   test:[
     {s:"'Men' arabcha olmoshi?",v:["أَنْتَ","هُوَ","أَنَا","نَحْنُ"],t:2},
     {s:"هِيَ — qaysi shaxs?",v:["1-shaxs","2-shaxs erkak","3-shaxs ayol","3-shaxs erkak"],t:2},
     {s:"'Biz' arabcha olmoshi?",v:["هُمْ","أَنْتُمْ","نَحْنُ","أَنْتُنَّ"],t:2},
     {s:"كِتَابُكَ da ـكَ nima bildiradi?",v:["Mening","Sening (erkak)","Uning","Bizning"],t:1},
     {s:"هُمْ — qaysi jins va son?",v:["Ayol mufrad","Erkak mufrad","Erkak ko'plik","Ayol ko'plik"],t:2},
     {s:"أَنْتِ — qaysi shaxs?",v:["1-shaxs","2-shaxs erkak","2-shaxs ayol","3-shaxs"],t:2},
     {s:"كِتَابُنَا da ـنَا nima bildiradi?",v:["Men","Sen","U","Biz"],t:3},
     {s:"أَنَا طَالِبٌ jumlasida أَنَا qanday vazifa?",v:["Xabar","Mubtada","Sifat","Fe'l"],t:1},
     {s:"هُنَّ — qaysi shaxs?",v:["Erkak ko'plik","Ayol ko'plik (3-shaxs)","1-shaxs ko'plik","2-shaxs ayol"],t:1},
     {s:"Birikkan olmosh ـهَا qaysi shaxsni bildiradi?",v:["Meni","Seni (erkak)","Uni (ayol)","Bizni"],t:2}
   ]},

  // ── B2 ──────────────────────────────────────────────────────────────

  {id:17,harflar:["ذَهَبَ","كَتَبَ","قَرَأَ"],nomlar:["Ketdi","Yozdi","O'qidi"],
   maxraj:[
     {h:"ذَهَبَ",mx:"فَعَلَ — I vazn maazi",iz:"3-shaxs erkak mufrad o'tgan zamon. Bu fe'lning lug'aviy (asosiy) shakli."},
     {h:"ذَهَبَتْ",mx:"فَعَلَتْ — ayol qo'shimchasi",iz:"3-shaxs ayol mufrad. Oxirida ـتْ (sukun). Misol: ذَهَبَتِ الْبِنْتُ — Qiz ketdi."},
     {h:"ذَهَبُوا",mx:"فَعَلُوا — ko'plik",iz:"3-shaxs erkak ko'plik. ـوا qo'shimchasi (alif yoziladi, o'qilmaydi)."}
   ],
   sifatlar:[
     {h:"مَاضِي",sf:["O'tgan zamon","3-shaxs erkak = asosiy forma","13 ta shaxs shakli","Inkor: مَا + fe'l"]},
     {h:"مُضَارِع",sf:["Hozirgi/kelasi zamon","يَـ/تَـ/أَـ/نَـ harflari","Raf' holati: ـُ","Inkor: لَا/لَمْ/لَنْ"]},
     {h:"أَمْر",sf:["Buyruq fe'l","Muzori' jazmidan hosil","2-shaxs uchun","Inkor: لَا + muzori' jazm"]}
   ],
   shakllar:[
     {h:"كَتَبَ",m:"كَتَبَ",b:"كَتَبَتْ",o:"كَتَبُوا",x:"كَتَبْنَ",iz:"M.mufrad → F.mufrad → M.ko'p → F.ko'p"},
     {h:"كَتَبْتَ",m:"كَتَبْتَ",b:"كَتَبْتِ",o:"كَتَبْتُمْ",x:"كَتَبْتُنَّ",iz:"2-shaxs: M.m → F.m → M.k → F.k"},
     {h:"كَتَبْتُ",m:"كَتَبْتُ",b:"كَتَبْنَا",o:"كَتَبْتُمَا",x:"كَتَبَا",iz:"1-shaxs m/k va saniyyalar"}
   ],
   harakatlar:[
     {h:"ذَهَبَ",f:"يَذْهَبُ",k:"اِذْهَبْ",d:"لَا تَذْهَبْ",s:"مَا ذَهَبَ",of:"Muzori' (hozirgi)",ok:"Buyruq (amir)",od:"Inkor buyruq",os:"Maazi inkori"},
     {h:"كَتَبَ",f:"يَكْتُبُ",k:"اُكْتُبْ",d:"لَا تَكْتُبْ",s:"مَا كَتَبَ",of:"Muzori'",ok:"Buyruq",od:"Inkor buyruq",os:"Maazi inkori"},
     {h:"قَرَأَ",f:"يَقْرَأُ",k:"اِقْرَأْ",d:"لَا تَقْرَأْ",s:"مَا قَرَأَ",of:"Muzori'",ok:"Buyruq",od:"Inkor buyruq",os:"Maazi inkori"}
   ],
   sozlar:[
     {ar:"ذَهَبَ الْوَلَدُ",oq:"Zahaba al-waladu",tr:"Bola ketdi.",h:"maazi + fa'il"},
     {ar:"كَتَبَتِ الطَّالِبَةُ",oq:"Katabati at-taalibatu",tr:"Talaba qiz yozdi.",h:"maazi ayol"},
     {ar:"قَرَأُوا الْكِتَابَ",oq:"Qara'uu al-kitaaba",tr:"Ular kitobni o'qishdi.",h:"ko'plik maazi"},
     {ar:"مَا فَهِمْتُ",oq:"Maa fahimtu",tr:"Men tushunmadim.",h:"inkor maazi"},
     {ar:"كَتَبْنَا الدَّرْسَ",oq:"Katabnaa ad-darsa",tr:"Biz darsni yozdik.",h:"1-ko'plik maazi"}
   ],
   oqish:[
     {ar:"ذَهَبَ الطَّالِبُ إِلَى الْمَكْتَبَةِ",iz:"Talaba kutubxonaga ketdi."},
     {ar:"كَتَبَتِ الْبِنْتُ الرِّسَالَةَ",iz:"Qiz xatni yozdi."},
     {ar:"قَرَأْنَا كِتَابًا مُفِيدًا",iz:"Biz foydali bir kitob o'qidik."},
     {ar:"مَا فَهِمُوا السُّؤَالَ",iz:"Ular savolni tushunishmadi."},
     {ar:"كَتَبْتُ وَقَرَأْتُ",iz:"Men yozdim va o'qidim."}
   ],
   yozish:[
     {t:"ذَهَبَ fe'lini 6 ta asosiy shaxs uchun tuslantirib yozing",m:"ذَهَبَ، ذَهَبَتْ، ذَهَبُوا، ذَهَبْتَ، ذَهَبْتُ، ذَهَبْنَا"},
     {t:"كَتَبَ fe'li bilan 3 ta jumlat tuzing (turli shaxs)",m:"كَتَبْتُ... / كَتَبَتِ... / كَتَبُوا..."},
     {t:"مَا + fe'l bilan 3 ta inkor jumlat yozing",m:"مَا ذَهَبَ... / مَا كَتَبْتُ... / مَا قَرَأْنَا..."}
   ],
   uyvazifa:["كَتَبَ, قَرَأَ, فَهِمَ, سَمِعَ, ذَهَبَ fe'llarini 13 shaxsda tuslantirib yozing","Har bir shaxs uchun jumlat tuzing","مَا bilan inkor varianti yozing"],
   test:[
     {s:"كَتَبَ fe'lining asosiy ma'nosi?",v:["O'qidi","Ketdi","Yozdi","Bordi"],t:2},
     {s:"ذَهَبَتْ — qaysi shaxs?",v:["3-shaxs erkak mufrad","3-shaxs ayol mufrad","2-shaxs erkak","1-shaxs mufrad"],t:1},
     {s:"كَتَبُوا — qaysi shaxs?",v:["2-shaxs ko'plik","3-shaxs erkak ko'plik","1-shaxs ko'plik","3-shaxs ayol ko'plik"],t:1},
     {s:"Maazida inkor qanday?",v:["لَا + fe'l","لَمْ + fe'l","مَا + fe'l","لَنْ + fe'l"],t:2},
     {s:"كَتَبْتُ — qaysi shaxs?",v:["3-shaxs erkak","2-shaxs erkak","1-shaxs mufrad","1-shaxs ko'plik"],t:2},
     {s:"قَرَأُوا — qanday o'qiladi?",v:["qara'ta","qara'uu","qara'na","qara'tum"],t:1},
     {s:"3-shaxs ayol ko'plik maazi qo'shimchasi?",v:["ـتْ","ـوا","ـنَ","ـتُمْ"],t:2},
     {s:"مَا كَتَبَتْ — ma'nosi?",v:["U (ayol) yozdi","U (ayol) yozmadi","Sen yozmadingmi?","U (erkak) yozmadi"],t:1},
     {s:"كَتَبْنَا — qaysi shaxs?",v:["3-shaxs ko'plik","2-shaxs ko'plik","1-shaxs ko'plik","1-shaxs mufrad"],t:2},
     {s:"Lug'aviy forma — fe'lning qaysi shakli?",v:["1-shaxs mufrad","2-shaxs erkak","3-shaxs erkak mufrad","3-shaxs ayol"],t:2}
   ]},

  {id:18,harflar:["كِتَابُ","بَيْتُ","مَكْتَبُ"],nomlar:["Kitob (mudof)","Uy (mudof)","Stol/Idora (mudof)"],
   maxraj:[
     {h:"كِتَابُ الطَّالِبِ",mx:"Izofa — Mudof + Mudof ilayh",iz:"Birinchi ism (mudof) al olmaydi. Ikkinchi ism (mudof ilayh) jarr holida — kasra yoki ـٍ."},
     {h:"Ta-marbuta",mx:"ة → 't' bo'ladi",iz:"Mudof oxirida ة bo'lsa, yozuvda ة, lekin o'qishda 't': مَدْرَسَةُ الْمَدِينَةِ — Shahar maktabi."},
     {h:"Ma'rifa",mx:"Izofa = ma'rifa",iz:"Naqira mudof + ma'rifa mudof ilayh → butun izofa ma'rifaga aylanadi: كِتَابُ الطَّالِبِ (ma'rifa)."}
   ],
   sifatlar:[
     {h:"Mudof",sf:["Al olmaydi","Oxirgi harakat: raf'/nasb/jarr holida","Ta-marbuta 't' o'qiladi","Xabar tarif emas"]},
     {h:"Mudof ilayh",sf:["Jarr holida (kasra/-ٍ)","al bo'lishi mumkin","Tanvin (naqira) bo'lishi mumkin","Izofa tuzilmasini yakunlaydi"]},
     {h:"Sifat",sf:["Izofadan keyin keladi","Mudofga mos keladi (jins, son, holat)","بَيْتُ الرَّجُلِ الْكَبِيرُ","الْكَبِيرُ — mudofga (raf')"]}
   ],
   shakllar:[
     {h:"كِتَاب",m:"كِتَابُ الطَّالِبِ",b:"كِتَابُ طَالِبٍ",o:"كِتَابَا الطَّالِبِ",x:"كُتُبُ الطُّلَّابِ",iz:"Ma'rifa/naqira/saniyya/jam' izofalar"},
     {h:"مَدْرَسَة",m:"مَدْرَسَةُ الْمَدِينَةِ",b:"مَدْرَسَةُ مُدِيرٍ",o:"مَدْرَسَتَا الْحَيِّ",x:"مَدَارِسُ الْمَدِينَةِ",iz:"Ta-marbuta izofasi — to'rt holat"},
     {h:"Zanjir",m:"بَابُ",b:"بَابُ الْبَيْتِ",o:"بَابُ بَيْتِ الرَّجُلِ",x:"بَابُ بَيْتِ رَجُلٍ كَبِيرٍ",iz:"Izofa zanjiri — 2, 3, 4 bo'lak"}
   ],
   harakatlar:[
     {h:"بَيْت",f:"بَيْتُ الرَّجُلِ",k:"بَيْتَ الرَّجُلِ",d:"بَيْتِ الرَّجُلِ",s:"بَيْتُ رَجُلٍ",of:"Mudof raf'",ok:"Mudof nasb",od:"Mudof jarr",os:"Naqira izofa"},
     {h:"مَدِينَة",f:"عَاصِمَةُ الْبِلَادِ",k:"عَاصِمَةَ الْبِلَادِ",d:"عَاصِمَةِ الْبِلَادِ",s:"عَاصِمَةُ بِلَادٍ",of:"Raf'",ok:"Nasb",od:"Jarr",os:"Naqira"},
     {h:"مَكْتَب",f:"مَكْتَبُ الْمُدِيرِ",k:"مَكْتَبَ الْمُدِيرِ",d:"مَكْتَبِ الْمُدِيرِ",s:"مَكْتَبُ مُدِيرٍ",of:"Raf'",ok:"Nasb",od:"Jarr",os:"Naqira"}
   ],
   sozlar:[
     {ar:"بَابُ الْبَيْتِ",oq:"Baabul bayti",tr:"Uyning eshigi",h:"izofa — 2 bo'lak"},
     {ar:"عَاصِمَةُ الْبِلَادِ",oq:"'Aasimatul bilaadi",tr:"Mamlakatning poytaxti",h:"ta-marbuta izofa"},
     {ar:"سَيَّارَةُ الْأُسْتَاذِ",oq:"Sayyaratul ustaazi",tr:"O'qituvchining mashinasi",h:"ta-marbuta izofa"},
     {ar:"مَكْتَبَةُ الْمَدْرَسَةِ",oq:"Maktabatul madrasati",tr:"Maktab kutubxonasi",h:"izofa zanjiri"},
     {ar:"لُغَةُ الْعَرَبِ",oq:"Lugatul 'arabi",tr:"Arablarning tili",h:"ta-marbuta izofa"}
   ],
   oqish:[
     {ar:"كِتَابُ الطَّالِبِ عَلَى الطَّاوِلَةِ",iz:"Talabaning kitobi stolda."},
     {ar:"بَابُ الْبَيْتِ مَفْتُوحٌ",iz:"Uyning eshigi ochiq."},
     {ar:"مَدْرَسَةُ الْمَدِينَةِ كَبِيرَةٌ",iz:"Shahar maktabi katta."},
     {ar:"ذَهَبْتُ إِلَى مَكْتَبِ الْمُدِيرِ",iz:"Men direktorning kabinetiga bordim."},
     {ar:"سَيَّارَةُ الْأُسْتَاذِ جَدِيدَةٌ",iz:"O'qituvchining mashinasi yangi."}
   ],
   yozish:[
     {t:"5 ta izofa qurilmasi tuzing (har xil mavzuda)",m:"بَيْتُ... / كِتَابُ... / سَيَّارَةُ..."},
     {t:"Ta-marbuta bilan 3 ta izofa yozing (ة → 't' qoidasini ko'rsating)",m:"مَدْرَسَةُ... / سَيَّارَةُ... / غُرْفَةُ..."},
     {t:"Izofa zanjiri (3 bo'lak) hosil qiling",m:"مَكْتَبَةُ مَدْرَسَةِ الْمَدِينَةِ"}
   ],
   uyvazifa:["10 ta yangi izofa qurilmasi yod oling","Quyidagi izofalarni turli holatlarda (raf'/nasb/jarr) yozing: بَيْتُ الرَّجُلِ","Ta-marbuta bilan izofa qoidasini do'stingizga tushuntiring"],
   test:[
     {s:"Izofada mudof ilayh qaysi holda bo'ladi?",v:["Raf'","Nasb","Jarr","O'zgarmaydi"],t:2},
     {s:"Mudofdan nima olib tashlanadi?",v:["Ta-marbuta","اَلـ (al)","Tanvin","Sukun"],t:1},
     {s:"كِتَابُ الطَّالِبِ — bu izofa ma'rifami yoki naqira?",v:["Naqira","Ma'rifa","Har ikkisi","Aniqlab bo'lmaydi"],t:1},
     {s:"مَدْرَسَةُ الْمَدِينَةِ da ة qanday o'qiladi?",v:["Jim o'qilmaydi","'a' bo'lib","'t' bo'lib","'h' bo'lib"],t:2},
     {s:"Sifat izofada qaysi joyga qo'yiladi?",v:["Mudofdan oldin","Mudof ilayh oldiga","Ikki bo'lakdan keyin","Har qanday joyga"],t:2},
     {s:"عَاصِمَةُ الْبِلَادِ — ma'nosi?",v:["Katta shahar","Yaxshi mamlakat","Mamlakatning poytaxti","Qadimiy shahar"],t:2},
     {s:"Izofa zanjirida nechtadan ortiq ism bo'lishi mumkin?",v:["Faqat 2 ta","3 tagacha","3 ta va undan ortiq","Faqat 1 ta"],t:2},
     {s:"بَيْتُ رَجُلٍ — bu qanday izofa?",v:["Ma'rifa izofa","Naqira izofa","Sifatli izofa","Zanjir izofa"],t:1},
     {s:"لُغَةُ الْعَرَبِ — ma'nosi?",v:["Arab lug'ati (kitob)","Arablarning tili","Arab harflari","Arab grammatikasi"],t:1},
     {s:"Mudof raf' holida بَيْتُ الرَّجُلِ — mudof ilayh qaysi holat?",v:["Raf'","Nasb","Jarr","Jazm"],t:2}
   ]},

  // ── C1 ──────────────────────────────────────────────────────────────

  {id:19,harflar:["دَرَسَ","دَرَّسَ","تَدَارَسَ"],nomlar:["O'rgandi (I)","O'qitdi (II)","Bir-biridan o'rganishdi (VI)"],
   maxraj:[
     {h:"I — دَرَسَ",mx:"فَعَلَ — Asosiy vazn",iz:"O'zakdagi asosiy harakat. دَرَسَ — o'qidi, o'rgandi. Masdar: دِرَاسَةٌ (o'qish)."},
     {h:"II — دَرَّسَ",mx:"فَعَّلَ — Ta'diya",iz:"Boshqaga qildirish. دَرَّسَ — o'qitdi, o'rgatdi. Masdar: تَدْرِيسٌ (o'qitish). Ikkilangan o'rta harf."},
     {h:"V — تَدَرَّسَ",mx:"تَفَعَّلَ — II refleksivi",iz:"II vazn harakat o'z shaxsga qaytishi. Masdar: تَدَرُّسٌ. تَعَلَّمَ (o'rganildi, V vazn) — keng ishlatiladi."}
   ],
   sifatlar:[
     {h:"I vazn",sf:["فَعَلَ","Asosiy","Masdar: فَعْلٌ yoki فُعُولٌ va b.","Eng ko'p ishlatiladigan"]},
     {h:"II vazn",sf:["فَعَّلَ","Ikkilangan o'rta harf","Masdar: تَفْعِيلٌ","Ta'diya (transitiv)"]},
     {h:"IV vazn",sf:["أَفْعَلَ","Hamza boshida","Masdar: إِفْعَالٌ","Ta'diya (transitiv)"]},
     {h:"X vazn",sf:["اِسْتَفْعَلَ","Talab/xohish","Masdar: اِسْتِفْعَالٌ","اِسْتَعْلَمَ — so'rab o'rgandi"]}
   ],
   shakllar:[
     {h:"دَرَسَ",m:"دَرَسَ",b:"دَرَّسَ",o:"دَارَسَ",x:"أَدْرَسَ",iz:"I → II → III → IV vazn"},
     {h:"تَدَرَّسَ",m:"تَدَرَّسَ",b:"تَدَارَسَ",o:"اِنْدَرَسَ",x:"اِدَّرَسَ",iz:"V → VI → VII → VIII vazn"},
     {h:"Masdarlar",m:"دِرَاسَةٌ",b:"تَدْرِيسٌ",o:"مُدَارَسَةٌ",x:"اِسْتِدْرَاسٌ",iz:"I, II, III, X masdarlar"}
   ],
   harakatlar:[
     {h:"كَتَبَ",f:"كَتَّبَ",k:"كَاتَبَ",d:"أَكْتَبَ",s:"تَكَاتَبَ",of:"II ta'diya",ok:"III mushtarak",od:"IV ta'diya",os:"VI o'zaro"},
     {h:"فَتَحَ",f:"فَتَّحَ",k:"تَفَتَّحَ",d:"اِنْفَتَحَ",s:"اِفْتَتَحَ",of:"II","ok":"V refleksiv","od":"VII passiv","os":"VIII o'zlik"},
     {h:"عَلِمَ",f:"عَلَّمَ",k:"تَعَلَّمَ",d:"أَعْلَمَ",s:"اِسْتَعْلَمَ",of:"II (o'qitdi)","ok":"V (o'rganildi)","od":"IV (xabardor qildi)","os":"X (so'rab o'rgandi)"}
   ],
   sozlar:[
     {ar:"دَرَسَ الطَّالِبُ",oq:"Darasa at-taalibu",tr:"Talaba o'qidi.",h:"I vazn"},
     {ar:"دَرَّسَ الْأُسْتَاذُ الدَّرْسَ",oq:"Darrasa al-ustaazu",tr:"O'qituvchi darsni o'qitdi.",h:"II vazn ta'diya"},
     {ar:"تَعَلَّمَ اللُّغَةَ",oq:"Ta'allama al-lughata",tr:"U tilni o'rgandi.",h:"V vazn"},
     {ar:"تَعَاوَنُوا فِي الْعَمَلِ",oq:"Ta'aawanuu fil 'amali",tr:"Ular ishda hamkorlik qilishdi.",h:"VI vazn"},
     {ar:"اِسْتَقْبَلَهُ بِحَفَاوَةٍ",oq:"Istaqbalahu bihafaaWatin",tr:"Uni iliq qarshi oldi.",h:"X vazn"}
   ],
   oqish:[
     {ar:"دَرَسَ وَدَرَّسَ كِلَيْهِمَا مُفِيدَانِ",iz:"O'qish ham, o'qitish ham foydali."},
     {ar:"تَعَلَّمَ الطَّالِبُ مِنَ الْكِتَابِ",iz:"Talaba kitobdan o'rgandi (V vazn)."},
     {ar:"اِسْتَعَانَ بِصَدِيقِهِ",iz:"U do'stidan yordam so'radi (X vazn)."},
     {ar:"اِنْكَسَرَتِ الشَّبَّاكُ",iz:"Derazanig oynasi sindi (VII vazn — passiv)."},
     {ar:"تَعَاوَنَ الْفَرِيقُ",iz:"Jamoa hamkorlik qildi (VI vazn)."}
   ],
   yozish:[
     {t:"دَرَسَ o'zakidan I, II, III, V, X vaznlardagi fe'llarni yozing",m:"دَرَسَ، دَرَّسَ، دَارَسَ، تَدَرَّسَ، اِسْتَدْرَسَ"},
     {t:"Har bir vaznning masdarini yozing",m:"دِرَاسَةٌ، تَدْرِيسٌ، مُدَارَسَةٌ، اِسْتِدْرَاسٌ"},
     {t:"Har bir vaznni ishlating — jumlat tuzing",m:"دَرَسْتُ...، دَرَّسَ الْأُسْتَاذُ...، تَعَلَّمَ..."}
   ],
   uyvazifa:["10 ta arab fe'lini toping va ularning vaznini aniqlang","فَتَحَ o'zakidan I–X vaznlarni hosil qiling","Har bir vaznning asosiy ma'no qo'shimchasini yod oling"],
   test:[
     {s:"II vazn (فَعَّلَ) asosiy ma'no qo'shimchasi?",v:["Passiv","Boshqaga qildirish (ta'diya)","O'z-o'zidan","Bir-biriga"],t:1},
     {s:"دَرَّسَ va دَرَسَ o'rtasidagi farq?",v:["Zamon farqi","دَرَّسَ o'qitdi (II), دَرَسَ o'qidi (I)","Son farqi","Jins farqi"],t:1},
     {s:"V vazn (تَفَعَّلَ) qaysi vazn refleksivi?",v:["I vazn","III vazn","II vazn","IV vazn"],t:2},
     {s:"VII vazn (اِنْفَعَلَ) asosiy ma'nosi?",v:["Ta'diya","O'zaro harakat","Passiv/o'z-o'zidan","Talab"],t:2},
     {s:"تَعَلَّمَ — qaysi vazn?",v:["I vazn","III vazn","V vazn","X vazn"],t:2},
     {s:"X vazn (اِسْتَفْعَلَ) asosiy ma'nosi?",v:["Rang o'zgarish","Passiv","Talab/xohish","O'zarog harakat"],t:2},
     {s:"II vazn masdari qanday ko'rinishda?",v:["فِعَالٌ","تَفْعِيلٌ","إِفْعَالٌ","اِنْفِعَالٌ"],t:1},
     {s:"اِسْتَعَانَ — qaysi vazn?",v:["VII","VIII","IX","X"],t:3},
     {s:"VI vazn (تَفَاعَلَ) asosiy ma'nosi?",v:["Bitta shaxs","O'zaro/bir-biriga","Passiv","Talab"],t:1},
     {s:"تَعَاوَنَ (hamkorlik qildi) — qaysi vazn?",v:["III","V","VI","VIII"],t:2}
   ]},

  {id:20,harflar:["إِنْ","لَوْ","إِذَا"],nomlar:["Agar (haqiqiy)","Agar (xayoliy)","Agar (kutilgan)"],
   maxraj:[
     {h:"إِنْ",mx:"Haqiqiy shart yuklаmasi",iz:"Real va yuzaga kelishi mumkin bo'lgan shart. إِنْ + muzori' jazm → jawab jazm."},
     {h:"لَوْ",mx:"Xayoliy shart yuklаmasi",iz:"Yuzaga kelmagan shart. لَوْ + maazi → لَـ + maazi (jawab)."},
     {h:"إِذَا",mx:"Kutilgan shart yuklаmasi",iz:"Yuzaga kelishi muqarrar bo'lgan shart. إِذَا + maazi → jawab."}
   ],
   sifatlar:[
     {h:"إِنْ",sf:["Haqiqiy/real","Fe'l jazm holida","Jawab jazm","Keng qo'llaniladi"]},
     {h:"لَوْ",sf:["Xayoliy","Fe'l maazi holida","Jawabda لَـ","O'tmishga ham ishlatiladi"]},
     {h:"لَوْلَا",sf:["Agar...bo'lmaganda","Ism bilan keladi","Jawabda لَـ","Imkoniyat yo'qligi"]},
     {h:"إِذَا",sf:["Kutilgan shart","Maazi yoki muzori'","Ko'pincha kelajak ma'no","Muqarrar natija"]}
   ],
   shakllar:[
     {h:"إِنْ",m:"إِنْ تَدْرُسْ تَنْجَحْ",b:"إِنْ دَرَسْتَ نَجَحْتَ",o:"إِنْ لَمْ تَدْرُسْ لَمْ تَنْجَحْ",x:"إِنْ تَدْرُسْ فَأَنْتَ ذَكِيٌّ",iz:"Haqiqiy shart turli ko'rinishlari"},
     {h:"لَوْ",m:"لَوْ دَرَسْتَ لَنَجَحْتَ",b:"لَوْ كُنْتَ هُنَا لَرَأَيْتَهُ",o:"لَوْ لَا الْعِلْمُ لَجَهِلَ النَّاسُ",x:"لَوْ عَمِلَ الْفَرِيقُ لَنَجَحُوا",iz:"Xayoliy shart ko'rinishlari"},
     {h:"إِذَا",m:"إِذَا جَاءَ خَرَجْنَا",b:"إِذَا حَلَّ الشِّتَاءُ بَرَدَ الطَّقْسُ",o:"إِذَا سَافَرْتَ أَخْبِرْنَا",x:"إِذَا أَرَدْتَ النَّجَاحَ اِجْتَهِدْ",iz:"Kutilgan shart ko'rinishlari"}
   ],
   harakatlar:[
     {h:"إِنْ shart",f:"إِنْ تَدْرُسْ",k:"إِنْ تَكْتُبْ",d:"إِنْ تَذْهَبْ",s:"إِنْ تَفْهَمْ",of:"Muzori' jazm",ok:"Muzori' jazm",od:"Muzori' jazm",os:"Muzori' jazm"},
     {h:"Jawab (إِنْ)",f:"تَنْجَحْ",k:"تَتَعَلَّمْ",d:"تَصِلْ",s:"تَتَقَدَّمْ",of:"Jazm jawab",ok:"Jazm jawab",od:"Jazm jawab",os:"Jazm jawab"},
     {h:"لَوْ shart",f:"لَوْ دَرَسْتَ",k:"لَوْ عَمِلْتَ",d:"لَوْ جِئْتَ",s:"لَوْ قَرَأْتَ",of:"Maazi shart",ok:"Maazi shart",od:"Maazi shart",os:"Maazi shart"}
   ],
   sozlar:[
     {ar:"إِنْ تَدْرُسْ تَنْجَحْ",oq:"In tadrus tanjah",tr:"Agar o'qisang, muvaffaqiyat qozanasan.",h:"إِنْ haqiqiy shart"},
     {ar:"لَوْ دَرَسْتَ لَنَجَحْتَ",oq:"Law darasta lanajahta",tr:"Agar o'qiganing bo'lsaydi, muvaffaqiyat qozongan bo'larding.",h:"لَوْ xayoliy shart"},
     {ar:"إِذَا جَاءَ الرَّبِيعُ أَزْهَرَتِ الْأَشْجَارُ",oq:"Iza jaa'ar-raabii'u...",tr:"Bahor kelganda, daraxtlar gullaydi.",h:"إِذَا kutilgan shart"},
     {ar:"إِنْ لَمْ تَعْمَلْ لَمْ تَنْجَحْ",oq:"In lam ta'mal lam tanjah",tr:"Agar ishlamasang, muvaffaqiyat qozonmaysan.",h:"إِنْ inkor shart"},
     {ar:"لَوْلَا الْجُهْدُ لَمَا نَجَحَ أَحَدٌ",oq:"Lawlaa al-juhdu...",tr:"Mehnat bo'lmaganda edi, hech kim muvaffaqiyat qozonmagan bo'lardi.",h:"لَوْلَا — agar...bo'lmaganda"}
   ],
   oqish:[
     {ar:"إِنْ تَجْتَهِدْ تَصِلْ إِلَى هَدَفِكَ",iz:"Agar tirishsang, maqsadingga yetasan."},
     {ar:"لَوْ عَمِلَ الْفَرِيقُ لَنَجَحَ الْمَشْرُوعُ",iz:"Agar jamoa ishlagan bo'lsaydi, loyiha muvaffaqiyatli bo'lardi."},
     {ar:"إِذَا حَلَّ الشِّتَاءُ بَرَدَ الطَّقْسُ",iz:"Qish kelganda ob-havo soviydi."},
     {ar:"إِنْ سَافَرْتَ أَخْبِرْنِي",iz:"Agar safarga chiqsang, meni xabardor qil."},
     {ar:"لَوْلَا التَّعَاوُنُ لَصَعُبَتِ الْأُمُورُ",iz:"Hamkorlik bo'lmaganda edi, ishlar qiyin bo'lardi."}
   ],
   yozish:[
     {t:"إِنْ bilan 3 ta haqiqiy shartli gap yozing",m:"إِنْ تَعْمَلْ...، إِنْ تَدْرُسْ...، إِنْ تَجْتَهِدْ..."},
     {t:"لَوْ bilan 2 ta xayoliy shartli gap yozing",m:"لَوْ دَرَسْتَ لَـ...، لَوْ جِئْتَ لَـ..."},
     {t:"إِذَا bilan 2 ta kutilgan shartli gap yozing",m:"إِذَا جَاءَ...، إِذَا أَرَدْتَ..."}
   ],
   uyvazifa:["إِنْ, لَوْ, إِذَا, لَوْلَا farkini jadval shaklida yozing","Har bir yuklama bilan 3 tadan jumlat yozing","إِنْ inkor: إِنْ لَمْ + jazm bilan 3 ta jumlat tuzing"],
   test:[
     {s:"إِنْ shartli yuklаmasi qaysi tur?",v:["Xayoliy shart","Kutilgan shart","Haqiqiy/real shart","Inkor shart"],t:2},
     {s:"إِنْ dan keyin fe'l qaysi holda bo'ladi?",v:["Raf'","Nasb","Jarr","Jazm"],t:3},
     {s:"لَوْ — qaysi tur shart uchun?",v:["Real shart","Xayoliy/real bo'lmagan shart","Kutilgan shart","Inkor shart"],t:1},
     {s:"لَوْ shart jumlasida fe'l qaysi holda?",v:["Muzori' jazm","Muzori' raf'","Maazi","Muzori' nasb"],t:2},
     {s:"لَوْ da jawab jumlasining boshida nima turadi?",v:["فَـ","إِنْ","لَـ","ثُمَّ"],t:2},
     {s:"إِنْ تَدْرُسْ تَنْجَحْ — ma'nosi?",v:["Sen o'qidingmi?","Agar o'qisang, muvaffaqiyat qozanasan.","O'qish shart","O'qiganing uchun muvaffaqiyat"],t:1},
     {s:"لَوْلَا nimani bildiradi?",v:["Agar bo'lsa","Agar...bo'lmaganda edi","Chunki","Ammo"],t:1},
     {s:"إِذَا — qaysi holat uchun?",v:["Yuzaga kelmagan shart","Kutilgan/muqarrar shart","O'tmishda yuzaga kelgan","Hech qachon bo'lmagan"],t:1},
     {s:"إِنْ لَمْ تَعْمَلْ لَمْ تَنْجَحْ — ma'nosi?",v:["Ishlasang muvaffaqiyat","Agar ishlamasang, muvaffaqiyat qozonmaysan","Sen ishlamassan","Muvaffaqiyat ishlamasdan ham bo'ladi"],t:1},
     {s:"لَوْ عَمِلْتَ لَنَجَحْتَ — qaysi kalit so'z xayoliy shartni bildiradi?",v:["لَنَجَحْتَ","عَمِلْتَ","لَوْ","ـتَ"],t:2}
   ]},
];
