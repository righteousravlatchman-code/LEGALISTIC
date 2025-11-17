import React, { useState } from 'react';
import type { Contact } from '../types';
import JapaneseZodiacChart from './JapaneseZodiacChart';
import Spinner from './Spinner';
import Avatar from './Avatar';

interface JapaneseZodiacAnalyzerProps {
  contacts: Contact[];
  onGenerateReport: (contact: Contact) => void;
  generatingForIds: string[];
}

const JapaneseZodiacAnalyzer: React.FC<JapaneseZodiacAnalyzerProps> = ({ contacts, onGenerateReport, generatingForIds }) => {
  const [selectedContactId, setSelectedContactId] = useState<string>('');
  
  const selectedContact = contacts.find(c => c.id === selectedContactId);
  const isGenerating = selectedContact && generatingForIds.includes(selectedContact.id);
  const reportData = selectedContact?.report?.whyTheyAreLikeThis?.japaneseZodiac;

  return (
    <div className="p-4 md:p-8">
        <div className="text-center mb-12">
            <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl md:text-4xl font-bold gradient-text mb-2 uppercase tracking-widest">Japanese Zodiac (Jūnishi)</h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">Explore an individual's character based on the 12-year cycle of animal signs from the Japanese calendar.</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
            <label htmlFor="contact-select-japanese" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2 text-center">Select a Profile to Analyze</label>
            <select
                id="contact-select-japanese"
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

        <div className="max-w-3xl mx-auto">
            {!selectedContact && (
                <div className="text-center p-12 glass-card">
                    <p className="text-[var(--color-text-secondary)]">Please select a contact to view their Japanese Zodiac Blueprint.</p>
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
                    <p className="text-[var(--color-text-secondary)] mb-6">An Executive Blueprint must be generated to view their Japanese Zodiac.</p>
                    <button
                        onClick={() => onGenerateReport(selectedContact)}
                        className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]"
                    >
                        Generate Executive Blueprint
                    </button>
                </div>
            )}

            {reportData && !isGenerating && (
                <JapaneseZodiacChart data={reportData} />
            )}
        </div>
    </div>
  );
};

export default JapaneseZodiacAnalyzer;