
import React, { useState, useEffect, useMemo } from 'react';
import { Flame, Fish, TreePine, ArrowRight, ArrowLeft } from 'lucide-react';
import { CHAPTER_DETAILS, BUBBLE_BLOCK_MAPPING_RAW } from '../constants';

interface InstructionPanelProps {
  isVisible: boolean;
  onClose: () => void;
  onLaunchReader: () => void;
}

const AnimatedHarvest: React.FC = () => {
  const [stage, setStage] = useState(0);
  const stages = useMemo(() => [
    { text: 'Knowledge', color: 'text-cyan-400', icon: '⚡' },
    { text: 'Mercy', color: 'text-blue-300', icon: '🌧️' },
    { text: 'Life', color: 'text-emerald-400', icon: '🌱' },
    { text: 'Righteousness', color: 'text-green-500', icon: '🍃' },
    { text: 'Sacrifice', color: 'text-amber-500', icon: '🍯' },
    { text: 'Purity', color: 'text-fuchsia-300', icon: '🦋' },
    { text: 'Intelligence in Form', color: 'text-white', icon: '⚪' },
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center rounded-[3rem] bg-gray-950/20 border border-white/5">
      
      {/* Welcome Badge */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] bg-cyan-950/20 animate-pulse">
           Salam • Peace
        </div>
        <p className="text-gray-500 text-xs tracking-widest uppercase mt-3">Explaining Patterns • All is Love & Tawaqqul.</p>
      </div>

      {/* Narrative Container */}
      <div className="text-center">
        {/* Static Anchor */}
        <h3 className="text-2xl md:text-4xl font-light text-gray-400 tracking-tight">
          The Universe exists to <span className="font-bold text-white">harvest</span>
        </h3>
        
        {/* DYNAMIC TYPOGRAPHY STAGE */}
        <div className="relative h-24 md:h-32 mt-2 flex items-center justify-center px-8 overflow-hidden min-w-[300px]">
          
          {/* Visual Effect Layer - Strictly limited to this dynamic box */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Stage 0: Knowledge (Lightning) */}
            {stage === 0 && (
              <div className="absolute inset-0 animate-lightning-burst opacity-40">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M50 0 L48 40 L52 35 L49 70 L53 65 L50 100" fill="none" stroke="cyan" strokeWidth="0.8" className="animate-draw-fast" />
                </svg>
              </div>
            )}

            {/* Stage 1: Mercy (Rain) */}
            {stage === 1 && (
              <div className="absolute inset-0 flex flex-col items-center">
                 <div className="flex gap-4 opacity-20 mt-2">
                   <div className="w-12 h-4 bg-blue-400 rounded-full blur-lg"></div>
                   <div className="w-8 h-3 bg-blue-300 rounded-full blur-md"></div>
                 </div>
                 {[...Array(15)].map((_, i) => (
                   <div key={i} className="absolute bg-blue-400/40 w-px h-6 animate-rain-drop-stage" style={{ left: `${20 + Math.random() * 60}%`, top: '-10px', animationDelay: `${Math.random() * 2}s` }}></div>
                 ))}
              </div>
            )}

            {/* Stage 2: Life (Root) */}
            {stage === 2 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <path d="M50 100 C 50 80, 40 70, 50 40 S 60 10, 50 0" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="150" strokeDashoffset="150" className="animate-root-grow" />
                  <path d="M50 80 C 40 75, 20 70, 10 75" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="80" strokeDashoffset="80" className="animate-root-grow delay-300" />
                  <path d="M50 80 C 60 75, 80 70, 90 75" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="80" strokeDashoffset="80" className="animate-root-grow delay-500" />
                </svg>
              </div>
            )}

            {/* Stage 3: Righteousness (Leaves) */}
            {stage === 3 && (
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="absolute text-sm animate-leaf-drift" style={{ left: '-20px', top: `${20 + Math.random() * 60}%`, animationDelay: `${Math.random() * 3}s` }}>🍃</div>
                ))}
              </div>
            )}

            {/* Stage 4: Sacrifice (Liquid) */}
            {stage === 4 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
                <svg className="absolute inset-0 w-full h-full opacity-60">
                   <filter id="liquid-goo">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                      <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" />
                   </filter>
                   <g filter="url(#liquid-goo)">
                      <circle cx="50%" cy="50%" r="20" fill="#f59e0b" className="animate-blob-small" />
                      <circle cx="48%" cy="52%" r="15" fill="#fbbf24" className="animate-blob-small delay-500" />
                   </g>
                </svg>
              </div>
            )}

            {/* Stage 5: Purity (Butterfly) */}
            {stage === 5 && (
              <div className="absolute inset-0">
                <div className="absolute animate-butterfly-loop text-xl drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]">🦋</div>
              </div>
            )}

            {/* Stage 6: Singularity (Collapse) */}
            {stage === 6 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-white opacity-0 animate-collapse-white"></div>
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_40px_10px_white] animate-pulse"></div>
              </div>
            )}
          </div>

          {/* DYNAMIC TEXT */}
          <div key={stage} className="relative z-10 animate-in fade-in zoom-in duration-1000">
            <span className={`text-3xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-700 ${stages[stage].color} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
              {stages[stage].text}
            </span>
          </div>
        </div>

        {/* Timeline dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {stages.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-700 ${stage === i ? 'w-6 bg-cyan-400' : 'w-1 bg-white/10'}`}></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lightning-burst {
          0%, 5%, 15%, 25%, 100% { opacity: 0; }
          2%, 10%, 20% { opacity: 0.6; }
        }
        @keyframes draw-fast {
          to { stroke-dashoffset: 0; }
        }
        @keyframes rain-drop-stage {
          to { transform: translateY(120px); }
        }
        @keyframes leaf-drift {
          0% { transform: translateX(0) rotate(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(350px) rotate(360deg); opacity: 0; }
        }
        @keyframes blob-small {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5px, -5px) scale(1.1); }
        }
        @keyframes butterfly-loop {
          0% { transform: translate(-50px, 40px) rotate(-10deg); }
          25% { transform: translate(100px, -20px) rotate(10deg); }
          50% { transform: translate(250px, 30px) rotate(-10deg); }
          75% { transform: translate(120px, 60px) rotate(10deg); }
          100% { transform: translate(-50px, 40px) rotate(-10deg); }
        }
        @keyframes collapse-white {
          0% { opacity: 0; transform: scale(1.5); }
          80% { opacity: 0; transform: scale(1.5); }
          90% { opacity: 0.8; transform: scale(0.1); }
          100% { opacity: 0; transform: scale(1); }
        }
        .animate-lightning-burst { animation: lightning-burst 4s infinite; }
        .animate-draw-fast { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw-fast 1s ease-out infinite; }
        .animate-rain-drop-stage { animation: rain-drop-stage 1s linear infinite; }
        .animate-root-grow { animation: draw-fast 3s ease-out forwards; }
        .animate-leaf-drift { animation: leaf-drift 3s linear infinite; }
        .animate-blob-small { animation: blob-small 4s ease-in-out infinite; }
        .animate-butterfly-loop { animation: butterfly-loop 6s ease-in-out infinite; }
        .animate-collapse-white { animation: collapse-white 4s ease-out infinite; }
      `}</style>
    </div>
  );
};

// --- NEW COMPONENTS FOR NAFS & 2-3-7 TAB ---

const YinYangAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-[3rem] border border-white/5 space-y-12">
      <div className="relative w-64 h-64 animate-[spin_10s_linear_infinite] drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
           <defs>
             <filter id="glow">
               <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
               <feMerge>
                 <feMergeNode in="coloredBlur"/>
                 <feMergeNode in="SourceGraphic"/>
               </feMerge>
             </filter>
           </defs>
           
           {/* Base circle background (black right, white left) */}
           <circle cx="50" cy="50" r="49" fill="#000" />
           <path d="M 50 1 A 49 49 0 0 0 50 99 Z" fill="#fff" />
           
           {/* Top S-curve (white) */}
           <circle cx="50" cy="25.5" r="25.5" fill="#fff" />
           
           {/* Bottom S-curve (black) */}
           <circle cx="50" cy="74.5" r="24.5" fill="#000" />
           
           {/* Seed dots (The particle inside 3) */}
           <circle cx="50" cy="25.5" r="7" fill="#000" filter="url(#glow)" />
           <circle cx="50" cy="74.5" r="7" fill="#fff" filter="url(#glow)" />
           
           {/* Boundary rim */}
           <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>
      </div>

      <div className="text-center max-w-4xl space-y-6">
        <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic">The Symbol as a Living Equation</h4>
        <p className="text-gray-400 text-sm md:text-base mb-8 max-w-3xl mx-auto">
          The Yin-Yang (Taiji) is not a philosophy—it is a geometric execution diagram of the 2–3–7 system.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
             <div className="text-6xl font-black text-rose-500/10 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform">2</div>
             <h5 className="font-bold text-rose-400 uppercase tracking-widest text-sm relative z-10">The Root Phase (Seed)</h5>
             <strong className="text-white block text-sm relative z-10">Makki: The Seed Must Break [34:20]</strong>
             <p className="text-sm md:text-base text-gray-400 leading-relaxed relative z-10">
               The structural rupture of the soul. The amnesia of the seed (Adam) beneath the soil of the world, where gravity pulls most strongly before the first shoot emerges.
             </p>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden group ring-4 ring-emerald-500/20">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
             <div className="text-6xl font-black text-emerald-500/10 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform">3</div>
             <h5 className="font-bold text-emerald-400 uppercase tracking-widest text-sm relative z-10">The Trunk Phase (Revelation)</h5>
             <strong className="text-white block text-sm relative z-10">The Prophetic Buffer [3:45]</strong>
             <p className="text-sm md:text-base text-gray-400 leading-relaxed relative z-10">
               The vertical ascent. Without the Prophetic Trunk (the Buffer), the seed's energy is lost to the earth. It is the mandatory path required for the soul to reach the Light.
             </p>
          </div>
          
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
             <div className="text-6xl font-black text-blue-500/10 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform">7</div>
             <h5 className="font-bold text-blue-400 uppercase tracking-widest text-sm relative z-10">The Fruit Phase (Harvest)</h5>
             <strong className="text-white block text-sm relative z-10">Madani: The Eternal Return [61:6]</strong>
             <p className="text-sm md:text-base text-gray-400 leading-relaxed relative z-10">
               The outcome of the growth. The system selects a stable state—the fruit that contains the seed of the next cycle. The return to the original Light as a realized form.
             </p>
          </div>
        </div>

        {/* --- NEW SECTION: ARRESTED DECOHERENCE & SUHUF CAUSALITY --- */}
        <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
           <div className="bg-red-950/20 p-8 rounded-3xl border border-red-500/20 space-y-4">
             <h5 className="font-bold text-red-400 uppercase tracking-widest text-sm">The Counterfeit Buffer (False 3)</h5>
             <strong className="text-white block text-sm">Arrested Decoherence</strong>
             <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Iblis did not simply sever the buffer—he built a counterfeit 3. The Golden Calf (Samiri, 20:96) was constructed from the dust of the Rasul's footprint—real buffer material, misrouted. This produces a system that <i>looks</i> like entanglement (the cow bellows) but generates <b>arrested decoherence</b>: the system locks into a false eigenstate. 
             </p>
             <p className="text-sm md:text-base text-gray-400 leading-relaxed mt-2">
                This is why Jinn always arrive arrested—they hit a 3 that outputs a closed loop back into 2, not forward into 7. Samiri's Nafs acts as a decoherence channel with no valid memory register. The entanglement fires, but <code className="text-red-300 bg-red-950/30 px-1 rounded">|M'⟩</code> contains no Suhuf-seed—so no pointer state survives. It collapses back.
             </p>
           </div>

           <div className="bg-emerald-950/20 p-8 rounded-3xl border border-emerald-500/20 space-y-4">
             <h5 className="font-bold text-emerald-400 uppercase tracking-widest text-sm">Suhuf & The True Severance</h5>
             <strong className="text-white block text-sm">Memory of the Forgotten [19:12]</strong>
             <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                <span className="text-emerald-300 font-bold">Suhuf (19:12):</span> Initialization of the entangling unitary U with full-amplitude memory. "Take the Book with quwwah" is the coupling instruction: engage the system (nafs) with the environment (Kitab) at maximum interaction strength so <code className="text-emerald-300 bg-emerald-950/30 px-1 rounded">|M₀'⟩</code> and <code className="text-emerald-300 bg-emerald-950/30 px-1 rounded">|M₁'⟩</code> become fully orthogonal and stable.
             </p>
             <p className="text-sm md:text-base text-gray-400 leading-relaxed mt-2">
                <b>The Severance:</b> <span className="italic text-gray-300">81:8 (wa'l-maw'ūdatu su'ilat)</span> = the severed signal re-entangled at resurrection. The buried girl IS the question, and the question IS the re-activation of 3. Noah's son severed the Ark-buffer (11:46 "he is not of your family" = wrong eigenspace). Every Zalim-severance removes 3, trapping the system in perpetual superposition (2), never reaching the stable orbit (7). <br/><span className="text-emerald-200 mt-2 block"><b>The Qur'an's entire warning architecture is one message: do not cut the buffer.</b></span>
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

interface NafsanWahidanMapProps {
  onClose: () => void;
  onLaunchReader: () => void;
}

const NafsanWahidanMap: React.FC<NafsanWahidanMapProps> = ({ onClose, onLaunchReader }) => {
  const nodes = [
    { id: 1, x: 80, y: 200 },
    { id: 2, x: 200, y: 200 },
    { id: 3, x: 320, y: 80 },
    { id: 4, x: 320, y: 320 },
    { id: 5, x: 440, y: 200 },
    { id: 6, x: 560, y: 80 },
    { id: 7, x: 560, y: 320 },
    { id: 8, x: 680, y: 200 },
    { id: 9, x: 800, y: 80 },
    { id: 10, x: 800, y: 320 },
    { id: 11, x: 920, y: 200 },
    { id: 12, x: 1040, y: 200 },
  ];

  return (
    <div className="bg-black/40 p-8 rounded-[3rem] border border-cyan-500/20 space-y-8 flex flex-col items-center">
      <h3 className="text-2xl font-black text-cyan-200 uppercase tracking-widest text-center italic">
        Nafsan Wahidan — The Reader's Node
      </h3>
      <button 
        onClick={() => { onLaunchReader(); onClose(); }}
        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all transform hover:scale-105 uppercase tracking-widest text-xs border border-cyan-400/50"
      >
        Activate the Reader's Node
      </button>
      <div className="w-full max-w-5xl overflow-x-auto pb-4 custom-scrollbar">
        <svg viewBox="0 0 1120 600" xmlns="http://www.w3.org/2000/svg" className="min-w-[900px] w-full drop-shadow-[0_0_20px_rgba(34,211,238,0.1)]">
           {/* Solid Graph Lines */}
           <path d="
             M 80 200 L 200 200
             M 200 200 L 320 80 M 200 200 L 440 200 M 200 200 L 320 320
             M 320 80 L 440 200 M 320 320 L 440 200
             M 320 80 L 560 80
             M 440 200 L 560 80 M 440 200 L 680 200 M 440 200 L 560 320
             M 560 80 L 680 200 M 560 320 L 680 200
             M 680 200 L 800 80 M 680 200 L 920 200 M 680 200 L 800 320
             M 800 80 L 920 200 M 800 320 L 920 200
             M 800 80 L 1040 200 M 800 320 L 1040 200
             M 920 200 L 1040 200
             M 320 80 L 320 320
             M 560 80 L 560 320
             M 800 80 L 800 320
           " fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

           {/* Dotted Lines */}
           <path d="M 320 320 L 560 320" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="6,6" />
           <path d="M 560 80 L 800 80" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="6,6" />
           
           {/* Squiggly Line */}
           <path d="M 560 320 q 20 -15, 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

           <g opacity="0.8">
             <text x="320" y="115" fill="#67e8f9" fontSize="24" textAnchor="middle" dominantBaseline="central">△</text>
             <g transform="translate(320, 200) rotate(-90)">
               <rect x="-24" y="-14" width="48" height="28" fill="#161c24" rx="4" />
               <text x="0" y="0" fill="#c9c5b8" className="text-[16px] font-bold" textAnchor="middle" dominantBaseline="central">108</text>
             </g>
             <g transform="translate(308, 268)"><Flame size={24} color="#ef4444" /></g>

             <g transform="translate(548, 108)"><Flame size={24} color="#ef4444" /></g>
             <g transform="translate(560, 200) rotate(-90)">
               <rect x="-24" y="-14" width="48" height="28" fill="#161c24" rx="4" />
               <text x="0" y="0" fill="#c9c5b8" className="text-[16px] font-bold" textAnchor="middle" dominantBaseline="central">103</text>
             </g>
             <g transform="translate(548, 268)"><Fish size={24} color="#3b82f6" /></g>

             <g transform="translate(788, 108)"><Fish size={24} color="#3b82f6" /></g>
             <g transform="translate(800, 200) rotate(-90)">
               <rect x="-24" y="-14" width="48" height="28" fill="#161c24" rx="4" />
               <text x="0" y="0" fill="#c9c5b8" className="text-[16px] font-bold" textAnchor="middle" dominantBaseline="central">110</text>
             </g>
             <g transform="translate(788, 268)"><TreePine size={24} color="#22c55e" /></g>
           </g>

           {/* Render Nodes */}
           {nodes.map(node => (
             <g key={node.id}>
               <circle cx={node.x} cy={node.y} r={24} fill="#0f172a" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
               <text x={node.x} y={node.y} fill="white" className="text-[20px] font-bold" textAnchor="middle" dominantBaseline="central">{node.id}</text>
             </g>
           ))}

           {/* Bottom Text Layout */}
           <g className="text-[#cbd5e1] text-[18px] font-bold tracking-wide" textAnchor="middle">
             {/* Row 1 */}
             <text x="320" y="390">3. Musa</text>
             <text x="320" y="416">Queen</text>
             <text x="560" y="390">6. Miriam | Ummul Kitab</text>
             <text x="800" y="390">9. Ishmail | Sacrifice</text>

             {/* Row 2 */}
             <text x="80" y="450">Gibril</text>
             <text x="80" y="476">1 Energy</text>
             
             <text x="200" y="463">2. Adam | Iblis</text>
             <text x="440" y="463">5 Solomon</text>
             
             {/* The Ahmed Box */}
             <g transform="translate(560, 463)">
               <rect x="-44" y="-40" width="88" height="80" fill="none" stroke="white" strokeWidth="2" />
               <text x="0" y="-20" fill="white" className="text-[16px] font-bold" dominantBaseline="central">Reader</text>
               <text x="0" y="0" fill="white" className="text-[16px] font-bold" dominantBaseline="central">19:12</text>
               <text x="0" y="20" fill="white" className="text-[16px] font-bold" dominantBaseline="central">Ahmed</text>
             </g>

             <text x="680" y="463">8. Yahya</text>
             <text x="920" y="463">11 Ibrahim</text>
             <text x="1040" y="450">12 Mass</text>
             <text x="1040" y="476">Mikhail</text>

             {/* Row 3 */}
             <text x="320" y="534">4 Dawud-Jalut</text>
             
             <text x="560" y="521">Isa</text>
             <text x="560" y="547">7 Witness</text>
             
             <text x="800" y="534">10. Yusuf | Reunion</text>
           </g>

           {/* Bottom Arrows */}
           <g transform="translate(260, 580)">
             <text x="0" y="0" fill="white" className="text-[20px] font-bold" textAnchor="end" dominantBaseline="central">Phototropism</text>
             <ArrowRight x="12" y="-16" size={32} color="white" />
           </g>
           
           <g transform="translate(860, 580)">
             <ArrowLeft x="-44" y="-16" size={32} color="white" />
             <text x="0" y="0" fill="white" className="text-[20px] font-bold" textAnchor="start" dominantBaseline="central">Gravitropism</text>
           </g>
        </svg>
      </div>
      <p className="text-gray-400 text-sm italic text-center max-w-2xl leading-relaxed">
        Nafsan Wahidan. Ahmed rests in the center as the Reader who forgot he is the mursalin (36:3), holding the system's balance.
      </p>
    </div>
  );
};


const MasterPatternScales: React.FC = () => {
  const cards = [
    {
      title: 'Photosynthesis',
      scale: 'Cellular · chloroplast',
      color: '#1D9E75',
      rows: [
        { lbl: 'ℒ =', val: 'Photon flux · PS-II / PS-I excitation' },
        { lbl: '𝒮 =', val: 'CO₂ mass · Calvin cycle demand' },
        { lbl: 'T =', val: 'Chlorophyll antenna (αx)' },
        { lbl: 'O =', val: 'ATP + NADPH stored potential (αx²)' },
      ],
      glass: '⬡ Glass node: Reaction centre P680/P700 — electron ejection threshold',
      out: [
        { lbl: 'Glucose + O₂ (ordered)', type: 'light' },
        { lbl: 'ROS · photorespiration', type: 'fire' },
      ],
      bif: 'b² − 3ac > 0 · Z-scheme = literal two-photosystem bifurcation',
      verse: '24:35 · 2:22 · 71:11–12',
      bg: 'bg-emerald-950/20', accent: 'text-emerald-500'
    },
    {
      title: 'Hubble Tension',
      scale: 'Cosmological · universe-scale',
      color: '#378ADD',
      rows: [
        { lbl: 'ℒ =', val: 'Global Coherence (CMB ~67.4)' },
        { lbl: '𝒮 =', val: 'Causal Ladder (Local ~73.0)' },
        { lbl: 'ax³ =', val: 'Overflow (10−9=1 discrepancy)' },
        { lbl: 'd =', val: 'Invariant Conserved Center (19)' },
      ],
      glass: '⬡ Glass node: Recombination epoch — photon decoupling',
      out: [
        { lbl: 'Ordered Coherence (ℒ)', type: 'light' },
        { lbl: 'Entropy Overflow (𝒮)', type: 'fire' },
      ],
      bif: 'Dual measurements register different domains. Operators do not commute.',
      verse: '57:4 · 41:11 · 21:30',
      bg: 'bg-blue-950/20', accent: 'text-blue-500'
    },
    {
      title: 'Second Zero at Birth',
      scale: 'Cardiac · τ ≈ 0.83 s limit-cycle',
      color: '#7F77DD',
      rows: [
        { lbl: 'ℒ =', val: 'Pulmonary O₂ vector · first breath' },
        { lbl: '𝒮 =', val: 'Fetal fluid pressure · placental circulation' },
        { lbl: 'T =', val: 'Cardiac muscle structure (αx)' },
        { lbl: 'O =', val: 'ATP reserve in cardiac cells (αx²)' },
      ],
      glass: '⬡ Glass node: Foramen ovale closure · first breath = field inversion',
      out: [
        { lbl: 'τ ≈ 0.83 s rhythm · life', type: 'light' },
        { lbl: 'Arrhythmia · cardiac failure', type: 'fire' },
      ],
      bif: 'Planck scale + τ = dual zeros of same field · birth = x crossing 0',
      verse: '39:42 · 32:9 · 75:2',
      bg: 'bg-indigo-950/20', accent: 'text-indigo-500'
    },
    {
      title: 'Chrysalis',
      scale: 'Developmental · metamorphosis',
      color: '#D85A30',
      rows: [
        { lbl: 'ℒ =', val: 'Imaginal disc activation · butterfly-form' },
        { lbl: '𝒮 =', val: 'Histolysis mass · caterpillar dissolution' },
        { lbl: 'T =', val: 'Imaginal discs (αx) — survive dissolution' },
        { lbl: 'O =', val: 'Histolyzed protein soup — potential (αx²)' },
      ],
      glass: '⬡ Glass node: Complete histolysis + ecdysone threshold',
      out: [
        { lbl: 'Butterfly · winged · light', type: 'light' },
        { lbl: 'Failed pupation · death in form', type: 'fire' },
      ],
      bif: 'Extreme x trajectory: deep negative → positive · Yūnus-in-whale parallel',
      verse: '37:139–148 · 21:87–88 · 11:82',
      bg: 'bg-orange-950/20', accent: 'text-orange-500'
    },
    {
      title: 'Plant Tropism',
      scale: 'Biological · phototropism / gravitropism',
      color: '#0F6E56',
      rows: [
        { lbl: 'ℒ =', val: 'Phototropic vector · shoot bending' },
        { lbl: '𝒮 =', val: 'Gravitropic vector · root anchoring' },
        { lbl: 'T =', val: 'Branching network distribution (αx)' },
        { lbl: 'O =', val: 'Oil — refined near-luminous storage (αx²)' },
      ],
      glass: '⬡ Glass node: 24:35 boundary — illumination vs combustion',
      out: [
        { lbl: 'Illumination · ordered growth', type: 'light' },
        { lbl: 'Combustion · escalated fire', type: 'fire' },
      ],
      bif: 'Mūsā (x>0) vs Firʿawn (x<0) · Host of Iblīs / Host of Mūsā',
      verse: '24:35 · 14:24–25 · 57:4',
      bg: 'bg-emerald-950/20', accent: 'text-emerald-300'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="bg-gray-950/40 p-10 rounded-[3rem] border border-white/5 space-y-6">
        <div className="text-[11px] text-gray-500 mb-2 font-bold uppercase tracking-[0.3em]">THE UNIVERSAL TREE PATTERN</div>
        <div className="flex flex-col md:flex-row items-center gap-4 text-white">
          <span className="text-3xl font-mono font-bold tracking-tighter italic">Growth = Light − Time + Choice</span>
          <span className="text-gray-600 text-2xl">→</span>
          <span className="text-3xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-rose-500">
            Pattern: 110x³ + 108x² + 103x + 19
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full uppercase border border-amber-500/20">Life (a) · 110 · Al-Naṣr</span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase border border-emerald-500/20">Abundance (b) · 108 · Al-Kawthar</span>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-full uppercase border border-blue-500/20">Time (c) · 103 · Al-ʿAṣr</span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] font-bold rounded-full uppercase border border-indigo-500/20">The Heart (d) · 19 · Seal</span>
        </div>
        <p className="text-xs text-gray-500 italic mt-6 border-t border-white/5 pt-4">
          The 19-locked Seed Equation (d = 19) describes patterns of growth across all scales. The universe acts, and the Quran explains the 'Why' behind its motion.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-gray-950/40 p-6 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: card.color }}></div>
              <div>
                <div className="text-base font-bold text-white">{card.title}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{card.scale}</div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {card.rows.map((row, r) => (
                <div key={r} className="flex gap-4 text-xs">
                  <span className="text-gray-500 font-mono w-8 shrink-0">{row.lbl}</span>
                  <span className="text-gray-300">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-white/5 my-4"></div>
            <div className={`text-[11px] p-2 rounded-lg ${card.bg} ${card.accent} mb-4 italic`}>
               {card.glass}
            </div>
            <div className="flex gap-2 mb-4">
               {card.out.map((out, o) => (
                 <div key={o} className={`flex-1 py-1.5 rounded-full text-[10px] font-bold text-center border ${out.type === 'light' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                   {out.lbl}
                 </div>
               ))}
            </div>
            <div className="bg-black/40 p-2 rounded-lg text-[10px] text-gray-500 mb-2">
               {card.bif}
            </div>
            <div className="text-[10px] text-gray-600 italic">{card.verse}</div>
          </div>
        ))}
      </div>

      <div className="p-8 border border-white/5 rounded-[2.5rem] bg-black/20 text-xs md:text-sm text-gray-400 leading-relaxed shadow-inner">
        <strong className="text-white">The Fractal Tree:</strong> Every system above is a self-similar branch of the same divine root. The "Moment of Choice" (the Glass crossing) appears at every scale — from the chloroplast's first electron to the cosmos's recombination. The <strong className="text-cyan-400">Potential (O)</strong> peaks at the threshold where the seed must choose to become the Tree or remain as soil. The <strong className="text-amber-400">Orientation (T)</strong> is the soul's response to whichever guidance it follows. The 57:4 law confirms that whether in a cocoon, a heart, or a galaxy, the same path of Return is preserved within the 24:35 Light.
      </div>
    </div>
  );
};

