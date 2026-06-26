import { type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ProgressProvider } from "./features/progress/ProgressContext";
import { Login } from "./auth/Login";
import { AppShell } from "./layout/AppShell";
import { HomeView } from "./features/home/HomeView";
import { DarsList } from "./features/dars/DarsList";
import { NazariyDetail } from "./features/dars/NazariyDetail";
import { AmaliyDetail } from "./features/dars/AmaliyDetail";
import { DasturView } from "./features/curriculum/DasturView";
import { ProfileView } from "./features/profile/ProfileView";
import { DavomatView } from "./features/attendance/DavomatView";
import { OquvchilarView } from "./features/admin/OquvchilarView";
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
            <Route path="/" element={<HomeView />} />
            <Route path="/dars" element={<DarsList />} />
            <Route path="/dars/nazariy/:id" element={<NazariyDetail />} />
            <Route path="/dars/amaliy/:id" element={<AmaliyDetail />} />
            <Route path="/dastur" element={<DasturView />} />
            <Route path="/profil" element={<ProfileView />} />
            <Route path="/davomat" element={<DavomatView />} />
            <Route path="/oquvchilar" element={<OquvchilarView />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
