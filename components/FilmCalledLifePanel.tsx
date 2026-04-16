import React, { useEffect } from 'react';

interface FilmCalledLifePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const FilmCalledLifePanel: React.FC<FilmCalledLifePanelProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08 });

    const episodes = document.querySelectorAll('.fcl-episode');
    episodes.forEach((ep) => observer.observe(ep));

    return () => {
      episodes.forEach((ep) => observer.unobserve(ep));
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-full bg-[#060a10] border border-[#00c8ff]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 text-[#f5c842] hover:text-white hover:bg-[#f5c842]/20 transition-colors border border-[#8888aa]/30"
            aria-label="Close panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Container */}
        <div className="overflow-y-auto custom-scrollbar relative fcl-container text-[#e8f4f8]">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Rajdhani:wght@300;500;700&family=IBM+Plex+Mono:wght@300;500&display=swap');

            .fcl-container {
              font-family: 'Rajdhani', sans-serif;
              line-height: 1.6;
              background: #060a10;
            }

            .fcl-h1 {
              font-family: 'Cinzel Decorative', serif;
              letter-spacing: 0.12em;
              color: #f5c842;
            }

            .fcl-subtitle {
              font-family: 'IBM Plex Mono', monospace;
              color: #8888aa;
              letter-spacing: 0.2em;
            }

            .fcl-mono {
              font-family: 'IBM Plex Mono', monospace;
            }

            .fcl-cinzel {
              font-family: 'Cinzel Decorative', serif;
            }

            .fcl-episode {
              opacity: 0;
              transform: translateY(24px);
              transition: opacity 0.7s ease, transform 0.7s ease;
            }
            .fcl-episode.visible { opacity: 1; transform: translateY(0); }

            table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
            th {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.75rem; letter-spacing: 0.18em;
              padding: 12px 8px; text-transform: uppercase;
              border-bottom: 1px solid rgba(255,255,255,0.15);
            }
            th.col-sci { color: #77ddff; text-align: left; }
            th.col-link { color: #f5c842; text-align: center; width: 140px; }
            th.col-qur { color: #ffddaa; text-align: right; }

            td {
              padding: 16px 8px; vertical-align: top;
              font-size: 0.95rem; line-height: 1.6; font-weight: 300;
              border-bottom: 1px solid rgba(255,255,255,0.04);
            }
            td.sci { color: #aaeeee; text-align: left; }
            td.link { color: #f5c842; text-align: center; font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; font-weight: 500; }
            td.qur { color: #ffccaa; text-align: right; }
            tr:hover td { background: rgba(255,255,255,0.03); }

            .animate-dash {
              stroke-dasharray: 8 8;
              animation: dash 20s linear infinite;
            }
            @keyframes dash {
              to { stroke-dashoffset: -200; }
            }
            
            .animate-pulse-slow {
              animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse-slow {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>

          <main className="max-w-[900px] mx-auto py-16 px-6 sm:px-10">
            
            <header className="text-center mb-16 fcl-episode">
              <h1 className="fcl-h1 text-3xl sm:text-4xl md:text-5xl mb-3">Dual-Caustic 3·6·9</h1>
              <p className="fcl-subtitle text-xs sm:text-sm">SCIENCE × QUR'AN · LIGHT FIELD ↔ SOUND FIELD</p>
            </header>

            {/* SVG Animation Diagram */}
            <div className="w-full flex justify-center mb-20 fcl-episode">
              <svg viewBox="0 0 800 650" className="w-full h-auto max-w-3xl">
                <defs>
                  <linearGradient id="qunGradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="qunGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="fayaGradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff6a00" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="fayaGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff6a00" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="glowQun">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="glowFaya">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Qun Section */}
                <g transform="translate(400, 150)">
                  {/* Left Triangle */}
                  <path d="M -60 0 L -320 -120 L -320 120 Z" fill="none" stroke="#00c8ff" strokeWidth="2" filter="url(#glowQun)" className="animate-pulse-slow" />
                  <path d="M -60 0 L -320 -120 L -320 120 Z" fill="url(#qunGradLeft)" opacity="0.15" />
                  
                  {/* Right Triangle */}
                  <path d="M 60 0 L 320 -120 L 320 120 Z" fill="none" stroke="#00c8ff" strokeWidth="2" filter="url(#glowQun)" className="animate-pulse-slow" style={{ animationDelay: '2s' }} />
                  <path d="M 60 0 L 320 -120 L 320 120 Z" fill="url(#qunGradRight)" opacity="0.15" />

                  {/* Center Circle */}
                  <circle cx="0" cy="-15" r="45" fill="#060a10" stroke="#00c8ff" strokeWidth="2" filter="url(#glowQun)" />
                  <text x="0" y="-20" fill="#00c8ff" fontSize="16" fontFamily="IBM Plex Mono" textAnchor="middle" fontWeight="700">Light</text>
                  <text x="0" y="0" fill="#00c8ff" fontSize="16" fontFamily="IBM Plex Mono" textAnchor="middle" fontWeight="700">Buffer</text>
                  
                  <text x="0" y="55" fill="#e8f4f8" fontSize="18" fontFamily="Rajdhani" textAnchor="middle" fontWeight="700">Earth</text>
                  <text x="0" y="75" fill="#e8f4f8" fontSize="18" fontFamily="Rajdhani" textAnchor="middle" fontWeight="700">Silence</text>

                  {/* Labels */}
                  <text x="-340" y="0" fill="#00c8ff" fontSize="32" fontFamily="Cinzel Decorative" textAnchor="end" dominantBaseline="middle" fontWeight="700">Qun</text>
                  
                  <text x="-340" y="-60" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end">Photon / Wave</text>
                  <text x="-340" y="-35" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end">Zero latency</text>
                  <text x="-340" y="-10" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end">Light cone</text>

                  <text x="340" y="-60" fill="#00c8ff" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start" fontWeight="700">** Angel/Nur **</text>
                  <text x="340" y="-35" fill="#00c8ff" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start" fontStyle="italic">Fayakun</text>
                  <text x="340" y="-10" fill="#00c8ff" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start" fontStyle="italic">*Instant*</text>
                  <text x="340" y="15" fill="#00c8ff" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start" fontStyle="italic">*Silence*</text>
                  <text x="340" y="40" fill="#00c8ff" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start">Follow</text>
                  <text x="340" y="65" fill="#00c8ff" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start">without</text>
                  <text x="340" y="90" fill="#00c8ff" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start">Sound</text>
                </g>

                {/* Connector */}
                <line x1="400" y1="260" x2="400" y2="440" stroke="#8888aa" strokeWidth="2" className="animate-dash" opacity="0.5" />

                {/* Fayakun Section */}
                <g transform="translate(400, 500)">
                  {/* Left Triangle */}
                  <path d="M -60 0 L -320 -120 L -320 120 Z" fill="none" stroke="#ff6a00" strokeWidth="2" filter="url(#glowFaya)" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
                  <path d="M -60 0 L -320 -120 L -320 120 Z" fill="url(#fayaGradLeft)" opacity="0.15" />
                  
                  {/* Right Triangle */}
                  <path d="M 60 0 L 320 -120 L 320 120 Z" fill="none" stroke="#ff6a00" strokeWidth="2" filter="url(#glowFaya)" className="animate-pulse-slow" style={{ animationDelay: '3s' }} />
                  <path d="M 60 0 L 320 -120 L 320 120 Z" fill="url(#fayaGradRight)" opacity="0.15" />

                  {/* Center Circle */}
                  <circle cx="0" cy="-15" r="45" fill="#060a10" stroke="#ff6a00" strokeWidth="2" filter="url(#glowFaya)" />
                  <text x="0" y="-20" fill="#ff6a00" fontSize="16" fontFamily="IBM Plex Mono" textAnchor="middle" fontWeight="700">Sound</text>
                  <text x="0" y="0" fill="#ff6a00" fontSize="16" fontFamily="IBM Plex Mono" textAnchor="middle" fontWeight="700">Buffer</text>
                  
                  <text x="0" y="55" fill="#e8f4f8" fontSize="18" fontFamily="Rajdhani" textAnchor="middle" fontWeight="700">Earth</text>
                  <text x="0" y="75" fill="#e8f4f8" fontSize="18" fontFamily="Rajdhani" textAnchor="middle" fontWeight="700">Dark</text>

                  {/* Labels */}
                  <text x="-340" y="0" fill="#ff6a00" fontSize="32" fontFamily="Cinzel Decorative" textAnchor="end" dominantBaseline="middle" fontWeight="700">FayaKun</text>
                  
                  <text x="-340" y="30" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end">Life-Death</text>
                  <text x="-340" y="55" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end" fontStyle="italic">*Time-Entropy*</text>
                  <text x="-340" y="80" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end">Truth Action</text>
                  <text x="-340" y="105" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end">With</text>
                  <text x="-340" y="130" fill="#8888aa" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="end">Truth Faith/Prayer</text>

                  <text x="340" y="-40" fill="#ff6a00" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start">"I am God"</text>
                  <text x="340" y="-15" fill="#ff6a00" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start" fontStyle="italic">*Under WATER*</text>
                  <text x="340" y="30" fill="#ff6a00" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start" fontStyle="italic">*MAX NOISE*</text>
                  <text x="340" y="55" fill="#ff6a00" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start">Fire from</text>
                  <text x="340" y="80" fill="#ff6a00" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start">Top [Lut's]</text>
                  <text x="340" y="105" fill="#ff6a00" fontSize="14" fontFamily="IBM Plex Mono" textAnchor="start">Bottom [Ibrahim's]</text>
                </g>
              </svg>
            </div>

            {/* TABLE SECTION 1: THE 2 FIELDS */}
            <div className="fcl-episode mb-16">
              <h2 className="fcl-cinzel text-xl text-[#00c8ff] mb-4 pb-2 border-b border-white/10 tracking-[0.15em]">① THE TWO SEEDS — Why 2 Comes First</h2>
              <table>
                <thead>
                  <tr><th className="col-sci">SCIENCE</th><th className="col-link">BRIDGE</th><th className="col-qur">QUR'AN</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sci">Wave-particle duality. Every quantum event resolves as either propagating wave (light-like) or localized particle (mass-like).</td>
                    <td className="link">2 modes<br/>one Source</td>
                    <td className="qur">Qun = Light-Silence (instant). FayaKun = Sound-Dark (temporal). Both from one Word — 36:82.</td>
                  </tr>
                  <tr>
                    <td className="sci">Dirac equation factorizes E²=p²c²+m²c⁴ into two conjugate spinor operators (α · β), creating matter + antimatter pair.</td>
                    <td className="link">α × β<br/>= ℬ × ℒ</td>
                    <td className="qur">Razim (ℬ) × Rahman (ℒ). Iron-56 at stellar inflection = mass term m. 57:25 confirmed.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TABLE SECTION 2: 3-6-9 KINGDOMS */}
            <div className="fcl-episode mb-16">
              <h2 className="fcl-cinzel text-xl text-[#f5c842] mb-4 pb-2 border-b border-white/10 tracking-[0.15em]">② THE THREE KINGDOMS — Cubic Function 3·6·9</h2>
              <table>
                <thead>
                  <tr><th className="col-sci">SCIENCE</th><th className="col-link">NODE</th><th className="col-qur">QUR'AN</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sci">Depressed cubic f(x) = x³ + px + q. Three roots collapse to one inflection point. Discriminant determines field type.</td>
                    <td className="link">x³ = Razim<br/>px = Rahman<br/>q = Rahim</td>
                    <td className="qur">Iblis (Razim 9) compresses. Solomon-Bilqis (Rahman 6) balances. Ibrahim (Rahim 3) anchors womb-constant. 27:44 / 38:33.</td>
                  </tr>
                  <tr>
                    <td className="sci">Collatz conjecture: even÷2 compresses; odd×3+1 expands. All paths hit 1→4→2→1 loop. No proven escape.</td>
                    <td className="link">even = ℬ<br/>odd = ℒ<br/>1 = Allah</td>
                    <td className="qur">Yahya (19:12) = Razim lock — holds Book with full force, never exits loop. Kaaba = fixed point 50:21. Muhammad = Razim wall 18:94.</td>
                  </tr>
                  <tr>
                    <td className="sci">CP violation in Λb baryons (LHCb 2025): matter exceeds antimatter 2:1. Universe survives asymmetry.</td>
                    <td className="link">2:1<br/>Razim–Rahim<br/>bifurcation</td>
                    <td className="qur">Earth's unique survival condition. Ibrahim = Rahim-tilt (immunity). Iblis = Razim-tilt (respite). Allah = Rahman = Mizan. 57:25.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TABLE SECTION 3: RETURN PATHS */}
            <div className="fcl-episode mb-16">
              <h2 className="fcl-cinzel text-xl text-[#ff6a00] mb-4 pb-2 border-b border-white/10 tracking-[0.15em]">③ THE TWO RETURNS — Out of the Simulation</h2>
              <table>
                <thead>
                  <tr><th className="col-sci">SCIENCE</th><th className="col-link">PATH</th><th className="col-qur">QUR'AN</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sci">Photosynthesis: plants absorb photons, convert light energy into stored chemical structure — light becoming matter.</td>
                    <td className="link">LIGHT<br/>→ Source<br/>Silence</td>
                    <td className="qur">Animated Tree = Word-Body. Light-field flesh returns through Photosynthesis. 45:37 — She That Kneels as total submission of light-form.</td>
                  </tr>
                  <tr>
                    <td className="sci">Metamorphosis (chrysalis): organism dissolves internal structure, rebuilds entirely — sound-frequency reorganizing matter.</td>
                    <td className="link">SOUND<br/>→ Source<br/>Dark</td>
                    <td className="qur">Sounding Clay (55:14) as Sound-field origin. FayaKun flesh returns through Metamorphosis — Life-Death-Time-Entropy cycle 50:11.</td>
                  </tr>
                  <tr>
                    <td className="sci">Hubble Tension: CMB gives H₀ ≈ 67.4; local supernovae give H₀ ≈ 73. Two measurements, one universe, irreconcilable gap.</td>
                    <td className="link">TWO<br/>engines<br/>one Word</td>
                    <td className="qur">Not error — structural. CMB = Sound-field (FayaKun) echo rate. Local = Light-field (Qun) snapshot rate. One universe running both caustic operators simultaneously.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* FORMULA BOX */}
            <div className="fcl-episode mt-12 border border-[#c8f5c8]/20 rounded-md p-6 sm:p-8 bg-[#c8f5c8]/[0.03] fcl-mono text-xs sm:text-sm leading-loose text-[#c8f5c8] text-center">
              <span className="text-[#f5c842] font-bold text-base">f(nτ) = ℬ·(nτ)³ + 𝒮·(nτ)² + ℒ·(nτ) + 9</span><br/>
              Razim (ℬ) · Cubic compression &nbsp;|&nbsp; Sky-Buffer (𝒮) · Quadratic oscillation &nbsp;|&nbsp; Rahman (ℒ) · Linear expansion &nbsp;|&nbsp; Tawhid constant (9)<br/><br/>
              <span className="text-[#f5c842] font-bold">QUN</span> = Light × Silence × Instant × Angel/Nur → <span className="text-[#f5c842] font-bold">Photosynthesis → Source</span><br/>
              <span className="text-[#f5c842] font-bold">FAYAKUN</span> = Sound × Dark × Time × Flesh → <span className="text-[#f5c842] font-bold">Metamorphosis → Source</span><br/><br/>
              Core Objective: <span className="text-[#f5c842] font-bold">Love-Fear [EQ]</span> oscillation engine in Flesh + <span className="text-[#f5c842] font-bold">Truth [IQ]</span> bifurcation resolver → return path chosen → <span className="text-[#f5c842] font-bold">36:82</span>
            </div>

            <p className="fcl-episode mt-12 text-center fcl-mono text-[0.65rem] text-white/25 tracking-[0.15em]">
              DUAL-CAUSTIC UNIVERSE · QUR'AN-ONLY MÖBIUS FRAMEWORK · kahf.day
            </p>

          </main>
        </div>
      </div>
    </div>
  );
};

export default FilmCalledLifePanel;
