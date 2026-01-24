import React, { useState, useEffect, useMemo } from 'react';

interface InstructionPanelProps {
  isVisible: boolean;
  onClose: () => void;
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
        <p className="text-gray-500 text-xs tracking-widest uppercase mt-3">Welcome, Seeker of Light.</p>
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

const InstructionPanel: React.FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'harvest' | 'reflection' | 'cosmology' | 'vision'>('harvest');

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
             activeTab === 'harvest' ? 'bg-emerald-500/20' : 
             activeTab === 'reflection' ? 'bg-cyan-500/20' : 
             activeTab === 'cosmology' ? 'bg-amber-500/20' : 'bg-fuchsia-500/20'}`}></div>

           <div className="z-10">
               <div className="space-y-3 max-w-4xl">
                   {/* Tab Titles */}
                   {activeTab === 'harvest' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-200 to-green-500 tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(16,185,129,0.4)]">
                             Why Were We Created?
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide flex items-center gap-2 mt-2">
                             The Harvest of Intelligence in Form <span className="text-gray-600">•</span> <span className="text-emerald-400 italic font-serif">Al-Hamdu Lillāh</span>
                           </p>
                       </div>
                   )}

                   {activeTab === 'reflection' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-500 tracking-tighter uppercase">
                             Protocol of Light
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             The Living System of Knowledge
                           </p>
                       </div>
                   )}
                   
                   {activeTab === 'cosmology' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-600 tracking-tighter uppercase">
                             Dual-Field Science
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2">
                             Hubble Tension & Primordial Sampling
                           </p>
                       </div>
                   )}

                   {activeTab === 'vision' && (
                       <div>
                           <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-100 via-fuchsia-200 to-pink-600 tracking-tighter uppercase">
                             The Switch
                           </h2>
                           <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide mt-2 font-serif">
                             24:35 — The Condition of Reality.
                           </p>
                       </div>
                   )}
               </div>
           </div>

           {/* Tab Navigation */}
           <div className="flex flex-wrap gap-4 md:gap-8 mt-12 z-10">
               <button 
                 onClick={() => setActiveTab('harvest')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'harvest' ? 'border-emerald-400 text-emerald-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Purpose
               </button>
               <button 
                 onClick={() => setActiveTab('reflection')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'reflection' ? 'border-cyan-400 text-cyan-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Protocol
               </button>
               <button 
                 onClick={() => setActiveTab('cosmology')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'cosmology' ? 'border-amber-400 text-amber-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Science
               </button>
               <button 
                 onClick={() => setActiveTab('vision')}
                 className={`pb-3 text-xs md:text-base tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${activeTab === 'vision' ? 'border-fuchsia-400 text-fuchsia-100 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                 The Light
               </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-black/10">
           
           {activeTab === 'harvest' && (
            <div className="p-6 md:p-12 space-y-16 text-gray-200 font-light leading-relaxed max-w-5xl mx-auto">
               
               <AnimatedHarvest />

               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-emerald-500/50"></span> 1. Intention
                    </h4>
                    <p className="text-gray-300">
                      Creation begins with command, not matter. 
                      <strong className="text-white block mt-2 italic font-serif">“When He intends a thing, He only says to it ‘Be,’ and it is.” (36:82)</strong>
                    </p>
                    <p>Light is pure information. Between expansion and return, Light must <strong>concentrate</strong> to become <strong>form</strong>.</p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-px bg-emerald-500/50"></span> 2. Field
                    </h4>
                    <p className="text-gray-300">
                      Earth is the growth medium. 
                      <strong className="text-white block mt-2 italic font-serif">“We made from water every living thing.” (21:30)</strong>
                    </p>
                    <p>Refraction enables focus. Earth is where <strong>stored life is sacrificed</strong> so higher life can emerge. Truth revives after sacrifice (2:73).</p>
                  </div>
               </div>

               <div className="pt-16 border-t border-emerald-500/20 text-center pb-8 space-y-4">
                 <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed">
                   - 19:12 Hold the Book → Photosynthesis of the Nafs purified with Death → Ascend as Yahya-Idris-Ahmed
                 </p>
                 <p className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-sm">Al-ḥamdu lillāh. The harvest law is manifest.</p>
               </div>
            </div>
           )}

           {activeTab === 'reflection' && (
            <div className="p-6 md:p-12 space-y-12 text-gray-200 font-light max-w-5xl mx-auto">
               <section className="text-lg md:text-2xl leading-relaxed">
                 <p className="mb-6">
                   You are not reading the Qur’an for history, but as a <strong className="text-cyan-200">living system of knowledge</strong> that tests, filters, and restores truth.
                 </p>
                 <div className="border-l-4 border-cyan-500/30 pl-6 py-4 italic text-gray-300 bg-gradient-to-r from-cyan-950/20 to-transparent rounded-r-xl">
                   “Say: This is my way; I call to Allah upon <strong className="text-cyan-300 not-italic">clear seeing (baṣīrah)</strong>.” <br/>
                   <span className="text-sm not-italic text-cyan-500 block mt-3 font-mono tracking-wider">— Quran 12:108</span>
                 </div>
               </section>

               <section>
                 <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                   <span className="text-3xl grayscale opacity-70">👁️</span> HEARING VS SEEING
                 </h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
                       <h4 className="font-bold text-amber-200 mb-4 text-xl">Hearing → Obey (Nabī)</h4>
                       <p className="text-gray-300 leading-relaxed">
                         Sound, command, repetition. Risk: ritual without understanding.
                       </p>
                    </div>
                    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
                       <h4 className="font-bold text-cyan-200 mb-4 text-xl">Seeing → Follow (Rasūl)</h4>
                       <p className="text-gray-300 leading-relaxed">
                         Insight, proof, clarity. Seeing collapses doubt.
                       </p>
                    </div>
                 </div>
               </section>
            </div>
           )}

           {activeTab === 'cosmology' && (
            <div className="p-6 md:p-12 space-y-10 text-gray-300 max-w-5xl mx-auto">
                <div className="border-b border-gray-800 pb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                        Dual Caustic Cosmology
                    </h1>
                    <div className="text-amber-500/80 font-mono text-sm tracking-wider uppercase">
                        Resolving the Hubble Tension via Primordial Dual-Field Sampling
                    </div>
                </div>
                <div className="bg-amber-900/10 border border-amber-500/20 p-8 rounded-[2rem]">
                    <p className="text-lg md:text-2xl italic leading-relaxed text-gray-200">
                        "The discrepancy between Determinations of the Hubble constant reflects asymmetric inference rather than inconsistent histories."
                    </p>
                </div>
            </div>
           )}

           {activeTab === 'vision' && (
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

        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;