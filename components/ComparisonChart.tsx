import React from 'react';
import type { Contact } from '../types';
import { getZodiacSign } from '../utils/numerology';
import WesternZodiacIcon from './WesternZodiacIcon';
import ChineseZodiacIcon from './ChineseZodiacIcon';
import JapaneseZodiacIcon from './JapaneseZodiacIcon';

// Re-using icons from other components
const MayanDaySignIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>;
const AztecDaySignIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l4 4-4 4-4-4 4-4zM2 12l4 4-4 4-4-4 4-4zM18 12l4 4-4 4-4-4 4-4z"/></svg>;
const EgyptianAnkhIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4a4 4 0 01-4 4H6a4 4 0 01-4-4V2a4 4 0 014-4h2a4 4 0 014 4zM12 10v12"/></svg>;
const VedicMoonIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
const NumerologyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 14l-4-4 4-4"/><path d="M5 10h11.5a4.5 4.5 0 010 9H11"/></svg>;
const HumanDesignIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>;
const ArabicEsotericsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>;

interface ComparisonCardProps {
    icon: React.ReactNode;
    systemName: string;
    archetype: string;
    subtext?: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ icon, systemName, archetype, subtext }) => (
    <div className="glass-card p-4 flex items-center gap-4">
        <div className="w-12 h-12 flex-shrink-0 bg-black/30 rounded-lg border border-[var(--color-accent-gold)]/30 flex items-center justify-center text-[var(--color-accent-gold)]">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{systemName}</p>
            <p className="text-lg font-bold text-white truncate">{archetype}</p>
            {subtext && <p className="text-xs text-[var(--color-text-secondary)]">{subtext}</p>}
        </div>
    </div>
);

interface ComparisonChartProps {
  contact: Contact;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ contact }) => {
    const report = contact.report;
    const westernZodiac = getZodiacSign(contact.birthDate);

    if (!report) return null;

    const cards: (ComparisonCardProps | null)[] = [
        { icon: <WesternZodiacIcon sign={westernZodiac.sign} />, systemName: 'Western Zodiac', archetype: westernZodiac.sign, subtext: westernZodiac.element },
        report.whyTheyAreLikeThis.chineseZodiac ? { icon: <ChineseZodiacIcon animal={report.whyTheyAreLikeThis.chineseZodiac.animalSign} />, systemName: 'Chinese Zodiac', archetype: report.whyTheyAreLikeThis.chineseZodiac.animalSign, subtext: report.whyTheyAreLikeThis.chineseZodiac.element } : null,
        report.whyTheyAreLikeThis.japaneseZodiac ? { icon: <JapaneseZodiacIcon animal={report.whyTheyAreLikeThis.japaneseZodiac.animalSign} />, systemName: 'Japanese Zodiac', archetype: report.whyTheyAreLikeThis.japaneseZodiac.animalSign, subtext: report.whyTheyAreLikeThis.japaneseZodiac.element } : null,
        report.whyTheyAreLikeThis.mayanAstrology ? { icon: <MayanDaySignIcon />, systemName: 'Mayan Astrology', archetype: report.whyTheyAreLikeThis.mayanAstrology.daySignName, subtext: `Tone: ${report.whyTheyAreLikeThis.mayanAstrology.galacticToneNumber}` } : null,
        report.whyTheyAreLikeThis.aztecAstrology ? { icon: <AztecDaySignIcon />, systemName: 'Aztec Astrology', archetype: report.whyTheyAreLikeThis.aztecAstrology.daySignName, subtext: report.whyTheyAreLikeThis.aztecAstrology.trecenaName } : null,
        report.whyTheyAreLikeThis.egyptianAstrology ? { icon: <EgyptianAnkhIcon />, systemName: 'Egyptian Astrology', archetype: report.whyTheyAreLikeThis.egyptianAstrology.signName, subtext: `Deity: ${report.whyTheyAreLikeThis.egyptianAstrology.rulingDeity}` } : null,
        report.whyTheyAreLikeThis.vedicAstrology ? { icon: <VedicMoonIcon />, systemName: 'Vedic (Jyotish)', archetype: report.whyTheyAreLikeThis.vedicAstrology.rashiMoonSign, subtext: `Asc: ${report.whyTheyAreLikeThis.vedicAstrology.lagnaAscendant}` } : null,
        report.coreNumbers ? { icon: <NumerologyIcon />, systemName: 'Numerology', archetype: `Life Path ${report.coreNumbers.lifePathNumber.number}`, subtext: `Expression: ${report.coreNumbers.expressionNumber.number}` } : null,
        report.whyTheyAreLikeThis.humanDesign ? { icon: <HumanDesignIcon />, systemName: 'Human Design', archetype: report.whyTheyAreLikeThis.humanDesign.type, subtext: report.whyTheyAreLikeThis.humanDesign.profile } : null,
        report.whyTheyAreLikeThis.arabicEsoterics ? { icon: <ArabicEsotericsIcon />, systemName: 'Arabic Esoterics', archetype: report.whyTheyAreLikeThis.arabicEsoterics.esotericQuality, subtext: `Abjad: ${report.whyTheyAreLikeThis.arabicEsoterics.abjadValue}` } : null,
    ];

    const validCards = cards.filter(Boolean) as ComparisonCardProps[];

    return (
        <div className="animate-in">
             <h2 style={{fontFamily: 'var(--font-serif)'}} className="text-2xl font-bold text-white mb-2 text-center">Archetype Matrix for {contact.name}</h2>
             <p className="text-center text-[var(--color-text-secondary)] mb-6">{report.identityLayer.archetypeTitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {validCards.map((cardProps, index) => (
                    <ComparisonCard key={index} {...cardProps} />
                ))}
            </div>
        </div>
    );
};

export default ComparisonChart;
