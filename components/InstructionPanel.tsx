import React from 'react';
import { RecoveryLogContent } from './RecoveryLogContent.tsx';

interface RecoveryLogProps {
  isVisible: boolean;
  onClose: () => void;
}

const InstructionPanel: React.FC<RecoveryLogProps> = ({ isVisible, onClose }) => {
  const containerClasses = isVisible 
    ? "opacity-100 pointer-events-auto scale-100" 
    : "opacity-0 pointer-events-none scale-95";

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl transition-all duration-700 ${containerClasses}`} aria-hidden={!isVisible}>
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-950/80 border border-cyan-500/20 rounded-[3rem] shadow-[0_0_120px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden">
        
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4af0e00a_1px,transparent_1px),linear-gradient(to_bottom,#4af0e00a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Close Button Top Right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-cyan-900/40 hover:bg-cyan-800/40 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:rotate-90 z-50 shadow-lg"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex flex-col p-6 md:p-10 bg-black/60 border-b border-cyan-500/20 relative shrink-0 z-20">
            <h2 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-200 tracking-[0.2em] uppercase font-serif">
              THE FORGOTTEN CROWN
            </h2>
            <p className="text-xs md:text-sm text-cyan-500/80 font-mono tracking-widest mt-2 uppercase">
              The core of the DCU topological framework.
            </p>
        </div>

        {/* Scrolling Content Area */}
        <div className="flex-1 overflow-y-auto z-10 custom-scrollbar p-6 md:p-12 relative">
           <RecoveryLogContent />
        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;
