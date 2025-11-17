import React, { useMemo } from 'react';
import type { CrmReport, Contact, HeatmapDataPoint } from '../types';

interface HeatmapProps {
  report: CrmReport;
  contact: Contact;
}

// A simple pseudo-random generator for consistent "randomness" per user/day
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const reduceToSingleDigit = (n: number): number => {
    let sum = n;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return sum;
};

const generateHeatmapData = (contact: Contact): HeatmapDataPoint[] => {
    const data: HeatmapDataPoint[] = [];
    const year = new Date().getFullYear();
    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(year, 11, 31));
    
    const lifePathNumber = contact.report?.coreNumbers?.lifePathNumber?.number 
        ? parseInt(contact.report.coreNumbers.lifePathNumber.number.split('/')[0]) 
        : null;

    for (let d = new Date(startDate); d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        const seed = d.getTime() + parseInt(contact.id.replace(/\D/g,'') || '1');
        
        let level = Math.floor(pseudoRandom(seed) * 4); // Base level 0-3

        const day = d.getUTCDate();
        const month = d.getUTCMonth() + 1;
        const reducedYear = reduceToSingleDigit(year);
        const personalDay = reduceToSingleDigit(reduceToSingleDigit(day) + reduceToSingleDigit(month) + reducedYear);
        
        if (lifePathNumber && personalDay === lifePathNumber) {
            level = 4; // Max out level on life path alignment days
        } else if (level < 4 && pseudoRandom(seed + 1) > 0.9) {
            level += 1; // Randomly boost some other days
        }

        data.push({ date: dateString, level });
    }
    return data;
};

const Heatmap: React.FC<HeatmapProps> = ({ report, contact }) => {
    const heatmapData = useMemo(() => generateHeatmapData(contact), [contact]);

    const year = new Date().getFullYear();
    const startDate = new Date(Date.UTC(year, 0, 1));
    const firstDayOfWeek = (startDate.getUTCDay() + 6) % 7; // Monday is 0

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const colorScale = [
        'rgba(var(--color-bg-primary-rgba), 0.8)', // Level 0
        'rgba(var(--color-accent-indigo-rgba), 0.3)', // Level 1
        'rgba(var(--color-accent-indigo-rgba), 0.7)', // Level 2
        'rgba(255, 171, 0, 0.6)', // Level 3 (Gold)
        'rgba(255, 215, 64, 1)', // Level 4 (Bright Gold)
    ];

    const dayCells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
        dayCells.push(<div key={`pad-${i}`} />);
    }

    heatmapData.forEach((day, index) => {
        dayCells.push(
            <div 
                key={index} 
                className="relative group w-4 h-4 rounded-sm" 
                style={{ backgroundColor: colorScale[day.level] }}
            >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap">
                    {day.date} - Opportunity: {day.level}
                </div>
            </div>
        );
    });

    return (
        <div className="glass-card p-4 md:p-6 animate-slide-up">
            <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold mb-4 uppercase tracking-widest gradient-text">Annual Energetic Matrix</h3>
            
            <div className="flex justify-center">
                <div className="flex gap-3">
                    <div className="grid grid-rows-7 gap-1 text-xs text-right text-[var(--color-text-secondary)] mt-7 flex-shrink-0">
                        <div className="h-4 leading-4">M</div>
                        <div className="h-4 leading-4"></div>
                        <div className="h-4 leading-4">W</div>
                        <div className="h-4 leading-4"></div>
                        <div className="h-4 leading-4">F</div>
                        <div className="h-4 leading-4"></div>
                        <div className="h-4 leading-4"></div>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-53 gap-x-3 mb-1">
                             {monthLabels.map((month, i) => {
                                const monthStartDate = new Date(year, i, 1);
                                const dayOfYear = (monthStartDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
                                const weekIndex = Math.floor((dayOfYear + firstDayOfWeek) / 7);
                                return (
                                    <div key={month} className="text-xs text-[var(--color-text-secondary)]" style={{ gridColumn: weekIndex + 1 }}>
                                        {month}
                                    </div>
                                );
                             })}
                        </div>
                        <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                            {dayCells}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-2 mt-4 text-xs text-[var(--color-text-secondary)]">
                <span>Low</span>
                {colorScale.map((color, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                ))}
                <span className="text-white">High</span>
            </div>
        </div>
    );
};

export default Heatmap;
