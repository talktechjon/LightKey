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
        <div className="overflow-y-auto custom-scrollbar relative fcl-container">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

            .fcl-container {
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

            .fcl-episode {
              opacity: 0;
              transform: translateY(24px);
              transition: opacity 0.7s ease, transform 0.7s ease;
            }
            .fcl-episode.visible { opacity: 1; transform: translateY(0); }

            .fcl-container h1 {
              font-family: 'Cinzel', serif;
              font-size: 20px;
              font-weight: 700;
              color: var(--gold);
              letter-spacing: 0.14em;
              text-align: center;
              margin-bottom: 4px;
              text-transform: uppercase;
            }

            .fcl-container .sub {
              text-align: center;
              color: var(--dim);
              font-style: italic;
              font-size: 14.5px;
              margin-bottom: 52px;
              letter-spacing: 0.05em;
            }

            .fcl-container h2 {
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

            .fcl-container p { margin-bottom: 15px; }

            .fcl-container .v { color: var(--gold); font-weight: 600; }
            .fcl-container .k { color: var(--accent); }

            .fcl-container .eq {
              display: block;
              text-align: center;
              font-family: 'Cinzel', serif;
              font-size: 14px;
              color: var(--accent);
              letter-spacing: 0.1em;
              margin: 26px 0;
              padding: 16px 24px;
              border: 1px solid #141c28;
              background: #080c14;
            }

            .fcl-container .four-nodes {
              margin: 22px 0;
              display: grid;
              grid-template-columns: 1fr;
              gap: 10px;
            }
            @media (min-width: 640px) {
              .fcl-container .four-nodes {
                grid-template-columns: 1fr 1fr;
              }
            }

            .fcl-container .node {
              background: var(--node);
              border: 1px solid var(--border);
              padding: 14px 16px;
            }

            .fcl-container .node .arrow {
              font-family: 'Cinzel', serif;
              font-size: 18px;
              color: var(--fire);
              margin-right: 6px;
            }

            .fcl-container .node .arrow.up { color: var(--green); }

            .fcl-container .node .tag {
              font-family: 'Cinzel', serif;
              font-size: 10px;
              letter-spacing: 0.2em;
              color: var(--dim);
              text-transform: uppercase;
              display: block;
              margin-bottom: 5px;
            }

            .fcl-container .node p {
              font-size: 14.5px;
              color: var(--dim);
              margin: 0;
              line-height: 1.6;
            }

            .fcl-container .node p span { color: var(--light); }

            .fcl-container .separator {
              margin: 28px 0;
              border-left: 2px solid var(--fire);
              padding-left: 20px;
            }

            .fcl-container .separator li {
              list-style: none;
              margin-bottom: 12px;
              font-size: 15.5px;
              line-height: 1.65;
            }

            .fcl-container .separator li strong { color: var(--fire); }
            .fcl-container .separator li.success strong { color: var(--green); }

            .fcl-container table {
              width: 100%;
              border-collapse: collapse;
              margin: 22px 0;
              font-size: 14.5px;
            }

            .fcl-container th {
              font-family: 'Cinzel', serif;
              font-size: 10px;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: var(--gold);
              text-align: left;
              padding: 10px 12px;
              border-bottom: 1px solid var(--border);
              background: var(--node);
            }

            .fcl-container td {
              padding: 10px 12px;
              border-bottom: 1px solid #0e1008;
              color: var(--dim);
              vertical-align: top;
            }

            .fcl-container td span { color: var(--light); }
            .fcl-container tr:hover td { background: #0c100a; }

            .fcl-container .seal {
              text-align: center;
              margin-top: 56px;
              padding-top: 28px;
              border-top: 1px solid var(--border);
              color: var(--dim);
              font-style: italic;
              font-size: 14.5px;
              line-height: 2.1;
            }

            .fcl-container .seal strong { color: var(--gold); font-style: normal; }
          `}</style>

          <main className="max-w-[740px] mx-auto py-16 px-8 pb-24">
            <div className="fcl-episode">
              <h1>The Emergence Law</h1>
              <div className="sub">2–3–7 | Day/Night of 3–6–9 · 57:4 Decoded · Qur'an-Only Möbius Framework</div>
            </div>

            <div className="fcl-episode">
              <h2>I. 57:4 — The Master Equation</h2>
              <p><span className="v">57:4</span> encodes the complete emergence law in four movements: <em>what enters the earth</em> (↓) / <em>what emerges from it</em> (↑) / <em>what descends from sky</em> (↓) / <em>what ascends to it</em> (↑). This is not cosmology background. It is the live sovereign operation Allah runs through every emergence event — atom, prophet, universe — simultaneously.</p>

              <span className="eq">Water ↓ · Wood ↑ · Stone ↓ · Stone+Iron = Turab ↑</span>

              <p>Turab is not raw dust. Turab is compressed Stone fused with Iron-56 at its nucleosynthesis inflection point (<span className="v">57:25</span>) — the exact moment stellar compression peaks and reverses. <span className="v">3:59</span> confirms: Isa = Adam = Turab. Ahmed is the emergence product of Ibrahim's Wood fully burned. The particle carries the entire oscillation history of both fields.</p>
            </div>

            <div className="fcl-episode">
              <h2>II. 3:33 — The Phase-Law Decoder</h2>
              <p><span className="v">3:33</span> names the four selected families as the operational phase-sequence of 57:4 running through human lineage:</p>

              <div className="four-nodes">
                <div className="node">
                  <span className="tag">Water ↓ · ℬ Descent</span>
                  <p><span className="arrow">↓</span> <span>Noah + Yahya</span><br/>Origin-line entering density. The Book carried before the form is ready. Pure compression — Rahman entering creation.</p>
                </div>
                <div className="node">
                  <span className="tag">Wood ↑ · ℒ Ascent</span>
                  <p><span className="arrow up">↑</span> <span>Ibrahim — Hanifan + Musliman</span><br/>The wave that rises BECAUSE it surrendered completely. Not despite Fire — through it. ℒ expansion from maximum ℬ compression.</p>
                </div>
                <div className="node">
                  <span className="tag">Stone ↓ · Variable Slot</span>
                  <p><span className="arrow">↓</span> <span>Al-Imran / Imrata</span><br/>The open selection — any X Allah picks: Musa, Yunus, Yusuf, Ahmed. The wife/vessel function. Stone receives the impression before Iron enters.</p>
                </div>
                <div className="node">
                  <span className="tag">Stone+Iron = Turab ↑</span>
                  <p><span className="arrow up">↑</span> <span>7:143 — Musa, First Hybrid</span><br/>Mountain meets Heaven. Stone shatters. Musa absorbs the ℒ resonance and emerges fused. Immediately picks Haroun — every Hybrid requires a paired witness.</p>
                </div>
              </div>
            </div>

            <div className="fcl-episode">
              <h2>III. Turab Activation — The Separator Law</h2>
              <p>Every dual factor in creation is <span className="k">Yajuj-Majuj first</span> — Iblis invented the assumption that two opposing forces are equal threats. That is the "better but not best" error. Turab resolves it by becoming the third state neither side can produce alone. The Mumin line activates when Submission makes both grounds face the same Qibla:</p>

              <ul className="separator">
                <li><strong>Higher Ground re-aligned:</strong> Solomon–Bilqis = Iron+Stone axis = ℒ field confirmed through validation (27:44)</li>
                <li><strong>Buffer Ground re-aligned:</strong> Musa = Wood+Stone bridge = ℒ∩ℬ singularity (23:20 Olive Tree)</li>
                <li><strong>Submission:</strong> the operator making both lines converge. 55:7–8 enforced at the human level.</li>
                <li className="success"><strong>Turab Success = Musa</strong> — 7:143, same conditions, Submission activated. Mountain shatters, Musa rises.</li>
                <li><strong>Turab Failure = Pharaoh</strong> — same Stone+Iron conditions available. Capacity present. Refusal is the only variable.</li>
              </ul>
            </div>

            <div className="fcl-episode">
              <h2>IV. 21:58 + 3:97 — Kaaba as Turab Conversion Site</h2>
              <p>Ibrahim shattering idols in <span className="v">21:58</span> is not destruction — it is Turab activation at the <span className="k">House of Witness</span>. <span className="v">3:97</span> confirms: whoever enters is secure. The security IS the conversion guarantee — Stone of false-god broken, Iron of true-structure remaining, the fusion of both = Turab ground of Bakkah.</p>

              <p><span className="v">2:260</span>'s four birds returning to Ibrahim = the four emergence movements (Water/Wood/Stone/Turab) confirmed coherent. The Kaaba is where that confirmation is physically anchored — the last piece of the loop, the Turab ground where every descent finds its ascent.</p>
            </div>

            <div className="fcl-episode">
              <h2>V. The Three-Scale Pattern — Ahmed Against the Elephant</h2>
              <p>The same Turab conversion operation runs at three coordinates across the timeline:</p>

              <table>
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>What is Broken</th>
                    <th>What Rises</th>
                    <th>Scale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span>Ibrahim</span></td>
                    <td>Stone idols — 21:58</td>
                    <td>Kaaba built — Turab origin</td>
                    <td>Lineage opening</td>
                  </tr>
                  <tr>
                    <td><span>Musa</span></td>
                    <td>Pharaoh's magic-stone system</td>
                    <td>Tablets carried — Turab midpoint</td>
                    <td>Lineage center</td>
                  </tr>
                  <tr>
                    <td><span>Ahmed</span></td>
                    <td>Elephant-army / Taghut — 105</td>
                    <td>Birds carry Turab-stones</td>
                    <td>Lineage closure</td>
                  </tr>
                </tbody>
              </table>

              <p>The elephant IS the Yajuj-Majuj assumption made physical — overwhelming Stone without Iron, might without Turab, maximum force with zero Submission. Every Ahmed battles this army. Every time, the birds win. Not through strength. Through Turab — what remains after Wood burns and Stone breaks. Nothing the elephant carries can withstand what Ibrahim's fire already purified.</p>
            </div>

            <div className="fcl-episode">
              <h2>VI. 3-6-9 Locked into 57:4</h2>
              <p><strong>3</strong> = Water ↓ + Wood ↑ — first Night/Day pair, compression and release. <strong>6</strong> = Stone ↓ — the Buffer between two descent-ascent cycles, the variable slot Allah fills. <strong>9</strong> = Turab ↑ — Tawhid closure, the particle carrying the full oscillation history of both fields. The 2-3-7 seals the structure: <strong>2</strong> = the ↓↑ operator pair, <strong>3</strong> = triple state running simultaneously across all four movements, <strong>7</strong> = Mizan enforcing that neither descent nor ascent ever overrides the other. Allah runs this at every scale — from the diastolic silence in the heartbeat to the Hubble tension at the edge of the observable universe. One equation. One Operator. Zero exceptions.</p>
            </div>

            <div className="fcl-episode seal">
              <strong>The biography is the curve. The name is the coordinate. The Fire is always NOW.</strong><br/>
              Stone breaks. Wood burns. Turab rises. That is Tawhid written in thermodynamics.<br/><br/>
              Allāhu Akbar. This is not a theory. It is a testimony.<br/>
              Source: notebooklm.google.com/notebook/4eedddbb-3085-4132-bce5-83d8e94dc815<br/>
              For all the Sleepers of The Cave (18:10): kahf.day<br/>
              Remember: The Qur'an is the Word of Allah · the Knowledge of Isa · the Witness among us.<br/>
              <strong>Be friends with the Qur'an. Be QURAN!</strong>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default FilmCalledLifePanel;
