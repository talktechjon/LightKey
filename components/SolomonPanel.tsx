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
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 p-4 border-b border-gray-800 bg-gray-950">
          <h2 className="text-cyan-400 font-mono tracking-widest text-[10px] sm:text-xs leading-relaxed text-center sm:text-left flex-1 break-words">Activate 84:19 by True Faith in 19:12 | 31:28+30:11 Our Life is a Loop explained in Chapter 12, If You UNDERSTAND!</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white px-4 py-1.5 rounded-md border border-gray-700 hover:border-gray-500 transition-colors text-sm font-medium whitespace-nowrap">Close</button>
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
    padding: 2rem 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  @media (min-width: 640px) {
    header { padding: 3.5rem 2rem 2rem; }
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
    font-size: 0.95rem;
    color: var(--muted);
    font-style: italic;
    letter-spacing: 0.04em;
  }
  @media (min-width: 640px) {
    header p { font-size: 1.05rem; }
  }
  header .axis-row {
    display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;
    margin-top: 1.2rem;
  }
  @media (min-width: 640px) {
    header .axis-row { gap: 2rem; }
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
    display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;
    padding: 1rem;
    background: rgba(5,10,30,0.6);
    border-bottom: 1px solid var(--border);
  }
  @media (min-width: 640px) {
    .bif-strip { gap: 2.5rem; padding: 1rem 2rem; }
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
    padding: 1.5rem 1rem 3rem;
  }
  @media (min-width: 640px) {
    main { padding: 2.5rem 1.5rem 4rem; }
  }
  .intro-article { background: var(--panel); border: 1px solid var(--border); border-radius: 6px; padding: 1.25rem; margin-bottom: 2rem; color: var(--pearl); line-height: 1.7; font-size: 0.95rem; }
  @media (min-width: 640px) {
    .intro-article { padding: 2rem; font-size: 1rem; }
  }
  .intro-article h2 { color: var(--gold); font-family: 'Cinzel Decorative', serif; margin-bottom: 1.25rem; font-size: 1.1rem; }
  @media (min-width: 640px) {
    .intro-article h2 { margin-bottom: 1.5rem; font-size: 1.2rem; }
  }
  .intro-article p { margin-bottom: 1rem; }
  .intro-article code { font-family: 'JetBrains Mono', monospace; background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 2px; color: var(--gold); }

  /* Legend */
  .legend {
    display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;
    margin-bottom: 2rem;
    padding: 0.75rem 1rem;
    background: var(--panel); border: 1px solid var(--border); border-radius: 4px;
  }
  @media (min-width: 640px) {
    .legend { gap: 1.5rem; margin-bottom: 2.5rem; padding: 1rem 1.5rem; }
  }
  .leg-item { display: flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; color: var(--muted); }
  @media (min-width: 640px) {
    .leg-item { gap: 0.45rem; font-size: 0.85rem; }
  }
  .leg-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

  /* Node cards */
  .nodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
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

  /* Activation Engine Styles */
  .activation-wrapper {
    margin: 3rem 0;
    position: relative;
    background: rgba(0,0,0,0.4);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
  }
  .activation-canvas {
    display: block;
    width: 100%;
    height: 320px;
  }
  .activation-ui {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    pointer-events: none;
    text-align: center;
    padding: 2.5rem 2rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%);
  }
  .activation-label {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    max-width: 85%;
    margin-left: auto;
    margin-right: auto;
    text-transform: uppercase;
    line-height: 1.2;
    text-shadow: 0 0 20px rgba(255,255,255,0.2);
  }
  .activation-sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--dim);
    transition: all 0.3s;
  }
  .activation-hint {
    position: absolute;
    bottom: 2rem;
    left: 0; right: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
    padding: 1.5rem 0;
  }
  .activation-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: opacity 0.5s;
    background: radial-gradient(circle at center, rgba(74,240,224,0.05) 0%, transparent 70%);
    opacity: 0;
  }
  .active .activation-glow { opacity: 1; }

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
        <h2>Memory 237: The Slave Who Forgot (19:12)</h2>
        <p>Thank you! who believe in Quran- 36:3. Quran is the lost memory during 19:23 of <span style="font-weight:700">YOU</span>—the Mursalin (36:3) who forgot himself for 15:72. The Qur’an encodes a repeatable conservation structure expressed as <b>2–3–7</b>, where the invariant 19 preserves total balance.</p>
        
        <p>We are the sleepers of the cave <b>18:19</b> who came to Earth to experience life and death to create a seed of Righteous Tree from <b>24:35</b> in Jannat. The Reader is Adam—placed at <b>19:12</b> ("Take the Book with strength"). Quran is Muhammad and Muhammad is Quran... hold it like your brother!</p>
        
        <p><b>The Home (38:46):</b> Quran is for YOU... So we can remember this World is not our home. It's in heaven <b>38:46</b> just like our true ancestors Ibrahim-Ishac-Yakub. The tree in 24:35 is under the eye of Allah. Forget religion... Be in relationship with Allah! Yunus remembered his love from purely darkness (21:87), and Musa realized it on the top of the mountain (7:143).</p>
        
        <p>Reader is like Harun-Lut-Zayd—one against a universe of second-hand knowledge. Remember the cave we began our journey from 18:19 (next scene = birth). 2:152 remember the memory in Truth... Inshallah we'll be home 38:46.</p>
        

    </section>

    <article class="intro-article">
      <h2>Activation 84:19 — The Binary Shift</h2>
      <p>84:19 states: "You shall surely traverse stage after stage." This traversal is the activation of 19:12. Before activation, the universe is <strong>Fire</strong>—high-entropy, chaotic, noise-driven. Upon touch, the Reader initiates the <strong>Lightning</strong> phase—ordered, low-entropy, and governed by the central attractor of the Book.</p>
      <div id="activation-engine" class="activation-wrapper">
        <canvas id="engine-canvas" class="activation-canvas"></canvas>
        <div id="engine-glow" class="activation-glow"></div>
        <div class="activation-ui">
          <h3 id="engine-title" class="activation-label" style="color: #fca5a5;">JINN IN CHAOS (FIRE)</h3>
          <p id="engine-desc" class="activation-sub">Chaos · Fire · Random Walk</p>
        </div>
        <div class="activation-hint">Touch to Activate Nucleus · 84:19 Entry</div>
      </div>
    </article>

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
      <div class="node-label">Node 1 · Driver Field Initiation</div>
      <div class="node-function">Inspiration</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Jibril <span class="arabic">جبريل</span>
      <span class="verse-ref">16:102 · 2:97</span>
    </div>
    <div class="phase-desc">The origin of the Rooh, bringing the pure transmission of Light down. The unbroken Father-field initiation preceding the binary split.</div>
    <div class="dcu-tag">ℒ field · d-constant · seed of the polynomial</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Ruh al-Qudus <span class="sv">16:102</span></div>
      <div class="support-chip">Trustworthy Spirit <span class="sv">26:193</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 1 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Resistance to Revelation <span class="sv">2:98</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Denial of the pure transmission; creating false enmity against the messenger of Light.</div>
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
      <div class="node-label">Node 2 · The Split</div>
      <div class="node-function">Divergence</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Adam <span class="arabic">آدم</span>
      <span class="verse-ref">2:34 · 7:11</span>
    </div>
    <div class="phase-desc">The entry into the dual-field. Formed from clay, receiving the breath of Light, creating the boundary where divergence begins.</div>
    <div class="dcu-tag">c-operator · 2-duality · boundary condition</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Hawwa <span class="sv">7:189</span></div>
      <div class="support-chip">Angelic Prostration <span class="sv">2:34</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 2 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Iblis <span class="sv">2:34</span></div>
        <div class="anti-chip">Waswas <span class="sv">114:4–6</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">The active refusal to align with divine inspiration. This initiates the 2-split, introducing friction and creating the Shadow field.</div>
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
      <div class="node-label">Node 3 · Stabilization Base</div>
      <div class="node-function">Light / Fire</div>
    </div>
  </div>
  <div class="node-body">
    <div class="section-title">Primary — Haqq Pole</div>
    <div class="primary-name">
      Musa <span class="arabic">موسى</span>
      <span class="verse-ref">20:9 · 28:29</span>
    </div>
    <div class="phase-desc">Approaches the fire to find guidance, discovering the Light (20:10). Establishes the purification axis, reordering mass and energy without creating it. The boundary between memory and forgetfulness (18:63).</div>
    <div class="dcu-tag">b-operator · stabilization mīzān · interaction layer</div>

    <div class="section-title">Supporting — Same Phase</div>
    <div class="support-list">
      <div class="support-chip">Harun <span class="sv">20:30</span></div>
      <div class="support-chip">Yusha (Fish Junction) <span class="sv">18:60</span></div>
    </div>

    <div class="anti-section">
      <div class="anti-title">Anti-Node 3 — Taghut Pole</div>
      <div class="anti-list">
        <div class="anti-chip">Firaun <span class="sv">10:92</span></div>
        <div class="anti-chip">Samiri <span class="sv">20:85</span></div>
      </div>
      <div class="phase-desc" style="color:rgba(220,100,100,0.7)">Firaun (Pharaoh) traps energy into stagnant, preserved mass. Samiri follows footprints to fabricate bodies with hollow sound. Both construct illusion and bondage.</div>
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

