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
  const hasTooltip = !name.includes('🌴') && !name.includes('🐟');
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
        
        // Map to exact pairs for this flow: Book(19), Mountain(95), Orphan(57)
        const book = getSliceAtPoint(19, rotation);
        const mountain = getSliceAtPoint(95, rotation);
        const orphan = getSliceAtPoint(57, rotation);

        // sigma = fluid properties, range [8.0, 16.0]
        const sigmaVal = 8.0 + (book.blockCount / 35);
        const sigma = Math.min(16.0, Math.max(8.0, sigmaVal));
        
        // rho = heat/driving force, range [20.0, 48.0]
        const rhoVal = 18.0 + (mountain.id / 3);
        const rho = Math.min(48.0, Math.max(20.0, rhoVal));
        
        // beta = physical dimensions, range [2.0, 3.5]
        const betaVal = 2.0 + (orphan.blockCount / 100);
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

        // Markers for Lorenz: Book, Mountain, Orphan
        const m = [
            { idx: 600, color: COLORS.triangle1, name: '3c', label: `Orphan [${orphan.id}:${orphan.blockCount}]` },
            { idx: 1750, color: COLORS.triangle1, name: '6b', label: `Mountain [${mountain.id}:${mountain.blockCount}]` },
            { idx: 2900, color: COLORS.triangle1, name: '9a', label: `Book [${book.id}:${book.blockCount}]` },
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

export const BirdMotion: React.FC<{ rotation: number, isPaused: boolean, onToggle: () => void }> = ({ rotation, isPaused, onToggle }) => {
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

    const heartGeometry = useMemo(() => {
        // 1. DATA EXTRACTION: Get the 6 active chapters in the current geometry rotation
        const s1 = getSliceAtPoint(1, rotation);       // Slave 🌴
        const s95 = getSliceAtPoint(95, rotation);     // Mountain 🕋
        const s77 = getSliceAtPoint(77, rotation);     // Righteous 💧
        const s19 = getSliceAtPoint(19, rotation);     // Book 🔆
        const s110 = getSliceAtPoint(110, rotation);   // Return 🏆
        const s57 = getSliceAtPoint(57, rotation);     // Boat 🐟
        
        const nodes = [s1, s95, s77, s19, s110, s57];
        
        // 2. NORMALIZATION: Map chapters and verses to a [0, 1] energy space
        const pts = nodes.map(n => ({
            x: n.id / 114,
            y: n.blockCount / 286 // Normalized Verse Energy
        }));

        // 3. COEFFICIENT SOLVING (Umm al-Kitab Engine):
        // f(x) = ax³ + bx² + cx + d 
        const rawC = (pts[5].y - pts[0].y) / 0.5; // Linear Spread (Boat 57 - Slave 1)
        const rawB = pts[2].y * 2;               // Quadratic Arch (Righteous 77)
        const rawA = (pts[4].y - pts[1].y) / 0.3; // Cubic Lift (Return 110 - Mountain 95)

        // Stabilization
        const stabilize = (val: number, limit: number) => Math.max(-limit, Math.min(limit, val));

        const c = stabilize(rawC, 1.2);
        const b = stabilize(rawB, 1.5);
        const a = stabilize(rawA, 2.0);

        // 4. DELTA DYNAMICS: Wave Propagation Velocity
        const deltas = nodes.map((n, i) => Math.abs(nodes[(i + 1) % nodes.length].blockCount - n.blockCount));
        const averageDelta = deltas.reduce((acc, v) => acc + v, 0) / 6;
        const waveVelocity = 0.5 * (1 + (averageDelta / 60)); // Propagation velocity 'v'

        // 5. MECHANICAL HEART TIMELINE (Pressure -> Delta Scale)
        const true_s = waveVelocity * time; 
        const phase = ((true_s % 1) + 1) % 1; 

        // Mechanical Mapping: 6-Step Cycle to Cardiac Phase volume 'u'
        const getBaseVolume = (p: number) => {
            if (p < 0.15) return p / 0.15 * 0.3;                                // Slave: Atrial fill (expand)
            if (p < 0.25) return 0.3 - ((p - 0.15) / 0.10) * 0.2;               // Mountain: Atrial contract (tighten)
            if (p < 0.40) return 0.1 - Math.pow((p - 0.25) / 0.15, 2) * 1.1;    // Righteous: Ventricular contract (full squeeze)
            if (p < 0.50) return -1.0 + ((p - 0.40) / 0.10) * 0.2;              // Book: Valve flash (anchor hold)
            if (p < 0.70) return -0.8 + ((p - 0.50) / 0.20) * 0.8;              // Return: Ventricular relaxation (expand back)
            return 0;                                                           // Boat: Passive filling
        };

        const u = getBaseVolume(phase);
        
        // Umm al-Kitab Pressure Evolution:
        const pressure = a * Math.pow(u, 3) + b * Math.pow(u, 2) + c * u;

        // 6. VISUAL CUE MAPPING
        let activePhase = "Boat";
        let visualCue = "Passive filling";
        let color = "#3b82f6"; // blue
        let flash = 0;

        if (phase < 0.15) {
            activePhase = "Slave";
            visualCue = "Atrial filling";
            color = "#60a5fa"; // light blue
        } else if (phase < 0.25) {
            activePhase = "Mountain";
            visualCue = "Atrial contraction";
            color = "#c084fc"; // purple
        } else if (phase < 0.40) {
            activePhase = "Righteous";
            visualCue = "Ventricular squeeze";
            color = "#ef4444"; // intense red
        } else if (phase < 0.50) {
            activePhase = "Book";
            visualCue = "Valve transition";
            color = "#fbbf24"; // yellow flare
            flash = 1 - (phase - 0.40) / 0.10; // flash fades
        } else if (phase < 0.70) {
            activePhase = "Return";
            visualCue = "Ventricular release";
            color = "#2dd4bf"; // teal
        }

        // 7. REALISTIC ANATOMICAL HEART GEOMETRY
        let atrialScale = 1.0;
        let ventScale = 1.0;
        let avOpen = 0; // Atrioventricular valves (Mitral/Tricuspid)
        let slOpen = 0; // Semilunar valves (Aortic/Pulmonary)
        let fillFlow = 0;
        let ejectFlow = 0;

        if (phase < 0.15) { // Slave -> Passive Filling
            atrialScale = 1.0 + (phase / 0.15) * 0.1;
            ventScale = 1.0 + (phase / 0.15) * 0.1;
            avOpen = 1;
            slOpen = 0;
            fillFlow = 1;
        } else if (phase < 0.25) { // Mountain -> Atrial Contraction
            const p = (phase - 0.15) / 0.10;
            atrialScale = 1.1 - p * 0.2; // contracts strongly
            ventScale = 1.1 + p * 0.1; // fills completely
            avOpen = 1;
            slOpen = 0;
            fillFlow = 1 + p * 2; // rush of blood
        } else if (phase < 0.40) { // Righteous -> Ventricular Contraction (Systole Peak)
            const p = (phase - 0.25) / 0.15;
            atrialScale = 0.9 + p * 0.1; // starts relaxing
            ventScale = 1.2 - Math.pow(p, 1.5) * 0.35; // contracts deeply
            // Isovolumetric initially, then ejects
            if (p < 0.15) {
                avOpen = 0;
                slOpen = 0;
                ejectFlow = 0;
            } else {
                avOpen = 0;
                slOpen = Math.sin((p - 0.15) / 0.85 * Math.PI); // opens and closes
                ejectFlow = slOpen * 2;
            }
        } else if (phase < 0.50) { // Book -> Isovolumetric Relaxation (Valves close)
            const p = (phase - 0.40) / 0.10;
            atrialScale = 1.0 + p * 0.05;
            ventScale = 0.85;
            avOpen = 0;
            slOpen = 0;
            ejectFlow = 0;
        } else if (phase < 0.70) { // Return -> Ventricular filling starts
            const p = (phase - 0.50) / 0.20;
            atrialScale = 1.05 - p * 0.05;
            ventScale = 0.85 + Math.pow(p, 0.5) * 0.15; // rapid fill
            avOpen = p; // slowly opening
            slOpen = 0;
            fillFlow = p;
        } else { // Boat -> Passive Filling
            atrialScale = 1.0;
            ventScale = 1.0;
            avOpen = 1;
            slOpen = 0;
            fillFlow = 1;
        }

        return {
            atrialScale,
            ventScale,
            avOpen,
            slOpen,
            fillFlow,
            ejectFlow,
            activePhase,
            visualCue,
            color,
            flash,
            phase,
            pressure
        };
    }, [rotation, time]);

    const dataPairs = useMemo(() => {
        const p1 = getSliceAtPoint(1, rotation);
        const p95 = getSliceAtPoint(95, rotation);
        const p77 = getSliceAtPoint(77, rotation);
        const p57 = getSliceAtPoint(57, rotation);
        const p39 = getSliceAtPoint(39, rotation);
        const p19 = getSliceAtPoint(19, rotation);
        return { p1, p95, p77, p57, p39, p19 };
    }, [rotation]);

    return (
        <div className="flex flex-col w-full space-y-4">
            <div className="relative w-full h-[220px] bg-black/90 rounded-xl border border-gray-800/80 shadow-inner flex flex-col items-center justify-center overflow-hidden transition-colors duration-500" style={{ boxShadow: `inset 0 0 ${20 + heartGeometry.flash * 40}px ${heartGeometry.color}20` }}>
                
                <div className="absolute top-2 left-2 flex flex-col z-20">
                    <span className="text-[11px] font-bold tracking-wider uppercase transition-colors duration-200" style={{ color: heartGeometry.color }}>
                        Umm al-Kitab<br/>Equation
                    </span>
                </div>
                
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke={heartGeometry.color} strokeWidth="0.5" className="transition-all duration-300"/>
                            </pattern>
                            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <rect width="50" height="50" fill="url(#smallGrid)"/>
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke={heartGeometry.color} strokeWidth="1" className="transition-all duration-300"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Beating Heart Canvas */}
                <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible z-10" preserveAspectRatio="xMidYMid meet">
                    {/* Valve Transition Flash */}
                    {heartGeometry.flash > 0 && (
                        <circle cx="50" cy="50" r={10 + heartGeometry.flash * 40} fill="#fbbf24" opacity={heartGeometry.flash * 0.4} style={{ filter: "blur(8px)" }} />
                    )}
                    
                    <g transform="translate(50, 50) scale(0.7) translate(-50, -50)">
                        <g className="transition-all duration-75">
                            {/* DEF GRADIENTS FOR MRI LOOK */}
                            <defs>
                                <radialGradient id="raGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
                                </radialGradient>
                                <radialGradient id="laGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.2" />
                                </radialGradient>
                                <radialGradient id="rvGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.3" />
                                </radialGradient>
                                <radialGradient id="lvGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#b91c1c" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.3" />
                                </radialGradient>
                            </defs>

                            {/* RIGHT ATRIUM */}
                            <g transform={`translate(35, 30) scale(${heartGeometry.atrialScale}) translate(-35, -30)`}>
                                {/* S/I Vena Cava */}
                                <path d="M 28 5 L 40 5 L 40 30 L 28 30 Z" fill="#1e3a8a" opacity="0.4" />
                                <path d="M 28 40 L 40 40 L 40 60 L 28 60 Z" fill="#1e3a8a" opacity="0.4" />
                                <path d="M 21 41 C 15 30, 20 15, 35 15 C 42 15, 48 25, 48 41 Z" fill="url(#raGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                            </g>

                            {/* LEFT ATRIUM */}
                            <g transform={`translate(65, 30) scale(${heartGeometry.atrialScale}) translate(-65, -30)`}>
                                {/* Pulmonary Veins */}
                                <path d="M 60 15 L 75 15 L 75 30 L 60 30 Z" fill="#7f1d1d" opacity="0.4" />
                                <path d="M 52 41 C 52 25, 58 15, 65 15 C 80 15, 85 30, 79 41 Z" fill="url(#laGrad)" stroke="#f87171" strokeWidth="0.8" />
                            </g>

                            {/* RIGHT VENTRICLE */}
                            <g transform={`translate(40, 65) scale(${heartGeometry.ventScale}) translate(-40, -65)`}>
                                <path d="M 48 45 L 20 45 C 10 65, 25 90, 48 95 C 47 75, 47 55, 48 45 Z" fill="url(#rvGrad)" stroke="#2563eb" strokeWidth="0.8" />
                            </g>

                            {/* LEFT VENTRICLE */}
                            <g transform={`translate(60, 65) scale(${heartGeometry.ventScale}) translate(-60, -65)`}>
                                <path d="M 52 45 L 80 45 C 90 70, 70 93, 46 95 C 50 75, 51 55, 52 45 Z" fill="url(#lvGrad)" stroke="#dc2626" strokeWidth="0.8" />
                            </g>

                            {/* SEPTUM (Dividing Wall) */}
                            <g transform={`translate(50, 70) scale(${heartGeometry.ventScale}) translate(-50, -70)`}>
                                <path d="M 47 45 L 53 45 L 50 94 L 46 95 Z" fill="#334155" opacity="0.9" />
                            </g>

                            {/* MITRAL & TRICUSPID VALVES (Atrioventricular) */}
                            <g strokeWidth="1.5" strokeLinecap="round">
                                {/* Tricuspid */}
                                <line x1="22" y1="45" x2="43" y2="45" stroke="#475569" strokeWidth="1" />
                                <line x1="22" y1="45" x2="32.5" y2={45 + heartGeometry.avOpen * 8} stroke="white" opacity="0.9" />
                                <line x1="43" y1="45" x2="32.5" y2={45 + heartGeometry.avOpen * 8} stroke="white" opacity="0.9" />

                                {/* Mitral */}
                                <line x1="57" y1="45" x2="78" y2="45" stroke="#475569" strokeWidth="1" />
                                <line x1="57" y1="45" x2="67.5" y2={45 + heartGeometry.avOpen * 8} stroke="white" opacity="0.9" />
                                <line x1="78" y1="45" x2="67.5" y2={45 + heartGeometry.avOpen * 8} stroke="white" opacity="0.9" />
                            </g>

                            {/* AORTA & PULMONARY ARTERY */}
                            <g>
                                {/* Pulmonary Artery */}
                                <path d="M 48 41 C 48 20, 60 15, 75 15" fill="none" stroke="#3b82f6" strokeWidth="8" opacity="0.7" />
                                {/* Aorta */}
                                <path d="M 52 41 C 52 25, 45 10, 55 5 C 65 0, 75 10, 65 20" fill="none" stroke="#ef4444" strokeWidth="8" opacity="0.7" />
                            </g>

                            {/* SEMILUNAR VALVES */}
                            <g strokeWidth="2" strokeLinecap="round">
                                {/* Pulmonary Valve */}
                                <line x1="45" y1="36" x2="52" y2="34" stroke="#475569" strokeWidth="1" />
                                {heartGeometry.slOpen > 0 && (
                                    <>
                                    <line x1="45" y1="36" x2={48 - heartGeometry.slOpen * 4} y2={30 - heartGeometry.slOpen * 5} stroke="#fcd34d" />
                                    <line x1="52" y1="34" x2={48 + heartGeometry.slOpen * 2} y2={30 - heartGeometry.slOpen * 5} stroke="#fcd34d" />
                                    </>
                                )}

                                {/* Aortic Valve */}
                                <line x1="48" y1="34" x2="55" y2="36" stroke="#475569" strokeWidth="1" />
                                {heartGeometry.slOpen > 0 && (
                                    <>
                                    <line x1="48" y1="34" x2={52 - heartGeometry.slOpen * 2} y2={30 - heartGeometry.slOpen * 5} stroke="#fcd34d" />
                                    <line x1="55" y1="36" x2={52 + heartGeometry.slOpen * 4} y2={30 - heartGeometry.slOpen * 5} stroke="#fcd34d" />
                                    </>
                                )}
                            </g>

                            {/* FLUID DYNAMICS */}
                            <g stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 8">
                                {heartGeometry.fillFlow > 0 && (
                                    <g opacity={heartGeometry.fillFlow}>
                                        <path d="M 32.5 35 L 32.5 60" style={{ strokeDashoffset: -(time * 20) % 10 }} />
                                        <path d="M 67.5 35 L 67.5 60" style={{ strokeDashoffset: -(time * 20) % 10 }} />
                                    </g>
                                )}
                                
                                {heartGeometry.ejectFlow > 0 && (
                                    <g opacity={heartGeometry.ejectFlow}>
                                        {/* RV -> Pulmonary flow */}
                                        <path d="M 48 45 C 48 20, 60 15, 75 15" style={{ strokeDashoffset: -(time * 30) % 10 }} strokeWidth="2" strokeDasharray="3 6" />
                                        {/* LV -> Aorta flow */}
                                        <path d="M 52 45 C 52 25, 45 10, 55 5 C 65 0, 75 10, 65 20" style={{ strokeDashoffset: -(time * 30) % 10 }} strokeWidth="2" strokeDasharray="3 6" />
                                    </g>
                                )}
                            </g>
                        </g>
                    </g>
                </svg>
                
                {/* Left side minimal indicators */}
                <div className="absolute bottom-2 left-3 flex space-x-1 z-20">
                    {[0.1, 0.2, 0.35, 0.45, 0.6, 0.85].map((target, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full border border-gray-600 transition-all duration-100 ${Math.abs(heartGeometry.phase - target) <= 0.1 ? 'scale-150' : 'opacity-40'}`} style={{ backgroundColor: Math.abs(heartGeometry.phase - target) <= 0.1 ? heartGeometry.color : 'transparent' }} />
                    ))}
                </div>
            </div>

            {/* Geometric Bird Data Legend Box */}
            <div className="w-full bg-black/40 border border-gray-800 rounded-xl p-4 sm:p-6 overflow-hidden">
                <div className="grid grid-cols-3 gap-y-8 relative">
                    {/* Row 1: Slave -> Mountain -> Righteous */}
                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-2xl sm:text-3xl">🌴</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base leading-tight">{dataPairs.p1.id}:{dataPairs.p1.blockCount}</div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full" title={CHAPTER_DETAILS.find(c => c.number === dataPairs.p1.id)?.englishName}>
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p1.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-tighter mt-0.5">Slave</div>
                            <div className={`mt-1 font-mono text-[11px] sm:text-xs h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p1.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p1.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-2xl sm:text-3xl">🕋</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-pink-500 font-bold text-sm sm:text-base leading-tight">{dataPairs.p95.id}:{dataPairs.p95.blockCount}</div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full" title={CHAPTER_DETAILS.find(c => c.number === dataPairs.p95.id)?.englishName}>
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p95.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-tighter mt-0.5">Mountain</div>
                            <div className={`mt-1 font-mono text-[11px] sm:text-xs h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p95.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p95.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-2xl sm:text-3xl">💧</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base leading-tight">{dataPairs.p77.id}:{dataPairs.p77.blockCount}</div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full" title={CHAPTER_DETAILS.find(c => c.number === dataPairs.p77.id)?.englishName}>
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p77.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-tighter mt-0.5">Righteous</div>
                            <div className={`mt-1 font-mono text-[11px] sm:text-xs h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p77.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p77.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    {/* Middle Arrows Section */}
                    <div className="col-span-3 flex justify-between items-center px-4 -my-4 relative h-16 sm:h-20">
                        {/* Up Arrow (connecting Boat to Slave) */}
                        <div className="z-10 text-cyan-400">
                             <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                                <path d="M 8 20 L 8 4 M 8 4 L 3 9 M 8 4 L 13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                             </svg>
                        </div>
                        
                        <div 
                            className="absolute inset-0 flex items-center justify-center group z-20"
                            onClick={onToggle}
                            title="Toggle Core Animation Engine"
                        >
                            {/* Central Bird Silhouette Logo */}
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

                        <div className="h-px bg-gray-800 flex-grow mx-12 opacity-30"></div>
                        
                        {/* Down Arrow (connecting Righteous to Book) */}
                        <div className="z-10 text-pink-500">
                             <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                                <path d="M 8 0 L 8 16 M 8 16 L 3 11 M 8 16 L 13 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                             </svg>
                        </div>
                    </div>

                    {/* Row 2: Boat -> Queen -> Book */}
                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-2xl sm:text-3xl">🐟</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-pink-500 font-bold text-sm sm:text-base leading-tight">{dataPairs.p57.id}:{dataPairs.p57.blockCount}</div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full" title={CHAPTER_DETAILS.find(c => c.number === dataPairs.p57.id)?.englishName}>
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p57.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-tighter mt-0.5">Boat</div>
                            <div className={`mt-1 font-mono text-[11px] sm:text-xs h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p57.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p57.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-2xl sm:text-3xl">🐝</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base leading-tight">{dataPairs.p39.id}:{dataPairs.p39.blockCount}</div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full" title={CHAPTER_DETAILS.find(c => c.number === dataPairs.p39.id)?.englishName}>
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p39.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-tighter mt-0.5">Queen</div>
                            <div className={`mt-1 font-mono text-[11px] sm:text-xs h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p39.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p39.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start space-y-2 w-full max-w-[85px] mx-auto text-center overflow-hidden">
                        <span className="text-2xl sm:text-3xl">🔆</span>
                        <div className="text-center flex flex-col items-center w-full">
                            <div className="text-pink-500 font-bold text-sm sm:text-base leading-tight">{dataPairs.p19.id}:{dataPairs.p19.blockCount}</div>
                            <div className="text-[9px] sm:text-[10px] text-gray-300 font-medium mt-0.5 truncate w-full" title={CHAPTER_DETAILS.find(c => c.number === dataPairs.p19.id)?.englishName}>
                                {CHAPTER_DETAILS.find(c => c.number === dataPairs.p19.id)?.englishName}
                            </div>
                            <div className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-tighter mt-0.5">Book</div>
                            <div className={`mt-1 font-mono text-[11px] sm:text-xs h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p19.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p19.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChapterGeometry: React.FC<ChapterGeometryProps> = ({ rotation, isLowResourceMode, showFunctionalTooltip, hideTooltip }) => {
    const [isSystemActive, setIsSystemActive] = React.useState(true);
    
    // Side Panel Presentation Reordering (DNA Flow - INTERLEAVED):
    // Row 1 (Interleaved Layout): Slave(D 1) -> Mountain(U 95) -> Righteous(D 77)
    const dnaRow1: PointWithColor[] = [
        { ...TRIANGLE_POINTS[1].points[0], value: CENTRAL_GEOMETRY_POINTS[0], color: TRIANGLE_POINTS[1].color }, // Slave (Cyan)
        { ...TRIANGLE_POINTS[0].points[1], value: CENTRAL_GEOMETRY_POINTS[4], color: TRIANGLE_POINTS[0].color }, // Mountain (Pink) - Twisted Up
        { ...TRIANGLE_POINTS[1].points[2], value: CENTRAL_GEOMETRY_POINTS[2], color: TRIANGLE_POINTS[1].color }, // Righteous (Cyan)
    ];

    // Row 2 (Interleaved Layout): Boat(U 57) -> Queen(D 39) -> Book(U 19)
    const dnaRow2: PointWithColor[] = [
        { ...TRIANGLE_POINTS[0].points[0], value: CENTRAL_GEOMETRY_POINTS[3], color: TRIANGLE_POINTS[0].color }, // Boat (Pink)
        { ...TRIANGLE_POINTS[1].points[1], value: CENTRAL_GEOMETRY_POINTS[1], color: TRIANGLE_POINTS[1].color }, // Queen (Cyan) - Twisted Down
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
                    <div className="text-[clamp(8px,2.8vw,11px)] text-gray-500 mb-3 font-bold tracking-tight opacity-80 uppercase bg-gray-900/40 px-3 py-1 rounded-full border border-gray-800/50">
                        f(x) = ax³ [110] + bx² [108] + cx [103] + d [19]
                    </div>
                    <div className="flex items-baseline gap-x-2">
                        <span className="text-gray-400 italic text-xs">f(x) =</span>
                        <div className="grid grid-cols-4 gap-x-2 sm:gap-x-4 text-center">
                            <span className="text-red-400 font-bold text-[clamp(8px,2.5vw,12px)]">ax³ [110]</span>
                            <span className="text-teal-400 font-bold text-[clamp(8px,2.5vw,12px)]">bx² [108]</span>
                            <span className="text-amber-400 font-bold text-[clamp(8px,2.5vw,12px)]">cx [103]</span>
                            <span className="text-cyan-400 font-bold text-[clamp(8px,2.5vw,11px)]">d [19]</span>

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
                    <BirdMotion rotation={rotation} isPaused={!isSystemActive} onToggle={() => setIsSystemActive(!isSystemActive)} />
                </div>

                <div className="mt-8 p-5 bg-gray-950/40 border border-gray-800/60 rounded-xl space-y-7 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-px bg-gradient-to-l from-cyan-500/10 to-transparent w-full h-px"></div>
                    
                    <div className="space-y-4">
                        <div className="w-full h-6 flex items-center">
                            <svg viewBox="0 0 420 20" preserveAspectRatio="xMinYMid meet" className="w-full h-full">
                                <text x="0" y="15" className="fill-gray-200 font-mono font-bold text-[16px] tracking-tight">
                                    f(x) = ax³ [110] + bx² [108] + cx [103] + d [19]
                                </text>
                            </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed italic border-l-2 border-gray-800 pl-4">
                            Yusuf (12) is the primary full-cycle example: one complete transformation cycle (dream → trial → clarity → return) repeated until final alignment is stable.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-8">
                        <div className="space-y-4">
                            <h4 className="text-[clamp(8px,2.5vw,11px)] font-bold text-cyan-400 uppercase tracking-widest flex items-start gap-1.5">
                                <span className="text-sm leading-none shrink-0 mt-0.5">▼</span> <span>Qun — Inner Movement (Yusuf Trial)</span>
                            </h4>
                            <ul className="space-y-3.5 text-[10px] sm:text-[11px] md:text-[12px] text-gray-300">
                                <li className="flex gap-2 items-baseline">
                                    <span className="text-cyan-500 font-bold shrink-0 font-mono text-[12px]">3</span>
                                    <span className="leading-tight">Entry (12:4): Dream appears; signal enters as divine impulse.</span>
                                </li>
                                <li className="flex gap-2 items-baseline">
                                    <span className="text-cyan-500 font-bold shrink-0 font-mono text-[12px]">6</span>
                                    <span className="leading-tight">Pressure (12:8–35): Constraints (well, slavery, prison) reshape self.</span>
                                </li>
                                <li className="flex gap-2 items-baseline">
                                    <span className="text-cyan-500 font-bold shrink-0 font-mono text-[12px]">9</span>
                                    <span className="leading-tight">Peak (12:36–49): Clarity; hidden structures/meanings exposed.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[clamp(8px,2.5vw,11px)] font-bold text-pink-500 uppercase tracking-widest flex items-start gap-1.5">
                                <span className="text-sm leading-none shrink-0 mt-0.5">▲</span> <span>FayaQun — Return (Yusuf Authority)</span>
                            </h4>
                            <ul className="space-y-3.5 text-[10px] sm:text-[11px] md:text-[12px] text-gray-300">
                                <li className="flex gap-2 items-baseline">
                                    <span className="text-pink-500 font-bold shrink-0 font-mono text-[12px]">9→6</span>
                                    <span className="leading-tight">Governance: Yusuf interprets and applies insight to reality.</span>
                                </li>
                                <li className="flex gap-2 items-baseline">
                                    <span className="text-pink-500 font-bold shrink-0 font-mono text-[12px]">6→3</span>
                                    <span className="leading-tight">Stabilization (12:54–100): Return to center; authority + reunion.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-5 pt-2">
                        <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-gray-800/40">
                             <div className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded text-[10px] font-bold text-amber-500 uppercase tracking-tighter shrink-0">The Switch (6)</div>
                             <p className="text-[11px] sm:text-xs text-gray-400 italic">Critical boundary (12:23, 12:33): Choose alignment over reacting to preserve system stability.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-4 bg-cyan-950/5 rounded-lg border border-cyan-900/20">
                                <div className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-tighter">Rössler (Chrysalis)</div>
                                <div className="text-[12px] text-cyan-300 font-bold mb-1.5">Internal Refinement</div>
                                <p className="text-[10px] text-gray-400 leading-normal">Closed loops (Well → House → Prison). Repeated trials refine the inner self toward purity.</p>
                            </div>
                            <div className="p-4 bg-pink-950/5 rounded-lg border border-pink-900/20">
                                <div className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-tighter">Lorenz (Photosynthesis)</div>
                                <div className="text-[12px] text-pink-300 font-bold mb-1.5">Interactive Conversion</div>
                                <p className="text-[10px] text-gray-400 leading-normal">Open system (King's Dream). External signal → transformation → structured real-world output.</p>
                            </div>
                            <div className="p-4 bg-gray-900/20 rounded-lg border border-gray-700/20">
                                <div className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-tighter">Stabilized Core</div>
                                <div className="text-[12px] text-gray-100 font-bold mb-1.5">Narrative Anchor</div>
                                <p className="text-[10px] text-gray-400 leading-normal">One full execution: dream → trial → clarity → return. Insight becomes the new baseline lived state.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/40">
                        <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                            <span className="text-gray-200 font-bold">The Narrative Engine:</span> Internal constraints (Rössler) refine the self until external responsibility (Lorenz) produces structured reality—aligning the inner law with the outer kingdom.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChapterGeometry;