import { useMemo, useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { T } from "../theme/tokens";
import { Card } from "./ui";

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

/** Umumiy test komponenti. Variantlar aralashtiriladi; topshirilgach natija ko'rsatiladi. */
export function Quiz({
  questions,
  onDone,
}: {
  questions: QuizQuestion[];
  onDone?: (ok: number, tot: number) => void;
}) {
  // Variantlarni bir marta aralashtirish (savol matni o'zgarmaguncha barqaror)
  const prepared = useMemo(
    () => questions.map((qq) => ({ q: qq.q, options: shuffle(qq.options) })),
    [questions],
  );
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  const ok = prepared.filter((qq, i) => qq.options[answers[i]]?.correct).length;
  const tot = prepared.length;
  const allAnswered = Object.keys(answers).length === tot;

  const submit = () => {
    setDone(true);
    onDone?.(ok, tot);
  };
  const retry = () => {
    setAnswers({});
    setDone(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {prepared.map((qq, qi) => {
        const ar = isAr(qq.q);
        return (
          <Card key={qi} style={{ padding: 14 }}>
            <div
              style={{
                fontSize: ar ? 18 : 14,
                fontWeight: 600,
                color: T.green,
                marginBottom: 10,
                direction: ar ? "rtl" : "ltr",
                fontFamily: ar ? undefined : "inherit",
              }}
            >
              {qi + 1}. {qq.q}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {qq.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const showCorrect = done && opt.correct;
                const showWrong = done && selected && !opt.correct;
                const oar = isAr(opt.text);
                let bg = "rgba(13,58,26,.04)";
                let bd = "1px solid rgba(13,58,26,.10)";
                let col = T.text;
                if (showCorrect) {
                  bg = "rgba(46,184,46,.14)";
                  bd = "1px solid rgba(46,184,46,.5)";
                  col = T.green500;
                } else if (showWrong) {
                  bg = "rgba(230,0,35,.10)";
                  bd = "1px solid rgba(230,0,35,.4)";
                  col = T.red;
                } else if (selected) {
                  bg = "rgba(46,184,46,.10)";
                  bd = `1px solid ${T.lime}`;
                }
                return (
                  <button
                    key={oi}
                    disabled={done}
                    onClick={() => setAnswers((p) => ({ ...p, [qi]: oi }))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      textAlign: oar ? "right" : "left",
                      flexDirection: oar ? "row-reverse" : "row",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: bd,
                      background: bg,
                      color: col,
                      cursor: done ? "default" : "pointer",
                      fontSize: oar ? 16 : 13,
                      fontWeight: oar ? 600 : 500,
                      direction: oar ? "rtl" : "ltr",
                      width: "100%",
                    }}
                  >
                    <span style={{ flex: 1 }}>{opt.text}</span>
                    {showCorrect && <CheckCircle size={16} color={T.lime} style={{ flexShrink: 0 }} />}
                    {showWrong && <XCircle size={16} color={T.red} style={{ flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          </Card>
        );
      })}

      {!done ? (
        <button
          onClick={submit}
          disabled={!allAnswered}
          style={{
            background: allAnswered ? T.gLime : "rgba(13,58,26,.12)",
            color: allAnswered ? T.onCta : T.hint,
            border: "none",
            borderRadius: 12,
            padding: "13px",
            fontSize: 14,
            fontWeight: 600,
            cursor: allAnswered ? "pointer" : "default",
            boxShadow: allAnswered ? "0 2px 8px rgba(46,184,46,.3)" : "none",
          }}
        >
          {allAnswered ? "Topshirish" : `Barcha savolga javob bering (${Object.keys(answers).length}/${tot})`}
        </button>
      ) : (
        <Card style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: ok / tot >= 0.8 ? T.lime : T.red }}>
            {Math.round((ok / tot) * 100)}%
          </div>
          <div style={{ fontSize: 13, color: T.text2, marginTop: 4 }}>
            {tot} tadan {ok} ta to'g'ri
          </div>
          <button
            onClick={retry}
            style={{
              marginTop: 12,
              background: "rgba(13,58,26,.07)",
              border: "1px solid rgba(13,58,26,.12)",
              borderRadius: 10,
              padding: "9px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: T.text2,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <RotateCcw size={14} /> Qayta urinish
          </button>
        </Card>
      )}
    </div>
  );
}
