
import React, { useState, useEffect, useMemo } from 'react';

interface InstructionPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const AnimatedHarvest: React.FC = () => {
  const [stage, setStage] = useState(0);
  const stages = useMemo(() => [
    { text: 'Knowledge', color: 'text-cyan-400', icon: '⚡' },
    { text: 'Mercy', color: 'text-blue-300', icon: '🌧️' },
    { text: 'Life', color: 'text-emerald-400', icon: '🌱' },
    { text: 'Righteousness', color: 'text-green-500', icon: '🍃' },
    { text: 'Sacrifice', color: 'text-amber-500', icon: '🍯' },
    { text: 'Purity', color: 'text-fuchsia-300', icon: '🦋' },
    { text: 'Intelligence in Form', color: 'text-white', icon: '⚪' },
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center rounded-[3rem] bg-gray-950/20 border border-white/5">
      
      {/* Welcome Badge */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] bg-cyan-950/20 animate-pulse">
           Salam • Peace
        </div>
        <p className="text-gray-500 text-xs tracking-widest uppercase mt-3">Welcome, Seeker of Light.</p>
      </div>

      {/* Narrative Container */}
      <div className="text-center">
        {/* Static Anchor */}
        <h3 className="text-2xl md:text-4xl font-light text-gray-400 tracking-tight">
          The Universe exists to <span className="font-bold text-white">harvest</span>
        </h3>
        
        {/* DYNAMIC TYPOGRAPHY STAGE */}
        <div className="relative h-24 md:h-32 mt-2 flex items-center justify-center px-8 overflow-hidden min-w-[300px]">
          
          {/* Visual Effect Layer - Strictly limited to this dynamic box */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Stage 0: Knowledge (Lightning) */}
            {stage === 0 && (
              <div className="absolute inset-0 animate-lightning-burst opacity-40">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M50 0 L48 40 L52 35 L49 70 L53 65 L50 100" fill="none" stroke="cyan" strokeWidth="0.8" className="animate-draw-fast" />
                </svg>
              </div>
            )}

            {/* Stage 1: Mercy (Rain) */}
            {stage === 1 && (
              <div className="absolute inset-0 flex flex-col items-center">
                 <div className="flex gap-4 opacity-20 mt-2">
                   <div className="w-12 h-4 bg-blue-400 rounded-full blur-lg"></div>
                   <div className="w-8 h-3 bg-blue-300 rounded-full blur-md"></div>
                 </div>
                 {[...Array(15)].map((_, i) => (
                   <div key={i} className="absolute bg-blue-400/40 w-px h-6 animate-rain-drop-stage" style={{ left: `${20 + Math.random() * 60}%`, top: '-10px', animationDelay: `${Math.random() * 2}s` }}></div>
                 ))}
              </div>
            )}

            {/* Stage 2: Life (Root) */}
            {stage === 2 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <path d="M50 100 C 50 80, 40 70, 50 40 S 60 10, 50 0" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="150" strokeDashoffset="150" className="animate-root-grow" />
                  <path d="M50 80 C 40 75, 20 70, 10 75" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="80" strokeDashoffset="80" className="animate-root-grow delay-300" />
                  <path d="M50 80 C 60 75, 80 70, 90 75" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="80" strokeDashoffset="80" className="animate-root-grow delay-500" />
                </svg>
              </div>
            )}

            {/* Stage 3: Righteousness (Leaves) */}
            {stage === 3 && (
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="absolute text-sm animate-leaf-drift" style={{ left: '-20px', top: `${20 + Math.random() * 60}%`, animationDelay: `${Math.random() * 3}s` }}>🍃</div>
                ))}
              </div>
            )}

            {/* Stage 4: Sacrifice (Liquid) */}
            {stage === 4 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
                <svg className="absolute inset-0 w-full h-full opacity-60">
                   <filter id="liquid-goo">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                      <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" />
                   </filter>
                   <g filter="url(#liquid-goo)">
                      <circle cx="50%" cy="50%" r="20" fill="#f59e0b" className="animate-blob-small" />
                      <circle cx="48%" cy="52%" r="15" fill="#fbbf24" className="animate-blob-small delay-500" />
                   </g>
                </svg>
              </div>
            )}

            {/* Stage 5: Purity (Butterfly) */}
            {stage === 5 && (
              <div className="absolute inset-0">
                <div className="absolute animate-butterfly-loop text-xl drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]">🦋</div>
              </div>
            )}

            {/* Stage 6: Singularity (Collapse) */}
            {stage === 6 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-white opacity-0 animate-collapse-white"></div>
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_40px_10px_white] animate-pulse"></div>
              </div>
            )}
          </div>

          {/* DYNAMIC TEXT */}
          <div key={stage} className="relative z-10 animate-in fade-in zoom-in duration-1000">
            <span className={`text-3xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-700 ${stages[stage].color} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
              {stages[stage].text}
            </span>
          </div>
        </div>

        {/* Timeline dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {stages.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-700 ${stage === i ? 'w-6 bg-cyan-400' : 'w-1 bg-white/10'}`}></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lightning-burst {
          0%, 5%, 15%, 25%, 100% { opacity: 0; }
          2%, 10%, 20% { opacity: 0.6; }
        }
        @keyframes draw-fast {
          to { stroke-dashoffset: 0; }
        }
        @keyframes rain-drop-stage {
          to { transform: translateY(120px); }
        }
        @keyframes leaf-drift {
          0% { transform: translateX(0) rotate(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(350px) rotate(360deg); opacity: 0; }
        }
        @keyframes blob-small {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5px, -5px) scale(1.1); }
        }
        @keyframes butterfly-loop {
          0% { transform: translate(-50px, 40px) rotate(-10deg); }
          25% { transform: translate(100px, -20px) rotate(10deg); }
          50% { transform: translate(250px, 30px) rotate(-10deg); }
          75% { transform: translate(120px, 60px) rotate(10deg); }
          100% { transform: translate(-50px, 40px) rotate(-10deg); }
        }
        @keyframes collapse-white {
          0% { opacity: 0; transform: scale(1.5); }
          80% { opacity: 0; transform: scale(1.5); }
          90% { opacity: 0.8; transform: scale(0.1); }
          100% { opacity: 0; transform: scale(1); }
        }
        .animate-lightning-burst { animation: lightning-burst 4s infinite; }
        .animate-draw-fast { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw-fast 1s ease-out infinite; }
        .animate-rain-drop-stage { animation: rain-drop-stage 1s linear infinite; }
        .animate-root-grow { animation: draw-fast 3s ease-out forwards; }
        .animate-leaf-drift { animation: leaf-drift 3s linear infinite; }
        .animate-blob-small { animation: blob-small 4s ease-in-out infinite; }
        .animate-butterfly-loop { animation: butterfly-loop 6s ease-in-out infinite; }
        .animate-collapse-white { animation: collapse-white 4s ease-out infinite; }
      `}</style>
    </div>
  );
};

// --- NEW COMPONENTS FOR NAFS & 2-3-7 TAB ---

const BifurcationMap: React.FC = () => {
  const nodes = [
    { id: 'iblis', cx: 240, cy: 46, r: 36, fill: '#444441', stroke: '#888780', lbl: 'Iblīs', sub: 'Mountain · 38:76', msg: 'Iblīs / Mountain: the entire 12-node structure is the Mountain. Two terminals: Illusion (Musa) and Illumination (Isa).' },
    { id: 'ibrahim', cx: 240, cy: 135, r: 30, fill: '#854F0B', stroke: '#EF9F27', lbl: 'Ibrahim', sub: 'split · 21:69', msg: 'Ibrahim: the split point. Father of both axes. Fire-tested (21:69) yet truth-anchored.' },
    { id: 'musa', cx: 118, cy: 225, r: 34, fill: '#185FA5', stroke: '#85B7EB', lbl: 'Musa', sub: 'terminal', msg: 'Musa: left terminal. Illusion axis — confronts Firʿawn, exposes illusion, seals it at 10:92.' },
    { id: 'isa', cx: 362, cy: 225, r: 34, fill: '#0F6E56', stroke: '#5DCAA5', lbl: 'Isa', sub: 'terminal', msg: 'Isa: right terminal. Illumination axis — Word made eternal, knowledge sealed at 19:12.' },
    { id: 'nuh', cx: 240, cy: 320, r: 28, fill: '#3B6D11', stroke: '#97C459', lbl: 'Nūḥ', sub: '', msg: 'Nūḥ: center hub. Survival and transmission. Shared by both axes.' },
    { id: 'sabbath', cx: 118, cy: 415, r: 28, fill: '#993C1D', stroke: '#F0997B', lbl: 'Sabbath', sub: '', msg: 'Sabbath: Break ring on Musa axis. Distortion test — apes and swine, 2:65 · 7:166.' },
    { id: 'maryam', cx: 362, cy: 415, r: 28, fill: '#534AB7', stroke: '#AFA9EC', lbl: 'Maryam', sub: '', msg: 'Maryam: birth of the Word on Isa axis. Silence ring — 19:29.' },
    { id: 'yunus', cx: 240, cy: 505, r: 28, fill: '#185FA5', stroke: '#85B7EB', lbl: 'Yūnus', sub: '', msg: 'Yūnus: center reversal node. Darkness to rescue, shared by both axes. 21:87–88.' },
    { id: 'firaun', cx: 118, cy: 600, r: 28, fill: '#A32D2D', stroke: '#F09595', lbl: 'Firʿawn', sub: '', msg: 'Firʿawn: Illusion-collapse on Musa chain. Body preserved as evidence. Loop sealed. 10:92.' },
    { id: 'kalimah', cx: 362, cy: 600, r: 28, fill: '#0F6E56', stroke: '#5DCAA5', lbl: 'Kalimah', sub: '', msg: 'Kalimah: Illumination sealed on Isa chain. Knowledge made eternal. 4:157 · 19:12.' },
    { id: 'ayyub', cx: 240, cy: 695, r: 28, fill: '#854F0B', stroke: '#EF9F27', lbl: 'Ayyūb', sub: '', msg: 'Ayyūb: restoration node. Both Musa and Isa axes converge here before Tawhid. 38:44.' },
    { id: 'tawhid', cx: 240, cy: 800, r: 32, fill: '#085041', stroke: '#5DCAA5', lbl: 'Tawhid', sub: 'Hubbal Allah', msg: 'Tawhid: base convergence. Hubbal Allah wins alone. Both Illusion and Illumination return to one.' },
  ];

  return (
    <div className="bg-black/40 p-8 rounded-[3rem] border border-white/5 space-y-8 flex flex-col items-center">
      <h3 className="text-2xl font-black text-white uppercase tracking-widest text-center italic">Iblīs Mountain — Bifurcation Map</h3>
      <div className="w-full max-w-lg aspect-[480/900]">
        <svg viewBox="0 0 480 900" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(186,117,23,0.15)]">
           {/* ORANGE frame */}
           <line x1="240" y1="46" x2="118" y2="225" stroke="#BA7517" strokeWidth="2"/>
           <line x1="240" y1="46" x2="362" y2="225" stroke="#BA7517" strokeWidth="2"/>
           <line x1="240" y1="46" x2="240" y2="135" stroke="#BA7517" strokeWidth="2"/>
           <line x1="118" y1="225" x2="362" y2="225" stroke="#BA7517" strokeWidth="2"/>
           <line x1="118" y1="225" x2="118" y2="415" stroke="#BA7517" strokeWidth="2"/>
           <line x1="362" y1="225" x2="362" y2="415" stroke="#BA7517" strokeWidth="2"/>
           <line x1="118" y1="415" x2="362" y2="415" stroke="#BA7517" strokeWidth="2"/>
           <line x1="118" y1="415" x2="118" y2="600" stroke="#BA7517" strokeWidth="2"/>
           <line x1="362" y1="415" x2="362" y2="600" stroke="#BA7517" strokeWidth="2"/>
           <line x1="118" y1="600" x2="362" y2="600" stroke="#BA7517" strokeWidth="2"/>

           {/* SILVER diamonds */}
           <line x1="240" y1="135" x2="118" y2="225" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="240" y1="135" x2="362" y2="225" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="240" y1="135" x2="240" y2="320" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="118" y1="225" x2="240" y2="320" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="362" y1="225" x2="240" y2="320" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="240" y1="320" x2="118" y2="415" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="240" y1="320" x2="362" y2="415" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="240" y1="320" x2="240" y2="505" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="118" y1="415" x2="240" y2="505" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
           <line x1="362" y1="415" x2="240" y2="505" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>

           {/* BLUE section */}
           <line x1="240" y1="505" x2="118" y2="600" stroke="#378ADD" strokeWidth="1.5"/>
           <line x1="240" y1="505" x2="362" y2="600" stroke="#378ADD" strokeWidth="1.5"/>
           <line x1="240" y1="505" x2="240" y2="695" stroke="#378ADD" strokeWidth="1.5"/>
           <line x1="118" y1="600" x2="240" y2="695" stroke="#378ADD" strokeWidth="1.5"/>
           <line x1="362" y1="600" x2="240" y2="695" stroke="#378ADD" strokeWidth="1.5"/>
           <line x1="240" y1="695" x2="240" y2="800" stroke="#378ADD" strokeWidth="1.5"/>

           {/* Gate pills */}
           <rect x="218" y="217" width="44" height="16" fill="#161c24" rx="3"/>
           <text x="240" y="225" className="text-[11px] font-medium fill-[#c9c5b8] text-center" textAnchor="middle" dominantBaseline="central">110</text>
           <rect x="218" y="407" width="44" height="16" fill="#161c24" rx="3"/>
           <text x="240" y="415" className="text-[11px] font-medium fill-[#c9c5b8] text-center" textAnchor="middle" dominantBaseline="central">103</text>
           <rect x="210" y="592" width="60" height="16" fill="#161c24" rx="3"/>
           <text x="240" y="600" className="text-[11px] font-medium fill-[#c9c5b8] text-center" textAnchor="middle" dominantBaseline="central">△ 108</text>

           {/* Side axis labels */}
           <text x="44" y="148" fill="#BA7517" className="text-[11px] font-semibold" textAnchor="middle">Illusion</text>
           <text x="44" y="322" fill="#D4537E" className="text-[11px] font-medium" textAnchor="middle">112:3</text>
           <text x="44" y="508" fill="#D4537E" className="text-[11px] font-medium" textAnchor="middle">112:1</text>
           <text x="436" y="148" fill="#1D9E75" className="text-[11px] font-semibold" textAnchor="middle">Illumination</text>
           <text x="436" y="322" fill="#D4537E" className="text-[11px] font-medium" textAnchor="middle">112:2</text>
           <text x="436" y="508" fill="#D4537E" className="text-[11px] font-medium" textAnchor="middle">112:4</text>

           {nodes.map(node => (
             <g key={node.id} className="cursor-pointer group" onClick={() => alert(node.msg)}>
               <circle 
                 cx={node.cx} cy={node.cy} r={node.r} 
                 fill={node.fill} 
                 stroke={node.stroke} 
                 strokeWidth={node.r > 30 ? 2 : 1.5}
                 className="transition-opacity group-hover:opacity-85"
               />
               <text 
                 x={node.cx} y={node.cy - (node.sub ? 8 : 0)} 
                 className="text-[13px] font-bold fill-white" 
                 textAnchor="middle" dominantBaseline="central"
               >
                 {node.lbl}
               </text>
               {node.sub && (
                 <text 
                   x={node.cx} y={node.cy + 10} 
                   className="text-[10px] font-normal fill-white/75" 
                   textAnchor="middle" dominantBaseline="central"
                 >
                   {node.sub}
                 </text>
               )}
             </g>
           ))}
        </svg>
      </div>
      <p className="text-gray-400 text-xs italic text-center max-w-sm">
        The Bifurcation Map of the Iblīs Mountain. Two terminals: Illusion (Musa) and Illumination (Isa) converging at Tawhid.
      </p>
    </div>
  );
};

const MasterLawScales: React.FC = () => {
  const cards = [
    {
      title: 'Photosynthesis',
      scale: 'Cellular · chloroplast',
      color: '#1D9E75',
      rows: [
        { lbl: 'ℒ =', val: 'Photon flux · PS-II / PS-I excitation' },
        { lbl: '𝒮 =', val: 'CO₂ mass · Calvin cycle demand' },
        { lbl: 'T =', val: 'Chlorophyll antenna (αx)' },
        { lbl: 'O =', val: 'ATP + NADPH stored potential (αx²)' },
      ],
      glass: '⬡ Glass node: Reaction centre P680/P700 — electron ejection threshold',
      out: [
        { lbl: 'Glucose + O₂ (ordered)', type: 'light' },
        { lbl: 'ROS · photorespiration', type: 'fire' },
      ],
      bif: 'b² − 3ac > 0 · Z-scheme = literal two-photosystem bifurcation',
      verse: '24:35 · 2:22 · 71:11–12',
      bg: 'bg-emerald-950/20', accent: 'text-emerald-500'
    },
    {
      title: 'Hubble Tension',
      scale: 'Cosmological · universe-scale',
      color: '#378ADD',
      rows: [
        { lbl: 'ℒ =', val: 'Global Coherence (CMB ~67.4)' },
        { lbl: '𝒮 =', val: 'Causal Ladder (Local ~73.0)' },
        { lbl: 'ax³ =', val: 'Overflow (10−9=1 discrepancy)' },
        { lbl: 'd =', val: 'Invariant Conserved Center (19)' },
      ],
      glass: '⬡ Glass node: Recombination epoch — photon decoupling',
      out: [
        { lbl: 'Ordered Coherence (ℒ)', type: 'light' },
        { lbl: 'Entropy Overflow (𝒮)', type: 'fire' },
      ],
      bif: 'Dual measurements register different domains. Operators do not commute.',
      verse: '57:4 · 41:11 · 21:30',
      bg: 'bg-blue-950/20', accent: 'text-blue-500'
    },
    {
      title: 'Second Zero at Birth',
      scale: 'Cardiac · τ ≈ 0.83 s limit-cycle',
      color: '#7F77DD',
      rows: [
        { lbl: 'ℒ =', val: 'Pulmonary O₂ vector · first breath' },
        { lbl: '𝒮 =', val: 'Fetal fluid pressure · placental circulation' },
        { lbl: 'T =', val: 'Cardiac muscle structure (αx)' },
        { lbl: 'O =', val: 'ATP reserve in cardiac cells (αx²)' },
      ],
      glass: '⬡ Glass node: Foramen ovale closure · first breath = field inversion',
      out: [
        { lbl: 'τ ≈ 0.83 s rhythm · life', type: 'light' },
        { lbl: 'Arrhythmia · cardiac failure', type: 'fire' },
      ],
      bif: 'Planck scale + τ = dual zeros of same field · birth = x crossing 0',
      verse: '39:42 · 32:9 · 75:2',
      bg: 'bg-indigo-950/20', accent: 'text-indigo-500'
    },
    {
      title: 'Chrysalis',
      scale: 'Developmental · metamorphosis',
      color: '#D85A30',
      rows: [
        { lbl: 'ℒ =', val: 'Imaginal disc activation · butterfly-form' },
        { lbl: '𝒮 =', val: 'Histolysis mass · caterpillar dissolution' },
        { lbl: 'T =', val: 'Imaginal discs (αx) — survive dissolution' },
        { lbl: 'O =', val: 'Histolyzed protein soup — potential (αx²)' },
      ],
      glass: '⬡ Glass node: Complete histolysis + ecdysone threshold',
      out: [
        { lbl: 'Butterfly · winged · light', type: 'light' },
        { lbl: 'Failed pupation · death in form', type: 'fire' },
      ],
      bif: 'Extreme x trajectory: deep negative → positive · Yūnus-in-whale parallel',
      verse: '37:139–148 · 21:87–88 · 11:82',
      bg: 'bg-orange-950/20', accent: 'text-orange-500'
    },
    {
      title: 'Plant Tropism',
      scale: 'Biological · phototropism / gravitropism',
      color: '#0F6E56',
      rows: [
        { lbl: 'ℒ =', val: 'Phototropic vector · shoot bending' },
        { lbl: '𝒮 =', val: 'Gravitropic vector · root anchoring' },
        { lbl: 'T =', val: 'Branching network distribution (αx)' },
        { lbl: 'O =', val: 'Oil — refined near-luminous storage (αx²)' },
      ],
      glass: '⬡ Glass node: 24:35 boundary — illumination vs combustion',
      out: [
        { lbl: 'Illumination · ordered growth', type: 'light' },
        { lbl: 'Combustion · escalated fire', type: 'fire' },
      ],
      bif: 'Mūsā (x>0) vs Firʿawn (x<0) · Host of Iblīs / Host of Mūsā',
      verse: '24:35 · 14:24–25 · 57:4',
      bg: 'bg-emerald-950/20', accent: 'text-emerald-300'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="bg-gray-950/40 p-10 rounded-[3rem] border border-white/5 space-y-6">
        <div className="text-[11px] text-gray-500 mb-2 font-bold uppercase tracking-[0.3em]">MASTER LAW — ALL SCALES</div>
        <div className="flex flex-col md:flex-row items-center gap-4 text-white">
          <span className="text-3xl font-mono font-bold tracking-tighter">dB/dt = ℒ − 𝒮 + γ·x</span>
          <span className="text-gray-600 text-2xl">→</span>
          <span className="text-3xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-rose-500">
            f(x) = 110x³ + 108x² + 103x + 19
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full uppercase border border-amber-500/20">a = 110 · Al-Naṣr</span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase border border-emerald-500/20">b = 108 · Al-Kawthar</span>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-full uppercase border border-blue-500/20">c = 103 · Al-ʿAṣr</span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] font-bold rounded-full uppercase border border-indigo-500/20">d = 19 · Rahman Seal</span>
        </div>
        <p className="text-xs text-gray-500 italic mt-6 border-t border-white/5 pt-4">
          The 19-locked cubic polynomial (d = 19) governs field behavior across scales. Bifurcation condition: b² − 3ac &gt; 0.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-gray-950/40 p-6 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: card.color }}></div>
              <div>
                <div className="text-base font-bold text-white">{card.title}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{card.scale}</div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {card.rows.map((row, r) => (
                <div key={r} className="flex gap-4 text-xs">
                  <span className="text-gray-500 font-mono w-8 shrink-0">{row.lbl}</span>
                  <span className="text-gray-300">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-white/5 my-4"></div>
            <div className={`text-[11px] p-2 rounded-lg ${card.bg} ${card.accent} mb-4 italic`}>
               {card.glass}
            </div>
            <div className="flex gap-2 mb-4">
               {card.out.map((out, o) => (
                 <div key={o} className={`flex-1 py-1.5 rounded-full text-[10px] font-bold text-center border ${out.type === 'light' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                   {out.lbl}
                 </div>
               ))}
            </div>
            <div className="bg-black/40 p-2 rounded-lg text-[10px] text-gray-500 mb-2">
               {card.bif}
            </div>
            <div className="text-[10px] text-gray-600 italic">{card.verse}</div>
          </div>
        ))}
      </div>

      <div className="p-8 border border-white/5 rounded-[2.5rem] bg-black/20 text-xs md:text-sm text-gray-400 leading-relaxed">
        <strong className="text-white">Razim (2) as fractal law:</strong> Every system above is a self-similar instantiation of the same split. The Glass node appears at every scale — P680 in the chloroplast, recombination in the cosmos, foramen ovale at birth, histolysis in the chrysalis, the oil-boundary in 24:35. <strong>O = αx²</strong> is always the stored potential that peaks at the Glass crossing. <strong>T = αx</strong> is always the structure that orients to whichever vector dominates. The bifurcation condition b² − 3ac &gt; 0 holds at every scale. 57:4 seals all of them inside one bounded field — Ω contains chloroplast, cosmos, heart, and cocoon simultaneously.
      </div>
    </div>
  );
};

