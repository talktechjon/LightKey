import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface FilmCalledLifePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

// --- MINIMALIST TRAJECTORY VIZ ---
const UmmAlKitabViz: React.FC = () => {
  const points = useMemo(() => {
    const pts = [];
    for (let x = -1; x <= 0.4; x += 0.05) {
      const y = 110 * Math.pow(x, 3) + 108 * Math.pow(x, 2) + 103 * x + 19;
      pts.push({ x, y });
    }
    return pts;
  }, []);

  const scaleY = (y: number) => 300 - (y * 5);
  const scaleX = (x: number) => 350 + (x * 400);

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ');

  return (
    <div className="w-full py-12">
      <svg viewBox="0 0 800 400" className="w-full h-auto">
        {/* Subtle Axes */}
        <line x1="100" y1="300" x2="700" y2="300" stroke="white" strokeOpacity="0.15" />
        <line x1="350" y1="50" x2="350" y2="350" stroke="white" strokeOpacity="0.15" />
        
        {/* High Precision Curve */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="white"
          strokeOpacity="0.8"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Phase Markers */}
        <circle cx={scaleX(-0.8)} cy={scaleY(-12)} r="3" fill="#ff6a00" />
        <circle cx={scaleX(-0.1)} cy={scaleY(10)} r="3" fill="#4ade80" />
        <circle cx={scaleX(0.22)} cy={scaleY(40)} r="3" fill="#f5c842" />

        <text x={scaleX(-0.83)} y={scaleY(-25)} fontSize="12" fill="#9ca3af" className="fcl-mono">ax³</text>
        <text x={scaleX(-0.1)} y={scaleY(30)} fontSize="12" fill="#9ca3af" className="fcl-mono">cx</text>
        <text x={scaleX(0.25)} y={scaleY(55)} fontSize="12" fill="#9ca3af" className="fcl-mono">x(t)</text>
      </svg>
    </div>
  );
};

