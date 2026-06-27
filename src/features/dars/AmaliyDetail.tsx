import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Volume2, Clock } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { AMALIY } from "../../content/amaliy";
import type { AmalBob } from "../../content/types";
import { speakAr } from "../../lib/tts";
import { Card } from "../../components/ui";
import { Quiz, type QuizQuestion } from "../../components/Quiz";
import { LessonImages } from "../../components/LessonImages";
import { LessonAudio } from "../../components/LessonAudio";
import { useProgress } from "../progress/ProgressContext";
import { useAuth } from "../../auth/AuthContext";

type TabKey = "maxraj" | "sifat" | "shakl" | "harakat" | "soz" | "oqish" | "yozish" | "uy" | "rasmlar" | "test";

const TABS: { k: TabKey; label: string; emoji: string }[] = [
  { k: "maxraj",  label: "Maxraj",    emoji: "👄" },
  { k: "sifat",   label: "Sifat",     emoji: "📋" },
  { k: "shakl",   label: "Shakl",     emoji: "✏️" },
  { k: "harakat", label: "Harakat",   emoji: "🔤" },
  { k: "soz",     label: "So'z",      emoji: "📖" },
  { k: "oqish",   label: "O'qish",    emoji: "🗣️" },
  { k: "yozish",  label: "Yozish",    emoji: "🖊️" },
  { k: "uy",      label: "Uy vazifa", emoji: "🏠" },
  { k: "rasmlar", label: "Rasmlar",   emoji: "🖼️" },
  { k: "test",    label: "Test",      emoji: "✅" },
];

const SpeakBtn = ({ text }: { text: string }) => (
  <button
    onClick={() => speakAr(text)}
    style={{ background: T.gLime, border: "none", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: T.onCta, cursor: "pointer", flexShrink: 0 }}
    aria-label="Eshitish"
  >
    <Volume2 size={16} />
  </button>
);

const ArLetter = ({ ch, size = 30 }: { ch: string; size?: number }) => (
  <span style={{ fontFamily: AR, fontSize: size, color: T.green, fontWeight: 700 }}>{ch}</span>
);

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
);

