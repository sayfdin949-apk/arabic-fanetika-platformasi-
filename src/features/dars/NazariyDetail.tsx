import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ChevronLeft, BookMarked, ClipboardCheck, ArrowRight } from "lucide-react";
import { T } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { MD } from "../../lib/md";
import { Page, Card, SectionTitle } from "../../components/ui";
import { Quiz, type QuizQuestion } from "../../components/Quiz";
import { useProgress } from "../progress/ProgressContext";

export function NazariyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isNazUnlocked, submitNaz } = useProgress();
  const [phase, setPhase] = useState<"mavzu" | "test">("mavzu");
  const [resultPct, setResultPct] = useState<number | null>(null);

  const dars = NAZARIY.find((d) => d.id === Number(id));

  // id o'zgarganda (keyingi darsga o'tganda) holatni tiklash
  useEffect(() => {
    setPhase("mavzu");
    setResultPct(null);
  }, [id]);

  // Variantlar barqaror bo'lishi uchun useMemo (aks holda har render'da qayta aralashadi)
  const questions: QuizQuestion[] = useMemo(
    () =>
      dars
        ? dars.vazifalar.map((v) => ({
            q: v.savol,
            options: v.variantlar.map((t, i) => ({ text: t, correct: i === v.togri })),
          }))
        : [],
    [dars],
  );

  if (!dars) return <Navigate to="/dars" replace />;
  if (!isNazUnlocked(dars.id)) return <Navigate to="/dars" replace />;

  const hasNext = dars.id < NAZARIY.length;
  const passed = resultPct !== null && resultPct >= 80;

  return (
    <Page>
      <button
        onClick={() => navigate("/dars")}
        style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none", color: T.text2, fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0 }}
      >
        <ChevronLeft size={16} /> Darslar
      </button>

      {/* Faza tugmalari */}
      <div style={{ display: "flex", gap: 6, background: "rgba(13,58,26,.06)", borderRadius: 12, padding: 4, marginBottom: 16 }}>
        {(
          [
            { k: "mavzu", label: "Mavzu", icon: BookMarked },
            { k: "test", label: "Test", icon: ClipboardCheck },
          ] as const
        ).map((p) => (
          <button
            key={p.k}
            onClick={() => setPhase(p.k)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "9px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              background: phase === p.k ? "#fff" : "transparent",
              color: phase === p.k ? T.green : T.hint,
              boxShadow: phase === p.k ? "0 1px 4px rgba(13,58,26,.12)" : "none",
            }}
          >
            <p.icon size={15} /> {p.label}
          </button>
        ))}
      </div>

      {phase === "mavzu" ? (
        <>
          <Card style={{ padding: 16 }}>
            <MD text={dars.mavzu} />
          </Card>
          <button
            onClick={() => setPhase("test")}
            style={{ width: "100%", marginTop: 14, background: T.gLime, color: T.onCta, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(46,184,46,.3)" }}
          >
            Testni boshlash
          </button>
        </>
      ) : (
        <>
          <SectionTitle>Vazifalar</SectionTitle>
          <Quiz
            questions={questions}
            onDone={(ok, tot) => {
              submitNaz(dars.id, ok, tot);
              setResultPct(Math.round((ok / tot) * 100));
            }}
          />
          {passed && hasNext && (
            <button
              onClick={() => navigate(`/dars/nazariy/${dars.id + 1}`)}
              style={{ width: "100%", marginTop: 12, background: T.gGreen, color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              Keyingi dars <ArrowRight size={18} />
            </button>
          )}
          {passed && !hasNext && (
            <div style={{ marginTop: 12, textAlign: "center", fontSize: 13, color: T.green500, fontWeight: 600 }}>
              🎉 Barcha nazariy darslar yakunlandi!
            </div>
          )}
        </>
      )}
    </Page>
  );
}
