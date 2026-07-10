import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle, PlayCircle, Clock, BookOpen, Layers } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { useProgress } from "../progress/ProgressContext";

type Tur = "nazariy" | "amaliy";

const DURATION = "1s 20d";

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: "rgba(13,58,26,.1)", marginTop: 8, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: pct >= 80 ? T.lime : T.green, transition: "width .3s" }} />
    </div>
  );
}

function StatChip({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "7px 12px" }}>
      <Icon size={13} color="rgba(255,255,255,.8)" />
      <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{value}</span>
    </div>
  );
}

export function DarsList() {
  const navigate = useNavigate();
  const { nazDone, amalDone, isNazUnlocked } = useProgress();
  const [tur, setTur] = useState<Tur>("amaliy");

  const nazPass = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const amalCount = Object.keys(amalDone).length;

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      {/* Hero banner */}
      <div style={{ background: T.green, position: "relative", padding: "20px 18px 0", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Kurs</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Arab Fonetika Kursi</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            <StatChip icon={Layers} label="Amaliy:" value={`${amalCount}/${AMALIY.length}`} />
            <StatChip icon={BookOpen} label="Nazariy:" value={`${nazPass}/10`} />
            <StatChip icon={Clock} label="Har dars:" value={DURATION} />
          </div>

          {/* Tab switcher */}
          <div style={{ display: "flex", borderBottom: "none" }}>
            {(["amaliy", "nazariy"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTur(t)}
                style={{
                  flex: 1,
                  padding: "10px 4px",
                  background: "none",
                  border: "none",
                  borderBottom: tur === t ? "3px solid #fff" : "3px solid transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: tur === t ? "#fff" : "rgba(255,255,255,.5)",
                  transition: "all .15s",
                }}
              >
                {t === "amaliy" ? `✍ Amaliy (${AMALIY.length})` : `📖 Nazariy (10)`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div style={{ padding: "16px 16px", flex: 1 }}>
        {tur === "nazariy" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {NAZARIY.slice(0, 10).map((d, idx) => {
              const unlocked = isNazUnlocked(d.id);
              const done = nazDone[d.id];
              const pct = done?.pct ?? 0;

              return (
                <button
                  key={d.id}
                  disabled={!unlocked}
                  onClick={() => navigate(`/dars/nazariy/${d.id}`)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "14px 0",
                    background: "none",
                    border: "none",
                    borderBottom: idx < 9 ? "1px solid rgba(13,58,26,.07)" : "none",
                    cursor: unlocked ? "pointer" : "not-allowed",
                    textAlign: "left",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 72,
                      height: 54,
                      borderRadius: 8,
                      background: unlocked
                        ? done && pct >= 80
                          ? "linear-gradient(135deg,#2EB82E,#1a8a1a)"
                          : T.gGreen
                        : "rgba(13,58,26,.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {!unlocked ? (
                      <Lock size={20} color="rgba(13,58,26,.3)" />
                    ) : (
                      <>
                        <span style={{ fontFamily: AR, fontSize: 26, color: "#fff", lineHeight: 1 }}>{d.icon}</span>
                        {done && pct >= 80 && (
                          <div style={{ position: "absolute", top: 4, right: 4, background: T.lime, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CheckCircle size={11} color={T.onCta} />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: T.hint, marginBottom: 2 }}>
                      {d.id}-dars
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: unlocked ? T.green : T.hint,
                        lineHeight: 1.3,
                        marginBottom: 5,
                      }}
                    >
                      {d.nomi}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint, fontSize: 11 }}>
                        <Clock size={11} />
                        <span>{DURATION}</span>
                      </div>
                      {done && (
                        <div style={{ fontSize: 11, color: pct >= 80 ? T.lime : T.text2, fontWeight: 600 }}>
                          {pct}%
                        </div>
                      )}
                      {!unlocked && (
                        <div style={{ fontSize: 10, color: T.hint }}>Oldingi darsni yakunlang</div>
                      )}
                    </div>
                    {done && <ProgressBar pct={pct} />}
                  </div>

                  {/* Status icon */}
                  <div style={{ flexShrink: 0, marginTop: 4 }}>
                    {!unlocked ? (
                      <Lock size={15} color="rgba(13,58,26,.25)" />
                    ) : done && pct >= 80 ? (
                      <CheckCircle size={18} color={T.lime} />
                    ) : (
                      <PlayCircle size={18} color={T.green500} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {AMALIY.map((b, idx) => {
              const done = amalDone[b.id];
              const pct = done?.pct ?? 0;

              return (
                <button
                  key={b.id}
                  onClick={() => navigate(`/dars/amaliy/${b.id}`)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "14px 0",
                    background: "none",
                    border: "none",
                    borderBottom: idx < AMALIY.length - 1 ? "1px solid rgba(13,58,26,.07)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 72,
                      height: 54,
                      borderRadius: 8,
                      background: done && pct >= 80
                        ? "linear-gradient(135deg,#6AEF5A,#3dcc2e)"
                        : T.gLime,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      gap: 4,
                      position: "relative",
                    }}
                  >
                    <span style={{ fontFamily: AR, fontSize: 18, color: T.onCta, lineHeight: 1 }}>
                      {b.harflar.join(" ")}
                    </span>
                    {done && pct >= 80 && (
                      <div style={{ position: "absolute", top: 4, right: 4, background: T.green, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CheckCircle size={11} color="#fff" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: T.hint, marginBottom: 2 }}>{b.id}-bob</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.green, lineHeight: 1.3, marginBottom: 5 }}>
                      {b.nomlar.join(" · ")}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint, fontSize: 11 }}>
                        <Clock size={11} />
                        <span>{DURATION}</span>
                      </div>
                      {done && (
                        <div style={{ fontSize: 11, color: pct >= 80 ? T.lime : T.text2, fontWeight: 600 }}>
                          {pct}%
                        </div>
                      )}
                    </div>
                    {done && <ProgressBar pct={pct} />}
                  </div>

                  {/* Status icon */}
                  <div style={{ flexShrink: 0, marginTop: 4 }}>
                    {done && pct >= 80 ? (
                      <CheckCircle size={18} color={T.lime} />
                    ) : (
                      <PlayCircle size={18} color={T.green500} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
