import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import type { JournalEntry, JournalAnalysis } from '../types';
import { analyzeJournalEntry } from '../services/geminiService';

// Icons
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const PenSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M8.22 15.62c.03-.1.05-.2.07-.3.02-.1.03-.2.05-.31.02-.1.03-.2.04-.3.02-.1.02-.2.03-.3.02-.1.02-.2.02-.3l.02-.3c.01-.1.01-.2.01-.3v-.3c0-.1 0-.2-.01-.3l-.02-.3c-.01-.1-.01-.2-.02-.3s-.02-.2-.03-.3c-.01-.1-.02-.2-.04-.3s-.03-.2-.05-.3c-.02-.1-.04-.2-.07-.3c-.03-.1-.06-.2-.09-.28a5.48 5.48 0 0 1-2-4.38c0-2.87 2.24-5.2 5-5.2s5 2.33 5 5.2a5.48 5.48 0 0 1-2.09 4.66c-.03.08-.06.18-.09.28s-.05.2-.07.3c-.02.1-.03.2-.05.31s-.03.2-.04.3c-.02.1-.02.2-.03-.3s-.01.2-.02.3l-.02.3c-.01.1-.01.2-.01-.3v.3c0 .1 0 .2.01.3l.02.3c.01.1.01.2.02.3s.02.2.03.3c.01.1.02.2.04.3s.03.2.05.3c.02.1.04.2.07.3c.03.1.06.2.09.28a4.5 4.5 0 0 1-2.09 1.34A4.5 4.5 0 0 1 12 21a4.5 4.5 0 0 1-1.69-.32 4.5 4.5 0 0 1-2.09-1.34z"></path></svg>;
const GrowthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
const QuestionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;


const achievements = [
    { title: "First Report", description: "Generate your first Executive Blueprint.", icon: <StarIcon />, unlocked: true },
    { title: "Network Analyst", description: "Analyze your first Network Synergy.", icon: <UsersIcon />, unlocked: true },
    { title: "Journal Entry", description: "Get your first AI insight.", icon: <PenSquareIcon />, unlocked: false },
    { title: "Goal Setter", description: "Set your first strategic goal.", icon: <TargetIcon />, unlocked: false },
    { title: "Numerology Novice", description: "Learn about a core number.", icon: <BookOpenIcon />, unlocked: false },
    { title: "7-Day Streak", description: "Maintain a 7-day check-in streak.", icon: <CalendarIcon />, unlocked: false },
];

const AnalysisCard: React.FC<{ analysis: JournalAnalysis }> = ({ analysis }) => (
    <div className="space-y-4 mt-6 border-t-2 border-dashed border-[var(--color-accent-gold)]/20 pt-6">
        <h4 style={{ fontFamily: 'var(--font-serif)' }} className="text-xl font-bold text-white text-center">Strategic Analysis</h4>
        <div className="space-y-3">
            <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent-gold)] mt-1"><LightbulbIcon/></span>
                <div>
                    <h5 className="font-semibold text-[var(--color-accent-gold)]">Key Themes</h5>
                    <p className="text-[var(--color-text-secondary)]">{analysis.keyThemes}</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent-gold)] mt-1"><GrowthIcon/></span>
                <div>
                    <h5 className="font-semibold text-[var(--color-accent-gold)]">Growth Opportunity</h5>
                    <p className="text-[var(--color-text-secondary)]">{analysis.growthOpportunity}</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent-gold)] mt-1"><QuestionIcon/></span>
                <div>
                    <h5 className="font-semibold text-[var(--color-accent-gold)]">Reflection Question</h5>
                    <p className="text-[var(--color-text-secondary)] italic">"{analysis.reflectionQuestion}"</p>
                </div>
            </div>
        </div>
    </div>
);


