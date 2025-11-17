import React from 'react';

interface RadarChartProps {
  data: {
    logic: number;
    creativity: number;
    intuition: number;
    structure: number;
    social: number;
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 280;
  const center = size / 2;
  const radius = size * 0.4;
  const labels = ['Logic', 'Creative', 'Intuition', 'Structure', 'Social'];
  const dataPoints = [data.logic, data.creativity, data.intuition, data.structure, data.social];
  const numLevels = 5;
  const angleSlice = (Math.PI * 2) / labels.length;

  const getPoint = (value: number, index: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = (radius * value) / 10;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = Array.from({ length: numLevels }, (_, i) => {
    const levelRadius = (radius / numLevels) * (i + 1);
    const points = labels.map((_, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
    }).join(' ');
    return <polygon key={i} points={points} fill="none" stroke="rgba(192, 192, 192, 0.2)" />;
  });

  const axes = labels.map((_, index) => {
    const endPoint = getPoint(10, index);
    return <line key={index} x1={center} y1={center} x2={endPoint.x} y2={endPoint.y} stroke="rgba(192, 192, 192, 0.2)" />;
  });

  const axisLabels = labels.map((label, index) => {
    const point = getPoint(11.5, index);
    return (
      <text
        key={index}
        x={point.x}
        y={point.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-text-secondary)"
        fontSize="12"
        className="font-semibold"
      >
        {label}
      </text>
    );
  });

  const dataPolygonPoints = dataPoints.map((value, index) => {
    const point = getPoint(value, index);
    return `${point.x},${point.y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[300px] mx-auto">
      <defs>
        <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-gold)" />
          <stop offset="100%" stopColor="var(--color-accent-gold-bright)" />
        </linearGradient>
      </defs>
      <g>
        {gridLevels}
        {axes}
        {axisLabels}
        <polygon
          points={dataPolygonPoints}
          fill="rgba(212, 175, 55, 0.2)"
          stroke="url(#radar-gradient)"
          strokeWidth="2"
        />
        {dataPoints.map((value, index) => {
            const point = getPoint(value, index);
            return <circle key={index} cx={point.x} cy={point.y} r="4" fill="url(#radar-gradient)" />;
        })}
      </g>
    </svg>
  );
};

export default RadarChart;