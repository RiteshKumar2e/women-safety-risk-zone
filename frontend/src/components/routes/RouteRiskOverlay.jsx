import React from 'react';
import RiskBadge from '../common/RiskBadge.jsx';

function getColor(level) {
  switch (level) {
    case 'HIGH':
      return '#fee2e2';
    case 'MEDIUM':
      return '#fef3c7';
    case 'LOW':
    default:
      return '#dcfce7';
  }
}

function RouteRiskOverlay({ route }) {
  if (!route) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          fontSize: '0.9rem',
        }}
      >
        No route selected. Analyze a route to see segment risks.
      </div>
    );
  }

  const { segments = [] } = route;

  if (!segments.length) {
    return (
      <div style={{ padding: '12px', fontSize: '0.9rem' }}>
        No segment-level risk data available for this route.
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Route Segments Risk</h3>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {segments.map((seg, index) => (
          <div
            key={index}
            style={{
              background: getColor(seg.riskLevel),
              borderRadius: '6px',
              padding: '6px 8px',
              fontSize: '0.85rem',
              border: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '2px',
              }}
            >
              <span>Segment {index + 1}</span>
              <RiskBadge level={seg.riskLevel} />
            </div>
            <div>Risk Score: {seg.riskScore}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RouteRiskOverlay;
