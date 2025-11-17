import React, { useState, useEffect, useRef } from 'react';
import type { AppView } from './types';
import CosmicCrm from './components/CosmicCrm';
import MoonMoves from './components/LunarCalendar';
import ProfileProgress from './components/ProfileProgress';
import ImageAlchemist from './components/ImageAlchemist';
import Devotional from './components/Devotional';
import Money from './components/Money';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('crm');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavButton: React.FC<{
    targetView: AppView;
    children: React.ReactNode;
  }> = ({ targetView, children }) => {
    const isActive = view === targetView;
    return (
      <button
        onClick={() => setView(targetView)}
        className={`px-4 sm:px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)] focus:ring-[var(--color-accent-gold)] ${
          isActive
            ? 'bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black shadow-lg shadow-[var(--color-accent-gold)]/20'
            : 'text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="min-h-screen">
        <header className={`p-4 sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-accent-gold)]/20 shadow-lg' : ''}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-xl sm:text-2xl font-bold tracking-widest uppercase gradient-text">MEMBER ACCESS</h1>
              <nav className="bg-black/30 backdrop-blur-lg p-2 rounded-2xl border border-[var(--color-accent-gold)]/30 flex flex-wrap justify-center gap-2 shadow-md">
                  <NavButton targetView="crm">CRM</NavButton>
                  <NavButton targetView="money">Money</NavButton>
                  <NavButton targetView="devotional">Devotional</NavButton>
                  <NavButton targetView="moonmoves">MOON MOVES</NavButton>
                  <NavButton targetView="profile">Profile</NavButton>
                  <NavButton targetView="alchemist">Alchemist</NavButton>
              </nav>
          </div>
        </header>

        <main key={view} className="animate-in">
            {view === 'crm' && <CosmicCrm />}
            {view === 'money' && <Money />}
            {view === 'devotional' && <Devotional />}
            {view === 'moonmoves' && <MoonMoves />}
            {view === 'profile' && <ProfileProgress />}
            {view === 'alchemist' && <ImageAlchemist />}
        </main>
        
        <footer className="text-center p-4 text-[var(--color-text-secondary)] text-xs">
            MEMBER ACCESS | Powered by Gemini
        </footer>
      </div>
    </div>
  );
};

export default App;