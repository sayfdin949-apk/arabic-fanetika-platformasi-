import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, Calendar } from "lucide-react";
import { T } from "../../theme/tokens";
import { DASTUR } from "../../content/dastur";
import { PageHeader, Page, Card } from "../../components/ui";

export function DasturView() {
  const [openOy, setOpenOy] = useState<number | null>(DASTUR[0]?.oy ?? null);
  const [openH, setOpenH] = useState<number | null>(null);

  return (
    <>
      <PageHeader kicker="Reja" title="Dastur" sub="4.5 oylik o'quv jadvali" />
      <Page>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DASTUR.map((oy) => {
            const open = openOy === oy.oy;
            return (
              <Card key={oy.oy}>
                <button
                  onClick={() => setOpenOy(open ? null : oy.oy)}
                  style={{ width: "100%", background: oy.color, border: "none", cursor: "pointer", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
                  <Calendar size={18} color="#fff" style={{ position: "relative", zIndex: 1, flexShrink: 0 }} />
                  <div style={{ flex: 1, textAlign: "left", position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{oy.nomi}</div>
                  </div>
                  {open ? <ChevronUp size={18} color="#fff" style={{ position: "relative", zIndex: 1 }} /> : <ChevronDown size={18} color="#fff" style={{ position: "relative", zIndex: 1 }} />}
                </button>

                {open && (
                  <div style={{ padding: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: T.green500, background: "rgba(46,184,46,.1)", borderRadius: 9, padding: "8px 11px", marginBottom: 11 }}>
                      <Trophy size={14} /> <span style={{ fontWeight: 600 }}>Imtihon:</span> {oy.imtihon}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {oy.haftalar.map((hf) => {
                        const ho = openH === hf.h;
                        return (
                          <div key={hf.h} style={{ border: "1px solid rgba(13,58,26,.1)", borderRadius: 10, overflow: "hidden" }}>
                            <button
                              onClick={() => setOpenH(ho ? null : hf.h)}
                              style={{ width: "100%", background: "rgba(13,58,26,.04)", border: "none", cursor: "pointer", padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, textAlign: "left" }}
                            >
                              <span style={{ fontSize: 11, fontWeight: 700, color: T.onCta, background: T.gLime, borderRadius: 6, padding: "2px 7px", flexShrink: 0 }}>{hf.h}-hafta</span>
                              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: T.green }}>{hf.mavzu}</span>
                              {ho ? <ChevronUp size={15} color={T.hint} /> : <ChevronDown size={15} color={T.hint} />}
                            </button>
                            {ho && (
                              <div style={{ padding: 12 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                                  {hf.kunlar.map((kn, i) => (
                                    <div key={i} style={{ display: "flex", gap: 9, fontSize: 12 }}>
                                      <span style={{ width: 76, flexShrink: 0, fontWeight: 600, color: T.green500 }}>{kn.k}</span>
                                      <span style={{ flex: 1, color: T.text }}>
                                        {kn.d}
                                        <span style={{ color: T.hint }}> — {kn.m}</span>
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ fontSize: 11, color: T.green500, marginTop: 9, paddingTop: 9, borderTop: "1px solid rgba(13,58,26,.08)" }}>
                                  <Trophy size={12} style={{ verticalAlign: "-2px" }} /> {hf.imtihon}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </Page>
    </>
  );
}
