import React from 'react';
import type { ChineseZodiac } from '../types';
import ChineseZodiacIcon from './ChineseZodiacIcon';

interface ChineseZodiacChartProps {
  data: ChineseZodiac;
}

const ChineseZodiacChart: React.FC<ChineseZodiacChartProps> = ({ data }) => {
  return (
    <div tabIndex={0} className="glass-card p-4 md:p-6 transition-all duration-300 flex flex-col md:flex-row items-center gap-6">
      <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-black/30 rounded-full border-2 border-[var(--color-accent-gold)]/50 flex items-center justify-center p-4 shadow-inner">
        <ChineseZodiacIcon animal={data.animalSign} className="text-[var(--color-accent-gold)] w-full h-full" />
      </div>
      <div className="flex-1 text-center md:text-left">
          <h3 style={{fontFamily: 'var(--font-serif)'}} className="text-lg md:text-xl font-bold uppercase tracking-widest gradient-text">Chinese Zodiac Blueprint</h3>
          <p style={{fontFamily: 'var(--font-serif)'}} className="text-2xl md:text-3xl font-bold text-white mt-1">{data.element} {data.animalSign}</p>
          <div className="border-t border-[var(--color-accent-gold)]/20 pt-3 mt-3">
              <p className="text-white whitespace-pre-wrap leading-relaxed">{data.summary}</p>
          </div>
      </div>
    </div>
  );
};

export default ChineseZodiacChart;