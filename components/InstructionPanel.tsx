
import React, { useState } from 'react';

interface InstructionPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'reflection' | 'cosmology'>('reflection');

  // SEO Optimization: We render the component even if invisible (using CSS to hide it)
  // This allows search engine crawlers to parse the text content.
  const containerClasses = isVisible 
    ? "opacity-100 pointer-events-auto" 
    : "opacity-0 pointer-events-none";

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-500 ${containerClasses}`} aria-hidden={!isVisible}>
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-950/95 border border-gray-800 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
        
        {/* Header - Dynamic based on Tab */}
        <div className="flex flex-col p-6 md:p-8 border-b border-white/10 bg-black/40 relative shrink-0">
           {/* Decorative background element */}
           <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-700 ${activeTab === 'reflection' ? 'bg-cyan-500/10' : 'bg-amber-500/10'}`}></div>

           <div className="flex justify-between items-start z-10">
               <div className="space-y-2 max-w-4xl w-full">
                   {/* Reflection Header */}
                   <div style={{ display: activeTab === 'reflection' ? 'block' : 'none' }}>
                       <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
                         Why You Are Reading The Qur’an?
                       </h2>
                       <p className="text-sm md:text-base text-gray-400 font-light tracking-wide flex items-center gap-2">
                         The Living System of Knowledge <span className="text-gray-600">•</span> <span className="text-cyan-300">Word of Allah</span>
                       </p>
                   </div>
                   
                   {/* Cosmology Header */}
                   <div style={{ display: activeTab === 'cosmology' ? 'block' : 'none' }}>
                       <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-500 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
                         Dual-Field Chrysalis Cosmology
                       </h2>
                       <p className="text-sm md:text-base text-gray-400 font-light tracking-wide font-mono">
                         Resolving the Hubble Tension via Primordial Dual-Field Sampling (10-9)
                           </p>
                   </div>
               </div>

               <button 
                 onClick={onClose}
                 className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 z-20"
                 aria-label="Close"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
           </div>

           {/* Tab Navigation */}
           <div className="flex gap-8 mt-10 z-10 border-b border-white/5">
               <button 
                 onClick={() => setActiveTab('reflection')}
                 className={`pb-3 text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'reflection' ? 'border-cyan-400 text-cyan-100 font-bold shadow-[0_10px_20px_-10px_rgba(34,211,238,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Protocol of Light
               </button>
               <button 
                 onClick={() => setActiveTab('cosmology')}
                 className={`pb-3 text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'cosmology' ? 'border-amber-400 text-amber-100 font-bold shadow-[0_10px_20px_-10px_rgba(251,191,36,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Scientific Research
               </button>
           </div>
        </div>

        {/* Content Area - SEO: Render both tabs using CSS toggling */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent bg-black/20">
           
           {/* ---------------- REFLECTION TAB ---------------- */}
           <div style={{ display: activeTab === 'reflection' ? 'block' : 'none' }}>
            <div className="p-6 md:p-12 space-y-12 text-gray-200 font-light leading-relaxed max-w-5xl mx-auto">
               <section className="text-lg md:text-xl leading-8">
                 <p className="mb-6">
                   You are not reading the Qur’an for history, ritual, or inherited belief.<br/>
                   You are reading it because the Qur’an is a <strong className="text-cyan-100 font-semibold">living system of knowledge</strong> that <strong className="text-cyan-100 font-semibold">tests, filters, and restores truth</strong> by showing you <strong className="text-cyan-100 font-semibold">what you become</strong>.
                 </p>
                 <div className="border-l-4 border-cyan-500/30 pl-6 py-2 italic text-gray-300 bg-gradient-to-r from-cyan-950/20 to-transparent rounded-r-xl">
                   “Say: This is my way; I call to Allah upon <strong className="text-cyan-300 not-italic">clear seeing (baṣīrah)</strong>—I and those who follow me.” <br/>
                   <span className="text-sm not-italic text-cyan-500 block mt-3 font-mono tracking-wider">— Quran 12:108</span>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                   <span className="text-3xl grayscale opacity-70">👁️</span> 
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">HEARING VS SEEING</span>
                 </h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-amber-900/50 transition-colors group">
                       <h4 className="font-bold text-amber-200 mb-4 text-lg group-hover:text-amber-100 transition-colors">Hearing → Obey (Nabī)</h4>
                       <p className="text-gray-300 mb-6 leading-relaxed">
                         Sound, command, repetition. <br/>
                         <span className="text-red-400">Risk:</span> ritual without understanding.
                       </p>
                       <div className="text-xs text-gray-500 font-mono border-t border-gray-800 pt-4">
                         “They say: We hear and we disobey.” (2:93)
                       </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-cyan-900/50 transition-colors group">
                       <h4 className="font-bold text-cyan-200 mb-4 text-lg group-hover:text-cyan-100 transition-colors">Seeing → Follow (Rasūl)</h4>
                       <p className="text-gray-300 mb-6 leading-relaxed">
                         Insight, proof, clarity. <br/>
                         Sound can deceive. <span className="text-emerald-400">Seeing collapses doubt.</span>
                       </p>
                       <div className="text-xs text-gray-500 font-mono border-t border-gray-800 pt-4">
                         “This is insight from your Lord.” (6:104)
                       </div>
                    </div>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-3xl grayscale opacity-70">⚛️</span> 
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-purple-400">NO MAGIC, ONLY SIGNS</span>
                 </h3>
                 <div className="bg-gradient-to-br from-violet-950/10 to-black p-8 rounded-2xl border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]">
                    <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                      Words like "Magic" or "Miracle" are words for the ignorant who do not know Science or Signs.
                    </p>
                    <div className="space-y-5 text-gray-300 font-light leading-relaxed">
                      <p>
                        The Qur’an never frames Allah’s signs as magic or miracles for spectacle; it frames them as <strong className="text-violet-300">āyāt (signs)</strong> governed by law, permission, and wisdom.
                      </p>
                      <p>
                        Even in ʿĪsā’s acts, the refrain <span className="text-white border-b border-violet-500/30">“by My permission”</span> (3:49) nullifies spectacle and restores causality. The Qur’an teaches <strong className="text-white">how reality works</strong>, not how to be impressed.
                      </p>
                      <div className="py-6 text-center">
                        <span className="text-xl md:text-3xl font-serif text-violet-200 italic drop-shadow-md">
                          "Science reflects the signs; ignorance invents 'miracles'."
                        </span>
                      </div>
                    </div>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-3xl grayscale opacity-70">🧬</span> 
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 to-purple-500">ĀYĀT & HAYĀT</span>
                 </h3>
                 <div className="flex flex-col sm:flex-row gap-4 mb-8">
                   <div className="flex-1 bg-fuchsia-950/20 border border-fuchsia-500/20 p-4 rounded-lg text-center">
                     <div className="text-fuchsia-300 font-mono text-sm mb-1 uppercase tracking-wider">Āyāt</div>
                     <div className="text-white font-medium">Signs / Knowledge</div>
                   </div>
                   <div className="flex items-center justify-center text-gray-500 text-xl">⚡</div>
                   <div className="flex-1 bg-purple-950/20 border border-purple-500/20 p-4 rounded-lg text-center">
                     <div className="text-purple-300 font-mono text-sm mb-1 uppercase tracking-wider">Hayāt</div>
                     <div className="text-white font-medium">Life / Embodied action</div>
                   </div>
                 </div>
               </section>

               <div className="pt-16 border-t border-cyan-500/20 text-center pb-8">
                 <h3 className="text-xs font-bold text-gray-400 mb-6 tracking-[0.3em] uppercase">Final Word</h3>
                 <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                   You are not reading the Qur’an to follow a sound.<br/> You are reading it to <strong className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] text-3xl align-middle mx-1">see</strong>.
                 </p>
                 <div className="space-y-4 text-cyan-200 italic text-xl md:text-2xl font-serif">
                   <p>“So where are you going?” <span className="text-sm font-sans not-italic text-gray-400 ml-2 font-normal">(81:26)</span></p>
                   <p>“Indeed, to your Lord is the return.” <span className="text-sm font-sans not-italic text-gray-400 ml-2 font-normal">(96:8)</span></p>
                 </div>
               </div>
            </div>
           </div>

           {/* ---------------- COSMOLOGY TAB ---------------- */}
           <div style={{ display: activeTab === 'cosmology' ? 'block' : 'none' }}>
            <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light leading-relaxed max-w-5xl mx-auto">
                
                {/* 1. The Crisis */}
                <section>
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/30 to-transparent border-l-4 border-red-500/50 mb-8">
                        <h3 className="text-xl font-bold text-red-200 mb-2 font-mono uppercase tracking-widest">1. The Crisis: Hubble Tension (4.4σ)</h3>
                        <p className="text-gray-300 mb-4">
                            The Standard Model of Cosmology (ΛCDM) is failing to reconcile the expansion rate of the universe measured from the early epoch versus the late epoch.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
                            <div className="bg-black/40 p-4 rounded border border-red-900/30">
                                <div className="text-gray-500 uppercase text-xs mb-1">Early Universe (CMB)</div>
                                <div className="text-2xl text-white font-bold">H₀ ≈ 67.4</div>
                                <div className="text-xs text-gray-400">km/s/Mpc (Planck)</div>
                            </div>
                            <div className="bg-black/40 p-4 rounded border border-red-900/30">
                                <div className="text-gray-500 uppercase text-xs mb-1">Late Universe (Local)</div>
                                <div className="text-2xl text-red-400 font-bold">H₀ ≈ 73.0</div>
                                <div className="text-xs text-gray-400">km/s/Mpc (SH0ES/JWST)</div>
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-red-300/70 italic border-t border-red-900/30 pt-2">
                            This ~9% discrepancy suggests a fundamental gap in our assumption that all probes sample the same primordial degree of freedom.
                        </div>
                    </div>
                </section>

                {/* 2. The Insight */}
                <section>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl grayscale opacity-70">📜</span> 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">THE SOURCE CODE</span>
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <p className="text-lg text-gray-300">
                                The Qur’an reveals that the universe did not emerge from a singularity of chaos, but from <strong className="text-white">two co-born channels</strong> separated by a lawful barrier.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-amber-500 font-bold">A.</span>
                                    <div>
                                        <strong className="text-gray-200 block">Dual Channels (Ayat & Hayat)</strong>
                                        <span className="text-sm text-gray-400">"And We have made from water every living thing." (21:30) — Light (Coherence) and Sound (Resonance).</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-amber-500 font-bold">B.</span>
                                    <div>
                                        <strong className="text-gray-200 block">The Barzakh (Barrier)</strong>
                                        <span className="text-sm text-gray-400">"Between the two He released a forbidding barrier." (55:20) — A causal partition preventing mixing.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-amber-500 font-bold">C.</span>
                                    <div>
                                        <strong className="text-gray-200 block">10-9 Symmetry (Structure)</strong>
                                        <span className="text-sm text-gray-400">"Over it are nineteen." (74:30) — 10 (Structure) + 9 (Resonance) = The Code of Balance.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-amber-950/10 border border-amber-500/20 p-6 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-2 opacity-20 text-amber-500 font-serif">19</div>
                                <div className="text-sm text-amber-200/80 font-mono uppercase tracking-widest mb-4">Cosmic Signature</div>
                                <div className="flex gap-4 justify-center text-xs text-gray-400">
                                    <div className="px-3 py-1 bg-black/40 rounded border border-amber-500/10">10 (Ayat)</div>
                                    <div className="px-3 py-1 bg-black/40 rounded border border-amber-500/10">9 (Hayat)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. The Model */}
                <section className="border-t border-gray-800 pt-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl grayscale opacity-70">📐</span> 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-400">THE MODEL: DUAL-FIELD CHRYSALIS</span>
                    </h3>
                    <div className="space-y-6">
                        <p className="text-gray-300">
                            We propose a conservative extension of General Relativity with <strong className="text-white">two coupled scalar fields</strong>. The "Hubble Tension" is not a failure of gravity, but an artifact of <strong className="text-white">Asymmetric Sampling</strong> during a "Chrysalis" phase.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-950/10 border border-blue-500/20 p-5 rounded-lg">
                                <div className="text-blue-400 font-mono text-sm mb-2 font-bold">Field 1: φ (Light/Ayat)</div>
                                <p className="text-sm text-gray-400">
                                    The Starobinsky-like inflaton. Sources smooth, coherent expansion. Dominant in the early universe.
                                    <br/><span className="text-xs text-blue-300/50 mt-1 block">Measured by: CMB (Planck) → H₀ ≈ 67</span>
                                </p>
                            </div>
                            <div className="bg-indigo-950/10 border border-indigo-500/20 p-5 rounded-lg">
                                <div className="text-indigo-400 font-mono text-sm mb-2 font-bold">Field 2: χ (Sound/Hayat)</div>
                                <p className="text-sm text-gray-400">
                                    Ultra-light scalar. Driven by φ via weak derivative coupling. "Hatched" at late times.
                                    <br/><span className="text-xs text-indigo-300/50 mt-1 block">Measured by: Supernovae/BAO → H₀ ≈ 73</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-black/60 p-6 rounded-xl border border-gray-800 font-mono text-sm overflow-x-auto">
                            <div className="mb-2 text-gray-500 text-xs uppercase tracking-wider">The Friedmann Equation (Unchanged)</div>
                            <div className="text-white text-lg">H² = (8πG/3) * (ρ_φ + ρ_χ + ρ_m + ρ_r)</div>
                            <div className="mt-4 mb-2 text-gray-500 text-xs uppercase tracking-wider">The Chrysalis Parameter</div>
                            <div className="text-amber-300 text-lg">C(a) = ρ_χ / ρ_φ</div>
                            <p className="mt-2 text-gray-400 text-xs font-sans">
                                Current Epoch: C₀ ≈ 0.1 (The Chrysalis Phase). We live in the metastable overlap.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Predictions */}
                <section>
                    <h3 className="text-xl font-bold text-gray-200 mb-6 font-mono uppercase tracking-widest border-l-4 border-emerald-500/50 pl-4">
                        Falsifiable Predictions (Testable by 2030)
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="py-3 px-4">Phenomenon</th>
                                    <th className="py-3 px-4">Signature</th>
                                    <th className="py-3 px-4">Testable By</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-300 divide-y divide-gray-800/50">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 font-medium text-emerald-300">1. BAO Phase Shift</td>
                                    <td className="py-3 px-4 font-mono">Δθ ≈ 0.03π rad</td>
                                    <td className="py-3 px-4 text-gray-400">DESI, Euclid, SKA</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 font-medium text-emerald-300">2. Orthogonal Non-Gaussianity</td>
                                    <td className="py-3 px-4 font-mono">f_NL ~ O(10)</td>
                                    <td className="py-3 px-4 text-gray-400">Planck Re-analysis</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 font-medium text-emerald-300">3. Scale-Dependent H₀</td>
                                    <td className="py-3 px-4 font-mono">dH₀/dln k &lt; 0</td>
                                    <td className="py-3 px-4 text-gray-400">Euclid Clustering</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 font-medium text-emerald-300">4. Growth Suppression</td>
                                    <td className="py-3 px-4 font-mono">Lower S₈ (Clustering)</td>
                                    <td className="py-3 px-4 text-gray-400">Weak Lensing Surveys</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 5. Synthesis */}
                <section className="pt-8 border-t border-gray-800">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                       <span className="text-3xl grayscale opacity-70">🫀</span> 
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-600">FINAL SYNTHESIS: THE COSMIC HEART</span>
                    </h3>
                    
                    <div className="bg-gradient-to-br from-red-950/20 to-black p-8 rounded-2xl border border-red-500/20 relative overflow-hidden">
                        <div className="relative z-10 space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                The universe, like the human heart, is not born whole—but <strong className="text-white">folded through trial into coherence</strong>.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8 text-base">
                                <div>
                                    <strong className="text-red-400 block mb-2 font-mono uppercase text-xs tracking-widest">In Embryology</strong>
                                    <p className="text-gray-400">
                                        The heart begins as a linear tube. In days 22–28, it undergoes a <strong className="text-white">right-handed twist (looping)</strong>, folding onto itself to create the dual-pump structure essential for life.
                                    </p>
                                </div>
                                <div>
                                    <strong className="text-amber-400 block mb-2 font-mono uppercase text-xs tracking-widest">In Cosmology</strong>
                                    <p className="text-gray-400">
                                        The Hubble Tension is the <strong className="text-white">cosmic heartbeat</strong>—the pulse of a universe in its Chrysalis phase, beating between Light (Ayat) and Sound (Hayat).
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-red-500/10 text-center">
                                <p className="italic text-gray-400 mb-2">
                                    "We will show them Our Signs in the horizons and within themselves until it becomes clear to them that it is the Truth."
                                </p>
                                <span className="text-xs font-mono text-red-500 uppercase tracking-widest">Surah Fussilat 41:53</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-8 text-xs text-gray-600 font-mono">
                    Research Proposal 2025 • Dual-Field Chrysalis Cosmology
                </div>

            </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;
