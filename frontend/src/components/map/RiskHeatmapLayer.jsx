import React from 'react';
import { CircleMarker, Tooltip, Circle } from 'react-leaflet';

function getColor(level) {
  switch (level) {
    case 'HIGH':
      return '#dc2626';
    case 'MEDIUM':
      return '#f59e0b';
    case 'LOW':
    default:
      return '#16a34a';
  }
}

function getAreaRadius(riskScore) {
  // Larger radius for higher risk areas to show more coverage
  // Base radius: 300m to 800m depending on risk
  return 300 + (riskScore * 5);
}

function RiskHeatmapLayer({ zones = [], onZoneClick }) {
  return (
    <>
      {zones.map((zone) => {
        const color = getColor(zone.riskLevel);
        const radius = getAreaRadius(zone.riskScore);
        
        return (
          <React.Fragment key={zone.id}>
            {/* Outer glow layer - largest radius, most transparent */}
            <Circle
              center={[zone.center.lat, zone.center.lng]}
              radius={radius * 1.5}
              pathOptions={{
                color: 'transparent',
                fillColor: color,
                fillOpacity: 0.08,
                weight: 0,
              }}
            />
            
            {/* Middle layer - medium radius */}
            <Circle
              center={[zone.center.lat, zone.center.lng]}
              radius={radius * 1.1}
              pathOptions={{
                color: 'transparent',
                fillColor: color,
                fillOpacity: 0.15,
                weight: 0,
              }}
            />
            
            {/* Inner core layer - most opaque */}
            <Circle
              center={[zone.center.lat, zone.center.lng]}
              radius={radius * 0.6}
              pathOptions={{
                color: 'transparent',
                fillColor: color,
                fillOpacity: 0.35,
                weight: 0,
              }}
            />
            
            {/* Center marker with border - clickable */}
            <CircleMarker
              center={[zone.center.lat, zone.center.lng]}
              radius={8}
              pathOptions={{
                color: '#ffffff',
                fillColor: color,
                fillOpacity: 0.9,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onZoneClick && onZoneClick(zone),
              }}
            >
              <Tooltip 
                direction="top" 
                offset={[0, -10]} 
                opacity={0.95}
                className="custom-tooltip"
              >
                <div style={{ 
                  fontSize: '0.75rem',
                  minWidth: '120px',
                }}>
                  <div style={{ 
                    fontWeight: 600, 
                    marginBottom: '4px',
                    color: color,
                    fontSize: '0.8rem'
                  }}>
                    {zone.id.toUpperCase()}
                  </div>
                  <div style={{ marginBottom: '2px' }}>
                    Risk Score: <strong>{zone.riskScore}</strong>
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: color,
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    marginTop: '4px'
                  }}>
                    {zone.riskLevel}
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
            
            {/* Risk score label inside the zone */}
            <CircleMarker
              center={[zone.center.lat, zone.center.lng]}
              radius={0}
              pathOptions={{ weight: 0 }}
            >
              <Tooltip
                permanent
                direction="center"
                className="risk-score-label"
                opacity={0.8}
              >
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: color,
                  textShadow: '0 0 3px white, 0 0 3px white',
                  pointerEvents: 'none'
                }}>
                  {zone.riskScore}
                </div>
              </Tooltip>
            </CircleMarker>
          </React.Fragment>
        );
      })}
      
      <style>{`
        .custom-tooltip {
          background: white !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
          padding: 8px !important;
        }
        
        .custom-tooltip::before {
          border-top-color: #e5e7eb !important;
        }
        
        .risk-score-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        
        .risk-score-label::before {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default RiskHeatmapLayer;