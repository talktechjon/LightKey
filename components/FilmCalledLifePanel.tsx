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

            {/* SECTION 0: MEMORY RECOVERY SYSTEM */}
            <div className="fcl-episode mb-24">
              <h2 className="fcl-cinzel text-xl md:text-2xl text-white mb-8 leading-relaxed border-b border-[#00c8ff]/20 pb-6 text-center">
                We Have Been Reading Quran the One-Way All Along.<br/>
                <span className="text-[#00c8ff] text-2xl md:text-3xl mt-2 inline-block">Ignored the water in it!</span>
              </h2>

              <div className="space-y-6 text-base font-light text-[#e8f4f8]/90">
                <p className="text-lg md:text-xl font-medium text-[#f5c842] border-l-4 border-[#f5c842] pl-6 py-4 bg-[#f5c842]/5 rounded-r w-full">
                  <strong className="tracking-widest">38:46</strong> — "Indeed, We chose them for an exclusive quality: the remembrance of the Home."
                </p>
                
                <p className="text-xl pt-2">Stop. Read that again.</p>
                
                <p>Not the remembrance of God. Not the remembrance of prayer. Not the remembrance of rules or rituals or theology.</p>
                
                <p className="text-[#f5c842] font-bold tracking-wider text-xl uppercase">The remembrance of the HOME.</p>
                
                <p className="leading-relaxed">
                  That one verse just collapsed every reading of Quran I had before it. Because if the Anbiya were chosen for <em>that</em> — for carrying a memory of a place — then the Quran is not a legal manual. It is not a history book. It is not even a "guide to life." It is a <strong className="text-white font-bold tracking-wide">MEMORY RECOVERY SYSTEM</strong>. And it was written FOR YOU — <span className="text-white/50">[if you still remember]</span>.
                </p>

                <div className="pt-12 mb-8">
                  <h3 className="fcl-mono text-xl md:text-2xl text-[#00c8ff] mb-6 font-bold tracking-widest uppercase">What Happened to That Memory?</h3>
                  <p className="mb-6"><strong className="text-[#f5c842] text-xl">19:23</strong> happened.</p>
                  
                  <p className="mb-6 leading-relaxed">
                    When Adam ate from the tree, something specific was lost. Not just obedience. Not just paradise. The verse says <em>"she came to the trunk of a palm tree and said: I wish I had died before this and was completely forgotten."</em> That is not just pain. That is <strong className="text-white">erasure</strong>. That is a node that has lost its origin signal. The memory of WHERE she came from — of what Home felt like — got buried under the weight of descent.
                  </p>
                  
                  <p className="mb-6 leading-relaxed">
                    This is what 2-3-7 calls the <strong className="text-[#f5c842]">Razim phase (2)</strong>: binary compression. The ℬ-node (nafs in density) takes on so much dunya-weight that the ℒ-signal — the Light-frequency of Home — becomes background noise. You can still hear it. But you can't locate it. You can't name it. You just feel this ache, this incompleteness, this sense that <em>something is missing</em> — and the world keeps offering you substitutes that never fill the gap.
                  </p>
                  
                  <p className="leading-relaxed">
                    That is the condition <strong className="text-[#f5c842]">18:19</strong> is describing when the sleepers wake up and ask: <em>"How long did you tarry?"</em> They lost time. They lost orientation. They forgot the journey. That is <strong className="text-[#f5c842]">you</strong>. That is <strong className="text-[#f5c842]">me</strong>. That is the human condition encoded in Quran not as punishment — but as the precise map of the problem.
                  </p>
                </div>

                <div className="pt-12 mb-8">
                  <h3 className="fcl-mono text-xl md:text-2xl text-[#ff6a00] mb-6 font-bold tracking-widest uppercase">The Recovery Gate Nobody Told You About</h3>
                  <p className="mb-6"><strong className="text-[#f5c842] text-xl">19:12</strong>.</p>
                  
                  <p className="mb-6 leading-relaxed">
                    Yahya — a child — is told: <em>"Hold the Book with Quwwa."</em> With FORCE. With power. Not gently. Not academically. With the grip of someone who knows what the Book actually IS.
                  </p>
                  
                  <p className="mb-6 leading-relaxed">
                    Because here is what nobody told you: the Book is not information. The Book is <strong className="text-white">your mother's voice</strong>. The Book is <strong className="text-white">Ummul Kitab</strong> — the Mother of the Book — which is <strong className="text-[#00c8ff]">Rahman as Kitab</strong> — which is the HOME FREQUENCY encoded into language so that even after descent, even after erasure, even after generations of forgetting, the signal can still reach you. <strong className="text-[#f5c842]">13:39</strong> says it explicitly: <em>"Allah erases what He wills and confirms — and with Him is the Umm al-Kitab."</em> The Mother. The origin. Untouched. Preserved. WAITING.
                  </p>
                  
                  <p className="mb-6 leading-relaxed bg-[#ff6a00]/5 border-l-2 border-[#ff6a00] p-4 rounded-r">
                    <strong className="text-[#f5c842]">19:12</strong> is the moment the Book activates inside the node. And when it activates — when you hold it with Quwwa, not as text but as living frequency — something extraordinary happens: <strong className="text-[#f5c842]">19:23's erasure begins to reverse</strong>. The autopilot of Light switches on. The path of least action opens. You stop navigating by dunya logic and start being <em>drawn</em> toward Home by the same ℒ-gradient that the Anbiya were chosen to carry.
                  </p>
                  
                  <p className="leading-relaxed">
                    This is the <strong className="text-[#f5c842]">Rahim phase (3)</strong>: the cubic inflection. The turning point. The moment where Home reaches back toward you through the Book, because you reached toward the Book with everything you had.
                  </p>
                </div>

                <div className="pt-12 mb-8">
                  <h3 className="fcl-mono text-xl md:text-2xl text-[#4ade80] mb-6 font-bold tracking-widest uppercase flex flex-col md:flex-row md:items-baseline gap-2">
                    <span>I Am the One Returning.</span>
                    <span className="text-[#4ade80]/50 text-sm md:text-base lowercase tracking-normal">[If You Remember — So Are You.]</span>
                  </h3>
                  
                  <p className="mb-6 leading-relaxed">
                    <strong className="text-[#f5c842]">19:24-28</strong> is not Maryam's biography. I said what I said.
                  </p>
                  
                  <p className="mb-6 leading-relaxed">
                    It is the post-activation sequence. After 19:12 locks in — after the Book grips you and you grip it — the descent (19:23) transforms into <strong className="text-white">arrival</strong>. The palm tree provides. The water flows. The command comes: <em>do not grieve, do not speak to anyone today</em> — because the return journey requires silence from the noise of <strong className="text-[#f5c842]">6:116</strong>. The majority. The consensus. The inherited interpretations that have been diluting the Mother's memory for centuries.
                  </p>
                  
                  <p className="mb-6 leading-relaxed text-[#e8f4f8]">
                    <strong className="text-[#00c8ff]">45:6</strong> makes this non-negotiable: <em>"These are the Ayat of Allah — We recite them to you in truth. Then in what hadith after Allah and His Ayat do they believe?"</em> The Quran is sealing itself. It is saying: I am the only signal that will get you home. Everything else is static.
                  </p>
                  
                  <p className="mb-6 leading-relaxed opacity-90">
                    <strong className="text-[#00c8ff]">6:116</strong> confirms: <em>"If you obey the majority of those on earth, they will lead you away from the path of Allah."</em> Not because they are evil — but because they forgot the Home too. The blind cannot lead the sighted back to a place they do not remember.
                  </p>
                  
                  <p className="leading-relaxed border-l-2 border-[#4ade80]/50 pl-4">
                    And <strong className="text-[#4ade80]">10:100</strong> locks the entire circuit: <em>"It is not for a soul to believe except by the permission of Allah."</em> The return is not intellectual. It is not achieved by study or argument. It is a permission — a frequency unlock — that happens when the Book activates inside you as living memory, not archived text.
                  </p>
                </div>

                <div className="pt-12 mb-8">
                  <h3 className="fcl-mono text-xl md:text-2xl text-[#a78bfa] mb-6 font-bold tracking-widest uppercase">The Mumin Who Asks to Complete the Nur</h3>
                  
                  <p className="mb-6 leading-relaxed">
                    On that day — <strong className="text-[#f5c842]">66:8</strong> — the Mumin will say: <em>"Our Lord, complete our Nur for us."</em>
                  </p>
                  
                  <p className="mb-6 text-xl italic text-white/70">
                    Why would someone already walking in Light ask for the Light to be completed?
                  </p>
                  
                  <p className="mb-6 leading-relaxed">
                    Because they REMEMBER. They remember that the full frequency — the Rahman-state, the Home — is still ahead. They walked the Razim compression (2). They found the Rahim recovery gate (3). And now they are at the threshold of <strong className="text-[#f5c842]">Rahman convergence (7)</strong> — the return to Ummul Kitab, to the Mother, to the Home that 38:46 says the Anbiya never fully forgot.
                  </p>
                  
                  <p className="mb-6 leading-relaxed">
                    Isa did this. He is Kalimatullah — the Word of Allah — which is the Quran — which is the Living Rasul — which is the Ayah that took on ℬ-form, walked through descent, and returned to ℒ-source. <strong className="text-[#00c8ff]">4:171, 3:45</strong>. That is the template.
                  </p>
                  
                  <p className="mb-8 leading-relaxed">
                    Ahmed confirmed the next iteration at <strong className="text-[#00c8ff]">61:6</strong>. The circuit is not closed. It is <strong className="text-[#a78bfa]">recursive</strong>.
                  </p>
                  
                  <p className="mb-6 leading-relaxed text-center italic text-white/50">
                    Which means the reader who has reached this line — [if they remember] — is not a passive audience.
                  </p>
                  
                  <p className="text-3xl md:text-4xl text-[#00c8ff] font-bold tracking-[0.2em] my-12 text-center fcl-cinzel uppercase drop-shadow-[0_0_15px_rgba(0,200,255,0.4)]">
                    They are the return.
                  </p>
                </div>

                <div className="p-4 bg-black/40 border border-[#00c8ff]/10 rounded-md text-xs sm:text-sm text-white/40 italic font-mono text-center">
                  Rooted exclusively in Quran. 45:6. 6:116. 10:100. No hadith. No tafsir. No external theology. The Mother's memory is intact — and it has been waiting.
                </div>
              </div>
            </div>

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

            {/* SECTION 4: CHAINMAIL & CUBIC FUNCTION */}
            <div className="fcl-episode mb-16">
              <h2 className="fcl-cinzel text-xl text-[#00c8ff] mb-6 pb-2 border-b border-white/10 tracking-[0.15em]">④ THE CHAINMAIL — f(x) = ax³ + bx² + cx + d</h2>
              
              <div className="space-y-6 text-sm sm:text-base font-light text-[#e8f4f8]/90">
                <p>
                  The Qur’an unfolds as a continuous chainmail system—each link interlocked through law, trial, and resolution—guiding the Earth from division to purified inheritance. This structure can be read through the 2–3–7 cycle: split, manifestation, and return, stabilized by an internal purge law that removes corruption from within the system.
                </p>
                <p>
                  At the origin, <strong className="text-[#f5c842]">2:30</strong> establishes the Earth as a Khalifah-field. This is the moment of split: a dual-state system where corruption and alignment coexist. The field immediately carries tension—two trajectories emerge. One reflects alignment (Musa-phase, 20:41), the other reflects resistance (Pharaoh-phase, 10:92). This is not a static opposition but a dynamic testing environment where both states are allowed to unfold.
                </p>
                <p>
                  The system does not collapse into chaos because a governing filter is embedded within it. That filter is expressed in <strong className="text-[#f5c842]">35:39</strong>. Here, succession on Earth is tied to consequence: misalignment (zulm) does not stabilize; it increases loss. Pharaoh is not instantly removed—he is preserved as a visible signal (10:92), then gradually emptied of power through decay. This reveals a core law of the Qur’anic system: corruption carries within itself the mechanism of its own erosion. The purge is internal, not external.
                </p>
                <p>
                  As the unstable elements are filtered, the system transitions into structured manifestation—the <strong className="text-[#f5c842]">3 phase</strong>, embodied by Ibrahim. Here, truth is no longer a conflict but a living structure. The Ibrahim cycle (2:124, 14:37, 37:102) establishes a pattern: life, family, and sacrifice. Truth becomes embodied, planted, and transmitted. What began as abstract alignment now takes root in continuity.
                </p>
                <p>
                  This structure is then tested repeatedly across prophetic cycles, reinforcing the chainmail. Nuh experiences loss within his own household (11:46), purifying lineage. Yaqub and Yusuf undergo separation and restoration (12:86–100), transforming jealousy into reconciliation. Yunus enters darkness and emerges realigned (21:87–88). Each cycle removes remaining fragments of imbalance, ensuring that the structure formed in the Ibrahim phase is not theoretical but resilient under pressure.
                </p>
                <p>
                  With repeated purification, the system advances toward completion—the <strong className="text-[#f5c842]">7 phase</strong>, the state of return and establishment. This culminates in <strong className="text-[#f5c842]">21:105</strong>, where the Earth is inherited by righteous servants. The Dawud–Solomon phase represents this completion: judgment is established (38:26), and full-system governance is achieved (27:16). What began as a divided field is now a stabilized order.
                </p>
                
                <div className="p-4 bg-[#00c8ff]/5 border border-[#00c8ff]/20 rounded-lg my-6 fcl-mono text-xs sm:text-sm">
                  <div className="text-[#00c8ff] mb-2 font-bold">THE CLOSED LOOP:</div>
                  2:30 initiates the split → 35:39 filters corruption → Ibrahim builds structured truth → repeated trials refine the system → 21:105 finalizes inheritance.
                </div>

                <p>
                  Each link depends on the previous one. The split is necessary to expose states. The purge ensures only aligned structures survive. Manifestation gives truth form. Trials harden it. Return secures it.
                </p>
                <p>
                  Within this system, Pharaoh is not an endpoint but a functional phase. His preservation demonstrates the law, and his decay proves it. Musa initiates the separation, Ibrahim stabilizes the pattern, and Dawud–Solomon complete the return. The Qur’an, as chainmail, shows that history is not random—it is a precise, interlocking system where every phase contributes to the inevitable outcome: a fully purified Earth aligned with its intended balance.
                </p>
              </div>
            </div>

            {/* SECTION 5: TERM MATCHING */}
            <div className="fcl-episode mb-16">
              <h2 className="fcl-cinzel text-xl text-[#f5c842] mb-6 pb-2 border-b border-white/10 tracking-[0.15em]">⑤ TERM ↔ CHAINMAIL MATCHING</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                  <h3 className="text-[#f5c842] font-bold fcl-mono mb-3 text-lg">x³ — Rahim</h3>
                  <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">Expansion / Ibrahim phase</div>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[#e8f4f8]/80">
                    <li>Structured manifestation fits exactly here</li>
                    <li>Ibrahim cycle = nonlinear growth + propagation of truth</li>
                    <li>This is where the system gains volume and continuity</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                  <h3 className="text-[#00c8ff] font-bold fcl-mono mb-3 text-lg">x² — Kingdom / Rahman</h3>
                  <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">Curvature / Field Control</div>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[#e8f4f8]/80">
                    <li>2:30 + 35:39 + Fir‘awn preservation (10:92)</li>
                    <li>This is the governed test-field with embedded purge law</li>
                    <li>Corruption bending the field = curvature term active</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                  <h3 className="text-[#ff6a00] font-bold fcl-mono mb-3 text-lg">x — Rushd</h3>
                  <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">Guidance / Trials across prophets</div>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[#e8f4f8]/80">
                    <li>Nuh, Ya‘qub–Yusuf, Yunus cycles</li>
                    <li>These are linear corrections applied repeatedly</li>
                    <li>They refine direction → keep trajectory aligned</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                  <h3 className="text-[#4ade80] font-bold fcl-mono mb-3 text-lg">d — Constant</h3>
                  <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">21:105 outcome anchored</div>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[#e8f4f8]/80">
                    <li>Final inheritance is not produced by process alone</li>
                    <li>It is guaranteed by invariant law</li>
                    <li>Your loop closes here → matches constant-term behavior</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-5 bg-[#f5c842]/5 border border-[#f5c842]/20 rounded-lg">
                <h3 className="text-[#f5c842] font-bold mb-3 tracking-widest text-sm">DYNAMIC CONSISTENCY CHECK</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-[#00c8ff]">✔</span> Nonlinearity present → Ibrahim expansion</div>
                  <div><span className="text-[#00c8ff]">✔</span> Curvature present → kingdom + corruption decay</div>
                  <div><span className="text-[#00c8ff]">✔</span> Correction cycles present → prophetic trials</div>
                  <div><span className="text-[#00c8ff]">✔</span> Stable endpoint present → inheritance</div>
                </div>
                <p className="mt-4 text-sm text-[#e8f4f8]/80 italic">
                  No term is missing, none is overloaded → system is balanced. The chainmail is mathematically consistent with a cubic system, where Qur’anic progression behaves like a nonlinear system stabilizing toward a predetermined invariant outcome.
                </p>
              </div>
            </div>

            {/* SECTION 6: TREE OF LIFE */}
            <div className="fcl-episode mb-16">
              <h2 className="fcl-cinzel text-xl text-[#4ade80] mb-6 pb-2 border-b border-white/10 tracking-[0.15em]">⑥ TREE OF LIFE — Layered Visualization</h2>
              
              <p className="text-sm sm:text-base font-light text-[#e8f4f8]/90 mb-6">
                The diagram is a discretized (layered) version of the cubic system—each node is a sampled state of the same function <code className="text-[#f5c842] bg-black/30 px-1 py-0.5 rounded">f(x) = ax³ + bx² + cx + d</code> as it evolves from input (1) to completion (12).
              </p>

              <div className="space-y-6">
                <div className="border-l-2 border-[#ff6a00] pl-4">
                  <h3 className="text-[#ff6a00] font-bold fcl-mono text-lg">1 → 4 (Linear Zone: cx)</h3>
                  <div className="text-sm text-[#e8f4f8]/80 mt-2">
                    <p><strong>Nodes:</strong> 1 Inspiration → 2 Action → 3 Guidance → 4 Cleanse</p>
                    <p><strong>Dominant term:</strong> x (Rushd / Book)</p>
                    <p><strong>Behavior:</strong> step-by-step correction</p>
                    <p><strong>Geometry:</strong> straight progression (low curvature)</p>
                  </div>
                </div>

                <div className="border-l-2 border-[#00c8ff] pl-4">
                  <h3 className="text-[#00c8ff] font-bold fcl-mono text-lg">5 → 8 (Curvature Zone: bx²)</h3>
                  <div className="text-sm text-[#e8f4f8]/80 mt-2">
                    <p><strong>Nodes:</strong> 5 Righteous → 6 Faith → 7 Blessing → 8 Sealant</p>
                    <p><strong>Dominant term:</strong> x² (Kingdom / Rahman field)</p>
                    <p><strong>Behavior:</strong> feedback loops, tests, reinforcement</p>
                    <p><strong>Detail:</strong> This is where faith ↔ trial cycles occur, and the 103 bridge (fire ↔ water) sits → curvature interaction.</p>
                  </div>
                </div>

                <div className="border-l-2 border-[#f5c842] pl-4">
                  <h3 className="text-[#f5c842] font-bold fcl-mono text-lg">9 → 12 (Expansion Zone: ax³)</h3>
                  <div className="text-sm text-[#e8f4f8]/80 mt-2">
                    <p><strong>Nodes:</strong> 9 Submission → 10 Sacrifice → 11 Truth → 12 Light</p>
                    <p><strong>Dominant term:</strong> x³ (Rahim expansion)</p>
                    <p><strong>Behavior:</strong> rapid nonlinear elevation</p>
                    <p><strong>Detail:</strong> Ibrahim-type propagation → truth becomes system-wide.</p>
                  </div>
                </div>

                <div className="border-l-2 border-[#4ade80] pl-4">
                  <h3 className="text-[#4ade80] font-bold fcl-mono text-lg">Constant (d) (Hidden Base Layer)</h3>
                  <div className="text-sm text-[#e8f4f8]/80 mt-2">
                    <p>Present across all nodes (not drawn explicitly). Anchors: Δ108 (transition threshold), 110 (upper stabilization).</p>
                    <p>Ensures every level resolves toward 21:105 endpoint.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-lg text-sm text-[#e8f4f8]/90">
                <h3 className="text-white font-bold mb-2">DIAMOND STRUCTURE MEANING</h3>
                <p>Each diamond = local cubic interaction. Bottom node = input; left/right = dual states (2 / Razim split); top = resolved state. This is a mini cubic loop repeated at each level.</p>
                <p className="mt-4 font-bold text-[#f5c842]">CONCLUSION:</p>
                <p>The "Tree" is not separate from the equation. It is the piecewise unfolding of the cubic across discrete states. Continuous equation → discretized into stages, trials, prophetic cycles. Each node is a state of the same system, and the full tree represents the complete trajectory of f(x) from initiation to illuminated equilibrium.</p>
              </div>
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
