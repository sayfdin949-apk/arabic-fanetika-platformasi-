import { useState } from "react";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { T, AR } from "../../theme/tokens";

interface Letter {
  ar: string;
  name: string;
  info: string;
  example: string;
}

interface Question {
  q: string;
  correct: string;
  options: string[];
}

interface Group {
  id: number;
  title: string;
  desc: string;
  letters: Letter[];
  questions: Question[];
}

const GROUPS: Group[] = [
  {
    id: 1, title: "Lab tovushlari", desc: "Lablarning ishtiroki bilan hosil bo'ladi",
    letters: [
      { ar: "ب", name: "Ba", info: "Lablar berkitiladi, portlash bilan", example: "بَيْت — bayt (uy)" },
      { ar: "م", name: "Mim", info: "Lablar berkitiladi, burun orqali", example: "مَاء — mo' (suv)" },
      { ar: "ف", name: "Fa", info: "Yuqori tish pastki labga tegadi", example: "فَأْر — far (sichqon)" },
    ],
    questions: [
      { q: "Burun orqali chiqadigan lab tovushi", correct: "م", options: ["ب", "م", "ف", "و"] },
      { q: "Tish-lab (labiodental) tovushi", correct: "ف", options: ["ب", "م", "ف", "و"] },
      { q: "Portlovchi lab tovushi", correct: "ب", options: ["ب", "م", "ف", "و"] },
    ],
  },
  {
    id: 2, title: "Ha va Kha guruhi", desc: "Tomoq va halqum orqali hosil bo'luvchi tovushlar",
    letters: [
      { ar: "ح", name: "Ha (halqum)", info: "Halqumning kichiklashishidan hosil bo'ladi", example: "حَرْف — harf (harf)" },
      { ar: "خ", name: "Kha", info: "Til orqa qismi yumshoq tanglayga kelganda", example: "خَطّ — xatt (chiziq)" },
      { ar: "ه", name: "Ha (tovush tori)", info: "Ovoz torlaridan chiqadi", example: "هَدَف — hadaf (maqsad)" },
    ],
    questions: [
      { q: "Halqum (pharynx) orqali hosil bo'luvchi Ha", correct: "ح", options: ["ح", "خ", "ه", "ع"] },
      { q: "Til orqa qismi tanglayga teganda hosil bo'luvchi harf", correct: "خ", options: ["ح", "خ", "ه", "غ"] },
      { q: "Ovoz torlaridan chiqadigan nafas Ha", correct: "ه", options: ["ح", "خ", "ه", "ع"] },
    ],
  },
  {
    id: 3, title: "Sin va Sad: Oddiy va Qattiq", desc: "Bu juftlar talaffuzda kuchli farq qiladi",
    letters: [
      { ar: "س", name: "Sin", info: "Oddiy (muraqaq) tish-til tovushi", example: "سَمَك — samak (baliq)" },
      { ar: "ص", name: "Sad", info: "Qattiq (mufaxxam) tish-til tovushi", example: "صَخْر — saxr (tosh)" },
    ],
    questions: [
      { q: "Qattiq (mufaxxam) sibilant", correct: "ص", options: ["س", "ص", "ز", "ش"] },
      { q: "Oddiy (muraqaq) sibilant", correct: "س", options: ["س", "ص", "ز", "ش"] },
    ],
  },
  {
    id: 4, title: "Ta va Ta: Oddiy va Qattiq", desc: "Mufaxxam-muraqaq juftlari",
    letters: [
      { ar: "ت", name: "Ta", info: "Oddiy ta tovushi — til uchi tishga tegadi", example: "تَمَر — tamar (xurmo)" },
      { ar: "ط", name: "Ta (qattiq)", info: "Qattiq ta — til orqa tomoni ko'tariladi", example: "طَيْر — tayr (qush)" },
    ],
    questions: [
      { q: "Qattiq (emphatic) ta tovushi", correct: "ط", options: ["ت", "ط", "ث", "د"] },
      { q: "Oddiy ta tovushi", correct: "ت", options: ["ت", "ط", "ث", "د"] },
    ],
  },
  {
    id: 5, title: "Ayn va Ghayn", desc: "Halqum va yumshoq tanglay tovushlari",
    letters: [
      { ar: "ع", name: "Ayn", info: "Halqumning qisqarishidan hosil bo'ladi", example: "عَيْن — ayn (ko'z)" },
      { ar: "غ", name: "Ghayn", info: "Til orqa qismi tanglayga — jarangdor", example: "غَنَم — ghanam (qo'y)" },
    ],
    questions: [
      { q: "Halqum (pharyngeal) tovushi", correct: "ع", options: ["ع", "غ", "خ", "ق"] },
      { q: "Jarangdor tanglay (velar) tovushi", correct: "غ", options: ["ع", "غ", "خ", "ق"] },
    ],
  },
  {
    id: 6, title: "Qaf va Kaf", desc: "Tanglay va yumshoq tanglay tovushlari",
    letters: [
      { ar: "ق", name: "Qaf", info: "Til orqa qismi orqa tanglayga (uvula) kelganda", example: "قَلَم — qalam (qalem)" },
      { ar: "ك", name: "Kaf", info: "Til orqa qismi yumshoq tanglayga kelganda", example: "كِتَاب — kitob" },
    ],
    questions: [
      { q: "Uvulaga (bodomcha) tegib hosil bo'luvchi harf", correct: "ق", options: ["ق", "ك", "غ", "خ"] },
      { q: "Yumshoq tanglayda hosil bo'luvchi harf", correct: "ك", options: ["ق", "ك", "غ", "خ"] },
    ],
  },
];

