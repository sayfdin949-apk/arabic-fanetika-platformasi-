/* Markdown renderer — asl prototipdan ko'chirildi (tiplar qo'shildi) */
import type { ReactNode } from "react";
import { T, FONT, AR } from "../theme/tokens";

export function MD({ text, compact = false }: { text?: string; compact?: boolean }) {
  if (!text) return null;
  const lines = text.split("\n");
  const els: ReactNode[] = [];
  let tb: string[][] = [];
  let inT = false;
  let k = 0;
  const isAr = (s: string) => /[؀-ۿ]/.test(s);
  const flush = () => {
    if (!tb.length) return;
    els.push(
      <div key={k++} style={{ overflowX: "auto", margin: "10px 0" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
          <tbody>
            {tb.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  background: ri === 0 ? "rgba(13,58,26,.07)" : "transparent",
                  borderBottom: "1px solid rgba(13,58,26,.07)",
                }}
              >
                {row.map((c, ci) => {
                  const ar = isAr(c.trim());
                  return (
                    <td
                      key={ci}
                      style={{
                        padding: "5px 9px",
                        color: ri === 0 ? T.green : T.text,
                        fontWeight: ri === 0 ? 600 : 400,
                        border: "1px solid rgba(13,58,26,.07)",
                        fontFamily: ar ? AR : FONT,
                        fontSize: ar ? 17 : 12,
                        direction: ar ? "rtl" : "ltr",
                        textAlign: ar ? "right" : "left",
                      }}
                    >
                      {c.trim()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    tb = [];
    inT = false;
  };
  const b = (s: string) =>
    s.replace(/\*\*([^*]+)\*\*/g, (_m, g: string) => {
      const ar = isAr(g);
      return `<strong style="color:${T.green500};font-weight:600;${
        ar ? `font-family:${AR};font-size:17px` : ""
      }">${g}</strong>`;
    });
  lines.forEach((ln) => {
    if (ln.startsWith("|")) {
      if (!ln.includes("---")) {
        tb.push(ln.split("|").filter((_, i, a) => i > 0 && i < a.length - 1));
        inT = true;
      }
      return;
    }
    if (inT) flush();
    const fs = compact ? 12 : 13;
    if (ln.startsWith("# "))
      els.push(
        <h1
          key={k++}
          style={{ fontSize: compact ? 17 : 20, fontWeight: 600, color: T.green, margin: "0 0 10px", letterSpacing: "-.015em" }}
        >
          {ln.slice(2)}
        </h1>,
      );
    else if (ln.startsWith("## "))
      els.push(
        <h2 key={k++} style={{ fontSize: compact ? 13 : 15, fontWeight: 600, color: T.green, margin: "14px 0 4px" }}>
          {ln.slice(3)}
        </h2>,
      );
    else if (ln.startsWith("### "))
      els.push(
        <h3 key={k++} style={{ fontSize: compact ? 12 : 13, fontWeight: 600, color: T.text2, margin: "10px 0 3px" }}>
          {ln.slice(4)}
        </h3>,
      );
    else if (ln.startsWith("---"))
      els.push(<div key={k++} style={{ height: 1, background: "rgba(13,58,26,.1)", margin: "11px 0" }} />);
    else if (ln.startsWith("- "))
      els.push(
        <div key={k++} style={{ display: "flex", gap: 7, fontSize: fs, color: T.text, margin: "2px 0", paddingLeft: 8, lineHeight: 1.6 }}>
          <span style={{ color: T.lime, flexShrink: 0, marginTop: 2 }}>▸</span>
          <span dangerouslySetInnerHTML={{ __html: b(ln.slice(2)) }} />
        </div>,
      );
    else if (ln.trim())
      els.push(
        <p key={k++} style={{ fontSize: fs, color: T.text, margin: "3px 0", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: b(ln) }} />,
      );
    else els.push(<div key={k++} style={{ height: 4 }} />);
  });
  if (inT) flush();
  return <div style={{ fontFamily: FONT, WebkitFontSmoothing: "antialiased" }}>{els}</div>;
}
