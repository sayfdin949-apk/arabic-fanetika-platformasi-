import { useState, useRef, useEffect, useCallback } from "react";
import {
  Home, BookOpen, FlaskConical, Calendar, Bot, User, Users,
  ChevronLeft, ChevronRight, FolderOpen, Folder, Lock,
  CheckCircle, XCircle, ChevronDown, ChevronUp, ArrowRight,
  Play, RotateCcw, BookMarked, Trophy, Target, Zap, Clock,
  Send, AlignLeft, LogOut, GraduationCap, UserCheck,
  MessageCircle, ClipboardCheck, Medal, Activity, Camera,
  Crown, Shield, Layers, Star, Volume2, Mic, PenLine,
  Eye, EyeOff, Bell, Search, BarChart2, Settings,
  TrendingUp, Award, AlertCircle, Info
} from "lucide-react";

/* ══ FONT ══ */
const FONT='"Be Vietnam Pro",-apple-system,system-ui,sans-serif';
const AR='"Sakkal Majalla","Traditional Arabic","Noto Naskh Arabic",serif';
if(typeof document!=="undefined"&&!document.getElementById("bvp-font")){
  const l=document.createElement("link");l.id="bvp-font";l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";
  document.head.appendChild(l);
}

/* ══ TOKENS ══ */
const T={
  green:"#0D3A1A",green700:"#154E20",green500:"#1A6A2A",
  lime:"#2EB82E",limeMid:"#4AE04A",limeBrt:"#6AEF5A",
  red:"#E60023",onCta:"#0A2A10",
  text:"#0D3A1A",text2:"#3A6040",hint:"#5A8060",
  meshLight:"radial-gradient(1200px 900px at 99% -16%,#D7F1D2 0%,#E3F2E2 46%,#EAF4EA 100%)",
  meshHero:"radial-gradient(1040px 780px at 86% 8%,#36A93A 0%,#175320 50%,#0B2F15 100%)",
  gGreen:"linear-gradient(150deg,#1F7A2C 0%,#0D3A1A 88%)",
  gDeep:"linear-gradient(150deg,#16551F 0%,#08200F 100%)",
  gLime:"linear-gradient(135deg,#6AEF5A 0%,#3DCB36 55%,#2EB82E 100%)",
  gLimeH:"linear-gradient(90deg,#6AEF5A,#4AE04A,#2EB82E)",
  sheen:"linear-gradient(160deg,rgba(255,255,255,.20) 0%,rgba(255,255,255,.05) 34%,rgba(0,0,0,0) 60%,rgba(0,0,0,.12) 100%)",
};
const card=()=>({background:"#fff",borderRadius:14,border:"1px solid rgba(13,58,26,.10)",boxShadow:"0 2px 8px rgba(13,58,26,.07)",overflow:"hidden"});
const BtnP={background:T.gLime,border:"none",borderRadius:11,padding:"11px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontSize:13,fontWeight:600,color:T.onCta,boxShadow:"0 2px 8px rgba(46,184,46,.3)"};
const BtnG={background:"rgba(13,58,26,.07)",border:"1px solid rgba(13,58,26,.12)",borderRadius:9,padding:"9px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:500,color:T.text2};

/* ══ USERS DB ══ */
const USERS_DB = [
  {id:"t1",login:"ustoz",  parol:"1234",ism:"Ozodbek", familya:"Rahimov",  role:"teacher",avatar:null},
  {id:"s1",login:"abdulloh",parol:"1234",ism:"Abdulloh",familya:"Karimov",  role:"student",tugilgan:"2008",tel:"+998 90 123 45 67",avatar:null},
  {id:"s2",login:"yusuf",  parol:"1234",ism:"Yusuf",   familya:"Tohirov",  role:"student",tugilgan:"2009",tel:"+998 91 234 56 78",avatar:null},
  {id:"s3",login:"mariya", parol:"1234",ism:"Mariya",  familya:"Soliyeva", role:"student",tugilgan:"2008",tel:"+998 93 345 67 89",avatar:null},
  {id:"s4",login:"diyor",  parol:"1234",ism:"Diyor",   familya:"Ergashev", role:"student",tugilgan:"2009",tel:"+998 94 456 78 90",avatar:null},
  {id:"s5",login:"sevara", parol:"1234",ism:"Sevara",  familya:"Aliyeva",  role:"student",tugildan:"2008",tel:"+998 95 567 89 01",avatar:null},
];

/* ══ STORAGE helpers ══ */
const store = {
  get: async (k)=>{try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}},
  set: async (k,v)=>{try{await window.storage.set(k,JSON.stringify(v));}catch{}},
  del: async (k)=>{try{await window.storage.delete(k);}catch{}},
};

/* ══ NAZARIY DATA ══ */
const NAZARIY=[
  {id:1,nomi:"Arab Yozuviga Kirish",icon:"أ",color:"green",
   mavzu:`# Arab Yozuviga Kirish\n\n## Asosiy Xususiyatlar\nArab yozuvi o'ngdan chapga yoziladi. **28 ta harf** bor. Faqat **6 ta harf** faqat o'ng tomoniga ulanadi: **ا د ذ ر ز و**\n\n---\n\n## Harflarning 4 xil Ko'rinishi\n\n| № | Harf | Mustaqil | Boshi | O'rtasi | Oxiri |\n|---|------|----------|-------|---------|-------|\n|1|Alif|ا|ا|ـا|ـا|\n|2|Ba|ب|بـ|ـبـ|ـب|\n|3|Ta|ت|تـ|ـتـ|ـت|\n|4|Jim|ج|جـ|ـجـ|ـج|\n|5|Dal|د|د|ـد|ـد|\n|6|Sin|س|سـ|ـسـ|ـس|\n|7|Ayn|ع|عـ|ـعـ|ـع|\n|8|Fa|ف|فـ|ـفـ|ـف|\n\n---\n\n## Faqat O'ng Tomonga Ulanadiganlar (6 ta)\n\n| Harf | Nomi | Misol |\n|------|------|-------|\n|ا|Alif|كِتَاب|\n|د|Dal|وَلَد|\n|ذ|Zal|هَذَا|\n|ر|Ra|دَرْس|\n|ز|Zayn|بَارِز|\n|و|Vov|يَوْم|`,
   vazifalar:[
     {id:1,savol:"Arab alifbosida nechta harf bor?",variantlar:["24","26","28","30"],togri:2},
     {id:2,savol:"Faqat o'ng tomonga ulanadiganlar nechta?",variantlar:["4","5","6","7"],togri:2},
     {id:3,savol:"Arab yozuvi qaysi tomonga yoziladi?",variantlar:["Chapdan o'ngga","O'ngdan chapga","Yuqoridan pastga","Istalgan"],togri:1},
     {id:4,savol:"Har bir harf necha xil ko'rinishda?",variantlar:["2","3","4","5"],togri:2},
     {id:5,savol:"ر harfi qaysi guruhga kiradi?",variantlar:["Ikki tomonga","Faqat o'ng tomonga","Ulanmaydi","Lab harfi"],togri:1},
   ]},
  {id:2,nomi:"28 ta Arab Harfi",icon:"ب",color:"deep",
   mavzu:`# 28 ta Arab Harfi\n\n## Asosiy Jadval\n\n| Harf | Nomi | Holati |\n|------|------|--------|\n|ث|Sa|**Tilni chiqarib**|\n|ح|Ha|**Yo'q** — chuqur nafas|\n|ذ|Zal|**Tilni chiqarib**|\n|ص|Sod|**Yo'q** — qalin s|\n|ض|Dod|**Yo'q** — qalin d|\n|ط|To|**Yo'q** — qalin t|\n|ظ|Zo|**Tilni chiqarib qalin**|\n|ع|Ayn|**Yo'q** — tomoqdan|\n\n## Tilni Chiqarib 3 Harf\n\n| Harf | Jaranglilik |\n|------|-------------|\n|ث|Jarangsiz|\n|ذ|Jarangli|\n|ظ|Jarangli, qalin|`,
   vazifalar:[
     {id:1,savol:"Tilni chiqarib etiladigan harflar nechtasi?",variantlar:["2","3","4","5"],togri:1},
     {id:2,savol:"ع (Ayn) ni to'g'ri tavsifla:",variantlar:["Oddiy 'a'","Tomoqni siqib jarangli","Lab harfi","Burun harfi"],togri:1},
     {id:3,savol:"ص va س farqi:",variantlar:["Shakli","Sod qalin, Sin ingichka","Burundan","Yo'q"],togri:1},
     {id:4,savol:"ث qaysi oiladan?",variantlar:["Lab","Tomoq","Interdental","Burun"],togri:2},
     {id:5,savol:"ذ va ز farqi:",variantlar:["Zal tilni chiqarib","Bir xil","Zayn tilni chiqarib","Yo'q"],togri:0},
   ]},
  {id:3,nomi:"4 ta Asosiy Harakat",icon:"َ",color:"lime",
   mavzu:`# To'rtta Asosiy Harakat\n\n## 1. فَتْحَة — Fatha ( َ )\n**"A" tovushi** · Harfning ustida\n\n| Arab | O'qilishi | Ma'nosi |\n|------|-----------|---------|\n|كَتَبَ|kataba|yozdi|\n|ذَهَبَ|zahaba|ketdi|\n|فَتَحَ|fataha|ochdi|\n\n## 2. كَسْرَة — Kasra ( ِ )\n**"I" tovushi** · Harfning ostida\n\n| Arab | O'qilishi | Ma'nosi |\n|------|-----------|---------|\n|كِتَاب|kitaab|kitob|\n|مِنْ|min|dan|\n|فِيل|fiil|fil|\n\n## 3. ضَمَّة — Damma ( ُ )\n**"U" tovushi** · Harfning ustida\n\n| Arab | O'qilishi | Ma'nosi |\n|------|-----------|---------|\n|نُور|nuur|nur|\n|كُتُب|kutub|kitoblar|\n\n## 4. سُكُون — Sukun ( ْ )\n**Harakat YO'Q** · Harfning ustida\n\n| Arab | O'qilishi | Ma'nosi |\n|------|-----------|---------|\n|بَيْت|bayt|uy|\n|عِلْم|ilm|bilim|`,
   vazifalar:[
     {id:1,savol:"Kasra qaerda yoziladi?",variantlar:["Ustida","Ostida","O'ngida","Chapida"],togri:1},
     {id:2,savol:"بُ qanday o'qiladi?",variantlar:["ba","bi","bu","b"],togri:2},
     {id:3,savol:"Sukun nimani bildiradi?",variantlar:["Uzun a","Harakat yo'q","Ikki marta","U ovozi"],togri:1},
     {id:4,savol:"كَتَبَ da qaysi harakatlar?",variantlar:["3 kasra","3 fatha","3 damma","3 sukun"],togri:1},
     {id:5,savol:"Damma qanday o'qiladi?",variantlar:["a","i","u","yo'q"],togri:2},
   ]},
  {id:4,nomi:"Maxraj Ilmi",icon:"م",color:"green",
   mavzu:`# Maxraj Ilmi\n\n**Maxraj** — harfning chiqish joyi.\n\n## 5 ta Maxraj\n\n### 1. Jawf (3 harf)\nا و ي — cho'zilib chiqadi\n\n### 2. Halq (6 harf)\n\n| Qavat | Harflar |\n|-------|--------|\n|Adnal (yuqori)|ء ه|\n|Vasat (o'rta)|ع ح|\n|Aqsal (quyi)|غ خ|\n\n**Hamza ء — Adnal Halqdan!**\n\n### 3. Lison (18 harf)\nTilning turli qismlari\n\n### 4. Shafatayn (4 harf)\nف ب م و\n\n### 5. Xayshum\nG'unna — ن م`,
   vazifalar:[
     {id:1,savol:"Hamza qaysi maxrajdan?",variantlar:["Aqsal Halq","Vasat Halq","Adnal Halq","Jawf"],togri:2},
     {id:2,savol:"Lison maxrajida nechta harf?",variantlar:["14","16","18","20"],togri:2},
     {id:3,savol:"غ va خ qaysi maxrajdan?",variantlar:["Adnal","Vasat","Aqsal Halq","Shafatayn"],togri:2},
     {id:4,savol:"ف qanday chiqadi?",variantlar:["Ikki lab","Pastki lab yuqori tishga","Burundan","Tomoqdan"],togri:1},
     {id:5,savol:"Mad harflari qaysi maxrajdan?",variantlar:["Halq","Jawf","Lison","Shafatayn"],togri:1},
   ]},
  {id:5,nomi:"Sifat Ilmi",icon:"ص",color:"deep",
   mavzu:`# Sifat Ilmi\n\n**17 ta** sifat: 5 juft + 7 mustaqil.\n\n## Ziddi Bor — 5 Juft\n\n| Sifat | Ziddi |\n|-------|-------|\n|Jahr|Hams|\n|Shadid|Raxv|\n|Isti'lo|Istifol|\n|Itboq|Infitoh|\n|Izloq|Ishmoq|\n\n**Hams 10:** ت ث ح خ س ش ص ف ك ه\nYodlash: **"فَحَثَّهُ شَخْصٌ سَكَتْ"**\n\n**Itboq 4:** ص ض ط ظ\n**Tavassut 5:** ل ن ع م ر — **"لِنْ عُمَرْ"**\n**Isti'lo 7:** خ ص ض ط ظ غ ق — **"خُصَّ ضَغْطٍ قِظْ"**\n\n## Ziddi Yo'q — 7 ta\n\n| Sifat | Harflar | Ta'rif |\n|-------|---------|--------|\n|Safir|ز س ص|Hushtak|\n|Lin|و ي sukunda|Yumshoq|\n|Inhiraf|ل ر|Og'ish|\n|Takrir|ر|Titrash|\n|Tafashi|ش|Yoyilish|\n|Istitoyla|ض|Uzayish|\n|G'unna|ن م|Burun|`,
   vazifalar:[
     {id:1,savol:"Hams sifatida nechta harf?",variantlar:["8","9","10","11"],togri:2},
     {id:2,savol:"Itboq sifatiga kiruvchi harflar:",variantlar:["ص ض ط ظ","ب ر ف ل","ز س ص","ن م و ي"],togri:0},
     {id:3,savol:"'فَحَثَّهُ شَخْصٌ سَكَتْ' qaysi sifat?",variantlar:["Jahr","Hams","Isti'lo","Shadid"],togri:1},
     {id:4,savol:"Tavassut harflari:",variantlar:["ص ض ط ظ","ل ن ع م ر","ب ر ف","ء ه ع ح"],togri:1},
     {id:5,savol:"Takrir faqat qaysi harfda?",variantlar:["ل","ن","ر","م"],togri:2},
   ]},
  {id:6,nomi:"Hamza Harfi",icon:"ء",color:"lime",
   mavzu:`# Hamza Harfi — ء\n\n**Glottal stop** — Adnal Halqdan.\n\n## Hamza va Alif\n\n| | Hamza | Alif |\n|-|-------|------|\n|Tur|To'xtash|Cho'ziq|\n|Maxraj|Adnal Halq|Jawf|\n|Sifat|Shadid|Mad|\n|Misol|أَكَلَ|كِتَاب|\n\n## 5 xil Ko'rinish\n\n| Shakl | Sharti | Misol |\n|-------|--------|-------|\n|أ|Boshi fatha/damma|أَحْمَد|\n|إ|Boshi kasra|إِسْلَام|\n|ؤ|O'rta damma|يُؤْمِن|\n|ئ|O'rta kasra|بِئْر|\n|ء|Oxiri|شَيْء|\n\n## Sifatlari\n- Shadid · Jahr · Istifol · Infitoh · Ishmoq`,
   vazifalar:[
     {id:1,savol:"Hamza qaysi maxrajdan?",variantlar:["Aqsal","Vasat","Adnal Halq","Jawf"],togri:2},
     {id:2,savol:"Boshida kasra bilan hamza:",variantlar:["أ","إ","ؤ","ئ"],togri:1},
     {id:3,savol:"Hamza sifati:",variantlar:["Raxv","Shadid","G'unna","Takrir"],togri:1},
     {id:4,savol:"شَيْء dagi hamza:",variantlar:["Alif ustida","Alif ostida","Mustaqil","Vov ustida"],togri:2},
     {id:5,savol:"Hamza va Alif:",variantlar:["Bir xil","Hamza to'xtash, Alif cho'ziq","Alif jarangli","Faqat yozuvda"],togri:1},
   ]},
  {id:7,nomi:"Tarixiy Olimlar",icon:"ع",color:"green",
   mavzu:`# Fonetika Olimlari\n\n## Abu al-Asvad ad-Du'aliy\n603–688 m. · **Harakat belgilari tizimi**\n\n## Nasr ibn Osim\nvaf. 708 m. · **Nuqta tizimi** (Amir ibn Nosir emas!)\n\n## Yahyo ibn Ya'mar\nNuqta tizimini hamkorlikda ishlab chiqqan\n\n## Al-Xalil ibn Ahmad\n718–791 m. · Harakatlarni takomillashtirdi, "Kitob al-Ayn"\n\n## Sibavayhi\nAl-Xalil shogirdi · "Al-Kitab"\n\n## Xronologiya\n\n| Davr | Voqea |\n|------|-------|\n|688|Abu al-Asvad: harakatlar|\n|708|Nasr ibn Osim: nuqtalar|\n|VIII|Al-Xalil: fonetika ilmi|`,
   vazifalar:[
     {id:1,savol:"Harakat tizimini kim yaratdi?",variantlar:["Nasr ibn Osim","Al-Xalil","Abu al-Asvad","Sibavayhi"],togri:2},
     {id:2,savol:"Nuqta tizimini kim joriy qildi?",variantlar:["Abu al-Asvad","Nasr ibn Osim","Al-Xalil","Sibavayhi"],togri:1},
     {id:3,savol:"Al-Xalil lug'ati qanday tartibda?",variantlar:["Alifbo","Maxrajga ko'ra","Sifatga ko'ra","Tasodifiy"],togri:1},
     {id:4,savol:"Sibavayhi kim edi?",variantlar:["Abu al-Asvad shogirdi","Al-Xalil shogirdi","Mustaqil","Nasr shogirdi"],togri:1},
     {id:5,savol:"Abu al-Asvad harakatlarni qanday belgilagan?",variantlar:["Hozirgicha","Rangli nuqtalar","Raqamlar","Belgilamagan"],togri:1},
   ]},
  {id:8,nomi:"Umumiy Takrorlash",icon:"★",color:"deep",
   mavzu:`# Umumiy Takrorlash\n\n### Arab Yozuvi\n28 harf · o'ngdan chapga · 4 xil shakl · 6 ta faqat o'ngga\n\n### 4 Harakat\n\n| Harakat | Belgi | Ovoz |\n|---------|-------|------|\n|Fatha|بَ|a|\n|Kasra|بِ|i|\n|Damma|بُ|u|\n|Sukun|بْ|yo'q|\n\n### Maxrajlar\n\n| Maxraj | Soni |\n|--------|------|\n|Jawf|3|\n|Halq|6|\n|Lison|18|\n|Shafatayn|4|\n\n### Sifatlar — 17 ta\nJahr↔Hams · Shadid↔Raxv · Isti'lo↔Istifol · Itboq↔Infitoh · Izloq↔Ishmoq\nSafir · Lin · Inhiraf · Takrir · Tafashi · Istitoyla · G'unna\n\n### Olimlar\nAbu al-Asvad (harakat) · Nasr ibn Osim (nuqta) · Al-Xalil (fonetika)`,
   vazifalar:[
     {id:1,savol:"Hamza qaysi maxrajdan?",variantlar:["Aqsal","Vasat","Adnal Halq","Jawf"],togri:2},
     {id:2,savol:"Hams nechta harf?",variantlar:["8","9","10","11"],togri:2},
     {id:3,savol:"Al-Xalil xizmati:",variantlar:["Nuqta","Harakatlarni takomillashtirdi","Lug'at","Nahv"],togri:1},
     {id:4,savol:"Itboq harflari:",variantlar:["ب ر ف ل","ص ض ط ظ","ز س ص","ن م"],togri:1},
     {id:5,savol:"Tavassut harflari:",variantlar:["ل ن ع م ر","ص ض ط ظ","ت ث ح خ","ء ه"],togri:0},
     {id:6,savol:"ث harfi qanday?",variantlar:["Oddiy s","Tilni chiqarib jarangsiz","Qalin s","Tomoqdan"],togri:1},
     {id:7,savol:"Jawf maxrajida nechta harf?",variantlar:["2","3","4","5"],togri:1},
     {id:8,savol:"Safir harflari:",variantlar:["ل ر","ز س ص","ن م","و ي"],togri:1},
     {id:9,savol:"Nasr ibn Osim — xato ism:",variantlar:["Abu al-Asvad","Yahyo","Amir ibn Nosir","Al-Xalil"],togri:2},
     {id:10,savol:"Shadid nechta harf?",variantlar:["6","7","8","9"],togri:2},
   ]},
];

/* ══ AMALIY DATA (qisqartirilgan, asosiy 14 bob) ══ */
const AMALIY=[
  {id:1,harflar:["أ","ب"],nomlar:["Hamza","Ba"],
   maxraj:[{h:"أ",mx:"Adnal Halq",iz:"Tomoqning eng yuqori qismi. Havo to'liq to'xtatiladi — glottal stop."},{h:"ب",mx:"Shafatayn (lab-lab)",iz:"Ikki lab bir-biriga yopiladi, portlatib chiqariladi."}],
   sifatlar:[{h:"أ",sf:["Shadid","Jahr","Istifol","Infitoh","Ishmoq"]},{h:"ب",sf:["Shadid","Jahr","Istifol","Infitoh","Izloq"]}],
   shakllar:[{h:"أ",m:"أ",b:"أ",o:"ـأ",x:"ـأ",iz:"Alif faqat oldingi harfga ulanadi"},{h:"ب",m:"ب",b:"بـ",o:"ـبـ",x:"ـب",iz:"Ba to'rt holatda bog'lanadi"}],
   harakatlar:[{h:"ب",f:"بَ",k:"بِ",d:"بُ",s:"بْ",of:"ba",ok:"bi",od:"bu",os:"b"},{h:"أ",f:"أَ",k:"أِ",d:"أُ",s:"أْ",of:"a",ok:"i",od:"u",os:"hamza"}],
   sozlar:[{ar:"أَب",oq:"Ab",tr:"Ota",h:"أ+ب"},{ar:"بَاب",oq:"Baab",tr:"Eshik",h:"ب+ا+ب"},{ar:"أَبُو",oq:"Abuu",tr:"Otasi",h:"أ+ب+و"},{ar:"بَر",oq:"Bar",tr:"Quruqlik",h:"ب+ر"},{ar:"أَكْبَر",oq:"Akbar",tr:"Kattaroq",h:"أ+ك+ب+ر"}],
   oqish:[{ar:"بَ بِ بُ بْ",iz:"Ba ning 4 harakati"},{ar:"أَبٌ",iz:"Ab-un — ota"},{ar:"بَابٌ",iz:"Baab — eshik"},{ar:"أَبٌ كَبِيرٌ",iz:"Katta ota"},{ar:"بَرِيءٌ",iz:"Beg'ubor"}],
   yozish:[{t:"Ba harfining 4 xil shaklini yozing",m:"بـ ـبـ ـب ب"},{t:"'Baab' so'zini harakat bilan yozing",m:"بَابٌ"},{t:"Alif+Ba birikmasini yozing",m:"أَب"}],
   uyvazifa:["أ va ب harflarini 5 martadan yozing","Ba ning 4 harakatini aytib bering","'Baab' va 'Ab' ni 10 marta o'qing"],
   test:[{s:"ب harfining maxraji?",v:["Halq","Lison","Shafatayn","Jawf"],t:2},{s:"أ harfining sifati?",v:["Raxv","Shadid","G'unna","Lin"],t:1},{s:"بَ qanday o'qiladi?",v:["bi","bu","ba","b"],t:2},{s:"بَابٌ ma'nosi?",v:["Ota","Eshik","Kitob","Bola"],t:1},{s:"ب o'rtasidagi shakli?",v:["بـ","ـبـ","ـب","ب"],t:1}]},
  {id:2,harflar:["ت","ث"],nomlar:["Ta","Sa"],
   maxraj:[{h:"ت",mx:"Tarafi Lison (til uchi—tish)",iz:"Til uchining yuqori tish orqasiga teginishi."},{h:"ث",mx:"Tarafi Lison (tish oraliq)",iz:"Til uchi ikki tish orasiga chiqariladi — 'think' dagi 'th'."}],
   sifatlar:[{h:"ت",sf:["Shadid","Hams","Istifol","Infitoh","Izloq"]},{h:"ث",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq"]}],
   shakllar:[{h:"ت",m:"ت",b:"تـ",o:"ـتـ",x:"ـت",iz:"Ikki nuqta ustida"},{h:"ث",m:"ث",b:"ثـ",o:"ـثـ",x:"ـث",iz:"Uch nuqta ustida"}],
   harakatlar:[{h:"ت",f:"تَ",k:"تِ",d:"تُ",s:"تْ",of:"ta",ok:"ti",od:"tu",os:"t"},{h:"ث",f:"ثَ",k:"ثِ",d:"ثُ",s:"ثْ",of:"θa",ok:"θi",od:"θu",os:"θ"}],
   sozlar:[{ar:"تَمْر",oq:"Tamr",tr:"Xurmo",h:"ت+م+ر"},{ar:"ثَوْب",oq:"θawb",tr:"Kiyim",h:"ث+و+ب"},{ar:"بَيْت",oq:"Bayt",tr:"Uy",h:"ب+ي+ت"},{ar:"ثَلَاثَة",oq:"θalaθa",tr:"Uch",h:"ث+ل+ا+ث"},{ar:"تَابَ",oq:"Taaba",tr:"Tavba qildi",h:"ت+ا+ب"}],
   oqish:[{ar:"تَ تِ تُ تْ",iz:"Ta ning 4 harakati"},{ar:"ثَ ثِ ثُ ثْ",iz:"Sa (tilni chiqarib)"},{ar:"بَيْتٌ",iz:"Uy"},{ar:"ثَلَاثَةٌ",iz:"Uch"},{ar:"تَابَ وَأَنَابَ",iz:"Tavba qildi va qaytdi"}],
   yozish:[{t:"ت va ث farqini yozing (nuqtalar)",m:"ت(2) — ث(3)"},{t:"'Tamr' yozing",m:"تَمْرٌ"},{t:"'θawb' yozing",m:"ثَوْبٌ"}],
   uyvazifa:["ت va ث ni 5 martadan yozing","ث ni tilni chiqarib 20 marta ayting","'Bayt','Tamr','θawb' yod oling"],
   test:[{s:"ث qanday talaffuz?",v:["Oddiy s","Til chiqarib jarangsiz","Qalin s","Tomoqdan"],t:1},{s:"ت maxraji?",v:["Lab","Tomoq","Til uchi—tish","Burun"],t:2},{s:"بَيْتٌ ma'nosi?",v:["Kitob","Eshik","Uy","Bola"],t:2},{s:"ث sifati?",v:["Jahr","Shadid","Hams","G'unna"],t:2},{s:"ثَلَاثَة nima?",v:["Ikki","Uch","To'rt","Besh"],t:1}]},
  {id:3,harflar:["ج","ح"],nomlar:["Jim","Ha"],
   maxraj:[{h:"ج",mx:"Vasat Lison",iz:"Tilning o'rta qismi tanglay tomon ko'tariladi."},{h:"ح",mx:"Vasat Halq",iz:"Tomoqning o'rta qismidan chuqur nafas — jarangsiz."}],
   sifatlar:[{h:"ج",sf:["Shadid","Jahr","Istifol","Infitoh","Ishmoq"]},{h:"ح",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq"]}],
   shakllar:[{h:"ج",m:"ج",b:"جـ",o:"ـجـ",x:"ـج",iz:"Bir nuqta pastida"},{h:"ح",m:"ح",b:"حـ",o:"ـحـ",x:"ـح",iz:"Nuqtasiz"}],
   harakatlar:[{h:"ج",f:"جَ",k:"جِ",d:"جُ",s:"جْ",of:"ja",ok:"ji",od:"ju",os:"j"},{h:"ح",f:"حَ",k:"حِ",d:"حُ",s:"حْ",of:"ħa",ok:"ħi",od:"ħu",os:"ħ"}],
   sozlar:[{ar:"جَمَل",oq:"Jamal",tr:"Tuya",h:"ج+م+ل"},{ar:"حَجَر",oq:"Ħajar",tr:"Tosh",h:"ح+ج+ر"},{ar:"جَاءَ",oq:"Jaa'a",tr:"Keldi",h:"ج+ا+ء"},{ar:"حُبٌّ",oq:"Ħubb",tr:"Sevgi",h:"ح+ب"},{ar:"أَجَل",oq:"Ajal",tr:"Ha",h:"أ+ج+ل"}],
   oqish:[{ar:"جَ جِ جُ جْ",iz:"Jim 4 harakati"},{ar:"حَ حِ حُ حْ",iz:"Ha (tomoqdan)"},{ar:"جَمَلٌ كَبِيرٌ",iz:"Katta tuya"},{ar:"حُبُّ الأَبِ",iz:"Ota sevgisi"},{ar:"جَاءَ الرَّجُلُ",iz:"Erkak keldi"}],
   yozish:[{t:"ج va ح farqini yozing",m:"ج (nuqtali) — ح (nuqtasiz)"},{t:"'Jamal' yozing",m:"جَمَلٌ"},{t:"'Ħubb' yozing",m:"حُبٌّ"}],
   uyvazifa:["ج va ح ni 5 martadan yozing","ح ni tomoqdan 20 marta ayting","'Jamal','Ħajar' yod oling"],
   test:[{s:"ح maxraji?",v:["Jawf","Adnal Halq","Vasat Halq","Aqsal"],t:2},{s:"ج sifati?",v:["Hams","Jahr","G'unna","Lin"],t:1},{s:"حُبٌّ ma'nosi?",v:["Tosh","Tuya","Sevgi","Keldi"],t:2},{s:"ج va ح farqi?",v:["Shakl","Nuqta","Maxraj","Hammasi"],t:3},{s:"جَمَلٌ ma'nosi?",v:["Tosh","Tuya","Sevgi","Eshik"],t:1}]},
  {id:4,harflar:["خ","د"],nomlar:["Xo","Dal"],
   maxraj:[{h:"خ",mx:"Aqsal Halq",iz:"Tomoqning pastki qismidan jarangsiz — o'zbek 'x' chuqurroq."},{h:"د",mx:"Tarafi Lison (til uchi—tish)",iz:"Portlovchi jarangli tovush."}],
   sifatlar:[{h:"خ",sf:["Raxv","Hams","Isti'lo","Infitoh","Ishmoq"]},{h:"د",sf:["Shadid","Jahr","Istifol","Infitoh","Ishmoq"]}],
   shakllar:[{h:"خ",m:"خ",b:"خـ",o:"ـخـ",x:"ـخ",iz:"Uch nuqta (ح ga o'xshash)"},{h:"د",m:"د",b:"د",o:"ـد",x:"ـد",iz:"Faqat o'ng tomonga"}],
   harakatlar:[{h:"خ",f:"خَ",k:"خِ",d:"خُ",s:"خْ",of:"xa",ok:"xi",od:"xu",os:"x"},{h:"د",f:"دَ",k:"دِ",d:"دُ",s:"دْ",of:"da",ok:"di",od:"du",os:"d"}],
   sozlar:[{ar:"خُبْز",oq:"Xubz",tr:"Non",h:"خ+ب+ز"},{ar:"دَرْس",oq:"Dars",tr:"Dars",h:"د+ر+س"},{ar:"خَيْر",oq:"Xayr",tr:"Yaxshilik",h:"خ+ي+ر"},{ar:"دَار",oq:"Daar",tr:"Uy",h:"د+ا+ر"},{ar:"أَخٌ",oq:"Ax",tr:"Aka",h:"أ+خ"}],
   oqish:[{ar:"خَ خِ خُ خْ",iz:"Xo 4 harakati"},{ar:"دَ دِ دُ دْ",iz:"Dal 4 harakati"},{ar:"خُبْزٌ وَدَرْسٌ",iz:"Non va dars"},{ar:"دَارُ الأَخِ",iz:"Akaning uyi"},{ar:"خَيْرٌ كَثِيرٌ",iz:"Ko'p yaxshilik"}],
   yozish:[{t:"خ ni 4 xil shaklda yozing",m:"خـ ـخـ ـخ خ"},{t:"'Xubz' va 'Dars' yozing",m:"خُبْزٌ — دَرْسٌ"},{t:"د faqat o'ngga: دَار",m:"دَارٌ"}],
   uyvazifa:["خ va د ni 5 martadan yozing","خ ni ح dan farqlang (nuqta)","'Xayr','Dars','Xubz' yod oling"],
   test:[{s:"خ maxraji?",v:["Adnal","Vasat","Aqsal Halq","Jawf"],t:2},{s:"د faqat qaysi tomonga?",v:["Ikki","O'ng","Ulanmaydi","Chap"],t:1},{s:"خُبْز ma'nosi?",v:["Dars","Non","Aka","Uy"],t:1},{s:"خ sifati?",v:["Jahr","Shadid","Hams","G'unna"],t:2},{s:"دَرْس ma'nosi?",v:["Uy","Non","Dars","Xayr"],t:2}]},
  {id:5,harflar:["ذ","ر"],nomlar:["Zal","Ra"],
   maxraj:[{h:"ذ",mx:"Tarafi Lison (tish oraliq, jarangli)",iz:"Til uchi tishlar orasiga — 'this' dagi 'dh'."},{h:"ر",mx:"Tarafi Lison (til uchi—milk)",iz:"Til uchi yuqori milkka tegib, titrab chiqadi — Takrir."}],
   sifatlar:[{h:"ذ",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq"]},{h:"ر",sf:["Tavassut","Jahr","Istifol/Isti'lo","Infitoh","Takrir","Inhiraf","Izloq"]}],
   shakllar:[{h:"ذ",m:"ذ",b:"ذ",o:"ـذ",x:"ـذ",iz:"Faqat o'ngga — bir nuqta"},{h:"ر",m:"ر",b:"ر",o:"ـر",x:"ـر",iz:"Faqat o'ngga — nuqtasiz"}],
   harakatlar:[{h:"ذ",f:"ذَ",k:"ذِ",d:"ذُ",s:"ذْ",of:"ða",ok:"ði",od:"ðu",os:"ð"},{h:"ر",f:"رَ",k:"رِ",d:"رُ",s:"رْ",of:"ra",ok:"ri",od:"ru",os:"r"}],
   sozlar:[{ar:"ذَهَبَ",oq:"Zahaba",tr:"Ketdi",h:"ذ+ه+ب"},{ar:"رَجُل",oq:"Rajul",tr:"Erkak",h:"ر+ج+ل"},{ar:"هَذَا",oq:"Haazaa",tr:"Bu",h:"ه+ذ+ا"},{ar:"دَرَسَ",oq:"Darasa",tr:"O'qidi",h:"د+ر+س"},{ar:"ذِكْر",oq:"Zikr",tr:"Zikr",h:"ذ+ك+ر"}],
   oqish:[{ar:"ذَ ذِ ذُ ذْ",iz:"Zal (tilni chiqarib jarangli)"},{ar:"رَ رِ رُ رْ",iz:"Ra (titrab)"},{ar:"ذَهَبَ الرَّجُلُ",iz:"Erkak ketdi"},{ar:"هَذَا كِتَابٌ",iz:"Bu kitob"},{ar:"دَرَسَ الْوَلَدُ",iz:"Bola o'qidi"}],
   yozish:[{t:"ذ va ز farqini yozing",m:"ذ(til chiqarib)—ز(oddiy)"},{t:"'Zaahaba' yozing",m:"ذَهَبَ"},{t:"Ra — Takrir sifatini tushuntir",m:"ر titradi"}],
   uyvazifa:["ذ va ر ni yozing","ذ va ز farqini ayting","'Rajul','Haazaa','Zikr' yod oling"],
   test:[{s:"ذ qanday talaffuz?",v:["Til chiqarib jarangsiz","Til chiqarib jarangli","Oddiy z","Tomoqdan"],t:1},{s:"ر maxsus sifati?",v:["Safir","Takrir","Tafashi","G'unna"],t:1},{s:"هَذَا ma'nosi?",v:["U","Bu","Men","Siz"],t:1},{s:"ذ va ز farqi?",v:["Maxraj","ذ til chiqarib","Sifat","Hammasi"],t:1},{s:"ذَهَبَ ma'nosi?",v:["Keldi","Ketdi","O'tirdi","Yozdi"],t:1}]},
  {id:6,harflar:["ز","س"],nomlar:["Zayn","Sin"],
   maxraj:[{h:"ز",mx:"Tarafi Lison (tish izi, jarangli)",iz:"Jarangli z, Safir sifati."},{h:"س",mx:"Tarafi Lison (tish izi, jarangsiz)",iz:"Jarangsiz s, Safir sifati."}],
   sifatlar:[{h:"ز",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq","Safir"]},{h:"س",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq","Safir"]}],
   shakllar:[{h:"ز",m:"ز",b:"ز",o:"ـز",x:"ـز",iz:"Faqat o'ngga — bir nuqta"},{h:"س",m:"س",b:"سـ",o:"ـسـ",x:"ـس",iz:"To'rt tomonga — nuqtasiz"}],
   harakatlar:[{h:"ز",f:"زَ",k:"زِ",d:"زُ",s:"زْ",of:"za",ok:"zi",od:"zu",os:"z"},{h:"س",f:"سَ",k:"سِ",d:"سُ",s:"سْ",of:"sa",ok:"si",od:"su",os:"s"}],
   sozlar:[{ar:"زَيْد",oq:"Zayd",tr:"(Ism)",h:"ز+ي+د"},{ar:"سَمَاء",oq:"Samaau",tr:"Osmon",h:"س+م+ا+ء"},{ar:"بَازَار",oq:"Baazaar",tr:"Bozor",h:"ب+ا+ز+ا+ر"},{ar:"دَرَسَ",oq:"Darasa",tr:"O'qidi",h:"د+ر+س"},{ar:"زَرَعَ",oq:"Zaraa",tr:"Ekdi",h:"ز+ر+ع"}],
   oqish:[{ar:"زَ زِ زُ زْ",iz:"Zayn 4 harakati"},{ar:"سَ سِ سُ سْ",iz:"Sin 4 harakati"},{ar:"سَمَاءٌ صَافِيَةٌ",iz:"Tiniq osmon"},{ar:"زَرَعَ الأَبُ",iz:"Ota ekdi"},{ar:"سَمِعَ صَبَرَ زَيْدٌ",iz:"Safir yodlash iborasi"}],
   yozish:[{t:"ز va س farqini yozing",m:"ز(nuqtali)—س(nuqtasiz)"},{t:"Safir: ز س ص",m:"Hushtak ovozi"},{t:"'Samaau' yozing",m:"سَمَاءٌ"}],
   uyvazifa:["Safir sifatini ko'rsating","ز،س،ص ni taqqoslang","'Zayd','Samaau','Darasa' yod oling"],
   test:[{s:"Safir harflari?",v:["ل ر","ز س ص","ن م","و ي"],t:1},{s:"ز va س farqi?",v:["Maxraj","ز jarangli, س jarangsiz","Sifat","Shakl"],t:1},{s:"سَمَاء ma'nosi?",v:["Osmon","Bozor","Ism","Ekdi"],t:0},{s:"ز dan tashqari sifat?",v:["Hams","Jahr","G'unna","Lin"],t:1},{s:"دَرَسَ ma'nosi?",v:["Ketdi","Keldi","O'qidi","Yedi"],t:2}]},
  {id:7,harflar:["ش","ص"],nomlar:["Shin","Sod"],
   maxraj:[{h:"ش",mx:"Vasat Lison",iz:"Havo keng yoyiladi — Tafashi sifati."},{h:"ص",mx:"Tarafi Lison (qalin)",iz:"Sin kabi joyda, lekin til orqasi ko'tarilgan — qalin s."}],
   sifatlar:[{h:"ش",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq","Tafashi"]},{h:"ص",sf:["Raxv","Hams","Isti'lo","Itboq","Ishmoq","Safir"]}],
   shakllar:[{h:"ش",m:"ش",b:"شـ",o:"ـشـ",x:"ـش",iz:"Uch nuqta (س ga o'xshash)"},{h:"ص",m:"ص",b:"صـ",o:"ـصـ",x:"ـص",iz:"Nuqtasiz, yumaloq"}],
   harakatlar:[{h:"ش",f:"شَ",k:"شِ",d:"شُ",s:"شْ",of:"sha",ok:"shi",od:"shu",os:"sh"},{h:"ص",f:"صَ",k:"صِ",d:"صُ",s:"صْ",of:"ṣa",ok:"ṣi",od:"ṣu",os:"ṣ"}],
   sozlar:[{ar:"شَمْس",oq:"Shams",tr:"Quyosh",h:"ش+م+س"},{ar:"صَبَرَ",oq:"Ṣabara",tr:"Sabr qildi",h:"ص+ب+ر"},{ar:"شَجَر",oq:"Shajar",tr:"Daraxt",h:"ش+ج+ر"},{ar:"صَدِيق",oq:"Ṣadiiq",tr:"Do'st",h:"ص+د+ي+ق"},{ar:"أَشْجَار",oq:"Ashjaar",tr:"Daraxtlar",h:"أ+ش+ج+ا+ر"}],
   oqish:[{ar:"شَ شِ شُ شْ",iz:"Shin 4 harakati"},{ar:"صَ صِ صُ صْ",iz:"Sod (qalin s!)"},{ar:"شَمْسٌ مُشْرِقَةٌ",iz:"Yorqin quyosh"},{ar:"صَبْرٌ جَمِيلٌ",iz:"Go'zal sabr"},{ar:"سَمِعَ صَبَرَ زَيْدٌ",iz:"Safir iborasi"}],
   yozish:[{t:"س va ش farqini yozing",m:"س(nuqtasiz)—ش(3 nuqta)"},{t:"س va ص farqini tushuntir",m:"س ingichka—ص qalin"},{t:"'Shams' va 'Ṣadiiq' yozing",m:"شَمْسٌ—صَدِيقٌ"}],
   uyvazifa:["Tafashi sifatini ko'rsating","'Shams','Ṣabara','Shajar' yod oling","س va ص farqini amalda ko'rsating"],
   test:[{s:"Tafashi qaysi harfda?",v:["س","ز","ش","ص"],t:2},{s:"ص sifatlari soni?",v:["3","4","5","6"],t:3},{s:"شَمْس ma'nosi?",v:["Oy","Quyosh","Yulduz","Osmon"],t:1},{s:"ص va س farqi?",v:["Maxraj","ص qalin (Isti'lo)","Shakl","Sifat"],t:1},{s:"صَدِيق ma'nosi?",v:["Dushman","Do'st","Ota","Aka"],t:1}]},
  {id:8,harflar:["ض","ط"],nomlar:["Dod","To"],
   maxraj:[{h:"ض",mx:"Hafat Lison (til yon tomoni)",iz:"Tilning yon tomoni milkka — Istitoyla sifati."},{h:"ط",mx:"Tarafi Lison (til uchi—tish, qalin)",iz:"Qalin t — til orqasi ko'tarilgan."}],
   sifatlar:[{h:"ض",sf:["Raxv","Jahr","Isti'lo","Itboq","Ishmoq","Istitoyla"]},{h:"ط",sf:["Shadid","Jahr","Isti'lo","Itboq","Ishmoq"]}],
   shakllar:[{h:"ض",m:"ض",b:"ضـ",o:"ـضـ",x:"ـض",iz:"Nuqtali (ص ga o'xshash)"},{h:"ط",m:"ط",b:"طـ",o:"ـطـ",x:"ـط",iz:"Nuqtasiz, halqali"}],
   harakatlar:[{h:"ض",f:"ضَ",k:"ضِ",d:"ضُ",s:"ضْ",of:"ḍa",ok:"ḍi",od:"ḍu",os:"ḍ"},{h:"ط",f:"طَ",k:"طِ",d:"طُ",s:"طْ",of:"ṭa",ok:"ṭi",od:"ṭu",os:"ṭ"}],
   sozlar:[{ar:"رَمَضَان",oq:"Ramaḍaan",tr:"Ramazon",h:"ر+م+ض+ا+ن"},{ar:"طَرِيق",oq:"Ṭariiq",tr:"Yo'l",h:"ط+ر+ي+ق"},{ar:"ضَرَبَ",oq:"Ḍaraba",tr:"Urdi",h:"ض+ر+ب"},{ar:"طَبِيب",oq:"Ṭabiib",tr:"Doktor",h:"ط+ب+ي+ب"},{ar:"أَرْض",oq:"Arḍ",tr:"Yer",h:"أ+ر+ض"}],
   oqish:[{ar:"ضَ ضِ ضُ ضْ",iz:"Dod 4 harakati"},{ar:"طَ طِ طُ طْ",iz:"To (qalin t)"},{ar:"طَرِيقٌ طَوِيلٌ",iz:"Uzun yo'l"},{ar:"أَرْضٌ وَسَمَاءٌ",iz:"Yer va osmon"},{ar:"طَبِيبٌ مَاهِرٌ",iz:"Mohir doktor"}],
   yozish:[{t:"ض va ص farqini yozing",m:"ص(nuqtasiz)—ض(nuqtali)"},{t:"Istitoyla sifatini tushuntir",m:"Til yon tomoni uzayib chiqadi"},{t:"'Ramaḍaan' va 'Ṭariiq' yozing",m:"رَمَضَانٌ—طَرِيقٌ"}],
   uyvazifa:["Itboq sifatini ko'rsating","'Ramaḍaan','Ṭabiib','Arḍ' yod oling","Istitoyla sifatini namoyish qiling"],
   test:[{s:"Istitoyla qaysi harfda?",v:["ط","ص","ض","ظ"],t:2},{s:"Itboq harflari?",v:["ز س ص","ص ض ط ظ","ب ر ف ل","ن م"],t:1},{s:"أَرْض ma'nosi?",v:["Osmon","Yo'l","Yer","Doktor"],t:2},{s:"ط sifati?",v:["Raxv","Shadid","G'unna","Safir"],t:1},{s:"رَمَضَان nima?",v:["Kunlar","Oylar","Oy nomi","Yil"],t:2}]},
  {id:9,harflar:["ظ","ع"],nomlar:["Zo","Ayn"],
   maxraj:[{h:"ظ",mx:"Tarafi Lison (tish oraliq, qalin, jarangli)",iz:"Tilni chiqarib, til orqasi ko'tarilgan — qalin jarangli."},{h:"ع",mx:"Vasat Halq",iz:"Tomoqning o'rta qismidan siqib, jarangli."}],
   sifatlar:[{h:"ظ",sf:["Raxv","Jahr","Isti'lo","Itboq","Ishmoq"]},{h:"ع",sf:["Tavassut","Jahr","Istifol","Infitoh","Ishmoq"]}],
   shakllar:[{h:"ظ",m:"ظ",b:"ظـ",o:"ـظـ",x:"ـظ",iz:"Nuqta ustida (ط ga o'xshash)"},{h:"ع",m:"ع",b:"عـ",o:"ـعـ",x:"ـع",iz:"Maxsus shakl — 4 holat"}],
   harakatlar:[{h:"ظ",f:"ظَ",k:"ظِ",d:"ظُ",s:"ظْ",of:"ẓa",ok:"ẓi",od:"ẓu",os:"ẓ"},{h:"ع",f:"عَ",k:"عِ",d:"عُ",s:"عْ",of:"ʿa",ok:"ʿi",od:"ʿu",os:"ʿ"}],
   sozlar:[{ar:"ظَهَرَ",oq:"Ẓahara",tr:"Ko'rindi",h:"ظ+ه+ر"},{ar:"عِلْم",oq:"ʿIlm",tr:"Ilm",h:"ع+ل+م"},{ar:"عَظِيم",oq:"ʿAẓiim",tr:"Ulug'",h:"ع+ظ+ي+م"},{ar:"عَمَل",oq:"ʿAmal",tr:"Ish",h:"ع+م+ل"},{ar:"حَظٌّ",oq:"Ħaẓẓ",tr:"Baxt",h:"ح+ظ"}],
   oqish:[{ar:"ظَ ظِ ظُ ظْ",iz:"Zo (tilni chiqarib qalin)"},{ar:"عَ عِ عُ عْ",iz:"Ayn (tomoqdan siqib)"},{ar:"عِلْمٌ عَظِيمٌ",iz:"Buyuk ilm"},{ar:"ظَهَرَ الْحَقُّ",iz:"Haq namoyon bo'ldi"},{ar:"عَمَلٌ صَالِحٌ",iz:"Yaxshi ish"}],
   yozish:[{t:"ظ va ذ farqini yozing",m:"ذ ingichka—ظ qalin (Itboq)"},{t:"ع ning 4 xil shaklini yozing",m:"عـ ـعـ ـع ع"},{t:"'ʿIlm' va 'ʿAẓiim' yozing",m:"عِلْمٌ—عَظِيمٌ"}],
   uyvazifa:["ظ va ذ farqini tushuntiring","ع ni tomoqdan 20 marta ayting","'ʿIlm','ʿAẓiim','ʿAmal' yod oling"],
   test:[{s:"ع maxraji?",v:["Adnal","Vasat Halq","Aqsal","Jawf"],t:1},{s:"ظ sifati (ذ dan farqi)?",v:["Hams","Raxv","Itboq (qalin)","Jahr"],t:2},{s:"عِلْم ma'nosi?",v:["Ish","Ilm","Baxt","Ulug'"],t:1},{s:"عَظِيم ma'nosi?",v:["Kichik","Ulug'","Eski","Yangi"],t:1},{s:"ظ va ط farqi?",v:["Maxraj","ط Shadid, ظ Raxv","Shakl","Sifat"],t:1}]},
  {id:10,harflar:["غ","ف"],nomlar:["G'ayn","Fa"],
   maxraj:[{h:"غ",mx:"Aqsal Halq (jarangli)",iz:"Tomoqning pastki qismidan jarangli — o'zbek g' ga o'xshash."},{h:"ف",mx:"Shafatayn (pastki lab—yuqori tish)",iz:"Pastki lab yuqori tishga tegadi, nafas erkin o'tadi."}],
   sifatlar:[{h:"غ",sf:["Raxv","Jahr","Isti'lo","Infitoh","Ishmoq"]},{h:"ف",sf:["Raxv","Hams","Istifol","Infitoh","Izloq"]}],
   shakllar:[{h:"غ",m:"غ",b:"غـ",o:"ـغـ",x:"ـغ",iz:"Uch nuqta (ع ga o'xshash)"},{h:"ف",m:"ف",b:"فـ",o:"ـفـ",x:"ـف",iz:"Bir nuqta ustida"}],
   harakatlar:[{h:"غ",f:"غَ",k:"غِ",d:"غُ",s:"غْ",of:"ğa",ok:"ği",od:"ğu",os:"ğ"},{h:"ف",f:"فَ",k:"فِ",d:"فُ",s:"فْ",of:"fa",ok:"fi",od:"fu",os:"f"}],
   sozlar:[{ar:"غَيْب",oq:"Ğayb",tr:"G'oyib",h:"غ+ي+ب"},{ar:"فِكْر",oq:"Fikr",tr:"Fikr",h:"ف+ك+ر"},{ar:"غُرْفَة",oq:"Ğurfa",tr:"Xona",h:"غ+ر+ف"},{ar:"فَرَح",oq:"Faraħ",tr:"Sevinch",h:"ف+ر+ح"},{ar:"بَلَغَ",oq:"Balaği",tr:"Yetdi",h:"ب+ل+غ"}],
   oqish:[{ar:"غَ غِ غُ غْ",iz:"G'ayn (jarangli chuqur)"},{ar:"فَ فِ فُ فْ",iz:"Fa (lab-tish)"},{ar:"فِكْرٌ جَيِّدٌ",iz:"Yaxshi fikr"},{ar:"غَيْبٌ عَظِيمٌ",iz:"Ulug' g'ayb"},{ar:"غُرْفَةٌ كَبِيرَةٌ",iz:"Katta xona"}],
   yozish:[{t:"غ va خ farqini yozing",m:"غ(Jahr)—خ(Hams)"},{t:"'Fikr' va 'Ğayb' yozing",m:"فِكْرٌ—غَيْبٌ"},{t:"غ ni ع dan farqlang",m:"ع(Vasat)—غ(Aqsal)"}],
   uyvazifa:["غ va خ farqini ko'rsating","فِرَّ مِنْ لُبّ yod oling (Izloq)","'Ğayb','Fikr','Faraħ' yod oling"],
   test:[{s:"غ va خ farqi?",v:["Maxraj","غ Jahr, خ Hams","Shakl","Sifat soni"],t:1},{s:"ف maxraji?",v:["Lab-lab","Pastki lab—yuqori tish","Tomoq","Burun"],t:1},{s:"غَيْب ma'nosi?",v:["Fikr","Xona","G'oyib","Sevinch"],t:2},{s:"Izloq harflari?",v:["ز س ص","ص ض ط ظ","ب ر ف ل م ن","ن م"],t:2},{s:"فِكْر ma'nosi?",v:["Fikr","Xona","Sevinch","Uy"],t:0}]},
  {id:11,harflar:["ق","ك"],nomlar:["Qof","Kof"],
   maxraj:[{h:"ق",mx:"Aqsal Lison (til ildizi—eng orqa)",iz:"Tilning eng orqa qismi — o'zbek q dan chuqurroq."},{h:"ك",mx:"Vasat Lison (til o'rta-orqa)",iz:"Tilning o'rta-orqa qismi — q dan oldinroq."}],
   sifatlar:[{h:"ق",sf:["Shadid","Jahr","Isti'lo","Infitoh","Ishmoq"]},{h:"ك",sf:["Shadid","Hams","Istifol","Infitoh","Ishmoq"]}],
   shakllar:[{h:"ق",m:"ق",b:"قـ",o:"ـقـ",x:"ـق",iz:"Ikki nuqta ustida"},{h:"ك",m:"ك",b:"كـ",o:"ـكـ",x:"ـك",iz:"Nuqtasiz, diagonal"}],
   harakatlar:[{h:"ق",f:"قَ",k:"قِ",d:"قُ",s:"قْ",of:"qa",ok:"qi",od:"qu",os:"q"},{h:"ك",f:"كَ",k:"كِ",d:"كُ",s:"كْ",of:"ka",ok:"ki",od:"ku",os:"k"}],
   sozlar:[{ar:"قَلَم",oq:"Qalam",tr:"Qalam",h:"ق+ل+م"},{ar:"كِتَاب",oq:"Kitaab",tr:"Kitob",h:"ك+ت+ا+ب"},{ar:"قَمَر",oq:"Qamar",tr:"Oy",h:"ق+م+ر"},{ar:"كَبِير",oq:"Kabiir",tr:"Katta",h:"ك+ب+ي+ر"},{ar:"أَكَلَ",oq:"Akala",tr:"Yedi",h:"أ+ك+ل"}],
   oqish:[{ar:"قَ قِ قُ قْ",iz:"Qof (chuqur q)"},{ar:"كَ كِ كُ كْ",iz:"Kof"},{ar:"كِتَابٌ كَبِيرٌ",iz:"Katta kitob"},{ar:"قَلَمٌ وَكِتَابٌ",iz:"Qalam va kitob"},{ar:"أَكَلَ الرَّجُلُ",iz:"Erkak yedi"}],
   yozish:[{t:"ق va ك farqini yozing",m:"ق chuqurroq—ك oldinroq"},{t:"'Qalam' va 'Kitaab' yozing",m:"قَلَمٌ—كِتَابٌ"},{t:"خُصَّ ضَغْطٍ قِظْ yozing",m:"خ ص ض ط ظ غ ق — Isti'lo"}],
   uyvazifa:["خُصَّ ضَغْطٍ قِظْ yod oling","ق va ك farqini tushuntiring","'Qalam','Kitaab','Qamar' yod oling"],
   test:[{s:"ق maxraji?",v:["Vasat Lison","Aqsal Lison","Tarafi Lison","Jawf"],t:1},{s:"Isti'lo yodlash iborasi?",v:["فِرَّ مِنْ لُبّ","خُصَّ ضَغْطٍ قِظْ","لِنْ عُمَرْ","فَحَثَّهُ"],t:1},{s:"كِتَاب ma'nosi?",v:["Qalam","Oy","Kitob","Katta"],t:2},{s:"ق va ك farqi?",v:["ق Hams, ك Jahr","ق chuqur, ك oldin","Shakl","Nuqta"],t:1},{s:"قَمَر ma'nosi?",v:["Quyosh","Oy","Yulduz","Osmon"],t:1}]},
  {id:12,harflar:["ل","م"],nomlar:["Lom","Mim"],
   maxraj:[{h:"ل",mx:"Tarafi Lison (til uchi yon—milk)",iz:"Til uchi yuqori milkka, havo yon tomoni orqali — Inhiraf."},{h:"م",mx:"Shafatayn (lab-lab)",iz:"Ikki lab yopiladi, nafas burundan — G'unna."}],
   sifatlar:[{h:"ل",sf:["Tavassut","Jahr","Istifol","Infitoh","Inhiraf","Izloq"]},{h:"م",sf:["Shadid","Jahr","Istifol","Infitoh","G'unna","Izloq"]}],
   shakllar:[{h:"ل",m:"ل",b:"لـ",o:"ـلـ",x:"ـل",iz:"Uzun tik chiziq"},{h:"م",m:"م",b:"مـ",o:"ـمـ",x:"ـم",iz:"Halqali shakl"}],
   harakatlar:[{h:"ل",f:"لَ",k:"لِ",d:"لُ",s:"لْ",of:"la",ok:"li",od:"lu",os:"l"},{h:"م",f:"مَ",k:"مِ",d:"مُ",s:"مْ",of:"ma",ok:"mi",od:"mu",os:"m"}],
   sozlar:[{ar:"لَيْل",oq:"Layl",tr:"Kecha",h:"ل+ي+ل"},{ar:"مَاء",oq:"Maau",tr:"Suv",h:"م+ا+ء"},{ar:"كَلَام",oq:"Kalaam",tr:"So'z",h:"ك+ل+ا+م"},{ar:"مُعَلِّم",oq:"Muʿallim",tr:"O'qituvchi",h:"م+ع+ل+م"},{ar:"لَمَسَ",oq:"Lamasa",tr:"Tegdi",h:"ل+م+س"}],
   oqish:[{ar:"لَ لِ لُ لْ",iz:"Lom 4 harakati"},{ar:"مَ مِ مُ مْ",iz:"Mim 4 harakati"},{ar:"لَيْلٌ وَنَهَارٌ",iz:"Kecha va kunduz"},{ar:"مُعَلِّمٌ كَرِيمٌ",iz:"Saxovatli o'qituvchi"},{ar:"لِنْ عُمَرْ",iz:"Tavassut yodlash: ل ن ع م ر"}],
   yozish:[{t:"Inhiraf sifatini tushuntir",m:"Havo yon tomoni orqali"},{t:"'Kalaam' va 'Muʿallim' yozing",m:"كَلَامٌ—مُعَلِّمٌ"},{t:"لِنْ عُمَرْ yozing (Tavassut)",m:"ل ن ع م ر"}],
   uyvazifa:["لِنْ عُمَرْ yod oling (Tavassut)","Inhiraf sifatini ko'rsating","'Layl','Maau','Muʿallim' yod oling"],
   test:[{s:"Inhiraf qaysi harflarda?",v:["ز س","ل ر","ن م","و ي"],t:1},{s:"Tavassut yodlash iborasi?",v:["فِرَّ مِنْ لُبّ","لِنْ عُمَرْ","خُصَّ ضَغْطٍ","فَحَثَّهُ"],t:1},{s:"مُعَلِّم ma'nosi?",v:["O'quvchi","O'qituvchi","Doktor","Muhandis"],t:1},{s:"م G'unna qachon?",v:["Har doim","Shadda va tanvinda","Fathada","Sukunda"],t:1},{s:"لَيْل ma'nosi?",v:["Kun","Kecha","Oy","Quyosh"],t:1}]},
  {id:13,harflar:["ن","ه"],nomlar:["Nun","Ha"],
   maxraj:[{h:"ن",mx:"Tarafi Lison (til uchi—milk)",iz:"Jarangli. Sukunda G'unna sifati."},{h:"ه",mx:"Adnal Halq",iz:"Tomoqning og'izga eng yaqin qismidan yengil nafas — jarangsiz h."}],
   sifatlar:[{h:"ن",sf:["Tavassut","Jahr","Istifol","Infitoh","G'unna","Izloq"]},{h:"ه",sf:["Raxv","Hams","Istifol","Infitoh","Ishmoq"]}],
   shakllar:[{h:"ن",m:"ن",b:"نـ",o:"ـنـ",x:"ـن",iz:"Bir nuqta ostida"},{h:"ه",m:"ه",b:"هـ",o:"ـهـ",x:"ـه",iz:"Maxsus shakl o'rtada"}],
   harakatlar:[{h:"ن",f:"نَ",k:"نِ",d:"نُ",s:"نْ",of:"na",ok:"ni",od:"nu",os:"n"},{h:"ه",f:"هَ",k:"هِ",d:"هُ",s:"هْ",of:"ha",ok:"hi",od:"hu",os:"h"}],
   sozlar:[{ar:"نُور",oq:"Nuur",tr:"Nur",h:"ن+و+ر"},{ar:"هَدِيَّة",oq:"Hadiyya",tr:"Sovg'a",h:"ه+د+ي+ة"},{ar:"نَهَر",oq:"Nahar",tr:"Daryo",h:"ن+ه+ر"},{ar:"هُنَا",oq:"Hunaa",tr:"Bu yerda",h:"ه+ن+ا"},{ar:"أَنَا",oq:"Anaa",tr:"Men",h:"أ+ن+ا"}],
   oqish:[{ar:"نَ نِ نُ نْ",iz:"Nun 4 harakati"},{ar:"هَ هِ هُ هْ",iz:"Ha 4 harakati"},{ar:"نُورٌ وَظَلَامٌ",iz:"Nur va zulmat"},{ar:"هُنَا وَهُنَاكَ",iz:"Bu yerda va u yerda"},{ar:"أَنَا هُنَا",iz:"Men bu yerdaman"}],
   yozish:[{t:"ن va م G'unnasini taqqoslang",m:"Ikkisi ham burundan"},{t:"'Nuur' va 'Hunaa' yozing",m:"نُورٌ—هُنَا"},{t:"ه va ح farqini yozing",m:"ه(Adnal,yengil)—ح(Vasat,chuqur)"}],
   uyvazifa:["G'unna sifatini ko'rsating","ه va ح farqini ayting","'Nuur','Nahar','Anaa' yod oling"],
   test:[{s:"ه maxraji?",v:["Vasat","Adnal Halq","Aqsal","Jawf"],t:1},{s:"G'unna harflari?",v:["ل ر","ز س","ن م","و ي"],t:2},{s:"نُور ma'nosi?",v:["Zulmat","Nur","Daryo","Sovg'a"],t:1},{s:"أَنَا ma'nosi?",v:["Sen","U","Men","Biz"],t:2},{s:"Tavassut harflari?",v:["ص ض ط ظ","ل ن ع م ر","ب ر ف","ن م"],t:1}]},
  {id:14,harflar:["و","ي"],nomlar:["Vov","Ya"],
   maxraj:[{h:"و",mx:"Shafatayn + Jawf (mad)",iz:"Lab: ikki lab yumaloqlanadi. Mad: cho'ziq Ū."},{h:"ي",mx:"Vasat Lison + Jawf (mad)",iz:"Til o'rtasi. Mad: cho'ziq Ī."}],
   sifatlar:[{h:"و",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq","Lin (sukunda)"]},{h:"ي",sf:["Raxv","Jahr","Istifol","Infitoh","Ishmoq","Lin (sukunda)"]}],
   shakllar:[{h:"و",m:"و",b:"و",o:"ـو",x:"ـو",iz:"Faqat o'ngga"},{h:"ي",m:"ي",b:"يـ",o:"ـيـ",x:"ـي",iz:"Ikki nuqta ostida"}],
   harakatlar:[{h:"و",f:"وَ",k:"وِ",d:"وُ",s:"وْ",of:"wa",ok:"wi",od:"wu",os:"w/Ū"},{h:"ي",f:"يَ",k:"يِ",d:"يُ",s:"يْ",of:"ya",ok:"yi",od:"yu",os:"y/Ī"}],
   sozlar:[{ar:"وَلَد",oq:"Walad",tr:"Bola",h:"و+ل+د"},{ar:"يَوْم",oq:"Yawm",tr:"Kun",h:"ي+و+م"},{ar:"بَيْت",oq:"Bayt",tr:"Uy",h:"ب+ي+ت"},{ar:"خَوْف",oq:"Xawf",tr:"Qo'rquv",h:"خ+و+ف"},{ar:"يَدٌ",oq:"Yad",tr:"Qo'l",h:"ي+د"}],
   oqish:[{ar:"وَ وِ وُ وْ",iz:"Vov 4 harakati"},{ar:"يَ يِ يُ يْ",iz:"Ya 4 harakati"},{ar:"خَوْفٌ وَبَيْتٌ",iz:"Lin sifati"},{ar:"يَوْمٌ جَمِيلٌ",iz:"Go'zal kun"},{ar:"وَلَدٌ وَبِنْتٌ",iz:"O'g'il va qiz"}],
   yozish:[{t:"Lin sifatini tushuntir",m:"خَوْف—بَيْت (sukunda)"},{t:"Mad: و=Ū, ي=Ī",m:"نُور(و uzun)—دِين(ي uzun)"},{t:"'Walad' va 'Yawm' yozing",m:"وَلَدٌ—يَوْمٌ"}],
   uyvazifa:["Lin va Mad sifatlarini tushuntiring","'Walad','Yawm','Bayt','Yad' yod oling","خَوْف va بَيْت da Lin sifatini ko'rsating"],
   test:[{s:"Lin sifati (qachon)?",v:["ل ر—har doim","و ي—sukunda","ن م—shadda","ز س—fathada"],t:1},{s:"بَيْت da ي holati?",v:["Mad","Lin (sukun)","Oddiy","G'unna"],t:1},{s:"وَلَد ma'nosi?",v:["Qiz","Bola","Daryo","Kun"],t:1},{s:"Mad da و qanday o'qiladi?",v:["wa","wi","Ū (uzun u)","wu"],t:2},{s:"يَوْم ma'nosi?",v:["Kecha","Oy","Kun","Yil"],t:2}]},
];

/* ══ DASTUR ══ */
const DASTUR=[
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

/* ══ TTS ══ */
function speakAr(text){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="ar-SA"; u.rate=0.7; u.pitch=1;
  const av=window.speechSynthesis.getVoices().find(v=>v.lang&&v.lang.startsWith("ar"));
  if(av) u.voice=av;
  window.speechSynthesis.speak(u);
}
if(typeof window!=="undefined"&&window.speechSynthesis)
  window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();

/* ══ MD RENDERER ══ */
function MD({text,compact=false}){
  if(!text) return null;
  const lines=text.split('\n'); const els=[]; let tb=[]; let inT=false; let k=0;
  const isAr=s=>/[\u0600-\u06FF]/.test(s);
  const flush=()=>{
    if(!tb.length) return;
    els.push(<div key={k++} style={{overflowX:'auto',margin:'10px 0'}}>
      <table style={{borderCollapse:'collapse',width:'100%',fontSize:12}}>
        <tbody>{tb.map((row,ri)=>(<tr key={ri} style={{background:ri===0?'rgba(13,58,26,.07)':'transparent',borderBottom:'1px solid rgba(13,58,26,.07)'}}>
          {row.map((c,ci)=>{const ar=isAr(c.trim());return<td key={ci} style={{padding:'5px 9px',color:ri===0?T.green:T.text,fontWeight:ri===0?600:400,border:'1px solid rgba(13,58,26,.07)',fontFamily:ar?AR:FONT,fontSize:ar?17:12,direction:ar?'rtl':'ltr',textAlign:ar?'right':'left'}}>{c.trim()}</td>;})}
        </tr>))}</tbody>
      </table></div>);
    tb=[]; inT=false;
  };
  const b=s=>s.replace(/\*\*([^*]+)\*\*/g,(m,g)=>{const ar=isAr(g);return`<strong style="color:${T.green500};font-weight:600;${ar?`font-family:${AR};font-size:17px`:''}">${g}</strong>`;});
  lines.forEach(ln=>{
    if(ln.startsWith('|')){if(!ln.includes('---')){tb.push(ln.split('|').filter((_,i,a)=>i>0&&i<a.length-1));inT=true;}return;}
    if(inT) flush();
    const fs=compact?12:13;
    if(ln.startsWith('# ')) els.push(<h1 key={k++} style={{fontSize:compact?17:20,fontWeight:600,color:T.green,margin:'0 0 10px',letterSpacing:'-.015em'}}>{ln.slice(2)}</h1>);
    else if(ln.startsWith('## ')) els.push(<h2 key={k++} style={{fontSize:compact?13:15,fontWeight:600,color:T.green,margin:'14px 0 4px'}}>{ln.slice(3)}</h2>);
    else if(ln.startsWith('### ')) els.push(<h3 key={k++} style={{fontSize:compact?12:13,fontWeight:600,color:T.text2,margin:'10px 0 3px'}}>{ln.slice(4)}</h3>);
    else if(ln.startsWith('---')) els.push(<div key={k++} style={{height:1,background:'rgba(13,58,26,.1)',margin:'11px 0'}}/>);
    else if(ln.startsWith('- ')) els.push(<div key={k++} style={{display:'flex',gap:7,fontSize:fs,color:T.text,margin:'2px 0',paddingLeft:8,lineHeight:1.6}}><span style={{color:T.lime,flexShrink:0,marginTop:2}}>▸</span><span dangerouslySetInnerHTML={{__html:b(ln.slice(2))}}/></div>);
    else if(ln.trim()) els.push(<p key={k++} style={{fontSize:fs,color:T.text,margin:'3px 0',lineHeight:1.7}} dangerouslySetInnerHTML={{__html:b(ln)}}/>);
    else els.push(<div key={k++} style={{height:4}}/>);
  });
  if(inT) flush();
  return<div style={{fontFamily:FONT,WebkitFontSmoothing:'antialiased'}}>{els}</div>;
}

/* ══ LOGIN ══ */
function Login({onLogin}){
  const [role,setRole]=useState(null);
  const [login,setLogin]=useState("");
  const [parol,setParol]=useState("");
  const [err,setErr]=useState("");
  const tryLogin=()=>{
    const u=USERS_DB.find(u=>u.login===login&&u.parol===parol&&u.role===(role==="teacher"?"teacher":"student"));
    if(u) onLogin(u); else setErr("Login yoki parol xato!");
  };
  const inp={width:"100%",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:10,padding:"10px 13px",color:"#fff",fontSize:13,outline:"none",fontFamily:FONT,boxSizing:"border-box"};
  return(
    <div style={{height:"100vh",background:T.meshHero,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FONT,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:T.sheen,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1,width:380,maxWidth:"92%"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:52,height:52,borderRadius:14,background:T.gLime,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",boxShadow:"0 4px 16px rgba(13,58,26,.4)"}}><BookOpen size={24} color={T.onCta}/></div>
          <div style={{fontSize:22,fontWeight:600,color:"#fff",letterSpacing:"-.015em"}}>Arab Fonetika Kursi</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:4}}>Kirish uchun rolni tanlang</div>
          <div style={{width:78,height:5,background:T.gLimeH,borderRadius:3,margin:"12px auto 0"}}/>
        </div>
        {!role?(
          <div style={{display:"flex",gap:12}}>
            {[{r:"teacher",ic:<UserCheck size={26}/>,t:"O'qituvchi",s:"To'liq kirish"},{r:"student",ic:<GraduationCap size={26}/>,t:"O'quvchi",s:"Darslar"}].map(o=>(
              <button key={o.r} onClick={()=>{setRole(o.r);setErr("");}} style={{flex:1,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:14,padding:"20px 12px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,color:"#fff",transition:"background .2s"}}>
                <div style={{width:50,height:50,borderRadius:12,background:T.gLime,display:"flex",alignItems:"center",justifyContent:"center",color:T.onCta}}>{o.ic}</div>
                <div style={{fontSize:14,fontWeight:600}}>{o.t}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.55)"}}>{o.s}</div>
              </button>
            ))}
          </div>
        ):(
          <div style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:14,padding:20}}>
            <button onClick={()=>setRole(null)} style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:7,padding:"4px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,color:"rgba(255,255,255,.7)",fontSize:11,marginBottom:13}}><ChevronLeft size={12}/>Orqaga</button>
            <div style={{fontSize:14,fontWeight:600,color:"#fff",marginBottom:14}}>{role==="teacher"?"O'qituvchi kirishi":"O'quvchi kirishi"}</div>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:11,color:"rgba(255,255,255,.6)",display:"block",marginBottom:4}}>Login</label>
              <input value={login} onChange={e=>{setLogin(e.target.value);setErr("");}} placeholder={role==="teacher"?"ustoz":"abdulloh, yusuf..."}  style={inp}/>
            </div>
            <div style={{marginBottom:8}}>
              <label style={{fontSize:11,color:"rgba(255,255,255,.6)",display:"block",marginBottom:4}}>Parol</label>
              <input type="password" value={parol} onChange={e=>{setParol(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&tryLogin()} placeholder="••••" style={inp}/>
            </div>
            {err&&<div style={{fontSize:12,color:"#ff8a95",marginBottom:9,display:"flex",alignItems:"center",gap:4}}><XCircle size={12}/>{err}</div>}
            <button onClick={tryLogin} style={{width:"100%",background:T.gLime,border:"none",borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:600,color:T.onCta,marginTop:5,boxShadow:"0 2px 8px rgba(46,184,46,.4)"}}>Kirish</button>
            <div style={{fontSize:10,color:"rgba(255,255,255,.35)",textAlign:"center",marginTop:10}}>
              {role==="teacher"?"ustoz / 1234":"abdulloh / 1234  •  yusuf / 1234  •  mariya / 1234"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══ ROOT ══ */
export default function App(){
  const [user,setUser]=useState(null);
  useEffect(()=>{
    const block=e=>{e.preventDefault();return false;};
    document.addEventListener("contextmenu",block);
    document.addEventListener("copy",block);
    document.addEventListener("cut",block);
    return()=>{document.removeEventListener("contextmenu",block);document.removeEventListener("copy",block);document.removeEventListener("cut",block);};
  },[]);
  if(!user) return<Login onLogin={setUser}/>;
  return<Platform user={user} onLogout={()=>setUser(null)}/>;
}

/* ══ PLATFORM ══ */
function Platform({user,onLogout}){
  const isT=user.role==="teacher";
  const [sec,setSec]=useState("home");
  const [nOpen,setNOpen]=useState(true);
  const [aOpen,setAOpen]=useState(false);
  const [selNaz,setSelNaz]=useState(null);
  const [selAmal,setSelAmal]=useState(null);
  const [nazPhase,setNazPhase]=useState("mavzu");
  const [amalTab,setAmalTab]=useState("maxraj");
  const [nazAns,setNazAns]=useState({});
  const [nazDone,setNazDone]=useState({});
  const [amalAns,setAmalAns]=useState({});
  const [amalDone,setAmalDone]=useState({});
  const [amalTestDone,setAmalTestDone]=useState(false);
  const [unlocked,setUnlocked]=useState(isT?{1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true}:{1:true});
  const [sb,setSb]=useState(true);
  const [showProf,setShowProf]=useState(false);
  const [avatar,setAvatar]=useState(null);
  const [aiMsgs,setAiMsgs]=useState([]);
  const [aiIn,setAiIn]=useState("");
  const [aiLoad,setAiLoad]=useState(false);
  const [chatMsgs,setChatMsgs]=useState([
    {id:1,uid:"t1",ism:"Ozodbek (ustoz)",me:false,text:"Assalomu alaykum! Bugun maxraj ilmini takrorlaymiz.",time:"09:00"},
    {id:2,uid:"s2",ism:"Yusuf",me:false,text:"Vaalaykum assalom, tayyormiz!",time:"09:02"},
  ]);
  const [chatIn,setChatIn]=useState("");
  const [davomat,setDavomat]=useState(()=>{const o={};USERS_DB.filter(u=>u.role==="student").forEach(u=>o[u.id]="keldi");return o;});
  const [showWrite,setShowWrite]=useState({});
  const [openOy,setOpenOy]=useState(null);
  const [openH,setOpenH]=useState(null);
  const [storageReady,setStorageReady]=useState(false);
  const [nazShuffled,setNazShuffled]=useState({});
  const [amalShuffled,setAmalShuffled]=useState({});

  // Notification count
  const [notifs,setNotifs]=useState(0);

  const fileRef=useRef(null);
  const chatEndRef=useRef(null);
  const aiEndRef=useRef(null);
  const nazVazifaRef=useRef(null);
  const amalTestRef=useRef(null);

  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"});},[chatMsgs]);
  useEffect(()=>{aiEndRef.current?.scrollIntoView({behavior:"smooth"});},[aiMsgs]);

  /* ─ Storage load ─ */
  useEffect(()=>{
    (async()=>{
      const nd=await store.get(`naz_done_${user.id}`); if(nd) setNazDone(nd);
      const ul=await store.get(`unlocked_${user.id}`); if(ul) setUnlocked(ul);
      const ad=await store.get(`amal_done_${user.id}`); if(ad) setAmalDone(ad);
      const av=await store.get(`avatar_${user.id}`); if(av) setAvatar(av);
      const dv=await store.get(`davomat`); if(dv) setDavomat(dv);
      const cm=await store.get(`chat_msgs`); if(cm) setChatMsgs(cm);
      setStorageReady(true);
    })();
  },[user.id]);

  /* ─ Shuffle helpers ─ */
  const shuffle=arr=>[...arr].sort(()=>Math.random()-.5);
  const getShuffledNaz=useCallback((darsId,vazifalar)=>{
    if(!nazShuffled[darsId]){
      const s=vazifalar.map(v=>({...v,_opts:shuffle(v.variantlar.map((t,i)=>({t,isAns:i===v.togri})))}));
      setNazShuffled(p=>({...p,[darsId]:s}));
      return s;
    }
    return nazShuffled[darsId];
  },[nazShuffled]);

  const getShuffledAmal=useCallback((bobId,test)=>{
    if(!amalShuffled[bobId]){
      const s=test.map(q=>({...q,_opts:shuffle(q.v.map((t,i)=>({t,isAns:i===q.t})))}));
      setAmalShuffled(p=>({...p,[bobId]:s}));
      return s;
    }
    return amalShuffled[bobId];
  },[amalShuffled]);

  /* ─ Open dars ─ */
  const openNaz=d=>{
    if(!canOpenNaz(d.id)) return;
    setSelNaz(d); setNazPhase("mavzu"); setNazAns({});
    // re-shuffle
    setNazShuffled(p=>{const n={...p}; delete n[d.id]; return n;});
    setSec("naz"); setShowProf(false);
  };
  const openAmal=d=>{
    setSelAmal(d); setAmalTab("maxraj"); setAmalAns({}); setAmalTestDone(false);
    setAmalShuffled(p=>{const n={...p}; delete n[d.id]; return n;});
    setSec("amal"); setShowProf(false);
  };

  const canOpenNaz=id=>isT||unlocked[id];

  /* ─ Submit nazariy ─ */
  const submitNaz=async()=>{
    const tot=selNaz.vazifalar.length;
    const ok=selNaz.vazifalar.filter(v=>nazAns[v.id]===v.togri).length;
    const pct=Math.round(ok/tot*100);
    const newDone={...nazDone,[selNaz.id]:{ok,tot,pct,sana:new Date().toLocaleDateString("uz")}};
    setNazDone(newDone);
    await store.set(`naz_done_${user.id}`,newDone);
    if(!isT&&pct>=80&&selNaz.id<NAZARIY.length){
      const newUnlocked={...unlocked,[selNaz.id+1]:true};
      setUnlocked(newUnlocked);
      await store.set(`unlocked_${user.id}`,newUnlocked);
    }
    setNazPhase("natija");
  };

  /* ─ Submit amaliy ─ */
  const submitAmal=async()=>{
    const shuffled=getShuffledAmal(selAmal.id,selAmal.test);
    const ok=shuffled.filter((q,i)=>{const myOpt=amalAns[i]; return myOpt?.isAns;}).length;
    const pct=Math.round(ok/selAmal.test.length*100);
    const newDone={...amalDone,[selAmal.id]:{ok,tot:selAmal.test.length,pct,sana:new Date().toLocaleDateString("uz")}};
    setAmalDone(newDone);
    await store.set(`amal_done_${user.id}`,newDone);
    setAmalTestDone(true);
  };

  /* ─ Chat ─ */
  const sendChat=async()=>{
    if(!chatIn.trim()) return;
    const msg={id:Date.now(),uid:user.id,ism:isT?user.ism+" (ustoz)":user.ism,me:true,text:chatIn.trim(),time:new Date().toLocaleTimeString("uz",{hour:"2-digit",minute:"2-digit"})};
    const newMsgs=[...chatMsgs,msg];
    setChatMsgs(newMsgs); setChatIn("");
    await store.set("chat_msgs",newMsgs);
  };

  /* ─ Davomat ─ */
  const toggleDavomat=async(id)=>{
    if(!isT) return;
    const newDv={...davomat,[id]:davomat[id]==="keldi"?"kelmadi":"keldi"};
    setDavomat(newDv);
    await store.set("davomat",newDv);
  };

  /* ─ Avatar ─ */
  const pickAvatar=async e=>{
    const f=e.target.files?.[0]; if(!f) return;
    const r=new FileReader();
    r.onload=async()=>{setAvatar(r.result); await store.set(`avatar_${user.id}`,r.result);};
    r.readAsDataURL(f);
  };

  /* ─ AI ─ */
  const sendAi=async()=>{
    if(!aiIn.trim()||aiLoad) return;
    const msg=aiIn.trim(); setAiIn("");
    setAiMsgs(p=>[...p,{role:"user",content:msg}]); setAiLoad(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:"Siz arab tili fonetikas o'qituvchisi. Faqat fonetika: harflar, maxraj, sifat, harakatlar. O'zbek tilida aniq va qisqa tushuntiring.",messages:[...aiMsgs.map(m=>({role:m.role,content:m.content})),{role:"user",content:msg}]})});
      const data=await r.json();
      setAiMsgs(p=>[...p,{role:"assistant",content:data.content?.map(c=>c.text||"").join("")||"Xatolik."}]);
    }catch{setAiMsgs(p=>[...p,{role:"assistant",content:"Xatolik yuz berdi."}]);}
    setAiLoad(false);
  };

  /* ─ Computed ─ */
  const students=USERS_DB.filter(u=>u.role==="student");
  const sorted=[...students].sort((a,b)=>{
    const pa=Object.values(nazDone).reduce((s,d)=>s+d.pct,0)/Math.max(Object.keys(nazDone).length,1);
    return b.id.localeCompare(a.id);
  });
  const nazDoneCount=Object.keys(nazDone).length;
  const nazPassCount=Object.values(nazDone).filter(d=>d.pct>=80).length;
  const amalDoneCount=Object.keys(amalDone).length;
  const uAvatar=(sz=32,fs=13,uid=null)=>{
    const av=uid===user.id?avatar:null;
    return av
      ?<img src={av} alt="" style={{width:sz,height:sz,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
      :<div style={{width:sz,height:sz,borderRadius:"50%",background:T.gLime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:fs,fontWeight:700,color:T.onCta,flexShrink:0}}>{(uid?USERS_DB.find(u=>u.id===uid)?.ism||"?":user.ism)[0]}</div>;
  };

  /* ─ Progress bar ─ */
  const TotalProgress=()=>{
    const nazPct=Math.round(nazPassCount/NAZARIY.length*100);
    const amalPct=Math.round(amalDoneCount/AMALIY.length*100);
    const overall=Math.round((nazPct+amalPct)/2);
    return(
      <div style={{...card(),padding:"14px 16px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:12,fontWeight:600,color:T.green}}>Umumiy Progress</span>
          <span style={{fontSize:16,fontWeight:700,color:T.lime}}>{overall}%</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {[{l:"Nazariy",pct:nazPct,n:nazPassCount,tot:NAZARIY.length},{l:"Amaliy",pct:amalPct,n:amalDoneCount,tot:AMALIY.length}].map(p=>(
            <div key={p.l}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,color:T.text2}}>{p.l}</span>
                <span style={{fontSize:11,color:T.hint}}>{p.n}/{p.tot}</span>
              </div>
              <div style={{height:6,borderRadius:3,background:"rgba(13,58,26,.1)",overflow:"hidden"}}>
                <div style={{width:p.pct+"%",height:"100%",background:T.gLimeH,borderRadius:3,transition:"width .8s"}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─ NI ─ */
  const NI=({icon,label,active,onClick,badge})=>(
    <button onClick={onClick} style={{width:"100%",background:active?"rgba(106,239,90,.15)":"transparent",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8,padding:"8px",borderRadius:8,borderLeft:active?"2px solid #6AEF5A":"2px solid transparent",transition:"all .14s",position:"relative"}}>
      <span style={{color:active?T.limeBrt:"rgba(255,255,255,.55)",flexShrink:0,display:"flex"}}>{icon}</span>
      {sb&&<span style={{fontSize:12,fontWeight:500,color:active?"#fff":"rgba(255,255,255,.65)",flex:1,textAlign:"left",whiteSpace:"nowrap"}}>{label}</span>}
      {badge>0&&<span style={{position:"absolute",top:4,right:sb?8:4,width:16,height:16,borderRadius:"50%",background:T.red,fontSize:9,fontWeight:700,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{badge}</span>}
    </button>
  );

  /* ─ ST ─ */
  const ST=({text})=>(<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><div style={{width:4,height:16,borderRadius:2,background:T.gLime}}/><span style={{fontSize:13,fontWeight:600,color:T.green}}>{text}</span></div>);
  const PH=({kicker,title,sub})=>(
    <div style={{background:T.gGreen,padding:"16px 20px",position:"relative",overflow:"hidden",flexShrink:0}}>
      <div style={{position:"absolute",inset:0,background:T.sheen,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:".07em",textTransform:"uppercase",color:T.limeBrt,marginBottom:5}}>{kicker}</div>
        <div style={{fontSize:18,fontWeight:600,color:"#fff",letterSpacing:"-.015em"}}>{title}</div>
        <div style={{width:78,height:5,background:T.gLimeH,borderRadius:3,margin:"9px 0 7px"}}/>
        {sub&&<div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{sub}</div>}
      </div>
    </div>
  );

  return(
    <div style={{display:"flex",height:"100vh",overflow:"hidden",fontFamily:FONT,WebkitFontSmoothing:"antialiased",userSelect:"none",WebkitUserSelect:"none"}}>
      {/* ═══ SIDEBAR ═══ */}
      <div style={{width:sb?256:50,flexShrink:0,background:T.green,display:"flex",flexDirection:"column",transition:"width .22s",overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:T.sheen,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100%"}}>
          <div style={{padding:"12px 10px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:T.gLime,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><BookOpen size={14} color={T.onCta}/></div>
            {sb&&<div style={{flex:1,overflow:"hidden"}}><div style={{fontSize:12,fontWeight:700,color:"#fff",whiteSpace:"nowrap"}}>Fonetika Kursi</div><div style={{fontSize:9,color:T.limeBrt}}>{isT?"O'qituvchi":"O'quvchi"}</div></div>}
            <button onClick={()=>setSb(p=>!p)} style={{background:"rgba(255,255,255,.08)",border:"none",borderRadius:7,width:24,height:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.6)",flexShrink:0}}>
              {sb?<ChevronLeft size={13}/>:<ChevronRight size={13}/>}
            </button>
          </div>

          <div style={{flex:1,overflowY:"auto",padding:"6px"}}>
            <NI icon={<Home size={14}/>} label="Bosh sahifa" active={sec==="home"} onClick={()=>{setSec("