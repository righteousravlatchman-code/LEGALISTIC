import React, { useState } from 'react';
import type { Contact } from '../types';
import Spinner from './Spinner';
import Avatar from './Avatar';

interface FinancialMatrixProps {
  contacts: Contact[];
  onGenerateReport: (contact: Contact) => void;
  generatingForIds: string[];
}

const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
// Fix: Updated ListIcon to accept a className prop to resolve a TypeScript error.
const ListIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;

const FinancialMatrix: React.FC<FinancialMatrixProps> = ({ contacts, onGenerateReport, generatingForIds }) => {
  const [selectedContactId, setSelectedContactId] = useState<string>('');
  
  const selectedContact = contacts.find(c => c.id === selectedContactId);
  const isGenerating = selectedContact && generatingForIds.includes(selectedContact.id);
  const reportData = selectedContact?.report?.financialMatrix;

  const InfoCard: React.FC<{ icon: React.ReactNode, label: string, value: string, className?: string }> = ({ icon, label, value, className }) => (
    <div className={`glass-card p-4 flex flex-col items-center text-center ${className}`}>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-[var(--color-accent-gold)] mb-3 flex-shrink-0">{icon}</div>
        <h4 className="font-semibold text-[var(--color-text-secondary)] text-xs uppercase tracking-wider mb-1">{label}</h4>
        <p style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8">
        <div className="text-center mb-12">
            <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl md:text-4xl font-bold gradient-text mb-2 uppercase tracking-widest">Financial Matrix</h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">Align your wealth strategy with your core energetic blueprint.</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
            <label htmlFor="contact-select-financial" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2 text-center">Select a Profile to Analyze</label>
            <select
                id="contact-select-financial"
                value={selectedContactId}
                onChange={(e) => setSelectedContactId(e.target.value)}
                className="w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3"
            >
                <option value="" disabled>-- Choose a contact --</option>
                {contacts.map(contact => (
                    <option key={contact.id} value={contact.id}>{contact.name}</option>
                ))}
            </select>
        </div>

        <div className="max-w-4xl mx-auto">
            {!selectedContact && (
                <div className="text-center p-12 glass-card">
                    <p className="text-[var(--color-text-secondary)]">Please select a contact to view their Financial Matrix.</p>
                </div>
            )}

            {isGenerating && (
                <div className="flex flex-col items-center justify-center min-h-[30vh]">
                    <Spinner />
                    <p className="mt-4 text-[var(--color-accent-gold)]">Generating Executive Blueprint for {selectedContact?.name}...</p>
                </div>
            )}

            {selectedContact && !isGenerating && !reportData && (
                <div className="text-center p-12 glass-card">
                    <Avatar contact={selectedContact} size="lg" />
                    <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white mt-4 mb-2">No report found for {selectedContact.name}</h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">An Executive Blueprint must be generated to view their Financial Matrix.</p>
                    <button
                        onClick={() => onGenerateReport(selectedContact)}
                        className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                    >
                        Generate Executive Blueprint
                    </button>
                </div>
            )}

            {reportData && !isGenerating && (
                <div className="space-y-8">
                    <div className="glass-card p-6 text-center">
                        <h3 className="font-semibold text-[var(--color-text-secondary)] text-sm uppercase tracking-wider">Wealth Code</h3>
                        <p style={{fontFamily: 'var(--font-serif)'}} className="text-4xl md:text-5xl font-bold gradient-text my-2">{reportData.wealthCodeNumber}</p>
                        <p className="text-white max-w-xl mx-auto">{reportData.wealthCodeSummary}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard icon={<UserCheckIcon />} label="Investment Archetype" value={reportData.investmentArchetype} />
                        <InfoCard icon={<TrendingUpIcon />} label="Current Financial Cycle Theme" value={reportData.financialCycleTheme} />
                    </div>

                    <div className="glass-card p-6">
                        <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-white mb-4 flex items-center gap-3"><ListIcon className="text-[var(--color-accent-gold)]"/> Strategic Financial Advice</h3>
                        <ul className="space-y-3">
                            {reportData.strategicAdvice.map((advice, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-[var(--color-accent-gold)] mt-1 font-bold">✓</span>
                                    <span className="text-[var(--color-text-secondary)] leading-relaxed">{advice}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default FinancialMatrix;