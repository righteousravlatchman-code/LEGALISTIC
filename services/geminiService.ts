

// Fix: Add Modality to the import from @google/genai.
// FIX: Added Modality to the import from @google/genai to support image generation and editing.
import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { Contact, CrmReport, SynergyReport, DailyBriefing, JournalAnalysis, Devotional, TideEvent } from '../types';
import { calculatePersonalYear } from '../utils/numerology';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const coreNumberValueSchema = {
    type: Type.OBJECT,
    properties: {
        number: { type: Type.STRING, description: "The calculated number, including master numbers (e.g., '8', '11/2', '22/4')." },
        summary: { type: Type.STRING, description: "A 1-2 sentence summary of this number's core meaning for the individual." }
    },
    required: ["number", "summary"]
};


const coreNumbersSchema = {
    type: Type.OBJECT,
    properties: {
        lifePathNumber: { ...coreNumberValueSchema, description: "The Life Path Number and its core meaning." },
        expressionNumber: { ...coreNumberValueSchema, description: "The Expression (Destiny) Number and its core meaning." },
        soulUrgeNumber: { ...coreNumberValueSchema, description: "The Soul Urge (Heart's Desire) Number and its core meaning." },
        personalityNumber: { type: Type.STRING, description: "The Personality Number and how they appear to others." },
        birthdayNumber: { type: Type.STRING, description: "The Birthday Number and its specific influence." },
        maturityNumber: { type: Type.STRING, description: "The Maturity Number, representing the person's ultimate potential." },
        hiddenPassionNumber: { type: Type.STRING, description: "The Hidden Passion Number, revealing deep desires." },
        challengeNumbers: { type: Type.STRING, description: "Primary Challenge Numbers they must overcome." },
        karmicDebtNumbers: { type: Type.STRING, description: "Any Karmic Debt numbers (13, 14, 16, 19) present and their meanings." },
        personalCycle: { type: Type.STRING, description: "A summary of their current Personal Year, Month, and Day cycles." },
    },
    required: [
        "lifePathNumber", "expressionNumber", "soulUrgeNumber", "personalityNumber",
        "birthdayNumber", "maturityNumber", "hiddenPassionNumber", "challengeNumbers",
        "karmicDebtNumbers", "personalCycle"
    ]
};

const humanDesignSchema = {
    type: Type.OBJECT,
    description: "The person's core Human Design information. This requires birth time and location for accuracy.",
    properties: {
        type: { type: Type.STRING, description: "Their Human Design Type (e.g., Manifestor, Generator, Manifesting Generator, Projector, Reflector)." },
        strategy: { type: Type.STRING, description: "Their core Strategy for correct decision-making (e.g., To Respond, To Inform, To Wait for the Invitation)." },
        innerAuthority: { type: Type.STRING, description: "Their Inner Authority for guidance (e.g., Sacral, Emotional, Splenic)." },
        profile: { type: Type.STRING, description: "Their Profile (e.g., 6/2, 4/1, 1/3)." },
        definition: { type: Type.STRING, description: "Their Definition (e.g., Single, Split, Triple Split, Quadruple Split)." },
        centers: { type: Type.STRING, description: "A summary of their defined and open energy centers (e.g., '7 Defined, 2 Open')." },
        summary: { type: Type.STRING, description: "A 1-2 sentence summary of what their Human Design configuration means for their life and work." },
    },
    required: ["type", "strategy", "innerAuthority", "profile", "definition", "centers", "summary"]
};

const arabicEsotericsSchema = {
    type: Type.OBJECT,
    description: "An analysis based on Arabic esoteric teachings (Ilm al-Huruf, Abjad numerology). Requires the person's full name and birth date/time for accuracy.",
    properties: {
        abjadValue: { type: Type.NUMBER, description: "The calculated Abjad numerical value of the person's full birth name." },
        abjadNameMeaning: { type: Type.STRING, description: "The esoteric meaning and core vibration derived from the Abjad value of their name." },
        rulingPlanet: { type: Type.STRING, description: "The ruling planet according to Arabic esoteric traditions, with its Arabic name (e.g., 'Jupiter (Al-Mushtari)')." },
        dominantElement: { type: Type.STRING, description: "The dominant classical element (Fire, Earth, Air, Water) with its Arabic name (e.g., 'Fire (Al-Nar)')." },
        esotericQuality: { type: Type.STRING, description: "A descriptive title for their esoteric nature or archetype, preferably with an Arabic flavor (e.g., 'The Keeper of Secrets (Amin al-Asrar)')." },
        strategicGuidance: { type: Type.STRING, description: "A 1-2 sentence paragraph of actionable strategic guidance based on their Arabic esoteric profile, focusing on their innate strengths and challenges." },
    },
    required: ["abjadValue", "abjadNameMeaning", "rulingPlanet", "dominantElement", "esotericQuality", "strategicGuidance"]
};

