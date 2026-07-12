import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, RotateCcw, CheckCircle2, Volume2, Sparkles, AlertTriangle } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";
import { useCoins } from "../../context/CoinContext";

// --- SpeechRecognition browser types ---
interface SREvent {
  results: {
    [i: number]: { [i: number]: { transcript: string } };
    length: number;
  };
}
interface ISR {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: SREvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition?: new () => ISR;
    webkitSpeechRecognition?: new () => ISR;
  }
}

interface TalaffuzMashq {
  id: number;
  arabcha: string;
  oqilishi: string;
  tarjima: string;
  daraja: "A0" | "A1" | "A2" | "B1" | "B2";
  rang: string;
}

const DARAJA_RANG: Record<string, string> = {
  A0: "#0891B2", A1: "#2563EB", A2: "#059669", B1: "#CA8A04", B2: "#7C3AED",
};

const MASHQLAR: TalaffuzMashq[] = [
  { id: 1,  arabcha: "بَ بِ بُ",                                            oqilishi: "ba — bi — bu",                                          tarjima: "Ba harfi uch harakat bilan",                             daraja: "A0", rang: DARAJA_RANG.A0 },
  { id: 2,  arabcha: "مَرْحَبًا",                                             oqilishi: "marhaban",                                              tarjima: "Salom",                                                  daraja: "A0", rang: DARAJA_RANG.A0 },
  { id: 3,  arabcha: "صَبَاحُ الخَيْرِ",                                     oqilishi: "sabaahul-xayr",                                         tarjima: "Xayrli tong",                                            daraja: "A0", rang: DARAJA_RANG.A0 },
  { id: 4,  arabcha: "كَيْفَ حَالُكَ؟",                                      oqilishi: "kayfa haaluka?",                                        tarjima: "Yaxshimisiz?",                                           daraja: "A1", rang: DARAJA_RANG.A1 },
  { id: 5,  arabcha: "أَنَا بِخَيْرٍ، شُكْرًا",                               oqilishi: "anaa bixayr, shukran",                                  tarjima: "Yaxshiman, rahmat",                                      daraja: "A1", rang: DARAJA_RANG.A1 },
  { id: 6,  arabcha: "مَا اسْمُكَ؟",                                         oqilishi: "ma ismuka?",                                            tarjima: "Ismingiz nima?",                                         daraja: "A1", rang: DARAJA_RANG.A1 },
  { id: 7,  arabcha: "اسْمِي أَحْمَد",                                       oqilishi: "ismii Ahmad",                                           tarjima: "Mening ismim Ahmad",                                     daraja: "A1", rang: DARAJA_RANG.A1 },
  { id: 8,  arabcha: "مِنْ أَيْنَ أَنْتَ؟",                                  oqilishi: "min ayna anta?",                                        tarjima: "Qayerdansiz?",                                           daraja: "A1", rang: DARAJA_RANG.A1 },
  { id: 9,  arabcha: "ذَهَبَ الوَلَدُ إِلَى المَدْرَسَة",                   oqilishi: "zahaba l-waladu ilal-madrasa",                           tarjima: "Bola maktabga bordi",                                    daraja: "A2", rang: DARAJA_RANG.A2 },
  { id: 10, arabcha: "أُحِبُّ تَعَلُّمَ اللُّغَةِ العَرَبِيَّة",            oqilishi: "uhibbu ta'alluma l-lughatil-'arabiyya",                  tarjima: "Arabcha o'rganishni yaxshi ko'raman",                    daraja: "A2", rang: DARAJA_RANG.A2 },
  { id: 11, arabcha: "هُوَ طَالِبٌ مُجْتَهِد",                               oqilishi: "huwa taalibun mujtahid",                                tarjima: "U tirishqoq o'quvchi",                                   daraja: "B1", rang: DARAJA_RANG.B1 },
  { id: 12, arabcha: "أَسْكُنُ فِي طَشْقَنْد مُنْذُ عَشْرِ سَنَوَات",      oqilishi: "askunu fii Toshkand munzu 'ashri sanawaat",              tarjima: "O'n yildan beri Toshkentda yashaman",                    daraja: "B1", rang: DARAJA_RANG.B1 },
  { id: 13, arabcha: "كَمْ سَاعَةً تَدْرُسُ فِي اليَوْم؟",                 oqilishi: "kam saa'atan tadrusu fil-yawm?",                         tarjima: "Kuniga necha soat o'qiyapsiz?",                          daraja: "B1", rang: DARAJA_RANG.B1 },
  { id: 14, arabcha: "هَلْ تَتَكَلَّمُ العَرَبِيَّةَ بِطَلَاقَة؟",         oqilishi: "hal tatakallamu l-'arabiyyata bitalaaqah?",              tarjima: "Arabchani ravon gaplashyapsizmi?",                       daraja: "B1", rang: DARAJA_RANG.B1 },
  { id: 15, arabcha: "تَعَلَّمْتُ العَرَبِيَّةَ مُنْذُ سَنَتَيْن",          oqilishi: "ta'allamtu l-'arabiyyata munzu sanatayni",               tarjima: "Ikki yildan beri arabcha o'rganmoqdaman",                daraja: "B1", rang: DARAJA_RANG.B1 },
  { id: 16, arabcha: "اللُّغَةُ العَرَبِيَّةُ مِنْ أَقْدَمِ اللُّغَاتِ",  oqilishi: "al-lugha l-'arabiyyatu min aqdami l-lughaat",            tarjima: "Arabcha eng qadimgi tillardan biri",                     daraja: "B2", rang: DARAJA_RANG.B2 },
  { id: 17, arabcha: "يَجِبُ أَنْ نَتَعَلَّمَ مِنْ أَخْطَائِنَا",          oqilishi: "yajibu an nata'allama min axtaa'inaa",                   tarjima: "Biz xatolarimizdan o'rganishimiz kerak",                 daraja: "B2", rang: DARAJA_RANG.B2 },
  { id: 18, arabcha: "أُحِبُّ السَّفَرَ وَتَعَلُّمَ اللُّغَاتِ الجَدِيدَة",oqilishi: "uhibbu s-safara wa ta'alluma l-lughaati l-jadiida",      tarjima: "Sayohat va yangi tillar o'rganishni yaxshi ko'raman",    daraja: "B2", rang: DARAJA_RANG.B2 },
  { id: 19, arabcha: "اللُّغَةُ العَرَبِيَّةُ لُغَةٌ جَمِيلَةٌ وَغَنِيَّة",oqilishi: "al-lugha l-'arabiyyatu lughatun jamiilah wa ghaniyya",   tarjima: "Arabcha — go'zal va boy til",                            daraja: "B2", rang: DARAJA_RANG.B2 },
  { id: 20, arabcha: "أَتَمَنَّى أَنْ أَتَكَلَّمَ العَرَبِيَّةَ بِطَلَاقَة",oqilishi: "atamannaa an atakallama l-'arabiyyata bitalaaqah",       tarjima: "Arabchani ravon gaplashishni orzu qilaman",              daraja: "B2", rang: DARAJA_RANG.B2 },
];

