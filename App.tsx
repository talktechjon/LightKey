
import React, { useState, useRef, useCallback, useDeferredValue, useEffect } from 'react';
import Visualization from './components/Visualization.tsx';
import SidePanel from './components/SidePanel.tsx';
import FooterMarquee from './components/FooterMarquee.tsx';
import Tooltip from './components/Tooltip.tsx';
import StarryBackground from './components/StarryBackground.tsx';
import VerseFinder from './components/VerseFinder.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';
import InstructionPanel from './components/InstructionPanel.tsx';
import TreeOfLifeMode from './components/TreeOfLifeMode.tsx';
import { VisualizationHandle, TooltipContent, VerseFinderContent, LocalTranslationData } from './types.ts';
import { TOTAL_SLICES, SLICE_DATA, SECRET_EMOJI_PATTERN, CHAPTER_DETAILS, MUQATTAT_LETTERS } from './constants.ts';
import { getVerse, getFullSurah, getVerseDetails } from './data/verseData.ts';
import { useIdle } from './hooks/useIdle.ts';
import { processInBatches } from './utils.ts';
import { TreeIcon, CowIcon } from './components/Icons.tsx';

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [iconDialRotation, setIconDialRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const vizRef = useRef<VisualizationHandle>(null);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isSecretModeActive, setIsSecretModeActive] = useState(true);
  const [isTreeOfVerseActive, setIsTreeOfVerseActive] = useState(false);
  const [isPieceOfBakaraActive, setIsPieceOfBakaraActive] = useState(false);
  const [isTreeOfLifeModeActive, setIsTreeOfLifeModeActive] = useState(false);
  const [secretEmojiShift, setSecretEmojiShift] = useState(0);
  const [isVerseFinderVisible, setIsVerseFinderVisible] = useState(false);
  const [verseFinderContent, setVerseFinderContent] = useState<VerseFinderContent>({ type: 'empty' });
  const [verseFinderQuery, setVerseFinderQuery] = useState('');
  const [shouldAutoSearch, setShouldAutoSearch] = useState(false);
  const [isLowResourceMode, setIsLowResourceMode] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [translationMode, setTranslationMode] = useState<'online' | 'local'>('online');
  const [localTranslationData, setLocalTranslationData] = useState<LocalTranslationData>(null);
  const [localFileName, setLocalFileName] = useState<string | null>(null);
  const [isInstructionVisible, setIsInstructionVisible] = useState(false); 
  const [isIdleAnimationEnabled, setIsIdleAnimationEnabled] = useState(false);
  const [bakaraSpineIndex, setBakaraSpineIndex] = useState(1);
  
  const isIdle = useIdle(15000, isIdleAnimationEnabled && !isLowResourceMode);
  const idleIntervalRef = useRef<number | null>(null);
  const idleStartPositionRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const rotationRef = useRef(rotation);

  useEffect(() => { rotationRef.current = rotation; }, [rotation]);
  const deferredRotation = useDeferredValue(rotation);
  
  // Independent Secret Mode: Only keep TreeOfVerse and PieceOfBakara mutually exclusive
  useEffect(() => { if (isTreeOfVerseActive) setIsPieceOfBakaraActive(false); }, [isTreeOfVerseActive]);
  useEffect(() => { if (isPieceOfBakaraActive) setIsTreeOfVerseActive(false); }, [isPieceOfBakaraActive]);

  useEffect(() => {
    let query = window.location.hash.length > 1 ? window.location.hash.slice(1) : window.location.pathname.slice(1);
    const decodedQuery = decodeURIComponent(query);
    if (decodedQuery && /^[0-9:,\- ]+$/.test(decodedQuery)) {
        setVerseFinderQuery(decodedQuery);
        setIsVerseFinderVisible(true);
        setIsLowResourceMode(true);
        setShouldAutoSearch(true);
    }
  }, []);

  const animateRotation = useCallback((start: number, end: number, duration: number, onComplete?: () => void) => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    let startTime: number | null = null;
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const newRotation = start + (end - start) * easeInOutCubic(progress);
      setRotation(newRotation);
      if (progress < 1) animationFrameId.current = requestAnimationFrame(step);
      else { setRotation(end); if (onComplete) onComplete(); }
    };
    animationFrameId.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (isIdle) {
      idleStartPositionRef.current = rotationRef.current;
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = window.setInterval(() => setRotation(prev => prev - (360 / TOTAL_SLICES)), 1000);
    } else {
      if (idleIntervalRef.current) { clearInterval(idleIntervalRef.current); idleIntervalRef.current = null; }
      if (idleStartPositionRef.current !== null) {
        const startRotation = rotationRef.current;
        let diff = (idleStartPositionRef.current % 360) - (startRotation % 360);
        if (diff > 180) diff -= 360; else if (diff < -180) diff += 360;
        animateRotation(startRotation, startRotation + diff, 1500, () => { idleStartPositionRef.current = null; });
      }
    }
    return () => { if (idleIntervalRef.current) clearInterval(idleIntervalRef.current); };
  }, [isIdle, animateRotation]);

  const loadSurahInFinder = async (surahNumber: number) => {
    setIsVerseFinderVisible(true);
    setVerseFinderQuery(surahNumber.toString());
    setVerseFinderContent({ type: 'loading_surah', number: surahNumber });
    const surahData = await getFullSurah(surahNumber, translationMode, localTranslationData);
    setVerseFinderContent(surahData ? { type: 'surah', data: surahData } : { type: 'empty' });
  };

  const handleVerseSelect = async (surah: number, ayah: number) => {
    setIsVerseFinderVisible(true);
    setVerseFinderQuery(`${surah}:${ayah}`);
    setVerseFinderContent({ type: 'loading' });
    const verse = await getVerseDetails(surah, ayah, translationMode, localTranslationData);
    setVerseFinderContent(verse ? { type: 'search', verses: [verse] } : { type: 'empty' });
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
          const results = await processInBatches(verseRequests, ({ surah, ayah }) => getVerseDetails(surah, ayah, translationMode, localTranslationData), 5);
          setVerseFinderContent({ type: 'search', verses: results.filter((v): v is NonNullable<typeof v> => v !== null) });
      } catch (error) { setVerseFinderContent({ type: 'empty' }); }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isSpinning) return;
    if (event.key === ' ') { vizRef.current?.spin(); return; }
    if (isSecretModeActive) {
      const patternSize = SECRET_EMOJI_PATTERN.length;
      if (event.key === 'ArrowRight') setSecretEmojiShift(prev => (prev + 1) % patternSize);
      else if (event.key === 'ArrowLeft') setSecretEmojiShift(prev => (prev - 1 + patternSize) % patternSize);
    } else {
      const sliceAngle = 360 / TOTAL_SLICES;
      if (event.key === 'ArrowRight') setIconDialRotation(prev => prev - sliceAngle);
      else if (event.key === 'ArrowLeft') setIconDialRotation(prev => prev + sliceAngle);
    }
  };

  const showVerseTooltip = useCallback(async (event: React.MouseEvent, surah: number, verse: number, color: string) => {
    const { englishText, banglaText } = await getVerse(surah, verse, translationMode, localTranslationData);
    setTooltipContent({ type: 'verse', surah, verse, color, englishText, banglaText });
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, [translationMode, localTranslationData]);
  
  const showChapterTooltip = useCallback((event: React.MouseEvent, sliceId: number, color: string) => {
      const chapterDetails = CHAPTER_DETAILS.find(c => c.number === sliceId);
      const sliceData = SLICE_DATA.find(s => s.id === sliceId);
      if (!chapterDetails || !sliceData) return;
      setTooltipContent({ type: 'chapter', chapterDetails, verseCount: sliceData.blockCount, muqattat: MUQATTAT_LETTERS.get(sliceId), color });
      setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  return (
    <main className="w-full lg:h-screen min-h-screen text-gray-100 font-sans relative flex flex-col lg:overflow-hidden">
      {!isLowResourceMode && <StarryBackground />}
      <InstructionPanel isVisible={isInstructionVisible} onClose={() => setIsInstructionVisible(false)} />
      
      {isTreeOfLifeModeActive && (
        <TreeOfLifeMode rotation={rotation} onClose={() => setIsTreeOfLifeModeActive(false)} />
      )}

      <div className="absolute top-4 left-4 z-50 flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <a href="https://github.com/talktechjon/LightKey" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50" title="GitHub"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></a>
          <button onClick={() => setIsSecretModeActive(p => !p)} className={`w-8 h-8 rounded-full bg-black/20 border border-cyan-500/30 flex items-center justify-center ${isSecretModeActive ? 'text-cyan-400' : 'text-gray-600'}`} title="Secret Pattern"><div className={`w-2 h-2 rounded-full ${isSecretModeActive ? 'bg-cyan-400/70' : 'bg-gray-700'}`}></div></button>
          <button onClick={() => setIsTreeOfVerseActive(p => !p)} className={`w-8 h-8 rounded-full bg-black/20 border border-cyan-500/30 flex items-center justify-center ${isTreeOfVerseActive ? 'text-cyan-400' : 'text-gray-600'}`} title="Tree of Verse"><TreeIcon /></button>
          <button onClick={() => setIsVerseFinderVisible(p => !p)} className="w-8 h-8 rounded-full bg-black/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center" title="Verse Finder"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
          <button onClick={() => setIsIdleAnimationEnabled(p => !p)} className={`w-8 h-8 rounded-full bg-black/20 border border-cyan-500/30 flex items-center justify-center ${isIdleAnimationEnabled ? 'text-cyan-400' : 'text-gray-600'}`} title="Idle"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          <button onClick={() => setIsSettingsVisible(p => !p)} className="w-8 h-8 rounded-full bg-black/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center" title="Settings"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></button>
          <button onClick={() => setIsLowResourceMode(p => !p)} className={`w-8 h-8 rounded-full bg-black/20 border border-cyan-500/30 flex items-center justify-center ${isLowResourceMode ? 'text-cyan-400' : 'text-gray-600'}`} title="Performance"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.41A2 2 0 1 0 14 16H2M19.59 11.41A2 2 0 1 0 21 8H2"/></svg></button>
        </div>
        <SettingsPanel isVisible={isSettingsVisible} setIsVisible={setIsSettingsVisible} mode={translationMode} setMode={setTranslationMode} onFileLoad={(data, name) => {setLocalTranslationData(data); setLocalFileName(name); setTranslationMode('local');}} fileName={localFileName} />
        <VerseFinder isVisible={isVerseFinderVisible} setIsVisible={setIsVerseFinderVisible} content={verseFinderContent} setContent={setVerseFinderContent} translationMode={translationMode} localTranslationData={localTranslationData} query={verseFinderQuery} onQueryChange={setVerseFinderQuery} shouldAutoSearch={shouldAutoSearch} onAutoSearchHandled={() => setShouldAutoSearch(false)} />
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row lg:flex-1 lg:min-h-0">
        <div className="h-[45vh] lg:h-full lg:flex-1 flex items-center justify-center p-4 outline-none shrink-0" tabIndex={0} onKeyDown={handleKeyDown} role="application">
          <Visualization ref={vizRef} rotation={rotation} iconDialRotation={iconDialRotation} setRotation={setRotation} isSpinning={isSpinning} onSpinStart={() => setIsSpinning(true)} onSpinEnd={() => setIsSpinning(false)} isSecretModeActive={isSecretModeActive} secretEmojiShift={secretEmojiShift} showTooltip={showChapterTooltip} hideTooltip={() => setTooltipContent(null)} onSliceSelect={loadSurahInFinder} isLowResourceMode={isLowResourceMode} />
        </div>
        <SidePanel 
          rotation={rotation} 
          setRotation={setRotation} 
          iconDialRotation={iconDialRotation} 
          setIconDialRotation={setIconDialRotation} 
          showTooltip={showVerseTooltip} 
          hideTooltip={() => setTooltipContent(null)} 
          isSecretModeActive={isSecretModeActive} 
          isTreeOfVerseActive={isTreeOfVerseActive} 
          isPieceOfBakaraActive={isPieceOfBakaraActive} 
          secretEmojiShift={secretEmojiShift} 
          isLowResourceMode={isLowResourceMode} 
          onVerseSelect={handleVerseSelect} 
          onBulkExport={handleMarqueeExport} 
          bakaraSpineIndex={bakaraSpineIndex}
          setBakaraSpineIndex={setBakaraSpineIndex}
        />
      </div>
      {!isLowResourceMode && <FooterMarquee rotation={deferredRotation} translationMode={translationMode} localTranslationData={localTranslationData} isSecretModeActive={isSecretModeActive} onExport={handleMarqueeExport} />}
      <Tooltip visible={!!tooltipContent} content={tooltipContent} position={tooltipPosition} />
      
      {/* Bottom Left Navigation Group: Arranged in a 2x2 grid */}
      <div className="fixed bottom-4 left-4 z-50 grid grid-cols-2 gap-2">
        {/* Row 1 */}
        <button onClick={() => setIsPieceOfBakaraActive(p => !p)} className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center transition-all hover:scale-110 shrink-0 shadow-lg ${isPieceOfBakaraActive ? 'text-cyan-400' : 'text-gray-400'}`} title="Piece of Heifer">
          <CowIcon />
        </button>
        <a href="https://notebooklm.google.com/notebook/4eedddbb-3085-4132-bce5-83d8e94dc815" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all hover:scale-110 shrink-0 shadow-lg" title="NotebookLM Reference">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </a>

        {/* Row 2 */}
        <button onClick={() => setIsInstructionVisible(true)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all hover:scale-110 shrink-0 shadow-lg" title="Instructions">
          <span className="text-xl font-bold">?</span>
        </button>
        <button onClick={() => setIsTreeOfLifeModeActive(true)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all hover:scale-110 text-xl shrink-0 shadow-lg" title="Tree of Life">
          🌳
        </button>
      </div>
      
      <div id="kathara-portal-root" className="fixed inset-0 z-[5] pointer-events-none hidden lg:block" />
    </main>
  );
};

export default App;
