import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import QRCode from "qrcode";
import { CalendarClock, Send, X, Clock, Ban, CheckCircle2, XCircle, QrCode } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { useAssistant, withinBookingWindow, QR_PREFIX, type AssistantBooking } from "./AssistantContext";

const inp: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(13,58,26,.15)",
  borderRadius: 9,
  padding: "10px 12px",
  fontSize: 13,
  color: T.green,
  outline: "none",
  boxSizing: "border-box",
  background: "rgba(13,58,26,.03)",
};

const STATUS_LABEL: Record<AssistantBooking["status"], string> = {
  scheduled: "Belgilangan",
  completed: "O'tdi",
  cancelled: "Bekor qilingan",
  noshow: "Kelinmadi",
};
const STATUS_COLOR: Record<AssistantBooking["status"], string> = {
  scheduled: "#b8860b",
  completed: "#2EB82E",
  cancelled: "#5A8060",
  noshow: "#E60023",
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function QrModal({ booking, onClose, onShown }: { booking: AssistantBooking; onClose: () => void; onShown: () => void }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(`${QR_PREFIX}${booking.id}`, { width: 240, margin: 1 }).then((url) => {
      if (alive) setSrc(url);
    });
    onShown();
    return () => { alive = false; };
  }, [booking.id]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 22, width: "100%", maxWidth: 320, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "rgba(13,58,26,.07)", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: T.text2 }}>
            <X size={14} />
          </button>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 10 }}>QR kodni ustozga ko'rsating</div>
        {src ? <img src={src} alt="QR" style={{ width: 220, height: 220, margin: "0 auto" }} /> : <div style={{ height: 220 }} />}
        <div style={{ fontSize: 11, color: T.hint, marginTop: 10 }}>Yordamchi ustoz skaneridan o'tgandan keyin dars boshlanadi</div>
      </div>
    </div>
  );
}

