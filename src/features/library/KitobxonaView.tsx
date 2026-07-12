import { useState } from "react";
import { ChevronRight, X, FileText, BookMarked, List, BookCopy, Bookmark, CheckCircle, AArrowUp, AArrowDown } from "lucide-react";
import { T, AR } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { KITOBLAR, type Kitob, type KitobBob } from "../../content/kitoblar";

const TUR_LABEL: Record<string, string> = {
  darslik: "Darslik",
  lugat: "Lug'at",
  qoida: "Qoida",
  matn: "Matn",
};

const DARAJA_RANG: Record<string, string> = {
  A0: "#0891B2", A1: "#2563EB", A2: "#059669",
  B1: "#CA8A04", B2: "#DC2626", C1: "#7C3AED", C2: "#BE185D",
};

// ─── LocalStorage helpers ────────────────────────────────────────────────────
const readBobsKey = (uid: string) => `afp:kitob_read_${uid}`;
const bookmarksKey = (uid: string) => `afp:kitob_bookmarks_${uid}`;

function loadReadBobs(uid: string): Set<string> {
  try {
    const raw = localStorage.getItem(readBobsKey(uid));
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}
function saveReadBobs(uid: string, s: Set<string>) {
  try { localStorage.setItem(readBobsKey(uid), JSON.stringify([...s])); } catch { /* ignore */ }
}
function loadBookmarks(uid: string): Set<string> {
  try {
    const raw = localStorage.getItem(bookmarksKey(uid));
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}
function saveBookmarks(uid: string, s: Set<string>) {
  try { localStorage.setItem(bookmarksKey(uid), JSON.stringify([...s])); } catch { /* ignore */ }
}
function bobReadKey(kitobId: number, bobId: number) { return `${kitobId}_${bobId}`; }
function satirKey(kitobId: number, bobId: number, i: number) { return `${kitobId}_${bobId}_${i}`; }

// ─── KitobCard ───────────────────────────────────────────────────────────────
function KitobCard({ kitob, readCount, onClick }: { kitob: Kitob; readCount: number; onClick: () => void }) {
  const pct = kitob.boblar.length > 0 ? Math.round((readCount / kitob.boblar.length) * 100) : 0;
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff", borderRadius: 16, overflow: "hidden",
        border: readCount === kitob.boblar.length && readCount > 0
          ? `2px solid ${kitob.rang}60`
          : "1px solid rgba(13,58,26,.08)",
        boxShadow: "0 1px 4px rgba(13,58,26,.06)", cursor: "pointer",
        display: "flex", flexDirection: "column",
        transition: "transform .12s, box-shadow .12s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(13,58,26,.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(13,58,26,.06)"; }}
    >
      {/* Cover */}
      <div style={{
        background: `linear-gradient(135deg,${kitob.rang}22,${kitob.rang}44)`,
        height: 88, display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: `2px solid ${kitob.rang}25`, position: "relative",
      }}>
        <span style={{ fontSize: 36 }}>{kitob.icon}</span>
        <div style={{ position: "absolute", top: 8, right: 8, background: DARAJA_RANG[kitob.daraja] ?? kitob.rang, color: "#fff", borderRadius: 7, fontSize: 9, fontWeight: 700, padding: "2px 6px" }}>
          {kitob.daraja}
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,.8)", borderRadius: 7, fontSize: 9, fontWeight: 600, padding: "2px 7px", color: kitob.rang }}>
          {TUR_LABEL[kitob.tur]}
        </div>
        {readCount === kitob.boblar.length && readCount > 0 && (
          <div style={{ position: "absolute", bottom: 8, right: 8, background: T.lime, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={13} color={T.onCta} />
          </div>
        )}
      </div>

      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 3, lineHeight: 1.3 }}>{kitob.nomi}</div>
        <div style={{ fontSize: 10, color: T.hint, lineHeight: 1.4, flex: 1 }}>{kitob.tavsif}</div>

        {/* Progress */}
        {readCount > 0 && (
          <div style={{ marginTop: 6 }}>
            <div style={{ height: 4, background: "rgba(13,58,26,.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? T.lime : kitob.rang, borderRadius: 2, transition: "width .3s" }} />
            </div>
            <div style={{ fontSize: 9, color: T.hint, marginTop: 2 }}>{readCount}/{kitob.boblar.length} bob o'qildi</div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint, fontSize: 10 }}>
            <FileText size={10} />
            <span>{kitob.sahifalar} sahifa</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint, fontSize: 10 }}>
            <List size={10} />
            <span>{kitob.boblar.length} bob</span>
          </div>
          <ChevronRight size={14} color={T.hint} />
        </div>
      </div>
    </div>
  );
}

