import { T } from "../theme/tokens";

/** Vaqtinchalik sahifa — A5/A6'da haqiqiy sahifalar bilan almashtiriladi. */
export function Placeholder({ title, note }: { title: string; note?: string }) {
  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: T.green, letterSpacing: "-.015em", margin: "0 0 8px" }}>
        {title}
      </h1>
      <div style={{ width: 78, height: 5, background: T.gLimeH, borderRadius: 3, marginBottom: 12 }} />
      <p style={{ fontSize: 13, color: T.hint, lineHeight: 1.7 }}>{note ?? "Bu sahifa keyingi qadamda quriladi."}</p>
    </div>
  );
}
