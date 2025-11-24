
import React, { useState, useRef, useCallback, useDeferredValue, useEffect } from 'react';
import Visualization from './components/Visualization.tsx';
import SidePanel from './components/SidePanel.tsx';
import FooterMarquee from './components/FooterMarquee.tsx';
import Tooltip from './components/Tooltip.tsx';
import StarryBackground from './components/StarryBackground.tsx';
import VerseFinder from './components/VerseFinder.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';
import { VisualizationHandle, TooltipContent, VerseTooltipContent, ChapterTooltipContent, VerseFinderContent, LocalTranslationData } from './types.ts';
import { TOTAL_SLICES, SLICE_DATA, SECRET_EMOJI_PATTERN, CHAPTER_DETAILS, MUQATTAT_LETTERS } from './constants.ts';
import { getVerse, getFullSurah, getVerseDetails } from './data/verseData.ts';
import { useIdle } from './hooks/useIdle.ts';
import { processInBatches } from './utils.ts';

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
  const [verseFinderQuery, setVerseFinderQuery] = useState('');

  // --- Low Resource Mode State ---
  const [isLowResourceMode, setIsLowResourceMode] = useState(false);

  // --- Translation Settings State ---
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [translationMode, setTranslationMode] = useState<'online' | 'local'>('online');
  const [localTranslationData, setLocalTranslationData] = useState<LocalTranslationData>(null);
  const [localFileName, setLocalFileName] = useState<string | null>(null);

  // --- Idle Animation State ---
  const [isIdleAnimationEnabled, setIsIdleAnimationEnabled] = useState(false);
  const isIdle = useIdle(15000, isIdleAnimationEnabled && !isLowResourceMode);
  const idleIntervalRef = useRef<number | null>(null);
  const idleStartPositionRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
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

  useEffect(() => {
    if (isIdle) {
      // Went idle, start animation
      idleStartPositionRef.current = rotationRef.current;
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = window.setInterval(() => {
        setRotation(prev => prev - (360 / TOTAL_SLICES));
      }, 1000);
    } else {
      // Became active, stop animation and return to start
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        idleIntervalRef.current = null;
      }
      
      if (idleStartPositionRef.current !== null) {
        const startRotation = rotationRef.current;
        const targetRotation = idleStartPositionRef.current;
        
        let diff = (targetRotation % 360) - (startRotation % 360);
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        
        const endRotation = startRotation + diff;
        animateRotation(startRotation, endRotation, 1500, () => {
          idleStartPositionRef.current = null; // Clear start position after returning
        });
      }
    }

    return () => {
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
    };
  }, [isIdle, animateRotation]);

  const handleToggleIdleAnimation = () => {
    setIsIdleAnimationEnabled(prev => !prev);
  };

  const loadSurahInFinder = async (surahNumber: number) => {
    setIsVerseFinderVisible(true);
    setVerseFinderQuery(surahNumber.toString());
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

  const handleMarqueeExport = async (verseIds: string[]) => {
      setIsVerseFinderVisible(true);
      setVerseFinderContent({ type: 'loading' });
      setVerseFinderQuery(verseIds.join(', '));

      const verseRequests = verseIds.map(id => {
          const [surah, ayah] = id.split(':').map(Number);
          return { surah, ayah };
      });

      try {
          const results = await processInBatches(
              verseRequests,
              ({ surah, ayah }) => getVerseDetails(surah, ayah, translationMode, localTranslationData),
              5
          );
          const validResults = results.filter((v): v is NonNullable<typeof v> => v !== null);
          setVerseFinderContent({ type: 'search', verses: validResults });
      } catch (error) {
          console.error("Error exporting marquee verses:", error);
          setVerseFinderContent({ type: 'empty' });
      }
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
      {!isLowResourceMode && <StarryBackground />}
      <div className="absolute top-4 left-4 z-50 flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <a
            href="https://github.com/talktechjon/LightKey"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            title="View Source on GitHub"
            aria-label="View Source on GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
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
           <button 
            onClick={() => setIsLowResourceMode(p => !p)}
            className={`w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isLowResourceMode ? 'text-cyan-400' : 'text-gray-600'}`}
            title={isLowResourceMode ? "Deactivate Low Resource Mode" : "Activate Low Resource Mode"}
            aria-label="Toggle Low Resource Mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2"/>
              <path d="M12.59 19.41A2 2 0 1 0 14 16H2"/>
              <path d="M19.59 11.41A2 2 0 1 0 21 8H2"/>
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
          translationMode={translationMode}
          localTranslationData={localTranslationData}
          query={verseFinderQuery}
          onQueryChange={setVerseFinderQuery}
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
            isLowResourceMode={isLowResourceMode}
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
            isLowResourceMode={isLowResourceMode}
        />
      </div>
      {!isLowResourceMode && (
        <FooterMarquee 
            rotation={deferredRotation} 
            translationMode={translationMode} 
            localTranslationData={localTranslationData} 
            isSecretModeActive={isSecretModeActive}
            onExport={handleMarqueeExport}
        />
      )}
      <Tooltip 
        visible={!!tooltipContent}
        content={tooltipContent}
        position={tooltipPosition}
      />

      {/* Bottom Left Buttons: Intro & Knowledge Base */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3">
        <a
          href="https://www.youtube.com/watch?v=ytKuGS85pZE"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 hover:scale-110 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
          title="Watch Introduction"
          aria-label="Watch Introduction Video"
        >
          <span className="text-xl font-bold">?</span>
        </a>
        
        <a
          href="https://notebooklm.google.com/notebook/4eedddbb-3085-4132-bce5-83d8e94dc815?authuser=5"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 hover:scale-110 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
          title="Knowledge Base (NotebookLM)"
          aria-label="Open Knowledge Base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </a>
      </div>
      
      {/* Portal Root for Kathara Diagram on Desktop - z-index lowered to sit behind main content but above background */}
      <div id="kathara-portal-root" className="fixed inset-0 z-[5] pointer-events-none hidden lg:block" />

    </main>
  );
};

export default App;
