import { useState } from "react";
import { Lock, Eye, EyeOff, RefreshCw, Flame, Mic, Video, BookOpen, Trophy, Coins } from "lucide-react";
import { T } from "../../theme/tokens";
import { useAuth } from "../../auth/AuthContext";
import { useProgress } from "../progress/ProgressContext";
import { NAZARIY } from "../../content/nazariy";
import { AMALIY } from "../../content/amaliy";
import { MOCK_TESTLAR } from "../../content/mockTestlar";

const PIN_KEY = (uid: string) => `afp:ota_ona_pin_${uid}`;
const DEFAULT_PIN = "1234";

interface MockNatija {
  testId: number;
  ball: number;
  sana: string;
}

function loadPin(uid: string): string {
  try { return localStorage.getItem(PIN_KEY(uid)) ?? DEFAULT_PIN; } catch { return DEFAULT_PIN; }
}

function savePin(uid: string, pin: string) {
  try { localStorage.setItem(PIN_KEY(uid), pin); } catch { /* ignore */ }
}

function loadVoiceDone(uid: string): number {
  try {
    const raw = localStorage.getItem(`afp:voice_done_${uid}`);
    return raw ? (JSON.parse(raw) as number[]).length : 0;
  } catch { return 0; }
}

function loadVideoWatched(uid: string): number {
  try {
    const raw = localStorage.getItem(`afp:video_watched_${uid}`);
    return raw ? (JSON.parse(raw) as number[]).length : 0;
  } catch { return 0; }
}

function loadMockResults(uid: string): MockNatija[] {
  try {
    const raw = localStorage.getItem(`afp:mock_results_${uid}`);
    return raw ? Object.values(JSON.parse(raw)) : [];
  } catch { return []; }
}

function loadGramDone(uid: string): number {
  try {
    const raw = localStorage.getItem(`afp:gram_done_${uid}`);
    return raw ? Object.keys(JSON.parse(raw)).length : 0;
  } catch { return 0; }
}

function loadCoins(uid: string): number {
  try {
    const raw = localStorage.getItem(`afp:coins_${uid}`);
    return raw ? parseInt(raw, 10) : 0;
  } catch { return 0; }
}

function PinInput({ onUnlock }: { onUnlock: () => void }) {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleDigit = (d: string) => {
    if (input.length >= 4) return;
    const next = input + d;
    setInput(next);
    setError(false);
    if (next.length === 4) {
      const pin = user ? loadPin(user.id) : DEFAULT_PIN;
      if (next === pin) {
        setTimeout(onUnlock, 150);
      } else {
        setTimeout(() => { setInput(""); setError(true); }, 400);
      }
    }
  };

  const handleDel = () => { setInput((v) => v.slice(0, -1)); setError(false); };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 320 }}>
        {/* Icon */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, background: T.gGreen, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(13,58,26,.25)" }}>
            <Lock size={32} color="#fff" />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.green, marginTop: 14 }}>Ota-ona paneli</div>
          <div style={{ fontSize: 13, color: T.hint, marginTop: 4 }}>PIN kodni kiriting</div>
          <div style={{ fontSize: 11, color: T.hint, marginTop: 2 }}>Standart PIN: 1234</div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 28 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 18, height: 18, borderRadius: "50%",
                background: error ? "#DC2626" : (i < input.length ? T.green : "rgba(13,58,26,.15)"),
                transition: "background .2s",
              }}
            />
          ))}
        </div>

        {/* Digits */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 10 }}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              style={{ padding: "16px 0", borderRadius: 14, border: "none", background: "#fff", fontSize: 22, fontWeight: 700, color: T.green, cursor: "pointer", boxShadow: "0 1px 4px rgba(13,58,26,.1)" }}
            >
              {d}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          <button
            onClick={() => setShow((v) => !v)}
            style={{ padding: "16px 0", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {show ? <EyeOff size={18} color={T.hint} /> : <Eye size={18} color={T.hint} />}
          </button>
          <button
            onClick={() => handleDigit("0")}
            style={{ padding: "16px 0", borderRadius: 14, border: "none", background: "#fff", fontSize: 22, fontWeight: 700, color: T.green, cursor: "pointer", boxShadow: "0 1px 4px rgba(13,58,26,.1)" }}
          >
            0
          </button>
          <button
            onClick={handleDel}
            style={{ padding: "16px 0", borderRadius: 14, border: "1px solid rgba(13,58,26,.1)", background: "transparent", fontSize: 16, fontWeight: 600, color: T.hint, cursor: "pointer" }}
          >
            ←
          </button>
        </div>

        {error && (
          <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "#DC2626", fontWeight: 600 }}>
            Noto'g'ri PIN. Qayta urinib ko'ring.
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}

function StatCard({ icon, label, value, sub, color }: StatCardProps) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: T.hint, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: T.hint }}>{sub}</div>}
      </div>
    </div>
  );
}