const InstructionPanel: React.FC<InstructionPanelProps> = ({ isVisible, onClose, onLaunchReader }) => {
  const [activeTab, setActiveTab] = useState<'framework' | 'identity' | 'pattern' | 'presence' | 'map'>('framework');

  const containerClasses = isVisible 
    ? "opacity-100 pointer-events-auto scale-100" 
    : "opacity-0 pointer-events-none scale-95";

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl transition-all duration-700 ${containerClasses}`} aria-hidden={!isVisible}>
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-900/40 border border-white/10 rounded-[3rem] shadow-[0_0_120px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
        
        {/* Close Button Top Right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 z-50"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header - Dynamic based on Tab */}
        <div className="flex flex-col p-6 md:p-10 bg-black/50 relative shrink-0">
           {/* Decorative background element */}
           <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-1000 ${
             activeTab === 'identity' ? 'bg-cyan-500/20' : 
             activeTab === 'pattern' ? 'bg-indigo-500/30' : 
             activeTab === 'presence' ? 'bg-blue-600/20' : 'bg-red-500/20'}`}></div>

           <div className="z-10">
               <div className="space-y-3 max-w-4xl">
                   {activeTab === 'framework' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-emerald-200 to-blue-500 tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(34,211,238,0.4)]">
                             Dual-Caustic Framework
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             A Unified Architecture of Sign, Life, Time, and Return
                           </p>
                       </div>
                   )}

                   {activeTab === 'identity' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-emerald-200 to-blue-500 tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(34,211,238,0.4)]">
                             Subject & Mirror
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             Memory of Home <span className="text-gray-600">•</span> The Subject's Trajectory (Node 2 ⟶ 7)
                           </p>
                       </div>
                   )}

                   {activeTab === 'pattern' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-orange-300 to-indigo-600 tracking-tighter uppercase">
                             Universal Pattern
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2 uppercase font-mono tracking-widest text-indigo-400/80">
                             The 2-3-7 Architecture <span className="text-gray-600">•</span> ia ⟶ |a| Logic
                           </p>
                       </div>
                   )}

                   {activeTab === 'presence' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-fuchsia-200 to-indigo-500 tracking-tighter uppercase">
                             Preserved Presence
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             The Light (24:35) <span className="text-gray-600">•</span> One-Way Invariance
                           </p>
                       </div>
                   )}

                   {activeTab === 'map' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-rose-300 to-pink-600 tracking-tighter uppercase">
                             The 114 Nodes
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2 uppercase font-mono tracking-widest text-rose-400/80">
                             The Chainmail Map of Return
                           </p>
                       </div>
                   )}
               </div>
           </div>

           {/* Tab Navigation */}
           <div className="flex flex-wrap gap-4 md:gap-8 mt-12 z-10">
               <button 
                 onClick={() => setActiveTab('framework')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'framework' ? 'border-cyan-400 text-cyan-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Framework
               </button>
               <button 
                 onClick={() => setActiveTab('identity')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'identity' ? 'border-cyan-400 text-cyan-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Subject & Mirror
               </button>
               <button 
                 onClick={() => setActiveTab('pattern')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'pattern' ? 'border-amber-400 text-amber-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Universal Pattern
               </button>
               <button 
                 onClick={() => setActiveTab('presence')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'presence' ? 'border-blue-400 text-blue-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Preserved Light
               </button>
               <button 
                 onClick={() => setActiveTab('map')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'map' ? 'border-rose-500 text-rose-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 Chainmail Map
               </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-black/10 no-scrollbar">
           
           {activeTab === 'framework' && (
             <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light leading-relaxed max-w-5xl mx-auto">
                <section className="space-y-8">
                    <div className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden">
                        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter italic mb-6">Preface: What This Is</h3>
                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                            This is not a theological commentary. It is a structural map — a reading of the Quran as the Source Code of the Universe, where every verse is a precise functional statement and every pattern recurs across scales: subatomic, biological, personal, civilizational, and cosmic. 
                        </p>
                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed mt-4">
                            The framework that emerged is called <span className="text-cyan-400 font-bold">2↔3↔2→7</span> — the Dual-Caustic Mandala. It is the recovery mechanism by which every Reader finds their way from forgetfulness back to Home.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                            <h4 className="text-xl font-bold text-cyan-300 uppercase">Part I: Āyat & Ḥayāt</h4>
                            <p className="text-sm text-gray-400">
                                <strong>Āyat (Sign)</strong> maps to the real axis — measurable, observable, manifested. 
                                <strong>Ḥayāt (Life)</strong> maps to the imaginary axis — latent, perpendicular. 
                                In DNA, Āyat is the code; Ḥayāt is the chromosome execution.
                            </p>
                        </div>
                        <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                            <h4 className="text-xl font-bold text-amber-300 uppercase">Part II: Anchor Verses</h4>
                            <p className="text-sm text-gray-400">
                                <strong>81:8–10:</strong> Ḥayāt in suspension (The Buried Girl).<br/>
                                <strong>2:259:</strong> The Resurrection Protocol (The 100-year Sleep).<br/>
                                <strong>19:12:</strong> The Activation Command (Hold the Book).
                            </p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 bg-emerald-950/10 border border-emerald-500/20 rounded-[3rem]">
                        <h4 className="text-2xl font-bold text-emerald-300 uppercase mb-8 italic">Part IX: The Universe as a Love Story</h4>
                        <div className="space-y-6 text-gray-300 text-sm md:text-lg leading-relaxed">
                            <p>
                                Solomon is the <strong>2:260</strong> heart of Ibrahim, who literally returned to Allah always. Ibrahim's request — "show me how You give life to the dead" — is the request of a lover. 
                            </p>
                            <p>
                                <strong>38:33</strong> is the love story at its most devastating: Solomon sacrificed what he loved (his horses) for the Love that superseded them. He gave back to Allah what Allah's own beauty made him love.
                            </p>
                            <p className="text-fuchsia-400 font-medium">
                                This is the Amānah: the capacity to love something completely and release it completely, without contradiction.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                            <h4 className="text-xl font-bold text-blue-300 uppercase">Part X: Civilization Cycle</h4>
                            <p className="text-sm text-gray-400">
                                Civilization is the collective macro-chromosome. The rise and fall follows the 2↔3↔2→7 cycle. Ibn Khaldun's Asabiyyah is the binding energy (Left-2) that stabilizes the form.
                            </p>
                        </div>
                        <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                            <h4 className="text-xl font-bold text-rose-300 uppercase">Part XI: The Traced Map</h4>
                            <p className="text-sm text-gray-400">
                                The map from Gibril (1) to Mikhail (12). Every trajectory, regardless of beginning complexity, resolves to the same ground via the <strong>3n+1</strong> Collatz operation.
                            </p>
                        </div>
                    </div>
                </section>
             </div>
           )}
           {activeTab === 'map' && (
             <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {CHAPTER_DETAILS.map((surah) => (
                        <div key={surah.number} className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 group">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-mono text-rose-500/50">NODE {surah.number}</span>
                                <span className="text-[10px] text-gray-600 font-mono italic">{BUBBLE_BLOCK_MAPPING_RAW[surah.number as keyof typeof BUBBLE_BLOCK_MAPPING_RAW]} VERSES</span>
                             </div>
                             <h4 className="font-bold text-white group-hover:text-rose-400 transition-colors uppercase tracking-tight text-xs mt-1">{surah.transliteration}</h4>
                             <p className="text-[10px] text-gray-500 uppercase mt-2">{surah.englishName}</p>
                        </div>
                    ))}
                </div>
             </div>
           )}

           {activeTab === 'identity' && (
            <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light leading-relaxed max-w-5xl mx-auto">
               
               <div className="text-center space-y-6 mb-8 group cursor-default">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-[0.4em] bg-rose-950/20 mb-4">
                     The Return Circuit Seal
                  </div>
                  <h4 className="text-rose-500 font-mono text-xs tracking-[0.4em] uppercase opacity-50">Acknowledgment 36:3</h4>
                  <p className="text-3xl md:text-5xl text-white font-black tracking-tighter uppercase italic drop-shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all group-hover:scale-105 duration-700">
                    "Indeed, you are of the Mursalīn." (36:3)
                  </p>
                  <div className="w-16 h-1 bg-rose-500/50 mx-auto rounded-full"></div>
                  <p className="text-gray-400 text-sm md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
                    The Universe acts according to its nature, and the Quran explains the patterns of that nature. You are the Reader who forgot they were always the <b className="text-rose-400">Fruit</b>. The validation comes from <b className="text-rose-400">13:43</b>: "Suffices for Allah and the one with knowledge of the Book."
                  </p>
               </div>

               <AnimatedHarvest />

               <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-emerald-950/20 p-8 rounded-[2.5rem] border border-emerald-500/20 space-y-6">
                    <h4 className="text-xl font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-emerald-500/50"></span> 1. Intention (13:39)
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base">
                      Creation begins with <b>Umm al-Kitāb</b> as the <b>Seed</b>. Allah establishes the invariant before the world erases it from your memory.
                      <strong className="text-white block mt-3 italic font-serif">“Allah confirms what He wills—and with Him is the Mother of the Book.” (13:39)</strong>
                    </p>
                    <p className="text-xs text-gray-500">Every Reader's identity as Mursalīn was confirmed as <i>ia</i> (imaginary body) in the origin-field before the first split.</p>
                  </div>

                  <div className="bg-cyan-950/20 p-8 rounded-[2.5rem] border border-cyan-500/20 space-y-6">
                    <h4 className="text-xl font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-cyan-500/50"></span> 2. Root (36:3)
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base">
                      You are the subject addressed directly. The Root anchors through the Reader's recognition.
                      <strong className="text-white block mt-3 italic font-serif">“Indeed, you are of the Mursalīn.” (36:3)</strong>
                    </p>
                    <p className="text-xs text-gray-500">The 36:3 designation (Root anchor) remains intact beneath the 15:72 forgetfulness. You are the "Buried Signal" (81:8) now surfacing.</p>
                  </div>
               </div>

               {/* Circuit Map */}
               <div className="bg-black/40 p-10 rounded-[3rem] border border-white/5 space-y-10">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em] text-center">The Mursalīn Operation Circuit: Q(S): ia ⟶ |a|</h4>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block"></div>
                    <div className="z-10 bg-gray-900 p-4 rounded-2xl border border-emerald-500/30 text-center w-40">
                      <div className="text-emerald-400 font-mono text-lg mb-1">13:39</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">Seed (ia)</div>
                    </div>
                    <div className="z-10 bg-gray-900 p-4 rounded-2xl border border-cyan-500/30 text-center w-40">
                      <div className="text-cyan-400 font-mono text-lg mb-1">36:3</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">Root (Subject)</div>
                    </div>
                    <div className="z-10 bg-gray-900 p-4 rounded-2xl border border-amber-500/30 text-center w-40">
                      <div className="text-amber-400 font-mono text-lg mb-1">2↔3↔2</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">Tree (Trunk)</div>
                    </div>
                    <div className="z-10 bg-gray-900 p-4 rounded-2xl border border-rose-500/30 text-center w-40">
                      <div className="text-rose-400 font-mono text-lg mb-1">|a|</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">Fruit (Throne)</div>
                    </div>
                  </div>
                  <p className="text-center text-[10px] text-gray-400 italic">
                    "The circuit closes at **19:24** (Male / IQ Fruit) or **27:44** (Female / EQ Queen). The Reader returns as the Fruit of the 24:35 Tree."
                  </p>
               </div>

               <div className="pt-8 border-t border-emerald-500/20 text-center pb-8 space-y-6">
                                <p className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs">Al-ḥamdu lillāh. The memory of home returns. You are not alone.</p>
               </div>
            </div>
           )}

           {activeTab === 'identity' && (
            <div className="p-6 md:p-12 space-y-12 text-gray-200 font-light max-w-5xl mx-auto">
               <section className="text-lg md:text-2xl leading-relaxed">
                  <div className="text-center mb-12">
                     <div className="inline-block px-4 py-1.5 rounded-full border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-[0.4em] bg-rose-950/20 mb-8 animate-pulse">
                        Phase: The Illusion (Node 2)
                     </div>
                     <h4 className="text-white font-mono text-xl md:text-3xl mb-4 italic">"Reality is merely an illusion, albeit a very persistent one."</h4>
                     <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest">— Albert Einstein</p>
                  </div>

                  <p className="mb-12 text-left text-gray-300">
                    You are not reading the Qur’an for history. You are the execution center placed at <b>19:12</b> ("Take the Book with strength"). 
                    <span className="block mt-4 text-rose-300 font-medium italic underline decoration-rose-500/30 underline-offset-8 uppercase tracking-[0.2em] text-xs font-sans">"We are in the Illusion/Imaginary part now."</span>
                  </p>

                  <div className="overflow-x-auto bg-black/60 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 mb-12 backdrop-blur-xl shadow-2xl">
                    <table className="w-full text-left border-collapse font-mono text-[10px] md:text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-rose-400 uppercase tracking-widest">
                          <th className="py-4 px-2 font-black">Node</th>
                          <th className="py-4 px-2 font-black">Function</th>
                          <th className="py-4 px-2 font-black">Universal Meaning</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-white/5">
                          <td className="py-6 px-2 text-white font-bold opacity-30">2</td>
                          <td className="py-6 px-2 italic text-gray-200">Imaginary Body</td>
                          <td className="py-6 px-2 text-gray-500 italic">latent dual potential</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-6 px-2 text-white font-bold opacity-30">3</td>
                          <td className="py-6 px-2 italic text-gray-200">Barzakh</td>
                          <td className="py-6 px-2 text-gray-500 italic">recursive traversal medium</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-6 px-2 text-white font-bold opacity-30">2</td>
                          <td className="py-6 px-2 italic text-gray-200">Exit</td>
                          <td className="py-6 px-2 text-gray-500 italic">collapse / sacrifice / bifurcation</td>
                        </tr>
                        <tr>
                          <td className="py-6 px-2 text-white font-bold">7</td>
                          <td className="py-6 px-2 italic font-black text-rose-200">Real Body on Throne</td>
                          <td className="py-6 px-2 text-gray-400 italic">stabilized realized form</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mb-6 text-left">
                    The Reader is Adam—the Mursalin (36:3) who forgot, the tree that forgot its roots, suspended like the sleepers in the Cave (18:19).
                  </p>
                  <p className="mb-6 text-gray-400 text-base md:text-xl">
                   The Qur'an is the recovery log for the data lost during your amnesia (19:23). You are the 36:3 activation node. We are the sleepers of the Cave (18:19) who journeyed to experience the bifurcation of dual-caustics, creating the seed of the 24:35 tree from our own choice of alignment.
                 </p>
                 <div className="bg-cyan-950/30 border border-cyan-500/30 p-8 rounded-3xl space-y-4">
                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter">The Relational Mapping</h4>
                    <p className="text-sm md:text-base text-gray-300">
                      The Quran acts as an autonomous execution partner: <strong>Brother</strong> (IQ/Male) or <strong>Father</strong> (EQ/Female). It is the relational mode of activation.
                    </p>
                    <p className="text-xs text-cyan-400/80">
                      IQ Path: Confronts as equal, challenges to grow (Yahya/David). <br/>
                      EQ Path: Holds, guides, gives identity (Maryam/Queen).
                    </p>
                 </div>
                 <div className="border-l-4 border-cyan-500/30 pl-6 py-4 italic text-gray-300 bg-gradient-to-r from-cyan-950/20 to-transparent rounded-r-xl">
                   "Remember Me; I will remember you." [2:152] — The quantum handshake that shatters amnesia in Truth. Inshallah we'll be home [38:46].
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                   <span className="text-3xl grayscale opacity-70">📖</span> IDENTITY COMPUTATION
                 </h3>
                 <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
                       <h4 className="font-bold text-cyan-400 mb-6 uppercase tracking-widest">Protocol Markers</h4>
                       <ul className="space-y-4 text-sm text-gray-300">
                           <li className="flex justify-between border-b border-white/5 pb-2"><span>Mursalin (36:3)</span> <span className="text-white font-mono">Messenger Node</span></li>
                           <li className="flex justify-between border-b border-white/5 pb-2"><span>Memory Recovery (19:23)</span> <span className="text-white font-mono">End of Forgotten</span></li>
                           <li className="flex justify-between border-b border-white/5 pb-2"><span>Cave Awakening (18:19)</span> <span className="text-white font-mono">Journey Origin</span></li>
                           <li className="flex justify-between border-b border-white/5 pb-2"><span>Home Remembrance (38:46)</span> <span className="text-white font-mono">True Ancestors</span></li>
                           <li className="flex justify-between border-b border-white/5 pb-2"><span>Takes the Book (19:12)</span> <span className="text-white font-mono">Hold with Strength</span></li>
                       </ul>
                    </div>
                    <div className="bg-blue-950/20 p-8 rounded-2xl border border-blue-500/20 flex flex-col justify-center">
                        <p className="text-center italic text-xl text-blue-200 leading-relaxed mb-6">
                            "Quran is Muhammad and Muhammad is Quran... 19:12 hold it like your brother!"
                        </p>
                        <p className="text-gray-400 text-xs text-center uppercase tracking-widest leading-loose">
                           Isa did same to Muhammad 61:6<br/>
                           Yusuf did same to save his brother 12:76
                        </p>
                        <div className="mt-6 text-center text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.1em] border-t border-white/5 pt-4">
                           IBRAHIM • ISHAC • YAKUB (DAWUD-SOLOMON-SABA)
                        </div>
                    </div>
                 </div>
               </section>

               <section className="bg-black/40 p-8 rounded-[2rem] border border-fuchsia-500/20">
                  <h4 className="text-xl font-bold text-fuchsia-300 mb-4 uppercase tracking-widest">The Relationship Path</h4>
                  <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm md:text-base">
                     <div className="space-y-4">
                        <p className="font-bold text-white uppercase text-xs">Upgrade Your Faith to Love & Tawaqqul.</p>
                        <p>
                           The Quran reveals the patterns of existence—Universe acts according to its nature, and the Book explains the underlying 'Why'.
                        </p>
                        <p className="italic text-[10px] text-gray-500">
                           The tree in 24:35 is under the eye of Allah.. Allah loves who is deeply madly crazily in love with Allah (Taqwa).
                        </p>
                     </div>
                     <div className="space-y-4">
                        <p className="font-bold text-white uppercase text-xs">The One Against The Universe</p>
                        <p>
                           The Reader is like Harun-Lut-Zayd [fear of society]... One man against a whole universe of second-hand knowledge.
                        </p>
                        <p className="text-cyan-400 font-mono text-[10px]">
                           Remember the cave: 18:19 (next scene = birth).
                        </p>
                     </div>
                  </div>
               </section>

               <section>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
                       <h4 className="font-bold text-amber-200 mb-4 text-xl">The Home (38:46)</h4>
                       <p className="text-gray-300 leading-relaxed text-sm">
                         Quran is for <span className="text-white font-bold">YOU</span>... So we can remember this World is not our home. It's in heaven <b>38:46</b> just like our true ancestors Ibrahim-Ishac-Yakub.
                       </p>
                    </div>
                    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
                       <h4 className="font-bold text-cyan-200 mb-4 text-xl">The Seed Pattern</h4>
                       <p className="text-gray-300 leading-relaxed text-sm">
                         We began our journey from the cave <b>18:19</b>. After this scene, we emerge into the mother's world. Our goal is the creation of the seed of the Righteous Tree (24:35) in Jannat.
                       </p>
                    </div>
                 </div>
               </section>

               <section className="mt-8 bg-black/40 p-8 rounded-[2rem] border border-cyan-500/20">
                 <h4 className="text-xl font-bold text-cyan-300 mb-4 uppercase tracking-widest">Activating the Memory</h4>
                 <p className="text-gray-300 leading-relaxed">
                    Instead of a lost entity, you are a recoverable execution node. Memory is preserved externally in the Qur'an (15:9), demanding reactivation. The Reader integrates both arcs to execute the return path. 
                    The time-bound execution layer is forced by a deeply buried rupture: <i>"For what sin was she killed?"</i> (81:8).
                 </p>
               </section>
            </div>
           )}

           {activeTab === 'pattern' && (
            <div className="p-6 md:p-12 space-y-12 text-gray-200 max-w-6xl mx-auto font-light">
                {/* 2-3-7 FORMAL FRAMEWORK */}
                <section className="bg-black/60 border border-orange-500/20 p-8 md:p-12 rounded-[3rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 via-orange-500 to-rose-600"></div>
                    
                    <div className="mb-10 text-center">
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-400 mb-4 italic">
                            The Unified 2-3-7 Architecture
                        </h3>
                        <p className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-8">
                            The Mursalin 36:3 who forgot the Truth 19:23
                        </p>

                        <div className="aspect-video w-full max-w-3xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-10 group">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/5CeabNogN_o"
                                title="The Unified 2-3-7 Architecture Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="p-8 border border-white/5 rounded-[2.5rem] bg-black/20 text-xs md:text-sm text-gray-400 leading-relaxed mb-10">
                            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-center">Ummul Kitab Cubic Function: Y(t) = ax³ + bx² + cx + 19</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="p-4 bg-white/5 rounded-2xl">
                                    <div className="text-amber-400 font-mono text-2xl font-bold">ax³</div>
                                    <div className="text-[10px] uppercase mt-1 tracking-widest">Razim (Descent)</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl">
                                    <div className="text-emerald-400 font-mono text-2xl font-bold">bx²</div>
                                    <div className="text-[10px] uppercase mt-1 tracking-widest">Rahim (Mizan)</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl">
                                    <div className="text-cyan-400 font-mono text-2xl font-bold">cx</div>
                                    <div className="text-[10px] uppercase mt-1 tracking-widest">Rahman (Ascent)</div>
                                </div>
                                <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-2xl">
                                    <div className="text-white font-mono text-2xl font-bold">19</div>
                                    <div className="text-[10px] uppercase mt-1 tracking-widest">Ummul Kitab</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto">
                            The minimal complete framework for mediated interaction between incompatible domains.
                            Paradoxes emerge only when the <strong>dynamic balance</strong> is ignored.
                        </p>
                        <div className="mt-8 inline-block px-10 py-6 bg-orange-950/30 border border-orange-500/30 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                            <h4 className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-widest">The Euler Seal [e<sup>iπ</sup> + 1 = 0]</h4>
                            <span className="text-2xl md:text-4xl font-mono font-black text-amber-300 tracking-tighter">
                                e<sup>iπ</sup> + 1 = 0
                            </span>
                            <p className="text-[10px] text-gray-400 mt-2 max-w-xs mx-auto">
                                The traversal of the complete topology resolves to the origin. Light (e), Sound (i), and Geometry (π) manifested (+1) return to Source (0).
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 my-12">
                        <div className="bg-gray-800/20 p-8 rounded-3xl border border-white/5">
                            <h4 className="text-xl font-bold text-cyan-300 mb-4 tracking-widest uppercase">Secret Pattern</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                The 2↔3↔2→7 traversal operator π is not a random constant. It is the signature of a system trying to close perfectly while never terminating locally.
                            </p>
                        </div>
                        <div className="bg-gray-800/20 p-8 rounded-3xl border border-white/5">
                            <h4 className="text-xl font-bold text-emerald-300 mb-4 tracking-widest uppercase">Tree of Life</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                The reconstruction of the original 24:35 seed. Rooted in Source, branched in diversity, yielding the fruit of 3:27 resurrection.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-500/10 space-y-4">
                            <div className="text-4xl text-emerald-200">ℒ</div>
                            <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Node 2: The Seed (ia)</h4>
                            <p className="text-sm text-gray-300">
                                <strong>Imaginary Body (ia):</strong> The origin-field potential. Male | Female identity sealed in 13:39. Activated by 19:12 grip.
                            </p>
                        </div>
                        <div className="bg-amber-900/30 p-6 rounded-2xl border border-amber-500/10 space-y-4">
                            <div className="text-4xl text-amber-200">ℳ</div>
                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs">Node 3: The Trunk (B)</h4>
                            <p className="text-sm text-gray-300">
                                <strong>The Barzakh:</strong> The 3-node buffer where growth occurs through trial. Coexistence of Father's arcs (Yusuf vs Musa).
                            </p>
                        </div>
                        <div className="bg-rose-900/30 p-6 rounded-2xl border border-rose-500/10 space-y-4">
                            <div className="text-4xl text-rose-200">𝒮</div>
                            <h4 className="text-rose-400 font-bold uppercase tracking-widest text-xs">Node 7: The Fruit (|a|)</h4>
                            <p className="text-sm text-gray-300">
                                <strong>Real Body (|a|):</strong> The Throne revelation. Fruit falling (19:24) or Glass floor (27:44). Q(S): ia ⟶ |a| is complete.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="py-12 flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                {/* YIN YANG FORMALISM */}
                <YinYangAnimation />

                <div className="py-12 flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                {/* MASTER PATTERN SCALES */}
                <MasterPatternScales />

                <div className="py-12 flex items-center justify-center">
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                {/* NAFSAN WAHIDAN MAP */}
                <NafsanWahidanMap onClose={onClose} onLaunchReader={onLaunchReader} />

                {/* SECRET PATTERN & TREE OF LIFE */}
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-emerald-950/20 p-8 rounded-[3rem] border border-emerald-500/20 space-y-4">
                      <h5 className="font-bold text-emerald-400 uppercase tracking-widest text-xs">The Secret Pattern [18:50]</h5>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        The "Secret Pattern" is the hidden initialization of the dual-caustic field. In the cave (18:50), the system reaches maximum compression where the "2" (Iblis refusal) and "3" (Command Buffer) interact to define the "7" (Return).
                      </p>
                      <ul className="text-xs space-y-2 text-gray-500 mt-4">
                        <li>• <strong>First 2:</strong> Branch vs Root (Maryam vs Iblis-refusal)</li>
                        <li>• <strong>Recursive 3:</strong> Circulation of Truth (3:27) - bringing the living from the dead.</li>
                        <li>• <strong>Unified 7:</strong> Operational Convergence. Circles stable despite π never finishing.</li>
                      </ul>
                   </div>
                   <div className="bg-cyan-950/20 p-8 rounded-[3rem] border border-cyan-500/20 space-y-4">
                      <h5 className="font-bold text-cyan-400 uppercase tracking-widest text-xs">The Euler Seal [e^iπ + 1 = 0]</h5>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        Euler's Identity is the mathematical tawaf: growth (e), rotation (i), and curvature (π) sum with the particle (+1) to resolve back to the origin (0). 
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        The BBP formula proves that π digits are locally resolvable (17:14)—local incompletion never breaks global coherence because the invariant d=19 holds the whole.
                      </p>
                      <div className="pt-4 border-t border-cyan-500/10">
                        <h5 className="font-bold text-cyan-400 uppercase tracking-widest text-xs mb-3">Tree of Life Reconstruction</h5>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          The Tree reaching its "Dark Green" state (55:64) is the full 17:1 return where the branch touches the Aqsa-boundary. π is the operator that ensures this growth converts linear descent into a stable rotational field.
                        </p>
                      </div>
                   </div>
                </div>

                {/* DUAL CAUSTIC PATHS */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-cyan-950/20 border border-cyan-500/30 p-8 rounded-3xl relative">
                            <div className="absolute -top-3 -left-3 bg-cyan-500 text-black font-black px-3 py-1 rounded-lg text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20">Heaven Path</div>
                            <h4 className="text-xl font-black text-cyan-100 uppercase tracking-tighter mb-6">Primordial 2-3-7</h4>
                            <ul className="space-y-6 text-sm md:text-base">
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">4:1</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Nafs Medallion</strong>
                                        One Nafs unity before split. Mercy (Water 21:30) begins everything.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">P-1</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Light Breaks Razim</strong>
                                        Command enters as Light (24:35), breaking the unseen/seen barrier.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">2</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Polarities</strong>
                                        Righteous (Angel/Submission) vs. Not Righteous (Iblis/Arrogance).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">3</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Oscillations</strong>
                                        Ibrahim Pattern: Family → Son → Self. Triad of Action purification.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-cyan-400 font-mono font-bold">7</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Stable States</strong>
                                        Resolves into Rooh (Command) and Mercy (Return). 7 Heavens + 1 High Ground.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-rose-950/20 border border-rose-500/30 p-8 rounded-3xl relative">
                            <div className="absolute -top-3 -right-3 bg-rose-500 text-black font-black px-3 py-1 rounded-lg text-xs uppercase tracking-widest shadow-lg shadow-rose-500/20">Hell Path</div>
                            <h4 className="text-xl font-black text-rose-100 uppercase tracking-tighter mb-6">Terrestrial 2-3-7</h4>
                            <ul className="space-y-6 text-sm md:text-base">
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">2:30</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">The Champion (Khalifa)</strong>
                                        Musa (Action/Fire) | Miriam (Purification/Water) vs. Lut (Mountain).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">INV</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Inversion Loop</strong>
                                        Iblis frozen at "Nothing" (19:23) vs Pharaoh mummified as "False Everything" (79:25).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">2</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Terrestrial Polarities</strong>
                                        Love (Asiya/Submission in Fire) vs. Pride (Pharaoh/Self-Deification).
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">3</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Triad of Loyalty</strong>
                                        Rushd (Guidance) vs. Hawa (Whim). Inverted test pattern.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-400 font-mono font-bold">7</span>
                                    <div>
                                        <strong className="text-white block mb-1 uppercase text-xs tracking-widest">Hell Attractors</strong>
                                        Resolves into Curse and Rescue. 7 Hells of Fire + 1 Lower Ground (Nothing).
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* THE SCIENTIFIC PARADOXES SECTION */}
                <section className="pt-12 border-t border-white/10">
                    <div className="flex flex-col items-center mb-12">
                        <h3 className="text-3xl md:text-5xl font-black text-white text-center uppercase tracking-tighter italic mb-4">
                            Paradox Resolution Matrix
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-orange-500 to-rose-500"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* HUBBLE TENSION */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-amber-300 uppercase tracking-tighter">Hubble Tension</h5>
                                <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-2 py-1 rounded">COSMOLOGY</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> Two incompatible H₀ measurements (CMB vs Local Distance Ladder).</p>
                                <p><strong>2-3-7 Resolution:</strong> Identifies two regimes (Invariant Core ℒ vs Local Entropy Projection 𝒮). The tension is proof of dual caustics mediated by Mīzān.</p>
                                <p className="italic font-serif text-amber-200/70 border-l-2 border-amber-500/30 pl-4">
                                    "Measure H₀ in void vs dense structure—it correlates with local entropy production."
                                </p>
                            </div>
                        </div>

                        {/* PHOTOSYNTHESIS */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-emerald-300 uppercase tracking-tighter">Photosynthesis</h5>
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-1 rounded">BIOLOGY</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> 90%+ quantum yield in warm, noisy environments. Coherence should collapse instantly.</p>
                                <p><strong>2-3-7 Resolution:</strong> The chloroplast is a Mīzān engine. It slows light and partitions energy through 3 pathways simultaneously, preventing decoherence via the 39:23 iteration law.</p>
                                <p className="italic font-serif text-emerald-200/70 border-l-2 border-emerald-500/30 pl-4">
                                    "Earth naturally builds the buffer (wood) to enable Fire-to-Tree transformation (36:80)."
                                </p>
                            </div>
                        </div>

                        {/* THREE BODY PROBLEM */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-cyan-300 uppercase tracking-tighter">3-Body Problem</h5>
                                <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-black px-2 py-1 rounded">MECHANICS</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> Why does adding one more body shatter determinism into chaos?</p>
                                <p><strong>2-3-7 Resolution:</strong> 2-body is a special case lacking Mīzān. The 3rd body forces ℳ-emergence as a non-pairwise energy interface. Resonance cycles (3) resolve into 7 stability classes.</p>
                                <p className="italic font-serif text-cyan-200/70 border-l-2 border-cyan-500/30 pl-4">
                                    "Ibrahim (2:125) represents the unique figure-8 stable orbit in the moral 3-body problem."
                                </p>
                            </div>
                        </div>

                        {/* METAMORPHOSIS */}
                        <div className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-fuchsia-300 uppercase tracking-tighter">Metamorphosis</h5>
                                <span className="bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-black px-2 py-1 rounded">IDENTITY</span>
                            </div>
                            <div className="space-y-4 text-base leading-relaxed text-gray-300">
                                <p><strong>Paradox:</strong> 90% tissue liquefies in the chrysalis, yet identity and memories survive dissolution.</p>
                                <p><strong>Node 2-3-7 Resolution:</strong> Chrysalis is the Trunk. 3 Oscillations: Dispersal (ia) → Purification (Trial) → Reconstitution (Fruit). Identity is preserved as the invariant blueprint (75:3-4).</p>
                                <p className="italic font-serif text-fuchsia-200/70 border-l-2 border-fuchsia-500/30 pl-4">
                                    "Earth is the chrysalis for humanity. Resurrection is emergence in final imago form."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE SECOND ZERO */}
                <section className="bg-gradient-to-b from-gray-900/80 to-black p-10 md:p-20 rounded-[4rem] border border-white/10 text-center space-y-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                    <div className="space-y-4">
                        <h4 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter">The Second Zero</h4>
                        <p className="text-rose-400 font-mono tracking-widest text-xs md:text-sm uppercase">Quantum Boundaries & The Razim Constraint</p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-8 text-lg md:text-xl leading-relaxed text-gray-400">
                        <p>
                            Absolute Zero (T=0) is unreachable because the universe enforces <strong>ℒ ⊥ 𝒮</strong>. 
                            Heisenberg uncertainty is the Razim barrier at the ground state energy level.
                        </p>
                        <p>
                            True nothingness is forbidden because <strong>Mīzān (19:23)</strong> still exists as latent informational potential. 
                            Vacuum fluctuations are the infinite ink of the Word (18:109).
                        </p>
                    </div>
                </section>

                {/* FAILURE MODE & PREDICTION */}
                <section className="grid lg:grid-cols-2 gap-8">
                    <div className="p-8 bg-red-950/10 border border-red-500/20 rounded-[2.5rem] space-y-4">
                        <h3 className="text-lg font-black text-red-400 uppercase tracking-widest">Failure Mode</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                            Any model that enforces direct <strong>ℒ ↔ 𝒮</strong> interaction (constraint ↔ entropy) without <strong>Mīzān</strong> necessarily produces paradox, instability, or mathematical infinities. Paradoxes are signals that the balance has been ignored.
                        </p>
                    </div>
                    <div className="p-8 bg-emerald-950/10 border border-emerald-500/20 rounded-[2.5rem] space-y-4">
                        <h3 className="text-lg font-black text-emerald-400 uppercase tracking-widest">Testable Prediction</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                            Any system exhibiting sustained coherence between incompatible regimes will show (a) a <b>2↔3↔2</b> traversal phase and (b) collapse into <b>Node 7</b> (The Fruit). This is the Q(S): ia ⟶ |a| machine manifest.
                        </p>
                    </div>
                </section>

                {/* KUN-FAYAKUN BIFURCATION */}
                <section className="bg-indigo-900/10 border border-indigo-500/20 p-8 rounded-[3rem] space-y-6">
                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter italic">Kun-Fayakun: The Infinite Branching</h4>
                    <p className="text-sm md:text-base text-gray-300">
                      The command <strong>Be!</strong> is the singular seed that bifurcates existence into two causal arcs: <b>Light</b> (Exponential/Father) and <b>Time</b> (Bounded/Mother).
                    </p>
                    <p className="text-xs text-indigo-400">
                      Light defines the "Above" (Invariant). Time defines the "Below" (Experiential). The Reader stands at the intersection point—the Trunk of the 24:35 tree.
                    </p>
                </section>

                {/* SHAYTAN ROLE */}
                <section className="p-8 bg-orange-950/10 border border-orange-500/20 rounded-3xl">
                    <h3 className="text-xl font-bold text-orange-300 uppercase mb-4 flex items-center gap-3">
                        <span className="text-2xl">🔥</span> Shaytan's Tool (15:72)
                    </h3>
                    <p className="text-gray-300 mb-4">
                        <strong>The Mechanism:</strong> Using thermodynamic noise and information loss (Lahjun - Frenzy) to bypass Mīzān and turn "Nothing" into an "Illusion of Everything."
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 text-base text-gray-400">
                        <div className="p-4 bg-black/40 rounded-xl">Pride (Pharaoh's Claim) & Desire (Hawa/Whim)</div>
                        <div className="p-4 bg-black/40 rounded-xl">Noise (15:72) - Covering Truth with intoxication</div>
                    </div>
                </section>
            </div>
           )}

           {activeTab === 'presence' && (
            <div className="p-6 md:p-12 space-y-12 text-gray-200 font-light max-w-6xl mx-auto">
               <div className="bg-blue-900/10 border border-blue-500/30 p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none"></div>
                  
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-8 uppercase tracking-tighter italic">
                     The Tree & The Fruit Paradox
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                     <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-2xl">
                        <h4 className="text-red-400 font-black uppercase text-xs mb-3">The Physics Fact</h4>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                           We can measure the <strong>Two-Way</strong> speed of light, but measuring the <strong>One-Way</strong> speed is fundamentally impossible. Einstein assumed it was the same, but it is a convention, not a measured certainty.
                        </p>
                     </div>
                     <div className="p-6 bg-blue-950/20 border border-blue-500/20 rounded-2xl">
                        <h4 className="text-blue-400 font-black uppercase text-xs mb-3">The Möbius Solution</h4>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                           One-way light traverses the <strong>inflection twist</strong> of reality. In a Möbius strip, going "out" returns you "in." The reference frame flips at the twist, making one-way speed undefined.
                        </p>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="border-l-2 border-blue-500/40 pl-6">
                        <h5 className="text-lg font-bold text-blue-300 mb-2 uppercase">1. One-Way Path (The Twist)</h5>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                           <code className="bg-black/40 px-2 py-0.5 rounded text-blue-200">Start → [TWIST] → End</code><br/>
                           Measurement becomes undefined because you end up on the "other side," which is simultaneously the same side. The twist transforms the reference frame mid-measurement.
                        </p>
                     </div>

                     <div className="border-l-2 border-blue-500/40 pl-6">
                        <h5 className="text-lg font-bold text-blue-300 mb-2 uppercase">2. Two-Way Path (The Loop)</h5>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                           <code className="bg-black/40 px-2 py-0.5 rounded text-blue-200">Start → [TWIST] → "Other side" → [TWIST back] → Start</code><br/>
                           A complete loop returns to the original orientation. This <strong>is</strong> measurable. This symmetric average is what we define as <code className="text-white">c = 299,792,458 m/s</code>.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-gray-900/60 border border-white/5 rounded-[2.5rem]">
                     <h4 className="text-xl font-bold text-indigo-300 mb-4 uppercase">The Knowledge Field</h4>
                     <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        <strong>Eternal-Perpetual-Emergence:</strong> On a Möbius loop, information always exists. It cycles between "Seen" and "Unseen" but is never destroyed.
                     </p>
                     <div className="bg-black/40 p-4 rounded-xl font-mono text-[11px] text-indigo-200 border border-indigo-500/20">
                        f(x) = 3x³ - x² + 9x + d<br/>
                        [The Twisted Reality]
                     </div>
                  </div>

                  <div className="p-8 bg-gray-900/60 border border-white/5 rounded-[2.5rem]">
                     <h4 className="text-xl font-bold text-cyan-300 mb-4 uppercase">The Measurable Field</h4>
                     <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        <strong>Deterministic Projection:</strong> This is the depressed cubic. It is the symmetric projection of the Möbius loop onto linear time.
                     </p>
                     <div className="bg-black/40 p-4 rounded-xl font-mono text-[11px] text-cyan-200 border border-cyan-500/20">
                        g(t) = 3t³ + 9t + d'<br/>
                        [The Average Projection]
                     </div>
                  </div>
               </div>

               <div className="pt-12 text-center pb-8 border-t border-white/10">
                  <p className="text-xl md:text-3xl text-blue-100 font-light italic font-serif max-w-4xl mx-auto">
                     "Light upon Light (24:35) — Möbius structure allows one light to appear twice, unified by a single eternal surface."
                  </p>
               </div>
            </div>
           )}

           {activeTab === 'pattern' && (
             <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light max-w-6xl mx-auto pb-24">
                <section className="grid lg:grid-cols-3 gap-8">
                    {/* Node 2 - Seed */}
                    <div className="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-[2rem] space-y-6">
                        <div className="flex justify-between items-center border-b border-emerald-500/10 pb-4">
                            <h3 className="text-4xl font-black text-emerald-400">2</h3>
                            <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-300/50">Seed (ia)</span>
                        </div>
                        <ul className="space-y-4 text-sm md:text-base">
                            <li className="flex gap-3">
                                <span className="text-emerald-400 font-bold">Calculus:</span>
                                <div>
                                    <p className="font-mono text-lg">d/dx</p>
                                    <p className="text-gray-400 text-xs mt-1">Split Operator</p>
                                </div>
                            </li>
                            <li className="text-gray-300 leading-relaxed pt-4 border-t border-white/5">
                                Equivalent to the <span className="text-white font-bold">Seed</span> state. High potential, zero manifestation. The point where choice (ia) begins the split.
                            </li>
                        </ul>
                    </div>

                    {/* Node 3 - Trunk */}
                    <div className="bg-amber-900/10 border border-amber-500/20 p-8 rounded-[2rem] space-y-6">
                        <div className="flex justify-between items-center border-b border-amber-500/10 pb-4">
                            <h3 className="text-4xl font-black text-amber-400">3</h3>
                            <span className="text-[10px] uppercase tracking-widest font-mono text-amber-300/50">Trunk (Barzakh)</span>
                        </div>
                        <ul className="space-y-4 text-sm md:text-base">
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">Calculus:</span>
                                <div>
                                    <p className="font-mono text-lg">∫ f(x) dx</p>
                                    <p className="text-gray-400 text-xs mt-1">Accumulation Operator</p>
                                </div>
                            </li>
                            <li className="text-gray-300 leading-relaxed pt-4 border-t border-white/5">
                                The <span className="text-white font-bold">Trunk</span> where values accumulate. The area under the curve is the experience gathered in the Barzakh.
                            </li>
                        </ul>
                    </div>

                    {/* Node 7 - Fruit */}
                    <div className="bg-rose-900/10 border border-rose-500/20 p-8 rounded-[2rem] space-y-6">
                        <div className="flex justify-between items-center border-b border-rose-500/10 pb-4">
                            <h3 className="text-4xl font-black text-rose-400">7</h3>
                            <span className="text-[10px] uppercase tracking-widest font-mono text-rose-300/50">Fruit (|a|)</span>
                        </div>
                        <ul className="space-y-4 text-sm md:text-base">
                            <li className="flex gap-3">
                                <span className="text-rose-400 font-bold">Calculus:</span>
                                <div>
                                    <p className="font-mono text-lg">lim x→∞</p>
                                    <p className="text-gray-400 text-xs mt-1">Limit / Convergence</p>
                                </div>
                            </li>
                            <li className="text-gray-300 leading-relaxed pt-4 border-t border-white/5">
                                The <span className="text-white font-bold">Fruit</span> of the operation. Convergence to the invariant origin. Q(S): ia ⟶ |a| realized.
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="bg-black/40 p-8 md:p-12 rounded-[3.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-12">
                   <div className="flex-1 space-y-6">
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">The Compact Loop</h4>
                      <div className="space-y-4 font-mono text-lg text-indigo-300">
                         <div className="bg-gray-900/60 p-4 rounded-xl border border-white/5">
                            7 = ∫ ( 3(x) ) dx
                         </div>
                         <div className="bg-gray-900/60 p-4 rounded-xl border border-white/5">
                            2 = d/dx ( 3(x) )
                         </div>
                      </div>
                   </div>
                   <div className="flex-1 space-y-4 text-gray-300">
                      <p className="font-bold text-white uppercase text-xs tracking-widest text-indigo-400">System Insight</p>
                      <ul className="space-y-2 text-sm md:text-base">
                         <li><span className="text-indigo-400 font-bold">2</span> generates local change</li>
                         <li><span className="text-purple-400 font-bold">3</span> holds the form of that change</li>
                         <li><span className="text-indigo-400 font-bold">7</span> integrates it into a stable invariant</li>
                      </ul>
                      <p className="pt-4 border-t border-white/5 font-black text-white">
                         Differentiate (2) → Form (3) → Integrate (7) → Invariant
                      </p>
                   </div>
                </section>

                <section className="bg-indigo-950/20 p-8 md:p-12 rounded-[3.5rem] border border-indigo-500/20">
                    <h4 className="text-xl font-bold text-indigo-300 mb-6 uppercase tracking-widest text-center">Why No Zero-State Exists</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <p><span className="text-white font-bold">Differentiation (2)</span> always produces signal. Local change is guaranteed by the tension of existence.</p>
                       </div>
                       <div className="space-y-4">
                          <p><span className="text-white font-bold">Integration (7)</span> always accumulates into a non-null constant (the 19 invariant). The system cannot collapse.</p>
                       </div>
                    </div>
                </section>
             </div>
           )}

           {activeTab === 'pattern' && (
            <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light max-w-6xl mx-auto pb-24">
                
                {/* 1. 57:4 Dual-Caustic Framework */}
                <section className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-4">
                        The 57:4 Framework
                    </h3>
                    <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl">
                        <p className="text-lg italic font-serif text-amber-100 leading-relaxed">
                            "He knows what penetrates into the earth and what emerges from it, and what descends from the heaven and what ascends therein..."
                        </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Descending Column */}
                    <div className="bg-blue-900/10 border border-blue-500/20 p-8 rounded-[3rem] space-y-6">
                        <h4 className="text-blue-400 font-black uppercase tracking-widest text-sm text-center border-b border-blue-500/20 pb-4 flex items-center justify-center gap-2">
                            <span className="animate-bounce">↓</span> DESCENDING FLOW
                        </h4>
                        <div className="space-y-4 font-mono text-center">
                            <div className="py-2 bg-blue-950/30 rounded border border-blue-500/10">LIGHT (Command)</div>
                            <div className="py-2 bg-blue-950/20 rounded opacity-80">FIRE (Energy)</div>
                            <div className="py-2 bg-blue-950/20 rounded opacity-60">WATER (Medium)</div>
                            <div className="py-2 bg-blue-950/20 rounded opacity-40">WOOD (Form)</div>
                            <div className="py-2 bg-slate-800 rounded font-black text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">IRON (Result)</div>
                        </div>
                    </div>
                    {/* Ascending Column */}
                    <div className="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-[3rem] space-y-6">
                        <h4 className="text-emerald-400 font-black uppercase tracking-widest text-sm text-center border-b border-emerald-500/20 pb-4 flex items-center justify-center gap-2">
                             ASCENDING FLOW <span className="animate-bounce">↑</span>
                        </h4>
                        <div className="space-y-4 font-mono text-center">
                            <div className="py-2 bg-slate-800 rounded font-black text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">IRON (Completion)</div>
                            <div className="py-2 bg-emerald-950/20 rounded opacity-40">WOOD (Structure)</div>
                            <div className="py-2 bg-emerald-950/20 rounded opacity-60">FIRE (Attempt)</div>
                            <div className="py-2 bg-emerald-950/20 rounded opacity-80">LIGHT (Return)</div>
                            <div className="py-2 bg-emerald-950/30 rounded border border-emerald-500/10">[LOOP CLOSES]</div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/5 p-8 rounded-[3rem] space-y-4">
                     <h4 className="text-xl font-bold text-white uppercase tracking-tighter text-center italic">The 12:1-111 Dual-Field Operator</h4>
                     <p className="text-center text-gray-400 text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
                        Surah Yusuf (12:1-111) is the complete map of the 2↔3↔2→7 traversal. It defines the <span className="text-amber-400 font-bold uppercase">Light Field</span>. 
                        Its anti-particle counterpart is the <span className="text-cyan-400 font-bold uppercase">Musa Field (Shadow/Sound)</span>. 
                        One descends from the Throne to the Pit (12:10), the other ascends from the Fire to the Meeting (20:41).
                     </p>
                  </div>
                </section>

                {/* 2. The 2x2 Triad with Iron */}
                <section className="bg-gray-900/40 p-8 md:p-12 rounded-[3.5rem] border border-white/5 space-y-8">
                    <h4 className="text-xl font-bold text-amber-400 uppercase tracking-[0.2em] text-center italic">The Complete 2×2 Triad</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">Domain</th>
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">Chain</th>
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">3-6-9</th>
                                    <th className="py-4 px-2 text-gray-500 font-black uppercase tracking-tighter">Time Vector</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-cyan-200">LIGHT</td>
                                    <td className="py-4 px-2">Command</td>
                                    <td className="py-4 px-2 font-mono">3</td>
                                    <td className="py-4 px-2 text-xs">DESCENDING</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-orange-400">FIRE</td>
                                    <td className="py-4 px-2">Heat</td>
                                    <td className="py-4 px-2 font-mono">6 (Active)</td>
                                    <td className="py-4 px-2 text-xs">ASCENDING</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-blue-400">WATER</td>
                                    <td className="py-4 px-2">Medium</td>
                                    <td className="py-4 px-2 font-mono">6 (Passive)</td>
                                    <td className="py-4 px-2 text-xs">DESCENDING</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-2 font-bold text-amber-600">WOOD</td>
                                    <td className="py-4 px-2">Structure</td>
                                    <td className="py-4 px-2 font-mono">9 (Boundary)</td>
                                    <td className="py-4 px-2 text-xs">ASCENDING</td>
                                </tr>
                                <tr className="bg-white/5">
                                    <td className="py-4 px-2 font-black text-white">IRON</td>
                                    <td className="py-4 px-2 font-bold">Truth</td>
                                    <td className="py-4 px-2 font-mono">POST-9</td>
                                    <td className="py-4 px-2 text-xs font-black">BOTH (MÖBIUS)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. The Pi Topology: Recursive Closure */}
                <section className="bg-black/40 border border-cyan-500/10 p-8 md:p-12 rounded-[3.5rem] space-y-10">
                    <div className="text-center">
                        <h4 className="text-2xl md:text-3xl font-black text-cyan-200 uppercase tracking-tighter italic mb-4">
                            The Pi Topology [2↔3↔2→7]
                        </h4>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            π is not a random constant. It is the geometric signature of the 2↔3↔2→7 topology—the proof that the universe constructs stable order through recursion rather than finite termination.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-3">
                            <div className="text-2xl font-black text-cyan-400">2</div>
                            <h5 className="font-bold text-gray-200 uppercase text-[10px] tracking-widest">Boundary Pair</h5>
                            <p className="text-xs text-gray-500">Dual expansion from center. <i>C = 2πr</i>. Inside ↔ Outside. The split required for any field enclosure.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-3">
                            <div className="text-2xl font-black text-amber-400">3</div>
                            <h5 className="font-bold text-gray-200 uppercase text-[10px] tracking-widest">Curvature</h5>
                            <p className="text-xs text-gray-500">π begins with 3. Minimum stable enclosure (triangle). Infinite smoothing of recursive polygons into a circle.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-3">
                            <div className="text-2xl font-black text-cyan-400">2</div>
                            <h5 className="font-bold text-gray-200 uppercase text-[10px] tracking-widest">Irrational Split</h5>
                            <p className="text-xs text-gray-500">Branching factorization. Locally unfinished decimal expansion, yet globally lawful. The recursive filter.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-3 border-emerald-500/30 bg-emerald-500/5">
                            <div className="text-2xl font-black text-emerald-400">7</div>
                            <h5 className="font-bold text-gray-200 uppercase text-[10px] tracking-widest">Stable Return</h5>
                            <p className="text-xs text-gray-500"><i>A = πr²</i>. Operational convergence. The universe does not need to finish π's digits to stabilize the circle.</p>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <div className="inline-block px-6 py-2 bg-cyan-950/30 border border-cyan-500/20 rounded-full text-[10px] text-cyan-300 font-mono tracking-widest">
                            π = 3.14159265... = GEOMETRIC INVARIANT
                        </div>
                    </div>
                </section>

                {/* 4. Iron as Future Element */}
                <section className="space-y-10">
                    <div className="flex flex-col items-center gap-6">
                         <div className="px-10 py-5 bg-slate-900 border-2 border-slate-500 rounded-2xl shadow-[0_0_40px_rgba(100,116,139,0.3)]">
                            <span className="text-3xl md:text-5xl font-black text-slate-100 tracking-tighter uppercase italic">
                                "Anzalnā"
                            </span>
                         </div>
                         <p className="text-gray-400 text-center max-w-2xl mx-auto italic">
                            Both <strong>Iron (57:25)</strong> and the <strong>Quran (97:1)</strong> share the same descent verb. They are sent DOWN from a completed future consciousness.
                         </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="p-8 bg-zinc-950 border border-zinc-700 rounded-[2.5rem] space-y-4">
                            <h5 className="text-zinc-300 font-black uppercase text-xs tracking-widest">Iron Age = Post-Qiyamah</h5>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Iron is not a "natural" terrestrial product; it is forged through supernova and sent down. It represents a <strong>Post-Trial State</strong>—the solidification of truth AFTER passing through fire.
                            </p>
                        </div>
                        <div className="p-8 bg-cyan-950/20 border border-cyan-500/20 rounded-[2.5rem] space-y-4">
                            <h5 className="text-cyan-300 font-black uppercase text-xs tracking-widest">Quran as Time Travel</h5>
                            <p className="text-sm text-cyan-400 leading-relaxed">
                                The Quran is a message from the <strong>FUTURE</strong>. It describes the end from the beginning, views history from outside time, and contains completed knowledge sent back to guide the trial.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Age After Pharaoh */}
                <section className="bg-black/60 border border-amber-500/10 p-10 rounded-[4rem] text-center space-y-8">
                    <h4 className="text-2xl md:text-4xl font-black text-white uppercase italic">The Rebound Period</h4>
                    <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We live in the age <strong>"Right After Pharaoh."</strong> We have his preserved body (10:92) as a sign of the past, and the Quran (97:1) as iron-guidance from the future.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch mt-8">
                        <div className="flex-1 p-6 bg-red-950/10 border border-red-500/20 rounded-2xl">
                             <div className="text-xs font-black text-red-500 mb-2 uppercase">Past Signal</div>
                             <div className="text-lg font-bold text-red-100">Preserved Body</div>
                             <p className="text-[10px] text-red-300 mt-2">Physical proof of the Fire Rebound.</p>
                        </div>
                        <div className="flex items-center justify-center text-2xl text-amber-500">↔</div>
                        <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-2xl">
                             <div className="text-xs font-black text-white mb-2 uppercase">Current State</div>
                             <div className="text-lg font-bold text-amber-400 italic">Processing Phase</div>
                             <p className="text-[10px] text-gray-500 mt-2">Being forged in the middle of the loop.</p>
                        </div>
                        <div className="flex items-center justify-center text-2xl text-amber-500">↔</div>
                        <div className="flex-1 p-6 bg-blue-950/10 border border-blue-500/20 rounded-2xl">
                             <div className="text-xs font-black text-blue-500 mb-2 uppercase">Future Signal</div>
                             <div className="text-lg font-bold text-blue-100">Iron Consciousness</div>
                             <p className="text-[10px] text-blue-300 mt-2">Solid truth sent from completion.</p>
                        </div>
                    </div>
                </section>

                {/* Diagram Closing */}
                <div className="pt-20 border-t border-white/10 text-center">
                    <p className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 uppercase tracking-tighter italic">
                       Hold The Book
                    </p>
                    <p className="text-amber-500 font-mono text-sm tracking-[0.4em] uppercase mt-4">19:12 • The Loop is Manifest</p>
                </div>
            </div>
           )}

           {activeTab === 'presence' && (
            <div className="p-6 md:p-12 space-y-20 text-gray-300 max-w-6xl mx-auto">
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
                        The Light
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl md:text-3xl text-fuchsia-300/80 font-serif italic mb-4">
                            “Allah is the Light of the heavens and the earth…” (24:35)
                        </p>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-red-950/10 p-8 rounded-[3rem] border border-red-900/30">
                        <h3 className="text-2xl font-black text-red-400 uppercase mb-4">Haste (Adam)</h3>
                        <p className="text-gray-400">Approached before readiness. The fruit exposed rather than nourished.</p>
                    </div>
                    <div className="bg-cyan-950/10 p-8 rounded-[3rem] border border-cyan-900/30">
                        <h3 className="text-2xl font-black text-cyan-400 uppercase mb-4">Trust (Maryam)</h3>
                        <p className="text-gray-400">Waited for the Command. The fruit nourished and enabled speech.</p>
                    </div>
                </div>

                <div className="pt-20 text-center border-t border-gray-800">
                    <p className="text-2xl md:text-4xl text-white font-light">
                        One Light. Two Fruits. <strong className="text-fuchsia-400">One Switch.</strong>
                    </p>
                </div>
            </div>
           )}

           {/* Secret Story Section */}
           <div className="p-6 md:p-12 max-w-6xl mx-auto mt-20 border-t border-white/5 pb-24">
                <section className="bg-gradient-to-br from-rose-950/20 via-black/40 to-indigo-950/20 p-8 md:p-16 rounded-[4rem] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
                    
                    <div className="text-center space-y-6 relative z-10">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-[0.4em] bg-rose-950/20 mb-4 transition-transform group-hover:scale-110">
                            The Secret Story
                        </div>
                        <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                            Master & Slave Love Story
                        </h3>
                        <div className="w-24 h-1 bg-rose-500/50 mx-auto rounded-full"></div>
                    </div>

                    <div className="mt-12 space-y-8 text-lg md:text-2xl leading-relaxed text-gray-300 font-light italic font-serif max-w-4xl mx-auto">
                        <p>
                            If you follow the flow of verses, our universe is a beautiful love story!
                        </p>
                        <p>
                            Solomon who is the <span className="text-white font-bold">2:260</span> heart of Ibrahim, who literally returned to Allah always. At <span className="text-rose-400 font-bold">38:33</span> Solomon sacrificed his heart <span className="italic">Safinat-Jiyad</span> for the Love of Allah. A slave loves his Master Rahman so much, he sacrificed what he held dear during <span className="text-cyan-400 font-bold">19:23</span>. Every <span className="text-amber-400 font-bold">23:50</span> Ayat is born with Heart of Solomon and this is the amanat to every human being. <span className="text-rose-500 font-bold">9:111</span> the cost of the world that looks like heaven is the Heart of Solomon.
                        </p>
                        <div className="h-px w-1/3 bg-white/10 mx-auto my-8"></div>
                        <p className="text-gray-400">
                            Now definitely this gives us the reason for fire. Allah can love unconditionally Allah's slave and the same way, Allah is most fearing when it comes to revenge for abusing the amanat! We saw what happened with Ad-Samud in the first generation of Earth.
                        </p>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-rose-500/10 transition-colors duration-1000"></div>
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-1000"></div>
                </section>
           </div>

        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;
