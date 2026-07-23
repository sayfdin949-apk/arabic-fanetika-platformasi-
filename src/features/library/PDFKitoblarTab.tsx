import { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Trash2, X, ExternalLink, FileText, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { pdfApi, type PdfKitob } from "./pdfKitoblar";

// ── helpers ────────────────────────────────────────────────────────────────────
const RANGLAR = ["#2563EB", "#059669", "#7C3AED", "#EA580C", "#0891B2", "#DC2626", "#CA8A04", "#BE185D"];
const DARAJALAR = ["A0", "A1", "A2", "B1", "B2", "C1", "C2", "Barchasi"] as const;
const TURLAR: { id: PdfKitob["tur"]; label: string }[] = [
  { id: "darslik", label: "Darslik" },
  { id: "lugat", label: "Lug'at" },
  { id: "qoida", label: "Qoida" },
  { id: "matn", label: "Matn" },
];
const DARAJA_RANG: Record<string, string> = {
  A0: "#0891B2", A1: "#2563EB", A2: "#059669",
  B1: "#CA8A04", B2: "#DC2626", C1: "#7C3AED", C2: "#BE185D", Barchasi: "#5A8060",
};
function fmtKb(kb: number) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}
function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleDateString("uz-UZ", { year: "numeric", month: "short", day: "numeric" }); }
  catch { return ""; }
}

// ── PDF Viewer ─────────────────────────────────────────────────────────────────
function PDFViewer({ kitob, onClose }: { kitob: PdfKitob; onClose: () => void }) {
  const isMobile = window.innerWidth < 640;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#1a1a1a", zIndex: 300, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: T.gGreen, padding: "12px 14px", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onClose}
          style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <X size={15} color="#fff" />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{kitob.nomi}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>{fmtKb(kitob.hajm_kb)} · PDF</div>
        </div>
        <a
          href={kitob.url}
          target="_blank"
          rel="noreferrer"
          style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 600 }}
        >
          <ExternalLink size={13} />
          {isMobile ? "" : "Tashqariga"}
        </a>
      </div>

      {/* Viewer */}
      {isMobile ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24 }}>
          <div style={{ fontSize: 56 }}>{kitob.icon}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", textAlign: "center" }}>{kitob.nomi}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", textAlign: "center" }}>
            Mobil qurilmada PDF ni ko'rish uchun quyidagi tugmani bosing
          </div>
          <a
            href={kitob.url}
            target="_blank"
            rel="noreferrer"
            style={{ background: T.gLime, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700, color: T.onCta, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
          >
            <ExternalLink size={16} /> PDF ni ochish
          </a>
        </div>
      ) : (
        <iframe
          src={kitob.url}
          style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
          title={kitob.nomi}
        />
      )}
    </div>
  );
}

