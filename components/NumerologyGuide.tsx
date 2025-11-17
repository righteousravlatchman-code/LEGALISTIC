import React, { useState, useMemo, useEffect } from 'react';
import type { Contact } from '../types';

const coreNumbersData = [
    { 
        number: 1, 
        title: "The Pioneer",
        essence: "Leadership, innovation, independence, and pioneering spirit. This energy initiates action, forges new paths, and thrives on being first.",
        shadow: "Can be prone to arrogance, impatience, and dominance. May struggle with collaboration and appear overly aggressive or selfish when insecure.",
        application: "Embrace your role as an initiator. Start new projects and trust your unique vision. Practice active listening to temper dominance and learn to delegate to build stronger teams."
    },
    { 
        number: 2, 
        title: "The Diplomat",
        essence: "Intuition, cooperation, diplomacy, and peacemaking. This energy builds bridges, fosters harmony, and is highly sensitive to the needs of others.",
        shadow: "Can become passive, overly emotional, indecisive, and co-dependent. May avoid necessary conflict to their own detriment.",
        application: "Use your gift for mediation to resolve conflicts. Trust your intuition in partnerships. Practice setting healthy boundaries to avoid becoming a doormat."
    },
    { 
        number: 3, 
        title: "The Communicator",
        essence: "Creativity, self-expression, communication, and joy. This energy is magnetic, inspiring, and finds fulfillment in artistic and social expression.",
        shadow: "Can be scattered, superficial, and prone to gossip or exaggeration. May start many things but finish few.",
        application: "Channel your creativity into tangible projects. Use your words to uplift and inspire. Practice disciplined focus to see your brilliant ideas through to completion."
    },
    { 
        number: 4, 
        title: "The Builder",
        essence: "Discipline, reliability, structure, and organization. This energy creates lasting foundations, values hard work, and provides stability.",
        shadow: "Can be rigid, controlling, stubborn, and overly cautious. May resist change and get lost in the details, becoming a workaholic.",
        application: "Create systems and processes that support long-term growth. Your dependability is a superpower; use it to build security for yourself and others. Practice flexibility and schedule downtime."
    },
    { 
        number: 5, 
        title: "The Adventurer",
        essence: "Freedom, adventure, charisma, and adaptability. This energy craves experience, embraces change, and connects with people easily.",
        shadow: "Can be impulsive, restless, irresponsible, and prone to overindulgence or addiction. May fear commitment.",
        application: "Use your adaptability to navigate change and explore new opportunities. Your charisma can be a powerful tool for influence. Practice moderation and focus on seeing one adventure through at a time."
    },
    { 
        number: 6, 
        title: "The Nurturer",
        essence: "Responsibility, nurturing, healing, and community. This energy is the caregiver of the zodiac, focused on family, service, and creating beauty.",
        shadow: "Can be overbearing, self-sacrificing, and meddling. May become a martyr or a perfectionist who struggles to let others help.",
        application: "Create a harmonious environment for your loved ones and community. Your counsel is valuable. Learn to receive as much as you give and allow others to take responsibility for themselves."
    },
    { 
        number: 7, 
        title: "The Seeker",
        essence: "Spirituality, analysis, deep thought, and wisdom. This energy is the philosopher and mystic, seeking truth beneath the surface.",
        shadow: "Can be withdrawn, skeptical, secretive, and aloof. May get lost in theory and neglect practical matters or relationships.",
        application: "Dedicate time to study, research, and introspection. Trust your powerful intuition. Share your wisdom with others, but remember to stay grounded in the real world."
    },
    { 
        number: 8, 
        title: "The Powerhouse",
        essence: "Ambition, strategy, achievement, and authority. This energy masters the material world, manifests abundance, and takes charge.",
        shadow: "Can be ruthless, materialistic, power-hungry, and overly controlling. A fear of failure can drive them to extremes.",
        application: "Step into leadership roles and take on big challenges. Use your strategic mind to achieve financial and professional success. Practice generosity and ensure your ambition is tied to a greater purpose."
    },
    { 
        number: 9, 
        title: "The Humanitarian",
        essence: "Compassion, vision, tolerance, and service to humanity. This energy has a global consciousness and seeks to uplift the world.",
        shadow: "Can be overly idealistic, resentful, and lack personal boundaries. May carry the weight of the world and neglect their own needs.",
        application: "Engage in work that has a broad, positive impact. Your wisdom can inspire many. Learn to say 'no' and focus your compassionate energy where it can be most effective without draining you."
    }
];

