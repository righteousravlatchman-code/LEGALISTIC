import React from 'react';
import { calculatePersonalYear } from '../utils/numerology';

interface PersonalYearCycleProps {
  birthDate: string;
}

const PersonalYearCycle: React.FC<PersonalYearCycleProps> = ({ birthDate }) => {
  const currentPersonalYear = calculatePersonalYear(birthDate);
  const years = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div>
        <p className="font-semibold text-center text-[var(--color-text-secondary)] text-sm mb-4 uppercase tracking-wider">Current 9-Year Cycle</p>
        <div className="flex justify-between items-center relative w-full bg-black/30 p-2 rounded-full border border-white/10">
            <div className="absolute top-1/2 left-0 h-0.5 w-full bg-white/10 transform -translate-y-1/2"></div>
            {years.map((year) => {
                const isActive = year === currentPersonalYear;
                return (
                    <div key={year} className="relative z-10 flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                                isActive
                                ? 'bg-[var(--color-accent-gold)] text-black scale-125 shadow-lg shadow-yellow-900/50'
                                : 'bg-black/50 text-[var(--color-text-secondary)]'
                            }`}
                        >
                            {year}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default PersonalYearCycle;