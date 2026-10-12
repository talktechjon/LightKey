import React from 'react';
import { TOTAL_VERSES, CHAPTER_DETAILS } from '../constants.ts';
import { refVerse, unrefVerse } from './LightInDropCenter.tsx';
import { Droplet, BookOpen, Sparkles, Send, RefreshCw, ArrowRight } from 'lucide-react';

interface LightInDropSideBarProps {
    entryVerse: number;
    setEntryVerse: (v: number) => void;
    angleI: number;
    setAngleI: (i: number) => void;
    refractiveIndex: number;
    setRefractiveIndex: (n: number) => void;
    reflectionsK: number;
    setReflectionsK: (k: number) => void;
    dispersionMult: number;
    setDispersionMult: (d: number) => void;
    snapToWhole: boolean;
    setSnapToWhole: (s: boolean) => void;
    showColors: boolean;
    setShowColors: (c: boolean) => void;
    onVerseSelect: (surah: number, ayah: number) => void;
    onBulkExport: (verseIds: string[]) => void;
}

const rad = (d: number) => d * Math.PI / 180;
const deg = (r: number) => r * 180 / Math.PI;
const rOf = (i: number, n: number) => deg(Math.asin(Math.min(1, Math.sin(rad(i)) / n)));

export const LightInDropSideBar: React.FC<LightInDropSideBarProps> = ({
    entryVerse,
    setEntryVerse,
    angleI,
    setAngleI,
    refractiveIndex,
    setRefractiveIndex,
    reflectionsK,
    setReflectionsK,
    dispersionMult,
    setDispersionMult,
    snapToWhole,
    setSnapToWhole,
    showColors,
    setShowColors,
    onVerseSelect,
    onBulkExport
}) => {
    const N = TOTAL_VERSES; // 6236

    // Calculate physics values
    let i = angleI;
    let r = rOf(i, refractiveIndex);
    let sf = N * (180 - 2 * r) / 360;
    let s = sf;

    if (snapToWhole) {
        const rmax = deg(Math.asin(1 / refractiveIndex));
        const smin = Math.ceil(N * (180 - 2 * rmax) / 360);
        s = Math.max(smin, Math.min(N / 2, Math.round(sf)));
        r = (180 - 360 * s / N) / 2;
        i = deg(Math.asin(Math.min(1, refractiveIndex * Math.sin(rad(r)))));
    }

    const gapDeg = 180 - 2 * r;
    const gapVerses = (N * gapDeg / 360);

    // Generate batch points in chord order
    const pts: number[] = [];
    for (let j = 0; j <= reflectionsK + 1; j++) {
        const num = ((Math.round(entryVerse + j * gapVerses) - 1) % N + N) % N + 1;
        pts.push(num);
    }

    const batchVerseStrings = pts.map(refVerse);

    // Rainbow angle computation
    const handleSetRainbowAngle = () => {
        if (reflectionsK < 1) return;
        const val = (refractiveIndex * refractiveIndex - 1) / ((reflectionsK + 1) * (reflectionsK + 1) - 1);
        if (val >= 0 && val <= 1) {
            const rainbowI = deg(Math.acos(Math.sqrt(val)));
            setAngleI(parseFloat(rainbowI.toFixed(2)));
        }
    };

    const handleEntryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = unrefVerse(e.target.value);
        if (val !== null) {
            setEntryVerse(val);
        }
    };

    const handleSendBatchToReader = () => {
        if (batchVerseStrings.length > 0) {
            onBulkExport(batchVerseStrings);
        }
    };

    const getRole = (j: number) => {
        if (j === 0) return 'Entry (Incident)';
        if (j === reflectionsK + 1) return 'Exit (Refracted)';
        return `Internal Reflection ${j}`;
    };

    return (
        <div className="flex flex-col gap-6 text-gray-200 font-mono text-xs select-none pb-12">
            {/* Header */}
            <div className="flex items-center gap-x-3 px-2 pb-2 border-b border-cyan-500/20">
                <div className="w-10 h-10 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Droplet className="w-5 h-5 fill-cyan-400/20" />
                </div>
                <div>
                    <h2 className="text-cyan-300 font-black text-xl uppercase tracking-wider leading-none font-serif">
                        Light in Drop
                    </h2>
                    <p className="text-cyan-500/80 text-[10px] uppercase font-bold tracking-widest mt-1">
                        Spherical Droplet Ring • 6,236 Verses
                    </p>
                </div>
            </div>

            {/* Prominent Action Button: SEND BATCH TO READER */}
            <div className="bg-gradient-to-r from-cyan-950/60 via-black to-sky-950/60 p-4 rounded-2xl border border-cyan-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        Verse Batch Generator ({pts.length} Nodes)
                    </span>
                    <span className="text-[10px] text-gray-400">
                        {reflectionsK} bounce{reflectionsK !== 1 ? 's' : ''}
                    </span>
                </div>

                <button
                    onClick={handleSendBatchToReader}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-black font-black font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all cursor-pointer active:scale-98"
                    title="Send generated batch of verses to Reader in exact ray order"
                >
                    <Send className="w-4 h-4" />
                    <span>Send Batch to Reader (Verse Finder)</span>
                </button>

                <p className="text-[10px] text-cyan-200/70 text-center leading-relaxed">
                    Loads all {pts.length} reflection verses in order: <b className="text-white">{batchVerseStrings.join(', ')}</b>
                </p>
            </div>

            {/* Single Chain Flow */}
            <div className="p-3.5 bg-black/60 rounded-xl border border-white/10 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                    <span>Reflection Chain Order:</span>
                    <span className="text-cyan-400">{gapVerses.toFixed(1)} verses/chord</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {batchVerseStrings.map((vStr, idx) => {
                        const [s, a] = vStr.split(':').map(Number);
                        const isEntry = idx === 0;
                        const isExit = idx === batchVerseStrings.length - 1;
                        return (
                            <React.Fragment key={idx}>
                                <button
                                    onClick={() => onVerseSelect(s, a)}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all hover:scale-105 cursor-pointer ${
                                        isEntry
                                            ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                                            : isExit
                                                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                                                : 'bg-amber-950/50 text-amber-300 border-amber-500/30'
                                    }`}
                                    title={`Click to view ${vStr} in Reader`}
                                >
                                    {vStr}
                                </button>
                                {idx < batchVerseStrings.length - 1 && (
                                    <ArrowRight className="w-3 h-3 text-gray-600 shrink-0" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Connected Pairs Breakdown */}
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Connected Chords:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                    {pts.slice(0, -1).map((p, idx) => (
                        <div key={idx} className="p-2 rounded bg-gray-950/60 border border-white/5 flex items-center justify-between">
                            <span className="text-cyan-400 font-bold">{refVerse(p)}</span>
                            <span className="text-gray-500">↔</span>
                            <span className="text-amber-400 font-bold">{refVerse(pts[idx + 1])}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Reflection Table */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60">
                <table className="w-full text-left text-[10px] font-mono">
                    <thead>
                        <tr className="bg-cyan-950/40 border-b border-white/10 text-cyan-300 font-bold">
                            <th className="p-2">#</th>
                            <th className="p-2">Verse</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Chapter</th>
                            <th className="p-2 text-right">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                        {pts.map((p, idx) => {
                            const [s, a] = refVerse(p).split(':').map(Number);
                            const chName = CHAPTER_DETAILS[s - 1]?.englishName || '';
                            const isEntry = idx === 0;
                            const isExit = idx === pts.length - 1;
                            return (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    <td className="p-2 font-bold text-gray-500">{idx}</td>
                                    <td className="p-2 font-bold text-white">{refVerse(p)}</td>
                                    <td className="p-2">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                                            isEntry ? 'bg-cyan-900/40 text-cyan-300' : isExit ? 'bg-emerald-900/40 text-emerald-300' : 'bg-amber-900/40 text-amber-300'
                                        }`}>
                                            {getRole(idx)}
                                        </span>
                                    </td>
                                    <td className="p-2 text-gray-400 truncate max-w-[90px]">{chName}</td>
                                    <td className="p-2 text-right">
                                        <button
                                            onClick={() => onVerseSelect(s, a)}
                                            className="px-2 py-0.5 rounded bg-cyan-950 hover:bg-cyan-800 text-cyan-300 border border-cyan-500/30 text-[9px]"
                                        >
                                            <BookOpen className="w-3 h-3 inline" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Physical Controls Deck */}
            <div className="p-4 bg-gray-950/80 rounded-2xl border border-cyan-500/20 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block pb-1 border-b border-white/10">
                    Droplet Optics Parameters
                </span>

                {/* Entry Verse */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                        <label className="text-gray-400">Entry Verse (1:1 → 114:6):</label>
                        <input
                            type="text"
                            defaultValue={refVerse(entryVerse)}
                            key={entryVerse}
                            onBlur={handleEntryInputChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleEntryInputChange(e as any); }}
                            className="w-16 px-1.5 py-0.5 rounded bg-black border border-cyan-500/40 text-white font-bold text-center text-xs focus:outline-none focus:border-cyan-400"
                        />
                    </div>
                    <input
                        type="range"
                        min="1"
                        max={N}
                        value={entryVerse}
                        onChange={(e) => setEntryVerse(parseInt(e.target.value, 10))}
                        className="w-full accent-cyan-400 cursor-pointer"
                    />
                </div>

                {/* Angle of incidence i */}
                <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                        <label className="text-gray-400">Angle of Incidence (i):</label>
                        <b className="text-cyan-300">{angleI.toFixed(2)}°</b>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="89.9"
                        step="0.01"
                        value={angleI}
                        onChange={(e) => setAngleI(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                    />
                </div>

                {/* Rainbow Angle Button */}
                <button
                    onClick={handleSetRainbowAngle}
                    className="w-full py-2 px-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10.5px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    title="Calculate and snap to Descartes rainbow angle for order k"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Snap to Rainbow Angle ({reflectionsK} Reflections)</span>
                </button>

                {/* Refractive index n */}
                <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                        <label className="text-gray-400">Refractive Index (n):</label>
                        <b className="text-pink-300">{refractiveIndex.toFixed(3)} (Water ≈ 1.333)</b>
                    </div>
                    <input
                        type="range"
                        min="1.2"
                        max="2"
                        step="0.001"
                        value={refractiveIndex}
                        onChange={(e) => setRefractiveIndex(parseFloat(e.target.value))}
                        className="w-full accent-pink-400 cursor-pointer"
                    />
                </div>

                {/* Internal reflections k */}
                <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                        <label className="text-gray-400">Internal Reflections (k):</label>
                        <b className="text-amber-300">{reflectionsK}</b>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="6"
                        step="1"
                        value={reflectionsK}
                        onChange={(e) => setReflectionsK(parseInt(e.target.value, 10))}
                        className="w-full accent-amber-400 cursor-pointer"
                    />
                </div>

                {/* Dispersion Multiplier */}
                {showColors && (
                    <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                            <label className="text-gray-400">Dispersion Scale (×):</label>
                            <b className="text-purple-300">{dispersionMult.toFixed(1)}</b>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={dispersionMult}
                            onChange={(e) => setDispersionMult(parseFloat(e.target.value))}
                            className="w-full accent-purple-400 cursor-pointer"
                        />
                    </div>
                )}

                {/* Checkboxes */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                    <label className="flex items-center gap-2 text-[11px] text-gray-300 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={snapToWhole}
                            onChange={(e) => setSnapToWhole(e.target.checked)}
                            className="accent-cyan-400 rounded cursor-pointer"
                        />
                        <span>Snap chord gap to whole verses</span>
                    </label>

                    <label className="flex items-center gap-2 text-[11px] text-gray-300 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showColors}
                            onChange={(e) => setShowColors(e.target.checked)}
                            className="accent-cyan-400 rounded cursor-pointer"
                        />
                        <span>Show chromatic dispersion (400–700 nm)</span>
                    </label>
                </div>
            </div>
        </div>
    );
};
