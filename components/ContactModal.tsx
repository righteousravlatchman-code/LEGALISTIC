import React, { useState, useEffect } from 'react';
import type { Contact } from '../types';

const ContactModal: React.FC<{ 
    contactToEdit: Partial<Contact> | null;
    onClose: () => void; 
    onSaveContact: (contact: Partial<Contact>) => void;
}> = ({ contactToEdit, onClose, onSaveContact }) => {
    const [contactData, setContactData] = useState<Partial<Contact>>(contactToEdit || {});
    const [isBirthTimeUnknown, setIsBirthTimeUnknown] = useState(!contactToEdit?.birthTime);
    const [error, setError] = useState('');


    useEffect(() => {
        const initialData = contactToEdit || {};
        setContactData(initialData);
        setIsBirthTimeUnknown(!initialData.birthTime);
        setError('');
    }, [contactToEdit]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'birthDate') {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0,0,0,0);
            if (selectedDate > today) {
                setError('Birth date cannot be in the future.');
            } else {
                setError('');
            }
        }
        setContactData(prev => ({ ...prev, [name]: value }));
    };

    const handleUnknownTimeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setIsBirthTimeUnknown(isChecked);
        if (isChecked) {
            setContactData(prev => ({ ...prev, birthTime: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(error) return;
        onSaveContact(contactData);
        onClose();
    };

    if (!contactToEdit) return null;

    const isEditing = 'id' in contactToEdit && !!contactToEdit.id;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
            <div className="glass-card p-6 md:p-8 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold gradient-text uppercase tracking-widest">{isEditing ? 'Edit Profile' : 'Add New Profile'}</h2>
                    <button onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-secondary)]">Full Name</label>
                        <input type="text" name="name" id="name" value={contactData.name || ''} onChange={handleInputChange} required className="mt-1 block w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3"/>
                    </div>
                    <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-[var(--color-text-secondary)]">Birth Date</label>
                        <input type="date" name="birthDate" id="birthDate" value={contactData.birthDate || ''} onChange={handleInputChange} required className="mt-1 block w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3"/>
                         {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="birthTime" className="block text-sm font-medium text-[var(--color-text-secondary)]">Birth Time</label>
                            <div className="flex items-center">
                                <input 
                                    id="unknownTime" 
                                    name="unknownTime" 
                                    type="checkbox" 
                                    checked={isBirthTimeUnknown} 
                                    onChange={handleUnknownTimeToggle}
                                    className="h-4 w-4 rounded bg-black/50 border-white/30 text-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)]/50"
                                />
                                <label htmlFor="unknownTime" className="ml-2 text-sm text-[var(--color-text-secondary)]">Unknown</label>
                            </div>
                        </div>
                        <input 
                            type="time" 
                            name="birthTime" 
                            id="birthTime" 
                            value={contactData.birthTime || ''} 
                            onChange={handleInputChange} 
                            disabled={isBirthTimeUnknown}
                            className="mt-1 block w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3 disabled:bg-black/20 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="birthLocation" className="block text-sm font-medium text-[var(--color-text-secondary)]">Birth Location</label>
                        <input type="text" name="birthLocation" id="birthLocation" value={contactData.birthLocation || ''} onChange={handleInputChange} className="mt-1 block w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3"/>
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-[var(--color-text-secondary)]">Notes</label>
                        <textarea 
                            name="notes" 
                            id="notes" 
                            value={contactData.notes || ''} 
                            onChange={handleInputChange} 
                            rows={3} 
                            className="mt-1 block w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3 resize-y"
                            placeholder="Add any relevant notes here..."
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-transparent border border-white/30 text-[var(--color-text-secondary)] font-bold py-2 px-6 rounded-xl hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]">Cancel</button>
                        <button type="submit" disabled={!!error} className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] hover:shadow-lg hover:shadow-yellow-900/40 text-black font-bold py-2 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] disabled:opacity-50 disabled:cursor-not-allowed">{isEditing ? 'Save Changes' : 'Add Profile'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;