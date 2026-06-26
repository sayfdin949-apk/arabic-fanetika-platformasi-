import type { CSSProperties, ReactNode } from "react";
import { T } from "../theme/tokens";

/** Sahifa sarlavhasi (yashil gradient hero) */
export function PageHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div style={{ background: T.gGreen, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {kicker && (
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: T.limeBrt, marginBottom: 5 }}>
            {kicker}
          </div>
        )}
        <div style={{ fontSize: 19, fontWeight: 600, color: "#fff", letterSpacing: "-.015em" }}>{title}</div>
        <div style={{ width: 78, height: 5, background: T.gLimeH, borderRadius: 3, margin: "9px 0 0" }} />
        {sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 7 }}>{sub}</div>}
      </div>
    </div>
  );
}

/** Bo'lim sarlavhasi (kichik lime chiziq + matn) */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
      <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
      <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{children}</span>
    </div>
  );
}

/** Oddiy oq karta */
export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid rgba(13,58,26,.08)",
        boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Sahifa konteyneri (markazlangan, padding) */
export function Page({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: 760, margin: "0 auto", padding: "16px 16px 28px" }}>{children}</div>;
}
