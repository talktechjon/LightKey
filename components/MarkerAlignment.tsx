import React, { useMemo } from 'react';
import { ICON_DIAL_DATA, SECRET_EMOJI_PATTERN, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS } from '../constants.ts';
import { getSliceAtPoint, colorScale, polarToCartesian, getChapterIcon } from '../utils.ts';
import { PlaylistType } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';
import { LoadSequenceIcon } from './Icons.tsx';

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

const EnneagramDiagram: React.FC = () => {
    const radius = 80;
    const center = { x: 100, y: 100 };
    
    const points = Array.from({ length: 9 }).map((_, i) => {
        const value = i === 0 ? 9 : i;
        const angle = i * 40;
        const pos = polarToCartesian(center.x, center.y, radius, angle);
        return { value, ...pos };
    });

    const getPos = (val: number) => points.find(p => p.value === val)!;

    // 1-2-4-8-7-5-1 (Doubling Sequence / Vortex Math)
    const webPath = `M ${getPos(1).x},${getPos(1).y} L ${getPos(2).x},${getPos(2).y} L ${getPos(4).x},${getPos(4).y} L ${getPos(8).x},${getPos(8).y} L ${getPos(7).x},${getPos(7).y} L ${getPos(5).x},${getPos(5).y} L ${getPos(1).x},${getPos(1).y}`;
    
    // 3-6-9-3 (Triangle)
    const trianglePath = `M ${getPos(3).x},${getPos(3).y} L ${getPos(6).x},${getPos(6).y} L ${getPos(9).x},${getPos(9).y} L ${getPos(3).x},${getPos(3).y}`;

    return (
        <div className="flex justify-center my-4">
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx={center.x} cy={center.y} r={radius} fill="none" stroke="#374151" strokeWidth="1.5" />
                <path d={webPath} fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.6" />
                <path d={trianglePath} fill="none" stroke="#d946ef" strokeWidth="2.5" strokeOpacity="0.8" />

                {points.map((p) => (
                    <g key={p.value}>
                        <circle cx={p.x} cy={p.y} r="12" fill="#111827" stroke={p.value % 3 === 0 ? "#d946ef" : "#06b6d4"} strokeWidth="1.5" />
                        <text 
                            x={p.x} 
                            y={p.y} 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            fill="white" 
                            fontSize="12" 
                            fontWeight="bold"
                        >
                            {p.value}
                        </text>
                    </g>
                ))}
                
                {/* Center Core Anchor (d-term / 5) */}
                <circle cx={center.x} cy={center.y} r="6" fill="#111827" stroke="#fbbf24" strokeWidth="2" />
                <text x={center.x} y={center.y + 14} textAnchor="middle" dominantBaseline="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                    d(5)
                </text>
            </svg>
        </div>
    );
};

