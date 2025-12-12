import React from 'react';

function getColorByLevel(level) {
  switch (level) {
    case 'HIGH':
      return { bg: '#fee2e2', border: '#dc2626', text: '#991b1b' };
    case 'MEDIUM':
      return { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' };
    case 'LOW':
    default:
      return { bg: '#dcfce7', border: '#16a34a', text: '#166534' };
  }
}

function getRiskFactors(riskScore, riskLevel) {
  const factors = [];
  
  if (riskScore > 70) {
    factors.push({ icon: '🚨', text: 'High crime rate reported', severity: 'high' });
    factors.push({ icon: '🌙', text: 'Poor lighting infrastructure', severity: 'high' });
  }
  if (riskScore > 50) {
    factors.push({ icon: '👥', text: 'Low police patrol frequency', severity: 'medium' });
    factors.push({ icon: '📍', text: 'Isolated location', severity: 'medium' });
  }
  if (riskScore > 40) {
    factors.push({ icon: '🏗️', text: 'Under-developed area', severity: 'medium' });
  }
  if (riskScore <= 40) {
    factors.push({ icon: '✅', text: 'Regular police patrolling', severity: 'low' });
    factors.push({ icon: '💡', text: 'Well-lit streets', severity: 'low' });
    factors.push({ icon: '🏘️', text: 'Residential area', severity: 'low' });
  }
  
  return factors.slice(0, 3); // Show max 3 factors
}

function getSafetyRecommendations(riskLevel) {
  switch (riskLevel) {
    case 'HIGH':
      return [
        'Avoid traveling alone',
        'Stay in well-lit areas',
        'Keep emergency contacts ready',
        'Use trusted transportation'
      ];
    case 'MEDIUM':
      return [
        'Stay alert and aware',
        'Travel in groups when possible',
        'Avoid late night travel',
        'Keep phone charged'
      ];
    case 'LOW':
    default:
      return [
        'General precautions advised',
        'Stay aware of surroundings',
        'Trust your instincts'
      ];
  }
}

function ZonePopup({ zone, onClose }) {
  if (!zone) return null;

  const colors = getColorByLevel(zone.riskLevel);
  const riskFactors = getRiskFactors(zone.riskScore, zone.riskLevel);
  const recommendations = getSafetyRecommendations(zone.riskLevel);

  return (
    <div
      style={{
        position: 'absolute',
        right: '12px',
        top: '60px',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(15,23,42,0.2)',
        minWidth: '320px',
        maxWidth: '380px',
        zIndex: 1000,
        fontSize: '0.85rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      }}
    >
      {/* Header with gradient */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.border} 0%, ${colors.bg} 100%)`,
          padding: '14px 16px',
          borderBottom: `2px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ 
            fontSize: '0.75rem', 
            color: colors.text,
            fontWeight: 500,
            opacity: 0.9,
            marginBottom: '2px'
          }}>
            Zone Information
          </div>
          <div style={{ 
            fontSize: '1.1rem', 
            fontWeight: 700,
            color: colors.text
          }}>
            {zone.id.toUpperCase()}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            cursor: 'pointer',
            fontSize: '1.2rem',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.text,
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = colors.border}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.9)'}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Risk Score Display */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '12px',
          background: colors.bg,
          borderRadius: '8px',
          border: `1px solid ${colors.border}`
        }}>
          <div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280',
              marginBottom: '2px' 
            }}>
              Risk Score
            </div>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              color: colors.border,
              lineHeight: 1
            }}>
              {zone.riskScore}
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/100</span>
            </div>
          </div>
          <div style={{
            padding: '6px 16px',
            borderRadius: '20px',
            background: colors.border,
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {zone.riskLevel}
          </div>
        </div>

        {/* Location Info */}
        <div style={{ 
          marginBottom: '16px',
          padding: '10px',
          background: '#f9fafb',
          borderRadius: '6px'
        }}>
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280',
            marginBottom: '4px',
            fontWeight: 500
          }}>
            📍 Coordinates
          </div>
          <div style={{ 
            fontSize: '0.8rem',
            color: '#374151',
            fontFamily: 'monospace'
          }}>
            {zone.center.lat.toFixed(4)}°N, {zone.center.lng.toFixed(4)}°E
          </div>
        </div>

        {/* Risk Factors */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            fontSize: '0.8rem', 
            fontWeight: 600,
            color: '#374151',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            ⚠️ Risk Factors
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {riskFactors.map((factor, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 8px',
                  background: '#f9fafb',
                  borderRadius: '6px',
                  fontSize: '0.8rem'
                }}
              >
                <span style={{ fontSize: '1rem' }}>{factor.icon}</span>
                <span style={{ color: '#4b5563' }}>{factor.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Recommendations */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ 
            fontSize: '0.8rem', 
            fontWeight: 600,
            color: '#374151',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            🛡️ Safety Tips
          </div>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {recommendations.map((tip, idx) => (
              <li key={idx} style={{ 
                color: '#4b5563',
                fontSize: '0.78rem',
                lineHeight: '1.4'
              }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '14px',
          padding: '10px',
          background: '#eff6ff',
          borderLeft: '3px solid #3b82f6',
          borderRadius: '4px',
          fontSize: '0.75rem',
          color: '#1e40af',
          lineHeight: '1.4'
        }}>
          <strong>ℹ️ Note:</strong> Risk calculated using AI analysis of crime data, 
          lighting infrastructure, patrol frequency, and historical incidents.
        </div>
      </div>
    </div>
  );
}

export default ZonePopup;