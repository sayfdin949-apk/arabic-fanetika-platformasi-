import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import jsQR from "jsqr";
import { ScanLine, Camera, CheckCircle2, XCircle, Clock, KeyboardIcon } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { useAssistant } from "./AssistantContext";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function SkanerView() {
  const { user, users } = useAuth();
  const { bookings, checkIn } = useAssistant();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [camErr, setCamErr] = useState("");
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [manual, setManual] = useState("");
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stop = () => {
    setScanning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  useEffect(() => () => stop(), []);

  if (user?.role !== "assistant") return <Navigate to="/" replace />;

  const upcoming = bookings
    .filter((b) => b.assistantId === user.id && b.status === "scheduled")
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  const handleCode = (code: string) => {
    const res = checkIn(code, user.id);
    setResult({ ok: res.ok, msg: res.ok ? "Dars boshlandi! ✓" : (res.error ?? "Xatolik") });
    stop();
  };

  const start = async () => {
    setCamErr(""); setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      loop();
    } catch {
      setCamErr("Kamera ochilmadi. Quyida kodni qo'lda kiriting.");
    }
  };

  const loop = () => {
    const v = videoRef.current, c = canvasRef.current;
    if (!v || !c || v.readyState !== v.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext("2d");
    if (!ctx) { rafRef.current = requestAnimationFrame(loop); return; }
    ctx.drawImage(v, 0, 0, c.width, c.height);
    const img = ctx.getImageData(0, 0, c.width, c.height);
    const code = jsQR(img.data, c.width, c.height);
    if (code?.data) {
      handleCode(code.data);
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  };

  const submitManual = () => {
    if (!manual.trim()) return;
    handleCode(manual.trim());
    setManual("");
  };

  const nameOf = (id: string) => {
    const s = users.find((u) => u.id === id);
    return s ? `${s.ism} ${s.familya}` : "Noma'lum";
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 18px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Yordamchi ustoz</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Skaner</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 4 }}>O'quvchining QR kodini skanerlab darsni boshlang</div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)", padding: 16, marginBottom: 16 }}>
          {result && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "10px 12px", borderRadius: 10, background: result.ok ? "rgba(46,184,46,.1)" : "rgba(230,0,35,.07)", color: result.ok ? T.lime : T.red, fontSize: 13, fontWeight: 600 }}>
              {result.ok ? <CheckCircle2 size={16} /> : <XCircle size={16} />} {result.msg}
            </div>
          )}

          {scanning ? (
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#000" }}>
              <video ref={videoRef} muted playsInline style={{ width: "100%", display: "block" }} />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              <button onClick={stop} style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.6)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                To'xtatish
              </button>
            </div>
          ) : (
            <button onClick={start} style={{ width: "100%", background: T.gLime, color: T.onCta, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Camera size={18} /> Skanerni boshlash
            </button>
          )}

          {camErr && <div style={{ fontSize: 12, color: T.red, marginTop: 10 }}>{camErr}</div>}

          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(13,58,26,.07)" }}>
            <div style={{ fontSize: 11, color: T.hint, fontWeight: 600, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <KeyboardIcon size={12} /> Yoki kodni qo'lda kiriting
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submitManual(); }}
                placeholder="AFPBOOK:..."
                style={{ flex: 1, border: "1px solid rgba(13,58,26,.15)", borderRadius: 9, padding: "9px 12px", fontSize: 13, color: T.green, outline: "none" }}
              />
              <button onClick={submitManual} style={{ background: T.gGreen, color: "#fff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <ScanLine size={16} /> Bildirishnomalar — belgilangan darslar ({upcoming.length})
        </div>

        {upcoming.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "28px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 13, color: T.hint }}>Hozircha belgilangan dars yo'q</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.map((b) => (
            <div key={b.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(13,58,26,.08)", padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.gGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                {nameOf(b.studentId)[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{nameOf(b.studentId)}</div>
                <div style={{ fontSize: 11, color: T.hint, marginTop: 1, display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={10} /> {fmt(b.scheduledAt)}
                </div>
              </div>
              {b.studentPresentAt && (
                <span style={{ fontSize: 10, fontWeight: 700, color: T.lime, background: "rgba(46,184,46,.1)", borderRadius: 8, padding: "3px 8px" }}>Tayyor</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
