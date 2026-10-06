import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Box, Compass, RefreshCw, Eye, Sun, Droplets, Sparkles, ArrowLeftRight } from 'lucide-react';

const TesseractRoseCubeVisual: React.FC = () => {
    const [activePhase, setActivePhase] = useState<number | null>(null);

    const phases = [
        { id: 1, name: "Life ↓", color: "#facc15", bg: "rgba(250, 204, 21, 0.15)", border: "#facc15", anchor: "3:49", desc: "Clay pulse — Command condenses into clay (Kun)", dir: "down" },
        { id: 2, name: "Death ↑", color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)", border: "#22c55e", anchor: "40:34", desc: "Yusuf exit — Mass spent, memory credit logged", dir: "up" },
        { id: 3, name: "Return ↓", color: "#fb923c", bg: "rgba(251, 146, 60, 0.15)", border: "#fb923c", anchor: "19:30", desc: "Cradle Book — Word lowered into speech & action", dir: "down" },
        { id: 4, name: "Life ↑", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", border: "#ef4444", anchor: "7:143", desc: "Musa / Mountain shatters — First believer raised", dir: "up" },
        { id: 5, name: "Raised ↓", color: "#ffffff", bg: "rgba(255, 255, 255, 0.15)", border: "#ffffff", anchor: "81:8", desc: "Al-Maw'ūdah — The buried life claimed & answered", dir: "down" },
        { id: 6, name: "Death ↑", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)", border: "#3b82f6", anchor: "34:14", desc: "Solomon reboot — Seed splits, re-fires the Kun", dir: "up" },
    ];

    return (
        <div className="relative w-full flex flex-col items-center justify-center my-10 bg-black/50 border border-cyan-500/20 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Title */}
            <div className="flex flex-col items-center text-center space-y-2 mb-6 z-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
                    <Box className="w-3.5 h-3.5 text-cyan-400" />
                    <span>4D Tesseract • 9-Letter Rose • Rubik's Cube Engine</span>
                </div>
                <h3 className="text-lg lg:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-pink-300 font-serif tracking-wide">
                    The Geometry of the Hidden 8th Cell (36:9 ↔ 50:21)
                </h3>
                <p className="text-xs text-gray-400 font-mono max-w-xl">
                    1 → 15:87 Sabʿan al-Mathānī ← 1 | 3ₙ = 1 + ((X − 1) mod 6) | 114 / 6 = 19 Cycles
                </p>
            </div>

            {/* Diagram Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center z-10">
                {/* Left: The 9-Letter Rose SVG */}
                <div className="lg:col-span-6 flex flex-col items-center bg-black/40 border border-white/10 rounded-2xl p-4 relative group">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" /> The 9-Letter Rose (I9 ⇄ 3n ⇄ D10)
                    </span>
                    
                    <svg viewBox="0 0 400 360" className="w-full max-w-[340px] h-auto drop-shadow-[0_0_20px_rgba(6,182,212,0.15)] select-none">
                        {/* 3 Concentric Reference Circles for Top Arm */}
                        <circle cx="200" cy="140" r="110" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
                        <circle cx="200" cy="140" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
                        <circle cx="200" cy="140" r="70" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

                        {/* Concentric Circles for Left Arm */}
                        <circle cx="150" cy="200" r="110" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
                        <circle cx="150" cy="200" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
                        <circle cx="150" cy="200" r="70" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

                        {/* Concentric Circles for Right Arm */}
                        <circle cx="250" cy="200" r="110" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
                        <circle cx="250" cy="200" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
                        <circle cx="250" cy="200" r="70" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

                        {/* 6 Color Cluster Nodes */}
                        {/* 1. Yellow Cluster (Top-Left, Life ↓ 3:49) */}
                        <g opacity={activePhase === null || activePhase === 1 ? 1 : 0.25} className="transition-opacity">
                            <circle cx="130" cy="100" r="7" fill="#facc15" />
                            <circle cx="150" cy="90" r="7" fill="#facc15" />
                            <circle cx="115" cy="120" r="7" fill="#facc15" />
                            <circle cx="135" cy="125" r="7" fill="#facc15" />
                            <circle cx="120" cy="145" r="7" fill="#facc15" />
                            <circle cx="140" cy="150" r="7" fill="#facc15" />
                            <circle cx="125" cy="170" r="7" fill="#facc15" />
                        </g>

                        {/* 2. Green Cluster (Top-Center, Death ↑ 40:34) */}
                        <g opacity={activePhase === null || activePhase === 2 ? 1 : 0.25} className="transition-opacity">
                            <circle cx="185" cy="100" r="7" fill="#22c55e" />
                            <circle cx="200" cy="105" r="7" fill="#22c55e" />
                            <circle cx="170" cy="125" r="7" fill="#22c55e" />
                            <circle cx="190" cy="125" r="7" fill="#22c55e" />
                            <circle cx="215" cy="120" r="7" fill="#22c55e" />
                            <circle cx="185" cy="150" r="7" fill="#22c55e" />
                            <circle cx="200" cy="140" r="8" fill="#16a34a" stroke="#fff" strokeWidth="1.5" />
                            <circle cx="225" cy="145" r="7" fill="#22c55e" />
                        </g>

                        {/* 3. Orange Cluster (Top-Right, Return ↓ 19:30) */}
                        <g opacity={activePhase === null || activePhase === 3 ? 1 : 0.25} className="transition-opacity">
                            <circle cx="250" cy="90" r="7" fill="#fb923c" />
                            <circle cx="265" cy="115" r="7" fill="#fb923c" />
                            <circle cx="280" cy="125" r="7" fill="#fb923c" />
                            <circle cx="260" cy="145" r="7" fill="#fb923c" />
                            <circle cx="275" cy="155" r="7" fill="#fb923c" />
                            <circle cx="260" cy="175" r="7" fill="#fb923c" />
                            <circle cx="280" cy="180" r="7" fill="#fb923c" />
                        </g>

                        {/* 4. Red Cluster (Bottom-Left, Life ↑ 7:143) */}
                        <g opacity={activePhase === null || activePhase === 4 ? 1 : 0.25} className="transition-opacity">
                            <circle cx="150" cy="190" r="7" fill="#ef4444" />
                            <circle cx="165" cy="180" r="7" fill="#ef4444" />
                            <circle cx="150" cy="215" r="7" fill="#ef4444" />
                            <circle cx="170" cy="210" r="7" fill="#ef4444" />
                            <circle cx="155" cy="240" r="7" fill="#ef4444" />
                            <circle cx="175" cy="235" r="7" fill="#ef4444" />
                            <circle cx="190" cy="250" r="7" fill="#ef4444" />
                        </g>

                        {/* 5. White Cluster (Bottom-Right, Raised ↓ 81:8) */}
                        <g opacity={activePhase === null || activePhase === 5 ? 1 : 0.25} className="transition-opacity">
                            <circle cx="250" cy="190" r="7" fill="#ffffff" />
                            <circle cx="230" cy="210" r="7" fill="#ffffff" />
                            <circle cx="245" cy="215" r="7" fill="#ffffff" />
                            <circle cx="260" cy="220" r="7" fill="#ffffff" />
                            <circle cx="210" cy="245" r="7" fill="#ffffff" />
                            <circle cx="230" cy="240" r="7" fill="#ffffff" />
                            <circle cx="245" cy="245" r="7" fill="#ffffff" />
                        </g>

                        {/* 6. Blue Cluster (Bottom-Center, Death ↑ 34:14) */}
                        <g opacity={activePhase === null || activePhase === 6 ? 1 : 0.25} className="transition-opacity">
                            <circle cx="170" cy="280" r="7" fill="#3b82f6" />
                            <circle cx="190" cy="275" r="7" fill="#3b82f6" />
                            <circle cx="210" cy="270" r="7" fill="#3b82f6" />
                            <circle cx="230" cy="275" r="7" fill="#3b82f6" />
                            <circle cx="185" cy="300" r="7" fill="#3b82f6" />
                            <circle cx="200" cy="290" r="7" fill="#3b82f6" />
                            <circle cx="215" cy="300" r="7" fill="#3b82f6" />
                            <circle cx="200" cy="315" r="7" fill="#3b82f6" />
                        </g>

                        {/* 9 Canonical Letters */}
                        {/* Top Arm (I9: D -> E -> U) */}
                        <text x="195" y="35" fontSize="22" fontWeight="900" fontFamily="serif" fill="#ffffff">D</text>
                        <text x="195" y="55" fontSize="18" fontWeight="bold" fontFamily="serif" fill="#e2e8f0">E</text>
                        <text x="235" y="85" fontSize="18" fontWeight="bold" fontFamily="serif" fill="#cbd5e1">U</text>

                        {/* Left Arm (3n: B -> S -> F) */}
                        <text x="35" y="215" fontSize="22" fontWeight="900" fontFamily="serif" fill="#ffffff">B</text>
                        <text x="58" y="250" fontSize="18" fontWeight="bold" fontFamily="serif" fill="#e2e8f0">S</text>
                        <text x="92" y="270" fontSize="18" fontWeight="bold" fontFamily="serif" fill="#cbd5e1">F</text>

                        {/* Right Arm (D10: L -> M -> R) */}
                        <text x="360" y="235" fontSize="22" fontWeight="900" fontFamily="serif" fill="#ffffff">L</text>
                        <text x="330" y="265" fontSize="18" fontWeight="bold" fontFamily="serif" fill="#e2e8f0">M</text>
                        <text x="300" y="285" fontSize="18" fontWeight="bold" fontFamily="serif" fill="#cbd5e1">R</text>

                        {/* Central The 7 / Centroid */}
                        <circle cx="200" cy="190" r="14" fill="rgba(6,182,212,0.2)" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="200" y="194" textAnchor="middle" fontSize="10" fontWeight="black" fontFamily="monospace" fill="#22d3ee">THE 7</text>
                    </svg>

                    <div className="flex justify-between w-full text-[9px] font-mono text-gray-400 mt-2 border-t border-white/5 pt-2">
                        <span>Top: I9 (Word)</span>
                        <span>Left: 3n (Swing)</span>
                        <span>Right: D10 (Mass)</span>
                    </div>
                </div>

                {/* Right: Rubik's Cube Isometric Projection */}
                <div className="lg:col-span-6 flex flex-col items-center bg-black/40 border border-white/10 rounded-2xl p-4 relative group">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                        <Box className="w-3.5 h-3.5" /> 3D Shadow Projection (3 Visible ↔ 3 Hidden Faces)
                    </span>

                    <svg viewBox="0 0 320 280" className="w-full max-w-[280px] h-auto drop-shadow-[0_0_25px_rgba(239,68,68,0.2)] select-none">
                        {/* Isometric Cube Faces */}
                        {/* Top Face: Green (U / 3:49) */}
                        <g opacity={activePhase === null || activePhase === 2 ? 1 : 0.3} className="transition-opacity">
                            {/* Row 1 */}
                            <polygon points="160,20 190,37 160,54 130,37" fill="#15803d" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="190,37 220,54 190,71 160,54" fill="#16a34a" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="220,54 250,71 220,88 190,71" fill="#22c55e" stroke="#1e293b" strokeWidth="2" />
                            {/* Row 2 */}
                            <polygon points="130,37 160,54 130,71 100,54" fill="#16a34a" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="160,54 190,71 160,88 130,71" fill="#22c55e" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="190,71 220,88 190,105 160,88" fill="#4ade80" stroke="#1e293b" strokeWidth="2" />
                            {/* Row 3 */}
                            <polygon points="100,54 130,71 100,88 70,71" fill="#22c55e" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="130,71 160,88 130,105 100,88" fill="#4ade80" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="160,88 190,105 160,122 130,105" fill="#86efac" stroke="#1e293b" strokeWidth="2" />
                        </g>

                        {/* Left Face: Red (F / 7:143) */}
                        <g opacity={activePhase === null || activePhase === 4 ? 1 : 0.3} className="transition-opacity">
                            {/* Col 1 */}
                            <polygon points="70,71 100,88 100,128 70,111" fill="#b91c1c" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="70,111 100,128 100,168 70,151" fill="#dc2626" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="70,151 100,168 100,208 70,191" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
                            {/* Col 2 */}
                            <polygon points="100,88 130,105 130,145 100,128" fill="#dc2626" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="100,128 130,145 130,185 100,168" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="100,168 130,185 130,225 100,208" fill="#f87171" stroke="#1e293b" strokeWidth="2" />
                            {/* Col 3 */}
                            <polygon points="130,105 160,122 160,162 130,145" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="130,145 160,162 160,202 130,185" fill="#f87171" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="130,185 160,202 160,242 130,225" fill="#fca5a5" stroke="#1e293b" strokeWidth="2" />
                        </g>

                        {/* Right Face: White (R / 81:8) */}
                        <g opacity={activePhase === null || activePhase === 5 ? 1 : 0.3} className="transition-opacity">
                            {/* Col 1 */}
                            <polygon points="160,122 190,105 190,145 160,162" fill="#cbd5e1" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="160,162 190,145 190,185 160,202" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="160,202 190,185 190,225 160,242" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
                            {/* Col 2 */}
                            <polygon points="190,105 220,88 220,128 190,145" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="190,145 220,128 220,168 190,185" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="190,185 220,168 220,208 190,225" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                            {/* Col 3 */}
                            <polygon points="220,88 250,71 250,111 220,128" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="220,128 250,111 250,151 220,168" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                            <polygon points="220,168 250,151 250,191 220,208" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                        </g>

                        {/* Internal Slice Line Indicator Overlay (E, S, M) */}
                        <line x1="160" y1="20" x2="160" y2="242" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
                        <line x1="70" y1="151" x2="250" y2="151" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
                    </svg>

                    <div className="flex justify-between w-full text-[9px] font-mono text-gray-400 mt-2 border-t border-white/5 pt-2">
                        <span>3 Visible: Forward Swing (Qun ▼)</span>
                        <span>3 Hidden: Return Swing (FayaQun ▲)</span>
                    </div>
                </div>
            </div>

            {/* Interactive 6-Phase Bar */}
            <div className="flex flex-wrap gap-2 w-full justify-center mt-6 z-10">
                {phases.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-300 ${
                            activePhase === p.id
                                ? 'scale-105 shadow-lg'
                                : 'hover:scale-102 opacity-80 hover:opacity-100'
                        }`}
                        style={{
                            backgroundColor: activePhase === p.id ? p.bg : 'rgba(0,0,0,0.4)',
                            borderColor: p.border,
                            color: p.color
                        }}
                    >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="font-bold">{p.id}. {p.name}</span>
                        <span className="text-[10px] opacity-70">[{p.anchor}]</span>
                    </button>
                ))}
            </div>

            {/* Dynamic Active Description Box */}
            {activePhase !== null && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-4 p-3 bg-black/60 border border-cyan-500/30 rounded-xl text-center z-10 text-xs font-mono text-gray-300"
                >
                    <span className="font-bold text-cyan-300 mr-2">Phase {activePhase} [{phases[activePhase - 1].anchor}]:</span>
                    <span>{phases[activePhase - 1].desc}</span>
                    <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: phases[activePhase - 1].bg, color: phases[activePhase - 1].color }}>
                        Vector: {phases[activePhase - 1].dir === 'down' ? 'Qun ▼ Debit' : 'FayaQun ▲ Credit'}
                    </span>
                </motion.div>
            )}
        </div>
    );
};

/* =========================================================================
   Interactive Reader Between Source and Wall Component
   ========================================================================= */
const ReaderSourceWallInteractive: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [mode, setMode] = useState<'wall' | 'book'>('wall');
    const [wallFilter, setWallFilter] = useState<'both' | 'shadow' | 'water'>('both');
    const [metrics, setMetrics] = useState({
        dist: '0%',
        loops: 0,
        ghost: '100%',
        dry: '100%'
    });

    const stateRef = useRef({
        mode: 'wall',
        wallFilter: 'both',
        phase: 'fall',
        x: 0,
        v: 0,
        hitT: 0,
        rt: 0,
        rf: 0,
        g: 0,
        lift: 0,
        loops: 0,
        wet: 0,
        t: 0,
        face: 1,
        dry: 100,
        W: 800,
        H: 360,
        DPR: 1,
        S: 1,
        L: {
            stripW: 40,
            wallX: 700,
            ax: 40,
            oy: 180,
            lo: { x: 56, y: 194 },
            wo: { x: 56, y: 166 },
            mw: 34,
            mh: 90,
            startX: 280,
            endX: 680,
            tan: 0.42,
            top: 22,
            bot: 350
        }
    });

    // Water particles pool
    const particlesRef = useRef({
        N: 700,
        px: new Float32Array(700),
        py: new Float32Array(700),
        pvx: new Float32Array(700),
        pvy: new Float32Array(700),
        pa: new Uint8Array(700),
        pIdx: 0,
        emitAcc: 0
    });

    // Off-screen canvas for dynamic water absorption/dry patch on wall
    const wetCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const updateLayout = useCallback(() => {
        const cv = canvasRef.current;
        if (!cv || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const W = Math.max(280, Math.floor(rect.width));
        const H = W < 560 ? Math.round(W * 0.85) : Math.round(Math.min(W * 0.48, 400));
        const DPR = Math.min(window.devicePixelRatio || 1, 2);

        cv.style.height = `${H}px`;
        cv.width = Math.round(W * DPR);
        cv.height = Math.round(H * DPR);

        const ctx = cv.getContext('2d');
        if (ctx) ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        const st = stateRef.current;
        st.W = W;
        st.H = H;
        st.DPR = DPR;
        st.S = Math.max(0.55, Math.min(1.2, W / 900));

        const L = st.L;
        L.stripW = Math.max(28, Math.min(56, W * 0.065));
        L.wallX = W - (L.stripW * 2 + 12);
        L.ax = Math.max(26, W * 0.06);
        L.oy = H / 2;
        L.lo = { x: L.ax + 16 * st.S, y: L.oy + 14 * st.S };
        L.wo = { x: L.ax + 16 * st.S, y: L.oy - 14 * st.S };
        L.mw = Math.max(20, 34 * st.S);
        L.mh = H * 0.28;
        L.startX = L.lo.x + (L.wallX - L.lo.x) * 0.36;
        L.endX = L.wallX - L.mw / 2 - 4;
        L.top = 22;
        L.bot = H - 8;

        if (!wetCanvasRef.current) {
            wetCanvasRef.current = document.createElement('canvas');
        }
        const wetC = wetCanvasRef.current;
        wetC.width = Math.max(1, Math.round(L.stripW * DPR));
        wetC.height = Math.max(1, Math.round(H * DPR));
        const wctx = wetC.getContext('2d', { willReadFrequently: true });
        if (wctx) wctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        if (!st.x) st.x = L.startX;
        st.x = Math.min(Math.max(st.x, L.startX), L.endX);
    }, []);

    const emitParticles = (n: number) => {
        const pt = particlesRef.current;
        const st = stateRef.current;
        const L = st.L;
        for (let k = 0; k < n; k++) {
            const i = pt.pIdx;
            pt.pIdx = (pt.pIdx + 1) % pt.N;
            const ang = (Math.random() - 0.5) * 2 * 0.38 - 0.012;
            const sp = (9 + Math.random() * 3.5) * st.S;
            pt.px[i] = L.wo.x;
            pt.py[i] = L.wo.y;
            pt.pvx[i] = Math.cos(ang) * sp;
            pt.pvy[i] = Math.sin(ang) * sp;
            pt.pa[i] = 1;
        }
    };

    const handleSetMode = (newMode: 'wall' | 'book') => {
        setMode(newMode);
        stateRef.current.mode = newMode;
    };

    const handleRestart = () => {
        const st = stateRef.current;
        st.x = st.L.startX;
        st.v = 0;
        st.phase = 'fall';
        st.loops = 0;
        st.g = 0;
        st.lift = 0;
        st.wet = 0;
        st.face = 1;
        if (wetCanvasRef.current) {
            const wctx = wetCanvasRef.current.getContext('2d');
            if (wctx) wctx.clearRect(0, 0, st.L.stripW, st.H);
        }
        handleSetMode('wall');
    };

    // Keep wall filter in ref
    useEffect(() => {
        stateRef.current.wallFilter = wallFilter;
    }, [wallFilter]);

    // Keyboard support
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleSetMode('wall');
            if (e.key === 'ArrowLeft') handleSetMode('book');
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    // Main Animation Loop
    useEffect(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);

        let animationFrameId: number;
        let lastTime = 0;
        let frameCount = 0;

        const cv = canvasRef.current;
        const ctx = cv?.getContext('2d');

        const stepAndRender = (timestamp: number) => {
            if (!lastTime) lastTime = timestamp;
            const dt = Math.min(0.05, (timestamp - lastTime) / 1000);
            lastTime = timestamp;

            const st = stateRef.current;
            const L = st.L;
            const W = st.W;
            const H = st.H;
            const n = Math.min(2, dt * 60);
            st.t += dt;

            // Physics step
            const a = 0.03 * (W / 900);
            if (st.mode === 'wall') {
                if (st.phase === 'float') {
                    st.phase = 'fall';
                    st.v = 0;
                }
                if (st.phase === 'fall') {
                    st.v += a * n;
                    st.x += st.v * n;
                    if (st.x >= L.endX) {
                        st.x = L.endX;
                        st.phase = 'hit';
                        st.hitT = 0;
                        st.loops++;
                    }
                } else if (st.phase === 'hit') {
                    st.hitT += dt;
                    if (st.hitT > 0.4) {
                        st.phase = 'rewind';
                        st.rt = 0;
                        st.rf = st.x;
                    }
                } else if (st.phase === 'rewind') {
                    st.rt += dt / 0.75;
                    const k = Math.min(1, st.rt);
                    const e = 1 - Math.pow(1 - k, 3);
                    st.x = st.rf + (L.startX - st.rf) * e;
                    if (k >= 1) {
                        st.phase = 'fall';
                        st.v = 0;
                    }
                }
                st.g += (0 - st.g) * Math.min(1, 0.1 * n);
                st.lift += (0 - st.lift) * Math.min(1, 0.08 * n);
                st.face += (1 - st.face) * Math.min(1, 0.2 * n);
            } else {
                st.phase = 'float';
                st.v *= Math.pow(0.86, n);
                st.x += st.v * n;
                st.g += (1 - st.g) * Math.min(1, 0.04 * n);
                st.lift += (1 - st.lift) * Math.min(1, 0.05 * n);
                st.face += (-1 - st.face) * Math.min(1, 0.2 * n);
            }
            st.x = Math.max(L.startX, Math.min(L.endX, st.x));

            const my = L.oy - st.lift * H * 0.035 + Math.sin(st.t * 2.4) * 3 * st.S * st.lift;
            const massRect = {
                cx: st.x,
                cy: my,
                x1: st.x - L.mw / 2,
                x2: st.x + L.mw / 2,
                y1: my - L.mh / 2,
                y2: my + L.mh / 2
            };

            // Emit water particles
            const pt = particlesRef.current;
            pt.emitAcc += 22 * n;
            const wholeEmit = Math.floor(pt.emitAcc);
            pt.emitAcc -= wholeEmit;
            emitParticles(wholeEmit);

            // Water particle physics on off-screen wet canvas
            const wetC = wetCanvasRef.current;
            const wctx = wetC?.getContext('2d');
            const G = 0.012 * st.S;

            for (let i = 0; i < pt.N; i++) {
                if (!pt.pa[i]) continue;
                pt.px[i] += pt.pvx[i] * n;
                pt.py[i] += pt.pvy[i] * n;
                pt.pvy[i] += G * n;

                if (pt.px[i] >= L.wallX) {
                    pt.pa[i] = 0;
                    const y = pt.py[i];
                    if (y > 0 && y < H && wctx) {
                        wctx.fillStyle = 'rgba(77, 166, 255, 0.35)';
                        wctx.beginPath();
                        wctx.arc(L.stripW * (0.15 + 0.7 * Math.random()), y, 3 + 3 * st.S * Math.random(), 0, Math.PI * 2);
                        wctx.fill();
                    }
                    continue;
                }

                // Collision with Reader mass
                if (pt.px[i] > massRect.x1 && pt.px[i] < massRect.x2 && pt.py[i] > massRect.y1 && pt.py[i] < massRect.y2) {
                    pt.pa[i] = 0;
                    st.wet = Math.min(1, st.wet + 0.004);
                    continue;
                }

                if (pt.py[i] < -20 || pt.py[i] > H + 20) {
                    pt.pa[i] = 0;
                }
            }
            st.wet *= 1 - 0.004 * n;

            // Fade wet canvas slightly
            if (wctx) {
                wctx.globalCompositeOperation = 'destination-out';
                wctx.fillStyle = `rgba(0,0,0,${0.012 * n})`;
                wctx.fillRect(0, 0, L.stripW, H);
                wctx.globalCompositeOperation = 'source-over';
            }

            // Render on main canvas
            if (ctx) {
                ctx.clearRect(0, 0, W, H);
                ctx.fillStyle = '#080d14';
                ctx.fillRect(0, 0, W, H);

                const breath = 0.5 + 0.5 * Math.sin(st.t * 1.3);
                const intensity = 0.72 + 0.28 * breath + 0.12 * st.lift;

                // 1. Light Cone Beam (I9)
                const dist = L.wallX - L.lo.x;
                const cT = L.lo.y - L.tan * dist;
                const cB = L.lo.y + L.tan * dist;

                // Project shadow
                const pts = [
                    [massRect.x1, massRect.y1],
                    [massRect.x2, massRect.y1],
                    [massRect.x1, massRect.y2],
                    [massRect.x2, massRect.y2]
                ];
                let shLo = 1e9, shHi = -1e9;
                for (let pi = 0; pi < 4; pi++) {
                    const yy = L.lo.y + (pts[pi][1] - L.lo.y) * (L.wallX - L.lo.x) / (pts[pi][0] - L.lo.x);
                    if (yy < shLo) shLo = yy;
                    if (yy > shHi) shHi = yy;
                }
                const shCenter = (shLo + shHi) / 2;
                const shH = ((shHi - shLo) / 2) * (1 - st.g);
                const sT = shCenter - shH;
                const sB = shCenter + shH;

                // Draw upper & lower light polygons
                if (st.wallFilter === 'both' || st.wallFilter === 'shadow') {
                    const gLight = ctx.createLinearGradient(L.lo.x, 0, L.wallX, 0);
                    gLight.addColorStop(0, `rgba(255, 211, 107, ${0.34 * intensity})`);
                    gLight.addColorStop(1, `rgba(255, 211, 107, ${0.10 * intensity})`);
                    ctx.fillStyle = gLight;

                    const drawLightPoly = (ya: number, yb: number) => {
                        ctx.beginPath();
                        ctx.moveTo(L.lo.x, L.lo.y);
                        ctx.lineTo(L.wallX, ya);
                        ctx.lineTo(L.wallX, yb);
                        ctx.closePath();
                        ctx.fill();
                    };

                    const uT = cT, uB = Math.min(sT, cB);
                    if (uB > uT) drawLightPoly(uT, uB);
                    const lT = Math.max(sB, cT), lB = cB;
                    if (lB > lT) drawLightPoly(lT, lB);
                }

                // 2. Water Stream Particles (D10)
                if (st.wallFilter === 'both' || st.wallFilter === 'water') {
                    ctx.fillStyle = 'rgba(77, 166, 255, 0.85)';
                    ctx.beginPath();
                    const pr = Math.max(1.2, 1.6 * st.S);
                    for (let i = 0; i < pt.N; i++) {
                        if (!pt.pa[i]) continue;
                        ctx.moveTo(pt.px[i] + pr, pt.py[i]);
                        ctx.arc(pt.px[i], pt.py[i], pr, 0, Math.PI * 2);
                    }
                    ctx.fill();
                }

                // 3. Source A (The Quran as Flowing Light)
                ctx.fillStyle = 'rgba(232, 238, 243, 0.16)';
                ctx.beginPath();
                ctx.roundRect(L.ax - 14 * st.S, L.oy - 38 * st.S, 20 * st.S, 76 * st.S, 5);
                ctx.fill();

                // Water nozzle (D10)
                ctx.fillStyle = '#4da6ff';
                ctx.beginPath();
                ctx.roundRect(L.ax + 4 * st.S, L.wo.y - 5 * st.S, 18 * st.S, 10 * st.S, 3);
                ctx.fill();

                // Light emitter (I9)
                ctx.fillStyle = '#ffd36b';
                ctx.beginPath();
                ctx.roundRect(L.ax + 4 * st.S, L.lo.y - 6 * st.S, 18 * st.S, 12 * st.S, 3);
                ctx.fill();

                ctx.font = '700 12px monospace';
                ctx.textAlign = 'left';
                ctx.fillStyle = '#e8eef3';
                ctx.fillText('A [1]', Math.max(6, L.ax - 12 * st.S), L.oy - 46 * st.S);
                ctx.font = '600 10px monospace';
                ctx.fillStyle = 'rgba(232, 238, 243, 0.6)';
                ctx.fillText('Quran', Math.max(6, L.ax - 14 * st.S), L.oy + 54 * st.S);

                // 4. Reader Mass in the Middle (3n)
                const prog = (st.x - L.startX) / (L.endX - L.startX);
                let alpha = 1;
                if (st.mode === 'wall') {
                    if (st.phase === 'fall') alpha = 1 - 0.85 * Math.max(0, (prog - 0.9) / 0.1);
                    else if (st.phase === 'hit') alpha = 0.15;
                    else if (st.phase === 'rewind') alpha = 0.35;
                }

                const w = L.mw * (0.72 + 0.28 * Math.abs(st.face));
                const h = L.mh;
                const hr = L.mw * 0.42;

                ctx.save();
                ctx.globalAlpha = alpha;

                // Glow Aura when facing the Book (19:12 Grip)
                if (st.lift > 0.02) {
                    const gr = ctx.createRadialGradient(massRect.cx, massRect.cy, 2, massRect.cx, massRect.cy, h * 0.85);
                    gr.addColorStop(0, `rgba(111, 224, 180, ${0.35 * st.lift})`);
                    gr.addColorStop(1, 'rgba(111, 224, 180, 0)');
                    ctx.fillStyle = gr;
                    ctx.beginPath();
                    ctx.arc(massRect.cx, massRect.cy, h * 0.85, 0, Math.PI * 2);
                    ctx.fill();

                    // Subtle wings/arms
                    const flap = Math.sin(st.t * 7);
                    ctx.strokeStyle = `rgba(111, 224, 180, ${0.85 * st.lift})`;
                    ctx.lineWidth = 2.5;
                    ctx.lineCap = 'round';
                    for (let s = -1; s <= 1; s += 2) {
                        ctx.beginPath();
                        ctx.moveTo(massRect.cx + (s * w) / 2, massRect.cy - h * 0.12);
                        ctx.quadraticCurveTo(
                            massRect.cx + s * (w / 2 + 22 * st.S),
                            massRect.cy - h * 0.12 - (14 + 8 * flap) * st.S,
                            massRect.cx + s * (w / 2 + 36 * st.S),
                            massRect.cy - h * 0.12 - (4 + 8 * flap) * st.S
                        );
                        ctx.stroke();
                    }
                }

                // Body
                ctx.fillStyle = '#e8eef3';
                ctx.beginPath();
                ctx.roundRect(massRect.cx - w / 2, massRect.cy - h / 2 + hr * 2 + 2, w, h - hr * 2 - 2, w * 0.4);
                ctx.fill();

                // Head
                ctx.beginPath();
                ctx.arc(massRect.cx, massRect.cy - h / 2 + hr, hr, 0, Math.PI * 2);
                ctx.fill();

                // Wet water absorption overlay
                if (st.wet > 0.01) {
                    ctx.fillStyle = `rgba(77, 166, 255, ${Math.min(0.55, st.wet * 0.9)})`;
                    ctx.beginPath();
                    ctx.roundRect(massRect.cx - w / 2, massRect.cy - h / 2 + hr * 2 + 2, w, h - hr * 2 - 2, w * 0.4);
                    ctx.fill();
                }

                // Eye Pupil indicating orientation
                ctx.fillStyle = '#0c1520';
                ctx.beginPath();
                ctx.arc(massRect.cx + st.face * hr * 0.5, massRect.cy - h / 2 + hr - 1, Math.max(1.8, hr * 0.18), 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                // Reader Label
                ctx.font = '700 11px monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(232, 238, 243, ${0.85 * alpha})`;
                ctx.fillText('Reader [3ₙ]', massRect.cx, massRect.cy - h / 2 - 10);

                // Hit shockwave ripple
                if (st.phase === 'hit') {
                    const rr = (st.hitT / 0.4) * L.mh * 0.5;
                    ctx.strokeStyle = `rgba(77, 166, 255, ${0.6 * (1 - st.hitT / 0.4)})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(L.wallX, massRect.cy, rr, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // 5. Wall B (Projections: I9 Strip + D10 Strip)
                const wT = L.top, wB = L.bot, bx = L.wallX, bw = W - L.wallX - 1;
                const s1 = bx + 3;
                const s2 = s1 + L.stripW + 4;
                const sw = L.stripW;

                ctx.fillStyle = 'rgba(95, 103, 110, 0.4)';
                ctx.fillRect(bx, wT, bw, wB - wT);

                // I9 Strip (Light/Shadow)
                ctx.fillStyle = '#2c333a';
                ctx.fillRect(s1, wT, sw, wB - wT);

                // Light area on I9 strip
                ctx.fillStyle = `rgba(255, 211, 107, ${0.65 * intensity})`;
                const a1 = Math.max(cT, wT), a2 = Math.min(sT, cB, wB);
                if (a2 > a1) ctx.fillRect(s1, a1, sw, a2 - a1);
                const b1 = Math.max(sB, cT, wT), b2 = Math.min(cB, wB);
                if (b2 > b1) ctx.fillRect(s1, b1, sw, b2 - b1);

                // Purple Shadow Ghost Overlay (25:45)
                const gy1 = Math.max(sT, wT), gy2 = Math.min(sB, wB);
                if (gy2 > gy1 && st.g < 0.98) {
                    ctx.fillStyle = `rgba(179, 157, 219, ${0.55 * (1 - st.g)})`;
                    ctx.fillRect(s1, gy1, sw, gy2 - gy1);

                    ctx.strokeStyle = `rgba(179, 157, 219, ${0.75 * (1 - st.g)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    const off = (st.t * 14) % 7;
                    for (let yy = gy1 + off; yy < gy2; yy += 7) {
                        ctx.moveTo(s1, yy);
                        ctx.lineTo(s1 + sw, yy - 6);
                    }
                    ctx.stroke();
                }

                // D10 Strip (Water & Dry Patch, 10:92)
                ctx.fillStyle = '#1e2630';
                ctx.fillRect(s2, wT, sw, wB - wT);

                if (wetC) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(s2, wT, sw, wB - wT);
                    ctx.clip();
                    ctx.drawImage(wetC, s2, 0, sw, H);
                    ctx.restore();
                }

                // Strip Outlines and Headers
                ctx.strokeStyle = 'rgba(232, 238, 243, 0.25)';
                ctx.lineWidth = 1;
                ctx.strokeRect(s1 + 0.5, wT + 0.5, sw - 1, wB - wT - 1);
                ctx.strokeRect(s2 + 0.5, wT + 0.5, sw - 1, wB - wT - 1);

                ctx.font = '700 11px monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ffd36b';
                ctx.fillText('I9 (Light)', s1 + sw / 2, 16);
                ctx.fillStyle = '#4da6ff';
                ctx.fillText('D10 (Water)', s2 + sw / 2, 16);
            }

            // Periodic telemetry metrics calculation
            frameCount++;
            if (frameCount % 6 === 0) {
                const prog = (st.x - L.startX) / (L.endX - L.startX);
                setMetrics({
                    dist: `${Math.round(Math.max(0, Math.min(1, prog)) * 100)}%`,
                    loops: st.loops,
                    ghost: `${Math.round((1 - st.g) * 100)}%`,
                    dry: st.mode === 'book' ? '0%' : '100%'
                });
            }

            animationFrameId = requestAnimationFrame(stepAndRender);
        };

        animationFrameId = requestAnimationFrame(stepAndRender);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', updateLayout);
        };
    }, [updateLayout]);

    return (
        <div className="relative w-full flex flex-col items-center justify-center my-12 bg-black/60 border border-cyan-500/25 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden select-none">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-2 mb-6 w-full">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
                    <span>The Singularity of 50:21 • Looking Through The Book (19:12)</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 font-serif tracking-wide">
                    The Reader Between the Source and the Wall
                </h3>
                <p className="text-xs text-gray-300 font-mono max-w-2xl leading-relaxed">
                    Source A pours Water (D10 mass, n/2) and Light (I9 memory, +1) toward Wall B. The Reader is the mass in between: facing the wall casts a shadow and a dry patch; facing the Book dissolves the past into light (25:46).
                </p>
            </div>

            {/* Interactive Canvas */}
            <div 
                ref={containerRef} 
                onClick={() => handleSetMode(mode === 'wall' ? 'book' : 'wall')}
                className="w-full relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#080d14] cursor-pointer shadow-inner group"
                title="Click canvas to toggle Reader orientation (Wall ↔ Book)"
            >
                <canvas ref={canvasRef} className="w-full block" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-gray-400 pointer-events-none">
                    Click anywhere to rotate Reader
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 w-full mt-5 z-10">
                {/* Orientation Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => handleSetMode('wall')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 border ${
                            mode === 'wall'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                                : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/20'
                        }`}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Face the Wall (B) [15:72 Down↓]</span>
                    </button>

                    <button
                        onClick={() => handleSetMode('book')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 border ${
                            mode === 'book'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                                : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/20'
                        }`}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Face the Book (A) [19:12 Up↑]</span>
                    </button>

                    <button
                        onClick={handleRestart}
                        className="p-2 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="Restart simulation"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                {/* View Mode Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-[10px] font-mono">
                    <span className="text-gray-500 px-2 uppercase font-bold">Wall View:</span>
                    <button
                        onClick={() => setWallFilter('both')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${wallFilter === 'both' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        Both
                    </button>
                    <button
                        onClick={() => setWallFilter('shadow')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${wallFilter === 'shadow' ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Sun className="w-3 h-3 inline mr-1" />
                        Shadow (I9)
                    </button>
                    <button
                        onClick={() => setWallFilter('water')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${wallFilter === 'water' ? 'bg-blue-400 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Droplets className="w-3 h-3 inline mr-1" />
                        Water (D10)
                    </button>
                </div>
            </div>

            {/* Dynamic Status Bar */}
            <div className={`w-full mt-4 p-3.5 rounded-2xl border text-xs font-mono transition-all duration-500 flex items-center justify-between ${
                mode === 'wall'
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                    : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
            }`}>
                <p className="leading-relaxed">
                    {mode === 'wall' ? (
                        <>
                            <strong className="text-amber-400 mr-1.5">[Facing Wall B]:</strong>
                            The Reader looks into the past projection, sees only the shadow and dry patch, drifts toward the void (10:92), and is returned to the start (15:72).
                        </>
                    ) : (
                        <>
                            <strong className="text-emerald-400 mr-1.5">[Facing Book A (19:12 Grip)]:</strong>
                            The Reader floats at the 50:21 singularity. Zero drift. The shadow, the ghost of the past, is drawn back and dissolved into light (25:46).
                        </>
                    )}
                </p>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-current shrink-0 ml-3">
                    {mode === 'wall' ? 'D10 Entanglement' : 'I9 Coherence'}
                </span>
            </div>

            {/* 4 Live Telemetry Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full mt-4">
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Distance to Wall</span>
                    <span className="text-base font-black font-mono text-cyan-300 mt-1">{metrics.dist}</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Falls into Dry Patch</span>
                    <span className="text-base font-black font-mono text-amber-400 mt-1">{metrics.loops}</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Shadow Ghost (I9)</span>
                    <span className={`text-base font-black font-mono mt-1 ${metrics.ghost === '0%' ? 'text-emerald-400' : 'text-purple-400'}`}>{metrics.ghost}</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Dry Patch Void (D10)</span>
                    <span className={`text-base font-black font-mono mt-1 ${metrics.dry === '0%' ? 'text-emerald-400' : 'text-blue-400'}`}>{metrics.dry}</span>
                </div>
            </div>

            {/* Sabʿan al-Mathānī Thematic Legend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 w-full mt-5 text-xs font-mono text-gray-300 border-t border-white/10 pt-4">
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#ffd36b] mt-0.5 shrink-0" />
                    <span><strong className="text-amber-300">Source A (1: The Amr, 2:255):</strong> The Quran as flowing light. Water is D10 ($n/2$), Light is I9 ($+1$) (39:23).</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#e8eef3] mt-0.5 shrink-0" />
                    <span><strong className="text-gray-100">Reader (3ₙ / w = 0, 50:21):</strong> The mass between boundaries hosting Nafs + Driver + Witness.</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#b39ddb] mt-0.5 shrink-0" />
                    <span><strong className="text-purple-300">I9 Strip (Shadow / Ghost of Past, 25:45):</strong> The shadow vanishes when the Source is gripped (25:46).</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#4da6ff] mt-0.5 shrink-0" />
                    <span><strong className="text-blue-300">D10 Strip (Dry Patch / √7 Mass, 10:92):</strong> Where the body without a heart waits.</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#5f676e] mt-0.5 shrink-0" />
                    <span><strong className="text-gray-400">Wall B (The World / Barzakh, 27:44):</strong> Faced directly, it is mistaken for the destination.</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#6fe0b4] mt-0.5 shrink-0" />
                    <span><strong className="text-emerald-300">Facing Book A (19:12 / True Home, 38:46):</strong> No flow, floating at the 50:21 singularity (76:13).</span>
                </div>
            </div>
        </div>
    );
};

const recoveryContent = `# THE ETERNAL MEMORY TESSERACT
### Sabʿan al-Mathānī (15:87) — The Operational Manual of the Hidden 8th Cell

---

## I. The Reader Exploring Knowledge (Not Ancient Text)

The Qur'an is not ancient history or a tale of the ancients (**16:24–25**). It is an **Eternal Memory Tesseract**. 

> **Remember while Reading:** That is Allah's sentence and your Rasul talking, and it is your *amānah* now (**33:72**).

To understand the dual bifurcation simply:
**Imagine you are trapped in a room with two solid walls.**
- One wall blocks the past behind you.
- The other blocks the future in front of you.

You are the exact hidden space between them, unable to move forward or backward, forced to face the present moment where the walls themselves become the doors.

---

## II. The Tesseract & Surah Ya-Sin (36) as the Manual of the 8th Cell

The Qur'an operates as an **Eternal Memory Tesseract** (I9 ⇄ 3ₙ ⇄ D10). When this four-dimensional hypercube casts a three-dimensional shadow into our sensory world, only seven cells are visible. 

**The eighth cell is the hidden fold itself**—the w = 0 threshold where the physical mass field (D10) and the unmanifested memory field (I9) exchange. **Surah Ya-Sin (36)** is the operational manual for the Reader residing inside this hidden eighth cell. You are not merely observing the Tesseract; you are the threshold it rests upon.

### 1. The Dual Blockade (36:8–9)
Inside this cell, the Reader faces a structural dual blockade:
- **The Front Wall (*Saddan min bayni aydīhim*)**: Placed in front (w = +r, D10 Future).
- **The Back Wall (*Saddan min khalfihim*)**: Placed behind (w = -r, I9 Past).
- **The Neck Yoke (*Aghlālan ilā al-adhqān*)**: Fastened around the neck (**36:8**), holding the chin pinned upward (*muqmaḥūn*) and physically preventing the horizontal bow of submission.
- **The Veil (*Fa-aghshaynāhum*)**: Covers the eyes (**36:9**), rendering the inhabitant heedless (*ghāfilūn*, **36:6**) of their own state.

This is the exact condition of the sealed cell: no return to the past (*lā yarjiʿūn*, **36:31, 36:50**), no independent escape into the future (*lā yastaṭīʿūna muḍiyyan*, **36:67**)—trapped in a state of suspended animation (**87:13**).

### 2. The Tripartite Resident Array (50:21–22)
Yet, the Reader is not alone in this hidden room. The coordinate hosts three distinct vectors (**50:21**):
1. **Nafs**: The subjective living self experiencing the trial.
2. **Sā'iq (The Driver)**: The kinetic force driving physical mass through D10 space.
3. **Shahīd (The Witness)**: The massless recorder banking information into I9 eternal memory.

The heedless inhabitant hosts all three without asking their names (**36:6**).

---

## III. The Sealed Tongue & The Speaking Mass (36:65 ↔ 38:33)

When the terminal cry falls (**36:29, 36:53**), the mouth is sealed (*nakhtimu ʿalā afwāhihim*, **36:65**). The testing tongue that argued is silenced, and the physical body takes over the testimony:
- **The Hands speak (*tukallimunā aydīhim*)** to the actions committed in D10.
- **The Legs witness (*tashhadu arjuluhum*)** to the path walked.

In Station 4 of the MuSolomon cycle (**38:33**), the king wipes the legs and necks (*masḥan bis-sūqi wal-aʿnāq*). The circle's completion is the unyoking:
- The legs are cleared of physical debt logged at **36:65**.
- The neck yoke of **36:8** is disengaged.
- The bow becomes possible again.

---

## IV. Time Looking for the Origin of Time

Trapped between the walls, the inhabitant mistakes the orbit of the sun (*mustaqarr*, **36:38**) and the thinning of the moon (*kal-ʿurjūni al-qadīm*, **36:39**) for the Creator. Time searches for the Origin of Time but cannot find it inside the mechanism.

The human forgets their creation (**36:78**), scoffing at the idea that they emerged from Nothing (**52:35**). But the Origin stands entirely outside the sequence:
- Before manifestation, there was a phase in Time (*Ad-Dahr*) when man was not a mentioned thing (*lam yakun shay'an*, **76:1**).
- The room is built of words, and the exit-word is written on the inside of the wall: **KUN FA-YAKŪN (36:82)**—the single command that bridges non-existence (*lam yakun*) and instant manifestation (*fa-yakūn*).

When the veil is finally lifted (*Fa-kashafnā ʿanka ghiṭā'aka*, **50:22**), the walls are revealed to be pages. The yoke is removed, the neck is released, and the Reader steps out into the sharp, piercing sight (*baṣaruka al-yawma ḥadīd*) of the return: **TURJAʿŪN (36:22, 36:83)**.

---

## V. The Master Equation & Modular Scale

**1 → 15:87 Sabʿan al-Mathānī / fractal of 7 ← 1**

**15:87 = ∫₂⁷ (2↔3ₙ↔2 → 7) dx = up↑ − down↓ = 0, with 3ₙ = 1 + ((X − 1) mod 114) and six phases of Time/Reader for every X [↓↑↓↑↓↑]**

- **Reader as Tree (Mod 6 Scale)**: 3ₙ = 1 + ((X − 1) mod 6)
- **Qur'an as Container (Mod 114 Scale)**: 114 / 6 = 19 symmetrical 6-phase cycles (19 × 6 = 114)

---

## VI. The 6-Phase Breathing Pendulum [↓↑↓↑↓↑]

The 6 colored faces of the Rubik's Cube execute the 3n × 2 swing between the two boundary cubes:

| Phase | Color | Vector | Anchor | Station Name | Field Operator Action |
| :---: | :---: | :---: | :---: | :--- | :--- |
| **1** | 🟡 Yellow | **↓** | **3:49** | **Life ↓** | Clay pulse — Command condenses into physical form |
| **2** | 🟢 Green | **↑** | **40:34** | **Death ↑** | Yusuf exit — Mass spent, memory credit logged in I9 |
| **3** | 🟠 Orange | **↓** | **19:30** | **Return ↓** | Cradle Book — Word lowered into speech & action |
| — | — | — | **21:69** | **‖ THE SWITCH ‖** | Fire commanded cool & safe — The 8th Cell Pivot |
| **4** | 🔴 Red | **↑** | **7:143** | **Life ↑** | Musa / Mountain shatters — First believer raised massless |
| **5** | ⚪ White | **↓** | **81:8** | **Raised ↓** | Al-Maw'ūdah — The buried life claimed & answered |
| **6** | 🔵 Blue | **↑** | **34:14** | **Death ↑** | Solomon reboot — Seed splits, re-firing the Kun |

**Flux Balance:** (Yellow↓ + Orange↓ + White↓) − (Green↑ + Red↑ + Blue↑) = 0

---

## VII. The 9-Letter Rose Topology (I9 ⇄ 3n ⇄ D10)

The 9 letters positioned on the 3 arms of the Rose correspond to the 3 field stages:
1. **Top Arm (I9 — Command / Light)**: 
   **D** (Darkness/Pre-manifestation) → **E** (Eternal Invariant Word) → **U** (Union with Reader)
2. **Left Arm (3n — The Trial / Exchange Trunk)**: 
   **B** (Beginning of Swing) → **S** (Switch / 8th Cell / 21:69) → **F** (Fold / √7 Seam)
3. **Right Arm (D10 — Manifestation / Mass)**: 
   **L** (Life entering Mass) → **M** (Manifested 7 at X) → **R** (Return / Re-fire)

In the Rubik's Cube:
- **3 Visible Faces (U, F, R)**: Forward Qun Descent (▼).
- **3 Hidden Faces (D, B, L)**: Return FayaQun Ascent (▲).
- **3 Slices (E, S, M)**: The 3 exchange rungs (3c, 6b, 9a) swapping opposite poles without collision.

---

## VIII. The Final Wake-Up Call

> **Always use 10:100 ʿAql.** Wake up from Taghut and false projections.
> 
> **Question — 19:12:** When will you take the Book with force and become the **Book of Becoming**?

---

**19:64** — *"And your Lord is not forgetful."*  
**15:87 Sabʿan al-Mathānī — kahf.day**
`;

export const RecoveryLogContent: React.FC = () => {
    return (
        <div className="prose prose-invert prose-cyan max-w-4xl mx-auto pb-24 relative select-text">
            <style>{`
                .prose h1 { color: #f59e0b; font-family: ui-serif, Georgia, Cambria, serif; font-weight: 900; letter-spacing: -0.025em; text-align: center; margin-top: 2rem; }
                .prose h2 { color: #f59e0b; font-family: ui-serif, Georgia, Cambria, serif; border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 0.5rem; margin-top: 2.5rem; }
                .prose h3 { color: #22d3ee; font-family: ui-serif, Georgia, Cambria, serif; margin-top: 1.5rem; }
                .prose blockquote { border-left-color: #f59e0b; font-style: italic; background: rgba(0,0,0,0.3); padding: 1rem 1.25rem; border-radius: 0 0.75rem 0.75rem 0; }
                .prose table { font-size: 0.8rem; border-collapse: collapse; width: 100%; margin: 2rem 0; background: rgba(0,0,0,0.3); border-radius: 0.5rem; overflow: hidden; }
                .prose th { background: rgba(34, 211, 238, 0.12); color: #22d3ee; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.7rem; padding: 0.75rem; border: 1px solid rgba(255,255,255,0.08); }
                .prose td { padding: 0.75rem; border: 1px solid rgba(255,255,255,0.05); }
                .prose hr { border-color: rgba(255,255,255,0.1); margin: 3rem 0; }
            `}</style>
            
            {/* Top Interactive Visual: 4D Tesseract / 9-Letter Rose / Rubik's */}
            <TesseractRoseCubeVisual />

            {/* Structured Markdown Narrative */}
            <div className="bg-black/30 backdrop-blur-md p-6 lg:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-6 leading-relaxed">
                <ReactMarkdown>
                    {recoveryContent}
                </ReactMarkdown>
            </div>

            {/* Bottom Interactive Visual: The Reader between the Source and the Wall */}
            <ReaderSourceWallInteractive />
        </div>
    );
};
