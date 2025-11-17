import React from 'react';
import type { MayanAstrology } from '../types';

// Icons
const DaySignIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>; // Sun/Day symbol
const ToneIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8v8m-4-4h8"/></svg>; // Number/Tone symbol

interface MayanAstrologyChartProps {
  data: MayanAstrology;
}

const MayanAstrologyChart: React.FC<MayanAstrologyChartProps> = ({ data }) => {
  return (
    <div tabIndex={0} className="glass-card p-4 md:p-6 transition-all duration-300">
        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest gradient-text">Mayan Astrology Blueprint</h3>
        
        <div className="space-y-6">
            {/* Day Sign Section */}
            <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] flex-shrink-0">{<DaySignIcon />}</div>
                    <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">Day Sign: {data.daySignName}</h4>
                </div>
                {data.daySignQualities && <p className="text-sm italic text-[var(--color-accent-gold)] mb-2">{data.daySignQualities}</p>}
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{data.daySignMeaning}</p>
            </div>
            
            {/* Galactic Tone Section */}
            <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] flex-shrink-0">{<ToneIcon />}</div>
                    <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">Galactic Tone: {data.galacticToneNumber}</h4>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{data.galacticToneMeaning}</p>
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

export default MayanAstrologyChart;