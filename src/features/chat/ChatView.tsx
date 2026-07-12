import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
} from "react";
import {
  Send,
  ChevronDown,
  MessageCircle,
  Trash2,
  Users,
  Smile,
  X,
  CornerUpLeft,
  ArrowDown,
} from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { chatApi, type ChatMessage } from "../../lib/chatApi";
import { store, usingSupabase } from "../../lib/storage";
import type { Guruh } from "../guruh/GuruhlarView";

// Supabase rejimida Realtime asosiy, polling zaxira (10s)
// Lokal rejimda polling asosiy (2s)
const POLL_MS = usingSupabase ? 10_000 : 2_000;

const EMOJIS = [
  "😊","😂","❤️","👍","👏","🙏","😍","🤔","😅","🎉",
  "✅","🔥","💯","🌟","😢","😮","🤩","💪","👋","😁",
  "🙌","🥳","😎","❓","⚡","✨","💬","📚","🎯","👌",
];

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

function truncate(s: string, n = 60) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

export function ChatView() {
  const { user } = useAuth();
  const [guruhlar, setGuruhlar] = useState<Guruh[]>([]);
  const [selectedGuruh, setSelectedGuruh] = useState<Guruh | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [matn, setMatn] = useState("");
  const [sending, setSending] = useState(false);
  const [guruhOpen, setGuruhOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [typers, setTypers] = useState<string[]>([]);
  const [newMsgCount, setNewMsgCount] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevLenRef = useRef(0);

  const isStaff =
    user?.role === "ceo" ||
    user?.role === "teacher" ||
    user?.role === "assistant";

  // Guruhlarni yuklash
  useEffect(() => {
    (async () => {
      const list = (await store.get<Guruh[]>("guruhlar")) ?? [];
      setGuruhlar(list);
      if (!user) return;
      if (isStaff) {
        if (list.length > 0) setSelectedGuruh(list[0]);
      } else {
        setSelectedGuruh(list.find((g) => g.oquvchiIds.includes(user.id)) ?? null);
      }
    })();
  }, [user, isStaff]);

  // Scroll to bottom va new-msg badge
  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
    setNewMsgCount(0);
  }, []);

  // Scroll position tracking
  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setIsAtBottom(atBottom);
    if (atBottom) setNewMsgCount(0);
  }, []);

  // Xabarlarni yuklash
  const fetchMessages = useCallback(async () => {
    if (!selectedGuruh || !user) return;
    const msgs = await chatApi.getMessages(selectedGuruh.id);
    chatApi.clearNew(selectedGuruh.id);

    setMessages((prev) => {
      if (msgs.length > prev.length) {
        const added = msgs.length - prev.length;
        if (isAtBottom) {
          // scroll to bottom after render
          setTimeout(() => scrollToBottom(), 50);
        } else {
          setNewMsgCount((n) => n + added);
        }
      }
      prevLenRef.current = msgs.length;
      return msgs;
    });

    // Typing
    setTypers(chatApi.getTypers(selectedGuruh.id, user.id));
  }, [selectedGuruh, user, isAtBottom, scrollToBottom]);

  // Realtime (Supabase) + zaxira polling + visibilitychange
  useEffect(() => {
    if (!selectedGuruh) return;
    void fetchMessages();

    // Supabase rejimida websocket orqali darhol yangilanadi
    const unsub = chatApi.subscribe(selectedGuruh.id, () => void fetchMessages());

    const timer = setInterval(fetchMessages, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void fetchMessages();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      unsub();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchMessages, selectedGuruh]);

  // Clear new flag when chat opens
  useEffect(() => {
    if (selectedGuruh) chatApi.clearNew(selectedGuruh.id);
  }, [selectedGuruh]);

  // Initial scroll
  useEffect(() => {
    if (messages.length > 0 && prevLenRef.current === 0) {
      scrollToBottom(false);
    }
  }, [messages.length, scrollToBottom]);

  // Textarea auto-resize
  const resizeTextarea = () => {
    const ta = inputRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 100)}px`;
  };

  // Typing indicator
  const onTyping = (val: string) => {
    setMatn(val);
    resizeTextarea();
    if (!selectedGuruh || !user) return;
    chatApi.setTyping(selectedGuruh.id, user.id, `${user.ism} ${user.familya}`);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      chatApi.clearTyping(selectedGuruh.id, user.id);
    }, 3000);
  };

  const handleSend = async () => {
    if (!matn.trim() || !user || !selectedGuruh || sending) return;
    const text = matn.trim();
    setMatn("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    const reply = replyTo;
    setReplyTo(null);
    setEmojiOpen(false);
    setSending(true);
    chatApi.clearTyping(selectedGuruh.id, user.id);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    await chatApi.sendMessage({
      guruhId: selectedGuruh.id,
      userId: user.id,
      userIsmFamilya: `${user.ism} ${user.familya}`,
      userRole: user.role,
      matn: text,
      replyTo: reply
        ? { id: reply.id, matn: reply.matn, userIsmFamilya: reply.userIsmFamilya }
        : undefined,
    });
    await fetchMessages();
    setSending(false);
    scrollToBottom();
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
    if (e.key === "Escape") {
      setReplyTo(null);
      setEmojiOpen(false);
    }
  };

  const insertEmoji = (emoji: string) => {
    setMatn((m) => m + emoji);
    setEmojiOpen(false);
    inputRef.current?.focus();
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

  const msgBubble = (isMe: boolean): CSSProperties => ({
    background: isMe ? T.gGreen : "#fff",
    color: isMe ? "#fff" : T.text,
    borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
    padding: "8px 12px",
    fontSize: 13,
    lineHeight: 1.45,
    border: isMe ? "none" : "1px solid rgba(13,58,26,.08)",
    boxShadow: "0 1px 2px rgba(0,0,0,.06)",
    wordBreak: "break-word",
  });

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
                        onClick={() => { setSelectedGuruh(g); setGuruhOpen(false); setMessages([]); prevLenRef.current = 0; }}
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
            {isStaff
              ? "Avval guruhlar bo'limida guruh yarating."
              : "Siz hali biror guruhga qo'shilmagansiz."}
          </div>
        </div>
      )}

      {/* Messages */}
      {selectedGuruh && (
        <>
          <div
            ref={listRef}
            onScroll={handleScroll}
            style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 2, position: "relative" }}
          >
            {grouped.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 0", color: T.hint, fontSize: 13 }}>
                Hali xabar yo'q. Birinchi bo'lib yozing!
              </div>
            )}

            {grouped.map((group) => (
              <div key={group.sana}>
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
                      style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", alignItems: "flex-end", gap: 6, marginBottom: 6 }}
                    >
                      {/* Avatar */}
                      {!isMe && (
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: ROLE_COLOR[msg.userRole] ?? T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                          {msg.userIsmFamilya[0]?.toUpperCase()}
                        </div>
                      )}

                      <div style={{ maxWidth: "75%", minWidth: 60 }}>
                        {!isMe && (
                          <div style={{ fontSize: 10, fontWeight: 700, color: ROLE_COLOR[msg.userRole] ?? T.green, marginBottom: 2, paddingLeft: 2 }}>
                            {msg.userIsmFamilya} · {ROLE_LABEL[msg.userRole]}
                          </div>
                        )}

                        <div style={{ position: "relative" }} className="msg-wrap">
                          <div style={msgBubble(isMe)}>
                            {/* Reply preview */}
                            {msg.replyTo && (
                              <div style={{ borderLeft: `3px solid ${isMe ? "rgba(255,255,255,.4)" : T.green}`, paddingLeft: 8, marginBottom: 6, opacity: 0.8 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: isMe ? "rgba(255,255,255,.9)" : T.green }}>
                                  {msg.replyTo.userIsmFamilya}
                                </div>
                                <div style={{ fontSize: 11, color: isMe ? "rgba(255,255,255,.75)" : T.text2 }}>
                                  {truncate(msg.replyTo.matn, 50)}
                                </div>
                              </div>
                            )}

                            {msg.matn}
                            <span style={{ display: "inline-block", fontSize: 9, color: isMe ? "rgba(255,255,255,.5)" : T.hint, marginLeft: 6, verticalAlign: "bottom" }}>
                              {fmtVaqt(msg.vaqt)}
                            </span>
                          </div>

                          {/* Action buttons (reply + delete) */}
                          <div
                            className="msg-actions"
                            style={{ position: "absolute", top: -6, [isMe ? "left" : "right"]: -6, display: "flex", gap: 3, opacity: 0, transition: ".15s", pointerEvents: "none" }}
                          >
                            <button
                              onClick={() => { setReplyTo(msg); inputRef.current?.focus(); }}
                              style={{ background: "rgba(13,58,26,.85)", border: "none", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                              title="Javob berish"
                            >
                              <CornerUpLeft size={10} color="#fff" />
                            </button>
                            {canDelete && (
                              <button
                                onClick={() => void handleDelete(msg.id)}
                                style={{ background: "rgba(220,38,38,.9)", border: "none", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                                title="O'chirish"
                              >
                                <Trash2 size={9} color="#fff" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Typing indicator */}
            {typers.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0" }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`typing-dot d${i}`} style={{ width: 6, height: 6, borderRadius: "50%", background: T.hint }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: T.hint, fontStyle: "italic" }}>
                  {typers.join(", ")} yozmoqda…
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* New messages floating button */}
          {newMsgCount > 0 && !isAtBottom && (
            <button
              onClick={() => scrollToBottom()}
              style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", background: T.green, border: "none", borderRadius: 20, padding: "7px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(13,58,26,.3)", zIndex: 10 }}
            >
              <ArrowDown size={13} color="#fff" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
                {newMsgCount} yangi xabar
              </span>
            </button>
          )}

          {/* Reply preview */}
          {replyTo && (
            <div style={{ padding: "8px 14px", background: "rgba(13,58,26,.05)", borderTop: "1px solid rgba(13,58,26,.08)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <CornerUpLeft size={13} color={T.green} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.green }}>{replyTo.userIsmFamilya}</div>
                <div style={{ fontSize: 12, color: T.text2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{truncate(replyTo.matn, 60)}</div>
              </div>
              <button onClick={() => setReplyTo(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.hint, flexShrink: 0 }}>
                <X size={14} />
              </button>
            </div>
          )}

          {/* Emoji picker */}
          {emojiOpen && (
            <div style={{ padding: "10px 14px", background: "#fff", borderTop: "1px solid rgba(13,58,26,.08)", flexShrink: 0 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => insertEmoji(e)}
                    style={{ background: "none", border: "none", borderRadius: 8, width: 36, height: 36, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "8px 14px 12px", background: "#fff", borderTop: "1px solid rgba(13,58,26,.08)", flexShrink: 0, display: "flex", gap: 6, alignItems: "flex-end" }}>
            <button
              onClick={() => setEmojiOpen((o) => !o)}
              style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: emojiOpen ? "rgba(13,58,26,.1)" : "rgba(13,58,26,.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: emojiOpen ? T.green : T.hint, transition: "background .15s" }}
              title="Emoji"
            >
              <Smile size={16} />
            </button>

            <textarea
              ref={inputRef}
              value={matn}
              onChange={(e) => onTyping(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Xabar yozing…"
              rows={1}
              style={{ flex: 1, resize: "none", border: "1px solid rgba(13,58,26,.15)", borderRadius: 10, padding: "9px 12px", fontSize: 13, color: T.text, fontFamily: "inherit", outline: "none", lineHeight: 1.4, maxHeight: 100, overflowY: "auto", background: "rgba(13,58,26,.03)" }}
            />

            <button
              onClick={() => void handleSend()}
              disabled={!matn.trim() || sending}
              style={{ width: 38, height: 38, borderRadius: 10, border: "none", background: matn.trim() ? T.gLime : "rgba(13,58,26,.1)", cursor: matn.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .15s" }}
            >
              <Send size={15} color={matn.trim() ? T.onCta : T.hint} />
            </button>
          </div>
        </>
      )}

      <style>{`
        .msg-wrap:hover .msg-actions { opacity: 1 !important; pointer-events: auto !important; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }
        .typing-dot { animation: bounce 1.2s infinite; }
        .d1 { animation-delay: .15s; }
        .d2 { animation-delay: .3s; }
      `}</style>
    </div>
  );
}