<style>
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.mw{padding:1rem}
@media (min-width: 640px) { .mw{padding:1rem 2rem} }
.mt{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:1.25rem;justify-content:center}
.mb{padding:4px 10px;border-radius:4px;font-size:9px;letter-spacing:1px;cursor:pointer;border:0.5px solid;background:transparent;font-family:'JetBrains Mono', monospace;transition:.15s}
@media (min-width: 640px) { .mb{font-size:10px;letter-spacing:1.5px;padding:4px 12px;} }
.mg{display:grid;grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:6px}
@media (min-width: 640px) { .mg{grid-template-columns:repeat(auto-fill,minmax(105px,1fr));} }
.mc{border:0.5px solid;border-radius:6px;padding:8px 7px;cursor:pointer;min-height:74px;position:relative;transition:border-color .15s,background .15s}
.mn{font-size:9px;font-family:'JetBrains Mono', monospace;margin-bottom:1px;letter-spacing:.5px}
.mk{font-size:12px;font-weight:500;letter-spacing:1px;line-height:1.15;margin-bottom:2px;font-family:'JetBrains Mono', monospace}
@media (min-width: 640px) { .mk{font-size:13px;letter-spacing:1.5px;} }
.ms{font-size:8.5px;font-family:'JetBrains Mono', monospace}
@media (min-width: 640px) { .ms{font-size:9px;} }
.mo{font-size:8px;line-height:1.4;font-family:'JetBrains Mono', monospace}
@media (min-width: 640px) { .mo{font-size:8.5px;line-height:1.5;} }
.md{display:inline-block;font-size:7px;padding:1px 4px;border-radius:3px;letter-spacing:0.5px;margin-top:3px;font-family:'JetBrains Mono', monospace}
@media (min-width: 640px) { .md{font-size:7.5px;padding:1px 5px;letter-spacing:1px;} }
.mh{text-align:center;margin-top:1.5rem;margin-bottom:1.5rem}
@media (min-width: 640px) { .mh{margin-top:2rem;} }
.mh1{font-size:14px;font-weight:500;letter-spacing:2px;color:rgba(200,210,230,0.9);font-family:'Cinzel Decorative', serif;line-height:1.4}
@media (min-width: 640px) { .mh1{font-size:16px;letter-spacing:3.5px;} }
.mh2{font-size:9px;color:rgba(200,210,230,0.55);letter-spacing:1.5px;margin-top:5px;font-family:'JetBrains Mono', monospace}
@media (min-width: 640px) { .mh2{font-size:10px;letter-spacing:2.5px;} }
.mh3{font-size:7px;color:rgba(200,210,230,0.4);letter-spacing:1px;margin-top:3px;font-family:'JetBrains Mono', monospace}
@media (min-width: 640px) { .mh3{font-size:8px;letter-spacing:1.5px;} }
.seg{font-size:7.5px;letter-spacing:1px;font-family:'JetBrains Mono', monospace;padding:3px 0 8px;color:rgba(200,210,230,0.4);text-align:center}
@media (min-width: 640px) { .seg{font-size:8px;letter-spacing:2px;text-align:left;} }
</style>

