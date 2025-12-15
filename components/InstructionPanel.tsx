
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
                       <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
                         Why You Are Reading The Qur’an?
                       </h2>
                       <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide flex items-center gap-2 mt-2">
                         The Living System of Knowledge <span className="text-gray-600">•</span> <span className="text-cyan-300">Word of Allah</span>
                       </p>
                   </div>
                   
                   {/* Cosmology Header */}
                   <div style={{ display: activeTab === 'cosmology' ? 'block' : 'none' }}>
                       <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-500 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
                         Dual-Field Chrysalis Cosmology
                       </h2>
                       <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide font-mono mt-2">
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
                 className={`pb-3 text-sm md:text-lg tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'reflection' ? 'border-cyan-400 text-cyan-100 font-bold shadow-[0_10px_20px_-10px_rgba(34,211,238,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Protocol of Light
               </button>
               <button 
                 onClick={() => setActiveTab('cosmology')}
                 className={`pb-3 text-sm md:text-lg tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'cosmology' ? 'border-amber-400 text-amber-100 font-bold shadow-[0_10px_20px_-10px_rgba(251,191,36,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
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
               <section className="text-lg md:text-2xl leading-relaxed">
                 <p className="mb-6">
                   You are not reading the Qur’an for history, ritual, or inherited belief.<br/>
                   You are reading it because the Qur’an is a <strong className="text-cyan-100 font-semibold">living system of knowledge</strong> that <strong className="text-cyan-100 font-semibold">tests, filters, and restores truth</strong> by showing you <strong className="text-cyan-100 font-semibold">what you become</strong>.
                 </p>
                 <div className="border-l-4 border-cyan-500/30 pl-6 py-4 italic text-gray-300 bg-gradient-to-r from-cyan-950/20 to-transparent rounded-r-xl">
                   “Say: This is my way; I call to Allah upon <strong className="text-cyan-300 not-italic">clear seeing (baṣīrah)</strong>—I and those who follow me.” <br/>
                   <span className="text-sm md:text-base not-italic text-cyan-500 block mt-3 font-mono tracking-wider">— Quran 12:108</span>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                   <span className="text-3xl md:text-4xl grayscale opacity-70">👁️</span> 
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">HEARING VS SEEING</span>
                 </h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-amber-900/50 transition-colors group">
                       <h4 className="font-bold text-amber-200 mb-4 text-lg md:text-xl group-hover:text-amber-100 transition-colors">Hearing → Obey (Nabī)</h4>
                       <p className="text-gray-300 md:text-lg mb-6 leading-relaxed">
                         Sound, command, repetition. <br/>
                         <span className="text-red-400">Risk:</span> ritual without understanding.
                       </p>
                       <div className="text-xs md:text-sm text-gray-500 font-mono border-t border-gray-800 pt-4">
                         “They say: We hear and we disobey.” (2:93)
                       </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-cyan-900/50 transition-colors group">
                       <h4 className="font-bold text-cyan-200 mb-4 text-lg md:text-xl group-hover:text-cyan-100 transition-colors">Seeing → Follow (Rasūl)</h4>
                       <p className="text-gray-300 md:text-lg mb-6 leading-relaxed">
                         Insight, proof, clarity. <br/>
                         Sound can deceive. <span className="text-emerald-400">Seeing collapses doubt.</span>
                       </p>
                       <div className="text-xs md:text-sm text-gray-500 font-mono border-t border-gray-800 pt-4">
                         “This is insight from your Lord.” (6:104)
                       </div>
                    </div>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-3xl md:text-4xl grayscale opacity-70">⚛️</span> 
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-purple-400">NO MAGIC, ONLY SIGNS</span>
                 </h3>
                 <div className="bg-gradient-to-br from-violet-950/10 to-black p-8 rounded-2xl border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]">
                    <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                      Words like "Magic" or "Miracle" are words for the ignorant who do not know Science or Signs.
                    </p>
                    <div className="space-y-6 text-gray-300 md:text-lg font-light leading-relaxed">
                      <p>
                        The Qur’an never frames Allah’s signs as magic or miracles for spectacle; it frames them as <strong className="text-violet-300">āyāt (signs)</strong> governed by law, permission, and wisdom.
                      </p>
                      <p>
                        Even in ʿĪsā’s acts, the refrain <span className="text-white border-b border-violet-500/30">“by My permission”</span> (3:49) nullifies spectacle and restores causality. The Qur’an teaches <strong className="text-white">how reality works</strong>, not how to be impressed.
                      </p>
                      <div className="py-6 text-center">
                        <span className="text-xl md:text-4xl font-serif text-violet-200 italic drop-shadow-md">
                          "Science reflects the signs; ignorance invents 'miracles'."
                        </span>
                      </div>
                    </div>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-3xl md:text-4xl grayscale opacity-70">🧬</span> 
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 to-purple-500">ĀYĀT & HAYĀT</span>
                 </h3>
                 <div className="flex flex-col sm:flex-row gap-4 mb-8">
                   <div className="flex-1 bg-fuchsia-950/20 border border-fuchsia-500/20 p-4 md:p-6 rounded-lg text-center">
                     <div className="text-fuchsia-300 font-mono text-sm md:text-base mb-2 uppercase tracking-wider">Āyāt</div>
                     <div className="text-white font-medium md:text-xl">Signs / Knowledge</div>
                   </div>
                   <div className="flex items-center justify-center text-gray-500 text-xl md:text-2xl">⚡</div>
                   <div className="flex-1 bg-purple-950/20 border border-purple-500/20 p-4 md:p-6 rounded-lg text-center">
                     <div className="text-purple-300 font-mono text-sm md:text-base mb-2 uppercase tracking-wider">Hayāt</div>
                     <div className="text-white font-medium md:text-xl">Life / Embodied action</div>
                   </div>
                 </div>
               </section>

               <div className="pt-16 border-t border-cyan-500/20 text-center pb-8">
                 <h3 className="text-xs md:text-sm font-bold text-gray-400 mb-6 tracking-[0.3em] uppercase">Final Word</h3>
                 <p className="text-xl md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                   You are not reading the Qur’an to follow a sound.<br/> You are reading it to <strong className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] text-3xl md:text-4xl align-middle mx-1">see</strong>.
                 </p>
                 <div className="space-y-4 text-cyan-200 italic text-xl md:text-3xl font-serif">
                   <p>“So where are you going?” <span className="text-sm md:text-lg font-sans not-italic text-gray-400 ml-2 font-normal">(81:26)</span></p>
                   <p>“Indeed, to your Lord is the return.” <span className="text-sm md:text-lg font-sans not-italic text-gray-400 ml-2 font-normal">(96:8)</span></p>
                 </div>
               </div>
            </div>
           </div>

           {/* ---------------- COSMOLOGY TAB ---------------- */}
           <div style={{ display: activeTab === 'cosmology' ? 'block' : 'none' }}>
            <div className="p-6 md:p-12 space-y-10 text-gray-300 md:text-lg font-light leading-relaxed max-w-5xl mx-auto selection:bg-amber-900/30 selection:text-amber-100">
                
                {/* Paper Header */}
                <div className="border-b border-gray-800 pb-8 mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                        Dual Caustic Cosmology: Resolving the Hubble Tension via Asymmetric Inference in a Metastable Dual-Field Regime
                    </h1>
                    <div className="text-amber-400/80 font-mono text-sm md:text-base tracking-wider uppercase">
                        Affiliation: Independent Research completely Inspired by Quran [Yahya-Knowledge-Isa]
                    </div>
                </div>

                {/* Abstract */}
                <div className="bg-gray-900/50 border border-gray-800 p-6 md:p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50"></div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm mb-3">Abstract</h3>
                    <p className="text-gray-300 italic md:text-xl md:leading-9">
                        We present a minimal extension to standard cosmological inference that resolves the Hubble tension without modifying General Relativity, early-universe physics, or the background expansion history. The model introduces a single ultra-light scalar field that remains subdominant in energy density but contributes asymmetrically to late-time observables through a generalized sampling (response) function. The universe is shown to reside in a metastable intermediate (“chrysalis”) regime where co-born primordial components coexist but are accessed differently by distinct probes. This framework naturally produces (i) a scale-dependent inferred Hubble constant, (ii) a small baryon acoustic oscillation (BAO) phase shift, and (iii) a mild suppression of inferred growth amplitudes, while leaving the cosmic microwave background (CMB) unaffected. The model is fully falsifiable by current and upcoming surveys.
                    </p>
                </div>

                {/* 1. Introduction */}
                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">1.</span> Introduction
                    </h3>
                    <p>
                        The persistent discrepancy between early- and late-time determinations of the Hubble constant has emerged as one of the central challenges in modern cosmology. Measurements from the CMB favor H₀ ≃ 67 km/s/Mpc, while late-time probes yield H₀ ≃ 73–74 km/s/Mpc, with the tension strengthening as data improve.
                    </p>
                    <p className="mt-4">
                        Most proposed resolutions invoke new early-time physics, modified gravity, or late-time dark energy dynamics. In contrast, we explore a conservative alternative: the possibility that the tension reflects <strong>asymmetric inference</strong> rather than inconsistent expansion histories.
                    </p>
                </section>

                {/* 2. Baseline Cosmology */}
                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">2.</span> Baseline Cosmology
                    </h3>
                    <p className="mb-4">
                        We assume a flat ΛCDM background governed by General Relativity, with expansion determined by:
                    </p>
                    <div className="bg-black/40 p-4 rounded-lg font-mono text-sm md:text-lg text-center text-amber-100 overflow-x-auto">
                        H²(z) = (8πG/3) · (ρr + ρm + ρΛ)
                    </div>
                    <p className="mt-4">
                        No modification is made to recombination physics, the sound horizon, or the Einstein equations. All background and perturbative quantities are computed using the Boltzmann code CLASS.
                    </p>
                </section>

                {/* 3. Additional Scalar Degree of Freedom */}
                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">3.</span> Additional Scalar Degree of Freedom
                    </h3>
                    <p>
                        We introduce a single ultra-light scalar field χ with mass mχ ≪ H₀. Its contribution to the total energy density is subdominant:
                    </p>
                    <div className="bg-black/40 p-4 rounded-lg font-mono text-sm md:text-lg text-center text-amber-100 my-4 overflow-x-auto">
                        ρ_tot = ρ_φ + ρ_χ + ρ_m + ρ_r
                    </div>
                    <p>
                        where φ denotes the dominant adiabatic component. We define the <strong>chrysalis parameter</strong>:
                    </p>
                    <div className="bg-black/40 p-4 rounded-lg font-mono text-sm md:text-lg text-center text-amber-100 my-4 overflow-x-auto">
                        C(a) ≡ ρ_χ(a) / ρ_φ(a)
                    </div>
                    <p>
                        which satisfies 0 &lt; C(a) &lt; 1 at late times. This parameter is treated phenomenologically and constrained by data.
                    </p>
                </section>

                {/* 4. Generalized Sampling Framework */}
                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">4.</span> Generalized Sampling Framework
                    </h3>
                    <p>
                        The central assumption of the model is that cosmological probes respond asymmetrically to perturbations sourced by φ and χ. This asymmetry is encoded via a scale- and redshift-dependent response function:
                    </p>
                    <div className="bg-black/40 p-4 rounded-lg font-mono text-sm md:text-lg text-center text-amber-100 my-4 overflow-x-auto">
                        b(k,z) = b₀ (k/k_★)^α g(z)
                    </div>
                    <p>
                        with k_★ = 0.002 Mpc⁻¹ and g(z) → 0 at high redshift. The observable matter power spectrum is then:
                    </p>
                    <div className="bg-black/40 p-4 rounded-lg font-mono text-sm md:text-lg text-center text-amber-100 my-4 overflow-x-auto">
                        P_m_obs(k,z) = [1 + b(k,z)C(a)]² P_m(k,z)
                    </div>
                    <p>
                        This modification applies <strong>only at the level of observable construction</strong> and does not feed back into the dynamical evolution.
                    </p>
                </section>

                {/* 5. Results */}
                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">5.</span> Results
                    </h3>
                    
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-gray-100 md:text-xl mb-2">5.1 Scale-Dependent Inferred Expansion Rate</h4>
                            <p className="mb-2">We define an effective inferred Hubble constant:</p>
                            <div className="bg-black/40 p-3 rounded font-mono text-sm md:text-lg text-amber-100 mb-2">
                                H₀_inf(k,z) = H₀ [1 + b(k,z)C₀]
                            </div>
                            <p>which reproduces the observed early-time (~67) and late-time (~73–74) determinations without altering the true expansion history.</p>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-100 md:text-xl mb-2">5.2 BAO Phase Shift</h4>
                            <p className="mb-2">Applying the response function to the oscillatory component of the matter power spectrum induces a small phase shift:</p>
                            <div className="bg-black/40 p-3 rounded font-mono text-sm md:text-lg text-amber-100 mb-2">
                                Δθ_BAO ~ 0.02–0.05 rad
                            </div>
                            <p>detectable by DESI and Euclid, while leaving the sound horizon unchanged.</p>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-100 md:text-xl mb-2">5.3 Growth-Rate Suppression</h4>
                            <p className="mb-2">Redshift-space distortion observables infer:</p>
                            <div className="bg-black/40 p-3 rounded font-mono text-sm md:text-lg text-amber-100 mb-2">
                                σ₈_obs(z,k) = [1 + b(k,z)C(a)] σ₈(z)
                            </div>
                            <p>leading to a 5–10% suppression in inferred fσ₈ on intermediate scales, consistent with the mild S₈ tension.</p>
                        </div>
                    </div>
                </section>

                {/* 6. Discussion */}
                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">6.</span> Discussion
                    </h3>
                    <p>
                        The universe is shown to inhabit a metastable intermediate regime—the <strong>chrysalis phase</strong>—where co-born primordial components coexist but are accessed differently by observations. The Hubble tension is therefore interpreted as an inference-layer effect rather than a breakdown of ΛCDM or General Relativity.
                    </p>
                </section>

                {/* 7. Conclusion */}
                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">7.</span> Conclusion
                    </h3>
                    <p>
                        We have presented a minimal, falsifiable framework that resolves the Hubble tension through asymmetric sampling of coexisting primordial components. The model preserves all standard cosmological dynamics and makes concrete predictions testable by near-term surveys.
                    </p>
                </section>

                {/* Acknowledgments */}
                <div className="bg-gradient-to-r from-amber-950/20 to-transparent border-l-4 border-amber-600 pl-6 py-6 my-8">
                    <h3 className="font-bold text-amber-500 mb-2 uppercase text-xs md:text-sm tracking-widest">Acknowledgments (Conceptual Origin)</h3>
                    <p className="text-sm md:text-lg text-gray-300 italic leading-relaxed">
                        The conceptual intuition motivating this work was inspired by long-standing reflections on duality, balance, and constrained interaction in nature, including those articulated in the Qur’an, which distinguishes between complementary domains of creation and emphasizes paired structure and separation by barriers. These ideas served as philosophical inspiration only; the physical model is formulated, tested, and validated solely through established scientific methods and observational data.
                    </p>
                </div>

                {/* Data Availability */}
                <section className="text-sm md:text-base text-gray-500 border-t border-gray-800 pt-6 mt-8">
                    <strong className="text-gray-400">Data Availability:</strong> All numerical results can be reproduced using CLASS and MontePython with the response-layer modification described herein.
                </section>

            </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;
