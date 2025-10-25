import React, { useState, useRef, useCallback, useDeferredValue, useEffect } from 'react';
import Visualization from './components/Visualization.tsx';
import SidePanel from './components/SidePanel.tsx';
import FooterMarquee from './components/FooterMarquee.tsx';
import Tooltip from './components/Tooltip.tsx';
import StarryBackground from './components/StarryBackground.tsx';
import VerseFinder from './components/VerseFinder.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';
import { VisualizationHandle, TooltipContent, VerseTooltipContent, ChapterTooltipContent, VerseFinderContent } from './types.ts';
import { TOTAL_SLICES, SLICE_DATA, SECRET_EMOJI_PATTERN, CHAPTER_DETAILS, MUQATTAT_LETTERS } from './constants.ts';
import { getVerse, getFullSurah } from './data/verseData.ts';

type LocalTranslationData = Record<string, string[]> | null;

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [iconDialRotation, setIconDialRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const vizRef = useRef<VisualizationHandle>(null);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isSecretModeActive, setIsSecretModeActive] = useState(false);
  const [secretEmojiShift, setSecretEmojiShift] = useState(0);
  const [isVerseFinderVisible, setIsVerseFinderVisible] = useState(false);
  const [verseFinderContent, setVerseFinderContent] = useState<VerseFinderContent>({ type: 'empty' });

  // --- Translation Settings State ---
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [translationMode, setTranslationMode] = useState<'online' | 'local'>('online');
  const [localTranslationData, setLocalTranslationData] = useState<LocalTranslationData>(null);
  const [localFileName, setLocalFileName] = useState<string | null>(null);

  // --- Idle Animation State ---
  const [isIdleAnimationEnabled, setIsIdleAnimationEnabled] = useState(true);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const idleIntervalRef = useRef<number | null>(null);
  const idleStartPositionRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Refs to hold the latest state for stable callbacks
  const isIdleRef = useRef(isIdle);
  useEffect(() => { isIdleRef.current = isIdle; }, [isIdle]);
  const rotationRef = useRef(rotation);
  useEffect(() => { rotationRef.current = rotation; }, [rotation]);
  // --- End Idle Animation State ---

  // Defer updates to the most expensive, off-screen component (Footer)
  const deferredRotation = useDeferredValue(rotation);
  
  const animateRotation = useCallback((start: number, end: number, duration: number, onComplete?: () => void) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    let startTime: number | null = null;
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      const newRotation = start + (end - start) * easedProgress;
      setRotation(newRotation);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(step);
      } else {
        setRotation(end); 
        if (onComplete) onComplete();
      }
    };
    animationFrameId.current = requestAnimationFrame(step);
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (!isIdleAnimationEnabled) return; // Feature is disabled globally.

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = null;
    }

    if (isIdleRef.current) {
      setIsIdle(false);
      if (idleStartPositionRef.current !== null) {
        const startRotation = rotationRef.current;
        const targetRotation = idleStartPositionRef.current;
        
        let diff = (targetRotation % 360) - (startRotation % 360);
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        
        const endRotation = startRotation + diff;
        animateRotation(startRotation, endRotation, 1500);
      }
    }

    idleTimerRef.current = window.setTimeout(() => {
      if (!isIdleAnimationEnabled) return; // Double-check before starting
      idleStartPositionRef.current = rotationRef.current;
      setIsIdle(true);
    }, 15000);
  }, [animateRotation, isIdleAnimationEnabled]);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    const stableHandler = () => resetIdleTimer();
    
    if (isIdleAnimationEnabled) {
      events.forEach(event => window.addEventListener(event, stableHandler, { passive: true }));
      resetIdleTimer();
    }

    return () => {
      events.forEach(event => window.removeEventListener(event, stableHandler));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [resetIdleTimer, isIdleAnimationEnabled]);

  useEffect(() => {
    if (isIdle && isIdleAnimationEnabled) {
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = window.setInterval(() => {
        setRotation(prev => prev - (360 / TOTAL_SLICES));
      }, 1000);
    } else {
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        idleIntervalRef.current = null;
      }
    }
    return () => {
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        idleIntervalRef.current = null;
      }
    };
  }, [isIdle, isIdleAnimationEnabled]);

  const handleToggleIdleAnimation = () => {
    setIsIdleAnimationEnabled(prev => !prev);
  };

  const loadSurahInFinder = async (surahNumber: number) => {
    setIsVerseFinderVisible(true);
    setVerseFinderContent({ type: 'loading_surah', number: surahNumber });
    const surahData = await getFullSurah(surahNumber, translationMode, localTranslationData);
    if (surahData) {
        setVerseFinderContent({ type: 'surah', data: surahData });
    } else {
        setVerseFinderContent({ type: 'empty' }); 
    }
  };

  const handleFileLoad = (data: LocalTranslationData, fileName: string) => {
    setLocalTranslationData(data);
    setLocalFileName(fileName);
    setTranslationMode('local');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (isSpinning) return;

    if (event.key === ' ') {
      vizRef.current?.spin();
      return;
    }

    if (isSecretModeActive) {
      const patternSize = SECRET_EMOJI_PATTERN.length;
      if (event.key === 'ArrowRight') {
          setSecretEmojiShift(prev => (prev + 1) % patternSize);
      } else if (event.key === 'ArrowLeft') {
          setSecretEmojiShift(prev => (prev - 1 + patternSize) % patternSize);
      }
    } else {
      const sliceAngle = 360 / TOTAL_SLICES;
      if (event.key === 'ArrowRight') {
        setIconDialRotation(prev => prev - sliceAngle);
      } else if (event.key === 'ArrowLeft') {
        setIconDialRotation(prev => prev + sliceAngle);
      }
    }
  };

  const showVerseTooltip = useCallback(async (event: React.MouseEvent, surah: number, verse: number, color: string) => {
    const { englishText, banglaText } = await getVerse(surah, verse, translationMode, localTranslationData);
    const tooltipData: VerseTooltipContent = {
      type: 'verse',
      surah,
      verse,
      color,
      englishText,
      banglaText
    };
    setTooltipContent(tooltipData);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, [translationMode, localTranslationData]);
  
  const showChapterTooltip = useCallback((event: React.MouseEvent, sliceId: number, color: string) => {
      const chapterDetails = CHAPTER_DETAILS.find(c => c.number === sliceId);
      const sliceData = SLICE_DATA.find(s => s.id === sliceId);
      const muqattat = MUQATTAT_LETTERS.get(sliceId);

      if (!chapterDetails || !sliceData) return;
      
      const tooltipData: ChapterTooltipContent = {
          type: 'chapter',
          chapterDetails,
          verseCount: sliceData.blockCount,
          muqattat,
          color,
      };
      setTooltipContent(tooltipData);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipContent(null);
  }, []);

  return (
    <main 
      className="w-full h-screen text-gray-100 font-sans relative flex flex-col overflow-hidden"
    >
      <StarryBackground />
      <div className="absolute top-4 left-4 z-50 flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <button 
            onClick={() => setIsSecretModeActive(p => !p)}
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            title={isSecretModeActive ? "Deactivate Secret Pattern" : "Activate Secret Pattern"}
            aria-label="Toggle Secret Emoji Pattern"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400/70 shadow-[0_0_8px_1px_rgba(0,255,255,0.5)]"></div>
          </button>
          <button 
            onClick={() => setIsVerseFinderVisible(p => !p)}
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            title="Toggle Verse Finder"
            aria-label="Toggle Verse Finder"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
           <button 
            onClick={handleToggleIdleAnimation}
            className={`w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isIdleAnimationEnabled ? 'text-cyan-400' : 'text-gray-600'}`}
            title={isIdleAnimationEnabled ? "Disable Idle Animation" : "Enable Idle Animation"}
            aria-label="Toggle Idle Animation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
           <button 
            onClick={() => setIsSettingsVisible(p => !p)}
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            title="Translation Settings"
            aria-label="Open Translation Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </div>
        <SettingsPanel
          isVisible={isSettingsVisible}
          setIsVisible={setIsSettingsVisible}
          mode={translationMode}
          setMode={setTranslationMode}
          onFileLoad={handleFileLoad}
          fileName={localFileName}
        />
        <VerseFinder 
          isVisible={isVerseFinderVisible}
          setIsVisible={setIsVerseFinderVisible}
          content={verseFinderContent}
          setContent={setVerseFinderContent}
          setIsAudioPlaying={() => { /* This prop is no longer needed for idle logic */ }}
          translationMode={translationMode}
          localTranslationData={localTranslationData}
        />
      </div>


      <div className="relative z-10 flex flex-col lg:flex-row flex-1 min-h-0">
        <div 
          className="h-1/3 lg:h-full lg:flex-1 flex items-center justify-center p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="application"
          aria-label="Interactive dial, click to focus and use arrow keys to rotate or spacebar to spin"
        >
          <Visualization
            ref={vizRef}
            rotation={rotation}
            iconDialRotation={iconDialRotation}
            setRotation={setRotation}
            isSpinning={isSpinning}
            onSpinStart={() => setIsSpinning(true)}
            onSpinEnd={() => setIsSpinning(false)}
            isSecretModeActive={isSecretModeActive}
            secretEmojiShift={secretEmojiShift}
            showTooltip={showChapterTooltip}
            hideTooltip={hideTooltip}
            onSliceSelect={loadSurahInFinder}
          />
        </div>
        <SidePanel 
            rotation={rotation}
            setRotation={setRotation}
            iconDialRotation={iconDialRotation}
            setIconDialRotation={setIconDialRotation}
            showTooltip={showVerseTooltip}
            hideTooltip={hideTooltip}
            isSecretModeActive={isSecretModeActive}
            secretEmojiShift={secretEmojiShift}
        />
      </div>
      <FooterMarquee rotation={deferredRotation} translationMode={translationMode} localTranslationData={localTranslationData} />
      <Tooltip 
        visible={!!tooltipContent}
        content={tooltipContent}
        position={tooltipPosition}
      />
    </main>
  );
};

export default App;