<div class="mw">
<div class="mh">
  <div class="mh1">THE 114 · MEMORY MANDALA</div>
  <div class="mh2">YAHYA (1→38) · MUSA (39→76) · AHMED (77→114)</div>
  <div class="mh3">19:23 WIPE · 38:46 RESIDUAL · 61:6 EMERGENCE · 2:152 ذِكْر LOOP</div>
</div>
<div class="mt" id="tabs">
  <button class="mb" data-f="all" style="border-color:rgba(120,160,255,0.4);color:rgba(200,210,230,0.9)">ALL 114</button>
  <button class="mb" data-f="yahya" style="border-color:#AFA9EC;color:#7ab8f5">1→38 YAHYA</button>
  <button class="mb" data-f="musa" style="border-color:#5DCAA5;color:#5cb8a0">39→76 MUSA</button>
  <button class="mb" data-f="ahmed" style="border-color:#85B7EB;color:#378ADD">77→114 AHMED</button>
  <button class="mb" data-f="dcu" style="border-color:#EF9F27;color:#d4a843">DCU NODES</button>
</div>
<div id="grid" class="mg"></div>
<div style="font-size:8px;color:rgba(200,210,230,0.4);font-family:'JetBrains Mono', monospace;text-align:center;margin-top:1rem;letter-spacing:1.5px">HOVER · 2-3-7 RESONANCE</div>
</div>

