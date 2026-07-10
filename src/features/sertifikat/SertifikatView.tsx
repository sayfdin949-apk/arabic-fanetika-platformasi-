import { Award, Printer, Lock, CheckCircle, BookOpen, Layers } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useProgress } from "../progress/ProgressContext";
import { useAuth } from "../../auth/AuthContext";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";

export function SertifikatView() {
  const { nazDone, amalDone } = useProgress();
  const { user } = useAuth();

  const nazTotal = NAZARIY.length;
  const amalTotal = AMALIY.length;
  const nazPassed = NAZARIY.filter((d) => (nazDone[d.id]?.pct ?? 0) >= 80);
  const amalPassed = AMALIY.filter((b) => (amalDone[b.id]?.pct ?? 0) >= 80);
  const isComplete = nazPassed.length === nazTotal && amalPassed.length === amalTotal;

  const total = nazTotal + amalTotal;

  const today = new Date().toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" });
  const fullName = user ? `${user.ism} ${user.familya}` : "O'quvchi";

  const handlePrint = () => window.print();

  if (!isComplete) {
    return (
      <div style={{ minHeight: "100dvh", background: T.meshLight }}>
        <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Mukofot</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Sertifikat</div>
          </div>
        </div>

        <div style={{ padding: "24px 16px" }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 24, textAlign: "center" }}>
            <Lock size={48} color={T.hint} style={{ margin: "0 auto 16px" }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: T.green, marginBottom: 8 }}>
              Sertifikat hali mavjud emas
            </div>
            <div style={{ fontSize: 13, color: T.text2, marginBottom: 20, lineHeight: 1.6 }}>
              Sertifikat olish uchun barcha nazariy va amaliy darslarni <strong>80%</strong> yoki undan yuqori natija bilan tugatish kerak.
            </div>

            {/* Progress — ikki qism */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {[
                { icon: BookOpen, label: "Nazariy", done: nazPassed.length, total: nazTotal, color: T.lime },
                { icon: Layers, label: "Amaliy", done: amalPassed.length, total: amalTotal, color: "#f59e0b" },
              ].map((r) => {
                const rPct = Math.round((r.done / r.total) * 100);
                return (
                  <div key={r.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <r.icon size={13} color={r.color} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{r.label}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: r.done === r.total ? r.color : T.hint }}>{r.done}/{r.total}</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: "rgba(13,58,26,.08)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${rPct}%`, borderRadius: 4, background: r.color, transition: "width .5s ease" }} />
                    </div>
                    {r.done < r.total && (
                      <div style={{ fontSize: 11, color: T.hint, marginTop: 4 }}>Yana {r.total - r.done} ta qoldi</div>
                    )}
                    {r.done === r.total && (
                      <div style={{ fontSize: 11, color: r.color, fontWeight: 600, marginTop: 4 }}>✓ Tugallandi</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* List of incomplete lessons */}
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 8 }}>Qolgan darslar:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {NAZARIY.filter((d) => (nazDone[d.id]?.pct ?? 0) < 80).slice(0, 8).map((d) => {
                  const done = nazDone[d.id];
                  return (
                    <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "rgba(13,58,26,.04)", borderRadius: 10 }}>
                      <span style={{ fontFamily: AR, fontSize: 18, color: T.green, width: 24, textAlign: "center" }}>{d.icon}</span>
                      <span style={{ flex: 1, fontSize: 13, color: T.text }}>{d.nomi}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: done ? "#FFA500" : T.hint }}>{done ? `${done.pct}%` : "—"}</span>
                    </div>
                  );
                })}
                {NAZARIY.filter((d) => (nazDone[d.id]?.pct ?? 0) < 80).length > 8 && (
                  <div style={{ fontSize: 12, color: T.hint, textAlign: "center", padding: "6px 0" }}>
                    va yana {NAZARIY.filter((d) => (nazDone[d.id]?.pct ?? 0) < 80).length - 8} ta...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Mukofot</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Sertifikat</div>
          </div>
          <button
            onClick={handlePrint}
            style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 10, padding: "9px 14px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            <Printer size={15} /> Chop etish
          </button>
        </div>
      </div>

      <div style={{ padding: "20px 16px 28px" }}>
        {/* Congratulations */}
        <div style={{ background: "rgba(46,184,46,.1)", border: "1px solid rgba(46,184,46,.25)", borderRadius: 14, padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 32 }}>🎉</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.green }}>Tabriklaymiz!</div>
            <div style={{ fontSize: 13, color: T.text2, marginTop: 2 }}>Barcha {total} ta darsni muvaffaqiyatli yakunladingiz</div>
          </div>
        </div>

        {/* Certificate card */}
        <div
          id="cert-print"

          style={{
            background: "#fff",
            borderRadius: 20,
            border: "3px solid #0D3A1A",
            padding: "32px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(13,58,26,.15)",
          }}
        >
          {/* Decorative corners */}
          {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, i) => (
            <div
              key={i}
              style={{ position: "absolute", width: 20, height: 20, border: "2px solid", borderColor: T.lime, borderRadius: 3, ...pos }}
            />
          ))}

          <Award size={48} color={T.lime} style={{ margin: "0 auto 12px" }} />

          <div style={{ fontSize: 11, fontWeight: 800, color: T.hint, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 4 }}>
            Tamomlash Sertifikati
          </div>
          <div style={{ fontFamily: AR, fontSize: 18, color: T.green, marginBottom: 16, direction: "rtl" }}>
            شَهَادَةُ الإِتْمَام
          </div>

          <div style={{ fontSize: 13, color: T.text2, marginBottom: 8 }}>Bu sertifikat</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: T.green, marginBottom: 8, padding: "8px 0", borderBottom: "2px solid rgba(46,184,46,.3)", borderTop: "2px solid rgba(46,184,46,.3)" }}>
            {fullName}
          </div>
          <div style={{ fontSize: 13, color: T.text2, marginTop: 8, marginBottom: 16, lineHeight: 1.7 }}>
            ga <strong>Arab Fonetika Kursi</strong> bo'yicha {nazTotal} ta nazariy va {amalTotal} ta amaliy darsni
            <br />muvaffaqiyatli tamomladi ekanligini tasdiqlaydigan
          </div>

          {/* Completion stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20 }}>
            {[
              { label: "Nazariy", value: `${nazTotal}` },
              { label: "Amaliy", value: `${amalTotal}` },
              { label: "O'rtacha", value: `${Math.round(Object.values(nazDone).reduce((s, d) => s + d.pct, 0) / nazTotal)}%` },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: T.green }}>{s.value}</div>
                <div style={{ fontSize: 11, color: T.hint }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px dashed rgba(13,58,26,.2)", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <CheckCircle size={14} color={T.lime} />
            <span style={{ fontSize: 12, color: T.hint }}>{today}</span>
          </div>
        </div>

        {/* Achievements grid */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 10 }}>Yakunlangan darslar</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {NAZARIY.map((d) => (
              <div
                key={d.id}
                style={{ background: "#fff", borderRadius: 10, border: "1px solid rgba(46,184,46,.3)", padding: "10px 4px", textAlign: "center" }}
              >
                <span style={{ fontFamily: AR, fontSize: 20 }}>{d.icon}</span>
                <div style={{ fontSize: 10, color: T.lime, fontWeight: 700, marginTop: 4 }}>{nazDone[d.id]?.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cert-print, #cert-print * { visibility: visible; }
          #cert-print { position: fixed; left: 0; top: 0; width: 100%; border: none !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
