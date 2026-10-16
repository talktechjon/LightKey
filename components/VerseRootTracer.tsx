import React, { useState, useEffect, useMemo } from 'react';
import { loadQuranEngine, QuranEngineData, EngineVerse } from '../quranEngine.ts';
import { defaultTranslation } from '../data/defaultTranslation.ts';
import { 
  GitCommit, 
  Activity, 
  Link2, 
  ArrowRight, 
  Search, 
  Fingerprint, 
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Plus,
  X
} from 'lucide-react';

interface VerseRootTracerProps {
  surah: number;
  ayah: number;
  onVerseSelect: (surah: number, ayah: number) => void;
}

const COMMON_WORD_MEANINGS: Record<string, string> = {
  'wqal': 'and said',
  'qal': 'said',
  'qalu': 'they said',
  'aldha': 'the one who',
  'aldhyn': 'those who',
  'ashtrah': 'purchased him',
  'mn': 'from / of',
  'msr': 'Egypt',
  'lamrath': 'to his wife',
  'akrma': 'honor him',
  'mthwah': 'his residence',
  'esa': 'perhaps / may',
  'an': 'that / to',
  'ynfena': 'benefit us',
  'aw': 'or',
  'ntkhdhh': 'we take him',
  'wlda': 'a child',
  'wkdhlk': 'and thus',
  'mkna': 'We established',
  'lywsf': 'for Yusuf',
  'fa': 'so / and',
  'alard': 'the earth',
  'wlnelmh': 'and we will teach him',
  'tawyl': 'interpretation',
  'wallh': 'and Allah',
  'ghalb': 'prevailing',
  'wlkn': 'but / however',
  'akthr': 'most',
  'alnas': 'the people',
  'la': 'not / no',
  'yelmwn': 'they know',
  'allh': 'Allah',
  'rbb': 'Lord',
  'alrhmn': 'the Merciful',
  'alrhym': 'the Compassionate',
  'fi': 'in',
  'ala': 'upon / on',
  'wa': 'and',
  'bil': 'with / by',
  'li': 'for / to',
  'hu': 'he / him',
  'hm': 'they / them',
  'in': 'if / indeed'
};

const getWordEnglishMeaning = (detail: any, rootMeaning?: string): string => {
  if (detail?.e) return detail.e;
  const translitKey = (detail?.T || '').toLowerCase().replace(/[^a-z]/g, '');
  if (COMMON_WORD_MEANINGS[translitKey]) {
    return COMMON_WORD_MEANINGS[translitKey];
  }
  if (rootMeaning) {
    return rootMeaning;
  }
  return '';
};

const getRootWordInfo = (v: EngineVerse, targetRoots: string[]) => {
  if (!targetRoots || targetRoots.length === 0 || !v.w || v.w.length === 0) {
    return { arabicWord: '', transliteration: '' };
  }

  const rawWords = v.a.split(/\s+/);
  const matching: { ar: string; tr: string; root: string }[] = [];

  v.w.forEach((w, i) => {
    if (w.r && targetRoots.includes(w.r)) {
      const arWord = rawWords[i] || '';
      let trWord = w.T || '';
      if (arWord) {
        matching.push({ ar: arWord, tr: trWord, root: w.r });
      }
    }
  });

  const arabicWord = matching.map(m => m.ar).filter(Boolean).join(' · ');
  const transliteration = matching.map(m => m.tr ? `${m.tr} (${m.root})` : m.root).filter(Boolean).join(' · ');

  return {
    arabicWord: arabicWord || v.a.split(/\s+/)[0] || '',
    transliteration: transliteration || ''
  };
};

