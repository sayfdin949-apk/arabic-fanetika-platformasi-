import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, ArrowRight, Star } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";

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

export function HomeView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { nazDone, amalDone } = useProgress();

  const nazPass = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const amalDoneCount = Object.keys(amalDone).length;
  const nazPct = Math.round((nazPass / NAZARIY.length) * 100);
  const amalPct = Math.round((amalDoneCount / AMALIY.length) * 100);
  const overall = Math.round((nazPct + amalPct) / 2);

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const tip = TIPS[dayOfYear % TIPS.length];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 17 ? "Xayrli kun" : "Xayrli kech";

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
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>Arab Fonetika Kursi</div>
            </div>
            <Ring pct={overall} />
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <StatCard icon={BookOpen} label="Nazariy" value={`${nazPass}/${NAZARIY.length}`} color={T.limeBrt} />
            <StatCard icon={Layers} label="Amaliy" value={`${amalDoneCount}/${AMALIY.length}`} color={T.limeBrt} />
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
            <ProgressBar label="Nazariy darslar" n={nazPass} tot={NAZARIY.length} />
            <ProgressBar label="Amaliy mashqlar" n={amalDoneCount} tot={AMALIY.length} />
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={() => navigate("/dars")}
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
            <BookOpen size={22} color={T.onCta} />
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Darslarni davom ettirish</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 1 }}>Nazariy va amaliy mashqlar</div>
          </div>
          <ArrowRight size={20} />
        </button>

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
