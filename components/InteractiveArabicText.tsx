import React, { useState, useRef } from 'react';
import { WordData } from '../types.ts';
import { getVerseWords } from '../data/verseData.ts';

interface InteractiveArabicTextProps {
    surah: number;
    ayah: number;
    fallbackText: string;
}

export const InteractiveArabicText: React.FC<InteractiveArabicTextProps> = ({ surah, ayah, fallbackText }) => {
    const [words, setWords] = useState<WordData[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeWordId, setActiveWordId] = useState<number | null>(null);
    const audioRef = useRef(new Audio());

    const loadWords = async () => {
        setIsLoading(true);
        const data = await getVerseWords(surah, ayah);
        if (data) {
            setWords(data);
        }
        setIsLoading(false);
    };

    const playWord = (word: WordData) => {
        if (!word.audio_url) return;
        audioRef.current.pause();
        audioRef.current.src = `https://verses.quran.com/${word.audio_url}`;
        audioRef.current.play().catch(e => console.error("Error playing word audio", e));
        setActiveWordId(word.id);
        
        audioRef.current.onended = () => {
            setActiveWordId(null);
        };
    };

    if (words) {
        return (
            <div className="flex flex-wrap gap-x-3 gap-y-4 mb-3" dir="rtl">
                {words.map((word) => (
                    <div 
                        key={word.id} 
                        className={`flex flex-col items-center justify-start cursor-pointer p-1.5 rounded-md transition-colors ${activeWordId === word.id ? 'bg-cyan-900/50' : 'hover:bg-gray-800/50'}`}
                        onClick={() => playWord(word)}
                        title={word.translation?.text || ''}
                    >
                        <span className={`text-2xl font-serif leading-relaxed ${activeWordId === word.id ? 'text-cyan-400' : 'text-gray-100'}`}>
                            {word.text_uthmani}
                        </span>
                        {word.char_type_name !== 'end' && (
                            <span className="text-[10px] text-gray-400 mt-2 max-w-[80px] text-center truncate">
                                {word.translation?.text || ''}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="mb-3 relative group">
            <div className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2">
                <button 
                    onClick={loadWords} 
                    disabled={isLoading}
                    className="text-[9px] uppercase tracking-wider bg-gray-800/80 hover:bg-cyan-900/80 text-cyan-400 px-2 py-1 rounded transition-colors backdrop-blur-sm border border-cyan-500/20"
                >
                    {isLoading ? 'Loading...' : 'Word-by-Word'}
                </button>
            </div>
            <div className="text-2xl text-right font-serif text-white leading-relaxed pt-2" dir="rtl">
                {fallbackText}
            </div>
        </div>
    );
};
