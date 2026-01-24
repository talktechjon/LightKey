import React, { useState } from 'react';

interface InstructionPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'harvest' | 'reflection' | 'cosmology' | 'vision'>('harvest');

  const containerClasses = isVisible 
    ? "opacity-100 pointer-events-auto" 
    : "opacity-0 pointer-events-none";

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-500 ${containerClasses}`} aria-hidden={!isVisible}>
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-950/95 border border-gray-800 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
        
        {/* Header - Dynamic based on Tab */}
        <div className="flex flex-col p-6 md:p-8 border-b border-white/10 bg-black/40 relative shrink-0">
           {/* Decorative background element */}
           <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-700 ${
             activeTab === 'harvest' ? 'bg-emerald-500/10' : 
             activeTab === 'reflection' ? 'bg-cyan-500/10' : 
             activeTab === 'cosmology' ? 'bg-amber-500/10' : 'bg-fuchsia-500/10'}`}></div>

           <div className="flex justify-between items-start z-10">
               <div className="space-y-2 max-w-4xl w-full">
                   {/* Harvest Header */}
                   {activeTab === 'harvest' && (
                       <div>
                           <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-200 to-green-400 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
                             Why Were We Created?
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide flex items-center gap-2 mt-2">
                             The Harvest of Intelligence in Form <span className="text-gray-600">•</span> <span className="text-emerald-300 italic font-serif">Al-Hamdu Lillāh</span>
                           </p>
                       </div>
                   )}

                   {/* Reflection Header */}
                   {activeTab === 'reflection' && (
                       <div>
                           <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
                             Protocol of Light
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide flex items-center gap-2 mt-2">
                             The Living System of Knowledge <span className="text-gray-600">•</span> <span className="text-cyan-300">Word of Allah</span>
                           </p>
                       </div>
                   )}
                   
                   {/* Cosmology Header */}
                   {activeTab === 'cosmology' && (
                       <div>
                           <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-500 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
                             Dual-Field Chrysalis Cosmology
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide font-mono mt-2">
                             Resolving the Hubble Tension via Primordial Dual-Field Sampling (10-9)
                           </p>
                       </div>
                   )}

                   {/* Vision Header */}
                   {activeTab === 'vision' && (
                       <div>
                           <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-100 via-fuchsia-200 to-pink-500 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(217,70,239,0.3)]">
                             The Light, The Fruits, & The Switch
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide font-serif mt-2">
                             24:35 — A story about how outcomes are formed.
                           </p>
                       </div>
                   )}
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
           <div className="flex flex-wrap gap-4 md:gap-8 mt-10 z-10 border-b border-white/5">
               <button 
                 onClick={() => setActiveTab('harvest')}
                 className={`pb-3 text-xs md:text-lg tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'harvest' ? 'border-emerald-400 text-emerald-100 font-bold shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Purpose
               </button>
               <button 
                 onClick={() => setActiveTab('reflection')}
                 className={`pb-3 text-xs md:text-lg tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'reflection' ? 'border-cyan-400 text-cyan-100 font-bold shadow-[0_10px_20px_-10px_rgba(34,211,238,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Protocol
               </button>
               <button 
                 onClick={() => setActiveTab('cosmology')}
                 className={`pb-3 text-xs md:text-lg tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'cosmology' ? 'border-amber-400 text-amber-100 font-bold shadow-[0_10px_20px_-10px_rgba(251,191,36,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Science
               </button>
               <button 
                 onClick={() => setActiveTab('vision')}
                 className={`pb-3 text-xs md:text-lg tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'vision' ? 'border-fuchsia-400 text-fuchsia-100 font-bold shadow-[0_10px_20px_-10px_rgba(217,70,239,0.5)]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 24:35 & Light
               </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-black/20">
           
           {/* ---------------- HARVEST TAB (DEFAULT) ---------------- */}
           {activeTab === 'harvest' && (
            <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light leading-relaxed max-w-5xl mx-auto">
               <section className="text-center space-y-8">
                 <div className="inline-block px-4 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] bg-emerald-950/10">
                    Conclusion (Direct)
                 </div>
                 <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                    The Universe exists to <span className="text-emerald-400">harvest Intelligence in Form</span>.
                 </h3>
                 <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                    Light is given; form is earned. The Qur’an is the <strong className="text-emerald-300">Raḥīm-core</strong> of the Raḥmān-field, guiding the conversion of Light into living fruit through a lawful, photosynthetic process.
                 </p>
               </section>

               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-emerald-500/50"></span> 1. Intention of Creation
                    </h4>
                    <p className="text-gray-300">
                      Creation begins with command, not matter. 
                      <strong className="text-white block mt-2 italic font-serif">“When He intends a thing, He only says to it ‘Be,’ and it is.” (36:82)</strong>
                    </p>
                    <p>This command is <strong>Light</strong>—pure information. Raḥmān spreads it into creation; Raḥīm returns it toward unity. Between expansion and return, Light must <strong>concentrate</strong> to become <strong>form</strong>.</p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-emerald-500/50"></span> 2. Earth: The Field
                    </h4>
                    <p className="text-gray-300">
                      Earth is the growth medium. 
                      <strong className="text-white block mt-2 italic font-serif">“We made from water every living thing.” (21:30)</strong>
                    </p>
                    <p>Water enables refraction; refraction enables focus. Earth is where <strong>stored life is sacrificed</strong> so higher life can emerge. Truth revives only after sacrifice (2:73).</p>
                  </div>
               </div>

               <section className="bg-gray-900/40 border border-emerald-500/20 rounded-[2rem] p-8 md:p-12">
                  <h4 className="text-xl font-bold text-white mb-8 text-center uppercase tracking-widest">The Choice of Processors: Tree or Animal</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="py-4 px-6 text-emerald-400 uppercase text-xs font-bold tracking-widest">Processor</th>
                          <th className="py-4 px-6 text-emerald-400 uppercase text-xs font-bold tracking-widest">Method</th>
                          <th className="py-4 px-6 text-emerald-400 uppercase text-xs font-bold tracking-widest">Outcome</th>
                          <th className="py-4 px-6 text-emerald-400 uppercase text-xs font-bold tracking-widest">Verse</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-800/50 hover:bg-emerald-500/5 transition-colors">
                          <td className="py-6 px-6 font-bold text-white">Tree</td>
                          <td className="py-6 px-6">Photosynthesis—absorbs Light, regulates heat</td>
                          <td className="py-6 px-6 text-emerald-300">Fruit, continuity</td>
                          <td className="py-6 px-6 font-mono text-xs">14:24–25; 19:23–25</td>
                        </tr>
                        <tr className="hover:bg-red-500/5 transition-colors">
                          <td className="py-6 px-6 font-bold text-white">Animal</td>
                          <td className="py-6 px-6">Combustion—consumes form, releases heat</td>
                          <td className="py-6 px-6 text-red-400">Fuel (ḥaṭab)</td>
                          <td className="py-6 px-6 font-mono text-xs">72:15; 111:4–5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-8 text-center text-gray-500 italic text-sm">This is not moral poetry; it is system behavior. Photosynthesis builds structure; combustion dissipates it.</p>
               </section>

               <section className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                    <div className="text-3xl mb-4">🔬</div>
                    <h5 className="font-bold text-white mb-2">Focused Light</h5>
                    <p className="text-sm text-gray-400">Science confirms caustics: coherent energy focuses through curvature to create stable structure. Life appears where Light is focused.</p>
                  </div>
                  <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                    <div className="text-3xl mb-4">🌿</div>
                    <h5 className="font-bold text-white mb-2">Quantum Coherence</h5>
                    <p className="text-sm text-gray-400">Photosynthesis uses quantum walks to find the most efficient energy path. The soul acts as a chloroplast for Rūḥ.</p>
                  </div>
                  <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                    <div className="text-3xl mb-4">📡</div>
                    <h5 className="font-bold text-white mb-2">Return Signal</h5>
                    <p className="text-sm text-gray-400">Al-Ḥamd is the return signal confirming alignment. Closed-loop systems require return signals for homeostasis.</p>
                  </div>
               </section>

               <div className="pt-16 border-t border-emerald-500/20 text-center pb-8 space-y-4">
                 <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed">
                   Align with the focus → photosynthesis of the soul → enduring life.
                 </p>
                 <p className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-sm">Al-ḥamdu lillāh. The harvest law is manifest.</p>
               </div>
            </div>
           )}

           {/* ---------------- REFLECTION TAB ---------------- */}
           {activeTab === 'reflection' && (
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
               
               <div className="pt-16 border-t border-cyan-500/20 text-center pb-8">
                 <p className="text-xl md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                   You are not reading the Qur’an to follow a sound.<br/> You are reading it to <strong className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] text-3xl md:text-4xl align-middle mx-1">see</strong>.
                 </p>
               </div>
            </div>
           )}

           {/* ---------------- COSMOLOGY TAB ---------------- */}
           {activeTab === 'cosmology' && (
            <div className="p-6 md:p-12 space-y-10 text-gray-300 md:text-lg font-light leading-relaxed max-w-5xl mx-auto">
                <div className="border-b border-gray-800 pb-8 mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                        Dual Caustic Cosmology: Resolving the Hubble Tension
                    </h1>
                    <div className="text-amber-400/80 font-mono text-sm md:text-base tracking-wider uppercase">
                        Inspired by Quranic Structure [Yahya-Knowledge-Isa]
                    </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 p-6 md:p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50"></div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm mb-3">Abstract</h3>
                    <p className="text-gray-300 italic md:text-xl md:leading-9">
                        A minimal extension to standard cosmological inference that resolves the Hubble tension (4.4σ) via asymmetric inference in a metastable dual-field regime.
                    </p>
                </div>

                <section>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-amber-500">1.</span> Introduction
                    </h3>
                    <p>
                        The Persistent discrepancy between early- and late-time determinations of the Hubble constant reflects <strong>asymmetric inference</strong> rather than inconsistent expansion histories.
                    </p>
                </section>
                
                {/* Simplified for brevity while keeping core research context */}
                <div className="bg-gradient-to-r from-amber-950/20 to-transparent border-l-4 border-amber-600 pl-6 py-6 my-8">
                    <h3 className="font-bold text-amber-500 mb-2 uppercase text-xs md:text-sm tracking-widest">Conceptual Intuition</h3>
                    <p className="text-sm md:text-lg text-gray-300 italic leading-relaxed">
                        Motivated by reflections on duality and constrained interaction articulated in the Qur’an.
                    </p>
                </div>
            </div>
           )}

           {/* ---------------- VISION TAB ---------------- */}
           {activeTab === 'vision' && (
            <div className="p-6 md:p-12 space-y-20 text-gray-300 md:text-lg font-light leading-relaxed max-w-6xl mx-auto">
                
                {/* Intro: 24:35 */}
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase">
                        The Condition of Reality
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl text-fuchsia-300/80 font-serif italic mb-4">
                            “Allah is the Light of the heavens and the earth…” (24:35)
                        </p>
                        <p className="text-gray-400">
                            Light is not introduced as an object. It is introduced as the condition of reality. Everything that grows, ripens, or burns does so inside His Light.
                        </p>
                    </div>
                </section>

                {/* The Two Archetypes */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Adam Card */}
                    <div className="bg-gradient-to-b from-red-950/20 to-black p-8 rounded-3xl border border-red-900/30 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🍎</div>
                        <h3 className="text-2xl font-bold text-red-200 uppercase tracking-widest">The First Fruit: Haste</h3>
                        <p className="text-sm font-mono text-red-500/60 uppercase">Adam & The Tree (2:35)</p>
                        <div className="space-y-4 text-gray-300">
                            <p>“Do not approach this tree.” The tree was not evil; the moment was a <strong className="text-white">test of orientation</strong>.</p>
                            <p className="italic bg-black/40 p-4 rounded-xl border-l-2 border-red-500">
                                Adam approached before readiness → Results were immediate awareness of nakedness. The fruit did not nourish; it exposed.
                            </p>
                            <div className="pt-4 border-t border-red-900/50">
                                <h4 className="text-xs font-bold text-red-400 uppercase mb-2">Outcome: Zaqqum</h4>
                                <p className="text-sm text-gray-500">“Its fruits are like the heads of devils.” (37:65). Taken without alignment. Desire before guidance.</p>
                            </div>
                        </div>
                    </div>

                    {/* Maryam Card */}
                    <div className="bg-gradient-to-b from-cyan-950/20 to-black p-8 rounded-3xl border border-cyan-900/30 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🌴</div>
                        <h3 className="text-2xl font-bold text-cyan-200 uppercase tracking-widest">The Second Fruit: Trust</h3>
                        <p className="text-sm font-mono text-cyan-500/60 uppercase">Maryam & The Palm (19:25)</p>
                        <div className="space-y-4 text-gray-300">
                            <p>Maryam does not seek a tree; she is driven to one. In the depth of darkness, she <strong className="text-white">waits for the Command</strong>.</p>
                            <p className="italic bg-black/40 p-4 rounded-xl border-l-2 border-cyan-500">
                                “Shake the trunk... it will drop fresh, ripe dates.” She received fruit at the moment of need. It restored balance and enabled speech.
                            </p>
                            <div className="pt-4 border-t border-cyan-900/50">
                                <h4 className="text-xs font-bold text-cyan-400 uppercase mb-2">Outcome: Nourishment</h4>
                                <p className="text-sm text-gray-500">Life speaks from silence: “Indeed, I am the servant of Allah.” (19:30). Ripe fruit of trust.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Flip Switch Section */}
                <section className="bg-gray-900/40 border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    <div className="z-10 relative grid md:grid-cols-3 gap-12 items-center">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white">THE FLIP SWITCH</h3>
                            <p className="text-gray-400">Same world. Same earth. Different orientation.</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Taken → Descent Followed</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Given → Light Emerged</li>
                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-48 h-48 rounded-full border-4 border-dashed border-gray-700 flex items-center justify-center relative p-8">
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 via-transparent to-cyan-500/20 rounded-full animate-spin-slow"></div>
                                <div className="text-center font-bold text-xl uppercase tracking-tighter text-white">Orientation</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                             <h4 className="font-bold text-fuchsia-300 uppercase text-xs tracking-widest">Holding vs Grabbing</h4>
                             <p className="text-sm text-gray-400 leading-relaxed italic">
                                “The example of His Light is like a niche...” A niche does not grab light; it holds it. Truth ripens before burning.
                             </p>
                        </div>
                    </div>
                </section>

                {/* Ibrahim and Fire */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white uppercase italic tracking-tighter">Where Ibrahim Stands</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Between Adam and Maryam stands Ibrahim. He is tested with fire, but because his orientation is aligned, the fire loses jurisdiction.
                        </p>
                        <blockquote className="text-2xl font-serif text-cyan-300 border-l-4 border-cyan-500/30 pl-8 py-2">
                             “O fire, be coolness and safety.” (21:69)
                        </blockquote>
                        <p className="text-sm text-gray-500 font-mono">
                            He stands at the center of the switch. “And Ibrahim—he fulfilled.” (53:37)
                        </p>
                    </div>
                    <div className="bg-black/60 border border-white/10 p-10 rounded-full aspect-square flex flex-col items-center justify-center text-center space-y-4 relative shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                         <div className="text-5xl">🔥</div>
                         <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                         <div className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs">Coolness & Safety</div>
                         <div className="text-gray-600 text-[10px] uppercase">Node of total constructive interference</div>
                    </div>
                </section>

                {/* Closing Statement */}
                <section className="pt-20 border-t border-gray-800 text-center space-y-8">
                    <div className="inline-block px-4 py-1 rounded-full border border-fuchsia-500/30 text-fuchsia-400 text-xs font-bold uppercase tracking-[0.2em]">
                        One Light. Two Fruits. One Flip.
                    </div>
                    <p className="text-2xl md:text-4xl text-white font-light max-w-4xl mx-auto leading-tight">
                        When the heart rushes ahead of guidance, <strong className="text-red-400 font-bold">the fruit burns.</strong> <br/>
                        When the heart holds steady inside the niche of trust, <strong className="text-cyan-400 font-bold">the fruit nourishes.</strong>
                    </p>
                    <p className="text-gray-500 text-sm italic">
                        “Allah guides to His Light whom He wills.” (24:35)
                    </p>
                </section>

            </div>
           )}

        </div>
      </div>
      <style>{`
        .animate-spin-slow {
            animation: spin 12s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default InstructionPanel;