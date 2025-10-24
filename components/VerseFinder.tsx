import React, { useState, useEffect } from 'react';

interface VerseResult {
  numberInSurah: number;
  surah: {
    number: number;
    englishName: string;
  };
  arabicText: string;
  transliteration: string;
  englishText: string;
  banglaText: string;
}

interface VerseFinderProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const VerseFinder: React.FC<VerseFinderProps> = ({ isVisible, setIsVisible }) => {
  const [query, setQuery] = useState('');
  const [verses, setVerses] = useState<VerseResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when finder is hidden
    if (!isVisible) {
        setQuery('');
        setVerses([]);
        setError(null);
        setIsLoading(false);
    }
  }, [isVisible]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setVerses([]);

    const verseQueries = query
      .split(',')
      .map(v => v.trim())
      .filter(v => v.match(/^\d+:\d+$/));

    if (verseQueries.length === 0) {
      setError('Invalid format. Use Surah:Ayah, e.g., 1:1, 2:286');
      setIsLoading(false);
      return;
    }

    try {
      const promises = verseQueries.map(async (verseQuery) => {
        const [surah, ayah] = verseQuery.split(':');
        const url = `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.transliteration,en.sahih,bn.bengali`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error for ${verseQuery}! Status: ${response.status}`);
        const json = await response.json();
        
        if (json.code !== 200 || !json.data || json.data.length < 4) {
          throw new Error(`Invalid data received for ${verseQuery}`);
        }

        const verseData = json.data;
        const result: VerseResult = {
          numberInSurah: verseData[0].numberInSurah,
          surah: {
            number: verseData[0].surah.number,
            englishName: verseData[0].surah.englishName,
          },
          arabicText: verseData.find(v => v.edition.identifier === 'quran-uthmani')?.text || 'N/A',
          transliteration: verseData.find(v => v.edition.identifier === 'en.transliteration')?.text || 'N/A',
          englishText: verseData.find(v => v.edition.identifier === 'en.sahih')?.text || 'N/A',
          banglaText: verseData.find(v => v.edition.identifier === 'bn.bengali')?.text || 'N/A',
        };
        return result;
      });

      const results = await Promise.all(promises);
      setVerses(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
  };


  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-80 max-h-[calc(100vh-100px)] bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-cyan-500/20">
        <h3 className="font-semibold text-cyan-300">Verse Finder</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
          aria-label="Close Verse Finder"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 1:1, 2:286"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1.5 px-3 rounded text-sm transition-colors duration-200 disabled:bg-gray-500"
            >
                {isLoading ? '...' : 'Go'}
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3 text-sm">
        {error && <p className="text-red-400 text-center p-2 bg-red-900/30 rounded">{error}</p>}
        {verses.length > 0 && (
            <div className="space-y-4">
                {verses.map((verse, index) => (
                    <div key={index} className="p-3 bg-gray-900/50 border border-gray-700 rounded-md">
                        <h4 className="font-bold text-cyan-400 mb-2">{verse.surah.englishName} [{verse.surah.number}:{verse.numberInSurah}]</h4>
                        <p className="text-xl text-right font-serif text-white mb-2" dir="rtl">{verse.arabicText}</p>
                        <p className="italic text-gray-400 mb-2">{verse.transliteration}</p>
                        <p className="text-gray-200 border-l-2 border-cyan-500/50 pl-2 mb-2">{verse.englishText}</p>
                        <p className="text-cyan-200 border-l-2 border-cyan-500/50 pl-2">{verse.banglaText}</p>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default VerseFinder;