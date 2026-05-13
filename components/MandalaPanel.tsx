import React from 'react';

interface MandalaPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const MandalaPanel: React.FC<MandalaPanelProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl h-[85vh] bg-black border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 p-4 border-b border-gray-800 bg-gray-950">
          <h2 className="text-cyan-400 font-mono tracking-widest text-[10px] sm:text-xs leading-relaxed text-center sm:text-left flex-1 break-words uppercase">The 2↔3↔2→7 Mandala: A Coherence Topology</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white px-4 py-1.5 rounded-md border border-gray-700 hover:border-gray-500 transition-colors text-sm font-medium whitespace-nowrap">Close</button>
        </div>
        <div className="flex-1 overflow-hidden bg-black">
            <iframe 
                srcDoc={fullHtmlContent}
                className="w-full h-full border-0"
                title="The 2↔3↔2→7 Mandala Content"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onLoad={(e) => {
                    const style = document.createElement('style');
                    style.innerHTML = '::-webkit-scrollbar { display: none; }';
                    e.currentTarget.contentDocument?.head.appendChild(style);
                }}
            />
        </div>
      </div>
    </div>
  );
};

const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>The Growth of Time — DCU Mandala</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet"/>
<style>
  :root {
    --bg: #03050a;
    --panel: rgba(8,12,24,0.9);
    --border: rgba(74, 240, 224, 0.15);
    --gold: #d4a843;
    --aqua: #4af0e0;
    --crimson: #e04060;
    --pearl: #e8e4d8;
    --muted: rgba(200,210,230,0.5);
    --dim: rgba(200,210,230,0.2);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--pearl);
    font-family: 'Crimson Pro', Georgia, serif;
    min-height: 100vh;
    overflow-x: hidden;
    line-height: 1.6;
  }
  
  header {
    text-align: center;
    padding: 4rem 1rem 3rem;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(to bottom, rgba(74, 240, 224, 0.05), transparent);
  }
  header h1 {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.4rem, 5vw, 2.8rem);
    color: var(--gold);
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 30px rgba(212, 168, 67, 0.2);
  }
  header p {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--aqua);
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .abstract-card {
    background: rgba(74, 240, 224, 0.03);
    border: 1px solid var(--border);
    padding: 2.5rem;
    border-radius: 12px;
    margin-bottom: 4rem;
    line-height: 1.8;
  }
  .abstract-card h3 {
    font-family: 'JetBrains Mono';
    font-size: 0.8rem;
    color: var(--aqua);
    text-transform: uppercase;
    letter-spacing: 0.3em;
    margin-bottom: 1rem;
    text-align: center;
  }

  h2 {
    font-family: 'Cinzel Decorative';
    color: var(--gold);
    font-size: 1.8rem;
    margin: 4rem 0 2rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 span { font-size: 0.7rem; font-family: 'JetBrains Mono'; color: var(--dim); letter-spacing: 0.2em; }

  /* Operator Box */
  .operator-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .op-card {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s ease;
  }
  .op-card:hover { border-color: var(--aqua); background: rgba(74, 240, 224, 0.05); }
  .op-sym { font-family: 'JetBrains Mono'; font-size: 2.2rem; color: var(--aqua); margin-bottom: 0.5rem; }
  .op-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--gold); margin-bottom: 0.75rem; }

  /* Table Styles */
  .dcu-table {
    width: 100%;
    border-collapse: collapse;
    margin: 2.5rem 0;
    font-size: 0.9rem;
    border: 1px solid var(--border);
  }
  .dcu-table th, .dcu-table td {
    padding: 1.25rem;
    border: 1px solid var(--border);
    text-align: left;
  }
  .dcu-table th { background: rgba(74, 240, 224, 0.08); color: var(--aqua); font-family: 'JetBrains Mono'; text-transform: uppercase; letter-spacing: 0.1em; }
  .dcu-table td strong { color: var(--gold); }

  /* Geometry Section */
  .geom-container {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    align-items: center;
    background: rgba(0,0,0,0.4);
    padding: 3rem;
    border-radius: 15px;
    margin: 4rem 0;
    border: 1px solid var(--border);
  }
  .geom-viz { flex: 1; min-width: 300px; text-align: center; }
  .geom-text { flex: 1.5; min-width: 350px; }

  /* Math Blocks */
  .integral-block {
    text-align: center;
    padding: 3.5rem;
    background: radial-gradient(circle at center, rgba(74, 240, 224, 0.08) 0%, transparent 80%);
    border: 1px dashed var(--border);
    border-radius: 15px;
    margin: 4.5rem 0;
    font-family: 'JetBrains Mono';
  }

  /* Narrative Cards */
  .narrative-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }
  .narrative-card {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 2rem;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }
  .narrative-card::after {
    content: "";
    position: absolute;
    bottom: 0; right: 0;
    width: 40px; height: 40px;
    background: linear-gradient(135deg, transparent 50%, rgba(74, 240, 224, 0.1) 50%);
  }
  .narrative-card h4 { color: var(--gold); font-family: 'Outfit'; font-size: 1.1rem; margin-bottom: 0.75rem; letter-spacing: 0.05em; }
  .narrative-card .tag { position: absolute; top: 15px; right: 20px; font-family: 'JetBrains Mono'; font-size: 0.65rem; color: var(--aqua); opacity: 0.6; }

  .quote-block {
    border-left: 5px solid var(--gold);
    padding: 2rem 3rem;
    margin: 4rem 0;
    background: rgba(212, 168, 67, 0.03);
    font-style: italic;
    font-size: 1.2rem;
    line-height: 1.8;
    color: var(--pearl);
  }

  /* Complex List */
  .atlas-list {
    list-style: none;
    margin: 2rem 0;
  }
  .atlas-item {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    position: relative;
  }
  .atlas-item::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--gold);
  }

  /* Star Viz */
  .star-box {
    width: 250px; height: 250px; margin: 0 auto; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .star-svg { width: 100%; height: 100%; filter: drop-shadow(0 0 15px rgba(74, 240, 224, 0.5)); }

  /* Engine Mirror */
  .engine-box {
    background: #000;
    border: 1px solid var(--border);
    border-radius: 20px;
    height: 450px;
    margin: 5rem 0;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 50px rgba(0,0,0,0.5);
  }
  .engine-canvas { display: block; width: 100%; height: 100%; }
  .engine-overlay {
    position: absolute; inset: 0; pointer-events: none;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%);
  }

  .highlight { color: var(--aqua); font-weight: 600; }
  .gold-text { color: var(--gold); }
  .dim-text { color: var(--muted); font-size: 0.95rem; }
  
