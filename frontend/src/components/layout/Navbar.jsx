import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="app-navbar">
      <div className="nav-container container">
        <div className="nav-left">
          <NavLink to="/" className="nav-brand">
            <span className="brand-logo">🛡️</span>
            <span className="brand-name">SafeZone AI</span>
          </NavLink>
        </div>

        <nav className="nav-center">
          <NavLink to="/map" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Analysis Map
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Report Incident
          </NavLink>
          <NavLink to="/routes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Safety Routes
          </NavLink>
          {user?.role === 'ADMIN' && (
            <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              Control Center
            </NavLink>
          )}
        </nav>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            🌓
          </button>

          {user ? (
            <div className="nav-user-area">
              <NavLink to="/profile" className="user-profile-link">
                <span className="user-name">{user.name || 'Account'}</span>
              </NavLink>
              <button onClick={handleLogout} className="btn-logout">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-login-small">
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
