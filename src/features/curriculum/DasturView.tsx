import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, Calendar, ChevronRight, ChevronLeft, X, Play, BookOpen, PenLine, Lightbulb, Target } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { DASTUR } from "../../content/dastur";

type Kun = { k: string; d: string; m: string };
type Hafta = { h: number; mavzu: string; kunlar: Kun[]; imtihon: string };

/* ─── Helpers ─── */

function extractArabicLetters(text: string): string[] {
  const chars = (text.match(/[؀-ۿ]/g) ?? []);
  return [...new Set(chars)];
}

function parseMashqSteps(m: string): string[] {
  const parts = m.split(/[;،]/).map((s) => s.trim()).filter(Boolean);
  return parts.length > 1 ? parts : [m];
}

function shortTitle(d: string): string {
  const afterColon = d.split(":").slice(1).join(":").trim();
  if (afterColon) return afterColon.split("—")[0].trim();
  return d.split("—")[0].trim();
}

const DAY_EMOJIS = ["📅", "📖", "✏️", "🗣️", "📝", "🧠"];
const DAY_TIPS: Record<string, string> = {
  Dushanba: "Haftaning boshida yangi tushunchalarni diqqat bilan o'rganing.",
  Seshanba: "Kechagi materiallarni takrorlang, keyin yangilarga o'ting.",
  Chorshanba: "Harflarni ovoz chiqarib aytib mashq qiling.",
  Payshanba: "Yozma va og'zaki mashqlarni birlashtirib bajaring.",
  Juma: "Hafta yakunida o'tilganlarni umumlashtirib takrorlang.",
};

/* ─── Presentation Modal ─── */

