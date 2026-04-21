
import React from 'react';
import { ChapterDetails } from '../types.ts';
import { BirdMotion } from './ChapterGeometry.tsx';
import { KatharaDiagram, SephirotDiagram } from './SecretPatternAnimation.tsx';
import { MUQATTAT_CHAPTERS } from '../constants.ts';

interface InfographicProps {
    chapter: ChapterDetails;
    rotation: number;
    activeSephirotTab: 'zakkum' | 'datePalm';
}

export const DashboardInfographic: React.FC<InfographicProps> = ({ 
    chapter, 
    rotation, 
    activeSephirotTab 
}) => {
    return (
        <div 
            id="infographic-capture-target"
            className="w-[1920px] h-[1080px] bg-[#020617] text-white p-12 flex flex-col font-sans relative overflow-hidden"
            style={{ 
                backgroundImage: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)',
                // Keep it off-screen but available for capture
                position: 'fixed',
                left: '-9999px',
                top: '-9999px',
                zIndex: -100
            }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8 relative z-10">
                <div className="flex flex-col">
                    <h1 className="text-6xl font-bold tracking-tighter text-white mb-2 flex items-center gap-4">
                        <span className="text-cyan-400 opacity-50">#{chapter.number}</span>
                        {chapter.englishName}
                        <span className="text-3xl font-mono text-gray-500 ml-4">{chapter.arabicName}</span>
                    </h1>
                    <p className="text-2xl text-cyan-400/80 font-medium">{chapter.englishNameTranslation}</p>
                </div>
                <div className="flex flex-col items-end text-right">
                    <div className="text-3xl font-mono text-white/40 mb-1">Dual-Field Cosmology Record</div>
                    <div className="text-xl font-mono text-cyan-500 uppercase tracking-[0.2em]">{chapter.revelationType} Revelation</div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-3 gap-12 relative z-10">
                {/* Left Section: Secret Pattern & Bird */}
                <div className="flex flex-col bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                    <h2 className="text-2xl font-bold text-cyan-400 mb-6 uppercase tracking-widest flex justify-between items-baseline">
                        Secret Pattern Phase
                        <span className="text-sm font-mono opacity-50">Rotation: {rotation}°</span>
                    </h2>
                    
                    <div className="flex-1 flex items-center justify-center relative bg-black/40 rounded-2xl border border-white/5">
                        <div className="scale-150 transform">
                            <BirdMotion rotation={rotation} />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-bold">Total Verses</div>
                            <div className="text-3xl font-mono font-bold text-white">{chapter.totalVerses}</div>
                        </div>
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-bold">Muqatta'at</div>
                            <div className="text-3xl font-mono font-bold text-white">{MUQATTAT_CHAPTERS.has(chapter.number) ? 'Yes' : 'No'}</div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Tree of Life */}
                <div className="flex flex-col bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl relative">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                    <h2 className="text-2xl font-bold text-blue-400 mb-6 uppercase tracking-widest">Tree of Life (Kathara)</h2>
                    <div className="flex-1 bg-black/20 rounded-2xl p-4 flex items-center justify-center">
                        <div className="w-full h-full p-4 scale-110 transform">
                            <KatharaDiagram rotation={rotation} isDesktop={true} />
                        </div>
                    </div>
                </div>

                {/* Right Section: Sephirot Alignment */}
                <div className="flex flex-col bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                    <h2 className="text-2xl font-bold text-emerald-400 mb-6 uppercase tracking-widest flex justify-between items-baseline">
                        Sephirot Alignment
                        <span className="text-sm font-mono opacity-50 uppercase">{activeSephirotTab} Path</span>
                    </h2>
                    <div className="flex-1 bg-black/20 rounded-2xl p-4 flex items-center justify-center">
                        <div className="w-full h-full scale-95 transform">
                            <SephirotDiagram rotation={rotation} activeTab={activeSephirotTab} isDesktop={true} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 flex justify-between items-center text-gray-500 font-mono text-sm border-t border-white/5 pt-6 relative z-10">
                <div className="flex gap-12">
                    <div className="flex flex-col">
                        <span className="text-gray-600 font-bold mb-1">TIMESTAMP</span>
                        <span>{new Date().toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600 font-bold mb-1">RESONANCE CODE</span>
                        <span className="text-cyan-400/50">KAHF-{chapter.number}-{rotation}-INFOG</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-cyan-400 opacity-30 font-bold text-xl tracking-widest">KAHF.DAY ∞ COSMOLOGY</div>
                </div>
            </div>
        </div>
    );
};
