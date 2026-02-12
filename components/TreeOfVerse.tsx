
import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { KATHARA_CLOCK_POINTS, KATHARA_GRID_NODES, KATHARA_GRID_LINES, TOTAL_VERSES, TOTAL_SLICES, BUBBLE_BLOCK_MAPPING_RAW } from '../constants.ts';
import { getVerseAddressFromGlobalIndex, getGlobalVerseIndex } from '../utils.ts';
import { ShuffleIcon } from './Icons.tsx';

interface TreeOfVerseProps {
  rotation: number;
  onVerseSelect: (surah: number, ayah: number) => void;
  onBulkExport: (verseIds: string[]) => void;
}

const TREE_LABELS = [
    'Awakening', 'Assertion', 'Disruption', 
    'Constriction', 'Refinement', 'Submission', 
    'Restoration', 'Servanthood', 'Sacrifice', 
    'Witness', 'Ascension', 'Radiance'
];

export const TreeOfVerse: React.FC<TreeOfVerseProps> = ({ rotation, onVerseSelect, onBulkExport }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);
    const [rootVerse, setRootVerse] = useState({ surah: 1, ayah: 1 });
    const [addrInput, setAddrInput] = useState('1:1');
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
    const portalRoot = typeof document !== 'undefined' ? document.getElementById('kathara-portal-root') : null;

    // Track local input values to allow typing without immediate re-renders
    const [localInputs, setLocalInputs] = useState<string[][]>([]);

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
            
            if (floatingEl && scrollContainer) {
                const containerRect = scrollContainer.getBoundingClientRect();
                const diagramWidth = 220;
                // Move position higher by decreasing the offset from 340 to 220
                const x = containerRect.left - diagramWidth + 10; 
                const y = containerRect.top + 220; 

                floatingEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                floatingEl.style.width = `${diagramWidth}px`;
                floatingEl.style.height = `400px`;
                
                if (listEl) {
                    const listRect = listEl.getBoundingClientRect();
                    // Sync visibility with the section's visibility in the viewport
                    const isSectionVisible = listRect.bottom > containerRect.top && listRect.top < containerRect.bottom;
                    floatingEl.style.opacity = isSectionVisible ? '1' : '0';
                    floatingEl.style.pointerEvents = isSectionVisible ? 'auto' : 'none';
                }
            }
        };
        const loop = () => { updatePosition(); rafId = requestAnimationFrame(loop); };
        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [isDesktop]);

    const verseScalingFactor = TOTAL_VERSES / TOTAL_SLICES;
    const rotationOffset = (rotation / 360) * TOTAL_VERSES;

    const trines = useMemo(() => {
        const rootIndex = getGlobalVerseIndex(rootVerse.surah, rootVerse.ayah);
        const baseIndex = rootIndex - rotationOffset;

        return KATHARA_CLOCK_POINTS.map((pointValue) => {
            const pointOffset = (pointValue - 1) * verseScalingFactor;
            const startIdx = Math.round(baseIndex + pointOffset);
            
            return [0, 1, 2].map(offset => {
                const globalIdx = ((startIdx + offset - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
                return getVerseAddressFromGlobalIndex(globalIdx);
            });
        });
    }, [rootVerse, rotation, verseScalingFactor, rotationOffset]);

    // Sync local inputs when trines change (from external source like root or rotation)
    useEffect(() => {
        setLocalInputs(trines.map(trine => trine.map(v => `${v.surah}:${v.ayah}`)));
        setAddrInput(`${rootVerse.surah}:${rootVerse.ayah}`);
    }, [trines, rootVerse]);

    const updateRootFromTarget = (nodeIdx: number, vIdx: number, targetSurah: number, targetAyah: number) => {
        const targetGlobalIdx = getGlobalVerseIndex(targetSurah, targetAyah);
        const pointValue = KATHARA_CLOCK_POINTS[nodeIdx];
        const pointOffset = (pointValue - 1) * verseScalingFactor;
        
        let calculatedRootIndex = Math.round(targetGlobalIdx + rotationOffset - pointOffset - vIdx);
        calculatedRootIndex = ((calculatedRootIndex - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        
        const newRoot = getVerseAddressFromGlobalIndex(calculatedRootIndex);
        setRootVerse(newRoot);
    };

    const handleRootChange = (delta: number) => {
        const rootIndex = getGlobalVerseIndex(rootVerse.surah, rootVerse.ayah);
        const newIdx = ((rootIndex + delta - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        setRootVerse(getVerseAddressFromGlobalIndex(newIdx));
    };

    const handleRandomVerse = () => {
        const randomSurahId = Math.floor(Math.random() * 114) + 1;
        const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[randomSurahId as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 7;
        const randomAyah = Math.floor(Math.random() * maxAyahs) + 1;
        setRootVerse({ surah: randomSurahId, ayah: randomAyah });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9:]/g, '');
        setAddrInput(val);
        const parts = val.split(':');
        if (parts.length === 2) {
            const s = parseInt(parts[0], 10);
            const a = parseInt(parts[1], 10);
            if (!isNaN(s) && !isNaN(a) && s >= 1 && s <= 114) {
                const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[s as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
                if (a >= 1 && a <= maxAyahs) setRootVerse({ surah: s, ayah: a });
            }
        }
    };

    const handleLocalInputChange = (nodeIdx: number, vIdx: number, value: string) => {
        const newLocal = [...localInputs];
        newLocal[nodeIdx][vIdx] = value.replace(/[^0-9:]/g, '');
        setLocalInputs(newLocal);

        // If valid, calculate new root
        const parts = value.split(':');
        if (parts.length === 2) {
            const s = parseInt(parts[0], 10);
            const a = parseInt(parts[1], 10);
            if (!isNaN(s) && !isNaN(a) && s >= 1 && s <= 114) {
                const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[s as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
                if (a >= 1 && a <= maxAyahs) {
                    updateRootFromTarget(nodeIdx, vIdx, s, a);
                }
            }
        }
    };

    // Stretched coordinate mapping
    const transformY = (y: number) => 20 + (y - 20) * 1.15;

    const renderDiagram = () => (
        <div className="flex justify-center w-full h-full p-2">
            <svg viewBox="0 0 150 320" width="100%" height="100%" aria-hidden="true" className="drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <style>{`
                    @keyframes pulse-cyan { 0% { opacity: 0.3; } 50% { opacity: 0.7; } 100% { opacity: 0.3; } }
                    .tree-line { animation: pulse-cyan 4s infinite ease-in-out; }
                `}</style>
                <g strokeWidth="1.3">
                    {KATHARA_GRID_LINES.filter(l => l.from <= 12 && l.to <= 12).map((line, index) => {
                        const fromNode = KATHARA_GRID_NODES.find(n => n.id === line.from);
                        const toNode = KATHARA_GRID_NODES.find(n => n.id === line.to);
                        if (!fromNode || !toNode) return null;
                        return <line key={index} x1={fromNode.x} y1={transformY(fromNode.y)} x2={toNode.x} y2={transformY(toNode.y)} stroke={index % 2 === 0 ? "#06b6d4" : "#d946ef"} className="tree-line" />;
                    })}
                </g>
                {KATHARA_GRID_NODES.slice(0, 12).map((node, index) => {
                    const firstVerse = trines[index][0];
                    const ty = transformY(node.y);
                    return (
                        <g key={node.id}>
                            <circle cx={node.x} cy={ty} r={11} fill="#000" stroke="#06b6d4" strokeWidth="1.5" />
                            <text x={node.x} y={ty} textAnchor="middle" dy=".3em" fontSize="8.5" fontWeight="bold" fill="#fff" style={{ textShadow: '0 0 4px #06b6d4' }}>
                                {firstVerse.surah}:{firstVerse.ayah}
                            </text>
                            <text x={node.x} y={ty - 14} textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontWeight="bold" className="uppercase" style={{ textShadow: '0 0 2px #000' }}>
                                {TREE_LABELS[index]}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );

    return (
        <div className="pt-4 animate-in fade-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400 tracking-wider">TREE OF VERSE</h2>
                <button onClick={() => onBulkExport(trines.flat().map(v => `${v.surah}:${v.ayah}`))} className="text-[10px] px-2 py-1 bg-cyan-900/40 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors text-cyan-100">Bulk Export (36)</button>
            </div>
            
            <div className="bg-black/40 border border-gray-800 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Root Anchor Node 1</label>
                    <div className="flex items-center gap-2">
                        <button onClick={handleRandomVerse} className="p-2 bg-gray-800 hover:bg-cyan-900/50 text-cyan-400 rounded-lg transition-all border border-cyan-500/20 mr-2" title="Load Random Verse">
                            <ShuffleIcon />
                        </button>
                        <button onClick={() => handleRootChange(-1)} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-white">-</button>
                        <input 
                            type="text"
                            value={addrInput}
                            onChange={handleInputChange}
                            onBlur={() => setAddrInput(`${rootVerse.surah}:${rootVerse.ayah}`)}
                            className="bg-transparent border-none p-0 font-mono text-cyan-400 text-lg glow-text text-center w-24 focus:ring-0 focus:outline-none"
                            placeholder="S:A"
                        />
                        <button onClick={() => handleRootChange(1)} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-white">+</button>
                    </div>
                </div>
            </div>

            {!isDesktop ? (
                <div className="my-4 h-[420px] bg-black/20 rounded-xl border border-white/5">{renderDiagram()}</div>
            ) : (
                portalRoot && createPortal(
                    <div ref={floatingRef} className="transition-opacity duration-300" style={{ position: 'fixed', top: 0, left: 0, zIndex: 5, willChange: 'transform' }}>
                        {renderDiagram()}
                    </div>,
                    portalRoot
                )
            )}

            <div ref={listRef} className="space-y-3 mt-4">
                {trines.map((trine, nodeIdx) => (
                    <div key={nodeIdx} className="bg-gray-900/30 border border-white/5 rounded-lg p-3 hover:border-cyan-500/20 transition-all group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{nodeIdx + 1}. {TREE_LABELS[nodeIdx]}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                            {trine.map((v, vIdx) => (
                                <div 
                                    key={vIdx} 
                                    className="relative flex flex-col items-center py-1 px-1.5 bg-black/60 border border-white/10 rounded group/input focus-within:border-cyan-500/50 focus-within:bg-cyan-900/10 transition-all"
                                >
                                    <input 
                                        type="text"
                                        value={localInputs[nodeIdx]?.[vIdx] || ''}
                                        onChange={(e) => handleLocalInputChange(nodeIdx, vIdx, e.target.value)}
                                        onDoubleClick={() => onVerseSelect(v.surah, v.ayah)}
                                        className="bg-transparent border-none p-0 font-mono text-cyan-400 text-xs glow-text text-center w-full focus:ring-0 focus:outline-none cursor-text"
                                        placeholder="S:A"
                                        title="Double click to view verse"
                                    />
                                    <span className="text-[7px] opacity-40 uppercase pointer-events-none">V{vIdx + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`.glow-text { text-shadow: 0 0 5px currentColor; }`}</style>
        </div>
    );
};
