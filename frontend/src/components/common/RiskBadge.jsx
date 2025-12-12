import React from 'react';

function RiskBadge({ level }) {
  const config = {
    LOW: { bg: '#dcfce7', color: '#166534', label: 'Low Risk' },
    MEDIUM: { bg: '#fef3c7', color: '#92400e', label: 'Medium Risk' },
    HIGH: { bg: '#fee2e2', color: '#991b1b', label: 'High Risk' },
  };

  const current = config[level] || config.LOW;

  return (
    <span
      style={{
        background: current.bg,
        color: current.color,
        padding: '4px 8px',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
      }}
    >
      {current.label}
    </span>
  );
}

export default RiskBadge;
