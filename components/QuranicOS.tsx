
import React, { useState, useMemo } from 'react';

interface QuranicOSProps {
  isVisible: boolean;
  onClose: () => void;
}

const LIFE_CIRCUITS = [
  { chain: "Fire → Ibrahim → Dawud", ref: "21:69 / 38:17-26", desc: "Authority forged by trial" },
  { chain: "Adam → Ibrahim → Musa", ref: "2:30-39 / 2:124", desc: "Descent to purification" },
  { chain: "Musa → Ibrahim → Isa", ref: "5:46 / 19:51", desc: "Law softened into mercy" },
  { chain: "Isa → Ibrahim → Muhammad", ref: "21:107 / 3:45", desc: "Mercy as guidance" },
  { chain: "Muhammad → Ibrahim → Ahmed", ref: "61:6 / 2:128", desc: "Praise compressed to return" },
  { chain: "Ahmed → Ibrahim → Solomon", ref: "27:15 / 2:124", desc: "Knowledge as dominion" },
  { chain: "Solomon → Ibrahim → Bilqis", ref: "27:22 / 2:124", desc: "Intellect submits to light" },
  { chain: "Bilqis → Solomon → Asiya", ref: "27:44 / 66:11", desc: "Faith under tyranny" },
  { chain: "Asiya → Solomon → Musa", ref: "66:11 / 28:3", desc: "Inner faith confronts power" },
  { chain: "Musa → Solomon → Pharaoh", ref: "28:3-40 / 27:14", desc: "Warning before collapse" }
];

const DEATH_CIRCUITS = [
  { chain: "Pharaoh → Solomon → Samiri", ref: "20:85 / 28:38", desc: "False authority exposed" },
  { chain: "Samiri → Solomon → 15:72", ref: "15:72 / 20:85", desc: "Nafs exposed under scrutiny" },
  { chain: "Nafs → Solomon → World-Attachment", ref: "35:5 / 27:15", desc: "Stagnation of desire" },
  { chain: "Horse → Solomon → Lut's Tribe", ref: "38:13 / 15:72", desc: "Excess desire cut" },
  { chain: "Lut Rescued → Throne + Body", ref: "11:81 / 27:20", desc: "Truth stands upright" },
  { chain: "Book → Solomon → Isa", ref: "3:49 / 5:46", desc: "Life reissued through Word" }
];

const RESET_CIRCUITS = [
  { chain: "Musa → Book → Isa", ref: "5:46", desc: "Law reanimated" },
  { chain: "Yahya → Book → Isa", ref: "19:12 / 3:39", desc: "Word confirmed" },
  { chain: "Muhammad → Book → Isa", ref: "3:3 / 61:6", desc: "Prophecy fulfilled" },
  { chain: "Ahmed → Book → Musa", ref: "61:6 / 7:157", desc: "Mission renewed" }
];

const SYMMETRIES = [
  { chain: "Yakub → Ibrahim → Zakariya", ref: "19:41-50" },
  { chain: "Yusuf → Ibrahim → Yahya", ref: "12:6 / 19:41" },
  { chain: "Fire → Ibrahim → Water", ref: "21:69 / 66:11" },
  { chain: "Earth → Tree → Light", ref: "14:24 / 24:35" }
];

