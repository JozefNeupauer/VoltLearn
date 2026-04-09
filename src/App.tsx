import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { LessonPage } from './pages/LessonPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DiagramsPage } from './pages/DiagramsPage'
import { SymbolsPage } from './pages/SymbolsPage'

function RequireOnboarding() {
  const { state } = useApp()
  if (!state.user.name) return <Navigate to="/onboarding" replace />
  return <Outlet />
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route element={<RequireOnboarding />}>
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/diagrams" element={<DiagramsPage />} />
              <Route path="/symbols" element={<SymbolsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/premium" element={<Navigate to="/" replace />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
