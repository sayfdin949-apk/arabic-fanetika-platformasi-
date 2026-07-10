import { useState, useEffect } from "react";
import { Zap, Trophy, RotateCcw, Timer, ChevronLeft, Star, ArrowRight } from "lucide-react";
import { T, AR } from "../../theme/tokens";

/* ─── Helpers ─── */

const shuffle = <X,>(arr: X[]): X[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

function getHi(g: number): number {
  try { return parseInt(localStorage.getItem(`afp:game_hi_${g}`) ?? "0") || 0; } catch { return 0; }
}
function saveHi(g: number, s: number) {
  try { localStorage.setItem(`afp:game_hi_${g}`, String(s)); } catch { /* noop */ }
}

/* ─── Data ─── */

const ALL_LETTERS = [
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

const DIACRITICS = [
  { mark: "َ", name: "Fatha", uzbek: "qisqa «a» tovushi" },
  { mark: "ِ", name: "Kasra", uzbek: "qisqa «i» tovushi" },
  { mark: "ُ", name: "Damma", uzbek: "qisqa «u» tovushi" },
  { mark: "ْ", name: "Sukun", uzbek: "unli yo'q, undosh" },
];

const GAME_META = [
  { name: "Harflar Juftligi", emoji: "🃏", desc: "Arab harflarini nomlari bilan juftlang", tip: "Har ikki tomonda mos keluvchi juftni tanlang", time: "90s" },
  { name: "Abjad Tartib", emoji: "🔢", desc: "Harflarni alifbo tartibida bosing", tip: "ا dan boshlab ketma-ket to'g'ri tartibda bosing", time: "60s" },
  { name: "Tez Topish", emoji: "⚡", desc: "Nomni o'qib, to'g'ri Arab harfini toping", tip: "4 ta variant ichidan to'g'risini tanlang", time: "15 savol" },
  { name: "Harakat Bilish", emoji: "🎯", desc: "Harakatni ko'rib, turini aniqlang", tip: "Fatha / Kasra / Damma / Sukun ichidan tanlang", time: "15 savol" },
];

/* ─── Shared UI ─── */

function BackBtn({ onBack, light = true }: { onBack: () => void; light?: boolean }) {
  return (
    <button
      onClick={onBack}
      style={{
        background: light ? "rgba(255,255,255,.14)" : "rgba(13,58,26,.07)",
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: light ? "#fff" : T.text2,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <ChevronLeft size={15} />
      Orqaga
    </button>
  );
}

function TimerBar({ timeLeft, total, color }: { timeLeft: number; total: number; color: string }) {
  return (
    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.2)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${(timeLeft / total) * 100}%`, borderRadius: 3, background: color, transition: "width 1s linear, background .3s" }} />
    </div>
  );
}

function GameHeader({ timeLeft, score, total, color, onBack }: {
  timeLeft: number; score: number; total: number; color: string; onBack: () => void;
}) {
  return (
    <div style={{ background: T.green, padding: "14px 16px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BackBtn onBack={onBack} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Timer size={15} color="rgba(255,255,255,.8)" />
              <span style={{ fontSize: 22, fontWeight: 800, color: timeLeft <= 10 ? "#FF6B6B" : "#fff" }}>{timeLeft}s</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Zap size={15} color={T.limeBrt} />
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{score}</span>
          </div>
        </div>
        <TimerBar timeLeft={timeLeft} total={total} color={color} />
      </div>
    </div>
  );
}

function DoneScreen({
  gameIdx, score, extraLabel, extraValue, onReplay, onBack,
}: {
  gameIdx: number; score: number; extraLabel: string; extraValue: number;
  onReplay: () => void; onBack: () => void;
}) {
  const hi = getHi(gameIdx);
  const isNew = score > 0 && score >= hi;
  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(13,58,26,.1)", boxShadow: "0 4px 20px rgba(13,58,26,.12)", overflow: "hidden", width: "100%", maxWidth: 360 }}>
        <div style={{ background: isNew ? T.gLime : T.gGreen, padding: "28px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>{isNew ? "🏆" : "🎯"}</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: isNew ? T.onCta : "#fff" }}>{score}</div>
          <div style={{ fontSize: 14, color: isNew ? T.onCta : "rgba(255,255,255,.7)", marginTop: 4 }}>ball</div>
        </div>
        <div style={{ padding: 20 }}>
          {isNew && score > 0 && (
            <div style={{ background: "rgba(46,184,46,.1)", border: "1px solid rgba(46,184,46,.25)", borderRadius: 10, padding: "10px 14px", textAlign: "center", marginBottom: 14, fontSize: 14, fontWeight: 700, color: T.green }}>
              Yangi rekord!
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, textAlign: "center", background: "rgba(46,184,46,.07)", borderRadius: 10, padding: "10px 0" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.lime }}>{extraValue}</div>
              <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>{extraLabel}</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", background: "rgba(13,58,26,.05)", borderRadius: 10, padding: "10px 0" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>{hi}</div>
              <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>Rekord</div>
            </div>
          </div>
          <button
            onClick={onReplay}
            style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}
          >
            <RotateCcw size={16} /> Qayta o'ynash
          </button>
          <button
            onClick={onBack}
            style={{ width: "100%", background: "rgba(13,58,26,.06)", color: T.text, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            O'yin markazi
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Game 0: Harflar Juftligi ─── */

const PAIR_COUNT = 6;
const JUFT_TIME = 90;

function MatchingGame({ onBack }: { onBack: () => void }) {
  const gi = 0;
  const [phase, setPhase] = useState<"menu" | "playing" | "done">("menu");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(JUFT_TIME);
  const [pairs, setPairs] = useState<typeof ALL_LETTERS>([]);
  const [leftOrder, setLeftOrder] = useState<number[]>([]);
  const [rightOrder, setRightOrder] = useState<number[]>([]);
  const [leftSel, setLeftSel] = useState<number | null>(null);
  const [rightSel, setRightSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongLeft, setWrongLeft] = useState<number | null>(null);
  const [wrongRight, setWrongRight] = useState<number | null>(null);

  const startGame = () => {
    const sel = shuffle(ALL_LETTERS).slice(0, PAIR_COUNT);
    const idxArr = Array.from({ length: PAIR_COUNT }, (_, i) => i);
    setPairs(sel); setLeftOrder(shuffle(idxArr)); setRightOrder(shuffle(idxArr));
    setLeftSel(null); setRightSel(null); setMatched(new Set());
    setWrongLeft(null); setWrongRight(null); setScore(0); setTimeLeft(JUFT_TIME);
    setPhase("playing");
  };

  const endGame = (s: number) => {
    setPhase("done");
    const hi = getHi(gi);
    if (s > hi) saveHi(gi, s);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) { endGame(score); return; }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  });

  useEffect(() => {
    if (leftSel === null || rightSel === null) return;
    const lp = leftOrder[leftSel];
    const rp = rightOrder[rightSel];
    if (lp === rp) {
      const nm = new Set(matched).add(lp);
      setMatched(nm);
      const ns = score + 10;
      setScore(ns); setLeftSel(null); setRightSel(null);
      if (nm.size === PAIR_COUNT) endGame(ns);
    } else {
      setWrongLeft(leftSel); setWrongRight(rightSel);
      setScore((s) => Math.max(0, s - 3));
      setTimeout(() => { setWrongLeft(null); setWrongRight(null); setLeftSel(null); setRightSel(null); }, 600);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftSel, rightSel]);

  const timerColor = timeLeft > 30 ? T.lime : timeLeft > 10 ? "#FFA500" : T.red;

  if (phase === "menu") return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <BackBtn onBack={onBack} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase" }}>O'yin 1</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Harflar Juftligi</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>Arab harflarini nomlari bilan to'g'ri juftlang</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 20 }}>
        <div style={{ fontSize: 64 }}>🃏</div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 18, width: "100%", maxWidth: 360 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 10 }}>Qoidalar</div>
          {["Sol tomondagi harfni va o'ng tomondagi nomni tanlang", "To'g'ri juftlik uchun +10 ball", "Noto'g'ri tanlash uchun -3 ball", `${JUFT_TIME} soniya ichida imkon qadar ko'proq juftlang`].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.onCta, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.4 }}>{r}</div>
            </div>
          ))}
        </div>
        {getHi(gi) > 0 && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Trophy size={16} color="#FFD700" /><span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Rekord: {getHi(gi)}</span></div>}
        <button onClick={startGame} style={{ background: T.gLime, color: T.onCta, border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(46,184,46,.35)", display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={20} /> Boshlash
        </button>
      </div>
    </div>
  );

  if (phase === "done") return (
    <DoneScreen gameIdx={gi} score={score} extraLabel="Juftlangan" extraValue={matched.size} onReplay={startGame} onBack={onBack} />
  );

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <GameHeader timeLeft={timeLeft} score={score} total={JUFT_TIME} color={timerColor} onBack={onBack} />
      <div style={{ flex: 1, padding: 16, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.hint, textAlign: "center", marginBottom: 2 }}>Harf</div>
          {leftOrder.map((pi, pos) => {
            if (matched.has(pi)) return <div key={pos} style={{ height: 56, borderRadius: 12, background: "rgba(46,184,46,.12)", border: "1.5px solid rgba(46,184,46,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 22, color: T.lime }}>✓</span></div>;
            const isSel = leftSel === pos;
            const isWrong = wrongLeft === pos;
            return (
              <button key={pos} onClick={() => !wrongLeft && setLeftSel(pos === leftSel ? null : pos)}
                style={{ height: 56, borderRadius: 12, border: isWrong ? `2px solid ${T.red}` : isSel ? `2px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)", background: isWrong ? "rgba(230,0,35,.1)" : isSel ? "rgba(46,184,46,.12)" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: AR, fontSize: 28, color: isWrong ? T.red : T.green, boxShadow: isSel ? "0 2px 8px rgba(46,184,46,.25)" : "0 1px 3px rgba(13,58,26,.06)", transition: "all .15s" }}>
                {pairs[pi]?.ar}
              </button>
            );
          })}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.hint, textAlign: "center", marginBottom: 2 }}>Nomi</div>
          {rightOrder.map((pi, pos) => {
            if (matched.has(pi)) return <div key={pos} style={{ height: 56, borderRadius: 12, background: "rgba(46,184,46,.12)", border: "1.5px solid rgba(46,184,46,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 22, color: T.lime }}>✓</span></div>;
            const isSel = rightSel === pos;
            const isWrong = wrongRight === pos;
            return (
              <button key={pos} onClick={() => !wrongLeft && setRightSel(pos === rightSel ? null : pos)}
                style={{ height: 56, borderRadius: 12, border: isWrong ? `2px solid ${T.red}` : isSel ? `2px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)", background: isWrong ? "rgba(230,0,35,.1)" : isSel ? "rgba(46,184,46,.12)" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: isWrong ? T.red : isSel ? T.green : T.text, boxShadow: isSel ? "0 2px 8px rgba(46,184,46,.25)" : "0 1px 3px rgba(13,58,26,.06)", transition: "all .15s", textAlign: "center", padding: "4px 6px", lineHeight: 1.3 }}>
                {pairs[pi]?.name}
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

/* ─── Game 1: Abjad Tartib ─── */

const TARTIB_COUNT = 8;
const TARTIB_TIME = 60;

function AbjadGame({ onBack }: { onBack: () => void }) {
  const gi = 1;
  const [phase, setPhase] = useState<"menu" | "playing" | "done">("menu");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TARTIB_TIME);
  const [letters, setLetters] = useState<typeof ALL_LETTERS>([]);
  const [displayOrder, setDisplayOrder] = useState<number[]>([]);
  const [nextExpected, setNextExpected] = useState(0);
  const [clicked, setClicked] = useState<Set<number>>(new Set());
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const startGame = () => {
    const indices = shuffle(Array.from({ length: ALL_LETTERS.length }, (_, i) => i)).slice(0, TARTIB_COUNT);
    indices.sort((a, b) => a - b);
    const picked = indices.map((i) => ALL_LETTERS[i]);
    setLetters(picked);
    setDisplayOrder(shuffle(Array.from({ length: TARTIB_COUNT }, (_, i) => i)));
    setNextExpected(0); setClicked(new Set()); setWrongIdx(null);
    setScore(0); setCorrectCount(0); setTimeLeft(TARTIB_TIME);
    setPhase("playing");
  };

  const endGame = (s: number) => {
    setPhase("done");
    const hi = getHi(gi);
    if (s > hi) saveHi(gi, s);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) { endGame(score); return; }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  });

  const handleClick = (letterIdx: number) => {
    if (phase !== "playing" || clicked.has(letterIdx) || wrongIdx !== null) return;
    if (letterIdx === nextExpected) {
      const nc = new Set(clicked).add(letterIdx);
      setClicked(nc);
      const ns = score + 15; const nco = correctCount + 1;
      setScore(ns); setCorrectCount(nco); setNextExpected(nextExpected + 1);
      if (nc.size === TARTIB_COUNT) setTimeout(() => endGame(ns), 300);
    } else {
      setWrongIdx(letterIdx);
      setScore((s) => Math.max(0, s - 5));
      setTimeout(() => setWrongIdx(null), 600);
    }
  };

  const timerColor = timeLeft > 20 ? T.lime : timeLeft > 10 ? "#FFA500" : T.red;

  if (phase === "menu") return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#1e4a8a,#0f2d5c)", padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <BackBtn onBack={onBack} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase" }}>O'yin 2</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Abjad Tartib</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>Harflarni alifbo tartibida ketma-ket bosing</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 20 }}>
        <div style={{ fontSize: 64 }}>🔢</div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 18, width: "100%", maxWidth: 360 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 10 }}>Qoidalar</div>
          {[`${TARTIB_COUNT} ta arabliy harf ko'rsatiladi`, "Ularni alifbo tartibida: ا → ب → ت → ... bosing", "To'g'ri tartib uchun +15 ball", "Noto'g'ri bosish uchun -5 ball", `${TARTIB_TIME} soniyada imkon qadar to'g'ri tartib`].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: "linear-gradient(135deg,#1e4a8a,#0f2d5c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.4 }}>{r}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, background: "rgba(46,184,46,.07)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.green, marginBottom: 6 }}>Alifbo tartibi eslatma:</div>
            <div style={{ fontFamily: AR, fontSize: 18, direction: "rtl", color: T.green, lineHeight: 2 }}>ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي</div>
          </div>
        </div>
        {getHi(gi) > 0 && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Trophy size={16} color="#FFD700" /><span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Rekord: {getHi(gi)}</span></div>}
        <button onClick={startGame} style={{ background: "linear-gradient(135deg,#1e4a8a,#0f2d5c)", color: "#fff", border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(30,74,138,.35)", display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={20} /> Boshlash
        </button>
      </div>
    </div>
  );

  if (phase === "done") return (
    <DoneScreen gameIdx={gi} score={score} extraLabel="To'g'ri tartib" extraValue={correctCount} onReplay={startGame} onBack={onBack} />
  );

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#1e4a8a,#0f2d5c)", padding: "14px 16px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BackBtn onBack={onBack} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Timer size={15} color="rgba(255,255,255,.8)" />
                <span style={{ fontSize: 22, fontWeight: 800, color: timeLeft <= 10 ? "#FF6B6B" : "#fff" }}>{timeLeft}s</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={15} color={T.limeBrt} />
              <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{score}</span>
            </div>
          </div>
          <TimerBar timeLeft={timeLeft} total={TARTIB_TIME} color={timerColor} />
          <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.7)" }}>
            Keyingi:
            {nextExpected < letters.length ? (
              <>
                <span style={{ fontFamily: AR, fontSize: 22, color: T.limeBrt, marginLeft: 8 }}>{letters[nextExpected]?.ar}</span>
                <span style={{ marginLeft: 6, fontSize: 11 }}>({letters[nextExpected]?.name})</span>
              </>
            ) : (
              <span style={{ marginLeft: 8, color: T.limeBrt, fontWeight: 700 }}>Hammasi to'g'ri!</span>
            )}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: 16 }}>
        <div style={{ fontSize: 12, color: T.hint, textAlign: "center", marginBottom: 12 }}>
          {clicked.size}/{TARTIB_COUNT} bosildi
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {displayOrder.map((li, pos) => {
            const letter = letters[li];
            const isDone = clicked.has(li);
            const isWrong = wrongIdx === li;
            return (
              <button
                key={pos}
                onClick={() => handleClick(li)}
                disabled={isDone}
                style={{
                  height: 80,
                  borderRadius: 14,
                  border: isWrong ? `2px solid ${T.red}` : isDone ? `2px solid ${T.lime}` : "1.5px solid rgba(13,58,26,.12)",
                  background: isWrong ? "rgba(230,0,35,.1)" : isDone ? "rgba(46,184,46,.12)" : "#fff",
                  cursor: isDone ? "default" : "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  transition: "all .15s",
                  boxShadow: isDone ? "none" : "0 1px 3px rgba(13,58,26,.08)",
                }}
              >
                {isDone ? (
                  <span style={{ fontSize: 28, color: T.lime }}>✓</span>
                ) : (
                  <span style={{ fontFamily: AR, fontSize: 34, color: isWrong ? T.red : T.green }}>{letter?.ar}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Game 2: Tez Topish ─── */

interface TezQ { correct: typeof ALL_LETTERS[0]; options: typeof ALL_LETTERS }

function generateTezQuestions(n: number): TezQ[] {
  return shuffle(ALL_LETTERS).slice(0, n).map((letter) => {
    const others = shuffle(ALL_LETTERS.filter((l) => l.ar !== letter.ar)).slice(0, 3);
    return { correct: letter, options: shuffle([letter, ...others]) };
  });
}

const TEZ_TOTAL = 15;

function SpeedGame({ onBack }: { onBack: () => void }) {
  const gi = 2;
  const [phase, setPhase] = useState<"menu" | "playing" | "done">("menu");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<TezQ[]>([]);
  const [current, setCurrent] = useState(0);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const startGame = () => {
    setQuestions(generateTezQuestions(TEZ_TOTAL));
    setCurrent(0); setScore(0); setCorrectCount(0); setFlash(null);
    setPhase("playing");
  };

  const handleAnswer = (chosen: typeof ALL_LETTERS[0]) => {
    if (flash || phase !== "playing") return;
    const q = questions[current];
    const ok = chosen.ar === q.correct.ar;
    const ns = ok ? score + 10 : Math.max(0, score - 3);
    const nc = ok ? correctCount + 1 : correctCount;
    setScore(ns); setCorrectCount(nc);
    setFlash(ok ? "correct" : "wrong");
    setTimeout(() => {
      setFlash(null);
      if (current + 1 >= TEZ_TOTAL) {
        setPhase("done");
        const hi = getHi(gi);
        if (ns > hi) saveHi(gi, ns);
      } else {
        setCurrent((c) => c + 1);
      }
    }, 500);
  };

  if (phase === "menu") return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#6b21a8,#4c1d95)", padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <BackBtn onBack={onBack} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#d8b4fe", letterSpacing: ".08em", textTransform: "uppercase" }}>O'yin 3</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Tez Topish</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>Nomni ko'rib, to'g'ri Arab harfini toping</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 20 }}>
        <div style={{ fontSize: 64 }}>⚡</div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 18, width: "100%", maxWidth: 360 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 10 }}>Qoidalar</div>
          {["Harf nomi ko'rsatiladi (masalan: «Jim»)", "4 ta Arab harfi variantidan to'g'risini tanlang", "To'g'ri javob uchun +10 ball", "Noto'g'ri javob uchun -3 ball", `${TEZ_TOTAL} ta savol, tez javob bering`].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: "linear-gradient(135deg,#6b21a8,#4c1d95)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.4 }}>{r}</div>
            </div>
          ))}
        </div>
        {getHi(gi) > 0 && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Trophy size={16} color="#FFD700" /><span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Rekord: {getHi(gi)}</span></div>}
        <button onClick={startGame} style={{ background: "linear-gradient(135deg,#6b21a8,#4c1d95)", color: "#fff", border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(107,33,168,.35)", display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={20} /> Boshlash
        </button>
      </div>
    </div>
  );

  if (phase === "done") return (
    <DoneScreen gameIdx={gi} score={score} extraLabel="To'g'ri" extraValue={correctCount} onReplay={startGame} onBack={onBack} />
  );

  const q = questions[current];
  const flashBg = flash === "correct" ? "rgba(46,184,46,.15)" : flash === "wrong" ? "rgba(230,0,35,.1)" : "transparent";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#6b21a8,#4c1d95)", padding: "14px 16px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BackBtn onBack={onBack} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{current + 1}/{TEZ_TOTAL}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={15} color="#d8b4fe" />
              <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{score}</span>
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.2)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((current + 1) / TEZ_TOTAL) * 100}%`, borderRadius: 3, background: "#d8b4fe", transition: "width .3s" }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, gap: 20 }}>
        {/* Question */}
        <div style={{ background: flashBg, borderRadius: 20, border: "1px solid rgba(13,58,26,.08)", padding: "30px 24px", textAlign: "center", width: "100%", maxWidth: 360, transition: "background .2s", boxShadow: "0 2px 8px rgba(13,58,26,.06)" }}>
          <div style={{ fontSize: 12, color: T.hint, marginBottom: 6 }}>Quyidagi nomga mos Arab harfini toping:</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: T.green }}>{q?.correct.name}</div>
          {flash && (
            <div style={{ marginTop: 10, fontSize: 24 }}>{flash === "correct" ? "✓" : "✗"}</div>
          )}
        </div>

        {/* Options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 360 }}>
          {q?.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={!!flash}
              style={{
                height: 80,
                borderRadius: 14,
                border: "1.5px solid rgba(13,58,26,.12)",
                background: "#fff",
                cursor: flash ? "default" : "pointer",
                fontFamily: AR,
                fontSize: 36,
                color: T.green,
                boxShadow: "0 1px 3px rgba(13,58,26,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .15s",
              }}
            >
              {opt.ar}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Game 3: Harakat Bilish ─── */

interface HarakatQ { letter: typeof ALL_LETTERS[0]; diacritic: typeof DIACRITICS[0] }

function generateHarakatQuestions(n: number): HarakatQ[] {
  return Array.from({ length: n }, () => ({
    letter: ALL_LETTERS[Math.floor(Math.random() * ALL_LETTERS.length)],
    diacritic: DIACRITICS[Math.floor(Math.random() * DIACRITICS.length)],
  }));
}

const HARAKAT_TOTAL = 15;

function VowelGame({ onBack }: { onBack: () => void }) {
  const gi = 3;
  const [phase, setPhase] = useState<"menu" | "playing" | "done">("menu");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<HarakatQ[]>([]);
  const [current, setCurrent] = useState(0);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const startGame = () => {
    setQuestions(generateHarakatQuestions(HARAKAT_TOTAL));
    setCurrent(0); setScore(0); setCorrectCount(0); setFlash(null);
    setPhase("playing");
  };

  const handleAnswer = (d: typeof DIACRITICS[0]) => {
    if (flash || phase !== "playing") return;
    const q = questions[current];
    const ok = d.mark === q.diacritic.mark;
    const ns = ok ? score + 10 : Math.max(0, score - 3);
    const nc = ok ? correctCount + 1 : correctCount;
    setScore(ns); setCorrectCount(nc);
    setFlash(ok ? "correct" : "wrong");
    setTimeout(() => {
      setFlash(null);
      if (current + 1 >= HARAKAT_TOTAL) {
        setPhase("done");
        const hi = getHi(gi);
        if (ns > hi) saveHi(gi, ns);
      } else {
        setCurrent((c) => c + 1);
      }
    }, 600);
  };

  if (phase === "menu") return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#92400e,#78350f)", padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <BackBtn onBack={onBack} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#fcd34d", letterSpacing: ".08em", textTransform: "uppercase" }}>O'yin 4</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Harakat Bilish</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>Harakatni ko'rib, uning turini aniqlang</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 20 }}>
        <div style={{ fontSize: 64 }}>🎯</div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 18, width: "100%", maxWidth: 360 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 10 }}>Harakatlar eslatma</div>
          {DIACRITICS.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(13,58,26,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: AR, fontSize: 24, flexShrink: 0 }}>
                ب{d.mark}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{d.name}</div>
                <div style={{ fontSize: 11, color: T.hint }}>{d.uzbek}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 4, fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
            To'g'ri javob uchun +10, noto'g'ri uchun -3 ball.
          </div>
        </div>
        {getHi(gi) > 0 && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Trophy size={16} color="#FFD700" /><span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Rekord: {getHi(gi)}</span></div>}
        <button onClick={startGame} style={{ background: "linear-gradient(135deg,#92400e,#78350f)", color: "#fff", border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(146,64,14,.35)", display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={20} /> Boshlash
        </button>
      </div>
    </div>
  );

  if (phase === "done") return (
    <DoneScreen gameIdx={gi} score={score} extraLabel="To'g'ri" extraValue={correctCount} onReplay={startGame} onBack={onBack} />
  );

  const q = questions[current];
  const display = `${q?.letter.ar ?? ""}${q?.diacritic.mark ?? ""}`;
  const flashBg = flash === "correct" ? "rgba(46,184,46,.15)" : flash === "wrong" ? "rgba(230,0,35,.1)" : "transparent";

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#92400e,#78350f)", padding: "14px 16px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BackBtn onBack={onBack} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{current + 1}/{HARAKAT_TOTAL}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={15} color="#fcd34d" />
              <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{score}</span>
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.2)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((current + 1) / HARAKAT_TOTAL) * 100}%`, borderRadius: 3, background: "#fcd34d", transition: "width .3s" }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, gap: 24 }}>
        {/* Big letter + diacritic */}
        <div style={{ background: flashBg, borderRadius: 24, border: "1px solid rgba(13,58,26,.08)", padding: "36px 40px", textAlign: "center", transition: "background .2s", boxShadow: "0 2px 10px rgba(13,58,26,.08)" }}>
          <div style={{ fontSize: 12, color: T.hint, marginBottom: 8 }}>Bu harakatning turi qaysi?</div>
          <div style={{ fontFamily: AR, fontSize: 80, color: T.green, lineHeight: 1.4 }}>{display}</div>
          {flash && <div style={{ marginTop: 12, fontSize: 28 }}>{flash === "correct" ? "✓" : "✗"}</div>}
        </div>

        {/* 4 answer buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 360 }}>
          {DIACRITICS.map((d, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(d)}
              disabled={!!flash}
              style={{
                padding: "16px 12px",
                borderRadius: 14,
                border: "1.5px solid rgba(13,58,26,.12)",
                background: "#fff",
                cursor: flash ? "default" : "pointer",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(13,58,26,.08)",
                transition: "all .15s",
              }}
            >
              <div style={{ fontFamily: AR, fontSize: 22, color: T.green, marginBottom: 4 }}>ب{d.mark}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{d.name}</div>
              <div style={{ fontSize: 10, color: T.hint, marginTop: 2 }}>{d.uzbek}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Game Hub ─── */

function GameHub({ onSelect }: { onSelect: (g: number) => void }) {
  const todayIdx = getDayOfYear() % 4;
  const COLORS = [T.gGreen, "linear-gradient(135deg,#1e4a8a,#0f2d5c)", "linear-gradient(135deg,#6b21a8,#4c1d95)", "linear-gradient(135deg,#92400e,#78350f)"];
  const ACCENT = [T.limeBrt, "#93c5fd", "#d8b4fe", "#fcd34d"];

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 18px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Mini-o'yinlar</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>O'yin Markazi</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 4 }}>Arab fonetikasini o'yin orqali mustahkamlang</div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px" }}>
        {/* Today's featured */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <Star size={12} color={T.lime} /> Bugungi tavsiya
          </div>
          <button
            onClick={() => onSelect(todayIdx)}
            style={{ width: "100%", background: COLORS[todayIdx], borderRadius: 18, border: "none", padding: "20px", cursor: "pointer", textAlign: "left", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.18)" }}
          >
            <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 12 }}>{GAME_META[todayIdx].emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: ACCENT[todayIdx], letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
                Bugun tavsiya etiladi
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{GAME_META[todayIdx].name}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.75)", marginBottom: 14 }}>{GAME_META[todayIdx].desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ background: ACCENT[todayIdx], color: "#000", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  O'ynash <ArrowRight size={13} />
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>
                  {GAME_META[todayIdx].time}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* All games */}
        <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>
          Barcha o'yinlar
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {GAME_META.map((gm, i) => {
            const hi = getHi(i);
            const isToday = i === todayIdx;
            return (
              <button
                key={i}
                onClick={() => onSelect(i)}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: isToday ? `2px solid ${T.lime}` : "1px solid rgba(13,58,26,.08)",
                  padding: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textAlign: "left",
                  boxShadow: isToday ? `0 2px 12px rgba(46,184,46,.2)` : "0 1px 2px rgba(13,58,26,.04)",
                  transition: "all .15s",
                }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: COLORS[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                  {gm.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{gm.name}</span>
                    {isToday && <span style={{ fontSize: 10, background: T.gLime, color: T.onCta, borderRadius: 5, padding: "2px 7px", fontWeight: 700 }}>Bugun</span>}
                  </div>
                  <div style={{ fontSize: 12, color: T.hint, marginTop: 2, marginBottom: 4 }}>{gm.desc}</div>
                  <div style={{ fontSize: 11, color: T.text2 }}>
                    {gm.time}
                    {hi > 0 && <span style={{ marginLeft: 8, color: "#FFD700", fontWeight: 700 }}>★ {hi}</span>}
                  </div>
                </div>
                <ArrowRight size={16} color={T.hint} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */

export function GameView() {
  const [game, setGame] = useState<number | null>(null);

  if (game === null) return <GameHub onSelect={setGame} />;
  if (game === 0) return <MatchingGame onBack={() => setGame(null)} />;
  if (game === 1) return <AbjadGame onBack={() => setGame(null)} />;
  if (game === 2) return <SpeedGame onBack={() => setGame(null)} />;
  return <VowelGame onBack={() => setGame(null)} />;
}
