import { useState, useEffect } from "react";
import { Zap, Trophy, RotateCcw, Timer } from "lucide-react";
import { T, AR } from "../../theme/tokens";

interface Pair { ar: string; name: string }

const ALL_LETTERS: Pair[] = [
  { ar: "ا", name: "Alif" }, { ar: "ب", name: "Ba" }, { ar: "ت", name: "Ta" },
  { ar: "ث", name: "Sa" }, { ar: "ج", name: "Jim" }, { ar: "ح", name: "Ha (yumshoq)" },
  { ar: "خ", name: "Kha" }, { ar: "د", name: "Dal" }, { ar: "ذ", name: "Zal" },
  { ar: "ر", name: "Ra" }, { ar: "ز", name: "Zayn" }, { ar: "س", name: "Sin" },
  { ar: "ش", name: "Shin" }, { ar: "ص", name: "Sad" }, { ar: "ض", name: "Dad" },
  { ar: "ط", name: "Ta (qattiq)" }, { ar: "ظ", name: "Za (qattiq)" }, { ar: "ع", name: "Ayn" },
  { ar: "غ", name: "Ghayn" }, { ar: "ف", name: "Fa" }, { ar: "ق", name: "Qaf" },
  { ar: "ك", name: "Kaf" }, { ar: "ل", name: "Lam" }, { ar: "م", name: "Mim" },
  { ar: "ن", name: "Nun" }, { ar: "ه", name: "Ha (nozik)" }, { ar: "و", name: "Vav" },
  { ar: "ي", name: "Ya" },
];

const PAIR_COUNT = 6;
const GAME_TIME = 90;

