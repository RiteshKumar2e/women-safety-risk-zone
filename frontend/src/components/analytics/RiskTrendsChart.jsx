import React, { useEffect, useState } from 'react';

function RiskTrendsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // TODO: replace with backend API
    setData([
      { date: '2024-05-01', risk: 62 },
      { date: '2024-05-05', risk: 68 },
      { date: '2024-05-10', risk: 72 },
      { date: '2024-05-15', risk: 65 },
    ]);
  }, []);

  return (
    <div className="risk-trend-chart">
      <h3>Risk Trend Over Time</h3>

      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th align="left">Date</th>
              <th align="left">Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{item.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '8px' }}>
        (Chart integration pending – replace with real line chart)
      </p>
    </div>
  );
}

export default RiskTrendsChart;
