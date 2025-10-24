// Fix: Replaced incorrect content with actual type definitions.
export interface SliceData {
  id: number;
  blockCount: number;
}

export interface TrianglePoint {
  type: string;
  value: number;
}

export interface TriangleDefinition {
  name: string;
  color: string;
  points: TrianglePoint[];
}

export interface ChapterDetails {
  number: number;
  englishName: string;
  transliteration: string;
  arabicName: string;
  revelationType: 'Makki' | 'Madani';
  juz: string;
}

export interface IconData {
    id: string;
    chapter: number;
    emoji: string;
    imageUrl: string;
    description: string;
}

export interface SecretIconData {
    id: string;
    position: number;
    chapter: number;
    emoji: string;
    imageUrl: string;
    description: string;
}

export interface VisualizationHandle {
  spin: () => void;
}

export interface VerseTooltipContent {
  type: 'verse';
  surah: number;
  verse: number;
  color: string;
  englishText: string;
  banglaText: string;
}

export interface ChapterTooltipContent {
  type: 'chapter';
  chapterDetails: ChapterDetails;
  verseCount: number;
  muqattat: string[] | undefined;
  color: string;
}

export type TooltipContent = VerseTooltipContent | ChapterTooltipContent;

export interface SurahVerse {
  numberInSurah: number;
  arabicText: string;
  englishText: string;
  banglaText: string;
  transliteration: string;
  fullVerseAudioUrl: string;
}

export interface SurahData {
  number: number;
  englishName: string;
  arabicName: string;
  revelationType: string;
  numberOfAyahs: number;
  verses: SurahVerse[];
}

export interface VerseResult {
    numberInSurah: number;
    surah: {
        number: number;
        englishName: string;
    };
    arabicText: string;
    transliteration: string;
    englishText: string;
    banglaText: string;
    fullVerseAudioUrl: string;
}

export type VerseFinderContent = 
  | { type: 'empty' }
  | { type: 'loading_surah'; number: number }
  | { type: 'surah'; data: SurahData }
  | { type: 'search'; verses: VerseResult[] };
  
export type PlaylistType = 'recitation' | 'tafsir' | 'englishRecitation';