// ── Upload Form ────────────────────────────────────────────────────────────────
function UploadForm({ onDone }: { onDone: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [nomi, setNomi] = useState("");
  const [tavsif, setTavsif] = useState("");
  const [rang, setRang] = useState(RANGLAR[0]);
  const [icon, setIcon] = useState("📗");
  const [daraja, setDaraja] = useState<PdfKitob["daraja"]>("A1");
  const [tur, setTur] = useState<PdfKitob["tur"]>("darslik");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);

  const onFile = (f: File) => {
    if (f.type !== "application/pdf") { setErr("Faqat PDF format qabul qilinadi"); return; }
    if (f.size > 100 * 1024 * 1024) { setErr("Fayl hajmi 100 MB dan oshmasin"); return; }
    setFile(f);
    if (!nomi) setNomi(f.name.replace(/\.pdf$/i, ""));
    setErr("");
  };

  const upload = async () => {
    if (!file) { setErr("PDF fayl tanlang"); return; }
    if (!nomi.trim()) { setErr("Kitob nomini kiriting"); return; }
    setLoading(true);
    setErr("");
    const res = await pdfApi.upload(file, { nomi: nomi.trim(), tavsif: tavsif.trim(), rang, icon, daraja, tur });
    setLoading(false);
    if (!res.ok) { setErr(res.error ?? "Xatolik yuz berdi"); return; }
    onDone();
  };

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.12)", overflow: "hidden", marginBottom: 20 }}>
      {/* Toggle header */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}
      >
        <div style={{ width: 34, height: 34, borderRadius: 10, background: T.gLime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Upload size={16} color={T.onCta} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Yangi PDF kitob yuklash</div>
          <div style={{ fontSize: 11, color: T.hint }}>Faqat CEO yuklay oladi</div>
        </div>
        <ChevronDown size={16} color={T.hint} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>

      {open && (
        <div style={{ padding: "0 16px 18px", borderTop: "1px solid rgba(13,58,26,.07)" }}>
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }}
            onClick={() => fileRef.current?.click()}
            style={{
              marginTop: 14,
              border: `2px dashed ${drag ? T.lime : file ? "#2563EB" : "rgba(13,58,26,.18)"}`,
              borderRadius: 12,
              padding: "20px 16px",
              textAlign: "center",
              cursor: "pointer",
              background: drag ? "rgba(46,184,46,.05)" : file ? "rgba(37,99,235,.05)" : "rgba(13,58,26,.02)",
              transition: "all .15s",
            }}
          >
            <input ref={fileRef} type="file" accept="application/pdf" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
            {file ? (
              <>
                <div style={{ fontSize: 26, marginBottom: 4 }}>📄</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#2563EB" }}>{file.name}</div>
                <div style={{ fontSize: 11, color: T.hint }}>{fmtKb(Math.round(file.size / 1024))}</div>
              </>
            ) : (
              <>
                <FileText size={24} color={T.hint} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: T.green }}>PDF faylni shu yerga tashlang</div>
                <div style={{ fontSize: 11, color: T.hint, marginTop: 2 }}>yoki bosib tanlang · Max 100 MB</div>
              </>
            )}
          </div>

          {/* Fields */}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: T.hint, marginBottom: 4, display: "block" }}>Kitob nomi *</label>
              <input
                value={nomi}
                onChange={(e) => setNomi(e.target.value)}
                placeholder="Masalan: Arabcha-o'zbek lug'at"
                style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid rgba(13,58,26,.18)", fontSize: 13, outline: "none", color: T.green }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: T.hint, marginBottom: 4, display: "block" }}>Tavsif</label>
              <textarea
                value={tavsif}
                onChange={(e) => setTavsif(e.target.value)}
                placeholder="Kitob haqida qisqacha..."
                rows={2}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid rgba(13,58,26,.18)", fontSize: 13, outline: "none", resize: "vertical", color: T.green }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: T.hint, marginBottom: 4, display: "block" }}>Daraja</label>
                <select value={daraja} onChange={(e) => setDaraja(e.target.value as PdfKitob["daraja"])} style={{ width: "100%", padding: "8px 10px", borderRadius: 9, border: "1px solid rgba(13,58,26,.18)", fontSize: 12, color: T.green, outline: "none" }}>
                  {DARAJALAR.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: T.hint, marginBottom: 4, display: "block" }}>Tur</label>
                <select value={tur} onChange={(e) => setTur(e.target.value as PdfKitob["tur"])} style={{ width: "100%", padding: "8px 10px", borderRadius: 9, border: "1px solid rgba(13,58,26,.18)", fontSize: 12, color: T.green, outline: "none" }}>
                  {TURLAR.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: T.hint, marginBottom: 4, display: "block" }}>Icon (emoji)</label>
                <input value={icon} onChange={(e) => setIcon(e.target.value)} maxLength={2} style={{ width: "100%", padding: "8px 10px", borderRadius: 9, border: "1px solid rgba(13,58,26,.18)", fontSize: 18, textAlign: "center", outline: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: T.hint, marginBottom: 6, display: "block" }}>Rang</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {RANGLAR.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRang(r)}
                    style={{ width: 28, height: 28, borderRadius: 8, background: r, border: rang === r ? "3px solid rgba(13,58,26,.8)" : "2px solid rgba(255,255,255,.5)", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {err && (
            <div style={{ marginTop: 10, background: "rgba(220,38,38,.06)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#DC2626", display: "flex", gap: 6, alignItems: "center" }}>
              <AlertCircle size={13} /> {err}
            </div>
          )}

          <button
            onClick={upload}
            disabled={loading}
            style={{ marginTop: 14, width: "100%", padding: "12px", borderRadius: 11, border: "none", background: loading ? "rgba(13,58,26,.15)" : T.gLime, color: loading ? T.hint : T.onCta, fontSize: 13, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
          >
            {loading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Yuklanmoqda...</> : <><Upload size={15} /> Yuklash</>}
          </button>
        </div>
      )}

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ── PDF Card ───────────────────────────────────────────────────────────────────
function PdfCard({ kitob, isCeo, onOpen, onDelete }: { kitob: PdfKitob; isCeo: boolean; onOpen: () => void; onDelete: () => void }) {
  const [delConfirm, setDelConfirm] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(13,58,26,.08)", boxShadow: "0 1px 4px rgba(13,58,26,.06)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Cover */}
      <div
        onClick={onOpen}
        style={{ background: `linear-gradient(135deg,${kitob.rang}22,${kitob.rang}44)`, height: 88, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `2px solid ${kitob.rang}30`, cursor: "pointer", position: "relative" }}
      >
        <span style={{ fontSize: 36 }}>{kitob.icon}</span>
        <div style={{ position: "absolute", top: 8, right: 8, background: DARAJA_RANG[kitob.daraja] ?? kitob.rang, color: "#fff", borderRadius: 7, fontSize: 9, fontWeight: 700, padding: "2px 6px" }}>
          {kitob.daraja}
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,.82)", borderRadius: 7, fontSize: 9, fontWeight: 600, padding: "2px 7px", color: kitob.rang }}>
          PDF
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.green, lineHeight: 1.3, marginBottom: 3 }}>{kitob.nomi}</div>
        {kitob.tavsif && <div style={{ fontSize: 10, color: T.hint, lineHeight: 1.4, flex: 1 }}>{kitob.tavsif}</div>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ fontSize: 10, color: T.hint }}>{fmtKb(kitob.hajm_kb)}</div>
          <div style={{ fontSize: 10, color: T.hint }}>{fmtDate(kitob.qoshilgan)}</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ borderTop: "1px solid rgba(13,58,26,.06)", padding: "8px 10px", display: "flex", gap: 6 }}>
        <button
          onClick={onOpen}
          style={{ flex: 1, padding: "8px", borderRadius: 9, border: "none", background: kitob.rang, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
        >
          Ko'rish
        </button>
        {isCeo && (
          delConfirm ? (
            <>
              <button onClick={onDelete} style={{ padding: "8px 10px", borderRadius: 9, border: "none", background: "#EF4444", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>O'chirish</button>
              <button onClick={() => setDelConfirm(false)} style={{ padding: "8px 10px", borderRadius: 9, border: "1px solid rgba(13,58,26,.15)", background: "#fff", color: T.hint, fontSize: 11, cursor: "pointer" }}>Bekor</button>
            </>
          ) : (
            <button onClick={() => setDelConfirm(true)} style={{ padding: "8px 10px", borderRadius: 9, border: "1px solid rgba(220,38,38,.2)", background: "rgba(220,38,38,.05)", color: "#DC2626", cursor: "pointer" }}>
              <Trash2 size={13} />
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Main Tab ───────────────────────────────────────────────────────────────────
export function PDFKitoblarTab() {
  const { user } = useAuth();
  const isCeo = user?.role === "ceo";
  const [kitoblar, setKitoblar] = useState<PdfKitob[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewer, setViewer] = useState<PdfKitob | null>(null);
  const [activeTur, setActiveTur] = useState<PdfKitob["tur"] | "barchasi">("barchasi");

  const load = useCallback(async () => {
    setLoading(true);
    const list = await pdfApi.list();
    setKitoblar(list);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (kitob: PdfKitob) => {
    await pdfApi.remove(kitob);
    await load();
  };

  if (!pdfApi.available) {
    return (
      <div style={{ padding: "48px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>☁️</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 6 }}>Supabase kerak</div>
        <div style={{ fontSize: 12, color: T.hint, maxWidth: 280, margin: "0 auto", lineHeight: 1.6 }}>
          PDF kitoblarni yuklash uchun Supabase ulanishi kerak. Iltimos, VITE_SUPABASE_URL va VITE_SUPABASE_ANON_KEY ni sozlang.
        </div>
      </div>
    );
  }

  const filtered = activeTur === "barchasi" ? kitoblar : kitoblar.filter((k) => k.tur === activeTur);

  return (
    <>
      {viewer && <PDFViewer kitob={viewer} onClose={() => setViewer(null)} />}

      <div style={{ padding: "14px 14px 32px" }}>
        {isCeo && <UploadForm onDone={load} />}

        {/* Tur filter */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4, scrollbarWidth: "none" }}>
          {[{ id: "barchasi" as const, label: "Barchasi" }, ...TURLAR].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTur(t.id as PdfKitob["tur"] | "barchasi")}
              style={{
                flexShrink: 0, padding: "7px 14px", borderRadius: 20, border: "none",
                background: activeTur === t.id ? T.green : "rgba(13,58,26,.07)",
                color: activeTur === t.id ? "#fff" : T.text2,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: T.hint }}>
            <Loader2 size={28} style={{ animation: "spin 1s linear infinite", marginBottom: 8 }} />
            <div style={{ fontSize: 13 }}>Yuklanmoqda...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: T.hint }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{isCeo ? "Hali PDF kitob yo'q — yuqoridan yuklang" : "Hali PDF kitob qo'shilmagan"}</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {filtered.map((k) => (
              <PdfCard key={k.id} kitob={k} isCeo={isCeo} onOpen={() => setViewer(k)} onDelete={() => handleDelete(k)} />
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
