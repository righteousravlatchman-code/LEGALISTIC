import React from 'react';
import type { CoreNumberValue } from '../types';

interface CoreNumberCardProps {
  label: string;
  value: string | CoreNumberValue;
  large?: boolean;
}

const CoreNumberCard: React.FC<CoreNumberCardProps> = ({ label, value, large = false }) => {
  const isObjectValue = typeof value === 'object' && value !== null && 'number' in value;
  const displayValue = isObjectValue ? value.number : value as string;
  const summary = isObjectValue ? value.summary : '';

  if (large) {
    return (
      <div className="bg-black/20 p-6 rounded-2xl border border-[var(--color-accent-gold)]/30 text-center flex flex-col items-center h-full shadow-lg">
        <p className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">{label}</p>
        <p style={{fontFamily: 'var(--font-serif)'}} className="text-5xl font-bold gradient-text leading-none">{displayValue}</p>
        <p className="text-white mt-4 text-base leading-relaxed">{summary}</p>
      </div>
    );
  }
  
  const mainValue = displayValue.split(' ')[0] || displayValue;
  const subValue = displayValue.includes(' ') ? displayValue.substring(displayValue.indexOf(' ')) : '';
  
  return (
    <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-center flex flex-col justify-center items-center h-full shadow-md">
      <p style={{fontFamily: 'var(--font-serif)'}} className="text-3xl sm:text-4xl font-bold text-[var(--color-accent-gold)] leading-none">{mainValue}</p>
      {subValue && <p className="text-xs text-[var(--color-text-secondary)]">{subValue.trim()}</p>}
      <p className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mt-2">{label}</p>
    </div>
  );
};

export default CoreNumberCard;