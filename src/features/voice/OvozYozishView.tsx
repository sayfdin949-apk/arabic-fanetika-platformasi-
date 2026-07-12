import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, RotateCcw, CheckCircle2, Volume2 } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";

interface TalaffuzMashq {
  id: number;
  arabcha: string;
  oqilishi: string;
  tarjima: string;
  daraja: "A0" | "A1" | "A2";
  rang: string;
}

const MASHQLAR: TalaffuzMashq[] = [
  { id: 1, arabcha: "بَ بِ بُ", oqilishi: "ba — bi — bu", tarjima: "Ba harfi uch harakat bilan", daraja: "A0", rang: "#0891B2" },
  { id: 2, arabcha: "مَرْحَبًا", oqilishi: "marhaban", tarjima: "Salom", daraja: "A0", rang: "#0891B2" },
  { id: 3, arabcha: "صَبَاحُ الْخَيْرِ", oqilishi: "sabaahul-xayr", tarjima: "Xayrli tong", daraja: "A0", rang: "#0891B2" },
  { id: 4, arabcha: "كَيْفَ حَالُكَ؟", oqilishi: "kayfa haaluka?", tarjima: "Yaxshimisiz?", daraja: "A1", rang: "#2563EB" },
  { id: 5, arabcha: "أَنَا بِخَيْرٍ، شُكْرًا", oqilishi: "anaa bixayr, shukran", tarjima: "Yaxshiman, rahmat", daraja: "A1", rang: "#2563EB" },
  { id: 6, arabcha: "مَا اسْمُكَ؟", oqilishi: "ma ismuka?", tarjima: "Ismingiz nima?", daraja: "A1", rang: "#2563EB" },
  { id: 7, arabcha: "اسْمِي أَحْمَد", oqilishi: "ismii Ahmad", tarjima: "Mening ismim Ahmad", daraja: "A1", rang: "#2563EB" },
  { id: 8, arabcha: "مِنْ أَيْنَ أَنْتَ؟", oqilishi: "min ayna anta?", tarjima: "Qayerdansiz?", daraja: "A1", rang: "#2563EB" },
  { id: 9, arabcha: "ذَهَبَ الوَلَدُ إِلَى المَدْرَسَة", oqilishi: "zahaba l-waladu ilal-madrasa", tarjima: "Bola maktabga bordi", daraja: "A2", rang: "#059669" },
  { id: 10, arabcha: "أُحِبُّ تَعَلُّمَ اللُّغَةِ العَرَبِيَّة", oqilishi: "uhibbu ta'alluma l-lughatil-'arabiyya", tarjima: "Men arabcha o'rganishni yaxshi ko'raman", daraja: "A2", rang: "#059669" },
];

const doneKey = (uid: string) => `afp:voice_done_${uid}`;