function Dashboard({ uid, fullName, onLock }: { uid: string; fullName: string; onLock: () => void }) {
  const { nazDone, amalDone, streak } = useProgress();
  const [changingPin, setChangingPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");

  const nazPassed = Object.values(nazDone).filter((d) => d.pct >= 80).length;
  const amalPassed = Object.values(amalDone).filter((d) => d.pct >= 80).length;
  const voiceDone = loadVoiceDone(uid);
  const videoDone = loadVideoWatched(uid);
  const mockResults = loadMockResults(uid);
  const gramDone = loadGramDone(uid);
  const coins = loadCoins(uid);

  const bestMock = mockResults.length > 0
    ? Math.max(...mockResults.map((r) => r.ball))
    : null;

  const handleSavePin = () => {
    if (!/^\d{4}$/.test(newPin)) { setPinMsg("PIN 4 ta raqamdan iborat bo'lishi kerak"); return; }
    savePin(uid, newPin);
    setPinMsg("PIN muvaffaqiyatli o'zgartirildi!");
    setNewPin("");
    setTimeout(() => { setChangingPin(false); setPinMsg(""); }, 1500);
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, padding: "18px 16px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Ota-ona paneli</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{fullName}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>O'quvchining faoliyati</div>
          <button
            onClick={onLock}
            style={{ marginTop: 10, background: "rgba(255,255,255,.15)", border: "none", borderRadius: 10, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            <Lock size={13} /> Yopish
          </button>
        </div>
      </div>

      <div style={{ padding: "14px 14px 32px", display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Asosiy ko'rsatkichlar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <StatCard
            icon={<Flame size={22} color="#FF6B35" />}
            label="Ketma-ket kunlar"
            value={`${streak.days}`}
            sub="kun streak"
            color="#FF6B35"
          />
          <StatCard
            icon={<Coins size={22} color="#EAB308" />}
            label="Yig'ilgan tangalar"
            value={`${coins}`}
            sub="tanga"
            color="#EAB308"
          />
        </div>

        {/* Darslar */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginBottom: 12 }}>Darslar</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Nazariy darslar", done: nazPassed, total: NAZARIY.length, color: T.green },
              { label: "Amaliy boblar", done: amalPassed, total: AMALIY.length, color: "#2563EB" },
              { label: "Grammatika",  done: gramDone, total: 30, color: "#7C3AED" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: T.text2 }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.done}/{item.total}</span>
                </div>
                <div style={{ height: 6, background: "rgba(13,58,26,.08)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.total > 0 ? (item.done / item.total) * 100 : 0}%`, background: item.color, borderRadius: 3, transition: "width .4s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Boshqa modullar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <StatCard
            icon={<Mic size={22} color="#0891B2" />}
            label="Ovoz mashqlari"
            value={`${voiceDone}/10`}
            color="#0891B2"
          />
          <StatCard
            icon={<Video size={22} color="#DC2626" />}
            label="Video darslar"
            value={`${videoDone}`}
            sub="ko'rildi"
            color="#DC2626"
          />
        </div>

        {/* Mock test */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Trophy size={16} color="#CA8A04" />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Mock testlar</span>
          </div>
          {mockResults.length === 0 ? (
            <div style={{ fontSize: 12, color: T.hint }}>Hali test topshirilmagan</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.green }}>{mockResults.length}</div>
                  <div style={{ fontSize: 10, color: T.hint }}>urinish</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: bestMock !== null && bestMock >= 80 ? T.lime : "#FFA500" }}>{bestMock}%</div>
                  <div style={{ fontSize: 10, color: T.hint }}>eng yuqori</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.text2 }}>
                    {Math.round(mockResults.reduce((s, r) => s + r.ball, 0) / mockResults.length)}%
                  </div>
                  <div style={{ fontSize: 10, color: T.hint }}>o'rtacha</div>
                </div>
              </div>
              <div style={{ marginTop: 4 }}>
                {mockResults.slice(-3).reverse().map((r, i) => {
                  const test = MOCK_TESTLAR.find((t) => t.id === r.testId);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderTop: i > 0 ? "1px solid rgba(13,58,26,.06)" : "none" }}>
                      <span style={{ fontSize: 11, color: T.text2 }}>{test?.nomi ?? "Test"}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: r.ball >= 80 ? T.lime : "#FFA500" }}>{r.ball}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Kitobxona */}
        <StatCard
          icon={<BookOpen size={22} color="#059669" />}
          label="Kitobxona"
          value="5"
          sub="ta kitob mavjud"
          color="#059669"
        />

        {/* PIN o'zgartirish */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(13,58,26,.08)", padding: "14px 16px" }}>
          <button
            onClick={() => setChangingPin((v) => !v)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <RefreshCw size={15} color={T.hint} />
            <span style={{ fontSize: 13, color: T.text2, fontWeight: 600 }}>PIN kodni o'zgartirish</span>
          </button>
          {changingPin && (
            <div style={{ marginTop: 12 }}>
              <input
                type="number"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.slice(0, 4))}
                placeholder="Yangi 4 xonali PIN"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid rgba(13,58,26,.15)", fontSize: 16, letterSpacing: 6, outline: "none", boxSizing: "border-box" }}
              />
              {pinMsg && <div style={{ fontSize: 12, color: pinMsg.includes("muv") ? T.lime : "#DC2626", marginTop: 6 }}>{pinMsg}</div>}
              <button
                onClick={handleSavePin}
                style={{ marginTop: 8, width: "100%", padding: "11px", borderRadius: 10, border: "none", background: T.gLime, color: T.onCta, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Saqlash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function OtaOnaView() {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState(false);

  if (!user) return null;

  const fullName = `${user.ism ?? ""} ${user.familya ?? ""}`.trim() || user.login;

  if (!unlocked) {
    return <PinInput onUnlock={() => setUnlocked(true)} />;
  }

  return <Dashboard uid={user.id} fullName={fullName} onLock={() => setUnlocked(false)} />;
}
