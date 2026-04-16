import React from 'react';
import { TOTAL_SLICES } from '../constants.ts';
import { PlaylistType } from '../types.ts';
import PlaylistButtons from './PlaylistButtons.tsx';
import { EyeIconSimple, PlayButtonIcon, PauseButtonIcon } from './Icons.tsx';

interface CustomAnimationControlsProps {
    customSequence: string;
    setCustomSequence: (value: string) => void;
    animationMode: 'play' | 'step' | 'off';
    setAnimationMode: (mode: 'play' | 'step' | 'off') => void;
    setAnimationIndex: (index: number) => void;
    createPlaylist: (type: PlaylistType, chapterIds: number[]) => void;
}

const PRESET_SEQUENCES: Record<string, string> = {
    '1': '1, 10',
    '2': '2, 20, 11',
    '3': '3, 30, 12, 21',
    '4': '4, 40, 13, 31, 22',
    '5': '5, 50, 14, 41, 23, 32',
    '6': '6, 60, 15, 51, 24, 42, 33',
    '7': '7, 70, 16, 61, 25, 52, 34, 43',
    '8': '8, 80, 17, 71, 26, 62, 35, 53, 44',
    '9': '9, 90, 18, 81, 27, 72, 36, 63, 45, 54',
    '∞': '111, 103, 108, 110, 65, 70, 72, 27, 32, 34, 47, 52, 54, 9, 14, 16, 85, 90, 92, 112, 113, 114, 1',
    'eye': '112, 108, 32, 70, 50, 88, 12, 111, 103, 27, 65, 45, 83, 7, 1, 110, 34, 72, 52, 90, 14',
};

const CustomAnimationControls: React.FC<CustomAnimationControlsProps> = ({
    customSequence,
    setCustomSequence,
    animationMode,
    setAnimationMode,
    setAnimationIndex,
    createPlaylist
}) => {
    
    const handleAnimationToggle = () => {
        if (animationMode === 'play') {
          setAnimationMode('off');
        } else {
          setAnimationIndex(0);
          setAnimationMode('play');
        }
    };

    const handleWatchCustomSequence = (type: PlaylistType) => {
        const chapterIds = (customSequence.match(/\d+/g) || [])
          .map(s => parseInt(s, 10))
          .filter(n => !isNaN(n) && n >= 1 && n <= TOTAL_SLICES);
        createPlaylist(type, chapterIds);
    };

    const handlePresetClick = (preset: string) => {
      setAnimationMode('off');
      setAnimationIndex(0);

      if (preset === '0') {
          setCustomSequence('');
      } else {
          setCustomSequence(PRESET_SEQUENCES[preset] || '');
      }
  };

    return (
        <div className="pt-2">
            <label htmlFor="custom-sequence" className="font-semibold text-gray-200 text-sm">
                Custom Animation Sequence (Q/E to step)
            </label>
            <div className="flex items-center space-x-2 mt-2">
                <input
                    id="custom-sequence"
                    type="text"
                    value={customSequence}
                    onChange={(e) => {
                        setCustomSequence(e.target.value);
                        setAnimationMode('off');
                        setAnimationIndex(0);
                    }}
                    placeholder="e.g., 23, 114, 1, 77"
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
                    disabled={animationMode !== 'off'}
                />
                <button
                    onClick={handleAnimationToggle}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-2 rounded transition-colors duration-200 flex-shrink-0 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    aria-label={animationMode === 'play' ? 'Pause animation' : 'Play animation'}
                    disabled={!customSequence.trim()}
                >
                  {animationMode === 'play' ? <PauseButtonIcon /> : <PlayButtonIcon />}
                </button>
                <PlaylistButtons onWatch={handleWatchCustomSequence} disabled={!customSequence.trim()} />
            </div>
            <div className="flex items-center justify-between mt-2.5 space-x-1">
              {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '∞', 'eye'].map((preset) => (
                  <button
                      key={preset}
                      onClick={() => handlePresetClick(preset)}
                      className="flex-1 text-xs font-mono py-1 px-2 bg-gray-700/50 hover:bg-cyan-700/50 text-gray-300 hover:text-white rounded-md transition-colors duration-150 flex items-center justify-center"
                      title={
                        preset === '0' ? 'Reset sequence' : 
                        preset === '∞' ? 'Load infinite loop sequence' : 
                        preset === 'eye' ? 'Load eye pattern sequence' :
                        `Load preset sequence ${preset}`
                      }
                      aria-label={
                        preset === '0' ? 'Reset custom animation sequence' : 
                        preset === '∞' ? 'Load infinite loop animation sequence' :
                        preset === 'eye' ? 'Load eye pattern animation sequence' : 
                        `Load preset animation sequence ${preset}`
                      }
                  >
                      {preset === '∞' ? <span className="text-lg leading-none">∞</span> : preset === 'eye' ? <EyeIconSimple /> : preset}
                  </button>
              ))}
            </div>
        </div>
    );
};

export default CustomAnimationControls;