const doneKey = (uid: string) => `afp:voice_done_${uid}`;

function loadDone(uid: string): Set<number> {
  try {
    const raw = localStorage.getItem(doneKey(uid));
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch { return new Set(); }
}

function saveDone(uid: string, set: Set<number>) {
  try { localStorage.setItem(doneKey(uid), JSON.stringify([...set])); } catch { /**/ }
}

// Remove tashkeel and non-Arabic chars for comparison
function normalize(s: string): string {
  return s
    .replace(/[ً-ٰٟ]/g, "")   // harakat
    .replace(/[^ء-ي\s]/g, "")       // non-Arabic
    .replace(/\s+/g, " ")
    .trim();
}

function calcScore(expected: string, recognized: string): number {
  if (!recognized.trim()) return 0;
  const a = normalize(expected).split(" ").filter(Boolean);
  const b = normalize(recognized).split(" ").filter(Boolean);
  if (a.length === 0) return 0;
  let matches = 0;
  for (const w of b) {
    if (a.some((v) =>
      v === w ||
      (v.length > 2 && w.length > 2 && (v.startsWith(w.slice(0, 3)) || w.startsWith(v.slice(0, 3))))
    )) matches++;
  }
  return Math.min(100, Math.round((matches / a.length) * 100));
}

function startWaveform(
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  animRef: React.MutableRefObject<number>
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  analyser.fftSize = 128;
  const bufLen = analyser.frequencyBinCount;
  const data = new Uint8Array(bufLen);
  const W = canvas.width;
  const H = canvas.height;
  const barW = W / bufLen;

  const draw = () => {
    animRef.current = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < bufLen; i++) {
      const h = (data[i] / 255) * H;
      const alpha = 0.3 + (data[i] / 255) * 0.7;
      ctx.fillStyle = `rgba(46,184,46,${alpha})`;
      ctx.fillRect(i * barW, H - h, barW - 1, h);
    }
  };
  draw();
}

