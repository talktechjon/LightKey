import React, { useRef, useImperativeHandle, forwardRef, useMemo, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { SliceData, VisualizationHandle } from '../types.ts';
import { TOTAL_SLICES, SLICE_DATA, SIZES, TRIANGLE_POINTS, COLORS, ICON_DIAL_DATA, SECRET_EMOJI_PATTERN, MUQATTAT_CHAPTERS } from '../constants.ts';
import { getSliceAtPoint, polarToCartesian } from '../utils.ts';
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

const Visualization = forwardRef<VisualizationHandle, VisualizationProps>(({ rotation, iconDialRotation, setRotation, isSpinning, onSpinStart, onSpinEnd, isSecretModeActive, secretEmojiShift, showTooltip, hideTooltip, onSliceSelect, isLowResourceMode }, ref) => {
  const animationFrameId = useRef<number | null>(null);
  const center = SIZES.width / 2;
  const svgRef = useRef<SVGSVGElement>(null);
  const rotatingGroupRef = useRef<SVGGElement>(null);
  const iconRotatingGroupRef = useRef<SVGGElement>(null);
  
  const SPIN_DURATION_MS = 4000;

  // State to track rotation for the core animation, updated on every animation frame for smoothness.
  const [animationRotation, setAnimationRotation] = useState(rotation);

  // Keep animationRotation in sync with the prop for non-animation updates (e.g., slider).
  useEffect(() => {
    setAnimationRotation(rotation);
  }, [rotation]);


  const specialChapterPoints = useMemo(() => [
    TRIANGLE_POINTS[1].points[0].value, // Downward 3- Wave
    TRIANGLE_POINTS[1].points[1].value, // Downward 6- Particle
    TRIANGLE_POINTS[1].points[2].value, // Downward 9 Vibration
    TRIANGLE_POINTS[0].points[0].value, // Upward 3- Repent
    TRIANGLE_POINTS[0].points[1].value, // Upward 6- Purify
    TRIANGLE_POINTS[0].points[2].value, // Upward 9- Energy
  ], []);

  const calculateTargetVerseCounts = (currentRotation: number) => {
    return specialChapterPoints.map(pointValue => {
        const slice = getSliceAtPoint(pointValue, currentRotation);
        return slice.blockCount;
    });
  };
  
  const [displayedVerseCounts, setDisplayedVerseCounts] = useState(() => calculateTargetVerseCounts(rotation));
  const wasSpinning = useRef(false);

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


  const colorScale = d3.scaleLinear<string>()
    .domain([1, TOTAL_SLICES * 0.25, TOTAL_SLICES * 0.5, TOTAL_SLICES * 0.75, TOTAL_SLICES * 0.875, TOTAL_SLICES])
    .range(['#87CEFA', '#4682B4', '#FFD700', '#FF4500', '#483D8B', '#87CEFA'])
    .interpolate(d3.interpolateHcl);

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
    const sliceAngle = 360 / TOTAL_SLICES;
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

    const sliceAngle = 360 / TOTAL_SLICES;
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

  const sliceAngle = 360 / TOTAL_SLICES;
  const maxBlockCount = Math.max(...SLICE_DATA.map(s => s.blockCount));
  const iconRadius = SIZES.layer1OuterRadius + (SIZES.layer2InnerRadius - SIZES.layer1OuterRadius) / 2;

  const renderTriangle = (triangleDef: typeof TRIANGLE_POINTS[0]) => {
    const pointCoords = triangleDef.points.map((p) => {
      // Align to the *start* of the slice for pixel-perfect pointing.
      const angle = ((p.value - 1) / TOTAL_SLICES) * 360;
      const radius = SIZES.dialRadius + (SIZES.layer1InnerRadius - SIZES.dialRadius) / 2;
      return polarToCartesian(center, center, radius, angle);
    });
    const pointsString = pointCoords.map(pc => `${pc.x},${pc.y}`).join(' ');
    
    const displayColor = triangleDef.name === 'Upward Triangle' ? COLORS.triangle2 : COLORS.triangle1;
  
    return (
      <g>
        <polygon points={pointsString} fill="none" stroke={displayColor} strokeWidth="2.5" strokeOpacity="0.8" />
        {pointCoords.map((pc, i) => (
          <circle
            key={`${triangleDef.name}-dot-${i}`}
            cx={pc.x}
            cy={pc.y}
            r="3"
            fill="white"
            fillOpacity={0.9}
          />
        ))}
      </g>
    );
  };
  
  const FONT_SIZE_BAR = 12;

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

        return (
            <VersePolygon
                key={`core-layer-${i}`}
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
        );
    });
  };

  const renderIconLayer = () => {
      const iconSize = 30;

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

  return (
    <div className="w-full h-full">
      <style>{`
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
          {SLICE_DATA.map((slice, index) => {
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
            
            return (
              <g
                key={slice.id}
                className="slice-group"
                onClick={() => handleSliceClick(slice.id)}
                onMouseEnter={(e) => showTooltip(e, slice.id, sliceColor)}
                onMouseMove={(e) => showTooltip(e, slice.id, sliceColor)}
                onMouseLeave={hideTooltip}
              >
                <path d={slicePath} fill={sliceColor} stroke="#1a1a1a" strokeWidth={1} />
                <text x={sliceTextPos.x} y={sliceTextPos.y} textAnchor="middle" dominantBaseline="middle" fill="#111" fontSize="10" fontWeight="bold" className={`counter-rotate-text ${isMuqattat ? 'muqattat-glow-svg-text' : ''}`} transform={`rotate(${-rotation} ${sliceTextPos.x} ${sliceTextPos.y})`} style={{pointerEvents: 'none'}}>
                  {slice.id}
                </text>
                <path d={barPath} fill={sliceColor} stroke="#1a1a1a" strokeWidth={1} />
                <text x={barTextPos.x} y={barTextPos.y} textAnchor="middle" dominantBaseline="middle" fill={barTextColor} fontSize={FONT_SIZE_BAR} fontWeight="medium" className={`counter-rotate-text ${isMuqattat ? 'muqattat-glow-svg-text' : ''}`} transform={`rotate(${-rotation} ${barTextPos.x} ${barTextPos.y})`} style={{pointerEvents: 'none'}}>
                    {slice.blockCount}
                </text>
              </g>
            );
          })}
        </g>

        <g ref={iconRotatingGroupRef}>
            {renderIconLayer()}
        </g>
        
        <g>
          {TRIANGLE_POINTS.map(triangle => ( <g key={triangle.name}> {renderTriangle(triangle)} </g> ))}
        </g>
        
        <g onClick={handleSpin} style={{ cursor: isSpinning ? 'default' : 'pointer' }} className={isSpinning ? 'is-spinning' : ''}>
            <circle cx={center} cy={center} r={SIZES.dialRadius} fill="#111" stroke="#333" strokeWidth="2" />
            <foreignObject x={center - SIZES.dialRadius} y={center - SIZES.dialRadius} width={SIZES.dialRadius * 2} height={SIZES.dialRadius * 2}>
                <div xmlns="http://www.w3.org/1999/xhtml" style={{width: '100%', height: '100%'}}>
                    <CentralAnimation animationRotation={animationRotation} />
                </div>
            </foreignObject>
        </g>
      </svg>
    </div>
  );
});

export default Visualization;
