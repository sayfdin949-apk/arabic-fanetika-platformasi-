import { useState, useEffect, useRef, useCallback } from "react";
import { Send, ChevronDown, MessageCircle, Trash2, Users } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { chatApi, type ChatMessage } from "../../lib/chatApi";
import { store } from "../../lib/storage";
import type { Guruh } from "../guruh/GuruhlarView";

const POLL_MS = 3000;

const ROLE_LABEL: Record<string, string> = {
  ceo: "CEO",
  teacher: "O'qituvchi",
  assistant: "Yordamchi",
  student: "O'quvchi",
};

const ROLE_COLOR: Record<string, string> = {
  ceo: "#7C3AED",
  teacher: "#0891B2",
  assistant: "#059669",
  student: T.green,
};

function fmtVaqt(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fmtSana(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Bugun";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Kecha";
  return d.toLocaleDateString("uz-UZ", { day: "numeric", month: "long" });
}

export function ChatView() {
  const { user } = useAuth();
  const [guruhlar, setGuruhlar] = useState<Guruh[]>([]);
  const [selectedGuruh, setSelectedGuruh] = useState<Guruh | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [matn, setMatn] = useState("");
  const [sending, setSending] = useState(false);
  const [guruhOpen, setGuruhOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isStaff = user?.role === "ceo" || user?.role === "teacher" || user?.role === "assistant";

  // Guruhlarni yuklash
  useEffect(() => {
    (async () => {
      const list = (await store.get<Guruh[]>("guruhlar")) ?? [];
      setGuruhlar(list);

      if (!user) return;
      if (isStaff) {
        // Staff: birinchi guruhni tanlaydi, keyin o'zgartirish mumkin
        if (list.length > 0) setSelectedGuruh(list[0]);
      } else {
        // O'quvchi: o'zining guruhini topadi
        const myGuruh = list.find((g) => g.oquvchiIds.includes(user.id));
        setSelectedGuruh(myGuruh ?? null);
      }
    })();
  }, [user, isStaff]);

  // Xabarlarni yuklash va polling
  const fetchMessages = useCallback(async () => {
    if (!selectedGuruh) return;
    const msgs = await chatApi.getMessages(selectedGuruh.id);
    setMessages(msgs);
  }, [selectedGuruh]);

  useEffect(() => {
    void fetchMessages();
    const timer = setInterval(fetchMessages, POLL_MS);
    return () => clearInterval(timer);
  }, [fetchMessages]);

  // Yangi xabar kelganda pastga scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async () => {
    if (!matn.trim() || !user || !selectedGuruh || sending) return;
    const text = matn.trim();
    setMatn("");
    setSending(true);
    await chatApi.sendMessage({
      guruhId: selectedGuruh.id,
      userId: user.id,
      userIsmFamilya: `${user.ism} ${user.familya}`,
      userRole: user.role,
      matn: text,
    });
    await fetchMessages();
    setSending(false);
    inputRef.current?.focus();
  };

  const handleDelete = async (msgId: string) => {
    if (!selectedGuruh) return;
    await chatApi.deleteMessage(selectedGuruh.id, msgId);
    await fetchMessages();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  // Sanalarni guruhlash
  const grouped: { sana: string; msgs: ChatMessage[] }[] = [];
  for (const msg of messages) {
    const sana = fmtSana(msg.vaqt);
    const last = grouped[grouped.length - 1];
    if (last && last.sana === sana) last.msgs.push(msg);
    else grouped.push({ sana, msgs: [msg] });
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "14px 16px", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MessageCircle size={17} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Guruh chat</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>
                {selectedGuruh ? selectedGuruh.nom : "Guruh tanlanmagan"}
              </div>
            </div>

            {/* Guruh tanlash (staff uchun) */}
            {isStaff && guruhlar.length > 1 && (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setGuruhOpen((o) => !o)}
                  style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12, fontWeight: 600 }}
                >
                  <Users size={13} />
                  Guruh
                  <ChevronDown size={13} style={{ transform: guruhOpen ? "rotate(180deg)" : "none", transition: ".15s" }} />
                </button>
                {guruhOpen && (
                  <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#fff", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,.15)", minWidth: 160, zIndex: 10, overflow: "hidden" }}>
                    {guruhlar.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => { setSelectedGuruh(g); setGuruhOpen(false); setMessages([]); }}
                        style={{ width: "100%", padding: "10px 14px", background: selectedGuruh?.id === g.id ? "rgba(13,58,26,.08)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 500, color: T.green }}
                      >
                        {g.nom}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Members count */}
          {selectedGuruh && (
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <Users size={11} color="rgba(255,255,255,.5)" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>
                {selectedGuruh.oquvchiIds.length} o'quvchi
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Guruh topilmasa */}
      {!selectedGuruh && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 32 }}>
          <div style={{ fontSize: 48 }}>💬</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.green }}>Guruh topilmadi</div>
          <div style={{ fontSize: 13, color: T.hint, textAlign: "center" }}>
            {isStaff ? "Avval guruhlar bo'limida guruh yarating." : "Siz hali biror guruhga qo'shilmagansiz."}
          </div>
        </div>
      )}

      {/* Messages */}
      {selectedGuruh && (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 2 }}>
            {grouped.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 0", color: T.hint, fontSize: 13 }}>
                Hali xabar yo'q. Birinchi bo'lib yozing!
              </div>
            )}

            {grouped.map((group) => (
              <div key={group.sana}>
                {/* Sana ajratgich */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0 8px" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(13,58,26,.1)" }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: T.hint, background: T.meshLight, padding: "2px 8px" }}>{group.sana}</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(13,58,26,.1)" }} />
                </div>

                {group.msgs.map((msg) => {
                  const isMe = msg.userId === user.id;
                  const canDelete = isMe || isStaff;
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: "flex",
                        flexDirection: isMe ? "row-reverse" : "row",
                        alignItems: "flex-end",
                        gap: 6,
                        marginBottom: 6,
                      }}
                    >
                      {/* Avatar */}
                      {!isMe && (
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: ROLE_COLOR[msg.userRole] ?? T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                          {msg.userIsmFamilya[0]?.toUpperCase()}
                        </div>
                      )}

                      <div style={{ maxWidth: "75%", minWidth: 60 }}>
                        {/* Sender name */}
                        {!isMe && (
                          <div style={{ fontSize: 10, fontWeight: 700, color: ROLE_COLOR[msg.userRole] ?? T.green, marginBottom: 2, paddingLeft: 2 }}>
                            {msg.userIsmFamilya} · {ROLE_LABEL[msg.userRole]}
                          </div>
                        )}

                        <div style={{ position: "relative" }}>
                          <div style={{
                            background: isMe ? T.gGreen : "#fff",
                            color: isMe ? "#fff" : T.text,
                            borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                            padding: "8px 12px",
                            fontSize: 13,
                            lineHeight: 1.45,
                            border: isMe ? "none" : "1px solid rgba(13,58,26,.08)",
                            boxShadow: "0 1px 2px rgba(0,0,0,.06)",
                            wordBreak: "break-word",
                          }}>
                            {msg.matn}
                            <span style={{ display: "inline-block", fontSize: 9, color: isMe ? "rgba(255,255,255,.5)" : T.hint, marginLeft: 6, verticalAlign: "bottom" }}>
                              {fmtVaqt(msg.vaqt)}
                            </span>
                          </div>

                          {canDelete && (
                            <button
                              onClick={() => void handleDelete(msg.id)}
                              style={{ position: "absolute", top: -6, right: isMe ? "auto" : -6, left: isMe ? -6 : "auto", background: "rgba(220,38,38,.9)", border: "none", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: ".15s" }}
                              className="del-btn"
                              title="O'chirish"
                            >
                              <Trash2 size={9} color="#fff" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 14px 14px", background: "#fff", borderTop: "1px solid rgba(13,58,26,.08)", flexShrink: 0, display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea
              ref={inputRef}
              value={matn}
              onChange={(e) => setMatn(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Xabar yozing…"
              rows={1}
              style={{
                flex: 1, resize: "none", border: "1px solid rgba(13,58,26,.15)", borderRadius: 10,
                padding: "9px 12px", fontSize: 13, color: T.text, fontFamily: "inherit",
                outline: "none", lineHeight: 1.4, maxHeight: 100, overflowY: "auto",
                background: "rgba(13,58,26,.03)",
              }}
            />
            <button
              onClick={() => void handleSend()}
              disabled={!matn.trim() || sending}
              style={{
                width: 40, height: 40, borderRadius: 10, border: "none",
                background: matn.trim() ? T.gLime : "rgba(13,58,26,.1)",
                cursor: matn.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                transition: "background .15s",
              }}
            >
              <Send size={16} color={matn.trim() ? T.onCta : T.hint} />
            </button>
          </div>
        </>
      )}

      <style>{`.del-btn:hover { opacity: 1 !important; } div:hover > div > .del-btn { opacity: 1 !important; }`}</style>
    </div>
  );
}
