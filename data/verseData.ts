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
