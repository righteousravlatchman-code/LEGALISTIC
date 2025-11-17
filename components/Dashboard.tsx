
import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { CrmReport, Contact } from '../types';
import DosAndDonts from './DosAndDonts';
import CoreNumberCard from './CoreNumberCard';
import RadarChart from './RadarChart';
import ElementChart from './ElementChart';
import Avatar from './Avatar';
import HumanDesignChart from './HumanDesignChart';
import ArabicEsotericsChart from './ArabicEsotericsChart';
import MayanAstrologyChart from './MayanAstrologyChart';
import AztecAstrologyChart from './AztecAstrologyChart';
import EgyptianAstrologyChart from './EgyptianAstrologyChart';
import VedicAstrologyChart from './VedicAstrologyChart';
import ChineseZodiacChart from './ChineseZodiacChart';
import JapaneseZodiacChart from './JapaneseZodiacChart';
import Heatmap from './Heatmap';
import OpportunityGauge from './OpportunityGauge';
import PersonalYearCycle from './PersonalYearCycle';

interface DashboardProps {
  report: CrmReport;
  contact: Contact;
  onSaveAsArchetype: () => void;
  isViewingArchetype: boolean;
  isExporting: boolean;
}

// Icons
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
const InfluenceIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M12 12l4 4"/><path d="M16 12l-4 4"/><path d="M12 12V7"/></svg>;
const GrowthIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20v-2a4 4 0 0 1 4-4h12"/><path d="M4 12V8a4 4 0 0 1 4-4h12"/><path d="M4 4v2"/><path d="M8 4v2"/><path d="M12 4v2"/><path d="M16 4v2"/></svg>;
const TimingIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const ToneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative text-left mb-6 animate-in">
        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl md:text-3xl font-bold uppercase tracking-widest gradient-text">
            {children}
        </h3>
        <div className="absolute left-0 -bottom-1 h-0.5 w-24 bg-gradient-to-r from-[var(--color-accent-gold)] to-transparent" aria-hidden="true"></div>
    </div>
);