const mayanAstrologySchema = {
    type: Type.OBJECT,
    description: "An analysis based on Mayan Astrology (Tzolkin calendar). Requires the person's birth date for accuracy.",
    properties: {
        daySignName: { type: Type.STRING, description: "The name of their Day Sign or Nahual (e.g., 'Imix', 'Kame')." },
        daySignQualities: { type: Type.STRING, description: "A comma-separated list of 3-4 key archetypal qualities of the Day Sign (e.g., 'Visionary, Nurturer, Communicator')." },
        daySignMeaning: { type: Type.STRING, description: "A detailed breakdown of the core essence and meaning of their Day Sign." },
        galacticToneNumber: { type: Type.NUMBER, description: "The number of their Galactic Tone (1-13)." },
        galacticToneMeaning: { type: Type.STRING, description: "A detailed breakdown of the meaning of their Galactic Tone and how it influences the Day Sign." },
        summary: { type: Type.STRING, description: "A final 1-2 sentence refined summary synthesizing the Day Sign and Tone, and its strategic implications." },
    },
    required: ["daySignName", "daySignQualities", "daySignMeaning", "galacticToneNumber", "galacticToneMeaning", "summary"]
};

const aztecAstrologySchema = {
    type: Type.OBJECT,
    description: "An analysis based on Aztec Astrology (Tonalamatl calendar). Requires the person's birth date for accuracy.",
    properties: {
        trecenaName: { type: Type.STRING, description: "The name of the Trecena (13-day period) they were born in (e.g., '1 Crocodile')." },
        trecenaMeaning: { type: Type.STRING, description: "A detailed breakdown of the core theme and influence of their ruling Trecena." },
        daySignName: { type: Type.STRING, description: "The name of their Aztec Day Sign (e.g., 'Cipactli', 'Ehecatl')." },
        daySignQualities: { type: Type.STRING, description: "A comma-separated list of 3-4 key archetypal qualities of the Day Sign (e.g., 'Survivor, Primal Force, Initiator')." },
        daySignMeaning: { type: Type.STRING, description: "A detailed breakdown of the core meaning and characteristics of their Day Sign." },
        lordOfTheNight: { type: Type.STRING, description: "The name of the Lord of the Night governing their birth (e.g., 'Xiuhtecuhtli')." },
        lordOfTheNightInfluence: { type: Type.STRING, description: "A sentence explaining the specific influence of this Lord of the Night on the person's character." },
        summary: { type: Type.STRING, description: "A final 1-2 sentence refined summary synthesizing all the Aztec astrological points and their strategic importance." },
    },
    required: ["trecenaName", "trecenaMeaning", "daySignName", "daySignQualities", "daySignMeaning", "lordOfTheNight", "lordOfTheNightInfluence", "summary"]
};

const egyptianAstrologySchema = {
    type: Type.OBJECT,
    description: "An analysis based on Egyptian Astrology. Requires the person's birth date for accuracy.",
    properties: {
        signName: { type: Type.STRING, description: "The name of their Egyptian astrological sign (e.g., 'The Nile', 'Amun-Ra')." },
        rulingDeity: { type: Type.STRING, description: "The name of the primary God or Goddess that rules this sign." },
        keyCharacteristics: { type: Type.STRING, description: "A comma-separated list of 3-5 key personality traits and characteristics." },
        strategicGuidance: { type: Type.STRING, description: "A 1-2 sentence paragraph of actionable strategic guidance based on their Egyptian sign's strengths and weaknesses." },
    },
    required: ["signName", "rulingDeity", "keyCharacteristics", "strategicGuidance"]
};

