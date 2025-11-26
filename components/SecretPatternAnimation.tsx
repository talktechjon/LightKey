
import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import * as d3 from 'd3';
import { KATHARA_CLOCK_POINTS, KATHARA_GRID_NODES, KATHARA_GRID_LINES, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, MAKKI_ICON_SVG, MADANI_ICON_SVG, SLICE_DATA } from '../constants.ts';
import { getSliceAtPoint, colorScale } from '../utils.ts';
import { PlaylistType, SliceData, ChapterDetails } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';
import { LoadSequenceIcon } from './Icons.tsx';

interface KatharaClockAlignmentProps {
    rotation: number;
    createPlaylist: (type: PlaylistType, chapterIds: number[]) => void;
    setCustomSequence: (value: string) => void;
    setAnimationMode: (mode: 'play' | 'step' | 'off') => void;
}

interface BaseChapterData {
    slice: SliceData;
    chapterInfo: ChapterDetails;
    isMuqattat: boolean;
    muqattatLetters: string[] | undefined;
    iconSrc: string;
}

interface AlignedChapter extends BaseChapterData {
    clockIndex: number;
    clockLabel: string;
}

interface StaticChapter extends BaseChapterData {
    staticLabel: string;
    staticEmoji: string;
    contentEmoji?: string;
    isStatic: true;
}

type DisplayChapter = AlignedChapter | StaticChapter;

