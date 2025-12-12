import React from 'react';
import { useMapFilters } from '../../context/MapContext.jsx';
import { daysOfWeek } from '../../utils/timeUtils.js';

function TimeFilterControls() {
  const { selectedTime, setSelectedTime } = useMapFilters();

  const handleHourChange = (e) => {
    setSelectedTime((prev) => ({ ...prev, hour: Number(e.target.value) }));
  };

  const handleDayChange = (e) => {
    setSelectedTime((prev) => ({
      ...prev,
      dayOfWeek: Number(e.target.value),
    }));
  };

  // Quick preset buttons with icons
  const timePresets = [
    { label: 'Morning', time: '6 AM', hour: 6, icon: '🌅' },
    { label: 'Afternoon', time: '2 PM', hour: 14, icon: '☀️' },
    { label: 'Evening', time: '6 PM', hour: 18, icon: '🌆' },
    { label: 'Night', time: '10 PM', hour: 22, icon: '🌙' },
    { label: 'Late Night', time: '2 AM', hour: 2, icon: '🌃' },
  ];

  const setPresetTime = (hour) => {
    setSelectedTime((prev) => ({ ...prev, hour }));
  };

  // Get current time display
  const getTimeDisplay = (hour) => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  };

  // Risk indicator based on time - matches zone risk colors
  const getRiskIndicator = (hour) => {
    if (hour >= 22 || hour <= 4) 
      return { 
        color: '#dc2626', 
        bg: '#fee2e2',
        label: 'High Risk Period',
        icon: '🔴'
      };
    if (hour >= 18 || hour <= 6) 
      return { 
        color: '#f59e0b',
        bg: '#fef3c7', 
        label: 'Moderate Risk Period',
        icon: '🟡'
      };
    return { 
      color: '#16a34a',
      bg: '#dcfce7', 
      label: 'Lower Risk Period',
      icon: '🟢'
    };
  };

  const riskInfo = getRiskIndicator(selectedTime.hour);

  // Get risk factors for current time
  const getTimeRiskFactors = (hour) => {
    const factors = [];
    if (hour >= 22 || hour <= 4) {
      factors.push({ icon: '🚨', text: 'Peak crime hours' });
      factors.push({ icon: '🌙', text: 'Limited visibility' });
      factors.push({ icon: '👥', text: 'Fewer people around' });
    } else if (hour >= 18 || hour <= 6) {
      factors.push({ icon: '⚠️', text: 'Reduced activity' });
      factors.push({ icon: '💡', text: 'Variable lighting' });
    } else {
      factors.push({ icon: '✅', text: 'High activity period' });
      factors.push({ icon: '☀️', text: 'Good visibility' });
    }
    return factors;
  };

  const timeFactors = getTimeRiskFactors(selectedTime.hour);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Current Time Display - Enhanced with gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '14px 16px',
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
        }}
      >
        <div style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '4px', fontWeight: 500 }}>
          Selected Time
        </div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
          {getTimeDisplay(selectedTime.hour)}
        </div>
        <div style={{ fontSize: '0.85rem', marginTop: '6px', opacity: 0.9, fontWeight: 500 }}>
          {daysOfWeek.find(d => d.value === selectedTime.dayOfWeek)?.label}
        </div>
      </div>

      {/* Risk Indicator - Styled like zone popup */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '10px',
          background: riskInfo.bg,
          border: `2px solid ${riskInfo.color}`,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: riskInfo.color,
            boxShadow: `0 0 10px ${riskInfo.color}`,
            animation: 'pulse 2s infinite',
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: riskInfo.color }}>
            {riskInfo.label}
          </div>
        </div>
        <span style={{ fontSize: '1.2rem' }}>{riskInfo.icon}</span>
      </div>

      {/* Time Factors - Similar to zone risk factors */}
      <div style={{ 
        padding: '12px',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ 
          fontSize: '0.8rem', 
          fontWeight: 600,
          color: '#374151',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          ⏰ Time Factors
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {timeFactors.map((factor, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                background: 'white',
                borderRadius: '6px',
                fontSize: '0.8rem',
                border: '1px solid #e5e7eb'
              }}
            >
              <span style={{ fontSize: '1rem' }}>{factor.icon}</span>
              <span style={{ color: '#4b5563' }}>{factor.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Time Presets - Enhanced with icons */}
      <div>
        <label style={{ 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: '#374151', 
          marginBottom: '8px', 
          display: 'block' 
        }}>
          Quick Time Select
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {timePresets.map((preset) => {
            const isSelected = selectedTime.hour === preset.hour;
            return (
              <button
                key={preset.hour}
                onClick={() => setPresetTime(preset.hour)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #667eea' : '1px solid #e5e7eb',
                  background: isSelected ? '#667eea' : 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? 'white' : '#374151',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: isSelected ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.transform = 'translateX(2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.background = 'white';
                    e.target.style.transform = 'translateX(0)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.1rem' }}>{preset.icon}</span>
                  <span>{preset.label}</span>
                </div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  opacity: isSelected ? 0.9 : 0.6,
                  fontWeight: 500 
                }}>
                  {preset.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hour Slider - Enhanced */}
      <div>
        <label style={{ 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: '#374151', 
          marginBottom: '8px', 
          display: 'block' 
        }}>
          Hour of Day: <span style={{ color: '#667eea' }}>{getTimeDisplay(selectedTime.hour)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="23"
          value={selectedTime.hour}
          onChange={handleHourChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            outline: 'none',
            cursor: 'pointer',
            background: `linear-gradient(to right, #667eea 0%, #667eea ${(selectedTime.hour / 23) * 100}%, #e5e7eb ${(selectedTime.hour / 23) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '6px', 
          fontSize: '0.7rem', 
          color: '#6b7280',
          fontWeight: 500 
        }}>
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>11 PM</span>
        </div>
      </div>

      {/* Day of Week Selector - Enhanced */}
      <div>
        <label style={{ 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: '#374151', 
          marginBottom: '8px', 
          display: 'block' 
        }}>
          Day of Week
        </label>
        <select
          value={selectedTime.dayOfWeek}
          onChange={handleDayChange}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: 'white',
            fontWeight: 500,
            color: '#374151',
          }}
        >
          {daysOfWeek.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Day Buttons Grid - Enhanced */}
      <div>
        <label style={{ 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: '#374151', 
          marginBottom: '8px', 
          display: 'block' 
        }}>
          Quick Day Select
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {daysOfWeek.map((day) => {
            const isSelected = selectedTime.dayOfWeek === day.value;
            return (
              <button
                key={day.value}
                onClick={() => setSelectedTime((prev) => ({ ...prev, dayOfWeek: day.value }))}
                style={{
                  padding: '10px 6px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #667eea' : '1px solid #e5e7eb',
                  background: isSelected ? '#667eea' : 'white',
                  color: isSelected ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 2px 6px rgba(102, 126, 234, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.background = 'white';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                {day.label.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Box - Styled like zone popup footer */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '8px',
          background: '#eff6ff',
          borderLeft: '3px solid #3b82f6',
          fontSize: '0.78rem',
          color: '#1e40af',
          lineHeight: '1.5',
        }}
      >
        <strong>💡 Tip:</strong> Risk levels vary by time of day. Late night hours (10 PM - 4 AM) 
        typically show higher risk scores across zones. Stay alert and follow safety recommendations.
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
          transition: all 0.2s;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 3px 10px rgba(102, 126, 234, 0.6);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
          transition: all 0.2s;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 3px 10px rgba(102, 126, 234, 0.6);
        }
      `}</style>
    </div>
  );
}

export default TimeFilterControls;