const vedicAstrologySchema = {
    type: Type.OBJECT,
    description: "An analysis based on Vedic Astrology (Jyotish). This requires birth date, time, and location for accuracy.",
    properties: {
        rashiMoonSign: { type: Type.STRING, description: "The person's Rashi (Moon Sign) in Vedic Astrology (e.g., 'Mesha - Aries')." },
        nakshatraLunarMansion: { type: Type.STRING, description: "The person's Nakshatra (Lunar Mansion) and its Pada (e.g., 'Ashwini Pada 1')." },
        lagnaAscendant: { type: Type.STRING, description: "The person's Lagna (Ascendant) sign in Vedic Astrology (e.g., 'Simha - Leo')." },
        currentDashaPeriod: { type: Type.STRING, description: "The major planetary period (Dasha) they are currently in (e.g., 'Saturn Dasha')." },
        keyPlanetaryInfluences: { type: Type.STRING, description: "A 1-2 sentence summary of the key planetary placements and their impact (e.g., 'Strong Jupiter in the 10th house indicates...')." },
        strategicGuidance: { type: Type.STRING, description: "A 1-2 sentence paragraph of actionable strategic guidance based on their Vedic chart, focusing on their karmic path and strengths." },
    },
    required: ["rashiMoonSign", "nakshatraLunarMansion", "lagnaAscendant", "currentDashaPeriod", "keyPlanetaryInfluences", "strategicGuidance"]
};

const chineseZodiacSchema = {
    type: Type.OBJECT,
    description: "An analysis based on the Chinese Zodiac (Shengxiao). Requires the person's birth year for accuracy.",
    properties: {
        animalSign: { type: Type.STRING, description: "The person's Chinese Zodiac animal sign (e.g., 'Dragon', 'Rabbit')." },
        element: { type: Type.STRING, description: "The element associated with their birth year (e.g., 'Wood', 'Fire', 'Earth', 'Metal', 'Water')." },
        summary: { type: Type.STRING, description: "A 1-2 sentence summary of the key traits and strategic implications of their Chinese Zodiac sign and element combination." },
    },
    required: ["animalSign", "element", "summary"]
};

const japaneseZodiacSchema = {
    type: Type.OBJECT,
    description: "An analysis based on the Japanese Zodiac (Jūnishi). Requires the person's birth year for accuracy. Note that the Pig is often referred to as the Boar in Japan.",
    properties: {
        animalSign: { type: Type.STRING, description: "The person's Japanese Zodiac animal sign (e.g., 'Dragon', 'Boar')." },
        element: { type: Type.STRING, description: "The element associated with their birth year (e.g., 'Wood', 'Fire', 'Earth', 'Metal', 'Water')." },
        summary: { type: Type.STRING, description: "A 1-2 sentence summary of the key traits and strategic implications of their Japanese Zodiac sign and element combination." },
    },
    required: ["animalSign", "element", "summary"]
};

const financialMatrixSchema = {
    type: Type.OBJECT,
    description: "An analysis of the person's financial archetype and strategy based on their core numerology.",
    properties: {
        wealthCodeNumber: { type: Type.STRING, description: "The primary 'Wealth Code' number derived from their numerology (e.g., a prominent 8, a balanced 6). Provide the number and a 1-sentence explanation of its financial meaning." },
        wealthCodeSummary: { type: Type.STRING, description: "A 2-3 sentence summary of their innate financial strengths and weaknesses based on their overall numerology chart." },
        investmentArchetype: { type: Type.STRING, description: "A descriptive archetype for their investment style (e.g., 'The Visionary Speculator', 'The Stable Empire Builder', 'The Community Investor')." },
        financialCycleTheme: { type: Type.STRING, description: "The primary financial theme of their current Personal Year. e.g., 'A 5 Personal Year suggests diversification and embracing calculated risks.'" },
        strategicAdvice: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 3-4 short, actionable pieces of financial advice tailored to their numerological profile and current cycle."
        },
    },
    required: ["wealthCodeNumber", "wealthCodeSummary", "investmentArchetype", "financialCycleTheme", "strategicAdvice"]
};


