import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VerseFinderContent, VerseResult, SurahData, SurahVerse, LocalTranslationData } from '../types.ts';
import { getFullSurah, getVerseDetails } from '../data/verseData.ts';
import { SLICE_DATA } from '../constants.ts';
import { processInBatches } from '../utils.ts';
import {
  PlayIcon, PauseIcon, PlaylistPlayIcon, PlaylistPauseIcon, RepeatIcon, ShuffleIcon,
  MaximizeIcon, MinimizeIcon, CopyIcon, CheckIcon
} from './Icons.tsx';

type CurrentlyPlaying = {
  surah: number;
  ayah: number;
} | null;

interface VerseFinderProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  content: VerseFinderContent;
  setContent: (content: VerseFinderContent) => void;
  translationMode: 'online' | 'local';
  localTranslationData: LocalTranslationData;
  query: string;
  onQueryChange: (query: string) => void;
  shouldAutoSearch?: boolean;
  onAutoSearchHandled?: () => void;
}

const VerseFinder: React.FC<VerseFinderProps> = ({ isVisible, setIsVisible, content, setContent, translationMode, localTranslationData, query, onQueryChange, shouldAutoSearch, onAutoSearchHandled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const verseElementsRef = useRef(new Map<string, HTMLDivElement>());
  
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const lastPlayedRef = useRef<CurrentlyPlaying>(null);

  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [playlist, setPlaylist] = useState<{ surah: number; ayah: number; url: string; }[]>([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  const [rangeStart, setRangeStart] = useState('1');
  const [rangeEnd, setRangeEnd] = useState('');

  useEffect(() => {
    let newPlaylist: { surah: number; ayah: number; url: string; }[] = [];
    if (content.type === 'search') {
        newPlaylist = content.verses.map(v => ({
            surah: v.surah.number, ayah: v.numberInSurah, url: v.fullVerseAudioUrl
        }));
        setRangeStart('1'); setRangeEnd(''); 
    } else if (content.type === 'surah') {
        const start = parseInt(rangeStart, 10) || 1;
        const end = parseInt(rangeEnd, 10) || content.data.numberOfAyahs;
        
        if (rangeEnd === '' && content.data.numberOfAyahs > 0) {
            setRangeEnd(content.data.numberOfAyahs.toString());
        }

        newPlaylist = content.data.verses
            .filter(v => v.numberInSurah >= start && v.numberInSurah <= end)
            .map(v => ({ surah: content.data.number, ayah: v.numberInSurah, url: v.fullVerseAudioUrl }));
    }
    
    setPlaylist(newPlaylist);
    setIsPlaylistPlaying(false);
    setPlaylistIndex(0);
    if(audioRef.current) audioRef.current.pause();
    setCurrentlyPlaying(null);
  }, [content, rangeStart, rangeEnd]);

  useEffect(() => {
    if (currentlyPlaying) {
      const key = `${currentlyPlaying.surah}-${currentlyPlaying.ayah}`;
      const element = verseElementsRef.current.get(key);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentlyPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const onPlay = () => { setIsPlaying(true); };
    const onPause = () => { setIsPlaying(false); };

    const onEnded = () => {
        if (isPlaylistPlaying && playlistIndex + 1 < playlist.length) {
            setPlaylistIndex(prev => prev + 1);
        } else if (isPlaylistPlaying && isRepeatActive) {
            setPlaylistIndex(0);
        } else {
            setIsPlaylistPlaying(false);
            setCurrentlyPlaying(null);
            setIsPlaying(false);
        }
    };
    
    const onError = () => {
        const failedRequest = lastPlayedRef.current || currentlyPlaying;
        if (failedRequest) {
            setError(`Audio failed for [${failedRequest.surah}:${failedRequest.ayah}]`);
        } else {
            setError('Audio source unavailable.');
        }
        onEnded();
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [isPlaylistPlaying, isRepeatActive, playlist, playlistIndex, currentlyPlaying]);
  
  useEffect(() => {
    if (isPlaylistPlaying && playlist.length > 0 && playlistIndex < playlist.length) {
        const track = playlist[playlistIndex];
        handlePlayToggle({ surah: track.surah, ayah: track.ayah }, track.url, true);
    } else if (!isPlaylistPlaying && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
    }
  }, [isPlaylistPlaying, playlistIndex, playlist]);


  useEffect(() => {
    if (isVisible && content.type !== 'surah' && content.type !== 'loading_surah') {
        const timerId = setTimeout(() => { inputRef.current?.focus(); }, 100);
        return () => clearTimeout(timerId);
    }
    if (!isVisible) {
        const audio = audioRef.current;
        audio.pause();
        if (audio.src) {
            audio.removeAttribute('src');
            audio.load();
        }
        setCurrentlyPlaying(null); 
        setIsPlaying(false); 
        setIsPlaylistPlaying(false);
    }
  }, [isVisible, content.type]);

  const isSameAudio = (a: CurrentlyPlaying, b: CurrentlyPlaying) => {
    if (!a || !b) return false;
    return a.surah === b.surah && a.ayah === b.ayah;
  };

  const handlePlayToggle = (newRequest: CurrentlyPlaying, url: string, isFromPlaylist = false) => {
    if (!isFromPlaylist) { setIsPlaylistPlaying(false); }
    if (!url) {
        setError(`Audio unavailable for ${newRequest?.surah}:${newRequest?.ayah}`);
        return;
    }

    const audio = audioRef.current;
    if (isSameAudio(currentlyPlaying, newRequest)) {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => setError("Playback blocked."));
        }
    } else {
        setError(null);
        lastPlayedRef.current = newRequest;
        audio.pause();
        audio.src = '';
        audio.load();
        audio.src = url;
        audio.play().catch(() => {
            setTimeout(() => {
                if (audio.src === url) audio.play().catch(() => setError("Source failed."));
            }, 150);
        });
        setCurrentlyPlaying(newRequest);
    }
  };

  const handlePlaylistPlayPause = () => {
    if (playlist.length === 0) return;
    if (isPlaylistPlaying) {
      setIsPlaylistPlaying(false);
      audioRef.current.pause();
    } else {
      setIsPlaylistPlaying(true);
    }
  };

  const handleRepeatToggle = () => setIsRepeatActive(prev => !prev);

  const handleShuffle = () => {
    if (playlist.length <= 1) return;
    const shuffled = [...playlist].sort(() => Math.random() - 0.5);
    setPlaylist(shuffled);
    setPlaylistIndex(0);
    setIsPlaylistPlaying(false);
    audioRef.current.pause();
    setCurrentlyPlaying(null);
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setIsLoading(true); setError(null); audioRef.current.pause(); setCurrentlyPlaying(null);
    const normalizedQuery = query.replace(/–|—/g, '-');
    const queries = normalizedQuery.split(',').map(v => v.trim()).filter(Boolean);

    if (queries.length === 0) {
      setError('Invalid format.');
      setIsLoading(false); return;
    }
    
    try {
        const promises = queries.map(async (q): Promise<VerseResult[]> => {
            if (q.startsWith(':')) {
                const ayahNumber = parseInt(q.substring(1), 10);
                if (isNaN(ayahNumber) || ayahNumber < 1) return [];
                const surahsToFetch = SLICE_DATA.filter(slice => slice.blockCount >= ayahNumber);
                const results = await processInBatches(surahsToFetch, (slice) => getVerseDetails(slice.id, ayahNumber, translationMode, localTranslationData), 5);
                return results.filter((v): v is VerseResult => v !== null);
            }
            if (q.includes(':') && q.includes('-')) {
                const [surahStr, range] = q.split(':');
                const [startStr, endStr] = range.split('-');
                const surah = parseInt(surahStr, 10), start = parseInt(startStr, 10), end = parseInt(endStr, 10);
                if (isNaN(surah) || isNaN(start) || isNaN(end) || start > end || start < 1) return [];
                const verseIdentifiers = [];
                for (let i = start; i <= end; i++) verseIdentifiers.push({ surah, ayah: i });
                const results = await processInBatches(verseIdentifiers, ({ surah, ayah }) => getVerseDetails(surah, ayah, translationMode, localTranslationData), 5);
                return results.filter((v): v is VerseResult => v !== null);
            }
            if (q.includes(':')) {
                const [surahStr, ayahStr] = q.split(':');
                const surah = parseInt(surahStr, 10), ayah = parseInt(ayahStr, 10);
                if (isNaN(surah) || isNaN(ayah) || surah < 1 || surah > 114 || ayah < 1) return [];
                const verse = await getVerseDetails(surah, ayah, translationMode, localTranslationData);
                return verse ? [verse] : [];
            }
            if (/^\d+$/.test(q)) {
                const chapterNum = parseInt(q, 10);
                if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 114) return [];
                const surahData = await getFullSurah(chapterNum, translationMode, localTranslationData);
                if (!surahData) return [];
                return surahData.verses.map(v => ({
                    numberInSurah: v.numberInSurah,
                    surah: { number: surahData.number, englishName: surahData.englishName },
                    arabicText: v.arabicText,
                    transliteration: v.transliteration,
                    englishText: v.englishText,
                    banglaText: v.banglaText,
                    fullVerseAudioUrl: v.fullVerseAudioUrl
                }));
            }
            return [];
        });

      const resultsArrays = await Promise.all(promises);
      const finalResults = resultsArrays.flat();
       if (finalResults.length === 0) setError('No verses found.');
       else setContent({type: 'search', verses: finalResults});
    } catch (e) { setError('Search error.'); } finally { setIsLoading(false); }
  }, [query, translationMode, localTranslationData, setContent]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') handleSearch(); };
  
  useEffect(() => {
    if (isVisible && shouldAutoSearch && onAutoSearchHandled) {
        handleSearch();
        onAutoSearchHandled();
    }
  }, [isVisible, shouldAutoSearch, onAutoSearchHandled, handleSearch]);

  const handleCopyAll = () => {
    if (content.type !== 'search' && content.type !== 'surah') return;
    const versesToCopy = content.type === 'search' ? content.verses : content.data.verses;
    if (versesToCopy.length === 0) return;
    const textToCopy = versesToCopy.map(v => {
        const surahNumber = 'surah' in v ? v.surah.number : (content as any).data.number;
        const surahName = 'surah' in v ? v.surah.englishName : (content as any).data.englishName;
        return `${surahName} [${surahNumber}:${v.numberInSurah}]\nAr: ${v.arabicText}\nEn: ${v.englishText}\nTr: ${v.transliteration}`;
    }).join('\n\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    });
  };

  const renderContent = () => {
    switch (content.type) {
        case 'loading': return <p className="text-center text-gray-400 p-4">Loading...</p>;
        case 'loading_surah': return <p className="text-center text-gray-400 p-4">Loading Surah {content.number}...</p>;
        case 'empty': return <p className="text-center text-gray-400 p-4">Search or select a chapter.</p>;
        case 'search':
            return (
                <div className="space-y-4">
                    {content.verses.map((v) => {
                        const id = { surah: v.surah.number, ayah: v.numberInSurah };
                        const isCurrent = isPlaying && isSameAudio(currentlyPlaying, id);
                        return (
                            <div key={`${v.surah.number}-${v.numberInSurah}`} ref={el => el ? verseElementsRef.current.set(`${v.surah.number}-${v.numberInSurah}`, el) : verseElementsRef.current.delete(`${v.surah.number}-${v.numberInSurah}`)} className="p-3 bg-gray-900/50 border border-gray-700 rounded-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-cyan-400">{v.surah.englishName} [{v.surah.number}:{v.numberInSurah}]</h4>
                                    <button onClick={() => handlePlayToggle(id, v.fullVerseAudioUrl)} className={isCurrent ? 'text-cyan-300' : 'text-gray-400 hover:text-white'}>
                                        {isCurrent ? <PauseIcon /> : <PlayIcon />}
                                    </button>
                                </div>
                                <div className="text-xl text-right font-serif text-white mb-2" dir="rtl">{v.arabicText}</div>
                                <p className="italic text-gray-400 mb-2">{v.transliteration}</p>
                                <p className="text-gray-200 border-l-2 border-cyan-500/50 pl-2">{v.englishText}</p>
                            </div>
                        );
                    })}
                </div>
            );
        case 'surah':
            return (
                <div>
                    <div className="text-center mb-4 p-2 bg-gray-900/50 rounded-lg">
                        <h3 className="text-2xl font-bold text-cyan-300">{content.data.number}. {content.data.englishName}</h3>
                        <p className="text-lg text-gray-300 font-serif" dir="rtl">{content.data.arabicName}</p>
                    </div>
                    <div className="space-y-4">
                       {content.data.verses.map((v) => {
                           const id = { surah: content.data.number, ayah: v.numberInSurah };
                           const isCurrent = isPlaying && isSameAudio(currentlyPlaying, id);
                           return (
                               <div key={`${content.data.number}-${v.numberInSurah}`} ref={el => el ? verseElementsRef.current.set(`${content.data.number}-${v.numberInSurah}`, el) : verseElementsRef.current.delete(`${content.data.number}-${v.numberInSurah}`)} className="p-3 bg-gray-900/50 border border-gray-700 rounded-md">
                                   <div className="flex justify-between items-center mb-2">
                                       <h4 className="font-bold text-cyan-400">{content.data.number}:{v.numberInSurah}</h4>
                                       <button onClick={() => handlePlayToggle(id, v.fullVerseAudioUrl)} className={isCurrent ? 'text-cyan-300' : 'text-gray-400 hover:text-white'}>
                                           {isCurrent ? <PauseIcon /> : <PlayIcon />}
                                       </button>
                                   </div>
                                   <div className="text-2xl text-right font-serif text-white mb-3" dir="rtl">{v.arabicText}</div>
                                   <p className="text-gray-200 border-l-2 border-cyan-500/50 pl-2">{v.englishText}</p>
                               </div>
                           );
                       })}
                    </div>
                </div>
            );
    }
  }

  if (!isVisible) return null;

  return (
    <div className={`max-h-[calc(100vh-100px)] bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col transition-all duration-300 ${isMaximized ? 'w-80 lg:w-[700px]' : 'w-80'}`}>
      <div className="flex justify-between items-center p-3 border-b border-cyan-500/20 gap-x-2">
        <div className="flex items-center gap-x-2">
            <h3 className="font-semibold text-cyan-300 shrink-0">Reader</h3>
            {((content.type === 'search' && content.verses.length > 0) || (content.type === 'surah' && content.data.verses.length > 0)) && (
                <button onClick={handleCopyAll} className={`flex items-center gap-1.5 text-xs rounded-md px-2 py-1 transition-all ${copyStatus === 'copied' ? 'bg-emerald-600 text-white' : 'bg-gray-700/50 hover:bg-cyan-700/50 text-gray-300 hover:text-white'}`}>
                    {copyStatus === 'copied' ? <CheckIcon /> : <CopyIcon />}
                    {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
                </button>
            )}
        </div>
        {content.type === 'surah' && (
            <div className="flex items-center gap-1 text-xs text-white">
              <input type="number" min="1" max={content.data.numberOfAyahs} value={rangeStart} onChange={e => setRangeStart(e.target.value)} className="w-14 bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-center" />
              <span>-</span>
              <input type="number" min="1" max={content.data.numberOfAyahs} value={rangeEnd} onChange={e => setRangeEnd(e.target.value)} className="w-14 bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-center" />
            </div>
        )}
        <div className="flex items-center gap-x-2 text-gray-400">
            <button onClick={handleShuffle} disabled={playlist.length === 0} title="Shuffle"><ShuffleIcon/></button>
            <button onClick={handleRepeatToggle} className={isRepeatActive ? 'text-cyan-300' : ''} title="Repeat"><RepeatIcon/></button>
            <button onClick={handlePlaylistPlayPause} disabled={playlist.length === 0} className={isPlaylistPlaying && isPlaying ? 'text-cyan-300' : ''} title="Play List">
                {isPlaylistPlaying ? <PlaylistPauseIcon/> : <PlaylistPlayIcon/>}
            </button>
            <button onClick={() => setIsMaximized(p => !p)} title="Size">{isMaximized ? <MinimizeIcon/> : <MaximizeIcon/>}</button>
            <button onClick={() => setIsVisible(false)} title="Close"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2">
            <input ref={inputRef} type="text" value={query} onChange={(e) => onQueryChange(e.target.value)} onKeyDown={handleKeyDown} placeholder="e.g., 2:255, 112, 18:1-10" className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
            <button onClick={handleSearch} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1.5 px-3 rounded text-sm disabled:bg-gray-500">
                {isLoading ? '...' : 'Go'}
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3 text-sm">
        {error && <p className="text-red-400 text-center p-2 bg-red-900/30 rounded">{error}</p>}
        {renderContent()}
      </div>
    </div>
  );
};

export default VerseFinder;