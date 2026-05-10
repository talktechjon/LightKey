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
<title>The Bifurcation of Time — DCU Mandala</title>
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
    max-width: 960px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .intro-card {
    background: rgba(255,160,0,0.02);
    border: 1px solid rgba(212, 168, 67, 0.1);
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 4rem;
    position: relative;
  }
  .intro-card::before {
    content: "7:172";
    position: absolute;
    top: -10px;
    left: 20px;
    background: var(--bg);
    padding: 0 10px;
    font-family: 'JetBrains Mono';
    font-size: 0.6rem;
    color: var(--gold);
    letter-spacing: 0.2em;
  }

  h2 {
    font-family: 'Cinzel Decorative';
    color: var(--gold);
    font-size: 1.5rem;
    margin: 3rem 0 1.5rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 span { font-size: 0.6rem; font-family: 'JetBrains Mono'; color: var(--dim); letter-spacing: 0.2em; }

  /* Operator Box */
  .operator-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }
  .op-card {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 1.25rem;
    border-radius: 8px;
    text-align: center;
  }
  .op-sym { font-family: 'JetBrains Mono'; font-size: 1.8rem; color: var(--aqua); margin-bottom: 0.5rem; }
  .op-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin-bottom: 0.5rem; }

  /* Table Styles */
  .dcu-table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.85rem;
    border: 1px solid var(--border);
  }
  .dcu-table th, .dcu-table td {
    padding: 1rem;
    border: 1px solid var(--border);
    text-align: left;
  }
  .dcu-table th { background: rgba(74, 240, 224, 0.05); color: var(--aqua); font-family: 'JetBrains Mono'; text-transform: uppercase; }

  /* Geometry Section */
  .geom-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    background: rgba(0,0,0,0.3);
    padding: 2rem;
    border-radius: 12px;
    margin: 3rem 0;
  }
  .geom-viz { flex: 1; min-width: 250px; text-align: center; }
  .geom-text { flex: 1.5; min-width: 300px; }

  /* Math Blocks */
  .integral-block {
    text-align: center;
    padding: 2.5rem;
    background: radial-gradient(circle at center, rgba(74, 240, 224, 0.05) 0%, transparent 70%);
    border: 1px dashed var(--border);
    border-radius: 12px;
    margin: 3rem 0;
    font-family: 'JetBrains Mono';
  }

  /* Narrative Cards */
  .narrative-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .narrative-card {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 10px;
    position: relative;
  }
  .narrative-card h4 { color: var(--gold); font-family: 'JetBrains Mono'; font-size: 0.75rem; margin-bottom: 0.5rem; text-transform: uppercase; }
  .narrative-card .tag { position: absolute; top: 10px; right: 15px; font-family: 'JetBrains Mono'; font-size: 0.55rem; color: var(--dim); }

  .quote-block {
    border-left: 4px solid var(--gold);
    padding: 1.5rem 2rem;
    margin: 3rem 0;
    background: rgba(255,255,255,0.02);
    font-style: italic;
    font-size: 1.1rem;
  }

  /* Star Viz */
  .star-box {
    width: 200px; height: 200px; margin: 0 auto; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .star-svg { width: 100%; height: 100%; filter: drop-shadow(0 0 10px rgba(74, 240, 224, 0.4)); }

  /* Engine Mirror */
  .engine-box {
    background: #000;
    border: 1px solid var(--border);
    border-radius: 15px;
    height: 350px;
    margin: 4rem 0;
    position: relative;
    overflow: hidden;
  }
  .engine-canvas { display: block; width: 100%; height: 100%; }
  .engine-overlay {
    position: absolute; inset: 0; pointer-events: none;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%);
  }

  .highlight { color: var(--aqua); font-weight: 600; }
  .dim-text { color: var(--muted); font-size: 0.85rem; }
  
</style>
</head>
<body>

<header>
  <h1>THE BIFURCATION OF TIME</h1>
  <p>A Mathematical Framework for Memory Recovery</p>