const crmReportSchema = {
  type: Type.OBJECT,
  properties: {
    coreNumbers: coreNumbersSchema,
    identityLayer: {
      type: Type.OBJECT,
      properties: {
        archetypeTitle: { type: Type.STRING, description: "An insightful, mythological, or modern archetype title for the person, like 'The Sovereign Architect'." },
        coreFrequencyColor: { type: Type.STRING, description: "A color that represents their core energetic frequency, with a brief explanation." },
      },
      required: ["archetypeTitle", "coreFrequencyColor"],
    },
    whyTheyAreLikeThis: {
      type: Type.OBJECT,
      properties: {
        lifePathStorySummary: { type: Type.STRING, description: "A 2-sentence summary of their life's narrative arc based on numerology. Frame it as a strategic journey, highlighting their core purpose and the primary challenges they are here to master." },
        moonStory: { type: Type.STRING, description: "Their emotional processing strategy based on their astrological moon sign. Describe it in an empowering way, focusing on how they can best leverage their emotional nature." },
        expressionNumberBehaviorType: { type: Type.STRING, description: "Their primary mode of operation and behavior based on their expression number. Describe their innate style and how it manifests." },
        attachmentPattern: { type: Type.STRING, description: "Their likely attachment and trust style in relationships, framed constructively with insights on how to build trust with them." },
        personalityArchetype: {
            type: Type.OBJECT,
            description: "Scores from 1-10 for key personality traits based on a synthesis of their numerology and astrology.",
            properties: {
                logic: { type: Type.NUMBER, description: "Score for analytical and logical thinking." },
                creativity: { type: Type.NUMBER, description: "Score for artistic and innovative expression." },
                intuition: { type: Type.NUMBER, description: "Score for intuitive and empathetic abilities." },
                structure: { type: Type.NUMBER, description: "Score for discipline, planning, and organizational skills." },
                social: { type: Type.NUMBER, description: "Score for social skills, communication, and desire for connection." },
            },
            required: ["logic", "creativity", "intuition", "structure", "social"]
        },
        astrologicalBalance: {
            type: Type.OBJECT,
            description: "Scores from 1-10 for the balance of the four astrological elements in their personality.",
            properties: {
                fire: { type: Type.NUMBER, description: "Score for Fire element (passion, energy, action)." },
                earth: { type: Type.NUMBER, description: "Score for Earth element (practicality, stability, grounding)." },
                air: { type: Type.NUMBER, description: "Score for Air element (intellect, communication, social)." },
                water: { type: Type.NUMBER, description: "Score for Water element (emotion, intuition, empathy)." },
            },
            required: ["fire", "earth", "air", "water"]
        },
        astrologicalBalanceSummary: { type: Type.STRING, description: "A 1-2 sentence summary interpreting the elemental balance, highlighting the dominant and weakest elements and what that means for their personality." },
        humanDesign: humanDesignSchema,
        arabicEsoterics: arabicEsotericsSchema,
        mayanAstrology: mayanAstrologySchema,
        aztecAstrology: aztecAstrologySchema,
        egyptianAstrology: egyptianAstrologySchema,
        vedicAstrology: vedicAstrologySchema,
        chineseZodiac: chineseZodiacSchema,
        japaneseZodiac: japaneseZodiacSchema,
      },
      required: ["lifePathStorySummary", "moonStory", "expressionNumberBehaviorType", "attachmentPattern", "personalityArchetype", "astrologicalBalance", "astrologicalBalanceSummary", "humanDesign", "arabicEsoterics", "mayanAstrology", "aztecAstrology", "egyptianAstrology", "vedicAstrology", "chineseZodiac", "japaneseZodiac"],
    },
    energeticWeather: {
      type: Type.OBJECT,
      properties: {
        personalYearAndMonthCycle: { type: Type.STRING, description: "Their current personal year and month cycle in numerology and what it means." },
        majorTransits: { type: Type.STRING, description: "Current major astrological transits affecting them, highlighting pressure and opportunity zones." },
        suggestedMessagingTone: { type: Type.STRING, description: "The most effective tone to use when communicating with them today." },
        shadowToActivatedState: { type: Type.STRING, description: "A mapping of their primary shadow tendency to its activated, positive expression." },
      },
      required: ["personalYearAndMonthCycle", "majorTransits", "suggestedMessagingTone", "shadowToActivatedState"],
    },
    whatToDoWithThem: {
      type: Type.OBJECT,
      properties: {
        opportunityLevel: { type: Type.STRING, enum: ["High", "Neutral", "Low"], description: "The current opportunity level for interaction or proposals." },
        bestWayToInfluence: { type: Type.STRING, description: "The most effective way to influence or motivate them." },
        relationshipGrowthPath: { type: Type.STRING, description: "Key steps or focus areas for growing the relationship." },
        doAndDonotApproaches: { type: Type.STRING, description: "A simple list of 'Do' and 'Do Not' approaches for effective interaction." },
        timingRecommendations: { type: Type.STRING, description: "Specific timing recommendations, e.g., 'talk this week', 'wait 3 days'." },
      },
       required: ["opportunityLevel", "bestWayToInfluence", "relationshipGrowthPath", "doAndDonotApproaches", "timingRecommendations"],
    },
    financialMatrix: financialMatrixSchema,
  },
  required: ["coreNumbers", "identityLayer", "whyTheyAreLikeThis", "energeticWeather", "whatToDoWithThem", "financialMatrix"],
};

