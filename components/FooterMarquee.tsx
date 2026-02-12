
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
      type Instruction = 
        | { type: 'verse'; surah: number; verse: number | 'last'; color: string }
        | { type: 'static'; text: string; color: string };

      let instructions: Instruction[] = [];

      if (isSecretModeActive) {
          const CYAN = '#06b6d4';
          const getSurahId = (pointIndex: number) => getSliceIdAtPoint(KATHARA_CLOCK_POINTS[pointIndex], rotation);
          
          instructions = [
              // Start: Verse 112:1 + Text
              { type: 'verse', surah: 112, verse: 1, color: CYAN },
              { type: 'static', text: '112 The Beginning ∞', color: CYAN },
              
              // Set 1: Action, Inspiration, Guidance (First Verses)
              { type: 'verse', surah: getSurahId(0), verse: 1, color: CYAN },
              { type: 'verse', surah: getSurahId(1), verse: 1, color: CYAN },
              { type: 'verse', surah: getSurahId(2), verse: 1, color: CYAN },
              
              // Junction 1: 108:1 + Text + 108:2
              { type: 'verse', surah: 108, verse: 1, color: CYAN },
              { type: 'static', text: 'Nomination △  108 ⚡Promise', color: CYAN },
              { type: 'verse', surah: 108, verse: 2, color: CYAN },
              
              // Set 2: Cleanse, Righteous, Faith (Last Verses)
              { type: 'verse', surah: getSurahId(3), verse: 'last', color: CYAN },
              { type: 'verse', surah: getSurahId(4), verse: 'last', color: CYAN },
              { type: 'verse', surah: getSurahId(5), verse: 'last', color: CYAN },
              
              // Junction 2: 103:3 + Text + 108:1
              { type: 'verse', surah: 103, verse: 3, color: CYAN },
              { type: 'static', text: 'Uproot 🔥 103 🐟 Protection', color: CYAN },
              { type: 'verse', surah: 108, verse: 1, color: CYAN },
              
              // Set 3: Blessing, Servant, Submission (First Verses)
              { type: 'verse', surah: getSurahId(6), verse: 1, color: CYAN },
              { type: 'verse', surah: getSurahId(7), verse: 1, color: CYAN },
              { type: 'verse', surah: getSurahId(8), verse: 1, color: CYAN },
              
              // Junction 3: 110:1 + Text + 110:3
              { type: 'verse', surah: 110, verse: 1, color: CYAN },
              { type: 'static', text: 'Witness ⚫ 110 🌳Return', color: CYAN },
              { type: 'verse', surah: 110, verse: 3, color: CYAN },
              
              // Set 4: Sacrifice, Truth, Light (Last Verses)
              { type: 'verse', surah: getSurahId(9), verse: 'last', color: CYAN },
              { type: 'verse', surah: getSurahId(10), verse: 'last', color: CYAN },
              { type: 'verse', surah: getSurahId(11), verse: 'last', color: CYAN },
              
              // End: Text + 112:4
              { type: 'static', text: '112 Repeat ∞', color: CYAN },
              { type: 'verse', surah: 112, verse: 4, color: CYAN },
          ];

      } else {
          // Default triangle points
          const points = [
            { ...TRIANGLE_POINTS[1].points[0], color: TRIANGLE_POINTS[1].color }, // ▼ 3
            { ...TRIANGLE_POINTS[1].points[1], color: TRIANGLE_POINTS[1].color }, // ▼ 6
            { ...TRIANGLE_POINTS[1].points[2], color: TRIANGLE_POINTS[1].color }, // ▼ 9
            { ...TRIANGLE_POINTS[0].points[0], color: TRIANGLE_POINTS[0].color }, // ▲ 3
            { ...TRIANGLE_POINTS[0].points[1], color: TRIANGLE_POINTS[0].color }, // ▲ 6
            { ...TRIANGLE_POINTS[0].points[2], color: TRIANGLE_POINTS[0].color }, // ▲ 9
          ];
          
          instructions = points.map(p => ({
              type: 'verse',
              surah: getSliceIdAtPoint(p.value, rotation),
              verse: 'last',
              color: p.color
          }));
      }

      const promises = instructions.map(async (item) => {
        if (item.type === 'static') {
            return {
                type: 'static' as const,
                text: item.text,
                color: item.color
            };
        }

        const surahId = item.surah;
        const sliceInfo = SLICE_DATA.find(s => s.id === surahId);
        
        let verseCount = 0;
        if (typeof item.verse === 'number') {
            verseCount = item.verse;
        } else if (item.verse === 'last' && sliceInfo) {
            verseCount = sliceInfo.blockCount;
        }
        
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
              color: item.color,
            };
          }
        }
        return null;
      });

      const items = (await Promise.all(promises)).filter((item): item is MarqueeItem => item !== null);
      setMarqueeItems(items);
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
