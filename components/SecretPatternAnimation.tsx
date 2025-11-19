
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
        return KATHARA_CLOCK_POINTS.map((pointValue, index) => {
            const slice = getSliceAtPoint(pointValue, rotation);
            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
            return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG,
                clockIndex: index + 1
            };
        });
    }, [rotation]);

    const displayChapters = useMemo(() => {
        const chapters = [...alignedChapters];
        
        // Get static data for special chapters
        const getStaticChapterData = (id: number, label: string, emoji: string) => {
            const slice = SLICE_DATA.find(s => s.id === id);
            const chapterInfo = CHAPTER_DETAILS.find(c => c.number === id);
            if (!slice || !chapterInfo) return null;
             return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG,
                staticLabel: label,
                staticEmoji: emoji,
                isStatic: true
            };
        };

        const static108 = getStaticChapterData(108, 'Bounty / Respite', '🌋');
        const static103 = getStaticChapterData(103, 'Trial / Sacrifice', '🐟');
        const static110 = getStaticChapterData(110, 'Resurrect / Repent', '🌴');
        
        const static112Start = {
             ...getStaticChapterData(112, 'Beginning', '∞')!,
             staticEmoji: '∞'
        };
         const static112End = {
             ...getStaticChapterData(112, 'Repeat', '∞')!,
             staticEmoji: '∞'
        };


        // Insert at specific positions
        if (static108) chapters.splice(3, 0, static108); // After 3rd
        if (static103) chapters.splice(7, 0, static103); // After 6th (now 7th item)
        if (static110) chapters.splice(11, 0, static110); // After 9th (now 11th item)
        
        return [static112Start, ...chapters, static112End];

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
                    <g stroke="#4b5563" strokeWidth="1.5">
                        {KATHARA_GRID_LINES.map((line, index) => {
                            const fromNode = nodeMap.get(line.from);
                            const toNode = nodeMap.get(line.to);
                            if (!fromNode || !toNode) return null;
                            return <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} />;
                        })}
                    </g>
                    {KATHARA_GRID_NODES.map((node, index) => {
                        // For the first 12 nodes (indices 0-11), use aligned chapters. 
                        // For nodes 13, 14, 15, use their static definition.
                        let label = '';
                        let emoji = '';
                        let isStaticNode = false;
                        let fillColor = node.color;

                        if (node.id > 12) {
                            // Static nodes
                            isStaticNode = true;
                            label = node.staticLabel || '';
                            if (node.shape === 'volcano') emoji = '🌋';
                            if (node.shape === 'fish') emoji = '🐟';
                            if (node.shape === 'palm') emoji = '🌴';
                        } else {
                            // Dynamic nodes
                            const chapterData = alignedChapters[index]; // index matches node.id - 1 for first 12
                            if (chapterData) {
                                label = chapterData.slice.id.toString();
                                fillColor = colorScale(chapterData.slice.id);
                            }
                        }
                        
                        const textColor = d3.lab(fillColor).l < 60 ? 'white' : 'black';

                        return (
                            <g key={node.id}>
                                {isStaticNode ? (
                                    <g>
                                       <text 
                                            x={node.x} 
                                            y={node.y} 
                                            textAnchor="middle" 
                                            dominantBaseline="middle"
                                            fontSize="22"
                                        >
                                            {emoji}
                                        </text>
                                        <text
                                            x={node.x + 16}
                                            y={node.y}
                                            textAnchor="start"
                                            dominantBaseline="middle"
                                            fontSize="10"
                                            fontWeight="bold"
                                            fill="white"
                                            style={{ textShadow: '0 0 3px black' }}
                                        >
                                            {label}
                                        </text>
                                    </g>
                                ) : (
                                    <g>
                                        <circle cx={node.x} cy={node.y} r={node.r} fill={fillColor} stroke="#1f2937" strokeWidth="0.5" />
                                        <text 
                                            x={node.x} 
                                            y={node.y} 
                                            textAnchor="middle" 
                                            dy=".3em" 
                                            fontSize="10" 
                                            fontWeight="bold" 
                                            fill={textColor}>
                                            {label}
                                        </text>
                                    </g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="text-sm text-gray-400 mt-3 space-y-2">
                {displayChapters.map((chapterData, index) => {
                    if (!chapterData) return null;
                    const chapterColor = colorScale(chapterData.slice.id);
                    const isStatic = 'isStatic' in chapterData;
                    
                    return (
                        <div key={index} className={`flex items-center gap-x-3 overflow-hidden ${isStatic ? 'border border-gray-600 rounded p-1 bg-gray-900/30' : ''}`}>
                            <span className="font-mono text-xs text-gray-500 w-6 text-center flex-shrink-0">
                                {isStatic ? (chapterData as any).staticEmoji : `${(chapterData as any).clockIndex}.`}
                            </span>
                            <div className="flex items-baseline gap-x-3 min-w-0">
                                <span className="truncate flex items-center gap-1.5" title={`${chapterData.slice.id}: ${chapterData.chapterInfo.englishName}`} style={{ color: chapterColor }}>
                                    <img src={chapterData.iconSrc} alt={chapterData.chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className={`font-semibold ${chapterData.isMuqattat ? 'muqattat-glow' : ''}`}>
                                        {isStatic ? (chapterData as any).staticEmoji : ''}{chapterData.slice.id}:
                                    </span>
                                    {isStatic ? (chapterData as any).staticLabel : chapterData.chapterInfo.englishName}
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
