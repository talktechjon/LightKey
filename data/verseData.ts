import { SurahData, SurahVerse } from '../types.ts';

// In-memory cache for fetched verses
interface VerseContent {
  english: string;
  bangla: string;
}
const verseCache = new Map<string, VerseContent>();

interface FullVerseData {
  englishText: string;
  banglaText: string;
}

export const getVerse = async (surah: number, verse: number): Promise<FullVerseData> => {
  const cacheKey = `${surah}:${verse}`;
  const cachedContent = verseCache.get(cacheKey);

  if (cachedContent) {
    return {
      englishText: cachedContent.english,
      banglaText: cachedContent.bangla,
    };
  }

  try {
    const url = `https://api.alquran.cloud/v1/ayah/${surah}:${verse}/editions/en.sahih,bn.bengali`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API error! status: ${response.status}`);
    }
    
    const json = await response.json();
    if (json.code !== 200 || !json.data || json.data.length < 2) {
      throw new Error(`Invalid data received for ${surah}:${verse}`);
    }

    const verseData = json.data;
    const englishText = verseData.find(v => v.edition.identifier === 'en.sahih')?.text || 'N/A';
    const banglaText = verseData.find(v => v.edition.identifier === 'bn.bengali')?.text || 'N/A';

    const content = { english: englishText, bangla: banglaText };
    verseCache.set(cacheKey, content); // Cache the result

    return { englishText, banglaText };

  } catch (error) {
    console.error(`Failed to fetch verse ${surah}:${verse}:`, error);
    // Return a default/error state if fetch fails
    return {
      englishText: `Could not load verse ${surah}:${verse}.`,
      banglaText: `আয়াত ${surah}:${verse} লোড করা যায়নি।`,
    };
  }
};

const surahCache = new Map<number, SurahData>();

export const getFullSurah = async (surahNumber: number): Promise<SurahData | null> => {
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  try {
    const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,bn.bengali`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error! status: ${response.status}`);
    
    const json = await response.json();
    if (json.code !== 200 || !json.data || json.data.length < 3) {
      throw new Error(`Invalid data received for surah ${surahNumber}`);
    }

    const editions = json.data;
    const arabicEdition = editions.find(e => e.edition.identifier === 'quran-uthmani');
    const englishEdition = editions.find(e => e.edition.identifier === 'en.sahih');
    const banglaEdition = editions.find(e => e.edition.identifier === 'bn.bengali');

    if (!arabicEdition || !englishEdition || !banglaEdition) {
        throw new Error('One or more required editions are missing.');
    }

    const verses: SurahVerse[] = arabicEdition.ayahs.map((ayah, index) => {
        const absoluteAyahNumber = ayah.number;
        return {
            numberInSurah: ayah.numberInSurah,
            arabicText: ayah.text,
            englishText: englishEdition.ayahs[index]?.text || 'N/A',
            banglaText: banglaEdition.ayahs[index]?.text || 'N/A',
            fullVerseAudioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${absoluteAyahNumber}.mp3`,
        };
    });
    
    const surahData: SurahData = {
        number: arabicEdition.number,
        englishName: arabicEdition.englishName,
        arabicName: arabicEdition.name,
        revelationType: arabicEdition.revelationType,
        numberOfAyahs: arabicEdition.numberOfAyahs,
        verses: verses
    };
    
    surahCache.set(surahNumber, surahData);
    return surahData;
  } catch (error) {
    console.error(`Failed to fetch surah ${surahNumber}:`, error);
    return null;
  }
};