const masterNumbersData = [
    { 
        number: 11, 
        title: 'The Spiritual Messenger', 
        essence: "The 11 is a supercharged version of the 2. It possesses immense intuition, charisma, and a direct channel to inspiration. Its purpose is to uplift humanity through spiritual insight and creative expression.",
        shadow: "Prone to extreme anxiety, nervous tension, and energetic overload. The high frequency can be difficult to ground, leading to impracticality and feeling disconnected from reality.",
        application: "Trust your intuitive flashes and use them to guide others. You are a channel for higher wisdom; protect your energy field. Grounding practices like meditation and time in nature are non-negotiable." 
    },
    { 
        number: 22, 
        title: 'The Master Builder', 
        essence: "The 22 is a supercharged version of the 4. It has the ability to turn grand, spiritual visions into tangible, lasting reality. This is the number of large-scale, practical manifestation for the good of all.",
        shadow: "The pressure to perform can be immense, leading to control issues and a fear of not living up to potential. Can be impractical if the vision isn't grounded in a solid plan.",
        application: "Think big. Your purpose is to build systems, businesses, or movements that have a lasting, positive impact. Break down your monumental goals into practical, step-by-step plans." 
    },
    { 
        number: 33, 
        title: 'The Master Teacher', 
        essence: "The 33 is a supercharged version of the 6. It embodies unconditional love, compassion, and healing through service. Its purpose is to be a teacher and healer for humanity, often through creative and nurturing means.",
        shadow: "Can easily fall into martyrdom, burnout, and over-responsibility. The desire to heal everyone can lead to neglecting their own needs and becoming overly attached to the suffering of others.",
        application: "Your presence is healing. Lead through compassionate service and inspire others with your devotion. You must master the art of self-care to sustain your energy for the long haul."
    }
];

type SelectedNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;
type NumberRole = 'Life Path' | 'Expression' | 'Soul Urge' | 'Personality' | 'Birthday' | 'Maturity' | 'Hidden Passion' | 'Challenge' | 'Karmic Debt' | 'Personal Cycle';

const numberKeyMapping: Record<keyof import('../types').CoreNumbers, NumberRole> = {
    lifePathNumber: 'Life Path',
    expressionNumber: 'Expression',
    soulUrgeNumber: 'Soul Urge',
    personalityNumber: 'Personality',
    birthdayNumber: 'Birthday',
    maturityNumber: 'Maturity',
    hiddenPassionNumber: 'Hidden Passion',
    challengeNumbers: 'Challenge',
    karmicDebtNumbers: 'Karmic Debt',
    personalCycle: 'Personal Cycle'
};

const InfoCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={className}>
        <h4 style={{fontFamily: 'var(--font-serif)'}} className="font-bold text-lg text-[var(--color-accent-gold)] mb-2">{title}</h4>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{children}</p>
    </div>
);

