import React, { useState, useEffect } from 'react';
import { getLunarPhase } from '../utils/numerology';
import { getLunarInsight, getTideChart } from '../services/geminiService';
import Spinner from './Spinner';
import type { TideEvent } from '../types';

interface LunarPhase {
    name: string;
    illumination: number;
    emoji: string;
}

const TideUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 6H3m18 6H3m18 6H3M12 4v16m4-12-4-4-4 4"/></svg>;
const TideDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 6H3m18 6H3m18 6H3M12 4v16m4 0-4 4-4-4"/></svg>;

const MoonMoves: React.FC = () => {
    const [phase, setPhase] = useState<LunarPhase | null>(null);
    const [insight, setInsight] = useState<string | null>(null);
    const [tideData, setTideData] = useState<TideEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTideLoading, setIsTideLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tideError, setTideError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLunarData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const currentPhase = getLunarPhase();
                setPhase(currentPhase);
                const aiInsight = await getLunarInsight(currentPhase.name);
                setInsight(aiInsight);
            } catch (err) {
                console.error("Failed to fetch lunar data:", err);
                setError("Could not retrieve cosmic insights at this time.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchTideData = () => {
            setIsTideLoading(true);
            setTideError(null);
            if (!navigator.geolocation) {
                setTideError("Geolocation is not supported by your browser.");
                setIsTideLoading(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const tides = await getTideChart(latitude, longitude);
                        setTideData(tides);
                    } catch (err) {
                        console.error("Failed to fetch tide data:", err);
                        setTideError("Could not retrieve local tide data.");
                    } finally {
                        setIsTideLoading(false);
                    }
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    setTideError("Could not get your location. Please enable location services to see local tides.");
                    setIsTideLoading(false);
                }
            );
        };

        fetchLunarData();
        fetchTideData();
    }, []);
    
    const TideChart = () => (
        <div className="w-full glass-card p-6 md:p-8 mt-12">
            <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl md:text-3xl font-bold text-white text-center mb-6">Local Tide Chart</h2>
            {isTideLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[10rem]">
                    <Spinner />
                    <p className="mt-4 text-[var(--color-accent-gold)]">Fetching local tide data...</p>
                </div>
            ) : tideError ? (
                <p className="text-red-400 text-center">{tideError}</p>
            ) : tideData.length > 0 ? (
                <div className="relative border-l-2 border-dashed border-[var(--color-accent-gold)]/30 ml-4 pl-8 space-y-8">
                    {tideData.map((event, index) => (
                        <div key={index} className="relative flex items-center">
                            <div className="absolute -left-[45px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-[var(--color-accent-gold)]/50 flex items-center justify-center text-[var(--color-accent-gold)]">
                                {event.type === 'High Tide' ? <TideUpIcon /> : <TideDownIcon />}
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg">{event.type}</p>
                                <p className="text-[var(--color-text-secondary)]">
                                    <span className="font-mono">{event.time}</span> - <span className="font-bold">{event.height}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <p className="text-center text-[var(--color-text-secondary)]">No tide data available for this location.</p>
            )}
        </div>
    );


    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 flex flex-col items-center text-center">
            <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl md:text-4xl font-bold gradient-text mb-4 uppercase tracking-widest">MOON MOVES</h1>
            <p className="text-[var(--color-text-secondary)] mb-8">Strategic insights based on the current lunar and tidal cycles.</p>

            <div className="w-full glass-card p-6 md:p-8">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[20rem]">
                        <Spinner />
                        <p className="mt-4 text-[var(--color-accent-gold)]">Reading the celestial currents...</p>
                    </div>
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : phase && (
                    <>
                        <div className="text-6xl md:text-8xl mb-4">{phase.emoji}</div>
                        <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl md:text-3xl font-bold text-white">{phase.name}</h2>
                        <p className="text-lg text-[var(--color-text-secondary)] mb-6">Illumination: {phase.illumination}%</p>
                        <div className="border-t border-[var(--color-accent-gold)]/20 pt-6">
                             <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-xl font-bold text-[var(--color-accent-gold)] mb-3">Strategic Insight</h3>
                             <p className="text-white md:text-lg leading-relaxed">{insight}</p>
                        </div>
                    </>
                )}
            </div>
            
            <TideChart />
        </div>
    );
};

export default MoonMoves;