
import React from 'react';
import type { AstrologicalBalance } from '../types';

const FireIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c2.21 2.79 5.26 6.34 5.26 6.34s-1.48 2.66-2.24 4.16c-.76 1.5-1.02 3.5-.02 5.5 .5 1 .5 2-1 2-1.5 0-1.5-1-2-2-.5-1-1.5-1-2-2-1.5 0-1.5-1-2-2-.5-1-1.5-1-2-2-1.5 0-1.5-1-2-2-.5-1-1.5-1-2-2-1.5 0-1.5-1-2-2C1.74 8.34 4.79 4.79 7 2c2.21 2.79 5.26 6.34 5.26 6.34z"/></svg>;
const EarthIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4-8-10c0-4.42 3.58-8 8-8s8 3.58 8 8c0 6-8 10-8 10z"/><path d="M12 2v6"/><path d="M8 8l-4 4"/><path d="M16 8l4 4"/></svg>;
const AirIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zM12 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"/></svg>;
const WaterIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"/><path d="M12 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"/></svg>;


const ElementBar: React.FC<{ icon: React.ReactNode, label: string, value: number, gradient: string }> = ({ icon, label, value, gradient }) => {
  const percentage = value * 10;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-text-secondary)]">{icon}</div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-white">{label}</span>
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">{value}/10</span>
        </div>
        <div className="w-full bg-black/50 rounded-full h-2.5 border border-white/10">
          <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundImage: gradient }}></div>
        </div>
      </div>
    </div>
  );
};

interface ElementChartProps {
  data: AstrologicalBalance;
  summary?: string;
}

const ElementChart: React.FC<ElementChartProps> = ({ data, summary }) => {
  const elements = [
    { icon: <FireIcon />, label: 'Fire', value: data.fire, gradient: 'linear-gradient(to right, #ffd700, #d4af37)' },
    { icon: <EarthIcon />, label: 'Earth', value: data.earth, gradient: 'linear-gradient(to right, #c0c0c0, #808080)' },
    { icon: <AirIcon />, label: 'Air', value: data.air, gradient: 'linear-gradient(to right, #6366f1, #4f46e5)' },
    { icon: <WaterIcon />, label: 'Water', value: data.water, gradient: 'linear-gradient(to right, #a855f7, #9333ea)' },
  ];

  return (
    <div>
      <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white mb-4">Elemental Balance</h4>
      {summary && (
        <p className="text-[var(--color-text-secondary)] mb-6 text-sm italic border-l-2 border-[var(--color-accent-gold)]/50 pl-4">
            {summary}
        </p>
      )}
      <div className="space-y-4">
        {elements.map(el => (
          <ElementBar key={el.label} {...el} />
        ))}
      </div>
    </div>
  );
};

export default ElementChart;