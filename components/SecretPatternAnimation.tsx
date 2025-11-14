import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { KATHARA_CLOCK_POINTS, KATHARA_GRID_NODES, KATHARA_GRID_LINES, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, MAKKI_ICON_SVG, MADANI_ICON_SVG } from '../constants.ts';
import { getSliceAtPoint, colorScale } from '../utils.ts';
import { PlaylistType } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';

interface KatharaClockAlignmentProps {
    rotation: number;
    createPlaylist: (type: PlaylistType, chapterIds: number[]) => void;
}

const KatharaClockAlignment: React.FC<KatharaClockAlignmentProps> = ({ rotation, createPlaylist }) => {
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

    const handleWatchKatharaSequence = (type: PlaylistType) => {
        const chapterIds = alignedChapters.map(c => c.slice.id);
        createPlaylist(type, chapterIds);
    };

    const nodeMap = useMemo(() => new Map(KATHARA_GRID_NODES.map(node => [node.id, node])), []);

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">KATHARA CLOCK</h2>
                <PlaylistButtons onWatch={handleWatchKatharaSequence} />
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2"></div>

            <div className="flex justify-center my-4">
                <svg viewBox="0 0 120 180" width="180" height="270" aria-hidden="true">
                    <g stroke="#4b5563" strokeWidth="1">
                        {KATHARA_GRID_LINES.map((line, index) => {
                            const fromNode = nodeMap.get(line.from);
                            const toNode = nodeMap.get(line.to);
                            if (!fromNode || !toNode) return null;
                            return <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} />;
                        })}
                    </g>
                    {KATHARA_GRID_NODES.map((node, index) => {
                        const chapterData = alignedChapters[index];
                        const chapterId = chapterData?.slice.id;
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
                                    fontSize="8" 
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
                {alignedChapters.map((chapterData, index) => {
                    const chapterColor = colorScale(chapterData.slice.id);
                    return (
                        <div key={index} className="flex items-center gap-x-3 overflow-hidden">
                            <span className="font-mono text-xs text-gray-500 w-6 text-center flex-shrink-0">{index + 1}.</span>
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