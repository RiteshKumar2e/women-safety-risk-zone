import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        height: '60px',
        background: '#ffffff',
        boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
          Women Safety
        </span>
      </div>

      {/* Center links */}
      <nav style={{ display: 'flex', gap: '16px' }}>
        <NavLink
          to="/map"
          style={({ isActive }) => ({
            fontSize: '0.95rem',
            color: isActive ? '#2563eb' : '#6b7280',
            fontWeight: isActive ? 600 : 400,
          })}
        >
          Map
        </NavLink>

        <NavLink
          to="/report"
          style={({ isActive }) => ({
            fontSize: '0.95rem',
            color: isActive ? '#2563eb' : '#6b7280',
            fontWeight: isActive ? 600 : 400,
          })}
        >
          Report
        </NavLink>

        <NavLink
          to="/routes"
          style={({ isActive }) => ({
            fontSize: '0.95rem',
            color: isActive ? '#2563eb' : '#6b7280',
            fontWeight: isActive ? 600 : 400,
          })}
        >
          Safe Routes
        </NavLink>

        {user?.role === 'ADMIN' && (
          <NavLink
            to="/admin"
            style={({ isActive }) => ({
              fontSize: '0.95rem',
              color: isActive ? '#2563eb' : '#6b7280',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Dashboard
          </NavLink>
        )}
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: '#111827' }}>
              {user.name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              style={{
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                background: '#2563eb',
                color: 'white',
                fontSize: '0.9rem',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            style={{
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#2563eb',
              color: 'white',
              fontSize: '0.9rem',
            }}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
