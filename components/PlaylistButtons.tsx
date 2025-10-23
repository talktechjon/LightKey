import React from 'react';
import { PlaylistType } from '../types.ts';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2L1.5 17h17L10 2zM10 14a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const WaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10c1.5-4.5 4.5-4.5 6 0 1.5 4.5 4.5 4.5 6 0" />
  </svg>
);

const InvertedTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18L1.5 3h17L10 18zM10 14a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

interface PlaylistButtonsProps {
    onWatch: (type: PlaylistType) => void;
    disabled?: boolean;
}

const PlaylistButtons: React.FC<PlaylistButtonsProps> = ({ onWatch, disabled = false }) => {
    return (
        <div className="flex items-center space-x-1">
            <button
                onClick={() => onWatch('tafsir')}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold p-2 rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                aria-label="Watch tafsir sequence on YouTube (Seer)"
                title="Watch Tafsir Playlist (Seer)"
                disabled={disabled}
            >
                <EyeIcon />
            </button>
            <button
                onClick={() => onWatch('recitation')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2 rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                aria-label="Watch recitation sequence on YouTube (Hear)"
                title="Watch Recitation Playlist (Hear)"
                disabled={disabled}
            >
                <WaveIcon />
            </button>
                <button
                onClick={() => onWatch('englishRecitation')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold p-2 rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                aria-label="Watch English recitation sequence on YouTube"
                title="Watch English Recitation Playlist"
                disabled={disabled}
            >
                <InvertedTriangleIcon />
            </button>
        </div>
    );
};

export default PlaylistButtons;