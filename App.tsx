import React, { useState, useRef, useCallback, useDeferredValue } from 'react';
import Visualization from './components/Visualization.tsx';
import SidePanel from './components/SidePanel.tsx';
import FooterMarquee from './components/FooterMarquee.tsx';
import Tooltip from './components/Tooltip.tsx';
import StarryBackground from './components/StarryBackground.tsx';
import { VisualizationHandle, TooltipContent, VerseTooltipContent, ChapterTooltipContent } from './types.ts';
import { TOTAL_SLICES, SLICE_DATA, SECRET_EMOJI_PATTERN, CHAPTER_DETAILS, MUQATTAT_LETTERS } from './constants.ts';
import { getVerse } from './data/verseData.ts';

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [iconDialRotation, setIconDialRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const vizRef = useRef<VisualizationHandle>(null);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isSecretModeActive, setIsSecretModeActive] = useState(false);
  const [secretEmojiShift, setSecretEmojiShift] = useState(0);
  
  // Defer updates to the most expensive, off-screen component (Footer)
  const deferredRotation = useDeferredValue(rotation);

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

  const showVerseTooltip = useCallback((event: React.MouseEvent, surah: number, verse: number, color: string) => {
    const { englishText, banglaText } = getVerse(surah, verse);
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
  }, []);
  
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
      <button 
        onClick={() => setIsSecretModeActive(p => !p)}
        className="absolute top-4 left-4 z-50 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-900/50 hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        title={isSecretModeActive ? "Deactivate Secret Pattern" : "Activate Secret Pattern"}
        aria-label="Toggle Secret Emoji Pattern"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400/70 shadow-[0_0_8px_1px_rgba(0,255,255,0.5)]"></div>
      </button>

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
      <FooterMarquee rotation={deferredRotation} />
      <Tooltip 
        visible={!!tooltipContent}
        content={tooltipContent}
        position={tooltipPosition}
      />
    </main>
  );
};

export default App;