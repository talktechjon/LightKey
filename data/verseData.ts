import { SurahData, SurahVerse, VerseResult, LocalTranslationData, TranslationMode } from '../types.ts';

// In-memory cache for fetched surahs
const surahCache = new Map<number, SurahData>();
// In-flight requests to prevent duplicate fetches for the same surah
const surahPromises = new Map<number, Promise<SurahData | null>>();

interface FullVerseData {
  englishText: string;
  banglaText: string;
}

// Simple concurrency limiter to prevent overwhelming the API
class RequestLimiter {
  private queue: (() => void)[] = [];
  private activeCount = 0;
  private maxConcurrent: number;

  constructor(maxConcurrent: number) {
    this.maxConcurrent = maxConcurrent;
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const run = async () => {
        this.activeCount++;
        try {
          const result = await fn();
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          this.activeCount--;
          this.next();
        }
      };

      if (this.activeCount < this.maxConcurrent) {
        run();
      } else {
        this.queue.push(run);
      }
    });
  }

  private next() {
    if (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const nextFn = this.queue.shift();
      if (nextFn) nextFn();
    }
  }
}

// Limit to 3 concurrent requests to respect API limits and network stability
const requestLimiter = new RequestLimiter(3);

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

      // Retry on 429 (Too Many Requests) and 5xx (Server Errors)
      if (response.status === 429 || (response.status >= 500 && response.status < 600)) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      
      return response; // Return 4xx errors (except 429) without retrying.
    } catch (error) {
      if (i === retries - 1) throw error; // Rethrow the error on the last attempt.
      // Wait with exponential backoff before the next retry.
      await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
    }
  }
  // This should be unreachable if retries > 0, but is a fallback.
  throw new Error("Fetch failed after multiple retries");
}


export const getFullSurah = async (surahNumber: number, _mode: TranslationMode, localData: LocalTranslationData): Promise<SurahData | null> => {
  // Always cache/fetch the original clean API editions to avoid fetching again
  if (!surahCache.has(surahNumber)) {
    if (surahPromises.has(surahNumber)) {
      await surahPromises.get(surahNumber);
    } else {
      const fetchPromise = (async () => {
        try {
          const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,bn.bengali,en.transliteration`;
          
          // Use request limiter for online fetches
          const response = await requestLimiter.add(() => fetchWithRetry(url));
          
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
              return {
                  numberInSurah: ayah.numberInSurah,
                  absoluteNumber: absoluteAyahNumber,
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
        } finally {
          surahPromises.delete(surahNumber);
        }
      })();

      surahPromises.set(surahNumber, fetchPromise);
      await fetchPromise;
    }
  }

  const cachedSurah = surahCache.get(surahNumber);
  if (!cachedSurah) return null;

  // Reactively attach local translation variables if local file is loaded.
  const versesWithLocal = cachedSurah.verses.map(v => {
    const key = `${surahNumber}:${v.numberInSurah}`;
    let localEnglishText = undefined;
    let localBanglaText = undefined;
    if (localData?.[key]) {
      const localTranslations = localData[key];
      localEnglishText = localTranslations[0] || 'N/A';
      localBanglaText = localTranslations[1] || '';
    }
    return {
      ...v,
      localEnglishText,
      localBanglaText
    };
  });

  return {
    ...cachedSurah,
    verses: versesWithLocal
  };
};

export const getVerse = async (surah: number, verse: number, mode: TranslationMode, localData: LocalTranslationData): Promise<FullVerseData> => {
  // Use local data first directly if available and only local mode is requested (fast-track)
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

    let englishText = verseData.englishText;
    let banglaText = verseData.banglaText;

    if (mode === 'local') {
      englishText = verseData.localEnglishText || verseData.englishText;
      banglaText = verseData.localBanglaText || '';
    } else if (mode === 'both') {
      if (verseData.localEnglishText) {
        englishText = `${verseData.englishText}\n\n[Custom Local]\n${verseData.localEnglishText}`;
      }
    } else if (mode === 'none') {
      englishText = '';
      banglaText = '';
    }

    return {
      englishText,
      banglaText,
    };
  } catch (error) {
    console.error(`Failed to get verse ${surah}:${verse}:`, error);
    return {
      englishText: `Could not load verse ${surah}:${verse}.`,
      banglaText: `আয়াত ${surah}:${verse} লোড করা যায়নি।`,
    };
  }
};

export const getVerseDetails = async (surah: number, ayah: number, mode: TranslationMode, localData: LocalTranslationData): Promise<VerseResult | null> => {
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
            absoluteNumber: verseData.absoluteNumber,
            surah: {
                number: surahData.number,
                englishName: surahData.englishName,
            },
            arabicText: verseData.arabicText,
            transliteration: verseData.transliteration,
            englishText: verseData.englishText,
            banglaText: verseData.banglaText,
            localEnglishText: verseData.localEnglishText,
            localBanglaText: verseData.localBanglaText,
            fullVerseAudioUrl: verseData.fullVerseAudioUrl,
        };
    } catch (e) {
        console.error(`Failed to fetch verse details for ${surah}:${ayah}:`, e);
        return null;
    }
};