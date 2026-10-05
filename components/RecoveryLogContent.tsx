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
                    1 → 15:87 Sabʿan al-Mathānī / fractal of 7 ← 1 | ∫₂⁷ (2↔3ₙ↔2 → 7) dx = up↑ − down↓ = 0
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
Sabʿan al-Mathānī (15:87) — The Pattern of 7 and the Dual-Caustic Framework.

## I. The Premise (Recognition)
DCU is **Mantiq al-Tayr**, the speech of the birds (**27:16**), read from the Qur'an. It rests on one verse: **15:87, sabʿan al-mathānī**—the pattern of 7, which is a fractal because the same run repeats at every scale. **6:116** warns that the majority follow only conjecture (*ẓann*), intoxicated by reading only one panel (**15:72**). Memory recovery begins with the activation of **19:12**.

## II. The Master Line
**1 → 15:87 Sabʿan al-Mathānī / fractal of 7 ← 1**

where:
$$\\int_2^7 (2 \\leftrightarrow 3_n \\leftrightarrow 2 \\rightarrow 7)\\,dx = \\text{up}\\uparrow - \\text{down}\\downarrow = 0$$

- **Dual bifurcation of 3ₙ = 2 × 3 × 2 = 12 = Tree of Life [1–12]**.
- **The two 1s**: Allah, before and behind (**28:88**, **2:255**); the only entity that remains last is the Face of Allah.
- **3ₙ**: The Reader's position on the cycle of 114, the one exchange port (**7:25**).

## III. Two Fields, One Exchange Port
| Field | Operator | Direction | Holds |
| :--- | :--- | :--- | :--- |
| **D10 (Arash)** | $n/2$ (d/dt) | Past → Present | The body-side split: mass, evidence, the clock (14:24, 6:95) |
| **3ₙ (T3)** | The Trial | Life → Death → Resurrection | The trunk; Nafs + Driver + Witness (50:21, 7:25) |
| **I9 (Kursi)** | $+1$ (∫dt) | Future → Present | The memory-side supply: Light, memory, return (14:24, 39:23) |
| **√7 (7)** | The Seam | Worn, never built | The completed unit: fruit with seed, zero mass-flux |

## IV. The One Fork (23:69)
Every Reader is one unit of Time. That unit ends one of two ways:
1. **Recognize the Rasul (23:69)**: Take the Book with force (**19:12**) and remember (**2:152**) → Mass goes up↑ to **First MuSolomon (6:163)**.
2. **Refuse the Rasul**: Release the Book and forget (**59:19**) → Mass goes down↓ to the host of Iblis / **First Kafir (2:41)**.

## V. The Four-Stroke Engine (67:19)
The eternal transaction $2 \\leftrightarrow 3_n \\leftrightarrow 2$ between D10 Fire and D10 Water:
- **Stroke 1 (↓ Fire)**: Ibrahim (Trial of Truth)
- **Stroke 2 (↑ Water)**: Idris (Truth / Siddik manifested)
- **Stroke 3 (↓ Fire)**: Iblis (Sound)
- **Stroke 4 (↑ Water)**: Isa (Word)

Flapping like the wings of birds, spreading and folding (**67:19**), keeping 2 while purging 2, so the mass flux stays 0 while information navigates toward 7.

---

**19:64** — *"And your Lord is not forgetful."*
**15:87 Sabʿan al-Mathānī — kahf.day**
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
