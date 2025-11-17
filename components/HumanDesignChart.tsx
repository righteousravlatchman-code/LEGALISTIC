import React from 'react';
import type { HumanDesign } from '../types';

// Icons
const TypeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 12L16 8"/><path d="M12 12L8 16"/><path d="M12 12L8 8"/><path d="M12 12L16 16"/></svg>;
const StrategyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 12l4-2"/><path d="M12 12l-4 2"/><path d="M12 12V7"/></svg>;
const AuthorityIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
const ProfileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const DefinitionIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20M7 2v20M17 2v20"/></svg>;
const CentersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>;


const HDInfoItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] mb-3">{icon}</div>
        <p className="font-semibold text-[var(--color-text-secondary)] text-xs uppercase tracking-wider">{label}</p>
        <p style={{fontFamily: 'var(--font-serif)'}} className="text-lg font-bold text-white">{value}</p>
    </div>
);


interface HumanDesignChartProps {
  data: HumanDesign;
}

const HumanDesignChart: React.FC<HumanDesignChartProps> = ({ data }) => {
  return (
    <div tabIndex={0} className="glass-card p-4 md:p-6 transition-all duration-300">
        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest gradient-text">Human Design Blueprint</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <HDInfoItem icon={<TypeIcon />} label="Type" value={data.type} />
            <HDInfoItem icon={<StrategyIcon />} label="Strategy" value={data.strategy} />
            <HDInfoItem icon={<AuthorityIcon />} label="Inner Authority" value={data.innerAuthority} />
            <HDInfoItem icon={<ProfileIcon />} label="Profile" value={data.profile} />
            <HDInfoItem icon={<DefinitionIcon />} label="Definition" value={data.definition} />
            <HDInfoItem icon={<CentersIcon />} label="Centers" value={data.centers} />
        </div>
        <div>
            <p className="text-sm text-[var(--color-text-secondary)] italic border-l-2 border-[var(--color-accent-gold)]/50 pl-4 leading-relaxed">
                {data.summary}
            </p>
        </div>
    </div>
  );
};

export default HumanDesignChart;