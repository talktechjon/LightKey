import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, StepForward, RotateCcw, Activity, Disc, Sparkles, Binary } from 'lucide-react';

const PHASES = [
    'Death ↓',
    'Return ↑',
    'Sacrifice ↓',
    'Ascend ↑',
    'Life ↓',
    'Resurrection ↑'
];

const NAMES = [
    'Islam',
    'Ibrahim',
    'Muhammad',
    'Isa · Ahmed',
    'Quran',
    'Mursalin',
    'Abd'
];

// Precompute 120 decimals of π using Machin-like formula
function computePiDigits(n: number): string {
    const U = 10n ** BigInt(n + 10);
    const at = (x: number) => {
        let t = U / BigInt(x), s = t, x2 = BigInt(x * x), i = 1n, g = -1n;
        while (t > 0n) {
            t /= x2;
            i += 2n;
            s += g * (t / i);
            g = -g;
        }
        return s;
    };
    return ((16n * at(5) - 4n * at(239)) / 10n ** 10n).toString();
}

const PI_STRING = computePiDigits(120);

// Archimedean polygon side doubling
function calcPolygonEst(k: number): [number, number] {
    let s = 1, n = 6;
    for (let i = 0; i < k; i++) {
        s = s / Math.sqrt(2 + Math.sqrt(4 - s * s));
        n *= 2;
    }
    return [n, (n * s) / 2];
}

// Continued fraction representation for π
function calcCfrac(): string {
    let x = Math.PI, a: number[] = [], p0 = 1, q0 = 0, p1 = Math.floor(x), q1 = 1;
    a.push(p1);
    let r = x - p1;
    const cv = [p1 + '/1'];
    for (let i = 0; i < 4; i++) {
        r = 1 / r;
        const t = Math.floor(r);
        a.push(t);
        r -= t;
        const p = t * p1 + p0, q = t * q1 + q0;
        p0 = p1; q0 = q1; p1 = p; q1 = q;
        cv.push(p + '/' + q);
    }
    return '[' + a[0] + '; ' + a.slice(1).join(', ') + '] → ' + cv.slice(1, 3).join(', ');
}

