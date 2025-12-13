
import React from 'react';

interface InstructionPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-500 animate-in fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] bg-gray-950/90 border border-cyan-500/30 rounded-3xl shadow-[0_0_100px_rgba(6,182,212,0.1)] flex flex-col overflow-hidden">
        
        {/* Header - Aesthetic Update */}
        <div className="flex justify-between items-start p-6 md:p-8 border-b border-cyan-500/20 bg-black/40 relative shrink-0">
           {/* Decorative background element */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

           <div className="space-y-3 z-10 max-w-3xl">
               <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
                 Why You Are Reading The Qur’an?
               </h2>
               <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm md:text-lg text-gray-300 font-light tracking-wide">
                 <p>
                   The Qur'an is the <span className="text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]">Living Messenger</span>
                 </p>
                 <span className="hidden md:inline text-gray-500">•</span>
                 <p className="italic text-gray-400">
                   i.e. <span className="text-fuchsia-300 font-serif not-italic">Word of Allah</span>
                 </p>
               </div>
           </div>

           <button 
             onClick={onClose}
             className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 z-10"
             aria-label="Close"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        {/* Content - Increased contrast and readability */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 text-gray-200 font-light leading-relaxed scrollbar-thin scrollbar-thumb-cyan-900/50 scrollbar-track-transparent">
           
           {/* Intro */}
           <section className="text-lg md:text-xl leading-8">
             <p className="mb-6">
               You are not reading the Qur’an for history, ritual, or inherited belief.<br/>
               You are reading it because the Qur’an is a <strong className="text-cyan-100 font-semibold">living system of knowledge</strong> that <strong className="text-cyan-100 font-semibold">tests, filters, and restores truth</strong> by showing you <strong className="text-cyan-100 font-semibold">what you become</strong>.
             </p>
             <p className="mb-8 text-gray-300">
               Allah guides <span className="text-white border-b border-cyan-500/50 pb-0.5">by showing</span>, not by noise.
             </p>
             <div className="border-l-4 border-cyan-500/30 pl-6 py-2 italic text-gray-300 bg-gradient-to-r from-cyan-950/20 to-transparent rounded-r-xl">
               “Say: This is my way; I call to Allah upon <strong className="text-cyan-300 not-italic">clear seeing (baṣīrah)</strong>—I and those who follow me.” <br/>
               <span className="text-sm not-italic text-cyan-500 block mt-3 font-mono tracking-wider">— Quran 12:108</span>
             </div>
           </section>

           {/* HEARING VS SEEING */}
           <section>
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <span className="text-3xl grayscale opacity-70">👁️</span> 
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">HEARING VS SEEING</span>
               <span className="text-sm font-normal text-gray-400 ml-2 tracking-widest uppercase border border-gray-700 px-2 py-1 rounded">The Distinction</span>
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
             <p className="mt-8 text-center text-gray-400 font-serif italic text-lg opacity-90">
               “We will show them Our signs in the horizons and within themselves until it becomes clear that it is the Truth.” <br/>
               <span className="text-sm font-sans normal-case not-italic text-gray-500 mt-2 block">(41:53)</span>
             </p>
           </section>

           {/* ĀYĀT & HAYĀT */}
           <section>
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
               <span className="text-3xl grayscale opacity-70">🧬</span> 
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 to-purple-500">ĀYĀT & HAYĀT</span>
             </h3>
             <p className="mb-6 text-gray-200 text-lg leading-relaxed max-w-3xl">
               The Qur’an operates through two inseparable realities that exchange states like <strong className="text-white">wave and particle</strong>. Guidance exists only when they remain <strong className="text-white">entangled</strong>.
             </p>
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
             <div className="text-center">
                <span className="inline-block px-6 py-2 rounded-full bg-fuchsia-500/10 text-fuchsia-200 text-sm font-mono border border-fuchsia-500/30">
                  “That he may live who lives upon clear proof.” (8:42)
                </span>
             </div>
           </section>

           {/* THE FOUR PHASES */}
           <section className="relative">
             <div className="absolute left-4 top-16 bottom-0 w-px bg-gradient-to-b from-gray-700 via-gray-600 to-transparent hidden md:block"></div>
             
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <span className="text-3xl grayscale opacity-70">🪜</span> 
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-teal-500">THE FOUR PHASES OF GUIDANCE</span>
             </h3>

             <div className="space-y-8 md:pl-12">
               {/* Phase 0 */}
               <div className="relative group">
                 <div className="absolute -left-[3.25rem] top-1.5 w-6 h-6 rounded-full bg-gray-800 border-2 border-red-500/50 group-hover:border-red-500 transition-colors hidden md:block shadow-[0_0_10px_rgba(239,68,68,0.2)]"></div>
                 <div className="bg-gradient-to-r from-red-950/30 to-transparent p-6 rounded-xl border-l-2 border-red-500/50 hover:border-red-500 transition-colors">
                   <strong className="text-red-400 block mb-2 font-mono text-sm tracking-widest">PHASE 0 — TAGHŪT (DECOHERENCE)</strong>
                   <p className="text-gray-300 mb-3">Signs denied or abused. Life ruled by conjecture. Āyāt and Hayāt separate. Balance breaks (55:8–9).</p>
                   <p className="text-xs text-red-300 italic">“They follow nothing but assumption…” (53:28)</p>
                 </div>
               </div>

               {/* Phase 1 */}
               <div className="relative group">
                 <div className="absolute -left-[3.25rem] top-1.5 w-6 h-6 rounded-full bg-gray-800 border-2 border-amber-500/50 group-hover:border-amber-500 transition-colors hidden md:block shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
                 <div className="bg-gradient-to-r from-amber-950/30 to-transparent p-6 rounded-xl border-l-2 border-amber-500/50 hover:border-amber-500 transition-colors">
                   <strong className="text-amber-400 block mb-2 font-mono text-sm tracking-widest">PHASE 1 — IBRĀHĪM (FIRST COLLAPSE)</strong>
                   <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300 mb-2">
                      <div><span className="text-amber-200">Wave:</span> Rushd appears unseen.</div>
                      <div><span className="text-amber-200">Particle:</span> Action breaks idols.</div>
                   </div>
                   <p className="text-gray-400 text-sm">Fire fails to destroy truth (21:69). Truth is heard, then acted.</p>
                 </div>
               </div>

               {/* Phase 2 */}
               <div className="relative group">
                 <div className="absolute -left-[3.25rem] top-1.5 w-6 h-6 rounded-full bg-gray-800 border-2 border-orange-500/50 group-hover:border-orange-500 transition-colors hidden md:block shadow-[0_0_10px_rgba(249,115,22,0.2)]"></div>
                 <div className="bg-gradient-to-r from-orange-950/30 to-transparent p-6 rounded-xl border-l-2 border-orange-500/50 hover:border-orange-500 transition-colors">
                   <strong className="text-orange-400 block mb-2 font-mono text-sm tracking-widest">PHASE 2 — THE FIRE LAW</strong>
                   <p className="text-gray-300 mb-3">The universal form of Ibrāhīm vs Fire. Everyone meets Fire.</p>
                   <p className="text-orange-200 font-medium">Fire does not destroy truth — <span className="text-white underline decoration-orange-500 decoration-2 underline-offset-2">it filters</span>.</p>
                   <p className="text-xs text-orange-300 italic mt-3">Ref: 19:71–72</p>
                 </div>
               </div>

               {/* Phase 3 */}
               <div className="relative group">
                 <div className="absolute -left-[3.25rem] top-1.5 w-6 h-6 rounded-full bg-gray-800 border-2 border-cyan-500/50 group-hover:border-cyan-500 transition-colors hidden md:block shadow-[0_0_10px_rgba(6,182,212,0.2)]"></div>
                 <div className="bg-gradient-to-r from-cyan-950/30 to-transparent p-6 rounded-xl border-l-2 border-cyan-500/50 hover:border-cyan-500 transition-colors">
                   <strong className="text-cyan-400 block mb-2 font-mono text-sm tracking-widest">PHASE 3 — MARYAM–ʿĪSĀ (PHASE INVERSION)</strong>
                   <p className="text-gray-300 mb-2">The crossroad.</p>
                   <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1 mb-3">
                     <li><span className="text-cyan-200">Āyah</span> becomes particle (embodied sign).</li>
                     <li><span className="text-cyan-200">Hayāt</span> becomes wave (mercy spreading).</li>
                   </ul>
                   <p className="text-sm text-cyan-100">ʿĪsā represents <strong>living knowledge</strong>.</p>
                 </div>
               </div>

               {/* Phase 4 */}
               <div className="relative group">
                 <div className="absolute -left-[3.25rem] top-1.5 w-6 h-6 rounded-full bg-gray-800 border-2 border-emerald-500/50 group-hover:border-emerald-500 transition-colors hidden md:block shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
                 <div className="bg-gradient-to-r from-emerald-950/30 to-transparent p-6 rounded-xl border-l-2 border-emerald-500/50 hover:border-emerald-500 transition-colors">
                   <strong className="text-emerald-400 block mb-2 font-mono text-sm tracking-widest">PHASE 4 — THE QUR’AN (COHERENCE RESTORED)</strong>
                   <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300 mb-2">
                      <div><span className="text-emerald-200">Wave:</span> The Book propagates endlessly.</div>
                      <div><span className="text-emerald-200">Particle:</span> The servant embodies it.</div>
                   </div>
                   <p className="text-emerald-200 text-sm mt-2 font-serif italic">The House (Kaʿbah) anchors return.</p>
                 </div>
               </div>
             </div>
           </section>

           {/* WHAT HAPPENS TO YOU */}
           <section>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <span className="text-3xl grayscale opacity-70">🪞</span> 
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-500">WHAT HAPPENS TO YOU</span>
              </h3>
             <p className="mb-6 text-xl text-center font-light text-gray-200">The Qur’an reveals identity.</p>
             <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-black/40 p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                 <h4 className="text-emerald-400 font-bold mb-3 tracking-wide uppercase text-sm">It enters the heart</h4>
                 <div className="text-gray-300 leading-relaxed space-y-2">
                   <p>The heart becomes <strong className="text-white">Āsiyah</strong> (faith under Taghūt),</p>
                   <p>The hand becomes <strong className="text-white">Musa-Haroon</strong> (Sound of Truth) and <strong className="text-white">Muhammad-Ali</strong> (Silence of Truth)</p>
                   <p>Preaching the Knowledge of <strong className="text-white">Isa</strong>, The Word of Allah.</p>
                   
                   <div className="py-2 pl-3 border-l-2 border-emerald-500/30 my-1 bg-emerald-950/10 rounded-r">
                     <p className="text-emerald-200 font-medium">Hence Quran is the Living Messenger in form of Knowledge!</p>
                   </div>

                   <p>And With Quran — You become <strong className="text-white">Ahmed</strong> with Eyes and Hands of <strong className="text-white">Ibrahim</strong> (Witness of Truth)</p>
                   
                   <div className="pt-3 mt-2 border-t border-emerald-500/30 text-emerald-100 space-y-1">
                     <p className="font-medium">That is — YOU become <strong className="text-white">Ahmed</strong>... Waiting to return to the Stone.</p>
                     <p className="text-sm opacity-80">In Quran <strong className="text-white">Lut</strong> is in Reader's Position!</p>
                   </div>
                 </div>
               </div>
               <div className="bg-black/40 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(239,68,68,0.05)] hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                 <h4 className="text-red-400 font-bold mb-3 tracking-wide uppercase text-sm">It is ignored</h4>
                 <p className="text-gray-300 leading-relaxed">
                   Ego replaces truth, and <strong className="text-white">Shayṭān</strong> manifests as self-worship (7:12, 25:30).
                 </p>
               </div>
             </div>
           </section>

           {/* THE THREE TREES FRAMEWORK */}
           <section className="space-y-12 pt-8 border-t border-gray-800">
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <span className="text-3xl grayscale opacity-70">🌳</span> 
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-500">THE THREE TREES OF REFLECTION</span>
             </h3>
             <p className="text-gray-300 mb-6 text-lg">
                The Qur’an Framework cleanly distinguishes three trees by direction of flow. Understanding their direction is key to understanding your state.
             </p>

             {/* Tree of Life */}
             <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-cyan-900/50 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
               <h4 className="text-cyan-300 font-bold text-lg mb-2 flex justify-between items-center">
                 1) Tree of Life — 12 Nodes
                 <span className="text-xs font-mono bg-cyan-900/30 px-2 py-1 rounded text-cyan-200 border border-cyan-500/20">Source ⇄ Return</span>
               </h4>
               <p className="text-sm text-gray-400 mb-6 font-light">The Qur’anic Living Circuit. Breathing both ways.</p>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm mb-6">
                 {[
                   {n:1, l:'Inspiration', f:'Ilham — spark'}, {n:2, l:'Action', f:'‘Amal — body'}, 
                   {n:3, l:'Guidance', f:'Hudā — direction'}, {n:4, l:'Cleanse', f:'Tazkiyah — pure'},
                   {n:5, l:'Righteous', f:'Ṣāliḥ — align'}, {n:6, l:'Faith', f:'Īmān — trust'}, 
                   {n:7, l:'Blessing', f:'Barakah — grow'}, {n:8, l:'Servant', f:'‘Abd — humble'},
                   {n:9, l:'Submission', f:'Islām — bow'}, {n:10, l:'Sacrifice', f:'Qurbān — give'}, 
                   {n:11, l:'Truth', f:'Ḥaqq — real'}, {n:12, l:'Light', f:'Nūr — return'}
                 ].map(i => (
                   <div key={i.n} className="bg-cyan-950/20 p-2.5 rounded border border-cyan-500/10 hover:bg-cyan-900/30 transition-colors">
                     <div className="text-cyan-400 font-bold mb-0.5">{i.n}. {i.l}</div>
                     <div className="text-gray-500 text-[10px] uppercase tracking-wide">{i.f}</div>
                   </div>
                 ))}
               </div>
               <div className="text-center text-sm font-mono text-cyan-200 mt-2 bg-cyan-950/40 py-3 rounded border border-cyan-500/20">
                 Law: Light → Action → Purification → Truth → Light
               </div>
             </div>

             {/* Date Palm */}
             <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
               <h4 className="text-emerald-300 font-bold text-lg mb-2 flex justify-between items-center">
                 2) Date Palm — 10 Nodes
                 <span className="text-xs font-mono bg-emerald-900/30 px-2 py-1 rounded text-emerald-200 border border-emerald-500/20">Source → World</span>
               </h4>
               <p className="text-sm text-gray-400 mb-6 font-light">Measured Descent (Mīzān). Return is implicit, not guaranteed.</p>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm mb-6">
                 {[
                   {n:0, l:'Emergence'}, {n:1, l:'Light'}, {n:2, l:'Mercy'}, {n:3, l:'Earth'}, 
                   {n:4, l:'Root'}, {n:5, l:'Branch'}, {n:6, l:'Repentance'}, {n:7, l:'Kingdom'}, 
                   {n:8, l:'Sacrifice'}, {n:9, l:'Return'}, {n:10, l:'Ascension'}
                 ].map(i => (
                   <div key={i.n} className="bg-emerald-950/20 p-2.5 rounded border border-emerald-500/10 hover:bg-emerald-900/30 transition-colors flex justify-between items-center">
                     <span className="text-emerald-500 font-bold">{i.n}</span>
                     <span className="text-gray-300">{i.l}</span>
                   </div>
                 ))}
               </div>
               <div className="text-center text-sm font-mono text-emerald-200 mt-2 bg-emerald-950/40 py-3 rounded border border-emerald-500/20">
                 Law: Light descends into form; return requires alignment.
               </div>
             </div>

             {/* Zakkum */}
             <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-red-900/50 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
               <h4 className="text-red-300 font-bold text-lg mb-2 flex justify-between items-center">
                 3) Zakkum — 10 Nodes
                 <span className="text-xs font-mono bg-red-900/30 px-2 py-1 rounded text-red-200 border border-red-500/20">Collapse Only</span>
               </h4>
               <p className="text-sm text-gray-400 mb-6 font-light">False Tree. Inverted / Dead System. No return.</p>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm mb-6">
                 {[
                   {n:0, l:'Nothingness'}, {n:1, l:'Denial'}, {n:2, l:'Whisper'}, {n:3, l:'Conjecture'},
                   {n:4, l:'Disobedient'}, {n:5, l:'Transgress'}, {n:6, l:'Fire'}, {n:7, l:'Falsehood'},
                   {n:8, l:'Collapse'}, {n:9, l:'Fall'}
                 ].map(i => (
                   <div key={i.n} className="bg-red-950/20 p-2.5 rounded border border-red-500/10 hover:bg-red-900/30 transition-colors flex justify-between items-center">
                     <span className="text-red-500 font-bold">{i.n}</span>
                     <span className="text-gray-300">{i.l}</span>
                   </div>
                 ))}
               </div>
               <div className="text-center text-sm font-mono text-red-200 mt-2 bg-red-950/40 py-3 rounded border border-red-500/20">
                 Law: Denial → Fire → Collapse
               </div>
             </div>

             {/* Synthesis */}
             <div className="grid md:grid-cols-3 gap-4 text-center mt-8">
                <div className="p-5 bg-cyan-900/10 border border-cyan-500/20 rounded-xl hover:bg-cyan-900/20 transition-colors">
                    <div className="text-cyan-400 font-bold text-lg mb-2">Tree of Life (12)</div>
                    <div className="text-white font-mono text-base mb-2">Hayāt</div>
                    <div className="text-gray-400 text-sm italic">Light that circulates lives.</div>
                </div>
                <div className="p-5 bg-emerald-900/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-900/20 transition-colors">
                    <div className="text-emerald-400 font-bold text-lg mb-2">Date Palm (10)</div>
                    <div className="text-white font-mono text-base mb-2">Mīzān</div>
                    <div className="text-gray-400 text-sm italic">Light that is measured is tested.</div>
                </div>
                <div className="p-5 bg-red-900/10 border border-red-500/20 rounded-xl hover:bg-red-900/20 transition-colors">
                    <div className="text-red-400 font-bold text-lg mb-2">Zakkum (10)</div>
                    <div className="text-white font-mono text-base mb-2">ʿAdhāb</div>
                    <div className="text-gray-400 text-sm italic">Light that is denied becomes fire.</div>
                </div>
             </div>

           </section>

           {/* FINAL WORD */}
           <div className="pt-16 border-t border-cyan-500/20 text-center pb-8">
             <h3 className="text-xs font-bold text-gray-400 mb-6 tracking-[0.3em] uppercase">Final Word</h3>
             <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
               You are not reading the Qur’an to follow a sound.<br/> You are reading it to <strong className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] text-3xl align-middle mx-1">see</strong>.
             </p>
             <p className="text-gray-300 mb-8">
               Everyone meets the Fire (19:71). Only truth walks through it unharmed (19:72).
             </p>
             
             <div className="space-y-4 text-cyan-200 italic text-xl md:text-2xl font-serif">
               <p>“So where are you going?” <span className="text-sm font-sans not-italic text-gray-400 ml-2 font-normal">(81:26)</span></p>
               <p>“Indeed, to your Lord is the return.” <span className="text-sm font-sans not-italic text-gray-400 ml-2 font-normal">(96:8)</span></p>
             </div>

             <div className="mt-16 inline-block">
               <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6 opacity-70"></div>
               <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                 The Wave is calling its Particle home.<br/>
                 <span className="text-cyan-400/90 mt-2 block font-semibold">Allah is the best of planners.</span>
               </p>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;
