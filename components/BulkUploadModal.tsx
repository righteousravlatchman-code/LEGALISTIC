import React, { useState, useCallback } from 'react';
import type { Contact } from '../types';
import { parseContactData } from '../utils/csvParser';
import Spinner from './Spinner';

// Icons
const XIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const UploadCloudIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><polyline points="16 16 12 12 8 16"></polyline></svg>;
const ClipboardIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const FileTextIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const FileIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;


interface BulkUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBulkAdd: (contacts: Omit<Contact, 'id' | 'report'>[]) => void;
}

type Tab = 'paste' | 'csv' | 'pdf';

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose, onBulkAdd }) => {
    const [activeTab, setActiveTab] = useState<Tab>('paste');
    const [textValue, setTextValue] = useState('');
    const [fileName, setFileName] = useState('');
    const [parsedContacts, setParsedContacts] = useState<Omit<Contact, 'id' | 'report'>[]>([]);
    const [parsingErrors, setParsingErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const resetState = useCallback(() => {
        setTextValue('');
        setFileName('');
        setParsedContacts([]);
        setParsingErrors([]);
        setIsLoading(false);
    }, []);

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleParse = (data: string) => {
        setIsLoading(true);
        setParsedContacts([]);
        setParsingErrors([]);
        setTimeout(() => { // Simulate processing time
            const { contacts, errors } = parseContactData(data);
            setParsedContacts(contacts);
            setParsingErrors(errors);
            setIsLoading(false);
        }, 500);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setTextValue(text);
                handleParse(text);
            };
            reader.readAsText(file);
        }
    };
    
    const handleSubmit = () => {
        if (parsedContacts.length > 0) {
            onBulkAdd(parsedContacts);
            handleClose();
        }
    };
    
    const TabButton = ({ tab, label, icon }: { tab: Tab, label: string, icon: React.ReactNode }) => (
        <button
            onClick={() => {
                setActiveTab(tab);
                resetState();
            }}
            className={`flex-1 p-3 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] rounded-t-md ${
                activeTab === tab 
                ? 'border-[var(--color-accent-gold)] text-white' 
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
        >
            {icon}
            {label}
        </button>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in" onClick={handleClose} role="dialog" aria-modal="true">
            <div className="glass-card p-6 md:p-8 max-w-3xl w-full flex flex-col max-h-[90vh] animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold gradient-text uppercase tracking-widest">Bulk Profile Uploader</h2>
                    <button onClick={handleClose} className="text-[var(--color-text-secondary)] hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]" aria-label="Close modal"><XIcon/></button>
                </div>

                <div className="flex border-b border-white/10 mb-6 flex-shrink-0">
                    <TabButton tab="paste" label="Paste Text" icon={<ClipboardIcon />} />
                    <TabButton tab="csv" label="Upload CSV" icon={<FileTextIcon />} />
                    <TabButton tab="pdf" label="Upload PDF" icon={<FileIcon />} />
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {activeTab === 'paste' && (
                        <div>
                            <label htmlFor="paste-area" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                                Paste contacts below, one per line.
                            </label>
                            <p className="text-xs text-[var(--color-text-secondary)]/70 mb-2">Format: <code className="bg-black/30 p-1 rounded">Name,YYYY-MM-DD</code>. Birth time and location are optional.</p>
                            <textarea
                                id="paste-area"
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                placeholder="Cristiano Ronaldo,1985-02-05&#10;Elon Musk,1971-06-28"
                                className="w-full h-32 bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3 resize-y"
                            />
                            <button onClick={() => handleParse(textValue)} disabled={isLoading || !textValue} className="mt-4 w-full bg-black/30 border border-white/20 text-[var(--color-text-secondary)] font-bold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50">
                                {isLoading ? <Spinner /> : 'Preview Contacts'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'csv' && (
                        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-accent-gold)]/30 rounded-lg p-6 text-center h-48">
                            <UploadCloudIcon className="w-12 h-12 text-[var(--color-accent-gold)]/50 mb-2" />
                            <p className="text-lg font-semibold text-white">
                                {fileName ? `Selected: ${fileName}` : 'Click to upload or drag & drop'}
                            </p>
                            <p className="text-sm text-[var(--color-text-secondary)]">CSV file with columns: name, birth date. (birth time and location are optional)</p>
                            <input type="file" accept=".csv" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                    )}
                    
                    {activeTab === 'pdf' && (
                         <div className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-accent-gold)]/30 rounded-lg p-6 text-center h-48">
                             <FileIcon className="w-12 h-12 text-[var(--color-accent-gold)]/50 mb-2" />
                            <p className="text-lg font-semibold text-white">PDF Upload (Coming Soon)</p>
                            <p className="text-sm text-[var(--color-text-secondary)]">This feature will require a structured PDF with a clear table format.</p>
                        </div>
                    )}

                    {(parsedContacts.length > 0 || parsingErrors.length > 0) && (
                        <div className="border-t border-white/10 pt-4">
                            <h3 className="font-semibold text-white mb-2">Import Preview</h3>
                            {parsedContacts.length > 0 && (
                                <div className="bg-black/20 p-3 rounded-lg max-h-40 overflow-y-auto mb-2">
                                    <p className="text-sm text-green-400 mb-2">Found {parsedContacts.length} valid contact(s):</p>
                                    <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                        {parsedContacts.map((c, i) => <li key={i}>{c.name} - {c.birthDate}</li>)}
                                    </ul>
                                </div>
                            )}
                            {parsingErrors.length > 0 && (
                                <div className="bg-rose-900/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                                    <p className="text-sm text-rose-400 mb-2">Found {parsingErrors.length} error(s):</p>
                                     <ul className="text-xs text-rose-300 space-y-1">
                                        {parsingErrors.map((e, i) => <li key={i}>{e}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 pt-4 mt-4 border-t border-white/10 flex-shrink-0">
                    <button type="button" onClick={handleClose} className="bg-transparent border border-white/30 text-[var(--color-text-secondary)] font-bold py-2 px-6 rounded-xl hover:bg-white/10 hover:text-white transition-colors">Cancel</button>
                    <button type="button" onClick={handleSubmit} disabled={parsedContacts.length === 0} className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] hover:shadow-lg hover:shadow-yellow-900/40 text-black font-bold py-2 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        Add {parsedContacts.length > 0 ? `${parsedContacts.length} ` : ''}Contacts
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkUploadModal;