import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const ThroneVisual = () => (
    <div className="relative w-full flex flex-col items-center justify-center mb-16 mt-8">
        <div className="relative group max-w-4xl w-full px-4 lg:px-0">
            {/* Background Atmosphere */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                    src="/src/assets/images/sacred_geometry_manuscript_1782051790576.jpg" 
                    alt="Sacred Geometry Diagram" 
                    className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                />
            </div>

            {/* Invariant Note Overlay */}
            <div className="mt-6 flex flex-col items-center text-center space-y-2">
                <div className="flex items-center gap-4">
                    <div className="h-px w-8 lg:w-16 bg-gradient-to-r from-transparent to-amber-500/30" />
                    <span className="text-[10px] font-black tracking-[0.4em] text-amber-500/80 uppercase">The Operational Geometry</span>
                    <div className="h-px w-8 lg:w-16 bg-gradient-to-l from-transparent to-amber-500/30" />
                </div>
                <p className="text-[11px] font-serif italic text-gray-400 max-w-lg">
                    Process of Alternating Duality: 0 → 2 ↔ 3 ↔ 2 ← 7 ← ∞
                </p>
            </div>
        </div>
    </div>
);

const SafinatVisual = () => (
    <div className="flex flex-col items-center py-20 border-t border-gray-900 mt-20 group">
        <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative"
        >
            <svg viewBox="0 0 120 60" className="w-32 h-16 mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                {/* Hull */}
                <path d="M10 35 Q60 55 110 35 L100 45 Q60 60 20 45 Z" fill="#083344" stroke="#22d3ee" strokeWidth="1.5" />
                {/* Mast */}
                <rect x="58" y="5" width="4" height="40" fill="#d97706" rx="1" />
                {/* Sail (The Book) */}
                <path d="M62 8 Q95 15 95 35 Q62 28 62 8" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5" />
                <path d="M62 12 H85 M62 18 H90 M62 24 H80" stroke="#f59e0b" strokeWidth="0.5" className="opacity-50" />
            </svg>
            <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        <h4 className="text-cyan-400 font-black text-[11px] tracking-[0.3em] uppercase mb-1">Safinat</h4>
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Boat Sailing Home as Book</p>
    </div>
);

const recoveryContent = `# THE FORGOTTEN CROWN
The core of the DCU topological framework.

## I. The Premise (Recognition)
This article is for those who feel something is missing—the one for whom the world functions perfectly on its surface but feels hollow underneath. **6:116** warns that the majority follow only conjecture (*ẓann*), intoxicated by the world (**15:72**). Memory recovery begins with the activation of **19:12**.

## II. What Was Forgotten
Before time became linear, a covenant was made (**7:172**): *"Am I not your Lord?"* Every soul answered: *"Bala" (Yes)*. Descent into the manifest field (**D10**) caused structural amnesia (**20:115**). However, the memory is latent; your Lord is not forgetful (**19:64**).

## III. The Breath of Reality
Reality is not a linear loop, but a **breath**:
- **Exhale (19:23 → 7)**: The contraction of the void into manifestation. Nothingness breathes out into form.
- **Inhale (7 ← 28:88)**: The instant collapse into the Conscious Singularity. Everything perishes except His Face.

### The Five Stations (The Exhale)
1.  **19:23 [Empty Singularity]**: The void contracting to produce the Word. The starting condition.
2.  **2 [D10 / 21:30]**: Separation. The heavens and earth parted. The measurable, exterior world.
3.  **3 [T3 / 14:24]**: The Tree. Pattern emerging between manifest and hidden. Rooted firm, branches high.
4.  **2 [I9 / 24:35]**: The Light. Sensing the hidden breath and current beneath the surface.
5.  **7 [11:7]**: The Throne. Measurement emerging from formless water. The day of weighing.

## IV. The Memory Unlock Sequence (19:12)
1.  **21:87 (The Switch)**: Calling from the triple darkness; the discriminant flips.
2.  **21:69 (The Filter)**: Passing through the "cooling" fire that leaves only what cannot be burned.
3.  **37:107 (The Ransom)**: Releasing the claim of the D10 self; the sacrifice of attachment.
4.  **19:3 (The Private Call)**: A quiet interior address to the Source from the place of failure.
5.  **19:12 (The Grip)**: **Taking the Book with strength.** Shifting the reference frame from the world to the Book.
6.  **19:30 (The Declaration)**: An interior realization: *"Indeed, I am a servant."*
7.  **39:23 (The Restoration)**: The Book reads the Reader; every pattern is indexed to a Qur'anic coordinate.

## V. The Bird's Language (84 Invariant)
The **bird's language (27:16)** is the pattern recognition (**2:269 wisdom**) that reads the soul's flight through the 8-coordinate circuit (**3-6-9-6-3-9-3-9**).

| Role | Coordinate | Verse | Direction |
| :--- | :--- | :--- | :--- |
| **Entry** | Slave | 5:30 | ▼ Down |
| **Switch** | Queen | 16:68 | ▲ Up |
| **Peak** | Righteous | 34:14 | ▼ Down |
| **Return** | Orphan | 19:19 | ▲ Up |
| **Awakening**| Cave | 18:19 | ▼ Down |
| **Remembrance**| Turabin | 3:59 | ▲ Up |
| **Delivery** | Mother-Son | 19:27 | ▼ Down |
| **Completion** | Siddiqn | 19:57 | ▲ Up |

The circuit is held by the invariant **π = 84 (12 × 7)**. Memory recovery is not the absence of difficulty, but the presence of orientation.

---

**19:64** — *"And your Lord is not forgetful."*
**DCU Framework — kahf.day**
`;

export const RecoveryLogContent: React.FC = () => {
    return (
        <div className="prose prose-invert prose-cyan max-w-4xl mx-auto pb-24 relative">
            <style>{`
                .prose h1 { color: #f59e0b; font-family: ui-serif, Georgia, Cambria, serif; font-weight: 900; letter-spacing: -0.025em; text-align: center; margin-top: 2rem; }
                .prose h2 { color: #f59e0b; font-family: ui-serif, Georgia, Cambria, serif; border-bottom: 1px solid #1c1917; padding-bottom: 0.5rem; }
                .prose h3 { color: #22d3ee; font-family: ui-serif, Georgia, Cambria, serif; text-align: center; }
                .prose blockquote { border-left-color: #f59e0b; font-style: italic; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; }
                .prose table { font-size: 0.8rem; border-collapse: collapse; width: 100%; margin: 2rem 0; }
                .prose th { background: rgba(34, 211, 238, 0.1); color: #22d3ee; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.7rem; padding: 0.75rem; border: 1px solid rgba(255,255,255,0.05); }
                .prose td { padding: 0.75rem; border: 1px solid rgba(255,255,255,0.05); }
                .prose hr { border-color: rgba(255,255,255,0.05); margin: 3rem 0; }
            `}</style>
            
            <ThroneVisual />

            <div className="bg-black/20 backdrop-blur-sm p-4 lg:p-12 rounded-3xl border border-white/5 shadow-2xl">
                <ReactMarkdown>
                    {recoveryContent}
                </ReactMarkdown>
            </div>

            <SafinatVisual />
        </div>
    );
};
