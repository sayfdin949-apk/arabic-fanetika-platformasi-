import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, ArrowRight, Star, Users, ClipboardCheck, BarChart2, Flame, ScanLine, Clock, UserCog, LayersIcon, PlayCircle, Library, ClipboardList, Sparkles, Mic2, Globe, Mic, Baby, BookOpenText, Gamepad2, Target, GraduationCap } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { GRAM_DARSLAR } from "../../content/gramContent";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";
import { useCoins } from "../../context/CoinContext";
import { useAssistant } from "../assistant/AssistantContext";
import { store } from "../../lib/storage";
import type { DoneMap } from "../progress/ProgressContext";
import { loadDaraja, DARAJA_ARABIC } from "../../content/darajaTest";

function Ring({ pct }: { pct: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return (
    <svg width={112} height={112} viewBox="0 0 112 112">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6AEF5A" />
          <stop offset="100%" stopColor="#2EB82E" />
        </linearGradient>
      </defs>
      <circle cx={56} cy={56} r={r} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth={10} />
      <circle
        cx={56} cy={56} r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 56 56)"
        style={{ transition: "stroke-dashoffset .9s ease" }}
      />
      <text x={56} y={51} textAnchor="middle" style={{ fontSize: 24, fontWeight: 800, fill: "#fff" }}>
        {pct}%
      </text>
      <text x={56} y={67} textAnchor="middle" style={{ fontSize: 10, fill: "rgba(255,255,255,.65)" }}>
        umumiy
      </text>
    </svg>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof BookOpen; label: string; value: string; color: string }) {
  return (
    <div style={{
      flex: 1,
      background: "rgba(255,255,255,.1)",
      borderRadius: 14,
      padding: "13px 12px",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(255,255,255,.12)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <Icon size={14} color={color} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{value}</div>
    </div>
  );
}

function ProgressBar({ label, n, tot }: { label: string; n: number; tot: number }) {
  const pct = Math.round((n / tot) * 100);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: T.text2 }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: pct >= 80 ? T.lime : T.hint }}>{n}/{tot}</span>
      </div>
      <div style={{ height: 7, borderRadius: 4, background: "rgba(13,58,26,.1)", overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          borderRadius: 4,
          background: pct >= 80 ? T.gLime : T.gGreen,
          transition: "width .8s ease",
        }} />
      </div>
    </div>
  );
}

const TIPS = [
  "Har kuni 20 daqiqa mashq qiling",
  "Arabcha harflarni ovoz chiqarib o'qing",
  "Yangi so'zlarni takrorlang",
  "Savol-javob testlarini hal qiling",
];

