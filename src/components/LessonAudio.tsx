import { useRef } from "react";
import { Mic, X, Music } from "lucide-react";
import { T } from "../theme/tokens";
import { useLessonAudio } from "../lib/lessonAudio";

interface Props {
  type: "nazariy" | "amaliy";
  id: number;
  isTeacher: boolean;
}

export function LessonAudio({ type, id, isTeacher }: Props) {
  const { tracks, add, remove } = useLessonAudio(type, id);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isTeacher && tracks.length === 0) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>Audio</span>
          {tracks.length > 0 && (
            <span style={{ fontSize: 11, color: T.hint, background: "rgba(13,58,26,.07)", borderRadius: 20, padding: "2px 7px" }}>
              {tracks.length}
            </span>
          )}
        </div>
        {isTeacher && (
          <>
            <button
              onClick={() => fileRef.current?.click()}
              style={{ display: "flex", alignItems: "center", gap: 6, background: T.gLime, color: T.onCta, border: "none", borderRadius: 9, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(46,184,46,.3)" }}
            >
              <Mic size={14} /> Audio qo'shish
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="audio/*"
              multiple
              onChange={(e) => e.target.files && add(e.target.files)}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>

      {tracks.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tracks.map((tr, i) => (
            <div
              key={i}
              style={{ background: "rgba(13,58,26,.04)", border: "1px solid rgba(13,58,26,.1)", borderRadius: 12, padding: "10px 12px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Music size={14} color={T.green} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: T.text2, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {tr.name}
                </span>
                {isTeacher && (
                  <button
                    onClick={() => remove(i)}
                    style={{ background: "rgba(230,0,35,.1)", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.red, flexShrink: 0 }}
                    aria-label="O'chirish"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              <audio controls src={tr.src} style={{ width: "100%", height: 36 }} />
            </div>
          ))}
        </div>
      )}

      {isTeacher && tracks.length === 0 && (
        <button
          onClick={() => fileRef.current?.click()}
          style={{ width: "100%", border: "2px dashed rgba(13,58,26,.15)", borderRadius: 12, padding: "20px", background: "rgba(13,58,26,.02)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <Mic size={24} color="rgba(13,58,26,.3)" />
          <span style={{ fontSize: 13, color: T.hint }}>Audio fayllarni bu yerga yuklang (maks 3MB)</span>
        </button>
      )}
    </div>
  );
}
