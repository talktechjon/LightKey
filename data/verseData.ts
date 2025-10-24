import { SurahData, SurahVerse, VerseResult } from '../types.ts';

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

/**
 * A wrapper around fetch that retries the request with exponential backoff.
 * @param url The URL to fetch.
 * @param retries The maximum number of retries.
 * @param delay The initial delay in milliseconds.
 * @returns A Promise that resolves to the Response object.
 */
async function fetchWithRetry(url: string, retries = 3, delay = 200): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;

      // Only retry on server errors (5xx) or network errors that throw.
      // Client errors (4xx) are not retried.
      if (response.status >= 500 && response.status < 600) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      return response; // Return the response for 4xx errors without retrying.
    } catch (error) {
      if (i === retries - 1) throw error; // Rethrow the error on the last attempt.
      // Wait with exponential backoff before the next retry.
      await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
    }
  }
  // This should be unreachable if retries > 0, but is a fallback.
  throw new Error("Fetch failed after multiple retries");
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
    const response = await fetchWithRetry(url);
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
    const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,bn.bengali,en.transliteration`;
    const response = await fetchWithRetry(url);
    if (!response.ok) throw new Error(`API error! status: ${response.status}`);
    
    const json = await response.json();
    if (json.code !== 200 || !json.data || json.data.length < 4) {
      throw new Error(`Invalid data received for surah ${surahNumber}`);
    }

    const editions = json.data;
    const arabicEdition = editions.find(e => e.edition.identifier === 'quran-uthmani');
    const englishEdition = editions.find(e => e.edition.identifier === 'en.sahih');
    const banglaEdition = editions.find(e => e.edition.identifier === 'bn.bengali');
    const transliterationEdition = editions.find(e => e.edition.identifier === 'en.transliteration');

    if (!arabicEdition || !englishEdition || !banglaEdition || !transliterationEdition) {
        throw new Error('One or more required editions are missing.');
    }

    const verses: SurahVerse[] = arabicEdition.ayahs.map((ayah, index) => {
        const absoluteAyahNumber = ayah.number;
        return {
            numberInSurah: ayah.numberInSurah,
            arabicText: ayah.text,
            englishText: englishEdition.ayahs[index]?.text || 'N/A',
            banglaText: banglaEdition.ayahs[index]?.text || 'N/A',
            transliteration: transliterationEdition.ayahs[index]?.text || 'N/A',
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

export const getVerseDetails = async (surah: number, ayah: number): Promise<VerseResult | null> => {
    try {
        const url = `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.transliteration,en.sahih,bn.bengali`;
        const response = await fetchWithRetry(url);
        if (!response.ok) throw new Error(`HTTP error for ${surah}:${ayah}!`);
        const json = await response.json();
        if (json.code !== 200) throw new Error(`Invalid data for ${surah}:${ayah}`);
        const verseData = json.data;
        const absoluteAyahNumber = verseData[0].number;
        return {
          numberInSurah: verseData[0].numberInSurah, surah: { number: verseData[0].surah.number, englishName: verseData[0].surah.englishName },
          arabicText: verseData.find(v => v.edition.identifier === 'quran-uthmani')?.text || 'N/A',
          transliteration: verseData.find(v => v.edition.identifier === 'en.transliteration')?.text || 'N/A',
          englishText: verseData.find(v => v.edition.identifier === 'en.sahih')?.text || 'N/A',
          banglaText: verseData.find(v => v.edition.identifier === 'bn.bengali')?.text || 'N/A',
          fullVerseAudioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${absoluteAyahNumber}.mp3`
        };
    } catch (e) {
        console.error(`Failed to fetch verse details for ${surah}:${ayah}:`, e);
        return null;
    }
};
