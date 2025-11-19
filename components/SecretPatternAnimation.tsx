
import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { KATHARA_CLOCK_POINTS, KATHARA_GRID_NODES, KATHARA_GRID_LINES, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, MAKKI_ICON_SVG, MADANI_ICON_SVG, SLICE_DATA } from '../constants.ts';
import { getSliceAtPoint, colorScale } from '../utils.ts';
import { PlaylistType } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';
import { LoadSequenceIcon } from './Icons.tsx';

interface KatharaClockAlignmentProps {
    rotation: number;
    createPlaylist: (type: PlaylistType, chapterIds: number[]) => void;
    setCustomSequence: (value: string) => void;
    setAnimationMode: (mode: 'play' | 'step' | 'off') => void;
}

const KatharaClockAlignment: React.FC<KatharaClockAlignmentProps> = ({ rotation, createPlaylist, setCustomSequence, setAnimationMode }) => {
    const alignedChapters = useMemo(() => {
        return KATHARA_CLOCK_POINTS.map(pointValue => {
            const slice = getSliceAtPoint(pointValue, rotation);
            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
            return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG
            };
        });
    }, [rotation]);

    const displayChapters = useMemo(() => {
        const createStaticRow = (id: number, emoji: string, label: string) => {
             const chapterInfo = CHAPTER_DETAILS[id - 1];
             const sliceData = SLICE_DATA.find(sd => sd.id === id) || { id: id, blockCount: 0 };
             return {
                slice: sliceData,
                chapterInfo: { ...chapterInfo, englishName: label },
                isMuqattat: MUQATTAT_CHAPTERS.has(id),
                muqattatLetters: MUQATTAT_LETTERS.get(id),
                iconSrc: chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG,
                customMarker: emoji,
                isStatic: true
            };
        };

        const static112Start = createStaticRow(112, '∞', 'Beginning');
        const static108 = createStaticRow(108, '🌋', 'Bounty / Respite');
        const static103 = createStaticRow(103, '✡', 'Trial / Sacrifice');
        const static110 = createStaticRow(110, '🌴', 'Resurrect / Repent');
        const static112End = createStaticRow(112, '∞', 'Repeat');

        const result = [];
        
        // Insert 112 Start
        result.push(static112Start);

        let clockCounter = 1;

        for (let i = 0; i < alignedChapters.length; i++) {
            result.push({ ...alignedChapters[i], clockIndex: clockCounter++ });
            
            // Insert 108 between 3 and 4 (after index 2)
            if (i === 2) result.push(static108);
            
            // Insert 103 between 6 and 7 (after index 5)
            if (i === 5) result.push(static103);
            
            // Insert 110 between 9 and 10 (after index 8)
            if (i === 8) result.push(static110);
        }
        
        // Insert 112 End
        result.push(static112End);

        return result;
    }, [alignedChapters]);

    const handleLoadKatharaSequence = () => {
        setAnimationMode('off');
        const chapterIds = alignedChapters.map(c => c.slice.id);
        setCustomSequence(chapterIds.join(', '));
    };

    const handleWatchKatharaSequence = (type: PlaylistType) => {
        const chapterIds = alignedChapters.map(c => c.slice.id);
        createPlaylist(type, chapterIds);
    };

    const nodeMap = useMemo(() => new Map(KATHARA_GRID_NODES.map(node => [node.id, node])), []);

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">KATHARA CLOCK</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleLoadKatharaSequence}
                        className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0"
                        aria-label="Load Kathara Clock sequence into custom sequence"
                        title="Load Kathara Clock sequence into custom sequence"
                    >
                        <LoadSequenceIcon />
                    </button>
                    <PlaylistButtons onWatch={handleWatchKatharaSequence} />
                </div>
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2"></div>

            <div className="flex justify-center my-4">
                <svg viewBox="0 0 150 280" width="250" height="420" aria-hidden="true">
                    <g stroke="#4b5563" strokeWidth="1">
                        {KATHARA_GRID_LINES.map((line, index) => {
                            const fromNode = nodeMap.get(line.from);
                            const toNode = nodeMap.get(line.to);
                            if (!fromNode || !toNode) return null;
                            return <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} />;
                        })}
                    </g>
                    {KATHARA_GRID_NODES.map((node, index) => {
                        // Handle static nodes (Eumbi, AzurA, Rajna)
                        if ('shape' in node && 'staticLabel' in node) {
                             const shapeNode = node as any;
                             let emoji = '';
                             if (shapeNode.shape === 'volcano') emoji = '🌋';
                             else if (shapeNode.shape === 'star') emoji = '✡';
                             else if (shapeNode.shape === 'palm') emoji = '🌴';

                             return (
                                <g key={node.id}>
                                    <text 
                                        x={node.x} 
                                        y={node.y} 
                                        textAnchor="middle" 
                                        dominantBaseline="central" 
                                        fontSize="22" 
                                        fill={node.color}
                                        style={{ filter: shapeNode.shape === 'volcano' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' : 'none' }}
                                    >
                                        {emoji}
                                    </text>
                                    <text 
                                        x={node.x + 16} 
                                        y={node.y + 1} 
                                        textAnchor="start" 
                                        dominantBaseline="central" 
                                        fontSize="10" 
                                        fontWeight="bold" 
                                        fill="white"
                                        style={{ textShadow: '0 0 2px black' }}
                                    >
                                        {shapeNode.staticLabel}
                                    </text>
                                </g>
                             );
                        }

                        const chapterData = alignedChapters[index];
                        // Safety check if we iterate more nodes than alignedChapters
                        if (!chapterData) return null;

                        const chapterId = chapterData.slice.id;
                        const chapterColor = chapterId ? colorScale(chapterId) : node.color;
                        const textColor = d3.lab(chapterColor).l < 60 ? 'white' : 'black';

                        return (
                            <g key={node.id}>
                                <circle cx={node.x} cy={node.y} r={node.r} fill={chapterColor} stroke="#1f2937" strokeWidth="0.5" />
                                <text 
                                    x={node.x} 
                                    y={node.y} 
                                    textAnchor="middle" 
                                    dy=".3em" 
                                    fontSize="10" 
                                    fontWeight="bold" 
                                    fill={textColor}>
                                    {chapterId}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="text-sm text-gray-400 mt-3 space-y-2">
                {displayChapters.map((chapterData, index) => {
                    const chapterColor = colorScale(chapterData.slice.id);
                    const isStatic = 'isStatic' in chapterData && (chapterData as any).isStatic;
                    
                    return (
                        <div 
                            key={index} 
                            className={`flex items-center gap-x-3 overflow-hidden ${isStatic ? 'border border-gray-600/60 rounded px-2 py-1 bg-gray-800/30 my-1' : ''}`}
                        >
                            <span className="font-mono text-xs text-gray-500 w-6 text-center flex-shrink-0">
                                {isStatic ? (
                                    <span className="text-base text-gray-300">{(chapterData as any).customMarker}</span>
                                ) : (
                                    `${(chapterData as any).clockIndex}.`
                                )}
                            </span>
                            <div className="flex items-baseline gap-x-3 min-w-0">
                                <span className="truncate flex items-center gap-1.5" title={`${chapterData.slice.id}: ${chapterData.chapterInfo.englishName}`} style={{ color: chapterColor }}>
                                    <img src={chapterData.iconSrc} alt={chapterData.chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className={`font-semibold ${chapterData.isMuqattat ? 'muqattat-glow' : ''}`}>{chapterData.slice.id}:</span>
                                    {chapterData.chapterInfo.englishName}
                                </span>
                                {chapterData.muqattatLetters && (
                                    <span className="font-mono text-lg muqattat-glow flex-shrink-0" dir="rtl">
                                        {chapterData.muqattatLetters.join(' ')}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KatharaClockAlignment;