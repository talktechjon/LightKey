
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

export const KatharaDiagram: React.FC<{ rotation: number; isDesktop?: boolean }> = ({ rotation, isDesktop = true }) => {
    const alignedChapters = useMemo(() => {
        const treeLabels = [
            'The Seed', 'The Rupture', 'The Search', 
            'The Cleanse', 'The Trunk', 'The Branching', 
            'The Flowering', 'The Ripening', 'The Harvest', 
            'The Pressing', 'The Extraction', 'The Oil (Light)'
        ];
        return KATHARA_CLOCK_POINTS.map((pointValue, index) => {
            const slice = getSliceAtPoint(pointValue, rotation);
            const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
            if (!chapterInfo) return null;
            return {
                slice,
                chapterInfo,
                isMuqattat: MUQATTAT_CHAPTERS.has(slice.id),
                muqattatLetters: MUQATTAT_LETTERS.get(slice.id),
                iconSrc: getChapterIcon(chapterInfo.revelationType),
                clockIndex: index + 1,
                clockLabel: treeLabels[index]
            };
        }).filter((c): c is AlignedChapter => c !== null);
    }, [rotation]);

    const nodeMap = useMemo(() => new Map(KATHARA_GRID_NODES.map(node => [node.id, node])), []);

    const getVerticalWavePath = (x1: number, y1: number, _x2: number, y2: number) => {
        const dy = y2 - y1;
        const amp = 7;
        return `M ${x1} ${y1} Q ${x1 + amp} ${y1 + dy * 0.125} ${x1} ${y1 + dy * 0.25} T ${x1} ${y1 + dy * 0.5} T ${x1} ${y1 + dy * 0.75} T ${x1} ${y2}`;
    };

    return (
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
                {KATHARA_GRID_NODES.map((node) => {
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
};

export const KatharaClockAlignment: React.FC<AlignmentProps> = ({ rotation, createPlaylist, setCustomSequence, setAnimationMode }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const { isDesktop, floatingRef, portalRoot } = useDiagramPortal(listRef);

    const alignedChapters: AlignedChapter[] = useMemo(() => {
        const treeLabels = [
            'The Seed', 'The Rupture', 'The Search', 
            'The Cleanse', 'The Trunk', 'The Branching', 
            'The Flowering', 'The Ripening', 'The Harvest', 
            'The Pressing', 'The Extraction', 'The Oil (Light)'
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
                clockLabel: treeLabels[index]
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

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">Tree of Life</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={handleLoadKatharaSequence} className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0" title="Load Tree of Life sequence into custom sequence">
                        <LoadSequenceIcon />
                    </button>
                    <PlaylistButtons onWatch={handleWatchKatharaSequence} />
                </div>
            </div>
            
            <div className="mt-4 space-y-6">
                {/* Intro Card */}
                <div className="p-5 bg-gradient-to-b from-[#090b11] to-[#040508] border border-cyan-500/20 rounded-xl space-y-4 shadow-xl">
                    <h3 className="text-sm font-black text-cyan-400 tracking-wider uppercase border-b border-cyan-500/10 pb-2">
                        Tree of Life — The 12 Growth Phases
                    </h3>
                    
                    <div className="flex flex-col gap-2.5">
                        <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <span className="text-[10px] uppercase font-black text-red-400 tracking-widest block mb-0.5">The Soil</span>
                                <span className="text-xs font-semibold text-gray-200 truncate block">Time-Fire / Nār</span>
                            </div>
                            <p className="text-[10px] text-gray-450 italic text-right font-serif flex-shrink-0">The heat that breaks the seed</p>
                        </div>
                        <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <span className="text-[10px] uppercase font-black text-emerald-400 tracking-widest block mb-0.5">The Tree</span>
                                <span className="text-xs font-semibold text-gray-200 truncate block">Knowledge In Flesh</span>
                            </div>
                            <p className="text-[10px] text-gray-450 italic text-right font-serif flex-shrink-0">The form that grows</p>
                        </div>
                        <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-lg flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <span className="text-[10px] uppercase font-black text-blue-400 tracking-widest block mb-0.5">The Light</span>
                                <span className="text-xs font-semibold text-gray-200 truncate block">Understanding Complete</span>
                            </div>
                            <p className="text-[10px] text-gray-450 italic text-right font-serif flex-shrink-0">The oil that shines</p>
                        </div>
                    </div>
                    
                    <p className="text-[11px] text-gray-400 italic">
                        The 12 phases are how these three forces move through time.
                    </p>
                </div>

                {/* The Math & Staircase */}
                <div className="p-5 bg-[#040508] border border-zinc-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <h4 className="text-xs font-black text-cyan-400 tracking-wider uppercase">The Math — The Staircase</h4>
                        <span className="text-[10px] font-mono font-bold text-zinc-500">Inhale ↔ Exhale</span>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg border border-zinc-900 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-tight whitespace-nowrap text-zinc-400">
                            <span className="text-white font-bold">1</span>
                            <span className="text-cyan-500 font-bold">+10</span>
                            <span className="text-white font-bold">11</span>
                            <span className="text-fuchsia-500 font-bold">+9</span>
                            <span className="text-white font-bold">20</span>
                            <span className="text-cyan-500 font-bold">+10</span>
                            <span className="text-white font-bold">30</span>
                            <span className="text-fuchsia-500 font-bold">+9</span>
                            <span className="text-white font-bold">39</span>
                            <span className="text-cyan-500 font-bold">+10</span>
                            <span className="text-white font-bold">49</span>
                            <span className="text-fuchsia-500 font-bold">+9</span>
                            <span className="text-white font-bold">58</span>
                            <span className="text-cyan-500 font-bold">+10</span>
                            <span className="text-white font-bold">68</span>
                            <span className="text-fuchsia-500 font-bold">+9</span>
                            <span className="text-white font-bold">77</span>
                            <span className="text-cyan-500 font-bold">+10</span>
                            <span className="text-white font-bold">87</span>
                            <span className="text-fuchsia-500 font-bold">+9</span>
                            <span className="text-white font-bold">96</span>
                            <span className="text-cyan-500 font-bold">+10</span>
                            <span className="text-white font-bold">106</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                        <div className="space-y-0.5">
                            <strong className="text-cyan-400 block font-mono">+10 = ACT</strong>
                            <p className="text-zinc-400 text-[10px]">Sacrifice, push, do (Six acts)</p>
                        </div>
                        <div className="space-y-0.5">
                            <strong className="text-fuchsia-400 block font-mono">+9 = RECEIVE</strong>
                            <p className="text-zinc-400 text-[10px]">Mold, absorb, become (Five receives)</p>
                        </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 italic mt-1">
                        The Tree grows by breathing (inhaling and exhaling force).
                    </p>
                </div>

                {/* 12 Phases List */}
                <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#00c8ff] tracking-wider uppercase pl-1 border-l-2 border-[#00c8ff] mb-2">
                        The 12 Phases in 2-3-7
                    </h4>
                    
                    <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
                        {[
                            {
                                phase: "Phase 1: The Seed",
                                idVal: "1",
                                bg: "border-zinc-850 bg-zinc-950/40",
                                dot: "bg-white/40",
                                state: "1 [Fruit]",
                                what: "Light is hidden inside. The impulse from 1 [Throne].",
                                verse: "1:1 “In the name of Allah” — the first breath."
                            },
                            {
                                phase: "Phase 2: The Rupture",
                                idVal: "11",
                                bg: "border-red-950/40 bg-red-950/5",
                                dot: "bg-red-400",
                                state: "2 [D10]",
                                what: "The Soil breaks the seed. Pain begins.",
                                math: "+10 = D10×5:3 = sacrifice IS religion.",
                                verse: "81:8 “When the infant is asked” — the breaking."
                            },
                            {
                                phase: "Phase 3↔4: First Growth",
                                idVal: "20↔30",
                                bg: "border-cyan-950/40 bg-cyan-950/5",
                                dot: "bg-cyan-400",
                                state: "3 [T3] ↔ 3 [T3]",
                                what: "The Search (Root) + The Cleanse (Path).",
                                math: "+9 = T3² = the mold completes.",
                                detail: "20 = 2×10 = D10² (manufactured slave awakens) | 30 = 3×10 = T3×D10 (living-dead law understood).",
                                verse: "20:41 “And I fled from you” (Musa's search) | 30:30 “The nature of Allah” (fitrah cleansed)."
                            },
                            {
                                phase: "Phase 5: The Trunk",
                                idVal: "39",
                                bg: "border-emerald-950/40 bg-emerald-950/5",
                                dot: "bg-emerald-400",
                                state: "2 [D10] Stabilized",
                                what: "Prophetic alignment. The grip holds.",
                                math: "+9 = T3² continues.",
                                detail: "39 = 3×13 = T3×(Tree+1) — Razim groups form.",
                                verse: "39:23 “A Book consistent” — the mutashabihat."
                            },
                            {
                                phase: "Phase 6↔7: Second Growth",
                                idVal: "49↔58",
                                bg: "border-fuchsia-950/40 bg-fuchsia-950/5",
                                dot: "bg-fuchsia-400",
                                state: "2 [I9] ↔ 2 [I9]",
                                what: "The Branching (D10) + The Flowering (I9).",
                                math: "+10 = act again | +9 = receive again.",
                                detail: "49 = 7² = Kingdom² (nafs brotherhood) | 58 = 2×29 = D10×(19+10) (dialogue emerges).",
                                verse: "38:31 “Safinat al-jiyad” (generosity) | 58:1 “Allah has heard” (dispute resolves)."
                            },
                            {
                                phase: "Phase 8: The Ripening",
                                idVal: "68",
                                bg: "border-amber-950/40 bg-amber-950/5",
                                dot: "bg-amber-400",
                                state: "7 [Kingdom] Begins",
                                what: "Boundary lock. The form is set.",
                                math: "+10 = D10×5:3 final push.",
                                detail: "68 = 4×17 = D10²×Bani Israel — the pre-recorded pen.",
                                verse: "68:1 “Nun. By the pen” — the writing is complete."
                            },
                            {
                                phase: "Phase 9↔10: Third Growth",
                                idVal: "77↔87",
                                bg: "border-orange-950/40 bg-orange-950/5",
                                dot: "bg-orange-400",
                                state: "7 [Kingdom] ↔ 7 [Kingdom]",
                                what: "The Harvest (collect) + The Pressing (extract).",
                                math: "+9 = T3² final molding | +10 = D10×5:3 final act.",
                                detail: "77 = 7×11 = Kingdom×(D10+1) (succession) | 87 = 3×29 = T3×(19+10) (preservation).",
                                verse: "77:50 “So which of your Lord's favors...?”"
                            },
                            {
                                phase: "Phase 11: The Extraction",
                                idVal: "96",
                                bg: "border-teal-950/40 bg-teal-950/5",
                                dot: "bg-teal-400",
                                state: "7 [Kingdom] Completing",
                                what: "Essence emerges from the press.",
                                math: "+9 = T3² — the oil separates.",
                                detail: "96 = 12×8 = Tree×D10³ — the clot reads.",
                                verse: "96:1 “Read in the name of your Lord” — light from darkness."
                            },
                            {
                                phase: "Phase 12: The Oil",
                                idVal: "106",
                                bg: "border-indigo-950/40 bg-indigo-950/5",
                                dot: "bg-indigo-400 shadow-[0_0_8px_currentColor]",
                                state: "1 [Throne] Returns",
                                what: "Light becomes oil. The circuit closes.",
                                math: "+10 = D10×5:3 — final act return.",
                                detail: "106 = 2×53 = D10×prime — circuit safety.",
                                verse: "106:1 “For the security of Quraysh” — return to center."
                            }
                        ].map((item, index) => (
                            <div key={index} className={`p-4 border border-zinc-800/60 rounded-lg text-xs tracking-tight ${item.bg}`}>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.dot}`}></div>
                                        <span className="font-bold text-white text-xs">{item.phase}</span>
                                    </div>
                                    <span className="font-mono text-zinc-400 font-black bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-[10px]">
                                        Node {item.idVal}
                                    </span>
                                </div>
                                <div className="space-y-1.5 text-zinc-300 mt-2 pl-4 border-l border-zinc-800/80">
                                    <div>
                                        <span className="text-zinc-500 font-semibold uppercase text-[9px] tracking-wider block">State</span>
                                        <span className="text-[10px] bg-zinc-900/40 text-[#4ade80] font-bold px-1.5 py-0.5 rounded border border-zinc-800/80 font-mono inline-block">{item.state}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500 font-semibold uppercase text-[9px] tracking-wider block">Process</span>
                                        <p className="text-gray-300 leading-snug">{item.what}</p>
                                    </div>
                                    {(item.math || item.detail) && (
                                        <div className="text-[10px] text-zinc-400 font-mono bg-black/20 p-2 rounded border border-zinc-900/50 space-y-0.5">
                                            {item.math && <div>{item.math}</div>}
                                            {item.detail && <div>{item.detail}</div>}
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-[#f5c842]/75 font-semibold uppercase text-[9px] tracking-wider block">Verse Attachment</span>
                                        <p className="text-gray-400 italic leading-snug font-serif">“{item.verse}”</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Law of the Tree */}
                <div className="p-5 bg-gradient-to-b from-[#030407] to-[#04060b] border border-[#cbd5e1]/10 rounded-xl space-y-4 shadow-xl">
                    <h4 className="text-xs font-black text-[#cbd5e1] tracking-wider uppercase border-b border-zinc-800 pb-2">
                        The Law of the Tree
                    </h4>
                    <p className="text-xs text-zinc-300 italic leading-relaxed font-serif">
                        All growth is the Seed resolving into Oil through the Trunk under the weight of the Harvest. The Soil burns (<span className="text-red-400">+10</span>), the Tree rises (<span className="text-emerald-400">+9</span>), the Light is revealed.
                    </p>
                    
                    <div className="p-3 bg-black/60 border border-zinc-850 rounded-lg text-center font-mono text-[9px] tracking-tighter text-cyan-400 block break-all uppercase font-bold select-all leading-relaxed">
                        SEED → RUPTURE → SEARCH → TRUNK → BRANCHING → HARVEST → LIGHT (24:35)
                    </div>

                    <div className="space-y-2 mt-2">
                        <div className="text-[10px] font-mono text-zinc-550">
                            <span className="text-zinc-400 font-bold block">In 2-3-7 cosmology:</span>
                            <span className="text-[#00c8ff] font-bold block mt-1">1 → 2 → 3 ↔ 3 → 2 → 2 ↔ 2 → 7 → 7 → 7 → 7 → 1</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-550">
                            <span className="text-zinc-400 font-bold block">Or simply:</span>
                            <span className="text-[#4ade80] font-bold block mt-1">1 [Fruit] → 2 [D10] → 3 [T3] → 2 [D10 stable] → 2 [I9] → 7 [Kingdom] → 1 [Throne]</span>
                        </div>
                    </div>
                </div>

                {/* Three Growths Explained */}
                <div className="p-5 bg/#040508 border border-zinc-800 rounded-xl space-y-4">
                    <h4 className="text-xs font-black text-cyan-400 tracking-wider uppercase border-b border-zinc-850 pb-2">
                        The Three Growths Explained
                    </h4>
                    
                    <div className="space-y-3 text-xs">
                        <div className="border-l-2 border-cyan-500 pl-3 py-0.5">
                            <strong className="text-white block font-semibold text-xs mb-0.5">1st Growth (3↔4): The Root and Path</strong>
                            <p className="text-zinc-300 text-[11px] leading-relaxed">
                                T3 field opens. You search for the truth, and then the truth cleanses you.
                            </p>
                        </div>
                        
                        <div className="border-l-2 border-emerald-500 pl-3 py-0.5">
                            <strong className="text-white block font-semibold text-xs mb-0.5">2nd Growth (6↔7): The Branching and Flowering</strong>
                            <p className="text-zinc-300 text-[11px] leading-relaxed">
                                I9 field emerges. You branch into action, and the flower of understanding opens.
                            </p>
                        </div>
                        
                        <div className="border-l-2 border-amber-500 pl-3 py-0.5">
                            <strong className="text-white block font-semibold text-xs mb-0.5">3rd Growth (9↔10): The Harvest and Pressing</strong>
                            <p className="text-zinc-300 text-[11px] leading-relaxed">
                                Kingdom field completes. You collect what grew, and the oil is pressed from the fruit.
                            </p>
                        </div>
                    </div>
                    
                    <p className="text-[10px] text-zinc-500 italic font-mono leading-relaxed">
                        Each growth has two parts because T3 and I9 are bridges — they require entry AND exit, inhale AND exhale.
                    </p>
                </div>

                {/* Parallel Markers (Side Branches) */}
                <div className="p-5 bg-[#030406] border border-zinc-800 rounded-xl space-y-4">
                    <h4 className="text-xs font-black text-fuchsia-400 tracking-wider uppercase border-b border-zinc-850 pb-2">
                        The Parallel Markers (Side Branches)
                    </h4>
                    <p className="text-[11px] text-zinc-300">
                        Between the main phases, three markers appear as tests of the T3 Mold: <span className="italic">Are you real?</span>
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2.5">
                        <div className="p-2.5 bg-zinc-900/30 border border-zinc-800/80 rounded-lg flex gap-3.5 items-start">
                            <span className="text-cyan-400 font-mono font-bold text-xs">△</span>
                            <div className="space-y-0.5">
                                <strong className="text-white text-xs block">Nomination △ (108)</strong>
                                <p className="text-zinc-400 text-[10px] leading-snug">
                                    After Phase 3. <code className="text-cyan-400">108 = 12×9 = Tree×T3²</code>. The Promise. Are you chosen?
                                </p>
                            </div>
                        </div>

                        <div className="p-2.5 bg-zinc-900/30 border border-zinc-800/80 rounded-lg flex gap-3.5 items-start">
                            <span className="text-red-400 font-mono font-bold text-xs">🔥</span>
                            <div className="space-y-0.5">
                                <strong className="text-white text-xs block">Uproot 🔥 (103)</strong>
                                <p className="text-zinc-400 text-[10px] leading-snug">
                                    After Phase 6. <code className="text-red-400">103 = prime</code>. The Protection. Are your roots true?
                                </p>
                            </div>
                        </div>

                        <div className="p-2.5 bg-zinc-900/30 border border-zinc-800/80 rounded-lg flex gap-3.5 items-start">
                            <span className="text-zinc-500 font-mono font-bold text-xs">⚫</span>
                            <div className="space-y-0.5">
                                <strong className="text-white text-xs block">Witness ⚫ (110)</strong>
                                <p className="text-zinc-400 text-[10px] leading-snug">
                                    After Phase 9. <code className="text-zinc-500">110 = 10×11 = D10×(D10+1)</code>. The Return. Do you testify?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Loop Back */}
                <div className="p-5 bg-gradient-to-b from-[#040508] to-[#010204] border border-[#22c55e]/10 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 tracking-wider uppercase border-b border-zinc-850 pb-2 flex items-center justify-between">
                        <span>The Loop Back</span>
                        <span className="text-[10px] font-mono text-zinc-500">Infinite Rotation</span>
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                        After Phase 12 (106), the Reader returns back to Chapter 112 (Al-Ikhlas) to close the circuit.
                    </p>
                    <div className="p-3 bg-black/40 border border-zinc-900 rounded-lg space-y-1 text-xs font-mono">
                        <div className="flex gap-1.5 items-center">
                            <span className="text-green-400 font-bold">106 → 112</span>
                            <span className="text-zinc-500">=</span>
                            <span className="text-zinc-300">+6 (2×3 = D10↔T3 bridge)</span>
                        </div>
                        <div className="flex gap-1.5 items-center mt-1">
                            <span className="text-green-400 font-bold">112</span>
                            <span className="text-zinc-500">=</span>
                            <span className="text-zinc-300">"The Unity" = 1 [Throne] confirmed</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 italic mt-1 leading-snug">
                        The cycle begins again. The Tree grows taller.
                    </p>
                </div>

                {/* Summary */}
                <div className="p-5 bg-[#030405] border border-zinc-800 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-yellow-400 tracking-wider uppercase border-b border-zinc-850 pb-2">
                        Summary
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono font-semibold">
                        12 Phases. 6 Acts (+10). 5 Receives (+9). 1 Start.
                    </p>
                    <div className="p-3 bg-[#0a0a0c] border border-zinc-800 rounded-lg text-xs leading-relaxed text-zinc-300 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                            <span>The Seed breaks (<span className="text-red-400">2</span>)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                            <span>The Root searches (<span className="text-cyan-400">3</span>)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span>The Trunk holds (<span className="text-emerald-400">2</span>)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
                            <span>The Branch flowers (<span className="text-fuchsia-400">2</span>)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            <span>The Fruit ripens (<span className="text-amber-400">7</span>)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                            <span>The Oil shines (<span className="text-[#00c8ff]">1</span>)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gray-500/50 mt-4"></div>

            {!isDesktop ? (
                <div className="my-4 h-[420px]"><KatharaDiagram rotation={rotation} isDesktop={isDesktop} /></div>
            ) : (
                portalRoot && createPortal(
                    <div ref={floatingRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 5, pointerEvents: 'none', opacity: 0, willChange: 'transform, height' }}>
                        <KatharaDiagram rotation={rotation} isDesktop={isDesktop} />
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

export const SephirotDiagram: React.FC<{ 
    rotation: number; 
    activeTab: 'zakkum' | 'datePalm'; 
    isDesktop?: boolean 
}> = ({ rotation, activeTab, isDesktop = true }) => {
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

    const nodeMap = useMemo(() => new Map(currentConfig.nodes.map(node => [node.id, node] as [number, typeof node])), [currentConfig]);

    return (
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
                {currentConfig.nodes.map((node) => {
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
};

interface SephirotAlignmentProps extends AlignmentProps {
    activeTab?: 'zakkum' | 'datePalm';
    onTabChange?: (tab: 'zakkum' | 'datePalm') => void;
}

export const SephirotAlignment: React.FC<SephirotAlignmentProps> = ({ 
    rotation, 
    createPlaylist, 
    setCustomSequence, 
    setAnimationMode,
    activeTab: controlledTab,
    onTabChange
}) => {
    const [localTab, setLocalTab] = useState<'zakkum' | 'datePalm'>('datePalm');
    const activeTab = controlledTab ?? localTab;
    const setActiveTab = (tab: 'zakkum' | 'datePalm') => {
        if (onTabChange) onTabChange(tab);
        else setLocalTab(tab);
    };
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
            // For Fary (zakkum)
            const static108 = getStaticChapterData(108, 'Abundance', 'Blinded by Abundance (108)', '');
            const static103 = getStaticChapterData(103, 'Respite', 'Forgetful Respite (103)', '');
            const static110 = getStaticChapterData(110, 'Jiyad', 'Intoxicating Jiyad (110)', '');
            if (static108) chapters.push(static108);
            [6, 1, 9, 8, 7].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static103) chapters.push(static103);
            [0, 2, 3, 4, 5].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static110) chapters.push(static110);
        } else {
            // For Masad (datePalm)
            const static110 = getStaticChapterData(110, 'Silence', 'Begins in Silence (110)', '');
            const static103 = getStaticChapterData(103, 'Trial', 'Proven by Trial (103)', '');
            const static108 = getStaticChapterData(108, 'Safinat', 'Returns with Safinat (108)', '');
            if (static110) chapters.push(static110);
            [1, 2, 3, 4, 5].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static103) chapters.push(static103);
            [6, 7, 8, 9, 10].forEach(id => { const c = generatedChaptersMap.get(id); if (c) chapters.push(c); });
            if (static108) chapters.push(static108);
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

    return (
        <div className="pt-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">Entanglement -vs- Fabrication</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={handleLoadSequence} className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0" title="Load current sequence into custom sequence">
                        <LoadSequenceIcon />
                    </button>
                    <PlaylistButtons onWatch={handleWatchSequence} />
                </div>
            </div>
            <div className="flex space-x-1 mt-3 mb-2 bg-gray-900/50 p-1 rounded-lg">
                <button onClick={() => setActiveTab('zakkum')} className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${activeTab === 'zakkum' ? 'bg-red-950/60 text-red-350 border border-red-500/30 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                    ف ر ي [FARY] — Fabricated
                </button>
                <button onClick={() => setActiveTab('datePalm')} className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${activeTab === 'datePalm' ? 'bg-emerald-950/60 text-emerald-350 border border-emerald-500/30 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                    م س د [MASAD] — Fiber
                </button>
            </div>
            <div className="w-full h-px bg-gray-500/50 mb-2"></div>

            {!isDesktop ? (
                <div className="my-4 h-[420px]"><SephirotDiagram rotation={rotation} activeTab={activeTab} isDesktop={isDesktop} /></div>
            ) : (
                portalRoot && createPortal(
                    <div ref={floatingRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 5, pointerEvents: 'none', opacity: 0, willChange: 'transform, height' }}>
                        <SephirotDiagram rotation={rotation} activeTab={activeTab} isDesktop={isDesktop} />
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

            {/* Cosmology details block */}
            <div className="mt-8 space-y-6">
                {/* Intro Card */}
                <div className="p-5 bg-gradient-to-b from-[#090b11] to-[#040508] border border-fuchsia-500/25 rounded-xl space-y-4 shadow-xl text-center">
                    <div className="text-xl font-black text-fuchsia-300 tracking-wider flex items-center justify-center gap-3">
                        <span dir="rtl" className="font-serif">م س د</span>
                        <span className="text-xs text-zinc-500 font-sans font-light">vs</span>
                        <span dir="rtl" className="font-serif">ف ر ي</span>
                    </div>
                    <div className="text-[11.5px] font-mono tracking-wide text-zinc-400">
                        [MASAD = Fiber] — [FARY = Fabricated]
                    </div>
                    <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent mx-auto"></div>
                    <p className="text-xs text-gray-300 italic leading-relaxed font-serif max-w-md mx-auto">
                        The two trees are not abstract symbols. They are material realities. One is fiber. The other is fabricated. The difference is the grip.
                    </p>
                </div>

                {/* Two Sides breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* MASAD Card */}
                    <div className="p-5 bg-emerald-950/5 border border-emerald-500/20 rounded-xl space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span dir="rtl" className="font-serif text-base leading-none bg-emerald-950/65 border border-emerald-500/30 px-2.5 py-1 rounded text-emerald-300 flex-shrink-0">م س د</span>
                                <span className="text-xs font-black text-emerald-400 tracking-wider uppercase leading-snug">MASAD — The Fiber</span>
                            </div>
                            <span className="self-start sm:self-auto text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">Patience</span>
                        </div>
                        <div className="space-y-1.5 text-[11px] text-gray-300 leading-relaxed font-serif italic">
                            <p><strong>111:5</strong> — The palm-fiber rope around the neck of the firewood-carrier.</p>
                            <p><strong>19:24</strong> — The palm trunk that shakes, the dates that fall.</p>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                            Masad is what remains when fire passes through. The fiber that holds after the wood burns. The rope that tethers, not the fire that consumes.
                        </p>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
                            The fiber is patience. The fiber is sacrifice. The fiber is the <code className="text-emerald-400">19:12</code> grip that holds the circuit closed through trial.
                        </p>
                        <div className="p-2.5 bg-black/40 border border-emerald-950/80 rounded-lg font-mono text-[9.5px] text-center text-emerald-300">
                            Start: 110 [Begins in Silence] → Middle: 103 [Proven by Trial] → End: 108 [Returns with Safinat]
                        </div>
                        <p className="text-[10px] text-emerald-500/80 italic font-mono">
                            The fiber earns abundance by crossing through silence.
                        </p>
                    </div>

                    {/* FARY Card */}
                    <div className="p-5 bg-red-950/5 border border-red-500/20 rounded-xl space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-red-500/15 pb-3 gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span dir="rtl" className="font-serif text-base leading-none bg-red-950/65 border border-red-500/30 px-2.5 py-1 rounded text-red-300 flex-shrink-0">ف ر ي</span>
                                <span className="text-xs font-black text-red-400 tracking-wider uppercase leading-snug">FARY — Fabricated</span>
                            </div>
                            <span className="self-start sm:self-auto text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 font-black px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">Assumption</span>
                        </div>
                        <div className="space-y-1.5 text-[11px] text-gray-300 leading-relaxed font-serif italic">
                            <p><strong>19:27</strong> — “How can we speak to one who is in the cradle a child?”</p>
                            <p className="text-[10px] font-sans font-light not-italic text-zinc-400">The Bani Israel fabricated their objection. They built a calf from their jewelry. They manufactured a king from their fear.</p>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                            Fary is what is built without grip. The fabricated throne. The constructed abundance. The claimed victory without battle.
                        </p>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
                            The fabricated is conjecture. The fabricated is assumption. The fabricated is the <code className="text-red-400">20:120</code> taking that opens the circuit to Taghut.
                        </p>
                        <div className="p-2.5 bg-black/40 border border-red-950/80 rounded-lg font-mono text-[9.5px] text-center text-red-300">
                            Start: 108 [Blinded by Abundance] → Middle: 103 [Forgetful Respite] → End: 110 [Intoxicating Jiyad]
                        </div>
                        <p className="text-[10px] text-red-500/80 italic font-mono">
                            The fabricated claims abundance and loses it through respite.
                        </p>
                    </div>
                </div>

                {/* Why Bani Israel Block */}
                <div className="p-5 bg-[#040508] border border-zinc-800 rounded-xl space-y-4">
                    <h4 className="text-xs font-black text-amber-500 tracking-wider uppercase border-b border-zinc-850 pb-2">
                        Why Bani Israel Got Pharaoh As King
                    </h4>
                    
                    <div className="space-y-3.5 text-xs text-gray-300 leading-relaxed">
                        <p>
                            <strong className="text-amber-400 font-mono">19:27</strong> — The Bani Israel fabricated their objection to Maryam. They could not see the Word in the cradle. They demanded visible proof. They built their calf. They got their Pharaoh.
                        </p>
                        <p>
                            The fabricated always produces the tyrant. When the people manufacture their own abundance (<span className="text-cyan-400">108</span>), they receive a king who claims victory (<span className="text-zinc-400">110</span>) without earning it. The respite (<span className="text-red-400">103</span>) becomes the delay that hardens into bondage.
                        </p>
                        <p className="font-serif italic text-gray-400">
                            <strong>20:88</strong> — “This is your god and the god of Musa.” The fabricated calf speaks. The fabricated king rules. The fabricated tree grows from the bottom of fire (37:64) and feeds those who eat from it without crossing.
                        </p>
                        <p className="text-yellow-400/90 font-semibold">
                            Bani Israel got Pharaoh because they chose <span dir="rtl" className="font-serif font-bold text-lg leading-none">ف ر ي</span> over <span dir="rtl" className="font-serif font-bold text-lg leading-none">م س د</span>. They manufactured their own rope instead of gripping the Book. Their abundance became their chain.
                        </p>
                    </div>
                </div>

                {/* DCU Equations */}
                <div className="p-5 bg-gradient-to-b from-[#030406] to-[#04060a] border border-[#cbd5e1]/10 rounded-xl space-y-4">
                    <h4 className="text-xs font-black text-[#cbd5e1] tracking-wider uppercase border-b border-zinc-850 pb-2">
                        The DCU Equations
                    </h4>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-950/5 border border-emerald-500/20 rounded-lg space-y-2.5">
                            <span className="text-[10px] uppercase font-black text-emerald-400 tracking-widest block font-serif">م س د [Masad]</span>
                            <div className="p-2.5 bg-black/60 rounded border border-zinc-900 font-mono text-[9px] tracking-tight text-emerald-300 whitespace-nowrap overflow-x-auto no-scrollbar">
                                1[Fruit] → 2[D10: صبر w/ نسك] ↔ 3[T3: 95:8] ↔ 2[I9: رسل/ملك] → 7[11:7] → 103[Trial] → 108[Safinat] ← 1[Throne]
                            </div>
                            <span className="text-[10.5px] italic text-zinc-400 block pr-2 border-r-2 border-emerald-500/50 pl-1">
                                The fiber grips. The fiber crosses. The fiber earns.
                            </span>
                        </div>

                        <div className="p-4 bg-red-950/5 border border-red-500/20 rounded-lg space-y-2.5">
                            <span className="text-[10px] uppercase font-black text-red-400 tracking-widest block font-serif">ف ر ي [Fary]</span>
                            <div className="p-2.5 bg-black/60 rounded border border-zinc-900 font-mono text-[9px] tracking-tight text-red-300 whitespace-nowrap overflow-x-auto no-scrollbar">
                                1[Fruit] → 2[D10: taking] ↔ 3[T3: 37:64] ↔ 2[I9: scattered] → 7[87:13] → 103[Respite] → 110[Jiyad] → 1[Trap]
                            </div>
                            <span className="text-[10.5px] italic text-zinc-400 block pr-2 border-r-2 border-red-500/50 pl-1">
                                The fabricated claims. The fabricated delays. The fabricated loses.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom 3 brief Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* Shared Middle */}
                    <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-2">
                        <span className="text-[10px] font-black tracking-widest text-[#00c8ff] uppercase block border-b border-zinc-900 pb-1">The Shared Middle: 103</span>
                        <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                            Both pass through 103. But:
                        </p>
                        <div className="space-y-1 text-[10.5px] font-mono">
                            <div><strong className="text-emerald-400">م س د:</strong> 103 = Proven by Trial → earns 108</div>
                            <div><strong className="text-red-400">ف ر ي:</strong> 103 = Forgetful Respite → claims 110</div>
                        </div>
                        <span className="text-[10px] text-zinc-500 italic block mt-1.5">The same surah. Opposite function. The difference is the grip.</span>
                    </div>

                    {/* Crossover */}
                    <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-2">
                        <span className="text-[10px] font-black tracking-widest text-fuchsia-400 uppercase block border-b border-zinc-900 pb-1">The Crossover</span>
                        <div className="space-y-1 text-[10px] font-mono text-zinc-300">
                            <div><strong className="text-emerald-400">م س د:</strong> 110 [Begins in Silence] → 103 [Proven by Trial] → 108 [Returns with Safinat]</div>
                            <div><strong className="text-red-400">ف ر ي:</strong> 108 [Blinded by Abundance] → 103 [Forgetful Respite] → 110 [Intoxicating Jiyad]</div>
                        </div>
                        <p className="text-[10.5px] text-zinc-400 leading-snug">
                            They swap endpoints through the shared middle. The fiber earns what the fabricated claims.
                        </p>
                        <p className="text-[10px] text-zinc-500 italic leading-snug pt-1 border-t border-zinc-900/50 font-serif">
                            38:31 — Safinat al-jiyad = vessels of generosity, not horses. The fiber knows the vessel. The fabricated only sees the horse.
                        </p>
                    </div>

                    {/* Verification */}
                    <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-2">
                        <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block border-b border-zinc-900 pb-1">Verification</span>
                        <div className="space-y-1 text-[10.5px] text-zinc-300">
                            <div><strong className="font-serif">م س د</strong> = 111:5 = rope = patience = grip</div>
                            <div><strong className="font-serif">ف ر ي</strong> = 19:27 = objection = calf = taking</div>
                        </div>
                        <p className="text-[10.5px] text-zinc-400 leading-snug">
                            Bani Israel chose <span className="font-serif">ف ر ي</span> at 19:27. They got Pharaoh at 20:88. The fiber would have given them Musa at 20:41.
                        </p>
                        <span className="text-[10px] text-zinc-500 italic block mt-1">The difference is not the tree. The difference is the material.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SephirotAlignment;
