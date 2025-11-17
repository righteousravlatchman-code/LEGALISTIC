import React, { useState, useEffect } from 'react';

interface SaveTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
}

const XIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim());
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in" onClick={onClose} role="dialog" aria-modal="true">
            <div className="glass-card p-6 md:p-8 max-w-md w-full animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-2xl font-bold gradient-text uppercase tracking-widest">Save as Archetype</h2>
                    <button onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]" aria-label="Close modal"><XIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="archetypeName" className="block text-sm font-medium text-[var(--color-text-secondary)]">Archetype Name</label>
                        <input
                            type="text"
                            name="archetypeName"
                            id="archetypeName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="e.g., 'Ideal Client Profile'"
                            className="mt-1 block w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-transparent border border-white/30 text-[var(--color-text-secondary)] font-bold py-2 px-6 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]">Cancel</button>
                        <button type="submit" className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] hover:shadow-lg hover:shadow-yellow-900/40 text-black font-bold py-2 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]">Save Archetype</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SaveTemplateModal;