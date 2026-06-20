
import React, { useRef, useImperativeHandle, forwardRef, useMemo, useEffect, useState } from 'react';
import { VisualizationHandle } from '../types.ts';
import { TOTAL_SLICES, SLICE_DATA, SIZES, TRIANGLE_POINTS, COLORS, ICON_DIAL_DATA, SECRET_EMOJI_PATTERN, MUQATTAT_CHAPTERS, CENTRAL_GEOMETRY_POINTS } from '../constants.ts';
import { getSliceAtPoint, polarToCartesian, colorScale } from '../utils.ts';
import VersePolygon from './VersePolygon.tsx';
import CentralAnimation from './CentralAnimation.tsx';

interface VisualizationProps {
  rotation: number;
  iconDialRotation: number;
  setRotation: (rotation: number | ((prevRotation: number) => number)) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: () => void;
  isSecretModeActive: boolean;
  secretEmojiShift: number;
  showTooltip: (event: React.MouseEvent, sliceId: number, color: string) => void;
  hideTooltip: () => void;
  onSliceSelect: (sliceId: number) => void;
  isLowResourceMode: boolean;
}
  
const describeDonutSlice = (x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
    const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
    const startInner = polarToCartesian(x, y, innerRadius, endAngle);
    const endInner = polarToCartesian(x, y, innerRadius, startAngle);
  
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  
    const d = [
      'M', startOuter.x, startOuter.y,
      'A', outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
      'L', endInner.x, endInner.y,
      'A', innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
      'Z',
    ].join(' ');
  
    return d;
};

const MOON_DIAL_HOURS = [
  {
    hourId: 12,
    hourStr: '12:00',
    angle: 0,
    chapters: '106–114, 1',
    title: 'Seed & Return Singularity',
    role: 'Return / Whispering closes — One — Home. Circular boundary returns back to the pre-temporal coordinate center.',
    keyVerse: '114:6 / 112:1 / 38:46',
    breath: '10',
    breathDesc: 'I9 / T3 Singularity voltage (closing asymmetry)',
    influence: 'New Moon (Seed hidden in 1:1)',
    color: '#a855f7'
  },
  {
    hourId: 1,
    hourStr: '1:00',
    angle: 30,
    chapters: '2–10',
    title: 'D10 Entry Corridors',
    role: 'D10 entry — Throne upon Water. Transition outward into the manifest grid coordinates.',
    keyVerse: '2:255 / 11:7 / 7:143',
    breath: '9',
    breathDesc: 'I9 compression (inhale / hidden / retreat)',
    influence: 'Waxing crescent → first quarter',
    color: '#3b82f6'
  },
  {
    hourId: 2,
    hourStr: '2:00',
    angle: 60,
    chapters: '11–19',
    title: 'Orphan / Grip Nodes',
    role: 'Centromere locks — Orphan protected with strength and insulation from external Taghut forces.',
    keyVerse: '19:12 / 18:50',
    breath: '9',
    breathDesc: 'I9 compression (inhale / hidden / retreat)',
    influence: 'Waxing crescent → first quarter',
    color: '#06b6d4'
  },
  {
    hourId: 3,
    hourStr: '3:00',
    angle: 90,
    chapters: '20–29',
    title: 'T3 Bridge Traversal',
    role: 'T3 traversal — Fish / Cave / Spider. Traversing the horizontal wormhole boundary.',
    keyVerse: '21:87 / 18:19 / 29:41',
    breath: '10',
    breathDesc: 'D10 expansion (exhale / manifest / advance)',
    influence: 'Waxing gibbous → full moon',
    color: '#10b981'
  },
  {
    hourId: 4,
    hourStr: '4:00',
    angle: 120,
    chapters: '30–39',
    title: 'Queen / Tesseract Nodes',
    role: 'Tesseract unfolds — Book reads Reader. Double-time breathing nodes sync on even hours.',
    keyVerse: '39:23 / 33:40',
    breath: '10',
    breathDesc: 'D10 expansion (exhale / manifest / advance)',
    influence: 'Waxing gibbous → full moon',
    color: '#22c55e'
  },
  {
    hourId: 5,
    hourStr: '5:00',
    angle: 150,
    chapters: '40–48',
    title: 'I9 Ascent Corridor',
    role: 'I9 announcement — Opening / Seal. Pure asymmetric rise towards the iron deployment.',
    keyVerse: '48:29 / 61:6 / 40:60',
    breath: '9',
    breathDesc: 'I9 compression (inhale / hidden / retreat)',
    influence: 'Waxing gibbous → full moon',
    color: '#84cc16'
  },
  {
    hourId: 6,
    hourStr: '6:00',
    angle: 180,
    chapters: '49–57',
    title: 'Turabin / Iron Nodes',
    role: 'Iron materializes — Kursi deployed. The core physical extraction and solid manifestation of Turabin.',
    keyVerse: '57:25 / 50:21',
    breath: '9',
    breathDesc: 'I9 compression (inhale / hidden / retreat)',
    influence: 'Full Moon (Turabin extracted — Iron visible)',
    color: '#eab308'
  },
  {
    hourId: 7,
    hourStr: '7:00',
    angle: 210,
    chapters: '58–67',
    title: 'Judgment / Record Corridor',
    role: 'Record presents — Dominion / Form. Cosmic weighing and alignment registers on the dial.',
    keyVerse: '58:7 / 67:1 / 64:3',
    breath: '10',
    breathDesc: 'D10 expansion (exhale / manifest / advance)',
    influence: 'Waning gibbous → last quarter',
    color: '#f97316'
  },
  {
    hourId: 8,
    hourStr: '8:00',
    angle: 240,
    chapters: '68–77',
    title: 'Righteous / Fire Nodes',
    role: 'Fire made safe — Mursalat sent. The cooling formula is delivered to safe-guard the traveler.',
    keyVerse: '77:1 / 21:69 / 74:30',
    breath: '10',
    breathDesc: 'D10 expansion (exhale / manifest / advance)',
    influence: 'Waning gibbous → last quarter',
    color: '#ef4444'
  },
  {
    hourId: 9,
    hourStr: '9:00',
    angle: 270,
    chapters: '78–86',
    title: 'Compression / Pen Corridor',
    role: 'Pen writes — Sun folds — Blast. Dynamic torque curls the field back into high density.',
    keyVerse: '81:8 / 84:19 / 79:14',
    breath: '9',
    breathDesc: 'I9 compression (inhale / hidden / retreat)',
    influence: 'Waning crescent → new moon',
    color: '#ec4899'
  },
  {
    hourId: 10,
    hourStr: '10:00',
    angle: 300,
    chapters: '87–95',
    title: 'Cave / Collapse Nodes',
    role: 'Cave crumbles — Best stature tested. High torque collapse into the lower arcs of return.',
    keyVerse: '95:4 / 7:143',
    breath: '9',
    breathDesc: 'I9 compression (inhale / hidden / retreat)',
    influence: 'Waning crescent → new moon',
    color: '#f43f5e'
  },
  {
    hourId: 11,
    hourStr: '11:00',
    angle: 330,
    chapters: '96–105',
    title: 'Command / Read Corridor',
    role: 'Read — Night outweighs — Measure tips. Core directive triggers the pre-temporal return sequence.',
    keyVerse: '96:1 / 97:1 / 101:9',
    breath: '10',
    breathDesc: 'D10 expansion (exhale / manifest / advance)',
    influence: 'Waning crescent → new moon',
    color: '#d946ef'
  }
];

