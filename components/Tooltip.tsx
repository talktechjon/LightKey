import React, { useRef, useLayoutEffect } from 'react';
import { TooltipContent } from '../types.ts';
import { getChapterIcon } from '../utils.ts';

interface TooltipProps {
  visible: boolean;
  content: TooltipContent | null;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ visible, content, position }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tooltipNode = tooltipRef.current;
    if (!tooltipNode) return;

    if (visible && content) {
      // We need the tooltip's dimensions to position it correctly.
      const { offsetWidth, offsetHeight } = tooltipNode;
      const { innerWidth, innerHeight } = window;
      const margin = 16; // A small gap from the cursor and viewport edges

      // Calculate position, defaulting to bottom-right of the cursor
      let newX = position.x + margin;
      let newY = position.y + margin;

      // Adjust if it overflows the viewport
      if (newX + offsetWidth > innerWidth - margin) {
        newX = position.x - offsetWidth - margin;
      }
      if (newY + offsetHeight > innerHeight - margin) {
        newY = position.y - offsetHeight - margin;
      }

      // Clamp to ensure it never goes off-screen
      newX = Math.max(margin, newX);
      newY = Math.max(margin, newY);
      
      // Apply position directly to the DOM for performance.
      // Using transform is smoother than animating top/left.
      tooltipNode.style.transform = `translate(${newX}px, ${newY}px)`;
      // Fade the tooltip in
      tooltipNode.style.opacity = '1';
    } else {
      // Fade the tooltip out
      tooltipNode.style.opacity = '0';
    }
  }, [visible, position, content]);

  // Don't render anything if there's no content to display.
  // This allows the component to be mounted for the fade-out transition.
  if (!content) return null;

  // Base styles: fixed position, transparent, with a transition.
  // The useLayoutEffect will handle positioning and fading in/out.
  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 1000,
    opacity: 0, // Start transparent, effect will fade it in.
    transition: 'opacity 0.2s ease-in-out',
  };

  const renderContent = () => {
    if (content.type === 'chapter') {
        const { chapterDetails, verseCount, muqattat, color } = content;
        const iconSrc = getChapterIcon(chapterDetails.revelationType);
        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <img src={iconSrc} alt={chapterDetails.revelationType} className="w-9 h-9 flex-shrink-0" title={chapterDetails.revelationType}/>
                    <div className="min-w-0">
                        <h3 className="font-bold text-lg" style={{ color: color, textShadow: `0 0 5px ${color}` }}>
                            {chapterDetails.number}. {chapterDetails.englishName}
                        </h3>
                        <p className="text-base italic text-gray-400">{chapterDetails.transliteration}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm border-t border-gray-700 pt-2 text-gray-300">
                    <div><strong className="text-gray-400 font-medium">Verses:</strong> {verseCount}</div>
                    <div><strong className="text-gray-400 font-medium">Juz':</strong> {chapterDetails.juz}</div>
                </div>
                {muqattat && (
                    <div className="border-t border-gray-700 pt-2 text-gray-300">
                        <strong className="text-gray-400 font-medium">Muqatta'at:</strong> 
                        <span dir="rtl" className="font-mono text-lg ml-2 muqattat-glow">
                            {muqattat.join(' ')}
                        </span>
                    </div>
                )}
            </div>
        )
    }

    // 'verse' type
    const directLink = `https://reader.wikisubmission.org/quran/${content.surah}:${content.verse}`;
    return (
        <>
            <div>
                <a href={directLink} target="_blank" rel="noopener noreferrer" style={{ color: content.color, textShadow: `0 0 5px ${content.color}` }} className="font-bold hover:underline">
                    Verse [{content.surah}:{content.verse}]
                </a>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700">
                <h4 className="font-semibold text-gray-400 mb-1" style={{ color: content.color, opacity: 0.8 }}>Translation</h4>
                <p className="text-gray-200 pl-2 border-l-2" style={{borderColor: content.color}}>
                {content.englishText}
                </p>
            </div>
            {content.banglaText && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                    <h4 className="font-semibold text-cyan-400/90 mb-1">Secondary</h4>
                    <p className="text-gray-200 pl-2 border-l-2 border-cyan-400/50">
                    {content.banglaText}
                    </p>
                </div>
            )}
        </>
    )
  }

  return (
    <div ref={tooltipRef} style={baseStyle} className="bg-gray-900 border border-gray-600 rounded-md shadow-2xl p-4 max-w-sm lg:max-w-md text-sm" role="tooltip" aria-hidden={!visible}>
      {renderContent()}
    </div>
  );
};

export default Tooltip;