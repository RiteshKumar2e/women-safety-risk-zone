import React, { useState } from 'react';
import { analyzeRoute } from '../../services/riskService.js';
import Loader from '../common/Loader.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';

function RouteInputForm({ onResult }) {
  const [form, setForm] = useState({
    sourceLat: '',
    sourceLng: '',
    destLat: '',
    destLng: '',
    departureTime: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const departure = form.departureTime || new Date().toISOString();
      const dateObj = new Date(departure);
      const dayOfWeek = dateObj.getDay(); // 0-6

      const payload = {
        source: {
          lat: Number(form.sourceLat),
          lng: Number(form.sourceLng),
        },
        destination: {
          lat: Number(form.destLat),
          lng: Number(form.destLng),
        },
        departureTime: departure,
        dayOfWeek,
      };

      const result = await analyzeRoute(payload);
      if (onResult) onResult(result);
    } catch (err) {
      setError('Failed to analyze route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
    >
      {error && <ErrorMessage message={error} />}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
        }}
      >
        <label style={{ fontSize: '0.85rem' }}>
          Source Latitude
          <input
            type="number"
            step="0.0001"
            value={form.sourceLat}
            onChange={handleChange('sourceLat')}
            required
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
            }}
          />
        </label>

        <label style={{ fontSize: '0.85rem' }}>
          Source Longitude
          <input
            type="number"
            step="0.0001"
            value={form.sourceLng}
            onChange={handleChange('sourceLng')}
            required
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
            }}
          />
        </label>

        <label style={{ fontSize: '0.85rem' }}>
          Destination Latitude
          <input
            type="number"
            step="0.0001"
            value={form.destLat}
            onChange={handleChange('destLat')}
            required
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
            }}
          />
        </label>

        <label style={{ fontSize: '0.85rem' }}>
          Destination Longitude
          <input
            type="number"
            step="0.0001"
            value={form.destLng}
            onChange={handleChange('destLng')}
            required
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
            }}
          />
        </label>
      </div>

      <label style={{ fontSize: '0.85rem' }}>
        Departure Time
        <input
          type="datetime-local"
          value={form.departureTime}
          onChange={handleChange('departureTime')}
          style={{
            marginTop: '4px',
            width: '100%',
            padding: '6px 8px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
          }}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: '8px',
          padding: '8px 12px',
          borderRadius: '6px',
          border: 'none',
          background: '#2563eb',
          color: '#ffffff',
          fontSize: '0.9rem',
        }}
      >
        {loading ? <Loader text="Analyzing..." /> : 'Check Route Safety'}
      </button>
    </form>
  );
}

export default RouteInputForm;
