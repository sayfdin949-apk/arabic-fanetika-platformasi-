import { BookOpen } from "lucide-react";

// A1: karkas ishlashini tekshirish uchun vaqtinchalik sahifa.
// Keyingi qadamlarda (A2+) router, auth va sahifalar qo'shiladi.
export default function App() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "linear-gradient(135deg,#6AEF5A 0%,#3DCB36 55%,#2EB82E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(13,58,26,.3)",
        }}
      >
        <BookOpen size={26} color="#0A2A10" />
      </div>
      <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-.015em" }}>
        Arab Fonetika Platformasi
      </div>
      <div style={{ fontSize: 13, color: "#5A8060" }}>
        Karkas tayyor — keyingi qadam: dizayn va kontentni ko'chirish (A2)
      </div>
    </div>
  );
}
