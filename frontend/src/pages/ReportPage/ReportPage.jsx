import React from 'react';
import './ReportPage.css';
import ReportForm from '../../components/reports/ReportForm.jsx';
import ReportList from '../../components/reports/ReportList.jsx';

const ReportPage = () => {
  return (
    <div className="report-dashboard">
      <div className="container">
        <header className="report-header">
          <h1>Incident Reporting Portal</h1>
          <p>Help us improve urban safety by reporting and classifying recent incidents.</p>
        </header>

        <div className="report-grid">
          <main className="report-main-form">
            <div className="form-card-saas">
              <div className="card-header">
                <h2>New Safety Report</h2>
                <span>ID: SR-2024-892</span>
              </div>
              <div className="card-body">
                <ReportForm />
              </div>
            </div>
          </main>

          <aside className="report-side-history">
            <div className="history-card-saas">
              <div className="card-header">
                <h3>Incident History</h3>
                <button className="text-btn">Filters</button>
              </div>
              <div className="card-body scrollable">
                <ReportList />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