function TabBody({ bob, tab, questions, onTest, onWrong, isTeacher }: { bob: AmalBob; tab: TabKey; questions: QuizQuestion[]; onTest: (ok: number, tot: number) => void; onWrong: (wrongIndices: number[]) => void; isTeacher: boolean }) {
  switch (tab) {
    case "maxraj":
      return (
        <Stack>
          {bob.maxraj.map((m, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArLetter ch={m.h} size={26} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.hint, marginBottom: 2 }}>Maxraj joyi</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{m.mx}</div>
                </div>
                <SpeakBtn text={m.h} />
              </div>
              <div style={{ background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "10px 12px", fontSize: 15, color: T.text, lineHeight: 1.7 }}>
                {m.iz}
              </div>
            </Card>
          ))}
        </Stack>
      );

    case "sifat":
      return (
        <Stack>
          {bob.sifatlar.map((s, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArLetter ch={s.h} size={26} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text2 }}>Sifatlar</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.sf.map((x, j) => (
                  <span key={j} style={{ fontSize: 14, fontWeight: 600, color: T.green, background: "rgba(46,184,46,.1)", border: "1px solid rgba(46,184,46,.2)", borderRadius: 20, padding: "5px 13px" }}>
                    {x}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </Stack>
      );

    case "shakl":
      return (
        <Stack>
          {bob.shakllar.map((sh, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArLetter ch={sh.h} size={26} />
                </div>
                <div style={{ flex: 1, fontSize: 14, color: T.text2 }}>{sh.iz}</div>
                <SpeakBtn text={sh.h} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {[
                  { l: "Mustaqil", v: sh.m },
                  { l: "Boshi",    v: sh.b },
                  { l: "O'rtasi",  v: sh.o },
                  { l: "Oxiri",    v: sh.x },
                ].map((c) => (
                  <div key={c.l} style={{ textAlign: "center", background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "10px 4px" }}>
                    <div style={{ fontSize: 10, color: T.hint, marginBottom: 6 }}>{c.l}</div>
                    <div style={{ fontFamily: AR, fontSize: 24, color: T.green }}>{c.v}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </Stack>
      );

    case "harakat":
      return (
        <Stack>
          {bob.harakatlar.map((h, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArLetter ch={h.h} size={26} />
                </div>
                <div style={{ fontSize: 14, color: T.text2 }}>4 ta harakat</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {[
                  { l: "Fatha", ar: h.f, oq: h.of },
                  { l: "Kasra", ar: h.k, oq: h.ok },
                  { l: "Damma", ar: h.d, oq: h.od },
                  { l: "Sukun", ar: h.s, oq: h.os },
                ].map((c) => (
                  <button
                    key={c.l}
                    onClick={() => speakAr(c.ar)}
                    style={{ textAlign: "center", background: "rgba(13,58,26,.04)", border: "1px solid rgba(13,58,26,.08)", borderRadius: 10, padding: "10px 4px", cursor: "pointer" }}
                  >
                    <div style={{ fontSize: 10, color: T.hint, marginBottom: 4 }}>{c.l}</div>
                    <div style={{ fontFamily: AR, fontSize: 24, color: T.green }}>{c.ar}</div>
                    <div style={{ fontSize: 12, color: T.text2, marginTop: 4, fontWeight: 600 }}>{c.oq}</div>
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
            <Card key={i} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: AR, fontSize: 28, color: T.green, fontWeight: 700, direction: "rtl", marginBottom: 4 }}>{s.ar}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{s.oq} — <span style={{ color: T.text2 }}>{s.tr}</span></div>
                  <div style={{ fontSize: 13, color: T.hint, marginTop: 3, fontFamily: AR, direction: "rtl" }}>{s.h}</div>
                </div>
                <SpeakBtn text={s.ar} />
              </div>
            </Card>
          ))}
        </Stack>
      );

    case "oqish":
      return (
        <Stack>
          {bob.oqish.map((o, i) => (
            <Card key={i} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: AR, fontSize: 24, color: T.green, fontWeight: 700, direction: "rtl", marginBottom: 6 }}>{o.ar}</div>
                  <div style={{ fontSize: 14, color: T.text2 }}>{o.iz}</div>
                </div>
                <SpeakBtn text={o.ar} />
              </div>
            </Card>
          ))}
        </Stack>
      );

    case "yozish":
      return (
        <Stack>
          {bob.yozish.map((y, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ fontSize: 15, color: T.text, fontWeight: 600, marginBottom: 10 }}>{y.t}</div>
              <div style={{ background: "rgba(13,58,26,.04)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontFamily: AR, fontSize: 22, color: T.green, direction: "rtl" }}>{y.m}</div>
              </div>
            </Card>
          ))}
        </Stack>
      );

    case "uy":
      return (
        <Card style={{ padding: 16 }}>
          <Stack>
            {bob.uyvazifa.map((u, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, color: T.onCta }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 15, color: T.text, lineHeight: 1.6, paddingTop: 2 }}>{u}</div>
              </div>
            ))}
          </Stack>
        </Card>
      );

    case "rasmlar":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <LessonImages type="amaliy" id={bob.id} isTeacher={isTeacher} />
          <LessonAudio type="amaliy" id={bob.id} isTeacher={isTeacher} />
        </div>
      );

    case "test":
      return <Quiz questions={questions} onDone={onTest} onWrong={onWrong} />;
  }
}

export function AmaliyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitAmal, amalDone, saveWrong } = useProgress();
  const [tab, setTab] = useState<TabKey>("maxraj");
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTab("maxraj");
    window.scrollTo(0, 0);
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
  const done = amalDone[bob.id];

  const handleTabClick = (k: TabKey, el: HTMLButtonElement) => {
    setTab(k);
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Sticky header */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: T.green }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 0" }}>
            <button
              onClick={() => navigate("/dars")}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,.12)", border: "none", borderRadius: 8, padding: "6px 10px 6px 6px", color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", flexShrink: 0 }}
            >
              <ChevronLeft size={15} /> Darslar
            </button>
            <div style={{ flex: 1 }} />
            {done && (
              <div style={{ fontSize: 12, fontWeight: 700, color: done.pct >= 80 ? T.limeBrt : "rgba(255,255,255,.6)" }}>
                Test: {done.pct}%
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "5px 10px" }}>
              <Clock size={11} color="rgba(255,255,255,.7)" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.85)", fontWeight: 500 }}>1s 20d</span>
            </div>
          </div>

          {/* Bob info */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 16px 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: 4 }}>
              <span style={{ fontFamily: AR, fontSize: 20, color: T.onCta }}>{bob.harflar.join(" ")}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600 }}>{bob.id}-BOB / {AMALIY.length} DAN</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{bob.nomlar.join(" · ")}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: "rgba(255,255,255,.15)", margin: "10px 16px 0", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(bob.id / AMALIY.length) * 100}%`, background: T.gLimeH, borderRadius: 2 }} />
          </div>

          {/* Tab bar */}
          <div
            ref={tabBarRef}
            className="no-scrollbar"
            style={{ display: "flex", gap: 4, overflowX: "auto", padding: "10px 16px 12px", WebkitOverflowScrolling: "touch" }}
          >
            {TABS.map((t) => (
              <button
                key={t.k}
                onClick={(e) => handleTabClick(t.k, e.currentTarget)}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "7px 12px",
                  borderRadius: 20,
                  border: tab === t.k ? "none" : "1px solid rgba(255,255,255,.2)",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  background: tab === t.k ? "#fff" : "rgba(255,255,255,.08)",
                  color: tab === t.k ? T.green : "rgba(255,255,255,.75)",
                  transition: "all .15s",
                }}
              >
                <span style={{ fontSize: 13 }}>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        <TabBody
          bob={bob}
          tab={tab}
          questions={questions}
          onTest={(ok, tot) => submitAmal(bob.id, ok, tot)}
          onWrong={(indices) => saveWrong(`amal_${bob.id}`, indices)}
          isTeacher={user?.role === "teacher"}
        />

        {/* Prev / Next navigation */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button
            disabled={!prev}
            onClick={() => prev && navigate(`/dars/amaliy/${prev.id}`)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "13px",
              borderRadius: 12,
              border: "1px solid rgba(13,58,26,.15)",
              background: prev ? "rgba(13,58,26,.04)" : "transparent",
              color: prev ? T.green : "rgba(13,58,26,.25)",
              fontSize: 13,
              fontWeight: 600,
              cursor: prev ? "pointer" : "default",
            }}
          >
            <ChevronLeft size={16} /> Oldingi
          </button>
          <button
            disabled={!next}
            onClick={() => next && navigate(`/dars/amaliy/${next.id}`)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "13px",
              borderRadius: 12,
              border: "none",
              background: next ? T.gGreen : "rgba(13,58,26,.08)",
              color: next ? "#fff" : "rgba(13,58,26,.25)",
              fontSize: 13,
              fontWeight: 700,
              cursor: next ? "pointer" : "default",
            }}
          >
            Keyingi <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
