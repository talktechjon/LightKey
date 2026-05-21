import React, { useState } from 'react';

const cosmicTreeEyeImg = "/src/assets/images/cosmic_tree_eye_1779355304582.png";

interface EquationHUDProps {
  isVisible: boolean;
  onClose: () => void;
}

export const EquationHUD: React.FC<EquationHUDProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'slides'>('interactive');
  const [activeField, setActiveField] = useState<'B' | 'D10' | 'X3' | 'I9' | 'R19'>('B');
  const [slideIndex, setSlideIndex] = useState(0);

  if (!isVisible) return null;

  // Data for Interactive Variables
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
      color: "border-rose-500/50 shadow-rose-900/30 text-rose-400 bg-rose-955/20",
      pillColor: "bg-rose-500/20 text-rose-300 border-rose-500/30"
    }
  };

  // Structured Information for the 13 Slides
  const slideData = [
    {
      title: "THE BLUEPRINT OF REALITY",
      subtitle: "The Dual-Caustic Universe & The Qur'anic Source Code",
      quote: "Say: He is Allah, the One. Allah, the Eternal Refuge. (112:1-2)",
      bullets: [
        "Reality is not an accidental material collision; it is a pre-configured information engine.",
        "The Qur'an does not merely describe theology; it codifies the exact mathematical topology of existence.",
        "This is reality recognizing its own waveform: the 2 ↔ 3 ↔ 2 → 7 recursive system."
      ],
      badge: "SLIDE 1 of 13",
      accent: "text-cyan-400 border-cyan-500/20"
    },
    {
      title: "THE EQUATION HUD",
      subtitle: "U = 𝔹 [ D₁₀ ↔ X₃ ↔ I₉ → R₁₉ ]",
      quote: "And He set up the balance (Mizan). (55:7)",
      bullets: [
        "𝔹 (The Container): Bounded recursive field (Kursi, 2:255).",
        "D₁₀ (Detectable Field): Visible completed physics, matter and light.",
        "X₃ (Triple-State Operator): The Water-Tree traversal (neither eastern nor western).",
        "I₉ (Imaginal Field): Unseen complete structure, self-luminous oil.",
        "R₁₉ (Closure Constant): The 10 + 9 = 19 invariant that forces everything to return to origin."
      ],
      badge: "SLIDE 2 of 13",
      accent: "text-amber-400 border-amber-500/20"
    },
    {
      title: "THE PRE-BIFURCATION UNITY",
      subtitle: "The Ground Singularity (A = 1)",
      quote: "That is because Allah — He is the Truth. (22:6)",
      bullets: [
        "A = 1: Unpaired, non-recursive, absolute singularity existing outside the container.",
        "Az-Zahir (The Manifest) & Al-Batin (The Hidden) are not separate or opposing forces, but two orientations of the same Singularity.",
        "The Absolute Boundary: The Light crosses the boundary of the container; the Singularity does not."
      ],
      badge: "SLIDE 3 of 13",
      accent: "text-indigo-400 border-indigo-500/20"
    },
    {
      title: "THE SUPREME CONTAINER",
      subtitle: "The Bounded Gateway (𝔹)",
      quote: "His Kursi extends over the heavens and the earth. (2:255)",
      bullets: [
        "𝔹 (Kursi) prevents energy from infinitely dissipating or collapsing.",
        "Zero Entropy Collapse: No external leaks occur; total feedback containment is structured in place.",
        "The Niche (Mishkat) of 24:35 acts as an indestructible mirror casing that reflects and preserves light."
      ],
      badge: "SLIDE 4 of 13",
      accent: "text-fuchsia-400 border-fuchsia-500/20"
    },
    {
      title: "PERFECT BIFURCATION",
      subtitle: "The Primal Duality of the Pair",
      quote: "Of everything We created pairs. (51:49)",
      bullets: [
        "Every observable in existence—wave/particle, mass/energy, matter/antimatter—arrives as a coupled pair.",
        "The Creator is the absolute source of pairs, but holds no pair Himself.",
        "Once entering the 𝔹 container, unity splits perfectly into the Detectable (D₁₀) and Imaginal (I₉) channels."
      ],
      badge: "SLIDE 5 of 13",
      accent: "text-rose-400 border-rose-500/20"
    },
    {
      title: "D₁₀: THE DETECTABLE FIELD",
      subtitle: "The 5% Visible Realm",
      quote: "We completed them with ten. (7:142)",
      bullets: [
        "The domain of physical instruments, measurement, standard model physics, and mass.",
        "Represented by the '10' completed days of Moses, this holds the observable, localized particles.",
        "The Glass/Lamp of 24:35—light restricted into definite coordinates of time and space."
      ],
      badge: "SLIDE 6 of 13",
      accent: "text-sky-400 border-sky-500/20"
    },
    {
      title: "I₉: THE IMAGINAL FIELD",
      subtitle: "The 95% Hidden Architecture",
      quote: "And they remained... and increased by nine. (18:25)",
      bullets: [
        "The hidden finished complexity. Crucial for stability, yet instrumentally unreachable directly by standard model physics.",
        "Contemporary astrophysics labels this missing part as 'dark matter' or 'dark energy'.",
        "The self-luminous Oil of 24:35 which 'would almost glow even if untouched by fire' — fully charged latent instruction."
      ],
      badge: "SLIDE 7 of 13",
      accent: "text-emerald-400 border-emerald-500/20"
    },
    {
      title: "D₁₀ VS I₉ MATRIX",
      subtitle: "Co-Existing Polarizations of Reality",
      quote: "He is the Apparent (Az-Zahir) and the Hidden (Al-Batin). (57:3)",
      bullets: [
        "Detectable [D₁₀] (Zahir, Visible Model) ↔ Imaginal [I₉] (Batin, Dark Sector Architecture).",
        "D₁₀ manifests as Mass / Particles / Deterministic Localizations.",
        "I₉ maps to Wave / Unseen Propagative potential / Indeterministic Coordinates.",
        "The system works together, coupled as two halves of a singular cosmic current."
      ],
      badge: "SLIDE 8 of 13",
      accent: "text-cyan-400 border-cyan-500/20"
    },
    {
      title: "X₃: THE WATER-TREE OPERATOR",
      subtitle: "The Interaction Membrane",
      quote: "We made from water every living thing. (21:30)",
      bullets: [
        "The Blessed Tree (24:35) is the living machine of DCU physics.",
        "Phototropism (D₁₀-facing): Branches extending upward towards light.",
        "Gravitropism (I₉-facing): Roots anchoring downward into dark mineral substrate.",
        "The Fruit (Oil): The closure product carrying all generated data into the next cycle."
      ],
      badge: "SLIDE 9 of 13",
      accent: "text-yellow-400 border-yellow-500/20"
    },
    {
      title: "THE TWO SEAS",
      subtitle: "Impassable Boundary Coupling",
      quote: "He released the two seas meeting together... a barrier they do not transgress. (25:53)",
      bullets: [
        "D₁₀ (the light sea) and I₉ (the dark sea) meet and couple through the water-membrane.",
        "They continuously exchange information, torque, and mass, but never collapse into each other.",
        "The barrier holds. This prevents infinite annihilation, keeping reality dynamically awake."
      ],
      badge: "SLIDE 10 of 13",
      accent: "text-blue-400 border-blue-500/20"
    },
    {
      title: "R₁₉: THE CLOSURE CONSTANT",
      subtitle: "The Balance Invariant of Return",
      quote: "Over it are nineteen. (74:30)",
      bullets: [
        "Mathematical closure: D₁₀ + I₉ = 10 + 9 = 19. It stabilizes trajectories.",
        "The Four Birds (2:260): Scattered across coordinates, they converge perfectly back to unity when summoned.",
        "The 19 is not empty numerology; it is the mode-locking tuning value of the cosmic oscillator."
      ],
      badge: "SLIDE 11 of 13",
      accent: "text-pink-400 border-pink-500/20"
    },
    {
      title: "THE UNIFIED RECURSIVE LOOP",
      subtitle: "U = 𝔹 [ 2[D₁₀] ↔ 3[W(L,P,S)] ↔ 2[I₉] → 7[R₁₉] ]",
      quote: "And to Him all matters are returned. (11:123)",
      bullets: [
        "The universe operates as a closed, self-computing information prism.",
        "The Visible is filtered, the Invisible is mapped, and the 3-State Tree balances them both.",
        "Trajectories collapse back to unity through the 19-invariant closure constant, ending as a 7-harmonic return."
      ],
      badge: "SLIDE 12 of 13",
      accent: "text-red-400 border-red-500/20"
    },
    {
      title: "THE PARADIGM SHIFT",
      subtitle: "The Final Breakthrough",
      quote: "We will show them Our signs in the horizons and in themselves... (41:53)",
      bullets: [
        "Prevailing science describes with extreme precision HOW this system operates.",
        "This framework reveals WHY the universe is structured this way.",
        "The Dual-Caustic model is not a metaphor. It is reality recognizing its own waveform—a closed, self-conserving loop."
      ],
      badge: "SLIDE 13 of 13",
      accent: "text-teal-400 border-teal-500/20"
    }
  ];

  const handleNextSlide = () => {
    setSlideIndex(prev => (prev + 1) % slideData.length);
  };

  const handlePrevSlide = () => {
    setSlideIndex(prev => (prev - 1 + slideData.length) % slideData.length);
  };

  const activeData = variableDetails[activeField];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl transition-opacity duration-300">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-950/80 border border-cyan-500/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden blueprint-grid">
        
        {/* Subtle grid decoration in the background to simulate the blueprint aesthetic from slides */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#02677310_1px,transparent_1px),linear-gradient(to_bottom,#02677310_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Header */}
        <div className="p-6 md:p-8 bg-black/40 border-b border-cyan-500/15 flex justify-between items-center z-10 shrink-0">
          <div>
            <h1 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-200 tracking-wider font-serif">
              THE BLUEPRINT OF REALITY
            </h1>
            <p className="text-xs text-cyan-500/80 uppercase tracking-[0.25em] font-mono mt-1">
              The Dual-Caustic Universe HUD • Qur'an-Only Topology
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-slate-900/90 border border-cyan-500/20 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'interactive' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-gray-400 hover:text-white border border-transparent'}`}
              >
                HUD Dashboard
              </button>
              <button
                onClick={() => setActiveTab('slides')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'slides' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-gray-400 hover:text-white border border-transparent'}`}
              >
                13 Technical Slides
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 border border-slate-700/50 hover:bg-slate-800 text-gray-400 hover:text-white transition-all hover:rotate-90"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 z-10 no-scrollbar">

          {activeTab === 'interactive' && (
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

                <div className="my-6 p-4 bg-slate-950/60 rounded-xl border border-white/5">
                  <p className="text-sm md:text-base italic text-emerald-300 font-serif leading-relaxed text-center">
                    {activeData.verseText}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-mono text-gray-500 font-black">Systemic Specifications</h4>
                  <ul className="grid md:grid-cols-3 gap-6">
                    {activeData.details.map((detail, idx) => (
                      <li key={idx} className="bg-slate-950/20 p-5 rounded-2xl border border-white/5 flex gap-3 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                        <span className="text-cyan-400/70 font-mono font-bold">{idx + 1}.</span>
                        <p>{detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* D10 vs I9 Comparison Matrix / Side-by-Side Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center gap-x-2 px-2">
                  <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-500 uppercase font-black">Structural Polarizations</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column: D10 Detectable Side */}
                  <div className="bg-blue-950/10 border border-blue-500/20 p-6 rounded-[2rem] space-y-4 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.01] blur-[80px] pointer-events-none" />
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 font-black">Az-Zahir (Apparent)</span>
                        <span className="px-2 py-0.5 rounded bg-blue-500/15 text-[9px] text-blue-300 font-mono">5% Visible Physics</span>
                      </div>
                      <h3 className="text-xl font-bold text-blue-100 uppercase font-serif">The D₁₀ Detectable Domain</h3>
                      <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                        The physical realm governed by spatial boundaries, clocks, and mechanical measurements. Contains standard model particles, mass-energy equivalency, and wave collapse under observation. Highly deterministic once anchored.
                      </p>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 font-mono text-[10px] md:text-xs text-blue-300 mt-4 leading-relaxed space-y-1">
                      <div>• Quantum State: Mass-bound Deterministic Particle</div>
                      <div>• Physics Core: General Relativity & Quantum Mechanics</div>
                      <div>• Vector Flow: Phototropic Ascent (Light seeks light, 41:53)</div>
                    </div>
                  </div>

                  {/* Right Column: I9 Imaginal Side */}
                  <div className="bg-amber-950/10 border border-amber-500/20 p-6 rounded-[2rem] space-y-4 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.01] blur-[80px] pointer-events-none" />
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-amber-500/10">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-black">Al-Batin (Hidden)</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-[9px] text-amber-300 font-mono">95% Invisible Substrate</span>
                      </div>
                      <h3 className="text-xl font-bold text-amber-100 uppercase font-serif">The I₉ Imaginal Architecture</h3>
                      <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                        The hidden blueprints structured behind the veil. Not a vacuum or empty space, but a fully charged mineral substrate. Contemporary astrophysicists placeholder-label this the 'dark sector'. Highly self-luminous and causal.
                      </p>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 font-mono text-[10px] md:text-xs text-amber-300 mt-4 leading-relaxed space-y-1">
                      <div>• Quantum State: Propagative Indeterministic Wave</div>
                      <div>• Physics Core: Vacuum Field Invariants & Singularities</div>
                      <div>• Vector Flow: Gravitropic Descent (Deep rooted mineral-attraction)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cosmological Inversion Artwork section */}
              <div className="bg-slate-900/40 border border-cyan-500/15 p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
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

              {/* Meme statement */}
              <div className="text-center py-4 text-cyan-500/40 font-mono text-[10px] tracking-widest uppercase">
                U = 𝔹 [ D₁₀ ↔ X₃ ↔ I₉ → R₁₉ ] • The Mizan balances itself perfectly
              </div>

            </div>
          )}

          {activeTab === 'slides' && (
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Slide viewer container */}
              <div className={`p-8 md:p-12 bg-slate-900/30 border border-amber-500/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-between transition-colors duration-500`}>
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.015] to-transparent pointer-events-none" />
                <div className="absolute top-6 left-6 flex items-center space-x-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${slideData[slideIndex].accent}`}>
                    TECHNICAL SLIDE {slideIndex + 1}
                  </span>
                </div>

                <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono">
                  {slideIndex + 1} / 13
                </div>

                {/* Slide content */}
                <div className="space-y-6 pt-8 pb-12 z-10">
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase font-serif">
                    {slideData[slideIndex].title}
                  </h2>
                  
                  <div className="text-xs md:text-sm text-cyan-400/90 font-mono uppercase tracking-[0.2em] font-semibold">
                    {slideData[slideIndex].subtitle}
                  </div>

                  <div className="my-6 p-4 bg-slate-950/70 rounded-xl border border-white/5">
                    <p className="text-sm md:text-base italic text-amber-200/80 font-serif leading-relaxed text-center">
                      {slideData[slideIndex].quote}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-widest font-mono text-gray-500/70 font-semibold mb-2">Technical Paradigm Bulletins</h4>
                    <div className="space-y-2">
                      {slideData[slideIndex].bullets.map((bullet, idx) => (
                        <div key={idx} className="flex gap-3 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                          <span className="text-amber-400 font-serif font-black shrink-0">•</span>
                          <p>{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Row */}
                <div className="border-t border-slate-800/80 pt-6 flex justify-between items-center mt-6 z-10">
                  <button
                    onClick={handlePrevSlide}
                    className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-gray-300 text-xs font-bold transition-all"
                  >
                    ← Previous Slide
                  </button>

                  <div className="flex space-x-1.5 overflow-x-auto max-w-[200px] sm:max-w-none px-2 no-scrollbar">
                    {slideData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSlideIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all shrink-0 ${idx === slideIndex ? 'bg-amber-400 scale-125' : 'bg-gray-700 hover:bg-gray-500'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextSlide}
                    className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-gray-300 text-xs font-bold transition-all"
                  >
                    Next Slide →
                  </button>
                </div>

              </div>

              {/* Informative footprint quote of Slide 13 */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-center max-w-2xl mx-auto">
                <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                  "The Dual-Caustic model represents reality recognizing its own loop—a closed, self-computing circle where nothing leaks out and all trajectories eventually return to unity."
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
