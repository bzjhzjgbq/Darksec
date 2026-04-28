import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import RequireAuth from "./components/auth/RequireAuth";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import CompetitionDetailPage from "./pages/CompetitionDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import PublishProjectPage from "./pages/PublishProjectPage";
import PublishArticlePage from "./pages/PublishArticlePage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import FavoritesPage from "./pages/FavoritesPage";
import FriendsPage from "./pages/FriendsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";

function ProtectedPage({ children }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<MainLayout />}>
            <Route
              path="/home"
              element={
                <ProtectedPage>
                  <HomePage />
                </ProtectedPage>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedPage>
                  <ProjectsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/projects/new"
              element={
                <ProtectedPage>
                  <PublishProjectPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <ProtectedPage>
                  <ProjectDetailPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/articles"
              element={
                <ProtectedPage>
                  <ArticlesPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/articles/new"
              element={
                <ProtectedPage>
                  <PublishArticlePage />
                </ProtectedPage>
              }
            />
            <Route
              path="/articles/:articleId"
              element={
                <ProtectedPage>
                  <ArticleDetailPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/competitions"
              element={
                <ProtectedPage>
                  <CompetitionsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/competitions/:competitionId"
              element={
                <ProtectedPage>
                  <CompetitionDetailPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedPage>
                  <Navigate to="/user/profile" replace />
                </ProtectedPage>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedPage>
                  <ProfilePage />
                </ProtectedPage>
              }
            />
            <Route
              path="/user/profile/edit"
              element={
                <ProtectedPage>
                  <ProfileEditPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/user/favorites"
              element={
                <ProtectedPage>
                  <FavoritesPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/user/friends"
              element={
                <ProtectedPage>
                  <FriendsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/user/settings"
              element={
                <ProtectedPage>
                  <SettingsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/user/auth"
              element={
                <ProtectedPage>
                  <AuthPage />
                </ProtectedPage>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
