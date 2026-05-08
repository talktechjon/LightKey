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
<title>The 2↔3↔2→7 Mandala</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet"/>
<style>
  :root {
    --bg: #050810;
    --panel: rgba(10,15,35,0.85);
    --border: rgba(120,160,255,0.15);
    --gold: #d4a843;
    --aqua: #4af0e0;
    --crimson: #e04060;
    --pearl: #e8e4d8;
    --muted: rgba(200,210,230,0.55);
    --dim: rgba(200,210,230,0.3);
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
  
  /* Layout */
  header {
    text-align: center;
    padding: 3rem 1rem 2rem;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent);
  }
  header h1 {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--gold);
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  header p {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .section-intro {
    margin-bottom: 3rem;
  }

  /* Scientific Table */
  .science-table {
    width: 100%;
    margin: 2rem 0;
    border-collapse: collapse;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
  }
  .science-table th, .science-table td {
    padding: 1rem;
    text-align: left;
    border: 1px solid var(--border);
  }
  .science-table th {
    background: rgba(120,160,255,0.05);
    color: var(--aqua);
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.75rem;
  }
  .science-table tr:hover {
    background: rgba(255,255,255,0.04);
  }

  /* Narrative Blocks */
  .narrative-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .narrative-card {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 8px;
    position: relative;
    transition: transform 0.3s;
  }
  .narrative-card h3 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--gold);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
  }
  .narrative-card .step-num {
    position: absolute;
    top: -10px;
    right: 15px;
    background: var(--bg);
    padding: 0 8px;
    color: var(--dim);
    font-family: 'Cinzel Decorative';
    font-size: 0.8rem;
  }

  /* Equations */
  .math-block {
    text-align: center;
    padding: 1.5rem;
    background: rgba(0,0,0,0.4);
    border: 1px dashed var(--border);
    border-radius: 8px;
    margin: 2rem 0;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Activation Engine Mirror */
  .activation-wrapper {
    margin: 3rem 0;
    position: relative;
    background: #000;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
  }
  .activation-canvas { display: block; width: 100%; height: 300px; }
  .activation-ui {
    position: absolute; inset: 0; pointer-events: none;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%);
  }
  .activation-label { font-family: 'Cinzel Decorative'; font-size: 1.2rem; color: #fff; text-shadow: 0 0 10px rgba(0,255,255,0.5); }

  /* Typography helpers */
  .quote {
    border-left: 3px solid var(--gold);
    padding: 1rem 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    background: rgba(255,160,0,0.03);
  }
  .highlight { color: var(--aqua); font-weight: 500; }
  
</style>
</head>
<body>

<header>
  <h1>The 2↔3↔2→7 Mandala</h1>
  <p>Finding the Path That Was Always There</p>
</header>

<main>
  <section class="section-intro">
    <blockquote class="quote">
      "Reality is merely an illusion, albeit a very persistent one." — Albert Einstein<br/>
      <span style="font-size: 0.8rem; opacity: 0.7;">3:185 — All that is on earth is illusion (Mata'ul Ghuroor)</span>
    </blockquote>
    <div style="background: rgba(74, 240, 224, 0.05); border: 1px solid rgba(74, 240, 224, 0.2); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; text-align: center;">
      <p style="font-family: 'Outfit'; font-size: 1.1rem; color: var(--pearl); letter-spacing: 0.05em; line-height: 1.4;">
        "All motion is <span style='color:var(--muted)'>Shadow</span> resolving into <span style='color:var(--aqua)'>Light</span> through <span style='color:var(--gold)'>Particle</span> under <span style='color:var(--pearl)'>Gravity</span>. 
        <br/><span style='font-size: 0.9rem; opacity: 0.8; font-family: \"JetBrains Mono\"'>Time burns, Gravity selects, Knowledge becomes.</span>"
      </p>
    </div>
    <p>This panel synthesizes the <strong>84:19 Activation</strong> and the <strong>Möbius Traversal</strong> into a single coherence topology. Every system—from a single photon to the human heart—executes this same coupled operator sequence: Bifurcation, Structured Propagation, and Recursive Coherence Filtering.</p>
  </section>

  <section>
    <h2 style="font-family:'Cinzel Decorative'; color:var(--gold); margin-bottom: 1rem;">1. Topological Operators</h2>
    <table class="science-table">
      <thead>
        <tr>
          <th>Operator</th>
          <th>Quranic Coordinate</th>
          <th>Scientific Parallel</th>
          <th>Function</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>D₂ (Bifurcation)</strong></td>
          <td>7:172 (The Covenant)</td>
          <td>RS Helicity Split</td>
          <td>Wave-state opening / Initial division</td>
        </tr>
        <tr>
          <td><strong>S₃ (Propagation)</strong></td>
          <td>19:12 (The Grip)</td>
          <td>OAM Helicoidal Encoding</td>
          <td>Geometric stabilization / Structured flow</td>
        </tr>
        <tr>
          <td><strong>ℱ₂ (Filtering)</strong></td>
          <td>21:80 (Chainmail)</td>
          <td>PB Phase Recovery</td>
          <td>Recursive coherence / Error correction</td>
        </tr>
        <tr>
          <td><strong>Ω (Return)</strong></td>
          <td>24:35 (Nur upon Nur)</td>
          <td>Conserved Informational Invariant</td>
          <td>Energy conservation / Identity restoration</td>
        </tr>
      </tbody>
    </table>
  </section>

  <div class="math-block">
    <div style="color:var(--aqua)">∫ F₂ ( d/dt S₃ ( D₂ (x,t) ) ) dt = Ω</div>
    <div style="font-size: 0.7rem; margin-top: 0.5rem; opacity: 0.6;">The Governing Integral of the Mandala [2, 7]</div>
  </div>

  <section>
    <h2 style="font-family:'Cinzel Decorative'; color:var(--gold); margin-bottom: 1rem;">2. Narrative: The Mursalīn Return</h2>
    <div class="narrative-grid">
      <div class="narrative-card">
        <div class="step-num">01</div>
        <h3>The Default (15:72)</h3>
        <p>Wandering in noise. The Jinn-state of covered execution. Without <span class="highlight">19:12</span>, the heart remains in 15:72 mode waiting for collapse.</p>
      </div>
      <div class="narrative-card">
        <div class="step-num">02</div>
        <h3>The Activation (19:12)</h3>
        <p>"Take the Book with Strength." This initiates the traversal. It is the grip-function that converts random walk into structured flight.</p>
      </div>
      <div class="narrative-card">
        <div class="step-num">03</div>
        <h3>The Filter (21:69)</h3>
        <p>Ibrahim in the fire. Fire is not removed—it is redefined as <span class="highlight">Cool and Safe</span>. This is the bifurcation gate where Pharaonic mass is separated from Mursalīn identity.</p>
      </div>
      <div class="narrative-card">
        <div class="step-num">04</div>
        <h3>The Certainty (2:259)</h3>
        <p>Witnessed Certainty (ʿilm). The heart of Ibrahim realized. 18:10 (Rushd) is the request; 2:259 is the fulfilled output.</p>
      </div>
    </div>
  </section>

  <section>
    <h2 style="font-family:'Cinzel Decorative'; color:var(--gold); margin-bottom: 1rem;">3. Structural Homomorphisms</h2>
    <table class="science-table">
      <thead>
        <tr>
          <th>Domain</th>
          <th>Structural Correspondence</th>
          <th>Topological Function</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mycorrhizal Networks</td>
          <td>Distributed fungal linkage</td>
          <td>Relational coherence across biological surfaces</td>
        </tr>
        <tr>
          <td>Quantum Error Correction</td>
          <td>Topological codes (Kitaev)</td>
          <td>Logical qubit preservation against local noise</td>
        </tr>
        <tr>
          <td>Immune Memory</td>
          <td>Antigen bifurcation → T/B-cell response</td>
          <td>Full traversal producing conserved Ω</td>
        </tr>
        <tr>
          <td>Seed Dormancy</td>
          <td>Protected edge states in SPT phases</td>
          <td>18:10 Cave sleeper analogue (Phase isolation)</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section id="activation-engine" class="activation-wrapper active">
    <canvas id="engine-canvas" class="activation-canvas"></canvas>
    <div class="activation-ui">
       <div id="engine-title" class="activation-label">MANDALA ACTIVE</div>
       <div id="engine-desc" style="font-family:'JetBrains Mono'; font-size:0.6rem; color:var(--aqua); margin-top:0.5rem;">TOUCH NUCLEUS TO SYNCHRONIZE</div>
    </div>
  </section>

  <section style="text-align: center; color: var(--muted); padding-bottom: 4rem;">
    <p style="font-style: italic;">"Nothing lost, nothing external, everything returns." — 4:82</p>
    <div style="font-family:'JetBrains Mono'; font-size: 0.65rem; margin-top: 1rem; letter-spacing: 0.4em;">KAHF.DAY · DCU FRAMEWORK · 2026</div>
  </section>

</main>

<script>
/** 41:9-12 Activation Engine State Machine **/
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

  const particles = Array.from({length: 120}, () => ({
    x: Math.random() * (canvas.width / window.devicePixelRatio),
    y: Math.random() * (canvas.height / window.devicePixelRatio),
    vx: 0, vy: 0, phase: Math.random() * Math.PI * 2,
    size: 1 + Math.random() * 1.5,
    type: Math.random() > 0.5 ? 'fire' : 'water'
  }));

  function drawLightning(ctx, x1, y1, x2, y2, branches, opacity) {
    if (branches <= 0) return;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(200, 240, 255, ' + opacity + ')';
    ctx.lineWidth = branches * 0.4;
    ctx.moveTo(x1, y1);
    let curX = x1, curY = y1;
    const segments = 4;
    for (let i = 0; i < segments; i++) {
      const tx = x1 + (x2 - x1) * (i + 1) / segments + (Math.random() - 0.5) * 12;
      const ty = y1 + (y2 - y1) * (i + 1) / segments + (Math.random() - 0.5) * 12;
      ctx.lineTo(tx, ty);
      curX = tx; curY = ty;
      if (Math.random() > 0.85) {
        drawLightning(ctx, curX, curY, curX + (Math.random()-0.5)*20, curY + (Math.random()-0.5)*20, branches - 1, opacity * 0.5);
        ctx.moveTo(curX, curY);
      }
    }
    ctx.stroke();
  }

  function frame(t) {
    if (isTouching) progress = Math.min(1, progress + 0.006);
    else progress = Math.max(0, progress - 0.02);
    
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    const cx = w / 2, cy = h / 2;

    ctx.fillStyle = 'rgba(5, 8, 16, 0.2)';
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
      const dx = cx - p.x, dy = cy - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy) || 1;

      if (progress < 0.2) {
        p.vx += (Math.random() - 0.5) * 0.5;
        p.vy += (Math.random() - 0.5) * 0.5;
      } else {
        const pull = 0.4 * progress;
        const swirl = 1.2 * progress;
        p.vx += (dx / dist) * pull + (dy / dist) * swirl;
        p.vy += (dy / dist) * pull - (dx / dist) * swirl;
      }
      
      p.vx *= 0.95; p.vy *= 0.95;
      p.x += p.vx; p.y += p.vy;
      
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      const hue = progress > 0.8 ? (t * 0.1 + p.phase * 50) % 360 : (p.type === 'fire' ? 20 : 200);
      ctx.fillStyle = 'hsla(' + hue + ', 80%, 60%, ' + (0.3 + progress * 0.4) + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill();

      if (progress > 0.9 && Math.random() > 0.96) {
        drawLightning(ctx, cx, cy, p.x, p.y, 2, 0.4);
      }
    });

    if (progress > 0) {
      title.innerText = progress > 0.9 ? 'Ω REALIZED' : 'SYNCHRONIZING';
      title.style.color = progress > 0.9 ? '#4af0e0' : '#d4a843';
    } else {
      title.innerText = 'MANDALA ACTIVE';
      title.style.color = '#fff';
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
