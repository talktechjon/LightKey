import React, { useState, useRef } from 'react';

type LocalTranslationData = Record<string, Record<string, string>> | null;

interface SettingsPanelProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  mode: 'online' | 'local';
  setMode: (mode: 'online' | 'local') => void;
  onFileLoad: (data: LocalTranslationData, fileName: string) => void;
  fileName: string | null;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isVisible, setIsVisible, mode, setMode, onFileLoad, fileName }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File could not be read.");
        const data = JSON.parse(text);
        
        // Basic validation of the JSON structure
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error("Invalid format: JSON must be an object of Surahs.");
        }
        for (const surahKey in data) {
            if (typeof data[surahKey] !== 'object' || data[surahKey] === null || Array.isArray(data[surahKey])) {
                 throw new Error(`Invalid format in Surah ${surahKey}: Value must be an object of Ayahs.`);
            }
        }
        
        onFileLoad(data, file.name);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse JSON file.");
        onFileLoad(null, ''); // Clear existing data on error
      }
    };
    reader.onerror = () => {
      setError("Error reading file.");
      onFileLoad(null, '');
    };
    reader.readAsText(file);
  };

  const handleModeToggle = () => {
    const newMode = mode === 'online' ? 'local' : 'online';
    setMode(newMode);
  };
  
  if (!isVisible) return null;

  return (
    <div className="w-80 bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col mt-2">
      <div className="flex justify-between items-center p-3 border-b border-cyan-500/20">
        <h3 className="font-semibold text-cyan-300">Translation Settings</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white" aria-label="Close Settings">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="p-4 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <label htmlFor="mode-toggle" className="text-gray-300">Translation Source</label>
          <button 
            id="mode-toggle"
            onClick={handleModeToggle} 
            className="px-3 py-1 rounded-md text-xs font-medium transition-colors"
            style={{
                backgroundColor: mode === 'online' ? '#0891b2' : '#4b5563',
                color: 'white'
            }}
            aria-live="polite"
          >
            {mode === 'online' ? 'Online' : 'Local File'}
          </button>
        </div>
        
        {mode === 'local' && (
          <div className="pt-2 border-t border-cyan-500/20">
            <p className="text-gray-400 mb-2">Load your custom translation file.</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload custom translation JSON file"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gray-700 hover:bg-cyan-700/50 text-gray-300 hover:text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
                Choose File
            </button>
            {fileName && (
                <p className="text-emerald-400 mt-2 text-xs truncate">Loaded: {fileName}</p>
            )}
            {error && (
                <p className="text-red-400 mt-2 text-xs">{error}</p>
            )}
            <div className="mt-4 text-xs text-gray-500">
                <p className="font-semibold">Required JSON format:</p>
                <pre className="mt-1 p-2 bg-gray-800/50 rounded-md overflow-x-auto">
{`{
  "1": {
    "1": "Translation for 1:1",
    "2": "Translation for 1:2"
  },
  "112": { ... }
}`}
                </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
