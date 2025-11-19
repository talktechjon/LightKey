
import React, { useState, useEffect, useRef } from 'react';
import { TRIANGLE_POINTS, SLICE_DATA, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, KATHARA_CLOCK_POINTS } from '../constants.ts';
import { getSliceIdAtPoint } from '../utils.ts';
import { getVerse } from '../data/verseData.ts';
import { LocalTranslationData } from '../types.ts';

interface VerseItem {
  type: 'verse';
  surah: number;
  verse: number;
  englishText: string;
  banglaText: string;
  chapterEnglishName: string;
  color: string;
}

interface StaticItem {
  type: 'static';
  text: string;
  color: string;
}

type MarqueeItem = VerseItem | StaticItem;

interface FooterMarqueeProps {
  rotation: number;
  translationMode: 'online' | 'local';
  localTranslationData: LocalTranslationData;
  isSecretModeActive: boolean;
  onExport: (verseIds: string[]) => void;
}

const FooterMarquee: React.FC<FooterMarqueeProps> = ({ rotation, translationMode, localTranslationData, isSecretModeActive, onExport }) => {
  const [marqueeItems, setMarqueeItems] = useState<MarqueeItem[]>([]);
  
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const posXRef = useRef(0);
  const velocity = 0.4; // pixels per frame for auto-scroll
  const wasDraggedRef = useRef(false); // To distinguish click from drag

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
      let pointsToFetch: { value: number, color: string }[] = [];

      if (isSecretModeActive) {
          // In secret mode, fetch last verse of Kathara clock points
          pointsToFetch = KATHARA_CLOCK_POINTS.map(val => ({ value: val, color: '#06b6d4' })); // Cyan for all
      } else {
          // Default triangle points
          pointsToFetch = [
            { ...TRIANGLE_POINTS[1].points[0], color: TRIANGLE_POINTS[1].color }, // ▼ 3
            { ...TRIANGLE_POINTS[1].points[1], color: TRIANGLE_POINTS[1].color }, // ▼ 6
            { ...TRIANGLE_POINTS[1].points[2], color: TRIANGLE_POINTS[1].color }, // ▼ 9
            { ...TRIANGLE_POINTS[0].points[0], color: TRIANGLE_POINTS[0].color }, // ▲ 3
            { ...TRIANGLE_POINTS[0].points[1], color: TRIANGLE_POINTS[0].color }, // ▲ 6
            { ...TRIANGLE_POINTS[0].points[2], color: TRIANGLE_POINTS[0].color }, // ▲ 9
          ];
      }

      const promises = pointsToFetch.map(async (point) => {
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

      const items = (await Promise.all(promises)).filter((item): item is VerseItem => item !== null);
      
      if (isSecretModeActive) {
          // Interleave static items
          const combinedItems: MarqueeItem[] = [...items];
          // Insert in reverse order to maintain indices
          // 110 at end (index 9-ish), 103 at mid (index 6-ish), 108 at start (index 3-ish)
          // Kathara clock has 12 points.
          // Insert 108 after index 3 (between 3rd and 4th clock point)
          combinedItems.splice(3, 0, { type: 'static', text: '🌋 108- Bounty / Respite', color: '#06b6d4' });
          // Insert 103 after index 7 (previously 6, +1 inserted)
          combinedItems.splice(7, 0, { type: 'static', text: '🐟 103- Trial / Sacrifice', color: '#06b6d4' });
           // Insert 110 after index 11 (previously 9, +2 inserted)
          combinedItems.splice(11, 0, { type: 'static', text: '🌴 110- Resurrect / Repent', color: '#06b6d4' });
          
          setMarqueeItems(combinedItems);
      } else {
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
    wasDraggedRef.current = false;
    startXRef.current = e.pageX;
    scrollStartRef.current = posXRef.current;
    stopAnimation();
    marqueeRef.current.style.cursor = 'grabbing';
    marqueeRef.current.style.userSelect = 'none';
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
      if (isDraggingRef.current) {
          isDraggingRef.current = false;
          if (marqueeRef.current) {
              marqueeRef.current.style.cursor = 'pointer'; // Show pointer to indicate clickable
              marqueeRef.current.style.userSelect = 'auto';
          }
          animate();
          
          // Only trigger export if it wasn't a drag operation
          if (!wasDraggedRef.current) {
              const verseIds = marqueeItems
                  .filter((item): item is VerseItem => item.type === 'verse')
                  .map(item => `${item.surah}:${item.verse}`);
              if (verseIds.length > 0) {
                  onExport(verseIds);
              }
          }
      }
  };

  const handlePointerLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
       if (marqueeRef.current) {
            marqueeRef.current.style.cursor = 'pointer';
            marqueeRef.current.style.userSelect = 'auto';
        }
      animate();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !contentRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - startXRef.current);
    if (Math.abs(walk) > 5) {
        wasDraggedRef.current = true;
    }
    
    let newPos = scrollStartRef.current + walk * 1.5;

    const contentWidth = contentRef.current.scrollWidth / 2;
    if (contentWidth > 0) {
        posXRef.current = (newPos % contentWidth + contentWidth) % contentWidth - contentWidth;
    } else {
        posXRef.current = newPos;
    }
    
    contentRef.current.style.transform = `translateX(${posXRef.current}px)`;
  };


  if (marqueeItems.length === 0) {
    return null;
  }
  
  const renderItem = (item: MarqueeItem, index: number) => {
      if (item.type === 'static') {
          return (
              <span key={index} className="mx-8 inline-block border border-cyan-500/30 rounded px-2 bg-cyan-900/20">
                  <span style={{ color: item.color, textShadow: `0 0 4px ${item.color}` }} className="font-bold text-lg">
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
  };

  return (
    <footer className="relative z-20 shrink-0 mx-auto my-4 w-full max-w-7xl px-4 flex items-center gap-3">
      <div 
        ref={marqueeRef}
        className="flex-1 bg-black/50 backdrop-blur-sm rounded-md overflow-hidden border border-gray-700/50 shadow-lg cursor-pointer transition-colors hover:border-cyan-500/50 hover:bg-black/60 group"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        title="Click to load these verses into Reader, drag to scroll"
      >
        <div 
            ref={contentRef}
            className="whitespace-nowrap inline-block py-2"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </footer>
  );
};

export default FooterMarquee;