export const SabAnAlMathaniPiBreathVisual: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(1);

    // Continuous breathing variable u (each unit = 1 phase, 6 phases = 1 cycle)
    const uRef = useRef(0);
    const isPlayingRef = useRef(isPlaying);
    const speedRef = useRef(speed);
    const lastTimeRef = useRef(0);
    const upAccumRef = useRef(0);
    const dnAccumRef = useRef(0);
    const prevWaveRef = useRef(0.5 * Math.cos(0) - 0.5);

    // UI snapshot state updated on animation frames
    const [stats, setStats] = useState({
        cycle: 0,
        phase: 0,
        pe: 50,
        ke: 50,
        up: '0.00',
        dn: '0.00',
        net: '0.00',
        kept: '+0',
        sides: 6,
        perimeter: Math.PI.toFixed(12),
        matchingDigits: 1,
        piDigitsStr: '3.',
        lastDigit: '1',
        discoveredNames: [] as string[],
        statusMsg: 'Cycle 0: Kun. Six phases run, net zero.'
    });

    const canvasTreeRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCircleRef = useRef<HTMLCanvasElement | null>(null);

    const continuedFraction = useRef(calcCfrac()).current;

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    // Wave calculation
    const waveAt = (v: number) => 0.5 * Math.cos(Math.PI * v) - 0.5;

    // Canvas drawing helpers
    const drawTree = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, depth: number, wave: number) => {
        ctx.clearRect(0, 0, w, h);
        const woodColor = '#b08968';
        const leafColor = '#4ade80';
        const leafAlpha = Math.max(0, 1 + wave);
        const spread = 0.46 + 0.08 * (wave + 1);
        const scaleK = 1 + 0.07 * wave;

        const drawBranch = (x: number, y: number, len: number, angle: number, d: number, dep: number) => {
            const nx = x + Math.sin(angle) * len;
            const ny = y - Math.cos(angle) * len;

            ctx.strokeStyle = woodColor;
            ctx.lineWidth = Math.max(0.7, d * 0.9);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
            ctx.stroke();

            if (d <= 0) {
                ctx.globalAlpha = Math.max(0.1, leafAlpha) * 0.85;
                ctx.fillStyle = leafColor;
                ctx.beginPath();
                ctx.arc(nx, ny, depth > 7 ? 2 : 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
                return;
            }

            const l = len * 0.76 * scaleK;
            drawBranch(nx, ny, l, angle - spread, d - 1, dep + 1);
            drawBranch(nx, ny, l, angle + spread, d - 1, dep + 1);
        };

        const baseLen = h * 0.22 * Math.pow(0.9, Math.max(0, depth - 4));
        drawBranch(w / 2, h - 8, Math.max(baseLen, h * 0.1) * scaleK, 0, depth, 0);
    }, []);

    const drawCircle = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, cycle: number, fraction: number) => {
        ctx.clearRect(0, 0, w, h);
        const R = Math.min(w, h) / 2 - 16;
        const cx = w / 2;
        const cy = h / 2;
        const kk = Math.min(cycle, 13);
        const N = 6 * (2 ** kk);

        // Circular boundary ring
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.stroke();

        const drawCount = Math.min(N, 360);
        const isDense = N <= 360;
        const rc = Math.cos(Math.PI / N);
        const r2 = rc + (1 - rc) * fraction;

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        const pts: [number, number][] = [];
        if (!isDense) {
            for (let i = 0; i < drawCount; i++) {
                const a = -Math.PI / 2 + (i * 2 * Math.PI) / drawCount;
                pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
            }
        } else {
            for (let i = 0; i < 2 * N; i++) {
                const a = -Math.PI / 2 + (i * Math.PI) / N;
                const r = i % 2 ? r2 : 1;
                pts.push([cx + R * r * Math.cos(a), cy + R * r * Math.sin(a)]);
            }
        }

        pts.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p[0], p[1]);
            else ctx.lineTo(p[0], p[1]);
        });
        ctx.closePath();
        ctx.stroke();

        // Highlight nodes
        if (isDense && N <= 96) {
            ctx.fillStyle = '#f59e0b'; // Amber midpoint push
            pts.forEach((p, i) => {
                if (i % 2) {
                    ctx.beginPath();
                    ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            ctx.fillStyle = '#06b6d4'; // Cyan fixed vertex
            pts.forEach((p, i) => {
                if (!(i % 2)) {
                    ctx.beginPath();
                    ctx.arc(p[0], p[1], 2.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }
    }, []);

    // Main animation loop
    useEffect(() => {
        let animationFrameId: number;

        const loop = (timestamp: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const dt = Math.min(0.05, (timestamp - lastTimeRef.current) / 1000);
            lastTimeRef.current = timestamp;

            if (isPlayingRef.current) {
                uRef.current += dt * speedRef.current * 0.6;
            }

            const u = uRef.current;
            const cycle = Math.floor(u / 6);
            const phase = Math.floor(((u % 6) + 6) % 6);
            const w = waveAt(u);
            const f = 0.5 - 0.5 * Math.cos(Math.PI * u);

            // Energy accumulation
            const dw = w - prevWaveRef.current;
            if (dw > 0) upAccumRef.current += dw;
            else dnAccumRef.current -= dw;
            prevWaveRef.current = w;

            const peVal = 100 * (1 - f);
            const keVal = 100 * f;

            const uc = upAccumRef.current - cycle * 3;
            const dc = dnAccumRef.current - cycle * 3;
            const netVal = uc - dc;

            const [numSides, estPi] = calcPolygonEst(Math.min(cycle, 13));
            const estStr = estPi.toFixed(15);
            const trueStr = Math.PI.toFixed(15);
            let matchCount = 0;
            while (matchCount < estStr.length && estStr[matchCount] === trueStr[matchCount]) {
                matchCount++;
            }
            const matchingDigits = Math.max(0, matchCount - (estStr[1] === '.' ? 1 : 0));

            const digitsCount = Math.min(cycle + 1, PI_STRING.length);
            const fullPiSlice = PI_STRING.slice(0, digitsCount);
            const lastDig = digitsCount > 1 ? fullPiSlice[digitsCount - 1] : '3';

            const activeNames: string[] = [];
            for (let i = 0; i < cycle; i++) {
                activeNames.push(i < 7 ? NAMES[i] : `Name ${i + 1}`);
            }

            const status = cycle === 0
                ? 'Cycle 0: Kun. Six phases run, net zero.'
                : cycle % 7 === 0
                    ? `Cycle ${cycle}: Sabʿ closed (7 names complete). The loop never stops; the next name brings the next digit of π.`
                    : `Cycle ${cycle}: net zero, +1 kept. Name "${activeNames[cycle - 1] || 'Kun'}" joins and digit #${cycle} of π appears.`;

            // Draw canvases
            if (canvasTreeRef.current) {
                const canvas = canvasTreeRef.current;
                const dpr = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();
                if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;
                }
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.save();
                    ctx.scale(dpr, dpr);
                    drawTree(ctx, rect.width, rect.height, Math.min(cycle + 2, 11), w);
                    ctx.restore();
                }
            }

            if (canvasCircleRef.current) {
                const canvas = canvasCircleRef.current;
                const dpr = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();
                if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;
                }
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.save();
                    ctx.scale(dpr, dpr);
                    drawCircle(ctx, rect.width, rect.height, cycle, 0.5 - 0.5 * Math.cos(Math.PI * ((u % 6) / 6)));
                    ctx.restore();
                }
            }

            setStats({
                cycle,
                phase,
                pe: peVal,
                ke: keVal,
                up: upAccumRef.current.toFixed(2),
                dn: dnAccumRef.current.toFixed(2),
                net: netVal.toFixed(2),
                kept: `+${cycle}`,
                sides: numSides,
                perimeter: estPi.toFixed(12),
                matchingDigits,
                piDigitsStr: digitsCount > 1 ? `3.${fullPiSlice.slice(1, -1)}` : '3.',
                lastDigit: lastDig,
                discoveredNames: activeNames,
                statusMsg: status
            });

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [drawTree, drawCircle]);

    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleStepOne = () => {
        setIsPlaying(false);
        uRef.current = Math.floor(uRef.current) + 1;
    };

    const handleReset = () => {
        uRef.current = 0;
        upAccumRef.current = 0;
        dnAccumRef.current = 0;
        prevWaveRef.current = waveAt(0);
    };

    return (
        <div className="relative w-full flex flex-col my-8 bg-black/70 border border-cyan-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden select-none backdrop-blur-xl">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-2 mb-6 z-10 w-full">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sabʿan al-Mathānī Simulation • Pi Values As Breath</span>
                </div>
                <h3 className="text-xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-pink-300 font-serif tracking-wide">
                    Sabʿan al-Mathānī in Motion (15:87)
                </h3>
                <p className="text-xs text-gray-300 font-mono max-w-2xl leading-relaxed">
                    1 → D10 (n/2) ↔ 3ₙ Tree ↔ I9 (+1) → 7 ← 1. Each 3ₙ cycle swaps energy up and down to zero, then keeps +1: one more branch level, one more halving of the circle's angle, one more decimal of π, one new name.
                </p>
            </div>

            {/* Control Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 z-10 mb-6 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                        onClick={handlePlayPause}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border shadow-lg ${
                            isPlaying
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 shadow-amber-500/10'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30 shadow-cyan-500/10'
                        }`}
                        title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
                    >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </button>

                    <button
                        onClick={handleStepOne}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-gray-300 bg-gray-900/80 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                        title="Advance one phase"
                    >
                        <StepForward className="w-3.5 h-3.5" />
                        <span>Step Phase</span>
                    </button>

                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-gray-400 bg-gray-900/50 border border-white/10 hover:border-pink-500/40 hover:text-pink-300 transition-all"
                        title="Reset simulation to cycle 0"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                    </button>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                    <label className="flex items-center gap-2 text-xs font-mono text-gray-400">
                        <span>Speed:</span>
                        <input
                            type="range"
                            min="0.2"
                            max="4"
                            step="0.1"
                            value={speed}
                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                            className="w-24 accent-cyan-400 cursor-pointer"
                        />
                        <span className="text-cyan-300 font-bold w-8 text-right">{speed.toFixed(1)}x</span>
                    </label>

                    <div className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[11px] font-mono text-cyan-400">
                        Cycle: <b className="text-white">{stats.cycle}</b> <span className="text-gray-500">|</span> Kept: <b className="text-amber-300">{stats.kept}</b>
                    </div>
                </div>
            </div>

            {/* 3-Column Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 z-10 w-full mb-5">
                {/* Card 1: 3n Tree */}
                <div className="bg-gray-950/70 border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between shadow-lg backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                            <h4 className="text-sm font-bold text-gray-100 font-serif flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                3ₙ Tree (The Container)
                            </h4>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                                Depth: {Math.min(stats.cycle + 2, 11)}
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug mb-3">
                            Sap level swings ↓↑ six times and nets zero. Each completed cycle adds one level of branching.
                        </p>
                    </div>

                    <div className="relative w-full h-56 bg-black/60 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center my-1">
                        <canvas ref={canvasTreeRef} className="w-full h-full block" />
                    </div>

                    {/* 6 Phase Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/5">
                        {PHASES.map((p, idx) => {
                            const isActive = idx === stats.phase;
                            const isDown = p.includes('↓');
                            return (
                                <span
                                    key={idx}
                                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all duration-200 ${
                                        isActive
                                            ? isDown
                                                ? 'bg-cyan-500 text-black font-black border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                                                : 'bg-pink-500 text-white font-black border-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                                            : 'bg-black/40 text-gray-400 border-white/10'
                                    }`}
                                >
                                    {p}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Card 2: n/2 Executes (D10) */}
                <div className="bg-gray-950/70 border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between shadow-lg backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                            <h4 className="text-sm font-bold text-gray-100 font-serif flex items-center gap-1.5">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                n/2 Executes (D10)
                            </h4>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
                                d/dt = 0
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug mb-3">
                            Total n stays fixed while split swaps between potential and kinetic. Averaged over time each side is n/2.
                        </p>
                    </div>

                    {/* Twin Energy Bar */}
                    <div className="my-2 p-3 bg-black/60 rounded-xl border border-white/5 space-y-2">
                        <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-cyan-400">Potential: <b>{stats.pe.toFixed(1)}%</b></span>
                            <span className="text-amber-400">Kinetic: <b>{stats.ke.toFixed(1)}%</b></span>
                        </div>
                        <div className="h-6 w-full bg-gray-900 rounded-lg overflow-hidden flex border border-white/10 p-0.5">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-l-md transition-all duration-75"
                                style={{ width: `${stats.pe}%` }}
                            />
                            <div
                                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-r-md transition-all duration-75"
                                style={{ width: `${stats.ke}%` }}
                            />
                        </div>
                    </div>

                    {/* Stats Table */}
                    <table className="w-full text-[11px] font-mono text-gray-300 border-collapse mt-2">
                        <tbody>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">total n (d/dt = 0)</td>
                                <td className="py-1 text-right font-bold text-white">100</td>
                            </tr>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">up ↑ so far</td>
                                <td className="py-1 text-right font-bold text-pink-400">{stats.up}</td>
                            </tr>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">down ↓ so far</td>
                                <td className="py-1 text-right font-bold text-cyan-400">{stats.dn}</td>
                            </tr>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">net ∫ in this cycle</td>
                                <td className="py-1 text-right font-bold text-emerald-400">{stats.net}</td>
                            </tr>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">kept per cycle (+1)</td>
                                <td className="py-1 text-right font-bold text-amber-300">{stats.kept}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-gray-400 text-center italic bg-cyan-950/20 py-1 rounded">
                        f(x) = ax³ + bx² + cx + d • f′ drops d, ∫ returns d
                    </div>
                </div>

                {/* Card 3: Circle Closes, π Never Ends (I9) */}
                <div className="bg-gray-950/70 border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between shadow-lg backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                            <h4 className="text-sm font-bold text-gray-100 font-serif flex items-center gap-1.5">
                                <Disc className="w-4 h-4 text-amber-400" />
                                Circle Closes, π Never Ends (I9)
                            </h4>
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/20">
                                6 × 2ⁿ
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug mb-3">
                            Starts with hexagon (6 phases). Each cycle halves the angle, pushing midpoints out to double sides.
                        </p>
                    </div>

                    <div className="relative w-full h-56 bg-black/60 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center my-1">
                        <canvas ref={canvasCircleRef} className="w-full h-full block" />
                    </div>

                    {/* Polygon Table */}
                    <table className="w-full text-[11px] font-mono text-gray-300 border-collapse mt-2">
                        <tbody>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">polygon sides</td>
                                <td className="py-1 text-right font-bold text-cyan-300">{stats.sides} → {stats.sides * 2}</td>
                            </tr>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">perimeter ÷ diameter</td>
                                <td className="py-1 text-right font-bold text-amber-300 truncate max-w-[140px]">{stats.perimeter}</td>
                            </tr>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">digits matching π</td>
                                <td className="py-1 text-right font-bold text-emerald-400">{stats.matchingDigits}</td>
                            </tr>
                            <tr className="border-t border-white/5">
                                <td className="py-1 text-gray-400">continued fraction</td>
                                <td className="py-1 text-right font-bold text-purple-300 text-[10px]">{continuedFraction}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Wide Card: One New Name, One New Decimal */}
            <div className="z-10 w-full bg-gray-950/80 border border-cyan-500/25 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                        <h4 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-cyan-300 font-serif flex items-center gap-2">
                            <Binary className="w-4 h-4 text-amber-400" />
                            One New Name, One New Decimal (π Stream)
                        </h4>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                            Each cycle ends with a new name and the next digit of π joins the stream. The circle is already closed; the digits keep arriving.
                        </p>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/20 shrink-0">
                        π Decimal Index: <b className="text-white">#{stats.cycle}</b>
                    </div>
                </div>

                {/* Digits Display */}
                <div className="p-3.5 bg-black/70 rounded-xl border border-white/10 font-mono text-lg sm:text-2xl font-bold tracking-wider text-gray-200 break-all select-all shadow-inner">
                    <span className="text-cyan-400">{stats.piDigitsStr}</span>
                    <span className="text-amber-400 underline decoration-2 underline-offset-4 animate-pulse bg-amber-500/20 px-1 rounded">
                        {stats.lastDigit}
                    </span>
                    <span className="text-gray-600 text-sm font-normal ml-2">...</span>
                </div>

                {/* Discovered Name Chips */}
                <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                        Sabʿan al-Mathānī Discovered Names (15:87 Cycle):
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {stats.discoveredNames.length > 0 ? (
                            stats.discoveredNames.map((name, i) => {
                                const isLatest = i === stats.discoveredNames.length - 1;
                                return (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 rounded-full text-xs font-mono font-medium border transition-all ${
                                            isLatest
                                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                                                : 'bg-black/50 text-gray-300 border-white/10'
                                        }`}
                                    >
                                        {name}
                                    </span>
                                );
                            })
                        ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                                1 [Kun] — Inception State
                            </span>
                        )}
                    </div>
                </div>

                {/* Live Cycle Narrative Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/30 via-black to-amber-950/30 border border-white/10 text-xs font-mono text-cyan-200">
                    {stats.statusMsg}
                </div>
            </div>
        </div>
    );
};
