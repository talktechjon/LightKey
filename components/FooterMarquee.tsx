import React, { useState, useEffect, useRef } from 'react';
import { TRIANGLE_POINTS, SLICE_DATA, TOTAL_SLICES, CHAPTER_DETAILS, MUQATTAT_CHAPTERS } from '../constants.ts';
import { getSliceIdAtPoint } from '../utils.ts';
import { getVerse } from '../data/verseData.ts';

type LocalTranslationData = Record<string, string[]> | null;

interface MarqueeVerse {
  surah: number;
  verse: number;
  englishText: string;
  banglaText: string;
  chapterEnglishName: string;
  color: string;
}

interface FooterMarqueeProps {
  rotation: number;
  translationMode: 'online' | 'local';
  localTranslationData: LocalTranslationData;
}

const FooterMarquee: React.FC<FooterMarqueeProps> = ({ rotation, translationMode, localTranslationData }) => {
  const [marqueeItems, setMarqueeItems] = useState<MarqueeVerse[]>([]);
  
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const isDraggingRef = useRef(false);
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
    const orderedPoints = [
      { ...TRIANGLE_POINTS[1].points[0], color: TRIANGLE_POINTS[1].color }, // ▼ 3 – Wave
      { ...TRIANGLE_POINTS[1].points[1], color: TRIANGLE_POINTS[1].color }, // ▼ 6 – Particle
      { ...TRIANGLE_POINTS[1].points[2], color: TRIANGLE_POINTS[1].color }, // ▼ 9 – Vibration
      { ...TRIANGLE_POINTS[0].points[0], color: TRIANGLE_POINTS[0].color }, // ▲ 3 – Repent
      { ...TRIANGLE_POINTS[0].points[1], color: TRIANGLE_POINTS[0].color }, // ▲ 6 – Purify
      { ...TRIANGLE_POINTS[0].points[2], color: TRIANGLE_POINTS[0].color }, // ▲ 9 – Energy
    ];

    const fetchMarqueeItems = async () => {
      const promises = orderedPoints.map(async (point) => {
        const surahId = getSliceIdAtPoint(point.value, rotation);
        const sliceInfo = SLICE_DATA.find(s => s.id === surahId);
        const verseCount = sliceInfo ? sliceInfo.blockCount : 0;
        
        if (verseCount > 0) {
          const verseData = await getVerse(surahId, verseCount, translationMode, localTranslationData);
          const chapterInfo = CHAPTER_DETAILS.find(c => c.number === surahId);
          
          if (verseData && chapterInfo && !verseData.englishText.startsWith('Could not load')) {
            return {
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

      const items = (await Promise.all(promises)).filter((item): item is MarqueeVerse => item !== null);
      setMarqueeItems(items);
    };
    
    fetchMarqueeItems();
  }, [rotation, translationMode, localTranslationData]);
  
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
    startXRef.current = e.pageX;
    scrollStartRef.current = posXRef.current;
    stopAnimation();
    marqueeRef.current.style.cursor = 'grabbing';
    marqueeRef.current.style.userSelect = 'none';
  };
  
  const handlePointerUpOrLeave = () => {
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


  if (marqueeItems.length === 0) {
    return null;
  }
  
  const marqueeContent = [...marqueeItems, ...marqueeItems].map((item, index) => {
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
    <footer className="relative z-20 shrink-0 mx-auto my-4 w-full max-w-7xl">
      <div 
        ref={marqueeRef}
        className="bg-black/50 backdrop-blur-sm rounded-md overflow-hidden border border-gray-700/50 shadow-lg cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
        onPointerMove={handlePointerMove}
        aria-label="Interactive marquee, click and drag to scroll"
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