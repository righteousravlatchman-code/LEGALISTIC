import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Contact, SynergyReport, CrmView, DailyBriefing, CrmReport, ArchetypeTemplate, PairwiseAnalysis, SynergyBreakdown } from '../types';
import { generateCrmReport, generateSynergyReport, generateDailyBriefing } from '../services/geminiService';
import { exportToPdf } from '../services/pdfService';
import { getVietnameseZodiac } from '../utils/numerology';
import { supabase } from '../services/supabase';
import Dashboard from './Dashboard';
import Spinner from './Spinner';
import Avatar from './Avatar';
import NumerologyGuide from './NumerologyGuide';
import DailyBriefingModal from './DailyBriefingModal';
import SaveTemplateModal from './SaveTemplateModal';
import EgyptianAstrologyAnalyzer from './EgyptianAstrologyAnalyzer';
import AztecAstrologyAnalyzer from './AztecAstrologyAnalyzer';
import VedicAstrologyAnalyzer from './VedicAstrologyAnalyzer';
import JapaneseZodiacAnalyzer from './JapaneseZodiacAnalyzer';
import BulkUploadModal from './BulkUploadModal';
import ContactModal from './ContactModal';
import VietnameseZodiacIcon from './VietnameseZodiacIcon';
import ComparisonAnalyzer from './ComparisonAnalyzer';
import ArabicEsotericsAnalyzer from './ArabicEsotericsAnalyzer';


const PlusIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const ArrowLeftIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const XIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const EditIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const DownloadIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const SunIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const ImportIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>;
const UploadIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const BookmarkIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;
const BlueprintIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);
const ArrowUpIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;
const ArrowDownIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const MoreVerticalIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>;
const TrashIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const SynergyMapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;
const TextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

// Synergy Icons
const SynergySunIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m11.32-11.32l-1.41 1.41"/></svg>;
const SynergyMoonIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const SynergyAscendantIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const SynergyLifePathIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.32-10.95"/></svg>;
const SynergyExpressionIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M14 2l7 7-7 7"/></svg>;


const emptyContact: Omit<Contact, 'id' | 'report'> = {
    name: 'Jane Doe',
    birthDate: '1990-10-28',
    birthTime: '',
    birthLocation: '',
    notes: '',
};

const SynergyInfoCard: React.FC<{title: string, content: string, icon: React.ReactNode}> = ({title, content, icon}) => (
    <div className="p-4 md:p-6 glass-card h-full">
        <div className="flex items-center gap-3 mb-3">
            <span className="text-[var(--color-accent-gold)]">{icon}</span>
            <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white">{title}</h4>
        </div>
        <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
);

const StrengthsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a5 5 0 0 0-10 0" /><line x1="12" y1="2" x2="12" y2="8" /><line x1="4.22" y1="10.22" x2="5.64" y2="11.64" /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /></svg>;
const ChallengesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 6-12 12" /><path d="m6 6 12 12" /></svg>;
const AdviceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>;

