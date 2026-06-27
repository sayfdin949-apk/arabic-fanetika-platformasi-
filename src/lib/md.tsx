import type { ReactNode } from "react";
import { T, FONT, AR } from "../theme/tokens";

const isAr = (s: string) => /[؀-ۿ]/.test(s);

function bold(s: string): string {
  return s.replace(/\*\*([^*]+)\*\*/g, (_m, g: string) => {
    const ar = isAr(g);
    return `<strong style="color:${T.green};font-weight:700;${
      ar ? `font-family:${AR};font-size:1.12em` : ""
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
                <th key={ci} style={{ padding: "10px 13px", color: "#fff", fontSize: 12, fontWeight: 700, textAlign: "left", letterSpacing: ".03em", whiteSpace: "nowrap" }}>
                  {c.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "rgba(13,58,26,.03)", borderBottom: "1px solid rgba(13,58,26,.06)" }}>
                {row.map((c, ci) => {
                  const ar = isAr(c.trim());
                  return (
                    <td
                      key={ci}
                      style={{
                        padding: "10px 13px",
                        color: ar ? T.green : T.text,
                        fontSize: ar ? 19 : 14,
                        fontFamily: ar ? AR : FONT,
                        direction: ar ? "rtl" : "ltr",
                        textAlign: ar ? "right" : "left",
                        fontWeight: ar ? 700 : 400,
                        lineHeight: 1.5,
                      }}
                      dangerouslySetInnerHTML={{ __html: bold(c.trim()) }}
                    />
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

  const fsUz = compact ? 13 : 16;
  const fsAr = fsUz + 2;

  lines.forEach((ln) => {
    if (ln.startsWith("|")) {
      if (!ln.includes("---")) {
        tb.push(ln.split("|").filter((_, i, a) => i > 0 && i < a.length - 1));
        inT = true;
      }
      return;
    }
    if (inT) flush();

    if (ln.startsWith("# ")) {
      const txt = ln.slice(2);
      els.push(
        <div key={k++} style={{ margin: compact ? "0 0 12px" : "0 0 18px" }}>
          <h1 style={{ fontSize: compact ? 18 : 23, fontWeight: 700, color: T.green, margin: 0, letterSpacing: "-.02em", lineHeight: 1.2 }}>
            {txt}
          </h1>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: T.gLimeH, marginTop: 8 }} />
        </div>,
      );
    } else if (ln.startsWith("## ")) {
      const txt = ln.slice(3);
      els.push(
        <div key={k++} style={{ display: "flex", alignItems: "center", gap: 8, margin: compact ? "12px 0 6px" : "20px 0 9px" }}>
          <div style={{ width: 4, height: 20, borderRadius: 2, background: T.gLime, flexShrink: 0 }} />
          <h2 style={{ fontSize: compact ? 14 : 17, fontWeight: 700, color: T.green, margin: 0 }}>{txt}</h2>
        </div>,
      );
    } else if (ln.startsWith("### ")) {
      const txt = ln.slice(4);
      els.push(
        <h3 key={k++} style={{ fontSize: compact ? 13 : 15, fontWeight: 600, color: T.green500, margin: compact ? "8px 0 4px" : "13px 0 5px", display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime, display: "inline-block", flexShrink: 0 }} />
          {txt}
        </h3>,
      );
    } else if (ln.startsWith("---")) {
      els.push(
        <div key={k++} style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(13,58,26,.1)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(13,58,26,.2)" }} />
          <div style={{ flex: 1, height: 1, background: "rgba(13,58,26,.1)" }} />
        </div>,
      );
    } else if (ln.startsWith("- ")) {
      const content = ln.slice(2);
      const ar = isAr(content);
      els.push(
        <div key={k++} style={{ display: "flex", gap: 10, fontSize: ar ? fsAr : fsUz, color: T.text, margin: "5px 0", lineHeight: 1.7, alignItems: "flex-start" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime, flexShrink: 0, marginTop: "0.45em" }} />
          <span
            style={{ fontFamily: ar ? AR : undefined, direction: ar ? "rtl" : "ltr" }}
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
            fontSize: ar ? fsAr : fsUz,
            color: T.text,
            margin: "5px 0",
            lineHeight: 1.8,
            fontFamily: ar ? AR : undefined,
            direction: ar ? "rtl" : "ltr",
          }}
          dangerouslySetInnerHTML={{ __html: bold(ln) }}
        />,
      );
    } else {
      els.push(<div key={k++} style={{ height: compact ? 4 : 7 }} />);
    }
  });

  if (inT) flush();
  return <div style={{ fontFamily: FONT, WebkitFontSmoothing: "antialiased" }}>{els}</div>;
}