type RecState = "idle" | "recording" | "recorded" | "analyzing" | "playing" | "result";

interface TahlilNatija {
  aniqlangan: string;
  ball: number;
}

function MashqCard({
  mashq,
  isDone,
  onDone,
}: {
  mashq: TalaffuzMashq;
  isDone: boolean;
  onDone: (id: number) => void;
}) {
  const [state, setState] = useState<RecState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [natija, setNatija] = useState<TahlilNatija | null>(null);
  const [micError, setMicError] = useState(false);
  const [srAvail] = useState(
    () => !!(window.SpeechRecognition ?? window.webkitSpeechRecognition)
  );

  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animRef = useRef<number>(0);
  const recognizedRef = useRef<string>("");

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      cancelAnimationFrame(animRef.current);
      audioCtxRef.current?.close().catch(() => {});
    };
  }, [audioUrl]);

  // Start waveform after canvas mounts (when state = "recording")
  useEffect(() => {
    if (state === "recording" && canvasRef.current && analyserRef.current) {
      startWaveform(canvasRef.current, analyserRef.current, animRef);
    }
  }, [state]);

  const startRec = async () => {
    setMicError(false);
    setNatija(null);
    recognizedRef.current = "";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];

      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        setState("recorded");
        stream.getTracks().forEach((t) => t.stop());
        cancelAnimationFrame(animRef.current);
        audioCtxRef.current?.close().catch(() => {});
      };
      mediaRef.current = mr;

      // Waveform setup
      try {
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        audioCtxRef.current = audioCtx;
        analyserRef.current = analyser;
      } catch { /**/ }

      // SpeechRecognition (Chrome/Edge — listens alongside MediaRecorder)
      const SRClass = window.SpeechRecognition ?? window.webkitSpeechRecognition;
      if (SRClass) {
        const recog = new SRClass();
        recog.lang = "ar-SA";
        recog.continuous = false;
        recog.interimResults = false;
        recog.maxAlternatives = 1;
        recog.onresult = (e) => {
          if (e.results.length > 0) recognizedRef.current = e.results[0][0].transcript;
        };
        recog.onerror = () => {};
        recog.onend = () => {};
        try { recog.start(); } catch { /**/ }
      }

      mr.start();
      setState("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setMicError(true);
    }
  };

  const stopRec = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    mediaRef.current?.stop();
  };

  const playRec = () => {
    if (!audioUrl) return;
    audioElRef.current?.pause();
    const audio = new Audio(audioUrl);
    audioElRef.current = audio;
    setState("playing");
    audio.play();
    audio.onended = () => setState("recorded");
  };

  const analyze = () => {
    setState("analyzing");
    setTimeout(() => {
      const rec = recognizedRef.current;
      setNatija({ aniqlangan: rec, ball: calcScore(mashq.arabcha, rec) });
      setState("result");
    }, 600);
  };

  const reset = () => {
    audioElRef.current?.pause();
    audioElRef.current = null;
    if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }
    setState("idle");
    setSeconds(0);
    setNatija(null);
    recognizedRef.current = "";
  };

  const markDone = () => { onDone(mashq.id); reset(); };

  const ballRang = natija
    ? natija.ball >= 70 ? T.lime
    : natija.ball >= 40 ? "#CA8A04"
    : "#EF4444"
    : T.hint;

  const isAfterRecord = state === "recorded" || state === "playing" || state === "result";

  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: isDone ? `1.5px solid ${mashq.rang}50` : "1px solid rgba(13,58,26,.08)",
      boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden",
    }}>
      {/* Arabic header */}
      <div style={{ background: `${mashq.rang}0f`, padding: "14px 16px 10px", borderBottom: `1px solid ${mashq.rang}20` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, background: mashq.rang, color: "#fff", borderRadius: 6, padding: "1px 7px", display: "inline-block", marginBottom: 8 }}>
              {mashq.daraja}
            </div>
            <div style={{ fontSize: 12, color: T.hint, fontStyle: "italic", marginBottom: 4 }}>{mashq.oqilishi}</div>
            <div style={{ fontSize: 12, color: T.text2 }}>{mashq.tarjima}</div>
          </div>
          <div style={{ fontFamily: AR, fontSize: 26, color: mashq.rang, lineHeight: 1.8, direction: "rtl", textAlign: "right" }}>
            {mashq.arabcha}
          </div>
        </div>
      </div>

      {/* Live waveform canvas */}
      {state === "recording" && (
        <div style={{ background: "rgba(46,184,46,.04)", padding: "4px 16px" }}>
          <canvas
            ref={canvasRef}
            width={320}
            height={44}
            style={{ width: "100%", height: 44, display: "block" }}
          />
        </div>
      )}

      {/* Controls */}
      <div style={{ padding: "12px 16px" }}>
        {micError && (
          <div style={{ fontSize: 11, color: "#DC2626", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
            <AlertTriangle size={12} /> Mikrofonga ruxsat berilmadi. Brauzer sozlamalarini tekshiring.
          </div>
        )}

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>

          {/* Record button */}
          {state === "idle" && (
            <button
              onClick={startRec}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${mashq.rang},${mashq.rang}bb)`, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              <Mic size={14} /> Yozish
            </button>
          )}

          {/* Stop button */}
          {state === "recording" && (
            <button
              onClick={stopRec}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: "#DC2626", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              <Square size={12} fill="#fff" /> To'xtatish
              <span style={{ background: "rgba(255,255,255,.2)", borderRadius: 6, padding: "1px 6px", fontSize: 11 }}>{seconds}s</span>
            </button>
          )}

          {/* Play / Reset / Analyze / Done */}
          {isAfterRecord && (
            <>
              <button
                onClick={playRec}
                disabled={state === "playing"}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: "rgba(13,58,26,.08)", color: T.text2, fontSize: 12, fontWeight: 700, cursor: state === "playing" ? "default" : "pointer", opacity: state === "playing" ? 0.6 : 1 }}
              >
                {state === "playing"
                  ? <><Volume2 size={14} /> Ijro…</>
                  : <><Play size={14} /> Tinglash</>}
              </button>

              <button
                onClick={reset}
                title="Qayta yozish"
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(13,58,26,.15)", background: "transparent", color: T.hint, fontSize: 12, cursor: "pointer" }}
              >
                <RotateCcw size={13} />
              </button>

              {srAvail && state !== "result" && (
                <button
                  onClick={analyze}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 13px", borderRadius: 10, border: "none", background: "rgba(124,58,237,.1)", color: "#7C3AED", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  <Sparkles size={13} /> Tahlil
                </button>
              )}

              {(state === "recorded" || state === "result") && !isDone && (
                <button
                  onClick={markDone}
                  style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: T.gLime, color: T.onCta, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  <CheckCircle2 size={14} /> Bajarildi
                </button>
              )}

              {isDone && (
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: T.lime }}>
                  <CheckCircle2 size={14} /> Bajarildi
                </div>
              )}
            </>
          )}

          {/* Analyzing state */}
          {state === "analyzing" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#7C3AED" }}>
              <Sparkles size={14} style={{ animation: "spin 1s linear infinite" }} />
              Tahlil qilinmoqda…
            </div>
          )}
        </div>

        {/* Manual rating (when SpeechRecognition not available) */}
        {!srAvail && (state === "recorded" || state === "playing") && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: T.hint, marginBottom: 6 }}>Talaffuzingizni o'zingiz baholang:</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={markDone} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "#DCFCE7", color: "#15803D", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>👍 Yaxshi</button>
              <button onClick={markDone} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "#FEF9C3", color: "#CA8A04", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>👌 O'rtacha</button>
              <button onClick={reset}    style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "#FEE2E2", color: "#DC2626", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>🔄 Qayta</button>
            </div>
          </div>
        )}

        {/* Analysis result card */}
        {natija && state === "result" && (
          <div style={{ marginTop: 12, padding: "10px 12px", background: `${ballRang}12`, border: `1px solid ${ballRang}35`, borderRadius: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: ballRang, minWidth: 50, lineHeight: 1 }}>
                {natija.ball}%
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: ballRang, marginBottom: 3 }}>
                  {natija.ball >= 70 ? "Ajoyib talaffuz!" : natija.ball >= 40 ? "Yaxshi, biroz mashq qiling" : "Qayta urinib ko'ring"}
                </div>
                {natija.aniqlangan ? (
                  <div style={{ fontSize: 11, color: T.hint }}>
                    Eshitildi:{" "}
                    <span style={{ fontFamily: AR, direction: "rtl", display: "inline", fontSize: 13, color: T.green }}>
                      {natija.aniqlangan}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: T.hint }}>Ovoz aniqlanmadi — o'zingiz baholang</div>
                )}
                <div style={{ marginTop: 6, height: 5, background: "rgba(0,0,0,.08)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${natija.ball}%`, background: ballRang, borderRadius: 3, transition: "width .5s" }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function OvozYozishView() {
  const { user } = useAuth();
  const { touchStreak } = useProgress();
  const { addCoins } = useCoins();
  const [done, setDone] = useState<Set<number>>(() => user ? loadDone(user.id) : new Set());
  const [filterDaraja, setFilterDaraja] = useState<string>("barchasi");

  const handleDone = (id: number) => {
    if (!user) return;
    if (done.has(id)) return;
    const updated = new Set(done);
    updated.add(id);
    setDone(updated);
    saveDone(user.id, updated);
    touchStreak();
    addCoins(2);
  };

  const filtered = filterDaraja === "barchasi"
    ? MASHQLAR
    : MASHQLAR.filter((m) => m.daraja === filterDaraja);

  const doneCount = done.size;
  const totalCount = MASHQLAR.length;

  if (!user) return null;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Talaffuz</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <Mic size={18} color={T.limeBrt} />
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Ovoz yozish</div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginBottom: 10 }}>
            {doneCount}/{totalCount} ta mashq bajarildi
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,.2)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%`, background: T.gLime, borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div style={{ background: "rgba(13,58,26,.04)", borderBottom: "1px solid rgba(13,58,26,.06)", padding: "10px 16px", display: "flex", gap: 6, alignItems: "flex-start" }}>
        <span style={{ fontSize: 15 }}>🎤</span>
        <span style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
          Arabcha iborani o'qing va yozing. Chrome brauzerda <strong>Tahlil</strong> tugmasi talaffuzingizni avtomatik tekshiradi.
        </span>
      </div>

      <div style={{ padding: "14px 14px 32px" }}>
        {/* Level filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {(["barchasi", "A0", "A1", "A2", "B1", "B2"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setFilterDaraja(d)}
              style={{
                padding: "6px 14px", borderRadius: 20, border: "none",
                background: filterDaraja === d
                  ? d === "barchasi" ? T.green : DARAJA_RANG[d]
                  : "rgba(13,58,26,.07)",
                color: filterDaraja === d ? "#fff" : T.text2,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}
            >
              {d === "barchasi" ? "Barchasi" : d}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((m) => (
            <MashqCard key={m.id} mashq={m} isDone={done.has(m.id)} onDone={handleDone} />
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
