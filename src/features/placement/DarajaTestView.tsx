import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, X, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import {
  DARAJA_TEST_SAVOLLAR,
  DARAJA_ARABIC,
  hisoblaDaraja,
  saveDaraja,
  loadDaraja,
} from "../../content/darajaTest";

const AR_LABELS = ["أ", "ب", "ج", "د"];

type Screen = "intro" | "quiz" | "result";

export function DarajaTestView() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const uid = user?.id ?? "";

  const [screen, setScreen] = useState<Screen>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(DARAJA_TEST_SAVOLLAR.length).fill(null)
  );
  const [selected, setSelected] = useState<number | null>(null);

  const existing = loadDaraja(uid);
  const total = DARAJA_TEST_SAVOLLAR.length;
  const savol = DARAJA_TEST_SAVOLLAR[idx];

  function handleSelect(i: number) {
    setSelected(i);
  }

  function handleNext() {
    const updated = [...answers];
    updated[idx] = selected;
    setAnswers(updated);

    if (idx < total - 1) {
      setIdx(idx + 1);
      setSelected(answers[idx + 1] ?? null);
    } else {
      const togrilar = updated.map(
        (ans, i) => ans === DARAJA_TEST_SAVOLLAR[i].togri
      );
      const level = hisoblaDaraja(togrilar);
      setResultLevel(level);
      setScreen("result");
    }
  }

  function handlePrev() {
    if (idx > 0) {
      const updated = [...answers];
      updated[idx] = selected;
      setAnswers(updated);
      setIdx(idx - 1);
      setSelected(answers[idx - 1] ?? null);
    }
  }

  function handleSkip() {
    const updated = [...answers];
    updated[idx] = null;
    setAnswers(updated);

    if (idx < total - 1) {
      setIdx(idx + 1);
      setSelected(answers[idx + 1] ?? null);
    } else {
      const togrilar = updated.map(
        (ans, i) => ans === DARAJA_TEST_SAVOLLAR[i].togri
      );
      setResultLevel(hisoblaDaraja(togrilar));
      setScreen("result");
    }
  }

  const [resultLevel, setResultLevel] = useState<string>("A1");

  function handleAccept() {
    saveDaraja(uid, resultLevel as never);
    navigate("/");
  }

  function handleKeep() {
    navigate("/");
  }

  const progress = ((idx + 1) / total) * 100;

  if (screen === "intro") {
    return (
      <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
        <div style={{ background: T.gGreen, padding: "20px 18px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <button
              onClick={() => navigate(-1)}
              style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", cursor: "pointer", marginBottom: 16 }}
            >
              <X size={18} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Target size={28} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  Daraja aniqlash
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginTop: 2 }}>
                  Placement Test
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 10 }}>Bu test haqida</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { emoji: "📝", text: `${total} ta savol` },
                { emoji: "⏱️", text: "Taxminan 2 daqiqa" },
                { emoji: "🎯", text: "A0 dan B2 gacha daraja aniqlanadi" },
                { emoji: "💡", text: "Bilmasangiz o'tkazib yuborish mumkin" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{item.emoji}</span>
                  <span style={{ fontSize: 13, color: T.text2 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {existing && (
            <div style={{ background: "rgba(13,58,26,.06)", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <CheckCircle2 size={16} color={T.green} />
              <div>
                <span style={{ fontSize: 12, color: T.text2 }}>Hozirgi darajangiz: </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>
                  {existing} — {DARAJA_ARABIC[existing as keyof typeof DARAJA_ARABIC]?.uz}
                </span>
              </div>
            </div>
          )}

          <div style={{ marginTop: "auto" }}>
            <button
              onClick={() => setScreen("quiz")}
              style={{
                width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
                background: T.gGreen, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}
            >
              Boshlash →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "quiz") {
    return (
      <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,58,26,.08)", padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button
              onClick={() => navigate(-1)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              <X size={20} color={T.hint} />
            </button>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.text2 }}>
              {idx + 1} / {total}
            </span>
            <button
              onClick={handleSkip}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.hint, padding: 4 }}
            >
              O'tkazish
            </button>
          </div>
          <div style={{ height: 5, background: "rgba(13,58,26,.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: T.gGreen, borderRadius: 3, transition: "width .3s" }} />
          </div>
        </div>

        {/* Question */}
        <div style={{ padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "20px 18px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.hint, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>
              {savol.daraja} daraja
            </div>
            <p
              dir="rtl"
              style={{
                fontSize: 22, fontWeight: 700, color: T.green, lineHeight: 1.6,
                textAlign: "right", margin: 0,
                fontFamily: "'Amiri', 'Scheherazade New', serif",
              }}
            >
              {savol.savol}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {savol.variantlar.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px", borderRadius: 12,
                    border: isSelected ? "none" : "1px solid rgba(13,58,26,.08)",
                    background: isSelected ? T.gGreen : "#fff",
                    boxShadow: isSelected ? "none" : "0 1px 4px rgba(0,0,0,.06)",
                    cursor: "pointer", textAlign: "left", transition: "all .15s",
                  } as React.CSSProperties}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: isSelected ? "rgba(255,255,255,.25)" : "rgba(13,58,26,.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700,
                    color: isSelected ? "#fff" : T.green,
                    fontFamily: "'Amiri', serif",
                  }}>
                    {AR_LABELS[i]}
                  </div>
                  <span
                    dir="rtl"
                    style={{
                      flex: 1, fontSize: 16, color: isSelected ? "#fff" : T.text,
                      fontWeight: isSelected ? 600 : 400, textAlign: "right",
                      fontFamily: "'Amiri', 'Scheherazade New', serif",
                    }}
                  >
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: "12px 18px 24px", background: "#fff", borderTop: "1px solid rgba(13,58,26,.06)", display: "flex", gap: 10 }}>
          {idx > 0 && (
            <button
              onClick={handlePrev}
              style={{
                padding: "12px 18px", borderRadius: 12, border: "1px solid rgba(13,58,26,.12)",
                background: "#fff", color: T.text2, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14,
              }}
            >
              <ChevronLeft size={16} /> Oldingi
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null}
            style={{
              flex: 1, padding: "14px 0", borderRadius: 12, border: "none",
              background: selected !== null ? T.gGreen : "rgba(13,58,26,.08)",
              color: selected !== null ? "#fff" : T.hint,
              fontSize: 15, fontWeight: 700, cursor: selected !== null ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "all .2s",
            }}
          >
            {idx < total - 1 ? "Keyingi" : "Natija"} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Result screen
  const levelInfo = DARAJA_ARABIC[resultLevel as keyof typeof DARAJA_ARABIC];
  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 18px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Result card */}
        <div style={{ background: T.gGreen, borderRadius: 20, padding: "28px 24px", marginBottom: 16, position: "relative", overflow: "hidden", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
              Sizning darajangiz
            </div>
            <div style={{ fontSize: 56, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 8 }}>
              {resultLevel}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,.9)", marginBottom: 4 }}>
              {levelInfo?.uz}
            </div>
            <div
              dir="rtl"
              style={{ fontSize: 20, color: "rgba(255,255,255,.75)", fontFamily: "'Amiri', serif" }}
            >
              {levelInfo?.ar}
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: T.text2, margin: 0, lineHeight: 1.6, textAlign: "center" }}>
            Natijaga asoslanib, sizga mos keladigan mavzular va mashqlar tavsiya etiladi.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={handleAccept}
            style={{
              width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
              background: T.gGreen, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}
          >
            Qabul qilish
          </button>
          {existing && (
            <button
              onClick={handleKeep}
              style={{
                width: "100%", padding: "13px 0", borderRadius: 12,
                border: "1px solid rgba(13,58,26,.15)", background: "#fff",
                color: T.text2, fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              Oldingi darajani saqlash ({existing})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
