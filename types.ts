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
  scienceTooltip?: string;
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

export interface FunctionalTooltipContent {
  type: 'functional';
  message: string;
  chapterName: string;
  lastVerseText: string;
  color: string;
}

export interface MoondialTooltipContent {
  type: 'moondial';
  hourStr: string;
  chapters: string;
  title: string;
  role: string;
  keyVerse: string;
  breath: string;
  breathDesc: string;
  phase: string;
  influence: string;
  color: string;
}

export type TooltipContent = VerseTooltipContent | ChapterTooltipContent | FunctionalTooltipContent | MoondialTooltipContent;

export type TranslationMode = 'online' | 'local' | 'both' | 'none';

export interface WordData {
  id: number;
  position: number;
  audio_url: string | null;
  char_type_name: string;
  text_uthmani: string;
  translation: { text: string; language_name?: string };
  transliteration: { text: string | null; language_name?: string };
}

export interface SurahVerse {
  numberInSurah: number;
  absoluteNumber: number;
  arabicText: string;
  englishText: string;
  banglaText: string;
  transliteration: string;
  fullVerseAudioUrl: string;
  localEnglishText?: string;
  localBanglaText?: string;
  words?: WordData[];
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
    absoluteNumber: number;
    surah: {
        number: number;
        englishName: string;
    };
    arabicText: string;
    transliteration: string;
    englishText: string;
    banglaText: string;
    fullVerseAudioUrl: string;
    localEnglishText?: string;
    localBanglaText?: string;
    words?: WordData[];
}

export type VerseFinderContent = 
  | { type: 'empty' }
  | { type: 'loading' }
  | { type: 'loading_surah'; number: number }
  | { type: 'surah'; data: SurahData }
  | { type: 'search'; verses: VerseResult[] };
  
export type PlaylistType = 'recitation' | 'tafsir' | 'englishRecitation';

export type LocalTranslationData = Record<string, string[]> | null;

export interface VerseAddress {
  surah: number;
  ayah: number;
}