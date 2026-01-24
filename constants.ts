import type { SliceData, TriangleDefinition, ChapterDetails, IconData, SecretIconData } from './types.ts';

export const TOTAL_SLICES = 114;
export const TOTAL_VERSES = 6236;

export const SIZES = {
  width: 900,
  height: 900,
  dialRadius: 60,
  layer1InnerRadius: 205,
  layer1OuterRadius: 305,
  layer2InnerRadius: 330,
  layer2OuterRadius: 440,
};

export const COLORS = {
  triangle1: '#FF00FF',
  triangle2: '#00FFFF',
};

export const MAKKI_ICON_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🕋%3C/text%3E%3C/svg%3E";
export const MADANI_ICON_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central' fill='white'%3E𓂀%3C/text%3E%3C/svg%3E";

export const MUQATTAT_CHAPTERS: Set<number> = new Set([2, 3, 7, 10, 11, 12, 13, 14, 15, 19, 20, 26, 27, 28, 29, 30, 31, 32, 36, 38, 40, 41, 42, 43, 44, 45, 46, 50, 68]);

export const MUQATTAT_LETTERS: Map<number, string[]> = new Map([
    [2, ['الم']], 
    [3, ['الم']], 
    [7, ['المص']], 
    [10, ['الر']], 
    [11, ['الر']], 
    [12, ['الر']], 
    [13, ['المر']], 
    [14, ['الر']], 
    [15, ['الر']], 
    [19, ['كهيعص']], 
    [20, ['طه']], 
    [26, ['طسم']], 
    [27, ['طس']], 
    [28, ['طسم']], 
    [29, ['الم']], 
    [30, ['الم']], 
    [31, ['الم']], 
    [32, ['الم']], 
    [36, ['يس']], 
    [38, ['ص']], 
    [40, ['حم']], 
    [41, ['حم']], 
    [42, ['حم', 'عسق']], 
    [43, ['حم']], 
    [44, ['حم']], 
    [45, ['حم']], 
    [46, ['حم']], 
    [50, ['ق']], 
    [68, ['ن']],
]);

export const BUBBLE_BLOCK_MAPPING_RAW = {
    1:7, 2:286, 3:200, 4:176, 5:120, 6:165, 7:206, 8:75, 9:129, 10:109, 11:123, 12:111, 13:43, 14:52, 15:99, 16:128, 17:111, 18:110, 19:98, 20:135, 21:112, 22:78, 23:118, 24:64, 25:77, 26:227, 27:93, 28:88, 29:69, 30:60, 31:34, 32:30, 33:73, 34:54, 35:45, 36:83, 37:182, 38:88, 39:75, 40:85, 41:54, 42:53, 43:89, 44:59, 45:37, 46:35, 47:38, 48:29, 49:18, 50:45, 51:60, 52:49, 53:62, 54:55, 55:78, 56:96, 57:29, 58:22, 59:24, 60:13, 61:14, 62:11, 63:11, 64:18, 65:12, 66:12, 67:30, 68:52, 69:52, 70:44, 71:28, 72:28, 73:20, 74:56, 75:40, 76:31, 77:50, 78:40, 79:46, 80:42, 81:29, 82:19, 83:36, 84:25, 85:22, 86:17, 87:19, 88:26, 89:30, 90:20, 91:15, 92:21, 93:11, 94:8, 95:8, 96:19, 97:5, 98:8, 99:8, 100:11, 101:11, 102:8, 103:3, 104:9, 105:5, 106:4, 107:7, 108:3, 109:6, 110:3, 111:5, 112:4, 113:5, 114:6
};

