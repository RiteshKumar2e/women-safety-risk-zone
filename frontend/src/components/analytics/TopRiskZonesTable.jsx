import React, { useEffect, useState } from 'react';

const riskColor = (level) => {
  switch (level) {
    case 'HIGH':
      return '#dc2626';
    case 'MEDIUM':
      return '#f59e0b';
    default:
      return '#16a34a';
  }
};

function TopRiskZonesTable() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    // TODO: replace with backend API
    setZones([
      { zone: 'Zone A', score: 85, level: 'HIGH' },
      { zone: 'Zone B', score: 72, level: 'HIGH' },
      { zone: 'Zone C', score: 60, level: 'MEDIUM' },
      { zone: 'Zone D', score: 42, level: 'MEDIUM' },
      { zone: 'Zone E', score: 25, level: 'LOW' },
    ]);
  }, []);

  if (!zones.length) {
    return <p>No risk data found.</p>;
  }

  return (
    <div className="top-risk-zones">
      <h3>Top High-Risk Zones</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Zone</th>
            <th align="left">Risk Score</th>
            <th align="left">Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((z, index) => (
            <tr key={index}>
              <td>{z.zone}</td>
              <td>{z.score}</td>
              <td style={{ color: riskColor(z.level), fontWeight: 600 }}>
                {z.level}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopRiskZonesTable;