const ActionableCard: React.FC<{ label: string; value: string | undefined; icon?: React.ReactNode; }> = ({ label, value, icon }) => (
    <div className={`glass-card p-6 flex flex-col h-full animate-slide-up transition-all duration-300 hover:border-[var(--color-accent-gold)]/50 hover:-translate-y-1`}>
      <div className="flex items-center gap-3 mb-3">
        {icon && <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[var(--color-accent-gold)] bg-black/30">{icon}</div>}
        <h4 className="font-semibold text-[var(--color-text-secondary)]/80 text-sm uppercase tracking-widest flex-1">{label}</h4>
      </div>
      <p className="text-[var(--color-text-primary)] whitespace-pre-wrap text-base md:text-lg flex-1 leading-relaxed">{value || 'N/A'}</p>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ report, contact, onSaveAsArchetype, isViewingArchetype, isExporting }) => {
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const [activeSection, setActiveSection] = useState('briefing');

    const sections = useMemo(() => [
        { id: 'briefing', title: 'Executive Briefing' },
        { id: 'actionable', title: 'Actionable Intelligence' },
        { id: 'identity', title: 'Core Identity' },
        { id: 'deep-dive', title: 'Esoteric Deep Dive' },
        { id: 'financial', title: 'Financial Matrix' },
        { id: 'annual', title: 'Annual Matrix' },
    ], []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
        );

        sections.forEach(({ id }) => {
            const el = sectionRefs.current[id];
            if (el) observer.observe(el);
        });

        return () => {
            sections.forEach(({ id }) => {
                const el = sectionRefs.current[id];
                if (el) observer.unobserve(el);
            });
        };
    }, [sections]);
    
    const allSections = (
        <div className="space-y-16">
            <section id="briefing" ref={el => sectionRefs.current['briefing'] = el} className="scroll-mt-24">
                <div className="text-center p-6 md:p-8 glass-card flex flex-col items-center animate-slide-up">
                    <Avatar contact={contact} size="lg" />
                    <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mt-4">{contact.name}</h2>
                    <p className="text-xl md:text-2xl text-[var(--color-accent-gold)] mt-1" style={{ fontFamily: 'var(--font-serif)' }}>{report.identityLayer.archetypeTitle}</p>
                    <p className="text-md text-[var(--color-text-secondary)] mt-2 text-center max-w-2xl mx-auto leading-relaxed">{report.identityLayer.coreFrequencyColor}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                    <div className="lg:col-span-3 glass-card p-6 space-y-4">
                        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white">Life Path Narrative</h3>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">{report.whyTheyAreLikeThis.lifePathStorySummary}</p>
                         <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white pt-4 border-t border-[var(--color-accent-gold)]/20">Emotional Strategy (Moon)</h4>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">{report.whyTheyAreLikeThis.moonStory}</p>
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-card p-6">
                            <OpportunityGauge level={report.whatToDoWithThem.opportunityLevel} />
                        </div>
                        <div className="glass-card p-6">
                            <PersonalYearCycle birthDate={contact.birthDate} />
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="actionable" ref={el => sectionRefs.current['actionable'] = el} className="scroll-mt-24">
                <SectionHeader>Actionable Intelligence</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <ActionableCard label="Best Way to Influence" value={report.whatToDoWithThem.bestWayToInfluence} icon={<InfluenceIcon />} />
                    <ActionableCard label="Suggested Messaging Tone" value={report.energeticWeather.suggestedMessagingTone} icon={<ToneIcon />} />
                    <ActionableCard label="Relationship Growth Path" value={report.whatToDoWithThem.relationshipGrowthPath} icon={<GrowthIcon />} />
                    <ActionableCard label="Timing Recommendations" value={report.whatToDoWithThem.timingRecommendations} icon={<TimingIcon />} />
                </div>
                <DosAndDonts text={report.whatToDoWithThem.doAndDonotApproaches} />
            </section>

            <section id="identity" ref={el => sectionRefs.current['identity'] = el} className="scroll-mt-24">
                <SectionHeader>Core Identity</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <CoreNumberCard label="Life Path" value={report.coreNumbers.lifePathNumber} large />
                    <CoreNumberCard label="Expression" value={report.coreNumbers.expressionNumber} large />
                    <CoreNumberCard label="Soul Urge" value={report.coreNumbers.soulUrgeNumber} large />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {report.whyTheyAreLikeThis.personalityArchetype && (
                        <div className="glass-card p-4 md:p-6">
                            <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white text-center mb-4">Personality Archetype</h4>
                            <RadarChart data={report.whyTheyAreLikeThis.personalityArchetype} />
                        </div>
                    )}
                    {report.whyTheyAreLikeThis.astrologicalBalance && (
                        <div className="glass-card p-4 md:p-6">
                             <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white text-center mb-4">Elemental Balance</h4>
                            <ElementChart data={report.whyTheyAreLikeThis.astrologicalBalance} summary={report.whyTheyAreLikeThis.astrologicalBalanceSummary} />
                        </div>
                    )}
                </div>
            </section>
            
            <section id="deep-dive" ref={el => sectionRefs.current['deep-dive'] = el} className="scroll-mt-24">
                 <SectionHeader>Esoteric Deep Dive</SectionHeader>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {report.whyTheyAreLikeThis.humanDesign && <HumanDesignChart data={report.whyTheyAreLikeThis.humanDesign} />}
                    {report.whyTheyAreLikeThis.arabicEsoterics && <ArabicEsotericsChart data={report.whyTheyAreLikeThis.arabicEsoterics} />}
                    {report.whyTheyAreLikeThis.mayanAstrology && <MayanAstrologyChart data={report.whyTheyAreLikeThis.mayanAstrology} />}
                    {report.whyTheyAreLikeThis.aztecAstrology && <AztecAstrologyChart data={report.whyTheyAreLikeThis.aztecAstrology} />}
                    {report.whyTheyAreLikeThis.egyptianAstrology && <EgyptianAstrologyChart data={report.whyTheyAreLikeThis.egyptianAstrology} />}
                    {report.whyTheyAreLikeThis.vedicAstrology && <VedicAstrologyChart data={report.whyTheyAreLikeThis.vedicAstrology} />}
                    {report.whyTheyAreLikeThis.chineseZodiac && <ChineseZodiacChart data={report.whyTheyAreLikeThis.chineseZodiac} />}
                    {report.whyTheyAreLikeThis.japaneseZodiac && <JapaneseZodiacChart data={report.whyTheyAreLikeThis.japaneseZodiac} />}
                 </div>
            </section>

            {report.financialMatrix && (
                 <section id="financial" ref={el => sectionRefs.current['financial'] = el} className="scroll-mt-24">
                    <SectionHeader>Financial Matrix</SectionHeader>
                     <div className="glass-card p-6 space-y-6">
                        <div className="text-center">
                            <h3 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider">Wealth Code</h3>
                            <p style={{fontFamily: 'var(--font-serif)'}} className="text-5xl font-bold gradient-text my-2">{report.financialMatrix.wealthCodeNumber}</p>
                            <p className="text-white max-w-xl mx-auto">{report.financialMatrix.wealthCodeSummary}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ActionableCard label="Investment Archetype" value={report.financialMatrix.investmentArchetype} />
                            <ActionableCard label="Current Financial Cycle" value={report.financialMatrix.financialCycleTheme} />
                        </div>
                        <div>
                             <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white mb-3">Strategic Advice</h4>
                            <ul className="space-y-2">
                                {report.financialMatrix.strategicAdvice.map((advice, index) => (
                                    <li key={index} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                                        <span className="text-[var(--color-accent-gold)] mt-1">✓</span>
                                        <span>{advice}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}
           
             <section id="annual" ref={el => sectionRefs.current['annual'] = el} className="scroll-mt-24">
                <SectionHeader>Annual Energetic Matrix</SectionHeader>
                <Heatmap report={report} contact={contact} />
            </section>
        </div>
    );

    if (isExporting) {
        return <div className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto report-print-view">{allSections}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="hidden lg:block lg:w-64 lg:sticky top-20 self-start">
                <nav className="space-y-2 p-4 glass-card">
                    <h3 className="font-bold text-white px-2 mb-2">Report Sections</h3>
                    {sections.map(({ id, title }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                activeSection === id
                                    ? 'bg-[var(--color-accent-gold)] text-black'
                                    : 'text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {title}
                            {activeSection === id && <ArrowRightIcon />}
                        </a>
                    ))}
                </nav>
                {!isViewingArchetype && (
                     <button 
                        onClick={onSaveAsArchetype}
                        className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                    >
                        <SaveIcon />
                        Save as Archetype
                    </button>
                )}
            </aside>
            <main className="flex-1 min-w-0">
                <nav className="lg:hidden sticky top-20 bg-[var(--color-bg-primary)]/80 backdrop-blur-md z-30 py-2 -mx-4 md:-mx-8 mb-6 border-b border-[var(--color-accent-gold)]/20">
                     <div className="flex overflow-x-auto space-x-2 hide-scrollbar px-4 md:px-8">
                        {sections.map(({ id, title }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    activeSection === id
                                        ? 'bg-[var(--color-accent-gold)] text-black'
                                        : 'bg-black/30 text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {title}
                            </a>
                        ))}
                    </div>
                </nav>
                {allSections}
            </main>
        </div>
    );
};

export default Dashboard;