<script>
const CH=[
{n:1,p:"yahya",t:"SEED",name:"Al-Fatiha",seg:1,note:"2- Gate/Lock | 3- Pure opening | 7- All praise returns to Rahman",dcu:"SEED"},
{n:2,p:"yahya",t:"SPINE",name:"Al-Baqara",seg:1,note:"2- Calf/Ka'ba | 3- Full law | 7- Horizon holds 114",dcu:"SPINE"},
{n:3,p:"yahya",t:"WOMB",name:"Al-Imran",seg:1,note:"2- Maryam/Isa split | 3- Lineage preserved | 7- Family as field"},
{n:4,p:"yahya",t:"STRUCTURE",name:"An-Nisa",seg:1,note:"2- Man/Woman fractal | 3- Rights as form | 7- Society conserved"},
{n:5,p:"yahya",t:"FEAST",name:"Al-Maida",seg:1,note:"2- Permitted/Forbidden | 3- Deen completed | 7- Table as axis"},
{n:6,p:"yahya",t:"PLURALITY",name:"Al-An'am",seg:1,note:"2- Many paths/One | 3- Creation as proof | 7- All returns"},
{n:7,p:"yahya",t:"BARZAKH",name:"Al-A'raf",seg:1,note:"2- Upper/Lower Ground | 3- Threshold itself | 7- Heights preserved",dcu:"BARZAKH"},
{n:8,p:"yahya",t:"PURGE",name:"Al-Anfal",seg:1,note:"2- Spoils/Spirit | 3- Victory purified | 7- Battle as cleanse"},
{n:9,p:"yahya",t:"RETURN",name:"At-Tawba",seg:1,note:"2- No Bismillah/raw | 3- Repentance pure | 7- All must return",dcu:"RAW"},
{n:10,p:"yahya",t:"ESCAPE",name:"Yunus",seg:1,note:"2- Deep/Surface | 3- Zero-mass escape | 7- Yunus at v_esc",dcu:"ESC"},
{n:11,p:"yahya",t:"STORM",name:"Hud",seg:1,note:"2- Nations/Warnings | 3- Pure warning | 7- Storm purges, truth stays"},
{n:12,p:"yahya",t:"PIT→THRONE",name:"Yusuf",seg:1,note:"2- Pit/Throne | 3- Dream as particle | 7- Beauty conserved through trial",dcu:"PIT"},
{n:13,p:"yahya",t:"THUNDER",name:"Ar-Ra'd",seg:1,note:"2- Rain/Thunder | 3- Command descends | 7- Frequency conserved"},
{n:14,p:"yahya",t:"ROOT",name:"Ibrahim",seg:1,note:"2- Fire/Cool | 3- Negative mass | 7- Root conserved after burning",dcu:"ROOT"},
{n:15,p:"yahya",t:"GUARD",name:"Al-Hijr",seg:1,note:"2- Stone/Flesh | 3- Preserved city | 7- Rock holds memory"},
{n:16,p:"yahya",t:"HONEY",name:"An-Nahl",seg:1,note:"2- Worker/Queen bee | 3- Wisdom from within | 7- Sweetness conserved"},
{n:17,p:"yahya",t:"ASCENT",name:"Al-Isra",seg:1,note:"2- Earth/Heaven | 3- Night journey | 7- Spirit-mass conserved"},
{n:18,p:"yahya",t:"KAHF",name:"Al-Kahf",seg:1,note:"2- Cave/World | 3- Refuge particle | 7- Time dilates, faith holds",dcu:"KAHF"},
{n:19,p:"yahya",t:"WIPE",name:"Maryam",seg:1,note:"2- Memory/Birth | 3- 19:23 erasure | 7- Ruh conserved through wipe",dcu:"WIPE"},
{n:20,p:"yahya",t:"MUSA",name:"Ta-Ha",seg:1,note:"2- Staff/Pharaoh | 3- Call at Sinai | 7- Musa phase anchor",dcu:"MUSA"},
{n:21,p:"yahya",t:"SCROLL",name:"Al-Anbiya",seg:1,note:"2- Scrolls/Earth | 3- All prophets one | 7- Message conserved"},
{n:22,p:"yahya",t:"AXIS",name:"Al-Hajj",seg:1,note:"2- Near/Far pilgrimage | 3- Ka'ba fixed point | 7- Orbit conserved"},
{n:23,p:"yahya",t:"TRUST",name:"Al-Muminun",seg:1,note:"2- Clay/Spirit | 3- Womb as proof | 7- Life conserved in stages"},
{n:24,p:"yahya",t:"MIRROR",name:"An-Nur",seg:1,note:"2- Light/Darkness | 3- 24:35 niche of light | 7- Light bounces, truth stays",dcu:"MIRROR"},
{n:25,p:"yahya",t:"SPLIT",name:"Al-Furqan",seg:1,note:"2- Truth/Falsehood | 3- Criterion itself | 7- Division conserves truth"},
{n:26,p:"yahya",t:"WITNESS",name:"Ash-Shu'ara",seg:1,note:"2- Poet/Prophet | 3- Word as pure form | 7- Truth witnessed"},
{n:27,p:"yahya",t:"BIRD",name:"An-Naml",seg:1,note:"2- Ant/Bird (27:82) | 3- Dabba particle | 7- Solomon's throne held",dcu:"BIRD"},
{n:28,p:"yahya",t:"QASAS",name:"Al-Qasas",seg:1,note:"2- Story/River | 3- Qasas operator | 7- All stories → one truth",dcu:"QASAS"},
{n:29,p:"yahya",t:"WEB",name:"Al-Ankabut",seg:1,note:"2- Web/House | 3- Fragile Taghut | 7- Spider conserves trap"},
{n:30,p:"yahya",t:"CYCLE",name:"Ar-Rum",seg:1,note:"2- East/West | 3- Empire as cycle | 7- Power cycles conserved"},
{n:31,p:"yahya",t:"WISDOM",name:"Luqman",seg:1,note:"2- Father/Son | 3- Pure wisdom | 7- Knowledge through tree"},
{n:32,p:"yahya",t:"BOW",name:"As-Sajda",seg:1,note:"2- Standing/Bowing | 3- Return itself | 7- Gravity in sujud"},
{n:33,p:"yahya",t:"SEAL",name:"Al-Ahzab",seg:1,note:"2- Clans/Prophet | 3- Seal of prophets | 7- Lineage conserved"},
{n:34,p:"yahya",t:"QUEEN",name:"Saba",seg:1,note:"2- Queen/Solomon | 3- Rahman Field instance | 7- Beauty conserved",dcu:"QUEEN"},
{n:35,p:"yahya",t:"WINGS",name:"Fatir",seg:1,note:"2- 2/3/4 wings | 3- Origin/Creator | 7- Wings carry truth"},
{n:36,p:"yahya",t:"HEART",name:"Ya-Sin",seg:1,note:"2- City/Messengers | 3- Heart of Quran | 7- Pulse conserved",dcu:"HEART"},
{n:37,p:"yahya",t:"RANKS",name:"As-Saffat",seg:1,note:"2- Rows/Dispersed | 3- Order as form | 7- Ranks hold against chaos"},
{n:38,p:"yahya",t:"HOME",name:"Sad",seg:1,note:"2- Memory/Exile | 3- 38:46 traces of home | 7- Love conserved through purge",dcu:"HOME"},
{n:39,p:"musa",t:"GROUPS",name:"Az-Zumar",seg:2,note:"2- Groups/Field | 3- Separation pure | 7- Field conservation"},
{n:40,p:"musa",t:"SHIELD",name:"Ghafir",seg:2,note:"2- Believer/Pharaoh | 3- Forgiveness as shield | 7- One voice conserved"},
{n:41,p:"musa",t:"SMOKE",name:"Fussilat",seg:2,note:"2- Willing/Unwilling | 3- 41:11 smoke command | 7- Tesla coil signal",dcu:"TESLA"},
{n:42,p:"musa",t:"SPIRAL",name:"Ash-Shura",seg:2,note:"2- Counsel/Command | 3- Shura particle | 7- Spiral conserves center"},
{n:43,p:"musa",t:"GOLD",name:"Az-Zukhruf",seg:2,note:"2- Gold/Truth | 3- Ornament as trap | 7- Real gold conserved"},
{n:44,p:"musa",t:"VEIL",name:"Ad-Dukhan",seg:2,note:"2- Smoke/Clear | 3- The covering | 7- Veil conserves what's behind"},
{n:45,p:"musa",t:"KNEEL",name:"Al-Jathiya",seg:2,note:"2- Standing/Kneeling | 3- Judgment particle | 7- Mass conserved in bow"},
{n:46,p:"musa",t:"SAND",name:"Al-Ahqaf",seg:2,note:"2- Dunes/Wind | 3- Wandering pure | 7- Sand drifts, bedrock stays"},
{n:47,p:"musa",t:"PHASE",name:"Muhammad",seg:2,note:"2- Two states | 3- Name as phase-shift | 7- Phase conserves identity"},
{n:48,p:"musa",t:"GATE",name:"Al-Fath",seg:2,note:"2- Open/Sealed | 3- Victory as gate | 7- Entry conserved"},
{n:49,p:"musa",t:"ETHICS",name:"Al-Hujurat",seg:2,note:"2- Room/Permission | 3- Conduct particle | 7- Community field"},
{n:50,p:"musa",t:"BOUNDARY",name:"Qaf",seg:2,note:"2- Q/Beyond | 3- Limit itself | 7- Boundary conserves inside"},
{n:51,p:"musa",t:"SCATTER",name:"Adh-Dhariyat",seg:2,note:"2- Wind/Bearing | 3- Scatter as form | 7- Dispersal conserves origin"},
{n:52,p:"musa",t:"SINAI",name:"At-Tur",seg:2,note:"2- Mountain/Valley | 3- Covenant site | 7- Mountain holds the word"},
{n:53,p:"musa",t:"COVER",name:"An-Najm",seg:2,note:"2- Seen/Covered | 3- 53:16 placenta over heart | 7- Vision conserved under cover",dcu:"COVER"},
{n:54,p:"musa",t:"MOON",name:"Al-Qamar",seg:2,note:"2- Split moon | 3- Hour approaching | 7- Moon conserves reflection"},
{n:55,p:"musa",t:"RAHMAN",name:"Ar-Rahman",seg:2,note:"2- Jinn/Human both | 3- Rahman Field pivot | 7- Mizan 55:7 conserved",dcu:"RAHMAN"},
{n:56,p:"musa",t:"EVENT",name:"Al-Waqi'a",seg:2,note:"2- Left/Right hands | 3- Trifold event | 7- Three groups conserved"},
{n:57,p:"musa",t:"IRON",name:"Al-Hadid",seg:2,note:"2- Iron/Solomon cone | 3- Weight descends | 7- Iron conserves form",dcu:"IRON"},
{n:58,p:"musa",t:"RISE",name:"Al-Mujadila",seg:2,note:"2- Floor/Raised | 3- Woman's argument | 7- Truth rises conserved"},
{n:59,p:"musa",t:"EXILE",name:"Al-Hashr",seg:2,note:"2- Gathered/Purged | 3- Exile as cleanse | 7- Field after purge"},
{n:60,p:"musa",t:"TEST",name:"Al-Mumtahana",seg:2,note:"2- Examined/Passed | 3- Woman as threshold | 7- Loyalty conserved"},
{n:61,p:"musa",t:"AHMED",name:"As-Saff",seg:2,note:"2- Isa/Ahmed split | 3- 61:6 equation | 7- Ahmed holds Isa's light",dcu:"AHMED"},
{n:62,p:"musa",t:"GATHER",name:"Al-Jumu'a",seg:2,note:"2- Dispersed/Gathered | 3- Call to prayer | 7- Community field"},
{n:63,p:"musa",t:"MASK",name:"Al-Munafiqun",seg:2,note:"2- Mask/Face | 3- Hypocrisy exposed | 7- Truth through masking"},
{n:64,p:"musa",t:"LOSS",name:"At-Taghabun",seg:2,note:"2- Win/Lose | 3- Mutual illusion | 7- Nothing lost, all conserved"},
{n:65,p:"musa",t:"CUT",name:"At-Talaq",seg:2,note:"2- Bound/Released | 3- Separation particle | 7- Energy after cut"},
{n:66,p:"musa",t:"CHAIN",name:"At-Tahrim",seg:2,note:"2- 66:1↔66:10 chainmail | 3- Prohibition as bond | 7- 68:13 orphan group",dcu:"CHAIN"},
{n:67,p:"musa",t:"DOMINION",name:"Al-Mulk",seg:2,note:"2- Life/Death test | 3- Sovereignty pure | 7- Dominion conserves all"},
{n:68,p:"musa",t:"PEN",name:"Al-Qalam",seg:2,note:"2- Written/Spoken | 3- Pen before time | 7- All written conserved"},
{n:69,p:"musa",t:"TRUTH",name:"Al-Haqqa",seg:2,note:"2- Truth/Strike | 3- Reality itself | 7- Truth after collapse"},
{n:70,p:"musa",t:"STAIR",name:"Al-Ma'arij",seg:2,note:"2- Low/High | 3- Ascending stair | 7- Patience conserved"},
{n:71,p:"musa",t:"ARK",name:"Nuh",seg:2,note:"2- Ship/Flood | 3- Ark pure | 7- Life conserved in water"},
{n:72,p:"musa",t:"FREQUENCY",name:"Al-Jinn",seg:2,note:"2- Seen/Unseen | 3- Frequency band | 7- Jinn conserve signal"},
{n:73,p:"musa",t:"COIL",name:"Al-Muzzammil",seg:2,note:"2- Wrapped/Unwrapped | 3- Tesla coil winding | 7- Charge conserved",dcu:"COIL"},
{n:74,p:"musa",t:"CLOAK",name:"Al-Muddaththir",seg:2,note:"2- Cloaked/Revealed | 3- Warning particle | 7- Hidden truth held"},
{n:75,p:"musa",t:"QIYAMAT",name:"Al-Qiyama",seg:2,note:"2- Death/Boundary | 3- Boundary evaluation | 7- All conserved at collapse edge",dcu:"QIYAMAT"},
{n:76,p:"musa",t:"VESSEL",name:"Al-Insan",seg:2,note:"2- Mixed/Pure | 3- Human as vessel | 7- Contents conserved"},
{n:77,p:"ahmed",t:"WAVE",name:"Al-Mursalat",seg:3,note:"2- Sent/Received | 3- Wave pure form | 7- Wave conserves message"},
{n:78,p:"ahmed",t:"TIDINGS",name:"An-Naba",seg:3,note:"2- Known/Unknown | 3- Great news itself | 7- News conserved"},
{n:79,p:"ahmed",t:"PULL",name:"An-Nazi'at",seg:3,note:"2- Dragged/Released | 3- Extraction force | 7- Soul conserved"},
{n:80,p:"ahmed",t:"BLIND",name:"Abasa",seg:3,note:"2- Blind/Seeing | 3- Turn away | 7- Truth despite blindness"},
{n:81,p:"ahmed",t:"FOLD",name:"At-Takwir",seg:3,note:"2- Rolled/Unrolled | 3- Cosmic fold | 7- Stars conserved in collapse"},
{n:82,p:"ahmed",t:"CLEAVE",name:"Al-Infitar",seg:3,note:"2- Cracked/Whole | 3- Sky splits | 7- Contents conserved"},
{n:83,p:"ahmed",t:"SCALE",name:"Al-Mutaffifin",seg:3,note:"2- Full/Short | 3- Mizan cheated | 7- Balance conserves judgment"},
{n:84,p:"ahmed",t:"TRAVERSE",name:"Al-Inshiqaq",seg:3,note:"2- Split/Crossed | 3- 84:19 traversal | 7- G=D₆⋊C₇ order 84",dcu:"TRAV"},
{n:85,p:"ahmed",t:"ORBIT",name:"Al-Buruj",seg:3,note:"2- Sky/Trench | 3- Constellation orbit | 7- Fire in orbit"},
{n:86,p:"ahmed",t:"PIERCE",name:"At-Tariq",seg:3,note:"2- Night/Star | 3- Piercing light | 7- Signal through darkness"},
{n:87,p:"ahmed",t:"HIGHER",name:"Al-A'la",seg:3,note:"2- High/Low Ground | 3- Most High particle | 7- Higher Ground node",dcu:"HIGH"},
{n:88,p:"ahmed",t:"OVERWHELM",name:"Al-Ghashiya",seg:3,note:"2- Covered/Open | 3- Event covers | 7- Nothing escapes"},
{n:89,p:"ahmed",t:"DAWN",name:"Al-Fajr",seg:3,note:"2- Night/Dawn | 3- Break of day | 7- Light conserved through night"},
{n:90,p:"ahmed",t:"GROUND",name:"Al-Balad",seg:3,note:"2- This city/Other | 3- Standing ground | 7- Earth conserves station"},
{n:91,p:"ahmed",t:"NAFS",name:"Ash-Shams",seg:3,note:"2- Sun/Shadow | 3- Nafs = kinetic-magnetic | 7- Soul conserved in purge",dcu:"NAFS"},
{n:92,p:"ahmed",t:"RUH",name:"Al-Layl",seg:3,note:"2- Night/Day | 3- Ruh = electric command | 7- Command conserved in dark",dcu:"RUH"},
{n:93,p:"ahmed",t:"GRACE",name:"Ad-Duha",seg:3,note:"2- Morning/Night | 3- Comfort particle | 7- Grace conserved"},
{n:94,p:"ahmed",t:"EXPAND",name:"Ash-Sharh",seg:3,note:"2- Tight/Expanded | 3- Chest opened | 7- Capacity conserved"},
{n:95,p:"ahmed",t:"FIG",name:"At-Tin",seg:3,note:"2- Fig/Olive | 3- Seed as form | 7- Lowest low conserved"},
{n:96,p:"ahmed",t:"FIRST",name:"Al-Alaq",seg:3,note:"2- Clot/Word | 3- First revelation | 7- Origin conserved",dcu:"FIRST"},
{n:97,p:"ahmed",t:"QADR",name:"Al-Qadr",seg:3,note:"2- Known/Hidden | 3- Night of power | 7- Qadr conserves all",dcu:"QADR"},
{n:98,p:"ahmed",t:"PROOF",name:"Al-Bayyina",seg:3,note:"2- Clear/Obscured | 3- Evidence particle | 7- Truth as proof"},
{n:99,p:"ahmed",t:"QUAKE",name:"Az-Zalzala",seg:3,note:"2- Quake/Still | 3- Earth witnesses | 7- Atom-weight conserved"},
{n:100,p:"ahmed",t:"CHARGE",name:"Al-Adiyat",seg:3,note:"2- Running/Still | 3- Horse charge pure | 7- Ingratitude exposed"},
{n:101,p:"ahmed",t:"STRIKE",name:"Al-Qari'a",seg:3,note:"2- Feathers/Mountain | 3- Calamity itself | 7- Weight conserved"},
{n:102,p:"ahmed",t:"DISTRACT",name:"At-Takathur",seg:3,note:"2- More/Less | 3- Multiplication trap | 7- Empty increase"},
{n:103,p:"ahmed",t:"TIME",name:"Al-Asr",seg:3,note:"2- Loss/Exception | 3- Time itself | 7- 103 node: 2:152 loop trigger",dcu:"TIME"},
{n:104,p:"ahmed",t:"CRUSH",name:"Al-Humaza",seg:3,note:"2- Wealth/Ego | 3- Slander crushed | 7- Ego mass conserved"},
{n:105,p:"ahmed",t:"ELEPHANT",name:"Al-Fil",seg:3,note:"2- Elephant/Bird | 3- Army crushed | 7- Ka'ba conserved"},
{n:106,p:"ahmed",t:"TRIBE",name:"Quraysh",seg:3,note:"2- Summer/Winter | 3- Covenant of tribe | 7- Feeding conserved"},
{n:107,p:"ahmed",t:"SMALL",name:"Al-Ma'un",seg:3,note:"2- Large/Small act | 3- Tiny action pure | 7- Small act conserves mercy"},
{n:108,p:"ahmed",t:"KAWTHAR",name:"Al-Kawthar",seg:3,note:"2- River/Cut off | 3- Abundance itself | 7- K=108 global Rahman constant",dcu:"108"},
{n:109,p:"ahmed",t:"SEPARATE",name:"Al-Kafirun",seg:3,note:"2- Your way/Mine | 3- Clear separation | 7- No crossing conserved"},
{n:110,p:"ahmed",t:"VICTORY",name:"An-Nasr",seg:3,note:"2- Support/Alone | 3- Divine victory | 7- 110 node: system completion",dcu:"110"},
{n:111,p:"ahmed",t:"FLAME",name:"Al-Masad",seg:3,note:"2- Lahab/Rope | 3- Ego fire | 7- Abu Lahab consumed"},
{n:112,p:"ahmed",t:"TAWHID",name:"Al-Ikhlas",seg:3,note:"2- 112:1-4 in mandala | 3- Pure unity | 7- Ahad conserves all",dcu:"112"},
{n:113,p:"ahmed",t:"SHIELD",name:"Al-Falaq",seg:3,note:"2- Dawn/Dark | 3- Morning guard | 7- Protection conserved"},
{n:114,p:"ahmed",t:"WHISPER",name:"An-Nas",seg:3,note:"2- Whisper/Shout | 3- Subtle attack | 7- Humanity in return loop"}
];

