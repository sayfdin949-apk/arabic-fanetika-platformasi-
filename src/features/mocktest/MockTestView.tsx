import { useState, useEffect, useCallback } from "react";
import { Clock, ChevronRight, Trophy, RotateCcw, CheckCircle2, XCircle, Coins } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { useCoins } from "../../context/CoinContext";
import { useProgress } from "../progress/ProgressContext";
import { MOCK_TESTLAR, type MockTest, type MockSavol } from "../../content/mockTestlar";

const resultKey = (uid: string) => `afp:mock_results_${uid}`;

interface TestResult {
  testId: number;
  ball: number; // 0-100
  togrilar: number;
  jami: number;
  sana: string;
}

function loadResults(uid: string): Record<number, TestResult> {
  try {
    const raw = localStorage.getItem(resultKey(uid));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveResult(uid: string, result: TestResult, existing: Record<number, TestResult>) {
  const updated = { ...existing, [result.testId]: result };
  try { localStorage.setItem(resultKey(uid), JSON.stringify(updated)); } catch { /* ignore */ }
  return updated;
}

const DARAJA_RANG: Record<string, string> = {
  A0: "#0891B2", A1: "#2563EB", A2: "#059669",
  B1: "#CA8A04", B2: "#DC2626", C1: "#7C3AED", C2: "#BE185D",
};

// ---- TestCard ----
function TestCard({
  test,
  natija,
  onStart,
}: {
  test: MockTest;
  natija?: TestResult;
  onStart: () => void;
}) {
  const ball = natija?.ball ?? 0;
  return (
    <div
      style={{
        background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)",
        boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden",
      }}
    >
      {/* Top band */}
      <div style={{ background: `linear-gradient(135deg,${test.rang}22,${test.rang}44)`, padding: "14px 16px 12px", borderBottom: `2px solid ${test.rang}25` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>{test.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{test.nomi}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 3, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: DARAJA_RANG[test.daraja], color: "#fff", borderRadius: 6, padding: "1px 7px" }}>{test.daraja}</span>
              <span style={{ fontSize: 10, color: T.hint, display: "flex", alignItems: "center", gap: 3 }}>
                <Clock size={9} /> {test.davomiylik} daq
              </span>
              <span style={{ fontSize: 10, color: T.hint }}>{test.savollar.length} savol</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 16px" }}>
        {/* Natija progress */}
        {natija && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: T.hint }}>Oxirgi natija:</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: ball >= 80 ? T.lime : ball >= 50 ? "#CA8A04" : "#DC2626" }}>
                {ball}%
              </span>
            </div>
            <div style={{ height: 5, background: "rgba(13,58,26,.08)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${ball}%`, background: ball >= 80 ? T.lime : ball >= 50 ? "#CA8A04" : "#DC2626", borderRadius: 3, transition: "width .4s" }} />
            </div>
          </div>
        )}

        <button
          onClick={onStart}
          style={{
            width: "100%", padding: "11px", borderRadius: 11, border: "none",
            background: natija ? "rgba(13,58,26,.07)" : `linear-gradient(135deg,${test.rang},${test.rang}cc)`,
            color: natija ? T.text2 : "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          {natija ? <><RotateCcw size={14} /> Qayta topshirish</> : <><ChevronRight size={14} /> Boshlash</>}
        </button>
      </div>
    </div>
  );
}

// ---- Active test ----
function ActiveTest({
  test,
  onFinish,
}: {
  test: MockTest;
  onFinish: (togrilar: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<(number | null)[]>(Array(test.savollar.length).fill(null));
  const [showIzoh, setShowIzoh] = useState(false);
  const [qolganVaqt, setQolganVaqt] = useState(test.davomiylik * 60);

  const savol: MockSavol = test.savollar[current];
  const isLast = current === test.savollar.length - 1;

  const finish = useCallback(() => {
    const togrilar = answered.filter((a, i) => a === test.savollar[i].togri).length;
    onFinish(togrilar);
  }, [answered, test.savollar, onFinish]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQolganVaqt((v) => {
        if (v <= 1) { clearInterval(timer); finish(); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finish]);

  const handleSelect = (idx: number) => {
    if (answered[current] !== null) return;
    setSelected(idx);
    const updated = [...answered];
    updated[current] = idx;
    setAnswered(updated);
    setShowIzoh(true);
  };

  const handleNext = () => {
    if (isLast) {
      finish();
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setShowIzoh(false);
  };

  const min = Math.floor(qolganVaqt / 60);
  const sec = qolganVaqt % 60;
  const vaqtRang = qolganVaqt < 60 ? "#DC2626" : qolganVaqt < 120 ? "#CA8A04" : T.hint;

  const pct = ((current + 1) / test.savollar.length) * 100;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: T.gGreen, padding: "14px 16px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{test.nomi}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.15)", borderRadius: 10, padding: "5px 10px" }}>
              <Clock size={13} color={vaqtRang} />
              <span style={{ fontSize: 13, fontWeight: 700, color: vaqtRang === T.hint ? "#fff" : vaqtRang }}>
                {min}:{String(sec).padStart(2, "0")}
              </span>
            </div>
          </div>
          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,.2)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: T.gLime, borderRadius: 2, transition: "width .3s" }} />
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)", flexShrink: 0 }}>{current + 1}/{test.savollar.length}</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "18px 16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Savol */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "18px 16px", border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, marginBottom: 10, textTransform: "uppercase", letterSpacing: ".05em" }}>
            {current + 1}-savol
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.green, marginBottom: savol.arabcha ? 12 : 0, lineHeight: 1.5 }}>
            {savol.matn}
          </div>
          {savol.arabcha && (
            <div style={{ textAlign: "right", background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(13,58,26,.08)" }}>
              <span style={{ fontFamily: AR, fontSize: 28, color: T.green, lineHeight: 1.6 }}>
                {savol.arabcha}
              </span>
            </div>
          )}
        </div>

        {/* Variantlar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {savol.variantlar.map((v, i) => {
            const isAnswered = answered[current] !== null;
            const isSelected = selected === i;
            const isCorrect = i === savol.togri;
            let bg = "#fff";
            let borderCol = "rgba(13,58,26,.12)";
            let textCol = T.text;
            if (isAnswered) {
              if (isCorrect) { bg = "rgba(46,184,46,.1)"; borderCol = T.lime; textCol = T.green; }
              else if (isSelected) { bg = "rgba(220,38,38,.08)"; borderCol = "#DC2626"; textCol = "#DC2626"; }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${borderCol}`,
                  background: bg, cursor: isAnswered ? "default" : "pointer",
                  textAlign: "left", fontSize: 13, fontWeight: isSelected || (isAnswered && isCorrect) ? 700 : 500,
                  color: textCol, display: "flex", alignItems: "center", gap: 10,
                  transition: "border-color .15s, background .15s",
                }}
              >
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: isAnswered ? (isCorrect ? T.lime : isSelected ? "#DC2626" : "rgba(13,58,26,.07)") : "rgba(13,58,26,.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: isAnswered && (isCorrect || isSelected) ? "#fff" : T.hint, flexShrink: 0 }}>
                  {isAnswered ? (isCorrect ? "✓" : isSelected ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                </span>
                {v}
              </button>
            );
          })}
        </div>

        {/* Izoh */}
        {showIzoh && savol.izoh && (
          <div style={{ background: "rgba(13,58,26,.06)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(13,58,26,.1)", fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
            💡 {savol.izoh}
          </div>
        )}

        {/* Keyingi */}
        {answered[current] !== null && (
          <button
            onClick={handleNext}
            style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            {isLast ? "Testni yakunlash" : "Keyingi savol →"}
          </button>
        )}
      </div>
    </div>
  );
}

// ---- Result ----
function ResultScreen({
  test,
  togrilar,
  coinEarned,
  onRetry,
  onBack,
}: {
  test: MockTest;
  togrilar: number;
  coinEarned: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const ball = Math.round((togrilar / test.savollar.length) * 100);
  const passed = ball >= 80;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
      <div style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Icon */}
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: passed ? "rgba(46,184,46,.15)" : "rgba(220,38,38,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {passed
            ? <Trophy size={36} color={T.lime} />
            : <XCircle size={36} color="#DC2626" />}
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.green }}>{ball}%</div>
          <div style={{ fontSize: 14, color: T.text2, marginTop: 4 }}>
            {togrilar}/{test.savollar.length} ta to'g'ri javob
          </div>
        </div>

        {/* Coin */}
        {coinEarned > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(252,211,77,.15)", border: "1px solid #FCD34D", borderRadius: 12, padding: "10px 18px" }}>
            <Coins size={18} color="#CA8A04" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#92400E" }}>+{coinEarned} coin</span>
          </div>
        )}

        {/* Status card */}
        <div style={{ width: "100%", background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)" }}>
          {passed ? (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <CheckCircle2 size={18} color={T.lime} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 3 }}>Tabriklaymiz!</div>
                <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>80% dan yuqori natija. Siz bu darajani muvaffaqiyatli o'tdingiz.</div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <XCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#991B1B", marginBottom: 3 }}>Yana urinib ko'ring</div>
                <div style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5 }}>80% bo'lsa coin olasiz. Darslarni takrorlab qayta topshiring.</div>
              </div>
            </div>
          )}
        </div>

        {/* Tugmalar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <button onClick={onRetry} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <RotateCcw size={14} /> Qayta topshirish
          </button>
          <button onClick={onBack} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "1px solid rgba(13,58,26,.15)", background: "#fff", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Testlar ro'yxatiga qaytish
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main view ----
export function MockTestView() {
  const { user } = useAuth();
  const { addCoins } = useCoins();
  const { touchStreak } = useProgress();
  const [results, setResults] = useState<Record<number, TestResult>>(() => user ? loadResults(user.id) : {});
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [resultState, setResultState] = useState<{ togrilar: number; coinEarned: number } | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const handleFinish = (togrilar: number) => {
    if (!user || !activeTest) return;
    const ball = Math.round((togrilar / activeTest.savollar.length) * 100);
    const coinEarned = ball >= 80 ? 15 : 0;
    if (coinEarned > 0) addCoins(coinEarned);
    touchStreak();
    const result: TestResult = {
      testId: activeTest.id,
      ball,
      togrilar,
      jami: activeTest.savollar.length,
      sana: new Date().toISOString(),
    };
    const updated = saveResult(user.id, result, results);
    setResults(updated);
    setResultState({ togrilar, coinEarned });
  };

  const handleRetry = () => {
    setResultState(null);
    setRetryKey((k) => k + 1);
  };

  const handleBack = () => {
    setResultState(null);
    setActiveTest(null);
  };

  if (!user) return null;

  if (activeTest && resultState) {
    return <ResultScreen test={activeTest} togrilar={resultState.togrilar} coinEarned={resultState.coinEarned} onRetry={handleRetry} onBack={handleBack} />;
  }

  if (activeTest) {
    return <ActiveTest key={activeTest.id + "-" + retryKey} test={activeTest} onFinish={handleFinish} />;
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Baholash</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Mock testlar</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            {Object.keys(results).length}/{MOCK_TESTLAR.length} test topshirilgan
          </div>
          {/* Coin info */}
          <div style={{ marginTop: 10, background: "rgba(255,255,255,.1)", borderRadius: 10, padding: "8px 12px", fontSize: 11, color: "rgba(255,255,255,.75)", display: "flex", gap: 6 }}>
            <Coins size={13} color="#FCD34D" />
            <span>80%+ → <b>+15 coin</b> mukofot</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 14px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
        {MOCK_TESTLAR.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            natija={results[test.id]}
            onStart={() => { setResultState(null); setActiveTest(test); }}
          />
        ))}
      </div>
    </div>
  );
}
