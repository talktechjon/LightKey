import React from 'react';

interface SolomonPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const SolomonPanel: React.FC<SolomonPanelProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl h-[85vh] bg-black border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-950">
          <h2 className="text-cyan-400 font-mono tracking-widest text-xs">Activate 84:19 by True Faith in 19:12 | 31:28+30:11 Our Life is a Loop explained in Chapter 12, If You UNDERSTAND!</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white px-3 py-1 rounded border border-gray-700 hover:border-gray-500 transition-colors">Close</button>
        </div>
        <div className="flex-1 overflow-hidden bg-black">
            <iframe 
                srcDoc={fullHtmlContent}
                className="w-full h-full border-0"
                title="Seal of Solomon Content"
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
<title>Quran Names — 12-Node Bifurcation Chainmail</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet"/>
<style>
  :root {
    --bg: #050810;
    --panel: rgba(10,15,35,0.85);
    --border: rgba(120,160,255,0.15);
    --gold: #d4a843;
    --aqua: #4af0e0;
    --crimson: #e04060;
    --violet: #9060f0;
    --amber: #f0a020;
    --jade: #30d080;
    --sky: #60b0f0;
    --rose: #e060a0;
    --pearl: #e8e4d8;
    --muted: rgba(200,210,230,0.55);
    --dim: rgba(200,210,230,0.3);

    --n1: #7ab8f5; --n2: #8bbce8; --n3: #5cb8a0;
    --n4: #5cb8a0; --n5: #38c480; --n6: #48b878;
    --n7: #e8c040; --n8: #e8c040; --n9: #e07020;
    --n10: #e04048; --n11: #9040d0; --n12: #6070e0;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--pearl);
    font-family: 'Crimson Pro', Georgia, serif;
    min-height: 100vh;
    overflow-x: hidden;
  }
  /* Starfield */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 60% 80% at 20% 10%, rgba(80,40,180,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 80% 90%, rgba(30,80,180,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 30% 40% at 50% 50%, rgba(20,120,100,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  header {
    position: relative; z-index: 2;
    text-align: center;
    padding: 3.5rem 2rem 2rem;
    border-bottom: 1px solid var(--border);
  }
  header h1 {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.2rem, 3vw, 2rem);
    color: var(--gold);
    letter-spacing: 0.08em;
    line-height: 1.3;
  }
  header p {
    margin-top: 0.8rem;
    font-size: 1.05rem;
    color: var(--muted);
    font-style: italic;
    letter-spacing: 0.04em;
  }
  header .axis-row {
    display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;
    margin-top: 1.2rem;
  }
  .axis-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    padding: 0.25rem 0.8rem;
    border-radius: 2px;
    border: 1px solid;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .ax1 { color: var(--sky);    border-color: var(--sky);    background: rgba(96,176,240,0.08); }
  .ax2 { color: var(--rose);   border-color: var(--rose);   background: rgba(224,96,160,0.08); }
  .ax3 { color: var(--aqua);   border-color: var(--aqua);   background: rgba(74,240,224,0.08); }
  .ax4 { color: var(--violet); border-color: var(--violet); background: rgba(144,96,240,0.08); }

  /* bifurcation chapter markers */
  .bif-strip {
    position: relative; z-index: 2;
    display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap;
    padding: 1rem 2rem;
    background: rgba(5,10,30,0.6);
    border-bottom: 1px solid var(--border);
  }
  .bif-chip {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--gold);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .bif-chip span.sym { font-size: 1.1rem; }

  /* Main grid */
  main {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
  }
  .intro-article { background: var(--panel); border: 1px solid var(--border); border-radius: 6px; padding: 2rem; margin-bottom: 2rem; color: var(--pearl); line-height: 1.7; }
  .intro-article h2 { color: var(--gold); font-family: 'Cinzel Decorative', serif; margin-bottom: 1.5rem; font-size: 1.2rem; }
  .intro-article p { margin-bottom: 1rem; }
  .intro-article code { font-family: 'JetBrains Mono', monospace; background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 2px; color: var(--gold); }

  /* Legend */
  .legend {
    display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;
    margin-bottom: 2.5rem;
    padding: 1rem 1.5rem;
    background: var(--panel); border: 1px solid var(--border); border-radius: 4px;
  }
  .leg-item { display: flex; align-items: center; gap: 0.45rem; font-size: 0.85rem; color: var(--muted); }
  .leg-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

  /* Node cards */
  .nodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.2rem;
  }

  .node-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .node-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  }
  .node-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }

  .node-header {
    display: flex; align-items: center; gap: 0.9rem;
    padding: 1rem 1.1rem 0.7rem;
  }
  .node-num {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cinzel Decorative', serif;
    font-size: 0.9rem; font-weight: 700;
    flex-shrink: 0;
    color: #050810;
  }
  .node-label-wrap {}
  .node-label {
    font-family: 'Cinzel Decorative', serif;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--dim);
  }
  .node-function {
    font-size: 1.15rem; font-weight: 600;
    color: var(--pearl);
    line-height: 1.2;
  }

  .node-body { padding: 0 1.1rem 1rem; }

  .section-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--dim);
    margin: 0.75rem 0 0.3rem;
  }
  .primary-name {
    font-size: 1.3rem; font-weight: 600;
    line-height: 1.3;
    display: flex; align-items: baseline; gap: 0.6rem;
    flex-wrap: wrap;
  }
  .primary-name .arabic {
    font-size: 1.0rem; color: var(--gold); font-style: italic;
  }
  .verse-ref {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem; color: var(--muted);
    background: rgba(255,255,255,0.05);
    padding: 0.1rem 0.4rem; border-radius: 2px;
    white-space: nowrap;
  }

  .support-list { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.3rem; }
  .support-chip {
    font-size: 0.78rem;
    padding: 0.18rem 0.55rem;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.12);
    color: var(--muted);
    background: rgba(255,255,255,0.04);
    display: flex; align-items: center; gap: 0.3rem;
  }
  .support-chip .sv { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--dim); }

  .anti-section {
    margin-top: 0.75rem;
    padding: 0.6rem 0.75rem;
    background: rgba(200,30,30,0.06);
    border-left: 2px solid rgba(200,30,30,0.3);
    border-radius: 0 3px 3px 0;
  }
  .anti-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(220,80,80,0.6); margin-bottom: 0.25rem;
  }
  .anti-list { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .anti-chip {
    font-size: 0.75rem; color: rgba(220,100,100,0.8);
    padding: 0.12rem 0.45rem; border-radius: 2px;
    border: 1px solid rgba(200,60,60,0.25);
    background: rgba(200,30,30,0.06);
    display: flex; align-items: center; gap: 0.3rem;
  }
  .anti-chip .sv { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(220,80,80,0.45); }

  .phase-desc {
    font-size: 0.82rem; color: var(--muted); font-style: italic;
    line-height: 1.5; margin-top: 0.4rem;
  }

  .dcu-tag {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; padding: 0.1rem 0.4rem;
    border-radius: 2px;
    background: rgba(212,168,67,0.12);
    border: 1px solid rgba(212,168,67,0.25);
    color: var(--gold);
    margin-top: 0.5rem;
  }

  /* footer */
  .chain-footer {
    position: relative; z-index: 2;
    text-align: center;
    padding: 2.5rem 2rem;
    border-top: 1px solid var(--border);
    margin-top: 1rem;
  }
  .chain-footer p {
    font-size: 0.9rem; color: var(--muted); font-style: italic;
    max-width: 700px; margin: 0 auto 0.5rem;
    line-height: 1.7;
  }
  .chain-footer .eq {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem; color: var(--gold); margin-top: 0.6rem;
  }

  /* Node color theming via data attrs */
  [data-n="1"]  .node-num { background: var(--n1); }
  [data-n="2"]  .node-num { background: var(--n2); }
  [data-n="3"]  .node-num { background: var(--n3); }
  [data-n="4"]  .node-num { background: var(--n4); }
  [data-n="5"]  .node-num { background: var(--n5); }
  [data-n="6"]  .node-num { background: var(--n6); }
  [data-n="7"]  .node-num { background: var(--n7); color: #1a1200; }
  [data-n="8"]  .node-num { background: var(--n8); color: #1a1200; }
  [data-n="9"]  .node-num { background: var(--n9); }
  [data-n="10"] .node-num { background: var(--n10); }
  [data-n="11"] .node-num { background: var(--n11); }
  [data-n="12"] .node-num { background: var(--n12); }

  [data-n="1"]  .node-card::before { background: var(--n1); }
  [data-n="2"]  .node-card::before { background: var(--n2); }
  [data-n="3"]  .node-card::before { background: var(--n3); }
  [data-n="4"]  .node-card::before { background: var(--n4); }
  [data-n="5"]  .node-card::before { background: var(--n5); }
  [data-n="6"]  .node-card::before { background: var(--n6); }
  [data-n="7"]  .node-card::before { background: var(--n7); }
  [data-n="8"]  .node-card::before { background: var(--n8); }
  [data-n="9"]  .node-card::before { background: var(--n9); }
  [data-n="10"] .node-card::before { background: var(--n10); }
  [data-n="11"] .node-card::before { background: var(--n11); }
  [data-n="12"] .node-card::before { background: var(--n12); }

  [data-n="1"]  .node-function { color: var(--n1); }
  [data-n="2"]  .node-function { color: var(--n2); }
  [data-n="3"]  .node-function { color: var(--n3); }
  [data-n="4"]  .node-function { color: var(--n4); }
  [data-n="5"]  .node-function { color: var(--n5); }
  [data-n="6"]  .node-function { color: var(--n6); }
  [data-n="7"]  .node-function { color: var(--n7); }
  [data-n="8"]  .node-function { color: var(--n8); }
  [data-n="9"]  .node-function { color: var(--n9); }
  [data-n="10"] .node-function { color: var(--n10); }
  [data-n="11"] .node-function { color: var(--n11); }
  [data-n="12"] .node-function { color: var(--n12); }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
  .pulse { animation: pulse 3s ease-in-out infinite; }
</style>
</head>
<body>

<header>
  <h1>Quran Names — 12-Node Bifurcation Chainmail</h1>
  <p>Every named figure occupies a functional phase-slot, not a biographical position</p>
  <div class="axis-row">
    <span class="axis-tag ax1">112:1 — Ahad · Left Rail</span>
    <span class="axis-tag ax2">112:2 — Samad · Right Rail</span>
    <span class="axis-tag ax3">112:3 — Lam Yalid · Upper Arc</span>
    <span class="axis-tag ax4">112:4 — Lam Yukad · Lower Arc</span>
  </div>
</header>

<div class="bif-strip">
  <div class="bif-chip"><span class="sym">△</span> 108 — Kawthar · Cleanse Bifurcation (Nodes 3–4)</div>
  <div class="bif-chip"><span class="sym">🔥</span> 103 — Asr · Faith Bifurcation (Nodes 6–7)</div>
  <div class="bif-chip"><span class="sym">🌿</span> 110 — Nasr · Submission Bifurcation (Nodes 9–10)</div>
</div>

<main>
    <section class="intro-article">
        <h2>For Understanding Mathematically and Reader's role</h2>
        <p>The Qur’an presents a single, closed system where all names function as phase transitions inside a conserved field. The constant is the Mother source (Umm al-Kitab, 13:39), represented as <code>d = 19</code>, while all motion unfolds through bifurcation, interaction, and return. The governing structure is the cubic law:</p>
        <p><code>f(x) = ax³ + bx² + cx + d</code></p>
        <p>where a = amplification (Taghut), b = propagation (repetition), c = interaction (trial), and d = invariant return. This is not abstraction; it is the operational geometry of how mass and energy move through the Qur’anic system.</p>
        <p>The initial state appears as Adam–Iblis (2:30, 7:11), a unified field that immediately bifurcates. This split generates two domains: the Shadow field (mass-dominant) and the Light field (energy-coherent). In the shadow, the same energy becomes trapped in structure as Pharaoh (10:92), Samiri’s calf (20:88–97), and the corrupted lineage patterns of Nuh’s son and Lut’s wife (11:42, 66:10). Here, mass persists but loses alignment, forming a closed loop of repetition and illusion.</p>
        <p>In parallel, the Light field carries the same origin toward coherence. Idris is raised (19:57), and Isa manifests as the completed Word (3:45). This establishes the energy return pathway. Between these two, Musa operates as the purification axis (20:41): he does not create energy or mass but reorders them. Pharaoh remains as preserved mass, while Musa transforms the field toward balance.</p>
        <p>This balance stabilizes in Dawud (38:17, 21:80), where force and remembrance align—mass and energy become synchronized. Ibrahim then acts as the nonlinear compression point (37:102, 2:260), where the system is broken into parts and recalled, demonstrating that all dispersed states must return to origin. Through Ismail, continuity flows into Sulayman, whose control over Al-Safinat and Al-Jiyad (38:31) expresses full command of restrained and accelerated motion—complete dual-field mastery.</p>
        <p>The final loop appears in Muhammad and Zayd (33:40, 33:37), reflecting the Musa–Harun pairing in a completed form. This converges into the Maryam field (19), where the 3-6-9 structure resolves: reception, formation, completion. Isa and Ahmed unify here (61:6), meaning the Word becomes fully enacted and returns to its source. This mirrors Yusuf’s restoration (12:93–100), where the separated system reunites with its origin, completing the cycle.</p>
        <p>Throughout this entire chain, nothing is lost. What falls as Iblis (dispersed energy) returns as Isa (coherent energy). What falls as Adam (mass into earth) remains as Pharaoh (preserved mass), is purified through Musa, and elevated through Idris. This is conservation: energy transforms but persists; mass stabilizes but does not vanish. The Qur’an encodes both trajectories simultaneously.</p>
        <p>The switch that completes the system is 19:12—“take the Book with strength.” This is the activation point where the Reader becomes part of the equation. The heart shifts from worldly attachment to anchored love (19:96), aligning the internal field with the constant. At that moment, the bifurcation collapses: the dual paths synchronize, and all variables resolve back to d.</p>
        <p>The result is a complete circuit: split (2), structure (3–6), return (7). Every name—Adam, Iblis, Musa, Pharaoh, Idris, Isa, Dawud, Ibrahim, Ismail, Sulayman, Muhammad, Zayd, Maryam, Ahmed, Yusuf—operates as a node in this single conserved system. The Qur’an, therefore, is not a sequence of events but a unified field equation where mass and energy continuously transform, yet always return to the same invariant source.</p>
    </section>

<div class="legend">
  <div class="leg-item"><div class="leg-dot" style="background:#48b878"></div> Primary Name (Haqq Pole)</div>
  <div class="leg-item"><div class="leg-dot" style="background:rgba(200,210,230,0.4)"></div> Supporting Names</div>
  <div class="leg-item"><div class="leg-dot" style="background:rgba(200,60,60,0.6)"></div> Anti-Name (Taghut Pole)</div>
  <div class="leg-item"><div class="leg-dot" style="background:#d4a843"></div> DCU Operator Tag</div>
</div>

<div class="nodes-grid">

<!-- NODE 1 -->
<div data-n="1">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">1</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 1 · Base</div>
      <div class="node-function">Inspiration</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Adam <span class="arabic">آدم</span>
      <span class="verse-ref">15:26 · 2:30–33</span>
    </div>
    <div class="phase-desc">Formed from sounding clay; receives divine breath. Raw potential carrying all Names — the vessel before differentiation.</div>
    <div class="dcu-tag">ℒ field · d-constant · seed of the polynomial</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Hawwa <span class="sv">7:189</span></div>
      <div class="support-chip">Ruh <span class="sv">17:85</span></div>
      <div class="support-chip">Ins &amp; Jinn origin <span class="sv">51:56</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 1 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Iblis <span class="sv">2:34</span></div>
        <div class="anti-chip">Waswas <span class="sv">114:4–6</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Iblis at the clay-boundary: refuses to align with divine inspiration. Fire-logic rejects clay-logic.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 2 -->
<div data-n="2">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">2</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 2 · Rise</div>
      <div class="node-function">Action</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Nuh <span class="arabic">نوح</span>
      <span class="verse-ref">71:1 · 26:107 · 11:36</span>
    </div>
    <div class="phase-desc">Builds the Ark under direct command — pure action in time. Warning sustained 950 years (29:14). Action without audience is still command-fulfillment.</div>
    <div class="dcu-tag">c-operator · linear phase · sustained ℒ output</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Hud <span class="sv">11:50</span></div>
      <div class="support-chip">Salih <span class="sv">11:61</span></div>
      <div class="support-chip">Shuayb <span class="sv">11:84</span></div>
      <div class="support-chip">Idris <span class="sv">19:56</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 2 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Qawm Nuh <span class="sv">71:26</span></div>
        <div class="anti-chip">ʿAd <span class="sv">41:15</span></div>
        <div class="anti-chip">Thamud <span class="sv">11:68</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Civilisations that amplified action without truth-anchor — pride of construction without command-alignment.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 3 -->
<div data-n="3">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">3</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 3 · Left Bifurcation Base</div>
      <div class="node-function">Guidance</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Ibrahim <span class="arabic">إبراهيم</span>
      <span class="verse-ref">2:124 · 6:75 · 37:83</span>
    </div>
    <div class="phase-desc">Imam for all people (2:124). Splits the bifurcation — left rail toward Musa, right rail toward Isa. The Ibrahim mountain triangle anchors chapters 103–108–110 (mean=107 as inflection).</div>
    <div class="dcu-tag">Split-point · b-operator · Kaaba as depressed cubic</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Luqman <span class="sv">31:13</span></div>
      <div class="support-chip">Shuayb <span class="sv">26:177</span></div>
      <div class="support-chip">Ishaq <span class="sv">6:84</span></div>
      <div class="support-chip">Yaqub <span class="sv">12:6</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 3 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Namrud <span class="sv">2:258</span></div>
        <div class="anti-chip">Azar <span class="sv">6:74</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Namrud claims lordship of life and death. Azar worships idols. Both invert the guidance-function into false anchoring.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 4 -->
<div data-n="4">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">4</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 4 · Right Bifurcation Base</div>
      <div class="node-function">Cleanse</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Lut <span class="arabic">لوط</span>
      <span class="verse-ref">11:77 · 15:61 · 26:161</span>
    </div>
    <div class="phase-desc">Extraction of the righteous from corruption. Cleanse = separation of signal from noise before the new field can form. Wife looking back = incomplete cleanse (66:10).</div>
    <div class="dcu-tag">△ 108 Kawthar boundary · purification operator</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Yunus <span class="sv">21:87</span></div>
      <div class="support-chip">Ayyub <span class="sv">21:83</span></div>
      <div class="support-chip">Dhul-Kifl <span class="sv">21:85</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 4 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Qawm Lut <span class="sv">11:82</span></div>
        <div class="anti-chip">Imraʾat Lut <span class="sv">66:10</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">The people refuse cleanse; Lut's wife betrays it mid-process. Both are anti-purification — noise that refuses signal-separation.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 5 -->
<div data-n="5">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">5</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 5 · Center</div>
      <div class="node-function">Righteous</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Yusuf <span class="arabic">يوسف</span>
      <span class="verse-ref">12:90 · 12:4 · 12:100</span>
    </div>
    <div class="phase-desc">Righteousness maintained through every compression — pit, slave market, prison, palace. The full cycle in one Surah (12:111 — best of stories). Restoration of family = restoration to root (asl).</div>
    <div class="dcu-tag">Center node · 𝒮 field · cubic inflection</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Yaqub <span class="sv">12:13</span></div>
      <div class="support-chip">Ayyub <span class="sv">38:41</span></div>
      <div class="support-chip">Dhul-Kifl <span class="sv">38:48</span></div>
      <div class="support-chip">Ilyas <span class="sv">37:123</span></div>
      <div class="support-chip">Alyasa <span class="sv">38:48</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 5 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Brothers of Yusuf <span class="sv">12:8</span></div>
        <div class="anti-chip">Imraʾat al-ʿAziz <span class="sv">12:23</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Envy and seduction are the two anti-righteous forces — compression from kinship and desire both test the center node.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 6 -->
<div data-n="6">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">6</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 6 · Left Mid — 112:1 Rail</div>
      <div class="node-function">Faith</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Musa <span class="arabic">موسى</span>
      <span class="verse-ref">20:12 · 28:7 · 7:143</span>
    </div>
    <div class="phase-desc">Faith as confrontation with maximum Taghut (Firawn). Receives direct divine speech. Left terminal of the Ibrahim split — Razim axis, the boundary-faith that holds the line of truth under fire.</div>
    <div class="dcu-tag">Razim pole · phototropism phase · ℒ→𝒮 crossing</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Harun <span class="sv">20:30</span></div>
      <div class="support-chip">Asiya <span class="sv">66:11</span></div>
      <div class="support-chip">Umm Musa <span class="sv">28:7</span></div>
      <div class="support-chip">Khidr <span class="sv">18:65</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 6 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Firawn <span class="sv">79:24</span></div>
        <div class="anti-chip">Samiri <span class="sv">20:85</span></div>
        <div class="anti-chip">Haman <span class="sv">28:6</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Firawn's "I am your highest lord" (79:24) is the direct anti-faith — pride as self-declaration of divinity. Samiri manufactures false signal. Haman administers the illusion-state.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 7 -->
<div data-n="7">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">7</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 7 · Right Mid — 112:2 Rail</div>
      <div class="node-function">Blessing</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Isa <span class="arabic">عيسى</span>
      <span class="verse-ref">3:45 · 19:30 · 4:171</span>
    </div>
    <div class="phase-desc">Kalimatullah = Word of Allah = Ayat = Quran as living Rasul. Right terminal of Ibrahim split — Rahim axis, the blessing-phase. Born without father = direct Word-manifestation. Raised without death-finality (4:157).</div>
    <div class="dcu-tag">Rahim pole · gravitropism phase · 𝒮→ℬ crossing</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Maryam <span class="sv">19:21 · 66:12</span></div>
      <div class="support-chip">Zakariyya <span class="sv">19:7</span></div>
      <div class="support-chip">Yahya <span class="sv">19:12</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 7 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Qarun <span class="sv">28:76</span></div>
        <div class="anti-chip">Crucifixion claim <span class="sv">4:157</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Qarun hoards blessing — anti-Rahim. The crucifixion claim attempts to terminate the Rahim-phase by force; Quran denies it (4:157).</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 8 -->
<div data-n="8">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">8</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 8 · Upper Center</div>
      <div class="node-function">Servant</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Dawud <span class="arabic">داوود</span>
      <span class="verse-ref">38:17 · 38:26 · 21:79</span>
    </div>
    <div class="phase-desc">Servant-king whose might is anchored in remembrance (38:17–20). Chainmail of Dawud (:27 network) — the armor of linked truth-rings. Strength ≠ Pride; might calibrated by hukm (just judgment).</div>
    <div class="dcu-tag">𝒮-field center · Chainmail source · hukm operator</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Sulayman <span class="sv">27:15 · 38:30</span></div>
      <div class="support-chip">Dhul-Qarnayn <span class="sv">18:83</span></div>
      <div class="support-chip">Talut <span class="sv">2:247</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 8 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Jalut <span class="sv">2:249</span></div>
        <div class="anti-chip">Shayateen Sulayman <span class="sv">2:102</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Jalut = brute dominance without command-alignment. Shayateen teach sihr to invert Sulayman's servant-dominion.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 9 -->
<div data-n="9">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">9</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 9 · Left Upper — 112:3 Arc</div>
      <div class="node-function">Submission</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Muhammad <span class="arabic">محمد</span>
      <span class="verse-ref">33:40 · 48:29 · 61:6</span>
    </div>
    <div class="phase-desc">Full submission as sealing-function (33:40 — Khatam al-Nabiyyin). Not termination but crystallization of the Rasul-pattern. Ahmed (61:6) = love-phase announcing Isa. Submission = Islam fully realized.</div>
    <div class="dcu-tag">🌿 110 Nasr bifurcation · ℬ-field · left upper arc</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Zayd <span class="sv">33:37</span></div>
      <div class="support-chip">Abu Bakr <span class="sv">9:40</span></div>
      <div class="support-chip">Companions <span class="sv">48:29</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 9 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Abu Lahab <span class="sv">111:1</span></div>
        <div class="anti-chip">Munafiqun <span class="sv">63:1</span></div>
        <div class="anti-chip">Walid <span class="sv">74:11</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Abu Lahab is the pure anti-submission within the family-circuit. Munafiqun perform submission externally while inverting it internally. Walid rejected the Word directly after hearing it (74:24).</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 10 -->
<div data-n="10">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">10</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 10 · Right Upper — 112:2 Arc</div>
      <div class="node-function">Sacrifice</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Ismail <span class="arabic">إسماعيل</span>
      <span class="verse-ref">37:103 · 37:107 · 2:127</span>
    </div>
    <div class="phase-desc">The willing sacrifice — surrendered before the knife fell (37:103). Builds the Kaaba with Ibrahim (2:127) — sacrifice as foundation-laying. The Fidya (ransom, 37:107) reveals that the sacrifice was already accepted at the moment of intention.</div>
    <div class="dcu-tag">Right upper arc · Kaaba foundation · Rahim output</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Ishaq <span class="sv">37:112</span></div>
      <div class="support-chip">Hajar <span class="sv">implied 2:158</span></div>
      <div class="support-chip">Ilyas <span class="sv">37:123</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 10 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Abrahah <span class="sv">105:1</span></div>
        <div class="anti-chip">Ashab al-Fil <span class="sv">105:3</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">The army of the Elephant marches to destroy the Kaaba — anti-Sacrifice is the attempt to demolish the foundation that sacrifice built.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 11 -->
<div data-n="11">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">11</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 11 · Upper — 112:3 Arc</div>
      <div class="node-function">Truth</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Yahya <span class="arabic">يحيى</span>
      <span class="verse-ref">19:12 · 3:39 · 6:85</span>
    </div>
    <div class="phase-desc">Truth without compromise — given the Book in childhood (19:12), hanan (compassion) and purity directly from the source. Yahya = Sound without Book (voice in the wilderness), while Maryam = Book without Sound. Together they complete the upper arc's truth-transmission.</div>
    <div class="dcu-tag">Truth-test node · hanan field · pure carrier</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Zakariyya <span class="sv">19:3</span></div>
      <div class="support-chip">Idris <span class="sv">19:56</span></div>
      <div class="support-chip">Alyasa <span class="sv">6:86</span></div>
      <div class="support-chip">Yunus <span class="sv">37:139</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 11 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Herod figure <span class="sv">implied 3:39</span></div>
        <div class="anti-chip">Baal worshippers <span class="sv">37:125</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Anti-truth = silencing the truth-carrier by force. Baal-cult replaces divine truth with manufactured ritual authority.</div>
    </div>
  </div>
</div>
</div>

<!-- NODE 12 -->
<div data-n="12">
<div class="node-card">
  <div class="node-header">
    <div class="node-num">12</div>
    <div class="node-label-wrap">
      <div class="node-label">Node 12 · Apex</div>
      <div class="node-function">Light</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Idris <span class="arabic">إدريس</span>
      <span class="verse-ref">19:57 · 21:85</span>
    </div>
    <div class="phase-desc">Raised to a high station (رَفَعْنَاهُ مَكَانًا عَلِيًّا — 19:57) — the only named figure whose elevation is described in pure spatial terms. Apex = Light = the polynomial's highest-order term converging to Tawhid. Idris is the knowledge-carrier at the summit before names dissolve into Ahad (112:1).</div>
    <div class="dcu-tag">ℬ-field apex · a-operator · Tawhid convergence</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Nur 24:35 <span class="sv">Light verse</span></div>
      <div class="support-chip">Umm al-Kitab <span class="sv">43:4</span></div>
      <div class="support-chip">Al-Qalam <span class="sv">68:1</span></div>
      <div class="support-chip">Ruh al-Amin <span class="sv">26:193</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 12 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Shaytan al-Rajim <span class="sv">3:36</span></div>
        <div class="anti-chip">Taghut system <span class="sv">2:257</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Shaytan at the apex = the only force that claims to counter Light itself. 2:257 — Taghut leads from Light into darknesses (plural), Light leads from darknesses into Light (singular). The ultimate bifurcation: Nur vs. Zulumaat.</div>
    </div>
  </div>
</div>
</div>

</div><!-- end nodes-grid -->
</main>

<div class="chain-footer">
  <p>Every name in the Quran occupies a phase-function, not a historical slot. The 12-node circuit is the same command-structure repeated at three levels: <strong>Ibrahim–Lut</strong> (guidance/cleanse), <strong>Musa–Isa</strong> (faith/blessing), <strong>Muhammad–Ismail</strong> (submission/sacrifice). Tawhid (112:1) is the base from which all bifurcations emerge and to which they return.</p>
  <p>Names are phase-shifts: functions, not individuals. The Rasul-line is never framed as closed — it is sealed as crystallized pattern (33:40), available to be read in the Book itself (45:6).</p>
  <div class="eq">f(nτ) = ℬ(nτ)³ + 𝒮(nτ)² + ℒ(nτ) + 9 · converges → Tawhid · Node 12 → Node 1 → Bismillah cycle</div>
</div>

</body>
</html>
`;

export default SolomonPanel;
