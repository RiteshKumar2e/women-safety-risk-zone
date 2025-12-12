import React, { useEffect, useState } from 'react';
import { getReports } from '../../services/riskService.js';
import Loader from '../common/Loader.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import RiskBadge from '../common/RiskBadge.jsx';

function ReportList({ filters = {} }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getReports(filters);
      setReports(data || []);
    } catch (err) {
      setError('Failed to load reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]); // simple way to trigger on filters change

  if (loading) {
    return <Loader text="Loading reports..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!reports || reports.length === 0) {
    return <p style={{ fontSize: '0.9rem' }}>No reports found.</p>;
  }

  return (
    <div className="report-list-wrapper">
      <ul
        className="report-list"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {reports.map((r) => (
          <li
            key={r.id}
            style={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              padding: '8px 10px',
              fontSize: '0.9rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <div>
                <strong style={{ textTransform: 'capitalize' }}>
                  {r.category?.replace('_', ' ') || 'Report'}
                </strong>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                  }}
                >
                  {r.incident_time
                    ? new Date(r.incident_time).toLocaleString()
                    : 'Time not available'}
                </div>
              </div>

              {r.risk_level && <RiskBadge level={r.risk_level} />}
            </div>

            {r.description && (
              <p
                style={{
                  marginTop: '6px',
                  marginBottom: 0,
                  fontSize: '0.85rem',
                }}
              >
                {r.description}
              </p>
            )}

            <div
              style={{
                marginTop: '4px',
                fontSize: '0.75rem',
                color: '#9ca3af',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Status: {r.status || 'PENDING'}</span>
              {r.anonymous ? (
                <span>Anonymous</span>
              ) : (
                <span>Identified user</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportList;
