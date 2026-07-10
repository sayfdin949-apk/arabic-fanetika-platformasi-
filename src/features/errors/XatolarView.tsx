import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight, CheckCircle, BookOpen } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useProgress } from "../progress/ProgressContext";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";

const isAr = (s: string) => /[؀-ۿ]/.test(s);

type NazQuestion = typeof NAZARIY[0]["vazifalar"][number];
type AmalQuestion = typeof AMALIY[0]["test"][number];

interface NazEntry {
  id: number; nomi: string; icon: string; key: string;
  questions: NazQuestion[]; link: string;
}
interface AmalEntry {
  id: number; nomi: string; harflar: string[]; key: string;
  questions: AmalQuestion[]; link: string;
}

export function XatolarView() {
  const navigate = useNavigate();
  const { wrongMap } = useProgress();

  const nazEntries: NazEntry[] = Object.entries(wrongMap)
    .filter(([k, v]) => k.startsWith("naz_") && v.length > 0)
    .flatMap(([k, indices]) => {
      const id = parseInt(k.split("_")[1]);
      const dars = NAZARIY.find((d) => d.id === id);
      if (!dars) return [];
      return [{ id, nomi: dars.nomi, icon: dars.icon, key: k,
        questions: indices.map((i) => dars.vazifalar[i]).filter((q): q is NazQuestion => q != null),
        link: `/dars/nazariy/${id}` }];
    });

  const amalEntries: AmalEntry[] = Object.entries(wrongMap)
    .filter(([k, v]) => k.startsWith("amal_") && v.length > 0)
    .flatMap(([k, indices]) => {
      const id = parseInt(k.split("_")[1]);
      const bob = AMALIY.find((b) => b.id === id);
      if (!bob) return [];
      return [{ id, nomi: bob.nomlar.join(", "), harflar: bob.harflar, key: k,
        questions: indices.map((i) => bob.test[i]).filter((q): q is AmalQuestion => q != null),
        link: `/dars/amaliy/${id}` }];
    });

  const totalWrong = nazEntries.reduce((s, e) => s + e.questions.length, 0) +
    amalEntries.reduce((s, e) => s + e.questions.length, 0);

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
            Tahlil
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Xato jurnali</div>
          {totalWrong > 0 && (
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 6 }}>
              Jami {totalWrong} ta noto'g'ri javob mavjud
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px" }}>
        {totalWrong === 0 ? (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 32, textAlign: "center" }}>
            <CheckCircle size={48} color={T.lime} style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: T.green }}>Xato yo'q!</div>
            <div style={{ fontSize: 13, color: T.text2, marginTop: 6 }}>Barcha testlar muvaffaqiyatli topshirildi</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Nazariy section */}
            {nazEntries.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                  <BookOpen size={14} color={T.green} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Nazariy darslar</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {nazEntries.map((entry) => (
                    <div key={entry.key} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", overflow: "hidden" }}>
                      <button
                        onClick={() => navigate(entry.link)}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontFamily: AR, fontSize: 20, color: "#fff" }}>{entry.icon}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 2 }}>{entry.nomi}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <AlertTriangle size={12} color={T.red} />
                            <span style={{ fontSize: 12, color: T.red, fontWeight: 600 }}>{entry.questions.length} ta xato</span>
                          </div>
                        </div>
                        <ChevronRight size={16} color={T.hint} style={{ flexShrink: 0 }} />
                      </button>
                      <div style={{ borderTop: "1px solid rgba(13,58,26,.06)", padding: "0 14px 12px" }}>
                        {entry.questions.map((vz, qi) => {
                          const qAr = isAr(vz.savol);
                          const correctTxt = vz.variantlar[vz.togri];
                          return (
                            <div key={qi} style={{ paddingTop: 10, borderTop: qi > 0 ? "1px dashed rgba(13,58,26,.06)" : "none", marginTop: qi > 0 ? 0 : 0 }}>
                              <div style={{ fontSize: qAr ? 16 : 13, color: T.text, fontFamily: qAr ? AR : undefined, direction: qAr ? "rtl" : "ltr", marginBottom: 4, lineHeight: 1.4 }}>
                                {vz.savol}
                              </div>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(46,184,46,.08)", borderRadius: 8, padding: "4px 10px" }}>
                                <CheckCircle size={11} color={T.lime} />
                                <span style={{ fontSize: isAr(correctTxt) ? 14 : 12, color: T.green, fontWeight: 600, fontFamily: isAr(correctTxt) ? AR : undefined }}>
                                  {correctTxt}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amaliy section */}
            {amalEntries.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                  <AlertTriangle size={14} color={T.green} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Amaliy boblar</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {amalEntries.map((entry) => (
                    <div key={entry.key} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", overflow: "hidden" }}>
                      <button
                        onClick={() => navigate(entry.link)}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: 2 }}>
                          <span style={{ fontFamily: AR, fontSize: 18, color: "#fff" }}>{entry.harflar.join(" ")}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 2 }}>{entry.nomi}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <AlertTriangle size={12} color={T.red} />
                            <span style={{ fontSize: 12, color: T.red, fontWeight: 600 }}>{entry.questions.length} ta xato</span>
                          </div>
                        </div>
                        <ChevronRight size={16} color={T.hint} style={{ flexShrink: 0 }} />
                      </button>
                      <div style={{ borderTop: "1px solid rgba(13,58,26,.06)", padding: "0 14px 12px" }}>
                        {entry.questions.map((q, qi) => {
                          const qAr = isAr(q.s);
                          const correctTxt = q.v[q.t];
                          return (
                            <div key={qi} style={{ paddingTop: 10, borderTop: qi > 0 ? "1px dashed rgba(13,58,26,.06)" : "none" }}>
                              <div style={{ fontSize: qAr ? 16 : 13, color: T.text, fontFamily: qAr ? AR : undefined, direction: qAr ? "rtl" : "ltr", marginBottom: 4, lineHeight: 1.4 }}>
                                {q.s}
                              </div>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(46,184,46,.08)", borderRadius: 8, padding: "4px 10px" }}>
                                <CheckCircle size={11} color={T.lime} />
                                <span style={{ fontSize: isAr(correctTxt) ? 14 : 12, color: T.green, fontWeight: 600, fontFamily: isAr(correctTxt) ? AR : undefined }}>
                                  {correctTxt}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
