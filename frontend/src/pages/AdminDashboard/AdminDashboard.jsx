import React from 'react';
import './AdminDashboard.css';
import RiskTrendsChart from '../../components/analytics/RiskTrendsChart.jsx';
import TopRiskZonesTable from '../../components/analytics/TopRiskZonesTable.jsx';

function AdminDashboard() {
  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Admin & Analytics Dashboard</h1>
        <p>Monitor high-risk zones and incident trends.</p>
      </header>
      <div className="admin-page__grid">
        <div className="admin-page__card">
          <h2>Risk Trend</h2>
          <RiskTrendsChart />
        </div>
        <div className="admin-page__card">
          <h2>Top High-Risk Areas</h2>
          <TopRiskZonesTable />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
