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

export interface VisualizationHandle {
  spin: () => void;
}

export interface ChapterDetails {
  number: number;
  englishName: string;
  transliteration: string;
  arabicName: string;
  revelationType: 'Makki' | 'Madani';
  juz: string;
}

export type TooltipContent = VerseTooltipContent | ChapterTooltipContent;

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

export interface IconData {
    id: string;
    chapter: number;
    emoji: string;
    imageUrl: string;
    description: string;
}

export interface SecretIconData {
    id: string;
    position: number; // 1-9
    chapter: number;
    emoji: string;
    imageUrl: string;
    description: string;
}

export type PlaylistType = 'tafsir' | 'recitation' | 'englishRecitation';

// Types for VerseFinder
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

export interface SurahVerse {
  numberInSurah: number;
  arabicText: string;
  englishText: string;
  banglaText: string;
  fullVerseAudioUrl: string;
}

export interface SurahData {
  number: number;
  englishName: string;
  arabicName: string;
  revelationType: 'Makki' | 'Madani';
  numberOfAyahs: number;
  verses: SurahVerse[];
}

export type VerseFinderContent =
  | { type: 'search'; verses: VerseResult[] }
  | { type: 'surah'; data: SurahData }
  | { type: 'loading_surah'; number: number }
  | { type: 'empty' };
