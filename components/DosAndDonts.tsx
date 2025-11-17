
import React from 'react';

const CheckIcon: React.FC<{className?: string}> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`flex-shrink-0 text-green-400 ${className}`}><polyline points="20 6 9 17 4 12"></polyline></svg>;
const XIcon: React.FC<{className?: string}> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`flex-shrink-0 text-red-400 ${className}`}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

interface DosAndDontsProps {
  text: string;
}

const parseText = (text: string) => {
    const parts = text.split(/DON'T:|DO NOT:/i);
    const doText = (parts[0] || '').replace(/DO:/gi, '').trim();
    const dontText = parts[1] || '';

    const dos = doText.split(/\.\s*/).map(s => s.trim().replace(/^DO\s/i, '')).filter(Boolean);
    const donts = dontText.split(/\.\s*/).map(s => s.trim()).filter(Boolean);
    
    if (dos.length === 1 && dos[0].includes(',') && !dontText) {
      return { dos: dos[0].split(',').map(s => s.trim()), donts: [] };
    }
    
    if (donts.length === 1 && donts[0].includes(',')) {
        return { dos: dos, donts: donts[0].split(',').map(s => s.trim()) };
    }

    return { dos, donts };
};

const DosAndDonts: React.FC<DosAndDontsProps> = ({ text }) => {
  const { dos, donts } = parseText(text);

  if (dos.length === 0 && donts.length === 0) {
      return (
          <div className="glass-card p-6">
              <h4 style={{fontFamily: 'var(--font-serif)'}} className="font-bold text-white text-xl mb-4">Actionable Approaches</h4>
              <p className="text-white leading-relaxed whitespace-pre-wrap">{text}</p>
          </div>
      );
  }

  return (
    <div className="glass-card grid grid-cols-1 md:grid-cols-2 gap-px bg-gradient-to-r from-[var(--color-accent-gold)]/20 to-[var(--color-accent-indigo)]/20 p-px rounded-2xl overflow-hidden">
        <div className="bg-[var(--color-bg-primary)] p-6 rounded-l-2xl">
          <h4 style={{fontFamily: 'var(--font-serif)'}} className="font-bold text-white text-xl flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center"><CheckIcon /></div>
              DO
          </h4>
          <ul className="space-y-3 list-none p-0 m-0">
              {dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--color-text-secondary)] leading-relaxed">
                      <span className="text-green-400 mt-1.5 font-bold">✓</span>
                      <span>{item}</span>
                  </li>
              ))}
          </ul>
        </div>

        <div className="bg-[var(--color-bg-primary)] p-6 rounded-r-2xl">
           <h4 style={{fontFamily: 'var(--font-serif)'}} className="font-bold text-white text-xl flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center"><XIcon /></div>
              DON'T
          </h4>
          <ul className="space-y-3 list-none p-0 m-0">
              {donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--color-text-secondary)] leading-relaxed">
                      <span className="text-red-400 mt-1.5 font-bold">✗</span>
                      <span>{item}</span>
                  </li>
              ))}
          </ul>
        </div>
    </div>
  );
};

export default DosAndDonts;
