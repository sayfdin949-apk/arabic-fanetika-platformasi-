import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Check, X, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { T } from "../../theme/tokens";
import { store } from "../../lib/storage";
import { useAuth } from "../../auth/AuthContext";

type Holat = "keldi" | "kelmadi";
type DavomatMap = Record<string, Holat>;

const todayISO = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`;
};

export function DavomatView() {
  const { user, users } = useAuth();
  const [sana, setSana] = useState(todayISO());
  const [davomat, setDavomat] = useState<DavomatMap>({});

  const students = users.filter((u) => u.role === "student");

  useEffect(() => {
    let alive = true;
    (async () => {
      const d = await store.get<DavomatMap>(`davomat_${sana}`);
      if (alive) setDavomat(d ?? {});
    })();
    return () => { alive = false; };
  }, [sana]);

  if (user?.role !== "teacher") return <Navigate to="/" replace />;

  const set = (id: string, holat: Holat) => {
    const next = { ...davomat, [id]: holat };
    setDavomat(next);
    void store.set(`davomat_${sana}`, next);
  };

  const kel = students.filter((s) => davomat[s.id] === "keldi").length;
  const kelmadi = students.filter((s) => davomat[s.id] === "kelmadi").length;
  const belgilanmagan = students.length - kel - kelmadi;
  const pct = students.length > 0 ? Math.round((kel / students.length) * 100) : 0;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>O'qituvchi</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Davomat</div>

          {/* Stat chips */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {[
              { icon: Users, label: "Jami", value: `${students.length}`, color: "rgba(255,255,255,.7)" },
              { icon: CheckCircle, label: "Keldi", value: `${kel}`, color: T.limeBrt },
              { icon: XCircle, label: "Kelmadi", value: `${kelmadi}`, color: "#ff8080" },
              { icon: Clock, label: "Belgilanmagan", value: `${belgilanmagan}`, color: "rgba(255,255,255,.5)" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "6px 11px" }}>
                <s.icon size={12} color={s.color} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>{s.label}:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Attendance progress bar */}
          <div style={{ height: 4, background: "rgba(255,255,255,.15)", borderRadius: 2, marginBottom: 0, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: T.gLimeH, borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 28px" }}>
        {/* Date picker */}
        <div style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid rgba(13,58,26,.08)",
          boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 4px 12px rgba(13,58,26,.06)",
          padding: "12px 14px",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: T.hint, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 3 }}>Sana</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>{formatDate(sana)}</div>
          </div>
          <input
            type="date"
            value={sana}
            onChange={(e) => setSana(e.target.value)}
            style={{
              border: "1px solid rgba(13,58,26,.15)",
              borderRadius: 9,
              padding: "8px 10px",
              fontSize: 13,
              color: T.green,
              outline: "none",
              background: "rgba(13,58,26,.03)",
            }}
          />
        </div>

        {/* Student list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {students.map((s, idx) => {
            const h = davomat[s.id];
            return (
              <div
                key={s.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: h === "keldi"
                    ? "1px solid rgba(46,184,46,.25)"
                    : h === "kelmadi"
                    ? "1px solid rgba(230,0,35,.2)"
                    : "1px solid rgba(13,58,26,.08)",
                  boxShadow: "0 1px 2px rgba(13,58,26,.04)",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "border-color .2s",
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: h === "keldi" ? T.gLime : h === "kelmadi" ? "rgba(230,0,35,.12)" : T.gGreen,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 17, fontWeight: 700,
                  color: h === "kelmadi" ? T.red : T.onCta,
                  flexShrink: 0,
                  transition: "background .2s",
                }}>
                  {s.ism[0]?.toUpperCase()}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.green, marginBottom: 1 }}>
                    {s.ism} {s.familya}
                  </div>
                  <div style={{ fontSize: 11, color: T.hint }}>
                    {idx + 1}-o'quvchi
                    {h && (
                      <span style={{ marginLeft: 8, fontWeight: 600, color: h === "keldi" ? T.lime : T.red }}>
                        · {h === "keldi" ? "Keldi ✓" : "Kelmadi ✗"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => set(s.id, "keldi")}
                    style={{
                      width: 40, height: 40, borderRadius: 10,
                      border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: h === "keldi" ? T.gLime : "rgba(13,58,26,.06)",
                      color: h === "keldi" ? T.onCta : T.hint,
                      transition: "all .15s",
                      boxShadow: h === "keldi" ? "0 2px 8px rgba(46,184,46,.35)" : "none",
                    }}
                    aria-label="Keldi"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => set(s.id, "kelmadi")}
                    style={{
                      width: 40, height: 40, borderRadius: 10,
                      border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: h === "kelmadi" ? "rgba(230,0,35,.14)" : "rgba(13,58,26,.06)",
                      color: h === "kelmadi" ? T.red : T.hint,
                      transition: "all .15s",
                    }}
                    aria-label="Kelmadi"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            );
          })}

          {students.length === 0 && (
            <div style={{
              background: "#fff",
              borderRadius: 14,
              border: "1px solid rgba(13,58,26,.08)",
              padding: "32px 20px",
              textAlign: "center",
            }}>
              <Users size={32} color="rgba(13,58,26,.2)" style={{ margin: "0 auto 10px" }} />
              <div style={{ fontSize: 14, color: T.hint }}>O'quvchilar yo'q</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
