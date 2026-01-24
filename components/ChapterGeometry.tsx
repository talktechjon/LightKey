import React from 'react';
import { TRIANGLE_POINTS, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, CENTRAL_GEOMETRY_POINTS } from '../constants.ts';
import { TrianglePoint } from '../types.ts';
import { getSliceAtPoint, getChapterIcon } from '../utils.ts';
import VersePolygon from './VersePolygon.tsx';

interface ChapterGeometryProps {
    rotation: number;
    isLowResourceMode: boolean;
}

type PointWithColor = TrianglePoint & { color: string };

// A memoized, self-contained component for the triangle geometry groups.
const TriangleGeometryGroup = React.memo(({ points, name, direction, rotation, isLowResourceMode }: { points: PointWithColor[], name: string, direction: 'downward' | 'upward', rotation: number, isLowResourceMode: boolean }) => {
  const titleColor = direction === 'downward' ? 'text-fuchsia-300' : 'text-cyan-300';
  const titleSymbol = direction === 'downward' ? '▼' : '▲';
  
  return (
    <div>
      <h3 className={`font-semibold text-lg ${titleColor} mb-2`} style={{ textShadow: `0 0 5px currentColor`}}>
        {titleSymbol} {name}
      </h3>
      <div className="mt-1 flex justify-around items-start space-x-2">
        {points.map((point, i) => {
          const slice = getSliceAtPoint(point.value, rotation);
          const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
          const muqattatLetters = MUQATTAT_LETTERS.get(slice.id);
          const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
          const iconSrc = getChapterIcon(chapterInfo.revelationType);

          return (
            <div 
              key={i} 
              className="text-center w-1/3 flex flex-col items-center"
              aria-label={`${point.type}: Chapter ${slice.id}, ${chapterInfo.englishName}, ${slice.blockCount} verses.`}
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
              <div className="mt-1 leading-tight flex flex-col justify-center w-full">
                <p className="font-bold text-white text-[11px] lg:text-sm truncate w-full" title={point.type}>
                  {point.type}
                </p>
                <p className="text-gray-300 text-sm mt-0.5">
                  <span className={`font-bold ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}</span>:<span className="font-medium">{slice.blockCount}</span>
                </p>
                 <p className="text-gray-400 truncate w-full flex items-center justify-center gap-1 text-[11px]" title={chapterInfo.englishName}>
                    <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3 h-3" />
                    <span className="truncate">{chapterInfo.englishName}</span>
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

const ChapterGeometry: React.FC<ChapterGeometryProps> = ({ rotation, isLowResourceMode }) => {
    
    // Indices in CENTRAL_GEOMETRY_POINTS [1, 39, 77, 19, 95, 57]:
    // 0: Rahim(1), 1: Rahman(39), 2: Razim(77), 3: Photosynthesis(19), 4: Heaven(95), 5: Kingdom(57)

    // Side Panel Presentation Reordering (DNA Flow - INTERLEAVED):
    // Row 1 (Downward Group Layout): Rahim(D) -> Heaven(U) -> Razim(D)
    const dnaRow1: PointWithColor[] = [
        { ...TRIANGLE_POINTS[1].points[0], value: CENTRAL_GEOMETRY_POINTS[0], color: TRIANGLE_POINTS[1].color }, // Rahim (Pink)
        { ...TRIANGLE_POINTS[0].points[1], value: CENTRAL_GEOMETRY_POINTS[4], color: TRIANGLE_POINTS[0].color }, // Heaven (Cyan)
        { ...TRIANGLE_POINTS[1].points[2], value: CENTRAL_GEOMETRY_POINTS[2], color: TRIANGLE_POINTS[1].color }, // Razim (Pink)
    ];

    // Row 2 (Upward Group Layout): Kingdom(U) -> Rahman(D) -> Photosynthesis(U)
    const dnaRow2: PointWithColor[] = [
        { ...TRIANGLE_POINTS[0].points[0], value: CENTRAL_GEOMETRY_POINTS[5], color: TRIANGLE_POINTS[0].color }, // Kingdom (Cyan)
        { ...TRIANGLE_POINTS[1].points[1], value: CENTRAL_GEOMETRY_POINTS[1], color: TRIANGLE_POINTS[1].color }, // Rahman (Pink)
        { ...TRIANGLE_POINTS[0].points[2], value: CENTRAL_GEOMETRY_POINTS[3], color: TRIANGLE_POINTS[0].color }, // Photosynthesis (Cyan)
    ];
    
    const renderCombinedGeometry = () => {
        const NUM_LAYERS = 6;
        const corePolygonColors = [
            TRIANGLE_POINTS[1].color, // Downward
            TRIANGLE_POINTS[1].color,
            TRIANGLE_POINTS[1].color,
            TRIANGLE_POINTS[0].color, // Upward
            TRIANGLE_POINTS[0].color,
            TRIANGLE_POINTS[0].color,
        ];

        const maxPolyRadius = 32;
        const minPolyRadius = 12;
        const effectiveRadius = maxPolyRadius - minPolyRadius;
        const radiusStep = NUM_LAYERS > 1 ? effectiveRadius / (NUM_LAYERS - 1) : 0;

        return CENTRAL_GEOMETRY_POINTS.map((pointValue, i) => {
            const slice = getSliceAtPoint(pointValue, rotation);
            const layerRadius = maxPolyRadius - (i * radiusStep);
            const baseColor = corePolygonColors[i];

            return (
                <VersePolygon
                    key={`side-panel-core-layer-${i}`}
                    verseCount={slice.blockCount || 0}
                    radius={layerRadius}
                    color={baseColor}
                    center={{ x: 36, y: 36 }}
                    fillOpacity={0}
                    strokeOpacity={0.4 + i * 0.1}
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
                    Visualizing the DNA Flow.
                </p>
            </div>
            <div className="mt-4 space-y-8">
                <TriangleGeometryGroup 
                    name="Qun - The Command"
                    direction="downward"
                    points={dnaRow1}
                    rotation={rotation}
                    isLowResourceMode={isLowResourceMode}
                />
                <TriangleGeometryGroup 
                    name="FayaQun - Truth Returns"
                    direction="upward"
                    points={dnaRow2}
                    rotation={rotation}
                    isLowResourceMode={isLowResourceMode}
                />
            </div>
        </div>
    );
};

export default ChapterGeometry;