export function YordamchiUstozView() {
  const { user, users } = useAuth();
  const { bookings, createBooking, cancelBooking, markPresent } = useAssistant();
  const [assistantId, setAssistantId] = useState("");
  const [when, setWhen] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [qrFor, setQrFor] = useState<AssistantBooking | null>(null);

  if (user?.role !== "student") return <Navigate to="/" replace />;

  const assistants = users.filter((u) => u.role === "assistant");
  const myBookings = useMemo(
    () => bookings.filter((b) => b.studentId === user.id).sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt)),
    [bookings, user.id],
  );

  const blockedUntil = user.assistantBlockedUntil && new Date(user.assistantBlockedUntil).getTime() > Date.now() ? user.assistantBlockedUntil : null;
  const daysLeft = blockedUntil ? Math.ceil((new Date(blockedUntil).getTime() - Date.now()) / 86_400_000) : 0;

  const book = () => {
    setErr(""); setOk(false);
    if (!assistantId) { setErr("Ustozni tanlang"); return; }
    if (!when) { setErr("Vaqtni tanlang"); return; }
    const res = createBooking(user.id, assistantId, when);
    if (!res.ok) { setErr(res.error ?? "Xatolik"); return; }
    setOk(true);
    setAssistantId(""); setWhen("");
    setTimeout(() => setOk(false), 2500);
  };

  const cancel = (id: string) => {
    if (!window.confirm("Darsni bekor qilasizmi?")) return;
    cancelBooking(id, user.id);
  };

  const nameOf = (id: string) => {
    const a = users.find((u) => u.id === id);
    return a ? `${a.ism} ${a.familya}` : "Noma'lum";
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "20px 18px 18px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Qo'shimcha mashg'ulot</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Yordamchi ustoz</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 4 }}>Guruh darsidan tashqari shaxsiy mashg'ulot uchun vaqt belgilang</div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px" }}>
        {blockedUntil ? (
          <div style={{ background: "rgba(230,0,35,.07)", border: "1px solid rgba(230,0,35,.2)", borderRadius: 14, padding: 18, marginBottom: 16, textAlign: "center" }}>
            <Ban size={28} color={T.red} style={{ margin: "0 auto 8px" }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: T.red, marginBottom: 4 }}>Vaqtincha bloklangansiz</div>
            <div style={{ fontSize: 12, color: T.text2 }}>
              Belgilangan darsga kelmaganingiz/bekor qilmaganingiz uchun yana {daysLeft} kun kuting.
            </div>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04), 0 6px 18px rgba(13,58,26,.06)", padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Vaqt belgilash</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <select value={assistantId} onChange={(e) => setAssistantId(e.target.value)} style={inp}>
                <option value="">Yordamchi ustozni tanlang</option>
                {assistants.map((a) => (
                  <option key={a.id} value={a.id}>{a.ism} {a.familya} {typeof a.assistantRating === "number" ? `(${a.assistantRating})` : ""}</option>
                ))}
              </select>
              <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} style={inp} />
              {err && <div style={{ fontSize: 12, color: T.red, background: "rgba(230,0,35,.05)", border: "1px solid rgba(230,0,35,.15)", borderRadius: 8, padding: "8px 12px" }}>{err}</div>}
              {ok && <div style={{ fontSize: 12, color: T.lime, fontWeight: 600 }}>✓ Band qilindi!</div>}
              <button onClick={book} style={{ background: T.gGreen, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <CalendarClock size={16} /> Band qilish
              </button>
              <div style={{ fontSize: 11, color: T.hint, lineHeight: 1.5 }}>
                Dars davomiyligi 1 soat. Belgilangan vaqtga kelmasangiz va oldindan bekor qilmasangiz, 3 kunga shu bo'lim sizga yopiladi.
              </div>
            </div>
          </div>
        )}

        <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 10 }}>Mening darslarim ({myBookings.length})</div>

        {myBookings.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "32px 20px", textAlign: "center" }}>
            <CalendarClock size={32} color="rgba(13,58,26,.18)" style={{ margin: "0 auto 10px" }} />
            <div style={{ fontSize: 13, color: T.hint }}>Hozircha band qilingan dars yo'q</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {myBookings.map((b) => {
            const canCancel = b.status === "scheduled" && Date.now() < new Date(b.scheduledAt).getTime();
            const inWindow = b.status === "scheduled" && withinBookingWindow(b.scheduledAt);
            return (
              <div key={b.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 2px rgba(13,58,26,.04)", padding: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{nameOf(b.assistantId)}</div>
                    <div style={{ fontSize: 11, color: T.hint, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} /> {fmt(b.scheduledAt)}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 8, flexShrink: 0, background: `${STATUS_COLOR[b.status]}1A`, color: STATUS_COLOR[b.status] }}>
                    {b.status === "completed" ? <CheckCircle2 size={12} /> : b.status === "noshow" || b.status === "cancelled" ? <XCircle size={12} /> : <Clock size={12} />}
                    {STATUS_LABEL[b.status]}
                  </div>
                </div>
                {b.status === "scheduled" && (
                  <div style={{ display: "flex", gap: 8 }}>
                    {inWindow && (
                      <button
                        onClick={() => setQrFor(b)}
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: T.gLime, color: T.onCta, border: "none", borderRadius: 9, padding: "9px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                      >
                        <QrCode size={14} /> QR ko'rsatish
                      </button>
                    )}
                    {canCancel && (
                      <button
                        onClick={() => cancel(b.id)}
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "rgba(230,0,35,.07)", color: T.red, border: "1px solid rgba(230,0,35,.15)", borderRadius: 9, padding: "9px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                      >
                        <Send size={13} style={{ transform: "rotate(135deg)" }} /> Bekor qilish
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {qrFor && (
        <QrModal
          booking={qrFor}
          onClose={() => setQrFor(null)}
          onShown={() => markPresent(qrFor.id, user.id)}
        />
      )}
    </div>
  );
}
