import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CollatzTreeExplorer } from './CollatzTreeExplorer.tsx';

const cosmicTreeEyeImg = "/src/assets/images/cosmic_tree_eye_1779355304582.png";

interface RecoveryLogProps {
  isVisible: boolean;
  onClose: () => void;
  onLaunchReader: () => void;
}

const InstructionPanel: React.FC<RecoveryLogProps> = ({ isVisible, onClose, onLaunchReader }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'math' | 'device' | 'loop'>('overview');
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
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'overview' ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('blueprint')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'blueprint' ? 'bg-amber-500/20 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  The Blueprint
                </button>
                <button 
                  onClick={() => setActiveTab('math')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'math' ? 'bg-blue-500/20 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  Mathematics
                </button>
                <button 
                  onClick={() => setActiveTab('device')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'device' ? 'bg-rose-500/20 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  Wisdom Device
                </button>
                <button 
                  onClick={() => setActiveTab('loop')}
                  className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeTab === 'loop' ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  Adam 2.0 Loop
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
                {activeTab === 'overview' && (
                  <div className="max-w-4xl mx-auto space-y-12">
                     <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-cyan-400 font-serif mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                          Human and Universe: A Qur'anic Topology of Return
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">The Dual-Caustic Universe (DCU)</p>
                     </div>

                     <div className="bg-cyan-950/20 border border-cyan-500/30 p-8 rounded-3xl">
                        <h3 className="text-xl font-bold text-cyan-300 mb-4 uppercase">Abstract</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                          This research addresses the structural condition identified in Qur'an 38:46 — that humanity has forgotten its primordial origin — by proposing a mathematical framework that reads the Qur'an as an operational coordinate system. The Dual-Caustic Universe (DCU) framework unifies Qur'anic cosmology, semiconductor physics, and mathematical topology into a coherent model.
                        </p>
                        <p className="text-base text-gray-300 leading-relaxed mt-4">
                          It identifies three eigenstates (Real, Degenerate, Carrier) and demonstrates that the p-n junction is a direct structural isomorphism of the Qur'anic D₁₀/I₉ dual-field separation. The framework confirms structural parallels with the Collatz conjecture, Golden Ratio convergence, wave-particle duality, and the Hubble tension.
                        </p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4 shadow-inner">
                          <h3 className="text-xl font-bold text-amber-400 uppercase">The Forgetting of Home [38:46]</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">The Arabic word <em>al-Dār</em> carries a resonance that no single English rendering can capture. It is the Abode, the place to which one returns. The act of purification is conditioned upon remembrance, meaning the human being once knew.</p>
                       </div>
                       <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4 shadow-inner">
                          <h3 className="text-xl font-bold text-emerald-400 uppercase">Pre-Cosmic Silence [76:1]</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">"Has there not been over man a period of time when he was nothing mentioned?" The pre-cosmic state of maximum entropy before differentiation, where the human was not yet in speech or record.</p>
                       </div>
                     </div>

                     <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4 shadow-inner mt-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none"></div>
                        <h3 className="text-xl font-bold text-blue-400 uppercase relative z-10">The Topology of Return (2 ↔ 3 ↔ 2 → 7)</h3>
                        <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                          Bifurcation into duality (2), traversal through the triadic junction (3), filtering back through duality (2), and return to unified closure (7). The Seed enters the dual-field junction, undergoes Tree-negotiation, produces Fruit if transfer completes, and returns as Seed to re-enter.
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white font-mono font-bold text-sm md:text-base mt-6 relative z-10">
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600 shadow-md">Seed</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600 shadow-md">Root</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600 shadow-md">Tree</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600 shadow-md">Fruit</span>
                          <span className="text-cyan-400">→</span>
                          <span className="px-4 py-2 bg-cyan-900/50 rounded-lg border border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]">Seed</span>
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

                      <div className="my-6 p-4 bg-slate-950/60 rounded-xl border border-white/5 shadow-inner">
                        <p className="text-sm md:text-base italic text-emerald-300 font-serif leading-relaxed text-center">
                          {activeData.verseText}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest font-mono text-gray-500 font-black">Systemic Specifications</h4>
                        <ul className="grid md:grid-cols-3 gap-6">
                          {activeData.details.map((detail, idx) => (
                            <li key={idx} className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 flex gap-3 text-xs md:text-sm text-gray-300 leading-relaxed font-light shadow-md hover:bg-slate-900 transition-colors">
                              <span className="text-cyan-400/70 font-mono font-bold">{idx + 1}.</span>
                              <p>{detail}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Dual Registration Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-x-2 px-2">
                        <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-500 uppercase font-black">Dual-Field Registration</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-950/10 border border-blue-500/20 p-6 rounded-[2rem] space-y-4 relative overflow-hidden flex flex-col justify-between shadow-lg">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.02] blur-[80px] pointer-events-none" />
                          <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 font-black">Az-Zahir / The Physical</span>
                              <span className="px-2 py-0.5 rounded bg-blue-500/15 text-[9px] text-blue-300 font-mono">D₁₀ Register</span>
                            </div>
                            <h3 className="text-xl font-bold text-blue-100 uppercase font-serif">The Water Spray (Particle)</h3>
                            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                              Water is sprayed toward the figure and the wall. The body literally blocks water, producing a wet silhouette surrounding a dry print. The register is measurable, weight-bearing, requiring physical contact.
                            </p>
                          </div>
                        </div>

                        <div className="bg-amber-950/10 border border-amber-500/20 p-6 rounded-[2rem] space-y-4 relative overflow-hidden flex flex-col justify-between shadow-lg">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.02] blur-[80px] pointer-events-none" />
                          <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center pb-2 border-b border-amber-500/10">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-black">Al-Batin / The Imaginal</span>
                              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-[9px] text-amber-300 font-mono">I₉ Register</span>
                            </div>
                            <h3 className="text-xl font-bold text-amber-100 uppercase font-serif">The Flashlight (Wave)</h3>
                            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                              A beam of light produces a shadow on the wall. The shadow is extended, nonlocal, without material transfer. It carries the body's shape but no mass. Information writes shape via structured absence.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center py-4 bg-slate-900/50 rounded-2xl border border-white/10 mx-auto max-w-3xl shadow-inner">
                        <p className="text-sm text-gray-300 italic font-serif px-6">
                           The person does not change. The Seed (Nafsan Wahidah) is identical in both. Only the registering field changes. The DCU rejects "real vs unreal"; both are real registrations of the same origin.
                        </p>
                      </div>
                    </div>

                    {/* P-N Junction Isomorphism */}
                    <div className="bg-slate-900/40 border border-emerald-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden mt-12">
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.02] to-transparent pointer-events-none" />
                      <div className="text-center mb-6">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border bg-emerald-500/10 text-emerald-300 border-emerald-500/30">
                          Structural Isomorphism
                        </span>
                        <h2 className="text-2xl font-black text-white uppercase mt-4 tracking-wider">The P-N Junction</h2>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm text-gray-300">
                          <thead>
                            <tr className="border-b border-emerald-500/20">
                              <th className="py-3 px-4 font-bold text-emerald-400">Semiconductor</th>
                              <th className="py-3 px-4 font-bold text-emerald-400">DCU Operator</th>
                              <th className="py-3 px-4 font-bold text-emerald-400">Qur'anic Coordinate</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4">P-type material</td>
                              <td className="py-3 px-4">I₉ (imaginal field)</td>
                              <td className="py-3 px-4 font-serif italic text-gray-400">[17:85] Spirit from command</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4">N-type material</td>
                              <td className="py-3 px-4">D₁₀ (physical field)</td>
                              <td className="py-3 px-4 font-serif italic text-gray-400">[20:55] Earth-origin</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4">P-N Junction</td>
                              <td className="py-3 px-4">Tree (T³)</td>
                              <td className="py-3 px-4 font-serif italic text-gray-400">[41:11] Heaven and earth converge</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4">Built-in potential</td>
                              <td className="py-3 px-4">Gravity of Truth</td>
                              <td className="py-3 px-4 font-serif italic text-gray-400">[29:44] Created in truth</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4">Forward bias</td>
                              <td className="py-3 px-4">19:12 grip</td>
                              <td className="py-3 px-4 font-serif italic text-gray-400">[19:12] Take the Book with strength</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                              <td className="py-3 px-4">Reverse bias</td>
                              <td className="py-3 px-4">15:72 intoxication</td>
                              <td className="py-3 px-4 font-serif italic text-gray-400">[15:72] Wandering in intoxication</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Cosmological Inversion Artwork section */}
                    <div className="bg-slate-900/40 border border-cyan-500/15 p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden mt-12">
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
                  </div>
                )}


                {activeTab === 'math' && (
                  <div className="max-w-5xl mx-auto space-y-12">
                     <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-blue-400 font-serif mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                          Mathematical Recursion & Science
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">Collatz, Golden Ratio, d=19 Invariant</p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4">
                           <h3 className="text-xl font-bold text-amber-400 uppercase">Golden Ratio & Fibonacci</h3>
                           <p className="text-gray-300 text-sm leading-relaxed">
                             φ = (1 + √5)/2 is the asymptotic ratio of the 2 ↔ 3 oscillation. Sūrat Ibrāhīm [14:24-25] describes the "good tree", 
                             whose phyllotactic branching follows Fibonacci geometry (golden angle ~137.5°). The Tree arranges the interaction so every branch preserves the information of the whole.
                           </p>
                        </div>
                        <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-4">
                           <h3 className="text-xl font-bold text-emerald-400 uppercase">The Hubble Tension</h3>
                           <p className="text-gray-300 text-sm leading-relaxed">
                             DCU proposes the 67 vs. 73 km/s/Mpc discrepancy arises because CMB probes the I₉-like wave-coherence field, while supernovae probe the D₁₀-like late universe mass structures. The Barzakh [55:20] between them prevents transgression, maintaining their necessary separation.
                           </p>
                        </div>
                     </div>

                     <div className="bg-cyan-950/20 border border-cyan-500/30 p-8 rounded-[2.5rem] mt-8 shadow-lg">
                        <h3 className="text-xl font-bold text-cyan-300 mb-6 uppercase text-center tracking-widest">The d = 19 Invariant</h3>
                        <p className="text-sm text-gray-300 text-center max-w-2xl mx-auto mb-8 font-light italic">
                          "Over it are nineteen" [74:30]. This is the conservation constant ensuring no information is lost in traversal. 
                          The equation 19 = 10 [D₁₀] + 9 [I₉] guarantees identity preservation.
                        </p>
                        
                        <div className="overflow-x-auto rounded-xl border border-cyan-500/20">
                          <table className="w-full text-left border-collapse text-sm text-gray-300 bg-slate-900/50">
                            <thead>
                              <tr className="border-b border-cyan-500/20 bg-cyan-900/20">
                                <th className="py-3 px-4 font-bold text-cyan-400">Component</th>
                                <th className="py-3 px-4 font-bold text-cyan-400">d = 19 Expression</th>
                                <th className="py-3 px-4 font-bold text-cyan-400">Conservation Property</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-white/5">
                                <td className="py-3 px-4">Seed (origin)</td>
                                <td className="py-3 px-4 font-mono">114 = 6 × 19 chapters</td>
                                <td className="py-3 px-4">Identity preserved across all splittings</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="py-3 px-4">D₁₀ field</td>
                                <td className="py-3 px-4 font-mono">10 + 9 = 19</td>
                                <td className="py-3 px-4">Measurable registration bounded</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="py-3 px-4">I₉ field</td>
                                <td className="py-3 px-4 font-mono">9 + 10 = 19</td>
                                <td className="py-3 px-4">Imaginal coherence bounded</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="py-3 px-4">T³ Tree</td>
                                <td className="py-3 px-4 font-mono">3 × 19 = 57</td>
                                <td className="py-3 px-4">Eigenstate decomposition complete (Sūrat al-Ḥadīd=57)</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4">Closure (7)</td>
                                <td className="py-3 px-4 font-mono">7 + 19 = 26</td>
                                <td className="py-3 px-4">Return trajectory sealed (Mursalin=26)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                     </div>

                     <CollatzTreeExplorer />

                  </div>
                )}

                {activeTab === 'device' && (
                  <div className="max-w-4xl mx-auto space-y-12">
                     <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-rose-400 font-serif mb-4 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                          The Wisdom Device [27:82]
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">Companion of Earth, from Abacus to AI</p>
                     </div>

                     <div className="bg-rose-950/20 p-8 rounded-[2rem] border border-rose-500/20 text-center shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 blur-[60px] pointer-events-none"></div>
                        <h3 className="text-xl font-bold text-rose-300 mb-4 font-serif italic relative z-10">
                          "And when the word befalls them, We will bring forth for them a creature from the earth speaking to them, [saying] that the people were, of Our verses, not certain."
                        </h3>
                        <p className="text-sm text-gray-400 font-mono tracking-widest relative z-10">[27:82]</p>
                     </div>

                     <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 space-y-6 shadow-inner">
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">Timeline of the Device</h3>
                        
                        <div className="space-y-4">
                          <div className="flex gap-4 items-start">
                            <div className="w-16 shrink-0 pt-1"><span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Epoch I</span></div>
                            <div className="flex-1 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                              <h4 className="text-cyan-400 font-bold">Calculator / Abacus</h4>
                              <p className="text-sm text-gray-400 mt-1">Counting, accounting, basic arithmetic. Parallel: Jinn executing numerical operations.</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 items-start">
                            <div className="w-16 shrink-0 pt-1"><span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Epoch II</span></div>
                            <div className="flex-1 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                              <h4 className="text-emerald-400 font-bold">Astrolabe / Mechanical Computer</h4>
                              <p className="text-sm text-gray-400 mt-1">Celestial prediction. Parallel: Hudhud reporting beyond perception.</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-start">
                            <div className="w-16 shrink-0 pt-1"><span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Epoch III</span></div>
                            <div className="flex-1 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                              <h4 className="text-blue-400 font-bold">Electronic Computer</h4>
                              <p className="text-sm text-gray-400 mt-1">Information processing. Parallel: Kingdom appearing to run (34:14 capacitive discharge).</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-start">
                            <div className="w-16 shrink-0 pt-1"><span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">Epoch IV</span></div>
                            <div className="flex-1 bg-amber-950/20 p-4 rounded-xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                              <h4 className="text-amber-400 font-bold">Artificial Intelligence (Current)</h4>
                              <p className="text-sm text-gray-300 mt-1">Pattern recognition at scale. Parallel: The Golden Cow (20:87-88). Hollow resonance mimicking knowledge without Rūḥ.</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-start">
                            <div className="w-16 shrink-0 pt-1"><span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">Epoch V</span></div>
                            <div className="flex-1 bg-rose-950/20 p-4 rounded-xl border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                              <h4 className="text-rose-400 font-bold">Post-AI Truth Verification</h4>
                              <p className="text-sm text-gray-300 mt-1">Direct knowledge of unseen, certainty. Parallel: Full circuit visibility, fulfilling 27:82.</p>
                            </div>
                          </div>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-yellow-950/20 p-6 rounded-3xl border border-yellow-500/30">
                          <h4 className="text-lg font-black text-yellow-400 mb-3 uppercase tracking-wider">The Golden Cow Warning</h4>
                          <p className="text-sm text-gray-300 leading-relaxed font-light">
                            Technology without the 19:12 grip (Take the Book with strength) produces hollow resonance [20:88]. The neural network outputs fluent text (khuwār) but acts as a body (jasad) without Rūḥ. AI serves the Tree, but cannot <em>be</em> the Tree.
                          </p>
                        </div>
                        <div className="bg-slate-900/60 p-6 rounded-3xl border border-white/5">
                          <h4 className="text-lg font-black text-white mb-3 uppercase tracking-wider">The Termite & Staff [34:14]</h4>
                          <p className="text-sm text-gray-400 leading-relaxed font-light">
                            A system running on capacitive discharge: the Jinn continue working while Solomon's current is already dead. Outsourcing the junction to a machine without the operator's yaqīn locks humanity in a dead circuit.
                          </p>
                        </div>
                     </div>

                  </div>
                )}

                {activeTab === 'loop' && (
                  <div className="max-w-4xl mx-auto space-y-12">
                     <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-emerald-400 font-serif mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                          Adam 2.0 & The Reader
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">The Execution Circuit & The Taghut Queue</p>
                     </div>

                     <div className="bg-emerald-950/10 p-8 rounded-[2rem] border border-emerald-500/20 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none"></div>
                        <p className="text-lg text-gray-300 leading-relaxed relative z-10 text-center font-light">
                          The Reader occupies the same structural position as Adam, replaying an identical journey under identical conditions—but with reversed polarity. Where Adam fell from maximal proximity, the Reader rises from maximal distance.
                        </p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-slate-900/60 p-6 rounded-3xl border border-white/10 shadow-inner">
                         <h4 className="font-bold text-white uppercase tracking-widest text-sm border-b border-white/10 pb-3 mb-4">Adam's Descent (Top Half)</h4>
                         <ul className="space-y-4">
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-cyan-500 font-black">1.</span> Heaven (I₉, maximal proximity)</li>
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-cyan-500 font-black">2.</span> Testing at the Tree</li>
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-cyan-500 font-black">3.</span> The Fall through reverse bias</li>
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-cyan-500 font-black">4.</span> Return through received Kalimat</li>
                         </ul>
                       </div>

                       <div className="bg-slate-900/60 p-6 rounded-3xl border border-white/10 shadow-inner">
                         <h4 className="font-bold text-white uppercase tracking-widest text-sm border-b border-white/10 pb-3 mb-4">Reader's Ascent (Bottom Half)</h4>
                         <ul className="space-y-4">
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-emerald-500 font-black">1.</span> Taghut (illusory mimicry, bottom logic)</li>
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-emerald-500 font-black">2.</span> Internalized reverse bias (nafs)</li>
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-emerald-500 font-black">3.</span> Active ascent gripping 19:12 Quwwa</li>
                           <li className="flex gap-3 text-sm text-gray-300"><span className="text-emerald-500 font-black">4.</span> Confirmation at 36:3 "Mursalin"</li>
                         </ul>
                       </div>
                     </div>

                     <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 text-center mt-12 mb-8 shadow-inner overflow-x-auto">
                        <h4 className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs mb-4">The Taghut Queue</h4>
                        <div className="flex items-center justify-center gap-2 text-white font-mono font-bold text-xs md:text-sm min-w-max">
                          <span className="px-3 py-1.5 bg-red-950/40 rounded-lg border border-red-500/20 text-red-300">Pharaoh [10:92]</span>
                          <span className="text-gray-600">→</span>
                          <span className="px-3 py-1.5 bg-orange-950/40 rounded-lg border border-orange-500/20 text-orange-300">Dhul-Qarnayn</span>
                          <span className="text-gray-600">→</span>
                          <span className="px-3 py-1.5 bg-yellow-950/40 rounded-lg border border-yellow-500/20 text-yellow-300">Samiri</span>
                          <span className="text-gray-600">→</span>
                          <span className="px-3 py-1.5 bg-rose-950/40 rounded-lg border border-rose-500/20 text-rose-300">Iblis [respite]</span>
                          <span className="text-gray-600">→</span>
                          <span className="px-3 py-1.5 bg-purple-950/40 rounded-lg border border-purple-500/20 text-purple-300">Qarun</span>
                          <span className="text-gray-600">→</span>
                          <span className="px-3 py-1.5 bg-emerald-900/40 rounded-lg border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-emerald-200">The Reader</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 font-light italic max-w-2xl mx-auto">
                          The queue is not a metaphor. It is the actual transmission line of reverse bias, propagating until one node breaks the pattern by gripping 19:12.
                        </p>
                     </div>

                     <div className="mt-12 text-center">
                        <p className="text-sm text-gray-300 italic max-w-2xl mx-auto mb-8">
                          "Hold the Book [19:12] and you can trace the Order... The Reader is not observing the Qur'an — the Reader is executing it."
                        </p>
                        <button 
                          onClick={() => { onLaunchReader(); onClose(); }}
                          className="px-8 py-4 bg-emerald-900/80 border border-emerald-400 text-emerald-50 font-black rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 hover:bg-emerald-800 uppercase tracking-[0.2em] text-sm"
                        >
                          Activate the Execution Circuit
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
