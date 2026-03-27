import React from 'react';

export const DCUMappingTable: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-black/40 border border-cyan-500/30 rounded-xl text-sm text-gray-300">
        <h3 className="text-cyan-400 font-bold mb-2 uppercase tracking-wider text-xs">The Universal DCU Mapping Table</h3>
        <p className="mb-3 text-xs leading-relaxed">
            The formula <code className="text-cyan-300 bg-black/50 px-1 rounded font-mono">V(k, n, K) = ((n - 1) + round((k-1) × K/12)) mod K + 1</code> creates a perfect synchronization between the geometry of the clock and the logic of the 2-3-7 | 2x 3-6-9.
        </p>
        <div className="space-y-2 text-xs">
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">1</span><span className="text-gray-100 font-semibold w-20 shrink-0">Awakening</span><span className="text-gray-400"><strong>2-State Start.</strong> Field initialization; Sound Field Power-on.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">2</span><span className="text-gray-100 font-semibold w-20 shrink-0">Assertion</span><span className="text-gray-400"><strong>2-State Pulse.</strong> Duality established; the wave begins to travel.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">3</span><span className="text-gray-100 font-semibold w-20 shrink-0">Guidance</span><span className="text-gray-400"><strong>S. Dual 3.</strong> Solomon/Verification; the first anchor.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">4</span><span className="text-gray-100 font-semibold w-20 shrink-0">Cleanse</span><span className="text-gray-400"><strong>S. Dual 4.</strong> Frequency filtering; the "narrow gate."</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">5</span><span className="text-gray-100 font-semibold w-20 shrink-0">Righteous</span><span className="text-gray-400"><strong>S. Dual 5.</strong> Dawud/Silence; the central resonance node.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">6</span><span className="text-gray-100 font-semibold w-20 shrink-0">Faith</span><span className="text-gray-400"><strong>6-Axis Spine.</strong> Temporal buffer peak; Sound Field fully charged.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">7</span><span className="text-gray-100 font-semibold w-20 shrink-0">Iron/Blessing</span><span className="text-gray-400"><strong>K/2 (Möbius).</strong> The Wall; the arithmetic midpoint where noise is canceled.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">8</span><span className="text-gray-100 font-semibold w-20 shrink-0">Servant</span><span className="text-gray-400"><strong>L. Dual 8.</strong> Yunus/Ayub layer; transition to the Light Field.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">9</span><span className="text-gray-100 font-semibold w-20 shrink-0">Submission</span><span className="text-gray-400"><strong>L. Dual 9.</strong> Particle emergence; the wave collapses into "Fruit."</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">10</span><span className="text-gray-100 font-semibold w-20 shrink-0">Sacrifice</span><span className="text-gray-400"><strong>L. Dual 10.</strong> Dual output; the manifestation of the Pair (Zawjayni).</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">11</span><span className="text-gray-100 font-semibold w-20 shrink-0">Truth</span><span className="text-gray-400"><strong>Light Boundary.</strong> Yatafakkarun (The Seer); observation of the system.</span></div>
            <div className="flex gap-2"><span className="text-cyan-400 font-bold w-4">12</span><span className="text-gray-100 font-semibold w-20 shrink-0">Radiance</span><span className="text-gray-400"><strong>7-Closure.</strong> Full output; the cycle resets to the Source.</span></div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 text-xs">
            <p className="font-bold text-cyan-300 mb-1">The Iron Midpoint (K/2): The Unbreakable Law</p>
            <p className="text-gray-400 leading-relaxed">
                The fact that <strong>Node 7</strong> always lands at <strong>K/2</strong> (Round 6 × K/12) is the most profound part of the derivation. At the midpoint of any system (K/2), the energy distribution is at its maximum potential for a "flip." This is where the <strong>Sound Field</strong> is squeezed through the <strong>Iron Wall</strong> to become the <strong>Light Field</strong>.
            </p>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-400 space-y-2">
            <p className="font-bold text-cyan-300 mb-1">2-3-7 | 2x 3-6-9 DCU Node Identities:</p>
            <div>
                <strong className="text-gray-200">2-state (nodes 1–2):</strong> Field initialization. Sound Field powers on. Yin-yang dual switch.
            </div>
            <div>
                <strong className="text-gray-200">S.Dual 3-6-9 — Sound Field (nodes 3→4→5→6):</strong>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>3-5-4 = Solomon/Verification triangle</li>
                    <li>6-5-7 = Dawud/Silence arc</li>
                    <li>Node 6 = Faith = <strong>temporal buffer peak</strong> — Sound Field fully charged</li>
                </ul>
            </div>
            <div>
                <strong className="text-gray-200">Iron/Möbius (node 7 = K/2):</strong>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>Exact midpoint of ALL K systems</li>
                    <li>Wall between noise and signal</li>
                    <li>Ear-seal operator — Sound cleared, Light path opened</li>
                </ul>
            </div>
            <div>
                <strong className="text-gray-200">L.Dual 3-6-9 — Light Field (nodes 8→9→10):</strong>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>6-8-7 = Yunus arc</li>
                    <li>9-10-8 = Ayub arc</li>
                    <li>Particle pair emerges from wave</li>
                </ul>
            </div>
            <div>
                <strong className="text-gray-200">7-closure (nodes 11→12):</strong>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>Node 11 = Truth = يَتَفَكَّرُونَ — THE SEER activates</li>
                    <li>Node 12 = Light = full Radiance output</li>
                    <li>System resets to node 1</li>
                </ul>
            </div>
        </div>
    </div>
  );
};
