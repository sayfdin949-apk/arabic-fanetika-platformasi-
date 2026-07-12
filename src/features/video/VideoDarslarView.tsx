import { useState, useMemo } from "react";
import { Play, Clock, Eye, BookOpen, Search, X } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { VIDEO_DARSLAR, VIDEO_TOIFALAR, type VideoDars } from "../../content/videoDarslar";

function getEmbedUrl(url: string): string {
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0`;
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0`;
  if (url.includes("youtube.com/embed/")) return url;
  return url;
}

const watchedKey = (uid: string) => `afp:video_watched_${uid}`;

function loadWatched(uid: string): Set<number> {
  try {
    const raw = localStorage.getItem(watchedKey(uid));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveWatched(uid: string, set: Set<number>) {
  try { localStorage.setItem(watchedKey(uid), JSON.stringify([...set])); } catch { /* ignore */ }
}

function VideoCard({
  dars,
  watched,
  onPlay,
}: {
  dars: VideoDars;
  watched: boolean;
  onPlay: (d: VideoDars) => void;
}) {
  return (
    <div
      onClick={() => onPlay(dars)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: watched ? `1.5px solid ${dars.rang}50` : "1px solid rgba(13,58,26,.08)",
        boxShadow: "0 1px 4px rgba(13,58,26,.06)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform .12s, box-shadow .12s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(13,58,26,.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(13,58,26,.06)"; }}
    >
      {/* Thumbnail */}
      <div style={{
        background: `linear-gradient(135deg,${dars.rang}22,${dars.rang}44)`,
        height: 96, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", borderBottom: `2px solid ${dars.rang}30`,
      }}>
        <span style={{ fontSize: 38, fontFamily: dars.thumbnail.length === 1 && dars.thumbnail.charCodeAt(0) > 255 ? '"Sakkal Majalla","Traditional Arabic",serif' : "inherit" }}>
          {dars.thumbnail}
        </span>
        {/* Play overlay */}
        <div style={{
          position: "absolute", bottom: 8, right: 8,
          background: dars.rang, borderRadius: "50%",
          width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 2px 6px ${dars.rang}60`,
        }}>
          <Play size={12} color="#fff" fill="#fff" />
        </div>
        {/* Watched badge */}
        {watched && (
          <div style={{
            position: "absolute", top: 8, left: 8,
            background: T.lime, color: T.onCta, borderRadius: 8,
            fontSize: 9, fontWeight: 700, padding: "2px 7px",
          }}>
            ✓ Ko'rildi
          </div>
        )}
        {/* Daraja badge */}
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: `${dars.rang}dd`, color: "#fff", borderRadius: 8,
          fontSize: 9, fontWeight: 700, padding: "2px 7px",
        }}>
          {dars.daraja}
        </div>
      </div>

      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 3, lineHeight: 1.3 }}>
          {dars.sarlavha}
        </div>
        <div style={{ fontSize: 10, color: T.hint, marginBottom: 8, lineHeight: 1.4 }}>
          {dars.tavsif}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint }}>
            <Clock size={10} />
            <span style={{ fontSize: 10 }}>{dars.davomiylik}</span>
          </div>
          {dars.korinishlar !== undefined && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.hint }}>
              <Eye size={10} />
              <span style={{ fontSize: 10 }}>{dars.korinishlar}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoModal({
  dars,
  onClose,
  onWatched,
}: {
  dars: VideoDars;
  onClose: () => void;
  onWatched: (id: number) => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.72)",
        zIndex: 200, display: "flex", alignItems: "flex-end",
        animation: "fadeIn .18s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", background: "#fff", borderRadius: "20px 20px 0 0",
          padding: "20px 20px 36px", maxHeight: "82dvh", overflowY: "auto",
        }}
      >
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: "rgba(13,58,26,.15)", borderRadius: 2, margin: "0 auto 16px" }} />

        {/* Video player */}
        {dars.videoUrl ? (
          <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 16, background: "#000", position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={getEmbedUrl(dars.videoUrl)}
              title={dars.sarlavha}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{
            background: `linear-gradient(135deg,${dars.rang}33,${dars.rang}66)`,
            borderRadius: 14, height: 180, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16,
            border: `2px solid ${dars.rang}40`,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: dars.rang, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 16px ${dars.rang}60`,
            }}>
              <Play size={22} color="#fff" fill="#fff" />
            </div>
            <div style={{ fontSize: 12, color: `${dars.rang}cc`, fontWeight: 600 }}>
              Tez orada qo'shiladi
            </div>
          </div>
        )}

        {/* Info */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.green, marginBottom: 4 }}>{dars.sarlavha}</div>
            <div style={{ fontSize: 12, color: T.hint, lineHeight: 1.5 }}>{dars.tavsif}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(13,58,26,.07)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <X size={14} color={T.hint} />
          </button>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          {[
            { icon: <Clock size={12} />, label: dars.davomiylik },
            { icon: <BookOpen size={12} />, label: dars.mavzu },
            { icon: <span style={{ fontSize: 11, fontWeight: 700, color: dars.rang }}>{dars.daraja}</span>, label: "daraja" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(13,58,26,.06)", borderRadius: 8, padding: "5px 10px", color: T.hint, fontSize: 11 }}>
              {m.icon}
              <span>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Ko'rildi tugma */}
        <button
          onClick={() => { onWatched(dars.id); onClose(); }}
          style={{
            width: "100%", padding: "13px", borderRadius: 12, border: "none",
            background: T.gLime, color: T.onCta, fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}
        >
          ✓ Ko'rib chiqdim
        </button>
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}

export function VideoDarslarView() {
  const { user } = useAuth();
  const [toifa, setToifa] = useState("barchasi");
  const [qidiruv, setQidiruv] = useState("");
  const [watched, setWatched] = useState<Set<number>>(() => user ? loadWatched(user.id) : new Set());
  const [active, setActive] = useState<VideoDars | null>(null);

  const filtered = useMemo(() => {
    let list = VIDEO_DARSLAR;
    if (toifa !== "barchasi") list = list.filter((d) => d.daraja === toifa);
    if (qidiruv.trim()) {
      const q = qidiruv.toLowerCase();
      list = list.filter((d) =>
        d.sarlavha.toLowerCase().includes(q) ||
        d.mavzu.toLowerCase().includes(q) ||
        d.tavsif.toLowerCase().includes(q)
      );
    }
    return list;
  }, [toifa, qidiruv]);

  const handleWatched = (id: number) => {
    if (!user) return;
    const updated = new Set(watched);
    updated.add(id);
    setWatched(updated);
    saveWatched(user.id, updated);
  };

  const watchedCount = watched.size;
  const total = VIDEO_DARSLAR.length;

  if (!user) return null;

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Ta'lim</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Video darslar</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            {watchedCount}/{total} ta dars ko'rildi
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 10, height: 4, background: "rgba(255,255,255,.2)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${total > 0 ? (watchedCount / total) * 100 : 0}%`, background: T.gLime, borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 14px 32px" }}>
        {/* Qidiruv */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <Search size={14} color={T.hint} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input
            value={qidiruv}
            onChange={(e) => setQidiruv(e.target.value)}
            placeholder="Dars qidirish…"
            style={{
              width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 34px",
              borderRadius: 12, border: "1px solid rgba(13,58,26,.12)", background: "#fff",
              fontSize: 13, color: T.text, outline: "none",
            }}
          />
          {qidiruv && (
            <button onClick={() => setQidiruv("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <X size={14} color={T.hint} />
            </button>
          )}
        </div>

        {/* Toifa filtri */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4, scrollbarWidth: "none" }}>
          {VIDEO_TOIFALAR.map((t) => (
            <button
              key={t.id}
              onClick={() => setToifa(t.id)}
              style={{
                flexShrink: 0, padding: "7px 14px", borderRadius: 20, border: "none",
                background: toifa === t.id ? t.rang : "rgba(13,58,26,.07)",
                color: toifa === t.id ? "#fff" : T.text2,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "background .15s",
              }}
            >
              {t.icon} {t.nomi}
            </button>
          ))}
        </div>

        {/* Natija soni */}
        {qidiruv && (
          <div style={{ fontSize: 12, color: T.hint, marginBottom: 12 }}>
            {filtered.length} ta natija topildi
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: T.hint }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Hech narsa topilmadi</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {filtered.map((d) => (
              <VideoCard
                key={d.id}
                dars={d}
                watched={watched.has(d.id)}
                onPlay={setActive}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {active && (
        <VideoModal
          dars={active}
          onClose={() => setActive(null)}
          onWatched={handleWatched}
        />
      )}
    </div>
  );
}
