import { useState } from "react";
import { Award, Printer, Lock, CheckCircle, BookOpen, Layers, GraduationCap, ChevronRight } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useProgress } from "../progress/ProgressContext";
import { useAuth } from "../../auth/AuthContext";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { GRAM_DARSLAR } from "../../content/gramContent";

type SertTur = "fonetika" | "grammatika";

function loadGramDone(uid: string): Record<number, { pct: number; sana: string }> {
  try {
    const raw = localStorage.getItem(`afp:gram_done_${uid}`);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function CertCard({
  tur,
  fullName,
  unlocked,
  onPrint,
  stats,
}: {
  tur: SertTur;
  fullName: string;
  unlocked: boolean;
  onPrint: () => void;
  stats: { label: string; value: string }[];
}) {
  const today = new Date().toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" });
  const isForetika = tur === "fonetika";
  const rang = isForetika ? T.lime : "#2563EB";
  const nomi = isForetika ? "Arab Fonetika Kursi" : "Arab Grammatika Kursi";
  const arabcha = isForetika ? "شَهَادَةُ الصَّوْتِيَّات" : "شَهَادَةُ النَّحْو";

  if (!unlocked) return null;

  return (
    <div
      id={`cert-${tur}`}
      style={{
        background: "#fff", borderRadius: 20,
        border: `3px solid ${T.green}`,
        padding: "28px 22px", textAlign: "center",
        position: "relative", overflow: "hidden",
        boxShadow: "0 8px 32px rgba(13,58,26,.15)",
      }}
    >
      {/* Corners */}
      {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, i) => (
        <div key={i} style={{ position: "absolute", width: 20, height: 20, border: `2px solid ${rang}`, borderRadius: 3, ...pos }} />
      ))}

      <Award size={44} color={rang} style={{ margin: "0 auto 10px" }} />
      <div style={{ fontSize: 10, fontWeight: 800, color: T.hint, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 3 }}>
        Tamomlash Sertifikati
      </div>
      <div style={{ fontFamily: AR, fontSize: 17, color: T.green, marginBottom: 14, direction: "rtl" }}>
        {arabcha}
      </div>

      <div style={{ fontSize: 12, color: T.text2, marginBottom: 7 }}>Bu sertifikat</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: T.green, marginBottom: 7, padding: "7px 0", borderBottom: `2px solid ${rang}40`, borderTop: `2px solid ${rang}40` }}>
        {fullName}
      </div>
      <div style={{ fontSize: 12, color: T.text2, marginTop: 7, marginBottom: 14, lineHeight: 1.7 }}>
        ga <strong>{nomi}</strong> bo'yicha barcha darslarni<br />muvaffaqiyatli tamomladi ekanligini tasdiqlaydigan
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 18 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.hint }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px dashed rgba(13,58,26,.2)", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <CheckCircle size={13} color={rang} />
          <span style={{ fontSize: 11, color: T.hint }}>{today}</span>
        </div>
        <button
          onClick={onPrint}
          style={{ display: "flex", alignItems: "center", gap: 5, background: "transparent", border: `1px solid ${rang}50`, borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: rang }}
        >
          <Printer size={11} /> Chop etish
        </button>
      </div>
    </div>
  );
}

function ProgressBlock({
  icon: Icon,
  label,
  done,
  total,
  color,
}: {
  icon: typeof BookOpen;
  label: string;
  done: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon size={13} color={color} />
          <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{label}</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: done === total ? color : T.hint }}>{done}/{total}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "rgba(13,58,26,.08)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: color, transition: "width .5s ease" }} />
      </div>
      <div style={{ fontSize: 11, marginTop: 4, color: done === total ? color : T.hint, fontWeight: done === total ? 600 : 400 }}>
        {done === total ? "✓ Tugallandi" : `Yana ${total - done} ta qoldi`}
      </div>
    </div>
  );
}