export function MinimalPairsView() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [phase, setPhase] = useState<"learn" | "quiz">("learn");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const group = GROUPS[groupIdx];

  const resetGroup = (idx: number) => {
    setGroupIdx(idx);
    setPhase("learn");
    setQIdx(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleAnswer = (opt: string) => {
    if (answers[qIdx] !== undefined) return;
    const next = { ...answers, [qIdx]: opt };
    setAnswers(next);
    if (Object.keys(next).length === group.questions.length) setShowResult(true);
  };

  const correct = group.questions.filter((q, i) => answers[i] === q.correct).length;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Mashq</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Minimal juftlar</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 4 }}>O'xshash tovushli harflarni farqlash</div>
        </div>
      </div>

      {/* Group selector */}
      <div className="no-scrollbar" style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto" }}>
        {GROUPS.map((g, i) => (
          <button
            key={g.id}
            onClick={() => resetGroup(i)}
            style={{
              flexShrink: 0,
              padding: "6px 14px",
              borderRadius: 20,
              border: groupIdx === i ? "none" : "1px solid rgba(13,58,26,.18)",
              background: groupIdx === i ? T.gGreen : "#fff",
              color: groupIdx === i ? "#fff" : T.text2,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div style={{ padding: "0 16px 28px" }}>
        {/* Learn phase */}
        {phase === "learn" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 4 }}>{group.title}</div>
              <div style={{ fontSize: 13, color: T.text2 }}>{group.desc}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {group.letters.map((l) => (
                <div
                  key={l.ar}
                  style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: AR, fontSize: 34, color: "#fff" }}>{l.ar}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.green, marginBottom: 4 }}>{l.name}</div>
                    <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5, marginBottom: 6 }}>{l.info}</div>
                    <div style={{ fontSize: 12, color: T.hint, fontFamily: AR, direction: "rtl", background: "rgba(13,58,26,.04)", borderRadius: 8, padding: "6px 10px", display: "inline-block" }}>
                      {l.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase("quiz")}
              style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(46,184,46,.35)" }}
            >
              Testni boshlash →
            </button>
          </div>
        )}

        {/* Quiz phase */}
        {phase === "quiz" && (
          <div>
            {showResult ? (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", overflow: "hidden" }}>
                <div style={{ background: correct === group.questions.length ? T.gLime : T.gGreen, padding: "24px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>{correct === group.questions.length ? "🏆" : "📚"}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: correct === group.questions.length ? T.onCta : "#fff" }}>{correct}/{group.questions.length}</div>
                  <div style={{ fontSize: 13, color: correct === group.questions.length ? T.onCta : "rgba(255,255,255,.8)", marginTop: 4 }}>to'g'ri javob</div>
                </div>
                <div style={{ padding: 16, display: "flex", gap: 10 }}>
                  <button
                    onClick={() => resetGroup(groupIdx)}
                    style={{ flex: 1, padding: "13px", borderRadius: 11, border: "1px solid rgba(13,58,26,.15)", background: "rgba(13,58,26,.04)", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  >
                    Qayta
                  </button>
                  {groupIdx < GROUPS.length - 1 && (
                    <button
                      onClick={() => resetGroup(groupIdx + 1)}
                      style={{ flex: 1, padding: "13px", borderRadius: 11, border: "none", background: T.gGreen, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                    >
                      Keyingi →
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: T.hint }}>Savol {qIdx + 1} / {group.questions.length}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {group.questions.map((_, i) => (
                      <div key={i} style={{ width: 20, height: 5, borderRadius: 3, background: i < qIdx ? T.lime : i === qIdx ? T.gLime : "rgba(13,58,26,.1)" }} />
                    ))}
                  </div>
                </div>

                {group.questions.map((q, qi) => {
                  if (qi !== qIdx) return null;
                  const chosen = answers[qi];
                  return (
                    <div key={qi}>
                      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: "18px 16px", marginBottom: 12 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: T.green, textAlign: "center" }}>{q.q}</div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                        {q.options.map((opt) => {
                          const isDone = chosen !== undefined;
                          const isCorrect = opt === q.correct;
                          const isChosen = opt === chosen;
                          let bg = "#fff";
                          let border = "1.5px solid rgba(13,58,26,.12)";
                          let iconEl: React.ReactNode = null;
                          if (isDone && isCorrect) { bg = "rgba(46,184,46,.1)"; border = "1.5px solid #2EB82E"; iconEl = <CheckCircle size={14} color={T.lime} />; }
                          else if (isDone && isChosen && !isCorrect) { bg = "rgba(230,0,35,.08)"; border = "1.5px solid rgba(230,0,35,.4)"; iconEl = <XCircle size={14} color={T.red} />; }
                          return (
                            <button
                              key={opt}
                              disabled={isDone}
                              onClick={() => handleAnswer(opt)}
                              style={{ background: bg, border, borderRadius: 12, padding: "14px 10px", cursor: isDone ? "default" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transition: "all .15s" }}
                            >
                              <span style={{ fontFamily: AR, fontSize: 36, color: T.green }}>{opt}</span>
                              {iconEl}
                            </button>
                          );
                        })}
                      </div>

                      {chosen !== undefined && (
                        <div style={{ display: "flex", gap: 10 }}>
                          {qi > 0 && (
                            <button onClick={() => setQIdx(qi - 1)} style={{ flex: 1, padding: "12px", borderRadius: 11, border: "1px solid rgba(13,58,26,.15)", background: "rgba(13,58,26,.04)", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                              <ChevronLeft size={15} /> Oldingi
                            </button>
                          )}
                          {qi < group.questions.length - 1 ? (
                            <button onClick={() => setQIdx(qi + 1)} style={{ flex: 1, padding: "12px", borderRadius: 11, border: "none", background: T.gGreen, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                              Keyingi <ChevronRight size={15} />
                            </button>
                          ) : (
                            <button onClick={() => setShowResult(true)} style={{ flex: 1, padding: "12px", borderRadius: 11, border: "none", background: T.gLime, color: T.onCta, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                              Natijani ko'rish
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