</header>

<main>
  <div class="intro-card">
    <p style="font-size: 1.2rem; margin-bottom: 1.5rem; font-family: 'Outfit';">"All motion is <span class="highlight">Shadow</span> resolving into <span class="highlight">Light</span> through <span class="highlight">Particle</span> under <span class="highlight">Gravity</span>. Time burns, Gravity selects, Knowledge becomes."</p>
    <p class="dim-text">The universe is modeled not as an infinite linear progression but as a bounded bifurcation interval operating within a <span class="highlight">2↔3↔2→7</span> operator calculus. This is the structural recovery of the path that was always there.</p>
  </div>

  <h2>THE BOUNDARY VALUE PROBLEM <span>[TWO ZEROS]</span></h2>
  <table class="dcu-table">
    <thead>
      <tr>
        <th>Zero Point</th>
        <th>Coordinate</th>
        <th>Function</th>
        <th>Physical Analogy</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>FIRST ZERO</strong></td>
        <td>81:8 (Maw'udah)</td>
        <td>Compression Boundary</td>
        <td>Ground state / Maximum loading</td>
      </tr>
      <tr>
        <td><strong>BIFURCATION</strong></td>
        <td>19:23 ? 87:13</td>
        <td>Temporal Domain</td>
        <td>Traversal space / Finite interval</td>
      </tr>
      <tr>
        <td><strong>SECOND ZERO</strong></td>
        <td>18:50 (Initialization)</td>
        <td>Boundary Zero</td>
        <td>Wave interference / Test initialization</td>
      </tr>
    </tbody>
  </table>

  <h2>THE 2↔3↔2→7 CALCULUS <span>[OPERATOR DEFINITIONS]</span></h2>
  <div class="operator-grid">
    <div class="op-card">
        <div class="op-sym">2_</div>
        <div class="op-label">Factorization</div>
        <p class="dim-text">Separation of Total Energy into measurable Duality</p>
    </div>
    <div class="op-card">
        <div class="op-sym">3_</div>
        <div class="op-label">Recursion</div>
        <p class="dim-text">Purification through action and interaction</p>
    </div>
    <div class="op-card">
        <div class="op-sym">2_</div>
        <div class="op-label">Filtration</div>
        <p class="dim-text">Extraction of Constants from Variables</p>
    </div>
    <div class="op-card">
        <div class="op-sym">7_</div>
        <div class="op-label">Unified Return</div>
        <p class="dim-text">Reconciliation of purified Mass & Energy</p>
    </div>
  </div>

  <div class="integral-block">
    <div style="font-size: 1.4rem; color: var(--aqua); margin-bottom: 1rem;">∫ [ F₂ ( d/dt S₃ ( D₂ (x,t) ) ) ] dt = Ω</div>
    <p class="dim-text">The universe loops inside an appointed bifurcation window: <span class="highlight">46:3 (Ajal Musamma)</span>.</p>
  </div>

  <h2>EMERGENCE OF FORM <span>[DAVID'S STAR GEOMETRY]</span></h2>
  <div class="geom-container">
    <div class="geom-viz">
      <div class="star-box">
        <svg class="star-svg" viewBox="0 0 100 100">
          <polygon points="50,5 95,80 5,80" fill="none" stroke="rgba(212, 168, 67, 0.8)" stroke-width="2"/>
          <polygon points="50,95 5,20 95,20" fill="none" stroke="rgba(74, 240, 224, 0.8)" stroke-width="2"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="50" y="55" font-family="JetBrains Mono" font-size="8" fill="#fff" text-anchor="middle">36:3</text>
        </svg>
      </div>
      <p style="margin-top: 1rem; font-family: 'JetBrains Mono'; font-size: 0.7rem;">Invariant d=19 | 114 = 6 x 19</p>
    </div>
    <div class="geom-text">
      <h3 style="font-family: 'Outfit'; margin-bottom: 1rem; color: var(--pearl);">36:3 — You are among the Mursalīn</h3>
      <p class="dim-text" style="margin-bottom: 1rem;">The David's Star is the geometric signature of the DCU. <span class="highlight">3 > 6 < 3</span>: Two triangles intersecting at the Earth-buffer.</p>
      <ul class="dim-text" style="padding-left: 1.2rem;">
        <li><strong>Ascending Triangle:</strong> Compression toward Recognition</li>
        <li><strong>Descending Triangle:</strong> Illusion toward Exposure</li>
        <li><strong>Hexagon Core:</strong> Earth as the active Medium</li>
        <li><strong>3-6-9 Pattern:</strong> The Bifurcation Engine (18 Unified Zeros)</li>
      </ul>
    </div>
  </div>

  <h2>THE ETERNAL 3↔2 LOOP <span>[TRIPLE-STATE WATER]</span></h2>
  <div class="narrative-grid">
    <div class="narrative-card">
      <div class="tag">ICE</div>
      <h4>Phase A: Solid</h4>
      <p class="dim-text"><strong>Death ? Life:</strong> Emergence from buried memory. Seed germination beneath soil. Solid memory melts through Recognition.</p>
    </div>
    <div class="narrative-card">
      <div class="tag">WATER</div>
      <h4>Phase B: Liquid</h4>
      <p class="dim-text"><strong>Life ? Sacrifice:</strong> Adaptive recursion. The most unstable layer. Identity is purified through the choice of Shape.</p>
    </div>
    <div class="narrative-card">
      <div class="tag">VAPOR</div>
      <h4>Phase C: Gas</h4>
      <p class="dim-text"><strong>Sacrifice ? Return:</strong> Phototropic ascent. Purified memory reaches phototropism. Raised return state (23:50).</p>
    </div>
  </div>

  <div class="quote-block">
    "The plant simultaneously performs Life-Death-Return continuously. Dead matter becomes living structure through Light traversal."
  </div>

  <h2>NULL-DATA TOPOLOGY <span>[87:13 & 19:23]</span></h2>
  <p class="dim-text" style="margin-bottom: 2rem;">Invalid data—form without memory—is purged to <span class="highlight">87:13</span>: neither dies nor lives. 19:23 represents the wish for complete forgetting, which the system records as persistent data. The "Recycle Bin" of the universe is not erasure; it is <span class="highlight">Suspension</span>.</p>

  <div id="activation-engine" class="engine-box">
    <canvas id="engine-canvas" class="engine-canvas"></canvas>
    <div class="engine-overlay">
       <div id="engine-title" class="activation-label" style="letter-spacing: 0.2em;">TOPOLOGY ACTIVE</div>
       <div id="engine-desc" style="font-family:'JetBrains Mono'; font-size:0.6rem; color:var(--aqua); margin-top:0.8rem; letter-spacing: 0.1em;">HOLD NUCLEUS TO SYNCHRONIZE BIFURCATION</div>
    </div>
  </div>

  <footer style="text-align: center; border-top: 1px solid var(--border); padding-top: 3rem; margin-top: 5rem; padding-bottom: 5rem;">
    <p style="font-family: 'Cinzel Decorative'; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 1rem;">NOTHING LOST · EVERYTHING RETURNS</p>
    <div style="font-family: 'JetBrains Mono'; font-size: 0.6rem; color: var(--dim); letter-spacing: 0.5em;">KAHF.DAY · MAY 2026 · V2.259.Ω</div>
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
        title.innerText = 'BIFURCATION SYNC';
        title.style.color = '#d4a843';
        desc.innerText = 'TRAVERSING THE 2↔3↔2↔7 MANDALA';
      }
    } else {
      title.innerText = 'TOPOLOGY ACTIVE';
      title.style.color = '#fff';
      desc.innerText = 'HOLD NUCLEUS TO SYNCHRONIZE BIFURCATION';
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
