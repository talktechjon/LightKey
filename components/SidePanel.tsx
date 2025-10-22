import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SLICE_DATA, TRIANGLE_POINTS, TOTAL_SLICES, CHAPTER_DETAILS, ICON_DIAL_DATA, SECRET_EMOJI_PATTERN, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, TAFSIR_YOUTUBE_VIDEO_IDS, RECITATION_YOUTUBE_VIDEO_IDS, MAKKI_ICON_SVG, MADANI_ICON_SVG } from '../constants.ts';
import { SliceData, TrianglePoint } from '../types.ts';
import { getSliceAtPoint } from '../utils.ts';
import VersePolygon from './VersePolygon.tsx';

interface SidePanelProps {
  rotation: number;
  iconDialRotation: number;
  setRotation: (rotation: number | ((prev: number) => number)) => void;
  setIconDialRotation: (rotation: number | ((prev: number) => number)) => void;
  showTooltip: (e: React.MouseEvent, surah: number, verse: number, color: string) => void;
  hideTooltip: () => void;
  isSecretModeActive: boolean;
  secretEmojiShift: number;
}

type PlaylistType = 'tafsir' | 'recitation';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2L1.5 17h17L10 2zM10 14a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const WaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10c1.5-4.5 4.5-4.5 6 0 1.5 4.5 4.5 4.5 6 0" />
  </svg>
);

type PointWithColor = TrianglePoint & { color: string };

