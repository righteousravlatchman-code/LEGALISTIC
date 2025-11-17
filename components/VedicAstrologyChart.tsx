import React from 'react';
import type { VedicAstrology } from '../types';

// Icons
const MoonIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
const StarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const SunriseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 18a5 5 0 00-10 0"/><path d="M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M8 6l4-4 4 4"/></svg>;
const PlanetIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><path d="M18 12a6 6 0 10-6 6"/></svg>;

interface VedicAstrologyChartProps {
  data: VedicAstrology;
}

const InfoCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center flex flex-col items-center justify-start h-full">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] mb-3 flex-shrink-0">{icon}</div>
        <p className="font-semibold text-[var(--color-text-secondary)] text-xs uppercase tracking-wider">{label}</p>
        <p style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white mt-1">{value}</p>
    </div>
);

const VedicAstrologyChart: React.FC<VedicAstrologyChartProps> = ({ data }) => {
  return (
    <div tabIndex={0} className="glass-card p-4 md:p-6 transition-all duration-300">
        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest gradient-text">Vedic Astrology (Jyotish) Blueprint</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <InfoCard icon={<MoonIcon/>} label="Rashi (Moon Sign)" value={data.rashiMoonSign} />
            <InfoCard icon={<StarIcon/>} label="Nakshatra" value={data.nakshatraLunarMansion} />
            <InfoCard icon={<SunriseIcon/>} label="Lagna (Ascendant)" value={data.lagnaAscendant} />
            <InfoCard icon={<PlanetIcon/>} label="Current Dasha" value={data.currentDashaPeriod} />
        </div>

        <div className="bg-black/20 p-4 rounded-lg border border-white/5 mb-6">
            <h4 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider mb-1">Key Planetary Influences</h4>
            <p className="text-white whitespace-pre-wrap leading-relaxed">{data.keyPlanetaryInfluences}</p>
        </div>

        <div className="border-t border-[var(--color-accent-gold)]/20 pt-4">
            <h4 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider mb-1">Strategic Guidance</h4>
            <p className="text-white whitespace-pre-wrap leading-relaxed">{data.strategicGuidance}</p>
        </div>
    </div>
  );
};

export default VedicAstrologyChart;