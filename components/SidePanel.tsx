
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { TOTAL_SLICES, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS, BUBBLE_BLOCK_MAPPING_RAW } from '../constants.ts';
import { TAFSIR_YOUTUBE_VIDEO_IDS, RECITATION_YOUTUBE_VIDEO_IDS, ENGLISH_RECITATION_YOUTUBE_VIDEO_IDS } from '../youtubeData.ts';
import { getSliceAtPoint, getChapterIcon, colorScale } from '../utils.ts';
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
  isSpinning: boolean;
  onVerseSelect: (surah: number, ayah: number) => void;
  onBulkExport: (verseIds: string[]) => void;
  bakaraSpineIndex: number;
  setBakaraSpineIndex: (index: number) => void;
  treeRootVerse: { surah: number, ayah: number };
  setTreeRootVerse: React.Dispatch<React.SetStateAction<{ surah: number, ayah: number }>>;
  treeTrines: { surah: number, ayah: number }[][];
  onPlayPlaylist?: (url: string) => void;
  playYoutubeInternally?: boolean;
}

const STATIC_CROWN_DATA = Array.from({ length: 114 }, (_, i) => {
  const k = i + 1;
  const baseAngleRad = ((k - 1) * 360 / 114 - 90) * (Math.PI / 180);
  const verses = BUBBLE_BLOCK_MAPPING_RAW[k as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
  const h = 5.0 + 30.0 * (verses / 286);
  const color = colorScale(k);
  return { k, baseAngleRad, h, color, verses };
});

const SidePanel: React.FC<SidePanelProps> = ({ rotation, iconDialRotation, setRotation, setIconDialRotation, showFunctionalTooltip, hideTooltip, isSecretModeActive, isTreeOfVerseActive, isPieceOfBakaraActive, secretEmojiShift, isLowResourceMode, isSpinning, onVerseSelect, onBulkExport, bakaraSpineIndex, setBakaraSpineIndex, treeRootVerse, setTreeRootVerse, treeTrines, onPlayPlaylist, playYoutubeInternally }) => {
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

    let frameCount = 0;
    const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const easedProgress = easeInOutCubic(progress);

        const newRotation = startRotation + rotationDiff * easedProgress;
        
        // Throttled update for sequence animation as well
        frameCount++;
        if (frameCount % 3 === 0 || progress === 1) {
          setRotation(newRotation);
        }

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
      if (onPlayPlaylist && playYoutubeInternally) {
        let embedUrl = `https://www.youtube.com/embed/${videoIds[0]}?autoplay=1`;
        if (videoIds.length > 1) {
           embedUrl += `&playlist=${videoIds.slice(1).join(',')}`;
        }
        onPlayPlaylist(embedUrl);
      } else {
        const url = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else {
      alert("Videos for this playlist are currently unavailable.");
    }
  };
  
  const handleWatchSequence = (type: PlaylistType) => {
    // Mirroring Order: Download (Slave, Queen, Righteous) -> Return (Orphan, Cave, Turabin)
    const helixSequence = [1, 39, 77, 19, 95, 57];
    const chapterIds = helixSequence.map(pointValue => getSliceAtPoint(pointValue, rotation).id);
    createPlaylist(type, chapterIds);
  };
  

  // --- Rotating Crown Drag & Momentum state & handlers ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartAngle = useRef(0);
  const dragStartRotation = useRef(0);
  const lastRotation = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const momentumAnimationFrameRef = useRef<number | null>(null);



  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setAnimationMode('off');
    if (momentumAnimationFrameRef.current) {
      cancelAnimationFrame(momentumAnimationFrameRef.current);
    }
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    
    dragStartAngle.current = Math.atan2(dy, dx) * (180 / Math.PI);
    dragStartRotation.current = rotation;
    lastRotation.current = rotation;
    lastTime.current = performance.now();
    velocity.current = 0;
  }, [rotation]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    
    const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    let angleDelta = currentAngle - dragStartAngle.current;
    
    if (angleDelta > 180) angleDelta -= 360;
    if (angleDelta < -180) angleDelta += 360;
    
    const newRotation = dragStartRotation.current + angleDelta;
    
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (newRotation - lastRotation.current) / dt;
    }
    
    lastRotation.current = newRotation;
    lastTime.current = now;
    
    setRotation(newRotation);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    let currentVelocity = velocity.current;
    const friction = 0.96;
    let currentRotation = rotation;
    let lastFrameTime = performance.now();
    
    const animateMomentum = () => {
      const now = performance.now();
      const dt = now - lastFrameTime;
      lastFrameTime = now;
      
      if (Math.abs(currentVelocity) > 0.015) {
        currentRotation += currentVelocity * dt;
        currentVelocity *= Math.pow(friction, dt / 16);
        setRotation(currentRotation);
        momentumAnimationFrameRef.current = requestAnimationFrame(animateMomentum);
      } else {
        // Snap to nearest index
        const sliceAngle = 360 / 114;
        const preciseIndex = -(currentRotation / sliceAngle) + 1;
        const rawIndex = Math.round(preciseIndex);
        const snappedIndex = ((rawIndex - 1) % 114 + 114) % 114 + 1;
        const targetRotation = -(snappedIndex - 1) * sliceAngle;
        
        // Smooth snap
        let snapProgress: number | null = null;
        const snapDuration = 200;
        const snapStartRotation = currentRotation;
        
        const animateSnap = (snapTime: number) => {
          if (snapProgress === null) snapProgress = snapTime;
          const progress = Math.min((snapTime - snapProgress) / snapDuration, 1);
          const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          const interpRotation = snapStartRotation + (targetRotation - snapStartRotation) * eased;
          setRotation(interpRotation);
          
          if (progress < 1) {
            momentumAnimationFrameRef.current = requestAnimationFrame(animateSnap);
          } else {
            setRotation(targetRotation);
          }
        };
        momentumAnimationFrameRef.current = requestAnimationFrame(animateSnap);
      }
    };
    
    if (Math.abs(currentVelocity) > 0.08) {
      momentumAnimationFrameRef.current = requestAnimationFrame(animateMomentum);
    } else {
      const sliceAngle = 360 / 114;
      const preciseIndex = -(rotation / sliceAngle) + 1;
      const rawIndex = Math.round(preciseIndex);
      const snappedIndex = ((rawIndex - 1) % 114 + 114) % 114 + 1;
      const targetRotation = -(snappedIndex - 1) * sliceAngle;
      
      let snapProgress: number | null = null;
      const animateSnap = (snapTime: number) => {
        if (snapProgress === null) snapProgress = snapTime;
        const progress = Math.min((snapTime - snapProgress) / 150, 1);
        const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        setRotation(rotation + (targetRotation - rotation) * eased);
        if (progress < 1) {
          momentumAnimationFrameRef.current = requestAnimationFrame(animateSnap);
        } else {
          setRotation(targetRotation);
        }
      };
      momentumAnimationFrameRef.current = requestAnimationFrame(animateSnap);
    }
  }, [isDragging, rotation, setRotation]);

  const handleCrownKeyDown = useCallback((e: React.KeyboardEvent) => {
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      delta = e.shiftKey ? 5 : 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      delta = e.shiftKey ? -5 : -1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      setRotation(0);
      return;
    } else if (e.key === 'End') {
      e.preventDefault();
      setRotation(-(113) * (360 / 114));
      return;
    } else {
      return;
    }
    
    e.preventDefault();
    setAnimationMode('off');
    
    // Calculate new index and target rotation
    const sliceAngle = 360 / 114;
    const preciseIndex = -(rotation / sliceAngle) + 1;
    let rawIndex = Math.round(preciseIndex);
    let snappedIndex = ((rawIndex - 1) % 114 + 114) % 114 + 1;
    
    const targetIdx = ((snappedIndex - 1 + delta) % 114 + 114) % 114 + 1;
    const targetRotation = -(targetIdx - 1) * sliceAngle;
    
    setRotation(targetRotation);
  }, [rotation, setRotation]);

  // Drag listeners
  useEffect(() => {
    if (!isDragging) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleMouseUp = () => {
      handleDragEnd();
    };
    
    const handleTouchEnd = () => {
      handleDragEnd();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Wheel listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleWheelGlobal = (e: WheelEvent) => {
      e.preventDefault();
      setAnimationMode('off');
      
      const delta = e.deltaY > 0 ? 1 : -1;
      
      const sliceAngle = 360 / 114;
      const preciseIndex = -(rotation / sliceAngle) + 1;
      let rawIndex = Math.round(preciseIndex);
      let snappedIndex = ((rawIndex - 1) % 114 + 114) % 114 + 1;
      
      const targetIdx = ((snappedIndex - 1 + delta) % 114 + 114) % 114 + 1;
      setRotation(-(targetIdx - 1) * sliceAngle);
    };
    
    container.addEventListener('wheel', handleWheelGlobal, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheelGlobal);
    };
  }, [rotation, setRotation]);

  // Dynamic 5-pointed star points generator for the 3D crown active indicator
  const getStarPoints = useCallback((scx: number, scy: number, srx: number, sry: number) => {
    const points = [];
    const spikes = 5;
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    for (let i = 0; i < spikes; i++) {
      points.push(`${scx + Math.cos(rot) * srx},${scy + Math.sin(rot) * sry}`);
      rot += step;
      points.push(`${scx + Math.cos(rot) * (srx * 0.4)},${scy + Math.sin(rot) * (sry * 0.4)}`);
      rot += step;
    }
    return points.join(" ");
  }, []);

  const currentSliceData = getSliceAtPoint(1, rotation);
  const currentSliceId = currentSliceData.id;
  // Safer lookup to avoid crash if CHAPTER_DETAILS array is inconsistent
  const chapterInfo = CHAPTER_DETAILS.find(c => c.number === currentSliceId);

  if (!chapterInfo) return <aside className="w-full lg:w-96 bg-black/30 lg:backdrop-blur-sm p-6 border-t lg:border-l lg:border-t-0 border-gray-700/50 flex flex-col space-y-4">Loading...</aside>;

  const isCurrentSliceMuqattat = MUQATTAT_CHAPTERS.has(currentSliceId);
  const iconSrc = getChapterIcon(chapterInfo.revelationType);
  const currentMuqattatLetters = MUQATTAT_LETTERS.get(currentSliceId);

  const isAnalyticalMode = isTreeOfVerseActive || isPieceOfBakaraActive;

  // 3D Elliptical Crown Geometry calculations (Increased size to utilize space fully)
  const crownCx = 50;
  const crownCy = 58;  // Center coordinate of ellipse (moved down slightly)
  const crownRx = 43;
  const crownRy = 12;

  const rotRad = rotation * (Math.PI / 180);

  // Resolution reduction step: step of 3 for low-resource (38 pillars), step of 2 for normal (57 pillars).
  // This drastically reduces SVG nodes and renders smooth as butter.
  const stepSize = isLowResourceMode ? 3 : 2;

  const crownPillars = STATIC_CROWN_DATA.filter(p => {
    // Always include the current active (focused) surah and the first surah for structural clarity
    if (p.k === currentSliceId || p.k === 1) return true;
    return (p.k - 1) % stepSize === 0;
  }).map(staticData => {
    const { k, baseAngleRad, h, color, verses } = staticData;
    const angleRad = baseAngleRad + rotRad;
    
    const px = crownCx + crownRx * Math.cos(angleRad);
    const py = crownCy + crownRy * Math.sin(angleRad);
    const tx = px;
    const ty = py - h;
    
    let dist = Math.abs(k - currentSliceId);
    if (dist > 57) dist = 114 - dist;
    
    const isWordActive = k === currentSliceId;
    const isActiveArc = dist <= 6;
    const opacity = isWordActive ? 1.0 : isActiveArc ? 0.9 : 0.45;
    
    return { k, px, py, tx, ty, color, isWordActive, opacity, verses, dist };
  });

  const activePillar = crownPillars.find(p => p.isWordActive) || (() => {
    const staticData = STATIC_CROWN_DATA[currentSliceId - 1];
    if (!staticData) return null;
    const { k, baseAngleRad, h, color, verses } = staticData;
    const angleRad = baseAngleRad + rotRad;
    const px = crownCx + crownRx * Math.cos(angleRad);
    const py = crownCy + crownRy * Math.sin(angleRad);
    return {
      k,
      px,
      py,
      tx: px,
      ty: py - h,
      color,
      isWordActive: true,
      opacity: 1.0,
      verses,
      dist: 0
    };
  })();

  const backPillars = crownPillars.filter(p => !p.isWordActive && p.py < crownCy);
  const frontPillars = crownPillars.filter(p => !p.isWordActive && p.py >= crownCy);

  return (
    <aside 
        id="side-panel-scroll-container"
        className="w-full lg:w-96 bg-black/30 lg:backdrop-blur-sm p-6 pb-24 lg:pb-6 border-t lg:border-l lg:border-t-0 border-gray-700/50 flex flex-col space-y-4 lg:overflow-y-auto scroll-smooth no-scrollbar"
    >
      {/* Sticky identification and playlist header - Hidden in Piece of Heifer and Tree of Verse modes */}
      {!isAnalyticalMode && (
          <div className="sticky top-4 z-50 bg-black/80 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-2xl shadow-cyan-900/20 transition-all duration-300 p-4 mb-6">
              <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[125px_1fr] gap-4 items-center">
                  {/* Left Column: Rotating Crown Container */}
                  <div 
                      ref={containerRef}
                      className="w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] relative select-none outline-none focus-within:ring-1 focus-within:ring-cyan-500/40 rounded-full bg-slate-950/20 border border-slate-800/40 p-1.5 cursor-grab active:cursor-grabbing flex items-center justify-center"
                      onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
                      onTouchStart={(e) => {
                          if (e.touches.length > 0) {
                              handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
                          }
                      }}
                      onKeyDown={handleCrownKeyDown}
                      tabIndex={0}
                      role="slider"
                      aria-valuenow={currentSliceId}
                      aria-valuemin={1}
                      aria-valuemax={114}
                      aria-label={`114-Jewel Rotating Crown Quranic Surah Navigator. Current surah: ${chapterInfo.number}, ${chapterInfo.englishName}`}
                  >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                              <filter id="crown-glow" x="-20%" y="-20%" width="140%" height="140%">
                                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                          </defs>

                          {/* Base elliptical tracking grids */}
                          <ellipse cx={crownCx} cy={crownCy} rx={crownRx} ry={crownRy} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          <ellipse cx={crownCx} cy={crownCy} rx={crownRx + 1} ry={crownRy + 0.3} fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="0.5" strokeDasharray="1,2" />

                          {/* 1. LAYER ONE: Back Pillars (drawn first so they sit in background behind text) */}
                          {backPillars.map(p => (
                              <g key={p.k} style={{ opacity: p.opacity }}>
                                  <line
                                      x1={p.px}
                                      y1={p.py}
                                      x2={p.tx}
                                      y2={p.ty}
                                      stroke={p.color}
                                      strokeWidth={1.4}
                                      strokeLinecap="round"
                                  />
                                  {!isLowResourceMode && (
                                      <circle
                                          cx={p.tx}
                                          cy={p.ty}
                                          r={1.6}
                                          fill={p.color}
                                      />
                                  )}
                              </g>
                          ))}

                          {/* 2. LAYER TWO: Center Void Container Background and Text */}
                          <ellipse cx={crownCx} cy={crownCy} rx={23} ry={8.5} fill="#020617" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="0.5" />
                          
                          {/* Selected Surah - chapter:total_verses format */}
                          <text 
                              x="50" 
                              y={crownCy - 2.2} 
                              textAnchor="middle" 
                              dominantBaseline="central" 
                              fill="#ffcc00" 
                              style={{ fontSize: '7.8px', fontFamily: 'monospace', fontWeight: 900, letterSpacing: '-0.02em' }} 
                              className={isLowResourceMode ? "" : "drop-shadow-[0_0_3px_rgba(255,204,0,0.6)]"}
                          >
                              {currentSliceId}<tspan fill="#ffffff" opacity={0.8}>:</tspan>{BUBBLE_BLOCK_MAPPING_RAW[currentSliceId as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0}
                          </text>
                          
                          {/* Chapter Identification underneath */}
                          <text 
                              x="50" 
                              y={crownCy + 3.2} 
                              textAnchor="middle" 
                              dominantBaseline="central" 
                              fill="#94a3b8" 
                              style={{ fontSize: '3.8px', fontFamily: 'sans-serif', fontWeight: 500, letterSpacing: '0.01em' }}
                          >
                              {chapterInfo.transliteration}
                          </text>

                          {/* 3. LAYER THREE: Front Pillars (drawn third so they sit on top of the text center void) */}
                          {frontPillars.map(p => (
                              <g key={p.k} style={{ opacity: p.opacity }}>
                                  <line
                                      x1={p.px}
                                      y1={p.py}
                                      x2={p.tx}
                                      y2={p.ty}
                                      stroke={p.color}
                                      strokeWidth={1.4}
                                      strokeLinecap="round"
                                  />
                                  {!isLowResourceMode && (
                                      <circle
                                          cx={p.tx}
                                          cy={p.ty}
                                          r={1.6}
                                          fill={p.color}
                                      />
                                  )}
                              </g>
                          ))}

                          {/* 4. LAYER FOUR: Currently active highlighted pillar and Golden Star */}
                          {activePillar && (
                              <g style={{ opacity: 1.0 }}>
                                  <line
                                      x1={activePillar.px}
                                      y1={activePillar.py}
                                      x2={activePillar.tx}
                                      y2={activePillar.ty}
                                      stroke={activePillar.color}
                                      strokeWidth={2.4}
                                      strokeLinecap="round"
                                      filter={isLowResourceMode ? undefined : "url(#crown-glow)"}
                                  />
                                  <polygon
                                      points={getStarPoints(activePillar.tx, activePillar.ty, 4.5, 4.5)}
                                      fill={activePillar.color}
                                      stroke="#ffffff"
                                      strokeWidth="0.5"
                                      style={{ filter: isLowResourceMode ? undefined : `drop-shadow(0 0 4px ${activePillar.color})` }}
                                  />
                                </g>
                          )}

                          {/* 5. LAYER FIVE: Fixed Top Pointer Arrow */}
                          <polygon points="48.5,19 51.5,19 50,23" fill="#22d3ee" className={isLowResourceMode ? "" : "drop-shadow-[0_0_3px_#22d3ee]"} opacity={0.9} />
                      </svg>
                  </div>

                  {/* Right Column: Surah metadata and playlist commands */}
                  <div className="flex flex-col justify-between py-1 min-w-0">
                      {/* Section 1: Header */}
                      <div className="flex flex-col leading-tight">
                          <div className="flex items-center gap-x-1.5 w-full min-w-0">
                              <img src={iconSrc} alt={chapterInfo.revelationType} title={chapterInfo.revelationType} className="w-3.5 h-3.5 drop-shadow shrink-0" />
                              <span className={`text-[14px] font-black tracking-tight text-cyan-300 drop-shadow-sm truncate leading-snug ${isCurrentSliceMuqattat ? 'muqattat-glow' : ''}`} title={`${chapterInfo.number}. ${chapterInfo.englishName}`}>
                                  {chapterInfo.number}. {chapterInfo.englishName}
                              </span>
                          </div>
                          <div className="flex flex-col mt-0.5 w-full min-w-0">
                              <span className="text-[10px] font-normal italic text-gray-400 truncate">
                                  ({chapterInfo.transliteration})
                              </span>
                              {currentMuqattatLetters && (
                                  <span className="text-[11px] font-semibold muqattat-glow text-white tracking-widest mt-0.5" dir="rtl">
                                      {currentMuqattatLetters.join(' ')}
                                  </span>
                              )}
                          </div>
                      </div>

                      {/* Line divider */}
                      <div className="w-full h-px bg-cyan-500/20 my-2.5"></div>

                      {/* Section 2: Actions & Rotation Control */}
                      <div className="flex items-center space-x-1.5 shrink-0">
                          <PlaylistButtons onWatch={handleWatchSequence} />
                          <button
                              onClick={() => setRotation(0)}
                              className="bg-slate-700/80 hover:bg-slate-600 border border-slate-600/50 hover:border-slate-400 text-white font-bold rounded-md transition-colors duration-200 shadow-md backdrop-blur-md flex items-center justify-center h-[26px] w-[26px] [&>svg]:w-3.5 [&>svg]:h-3.5 shrink-0"
                              aria-label="Reset rotation"
                              title="Reset to Al-Fatiha"
                          >
                              <RotateCcwIcon />
                          </button>
                      </div>
                  </div>
              </div>
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
            <div className="space-y-4">
                <div className="flex items-center gap-x-3 px-2">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-500 to-transparent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                    <div>
                        <h2 className="text-cyan-400 font-black text-xl uppercase tracking-tight leading-none">The Mursalin Path</h2>
                        <p className="text-cyan-900 text-[10px] uppercase font-bold tracking-widest mt-1">2:41 Warning & Pharaonic Centrifuge</p>
                    </div>
                </div>
                <TreeOfVerse 
                    rotation={rotation} 
                    onVerseSelect={onVerseSelect}
                    onBulkExport={onBulkExport}
                    treeRootVerse={treeRootVerse}
                    setTreeRootVerse={setTreeRootVerse}
                    treeTrines={treeTrines}
                />
            </div>
         ) : isPieceOfBakaraActive ? (
            <div className="space-y-4">
                <div className="flex items-center gap-x-3 px-2">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-pink-500 to-transparent rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
                    <div>
                        <h2 className="text-pink-400 font-black text-xl uppercase tracking-tight leading-none">The 2 ↔ 3 ↔ 2 → 7 Pulse</h2>
                        <p className="text-pink-900 text-[10px] uppercase font-bold tracking-widest mt-1">Day, Night, and Shadow Chromosome</p>
                    </div>
                </div>
                <PieceOfBakara 
                    onVerseSelect={onVerseSelect}
                    onBulkExport={onBulkExport}
                    bakaraSpineIndex={bakaraSpineIndex}
                    setBakaraSpineIndex={setBakaraSpineIndex}
                />
            </div>
         ) : (
            <div className="space-y-8">
                <div>
                   <div className="flex items-center gap-x-2 mb-4 opacity-40">
                       <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                       <span className="text-[8px] uppercase tracking-[0.4em] font-black text-cyan-500">Geometric Matrix</span>
                       <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                   </div>
                   <ChapterGeometry 
                        rotation={rotation}
                        isLowResourceMode={isLowResourceMode}
                        isSpinning={isSpinning}
                        showFunctionalTooltip={showFunctionalTooltip}
                        hideTooltip={hideTooltip}
                        setCustomSequence={setCustomSequence}
                        setAnimationMode={setAnimationMode}
                    />
                </div>

                <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-x-2 mb-4 opacity-40">
                       <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                       <span className="text-[8px] uppercase tracking-[0.4em] font-black text-cyan-500">Celestial Resonator</span>
                       <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                    </div>
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
                </div>
                
                {isSecretModeActive && (
                    <div className="space-y-8 pt-4 border-t border-cyan-500/10">
                        <div>
                             <div className="flex items-center gap-x-2 mb-4">
                                <span className="text-[8px] uppercase tracking-[0.4em] font-black text-amber-500/60">Clock of the Covenant</span>
                                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/20"></div>
                             </div>
                            <KatharaClockAlignment
                                rotation={rotation}
                                createPlaylist={createPlaylist}
                                setCustomSequence={setCustomSequence}
                                setAnimationMode={setAnimationMode}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2 mb-4">
                                <span className="text-[8px] uppercase tracking-[0.25em] font-black text-fuchsia-500/80">Entanglement -vs- Fabrication</span>
                                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-fuchsia-500/20"></div>
                             </div>
                            <SephirotAlignment
                                rotation={rotation}
                                createPlaylist={createPlaylist}
                                setCustomSequence={setCustomSequence}
                                setAnimationMode={setAnimationMode}
                                activeTab={sephirotTab}
                                onTabChange={setSephirotTab}
                            />
                        </div>
                    </div>
                )}
            </div>
         )}
      </div>
    </aside>
  );
};

export default SidePanel;
