import { useEffect, useState } from "react";
import { MessageCircleWarning, Send, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { T, FONT } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { getComplaints, addComplaint, setComplaintStatus } from "../../lib/complaintsRepo";
import type { Complaint } from "./types";

export function ShikoyatView() {
  const { user } = useAuth();
  const [list, setList] = useState<Complaint[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const all = await getComplaints();
    setList(all);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  if (!user) return null;
  const isTeacher = user.role === "teacher" || user.role === "ceo";
  const visible = isTeacher ? list : list.filter((c) => c.userId === user.id);
  const ROLE_LABEL: Record<string, string> = { ceo: "CEO", teacher: "o'qituvchi", assistant: "yordamchi ustoz", student: "o'quvchi" };

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    await addComplaint({ userId: user.id, userName: `${user.ism} ${user.familya}`, role: user.role, text: text.trim() });
    setText("");
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    await load();
  };

  const toggleStatus = async (c: Complaint) => {
    await setComplaintStatus(c.id, c.status === "open" ? "fixed" : "open");
    await load();
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, fontFamily: FONT }}>
      <div style={{ background: T.gGreen, padding: "20px 18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.limeBrt, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
            Yordam
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Shikoyat va muammolar</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 4 }}>
            {isTeacher ? "Barcha foydalanuvchilardan kelgan murojaatlar" : "Ilovada muammo bo'lsa, shu yerga yozing"}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px 28px", maxWidth: 640, margin: "0 auto" }}>
        {/* Yangi shikoyat yuborish — har ikki rol uchun */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.1)", padding: 16, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <MessageCircleWarning size={17} color={T.lime} />
            <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Muammoni tasvirlab yozing</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masalan: dars sahifasi ochilmayapti, audio ishlamayapti, test natijasi noto'g'ri ko'rsatilyapti..."
            rows={4}
            style={{
              width: "100%",
              border: "1px solid rgba(13,58,26,.15)",
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 13,
              color: T.text,
              fontFamily: FONT,
              resize: "vertical",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ fontSize: 12, color: sent ? T.lime : T.hint, fontWeight: sent ? 700 : 400 }}>
              {sent ? "✓ Yuborildi, rahmat!" : " "}
            </span>
            <button
              onClick={handleSend}
              disabled={!text.trim() || sending}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: text.trim() ? T.gLime : "rgba(13,58,26,.15)",
                border: "none",
                borderRadius: 10,
                padding: "10px 18px",
                cursor: text.trim() ? "pointer" : "not-allowed",
                fontSize: 13,
                fontWeight: 700,
                color: text.trim() ? T.onCta : T.hint,
              }}
            >
              <Send size={15} /> Yuborish
            </button>
          </div>
        </div>

        {/* Ro'yxat */}
        <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 10 }}>
          {isTeacher ? `Barcha murojaatlar (${visible.length})` : `Mening murojaatlarim (${visible.length})`}
        </div>

        {loading && <div style={{ fontSize: 13, color: T.hint, textAlign: "center", padding: "20px 0" }}>Yuklanmoqda…</div>}

        {!loading && visible.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 24, textAlign: "center" }}>
            <MessageCircleWarning size={36} color={T.hint} style={{ margin: "0 auto 10px" }} />
            <div style={{ fontSize: 13, color: T.hint }}>Hozircha murojaatlar yo'q</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {visible.map((c) => (
            <div key={c.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", padding: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                <div>
                  {isTeacher && (
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>
                      {c.userName} <span style={{ color: T.hint, fontWeight: 400 }}>({ROLE_LABEL[c.role] ?? c.role})</span>
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: T.hint, marginTop: isTeacher ? 2 : 0 }}>
                    {new Date(c.createdAt).toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 9px",
                    borderRadius: 8,
                    flexShrink: 0,
                    background: c.status === "fixed" ? "rgba(46,184,46,.12)" : "rgba(255,165,0,.15)",
                    color: c.status === "fixed" ? T.lime : "#b8860b",
                  }}
                >
                  {c.status === "fixed" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {c.status === "fixed" ? "Hal qilindi" : "Ko'rib chiqilmoqda"}
                </div>
              </div>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{c.text}</div>
              {isTeacher && (
                <button
                  onClick={() => toggleStatus(c)}
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(13,58,26,.06)",
                    border: "1px solid rgba(13,58,26,.12)",
                    borderRadius: 8,
                    padding: "7px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.text2,
                    cursor: "pointer",
                  }}
                >
                  {c.status === "open" ? <CheckCircle2 size={13} /> : <RotateCcw size={13} />}
                  {c.status === "open" ? "Hal qilindi deb belgilash" : "Qayta ochish"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
