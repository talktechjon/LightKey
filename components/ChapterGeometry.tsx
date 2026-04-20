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
  const titleColor = direction === 'downward' ? 'text-cyan-400' : 'text-pink-500';
  const titleSymbol = direction === 'downward' ? '▼' : '▲';

  const headerTooltip = name.includes('Command') ? 'Input Engine: Chrysalis' : 'Output Engine: Photosynthesis';

  const getPointTooltip = (type: string, chapterName: string) => {
    if (type.includes('Slave')) return `The Vector (1): Prayer & Intent (66:11, 19:3)`;
    if (type.includes('Queen')) return `Shadow Surplus (+1) / Entropy Term: ${chapterName}`;
    if (type.includes('Righteous')) return `Faith Coherence: ${chapterName}`;
    if (type.includes('Boat|Orphan')) return `Command Propagation: ${chapterName}`;
    if (type.includes('Mountain')) return `Cubic Overflow Phase (10): ${chapterName}`;
    if (type.includes('Cave|Book')) return `Biological Cardiac Zero Point / Light Coherence (9): ${chapterName}`;
    return type;
  };
  
  return (
    <div>
      <h3 
        className={`font-semibold text-lg ${titleColor} mb-2 cursor-help`} 
        style={{ textShadow: `0 0 5px currentColor`}}
        onMouseEnter={(e) => showFunctionalTooltip(e, headerTooltip, getSliceAtPoint(points[0].value, rotation).id, direction === 'downward' ? '#FF00FF' : '#00FFFF')}
        onMouseLeave={hideTooltip}
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
                  className="font-bold text-white text-[9px] sm:text-[10px] md:text-[11px] lg:text-sm text-center w-full cursor-help whitespace-nowrap" 
                  onMouseEnter={(e) => showFunctionalTooltip(e, customTooltip, slice.id, point.color)}
                  onMouseLeave={hideTooltip}
                >
                  {point.type}
                </p>
                <p className="text-gray-300 text-sm mt-0.5">
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

const RosslerFlow: React.FC<{ rotation: number }> = ({ rotation }) => {
    const { pathData, markers } = useMemo(() => {
        let x = 0.1, y = 0, z = 0;
        
        // Dynamic modulation: The attractor's "twist" depends on the current primary chapter
        const currentPrimary = getSliceAtPoint(1, rotation).id;
        // Limit modulation to keep 'a' within a stable range (0.15 - 0.25)
        const modulation = ((currentPrimary % 19) / 19) * 0.1;
        
        const a = 0.15 + modulation, b = 0.2, c = 5.7;
        const dt = 0.02;
        const pts: {px: number, py: number, rz: number}[] = [];

        // Warm up
        for (let i = 0; i < 500; i++) {
            const dx = -y - z;
            const dy = x + a * y;
            const dz = b + z * (x - c);
            x += dx * dt; y += dy * dt; z += dz * dt;
            if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) break;
        }

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (let i = 0; i < 5000; i++) {
            const dx = -y - z;
            const dy = x + a * y;
            const dz = b + z * (x - c);
            x += dx * dt; y += dy * dt; z += dz * dt;
            
            if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z) || Math.abs(x) > 1000) break;

            const angle = -1.57;
            const rotX = x * Math.cos(angle) - y * Math.sin(angle);
            const rotY = x * Math.sin(angle) + y * Math.cos(angle);
            
            const tilt = 0.45;
            const zScale = 1.6;

            const px = rotX;
            const py = rotY * tilt - z * zScale;
            
            pts.push({ px, py, rz: z });

            if (px < minX) minX = px; if (px > maxX) maxX = px;
            if (py < minY) minY = py; if (py > maxY) maxY = py;
        }

        // Robust defaults if simulation failed or is empty
        if (pts.length < 10) {
            return { pathData: "M 0 0", markers: [] };
        }

        const pad = 12;
        const rangeX = maxX - minX || 1;
        const rangeY = maxY - minY || 1;
        const scaleX = (val: number) => pad + (100 - pad * 2) * ((val - minX) / rangeX);
        const scaleY = (val: number) => pad + (100 - pad * 2) * ((val - minY) / rangeY);

        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.px)} ${scaleY(p.py)}`).join(' ');

        const spikePeaks: number[] = [];
        for(let i = 1; i < pts.length - 1; i++) {
            // Lower threshold for z-peaks to ensure we find markers even in lower-intensity attractors
            if(pts[i].rz > pts[i-1].rz && pts[i].rz > pts[i+1].rz && pts[i].rz > 5) {
                spikePeaks.push(i);
            }
        }
        
        const mainSpike = spikePeaks.length > 2 ? spikePeaks[Math.floor(spikePeaks.length / 2)] : Math.floor(pts.length * 0.7);

        // Map to actual chapter IDs from current rotation
        const s1 = getSliceAtPoint(1, rotation).id;   // Slave
        const s95 = getSliceAtPoint(95, rotation).id; // Mountain
        const s77 = getSliceAtPoint(77, rotation).id; // Righteous
        const s57 = getSliceAtPoint(57, rotation).id; // Boat
        const s39 = getSliceAtPoint(39, rotation).id; // Queen
        const s19 = getSliceAtPoint(19, rotation).id; // Book

        const m = [
            // Cycle 1: Qun (Cyan)
            { idx: mainSpike - 450, color: COLORS.triangle2, name: '3c', label: `Slave [${s1}]` },
            { idx: mainSpike - 280, color: COLORS.triangle2, name: '6b', label: `Mountain [${s95}]` },
            { idx: mainSpike - 110, color: COLORS.triangle2, name: '9a', label: `Righteous [${s77}]` },
            
            // Cycle 2: FayaQun (Magenta)
            { idx: mainSpike - 35, color: COLORS.triangle1, name: '3c', label: `Boat [${s57}]` },
            { idx: mainSpike, color: COLORS.triangle1, name: '6b', label: `Queen [${s39}]` },
            { idx: mainSpike + 50, color: COLORS.triangle1, name: '9a', label: `Book [${s19}]` },
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

const LorenzFlow: React.FC<{ rotation: number }> = ({ rotation }) => {
    const { pathData, markers } = useMemo(() => {
        let x = 0.1, y = 1, z = 1.05;
        
        const currentPrimary = getSliceAtPoint(1, rotation).id;
        const modulation = (currentPrimary % 19) / 50;

        const sigma = 10 + modulation, rho = 28, beta = 8/3;
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

        if (pts.length < 10) {
            return { pathData: "M 0 0", markers: [] };
        }

        const pad = 12;
        const rangeX = maxX - minX || 1;
        const rangeY = maxY - minY || 1;
        const scaleX = (val: number) => pad + (100 - pad * 2) * ((val - minX) / rangeX);
        const scaleY = (val: number) => pad + (100 - pad * 2) * ((val - minY) / rangeY);

        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.px)} ${scaleY(p.py)}`).join(' ');

        // Map to actual chapter IDs from current rotation
        const s1 = getSliceAtPoint(1, rotation).id;   // Slave
        const s95 = getSliceAtPoint(95, rotation).id; // Mountain
        const s77 = getSliceAtPoint(77, rotation).id; // Righteous
        const s57 = getSliceAtPoint(57, rotation).id; // Boat
        const s39 = getSliceAtPoint(39, rotation).id; // Queen
        const s19 = getSliceAtPoint(19, rotation).id; // Book

        const m = [
            // Cycle 1: Left Wing
            { idx: 600, color: COLORS.triangle2, name: '3c', label: `Slave [${s1}]` }, 
            { idx: 950, color: COLORS.triangle2, name: '6b', label: `Mountain [${s95}]` },
            { idx: 1300, color: COLORS.triangle2, name: '9a', label: `Righteous [${s77}]` },
            
            // Cycle 2: Right Wing
            { idx: 1850, color: COLORS.triangle1, name: '3c', label: `Boat [${s57}]` },
            { idx: 2350, color: COLORS.triangle1, name: '6b', label: `Queen [${s39}]` },
            { idx: 2850, color: COLORS.triangle1, name: '9a', label: `Book [${s19}]` },
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

const ChapterGeometry: React.FC<ChapterGeometryProps> = ({ rotation, isLowResourceMode, showFunctionalTooltip, hideTooltip }) => {

    
    // Side Panel Presentation Reordering (DNA Flow - INTERLEAVED):
    // Row 1 (Interleaved Layout): Slave(D 1) -> Mountain(U 95) -> Righteous(D 77)
    const dnaRow1: PointWithColor[] = [
        { ...TRIANGLE_POINTS[1].points[0], value: CENTRAL_GEOMETRY_POINTS[0], color: TRIANGLE_POINTS[1].color }, // Slave (Cyan)
        { ...TRIANGLE_POINTS[0].points[1], value: CENTRAL_GEOMETRY_POINTS[1], color: TRIANGLE_POINTS[0].color }, // Mountain (Pink)
        { ...TRIANGLE_POINTS[1].points[2], value: CENTRAL_GEOMETRY_POINTS[2], color: TRIANGLE_POINTS[1].color }, // Righteous (Cyan)
    ];

    // Row 2 (Interleaved Layout): Boat(U 57) -> Queen(D 39) -> Book(U 19)
    const dnaRow2: PointWithColor[] = [
        { ...TRIANGLE_POINTS[0].points[0], value: CENTRAL_GEOMETRY_POINTS[3], color: TRIANGLE_POINTS[0].color }, // Boat (Pink)
        { ...TRIANGLE_POINTS[1].points[1], value: CENTRAL_GEOMETRY_POINTS[4], color: TRIANGLE_POINTS[1].color }, // Queen (Cyan)
        { ...TRIANGLE_POINTS[0].points[2], value: CENTRAL_GEOMETRY_POINTS[5], color: TRIANGLE_POINTS[0].color }, // Book (Pink)
    ];
    
    return (
        <div>
            <div className="flex justify-between items-center pr-2">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-gray-200 tracking-widest uppercase leading-none">
                        Umm al-Kitab
                    </h2>
                    <span className="text-gray-400 font-medium text-[11px] capitalize tracking-normal mt-1.5">
                        The Mother Equation
                    </span>
                </div>
                <h2 className="text-xl font-bold text-cyan-300 tracking-wider drop-shadow-md">
                    ▼🕋▲
                </h2>
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2 mb-4"></div>

            <div className="text-center mt-3 mb-6">
                <div className="font-mono flex flex-col items-center">
                    <div className="text-[11px] text-gray-500 mb-3 font-bold tracking-tight opacity-80 uppercase bg-gray-900/40 px-3 py-1 rounded-full border border-gray-800/50">
                        f(x) = ax³ [110] + bx² [108] + cx [103] + d [19]
                    </div>
                    <div className="flex items-baseline gap-x-2">
                        <span className="text-gray-400 italic text-xs">f(x) =</span>
                        <div className="grid grid-cols-4 gap-x-2 sm:gap-x-4 text-center">
                            <span className="text-red-400 font-bold text-[10px] sm:text-[12px] whitespace-nowrap">ax³ [110]</span>
                            <span className="text-teal-400 font-bold text-[10px] sm:text-[12px] whitespace-nowrap">bx² [108]</span>
                            <span className="text-amber-400 font-bold text-[10px] sm:text-[12px] whitespace-nowrap">cx [103]</span>
                            <span className="text-cyan-400 font-bold text-[10px] sm:text-[11px] whitespace-nowrap">d [19]</span>

                            <span className="text-red-500 text-[8px] sm:text-[9px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight">[Mountain]</span>
                            <span className="text-teal-500 text-[8px] sm:text-[9px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight">[Abundance]</span>
                            <span className="text-amber-500 text-[8px] sm:text-[9px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight">[Trial]</span>
                            <span className="text-cyan-500 text-[7px] sm:text-[8px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight">[Rooh+Messenger]</span>
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
                        <RosslerFlow rotation={rotation} />
                    </div>
                    <div className="w-px h-24 bg-gray-800/60 mix-blend-screen"></div>
                    <div className="w-1/2 flex flex-col items-center">
                        <div className="text-[9px] text-gray-500 font-mono tracking-tight uppercase mb-1">Lorenz (Butterfly)</div>
                        <LorenzFlow rotation={rotation} />
                    </div>
                </div>

                <div className="mt-8 p-5 bg-gray-950/40 border border-gray-800/60 rounded-xl space-y-7 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-px bg-gradient-to-l from-cyan-500/10 to-transparent w-full h-px"></div>
                    
                    <div className="space-y-3">
                        <p className="text-[14px] sm:text-[16px] font-mono font-bold text-gray-200 tracking-tight">
                            f(x) = ax³ [110] + bx² [108] + cx [103] + d [19]
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed italic border-l-2 border-gray-800 pl-4">
                            Describes one inner cycle: command enters, self is shaped, truth is exposed, then everything returns to the origin—repeating until alignment is stable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-sm">▼</span> Qun — Inner Movement
                            </h4>
                            <ul className="space-y-3.5 text-[11px] sm:text-[12px] text-gray-300">
                                <li className="flex gap-3 items-baseline">
                                    <span className="text-cyan-500 font-bold shrink-0 font-mono text-[13px]">3</span>
                                    <span>Entry: Awakening impulse appears inside (Impulse)</span>
                                </li>
                                <li className="flex gap-3 items-baseline">
                                    <span className="text-cyan-500 font-bold shrink-0 font-mono text-[13px]">6</span>
                                    <span>Pressure: Self is compressed, patterns reorganize (Refinement)</span>
                                </li>
                                <li className="flex gap-3 items-baseline">
                                    <span className="text-cyan-500 font-bold shrink-0 font-mono text-[13px]">9</span>
                                    <span>Peak: Clarity; truth becomes undeniable (Seeing)</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-pink-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-sm">▲</span> FayaQun — Inner Return
                            </h4>
                            <ul className="space-y-3.5 text-[11px] sm:text-[12px] text-gray-300">
                                <li className="flex gap-3 items-baseline">
                                    <span className="text-pink-500 font-bold shrink-0 font-mono text-[13px]">9→6</span>
                                    <span>Integration: What was seen collapses into understanding</span>
                                </li>
                                <li className="flex gap-3 items-baseline">
                                    <span className="text-pink-500 font-bold shrink-0 font-mono text-[13px]">6→3</span>
                                    <span>Stabilization: Insight becomes lived state (Baseline Reset)</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-5 pt-2">
                        <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-gray-800/40">
                             <div className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded text-[10px] font-bold text-amber-500 uppercase tracking-tighter shrink-0">The Switch (6)</div>
                             <p className="text-[11px] sm:text-xs text-gray-400 italic">Turning point between reacting (old) and aligning (correct pattern).</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-4 bg-cyan-950/5 rounded-lg border border-cyan-900/20">
                                <div className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-tighter">3 → 6 (cx + bx²)</div>
                                <div className="text-[12px] text-cyan-300 font-bold mb-1.5">Rotation + Bending</div>
                                <p className="text-[10px] text-gray-400 leading-normal">Resistance appears. Life starts moving, patterns form through friction.</p>
                            </div>
                            <div className="p-4 bg-pink-950/5 rounded-lg border border-pink-900/20">
                                <div className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-tighter">6 → 9 (ax³)</div>
                                <div className="text-[12px] text-pink-300 font-bold mb-1.5">Vertical Lift</div>
                                <p className="text-[10px] text-gray-400 leading-normal">Nonlinear shift. Vertical threshold. Hidden truth rises sharply.</p>
                            </div>
                            <div className="p-4 bg-gray-900/20 rounded-lg border border-gray-700/20">
                                <div className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-tighter">9 → 3 (d)</div>
                                <div className="text-[12px] text-gray-100 font-bold mb-1.5">Fold + Return</div>
                                <p className="text-[10px] text-gray-400 leading-normal">Insight settles. Ego dissolves. Return with new stable alignment.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/40">
                        <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                            <span className="text-gray-200 font-bold">Inner Law of Transformation:</span> Each loop lifts awareness, folds it into the self, and returns it purified—until the motion becomes stable and aligned with the constant center.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChapterGeometry;