
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { KATHARA_GRID_NODES, KATHARA_GRID_LINES, KATHARA_CLOCK_POINTS, CHAPTER_DETAILS, MUQATTAT_CHAPTERS, MUQATTAT_LETTERS } from '../constants.ts';
import { getSliceAtPoint } from '../utils.ts';

interface TreeOfLifeModeProps {
  rotation: number;
  onClose: () => void;
}

const PRESET_1 = [
  "Book", "Chosen One | Rasul", "Sign", "Prophet", "Challenge | Rescue", "Curse", 
  "Blessed Land", "Believer | Servant", "Suhuf", "Teacher", "Witness | Driver", "Stone"
];

const PRESET_2 = [
  "Ibrahim | Ahmed",
  "Ishac | Ishmail",
  "Heifer",
  "Stone",
  "Boat | Bee",
  "Noah | Musa",
  "Idris | Isa",
  "Tree | Mountain",
  "Amanah",
  "Return",
  "Solomon | Dawud",
  "Book | Yahya"
];

const PRESET_3 = [
  "Ibrahim | Ahmed",
  "Ishac | Ishmail",
  "Rushd",
  "Stone",
  "Iron | Wood",
  "Noah | Musa",
  "Idris | Isa",
  "Iron | Mountain",
  "Amanah",
  "Dawud",
  "Solomon | Death",
  "Book | Yahya"
];

interface BifurcationStage {
  main: number[];
  manualLines: [number, number][];
  isBlackPhase?: boolean;
}

