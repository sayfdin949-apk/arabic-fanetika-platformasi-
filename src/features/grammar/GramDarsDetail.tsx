import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Headphones, PenLine, FlaskConical, CheckCircle2, XCircle, Coins } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { GRAM_DARSLAR } from "../../content/gramContent";
import { useAuth } from "../../auth/AuthContext";
import { useCoins } from "../../context/CoinContext";

type Phase = "qoida" | "qiroa" | "istima" | "kitoba" | "test";

const PHASES: { k: Phase; label: string; icon: typeof BookOpen }[] = [
  { k: "qoida",  label: "Qoida",   icon: BookOpen },
  { k: "qiroa",  label: "Qiro'a",  icon: BookOpen },
  { k: "istima", label: "Istima",  icon: Headphones },
  { k: "kitoba", label: "Kitoba",  icon: PenLine },
  { k: "test",   label: "Test",    icon: FlaskConical },
];

const GRAM_DONE_KEY = (uid: string) => `afp:gram_done_${uid}`;

interface DoneEntry { pct: number; sana: string; }

function loadDone(uid: string): Record<number, DoneEntry> {
  try {
    const raw = localStorage.getItem(GRAM_DONE_KEY(uid));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveDone(uid: string, id: number, entry: DoneEntry) {
  try {
    const all = loadDone(uid);
    all[id] = entry;
    localStorage.setItem(GRAM_DONE_KEY(uid), JSON.stringify(all));
  } catch { /* ignore */ }
}

export function GramDarsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { coins, addCoins } = useCoins();
  const dars = GRAM_DARSLAR.find((d) => d.id === Number(id));

  const [phase, setPhase] = useState<Phase>("qoida");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [coinEarned, setCoinEarned] = useState(false);

  useEffect(() => {
    setPhase("qoida");
    setAnswers({});
    setSubmitted(false);
    setCoinEarned(false);
  }, [id]);

  if (!dars) {
    return <div style={{ padding: 24, color: T.hint, textAlign: "center" }}>Dars topilmadi</div>;
  }

  const score = submitted
    ? dars.test.filter((q, i) => answers[i] === q.togri).length
    : 0;
  const pct = submitted ? Math.round((score / dars.test.length) * 100) : 0;

  const handleSubmit = () => {
    if (Object.keys(answers).length < dars.test.length) return;
    setSubmitted(true);
    const sc = dars.test.filter((q, i) => answers[i] === q.togri).length;
    const p = Math.round((sc / dars.test.length) * 100);
    if (user) {
      saveDone(user.id, dars.id, { pct: p, sana: new Date().toLocaleDateString("uz") });
      if (p >= 80 && !coinEarned) {
        addCoins(10);
        setCoinEarned(true);
      }
    }
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${dars.rang} 0%, ${dars.rang}cc 100%)`, padding: "14px 16px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ArrowLeft size={16} color="#fff" />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>
                {dars.daraja} · {dars.icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{dars.nomi}</div>
            </div>
            {/* Coin display */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,.15)", borderRadius: 8, padding: "4px 10px" }}>
              <Coins size={14} color="#FCD34D" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{coins}</span>
            </div>
          </div>

          {/* Phase tabs */}
          <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
            {PHASES.map(({ k, label, icon: Icon }) => (
              <button
                key={k}
                onClick={() => { setPhase(k); if (k === "test") { setAnswers({}); setSubmitted(false); setCoinEarned(false); } }}
                style={{
                  flexShrink: 0,
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "6px 11px", borderRadius: 20, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600,
                  background: phase === k ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.18)",
                  color: phase === k ? dars.rang : "rgba(255,255,255,.85)",
                  transition: "background .15s",
                }}
              >
                <Icon size={11} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>

        {/* ── QOIDA ── */}
        {phase === "qoida" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {dars.qoida.map((q, qi) => (
              <div key={qi} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", overflow: "hidden", boxShadow: "0 1px 4px rgba(13,58,26,.05)" }}>
                <div style={{ padding: "12px 14px", background: "rgba(13,58,26,.03)", borderBottom: "1px solid rgba(13,58,26,.06)", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 4, height: 16, borderRadius: 2, background: dars.rang }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{q.sarlavha}</span>
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <p style={{ fontSize: 13, color: T.text, lineHeight: 1.6, margin: "0 0 12px" }}>{q.tavsif}</p>

                  {q.jadval && q.jadval.length > 0 && (
                    <div style={{ overflowX: "auto", marginBottom: 10 }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                        <thead>
                          <tr>
                            {["Arabcha", "O'qilishi", "Tarjima", "Izoh"].map((h) => (
                              <th key={h} style={{ padding: "6px 10px", background: "rgba(13,58,26,.06)", color: T.text2, fontWeight: 600, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {q.jadval.map((row, ri) => (
                            <tr key={ri} style={{ borderBottom: "1px solid rgba(13,58,26,.05)" }}>
                              <td style={{ padding: "8px 10px", fontFamily: AR, fontSize: 18, textAlign: "right", direction: "rtl", color: T.green }}>{row.arabcha}</td>
                              <td style={{ padding: "8px 10px", color: T.text2, fontStyle: "italic" }}>{row.oqilishi}</td>
                              <td style={{ padding: "8px 10px", color: T.text }}>{row.tarjima}</td>
                              <td style={{ padding: "8px 10px", color: T.hint, fontSize: 11 }}>{row.izoh ?? ""}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {q.misol && q.misol.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {q.misol.map((m, mi) => (
                        <div key={mi} style={{ fontSize: 12, color: T.text2, padding: "4px 10px", background: "rgba(13,58,26,.04)", borderRadius: 6, borderLeft: `3px solid ${dars.rang}` }}>
                          {m}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── QIRO'A & ISTIMA ── */}
        {(phase === "qiroa" || phase === "istima") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {phase === "istima" && (
              <div style={{ background: "rgba(8,145,178,.07)", border: "1px solid rgba(8,145,178,.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#0891B2", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Headphones size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>Har bir so'zni yoki jumlani ovoz chiqarib o'qing va talaffuz qilishni mashq qiling.</span>
              </div>
            )}
            {(phase === "qiroa" ? dars.qiroa : dars.istima).map((m, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px", boxShadow: "0 1px 3px rgba(13,58,26,.04)" }}>
                <div style={{ fontFamily: AR, fontSize: 24, textAlign: "right", direction: "rtl", color: T.green, marginBottom: 6, lineHeight: 1.4 }}>
                  {m.arabcha}
                </div>
                <div style={{ fontSize: 13, fontStyle: "italic", color: T.text2, marginBottom: 4 }}>{m.oqilishi}</div>
                <div style={{ fontSize: 13, color: T.text }}>{m.tarjima}</div>
                {m.izoh && (
                  <div style={{ fontSize: 11, color: T.hint, marginTop: 4, padding: "3px 8px", background: "rgba(13,58,26,.04)", borderRadius: 5, display: "inline-block" }}>
                    {m.izoh}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── KITOBA ── */}
        {phase === "kitoba" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(13,58,26,.06)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: T.text2 }}>
              Har bir topshiriqni daftaringizga yozib bajarib ko'ring.
            </div>
            {dars.kitoba.map((k, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: dars.rang, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 11, fontWeight: 700, marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.text, lineHeight: 1.4, marginBottom: 6 }}>{k.topshiriq}</div>
                    {k.misol && (
                      <div style={{ fontSize: 12, color: T.hint, fontStyle: "italic", padding: "5px 10px", background: "rgba(13,58,26,.04)", borderRadius: 6 }}>
                        {k.misol}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TEST ── */}
        {phase === "test" && !submitted && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 12, color: T.hint }}>
              {dars.test.length} ta savol — 80% yoki undan ko'p to'g'ri javob uchun +10 coin
            </div>
            {dars.test.map((q, qi) => (
              <div key={qi} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>
                  <span style={{ color: dars.rang, marginRight: 6 }}>{qi + 1}.</span>
                  {q.savol}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {q.variantlar.map((v, vi) => (
                    <button
                      key={vi}
                      onClick={() => setAnswers((a) => ({ ...a, [qi]: vi }))}
                      style={{
                        padding: "9px 12px",
                        borderRadius: 8,
                        border: answers[qi] === vi ? `2px solid ${dars.rang}` : "1px solid rgba(13,58,26,.12)",
                        background: answers[qi] === vi ? `${dars.rang}15` : "transparent",
                        cursor: "pointer", textAlign: "left", fontSize: 13,
                        color: answers[qi] === vi ? dars.rang : T.text,
                        fontWeight: answers[qi] === vi ? 600 : 400,
                        transition: "all .12s",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < dars.test.length}
              style={{
                padding: "14px", borderRadius: 12, border: "none", cursor: "pointer",
                background: Object.keys(answers).length < dars.test.length ? "rgba(13,58,26,.15)" : T.gLime,
                color: Object.keys(answers).length < dars.test.length ? T.hint : T.onCta,
                fontSize: 14, fontWeight: 700,
                boxShadow: Object.keys(answers).length < dars.test.length ? "none" : "0 4px 14px rgba(46,184,46,.35)",
              }}
            >
              Testni yakunlash
            </button>
          </div>
        )}

        {/* ── TEST NATIJA ── */}
        {phase === "test" && submitted && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Score card */}
            <div style={{
              background: pct >= 80 ? "linear-gradient(135deg,#1F7A2C,#0D3A1A)" : "linear-gradient(135deg,#DC2626,#991B1B)",
              borderRadius: 16, padding: "20px 20px", textAlign: "center",
            }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.75)", marginTop: 6 }}>
                {score}/{dars.test.length} to'g'ri javob
              </div>
              {pct >= 80 && (
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10, background: "rgba(255,255,255,.15)", borderRadius: 20, padding: "6px 14px" }}>
                  <Coins size={16} color="#FCD34D" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#FCD34D" }}>+10 coin olindi!</span>
                </div>
              )}
              {pct < 80 && (
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 6 }}>
                  80% va undan ko'p uchun coin beriladi
                </div>
              )}
            </div>

            {/* Answer review */}
            {dars.test.map((q, qi) => {
              const isCorrect = answers[qi] === q.togri;
              return (
                <div key={qi} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${isCorrect ? "rgba(46,184,46,.3)" : "rgba(220,38,38,.3)"}`, padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                    {isCorrect ? <CheckCircle2 size={16} color={T.lime} style={{ flexShrink: 0, marginTop: 1 }} /> : <XCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />}
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{q.savol}</span>
                  </div>
                  <div style={{ fontSize: 12, color: T.hint, paddingLeft: 24 }}>
                    {!isCorrect && (
                      <span>Sizning javobingiz: <span style={{ color: "#DC2626", fontWeight: 600 }}>{q.variantlar[answers[qi]] ?? "—"}</span> · </span>
                    )}
                    To'g'ri: <span style={{ color: T.lime, fontWeight: 600 }}>{q.variantlar[q.togri]}</span>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => { setAnswers({}); setSubmitted(false); setCoinEarned(false); }}
              style={{ padding: "12px", borderRadius: 10, border: `1px solid rgba(13,58,26,.15)`, background: "transparent", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Qayta urinish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