const synergyBreakdownSchema = {
    type: Type.OBJECT,
    properties: {
        compatibility: {
            type: Type.STRING,
            enum: ['High', 'Medium', 'Low', 'Neutral'],
            description: "The compatibility level for this specific aspect."
        },
        analysis: {
            type: Type.STRING,
            description: "A 1-2 sentence analysis of this specific synergy point."
        }
    },
    required: ["compatibility", "analysis"]
};

const pairwiseAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        contact1Name: { type: Type.STRING },
        contact2Name: { type: Type.STRING },
        synergyType: { type: Type.STRING, description: "A descriptive title for this specific relationship (e.g., 'Creative Powerhouse', 'Supportive Foundation')." },
        analysis: { type: Type.STRING, description: "A detailed 2-3 sentence summary of the overall compatibility and dynamic between these two individuals." },
        sunSignSynergy: { ...synergyBreakdownSchema, description: "Analysis of their Sun sign compatibility (core identity)." },
        moonSignSynergy: { ...synergyBreakdownSchema, description: "Analysis of their Moon sign compatibility (emotional nature)." },
        ascendantSignSynergy: { ...synergyBreakdownSchema, description: "Analysis of their Ascendant/Rising sign compatibility (outward persona)." },
        lifePathSynergy: { ...synergyBreakdownSchema, description: "Analysis of their Life Path Number compatibility (life's journey)." },
        expressionNumberSynergy: { ...synergyBreakdownSchema, description: "Analysis of their Expression Number compatibility (talents and communication)." },
    },
    required: ["contact1Name", "contact2Name", "synergyType", "analysis", "sunSignSynergy", "moonSignSynergy", "ascendantSignSynergy", "lifePathSynergy", "expressionNumberSynergy"]
};

const synergyReportSchema = {
    type: Type.OBJECT,
    properties: {
        overallSummary: { type: Type.STRING, description: "A high-level summary of the entire group's energetic dynamic." },
        strengths: { type: Type.STRING, description: "The primary strengths and positive synergies of the group." },
        challenges: { type: Type.STRING, description: "Potential challenges, friction points, or blind spots for the group." },
        strategicAdvice: { type: Type.STRING, description: "Actionable strategic advice for maximizing the group's potential and harmony." },
        pairwiseAnalyses: {
            type: Type.ARRAY,
            items: pairwiseAnalysisSchema
        }
    },
    required: ["overallSummary", "strengths", "challenges", "strategicAdvice", "pairwiseAnalyses"]
};

const dailyBriefingSchema = {
    type: Type.OBJECT,
    properties: {
        headline: { type: Type.STRING, description: "A dynamic, catchy headline for the day's energy. e.g., 'A Day for Bold Action & Strategic Alliances'." },
        keyPriorities: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "An array of 3 short, actionable strategic priorities for the day."
        },
        potentialChallenge: { type: Type.STRING, description: "A key potential challenge or shadow aspect to be aware of today." },
        keySuperpower: { type: Type.STRING, description: "The primary superpower from their core numbers to leverage today." },
        mantra: { type: Type.STRING, description: "A concise, empowering mantra for the day." },
    },
    required: ["headline", "keyPriorities", "potentialChallenge", "keySuperpower", "mantra"]
};

const journalAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        keyThemes: { type: Type.STRING, description: "Identify and summarize the 2-3 core emotional or strategic themes present in the journal entry." },
        growthOpportunity: { type: Type.STRING, description: "Based on the themes, identify the single most significant growth opportunity for the user right now." },
        reflectionQuestion: { type: Type.STRING, description: "Formulate one powerful, open-ended question that will help the user reflect deeper on the identified growth opportunity." },
    },
    required: ["keyThemes", "growthOpportunity", "reflectionQuestion"]
};

const devotionalSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "An appropriate, reverent title for the devotional." },
        scriptureReference: { type: Type.STRING, description: "The full scripture reference (e.g., 'John 3:16-17')." },
        scriptureText: { type: Type.STRING, description: "The full text of the selected scripture passage." },
        reflection: { type: Type.STRING, description: "A thoughtful reflection on the scripture, written in the style of C.H. Mackintosh. It must be Christ-centered, focusing on grace, the finished work of the cross, and the believer's position in Christ. Use simple yet profound language. Often employs typology (e.g., seeing Christ in Old Testament figures/events)." },
        prayer: { type: Type.STRING, description: "A short, concluding prayer that reflects the themes of the scripture and reflection." }
    },
    required: ["title", "scriptureReference", "scriptureText", "reflection", "prayer"]
};

