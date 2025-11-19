import React from 'react';
import { ActiveVideo } from '../types.ts';

interface VideoModalProps {
    activeVideo: ActiveVideo | null;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ activeVideo, onClose }) => {
    if (!activeVideo) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="relative w-full max-w-4xl bg-black border border-gray-700 rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="absolute top-2 right-2 z-10">
                    <button onClick={onClose} className="text-white hover:text-gray-300 bg-black/50 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="relative pt-[56.25%]">
                    <iframe
                        src={activeVideo.src}
                        title="YouTube video player"
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="p-4 bg-gray-900 text-center">
                     <a 
                        href={activeVideo.originalLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <span>Watch on YouTube</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;