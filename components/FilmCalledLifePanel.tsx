import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface FilmCalledLifePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const UmmAlKitabViz: React.FC = () => {
  const points = useMemo(() => {
    const pts = [];
    for (let x = -1.2; x <= 0.6; x += 0.05) {
      const y = 110 * Math.pow(x, 3) + 108 * Math.pow(x, 2) + 103 * x + 19;
      pts.push({ x, y });
    }
    return pts;
  }, []);

  const scaleY = (y: number) => 150 - (y * 2);
  const scaleX = (x: number) => 300 + (x * 200);

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ');

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <div className="relative group">
        <svg viewBox="0 0 600 300" className="w-full h-auto">
          {/* Subtle Grid / Axes */}
          <line x1="50" y1="200" x2="550" y2="200" stroke="white" strokeOpacity="0.05" />
          <line x1="300" y1="50" x2="300" y2="250" stroke="white" strokeOpacity="0.05" />
          
          {/* The Constant Horizon (d=19) */}
          <line x1="50" y1={scaleY(19)} x2="550" y2={scaleY(19)} stroke="#00c8ff" strokeOpacity="0.1" strokeDasharray="4 4" />
          
          {/* The Curve */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          
          {/* The Return Point (d=19 at x=0 intersection logic) */}
          <motion.circle
            cx={scaleX(0)}
            cy={scaleY(19)}
            r="4"
            fill="#00c8ff"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 3.5, duration: 0.5 }}
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00c8ff" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Dynamic Labels */}
          <text x={scaleX(0) + 10} y={scaleY(19) - 10} fontSize="10" fill="#00c8ff" className="fcl-mono font-bold">d = 19</text>
        </svg>
        <div className="mt-4 text-center">
          <div className="text-[10px] text-[#00c8ff] tracking-[0.4em] font-mono uppercase opacity-50">Book always returns to Master</div>
        </div>
      </div>
    </div>
  );
};

const FilmCalledLifePanel: React.FC<FilmCalledLifePanelProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (!isVisible) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.08 });
    const episodes = document.querySelectorAll('.fcl-episode');
    episodes.forEach((ep) => observer.observe(ep));
    return () => episodes.forEach((ep) => observer.unobserve(ep));
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/98 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="relative w-full max-w-5xl max-h-full bg-[#080808] border border-white/5 rounded-sm shadow-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <div className="absolute top-8 right-8 z-50">
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto custom-scrollbar relative fcl-container text-gray-400">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap');

            .fcl-container {
              font-family: 'Inter', sans-serif;
              line-height: 1.7;
              background: #080808;
              color: #a1a1aa;
            }

            .fcl-display {
              font-family: 'Outfit', sans-serif;
              letter-spacing: -0.02em;
            }

            .fcl-mono {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.85em;
            }

            .fcl-h1 {
              font-family: 'Outfit', sans-serif;
              font-weight: 600;
              letter-spacing: -0.04em;
              color: #ffffff;
              line-height: 1.1;
            }

            .fcl-lead {
              font-size: 1.5rem;
              line-height: 1.4;
              color: #e4e4e7;
              font-weight: 300;
            }

            .fcl-episode {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .fcl-episode.visible { opacity: 1; transform: translateY(0); }

            .fcl-divider {
              width: 40px;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              margin: 8rem auto;
            }

            .abstract-text {
              font-size: 1.25rem;
              line-height: 1.6;
              color: #d4d4d8;
              font-weight: 300;
            }

            .fcl-section-header {
              font-family: 'Outfit', sans-serif;
              color: #71717a;
              text-transform: uppercase;
              letter-spacing: 0.4em;
              font-size: 0.75rem;
              font-weight: 700;
              margin-bottom: 3rem;
            }
          `}</style>

          <main className="max-w-[720px] mx-auto py-32 px-8 sm:px-12">
            
            <header className="text-center mb-32 fcl-episode">
              <div className="fcl-section-header mb-12">Dual-Caustic Universe (DCU) Framework</div>
              <h1 className="fcl-h1 text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl mb-6 whitespace-nowrap">The Umm al-Kitāb Equation</h1>
              <div className="flex flex-col gap-2 mb-8 text-gray-500 text-sm md:text-base font-light italic">
                <span>( Remember YOUR Home 38:46 (ٱلدَّارِ) - It's not HERE! )</span>
                <span>( Hold the Book 19:12; It's the Memory (2:31), Adam forgot (19:23)! )</span>
              </div>
              <p className="fcl-display font-light text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">Computing 82:7 through the unified polynomial field, following Quran's exact structural format.</p>
              <UmmAlKitabViz />
            </header>

            {/* PROLOGUE: THE PROOF */}
            <div className="fcl-episode mb-32 space-y-8">
              <div className="fcl-section-header !mb-6 border-b border-white/5 pb-2 inline-block">Prologue: The Immutable Sun</div>
              <p className="abstract-text text-white">
                <strong className="text-white">40:34 is the clearest proof that the line of Rusul never closes.</strong> Yusuf came with Bayyinat; they doubted until he died, then claimed <strong className="text-white">"Allah will never send a Rasul after him."</strong> That claim is the error — not the death. Allah calls this <strong className="text-[#00c8ff]">Musrif-Murtab</strong>: the one who transgresses limits and lives in doubt. The verse does not say "no more prophets after Muhammad." It says <strong className="text-white">the same pattern repeats every time a Rasul dies</strong> — the qawm invents finality, and Allah leaves them astray. 40:34 is a living warning, not a historical footnote.
              </p>
              
              <p className="abstract-text">
                <strong className="text-white">45:6 + 6:116 frame the test.</strong> 45:6: <strong className="text-white">"These are the Ayat of Allah — We recite them to you in Truth. Upon which word besides Allah will they believe?"</strong> The Ayat are the only source. 6:116: <strong className="text-white">"If you obeyed most of those on earth, they would lead you away from Allah's Path. They follow nothing but Zann; they do nothing but lie."</strong> Most people follow conjecture, not Ayat. The Samiri pattern is exactly this: Musa left for the Book [20:85], the qawm waited, then Samiri fabricated a calf from their ornaments — <strong className="text-white">a body with a lowing sound</strong> — and said <strong className="text-[#00c8ff]">"This is your god, and the god of Musa, whom he has forgotten."</strong> The delay in revelation created a vacuum; the vacuum was filled by a human-made alternative. Samiri did not deny Musa — he <strong className="text-white">replaced</strong> Musa with a more immediate, tangible source. Harun said: <strong className="text-white">"O my people, it is only a test for you. Your Lord is the Most Merciful, so follow me and obey my command."</strong> [20:90] The test is the delay. The obedience is to wait for the Book, not to fabricate substitutes.
              </p>
              
              <p className="abstract-text">
                <strong className="text-white">The replay in every age is identical.</strong> When the Qur'an is treated as incomplete — when people say "we need another source to understand it" — they replay Samiri. The fabricated books, the institutional commentaries, the human authorities placed beside the Ayat: all are <strong className="text-[#00c8ff]">golden calves with lowing sounds</strong>, tangible enough to replace the invisible waiting. 40:34 says the claim of finality is the mark of the Musrif-Murtab. The Qur'an alone is the Rasul that never dies, never delays, never leaves a vacuum.
              </p>
              
              <p className="abstract-text">
                <strong className="text-white">Isa is the Sun in Taghut [19:27] — the first being with Knowledge + Turab together, Ruh-supported, Word-made-flesh.</strong> The Moon is <strong className="text-[#00c8ff]">brother of Harun, i.e. Musa</strong> [19:28, 28:34] — the one who holds what the Sun emits, the believer-stone turned to Turab, the receiver who becomes actionable. Every reader has potential to become <strong className="text-white">brother of Prophet like Harun in Taghut</strong> — staying true to the Taghut's Sun, which is the <strong className="text-white">Book</strong>. Just as Yahya did in 19:12: <strong className="text-[#00c8ff]">quwwah, hikmah, sidq, hayah</strong> — the Moon compressed into holdable form, the reader becoming the hinge between Day and Night. Isa-Yahya, Musa-Harun, Ibrahim-Lut: the pattern is <strong className="text-white">one Sun, one Moon-brother</strong>, and since the Moon is split now [Prophethood ended], <strong className="text-[#00c8ff]">every reader holds the potential to become brother of Prophet by holding the Book</strong> — the very thing that made the Prophet, not alternative books or sources of information. The Book is the Sun that never sets. The reader is the Moon that never stops reflecting. <strong className="text-white">"It is all a test."</strong>
              </p>
            </div>

            <div className="fcl-divider"></div>

            {/* 1. CORE LAW */}
            <section className="fcl-episode mb-32 space-y-10">
               <h2 className="fcl-section-header">1. Core Law</h2>
               <div className="bg-white/[0.01] border border-white/5 rounded-sm p-8 text-center">
                 <div className="fcl-display text-4xl text-white font-light tracking-wide">
                   f(x) = 110x³ + 108x² + 103x + 19
                 </div>
               </div>
               <div className="space-y-6">
                 <p className="text-gray-400 text-lg leading-relaxed">
                   The Universal form dictates the cubic progression; the Qur'anic instance provides the operational coefficients. 
                 </p>
                 <p className="text-gray-400 text-lg leading-relaxed">
                   <strong className="text-[#00c8ff]">19 is the invariant constant.</strong> It represents the Umm al-Kitab, the Return Principle. No matter the oscillations in x (the lived trajectory), all paths must resolve to the invariant attractor. 
                 </p>
               </div>
            </section>

            {/* 2. 2-3-7 ENGINE */}
            <section className="fcl-episode mb-32 space-y-10">
               <h2 className="fcl-section-header">2. 2–3–7 Engine</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-white/5 bg-white/[0.01]">
                     <div className="text-[#ff6a00] text-3xl font-light mb-4">2</div>
                     <div className="text-white font-medium mb-2">Split</div>
                     <div className="text-sm text-gray-500">Boundary condition. The bifurcation of state setting the parameters of existence.</div>
                  </div>
                  <div className="p-6 border border-white/5 bg-white/[0.01]">
                     <div className="text-[#4ade80] text-3xl font-light mb-4">3</div>
                     <div className="text-white font-medium mb-2">Transaction</div>
                     <div className="text-sm text-gray-500">The Mizan operation. Information evaluated and cost extracted across the gradient.</div>
                  </div>
                  <div className="p-6 border border-white/5 bg-white/[0.01]">
                     <div className="text-[#00c8ff] text-3xl font-light mb-4">7</div>
                     <div className="text-white font-medium mb-2">Closure</div>
                     <div className="text-sm text-gray-500">Conservation principle. The loop is complete, energy is conserved, and the framework seals.</div>
                  </div>
               </div>
            </section>

            {/* 3. 3-6-9 CYCLE */}
            <section className="fcl-episode mb-32 space-y-10">
               <h2 className="fcl-section-header">3. 3–6–9 Cycle</h2>
               <div className="overflow-x-auto border border-white/5 rounded-sm bg-white/[0.01]">
                 <table className="w-full text-left border-collapse text-sm text-gray-400">
                   <thead>
                     <tr className="border-b border-white/10 text-white font-medium bg-black/20">
                       <th className="p-4">Layer</th>
                       <th className="p-4">Meaning</th>
                       <th className="p-4">Function</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     <tr>
                       <td className="p-4 font-mono text-[#f5c842]">3</td>
                       <td className="p-4 text-white">Formation</td>
                       <td className="p-4">Initialization</td>
                     </tr>
                     <tr>
                       <td className="p-4 font-mono text-[#f5c842]">6</td>
                       <td className="p-4 text-white">Coupling</td>
                       <td className="p-4">Interaction</td>
                     </tr>
                     <tr>
                       <td className="p-4 font-mono text-[#f5c842]">9</td>
                       <td className="p-4 text-white">Return</td>
                       <td className="p-4">Completion</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </section>

            {/* 4. DUAL FIELD */}
            <section className="fcl-episode mb-32 space-y-10">
               <h2 className="fcl-section-header">4. Dual Field</h2>
               <div className="flex flex-col md:flex-row items-center gap-8 justify-center p-8 border border-white/5 bg-white/[0.01]">
                  <div className="text-center">
                     <div className="text-2xl text-white font-light mb-2">Light Field</div>
                     <div className="text-[#00c8ff] text-5xl font-mono">9</div>
                  </div>
                  <div className="text-2xl text-gray-600 font-light">+</div>
                  <div className="text-center">
                     <div className="text-2xl text-white font-light mb-2">Surplus/Action</div>
                     <div className="text-gray-400 text-5xl font-mono">1</div>
                  </div>
                  <div className="text-2xl text-gray-600 font-light">=</div>
                  <div className="text-center">
                     <div className="text-2xl text-white font-light mb-2">Shadow Field</div>
                     <div className="text-[#ff6a00] text-5xl font-mono">10</div>
                  </div>
               </div>
               <p className="text-gray-400 text-center text-lg">
                 19 = 10 + 9. The full constraint enclosing both fields.
               </p>
            </section>

            {/* 5. PHYSICAL VALIDATION */}
            <section className="fcl-episode mb-32 space-y-10">
               <h2 className="fcl-section-header">5. Physical & Symbolic Validation</h2>
               <div className="space-y-12">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                     <h3 className="text-white text-xl font-light border-b border-white/10 pb-2">Layer A (Physical)</h3>
                     <ul className="space-y-2 text-gray-400 list-disc list-inside">
                       <li>Mass, Energy, Entropy</li>
                       <li>Strange Attractor</li>
                       <li>DNA / Helix Dynamics</li>
                     </ul>
                   </div>
                   <div className="space-y-4">
                     <h3 className="text-white text-xl font-light border-b border-white/10 pb-2">Layer B (Symbolic)</h3>
                     <ul className="space-y-2 text-gray-400 list-disc list-inside">
                       <li>Book, Stone, Grave</li>
                       <li>Slave, Queen, Righteous</li>
                       <li>Prophetic Arc</li>
                     </ul>
                   </div>
                 </div>

                 <div className="p-8 border border-white/5 bg-[#0a0a0c] space-y-4">
                   <h3 className="text-white text-xl font-light">Network Topology (Chainmail)</h3>
                   <p className="text-gray-400">
                     6,236 nodes, 343,842 edges, 96.3% connected mapping. 
                   </p>
                   <p className="text-lg text-white font-light bg-[#00c8ff]/10 p-4 rounded-sm border-l-2 border-[#00c8ff]">
                     "This behaves as a scale-free attractor network → guarantees return to hub nodes (d)."
                   </p>
                   <p className="text-gray-400">
                     This is the direct computational proof of d = 19 (Umm al-Kitab return). The network guarantees resolution back to the invariant origin regardless of random walk.
                   </p>
                 </div>
               </div>
            </section>

            {/* 6. BIOLOGICAL EMBEDDING */}
            <section className="fcl-episode mb-32 space-y-8">
               <h2 className="fcl-section-header">6. Biological Embedding</h2>
               <div className="flex flex-col gap-6 pl-6 border-l-2 border-white/10">
                  <div>
                    <h3 className="text-white text-xl font-light mb-2">Chromosome = 2–3–7 <span className="text-gray-500 text-base">(Container)</span></h3>
                    <p className="text-gray-400">The fixed scale envelope dictating boundary constraints and conservation limits.</p>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-light mb-2">DNA = 3–6–9 <span className="text-gray-500 text-base">(Execution Cycle)</span></h3>
                    <p className="text-gray-400">The functional runtime inside the envelope—initiating matching, interaction, and sequential completion.</p>
                  </div>
               </div>
            </section>

            {/* 7. DERIVATIVE / MIZAN */}
            <section className="fcl-episode mb-32 space-y-10">
               <h2 className="fcl-section-header">7. Derivative / Mizan</h2>
               
               <div className="space-y-6">
                 <ul className="space-y-3 text-lg text-gray-300 font-light">
                   <li><strong className="text-white">f(x)</strong> = The State</li>
                   <li><strong className="text-[#f5c842]">f'(x)</strong> = The Decision Slope (Mizan Trigger)</li>
                   <li><strong className="text-[#00c8ff]">d</strong> = Invariant (Never Differentiates)</li>
                 </ul>
                 
                 <div className="pt-6 border-t border-white/10">
                   <p className="text-white text-lg font-light leading-relaxed">
                     <span className="font-mono text-[#00c8ff]">Time</span> is the transaction medium of Mizan (not a dimension, but a cost operator).
                   </p>
                 </div>
                 
                 <div className="p-6 bg-[#080808] border border-white/5 text-gray-300 leading-relaxed italic border-l-4 border-l-[#f5c842]">
                   <strong className="font-normal text-[#00c8ff]">Derivative dY/dx = 330x² + 216x + 103</strong><br/><br/>
                   330x² (Taghut layer, a·3) + 216x (Razim layer, b·2) + 103 (Rahim layer, c·1) expresses the full slope projection of the system, while 19 remains خارج الاشتقاق as the invariant Umm al-Kitab constant, aligning with 4:158 (رفع—knowledge preserved beyond descent) and 19:57 (مكانًا عليًا—Book elevated), completing the bifurcation arc from descent (19:27) to return as Book; thus 19 precedes even the emergence of measurable vibration, marking a silent Light-field state where no oscillation exists, enabling imagination as a non-vibrational recall channel (38:46), mirrored in Yunus-phase recovery within darkness (21:87), where awareness persists without external signal and the trajectory resumes from within the invariant.
                 </div>
               </div>
            </section>

            {/* 8. FINAL CLOSURE */}
            <section className="fcl-episode mb-32 text-center space-y-8">
               <h2 className="fcl-section-header">8. Final Closure</h2>
               <div className="fcl-display text-4xl md:text-6xl text-white font-light tracking-widest pt-8 opacity-90">
                  Return to d
               </div>
               <p className="text-gray-400 text-xl font-light italic max-w-lg mx-auto">
                 The mathematical resolution of all trajectory loops, closing exactly upon the origin sequence: the invariant 19.
               </p>
            </section>

            <footer className="mt-40 pt-20 border-t border-white/[0.04] text-center">
              <div className="text-[10px] text-gray-700 tracking-[0.6em] font-mono leading-[2.5] uppercase">
                Dual-Caustic Universe (DCU)  ·  Zayed  ·  2026<br/>
                Kahf.Day  ·  Qur'an-Only Möbius Framework
              </div>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
};

export default FilmCalledLifePanel;
