import React, { useRef, useEffect, useCallback } from 'react';
import { TOTAL_VERSES, CUMULATIVE_VERSES, BUBBLE_BLOCK_MAPPING_RAW } from '../constants.ts';
import { Compass } from 'lucide-react';

interface LightInDropCenterProps {
    entryVerse: number;
    setEntryVerse: (v: number) => void;
    angleI: number;
    setAngleI: (i: number) => void;
    refractiveIndex: number;
    reflectionsK: number;
    dispersionMult: number;
    snapToWhole: boolean;
    showColors: boolean;
    onVerseSelect: (surah: number, ayah: number) => void;
}

const PI = Math.PI;
const rad = (d: number) => d * PI / 180;
const deg = (r: number) => r * 180 / PI;
const N = TOTAL_VERSES; // 6236

// Convert global verse index 1..6236 to Surah:Ayah address
export function refVerse(n: number): string {
    const norm = ((n - 1) % N + N) % N + 1;
    for (let i = 1; i <= 114; i++) {
        if (CUMULATIVE_VERSES[i] >= norm) {
            return `${i}:${norm - CUMULATIVE_VERSES[i - 1]}`;
        }
    }
    return '1:1';
}

// Convert "X:X" to global verse index 1..6236
export function unrefVerse(t: string): number | null {
    const m = /^\s*(\d+)\s*:\s*(\d+)\s*$/.exec(t);
    if (!m) return null;
    const c = +m[1];
    const v = +m[2];
    if (c < 1 || c > 114) return null;
    const maxV = BUBBLE_BLOCK_MAPPING_RAW[c as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
    if (v < 1 || v > maxV) return null;
    return CUMULATIVE_VERSES[c - 1] + v;
}

// Cauchy dispersion formula: n(lambda)
const cauchy = (l: number) => 1.3252 + 2850 / (l * l);

function wl2rgb(l: number): [number, number, number] {
    let r = 0, g = 0, b = 0;
    if (l < 440) { r = (440 - l) / 60; b = 1; }
    else if (l < 490) { g = (l - 440) / 50; b = 1; }
    else if (l < 510) { g = 1; b = (510 - l) / 20; }
    else if (l < 580) { r = (l - 510) / 70; g = 1; }
    else if (l < 645) { r = 1; g = (645 - l) / 65; }
    else r = 1;
    const f = l < 420 ? 0.3 + 0.7 * (l - 380) / 40 : 1;
    return [r * f, g * f, b * f].map(v => Math.round(255 * Math.pow(v, 0.8))) as [number, number, number];
}

function refractVector(dx: number, dy: number, nx: number, ny: number, eta: number): [number, number] | null {
    const ci = -(dx * nx + dy * ny);
    const k = 1 - eta * eta * (1 - ci * ci);
    if (k < 0) return null;
    const s = eta * ci - Math.sqrt(k);
    return [eta * dx + s * nx, eta * dy + s * ny];
}

function calcExitDirection(iDeg: number, nIndex: number, kRefl: number): [number, number] | null {
    const b = Math.sin(rad(iDeg));
    let px = -Math.sqrt(Math.max(0, 1 - b * b));
    let py = b;
    let t = refractVector(1, 0, px, py, 1 / nIndex);
    if (!t) return null;

    for (let j = 0; j <= kRefl; j++) {
        const s = -2 * (px * t[0] + py * t[1]);
        const qx = px + s * t[0];
        const qy = py + s * t[1];
        if (j === kRefl) {
            return refractVector(t[0], t[1], -qx, -qy, nIndex);
        }
        const d2 = t[0] * qx + t[1] * qy;
        t = [t[0] - 2 * d2 * qx, t[1] - 2 * d2 * qy];
        px = qx;
        py = qy;
    }
    return null;
}

const rOf = (i: number, n: number) => deg(Math.asin(Math.min(1, Math.sin(rad(i)) / n)));

export const LightInDropCenter: React.FC<LightInDropCenterProps> = ({
    entryVerse,
    angleI,
    setAngleI,
    refractiveIndex,
    reflectionsK,
    dispersionMult,
    snapToWhole,
    showColors,
    onVerseSelect
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDraggingRef = useRef(false);

    // Physics parameters calculation
    const getEffectivePhysics = useCallback(() => {
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

        return {
            n: refractiveIndex,
            k: reflectionsK,
            i,
            r,
            s,
            S: entryVerse,
            ds: dispersionMult
        };
    }, [angleI, refractiveIndex, reflectionsK, snapToWhole, entryVerse, dispersionMult]);

    // Canvas drawing
    const draw = useCallback(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;

        const E = getEffectivePhysics();
        const dpr = window.devicePixelRatio || 1;
        const rect = cv.getBoundingClientRect();
        const W = rect.width;
        const H = rect.height;

        if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
            cv.width = Math.round(W * dpr);
            cv.height = Math.round(H * dpr);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const R = Math.min(W, H) * 0.34;
        const cx = W * 0.5;
        const cy = H * 0.5;

        // Clear with deep space black
        ctx.fillStyle = '#06090e';
        ctx.fillRect(0, 0, W, H);

        // Circular background grid glow
        const glowGrad = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.3);
        glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        glowGrad.addColorStop(0.6, 'rgba(14, 116, 144, 0.05)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.3, 0, 2 * PI);
        ctx.fill();

        // Droplet body: translucent spherical water droplet
        const dropletGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
        dropletGrad.addColorStop(0, 'rgba(125, 211, 252, 0.22)');
        dropletGrad.addColorStop(0.7, 'rgba(14, 116, 144, 0.16)');
        dropletGrad.addColorStop(1, 'rgba(3, 105, 161, 0.25)');
        ctx.fillStyle = dropletGrad;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();

        // Coordinate transforms: clockwise from top
        const cwTop = (n: number) => ((n - 1) / N * 360) + (270 + E.i) - (E.S - 1) / N * 360;
        const pos = (a: number, rr: number) => {
            const m = rad(90 - a);
            return [cx + rr * Math.cos(m), cy - rr * Math.sin(m)];
        };

        // Outer rim ticks (every 100 verses)
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        for (let n = 1; n <= N; n += 100) {
            const a = cwTop(n);
            const p1 = pos(a, R);
            const isMajor = n % 500 === 1;
            const p2 = pos(a, R + (isMajor ? 8 : 4));
            ctx.beginPath();
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
            ctx.stroke();
        }

        // 12 hour reference markers around the circle
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        ctx.font = '9.5px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let j = 0; j < 12; j++) {
            const n = 1 + Math.round(j * N / 12);
            const p = pos(cwTop(n), R + 18);
            ctx.fillText(refVerse(n), p[0], p[1]);
        }

        // 12 o'clock red marker indicating 1:1 North
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - R - 3);
        ctx.lineTo(cx, cy - R - 13);
        ctx.stroke();

        // Physical Ray Geometry
        const gapDeg = 180 - 2 * E.r;
        const b = Math.sin(rad(E.i));
        const ph = (j: number) => {
            const a = rad(180 - E.i - j * gapDeg);
            return [cx + R * Math.cos(a), cy - R * Math.sin(a)];
        };

        // Incident horizontal ray of light
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(0, cy - b * R);
        ctx.lineTo(ph(0)[0], ph(0)[1]);
        ctx.stroke();

        // Incident arrow indicator
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px ui-monospace, monospace';
        ctx.textAlign = 'left';
        ctx.fillText('LIGHT →', 16, cy - b * R - 8);

        const far = Math.max(W, H) * 1.5;
        const wavelengths = showColors ? [400, 450, 500, 550, 600, 650, 700] : [null];

        // Draw internal chords and exit rays
        wavelengths.forEach((l) => {
            const nIdx = l === null ? E.n : E.n + E.ds * (cauchy(l) - cauchy(550));
            const rAng = rOf(E.i, nIdx);
            const gAng = 180 - 2 * rAng;
            const rayColor = l === null ? '#fb7185' : `rgb(${wl2rgb(l).join(',')})`;

            const pp = (j: number) => {
                const a = rad(180 - E.i - j * gAng);
                return [cx + R * Math.cos(a), cy - R * Math.sin(a)];
            };

            ctx.strokeStyle = rayColor;
            ctx.lineWidth = l === null ? 2.4 : 1.6;
            ctx.beginPath();
            ctx.moveTo(pp(0)[0], pp(0)[1]);
            for (let j = 1; j <= E.k + 1; j++) {
                ctx.lineTo(pp(j)[0], pp(j)[1]);
            }

            const exit = calcExitDirection(E.i, nIdx, E.k);
            if (exit) {
                const q = pp(E.k + 1);
                ctx.lineTo(q[0] + exit[0] * far, q[1] - exit[1] * far);
            }
            ctx.stroke();
        });

        // Connected reflection points and badge labels
        const pts: number[] = [];
        for (let j = 0; j <= E.k + 1; j++) {
            const num = ((Math.round(E.S + j * N * gapDeg / 360) - 1) % N + N) % N + 1;
            pts.push(num);

            const a = 180 - E.i - j * gapDeg;
            const m = rad(a);
            const p = [cx + R * Math.cos(m), cy - R * Math.sin(m)];
            const q = [cx + (R + 36) * Math.cos(m), cy - (R + 36) * Math.sin(m)];

            // Node Dot
            ctx.fillStyle = j === 0 ? '#38bdf8' : j === E.k + 1 ? '#4ade80' : '#f59e0b';
            ctx.beginPath();
            ctx.arc(p[0], p[1], 5, 0, 2 * PI);
            ctx.fill();

            // Label pill
            const txt = refVerse(num);
            ctx.font = 'bold 11px ui-monospace, SFMono-Regular, monospace';
            const wText = ctx.measureText(txt).width + 12;

            ctx.fillStyle = 'rgba(10, 15, 26, 0.9)';
            ctx.strokeStyle = j === 0 ? '#38bdf8' : j === E.k + 1 ? '#4ade80' : '#f59e0b';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.roundRect(q[0] - wText / 2, q[1] - 10, wText, 20, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#f8fafc';
            ctx.textAlign = 'center';
            ctx.fillText(txt, q[0], q[1] + 3.5);
        }
    }, [getEffectivePhysics, showColors]);

    useEffect(() => {
        draw();
    }, [draw]);

    // Handle vertical dragging to adjust angle of incidence i
    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        isDraggingRef.current = true;
        const cv = canvasRef.current;
        if (cv) cv.setPointerCapture(e.pointerId);
        handlePointerMove(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDraggingRef.current || !canvasRef.current) return;
        const r = canvasRef.current.getBoundingClientRect();
        const R = Math.min(r.width, r.height) * 0.34;
        const y = (r.height / 2 - (e.clientY - r.top)) / R;
        const newAngle = deg(Math.asin(Math.max(0, Math.min(0.9999, y))));
        setAngleI(parseFloat(Math.max(0, Math.min(89.9, newAngle)).toFixed(2)));
    };

    const handlePointerUp = () => {
        isDraggingRef.current = false;
    };

    const eff = getEffectivePhysics();
    const chordVerses = (N * (180 - 2 * eff.r) / 360).toFixed(1);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between p-2 select-none">
            {/* Top HUD Telemetry */}
            <div className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-black/70 border border-cyan-500/20 rounded-xl font-mono text-[11px] backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-cyan-300 font-bold uppercase tracking-wider">Droplet Ring</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-300">Entry: <button type="button" onClick={() => { const [s, a] = refVerse(entryVerse).split(':').map(Number); onVerseSelect(s, a); }} className="text-white hover:text-cyan-300 underline underline-offset-2 cursor-pointer font-bold ml-1" title="View entry verse in Reader">{refVerse(entryVerse)}</button></span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-gray-400">
                    <span>i = <b className="text-cyan-300">{eff.i.toFixed(2)}°</b></span>
                    <span>r = <b className="text-amber-300">{eff.r.toFixed(2)}°</b></span>
                    <span>Chord Gap = <b className="text-emerald-300">{chordVerses} verses</b></span>
                    <span>n = <b className="text-pink-300">{eff.n.toFixed(3)}</b></span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400/80 text-[10px]">
                    <Compass className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Drag vertically on canvas to change incidence</span>
                </div>
            </div>

            {/* Main Canvas Area */}
            <div className="relative w-full flex-1 min-h-[360px] my-2 bg-[#06090e] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block cursor-crosshair touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                />
            </div>

            {/* Bottom Caption */}
            <div className="w-full px-4 py-2 bg-black/60 border border-white/5 rounded-xl text-center font-mono text-[10.5px] text-gray-400 shrink-0">
                Verse 1:1 is seated at North (12 o'clock). Light ray enters at {refVerse(entryVerse)}, refracts at angle r, and bounces {reflectionsK} time(s) through Snell's chords across 6,236 verses.
            </div>
        </div>
    );
};