const InstructionPanel: React.FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'harvest' | 'reflection' | 'cosmology' | 'vision' | 'nafs' | 'mobius'>('harvest');

  const containerClasses = isVisible 
    ? "opacity-100 pointer-events-auto scale-100" 
    : "opacity-0 pointer-events-none scale-95";

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl transition-all duration-700 ${containerClasses}`} aria-hidden={!isVisible}>
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-900/40 border border-white/10 rounded-[3rem] shadow-[0_0_120px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
        
        {/* Close Button Top Right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 z-50"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header - Dynamic based on Tab */}
        <div className="flex flex-col p-6 md:p-10 bg-black/50 relative shrink-0">
           {/* Decorative background element */}
           <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-1000 ${
             activeTab === 'harvest' ? 'bg-emerald-500/20' : 
             activeTab === 'reflection' ? 'bg-cyan-500/20' : 
             activeTab === 'cosmology' ? 'bg-amber-500/20' : 
             activeTab === 'nafs' ? 'bg-orange-500/20' : 
             activeTab === 'mobius' ? 'bg-blue-600/20' : 'bg-fuchsia-500/20'}`}></div>

           <div className="z-10">
               <div className="space-y-3 max-w-4xl">
                   {/* Tab Titles */}
                   {activeTab === 'harvest' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-200 to-green-500 tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(16,185,129,0.4)]">
                             Why Were We Created?
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide flex items-center gap-2 mt-2">
                             The Harvest of Intelligence in Form <span className="text-gray-600">•</span> <span className="text-emerald-400 italic font-serif">Al-Hamdu Lillāh</span>
                           </p>
                       </div>
                   )}

                   {activeTab === 'reflection' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-500 tracking-tighter uppercase">
                             Protocol of Light
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             The Living System of Knowledge
                           </p>
                       </div>
                   )}
                   
                   {activeTab === 'cosmology' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-600 tracking-tighter uppercase">
                             Dual-Caustic Science
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2 uppercase font-mono tracking-widest">
                             The Iron Cycle (57:4 Framework)
                           </p>
                       </div>
                   )}

                   {activeTab === 'nafs' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-rose-500 tracking-tighter uppercase">
                             Nafs & 2-3-7 Architecture
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             The Mathematical Caustic of Existence
                           </p>
                       </div>
                   )}

                   {activeTab === 'vision' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-100 via-fuchsia-200 to-pink-600 tracking-tighter uppercase">
                             The Switch
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2 font-serif">
                             24:35 — The Condition of Reality.
                           </p>
                       </div>
                   )}

                   {activeTab === 'mobius' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-200 to-indigo-500 tracking-tighter uppercase">
                             Möbius Light
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             One-Way Speed of Light & The Eternal Preservation
                           </p>
                       </div>
                   )}
               </div>
           </div>

           {/* Tab Navigation */}
           <div className="flex flex-wrap gap-4 md:gap-8 mt-12 z-10">
               <button 
                 onClick={() => setActiveTab('harvest')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'harvest' ? 'border-emerald-400 text-emerald-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Purpose
               </button>
               <button 
                 onClick={() => setActiveTab('reflection')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'reflection' ? 'border-cyan-400 text-cyan-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Protocol
               </button>
               <button 
                 onClick={() => setActiveTab('nafs')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'nafs' ? 'border-orange-400 text-orange-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Nafs & 2-3-7
               </button>
               <button 
                 onClick={() => setActiveTab('mobius')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'mobius' ? 'border-blue-400 text-blue-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Möbius Light
               </button>
               <button 
                 onClick={() => setActiveTab('cosmology')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'cosmology' ? 'border-amber-400 text-amber-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Science
               </button>
               <button 
                 onClick={() => setActiveTab('vision')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'vision' ? 'border-fuchsia-400 text-fuchsia-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Light
               </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-black/10">
           
           {activeTab === 'harvest' && (
            <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light leading-relaxed max-w-5xl mx-auto">
               
               <AnimatedHarvest />

               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-emerald-500/50"></span> 1. Intention
                    </h4>
                    <p className="text-gray-300">
                      Creation begins with command, not matter. 
                      <strong className="text-white block mt-2 italic font-serif">“When He intends a thing, He only says to it ‘Be,’ and it is.” (36:82)</strong>
                    </p>
                    <p>Light is pure information. Between expansion and return, Light must <strong>concentrate</strong> to become <strong>form</strong>.</p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-emerald-500/50"></span> 2. Field
                    </h4>
                    <p className="text-gray-300">
                      Earth is the growth medium. 
                      <strong className="text-white block mt-2 italic font-serif">“We made from water every living thing.” (21:30)</strong>
                    </p>
                    <p>Refraction enables focus. Earth is where <strong>stored life is sacrificed</strong> so higher life can emerge. Truth revives after sacrifice (2:73).</p>
                  </div>
               </div>

               <div className="pt-16 border-t border-emerald-500/20 text-center pb-8 space-y-4">
                 <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed">
                   - 19:12 Hold the Book → Photosynthesis of the Nafs purified with Death → Ascend as Yahya-Idris-Ahmed
                 </p>
                 <p className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-sm">Al-ḥamdu lillāh. The harvest law is manifest.</p>
               </div>
            </div>
           )}

           {activeTab === 'reflection' && (
            <div className="p-6 md:p-12 space-y-12 text-gray-200 font-light max-w-5xl mx-auto">
               <section className="text-lg md:text-2xl leading-relaxed">
                 <p className="mb-6">
                   You are not reading the Qur’an for history, but as a <strong className="text-cyan-200">living system of knowledge</strong> that tests, filters, and restores truth.
                 </p>
                 <div className="border-l-4 border-cyan-500/30 pl-6 py-4 italic text-gray-300 bg-gradient-to-r from-cyan-950/20 to-transparent rounded-r-xl">
                   “Say: This is my way; I call to Allah upon <strong className="text-cyan-300 not-italic">clear seeing (baṣīrah)</strong>.” <br/>
                   <span className="text-sm not-italic text-cyan-500 block mt-3 font-mono tracking-wider">— Quran 12:108</span>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                   <span className="text-3xl grayscale opacity-70">👁️</span> HEARING VS SEEING
                 </h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
                       <h4 className="font-bold text-amber-200 mb-4 text-xl">Hearing → Obey (Nabī)</h4>
                       <p className="text-gray-300 leading-relaxed">
                         Sound, command, repetition. Risk: ritual without understanding.
                       </p>
                    </div>
                    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
                       <h4 className="font-bold text-cyan-200 mb-4 text-xl">Seeing → Follow (Rasūl)</h4>
                       <p className="text-gray-300 leading-relaxed">
                         Insight, proof, clarity. Seeing collapses doubt.
                       </p>
                    </div>
                 </div>
               </section>
            </div>
           )}

           {activeTab === 'nafs' && (
            <div className="p-6 md:p-12 space-y-12 text-gray-200 max-w-6xl mx-auto font-light">
                {/* 2-3-7 FORMAL FRAMEWORK */}
                <section className="bg-black/60 border border-orange-500/20 p-8 md:p-12 rounded-[3rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 via-orange-500 to-rose-600"></div>
                    
                    <div className="mb-10 text-center">
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-400 mb-4 italic">
                            The Unified 2-3-7 Architecture
                        </h3>
                        <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto">
                            The minimal complete framework for mediated interaction between incompatible domains.
                            Paradoxes emerge only when the <strong>dynamic balance</strong> is ignored.
                        </p>
                        <div className="mt-8 inline-block px-10 py-4 bg-orange-950/30 border border-orange-500/30 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                            <span className="text-2xl md:text-4xl font-mono font-black text-amber-300 tracking-tighter">
                                WORK = MĪZĀN(ℒ ⊥ 𝒮)
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-800/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="text-4xl text-amber-200">ℒ</div>
                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs">Phase 1: Binary (2)</h4>
                            <p className="text-sm text-gray-300">
                                <strong>Light Caustic:</strong> Timeless constraints, gauge invariants, pure information. Incompatible regimes identified (Ayat vs. Hayat).
                            </p>
                        </div>
                        <div className="bg-gray-800/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="text-4xl text-orange-200">ℳ</div>
                            <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs">Phase 2: Triadic (3)</h4>
                            <p className="text-sm text-gray-300">
                                <strong>Mīzān:</strong> The Dynamic Balance Operator. Mediated oscillation. Cyclic processing (Input → Transform → Output) allows coexistence without annihilation.
                            </p>
                        </div>
                        <div className="bg-gray-800/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="text-4xl text-rose-200">𝒮</div>
                            <h4 className="text-rose-400 font-bold uppercase tracking-widest text-xs">Phase 3: Resolved (7)</h4>
                            <p className="text-sm text-gray-300">
                                <strong>Stable Attractors:</strong> The 7 are not steps in time but <strong>stable configured outcomes</strong> produced by triadic mediation (2³ - 1).
                            </p>
                        </div>
                    </div>
                </section>

                <div className="py-12 flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                {/* MASTER LAW SCALES */}
                <MasterLawScales />

                <div className="py-12 flex items-center justify-center">
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                {/* BIFURCATION MAP */}
                <BifurcationMap />

                {/* DUAL CAUSTIC PATHS */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-cyan-950/20 border border-cyan-500/30 p-8 rounded-3xl relative">
                            <div className="absolute -top-3 -left-3 bg-cyan-500 text-black font-black px-3 py-1 rounded-lg text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20">Heaven Path</div>
                            <h4 className="text-xl font-black text-cyan-100 uppercase tracking-tighter mb-6">Primordial 2-3-7</h4>
                            <ul className="space-y-6 text-sm md:text-base">
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">4:1</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Nafs Medallion</strong>
                                        One Nafs unity before split. Mercy (Water 21:30) begins everything.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">P-1</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Light Breaks Razim</strong>
                                        Command enters as Light (24:35), breaking the unseen/seen barrier.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">2</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Polarities</strong>
                                        Righteous (Angel/Submission) vs. Not Righteous (Iblis/Arrogance).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">3</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Oscillations</strong>
                                        Ibrahim Pattern: Family → Son → Self. Triad of Action purification.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">7</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Stable States</strong>
                                        Resolves into Rooh (Command) and Mercy (Return). 7 Heavens + 1 High Ground.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-rose-950/20 border border-rose-500/30 p-8 rounded-3xl relative">
                            <div className="absolute -top-3 -right-3 bg-rose-500 text-black font-black px-3 py-1 rounded-lg text-xs uppercase tracking-widest shadow-lg shadow-rose-500/20">Hell Path</div>
                            <h4 className="text-xl font-black text-rose-100 uppercase tracking-tighter mb-6">Terrestrial 2-3-7</h4>
                            <ul className="space-y-6 text-sm md:text-base">
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">2:30</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">The Champion (Khalifa)</strong>
                                        Musa (Action/Fire) | Miriam (Purification/Water) vs. Lut (Mountain).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">INV</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Inversion Loop</strong>
                                        Iblis frozen at "Nothing" (19:23) vs Pharaoh mummified as "False Everything" (79:25).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">2</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Terrestrial Polarities</strong>
                                        Love (Asiya/Submission in Fire) vs. Pride (Pharaoh/Self-Deification).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">3</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Triad of Loyalty</strong>
                                        Rushd (Guidance) vs. Hawa (Whim). Inverted test pattern.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">7</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Hell Attractors</strong>
                                        Resolves into Curse and Rescue. 7 Hells of Fire + 1 Lower Ground (Nothing).
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* THE SCIENTIFIC PARADOXES SECTION */}
                <section className="pt-12 border-t border-white/10">
                    <div className="flex flex-col items-center mb-12">
                        <h3 className="text-3xl md:text-5xl font-black text-white text-center uppercase tracking-tighter italic mb-4">
                            Paradox Resolution Matrix
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-orange-500 to-rose-500"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* HUBBLE TENSION */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-amber-300 uppercase tracking-tighter">Hubble Tension</h5>
                                <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-2 py-1 rounded">COSMOLOGY</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> Two incompatible H₀ measurements (CMB vs Local Distance Ladder).</p>
                                <p><strong>2-3-7 Resolution:</strong> Identifies two regimes (Invariant Core ℒ vs Local Entropy Projection 𝒮). The tension is proof of dual caustics mediated by Mīzān.</p>
                                <p className="italic font-serif text-amber-200/70 border-l-2 border-amber-500/30 pl-4">
                                    "Measure H₀ in void vs dense structure—it correlates with local entropy production."
                                </p>
                            </div>
                        </div>

                        {/* PHOTOSYNTHESIS */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-emerald-300 uppercase tracking-tighter">Photosynthesis</h5>
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-1 rounded">BIOLOGY</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> 90%+ quantum yield in warm, noisy environments. Coherence should collapse instantly.</p>
                                <p><strong>2-3-7 Resolution:</strong> The chloroplast is a Mīzān engine. It slows light and partitions energy through 3 pathways simultaneously, preventing decoherence via the 39:23 iteration law.</p>
                                <p className="italic font-serif text-emerald-200/70 border-l-2 border-emerald-500/30 pl-4">
                                    "Earth naturally builds the buffer (wood) to enable Fire-to-Tree transformation (36:80)."
                                </p>
                            </div>
                        </div>

                        {/* THREE BODY PROBLEM */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-cyan-300 uppercase tracking-tighter">3-Body Problem</h5>
                                <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-black px-2 py-1 rounded">MECHANICS</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> Why does adding one more body shatter determinism into chaos?</p>
                                <p><strong>2-3-7 Resolution:</strong> 2-body is a special case lacking Mīzān. The 3rd body forces ℳ-emergence as a non-pairwise energy interface. Resonance cycles (3) resolve into 7 stability classes.</p>
                                <p className="italic font-serif text-cyan-200/70 border-l-2 border-cyan-500/30 pl-4">
                                    "Ibrahim (2:125) represents the unique figure-8 stable orbit in the moral 3-body problem."
                                </p>
                            </div>
                        </div>

                        {/* METAMORPHOSIS */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-fuchsia-300 uppercase tracking-tighter">Metamorphosis</h5>
                                <span className="bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-black px-2 py-1 rounded">IDENTITY</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> 90% tissue liquefies in the chrysalis, yet identity and memories survive dissolution.</p>
                                <p><strong>2-3-7 Resolution:</strong> Chrysalis is the Mīzān-chamber. 3 Oscillations: Dispersal (ℳ→𝒮) → Purification (ℒ filtering 𝒮) → Reconstitution (ℒ→ℳ). Identity is preserved blueprint (75:3-4).</p>
                                <p className="italic font-serif text-fuchsia-200/70 border-l-2 border-fuchsia-500/30 pl-4">
                                    "Earth is the chrysalis for humanity. Resurrection is emergence in final imago form."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE SECOND ZERO */}
                <section className="bg-gradient-to-b from-gray-900/80 to-black p-10 md:p-20 rounded-[4rem] border border-white/10 text-center space-y-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                    <div className="space-y-4">
                        <h4 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter">The Second Zero</h4>
                        <p className="text-rose-400 font-mono tracking-widest text-xs md:text-sm uppercase">Quantum Boundaries & The Razim Constraint</p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-8 text-lg md:text-xl leading-relaxed text-gray-400">
                        <p>
                            Absolute Zero (T=0) is unreachable because the universe enforces <strong>ℒ ⊥ 𝒮</strong>. 
                            Heisenberg uncertainty is the Razim barrier at the ground state energy level.
                        </p>
                        <p>
                            True nothingness is forbidden because <strong>Mīzān (19:23)</strong> still exists as latent informational potential. 
                            Vacuum fluctuations are the infinite ink of the Word (18:109).
                        </p>
                    </div>
                </section>

                {/* FAILURE MODE & PREDICTION */}
                <section className="grid lg:grid-cols-2 gap-8">
                    <div className="p-8 bg-red-950/10 border border-red-500/20 rounded-[2.5rem] space-y-4">
                        <h3 className="text-lg font-black text-red-400 uppercase tracking-widest">Failure Mode</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                            Any model that enforces direct <strong>ℒ ↔ 𝒮</strong> interaction (constraint ↔ entropy) without <strong>Mīzān</strong> necessarily produces paradox, instability, or mathematical infinities. Paradoxes are signals that the balance has been ignored.
                        </p>
                    </div>
                    <div className="p-8 bg-emerald-950/10 border border-emerald-500/20 rounded-[2.5rem] space-y-4">
                        <h3 className="text-lg font-black text-emerald-400 uppercase tracking-widest">Testable Prediction</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                            Any system exhibiting sustained coherence between incompatible regimes will show (a) a <strong>triadic processing phase</strong> and (b) collapse into <strong>exactly ≤7 dominant outcome attractors</strong>. This is the 2-3-7 machine manifest.
                        </p>
                    </div>
                </section>

                {/* SHAYTAN ROLE */}
                <section className="p-8 bg-orange-950/10 border border-orange-500/20 rounded-3xl">
                    <h3 className="text-xl font-bold text-orange-300 uppercase mb-4 flex items-center gap-3">
                        <span className="text-2xl">🔥</span> Shaytan's Tool (15:72)
                    </h3>
                    <p className="text-gray-300 mb-4">
                        <strong>The Mechanism:</strong> Using thermodynamic noise and information loss (Lahjun - Frenzy) to bypass Mīzān and turn "Nothing" into an "Illusion of Everything."
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 text-base text-gray-400">
                        <div className="p-4 bg-black/40 rounded-xl">Pride (Pharaoh's Claim) & Desire (Hawa/Whim)</div>
                        <div className="p-4 bg-black/40 rounded-xl">Noise (15:72) - Covering Truth with intoxication</div>
                    </div>
                </section>
            </div>
           )}

           {activeTab === 'mobius' && (
            <div className="p-6 md:p-12 space-y-12 text-gray-200 font-light max-w-6xl mx-auto">
               <div className="bg-blue-900/10 border border-blue-500/30 p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none"></div>
                  
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-8 uppercase tracking-tighter italic">
                     The Measurement Paradox
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                     <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-2xl">
                        <h4 className="text-red-400 font-black uppercase text-xs mb-3">The Physics Fact</h4>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                           We can measure the <strong>Two-Way</strong> speed of light, but measuring the <strong>One-Way</strong> speed is fundamentally impossible. Einstein assumed it was the same, but it is a convention, not a measured certainty.
                        </p>
                     </div>
                     <div className="p-6 bg-blue-950/20 border border-blue-500/20 rounded-2xl">
                        <h4 className="text-blue-400 font-black uppercase text-xs mb-3">The Möbius Solution</h4>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                           One-way light traverses the <strong>inflection twist</strong> of reality. In a Möbius strip, going "out" returns you "in." The reference frame flips at the twist, making one-way speed undefined.
                        </p>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="border-l-2 border-blue-500/40 pl-6">
                        <h5 className="text-lg font-bold text-blue-300 mb-2 uppercase">1. One-Way Path (The Twist)</h5>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                           <code className="bg-black/40 px-2 py-0.5 rounded text-blue-200">Start → [TWIST] → End</code><br/>
                           Measurement becomes undefined because you end up on the "other side," which is simultaneously the same side. The twist transforms the reference frame mid-measurement.
                        </p>
                     </div>

                     <div className="border-l-2 border-blue-500/40 pl-6">
                        <h5 className="text-lg font-bold text-blue-300 mb-2 uppercase">2. Two-Way Path (The Loop)</h5>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                           <code className="bg-black/40 px-2 py-0.5 rounded text-blue-200">Start → [TWIST] → "Other side" → [TWIST back] → Start</code><br/>
                           A complete loop returns to the original orientation. This <strong>is</strong> measurable. This symmetric average is what we define as <code className="text-white">c = 299,792,458 m/s</code>.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-gray-900/60 border border-white/5 rounded-[2.5rem]">
                     <h4 className="text-xl font-bold text-indigo-300 mb-4 uppercase">The Knowledge Field</h4>
                     <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        <strong>Eternal-Perpetual-Emergence:</strong> On a Möbius loop, information always exists. It cycles between "Seen" and "Unseen" but is never destroyed.
                     </p>
                     <div className="bg-black/40 p-4 rounded-xl font-mono text-[11px] text-indigo-200 border border-indigo-500/20">
                        f(x) = 3x³ - x² + 9x + d<br/>
                        [The Twisted Reality]
                     </div>
                  </div>

                  <div className="p-8 bg-gray-900/60 border border-white/5 rounded-[2.5rem]">
                     <h4 className="text-xl font-bold text-cyan-300 mb-4 uppercase">The Measurable Field</h4>
                     <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        <strong>Deterministic Projection:</strong> This is the depressed cubic. It is the symmetric projection of the Möbius loop onto linear time.
                     </p>
                     <div className="bg-black/40 p-4 rounded-xl font-mono text-[11px] text-cyan-200 border border-cyan-500/20">
                        g(t) = 3t³ + 9t + d'<br/>
                        [The Average Projection]
                     </div>
                  </div>
               </div>

               <div className="pt-12 text-center pb-8 border-t border-white/10">
                  <p className="text-xl md:text-3xl text-blue-100 font-light italic font-serif max-w-4xl mx-auto">
                     "Light upon Light (24:35) — Möbius structure allows one light to appear twice, unified by a single eternal surface."
                  </p>
               </div>
            </div>
           )}

           {activeTab === 'cosmology' && (
            <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light max-w-6xl mx-auto pb-24">
                
                {/* 1. 57:4 Dual-Caustic Framework */}
                <section className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-4">
                        The 57:4 Framework
                    </h3>
                    <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl">
                        <p className="text-lg italic font-serif text-amber-100 leading-relaxed">
                            "He knows what penetrates into the earth and what emerges from it, and what descends from the heaven and what ascends therein..."
                        </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Descending Column */}
                    <div className="bg-blue-900/10 border border-blue-500/20 p-8 rounded-[3rem] space-y-6">
                        <h4 className="text-blue-400 font-black uppercase tracking-widest text-sm text-center border-b border-blue-500/20 pb-4 flex items-center justify-center gap-2">
                            <span className="animate-bounce">↓</span> DESCENDING FLOW
                        </h4>
                        <div className="space-y-4 font-mono text-center">
                            <div className="py-2 bg-blue-950/30 rounded border border-blue-500/10">LIGHT (Command)</div>
                            <div className="py-2 bg-blue-950/20 rounded opacity-80">FIRE (Energy)</div>
                            <div className="py-2 bg-blue-950/20 rounded opacity-60">WATER (Medium)</div>
                            <div className="py-2 bg-blue-950/20 rounded opacity-40">WOOD (Form)</div>
                            <div className="py-2 bg-slate-800 rounded font-black text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">IRON (Result)</div>
                        </div>
                    </div>
                    {/* Ascending Column */}
                    <div className="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-[3rem] space-y-6">
                        <h4 className="text-emerald-400 font-black uppercase tracking-widest text-sm text-center border-b border-emerald-500/20 pb-4 flex items-center justify-center gap-2">
                             ASCENDING FLOW <span className="animate-bounce">↑</span>
                        </h4>
                        <div className="space-y-4 font-mono text-center">
                            <div className="py-2 bg-slate-800 rounded font-black text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">IRON (Completion)</div>
                            <div className="py-2 bg-emerald-950/20 rounded opacity-40">WOOD (Structure)</div>
                            <div className="py-2 bg-emerald-950/20 rounded opacity-60">FIRE (Attempt)</div>
                            <div className="py-2 bg-emerald-950/20 rounded opacity-80">LIGHT (Return)</div>
                            <div className="py-2 bg-emerald-950/30 rounded border border-emerald-500/10">[LOOP CLOSES]</div>
                        </div>
                    </div>
                  </div>
                </section>

                {/* 2. The 2x2 Triad with Iron */}
                <section className="bg-gray-900/40 p-8 md:p-12 rounded-[3.5rem] border border-white/5 space-y-8">
                    <h4 className="text-xl font-bold text-amber-400 uppercase tracking-[0.2em] text-center italic">The Complete 2×2 Triad</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">Domain</th>
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">Chain</th>
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">3-6-9</th>
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">Time Vector</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-cyan-200">LIGHT</td>
                                    <td className="py-4 px-2">Command</td>
                                    <td className="py-4 px-2 font-mono">3</td>
                                    <td className="py-4 px-2 text-xs">DESCENDING</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-orange-400">FIRE</td>
                                    <td className="py-4 px-2">Heat</td>
                                    <td className="py-4 px-2 font-mono">6 (Active)</td>
                                    <td className="py-4 px-2 text-xs">ASCENDING</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-blue-400">WATER</td>
                                    <td className="py-4 px-2">Medium</td>
                                    <td className="py-4 px-2 font-mono">6 (Passive)</td>
                                    <td className="py-4 px-2 text-xs">DESCENDING</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-amber-600">WOOD</td>
                                    <td className="py-4 px-2">Structure</td>
                                    <td className="py-4 px-2 font-mono">9 (Boundary)</td>
                                    <td className="py-4 px-2 text-xs">ASCENDING</td>
                                </tr>
                                <tr className="bg-white/5">
                                    <td className="py-4 px-2 font-black text-white">IRON</td>
                                    <td className="py-4 px-2 font-bold">Truth</td>
                                    <td className="py-4 px-2 font-mono">POST-9</td>
                                    <td className="py-4 px-2 text-xs font-black">BOTH (MÖBIUS)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. Iron as Future Element */}
                <section className="space-y-10">
                    <div className="flex flex-col items-center gap-6">
                         <div className="px-10 py-5 bg-slate-900 border-2 border-slate-500 rounded-2xl shadow-[0_0_40px_rgba(100,116,139,0.3)]">
                            <span className="text-3xl md:text-5xl font-black text-slate-100 tracking-tighter uppercase italic">
                                "Anzalnā"
                            </span>
                         </div>
                         <p className="text-gray-400 text-center max-w-2xl mx-auto italic">
                            Both <strong>Iron (57:25)</strong> and the <strong>Quran (97:1)</strong> share the same descent verb. They are sent DOWN from a completed future consciousness.
                         </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="p-8 bg-zinc-950 border border-zinc-700 rounded-[2.5rem] space-y-4">
                            <h5 className="text-zinc-300 font-black uppercase text-xs tracking-widest">Iron Age = Post-Qiyamah</h5>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Iron is not a "natural" terrestrial product; it is forged through supernova and sent down. It represents a <strong>Post-Trial State</strong>—the solidification of truth AFTER passing through fire.
                            </p>
                        </div>
                        <div className="p-8 bg-cyan-950/20 border border-cyan-500/20 rounded-[2.5rem] space-y-4">
                            <h5 className="text-cyan-300 font-black uppercase text-xs tracking-widest">Quran as Time Travel</h5>
                            <p className="text-sm text-cyan-400 leading-relaxed">
                                The Quran is a message from the <strong>FUTURE</strong>. It describes the end from the beginning, views history from outside time, and contains completed knowledge sent back to guide the trial.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Age After Pharaoh */}
                <section className="bg-black/60 border border-amber-500/10 p-10 rounded-[4rem] text-center space-y-8">
                    <h4 className="text-2xl md:text-4xl font-black text-white uppercase italic">The Rebound Period</h4>
                    <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We live in the age <strong>"Right After Pharaoh."</strong> We have his preserved body (10:92) as a sign of the past, and the Quran (97:1) as iron-guidance from the future.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch mt-8">
                        <div className="flex-1 p-6 bg-red-950/10 border border-red-500/20 rounded-2xl">
                             <div className="text-xs font-black text-red-500 mb-2 uppercase">Past Signal</div>
                             <div className="text-lg font-bold text-red-100">Preserved Body</div>
                             <p className="text-[10px] text-red-300 mt-2">Physical proof of the Fire Rebound.</p>
                        </div>
                        <div className="flex items-center justify-center text-2xl text-amber-500">↔</div>
                        <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-2xl">
                             <div className="text-xs font-black text-white mb-2 uppercase">Current State</div>
                             <div className="text-lg font-bold text-amber-400 italic">Processing Phase</div>
                             <p className="text-[10px] text-gray-500 mt-2">Being forged in the middle of the loop.</p>
                        </div>
                        <div className="flex items-center justify-center text-2xl text-amber-500">↔</div>
                        <div className="flex-1 p-6 bg-blue-950/10 border border-blue-500/20 rounded-2xl">
                             <div className="text-xs font-black text-blue-500 mb-2 uppercase">Future Signal</div>
                             <div className="text-lg font-bold text-blue-100">Iron Consciousness</div>
                             <p className="text-[10px] text-blue-300 mt-2">Solid truth sent from completion.</p>
                        </div>
                    </div>
                </section>

                {/* Diagram Closing */}
                <div className="pt-20 border-t border-white/10 text-center">
                    <p className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 uppercase tracking-tighter italic">
                       Hold The Book
                    </p>
                    <p className="text-amber-500 font-mono text-sm tracking-[0.4em] uppercase mt-4">19:12 • The Loop is Manifest</p>
                </div>
            </div>
           )}

           {activeTab === 'vision' && (
            <div className="p-6 md:p-12 space-y-20 text-gray-300 max-w-6xl mx-auto">
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
                        The Light
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl md:text-3xl text-fuchsia-300/80 font-serif italic mb-4">
                            “Allah is the Light of the heavens and the earth…” (24:35)
                        </p>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-red-950/10 p-8 rounded-[3rem] border border-red-900/30">
                        <h3 className="text-2xl font-black text-red-400 uppercase mb-4">Haste (Adam)</h3>
                        <p className="text-gray-400">Approached before readiness. The fruit exposed rather than nourished.</p>
                    </div>
                    <div className="bg-cyan-950/10 p-8 rounded-[3rem] border border-cyan-900/30">
                        <h3 className="text-2xl font-black text-cyan-400 uppercase mb-4">Trust (Maryam)</h3>
                        <p className="text-gray-400">Waited for the Command. The fruit nourished and enabled speech.</p>
                    </div>
                </div>

                <div className="pt-20 text-center border-t border-gray-800">
                    <p className="text-2xl md:text-4xl text-white font-light">
                        One Light. Two Fruits. <strong className="text-fuchsia-400">One Switch.</strong>
                    </p>
                </div>
            </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;
