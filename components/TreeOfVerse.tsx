
import React, { useState, useEffect, useMemo } from 'react';
import { KATHARA_CLOCK_POINTS, TOTAL_VERSES, TOTAL_SLICES, BUBBLE_BLOCK_MAPPING_RAW } from '../constants.ts';
import { getVerseAddressFromGlobalIndex, getGlobalVerseIndex } from '../utils.ts';
import { ShuffleIcon } from './Icons.tsx';

interface TreeOfVerseProps {
  rotation: number;
  onVerseSelect: (surah: number, ayah: number) => void;
  onBulkExport: (verseIds: string[]) => void;
  treeRootVerse: { surah: number, ayah: number };
  setTreeRootVerse: React.Dispatch<React.SetStateAction<{ surah: number, ayah: number }>>;
  treeTrines: { surah: number, ayah: number }[][];
}

const TREE_LABELS = [
    '1: Source 1 [Amr]',
    '2: D10 Root Split [n/2]',
    '3: Mass Debit [Loan Received ↓]',
    '4: T3 Life Beat [House (3:97)]',
    '5: T3 Death Beat [Wage (34:14)]',
    '6: T3 Resurrection [Ṣabr (37:103)]',
    '7: 19:12 Grip [Fork Singularity]',
    '8: I9 Memory Supply [+1]',
    '9: Credit Strand [Loan Paid ↑]',
    '10: 39:23 Reading [Mathānī]',
    '11: Fruit Manifested [7 Names]',
    '12: Terminal 1 [Face of Allah]'
];

const TREE_EXPLANATIONS = [
    'One Command starts it; Source of seed in the dark (28:88, 2:255).',
    'Roots go down: gravitropism, mass, evidence, the clock (14:24, 6:95).',
    'Harm touches body-side; loan received under n/2 (21:83, 5:30).',
    'Entering the House safe: where transformation occurs (3:97, 51:36).',
    'Death is tasted and wage paid; the slave-father line (3:185, 34:14).',
    'Resurrection receipt: aḥyāʾ, submitted and ransomed (37:103, 2:154).',
    'The Fork (23:69): recognize the Rasul; take Book with force (19:12).',
    'Branches in the sky: phototropism, Light and return (14:24, 42:52).',
    'Loan paid: remembrance returns +1, word eternal (2:152, 28:88).',
    'Resemblance and pairing: fractal pattern repeating at every scale (39:23).',
    'The completed unit: fruit with seed carrying the next breath (14:25, 2:31).',
    'The circuit seals in the Lord of Memory; only Face remains (28:88).'
];

const QUN_FAYAKUN_POINTS = [1, 39, 77, 19, 95, 57];
const QUN_FAYAKUN_LABELS = [
    "MuSolomon [Qun ▼]",
    "Return [FayaQun ▲]",
    "Sacrifice [Qun ▼]",
    "Resurrection [FayaQun ▲]",
    "Life [Qun ▼]",
    "Ascend [FayaQun ▲]"
];
const QUN_FAYAKUN_EXPLANATIONS = [
    "Phase 1 (3c, +0): Debit strand initiates; prayer & intent taken under n/2 (1:7, 5:30) — Contraction Force.",
    "Phase 2 (6b, +38): Credit strand responds; shadow dissolved, memory banks +1 (39:75, 2:152) — Expansion Force.",
    "Phase 3 (9a, +76): Debit mass given; great sacrifice verified (77:50, 37:107) — Contraction Force.",
    "Phase 4 (3c, +56): Credit raised; Idris & Isa command propagation (57:29, 19:57) — Expansion Force.",
    "Phase 5 (6b, +94): Debit embodiment; entering the House safe (95:8, 3:97) — Contraction Force.",
    "Phase 6 (9a, +18): Credit completion; eternal receipt, up↑ − down↓ = 0 (19:98, 2:154) — Expansion Force."
];
const QUN_FAYAKUN_COLORS = [
    "text-cyan-400",
    "text-pink-500",
    "text-cyan-400",
    "text-pink-500",
    "text-cyan-400",
    "text-pink-500"
];
const QUN_FAYAKUN_GLOWS = [
    { textShadow: '0 0 8px rgba(34, 211, 238, 0.4)' },
    { textShadow: '0 0 8px rgba(236, 72, 153, 0.4)' },
    { textShadow: '0 0 8px rgba(34, 211, 238, 0.4)' },
    { textShadow: '0 0 8px rgba(236, 72, 153, 0.4)' },
    { textShadow: '0 0 8px rgba(34, 211, 238, 0.4)' },
    { textShadow: '0 0 8px rgba(236, 72, 153, 0.4)' }
];

