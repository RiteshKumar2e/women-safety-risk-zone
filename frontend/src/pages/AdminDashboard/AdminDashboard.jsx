import React from 'react';
import './AdminDashboard.css';
import RiskTrendsChart from '../../components/analytics/RiskTrendsChart.jsx';
import TopRiskZonesTable from '../../components/analytics/TopRiskZonesTable.jsx';

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar for Admin */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Command Center</h3>
        </div>
        <ul className="sidebar-nav">
          <li className="active">Overview</li>
          <li>User Management</li>
          <li>Incident Reports</li>
          <li>Risk Geographies</li>
          <li>System Logs</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <header className="admin-content-header">
          <div>
            <h1>Executive Overview</h1>
            <p>Real-time analytics and system-wide safety monitoring.</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">Export Data</button>
            <button className="btn-primary">Generate Report</button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="admin-stats-grid">
          <div className="stat-box">
            <span className="stat-icon">🚩</span>
            <div className="stat-info">
              <span className="label">Active Incidents</span>
              <span className="value">42</span>
            </div>
            <span className="stat-trend trend-down">-12% vs last week</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">👤</span>
            <div className="stat-info">
              <span className="label">Registered Users</span>
              <span className="value">12.4k</span>
            </div>
            <span className="stat-trend trend-up">+8% vs last month</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">📍</span>
            <div className="stat-info">
              <span className="label">Monitored Zones</span>
              <span className="value">856</span>
            </div>
            <span className="stat-trend">Stable</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">⏱️</span>
            <div className="stat-info">
              <span className="label">Avg. Response Time</span>
              <span className="value">14m</span>
            </div>
            <span className="stat-trend trend-up">-2m improvement</span>
          </div>
        </section>

        {/* Charts & Tables Section */}
        <div className="admin-main-grid">
          <div className="admin-data-card chart-container">
            <div className="card-header">
              <h3>Incident Frequency Trend</h3>
              <select className="date-filter">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="chart-body">
              {/* Placeholder or real chart */}
              <RiskTrendsChart />
            </div>
          </div>

          <div className="admin-data-card table-container">
            <div className="card-header">
              <h3>Priority High-Risk Zones</h3>
              <button className="text-btn">View All</button>
            </div>
            <div className="table-body">
              <TopRiskZonesTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
