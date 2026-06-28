import { useState, useRef, useEffect, type CSSProperties } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, LogOut, MoreHorizontal, X, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { T } from "../theme/tokens";
import { useAuth } from "../auth/AuthContext";
import { useProgress } from "../features/progress/ProgressContext";
import { navForRole, type NavItem } from "./nav";
import { useMediaQuery } from "../lib/useMediaQuery";

function useStudentGuard(isStudent: boolean) {
  useEffect(() => {
    if (!isStudent) return;

    const stop = (e: Event) => e.preventDefault();

    const blockKeys = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        e.key === "PrintScreen" ||
        ((e.ctrlKey || e.metaKey) && ["c", "x", "a", "s", "p", "u"].includes(k))
      ) {
        e.preventDefault();
      }
    };

    // Inject global no-select style (exempts inputs/textareas)
    const style = document.createElement("style");
    style.id = "afp-guard";
    style.textContent = `
      body.afp-guarded *:not(input):not(textarea):not(select) {
        -webkit-user-select: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add("afp-guarded");

    document.addEventListener("copy", stop);
    document.addEventListener("cut", stop);
    document.addEventListener("contextmenu", stop);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.body.classList.remove("afp-guarded");
      document.getElementById("afp-guard")?.remove();
      document.removeEventListener("copy", stop);
      document.removeEventListener("cut", stop);
      document.removeEventListener("contextmenu", stop);
      document.removeEventListener("keydown", blockKeys);
    };
  }, [isStudent]);
}

function Watermark({ name }: { name: string }) {
  const tiles = Array.from({ length: 24 });
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        pointerEvents: "none", overflow: "hidden",
        opacity: 0.055,
      }}
      aria-hidden="true"
    >
      {tiles.map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i % 4) * 27 - 5}%`,
            top: `${Math.floor(i / 4) * 20 - 3}%`,
            transform: "rotate(-32deg)",
            fontSize: 13,
            fontWeight: 700,
            whiteSpace: "nowrap",
            color: "#0d3a1a",
            userSelect: "none",
          }}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