// ─── KitobReader ─────────────────────────────────────────────────────────────
function KitobReader({ kitob, onClose }: { kitob: Kitob; onClose: () => void }) {
  const { user } = useAuth();
  const uid = user?.id ?? "";

  const [activeBob, setActiveBob] = useState<KitobBob>(kitob.boblar[0]);
  const [showPanel, setShowPanel] = useState<"boblar" | "belgilanganlar" | null>(null);
  const [arSize, setArSize] = useState(22);
  const [readBobs, setReadBobs] = useState<Set<string>>(() => loadReadBobs(uid));
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => loadBookmarks(uid));

  const currentBobKey = bobReadKey(kitob.id, activeBob.id);
  const isRead = readBobs.has(currentBobKey);
  const readCount = kitob.boblar.filter((b) => readBobs.has(bobReadKey(kitob.id, b.id))).length;
  const bookmarkCount = [...bookmarks].filter((k) => k.startsWith(`${kitob.id}_`)).length;

  const markRead = () => {
    const next = new Set(readBobs);
    next.add(currentBobKey);
    setReadBobs(next);
    saveReadBobs(uid, next);
  };

  const toggleBookmark = (bobId: number, i: number) => {
    const key = satirKey(kitob.id, bobId, i);
    const next = new Set(bookmarks);
    if (next.has(key)) next.delete(key); else next.add(key);
    setBookmarks(next);
    saveBookmarks(uid, next);
  };

  const activeIdx = kitob.boblar.findIndex((b) => b.id === activeBob.id);
  const hasPrev = activeIdx > 0;
  const hasNext = activeIdx < kitob.boblar.length - 1;

  const goToBob = (bob: KitobBob) => {
    setActiveBob(bob);
    setShowPanel(null);
  };

  // Belgilanganlar — kitob bo'yicha barcha bookmarklar
  const allBookmarked = kitob.boblar.flatMap((bob) =>
    bob.matn.map((satir, i) => ({
      satir,
      bobNomi: bob.nomi,
      key: satirKey(kitob.id, bob.id, i),
      bob,
      idx: i,
    })).filter((item) => bookmarks.has(item.key))
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: T.meshLight, zIndex: 200, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: T.gGreen, padding: "14px 14px 12px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 10, padding: "7px 9px", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <X size={14} color="#fff" />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{kitob.nomi}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.65)" }}>{activeBob.nomi} · {readCount}/{kitob.boblar.length} bob</div>
            </div>
            {/* Font controls */}
            <button onClick={() => setArSize((s) => Math.max(16, s - 2))} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer" }}>
              <AArrowDown size={14} color="#fff" />
            </button>
            <button onClick={() => setArSize((s) => Math.min(34, s + 2))} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer" }}>
              <AArrowUp size={14} color="#fff" />
            </button>
            {/* Bookmark panel toggle */}
            <button
              onClick={() => setShowPanel((p) => p === "belgilanganlar" ? null : "belgilanganlar")}
              style={{ background: showPanel === "belgilanganlar" ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", position: "relative" }}
            >
              <Bookmark size={14} color="#fff" />
              {bookmarkCount > 0 && (
                <div style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: T.lime }} />
              )}
            </button>
            {/* Bob list toggle */}
            <button
              onClick={() => setShowPanel((p) => p === "boblar" ? null : "boblar")}
              style={{ background: showPanel === "boblar" ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.15)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer" }}
            >
              <BookMarked size={14} color="#fff" />
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 8, height: 3, background: "rgba(255,255,255,.2)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${kitob.boblar.length > 0 ? (readCount / kitob.boblar.length) * 100 : 0}%`, background: T.lime, borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>
      </div>

      {/* Boblar paneli */}
      {showPanel === "boblar" && (
        <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,58,26,.08)", padding: "10px 14px", flexShrink: 0, maxHeight: "45dvh", overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Boblar</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {kitob.boblar.map((bob) => {
              const isReadBob = readBobs.has(bobReadKey(kitob.id, bob.id));
              return (
                <button
                  key={bob.id}
                  onClick={() => goToBob(bob)}
                  style={{
                    background: activeBob.id === bob.id ? "rgba(13,58,26,.07)" : "transparent",
                    border: "none", borderRadius: 8, padding: "8px 10px",
                    textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                    fontSize: 12, fontWeight: activeBob.id === bob.id ? 700 : 500,
                    color: activeBob.id === bob.id ? T.green : T.text2,
                  }}
                >
                  {isReadBob
                    ? <CheckCircle size={13} color={T.lime} />
                    : <div style={{ width: 13, height: 13, borderRadius: "50%", border: "1.5px solid rgba(13,58,26,.2)" }} />
                  }
                  <span>{bob.nomi}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Belgilanganlar paneli */}
      {showPanel === "belgilanganlar" && (
        <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,58,26,.08)", padding: "10px 14px", flexShrink: 0, maxHeight: "45dvh", overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Belgilanganlar</div>
          {allBookmarked.length === 0 ? (
            <div style={{ fontSize: 12, color: T.hint, textAlign: "center", padding: "12px 0" }}>Hali belgilanmagan. Satir yonidagi 🔖 ni bosing.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {allBookmarked.map((item) => (
                <button
                  key={item.key}
                  onClick={() => { goToBob(item.bob); }}
                  style={{ background: `${kitob.rang}0a`, border: `1px solid ${kitob.rang}25`, borderRadius: 10, padding: "8px 10px", textAlign: "right", cursor: "pointer" }}
                >
                  <div style={{ fontSize: 9, color: T.hint, textAlign: "left", marginBottom: 3 }}>{item.bobNomi}</div>
                  <div style={{ fontFamily: AR, fontSize: 18, color: kitob.rang, lineHeight: 1.6 }}>{item.satir.arabcha}</div>
                  <div style={{ fontSize: 11, color: T.text2, textAlign: "left", marginTop: 3 }}>{item.satir.tarjima}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 32px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 14 }}>{activeBob.nomi}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activeBob.matn.map((satir, i) => {
            const bKey = satirKey(kitob.id, activeBob.id, i);
            const isBookmarked = bookmarks.has(bKey);
            return (
              <div
                key={i}
                style={{
                  background: "#fff", borderRadius: 14,
                  border: isBookmarked ? `1.5px solid ${kitob.rang}60` : "1px solid rgba(13,58,26,.08)",
                  boxShadow: "0 1px 4px rgba(13,58,26,.04)", overflow: "hidden",
                }}
              >
                {/* Arabcha */}
                <div style={{
                  background: `${kitob.rang}0f`, padding: "12px 16px", textAlign: "right",
                  borderBottom: `1px solid ${kitob.rang}20`, position: "relative",
                  display: "flex", alignItems: "flex-start", gap: 8,
                }}>
                  <button
                    onClick={() => toggleBookmark(activeBob.id, i)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", flexShrink: 0, marginTop: 4 }}
                    title={isBookmarked ? "Belgini olib tashlash" : "Belgilash"}
                  >
                    <Bookmark size={14} color={isBookmarked ? kitob.rang : "rgba(13,58,26,.25)"} fill={isBookmarked ? kitob.rang : "none"} />
                  </button>
                  <span style={{ flex: 1, fontFamily: AR, fontSize: arSize, color: kitob.rang, lineHeight: 1.7 }}>
                    {satir.arabcha}
                  </span>
                </div>
                {/* Transliteratsiya va tarjima */}
                <div style={{ padding: "9px 16px", display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ fontSize: 12, color: T.text2, fontStyle: "italic" }}>{satir.oqilishi}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.green }}>{satir.tarjima}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bob tugma + Navigatsiya */}
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* O'qidim button */}
          {!isRead ? (
            <button
              onClick={markRead}
              style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: T.gLime, color: T.onCta, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              <CheckCircle size={16} /> O'qib chiqdim
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", background: "rgba(13,58,26,.06)", borderRadius: 12 }}>
              <CheckCircle size={14} color={T.lime} />
              <span style={{ fontSize: 12, color: T.green, fontWeight: 600 }}>O'qildi</span>
            </div>
          )}

          {/* Oldingi / Keyingi */}
          <div style={{ display: "flex", gap: 8 }}>
            {hasPrev && (
              <button
                onClick={() => setActiveBob(kitob.boblar[activeIdx - 1])}
                style={{ flex: 1, padding: "11px", borderRadius: 12, border: "1px solid rgba(13,58,26,.15)", background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: T.text2 }}
              >
                ← Oldingi
              </button>
            )}
            {hasNext && (
              <button
                onClick={() => { if (!isRead) markRead(); setActiveBob(kitob.boblar[activeIdx + 1]); }}
                style={{ flex: 1, padding: "11px", borderRadius: 12, border: "none", background: T.gGreen, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700 }}
              >
                Keyingi →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── KitobxonaView ────────────────────────────────────────────────────────────
export function KitobxonaView() {
  const { user } = useAuth();
  const [activeTur, setActiveTur] = useState<string>("barchasi");
  const [activeKitob, setActiveKitob] = useState<Kitob | null>(null);
  const [readBobs, setReadBobs] = useState<Set<string>>(() => user ? loadReadBobs(user.id) : new Set());

  const turlar = [
    { id: "barchasi", label: "Barchasi", icon: <BookCopy size={12} /> },
    { id: "darslik", label: "Darslik", icon: "📗" },
    { id: "lugat", label: "Lug'at", icon: "📖" },
    { id: "qoida", label: "Qoida", icon: "📋" },
    { id: "matn", label: "Matn", icon: "📚" },
  ];

  const filtered = activeTur === "barchasi" ? KITOBLAR : KITOBLAR.filter((k) => k.tur === activeTur);

  const handleClose = () => {
    if (user) setReadBobs(loadReadBobs(user.id));
    setActiveKitob(null);
  };

  if (!user) return null;

  if (activeKitob) {
    return <KitobReader kitob={activeKitob} onClose={handleClose} />;
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Ta'lim</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Kitobxona</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            {KITOBLAR.length} ta kitob mavjud
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 14px 32px" }}>
        {/* Tur filtri */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4, scrollbarWidth: "none" }}>
          {turlar.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTur(t.id)}
              style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: 5,
                padding: "7px 14px", borderRadius: 20, border: "none",
                background: activeTur === t.id ? T.green : "rgba(13,58,26,.07)",
                color: activeTur === t.id ? "#fff" : T.text2,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "background .15s",
              }}
            >
              {typeof t.icon === "string" ? <span>{t.icon}</span> : t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Kitoblar grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map((kitob) => {
            const readCount = kitob.boblar.filter((b) => readBobs.has(bobReadKey(kitob.id, b.id))).length;
            return (
              <KitobCard key={kitob.id} kitob={kitob} readCount={readCount} onClick={() => setActiveKitob(kitob)} />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: T.hint }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Bu turda kitob yo'q</div>
          </div>
        )}
      </div>
    </div>
  );
}
