import React, { useState, useEffect } from 'react';

function ReportFilter({ onFilterChange }) {
  const [category, setCategory] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Call parent whenever filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        category: category === 'ALL' ? undefined : category,
        status: status === 'ALL' ? undefined : status,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
      });
    }
  }, [category, status, fromDate, toDate, onFilterChange]);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '10px',
        fontSize: '0.9rem',
      }}
    >
      {/* Category filter */}
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Category
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            marginTop: '4px',
            padding: '6px 8px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            minWidth: '150px',
          }}
        >
          <option value="ALL">All</option>
          <option value="harassment">Harassment</option>
          <option value="poor_lighting">Poor Lighting</option>
          <option value="suspicious_gatherings">Suspicious Gatherings</option>
          <option value="past_incident">Past Incident</option>
        </select>
      </label>

      {/* Status filter */}
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Status
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            marginTop: '4px',
            padding: '6px 8px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            minWidth: '130px',
          }}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </label>

      {/* From date */}
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        From
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{
            marginTop: '4px',
            padding: '6px 8px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
          }}
        />
      </label>

      {/* To date */}
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        To
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{
            marginTop: '4px',
            padding: '6px 8px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
          }}
        />
      </label>
    </div>
  );
}

export default ReportFilter;
