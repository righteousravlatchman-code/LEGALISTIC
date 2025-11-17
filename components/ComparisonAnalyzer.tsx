import React, { useState } from 'react';
import type { Contact } from '../types';
import ComparisonChart from './ComparisonChart';
import Spinner from './Spinner';
import Avatar from './Avatar';

const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

interface ComparisonAnalyzerProps {
  contacts: Contact[];
  onGenerateReport: (contact: Contact) => void;
  generatingForIds: string[];
}

const ComparisonAnalyzer: React.FC<ComparisonAnalyzerProps> = ({ contacts, onGenerateReport, generatingForIds }) => {
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  
  const handleSelection = (contactId: string) => {
    setSelectedContactIds(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectedContacts = contacts.filter(c => selectedContactIds.includes(c.id));

  return (
    <div className="p-4 md:p-8">
        <div className="text-center mb-8">
            <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl md:text-4xl font-bold gradient-text mb-2 uppercase tracking-widest">Comparison Matrix</h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">View a contact's complete energetic profile across all analyzed systems at a glance.</p>
        </div>

        <div className="max-w-4xl mx-auto mb-8 glass-card p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold gradient-text uppercase tracking-widest">Select Profiles</h2>
                <div className="flex items-center gap-4">
                    {selectedContactIds.length > 0 && (
                        <p className="text-sm font-semibold text-white bg-black/30 px-3 py-1 rounded-full">
                            <span className="text-[var(--color-accent-gold)]">{selectedContactIds.length}</span> selected
                        </p>
                    )}
                    {contacts.length > 0 && (
                        <button 
                            onClick={() => {
                                if (selectedContactIds.length === contacts.length) {
                                    setSelectedContactIds([]);
                                } else {
                                    setSelectedContactIds(contacts.map(c => c.id));
                                }
                            }}
                            className="text-sm font-semibold text-white bg-black/30 px-3 py-1.5 rounded-full border border-white/20 hover:border-[var(--color-accent-gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                        >
                            {selectedContactIds.length === contacts.length ? 'Clear Selection' : 'Select All'}
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto pr-2">
                {contacts.map(contact => (
                    <label key={contact.id} className={`relative flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${selectedContactIds.includes(contact.id) ? 'bg-black/20 border-[var(--color-accent-gold)] scale-105 shadow-lg shadow-[var(--color-accent-gold)]/10' : 'bg-black/30 border-transparent hover:border-white/20'}`}>
                        <input 
                            type="checkbox"
                            checked={selectedContactIds.includes(contact.id)}
                            onChange={() => handleSelection(contact.id)}
                            className="h-5 w-5 rounded bg-black/50 border-white/30 text-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)]/50 shrink-0"
                        />
                        <Avatar contact={contact} size="sm" />
                        <span className="text-white font-medium flex-1">{contact.name}</span>
                        {selectedContactIds.includes(contact.id) && (
                            <CheckCircleIcon className="text-[var(--color-accent-gold)] shrink-0" />
                        )}
                    </label>
                ))}
            </div>
        </div>

        <div className="max-w-5xl mx-auto">
            {selectedContactIds.length === 0 ? (
                <div className="text-center p-12 glass-card">
                    <p className="text-[var(--color-text-secondary)]">Please select one or more contacts to view their Comparison Matrix.</p>
                </div>
            ) : (
                <div className="space-y-16">
                    {selectedContacts.map(contact => {
                        const isGenerating = generatingForIds.includes(contact.id);
                        if (isGenerating) {
                            return (
                                <div key={contact.id} className="flex flex-col items-center justify-center min-h-[30vh] glass-card p-8">
                                    <Spinner />
                                    <p className="mt-4 text-[var(--color-accent-gold)]">Generating Executive Blueprint for {contact.name}...</p>
                                </div>
                            );
                        }
                        
                        if (!contact.report) {
                             return (
                                <div key={contact.id} className="text-center p-12 glass-card">
                                    <Avatar contact={contact} size="lg" />
                                    <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white mt-4 mb-2">No report found for {contact.name}</h2>
                                    <p className="text-[var(--color-text-secondary)] mb-6">An Executive Blueprint must be generated to view their Comparison Matrix.</p>
                                    <button
                                        onClick={() => onGenerateReport(contact)}
                                        className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                                    >
                                        Generate Executive Blueprint
                                    </button>
                                </div>
                            );
                        }

                        return <ComparisonChart key={contact.id} contact={contact} />;
                    })}
                </div>
            )}
        </div>
    </div>
  );
};

export default ComparisonAnalyzer;
