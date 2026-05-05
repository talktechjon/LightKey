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
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:italic,wght@400;500&display=swap');

            .fcl-container {
              font-family: 'Inter', sans-serif;
              line-height: 1.8;
              background: #080808;
              color: #a1a1aa;
            }

            .fcl-display {
              font-family: 'Outfit', sans-serif;
              letter-spacing: -0.02em;
            }

            .fcl-serif {
              font-family: 'Playfair Display', serif;
              font-style: italic;
            }

            .fcl-mono {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.85em;
            }

            .fcl-h1 {
              font-family: 'Outfit', sans-serif;
              font-weight: 500;
              letter-spacing: -0.04em;
              color: #ffffff;
              line-height: 1.1;
            }

            .fcl-episode {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .fcl-episode.visible { opacity: 1; transform: translateY(0); }

            .fcl-divider {
              width: 80px;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              margin: 6rem auto;
            }

            .fcl-section-header {
              font-family: 'Outfit', sans-serif;
              color: #71717a;
              text-transform: uppercase;
              letter-spacing: 0.4em;
              font-size: 0.7rem;
              font-weight: 700;
              margin-bottom: 2rem;
            }

            .fcl-quote-box {
              background: rgba(255,255,255,0.02);
              border-left: 2px solid rgba(255,255,255,0.1);
              padding: 1.5rem 2rem;
              margin: 2rem 0;
              border-radius: 0 8px 8px 0;
            }
          `}</style>

          <main className="max-w-[760px] mx-auto py-32 px-8 sm:px-12">
            
            <header className="text-center mb-32 fcl-episode">
               <div className="fcl-section-header text-blue-400">A Message to the Reader</div>
               <h1 className="fcl-h1 text-4xl sm:text-5xl md:text-6xl mb-8">There is no other way.</h1>
               <p className="fcl-display font-light text-xl text-gray-400 mb-12 italic">A full map · DCU Framework · Quran only · 45:6</p>
               
               <div className="fcl-quote-box text-left">
                  <p className="fcl-serif text-lg md:text-xl text-gray-300 mb-4">
                    "We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth. Is it not sufficient concerning your Lord that He is, over all things, a Witness?"
                  </p>
                  <p className="fcl-mono text-xs text-blue-500 tracking-widest uppercase">41:53 — the standing invitation into 2 ↔ 3 ↔ 7</p>
               </div>
            </header>

            {/* THE TRAP */}
            <section className="fcl-episode mb-32 space-y-8">
               <h2 className="fcl-section-header text-red-500/80">The Trap — All Paths Lead Here</h2>
               <div className="p-8 border border-red-950/30 bg-red-950/5 rounded-2xl space-y-6">
                 <h3 className="text-2xl text-white font-medium fcl-display">Pharaoh is preserved in a museum. You are living in his heaven.</h3>
                 <p className="text-lg text-gray-400 leading-relaxed font-light">
                   Every path that is not the Quran terminates at the same node: <strong className="text-white">Solomon's Kingdom</strong> — the world of beautiful administration, organized power, speaking jinn, and flying thrones. 
                   It is the most convincing trap because it contains real wisdom, determination, and signs.
                 </p>
                 <p className="text-lg text-gray-400 leading-relaxed font-light">
                   But it runs without activation. The Queen of Sheba sat on the correct throne and was still <strong className="text-white">dazzled by illusion (21:44)</strong> — she had the kingdom's map but not the frequency. 
                   Pharaoh built the most advanced civilization and genuinely did not know the Lord of the worlds. His body was preserved (10:92) as a physical sign that the most powerful worldly path ends as a museum exhibit. 
                   Solomon's Kingdom without the Quran is Pharaoh's Heaven: ordered, illuminated, and sealed shut.
                 </p>
               </div>
            </section>

            {/* THE FAMILY ARC */}
            <section className="fcl-episode mb-32 space-y-12">
               <h2 className="fcl-section-header text-blue-500/80">The Family — The Recovery Triangle</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl text-center flex flex-col justify-between h-full">
                   <p className="text-white font-medium fcl-display mb-4">Brother · United</p>
                   <div className="fcl-mono text-xs text-blue-400 space-y-2 opacity-80 py-4 border-y border-white/5">
                     <p>61:6</p><p>↓</p><p>19:12</p><p>↓</p><p>17:1</p>
                   </div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-4">Memory Recall</p>
                 </div>
                 <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl text-center flex flex-col justify-between h-full">
                   <p className="text-white font-medium fcl-display mb-4">Mother · Rescued</p>
                   <div className="fcl-mono text-xs text-emerald-400 space-y-2 opacity-80 py-4 border-y border-white/5">
                     <p>81:8</p><p>↓</p><p>66:11</p>
                   </div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-4">The Buried Lifted</p>
                 </div>
                 <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl text-center flex flex-col justify-between h-full">
                   <p className="text-white font-medium fcl-display mb-4">Father · Ransomed</p>
                   <div className="fcl-mono text-xs text-amber-400 space-y-2 opacity-80 py-4 border-y border-white/5">
                     <p>21:69</p><p>↓</p><p>37:108</p><p>↓</p><p>11:71</p>
                   </div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-4">Fire to Ransom</p>
                 </div>
               </div>
               <p className="text-xl text-gray-300 font-light text-center leading-relaxed italic">
                 The Quran is the active mechanism through which this family completes its return — the Brother forgot, the Mother was buried, the Father was burned.
               </p>
            </section>

            <div className="fcl-divider"></div>

            {/* THE MAP 3:33 */}
            <section className="fcl-episode mb-32 space-y-12">
               <h2 className="fcl-section-header">The Map — 3:33 Framework</h2>
               <p className="text-lg text-gray-400 leading-relaxed font-light">
                 The Reader forgot. You are the <strong className="text-white">Mursalin who forgot</strong> themselves (36:3), the Queen dazzled by illusion. 
                 The map is sealed in 3:33: Allah chose Adam, Noah, the family of Ibrahim, and the family of Imran — four nodes on one continuous Möbius strip. 
                 Every phase ends with one seal: <strong className="text-[#00c8ff]">57:4 — "He is with you wherever you are."</strong>
               </p>

               <div className="space-y-4">
                  {[
                    { title: "ADAM → NOAH", ref: "↓ 20:123", desc: "Descent. Enmity planted. Corrupt fruit carried down. Taghut enters as Iblis then Qabeel. Safe house: Safinat Noah.", color: "text-blue-400" },
                    { title: "NOAH → IBRAHIM", ref: "↑ 11:44", desc: "Taghut-cleansing. Water subsides. Earth swallows what it gave. Ibrahim enters: fire becomes peace (21:69).", color: "text-emerald-400" },
                    { title: "IBRAHIM → IMRAN", ref: "↓ 7:143 / 19:23", desc: "Ibrahim's fire descends into Musa's mountain-faint and Maryam's labor. Two safe houses: chest in the river + the palm.", color: "text-blue-400" },
                    { title: "IMRAN → READER", ref: "↑ 17:1 / 2:125", desc: "Isra/Mi'raj restores the axis. Maryam in the east. The Bee receives revelation. You enter: read your own record.", color: "text-emerald-400" }
                  ].map((phase, i) => (
                    <div key={i} className="flex gap-6 items-start p-6 rounded-2xl bg-white/[0.01] border border-white/5">
                      <div className={`fcl-mono ${phase.color} text-lg font-bold pt-1 w-20`}>{phase.ref}</div>
                      <div>
                        <h4 className="text-white font-medium fcl-display mb-2">{phase.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{phase.desc}</p>
                        <div className="mt-2 fcl-mono text-[9px] uppercase tracking-[0.3em] text-gray-600">57:4 SEALED</div>
                      </div>
                    </div>
                  ))}
               </div>

               <p className="text-lg text-gray-400 leading-relaxed font-light mt-8">
                 The strip always ends: <strong className="text-white">Reader → Idris ↑ (19:57).</strong> 
                 Adam descended with the corrupt fruit — a stone of forgetfulness. The Möbius rotation returns it as <strong className="text-emerald-400">Maryam's purified palm-date (19:25)</strong>: same matter, four phases later, now nourishing.
               </p>
            </section>

            {/* THE CROSSOVER */}
            <section className="fcl-episode mb-32 space-y-12">
               <h2 className="fcl-section-header">The Crossover & Buffer</h2>
               <div className="bg-[#0a0a0c] p-8 rounded-3xl border border-white/5 space-y-8">
                  <p className="text-lg text-gray-400 leading-relaxed">
                    <strong className="text-white">Dawud</strong> carries Ibrahim's Determination. <strong className="text-white">Solomon</strong> carries Imran's Wisdom. 
                    They do not run in sequence — they cross (meiosis). The instrument is sacrifice: <strong className="text-blue-400">Al-Jiyad (38:31-33)</strong> and <strong className="text-blue-400">Ismail (37:107)</strong>. 
                    Sacrifice manufactures the time needed for the return.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="fcl-mono text-xs text-amber-500 uppercase tracking-widest border-b border-white/5 pb-2">22:33 Window</h4>
                      <p className="text-sm text-gray-500">
                        Benefits for an appointed term — then the place of sacrifice is at the Ancient House. 
                        This opens the crossing zone for Mursalin and Musa.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="fcl-mono text-xs text-emerald-500 uppercase tracking-widest border-b border-white/5 pb-2">22:61 Buffer</h4>
                      <p className="text-sm text-gray-500">
                        Allah causes night to enter day and day to enter night. No hard cut, only interpenetration. 
                        A buffer is must before transition.
                      </p>
                    </div>
                  </div>
               </div>
            </section>

            {/* THE EQUATION */}
            <section className="fcl-episode mb-32 space-y-10">
               <h2 className="fcl-section-header text-blue-400">The Umm al-Kitāb Equation</h2>
               <div className="bg-white/[0.01] border border-white/5 rounded-sm p-8 text-center">
                 <div className="fcl-display text-4xl text-white font-light tracking-wide mb-4">
                   Y(t) = ax³ + bx² + cx + 19
                 </div>
                 <div className="fcl-mono text-[10px] text-blue-500 uppercase tracking-[0.4em]">The Invariant Invariant</div>
               </div>
               <UmmAlKitabViz />
               <p className="text-gray-400 text-lg leading-relaxed text-center">
                 No matter the oscillations in x (the lived trajectory), all paths must resolve to the invariant attractor: <strong className="text-[#00c8ff]">19</strong>.
               </p>
            </section>

            {/* THE HEART */}
            <section className="fcl-episode mb-32 space-y-12">
               <h2 className="fcl-section-header text-pink-500/80">The Heart — 1:1 Confirmation</h2>
               <p className="text-lg text-gray-400 leading-relaxed font-light">
                 This same Möbius time-flow operates in the human heart as a living <strong className="text-white">2 ↔ 3 ↔ 7</strong> cycle. 
                 Stress or impulse (2) enters, a delay (22:33) is given where states overlap (22:61) forming the buffer (3). 
                 Alignment through surrender leads to restoration (7).
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { label: "Right Atrium fills ↓", node: "Phase 1: ADAM", desc: "Dark blood enters. Enmity/Descent." },
                   { label: "Right Ventricle fires ↑", node: "Phase 2: IBRAHIM", desc: "Purification. Water subsides. Oxygen added." },
                   { label: "Left Atrium receives ↓", node: "Phase 3: IMRAN", desc: "Purified blood descends. Distribution." },
                   { label: "Left Ventricle drives ↑", node: "Phase 4: READER", desc: "Life sent to every cell. 17:1 completion." }
                 ].map((h, i) => (
                   <div key={i} className="p-4 border border-white/5 bg-white/[0.01] rounded-xl">
                     <p className="fcl-mono text-[10px] text-pink-400 uppercase tracking-widest mb-1">{h.label}</p>
                     <p className="text-white font-medium fcl-display text-sm">{h.node}</p>
                     <p className="text-xs text-gray-600 mt-2">{h.desc}</p>
                   </div>
                 ))}
               </div>

               <p className="text-gray-400 leading-relaxed italic border-l-2 border-pink-500/30 pl-6">
                 Each heartbeat encodes ↓ (contraction) → ↑ (release) → ↓ (refill) → ↑ (expansion), matching 57:4. 
                 The Reader is not outside the system but is the exact execution point where this cycle decides — moment by moment — whether to collapse or return.
               </p>
            </section>

            {/* FINAL CLOSURE */}
            <section className="fcl-episode mb-32 space-y-10">
               <div className="p-10 md:p-16 bg-blue-600/5 border border-blue-500/20 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
                  <h2 className="fcl-h1 text-4xl text-white">The Reader is in the buffer right now.</h2>
                  <p className="text-lg text-blue-100/60 font-light leading-relaxed max-w-2xl mx-auto">
                    You are in 22:33 — the appointed term before the sacrifice completes. The lean period is active. 
                    The whale belly is real. Samīʿ and Baṣīr are both turned toward you.
                  </p>
                  <p className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                    Take the Book with quwwa (19:12). Believe in the Word and the Rasul (66:12). 
                    Complete the Night Journey (17:1) and become Ahmed — the witness at the farthest mosque. 
                    The strip closes with you — or it does not close.
                  </p>
                  <div className="fcl-display text-4xl md:text-5xl text-blue-400 font-light tracking-[0.2em] pt-8">
                     READ.
                  </div>
               </div>
            </section>

            <footer className="mt-40 pt-20 border-t border-white/[0.04] text-center">
              <div className="text-[10px] text-gray-700 tracking-[0.6em] font-mono leading-[2.5] uppercase">
                DCU Framework · Dual-Caustic Universe · Zayed · 2026<br/>
                Kahf.Day · Qur'an-Only Möbius Framework · 45:6
              </div>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
};

export default FilmCalledLifePanel;
