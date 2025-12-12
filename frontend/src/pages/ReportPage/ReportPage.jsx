import React from 'react';
import './ReportPage.css';
import ReportForm from '../../components/reports/ReportForm.jsx';
import ReportList from '../../components/reports/ReportList.jsx';

function ReportPage() {
  return (
    <div className="report-page">
      <section className="report-page__left">
        <h2>Submit a Safety Report</h2>
        <ReportForm />
      </section>
      <section className="report-page__right">
        <h2>Recent Reports</h2>
        <ReportList />
      </section>
    </div>
  );
}

export default ReportPage;