export function SertifikatView() {
  const { nazDone, amalDone } = useProgress();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"fonetika" | "grammatika">("fonetika");

  const gramDone = user ? loadGramDone(user.id) : {};

  const nazTotal = NAZARIY.length;
  const amalTotal = AMALIY.length;
  const gramTotal = GRAM_DARSLAR.length;

  const nazPassed = NAZARIY.filter((d) => (nazDone[d.id]?.pct ?? 0) >= 80).length;
  const amalPassed = AMALIY.filter((b) => (amalDone[b.id]?.pct ?? 0) >= 80).length;
  const gramPassed = GRAM_DARSLAR.filter((d) => (gramDone[d.id]?.pct ?? 0) >= 80).length;

  const fonetikaTayyor = nazPassed === nazTotal && amalPassed === amalTotal;
  const grammatikaTayyor = gramPassed === gramTotal;

  const fullName = user ? `${user.ism} ${user.familya}` : "O'quvchi";

  const handlePrint = (tur: SertTur) => {
    const el = document.getElementById(`cert-${tur}`);
    if (!el) return;
    const printContent = el.outerHTML;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>Sertifikat</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;} *{box-sizing:border-box;}</style></head><body>${printContent}</body></html>`);
    win.document.close();
    win.print();
  };

  const fonetikaNazAvg = nazTotal > 0 ? Math.round(Object.values(nazDone).reduce((s, d) => s + d.pct, 0) / nazTotal) : 0;

  if (!user) return null;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, padding: "18px 16px 16px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>Mukofot</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Sertifikatlar</div>
          {/* Status chips */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Fonetika", unlocked: fonetikaTayyor },
              { label: "Grammatika", unlocked: grammatikaTayyor },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5, background: s.unlocked ? "rgba(46,184,46,.2)" : "rgba(255,255,255,.1)", borderRadius: 10, padding: "5px 10px" }}>
                {s.unlocked ? <CheckCircle size={12} color={T.lime} /> : <Lock size={12} color="rgba(255,255,255,.5)" />}
                <span style={{ fontSize: 11, fontWeight: 600, color: s.unlocked ? T.limeBrt : "rgba(255,255,255,.6)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablar */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid rgba(13,58,26,.08)" }}>
        {[
          { id: "fonetika" as const, label: "Fonetika", icon: <BookOpen size={13} />, unlocked: fonetikaTayyor },
          { id: "grammatika" as const, label: "Grammatika", icon: <GraduationCap size={13} />, unlocked: grammatikaTayyor },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              flex: 1, padding: "12px 0", border: "none", background: "transparent",
              borderBottom: activeTab === t.id ? `2px solid ${T.lime}` : "2px solid transparent",
              color: activeTab === t.id ? T.green : T.hint,
              fontSize: 13, fontWeight: activeTab === t.id ? 700 : 500,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            {t.icon} {t.label}
            {t.unlocked && <CheckCircle size={11} color={T.lime} />}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* FONETIKA */}
        {activeTab === "fonetika" && (
          <>
            {fonetikaTayyor ? (
              <>
                <div style={{ background: "rgba(46,184,46,.1)", border: "1px solid rgba(46,184,46,.25)", borderRadius: 14, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 28 }}>🎉</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Tabriklaymiz!</div>
                    <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>{nazTotal + amalTotal} ta darsni tugatdingiz</div>
                  </div>
                </div>
                <CertCard
                  tur="fonetika"
                  fullName={fullName}
                  unlocked={true}
                  onPrint={() => handlePrint("fonetika")}
                  stats={[
                    { label: "Nazariy", value: `${nazTotal}` },
                    { label: "Amaliy", value: `${amalTotal}` },
                    { label: "O'rtacha", value: `${fonetikaNazAvg}%` },
                  ]}
                />
                {/* Yakunlangan darslar grid */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 8 }}>Yakunlangan darslar</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                    {NAZARIY.map((d) => (
                      <div key={d.id} style={{ background: "#fff", borderRadius: 10, border: "1px solid rgba(46,184,46,.3)", padding: "10px 4px", textAlign: "center" }}>
                        <span style={{ fontFamily: AR, fontSize: 20 }}>{d.icon}</span>
                        <div style={{ fontSize: 10, color: T.lime, fontWeight: 700, marginTop: 4 }}>{nazDone[d.id]?.pct ?? 0}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 20 }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <Lock size={40} color={T.hint} style={{ margin: "0 auto 12px" }} />
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.green, marginBottom: 6 }}>Fonetika sertifikati</div>
                  <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.6 }}>
                    Barcha darslarni <strong>80%+</strong> bilan tugatgach ochiladi
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <ProgressBlock icon={BookOpen} label="Nazariy darslar" done={nazPassed} total={nazTotal} color={T.lime} />
                  <ProgressBlock icon={Layers} label="Amaliy darslar" done={amalPassed} total={amalTotal} color="#F59E0B" />
                </div>
                {/* Qolgan darslar */}
                {NAZARIY.filter((d) => (nazDone[d.id]?.pct ?? 0) < 80).length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.hint, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Qolgan nazariy darslar</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {NAZARIY.filter((d) => (nazDone[d.id]?.pct ?? 0) < 80).slice(0, 6).map((d) => (
                        <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "rgba(13,58,26,.04)", borderRadius: 10 }}>
                          <span style={{ fontFamily: AR, fontSize: 18, color: T.green, width: 24, textAlign: "center" }}>{d.icon}</span>
                          <span style={{ flex: 1, fontSize: 12, color: T.text }}>{d.nomi}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: nazDone[d.id] ? "#FFA500" : T.hint }}>
                            {nazDone[d.id] ? `${nazDone[d.id].pct}%` : "—"}
                          </span>
                          <ChevronRight size={12} color={T.hint} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* GRAMMATIKA */}
        {activeTab === "grammatika" && (
          <>
            {grammatikaTayyor ? (
              <>
                <div style={{ background: "rgba(37,99,235,.08)", border: "1px solid rgba(37,99,235,.25)", borderRadius: 14, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 28 }}>🏆</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1D4ED8" }}>Grammatika kursi tugallandi!</div>
                    <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>{gramTotal} ta grammatika darsi</div>
                  </div>
                </div>
                <CertCard
                  tur="grammatika"
                  fullName={fullName}
                  unlocked={true}
                  onPrint={() => handlePrint("grammatika")}
                  stats={[
                    { label: "Darslar", value: `${gramTotal}` },
                    { label: "O'rtacha", value: `${Math.round(Object.values(gramDone).reduce((s, d) => s + d.pct, 0) / gramTotal)}%` },
                    { label: "Daraja", value: "A1" },
                  ]}
                />
              </>
            ) : (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 20 }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <Lock size={40} color={T.hint} style={{ margin: "0 auto 12px" }} />
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.green, marginBottom: 6 }}>Grammatika sertifikati</div>
                  <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.6 }}>
                    Barcha grammatika darslarini <strong>80%+</strong> bilan tugatgach ochiladi
                  </div>
                </div>
                <ProgressBlock icon={GraduationCap} label="Grammatika darslar" done={gramPassed} total={gramTotal} color="#2563EB" />
                {GRAM_DARSLAR.filter((d) => (gramDone[d.id]?.pct ?? 0) < 80).length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.hint, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Qolgan darslar</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {GRAM_DARSLAR.filter((d) => (gramDone[d.id]?.pct ?? 0) < 80).map((d) => (
                        <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "rgba(13,58,26,.04)", borderRadius: 10 }}>
                          <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{d.icon}</span>
                          <span style={{ flex: 1, fontSize: 12, color: T.text }}>{d.nomi}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: gramDone[d.id] ? "#FFA500" : T.hint }}>
                            {gramDone[d.id] ? `${gramDone[d.id].pct}%` : "—"}
                          </span>
                          <ChevronRight size={12} color={T.hint} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
