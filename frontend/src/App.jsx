import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MapPage from './pages/MapPage/MapPage.jsx';
import ReportPage from './pages/ReportPage/ReportPage.jsx';
import RouteSafetyPage from './pages/RouteSafetyPage/RouteSafetyPage.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegisterPage from './pages/Register/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';

import Navbar from './components/layout/Navbar.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';

import { AuthProvider } from './context/AuthContext.jsx';
import { MapProvider } from './context/MapContext.jsx';

function App() {
  return (
    <AuthProvider>
      <MapProvider>
        <div className="app-root">
          <Navbar />

          <main className="app-main">
            <Routes>

              {/* Default Redirect */}
              <Route path="/" element={<Navigate to="/map" replace />} />

              {/* Public Pages */}
              <Route path="/map" element={<MapPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/routes" element={<RouteSafetyPage />} />

              {/* Authentication Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* User Protected Page */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Page */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Page Not Found */}
              <Route
                path="*"
                element={
                  <div
                    style={{
                      padding: '40px',
                      textAlign: 'center',
                      fontSize: '18px',
                      color: '#6b7280',
                    }}
                  >
                    <h2>404 - Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                  </div>
                }
              />

            </Routes>
          </main>
        </div>
      </MapProvider>
    </AuthProvider>
  );
}

export default App;