// A memoized, self-contained component for the triangle geometry groups.
const TriangleGeometryGroup = React.memo(({ points, groupColor, name, direction, rotation, showTooltip, hideTooltip }: { points: PointWithColor[], groupColor: string, name: string, direction: 'downward' | 'upward', rotation: number, showTooltip: SidePanelProps['showTooltip'], hideTooltip: SidePanelProps['hideTooltip'] }) => {
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


const SidePanel: React.FC<SidePanelProps> = ({ rotation, iconDialRotation, setRotation, setIconDialRotation, showTooltip, hideTooltip, isSecretModeActive, secretEmojiShift }) => {
  const [customSequence, setCustomSequence] = useState('');
  const [animationMode, setAnimationMode] = useState<'play' | 'step' | 'off'>('off');
  const [animationIndex, setAnimationIndex] = useState(0);

  const animationFrameId = useRef<number | null>(null);
  const animationTimeoutId = useRef<number | null>(null);
  const rotationRef = useRef(rotation);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);
  
  const handleStep = useCallback((direction: 'forward' | 'backward') => {
      if (!customSequence.trim()) return;

      setAnimationMode('step');
      if (direction === 'forward') {
          setAnimationIndex(prev => prev + 1);
      } else {
          setAnimationIndex(prev => Math.max(0, prev - 1));
      }
  }, [customSequence]);

  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if (document.activeElement?.tagName === 'INPUT') return;

          if (event.key.toLowerCase() === 'q') {
              event.preventDefault();
              handleStep('backward');
          } else if (event.key.toLowerCase() === 'e') {
              event.preventDefault();
              handleStep('forward');
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStep]);


  useEffect(() => {
    const cleanup = () => {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (animationTimeoutId.current) clearTimeout(animationTimeoutId.current);
    };

    if (animationMode === 'off') {
        cleanup();
        return;
    }

    const sequence = (customSequence.match(/\d+/g) || [])
        .map(s => parseInt(s, 10))
        .filter(n => !isNaN(n) && n >= 1 && n <= TOTAL_SLICES);

    if (sequence.length === 0) {
        setAnimationMode('off');
        return;
    }
    
    let targetIndex = animationIndex;
    if (animationMode === 'play') {
      targetIndex = animationIndex % sequence.length;
    }

    if (targetIndex >= sequence.length || targetIndex < 0) {
        setAnimationMode('off');
        return;
    }

    const currentTargetSliceId = sequence[targetIndex];
    const sliceAngle = 360 / TOTAL_SLICES;
    const targetRotation = -(currentTargetSliceId - 1) * sliceAngle;

    const startRotation = rotationRef.current;
    
    const startSliceId = getSliceAtPoint(1, startRotation).id;
    const distance = Math.abs(currentTargetSliceId - startSliceId);
    const wrappedDistance = Math.min(distance, TOTAL_SLICES - distance);
    
    const BASE_DURATION = 500;
    const DURATION_PER_SLICE = 25;
    const DURATION = BASE_DURATION + wrappedDistance * DURATION_PER_SLICE;
    const PAUSE_DURATION = 700;

    let startTime: number | null = null;
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let rotationDiff = targetRotation - startRotation;
    if (rotationDiff > 180) {
        rotationDiff -= 360;
    } else if (rotationDiff < -180) {
        rotationDiff += 360;
    }

    const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const easedProgress = easeInOutCubic(progress);

        const newRotation = startRotation + rotationDiff * easedProgress;
        setRotation(newRotation);

        if (progress < 1) {
            animationFrameId.current = requestAnimationFrame(animate);
        } else {
            setRotation(targetRotation);
            if (animationMode === 'play') {
                animationTimeoutId.current = window.setTimeout(() => {
                    setAnimationIndex(prev => prev + 1);
                }, PAUSE_DURATION);
            } else if (animationMode === 'step') {
                setAnimationMode('off');
            }
        }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return cleanup;
  }, [animationMode, animationIndex, customSequence, setRotation]);


  const handleAnimationToggle = () => {
    if (animationMode === 'play') {
      setAnimationMode('off');
    } else {
      setAnimationIndex(0);
      setAnimationMode('play');
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationMode('off');
    const sliceId = Number(event.target.value);
    const sliceAngle = 360 / TOTAL_SLICES;
    const newRotation = -(sliceId - 1) * sliceAngle;
    setRotation(newRotation);
  };
  
  const currentSliceData = getSliceAtPoint(1, rotation);
  const currentSliceId = currentSliceData.id;
  const chapterInfo = CHAPTER_DETAILS[currentSliceId - 1];
  const isCurrentSliceMuqattat = MUQATTAT_CHAPTERS.has(currentSliceId);
  const muqattatLetters = MUQATTAT_LETTERS.get(currentSliceId);
  const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;

  const createPlaylist = (type: PlaylistType, chapterIds: number[]) => {
    const videoSource = type === 'recitation' ? RECITATION_YOUTUBE_VIDEO_IDS : TAFSIR_YOUTUBE_VIDEO_IDS;
    
    const videoIds = chapterIds
      .map(id => videoSource[id - 1])
      .filter(id => id);

    if (videoIds.length > 0) {
      const url = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleWatchSequence = (type: PlaylistType) => {
    const orderedPoints = [
      TRIANGLE_POINTS[1].points[0], // ▼ Downward 3- Wave
      TRIANGLE_POINTS[0].points[1], // ▲ Upward 6- Purify
      TRIANGLE_POINTS[1].points[2], // ▼ Downward 9 Vibration
      TRIANGLE_POINTS[0].points[0], // ▲ Upward 3- Repent
      TRIANGLE_POINTS[1].points[1], // ▼ Downward 6- Particle
      TRIANGLE_POINTS[0].points[2], // ▲ Upward 9- Energy
    ];
    const chapterIds = orderedPoints.map(point => getSliceAtPoint(point.value, rotation).id);
    createPlaylist(type, chapterIds);
  };

  const handleWatchCustomSequence = (type: PlaylistType) => {
    const chapterIds = (customSequence.match(/\d+/g) || [])
      .map(s => parseInt(s, 10))
      .filter(n => !isNaN(n) && n >= 1 && n <= TOTAL_SLICES);
    createPlaylist(type, chapterIds);
  };

  const handleWatchEmojiSequence = (type: PlaylistType) => {
    const clockwiseChapterPoints = [1, 19, 39, 57, 77, 95];
    const relativeRotation = rotation - iconDialRotation;
    const chapterIds = clockwiseChapterPoints.map(pointValue => {
        return getSliceAtPoint(pointValue, relativeRotation).id;
    });
    createPlaylist(type, chapterIds);
  };
  
  const handleWatchSecretSequence = (type: PlaylistType) => {
    const chapterIds = SECRET_EMOJI_PATTERN.map(marker => {
        return getSliceAtPoint(marker.chapter, rotation).id;
    });
    createPlaylist(type, chapterIds);
  };

  const handleLoadSecretSequence = () => {
    setAnimationMode('off');
    const chapterIds = SECRET_EMOJI_PATTERN.map(marker => {
        const slice = getSliceAtPoint(marker.chapter, rotation);
        return slice.id;
    });
    setCustomSequence(chapterIds.join(', '));
  };


  const PRESET_SEQUENCES: Record<string, string> = {
    '1': '1, 10',
    '2': '2, 20, 11',
    '3': '3, 30, 12, 21',
    '4': '4, 40, 13, 31, 22',
    '5': '5, 50, 14, 41, 23, 32',
    '6': '6, 60, 15, 51, 24, 42, 33',
    '7': '7, 70, 16, 61, 25, 52, 34, 43',
    '8': '8, 80, 17, 71, 26, 62, 35, 53, 44',
    '9': '9, 90, 18, 81, 27, 72, 36, 63, 45, 54',
    '∞': '111, 103, 108, 110, 65, 70, 72, 27, 32, 34, 47, 52, 54, 9, 14, 16, 85, 90, 92, 112, 113, 114, 1',
  };

  const handlePresetClick = (preset: string) => {
      setAnimationMode('off');
      setAnimationIndex(0);

      if (preset === '0') {
          setCustomSequence('');
      } else {
          setCustomSequence(PRESET_SEQUENCES[preset] || '');
      }
  };

  const downwardMarkersData = ICON_DIAL_DATA.slice(0, 3);
  const upwardMarkersData = ICON_DIAL_DATA.slice(3, 6);

  // This is the order for the central visualization, from outer to inner
  const centralGeometryPoints = [
      TRIANGLE_POINTS[0].points[2].value, // ▲ Upward 9- Energy
      TRIANGLE_POINTS[1].points[1].value, // ▼ Downward 6- Particle
      TRIANGLE_POINTS[0].points[0].value, // ▲ Upward 3- Repent
      TRIANGLE_POINTS[1].points[2].value, // ▼ Downward 9 Vibration
      TRIANGLE_POINTS[0].points[1].value, // ▲ Upward 6- Purify
      TRIANGLE_POINTS[1].points[0].value, // ▼ Downward 3- Wave
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
        TRIANGLE_POINTS[0].color, // Energy
        TRIANGLE_POINTS[1].color, // Particle
        TRIANGLE_POINTS[0].color, // Repent
        TRIANGLE_POINTS[1].color, // Vibration
        TRIANGLE_POINTS[0].color, // Purify
        TRIANGLE_POINTS[1].color, // Wave
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
            />
        );
    });
  };

  return (
    <aside className="w-full lg:w-96 bg-black/30 backdrop-blur-sm p-6 border-t lg:border-l lg:border-t-0 border-gray-700/50 flex flex-col space-y-4 overflow-y-auto">
      <div>
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-cyan-300 tracking-wider">▼🕋▲</h2>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleWatchSequence('tafsir')}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded-md transition-colors duration-200"
                    aria-label="Watch tafsir sequence on YouTube (Seer)"
                    title="Watch Tafsir Playlist (Seer)"
                >
                    <EyeIcon />
                </button>
                <button
                    onClick={() => handleWatchSequence('recitation')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-md transition-colors duration-200"
                    aria-label="Watch recitation sequence on YouTube (Hear)"
                    title="Watch Recitation Playlist (Hear)"
                >
                    <WaveIcon />
                </button>
            </div>
        </div>
        <div className="w-full h-px bg-cyan-300/50 mt-2"></div>
      </div>

      <div className="space-y-4">
          <div className="lg:static sticky top-0 z-10 bg-black/30 backdrop-blur-sm pt-1 pb-4 lg:bg-transparent lg:backdrop-blur-none lg:p-0">
            <div className="flex justify-between items-start min-h-[80px]">
              <label htmlFor="rotation-slider" className="font-semibold text-gray-200 pr-2">
                  <div className="flex items-baseline gap-x-2">
                      <img src={iconSrc} alt={chapterInfo.revelationType} title={chapterInfo.revelationType} className="w-5 h-5" />
                      <span className={`text-lg text-cyan-300 ${isCurrentSliceMuqattat ? 'muqattat-glow' : ''}`}>
                          {chapterInfo.number}. {chapterInfo.englishName}
                      </span>
                      {muqattatLetters && (
                          <span 
                              className={`font-mono text-xl ${isCurrentSliceMuqattat ? 'muqattat-glow' : 'text-white'}`}
                              dir="rtl"
                          >
                              {muqattatLetters.join(' · ')}
                          </span>
                      )}
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <span className="text-base font-normal italic text-gray-400">
                        ({chapterInfo.transliteration})
                    </span>
                  </div>
              </label>
              <button
                onClick={() => {
                    setRotation(0);
                }}
                className="bg-gray-600 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200 flex-shrink-0 mt-1"
                aria-label="Reset rotation"
              >
                Reset
              </button>
            </div>
            <input
                id="rotation-slider"
                type="range"
                min="1"
                max={TOTAL_SLICES}
                step="1"
                value={currentSliceId}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-3"
            />
          </div>
          
          {/* Custom Animation Section */}
          <div className="pt-2">
            <label htmlFor="custom-sequence" className="font-semibold text-gray-200 text-sm">
                Custom Animation Sequence (Q/E to step)
            </label>
            <div className="flex items-center space-x-2 mt-2">
                <input
                    id="custom-sequence"
                    type="text"
                    value={customSequence}
                    onChange={(e) => {
                        setCustomSequence(e.target.value);
                        setAnimationMode('off');
                        setAnimationIndex(0);
                    }}
                    placeholder="e.g., 23, 114, 1, 77"
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                    disabled={animationMode !== 'off'}
                />
                <button
                    onClick={handleAnimationToggle}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    aria-label={animationMode === 'play' ? 'Pause animation' : 'Play animation'}
                    disabled={!customSequence.trim()}
                >
                  {animationMode === 'play' ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                  )}
                </button>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => handleWatchCustomSequence('tafsir')}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold p-2 rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        aria-label="Watch custom tafsir sequence on YouTube (Seer)"
                        title="Watch Tafsir Playlist (Seer)"
                        disabled={!customSequence.trim()}
                    >
                        <EyeIcon />
                    </button>
                    <button
                        onClick={() => handleWatchCustomSequence('recitation')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2 rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        aria-label="Watch custom recitation sequence on YouTube (Hear)"
                        title="Watch Recitation Playlist (Hear)"
                        disabled={!customSequence.trim()}
                    >
                        <WaveIcon />
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between mt-2.5 space-x-1">
              {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '∞'].map((preset) => (
                  <button
                      key={preset}
                      onClick={() => handlePresetClick(preset)}
                      className="flex-1 text-xs font-mono py-1 px-2 bg-gray-700/50 hover:bg-cyan-700/50 text-gray-300 hover:text-white rounded-md transition-colors duration-150 flex items-center justify-center"
                      title={
                        preset === '0' ? 'Reset sequence' : 
                        preset === '∞' ? 'Load infinite loop sequence' : 
                        `Load preset sequence ${preset}`
                      }
                      aria-label={
                        preset === '0' ? 'Reset custom animation sequence' : 
                        preset === '∞' ? 'Load infinite loop animation sequence' : 
                        `Load preset animation sequence ${preset}`
                      }
                  >
                      {preset === '∞' ? <span className="text-lg leading-none">∞</span> : preset}
                  </button>
              ))}
            </div>
          </div>


          {/* Geometries and Markers Section */}
          <div className="pt-4 space-y-6">
             {/* CHAPTER GEOMETRY Section */}
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
                    />
                    <TriangleGeometryGroup 
                        name="FayaQun - Truth Returns"
                        direction="upward"
                        points={upwardPointsWithColor}
                        groupColor={TRIANGLE_POINTS[0].color}
                        rotation={rotation}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                    />
                </div>
             </div>

             {/* MARKER ALIGNMENT Section */}
             <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-200 tracking-wider">
                        {isSecretModeActive ? 'SECRET PATTERN' : 'MARKER ALIGNMENT'}
                    </h2>
                    {isSecretModeActive ? (
                        <div className="flex items-center space-x-2">
                             <button
                                onClick={handleLoadSecretSequence}
                                className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0"
                                aria-label="Load secret pattern into custom sequence"
                                title="Load secret pattern into custom sequence"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19-4v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                            </button>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => handleWatchSecretSequence('tafsir')}
                                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold p-2 rounded-md transition-colors duration-200"
                                    aria-label="Watch secret tafsir sequence on YouTube (Seer)"
                                    title="Watch Tafsir Playlist (Seer)"
                                >
                                    <EyeIcon />
                                </button>
                                <button
                                    onClick={() => handleWatchSecretSequence('recitation')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2 rounded-md transition-colors duration-200"
                                    aria-label="Watch secret recitation sequence on YouTube (Hear)"
                                    title="Watch Recitation Playlist (Hear)"
                                >
                                    <WaveIcon />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIconDialRotation(0)}
                                className="bg-gray-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0"
                                aria-label="Reset marker alignment"
                                title="Reset marker alignment"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => handleWatchEmojiSequence('tafsir')}
                                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold p-2 rounded-md transition-colors duration-200"
                                    aria-label="Watch emoji marker tafsir sequence on YouTube (Seer)"
                                    title="Watch Tafsir Playlist (Seer)"
                                >
                                    <EyeIcon />
                                </button>
                                <button
                                    onClick={() => handleWatchEmojiSequence('recitation')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2 rounded-md transition-colors duration-200"
                                    aria-label="Watch emoji marker recitation sequence on YouTube (Hear)"
                                    title="Watch Recitation Playlist (Hear)"
                                >
                                    <WaveIcon />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full h-px bg-gray-500/50 mt-2"></div>

                {isSecretModeActive ? (
                  <div className="text-sm text-gray-400 mt-3 space-y-2" aria-label="Secret pattern markers">
                    {SECRET_EMOJI_PATTERN.map((marker, index) => {
                       const patternSize = SECRET_EMOJI_PATTERN.length;
                       const shiftedIndex = (index - secretEmojiShift + patternSize) % patternSize;
                       const emojiData = SECRET_EMOJI_PATTERN[shiftedIndex];
                       
                       const slice = getSliceAtPoint(marker.chapter, rotation);
                       const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                       const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                       const muqattatLetters = MUQATTAT_LETTERS.get(slice.id);
                       const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
                       
                       return (
                         <div key={marker.id} className="flex items-center gap-x-3 overflow-hidden">
                            <span className="text-lg w-6 text-center">{emojiData.emoji}</span>
                            <div className="flex items-baseline gap-x-3 min-w-0">
                               <span className="truncate flex items-center gap-1.5" title={`${slice.id}: ${chapterInfo.englishName}`}>
                                   <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                   <span className={`font-semibold text-gray-300 ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}:</span> {chapterInfo.englishName}
                               </span>
                               {muqattatLetters && (
                                   <span 
                                       className="font-mono text-lg muqattat-glow flex-shrink-0"
                                       dir="rtl"
                                   >
                                       {muqattatLetters.join(' ⊙ ')}
                                   </span>
                               )}
                            </div>
                         </div>
                       );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 mt-3 grid grid-cols-2 gap-x-6" aria-label="Special chapter markers">
                      {/* Column 1: Downward Triangle Markers */}
                      <div className="space-y-2">
                          {downwardMarkersData.map((marker) => {
                              const relativeRotation = rotation - iconDialRotation;
                              const slice = getSliceAtPoint(marker.chapter, relativeRotation);
                              const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                              const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                              const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
                              return (
                                  <div key={`down-${marker.id}`} className="flex items-center gap-x-2 overflow-hidden">
                                      <span className="text-base">{marker.emoji}</span>
                                      <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                      <span className="truncate" title={`${slice.id}: ${chapterInfo.englishName}`}>
                                          <span className={`font-semibold text-gray-300 ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}:</span> {chapterInfo.englishName}
                                      </span>
                                  </div>
                              );
                          })}
                      </div>

                      {/* Column 2: Upward Triangle Markers */}
                      <div className="space-y-2">
                          {upwardMarkersData.map((marker) => {
                              const relativeRotation = rotation - iconDialRotation;
                              const slice = getSliceAtPoint(marker.chapter, relativeRotation);
                              const chapterInfo = CHAPTER_DETAILS[slice.id - 1];
                              const isMuqattat = MUQATTAT_CHAPTERS.has(slice.id);
                              const iconSrc = chapterInfo.revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
                              return (
                                  <div key={`up-${marker.id}`} className="flex items-center gap-x-2 overflow-hidden">
                                      <span className="text-base">{marker.emoji}</span>
                                       <img src={iconSrc} alt={chapterInfo.revelationType} className="w-3.5 h-3.5 flex-shrink-0" />
                                      <span className="truncate" title={`${slice.id}: ${chapterInfo.englishName}`}>
                                          <span className={`font-semibold text-gray-300 ${isMuqattat ? 'muqattat-glow' : ''}`}>{slice.id}:</span> {chapterInfo.englishName}
                                      </span>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
                )}
             </div>
          </div>
      </div>
    </aside>
  );
};

export default SidePanel;