function PresentationModal({ hafta, onClose }: { hafta: Hafta; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const total = hafta.kunlar.length + 2;
  const isIntro = idx === 0;
  const isSummary = idx === total - 1;
  const kunIdx = isIntro || isSummary ? -1 : idx - 1;
  const kun = kunIdx >= 0 ? hafta.kunlar[kunIdx] : null;

  const goNext = () => setIdx((i) => Math.min(total - 1, i + 1));
  const goPrev = () => setIdx((i) => Math.max(0, i - 1));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: T.green, display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 600 }}>{hafta.h}-HAFTA</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{hafta.mavzu}</div>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>{idx + 1}/{total}</div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", flexShrink: 0 }}>
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ position: "relative", zIndex: 1, height: 3, background: "rgba(255,255,255,.15)" }}>
        <div style={{ height: "100%", width: `${((idx + 1) / total) * 100}%`, background: T.gLimeH, transition: "width .3s ease" }} />
      </div>

      {/* Slide Content */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, overflowY: "auto", padding: "20px 18px" }}>

        {/* ── Intro Slide ── */}
        {isIntro && (
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 12 }}>📚</div>
              <div style={{ fontSize: 11, color: T.limeBrt, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                {hafta.h}-Hafta Kirish
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 10 }}>{hafta.mavzu}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.6 }}>
                Bu haftada {hafta.kunlar.length} ta dars o'tiladi va har kuni alohida mavzu bilan ishlaysiz.
              </div>
            </div>

            {/* Week plan */}
            <div style={{ background: "rgba(255,255,255,.1)", borderRadius: 16, padding: 16, marginBottom: 16, border: "1px solid rgba(255,255,255,.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <Target size={14} color={T.limeBrt} />
                <span style={{ fontSize: 12, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em" }}>Hafta rejasi</span>
              </div>
              {hafta.kunlar.map((kn, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                    {DAY_EMOJIS[i % DAY_EMOJIS.length]}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt }}>{kn.k}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,.85)", lineHeight: 1.4 }}>{shortTitle(kn.d)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arabic letters preview */}
            {(() => {
              const allText = hafta.kunlar.map((k) => k.d + " " + k.m).join(" ");
              const arLetters = extractArabicLetters(allText).slice(0, 12);
              if (!arLetters.length) return null;
              return (
                <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 14, padding: 14, border: "1px solid rgba(255,255,255,.1)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Bu haftadagi harflar</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, direction: "rtl" }}>
                    {arLetters.map((ch, i) => (
                      <span key={i} style={{ fontFamily: AR, fontSize: 28, color: "#fff", background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "4px 10px" }}>{ch}</span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── Day Slide ── */}
        {kun && (
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            {/* Day badge */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 42, lineHeight: 1, marginBottom: 8 }}>{DAY_EMOJIS[(kunIdx) % DAY_EMOJIS.length]}</div>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,.15)", borderRadius: 10, padding: "5px 16px", fontSize: 13, fontWeight: 700, color: T.limeBrt }}>
                {kun.k}
              </div>
            </div>

            {/* Lesson title & description */}
            <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid rgba(255,255,255,.18)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <BookOpen size={13} color={T.limeBrt} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em" }}>Dars mavzusi</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.5, marginBottom: 10 }}>{kun.d}</div>

              {/* Objectives list — split lesson description into bullet points */}
              {kun.d.includes(";") && (
                <div style={{ marginTop: 8 }}>
                  {kun.d.split(";").map((part, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: T.gLimeH, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: T.onCta, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,.85)", lineHeight: 1.4 }}>{part.trim()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Arabic letter examples */}
            {(() => {
              const arLetters = extractArabicLetters(kun.d + " " + kun.m).slice(0, 10);
              if (!arLetters.length) return null;
              return (
                <div style={{ background: "rgba(0,0,0,.2)", borderRadius: 16, padding: 14, marginBottom: 12, border: "1px solid rgba(255,255,255,.12)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Bugungi harflar va belgilar</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, direction: "rtl", justifyContent: "center" }}>
                    {arLetters.map((ch, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <span style={{ fontFamily: AR, fontSize: 36, color: "#fff", background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "6px 14px", border: "1px solid rgba(255,255,255,.2)" }}>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Practice steps */}
            <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 16, padding: 14, marginBottom: 12, border: "1px solid rgba(255,255,255,.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <PenLine size={13} color={T.limeBrt} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em" }}>Mashqlar va maqsad</span>
              </div>
              {parseMashqSteps(kun.m).map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: T.limeBrt, flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.88)", lineHeight: 1.5 }}>{step}</div>
                </div>
              ))}
            </div>

            {/* Lesson flow */}
            <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 14, padding: 12, marginBottom: 12, border: "1px solid rgba(255,255,255,.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Dars oqimi</div>
              {["Nazariy qism: tushuntirish va misollar", "Birgalikda o'qish va yozish mashqi", "Mustaqil takrorlash va savollar", "Kichik test yoki nazorat"].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.gLimeH, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)" }}>{step}</div>
                </div>
              ))}
            </div>

            {/* Daily tip */}
            {DAY_TIPS[kun.k.split(",")[0].split(" ")[0]] && (
              <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(255,255,255,.08)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Lightbulb size={14} color={T.limeBrt} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>
                  {DAY_TIPS[kun.k.split(",")[0].split(" ")[0]]}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Summary Slide ── */}
        {isSummary && (
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 12 }}>🏆</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Hafta xulosasi</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)" }}>O'tilgan mavzular va imtihon tartibi</div>
            </div>

            {/* Covered topics checklist */}
            <div style={{ background: "rgba(255,255,255,.1)", borderRadius: 16, padding: 16, marginBottom: 14, border: "1px solid rgba(255,255,255,.15)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>O'tilgan mavzular</div>
              {hafta.kunlar.map((kn, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: T.gLimeH, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>✓</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt }}>{kn.k}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)", lineHeight: 1.4 }}>{shortTitle(kn.d)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Exam info */}
            <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 16, padding: 16, marginBottom: 14, border: "1px solid rgba(255,255,255,.18)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Trophy size={14} color={T.limeBrt} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em" }}>Hafta imtihoni</span>
              </div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,.9)", lineHeight: 1.6 }}>{hafta.imtihon}</div>
            </div>

            {/* Review tips */}
            <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 14, padding: 14, marginBottom: 16, border: "1px solid rgba(255,255,255,.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.limeBrt, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Tayyorlanish uchun maslahatlar</div>
              {["Barcha harflarni qo'l bilan bir marta yozib ko'ring", "Audio materiallarga quloq soling va talaffuzni solishtiring", "Test savollarini tez va to'g'ri javob bera olishingizni tekshiring", "Platformadagi Amaliy testlarni qayta ishlang"].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.78)", lineHeight: 1.5 }}>{tip}</div>
                </div>
              ))}
            </div>

            {/* Arabic closing */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: AR, fontSize: 28, color: T.limeBrt, direction: "rtl", marginBottom: 4 }}>بِالتَّوْفِيق</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Omad tilaymiz!</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 12, padding: "16px 20px", paddingBottom: "calc(16px + env(safe-area-inset-bottom))", borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <button
          onClick={goPrev}
          disabled={idx === 0}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", background: idx === 0 ? "transparent" : "rgba(255,255,255,.1)", color: idx === 0 ? "rgba(255,255,255,.3)" : "#fff", fontSize: 14, fontWeight: 600, cursor: idx === 0 ? "default" : "pointer" }}
        >
          <ChevronLeft size={18} /> Oldingi
        </button>
        {idx < total - 1 ? (
          <button
            onClick={goNext}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Keyingi <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={onClose}
            style={{ flex: 1, padding: "14px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Yakunlash ✓
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main View ─── */

export function DasturView() {
  const [openOy, setOpenOy] = useState<number | null>(DASTUR[0]?.oy ?? null);
  const [openH, setOpenH] = useState<number | null>(null);
  const [presentHafta, setPresentHafta] = useState<Hafta | null>(null);

  const totalHafta = DASTUR.reduce((s, o) => s + o.haftalar.length, 0);

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {presentHafta && <PresentationModal hafta={presentHafta} onClose={() => setPresentHafta(null)} />}

      {/* Hero */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Reja</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 10 }}>O'quv Dasturi</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {[{ label: "Oylar", value: `${DASTUR.length}` }, { label: "Haftalar", value: `${totalHafta}` }, { label: "Muddat", value: "4.5 oy" }].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "6px 12px" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{s.label}:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 28px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DASTUR.map((oy) => {
            const open = openOy === oy.oy;
            return (
              <div key={oy.oy} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 4px 12px rgba(13,58,26,.06)", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenOy(open ? null : oy.oy)}
                  style={{ width: "100%", background: oy.color, border: "none", cursor: "pointer", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,0,0,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>
                    <Calendar size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1, textAlign: "left", position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{oy.nomi}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)", marginTop: 1 }}>{oy.haftalar.length} hafta</div>
                  </div>
                  {open ? <ChevronUp size={18} color="rgba(255,255,255,.8)" style={{ position: "relative", zIndex: 1 }} /> : <ChevronDown size={18} color="rgba(255,255,255,.8)" style={{ position: "relative", zIndex: 1 }} />}
                </button>

                {open && (
                  <div style={{ padding: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,rgba(46,184,46,.12),rgba(46,184,46,.06))", border: "1px solid rgba(46,184,46,.2)", borderRadius: 10, padding: "10px 13px", marginBottom: 12 }}>
                      <Trophy size={15} color={T.lime} style={{ flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.lime, textTransform: "uppercase", letterSpacing: ".04em" }}>Oy imtihoni</div>
                        <div style={{ fontSize: 12, color: T.green, fontWeight: 500, marginTop: 1 }}>{oy.imtihon}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {oy.haftalar.map((hf) => {
                        const ho = openH === hf.h;
                        return (
                          <div key={hf.h} style={{ border: "1px solid rgba(13,58,26,.1)", borderRadius: 12, overflow: "hidden", background: ho ? "rgba(13,58,26,.02)" : "transparent" }}>
                            <button
                              onClick={() => setOpenH(ho ? null : hf.h)}
                              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "11px 13px", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}
                            >
                              <div style={{ fontSize: 11, fontWeight: 800, color: T.onCta, background: ho ? T.gLime : T.gGreen, borderRadius: 7, padding: "3px 9px", flexShrink: 0, transition: "background .2s" }}>
                                {hf.h}-hafta
                              </div>
                              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: T.green }}>{hf.mavzu}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setPresentHafta(hf); }}
                                style={{ display: "flex", alignItems: "center", gap: 4, background: T.gLime, border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", color: T.onCta, fontSize: 11, fontWeight: 700, flexShrink: 0 }}
                                title="Prezentatsiya"
                              >
                                <Play size={10} /> Slayd
                              </button>
                              <ChevronRight size={15} color={T.hint} style={{ flexShrink: 0, transform: ho ? "rotate(90deg)" : "rotate(0)", transition: "transform .2s" }} />
                            </button>

                            {ho && (
                              <div style={{ padding: "0 13px 12px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(13,58,26,.08)" }}>
                                  {hf.kunlar.map((kn, i) => (
                                    <div key={i} style={{ display: "flex", gap: 0, fontSize: 12, borderBottom: i < hf.kunlar.length - 1 ? "1px solid rgba(13,58,26,.06)" : "none", background: i % 2 === 0 ? "#fff" : "rgba(13,58,26,.02)" }}>
                                      <div style={{ width: 80, flexShrink: 0, fontWeight: 700, color: T.green500, padding: "9px 12px", borderRight: "1px solid rgba(13,58,26,.06)" }}>{kn.k}</div>
                                      <div style={{ flex: 1, padding: "9px 12px", color: T.text, lineHeight: 1.4 }}>
                                        {kn.d}
                                        <span style={{ color: T.hint }}> — {kn.m}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: T.green500, marginTop: 8, padding: "7px 10px", background: "rgba(46,184,46,.07)", borderRadius: 8 }}>
                                  <Trophy size={12} style={{ flexShrink: 0 }} />
                                  <span>{hf.imtihon}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