const QuranicOS: React.FC<QuranicOSProps> = ({ isVisible, onClose }) => {
  const [activeMode, setActiveMode] = useState<'life' | 'death' | 'reset'>('life');
  const [isHoldingBook, setIsHoldingBook] = useState(false);

  const currentChains = useMemo(() => {
    if (activeMode === 'life') return LIFE_CIRCUITS;
    if (activeMode === 'death') return DEATH_CIRCUITS;
    return RESET_CIRCUITS;
  }, [activeMode]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-[#0a0c10] text-slate-200 overflow-hidden font-sans select-none">
      <style>{`
        @keyframes float-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-soft { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.5; } }
        .gradient-blur { background: radial-gradient(circle at center, rgba(56, 189, 248, 0.08) 0%, transparent 70%); }
        .serif-title { font-family: 'Times New Roman', serif; }
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
        .active-ring { box-shadow: 0 0 20px rgba(56, 189, 248, 0.2); }
      `}</style>

      {/* Top Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-black/20 backdrop-blur-md border-b border-white/5 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">Quranic OS</h1>
            <p className="text-[10px] text-slate-500 tracking-[0.3em] font-medium uppercase">3:33 Transducer Protocol</p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="hidden md:flex flex-col items-end justify-center mr-4">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">System Coherent</span>
              <span className="text-[9px] text-slate-600 font-mono italic">Instance: Ahmed_Node_01</span>
           </div>
           <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-105 active:scale-95">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 gradient-blur pointer-events-none" />

        {/* 1. Left Nav: Circuit Selection */}
        <nav className="w-full lg:w-80 p-8 border-r border-white/5 bg-black/30 backdrop-blur-xl space-y-10 z-20 shrink-0">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/10 pb-2">Primary Vectors</h2>
            <div className="space-y-3">
              {(['life', 'death', 'reset'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`w-full group px-5 py-4 text-left rounded-2xl transition-all border ${activeMode === mode ? 'bg-white text-black border-white active-ring' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest">{mode}</span>
                    {activeMode === mode && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                  </div>
                  <p className={`text-[10px] font-medium leading-tight ${activeMode === mode ? 'text-slate-600' : 'text-slate-500'}`}>
                    {mode === 'life' && 'Expansion & Ignition'}
                    {mode === 'death' && 'Compression & Exposure'}
                    {mode === 'reset' && 'System Reinstallation'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/10 pb-2">The Interface</h2>
            <div className="space-y-4">
                <button 
                  onClick={() => setIsHoldingBook(!isHoldingBook)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${isHoldingBook ? 'border-emerald-400 bg-emerald-400/5' : 'border-white/5 bg-white/5 opacity-50 hover:opacity-100'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isHoldingBook ? 'bg-emerald-400 text-black scale-110 shadow-lg shadow-emerald-400/30' : 'bg-slate-800 text-slate-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${isHoldingBook ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isHoldingBook ? 'Book_Engaged' : 'Holding_Manual'}
                  </span>
                </button>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
                   <p className="text-[10px] text-slate-400 italic leading-relaxed text-center">
                     “Density dissolves by knowledge. Iron turns soft; the impossible becomes passage.”
                   </p>
                </div>
            </div>
          </div>
        </nav>

        {/* 2. Center Viz: The Infinity Loop */}
        <div className="flex-1 relative flex items-center justify-center bg-black/40 overflow-hidden min-h-[400px]">
           <div className="absolute inset-0 flex items-center justify-center opacity-30">
               <div className="w-[400px] h-[400px] border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
           </div>

           <div className="relative w-full max-w-2xl px-4 flex flex-col items-center">
              <svg viewBox="0 0 800 400" className="w-full h-auto drop-shadow-2xl">
                 {/* Main Loop Path */}
                 <path 
                    d="M 400,200 C 550,50 750,150 750,200 C 750,250 550,350 400,200 C 250,50 50,150 50,200 C 50,250 250,350 400,200" 
                    fill="none" 
                    stroke={activeMode === 'life' ? '#38bdf8' : activeMode === 'death' ? '#fbbf24' : '#a78bfa'} 
                    strokeWidth="1" 
                    strokeDasharray="4 6"
                    className="opacity-40"
                 />
                 
                 {/* Central Crossover Axis - IBRAHIM */}
                 <g className="transition-all duration-700">
                    <circle cx="400" cy="200" r="14" className="fill-white" />
                    <circle cx="400" cy="200" r="28" className="fill-none stroke-white/20 animate-pulse" strokeWidth="1" />
                    <text x="400" y="250" textAnchor="middle" className="fill-white text-[14px] font-black uppercase tracking-[0.3em]">Ibrahim</text>
                    <text x="400" y="265" textAnchor="middle" className="fill-slate-500 text-[8px] uppercase tracking-widest">The Invariant Axis</text>
                 </g>

                 {/* Flow Particle */}
                 <circle r="4" className="fill-white">
                    <animateMotion 
                      path="M 400,200 C 550,50 750,150 750,200 C 750,250 550,350 400,200 C 250,50 50,150 50,200 C 50,250 250,350 400,200" 
                      dur="12s" 
                      repeatCount="indefinite" 
                    />
                 </circle>

                 {/* Book Node Overlay */}
                 {isHoldingBook && (
                   <g transform="translate(400, 200)">
                      <circle r="60" className="fill-emerald-500/10 stroke-emerald-400/30" strokeWidth="1" strokeDasharray="4,4" />
                      <rect x="-15" y="-20" width="30" height="40" rx="4" className="fill-emerald-400 animate-pulse" />
                      <text y="-35" textAnchor="middle" className="fill-emerald-400 text-[9px] font-bold uppercase tracking-widest">Gate_Open</text>
                   </g>
                 )}

                 {/* State Markers */}
                 <g className={activeMode === 'life' ? 'opacity-100' : 'opacity-20'}>
                    <circle cx="150" cy="200" r="6" className="fill-cyan-400" />
                    <text x="150" y="180" textAnchor="middle" className="fill-cyan-400 text-[10px] font-bold uppercase">Expansion</text>
                 </g>
                 <g className={activeMode === 'death' ? 'opacity-100' : 'opacity-20'}>
                    <circle cx="650" cy="200" r="6" className="fill-amber-400" />
                    <text x="650" y="180" textAnchor="middle" className="fill-amber-400 text-[10px] font-bold uppercase">Compression</text>
                 </g>
              </svg>

              {/* Status Display Area */}
              <div className="mt-8 grid grid-cols-2 gap-12 w-full">
                  <div className="text-left space-y-1">
                      <div className="text-slate-500 text-[9px] uppercase tracking-widest font-bold">Node_Start</div>
                      <div className="text-lg text-white font-serif italic tracking-tight underline decoration-cyan-500/40">Adam + Iblis</div>
                  </div>
                  <div className="text-right space-y-1">
                      <div className="text-slate-500 text-[9px] uppercase tracking-widest font-bold">Node_Return</div>
                      <div className="text-lg text-white font-serif italic tracking-tight underline decoration-amber-500/40">Pure_Idris</div>
                  </div>
              </div>
           </div>
        </div>

        {/* 3. Right Stream: Circuit Manifest & Details */}
        <div className="w-full lg:w-[460px] p-8 glass-panel border-l border-white/5 flex flex-col z-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Circuit Manifest</h3>
            <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] text-slate-400 font-mono">
              SEQ_0x{currentChains.length.toString(16)}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hidden space-y-8">
             <div className="space-y-3">
                {currentChains.map((item, idx) => (
                  <div key={idx} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono text-slate-500">[{idx.toString().padStart(2, '0')}]</span>
                      <span className="text-[11px] font-black text-cyan-400/80">{item.ref}</span>
                    </div>
                    <div className="text-lg text-white font-bold leading-none mb-2 group-hover:text-cyan-300 transition-colors tracking-tight">
                       {item.chain}
                    </div>
                    <div className="text-xs text-slate-400 font-medium italic opacity-70">
                       {item.desc}
                    </div>
                  </div>
                ))}
             </div>

             <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Structural Symmetries</h4>
                <div className="grid grid-cols-1 gap-2">
                   {SYMMETRIES.map((sym, i) => (
                     <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-slate-500/30 transition-all">
                        <span className="text-xs font-bold text-slate-300 group-hover:text-white">{sym.chain}</span>
                        <span className="text-[10px] font-mono text-slate-600">{sym.ref}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5 space-y-4">
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">System Reset Logic</h4>
                <p className="text-xs leading-relaxed text-slate-300 italic font-medium">
                  "A fresh reset installed with every new child—every new second; every new 2 chances in 1 life."
                </p>
                <div className="flex gap-2">
                    <div className="px-3 py-2 bg-black/40 rounded-lg text-[9px] font-bold text-slate-500 border border-white/5">14:22 ACTION_RESET</div>
                    <div className="px-3 py-2 bg-black/40 rounded-lg text-[9px] font-bold text-slate-500 border border-white/5">19:23 TOTAL_RESET</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="h-16 border-t border-white/5 flex items-center justify-center bg-black/60 relative overflow-hidden shrink-0 z-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/[0.03] to-transparent" />
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] relative z-10 italic opacity-80">
            “This is not a story you read. This is a system you are currently running.”
          </p>
      </footer>
    </div>
  );
};

export default QuranicOS;
