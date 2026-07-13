import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ChevronLeft, BookOpen, ClipboardCheck, ArrowRight, Clock, RotateCcw, Eye } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { MD } from "../../lib/md";
import { Card } from "../../components/ui";
import { Quiz, type QuizQuestion } from "../../components/Quiz";
import { LessonImages } from "../../components/LessonImages";
import { LessonAudio } from "../../components/LessonAudio";
import { useProgress } from "../progress/ProgressContext";
import { useAuth } from "../../auth/AuthContext";
import { loadDaraja } from "../../content/darajaTest";
import { shouldStrip, stripHarakat } from "../../lib/stripHarakat";

export function NazariyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isNazUnlocked, submitNaz, nazDone, saveWrong, clearWrong } = useProgress();
  const [phase, setPhase] = useState<"mavzu" | "test" | "mashq">("mavzu");
  const [resultPct, setResultPct] = useState<number | null>(null);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [retryQuestions, setRetryQuestions] = useState<QuizQuestion[] | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const dars = NAZARIY.find((d) => d.id === Number(id));
  const strip = shouldStrip(loadDaraja(user?.id ?? ""));

  useEffect(() => {
    setPhase("mavzu");
    setResultPct(null);
    setWrongIndices([]);
    setRetryQuestions(null);
    setRevealed(new Set());
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

  const currentIdx = NAZARIY.findIndex((d) => d.id === dars.id);
  const nextDars = NAZARIY[currentIdx + 1] ?? null;
  const hasNext = nextDars !== null;
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
            {([
              { k: "mavzu" as const, label: "Mavzu", icon: BookOpen },
              ...(dars.mashq?.length ? [{ k: "mashq" as const, label: "Mashq", icon: Eye }] : []),
              { k: "test" as const, label: "Test", icon: ClipboardCheck },
            ]).map((p) => (
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
        {phase === "mashq" ? (
          <>
            <Card style={{ padding: "12px 14px", marginBottom: 12, background: "rgba(13,58,26,.04)", border: "1px solid rgba(13,58,26,.12)" }}>
              <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
                <Eye size={13} style={{ verticalAlign: "middle", marginRight: 5 }} />
                Har so'zni o'qib, pastidagi tugmani bosib tekshiring
              </div>
            </Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {(dars.mashq ?? []).map((w, i) => (
                <button
                  key={i}
                  onClick={() => setRevealed((prev) => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; })}
                  style={{
                    background: revealed.has(i) ? "rgba(13,58,26,.07)" : "#fff",
                    border: `1px solid ${revealed.has(i) ? "rgba(13,58,26,.25)" : "rgba(0,0,0,.08)"}`,
                    borderRadius: 10,
                    padding: "14px 8px 10px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: revealed.has(i) ? "none" : "0 1px 4px rgba(0,0,0,.06)",
                    transition: "all .15s",
                  }}
                >
                  <span style={{ fontFamily: AR, fontSize: 28, lineHeight: 1.3, direction: "rtl", color: T.text }}>{strip ? stripHarakat(w.ar) : w.ar}</span>
                  <span style={{ fontSize: 11, color: revealed.has(i) ? T.green : "transparent", fontWeight: 600, letterSpacing: 0.3, transition: "color .15s" }}>{w.oq}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setRevealed(new Set())}
              style={{ width: "100%", marginTop: 14, padding: "11px", background: "none", border: "1px solid rgba(0,0,0,.12)", borderRadius: 10, fontSize: 13, color: T.text2, cursor: "pointer", fontWeight: 500 }}
            >
              Barchasini yashirish
            </button>
          </>
        ) : phase === "mavzu" ? (
          <>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              <MD text={strip ? stripHarakat(dars.mavzu) : dars.mavzu} />
            </Card>
            <Card style={{ padding: 16, marginBottom: 16 }}>
              <LessonImages type="nazariy" id={dars.id} isTeacher={user?.role === "teacher" || user?.role === "ceo"} />
              <LessonAudio type="nazariy" id={dars.id} isTeacher={user?.role === "teacher" || user?.role === "ceo"} />
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
            {retryQuestions && (
              <div style={{ background: "rgba(230,0,35,.07)", border: "1px solid rgba(230,0,35,.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <RotateCcw size={14} color={T.red} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.red }}>Takrorlash rejimi — {retryQuestions.length} ta xato savol</span>
              </div>
            )}
            <Quiz
              key={retryQuestions ? "retry" : "full"}
              questions={retryQuestions ?? questions}
              onDone={(ok, tot) => {
                if (!retryQuestions) submitNaz(dars.id, ok, tot);
                setResultPct(Math.round((ok / tot) * 100));
              }}
              onWrong={(indices) => {
                const src = retryQuestions ?? questions;
                const actual = indices
                  .map((i) => questions.findIndex((q) => q === src[i]))
                  .filter((i) => i !== -1);
                setWrongIndices(actual);
                if (actual.length === 0) clearWrong(`naz_${dars.id}`);
                else saveWrong(`naz_${dars.id}`, actual);
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

                {wrongIndices.length > 0 && (
                  <button
                    onClick={() => {
                      setRetryQuestions(wrongIndices.map((i) => questions[i]));
                      setResultPct(null);
                    }}
                    style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid rgba(230,0,35,.25)", background: "rgba(230,0,35,.06)", fontSize: 13, fontWeight: 600, color: T.red, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 10 }}
                  >
                    <RotateCcw size={15} /> Xatolarni takrorlash ({wrongIndices.length} ta)
                  </button>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => { setResultPct(null); setPhase("mavzu"); setRetryQuestions(null); setWrongIndices([]); }}
                    style={{ flex: 1, padding: "13px", borderRadius: 12, border: "1px solid rgba(13,58,26,.15)", background: "rgba(13,58,26,.04)", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  >
                    Mavzuni qayta o'qi
                  </button>
                  {passed && hasNext && (
                    <button
                      onClick={() => navigate(`/dars/nazariy/${nextDars!.id}`)}
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
