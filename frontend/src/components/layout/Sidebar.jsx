import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside
      style={{
        width: '220px',
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: 'calc(100vh - 60px)',
      }}
    >
      <NavLink
        to="/map"
        style={({ isActive }) => ({
          padding: '8px 10px',
          borderRadius: '6px',
          fontSize: '0.95rem',
          color: isActive ? '#2563eb' : '#111827',
          background: isActive ? '#dbeafe' : 'transparent',
          fontWeight: isActive ? 600 : 400,
        })}
      >
        📍 Map
      </NavLink>

      <NavLink
        to="/report"
        style={({ isActive }) => ({
          padding: '8px 10px',
          borderRadius: '6px',
          fontSize: '0.95rem',
          color: isActive ? '#2563eb' : '#111827',
          background: isActive ? '#dbeafe' : 'transparent',
          fontWeight: isActive ? 600 : 400,
        })}
      >
        📝 Report
      </NavLink>

      <NavLink
        to="/routes"
        style={({ isActive }) => ({
          padding: '8px 10px',
          borderRadius: '6px',
          fontSize: '0.95rem',
          color: isActive ? '#2563eb' : '#111827',
          background: isActive ? '#dbeafe' : 'transparent',
          fontWeight: isActive ? 600 : 400,
        })}
      >
        🛣 Safe Routes
      </NavLink>

      <NavLink
        to="/profile"
        style={({ isActive }) => ({
          padding: '8px 10px',
          borderRadius: '6px',
          fontSize: '0.95rem',
          color: isActive ? '#2563eb' : '#111827',
          background: isActive ? '#dbeafe' : 'transparent',
          fontWeight: isActive ? 600 : 400,
        })}
      >
        👤 Profile
      </NavLink>
    </aside>
  );
}

export default Sidebar;
