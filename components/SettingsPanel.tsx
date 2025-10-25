import React, { useState, useRef } from 'react';

type LocalTranslationData = Record<string, string[]> | null;

interface SettingsPanelProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  mode: 'online' | 'local';
  setMode: (mode: 'online' | 'local') => void;
  onFileLoad: (data: LocalTranslationData, fileName: string) => void;
  fileName: string | null;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


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
        const rawData = JSON.parse(text);
        
        if (typeof rawData !== 'object' || rawData === null || Array.isArray(rawData)) {
          throw new Error("Invalid format: JSON must be an object with 'S:A' keys.");
        }
        
        const normalizedData: Record<string, string[]> = {};
        const keyRegex = /^\d+:\d+$/;

        for (const key in rawData) {
            if (!Object.prototype.hasOwnProperty.call(rawData, key)) continue;
            if (!keyRegex.test(key)) {
                throw new Error(`Invalid key format: "${key}". Must be "Surah:Ayah".`);
            }
            
            const value = rawData[key];
            if (typeof value === 'string') {
                normalizedData[key] = [value];
            } else if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
                normalizedData[key] = value;
            } else {
                throw new Error(`Invalid value for key "${key}". Must be a string or an array of strings.`);
            }
        }
        
        onFileLoad(normalizedData, file.name);

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
             <div className="flex items-center space-x-2">
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
              <a
                href="/application/quran_translation_template.json"
                download="quran_translation_template.json"
                className="flex-shrink-0 bg-gray-700 hover:bg-cyan-700/50 text-gray-300 hover:text-white font-semibold p-2 rounded transition-colors duration-200"
                title="Download translation template"
                aria-label="Download translation template"
              >
                <DownloadIcon />
              </a>
            </div>
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
  "1:1": [
    "Primary translation",
    "Secondary translation"
  ],
  "1:2": "Single translation"
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
