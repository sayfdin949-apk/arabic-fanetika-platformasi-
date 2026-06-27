import type { ReactNode } from "react";
import { T, FONT, AR } from "../theme/tokens";

const isAr = (s: string) => /[؀-ۿ]/.test(s);

function bold(s: string): string {
  return s.replace(/\*\*([^*]+)\*\*/g, (_m, g: string) => {
    const ar = isAr(g);
    return `<strong style="color:${T.green};font-weight:700;${
      ar ? `font-family:${AR};font-size:1.15em` : ""
    }">${g}</strong>`;
  });
}

export function MD({ text, compact = false }: { text?: string; compact?: boolean }) {
  if (!text) return null;

  const lines = text.split("\n");
  const els: ReactNode[] = [];
  let tb: string[][] = [];
  let inT = false;
  let k = 0;

  const flush = () => {
    if (!tb.length) return;
    const header = tb[0];
    const rows = tb.slice(1);
    els.push(
      <div key={k++} style={{ overflowX: "auto", margin: "14px 0", borderRadius: 12, border: "1px solid rgba(13,58,26,.1)", boxShadow: "0 1px 4px rgba(13,58,26,.06)" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 280 }}>
          <thead>
            <tr style={{ background: T.gGreen }}>
              {header.map((c, ci) => (
                <th key={ci} style={{ padding: "9px 12px", color: "#fff", fontSize: 11, fontWeight: 700, textAlign: "left", letterSpacing: ".03em", whiteSpace: "nowrap" }}>
                  {c.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              return (
                <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "rgba(13,58,26,.03)", borderBottom: "1px solid rgba(13,58,26,.06)" }}>
                  {row.map((c, ci) => {
                    const ar = isAr(c.trim());
                    return (
                      <td key={ci} style={{
                        padding: "9px 12px",
                        color: ar ? T.green : T.text,
                        fontSize: ar ? 18 : 13,
                        fontFamily: ar ? AR : FONT,
                        direction: ar ? "rtl" : "ltr",
                        textAlign: ar ? "right" : "left",
                        fontWeight: ar ? 700 : 400,
                        lineHeight: 1.4,
                      }}>
                        {c.trim()}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>,
    );
    tb = [];
    inT = false;
  };

  lines.forEach((ln) => {
    if (ln.startsWith("|")) {
      if (!ln.includes("---")) {
        tb.push(ln.split("|").filter((_, i, a) => i > 0 && i < a.length - 1));
        inT = true;
      }
      return;
    }
    if (inT) flush();

    const fs = compact ? 12 : 14;

    if (ln.startsWith("# ")) {
      const txt = ln.slice(2);
      els.push(
        <div key={k++} style={{ margin: compact ? "0 0 12px" : "0 0 16px" }}>
          <h1 style={{ fontSize: compact ? 17 : 21, fontWeight: 700, color: T.green, margin: 0, letterSpacing: "-.02em", lineHeight: 1.2 }}>
            {txt}
          </h1>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: T.gLimeH, marginTop: 8 }} />
        </div>,
      );
    } else if (ln.startsWith("## ")) {
      const txt = ln.slice(3);
      els.push(
        <div key={k++} style={{ display: "flex", alignItems: "center", gap: 8, margin: compact ? "12px 0 6px" : "18px 0 8px" }}>
          <div style={{ width: 4, height: 18, borderRadius: 2, background: T.gLime, flexShrink: 0 }} />
          <h2 style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: T.green, margin: 0 }}>{txt}</h2>
        </div>,
      );
    } else if (ln.startsWith("### ")) {
      const txt = ln.slice(4);
      els.push(
        <h3 key={k++} style={{ fontSize: compact ? 12 : 13, fontWeight: 600, color: T.green500, margin: compact ? "8px 0 3px" : "12px 0 4px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.lime, display: "inline-block", flexShrink: 0 }} />
          {txt}
        </h3>,
      );
    } else if (ln.startsWith("---")) {
      els.push(
        <div key={k++} style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(13,58,26,.1)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(13,58,26,.2)" }} />
          <div style={{ flex: 1, height: 1, background: "rgba(13,58,26,.1)" }} />
        </div>,
      );
    } else if (ln.startsWith("- ")) {
      const content = ln.slice(2);
      const ar = isAr(content);
      els.push(
        <div key={k++} style={{ display: "flex", gap: 10, fontSize: fs, color: T.text, margin: "4px 0", lineHeight: 1.65, alignItems: "flex-start" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime, flexShrink: 0, marginTop: "0.45em" }} />
          <span
            style={{ fontFamily: ar ? AR : undefined, fontSize: ar ? fs * 1.2 : fs, direction: ar ? "rtl" : "ltr" }}
            dangerouslySetInnerHTML={{ __html: bold(content) }}
          />
        </div>,
      );
    } else if (ln.trim()) {
      const ar = isAr(ln);
      els.push(
        <p
          key={k++}
          style={{
            fontSize: ar ? fs * 1.25 : fs,
            color: T.text,
            margin: "4px 0",
            lineHeight: 1.75,
            fontFamily: ar ? AR : undefined,
            direction: ar ? "rtl" : "ltr",
          }}
          dangerouslySetInnerHTML={{ __html: bold(ln) }}
        />,
      );
    } else {
      els.push(<div key={k++} style={{ height: compact ? 4 : 6 }} />);
    }
  });

  if (inT) flush();
  return <div style={{ fontFamily: FONT, WebkitFontSmoothing: "antialiased" }}>{els}</div>;
}
