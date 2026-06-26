import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { AMALIY } from "../../content/amaliy";
import type { AmalBob } from "../../content/types";
import { speakAr } from "../../lib/tts";
import { Page, Card, SectionTitle } from "../../components/ui";
import { Quiz, type QuizQuestion } from "../../components/Quiz";
import { useProgress } from "../progress/ProgressContext";

type TabKey = "maxraj" | "sifat" | "shakl" | "harakat" | "soz" | "oqish" | "yozish" | "uy" | "test";
const TABS: { k: TabKey; label: string }[] = [
  { k: "maxraj", label: "Maxraj" },
  { k: "sifat", label: "Sifat" },
  { k: "shakl", label: "Shakl" },
  { k: "harakat", label: "Harakat" },
  { k: "soz", label: "So'z" },
  { k: "oqish", label: "O'qish" },
  { k: "yozish", label: "Yozish" },
  { k: "uy", label: "Uy vazifa" },
  { k: "test", label: "Test" },
];

const SpeakBtn = ({ text }: { text: string }) => (
  <button
    onClick={() => speakAr(text)}
    style={{ background: "rgba(46,184,46,.12)", border: "none", borderRadius: 9, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", color: T.green500, cursor: "pointer", flexShrink: 0 }}
    aria-label="Eshitish"
  >
    <Volume2 size={16} />
  </button>
);

const ArLetter = ({ ch, size = 30 }: { ch: string; size?: number }) => (
  <span style={{ fontFamily: AR, fontSize: size, color: T.green, fontWeight: 700 }}>{ch}</span>
);

function TabBody({ bob, tab, questions, onTest }: { bob: AmalBob; tab: TabKey; questions: QuizQuestion[]; onTest: (ok: number, tot: number) => void }) {
  switch (tab) {
    case "maxraj":
      return (
        <Stack>
          {bob.maxraj.map((m, i) => (
            <Card key={i} style={{ padding: 14 }}>
              <Row>
                <ArLetter ch={m.h} />
                <div style={{ fontSize: 13, fontWeight: 600, color: T.green500, flex: 1 }}>{m.mx}</div>
                <SpeakBtn text={m.h} />
              </Row>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.7, marginTop: 8 }}>{m.iz}</div>
            </Card>
          ))}
        </Stack>
      );
    case "sifat":
      return (
        <Stack>
          {bob.sifatlar.map((s, i) => (
            <Card key={i} style={{ padding: 14 }}>
              <Row>
                <ArLetter ch={s.h} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
                  {s.sf.map((x, j) => (
                    <span key={j} style={{ fontSize: 12, fontWeight: 500, color: T.green500, background: "rgba(46,184,46,.12)", borderRadius: 8, padding: "4px 9px" }}>
                      {x}
                    </span>
                  ))}
                </div>
              </Row>
            </Card>
          ))}
        </Stack>
      );
    case "shakl":
      return (
        <Stack>
          {bob.shakllar.map((sh, i) => (
            <Card key={i} style={{ padding: 14 }}>
              <Row>
                <ArLetter ch={sh.h} />
                <SpeakBtn text={sh.h} />
              </Row>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 10 }}>
                {[
                  { l: "Mustaqil", v: sh.m },
                  { l: "Boshi", v: sh.b },
                  { l: "O'rtasi", v: sh.o },
                  { l: "Oxiri", v: sh.x },
                ].map((c) => (
                  <div key={c.l} style={{ textAlign: "center", background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "8px 4px" }}>
                    <div style={{ fontSize: 10, color: T.hint, marginBottom: 4 }}>{c.l}</div>
                    <div style={{ fontFamily: AR, fontSize: 22, color: T.green }}>{c.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: T.text2, marginTop: 8 }}>{sh.iz}</div>
            </Card>
          ))}
        </Stack>
      );
    case "harakat":
      return (
        <Stack>
          {bob.harakatlar.map((h, i) => (
            <Card key={i} style={{ padding: 14 }}>
              <Row>
                <ArLetter ch={h.h} />
              </Row>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 10 }}>
                {[
                  { l: "Fatha", ar: h.f, oq: h.of },
                  { l: "Kasra", ar: h.k, oq: h.ok },
                  { l: "Damma", ar: h.d, oq: h.od },
                  { l: "Sukun", ar: h.s, oq: h.os },
                ].map((c) => (
                  <button
                    key={c.l}
                    onClick={() => speakAr(c.ar)}
                    style={{ textAlign: "center", background: "rgba(13,58,26,.04)", border: "none", borderRadius: 10, padding: "8px 4px", cursor: "pointer" }}
                  >
                    <div style={{ fontSize: 10, color: T.hint, marginBottom: 4 }}>{c.l}</div>
                    <div style={{ fontFamily: AR, fontSize: 22, color: T.green }}>{c.ar}</div>
                    <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>{c.oq}</div>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </Stack>
      );
    case "soz":
      return (
        <Stack>
          {bob.sozlar.map((s, i) => (
            <Card key={i} style={{ padding: "12px 14px" }}>
              <Row>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: AR, fontSize: 24, color: T.green, fontWeight: 700, direction: "rtl" }}>{s.ar}</div>
                  <div style={{ fontSize: 12, color: T.text2, marginTop: 2 }}>
                    {s.oq} — {s.tr}
                  </div>
                  <div style={{ fontSize: 11, color: T.hint, marginTop: 2 }}>{s.h}</div>
                </div>
                <SpeakBtn text={s.ar} />
              </Row>
            </Card>
          ))}
        </Stack>
      );
    case "oqish":
      return (
        <Stack>
          {bob.oqish.map((o, i) => (
            <Card key={i} style={{ padding: "12px 14px" }}>
              <Row>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: AR, fontSize: 22, color: T.green, fontWeight: 700, direction: "rtl" }}>{o.ar}</div>
                  <div style={{ fontSize: 12, color: T.text2, marginTop: 3 }}>{o.iz}</div>
                </div>
                <SpeakBtn text={o.ar} />
              </Row>
            </Card>
          ))}
        </Stack>
      );
    case "yozish":
      return (
        <Stack>
          {bob.yozish.map((y, i) => (
            <Card key={i} style={{ padding: 14 }}>
              <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{y.t}</div>
              <div style={{ fontFamily: AR, fontSize: 20, color: T.green500, marginTop: 8, direction: "rtl" }}>{y.m}</div>
            </Card>
          ))}
        </Stack>
      );
    case "uy":
      return (
        <Card style={{ padding: 16 }}>
          {bob.uyvazifa.map((u, i) => (
            <div key={i} style={{ display: "flex", gap: 9, fontSize: 13, color: T.text, lineHeight: 1.6, marginBottom: i < bob.uyvazifa.length - 1 ? 10 : 0 }}>
              <span style={{ color: T.lime, flexShrink: 0 }}>▸</span>
              <span>{u}</span>
            </div>
          ))}
        </Card>
      );
    case "test":
      return (
        <>
          <SectionTitle>Test</SectionTitle>
          <Quiz questions={questions} onDone={onTest} />
        </>
      );
  }
}

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
);
const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>{children}</div>
);

