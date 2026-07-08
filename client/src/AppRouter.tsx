import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CreatorStudioPage } from './pages/CreatorStudioPage';
import { WatchPage } from './pages/WatchPage';
import { BillingPage } from './pages/BillingPage';
import { AdminModerationPage } from './pages/AdminModerationPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/creator-studio" element={<CreatorStudioPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/admin/moderation" element={<AdminModerationPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="p-6">Dashboard placeholder</div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
