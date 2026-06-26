import { type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ProgressProvider } from "./features/progress/ProgressContext";
import { Login } from "./auth/Login";
import { AppShell } from "./layout/AppShell";
import { Placeholder } from "./components/Placeholder";
import { DarsList } from "./features/dars/DarsList";
import { NazariyDetail } from "./features/dars/NazariyDetail";
import { AmaliyDetail } from "./features/dars/AmaliyDetail";
import { T } from "./theme/tokens";

function Splash() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", color: T.hint, fontSize: 13 }}>
      Yuklanmoqda…
    </div>
  );
}

function Protected({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  if (!ready) return <Splash />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function LoginRoute() {
  const { user, ready } = useAuth();
  if (!ready) return <Splash />;
  if (user) return <Navigate to="/" replace />;
  return <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route
            element={
              <Protected>
                <ProgressProvider>
                  <AppShell />
                </ProgressProvider>
              </Protected>
            }
          >
            <Route path="/" element={<Placeholder title="Bosh sahifa" note="Progress va umumiy ko'rinish (A5)." />} />
            <Route path="/dars" element={<DarsList />} />
            <Route path="/dars/nazariy/:id" element={<NazariyDetail />} />
            <Route path="/dars/amaliy/:id" element={<AmaliyDetail />} />
            <Route path="/dastur" element={<Placeholder title="Dastur" note="5 oylik jadval (A5)." />} />
            <Route path="/profil" element={<Placeholder title="Profil" note="Profil va avatar (A5)." />} />
            <Route path="/davomat" element={<Placeholder title="Davomat" note="O'qituvchi uchun (A6)." />} />
            <Route path="/oquvchilar" element={<Placeholder title="O'quvchilar" note="O'quvchi boshqaruvi (A6)." />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