const KatharaClockAlignment: React.FC<KatharaClockAlignmentProps> = ({ rotation, createPlaylist, setCustomSequence, setAnimationMode }) => {
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
    const listRef = useRef<HTMLDivElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);
    const portalRoot = typeof document !== 'undefined' ? document.getElementById('kathara-portal-root') : null;

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Logic to track the list position and update the diagram's position instantly (Sticker behavior)
    useLayoutEffect(() => {
        if (!isDesktop) return;

        const updatePosition = () => {
            const listEl = listRef.current;
            const floatingEl = floatingRef.current;
            const scrollContainer = document.getElementById('side-panel-scroll-container');

            if (listEl && floatingEl && scrollContainer) {
                const listRect = listEl.getBoundingClientRect();
                const containerRect = scrollContainer.getBoundingClientRect();

                // 1. Dynamic Positioning: 
                // Calculate X based on Side Panel's left edge (border) to avoid going too deep inside.
                // 240 is the diagram width. +12 makes it overlap the border slightly for a "sticker" effect.
                const diagramWidth = 240;
                const x = containerRect.left - diagramWidth + 12;
                const y = listRect.top;

                // 2. GPU Accelerated Movement:
                // Use transform instead of top/left for jitter-free scrolling
                floatingEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                
                // 3. Match Height:
                // Stretch diagram to match list height exactly
                floatingEl.style.height = `${listRect.height}px`;
                floatingEl.style.width = `${diagramWidth}px`;

                // 4. Masking: 
                // Check visibility relative to scroll container
                const isVisible = 
                    listRect.bottom > containerRect.top + 50 && 
                    listRect.top < containerRect.bottom - 50;

                floatingEl.style.opacity = isVisible ? '1' : '0';
            }
        };

        const scrollContainer = document.getElementById('side-panel-scroll-container');
        let rafId: number;
        
        // Use a continuous loop to ensure perfect sync with scroll compositor
        const loop = () => {
            updatePosition();
            rafId = requestAnimationFrame(loop);
        };

        if (scrollContainer) {
            rafId = requestAnimationFrame(loop);
        }
        
        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [isDesktop, rotation]);

    const alignedChapters: AlignedChapter[] = useMemo(() => {
        const labels = [
            'Action', 'Inspiration', 'Guidance', 
            'Cleanse', 'Righteous', 'Faith', 
            'Blessing', 'Servant', 'Submission', 
            'Sacrifice', 'Truth', 'Light'
        ];
        return KATHARA_CLOCK_POINTS.map((pointValue, index) => {
            const slice = getSliceAtPoint(pointValue, rotation);
            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
            return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG,
                clockIndex: index + 1,
                clockLabel: labels[index]
            };
        });
    }, [rotation]);

    const displayChapters: DisplayChapter[] = useMemo(() => {
        const chapters: DisplayChapter[] = [...alignedChapters];
        
        // Get static data for special chapters
        const getStaticChapterData = (id: number, label: string, bulletEmoji: string, contentEmoji?: string): StaticChapter | null => {
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
                staticEmoji: bulletEmoji,
                contentEmoji: contentEmoji,
                isStatic: true
            };
        };

        // 108: Decision △  Makki 108: 🔥Execution
        const static108 = getStaticChapterData(108, '🔥Execution', 'Decision △');
        // 103: Transgression🔥 Makki 103: 🐟 Reflection
        const static103 = getStaticChapterData(103, '🐟 Reflection', 'Transgression🔥');
        // 110: Respite 🐟 Madani 110:🌳Devotion
        const static110 = getStaticChapterData(110, '🌳Devotion', 'Respite 🐟');
        
        // 112 Start: ∞Makki 112: The Beginning ∞
        const static112Start = getStaticChapterData(112, 'The Beginning ∞', '∞');
        // 112 End: ∞Makki 112: Repeat ∞
        const static112End = getStaticChapterData(112, 'Repeat ∞', '∞');


        // Insert at specific positions
        if (static108) chapters.splice(3, 0, static108); // After 3rd
        if (static103) chapters.splice(7, 0, static103); // After 6th (now 7th item)
        if (static110) chapters.splice(11, 0, static110); // After 9th (now 11th item)
        
        const result: DisplayChapter[] = [];
        if (static112Start) result.push(static112Start);
        result.push(...chapters);
        if (static112End) result.push(static112End);

        return result;

    }, [alignedChapters]);

    const handleLoadKatharaSequence = () => {
        setAnimationMode('off');
        const chapterIds = displayChapters
            .map(c => c.slice.id);
        setCustomSequence(chapterIds.join(', '));
    };

    const handleWatchKatharaSequence = (type: PlaylistType) => {
        // Exclude the first item (112 Start) from the playlist
        const chapterIds = displayChapters
            .slice(1) 
            .map(c => c.slice.id);
        createPlaylist(type, chapterIds);
    };

    const nodeMap = useMemo(() => new Map(KATHARA_GRID_NODES.map(node => [node.id, node])), []);

    const getVerticalWavePath = (x1: number, y1: number, x2: number, y2: number) => {
        const dy = y2 - y1;
        const amp = 7; // Increased amplitude for better visibility
        
        // Create a multi-cycle wave (2 full S-curves)
        // M start 
        // Q cp1 mid1 (First bump right)
        // T mid2 (First bump left)
        // T mid3 (Second bump right)
        // T end (Second bump left)
        
        return `M ${x1} ${y1} 
                Q ${x1 + amp} ${y1 + dy * 0.125} ${x1} ${y1 + dy * 0.25} 
                T ${x1} ${y1 + dy * 0.5} 
                T ${x1} ${y1 + dy * 0.75} 
                T ${x1} ${y2}`;
    };

    const renderDiagram = () => (
        <div className="flex justify-center w-full h-full">
            <svg 
                viewBox="0 0 150 280" 
                // On desktop, allow stretching to match list height (sticker effect).
                // On mobile, preserve aspect ratio to prevent distortion.
                preserveAspectRatio={isDesktop ? "none" : "xMidYMid meet"} 
                width="100%" 
                height="100%" 
                aria-hidden="true"
            >
                <g strokeWidth="1.5">
                    {KATHARA_GRID_LINES.map((line, index) => {
                        const fromNode = nodeMap.get(line.from);
                        const toNode = nodeMap.get(line.to);
                        if (!fromNode || !toNode) return null;

                        // Line coloring logic based on source node groups
                        let lineStyle: React.CSSProperties = { stroke: '#4b5563', filter: 'none' };
                        const f = line.from;
                        
                        // Group 1: Action (Nodes 1-4, 13) -> Blue with white glow
                        const isG1 = [1, 2, 3, 4, 13].includes(f);
                        // Group 2: Cleanse (Nodes 5-7, 14) -> White with orange glow
                        const isG2 = [5, 6, 7, 14].includes(f);
                        // Group 3: Blessing (Nodes 8-10, 15) -> Orange with white glow
                        const isG3 = [8, 9, 10, 15].includes(f);
                        // Group 4: Sacrifice (Nodes 11-12) -> White with green glow
                        const isG4 = [11, 12].includes(f);

                        if (isG1) {
                            lineStyle = { stroke: '#60a5fa', filter: 'drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.6))' };
                        } else if (isG2) {
                            lineStyle = { stroke: '#e2e8f0', filter: 'drop-shadow(0 0 1.5px rgba(249, 115, 22, 0.8))' };
                        } else if (isG3) {
                            lineStyle = { stroke: '#fb923c', filter: 'drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.6))' };
                        } else if (isG4) {
                            lineStyle = { stroke: '#ffffff', filter: 'drop-shadow(0 0 1.5px rgba(74, 222, 128, 0.8))' };
                        }

                        // Identify specific verse lines for styling
                        const is112_1 = (line.from === 3 && line.to === 6) || (line.from === 6 && line.to === 3); // Left Lower
                        const is112_3 = (line.from === 6 && line.to === 9) || (line.from === 9 && line.to === 6); // Left Upper
                        const is112_4 = (line.from === 4 && line.to === 7) || (line.from === 7 && line.to === 4); // Right Lower
                        const is112_2 = (line.from === 7 && line.to === 10) || (line.from === 10 && line.to === 7); // Right Upper

                        let renderedLine;
                        if (is112_2) {
                            // 112:2 - Sinuous wave like river
                            renderedLine = <path key={index} d={getVerticalWavePath(fromNode.x, fromNode.y, toNode.x, toNode.y)} fill="none" style={lineStyle} />;
                        } else if (is112_3 || is112_4) {
                            // 112:3 and 112:4 - Dotted line
                            const dottedStyle = { ...lineStyle, strokeDasharray: '1 3', strokeLinecap: 'round' as const, strokeWidth: 2 };
                            renderedLine = <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} style={dottedStyle} />;
                        } else {
                            renderedLine = <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} style={lineStyle} />;
                        }

                        // Render Labels
                        let label = null;
                        if (is112_1 || is112_2 || is112_3 || is112_4) {
                            const midX = (fromNode.x + toNode.x) / 2;
                            const midY = (fromNode.y + toNode.y) / 2;
                            const text = is112_1 ? "112:1" : is112_2 ? "112:2" : is112_3 ? "112:3" : "112:4";
                            
                            // Offset for text placement next to the line
                            const offsetX = (is112_1 || is112_3) ? -12 : 12;
                            
                            // Calculate text position
                            const textX = midX + offsetX;
                            const textY = midY;

                            label = (
                                <text 
                                    key={`label-${index}`}
                                    x={textX} 
                                    y={textY} 
                                    transform={`rotate(-90, ${textX}, ${textY})`}
                                    textAnchor="middle" 
                                    dominantBaseline="middle"
                                    fontSize="8"
                                    fontWeight="bold"
                                    fill="#f0abfc"
                                    style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
                                >
                                    {text}
                                </text>
                            );
                        }

                        return (
                            <React.Fragment key={index}>
                                {renderedLine}
                                {label}
                            </React.Fragment>
                        );
                    })}
                </g>
                {KATHARA_GRID_NODES.map((node, index) => {
                    let label = '';
                    let staticContent = '';
                    let isStaticNode = false;
                    let fillColor = node.color;
                    let subLabel = '';

                    if (node.id > 12) {
                        isStaticNode = true;
                        if (node.shape === 'volcano') staticContent = '△ 108 🔥';
                        if (node.shape === 'fish') staticContent = '🔥 103 🐟';
                        if (node.shape === 'palm') staticContent = '🐟 110 🌳';
                    } else {
                        const chapterData = alignedChapters[index];
                        if (chapterData) {
                            label = chapterData.slice.id.toString();
                            fillColor = colorScale(chapterData.slice.id);
                            subLabel = chapterData.clockLabel;
                        }
                    }
                    
                    const textColor = d3.lab(fillColor).l < 60 ? 'white' : 'black';

                    return (
                        <g key={node.id}>
                            {isStaticNode ? (
                                <text 
                                    x={node.x} 
                                    y={node.y} 
                                    textAnchor="middle" 
                                    dominantBaseline="middle"
                                    fontSize="9"
                                    fontWeight="bold"
                                    fill="white"
                                    style={{ textShadow: '0 0 3px black', letterSpacing: '-0.5px' }}
                                >
                                    {staticContent}
                                </text>
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
                                    {subLabel && (
                                        <text
                                            x={node.x}
                                            y={node.y + 13}
                                            textAnchor="middle"
                                            fontSize="4.5"
                                            fill="#94a3b8"
                                            fontWeight="normal"
                                            style={{ textShadow: '0 0 2px black' }}
                                        >
                                            {subLabel}
                                        </text>
                                    )}
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">Tree of Life</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleLoadKatharaSequence}
                        className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0"
                        aria-label="Load Tree of Life sequence into custom sequence"
                        title="Load Tree of Life sequence into custom sequence"
                    >
                        <LoadSequenceIcon />
                    </button>
                    <PlaylistButtons onWatch={handleWatchKatharaSequence} />
                </div>
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2"></div>

            {/* Diagram Rendering Logic */}
            {!isDesktop ? (
                <div className="my-4 h-[420px]">
                    {renderDiagram()}
                </div>
            ) : (
                portalRoot && createPortal(
                    <div 
                        ref={floatingRef}
                        style={{ 
                            position: 'fixed', 
                            top: 0,
                            left: 0,
                            zIndex: 5, 
                            pointerEvents: 'none',
                            opacity: 0,
                            willChange: 'transform, height', // Optimization for browser compositor
                        }}
                    >
                        {renderDiagram()}
                    </div>,
                    portalRoot
                )
            )}

            {/* List always renders in normal flow, ref is attached to this container */}
            <div ref={listRef} className="text-sm text-gray-400 mt-3 space-y-1">
                {displayChapters.map((chapterData, index) => {
                    const chapterColor = colorScale(chapterData.slice.id);
                    const isStatic = 'isStatic' in chapterData;
                    
                    let labelStyle = {};
                    let labelClass = "font-mono text-[10px] whitespace-nowrap overflow-hidden text-ellipsis tracking-tight";

                    if (isStatic) {
                        labelClass += " text-right pr-1 text-gray-500 tracking-tighter";
                    } else {
                        const idx = (chapterData as AlignedChapter).clockIndex;
                        if (idx >= 1 && idx <= 3) {
                            // 1-3: Blue text with whitish glow
                            labelStyle = { color: '#60a5fa', textShadow: '0 0 5px rgba(255, 255, 255, 0.6)' };
                        } else if (idx >= 4 && idx <= 6) {
                            // 4-6: White-ish text with Fire-Orange glow
                            labelStyle = { color: '#e2e8f0', textShadow: '0 0 5px rgba(249, 115, 22, 0.7)' };
                        } else if (idx >= 7 && idx <= 9) {
                            // 7-9: Orange text with white-ish glow
                            labelStyle = { color: '#fb923c', textShadow: '0 0 5px rgba(255, 255, 255, 0.6)' };
                        } else if (idx >= 10 && idx <= 12) {
                            // 10-12: White text with greenish glow
                            labelStyle = { color: '#ffffff', textShadow: '0 0 5px rgba(74, 222, 128, 0.8)' };
                        }
                    }

                    return (
                        <div 
                            key={index} 
                            className={`
                                grid grid-cols-[7rem_1fr] gap-x-1 items-center rounded px-2 py-1.5 transition-colors
                                ${isStatic ? 'bg-gray-800/50 border border-gray-700/50' : 'hover:bg-white/5 border border-transparent'}
                            `}
                        >
                            {/* Column 1: Label (Action/Clock Index) */}
                            <span 
                                className={labelClass}
                                style={labelStyle}
                            >
                                {isStatic 
                                    ? (chapterData as StaticChapter).staticEmoji 
                                    : `${(chapterData as AlignedChapter).clockIndex} ${(chapterData as AlignedChapter).clockLabel}:`
                                }
                            </span>

                            {/* Column 2: Content (Icon + Text + Muqattat) */}
                            <div className="flex items-center min-w-0">
                                <div className="w-5 flex-shrink-0 flex justify-center mr-1">
                                    <img 
                                        src={chapterData.iconSrc} 
                                        alt={chapterData.chapterInfo.revelationType} 
                                        className="w-3.5 h-3.5" 
                                    />
                                </div>
                                
                                <div className="flex items-baseline min-w-0 flex-1 gap-x-2">
                                    <span 
                                        className="truncate flex-1 flex items-center gap-1" 
                                        title={`${chapterData.slice.id}: ${chapterData.chapterInfo.englishName}`} 
                                        style={{ color: chapterColor }}
                                    >
                                        <span className={`font-semibold flex-shrink-0 ${chapterData.isMuqattat ? 'muqattat-glow' : ''}`}>
                                            {(isStatic && (chapterData as StaticChapter).contentEmoji) ? (chapterData as StaticChapter).contentEmoji : ''}
                                            {chapterData.slice.id}:
                                        </span>
                                        <span className="truncate">
                                            {isStatic ? (chapterData as StaticChapter).staticLabel : chapterData.chapterInfo.englishName}
                                        </span>
                                    </span>
                                    
                                    {chapterData.muqattatLetters && (
                                        <span className="font-mono text-xs muqattat-glow flex-shrink-0 opacity-80" dir="rtl">
                                            {chapterData.muqattatLetters.join(' ')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KatharaClockAlignment;
