

import React from 'react';
import type { EgyptianAstrology } from '../types';

// Icons
const AnkhIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4a4 4 0 01-4 4H6a4 4 0 01-4-4V2a4 4 0 014-4h2a4 4 0 014 4zM12 10v12"/></svg>; // Simplified Ankh
const DeityIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2 7h-4l2-7zM12 9v13m-4-6h8"/></svg>; // Abstract figure/deity
const PapyrusIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4v16h16V4H4z"/><path d="M8 8h8M8 12h8M8 16h4"/></svg>; // Scroll/Characteristics


interface EgyptianAstrologyChartProps {
  data: EgyptianAstrology;
}

const EgyptianAstrologyChart: React.FC<EgyptianAstrologyChartProps> = ({ data }) => {
  return (
    <div tabIndex={0} className="glass-card p-4 md:p-6 transition-all duration-300">
        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest gradient-text">Egyptian Astrology Blueprint</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 p-4 rounded-lg border border-white/5 flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] mb-3">{<AnkhIcon />}</div>
                <p className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider">Your Egyptian Sign</p>
                <p style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white">{data.signName}</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-white/5 flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] mb-3">{<DeityIcon />}</div>
                <p className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider">Ruling Deity</p>
                <p style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white">{data.rulingDeity}</p>
            </div>
        </div>
        
        <div className="mt-6 bg-black/20 p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] flex-shrink-0">{<PapyrusIcon />}</div>
                <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">Key Characteristics</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {data.keyCharacteristics.split(',').map((char, index) => (
                    <span key={index} className="bg-black/40 text-[var(--color-text-secondary)] text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                        {char.trim()}
                    </span>
                ))}
            </div>
        </div>

        <div className="border-t border-[var(--color-accent-gold)]/20 pt-4 mt-6">
            <h4 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider mb-1">Strategic Guidance</h4>
            <p className="text-white whitespace-pre-wrap leading-relaxed">{data.strategicGuidance}</p>
        </div>
    </div>
  );
};

export default EgyptianAstrologyChart;