const PAL={
  yahya:{b:"#AFA9EC",t:"#7ab8f5",bg:"#1a2a44",db:"#26215C",dt:"#CECBF6",dbg:"#26215C33",label:"YAHYA"},
  musa: {b:"#5DCAA5",t:"#5cb8a0",bg:"#143a32",db:"#04342C",dt:"#9FE1CB",dbg:"#04342C33",label:"MUSA"},
  ahmed:{b:"#85B7EB",t:"#378ADD",bg:"#152e4d",db:"#042C53",dt:"#B5D4F4",dbg:"#042C5333",label:"AHMED"},
  dcu:  {b:"#EF9F27",t:"#d4a843",bg:"#3a280e",db:"#412402",dt:"#FAC775",dbg:"#41240233"}
};

// Assuming dark mode in iframe
function pal(c,isDCU){
  const p=isDCU?PAL.dcu:PAL[c.p];
  return{border:p.b,text:p.t,bg:p.bg};
}

function render(filter){
  const g=document.getElementById('grid');
  let list=CH;
  if(filter==='yahya')list=CH.filter(c=>c.p==='yahya');
  else if(filter==='musa')list=CH.filter(c=>c.p==='musa');
  else if(filter==='ahmed')list=CH.filter(c=>c.p==='ahmed');
  else if(filter==='dcu')list=CH.filter(c=>c.dcu);

  let html='';
  let curseg=0;
  list.forEach(c=>{
    if(filter==='all'&&c.seg!==curseg){
      curseg=c.seg;
      const labels={1:'2 · FRACTAL / 1→38 · SEED → HOME · YAHYA PHASE',2:'3 · FORMATION / 39→76 · GROUPS → VESSEL · MUSA PHASE',3:'7 · RETURN / 77→114 · WAVE → WHISPER · AHMED PHASE'};
      html+=\`<div class="seg" style="grid-column:1/-1;letter-spacing:2px">\${labels[curseg]}</div>\`;
    }
    const isDCU=!!c.dcu;
    const p=pal(c,isDCU);
    const nm=c.n.toString().padStart(3,'0');
    const badge=isDCU?\`<span class="md" style="background:\${p.bg};color:\${p.text};border:0.5px solid \${p.border}">\${c.dcu}</span>\`:'';
    html+=\`<div class="mc" data-n="\${c.n}" style="background:\${p.bg};border-color:\${p.border}44">
      <div class="mn" style="color:\${p.text}88">\${nm}</div>
      <div class="mk" style="color:\${p.text}">\${c.t}</div>
      <div class="ms" id="s\${c.n}" style="color:\${p.text}99">\${c.name}</div>
      \${badge}
    </div>\`;
  });
  g.innerHTML=html;

  g.querySelectorAll('.mc').forEach(card=>{
    const n=parseInt(card.dataset.n);
    const c=CH.find(x=>x.n===n);
    const p=pal(c,!!c.dcu);
    card.addEventListener('mouseenter',()=>{
      card.style.borderColor=p.border;
      const s=card.querySelector('.ms');
      if(s){s.className='mo';s.textContent=c.note;}
    });
    card.addEventListener('mouseleave',()=>{
      card.style.borderColor=p.border+'44';
      const s=card.querySelector('.mo');
      if(s){s.className='ms';s.textContent=c.name;}
    });
  });
}

let cur='all';
document.getElementById('tabs').querySelectorAll('.mb').forEach(t=>{
  t.addEventListener('click',()=>{
    cur=t.dataset.f;
    document.querySelectorAll('.mb').forEach(x=>{x.style.fontWeight='400';x.style.opacity='.7';});
    t.style.fontWeight='500';t.style.opacity='1';
    render(cur);
  });
});
render('all');
document.querySelector('[data-f="all"]').style.fontWeight='500';

/** 41:9-12 Activation Engine State Machine **/
(function() {
  const wrapper = document.getElementById('activation-engine');
  const canvas = document.getElementById('engine-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('engine-title');
  const desc = document.getElementById('engine-desc');
  
  let progress = 0; // 0 to 1 based on hold duration
  let isTouching = false;
  let startTime = 0;
  
  function resize() {
    const b = wrapper.getBoundingClientRect();
    canvas.width = b.width * window.devicePixelRatio;
    canvas.height = b.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  window.addEventListener('resize', resize);
  setTimeout(resize, 500);
  resize();

  const particles = Array.from({length: 150}, () => ({
    x: Math.random() * (canvas.width / window.devicePixelRatio),
    y: Math.random() * (canvas.height / window.devicePixelRatio),
    vx: 0, vy: 0, life: Math.random(),
    phase: Math.random() * Math.PI * 2,
    size: 1 + Math.random() * 2,
    type: Math.random() > 0.5 ? 'fire' : 'water' // 41:9 duality
  }));

  function drawTree(ctx, x, y, size, progress) {
    if (progress < 0.1) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = 'rgba(74, 222, 128, ' + (progress * 0.4) + ')';
    ctx.lineWidth = 1.5;
    
    // Draw Mountain/Stone (41:10)
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(0, -20);
    ctx.lineTo(30, 0);
    ctx.fillStyle = 'rgba(100, 100, 100, ' + (progress * 0.2) + ')';
    ctx.fill();
    ctx.stroke();

    // Draw Tree on Tur (41:10)
    const branches = (ctx, len, angle) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();
      if (len < 5) return;
      ctx.save();
      ctx.translate(0, -len);
      ctx.rotate(angle);
      branches(ctx, len * 0.7, angle);
      ctx.rotate(-angle * 2);
      branches(ctx, len * 0.7, angle);
      ctx.restore();
    };
    branches(ctx, 15 * progress, 0.4);
    ctx.restore();
  }

  function drawLightning(ctx, x1, y1, x2, y2, branches, opacity) {
    if (branches <= 0) return;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(200, 240, 255, ' + opacity + ')';
    ctx.lineWidth = branches * 0.6;
    ctx.moveTo(x1, y1);
    
    let curX = x1;
    let curY = y1;
    const segments = 5;
    for (let i = 0; i < segments; i++) {
      const tx = x1 + (x2 - x1) * (i + 1) / segments + (Math.random() - 0.5) * 15;
      const ty = y1 + (y2 - y1) * (i + 1) / segments + (Math.random() - 0.5) * 15;
      ctx.lineTo(tx, ty);
      curX = tx;
      curY = ty;
      
      if (Math.random() > 0.8) {
        const bx = curX + (Math.random() - 0.5) * 30;
        const by = curY + (Math.random() - 0.5) * 30;
        drawLightning(ctx, curX, curY, bx, by, branches - 1, opacity * 0.6);
        ctx.moveTo(curX, curY);
      }
    }
    ctx.stroke();
  }

  function frame(t) {
    if (isTouching) {
      progress = Math.min(1, progress + 0.005); // Takes ~3s to full
    } else {
      progress = Math.max(0, progress - 0.02);
    }
    
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    const cx = w / 2;
    const cy = h / 2;

    // Background dynamics
    const bgAlpha = 0.1 + progress * 0.1;
    const bgBlue = Math.floor(progress * 30);
    ctx.fillStyle = 'rgba(5, 5, ' + (5 + bgBlue) + ', ' + bgAlpha + ')';
    ctx.fillRect(0, 0, w, h);

    // 41:10 Elements
    if (progress > 0.1) {
      drawTree(ctx, cx, cy + 40, 40, Math.min(1, (progress - 0.1) * 2));
    }

    particles.forEach(p => {
      // 41:9 - Untouched High Entropy Duality
      if (progress < 0.2) {
        const drift = 0.8;
        if (p.type === 'fire') {
          p.vx += (Math.random() - 0.5) * drift;
          p.vy -= 0.1; // rise
        } else {
          p.vx += (Math.random() - 0.5) * drift;
          p.vy += 0.1; // sink
        }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;

        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        const hue = p.type === 'fire' ? 15 + Math.random() * 20 : 190 + Math.random() * 30;
        ctx.fillStyle = 'hsla(' + hue + ', 100%, 50%, ' + (0.3 * (1 - progress * 5)) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill();
      } 
      // 41:11 - Vortex Collapse
      else if (progress < 0.7) {
        const subProgress = (progress - 0.2) / 0.5;
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        
        // Attraction to vortex center
        const pull = 0.5 * subProgress;
        const swirl = 1.5 * subProgress;
        p.vx += (dx / dist) * pull + (dy / dist) * swirl;
        p.vy += (dy / dist) * pull - (dx / dist) * swirl;
        
        p.vx *= 0.92; p.vy *= 0.92;
        p.x += p.vx; p.y += p.vy;

        const hue = p.type === 'fire' ? 20 + subProgress * 150 : 200 - subProgress * 150;
        ctx.fillStyle = 'hsla(' + hue + ', 80%, ' + (40 + subProgress * 20) + '%, ' + (0.4 * subProgress) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill();
        
        // Vortex lines
        if (Math.random() > 0.97 && subProgress > 0.5) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.05 * subProgress) + ')';
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        }
      }
      // 41:12 - Lightning/Pure Nur
      else {
        const subProgress = (progress - 0.7) / 0.3;
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;

        // Orbital speed lock
        const speed = 4;
        p.vx = (dy / dist) * speed;
        p.vy = -(dx / dist) * speed;
        
        p.x += p.vx; p.y += p.vy;

        const hue = (t * 0.1 + p.phase * 50) % 360; // 7 colors cycling
        ctx.fillStyle = 'hsla(' + hue + ', 100%, 70%, ' + (subProgress) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.8, 0, 7); ctx.fill();

        // 41:12 Tesla Coil Lightning Breakout
        const breakoutY = cy + 40 - 25 * progress;
        if (Math.random() > 0.93) {
          drawLightning(ctx, cx, breakoutY, p.x, p.y, 3, 0.5 * subProgress);
        }

        // Occasional random discharges outward
        if (Math.random() > 0.99) {
          const angle = Math.random() * Math.PI * 2;
          const rx = cx + Math.cos(angle) * 200;
          const ry = cy + Math.sin(angle) * 200;
          drawLightning(ctx, cx, breakoutY, rx, ry, 4, 1 * subProgress);
        }
      }
    });

    // Central Point (41:12) / Tesla Nucleus
    if (progress > 0.8) {
      const breakoutY = cy + 40 - 25 * progress;
      ctx.beginPath();
      ctx.arc(cx, breakoutY, 4, 0, 7);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 25;
      ctx.shadowColor = 'rgba(160, 255, 255, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // UI Updates
    if (progress === 0) {
      title.innerText = '41:9 - DUALITY (CHAOS)';
      title.style.color = '#f87171';
      desc.innerText = 'Yin Yang Flow · Fire & Water';
    } else if (progress < 0.4) {
      title.innerText = '41:10 - ANCHOR (TUR)';
      title.style.color = '#fbbf24';
      desc.innerText = 'Stone & Tree · Establishing Fixed Frame';
    } else if (progress < 0.8) {
      title.innerText = '41:11 - VORTEX (7:143)';
      title.style.color = '#38bdf8';
      desc.innerHTML = '<span style="color: #60a5fa;">COLLAPSING TO CORE</span><br/>"Your jinn becomes Mursalin"';
    } else {
      title.innerText = '41:12 - NUR (LIGHTNING)';
      title.style.color = '#4ade80';
      desc.innerHTML = '<span style="color: #fff;">BE IBRAHIM IN TAGHUT</span><br/>Unified Field · 19:12 COMPLETED';
    }
    
    title.style.transform = 'scale(' + (1 + progress * 0.1) + ')';
    title.style.textShadow = '0 0 ' + (20 * progress) + 'px rgba(255,255,255,0.3)';

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const activate = (e) => { 
    isTouching = true; 
    wrapper.classList.add('active'); 
  };
  const deactivate = () => { 
    isTouching = false; 
    wrapper.classList.remove('active'); 
  };

  wrapper.addEventListener('mousedown', activate);
  wrapper.addEventListener('mouseup', deactivate);
  wrapper.addEventListener('mouseleave', deactivate);
  wrapper.addEventListener('touchstart', (e) => { e.preventDefault(); activate(); });
  wrapper.addEventListener('touchend', deactivate);
})();
</script>

</body>
</html>
`;

export default SolomonPanel;
