/* Dizayn tokenlari — asl prototipdan ko'chirildi (verbatim) */
export const FONT='"Be Vietnam Pro",-apple-system,system-ui,sans-serif';
export const AR='"Sakkal Majalla","Traditional Arabic","Noto Naskh Arabic",serif';

if(typeof document!=="undefined"&&!document.getElementById("bvp-font")){
  const l=document.createElement("link");l.id="bvp-font";l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";
  document.head.appendChild(l);
}

export const T={
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

export const card=()=>({background:"#fff",borderRadius:14,border:"1px solid rgba(13,58,26,.10)",boxShadow:"0 2px 8px rgba(13,58,26,.07)",overflow:"hidden"});
export const BtnP={background:T.gLime,border:"none",borderRadius:11,padding:"11px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontSize:13,fontWeight:600,color:T.onCta,boxShadow:"0 2px 8px rgba(46,184,46,.3)"};
export const BtnG={background:"rgba(13,58,26,.07)",border:"1px solid rgba(13,58,26,.12)",borderRadius:9,padding:"9px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:500,color:T.text2};