const MoonPhase = ({ phase, size = 32 }: { phase: number; size: number }) => {
  const r = size / 2;
  const moonColor = "#fefce8"; // Light yellow
  const shadowColor = "#0f172a"; // Dark blue-gray
  
  const sweep = Math.abs(Math.cos(phase * 2 * Math.PI)) * r;
  
  if (phase <= 0.5) { // Waxing (Light on right)
    return (
      <g>
        <circle cx="0" cy="0" r={r} fill={shadowColor} />
        <path
          d={`M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${sweep} ${r} 0 0 ${phase < 0.25 ? 0 : 1} 0 ${-r}`}
          fill={moonColor}
        />
      </g>
    );
  } else { // Waning (Light on left)
    return (
      <g>
        <circle cx="0" cy="0" r={r} fill={moonColor} />
        <path
          d={`M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${sweep} ${r} 0 0 ${phase < 0.75 ? 0 : 1} 0 ${-r}`}
          fill={shadowColor}
        />
      </g>
    );
  }
};

const Visualization = forwardRef<VisualizationHandle, VisualizationProps>(({ rotation, iconDialRotation, setRotation, isSpinning, onSpinStart, onSpinEnd, isSecretModeActive, secretEmojiShift, showTooltip, hideTooltip, onSliceSelect, isLowResourceMode }, ref) => {

  const animationFrameId = useRef<number | null>(null);
  const center = SIZES.width / 2;
  const svgRef = useRef<SVGSVGElement>(null);
  const rotatingGroupRef = useRef<SVGGElement>(null);
  const iconRotatingGroupRef = useRef<SVGGElement>(null);
  
  const SPIN_DURATION_MS = 4000;
  const sliceAngle = 360 / TOTAL_SLICES;
  const FONT_SIZE_BAR = 12;

  // State to track rotation for the core animation, updated on every animation frame for smoothness.
  const [animationRotation, setAnimationRotation] = useState(rotation);

  // Keep animationRotation in sync with the prop for non-animation updates (e.g., slider).
  useEffect(() => {
    setAnimationRotation(rotation);
  }, [rotation]);

  const calculateTargetVerseCounts = (currentRotation: number) => {
    return CENTRAL_GEOMETRY_POINTS.map(pointValue => {
        const slice = getSliceAtPoint(pointValue, currentRotation);
        return slice.blockCount;
    });
  };
  
  const [displayedVerseCounts, setDisplayedVerseCounts] = useState(() => calculateTargetVerseCounts(rotation));
  const wasSpinning = useRef(false);

  // Moondial Clock Hover State & Handlers
  const [hoveredHourId, setHoveredHourId] = useState<number | null>(null);

  const handleMoondialMouseEnter = (event: React.MouseEvent, hour: typeof MOON_DIAL_HOURS[0]) => {
    setHoveredHourId(hour.hourId);
    showTooltip(event, -100, JSON.stringify(hour));
  };

  const handleMoondialMouseLeave = () => {
    setHoveredHourId(null);
    hideTooltip();
  };

  // Phase Pendulum State Logic
  const currentSlice = getSliceAtPoint(1, rotation);
  const isPhaseTurningPoint = currentSlice.id === 108 || currentSlice.id === 110 || currentSlice.id === 103;
  const phaseColor = isPhaseTurningPoint ? '#f59e0b' : null; // Amber for turning points

  useEffect(() => {
    // This effect ensures the imperative rotation of the SVG group stays
    // in sync with the React state, resolving conflicts from different update sources.
    if (rotatingGroupRef.current) {
      rotatingGroupRef.current.setAttribute('transform', `rotate(${rotation} ${center} ${center})`);
    }
    // Only apply iconDialRotation if not in secret mode
    if (iconRotatingGroupRef.current && !isSecretModeActive) {
      iconRotatingGroupRef.current.setAttribute('transform', `rotate(${iconDialRotation} ${center} ${center})`);
    } else if (iconRotatingGroupRef.current) {
        // Reset rotation in secret mode
        iconRotatingGroupRef.current.setAttribute('transform', `rotate(0 ${center} ${center})`);
    }
  }, [rotation, iconDialRotation, center, isSecretModeActive]);


  useEffect(() => {
    if (isSpinning) {
      wasSpinning.current = true;
      return; // Do nothing while spinning, keep the polygons static.
    }
  
    const targetVerseCounts = calculateTargetVerseCounts(rotation);
  
    // If we just stopped spinning (i.e., wasSpinning was true, but isSpinning is now false)
    if (wasSpinning.current && !isSpinning) {
      const timer = setTimeout(() => {
        setDisplayedVerseCounts(targetVerseCounts);
      }, 150); // A short delay to let the wheel "settle" before transforming.
      
      wasSpinning.current = false;
      return () => clearTimeout(timer);
    } else {
      // For all other cases (slider, arrows, custom animation), update immediately.
      setDisplayedVerseCounts(targetVerseCounts);
    }
  }, [rotation, isSpinning]);


  const animateRotation = (start: number, end: number, duration: number, onComplete?: () => void) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    let startTime: number | null = null;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 4);
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const newRotation = start + (end - start) * easedProgress;
      
      // Imperatively update ONLY the main dial for smooth animation
      if (rotatingGroupRef.current) {
        rotatingGroupRef.current.setAttribute('transform', `rotate(${newRotation} ${center} ${center})`);
      }
      
      // Update state to drive the central animation smoothly
      setAnimationRotation(newRotation);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(step);
      } else {
        // When animation ends, update React state to ensure consistency.
        setRotation(end); 
        if (onComplete) {
            onComplete();
        }
      }
    };
    animationFrameId.current = requestAnimationFrame(step);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    onSpinStart();

    const randomSlice = Math.floor(Math.random() * TOTAL_SLICES) + 1;
    const targetRotationForSlice = -(randomSlice - 1) * sliceAngle;
    const numSpins = 4 + Math.random() * 3;
    const currentFullSpins = Math.floor(rotation / 360);
    const endRotation = (currentFullSpins - numSpins) * 360 + targetRotationForSlice;
    
    animateRotation(rotation, endRotation, SPIN_DURATION_MS, onSpinEnd);
  };

  const handleSliceClick = (sliceId: number) => {
    if (isSpinning) return;
    onSpinStart();
    onSliceSelect(sliceId);

    const targetRotation = -(sliceId - 1) * sliceAngle;
    
    const startRotation = rotation;
    const startAngle = startRotation % 360;
    const targetAngle = targetRotation % 360;

    let diff = targetAngle - startAngle;
    if (diff > 180) {
        diff -= 360;
    } else if (diff < -180) {
        diff += 360;
    }

    const endRotation = startRotation + diff;
    animateRotation(startRotation, endRotation, 750, onSpinEnd);
  };

  useImperativeHandle(ref, () => ({
    spin: handleSpin,
  }));

  // Memoize static slice data to avoid recalculating geometry on every render
  const staticSliceData = useMemo(() => {
    const maxBlockCount = Math.max(...SLICE_DATA.map(s => s.blockCount));
    
    return SLICE_DATA.map((slice, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;
      const midAngle = startAngle + sliceAngle / 2;
      const sliceColor = colorScale(slice.id);
      const slicePath = describeDonutSlice(center, center, SIZES.layer1InnerRadius, SIZES.layer1OuterRadius, startAngle, endAngle);
      const sliceTextPos = polarToCartesian(center, center, (SIZES.layer1InnerRadius + SIZES.layer1OuterRadius) / 2, midAngle);
      const heightRatio = slice.blockCount / maxBlockCount;
      const barOuterRadius = SIZES.layer2InnerRadius + (SIZES.layer2OuterRadius - SIZES.layer2InnerRadius) * heightRatio;
      const barPath = describeDonutSlice(center, center, SIZES.layer2InnerRadius, barOuterRadius, startAngle, endAngle);
      const barHeight = barOuterRadius - SIZES.layer2InnerRadius;
      const textFitsInBar = barHeight > FONT_SIZE_BAR + 4;
      const barTextRadius = textFitsInBar ? SIZES.layer2InnerRadius + barHeight / 2 : barOuterRadius + 8;
      const barTextColor = textFitsInBar ? '#111' : '#fff';
      const barTextPos = polarToCartesian(center, center, barTextRadius, midAngle);
      const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);

      return {
        ...slice,
        sliceColor,
        slicePath,
        sliceTextPos,
        barPath,
        barTextColor,
        barTextPos,
        isMuqattat
      };
    });
  }, [center, sliceAngle]);

  const renderTriangle = (triangleDef: typeof TRIANGLE_POINTS[0]) => {
    const pointCoords = triangleDef.points.map((p) => {
      // Align to the *start* of the slice for pixel-perfect pointing.
      const angle = ((p.value - 1) / TOTAL_SLICES) * 360;
      const radius = SIZES.dialRadius + (SIZES.layer1InnerRadius - SIZES.dialRadius) / 2;
      return polarToCartesian(center, center, radius, angle);
    });
    const pointsString = pointCoords.map(pc => `${pc.x},${pc.y}`).join(' ');
    
    // Override color if we are at a phase turning point (103, 108, 110)
    const displayColor = phaseColor || triangleDef.color;
    const isGlowing = phaseColor !== null;
  
    return (
      <g style={isGlowing ? { filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' } : {}}>
        <polygon 
            points={pointsString} 
            fill="none" 
            stroke={displayColor} 
            strokeWidth="2.5" 
            strokeOpacity="0.8" 
        />
      </g>
    );
  };

  const renderCorePolygons = () => {
    const NUM_LAYERS = 6;
    // This order is from outer to inner to match specialChapterPoints
    const corePolygonColors = [
        COLORS.triangle1, // Downward 3
        COLORS.triangle1, // Downward 6
        COLORS.triangle1, // Downward 9
        COLORS.triangle2, // Upward 3
        COLORS.triangle2, // Upward 6
        COLORS.triangle2, // Upward 9
    ];

    const padding = 25;
    const maxPolyRadius = SIZES.layer1InnerRadius - padding;
    const minPolyRadius = SIZES.dialRadius + padding;
    const effectiveRadius = maxPolyRadius - minPolyRadius;
    const radiusStep = NUM_LAYERS > 1 ? effectiveRadius / (NUM_LAYERS - 1) : 0;
    
    return Array.from({ length: NUM_LAYERS }).map((_, i) => {
        const verseCount = displayedVerseCounts[i] || 0;
        const layerRadius = maxPolyRadius - (i * radiusStep);
        const baseColor = corePolygonColors[i];
        const fillOpacity = 0.05 + i * 0.04;
        const strokeOpacity = 0.2 + i * 0.1;

        // Enhanced animation parameters for better visibility
        // Added transformBox: 'view-box' to ensure scaling happens from the SVG center in all browsers
        const animationStyle = !isLowResourceMode ? {
            animation: `emergence-pulse ${8 + i * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.5}s`,
            transformOrigin: 'center',
            transformBox: 'view-box',
            willChange: 'transform, opacity, filter'
        } as React.CSSProperties : undefined;

        return (
            <g key={`core-layer-${i}`} style={animationStyle}>
                <VersePolygon
                    verseCount={verseCount}
                    radius={layerRadius}
                    color={baseColor}
                    center={{ x: center, y: center }}
                    fillOpacity={fillOpacity}
                    strokeOpacity={strokeOpacity}
                    strokeWidth={1.5}
                    groupOpacity={1}
                    isLowResourceMode={isLowResourceMode}
                />
            </g>
        );
    });
  };

  const renderIconLayer = () => {
      const iconSize = 30;
      const iconRadius = SIZES.layer1OuterRadius + (SIZES.layer2InnerRadius - SIZES.layer1OuterRadius) / 2;

      if (isSecretModeActive) {
          const patternSize = SECRET_EMOJI_PATTERN.length;
          return SECRET_EMOJI_PATTERN.map((marker, index) => {
              // The emoji to show is determined by the circular shift
              const shiftedIndex = (index - secretEmojiShift + patternSize) % patternSize;
              const emojiToShow = SECRET_EMOJI_PATTERN[shiftedIndex];
              
              // The position is fixed based on the original marker's chapter
              const angle = (marker.chapter - 0.5) * sliceAngle;
              const iconPos = polarToCartesian(center, center, iconRadius, angle);
              
              return (
                  <image
                      key={`secret-icon-${marker.id}`}
                      href={emojiToShow.imageUrl}
                      x={iconPos.x - iconSize / 2}
                      y={iconPos.y - iconSize / 2}
                      width={iconSize}
                      height={iconSize}
                      style={{ pointerEvents: 'none' }}
                  >
                      <title>{emojiToShow.description}</title>
                  </image>
              );
          });
      }

      // Default icon rendering
      return ICON_DIAL_DATA.map(({ chapter, imageUrl, description, id }) => {
          const angle = (chapter - 0.5) * sliceAngle;
          const iconPos = polarToCartesian(center, center, iconRadius, angle);
          
          return (
              <image
                  key={`icon-${id}`}
                  href={imageUrl}
                  x={iconPos.x - iconSize / 2}
                  y={iconPos.y - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  transform={`rotate(${-iconDialRotation} ${iconPos.x} ${iconPos.y})`}
                  style={{ pointerEvents: 'none' }}
              >
                  <title>{description}</title>
              </image>
          );
      });
  };

  const renderMoondialLayer = () => {
      return (
          <g id="moondial-clocks-layer">
              {/* Distinct outer dotted background guideline rings */}
              <circle cx={center} cy={center} r={460} fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" />
              
              {MOON_DIAL_HOURS.map((hour, index) => {
                  const isHovered = hoveredHourId === hour.hourId;
                  const phase = (index / 12); // Mapping 12 hours to 0-1 cycle
                  const moonSize = isHovered ? 48 : 40;
                  const pos = polarToCartesian(center, center, 470, hour.angle);
                  
                  return (
                      <g 
                          key={`hour-sec-${hour.hourId}`}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => handleMoondialMouseEnter(e, hour)}
                          onMouseMove={(e) => handleMoondialMouseEnter(e, hour)}
                          onMouseLeave={handleMoondialMouseLeave}
                      >
                          {/* Invisible hit area for easier interactions */}
                          <circle cx={pos.x} cy={pos.y} r={35} fill="transparent" />
                          
                          {/* Moon Phase Icon */}
                          <g transform={`translate(${pos.x}, ${pos.y}) rotate(${hour.angle - 90})`}>
                              <MoonPhase phase={phase} size={moonSize} />
                          </g>

                          {/* Subtle Hour Marker if hovered */}
                          {isHovered && (
                              <text
                                  x={pos.x}
                                  y={pos.y + 35}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fill="#fff"
                                  fontSize="10"
                                  fontWeight="bold"
                                  className="font-sans select-none pointer-events-none"
                              >
                                  {hour.hourId}:00
                              </text>
                          )}
                      </g>
                  );
              })}
          </g>
      );
  };


  return (
    <div className="w-full h-full">
      <style>{`
        @keyframes emergence-pulse {
          0% { transform: scale(0.96); opacity: 0.6; filter: drop-shadow(0 0 0px rgba(6,182,212,0)); }
          50% { transform: scale(1.04); opacity: 1; filter: drop-shadow(0 0 10px rgba(6,182,212,0.3)); }
          100% { transform: scale(0.96); opacity: 0.6; filter: drop-shadow(0 0 0px rgba(6,182,212,0)); }
        }
        .slice-group {
          transition: opacity 0.2s ease-in-out;
        }
        .slice-container:not(.is-spinning) .slice-group {
          cursor: pointer;
        }
        .is-spinning .slice-group {
          transition: none;
          cursor: default;
        }
        .slice-container:not(.is-spinning):has(.slice-group:hover) .slice-group:not(:hover) {
          opacity: 0.3;
        }
        .slice-container:not(.is-spinning) .slice-group:hover {
           opacity: 1 !important;
        }
        .muqattat-glow-svg-text {
           filter: drop-shadow(0 0 3px white);
           fill: white !important;
        }
      `}</style>
      <svg 
        ref={svgRef} 
        viewBox={`0 0 ${SIZES.width} ${SIZES.height}`} 
        preserveAspectRatio="xMidYMid meet" 
        className={`w-full h-full`}
      >
        <circle cx={center} cy={center} r={SIZES.layer1InnerRadius} fill="#090a0f" />
        <g>
          {renderCorePolygons()}
        </g>
        
        <g ref={rotatingGroupRef} className={`slice-container ${isSpinning ? 'is-spinning' : ''}`}>
          {staticSliceData.map((slice) => (
              <g
                key={slice.id}
                className="slice-group"
                onClick={() => handleSliceClick(slice.id)}
                onMouseEnter={(e) => showTooltip(e, slice.id, slice.sliceColor)}
                onMouseMove={(e) => showTooltip(e, slice.id, slice.sliceColor)}
                onMouseLeave={hideTooltip}
              >
                <path d={slice.slicePath} fill={slice.sliceColor} stroke="#1a1a1a" strokeWidth={1} />
                <text x={slice.sliceTextPos.x} y={slice.sliceTextPos.y} textAnchor="middle" dominantBaseline="middle" fill="#111" fontSize="10" fontWeight="bold" className={`counter-rotate-text ${slice.isMuqattat ? 'muqattat-glow-svg-text' : ''}`} transform={`rotate(${-rotation} ${slice.sliceTextPos.x} ${slice.sliceTextPos.y})`} style={{pointerEvents: 'none'}}>
                  {slice.id}
                </text>
                <path d={slice.barPath} fill={slice.sliceColor} stroke="#1a1a1a" strokeWidth={1} />
                <text x={slice.barTextPos.x} y={slice.barTextPos.y} textAnchor="middle" dominantBaseline="middle" fill={slice.barTextColor} fontSize={FONT_SIZE_BAR} fontWeight="medium" className={`counter-rotate-text ${slice.isMuqattat ? 'muqattat-glow-svg-text' : ''}`} transform={`rotate(${-rotation} ${slice.barTextPos.x} ${slice.barTextPos.y})`} style={{pointerEvents: 'none'}}>
                    {slice.blockCount}
                </text>
              </g>
          ))}
        </g>

        <g ref={iconRotatingGroupRef}>
            {renderIconLayer()}
        </g>

        {renderMoondialLayer()}
        
        <g>
          {TRIANGLE_POINTS.map(triangle => ( <g key={triangle.name}> {renderTriangle(triangle)} </g> ))}
        </g>
        
        <g onClick={handleSpin} style={{ cursor: isSpinning ? 'default' : 'pointer' }} className={isSpinning ? 'is-spinning' : ''}>
            <circle cx={center} cy={center} r={SIZES.dialRadius} fill="#111" stroke="#333" strokeWidth="2" />
            <foreignObject x={center - SIZES.dialRadius} y={center - SIZES.dialRadius} width={SIZES.dialRadius * 2} height={SIZES.dialRadius * 2}>
                <div style={{width: '100%', height: '100%'}}>
                    <CentralAnimation animationRotation={animationRotation} />
                </div>
            </foreignObject>
        </g>
      </svg>
    </div>
  );
});

export default Visualization;
