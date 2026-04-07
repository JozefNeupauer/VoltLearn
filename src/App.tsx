import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { LessonPage } from './pages/LessonPage'
import { ProfilePage } from './pages/ProfilePage'
import { PremiumPage } from './pages/PremiumPage'
import { SettingsPage } from './pages/SettingsPage'
import { OnboardingPage } from './pages/OnboardingPage'

function RequireOnboarding() {
  const { state } = useApp()
  if (!state.user.name) return <Navigate to="/onboarding" replace />
  return <Outlet />
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route element={<RequireOnboarding />}>
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
