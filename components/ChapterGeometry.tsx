import React from 'react';
import { TRIANGLE_POINTS, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MAKKI_ICON_SVG, MADANI_ICON_SVG } from '../constants.ts';
import { TrianglePoint } from '../types.ts';
import { getSliceAtPoint } from '../utils.ts';
import VersePolygon from './VersePolygon.tsx';

interface ChapterGeometryProps {
    rotation: number;
    showTooltip: (e: React.MouseEvent, surah: number, verse: number, color: string) => void;
    hideTooltip: () => void;
    isLowResourceMode: boolean;
}

type PointWithColor = TrianglePoint & { color: string };

// A memoized, self-contained component for the triangle geometry groups.
const TriangleGeometryGroup = React.memo(({ points, groupColor, name, direction, rotation, showTooltip, hideTooltip, isLowResourceMode }: { points: PointWithColor[], groupColor: string, name: string, direction: 'downward' | 'upward', rotation: number, showTooltip: ChapterGeometryProps['showTooltip'], hideTooltip: ChapterGeometryProps['hideTooltip'], isLowResourceMode: boolean }) => {
  const titleColor = direction === 'downward' ? 'text-fuchsia-300' : 'text-cyan-300';
  const titleSymbol = direction === 'downward' ? '▼' : '▲';
  
  return (
    <div>
      <h3 className={`font-semibold text-lg ${titleColor}`} style={{ textShadow: `0 0 5px ${groupColor}`}}>
        {titleSymbol} {name}
      </h3>
      <div className="mt-2 flex justify-around items-start space-x-2">
        {points.map((point, i) => {
          const slice = getSliceAtPoint(point.value, rotation);
          const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
          
          const typeParts = point.type.split(' ');
          const number = typeParts[0].replace('-', '');
          const pointName = typeParts.slice(1).join(' ').split('/')[0];

          const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
          const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
          return (
            <div 
              key={i} 
              className="text-center w-1/3 flex flex-col items-center"
              aria-label={`${point.type}: Chapter ${slice.id}, ${chapterInfo.englishName}, ${slice.blockCount} verses.`}
              onMouseEnter={(e) => showTooltip(e, slice.id, slice.blockCount, point.color)}
              onMouseLeave={hideTooltip}
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
              <div className="mt-1 text-xs leading-tight h-12 flex flex-col justify-center">
                <p className="font-mono text-white truncate w-full" title={point.type}>
                  {number}- {pointName}
                </p>
                <p className="text-gray-400">
                  <span className={`font-semibold ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}</span>:<span className="font-light">{slice.blockCount}</span>
                </p>
                 <p className="text-gray-300/90 truncate w-full flex items-center justify-center gap-1" title={chapterInfo.englishName}>
                    <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3 h-3" />
                    <span className="truncate">{chapterInfo.englishName}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const ChapterGeometry: React.FC<ChapterGeometryProps> = ({ rotation, showTooltip, hideTooltip, isLowResourceMode }) => {
    
    // This is the order for the combined geometry visualization, from outer to inner
    const centralGeometryPoints = [
        TRIANGLE_POINTS[1].points[0].value, // ▼ Downward 3- Wave
        TRIANGLE_POINTS[1].points[1].value, // ▼ Downward 6- Particle
        TRIANGLE_POINTS[1].points[2].value, // ▼ Downward 9 Vibration/Fall
        TRIANGLE_POINTS[0].points[0].value, // ▲ Upward 3- Repent
        TRIANGLE_POINTS[0].points[1].value, // ▲ Upward 6- Purify
        TRIANGLE_POINTS[0].points[2].value, // ▲ Upward 9- Energy/Return
    ];
    
    const centralVerseCounts = centralGeometryPoints.map(pointValue => {
        const slice = getSliceAtPoint(pointValue, rotation);
        return slice.blockCount;
    });

    // For side panel display, swap Purify and Particle, but keep their original colors.
    const downwardPointsWithColor: PointWithColor[] = [
        { ...TRIANGLE_POINTS[1].points[0], color: TRIANGLE_POINTS[1].color }, // 3- Wave (Magenta)
        { ...TRIANGLE_POINTS[0].points[1], color: TRIANGLE_POINTS[0].color }, // 6- Purify (Cyan) - Swapped
        { ...TRIANGLE_POINTS[1].points[2], color: TRIANGLE_POINTS[1].color }, // 9- Vibration (Magenta)
    ];

    const upwardPointsWithColor: PointWithColor[] = [
        { ...TRIANGLE_POINTS[0].points[0], color: TRIANGLE_POINTS[0].color }, // 3- Repent (Cyan)
        { ...TRIANGLE_POINTS[1].points[1], color: TRIANGLE_POINTS[1].color }, // 6- Particle (Magenta) - Swapped
        { ...TRIANGLE_POINTS[0].points[2], color: TRIANGLE_POINTS[0].color }, // 9- Energy (Cyan)
    ];
    
    const renderCombinedGeometry = () => {
        const NUM_LAYERS = 6;
        const corePolygonColors = [
            TRIANGLE_POINTS[1].color, // Wave
            TRIANGLE_POINTS[1].color, // Particle
            TRIANGLE_POINTS[1].color, // Vibration
            TRIANGLE_POINTS[0].color, // Repent
            TRIANGLE_POINTS[0].color, // Purify
            TRIANGLE_POINTS[0].color, // Energy
        ];

        const maxPolyRadius = 32;
        const minPolyRadius = 12;
        const effectiveRadius = maxPolyRadius - minPolyRadius;
        const radiusStep = NUM_LAYERS > 1 ? effectiveRadius / (NUM_LAYERS - 1) : 0;

        return centralVerseCounts.map((verseCount, i) => {
            const layerRadius = maxPolyRadius - (i * radiusStep);
            const baseColor = corePolygonColors[i];
            const fillOpacity = 0; // Set to 0 to remove fill
            const strokeOpacity = 0.4 + i * 0.1; // Increased for better visibility

            return (
                <VersePolygon
                    key={`side-panel-core-layer-${i}`}
                    verseCount={verseCount || 0}
                    radius={layerRadius}
                    color={baseColor}
                    center={{ x: 36, y: 36 }}
                    fillOpacity={fillOpacity}
                    strokeOpacity={strokeOpacity}
                    strokeWidth={1}
                    groupOpacity={1}
                    isLowResourceMode={isLowResourceMode}
                />
            );
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-200 tracking-wider">CHAPTER GEOMETRY</h2>
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2 mb-4"></div>
            <div className="flex items-center justify-center">
                <svg width={72} height={72} viewBox="0 0 72 72">
                    {renderCombinedGeometry()}
                </svg>
            </div>
            <div className="text-center mt-2 min-h-[20px]">
                <p className="text-sm text-gray-400">
                    Visualizing the 6 core geometries.
                </p>
            </div>
            <div className="mt-2 space-y-2">
                <TriangleGeometryGroup 
                    name="Qun - The Command"
                    direction="downward"
                    points={downwardPointsWithColor}
                    groupColor={TRIANGLE_POINTS[1].color}
                    rotation={rotation}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                    isLowResourceMode={isLowResourceMode}
                />
                <TriangleGeometryGroup 
                    name="FayaQun - Truth Returns"
                    direction="upward"
                    points={upwardPointsWithColor}
                    groupColor={TRIANGLE_POINTS[0].color}
                    rotation={rotation}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                    isLowResourceMode={isLowResourceMode}
                />
            </div>
        </div>
    );
};

export default ChapterGeometry;
