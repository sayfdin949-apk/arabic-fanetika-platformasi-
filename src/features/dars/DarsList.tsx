import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { PageHeader, Page, Card } from "../../components/ui";
import { useProgress } from "../progress/ProgressContext";

type Tur = "nazariy" | "amaliy";

export function DarsList() {
  const navigate = useNavigate();
  const { nazDone, amalDone, isNazUnlocked } = useProgress();
  const [tur, setTur] = useState<Tur>("nazariy");

  return (
    <>
      <PageHeader kicker="Darslar" title="Dars" sub="Nazariy va amaliy darslar" />
      <Page>
        {/* Segment: Nazariy / Amaliy */}
        <div style={{ display: "flex", gap: 6, background: "rgba(13,58,26,.06)", borderRadius: 12, padding: 4, marginBottom: 16 }}>
          {(["nazariy", "amaliy"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTur(t)}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: tur === t ? "#fff" : "transparent",
                color: tur === t ? T.green : T.hint,
                boxShadow: tur === t ? "0 1px 4px rgba(13,58,26,.12)" : "none",
              }}
            >
              {t === "nazariy" ? "Nazariy" : "Amaliy"}
            </button>
          ))}
        </div>

        {tur === "nazariy" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAZARIY.map((d) => {
              const unlocked = isNazUnlocked(d.id);
              const done = nazDone[d.id];
              return (
                <Card key={d.id} style={{ opacity: unlocked ? 1 : 0.6 }}>
                  <button
                    disabled={!unlocked}
                    onClick={() => navigate(`/dars/nazariy/${d.id}`)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 14,
                      background: "none",
                      border: "none",
                      cursor: unlocked ? "pointer" : "not-allowed",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: AR, fontSize: 24, color: "#fff" }}>
                      {d.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: T.hint, marginBottom: 2 }}>{d.id}-dars</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>{d.nomi}</div>
                      {done && <div style={{ fontSize: 11, color: done.pct >= 80 ? T.lime : T.text2, marginTop: 3 }}>Natija: {done.pct}%</div>}
                      {!unlocked && !done && <div style={{ fontSize: 11, color: T.hint, marginTop: 3 }}>Oldingi darsni 80%+ bilan yakunlang</div>}
                    </div>
                    {!unlocked ? (
                      <Lock size={18} color={T.hint} />
                    ) : done ? (
                      <CheckCircle size={20} color={T.lime} />
                    ) : (
                      <ChevronRight size={18} color={T.hint} />
                    )}
                  </button>
                </Card>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AMALIY.map((b) => {
              const done = amalDone[b.id];
              return (
                <Card key={b.id}>
                  <button
                    onClick={() => navigate(`/dars/amaliy/${b.id}`)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: 14, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: AR, fontSize: 22, color: T.onCta, gap: 2 }}>
                      {b.harflar.join(" ")}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: T.hint, marginBottom: 2 }}>{b.id}-bob</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>{b.nomlar.join(" · ")}</div>
                      {done && <div style={{ fontSize: 11, color: done.pct >= 80 ? T.lime : T.text2, marginTop: 3 }}>Test: {done.pct}%</div>}
                    </div>
                    {done ? <CheckCircle size={20} color={T.lime} /> : <ChevronRight size={18} color={T.hint} />}
                  </button>
                </Card>
              );
            })}
          </div>
        )}
      </Page>
    </>
  );
}
