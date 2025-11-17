import React, { useState, useEffect } from 'react';
import type { Devotional } from '../types';
import { generateDevotional } from '../services/geminiService';
import Spinner from './Spinner';

const DevotionalComponent: React.FC = () => {
    const [devotional, setDevotional] = useState<Devotional | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevotional = async () => {
            setIsLoading(true);
            setError(null);
            const today = new Date().toISOString().split('T')[0];
            
            try {
                const cached = localStorage.getItem('dailyDevotional');
                if (cached) {
                    const { date, data } = JSON.parse(cached);
                    if (date === today) {
                        setDevotional(data);
                        setIsLoading(false);
                        return;
                    }
                }

                const data = await generateDevotional();
                setDevotional(data);
                localStorage.setItem('dailyDevotional', JSON.stringify({ date: today, data }));

            } catch (err) {
                console.error("Failed to fetch devotional:", err);
                setError("Could not retrieve today's devotional. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDevotional();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8">
            <div className="text-center mb-12">
                <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl md:text-4xl font-bold gradient-text mb-2 uppercase tracking-widest">Daily Devotional</h1>
                <p className="text-[var(--color-text-secondary)]">A moment of reflection in the style of C.H. Mackintosh.</p>
            </div>
            
            <div className="glass-card p-6 md:p-10">
                 {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[30rem]">
                        <Spinner />
                        <p className="mt-4 text-[var(--color-accent-gold)]">Preparing today's reflection...</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 min-h-[30rem] flex items-center justify-center">
                        <p>{error}</p>
                    </div>
                ) : devotional ? (
                    <div className="space-y-6">
                        <div className="text-center border-b-2 border-dashed border-[var(--color-accent-gold)]/20 pb-6">
                            <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl font-bold text-white">{devotional.title}</h2>
                            <p className="text-lg text-[var(--color-accent-gold)] mt-2">{devotional.scriptureReference}</p>
                        </div>
                        
                        <blockquote className="bg-black/30 p-4 border-l-4 border-[var(--color-accent-gold)] rounded-r-lg">
                             <p className="text-white/90 italic leading-relaxed">"{devotional.scriptureText}"</p>
                        </blockquote>

                        <div>
                            <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white mb-3">Reflection</h3>
                            <div className="prose prose-invert text-[var(--color-text-secondary)] max-w-none space-y-4 leading-loose" dangerouslySetInnerHTML={{ __html: devotional.reflection.replace(/\n/g, '<br />') }} />
                        </div>

                        <div className="border-t border-[var(--color-accent-gold)]/20 pt-6">
                            <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white mb-3">Prayer</h3>
                            <p className="text-[var(--color-text-secondary)] italic leading-relaxed">{devotional.prayer}</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default DevotionalComponent;