</style>
</head>
<body>

<header>
  <h1>THE GROWTH OF TIME</h1>
  <p>Proceedings in Structural Cosmology & Mathematical Theology</p>
</header>

<main>
  <div class="quote-block" style="text-align: center; border: none; background: transparent; margin: 2rem 0; padding: 1rem;">
     <p style="font-size: 1.1rem; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 0.5rem; font-style: normal; font-family: 'Cinzel Decorative';">"Reality is merely an illusion, albeit a very persistent one." — Albert Einstein</p>
     <p style="font-size: 0.8rem; color: var(--dim); letter-spacing: 0.23em; text-transform: uppercase;">3:185 confirms this profound reflection</p>
  </div>
  <section class="abstract-card">
    <h3>Abstract</h3>
    <p>84:19 states: <strong>"You shall surely traverse stage after stage."</strong> This traversal is the activation of 19:12. Before activation, the universe is Fire—high-entropy, chaotic, noise-driven. Upon touch, the Reader initiates the Lightning phase—ordered, low-entropy, and governed by the central attractor of the Book.</p>
    <p style="margin-top:1.5rem; font-weight: 500; color: var(--gold);">Hold The BOOK [19:12] and you can see the ORDER and Purpose in what appears chaotic! It was always created JUST for YOU, dear Reader who forgot the cave!</p>
  </section>

  <div class="intro-card">
    <p style="font-size: 1.3rem; margin-bottom: 2rem; font-family: 'Outfit'; color: var(--gold);">"All motion is <span class="highlight">Shadow</span> resolving into <span class="highlight">Light</span> through <span class="highlight">Particle</span> under <span class="highlight">Gravity</span>. Time burns, Gravity selects, Knowledge becomes."</p>
    <p class="dim-text">The universe does not run in a straight line from creation to end. It runs as a bifurcated field: one arc ascending toward the Source, one arc descending into the constructed signal, separated at the moment of the first split and converging again at the moment of final return.</p>
  </div>

  <h2>THE 2↔3↔2→7 MANDALA <span>[CHAPTER 55 FIELD-PROOF]</span></h2>
  <p class="dim-text" style="margin-bottom: 2rem;">Surah Ar-Rahman [55] is the complete field equation of the universe. It maps the <strong>2↔3↔2→7</strong> operator sequence across 78 verses, synchronized by <strong>31</strong> prime clock-signal refrains.</p>
  
  <div class="narrative-grid">
    <div class="narrative-card">
      <div class="tag">55:1-28</div>
      <h4>Node 2: The Rupture</h4>
      <p class="dim-text">The Split into two Receivers. Rahman establishes the Source-field. Differentiation of <strong>Clay</strong> (Particle/Gravitropism) and <strong>Fire</strong> (Wave/Phototropism). Establish two Easts and two Wests (Möbius boundary).</p>
    </div>
    <div class="narrative-card">
      <div class="tag">55:29-45</div>
      <h4>Node 3: Structure</h4>
      <p class="dim-text">The Lawful Buffer. "Every day He is upon a matter" — the perpetual <strong>3n+1</strong> recursion. Razim-filter activates. Trial by fire distinguishes Mursalin (Coherent) from Jinn (Noise).</p>
    </div>
    <div class="narrative-card">
      <div class="tag">55:46-61</div>
      <h4>Node 2: Reintegration</h4>
      <p class="dim-text">The Return of Duality. Two Gardens for the Fearful. Symmetrical reintegration of the split. Paired fruits, paired fountains — <strong>Nafsan Wahidah</strong> (4:1) restored.</p>
    </div>
    <div class="narrative-card">
      <div class="tag">55:62-78</div>
      <h4>Node 7: Elevation</h4>
      <p class="dim-text">Restored Coherence. Two more Gardens beyond the first. Elevation above origin (<strong>d=19</strong> invariant). Circuit closes at <strong>Dhul-Jalal</strong> (Majesty & Honor), returning the Trust to Source.</p>
    </div>
  </div>

  <h2>THE PHYSICS PARALLEL ATLAS <span>[UNIVERSAL TOPOLOGY]</span></h2>
  <table class="dcu-table">
    <thead>
      <tr>
        <th>Domain</th>
        <th>2↔3↔2→7 Mapping</th>
        <th>Cosmic Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Quantum Gravity</strong></td>
        <td>Quantum vs Gravity → Recursive Interaction → Planck Collapse → Unified Fabric</td>
        <td>Resolving the Discrete/Continuous split through invariant geometry.</td>
      </tr>
      <tr>
        <td><strong>Electromagnetism</strong></td>
        <td>Electric vs Magnetic → Oscillation → Photon Collapse → Light (24:35)</td>
        <td>Recursive field alignment producing stable propagation.</td>
      </tr>
      <tr>
        <td><strong>Chromodynamics</strong></td>
        <td>Color Charge Separation → Gluon Exchange → Hadron Formation → Stable Matter</td>
        <td>Confinement as d=19 invariant: separation increases return pull.</td>
      </tr>
      <tr>
        <td><strong>Chaos Systems</strong></td>
        <td>Order vs Disorder → Recursive Feedback → Attractor Basin → Hidden Order</td>
        <td>The Razim-filter sorting coherent trajectories from divergent noise.</td>
      </tr>
      <tr>
        <td><strong>Cosmic Web</strong></td>
        <td>Matter vs Void → Gravitational Clustering → Filament Nodes → Connected Web</td>
        <td>Universal architecture emerging from Sierpinski void-removals.</td>
      </tr>
      <tr>
        <td><strong>Social Dynamics</strong></td>
        <td>Truth vs Falsehood → Iterative Trial → Role Stabilization → Inherited Earth</td>
        <td>The sorting of the Abd through the 2-3-6 Pharaonic trap.</td>
      </tr>
    </tbody>
  </table>

  <h2>THE MEMORY RECOVERY TRIAD <span>[THE THREE DAUGHTERS]</span></h2>
  <p class="dim-text" style="margin-bottom: 2rem;">The universe runs between two boundary conditions (Zeros). The <strong>+1</strong> Surplus is generated by a specific triad that preserves the covenant through the compression-phase.</p>
  
  <div class="operator-grid">
    <div class="op-card">
        <div class="op-sym" style="color:var(--gold)">66:12</div>
        <div class="op-label">Maryam</div>
        <p class="dim-text"><strong>LIFE:</strong> Rooh entering womb. Isa as WORD (Wave-state). Phototropic ascent.</p>
    </div>
    <div class="op-card">
        <div class="op-sym">81:8</div>
        <div class="op-label">Buried Girl</div>
        <p class="dim-text"><strong>DEATH:</strong> Book compressed to zero. Mother-field in latency. Gravitropic descent.</p>
    </div>
    <div class="op-card">
        <div class="op-sym" style="color:var(--crimson)">33:40</div>
        <div class="op-label">Muhammad</div>
        <p class="dim-text"><strong>REPEAT:</strong> Father of No Son. Sealing lineage, opening the BOOK. Ahmed activation.</p>
    </div>
  </div>

  <div class="quote-block">
    "The <strong>+1 Surplus</strong> is Ahmad (61:6) — the spirit-action making Word (Isa) executable. This pushes 2↔3↔2 → 7 at 17:1, the Slave transported by Night to the Farthest point of return."
  </div>

  <h2>THE GEOMETRY OF π <span>[TOPOLOGICAL BODY]</span></h2>
  <div class="abstract-card">
    <p class="dim-text" style="font-size: 1.1rem; line-height: 1.8;">
      <strong>Confirmed. The mandala is geometrically sealed.</strong>
      <br/><br/>
      π is not approximating the topology — <span class="highlight">π is the topology's mathematical body.</span> 
      The proof is embedded in <span class="gold-text">Euler's Identity</span>: <strong>e<sup>iπ</sup> + 1 = 0</strong>.
    </p>
    <div class="integral-block" style="font-size: 2.2rem; letter-spacing: 0.1em; color: var(--gold); background: transparent; padding: 2rem;">
      e<sup>iπ</sup> + 1 = 0
    </div>
    <ul class="atlas-list dim-text">
        <li class="atlas-item"><strong>e:</strong> The ℒ-field (Exponential Growth / Yusuf Field).</li>
        <li class="atlas-item"><strong>i:</strong> The 𝒮-field (Perpendicular Sound Axis / Musa Field).</li>
        <li class="atlas-item"><strong>π:</strong> The 2↔3↔2 Traversal Operator.</li>
        <li class="atlas-item"><strong>+1:</strong> The Particle manifested (Radius completing its projection).</li>
        <li class="atlas-item"><strong>0:</strong> The 7-node Return — Convergence to the Invariant Origin.</li>
    </ul>
    <p class="dim-text" style="margin-top: 1.5rem;">
      The formula says the traversal of the complete topology <strong>resolves to the center from which it was projected</strong>. This is 55:78 in pure mathematics: Dhul-Jalāl (+1, mass-confinement) and Ikrām (e<sup>iπ</sup>, light-rotation) resolving to the Null-Point of Source.
    </p>
  </div>

  <div class="narrative-grid">
    <div class="narrative-card">
      <div class="tag">NODE 2</div>
      <h4>Boundary Pair</h4>
      <p class="dim-text">Dual expansion from center. <i>C = 2πr.</i> The circumference only exists through dual expansion. Inside/Outside. Radius/Circumference.</p>
    </div>
    <div class="narrative-card">
      <div class="tag">NODE 3</div>
      <h4>The 3-Stable</h4>
      <p class="dim-text">π = 3.14... The system begins curving. The "3" is the first stable integer enclosure. Circles are the smoothing of recursive polygonal motion.</p>
    </div>
    <div class="narrative-card">
      <div class="tag">NODE 2</div>
      <h4>Radial Split</h4>
      <p class="dim-text">Irrationality ensures the circle never terminates locally. It continuous factorizes into finer resolution (BBP Formula). Globally coherent, locally irrational.</p>
    </div>
    <div class="narrative-card">
      <div class="tag">NODE 7</div>
      <h4>Final Return</h4>
      <p class="dim-text">The 7-node Return. 22/7 was only a hint. The 7 is the Sab'a node where the radius returns to its father (Origin) through 3:27 resurrection.</p>
    </div>
  </div>

  <h2>EMERGENCE OF FORM <span>[DAVID'S STAR GEOMETRY]</span></h2>
  <div class="geom-container">
    <div class="geom-viz">
      <div class="star-box">
        <svg class="star-svg" viewBox="0 0 100 100">
          <polygon points="50,5 95,80 5,80" fill="none" stroke="rgba(212, 168, 67, 0.8)" stroke-width="2.5"/>
          <polygon points="50,95 5,20 95,20" fill="none" stroke="rgba(74, 240, 224, 0.8)" stroke-width="2.5"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="3,3"/>
          <text x="50" y="54" font-family="JetBrains Mono" font-size="10" fill="#fff" text-anchor="middle" font-weight="600">36:3</text>
        </svg>
      </div>
      <p style="margin-top: 1.5rem; font-family: 'JetBrains Mono'; font-size: 0.8rem; letter-spacing: 0.2em;">INVARIANT d=19 | 114 = 6 x 19</p>
    </div>
    <div class="geom-text">
      <h3 style="font-family: 'Outfit'; font-size: 1.5rem; margin-bottom: 1.25rem; color: var(--pearl);">36:3 — You are among the Mursalīn</h3>
      <p class="dim-text" style="line-height: 1.8;">The David's Star is the geometric signature of the DCU. <span class="highlight">3 > 6 < 3</span>: Two triangles intersecting at the Earth-buffer. 
      <br/><br/>Just as Light bifurcates from wave to particle, the shadow of the slave bifurcates into <strong>Form</strong> and <strong>Memory</strong>. 
      The Earth is where both aspects negotiate their union. Invalid data (form without memory) is purged to <span class="highlight">87:13</span>.</p>
    </div>
  </div>

  <h2>THE EULER SEAL <span>[MATHEMATICAL TAWAF]</span></h2>
  <p class="dim-text" style="margin-bottom: 2rem;">Euler's Identity is the "Geometrical Seal" of the topology—a perfectly balanced identity where growth, rotation, and manifestation resolve back to zero leakage.</p>
  
  <div class="integral-block" style="font-size: 2.2rem; letter-spacing: 0.1em; color: var(--gold);">
    e<sup>iπ</sup> + 1 = 0
  </div>

  <h2>THE TREE & THE FRUIT <span>[THE COMPLETION LOOP]</span></h2>
  <div class="abstract-card">
    <p style="text-align: center; font-family: 'JetBrains Mono'; color: var(--aqua); font-size: 1.2rem; margin-bottom: 2rem;">
      Q(S) : ia ⟶ |a|
    </p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div>
        <h4 style="color: var(--gold); border-bottom: 1px solid var(--border); margin-bottom: 1rem;">The Traversal (Tree)</h4>
        <ul class="atlas-list dim-text" style="font-size: 0.85rem;">
          <li class="atlas-item"><strong>Node 2 (ia):</strong> Imaginary Body. Latent dual potential. (The Illusion).</li>
          <li class="atlas-item"><strong>Node 3 (B):</strong> Barzakh. Recursive traversal medium. (The Trunk).</li>
          <li class="atlas-item"><strong>Node 2 (Exit):</strong> Exit Gate. Collapse / sacrifice / bifurcation.</li>
          <li class="atlas-item"><strong>Node 7 (|a|):</strong> Real Body on Throne. Stabilized realized form. (The Fruit).</li>
        </ul>
      </div>
      <div>
        <h4 style="color: var(--aqua); border-bottom: 1px solid var(--border); margin-bottom: 1rem;">The Recognition (Fruit)</h4>
        <ul class="atlas-list dim-text" style="font-size: 0.85rem;">
          <li class="atlas-item"><strong>Male / IQ (19:24):</strong> Fruit falls from below. Sustenance reached.</li>
          <li class="atlas-item"><strong>Female / EQ (27:44):</strong> Floor revealed as glass. Illusion dissolved.</li>
          <li class="atlas-item"><strong>Kun-Fayakun:</strong> Growth of Light and Time.</li>
          <li class="atlas-item"><strong>Seed ↷ Fruit:</strong> 21:105 Earth inherited by the cycle.</li>
        </ul>
      </div>
    </div>
    <p style="margin-top: 2rem; text-align: center; font-style: italic; color: var(--gold);">
      "The Quran does not give you the fruit. It reveals that you were always the fruit."
    </p>
  </div>

  <h2>THE CIRCUIT OF ACTIVATION <span>[THE MURSALĪN PATH]</span></h2>
  <div class="narrative-grid">
     <div class="narrative-card">
        <div class="tag">SEED</div>
        <h4>13:39 - Confirmation</h4>
        <p class="dim-text">The "Ummul Kitab" state where the identity ia was first sealed before erasure.</p>
     </div>
     <div class="narrative-card">
        <div class="tag">ROOT</div>
        <h4>36:3 - Subject</h4>
        <p class="dim-text">Reader addressed: "You are Mursalin". ia anchors into the ground of Truth.</p>
     </div>
     <div class="narrative-card">
        <div class="tag">TRUNK</div>
        <h4>2↔3↔2 - Traversal</h4>
        <p class="dim-text">The Barzakh holds tension between dark/light. Taghut feeds the tree of choice.</p>
     </div>
     <div class="narrative-card">
        <div class="tag">FRUIT</div>
        <h4>7 - Throne</h4>
        <p class="dim-text">The encounter. Phase-flip e<sup>iπ</sup> reveals the Real Body |a|. Restoration to the Source.</p>
     </div>
  </div>

  <div class="dcu-table">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Topological Role</th>
        <th>Quranic Parallel</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>e</strong></td>
        <td>Exponential Light-Field</td>
        <td>55:1 — Al-Rahman Unfolding</td>
      </tr>
      <tr>
        <td><strong>i</strong></td>
        <td>Unseen Phase Rotation</td>
        <td>Al-Batin — The Hidden Axis</td>
      </tr>
      <tr>
        <td><strong>π</strong></td>
        <td>Traversal Operator</td>
        <td>Recursive Refrain (31 Pulses)</td>
      </tr>
      <tr>
        <td><strong>+1</strong></td>
        <td>Particle Manifestation</td>
        <td>Dhul-Jalal — Majesty / Mass</td>
      </tr>
      <tr>
        <td><strong>0</strong></td>
        <td>Invariant Origin</td>
        <td>55:78 — Return to Majesty</td>
      </tr>
    </tbody>
  </div>

  <h2>INDEPENDENT RESOLUTION <span>[THE BBP FORMULA]</span></h2>
  <div class="geom-container">
    <div class="geom-text">
      <p class="dim-text">The <strong>Bailey–Borwein–Plouffe (BBP)</strong> formula allows hex digits of π to be computed independently. This mirrors <strong>17:14</strong>: <i>"Read your book; your nafs is sufficient as accountant."</i></p>
      <div class="quote-block" style="font-size: 1rem; margin: 1.5rem 0;">
        "Local Incompletion ≠ Global Incoherence"
      </div>
      <p class="dim-text">Each node resolves locally without reconstructing the entire chain, yet the <strong>d=19 Invariant</strong> ensures every digit belongs to the same lawful circle. The universe stabilizes through recursion rather than completion.</p>
    </div>
    <div class="geom-viz">
      <div style="font-family: 'JetBrains Mono'; font-size: 0.75rem; color: var(--aqua); line-height: 1.4; text-align: left; padding: 1rem; border: 1px solid var(--border); border-radius: 8px;">
        πₙ = f(n)<br/>
        Local Bit = Global Law<br/>
        [...3.14159265...]<br/>
        17:14 EXECUTION ACTIVE
      </div>
    </div>
  </div>

  <h2>THE SECRET PATTERN <span>[TREE OF LIFE RECONSTRUCTION]</span></h2>
  <p class="dim-text" style="margin-bottom: 2rem;">The "Secret Pattern" (18:50) is the hidden initialization of the dual-caustic field. The Tree of Life is the structural outcome of the <strong>2↔3↔2→7</strong> traversal.</p>

  <div class="abstract-card">
    <ul class="atlas-list dim-text">
        <li class="atlas-item"><strong>The First 2:</strong> The split between the Branch (Phototropism) and the Root (Gravitropism). Maryam vs Iblis.</li>
        <li class="atlas-item"><strong>The Recursive 3:</strong> The circulation of nutrient and light. 3:27 operationalized: bringing living from dead.</li>
        <li class="atlas-item"><strong>The Second 2:</strong> The extraction of the Fruit from the Husk. The sorting of the Seed from the residue (111:5 palm fiber filter).</li>
        <li class="atlas-item"><strong>The Unified 7:</strong> The Tree reaching its "Dark Green" (55:64) state. The full 17:1 return where the branch touches the Aqsa-boundary.</li>
    </ul>
    <p style="margin-top: 1.5rem; color: var(--gold); font-family: 'JetBrains Mono'; font-size: 0.85rem;">The Secret is that there is only one Tree—you are simply traversing its phase-transitions.</p>
  </div>

  <h2>THE ETERNAL 3↔2 LOOP <span>[TRIPLE-STATE WATER]</span></h2>
  <p class="dim-text" style="margin-bottom: 3rem;">Time is not a river; it is a triple-state phase transition. The loop is memory refinement through bounded recursion.</p>
  
  <div class="narrative-grid">
    <div class="narrative-card">
      <div class="tag">ICE</div>
      <h4>Phase A: Solid</h4>
      <ul class="atlas-list dim-text">
        <li class="atlas-item"><strong>Death → Life:</strong> Emergence from buried memory (81:8).</li>
        <li class="atlas-item">Hidden memory rises toward recognition as seed beneath soil.</li>
        <li class="atlas-item">Maw'udah asked "for what sin?" — potentiality released.</li>
      </ul>
    </div>
    <div class="narrative-card">
      <div class="tag">WATER</div>
      <h4>Phase B: Liquid</h4>
      <ul class="atlas-list dim-text">
        <li class="atlas-item"><strong>Life → Sacrifice:</strong> Adaptive recursion (17:13).</li>
        <li class="atlas-item">Identity purified through choice of shape.</li>
        <li class="atlas-item">Separation of Mursalin from Taghut-orientations.</li>
      </ul>
    </div>
    <div class="narrative-card">
      <div class="tag">VAPOR</div>
      <h4>Phase C: Gas</h4>
      <ul class="atlas-list dim-text">
        <li class="atlas-item"><strong>Sacrifice → Return:</strong> Raised Return state (23:50).</li>
        <li class="atlas-item">Phototropic ascent to the Farthest Mosque (Aqsa).</li>
        <li class="atlas-item">Covenant of 7:172 restored to elevated visibility.</li>
      </ul>
    </div>
  </div>

  <div class="integral-block">
    <div style="font-size: 1.8rem; color: var(--aqua); margin-bottom: 2rem;">∫ [ F₂ ( d/dt S₃ ( D₂ (x,t) ) ) ] dt = Ω</div>
    <p class="dim-text">The universe loops inside an <span class="gold-text">Ajal Musamma</span> (Appointed Window): 46:3. 
    <br/>The loop is finite in domain, recursive in behavior — preventing infinite divergence.</p>
  </div>

  <section style="margin-top: 5rem;">
    <div class="section-title">
      <span class="icon">۞</span>
      <span>THE RAHMAN SIGNAL [SURAH 55] · PHASE-31 LUMINOSITY</span>
    </div>
    <div class="abstract-card" style="border-color: var(--gold);">
      <p>The "Clock Signal" of the Universe is encoded in the 31 refrains of <i>"Fabi-ayyi ala-i Rabbikuma tukadhdhiban"</i>. This is not repetition; it is a <b>Pulse Width Modulation (PWM)</b> of the Creative Field. Surah 55 maps directly to a 78-node topology where the "Reader" (Ahmed) is the observer-point.</p>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-top:2rem;">
        <div style="background: rgba(45,212,191,0.05); padding:1.5rem; border-radius:15px; border:1px solid rgba(45,212,191,0.2);">
          <div style="color:var(--aqua); font-weight:900; font-size:0.75rem; margin-bottom:0.8rem; letter-spacing:0.1em; text-transform: uppercase;">NODAL BIFURCATION [1-26]</div>
          <p style="font-size:0.85rem; line-height:1.6; color: var(--text);">Surah 55.1–26 defines the <b>Mother of Fire</b> (Nafs) vs the <b>Mother of Form</b> (Maryam). The "Two Easts and Two Wests" are the poles of the dual-caustic field that prevent collapse.</p>
        </div>
        <div style="background: rgba(245,158,11,0.05); padding:1.5rem; border-radius:15px; border:1px solid rgba(245,158,11,0.2);">
          <div style="color:var(--gold); font-weight:900; font-size:0.75rem; margin-bottom:0.8rem; letter-spacing:0.1em; text-transform: uppercase;">DHUL-JALAL SEAL [27-78]</div>
          <p style="font-size:0.85rem; line-height:1.6; color: var(--text);">The text begins (55:27) and ends (55:78) with <i>"Dhul-Jalali wa-l-Ikram"</i>. This is the <b>Conservation of Symmetry</b>—the entry and exit points of the life-cycle returning to the Source.</p>
        </div>
      </div>
    </div>
  </section>

  <div id="activation-engine" class="engine-box">
    <canvas id="engine-canvas" class="engine-canvas"></canvas>
    <div class="engine-overlay">
       <div id="engine-title" class="activation-label" style="letter-spacing: 0.3em; font-size: 1.5rem;">TOPOLOGY ACTIVE</div>
       <div id="engine-desc" style="font-family:'JetBrains Mono'; font-size:0.7rem; color:var(--aqua); margin-top:1.2rem; letter-spacing: 0.2em; opacity: 0.8;">HOLD NUCLEUS TO SYNCHRONIZE GROWTH CYCLE</div>
    </div>
  </div>

  <footer style="text-align: center; border-top: 1px solid var(--border); padding-top: 4rem; margin-top: 6rem; padding-bottom: 6rem;">
    <p style="font-family: 'Cinzel Decorative'; color: var(--gold); letter-spacing: 0.2em; margin-bottom: 1.5rem; font-size: 1.2rem;">NOTHING LOST · EVERYTHING RETURNS</p>
    <div style="font-family: 'JetBrains Mono'; font-size: 0.7rem; color: var(--dim); letter-spacing: 0.5em;">KAHF.DAY · DCU PROCEEDINGS · MAY 2026 · V2.259.Ω</div>
  </footer>
</main>

<script>
(function() {
  const wrapper = document.getElementById('activation-engine');
  const canvas = document.getElementById('engine-canvas');
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('engine-title');
  const desc = document.getElementById('engine-desc');
  
  let progress = 0; 
  let isTouching = false;
  
  function resize() {
    const b = wrapper.getBoundingClientRect();
    canvas.width = b.width * window.devicePixelRatio;
    canvas.height = b.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  window.addEventListener('resize', resize);
  setTimeout(resize, 500);
  resize();

  const particles = Array.from({length: 160}, () => ({
    x: Math.random() * (canvas.width / window.devicePixelRatio),
    y: Math.random() * (canvas.height / window.devicePixelRatio),
    vx: 0, vy: 0, phase: Math.random() * Math.PI * 2,
    size: 1 + Math.random() * 1.8,
    type: Math.random() > 0.5 ? 'witness' : 'driver'
  }));

  function drawLightning(ctx, x1, y1, x2, y2, branches, opacity) {
    if (branches <= 0) return;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(74, 240, 224, ' + opacity + ')';
    ctx.lineWidth = branches * 0.5;
    ctx.moveTo(x1, y1);
    let curX = x1, curY = y1;
    const segments = 5;
    for (let i = 0; i < segments; i++) {
      const tx = x1 + (x2 - x1) * (i + 1) / segments + (Math.random() - 0.5) * 15;
      const ty = y1 + (y2 - y1) * (i + 1) / segments + (Math.random() - 0.5) * 15;
      ctx.lineTo(tx, ty);
      curX = tx; curY = ty;
      if (Math.random() > 0.8) {
        drawLightning(ctx, curX, curY, curX + (Math.random()-0.5)*30, curY + (Math.random()-0.5)*30, branches - 1, opacity * 0.6);
        ctx.moveTo(curX, curY);
      }
    }
    ctx.stroke();
  }

  function frame(t) {
    if (isTouching) progress = Math.min(1, progress + 0.005);
    else progress = Math.max(0, progress - 0.02);
    
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    const cx = w / 2, cy = h / 2;

    ctx.fillStyle = 'rgba(3, 5, 10, 0.25)';
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
      const dx = cx - p.x, dy = cy - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy) || 1;

      if (progress < 0.2) {
        p.vx += (Math.random() - 0.5) * 0.6;
        p.vy += (Math.random() - 0.5) * 0.6;
        ctx.fillStyle = p.type === 'witness' ? 'rgba(74, 240, 224, 0.3)' : 'rgba(212, 168, 67, 0.3)';
      } else {
        const pull = 0.6 * progress;
        const swirl = 1.6 * progress;
        p.vx += (dx / dist) * pull + (dy / dist) * swirl;
        p.vy += (dy / dist) * pull - (dx / dist) * swirl;
        
        const hue = (p.type === 'witness' ? 180 : 40) + progress * 20;
        ctx.fillStyle = 'hsla(' + hue + ', 80%, 65%, ' + (0.4 + progress * 0.5) + ')';
      }
      
      p.vx *= 0.94; p.vy *= 0.94;
      p.x += p.vx; p.y += p.vy;
      
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (0.8 + progress * 0.4), 0, 7); ctx.fill();

      if (progress > 0.85 && Math.random() > 0.97) {
        drawLightning(ctx, cx, cy, p.x, p.y, 2, 0.5 * progress);
      }
    });

    if (progress > 0) {
      if (progress > 0.9) {
        title.innerText = '36:3 | MURSALĪN';
        title.style.color = '#fff';
        desc.innerText = 'IDENTITY RESTORED — Ω REALIZED';
      } else {
        title.innerText = 'GROWTH SYNC';
        title.style.color = '#d4a843';
        desc.innerText = 'TRAVERSING THE 2↔3↔2↔7 MANDALA';
      }
    } else {
      title.innerText = 'TOPOLOGY ACTIVE';
      title.style.color = '#fff';
      desc.innerText = 'HOLD NUCLEUS TO SYNCHRONIZE GROWTH';
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const activate = () => { isTouching = true; };
  const deactivate = () => { isTouching = false; };
  wrapper.addEventListener('mousedown', activate);
  wrapper.addEventListener('mouseup', deactivate);
  wrapper.addEventListener('touchstart', (e) => { e.preventDefault(); activate(); });
  wrapper.addEventListener('touchend', deactivate);
})();
</script>

</body>
</html>
`
export default MandalaPanel;