function TeacherHome() {
  const navigate = useNavigate();
  const { user, users } = useAuth();
  const isCeo = user?.role === "ceo";
  const students = useMemo(() => users.filter((u) => u.role === "student"), [users]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };

  const [todayDavomat, setTodayDavomat] = useState<Record<string, string>>({});
  const [avgNaz, setAvgNaz] = useState(0);
  const [avgAmal, setAvgAmal] = useState(0);

  useEffect(() => {
    (async () => {
      const dav = await store.get<Record<string, string>>(`davomat_${todayISO()}`);
      setTodayDavomat(dav ?? {});

      if (students.length === 0) return;
      let totalNaz = 0, totalAmal = 0;
      for (const s of students) {
        const naz = await store.get<DoneMap>(`naz_done_${s.id}`);
        const amal = await store.get<DoneMap>(`amal_done_${s.id}`);
        const nazPassed = naz ? Object.values(naz).filter((d) => d.pct >= 80).length : 0;
        const amalDone = amal ? Object.keys(amal).length : 0;
        totalNaz += Math.round((nazPassed / NAZARIY.length) * 100);
        totalAmal += Math.round((amalDone / AMALIY.length) * 100);
      }
      setAvgNaz(Math.round(totalNaz / students.length));
      setAvgAmal(Math.round(totalAmal / students.length));
    })();
  }, [students]);

  const keldi = students.filter((s) => todayDavomat[s.id] === "keldi").length;
  const davPct = students.length > 0 ? Math.round((keldi / students.length) * 100) : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 17 ? "Xayrli kun" : "Xayrli kech";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "22px 20px 24px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -10, right: -10, fontFamily: AR, fontSize: 80, color: "rgba(255,255,255,.04)", lineHeight: 1, pointerEvents: "none" }}>أ</div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>{greeting}</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{user?.ism}! 👋</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 18 }}>{isCeo ? "Boshqaruv paneli" : "O'qituvchi paneli"}</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: Users, label: "O'quvchilar", value: `${students.length}` },
              { icon: ClipboardCheck, label: "Bugun keldi", value: `${keldi}/${students.length}` },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,.1)", borderRadius: 14, padding: "13px 12px", border: "1px solid rgba(255,255,255,.12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <s.icon size={14} color={T.limeBrt} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Bugungi davomat */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>Bugungi davomat</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: davPct >= 75 ? T.lime : "#FFA500" }}>{davPct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "rgba(13,58,26,.08)", overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", width: `${davPct}%`, borderRadius: 4, background: davPct >= 75 ? T.gLimeH : "linear-gradient(90deg,#FFA500,#FF8C00)", transition: "width .8s" }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {students.map((s) => {
              const h = todayDavomat[s.id];
              return (
                <div key={s.id} title={`${s.ism} ${s.familya}`} style={{ width: 32, height: 32, borderRadius: "50%", background: h === "keldi" ? T.gLime : h === "kelmadi" ? "rgba(230,0,35,.15)" : "rgba(13,58,26,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: h === "kelmadi" ? T.red : T.onCta }}>
                  {s.ism[0]?.toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sinf o'rtacha progressi */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>Sinf o'rtacha progressi</span>
          </div>
          {[
            { label: "Nazariy darslar (o'rtacha)", pct: avgNaz },
            { label: "Amaliy mashqlar (o'rtacha)", pct: avgAmal },
          ].map((s) => (
            <div key={s.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: T.text2 }}>{s.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.pct >= 80 ? T.lime : T.hint }}>{s.pct}%</span>
              </div>
              <div style={{ height: 7, borderRadius: 4, background: "rgba(13,58,26,.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, borderRadius: 4, background: s.pct >= 80 ? T.gLime : T.gGreen, transition: "width .8s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        {[
          { label: "Davomat belgilash", sub: "Bugungi ro'yxat", icon: ClipboardCheck, to: "/davomat" },
          { label: "O'quvchilar", sub: "Progress va ma'lumotlar", icon: Users, to: "/oquvchilar" },
          { label: "Statistika", sub: "Batafsil tahlil", icon: BarChart2, to: "/statistika" },
          ...(isCeo
            ? [
                { label: "Guruhlar", sub: "Guruh yaratish va boshqarish", icon: LayersIcon, to: "/guruhlar" },
                { label: "O'qituvchilar", sub: "O'qituvchi va yordamchi ustozlar", icon: UserCog, to: "/ustozlar" },
              ]
            : []),
        ].map((a) => (
          <button key={a.to} onClick={() => navigate(a.to)} style={{ width: "100%", background: "#fff", border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04)", borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <a.icon size={20} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{a.label}</div>
              <div style={{ fontSize: 12, color: T.text2, marginTop: 1 }}>{a.sub}</div>
            </div>
            <ArrowRight size={18} color={T.hint} />
          </button>
        ))}
      </div>
    </div>
  );
}

function fmtBooking(iso: string) {
  return new Date(iso).toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function AssistantHome() {
  const navigate = useNavigate();
  const { user, users } = useAuth();
  const { bookings } = useAssistant();

  const upcoming = bookings
    .filter((b) => b.assistantId === user?.id && b.status === "scheduled")
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  const nameOf = (id: string) => {
    const s = users.find((u) => u.id === id);
    return s ? `${s.ism} ${s.familya}` : "Noma'lum";
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 17 ? "Xayrli kun" : "Xayrli kech";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "22px 20px 24px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>{greeting}</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{user?.ism}! 👋</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 18 }}>Yordamchi ustoz paneli</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,.1)", borderRadius: 14, padding: "13px 12px", border: "1px solid rgba(255,255,255,.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <Star size={14} color="#eab308" />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>Reyting</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{user?.assistantRating ?? 100}</div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,.1)", borderRadius: 14, padding: "13px 12px", border: "1px solid rgba(255,255,255,.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <Clock size={14} color={T.limeBrt} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>Belgilangan</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{upcoming.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        <button onClick={() => navigate("/skaner")} style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(46,184,46,.35)" }}>
          <ScanLine size={18} /> Skanerni ochish
        </button>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>Belgilangan darslar</span>
          </div>
          {upcoming.length === 0 ? (
            <div style={{ fontSize: 12, color: T.hint, textAlign: "center", padding: "12px 0" }}>Hozircha belgilangan dars yo'q</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {upcoming.map((b) => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(13,58,26,.06)" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                    {nameOf(b.studentId)[0]?.toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.green }}>{nameOf(b.studentId)}</div>
                  </div>
                  <div style={{ fontSize: 11, color: T.hint }}>{fmtBooking(b.scheduledAt)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MODULLAR = [
  { to: "/grammatika",     icon: BookOpenText, label: "Grammatika",       sub: "Qoida va mashqlar",      color: "#7C3AED", tur: "grammatika" as const },
  { to: "/juftlar",        icon: Layers,       label: "Minimal Juftlar",  sub: "Fonetik farqlar",        color: "#0891B2", tur: "fonetika" as const },
  { to: "/dastur",         icon: BookOpen,     label: "Kurs dasturi",     sub: "Haftalik jadval",        color: "#059669", tur: "fonetika" as const },
  { to: "/video",          icon: PlayCircle,   label: "Video darslar",    sub: "17 ta dars",             color: "#DC2626" },
  { to: "/kitobxona",      icon: Library,      label: "Kitobxona",        sub: "5 ta kitob",             color: "#059669" },
  { to: "/mocktest",       icon: ClipboardList,label: "Mock test",        sub: "Bilimingizni sinang",    color: "#CA8A04", tur: "grammatika" as const },
  { to: "/ovoz",           icon: Mic,          label: "Ovoz yozish",      sub: "Talaffuz mashqlari",     color: "#0891B2", tur: "grammatika" as const },
  { to: "/matn-tahlil",    icon: Sparkles,     label: "Matn tahlili",     sub: "Arabcha matn tekshiruv", color: "#9333EA", tur: "grammatika" as const },
  { to: "/oyun",           icon: Gamepad2,     label: "O'yin",            sub: "O'ynab o'rgan",          color: "#2563EB" },
  { to: "/speaking-club",  icon: Mic2,         label: "Speaking Club",    sub: "Jonli amaliyot",         color: "#0E7490", tur: "grammatika" as const },
  { to: "/mehmon-ustozlar",icon: Globe,        label: "Mehmon ustozlar",  sub: "Mutaxassis darslar",     color: "#D97706", tur: "grammatika" as const },
  { to: "/ota-ona",        icon: Baby,         label: "Ota-ona paneli",   sub: "Farzand progressi",      color: "#BE185D" },
];

export function HomeView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { nazDone, amalDone, streak } = useProgress();
  const { coins } = useCoins();

  if (user?.role === "teacher" || user?.role === "ceo") return <TeacherHome />;
  if (user?.role === "assistant") return <AssistantHome />;

  const uid = user?.id ?? "";
  const isGram = user?.tur === "grammatika";
  const currentDaraja = loadDaraja(uid);

  // Fonetika stats
  const nazPass = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const amalDoneCount = Object.keys(amalDone).length;
  const nazPct = Math.round((nazPass / NAZARIY.length) * 100);
  const amalPct = Math.round((amalDoneCount / AMALIY.length) * 100);

  // Grammatika stats
  const gramDoneMap: Record<number, { pct: number; sana: string }> = (() => {
    try {
      const raw = localStorage.getItem(`afp:gram_done_${uid}`);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  })();
  const gramPassed = GRAM_DARSLAR.filter((d) => (gramDoneMap[d.id]?.pct ?? 0) >= 80).length;
  const gramPct = Math.round((gramPassed / GRAM_DARSLAR.length) * 100);

  const overall = isGram ? gramPct : Math.round((nazPct + amalPct) / 2);

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const tip = TIPS[dayOfYear % TIPS.length];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 17 ? "Xayrli kun" : "Xayrli kech";

  const todayStr = new Date().toLocaleDateString("uz");
  const hasLessonToday = isGram
    ? Object.values(gramDoneMap).some((d) => d.sana === todayStr)
    : Object.values(nazDone).some((d) => d.sana === todayStr) || Object.values(amalDone).some((d) => d.sana === todayStr);

  const continueRoute = isGram ? "/grammatika" : "/dars";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero banner */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "22px 20px 24px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />

        {/* Arabic decorative text */}
        <div style={{
          position: "absolute", top: -10, right: -10,
          fontFamily: AR, fontSize: 80, color: "rgba(255,255,255,.04)",
          lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>
          أ
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Greeting row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>
                {greeting}
              </div>
              <div style={{ fontSize: 21, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>
                {user?.ism}! 👋
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>
                {isGram ? "Arab Grammatika Kursi" : "Arab Fonetika Kursi"}
              </div>
            </div>
            <Ring pct={overall} />
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {isGram ? (
              <>
                <StatCard icon={GraduationCap} label="Darslar" value={`${gramPassed}/${GRAM_DARSLAR.length}`} color={T.limeBrt} />
                <StatCard icon={BookOpen} label="Tugatilgan" value={`${gramPct}%`} color={T.limeBrt} />
              </>
            ) : (
              <>
                <StatCard icon={BookOpen} label="Nazariy" value={`${nazPass}/${NAZARIY.length}`} color={T.limeBrt} />
                <StatCard icon={Layers} label="Amaliy" value={`${amalDoneCount}/${AMALIY.length}`} color={T.limeBrt} />
              </>
            )}
            <StatCard icon={Flame} label="Streak" value={`${streak.days} kun`} color="#FF6B35" />
            <StatCard icon={Star} label="Tanga" value={`${coins}`} color="#EAB308" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 28px" }}>
        {/* Progress detail card */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid rgba(13,58,26,.08)",
          boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)",
          padding: 18,
          marginBottom: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>Kurs Progressi</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {isGram ? (
              <ProgressBar label="Grammatika darslar" n={gramPassed} tot={GRAM_DARSLAR.length} />
            ) : (
              <>
                <ProgressBar label="Nazariy darslar" n={nazPass} tot={NAZARIY.length} />
                <ProgressBar label="Amaliy mashqlar" n={amalDoneCount} tot={AMALIY.length} />
              </>
            )}
          </div>
        </div>

        {/* Daraja aniqlash */}
        {currentDaraja ? (
          <button
            onClick={() => navigate("/daraja-test")}
            style={{
              width: "100%", background: T.gGreen, border: "none", borderRadius: 14,
              padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
              marginBottom: 14, boxShadow: "0 4px 14px rgba(13,58,26,.2)",
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Target size={20} color="#fff" />
            </div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginBottom: 2 }}>Darajangiz</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                {currentDaraja} — {DARAJA_ARABIC[currentDaraja]?.uz}
              </div>
            </div>
            <div style={{ color: "rgba(255,255,255,.65)", fontFamily: "'Amiri', serif", fontSize: 16 }}>
              {DARAJA_ARABIC[currentDaraja]?.ar}
            </div>
          </button>
        ) : (
          <button
            onClick={() => navigate("/daraja-test")}
            style={{
              width: "100%", background: "#fff", border: "2px dashed rgba(13,58,26,.2)", borderRadius: 14,
              padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
              marginBottom: 14,
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(13,58,26,.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Target size={20} color={T.green} />
            </div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Darajangizni aniqlang</div>
              <div style={{ fontSize: 11, color: T.hint, marginTop: 1 }}>~2 daqiqa · 8 savol</div>
            </div>
            <ArrowRight size={16} color={T.hint} />
          </button>
        )}

        {/* Continue button */}
        <button
          onClick={() => navigate(continueRoute)}
          style={{
            width: "100%",
            background: T.gLime,
            color: T.onCta,
            border: "none",
            borderRadius: 14,
            padding: "16px 18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 4px 14px rgba(46,184,46,.35)",
            marginBottom: 14,
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {isGram ? <GraduationCap size={22} color={T.onCta} /> : <BookOpen size={22} color={T.onCta} />}
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Darslarni davom ettirish</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 1 }}>
              {isGram ? "Grammatika darslar va mashqlar" : "Nazariy va amaliy mashqlar"}
            </div>
          </div>
          <ArrowRight size={20} />
        </button>

        {/* Barcha modullar */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>Barcha modullar</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {MODULLAR.filter((m) => !m.tur || !user?.tur || m.tur === user.tur).map((m) => (
              <button
                key={m.to}
                onClick={() => navigate(m.to)}
                style={{ background: "#fff", border: "1px solid rgba(13,58,26,.08)", borderRadius: 14, padding: "12px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left", boxShadow: "0 1px 4px rgba(13,58,26,.06)" }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 11, background: `${m.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <m.icon size={18} color={m.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: T.hint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Streak ogohlantirish */}
        {!hasLessonToday && streak.days > 0 && (
          <div
            onClick={() => navigate(continueRoute)}
            style={{ background: "rgba(255,107,53,.08)", border: "1px solid rgba(255,107,53,.25)", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10, alignItems: "center", cursor: "pointer", marginBottom: 0 }}
          >
            <Flame size={20} color="#FF6B35" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#FF6B35", marginBottom: 2 }}>
                BUGUN HALI DARS QILMADINGIZ
              </div>
              <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.4 }}>
                {streak.days}-kunlik streakingizni saqlash uchun hozir bir dars o'ting.
              </div>
            </div>
            <ArrowRight size={16} color="#FF6B35" style={{ flexShrink: 0 }} />
          </div>
        )}

        {/* Daily tip */}
        <div style={{
          background: "rgba(46,184,46,.07)",
          border: "1px solid rgba(46,184,46,.18)",
          borderRadius: 12,
          padding: "12px 14px",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}>
          <Star size={15} color={T.lime} style={{ marginTop: 1, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.lime, marginBottom: 3 }}>KUNLIK MASLAHAT</div>
            <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
