import React from 'react';

const Spinner: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <div role="status" style={{ width: size, height: size }}>
      <svg
        className="animate-spin"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-gold-bright)" />
            <stop offset="100%" stopColor="var(--color-accent-gold)" />
          </linearGradient>
        </defs>
        <path
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          stroke="rgba(255, 171, 0, 0.2)"
          strokeWidth="10"
          fill="none"
        />
        <path
          d="M 50,50 m 0,-45 a 45,45 0 0 1 28,78"
          stroke="url(#spinner-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;