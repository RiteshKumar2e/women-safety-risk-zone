import React from 'react';
import RiskBadge from '../common/RiskBadge.jsx';

function RouteSummary({ route }) {
  if (!route) {
    return (
      <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
        Analyze a route to see summary.
      </p>
    );
  }

  const { overallRiskScore, overallRiskLevel, alternativeRoutes = [] } = route;

  return (
    <div
      style={{
        marginTop: '12px',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        fontSize: '0.9rem',
      }}
    >
      <h3 style={{ margin: '0 0 6px' }}>Route Safety Summary</h3>

      <p style={{ margin: '4px 0' }}>
        <strong>Overall Risk Score:</strong> {overallRiskScore ?? 'N/A'}
      </p>
      <p style={{ margin: '4px 0' }}>
        <strong>Risk Level:</strong>{' '}
        {overallRiskLevel ? (
          <RiskBadge level={overallRiskLevel} />
        ) : (
          'N/A'
        )}
      </p>

      {alternativeRoutes.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          <strong>Safer Alternatives:</strong>
          <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
            {alternativeRoutes.map((alt) => (
              <li key={alt.routeId}>
                Route {alt.routeId.slice(0, 6)}… – Score {alt.overallRiskScore}{' '}
                (<strong>{alt.overallRiskLevel}</strong>)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RouteSummary;