export const VerseRootTracer: React.FC<VerseRootTracerProps> = ({ surah, ayah, onVerseSelect }) => {
  const [engine, setEngine] = useState<QuranEngineData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoots, setSelectedRoots] = useState<string[]>([]);
  const [matchMode, setMatchMode] = useState<'AND' | 'OR'>('AND');
  const [hoveredRoot, setHoveredRoot] = useState<string | null>(null);
  const [pathwaySearchQuery, setPathwaySearchQuery] = useState<string>('');
  const [manualRootInput, setManualRootInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const localTranslations = useMemo<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('quran_local_translations');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }, []);

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

  // Handle auto-selecting the first root of the verse on load if none selected
  useEffect(() => {
    if (currentEngineVerse && currentEngineVerse.R && currentEngineVerse.R.length > 0) {
      if (selectedRoots.length === 0) {
        setSelectedRoots([currentEngineVerse.R[0]]);
      }
    }
  }, [currentEngineVerse]);

  const toggleRoot = (rootKey: string) => {
    setSelectedRoots(prev => 
      prev.includes(rootKey) 
        ? prev.filter(r => r !== rootKey)
        : [...prev, rootKey]
    );
  };

  const handleAddManualRoot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualRootInput.trim()) return;

    // Split multiple roots by commas, plus signs, or whitespace (e.g. "b-q-y, w-dh-r" or "b-q-y + w-dh-r" or "kbr sbr")
    const rawTokens = manualRootInput
      .split(/[,+\s]+/)
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    const normalizedTokens = rawTokens.map(token => {
      // If token already exists in engine.roots, keep it
      if (engine && engine.roots[token]) return token;
      // If user typed 3 letters without hyphens (e.g. "kbr" or "sbr"), check if hyphenated version exists
      if (!token.includes('-') && token.length >= 3) {
        const hyphenated = token.split('').join('-');
        if (engine && engine.roots[hyphenated]) {
          return hyphenated;
        }
      }
      return token;
    });

    if (normalizedTokens.length > 0) {
      setSelectedRoots(prev => {
        const next = [...prev];
        normalizedTokens.forEach(t => {
          if (!next.includes(t)) {
            next.push(t);
          }
        });
        return next;
      });
      setManualRootInput('');
    }
  };

  const handleCopyXCoordinates = () => {
    const coordsString = filteredPathway.map(v => v.r).join(', ');
    navigator.clipboard.writeText(coordsString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Verses matching selected roots:
  // In 'AND' mode (default): Narrows down results so verses must contain ALL selected roots (Intersection)
  // In 'OR' mode: Expands results to verses containing ANY selected root (Union)
  const rootPathwayVerses = useMemo(() => {
    if (!engine || selectedRoots.length === 0) return [];
    return engine.verses.filter(v => {
      if (!v.R || v.R.length === 0) return false;
      if (matchMode === 'AND') {
        return selectedRoots.every(r => v.R!.includes(r));
      }
      return selectedRoots.some(r => v.R!.includes(r));
    });
  }, [engine, selectedRoots, matchMode]);

  // Filtered pathway based on search query (e.g. "19:" or "2:" or "chapter number")
  const filteredPathway = useMemo(() => {
    if (!pathwaySearchQuery.trim()) return rootPathwayVerses;
    const query = pathwaySearchQuery.toLowerCase().trim();
    return rootPathwayVerses.filter(v => {
      // Match "surah:ayah" or just "surah"
      return v.r.startsWith(query) || v.c.toString() === query;
    });
  }, [rootPathwayVerses, pathwaySearchQuery]);

  // Calculate chromosome distribution of selected roots across 114 chapters
  const chromosomeTicks = useMemo(() => {
    if (selectedRoots.length === 0 || !engine) return [];
    // Chapters range from 1 to 114
    const distribution = Array(115).fill(0);
    engine.verses.forEach(v => {
      if (!v.R || v.R.length === 0) return;
      const isMatch = matchMode === 'AND'
        ? selectedRoots.every(r => v.R!.includes(r))
        : selectedRoots.some(r => v.R!.includes(r));
      if (isMatch) {
        distribution[v.c]++;
      }
    });
    return distribution;
  }, [selectedRoots, engine, matchMode]);

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
          const rootObj = hasRoot ? engine.roots[rootKey] : null;
          const wbwMeaning = detail ? getWordEnglishMeaning(detail, rootObj?.m) : '';
          const isSelected = selectedRoots.includes(rootKey);
          const isHovered = hoveredRoot === rootKey;

          return (
            <div 
              key={i} 
              onMouseEnter={() => hasRoot && setHoveredRoot(rootKey)}
              onMouseLeave={() => setHoveredRoot(null)}
              onClick={() => hasRoot && toggleRoot(rootKey)}
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

              {/* WBW English Meaning */}
              {wbwMeaning && (
                <span className="text-[10px] text-emerald-300 font-sans mt-1 leading-none font-medium text-center">
                  {wbwMeaning}
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

      {/* Active Roots Detail Panel */}
      <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex flex-col gap-y-3">
        {/* Header & Manual Input */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cyan-500/10 pb-2">
          <div className="flex items-center gap-x-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">Active Roots:</span>
            {selectedRoots.length === 0 ? (
              <span className="text-[10px] text-gray-500 italic">None selected (click roots above or type below)</span>
            ) : (
              <div className="flex flex-wrap gap-1 items-center">
                {selectedRoots.map(r => (
                  <span key={r} className="inline-flex items-center gap-1 text-xs font-black text-amber-400 font-mono bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                    {r}
                    <button 
                      onClick={() => toggleRoot(r)}
                      className="text-gray-400 hover:text-red-400 transition-colors ml-0.5"
                      title="Remove root"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedRoots.length > 1 && (
                  <button 
                    onClick={() => setSelectedRoots([])}
                    className="text-[9px] text-gray-400 hover:text-red-400 font-mono ml-1 px-1.5 py-0.5 rounded bg-black/40 border border-slate-700 hover:border-red-500/30 transition-colors"
                    title="Clear all roots"
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Manual root input */}
          <form onSubmit={handleAddManualRoot} className="flex items-center gap-1">
            <input 
              type="text"
              value={manualRootInput}
              onChange={(e) => setManualRootInput(e.target.value)}
              placeholder="e.g. b-q-y, w-dh-r"
              className="bg-black/50 border border-slate-700 rounded px-2 py-1 text-[10px] text-gray-200 outline-none w-36 focus:border-cyan-500/50"
            />
            <button 
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-500 text-white p-1 rounded transition-colors flex items-center justify-center"
              title="Add root(s) - separates by comma, plus, or space"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* Multi-Root Filter Mode Toggle when multiple roots are selected */}
        {selectedRoots.length > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-black/40 p-2 rounded border border-cyan-500/20 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono font-medium">Multi-Root Mode:</span>
              <div className="inline-flex rounded p-0.5 bg-cyan-950/80 border border-cyan-500/40">
                <button
                  type="button"
                  onClick={() => setMatchMode('AND')}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
                    matchMode === 'AND'
                      ? 'bg-amber-400 text-black shadow'
                      : 'text-gray-400 hover:text-cyan-300'
                  }`}
                  title="Narrow down: Verse must contain ALL selected roots"
                >
                  AND (Narrow: All)
                </button>
                <button
                  type="button"
                  onClick={() => setMatchMode('OR')}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
                    matchMode === 'OR'
                      ? 'bg-cyan-500 text-black shadow'
                      : 'text-gray-400 hover:text-cyan-300'
                  }`}
                  title="Expand: Verse contains ANY selected root"
                >
                  OR (Expand: Any)
                </button>
              </div>
            </div>
            <div className="text-[9px] font-mono">
              {matchMode === 'AND' ? (
                <span className="text-amber-300 font-semibold">
                  Narrowed down: {rootPathwayVerses.length} verses contain ALL {selectedRoots.length} roots
                </span>
              ) : (
                <span className="text-cyan-300">
                  Expanded union: {rootPathwayVerses.length} verses contain ANY root
                </span>
              )}
            </div>
          </div>
        )}

        {selectedRoots.length > 0 ? (
          <>
            {/* Chromosome distribution bar across 114 chapters */}
            <div className="flex flex-col gap-y-1 bg-black/40 p-2 rounded border border-cyan-500/10">
              <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                <span>Chapter 1</span>
                <span className="text-cyan-400 tracking-wider">
                  Chromosome Distribution ({matchMode === 'AND' && selectedRoots.length > 1 ? 'ALL Roots' : 'Occurrences'})
                </span>
                <span>Chapter 114</span>
              </div>
              <svg viewBox="0 0 114 6" className="w-full h-2.5 bg-gray-900 rounded overflow-hidden">
                <rect width="114" height="6" fill="#030712" />
                {chromosomeTicks.map((count, chap) => {
                  if (count === 0) return null;
                  const opacity = Math.min(0.3 + (count * 0.15), 1.0);
                  const color = chap === surah ? '#f59e0b' : '#22d3ee';
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
                      <title>{`Chapter ${chap}: ${count} matches`}</title>
                    </line>
                  );
                })}
              </svg>
              <span className="text-[8px] text-gray-500 font-mono text-right italic leading-none mt-0.5">
                {matchMode === 'AND' && selectedRoots.length > 1
                  ? `Narrowed down: ${rootPathwayVerses.length} coordinates contain ALL ${selectedRoots.length} roots`
                  : `Highlighting ${rootPathwayVerses.length} total coordinates`}
              </span>
            </div>

            {/* The Beautiful Chain Pathway List */}
            <div className="flex flex-col gap-y-2 mt-1">
              <style>{`
                @keyframes readerMarqueeScroll {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                .reader-marquee-track {
                  display: inline-flex;
                  white-space: nowrap;
                  will-change: transform;
                  animation: readerMarqueeScroll 28s linear infinite;
                }
                .group:hover .reader-marquee-track,
                .reader-marquee-track:hover {
                  animation-play-state: paused;
                }
                .marquee-content {
                  display: inline-flex;
                  align-items: center;
                  padding-right: 3rem;
                }
              `}</style>
              <div className="flex flex-wrap justify-between items-center border-b border-cyan-500/10 pb-1 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1">
                    <GitCommit className="h-3 w-3" /> The Beautiful Chain of {selectedRoots.join(matchMode === 'AND' ? ' + ' : ' | ')}
                  </span>
                  {selectedRoots.length > 1 && (
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                      matchMode === 'AND' 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {matchMode === 'AND' ? 'ALL ROOTS (Narrowed)' : 'ANY ROOT (Union)'}
                    </span>
                  )}
                  
                  {/* Copy X:X List button */}
                  <button 
                    onClick={handleCopyXCoordinates}
                    className="text-[9px] font-mono bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded flex items-center gap-1 transition-all"
                    title="Copy all X:X coordinates in X:X, X:X format"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied X:X' : 'Copy X:X List'}</span>
                  </button>
                </div>
                
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
                  <div className="p-3 bg-black/40 border border-dashed border-cyan-500/20 rounded text-center flex flex-col items-center gap-1.5 my-1">
                    <span className="text-[10px] text-gray-400 font-mono">
                      No coordinates found containing {matchMode === 'AND' ? 'ALL' : 'ANY of'} the selected roots together: <strong className="text-amber-400">{selectedRoots.join(matchMode === 'AND' ? ' + ' : ' | ')}</strong>.
                    </span>
                    {matchMode === 'AND' && selectedRoots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setMatchMode('OR')}
                        className="text-[9px] font-mono bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 px-2.5 py-1 rounded transition-colors"
                      >
                        Switch to OR Mode (Expand to view verses with ANY root)
                      </button>
                    )}
                  </div>
                ) : (
                  filteredPathway.map((v) => {
                    const isCurrent = v.r === currentRef;
                    const [vSurah, vAyah] = v.r.split(':').map(Number);
                    const wordInfo = getRootWordInfo(v, selectedRoots);
                    const transPair = localTranslations[v.r] || defaultTranslation[v.r];
                    const englishText = transPair?.[0] || '';
                    const banglaText = transPair?.[1] || '';
                    
                    return (
                      <div 
                        key={v.r} 
                        onClick={() => onVerseSelect(vSurah, vAyah)}
                        className={`p-1.5 rounded flex items-center justify-between text-xs cursor-pointer transition-all group overflow-hidden ${
                          isCurrent 
                            ? 'bg-amber-500/15 border border-amber-500/40 text-amber-200' 
                            : 'bg-black/30 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/20 text-gray-300 hover:text-cyan-300'
                        }`}
                      >
                        {/* Static X:X */}
                        <span className="font-mono font-bold text-xs shrink-0 w-11 text-cyan-400">{v.r}</span>
                        
                        {/* Scrolling marquee */}
                        <div 
                          className="flex-1 overflow-hidden relative mx-2 h-5 flex items-center select-none"
                          style={{
                            maskImage: 'linear-gradient(to right, transparent, black 8px, black calc(100% - 8px), transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8px, black calc(100% - 8px), transparent)'
                          }}
                        >
                          <div className="reader-marquee-track">
                            <span className="marquee-content">
                              <span className="font-serif font-bold text-amber-300 text-[12px]" dir="rtl">{wordInfo.arabicWord}</span>
                              {wordInfo.transliteration && (
                                <span className="font-mono text-cyan-300 text-[10px] ml-1">[{wordInfo.transliteration}]</span>
                              )}
                              {englishText && (
                                <span className="text-gray-200 text-[11px] ml-1.5 font-sans">{englishText}</span>
                              )}
                              {banglaText && (
                                <>
                                  <span className="text-cyan-500/60 font-bold mx-1.5 font-sans">|</span>
                                  <span className="text-emerald-300/90 text-[11px] font-sans">{banglaText}</span>
                                </>
                              )}
                            </span>
                            <span className="marquee-content" aria-hidden="true">
                              <span className="font-serif font-bold text-amber-300 text-[12px]" dir="rtl">{wordInfo.arabicWord}</span>
                              {wordInfo.transliteration && (
                                <span className="font-mono text-cyan-300 text-[10px] ml-1">[{wordInfo.transliteration}]</span>
                              )}
                              {englishText && (
                                <span className="text-gray-200 text-[11px] ml-1.5 font-sans">{englishText}</span>
                              )}
                              {banglaText && (
                                <>
                                  <span className="text-cyan-500/60 font-bold mx-1.5 font-sans">|</span>
                                  <span className="text-emerald-300/90 text-[11px] font-sans">{banglaText}</span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Static Trace -> button */}
                        <div className="flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50 group-hover:text-cyan-200 transition-colors">
                          <span className="text-[8px] font-mono opacity-80">Trace</span>
                          <ArrowRight className="h-3 w-3 opacity-80" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-xs text-gray-500">
            Select one or more roots above or type a root to view its Beautiful Chain.
          </div>
        )}
      </div>

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