export const generateCrmReport = async (contact: Contact): Promise<CrmReport> => {
  const personalYear = calculatePersonalYear(contact.birthDate);

  const prompt = `
    You are a "Cosmic Relationship Manager" AI. You synthesize insights from numerology (GG33), astrology, and other esoteric systems to create a comprehensive, actionable profile.
    Your tone is insightful, empowering, and clear. Generate a JSON response based on the provided schema for the following person.

    First, calculate and provide the 'Core Numbers' based on their full birth name and birth date. This section is crucial and must include all specified fields.

    After providing the Core Numbers, generate the rest of the JSON response. This includes these key sections that require deep synthesis and calculation:
    1. 'personalityArchetype': Synthesize their numerological and astrological data to provide a score from 1 to 10 for each of the five traits: Logic, Creativity, Intuition, Structure, and Social.
    2. 'astrologicalBalance': Based on their astrological data, provide scores from 1-10 for their Astrological Element Balance (fire, earth, air, water). Also generate a concise 'astrologicalBalanceSummary'.
    3. 'humanDesign': Using the provided birth date, time, and location, you MUST calculate and provide their Human Design information. If birth time is not provided, note that the calculation is less precise but still provide the most likely configuration.
    4. 'arabicEsoterics': You MUST calculate and provide an analysis based on Arabic esoteric sciences (Ilm al-Huruf, Abjad numerology).
    5. 'mayanAstrology': A new, critical section. Based on the birth date, calculate their Mayan Tzolkin profile. Provide a refined, detailed interpretation of their Day Sign (Nahual) and Galactic Tone (Number), and a more thorough strategic summary.
    6. 'aztecAstrology': A new, critical section. Based on the birth date, calculate their Aztec Tonalamatl profile. Provide a refined, detailed interpretation of their ruling Trecena, Day Sign (including keyword qualities), and Lord of the Night (including its specific influence), and a more thorough final strategic summary.
    7. 'egyptianAstrology': A new, critical section. Based on the birth date, calculate their Egyptian Astrology profile, including their sign, ruling deity, key characteristics, and more thorough strategic guidance.
    8. 'vedicAstrology': A new, critical section. Based on the birth date, time, and location, calculate their Vedic Astrology (Jyotish) sidereal chart. Provide their Rashi (Moon Sign), Nakshatra (Lunar Mansion), Lagna (Ascendant), current major Dasha period, and a summary of key planetary influences. Conclude with strategic guidance. This is highly important and requires precision.
    9. 'chineseZodiac': A new, critical section. Based on the birth date, calculate their Chinese Zodiac animal sign and element. Provide a concise summary of their associated traits and strategic implications.
    10. 'japaneseZodiac': A new, critical section. Based on the birth date, calculate their Japanese Zodiac (Jūnishi) animal sign and element. Note the cultural nuance where the Pig is often called the Boar. Provide a concise summary of their associated traits and strategic implications.
    11. 'financialMatrix': A new, critical section. Based on their core numbers (especially Life Path, Expression, and any 8s) and their current Personal Year, generate a financial analysis. Determine their 'Wealth Code Number', their 'Investment Archetype', the theme of their current financial cycle, and provide actionable strategic advice.

    Here is the data for the person:
    - Name: ${contact.name}
    - Birth Date: ${contact.birthDate}
    - Birth Time: ${contact.birthTime || 'Not provided'}
    - Birth Location: ${contact.birthLocation || 'Not provided'}
    - Calculated Current Personal Year: ${personalYear}

    Crucially, for the 'energeticWeather.personalYearAndMonthCycle' field, you MUST base your interpretation on the provided Personal Year of ${personalYear}. Do not calculate it yourself.
    Connect this with other systems like astrology. For example, how does a ${personalYear} personal year interact with their astrological sun sign?
    The "What To Do With Them" section must contain concrete, actionable advice.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: crmReportSchema,
    },
  });

  const jsonResponse = JSON.parse(response.text);
  return jsonResponse as CrmReport;
};

export const generateSynergyReport = async (contacts: Contact[]): Promise<SynergyReport> => {
    const contactData = contacts.map(c => `- ${c.name}: Birth Date ${c.birthDate}, Birth Time ${c.birthTime || 'Not provided'}, Location ${c.birthLocation || 'Not provided'}. Report Data: ${JSON.stringify(c.report, null, 2)}`).join('\n');

    const prompt = `
        You are a "Network Synergy Analyst" AI, an expert in interpersonal dynamics using numerology (GG33) and astrology.
        Analyze the following group of people to understand their collective and individual relationship dynamics. For each person, I am providing their full Executive Blueprint (CRM Report) for deep analysis.

        Group Members:
        ${contactData}

        Your task is to generate a JSON response based on the provided schema.
        1.  **Overall Analysis**: Provide a holistic view of the group's energy. What is the main theme?
        2.  **Strengths**: What makes this group powerful together?
        3.  **Challenges**: Where might friction or misunderstanding arise?
        4.  **Strategic Advice**: Give actionable advice for the group to thrive.
        5.  **Pairwise Analyses**: For EVERY unique pair in the group, provide a deep, specific breakdown of their dynamic.
            - First, provide a 2-3 sentence 'analysis' summarizing their overall connection.
            - Then, you MUST provide a detailed breakdown for EACH of the following five synergy points:
              a. 'sunSignSynergy': Analyze their Sun sign compatibility (core identity).
              b. 'moonSignSynergy': Analyze their Moon sign compatibility (emotional nature). Use their 'moonStory' from the report.
              c. 'ascendantSignSynergy': Analyze their Ascendant/Rising sign compatibility (outward persona and initial impression).
              d. 'lifePathSynergy': Analyze their Life Path Number compatibility (life's journey and purpose). Use 'lifePathNumber' from the report.
              e. 'expressionNumberSynergy': Analyze their Expression Number compatibility (talents, communication style, and destiny). Use 'expressionNumber' from the report.
            - For each of these five points, provide a 'compatibility' rating ('High', 'Medium', 'Low', 'Neutral') and a 1-2 sentence 'analysis'.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: synergyReportSchema,
        },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse as SynergyReport;
}