function Avatar({ name, src, size = 30 }: { name: string; src?: string | null; size?: number }) {
  if (src) {
    return <img src={src} alt="" style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />;
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: T.gLime,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.42,
        fontWeight: 700,
        color: T.onCta,
        flexShrink: 0,
      }}
    >
      {name[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

export function AppShell() {
  const { user, avatar, logout } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [moreOpen, setMoreOpen] = useState(false);
  const isStudent = user?.role === "student";
  useStudentGuard(isStudent);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("afp:sidebar_collapsed") === "1";
    } catch {
      return false;
    }
  });
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Sahifa o'zgarganda kontentni yuqoriga scroll qilish
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    setMoreOpen(false);
  }, [pathname]);

  const toggleCollapsed = () =>
    setCollapsed((c) => {
      const n = !c;
      try {
        localStorage.setItem("afp:sidebar_collapsed", n ? "1" : "0");
      } catch {
        /* ignore */
      }
      return n;
    });

  const { streak } = useProgress();

  if (!user) return null;
  const items = navForRole(user.role);
  const roleLabel = user.role === "teacher" ? "O'qituvchi" : "O'quvchi";

  // Joriy bo'lim nomi (mobil header uchun)
  const currentMatch = items
    .filter((i) => (i.to === "/" ? pathname === "/" : pathname === i.to || pathname.startsWith(i.to + "/")))
    .sort((a, b) => b.to.length - a.to.length)[0];
  const currentTitle = currentMatch?.label ?? "Fonetika Kursi";

  /* ───────── DESKTOP ───────── */
  if (!isMobile) {
    const linkStyle =
      ({ isActive }: { isActive: boolean }): CSSProperties => ({
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: 10,
        padding: collapsed ? "10px 0" : "9px 10px",
        borderRadius: 8,
        textDecoration: "none",
        fontSize: 13,
        fontWeight: 500,
        color: isActive ? "#fff" : "rgba(255,255,255,.65)",
        background: isActive ? "rgba(106,239,90,.15)" : "transparent",
        borderLeft: isActive ? "2px solid #6AEF5A" : "2px solid transparent",
      });

    const toggleBtn = (
      <button
        onClick={toggleCollapsed}
        title={collapsed ? "Yoyish" : "Yig'ish"}
        aria-label={collapsed ? "Panelni yoyish" : "Panelni yig'ish"}
        style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.7)", flexShrink: 0 }}
      >
        {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
      </button>
    );

    return (
      <div style={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
        <aside style={{ width: collapsed ? 64 : 240, flexShrink: 0, background: T.green, position: "relative", display: "flex", flexDirection: "column", transition: "width .2s ease" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ padding: collapsed ? "14px 0" : "14px 12px", borderBottom: "1px solid rgba(255,255,255,.1)", display: "flex", flexDirection: collapsed ? "column" : "row", alignItems: "center", gap: 9 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BookOpen size={15} color={T.onCta} />
              </div>
              {!collapsed && (
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>Fonetika Kursi</div>
                  <div style={{ fontSize: 9, color: T.limeBrt }}>{roleLabel}</div>
                </div>
              )}
              {toggleBtn}
            </div>

            <nav style={{ flex: 1, overflowY: "auto", padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
              {items.map((it) => (
                <NavLink key={it.to} to={it.to} end={it.to === "/"} title={collapsed ? it.label : undefined} style={linkStyle}>
                  <it.icon size={16} style={{ flexShrink: 0 }} />
                  {!collapsed && <span>{it.label}</span>}
                </NavLink>
              ))}
            </nav>

            <div style={{ padding: 10, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", flexDirection: collapsed ? "column" : "row", alignItems: "center", gap: 9 }}>
              <Avatar name={user.ism} src={avatar} />
              {!collapsed && (
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.ism} {user.familya}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                    <span style={{ fontSize: 12 }}>🔥</span>
                    <span style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600 }}>{streak.days} kun streak</span>
                  </div>
                </div>
              )}
              {collapsed && (
                <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textAlign: "center" }}>🔥{streak.days}</div>
              )}
              <button onClick={logout} title="Chiqish" aria-label="Chiqish" style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.7)", flexShrink: 0 }}>
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </aside>

        <main ref={mainRef} style={{ flex: 1, overflowY: "auto", background: T.meshLight }}>
          <Outlet />
        </main>
        {isStudent && <Watermark name={`${user.ism} ${user.familya}`} />}
      </div>
    );
  }

  /* ───────── MOBILE ───────── */
  const bottomItems = items.filter((i) => i.bottom);
  const moreItems = items.filter((i) => !i.bottom);

  const tabStyle =
    () =>
    ({ isActive }: { isActive: boolean }): CSSProperties => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      padding: "7px 2px",
      textDecoration: "none",
      fontSize: 10,
      fontWeight: 500,
      color: isActive ? T.green500 : T.hint,
    });

  const renderTab = (it: NavItem) => (
    <NavLink key={it.to} to={it.to} end={it.to === "/"} style={tabStyle()}>
      <it.icon size={20} />
      <span>{it.label}</span>
    </NavLink>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", overflow: "hidden" }}>
      {/* Top header */}
      <header style={{ background: T.green, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 9, padding: "10px 14px" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={14} color={T.onCta} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentTitle}</div>
            <div style={{ fontSize: 9, color: T.limeBrt }}>{roleLabel}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "4px 8px", flexShrink: 0 }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>🔥</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{streak.days}</span>
          </div>
          <button onClick={logout} style={{ background: "rgba(255,255,255,.1)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.8)" }}>
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", background: T.meshLight, WebkitOverflowScrolling: "touch" }}>
        <Outlet />
      </main>

      {isStudent && <Watermark name={`${user.ism} ${user.familya}`} />}

      {/* Bottom tab bar */}
      <nav style={{ display: "flex", background: "#fff", borderTop: "1px solid rgba(13,58,26,.1)", flexShrink: 0, paddingBottom: "env(safe-area-inset-bottom)" }}>
        {bottomItems.map(renderTab)}
        {moreItems.length > 0 && (
          <button
            onClick={() => setMoreOpen(true)}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: "7px 2px", background: "none", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 500, color: T.hint }}
          >
            <MoreHorizontal size={20} />
            <span>Ko'proq</span>
          </button>
        )}
      </nav>

      {/* More sheet */}
      {moreOpen && (
        <div onClick={() => setMoreOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 50, display: "flex", alignItems: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", background: "#fff", borderRadius: "16px 16px 0 0", padding: 16, paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.green }}>Ko'proq</span>
              <button onClick={() => setMoreOpen(false)} style={{ background: "rgba(13,58,26,.07)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: T.text2 }}>
                <X size={15} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {moreItems.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => setMoreOpen(false)}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 12px",
                    borderRadius: 10,
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    color: isActive ? T.green : T.text,
                    background: isActive ? "rgba(46,184,46,.1)" : "rgba(13,58,26,.04)",
                  })}
                >
                  <it.icon size={18} />
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
