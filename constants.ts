
import type { SliceData, TriangleDefinition, ChapterDetails, IconData, SecretIconData } from './types.ts';

export const TOTAL_SLICES = 114;

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
  triangle1: '#FF00FF', // Magenta
  triangle2: '#00FFFF', // Cyan
};

export const MAKKI_ICON_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🕋%3C/text%3E%3C/svg%3E";
export const MADANI_ICON_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central' fill='white'%3E𓂀%3C/text%3E%3C/svg%3E";


export const MUQATTAT_CHAPTERS: Set<number> = new Set([2, 3, 7, 10, 11, 12, 13, 14, 15, 19, 20, 26, 27, 28, 29, 30, 31, 32, 36, 38, 40, 41, 42, 43, 44, 45, 46, 50, 68]);

export const MUQATTAT_LETTERS: Map<number, string[]> = new Map([
    [2, ['الٓمٓ']],
    [3, ['الٓمٓ']],
    [7, ['الٓمٓصٓ']],
    [10, ['الٓر']],
    [11, ['الٓر']],
    [12, ['الٓر']],
    [13, ['الٓمٓر']],
    [14, ['الٓر']],
    [15, ['الٓر']],
    [19, ['كٓهيعٓصٓ']],
    [20, ['طه']],
    [26, ['طسٓمٓ']],
    [27, ['طسٓ']],
    [28, ['طسٓمٓ']],
    [29, ['الٓمٓ']],
    [30, ['الٓمٓ']],
    [31, ['الٓمٓ']],
    [32, ['الٓمٓ']],
    [36, ['يسٓ']],
    [38, ['صٓ']],
    [40, ['حمٓ']],
    [41, ['حمٓ']],
    [42, ['حمٓ', 'عٓسٓقٓ']],
    [43, ['حمٓ']],
    [44, ['حمٓ']],
    [45, ['حمٓ']],
    [46, ['حمٓ']],
    [50, ['قٓ']],
    [68, ['نٓ']],
]);

const BUBBLE_BLOCK_MAPPING_RAW = {
    1:7, 2:286, 3:200, 4:176, 5:120, 6:165, 7:206, 8:75, 9:129, 10:109, 11:123, 12:111, 13:43, 14:52, 15:99, 16:128, 17:111, 18:110, 19:98, 20:135, 21:112, 22:78, 23:118, 24:64, 25:77, 26:227, 27:93, 28:88, 29:69, 30:60, 31:34, 32:30, 33:73, 34:54, 35:45, 36:83, 37:182, 38:88, 39:75, 40:85, 41:54, 42:53, 43:89, 44:59, 45:37, 46:35, 47:38, 48:29, 49:18, 50:45, 51:60, 52:49, 53:62, 54:55, 55:78, 56:96, 57:29, 58:22, 59:24, 60:13, 61:14, 62:11, 63:11, 64:18, 65:12, 66:12, 67:30, 68:52, 69:52, 70:44, 71:28, 72:28, 73:20, 74:56, 75:40, 76:31, 77:50, 78:40, 79:46, 80:42, 81:29, 82:19, 83:36, 84:25, 85:22, 86:17, 87:19, 88:26, 89:30, 90:20, 91:15, 92:21, 93:11, 94:8, 95:8, 96:19, 97:5, 98:8, 99:8, 100:11, 101:11, 102:8, 103:3, 104:9, 105:5, 106:4, 107:7, 108:3, 109:6, 110:3, 111:5, 112:4, 113:5, 114:6
};

export const SLICE_DATA: SliceData[] = Array.from({ length: TOTAL_SLICES }, (_, i) => {
    const id = i + 1;
    const blockCount = BUBBLE_BLOCK_MAPPING_RAW[id as keyof typeof BUBBLE_BLOCK_MAPPING_RAW] || 0;
    return { id, blockCount };
});