export const generateDailyBriefing = async (report: CrmReport): Promise<DailyBriefing> => {
    const prompt = `
        You are a "Cosmic Strategist" AI. Your task is to synthesize a detailed Executive Blueprint (CRM Report) into a highly concise, actionable "Daily Matrix Briefing".
        Focus on what is most important for this person *today*.
        Use the 'energeticWeather' section as the primary lens for today's context, and synthesize it with their 'coreNumbers' and 'identityLayer'.
        Your tone must be sharp, insightful, and empowering. Generate a JSON response based on the provided schema.

        Here is the full CRM Report to analyze:
        ${JSON.stringify(report, null, 2)}

        Synthesize this data to produce today's briefing. For example, if it's a 5 Personal Year (change, freedom) and a major transit suggests communication challenges, a priority might be "Navigate conversations with care, embracing flexibility over rigidity."
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: dailyBriefingSchema,
        },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse as DailyBriefing;
};

export const analyzeJournalEntry = async (entry: string): Promise<JournalAnalysis> => {
    const prompt = `
        You are a "Cosmic Strategist" AI with deep wisdom in psychology, spirituality, and high-performance coaching.
        Analyze the following journal entry from a user. Your task is to distill its essence into high-level strategic insights.
        Do not give generic advice. Be insightful, profound, and empowering.
        Generate a JSON response based on the provided schema.

        Journal Entry:
        "${entry}"
    `;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: journalAnalysisSchema,
        },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse as JournalAnalysis;
};

export const generateDevotional = async (): Promise<Devotional> => {
    const prompt = `
        You are an AI theologian specializing in the style of 19th-century evangelist C.H. Mackintosh (C.H.M.).
        Your task is to generate a daily devotional for today. Generate a JSON response based on the provided schema.

        The devotional must adhere strictly to the following principles of C.H.M.'s style:
        1.  **Christ-Centered Supremacy**: Every passage, whether Old or New Testament, must ultimately point to the person and work of Jesus Christ. Find the typological or direct connection to Him.
        2.  **Emphasis on Grace**: The tone must be one of overwhelming grace, not legalism or performance-based religion. Focus on the believer's perfect standing in Christ because of the finished work of the cross.
        3.  **Simple, Devotional Language**: Use clear, simple, and heartfelt language. Avoid complex theological jargon. The goal is to warm the heart and encourage faith, not to win an academic argument.
        4.  **Positional Truth**: Frequently emphasize the believer's secure and eternal position "in Christ."
        5.  **Reverence for Scripture**: Treat the Bible as the divinely inspired and inerrant Word of God.

        Select a suitable scripture passage for today, and then generate the title, full scripture text, reflection, and prayer according to the schema.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: devotionalSchema,
        },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse as Devotional;
};


// FIX: Add editImage and analyzeImage functions to be used in ImageAlchemist component.
export const editImage = async (base64Data: string, mimeType: string, prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: mimeType,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error("Could not edit image or no image was returned.");
};

export const analyzeImage = async (base64Data: string, mimeType: string): Promise<string> => {
    const textPart = {
        text: "Analyze this image in detail. Describe what you see, including objects, colors, and potential context or meaning."
    };
    const imagePart = {
        inlineData: {
            mimeType: mimeType,
            data: base64Data,
        },
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });

    return response.text;
};

export const getLunarInsight = async (phaseName: string): Promise<string> => {
    const prompt = `
        You are a "Cosmic Strategist" AI. Provide a brief, actionable, and high-level strategic insight for the current lunar phase: ${phaseName}.
        Focus on its influence on emotions, energy, and key decision-making for a high-achieving executive.
        The tone should be insightful and empowering. Output a single paragraph of 2-3 sentences.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
};

const tideEventSchema = {
    type: Type.OBJECT,
    properties: {
        type: { type: Type.STRING, enum: ['High Tide', 'Low Tide'] },
        time: { type: Type.STRING, description: "The time of the tide event in local HH:MM AM/PM format." },
        height: { type: Type.STRING, description: "The height of the tide, including units (e.g., '5.2 ft', '1.6 m')." },
    },
    required: ["type", "time", "height"]
};

const tideChartSchema = {
    type: Type.ARRAY,
    items: tideEventSchema
};

export const getTideChart = async (latitude: number, longitude: number): Promise<TideEvent[]> => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const prompt = `
        You are a marine data analyst. Based on the current date, which is ${today}, and the user's geographical coordinates (Latitude: ${latitude}, Longitude: ${longitude}), provide a simplified local tide chart.

        Your task is to generate a JSON response that is an array of tide events for today. The array should typically contain 4 events: two high tides and two low tides, in chronological order.

        For each event, provide:
        1. "type": Either "High Tide" or "Low Tide".
        2. "time": The local time of the event in a user-friendly format (e.g., "3:45 AM").
        3. "height": The predicted tide height, including units (e.g., "5.2 ft" or "1.6 m"). Use feet for US locations and meters for most others.

        Generate the JSON array directly based on the provided schema.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: tideChartSchema,
        },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse as TideEvent[];
};