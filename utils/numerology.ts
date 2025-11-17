

const reduceToSingleDigit = (n: number): number => {
  let sum = n;
  // We don't reduce master numbers 11, 22, 33 in some traditions,
  // but for personal year, reduction to a single digit is standard.
  while (sum > 9) {
    sum = String(sum)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
};

/**
 * Calculates the Personal Year in numerology.
 * The formula is Month of Birth + Day of Birth + Current Year, with each part reduced to a single digit.
 * @param birthDateString - The birth date in 'YYYY-MM-DD' format.
 * @returns The Personal Year as a single digit number.
 */
export const calculatePersonalYear = (birthDateString: string): number => {
  // Using UTC methods to avoid timezone off-by-one errors with dates.
  const date = new Date(birthDateString);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const currentYear = new Date().getFullYear();

  const monthReduced = reduceToSingleDigit(month);
  const dayReduced = reduceToSingleDigit(day);
  const yearReduced = reduceToSingleDigit(currentYear);

  const total = monthReduced + dayReduced + yearReduced;
  
  return reduceToSingleDigit(total);
};

/**
 * Calculates the current lunar phase.
 * @param date - The date for which to calculate the phase. Defaults to now.
 * @returns An object with the phase name, illumination percentage, and an emoji.
 */
export const getLunarPhase = (date: Date = new Date()) => {
    const getJulianDate = (year: number, month: number, day: number) => {
        let a = Math.floor((14 - month) / 12);
        let y = year + 4800 - a;
        let m = month + 12 * a - 3;
        let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        return jdn;
    }

    const jd = getJulianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const daysSinceNewMoon = jd - 2451549.5;
    const newMoons = daysSinceNewMoon / 29.53058861;
    const phase = newMoons - Math.floor(newMoons); // number between 0 and 1

    const illumination = 0.5 * (1 - Math.cos(2 * Math.PI * phase));

    let phaseName: string;
    let emoji: string;

    if (phase < 0.03 || phase > 0.97) {
        phaseName = "New Moon";
        emoji = "🌑";
    } else if (phase < 0.23) {
        phaseName = "Waxing Crescent";
        emoji = "🌒";
    } else if (phase < 0.27) {
        phaseName = "First Quarter";
        emoji = "🌓";
    } else if (phase < 0.48) {
        phaseName = "Waxing Gibbous";
        emoji = "🌔";
    } else if (phase < 0.52) {
        phaseName = "Full Moon";
        emoji = "🌕";
    } else if (phase < 0.73) {
        phaseName = "Waning Gibbous";
        emoji = "🌖";
    } else if (phase < 0.77) {
        phaseName = "Last Quarter";
        emoji = "🌗";
    } else {
        phaseName = "Waning Crescent";
        emoji = "🌘";
    }

    return {
        name: phaseName,
        illumination: Math.round(illumination * 100),
        emoji: emoji
    };
}

export type ZodiacElement = 'Fire' | 'Earth' | 'Air' | 'Water';

export const getZodiacSign = (birthDateString: string): { sign: string, element: ZodiacElement } => {
    if (!birthDateString) return { sign: "Unknown", element: "Air" };

    const date = new Date(birthDateString + 'T00:00:00Z'); // Use UTC to avoid timezone issues
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Aries', element: 'Fire' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Taurus', element: 'Earth' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gemini', element: 'Air' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Cancer', element: 'Water' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leo', element: 'Fire' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgo', element: 'Earth' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', element: 'Air' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Scorpio', element: 'Water' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagittarius', element: 'Fire' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Capricorn', element: 'Earth' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquarius', element: 'Air' };
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { sign: 'Pisces', element: 'Water' };

    return { sign: 'Unknown', element: 'Air' }; // Default fallback
};

export const getVietnameseZodiac = (birthDateString: string): string => {
    if (!birthDateString) return "Unknown";
    const year = new Date(birthDateString + 'T00:00:00Z').getUTCFullYear();
    const animals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Water Buffalo', 'Tiger', 'Cat', 'Dragon', 'Snake', 'Horse', 'Goat'];
    return animals[year % 12];
};