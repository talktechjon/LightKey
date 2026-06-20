import React, { useMemo } from 'react';
import { TRIANGLE_POINTS, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, CENTRAL_GEOMETRY_POINTS, COLORS } from '../constants.ts';
import { TrianglePoint } from '../types.ts';
import { getSliceAtPoint, getChapterIcon } from '../utils.ts';
import VersePolygon from './VersePolygon.tsx';

interface ChapterGeometryProps {
    rotation: number;
    isLowResourceMode: boolean;
    showFunctionalTooltip: (e: React.MouseEvent, message: string, chapterId: number, color: string) => void;
    hideTooltip: () => void;
    setCustomSequence?: (value: string) => void;
    setAnimationMode?: (mode: 'play' | 'step' | 'off') => void;
}

type PointWithColor = TrianglePoint & { color: string };

// A memoized, self-contained component for the triangle geometry groups.
const TriangleGeometryGroup = React.memo(({ points, name, direction, rotation, isLowResourceMode, showFunctionalTooltip, hideTooltip }: { 
    points: PointWithColor[], 
    name: string, 
    direction: 'downward' | 'upward', 
    rotation: number, 
    isLowResourceMode: boolean,
    showFunctionalTooltip: (e: React.MouseEvent, message: string, chapterId: number, color: string) => void;
    hideTooltip: () => void;
}) => {
  const hasTooltip = !name.includes('🌴') && !name.includes('🐟');
  const titleColor = direction === 'downward' ? 'text-cyan-400' : 'text-pink-500';
  const titleSymbol = direction === 'downward' ? '▼' : '▲';

  const headerTooltip = name.includes('Command') ? 'Input Engine: Chrysalis' : 'Output Engine: Photosynthesis';

  const getPointTooltip = (type: string, chapterName: string) => {
    if (type.includes('Slave')) return `The Vector (1): Prayer & Intent (66:11, 19:3)`;
    if (type.includes('Queen')) return `Shadow Surplus (+1) / Entropy Term: ${chapterName}`;
    if (type.includes('Righteous')) return `Faith Coherence: ${chapterName}`;
    if (type.includes('Turabin')) return `Command Propagation: ${chapterName}`;
    if (type.includes('Cave')) return `Cubic Overflow Phase (10): ${chapterName}`;
    if (type.includes('Orphan')) return `Biological Cardiac Zero Point / Light Coherence (9): ${chapterName}`;
    return type;
  };
  
  return (
    <div>
      <h3 
        className={`font-semibold text-lg ${titleColor} mb-2 ${hasTooltip ? 'cursor-help' : ''}`} 
        style={{ textShadow: `0 0 5px currentColor`}}
        {...(hasTooltip ? {
            onMouseEnter: (e) => showFunctionalTooltip(e, headerTooltip, getSliceAtPoint(points[0].value, rotation).id, direction === 'downward' ? '#FF00FF' : '#00FFFF'),
            onMouseLeave: hideTooltip
        } : {})}
      >
        {titleSymbol} {name}
      </h3>
      <div className="mt-1 flex justify-around items-start space-x-2">
        {points.map((point, i) => {
          const slice = getSliceAtPoint(point.value, rotation);
          const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
          const muqattatLetters = MUQATTAT_LETTERS.get(slice.id);
          const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
          const iconSrc = getChapterIcon(chapterInfo.revelationType);
          const customTooltip = getPointTooltip(point.type, chapterInfo.englishName);

          return (
            <div 
              key={i} 
              className="text-center w-1/3 flex flex-col items-center"
              aria-label={`${point.type}: ${customTooltip}, Chapter ${slice.id}, ${slice.blockCount} verses.`}
            >
              <svg width={45} height={45} viewBox="0 0 45 45">
                  <VersePolygon
                    verseCount={slice.blockCount}
                    radius={18}
                    color={point.color}
                    center={{ x: 22.5, y: 22.5 }}
                    groupOpacity={0.8}
                    isLowResourceMode={isLowResourceMode}
                  />
              </svg>
              <div className="mt-1 leading-tight flex flex-col justify-center w-full overflow-visible">
                <p 
                  className="font-bold text-white text-[9px] sm:text-[10px] md:text-[11px] lg:text-sm text-center w-full whitespace-nowrap" 
                >
                  {point.type}
                </p>
                <p className="text-gray-300 text-sm mt-0.5 flex items-center justify-center gap-1">
                  {direction === 'downward' ? (
                    <svg width="10" height="12" viewBox="0 0 16 20" fill="none" className="text-cyan-400 shrink-0">
                        <path d="M 8 0 L 8 16 M 8 16 L 3 11 M 8 16 L 13 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="10" height="12" viewBox="0 0 16 20" fill="none" className="text-pink-500 shrink-0">
                        <path d="M 8 20 L 8 4 M 8 4 L 3 9 M 8 4 L 13 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span className={`font-bold ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}</span>:<span className="font-medium">{slice.blockCount}</span>
                </p>
                 <p className="text-gray-400 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px]" title={chapterInfo.englishName}>
                    <img src={iconSrc} alt={chapterInfo.revelationType} className="w-2.5 h-2.5 shrink-0" />
                    <span className="whitespace-normal leading-[1.1] text-center">{chapterInfo.englishName}</span>
                </p>
                <div className="h-5 flex items-center justify-center w-full overflow-hidden mt-0.5">
                    {muqattatLetters ? (
                        <span className="font-mono text-[13px] muqattat-glow text-white" dir="rtl">
                            {muqattatLetters.join(' ')}
                        </span>
                    ) : (
                        <span className="w-full h-px bg-transparent"></span>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const RosslerFlow: React.FC<{ rotation: number, isPaused: boolean }> = ({ rotation, isPaused }) => {
    const { pathData, markers } = useMemo(() => {
        let x = 0.1, y = 0, z = 0;
        
        // Map to exact pairs for this flow: Slave(1), Queen(39), Righteous(77)
        const slave = getSliceAtPoint(1, rotation);
        const queen = getSliceAtPoint(39, rotation);
        const righteous = getSliceAtPoint(77, rotation);

        // a = twist, range [0.15, 0.45]
        const aVal = 0.15 + (slave.blockCount / 2000) + (queen.blockCount / 1500);
        const a = Math.min(0.45, Math.max(0.15, aVal));
        
        // c = threshold, range [4.0, 7.5]
        const cVal = 4.0 + (righteous.id / 35);
        const c = Math.min(7.5, Math.max(4.0, cVal));
        
        const b = 0.2, dt = 0.02;
        const pts: {px: number, py: number, rz: number}[] = [];

        // Warm up
        for (let i = 0; i < 500; i++) {
            const dx = -y - z;
            const dy = x + a * y;
            const dz = b + z * (x - c);
            x += dx * dt; y += dy * dt; z += dz * dt;
            if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) break;
        }

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
        for (let i = 0; i < 5500; i++) {
            const dx = -y - z;
            const dy = x + a * y;
            const dz = b + z * (x - c);
            x += dx * dt; y += dy * dt; z += dz * dt;
            
            if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z) || Math.abs(x) > 1000) break;

            const angle = -1.57;
            const rotX = x * Math.cos(angle) - y * Math.sin(angle);
            const rotY = x * Math.sin(angle) + y * Math.cos(angle);
            
            const tilt = 0.45, zScale = 1.4;
            const px = rotX;
            const py = rotY * tilt - z * zScale;
            
            pts.push({ px, py, rz: z });
            if (px < minX) minX = px; if (px > maxX) maxX = px;
            if (py < minY) minY = py; if (py > maxY) maxY = py;
            if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
        }

        if (pts.length < 10) return { pathData: "M 0 0", markers: [] };

        const pad = 12;
        const rangeX = maxX - minX || 1;
        const rangeY = maxY - minY || 1;
        const scaleX = (val: number) => pad + (100 - pad * 2) * ((val - minX) / rangeX);
        const scaleY = (val: number) => pad + (100 - pad * 2) * ((val - minY) / rangeY);
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.px)} ${scaleY(p.py)}`).join(' ');

        // Intelligent spike detection for markers
        const spikePeaks: number[] = [];
        const zThreshold = (maxZ - minZ) * 0.4;
        for(let i = 1; i < pts.length - 1; i++) {
            if(pts[i].rz > pts[i-1].rz && pts[i].rz > pts[i+1].rz && pts[i].rz > zThreshold) spikePeaks.push(i);
        }
        const mainSpike = spikePeaks.length > 2 ? spikePeaks[Math.floor(spikePeaks.length / 2)] : Math.floor(pts.length * 0.7);

        // Markers for Rossler: Slave, Queen, Righteous
        const m = [
            { idx: mainSpike - 600, color: COLORS.triangle2, name: '3c', label: `Slave [${slave.id}:${slave.blockCount}]` },
            { idx: mainSpike - 300, color: COLORS.triangle2, name: '6b', label: `Queen [${queen.id}:${queen.blockCount}]` },
            { idx: mainSpike, color: COLORS.triangle2, name: '9a', label: `Righteous [${righteous.id}:${righteous.blockCount}]` },
        ];

        const scaledMarkers = m.map(marker => {
            const safeIdx = Math.max(0, Math.min(marker.idx, pts.length - 1));
            const p = pts[safeIdx];
            return { ...marker, x: scaleX(p.px), y: scaleY(p.py) };
        });

        return { pathData: d, markers: scaledMarkers };
    }, [rotation]);

    return (
        <div className="relative w-[130px] h-[130px] flex items-center justify-center overflow-visible">
            <style>{`
                @keyframes flow-tracer {
                    0% { stroke-dashoffset: 1; opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 1; }
                }
                .flow-core-path {
                    stroke-width: 0.25px;
                    fill: none;
                    stroke: rgba(255, 255, 255, 0.15);
                }
                .animate-tracer {
                    stroke-width: 1.5px;
                    fill: none;
                    stroke-linecap: round;
                    stroke-dasharray: 0.02 1; 
                    animation: flow-tracer 8s linear infinite;
                }
            `}</style>
            
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] overflow-visible">
                <path d={pathData} className="flow-core-path" />
                <path 
                    d={pathData} 
                    pathLength="1" 
                    stroke="url(#rosslerGrad)" 
                    className="animate-tracer"
                    style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                />

                {markers.map((m, i) => (
                    <g key={i} transform={`translate(${m.x}, ${m.y})`}>
                        <circle cx="0" cy="0" r="2.5" fill={m.color} fillOpacity="0.25" className="animate-pulse" />
                        <circle cx="0" cy="0" r="0.8" fill={m.color} />
                        <text x="3" y="-1.5" fontSize="2.8" fill={m.color} opacity="0.9" className="font-bold tracking-tight drop-shadow-md">
                            {m.name}
                        </text>
                        <text x="3" y="1.5" fontSize="2" fill="#9ca3af" opacity="0.8" className="tracking-tight whitespace-nowrap">
                            {m.label}
                        </text>
                        <line x1="0" y1="0" x2="2.5" y2="-1" stroke={m.color} strokeWidth="0.2" opacity="0.5" />
                    </g>
                ))}

                <defs>
                    <linearGradient id="rosslerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={COLORS.triangle2} />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor={COLORS.triangle1} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

const LorenzFlow: React.FC<{ rotation: number, isPaused: boolean }> = ({ rotation, isPaused }) => {
    const { pathData, markers } = useMemo(() => {
        let x = 0.1, y = 1, z = 1.05;
        
        // Map to exact pairs for this flow: Orphan(19), Cave(95), Turabin(57)
        const orphan = getSliceAtPoint(19, rotation);
        const cave = getSliceAtPoint(95, rotation);
        const turabin = getSliceAtPoint(57, rotation);

        // sigma = fluid properties, range [8.0, 16.0]
        const sigmaVal = 8.0 + (orphan.blockCount / 35);
        const sigma = Math.min(16.0, Math.max(8.0, sigmaVal));
        
        // rho = heat/driving force, range [20.0, 48.0]
        const rhoVal = 18.0 + (cave.id / 3);
        const rho = Math.min(48.0, Math.max(20.0, rhoVal));
        
        // beta = physical dimensions, range [2.0, 3.5]
        const betaVal = 2.0 + (turabin.blockCount / 100);
        const beta = Math.min(3.5, Math.max(2.0, betaVal));

        const dt = 0.008;
        const pts: {px: number, py: number}[] = [];

        // Warm up
        for (let i = 0; i < 400; i++) {
            const dx = sigma * (y - x);
            const dy = x * (rho - z) - y;
            const dz = x * y - beta * z;
            x += dx * dt; y += dy * dt; z += dz * dt;
            if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) break;
        }

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (let i = 0; i < 3500; i++) {
            const dx = sigma * (y - x);
            const dy = x * (rho - z) - y;
            const dz = x * y - beta * z;
            x += dx * dt; y += dy * dt; z += dz * dt;

            if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z) || Math.abs(x) > 1000) break;

            const px = x;
            const py = -z;

            pts.push({ px, py });
            if (px < minX) minX = px; if (px > maxX) maxX = px;
            if (py < minY) minY = py; if (py > maxY) maxY = py;
        }

        if (pts.length < 10) return { pathData: "M 0 0", markers: [] };

        const pad = 12;
        const rangeX = maxX - minX || 1;
        const rangeY = maxY - minY || 1;
        const scaleX = (val: number) => pad + (100 - pad * 2) * ((val - minX) / rangeX);
        const scaleY = (val: number) => pad + (100 - pad * 2) * ((val - minY) / rangeY);
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.px)} ${scaleY(p.py)}`).join(' ');

        // Markers for Lorenz: Orphan, Cave, Turabin
        const m = [
            { idx: 600, color: COLORS.triangle1, name: '3c', label: `Turabin [${turabin.id}:${turabin.blockCount}]` },
            { idx: 1750, color: COLORS.triangle1, name: '6b', label: `Cave [${cave.id}:${cave.blockCount}]` },
            { idx: 2900, color: COLORS.triangle1, name: '9a', label: `Orphan [${orphan.id}:${orphan.blockCount}]` },
        ];

        const scaledMarkers = m.map(marker => {
            const safeIdx = Math.max(0, Math.min(marker.idx, pts.length - 1));
            const p = pts[safeIdx];
            return { ...marker, x: scaleX(p.px), y: scaleY(p.py) };
        });

        return { pathData: d, markers: scaledMarkers };
    }, [rotation]);

    return (
        <div className="relative w-[130px] h-[130px] flex items-center justify-center overflow-visible">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] overflow-visible">
                <path d={pathData} className="flow-core-path" />
                <path 
                    d={pathData} 
                    pathLength="1" 
                    stroke="url(#lorenzGrad)" 
                    className="animate-tracer"
                    style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                />

                {markers.map((m, i) => (
                    <g key={i} transform={`translate(${m.x}, ${m.y})`}>
                        <circle cx="0" cy="0" r="2.5" fill={m.color} fillOpacity="0.25" className="animate-pulse" />
                        <circle cx="0" cy="0" r="0.8" fill={m.color} />
                        <text x="3" y="-1.5" fontSize="2.8" fill={m.color} opacity="0.9" className="font-bold tracking-tight drop-shadow-md">
                            {m.name}
                        </text>
                    </g>
                ))}

                <defs>
                    <linearGradient id="lorenzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={COLORS.triangle2} />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor={COLORS.triangle1} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export const TorusFlow: React.FC<{ rotation: number, isPaused: boolean, onToggle: () => void }> = ({ rotation, isPaused, onToggle }) => {
    const [time, setTime] = React.useState(0);
    const timeRef = React.useRef(0);

    React.useEffect(() => {
        let frame: number;
        let lastTime = performance.now();
        const animate = (now: number) => {
            const delta = now - lastTime;
            lastTime = now;
            if (!isPaused) {
                timeRef.current += delta / 1000;
                setTime(timeRef.current);
            }
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [isPaused]);

    const torusGeometry = useMemo(() => {
        // 1. DATA EXTRACTION: Get the 6 active chapters in the Qun-Fayaqun sequence
        const s1 = getSliceAtPoint(1, rotation);       // Slave [Qun ▼]
        const s39 = getSliceAtPoint(39, rotation);     // Queen [FayaQun ▲]
        const s77 = getSliceAtPoint(77, rotation);     // Righteous [Qun ▼]
        const s57 = getSliceAtPoint(57, rotation);     // Turabin [FayaQun ▲]
        const s95 = getSliceAtPoint(95, rotation);     // Cave [Qun ▼]
        const s19 = getSliceAtPoint(19, rotation);     // Orphan [FayaQun ▲]
        
        // Sequence: Slave -> Queen -> Righteous -> Orphan -> Cave -> Turabin
        const nodes = [s1, s39, s77, s19, s95, s57];
        
        // 2. METRIC CALCULATION: Unique Mathematical Signature based on 114 & 286
        const maxId = 114;
        const maxVerses = 286;

        // Fayaqun (▲) Expansion Forces
        const expVerses = nodes[1].blockCount + nodes[3].blockCount + nodes[5].blockCount;
        const expForce = expVerses / (3 * maxVerses);
        const expComplexity = (nodes[1].id + nodes[3].id + nodes[5].id) / (3 * maxId);
        
        // Qun (▼) Contraction Forces
        const conVerses = nodes[0].blockCount + nodes[2].blockCount + nodes[4].blockCount;
        const conForce = conVerses / (3 * maxVerses);
        const conComplexity = (nodes[0].id + nodes[2].id + nodes[4].id) / (3 * maxId);

        // 3. DCU TORUS PARAMETERS (Mapping Narratives to Geometry)
        const levels = Math.floor(12 + expComplexity * 20); // Tubular Levels
        const segments = Math.floor(20 + conComplexity * 20); // Radial Segments
        const tilt = Math.PI / 2.5 + (expForce - conForce) * 0.2; // Tilt angle

        // Time and Phase
        const flowVelocity = 0.15 + ((expForce + conForce) / 2) * 0.5; // Scaled down for slower breathing
        const true_s = flowVelocity * time * 0.5; // Scale down time slightly for the breath
        const phase = ((true_s % 1) + 1) % 1; // 0 to 1

        let activePhase = "Turabin";
        let color = COLORS.triangle1; 
        let isQun = false;

        const cycleIdx = Math.floor(phase * 6);
        const currentNode = nodes[cycleIdx] || nodes[5];

        if (phase < 1/6) {
            activePhase = "Slave"; color = COLORS.triangle2; isQun = true;
        } else if (phase < 2/6) {
            activePhase = "Queen"; color = COLORS.triangle1; isQun = false;
        } else if (phase < 3/6) {
            activePhase = "Righteous"; color = COLORS.triangle2; isQun = true;
        } else if (phase < 4/6) {
            activePhase = "Orphan"; color = COLORS.triangle1; isQun = false;
        } else if (phase < 5/6) {
            activePhase = "Cave"; color = COLORS.triangle2; isQun = true;
        } else {
            activePhase = "Turabin"; color = COLORS.triangle1; isQun = false;
        }

        // 4. PARAMETRIC BREATHING (Implosion-Explosion)
        // Extract the progress within the current phase (0 to 1)
        const subPhase = (phase % (1/6)) * 6;
        
        // Easing function for smoother breathing
        const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easedPhase = easeInOut(subPhase);

        // Calculate dynamic dimensions based on Implosion/Explosion state
        // Qun = Implosion (R_major shrinks, r_minor grows)
        // FayaQun = Explosion (R_major grows, r_minor shrinks)

        let R_major, r_minor;
        
        // Base values mapped from forces
        const min_R_major = 10 + conForce * 10;
        const max_R_major = 35 + expForce * 15;
        const min_r_minor = 3 + expForce * 5;
        const max_r_minor = 12 + conForce * 8;

        if (isQun) {
            // Imploding: R_major goes max -> min, r_minor goes min -> max
            R_major = max_R_major - easedPhase * (max_R_major - min_R_major);
            r_minor = min_r_minor + easedPhase * (max_r_minor - min_r_minor);
        } else {
            // Exploding: R_major goes min -> max, r_minor goes max -> min
            R_major = min_R_major + easedPhase * (max_R_major - min_R_major);
            r_minor = max_r_minor - easedPhase * (max_r_minor - min_r_minor);
        }

        return {
            scale: 0.9, 
            activePhase,
            color,
            isQun,
            phase,
            levels,
            segments,
            r_minor,
            R_major,
            tilt,
            flowVelocity,
            currentNode,
            expForce,
            conForce
        };
    }, [rotation, time]);

    const dataPairs = useMemo(() => {
        const p1 = getSliceAtPoint(1, rotation);       // Slave
        const p39 = getSliceAtPoint(39, rotation);     // Queen
        const p77 = getSliceAtPoint(77, rotation);     // Righteous
        const p19 = getSliceAtPoint(19, rotation);     // Orphan
        const p95 = getSliceAtPoint(95, rotation);     // Cave
        const p57 = getSliceAtPoint(57, rotation);     // Turabin
        return { p1, p39, p77, p19, p95, p57 };
    }, [rotation]);

    const phaseDataMap = {
        "Slave": { ...dataPairs.p1, label: "Slave ▼", icon: "🌴", colorClass: "text-cyan-400", labelClass: "text-cyan-500/80" },
        "Queen": { ...dataPairs.p39, label: "Queen ▲", icon: "🐝", colorClass: "text-pink-500", labelClass: "text-pink-500/80" },
        "Righteous": { ...dataPairs.p77, label: "Righteous ▼", icon: "💧", colorClass: "text-cyan-400", labelClass: "text-cyan-500/80" },
        "Turabin": { ...dataPairs.p57, label: "Turabin ▲", icon: "🐟", colorClass: "text-pink-500", labelClass: "text-pink-500/80" },
        "Cave": { ...dataPairs.p95, label: "Cave ▼", icon: "🕋", colorClass: "text-cyan-400", labelClass: "text-cyan-500/80" },
        "Orphan": { ...dataPairs.p19, label: "Orphan ▲", icon: "🔆", colorClass: "text-pink-500", labelClass: "text-pink-500/80" },
    };
    const activePhaseData = phaseDataMap[torusGeometry.activePhase as keyof typeof phaseDataMap];
    const activeChapter = CHAPTER_DETAILS.find(c => c.number === activePhaseData?.id);

    return (
        <div className="flex flex-col w-full space-y-4">
            <div className="relative w-full h-[240px] bg-black/95 rounded-xl border border-gray-800/80 shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-colors duration-500" style={{ boxShadow: `inset 0 0 40px ${torusGeometry.color}15` }}>
                
                {/* Active State Indicator integrated with Visual Telemetry Dots */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-start justify-start pointer-events-none">
                    {/* The 2 pulsing dots representing Qun/FayaQun polarity */}
                    <div className="flex items-center space-x-1 mr-2 mt-1 shrink-0">
                        <div 
                            className={`w-1.5 h-1.5 rounded-full border border-gray-700 transition-all duration-500 ${torusGeometry.isQun ? 'scale-125 shadow-[0_0_10px_currentColor] border-white/20' : 'opacity-30'}`} 
                            style={{ 
                                backgroundColor: torusGeometry.isQun ? torusGeometry.color : 'transparent',
                                color: torusGeometry.color
                            }} 
                        />
                        <div 
                            className={`w-1.5 h-1.5 rounded-full border border-gray-700 transition-all duration-500 ${!torusGeometry.isQun ? 'scale-125 shadow-[0_0_10px_currentColor] border-white/20' : 'opacity-30'}`} 
                            style={{ 
                                backgroundColor: !torusGeometry.isQun ? torusGeometry.color : 'transparent',
                                color: torusGeometry.color
                            }} 
                        />
                    </div>

                    {/* Active State Text integrated beside the pulsing dots */}
                    {activePhaseData && activeChapter && (
                        <div className="flex flex-col gap-0.5 text-[10px] sm:text-[11px] font-mono font-medium min-w-0 transition-opacity duration-300 leading-tight">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-white font-bold">{activePhaseData.id}:{activePhaseData.blockCount}</span>
                                <span className="text-gray-300">{activeChapter.englishName}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-gray-500">State →</span>
                                <span className={`flex-shrink-0 ${activePhaseData.colorClass} font-bold transition-colors duration-500 drop-shadow-md flex items-center gap-1`}>
                                    {activePhaseData.icon} {activePhaseData.label}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Parametric Torus Geometry */}
                <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible z-20" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id="torusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={torusGeometry.color} stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
                            <stop offset="100%" stopColor={torusGeometry.color} stopOpacity="0.1" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    <g transform={`translate(50, 50) scale(${torusGeometry.scale})`}>
                        {/* 3D Parametric Wireframe Projection */}
                        {(() => {
                            const R_major = torusGeometry.R_major;
                            const r_minor = torusGeometry.r_minor; // Use r_minor from geometry
                            
                            // To create the inside-out rolling effect (poloidal flow):
                            const poloidal_flow = time * torusGeometry.flowVelocity * 1.5;
                            // To create toroidal rotation:
                            const toroidal_flow = time * torusGeometry.flowVelocity * 0.4;
                            
                            const rotX = time * 0.2 + torusGeometry.tilt; // Tumble X
                            const rotY = time * 0.15; // Tumble Y
                            
                            const project = (u: number, v: number) => {
                                // Add offset for rolling inside out effect
                                const actual_v = v + poloidal_flow;
                                const actual_u = u + toroidal_flow;

                                // Basic Torus Parametric Equations
                                const x0 = (R_major + r_minor * Math.cos(actual_v)) * Math.cos(actual_u);
                                const y0 = (R_major + r_minor * Math.cos(actual_v)) * Math.sin(actual_u);
                                const z0 = r_minor * Math.sin(actual_v);
                                
                                // Rotate around X-axis
                                const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
                                const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);
                                
                                // Rotate around Y-axis
                                const x2 = x0 * Math.cos(rotY) + z1 * Math.sin(rotY);
                                
                                // Very simple perspective projection
                                const perspective = 150 / (150 + z1);
                                
                                return { x: x2 * perspective, y: y1 * perspective };
                            };

                            const paths = [];
                            
                            // Longitudinal Rings (Major Axis)
                            for (let i = 0; i < torusGeometry.levels; i++) {
                                const v = (i / torusGeometry.levels) * Math.PI * 2;
                                const actual_v = v + poloidal_flow;
                                const isOuter = Math.cos(actual_v) > 0;
                                const oppositeColor = torusGeometry.color === COLORS.triangle1 ? COLORS.triangle2 : COLORS.triangle1;
                                
                                let d = "";
                                for (let j = 0; j <= 40; j++) {
                                    const u = (j / 40) * Math.PI * 2;
                                    const p = project(u, v);
                                    d += `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
                                }
                                paths.push(
                                    <path 
                                        key={`v-${i}`} 
                                        d={d} fill="none" 
                                        stroke={isOuter ? torusGeometry.color : oppositeColor} 
                                        strokeWidth={isOuter ? "0.6" : "0.3"} 
                                        opacity={isOuter ? 0.6 : 0.25} 
                                        style={{ transition: 'stroke 1s ease' }}
                                    />
                                );
                            }

                            // Latitudinal Rings (Minor Axis)
                            for (let i = 0; i < torusGeometry.segments; i++) {
                                const u = (i / torusGeometry.segments) * Math.PI * 2;
                                
                                let d = "";
                                for (let j = 0; j <= 20; j++) {
                                    const v = (j / 20) * Math.PI * 2;
                                    const p = project(u, v);
                                    d += `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
                                }
                                paths.push(
                                    <path 
                                        key={`u-${i}`} 
                                        d={d} fill="none" 
                                        stroke={torusGeometry.color} 
                                        strokeWidth="0.2" 
                                        opacity={0.15} 
                                        style={{ transition: 'stroke 1s ease' }}
                                    />
                                );
                            }

                            return paths;
                        })()}

                        {/* Quantum Flow Particles on 3D Path */}
                        {Array.from({ length: 90 }).map((_, i) => {
                            const u = ((i / 90) * Math.PI * 2 * 3) + (time * 0.3); // Spiral wrapping
                            const v = (time * 1.5) + (i * 0.1); // Slower poloidal flow

                            const r_minor = torusGeometry.r_minor;
                            const R_major = torusGeometry.R_major;

                            const actual_v = v;
                            const actual_u = u + (time * torusGeometry.flowVelocity * 0.8);

                            const rotX = time * 0.2 + torusGeometry.tilt;
                            const rotY = time * 0.15;
                            
                            const x0 = (R_major + r_minor * Math.cos(actual_v)) * Math.cos(actual_u);
                            const y0 = (R_major + r_minor * Math.cos(actual_v)) * Math.sin(actual_u);
                            const z0 = r_minor * Math.sin(actual_v);
                            
                            const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
                            const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);

                            const x2 = x0 * Math.cos(rotY) + z1 * Math.sin(rotY);
                            
                            const perspective = 150 / (150 + z1);

                            return (
                                <circle 
                                    key={`dot-${i}`}
                                    cx={x2 * perspective} cy={y1 * perspective} 
                                    r={1.0 * perspective}
                                    fill="#ffffff"
                                    style={{ filter: "url(#glow)" }}
                                    opacity={0.7 + Math.sin(time * 2 + i) * 0.3}
                                />
                            );
                        })}

                        {/* Central Core Glow */}
                        <ellipse 
                            cx="0" cy="0" rx="14" ry="6" 
                            fill={torusGeometry.color}
                            opacity="0.1"
                            filter="url(#glow)"
                        />
                    </g>
                </svg>
            </div>
 
            {/* Geometric Data Legend Box */}
            <div className="w-full bg-black/40 border border-gray-800 rounded-xl p-4 sm:p-6 overflow-hidden">
                <div className="grid grid-cols-3 gap-y-8 relative">
                    {/* Row 1: Slave -> Queen -> Righteous */}
                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-lg sm:text-xl">🌴</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base leading-tight">
                                {dataPairs.p1.id}:{dataPairs.p1.blockCount}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full">
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p1.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-cyan-500/80 tracking-tighter mt-0.5">Slave ▼</div>
                            <div className="text-[7.5px] sm:text-[8px] font-mono text-cyan-400/50 leading-none mt-0.5 select-none">[5:30]</div>
                        </div>
                    </div>
 
                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-lg sm:text-xl">🐝</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-pink-500 font-bold text-sm sm:text-base leading-tight">
                                {dataPairs.p39.id}:{dataPairs.p39.blockCount}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full">
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p39.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-pink-500/80 tracking-tighter mt-0.5">Queen ▲</div>
                            <div className="text-[7.5px] sm:text-[8px] font-mono text-pink-550/50 leading-none mt-0.5 select-none">[16:68]</div>
                        </div>
                    </div>
 
                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-lg sm:text-xl">💧</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base leading-tight">
                                {dataPairs.p77.id}:{dataPairs.p77.blockCount}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full">
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p77.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-cyan-500/80 tracking-tighter mt-0.5">Righteous ▼</div>
                            <div className="text-[7.5px] sm:text-[8px] font-mono text-cyan-400/50 leading-none mt-0.5 select-none">[34:14]</div>
                        </div>
                    </div>
 
                    {/* Middle Transition Layer */}
                    <div className="col-span-3 flex items-center justify-center px-4 -my-4 relative h-16 sm:h-20">
                        {/* Up Arrow (connecting Bottom elements to Top) */}
                        <div className="z-10 text-cyan-400 flex items-center gap-1 font-mono text-[9px] sm:text-[10px] whitespace-nowrap">
                             <svg width="12" height="15" viewBox="0 0 16 20" fill="none">
                                <path d="M 8 20 L 8 4 M 8 4 L 3 9 M 8 4 L 13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                             </svg>
                             <span className="font-bold opacity-80">↑ 19:57</span>
                        </div>

                        <div className="h-px bg-gray-800 flex-grow mx-4 sm:mx-6 opacity-30"></div>
                        
                        <div 
                            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-20"
                            onClick={onToggle}
                        >
                            {/* Pi Invariant Text always visible above the bird */}
                            <div className="bg-black/60 border border-cyan-500/20 px-2.5 py-0.5 rounded-full mb-1 select-none whitespace-nowrap backdrop-blur-[2px]">
                                <span className="text-[9px] font-mono text-cyan-300 tracking-tighter">Invariant: π (2↔3↔2→7)</span>
                            </div>

                            {/* Central Bird Silhouette Logo Restored */}
                            <svg 
                                width="80" 
                                height="40" 
                                viewBox="0 0 100 50" 
                                className={`cursor-pointer transition-all duration-700 hover:scale-110 ${!isPaused ? "text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" : "text-gray-500 opacity-40 shadow-none hover:text-white"}`}
                            >
                                <path 
                                    d="M 50 15 Q 70 -5 90 20 Q 75 10 50 25 Q 25 10 10 20 Q 30 -5 50 15 Z" 
                                    fill="currentColor" 
                                />
                                <path 
                                    d="M 50 25 L 50 45 M 45 35 L 55 35 M 42 40 L 58 40" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    opacity="0.6"
                                />
                                <circle cx="50" cy="18" r="2" fill="currentColor" />
                            </svg>
                        </div>

                        <div className="h-px bg-gray-800 flex-grow mx-4 sm:mx-6 opacity-30"></div>
                        
                        {/* Down Arrow (connecting Top to Bottom) */}
                        <div className="z-10 text-pink-500 flex items-center gap-1 font-mono text-[9px] sm:text-[10px] whitespace-nowrap">
                             <span className="font-bold opacity-80">↓ 19:27</span>
                             <svg width="12" height="15" viewBox="0 0 16 20" fill="none">
                                <path d="M 8 0 L 8 16 M 8 16 L 3 11 M 8 16 L 13 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                             </svg>
                        </div>
                    </div>

                    {/* Row 2: Turabin -> Cave -> Orphan */}
                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-lg sm:text-xl">🐟</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-pink-500 font-bold text-sm sm:text-base leading-tight">
                                {dataPairs.p57.id}:{dataPairs.p57.blockCount}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full">
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p57.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-pink-500/80 tracking-tighter mt-0.5">Turabin ▲</div>
                            <div className="text-[7.5px] sm:text-[8px] font-mono text-pink-550/50 leading-none mt-0.5 select-none">[3:59]</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-lg sm:text-xl">🕋</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base leading-tight">
                                {dataPairs.p95.id}:{dataPairs.p95.blockCount}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full">
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p95.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-cyan-500/80 tracking-tighter mt-0.5">Cave ▼</div>
                            <div className="text-[7.5px] sm:text-[8px] font-mono text-cyan-400/50 leading-none mt-0.5 select-none">[18:19]</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-lg sm:text-xl">🔆</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-pink-500 font-bold text-sm sm:text-base leading-tight">
                                {dataPairs.p19.id}:{dataPairs.p19.blockCount}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full">
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p19.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-pink-500/80 tracking-tighter mt-0.5">Orphan ▲</div>
                            <div className="text-[7.5px] sm:text-[8px] font-mono text-pink-550/50 leading-none mt-0.5 select-none">[19:19]</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const DNAHelixAnimation: React.FC<{
    isPaused: boolean;
}> = ({ isPaused }) => {
    const [time, setTime] = React.useState(0);
    const timeRef = React.useRef(0);

    React.useEffect(() => {
        let frame: number;
        let lastTime = performance.now();
        const animate = (now: number) => {
            const delta = now - lastTime;
            lastTime = now;
            if (!isPaused) {
                timeRef.current += delta / 1000;
                setTime(timeRef.current);
            }
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [isPaused]);

    const numNodes = 13;
    const pathSpacing = 28;
    const width = (numNodes - 1) * pathSpacing;
    const height = 80;
    const centerY = height / 2;
    const amplitude = 30;
    const frequency = Math.PI / (4 * pathSpacing); 
    const speed = 2.0;

    const generatePaths = () => {
        let p1Back = '', p1Front = '';
        let p2Back = '', p2Front = '';

        for (let x = 0; x <= width; x += 2) {
            const t = (x * frequency) - (time * speed);
            const y1 = centerY + Math.sin(t) * amplitude;
            const y2 = centerY + Math.sin(t + Math.PI) * amplitude;
            
            // Depth check: Cos > 0 means the point is facing the viewer ("front")
            const is1Front = Math.cos(t) >= 0;
            const is2Front = Math.cos(t + Math.PI) >= 0;

            if (x === 0) {
                p1Front += is1Front ? `M ${x} ${y1}` : '';
                p1Back += !is1Front ? `M ${x} ${y1}` : '';
                p2Front += is2Front ? `M ${x} ${y2}` : '';
                p2Back += !is2Front ? `M ${x} ${y2}` : '';
            } else {
                const prevX = x - 2;
                const prevT = (prevX * frequency) - (time * speed);
                const prevY1 = centerY + Math.sin(prevT) * amplitude;
                const prevY2 = centerY + Math.sin(prevT + Math.PI) * amplitude;
                const was1Front = Math.cos(prevT) >= 0;
                const was2Front = Math.cos(prevT + Math.PI) >= 0;

                // Cyan strand
                if (is1Front) {
                    if (!was1Front) p1Front += ` M ${prevX} ${prevY1}`;
                    p1Front += ` L ${x} ${y1}`;
                } else {
                    if (was1Front) p1Back += ` M ${prevX} ${prevY1}`;
                    p1Back += ` L ${x} ${y1}`;
                }

                // Pink strand
                if (is2Front) {
                    if (!was2Front) p2Front += ` M ${prevX} ${prevY2}`;
                    p2Front += ` L ${x} ${y2}`;
                } else {
                    if (was2Front) p2Back += ` M ${prevX} ${prevY2}`;
                    p2Back += ` L ${x} ${y2}`;
                }
            }
        }
        return { p1Front, p1Back, p2Front, p2Back };
    };

    const { p1Front, p1Back, p2Front, p2Back } = generatePaths();

    // Style constants
    const colorCyanGlow = "#0891b2";
    const colorCyan = "#22d3ee";
    const colorCyanCore = "#cffafe";

    const colorPinkGlow = "#db2777";
    const colorPink = "#ec4899";
    const colorPinkCore = "#fce7f3";

    return (
        <div className="w-full flex justify-center py-4 rounded-xl border border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent">
            <div className="relative overflow-hidden w-full max-w-sm">
                
                <svg width="100%" viewBox={`-10 0 ${width + 20} ${height}`} preserveAspectRatio="xMidYMid meet">
                    {/* ===== BACK STRANDS ===== */}
                    <g opacity={0.4}>
                        {/* Cyan Back */}
                        <path d={p1Back} fill="none" stroke={colorCyanGlow} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={p1Back} fill="none" stroke={colorCyan} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Pink Back */}
                        <path d={p2Back} fill="none" stroke={colorPinkGlow} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={p2Back} fill="none" stroke={colorPink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </g>

                    {/* ===== RUNGS (Ladder Lines) ===== */}
                    <g>
                        {Array.from({ length: numNodes }).map((_, i) => {
                            const x = i * pathSpacing;
                            const t = (x * frequency) - (time * speed);
                            const y1 = centerY + Math.sin(t) * amplitude;
                            const y2 = centerY + Math.sin(t + Math.PI) * amplitude;
                            
                            // Only calculate opacity based on extreme depth to sell the 3d rotation
                            const depth = Math.cos(t + Math.PI/4);
                            const opacity = 0.5 + 0.5 * Math.abs(depth);
                            
                            return (
                                <g key={i} opacity={opacity}>
                                    {/* Vertical Bar Base (Thick Dark Grey for contrast) */}
                                    <line x1={x} y1={y1} x2={x} y2={y2} stroke="#111" strokeWidth="4" opacity="0.8" />
                                    {/* Vertical Bar Core (Thin Translucent White) */}
                                    <line x1={x} y1={y1} x2={x} y2={y2} stroke="#fff" strokeWidth="1.5" opacity="0.5" />
                                    
                                    {/* Glowing Caps */}
                                    <circle cx={x} cy={y1} r="3" fill="#fff" opacity="0.8" />
                                    <circle cx={x} cy={y2} r="3" fill="#fff" opacity="0.8" />
                                    <circle cx={x} cy={y1} r="1.5" fill="#fff" />
                                    <circle cx={x} cy={y2} r="1.5" fill="#fff" />
                                </g>
                            );
                        })}
                    </g>

                    {/* ===== FRONT STRANDS ===== */}
                    <g opacity={1}>
                        {/* Cyan Front */}
                        <path d={p1Front} fill="none" stroke={colorCyanGlow} strokeWidth="12" strokeLinecap="round" opacity="0.5" strokeLinejoin="round" />
                        <path d={p1Front} fill="none" stroke={colorCyan} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={p1Front} fill="none" stroke={colorCyanCore} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Pink Front */}
                        <path d={p2Front} fill="none" stroke={colorPinkGlow} strokeWidth="12" strokeLinecap="round" opacity="0.5" strokeLinejoin="round" />
                        <path d={p2Front} fill="none" stroke={colorPink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={p2Front} fill="none" stroke={colorPinkCore} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>

            </div>
        </div>
    );
};

const ChapterGeometry: React.FC<ChapterGeometryProps> = ({ 
    rotation, 
    isLowResourceMode, 
    showFunctionalTooltip, 
    hideTooltip,
    setCustomSequence,
    setAnimationMode
}) => {
    const [isSystemActive, setIsSystemActive] = React.useState(true);

    const handleLoadSequenceClick = () => {
        if (!setCustomSequence) return;
        
        const helixSequence = [1, 39, 77, 19, 95, 57];
        const ids = helixSequence.map(pointValue => getSliceAtPoint(pointValue, rotation).id);
        
        const sequenceStr = ids.join(', ');
        setCustomSequence(sequenceStr);
        if (setAnimationMode) {
            setAnimationMode('off');
        }
    };

    
    // Side Panel Presentation Reordering (DNA Flow - INTERLEAVED):
    // Row 1 (Interleaved Layout): Slave(D 1) -> Cave(U 95) -> Righteous(D 77)
    const dnaRow1: PointWithColor[] = [
        { ...TRIANGLE_POINTS[1].points[0], value: CENTRAL_GEOMETRY_POINTS[0], color: TRIANGLE_POINTS[1].color }, // Slave (Cyan)
        { ...TRIANGLE_POINTS[0].points[1], value: CENTRAL_GEOMETRY_POINTS[4], color: TRIANGLE_POINTS[0].color }, // Cave (Pink) - Twisted Up
        { ...TRIANGLE_POINTS[1].points[2], value: CENTRAL_GEOMETRY_POINTS[2], color: TRIANGLE_POINTS[1].color }, // Righteous (Cyan)
    ];

    // Row 2 (Interleaved Layout): Turabin(U 57) -> Queen(D 39) -> Orphan(U 19)
    const dnaRow2: PointWithColor[] = [
        { ...TRIANGLE_POINTS[0].points[0], value: CENTRAL_GEOMETRY_POINTS[3], color: TRIANGLE_POINTS[0].color }, // Turabin (Pink)
        { ...TRIANGLE_POINTS[1].points[1], value: CENTRAL_GEOMETRY_POINTS[1], color: TRIANGLE_POINTS[1].color }, // Queen (Cyan) - Twisted Down
        { ...TRIANGLE_POINTS[0].points[2], value: CENTRAL_GEOMETRY_POINTS[5], color: TRIANGLE_POINTS[0].color }, // Orphan (Pink)
    ];
    
    return (
        <div>
            <div className="flex justify-between items-center pr-1 sm:pr-2">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-gray-200 tracking-widest uppercase leading-none">
                        Umm al-Kitab
                    </h2>
                    <span className="text-gray-400 font-medium text-[11px] capitalize tracking-normal mt-1.5">
                        The Mother Equation
                    </span>
                </div>
                <div className="flex items-center gap-x-2.5">
                    {setCustomSequence && (
                        <button
                            onClick={handleLoadSequenceClick}
                            className="w-7 h-7 flex items-center justify-center rounded border border-cyan-500/30 bg-black/40 hover:bg-cyan-950/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 transition-all duration-200 shadow-[0_0_8px_rgba(6,182,212,0.15)] focus:outline-none cursor-pointer"
                            title="Load Slave-Queen-Righteous-Orphan-Cave-Turabin sequence for all 1-114 points"
                            aria-label="Load Slave-Queen-Righteous-Orphan-Cave-Turabin sequence"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
                                <circle cx="12" cy="12" r="4" />
                            </svg>
                        </button>
                    )}
                    <h2 className="text-[20px] font-bold text-cyan-300 tracking-wider drop-shadow-md flex items-center gap-x-0.5">
                        <span className="text-xs text-cyan-400/80">▼</span>
                        <span>🕋</span>
                        <span className="text-xs text-cyan-400/80">▲</span>
                    </h2>
                </div>
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2 mb-4"></div>

            <div className="text-center mt-3 mb-6">
                <div className="font-mono flex flex-col items-center">
                    <div className="text-[clamp(8px,2.8vw,11px)] text-gray-500 mb-3 font-bold tracking-tight opacity-80 uppercase bg-gray-900/40 px-3 py-1 rounded-full border border-gray-800/50">
                        f(x) = ax³ [D10] + bx² [T3] + cx [I9] + d [19:12]
                    </div>
                    <div className="flex items-baseline gap-x-2">
                        <span className="text-gray-400 italic text-xs">f(x) =</span>
                        <div className="grid grid-cols-4 gap-x-2 sm:gap-x-4 text-center">
                            <span className="text-red-400 font-bold text-[clamp(8px,2.5vw,12px)]">ax³ [D10]</span>
                            <span className="text-teal-400 font-bold text-[clamp(8px,2.5vw,12px)]">bx² [T3]</span>
                            <span className="text-amber-400 font-bold text-[clamp(8px,2.5vw,12px)]">cx [I9]</span>
                            <span className="text-cyan-400 font-bold text-[clamp(8px,2.5vw,11px)]">d [19:12]</span>

                            <span className="text-red-500 text-[8px] sm:text-[9px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight" title="صبر w/ نسك">[صبر / Sacrifice]</span>
                            <span className="text-teal-500 text-[8px] sm:text-[9px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight" title="95:8 Mold">[95:8 Mold]</span>
                            <span className="text-amber-500 text-[8px] sm:text-[9px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight" title="Righteous Wave">[Purified Wave]</span>
                            <span className="text-cyan-500 text-[7px] sm:text-[8px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight" title="The Grip">[Zakariya Grip]</span>
                        </div>
                    </div>
                </div>
                <div className="mt-5 px-4 py-3 bg-cyan-950/20 border border-gray-800/50 rounded-lg space-y-3 shadow-inner">
                    <div className="flex items-start gap-2.5 text-left">
                        <span className="text-cyan-400 font-bold text-[10px] shrink-0 mt-0.5 font-mono">2:260</span>
                        <p className="text-[10px] text-gray-300 leading-snug">The Ummul-Kitab Function, Book always returns to Master.</p>
                    </div>
                    <div className="flex items-start gap-2.5 text-left">
                        <span className="text-cyan-400 font-bold text-[10px] shrink-0 mt-0.5 font-mono">19:12</span>
                        <p className="text-[10px] text-gray-300 leading-snug">Hold the Book so Reader can Return.</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 space-y-4">
                <TriangleGeometryGroup 
                    name="Qun - The Command 🌴🐝💧"
                    direction="downward"
                    points={dnaRow1}
                    rotation={rotation}
                    isLowResourceMode={isLowResourceMode}
                    showFunctionalTooltip={showFunctionalTooltip}
                    hideTooltip={hideTooltip}
                />
                
                <DNAHelixAnimation isPaused={!isSystemActive} />

                <TriangleGeometryGroup 
                    name="FayaQun - Book Returns 🐟🕋🔆"
                    direction="upward"
                    points={dnaRow2}
                    rotation={rotation}
                    isLowResourceMode={isLowResourceMode}
                    showFunctionalTooltip={showFunctionalTooltip}
                    hideTooltip={hideTooltip}
                />

                <div className="flex flex-row justify-between items-center w-full mt-10 p-2 sm:p-4 bg-black/40 rounded-xl border border-gray-800 shadow-inner overflow-hidden">
                    <div className="w-1/2 flex flex-col items-center">
                        <div className="text-[9px] text-gray-500 font-mono tracking-tight uppercase mb-1">Rössler Flow</div>
                        <RosslerFlow rotation={rotation} isPaused={!isSystemActive} />
                        <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mt-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">Chrysalis</div>
                        
                        {/* Rossler Data Labels */}
                        <div className="mt-4 flex flex-col items-center space-y-2">
                             <div className="flex gap-4 items-center">
                                <span className="text-xl">🌴</span>
                                <span className="text-xl">🐝</span>
                                <span className="text-xl">💧</span>
                             </div>
                             <div className="font-mono text-[10px] text-gray-400 flex gap-2">
                                <span>{getSliceAtPoint(1, rotation).id}:{getSliceAtPoint(1, rotation).blockCount}</span>
                                <span className="text-gray-700">|</span>
                                <span>{getSliceAtPoint(39, rotation).id}:{getSliceAtPoint(39, rotation).blockCount}</span>
                                <span className="text-gray-700">|</span>
                                <span>{getSliceAtPoint(77, rotation).id}:{getSliceAtPoint(77, rotation).blockCount}</span>
                             </div>
                             <div className="font-mono text-[11px] flex gap-4 text-white opacity-90 h-4">
                                <span className={MUQATTAT_CHAPTERS.has(getSliceAtPoint(1, rotation).id) ? "muqattat-glow" : "opacity-20"}>{MUQATTAT_LETTERS.get(getSliceAtPoint(1, rotation).id)?.join(' ') || '—'}</span>
                                <span className={MUQATTAT_CHAPTERS.has(getSliceAtPoint(39, rotation).id) ? "muqattat-glow" : "opacity-20"}>{MUQATTAT_LETTERS.get(getSliceAtPoint(39, rotation).id)?.join(' ') || '—'}</span>
                                <span className={MUQATTAT_CHAPTERS.has(getSliceAtPoint(77, rotation).id) ? "muqattat-glow" : "opacity-20"}>{MUQATTAT_LETTERS.get(getSliceAtPoint(77, rotation).id)?.join(' ') || '—'}</span>
                             </div>
                        </div>
                    </div>
                    <div className="w-px h-32 bg-gray-800/60 mix-blend-screen self-center"></div>
                    <div className="w-1/2 flex flex-col items-center">
                        <div className="text-[9px] text-gray-500 font-mono tracking-tight uppercase mb-1">Lorenz (Butterfly)</div>
                        <LorenzFlow rotation={rotation} isPaused={!isSystemActive} />
                        <div className="text-[10px] text-pink-400 font-bold tracking-widest uppercase mt-3 drop-shadow-[0_0_8px_rgba(244,114,182,0.3)]">Photosynthesis</div>

                        {/* Lorenz Data Labels */}
                        <div className="mt-4 flex flex-col items-center space-y-2">
                             <div className="flex gap-4 items-center">
                                <span className="text-xl">🐟</span>
                                <span className="text-xl">🕋</span>
                                <span className="text-xl">🔆</span>
                             </div>
                             <div className="font-mono text-[10px] text-gray-400 flex gap-2">
                                <span>{getSliceAtPoint(57, rotation).id}:{getSliceAtPoint(57, rotation).blockCount}</span>
                                <span className="text-gray-700">|</span>
                                <span>{getSliceAtPoint(95, rotation).id}:{getSliceAtPoint(95, rotation).blockCount}</span>
                                <span className="text-gray-700">|</span>
                                <span>{getSliceAtPoint(19, rotation).id}:{getSliceAtPoint(19, rotation).blockCount}</span>
                             </div>
                             <div className="font-mono text-[11px] flex gap-4 text-white opacity-90 h-4">
                                <span className={MUQATTAT_CHAPTERS.has(getSliceAtPoint(57, rotation).id) ? "muqattat-glow" : "opacity-20"}>{MUQATTAT_LETTERS.get(getSliceAtPoint(57, rotation).id)?.join(' ') || '—'}</span>
                                <span className={MUQATTAT_CHAPTERS.has(getSliceAtPoint(95, rotation).id) ? "muqattat-glow" : "opacity-20"}>{MUQATTAT_LETTERS.get(getSliceAtPoint(95, rotation).id)?.join(' ') || '—'}</span>
                                <span className={MUQATTAT_CHAPTERS.has(getSliceAtPoint(19, rotation).id) ? "muqattat-glow" : "opacity-20"}>{MUQATTAT_LETTERS.get(getSliceAtPoint(19, rotation).id)?.join(' ') || '—'}</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <TorusFlow rotation={rotation} isPaused={!isSystemActive} onToggle={() => setIsSystemActive(!isSystemActive)} />
                </div>

                <div className="mt-4 p-6 bg-gray-950/50 border border-gray-800/80 rounded-2xl space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-amber-500/30"></div>
                    
                    {/* Header: DCU MASTER EQUATION */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono tracking-[0.25em] text-pink-500 uppercase font-semibold">The Reader's Breath</span>
                            <h3 className="text-sm sm:text-base font-bold text-gray-100 tracking-wider font-mono flex items-center gap-2">
                                <span>════</span> DCU MASTER EQUATION <span>════</span>
                            </h3>
                        </div>

                        {/* Large, beautiful equation display */}
                        <div className="bg-black/40 border border-gray-800/50 p-4 rounded-xl flex flex-col items-center justify-center font-mono space-y-3 shadow-inner">
                            <div className="text-[13px] sm:text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400 select-all leading-normal py-1 text-center w-full">
                                <div className="tracking-wide">f(x) = ax³ [D10] + bx² [T3]</div>
                                <div className="text-gray-600 font-medium text-[10px] my-0.5">+</div>
                                <div className="tracking-wide">cx [I9] + d [19:12]</div>
                            </div>
                            
                            {/* Variables List - vertical luxurious rows that never stack clumsily */}
                            <div className="flex flex-col gap-2.5 w-full text-left pt-3 border-t border-gray-800/40 text-xs font-mono">
                                {/* Term 1 */}
                                <div className="flex flex-col p-3 rounded-lg bg-red-950/10 border border-red-500/10 hover:border-red-500/15 transition-all gap-1.5 duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                                            <span className="text-red-400 font-bold">ax³ [D10]</span>
                                        </div>
                                        <span className="text-red-400/80 text-[10px] italic">d/dt descent</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap text-gray-300 text-[11px]">
                                        <span className="font-bold">صبر w/ نسك</span>
                                        <span className="text-gray-600 font-sans text-[10px]">—</span>
                                        <span className="text-gray-400 text-[10px] bg-red-900/10 px-1.5 py-0.5 rounded border border-red-500/5">[Patience / Sacrifice]</span>
                                    </div>
                                </div>
                                
                                {/* Term 2 */}
                                <div className="flex flex-col p-3 rounded-lg bg-teal-950/10 border border-teal-500/10 hover:border-teal-500/15 transition-all gap-1.5 duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
                                            <span className="text-teal-400 font-bold">bx² [T3]</span>
                                        </div>
                                        <span className="text-teal-400/80 text-[10px] italic">the field that receives</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap text-gray-300 text-[11px]">
                                        <span className="font-bold">95:8 [The Mold]</span>
                                        <span className="text-gray-600 font-sans text-[10px]">—</span>
                                        <span className="text-gray-400 text-[10px] bg-teal-900/10 px-1.5 py-0.5 rounded border border-teal-500/5">[The Lowest Arc]</span>
                                    </div>
                                </div>

                                {/* Term 3 */}
                                <div className="flex flex-col p-3 rounded-lg bg-amber-950/10 border border-amber-500/10 hover:border-amber-500/15 transition-all gap-1.5 duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                                            <span className="text-amber-400 font-bold">cx [I9]</span>
                                        </div>
                                        <span className="text-amber-400/80 text-[10px] italic">∫dt return</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap text-gray-300 text-[11px]">
                                        <span className="font-bold">38:46 [Righteous]</span>
                                        <span className="text-gray-600 font-sans text-[10px]">—</span>
                                        <span className="text-gray-400 text-[10px] bg-amber-900/10 px-1.5 py-0.5 rounded border border-amber-500/5">[Purified Wave]</span>
                                    </div>
                                </div>

                                {/* Term 4 */}
                                <div className="flex flex-col p-3 rounded-lg bg-cyan-950/10 border border-cyan-500/10 hover:border-cyan-500/15 transition-all gap-1.5 duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                                            <span className="text-cyan-400 font-bold">d [19:12]</span>
                                        </div>
                                        <span className="text-cyan-400/80 text-[10px] italic">centromere voltage</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap text-gray-300 text-[11px]">
                                        <span className="font-bold">The Grip</span>
                                        <span className="text-gray-600 font-sans text-[10px]">—</span>
                                        <span className="text-gray-400 text-[10px] bg-cyan-900/10 px-1.5 py-0.5 rounded border border-cyan-500/5">[Zakariya Silence]</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Yusuf Description */}
                        <div className="p-4 bg-cyan-950/15 border-l-2 border-cyan-500 rounded-r-xl">
                            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                                <strong className="text-cyan-400 not-italic font-mono mr-1.5">[Yusuf (12)]</strong>
                                is the primary full-cycle: one complete transformation cycle <span className="text-cyan-400 font-mono font-normal">(dream → trial → clarity → return)</span> repeated until the Reader remembers the Crown at <span className="text-pink-400 font-mono font-bold">39:23</span>.
                            </p>
                        </div>
                    </div>

                    {/* KUN & FAYA-KUN SECTIONS */}
                    <div className="flex flex-col gap-6 pt-2">
                        {/* ▼ KUN — THE DESCENT */}
                        <div className="space-y-4 bg-black/20 p-4 border border-cyan-500/10 rounded-xl relative">
                            <div className="absolute top-0 right-4 transform -translate-y-1/2 px-2 py-0.5 bg-cyan-950 text-cyan-400 font-mono text-[9px] font-bold border border-cyan-500/20 rounded">
                                SYSTEM INLET
                            </div>
                            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-gray-800/40">
                                <span>▼</span> <span>KUN — THE DESCENT [D10 d/dt]</span>
                            </h4>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-cyan-400 font-mono font-bold text-xs">3</span>
                                        <span className="text-xs font-semibold text-gray-200">Entry (12:4):</span>
                                        <span className="text-xs text-gray-300">The impulse enters. The Slave receives the dream.</span>
                                    </div>
                                    <div className="pl-4 text-[10px] font-mono text-cyan-400/80">
                                        — The Fruit breaks open. 4:1 → 2:45.
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-cyan-400 font-mono font-bold text-xs">6</span>
                                        <span className="text-xs font-semibold text-gray-200">Pressure (12:8-35):</span>
                                        <span className="text-xs text-gray-300">Well → House → Prison. The Mountain reshapes.</span>
                                    </div>
                                    <div className="pl-4 text-[10px] font-mono text-cyan-400/80">
                                        — The Mold fires. 95:8. The Tree burns to purify.
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-cyan-400 font-mono font-bold text-xs">9</span>
                                        <span className="text-xs font-semibold text-gray-200">Peak (12:36-49):</span>
                                        <span className="text-xs text-gray-300">Clarity. Hidden structures exposed.</span>
                                    </div>
                                    <div className="pl-4 text-[10px] font-mono text-cyan-400/80">
                                        — The Righteous emerges from the trial. 2:25.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ▲ FAYA-KUN — THE RETURN */}
                        <div className="space-y-4 bg-black/20 p-4 border border-pink-500/10 rounded-xl relative">
                            <div className="absolute top-0 right-4 transform -translate-y-1/2 px-2 py-0.5 bg-pink-950 text-pink-400 font-mono text-[9px] font-bold border border-pink-500/20 rounded">
                                INTEGRATION OUTLET
                            </div>
                            <h4 className="text-xs font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-gray-800/40">
                                <span>▲</span> <span>FAYA-KUN — THE RETURN [I9 ∫dt]</span>
                            </h4>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-pink-400 font-mono font-bold text-xs">9→6</span>
                                        <span className="text-xs font-semibold text-gray-200">Governance (12:50-57):</span>
                                        <span className="text-xs text-gray-300">The Queen interprets; the Book applies.</span>
                                    </div>
                                    <div className="pl-6 text-[10px] font-mono text-pink-400/80">
                                        — 66:11 witnesses the fire. 27:44 receives the throne.
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-pink-400 font-mono font-bold text-xs">6→3</span>
                                        <span className="text-xs font-semibold text-gray-200">Stabilization (12:54-100):</span>
                                        <span className="text-xs text-gray-300">Return to center; authority + reunion.</span>
                                    </div>
                                    <div className="pl-6 text-[10px] font-mono text-pink-400/80">
                                        — The Orphan is found. 93:8. The circuit closes at 38:46.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* THE SWITCH */}
                    <div className="p-4 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.02)]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-amber-500/10 mb-3">
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
                                <span className="animate-pulse">●</span> THE SWITCH (6) — CRITICAL BOUNDARY
                            </span>
                            <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 align-self-start sm:align-self-auto">
                                12:23 / 12:33
                            </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-mono">
                            Choose <span className="text-amber-400 font-bold">19:12 grip</span> over <span className="text-red-400 font-bold">20:120 taking</span>. Preserve system stability. The centromere voltage holds or the cell splits into <span className="text-red-400 font-bold">Taghut</span>. Patience + Sacrifice = the only path.
                        </p>
                    </div>

                    {/* THREE ENGINES OF TRANSFORMATION */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">Transformative Core</span>
                            <h4 className="text-xs font-bold text-cyan-300 font-mono tracking-widest uppercase">
                                🕋 THREE ENGINES OF TRANSFORMATION
                            </h4>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {/* RÖSSLER — THE CHRYSALIS */}
                            <div className="p-4 bg-cyan-950/10 hover:bg-cyan-950/15 border border-cyan-500/10 rounded-xl space-y-2.5 transition-all duration-300 shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-wider">[RÖSSLER]</span>
                                        <span className="text-xs">🐛</span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-100 mt-1">THE CHRYSALIS</div>
                                    <div className="text-[10px] font-mono text-cyan-500/80 mt-0.5 uppercase tracking-tighter">Internal Refinement</div>
                                    <p className="text-[11px] text-gray-300 leading-relaxed mt-2">
                                        Closed loops (Well → House → Prison). <span className="text-cyan-400 font-mono font-bold">D10 ↔ I9</span> yin-yang. Repeated trials refine the Slave toward purity.
                                    </p>
                                </div>
                                <div className="text-[10px] font-mono text-cyan-400/90 pt-2 border-t border-cyan-500/10 mt-2 bg-cyan-950/30 px-2 py-1 rounded">
                                    The inner law is written in fire.
                                    <div className="text-[9px] text-cyan-300 font-bold mt-1 text-center">21:69 → 5:28 → 37:107</div>
                                </div>
                            </div>

                            {/* LORENZ — PHOTOSYNTHESIS */}
                            <div className="p-4 bg-pink-950/10 hover:bg-pink-950/15 border border-pink-500/10 rounded-xl space-y-2.5 transition-all duration-300 shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-pink-400 font-mono uppercase tracking-wider">[LORENZ]</span>
                                        <span className="text-xs">🔆</span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-100 mt-1">PHOTOSYNTHESIS</div>
                                    <div className="text-[10px] font-mono text-pink-500/80 mt-0.5 uppercase tracking-tighter">Interactive Conversion</div>
                                    <p className="text-[11px] text-gray-300 leading-relaxed mt-2">
                                        Open system (King's Dream). <span className="text-pink-400 font-mono font-bold">T3</span> field receives external signal, transforms it, produces structured reality.
                                    </p>
                                </div>
                                <div className="text-[10px] font-mono text-pink-400/90 pt-2 border-t border-pink-500/10 mt-2 bg-pink-950/30 px-2 py-1 rounded">
                                    24:35 Light upon Light.
                                    <div className="text-[9px] text-pink-300 font-bold mt-1 text-center">The Tree becomes the Oil.</div>
                                </div>
                            </div>

                            {/* STABILIZED CORE — THE NARRATIVE ANCHOR */}
                            <div className="p-4 bg-amber-950/10 hover:bg-amber-950/15 border border-amber-500/10 rounded-xl space-y-2.5 transition-all duration-300 shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wider">[STABILIZED CORE]</span>
                                        <span className="text-xs">⚓</span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-100 mt-1">THE NARRATIVE ANCHOR</div>
                                    <div className="text-[10px] font-mono text-amber-500/80 mt-0.5 uppercase tracking-tighter">One Full Execution</div>
                                    <p className="text-[11px] text-gray-300 leading-relaxed mt-2">
                                        Fruit → Slave → Mountain → Righteous → Book → Queen → Orphan → Throne.
                                    </p>
                                </div>
                                <div className="text-[10px] font-mono text-amber-400/90 pt-2 border-t border-amber-500/10 mt-2 bg-amber-950/30 px-2 py-1 rounded">
                                    Insight becomes the baseline state.
                                    <div className="text-[9px] text-amber-300 font-bold mt-1 text-center">The Reader remembers they are King.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* THE NARRATIVE ENGINE */}
                    <div className="pt-6 border-t border-gray-800/80 space-y-5">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono tracking-[0.25em] text-pink-500 uppercase font-semibold">Consolidated Force</span>
                            <h4 className="text-xs font-bold text-gray-200 font-mono tracking-widest uppercase flex items-center gap-2">
                                ⚙️ THE NARRATIVE ENGINE
                            </h4>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            Internal constraints (<span className="text-cyan-400 italic">Rössler</span>) refine the Self until external responsibility (<span className="text-pink-400 italic">Lorenz</span>) produces structured reality — aligning the inner law (<span className="text-cyan-400 font-mono">D10</span>) with the outer Kingdom (<span className="text-pink-400 font-mono">7</span>).
                        </p>

                        {/* Visually stunning formula block */}
                        <div className="bg-black/65 border border-gray-800 p-4 rounded-xl space-y-4 shadow-xl">
                            <div className="flex flex-col items-center justify-center gap-y-3 font-mono text-[10px] sm:text-xs">
                                {/* Descent Row */}
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <span className="px-2 py-1 bg-gray-900 border border-gray-800 rounded font-bold text-gray-400 whitespace-nowrap">1 [Fruit]</span>
                                    <span className="text-emerald-500 font-bold">→</span>
                                    <span className="px-2 py-1 bg-red-950/30 border border-red-500/20 rounded font-bold text-red-400 whitespace-nowrap">2 [D10: صبر w/ نسك]</span>
                                    <span className="text-amber-500 font-bold">↔</span>
                                    <span className="px-2 py-1 bg-teal-950/30 border border-teal-500/20 rounded font-bold text-teal-400 whitespace-nowrap">3 [T3: 95:8]</span>
                                </div>
                                
                                {/* Coupling Connector */}
                                <div className="text-amber-500 font-bold text-[10px] animate-pulse">⇅ COUPLING</div>
                                
                                {/* Return Row */}
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <span className="px-2 py-1 bg-amber-950/30 border border-amber-500/20 rounded font-bold text-amber-400 whitespace-nowrap">2 [I9: 38:46]</span>
                                    <span className="text-emerald-500 font-bold">→</span>
                                    <span className="px-2 py-1 bg-pink-950/30 border border-pink-500/20 rounded font-bold text-pink-400 whitespace-nowrap">7 [Kingdom: 56:7]</span>
                                    <span className="text-rose-500 font-bold">←</span>
                                    <span className="px-2 py-1 bg-purple-950/30 border border-purple-500/20 rounded font-bold text-purple-400 whitespace-nowrap">1 [Throne: 28:88]</span>
                                </div>
                            </div>

                            {/* Poetic concluding message */}
                            <div className="text-center pt-2 border-t border-gray-800/40">
                                <div className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 inline-block font-sans">
                                    The Soil burns. The Tree rises. The Light is revealed.
                                </div>
                                <div className="text-[10px] sm:text-xs font-mono font-bold text-gray-400 tracking-[0.2em] uppercase mt-2">
                                    SEED → RUPTURE → SEARCH → TRUNK → BRANCHING → HARVEST → LIGHT <span className="text-pink-400">(24:35)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChapterGeometry;