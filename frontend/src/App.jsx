import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import MapPage from './pages/MapPage/MapPage.jsx';
import ReportPage from './pages/ReportPage/ReportPage.jsx';
import RouteSafetyPage from './pages/RouteSafetyPage/RouteSafetyPage.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import AdminLoginPage from './pages/AdminLogin/AdminLoginPage.jsx';
import RegisterPage from './pages/Register/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';

// Components
import Navbar from './components/layout/Navbar.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';

// Providers
import { AuthProvider } from './context/AuthContext.jsx';
import { MapProvider } from './context/MapContext.jsx';

// Theme persistence
const useTheme = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
};

function AppContent() {
  const location = useLocation();
  useTheme();

  // Hide Navbar on specific "blank" pages
  const hideNavbarPaths = ['/', '/login', '/admin-login', '/register'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="app-root">
      {!shouldHideNavbar && <Navbar />}

      <main className={!shouldHideNavbar ? 'app-main' : ''}>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User Features - Protected */}
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routes"
            element={
              <ProtectedRoute>
                <RouteSafetyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard - Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MapProvider>
        <AppContent />
      </MapProvider>
    </AuthProvider>
  );
}

export default App;