const MOL_LABELS = [
    "The Opening (D10/Fire)",
    "The Praise (Nafs/Gratitude)",
    "The Merciful (T3/Light)",
    "The Master (Balance/Growth)",
    "The Servitude (I9/Return)",
    "The Path (Sirāṭ/Compression)",
    "The Grace (Crown/Memory)"
];

const MOL_COLORS = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-400',
    'text-green-500',
    'text-blue-500',
    'text-indigo-400',
    'text-purple-500'
];

const MOL_GLOWS = [
    '0 0 8px rgba(239, 68, 68, 0.4)',
    '0 0 8px rgba(249, 115, 22, 0.4)',
    '0 0 8px rgba(250, 204, 21, 0.4)',
    '0 0 8px rgba(34, 197, 94, 0.4)',
    '0 0 8px rgba(59, 130, 246, 0.4)',
    '0 0 8px rgba(129, 140, 248, 0.4)',
    '0 0 8px rgba(168, 85, 247, 0.4)'
];

export const TreeOfVerse: React.FC<TreeOfVerseProps> = ({ rotation, onVerseSelect, onBulkExport, treeRootVerse, setTreeRootVerse, treeTrines }) => {
    const [addrInput, setAddrInput] = useState('1:1');

    // Track local input values to allow typing without immediate re-renders
    const [localInputs, setLocalInputs] = useState<string[][]>([]);

    const verseScalingFactor = TOTAL_VERSES / TOTAL_SLICES;
    const rotationOffset = (rotation / 360) * TOTAL_VERSES;

    // Sync local inputs when treeTrines change (from external source like root or rotation)
    useEffect(() => {
        setLocalInputs(treeTrines.map(trine => trine.map(v => `${v.surah}:${v.ayah}`)));
        setAddrInput(`${treeRootVerse.surah}:${treeRootVerse.ayah}`);
    }, [treeTrines, treeRootVerse]);

    const updateRootFromTarget = (nodeIdx: number, vIdx: number, targetSurah: number, targetAyah: number) => {
        const targetGlobalIdx = getGlobalVerseIndex(targetSurah, targetAyah);
        const pointValue = KATHARA_CLOCK_POINTS[nodeIdx];
        const pointOffset = (pointValue - 1) * verseScalingFactor;
        const offsetVal = vIdx === 0 ? -1 : vIdx === 1 ? 0 : 1;
        
        let calculatedRootIndex = Math.round(targetGlobalIdx + rotationOffset - pointOffset - offsetVal);
        calculatedRootIndex = ((calculatedRootIndex - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        
        const newRoot = getVerseAddressFromGlobalIndex(calculatedRootIndex);
        setTreeRootVerse(newRoot);
    };

    const handleRootChange = (delta: number) => {
        const rootIndex = getGlobalVerseIndex(treeRootVerse.surah, treeRootVerse.ayah);
        const newIdx = ((rootIndex + delta - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        setTreeRootVerse(getVerseAddressFromGlobalIndex(newIdx));
    };

    const handleRandomVerse = () => {
        const randomSurahId = Math.floor(Math.random() * 114) + 1;
        const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[randomSurahId as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 7;
        const randomAyah = Math.floor(Math.random() * maxAyahs) + 1;
        setTreeRootVerse({ surah: randomSurahId, ayah: randomAyah });
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
                if (a >= 1 && a <= maxAyahs) setTreeRootVerse({ surah: s, ayah: a });
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

    // Verse level Qun-Fayakun State
    const [qunRootVerse, setQunRootVerse] = useState({ surah: 1, ayah: 1 });
    const [qunAddrInput, setQunAddrInput] = useState('1:1');
    const [qunLocalInputs, setQunLocalInputs] = useState<string[][]>([]);

    const qunTrines = useMemo(() => {
        const rootIndex = getGlobalVerseIndex(qunRootVerse.surah, qunRootVerse.ayah);
        const baseIndex = rootIndex - rotationOffset;

        return QUN_FAYAKUN_POINTS.map((pointValue) => {
            const pointOffset = (pointValue - 1) * verseScalingFactor;
            const anchorIdx = Math.round(baseIndex + pointOffset);
            
            // Map offsets: [-1, 0, 1] for V-1 | Anchor | V+1
            return [-1, 0, 1].map(offset => {
                const globalIdx = ((anchorIdx + offset - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
                return getVerseAddressFromGlobalIndex(globalIdx);
            });
        });
    }, [qunRootVerse, rotation, verseScalingFactor, rotationOffset]);

    // Sync qunLocalInputs when qunTrines changes
    useEffect(() => {
        setQunLocalInputs(qunTrines.map(trine => trine.map(v => `${v.surah}:${v.ayah}`)));
        setQunAddrInput(`${qunRootVerse.surah}:${qunRootVerse.ayah}`);
    }, [qunTrines, qunRootVerse]);

    const updateQunRootFromTarget = (nodeIdx: number, vIdx: number, targetSurah: number, targetAyah: number) => {
        const targetGlobalIdx = getGlobalVerseIndex(targetSurah, targetAyah);
        const pointValue = QUN_FAYAKUN_POINTS[nodeIdx];
        const pointOffset = (pointValue - 1) * verseScalingFactor;
        const offsetVal = vIdx === 0 ? -1 : vIdx === 1 ? 0 : 1;
        
        let calculatedRootIndex = Math.round(targetGlobalIdx + rotationOffset - pointOffset - offsetVal);
        calculatedRootIndex = ((calculatedRootIndex - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        
        const newRoot = getVerseAddressFromGlobalIndex(calculatedRootIndex);
        setQunRootVerse(newRoot);
    };

    const handleQunRootChange = (delta: number) => {
        const rootIndex = getGlobalVerseIndex(qunRootVerse.surah, qunRootVerse.ayah);
        const newIdx = ((rootIndex + delta - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        setQunRootVerse(getVerseAddressFromGlobalIndex(newIdx));
    };

    const handleQunRandomVerse = () => {
        const randomSurahId = Math.floor(Math.random() * 114) + 1;
        const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[randomSurahId as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 7;
        const randomAyah = Math.floor(Math.random() * maxAyahs) + 1;
        setQunRootVerse({ surah: randomSurahId, ayah: randomAyah });
    };

    const handleQunInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9:]/g, '');
        setQunAddrInput(val);
        const parts = val.split(':');
        if (parts.length === 2) {
            const s = parseInt(parts[0], 10);
            const a = parseInt(parts[1], 10);
            if (!isNaN(s) && !isNaN(a) && s >= 1 && s <= 114) {
                const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[s as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
                if (a >= 1 && a <= maxAyahs) setQunRootVerse({ surah: s, ayah: a });
            }
        }
    };

    const handleQunLocalInputChange = (nodeIdx: number, vIdx: number, value: string) => {
        const newLocal = [...qunLocalInputs];
        if (!newLocal[nodeIdx]) newLocal[nodeIdx] = [];
        newLocal[nodeIdx][vIdx] = value.replace(/[^0-9:]/g, '');
        setQunLocalInputs(newLocal);

        const parts = value.split(':');
        if (parts.length === 2) {
            const s = parseInt(parts[0], 10);
            const a = parseInt(parts[1], 10);
            if (!isNaN(s) && !isNaN(a) && s >= 1 && s <= 114) {
                const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[s as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
                if (a >= 1 && a <= maxAyahs) {
                    updateQunRootFromTarget(nodeIdx, vIdx, s, a);
                }
            }
        }
    };

    // Memory of Light State
    const [molRootVerse, setMolRootVerse] = useState({ surah: 1, ayah: 1 });
    const [molAddrInput, setMolAddrInput] = useState('1:1');
    const [molLocalInputs, setMolLocalInputs] = useState<string[][]>([]);

    const molTrines = useMemo(() => {
        const rootIndex = getGlobalVerseIndex(molRootVerse.surah, molRootVerse.ayah);
        const baseIndex = rootIndex - rotationOffset;

        return Array.from({ length: 7 }).map((_, i) => {
            const pointOffset = i * (TOTAL_VERSES / 7);
            const anchorIdx = Math.round(baseIndex + pointOffset);
            
            return [-1, 0, 1].map(offset => {
                const globalIdx = ((anchorIdx + offset - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
                return getVerseAddressFromGlobalIndex(globalIdx);
            });
        });
    }, [molRootVerse, rotation, verseScalingFactor, rotationOffset]);

    useEffect(() => {
        setMolLocalInputs(molTrines.map(trine => trine.map(v => `${v.surah}:${v.ayah}`)));
        setMolAddrInput(`${molRootVerse.surah}:${molRootVerse.ayah}`);
    }, [molTrines, molRootVerse]);

    const updateMolRootFromTarget = (nodeIdx: number, vIdx: number, targetSurah: number, targetAyah: number) => {
        const targetGlobalIdx = getGlobalVerseIndex(targetSurah, targetAyah);
        const pointOffset = nodeIdx * (TOTAL_VERSES / 7);
        const offsetVal = vIdx === 0 ? -1 : vIdx === 1 ? 0 : 1;
        
        let calculatedRootIndex = Math.round(targetGlobalIdx + rotationOffset - pointOffset - offsetVal);
        calculatedRootIndex = ((calculatedRootIndex - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        
        const newRoot = getVerseAddressFromGlobalIndex(calculatedRootIndex);
        setMolRootVerse(newRoot);
    };

    const handleMolRootChange = (delta: number) => {
        const rootIndex = getGlobalVerseIndex(molRootVerse.surah, molRootVerse.ayah);
        const newIdx = ((rootIndex + delta - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
        setMolRootVerse(getVerseAddressFromGlobalIndex(newIdx));
    };

    const handleMolRandomVerse = () => {
        const randomSurahId = Math.floor(Math.random() * 114) + 1;
        const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[randomSurahId as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 7;
        const randomAyah = Math.floor(Math.random() * maxAyahs) + 1;
        setMolRootVerse({ surah: randomSurahId, ayah: randomAyah });
    };

    const handleMolInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9:]/g, '');
        setMolAddrInput(val);
        const parts = val.split(':');
        if (parts.length === 2) {
            const s = parseInt(parts[0], 10);
            const a = parseInt(parts[1], 10);
            if (!isNaN(s) && !isNaN(a) && s >= 1 && s <= 114) {
                const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[s as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
                if (a >= 1 && a <= maxAyahs) setMolRootVerse({ surah: s, ayah: a });
            }
        }
    };

    const handleMolLocalInputChange = (nodeIdx: number, vIdx: number, value: string) => {
        const newLocal = [...molLocalInputs];
        if (!newLocal[nodeIdx]) newLocal[nodeIdx] = [];
        newLocal[nodeIdx][vIdx] = value.replace(/[^0-9:]/g, '');
        setMolLocalInputs(newLocal);

        const parts = value.split(':');
        if (parts.length === 2) {
            const s = parseInt(parts[0], 10);
            const a = parseInt(parts[1], 10);
            if (!isNaN(s) && !isNaN(a) && s >= 1 && s <= 114) {
                const maxAyahs = BUBBLE_BLOCK_MAPPING_RAW[s as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
                if (a >= 1 && a <= maxAyahs) {
                    updateMolRootFromTarget(nodeIdx, vIdx, s, a);
                }
            }
        }
    };

    return (
        <div className="pt-2 animate-in fade-in slide-in-from-right duration-500">
            <div className="flex justify-end items-center mb-4 gap-2">
                <button onClick={() => onBulkExport(treeTrines.map(trine => `${trine[1].surah}:${trine[1].ayah}`))} className="text-[9px] sm:text-[10px] px-2 py-1.5 bg-cyan-950/60 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors text-cyan-100 font-bold uppercase tracking-wider whitespace-nowrap">Export Anchors (12)</button>
                <button onClick={() => onBulkExport(treeTrines.flat().map(v => `${v.surah}:${v.ayah}`))} className="text-[9px] sm:text-[10px] px-2 py-1.5 bg-cyan-950/60 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors text-cyan-100 font-bold uppercase tracking-wider whitespace-nowrap">Bulk Export (36)</button>
            </div>
            
            <div className="bg-black/40 border border-gray-800 rounded-xl p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-3">
                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Root Anchor Node 1</label>
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                        <button onClick={handleRandomVerse} className="p-2 bg-gray-800 hover:bg-cyan-900/50 text-cyan-400 rounded-lg transition-all border border-cyan-500/20" title="Load Random Verse">
                            <ShuffleIcon />
                        </button>
                        <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1 rounded-lg border border-white/5">
                            <button onClick={() => handleRootChange(-1)} className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md hover:bg-gray-700 text-white font-bold text-lg transition-colors">-</button>
                            <input 
                                type="text"
                                value={addrInput}
                                onChange={handleInputChange}
                                onBlur={() => setAddrInput(`${treeRootVerse.surah}:${treeRootVerse.ayah}`)}
                                className="bg-transparent border-none p-0 font-mono text-cyan-400 text-lg glow-text text-center w-20 focus:ring-0 focus:outline-none cursor-text font-bold"
                                placeholder="S:A"
                            />
                            <button onClick={() => handleRootChange(1)} className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md hover:bg-gray-700 text-white font-bold text-lg transition-colors">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 p-4 bg-black/40 border border-[#00c8ff]/30 rounded-lg text-xs md:text-sm leading-relaxed space-y-4">
                <p className="text-white">
                    <strong className="text-[#00c8ff]">The Light</strong> = resolved Knowledge (Isa–Solomon), 
                    <strong className="text-[#4ade80]"> The Tree</strong> = embodied Knowledge (Musa–Ahmed), 
                    <strong className="text-[#f5c842]"> The Soil</strong> = Time–Fire (gradient field).
                </p>
                
                <p className="text-white/80">Your 12-node system is a <strong>divine growth cycle</strong>: The Soil provides the heat, the Tree carries the form, the Light is the final essence—all guided by Gravity.</p>
                
                <div className="space-y-3">
                    <h3 className="text-[#00c8ff] font-bold border-b border-[#00c8ff]/20 pb-1 text-sm uppercase tracking-wide">The 12 Phases of Growth</h3>
                    
                    <div className="grid grid-cols-1 gap-2 text-white/80 font-light mt-2 text-xs md:text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0"></div>
                            <strong className="text-white flex-shrink-0 w-4">1</strong> 
                            <span>The Seed (Light latent)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#f5c842] flex-shrink-0"></div>
                            <strong className="text-white flex-shrink-0 w-4">2</strong> 
                            <span>The Rupture (Soil activation)</span>
                        </div>
                        
                        <div className="flex items-center gap-2 pl-[9px] border-l border-white/20 ml-[3px] py-1">
                            <strong className="text-[#00c8ff] flex-shrink-0">3 ↔ 4</strong> 
                            <span className="text-white/50 text-xs mx-1 whitespace-nowrap">1st Growth:</span> 
                            <span>The Search (Root) + The Cleanse (Path)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0"></div>
                            <strong className="text-white flex-shrink-0 w-4">5</strong> 
                            <span>The Trunk (Prophetic Alignment)</span>
                        </div>
                        
                        <div className="flex items-center gap-2 pl-[9px] border-l border-white/20 ml-[3px] py-1">
                            <strong className="text-[#4ade80] flex-shrink-0">6 ↔ 7</strong> 
                            <span className="text-white/50 text-xs mx-1 whitespace-nowrap">2nd Growth:</span> 
                            <span>The Branching + The Flowering</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></div>
                            <strong className="text-white flex-shrink-0 w-4">8</strong> 
                            <span>The Ripening (Boundary Lock)</span>
                        </div>
 
                        <div className="flex items-center gap-2 pl-[9px] border-l border-white/20 ml-[3px] py-1">
                            <strong className="text-[#f5c842] flex-shrink-0">9 ↔ 10</strong> 
                            <span className="text-white/50 text-xs mx-1 whitespace-nowrap">3rd Growth:</span> 
                            <span>The Harvest + The Pressing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0"></div>
                            <strong className="text-white flex-shrink-0 w-4">11</strong> 
                            <span>The Extraction (Essence emerges)</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white transition-shadow shadow-[0_0_8px_white] flex-shrink-0"></div>
                            <strong className="text-white flex-shrink-0 w-5">12</strong> 
                            <span>Illumination (The Oil of Light)</span>
                        </div>
                    </div>
                </div>
 
                <div className="space-y-2 pt-3 border-t border-white/10">
                    <h3 className="text-[#f5c842] font-bold text-sm uppercase tracking-wide">The Law of the Tree</h3>
                    <p className="text-white/60 italic text-xs md:text-sm leading-snug">All growth is the Seed resolving into Oil through the Trunk under the weight of the Harvest. The Soil burns, the Tree rises, the Light is revealed.</p>
                    <p className="text-[#4ade80] font-mono text-[10px] mt-2 font-bold tracking-tight bg-[#4ade80]/10 border border-[#4ade80]/20 p-2 rounded block">SEED → RUPTURE → SEARCH → TRUNK → BRANCHING → HARVEST → LIGHT (24:35)</p>
                </div>
            </div>

            <div className="space-y-4 mt-4 text-sm md:text-base">
                {treeTrines.map((trine, nodeIdx) => {
                    let labelColor = "text-gray-400";
                    let glowStyle = {};
                    if (nodeIdx <= 1) { labelColor = "text-blue-400"; glowStyle = { textShadow: '0 0 8px rgba(96, 165, 250, 0.4)' }; }
                    else if (nodeIdx <= 4) { labelColor = "text-cyan-400"; glowStyle = { textShadow: '0 0 8px rgba(34, 211, 238, 0.4)' }; }
                    else if (nodeIdx <= 6) { labelColor = "text-green-400"; glowStyle = { textShadow: '0 0 8px rgba(74, 222, 128, 0.4)' }; }
                    else if (nodeIdx === 7) { labelColor = "text-orange-400"; glowStyle = { textShadow: '0 0 8px rgba(251, 146, 60, 0.4)' }; }
                    else if (nodeIdx <= 10) { labelColor = "text-yellow-400"; glowStyle = { textShadow: '0 0 8px rgba(250, 204, 21, 0.4)' }; }
                    if (nodeIdx === 11) { labelColor = "text-white"; glowStyle = { textShadow: '0 0 8px rgba(255, 255, 255, 0.8)' }; }

                    return (
                    <div key={nodeIdx} className="bg-gray-900/40 border border-white/5 rounded-lg p-3 hover:border-white/10 transition-all group">
                        <div className="flex flex-col mb-3 pb-2 border-b border-white/10">
                            <span className={`text-sm md:text-base font-bold ${labelColor} tracking-widest uppercase`} style={glowStyle}>{nodeIdx + 1}. {TREE_LABELS[nodeIdx]}</span>
                            <span className="text-xs md:text-sm text-gray-400 italic mt-1 font-light">{TREE_EXPLANATIONS[nodeIdx]}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {trine.map((v, vIdx) => (
                                <div 
                                    key={vIdx} 
                                    className="relative flex flex-col items-center py-1.5 px-2 bg-black/60 border border-white/10 rounded group/input focus-within:border-cyan-500/50 focus-within:bg-cyan-900/10 transition-all"
                                >
                                    <input 
                                        type="text"
                                        value={localInputs[nodeIdx]?.[vIdx] || ''}
                                        onChange={(e) => handleLocalInputChange(nodeIdx, vIdx, e.target.value)}
                                        onDoubleClick={() => onVerseSelect(v.surah, v.ayah)}
                                        className="bg-transparent border-none p-0 font-mono text-cyan-400 text-sm md:text-base glow-text text-center w-full focus:ring-0 focus:outline-none cursor-text"
                                        placeholder="S:A"
                                        title="Double click to view verse"
                                    />
                                    <span className={`text-[9px] md:text-[10px] ${vIdx === 0 ? "text-orange-400" : vIdx === 1 ? "text-cyan-400" : "text-emerald-400"} font-bold uppercase pointer-events-none mt-1`}>
                                        {vIdx === 0 ? "V-1" : vIdx === 1 ? "Anchor" : "V+1"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )})}
            </div>

            {/* Verse-level Qun-Fayakun Divider */}
            <div className="flex items-center gap-x-2 my-8 opacity-60">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-pink-500/50"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Verse level Qun-Fayakun</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-pink-500/50 to-cyan-500/50"></div>
            </div>

            {/* Bulk Export & Root Control for Verse level Qun-Fayakun */}
            <div className="flex justify-end items-center mb-4 gap-2">
                <button 
                    onClick={() => onBulkExport(qunTrines.map(trine => `${trine[1].surah}:${trine[1].ayah}`))} 
                    className="text-[9px] sm:text-[10px] px-2 py-1.5 bg-gradient-to-r from-cyan-950/40 to-pink-950/40 border border-purple-500/30 rounded hover:border-purple-400/50 transition-colors text-white font-bold uppercase tracking-wider whitespace-nowrap"
                >
                    Export Anchors (6)
                </button>
                <button 
                    onClick={() => onBulkExport(qunTrines.flat().map(v => `${v.surah}:${v.ayah}`))} 
                    className="text-[9px] sm:text-[10px] px-2 py-1.5 bg-gradient-to-r from-cyan-950/40 to-pink-950/40 border border-purple-500/30 rounded hover:border-purple-400/50 transition-colors text-white font-bold uppercase tracking-wider whitespace-nowrap"
                >
                    Bulk Export (18)
                </button>
            </div>

            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-3">
                    <label className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 uppercase tracking-widest font-bold">Root Anchor Node 1</label>
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                        <button 
                            onClick={handleQunRandomVerse} 
                            className="p-2 bg-gray-800 hover:bg-purple-900/50 text-purple-400 rounded-lg transition-all border border-purple-500/20" 
                            title="Load Random Verse for Qun-Fayakun"
                        >
                            <ShuffleIcon />
                        </button>
                        <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1 rounded-lg border border-purple-500/20">
                            <button 
                                onClick={() => handleQunRootChange(-1)} 
                                className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md hover:bg-gray-700 text-white font-bold text-lg transition-colors"
                            >
                                -
                            </button>
                            <input 
                                type="text"
                                value={qunAddrInput}
                                onChange={handleQunInputChange}
                                onBlur={() => setQunAddrInput(`${qunRootVerse.surah}:${qunRootVerse.ayah}`)}
                                className="bg-transparent border-none p-0 font-mono text-purple-400 text-lg glow-text text-center w-20 focus:ring-0 focus:outline-none cursor-text font-bold"
                                placeholder="S:A"
                            />
                            <button 
                                onClick={() => handleQunRootChange(1)} 
                                className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md hover:bg-gray-700 text-white font-bold text-lg transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Explanation box for Verse-level Qun-Fayakun */}
            <div className="mb-6 p-4 bg-black/40 border border-purple-500/20 rounded-lg text-xs md:text-sm leading-relaxed space-y-3">
                <p className="text-white/90">
                    <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-bold font-mono">1 → 15:87 Sabʿan al-Mathānī / fractal of 7 ← 1</strong>: 
                    The zero-sum closed master integral <span className="font-mono text-cyan-300">∫₂⁷ (2↔3ₙ↔2 → 7) dx = up↑ − down↓ = 0</span>.
                    The dual bifurcation of <span className="font-mono text-pink-300">3ₙ = 2×3×2 = 12</span> forms the Tree of Life [1-12].
                </p>
                <p className="text-white/75 text-xs">
                    Three debit downstrokes (<strong className="text-cyan-400">Qun ▼</strong>: MuSolomon, Sacrifice, Life) are balanced one-for-one by three credit upstrokes (<strong className="text-pink-400">FayaQun ▲</strong>: Return, Ascend, Resurrection).
                    Mapped to 6 key nodes across the continuum, generating a trine of three verses for each node: 
                    <strong className="text-orange-400">V-1</strong>, the <strong className="text-cyan-400">Anchor</strong>, and <strong className="text-emerald-400">V+1</strong>.
                </p>
                <div className="bg-gradient-to-r from-cyan-950/20 to-pink-950/20 border border-purple-500/20 px-2.5 py-1.5 rounded text-[10px] text-purple-300 font-mono">
                    15:87 CYCLE: MUSOLOMON [▼ 3c] → RETURN [▲ 6b] → SACRIFICE [▼ 9a] → ASCEND [▲ 3c] → LIFE [▼ 6b] → RESURRECTION [▲ 9a] = 0
                </div>
            </div>

            {/* Grid of 6 Qun-Fayakun Nodes */}
            <div className="space-y-4 text-sm md:text-base mb-8">
                {qunTrines.map((trine, nodeIdx) => {
                    const labelColor = QUN_FAYAKUN_COLORS[nodeIdx];
                    const glowStyle = QUN_FAYAKUN_GLOWS[nodeIdx];
                    const isQunNode = QUN_FAYAKUN_LABELS[nodeIdx].includes("[Qun ▼]");
                    const activeBorderColor = isQunNode ? 'group-hover:border-cyan-500/30' : 'group-hover:border-pink-500/30';
                    const focusBorderColor = isQunNode ? 'focus-within:border-cyan-500/50 focus-within:bg-cyan-900/10' : 'focus-within:border-pink-500/50 focus-within:bg-pink-900/10';
                    const inputTextColor = isQunNode ? 'text-cyan-400' : 'text-pink-400';

                    return (
                        <div key={nodeIdx} className={`bg-gray-900/40 border border-white/5 rounded-lg p-3 hover:border-white/10 ${activeBorderColor} transition-all group`}>
                            <div className="flex flex-col mb-3 pb-2 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm md:text-base font-bold ${labelColor} tracking-widest uppercase`} style={glowStyle}>
                                        {nodeIdx + 1}. {QUN_FAYAKUN_LABELS[nodeIdx]}
                                    </span>
                                    <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold border ${isQunNode ? 'bg-cyan-950/40 text-cyan-400 border-cyan-500/20' : 'bg-pink-950/40 text-pink-400 border-pink-500/20'}`}>
                                        {isQunNode ? 'Implosion' : 'Explosion'}
                                    </span>
                                </div>
                                <span className="text-xs md:text-sm text-gray-400 italic mt-1 font-light font-sans">
                                    {QUN_FAYAKUN_EXPLANATIONS[nodeIdx]}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {trine.map((v, vIdx) => {
                                    const colLabel = vIdx === 0 ? "V-1" : vIdx === 1 ? "Anchor" : "V+1";
                                    const colColor = vIdx === 0 ? "text-orange-400" : vIdx === 1 ? "text-cyan-400" : "text-emerald-400";
                                    return (
                                        <div 
                                            key={vIdx} 
                                            className={`relative flex flex-col items-center py-1.5 px-2 bg-black/60 border border-white/10 rounded group/input ${focusBorderColor} transition-all`}
                                        >
                                            <input 
                                                type="text"
                                                value={qunLocalInputs[nodeIdx]?.[vIdx] || ''}
                                                onChange={(e) => handleQunLocalInputChange(nodeIdx, vIdx, e.target.value)}
                                                onDoubleClick={() => onVerseSelect(v.surah, v.ayah)}
                                                className={`bg-transparent border-none p-0 font-mono ${inputTextColor} text-sm md:text-base glow-text text-center w-full focus:ring-0 focus:outline-none cursor-text font-bold`}
                                                placeholder="S:A"
                                                title="Double click to view verse"
                                            />
                                            <span className={`text-[9px] md:text-[10px] ${colColor} font-bold uppercase pointer-events-none mt-1`}>
                                                {colLabel}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Memory of Light Divider */}
            <div className="flex items-center gap-x-2 my-8 opacity-60">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-200/50"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-purple-500">Memory of Light</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-200/50 to-amber-500/50"></div>
            </div>

            {/* Bulk Export & Root Control for Memory of Light */}
            <div className="flex justify-end items-center mb-4 gap-2">
                <button 
                    onClick={() => onBulkExport(molTrines.map(trine => `${trine[1].surah}:${trine[1].ayah}`))} 
                    className="text-[9px] sm:text-[10px] px-2 py-1.5 bg-gradient-to-r from-amber-950/40 to-yellow-950/40 border border-amber-500/30 rounded hover:border-amber-400/50 transition-colors text-amber-100 font-bold uppercase tracking-wider whitespace-nowrap"
                >
                    Export Anchors (7)
                </button>
                <button 
                    onClick={() => onBulkExport(molTrines.flat().map(v => `${v.surah}:${v.ayah}`))} 
                    className="text-[9px] sm:text-[10px] px-2 py-1.5 bg-gradient-to-r from-amber-950/40 to-yellow-950/40 border border-amber-500/30 rounded hover:border-amber-400/50 transition-colors text-amber-100 font-bold uppercase tracking-wider whitespace-nowrap"
                >
                    Bulk Export (21)
                </button>
            </div>

            <div className="bg-black/40 border border-amber-500/20 rounded-xl p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-3">
                    <label className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-purple-500 uppercase tracking-widest font-bold">Root Anchor Node 1</label>
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                        <button 
                            onClick={handleMolRandomVerse} 
                            className="p-2 bg-gray-800 hover:bg-amber-900/50 text-amber-400 rounded-lg transition-all border border-amber-500/20" 
                            title="Load Random Verse for Memory of Light"
                        >
                            <ShuffleIcon />
                        </button>
                        <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1 rounded-lg border border-amber-500/20">
                            <button 
                                onClick={() => handleMolRootChange(-1)} 
                                className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md hover:bg-gray-700 text-white font-bold text-lg transition-colors"
                            >
                                -
                            </button>
                            <input 
                                type="text"
                                value={molAddrInput}
                                onChange={handleMolInputChange}
                                onBlur={() => setMolAddrInput(`${molRootVerse.surah}:${molRootVerse.ayah}`)}
                                className="bg-transparent border-none p-0 font-mono text-amber-400 text-lg glow-text text-center w-20 focus:ring-0 focus:outline-none cursor-text font-bold"
                                placeholder="S:A"
                            />
                            <button 
                                onClick={() => handleMolRootChange(1)} 
                                className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md hover:bg-gray-700 text-white font-bold text-lg transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Explanation box for Memory of Light */}
            <div className="mb-6 p-4 bg-black/40 border border-amber-500/20 rounded-lg text-xs md:text-sm leading-relaxed space-y-3">
                <p className="text-white/90">
                    The <strong className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-purple-500 font-bold">Memory of Light</strong> represents a 7-point heptagram distribution.
                </p>
                <p className="text-white/75">
                    This distributes points evenly across the verse continuum. Each of the 7 nodes generates a trine of three verses corresponding to: 
                    <strong className="text-orange-400">V-1</strong>, the <strong className="text-cyan-400">Anchor</strong>, and <strong className="text-emerald-400">V+1</strong>.
                </p>
            </div>

            {/* Grid of 7 Memory of Light Nodes */}
            <div className="space-y-4 text-sm md:text-base mb-8">
                {molTrines.map((trine, nodeIdx) => {
                    return (
                        <div key={nodeIdx} className={`bg-gray-900/40 border border-white/5 rounded-lg p-3 hover:border-white/10 group-hover:border-amber-500/30 transition-all group`}>
                            <div className="flex flex-col mb-3 pb-2 border-b border-white/10">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span className={`text-[10px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap overflow-hidden text-ellipsis ${MOL_COLORS[nodeIdx]}`} style={{ textShadow: MOL_GLOWS[nodeIdx] }}>
                                        {nodeIdx + 1}. {MOL_LABELS[nodeIdx]}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {trine.map((v, vIdx) => {
                                    const colLabel = vIdx === 0 ? "V-1" : vIdx === 1 ? "Anchor" : "V+1";
                                    const colColor = vIdx === 0 ? "text-orange-400" : vIdx === 1 ? "text-cyan-400" : "text-emerald-400";
                                    return (
                                        <div 
                                            key={vIdx} 
                                            className={`relative flex flex-col items-center py-1.5 px-2 bg-black/60 border border-white/10 rounded group/input focus-within:border-amber-500/50 focus-within:bg-amber-900/10 transition-all`}
                                        >
                                            <input 
                                                type="text"
                                                value={molLocalInputs[nodeIdx]?.[vIdx] || ''}
                                                onChange={(e) => handleMolLocalInputChange(nodeIdx, vIdx, e.target.value)}
                                                onDoubleClick={() => onVerseSelect(v.surah, v.ayah)}
                                                className={`bg-transparent border-none p-0 font-mono text-amber-400 text-sm md:text-base glow-text text-center w-full focus:ring-0 focus:outline-none cursor-text font-bold`}
                                                placeholder="S:A"
                                                title="Double click to view verse"
                                            />
                                            <span className={`text-[9px] md:text-[10px] ${colColor} font-bold uppercase pointer-events-none mt-1`}>
                                                {colLabel}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`.glow-text { text-shadow: 0 0 5px currentColor; }`}</style>
        </div>
    );
};
