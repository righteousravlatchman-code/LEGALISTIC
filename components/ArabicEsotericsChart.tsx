import React from 'react';
import type { ArabicEsoterics } from '../types';

// Icons
const AbjadIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>; // Represents 'Alif'
const PlanetIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 00-10 10"/></svg>;
const ElementIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>; // A crystal/gem shape

const EsotericInfoItem: React.FC<{ icon: React.ReactNode, label: string, value: string | number }> = ({ icon, label, value }) => (
    <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center flex flex-col items-center justify-center h-full">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] mb-3">{icon}</div>
        <p className="font-semibold text-[var(--color-text-secondary)] text-xs uppercase tracking-wider">{label}</p>
        <p style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">{value}</p>
    </div>
);


interface ArabicEsotericsChartProps {
  data: ArabicEsoterics;
}

const ArabicEsotericsChart: React.FC<ArabicEsotericsChartProps> = ({ data }) => {
  return (
    <div tabIndex={0} className="glass-card p-4 md:p-6 transition-all duration-300">
        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest gradient-text">Arabic Esoteric Blueprint</h3>
        
        <div className="text-center mb-6 bg-black/20 p-4 rounded-lg border border-white/5">
             <p className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider">Esoteric Quality</p>
             <p style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white italic">"{data.esotericQuality}"</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <EsotericInfoItem icon={<AbjadIcon />} label="Abjad Value" value={data.abjadValue} />
            <EsotericInfoItem icon={<PlanetIcon />} label="Ruling Planet" value={data.rulingPlanet} />
            <EsotericInfoItem icon={<ElementIcon />} label="Dominant Element" value={data.dominantElement} />
        </div>

        <div className="space-y-4">
             <div>
                <h4 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider mb-1">Name Vibration</h4>
                <p className="text-white whitespace-pre-wrap leading-relaxed">{data.abjadNameMeaning}</p>
            </div>
             <div className="border-t border-[var(--color-accent-gold)]/20 pt-4">
                <h4 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider mb-1">Strategic Guidance</h4>
                <p className="text-white whitespace-pre-wrap leading-relaxed">{data.strategicGuidance}</p>
            </div>
        </div>
    </div>
  );
};

export default ArabicEsotericsChart;