// --- MINIMALIST ATTRACTOR VIZ ---
const AttractorViz: React.FC = () => {
  const pathData = useMemo(() => {
    let x = 0.1, y = 0, z = 0;
    const a = 0.2, b = 0.2, c = 5.7;
    const dt = 0.1;
    let path = "M 200 200";
    for (let i = 0; i < 600; i++) {
       const dx = -y - z;
       const dy = x + a * y;
       const dz = b + z * (x - c);
       x += dx * dt; y += dy * dt; z += dz * dt;
       path += ` L ${200 + x * 12} ${200 + y * 12}`;
    }
    return path;
  }, []);

  return (
    <div className="w-full flex justify-center py-8">
       <svg viewBox="0 0 400 400" className="w-[280px] h-auto">
          <motion.path
            d={pathData}
            fill="none"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
       </svg>
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
            
            <header className="text-center mb-40 fcl-episode">
              <div className="fcl-section-header mb-12">Dual-Caustic Universe (DCU) Framework</div>
              <h1 className="fcl-h1 text-5xl md:text-7xl mb-8">The Umm al-Kitāb Equation</h1>
              <p className="fcl-display font-light text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">A Universal Fractal Field Model: From the Human Heart to the Hubble Tension — and the Return to Nafsan Wāḥidah</p>
              <div className="mt-16 text-[10px] text-gray-600 tracking-[0.5em] font-mono uppercase">Zayed · 2026 · Version 3.0</div>
            </header>

            {/* ABSTRACT */}
            <div className="fcl-episode mb-40">
              <div className="fcl-section-header !mb-8 border-b border-white/5 pb-2 inline-block">Abstract</div>
              <p className="abstract-text">
                This paper presents the Umm al-Kitāb Equation—a 19-locked cubic polynomial derived from the structural logic of the Qurʾān—as a universal fractal field model operating identically from the cardiac oscillation period (τ ≈ 0.83s) to the cosmological Hubble Tension. The equation f(x) = 110x³ + 108x² + 103x + 19 encodes two simultaneously active fields: Light (ℒ = 9, quantum-coherent, low entropy) and Shadow (𝒮 = 10 = 9 + 1, causal-sequential, entropy-increasing). The 2–3–7 operator sequence (Split → System → Return) is grounded in Rössler attractor dynamics, explaining the Hubble Tension as a non-commuting dual-field measurement discrepancy.
              </p>
            </div>

            <div className="fcl-divider"></div>

            {/* INTRODUCTION */}
            <section className="fcl-episode mb-40 space-y-12">
               <h2 className="fcl-section-header">I. Introduction: One Law, All Scales</h2>
               <div className="space-y-8">
                 <p className="text-gray-400 text-lg leading-relaxed">
                   What governs reality at every scale simultaneously? Physics descriptions of the quantum and cosmic scales remain incompatible. Theology describes the soul but rarely contacts the behavior of galaxies or the heartbeat.
                 </p>
                 <p className="text-gray-400 text-lg leading-relaxed border-l border-white/10 pl-8 italic">
                   "He raised the heavens without pillars that you can see" (13:2). Foundational reality stands through internal consistency, not through visible support structures.
                 </p>
                 <p className="text-gray-400 text-lg leading-relaxed">
                   The model requires only Reason (ʿaql): the capacity to observe, test, and follow evidence to its structural conclusion. Stone (the respite of Iblīs) and Reader (the activated buffer) are both expressions of the same Mass field completing its circuit.
                 </p>
               </div>
            </section>

            {/* THE EQUATION */}
            <section className="fcl-episode mb-40 space-y-16">
              <h2 className="fcl-section-header">II. The Cubic Polynomial</h2>
              <div className="py-24 border-y border-white/[0.04] text-center bg-white/[0.01]">
                <div className="fcl-display text-5xl md:text-7xl text-white font-light tracking-tight opacity-95">
                  f(x) = ax³ + bx² + cx + 19
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 px-4">
                 {[
                   { label: 'a = 110', sub: 'Mountain', desc: 'Cubic amplification' },
                   { label: 'b = 108', sub: 'Kawthar', desc: 'Quadratic stabilization' },
                   { label: 'c = 103', sub: 'ʿAṣr', desc: 'Linear propagation' },
                   { label: 'd = 19', sub: 'Tawhīd', desc: 'Rahman Seal' }
                 ].map((t, i) => (
                   <div key={i} className="space-y-2">
                       <div className="text-lg font-semibold text-white/95 fcl-display">{t.label}</div>
                       <div className="text-[10px] uppercase tracking-widest text-[#00c8ff] font-bold">{t.sub}</div>
                       <div className="text-[11px] text-gray-500 leading-tight font-medium">{t.desc}</div>
                   </div>
                 ))}
              </div>
              <div className="transition-all duration-1000">
                <UmmAlKitabViz />
              </div>
            </section>

            {/* OVERFLOW */}
            <section className="fcl-episode mb-40">
              <h2 className="fcl-section-header">III. The Overflow Mechanism</h2>
              <div className="space-y-12">
                <p className="abstract-text">
                  The assignment of Shadow = 10 and Light = 9 encodes a precise mathematical relationship that makes Tāghūt—the limit-crossing overflow—inevitable:
                </p>
                <div className="fcl-display text-6xl text-white font-light py-12 text-center border-x border-white/5 mx-auto max-w-xs bg-white/[0.02]">
                   10 = 9 + 1
                </div>
                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                  Shadow (10) carries an irreducible surplus of +1 above the coherent baseline. This represents a persistent entropy gradient: Shadow systems have one more degree of freedom than coherence requires.
                </p>
              </div>
            </section>

            {/* BUFFER INTERACTION */}
            <section className="fcl-episode mb-40 space-y-12">
               <h2 className="fcl-section-header">IV. The Buffer Interaction Equation</h2>
               <div className="py-20 bg-white/[0.01] border-y border-white/5 text-center">
                  <div className="fcl-display text-4xl md:text-5xl text-white opacity-90">
                    dB/dt = ℒ(t) - 𝒮(t) + γ · x(t)
                  </div>
               </div>
               <p className="text-gray-400 text-lg leading-relaxed">
                 The Buffer (ℬ) is the active intersection. γ is the Reader-coupling constant. When γ &gt; 0 (active Reader, 19:12 activated), the Reader's input acts as a restoring force, drawing the system toward the attractor d = 19.
               </p>
            </section>

            {/* NAME PHASE OPERATORS */}
            <section className="fcl-episode mb-40">
               <h2 className="fcl-section-header">V. Names as Phase Operators</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { name: 'Sulaymān', phase: 'Light (ℒ)', desc: 'Medium-independent, nonlocal order. Wind and iron governed by knowledge.' },
                    { name: 'Mūsā', phase: 'Mass-Light (ℬ)', desc: 'Proof-before-convergence. Buffer made flesh.' },
                    { name: 'Firʿawn', phase: 'Mass-Shadow (𝒮)', desc: 'Causal field closed on itself. "I am your highest lord."' },
                    { name: 'Tāghūt', phase: 'Overflow', desc: 'Shadow amplification beyond limit. Cubic term dominance.' }
                  ].map((p, i) => (
                    <div key={i} className="p-6 border border-white/5 bg-white/[0.01] rounded-sm group hover:border-white/10 transition-colors">
                       <div className="text-[#00c8ff] text-[10px] font-bold uppercase tracking-widest mb-2">{p.phase}</div>
                       <h3 className="fcl-display text-2xl text-white font-light group-hover:text-[#00c8ff] transition-colors">{p.name}</h3>
                       <p className="text-gray-500 text-sm mt-4 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
               </div>
            </section>

            <div className="fcl-divider"></div>

            {/* CHAOS DYNAMICS */}
            <section className="fcl-episode mb-40">
              <h2 className="fcl-section-header">VI. Chaos Dynamics</h2>
              <div className="space-y-16">
                <p className="text-gray-400 text-lg leading-relaxed abstract-text">
                  The 2–3–7 operator sequence (Split, System, Return) corresponds structurally to the <strong>Rössler attractor</strong>. Tawhīd (d = 19) is the mathematical inevitability of the system's strange attractor.
                </p>
                <div className="transition-opacity duration-1000">
                  <AttractorViz />
                </div>
              </div>
            </section>

            {/* SCALES */}
            <section className="fcl-episode mb-40">
              <h2 className="fcl-section-header">VII. Scale Invariance</h2>
              <div className="space-y-24">
                 {[
                   { 
                     title: "Hubble Tension", 
                     scale: "Cosmological",
                     desc: "Discrepancy corresponds to the +1 overflow. Global measurements sample coherence (ℒ=9), local sample causal ladder (𝒮=10). Operators do not commute."
                   },
                   { 
                     title: "Cardiac Zero Point", 
                     scale: "Biological",
                     desc: "The heartbeat unit (τ ≈ 0.83s) is the living buffer through which ℒ and 𝒮 oscillate at the smallest human scale."
                   },
                   { 
                     title: "Metamorphosis", 
                     scale: "Developmental",
                     desc: "Imaginal disc activation (Light phase) during larval dissolution. System transitions from high-entropy Shadow to coherent Light."
                   }
                 ].map((s, i) => (
                   <div key={i} className="flex gap-12 group">
                      <div className="w-px bg-white/10 group-hover:bg-[#00c8ff]/40 transition-all duration-700"></div>
                      <div className="space-y-5">
                         <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#00c8ff]/60 group-hover:text-[#00c8ff] transition-colors">{s.scale}</div>
                         <h3 className="fcl-display text-4xl text-white font-light opacity-90 group-hover:opacity-100 transition-opacity">{s.title}</h3>
                         <p className="text-gray-500 text-base leading-relaxed max-w-md group-hover:text-gray-400 transition-colors">{s.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </section>

            <div className="fcl-divider"></div>

            {/* NAFSAN WAHIDAH */}
            <section className="fcl-episode mb-40 text-center space-y-16">
               <h2 className="fcl-display text-5xl md:text-6xl text-white font-light">Nafsan Wāḥidah</h2>
               <p className="fcl-display text-2xl text-gray-400 leading-relaxed font-light max-w-lg mx-auto opacity-80 italic">
                 "It was always the center. Every journey begins and ends at the pre-split state, where Mass-Energy is conserved across the full 2–3–7 cycle."
               </p>
               <div className="fcl-display text-4xl md:text-5xl text-white tracking-[0.1em] pt-12 opacity-90 font-light">
                  1 → (2·3·7) → 19 ≡ 1
               </div>
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
