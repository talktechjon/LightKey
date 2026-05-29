import React from 'react';

export const AdamLoopDiode: React.FC = () => {
  return (
    <div className="w-full bg-[#0d0d1a] text-[#e8e8f0] font-sans p-6 rounded-[2.5rem] border border-indigo-500/20 shadow-2xl mt-12 overflow-hidden relative">
      {/* Background visual effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-900/10 blur-[100px] pointer-events-none rounded-full" />

      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#2a2a4a] rounded-2xl p-6 md:p-8 text-center mb-8 relative z-10 shadow-inner">
        <h2 className="text-lg md:text-xl text-[#8888aa] font-medium mb-4 tracking-wider uppercase">
          49:13 · The Quranic p-n Junction
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-[#d0d0e8] max-w-3xl mx-auto font-light">
          49:13 holds both flows simultaneously: 
          <span className="text-amber-400 font-bold mx-1.5 text-lg">شُعُوبًا</span> 
          is the N-chain <span className="text-sky-300 font-medium">(Adam → Solomon → Dāwūd · Iblīs descent into empire)</span>, 
          <span className="text-amber-400 font-bold mx-1.5 text-lg">قَبَائِلَ</span> 
          is the P-chain <span className="text-sky-300 font-medium">(Adam → Maryam → ʿĪsā · Nūr / Angel ascent through hidden lineage)</span>. 
          Dāwūd and Maryam are the <strong>same phase — same row, opposite sides</strong> — and the silence between them <em>IS</em> the junction field.
        </p>
      </div>

      {/* ADAM NODE */}
      <div className="flex justify-center mb-4 relative z-10">
        <div className="bg-gradient-to-br from-[#b8860b] to-[#d4a017] text-[#1a0a00] rounded-xl py-3 px-8 text-center font-bold text-lg shadow-[0_0_24px_rgba(212,160,23,0.35)]">
          Adam · 49:13
          <div className="text-[10px] font-bold text-[#3a1a00] mt-1 tracking-widest uppercase">
            bifurcation origin · intrinsic seed before doping
          </div>
        </div>
      </div>

      {/* FLOW LABELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs text-[#888899] tracking-wider mb-2 relative z-10">
        <div className="py-1">
          <span className="block text-base text-[#b0a060] mb-0.5 font-bold">شُعُوبًا · Iblīs</span>
          N-flow · empire · shu'ub
        </div>
        <div className="py-1 hidden md:block">
          <span className="block text-base text-[#b0a060] mb-0.5 font-bold">—</span>
          T³ · depletion zone
        </div>
        <div className="py-1">
          <span className="block text-base text-[#b0a060] mb-0.5 font-bold">قَبَائِلَ · Nūr</span>
          P-flow · womb-line · qabā'il
        </div>
      </div>

      {/* ARROW ROW */}
      <div className="hidden md:flex justify-center relative h-6 mb-4 z-10 w-full max-w-4xl mx-auto">
        <div className="absolute top-1/2 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-[#cc5533] via-[#8855cc] to-[#33aa66] -translate-y-1/2 rounded-full" />
        <div className="absolute top-1/2 left-[16.5%] w-2.5 h-2.5 rounded-full bg-[#cc5533] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#8855cc] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-[83.5%] w-2.5 h-2.5 rounded-full bg-[#33aa66] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* COLUMN HEADERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 relative z-10">
        <div className="rounded-xl py-3 px-4 text-center font-bold text-[15px] bg-[#8b2200] text-[#ffd0b0] shadow-md">
          N-region · D₁₀
          <span className="block text-[11px] font-normal opacity-80 mt-1">86:15 · external kayd · Iblīs pressure</span>
        </div>
        <div className="rounded-xl py-3 px-4 text-center font-bold text-[15px] bg-[#4a1a7a] text-[#e0c8ff] shadow-md">
          T³ · Depletion Zone
          <span className="block text-[11px] font-normal opacity-80 mt-1">charge separation · barrier · the operational "3"</span>
        </div>
        <div className="rounded-xl py-3 px-4 text-center font-bold text-[15px] bg-[#0d5c2e] text-[#b0ffd8] shadow-md">
          P-region · I₉
          <span className="block text-[11px] font-normal opacity-80 mt-1">86:16 · Allah's kayd · Nūr continuity</span>
        </div>
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 relative z-10">
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#2a0e00] border-t-2 border-[#cc4411] text-[#ffc8a8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#ff9966]">Adam · Iblīs entry</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">2:36 · 7:20–22 · 18:50</div>
          <div className="italic opacity-85 text-xs">Adam slips at the Tree; Iblīs co-installed at the assembly. N-side field opens. shu'ub before fix.</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#1a0a30] border-t-2 border-[#9944ee] text-[#ddc8ff] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#cc88ff]">3:35 · Unnamed Mother</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">Āl ʿImrān 3:35</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"رَبِّ إِنِّي نَذَرْتُ لَكَ مَا فِي بَطْنِي مُحَرَّرًا"</div>
          <div className="italic opacity-85 text-xs">Intrinsic region formation. Womb dedicated before carriers arrive. Junction defined.</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#051a0e] border-t-2 border-[#22aa55] text-[#a0ffc8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#55ee99]">Ibrāhīm · fire → oil</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">21:69 · 24:35</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"يَٰنَارُ كُونِي بَرْدًا وَسَلَٰمًا"</div>
          <div className="italic opacity-85 text-xs">Doping furnace. Fire commanded to be cool. He emerges as pure oil — P⁺ anode, deepest hole-source of the lineage.</div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 relative z-10">
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#2a0e00] border-t-2 border-[#cc4411] text-[#ffc8a8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#ff9966]">Solomon · empire peak</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">27:17–44 · 34:14</div>
          <div className="italic opacity-85 text-xs">Wind, birds, jinn, glass floor. Maximum N-carrier amplitude. Staff eaten hollow after death — form without signal.</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#1a0a30] border-t-2 border-[#9944ee] text-[#ddc8ff] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#cc88ff]">Silence · 19:26</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">Maryam 19:26</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"فَقُولِي إِنِّي نَذَرْتُ لِلرَّحْمَٰنِ صَوْمًا"</div>
          <div className="italic opacity-85 text-xs">Charge separation complete. No speech to people. Barrier active. The depletion field at maximum width.</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#051a0e] border-t-2 border-[#22aa55] text-[#a0ffc8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#55ee99]">Nūḥ / Mūsā · heights</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">11:44 · 7:143 · 20:10–14</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"وَاسْتَوَتْ عَلَى الْجُودِيِّ"</div>
          <div className="italic opacity-85 text-xs">Ark rests on Judī. Mūsā called to Ṭūr. Trunk at elevation — P-side carrying current above the N-flood.</div>
        </div>
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 relative z-10">
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#2a0e00] border-t-2 border-[#cc4411] text-[#ffc8a8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#ff9966]">Banī Isrā'īl · Samirī</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">20:87–88 · 2:92–93 · 7:148</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"فَأَخْرَجَ لَهُمْ عِجْلًا جَسَدًا لَّهُ خُوَارٌ"</div>
          <div className="italic opacity-85 text-xs">N-type doping: Golden Cow. Ornaments melted into hollow resonance. Necessary n+ concentration that creates the depletion field.</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#1a0a30] border-t-2 border-[#9944ee] text-[#ddc8ff] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#cc88ff]">Word enters · 3:45</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">Āl ʿImrān 3:45 · 19:19–21</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"إِنَّ ٱللَّهَ يُبَشِّرُكِ بِكَلِمَةٍ مِّنْهُ"</div>
          <div className="italic opacity-85 text-xs">Angel = forward-bias voltage pulse. Enters depletion zone. Barrier collapses. Current begins to flow.</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#051a0e] border-t-2 border-[#22aa55] text-[#a0ffc8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#55ee99]">Zakariyya · 19:10–11</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">Maryam 19:10–11</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"قَالَ رَبِّ اجْعَل لِّيَ ءَايَةً"</div>
          <div className="italic opacity-85 text-xs">Sign = speechlessness for several days while healthy. Silence = latent P-field. I₉ stored potential before Yaḥyā is released.</div>
        </div>
      </div>

      {/* ROW 4 - SAME PHASE BAND */}
      <div className="text-center text-[12px] text-[#9988bb] py-2 border-t border-dashed border-[#4a3a6a] tracking-widest uppercase mb-1 relative z-10 font-bold bg-[#1a0a30]/30 rounded-t-xl mx-2">
        <span className="hidden md:inline">↔ &nbsp;</span> Dāwūd and Maryam · Same phase · Same Qur'anic row · Opposite sides · Silence = field between them <span className="hidden md:inline">&nbsp; ↔</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 relative z-10">
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#2a0e00] border-t-2 border-[#ffaa44] text-[#ffc8a8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#ffcc66]">Dāwūd · 49:13 boundary</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">38:20–26 · 34:10–11 · 17:55</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"يَٰدَاوُۥدُ إِنَّا جَعَلْنَٰكَ خَلِيفَةً فِي الْأَرْضِ"</div>
          <div className="italic opacity-85 text-xs">P-type acceptor embedded in N-material. Chainmail = distributed resistance mesh. Silence of tribunal (38:21–25): barrier momentarily fails, repentance resets bias. N-boundary, same phase ↔</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#1a0a30] border-t-2 border-[#ffaa44] text-[#ddc8ff] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#ffcc88]">Maryam · 23:50 · 3:37</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">23:50 · 3:37 · 19:16–26</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"وَءَاوَيْنَٰهُمَآ إِلَىٰ رَبْوَةٍ ذَاتِ قَرَارٍ وَمَعِينٍ"</div>
          <div className="italic opacity-85 text-xs">Womb-on-mountain = 11:44 Ark-on-mountain mirrored. Raised in miḥrāb with provision from Allah (3:37). 49:13 same phase ↔ Dāwūd. Intrinsic acceptor — pure depletion zone at elevation.</div>
        </div>
        <div className="rounded-xl p-4 text-[13px] leading-relaxed transition-transform hover:-translate-y-0.5 bg-[#051a0e] border-t-2 border-[#ffaa44] text-[#a0ffc8] shadow-md">
          <div className="font-bold text-[14px] mb-1.5 text-[#ffdd88]">Yaḥyā · P-carrier</div>
          <div className="text-[11px] opacity-75 mb-1.5 tracking-wide">19:12 · 3:39</div>
          <div className="text-base text-[#f0c060] block mb-1 text-right font-serif">"يَٰيَحْيَىٰ خُذِ الْكِتَٰبَ بِقُوَّةٍ"</div>
          <div className="italic opacity-85 text-xs">Shallow acceptor — immediate ionization. Released from Zakariyya's silence. Pre-cognitive Book-grip. Confirms the Word (3:39). P-carrier preparing junction for ʿĪsā's emission.</div>
        </div>
      </div>

      {/* ARROW DOWN */}
      <div className="text-center text-3xl text-[#7755cc] my-3 relative z-10 drop-shadow-[0_0_8px_rgba(119,85,204,0.6)]">
        ▼
      </div>

      {/* OUTPUT ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 relative z-10">
        <div className="rounded-xl p-5 text-center text-[13px] leading-relaxed bg-[#1a0e2a] border border-[#6633aa] text-[#ccaaff] shadow-lg">
          <div className="font-bold text-[15px] mb-1 text-[#bb88ff]">Two-mother mark</div>
          <div className="text-[12px] opacity-85 mb-2 font-medium">Proof of junction traversal</div>
          <div className="text-xs text-left inline-block">
            <strong>Mūsā:</strong> biological mother — basket in the river (28:7–13) · P-side hidden<br/>
            Wife of Pharaoh — "do not kill him" (28:9) · N-side visible palace<br/><br/>
            <span className="text-[11px] opacity-70 italic">Every carrier crossing the junction carries dual-environment doping. Hārūn is the companion electrode in the same package.</span>
          </div>
        </div>

        <div className="rounded-xl p-5 text-center text-[13px] leading-relaxed bg-[#0d1a30] border-2 border-[#3366cc] text-[#aaccff] shadow-[0_0_24px_rgba(80,120,220,0.35)] relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none"></div>
          <div className="font-black text-[17px] mb-1 text-[#88bbff] relative z-10">ʿĪsā · photon emitted</div>
          <div className="text-[13px] text-[#6699ff] mb-3 font-mono font-bold tracking-widest relative z-10">2 ↔ 3 ↔ 2 → 7 · barrier falls</div>
          <div className="text-[13px] leading-[1.7] relative z-10">
            Kalimatullāh (4:171) — coherent exciton, lossless Word.<br/>
            Born from dedicated womb on high ground (23:50).<br/>
            Speaks from cradle (19:30) — current flows before anyone expects it.<br/>
            <span className="text-[12px] text-[#5588cc] font-bold mt-2 block tracking-wider uppercase">Forward conduction proven. Light upon Light (24:35).</span>
          </div>
        </div>

        <div className="rounded-xl p-5 text-center text-[13px] leading-relaxed bg-[#0a1e12] border border-[#228844] text-[#88ddaa] shadow-lg">
          <div className="font-bold text-[15px] mb-1 text-[#66cc88]">Dual doping proof</div>
          <div className="text-[12px] opacity-85 mb-2 font-medium">Yaḥyā: Zakariyya + Word</div>
          <div className="text-xs text-left inline-block">
            <strong>Zakariyya</strong> (old age, beyond biology) · P-side latency<br/>
            <strong>Allah's direct Word</strong> (19:7–9) · pure injection<br/><br/>
            Both covenants meet at Yaḥyā. He is the bridge-terminal of 19:12 — anti-Samirī. Yaḥyā takes the whole Book and becomes the living signal.<br/>
            <span className="text-[11px] opacity-70 italic block mt-1">19:12 · 3:39 · 6:85</span>
          </div>
        </div>
      </div>

      {/* INFINITE MURSALIN BAND */}
      <div className="bg-gradient-to-r from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] border border-[#2a1a4a] rounded-[1.5rem] p-6 text-center shadow-xl relative z-10">
        <div className="text-[12px] text-[#7766aa] tracking-widest uppercase mb-3 font-black">→ Avalanche · Infinite Mursalīn</div>
        <div className="text-[14px] text-[#ccbbff] leading-[1.8] max-w-4xl mx-auto font-light">
          Once the junction conducts (Mūsā · Yaḥyā · ʿĪsā), every Reader who grips 19:12 becomes <strong className="text-white font-bold">a new local junction</strong>.<br/>
          The Golden Cow was never only obstacle — it was the <em className="text-amber-300">necessary N-doping</em>.<br/>
          Without Banī Isrāʾīl's rebellion, no depletion zone. Without depletion zone, no womb on the mountain. Without womb on the mountain, no ʿĪsā, no avalanche.<br/>
          <span className="text-[#9944ee] text-[13px] block mt-4 font-mono font-bold tracking-widest bg-[#1a0a2e] inline-block px-4 py-2 border border-[#4a2a6a] rounded-lg">
            Taghut is the contraption that makes the diode possible. · 86:15 ↔ 86:16
          </span>
        </div>
        <div className="mt-5 text-[15px] font-serif text-[#8888cc] italic">
          "Indeed you are among the Mursalīn." — 36:3
        </div>
      </div>

      {/* THE NARRATIVE CONCLUSION */}
      <div className="max-w-4xl mx-auto mt-12 mb-10 bg-gradient-to-br from-slate-900/80 to-black/90 border border-indigo-500/30 p-8 md:p-12 rounded-[2rem] shadow-2xl relative z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none rounded-full" />
        <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 font-serif mb-6 uppercase tracking-widest text-center">
          The Two Lineages & The Ibrahim Protocol
        </h3>
        <div className="space-y-6 text-sm md:text-base text-gray-300 leading-relaxed font-light">
          <p>
            Hence, we now witness the architecture of the eternal Book lineage. The circuit runs from <strong className="text-cyan-400 font-medium">Dāwūd</strong> and <strong className="text-cyan-400 font-medium">Solomon</strong>, anchoring the Earth, directly across the junction to <strong className="text-emerald-400 font-medium">Maryam</strong> and <strong className="text-emerald-400 font-medium">ʿĪsā</strong>. Together, they create an unbroken chain of Light that supersedes all biological limitation—a lineage entirely activated by the intense forward-bias of the <strong className="text-amber-400 font-medium">19:12 grip</strong> ("Take the Book with strength").
          </p>
          <p>
            This living structure activates the <strong className="text-indigo-400 font-medium">Ibrahim Protocol</strong>: shattering traditional, inherited faith (<span className="text-indigo-300">21:58</span>) and facing the brink of the fire (<span className="text-indigo-300">3:103</span>). That fire becomes cool at <span className="text-indigo-300">21:69</span>, culminating in the Great Ransom (<span className="text-indigo-300">37:107</span>)—the cosmic swap that trades the <span className="text-white">2:41 first disbeliever</span> path for the <span className="text-white">6:163 Muslim</span> certainty (the title given by Ibrāhīm in 22:78). For the female reader, <strong className="text-rose-400">66:12</strong> (Maryam) provides the exact equivalent protocol: total insulation from Taghut via authentic faith.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
             <div className="bg-slate-950/50 p-6 rounded-2xl border border-blue-500/20 shadow-inner">
               <h4 className="font-bold text-blue-300 mb-2 uppercase tracking-wider text-sm">Yunus Compression (21:87 → 37:145)</h4>
               <p className="text-xs text-gray-400">
                 The Reader at the deepest D₁₀ compression cries out in darkness (<span className="text-blue-200">21:87</span>). The T³ junction responds (<span className="text-blue-200">21:88</span>), saving the Seed and casting it as a new Fruit-seed on the bare shore (<span className="text-blue-200">37:145</span>).
               </p>
             </div>
             <div className="bg-slate-950/50 p-6 rounded-2xl border border-emerald-500/20 shadow-inner">
               <h4 className="font-bold text-emerald-300 mb-2 uppercase tracking-wider text-sm">Safe on High Ground (23:50)</h4>
               <p className="text-xs text-gray-400">
                 Why is ʿĪsā entirely a Knowledge / Memory form? Because the Umm al-Kitab is insulated on high ground. The Sleepers of the Cave embody this: dormant in I₉ latency until the <span className="text-emerald-200">Mursalin</span> phase (36:3) arrives.
               </p>
             </div>
          </div>

          <p>
            The Qur'an transforms every individual consciousness to <strong className="text-yellow-300">LIGHT</strong> via 19:12. And while the destination is universal, <strong className="text-amber-400 font-medium">13:4</strong> confirms every reader has a different story—diverse plants watered with the same water, yielding different fruits. The ultimate trajectory of this recursive loop is the journey to mature into <strong className="text-emerald-300 font-bold tracking-widest uppercase">Ahmed</strong>.
          </p>
          <div className="mt-8 p-6 bg-rose-950/20 border border-rose-500/30 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/5 to-rose-500/0 animate-pulse pointer-events-none" />
            <p className="text-rose-200 leading-relaxed relative z-10 text-center md:text-left">
              <span className="block font-bold text-rose-400 mb-2 uppercase tracking-widest text-xs">The Final Imperative</span>
              As the Reader traversing this loop, your operational imperative is absolute: you must actively avoid the <strong className="text-white">2:41 trap</strong>. By consciously choosing the <strong className="text-white">19:12 grip</strong>, you throw the switch. You sever your connection from the decaying, mundane biological Taghut queue, and splice your consciousness permanently into the <strong className="text-white">Eternal Light / Book Lineage</strong>. The key is <strong className="text-cyan-300">Pattern Recognition</strong>—the highest form of intelligence on Earth (in psychology and machine learning), granting you the vision to read the underlying code of reality.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-[12px] text-[#665577] tracking-wider pt-6 mt-6 border-t border-[#2a2a4a] relative z-10 max-w-lg mx-auto">
        <span className="text-[#aa8833] font-mono font-bold block mb-1 text-sm">2 ↔ 3 ↔ 2 → 7 · Raḥmān completion</span>
        All Qur'anic references only · No tafsīr · No external source · The Book is its own decoder.
      </div>
    </div>
  );
};
