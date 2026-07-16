import { useState, useRef, useEffect, type CSSProperties } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BookOpen, LogOut, MoreHorizontal, X,
  PanelLeftClose, PanelLeftOpen, BookOpenText, GraduationCap, RefreshCw, Shield,
} from "lucide-react";
import { T } from "../theme/tokens";
import { useAuth } from "../auth/AuthContext";
import { adminNavForRole, type NavItem } from "./nav";
import { useMediaQuery } from "../lib/useMediaQuery";
import { isTelegramMiniApp, getTelegramSafeInsets, initTelegramApp } from "../lib/telegram";

type AdminRole = "ceo" | "teacher" | "assistant";
type CeoMode  = "grammatika" | "fonetika";

function loadCeoMode(): CeoMode | null {
  try { return localStorage.getItem("afp:ceo_mode") as CeoMode | null; } catch { return null; }
}
function saveCeoMode(m: CeoMode) {
  try { localStorage.setItem("afp:ceo_mode", m); } catch { /* ignore */ }
}

function CeoModePicker({ onPick }: { onPick: (m: CeoMode) => void }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:T.green, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ position:"absolute", inset:0, background:T.sheen, pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:380, textAlign:"center" }}>
        <div style={{ width:60, height:60, borderRadius:18, background:T.gLime, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
          <BookOpen size={28} color={T.onCta} />
        </div>
        <div style={{ fontSize:13, fontWeight:600, color:T.limeBrt, letterSpacing:".08em", textTransform:"uppercase", marginBottom:8 }}>Xush kelibsiz</div>
        <div style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:10 }}>Yo'nalishni tanlang</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.65)", marginBottom:32, lineHeight:1.6 }}>
          Qaysi kontent yo'nalishini ko'rishni xohlaysiz?<br />Keyin sozlamalardan o'zgartirish mumkin.
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {([
            { mode:"fonetika"  as CeoMode, icon:GraduationCap, title:"Fonetika",    desc:"Arab tili tovush va talaffuz bo'limlari" },
            { mode:"grammatika"as CeoMode, icon:BookOpenText,   title:"Grammatika",  desc:"Arab tili grammatika va sintaksis bo'limlari" },
          ] as const).map(({ mode, icon:Icon, title, desc }) => (
            <button key={mode} onClick={() => onPick(mode)}
              style={{ display:"flex", alignItems:"center", gap:16, background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", borderRadius:16, padding:"18px 20px", cursor:"pointer", textAlign:"left" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.2)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.12)";}}
            >
              <div style={{ width:44, height:44, borderRadius:12, background:T.gLime, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon size={22} color={T.onCta} />
              </div>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:3 }}>{title}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.65)" }}>{desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, src, size = 30 }: { name: string; src?: string | null; size?: number }) {
  if (src) return <img src={src} alt="" style={{ width:size, height:size, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />;
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:T.gLime, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.42, fontWeight:700, color:T.onCta, flexShrink:0 }}>
      {name[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

function useChatDot(): boolean {
  const [dot, setDot] = useState(() => {
    try { for (let i=0;i<localStorage.length;i++) if (localStorage.key(i)?.startsWith("afp:chat_new_")) return true; } catch {/**/ }
    return false;
  });
  useEffect(() => {
    const check = () => {
      let found = false;
      try { for (let i=0;i<localStorage.length;i++) { if (localStorage.key(i)?.startsWith("afp:chat_new_")) { found=true; break; } } } catch {/**/ }
      setDot(found);
    };
    window.addEventListener("storage", check);
    const t = setInterval(check, 4000);
    return () => { window.removeEventListener("storage", check); clearInterval(t); };
  }, []);
  return dot;
}

// Sidebar uchun seksiya guruhlash
const BOSHQARUV_PATHS = ["/oquvchilar","/ustozlar","/guruhlar","/davomat","/statistika","/shikoyat","/skaner"];
const KONTENT_PATHS   = ["/dars","/grammatika","/dastur","/video","/kitobxona"];
const TIZIM_PATHS     = ["/chat","/profil"];

function groupAdminItems(items: NavItem[]) {
  return [
    { label: null,          items: items.filter(i => i.to === "/") },
    { label: "Boshqaruv",   items: items.filter(i => BOSHQARUV_PATHS.includes(i.to)) },
    { label: "Kontent",     items: items.filter(i => KONTENT_PATHS.includes(i.to)) },
    { label: "Tizim",       items: items.filter(i => TIZIM_PATHS.includes(i.to)) },
  ].filter(g => g.items.length > 0);
}

const ROLE_LABELS: Record<AdminRole, string> = {
  ceo:       "CEO",
  teacher:   "O'qituvchi",
  assistant: "Yordamchi",
};

export function AdminShell() {
  const { user, avatar, logout } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [moreOpen, setMoreOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem("afp:admin_sidebar_collapsed") === "1"; } catch { return false; }
  });

  const isCeo = user?.role === "ceo";
  const [ceoMode, setCeoModeState] = useState<CeoMode | null>(() =>
    isCeo ? loadCeoMode() : null
  );
  const setCeoMode = (m: CeoMode) => { saveCeoMode(m); setCeoModeState(m); };

  // Teacher/CEO: trek filtri; assistant: yo'q
  const effectiveTur = isCeo
    ? ceoMode
    : ((user?.tur as CeoMode | undefined) ?? null);

  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.scrollTo({ top:0 }); setMoreOpen(false); }, [pathname]);

  const toggleCollapsed = () =>
    setCollapsed(c => {
      const n = !c;
      try { localStorage.setItem("afp:admin_sidebar_collapsed", n ? "1" : "0"); } catch {/**/ }
      return n;
    });

  const chatDot = useChatDot();

  const [tgInsets, setTgInsets] = useState({ top:0, bottom:0 });
  useEffect(() => {
    if (!isTelegramMiniApp()) return;
    initTelegramApp();
    const update = () => setTgInsets(getTelegramSafeInsets());
    update();
    const twa = window.Telegram?.WebApp as any;
    twa?.onEvent?.("viewportChanged", update);
    return () => twa?.offEvent?.("viewportChanged", update);
  }, []);

  if (!user) return null;
  if (isCeo && ceoMode === null) return <CeoModePicker onPick={setCeoMode} />;

  const role = user.role as AdminRole;
  const items = adminNavForRole(role, effectiveTur);
  const groups = groupAdminItems(items);

  const modeLabel = isCeo && ceoMode
    ? (ceoMode === "fonetika" ? " · Fonetika" : " · Grammatika")
    : "";
  const roleLabel = ROLE_LABELS[role] + modeLabel;

  const currentMatch = items
    .filter(i => (i.to === "/" ? pathname === "/" : pathname === i.to || pathname.startsWith(i.to + "/")))
    .sort((a, b) => b.to.length - a.to.length)[0];
  const currentTitle = currentMatch?.label ?? "Admin Panel";

  /* ─────────── DESKTOP ─────────── */
  if (!isMobile) {
    const linkStyle = ({ isActive }: { isActive: boolean }): CSSProperties => ({
      display:"flex", alignItems:"center",
      justifyContent: collapsed ? "center" : "flex-start",
      gap:10,
      padding: collapsed ? "10px 0" : "9px 10px",
      borderRadius:8, textDecoration:"none",
      fontSize:13, fontWeight:500,
      color: isActive ? "#fff" : "rgba(255,255,255,.65)",
      background: isActive ? "rgba(106,239,90,.15)" : "transparent",
      borderLeft: isActive ? "2px solid #6AEF5A" : "2px solid transparent",
    });

    const toggleBtn = (
      <button onClick={toggleCollapsed} title={collapsed ? "Yoyish" : "Yig'ish"}
        style={{ background:"rgba(255,255,255,.08)", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.7)", flexShrink:0 }}
      >
        {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
      </button>
    );

    return (
      <div style={{ display:"flex", height:"100dvh", overflow:"hidden" }}>
        <aside style={{ width:collapsed ? 64 : 240, flexShrink:0, background:T.green, position:"relative", display:"flex", flexDirection:"column", transition:"width .2s ease" }}>
          <div style={{ position:"absolute", inset:0, background:T.sheen, pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", height:"100%" }}>

            {/* Logo */}
            <div style={{ padding: collapsed ? "14px 0" : "14px 12px", borderBottom:"1px solid rgba(255,255,255,.1)", display:"flex", flexDirection: collapsed ? "column" : "row", alignItems:"center", gap:9 }}>
              <div style={{ width:30, height:30, borderRadius:8, background:T.gLime, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Shield size={14} color={T.onCta} />
              </div>
              {!collapsed && (
                <div style={{ overflow:"hidden", flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#fff", whiteSpace:"nowrap" }}>Admin Panel</div>
                  <div style={{ fontSize:9, color:T.limeBrt }}>{roleLabel}</div>
                </div>
              )}
              {toggleBtn}
            </div>

            {/* Nav with sections */}
            <nav style={{ flex:1, overflowY:"auto", padding:8 }}>
              {groups.map((group, gi) => (
                <div key={gi} style={{ marginBottom:4 }}>
                  {group.label && !collapsed && (
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", padding:"10px 10px 4px" }}>
                      {group.label}
                    </div>
                  )}
                  {group.items.map(it => (
                    <NavLink key={it.to} to={it.to} end={it.to === "/"} title={collapsed ? it.label : undefined} style={linkStyle}>
                      <div style={{ position:"relative", flexShrink:0, display:"flex" }}>
                        <it.icon size={16} />
                        {it.to === "/chat" && chatDot && (
                          <div style={{ position:"absolute", top:-3, right:-3, width:7, height:7, borderRadius:"50%", background:"#EF4444", border:"1.5px solid "+T.green }} />
                        )}
                      </div>
                      {!collapsed && <span>{it.label}</span>}
                    </NavLink>
                  ))}
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div style={{ padding:10, borderTop:"1px solid rgba(255,255,255,.1)", display:"flex", flexDirection: collapsed ? "column" : "row", alignItems:"center", gap:9 }}>
              <Avatar name={user.ism} src={avatar} />
              {!collapsed && (
                <div style={{ flex:1, overflow:"hidden" }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {user.ism} {user.familya}
                  </div>
                  <div style={{ fontSize:9, color:T.limeBrt }}>{roleLabel}</div>
                </div>
              )}
              {isCeo && (
                <button onClick={() => setCeoModeState(null)} title="Yo'nalishni o'zgartirish"
                  style={{ background:"rgba(255,255,255,.08)", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.7)", flexShrink:0 }}
                >
                  <RefreshCw size={13} />
                </button>
              )}
              <button onClick={logout} title="Chiqish"
                style={{ background:"rgba(255,255,255,.08)", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.7)", flexShrink:0 }}
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </aside>

        <main ref={mainRef} style={{ flex:1, overflowY:"auto", background:T.meshLight }}>
          <Outlet />
        </main>
      </div>
    );
  }

  /* ─────────── MOBILE ─────────── */
  const bottomItems = items.filter(i => i.bottom);
  const moreItems   = items.filter(i => !i.bottom);

  const tabStyle = () =>
    ({ isActive }: { isActive: boolean }): CSSProperties => ({
      flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      gap:2, padding:"7px 2px", textDecoration:"none",
      fontSize:10, fontWeight:500,
      color: isActive ? T.green500 : T.hint,
    });

  const renderTab = (it: NavItem) => (
    <NavLink key={it.to} to={it.to} end={it.to === "/"} style={tabStyle()}>
      <div style={{ position:"relative", display:"flex" }}>
        <it.icon size={20} />
        {it.to === "/chat" && chatDot && (
          <div style={{ position:"absolute", top:-2, right:-2, width:8, height:8, borderRadius:"50%", background:"#EF4444", border:"1.5px solid #fff" }} />
        )}
      </div>
      <span>{it.label}</span>
    </NavLink>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100dvh", overflow:"hidden" }}>
      {/* Header */}
      <header style={{ background:T.green, position:"relative", flexShrink:0 }}>
        <div style={{ position:"absolute", inset:0, background:T.sheen, pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:9, padding:"10px 14px" }}>
          <div style={{ width:28, height:28, borderRadius:8, background:T.gLime, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Shield size={14} color={T.onCta} />
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{currentTitle}</div>
            <div style={{ fontSize:9, color:T.limeBrt }}>{roleLabel}</div>
          </div>
          {isCeo && (
            <button onClick={() => setCeoModeState(null)} title="Yo'nalishni o'zgartirish"
              style={{ background:"rgba(255,255,255,.1)", border:"none", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.8)" }}
            >
              <RefreshCw size={14} />
            </button>
          )}
          <button onClick={logout}
            style={{ background:"rgba(255,255,255,.1)", border:"none", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.8)" }}
          >
            <LogOut size={15} />
          </button>
        </div>
      </header>

      <main ref={mainRef} style={{ flex:1, overflowY:"auto", background:T.meshLight, WebkitOverflowScrolling:"touch" }}>
        <Outlet />
      </main>

      {/* Bottom tab bar */}
      <nav style={{ display:"flex", background:"#fff", borderTop:"1px solid rgba(13,58,26,.1)", flexShrink:0, paddingBottom: tgInsets.bottom > 0 ? tgInsets.bottom : "env(safe-area-inset-bottom)" }}>
        {bottomItems.map(renderTab)}
        {moreItems.length > 0 && (
          <button onClick={() => setMoreOpen(true)}
            style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, padding:"7px 2px", background:"none", border:"none", cursor:"pointer", fontSize:10, fontWeight:500, color:T.hint }}
          >
            <MoreHorizontal size={20} />
            <span>Ko'proq</span>
          </button>
        )}
      </nav>

      {/* More sheet */}
      {moreOpen && (
        <div onClick={() => setMoreOpen(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.4)", zIndex:50, display:"flex", alignItems:"flex-end" }}
        >
          <div onClick={e => e.stopPropagation()}
            style={{ width:"100%", background:"#fff", borderRadius:"16px 16px 0 0", padding:16, paddingBottom: tgInsets.bottom > 0 ? tgInsets.bottom+16 : "calc(16px + env(safe-area-inset-bottom))" }}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <span style={{ fontSize:14, fontWeight:600, color:T.green }}>Ko'proq</span>
              <button onClick={() => setMoreOpen(false)}
                style={{ background:"rgba(13,58,26,.07)", border:"none", borderRadius:8, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", color:T.text2 }}
              >
                <X size={15} />
              </button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {moreItems.map(it => (
                <NavLink key={it.to} to={it.to} onClick={() => setMoreOpen(false)}
                  style={({ isActive }) => ({
                    display:"flex", alignItems:"center", gap:12, padding:"12px 12px",
                    borderRadius:10, textDecoration:"none", fontSize:14, fontWeight:500,
                    color: isActive ? T.green : T.text,
                    background: isActive ? "rgba(46,184,46,.1)" : "rgba(13,58,26,.04)",
                  })}
                >
                  <div style={{ position:"relative", display:"flex", flexShrink:0 }}>
                    <it.icon size={18} />
                    {it.to === "/chat" && chatDot && (
                      <div style={{ position:"absolute", top:-3, right:-3, width:8, height:8, borderRadius:"50%", background:"#EF4444", border:"1.5px solid #fff" }} />
                    )}
                  </div>
                  <span>{it.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
