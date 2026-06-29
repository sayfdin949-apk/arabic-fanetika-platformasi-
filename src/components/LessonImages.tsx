import { useRef, useState } from "react";
import { ImagePlus, X, ZoomIn } from "lucide-react";
import { T } from "../theme/tokens";
import { useLessonImages } from "../lib/lessonImages";

interface Props {
  type: "nazariy" | "amaliy";
  id: number;
  isTeacher: boolean;
}

export function LessonImages({ type, id, isTeacher }: Props) {
  const { images, add, remove } = useLessonImages(type, id);
  const fileRef = useRef<HTMLInputElement>(null);
  const [zoomed, setZoomed] = useState<string | null>(null);

  if (!isTeacher && images.length === 0) return null;

  return (
    <>
      {/* Lightbox */}
      {zoomed && (
        <div
          onClick={() => setZoomed(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 16,
          }}
        >
          <button
            onClick={() => setZoomed(null)}
            style={{ position: "absolute", top: "max(16px, env(safe-area-inset-top, 16px))", right: 16, background: "rgba(255,255,255,.15)", border: "none", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
          >
            <X size={18} />
          </button>
          <img
            src={zoomed}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "85dvh", borderRadius: 12, objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 4, height: 16, borderRadius: 2, background: T.gLime }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.green }}>Rasmlar</span>
            {images.length > 0 && (
              <span style={{ fontSize: 11, color: T.hint, background: "rgba(13,58,26,.07)", borderRadius: 20, padding: "2px 7px" }}>{images.length}</span>
            )}
          </div>
          {isTeacher && (
            <>
              <button
                onClick={() => fileRef.current?.click()}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: T.gLime, color: T.onCta,
                  border: "none", borderRadius: 9, padding: "7px 12px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(46,184,46,.3)",
                }}
              >
                <ImagePlus size={14} /> Rasm qo'shish
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && add(e.target.files)}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        {/* Image grid */}
        {images.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {images.map((src, i) => (
              <div key={i} style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", background: "rgba(13,58,26,.05)" }}>
                <img
                  src={src}
                  alt={`rasm ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "pointer" }}
                  onClick={() => setZoomed(src)}
                />
                {/* Zoom hint */}
                <div style={{ position: "absolute", bottom: 6, left: 6, background: "rgba(0,0,0,.45)", borderRadius: 6, padding: "3px 7px", display: "flex", alignItems: "center", gap: 4, pointerEvents: "none" }}>
                  <ZoomIn size={11} color="#fff" />
                  <span style={{ fontSize: 10, color: "#fff" }}>{i + 1}</span>
                </div>
                {/* Delete button (teacher only) */}
                {isTeacher && (
                  <button
                    onClick={() => remove(i)}
                    style={{
                      position: "absolute", top: 6, right: 6,
                      background: "rgba(230,0,35,.85)", border: "none",
                      borderRadius: "50%", width: 26, height: 26,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", color: "#fff",
                    }}
                    aria-label="O'chirish"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state for teacher */}
        {isTeacher && images.length === 0 && (
          <button
            onClick={() => fileRef.current?.click()}
            style={{
              width: "100%", border: "2px dashed rgba(13,58,26,.15)",
              borderRadius: 12, padding: "20px",
              background: "rgba(13,58,26,.02)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              cursor: "pointer",
            }}
          >
            <ImagePlus size={24} color="rgba(13,58,26,.3)" />
            <span style={{ fontSize: 13, color: T.hint }}>Rasmlarni bu yerga yuklang</span>
          </button>
        )}
      </div>
    </>
  );
}
