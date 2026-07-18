import { useState, type CSSProperties } from "react";
import { CheckCircle2 } from "lucide-react";
import { T, FONT, card, BtnP } from "../theme/tokens";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseMode } from "../lib/supabaseClient";

/*
 * Spec 03-bo'lim: "Birinchi kirish (Onboarding)" — profil to'liq bo'lmasa
 * ko'rsatiladi. Hozircha admin foydalanuvchini yaratayotganda ism va
 * (o'quvchi uchun) yo'nalishni majburiy so'raydi, shuning uchun bu ekran
 * kamdan-kam ko'rinadi — lekin qo'lda Supabase orqali qo'shilgan yoki
 * ma'lumoti to'liq bo'lmagan hisoblar uchun xavfsizlik to'ri vazifasini
 * bajaradi.
 */

export function needsOnboarding(user: { ism?: string; role: string; tur?: string } | null): boolean {
  if (!user) return false;
  if (!user.ism?.trim()) return true;
  if (user.role === "student" && !user.tur) return true;
  return false;
}

export function Onboarding() {
  const { user, updateProfile, patchUser } = useAuth();
  const navigate = useNavigate();
  const [ism, setIsm] = useState(user?.ism ?? "");
  const [familya, setFamilya] = useState(user?.familya ?? "");
  const [tur, setTur] = useState<"fonetika" | "grammatika" | "">(user?.tur ?? "");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const inp: CSSProperties = {
    width: "100%",
    border: "1px solid rgba(13,58,26,.15)",
    borderRadius: 9,
    padding: "10px 12px",
    fontSize: 13,
    color: T.green,
    outline: "none",
    boxSizing: "border-box",
    background: "rgba(13,58,26,.03)",
    fontFamily: FONT,
  };

  const save = async () => {
    if (!ism.trim()) { setErr("Ism majburiy"); return; }
    if (user.role === "student" && !tur) { setErr("Yo'nalishni tanlang"); return; }
    setBusy(true);
    setErr("");
    try {
      const res = await updateProfile({ ism: ism.trim(), familya: familya.trim(), tel: user.tel, tugilgan: user.tugilgan });
      if (!res.ok) { setErr(res.error ?? "Xatolik"); return; }
      if (user.role === "student" && tur && tur !== user.tur) {
        if (isSupabaseMode && supabase) {
          await supabase.from("profiles").update({ tur }).eq("id", user.id);
        } else {
          await patchUser(user.id, { tur });
        }
      }
      navigate("/", { replace: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ ...card(), width: 420, maxWidth: "100%", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <CheckCircle2 size={22} color={T.lime} />
          <div style={{ fontSize: 17, fontWeight: 700, color: T.green }}>Profilni to'ldiring</div>
        </div>
        <div style={{ fontSize: 12, color: T.hint, marginBottom: 18 }}>
          Davom etishdan oldin quyidagi ma'lumotlarni to'ldiring.
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, color: T.hint, display: "block", marginBottom: 4 }}>Ism *</label>
          <input value={ism} onChange={(e) => { setIsm(e.target.value); setErr(""); }} style={inp} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, color: T.hint, display: "block", marginBottom: 4 }}>Familiya</label>
          <input value={familya} onChange={(e) => setFamilya(e.target.value)} style={inp} />
        </div>

        {user.role === "student" && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: T.hint, display: "block", marginBottom: 6 }}>Yo'nalish *</label>
            <div style={{ display: "flex", gap: 8 }}>
              {(["fonetika", "grammatika"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTur(t)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 9,
                    border: tur === t ? `1.5px solid ${T.lime}` : "1px solid rgba(13,58,26,.15)",
                    background: tur === t ? "rgba(46,184,46,.1)" : "rgba(13,58,26,.03)",
                    color: T.green,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {err && <div style={{ fontSize: 12, color: T.red, marginBottom: 12 }}>{err}</div>}

        <button onClick={save} disabled={busy} style={{ ...BtnP, width: "100%", justifyContent: "center", opacity: busy ? 0.7 : 1 }}>
          {busy ? "Saqlanmoqda…" : "Davom etish"}
        </button>
      </div>
    </div>
  );
}
