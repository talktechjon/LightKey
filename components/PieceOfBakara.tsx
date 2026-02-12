
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { SLICE_DATA, CHAPTER_DETAILS, MUQATTAT_LETTERS, MUQATTAT_CHAPTERS } from '../constants.ts';
import { getChapterIcon, colorScale } from '../utils.ts';

interface PieceOfBakaraProps {
  onVerseSelect: (surah: number, ayah: number) => void;
  onBulkExport: (verseIds: string[]) => void;
  bakaraSpineIndex: number;
  setBakaraSpineIndex: (index: number) => void;
}

/**
 * RoastedCattleSpine
 * Renders the structural "Spine" of the Quran as a symmetrical funnel silhouette.
 */
const RoastedCattleSpine: React.FC<{ currentIndex: number }> = ({ currentIndex }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const MAX_V = 286;
    const TOTAL_CH = 114;

    const symmetricalSlices = useMemo(() => {
        const sorted = [...SLICE_DATA].sort((a, b) => b.blockCount - a.blockCount);
        return sorted.map((slice, i) => {
            const offset = Math.ceil(i / 2);
            const side = i % 2 === 0 ? 1 : -1;
            const symIdx = i === 0 ? 0 : side * offset;
            return { ...slice, symIdx };
        });
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const centerX = w / 2;

        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.9;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';

        symmetricalSlices.forEach((slice) => {
            const x = centerX + (slice.symIdx / (TOTAL_CH / 2)) * (centerX * 0.92);
            const verseHeight = (slice.blockCount / MAX_V) * h;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, verseHeight);
            ctx.stroke();
        });

        ctx.shadowBlur = 0;
        const yPos = (currentIndex / MAX_V) * h;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(w, yPos);
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#f59e0b';

        symmetricalSlices.forEach((slice) => {
            if (slice.blockCount >= currentIndex) {
                const x = centerX + (slice.symIdx / (TOTAL_CH / 2)) * (centerX * 0.92);
                ctx.beginPath();
                ctx.arc(x, yPos, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        ctx.shadowBlur = 0;
    }, [currentIndex, symmetricalSlices]);

    useEffect(() => {
        draw();
    }, [draw]);

    return (
        <div className="relative w-full h-32 bg-black rounded-xl border border-zinc-700/60 overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,1)] mb-1">
            <canvas ref={canvasRef} width={300} height={150} className="w-full h-full" />
            <div className="absolute inset-x-0 h-[2px] pointer-events-none transition-all duration-300 z-20" style={{ top: `${(currentIndex / MAX_V) * 100}%`, transform: 'translateY(-50%)' }}>
                <div className="w-full h-full bg-amber-500/50 blur-[1px] animate-pulse" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-8 bg-amber-500 rounded-full blur-[2px]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-8 bg-amber-500 rounded-full blur-[2px]" />
            </div>
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-10" />
        </div>
    );
};

export const PieceOfBakara: React.FC<PieceOfBakaraProps> = ({ onVerseSelect, onBulkExport, bakaraSpineIndex, setBakaraSpineIndex }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInternalScroll = useRef(false);
    const [inputBuffer, setInputBuffer] = useState(bakaraSpineIndex.toString());
    const MAX_PIECES = 286;
    const ITEM_HEIGHT = 44; 

    const pieceStats = useMemo(() => {
        const stats = new Array(MAX_PIECES + 1).fill(0);
        for (let i = 1; i <= MAX_PIECES; i++) {
            stats[i] = SLICE_DATA.filter(s => s.blockCount >= i).length;
        }
        return stats;
    }, []);

    const matchingSurahs = useMemo(() => {
        return SLICE_DATA.filter(s => s.blockCount >= bakaraSpineIndex);
    }, [bakaraSpineIndex]);

    const muqattatMatches = useMemo(() => {
        return matchingSurahs
            .filter(s => MUQATTAT_CHAPTERS.has(s.id))
            .sort((a, b) => a.id - b.id);
    }, [matchingSurahs]);

    const muqattatListString = useMemo(() => {
        return muqattatMatches
            .map(s => MUQATTAT_LETTERS.get(s.id)?.join('') || '')
            .join(' - ');
    }, [muqattatMatches]);

    useEffect(() => {
        if (scrollRef.current && !isInternalScroll.current) {
            const targetTop = (bakaraSpineIndex - 1) * ITEM_HEIGHT;
            scrollRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
        if (document.activeElement?.id !== 'manual-tuner') {
            setInputBuffer(bakaraSpineIndex.toString());
        }
    }, [bakaraSpineIndex]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const index = Math.round(target.scrollTop / ITEM_HEIGHT) + 1;
        const clampedIndex = Math.max(1, Math.min(MAX_PIECES, index));
        if (clampedIndex !== bakaraSpineIndex) {
            isInternalScroll.current = true;
            setBakaraSpineIndex(clampedIndex);
            setTimeout(() => { isInternalScroll.current = false; }, 50);
        }
    }, [bakaraSpineIndex, setBakaraSpineIndex]);

    const commitValue = useCallback(() => {
        const parsed = parseInt(inputBuffer, 10);
        if (!isNaN(parsed)) {
            const clamped = Math.min(MAX_PIECES, Math.max(1, parsed));
            setBakaraSpineIndex(clamped);
            setInputBuffer(clamped.toString());
        } else {
            setInputBuffer(bakaraSpineIndex.toString());
        }
    }, [inputBuffer, bakaraSpineIndex, setBakaraSpineIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            commitValue();
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-right duration-500 font-sans select-none">
            <div className="space-y-3">
                <h2 className="text-2xl font-black text-amber-500 tracking-tighter uppercase italic">Piece of Heifer</h2>
                <div className="p-3.5 bg-amber-950/20 border-l-2 border-amber-500/50 rounded-r-xl shadow-lg">
                    <p className="text-[11px] text-amber-100/90 leading-relaxed italic font-serif">
                        <span className="font-bold text-amber-400 not-italic mr-1">2:73</span> 
                        — “So We said, ‘Strike HIM [i.e. YOU] with part of it [Any Part of Chapter 2].’ 
                        Thus Allah brings the dead to life and shows you His signs [Ayat] so that you may understand.”
                    </p>
                </div>
            </div>

            <div className="flex gap-4 h-[350px]">
                {/* VERTICAL SCROLLER */}
                <div className="w-1/3 relative h-full bg-[#050508] border-2 border-zinc-800 rounded-2xl overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-zinc-800/50 z-0" />
                    <div ref={scrollRef} onScroll={handleScroll} className="h-full overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth py-[153px]">
                        {Array.from({ length: MAX_PIECES }, (_, i) => i + 1).map((vNum) => {
                            const isActive = vNum === bakaraSpineIndex;
                            return (
                                <div key={vNum} className={`h-[44px] flex items-center justify-center snap-center transition-all duration-300 ${isActive ? 'opacity-0 scale-125' : 'opacity-20 blur-[0.5px]'}`}>
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-px bg-zinc-600 mb-1" />
                                        <span className="text-xl font-mono font-black text-zinc-400">{vNum.toString().padStart(3, '0')}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 h-[44px] -translate-y-1/2 pointer-events-none z-40 flex items-center justify-center">
                        <div className="absolute top-0 left-0 right-0 h-px bg-amber-500/60 shadow-[0_0_8px_#f59e0b]" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-500/60 shadow-[0_0_8px_#f59e0b]" />
                        <div className="w-full h-full bg-amber-500/20 backdrop-blur-[4px] border-x-2 border-amber-500/20 flex items-center justify-center">
                            <div className="flex items-baseline gap-2 font-mono whitespace-nowrap px-2">
                                <span className="text-2xl font-black tracking-tighter text-amber-400 tuner-glow-amber">{bakaraSpineIndex.toString().padStart(3, '0')}</span>
                                <span className="text-amber-500/50 text-base">|</span>
                                <span className="text-lg font-bold text-cyan-300 tuner-glow-cyan">{pieceStats[bakaraSpineIndex]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#050508] to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050508] to-transparent z-10 pointer-events-none" />
                </div>

                {/* STATS & INPUT PANEL */}
                <div className="flex-1 flex flex-col space-y-4 min-w-0">
                    <div className="bg-[#0a0a0c] border border-zinc-700/60 rounded-2xl p-4 shadow-2xl space-y-4 overflow-hidden">
                        <RoastedCattleSpine currentIndex={bakaraSpineIndex} />
                        
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-amber-500 tracking-widest uppercase mb-1 whitespace-nowrap">Piece #</span>
                                <div className="text-xl font-mono font-black text-white h-7 flex items-center tuner-glow-amber-light">
                                    {bakaraSpineIndex}
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-black text-cyan-400 tracking-widest uppercase mb-1 whitespace-nowrap">Aligned</span>
                                <div className="text-xl font-mono font-black text-cyan-300 h-7 flex items-center">
                                    {matchingSurahs.length}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="manual-tuner" className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Manual Tuner</label>
                        <input id="manual-tuner" type="text" inputMode="numeric" value={inputBuffer} onChange={(e) => setInputBuffer(e.target.value.replace(/[^0-9]/g, ''))} onBlur={commitValue} onKeyDown={handleKeyDown} placeholder="[ 000 ]" className="w-full bg-black border-2 border-zinc-700/50 rounded-xl px-4 py-2.5 text-center font-mono text-xl font-black text-amber-400 focus:border-amber-500/50 focus:bg-amber-950/10 outline-none transition-all tuner-glow-amber-light placeholder-zinc-800" />
                    </div>

                    <div className="flex-1 flex items-end">
                        <button onClick={() => onBulkExport(matchingSurahs.map(s => `${s.id}:${bakaraSpineIndex}`))} className="w-full py-3.5 bg-amber-500 text-black rounded-xl font-black uppercase text-xs tracking-widest hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 transition-all">Bulk View</button>
                    </div>
                </div>
            </div>

            {/* NEW MUQATTA'AT DATA ROW (SINGLE LINE, COPY-PASTEABLE) */}
            <div className="bg-fuchsia-950/20 border border-fuchsia-500/40 rounded-xl p-3 shadow-xl space-y-2.5">
                <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-black text-fuchsia-300 uppercase tracking-[0.2em]">Muqatta'at Alignment</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] text-fuchsia-400 font-bold uppercase">Chapters:</span>
                        <span className="bg-fuchsia-500/30 text-white font-mono font-black px-2 py-0.5 rounded text-xs border border-fuchsia-500/50">
                            {muqattatMatches.length}
                        </span>
                    </div>
                </div>
                <div className="bg-black/60 rounded-lg p-2.5 border border-white/5 shadow-inner">
                    <div 
                        className="text-[14px] font-mono text-fuchsia-200 whitespace-nowrap overflow-x-auto no-scrollbar select-all cursor-text text-right px-1" 
                        dir="rtl"
                        title="Click to select and copy the sequence"
                    >
                        {muqattatListString || <span className="text-zinc-700 italic opacity-40">∅ Null Set</span>}
                    </div>
                </div>
            </div>

            {/* RESULTS LIST */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] px-2 block">Frequency Connections</span>
                <div className="max-h-52 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                    {matchingSurahs.map((s) => {
                        const chapterInfo = CHAPTER_DETAILS.find(c => c.number === s.id);
                        if (!chapterInfo) return null;
                        const muqattat = MUQATTAT_LETTERS.get(s.id);
                        const icon = getChapterIcon(chapterInfo.revelationType);
                        const chapterColor = colorScale(s.id);

                        return (
                            <div key={s.id} onClick={() => onVerseSelect(s.id, bakaraSpineIndex)} className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-cyan-500/[0.07] hover:border-cyan-500/40 transition-all cursor-pointer">
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <img src={icon} alt="" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[13px] font-bold text-gray-100 group-hover:text-cyan-300 truncate" style={{ color: chapterColor }}>{chapterInfo.englishName}</span>
                                        <span className="text-[10px] text-zinc-500 font-mono uppercase font-black tracking-tight mt-0.5">Chapter #{s.id}</span>
                                    </div>
                                </div>
                                {muqattat && (
                                    <span className="font-mono text-lg text-white/40 group-hover:text-cyan-300/80 transition-colors muqattat-glow-small" dir="rtl">{muqattat.join('')}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .tuner-glow-amber { text-shadow: 0 0 12px rgba(245, 158, 11, 0.8), 0 0 24px rgba(245, 158, 11, 0.4); }
                .tuner-glow-amber-light { text-shadow: 0 0 10px rgba(245, 158, 11, 0.3); }
                .tuner-glow-cyan { text-shadow: 0 0 12px rgba(34, 211, 238, 0.8), 0 0 24px rgba(34, 211, 238, 0.4); }
                .muqattat-glow-small { text-shadow: 0 0 4px rgba(255,255,255,0.2); }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.3); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.5); }
                .dir-rtl { direction: rtl; }
            `}</style>
        </div>
    );
};