const POSITION_LABELS: Record<number, string> = {
    3: 'c-term • Direction / Rahim [Āyāt]',
    5: 'd-term • Invariant Center • Umm al-Kitab',
    6: 'b-term • Balance / Rahman [Hidāyah]',
    9: 'a-term • Force / Razim [Hayāt]'
};

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

    // Determine current chapter context
    const currentSlice = getSliceAtPoint(1, rotation);
    const currentChapter = CHAPTER_DETAILS[currentSlice.id - 1];
    const isMakki = currentChapter.revelationType === 'Makki';

    // Define sequences based on revelation type
    // Makki: 9 (Current) - 3 - 1 - 2 - 4 - 8 - 7 - 5 - 6
    // Madani: 3 - 1 - 2 - 4 - 8 - 7 - 5 - 6 - 9 (Current)
    const sequenceConfig = useMemo(() => isMakki 
        ? [9, 3, 1, 2, 4, 8, 7, 5, 6]
        : [3, 1, 2, 4, 8, 7, 5, 6, 9], [isMakki]);

    const handleWatchEmojiSequence = (type: PlaylistType) => {
        const clockwiseChapterPoints = [1, 19, 39, 57, 77, 95];
        const relativeRotation = rotation - iconDialRotation;
        const chapterIds = clockwiseChapterPoints.map(pointValue => {
            return getSliceAtPoint(pointValue, relativeRotation).id;
        });
        createPlaylist(type, chapterIds);
    };
      
    const getChapterIdsForSequence = () => {
        return sequenceConfig.map(item => {
             const marker = SECRET_EMOJI_PATTERN.find(m => m.position === item);
             if (!marker) return null;
             return getSliceAtPoint(marker.chapter, rotation).id;
        }).filter((id): id is number => id !== null);
    };

    const handleWatchSecretSequence = (type: PlaylistType) => {
        const chapterIds = getChapterIdsForSequence();
        createPlaylist(type, chapterIds);
    };

    const handleLoadSecretSequence = () => {
        setAnimationMode('off');
        const chapterIds = getChapterIdsForSequence();
        setCustomSequence(chapterIds.join(', '));
    };

    const downwardMarkersData = useMemo(() => ICON_DIAL_DATA.slice(0, 3), []);
    const upwardMarkersData = useMemo(() => ICON_DIAL_DATA.slice(3, 6), []);

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
                            <LoadSequenceIcon />
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
                <>
                    <EnneagramDiagram />
                    
                    <div className="bg-gray-800/40 p-4 rounded-xl mt-1 mb-6 border border-gray-700/50">
                         <p className="font-bold text-gray-200 text-xs mb-2 flex items-center justify-between tracking-wide">
                             <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                DUAL-MODE ENGINE
                             </span>
                             <span className="text-[9px] opacity-70 font-mono tracking-tighter">f(x) = ax³ [110] + bx² [108] + cx [103] + d [19= 10+9]</span>
                         </p>
                         
                         <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                             The system runs in <strong className="text-gray-200 font-semibold">two modes</strong> of the same equation, depending on how transformation is triggered. Both use the same 9→3→6 cycle anchored by the 5.
                         </p>

                         {isMakki ? (
                             <div className="mb-4 space-y-2">
                                 <div className="flex items-center gap-2">
                                     <span className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-tighter">Makki (Iron Mode)</span>
                                     <span className="text-[10px] text-gray-400 italic">Internal Activation</span>
                                 </div>
                                 <div className="pl-2 border-l-2 border-emerald-500/20 py-1">
                                     <p className="text-[11px] text-gray-300">
                                         Order: <strong className="text-emerald-400">9 → 3 → 6 → 9</strong>
                                     </p>
                                     <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                                         Intensity first, then direction, then stabilization. Change begins <strong className="text-gray-400 font-medium">inside</strong>, like heat forging iron.
                                     </p>
                                 </div>
                             </div>
                         ) : (
                             <div className="mb-4 space-y-2">
                                 <div className="flex items-center gap-2">
                                     <span className="px-2 py-0.5 rounded bg-amber-900/40 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-tighter">Madani (Mountain Mode)</span>
                                     <span className="text-[10px] text-gray-400 italic">External Construction</span>
                                 </div>
                                 <div className="pl-2 border-l-2 border-amber-500/20 py-1">
                                     <p className="text-[11px] text-gray-300">
                                         Order: <strong className="text-amber-400">3 → 6 → 9 → 3</strong>
                                     </p>
                                     <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                                         Guidance first, then stabilization, then power. Change begins <strong className="text-gray-400 font-medium">outside</strong>, like building on mountain.
                                     </p>
                                 </div>
                             </div>
                         )}

                         <div className="grid grid-cols-2 gap-2 font-mono text-[9px] text-gray-400 border-t border-gray-700/30 pt-3">
                             <div className="flex items-center gap-1.5 grayscale opacity-70">
                                <span className="text-red-400 font-bold text-xs">9</span>
                                <div><span className="text-red-300/80">a-term</span><br/><span>Force</span></div>
                             </div>
                             <div className="flex items-center gap-1.5 grayscale opacity-70">
                                <span className="text-amber-400 font-bold text-xs">3</span>
                                <div><span className="text-amber-300/80">c-term</span><br/><span>Direction</span></div>
                             </div>
                             <div className="flex items-center gap-1.5 grayscale opacity-70">
                                <span className="text-teal-400 font-bold text-xs">6</span>
                                <div><span className="text-teal-300/80">b-term</span><br/><span>Balance</span></div>
                             </div>
                             <div className="flex items-center gap-1.5 border border-cyan-500/20 p-1 rounded bg-cyan-500/5">
                                <span className="text-cyan-400 font-bold text-xs">5</span>
                                <div><span className="text-cyan-300/80 font-bold font-sans">d-term</span><br/><span className="text-cyan-200/50">Invariant Core</span></div>
                             </div>
                         </div>
                    </div>

                    <div className="text-center mb-2">
                        <span className={`text-xs font-mono px-2 py-1 rounded ${isMakki ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
                            {isMakki ? 'MAKKI SEQUENCE (9 Start)' : 'MADANI SEQUENCE (9 End)'}
                        </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-3 space-y-2" aria-label="Secret pattern markers">
                    {sequenceConfig.map((item, idx) => {
                        const data = SECRET_EMOJI_PATTERN.find(m => m.position === item);
                        if (!data) return null;
                        
                        const { position } = data;
                        
                        // We'll maintain the emoji shift logic for the "marker" types to keep the dial sync visual
                        const patternSize = SECRET_EMOJI_PATTERN.length;
                        const originalIndex = SECRET_EMOJI_PATTERN.indexOf(data);
                        const shiftedIndex = (originalIndex - secretEmojiShift + patternSize) % patternSize;
                        const emojiData = SECRET_EMOJI_PATTERN[shiftedIndex];
                        const finalEmoji = emojiData.emoji;

                        const slice = getSliceAtPoint(data.chapter, rotation);
                        const sliceId = slice.id;
                        const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                        const muqattatLetters = MUQATTAT_LETTERS.get(slice.id);
                        const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                        const chapterColor = colorScale(slice.id);
                        const iconSrc = getChapterIcon(chapterInfo.revelationType);

                        // Highlight 3, 6, 9
                        const isHighlighted = [3, 6, 9].includes(position);
                        const label = POSITION_LABELS[position];

                        return (
                            <div 
                                key={`marker-${idx}`} 
                                className={`flex flex-col relative ${isHighlighted ? 'border border-fuchsia-500/60 rounded-lg p-2 bg-fuchsia-900/10 mb-3' : 'mb-1 pl-2'}`}
                            >
                                <div className="flex items-center gap-x-3 overflow-hidden">
                                    <span className={`font-mono text-xs w-4 text-center flex-shrink-0 ${isHighlighted ? 'text-fuchsia-300 font-bold' : 'text-gray-500'}`}>{position}</span>
                                    <span className="text-lg w-6 text-center">{finalEmoji}</span>
                                    <div className="flex items-baseline gap-x-3 min-w-0">
                                        <span className="truncate flex items-center gap-1.5" title={`${sliceId}: ${chapterInfo.englishName}`} style={{ color: chapterColor }}>
                                            <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className={`font-semibold ${isMuqattat ? 'muqattat-glow' : ''}`}>{sliceId}:</span> {chapterInfo.englishName}
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
                                {isHighlighted && label && (
                                    <div className="pl-12 mt-1">
                                         <span className="text-[11px] font-medium tracking-wide text-cyan-300 block">
                                            {label}
                                         </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    </div>
                </>
            ) : (
                <div className="text-xs text-gray-400 mt-3 grid grid-cols-2 gap-x-6" aria-label="Special chapter markers">
                    {/* Column 1: Downward Triangle Markers */}
                    <div className="space-y-2">
                        {downwardMarkersData.map((marker) => {
                            const relativeRotation = rotation - iconDialRotation;
                            const slice = getSliceAtPoint(marker.chapter, relativeRotation);
                            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                            const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                            const iconSrc = getChapterIcon(chapterInfo.revelationType);
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
                            const iconSrc = getChapterIcon(chapterInfo.revelationType);
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