export function AmaliyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { submitAmal } = useProgress();
  const [tab, setTab] = useState<TabKey>("maxraj");

  // Bob o'zgarganda birinchi tabga qaytish
  useEffect(() => {
    setTab("maxraj");
  }, [id]);

  const bob = AMALIY.find((b) => b.id === Number(id));

  const questions: QuizQuestion[] = useMemo(
    () =>
      bob
        ? bob.test.map((q) => ({
            q: q.s,
            options: q.v.map((t, i) => ({ text: t, correct: i === q.t })),
          }))
        : [],
    [bob],
  );

  if (!bob) return <Navigate to="/dars" replace />;

  const idx = AMALIY.findIndex((b) => b.id === bob.id);
  const prev = idx > 0 ? AMALIY[idx - 1] : null;
  const next = idx < AMALIY.length - 1 ? AMALIY[idx + 1] : null;

  return (
    <Page>
      <button
        onClick={() => navigate("/dars")}
        style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none", color: T.text2, fontSize: 13, cursor: "pointer", marginBottom: 10, padding: 0 }}
      >
        <ChevronLeft size={16} /> Darslar
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ fontFamily: AR, fontSize: 30, color: T.green, fontWeight: 700 }}>{bob.harflar.join(" ")}</div>
        <div>
          <div style={{ fontSize: 11, color: T.hint }}>{bob.id}-bob</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.green }}>{bob.nomlar.join(" · ")}</div>
        </div>
      </div>

      {/* Tab bar (gorizontal scroll) */}
      <div className="no-scrollbar" style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 14, WebkitOverflowScrolling: "touch" }}>
        {TABS.map((t) => (
          <button
            key={t.k}
            onClick={(e) => {
              setTab(t.k);
              e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }}
            style={{
              flexShrink: 0,
              padding: "8px 14px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background: tab === t.k ? T.gLime : "rgba(13,58,26,.06)",
              color: tab === t.k ? T.onCta : T.text2,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <TabBody bob={bob} tab={tab} questions={questions} onTest={(ok, tot) => submitAmal(bob.id, ok, tot)} />

      {/* Oldingi / Keyingi bob */}
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button
          disabled={!prev}
          onClick={() => prev && navigate(`/dars/amaliy/${prev.id}`)}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", borderRadius: 11, border: "1px solid rgba(13,58,26,.12)", background: prev ? "rgba(13,58,26,.04)" : "transparent", color: prev ? T.text2 : "rgba(13,58,26,.25)", fontSize: 13, fontWeight: 500, cursor: prev ? "pointer" : "default" }}
        >
          <ChevronLeft size={16} /> Oldingi
        </button>
        <button
          disabled={!next}
          onClick={() => next && navigate(`/dars/amaliy/${next.id}`)}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", borderRadius: 11, border: "1px solid rgba(13,58,26,.12)", background: next ? "rgba(13,58,26,.04)" : "transparent", color: next ? T.text2 : "rgba(13,58,26,.25)", fontSize: 13, fontWeight: 500, cursor: next ? "pointer" : "default" }}
        >
          Keyingi <ChevronRight size={16} />
        </button>
      </div>
    </Page>
  );
}
