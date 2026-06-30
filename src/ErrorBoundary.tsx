import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

// React render paytida tutilmagan xatolik bo'lsa, butun daraxt unmount
// bo'lib BO'SH OQ EKRAN qoladi. Bu komponent o'rniga foydalanuvchiga
// ko'rinadigan xabar va qayta yuklash tugmasini ko'rsatadi.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 24,
            textAlign: "center",
            color: "#333",
          }}
        >
          <div style={{ fontSize: 15, maxWidth: 360 }}>
            Xatolik yuz berdi. Iltimos, sahifani qayta yuklang.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontSize: 14,
            }}
          >
            Qayta yuklash
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
