import { useState, useEffect } from "react";
import { Coins, ShoppingCart, CheckCircle2, Lock } from "lucide-react";
import { T } from "../../theme/tokens";
import { useCoins } from "../../context/CoinContext";
import { useAuth } from "../../auth/AuthContext";

interface MarketItem {
  id: string;
  nom: string;
  tavsif: string;
  narx: number;
  icon: string;
  rang: string;
  limit?: number; // max necha marta sotib olish mumkin
}

const ITEMS: MarketItem[] = [
  {
    id: "streak_shield",
    nom: "Streak qalqoni",
    tavsif: "Bir kun dars qilmasangiz ham streakingiz saqlanadi.",
    narx: 50,
    icon: "🛡️",
    rang: "#0891B2",
    limit: 3,
  },
  {
    id: "avatar_frame_gold",
    nom: "Oltin avatar ramkasi",
    tavsif: "Profilingizda maxsus oltin ramka ko'rinadi.",
    narx: 80,
    icon: "🏅",
    rang: "#CA8A04",
    limit: 1,
  },
  {
    id: "lesson_unlock",
    nom: "Dars qulfi",
    tavsif: "Oldingi darsni yakunlamasdan navbatdagi darsni ochasiz.",
    narx: 40,
    icon: "🔓",
    rang: "#7C3AED",
    limit: 5,
  },
  {
    id: "badge_star",
    nom: "Yulduz belgisi",
    tavsif: "Profilingizda ⭐ belgisi qo'shiladi.",
    narx: 30,
    icon: "⭐",
    rang: "#F59E0B",
    limit: 1,
  },
  {
    id: "extra_test",
    nom: "Qo'shimcha test",
    tavsif: "Har qanday mavzu bo'yicha 10 ta qo'shimcha test savoli olasiz.",
    narx: 25,
    icon: "📝",
    rang: "#16A34A",
  },
  {
    id: "certificate_a1",
    nom: "A1 Sertifikati",
    tavsif: "A1 darajasini yakunlaganingizni tasdiqlovchi sertifikat.",
    narx: 150,
    icon: "📜",
    rang: "#DC2626",
    limit: 1,
  },
];

const purchasesKey = (uid: string) => `afp:market_purchases_${uid}`;

interface PurchaseRecord {
  itemId: string;
  count: number;
  lastBought: string;
}

function loadPurchases(uid: string): Record<string, PurchaseRecord> {
  try {
    const raw = localStorage.getItem(purchasesKey(uid));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function savePurchases(uid: string, data: Record<string, PurchaseRecord>) {
  try { localStorage.setItem(purchasesKey(uid), JSON.stringify(data)); } catch { /* ignore */ }
}

export function MarketView() {
  const { user } = useAuth();
  const { coins, addCoins } = useCoins();
  const [purchases, setPurchases] = useState<Record<string, PurchaseRecord>>({});
  const [buying, setBuying] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (user) setPurchases(loadPurchases(user.id));
  }, [user?.id]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleBuy = (item: MarketItem) => {
    if (!user) return;
    if (coins < item.narx) { showToast("Yetarli coin yo'q!"); return; }
    const rec = purchases[item.id];
    if (item.limit && rec && rec.count >= item.limit) { showToast("Bu mahsulotdan eng ko'p olgansiz!"); return; }

    setBuying(item.id);
    setTimeout(() => {
      addCoins(-item.narx);
      const updated = {
        ...purchases,
        [item.id]: {
          itemId: item.id,
          count: (rec?.count ?? 0) + 1,
          lastBought: new Date().toISOString(),
        },
      };
      setPurchases(updated);
      savePurchases(user.id, updated);
      setBuying(null);
      showToast(`${item.icon} ${item.nom} sotib olindi!`);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100dvh", background: T.meshLight }}>
      {/* Header */}
      <div style={{ background: T.gGreen, position: "relative", overflow: "hidden", padding: "18px 16px 20px" }}>
        <div style={{ position: "absolute", inset: 0, background: T.sheen, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 10, color: T.limeBrt, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Do'kon</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Market</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>Coin yig'ing va sovg'alar oling</div>
            </div>
            <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 12, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
              <Coins size={18} color="#FCD34D" />
              <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{coins}</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>coin</span>
            </div>
          </div>

          {/* Coin qanday to'planadi */}
          <div style={{ marginTop: 12, background: "rgba(255,255,255,.1)", borderRadius: 10, padding: "8px 12px", fontSize: 11, color: "rgba(255,255,255,.75)", display: "flex", gap: 6 }}>
            <span>💡</span>
            <span>Test 80%+ → <b>+10 coin</b> · 10 kunlik streak → <b>+20 coin</b></span>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div style={{ padding: "16px 14px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {ITEMS.map((item) => {
          const rec = purchases[item.id];
          const bought = rec?.count ?? 0;
          const maxReached = !!(item.limit && bought >= item.limit);
          const canAfford = coins >= item.narx;
          const isBuying = buying === item.id;

          return (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: maxReached ? `2px solid ${item.rang}40` : "1px solid rgba(13,58,26,.08)",
                boxShadow: "0 1px 4px rgba(13,58,26,.06)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Icon banner */}
              <div style={{ background: `${item.rang}15`, padding: "16px 0", textAlign: "center", borderBottom: `2px solid ${item.rang}25` }}>
                <span style={{ fontSize: 36 }}>{item.icon}</span>
              </div>

              <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 3, lineHeight: 1.2 }}>{item.nom}</div>
                <div style={{ fontSize: 10, color: T.hint, lineHeight: 1.4, flex: 1 }}>{item.tavsif}</div>

                {item.limit && (
                  <div style={{ fontSize: 10, color: T.hint, marginTop: 4 }}>
                    {bought}/{item.limit} marta
                  </div>
                )}

                <button
                  onClick={() => !maxReached && handleBuy(item)}
                  disabled={maxReached || isBuying}
                  style={{
                    marginTop: 10,
                    padding: "8px 0",
                    borderRadius: 8, border: "none",
                    cursor: maxReached ? "default" : canAfford ? "pointer" : "not-allowed",
                    background: maxReached
                      ? `${item.rang}20`
                      : canAfford ? `linear-gradient(135deg,${item.rang},${item.rang}cc)` : "rgba(13,58,26,.1)",
                    color: maxReached ? item.rang : canAfford ? "#fff" : T.hint,
                    fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    transition: "opacity .15s",
                    opacity: isBuying ? 0.6 : 1,
                  }}
                >
                  {maxReached ? (
                    <><CheckCircle2 size={13} /> Olingan</>
                  ) : !canAfford ? (
                    <><Lock size={13} /> {item.narx} coin</>
                  ) : isBuying ? (
                    "..."
                  ) : (
                    <><ShoppingCart size={13} /> {item.narx} coin</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
          background: T.green, color: "#fff", borderRadius: 20, padding: "10px 18px",
          fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          zIndex: 100, whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
