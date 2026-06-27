import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, Calendar, ChevronRight, ChevronLeft, X, Play } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { DASTUR } from "../../content/dastur";

type Kun = { k: string; d: string; m: string };
type Hafta = { h: number; mavzu: string; kunlar: Kun[]; imtihon: string };

function PresentationModal({ hafta, onClose }: { hafta: Hafta; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  // slides: 0 = intro, 1..kunlar.length = days, last = summary
  const total = hafta.kunlar.length + 2;
  const isIntro = idx === 0;
  const isSummary = idx === total - 1;
  const kun = !isIntro && !isSummary ? hafta.kunlar[idx - 1] : null;

  const DAY_EMOJIS = ["📅", "📖", "✏️", "🗣️", "📝", "🧠"];

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: T.green, display: "flex", flexDirection: "column" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Sheen overlay */}
      <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 600 }}>{hafta.h}-HAFTA</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{hafta.mavzu}</div>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{idx + 1}/{total}</div>
        <button
          onClick={onClose}
          style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", flexShrink: 0 }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ position: "relative", zIndex: 1, height: 3, background: "rgba(255,255,255,.15)" }}>
        <div style={{ height: "100%", width: `${((idx + 1) / total) * 100}%`, background: T.gLimeH, transition: "width .3s ease" }} />
      </div>

      {/* Slide content */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
        {isIntro && (
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 20 }}>📚</div>
            <div style={{ fontSize: 12, color: T.limeBrt, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
              {hafta.h}-Hafta
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.3 }}>{hafta.mavzu}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
              Bu haftada {hafta.kunlar.length} ta dars o'tiladi.<br />
              Har bir dars uchun alohida mavzu va mashqlar mavjud.
            </div>
          </div>
        )}

        {kun && (
          <div style={{ width: "100%", maxWidth: 480 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>{DAY_EMOJIS[(idx - 1) % DAY_EMOJIS.length]}</div>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "4px 14px", fontSize: 12, color: T.limeBrt, fontWeight: 700 }}>
                {kun.k}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,.1)", borderRadius: 16, padding: "20px", marginBottom: 14, border: "1px solid rgba(255,255,255,.15)" }}>
              <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Dars</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", lineHeight: 1.5 }}>{kun.d}</div>
            </div>

            <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 16, padding: "20px", border: "1px solid rgba(255,255,255,.1)" }}>
              <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Mashq / Maqsad</div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,.85)", lineHeight: 1.6 }}>{kun.m}</div>
            </div>
          </div>
        )}

        {isSummary && (
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 20 }}>🏆</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Hafta imtihoni</div>
            <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 16, padding: "20px", border: "1px solid rgba(255,255,255,.15)", marginBottom: 16 }}>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,.9)", lineHeight: 1.7 }}>{hafta.imtihon}</div>
            </div>
            <div style={{ fontFamily: AR, fontSize: 24, color: T.limeBrt, direction: "rtl" }}>بِالتَّوْفِيق</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 6 }}>Omad!</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 12, padding: "16px 20px", paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}>
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", background: idx === 0 ? "transparent" : "rgba(255,255,255,.1)", color: idx === 0 ? "rgba(255,255,255,.3)" : "#fff", fontSize: 14, fontWeight: 600, cursor: idx === 0 ? "default" : "pointer" }}
        >
          <ChevronLeft size={18} /> Oldingi
        </button>
        {idx < total - 1 ? (
          <button
            onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Keyingi <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={onClose}
            style={{ flex: 1, padding: "14px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Yakunlash ✓
          </button>
        )}
      </div>
    </div>
  );
}

export function DasturView() {
  const [openOy, setOpenOy] = useState<number | null>(DASTUR[0]?.oy ?? null);
  const [openH, setOpenH] = useState<number | null>(null);
  const [presentHafta, setPresentHafta] = useState<Hafta | null>(null);

  const totalHafta = DASTUR.reduce((s, o) => s + o.haftalar.length, 0);

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {presentHafta && (
        <PresentationModal hafta={presentHafta} onClose={() => setPresentHafta(null)} />
      )}

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
                              <button
                                onClick={(e) => { e.stopPropagation(); setPresentHafta(hf); }}
                                style={{ display: "flex", alignItems: "center", gap: 4, background: T.gLime, border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", color: T.onCta, fontSize: 11, fontWeight: 700, flexShrink: 0 }}
                                title="Prezentatsiya"
                              >
                                <Play size={10} /> Slayd
                              </button>
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
