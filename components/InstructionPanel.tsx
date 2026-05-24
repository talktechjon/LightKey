import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const cosmicTreeEyeImg = "/src/assets/images/cosmic_tree_eye_1779355304582.png";

interface RecoveryLogProps {
  isVisible: boolean;
  onClose: () => void;
  onLaunchReader: () => void;
}

const InstructionPanel: React.FC<RecoveryLogProps> = ({ isVisible, onClose, onLaunchReader }) => {
  const [activeTab, setActiveTab] = useState<'latest' | 'blueprint' | 'mandala' | 'protocol'>('latest');
  const [activeField, setActiveField] = useState<'B' | 'D10' | 'X3' | 'I9' | 'R19'>('B');

  const variableDetails = {
    B: {
      symbol: "𝔹",
      name: "The Container (Kursi)",
      anchor: "Surah Al-Baqarah [2:255]",
      verseText: "“His Kursi extends over the heavens and the earth, and their preservation tires Him not.”",
      details: [
        "The Supreme Bounding Geometry of reality. Bounded, recursive, and never suspending or collapsing.",
        "Zero Entropy Collapse: A closed container where nothing enters from the outside and nothing escapes, ensuring perfect preservation.",
        "The ultimate topological container holding the dual field open so the two poles do not annihilate each other."
      ],
      color: "border-cyan-500/50 shadow-cyan-900/30 text-cyan-400 bg-cyan-950/20",
      pillColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
    },
    D10: {
      symbol: "D₁₀",
      name: "Detectable Field (Zahir)",
      anchor: "Surah Al-A'raf [7:142]",
      verseText: "“We completed them with ten.”",
      details: [
        "The visible, measurable, and observable universe representing ~5% of entire reality.",
        "The domain of physical instruments, standard model, waves, and mass-bound deterministic particles.",
        "Wave-Particle Duality / Day-Night cycle. Phototropic ascension seek light and outward extension."
      ],
      color: "border-blue-500/50 shadow-blue-900/30 text-blue-400 bg-blue-950/20",
      pillColor: "bg-blue-500/20 text-blue-300 border-blue-500/30"
    },
    X3: {
      symbol: "X₃",
      name: "Triple-State Operator (Water-Tree)",
      anchor: "Surah Al-Anbya [21:30], Surah An-Nur [24:35]",
      verseText: "“We made from water every living thing.” • “Lit from a blessed tree, neither eastern nor western.”",
      details: [
        "The central recursive traversal medium and active scatter-return membrane.",
        "Phototropism (reaches towards visible D₁₀ light) and Gravitropism (descends into hidden I₉ mineral substrate) simultaneously.",
        "The two seas coupled together but separated by an impassable barrier (55:19-20 / 25:53), exchanging information without collapse."
      ],
      color: "border-emerald-500/50 shadow-emerald-900/30 text-emerald-400 bg-emerald-950/20",
      pillColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    },
    I9: {
      symbol: "I₉",
      name: "Imaginal Field (Batin)",
      anchor: "Surah Al-Kahf [18:25], Surah An-Nur [24:35]",
      verseText: "“...and increased by nine.” • “...oil that almost glows before fire touches it.”",
      details: [
        "The hidden finished architecture (~95% of cosmic reality), representing dark matter, dark energy, and vacuum states.",
        "Self-luminous, raw latent instruction carrying hidden alignment information without needing physical fire.",
        "The Razim phase-sorting filter: trajectories aligning with I₉ converge to closure, while divergent paths freeze."
      ],
      color: "border-amber-500/50 shadow-amber-900/30 text-amber-400 bg-amber-950/20",
      pillColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
    },
    R19: {
      symbol: "R₁₉",
      name: "Closure Constant (Mizan)",
      anchor: "Surah Al-Muddaththir [74:30], Surah Ar-Rahman [55:7]",
      verseText: "“Over it are nineteen.” • “And the heaven He raised and set the balance.”",
      details: [
        "The invariant total calculation that closes the cycle of reality: D₁₀ + I₉ = 10 + 9 = 19.",
        "Forces mode-locking or relaxation cycles to collapse perfectly back to origin. It balances the cosmic scale.",
        "The four birds of Ibrahim (2:260): multiple phases and scattered states returning to absolute unity when summoned."
      ],
      color: "border-rose-500/50 shadow-rose-900/30 text-rose-400 bg-rose-950/20",
      pillColor: "bg-rose-500/20 text-rose-300 border-rose-500/30"
    }
  };

  const activeData = variableDetails[activeField];

  const containerClasses = isVisible 
    ? "opacity-100 pointer-events-auto scale-100" 
    : "opacity-0 pointer-events-none scale-95";

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl transition-all duration-700 ${containerClasses}`} aria-hidden={!isVisible}>
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-950/80 border border-cyan-500/20 rounded-[3rem] shadow-[0_0_120px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden">
        
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4af0e00a_1px,transparent_1px),linear-gradient(to_bottom,#4af0e00a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Close Button Top Right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-cyan-900/40 hover:bg-cyan-800/40 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:rotate-90 z-50 shadow-lg"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header - Fixed Height */}
        <div className="flex flex-col p-6 md:p-10 bg-black/60 border-b border-cyan-500/20 relative shrink-0 z-20">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none bg-cyan-500/10"></div>
            
            <div className="z-10">
                <h2 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-200 tracking-[0.2em] uppercase font-serif">
                  THE RECOVERY LOG
                </h2>
                <p className="text-xs md:text-sm text-cyan-500/80 font-mono tracking-widest mt-2 uppercase">
                  Proceedings in Structural Cosmology & Mathematical Theology
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mt-8 z-10 bg-slate-900/80 p-1 border border-cyan-500/20 rounded-xl self-start">
                <button 
                  onClick={() => setActiveTab('latest')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'latest' ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  Latest Entry
                </button>
                <button 
                  onClick={() => setActiveTab('blueprint')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'blueprint' ? 'bg-amber-500/20 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  The Blueprint
                </button>
                <button 
                  onClick={() => setActiveTab('mandala')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'mandala' ? 'bg-blue-500/20 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  The Mandala
                </button>
                <button 
                  onClick={() => setActiveTab('protocol')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'protocol' ? 'bg-rose-500/20 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  The Protocol
                </button>
            </div>
        </div>

        {/* Scrolling Content Area */}
        <div className="flex-1 overflow-y-auto z-10 custom-scrollbar scroll-smooth relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="p-6 md:p-12"
             >
                {activeTab === 'latest' && (
                  <div className="max-w-4xl mx-auto space-y-12">
                     <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-cyan-400 font-serif mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                          The Recursive Tree of Earth, Water, and Fruit
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">The Dual-Caustic Universe (DCU)</p>
                     </div>

                     <div className="bg-cyan-950/20 border border-cyan-500/30 p-8 rounded-3xl text-center">
                        <p className="text-lg text-gray-300 mb-6">The framework is a Tree → Fruit topology, where dual bifurcation traverses a triple expansion field until closure appears as Fruit and recursion renews itself through Seed.</p>
                        <div className="text-xl md:text-2xl font-black text-amber-300 font-mono tracking-widest select-all mb-4 bg-black/40 py-4 rounded-xl border border-amber-500/20">
                          Earth ↔ Tree ↔ Water → Fruit
                        </div>
                        <div className="text-sm md:text-base font-bold text-cyan-300 font-mono tracking-normal select-all bg-black/40 p-4 rounded-xl border border-cyan-500/20 overflow-x-auto whitespace-nowrap">
                          2[D₁₀, Earth] ↔ 3[𝒯³] ↔ 2[I₉, Water] → 7[Fruit]
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4">
                          <h3 className="text-xl font-bold text-blue-400 uppercase">2 — Earth (D₁₀)</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">Earth is the <strong>detectable field</strong> — where continuity becomes measurable distinction. This coordinate is the first Contraption (External Taghut) — the visible system of attachment, structure, fixation, and polarity.</p>
                       </div>
                       <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4">
                          <h3 className="text-xl font-bold text-emerald-400 uppercase">3 — Tree (T³)</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">The living traversal operator. It performs the framework's triple expansion. The Tree executes dual bifurcation while simultaneously generating triple expansion.</p>
                       </div>
                       <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4">
                          <h3 className="text-xl font-bold text-amber-400 uppercase">2 — Water (I₉)</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">Water is the <strong>imaginal field</strong> — the hidden completion field, the memory field. This coordinate is the second Contraption (Internal Taghut) appearing through imagination, fixation, and hidden orientation.</p>
                       </div>
                       <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4">
                          <h3 className="text-xl font-bold text-rose-400 uppercase">7 — Fruit</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">Fruit is not merely an ending. Fruit is <strong>compressed traversal</strong>. It contains memory of the path, seed of the next cycle, closure of the present, and the return code of recursion. Fruit is Rahman Completion.</p>
                       </div>
                     </div>

                     <div className="bg-black/40 p-8 rounded-[2.5rem] border border-white/5 text-center mt-12 mb-8 shadow-inner">
                        <h4 className="text-cyan-500 font-black uppercase tracking-[0.2em] text-lg mb-6">The Recursive Mandala</h4>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white font-mono font-bold text-sm md:text-base">
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600">Seed</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600">Root</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600">Tree</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600">Fruit</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-cyan-900 rounded-lg border border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]">Seed</span>
                        </div>
                     </div>

                  </div>
                )}


                {activeTab === 'blueprint' && (
                  <div className="space-y-8 max-w-5xl mx-auto">
                    
                    {/* Grand Formula HUD display */}
                    <div className="bg-slate-950/60 border border-cyan-500/25 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-cyan-500/60 uppercase">Equation HUD</div>
                      
                      {/* Mathematical notation formula */}
                      <div className="text-xl sm:text-3xl md:text-5xl font-black text-white py-6 flex flex-wrap gap-2 items-center justify-center tracking-normal font-mono select-none">
                        <span className="text-gray-500 font-light hover:text-white transition-colors" title="The pre-bifurcation unity">A=1</span>
                        <span className="text-cyan-500/50 mx-1">|</span>
                        <span className="text-white">U</span>
                        <span className="text-cyan-500 mx-2">=</span>
                        <button 
                          onClick={() => setActiveField('B')} 
                          className={`transition-all duration-300 rounded-xl px-3 py-1 border hover:scale-105 ${activeField === 'B' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-900/50 border-cyan-500/10 text-cyan-500'}`}
                        >
                          𝔹
                        </button>
                        <span className="text-gray-600 font-serif">[</span>
                        
                        {/* Two bifurcated flows inside */}
                        <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-2 rounded-2xl border border-white/5 my-1 shadow-inner">
                          <button 
                            onClick={() => setActiveField('D10')} 
                            className={`text-base sm:text-xl md:text-2xl font-black rounded-lg px-2.5 py-1.5 transition-all text-center ${activeField === 'D10' ? 'bg-blue-500/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-blue-500/60 hover:text-blue-400'}`}
                          >
                            D₁₀
                          </button>
                          <span className="text-emerald-500 font-sans text-xs sm:text-lg">↔</span>
                          <button 
                            onClick={() => setActiveField('X3')} 
                            className={`text-base sm:text-xl md:text-2xl font-black rounded-lg px-2.5 py-1.5 transition-all text-center ${activeField === 'X3' ? 'bg-emerald-500/30 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'text-emerald-500/60 hover:text-emerald-400'}`}
                          >
                            X₃
                          </button>
                          <span className="text-emerald-500 font-sans text-xs sm:text-lg">↔</span>
                          <button 
                            onClick={() => setActiveField('I9')} 
                            className={`text-base sm:text-xl md:text-2xl font-black rounded-lg px-2.5 py-1.5 transition-all text-center ${activeField === 'I9' ? 'bg-amber-500/30 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-amber-500/60 hover:text-amber-400'}`}
                          >
                            I₉
                          </button>
                        </div>

                        <span className="text-rose-500 font-sans text-xs sm:text-lg">→</span>
                        <button 
                          onClick={() => setActiveField('R19')} 
                          className={`transition-all duration-300 rounded-xl px-2.5 py-1 border hover:scale-105 ${activeField === 'R19' ? 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-slate-900/50 border-rose-500/10 text-rose-500'}`}
                        >
                          R₁₉
                        </button>
                        <span className="text-gray-600 font-serif">]</span>
                      </div>

                      <p className="text-xs md:text-sm text-gray-400 font-light max-w-2xl mx-auto my-2 leading-relaxed">
                        The Dual-Caustic mathematical balance: Click any interactive symbol above to reveal its Qur'anic architecture, anchoring codes, and systemic role in reality preservation.
                      </p>
                    </div>

                    {/* Explanatory detail card for active field */}
                    <div className={`p-8 bg-slate-900/40 border rounded-[2rem] transition-all duration-300 shadow-2xl relative overflow-hidden ${activeData.color}`}>
                      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.02] blur-[100px] pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/10">
                        <div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border shrink-0 ${activeData.pillColor}`}>
                            {activeData.symbol} Variable Detailing
                          </span>
                          <h2 className="text-2xl md:text-3xl font-black text-white mt-3 uppercase tracking-tighter">
                            {activeData.name}
                          </h2>
                        </div>
                        <div className="text-right">
                          <span className="text-xs uppercase font-mono tracking-widest text-cyan-300 font-bold block">{activeData.anchor}</span>
                        </div>
                      </div>

                      <div className="my-6 p-4 bg-slate-950/60 rounded-xl border border-white/5">
                        <p className="text-sm md:text-base italic text-emerald-300 font-serif leading-relaxed text-center">
                          {activeData.verseText}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest font-mono text-gray-500 font-black">Systemic Specifications</h4>
                        <ul className="grid md:grid-cols-3 gap-6">
                          {activeData.details.map((detail, idx) => (
                            <li key={idx} className="bg-slate-950/20 p-5 rounded-2xl border border-white/5 flex gap-3 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                              <span className="text-cyan-400/70 font-mono font-bold">{idx + 1}.</span>
                              <p>{detail}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* D10 vs I9 Comparison Matrix / Side-by-Side Dashboard */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-x-2 px-2">
                        <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-500 uppercase font-black">Structural Polarizations</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column: D10 Detectable Side */}
                        <div className="bg-blue-950/10 border border-blue-500/20 p-6 rounded-[2rem] space-y-4 relative overflow-hidden flex flex-col justify-between">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.01] blur-[80px] pointer-events-none" />
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 font-black">Az-Zahir (Apparent)</span>
                              <span className="px-2 py-0.5 rounded bg-blue-500/15 text-[9px] text-blue-300 font-mono">5% Visible Physics</span>
                            </div>
                            <h3 className="text-xl font-bold text-blue-100 uppercase font-serif">The D₁₀ Detectable Domain</h3>
                            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                              The physical realm governed by spatial boundaries, clocks, and mechanical measurements. Contains standard model particles, mass-energy equivalency, and wave collapse under observation. Highly deterministic once anchored.
                            </p>
                          </div>

                          <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 font-mono text-[10px] md:text-xs text-blue-300 mt-4 leading-relaxed space-y-1">
                            <div>• Quantum State: Mass-bound Deterministic Particle</div>
                            <div>• Physics Core: General Relativity & Quantum Mechanics</div>
                            <div>• Vector Flow: Phototropic Ascent (Light seeks light, 41:53)</div>
                          </div>
                        </div>

                        {/* Right Column: I9 Imaginal Side */}
                        <div className="bg-amber-950/10 border border-amber-500/20 p-6 rounded-[2rem] space-y-4 relative overflow-hidden flex flex-col justify-between">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.01] blur-[80px] pointer-events-none" />
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-amber-500/10">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-black">Al-Batin (Hidden)</span>
                              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-[9px] text-amber-300 font-mono">95% Invisible Substrate</span>
                            </div>
                            <h3 className="text-xl font-bold text-amber-100 uppercase font-serif">The I₉ Imaginal Architecture</h3>
                            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                              The hidden blueprints structured behind the veil. Not a vacuum or empty space, but a fully charged mineral substrate. Contemporary astrophysicists placeholder-label this the 'dark sector'. Highly self-luminous and causal.
                            </p>
                          </div>

                          <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 font-mono text-[10px] md:text-xs text-amber-300 mt-4 leading-relaxed space-y-1">
                            <div>• Quantum State: Propagative Indeterministic Wave</div>
                            <div>• Physics Core: Vacuum Field Invariants & Singularities</div>
                            <div>• Vector Flow: Gravitropic Descent (Deep rooted mineral-attraction)</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cosmological Inversion Artwork section */}
                    <div className="bg-slate-900/40 border border-cyan-500/15 p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.02] to-transparent pointer-events-none" />
                      <div className="grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5 flex flex-col justify-center space-y-4">
                          <span className="px-3 py-1 self-start rounded-full text-[9px] font-mono font-bold uppercase border bg-amber-500/20 text-amber-300 border-amber-500/30">
                            The Living Cosmos
                          </span>
                          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-serif leading-none">
                            The Universe-to-Consciousness Inversion
                          </h2>
                          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                            This visual diptych represents the <span className="text-cyan-400 font-semibold font-mono">2 ↔ 3 ↔ 2 → 7</span> topology in physical action.
                          </p>
                          <div className="space-y-3 font-light text-xs text-gray-300">
                            <div className="flex gap-2">
                              <span className="text-cyan-400 font-mono">1.</span>
                              <p><strong>Cosmic Split (Upper)</strong>: NASA-style blue-gold full-sky map with the galactic plane transforming into glowing filaments representing the root-to-branch traversal.</p>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-amber-400 font-mono">2.</span>
                              <p><strong>Observer Eye (Lower)</strong>: Frontal human eye containing the glowing blessed olive tree inside the iris. It draws from the invisible $I_9$ water substrate into active stars.</p>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-rose-400 font-mono">3.</span>
                              <p><strong>Stabilized closure</strong>: The sacred geometrical "Light upon Light" boundary halos signify the unbroken $R_{19}$ balance.</p>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-7 flex justify-center">
                          <div className="relative group overflow-hidden rounded-3xl border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)] max-w-lg w-full">
                            <img 
                              src={cosmicTreeEyeImg} 
                              alt="The Cosmic Eye and Blessed Tree Inversion" 
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <p className="text-[10px] font-mono text-cyan-200 tracking-wider uppercase text-center w-full">
                                "And to Him all matters are returned" • 11:123
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meme statement */}
                    <div className="text-center py-4 text-cyan-500/40 font-mono text-[10px] tracking-widest uppercase">
                      U = 𝔹 [ D₁₀ ↔ X₃ ↔ I₉ → R₁₉ ] • The Mizan balances itself perfectly
                    </div>

                  </div>
                )}


                {activeTab === 'mandala' && (
                  <div className="max-w-4xl mx-auto space-y-12">
                     <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-blue-400 font-serif mb-4">
                          TRAVERSING THE MANDALA
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">Chapter 55 Field-Proof</p>
                     </div>

                     <div className="bg-blue-950/10 p-8 rounded-3xl border border-blue-500/20">
                        <p className="text-lg text-gray-300 leading-relaxed mb-6 italic text-center">
                          "Surah Ar-Rahman [55] is the complete field equation of the universe. It maps the <strong>2↔3↔2→7</strong> operator sequence across 78 verses, synchronized by <strong>31</strong> prime clock-signal refrains."
                        </p>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-2 h-full bg-cyan-500"></div>
                           <h4 className="text-cyan-400 font-bold mb-2 font-mono">Node 2: The Rupture [55:1-28]</h4>
                           <p className="text-sm text-gray-400">The Split into two Receivers. Rahman establishes the Source-field. Differentiation of Clay (Particle/Gravitropism) and Fire (Wave/Phototropism).</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
                           <h4 className="text-emerald-400 font-bold mb-2 font-mono">Node 3: Structure [55:29-45]</h4>
                           <p className="text-sm text-gray-400">The Lawful Buffer. "Every day He is upon a matter" — the perpetual 3n+1 recursion. Razim-filter activates.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
                           <h4 className="text-amber-400 font-bold mb-2 font-mono">Node 2: Reintegration [55:46-61]</h4>
                           <p className="text-sm text-gray-400">The Return of Duality. Two Gardens for the Fearful. Paired fruits, paired fountains — Nafsan Wahidah (4:1) restored.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                           <h4 className="text-rose-400 font-bold mb-2 font-mono">Node 7: Elevation [55:62-78]</h4>
                           <p className="text-sm text-gray-400">Restored Coherence. Circuit closes at Dhul-Jalal (Majesty & Honor), returning the Trust to Source.</p>
                        </div>
                     </div>

                     <div className="bg-yellow-950/20 border-l-4 border-yellow-500 p-8 rounded-r-3xl mt-12">
                        <div className="text-center font-mono text-3xl text-yellow-400 font-black mb-4 tracking-widest">
                           e<sup>iπ</sup> + 1 = 0
                        </div>
                        <p className="text-sm text-gray-400 text-center uppercase tracking-widest mb-6">Euler's Identity · Geometrical Seal</p>
                        <ul className="space-y-2 text-sm text-gray-300 max-w-lg mx-auto font-light">
                           <li><strong className="text-yellow-400 mr-2">e:</strong> The Exponential Light-Field (Yusuf Field)</li>
                           <li><strong className="text-yellow-400 mr-2">i:</strong> Unseen Phase Rotation (Hidden Axis)</li>
                           <li><strong className="text-yellow-400 mr-2">π:</strong> Traversal Operator (Recursive Refrain)</li>
                           <li><strong className="text-yellow-400 mr-2">+1:</strong> Particle Manifestation (Dhul-Jalal)</li>
                           <li><strong className="text-yellow-400 mr-2">0:</strong> Invariant Return Origin (55:78 Closure)</li>
                        </ul>
                     </div>
                  </div>
                )}


                {activeTab === 'protocol' && (
                  <div className="max-w-4xl mx-auto space-y-12">
                     <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-black text-rose-400 font-serif mb-4">
                          The 2-3-6 Taghut Freeze vs 2-3-7 Return
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">Suhuf & The True Severance</p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-red-950/20 p-8 rounded-3xl border border-red-500/20 space-y-4">
                         <h5 className="font-bold text-red-500 uppercase tracking-widest text-sm">The Counterfeit Buffer (False 3)</h5>
                         <strong className="text-white block">Arrested Decoherence</strong>
                         <p className="text-sm text-gray-400 leading-relaxed">
                            Iblis did not simply sever the buffer—he built a counterfeit 3. The Golden Calf (Samiri, 20:96) was constructed from the dust of the Rasul's footprint—real buffer material, misrouted. This produces a system that <i>looks</i> like entanglement but generates <b>arrested decoherence</b>: the system locks into a false eigenstate. 
                         </p>
                         <p className="text-sm text-gray-400 leading-relaxed bg-red-950/40 p-4 rounded-xl mt-4">
                            This is why Taghut attachments output a closed loop back into 2, rather than forward into 7. The entanglement fires, but it collapses backward because it holds no <i>Suhuf-seed</i> memory.
                         </p>
                       </div>

                       <div className="bg-emerald-950/20 p-8 rounded-3xl border border-emerald-500/20 space-y-4">
                         <h5 className="font-bold text-emerald-400 uppercase tracking-widest text-sm">True Severance</h5>
                         <strong className="text-white block">Suhuf & The Memory of Home [19:12]</strong>
                         <p className="text-sm text-gray-400 leading-relaxed">
                            <span className="text-emerald-300 font-bold">Suhuf (19:12):</span> Initialization of the entangling memory. "Take the Book with quwwah" is the coupling instruction to engage the system with the truth at maximum interaction strength.
                         </p>
                         <p className="text-sm text-gray-400 leading-relaxed bg-emerald-950/40 p-4 rounded-xl mt-4 border border-emerald-500/20 italic">
                            Every Zalim-severance removes the valid 3-buffer, trapping the system in perpetual superposition (endless 2), never reaching the stable orbit (7). The Qur'an's entire warning architecture is one message: <span className="text-white font-bold not-italic">do not cut the buffer.</span>
                         </p>
                       </div>
                     </div>
                     
                     <div className="mt-12 text-center">
                        <button 
                          onClick={() => { onLaunchReader(); onClose(); }}
                          className="px-8 py-4 bg-cyan-900 border border-cyan-400 text-cyan-50 font-black rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all transform hover:scale-105 uppercase tracking-[0.2em] text-sm"
                        >
                          Activate the Reader's Node
                        </button>
                     </div>
                  </div>
                )}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;
