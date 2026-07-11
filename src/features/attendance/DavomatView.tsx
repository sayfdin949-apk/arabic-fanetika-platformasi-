import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Check, X, Users, CheckCircle, XCircle, Clock, CalendarDays, TrendingUp } from "lucide-react";
import { T } from "../../theme/tokens";
import { store } from "../../lib/storage";
import { useAuth } from "../../auth/AuthContext";

type Holat = "keldi" | "kelmadi";
type DavomatMap = Record<string, Holat>;
type ViewMode = "kunlik" | "haftalik" | "oylik";

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const todayISO = () => toISO(new Date());

const lastNDays = (n: number): string[] => {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toISO(d));
  }
  return days;
};

const formatDate = (iso: string) => {
  const [, m, d] = iso.split("-");
  const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];
  return `${Number(d)} ${months[Number(m) - 1]}`;
};

const formatDateFull = (iso: string) => {
  const [y, m, d] = iso.split("-");
  const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`;
};

const DOW_SHORT = ["Yak", "Du", "Se", "Cho", "Pay", "Ju", "Sha"];

function getDow(iso: string) {
  return DOW_SHORT[new Date(iso).getDay()];
}

function StudentDavomatView() {
  const { user } = useAuth();
  const days = lastNDays(30);
  const [hist, setHist] = useState<Record<string, Holat | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const entries = await Promise.all(
        days.map(async (iso) => {
          const d = await store.get<DavomatMap>(`davomat_${iso}`);
          return [iso, d?.[user!.id] ?? null] as [string, Holat | null];
        }),
      );
      if (alive) { setHist(Object.fromEntries(entries)); setLoading(false); }
    })();
    return () => { alive = false; };
    // days/user qasddan chiqarib tashlangan: tarix faqat komponent
    // ochilganda bir marta yuklanadi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const came = days.filter((iso) => hist[iso] === "keldi").length;
  const missed = days.filter((iso) => hist[iso] === "kelmadi").length;
  const marked = came + missed;
  const pct = marked > 0 ? Math.round((came / marked) * 100) : 0;
  const todayStr = todayISO();
  const todayStatus = hist[todayStr];

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 22px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
            So'nggi 30 kun
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Mening davomatim</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Keldi", value: `${came}`, color: T.limeBrt },
              { label: "Kelmadi", value: `${missed}`, color: "#ff8080" },
              { label: "Davomat", value: marked > 0 ? `${pct}%` : "—", color: "#fff" },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px" }}>
        {/* Bugun */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: todayStatus === "keldi" ? T.gLime : todayStatus === "kelmadi" ? "rgba(230,0,35,.12)" : "rgba(13,58,26,.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {todayStatus === "keldi" ? <CheckCircle size={22} color={T.onCta} /> : todayStatus === "kelmadi" ? <XCircle size={22} color={T.red} /> : <Clock size={22} color={T.hint} />}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Bugun — {formatDateFull(todayStr)}</div>
            <div style={{ fontSize: 12, color: todayStatus === "keldi" ? T.lime : todayStatus === "kelmadi" ? T.red : T.hint, marginTop: 2, fontWeight: 600 }}>
              {todayStatus === "keldi" ? "Keldingiz ✓" : todayStatus === "kelmadi" ? "Kelmagansiz ✗" : "Belgilanmagan"}
            </div>
          </div>
        </div>

        {/* 30-kunlik kalendar */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
            <CalendarDays size={14} color={T.green} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>30 kunlik tarix</span>
          </div>
          {loading ? (
            <div style={{ textAlign: "center", color: T.hint, fontSize: 12, padding: "16px 0" }}>Yuklanmoqda…</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
              {days.map((iso) => {
                const h = hist[iso];
                const isToday = iso === todayStr;
                const bg = h === "keldi" ? "rgba(46,184,46,.15)" : h === "kelmadi" ? "rgba(230,0,35,.1)" : "rgba(13,58,26,.04)";
                const border = isToday ? `2px solid ${T.lime}` : "1px solid transparent";
                return (
                  <div key={iso} style={{ borderRadius: 8, background: bg, border, padding: "5px 2px", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: T.hint, marginBottom: 2 }}>{getDow(iso)}</div>
                    <div style={{ fontSize: 11, fontWeight: isToday ? 800 : 600, color: h === "keldi" ? T.green : h === "kelmadi" ? T.red : T.hint }}>
                      {formatDate(iso).split(" ")[0]}
                    </div>
                    <div style={{ fontSize: 12, marginTop: 1 }}>
                      {h === "keldi" ? "✓" : h === "kelmadi" ? "✗" : "·"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Legend */}
          <div style={{ display: "flex", gap: 14, marginTop: 14, justifyContent: "center" }}>
            {[
              { color: "rgba(46,184,46,.15)", label: "Keldi", text: T.green },
              { color: "rgba(230,0,35,.1)", label: "Kelmadi", text: T.red },
              { color: "rgba(13,58,26,.04)", label: "Belgilanmagan", text: T.hint },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
                <span style={{ fontSize: 10, color: l.text }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DavomatView() {
  const { user, users } = useAuth();
  const [mode, setMode] = useState<ViewMode>("kunlik");
  const [sana, setSana] = useState(todayISO());
  const [davomat, setDavomat] = useState<DavomatMap>({});
  // history: iso → DavomatMap
  const [history, setHistory] = useState<Record<string, DavomatMap>>({});

  const students = users.filter((u) => u.role === "student");
  const histDays = mode === "haftalik" ? lastNDays(7) : lastNDays(30);

  // Kunlik load
  useEffect(() => {
    if (mode !== "kunlik") return;
    let alive = true;
    (async () => {
      const d = await store.get<DavomatMap>(`davomat_${sana}`);
      if (alive) setDavomat(d ?? {});
    })();
    return () => { alive = false; };
  }, [sana, mode]);

  // Tarix load
  useEffect(() => {
    if (mode === "kunlik") return;
    let alive = true;
    (async () => {
      const entries = await Promise.all(
        histDays.map(async (iso) => {
          const d = await store.get<DavomatMap>(`davomat_${iso}`);
          return [iso, d ?? {}] as [string, DavomatMap];
        }),
      );
      if (alive) setHistory(Object.fromEntries(entries));
    })();
    return () => { alive = false; };
    // histDays qasddan chiqarib tashlangan: mode "kunlik"dan
    // "tarix"ga o'zgarganda yetarli, kunlar ro'yxati o'sha paytdagi holat.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (user?.role === "student") return <StudentDavomatView />;
  if (user?.role !== "teacher" && user?.role !== "ceo") return <Navigate to="/" replace />;

  const set = (id: string, holat: Holat) => {
    setDavomat((cur) => ({ ...cur, [id]: holat }));
    void store.update<DavomatMap>(`davomat_${sana}`, (cur) => ({ ...(cur ?? {}), [id]: holat }));
  };

  const kel = students.filter((s) => davomat[s.id] === "keldi").length;
  const kelmadi = students.filter((s) => davomat[s.id] === "kelmadi").length;
  const belgilanmagan = students.length - kel - kelmadi;
  const pct = students.length > 0 ? Math.round((kel / students.length) * 100) : 0;

  // History stats per student
  const studentStats = students.map((s) => {
    const total = histDays.length;
    const came = histDays.filter((iso) => history[iso]?.[s.id] === "keldi").length;
    const missed = histDays.filter((iso) => history[iso]?.[s.id] === "kelmadi").length;
    const notMarked = total - came - missed;
    const rate = total > 0 ? Math.round((came / total) * 100) : 0;
    return { ...s, came, missed, notMarked, rate, total };
  }).sort((a, b) => b.rate - a.rate);

  const modeLabel: Record<ViewMode, string> = {
    kunlik: "Kunlik", haftalik: "Haftalik", oylik: "Oylik",
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>O'qituvchi</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Davomat</div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {[
              { icon: Users, label: "Jami", value: `${students.length}`, color: "rgba(255,255,255,.7)" },
              ...(mode === "kunlik" ? [
                { icon: CheckCircle, label: "Keldi", value: `${kel}`, color: T.limeBrt },
                { icon: XCircle, label: "Kelmadi", value: `${kelmadi}`, color: "#ff8080" },
                { icon: Clock, label: "Belgilanmagan", value: `${belgilanmagan}`, color: "rgba(255,255,255,.5)" },
              ] : []),
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "6px 11px" }}>
                <s.icon size={12} color={s.color} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>{s.label}:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {mode === "kunlik" && (
            <div style={{ height: 4, background: "rgba(255,255,255,.15)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: T.gLimeH, borderRadius: 2, transition: "width .4s" }} />
            </div>
          )}

          {/* Mode tabs */}
          <div style={{ display: "flex", marginTop: 12 }}>
            {(["kunlik", "haftalik", "oylik"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: "10px 4px", background: "none", border: "none",
                  borderBottom: mode === m ? "3px solid #fff" : "3px solid transparent",
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                  color: mode === m ? "#fff" : "rgba(255,255,255,.5)",
                  transition: "all .15s",
                }}
              >
                {modeLabel[m]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px" }}>
        {/* KUNLIK mode */}
        {mode === "kunlik" && (
          <>
            {/* Date picker */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04)", padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: T.hint, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 3 }}>Sana</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>{formatDateFull(sana)}</div>
              </div>
              <input
                type="date"
                value={sana}
                onChange={(e) => setSana(e.target.value)}
                style={{ border: "1px solid rgba(13,58,26,.15)", borderRadius: 9, padding: "8px 10px", fontSize: 13, color: T.green, outline: "none", background: "rgba(13,58,26,.03)" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {students.map((s, idx) => {
                const h = davomat[s.id];
                return (
                  <div key={s.id} style={{ background: "#fff", borderRadius: 14, border: h === "keldi" ? "1px solid rgba(46,184,46,.25)" : h === "kelmadi" ? "1px solid rgba(230,0,35,.2)" : "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, transition: "border-color .2s" }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: h === "keldi" ? T.gLime : h === "kelmadi" ? "rgba(230,0,35,.12)" : T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: h === "kelmadi" ? T.red : T.onCta, flexShrink: 0, transition: "background .2s" }}>
                      {s.ism[0]?.toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.green, marginBottom: 1 }}>{s.ism} {s.familya}</div>
                      <div style={{ fontSize: 11, color: T.hint }}>
                        {idx + 1}-o'quvchi
                        {h && <span style={{ marginLeft: 8, fontWeight: 600, color: h === "keldi" ? T.lime : T.red }}>· {h === "keldi" ? "Keldi ✓" : "Kelmadi ✗"}</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button onClick={() => set(s.id, "keldi")} style={{ width: 40, height: 40, borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: h === "keldi" ? T.gLime : "rgba(13,58,26,.06)", color: h === "keldi" ? T.onCta : T.hint, transition: "all .15s", boxShadow: h === "keldi" ? "0 2px 8px rgba(46,184,46,.35)" : "none" }} aria-label="Keldi"><Check size={18} /></button>
                      <button onClick={() => set(s.id, "kelmadi")} style={{ width: 40, height: 40, borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: h === "kelmadi" ? "rgba(230,0,35,.14)" : "rgba(13,58,26,.06)", color: h === "kelmadi" ? T.red : T.hint, transition: "all .15s" }} aria-label="Kelmadi"><X size={18} /></button>
                    </div>
                  </div>
                );
              })}
              {students.length === 0 && (
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "32px 20px", textAlign: "center" }}>
                  <Users size={32} color="rgba(13,58,26,.2)" style={{ margin: "0 auto 10px" }} />
                  <div style={{ fontSize: 14, color: T.hint }}>O'quvchilar yo'q</div>
                </div>
              )}
            </div>
          </>
        )}

        {/* HAFTALIK / OYLIK mode */}
        {mode !== "kunlik" && (
          <>
            <div style={{ fontSize: 12, color: T.hint, marginBottom: 12 }}>
              So'nggi {mode === "haftalik" ? "7" : "30"} kunlik davomat ko'rsatkichi
            </div>

            {/* Student summary cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {studentStats.map((s) => (
                <div key={s.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)", padding: "14px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.rate >= 75 ? T.gLime : s.rate >= 50 ? "linear-gradient(135deg,#FFA500,#FF8C00)" : "rgba(230,0,35,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: s.rate >= 50 ? T.onCta : T.red, flexShrink: 0 }}>
                      {s.ism[0]?.toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>{s.ism} {s.familya}</div>
                      <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
                        <span style={{ fontSize: 11, color: T.lime, fontWeight: 600 }}>✓ {s.came}</span>
                        <span style={{ fontSize: 11, color: T.red, fontWeight: 600 }}>✗ {s.missed}</span>
                        {s.notMarked > 0 && <span style={{ fontSize: 11, color: T.hint }}>— {s.notMarked}</span>}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: s.rate >= 75 ? T.lime : s.rate >= 50 ? "#FFA500" : T.red }}>{s.rate}%</div>
                      <div style={{ fontSize: 10, color: T.hint }}>{s.came}/{s.total} kun</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 6, borderRadius: 3, background: "rgba(13,58,26,.08)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.rate}%`, borderRadius: 3, background: s.rate >= 75 ? T.gLimeH : s.rate >= 50 ? "linear-gradient(90deg,#FFA500,#FF8C00)" : "linear-gradient(90deg,#e60023,#c00)", transition: "width .5s" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar grid (haftalik only — 7 days fits on screen) */}
            {mode === "haftalik" && (
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", overflow: "hidden" }}>
                <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid rgba(13,58,26,.07)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <CalendarDays size={14} color={T.green} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Haftalik jadvali</span>
                  </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 360 }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "8px 10px", fontSize: 11, color: T.hint, fontWeight: 600, textAlign: "left", borderBottom: "1px solid rgba(13,58,26,.07)" }}>O'quvchi</th>
                        {histDays.map((iso) => (
                          <th key={iso} style={{ padding: "8px 6px", fontSize: 10, color: T.hint, fontWeight: 600, textAlign: "center", borderBottom: "1px solid rgba(13,58,26,.07)", whiteSpace: "nowrap" }}>
                            <div style={{ color: iso === todayISO() ? T.green : T.hint, fontWeight: iso === todayISO() ? 700 : 600 }}>{getDow(iso)}</div>
                            <div>{formatDate(iso)}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s, si) => (
                        <tr key={s.id} style={{ background: si % 2 === 0 ? "transparent" : "rgba(13,58,26,.02)" }}>
                          <td style={{ padding: "8px 10px", fontSize: 12, fontWeight: 600, color: T.green, whiteSpace: "nowrap", borderBottom: "1px solid rgba(13,58,26,.04)" }}>{s.ism}</td>
                          {histDays.map((iso) => {
                            const h = history[iso]?.[s.id];
                            return (
                              <td key={iso} style={{ padding: "6px 4px", textAlign: "center", borderBottom: "1px solid rgba(13,58,26,.04)" }}>
                                <div style={{ width: 24, height: 24, borderRadius: 6, margin: "0 auto", background: h === "keldi" ? "rgba(46,184,46,.15)" : h === "kelmadi" ? "rgba(230,0,35,.12)" : "rgba(13,58,26,.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                                  {h === "keldi" ? <span style={{ color: T.lime, fontWeight: 700 }}>✓</span> : h === "kelmadi" ? <span style={{ color: T.red, fontWeight: 700 }}>✗</span> : <span style={{ color: T.hint }}>—</span>}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Oylik: summary stats */}
            {mode === "oylik" && (
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                  <TrendingUp size={14} color={T.green} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>30 kunlik umumiy</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Eng yaxshi", value: studentStats[0] ? `${studentStats[0].rate}%` : "—", sub: studentStats[0]?.ism ?? "", color: T.lime },
                    { label: "O'rtacha davomat", value: `${Math.round(studentStats.reduce((s, x) => s + x.rate, 0) / (studentStats.length || 1))}%`, sub: "sinf bo'yicha", color: T.green },
                    { label: "Eng past", value: studentStats[studentStats.length - 1] ? `${studentStats[studentStats.length - 1].rate}%` : "—", sub: studentStats[studentStats.length - 1]?.ism ?? "", color: studentStats[studentStats.length - 1] && studentStats[studentStats.length - 1].rate < 50 ? T.red : "#FFA500" },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "rgba(13,58,26,.03)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: T.hint, marginTop: 2 }}>{s.label}</div>
                      <div style={{ fontSize: 10, color: T.text2, fontWeight: 600, marginTop: 1 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
