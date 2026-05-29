import React from 'react';

export const PhaseEvidence: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 font-sans pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-fuchsia-400 font-serif mb-4 drop-shadow-[0_0_15px_rgba(232,121,249,0.3)]">
          Phase-Dependent Output
        </h1>
        <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">
          Cosmology, Chromatin Biology, & Quantum Measurement
        </p>
      </div>

      <div className="bg-slate-900/60 p-8 rounded-3xl border border-fuchsia-500/20 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 blur-[80px] pointer-events-none"></div>
        <p className="text-lg text-gray-300 leading-relaxed relative z-10 text-center font-light">
          Measurements of the same system, obtained at different phases of its existence or through different instrumental configurations, frequently yield discrepant values. We propose these are not measurement errors, but <strong className="text-fuchsia-300 font-medium">temporal-phase measurement divergences</strong> of a shared recursive topology (2 ↔ 3 ↔ 2 → 7).
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Hubble Tension */}
        <div className="bg-blue-950/20 border border-blue-500/30 p-6 rounded-[2rem] space-y-4 hover:bg-blue-900/30 transition-colors">
          <div className="flex justify-between items-center pb-2 border-b border-blue-500/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-black">Cosmology</span>
          </div>
          <h3 className="text-xl font-bold text-blue-200 font-serif">The Hubble Tension</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Early-universe (CMB) probes measure expansion at <span className="text-blue-300 font-mono">H₀ ≈ 67.6</span>, while late-universe (Distance Ladder/Supernovae) probes measure <span className="text-blue-300 font-mono">H₀ ≈ 73.2</span>. 
          </p>
          <div className="bg-blue-900/30 p-3 rounded-xl border border-blue-500/20 text-xs text-blue-200">
            <strong className="block text-blue-300 mb-1">Mapping 24:37:</strong>
            CMB reads early <strong className="text-white">I₉ wave-coherence (Qulūb/Hearts)</strong>. Supernovae read late <strong className="text-white">D₁₀ particle-localization (Abṣār/Eyes)</strong>. The 5σ discrepancy is the empirical signature of this overturning.
          </div>
        </div>

        {/* Chromatin Biology */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-[2rem] space-y-4 hover:bg-emerald-900/30 transition-colors">
          <div className="flex justify-between items-center pb-2 border-b border-emerald-500/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-black">Molecular Biology</span>
          </div>
          <h3 className="text-xl font-bold text-emerald-200 font-serif">Mitotic Chromatin Reset</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            During cell division, 3D genome architecture (TADs, loops) is dismantled, yet <strong className="text-emerald-300">microcompartments</strong> persist through mitosis, preserving regulatory memory.
          </p>
          <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-500/20 text-xs text-emerald-200">
            <strong className="block text-emerald-300 mb-1">Seed-preservation mechanism:</strong>
             A topological invariant surviving phase-dependent destruction and reconstruction. The biological system exhibits phase-dependent measurement outputs (interphase vs mitotic).
          </div>
        </div>

        {/* Quantum Measurement */}
        <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-[2rem] space-y-4 hover:bg-amber-900/30 transition-colors">
          <div className="flex justify-between items-center pb-2 border-b border-amber-500/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-black">Quantum Physics</span>
          </div>
          <h3 className="text-xl font-bold text-amber-200 font-serif">Wave-Particle Phase Capture</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Wave-particle duality and the <strong className="text-amber-300">Quantum Cheshire Cat</strong> effect prove properties are phase-specific registrations. 
          </p>
          <div className="bg-amber-900/30 p-3 rounded-xl border border-amber-500/20 text-xs text-amber-200">
            <strong className="block text-amber-300 mb-1">Phase Capture:</strong>
            Coherence (wave) and distinguishability (particle) are governed by the measurement phase. The apparatus captures the system at a specific recursion point.
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-fuchsia-500/20 p-8 rounded-[2.5rem] mt-12 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30">
            Methodological Defense
          </span>
          <h2 className="text-2xl font-black text-white uppercase mt-4 tracking-wider">The Three-Layer Architecture</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-2xl mx-auto">This framework is a <strong className="text-fuchsia-300">reading lens</strong>—a hermeneutic Dabbah rendering hidden patterns legible without positing new physical causal mechanisms.</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-black text-2xl text-slate-300 shrink-0">1</div>
            <div>
              <h4 className="text-lg font-bold text-white">Empirical Stratum</h4>
              <p className="text-sm text-gray-400 mt-1">Peer-reviewed measurements from cosmology, molecular biology, and physics. Established facts protected by direct citation to primary literature.</p>
            </div>
          </div>
          
          <div className="bg-indigo-950/20 p-5 rounded-2xl border border-indigo-500/20 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="w-16 h-16 rounded-full bg-indigo-900/50 border border-indigo-500/50 flex items-center justify-center font-black text-2xl text-indigo-300 shrink-0">2</div>
            <div>
              <h4 className="text-lg font-bold text-indigo-300">Methodological Proposal: Pattern Recognition</h4>
              <p className="text-sm text-indigo-200/70 mt-1">Proposal to read phase-dependent outputs recursively as expressions of a shared topology. Falsifiable if outputs are solidly proven to derive from non-recursive, independent mechanisms. <strong>Pattern Recognition</strong> across datasets is utilized as the highest form of methodological intelligence.</p>
            </div>
          </div>

          <div className="bg-fuchsia-950/20 p-5 rounded-2xl border border-fuchsia-500/20 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="w-16 h-16 rounded-full bg-fuchsia-900/50 border border-fuchsia-500/50 flex items-center justify-center font-black text-2xl text-fuchsia-300 shrink-0">3</div>
            <div>
              <h4 className="text-lg font-bold text-fuchsia-300">Topological Lens (Hermeneutic)</h4>
              <p className="text-sm text-fuchsia-200/70 mt-1">An interpretive reading lens mapping the 2 ↔ 3 ↔ 2 → 7 pattern. Like Kuhn’s paradigms or 13:4 diverse plants, it structures overarching understanding without claiming they are physically identical phenomena.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