const TreeOfLifeMode: React.FC<TreeOfLifeModeProps> = ({ rotation, onClose }) => {
  const [labels, setLabels] = useState<string[]>(Array(12).fill(''));
  const [labelOffset, setLabelOffset] = useState(0); 
  const [isCycling, setIsCycling] = useState(false);
  const [activeMode, setActiveMode] = useState<'linear' | 'bifurcation'>('linear');
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  
  const [showLightning, setShowLightning] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  // Domain Node Sets
  const BLUE_NODES = [1, 2, 3, 4, 5, 6, 13];
  const GREEN_NODES = [12, 11, 10, 9, 8, 7, 15];

  const LOOP_LINES: [number, number][] = [[2, 3], [3, 6], [6, 9], [9, 11], [11, 10], [10, 7], [7, 4], [4, 2]];
  const BOLT_3_10_LINES: [number, number][] = [[3, 13], [4, 13], [4, 5], [5, 6], [6, 14], [7, 14], [7, 8], [8, 9], [9, 15], [10, 15]];
  const BOLT_4_9_LINES: [number, number][] = [[4, 5], [5, 6], [6, 14], [7, 14], [7, 8], [8, 9]];
  const PATH_5_8_LINES: [number, number][] = [[5, 6], [6, 14], [7, 14], [7, 8]];
  const CROSS_PLUS_LINES: [number, number][] = [[6, 14], [7, 14], [5, 14], [14, 8], [6, 7], [5, 8]];
  
  const DUAL_GROUP_LINES: [number, number][] = [
    [1, 2], [2, 3], [2, 4], [2, 13], [3, 13], [4, 13], [3, 5], [4, 5], [5, 6], [3, 6], [13, 5],
    [12, 11], [11, 10], [11, 9], [9, 15], [10, 15], [15, 8], [8, 9], [8, 10], [7, 8], [7, 10], [15, 11]
  ];
  const SQUARE_PLUS_LINES: [number, number][] = [[5, 6], [5, 7], [6, 8], [7, 8], [6, 14], [14, 7], [5, 14], [14, 8]];

  const BIFURCATION_STAGES: BifurcationStage[] = useMemo(() => [
    { main: [1, 12], manualLines: [], isBlackPhase: true },
    { main: [2, 11], manualLines: LOOP_LINES },
    { main: [3, 10], manualLines: BOLT_3_10_LINES },
    { main: [4, 9],  manualLines: BOLT_4_9_LINES },
    { main: [5, 8],  manualLines: PATH_5_8_LINES },
    { main: [6, 7],  manualLines: CROSS_PLUS_LINES },
    { main: [12, 1], manualLines: DUAL_GROUP_LINES },
    { main: [11, 2], manualLines: LOOP_LINES },
    { main: [3, 10], manualLines: BOLT_3_10_LINES },
    { main: [4, 9],  manualLines: BOLT_4_9_LINES },
    { main: [5, 8],  manualLines: PATH_5_8_LINES },
    { main: [6, 7],  manualLines: SQUARE_PLUS_LINES },
  ], []);

  const handleSyncFromWheel = (mode: 'full' | 'title') => {
    const newLabels = KATHARA_CLOCK_POINTS.map(pointValue => {
        const slice = getSliceAtPoint(pointValue, rotation);
        const chapterInfo = CHAPTER_DETAILS.find(c => c.number === slice.id);
        const title = chapterInfo?.englishName || 'Unknown';
        const letters = MUQATTAT_LETTERS.get(slice.id)?.join(' ') || '';
        if (mode === 'title') return `${title}${letters ? ` | ${letters}` : ''}`;
        return `${slice.id} ${title}${letters ? ` | ${letters}` : ''}`;
    });
    setLabels(newLabels);
    setLabelOffset(0);
  };

  const handlePreset = (num: number) => {
    setLabelOffset(0);
    setHighlightedNodes([]);
    setIsCycling(false);
    if (num === 0) setLabels(Array(12).fill(''));
    else if (num === 1) setLabels([...PRESET_1]);
    else if (num === 2) setLabels([...PRESET_2]);
    else if (num === 3) setLabels([...PRESET_3]);
  };

  const updateVisuals = useCallback((offset: number) => {
    if (activeMode === 'linear') setHighlightedNodes([offset + 1]);
    else setHighlightedNodes(BIFURCATION_STAGES[offset].main);
  }, [activeMode, BIFURCATION_STAGES]);

  const handleShift = useCallback((direction: 'up' | 'down') => {
    setLabelOffset((prev) => {
      const next = direction === 'up' ? (prev + 1) % 12 : (prev - 1 + 12) % 12;
      if (activeMode === 'bifurcation') {
        if (prev === 11 && next === 0) { setShowLightning(true); setTimeout(() => setShowLightning(false), 800); }
        if (prev === 5 && next === 6) { setShowExplosion(true); setTimeout(() => setShowExplosion(false), 1200); }
      }
      updateVisuals(next);
      return next;
    });
  }, [updateVisuals, activeMode]);

  useEffect(() => { updateVisuals(labelOffset); }, [activeMode, updateVisuals, labelOffset]);

  useEffect(() => {
    if (!isCycling) return;
    const intervalId = window.setInterval(() => { handleShift('up'); }, 1800);
    return () => clearInterval(intervalId);
  }, [isCycling, handleShift]);

  const updateLabel = (index: number, val: string) => {
    const next = [...labels];
    next[index] = val;
    setLabels(next);
  };

  const getLineStatus = useCallback((from: number, to: number, h: number[], offset: number) => {
    if (activeMode === 'linear') {
      const nodeId = h[0];
      return from === nodeId || to === nodeId ? 'main' : null;
    }
    const stage = BIFURCATION_STAGES[offset];
    if (stage.isBlackPhase) return 'black';
    const isManual = stage.manualLines?.some(l => (l[0] === from && l[1] === to) || (l[0] === to && l[1] === from));
    return isManual ? 'main' : null;
  }, [activeMode, BIFURCATION_STAGES]);

  const getDisplayIdx = useCallback((nodeIdx: number, offset: number, mode: 'linear' | 'bifurcation') => {
    if (mode === 'linear') return (nodeIdx - offset + 12) % 12;
    const step = offset % 6;
    const hasCrossed = offset >= 6;
    if (nodeIdx < 6) return hasCrossed ? (nodeIdx - step + 6) % 6 + 6 : (nodeIdx - step + 6) % 6;
    return hasCrossed ? (11 - nodeIdx - step + 6) % 6 : (11 - nodeIdx - step + 6) % 6 + 6;
  }, []);

  const renderDiagram = () => {
    const isPhase2or8 = activeMode === 'bifurcation' && (labelOffset === 1 || labelOffset === 7);
    const extraSilverLines = isPhase2or8 ? [[9, 7], [6, 4]] : [];

    return (
      <div className="relative flex items-center justify-center bg-black/80 overflow-hidden h-full w-full rounded-2xl lg:rounded-none">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-cyan-950/10 blur-[100px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80"></div>
        </div>

        <style>{`
          .node-glow { filter: drop-shadow(0 0 15px currentColor); }
          .kathara-svg { width: 100%; height: 100%; display: block; max-height: 90vh; }
          .junction-box { stroke-width: 1; fill: rgba(0, 0, 0, 0.85); stroke: rgba(255, 255, 255, 0.1); }
          .active-junction { stroke: #fff; stroke-width: 1.5; fill: rgba(8, 145, 178, 0.3); }
          .filter-junction { stroke: #06b6d4; fill: rgba(0, 30, 40, 0.9); }
          
          @keyframes flow-up { 0% { stroke-dashoffset: 40; } 100% { stroke-dashoffset: 0; } }
          @keyframes flow-down { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 40; } }
          @keyframes flow-silver { 0% { stroke-dashoffset: 40; } 100% { stroke-dashoffset: 0; } }
          
          .liquid-blue-flow { stroke-dasharray: 0.1, 14; stroke-linecap: round; animation: flow-up 1.6s linear infinite; filter: drop-shadow(0 0 6px #06b6d4); }
          .liquid-green-flow { stroke-dasharray: 0.1, 14; stroke-linecap: round; animation: flow-down 1.6s linear infinite; filter: drop-shadow(0 0 6px #4ade80); }
          .liquid-silver-flow { stroke-dasharray: 0.1, 14; stroke-linecap: round; animation: flow-silver 1.6s linear infinite; filter: drop-shadow(0 0 6px #cbd5e1); }
          
          @keyframes spark { 0%, 100% { opacity: 0; stroke-width: 1; } 20% { opacity: 1; stroke-width: 4; } 60% { opacity: 1; stroke-width: 2; } }
          .lightning-bolt { stroke: #fff; filter: drop-shadow(0 0 12px cyan); animation: spark 0.25s infinite; }
          
          @keyframes blast { 0% { transform: scale(0); opacity: 1; filter: blur(0px); } 50% { transform: scale(3); opacity: 0.5; filter: blur(5px); } 100% { transform: scale(4.5); opacity: 0; filter: blur(10px); } }
          .fire-burst { fill: #f97316; animation: blast 0.8s ease-out forwards; }
        `}</style>

        <svg viewBox="-75 -20 300 320" className="kathara-svg drop-shadow-[0_0_80px_rgba(6,182,212,0.15)]">
          <defs>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          <g>
            {KATHARA_GRID_LINES.map((line, index) => {
              const fromNode = KATHARA_GRID_NODES.find(n => n.id === line.from);
              const toNode = KATHARA_GRID_NODES.find(n => n.id === line.to);
              if (!fromNode || !toNode) return null;
              
              const status = getLineStatus(line.from, line.to, highlightedNodes, labelOffset);
              const isMain = status === 'main';
              const isAscending = fromNode.y > toNode.y;

              const isBlueDomain = (BLUE_NODES.includes(line.from) && BLUE_NODES.includes(line.to)) || 
                                  ((line.from === 14 || line.to === 14) && (BLUE_NODES.includes(line.from) || BLUE_NODES.includes(line.to)));
              
              const isGreenDomain = (GREEN_NODES.includes(line.from) && GREEN_NODES.includes(line.to)) || 
                                   ((line.from === 14 || line.to === 14) && (GREEN_NODES.includes(line.from) || GREEN_NODES.includes(line.to)));

              const isPhase12 = activeMode === 'bifurcation' && labelOffset === 11;
              const isSilverLine = isPhase12 && (
                (line.from === 6 && line.to === 8) || (line.from === 8 && line.to === 6) ||
                (line.from === 8 && line.to === 7) || (line.from === 7 && line.to === 8) ||
                (line.from === 7 && line.to === 5) || (line.from === 5 && line.to === 7) ||
                (line.from === 5 && line.to === 6) || (line.from === 6 && line.to === 5)
              );

              const showBlue = activeMode === 'linear' ? isMain : (isMain && isBlueDomain && !isSilverLine);
              const showGreen = activeMode === 'linear' ? isMain : (isMain && isGreenDomain && !isSilverLine);
              const showSilver = isMain && isSilverLine;

              const dx = toNode.x - fromNode.x;
              const dy = toNode.y - fromNode.y;
              const len = Math.sqrt(dx*dx + dy*dy);
              const nx = -dy / (len || 1);
              const ny = dx / (len || 1);
              const offsetDist = activeMode === 'linear' ? 2.0 : 0;

              return (
                <g key={index}>
                  <line 
                    x1={fromNode.x} y1={fromNode.y} 
                    x2={toNode.x} y2={toNode.y} 
                    stroke={isMain ? (isSilverLine ? "rgba(203,213,225,0.2)" : "rgba(255,255,255,0.12)") : status === 'black' ? "#0a0a0a" : "rgba(255,255,255,0.04)"}
                    strokeWidth={isMain ? 4 : 1}
                    className="transition-all duration-700"
                  />
                  {showBlue && <line x1={(isAscending ? fromNode.x : toNode.x) + nx * offsetDist} y1={(isAscending ? fromNode.y : toNode.y) + ny * offsetDist} x2={(isAscending ? toNode.x : fromNode.x) + nx * offsetDist} y2={(isAscending ? toNode.y : fromNode.y) + ny * offsetDist} stroke="#06b6d4" strokeWidth="3.5" className="liquid-blue-flow" />}
                  {showGreen && <line x1={(isAscending ? toNode.x : fromNode.x) - nx * offsetDist} y1={(isAscending ? toNode.y : fromNode.y) - ny * offsetDist} x2={(isAscending ? fromNode.x : toNode.x) - nx * offsetDist} y2={(isAscending ? fromNode.y : toNode.y) - ny * offsetDist} stroke="#4ade80" strokeWidth="3.5" className="liquid-green-flow" />}
                  {showSilver && <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke="#cbd5e1" strokeWidth="3.5" className="liquid-silver-flow" />}
                </g>
              );
            })}
            {extraSilverLines.map(([fromId, toId], idx) => {
              const f = KATHARA_GRID_NODES.find(n => n.id === fromId);
              const t = KATHARA_GRID_NODES.find(n => n.id === toId);
              if (!f || !t) return null;
              return (
                <g key={`extra-silver-${idx}`}>
                  <line x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="rgba(203,213,225,0.4)" strokeWidth="3" />
                  <line x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="#cbd5e1" strokeWidth="3.5" className="liquid-silver-flow" />
                </g>
              );
            })}
          </g>

          {showLightning && (
            <g className="pointer-events-none">
              <path d="M 75 20 L 95 60 L 55 100 L 75 140" fill="none" className="lightning-bolt" />
              <path d="M 30 140 L 55 170 L 35 200 L 75 240" fill="none" className="lightning-bolt" />
              <path d="M 120 140 L 95 170 L 115 200 L 75 240" fill="none" className="lightning-bolt" />
            </g>
          )}

          {showExplosion && (
            <g transform="translate(75, 140)" className="pointer-events-none">
              <circle r="12" className="fire-burst" />
              <circle r="8" className="fire-burst" style={{ animationDelay: '0.1s' }} />
            </g>
          )}

          {KATHARA_GRID_NODES.map((node, nodeIdx) => {
            const isFilter = node.id > 12;
            const isHighlighted = highlightedNodes.includes(node.id);
            const displayLabelIdx = isFilter ? -1 : getDisplayIdx(nodeIdx, labelOffset, activeMode);
            const rawLabel = isFilter ? '' : labels[displayLabelIdx];
            
            const filterFullLabel = node.id === 13 ? '△108⚡' : node.id === 14 ? '🔥103🐟' : node.id === 15 ? '⚫110🌳' : null;
            
            const labelParts = rawLabel ? rawLabel.split('|').map(p => p.trim()) : [];
            const hasMultiple = labelParts.length > 1;
            const isSpineNode = node.x === 75 && node.id <= 12; 
            const isLeftSide = node.x < 75;

            return (
              <g key={node.id} className="transition-all duration-500">
                {isFilter ? (
                  <g>
                    {isHighlighted && <rect x={node.x-28} y={node.y-12} width="56" height="24" rx="4" fill="rgba(6,182,212,0.15)" className="animate-pulse" />}
                    <rect x={node.x-25} y={node.y-10} width="50" height="20" rx="3" className={`filter-junction ${isHighlighted ? 'active-junction node-glow' : ''}`} style={{ color: '#06b6d4' }} />
                    <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fontSize="7.5" fontWeight="900" fill={isHighlighted ? "#fff" : "#0891b2"} className="font-mono tracking-tighter" style={{ pointerEvents: 'none' }}>
                      {filterFullLabel}
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x={node.x-14} y={node.y-14} width="28" height="28" rx="6" className={`junction-box ${isHighlighted ? 'active-junction node-glow' : ''}`} style={{ color: '#fff' }} />
                    {isHighlighted && <circle cx={node.x} cy={node.y} r={22} fill="url(#activeGrad)" opacity="0.1" className="animate-pulse" />}
                    <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fontSize="8" fontWeight="black" fill={isHighlighted ? "#fff" : "#555"}>{node.id}</text>
                    {rawLabel && (
                      <g className="pointer-events-none">
                         {isSpineNode && hasMultiple ? (
                          <>
                            <rect x={node.x - 76} y={node.y - 9} width="58" height="18" rx="4" fill="rgba(0,0,0,0.85)" stroke={isHighlighted ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.05)"} />
                            <text x={node.x - 22} y={node.y} textAnchor="end" dominantBaseline="middle" fontSize="7.5" fontWeight="900" fill={isHighlighted ? "#fff" : "#4ade80"} className="font-mono uppercase tracking-tighter">{labelParts[0]}</text>
                            <rect x={node.x + 18} y={node.y - 9} width="58" height="18" rx="4" fill="rgba(0,0,0,0.85)" stroke={isHighlighted ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.05)"} />
                            <text x={node.x + 22} y={node.y} textAnchor="start" dominantBaseline="middle" fontSize="7.5" fontWeight="900" fill={isHighlighted ? "#fff" : "#4ade80"} className="font-mono uppercase tracking-tighter">{labelParts[1]}</text>
                          </>
                         ) : (
                          <g>
                             <rect x={isLeftSide ? node.x - 76 : node.x + 18} y={node.y - (hasMultiple ? 14 : 9)} width="58" height={hasMultiple ? 28 : 18} rx="4" fill="rgba(0,0,0,0.85)" stroke={isHighlighted ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.05)"} />
                             <text x={isLeftSide ? node.x - 22 : node.x + 22} y={node.y} textAnchor={isLeftSide ? "end" : "start"} dominantBaseline="middle" fontSize="7.5" fontWeight="900" fill={isHighlighted ? "#fff" : "#4ade80"} className="font-mono uppercase tracking-tighter">
                               {hasMultiple ? (<><tspan x={isLeftSide ? node.x - 22 : node.x + 22} dy="-0.5em">{labelParts[0]}</tspan><tspan x={isLeftSide ? node.x - 22 : node.x + 22} dy="1.1em">{labelParts[1]}</tspan></>) : rawLabel}
                             </text>
                          </g>
                         )}
                      </g>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col lg:flex-row bg-[#02040a] animate-in fade-in zoom-in duration-500 overflow-y-auto lg:overflow-hidden no-scrollbar">
      <aside className="w-full lg:w-[420px] p-6 lg:p-8 lg:h-full lg:overflow-y-auto border-b lg:border-r border-white/10 flex flex-col space-y-4 md:space-y-6 bg-black/40 backdrop-blur-xl shrink-0 custom-scrollbar">
        <div className="flex justify-between items-start shrink-0">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic leading-tight">
              Photosynthesis:
              <span className="block text-[10px] md:text-sm font-bold tracking-widest text-cyan-400 mt-1 not-italic">
                Harvesting Love and Intelligence in Form
              </span>
            </h2>
            <div className="flex flex-wrap gap-1.5 mt-2">
               {[0, 1, 2, 3].map(n => (
                 <button key={n} onClick={() => handlePreset(n)} className={`w-8 h-8 md:w-9 md:h-9 rounded-lg border font-black text-[9px] md:text-[10px] transition-all ${n === 0 ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-cyan-950/20 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black'}`}>
                   {n === 0 ? 'CLR' : `P${n}`}
                 </button>
               ))}
               <button onClick={() => handleSyncFromWheel('full')} className="px-2 md:px-3 h-8 md:h-9 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-black text-[9px] md:text-[10px] hover:bg-emerald-500 hover:text-black transition-all">SYNC 1</button>
               <button onClick={() => handleSyncFromWheel('title')} className="px-2 md:px-3 h-8 md:h-9 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-black text-[9px] md:text-[10px] hover:bg-emerald-500 hover:text-black transition-all">SYNC 2</button>
            </div>
          </div>
          <button onClick={onClose} className="p-2 md:p-3 rounded-2xl bg-white/5 text-gray-400 hover:text-white transition-all hover:bg-white/10 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {labels.map((label, idx) => {
            let mappedNodeId = -1;
            for(let ni=0; ni<12; ni++) {
              if(getDisplayIdx(ni, labelOffset, activeMode) === idx) {
                mappedNodeId = ni + 1;
                break;
              }
            }
            const isCurrentlyActive = highlightedNodes.includes(mappedNodeId);

            return (
              <div key={idx} className={`group relative p-0.5 transition-all duration-300 ${isCurrentlyActive ? 'scale-[1.01] md:scale-[1.02]' : ''}`}>
                <div className="flex justify-between items-end mb-1 px-1">
                  <label className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-black block">Leaf {idx + 1}</label>
                </div>
                <input 
                  type="text" value={label} onChange={(e) => updateLabel(idx, e.target.value)} placeholder={`Terminal input ${idx + 1}...`}
                  className={`w-full bg-white/5 border rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-medium focus:bg-cyan-950/10 outline-none transition-all placeholder-gray-800 ${isCurrentlyActive ? 'border-cyan-500/50 text-white' : 'border-white/5 text-cyan-50/70'}`}
                />
              </div>
            );
          })}
        </div>

        <div className="pt-4 md:pt-6 border-t border-white/5 space-y-3 md:space-y-4 shrink-0 pb-6 bg-black/20 -mx-6 md:-mx-8 px-6 md:px-8">
          <div className="flex justify-between items-baseline px-1">
            <h3 className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Flow of Life</h3>
            <span className="font-mono text-[10px] md:text-[11px] text-cyan-500 px-2 py-0.5 rounded bg-cyan-950/30">Phase: {labelOffset + 1}</span>
          </div>
          <div className="flex p-1 bg-white/5 rounded-xl md:rounded-2xl gap-1">
            <button onClick={() => { setActiveMode('linear'); setIsCycling(false); }} className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black tracking-widest transition-all ${activeMode === 'linear' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-gray-400'}`}>LINEAR</button>
            <button onClick={() => { setActiveMode('bifurcation'); setIsCycling(false); }} className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black tracking-widest transition-all ${activeMode === 'bifurcation' ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/20' : 'text-gray-400'}`}>BIFURCATE</button>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <button onClick={() => handleShift('down')} className="bg-white/5 hover:bg-cyan-500/10 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/5 text-base md:text-lg font-black tracking-widest transition-all uppercase">-</button>
            <button onClick={() => handleShift('up')} className="bg-white/5 hover:bg-cyan-500/10 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/5 text-base md:text-lg font-black tracking-widest transition-all uppercase">+</button>
          </div>
          <button onClick={() => setIsCycling(!isCycling)} className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl border font-black text-[10px] md:text-[11px] tracking-[0.2em] transition-all uppercase ${isCycling ? 'bg-red-600 text-white shadow-xl' : 'bg-cyan-600/10 text-cyan-400 border-cyan-500/20 hover:border-cyan-500/50'}`}>
            {isCycling ? 'Stop Stream' : `Animate Stream`}
          </button>
        </div>
      </aside>
      
      <main className="flex-1 w-full flex items-center justify-center p-4 lg:p-8 lg:h-full lg:overflow-hidden">
        <div className="w-full h-full max-w-4xl flex items-center justify-center">
          {renderDiagram()}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TreeOfLifeMode;
