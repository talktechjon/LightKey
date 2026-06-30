
import React, { useState, useRef, useMemo } from 'react';
import { DownloadIcon } from './Icons.tsx';
import { LocalTranslationData, TranslationMode } from '../types.ts';

interface SettingsPanelProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  mode: TranslationMode;
  setMode: (mode: TranslationMode) => void;
  onFileLoad: (data: LocalTranslationData, fileName: string) => void;
  fileName: string | null;
  playYoutubeInternally: boolean;
  setPlayYoutubeInternally: (value: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isVisible, setIsVisible, mode, setMode, onFileLoad, fileName, playYoutubeInternally, setPlayYoutubeInternally }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate the download URL dynamically to ensure it works in all environments
  const templateDownloadUrl = useMemo(() => {
      const templateData = {
          "1:1": [
              "In the name of Allah, the Entirely Merciful, the Especially Merciful",
              "Primary Translation Example"
          ],
          "1:2": [
              "[All] praise is [due] to Allah, Lord of the worlds",
              "Secondary Translation Example"
          ],
          "112:1": ["Say, He is Allah, [who is] One", "বলুন, তিনি আল্লাহ, এক"]
      };
      const blob = new Blob([JSON.stringify(templateData, null, 2)], { type: 'application/json' });
      return URL.createObjectURL(blob);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File could not be read.");
        
        let normalizedData: Record<string, string[]> = {};

        if (file.name.endsWith('.json')) {
          const rawData = JSON.parse(text);
          if (typeof rawData !== 'object' || rawData === null || Array.isArray(rawData)) {
            throw new Error("Invalid format: JSON must be an object with 'S:A' keys.");
          }
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
        } else if (file.name.endsWith('.txt')) {
          const lines = text.split(/\r?\n/);
          for (const line of lines) {
             const trimLine = line.trim();
             if (!trimLine) continue;
             
             // First check for tab-separated format (like 6236 verse.txt)
             const parts = trimLine.split('\t');
             if (parts.length >= 5) {
                 const id = parts[0].trim();
                 if (/^\d+:\d+$/.test(id)) {
                     const english = parts[4]?.trim() || "";
                     const bangla = parts[5]?.trim() || "";
                     if (english) {
                         normalizedData[id] = [english, bangla];
                         continue;
                     }
                 }
             }
             
             // Fallback to older '-' separated format
             const match = trimLine.match(/^(\d+:\d+)\s+(.+)$/);
             if (match) {
                 const id = match[1];
                 const content = match[2];
                 const dashParts = content.split(' - ');
                 
                 let englishStartIndex = -1;
                 for (let i = 0; i < dashParts.length; i++) {
                    if (!/[\u0600-\u06FF]/.test(dashParts[i])) {
                       englishStartIndex = i;
                       break;
                    }
                 }
                 
                 let englishText = "";
                 if (englishStartIndex !== -1) {
                    englishText = dashParts.slice(englishStartIndex).join(' - ').trim();
                 } else {
                    englishText = dashParts[dashParts.length - 1].trim();
                 }
                 
                 if (englishText) {
                     normalizedData[id] = [englishText];
                 }
             }
          }
          
          if (Object.keys(normalizedData).length === 0) {
              throw new Error("No valid Surah:Ayah formats found in the text file.");
          }
        } else {
          throw new Error("Unsupported file type. Please upload a .json or .txt file.");
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

  const isOnlineActive = mode === 'online' || mode === 'both';
  const isLocalActive = mode === 'local' || mode === 'both';

  const handleOnlineToggle = () => {
    let nextMode: TranslationMode;
    if (isOnlineActive) {
      nextMode = isLocalActive ? 'local' : 'none';
    } else {
      nextMode = isLocalActive ? 'both' : 'online';
    }
    setMode(nextMode);
  };

  const handleLocalToggle = () => {
    let nextMode: TranslationMode;
    if (isLocalActive) {
      nextMode = isOnlineActive ? 'online' : 'none';
    } else {
      nextMode = isOnlineActive ? 'both' : 'local';
    }
    setMode(nextMode);
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
          <label className="text-gray-300">Translation Source</label>
          <div className="flex space-x-2">
            <button
              onClick={handleOnlineToggle}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors border ${
                isOnlineActive 
                  ? 'bg-cyan-600 text-white border-cyan-400/40' 
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
              }`}
            >
              Online
            </button>
            <button
              onClick={handleLocalToggle}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors border ${
                isLocalActive 
                  ? 'bg-cyan-600 text-white border-cyan-400/40' 
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
              }`}
            >
              Local File
            </button>
          </div>
        </div>
        
        {isLocalActive && (
          <div className="pt-2 border-t border-cyan-500/20">
            <p className="text-gray-400 mb-2">Load your custom translation file.</p>
             <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.txt"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload custom translation JSON or TXT file"
              />
              <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-700 hover:bg-cyan-700/50 text-gray-300 hover:text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
              >
                  Choose File
              </button>
              <a
                href={templateDownloadUrl}
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
                <p className="font-semibold text-gray-400 mb-1">Supported Formats:</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-cyan-500/80 mb-1">1. Text File (.txt):</p>
                    <p className="text-[10px] leading-relaxed mb-1">Must contain Surah:Ayah followed by Tab and English, then Bangla (tab-separated):</p>
                    <pre className="p-2 bg-gray-800/50 rounded-md overflow-x-auto text-[10px] text-gray-400 border border-gray-700/50">
1:1	...	...	...	In the name of Allah...	পরম করুণাময়...
1:2	...	...	...	The praise is for Allah...	যাবতীয় প্রশংসা...
                    </pre>
                  </div>
                  <div>
                    <p className="font-medium text-cyan-500/80 mb-1">2. JSON File (.json):</p>
                    <pre className="p-2 bg-gray-800/50 rounded-md overflow-x-auto text-[10px] text-gray-400 border border-gray-700/50">
{`{
  "1:1": [
    "English translation",
    "Bangla translation"
  ]
}`}
                    </pre>
                  </div>
                </div>
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t border-cyan-500/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-gray-300 font-medium">In-App YouTube Player</label>
            <button
              onClick={() => setPlayYoutubeInternally(!playYoutubeInternally)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                playYoutubeInternally ? 'bg-cyan-500' : 'bg-gray-700'
              }`}
              aria-label="Toggle in-app YouTube player"
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  playYoutubeInternally ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-500 leading-tight">
            Enable to watch playlists in a floating player within the app. Disable to open in a new tab or the YouTube app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
