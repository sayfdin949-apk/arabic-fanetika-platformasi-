import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ChevronLeft, BookOpen, ClipboardCheck, ArrowRight, Clock } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { MD } from "../../lib/md";
import { Card } from "../../components/ui";
import { Quiz, type QuizQuestion } from "../../components/Quiz";
import { useProgress } from "../progress/ProgressContext";

export function NazariyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isNazUnlocked, submitNaz, nazDone } = useProgress();
  const [phase, setPhase] = useState<"mavzu" | "test">("mavzu");
  const [resultPct, setResultPct] = useState<number | null>(null);

  const dars = NAZARIY.find((d) => d.id === Number(id));

  useEffect(() => {
    setPhase("mavzu");
    setResultPct(null);
    window.scrollTo(0, 0);
  }, [id]);

  const questions: QuizQuestion[] = useMemo(
    () =>
      dars
        ? dars.vazifalar.map((v) => ({
            q: v.savol,
            options: v.variantlar.map((t, i) => ({ text: t, correct: i === v.togri })),
          }))
        : [],
    [dars],
  );

  if (!dars) return <Navigate to="/dars" replace />;
  if (!isNazUnlocked(dars.id)) return <Navigate to="/dars" replace />;

  const hasNext = dars.id < NAZARIY.length;
  const passed = resultPct !== null && resultPct >= 80;
  const prevDone = nazDone[dars.id];

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Sticky header */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: T.green }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Top row: back + progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 0" }}>
            <button
              onClick={() => navigate("/dars")}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,.12)", border: "none", borderRadius: 8, padding: "6px 10px 6px 6px", color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", flexShrink: 0 }}
            >
              <ChevronLeft size={15} /> Darslar
            </button>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "5px 10px" }}>
              <Clock size={11} color="rgba(255,255,255,.7)" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.85)", fontWeight: 500 }}>1s 20d</span>
            </div>
          </div>

          {/* Dars info */}
          <div style={{ padding: "8px 16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: AR, fontSize: 18, color: T.onCta }}>{dars.icon}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600 }}>{dars.id}-DARS / {NAZARIY.length} DAN</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{dars.nomi}</div>
              </div>
              {prevDone && (
                <div style={{ fontSize: 12, fontWeight: 700, color: prevDone.pct >= 80 ? T.limeBrt : "rgba(255,255,255,.6)", flexShrink: 0 }}>
                  {prevDone.pct}%
                </div>
              )}
            </div>

            {/* Progress bar (NAZARIY.length bo'yicha) */}
            <div style={{ height: 3, background: "rgba(255,255,255,.15)", borderRadius: 2, margin: "10px 0 0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(dars.id / NAZARIY.length) * 100}%`, background: T.gLimeH, borderRadius: 2 }} />
            </div>
          </div>

          {/* Phase tabs */}
          <div style={{ display: "flex", padding: "10px 16px 0" }}>
            {([ { k: "mavzu" as const, label: "Mavzu", icon: BookOpen }, { k: "test" as const, label: "Test", icon: ClipboardCheck } ]).map((p) => (
              <button
                key={p.k}
                onClick={() => setPhase(p.k)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "9px 4px",
                  background: "none",
                  border: "none",
                  borderBottom: phase === p.k ? "3px solid #fff" : "3px solid transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: phase === p.k ? "#fff" : "rgba(255,255,255,.45)",
                  transition: "all .15s",
                }}
              >
                <p.icon size={14} /> {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {phase === "mavzu" ? (
          <>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              <MD text={dars.mavzu} />
            </Card>
            <button
              onClick={() => setPhase("test")}
              style={{
                width: "100%",
                background: T.gLime,
                color: T.onCta,
                border: "none",
                borderRadius: 12,
                padding: "14px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(46,184,46,.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <ClipboardCheck size={18} /> Testni boshlash
            </button>
          </>
        ) : (
          <>
            <Quiz
              questions={questions}
              onDone={(ok, tot) => {
                submitNaz(dars.id, ok, tot);
                setResultPct(Math.round((ok / tot) * 100));
              }}
            />
            {resultPct !== null && (
              <div style={{ marginTop: 16 }}>
                {passed ? (
                  <div style={{ background: "rgba(46,184,46,.08)", border: "1px solid rgba(46,184,46,.25)", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 28 }}>🎉</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.green, marginTop: 6 }}>Ajoyib! {resultPct}% natija</div>
                    <div style={{ fontSize: 12, color: T.text2, marginTop: 4 }}>Keyingi darsga o'tishingiz mumkin</div>
                  </div>
                ) : (
                  <div style={{ background: "rgba(230,0,35,.06)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 28 }}>📚</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.red, marginTop: 6 }}>{resultPct}% — Qayta urinib ko'ring</div>
                    <div style={{ fontSize: 12, color: T.text2, marginTop: 4 }}>O'tish uchun 80% kerak</div>
                  </div>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => { setResultPct(null); setPhase("mavzu"); }}
                    style={{ flex: 1, padding: "13px", borderRadius: 12, border: "1px solid rgba(13,58,26,.15)", background: "rgba(13,58,26,.04)", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  >
                    Mavzuni qayta o'qi
                  </button>
                  {passed && hasNext && (
                    <button
                      onClick={() => navigate(`/dars/nazariy/${dars.id + 1}`)}
                      style={{ flex: 1, padding: "13px", borderRadius: 12, border: "none", background: T.gGreen, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                    >
                      Keyingi <ArrowRight size={16} />
                    </button>
                  )}
                  {passed && !hasNext && (
                    <button
                      onClick={() => navigate("/dars")}
                      style={{ flex: 1, padding: "13px", borderRadius: 12, border: "none", background: T.gGreen, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                    >
                      Tugatildi 🏆
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
