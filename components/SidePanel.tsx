
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { TOTAL_SLICES, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS } from '../constants.ts';
import { TAFSIR_YOUTUBE_VIDEO_IDS, RECITATION_YOUTUBE_VIDEO_IDS, ENGLISH_RECITATION_YOUTUBE_VIDEO_IDS } from '../youtubeData.ts';
import { getSliceAtPoint, getChapterIcon } from '../utils.ts';
import { PlaylistType } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';
import { RotateCcwIcon } from './Icons.tsx';
import CustomAnimationControls from './CustomAnimationControls.tsx';
import ChapterGeometry from './ChapterGeometry.tsx';
import MarkerAlignment from './MarkerAlignment.tsx';
import { KatharaClockAlignment, SephirotAlignment } from './SecretPatternAnimation.tsx';
import { TreeOfVerse } from './TreeOfVerse.tsx';
import { PieceOfBakara } from './PieceOfBakara.tsx';

interface SidePanelProps {
  rotation: number;
  iconDialRotation: number;
  setRotation: (rotation: number | ((prev: number) => number)) => void;
  setIconDialRotation: (rotation: number | ((prev: number) => number)) => void;
  showFunctionalTooltip: (e: React.MouseEvent, message: string, chapterId: number, color: string) => void;
  hideTooltip: () => void;
  isSecretModeActive: boolean;
  isTreeOfVerseActive: boolean;
  isPieceOfBakaraActive: boolean;
  secretEmojiShift: number;
  isLowResourceMode: boolean;
  onVerseSelect: (surah: number, ayah: number) => void;
  onBulkExport: (verseIds: string[]) => void;
  bakaraSpineIndex: number;
  setBakaraSpineIndex: (index: number) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ rotation, iconDialRotation, setRotation, setIconDialRotation, showFunctionalTooltip, hideTooltip, isSecretModeActive, isTreeOfVerseActive, isPieceOfBakaraActive, secretEmojiShift, isLowResourceMode, onVerseSelect, onBulkExport, bakaraSpineIndex, setBakaraSpineIndex }) => {
  const [customSequence, setCustomSequence] = useState('');
  const [animationMode, setAnimationMode] = useState<'play' | 'step' | 'off'>('off');
  const [animationIndex, setAnimationIndex] = useState(0);
  const [sephirotTab, setSephirotTab] = useState<'zakkum' | 'datePalm'>('datePalm');

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

  const animationSequence = useMemo(() => {
    return (customSequence.match(/\d+/g) || [])
        .map(s => parseInt(s, 10))
        .filter(n => !isNaN(n) && n >= 1 && n <= TOTAL_SLICES);
  }, [customSequence]);


  useEffect(() => {
    const cleanup = () => {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (animationTimeoutId.current) clearTimeout(animationTimeoutId.current);
    };

    if (animationMode === 'off') {
        cleanup();
        return;
    }

    const sequence = animationSequence;

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
  }, [animationMode, animationIndex, animationSequence, setRotation]);


  const createPlaylist = (type: PlaylistType, chapterIds: number[]) => {
    const videoSource = 
        type === 'recitation' ? RECITATION_YOUTUBE_VIDEO_IDS : 
        type === 'tafsir' ? TAFSIR_YOUTUBE_VIDEO_IDS :
        ENGLISH_RECITATION_YOUTUBE_VIDEO_IDS;
    
    const videoIds = chapterIds
      .map(id => videoSource[id - 1])
      .filter(id => id);

    if (videoIds.length > 0) {
      const url = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("Videos for this playlist are currently unavailable.");
    }
  };
  
  const handleWatchSequence = (type: PlaylistType) => {
    // Mirroring Order: Download (Slave, Queen, Righteous) -> Return (Book, Mountain, Boat)
    const helixSequence = [1, 39, 77, 19, 95, 57];
    const chapterIds = helixSequence.map(pointValue => getSliceAtPoint(pointValue, rotation).id);
    createPlaylist(type, chapterIds);
  };
  
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationMode('off');
    const val = Number(event.target.value);
    
    if (isPieceOfBakaraActive) {
      setBakaraSpineIndex(val);
    } else {
      const sliceAngle = 360 / TOTAL_SLICES;
      const newRotation = -(val - 1) * sliceAngle;
      setRotation(newRotation);
    }
  };
  
  const currentSliceData = getSliceAtPoint(1, rotation);
  const currentSliceId = currentSliceData.id;
  // Safer lookup to avoid crash if CHAPTER_DETAILS array is inconsistent
  const chapterInfo = CHAPTER_DETAILS.find(c => c.number === currentSliceId);

  if (!chapterInfo) return <aside className="w-full lg:w-96 bg-black/30 lg:backdrop-blur-sm p-6 border-t lg:border-l lg:border-t-0 border-gray-700/50 flex flex-col space-y-4">Loading...</aside>;

  const isCurrentSliceMuqattat = MUQATTAT_CHAPTERS.has(currentSliceId);
  const iconSrc = getChapterIcon(chapterInfo.revelationType);
  const currentMuqattatLetters = MUQATTAT_LETTERS.get(currentSliceId);

  const isAnalyticalMode = isTreeOfVerseActive || isPieceOfBakaraActive;

  return (
    <aside 
        id="side-panel-scroll-container"
        className="w-full lg:w-96 bg-black/30 lg:backdrop-blur-sm p-6 border-t lg:border-l lg:border-t-0 border-gray-700/50 flex flex-col space-y-4 lg:overflow-y-auto scroll-smooth no-scrollbar"
    >
      {/* Sticky identification and playlist header - Hidden in Piece of Heifer and Tree of Verse modes */}
      {!isAnalyticalMode && (
          <div className="sticky top-4 z-50 bg-black/80 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-2xl shadow-cyan-900/20 transition-all duration-300 p-4 mb-6">
              {/* Top Navigation Row */}
              <div className="flex justify-between items-center mb-3">
                  {/* Chapter Identification Info */}
                  <div className="flex flex-col pr-1 flex-1 justify-center leading-tight">
                      <div className="flex items-center gap-x-1.5 w-full">
                          <img src={iconSrc} alt={chapterInfo.revelationType} title={chapterInfo.revelationType} className="w-3.5 h-3.5 drop-shadow shrink-0" />
                          <span className={`text-[15px] font-bold text-cyan-300 drop-shadow-sm leading-snug whitespace-break-spaces ${isCurrentSliceMuqattat ? 'muqattat-glow' : ''}`}>
                              {chapterInfo.number}. {chapterInfo.englishName}
                          </span>
                      </div>
                      <div className="flex gap-x-2 items-center mt-0.5 w-full">
                          <span className="text-[10px] font-normal italic text-gray-400 shrink-0">
                              ({chapterInfo.transliteration})
                          </span>
                          {currentMuqattatLetters && (
                              <span className="text-xs font-semibold muqattat-glow text-white tracking-widest pl-2 border-l border-gray-700/60" dir="rtl">
                                  {currentMuqattatLetters.join(' ')}
                              </span>
                          )}
                      </div>
                  </div>

                  {/* Top Right Action Buttons grouped natively */}
                  <div className="flex items-center space-x-1 shrink-0 ml-2">
                      <PlaylistButtons onWatch={handleWatchSequence} />
                      <button
                          onClick={() => setRotation(0)}
                          className="bg-slate-700/80 hover:bg-slate-600 border border-slate-600/50 hover:border-slate-400 text-white font-bold rounded-md transition-colors duration-200 shadow-md backdrop-blur-md flex items-center justify-center h-[26px] w-[26px] [&>svg]:w-3.5 [&>svg]:h-3.5"
                          aria-label="Reset rotation"
                          title="Reset to Al-Fatiha"
                      >
                          <RotateCcwIcon />
                      </button>
                  </div>
              </div>
              
              <div className="w-full h-px bg-cyan-500/30 mb-4"></div>

              {/* Global Chapter Slider */}
              <input
                  id="rotation-slider"
                  type="range"
                  min="1"
                  max={TOTAL_SLICES}
                  step="1"
                  value={currentSliceId}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-900 border border-gray-700 rounded-lg appearance-none cursor-pointer mt-4 shadow-inner"
              />
              <style>{`
                  #rotation-slider::-webkit-slider-thumb {
                      appearance: none;
                      width: 14px;
                      height: 14px;
                      border-radius: 50%;
                      background: #22d3ee;
                      cursor: pointer;
                      box-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
                  }
                  #rotation-slider::-moz-range-thumb {
                      width: 14px;
                      height: 14px;
                      border-radius: 50%;
                      background: #22d3ee;
                      cursor: pointer;
                      border: none;
                      box-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
                  }
              `}</style>
          </div>
      )}

      {/* Non-sticky analytical components section */}
      <div className={!isAnalyticalMode ? "space-y-6 pt-2" : ""}>
         
         {!isAnalyticalMode && (
            <div className="mb-6">
                <CustomAnimationControls 
                   customSequence={customSequence}
                   setCustomSequence={setCustomSequence}
                   animationMode={animationMode}
                   setAnimationMode={setAnimationMode}
                   setAnimationIndex={setAnimationIndex}
                   createPlaylist={createPlaylist}
                />
            </div>
         )}

         {isTreeOfVerseActive ? (
            <TreeOfVerse 
                rotation={rotation} 
                onVerseSelect={onVerseSelect}
                onBulkExport={onBulkExport}
            />
         ) : isPieceOfBakaraActive ? (
            <PieceOfBakara 
                onVerseSelect={onVerseSelect}
                onBulkExport={onBulkExport}
                bakaraSpineIndex={bakaraSpineIndex}
                setBakaraSpineIndex={setBakaraSpineIndex}
            />
         ) : (
            <>
                <ChapterGeometry 
                    rotation={rotation}
                    isLowResourceMode={isLowResourceMode}
                    showFunctionalTooltip={showFunctionalTooltip}
                    hideTooltip={hideTooltip}
                />

                <MarkerAlignment 
                    isSecretModeActive={isSecretModeActive}
                    rotation={rotation}
                    iconDialRotation={iconDialRotation}
                    setIconDialRotation={setIconDialRotation}
                    secretEmojiShift={secretEmojiShift}
                    setCustomSequence={setCustomSequence}
                    setAnimationMode={setAnimationMode}
                    createPlaylist={createPlaylist}
                />
                {isSecretModeActive && (
                    <>
                        <KatharaClockAlignment
                            rotation={rotation}
                            createPlaylist={createPlaylist}
                            setCustomSequence={setCustomSequence}
                            setAnimationMode={setAnimationMode}
                        />
                        <SephirotAlignment
                            rotation={rotation}
                            createPlaylist={createPlaylist}
                            setCustomSequence={setCustomSequence}
                            setAnimationMode={setAnimationMode}
                            activeTab={sephirotTab}
                            onTabChange={setSephirotTab}
                        />
                    </>
                )}
            </>
         )}
      </div>
    </aside>
  );
};

export default SidePanel;