export const TRIANGLE_POINTS: TriangleDefinition[] = [
    {
        name: 'Upward Triangle',
        color: COLORS.triangle2,
        points: [
            { type: '3- Repent', value: 57 },
            { type: '6- Purify', value: 95 },
            { type: '9- Energy/Return', value: 19 },
        ]
    },
    {
        name: 'Downward Triangle',
        color: COLORS.triangle1,
        points: [
            { type: '3- Wave', value: 1 },
            { type: '6- Particle', value: 39 },
            { type: '9 Vibration/Fall', value: 77 },
        ]
    }
];

export const ICON_DIAL_DATA: IconData[] = [
    // Downward Triangle points
    { id: 'wave', chapter: 1, emoji: '🌴', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌴%3C/text%3E%3C/svg%3E", description: '3- Wave: 🌴' },
    { id: 'particle', chapter: 39, emoji: '🌋', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌋%3C/text%3E%3C/svg%3E", description: '6- Particle: 🌋' },
    { id: 'vibration', chapter: 77, emoji: '🔥', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔥%3C/text%3E%3C/svg%3E", description: '9- Vibration: 🔥' },
    // Upward Triangle points
    { id: 'repent', chapter: 57, emoji: '🐟', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐟%3C/text%3E%3C/svg%3E", description: '3- Repent: 🐟' },
    { id: 'purify', chapter: 95, emoji: '🐄', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐄%3C/text%3E%3C/svg%3E", description: '6- Purify: 🐄' },
    { id: 'energy', chapter: 19, emoji: '🔆', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔆%3C/text%3E%3C/svg%3E", description: '9- Energy: 🔆' },
];

export const SECRET_EMOJI_PATTERN: SecretIconData[] = [
    // Position 1
    { id: 'p3', position: 1, chapter: 1, emoji: '⭐', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E⭐%3C/text%3E%3C/svg%3E", description: 'Position 1: Star' },
    // Position 2
    { id: 'p1', position: 2, chapter: 14, emoji: '🌴', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌴%3C/text%3E%3C/svg%3E", description: 'Position 2: Tree' },
    // Position 3
    { id: 'p2', position: 3, chapter: 26, emoji: '🔆', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔆%3C/text%3E%3C/svg%3E", description: 'Position 3: Sun' },
    // Position 4
    { id: 'p6', position: 4, chapter: 39, emoji: '⭐', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E⭐%3C/text%3E%3C/svg%3E", description: 'Position 4: Star' },
    // Position 5
    { id: 'p4', position: 5, chapter: 52, emoji: '🔥', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔥%3C/text%3E%3C/svg%3E", description: 'Position 5: Fire' },
    // Position 6
    { id: 'p5', position: 6, chapter: 64, emoji: '🌋', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌋%3C/text%3E%3C/svg%3E", description: 'Position 6: Volcano' },
    // Position 7
    { id: 'p9', position: 7, chapter: 77, emoji: '⭐', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E⭐%3C/text%3E%3C/svg%3E", description: 'Position 7: Star' },
    // Position 8
    { id: 'p7', position: 8, chapter: 90, emoji: '🐄', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐄%3C/text%3E%3C/svg%3E", description: 'Position 8: Cow' },
    // Position 9
    { id: 'p8', position: 9, chapter: 102, emoji: '🐟', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐟%3C/text%3E%3C/svg%3E", description: 'Position 9: Fish' },
];

// New constants for Kathara Clock feature
export const KATHARA_CLOCK_POINTS = [1, 11, 20, 30, 39, 49, 58, 68, 77, 87, 96, 106];

export const KATHARA_GRID_NODES = [
  { id: 1,  x: 75, y: 260, r: 9, color: '#dc2626' }, // red-600
  { id: 2,  x: 75, y: 230, r: 9, color: '#f97316' }, // orange-500
  { id: 3,  x: 30, y: 200, r: 9, color: '#facc15' }, // yellow-400
  { id: 4,  x: 120, y: 200, r: 9, color: '#4ade80' }, // green-400
  { id: 5,  x: 75, y: 170, r: 9, color: '#3b82f6' }, // blue-500
  { id: 6,  x: 30, y: 140,  r: 9, color: '#8b5cf6' }, // violet-500
  { id: 7,  x: 120, y: 140,  r: 9, color: '#a855f7' }, // purple-500
  { id: 8,  x: 75, y: 110,  r: 9, color: '#eab308' }, // yellow-600
  { id: 9,  x: 30, y: 80,  r: 9, color: '#a1a1aa' }, // zinc-400
  { id: 10, x: 120, y: 80,  r: 9, color: '#1e3a8a' }, // blue-900
  { id: 11, x: 75, y: 50,  r: 9, color: '#404040' }, // neutral-700
  { id: 12, x: 75, y: 20,  r: 9, color: '#f5f5f5' }, // neutral-100
  // New Static Nodes (Eumbi, AzurA, Rajna)
  { id: 13, x: 75, y: 200, r: 8, color: '#06b6d4', staticLabel: '108', shape: 'volcano' }, // Eumbi (Volcano)
  { id: 14, x: 75, y: 140, r: 8, color: '#f97316', staticLabel: '103', shape: 'star' },    // AzurA (Star)
  { id: 15, x: 75, y: 80, r: 8, color: '#15803d', staticLabel: '110', shape: 'palm' },    // Rajna (Palm)
];

export const KATHARA_GRID_LINES = [
  // Bottom Pillar
  { from: 1, to: 2 },
  { from: 2, to: 3 }, { from: 2, to: 4 }, 
  // Eumbi Connections (replacing 2-5 and connecting sides)
  { from: 2, to: 13 }, { from: 13, to: 5 },
  { from: 3, to: 13 }, { from: 4, to: 13 },
  // Mid Pillar
  { from: 3, to: 5 }, { from: 3, to: 6 }, { from: 4, to: 5 }, { from: 4, to: 7 },
  { from: 5, to: 6 }, { from: 5, to: 7 },
  // AzurA Connections (replacing 5-8 and connecting sides)
  { from: 5, to: 14 }, { from: 14, to: 8 },
  { from: 6, to: 14 }, { from: 7, to: 14 },
  // Upper Pillar
  { from: 6, to: 8 }, { from: 6, to: 9 }, { from: 7, to: 8 }, { from: 7, to: 10 },
  // Rajna Connections (replacing 8-11 and connecting sides)
  { from: 8, to: 15 }, { from: 15, to: 11 },
  { from: 9, to: 15 }, { from: 10, to: 15 },
  // Top Pillar
  { from: 8, to: 9 }, { from: 8, to: 10 },
  { from: 9, to: 11 }, { from: 9, to: 12 }, { from: 10, to: 11 }, { from: 10, to: 12 },
  { from: 11, to: 12 },
];


export const CHAPTER_DETAILS: ChapterDetails[] = [
    { number: 1, englishName: 'The Key', transliteration: 'Al-Fātiḥah', arabicName: 'ٱلْفَاتِحَة', revelationType: 'Makki', juz: '1' },
    { number: 2, englishName: 'The Heifer', transliteration: 'Al-Baqarah', arabicName: 'البَقَرَة', revelationType: 'Madani', juz: '1-3' },
    { number: 3, englishName: 'The Amramites', transliteration: 'Āl-ʿImrān', arabicName: 'آلِ عِمْرَان', revelationType: 'Madani', juz: '3-4' },
    { number: 4, englishName: 'Women', transliteration: 'An-Nisāʾ', arabicName: 'النِّسَاء', revelationType: 'Madani', juz: '4-6' },
    { number: 5, englishName: 'The Feast', transliteration: 'Al-Māʾidah', arabicName: 'المَائِدَة', revelationType: 'Madani', juz: '6-7' },
    { number: 6, englishName: 'Livestock', transliteration: 'Al-Anʿām', arabicName: 'الأَنْعَام', revelationType: 'Makki', juz: '7-8' },
    { number: 7, englishName: 'The Purgatory', transliteration: 'Al-Aʿrāf', arabicName: 'الأَعْرَاف', revelationType: 'Makki', juz: '8-9' },
    { number: 8, englishName: 'The Spoils of War', transliteration: 'Al-Anfāl', arabicName: 'الأَنْفَال', revelationType: 'Madani', juz: '9-10' },
    { number: 9, englishName: 'Ultimatum', transliteration: 'Barāʾah', arabicName: 'التَّوْبَة', revelationType: 'Madani', juz: '10-11' },
    { number: 10, englishName: 'Jonah', transliteration: 'Yūnus', arabicName: 'يُونُس', revelationType: 'Makki', juz: '11' },
    { number: 11, englishName: 'Hūd', transliteration: 'Hūd', arabicName: 'هُود', revelationType: 'Makki', juz: '11-12' },
    { number: 12, englishName: 'Joseph', transliteration: 'Yūsuf', arabicName: 'يُوسُف', revelationType: 'Makki', juz: '12-13' },
    { number: 13, englishName: 'Thunder', transliteration: 'Ar-Raʿd', arabicName: 'الرَّعْد', revelationType: 'Madani', juz: '13' },
    { number: 14, englishName: 'Abraham', transliteration: 'Ibrāhīm', arabicName: 'إِبْرَاهِيم', revelationType: 'Makki', juz: '13' },
    { number: 15, englishName: 'Al-Ḥijr Valley', transliteration: 'Al-Ḥijr', arabicName: 'الْحِجْر', revelationType: 'Makki', juz: '14' },
    { number: 16, englishName: 'The Bee', transliteration: 'An-Naḥl', arabicName: 'النَّحْل', revelationType: 'Makki', juz: '14' },
    { number: 17, englishName: 'The Children of Israel', transliteration: 'Banī Isrāʾīl', arabicName: 'الإِسْرَاء', revelationType: 'Makki', juz: '15' },
    { number: 18, englishName: 'The Cave', transliteration: 'Al-Kahf', arabicName: 'الْكَهْف', revelationType: 'Makki', juz: '15-16' },
    { number: 19, englishName: 'Mary', transliteration: 'Maryam', arabicName: 'مَرْيَم', revelationType: 'Makki', juz: '16' },
    { number: 20, englishName: 'T.H.', transliteration: 'Ṭā Hā', arabicName: 'طه', revelationType: 'Makki', juz: '16' },
    { number: 21, englishName: 'The Prophets', transliteration: 'Al-Anbiyāʾ', arabicName: 'الأَنْبِيَاء', revelationType: 'Makki', juz: '17' },
    { number: 22, englishName: 'Pilgrimage', transliteration: 'Al-Ḥajj', arabicName: 'الْحَجّ', revelationType: 'Madani', juz: '17' },
    { number: 23, englishName: 'The Believers', transliteration: 'Al-Muʾminūn', arabicName: 'المُؤْمِنُون', revelationType: 'Makki', juz: '18' },
    { number: 24, englishName: 'Light', transliteration: 'An-Nūr', arabicName: 'النُّور', revelationType: 'Madani', juz: '18' },
    { number: 25, englishName: 'The Statute Book', transliteration: 'Al-Furqān', arabicName: 'الْفُرْقَان', revelationType: 'Makki', juz: '18-19' },
    { number: 26, englishName: 'The Poets', transliteration: 'Ash-Shuʿarāʾ', arabicName: 'الشُّعَرَاء', revelationType: 'Makki', juz: '19' },
    { number: 27, englishName: 'The Ant', transliteration: 'An-Naml', arabicName: 'النَّمْل', revelationType: 'Makki', juz: '19-20' },
    { number: 28, englishName: 'History', transliteration: 'Al-Qaṣaṣ', arabicName: 'الْقَصَص', revelationType: 'Makki', juz: '20' },
    { number: 29, englishName: 'The Spider', transliteration: 'Al-ʿAnkabūt', arabicName: 'الْعَنْكَبُوت', revelationType: 'Makki', juz: '20-21' },
    { number: 30, englishName: 'The Romans', transliteration: 'Ar-Rūm', arabicName: 'الرُّوم', revelationType: 'Makki', juz: '21' },
    { number: 31, englishName: 'Luqmān', transliteration: 'Luqmān', arabicName: 'لُقْمَان', revelationType: 'Makki', juz: '21' },
    { number: 32, englishName: 'Prostration', transliteration: 'As-Sajdah', arabicName: 'السَّجْدَة', revelationType: 'Makki', juz: '21' },
    { number: 33, englishName: 'The Parties', transliteration: 'Al-Aḥzāb', arabicName: 'الأَحْزَاب', revelationType: 'Madani', juz: '21-22' },
    { number: 34, englishName: 'Sheba', transliteration: 'Sabaʾ', arabicName: 'سَبَأ', revelationType: 'Makki', juz: '22' },
    { number: 35, englishName: 'Initiator', transliteration: 'Fāṭir', arabicName: 'فَاطِر', revelationType: 'Makki', juz: '22' },
    { number: 36, englishName: 'Y.S.', transliteration: 'Yā-Sīn', arabicName: 'يس', revelationType: 'Makki', juz: '22-23' },
    { number: 37, englishName: 'The Arrangers', transliteration: 'As-Ṣāffāt', arabicName: 'الصَّافَّات', revelationType: 'Makki', juz: '23' },
    { number: 38, englishName: 'S', transliteration: 'Ṣād', arabicName: 'ص', revelationType: 'Makki', juz: '23' },
    { number: 39, englishName: 'The Throngs', transliteration: 'Az-Zumar', arabicName: 'الزُّمَر', revelationType: 'Makki', juz: '23-24' },
    { number: 40, englishName: 'Forgiver', transliteration: 'Ghāfir', arabicName: 'غَافِر', revelationType: 'Makki', juz: '24' },
    { number: 41, englishName: 'Detailed', transliteration: 'Fuṣṣilat', arabicName: 'فُصِّلَت', revelationType: 'Makki', juz: '24-25' },
    { number: 42, englishName: 'Consultation', transliteration: 'Ash-Shūrā', arabicName: 'الشُّورَى', revelationType: 'Makki', juz: '25' },
    { number: 43, englishName: 'Ornaments', transliteration: 'Az-Zukhruf', arabicName: 'الزُّخْرُف', revelationType: 'Makki', juz: '25' },
    { number: 44, englishName: 'Smoke', transliteration: 'Ad-Dukhān', arabicName: 'الدُّخَان', revelationType: 'Makki', juz: '25' },
    { number: 45, englishName: 'Kneeling', transliteration: 'Al-Jāthiyah', arabicName: 'الْجَاثِيَة', revelationType: 'Makki', juz: '25' },
    { number: 46, englishName: 'The Dunes', transliteration: 'Al-Aḥqāf', arabicName: 'الأَحْقَاف', revelationType: 'Makki', juz: '26' },
    { number: 47, englishName: 'Muhammad', transliteration: 'Muḥammad', arabicName: 'مُحَمَّد', revelationType: 'Madani', juz: '26' },
    { number: 48, englishName: 'Victory', transliteration: 'Al-Fatḥ', arabicName: 'الْفَتْح', revelationType: 'Madani', juz: '26' },
    { number: 49, englishName: 'The Walls', transliteration: 'Al-Ḥujurāt', arabicName: 'الْحُجُرَات', revelationType: 'Madani', juz: '26' },
    { number: 50, englishName: 'Q', transliteration: 'Qāf', arabicName: 'ق', revelationType: 'Makki', juz: '26' },
    { number: 51, englishName: 'Drivers of the Winds', transliteration: 'Adh-Dhāriyāt', arabicName: 'الذَّارِيَات', revelationType: 'Makki', juz: '26-27' },
    { number: 52, englishName: 'Mount Sinai', transliteration: 'Aṭ-Ṭūr', arabicName: 'الطُّور', revelationType: 'Makki', juz: '27' },
    { number: 53, englishName: 'The Stars', transliteration: 'An-Najm', arabicName: 'النَّجْم', revelationType: 'Makki', juz: '27' },
    { number: 54, englishName: 'The Moon', transliteration: 'Al-Qamar', arabicName: 'الْقَمَر', revelationType: 'Makki', juz: '27' },
    { number: 55, englishName: 'Most Gracious', transliteration: 'Ar-Raḥmān', arabicName: 'الرَّحْمَن', revelationType: 'Madani', juz: '27' },
    { number: 56, englishName: 'The Inevitable', transliteration: 'Al-Wāqiʿah', arabicName: 'الْوَاقِعَة', revelationType: 'Makki', juz: '27' },
    { number: 57, englishName: 'Iron', transliteration: 'Al-Ḥadīd', arabicName: 'الْحَدِيد', revelationType: 'Madani', juz: '27' },
    { number: 58, englishName: 'The Debate', transliteration: 'Al-Mujādalah', arabicName: 'الْمُجَادِلَة', revelationType: 'Madani', juz: '28' },
    { number: 59, englishName: 'Exodus', transliteration: 'Al-Ḥashr', arabicName: 'الْحَشْر', revelationType: 'Madani', juz: '28' },
    { number: 60, englishName: 'The Test', transliteration: 'Al-Mumtaḥanah', arabicName: 'الْمُمْتَحَنَة', revelationType: 'Madani', juz: '28' },
    { number: 61, englishName: 'The Column', transliteration: 'As-Ṣaff', arabicName: 'الصَّفّ', revelationType: 'Madani', juz: '28' },
    { number: 62, englishName: 'Friday', transliteration: 'Al-Jumuʿah', arabicName: 'الْجُمُعَة', revelationType: 'Madani', juz: '28' },
    { number: 63, englishName: 'The Hypocrites', transliteration: 'Al-Munāfiqūn', arabicName: 'الْمُنَافِقُون', revelationType: 'Madani', juz: '28' },
    { number: 64, englishName: 'Mutual Blaming', transliteration: 'At-Taghābun', arabicName: 'التَّغَابُن', revelationType: 'Madani', juz: '28' },
    { number: 65, englishName: 'Divorce', transliteration: 'Aṭ-Ṭalāq', arabicName: 'الطَّلَاق', revelationType: 'Madani', juz: '28' },
    { number: 66, englishName: 'Prohibition', transliteration: 'At-Taḥrīm', arabicName: 'التَّحْرِيم', revelationType: 'Madani', juz: '28' },
    { number: 67, englishName: 'Kingship', transliteration: 'Al-Mulk', arabicName: 'الْمُلْك', revelationType: 'Makki', juz: '29' },
    { number: 68, englishName: 'The Pen', transliteration: 'Al-Qalam', arabicName: 'الْقَلَم', revelationType: 'Makki', juz: '29' },
    { number: 69, englishName: 'Incontestable', transliteration: 'Al-Ḥāqqah', arabicName: 'الْحَاقَّة', revelationType: 'Makki', juz: '29' },
    { number: 70, englishName: 'The Heights', transliteration: 'Al-Maʿārij', arabicName: 'الْمَعَارِج', revelationType: 'Makki', juz: '29' },
    { number: 71, englishName: 'Noah', transliteration: 'Nūḥ', arabicName: 'نُوح', revelationType: 'Makki', juz: '29' },
    { number: 72, englishName: 'The Jinn', transliteration: 'Al-Jinn', arabicName: 'الْجِنّ', revelationType: 'Makki', juz: '29' },
    { number: 73, englishName: 'Cloaked', transliteration: 'Al-Muzzammil', arabicName: 'الْمُزَّمِّل', revelationType: 'Makki', juz: '29' },
    { number: 74, englishName: 'The Hidden Secret', transliteration: 'Al-Muddaththir', arabicName: 'الْمُدَّثِّر', revelationType: 'Makki', juz: '29' },
    { number: 75, englishName: 'Resurrection', transliteration: 'Al-Qiyāmah', arabicName: 'الْقِيَامَة', revelationType: 'Makki', juz: '29' },
    { number: 76, englishName: 'The Human', transliteration: 'Al-Insān', arabicName: 'الإِنْسَان', revelationType: 'Madani', juz: '29' },
    { number: 77, englishName: 'Dispatched', transliteration: 'Al-Mursalāt', arabicName: 'الْمُرْسَلَات', revelationType: 'Makki', juz: '29' },
    { number: 78, englishName: 'The Event', transliteration: 'An-Nabaʾ', arabicName: 'النَّبَأ', revelationType: 'Makki', juz: '30' },
    { number: 79, englishName: 'The Snatchers', transliteration: 'An-Nāziʿāt', arabicName: 'النَّازِعَات', revelationType: 'Makki', juz: '30' },
    { number: 80, englishName: 'He Frowned', transliteration: 'ʿAbasa', arabicName: 'عَبَسَ', revelationType: 'Makki', juz: '30' },
    { number: 81, englishName: 'The Rolling', transliteration: 'At-Takwīr', arabicName: 'التَّكْوِير', revelationType: 'Makki', juz: '30' },
    { number: 82, englishName: 'The Shattering', transliteration: 'Al-Infitar', arabicName: 'الإِنْشِقَاق', revelationType: 'Makki', juz: '30' },
    { number: 83, englishName: 'The Cheaters', transliteration: 'Al-Muṭaffifīn', arabicName: 'الْمُطَفِّفِين', revelationType: 'Makki', juz: '30' },
    { number: 84, englishName: 'The Rupture', transliteration: 'Al-Inshiqāq', arabicName: 'الإِنْشِقَاق', revelationType: 'Makki', juz: '30' },
    { number: 85, englishName: 'The Galaxies', transliteration: 'Al-Burūj', arabicName: 'الْبُرُوج', revelationType: 'Makki', juz: '30' },
    { number: 86, englishName: 'The Bright Star', transliteration: 'Aṭ-Ṭāriq', arabicName: 'الطَّارِق', revelationType: 'Makki', juz: '30' },
    { number: 87, englishName: 'The Most High', transliteration: 'Al-Aʿlā', arabicName: 'الأَعْلَى', revelationType: 'Makki', juz: '30' },
    { number: 88, englishName: 'The Overwhelming', transliteration: 'Al-Ghāshiyah', arabicName: 'الْغَاشِيَة', revelationType: 'Makki', juz: '30' },
    { number: 89, englishName: 'Dawn', transliteration: 'Al-Fajr', arabicName: 'الْفَجْر', revelationType: 'Makki', juz: '30' },
    { number: 90, englishName: 'The Town', transliteration: 'Al-Balad', arabicName: 'الْبَلَد', revelationType: 'Makki', juz: '30' },
    { number: 91, englishName: 'The Sun', transliteration: 'Ash-Shams', arabicName: 'الشَّمْس', revelationType: 'Makki', juz: '30' },
    { number: 92, englishName: 'The Night', transliteration: 'Al-Layl', arabicName: 'اللَّيْل', revelationType: 'Makki', juz: '30' },
    { number: 93, englishName: 'The Forenoon', transliteration: 'Ad-Ḍuḥā', arabicName: 'الضُّحَى', revelationType: 'Makki', juz: '30' },
    { number: 94, englishName: 'Cooling the Temper', transliteration: 'Ash-Sharḥ', arabicName: 'الشَّرْح', revelationType: 'Makki', juz: '30' },
    { number: 95, englishName: 'The Fig', transliteration: 'At-Tīn', arabicName: 'التِّين', revelationType: 'Makki', juz: '30' },
    { number: 96, englishName: 'The Embryo', transliteration: 'Al-ʿAlaq', arabicName: 'الْعَلَق', revelationType: 'Makki', juz: '30' },
    { number: 97, englishName: 'Destiny', transliteration: 'Al-Qadr', arabicName: 'الْقَدْر', revelationType: 'Makki', juz: '30' },
    { number: 98, englishName: 'Proof', transliteration: 'Al-Bayyinah', arabicName: 'الْبَيِّنَة', revelationType: 'Madani', juz: '30' },
    { number: 99, englishName: 'The Quake', transliteration: 'Az-Zalzalah', arabicName: 'الزَّلْزَلَة', revelationType: 'Madani', juz: '30' },
    { number: 100, englishName: 'The Gallopers', transliteration: 'Al-ʿĀdiyāt', arabicName: 'الْعَادِيَات', revelationType: 'Makki', juz: '30' },
    { number: 101, englishName: 'The Shocker', transliteration: 'Al-Qāriʿah', arabicName: 'الْقَارِعَة', revelationType: 'Makki', juz: '30' },
    { number: 102, englishName: 'Hoarding', transliteration: 'At-Takāthur', arabicName: 'التَّكَاثُر', revelationType: 'Makki', juz: '30' },
    { number: 103, englishName: 'The Afternoon', transliteration: 'Al-ʿAṣr', arabicName: 'الْعَصْر', revelationType: 'Makki', juz: '30' },
    { number: 104, englishName: 'The Backbiter', transliteration: 'Al-Humazah', arabicName: 'الْهُمَزَة', revelationType: 'Makki', juz: '30' },
    { number: 105, englishName: 'The Elephant', transliteration: 'Al-Fīl', arabicName: 'الْفِيل', revelationType: 'Makki', juz: '30' },
    { number: 106, englishName: 'The Quraish Tribe', transliteration: 'Quraysh', arabicName: 'قُرَيْش', revelationType: 'Makki', juz: '30' },
    { number: 107, englishName: 'Charity', transliteration: 'Al-Māʿūn', arabicName: 'الْمَاعُون', revelationType: 'Makki', juz: '30' },
    { number: 108, englishName: 'Bounty', transliteration: 'Al-Kawthar', arabicName: 'الْكَوْثَر', revelationType: 'Makki', juz: '30' },
    { number: 109, englishName: 'The Disbelievers', transliteration: 'Al-Kāfirūn', arabicName: 'الْكَافِرُون', revelationType: 'Makki', juz: '30' },
    { number: 110, englishName: 'Triumph', transliteration: 'An-Naṣr', arabicName: 'النَّصْر', revelationType: 'Madani', juz: '30' },
    { number: 111, englishName: 'Thorns', transliteration: 'Al-Masad', arabicName: 'الْمَسَد', revelationType: 'Makki', juz: '30' },
    { number: 112, englishName: 'Absoluteness', transliteration: 'Al-Ikhlāṣ', arabicName: 'الإِخْلَاص', revelationType: 'Makki', juz: '30' },
    { number: 113, englishName: 'Daybreak', transliteration: 'Al-Falaq', arabicName: 'الْفَلَق', revelationType: 'Makki', juz: '30' },
    { number: 114, englishName: 'People', transliteration: 'An-Nās', arabicName: 'النَّاس', revelationType: 'Makki', juz: '30' }
];

export const TAFSIR_YOUTUBE_VIDEO_IDS: string[] = Array(114).fill('');
export const RECITATION_YOUTUBE_VIDEO_IDS: string[] = Array(114).fill('');
export const ENGLISH_RECITATION_YOUTUBE_VIDEO_IDS: string[] = Array(114).fill('');