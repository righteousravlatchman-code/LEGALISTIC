import React from 'react';
import type { DailyBriefing } from '../types';
import Spinner from './Spinner';

interface DailyBriefingModalProps {
    isOpen: boolean;
    isLoading: boolean;
    briefing: DailyBriefing | null;
    contactName: string;
    onClose: () => void;
}

const XIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

const BriefingSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div>
        <h4 style={{ fontFamily: 'var(--font-serif)' }} className="font-bold text-lg text-white mb-2 flex items-center gap-2">
            <span className="text-[var(--color-accent-gold)]">{icon}</span>
            {title}
        </h4>
        <div className="text-[var(--color-text-secondary)] pl-7 leading-relaxed">{children}</div>
    </div>
);

const DailyBriefingModal: React.FC<DailyBriefingModalProps> = ({ isOpen, isLoading, briefing, contactName, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in" onClick={onClose} role="dialog" aria-modal="true">
            <div className="glass-card p-6 md:p-8 max-w-2xl w-full border-2 border-[var(--color-accent-gold-bright)] shadow-2xl shadow-[var(--color-accent-gold)]/20 animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-2xl font-bold gradient-text uppercase tracking-widest">Daily Matrix Briefing</h2>
                        <p className="text-[var(--color-text-secondary)]">For {contactName} | {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <button onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]" aria-label="Close modal"><XIcon /></button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[20rem]">
                        <Spinner />
                        <p className="mt-4 text-[var(--color-accent-gold)]">Synthesizing today's strategy...</p>
                    </div>
                ) : briefing ? (
                    <div className="space-y-6">
                        <div className="text-center bg-black/30 p-4 rounded-lg border border-[var(--color-accent-gold)]/20">
                            <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl font-bold text-white italic">"{briefing.headline}"</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <BriefingSection icon={<TargetIcon/>} title="Top 3 Strategic Priorities">
                                <ul className="space-y-3">
                                    {briefing.keyPriorities.map((item, index) => 
                                        <li key={index} className="bg-black/20 p-3 rounded-lg border-l-4 border-[var(--color-accent-gold)] flex items-start gap-3">
                                            <span className="text-[var(--color-accent-gold)] mt-1"><TargetIcon/></span>
                                            <span className="flex-1 text-white leading-relaxed">{item}</span>
                                        </li>
                                    )}
                                </ul>
                            </BriefingSection>

                            <BriefingSection icon={<AlertTriangleIcon/>} title="Potential Challenge">
                                <p>{briefing.potentialChallenge}</p>
                            </BriefingSection>

                            <BriefingSection icon={<ZapIcon/>} title="Leverage this Superpower">
                                <p>{briefing.keySuperpower}</p>
                            </BriefingSection>
                        </div>

                        <div className="text-center border-t-2 border-dashed border-[var(--color-accent-gold)]/20 pt-6">
                            <p className="text-sm text-[var(--color-text-secondary)] uppercase tracking-widest">Mantra of the Day</p>
                            <p className="text-2xl font-semibold text-[var(--color-accent-gold-bright)] italic mt-2" style={{ fontFamily: 'var(--font-serif)' }}>"{briefing.mantra}"</p>
                        </div>
                        
                        <div className="flex justify-end pt-4">
                            <button onClick={onClose} className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] hover:shadow-lg hover:shadow-yellow-900/40 text-black font-bold py-2 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]">
                                Explore Full Dashboard
                            </button>
                        </div>
                    </div>
                ) : (
                     <p className="text-red-400 text-center min-h-[20rem] flex items-center justify-center">Could not generate a briefing at this time. Please try again later.</p>
                )}
            </div>
        </div>
    );
};

export default DailyBriefingModal;