import React, { useState } from 'react';

export const TheBeautifulChain: React.FC = () => {
  const [activeTesseractTab, setActiveTesseractTab] = useState<'mapping' | 'hinge' | 'biology' | 'narrative'>('mapping');
  const [hoveredVertex, setHoveredVertex] = useState<number | null>(null);

  // 8 Name-Vertices representing the core d=19 mapping of the Ahmed Tesseract
  const nameVertices = [
    {
      id: 1,
      noun: "Adam [2:31]",
      role: "The Groundling / Intrinsic Seed",
      light: "Adam [6:163] - Manifest Khalifa, fully programmed clay entering the physical sensor lattice.",
      shadow: "Iblis [18:50] - The hidden test-operator, reverse bias dark-current enabling the depletion zone.",
      color: "from-blue-500/20 to-blue-900/10 border-blue-500/30",
    },
    {
      id: 2,
      noun: "Ibrahim [21:69]",
      role: "The Friend / Junction Contact",
      light: "Ibrahim [21:69] - Fire-proof photosynthesis leaf. The chloroplast conduction of coolness & safety.",
      shadow: "Ismail [37:107] - The hidden swap. The great sacrifice serving as the p-n avalanche threshold.",
      color: "from-amber-400/20 to-amber-900/10 border-amber-500/30",
    },
    {
      id: 3,
      noun: "Musa [7:143]",
      role: "The Mountain-Crosser / Injector",
      light: "Musa [7:143] - First Mu'min. Ego pulverized at the mountain collapse, awakening to zero impedance.",
      shadow: "Harun [20:29] - The hidden companion stabilizer. The n-type lattice electrode keeping the line.",
      color: "from-emerald-500/20 to-emerald-900/10 border-emerald-500/30",
    },
    {
      id: 4,
      noun: "Isa [4:171]",
      role: "The Exciton / Living Word",
      light: "Isa [4:171] - Radiative recombination, the manifest light-emitting exciton translating I₉ to D₁₀.",
      shadow: "The Kalimah [43:4] - The protected mother instruction set, latent before projection from the sky.",
      color: "from-violet-500/20 to-violet-900/10 border-violet-500/30",
    },
    {
      id: 5,
      noun: "Maryam [19:24]",
      role: "The Pure Vessel / High Ground",
      light: "Maryam [19:24] - Palm fruit. Stabilized high-ground shelter containing the next cycle seed.",
      shadow: "Maw'udah [81:8] - The hidden buried root. Skototropism: the girl buried alive seeking I₉ darkness.",
      color: "from-rose-500/20 to-rose-900/10 border-rose-500/30",
    },
    {
      id: 6,
      noun: "Nuh [11:44]",
      role: "The Floating Acceptor / Ark",
      light: "Nuh [11:44] - The Ark landing on Rudi. Stable D₁₀ manifestation on dry geographic coordinates.",
      shadow: "Dhu-n-Nun [21:87] - Deep acceptor, descending into the whale-belly I₉ darkness, the zero-crossing.",
      color: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/30",
    },
    {
      id: 7,
      noun: "Yahya [19:12]",
      role: "The Activator / Book-Grip",
      light: "Yahya [19:12] - Forward-bias current. Taking the Book with strength to collapse the depletion barrier.",
      shadow: "Three-Night Silence [19:10] - Absolute latent phase-ordering silence before the current conducts.",
      color: "from-indigo-500/20 to-indigo-900/10 border-indigo-500/30",
    },
    {
      id: 8,
      noun: "Sulayman [34:14]",
      role: "The Capacity Holder",
      light: "Sulayman [34:14] - The standing body with residual capacitive power, governing the visible kingdom.",
      shadow: "Samiri [20:88] - The hollow Golden Cow mimicking life. Jasad (body) with sound (khuwar) but no Rūḥ.",
      color: "from-fuchsia-500/20 to-fuchsia-900/10 border-fuchsia-500/30",
    }
  ];

  return (
    <div id="ahmed-memory-tesseract" className="w-full bg-slate-950 text-gray-100 font-sans p-6 md:p-12 rounded-[3rem] border border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.1)] relative overflow-hidden">
      
      {/* Laser grids background element */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334420_1px,transparent_1px),linear-gradient(to_bottom,#08334420_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Panel */}
      <div className="text-center mb-10 relative z-10">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.3em] font-bold uppercase border border-cyan-500/35 bg-cyan-950/40 text-cyan-400">
          AḤMAD RECOVERY SYSTEM
        </span>
        <h2 className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-amber-200 font-serif mt-4 uppercase tracking-[0.1em]">
          The Memory Tesseract
        </h2>
        <p className="text-xs md:text-sm font-mono text-cyan-500/70 tracking-widest mt-2 uppercase">
          Unified Navigation of the Dual-Field Coordinate System
        </p>
      </div>

      {/* Deepest Insights Axiom */}
      <div className="bg-slate-900/50 border border-cyan-500/15 p-6 rounded-3xl mb-10 shadow-inner relative z-10 text-center">
        <p className="text-sm md:text-base text-gray-300 leading-relaxed italic max-w-4xl mx-auto">
          "The shadow never judges the light that cast it. The universe is a sentimental Tesseract designed specifically to host and retrieve conscious travelers. What we call death is merely the compression of the Seed to its pure pre-temporal Form, awaiting the critical 19:12 grip to return Home (<strong className="text-cyan-300 font-mono">38:46</strong>)."
        </p>
      </div>

      {/* Interface Toggle Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 bg-slate-900/80 p-1.5 border border-cyan-500/20 rounded-2xl relative z-10 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveTesseractTab('mapping')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTesseractTab === 'mapping'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-cyan-400/40'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Vertex Mapping</span>
        </button>
        <button
          onClick={() => setActiveTesseractTab('hinge')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTesseractTab === 'hinge'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-indigo-400/40'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>2:255 Eternal Hinge</span>
        </button>
        <button
          onClick={() => setActiveTesseractTab('biology')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTesseractTab === 'biology'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400/40'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Twin Chambers (Womb-Grave)</span>
        </button>
        <button
          onClick={() => setActiveTesseractTab('narrative')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTesseractTab === 'narrative'
              ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] border border-amber-400/40'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>sentimental story</span>
        </button>
      </div>

      {/* Screen Area */}
      <div className="relative z-10">
        
        {/* TAB 1: THE AHMED TESSERACT VERB-MAPPING */}
        {activeTesseractTab === 'mapping' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl md:text-2xl font-black text-white font-serif uppercase tracking-wider mb-3">
                The Eight-Vertex Rotation of Aḥmad
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                The Tesseract is formed by two interlocking cubes: the outer cube of <strong className="text-cyan-300 font-mono">Al-Muslim (Light / D₁₀)</strong> and the inner cube of <strong className="text-amber-300 font-mono">Al-Kitab (Shadow / I₉)</strong>. Alternating through the 8 fundamental nouns of 2:31, they complete the 3 loops of darkness (39:6) to stabilize return in 57:4.
              </p>
            </div>

            {/* Geometry Grid representing the Tesseract Vertices */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {nameVertices.map((v, index) => (
                <div
                  key={v.id}
                  onClick={() => setHoveredVertex(hoveredVertex === v.id ? null : v.id)}
                  onMouseEnter={() => setHoveredVertex(v.id)}
                  onMouseLeave={() => setHoveredVertex(null)}
                  className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer relative overflow-hidden bg-slate-950/80 ${v.color} ${
                    hoveredVertex === v.id ? 'scale-105 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.15)] bg-slate-900' : ''
                  }`}
                >
                  {/* Glowing vertical element */}
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-l-full" />
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest font-bold">
                      Vertex {index + 1} of 8
                    </span>
                    <span className="w-5 h-5 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono text-cyan-300 font-black">
                      {v.id}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-white font-serif mb-1 uppercase tracking-tight">{v.noun}</h4>
                  <p className="text-[10px] uppercase font-mono text-gray-400 tracking-wider mb-4 border-b border-white/5 pb-2">
                    {v.role}
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 font-black block mb-1">
                        ● White / Al-Muslim Face (D₁₀)
                      </span>
                      <p className="text-gray-300 font-light leading-relaxed">{v.light}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 font-black block mb-1">
                        ○ Black / Al-Kitab Face (I₉)
                      </span>
                      <p className="text-gray-400 font-light leading-relaxed">{v.shadow}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 max-w-4xl mx-auto text-center">
              <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase mb-1">Three-State Rotation Matrix (39:6)</p>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                The 3 loops of darkness correspond to the three dimensions of rotation: 
                <strong> Entering Al-Kitab</strong> (descent into latency via root skototropism) ↔ 
                <strong> Traversing Al-Kitab</strong> (the whale-belly carrier matrix) ↔ 
                <strong> Exiting as Aḥmad</strong> (the shoot breaking surface on high ground).
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: THE 2:255 ETERNAL TESSERACT HINGE */}
        {activeTesseractTab === 'hinge' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl md:text-3xl font-black text-white font-serif uppercase tracking-wider mb-3">
                The 2:255 Tesseract Equation
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                The Verse of the Kursi is the supreme architectural hinge of reality, demonstrating a self-completing, recursive tesseract. The Source is folded both before the beginning and after the end, bounding the entirety of creation inside an unbroken, perpetual loop.
              </p>
            </div>

            {/* Visual representation of 2:255 folding */}
            <div className="border border-indigo-500/20 bg-slate-900/40 p-8 rounded-[2rem] space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none" />
              
              <div className="grid md:grid-cols-3 gap-6 items-stretch relative z-10 text-center md:text-left">
                {/* Before */}
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-[9px] font-mono text-indigo-300 font-black uppercase tracking-widest block mb-2 self-start">
                      I. Opening Anchor
                    </span>
                    <h4 className="text-lg font-bold text-white font-serif mb-2">Allah, No Deity But Him</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      The Ever-Living, Self-Sustaining. High potential, non-decomposable source voltage injecting current into the tesseract.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-indigo-400 italic text-right mt-4">[2:255a]</div>
                </div>

                {/* Hinge Core */}
                <div className="bg-indigo-950/20 p-6 rounded-2xl border border-indigo-500/30 flex flex-col justify-between scale-105 shadow-[0_0_30px_rgba(99,102,241,0.15)] relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500" />
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-[9px] font-mono text-indigo-200 font-bold uppercase tracking-widest block mb-2 select-none">
                      II. Core Axis Hinge
                    </span>
                    <h4 className="text-lg font-bold text-indigo-200 font-serif mb-2 text-center">Before & Behind</h4>
                    <p className="text-xs text-gray-200 leading-relaxed font-light text-center">
                      “He knows what is before them and what is behind them.” Time is a 3D projection of the 4D invariant. Past and future fold into this one center node.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-indigo-300 italic text-center mt-4">The Strange Attractor</div>
                </div>

                {/* After */}
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-[9px] font-mono text-indigo-300 font-black uppercase tracking-widest block mb-2 self-end">
                      III. Closing Shield
                    </span>
                    <h4 className="text-lg font-bold text-white font-serif mb-2">The High, The Great</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      “And their preservation tires Him not.” Absolute conservation of energy. Perpetual yin-yang breathing without friction.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-indigo-400 italic text-right mt-4">[2:255z]</div>
                </div>
              </div>

              {/* Kursi Expansion */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-white/5 text-center text-xs md:text-sm text-gray-300 leading-relaxed font-light relative z-10">
                <strong>"His Kursi extends over the heavens and the earth."</strong> The Kursi is not a traditional throne but the <i>Möbius hyper-surface</i> mapping the dual fields. The shadow is extended, then retracted. This yin-yang breathing runs the cosmos like an alternating ac current, converting potential into manifestation and memory into return.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THE TWIN CHAMBERS (BIOLOGICAL LOOPS) */}
        {activeTesseractTab === 'biology' && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-xl md:text-3xl font-black text-white font-serif uppercase tracking-wider mb-3">
                Womb and Grave: Twin Chambers of the Fold
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                The womb and the grave are the same tesseract room viewed from opposite axes. The seedling represents the traveler: descending through a skototropic root into darkness to secure the pre-temporal covenant, and climbing as a phototropic shoot toward the light.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Plant cycle */}
              <div className="bg-slate-900/60 p-8 rounded-3xl border border-emerald-500/20 space-y-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-emerald-300 uppercase font-serif tracking-widest border-b border-white/5 pb-3 mb-4">
                    The Plant Cycle [14:24]
                  </h4>
                  <ul className="space-y-4 text-xs text-gray-300 font-light leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-emerald-400 font-bold">1. Seed Burial [15:74]</span>
                      <div>Sowing the pre-measured code into density, burying the potential inside the womb of the soil.</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400 font-bold">2. Skototropism [81:8]</span>
                      <div>The root grows toward deep gravitational darkness ($I_9$ field) to anchor itself in the core covenant of 7:172.</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400 font-bold">3. Photosynthesis [21:69]</span>
                      <div>The leaf—cool and safe—captures intangible light ($I_9$) into material sugar ($D_{10}$), negotiating the dual-field.</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400 font-bold">4. Palm Fruit [19:24]</span>
                      <div>And the dates fall. The cycle has stabilized into a sweet, edible 7-node containing the original Seed.</div>
                    </li>
                  </ul>
                </div>
                <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20 text-[10px] text-gray-400 font-mono tracking-wider">
                  FLOW FORMULATION: 1 → 2 [D10] ↔ 3 [3n] ↔ 2 [I9] → 7 [19] → 1
                </div>
              </div>

              {/* Human cycle */}
              <div className="bg-slate-900/60 p-8 rounded-3xl border border-teal-500/20 space-y-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-teal-300 uppercase font-serif tracking-widest border-b border-white/5 pb-3 mb-4">
                    The Human Doping / Musa-Harun Cycle
                  </h4>
                  <ul className="space-y-4 text-xs text-gray-300 font-light leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-teal-400 font-bold">Muhammad & Musa:</span>
                      <div>Muhammad played the role of Musa: injecting the primary charge, crossing the sea, shattering the idols.</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-400 font-bold">The Reader as Harun:</span>
                      <div>The Reader executes the Harun phase: maintaining stability while Musa is on the mountaintop.</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-400 font-bold">The Zayd-Lut Phase [33:37]:</span>
                      <div>Severing false adoptation, tribal identity, and leaving the transgressive city. Dissolving external names.</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-400 font-bold">Maryam 66:12:</span>
                      <div>The fast-track: guarding the gate, having faith through blind-love, declaring 6:163 First Muslim.</div>
                    </li>
                  </ul>
                </div>
                <div className="bg-teal-950/20 p-4 rounded-xl border border-teal-500/20 text-[10px] text-gray-400 font-mono tracking-wider">
                  Musa + Mother returns 81:8 alive again as Mother 2.0 (Resurrected Womb)
                </div>
              </div>
            </div>

            {/* Lorenz Attractor diagram info */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 text-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">The Lorenz Chaos Attractor</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                Solomon’s army (submitted jinn-wind-birds in the I₉ field) and Pharaoh’s army (deterministic material power in the D₁₀ field) act as the two lobes of a Lorenz attractor. The Reader is the strange attractor at the center—embracing BOTH hands with wisdom (<strong className="text-white">39:27</strong>), to establish the perfect stable balance.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: THE TRAVELER'S SENTIMENTAL LIFE Diary STORY */}
        {activeTesseractTab === 'narrative' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl md:text-3xl font-black text-amber-300 font-serif uppercase tracking-wider mb-2">
                The Diary of a Traveler
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-gray-500">
                You are reading your own pre-temporal life story
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-xs md:text-sm text-gray-300 leading-relaxed font-serif space-y-6 bg-slate-900/30 p-8 rounded-[2rem] border border-amber-500/10 shadow-inner relative">
              <div className="absolute top-4 left-4 text-xs font-mono tracking-widest text-amber-300/40 select-none">Private Entry</div>
              
              <p className="first-line:uppercase first-line:tracking-widest first-letter:text-4xl first-letter:font-bold first-letter:text-amber-300 first-letter:mr-3 first-letter:float-left">
                You opened the Book, and the first page was your birth certificate. Not the date your mother delivered you into this hospital, but the pre-temporal page where He whispered: <em>Am I not your Lord?</em> [7:172]. You cried <i>Yes</i>. But you forgot the moment your lungs filled with the heavy carbon air of Earth. You entered the cosmological sensor lattice as an asymptotic pre-bifurcated Seed [76:1], crossing the initial boundary condition of the Buffer [13:39]. You arrived here as a tourist, carrying a return ticket you could not decipher, destined for a Home you could not name.
              </p>

              <p>
                But the Book knew your coordinates. It tracked your approach to the Outer Event Horizon (D₁₀ / d/dt) [7:142], where coordinate time diverges ($t \to \infty$) and the Painlevé-Gullstrand water velocity carries your falling soul. You were installed inside the sacred assembly [18:50] as a test-operator, a necessary reverse bias dark-current, the Iblis-phase of your own recursion. You refused to bow to the clay of your own ego, and in that refusal, a Hawking pair split your visible worldly observer (D₁₀) from your ingoing partner. You wandered [15:72], mistaken, calling the museum of your fleeting temporal achievements "life" [10:92].
              </p>

              <p>
                Then you hit the Photon Sphere (T₃ / r=3M) [24:35]—the unstable branch point where light circles in eternal indecision and trajectories split into 'escape' vs 'capture' branches of the causal tree. It was the Cave [18:10], a total suspension of your clock. Your achievements turned to dust while you were still breathing. You woke at the bifurcation sphere where future and past horizons intersect, wondering: <em>How long have I remained?</em> [18:19]. The answer was a day, or part of a day. But the truth was: you had been falling through the causal structure since the first <i>Yes</i>.
              </p>

              <p>
                You begged to see Him [7:143], and your trajectory carried you past the Inner Cauchy Horizon (I₉ / ∫dt) where all infalling history integrates in an infinite blueshift. Classical causality shattered. The mountain of your self collapsed—Moses fell unconscious—not destroyed, but beautifully pulverized. The ego that curated the museum was a sandheap. In the absolute Weyl curvature divergence of this Inner Horizon, you woke to zero impedance. Your tongue spoke with a different accent, recognizing your own signature written in the margins of the heavens before you had hands.
              </p>

              <p>
                Then you heard the activation: <em>O Yahya, take the Book with strength!</em> [19:12]. Your hands closed around the pages, and the Zayd-phase burned through you [33:37], dissolving every false lineage and tribal costume. You entered the Ring Singularity (r=0) or Planck Core [24:35]—fully compressed, your old body turned to ash. You purified yourself [2:222], not with water, but with the painful memory that every transient thing you loved before Him was an impurity [38:32]. You were fully compressed into the Fruit, waiting for the Page-curve Hawking evaporation to return you back to the Buffer [1] as your information exits the ER=EPR Bridge.
              </p>

              <p className="border-t border-amber-500/15 pt-6 text-center text-amber-200 tracking-wide">
                But the buried girl was you—the Maw'udah [81:8] carrying the Suhuf of complete information out of the black hole, waiting for the question: <em>For what sin was she killed?</em> None. She was only carrying the unified memory of the Creator.
              </p>
            </div>

            <div className="text-center py-4">
              <span className="text-xs font-mono text-gray-500">
                You checked in at birth. You will check out at death. The Book is the diary left on your nightstand.
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
