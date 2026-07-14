import React, { useState, useEffect, useMemo } from 'react';
import { loadQuranEngine, QuranEngineData, EngineRoot } from '../quranEngine.ts';
import { 
  GitCommit, 
  Activity, 
  Link2, 
  ArrowRight, 
  Search, 
  Fingerprint, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface VerseRootTracerProps {
  surah: number;
  ayah: number;
  onVerseSelect: (surah: number, ayah: number) => void;
}

export const VerseRootTracer: React.FC<VerseRootTracerProps> = ({ surah, ayah, onVerseSelect }) => {
  const [engine, setEngine] = useState<QuranEngineData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [hoveredRoot, setHoveredRoot] = useState<string | null>(null);
  const [pathwaySearchQuery, setPathwaySearchQuery] = useState<string>('');

  // Custom user-defined invariant edits (local persistence)
  const [customMeanings, setCustomMeanings] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('quran_root_invariants');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [editingMeaning, setEditingMeaning] = useState<boolean>(false);
  const [editMeaningValue, setEditMeaningValue] = useState<string>('');

  // Load the engine
  useEffect(() => {
    const initEngine = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadQuranEngine();
        setEngine(data);
      } catch (err: any) {
        setError('Could not load root tracing engine.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initEngine();
  }, []);

  const currentRef = `${surah}:${ayah}`;

  // Find current verse in the engine
  const currentEngineVerse = useMemo(() => {
    if (!engine) return null;
    return engine.verses.find(v => v.r === currentRef);
  }, [engine, currentRef]);

  // Handle auto-selecting the first root of the verse on load
  useEffect(() => {
    if (currentEngineVerse && currentEngineVerse.R && currentEngineVerse.R.length > 0) {
      // Avoid overriding if the currently selected root is already in this verse
      if (!selectedRoot || !currentEngineVerse.R.includes(selectedRoot)) {
        setSelectedRoot(currentEngineVerse.R[0]);
      }
    } else {
      setSelectedRoot(null);
    }
  }, [currentEngineVerse]);

  // Invariant meaning lookup (either custom or default)
  const getRootInvariantMeaning = (rootKey: string, rootData?: EngineRoot): string => {
    if (customMeanings[rootKey]) return customMeanings[rootKey];
    if (rootData && rootData.m) return rootData.m;
    
    // Core fallback meanings aligned with Arabic Invariant Protocol
    const fallbacks: Record<string, string> = {
      'a-l-h': 'Al-Ilah, The Supreme Object of Devotion & Alignment (Allāh)',
      'r-h-m': 'Ar-Rahmah, Creative womb-like nourishment & protective empathy',
      's-m-w': 'As-Samawat, Heights of state, cognitive skies, levels of resonance',
      'e-l-m': 'Al-Ilm, Invariant pattern recognition, systemic data, science',
      'h-m-d': 'Al-Hamd, Perfect systemic validation, evolutionary feedback of praise',
      'r-b-b': 'Ar-Rabb, Sustainer, master frequency tuner, developmental regulator',
      'd-y-n': 'Ad-Deen, System of governance, reciprocal debt-balance, operational law',
      'm-l-k': 'Al-Mulk, Absolute control, systemic ownership, kingly frequency',
      'y-w-m': 'Al-Yawm, Phase of manifestation, period of light/disclosure, day',
      'k-t-b': 'Al-Kitab, Systemic transcription, cosmic programming, code',
      'a-m-n': 'Al-Aman, Stability, trust-state, faith as an unshakeable platform',
      'n-f-s': 'An-Nafs, Individual soul-engine, selfhood, dynamic persona',
      'q-l-b': 'Al-Qalb, Center of turning, heart-vortex, spiritual core of transformation',
      's-m-e': 'As-Sam\'e, Cognitive perception of sound, deep resonant hearing',
      'b-s-r': 'Al-Basar, Visionary sight, insight, light-receptor capability',
      'h-d-y': 'Al-Huda, Guidance vector, targeted directional signal',
      't-g-w': 'At-Taghut, Overstepping bounds, systemic overflow, ego-rebellion (t-g-w)',
      'k-f-r': 'Al-Kufr, Covering up reality, active denial, systemic isolation',
      's-l-h': 'As-Salah, Systemic correction, harmony, developmental integrity',
      'z-k-w': 'As-Zakah, Invariant purification, structural growth, clean flow',
      'q-d-s': 'Al-Quds, Absolute purity, separation from flaws, sacred separation',
      'l-b-b': 'Al-Lubb, Pure core intellect, raw intuition, innermost understanding',
      'f-a-d': 'Al-Fuad, Core spiritual heart, emotional sensory engine, intuition',
      'j-n-n': 'Al-Jannah, Sheltered state, garden of containment, cognitive sanctuary',
      'n-a-r': 'An-Nar, Combustion force, light-heat energy, fire of intense friction',
      'm-a-l': 'Al-Mal, Fluctuating property, currency of motion, wealth',
    };
    return fallbacks[rootKey] || 'Operational invariant meaning under decoding...';
  };

  // Save edit of invariant meaning
  const handleSaveMeaning = () => {
    if (!selectedRoot) return;
    const updated = { ...customMeanings, [selectedRoot]: editMeaningValue };
    setCustomMeanings(updated);
    localStorage.setItem('quran_root_invariants', JSON.stringify(updated));
    setEditingMeaning(false);
  };

  // Start editing
  useEffect(() => {
    if (selectedRoot) {
      const rootData = engine?.roots[selectedRoot];
      setEditMeaningValue(getRootInvariantMeaning(selectedRoot, rootData));
      setEditingMeaning(false);
    }
  }, [selectedRoot, engine]);

  // All verses sharing the selected root
  const rootPathwayVerses = useMemo(() => {
    if (!engine || !selectedRoot) return [];
    return engine.verses.filter(v => v.R && v.R.includes(selectedRoot));
  }, [engine, selectedRoot]);

  // Filtered pathway based on search query (e.g. "19:" or "2:" or "chapter number")
  const filteredPathway = useMemo(() => {
    if (!pathwaySearchQuery.trim()) return rootPathwayVerses;
    const query = pathwaySearchQuery.toLowerCase().trim();
    return rootPathwayVerses.filter(v => {
      // Match "surah:ayah" or just "surah"
      return v.r.startsWith(query) || v.c.toString() === query;
    });
  }, [rootPathwayVerses, pathwaySearchQuery]);

  // Calculate chromosome distribution of selected root across 114 chapters
  const chromosomeTicks = useMemo(() => {
    if (!selectedRoot || !engine) return [];
    // Chapters range from 1 to 114
    const distribution = Array(115).fill(0);
    engine.verses.forEach(v => {
      if (v.R && v.R.includes(selectedRoot)) {
        distribution[v.c]++;
      }
    });
    return distribution;
  }, [selectedRoot, engine]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-cyan-400 gap-y-2">
        <RefreshCw className="h-6 w-6 animate-spin text-cyan-400" />
        <span className="text-[10px] font-mono tracking-wider uppercase">Initializing Roots Engine...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-center text-red-400 text-xs">
        {error}
      </div>
    );
  }

  if (!engine || !currentEngineVerse) {
    return (
      <div className="p-4 bg-slate-900/40 border border-slate-700/30 rounded-lg text-center text-gray-400 text-xs flex flex-col items-center gap-y-2">
        <Sparkles className="h-5 w-5 text-cyan-500/50" />
        <p>No mathematical word roots compiled for this verse yet.</p>
        <p className="text-[10px] text-cyan-400/70">Enable Reader and select a supported verse to activate tracing.</p>
      </div>
    );
  }

  // Split arabic text and pair with words array
  const arabicWords = currentEngineVerse.a.split(" ");
  const wordDetails = currentEngineVerse.w;

  const rootData = selectedRoot ? engine.roots[selectedRoot] : null;

  return (
    <div className="mt-4 border-t border-cyan-500/20 pt-4 flex flex-col gap-y-4">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2">
        <div className="flex items-center gap-x-2 text-cyan-400">
          <Fingerprint className="h-4 w-4" />
          <h4 className="text-xs font-black uppercase tracking-widest">Qur'anic Root Invariant Tracer</h4>
        </div>
        <span className="text-[9px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded">
          {currentEngineVerse.R ? `${currentEngineVerse.R.length} Roots` : 'No roots'}
        </span>
      </div>

      {/* Invariant Protocol Notice */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2.5 text-[11px] leading-relaxed text-amber-200/90 font-sans">
        <span className="font-bold text-amber-400 block mb-1 uppercase tracking-wider text-[9px] font-mono">The Beautiful Chain Rule:</span>
        Every trilateral root has exactly <strong className="text-amber-300">ONE</strong> invariant operational meaning (Asmā' as functional programs, 2:31). Arabic invariants (e.g., Nār, Jannah, Māl) are preserved for programmatic precision.
      </div>

      {/* Word-by-word Grid (Roots overlayed on Arabic) */}
      <div className="flex flex-wrap gap-x-3 gap-y-4 justify-start p-3 bg-black/40 rounded-lg border border-cyan-500/10" dir="rtl">
        {arabicWords.map((wordText, i) => {
          const detail = wordDetails[i];
          const hasRoot = detail && detail.r;
          const rootKey = hasRoot ? detail.r! : '';
          const isSelected = selectedRoot === rootKey;
          const isHovered = hoveredRoot === rootKey;

          return (
            <div 
              key={i} 
              onMouseEnter={() => hasRoot && setHoveredRoot(rootKey)}
              onMouseLeave={() => setHoveredRoot(null)}
              onClick={() => hasRoot && setSelectedRoot(rootKey)}
              className={`flex flex-col items-center justify-center p-2 rounded-md transition-all cursor-pointer select-none border min-w-[70px] ${
                isSelected 
                  ? 'bg-cyan-950/75 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]' 
                  : isHovered 
                    ? 'bg-slate-800/60 border-cyan-500/40' 
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Uthmani Arabic text */}
              <span className={`text-xl font-serif text-center font-bold tracking-normal ${
                isSelected ? 'text-cyan-300' : 'text-gray-100'
              }`}>
                {wordText}
              </span>
              
              {/* Transliteration */}
              {detail && detail.T && (
                <span className="text-[10px] text-gray-400 font-mono mt-1.5 leading-none">
                  {detail.T}
                </span>
              )}

              {/* Root Key */}
              {hasRoot ? (
                <span className={`text-[9px] px-1 py-0.5 rounded mt-2 font-mono leading-none tracking-wider ${
                  isSelected 
                    ? 'bg-cyan-500 text-black font-black' 
                    : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/20'
                }`}>
                  {rootKey}
                </span>
              ) : (
                <span className="text-[9px] text-gray-600 font-mono mt-2 leading-none">-</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Root Detail Panel */}
      {selectedRoot ? (
        <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex flex-col gap-y-3">
          {/* Root Metadata Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-black text-amber-400 font-mono bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 rounded">
                {selectedRoot}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 leading-none">Active Root</span>
                {rootData && (
                  <span className="text-[9px] font-mono text-gray-400 mt-1">
                    Occurs {rootData.n} times across {rootData.C} Chapters
                  </span>
                )}
              </div>
            </div>

            {/* Category badge */}
            {rootData && rootData.y && (
              <span className="text-[9px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full">
                {rootData.y}
              </span>
            )}
          </div>

          {/* Chromosome distribution bar of this root across 114 chapters */}
          <div className="flex flex-col gap-y-1 mt-1 bg-black/40 p-2 rounded border border-cyan-500/10">
            <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
              <span>Chapter 1</span>
              <span className="text-cyan-400 tracking-wider">Chromosome-Style Distribution (1-114)</span>
              <span>Chapter 114</span>
            </div>
            {/* Distribution Map Canvas SVG */}
            <svg viewBox="0 0 114 6" className="w-full h-2.5 bg-gray-900 rounded overflow-hidden">
              <rect width="114" height="6" fill="#030712" />
              {/* Plot a line for each chapter where root occurs */}
              {chromosomeTicks.map((count, chap) => {
                if (count === 0) return null;
                // Brightness proportional to occurrences count in that chapter
                const opacity = Math.min(0.3 + (count * 0.15), 1.0);
                const color = chap === surah ? '#f59e0b' : '#22d3ee'; // Amber for current chapter, Cyan for others
                return (
                  <line 
                    key={chap} 
                    x1={chap} 
                    y1="0" 
                    x2={chap} 
                    y2="6" 
                    stroke={color} 
                    strokeWidth="1"
                    strokeOpacity={opacity}
                  >
                    <title>{`Chapter ${chap}: ${count} occurrences`}</title>
                  </line>
                );
              })}
            </svg>
            <span className="text-[8px] text-gray-500 font-mono text-right italic leading-none mt-0.5">
              Highlighting {rootPathwayVerses.length} total coordinates
            </span>
          </div>

          {/* Invariant Meaning Block */}
          <div className="bg-black/30 border border-cyan-500/10 rounded p-2.5 relative">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-mono tracking-wider uppercase text-cyan-400">Operational Invariant Function</span>
              <button 
                onClick={() => {
                  if (editingMeaning) {
                    handleSaveMeaning();
                  } else {
                    setEditingMeaning(true);
                  }
                }}
                className="text-[9px] text-amber-400 hover:text-amber-300 font-mono underline"
              >
                {editingMeaning ? 'Save' : 'Override Meaning'}
              </button>
            </div>

            {editingMeaning ? (
              <div className="flex flex-col gap-y-1.5">
                <textarea
                  value={editMeaningValue}
                  onChange={(e) => setEditMeaningValue(e.target.value)}
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded p-1.5 text-xs text-white focus:ring-1 focus:ring-cyan-500 outline-none"
                  rows={2}
                />
                <div className="flex justify-end gap-x-2">
                  <button 
                    onClick={() => setEditingMeaning(false)}
                    className="text-[10px] text-gray-400 hover:text-white px-2 py-0.5 rounded bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveMeaning}
                    className="text-[10px] text-black bg-amber-400 hover:bg-amber-300 px-2.5 py-0.5 rounded font-bold"
                  >
                    Apply Invariant
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-200 leading-relaxed font-sans italic pl-1">
                "{getRootInvariantMeaning(selectedRoot, rootData || undefined)}"
              </p>
            )}
          </div>

          {/* The Beautiful Chain Pathway List (Quran-wide occurrences timeline) */}
          <div className="flex flex-col gap-y-2 mt-1">
            <div className="flex justify-between items-center border-b border-cyan-500/10 pb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1">
                <GitCommit className="h-3 w-3" /> The Beautiful Chain of {selectedRoot}
              </span>
              
              {/* Search input to narrow down pathway */}
              <div className="relative flex items-center">
                <Search className="h-3 w-3 text-gray-500 absolute left-1.5 pointer-events-none" />
                <input 
                  type="text" 
                  value={pathwaySearchQuery}
                  onChange={(e) => setPathwaySearchQuery(e.target.value)}
                  placeholder="Filter (e.g., 19:)" 
                  className="bg-black/50 border border-slate-700 rounded pl-5 pr-1.5 py-0.5 text-[9px] text-gray-300 outline-none w-28 focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Scrollable list of coordinates */}
            <div className="max-h-[160px] overflow-y-auto pr-1 flex flex-col gap-y-1.5 scrollbar-thin scrollbar-thumb-cyan-500/20">
              {filteredPathway.length === 0 ? (
                <span className="text-[10px] text-center text-gray-500 py-2">No matching coordinates in root-lineage.</span>
              ) : (
                filteredPathway.map((v) => {
                  const isCurrent = v.r === currentRef;
                  const [vSurah, vAyah] = v.r.split(':').map(Number);
                  
                  return (
                    <div 
                      key={v.r} 
                      onClick={() => onVerseSelect(vSurah, vAyah)}
                      className={`p-1.5 rounded flex items-center justify-between text-xs cursor-pointer transition-all ${
                        isCurrent 
                          ? 'bg-amber-500/15 border border-amber-500/40 text-amber-200' 
                          : 'bg-black/30 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/20 text-gray-300 hover:text-cyan-300'
                      }`}
                    >
                      <span className="font-mono font-bold">{v.r}</span>
                      
                      {/* Truncated Arabic string segment */}
                      <span className="text-right font-serif text-[11px] truncate max-w-[140px]" dir="rtl">
                        {v.a}
                      </span>

                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-mono opacity-60">Trace</span>
                        <ArrowRight className="h-3 w-3 opacity-60" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-6 text-xs text-gray-500 bg-slate-900/10 border border-slate-800 rounded-lg">
          Select any word of the verse above to trace its trilateral root lineage and see its invariant operational meaning.
        </div>
      )}

      {/* Sacred Topology Parameters and Top Connection Link */}
      {currentEngineVerse.T || (currentEngineVerse.l && currentEngineVerse.l.length > 0) ? (
        <div className="p-3 bg-slate-900/30 border border-slate-700/30 rounded-lg flex flex-col gap-y-2.5">
          <div className="flex items-center gap-x-2 text-cyan-400 border-b border-cyan-500/10 pb-1.5">
            <Activity className="h-3.5 w-3.5" />
            <h5 className="text-[10px] font-black uppercase tracking-widest leading-none">Sacred Topology & Connections</h5>
          </div>

          {/* Topology properties grid */}
          {currentEngineVerse.T && (
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-black/30 p-2 rounded border border-cyan-500/5">
              {currentEngineVerse.T.S && (
                <div className="flex flex-col gap-y-0.5">
                  <span className="text-gray-500 text-[8px] uppercase">State</span>
                  <span className="text-gray-300 truncate font-semibold">{currentEngineVerse.T.S}</span>
                </div>
              )}
              {currentEngineVerse.T.u && (
                <div className="flex flex-col gap-y-0.5">
                  <span className="text-gray-500 text-[8px] uppercase">Trust Model</span>
                  <span className="text-gray-300 truncate font-semibold">{currentEngineVerse.T.u}</span>
                </div>
              )}
              {currentEngineVerse.T.C && (
                <div className="flex flex-col gap-y-0.5">
                  <span className="text-gray-500 text-[8px] uppercase">Carrier</span>
                  <span className="text-gray-300 truncate font-semibold">{currentEngineVerse.T.C}</span>
                </div>
              )}
              {currentEngineVerse.T.p && (
                <div className="flex flex-col gap-y-0.5">
                  <span className="text-gray-500 text-[8px] uppercase">Phase / Grip</span>
                  <span className="text-gray-300 truncate font-semibold">
                    {currentEngineVerse.T.p} {currentEngineVerse.T.g ? `(${currentEngineVerse.T.g})` : ''}
                  </span>
                </div>
              )}
              {currentEngineVerse.T.A && (
                <div className="flex flex-col gap-y-0.5 col-span-2 mt-1 border-t border-slate-800 pt-1">
                  <span className="text-gray-500 text-[8px] uppercase">Dual Fields (River A & B)</span>
                  <span className="text-amber-400/95 font-sans leading-relaxed text-[9px]">
                    A: <strong className="font-mono">{currentEngineVerse.T.A}</strong> | B: <strong className="font-mono">{currentEngineVerse.T.B || 'N/A'}</strong>
                  </span>
                </div>
              )}
              {currentEngineVerse.T.n && (
                <div className="flex flex-col gap-y-0.5 col-span-2 border-t border-slate-800 pt-1 mt-0.5">
                  <span className="text-gray-500 text-[8px] uppercase">Topology Note</span>
                  <span className="text-gray-400 font-sans leading-relaxed text-[9px] italic">
                    "{currentEngineVerse.T.n}"
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Top connection link */}
          {currentEngineVerse.l && currentEngineVerse.l.length > 0 && (
            <div className="flex items-center justify-between bg-cyan-950/20 border border-cyan-500/20 p-2 rounded">
              <div className="flex items-center gap-x-1.5 text-[10px] text-cyan-300 font-mono">
                <Link2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Top Connection Link:</span>
                <strong className="text-amber-400">{currentEngineVerse.l[0].r}</strong>
                <span className="text-[8px] text-gray-500">(Score: {currentEngineVerse.l[0].s})</span>
              </div>
              <button 
                onClick={() => {
                  const [tSurah, tAyah] = currentEngineVerse.l![0].r.split(':').map(Number);
                  onVerseSelect(tSurah, tAyah);
                }}
                className="text-[9px] font-bold bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded flex items-center gap-x-1 transition-all"
              >
                Traverse <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
