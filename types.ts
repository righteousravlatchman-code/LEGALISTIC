

export interface Devotional {
    title: string;
    scriptureReference: string;
    scriptureText: string;
    reflection: string;
    prayer: string;
}

export interface JournalAnalysis {
    keyThemes: string;
    growthOpportunity: string;
    reflectionQuestion: string;
}

export interface JournalEntry {
    id: string;
    date: string;
    content: string;
    analysis?: JournalAnalysis;
}

export interface CoreNumberValue {
  number: string;
  summary: string;
}

export interface CoreNumbers {
  lifePathNumber: CoreNumberValue;
  expressionNumber: CoreNumberValue;
  soulUrgeNumber: CoreNumberValue;
  personalityNumber: string;
  birthdayNumber: string;
  maturityNumber: string;
  hiddenPassionNumber: string;
  challengeNumbers: string;
  karmicDebtNumbers: string;
  personalCycle: string;
}

export interface AstrologicalBalance {
    fire: number;
    earth: number;
    air: number;
    water: number;
}

export interface HumanDesign {
  type: string;
  strategy: string;
  innerAuthority: string;
  profile: string;
  definition: string;
  centers: string;
  summary:string;
}

export interface ArabicEsoterics {
  abjadValue: number;
  abjadNameMeaning: string;
  rulingPlanet: string;
  dominantElement: string;
  esotericQuality: string;
  strategicGuidance: string;
}

export interface MayanAstrology {
    daySignName: string;
    daySignQualities: string;
    daySignMeaning: string;
    galacticToneNumber: number;
    galacticToneMeaning: string;
    summary: string;
}

export interface AztecAstrology {
    trecenaName: string;
    trecenaMeaning: string;
    daySignName: string;
    daySignQualities: string;
    daySignMeaning: string;
    lordOfTheNight: string;
    lordOfTheNightInfluence: string;
    summary: string;
}

export interface EgyptianAstrology {
    signName: string;
    rulingDeity: string;
    keyCharacteristics: string;
    strategicGuidance: string;
}

export interface VedicAstrology {
    rashiMoonSign: string;
    nakshatraLunarMansion: string;
    lagnaAscendant: string;
    currentDashaPeriod: string;
    keyPlanetaryInfluences: string;
    strategicGuidance: string;
}

export interface ChineseZodiac {
  animalSign: string;
  element: string;
  summary: string;
}

export interface JapaneseZodiac {
  animalSign: string;
  element: string;
  summary: string;
}

export interface FinancialMatrixReport {
    wealthCodeNumber: string;
    wealthCodeSummary: string;
    investmentArchetype: string;
    financialCycleTheme: string;
    strategicAdvice: string[];
}


export interface Contact {
  id: string;
  name: string;
  birthDate: string;
  birthTime?: string;
  birthLocation?: string;
  notes?: string;
  report?: CrmReport;
  financialCycleTheme?: string;
}

export interface CrmReport {
  coreNumbers?: CoreNumbers;
  identityLayer: {
    archetypeTitle: string;
    coreFrequencyColor: string;
  };
  whyTheyAreLikeThis: {
    lifePathStorySummary: string;
    moonStory: string;
    expressionNumberBehaviorType: string;
    attachmentPattern: string;
    personalityArchetype?: {
        logic: number;
        creativity: number;
        intuition: number;
        structure: number;
        social: number;
    };
    astrologicalBalance?: AstrologicalBalance;
    astrologicalBalanceSummary?: string;
    humanDesign?: HumanDesign;
    arabicEsoterics?: ArabicEsoterics;
    mayanAstrology?: MayanAstrology;
    aztecAstrology?: AztecAstrology;
    egyptianAstrology?: EgyptianAstrology;
    vedicAstrology?: VedicAstrology;
    chineseZodiac?: ChineseZodiac;
    japaneseZodiac?: JapaneseZodiac;
  };
  energeticWeather: {
    personalYearAndMonthCycle: string;
    majorTransits: string;
    suggestedMessagingTone: string;
    shadowToActivatedState: string;
  };
  whatToDoWithThem: {
    opportunityLevel: 'High' | 'Neutral' | 'Low';
    bestWayToInfluence: string;
    relationshipGrowthPath: string;
    doAndDonotApproaches: string;
    timingRecommendations: string;
  };
  financialMatrix?: FinancialMatrixReport;
}

export interface DailyBriefing {
    headline: string;
    keyPriorities: string[];
    potentialChallenge: string;
    keySuperpower: string;
    mantra: string;
}

export interface SynergyBreakdown {
    compatibility: 'High' | 'Medium' | 'Low' | 'Neutral';
    analysis: string;
}

export interface PairwiseAnalysis {
  contact1Name: string;
  contact2Name: string;
  synergyType: string;
  analysis: string;
  sunSignSynergy: SynergyBreakdown;
  moonSignSynergy: SynergyBreakdown;
  ascendantSignSynergy: SynergyBreakdown;
  lifePathSynergy: SynergyBreakdown;
  expressionNumberSynergy: SynergyBreakdown;
}

export interface SynergyReport {
  overallSummary: string;
  strengths: string;
  challenges: string;
  strategicAdvice: string;
  pairwiseAnalyses: PairwiseAnalysis[];
}

export interface ArchetypeTemplate {
  id: string;
  name: string;
  report: CrmReport;
  originalContact: Omit<Contact, 'report'>;
}

export interface HeatmapDataPoint {
  date: string;
  level: number;
}

export interface TideEvent {
    type: 'High Tide' | 'Low Tide';
    time: string;
    height: string;
}

export type CrmView = 'profiles' | 'synergy' | 'archetypes' | 'guide' | 'egyptian' | 'aztec' | 'vedic' | 'japanese' | 'comparison' | 'arabic';
export type AppView = 'crm' | 'moonmoves' | 'profile' | 'alchemist' | 'devotional' | 'money';