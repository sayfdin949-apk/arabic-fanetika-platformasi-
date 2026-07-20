import { type ReactNode } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ProgressProvider } from "./features/progress/ProgressContext";
import { Login } from "./auth/Login";
import { Onboarding, needsOnboarding } from "./auth/Onboarding";
import { AppShell } from "./layout/AppShell";
import { AdminShell } from "./layout/AdminShell";
import { HomeView } from "./features/home/HomeView";
import { DarsList } from "./features/dars/DarsList";
import { NazariyDetail } from "./features/dars/NazariyDetail";
import { AmaliyDetail } from "./features/dars/AmaliyDetail";
import { DasturView } from "./features/curriculum/DasturView";
import { ProfileView } from "./features/profile/ProfileView";
import { DavomatView } from "./features/attendance/DavomatView";
import { OquvchilarView } from "./features/admin/OquvchilarView";
import { StatisticsView } from "./features/stats/StatisticsView";
import { GameView } from "./features/game/GameView";
import { XatolarView } from "./features/errors/XatolarView";
import { MinimalPairsView } from "./features/pairs/MinimalPairsView";
import { SertifikatView } from "./features/sertifikat/SertifikatView";
import { GuruhlarView } from "./features/guruh/GuruhlarView";
import { ShikoyatView } from "./features/shikoyat/ShikoyatView";
import { UstozlarView } from "./features/admin/UstozlarView";
import { AssistantProvider } from "./features/assistant/AssistantContext";
import { YordamchiUstozView } from "./features/assistant/YordamchiUstozView";
import { SkanerView } from "./features/assistant/SkanerView";
import { CoinProvider } from "./context/CoinContext";
import { GrammarView } from "./features/grammar/GrammarView";
import { DarajaDetail } from "./features/grammar/DarajaDetail";
import { GramDarsDetail } from "./features/grammar/GramDarsDetail";
import { ChatView } from "./features/chat/ChatView";
import { MarketView } from "./features/market/MarketView";
import { TolovView } from "./features/payment/TolovView";
import { VideoDarslarView } from "./features/video/VideoDarslarView";
import { KitobxonaView } from "./features/library/KitobxonaView";
import { MockTestView } from "./features/mocktest/MockTestView";
import { AIFiltrView } from "./features/aifiltr/AIFiltrView";
import { SpeakingClubView } from "./features/speaking/SpeakingClubView";
import { MehmonUstozlarView } from "./features/speakers/MehmonUstozlarView";
import { OvozYozishView } from "./features/voice/OvozYozishView";
import { OtaOnaView } from "./features/parent/OtaOnaView";
import { DarajaTestView } from "./features/placement/DarajaTestView";
import { TarjimonView } from "./features/translator/TarjimonView";
import { MultfilmlarView } from "./features/cartoons/MultfilmlarView";
import { AchievementsView } from "./features/achievements/AchievementsView";
import { LeaderboardView } from "./features/leaderboard/LeaderboardView";
import { AssignmentsView } from "./features/assignments/AssignmentsView";
import { CeoAnalyticsView } from "./features/analytics/CeoAnalyticsView";
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
  if (needsOnboarding(user)) return <Onboarding />;
  return <>{children}</>;
}

function LoginRoute() {
  const { user, ready } = useAuth();
  if (!ready) return <Splash />;
  if (user) return <Navigate to="/" replace />;
  return <Login />;
}

function ShellRouter() {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === "student") return <AppShell />;
  return <AdminShell />;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route
            element={
              <Protected>
                <CoinProvider>
                  <ProgressProvider>
                    <AssistantProvider>
                      <ShellRouter />
                    </AssistantProvider>
                  </ProgressProvider>
                </CoinProvider>
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
            <Route path="/statistika" element={<StatisticsView />} />
            <Route path="/oyun" element={<GameView />} />
            <Route path="/xatolar" element={<XatolarView />} />
            <Route path="/juftlar" element={<MinimalPairsView />} />
            <Route path="/sertifikat" element={<SertifikatView />} />
            <Route path="/yutuqlar" element={<AchievementsView />} />
            <Route path="/reyting" element={<LeaderboardView />} />
            <Route path="/topshiriqlar" element={<AssignmentsView />} />
            <Route path="/analitika" element={<CeoAnalyticsView />} />
            <Route path="/guruhlar" element={<GuruhlarView />} />
            <Route path="/shikoyat" element={<ShikoyatView />} />
            <Route path="/ustozlar" element={<UstozlarView />} />
            <Route path="/yordamchi-ustoz" element={<YordamchiUstozView />} />
            <Route path="/skaner" element={<SkanerView />} />
            <Route path="/grammatika" element={<GrammarView />} />
            <Route path="/grammatika/daraja/:kod" element={<DarajaDetail />} />
            <Route path="/grammatika/dars/:id" element={<GramDarsDetail />} />
            <Route path="/chat" element={<ChatView />} />
            <Route path="/market" element={<MarketView />} />
            <Route path="/tolov" element={<TolovView />} />
            <Route path="/video" element={<VideoDarslarView />} />
            <Route path="/kitobxona" element={<KitobxonaView />} />
            <Route path="/mocktest" element={<MockTestView />} />
            <Route path="/matn-tahlil" element={<AIFiltrView />} />
            <Route path="/speaking-club" element={<SpeakingClubView />} />
            <Route path="/mehmon-ustozlar" element={<MehmonUstozlarView />} />
            <Route path="/ovoz" element={<OvozYozishView />} />
            <Route path="/ota-ona" element={<OtaOnaView />} />
            <Route path="/daraja-test" element={<DarajaTestView />} />
            <Route path="/tarjimon" element={<TarjimonView />} />
            <Route path="/multfilmlar" element={<MultfilmlarView />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
