import React from 'react';
import { TRIANGLE_POINTS, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, CENTRAL_GEOMETRY_POINTS } from '../constants.ts';
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
    if (type.includes('Stone')) return `Cubic Overflow Phase (10): ${chapterName}`;
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

const ChapterGeometry: React.FC<ChapterGeometryProps> = ({ rotation, isLowResourceMode, showFunctionalTooltip, hideTooltip }) => {
    
    // Side Panel Presentation Reordering (DNA Flow - INTERLEAVED):
    // Row 1 (Interleaved Layout): Slave(D 1) -> Stone(U 95) -> Righteous(D 77)
    const dnaRow1: PointWithColor[] = [
        { ...TRIANGLE_POINTS[1].points[0], value: CENTRAL_GEOMETRY_POINTS[0], color: TRIANGLE_POINTS[1].color }, // Slave (Cyan)
        { ...TRIANGLE_POINTS[0].points[1], value: CENTRAL_GEOMETRY_POINTS[1], color: TRIANGLE_POINTS[0].color }, // Stone (Pink)
        { ...TRIANGLE_POINTS[1].points[2], value: CENTRAL_GEOMETRY_POINTS[2], color: TRIANGLE_POINTS[1].color }, // Righteous (Cyan)
    ];

    // Row 2 (Interleaved Layout): Boat(U 57) -> Queen(D 39) -> Book(U 19)
    const dnaRow2: PointWithColor[] = [
        { ...TRIANGLE_POINTS[0].points[0], value: CENTRAL_GEOMETRY_POINTS[3], color: TRIANGLE_POINTS[0].color }, // Boat (Pink)
        { ...TRIANGLE_POINTS[1].points[1], value: CENTRAL_GEOMETRY_POINTS[4], color: TRIANGLE_POINTS[1].color }, // Queen (Cyan)
        { ...TRIANGLE_POINTS[0].points[2], value: CENTRAL_GEOMETRY_POINTS[5], color: TRIANGLE_POINTS[0].color }, // Book (Pink)
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
                <h2 className="text-lg font-bold text-gray-200 tracking-widest uppercase">
                    Umm al-Kitab <br className="lg:hidden" /><span className="text-gray-400 font-medium text-xs capitalize tracking-normal lg:ml-2">The Mother Equation</span>
                </h2>
            </div>
            <div className="w-full h-px bg-gray-500/50 mt-2 mb-4"></div>
            <div className="flex items-center justify-center relative">
                <svg width={72} height={72} viewBox="0 0 72 72">
                    {renderCombinedGeometry()}
                </svg>
            </div>
            <div className="text-center mt-3 mb-6">
                <div className="font-mono flex flex-col items-center">
                    <div className="text-[11px] text-gray-500 mb-3 font-bold tracking-tight opacity-80 uppercase bg-gray-900/40 px-3 py-1 rounded-full border border-gray-800/50">
                        f(x) = ax³ [110] + bx² [108] + cx [103] + d [19= 10+9]
                    </div>
                    <div className="flex items-baseline gap-x-2">
                        <span className="text-gray-400 italic text-xs">f(x) =</span>
                        <div className="grid grid-cols-4 gap-x-2 sm:gap-x-4 text-center">
                            <span className="text-red-400 font-bold text-[10px] sm:text-[12px] whitespace-nowrap">ax³ [110]</span>
                            <span className="text-teal-400 font-bold text-[10px] sm:text-[12px] whitespace-nowrap">bx² [108]</span>
                            <span className="text-amber-400 font-bold text-[10px] sm:text-[12px] whitespace-nowrap">cx [103]</span>
                            <span className="text-cyan-400 font-bold text-[10px] sm:text-[11px] whitespace-nowrap">d [19=10+9]</span>

                            <span className="text-red-500 text-[8px] sm:text-[9px] uppercase tracking-tighter font-bold border-t border-gray-800/80 pt-1 mt-1 leading-tight">[Stone]</span>
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
            </div>
        </div>
    );
};

export default ChapterGeometry;