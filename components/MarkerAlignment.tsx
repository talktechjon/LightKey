import React from 'react';
import { ICON_DIAL_DATA, SECRET_EMOJI_PATTERN, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, MAKKI_ICON_SVG, MADANI_ICON_SVG, TOTAL_SLICES } from '../constants.ts';
import { getSliceAtPoint } from '../utils.ts';
import { PlaylistType } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';

interface MarkerAlignmentProps {
    isSecretModeActive: boolean;
    rotation: number;
    iconDialRotation: number;
    secretEmojiShift: number;
    setIconDialRotation: (rotation: number | ((prev: number) => number)) => void;
    setCustomSequence: (value: string) => void;
    setAnimationMode: (mode: 'play' | 'step' | 'off') => void;
    createPlaylist: (type: PlaylistType, chapterIds: number[]) => void;
}

const MarkerAlignment: React.FC<MarkerAlignmentProps> = ({ 
    isSecretModeActive, 
    rotation, 
    iconDialRotation, 
    secretEmojiShift, 
    setIconDialRotation,
    setCustomSequence,
    setAnimationMode,
    createPlaylist
}) => {

    const handleWatchEmojiSequence = (type: PlaylistType) => {
        const clockwiseChapterPoints = [1, 19, 39, 57, 77, 95];
        const relativeRotation = rotation - iconDialRotation;
        const chapterIds = clockwiseChapterPoints.map(pointValue => {
            return getSliceAtPoint(pointValue, relativeRotation).id;
        });
        createPlaylist(type, chapterIds);
    };
      
    const handleWatchSecretSequence = (type: PlaylistType) => {
        const chapterIds = SECRET_EMOJI_PATTERN.map(marker => {
            return getSliceAtPoint(marker.chapter, rotation).id;
        });
        createPlaylist(type, chapterIds);
    };

    const handleLoadSecretSequence = () => {
        setAnimationMode('off');
        const chapterIds = SECRET_EMOJI_PATTERN.map(marker => {
            const slice = getSliceAtPoint(marker.chapter, rotation);
            return slice.id;
        });
        setCustomSequence(chapterIds.join(', '));
    };

    const downwardMarkersData = ICON_DIAL_DATA.slice(0, 3);
    const upwardMarkersData = ICON_DIAL_DATA.slice(3, 6);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">
                    {isSecretModeActive ? 'SECRET PATTERN' : 'MARKER ALIGNMENT'}
                </h2>
                {isSecretModeActive ? (
                    <div className="flex items-center space-x-2">
                            <button
                            onClick={handleLoadSecretSequence}
                            className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0"
                            aria-label="Load secret pattern into custom sequence"
                            title="Load secret pattern into custom sequence"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19-4v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                        </button>
                        <PlaylistButtons onWatch={handleWatchSecretSequence} />
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIconDialRotation(0)}
                            className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0"
                            aria-label="Reset marker alignment"
                            title="Reset marker alignment"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <PlaylistButtons onWatch={handleWatchEmojiSequence} />
                    </div>
                )}
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2"></div>

            {isSecretModeActive ? (
                <div className="text-sm text-gray-400 mt-3 space-y-2" aria-label="Secret pattern markers">
                {SECRET_EMOJI_PATTERN.map((marker, index) => {
                    const patternSize = SECRET_EMOJI_PATTERN.length;
                    const shiftedIndex = (index - secretEmojiShift + patternSize) % patternSize;
                    const emojiData = SECRET_EMOJI_PATTERN[shiftedIndex];
                    
                    const slice = getSliceAtPoint(marker.chapter, rotation);
                    const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                    const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                    const muqattatLetters = MUQATTAT_LETTERS.get(slice.id);
                    const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
                    
                    return (
                        <div key={marker.id} className="flex items-center gap-x-3 overflow-hidden">
                        <span className="text-lg w-6 text-center">{emojiData.emoji}</span>
                        <div className="flex items-baseline gap-x-3 min-w-0">
                            <span className="truncate flex items-center gap-1.5" title={`${slice.id}: ${chapterInfo.englishName}`}>
                                <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className={`font-semibold text-gray-300 ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}:</span> {chapterInfo.englishName}
                            </span>
                            {muqattatLetters && (
                                <span 
                                    className="font-mono text-lg muqattat-glow flex-shrink-0"
                                    dir="rtl"
                                >
                                    {muqattatLetters.join(' ⊙ ')}
                                </span>
                            )}
                        </div>
                        </div>
                    );
                })}
                </div>
            ) : (
                <div className="text-xs text-gray-400 mt-3 grid grid-cols-2 gap-x-6" aria-label="Special chapter markers">
                    {/* Column 1: Downward Triangle Markers */}
                    <div className="space-y-2">
                        {downwardMarkersData.map((marker) => {
                            const relativeRotation = rotation - iconDialRotation;
                            const slice = getSliceAtPoint(marker.chapter, relativeRotation);
                            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                            const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                            const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
                            return (
                                <div key={`down-${marker.id}`} className="flex items-center gap-x-2 overflow-hidden">
                                    <span className="text-base">{marker.emoji}</span>
                                    <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="truncate" title={`${slice.id}: ${chapterInfo.englishName}`}>
                                        <span className={`font-semibold text-gray-300 ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}:</span> {chapterInfo.englishName}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Column 2: Upward Triangle Markers */}
                    <div className="space-y-2">
                        {upwardMarkersData.map((marker) => {
                            const relativeRotation = rotation - iconDialRotation;
                            const slice = getSliceAtPoint(marker.chapter, relativeRotation);
                            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                            const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                            const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
                            return (
                                <div key={`up-${marker.id}`} className="flex items-center gap-x-2 overflow-hidden">
                                    <span className="text-base">{marker.emoji}</span>
                                        <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="truncate" title={`${slice.id}: ${chapterInfo.englishName}`}>
                                        <span className={`font-semibold text-gray-300 ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}:</span> {chapterInfo.englishName}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarkerAlignment;