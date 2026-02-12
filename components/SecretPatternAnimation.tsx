
import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import * as d3 from 'd3';
import { KATHARA_CLOCK_POINTS, KATHARA_GRID_NODES, KATHARA_GRID_LINES, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, SLICE_DATA, ZAKKUM_CONFIG, DATE_PALM_CONFIG } from '../constants.ts';
import { getSliceAtPoint, colorScale, getChapterIcon } from '../utils.ts';
import { PlaylistType, SliceData, ChapterDetails } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';
import { LoadSequenceIcon } from './Icons.tsx';

interface AlignmentProps {
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
    subLabel?: string;
    nodeColor?: string;
}

interface StaticChapter extends BaseChapterData {
    staticLabel: string;
    staticEmoji: string;
    staticRightText?: string;
    contentEmoji?: string;
    isStatic: true;
}

type DisplayChapter = AlignedChapter | StaticChapter;

// Shared hook for responsive portal positioning logic
const useDiagramPortal = (listRef: React.RefObject<HTMLDivElement>) => {
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
    const floatingRef = useRef<HTMLDivElement>(null);
    const portalRoot = typeof document !== 'undefined' ? document.getElementById('kathara-portal-root') : null;

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        if (!isDesktop) return;
        
        let rafId: number;
        const updatePosition = () => {
            const listEl = listRef.current;
            const floatingEl = floatingRef.current;
            const scrollContainer = document.getElementById('side-panel-scroll-container');

            if (listEl && floatingEl && scrollContainer) {
                const listRect = listEl.getBoundingClientRect();
                const containerRect = scrollContainer.getBoundingClientRect();
                const diagramWidth = 240;
                const x = containerRect.left - diagramWidth + 12;
                const y = listRect.top;

                floatingEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                floatingEl.style.height = `${listRect.height}px`;
                floatingEl.style.width = `${diagramWidth}px`;
                
                const isVisible = listRect.bottom > containerRect.top + 50 && listRect.top < containerRect.bottom - 50;
                floatingEl.style.opacity = isVisible ? '1' : '0';
            }
        };

        const loop = () => {
            updatePosition();
            rafId = requestAnimationFrame(loop);
        };
        
        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [isDesktop]);

    return { isDesktop, floatingRef, portalRoot };
};

export const KatharaClockAlignment: React.FC<AlignmentProps> = ({ rotation, createPlaylist, setCustomSequence, setAnimationMode }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const { isDesktop, floatingRef, portalRoot } = useDiagramPortal(listRef);

    const alignedChapters: AlignedChapter[] = useMemo(() => {
        const labels = [
            'Awakening', 'Assertion', 'Disruption', 
            'Constriction', 'Refinement', 'Submission', 
            'Restoration', 'Servanthood', 'Sacrifice', 
            'Witness', 'Ascension', 'Radiance'
        ];
        return KATHARA_CLOCK_POINTS.map((pointValue, index) => {
            const slice = getSliceAtPoint(pointValue, rotation);
            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
            if (!chapterInfo) {
                // Fallback to prevent crash if index is somehow wrong
                return null;
            }
            return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: getChapterIcon(chapterInfo.revelationType),
                clockIndex: index + 1,
                clockLabel: labels[index]
            };
        }).filter((c): c is AlignedChapter => c !== null);
    }, [rotation]);

    const displayChapters: DisplayChapter[] = useMemo(() => {
        const chapters: DisplayChapter[] = [...alignedChapters];
        
        const getStaticChapterData = (id: number, label: string, bulletEmoji: string, contentEmoji?: string): StaticChapter | null => {
            const slice = SLICE_DATA.find(s => s.id === id);
            const chapterInfo = CHAPTER_DETAILS.find(c => c.number === id);
            if (!slice || !chapterInfo) return null;
             return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: getChapterIcon(chapterInfo.revelationType),
                staticLabel: label,
                staticEmoji: bulletEmoji,
                contentEmoji: contentEmoji,
                isStatic: true
            };
        };

        const static108 = getStaticChapterData(108, '⚡Promise', 'Nomination △');
        const static103 = getStaticChapterData(103, '🐟 Protection', 'Uproot 🔥');
        const static110 = getStaticChapterData(110, '🌳Return', 'Witness ⚫');
        const static112Start = getStaticChapterData(112, 'The Beginning ∞', '∞');
        const static112End = getStaticChapterData(112, 'Repeat ∞', '∞');

        if (static108) chapters.splice(3, 0, static108);
        if (static103) chapters.splice(7, 0, static103);
        if (static110) chapters.splice(11, 0, static110);
        
        const result: DisplayChapter[] = [];
        if (static112Start) result.push(static112Start);
        result.push(...chapters);
        if (static112End) result.push(static112End);

        return result;

    }, [alignedChapters]);

    const handleLoadKatharaSequence = () => {
        setAnimationMode('off');
        const chapterIds = displayChapters.map(c => c.slice.id);
        setCustomSequence(chapterIds.join(', '));
    };

    const handleWatchKatharaSequence = (type: PlaylistType) => {
        const chapterIds = displayChapters.slice(1).map(c => c.slice.id);
        createPlaylist(type, chapterIds);
    };

    const nodeMap = useMemo(() => new Map(KATHARA_GRID_NODES.map(node => [node.id, node])), []);

    const getVerticalWavePath = (x1: number, y1: number, x2: number, y2: number) => {
        const dy = y2 - y1;
        const amp = 7;
        return `M ${x1} ${y1} Q ${x1 + amp} ${y1 + dy * 0.125} ${x1} ${y1 + dy * 0.25} T ${x1} ${y1 + dy * 0.5} T ${x1} ${y1 + dy * 0.75} T ${x1} ${y2}`;
    };

    const renderDiagram = () => (
        <div className="flex justify-center w-full h-full">
            <svg viewBox="0 0 150 280" preserveAspectRatio={isDesktop ? "none" : "xMidYMid meet"} width="100%" height="100%" aria-hidden="true">
                <g strokeWidth="1.5">
                    {KATHARA_GRID_LINES.map((line, index) => {
                        const fromNode = nodeMap.get(line.from);
                        const toNode = nodeMap.get(line.to);
                        if (!fromNode || !toNode) return null;

                        let lineStyle: React.CSSProperties = { stroke: '#4b5563', filter: 'none' };
                        const f = line.from;
                        
                        const isG1 = [1, 2, 3, 4, 13].includes(f);
                        const isG2 = [5, 6, 7, 14].includes(f);
                        const isG3 = [8, 9, 10, 15].includes(f);
                        const isG4 = [11, 12].includes(f);

                        if (isG1) lineStyle = { stroke: '#60a5fa', filter: 'drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.6))' };
                        else if (isG2) lineStyle = { stroke: '#e2e8f0', filter: 'drop-shadow(0 0 1.5px rgba(249, 115, 22, 0.8))' };
                        else if (isG3) lineStyle = { stroke: '#fb923c', filter: 'drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.6))' };
                        else if (isG4) lineStyle = { stroke: '#ffffff', filter: 'drop-shadow(0 0 1.5px rgba(74, 222, 128, 0.8))' };

                        const is112_1 = (line.from === 3 && line.to === 6) || (line.from === 6 && line.to === 3);
                        const is112_3 = (line.from === 6 && line.to === 9) || (line.from === 9 && line.to === 6);
                        const is112_4 = (line.from === 4 && line.to === 7) || (line.from === 7 && line.to === 4);
                        const is112_2 = (line.from === 7 && line.to === 10) || (line.from === 10 && line.to === 7);

                        let renderedLine;
                        if (is112_2) {
                            renderedLine = <path key={index} d={getVerticalWavePath(fromNode.x, fromNode.y, toNode.x, toNode.y)} fill="none" style={lineStyle} />;
                        } else if (is112_3 || is112_4) {
                            const dottedStyle = { ...lineStyle, strokeDasharray: '1 3', strokeLinecap: 'round' as const, strokeWidth: 2 };
                            renderedLine = <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} style={dottedStyle} />;
                        } else {
                            renderedLine = <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} style={lineStyle} />;
                        }

                        let label = null;
                        if (is112_1 || is112_2 || is112_3 || is112_4) {
                            const midX = (fromNode.x + toNode.x) / 2;
                            const midY = (fromNode.y + toNode.y) / 2;
                            const text = is112_1 ? "112:1" : is112_2 ? "112:2" : is112_3 ? "112:3" : "112:4";
                            const offsetX = (is112_1 || is112_3) ? -12 : 12;
                            const textX = midX + offsetX;
                            const textY = midY;

                            label = <text key={`label-${index}`} x={textX} y={textY} transform={`rotate(-90, ${textX}, ${textY})`} textAnchor="middle" dominantBaseline="middle" fontSize="7" fontWeight="bold" fill="#f0abfc" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>{text}</text>;
                        }

                        return <React.Fragment key={index}>{renderedLine}{label}</React.Fragment>;
                    })}
                </g>
                {KATHARA_GRID_NODES.map((node, index) => {
                    let label = '', staticContent = '', isStaticNode = false, fillColor = node.color, subLabel = '';
                    if (node.id > 12) {
                        isStaticNode = true;
                        if (node.shape === 'volcano') staticContent = '△108⚡';
                        if (node.shape === 'fish') staticContent = '🔥103🐟';
                        if (node.shape === 'palm') staticContent = '⚫110🌳';
                    } else {
                        const chapterData = alignedChapters.find(c => c.clockIndex === node.id);
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
                                <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="bold" fill="white" style={{ textShadow: '0 0 3px black', letterSpacing: '-0.5px' }}>{staticContent}</text>
                            ) : (
                                <g>
                                    <circle cx={node.x} cy={node.y} r={node.r} fill={fillColor} stroke="#1f2937" strokeWidth="0.5" />
                                    <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fontSize="8" fontWeight="bold" fill={textColor}>{label}</text>
                                    {subLabel && <text x={node.x} y={node.y + 13} textAnchor="middle" fontSize="4" fill="#94a3b8" fontWeight="normal" style={{ textShadow: '0 0 2px black' }}>{subLabel}</text>}
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
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">🌳</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={handleLoadKatharaSequence} className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0" title="Load Tree of Life sequence into custom sequence">
                        <LoadSequenceIcon />
                    </button>
                    <PlaylistButtons onWatch={handleWatchKatharaSequence} />
                </div>
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2"></div>

            {!isDesktop ? (
                <div className="my-4 h-[420px]">{renderDiagram()}</div>
            ) : (
                portalRoot && createPortal(
                    <div ref={floatingRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 5, pointerEvents: 'none', opacity: 0, willChange: 'transform, height' }}>
                        {renderDiagram()}
                    </div>,
                    portalRoot
                )
            )}

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
                        if (idx >= 1 && idx <= 3) labelStyle = { color: '#60a5fa', textShadow: '0 0 5px rgba(255, 255, 255, 0.6)' };
                        else if (idx >= 4 && idx <= 6) labelStyle = { color: '#e2e8f0', textShadow: '0 0 5px rgba(249, 115, 22, 0.7)' };
                        else if (idx >= 7 && idx <= 9) labelStyle = { color: '#fb923c', textShadow: '0 0 5px rgba(255, 255, 255, 0.6)' };
                        else if (idx >= 10 && idx <= 12) labelStyle = { color: '#ffffff', textShadow: '0 0 5px rgba(74, 222, 128, 0.8)' };
                    }

                    return (
                        <div key={index} className={`grid grid-cols-[7rem_1fr] gap-x-1 items-center rounded px-2 py-1.5 transition-colors ${isStatic ? 'bg-gray-800/50 border border-gray-700/50' : 'hover:bg-white/5 border border-transparent'}`}>
                            <span className={labelClass} style={labelStyle}>
                                {isStatic ? (chapterData as StaticChapter).staticEmoji : `${(chapterData as AlignedChapter).clockIndex} ${(chapterData as AlignedChapter).clockLabel}:`}
                            </span>
                            <div className="flex items-center min-w-0">
                                <div className="w-5 flex-shrink-0 flex justify-center mr-1">
                                    <img src={chapterData.iconSrc} alt={chapterData.chapterInfo.revelationType} className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex items-baseline min-w-0 flex-1 gap-x-2">
                                    <span className="truncate flex-1 flex items-center gap-1" title={`${chapterData.slice.id}: ${chapterData.chapterInfo.englishName}`} style={{ color: chapterColor }}>
                                        <span className={`font-semibold flex-shrink-0 ${chapterData.isMuqattat ? 'muqattat-glow' : ''}`}>
                                            {(isStatic && (chapterData as StaticChapter).contentEmoji) ? (chapterData as StaticChapter).contentEmoji : ''}{chapterData.slice.id}:
                                        </span>
                                        <span className="truncate">{isStatic ? (chapterData as StaticChapter).staticLabel : chapterData.chapterInfo.englishName}</span>
                                    </span>
                                    {chapterData.muqattatLetters && <span className="font-mono text-xs muqattat-glow flex-shrink-0 opacity-80" dir="rtl">{chapterData.muqattatLetters.join(' ')}</span>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const SephirotAlignment: React.FC<AlignmentProps> = ({ rotation, createPlaylist, setCustomSequence, setAnimationMode }) => {
    const [activeTab, setActiveTab] = useState<'zakkum' | 'datePalm'>('datePalm');
    const listRef = useRef<HTMLDivElement>(null);
    const { isDesktop, floatingRef, portalRoot } = useDiagramPortal(listRef);

    const currentConfig = activeTab === 'zakkum' ? ZAKKUM_CONFIG : DATE_PALM_CONFIG;

    const generatedChaptersMap = useMemo(() => {
        const standardNodes = currentConfig.nodes.filter(n => !n.isZero).sort((a,b) => a.id - b.id);
        const zeroNode = currentConfig.nodes.find(n => n.isZero);
        const map = new Map<number, AlignedChapter | StaticChapter>();

        standardNodes.forEach((node, index) => {
            const pointValue = currentConfig.points[index];
            const slice = getSliceAtPoint(pointValue, rotation);
            const chapterInfo = CHAPTER_DETAILS.find(c => c.number === slice.id);
            if (!chapterInfo) return;
            map.set(node.id, {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: getChapterIcon(chapterInfo.revelationType),
                clockIndex: node.id,
                clockLabel: node.label,
                nodeColor: node.color
            });
        });

        if (zeroNode && currentConfig.point0) {
            const slice = getSliceAtPoint(currentConfig.point0, rotation);
            const chapterInfo = CHAPTER_DETAILS.find(c => c.number === slice.id);
            if (chapterInfo) {
              map.set(0, {
                  slice,
                  chapterInfo,
                  isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                  muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                  iconSrc: getChapterIcon(chapterInfo.revelationType),
                  clockIndex: 0,
                  clockLabel: zeroNode.label,
                  nodeColor: zeroNode.color
              });
            }
        }
        return map;
    }, [rotation, currentConfig, activeTab]);

    const displayChapters: (AlignedChapter | StaticChapter)[] = useMemo(() => {
        const chapters: (AlignedChapter | StaticChapter)[] = [];
        const getStaticChapterData = (id: number, leftLabel: string, rightText: string, emoji: string): StaticChapter | null => {
            const slice = SLICE_DATA.find(s => s.id === id);
            const chapterInfo = CHAPTER_DETAILS.find(c => c.number === id);
            if (!slice || !chapterInfo) return null;
             return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: getChapterIcon(chapterInfo.revelationType),
                staticLabel: leftLabel,
                staticRightText: rightText,
                staticEmoji: emoji,
                isStatic: true
            };
        };

        if (activeTab === 'zakkum') {
            const static110 = getStaticChapterData(110, 'Beginning', 'Truth Always Wins (110)', '');
            const static103 = getStaticChapterData(103, 'Trial', 'Reflection (103)', '');
            const static108 = getStaticChapterData(108, 'Restoration', 'Bounty (108)', '');
            if (static110) chapters.push(static110);
            [6, 1, 9, 8, 7].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static103) chapters.push(static103);
            [0, 2, 3, 4, 5].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static108) chapters.push(static108);
        } else {
            const static108 = getStaticChapterData(108, 'Blessing', 'Bounty (108)', '');
            const static103 = getStaticChapterData(103, 'Patience', 'Time (103)', '');
            const static112 = getStaticChapterData(112, 'Emergence', 'The Absolute Truth (112)', '');
            if (static108) chapters.push(static108);
            [1, 2, 3, 4, 5].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static103) chapters.push(static103);
            [6, 7, 8, 9, 10].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static112) chapters.push(static112);
        }
        return chapters;
    }, [generatedChaptersMap, activeTab]);

    const handleLoadSequence = () => {
        setAnimationMode('off');
        const chapterIds = displayChapters.map(c => c.slice.id).filter(id => id > 0);
        setCustomSequence(chapterIds.join(', '));
    };

    const handleWatchSequence = (type: PlaylistType) => {
        const chapterIds = displayChapters.map(c => c.slice.id).filter(id => id > 0);
        createPlaylist(type, chapterIds);
    };

    const nodeMap = useMemo(() => new Map(currentConfig.nodes.map(node => [node.id, node] as [number, typeof node])), [currentConfig]);

    const renderDiagram = () => (
        <div className="flex justify-center w-full h-full">
            <svg viewBox="0 0 200 320" preserveAspectRatio={isDesktop ? "none" : "xMidYMid meet"} width="100%" height="100%" aria-hidden="true">
                <g strokeWidth="1.5">
                    {currentConfig.lines.map((line, index) => {
                        const fromNode = nodeMap.get(line.from);
                        const toNode = nodeMap.get(line.to);
                        if (!fromNode || !toNode) return null;
                        return <line key={index} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke="#4b5563" style={{ stroke: activeTab === 'datePalm' ? '#60a5fa' : '#ef4444', opacity: 0.5 }} />;
                    })}
                </g>
                {currentConfig.nodes.map((node, index) => {
                    let label = '', fillColor = node.color;
                    const chapterData = generatedChaptersMap.get(node.id);
                    if (chapterData && !('isStatic' in chapterData)) label = (chapterData as AlignedChapter).slice.id.toString();
                    else if (node.isZero && activeTab === 'datePalm') label = '∞';
                    const textColor = d3.lab(fillColor).l < 60 ? 'white' : 'black';
                    return (
                        <g key={node.id}>
                            <circle cx={node.x} cy={node.y} r={10} fill={fillColor} stroke="#1f2937" strokeWidth="1" />
                            <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fontSize="8" fontWeight="bold" fill={textColor}>{label}</text>
                            <text x={node.x} y={node.y - 14} textAnchor="middle" fontSize="7" fontWeight="bold" fill={fillColor} style={{ textShadow: '0 0 3px black' }}>{node.label}</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );

    return (
        <div className="pt-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">Sephirot Alignment</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={handleLoadSequence} className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0" title="Load current sequence into custom sequence">
                        <LoadSequenceIcon />
                    </button>
                    <PlaylistButtons onWatch={handleWatchSequence} />
                </div>
            </div>
            <div className="flex space-x-1 mt-3 mb-2 bg-gray-900/50 p-1 rounded-lg">
                <button onClick={() => setActiveTab('zakkum')} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'zakkum' ? 'bg-red-900/50 text-red-200 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>Zakkum (Left)</button>
                <button onClick={() => setActiveTab('datePalm')} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'datePalm' ? 'bg-emerald-900/50 text-emerald-200 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>Date-Palm (Right)</button>
            </div>
            <div className="w-full h-px bg-gray-500/50 mb-2"></div>

            {!isDesktop ? (
                <div className="my-4 h-[420px]">{renderDiagram()}</div>
            ) : (
                portalRoot && createPortal(
                    <div ref={floatingRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 5, pointerEvents: 'none', opacity: 0, willChange: 'transform, height' }}>
                        {renderDiagram()}
                    </div>,
                    portalRoot
                )
            )}

            <div ref={listRef} className="text-sm text-gray-400 mt-3 space-y-1">
                {displayChapters.map((chapterData, index) => {
                    if ('isStatic' in chapterData) {
                        const staticC = chapterData as StaticChapter;
                        const chapterColor = colorScale(staticC.slice.id);
                        return (
                        <div key={index} className="grid grid-cols-[5.5rem_1fr] gap-x-2 items-center bg-gray-800/50 rounded px-2 py-1.5 transition-colors border border-gray-700/50 mt-2">
                            <div className="flex flex-col items-end pr-2 border-r border-gray-700/50">
                                <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-tighter shadow-cyan-500/20 drop-shadow-sm truncate whitespace-nowrap">{staticC.staticEmoji ? `${staticC.staticEmoji}. ` : ''}{staticC.staticLabel}</span>
                            </div>
                            <div className="flex items-center min-w-0 pl-1">
                                {staticC.staticRightText ? (
                                    <span className="truncate font-semibold text-sm" style={{ color: chapterColor }}>{staticC.staticRightText}</span>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <img src={staticC.iconSrc} alt={staticC.chapterInfo.revelationType} className="w-3 h-3" />
                                        <span className="truncate font-semibold text-sm" style={{ color: chapterColor }}>{staticC.slice.id}: {staticC.chapterInfo.englishName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        )
                    }
                    const cData = chapterData as AlignedChapter;
                    const chapterColor = colorScale(cData.slice.id);
                    return (
                        <div key={index} className="grid grid-cols-[5.5rem_1fr] gap-x-2 items-center hover:bg-white/5 rounded px-2 py-2 transition-colors border border-transparent">
                            <div className="flex flex-col items-end pr-2 border-r border-gray-700/50">
                                <span className="font-mono text-sm font-bold tracking-tight whitespace-nowrap" style={{ color: cData.nodeColor }}>{cData.clockIndex}. {cData.clockLabel}</span>
                            </div>
                            <div className="flex items-center min-w-0 pl-1">
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-baseline min-w-0 gap-x-1.5">
                                        <img src={cData.iconSrc} alt={cData.chapterInfo.revelationType} className="w-3 h-3 flex-shrink-0 self-center" />
                                        <span className="truncate text-sm font-medium" title={`${cData.slice.id}: ${cData.chapterInfo.englishName}`} style={{ color: chapterColor }}>
                                            <span className={`font-bold mr-1 ${cData.isMuqattat ? 'muqattat-glow' : ''}`}>{cData.slice.id}:</span>{cData.chapterInfo.englishName}
                                        </span>
                                        {cData.muqattatLetters && <span className="font-mono text-[10px] muqattat-glow flex-shrink-0 opacity-80" dir="rtl">{cData.muqattatLetters.join(' ')}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SephirotAlignment;