function loadDone(uid: string): Set<number> {
  try {
    const raw = localStorage.getItem(doneKey(uid));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveDone(uid: string, set: Set<number>) {
  try { localStorage.setItem(doneKey(uid), JSON.stringify([...set])); } catch { /* ignore */ }
}

type RecordState = "idle" | "recording" | "recorded" | "playing";

function MashqCard({
  mashq,
  isDone,
  onDone,
}: {
  mashq: TalaffuzMashq;
  isDone: boolean;
  onDone: (id: number) => void;
}) {
  const [state, setState] = useState<RecordState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [micError, setMicError] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setState("recorded");
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRef.current = mr;
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setState("playing");
    audio.play();
    audio.onended = () => setState("recorded");
  };

  const reset = () => {
    setState("idle");
    setAudioUrl(null);
    setSeconds(0);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  };

  const markDone = () => {
    onDone(mashq.id);
    reset();
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: isDone ? `1.5px solid ${mashq.rang}50` : "1px solid rgba(13,58,26,.08)",
      boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden",
    }}>
      {/* Arabcha */}
      <div style={{ background: `${mashq.rang}0f`, padding: "14px 16px 10px", borderBottom: `1px solid ${mashq.rang}20` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, background: mashq.rang, color: "#fff", borderRadius: 6, padding: "1px 7px", display: "inline-block", marginBottom: 8 }}>
              {mashq.daraja}
            </div>
            <div style={{ fontSize: 12, color: T.hint, fontStyle: "italic", marginBottom: 4 }}>{mashq.oqilishi}</div>
            <div style={{ fontSize: 12, color: T.text2 }}>{mashq.tarjima}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: AR, fontSize: 26, color: mashq.rang, lineHeight: 1.8, direction: "rtl" }}>
              {mashq.arabcha}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: "12px 16px" }}>
        {micError && (
          <div style={{ fontSize: 11, color: "#DC2626", marginBottom: 10 }}>
            Mikrofonga ruxsat berilmadi. Brauzer sozlamalarini tekshiring.
          </div>
        )}

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Record / Stop */}
          {state === "idle" && (
            <button
              onClick={startRec}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${mashq.rang},${mashq.rang}cc)`, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              <Mic size={14} /> Yozish
            </button>
          )}
          {state === "recording" && (
            <button
              onClick={stopRec}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: "#DC2626", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              <Square size={12} fill="#fff" /> To'xtatish
              <span style={{ background: "rgba(255,255,255,.2)", borderRadius: 6, padding: "1px 6px", fontSize: 11 }}>{seconds}s</span>
            </button>
          )}

          {/* Play */}
          {(state === "recorded" || state === "playing") && (
            <button
              onClick={playRec}
              disabled={state === "playing"}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: "rgba(13,58,26,.08)", color: T.text2, fontSize: 12, fontWeight: 700, cursor: state === "playing" ? "default" : "pointer", opacity: state === "playing" ? 0.6 : 1 }}
            >
              {state === "playing" ? <><Volume2 size={14} /> Ijro etilmoqda…</> : <><Play size={14} /> Tinglash</>}
            </button>
          )}

          {/* Reset */}
          {(state === "recorded" || state === "playing") && (
            <button
              onClick={reset}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(13,58,26,.15)", background: "transparent", color: T.hint, fontSize: 12, cursor: "pointer" }}
            >
              <RotateCcw size={13} />
            </button>
          )}

          {/* Done */}
          {state === "recorded" && !isDone && (
            <button
              onClick={markDone}
              style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "none", background: T.gLime, color: T.onCta, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              <CheckCircle2 size={14} /> Bajarildi
            </button>
          )}

          {/* Already done */}
          {isDone && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: T.lime }}>
              <CheckCircle2 size={14} /> Bajarildi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function OvozYozishView() {
  const { user } = useAuth();
  const { touchStreak } = useProgress();
  const [done, setDone] = useState<Set<number>>(() => user ? loadDone(user.id) : new Set());
  const [filterDaraja, setFilterDaraja] = useState<string>("barchasi");

  const handleDone = (id: number) => {
    if (!user) return;
    const updated = new Set(done);
    updated.add(id);
    setDone(updated);
    saveDone(user.id, updated);
    touchStreak();
  };

  const daraja_rangi: Record<string, string> = { A0: "#0891B2", A1: "#2563EB", A2: "#059669" };

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
          {/* Progress */}
          <div style={{ height: 4, background: "rgba(255,255,255,.2)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%`, background: T.gLime, borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ background: "rgba(13,58,26,.04)", borderBottom: "1px solid rgba(13,58,26,.06)", padding: "10px 16px", display: "flex", gap: 6, alignItems: "flex-start" }}>
        <span style={{ fontSize: 15 }}>🎤</span>
        <span style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
          Arabcha iborani o'qing, yozib oling va tinglang. Talaffuzingizni tekshiring.
        </span>
      </div>

      <div style={{ padding: "14px 14px 32px" }}>
        {/* Daraja filtri */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["barchasi", "A0", "A1", "A2"].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDaraja(d)}
              style={{
                padding: "6px 14px", borderRadius: 20, border: "none",
                background: filterDaraja === d ? (d === "barchasi" ? T.green : daraja_rangi[d]) : "rgba(13,58,26,.07)",
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
    </div>
  );
}
