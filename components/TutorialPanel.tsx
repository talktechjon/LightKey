import React, { useEffect } from 'react';

interface TutorialPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const TutorialPanel: React.FC<TutorialPanelProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08 });

    const episodes = document.querySelectorAll('.tut-episode');
    episodes.forEach((ep) => observer.observe(ep));

    return () => {
      episodes.forEach((ep) => observer.unobserve(ep));
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-full bg-[#06080c] border border-[#1e2010] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 text-[#c9a84c] hover:text-white hover:bg-[#c9a84c]/20 transition-colors border border-[#1e2010]"
            aria-label="Close panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Container */}
        <div className="overflow-y-auto custom-scrollbar relative tut-container">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

            .tut-container {
              --gold: #c9a84c;
              --light: #e8dfc8;
              --dim: #8a8070;
              --bg: #06080c;
              --node: #10141c;
              --accent: #4a8fc4;
              --fire: #d05828;
              --green: #4a8a5a;
              --border: #1e2010;

              background: var(--bg);
              color: var(--light);
              font-family: 'EB Garamond', serif;
              font-size: 17px;
              line-height: 1.8;
            }

            .tut-episode {
              opacity: 0;
              transform: translateY(24px);
              transition: opacity 0.7s ease, transform 0.7s ease;
            }
            .tut-episode.visible { opacity: 1; transform: translateY(0); }

            .tut-container h1 {
              font-family: 'Cinzel', serif;
              font-size: 20px;
              font-weight: 700;
              color: var(--gold);
              letter-spacing: 0.14em;
              text-align: center;
              margin-bottom: 4px;
              text-transform: uppercase;
            }

            .tut-container .sub {
              text-align: center;
              color: var(--dim);
              font-style: italic;
              font-size: 14.5px;
              margin-bottom: 52px;
              letter-spacing: 0.05em;
            }

            .tut-container h2 {
              font-family: 'Cinzel', serif;
              font-size: 11.5px;
              font-weight: 700;
              color: var(--gold);
              letter-spacing: 0.22em;
              text-transform: uppercase;
              margin: 44px 0 14px;
              padding-bottom: 7px;
              border-bottom: 1px solid var(--border);
            }

            .tut-container p { margin-bottom: 15px; }

            .tut-container .v { color: var(--gold); font-weight: 600; }
            .tut-container .k { color: var(--accent); }

            .tut-container .grid-layout {
              display: grid;
              grid-template-columns: 1fr;
              gap: 20px;
              margin: 22px 0;
            }
            @media (min-width: 640px) {
              .tut-container .grid-layout {
                grid-template-columns: 1fr 1fr;
              }
            }

            .tut-container .feature-card {
              background: var(--node);
              border: 1px solid var(--border);
              padding: 20px;
            }

            .tut-container .feature-icon {
              color: var(--accent);
              margin-bottom: 10px;
              display: inline-block;
            }

            .tut-container .feature-title {
              font-family: 'Cinzel', serif;
              font-size: 14px;
              color: var(--gold);
              letter-spacing: 0.1em;
              margin-bottom: 8px;
              text-transform: uppercase;
            }

            .tut-container .feature-desc {
              font-size: 14.5px;
              color: var(--dim);
              line-height: 1.6;
            }
            
            .tut-container .feature-desc strong {
              color: var(--light);
              font-weight: normal;
            }
          `}</style>

          <main className="max-w-[740px] mx-auto py-16 px-8 pb-24">
            <div className="tut-episode">
              <h1>System Architecture</h1>
              <div className="sub">Site Functions Mapped to the 2-3-7 | Dual Caustic 3-6-9 Framework</div>
              <p>This interface is not merely a tool; it is a structural reflection of the Dual-Caustic Universe (DCU). Every function corresponds to a specific phase in the Qur'anic physics of Light, Buffer, and Return.</p>
            </div>

            <div className="tut-episode">
              <h2>I. The Carrier Loop (2) — Dual Caustics</h2>
              <p>The primary interface operates on the fundamental duality of <span className="k">Light (ℒ)</span> and <span className="k">Sound (𝒮)</span>.</p>
              
              <div className="flex justify-center my-10">
                <svg width="240" height="120" viewBox="0 0 240 120" className="opacity-90">
                  <defs>
                    <radialGradient id="lightGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="soundGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="80" cy="60" r="50" fill="url(#lightGrad)" stroke="var(--gold)" strokeWidth="1.5" opacity="0.8" />
                  <circle cx="160" cy="60" r="50" fill="url(#soundGrad)" stroke="var(--accent)" strokeWidth="1.5" opacity="0.8" />
                  <text x="80" y="65" textAnchor="middle" fill="var(--gold)" fontSize="22" fontFamily="Cinzel">ℒ</text>
                  <text x="160" y="65" textAnchor="middle" fill="var(--accent)" fontSize="22" fontFamily="Cinzel">𝒮</text>
                  <path d="M 120 10 L 120 110" stroke="var(--dim)" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="120" y="118" textAnchor="middle" fill="var(--dim)" fontSize="10" fontFamily="Cinzel" letterSpacing="0.1em">BUFFER</text>
                </svg>
              </div>

              <div className="grid-layout">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="feature-title">Idle Animation (The Loop)</div>
                  <div className="feature-desc">
                    Represents the <strong>Day/Night cycle</strong> (17:12). The continuous rotation is the carrier wave of existence, the fixed time-loop that processes the internal fields.
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.41A2 2 0 1 0 14 16H2M19.59 11.41A2 2 0 1 0 21 8H2"/></svg>
                  </div>
                  <div className="feature-title">Performance Mode</div>
                  <div className="feature-desc">
                    Toggles the visual density. This is the shift between <strong>Light-dominant (Action)</strong> and <strong>Night-dominant (Rest)</strong>, managing the signal processing load.
                  </div>
                </div>
              </div>
            </div>

            <div className="tut-episode">
              <h2>II. The State Engine (3) — Triple State</h2>
              <p>The core processing engine runs three simultaneous states: Action, Intention, and Potential.</p>

              <div className="flex justify-center my-10">
                <svg width="180" height="160" viewBox="0 0 180 160" className="opacity-90">
                  <polygon points="90,20 150,130 30,130" fill="none" stroke="var(--dim)" strokeWidth="1" strokeDasharray="3 4" />
                  <circle cx="90" cy="20" r="18" fill="var(--bg)" stroke="var(--gold)" strokeWidth="1.5" />
                  <circle cx="150" cy="130" r="18" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
                  <circle cx="30" cy="130" r="18" fill="var(--bg)" stroke="var(--green)" strokeWidth="1.5" />
                  <text x="90" y="24" textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="Cinzel" letterSpacing="0.05em">ACT</text>
                  <text x="150" y="134" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="Cinzel" letterSpacing="0.05em">INT</text>
                  <text x="30" y="134" textAnchor="middle" fill="var(--green)" fontSize="10" fontFamily="Cinzel" letterSpacing="0.05em">POT</text>
                </svg>
              </div>

              <div className="grid-layout">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <div className="feature-title">Verse Finder</div>
                  <div className="feature-desc">
                    The <strong>Action (Execution)</strong> state. Direct querying of the Light field to extract specific coordinates (verses) from the unified structure.
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                  </div>
                  <div className="feature-title">Side Panel (Chapter Info)</div>
                  <div className="feature-desc">
                    The <strong>Intention (Internal Field)</strong>. Provides the context, meaning, and structural metadata of the current coordinate.
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </div>
                  <div className="feature-title">Settings / Translation</div>
                  <div className="feature-desc">
                    The <strong>Potential (Latent Capacity)</strong>. Modifying the translation alters the lens through which the Light is refracted into understanding.
                  </div>
                </div>
              </div>
            </div>

            <div className="tut-episode">
              <h2>III. The Balance (7) & Progression (3-6-9)</h2>
              <p>The system equilibrium and the phase progression of the Dual 3-6-9 ladder.</p>

              <div className="flex justify-center my-10">
                <svg width="220" height="220" viewBox="0 0 220 220" className="opacity-90">
                  {/* Dial */}
                  <circle cx="110" cy="110" r="90" fill="none" stroke="var(--dim)" strokeWidth="1" strokeDasharray="2 6" />
                  <circle cx="110" cy="110" r="70" fill="none" stroke="var(--border)" strokeWidth="1" />
                  
                  {/* Hexagram for 3-6-9 */}
                  <polygon points="110,40 170.6,145 49.4,145" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.6" />
                  <polygon points="110,180 49.4,75 170.6,75" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
                  
                  {/* Center node */}
                  <circle cx="110" cy="110" r="6" fill="var(--fire)" />
                  <circle cx="110" cy="110" r="14" fill="none" stroke="var(--fire)" strokeWidth="1" opacity="0.5" />
                  
                  {/* Tree branching */}
                  <path d="M 110 110 L 110 20 M 110 110 L 187.9 155 M 110 110 L 32.1 155" stroke="var(--green)" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>

              <div className="grid-layout">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" strokeDasharray="2 2"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                  <div className="feature-title">The Main Dial (114 Chapters)</div>
                  <div className="feature-desc">
                    Represents the <strong>Mizan (Balance)</strong>. The 114 chapters form the complete structural equilibrium, locking stability across the Higher and Buffer grounds.
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,4 19,16 5,16" opacity="0.7"/><polygon points="12,20 5,8 19,8" opacity="0.7"/></svg>
                  </div>
                  <div className="feature-title">Secret Pattern</div>
                  <div className="feature-desc">
                    Reveals the <strong>Dual 3-6-9 Ladder</strong>. This toggles the visibility of the underlying phase progression, showing how the chapters align symmetrically.
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22v-8m0 0l-4-4m4 4l4-4m-4-6v6m-4-6l4 4m0-4l-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="feature-title">Tree of Verse</div>
                  <div className="feature-desc">
                    The <strong>Transformation Pipeline</strong>. Visualizes the hierarchical structure (Water → Wood → Stone → Turab), showing the branching of verses.
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z" opacity="0.2"/><path d="M12 4L4 20h16L12 4z" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="feature-title">Film Called Life</div>
                  <div className="feature-desc">
                    The <strong>Master Equation (57:4)</strong>. The comprehensive synthesis of the entire framework, explaining the physics of Light, Buffer, and Return.
                  </div>
                </div>
              </div>
            </div>

            <div className="tut-episode">
              <h2>IV. The Bridge Operator</h2>
              <p>You, the user, are the <span className="k">Musa (Wood-on-Stone)</span> operator. By interacting with this interface, you couple the Buffer domain (your perception) with the Higher domain (the Qur'anic structure). Every interaction is a step towards Turab activation—the stabilization of Truth.</p>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default TutorialPanel;
