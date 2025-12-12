import React, { useState } from 'react';

function IncidentHeatmapControls({ onChange }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [zone, setZone] = useState('ALL');

  const handleApply = () => {
    if (onChange) {
      onChange({
        fromDate,
        toDate,
        zone,
      });
    }
  };

  return (
    <div className="heatmap-controls">
      <h3>Incident Heatmap Filters</h3>

      <label>
        From Date
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </label>

      <label>
        To Date
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </label>

      <label>
        Zone
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="ALL">All Zones</option>
          <option value="ZONE_A">Zone A</option>
          <option value="ZONE_B">Zone B</option>
          <option value="ZONE_C">Zone C</option>
        </select>
      </label>

      <button onClick={handleApply} style={{ marginTop: '8px' }}>
        Apply Filters
      </button>
    </div>
  );
}

export default IncidentHeatmapControls;
