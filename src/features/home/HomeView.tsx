import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";
import { T } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { PageHeader, Page, Card } from "../../components/ui";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";

function Ring({ pct }: { pct: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return (
    <svg width={128} height={128} viewBox="0 0 128 128">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6AEF5A" />
          <stop offset="100%" stopColor="#1A6A2A" />
        </linearGradient>
      </defs>
      <circle cx={64} cy={64} r={r} fill="none" stroke="rgba(13,58,26,.1)" strokeWidth={12} />
      <circle
        cx={64}
        cy={64}
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 64 64)"
        style={{ transition: "stroke-dashoffset .9s ease" }}
      />
      <text x={64} y={62} textAnchor="middle" style={{ fontSize: 28, fontWeight: 700, fill: T.green }}>
        {pct}%
      </text>
      <text x={64} y={80} textAnchor="middle" style={{ fontSize: 10, fill: T.hint }}>
        umumiy
      </text>
    </svg>
  );
}

function Bar({ label, n, tot }: { label: string; n: number; tot: number }) {
  const pct = Math.round((n / tot) * 100);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: T.text2 }}>{label}</span>
        <span style={{ fontSize: 12, color: T.hint }}>
          {n}/{tot}
        </span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "rgba(13,58,26,.1)", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: T.gLimeH, borderRadius: 4, transition: "width .8s" }} />
      </div>
    </div>
  );
}

export function HomeView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { nazDone, amalDone } = useProgress();

  const nazPass = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const amalDoneCount = Object.keys(amalDone).length;
  const nazPct = Math.round((nazPass / NAZARIY.length) * 100);
  const amalPct = Math.round((amalDoneCount / AMALIY.length) * 100);
  const overall = Math.round((nazPct + amalPct) / 2);

  return (
    <>
      <PageHeader kicker="Xush kelibsiz" title={`Assalomu alaykum, ${user?.ism ?? ""}!`} sub="Arab Fonetika Kursi" />
      <Page>
        {/* Umumiy progress */}
        <Card style={{ padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <Ring pct={overall} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <Bar label="Nazariy (o'tilgan)" n={nazPass} tot={NAZARIY.length} />
            <Bar label="Amaliy (bajarilgan)" n={amalDoneCount} tot={AMALIY.length} />
          </div>
        </Card>

        {/* Davom ettirish */}
        <button
          onClick={() => navigate("/dars")}
          style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 14, padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 10px rgba(46,184,46,.3)" }}
        >
          <GraduationCap size={24} />
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Darslarni davom ettirish</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Nazariy va amaliy darslar</div>
          </div>
          <ArrowRight size={20} />
        </button>
      </Page>
    </>
  );
}