const NumberDetail: React.FC<{ number: SelectedNum; contacts: Contact[] }> = ({ number, contacts }) => {
    
    const getContactsWithNumber = (num: number): { name: string, type: string }[] => {
        const foundContacts: { name: string, type: string }[] = [];
        if (!contacts) return foundContacts;

        contacts.forEach(contact => {
            if (contact.report?.coreNumbers) {
                for (const key in contact.report.coreNumbers) {
                    const numValue = contact.report.coreNumbers[key as keyof typeof contact.report.coreNumbers];
                    // FIX: Property 'split' does not exist on type 'string | CoreNumberValue'.
                    // This was causing a crash when trying to call `.split()` on a CoreNumberValue object.
                    // The new logic correctly handles both string and object types for numerology values
                    // and robustly finds all numbers within a string.
                    const valueAsString = (typeof numValue === 'object' && numValue !== null && 'number' in numValue)
                        ? (numValue as { number: string }).number
                        : numValue as string;

                    if (typeof valueAsString === 'string') {
                        const numbersInString = valueAsString.match(/\d+/g);
                        if (numbersInString) {
                            if (numbersInString.map(n => parseInt(n, 10)).includes(num)) {
                                const role = numberKeyMapping[key as keyof typeof numberKeyMapping];
                                foundContacts.push({ name: contact.name, type: role });
                            }
                        }
                    }
                }
            }
        });
        return foundContacts;
    };
    
    const matchingContacts = getContactsWithNumber(number);

    const data = number > 9
        ? masterNumbersData.find(n => n.number === number)
        : coreNumbersData.find(n => n.number === number);

    if (!data) return null;

    return (
        <div className="space-y-6">
            <InfoCard title="Core Essence">{data.essence}</InfoCard>
            <InfoCard title="Shadow Aspects">{data.shadow}</InfoCard>
            <InfoCard title="Actionable Guidance">{data.application}</InfoCard>
            
            {matchingContacts.length > 0 && (
                <div className="border-t border-[var(--color-accent-gold)]/20 pt-6">
                    <h4 style={{fontFamily: 'var(--font-serif)'}} className="font-bold text-lg text-[var(--color-accent-gold)] mb-3">Found in Your Network</h4>
                    <ul className="space-y-2">
                        {matchingContacts.map((match, index) => (
                            <li key={index} className="text-[var(--color-text-secondary)]">
                                <span className="font-bold text-white">{match.name}</span> - {match.type}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


interface NumerologyGuideProps {
  contacts: Contact[];
}

const NumerologyGuide: React.FC<NumerologyGuideProps> = ({ contacts }) => {
    const [selectedNumber, setSelectedNumber] = useState<SelectedNum>(1);
    const [filter, setFilter] = useState<'all' | 'relevant'>('all');

    const numbers: SelectedNum[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
    
    const relevantNumbers = useMemo(() => {
        const numberSet = new Set<number>();
        if (contacts) {
            contacts.forEach(contact => {
                if (contact.report?.coreNumbers) {
                    Object.values(contact.report.coreNumbers).forEach(value => {
                        let valueAsString: string | undefined;
                        if (typeof value === 'string') {
                            valueAsString = value;
                        } else if (typeof value === 'object' && value !== null && 'number' in value) {
                            valueAsString = (value as { number: string }).number;
                        }

                        if (valueAsString) {
                            const nums = valueAsString.match(/\d+/g);
                            if(nums) {
                                nums.forEach(num => {
                                    const parsedNum = parseInt(num, 10);
                                    if (!isNaN(parsedNum)) {
                                        numberSet.add(parsedNum);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
        return numberSet;
    }, [contacts]);

    const displayedNumbers = useMemo(() => {
        if (filter === 'relevant') {
            return numbers.filter(num => relevantNumbers.has(num));
        }
        return numbers;
    }, [filter, relevantNumbers]);

    useEffect(() => {
        if (displayedNumbers.length > 0 && !displayedNumbers.includes(selectedNumber)) {
            setSelectedNumber(displayedNumbers[0]);
        }
    }, [displayedNumbers, selectedNumber]);

    return (
        <div className="p-4 md:p-8">
            <div className="text-center mb-12">
                <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl md:text-4xl font-bold gradient-text mb-2 uppercase tracking-widest">Numerology Guide</h1>
                <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">An interactive guide to understand the vibrational meaning of each number and how to apply this knowledge for personal and professional growth.</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="bg-black/30 p-1 rounded-full border border-white/20 flex gap-1">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${
                            filter === 'all' ? 'bg-[var(--color-accent-gold)] text-black' : 'text-[var(--color-text-secondary)] hover:text-white'
                        }`}
                    >
                        All Numbers
                    </button>
                    <button
                        onClick={() => setFilter('relevant')}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${
                            filter === 'relevant' ? 'bg-[var(--color-accent-gold)] text-black' : 'text-[var(--color-text-secondary)] hover:text-white'
                        }`}
                    >
                        In Your Network
                    </button>
                </div>
            </div>

            {displayedNumbers.length > 0 ? (
                <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
                    {displayedNumbers.map(num => {
                        const isSelected = selectedNumber === num;
                        const isRelevant = relevantNumbers.has(num);
                        return (
                            <button
                                key={num}
                                onClick={() => setSelectedNumber(num)}
                                className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-xl md:text-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${
                                    isSelected
                                    ? 'bg-gradient-to-br from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black border-transparent scale-110'
                                    : 'bg-black/30 border-white/20 hover:border-[var(--color-accent-gold)]/50 text-white'
                                }`}
                            >
                                {isRelevant && !isSelected && filter === 'all' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-accent-gold)] rounded-full border-2 border-black animate-pulse"></span>}
                                {num}
                            </button>
                        )
                    })}
                </div>
            ) : (
                <p className="text-center text-[var(--color-text-secondary)] mb-8">
                    No numbers from this category are present in your current network.
                </p>
            )}

            {displayedNumbers.length > 0 && (
                <div className="max-w-3xl mx-auto glass-card p-6 md:p-8">
                    <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-3xl font-bold text-white mb-6 border-b-2 border-[var(--color-accent-gold)]/20 pb-4">
                        {selectedNumber > 9 
                            ? `Master Number ${selectedNumber}: ${masterNumbersData.find(n=>n.number === selectedNumber)?.title}` 
                            : `Core Number ${selectedNumber}: ${coreNumbersData.find(n=>n.number === selectedNumber)?.title}`
                        }
                    </h2>
                    <NumberDetail number={selectedNumber} contacts={contacts} />
                </div>
            )}
        </div>
    );
};

export default NumerologyGuide;
