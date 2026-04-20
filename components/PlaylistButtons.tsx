import React from 'react';
import { PlaylistType } from '../types.ts';
import { EyeIcon, WaveIcon, InvertedTriangleIcon } from './Icons.tsx';

interface PlaylistButtonsProps {
    onWatch: (type: PlaylistType) => void;
    disabled?: boolean;
}

const PlaylistButtons: React.FC<PlaylistButtonsProps> = ({ onWatch, disabled = false }) => {
    return (
        <div className="flex items-center space-x-1">
            <button
                onClick={() => onWatch('tafsir')}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center justify-center rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed h-[26px] w-[26px] [&>svg]:w-3.5 [&>svg]:h-3.5"
                aria-label="Watch tafsir sequence on YouTube (Seer)"
                title="Watch Tafsir Playlist (Seer)"
                disabled={disabled}
            >
                <EyeIcon />
            </button>
            <button
                onClick={() => onWatch('recitation')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed h-[26px] w-[26px] [&>svg]:w-3.5 [&>svg]:h-3.5"
                aria-label="Watch recitation sequence on YouTube (Hear)"
                title="Watch Recitation Playlist (Hear)"
                disabled={disabled}
            >
                <WaveIcon />
            </button>
                <button
                onClick={() => onWatch('englishRecitation')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center justify-center rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed h-[26px] w-[26px] [&>svg]:w-3.5 [&>svg]:h-3.5"
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