export const CUMULATIVE_VERSES: number[] = [0];
for (let i = 1; i <= 114; i++) {
    CUMULATIVE_VERSES[i] = CUMULATIVE_VERSES[i - 1] + (BUBBLE_BLOCK_MAPPING_RAW[i as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0);
}

export const SLICE_DATA: SliceData[] = Array.from({ length: TOTAL_SLICES }, (_, i) => ({ id: i + 1, blockCount: BUBBLE_BLOCK_MAPPING_RAW[(i + 1) as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0 }));

export const TRIANGLE_POINTS: TriangleDefinition[] = [
    { name: 'Upward Triangle', color: COLORS.triangle2, points: [{ type: '🐟 3 Kingdom', value: 57 }, { type: '6 Heaven 🐄', value: 95 }, { type: '9 Photosynthesis 🔆', value: 19 }] },
    { name: 'Downward Triangle', color: COLORS.triangle1, points: [{ type: '🌴 3 Rahim', value: 1 }, { type: '6 Rahman 🌋', value: 39 }, { type: '9 Razim 🔥', value: 77 }] }
];

// Order changed to: Rahim(1) -> Rahman(39) -> Razim(77) -> Photosynthesis(19) -> Heaven(95) -> Kingdom(57)
export const CENTRAL_GEOMETRY_POINTS = [
  1,   // 3 Rahim
  39,  // 6 Rahman
  77,  // 9 Razim
  19,  // 9 Photosynthesis
  95,  // 6 Heaven
  57   // 3 Kingdom
];

export const ICON_DIAL_DATA: IconData[] = [
    { id: 'rahim', chapter: 1, emoji: '🌴', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌴%3C/text%3E%3C/svg%3E", description: '3 Rahim 🌴' },
    { id: 'rahman', chapter: 39, emoji: '🌋', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌋%3C/text%3E%3C/svg%3E", description: '6 Rahman 🌋' },
    { id: 'razim', chapter: 77, emoji: '🔥', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔥%3C/text%3E%3C/svg%3E", description: '9 Razim 🔥' },
    { id: 'kingdom', chapter: 57, emoji: '🐟', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐟%3C/text%3E%3C/svg%3E", description: '3 Kingdom 🐟' },
    { id: 'heaven', chapter: 95, emoji: '🐄', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐄%3C/text%3E%3C/svg%3E", description: '6 Heaven 🐄' },
    { id: 'photosynthesis', chapter: 19, emoji: '🔆', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔆%3C/text%3E%3C/svg%3E", description: '9 Photosynthesis 🔆' },
];

export const SECRET_EMOJI_PATTERN: SecretIconData[] = [
    { id: 'p9', position: 9, chapter: 1, emoji: '🌕', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌕%3C/text%3E%3C/svg%3E", description: 'Full Moon' },
    { id: 'p1', position: 1, chapter: 14, emoji: '🔥', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔥%3C/text%3E%3C/svg%3E", description: 'Fire' },
    { id: 'p2', position: 2, chapter: 26, emoji: '🐟', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐟%3C/text%3E%3C/svg%3E", description: 'Fish' },
    { id: 'p3', position: 3, chapter: 39, emoji: '⭐', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E⭐%3C/text%3E%3C/svg%3E", description: 'Star' },
    { id: 'p4', position: 4, chapter: 52, emoji: '🌴', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌴%3C/text%3E%3C/svg%3E", description: 'Palm Tree' },
    { id: 'p5', position: 5, chapter: 64, emoji: '🌋', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌋%3C/text%3E%3C/svg%3E", description: 'Volcano' },
    { id: 'p6', position: 6, chapter: 77, emoji: '🌍', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌍%3C/text%3E%3C/svg%3E", description: 'Earth' },
    { id: 'p7', position: 7, chapter: 90, emoji: '🐄', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐄%3C/text%3E%3C/svg%3E", description: 'Cow' },
    { id: 'p8', position: 8, chapter: 102, emoji: '⚡', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E⚡%3C/text%3E%3C/svg%3E", description: 'Lightning' },
];

export const KATHARA_CLOCK_POINTS = [1, 11, 20, 30, 39, 49, 58, 68, 77, 87, 96, 106];

export const KATHARA_GRID_NODES = [
  { id: 1,  x: 75, y: 260, r: 9, color: '#dc2626' }, { id: 2,  x: 75, y: 230, r: 9, color: '#f97316' }, { id: 3,  x: 30, y: 200, r: 9, color: '#facc15' }, { id: 4,  x: 120, y: 200, r: 9, color: '#4ade80' }, { id: 5,  x: 75, y: 170, r: 9, color: '#3b82f6' }, { id: 6,  x: 30, y: 140,  r: 9, color: '#8b5cf6' }, { id: 7,  x: 120, y: 140,  r: 9, color: '#a855f7' }, { id: 8,  x: 75, y: 110,  r: 9, color: '#eab308' }, { id: 9,  x: 30, y: 80,  r: 9, color: '#a1a1aa' }, { id: 10, x: 120, y: 80,  r: 9, color: '#1e3a8a' }, { id: 11, x: 75, y: 50,  r: 9, color: '#404040' }, { id: 12, x: 75, y: 20,  r: 9, color: '#f5f5f5' }, { id: 13, x: 75, y: 200, r: 8, color: '#06b6d4', shape: 'volcano' }, { id: 14, x: 75, y: 140, r: 8, color: '#f97316', shape: 'fish' }, { id: 15, x: 75, y: 80, r: 8, color: '#15803d', shape: 'palm' },
];

export const KATHARA_GRID_LINES = [
  { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 13 }, { from: 13, to: 5 }, { from: 3, to: 13 }, { from: 4, to: 13 }, { from: 3, to: 5 }, { from: 3, to: 6 }, { from: 4, to: 5 }, { from: 4, to: 7 }, { from: 5, to: 6 }, { from: 5, to: 7 }, { from: 5, to: 14 }, { from: 14, to: 8 }, { from: 6, to: 14 }, { from: 7, to: 14 }, { from: 6, to: 8 }, { from: 6, to: 9 }, { from: 7, to: 8 }, { from: 7, to: 10 }, { from: 8, to: 15 }, { from: 15, to: 11 }, { from: 9, to: 15 }, { from: 10, to: 15 }, { from: 8, to: 9 }, { from: 8, to: 10 }, { from: 9, to: 11 }, { from: 9, to: 12 }, { from: 10, to: 11 }, { from: 10, to: 12 }, { from: 11, to: 12 },
];

export const SEPHIROT_BASE_POINTS = [1, 12, 24, 35, 47, 58, 70, 81, 93, 104];

export const ZAKKUM_CONFIG = {
    points: [57, 56, 55, 54, 53, 52, 51, 50, 49], point0: 48,
    nodes: [{ id: 1, label: 'Denial', x: 100, y: 30, color: '#fca5a5' }, { id: 2, label: 'Whisper', x: 170, y: 70, color: '#fdba74' }, { id: 3, label: 'Conjecture', x: 30, y: 70, color: '#93c5fd' }, { id: 4, label: 'Disobedient', x: 170, y: 130, color: '#ef4444' }, { id: 5, label: 'Transgress', x: 30, y: 130, color: '#f87171' }, { id: 6, label: 'Fire', x: 100, y: 180, color: '#f97316' }, { id: 7, label: 'Falsehood', x: 170, y: 230, color: '#c084fc' }, { id: 8, label: 'Collapse', x: 30, y: 230, color: '#a8a29e' }, { id: 9, label: 'Fall', x: 100, y: 260, color: '#86efac' }, { id: 0, label: 'Nothingness', x: 100, y: 100, color: '#fb7185', isZero: true }],
    lines: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 0 }, { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 0 }, { from: 3, to: 5 }, { from: 3, to: 0 }, { from: 6, to: 0 }, { from: 4, to: 5 }, { from: 4, to: 6 }, { from: 4, to: 7 }, { from: 5, to: 6 }, { from: 5, to: 8 }, { from: 6, to: 7 }, { from: 6, to: 8 }, { from: 6, to: 9 }, { from: 7, to: 8 }, { from: 7, to: 9 }, { from: 8, to: 9 }]
};

export const DATE_PALM_CONFIG = {
    points: SEPHIROT_BASE_POINTS, point0: null,
    nodes: [{ id: 1, label: 'Light', x: 100, y: 30, color: '#FFFFFF' }, { id: 2, label: 'Mercy', x: 170, y: 70, color: '#22d3ee' }, { id: 3, label: 'Earth', x: 30, y: 70, color: '#facc15' }, { id: 4, label: 'Root', x: 170, y: 130, color: '#854d0e' }, { id: 5, label: 'Branch', x: 30, y: 130, color: '#22c55e' }, { id: 6, label: 'Repentance', x: 100, y: 180, color: '#3b82f6' }, { id: 7, label: 'Kingdom', x: 170, y: 230, color: '#a855f7' }, { id: 8, label: 'Sacrifice', x: 30, y: 230, color: '#ef4444' }, { id: 9, label: 'Return', x: 100, y: 260, color: '#8b5cf6' }, { id: 10, label: 'Ascension', x: 100, y: 310, color: '#f59e0b' }, { id: 0, label: 'Emergence', x: 100, y: 100, color: '#9ca3af', isZero: true, stroke: '#4b5563' }],
    lines: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 0 }, { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 0 }, { from: 3, to: 5 }, { from: 3, to: 0 }, { from: 6, to: 0 }, { from: 4, to: 5 }, { from: 4, to: 6 }, { from: 4, to: 7 }, { from: 5, to: 6 }, { from: 5, to: 8 }, { from: 6, to: 7 }, { from: 6, to: 8 }, { from: 6, to: 9 }, { from: 7, to: 8 }, { from: 7, to: 9 }, { from: 8, to: 9 }, { from: 9, to: 10 }]
};

export const CHAPTER_DETAILS: ChapterDetails[] = [
    { number: 1, englishName: 'Key to Light', transliteration: 'Al-Fātiḥah', arabicName: 'الفاتحة', revelationType: 'Makki', juz: '1' },
    { number: 2, englishName: 'Servant Lineage', transliteration: 'Al-Baqarah', arabicName: 'البقرة', revelationType: 'Madani', juz: '1-3' },
    { number: 3, englishName: 'Chrysalis', transliteration: 'Āl-ʿImrān', arabicName: 'آل عمران', revelationType: 'Madani', juz: '3-4' },
    { number: 4, englishName: 'The Womb-Lineage', transliteration: 'An-Nisāʾ', arabicName: 'النساء', revelationType: 'Madani', juz: '4-6' },
    { number: 5, englishName: 'The Offering', transliteration: 'Al-Māʾidah', arabicName: 'المائدة', revelationType: 'Madani', juz: '6-7' },
    { number: 6, englishName: 'The Purity', transliteration: 'Al-Anʿām', arabicName: 'الأنعام', revelationType: 'Makki', juz: '7-8' },
    { number: 7, englishName: 'The Higher Ground', transliteration: 'Al-Aʿrāf', arabicName: 'الأعراف', revelationType: 'Makki', juz: '8-9' },
    { number: 8, englishName: 'The Consequence', transliteration: 'Al-Anfāl', arabicName: 'الأنفال', revelationType: 'Madani', juz: '9-10' },
    { number: 9, englishName: 'The Repentance (Balance)', transliteration: 'Barāʾah', arabicName: 'التوبة', revelationType: 'Madani', juz: '10-11' },
    { number: 10, englishName: 'The Silence', transliteration: 'Yūnus', arabicName: 'يونس', revelationType: 'Makki', juz: '11' },
    { number: 11, englishName: 'The Purified One', transliteration: 'Hūd', arabicName: 'هود', revelationType: 'Makki', juz: '11-12' },
    { number: 12, englishName: 'Third Eye (Rushd)', transliteration: 'Yūsuf', arabicName: 'يوسف', revelationType: 'Makki', juz: '12-13' },
    { number: 13, englishName: 'Charged Light', transliteration: 'Ar-Raʿd', arabicName: 'الرعد', revelationType: 'Madani', juz: '13' },
    { number: 14, englishName: 'Tree', transliteration: 'Ibrāhīm', arabicName: 'إبراهيم', revelationType: 'Makki', juz: '13' },
    { number: 15, englishName: 'Stone of Return', transliteration: 'Al-Ḥijr', arabicName: 'الحجر', revelationType: 'Makki', juz: '14' },
    { number: 16, englishName: "Queen's Loyalty", transliteration: 'An-Naḥl', arabicName: 'النحل', revelationType: 'Makki', juz: '14' },
    { number: 17, englishName: 'Ascension', transliteration: 'Banī Isrāʾīl', arabicName: 'الإسراء', revelationType: 'Makki', juz: '15' },
    { number: 18, englishName: 'Remember The Cave', transliteration: 'Al-Kahf', arabicName: 'الكهফ', revelationType: 'Makki', juz: '15-16' },
    { number: 19, englishName: 'Photosynthesis', transliteration: 'Maryam', arabicName: 'مريم', revelationType: 'Makki', juz: '16' },
    { number: 20, englishName: 'Chosen', transliteration: 'Ṭā Hā', arabicName: 'طه', revelationType: 'Makki', juz: '16' },
    { number: 21, englishName: 'Guide on Water', transliteration: 'Al-Anbiyāʾ', arabicName: 'الأنبياء', revelationType: 'Makki', juz: '17' },
    { number: 22, englishName: 'Pilgrimage', transliteration: 'Al-Ḥajj', arabicName: 'الحج', revelationType: 'Madani', juz: '17' },
    { number: 23, englishName: 'Believer', transliteration: 'Al-Muʾminūn', arabicName: 'المؤمنون', revelationType: 'Makki', juz: '18' },
    { number: 24, englishName: 'Light (Ayat-Hayat-Haq)', transliteration: 'An-Nūr', arabicName: 'النور', revelationType: 'Madani', juz: '18' },
    { number: 25, englishName: 'Separator', transliteration: 'Al-Furqān', arabicName: 'الفرقان', revelationType: 'Makki', juz: '18-19' },
    { number: 26, englishName: 'The Warners', transliteration: 'Ash-Shuʿarāʾ', arabicName: 'الشعراء', revelationType: 'Makki', juz: '19' },
    { number: 27, englishName: 'Fearing Servants', transliteration: 'An-Naml', arabicName: 'النمل', revelationType: 'Makki', juz: '19-20' },
    { number: 28, englishName: 'Stories', transliteration: 'Al-Qaṣaṣ', arabicName: 'القصص', revelationType: 'Makki', juz: '20' },
    { number: 29, englishName: 'Fragile House', transliteration: 'Al-ʿAnkabūt', arabicName: 'العنكبوت', revelationType: 'Makki', juz: '20-21' },
    { number: 30, englishName: 'Promise', transliteration: 'Ar-Rūm', arabicName: 'الروم', revelationType: 'Makki', juz: '21' },
    { number: 31, englishName: 'Guidance', transliteration: 'Luqmān', arabicName: 'لقمان', revelationType: 'Makki', juz: '21' },
    { number: 32, englishName: 'Submission', transliteration: 'As-Sajdah', arabicName: 'السجدة', revelationType: 'Makki', juz: '21' },
    { number: 33, englishName: 'The Challenge', transliteration: 'Al-Aḥzāb', arabicName: 'الأحزاب', revelationType: 'Madani', juz: '21-22' },
    { number: 34, englishName: 'Choice of Truth', transliteration: 'Sabaʾ', arabicName: 'سبأ', revelationType: 'Makki', juz: '22' },
    { number: 35, englishName: 'Initiator', transliteration: 'Fāṭir', arabicName: 'فاطر', revelationType: 'Makki', juz: '22' },
    { number: 36, englishName: 'The Messengers', transliteration: 'Yā-Sīn', arabicName: 'يس', revelationType: 'Makki', juz: '22-23' },
    { number: 37, englishName: 'The Hosts', transliteration: 'As-Ṣāffāt', arabicName: 'الصافات', revelationType: 'Makki', juz: '23' },
    { number: 38, englishName: 'Endurance', transliteration: 'Ṣād', arabicName: 'ص', revelationType: 'Makki', juz: '23' },
    { number: 39, englishName: 'Faith Community', transliteration: 'Az-Zumar', arabicName: 'الزمر', revelationType: 'Makki', juz: '23-24' },
    { number: 40, englishName: 'Forgiver', transliteration: 'Ghāfir', arabicName: 'غافر', revelationType: 'Makki', juz: '24' },
    { number: 41, englishName: 'Detangler', transliteration: 'Fuṣṣilat', arabicName: 'فصلت', revelationType: 'Makki', juz: '24-25' },
    { number: 42, englishName: 'Consultation', transliteration: 'Ash-Shūrā', arabicName: 'الشورى', revelationType: 'Makki', juz: '25' },
    { number: 43, englishName: 'Kneeling Nations', transliteration: 'Az-Zukhruf', arabicName: 'الزخرف', revelationType: 'Makki', juz: '25' },
    { number: 44, englishName: 'Smoke', transliteration: 'Ad-Dukhān', arabicName: 'الدخان', revelationType: 'Makki', juz: '25' },
    { number: 45, englishName: 'She That Kneels', transliteration: 'Al-Jāthiyah', arabicName: 'الجاثية', revelationType: 'Makki', juz: '25' },
    { number: 46, englishName: 'Shifting Sands', transliteration: 'Al-Aḥqāf', arabicName: 'الأحقاف', revelationType: 'Makki', juz: '26' },
    { number: 47, englishName: 'Self-Reflection', transliteration: 'Muḥammad', arabicName: 'محمد', revelationType: 'Madani', juz: '26' },
    { number: 48, englishName: 'The Fulfillment', transliteration: 'Al-Fatḥ', arabicName: 'الفتح', revelationType: 'Madani', juz: '26' },
    { number: 49, englishName: 'Inner Order', transliteration: 'Al-Ḥujurāt', arabicName: 'الحجرات', revelationType: 'Madani', juz: '26' },
    { number: 50, englishName: 'Knowledge', transliteration: 'Qāf', arabicName: 'ق', revelationType: 'Makki', juz: '26' },
    { number: 51, englishName: 'Explosion of Truth', transliteration: 'Adh-Dhāriyāt', arabicName: 'الذاريات', revelationType: 'Makki', juz: '26-27' },
    { number: 52, englishName: 'Promise On Mountain', transliteration: 'Aṭ-Ṭūr', arabicName: 'الطور', revelationType: 'Makki', juz: '27' },
    { number: 53, englishName: 'The Star', transliteration: 'An-Najm', arabicName: 'النجم', revelationType: 'Makki', juz: '27' },
    { number: 54, englishName: 'The Moon', transliteration: 'Al-Qamar', arabicName: 'القمر', revelationType: 'Makki', juz: '27' },
    { number: 55, englishName: 'Most Gracious', transliteration: 'Ar-Raḥmān', arabicName: 'الرحمن', revelationType: 'Madani', juz: '27' },
    { number: 56, englishName: 'The Certainty', transliteration: 'Al-Wāqiʿah', arabicName: 'الواقعة', revelationType: 'Makki', juz: '27' },
    { number: 57, englishName: 'Blessing of Authority', transliteration: 'Al-Ḥadīd', arabicName: 'الحديد', revelationType: 'Madani', juz: '27' },
    { number: 58, englishName: 'Who Disputes', transliteration: 'Al-Mujādalah', arabicName: 'المجادلة', revelationType: 'Madani', juz: '28' },
    { number: 59, englishName: 'The Banishment', transliteration: 'Al-Ḥashr', arabicName: 'الحشر', revelationType: 'Madani', juz: '28' },
    { number: 60, englishName: 'The Trial', transliteration: 'Al-Mumtaḥanah', arabicName: 'المমتحنة', revelationType: 'Madani', juz: '28' },
    { number: 61, englishName: 'The Rank', transliteration: 'As-Ṣaff', arabicName: 'الصف', revelationType: 'Madani', juz: '28' },
    { number: 62, englishName: 'The Assembly', transliteration: 'Al-Jumuʿah', arabicName: 'الجمعة', revelationType: 'Madani', juz: '28' },
    { number: 63, englishName: 'The Hypocrites', transliteration: 'Al-Munāfiqūn', arabicName: 'المنافقون', revelationType: 'Madani', juz: '28' },
    { number: 64, englishName: 'Mutual Blaming', transliteration: 'At-Taghābun', arabicName: 'التغابন', revelationType: 'Madani', juz: '28' },
    { number: 65, englishName: 'The Divorce', transliteration: 'Aṭ-Ṭalāq', arabicName: 'الطلاق', revelationType: 'Madani', juz: '28' },
    { number: 66, englishName: 'The Restriction', transliteration: 'At-Taḥrīm', arabicName: 'التحريم', revelationType: 'Madani', juz: '28' },
    { number: 67, englishName: 'The Sovereignty', transliteration: 'Al-Mulk', arabicName: 'الملك', revelationType: 'Makki', juz: '29' },
    { number: 68, englishName: 'The Decree', transliteration: 'Al-Qalam', arabicName: 'القلم', revelationType: 'Makki', juz: '29' },
    { number: 69, englishName: 'Truth Manifested', transliteration: 'Al-Ḥāqqah', arabicName: 'الحاقة', revelationType: 'Makki', juz: '29' },
    { number: 70, englishName: 'The Glory', transliteration: 'Al-Maʿārij', arabicName: 'المعارج', revelationType: 'Makki', juz: '29' },
    { number: 71, englishName: 'Womb on Water', transliteration: 'Nūḥ', arabicName: 'নোয়াহ', revelationType: 'Makki', juz: '29' },
    { number: 72, englishName: 'Transgressors', transliteration: 'Al-Jinn', arabicName: 'الجن', revelationType: 'Makki', juz: '29' },
    { number: 73, englishName: 'The Covered One', transliteration: 'Al-Muzzammil', arabicName: 'المজম্মীল', revelationType: 'Makki', juz: '29' },
    { number: 74, englishName: 'The Secret One', transliteration: 'Al-Muddaththir', arabicName: 'المدثر', revelationType: 'Makki', juz: '29' },
    { number: 75, englishName: 'Raised Alive', transliteration: 'Al-Qiyāmah', arabicName: 'القيامة', revelationType: 'Makki', juz: '29' },
    { number: 76, englishName: 'The Righteous Man', transliteration: 'Al-Insān', arabicName: 'الإنسان', revelationType: 'Madani', juz: '29' },
    { number: 77, englishName: 'The Agents', transliteration: 'Al-Mursalāt', arabicName: 'মারসালাত', revelationType: 'Makki', juz: '29' },
    { number: 78, englishName: 'The Event', transliteration: 'An-Nabaʾ', arabicName: 'النبأ', revelationType: 'Makki', juz: '30' },
    { number: 79, englishName: 'The Uprooting', transliteration: 'An-Nāziʿāt', arabicName: 'নাযিয়াত', revelationType: 'Makki', juz: '30' },
    { number: 80, englishName: 'Turning Away', transliteration: 'ʿAbasa', arabicName: 'عبস', revelationType: 'Makki', juz: '30' },
    { number: 81, englishName: 'Implosion of Action', transliteration: 'At-Takwīr', arabicName: 'التكوير', revelationType: 'Makki', juz: '30' },
    { number: 82, englishName: 'Seal of Heaven', transliteration: 'Al-Infiṭār', arabicName: 'ইনফিতার', revelationType: 'Makki', juz: '30' },
    { number: 83, englishName: 'Reductants', transliteration: 'Al-Muṭaffifīn', arabicName: 'المطففين', revelationType: 'Makki', juz: '30' },
    { number: 84, englishName: 'Quantum Threshold', transliteration: 'Al-Inshiqāq', arabicName: 'الانشقاق', revelationType: 'Makki', juz: '30' },
    { number: 85, englishName: 'Levitation of Truth', transliteration: 'Al-Burūj', arabicName: 'البروج', revelationType: 'Makki', juz: '30' },
    { number: 86, englishName: 'The Striker', transliteration: 'Aṭ-Ṭāriq', arabicName: 'الطارق', revelationType: 'Makki', juz: '30' },
    { number: 87, englishName: 'The Most High', transliteration: 'Al-Aʿlā', arabicName: 'الأعلى', revelationType: 'Makki', juz: '30' },
    { number: 88, englishName: 'The Champion', transliteration: 'Al-Ghāshiyah', arabicName: 'الغاشية', revelationType: 'Makki', juz: '30' },
    { number: 89, englishName: 'New Beginning', transliteration: 'Al-Fajr', arabicName: 'الفجر', revelationType: 'Makki', juz: '30' },
    { number: 90, englishName: 'The Center', transliteration: 'Al-Balad', arabicName: 'বিলাদ', revelationType: 'Makki', juz: '30' },
    { number: 91, englishName: 'The Sun', transliteration: 'Ash-Shams', arabicName: 'الشمس', revelationType: 'Makki', juz: '30' },
    { number: 92, englishName: 'The Covering', transliteration: 'Al-Layl', arabicName: 'الليل', revelationType: 'Makki', juz: '30' },
    { number: 93, englishName: 'Bright Light', transliteration: 'Ad-Ḍuḥā', arabicName: 'الضحى', revelationType: 'Makki', juz: '30' },
    { number: 94, englishName: 'Calmness in Fire', transliteration: 'Ash-Sharḥ', arabicName: 'الشرح', revelationType: 'Makki', juz: '30' },
    { number: 95, englishName: 'Flesh of Purity', transliteration: 'At-Tīn', arabicName: 'তীন', revelationType: 'Makki', juz: '30' },
    { number: 96, englishName: 'The Sticky Clot', transliteration: 'Al-ʿAlaq', arabicName: 'العلق', revelationType: 'Makki', juz: '30' },
    { number: 97, englishName: 'Knowledge of Signs', transliteration: 'Al-Qadr', arabicName: 'القدر', revelationType: 'Makki', juz: '30' },
    { number: 98, englishName: 'Clear Proof', transliteration: 'Al-Bayyinah', arabicName: 'البينة', revelationType: 'Madani', juz: '30' },
    { number: 99, englishName: 'Earthquake', transliteration: 'Az-Zalzalah', arabicName: 'الزلزلة', revelationType: 'Madani', juz: '30' },
    { number: 100, englishName: 'The Chargers', transliteration: 'Al-ʿĀdiyāt', arabicName: 'العاديات', revelationType: 'Makki', juz: '30' },
    { number: 101, englishName: 'The Recompense', transliteration: 'Al-Qāriʿah', arabicName: 'القارعة', revelationType: 'Makki', juz: '30' },
    { number: 102, englishName: 'Delusional Race', transliteration: 'At-Takāthur', arabicName: 'التكاثر', revelationType: 'Makki', juz: '30' },
    { number: 103, englishName: 'Time', transliteration: 'Al-ʿAṣr', arabicName: 'العصر', revelationType: 'Makki', juz: '30' },
    { number: 104, englishName: 'The Defamer', transliteration: 'Al-Humazah', arabicName: 'الهمزة', revelationType: 'Makki', juz: '30' },
    { number: 105, englishName: 'Might of Ignorance', transliteration: 'Al-Fīl', arabicName: 'ফিল', revelationType: 'Makki', juz: '30' },
    { number: 106, englishName: 'The Shark', transliteration: 'Quraysh', arabicName: 'কুরাইশ', revelationType: 'Makki', juz: '30' },
    { number: 107, englishName: 'Kindness', transliteration: 'Al-Māʿūn', arabicName: 'الماعون', revelationType: 'Makki', juz: '30' },
    { number: 108, englishName: 'Bounty', transliteration: 'Al-Kawthar', arabicName: 'কাওসার', revelationType: 'Makki', juz: '30' },
    { number: 109, englishName: 'The Disbelievers', transliteration: 'Al-Kāfirūn', arabicName: 'الكافرون', revelationType: 'Makki', juz: '30' },
    { number: 110, englishName: 'The Return', transliteration: 'An-Naṣr', arabicName: 'النصر', revelationType: 'Madani', juz: '30' },
    { number: 111, englishName: 'Fiber of Purity', transliteration: 'Al-Masad', arabicName: 'মাসাদ', revelationType: 'Makki', juz: '30' },
    { number: 112, englishName: 'The Absolute Truth', transliteration: 'Al-Ikhlāṣ', arabicName: 'الإخلاص', revelationType: 'Makki', juz: '30' },
    { number: 113, englishName: 'Malice', transliteration: 'Al-Falaq', arabicName: 'الفلق', revelationType: 'Makki', juz: '30' },
    { number: 114, englishName: 'Temptation', transliteration: 'An-Nās', arabicName: 'الناس', revelationType: 'Makki', juz: '30' }
];