const ProfileProgress: React.FC = () => {
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [currentEntry, setCurrentEntry] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const savedEntries = localStorage.getItem('richAndViciousJournalEntries');
            if (savedEntries) {
                const parsedEntries = JSON.parse(savedEntries);
                setJournalEntries(parsedEntries);
                if (parsedEntries.length > 0) {
                    setSelectedEntry(parsedEntries[0]);
                }
            }
        } catch (err) {
            console.error("Failed to load journal entries from localStorage", err);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('richAndViciousJournalEntries', JSON.stringify(journalEntries));
        } catch (err) {
            console.error("Failed to save journal entries to localStorage", err);
        }
    }, [journalEntries]);

    const handleAnalyze = async () => {
        if (!currentEntry.trim()) {
            setError("Please write an entry to analyze.");
            return;
        }
        setIsAnalyzing(true);
        setError(null);
        try {
            const analysis = await analyzeJournalEntry(currentEntry);
            const newEntry: JournalEntry = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                content: currentEntry,
                analysis: analysis,
            };
            const updatedEntries = [newEntry, ...journalEntries];
            setJournalEntries(updatedEntries);
            setSelectedEntry(newEntry);
            setCurrentEntry('');
        } catch (err) {
            console.error(err);
            setError("Failed to get AI insight. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const unlockedAchievements = achievements.map(ach => ({
        ...ach,
        unlocked: ach.title === "First Report" || ach.title === "Network Analyst" || (ach.title === "Journal Entry" && journalEntries.length > 0)
    }));
    
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
            <div className="text-center">
                <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl md:text-4xl font-bold gradient-text mb-2 uppercase tracking-widest">Profile & Progress</h1>
                <p className="text-[var(--color-text-secondary)]">Your journey of strategic self-discovery.</p>
            </div>
            
             {/* Strategic Journal */}
            <div>
                <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl font-bold gradient-text mb-6 text-center uppercase tracking-widest">Strategic Journal</h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 glass-card p-6">
                         <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white mb-4">Daily Reflections</h3>
                         <textarea
                            value={currentEntry}
                            onChange={(e) => setCurrentEntry(e.target.value)}
                            placeholder="What's on your mind? Capture your thoughts, challenges, and wins..."
                            className="w-full h-40 bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3 resize-none"
                         />
                         <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !currentEntry.trim()}
                            className="mt-4 w-full bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-2 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-900/20 hover:shadow-xl hover:shadow-yellow-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                         >
                            {isAnalyzing ? <Spinner /> : "Get AI Insight"}
                         </button>
                         {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}

                         {isAnalyzing && <p className="text-center mt-4 text-[var(--color-accent-gold)]">Analyzing your reflections...</p>}
                         
                         {selectedEntry?.analysis && !isAnalyzing && (
                            <AnalysisCard analysis={selectedEntry.analysis} />
                         )}
                    </div>
                     <div className="lg:col-span-2 glass-card p-6">
                        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white mb-4">Journal History</h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                            {journalEntries.map(entry => (
                                <button 
                                    key={entry.id}
                                    onClick={() => setSelectedEntry(entry)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedEntry?.id === entry.id ? 'bg-black/40 border border-[var(--color-accent-gold)]/50' : 'bg-black/20 hover:bg-black/30'}`}
                                >
                                    <p className="font-semibold text-white truncate">{entry.content}</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">{new Date(entry.date).toLocaleString()}</p>
                                </button>
                            ))}
                            {journalEntries.length === 0 && <p className="text-sm text-center text-[var(--color-text-secondary)] py-8">Your journal history will appear here.</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div>
                <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl font-bold gradient-text mb-6 text-center uppercase tracking-widest">Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {unlockedAchievements.map((ach, index) => (
                        <div key={index} className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center ${ach.unlocked 
                            ? 'glass-card' 
                            : 'bg-black/30 border-white/5 opacity-50'
                        }`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${ach.unlocked ? 'bg-gradient-to-br from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black' : 'bg-black/50 text-[var(--color-text-secondary)]/50'}`}>
                                {ach.icon}
                            </div>
                            <h4 className={`font-bold ${ach.unlocked ? 'text-white' : 'text-[var(--color-text-secondary)]/50'}`}>{ach.title}</h4>
                            <p className={`text-xs mt-1 ${ach.unlocked ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-secondary)]/30'}`}>{ach.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileProgress;