import React, { useState, useEffect, useRef } from 'react';
import { TRIANGLE_POINTS, SLICE_DATA, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, KATHARA_CLOCK_POINTS, KATHARA_GRID_NODES } from '../constants.ts';
import { getSliceIdAtPoint } from '../utils.ts';
import { getVerse } from '../data/verseData.ts';
import { LocalTranslationData } from '../types.ts';

type MarqueeItem = 
  | {
      type: 'verse';
      surah: number;
      verse: number;
      englishText: string;
      banglaText: string;
      chapterEnglishName: string;
      color: string;
    }
  | {
      type: 'static';
      text: string;
      color: string;
  };

interface FooterMarqueeProps {
  rotation: number;
  translationMode: 'online' | 'local';
  localTranslationData: LocalTranslationData;
  isSecretModeActive: boolean;
  onExport: (verses: { surah: number; verse: number }[]) => void;
}

const FooterMarquee: React.FC<FooterMarqueeProps> = ({ rotation, translationMode, localTranslationData, isSecretModeActive, onExport }) => {
  const [marqueeItems, setMarqueeItems] = useState<MarqueeItem[]>([]);
  
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const posXRef = useRef(0);
  const velocity = 0.4; // pixels per frame for auto-scroll

  const stopAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const animate = () => {
    if (!contentRef.current) return;
    
    posXRef.current -= velocity;
    
    const contentWidth = contentRef.current.scrollWidth / 2; // Use half width since we have 2 copies
    if (contentWidth > 0 && posXRef.current <= -contentWidth) {
      posXRef.current += contentWidth;
    }
    
    contentRef.current.style.transform = `translateX(${posXRef.current}px)`;
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const fetchMarqueeItems = async () => {
      if (isSecretModeActive) {
         const katharaPromises = KATHARA_CLOCK_POINTS.map(async (pointValue, index) => {
            const surahId = getSliceIdAtPoint(pointValue, rotation);
            const sliceInfo = SLICE_DATA.find(s => s.id === surahId);
            const verseCount = sliceInfo ? sliceInfo.blockCount : 0;
            const nodeColor = KATHARA_GRID_NODES[index]?.color || '#ffffff';

            if (verseCount > 0) {
                const verseData = await getVerse(surahId, verseCount, translationMode, localTranslationData);
                const chapterInfo = CHAPTER_DETAILS.find(c => c.number === surahId);
                if (verseData && chapterInfo && !verseData.englishText.startsWith('Could not load')) {
                    return {
                        type: 'verse' as const,
                        surah: surahId,
                        verse: verseCount,
                        englishText: verseData.englishText,
                        banglaText: verseData.banglaText,
                        chapterEnglishName: chapterInfo.englishName,
                        color: nodeColor,
                    };
                }
            }
            return null;
         });
         
         const fetchedItems = (await Promise.all(katharaPromises)).filter((item): item is Extract<MarqueeItem, { type: 'verse' }> => item !== null);
         
         // Define static items
         const static108: MarqueeItem = { type: 'static', text: '△108- Bounty / Respite', color: '#06b6d4' };
         const static103: MarqueeItem = { type: 'static', text: '💥103- Trial / Sacrifice', color: '#f97316' };
         const static110: MarqueeItem = { type: 'static', text: '🕋 110- Return / Repent', color: '#e5e7eb' };

         // Insert static items at specific indices to match Kathara Grid order
         // Original indices: 0,1,2 (insert), 3,4,5 (insert), 6,7,8 (insert), 9,10,11
         const finalItems: MarqueeItem[] = [...fetchedItems];
         if (finalItems.length >= 3) finalItems.splice(3, 0, static108);
         if (finalItems.length >= 7) finalItems.splice(7, 0, static103);
         if (finalItems.length >= 11) finalItems.splice(11, 0, static110);
         
         setMarqueeItems(finalItems);

      } else {
          // Default Triangle Logic
          const orderedPoints = [
            { ...TRIANGLE_POINTS[1].points[0], color: TRIANGLE_POINTS[1].color }, // ▼ 3 – Wave
            { ...TRIANGLE_POINTS[1].points[1], color: TRIANGLE_POINTS[1].color }, // ▼ 6 – Particle
            { ...TRIANGLE_POINTS[1].points[2], color: TRIANGLE_POINTS[1].color }, // ▼ 9 – Vibration
            { ...TRIANGLE_POINTS[0].points[0], color: TRIANGLE_POINTS[0].color }, // ▲ 3 – Repent
            { ...TRIANGLE_POINTS[0].points[1], color: TRIANGLE_POINTS[0].color }, // ▲ 6 – Purify
            { ...TRIANGLE_POINTS[0].points[2], color: TRIANGLE_POINTS[0].color }, // ▲ 9 – Energy
          ];

          const promises = orderedPoints.map(async (point) => {
            const surahId = getSliceIdAtPoint(point.value, rotation);
            const sliceInfo = SLICE_DATA.find(s => s.id === surahId);
            const verseCount = sliceInfo ? sliceInfo.blockCount : 0;
            
            if (verseCount > 0) {
              const verseData = await getVerse(surahId, verseCount, translationMode, localTranslationData);
              const chapterInfo = CHAPTER_DETAILS.find(c => c.number === surahId);
              
              if (verseData && chapterInfo && !verseData.englishText.startsWith('Could not load')) {
                return {
                  type: 'verse' as const,
                  surah: surahId,
                  verse: verseCount,
                  englishText: verseData.englishText,
                  banglaText: verseData.banglaText,
                  chapterEnglishName: chapterInfo.englishName,
                  color: point.color,
                };
              }
            }
            return null;
          });

          const items = (await Promise.all(promises)).filter((item): item is Extract<MarqueeItem, { type: 'verse' }> => item !== null);
          setMarqueeItems(items);
      }
    };
    
    fetchMarqueeItems();
  }, [rotation, translationMode, localTranslationData, isSecretModeActive]);
  
  useEffect(() => {
    if (marqueeItems.length > 0) {
      posXRef.current = 0;
      stopAnimation();
      animate();
    } else {
      stopAnimation();
    }
    return () => stopAnimation();
  }, [marqueeItems]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!marqueeRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    scrollStartRef.current = posXRef.current;
    stopAnimation();
    marqueeRef.current.style.cursor = 'grabbing';
    marqueeRef.current.style.userSelect = 'none';
  };
  
  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (marqueeRef.current) {
        marqueeRef.current.style.cursor = 'grab';
        marqueeRef.current.style.userSelect = 'auto';
      }
      animate();

      if (!hasDraggedRef.current) {
        handleExport();
      }
    }
  };

  const handlePointerLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (marqueeRef.current) {
        marqueeRef.current.style.cursor = 'grab';
        marqueeRef.current.style.userSelect = 'auto';
      }
      animate();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !contentRef.current) return;
    e.preventDefault();

    if (Math.abs(e.pageX - startXRef.current) > 5) {
      hasDraggedRef.current = true;
    }

    const walk = (e.pageX - startXRef.current) * 1.5;
    let newPos = scrollStartRef.current + walk;

    const contentWidth = contentRef.current.scrollWidth / 2; // Use half width for wrapping logic
    if (contentWidth > 0) {
        // Seamlessly wrap while dragging
        posXRef.current = (newPos % contentWidth + contentWidth) % contentWidth - contentWidth;
    } else {
        posXRef.current = newPos;
    }
    
    contentRef.current.style.transform = `translateX(${posXRef.current}px)`;
  };

  const handleExport = () => {
    const versesToExport = marqueeItems
        .filter((item): item is Extract<MarqueeItem, { type: 'verse' }> => item.type === 'verse')
        .map(item => ({ surah: item.surah, verse: item.verse }));
    
    onExport(versesToExport);
  };

  if (marqueeItems.length === 0) {
    return null;
  }
  
  const marqueeContent = [...marqueeItems, ...marqueeItems].map((item, index) => {
    if (item.type === 'static') {
        return (
            <span key={index} className="mx-8 inline-block">
                <span style={{ color: item.color, textShadow: `0 0 5px ${item.color}` }} className="font-bold text-lg tracking-wide">
                    {item.text}
                </span>
            </span>
        );
    }

    const isMuqattat = MUQATTAT_CHAPTERS.has(item.surah);
    return (
      <span key={index} className="mx-8 inline-block">
        <span style={{ color: item.color, textShadow: `0 0 4px ${item.color}` }} className={`font-semibold ${isMuqattat ? 'muqattat-glow' : ''}`}>
          {item.chapterEnglishName} [{item.surah}:{item.verse}]
        </span>
        <span className="ml-3 text-gray-300 italic">
          "{item.englishText}"
        </span>
        {item.banglaText && (
            <span className="ml-3 text-cyan-200 italic">
                "{item.banglaText}"
            </span>
        )}
      </span>
    );
  });

  return (
    <footer className="relative z-20 shrink-0 mx-auto my-4 w-full max-w-7xl px-4 flex items-center justify-center">
      <div 
        ref={marqueeRef}
        className="w-full bg-black/50 backdrop-blur-sm rounded-md overflow-hidden border border-gray-700/50 shadow-lg cursor-grab active:cursor-grabbing hover:bg-black/70 hover:border-cyan-500/30 transition-colors duration-300"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        title="Click to analyze these verses in Verse Finder, or drag to scroll"
        aria-label="Interactive marquee. Click to export verses, drag to scroll."
      >
        <div 
            ref={contentRef}
            className="whitespace-nowrap inline-block py-2"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
        >
          {marqueeContent}
        </div>
      </div>
    </footer>
  );
};

export default FooterMarquee;