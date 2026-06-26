import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { T } from "../../theme/tokens";
import { store } from "../../lib/storage";
import { PageHeader, Page, Card } from "../../components/ui";
import { useAuth } from "../../auth/AuthContext";

type Holat = "keldi" | "kelmadi";
type DavomatMap = Record<string, Holat>;

const todayISO = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
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
    return () => {
      alive = false;
    };
  }, [sana]);

  if (user?.role !== "teacher") return <Navigate to="/" replace />;

  const set = (id: string, holat: Holat) => {
    const next = { ...davomat, [id]: holat };
    setDavomat(next);
    void store.set(`davomat_${sana}`, next);
  };

  const kel = students.filter((s) => davomat[s.id] === "keldi").length;
  const kelmadi = students.filter((s) => davomat[s.id] === "kelmadi").length;

  return (
    <>
      <PageHeader kicker="O'qituvchi" title="Davomat" sub={`Keldi: ${kel} · Kelmadi: ${kelmadi} · Belgilanmagan: ${students.length - kel - kelmadi}`} />
      <Page>
        <Card style={{ padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, color: T.text2, fontWeight: 500 }}>Sana:</span>
          <input
            type="date"
            value={sana}
            onChange={(e) => setSana(e.target.value)}
            style={{ flex: 1, border: "1px solid rgba(13,58,26,.15)", borderRadius: 9, padding: "8px 10px", fontSize: 13, color: T.green, outline: "none" }}
          />
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {students.map((s) => {
            const h = davomat[s.id];
            return (
              <Card key={s.id} style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: T.onCta, flexShrink: 0 }}>
                  {s.ism[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>
                    {s.ism} {s.familya}
                  </div>
                  <div style={{ fontSize: 11, color: T.hint }}>@{s.login}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => set(s.id, "keldi")}
                    style={{ width: 38, height: 38, borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: h === "keldi" ? T.gLime : "rgba(13,58,26,.06)", color: h === "keldi" ? T.onCta : T.hint }}
                    aria-label="Keldi"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => set(s.id, "kelmadi")}
                    style={{ width: 38, height: 38, borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: h === "kelmadi" ? "rgba(230,0,35,.14)" : "rgba(13,58,26,.06)", color: h === "kelmadi" ? T.red : T.hint }}
                    aria-label="Kelmadi"
                  >
                    <X size={18} />
                  </button>
                </div>
              </Card>
            );
          })}
          {students.length === 0 && <div style={{ fontSize: 13, color: T.hint, textAlign: "center", padding: 20 }}>O'quvchilar yo'q.</div>}
        </div>
      </Page>
    </>
  );
}
