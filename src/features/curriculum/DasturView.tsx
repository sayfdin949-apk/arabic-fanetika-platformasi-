import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, Calendar, ChevronRight } from "lucide-react";
import { T } from "../../theme/tokens";
import { DASTUR } from "../../content/dastur";

export function DasturView() {
  const [openOy, setOpenOy] = useState<number | null>(DASTUR[0]?.oy ?? null);
  const [openH, setOpenH] = useState<number | null>(null);

  const totalHafta = DASTUR.reduce((s, o) => s + o.haftalar.length, 0);

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Reja</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 10 }}>O'quv Dasturi</div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {[
              { label: "Oylar", value: `${DASTUR.length}` },
              { label: "Haftalar", value: `${totalHafta}` },
              { label: "Muddat", value: "4.5 oy" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "6px 12px" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{s.label}:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 28px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DASTUR.map((oy) => {
            const open = openOy === oy.oy;
            return (
              <div
                key={oy.oy}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid rgba(13,58,26,.08)",
                  boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 4px 12px rgba(13,58,26,.06)",
                  overflow: "hidden",
                }}
              >
                {/* Month header */}
                <button
                  onClick={() => setOpenOy(open ? null : oy.oy)}
                  style={{
                    width: "100%",
                    background: oy.color,
                    border: "none",
                    cursor: "pointer",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,0,0,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>
                    <Calendar size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1, textAlign: "left", position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{oy.nomi}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)", marginTop: 1 }}>{oy.haftalar.length} hafta</div>
                  </div>
                  {open
                    ? <ChevronUp size={18} color="rgba(255,255,255,.8)" style={{ position: "relative", zIndex: 1 }} />
                    : <ChevronDown size={18} color="rgba(255,255,255,.8)" style={{ position: "relative", zIndex: 1 }} />}
                </button>

                {open && (
                  <div style={{ padding: 12 }}>
                    {/* Exam banner */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "linear-gradient(135deg,rgba(46,184,46,.12),rgba(46,184,46,.06))",
                      border: "1px solid rgba(46,184,46,.2)",
                      borderRadius: 10,
                      padding: "10px 13px",
                      marginBottom: 12,
                    }}>
                      <Trophy size={15} color={T.lime} style={{ flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.lime, textTransform: "uppercase", letterSpacing: ".04em" }}>Imtihon</div>
                        <div style={{ fontSize: 12, color: T.green, fontWeight: 500, marginTop: 1 }}>{oy.imtihon}</div>
                      </div>
                    </div>

                    {/* Weeks */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {oy.haftalar.map((hf) => {
                        const ho = openH === hf.h;
                        return (
                          <div
                            key={hf.h}
                            style={{
                              border: "1px solid rgba(13,58,26,.1)",
                              borderRadius: 12,
                              overflow: "hidden",
                              background: ho ? "rgba(13,58,26,.02)" : "transparent",
                            }}
                          >
                            <button
                              onClick={() => setOpenH(ho ? null : hf.h)}
                              style={{
                                width: "100%",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "11px 13px",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                textAlign: "left",
                              }}
                            >
                              <div style={{
                                fontSize: 11, fontWeight: 800,
                                color: T.onCta,
                                background: ho ? T.gLime : T.gGreen,
                                borderRadius: 7,
                                padding: "3px 9px",
                                flexShrink: 0,
                                transition: "background .2s",
                              }}>
                                {hf.h}-hafta
                              </div>
                              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: T.green }}>{hf.mavzu}</span>
                              <ChevronRight
                                size={15}
                                color={T.hint}
                                style={{ flexShrink: 0, transform: ho ? "rotate(90deg)" : "rotate(0)", transition: "transform .2s" }}
                              />
                            </button>

                            {ho && (
                              <div style={{ padding: "0 13px 12px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(13,58,26,.08)" }}>
                                  {hf.kunlar.map((kn, i) => (
                                    <div
                                      key={i}
                                      style={{
                                        display: "flex",
                                        gap: 0,
                                        fontSize: 12,
                                        borderBottom: i < hf.kunlar.length - 1 ? "1px solid rgba(13,58,26,.06)" : "none",
                                        background: i % 2 === 0 ? "#fff" : "rgba(13,58,26,.02)",
                                      }}
                                    >
                                      <div style={{ width: 80, flexShrink: 0, fontWeight: 700, color: T.green500, padding: "9px 12px", borderRight: "1px solid rgba(13,58,26,.06)" }}>
                                        {kn.k}
                                      </div>
                                      <div style={{ flex: 1, padding: "9px 12px", color: T.text, lineHeight: 1.4 }}>
                                        {kn.d}
                                        <span style={{ color: T.hint }}> — {kn.m}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  fontSize: 11,
                                  color: T.green500,
                                  marginTop: 8,
                                  padding: "7px 10px",
                                  background: "rgba(46,184,46,.07)",
                                  borderRadius: 8,
                                }}>
                                  <Trophy size={12} style={{ flexShrink: 0 }} />
                                  <span>{hf.imtihon}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