const PairwiseAnalysisDetail: React.FC<{ analysis: PairwiseAnalysis }> = ({ analysis }) => {
    const details: { label: string; icon: React.ReactNode; data: SynergyBreakdown }[] = [
        { label: "Sun Sign", icon: <SynergySunIcon />, data: analysis.sunSignSynergy },
        { label: "Moon Sign", icon: <SynergyMoonIcon />, data: analysis.moonSignSynergy },
        { label: "Ascendant", icon: <SynergyAscendantIcon />, data: analysis.ascendantSignSynergy },
        { label: "Life Path", icon: <SynergyLifePathIcon />, data: analysis.lifePathSynergy },
        { label: "Expression", icon: <SynergyExpressionIcon />, data: analysis.expressionNumberSynergy },
    ];
    
    const compatibilityColors = {
        High: 'text-green-400',
        Medium: 'text-yellow-400',
        Low: 'text-red-400',
        Neutral: 'text-gray-400'
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">{analysis.analysis}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-accent-gold)]/20">
                {details.map(detail => (
                    <div key={detail.label} className="bg-black/20 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[var(--color-accent-gold)]">{detail.icon}</span>
                                <h5 className="text-sm font-semibold text-white">{detail.label}</h5>
                            </div>
                            <span className={`text-xs font-bold ${compatibilityColors[detail.data.compatibility]}`}>{detail.data.compatibility}</span>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] pl-7">{detail.data.analysis}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const SynergyReportView: React.FC<{ report: SynergyReport; contacts: Contact[]; onExport: () => void; isExporting: boolean; }> = ({ report, contacts, onExport, isExporting }) => {
    const [view, setView] = useState<'visual' | 'text'>('visual');
    const [expandedPair, setExpandedPair] = useState<string | null>(null);

    const ConstellationCard: React.FC<{ pair: PairwiseAnalysis }> = ({ pair }) => {
        const contact1 = contacts.find(c => c.name === pair.contact1Name);
        const contact2 = contacts.find(c => c.name === pair.contact2Name);
        const pairKey = `${pair.contact1Name}-${pair.contact2Name}`;
        const isExpanded = expandedPair === pairKey;

        return (
            <div
                tabIndex={0}
                className={`glass-card p-4 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${isExpanded ? 'border-[var(--color-accent-gold)]' : 'hover:border-[var(--color-accent-gold)]/50'}`}
                onClick={() => setExpandedPair(isExpanded ? null : pairKey)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpandedPair(isExpanded ? null : pairKey) }}
            >
                <div className="relative flex justify-between items-center h-20 cursor-pointer">
                    <div className="flex flex-col items-center gap-2 w-24 text-center">
                        {contact1 && <Avatar contact={contact1} size="sm" />}
                        <span className="text-xs font-bold text-white truncate w-full">{pair.contact1Name}</span>
                    </div>

                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-accent-gold)]/30 to-transparent"></div>
                    
                    <div className="relative z-10 flex-shrink-0 bg-[var(--color-bg-primary)] px-3 text-center">
                        <p className="text-sm font-bold text-[var(--color-accent-gold)]">{pair.synergyType}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-24 text-center">
                        {contact2 && <Avatar contact={contact2} size="sm" />}
                        <span className="text-xs font-bold text-white truncate w-full">{pair.contact2Name}</span>
                    </div>
                </div>
                {isExpanded && (
                    <div className="mt-4 animate-in">
                        <PairwiseAnalysisDetail analysis={pair} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl md:text-3xl font-bold gradient-text uppercase tracking-widest">Network Synergy Report</h2>
                <button 
                    onClick={onExport}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] disabled:opacity-50"
                >
                    {isExporting ? <Spinner /> : <DownloadIcon />}
                    {isExporting ? 'Exporting...' : 'Export as PDF'}
                </button>
            </div>
            <div className="p-4 md:p-6 glass-card">
                <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white mb-4">Overall Synergy Analysis</h3>
                <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">{report.overallSummary}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <SynergyInfoCard title="Strengths" content={report.strengths} icon={<StrengthsIcon />}/>
                <SynergyInfoCard title="Challenges" content={report.challenges} icon={<ChallengesIcon />}/>
                <SynergyInfoCard title="Strategic Advice" content={report.strategicAdvice} icon={<AdviceIcon />}/>
            </div>
            
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                     <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white">Pairwise Analyses</h3>
                     <div className="bg-black/30 p-1 rounded-full border border-white/20 flex gap-1">
                        <button
                            onClick={() => setView('visual')}
                            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${
                                view === 'visual' ? 'bg-[var(--color-accent-gold)] text-black' : 'text-[var(--color-text-secondary)] hover:text-white'
                            }`}
                        >
                            <SynergyMapIcon /> Synergy Map
                        </button>
                        <button
                            onClick={() => setView('text')}
                            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${
                                view === 'text' ? 'bg-[var(--color-accent-gold)] text-black' : 'text-[var(--color-text-secondary)] hover:text-white'
                            }`}
                        >
                            <TextIcon /> Text Analysis
                        </button>
                     </div>
                </div>

                {view === 'visual' ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {report.pairwiseAnalyses.map((pair, index) => (
                            <ConstellationCard key={index} pair={pair} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {report.pairwiseAnalyses.map((pair, index) => {
                            const contact1 = contacts.find(c => c.name === pair.contact1Name);
                            const contact2 = contacts.find(c => c.name === pair.contact2Name);
                            return (
                                 <div key={index} className="p-4 md:p-6 glass-card">
                                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 pb-4 border-b border-[var(--color-accent-gold)]/20">
                                        <div className="flex -space-x-8">
                                            {contact1 && <Avatar contact={contact1} size="md" />}
                                            {contact2 && <Avatar contact={contact2} size="md" />}
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h4 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white">{pair.contact1Name} & {pair.contact2Name}</h4>
                                            <p className="text-lg text-[var(--color-accent-gold)]">{pair.synergyType}</p>
                                        </div>
                                    </div>
                                    <PairwiseAnalysisDetail analysis={pair} />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};


const loadingMessages = [
  "Calculating Core Numerology Blueprint...",
  "Defining Identity Layer & Archetype...",
  "Analyzing Personality & Astrological Balance...",
  "Assessing Current Energetic Weather...",
  "Formulating Actionable CRM Strategies...",
  "Synthesizing the complete Executive Blueprint...",
];

const CosmicCrm: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [archetypes, setArchetypes] = useState<ArchetypeTemplate[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [crmView, setCrmView] = useState<CrmView>(() => {
    return (localStorage.getItem('gg33CrmView') as CrmView) || 'profiles';
  });
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [generatingForIds, setGeneratingForIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Partial<Contact> | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const loadingIntervalRef = useRef<number | null>(null);
  const [isContactsApiSupported, setIsContactsApiSupported] = useState(false);

  // Daily Briefing State
  const [dailyBriefing, setDailyBriefing] = useState<DailyBriefing | null>(null);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isGeneratingBriefing, setIsGeneratingBriefing] = useState(false);

  // Synergy State
    const [selectedForSynergy, setSelectedForSynergy] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('gg33SynergySelection');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
  const [synergyReport, setSynergyReport] = useState<SynergyReport | null>(null);
  const [isGeneratingSynergy, setIsGeneratingSynergy] = useState(false);

  // Archetype State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isViewingArchetype, setIsViewingArchetype] = useState(false);
  
  // Batch Actions State
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('gg33SearchTerm') || '');
  const [reportFilter, setReportFilter] = useState<'all' | 'hasReport' | 'noReport'>(() => {
    return (localStorage.getItem('gg33ReportFilter') as 'all' | 'hasReport' | 'noReport') || 'all';
  });

  // Sorting State
    const [sortConfig, setSortConfig] = useState<{ sortBy: 'name' | 'birthDate'; direction: 'asc' | 'desc' }>(() => {
        try {
            const saved = localStorage.getItem('gg33SortConfig');
            return saved ? JSON.parse(saved) : { sortBy: 'name', direction: 'asc' };
        } catch {
            return { sortBy: 'name', direction: 'asc' };
        }
    });

  // Profile Card Menu State
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Analyzers Dropdown State
  const [isAnalyzersOpen, setIsAnalyzersOpen] = useState(false);
  const analyzersRef = useRef<HTMLDivElement>(null);


  const dashboardRef = useRef<HTMLDivElement>(null);
  const synergyReportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoadingData(true);
        setError(null);
        try {
            const { data: contactsData, error: contactsError } = await supabase.from('contacts').select('*');
            if (contactsError) throw contactsError;
            setContacts((contactsData as Contact[]) || []);

            const { data: archetypesData, error: archetypesError } = await supabase.from('archetypes').select('*');
            if (archetypesError) throw archetypesError;
            setArchetypes((archetypesData as ArchetypeTemplate[]) || []);

        } catch (err: any) {
            console.error("Error fetching data from Supabase:", err);
            setError("Could not connect to the database. Please check your connection and refresh.");
        } finally {
            setIsLoadingData(false);
        }
    };

    fetchData();
  }, []);


  useEffect(() => {
    localStorage.setItem('gg33CrmView', crmView);
  }, [crmView]);

  useEffect(() => {
    localStorage.setItem('gg33SynergySelection', JSON.stringify(selectedForSynergy));
  }, [selectedForSynergy]);

  useEffect(() => {
    localStorage.setItem('gg33SearchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('gg33ReportFilter', reportFilter);
  }, [reportFilter]);

  useEffect(() => {
    localStorage.setItem('gg33SortConfig', JSON.stringify(sortConfig));
  }, [sortConfig]);
  
    useEffect(() => {
    if (generatingForIds.length > 0) {
        let index = 0;
        setLoadingMessage(loadingMessages[index]); // Set initial message
        loadingIntervalRef.current = window.setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[index]);
        }, 2500);
    } else {
        if (loadingIntervalRef.current) {
            clearInterval(loadingIntervalRef.current);
            loadingIntervalRef.current = null;
        }
    }

    return () => {
        if (loadingIntervalRef.current) {
            clearInterval(loadingIntervalRef.current);
        }
    };
}, [generatingForIds]);

  useEffect(() => {
    if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
        setIsContactsApiSupported(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (openMenuId && menuRef.current && !menuRef.current.contains(event.target as Node)) {
            const target = event.target as HTMLElement;
            if (!target.closest(`[data-menu-trigger-id="${openMenuId}"]`)) {
                setOpenMenuId(null);
            }
        }
        if (isAnalyzersOpen && analyzersRef.current && !analyzersRef.current.contains(event.target as Node)) {
            setIsAnalyzersOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId, isAnalyzersOpen]);


  const showBriefing = async (report: CrmReport) => {
    setIsGeneratingBriefing(true);
    setIsBriefingOpen(true);
    try {
        const briefing = await generateDailyBriefing(report);
        setDailyBriefing(briefing);
    } catch (err) {
        setError('Failed to generate daily briefing. Please try again.');
        console.error(err);
        setIsBriefingOpen(false); // Close modal on error
    } finally {
        setIsGeneratingBriefing(false);
    }
  };


  const handleSelectContact = (contact: Contact) => {
    setError(null);
    if (!contact.birthDate) {
        setEditingContact(contact);
        return;
    }
    setSelectedContact(contact);
    if (contact.report) {
        showBriefing(contact.report);
    }
  };
  
  const handleSaveContact = async (contactData: Partial<Contact>) => {
    if (contactData.id) { // Editing existing contact
        const { data, error } = await supabase
            .from('contacts')
            .update({ ...contactData })
            .eq('id', contactData.id)
            .select();
        
        if (error) {
            setError('Could not update contact.');
            console.error(error);
        } else if (data) {
            setContacts(prev => prev.map(c => c.id === contactData.id ? data[0] : c));
        }
    } else { // Adding new contact
        const newContact: Contact = {
            id: Date.now().toString(),
            name: contactData.name || '',
            birthDate: contactData.birthDate || '',
            birthTime: contactData.birthTime,
            birthLocation: contactData.birthLocation,
            notes: contactData.notes,
        };
        const { data, error } = await supabase
            .from('contacts')
            .insert([newContact])
            .select();

        if (error) {
            setError('Could not add new contact.');
            console.error(error);
        } else if (data) {
            setContacts(prev => [data[0], ...prev]);
        }
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
        const { error } = await supabase.from('contacts').delete().eq('id', contactId);
        if (error) {
            setError('Could not delete contact.');
            console.error(error);
        } else {
            setContacts(prev => prev.filter(c => c.id !== contactId));
            setSelectedContacts(prev => prev.filter(id => id !== contactId));
            setSelectedForSynergy(prev => prev.filter(id => id !== contactId));
        }
    }
  };

  const handleGenerateReport = async (contactToUpdate: Contact) => {
    if (!contactToUpdate.birthDate) {
        alert("Please provide a birth date to generate a report.");
        setEditingContact(contactToUpdate);
        return;
    }
    setGeneratingForIds(prev => [...prev, contactToUpdate.id]);
    setError(null);
    try {
      const report = await generateCrmReport(contactToUpdate);
      const updatedContactData = { 
          report,
          financialCycleTheme: report.financialMatrix?.financialCycleTheme
      };
      
      const { data, error: updateError } = await supabase
        .from('contacts')
        .update(updatedContactData)
        .eq('id', contactToUpdate.id)
        .select();

      if (updateError) throw updateError;
      
      if (data) {
          const updatedContact = data[0];
          setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
          setSelectedContact(updatedContact);
          showBriefing(report);
      }
    } catch (err) {
      setError('Failed to generate and save report. Please try again.');
      console.error(err);
    } finally {
      setGeneratingForIds(prev => prev.filter(id => id !== contactToUpdate.id));
    }
  };
  
  const handleBackToList = () => {
    setSelectedContact(null);
    setIsBriefingOpen(false);
    setDailyBriefing(null);
    setIsViewingArchetype(false);
  }
  
  const handleExportPdf = async () => {
    if (!selectedContact || !selectedContact.report) return;
    setIsExporting(true);
    // Delay to allow component to re-render in print mode
    await new Promise(resolve => setTimeout(resolve, 100));
    await exportToPdf(dashboardRef, `${selectedContact.name}_Executive_Blueprint`);
    setIsExporting(false);
  };
  
  const handleExportSynergyPdf = async () => {
    if (!synergyReport) return;
    setIsExporting(true);
    const names = contacts.filter(c => selectedForSynergy.includes(c.id)).map(c => c.name).join('_&_');
    await exportToPdf(synergyReportRef, `${names}_Synergy_Report`);
    setIsExporting(false);
  };

  const handleSynergySelection = (contactId: string) => {
    setSelectedForSynergy(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
     setSynergyReport(null); // Clear old report on selection change
  };

  const handleAnalyzeSynergy = async () => {
    if (selectedForSynergy.length < 2) {
      setError("Please select at least two contacts to analyze.");
      return;
    }
    setIsGeneratingSynergy(true);
    setError(null);
    setSynergyReport(null);
    try {
      const contactsToAnalyze = contacts.filter(c => selectedForSynergy.includes(c.id));
      const report = await generateSynergyReport(contactsToAnalyze);
      setSynergyReport(report);
    } catch (err)
      {
      setError("Failed to generate synergy report. Please try again.");
      console.error(err);
    } finally {
      setIsGeneratingSynergy(false);
    }
  };
  
  const handleSaveArchetype = async (name: string) => {
      if (!selectedContact || !selectedContact.report) return;
      
      const archetypeExists = archetypes.some(a => a.originalContact.id === selectedContact.id);
      
      if (archetypeExists) {
        if (!window.confirm('An archetype for this contact already exists. Do you want to overwrite it with the latest report data?')) {
            setIsSaveModalOpen(false);
            return;
        }
         const { report, ...originalContact } = selectedContact;
         const archetypeToUpdate = { name, report, originalContact };
         
         const { data, error } = await supabase
            .from('archetypes')
            .update(archetypeToUpdate)
            .eq('originalContact->>id', selectedContact.id) // Querying JSONB field
            .select();
            
         if (error) {
            setError("Could not update archetype.");
            console.error(error);
         } else if (data) {
            setArchetypes(prev => prev.map(a => a.originalContact.id === selectedContact.id ? data[0] : a));
         }

      } else {
        const { report, ...originalContactWithoutReport } = selectedContact;
        const newArchetypeData = {
            name,
            report: selectedContact.report,
            originalContact: originalContactWithoutReport,
        };

        const { data, error } = await supabase
            .from('archetypes')
            .insert([newArchetypeData])
            .select();
        
        if (error) {
            setError("Could not save new archetype.");
            console.error(error);
        } else if (data) {
            setArchetypes(prev => [...prev, data[0]]);
        }
      }

      setIsSaveModalOpen(false);
  };

  const handleSelectArchetype = (archetype: ArchetypeTemplate) => {
    const contactForDisplay: Contact = {
        ...archetype.originalContact,
        report: archetype.report,
    };
    setSelectedContact(contactForDisplay);
    setIsViewingArchetype(true);
  };
  
  const handleGenerateReportFromArchetype = async (archetype: ArchetypeTemplate) => {
    const contactToGenerateFor = archetype.originalContact as Contact;
    setGeneratingForIds(prev => [...prev, contactToGenerateFor.id]);
    setError(null);
    try {
      const report = await generateCrmReport(contactToGenerateFor);
      const newContactWithReport = { ...contactToGenerateFor, report };
      
      setSelectedContact(newContactWithReport);
      setIsViewingArchetype(false); // It's now a 'live' report
      showBriefing(report);
    } catch (err) {
      setError('Failed to generate report from archetype. Please try again.');
      console.error(err);
    } finally {
       setGeneratingForIds(prev => prev.filter(id => id !== contactToGenerateFor.id));
    }
  };

  // Batch action handlers
  const handleToggleSelection = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === sortedContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(sortedContacts.map(c => c.id));
    }
  };

  const handleBatchDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedContacts.length} selected profile(s)? This action cannot be undone.`)) {
      const { error } = await supabase.from('contacts').delete().in('id', selectedContacts);

      if (error) {
          setError('Could not delete selected contacts.');
          console.error(error);
      } else {
          setContacts(prev => prev.filter(c => !selectedContacts.includes(c.id)));
          setSelectedContacts([]);
      }
    }
  };
  
  const handleBulkAdd = async (newContactsData: Omit<Contact, 'id' | 'report'>[]) => {
    const newContacts: Omit<Contact, 'report'>[] = newContactsData.map((contactData, index) => ({
        ...contactData,
        id: `${Date.now()}-${index}`,
    }));
    
    const { data, error } = await supabase.from('contacts').insert(newContacts).select();

    if (error) {
        setError("Could not bulk add contacts.");
        console.error(error);
    } else if (data) {
        setContacts(prev => [...data, ...prev]);
    }
    setIsBulkUploadOpen(false);
  };


  const handleBatchGenerate = async () => {
    const contactsToGenerate = contacts.filter(c => selectedContacts.includes(c.id) && !c.report);
    if (contactsToGenerate.length === 0) {
      alert("All selected profiles already have reports.");
      return;
    }

    setIsGeneratingBatch(true);
    const idsToGenerate = contactsToGenerate.map(c => c.id);
    setGeneratingForIds(prev => [...new Set([...prev, ...idsToGenerate])]);
    setError(null);

    let successCount = 0;
    
    for (const contact of contactsToGenerate) {
      try {
        const report = await generateCrmReport(contact);
        const updatedData = { report, financialCycleTheme: report.financialMatrix?.financialCycleTheme };
        const { error } = await supabase.from('contacts').update(updatedData).eq('id', contact.id);
        
        if (error) throw error;
        
        setContacts(prevContacts => prevContacts.map(c => 
          c.id === contact.id ? { ...c, ...updatedData } : c
        ));
        successCount++;
      } catch (err) {
        console.error(`Failed to generate report for ${contact.name}:`, err);
        setError(`Failed to generate report for ${contact.name}. Others may have succeeded.`);
      }
    }

    setIsGeneratingBatch(false);
    setGeneratingForIds(prev => prev.filter(id => !idsToGenerate.includes(id)));
    setSelectedContacts([]);
    alert(`${successCount} of ${contactsToGenerate.length} reports were generated successfully.`);
  };
  
  const handleImportContacts = async () => {
    const props = ['name'];
    const opts = { multiple: true };

    try {
      const contactsFromPicker = await (navigator as any).contacts.select(props, opts);
      if (contactsFromPicker.length === 0) return;
      
      const newContacts: Omit<Contact, 'id' | 'report'>[] = contactsFromPicker.map((contact: any) => ({
        name: contact.name.join(' '),
        birthDate: '', // User needs to fill this in
        birthLocation: '', // User needs to fill this in
      }));
      
      handleBulkAdd(newContacts); // Use existing bulk add logic
      alert(`${newContacts.length} contact(s) imported successfully. Please select them to add their birth details.`);
    } catch (ex) {
      console.error('Error importing contacts:', ex);
      setError('Could not import contacts. The user may have cancelled the operation or an error occurred.');
    }
  };

  const sortedContacts = useMemo(() => {
    const filteredContacts = contacts.filter(contact => {
        const nameMatch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
        const reportMatch = 
            reportFilter === 'all' ||
            (reportFilter === 'hasReport' && contact.report) ||
            (reportFilter === 'noReport' && !contact.report);
        return nameMatch && reportMatch;
    });

    const sortableContacts = [...filteredContacts];
    sortableContacts.sort((a, b) => {
      if (sortConfig.sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      } else { // 'birthDate'
        const dateA = a.birthDate ? new Date(a.birthDate).getTime() : 0;
        const dateB = b.birthDate ? new Date(b.birthDate).getTime() : 0;
        return dateA - dateB;
      }
    });

    if (sortConfig.direction === 'desc') {
      return sortableContacts.reverse();
    }
    return sortableContacts;
  }, [contacts, sortConfig, searchTerm, reportFilter]);

  if (isLoadingData) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Spinner size={64} />
            <p className="mt-4 text-[var(--color-accent-gold)]">Connecting to the Cosmic Database...</p>
        </div>
    );
  }


  if (selectedContact) {
    return (
      <>
      <DailyBriefingModal 
        isOpen={isBriefingOpen} 
        isLoading={isGeneratingBriefing}
        briefing={dailyBriefing} 
        contactName={selectedContact.name}
        onClose={() => setIsBriefingOpen(false)} 
      />
      <SaveTemplateModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveArchetype}
      />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
            <button 
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
            >
              <ArrowLeftIcon />
              Back
            </button>
            
            <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
              {!isViewingArchetype && (
                 <button 
                    onClick={() => setEditingContact(selectedContact)}
                    className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                >
                    <EditIcon />
                    Edit Profile
                </button>
              )}
              {selectedContact.report && (
                !isViewingArchetype ? (
                  <>
                    <button 
                      onClick={() => showBriefing(selectedContact.report!)}
                      disabled={isGeneratingBriefing}
                      className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] disabled:opacity-50"
                    >
                      {isGeneratingBriefing ? <Spinner /> : <SunIcon />}
                      {isGeneratingBriefing ? 'Loading...' : 'Daily Briefing'}
                    </button>
                    <button 
                      onClick={handleExportPdf}
                      disabled={isExporting}
                      className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] disabled:opacity-50"
                    >
                      {isExporting ? <Spinner /> : <DownloadIcon />}
                      {isExporting ? 'Exporting...' : 'Export as PDF'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                        onClick={() => {
                            const originalArchetype = archetypes.find(a => a.originalContact.id === selectedContact.id);
                            if (originalArchetype) {
                                handleGenerateReportFromArchetype(originalArchetype);
                            }
                        }}
                        disabled={generatingForIds.includes(selectedContact.id)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-900/20 hover:shadow-xl hover:shadow-yellow-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] disabled:opacity-50"
                    >
                        {generatingForIds.includes(selectedContact.id) ? <Spinner /> : 'Generate Live Report'}
                    </button>
                    <button 
                        onClick={handleExportPdf}
                        disabled={isExporting}
                        className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] disabled:opacity-50"
                    >
                      {isExporting ? <Spinner /> : <DownloadIcon />}
                      {isExporting ? 'Exporting...' : 'Export as PDF'}
                    </button>
                  </>
                )
              )}
            </div>
        </div>

        <div ref={dashboardRef}>
            {generatingForIds.includes(selectedContact.id) ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full animate-pulse-glow"></div>
                      <Spinner size={64} />
                  </div>
                  <p className="mt-6 text-xl gradient-text font-semibold">{loadingMessage}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-2">Please wait, the cosmos is aligning for {selectedContact.name}...</p>
              </div>
            ) : selectedContact.report ? (
              <Dashboard 
                report={selectedContact.report} 
                contact={selectedContact} 
                onSaveAsArchetype={() => setIsSaveModalOpen(true)}
                isViewingArchetype={isViewingArchetype}
                isExporting={isExporting}
              />
            ) : (
              <div className="text-center p-12 glass-card">
                <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white mb-4">No report generated for {selectedContact.name}</h2>
                <p className="text-[var(--color-text-secondary)] mb-6">Generate a cosmic insight report to view the dashboard.</p>
                <button
                  onClick={() => handleGenerateReport(selectedContact)}
                  className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                >
                  Generate Report
                </button>
                {error && <p className="text-red-400 mt-4">{error}</p>}
              </div>
            )}
        </div>
      </div>
      </>
    );
  }

  const CrmTabButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ isActive, onClick, children }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 sm:px-6 py-2 text-md sm:text-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] rounded-t-lg ${
          isActive
            ? 'border-b-2 border-[var(--color-accent-gold)] text-white'
            : 'text-[var(--color-text-secondary)] hover:text-white'
        }`}
        style={{fontFamily: 'var(--font-serif)'}}
      >
        {children}
      </button>
    );
  };
  
    const handleSetCrmView = (view: CrmView) => {
        setCrmView(view);
        setError(null);
        setSynergyReport(null);
        setSelectedContacts([]);
        setIsAnalyzersOpen(false);
    };
  
    const analyzerViews: { view: CrmView; label: string }[] = [
        { view: 'arabic', label: 'Arabic Esoterics' },
        { view: 'egyptian', label: 'Egyptian Astrology' },
        { view: 'aztec', label: 'Aztec Astrology' },
        { view: 'vedic', label: 'Vedic Astrology (Jyotish)' },
        { view: 'japanese', label: 'Japanese Zodiac (Jūnishi)' },
    ];


  return (
    <>
      <ContactModal contactToEdit={editingContact} onClose={() => setEditingContact(null)} onSaveContact={handleSaveContact} />
      <BulkUploadModal isOpen={isBulkUploadOpen} onClose={() => setIsBulkUploadOpen(false)} onBulkAdd={handleBulkAdd} />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <div className="flex space-x-2 border-b border-[var(--color-accent-gold)]/20">
                <CrmTabButton isActive={crmView === 'profiles'} onClick={() => handleSetCrmView('profiles')}>Profiles</CrmTabButton>
                <CrmTabButton isActive={crmView === 'synergy'} onClick={() => handleSetCrmView('synergy')}>Synergy</CrmTabButton>
                <CrmTabButton isActive={crmView === 'archetypes'} onClick={() => handleSetCrmView('archetypes')}>Archetypes</CrmTabButton>
                <CrmTabButton isActive={crmView === 'comparison'} onClick={() => handleSetCrmView('comparison')}>Comparison</CrmTabButton>
                <div className="relative" ref={analyzersRef}>
                    <button
                        onClick={() => setIsAnalyzersOpen(prev => !prev)}
                        className={`px-4 sm:px-6 py-2 text-md sm:text-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] rounded-t-lg flex items-center gap-1 ${
                          analyzerViews.some(v => v.view === crmView)
                            ? 'border-b-2 border-[var(--color-accent-gold)] text-white'
                            : 'text-[var(--color-text-secondary)] hover:text-white'
                        }`}
                        style={{fontFamily: 'var(--font-serif)'}}
                    >
                        Analyzers
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isAnalyzersOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    {isAnalyzersOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--color-bg-primary)] border border-[var(--color-accent-gold)]/30 rounded-lg shadow-lg z-20 animate-in">
                            <ul className="py-1">
                                {analyzerViews.map(({ view, label }) => (
                                    <li key={view}>
                                        <button
                                            onClick={() => handleSetCrmView(view)}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${crmView === view ? 'bg-white/10 text-white' : 'text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white'}`}
                                        >
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <CrmTabButton isActive={crmView === 'guide'} onClick={() => handleSetCrmView('guide')}>Guide</CrmTabButton>
            </div>
          </div>
          {crmView === 'profiles' && (
             <div className="flex items-center gap-2 flex-wrap">
                {isContactsApiSupported && (
                    <button 
                        onClick={handleImportContacts}
                        className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                    >
                        <ImportIcon />
                        Import
                    </button>
                )}
                 <button 
                    onClick={() => setIsBulkUploadOpen(true)}
                    className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                >
                    <UploadIcon />
                    Bulk Upload
                </button>
                <button 
                    onClick={() => setEditingContact(emptyContact)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-2 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-900/20 hover:shadow-xl hover:shadow-yellow-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                >
                    <PlusIcon />
                    Add Profile
                </button>
             </div>
          )}
        </div>
        
        {crmView === 'profiles' && (
            <div className="pb-24">
                 <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        <input 
                            type="checkbox"
                            id="selectAll"
                            checked={sortedContacts.length > 0 && selectedContacts.length === sortedContacts.length}
                            onChange={handleSelectAll}
                            className="h-5 w-5 rounded bg-black/50 border-white/30 text-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)]/50"
                            aria-label="Select all contacts"
                        />
                        <label htmlFor="selectAll" className="text-sm font-medium text-[var(--color-text-secondary)]">
                            {selectedContacts.length > 0 ? `${selectedContacts.length} selected` : 'Select All'}
                        </label>
                    </div>
                </div>

                 <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-6 p-4 glass-card">
                    <div className="flex-grow flex items-center gap-4">
                        <div className="relative flex-grow max-w-sm">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 pl-10 pr-4 text-sm"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        <div className="relative">
                            <select
                                value={reportFilter}
                                onChange={(e) => setReportFilter(e.target.value as 'all' | 'hasReport' | 'noReport')}
                                className="appearance-none bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white text-sm py-2 pl-3 pr-8"
                            >
                                <option value="all">All Profiles</option>
                                <option value="hasReport">Has Report</option>
                                <option value="noReport">No Report</option>
                            </select>
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Sort by:</label>
                        <select
                            value={sortConfig.sortBy}
                            onChange={(e) => setSortConfig(prev => ({ ...prev, sortBy: e.target.value as 'name' | 'birthDate' }))}
                            className="bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white text-sm py-2 px-2"
                        >
                            <option value="name">Name</option>
                            <option value="birthDate">Birth Date</option>
                        </select>
                        <button
                            onClick={() => setSortConfig(prev => ({ ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' }))}
                            className="p-2 rounded-lg bg-black/30 border border-white/20 text-[var(--color-text-secondary)] hover:bg-white/10"
                            aria-label={`Sort ${sortConfig.direction === 'asc' ? 'descending' : 'ascending'}`}
                        >
                            {sortConfig.direction === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Add New Profile Card */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setEditingContact(emptyContact)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingContact(emptyContact); } }}
                        className="group glass-card p-4 md:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-accent-gold)]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] cursor-pointer border-2 border-dashed border-[var(--color-accent-gold)]/30 hover:border-[var(--color-accent-gold)]/70"
                    >
                        <div className="w-16 h-16 rounded-full bg-black/30 border-2 border-dashed border-[var(--color-accent-gold)]/50 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                            <PlusIcon className="w-8 h-8 text-[var(--color-accent-gold)]" />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-xl font-bold text-white">Add New Profile</h2>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Expand your strategic network.</p>
                    </div>

                    {/* Map existing contacts */}
                    {sortedContacts.map((contact, index) => {
                        const lifePathNumber = contact.report?.coreNumbers?.lifePathNumber?.number;
                        const vietnameseZodiac = getVietnameseZodiac(contact.birthDate);
                        return (
                        <div key={contact.id} tabIndex={0} className={`relative group glass-card p-4 md:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-accent-gold)]/20 focus:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black focus:ring-[var(--color-accent-gold)] animate-slide-up ${selectedContacts.includes(contact.id) ? 'border-[var(--color-accent-gold)]' : 'hover:border-[var(--color-accent-gold)] focus-within:border-[var(--color-accent-gold)]'}`} style={{ animationDelay: `${index * 50}ms` }}>
                        <input
                            type="checkbox"
                            className="absolute top-4 left-4 z-10 h-5 w-5 rounded bg-black/50 border-white/30 text-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)]/50"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleToggleSelection(contact.id)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Select ${contact.name}`}
                        />
                        <div className="absolute top-2 right-2">
                            <button
                                data-menu-trigger-id={contact.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === contact.id ? null : contact.id);
                                }}
                                className="text-[var(--color-text-secondary)]/70 transition-opacity p-2 rounded-full hover:bg-white/10 hover:text-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
                                aria-label={`Options for ${contact.name}`}
                            >
                                <MoreVerticalIcon className="w-5 h-5"/>
                            </button>
                            {openMenuId === contact.id && (
                                <div 
                                    ref={menuRef}
                                    className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-primary)] border border-[var(--color-accent-gold)]/30 rounded-lg shadow-lg z-20 animate-in"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ul className="py-1">
                                        <li>
                                            <button
                                                onClick={() => { setEditingContact(contact); setOpenMenuId(null); }}
                                                className="w-full text-left px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white flex items-center gap-2"
                                            >
                                                <EditIcon /> Edit Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => { handleDeleteContact(contact.id); setOpenMenuId(null); }}
                                                className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-900/20 hover:text-rose-300 flex items-center gap-2"
                                            >
                                                <TrashIcon /> Delete Profile
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-start gap-4 mb-4 ml-8">
                                <div className="relative">
                                    <Avatar contact={contact} />
                                    {lifePathNumber && (
                                        <div 
                                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] flex items-center justify-center text-black font-bold text-sm border-2 border-[var(--color-bg-primary)]"
                                            title={`Life Path: ${lifePathNumber}`}
                                        >
                                            {lifePathNumber.split('/')[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white">{contact.name}</h2>
                                    <p className="text-sm text-[var(--color-text-secondary)]">
                                        {contact.birthDate}
                                        {lifePathNumber && (
                                            <span className="ml-4 font-bold text-[var(--color-accent-gold)]" title={`Life Path Number: ${lifePathNumber}`}>
                                                LP: {lifePathNumber}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                {vietnameseZodiac && (
                                    <div className="w-10 h-10 text-[var(--color-accent-gold)]/70" title={`Vietnamese Zodiac: ${vietnameseZodiac}`}>
                                        <VietnameseZodiacIcon animal={vietnameseZodiac} />
                                    </div>
                                )}
                            </div>
                            <div className="text-sm text-[var(--color-text-secondary)] space-y-2 border-t border-[var(--color-accent-gold)]/20 pt-4 mt-4">
                                <p><strong>Time:</strong> {contact.birthTime || 'Not specified'}</p>
                                <p><strong>Location:</strong> {contact.birthLocation || 'Not specified'}</p>
                                {contact.financialCycleTheme && (
                                    <p><strong>Cycle Theme:</strong> <span className="text-white/90">{contact.financialCycleTheme}</span></p>
                                )}
                                {contact.notes && (
                                    <div className="pt-2">
                                        <p><strong>Notes:</strong></p>
                                        <p className="whitespace-pre-wrap text-white/80 text-xs leading-relaxed">{contact.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => handleSelectContact(contact)}
                            disabled={generatingForIds.includes(contact.id)}
                            className="mt-6 w-full bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-semibold py-2 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-wait flex justify-center items-center h-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] hover:shadow-lg hover:shadow-yellow-900/30 active:scale-95"
                        >
                            {generatingForIds.includes(contact.id) ? <Spinner/> : contact.report ? 'View Report' : 'Generate Report'}
                        </button>
                        </div>
                    )})}
                </div>
            </div>
        )}

        {crmView === 'synergy' && (
            <div ref={synergyReportRef} className="p-0 md:p-4">
                 <div className="p-4 md:p-6 glass-card">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold gradient-text uppercase tracking-widest">Select Contacts to Analyze</h2>
                        <div className="flex items-center gap-4">
                            {selectedForSynergy.length > 0 && (
                                <p className="text-sm font-semibold text-white bg-black/30 px-3 py-1 rounded-full">
                                    <span className="text-[var(--color-accent-gold)]">{selectedForSynergy.length}</span> selected
                                </p>
                            )}
                            {contacts.length > 0 && (
                                <button 
                                    onClick={() => {
                                        if (selectedForSynergy.length === contacts.length) {
                                            setSelectedForSynergy([]);
                                        } else {
                                            setSelectedForSynergy(contacts.map(c => c.id));
                                        }
                                        setSynergyReport(null);
                                    }}
                                    className="text-sm font-semibold text-white bg-black/30 px-3 py-1.5 rounded-full border border-white/20 hover:border-[var(--color-accent-gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                                >
                                    {selectedForSynergy.length === contacts.length ? 'Clear Selection' : 'Select All'}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-h-96 overflow-y-auto pr-2">
                        {contacts.map(contact => (
                            <label key={contact.id} className={`relative flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${selectedForSynergy.includes(contact.id) ? 'bg-black/20 border-[var(--color-accent-gold)] scale-105 shadow-lg shadow-[var(--color-accent-gold)]/10' : 'bg-black/30 border-transparent hover:border-white/20'}`}>
                                <input 
                                    type="checkbox"
                                    checked={selectedForSynergy.includes(contact.id)}
                                    onChange={() => handleSynergySelection(contact.id)}
                                    className="h-5 w-5 rounded bg-black/50 border-white/30 text-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)]/50 shrink-0"
                                />
                                <Avatar contact={contact} size="sm" />
                                <span className="text-white font-medium flex-1">{contact.name}</span>
                                {selectedForSynergy.includes(contact.id) && (
                                    <CheckCircleIcon className="text-[var(--color-accent-gold)] shrink-0" />
                                )}
                            </label>
                        ))}
                    </div>
                    <div className="text-center">
                         <button
                            onClick={handleAnalyzeSynergy}
                            disabled={isGeneratingSynergy || selectedForSynergy.length < 2}
                            className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                        >
                            {isGeneratingSynergy ? <Spinner /> : `Analyze Synergy (${selectedForSynergy.length})`}
                        </button>
                        {error && <p className="text-red-400 mt-4">{error}</p>}
                    </div>
                 </div>
                {isGeneratingSynergy && (
                    <div className="flex flex-col items-center justify-center min-h-[30vh]">
                        <Spinner />
                        <p className="mt-4 text-[var(--color-accent-gold)]">Analyzing network dynamics...</p>
                    </div>
                )}
                 {synergyReport && <SynergyReportView report={synergyReport} contacts={contacts} onExport={handleExportSynergyPdf} isExporting={isExporting} />}
            </div>
        )}
        
        {crmView === 'archetypes' && (
            <div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {archetypes.map(archetype => (
                       <div key={archetype.id} onClick={() => handleSelectArchetype(archetype)} tabIndex={0} className="relative overflow-hidden cursor-pointer group glass-card p-6 flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-accent-gold)] focus:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black focus-within:ring-[var(--color-accent-gold)]">
                          <BlueprintIcon className="absolute bottom-2 right-2 w-24 h-24 text-white/5 group-hover:text-white/10 transition-colors duration-300 transform group-hover:scale-110" />
                          <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-black/30 border border-[var(--color-accent-gold)]/30">
                                      <BookmarkIcon className="w-5 h-5 text-[var(--color-accent-gold)]" />
                                  </div>
                                  <div>
                                      <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white truncate">{archetype.name}</h2>
                                      <p className="text-sm text-[var(--color-text-secondary)]">Based on: {archetype.originalContact.name}</p>
                                  </div>
                              </div>
                          </div>
                          <p className="relative z-10 text-sm mt-6 text-white font-semibold group-hover:text-[var(--color-accent-gold)] transition-colors">
                              View Blueprint <span aria-hidden="true" className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                          </p>
                      </div>
                    ))}
                    {archetypes.length === 0 && (
                        <p className="text-center text-[var(--color-text-secondary)] md:col-span-3">You haven't saved any archetypes yet. View a report and click "Save as Archetype" to start building your library.</p>
                    )}
                 </div>
            </div>
        )}

        {crmView === 'guide' && (
            <NumerologyGuide contacts={contacts} />
        )}

        {crmView === 'comparison' && (
             <ComparisonAnalyzer
                contacts={contacts}
                onGenerateReport={handleGenerateReport}
                generatingForIds={generatingForIds}
             />
        )}

        {crmView === 'arabic' && (
             <ArabicEsotericsAnalyzer
                contacts={contacts}
                onGenerateReport={handleGenerateReport}
                generatingForIds={generatingForIds}
             />
        )}

        {crmView === 'egyptian' && (
             <EgyptianAstrologyAnalyzer
                contacts={contacts}
                onGenerateReport={handleGenerateReport}
                generatingForIds={generatingForIds}
             />
        )}

        {crmView === 'aztec' && (
             <AztecAstrologyAnalyzer
                contacts={contacts}
                onGenerateReport={handleGenerateReport}
                generatingForIds={generatingForIds}
             />
        )}

        {crmView === 'vedic' && (
             <VedicAstrologyAnalyzer
                contacts={contacts}
                onGenerateReport={handleGenerateReport}
                generatingForIds={generatingForIds}
             />
        )}

        {crmView === 'japanese' && (
             <JapaneseZodiacAnalyzer
                contacts={contacts}
                onGenerateReport={handleGenerateReport}
                generatingForIds={generatingForIds}
             />
        )}

      </div>
       {crmView === 'profiles' && selectedContacts.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-30 p-4 animate-slide-up">
              <div className="max-w-4xl mx-auto glass-card p-3 flex justify-between items-center shadow-2xl shadow-black/50">
                  <div className="flex items-center gap-4">
                      <span className="font-bold text-white text-lg">{selectedContacts.length} selected</span>
                      <button onClick={() => setSelectedContacts([])} className="text-sm text-[var(--color-text-secondary)] hover:text-white underline">Deselect all</button>
                  </div>
                  <div className="flex gap-2 sm:gap-4">
                      <button 
                          onClick={handleBatchGenerate} 
                          disabled={isGeneratingBatch || contacts.filter(c => selectedContacts.includes(c.id) && !c.report).length === 0}
                          className="inline-flex items-center gap-2 bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                      >
                           {isGeneratingBatch ? <Spinner /> : 'Generate Reports'}
                      </button>
                      <button 
                          onClick={handleBatchDelete} 
                          className="bg-rose-800/50 border border-rose-500/50 text-rose-300 font-bold py-2 px-4 rounded-xl hover:bg-rose-700/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-rose-500"
                      >
                          Delete Selected
                      </button>
                  </div>
              </div>
          </div>
        )}
    </>
  );
};

export default CosmicCrm;