import React from 'react';

interface OpportunityGaugeProps {
  level: 'High' | 'Neutral' | 'Low';
}

const OpportunityGauge: React.FC<OpportunityGaugeProps> = ({ level }) => {
  const settings = {
    High: { rotation: 60, color: 'var(--color-accent-gold-bright)', label: 'High' },
    Neutral: { rotation: 0, color: 'var(--color-text-secondary)', label: 'Neutral' },
    Low: { rotation: -60, color: '#6b7280', label: 'Low' }, // Gray-500
  };

  const { rotation, color, label } = settings[level] || settings.Neutral;

  return (
    <div className="relative w-full max-w-[200px] mx-auto flex flex-col items-center">
      <svg viewBox="0 0 100 60" className="w-full">
        {/* Arc Background */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="rgba(192, 192, 192, 0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Arc Color */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6b7280" />
                <stop offset="50%" stopColor="var(--color-text-secondary)" />
                <stop offset="100%" stopColor="var(--color-accent-gold-bright)" />
            </linearGradient>
        </defs>
        
        {/* Needle */}
        <g transform={`translate(50, 50) rotate(${rotation})`}>
          <polygon points="0,-2 -4,12 4,12" fill={color} />
          <circle cx="0" cy="0" r="4" fill={color} />
        </g>
      </svg>
      <div
        className="mt-[-10px] text-lg font-bold"
        style={{ color: color }}
      >
        {label}
      </div>
    </div>
  );
};

export default OpportunityGauge;