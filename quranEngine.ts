export interface EngineWord {
  T: string; // translit
  e?: string; // english
  r?: string; // root
}

export interface EngineTopology {
  C?: string; // carrier
  u?: string; // trust
  S?: string; // state
  A?: string; // river_a
  B?: string; // river_b
  p?: string; // phase
  g?: string; // grip
  n?: string; // note
}

export interface EngineLink {
  r: string; // ref
  s: number; // score
}

export interface EngineVerse {
  r: string; // ref (e.g. "1:1")
  c: number; // chapter
  v: number; // verse
  a: string; // arabic
  w: EngineWord[]; // words
  R: string[]; // unique roots in verse
  t: string[]; // tag IDs
  T?: EngineTopology; // topology
  l?: EngineLink[]; // top links
}

export interface EngineRoot {
  n: number; // count
  C: number; // chapters count
  m: string; // invariant meaning
  y: string; // category
}

export interface EngineTag {
  d: string; // description
  o: string; // color
  f: string[]; // verse refs
}

export interface EnginePattern {
  i: string; // id
  N: string; // name
  n: string; // note
  f: string[]; // refs
}

export interface QuranEngineData {
  metadata: {
    schema_version: string;
    source: string;
    generated_at: string;
    counts: {
      chapters: number;
      verses: number;
      roots: number;
      tags: number;
      top_links_per_verse: number;
    };
  };
  roots: Record<string, EngineRoot>;
  patterns: Record<string, EnginePattern>;
  tags: Record<string, EngineTag>;
  verses: EngineVerse[];
}

let engineInstance: QuranEngineData | null = null;
let loadingPromise: Promise<QuranEngineData> | null = null;

/**
 * Loads the quran engine JSON file from the public directory.
 * This is loaded on-demand to keep the initial JS bundle size small.
 */
export const loadQuranEngine = async (): Promise<QuranEngineData> => {
  if (engineInstance) return engineInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = fetch('/quran_engine_compact.json')
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch Quran engine: ${res.statusText}`);
      }
      const data = await res.json() as QuranEngineData;
      engineInstance = data;
      return data;
    })
    .catch((err) => {
      loadingPromise = null; // Reset on error to allow retrying
      console.error("Error loading Quran Engine:", err);
      throw err;
    });

  return loadingPromise;
};

/**
 * Gets the Quran engine data if it is already loaded, otherwise returns null.
 */
export const getLoadedEngine = (): QuranEngineData | null => {
  return engineInstance;
};

/**
 * Finds a verse by its reference string (e.g., "1:1" or "24:35").
 */
export const getEngineVerseByRef = (verses: EngineVerse[], ref: string): EngineVerse | undefined => {
  return verses.find(v => v.r === ref);
};

/**
 * Finds all verses that contain a given root.
 */
export const getVersesByRoot = (verses: EngineVerse[], rootKey: string): EngineVerse[] => {
  return verses.filter(v => v.R && v.R.includes(rootKey));
};
