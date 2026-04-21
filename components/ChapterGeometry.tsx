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

export const BirdMotion: React.FC<{ rotation: number }> = ({ rotation }) => {
    const [time, setTime] = React.useState(0);

    React.useEffect(() => {
        let frame: number;
        const animate = (t: number) => {
            setTime(t / 1000);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    const birdGeometry = useMemo(() => {
        // 1. DATA EXTRACTION: Get the 6 active chapters in the current geometry rotation
        const s1 = getSliceAtPoint(1, rotation);       // Slave 🌴
        const s95 = getSliceAtPoint(95, rotation);     // Mountain 🕋
        const s77 = getSliceAtPoint(77, rotation);     // Righteous 💧
        const s19 = getSliceAtPoint(19, rotation);     // Book 🔆
        const s110 = getSliceAtPoint(110, rotation);   // Return Chapter 🌀
        const s57 = getSliceAtPoint(57, rotation);     // Boat 🐟
        
        const nodes = [s1, s95, s77, s19, s110, s57];
        
        // 2. NORMALIZATION: Map chapters and verses to a [0, 1] energy space
        const pts = nodes.map(n => ({
            x: n.id / 114,
            y: n.blockCount / 286 // Normalized Verse Energy
        }));

        // 3. COEFFICIENT SOLVING (Umm al-Kitab Engine):
        // f(x) = ax³ [110] + bx² [108] + cx [103] + d [19]
        const d = pts[3].y;                      // Constant (Book 19)
        const rawC = (pts[5].y - pts[0].y) / 0.5; // Linear Spread (Boat 57 - Slave 1)
        const rawB = pts[2].y * 2;               // Quadratic Arch (Righteous 77)
        const rawA = (pts[4].y - pts[1].y) / 0.3; // Cubic Lift (Return 110 - Mountain 95)

        // Stabilization
        const stabilize = (val: number, limit: number) => Math.max(-limit, Math.min(limit, val));

        const c = stabilize(rawC, 1.2);
        const b = stabilize(rawB, 1.5);
        const a = stabilize(rawA, 2.0);

        // 4. DELTA DYNAMICS: Wave Propagation Velocity & Amplitude
        const deltas = nodes.map((n, i) => Math.abs(nodes[(i + 1) % nodes.length].blockCount - n.blockCount));
        const averageDelta = deltas.reduce((acc, v) => acc + v, 0) / 6;
        
        const speedMultiplier = 1 + (averageDelta / 60); 
        const waveVelocity = 0.5 * speedMultiplier; // Propagation velocity 'v'
        const wingFrequency = 8 * speedMultiplier; // Oscillation 'omega'
        const flapAmplitude = 0.8 + (averageDelta / 30); // True Angular Flap Amplitude (Radians)

        const segments = 60; // Resolution of the 3D Ribbon
        const spinePoints: { x: number, y: number, screenX: number, screenY: number, twist: number, env: number }[] = [];
        const wingPaths: string[] = [];
        const bodyShroud: string[] = [];
        
        // --- TIME-INDEPENDENT BOUNDARIES (Fixes Camera Shake) ---
        // We calculate the maximum possible size envelope for the current chapters
        // so the camera doesn't jump every frame as the wave animates.
        let minX = 10, maxX = 90; // Spine X naturally ranges 10 to 90
        let minY = Infinity, maxY = -Infinity;
        
        for (let testU = -1.5; testU <= 1.5; testU += 0.05) {
            const testYEq = a * Math.pow(testU, 3) + b * Math.pow(testU, 2) + c * testU + d;
            const testPy = 50 - (testYEq * 25);
            minY = Math.min(minY, testPy);
            maxY = Math.max(maxY, testPy);
        }
        
        // Add maximum wing/field amplitude padding
        const maxSpread = 15 + Math.abs(c) * 10 + Math.abs(b) * 5; 
        minX -= maxSpread * 0.8;  // Transverse X spread (accommodate flap)
        maxX += maxSpread * 0.8;
        minY -= maxSpread * 1.5;  // Transverse Y spread (amplified by twists & flap)
        maxY += maxSpread * 1.5;

        let headAnchor = { x: 50, y: 50 };

        // 5. 3D PARAMETRIC ENGINE: Spine, Wings, Twist
        for (let i = 0; i <= segments; i++) {
            // Parameter 's' defines position along the body: [-1, 1], with 1 being the head, -1 tail.
            const s = (i / segments) * 2 - 1; 
            
            // Envelope ensures wings taper at head/tail. Parabolic equation.
            const env = 1 - Math.pow(s, 2); 
            
            // 5a. The Traveling Argument 'u'
            // Maps physical space 's' and time 't' into a continuous repeating bounded wave input.
            const u = Math.sin(Math.PI * (s + waveVelocity * time)); 
            const du_ds = Math.PI * Math.cos(Math.PI * (s + waveVelocity * time));

            // 5b. Longitudinal Solution: Spine / Rössler Carrier
            const yEquation = a * Math.pow(u, 3) + b * Math.pow(u, 2) + c * u + d;
            
            // 5c. Twist Operator (Derivative): Theta = archtan(f'(x))
            // Chain rule: dy/ds = (dy/du) * (du/ds) 
            const dy_du = 3 * a * Math.pow(u, 2) + 2 * b * u + c;
            const m = dy_du * du_ds; 
            const twist = Math.atan(m * 1.5); // 1.5 scalar limits extreme 90deg rolls visually

            // Isometric Base Projection
            // Spine spans horizontal X axis. Y axis is the cubic fluctuation.
            const px = 50 + s * 40; 
            const py = 50 - (yEquation * 25); // Multiply by 25 to scale SVG space
            
            spinePoints.push({ x: px, y: py, screenX: px, screenY: py, twist, env });
            
            if (i === segments) headAnchor = { x: px, y: py };

            // 5d. Transverse Solution: Wings / Lorenz Radiator
            // Add radiating rays perpendicular to the spine, flapping with true angular dihedral.
            if (i % 2 === 0) { // Render ribbed field lines
                const phase = s * 1.5; // Phase delay so the flap ripples down the body organically
                
                // Dihedral flap angle (up and down angular sweep)
                const flapAngle = Math.sin(wingFrequency * time - phase) * flapAmplitude;
                
                // Max length of wings expands via internal data parameters
                const spreadScale = Math.max(5, 15 + c * 10 + b * 5); 
                // Subtle pulse for the "light/energy" look (stays near 1.0)
                const pulse = 0.85 + 0.15 * Math.cos(wingFrequency * time - phase);
                const W = spreadScale * env * pulse; 

                // 3D Matrix Rotation (Body Twist + Dihedral Flap)
                const leftAngle = twist - flapAngle;
                const rightAngle = twist + flapAngle;

                // Left wing (Extends to -Z, rotated by Euler angles):
                const lw_z = -W * Math.cos(leftAngle);
                const lw_y = W * Math.sin(leftAngle);

                // Right wing (Extends to +Z, rotated by Euler angles):
                const rw_z = W * Math.cos(rightAngle);
                const rw_y = -W * Math.sin(rightAngle);

                // 2D Projection: X = base_X + Z*0.4, Y = base_Y + Y' - Z*0.2
                // We tilt the camera slightly so Z depth pushes right and up.
                const l_sx = px + lw_z * 0.4;
                const l_sy = py + lw_y - lw_z * 0.15;

                const r_sx = px + rw_z * 0.4;
                const r_sy = py + rw_y - rw_z * 0.15;

                // Add to visual path (Smooth radiating curved lines)
                wingPaths.push(`M ${px} ${py} Q ${(l_sx + px)/2} ${l_sy + 2} ${l_sx} ${l_sy}`);
                wingPaths.push(`M ${px} ${py} Q ${(r_sx + px)/2} ${r_sy + 2} ${r_sx} ${r_sy}`);
                
                // Add translucent inner body shroud for the serpent core
                const widthX = env * 2 * Math.cos(twist);
                const widthY = env * 2 * Math.sin(twist);
                bodyShroud.push(`M ${px - widthX} ${py - widthY} L ${px + widthX} ${py + widthY}`);
            }
        }

        const spinePath = spinePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.screenX} ${p.screenY}`).join(' ');

        // Check if values exploded, provide fallback bounds
        if (minX === Infinity || minX === maxX) { minX = 0; maxX = 100; }
        if (minY === Infinity || minY === maxY) { minY = 0; maxY = 100; }

        // Perfect Center calculation
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        
        // Time-independent bounding boxes let us frame using an 85x85 safe area
        const geomWidth = Math.max(20, maxX - minX);
        const geomHeight = Math.max(20, maxY - minY);
        
        // Determine the safe absolute minimum scale to fit in box
        const scaleFit = Math.min(85 / geomWidth, 85 / geomHeight);

        return {
            spinePath,
            wingPaths,
            bodyShroud,
            head: headAnchor,
            amplitude: flapAmplitude,
            transformString: `translate(50, 50) scale(${scaleFit}) translate(${-cx}, ${-cy})` // Re-centers perfectly
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
            <div className="relative w-full h-[220px] bg-black/60 rounded-xl border border-gray-800/80 shadow-inner flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-2 left-3 flex flex-col z-10">
                    <span className="text-[10px] font-mono text-gray-400 tracking-tighter uppercase leading-none opacity-60">Traveling Serpent | 3D Wave</span>
                    <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase mt-1">Speech of Bird (27:16)</span>
                </div>
                
                <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] max-w-[320px] max-h-[100%] overflow-visible">
                    {/* Auto-scaling and Centering Wrapper for the traveling wave */}
                    <g transform={birdGeometry.transformString}>
                        
                        {/* Transverse Radiating Fields (Wings/Light) */}
                        {birdGeometry.wingPaths.map((d, i) => (
                            <path 
                                key={`wing-${i}`} 
                                d={d} 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="0.25" 
                                className="text-cyan-400" 
                                opacity={0.35 + (i % 2) * 0.25}
                            />
                        ))}

                        {/* Dense Core Shroud (Volume) */}
                        {birdGeometry.bodyShroud.map((d, i) => (
                            <path 
                                key={`shroud-${i}`} 
                                d={d} 
                                fill="none" 
                                stroke="white" 
                                strokeWidth="1.2" 
                                className="drop-shadow-sm"
                                opacity={0.3 + (i / 30) * 0.5}
                            />
                        ))}
                        
                        {/* Longitudinal Carrier (Spine/River) */}
                        <path 
                            d={birdGeometry.spinePath} 
                            fill="none" 
                            stroke="#fff" 
                            strokeWidth="1.5" 
                            className="drop-shadow-lg shadow-white"
                            opacity="0.9"
                        />

                        {/* Energy Head (Forward Progression) */}
                        <g transform={`translate(${birdGeometry.head.x}, ${birdGeometry.head.y})`}>
                            <circle cx="0" cy="0" r="1.5" fill="white" className="drop-shadow-md" />
                            <circle cx="0" cy="0" r="3" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.8">
                                <animate attributeName="r" values="1.5;5;1.5" dur="1s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
                            </circle>
                            <path 
                                d="M 0 -1 L 4 0 L 0 1 Z" 
                                fill="#fbbf24" 
                                opacity="0.9" 
                                className="drop-shadow-sm"
                            />
                        </g>
                    </g>
                </svg>
                
                <div className="absolute bottom-2 right-3 text-[9px] font-mono text-gray-500 uppercase tracking-widest italic z-10">
                    Dual-Field Output: Longitudinal + Transverse
                </div>
            </div>

            {/* Geometric Bird Data Legend Box */}
            <div className="w-full bg-black/40 border border-gray-800 rounded-xl p-4 sm:p-6 overflow-hidden">
                <div className="grid grid-cols-3 gap-y-8 relative">
                    {/* Row 1: Slave -> Mountain -> Righteous */}
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl sm:text-3xl">🌴</span>
                        <div className="text-center">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base">{dataPairs.p1.id}:{dataPairs.p1.blockCount}</div>
                            <div className="text-[9px] text-gray-500 uppercase tracking-tighter">Slave</div>
                            <div className={`mt-1 font-mono text-[11px] h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p1.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p1.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl sm:text-3xl">🕋</span>
                        <div className="text-center">
                            <div className="text-pink-500 font-bold text-sm sm:text-base">{dataPairs.p95.id}:{dataPairs.p95.blockCount}</div>
                            <div className="text-[9px] text-gray-500 uppercase tracking-tighter">Mountain</div>
                            <div className={`mt-1 font-mono text-[11px] h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p95.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p95.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl sm:text-3xl">💧</span>
                        <div className="text-center">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base">{dataPairs.p77.id}:{dataPairs.p77.blockCount}</div>
                            <div className="text-[9px] text-gray-500 uppercase tracking-tighter">Righteous</div>
                            <div className={`mt-1 font-mono text-[11px] h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p77.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
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
                        
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group">
                            {/* Central Bird Silhouette Logo */}
                            <svg 
                                width="80" 
                                height="40" 
                                viewBox="0 0 100 50" 
                                className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-transform duration-700 group-hover:scale-110"
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
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl sm:text-3xl">🐟</span>
                        <div className="text-center">
                            <div className="text-pink-500 font-bold text-sm sm:text-base">{dataPairs.p57.id}:{dataPairs.p57.blockCount}</div>
                            <div className="text-[9px] text-gray-500 uppercase tracking-tighter">Boat</div>
                            <div className={`mt-1 font-mono text-[11px] h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p57.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p57.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl sm:text-3xl">🐝</span>
                        <div className="text-center">
                            <div className="text-cyan-400 font-bold text-sm sm:text-base">{dataPairs.p39.id}:{dataPairs.p39.blockCount}</div>
                            <div className="text-[9px] text-gray-500 uppercase tracking-tighter">Queen</div>
                            <div className={`mt-1 font-mono text-[11px] h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p39.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
                                {MUQATTAT_LETTERS.get(dataPairs.p39.id)?.join(' ') || '—'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl sm:text-3xl">🔆</span>
                        <div className="text-center">
                            <div className="text-pink-500 font-bold text-sm sm:text-base">{dataPairs.p19.id}:{dataPairs.p19.blockCount}</div>
                            <div className="text-[9px] text-gray-500 uppercase tracking-tighter">Book</div>
                            <div className={`mt-1 font-mono text-[11px] h-4 ${MUQATTAT_CHAPTERS.has(dataPairs.p19.id) ? "muqattat-glow text-white" : "text-gray-700 font-bold opacity-30"}`}>
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
                        <RosslerFlow rotation={rotation} />
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
                        <LorenzFlow rotation={rotation} />
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
                    <BirdMotion rotation={rotation} />
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