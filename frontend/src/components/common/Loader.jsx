import React from 'react';

function Loader({ text = 'Loading...' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.95rem',
        color: '#374151',
      }}
    >
      <span
        style={{
          width: '14px',
          height: '14px',
          border: '2px solid #d1d5db',
          borderTop: '2px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {text}

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
