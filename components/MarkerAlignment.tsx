import React, { useMemo, useState } from 'react';
import { 
    Compass, 
    Binary, 
    RefreshCw, 
    Heart, 
    BookOpen, 
    Sparkles, 
    ArrowRight, 
    Layers, 
    GitCommit
} from 'lucide-react';
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
    3: 'The Path • Direction • Rahim [Āyāt]',
    5: 'The Heart • Invariant Center • Umm al-Kitab',
    6: 'The Balance • Stabilization • Rahman [Hidāyah]',
    9: 'The Life • Source • Razim [Hayāt]'
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
    const [activeTab, setActiveTab] = useState<'map' | 'math' | 'flow' | 'switch' | 'verses'>('map');

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
            <div className="w-full h-px bg-gray-800/50 mt-2 mb-4"></div>
            {isSecretModeActive ? (
                <>
                    <EnneagramDiagram />
                    
                    {/* Interactive Tab Navigation */}
                    <div className="flex border-b border-gray-800 mb-4 overflow-x-auto no-scrollbar whitespace-nowrap text-[10px] font-bold tracking-wider uppercase">
                        <button 
                            onClick={() => setActiveTab('map')} 
                            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all duration-200 cursor-pointer ${activeTab === 'map' ? 'border-fuchsia-500 text-fuchsia-400 bg-fuchsia-950/20' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                        >
                            <Compass className="w-3.5 h-3.5" /> Map & Geometry
                        </button>
                        <button 
                            onClick={() => setActiveTab('math')} 
                            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all duration-200 cursor-pointer ${activeTab === 'math' ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                        >
                            <Binary className="w-3.5 h-3.5" /> Offsets & Mirror
                        </button>
                        <button 
                            onClick={() => setActiveTab('flow')} 
                            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all duration-200 cursor-pointer ${activeTab === 'flow' ? 'border-amber-500 text-amber-400 bg-amber-950/20' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                        >
                            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Flow Direction
                        </button>
                        <button 
                            onClick={() => setActiveTab('switch')} 
                            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all duration-200 cursor-pointer ${activeTab === 'switch' ? 'border-pink-500 text-pink-400 bg-pink-950/20' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                        >
                            <Heart className="w-3.5 h-3.5" /> The Switch
                        </button>
                        <button 
                            onClick={() => setActiveTab('verses')} 
                            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all duration-200 cursor-pointer ${activeTab === 'verses' ? 'border-blue-500 text-blue-400 bg-blue-950/20' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                        >
                            <BookOpen className="w-3.5 h-3.5" /> Key Coordinates
                        </button>
                    </div>

                    <div className="bg-gray-900/40 border border-gray-800/80 p-4 rounded-xl shadow-inner-lg mt-1 mb-5 max-h-[550px] overflow-y-auto transition-all duration-300">
                        
                        {/* TAB 1: MAP & GEOMETRY */}
                        {activeTab === 'map' && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="border-b border-gray-800 pb-2">
                                    <h3 className="text-sm font-bold text-fuchsia-400 flex items-center gap-1.5">
                                        <Sparkles className="w-4 h-4 text-fuchsia-400" />
                                        SECRET PATTERN — THE 9 PHASES
                                    </h3>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        A mapped navigation of the 9 states through which the Reader passes.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-950/50 p-3 rounded-lg border border-gray-800/50 flex gap-2 items-start">
                                    <span className="text-amber-400 font-mono text-xs font-bold shrink-0 mt-0.5">d(5):</span>
                                    <p className="text-[11px] text-gray-300 leading-relaxed">
                                        The absolute static center <strong className="text-amber-400 font-medium">d(5) = 19:12</strong> never moves. It holds the entire structural grid in dynamic equilibrium.
                                    </p>
                                </div>

                                <div className="space-y-3 pt-1">
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Geometric Components</h4>
                                    
                                    <div className="p-3 rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.5)]"></span>
                                            <span className="text-xs font-bold text-fuchsia-300">Purple Triangle (3-6-9) — The Constants</span>
                                        </div>
                                        <p className="text-[11px] text-gray-300 leading-relaxed pl-4">
                                            Fixed coordinates that govern system foundation. They represent <strong className="text-fuchsia-300 font-medium">Direction, Balance, and Life</strong>, holding the primary invariant geometry.
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
                                            <span className="text-xs font-bold text-cyan-300">Cyan Hexagon (1-2-4-5-7-8) — The Variables</span>
                                        </div>
                                        <p className="text-[11px] text-gray-300 leading-relaxed pl-4">
                                            Dynamic coordinates that rotate, transform, and flip direction: <strong className="text-cyan-300 font-medium">Sacrifice, Bridge, Mold, Peak, Purify, and Heart</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: OFFSETS & MIRROR */}
                        {activeTab === 'math' && (
                            <div className="space-y-4 animate-fade-in text-gray-300">
                                <div className="border-b border-gray-800 pb-2">
                                    <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                                        <Binary className="w-4 h-4 text-cyan-400" />
                                        MODULAR SYSTEM EQUATION
                                    </h3>
                                    <p className="text-[11px] text-gray-400 mt-1 font-mono">
                                        S(n) = (Start + Offset) mod 114
                                    </p>
                                </div>

                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                    Pick any starting surah index. Add the structural offset of the destination node to yield the next step in the sequence. These offsets are mathematically invariant.
                                </p>

                                <div className="overflow-hidden border border-gray-800 rounded-lg">
                                    <table className="w-full text-left font-mono text-[10px]">
                                        <thead>
                                            <tr className="bg-gray-950 text-gray-400 border-b border-gray-800">
                                                <th className="px-2.5 py-1.5 text-center">Pos</th>
                                                <th className="px-2.5 py-1.5 text-center text-cyan-400">Offset</th>
                                                <th className="px-3 py-1.5">Operational Meaning</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800 text-gray-300">
                                            {[
                                                { pos: '9', offset: '0', action: 'Origin Impulse — Start here' },
                                                { pos: '3', offset: '38', action: 'The Grip activates' },
                                                { pos: '1', offset: '13', action: 'Sacrifice begins' },
                                                { pos: '2', offset: '25', action: 'Commitment locks' },
                                                { pos: '4', offset: '51', action: 'The Mold receives' },
                                                { pos: '8', offset: '101', action: 'Maximum pressure peak' },
                                                { pos: '7', offset: '89', action: 'Purification filter' },
                                                { pos: '5', offset: '63', action: 'The Heart finds 19:12 center' },
                                                { pos: '6', offset: '76', action: 'Balance stabilizes' },
                                            ].map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                                                    <td className="px-2.5 py-1.5 text-center font-bold text-fuchsia-400">{row.pos}</td>
                                                    <td className="px-2.5 py-1.5 text-center font-bold text-cyan-400">{row.offset}</td>
                                                    <td className="px-3 py-1.5 text-[10.5px] font-sans">{row.action}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="pt-2 border-t border-gray-800">
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
                                        <Layers className="w-3.5 h-3.5 text-cyan-500" />
                                        Symmetric Mirror Partners
                                    </h4>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                                        {[
                                            { pair: '13 ↔ 101', sum: '114' },
                                            { pair: '25 ↔ 89', sum: '114' },
                                            { pair: '38 ↔ 76', sum: '114' },
                                            { pair: '51 ↔ 63', sum: '114' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="bg-gray-950/40 p-2 rounded border border-gray-800/80 hover:border-cyan-500/20 transition-all">
                                                <span className="text-cyan-400 font-bold">{item.pair}</span>
                                                <span className="text-[9px] text-gray-500 block">Sum: {item.sum}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-500 italic mt-2 leading-tight">
                                        Every reciprocal pair sums perfectly to 114, mirroring symmetrically across coordinate <strong className="text-cyan-400 font-medium">57 (Al-Hadid, Iron)</strong>.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: FLOW DIRECTION */}
                        {activeTab === 'flow' && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="border-b border-gray-800 pb-2">
                                    <h3 className="text-sm font-bold text-amber-500 flex items-center gap-1.5">
                                        <RefreshCw className="w-4 h-4 text-amber-500" />
                                        PHASE DIRECTIONS — COGNITIVE ROTATIONS
                                    </h3>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        One identical map navigated in two opposing directions.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className={`p-3 rounded-xl border transition-all ${isMakki ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-gray-800 bg-gray-950/20'}`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">MAKKI — The Descent (KUN)</span>
                                            <span className="text-[10px] text-gray-500 font-mono">Clockwise</span>
                                        </div>
                                        <p className="text-[11px] text-gray-300 mt-1.5 leading-relaxed">
                                            The Reader is being actively shaped under dynamic constraint. Pressure increases as the Hexagon flows clockwise.
                                        </p>
                                        <div className="flex gap-1 items-center mt-2.5 overflow-x-auto py-1 font-mono text-[9.5px]">
                                            {[9, 1, 2, 4, 8, 7, 5, 6, 3, 9].map((n, i) => (
                                                <React.Fragment key={i}>
                                                    <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border ${n === 9 ? 'bg-fuchsia-950 text-fuchsia-400 border-fuchsia-500' : 'bg-gray-950 border-gray-800 text-gray-300'}`}>{n}</span>
                                                    {i < 9 && <ArrowRight className="w-2.5 h-2.5 text-gray-600 shrink-0" />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`p-3 rounded-xl border transition-all ${!isMakki ? 'border-amber-500/30 bg-amber-950/10' : 'border-gray-800 bg-gray-950/20'}`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">MADANI — The Return (FAYA-KUN)</span>
                                            <span className="text-[10px] text-gray-500 font-mono">Counter-Clockwise</span>
                                        </div>
                                        <p className="text-[11px] text-gray-300 mt-1.5 leading-relaxed">
                                            The Reader governs with intentional alignment. Light returns and stabilizes. Hexagon flows counter-clockwise.
                                        </p>
                                        <div className="flex gap-1 items-center mt-2.5 overflow-x-auto py-1 font-mono text-[9.5px]">
                                            {[9, 3, 6, 5, 7, 8, 4, 2, 1, 9].map((n, i) => (
                                                <React.Fragment key={i}>
                                                    <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border ${n === 9 ? 'bg-fuchsia-950 text-fuchsia-400 border-fuchsia-500' : 'bg-gray-950 border-gray-800 text-gray-300'}`}>{n}</span>
                                                    {i < 9 && <ArrowRight className="w-2.5 h-2.5 text-gray-600 shrink-0" />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: THE SWITCH */}
                        {activeTab === 'switch' && (
                            <div className="space-y-4 animate-fade-in text-gray-300">
                                <div className="border-b border-gray-800 pb-2">
                                    <h3 className="text-sm font-bold text-pink-400 flex items-center gap-1.5">
                                        <Heart className="w-4 h-4 text-pink-400" />
                                        THE HEART — POSITION 5
                                    </h3>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        The shift threshold where Descent flips into Return.
                                    </p>
                                </div>

                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                    The core activation occurs at <strong className="text-pink-300 font-semibold">Position 5 (The Heart)</strong>. It is here that the system’s rotation reverses direction.
                                </p>

                                <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px]">
                                    <div className="bg-gray-950/40 border border-emerald-500/10 p-3 rounded-lg">
                                        <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider block mb-1">Makki Peak</span>
                                        <span className="text-white font-bold text-xs">Node 5 = 64</span>
                                        <span className="text-gray-400 block text-[9.5px] mt-1">Self-Discovery — Finding 19:12 within</span>
                                    </div>

                                    <div className="bg-gray-950/40 border border-amber-500/10 p-3 rounded-lg">
                                        <span className="text-amber-400 text-[9px] font-bold uppercase tracking-wider block mb-1">Madani Peak</span>
                                        <span className="text-white font-bold text-xs">Node 5 = 66</span>
                                        <span className="text-gray-400 block text-[9.5px] mt-1">Fire Bifurcates — The Queen witnesses</span>
                                    </div>
                                </div>

                                <div className="bg-pink-950/10 border border-pink-500/20 p-3 rounded-lg">
                                    <div className="flex gap-2 items-start text-pink-300 text-[11px] leading-relaxed">
                                        <GitCommit className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong>64 → 66 is the 2-unit phase shift</strong> which reverses the rotation vector. Symmetrically represented at <strong>66:11</strong> where the Wife of Pharaoh serves as the structural Switch.
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-950/60 p-3 rounded-lg border border-gray-800 text-[11px] leading-relaxed">
                                    <span className="text-gray-400 font-bold block mb-1 font-mono">12:23 / 12:33 Stabilization Directive:</span>
                                    Choose <strong className="text-amber-400">grip</strong> (taking with strength) over active <strong className="text-red-400">taking</strong> (arrogative extraction). Retain structural focus.
                                </div>
                            </div>
                        )}

                        {/* TAB 5: KEY VERSES */}
                        {activeTab === 'verses' && (
                            <div className="space-y-4 animate-fade-in text-gray-300">
                                <div className="border-b border-gray-800 pb-2">
                                    <h3 className="text-sm font-bold text-blue-400 flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-blue-400" />
                                        KEY SCRIPTURAL COORDINATES
                                    </h3>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        Structural checkpoints that define the system metrics.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { ref: '14:24', title: 'The Growth Equation', text: '"A good word is like a good tree" — the growth equation' },
                                        { ref: '24:35', title: 'The Return State', text: '"Light upon Light" — the return state' },
                                        { ref: '57:25', title: 'The Center Anchor', text: '"We sent down iron" — the center that holds' },
                                        { ref: '66:11', title: 'The Queen\'s Switch', text: '"Allah sets forth an example" — the Queen\'s switch' },
                                        { ref: '19:12', title: 'The Active Grip', text: '"Take the Book with strength" — the grip' },
                                        { ref: '38:46', title: 'Homecoming', text: '"Hearts find rest" — the return home' },
                                    ].map((verse, idx) => (
                                        <div key={idx} className="bg-gray-950/40 border border-gray-800 p-2.5 rounded-lg flex items-start gap-3 hover:border-blue-500/20 transition-all">
                                            <span className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-500/20 font-mono text-[9px] shrink-0 font-bold mt-0.5">{verse.ref}</span>
                                            <div>
                                                <h4 className="text-[11px] font-bold text-gray-200">{verse.title}</h4>
                                                <p className="text-[10.5px] text-gray-400 italic mt-0.5 font-sans">{verse.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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