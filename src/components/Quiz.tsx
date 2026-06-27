import { useMemo, useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Trophy, AlertCircle } from "lucide-react";
import { T, FONT, AR } from "../theme/tokens";

export interface QuizQuestion {
  q: string;
  options: { text: string; correct: boolean }[];
}

const isAr = (s: string) => /[؀-ۿ]/.test(s);

const shuffle = <X,>(arr: X[]): X[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const LABELS = ["A", "B", "C", "D"];

export function Quiz({ questions, onDone }: { questions: QuizQuestion[]; onDone?: (ok: number, tot: number) => void }) {
  const prepared = useMemo(
    () => questions.map((qq) => ({ q: qq.q, options: shuffle(qq.options) })),
    [questions],
  );

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  const tot = prepared.length;
  const answered = Object.keys(answers).length;
  const allAnswered = answered === tot;
  const ok = prepared.filter((qq, i) => qq.options[answers[i]]?.correct).length;
  const pct = Math.round((ok / tot) * 100);
  const passed = pct >= 80;

  const submit = () => {
    setDone(true);
    onDone?.(ok, tot);
  };

  const retry = () => {
    setAnswers({});
    setDone(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.text2 }}>
            {done ? "Natija" : `${answered} / ${tot} savol`}
          </span>
          {!done && (
            <div style={{ display: "flex", gap: 4 }}>
              {prepared.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 24,
                    height: 6,
                    borderRadius: 3,
                    background: answers[i] !== undefined
                      ? T.lime
                      : "rgba(13,58,26,.1)",
                    transition: "background .2s",
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {done && (
          <div style={{ height: 8, borderRadius: 4, background: "rgba(13,58,26,.08)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: passed ? T.gLime : "linear-gradient(90deg,#ff6b6b,#E60023)", transition: "width .6s ease" }} />
          </div>
        )}
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {prepared.map((qq, qi) => {
          const qAr = isAr(qq.q);
          return (
            <div
              key={qi}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(13,58,26,.09)",
                boxShadow: "0 2px 8px rgba(13,58,26,.06)",
                overflow: "hidden",
              }}
            >
              {/* Question header */}
              <div style={{ background: "rgba(13,58,26,.03)", padding: "14px 16px", borderBottom: "1px solid rgba(13,58,26,.07)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 8,
                    background: answers[qi] !== undefined ? T.gLime : T.gGreen,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0,
                    transition: "background .2s",
                  }}>
                    {qi + 1}
                  </div>
                  <div
                    style={{
                      fontSize: qAr ? 18 : 14,
                      fontWeight: 600,
                      color: T.green,
                      lineHeight: 1.4,
                      fontFamily: qAr ? AR : FONT,
                      direction: qAr ? "rtl" : "ltr",
                      flex: 1,
                      paddingTop: 3,
                    }}
                  >
                    {qq.q}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                {qq.options.map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  const showCorrect = done && opt.correct;
                  const showWrong = done && selected && !opt.correct;
                  const oAr = isAr(opt.text);

                  let bg = "rgba(13,58,26,.03)";
                  let border = "1px solid rgba(13,58,26,.09)";
                  let labelBg = "rgba(13,58,26,.08)";
                  let labelColor = T.hint;
                  let textColor = T.text;

                  if (showCorrect) {
                    bg = "rgba(46,184,46,.1)";
                    border = "1.5px solid #2EB82E";
                    labelBg = T.lime;
                    labelColor = T.onCta;
                    textColor = T.green;
                  } else if (showWrong) {
                    bg = "rgba(230,0,35,.07)";
                    border = "1.5px solid rgba(230,0,35,.4)";
                    labelBg = "rgba(230,0,35,.15)";
                    labelColor = T.red;
                    textColor = T.red;
                  } else if (selected) {
                    bg = "rgba(46,184,46,.08)";
                    border = `1.5px solid ${T.lime}`;
                    labelBg = T.gLime;
                    labelColor = T.onCta;
                    textColor = T.green;
                  }

                  return (
                    <button
                      key={oi}
                      disabled={done}
                      onClick={() => !done && setAnswers((p) => ({ ...p, [qi]: oi }))}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 11,
                        border,
                        background: bg,
                        cursor: done ? "default" : "pointer",
                        width: "100%",
                        textAlign: oAr ? "right" : "left",
                        flexDirection: oAr ? "row-reverse" : "row",
                        transition: "all .15s",
                      }}
                    >
                      {/* Letter label */}
                      <div style={{
                        width: 26, height: 26, borderRadius: 7,
                        background: labelBg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 800, color: labelColor,
                        flexShrink: 0, transition: "all .15s",
                      }}>
                        {LABELS[oi]}
                      </div>

                      <span style={{
                        flex: 1,
                        fontSize: oAr ? 17 : 13,
                        fontWeight: oAr ? 700 : 500,
                        color: textColor,
                        fontFamily: oAr ? AR : FONT,
                        direction: oAr ? "rtl" : "ltr",
                        lineHeight: 1.4,
                        transition: "color .15s",
                      }}>
                        {opt.text}
                      </span>

                      {showCorrect && <CheckCircle size={17} color="#2EB82E" style={{ flexShrink: 0 }} />}
                      {showWrong && <XCircle size={17} color={T.red} style={{ flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit / Result */}
      <div style={{ marginTop: 16 }}>
        {!done ? (
          <button
            onClick={submit}
            disabled={!allAnswered}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: allAnswered ? T.gLime : "rgba(13,58,26,.08)",
              color: allAnswered ? T.onCta : T.hint,
              fontSize: 14,
              fontWeight: 700,
              cursor: allAnswered ? "pointer" : "default",
              boxShadow: allAnswered ? "0 4px 12px rgba(46,184,46,.35)" : "none",
              transition: "all .2s",
            }}
          >
            {allAnswered ? "✓ Topshirish" : `Barcha savolga javob bering (${answered}/${tot})`}
          </button>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", boxShadow: "0 2px 8px rgba(13,58,26,.07)", overflow: "hidden" }}>
            {/* Result header */}
            <div style={{
              background: passed ? "linear-gradient(135deg,#2EB82E,#1a8a1a)" : "linear-gradient(135deg,#E60023,#a8001a)",
              padding: "20px 16px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 36, marginBottom: 4 }}>
                {passed ? <Trophy size={40} color="#FFD700" style={{ margin: "0 auto" }} /> : <AlertCircle size={40} color="#fff" style={{ margin: "0 auto" }} />}
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", marginTop: 4 }}>
                {tot} tadan {ok} ta to'g'ri
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ flex: 1, textAlign: "center", background: "rgba(46,184,46,.08)", borderRadius: 10, padding: "10px 8px" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.lime }}>{ok}</div>
                  <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>To'g'ri</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", background: "rgba(230,0,35,.06)", borderRadius: 10, padding: "10px 8px" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.red }}>{tot - ok}</div>
                  <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>Xato</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", background: "rgba(13,58,26,.05)", borderRadius: 10, padding: "10px 8px" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>{pct}%</div>
                  <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>Natija</div>
                </div>
              </div>

              {!passed && (
                <div style={{ fontSize: 12, color: T.hint, textAlign: "center", marginBottom: 12, background: "rgba(230,0,35,.05)", borderRadius: 8, padding: "8px 12px" }}>
                  O'tish uchun <strong style={{ color: T.green }}>80%</strong> kerak — mavzuni qayta o'qib, urinib ko'ring
                </div>
              )}

              <button
                onClick={retry}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid rgba(13,58,26,.15)",
                  background: "rgba(13,58,26,.04)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.text2,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                }}
              >
                <RotateCcw size={15} /> Qayta urinish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
