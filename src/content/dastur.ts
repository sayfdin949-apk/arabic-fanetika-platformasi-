import type { DasturOy } from "./types";
import { T } from "../theme/tokens";

export const DASTUR: DasturOy[] = [
  {oy:1,nomi:"1-OY: Alifbo va Asoslar",color:T.gGreen,imtihon:"أ → ط (14 harf): yozish+o'qish+maxraj",
   haftalar:[
    {h:1,mavzu:"Nazariy asoslar",kunlar:[{k:"Dushanba",d:"Arab yozuviga kirish + 28 harf",m:"Harflarni tanish"},{k:"Chorshanba",d:"4 ta harakat",m:"Harakatli o'qish"},{k:"Juma",d:"Takrorlash",m:"Diktant"}],imtihon:"Test: alifbo+harakatlar"},
    {h:2,mavzu:"Amaliy: أ ب ت ث ج ح",kunlar:[{k:"Dushanba",d:"أ ب — maxraj,sifat,shakl",m:"Yozish+o'qish"},{k:"Chorshanba",d:"ت ث",m:"So'z tuzish"},{k:"Juma",d:"ج ح",m:"O'qish mashqi"}],imtihon:"Blooket: أ ب ت ث ج ح"},
    {h:3,mavzu:"Amaliy: خ د ذ ر ز س",kunlar:[{k:"Dushanba",d:"خ د",m:"Yozish"},{k:"Chorshanba",d:"ذ ر",m:"O'qish"},{k:"Juma",d:"ز س",m:"So'z tuzish"}],imtihon:"Test: خ د ذ ر ز س"},
    {h:4,mavzu:"Amaliy: ش ص ض ط",kunlar:[{k:"Dushanba",d:"ش ص",m:"Yozish"},{k:"Chorshanba",d:"ض ط",m:"O'qish"},{k:"Juma",d:"Takror",m:"Diktant"}],imtihon:"Blooket: 1-oy barcha harflar"},
   ]},
  {oy:2,nomi:"2-OY: Qolgan Harflar va Maxraj",color:T.gDeep,imtihon:"Barcha 28 harf + Maxraj + Sifat",
   haftalar:[
    {h:5,mavzu:"Amaliy: ظ ع غ ف ق ك",kunlar:[{k:"Dushanba",d:"ظ ع",m:"Yozish"},{k:"Chorshanba",d:"غ ف",m:"O'qish"},{k:"Juma",d:"ق ك",m:"So'z"}],imtihon:"Test: ظ ع غ ف ق ك"},
    {h:6,mavzu:"Amaliy: ل م ن ه و ي",kunlar:[{k:"Dushanba",d:"ل م",m:"Yozish"},{k:"Chorshanba",d:"ن ه",m:"O'qish"},{k:"Juma",d:"و ي",m:"So'z"}],imtihon:"Blooket: barcha 28 harf"},
    {h:7,mavzu:"Maxraj ilmi",kunlar:[{k:"Dushanba",d:"Maxraj nazariyasi",m:"Halq harflari"},{k:"Chorshanba",d:"Lison harflari",m:"Mashq"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Test: maxraj ilmi"},
    {h:8,mavzu:"Sifat ilmi",kunlar:[{k:"Dushanba",d:"Juft sifatlar",m:"Yodlash"},{k:"Chorshanba",d:"Mustaqil sifatlar",m:"Mashq"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Blooket: sifat ilmi"},
   ]},
  {oy:3,nomi:"3-OY: Qoidalar 1-qism",color:T.gGreen,imtihon:"Mad + Tanvin + Vasl/Vaqf + Tashdid",
   haftalar:[
    {h:9,mavzu:"Mad qoidalari",kunlar:[{k:"Dushanba",d:"Asliy Mad",m:"10 misol"},{k:"Chorshanba",d:"Faro'iy Mad",m:"Mashq"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Test: Mad"},
    {h:10,mavzu:"Tanvin + Ta marbuta",kunlar:[{k:"Dushanba",d:"Tanvin AN-IN-UN",m:"Talaffuz"},{k:"Chorshanba",d:"Ta marbuta",m:"Mashq"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Blooket: tanvin+ta marbuta"},
    {h:11,mavzu:"Vasl, Vaqf, Tashdid",kunlar:[{k:"Dushanba",d:"Vasl/Vaqf",m:"Misollar"},{k:"Chorshanba",d:"Tashdid",m:"10 misol"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Test: vasl,vaqf,tashdid"},
    {h:12,mavzu:"Nabr qoidasi",kunlar:[{k:"Dushanba",d:"Nabr (urg'u)",m:"Mashq"},{k:"Chorshanba",d:"Takror 1",m:"O'qish"},{k:"Juma",d:"Takror 2",m:"Diktant"}],imtihon:"Blooket: 3-oy"},
   ]},
  {oy:4,nomi:"4-OY: Qoidalar 2-qism",color:T.gDeep,imtihon:"Sukunli Nun/Lom + Hamza + Tafxim",
   haftalar:[
    {h:13,mavzu:"Sukunli Nun + Lom",kunlar:[{k:"Dushanba",d:"Sukunli Nun",m:"Mashq"},{k:"Chorshanba",d:"Sukunli Lom",m:"Mashq"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Test: sukunli nun+lom"},
    {h:14,mavzu:"Hamza + Grammatika",kunlar:[{k:"Dushanba",d:"Hamza qoidasi",m:"Mashq"},{k:"Chorshanba",d:"Ism, Fe'l, Harf",m:"Mashq"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Blooket: hamza"},
    {h:15,mavzu:"Iltiqo + Tafxim",kunlar:[{k:"Dushanba",d:"Iltiqo Sakinayn",m:"Mashq"},{k:"Chorshanba",d:"Tafxim va Tarqiq",m:"Mashq"},{k:"Juma",d:"Takror",m:"Test"}],imtihon:"Test: iltiqo+tafxim"},
    {h:16,mavzu:"Harflar aloqasi",kunlar:[{k:"Dushanba",d:"Harflar aloqasi",m:"Mashq"},{k:"Chorshanba",d:"Mashq",m:"O'qish"},{k:"Juma",d:"Takror",m:"Diktant"}],imtihon:"Blooket: 4-oy"},
   ]},
  {oy:5,nomi:"4.5-OY: Yakuniy",color:"linear-gradient(135deg,#6AEF5A 0%,#2EB82E 100%)",imtihon:"YAKUNIY: yozma+og'zaki+o'qish+yozish",
   haftalar:[
    {h:17,mavzu:"Barcha qoidalar takrori",kunlar:[{k:"Dushanba",d:"Qoidalar 1-qism",m:"O'qish"},{k:"Chorshanba",d:"Qoidalar 2-qism",m:"O'qish"},{k:"Juma",d:"Amaliy o'qish",m:"Mashq"}],imtihon:"Blooket: barcha kurs"},
    {h:18,mavzu:"Yakuniy tayyorgarlik",kunlar:[{k:"Dushanba",d:"Diktant",m:"Yozish"},{k:"Chorshanba",d:"Harakatsiz o'qish",m:"O'qish"},{k:"Juma",d:"Mock imtihon",m:"Test"}],imtihon:"YAKUNIY IMTIHON"},
   ]},
];
