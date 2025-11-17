import React from 'react';
import type { AztecAstrology } from '../types';

// Icons
const TrecenaIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z"/><path d="M3 8h18M8 3v18"/></svg>; // Calendar Grid
const DaySignIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l4 4-4 4-4-4 4-4zM2 12l4 4-4 4-4-4 4-4zM18 12l4 4-4 4-4-4 4-4z"/></svg>; // Glyph symbol
const NightLordIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/><path d="M12 10s-4 4-4 8h8c0-4-4-8-4-8z"/></svg>; // Moon with figure

interface AztecAstrologyChartProps {
  data: AztecAstrology;
}

const AztecAstrologyChart: React.FC<AztecAstrologyChartProps> = ({ data }) => {
  return (
    <div tabIndex={0} className="glass-card p-4 md:p-6 transition-all duration-300">
        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest gradient-text">Aztec Astrology Blueprint</h3>
        
        <div className="space-y-6">
            {/* Trecena Section */}
            <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] flex-shrink-0">{<TrecenaIcon />}</div>
                    <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">Trecena: {data.trecenaName}</h4>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{data.trecenaMeaning}</p>
            </div>
            
            {/* Day Sign Section */}
            <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] flex-shrink-0">{<DaySignIcon />}</div>
                    <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">Day Sign: {data.daySignName}</h4>
                </div>
                {data.daySignQualities && <p className="text-sm italic text-[var(--color-accent-gold)] mb-2">{data.daySignQualities}</p>}
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{data.daySignMeaning}</p>
            </div>

            {/* Lord of the Night Section */}
            <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] flex-shrink-0">{<NightLordIcon />}</div>
                    <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">Lord of the Night: {data.lordOfTheNight}</h4>
                </div>
                {data.lordOfTheNightInfluence && <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{data.lordOfTheNightInfluence}</p>}
            </div>
        </div>

        {/* Final Summary */}
        <div className="border-t border-[var(--color-accent-gold)]/20 pt-4 mt-6">
            <h4 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider mb-1">Strategic Summary</h4>
            <p className="text-white whitespace-pre-wrap leading-relaxed">{data.summary}</p>
        </div>
    </div>
  );
};

export default AztecAstrologyChart;