const shuffle = <X,>(arr: X[]): X[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function getHiScore() {
  try { return parseInt(localStorage.getItem("afp:game_hi") ?? "0") || 0; } catch { return 0; }
}
function setHiScore(s: number) {
  try { localStorage.setItem("afp:game_hi", String(s)); } catch { /* noop */ }
}

export function GameView() {
  const [phase, setPhase] = useState<"menu" | "playing" | "done">("menu");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [hiScore, setHi] = useState(getHiScore);

  const [pairs, setPairs] = useState<Pair[]>([]);
  const [leftOrder, setLeftOrder] = useState<number[]>([]);
  const [rightOrder, setRightOrder] = useState<number[]>([]);
  const [leftSel, setLeftSel] = useState<number | null>(null);
  const [rightSel, setRightSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongLeft, setWrongLeft] = useState<number | null>(null);
  const [wrongRight, setWrongRight] = useState<number | null>(null);

  const startGame = () => {
    const selected = shuffle(ALL_LETTERS).slice(0, PAIR_COUNT);
    const idxArr = Array.from({ length: PAIR_COUNT }, (_, i) => i);
    setPairs(selected);
    setLeftOrder(shuffle(idxArr));
    setRightOrder(shuffle(idxArr));
    setLeftSel(null);
    setRightSel(null);
    setMatched(new Set());
    setWrongLeft(null);
    setWrongRight(null);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setPhase("playing");
  };

  const endGame = (finalScore: number) => {
    setPhase("done");
    if (finalScore > hiScore) {
      setHi(finalScore);
      setHiScore(finalScore);
    }
  };

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) { endGame(score); return; }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  });

  // Handle selection
  useEffect(() => {
    if (leftSel === null || rightSel === null) return;
    const leftPairIdx = leftOrder[leftSel];
    const rightPairIdx = rightOrder[rightSel];

    if (leftPairIdx === rightPairIdx) {
      const newMatched = new Set(matched).add(leftPairIdx);
      setMatched(newMatched);
      const newScore = score + 10;
      setScore(newScore);
      setLeftSel(null);
      setRightSel(null);
      if (newMatched.size === PAIR_COUNT) endGame(newScore);
    } else {
      setWrongLeft(leftSel);
      setWrongRight(rightSel);
      setScore((s) => Math.max(0, s - 3));
      setTimeout(() => {
        setWrongLeft(null);
        setWrongRight(null);
        setLeftSel(null);
        setRightSel(null);
      }, 600);
    }
  }, [leftSel, rightSel]);

  const timerPct = (timeLeft / GAME_TIME) * 100;
  const timerColor = timeLeft > 30 ? T.lime : timeLeft > 10 ? "#FFA500" : T.red;

  if (phase === "menu") {
    return (
      <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
        <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Mini-o'yin</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Harflar o'yini</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 4 }}>Arab harflarini nomlari bilan to'g'ri juftlang</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 20 }}>
          <div style={{ fontSize: 72, lineHeight: 1, textAlign: "center" }}>🎮</div>

          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 20, width: "100%", maxWidth: 360 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 12 }}>Qoidalar</div>
            {[
              "Sol tomondagi harfni va o'ng tomondagi nomni tanlang",
              "To'g'ri juftlik uchun +10 ball",
              "Noto'g'ri tanlash uchun -3 ball",
              `${GAME_TIME} soniya ichida imkon qadar ko'proq juftlang`,
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.onCta, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.4 }}>{r}</div>
              </div>
            ))}
          </div>

          {hiScore > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Trophy size={16} color="#FFD700" />
              <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Rekord: {hiScore} ball</span>
            </div>
          )}

          <button
            onClick={startGame}
            style={{ background: T.gLime, color: T.onCta, border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(46,184,46,.35)", display: "flex", alignItems: "center", gap: 10 }}
          >
            <Zap size={20} /> Boshlash
          </button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const isNewRecord = score >= hiScore;
    return (
      <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(13,58,26,.1)", boxShadow: "0 4px 20px rgba(13,58,26,.12)", overflow: "hidden", width: "100%", maxWidth: 360 }}>
          <div style={{ background: isNewRecord ? T.gLime : T.gGreen, padding: "28px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>{isNewRecord ? "🏆" : "🎯"}</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: isNewRecord ? T.onCta : "#fff" }}>{score}</div>
            <div style={{ fontSize: 14, color: isNewRecord ? T.onCta : "rgba(255,255,255,.7)", marginTop: 4 }}>ball</div>
          </div>
          <div style={{ padding: 20 }}>
            {isNewRecord && score > 0 && (
              <div style={{ background: "rgba(46,184,46,.1)", border: "1px solid rgba(46,184,46,.25)", borderRadius: 10, padding: "10px 14px", textAlign: "center", marginBottom: 14, fontSize: 14, fontWeight: 700, color: T.green }}>
                🎉 Yangi rekord!
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, textAlign: "center", background: "rgba(46,184,46,.07)", borderRadius: 10, padding: "10px 0" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.lime }}>{matched.size}</div>
                <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>Juftlangan</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", background: "rgba(13,58,26,.05)", borderRadius: 10, padding: "10px 0" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>{hiScore}</div>
                <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>Rekord</div>
              </div>
            </div>
            <button
              onClick={startGame}
              style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <RotateCcw size={16} /> Qayta o'ynash
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing phase
  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: T.green, padding: "14px 16px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Timer size={15} color="rgba(255,255,255,.8)" />
              <span style={{ fontSize: 22, fontWeight: 800, color: timeLeft <= 10 ? "#FF6B6B" : "#fff" }}>{timeLeft}s</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={15} color={T.limeBrt} />
              <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{score}</span>
            </div>
          </div>
          {/* Timer bar */}
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.2)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${timerPct}%`, borderRadius: 3, background: timerColor, transition: "width 1s linear, background .3s" }} />
          </div>
        </div>
      </div>

      {/* Game grid */}
      <div style={{ flex: 1, padding: 16, display: "flex", gap: 10 }}>
        {/* Left: Arabic letters */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.hint, textAlign: "center", marginBottom: 4 }}>Harf</div>
          {leftOrder.map((pairIdx, pos) => {
            if (matched.has(pairIdx)) {
              return (
                <div key={pos} style={{ height: 56, borderRadius: 12, background: "rgba(46,184,46,.12)", border: "1.5px solid rgba(46,184,46,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 22, color: T.lime }}>✓</span>
                </div>
              );
            }
            const isSelected = leftSel === pos;
            const isWrong = wrongLeft === pos;
            return (
              <button
                key={pos}
                onClick={() => !wrongLeft && setLeftSel(pos === leftSel ? null : pos)}
                style={{
                  height: 56,
                  borderRadius: 12,
                  border: isWrong ? `2px solid ${T.red}` : isSelected ? `2px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)",
                  background: isWrong ? "rgba(230,0,35,.1)" : isSelected ? "rgba(46,184,46,.12)" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .15s",
                  fontFamily: AR,
                  fontSize: 28,
                  color: isWrong ? T.red : isSelected ? T.green : T.green,
                  boxShadow: isSelected ? "0 2px 8px rgba(46,184,46,.25)" : "0 1px 3px rgba(13,58,26,.06)",
                }}
              >
                {pairs[pairIdx]?.ar}
              </button>
            );
          })}
        </div>

        {/* Right: Names */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.hint, textAlign: "center", marginBottom: 4 }}>Nomi</div>
          {rightOrder.map((pairIdx, pos) => {
            if (matched.has(pairIdx)) {
              return (
                <div key={pos} style={{ height: 56, borderRadius: 12, background: "rgba(46,184,46,.12)", border: "1.5px solid rgba(46,184,46,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 22, color: T.lime }}>✓</span>
                </div>
              );
            }
            const isSelected = rightSel === pos;
            const isWrong = wrongRight === pos;
            return (
              <button
                key={pos}
                onClick={() => !wrongLeft && setRightSel(pos === rightSel ? null : pos)}
                style={{
                  height: 56,
                  borderRadius: 12,
                  border: isWrong ? `2px solid ${T.red}` : isSelected ? `2px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)",
                  background: isWrong ? "rgba(230,0,35,.1)" : isSelected ? "rgba(46,184,46,.12)" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .15s",
                  fontSize: 12,
                  fontWeight: 700,
                  color: isWrong ? T.red : isSelected ? T.green : T.text,
                  boxShadow: isSelected ? "0 2px 8px rgba(46,184,46,.25)" : "0 1px 3px rgba(13,58,26,.06)",
                  textAlign: "center",
                  padding: "4px 6px",
                  lineHeight: 1.3,
                }}
              >
                {pairs[pairIdx]?.name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "8px 16px 20px", textAlign: "center" }}>
        <span style={{ fontSize: 12, color: T.hint }}>{matched.size}/{PAIR_COUNT} juftlandi</span>
      </div>
    </div>
  );
}
