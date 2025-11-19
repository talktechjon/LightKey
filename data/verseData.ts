
import { SurahData, SurahVerse, VerseResult, LocalTranslationData } from '../types.ts';

// In-memory cache for fetched surahs
const surahCache = new Map<number, SurahData>();
// In-memory cache for in-flight requests to prevent duplicates
const surahPromises = new Map<number, Promise<SurahData | null>>();

interface FullVerseData {
  englishText: string;
  banglaText: string;
}

class RequestLimiter {
    private queue: (() => void)[] = [];
    private activeCount = 0;
    private maxConcurrent: number;

    constructor(maxConcurrent: number = 3) {
        this.maxConcurrent = maxConcurrent;
    }

    async schedule<T>(task: () => Promise<T>): Promise<T> {
        if (this.activeCount >= this.maxConcurrent) {
            await new Promise<void>(resolve => this.queue.push(resolve));
        }
        this.activeCount++;
        try {
            return await task();
        } finally {
            this.activeCount--;
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                if (next) next();
            }
        }
    }
}

const limiter = new RequestLimiter(3);

/**
 * A wrapper around fetch that retries the request with exponential backoff.
 * @param url The URL to fetch.
 * @param retries The maximum number of retries.
 * @param delay The initial delay in milliseconds.
 * @returns A Promise that resolves to the Response object.
 */
async function fetchWithRetry(url: string, retries = 3, delay = 500): Promise<Response> {
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


export const getFullSurah = async (surahNumber: number, mode: 'online' | 'local', localData: LocalTranslationData): Promise<SurahData | null> => {
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  if (surahPromises.has(surahNumber)) {
      return surahPromises.get(surahNumber)!;
  }

  const fetchLogic = async (): Promise<SurahData | null> => {
      try {
        const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,bn.bengali,en.transliteration`;
        const response = await limiter.schedule(() => fetchWithRetry(url));
        
        if (!response.ok) throw new Error(`API error! status: ${response.status}`);
        
        const json = await response.json();
        if (json.code !== 200 || !json.data || json.data.length < 4) {
          throw new Error(`Invalid data received for surah ${surahNumber}`);
        }
    
        const editions = json.data;
        const arabicEdition = editions.find((e: any) => e.edition.identifier === 'quran-uthmani');
        const englishEdition = editions.find((e: any) => e.edition.identifier === 'en.sahih');
        const banglaEdition = editions.find((e: any) => e.edition.identifier === 'bn.bengali');
        const transliterationEdition = editions.find((e: any) => e.edition.identifier === 'en.transliteration');
    
        if (!arabicEdition || !englishEdition || !banglaEdition || !transliterationEdition) {
            throw new Error('One or more required editions are missing.');
        }
    
        const verses: SurahVerse[] = arabicEdition.ayahs.map((ayah: any, index: number) => {
            const absoluteAyahNumber = ayah.number;
            const key = `${surahNumber}:${ayah.numberInSurah}`;
            
            let englishText = englishEdition.ayahs[index]?.text || 'N/A';
            let banglaText = banglaEdition.ayahs[index]?.text || 'N/A';
            
            if (mode === 'local' && localData?.[key]) {
                const localTranslations = localData[key];
                englishText = localTranslations[0] || 'N/A';
                banglaText = localTranslations[1] || '';
            }
    
            return {
                numberInSurah: ayah.numberInSurah,
                arabicText: ayah.text,
                englishText: englishText,
                banglaText: banglaText,
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
      } finally {
        surahPromises.delete(surahNumber);
      }
  };

  const promise = fetchLogic();
  surahPromises.set(surahNumber, promise);
  return promise;
};

export const getVerse = async (surah: number, verse: number, mode: 'online' | 'local', localData: LocalTranslationData): Promise<FullVerseData> => {
  // Use local data first if available, as it's fastest and doesn't require a network call
  // IF we assume getFullSurah has run. But here we are fetching on demand.
  // If we have localData, we might still need the structure if getFullSurah wasn't called?
  // Actually, for marquee we just need text.
  if (mode === 'local' && localData?.[`${surah}:${verse}`]) {
    const localTranslations = localData[`${surah}:${verse}`];
    return {
      englishText: localTranslations[0] || 'N/A',
      banglaText: localTranslations[1] || '',
    };
  }

  try {
    const surahData = await getFullSurah(surah, mode, localData);
    if (!surahData) {
      throw new Error(`Surah ${surah} data could not be loaded.`);
    }

    const verseData = surahData.verses.find(v => v.numberInSurah === verse);
    if (!verseData) {
      throw new Error(`Verse ${surah}:${verse} not found in surah data. The surah has ${surahData.numberOfAyahs} verses.`);
    }

    return {
      englishText: verseData.englishText,
      banglaText: verseData.banglaText,
    };
  } catch (error) {
    console.error(`Failed to get verse ${surah}:${verse}:`, error);
    return {
      englishText: `Could not load verse ${surah}:${verse}.`,
      banglaText: `আয়াত ${surah}:${verse} লোড করা যায়নি।`,
    };
  }
};

export const getVerseDetails = async (surah: number, ayah: number, mode: 'online' | 'local', localData: LocalTranslationData): Promise<VerseResult | null> => {
    try {
        const surahData = await getFullSurah(surah, mode, localData);
        if (!surahData) {
            throw new Error(`Could not load data for Surah ${surah}.`);
        }

        const verseData = surahData.verses.find(v => v.numberInSurah === ayah);
        if (!verseData) {
            throw new Error(`Could not find verse ${ayah} in Surah ${surah}.`);
        }

        return {
            numberInSurah: verseData.numberInSurah,
            surah: {
                number: surahData.number,
                englishName: surahData.englishName,
            },
            arabicText: verseData.arabicText,
            transliteration: verseData.transliteration,
            englishText: verseData.englishText,
            banglaText: verseData.banglaText,
            fullVerseAudioUrl: verseData.fullVerseAudioUrl,
        };
    } catch (e) {
        console.error(`Failed to fetch verse details for ${surah}:${ayah}:`, e);
        return null;
    }
};
