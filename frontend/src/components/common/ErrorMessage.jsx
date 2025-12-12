import React from 'react';

function ErrorMessage({ message = 'Something went wrong.' }) {
  return (
    <div
      style={{
        background: '#fee2e2',
        color: '#991b1b',
        borderRadius: '6px',
        padding: '10px 12px',
        fontSize: '0.9rem',
        margin: '8px 0',
      }}
    >
      {message}
    </div>
  );
}

export default ErrorMessage;
