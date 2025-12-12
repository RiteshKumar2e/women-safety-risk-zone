import React from 'react';

function RoleBadge({ role = 'USER' }) {
  const config = {
    ADMIN: { bg: '#e0e7ff', color: '#3730a3' },
    POLICE: { bg: '#fee2e2', color: '#991b1b' },
    NGO: { bg: '#dcfce7', color: '#166534' },
    USER: { bg: '#e5e7eb', color: '#374151' },
  };

  const current = config[role] || config.USER;

  return (
    <span
      style={{
        background: current.bg,
        color: current.color,
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: 600,
      }}
    >
      {role}
    </span>
  );
}

export default RoleBadge;
