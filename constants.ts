
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
    // Position 9
    { id: 'p9', position: 9, chapter: 1, emoji: '🌕', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌕%3C/text%3E%3C/svg%3E", description: 'Position 9: Full Moon' },
    // Position 1
    { id: 'p1', position: 1, chapter: 14, emoji: '🔥', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🔥%3C/text%3E%3C/svg%3E", description: 'Position 1: Fire' },
    // Position 2
    { id: 'p2', position: 2, chapter: 26, emoji: '🐟', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐟%3C/text%3E%3C/svg%3E", description: 'Position 2: Fish' },
    // Position 3
    { id: 'p3', position: 3, chapter: 39, emoji: '⭐', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E⭐%3C/text%3E%3C/svg%3E", description: 'Position 3: Star' },
    // Position 4
    { id: 'p4', position: 4, chapter: 52, emoji: '🌴', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌴%3C/text%3E%3C/svg%3E", description: 'Position 4: Palm Tree' },
    // Position 5
    { id: 'p5', position: 5, chapter: 64, emoji: '🌋', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌋%3C/text%3E%3C/svg%3E", description: 'Position 5: Volcano' },
    // Position 6
    { id: 'p6', position: 6, chapter: 77, emoji: '🌍', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🌍%3C/text%3E%3C/svg%3E", description: 'Position 6: Earth' },
    // Position 7
    { id: 'p7', position: 7, chapter: 90, emoji: '🐄', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E🐄%3C/text%3E%3C/svg%3E", description: 'Position 7: Cow' },
    // Position 8
    { id: 'p8', position: 8, chapter: 102, emoji: '⚡', imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='80' text-anchor='middle' dominant-baseline='central'%3E⚡%3C/text%3E%3C/svg%3E", description: 'Position 8: Lightning' },
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
  { id: 14, x: 75, y: 140, r: 8, color: '#f97316', staticLabel: '103', shape: 'fish' },    // AzurA (Fish)
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
    { number: 1, englishName: 'Key to Light', transliteration: 'Al-Fātiḥah', arabicName: 'ٱلْفَاتِحَة', revelationType: 'Makki', juz: '1' },
    { number: 2, englishName: 'Servant Lineage', transliteration: 'Al-Baqarah', arabicName: 'البَقَرَة', revelationType: 'Madani', juz: '1-3' },
    { number: 3, englishName: 'Chosen Lineage', transliteration: 'Āl-ʿImrān', arabicName: 'آلِ عِمْرَان', revelationType: 'Madani', juz: '3-4' },
    { number: 4, englishName: 'The Women', transliteration: 'An-Nisāʾ', arabicName: 'النِّسَاء', revelationType: 'Madani', juz: '4-6' },
    { number: 5, englishName: 'The Offering', transliteration: 'Al-Māʾidah', arabicName: 'المَائِدَة', revelationType: 'Madani', juz: '6-7' },
    { number: 6, englishName: 'The Purity', transliteration: 'Al-Anʿām', arabicName: 'الأَنْعَام', revelationType: 'Makki', juz: '7-8' },
    { number: 7, englishName: 'The Higher Ground', transliteration: 'Al-Aʿrāf', arabicName: 'الأَعْرَاف', revelationType: 'Makki', juz: '8-9' },
    { number: 8, englishName: 'The Consequence', transliteration: 'Al-Anfāl', arabicName: 'الأَنْফَال', revelationType: 'Madani', juz: '9-10' },
    { number: 9, englishName: 'The Repentance (Balance)', transliteration: 'Barāʾah', arabicName: 'التَّوْبَة', revelationType: 'Madani', juz: '10-11' },
    { number: 10, englishName: 'The Silence', transliteration: 'Yūnus', arabicName: 'يُونُس', revelationType: 'Makki', juz: '11' },
    { number: 11, englishName: 'The Purified One', transliteration: 'Hūd', arabicName: 'هُود', revelationType: 'Makki', juz: '11-12' },
    { number: 12, englishName: 'Enlightenment', transliteration: 'Yūsuf', arabicName: 'يُوسُف', revelationType: 'Makki', juz: '12-13' },
    { number: 13, englishName: 'Lightening', transliteration: 'Ar-Raʿd', arabicName: 'الرَّعْد', revelationType: 'Madani', juz: '13' },
    { number: 14, englishName: 'Tree', transliteration: 'Ibrāhīm', arabicName: 'إِبْرَاهِيم', revelationType: 'Makki', juz: '13' },
    { number: 15, englishName: 'Land of Dead', transliteration: 'Al-Ḥijr', arabicName: 'الْحِجْر', revelationType: 'Makki', juz: '14' },
    { number: 16, englishName: 'Obedient Servants', transliteration: 'An-Naḥl', arabicName: 'النَّحْل', revelationType: 'Makki', juz: '14' },
    { number: 17, englishName: 'Ascension', transliteration: 'Banī Isrāʾīl', arabicName: 'الإِسْرَاء', revelationType: 'Makki', juz: '15' },
    { number: 18, englishName: 'Remember The Cave', transliteration: 'Al-Kahf', arabicName: 'الْكَهْف', revelationType: 'Makki', juz: '15-16' },
    { number: 19, englishName: 'Chrysalis', transliteration: 'Maryam', arabicName: 'مَرْيَم', revelationType: 'Makki', juz: '16' },
    { number: 20, englishName: 'Chosen', transliteration: 'Ṭā Hā', arabicName: 'طه', revelationType: 'Makki', juz: '16' },
    { number: 21, englishName: 'Prophet', transliteration: 'Al-Anbiyāʾ', arabicName: 'الأَنْبِيَاء', revelationType: 'Makki', juz: '17' },
    { number: 22, englishName: 'Pilgrimage', transliteration: 'Al-Ḥajj', arabicName: 'الْحَجّ', revelationType: 'Madani', juz: '17' },
    { number: 23, englishName: 'Believer', transliteration: 'Al-Muʾminūn', arabicName: 'المُؤْمِنُون', revelationType: 'Makki', juz: '18' },
    { number: 24, englishName: 'Light (Ayat-Hayat-Haq)', transliteration: 'An-Nūr', arabicName: 'النُّور', revelationType: 'Madani', juz: '18' },
    { number: 25, englishName: 'Separator', transliteration: 'Al-Furqān', arabicName: 'الْفُرْقَان', revelationType: 'Makki', juz: '18-19' },
    { number: 26, englishName: 'The Warners', transliteration: 'Ash-Shuʿarāʾ', arabicName: 'الشُّعَرَاء', revelationType: 'Makki', juz: '19' },
    { number: 27, englishName: 'Fearing Servants', transliteration: 'An-Naml', arabicName: 'النَّمْل', revelationType: 'Makki', juz: '19-20' },
    { number: 28, englishName: 'Stories', transliteration: 'Al-Qaṣaṣ', arabicName: 'الْقَصَص', revelationType: 'Makki', juz: '20' },
    { number: 29, englishName: 'Fragile', transliteration: 'Al-ʿAnkabūt', arabicName: 'الْعَنْكَبُوت', revelationType: 'Makki', juz: '20-21' },
    { number: 30, englishName: 'Promise', transliteration: 'Ar-Rūm', arabicName: 'الرُّوم', revelationType: 'Makki', juz: '21' },
    { number: 31, englishName: 'Guidance', transliteration: 'Luqmān', arabicName: 'لُقْمَان', revelationType: 'Makki', juz: '21' },
    { number: 32, englishName: 'Submission', transliteration: 'As-Sajdah', arabicName: 'السَّجْدَة', revelationType: 'Makki', juz: '21' },
    { number: 33, englishName: 'The Challenge', transliteration: 'Al-Aḥzāb', arabicName: 'الأَحْزَاب', revelationType: 'Madani', juz: '21-22' },
    { number: 34, englishName: 'Acceptance of Truth', transliteration: 'Sabaʾ', arabicName: 'سَبَأ', revelationType: 'Makki', juz: '22' },
    { number: 35, englishName: 'Initiator', transliteration: 'Fāṭir', arabicName: 'فَاطِر', revelationType: 'Makki', juz: '22' },
    { number: 36, englishName: 'The Messengers', transliteration: 'Yā-Sīn', arabicName: 'يس', revelationType: 'Makki', juz: '22-23' },
    { number: 37, englishName: 'The Hosts', transliteration: 'As-Ṣāffāt', arabicName: 'الصَّافَّات', revelationType: 'Makki', juz: '23' },
    { number: 38, englishName: 'Endurance', transliteration: 'Ṣād', arabicName: 'ص', revelationType: 'Makki', juz: '23' },
    { number: 39, englishName: 'The Gathering', transliteration: 'Az-Zumar', arabicName: 'الزُّمَر', revelationType: 'Makki', juz: '23-24' },
    { number: 40, englishName: 'Forgiver', transliteration: 'Ghāfir', arabicName: 'غَافِر', revelationType: 'Makki', juz: '24' },
    { number: 41, englishName: 'The Explanation', transliteration: 'Fuṣṣilat', arabicName: 'فُصِّلَت', revelationType: 'Makki', juz: '24-25' },
    { number: 42, englishName: 'Consultation', transliteration: 'Ash-Shūrā', arabicName: 'الشُّورَى', revelationType: 'Makki', juz: '25' },
    { number: 43, englishName: 'The Delusion', transliteration: 'Az-Zukhruf', arabicName: 'الزُّخْرُف', revelationType: 'Makki', juz: '25' },
    { number: 44, englishName: 'Smoke', transliteration: 'Ad-Dukhān', arabicName: 'الدُّخَان', revelationType: 'Makki', juz: '25' },
    { number: 45, englishName: 'She That Kneels', transliteration: 'Al-Jāthiyah', arabicName: 'الْجَاثِيَة', revelationType: 'Makki', juz: '25' },
    { number: 46, englishName: 'The Reminder', transliteration: 'Al-Aḥqāf', arabicName: 'الأَحْقَاف', revelationType: 'Makki', juz: '26' },
    { number: 47, englishName: 'Self-Reflection', transliteration: 'Muḥammad', arabicName: 'مُحَمَّد', revelationType: 'Madani', juz: '26' },
    { number: 48, englishName: 'The Fulfillment', transliteration: 'Al-Fatḥ', arabicName: 'الْفَتْح', revelationType: 'Madani', juz: '26' },
    { number: 49, englishName: 'Internal Order', transliteration: 'Al-Ḥujurāt', arabicName: 'الْحُجُرَات', revelationType: 'Madani', juz: '26' },
    { number: 50, englishName: 'Knowledge', transliteration: 'Qāf', arabicName: 'ق', revelationType: 'Makki', juz: '26' },
    { number: 51, englishName: 'Keeper of Oath', transliteration: 'Adh-Dhāriyāt', arabicName: 'الذَّارِيَات', revelationType: 'Makki', juz: '26-27' },
    { number: 52, englishName: 'On Mountain', transliteration: 'Aṭ-Ṭūr', arabicName: 'الطُّور', revelationType: 'Makki', juz: '27' },
    { number: 53, englishName: 'The Star', transliteration: 'An-Najm', arabicName: 'النَّجْم', revelationType: 'Makki', juz: '27' },
    { number: 54, englishName: 'The Moon', transliteration: 'Al-Qamar', arabicName: 'الْقَمَر', revelationType: 'Makki', juz: '27' },
    { number: 55, englishName: 'Most Gracious', transliteration: 'Ar-Raḥmān', arabicName: 'الرَّحْمَن', revelationType: 'Madani', juz: '27' },
    { number: 56, englishName: 'The Certainty', transliteration: 'Al-Wāqiʿah', arabicName: 'الْوَاقِعَة', revelationType: 'Makki', juz: '27' },
    { number: 57, englishName: 'Vicegerent Lineage', transliteration: 'Al-Ḥadīd', arabicName: 'الْحَدِيد', revelationType: 'Madani', juz: '27' },
    { number: 58, englishName: 'Who Disputes', transliteration: 'Al-Mujādalah', arabicName: 'الْمُجَادِلَة', revelationType: 'Madani', juz: '28' },
    { number: 59, englishName: 'The Banishment', transliteration: 'Al-Ḥashr', arabicName: 'الْحَشْر', revelationType: 'Madani', juz: '28' },
    { number: 60, englishName: 'The Trial', transliteration: 'Al-Mumtaḥanah', arabicName: 'الْمُمْتَحَنَة', revelationType: 'Madani', juz: '28' },
    { number: 61, englishName: 'The Rank', transliteration: 'As-Ṣaff', arabicName: 'الصَّفّ', revelationType: 'Madani', juz: '28' },
    { number: 62, englishName: 'The Assembly', transliteration: 'Al-Jumuʿah', arabicName: 'الْجُمُعَة', revelationType: 'Madani', juz: '28' },
    { number: 63, englishName: 'The Hypocrites', transliteration: 'Al-Munāfiqūn', arabicName: 'الْمُنَافِقُون', revelationType: 'Madani', juz: '28' },
    { number: 64, englishName: 'Mutual Blaming', transliteration: 'At-Taghābun', arabicName: 'التَّغَابُن', revelationType: 'Madani', juz: '28' },
    { number: 65, englishName: 'The Separation', transliteration: 'Aṭ-Ṭalāq', arabicName: 'الطَّلَاق', revelationType: 'Madani', juz: '28' },
    { number: 66, englishName: 'The Restriction', transliteration: 'At-Taḥrīm', arabicName: 'التَّحْرِيم', revelationType: 'Madani', juz: '28' },
    { number: 67, englishName: 'The Sovereignty', transliteration: 'Al-Mulk', arabicName: 'الْمُلْك', revelationType: 'Makki', juz: '29' },
    { number: 68, englishName: 'The Decree', transliteration: 'Al-Qalam', arabicName: 'الْقَلَم', revelationType: 'Makki', juz: '29' },
    { number: 69, englishName: 'The Absolute Truth', transliteration: 'Al-Ḥāqqah', arabicName: 'الْحَاقَّة', revelationType: 'Makki', juz: '29' },
    { number: 70, englishName: 'The Glory', transliteration: 'Al-Maʿārij', arabicName: 'الْمَعَارِج', revelationType: 'Makki', juz: '29' },
    { number: 71, englishName: 'Womb on Water', transliteration: 'Nūḥ', arabicName: 'نُوح', revelationType: 'Makki', juz: '29' },
    { number: 72, englishName: 'The Ignorance', transliteration: 'Al-Jinn', arabicName: 'الْجِنّ', revelationType: 'Makki', juz: '29' },
    { number: 73, englishName: 'The Covered One', transliteration: 'Al-Muzzammil', arabicName: 'الْمُزَّمِّل', revelationType: 'Makki', juz: '29' },
    { number: 74, englishName: 'The Secret One', transliteration: 'Al-Muddaththir', arabicName: 'الْمُدَّثِّر', revelationType: 'Makki', juz: '29' },
    { number: 75, englishName: 'Raised Alive', transliteration: 'Al-Qiyāmah', arabicName: 'الْقِيَامَة', revelationType: 'Makki', juz: '29' },
    { number: 76, englishName: 'The Righteous Man', transliteration: 'Al-Insān', arabicName: 'الإِنْسَان', revelationType: 'Madani', juz: '29' },
    { number: 77, englishName: 'The Agents', transliteration: 'Al-Mursalāt', arabicName: 'الْمُرْسَلَات', revelationType: 'Makki', juz: '29' },
    { number: 78, englishName: 'The Event', transliteration: 'An-Nabaʾ', arabicName: 'النَّبَأ', revelationType: 'Makki', juz: '30' },
    { number: 79, englishName: 'The Uprooting', transliteration: 'An-Nāziʿāt', arabicName: 'النَّازِعَات', revelationType: 'Makki', juz: '30' },
    { number: 80, englishName: 'Dark One', transliteration: 'ʿAbasa', arabicName: 'عَبَسَ', revelationType: 'Makki', juz: '30' },
    { number: 81, englishName: 'Upside Down', transliteration: 'At-Takwīr', arabicName: 'التَّكْوِير', revelationType: 'Makki', juz: '30' },
    { number: 82, englishName: 'The Splitting Open', transliteration: 'Al-Infiṭār', arabicName: 'الإنفطار', revelationType: 'Makki', juz: '30' },
    { number: 83, englishName: 'Defrauders', transliteration: 'Al-Muṭaffifīn', arabicName: 'الْمُطَفِّفِين', revelationType: 'Makki', juz: '30' },
    { number: 84, englishName: 'Pulverization', transliteration: 'Al-Inshiqāq', arabicName: 'الإِنْشِقَاق', revelationType: 'Makki', juz: '30' },
    { number: 85, englishName: 'The Constellations', transliteration: 'Al-Burūj', arabicName: 'الْبُرُوج', revelationType: 'Makki', juz: '30' },
    { number: 86, englishName: 'The Striker', transliteration: 'Aṭ-Ṭāriq', arabicName: 'الطَّارِق', revelationType: 'Makki', juz: '30' },
    { number: 87, englishName: 'The Most High', transliteration: 'Al-Aʿlā', arabicName: 'الأَعْلَى', revelationType: 'Makki', juz: '30' },
    { number: 88, englishName: 'The Champion', transliteration: 'Al-Ghāshiyah', arabicName: 'الْغَاشِيَة', revelationType: 'Makki', juz: '30' },
    { number: 89, englishName: 'New Beginning', transliteration: 'Al-Fajr', arabicName: 'الْفَجْر', revelationType: 'Makki', juz: '30' },
    { number: 90, englishName: 'The Center', transliteration: 'Al-Balad', arabicName: 'الْبَلَد', revelationType: 'Makki', juz: '30' },
    { number: 91, englishName: 'The Sun', transliteration: 'Ash-Shams', arabicName: 'الشَّمْس', revelationType: 'Makki', juz: '30' },
    { number: 92, englishName: 'The Covering', transliteration: 'Al-Layl', arabicName: 'اللَّيْل', revelationType: 'Makki', juz: '30' },
    { number: 93, englishName: 'Bright Light', transliteration: 'Ad-Ḍuḥā', arabicName: 'الضُّحَى', revelationType: 'Makki', juz: '30' },
    { number: 94, englishName: 'Calmness in Fire', transliteration: 'Ash-Sharḥ', arabicName: 'الشَّرْح', revelationType: 'Makki', juz: '30' },
    { number: 95, englishName: 'The Testimony', transliteration: 'At-Tīn', arabicName: 'التِّين', revelationType: 'Makki', juz: '30' },
    { number: 96, englishName: 'The Sticky Clot', transliteration: 'Al-ʿAlaq', arabicName: 'الْعَلَق', revelationType: 'Makki', juz: '30' },
    { number: 97, englishName: 'Knowledge of Signs', transliteration: 'Al-Qadr', arabicName: 'الْقَدْر', revelationType: 'Makki', juz: '30' },
    { number: 98, englishName: 'The Clear Evidence', transliteration: 'Al-Bayyinah', arabicName: 'الْبَيِّنَة', revelationType: 'Madani', juz: '30' },
    { number: 99, englishName: 'The Earthquake', transliteration: 'Az-Zalzalah', arabicName: 'الزَّলْزَلَة', revelationType: 'Madani', juz: '30' },
    { number: 100, englishName: 'The Chargers', transliteration: 'Al-ʿĀdiyāt', arabicName: 'الْعَادِيَات', revelationType: 'Makki', juz: '30' },
    { number: 101, englishName: 'The Recompense', transliteration: 'Al-Qāriʿah', arabicName: 'الْقَارِعَة', revelationType: 'Makki', juz: '30' },
    { number: 102, englishName: 'The Rivalry', transliteration: 'At-Takāthur', arabicName: 'التَّكَاثُر', revelationType: 'Makki', juz: '30' },
    { number: 103, englishName: 'Time', transliteration: 'Al-ʿAṣr', arabicName: 'الْعَصْر', revelationType: 'Makki', juz: '30' },
    { number: 104, englishName: 'The Defamer', transliteration: 'Al-Humazah', arabicName: 'الْهُمَزَة', revelationType: 'Makki', juz: '30' },
    { number: 105, englishName: 'Might of Ignorance', transliteration: 'Al-Fīl', arabicName: 'الْفِيل', revelationType: 'Makki', juz: '30' },
    { number: 106, englishName: 'The Shark', transliteration: 'Quraysh', arabicName: 'قُرَيْش', revelationType: 'Makki', juz: '30' },
    { number: 107, englishName: 'Kindness', transliteration: 'Al-Māʿūn', arabicName: 'الْمَاعُون', revelationType: 'Makki', juz: '30' },
    { number: 108, englishName: 'Bounty', transliteration: 'Al-Kawthar', arabicName: 'الْكَوْثَر', revelationType: 'Makki', juz: '30' },
    { number: 109, englishName: 'The Disbelievers', transliteration: 'Al-Kāfirūn', arabicName: 'الْكَافِرُون', revelationType: 'Makki', juz: '30' },
    { number: 110, englishName: 'The Return', transliteration: 'An-Naṣr', arabicName: 'النَّصْر', revelationType: 'Madani', juz: '30' },
    { number: 111, englishName: 'The Chromosome', transliteration: 'Al-Masad', arabicName: 'الْمَسَد', revelationType: 'Makki', juz: '30' },
    { number: 112, englishName: 'The Absolute Truth', transliteration: 'Al-Ikhlāṣ', arabicName: 'الإِخْلَاص', revelationType: 'Makki', juz: '30' },
    { number: 113, englishName: 'Malice', transliteration: 'Al-Falaq', arabicName: 'الْفَلَق', revelationType: 'Makki', juz: '30' },
    { number: 114, englishName: 'Temptation', transliteration: 'An-Nās', arabicName: 'النَّاس', revelationType: 'Makki', juz: '30' }
];

export const TAFSIR_YOUTUBE_VIDEO_IDS: (string | null)[] = [
  'zE_WFiHnSlY', // 1
  'uRxyu_IoXJk', // 2
  'HUt0yOQ1G7I', // 3
  'LinJ2c2p10w', // 4
  '9Z2cbMsDnig', // 5
  '26OuAh4F4JM', // 6
  'kANt948lz-U', // 7
  'VXq8IoYLThA', // 8
  'lPlbDdDMFRQ', // 9
  'DwpNZqwyFYY', // 10
  '_rg7nLkgapI', // 11
  'KPbhRmyN1HM', // 12
  'fW4zWnKhxRo', // 13
  'Q77DT6cD_CY', // 14
  'PeASD3ZvPPo', // 15
  'G0-AhA8CfSc', // 16
  'qA6GsjuHYg0', // 17
  'Io0WdUNVZPc', // 18
  'hN73EbvBnZA', // 19
  '9t41Kbz0BNk', // 20
  'lWf9U5Aibao', // 21
  'kYgorM75UQc', // 22
  'udDESiugUu4', // 23
  'vEL9MlABLw4', // 24
  'pm8HtCEIPdI', // 25
  'Ovc9Ho4kwpk', // 26
  '40s7VOSKne0', // 27
  'lKX6S0jioB0', // 28
  'vUz3k6GHaOw', // 29
  'Z5pr6S_dl30', // 30
  'fMTJ3Ah9RUs', // 31
  'pVX71-tAjxQ', // 32
  'EbaZzVIg7Lw', // 33
  '4gGqPGHFK90', // 34
  '6Us3Fyjvj88', // 35
  'DJgLWmaIW6I', // 36
  'FZ8F_dmEN6E', // 37
  '4B9H7VxAKsg', // 38
  'rdXy9SWe5-g', // 39
  '8JChVV2bq6Q', // 40
  'WBc3IxbtQ1s', // 41
  'hQrV9UMlYuo', // 42
  'nGa1txHmV4U', // 43
  'CydFdttjlkQ', // 44
  '8DATnFWn8wE', // 45
  'eYNhuFsD_iA', // 46
  'AAldTkgNzY0', // 47
  'u4GMTG_dDpw', // 48
  '600SO5gF9ts', // 49
  'Qoy6dD8Iohk', // 50
  'nJY9Rmvki_k', // 51
  '16EWlSm4FNw', // 52
  'tU2UUTFyAGU', // 53
  'ZYlJnZ9hYiE', // 54
  'OOVDppL7wQs', // 55
  'YLkXsn98tLE', // 56
  'WHaD71jpRlI', // 57
  'R0jhcmgcWrU', // 58
  'ukpgUQc6ERE', // 59
  '5gicjcmA60o', // 60
  'vppEUNsG150', // 61
  '9F1C3C-Jv6w', // 62
  'PfKgReTRoTc', // 63
  'SPKG6zifhOs', // 64
  'WmlhJNgnVhI', // 65
  'WSIUgcs3xjo', // 66
  '4JxAn7d37PE', // 67
  '6URt9CLENyU', // 68
  'UfmIZSt83rs', // 69
  'giiHJ3s74Jo', // 70
  'K2jsIYfP9pw', // 71
  'ruvNPsgjADQ', // 72
  'vGDmnYVKVLI', // 73
  'ZSiHnXBor1k', // 74
  'LRQcawa4u_I', // 75
  'tWu3G26B1WA', // 76
  'hve0b58Ap6s', // 77
  'NOQw3wqovE8', // 78
  'awloGGBgYu0', // 79
  'sBSg0TGQ6D4', // 80
  'DZJKvnoA6ko', // 81
  'hFK1E69gFYk', // 82
  'wUS8-Z1cZT8', // 83
  'ssoRzBaCm3A', // 84
  'iaSiS4Nxtmk', // 85
  't3ZEawjTZ8I', // 86
  'uG6DK0ocg6I', // 87
  'x5C8BJ2xMPk', // 88
  'jm9mkPS97uI', // 89
  'ZlYJIhjAIUM', // 90
  'O85TsGrQ0C4', // 91
  'rDP0Tt7Mptg', // 92
  'Ud0p98T6W5I', // 93
  'z8650MHKmkI', // 94
  'FgZ41ZD9vrY', // 95
  'jyvxnLmGG6U', // 96
  'LmlRwmgeY2Q', // 97
  'Nn7i29QrHkM', // 98
  'Mda-1DO7XUM', // 99
  'Me94_pWewsg', // 100
  '9iO2n5CLUKc', // 101
  'PwBsIsvZo78', // 102
  '-fXHT_Jo_5s', // 103
  'AD2FTfde3gs', // 104
  'e-q9W3mHai0', // 105
  'EMKO5k_xiRE', // 106
  'h_fRlrH1ucI', // 107
  'ifq6UO66g78', // 108
  '-yStryGMqk0', // 109
  'GnOmpk-XFww', // 110
  'DLgZo1aazoY', // 111
  'UcxK4qDRMxk', // 112
  'l6NeK6nXgpo', // 113
  'EnRhAvlb9a4'  // 114
];

export const RECITATION_YOUTUBE_VIDEO_IDS: (string | null)[] = [
  "7Fvtzc5UROM",
  "JZ2E-ZTol-Y",
  "Wm8v3qytyoM",
  "j9bxF8TFr_E",
  "Hgg8GaZk8Cc",
  "FpSvOtVJDmk",
  "j9F8ruNHT_g",
  "k8sqL6FxFSI",
  "wbVzwKRIIJg",
  "1iIODTN3XyY",
  "lr4HP_NI71U",
  "0R1_dDZtOVE",
  "fz68eNJ_TgA",
  "XszewGqchow",
  "Iaz0oLHCQyc",
  "TEznTRHIaqI",
  "fpQkmla417I",
  "p9ao_uu_DL8",
  "MlCXPjpTVZk",
  "9ovoJSIjLCM",
  "gTF6RUYXtO4",
  "t4kSpJzR05o",
  "UyYmI5MJ2n0",
  "uIJuXmBVuCU",
  "rCBFZeZXUJM",
  "3KRJNPCAAFg",
  "o8xMIaUcuCQ",
  "GvlG9KQDkzg",
  "oq5UxEeS9Nk",
  "8cFM_KHfgDg",
  "oLynUnPFFL4",
  "Ejwq6JdxQFM",
  "YhWOmxUZZp0",
  "xmy7lwF3gxY",
  "6P8xKoNd334",
  "b1T08QyiJtQ",
  "3hKGmZjxAwI",
  "DarUkg7J69c",
  "iAQzbk1V4HU",
  "1i6S-wsaZnI",
  "7ZUV4i3JOL4",
  "TeUyzKXhebE",
  "LfOaXupGBJk",
  "I9x4q3ebXg0",
  "eRCEC535onw",
  "nZnFCqVjqM4",
  "0znbSzyMJeE",
  "6gDeA4lE5sI",
  "ggBhj5ZSdhU",
  "xaWtBQplVD0",
  "pgQ60MZ0do0",
  "tpUp0PthIpM",
  "IuwbcscwV4Q",
  "_HtgfvQjw6M",
  "sHDmxMrCfCw",
  "Kx-YYcL7XBw",
  "NrzQO3OWho4",
  "pKG5vrLNr8Y",
  "5GIauUkxTMM",
  "j_5h7T5-k0E",
  "TL8veAEwD90",
  "39QKHlaQ0Oo",
  "9rr_n6OeIwA",
  "YqBEP0ZRDIA",
  "30ncGPJ0isI",
  "chuGOJMmyYI",
  "lg1CMBElIRs",
  "3iG7OFiOF38",
  "-UAUqrHMscQ",
  "HyOcwHmSCTk",
  "ETsrw9k6omM",
  "81rZBp2dnkM",
  "PaA7uidkWTU",
  "pnmeUHAZcKQ",
  "t9Fr-JdvvFg",
  "Oq41HF6lhRg",
  "NzFcy8hH5vE",
  "Twrc1tKVC64",
  "azRV6zSEXvo",
  "Phjr_A4R0xA",
  "GqnrxXEapQE",
  "_UM7QJPaDOA",
  "vQLeVg9LIbQ",
  "EtIURK77xm0",
  "bKgH3qgZWME",
  "TH40BHw3JYM",
  "r4nuD16_3YI",
  "-EaJLJLvLxw",
  "VutDTBFE4SI",
  "pb8C6GLmEdQ",
  "RsuHTp62Ke0",
  "0PrWqEiTx2M",
  "RPrXBJFubfU",
  "drLcGby2sfg",
  "VEdGz0eiFho",
  "GTVz0Vz9xD0",
  "Ucr37sCgVDc",
  "fyXVBc-VBcA",
  "I18D74K1nwg",
  "yvYHXexHJXk",
  "y1mLFgYKHlU",
  "BGLRVtKYYEc",
  "fTxL90nLaa8",
  "mvtYbov_i6Y",
  "buEKayiLA68",
  "1Tp5XQqTuf4",
  "JeB2Jvav7BM",
  "V6ytr2Hwt3E",
  "0_MptIoOxTY",
  "O20UYue1evw",
  "B38aIm0rKXI",
  "mBAuwORZ6hU",
  "gwh4qpalsS4",
  "BxKPCVAUfKY"
];

export const ENGLISH_RECITATION_YOUTUBE_VIDEO_IDS: (string | null)[] = ["-PqP0BCiTlE","Z5zh5QCsjYY","_w2yG1bDJfo","0lMNMwTB5M8","w4uUvBMrVjc","jOfjatghBoI","0oL-AXH4CIw","eTcU3Zf0sY8","o8oghQgLJgY","We3rtNjBm7Q","OAnFuUtaC2k","iR611FNDTKM","lQDY7mSAk8M","g6Eb5HmxGLY","GEEWx8bGPXE","JmjP3wUqg74","6duZhHezK6A","QD9aNjDU9Ho","OwUZ6nN2gv4","ysW3-rcGjYc","MQETxncZBQY","RY7ivFuATrs","fXP00EBYbVI","NT9RaJhqVCQ","q3-gqFBLRpo","3WzT7JEPBVQ","4SMZ6rqTtaU","e9HzPCQcguY","pmTOuvsymY8","P8gj_sCH4sE","K7bYPrYb0jE","VVJrEkmB_iU","lqvtmMdHeZc","crH60rJRu3w","iGrKeuHIpIo","KRg6zxfw6ns","oNWAAu2l-jA","p9jG4auFA1c","L1e0GN87B8Y","Q7bw4bEFHuY","uL6LOHcpHzA","IzIUkwvf3kM","t_ICtiBEpqQ","WvGx6jvJ-RE","GC1ljIit6Xk","LIoF_gpNqTs","SnMxbUqhawY","94-DZBhWtK8","VaZPoBgSV3k","NdvaajwtUgs","-99kdKRhsnc","PL-G52U_wPI","d6uljCqZWlg","VzHSH5IaMM8","SBAuCo3d2cc","kG7J7XstEfY","z-HiFEzPYNw","e9JirdzSp_o","zwKlCQc3h18","hom0ZSH8ee8","V1SgL56qjd0","pNgp-Z0_xQQ","1RU0nYAl55Y","zAHxnSBWtXE","PSqVjqPa9sg","cUxdRRoVXQg","X7ItppxzaNw","-Rl5gaxlV2E","tWElN-OMMGM","bfVRJORl5Hw","1Exhv58tUwo","CnPm9jJOujI","harISWO2tJU","LmeZsukNq4c","t7RJnE9-AXU","FEgyzqrU5rE","ailp_ms37CM","uprYj4MZ3lE","QIJ5H8M0SKU","ChQ9io6uumg","StvXVPBbZQs","19Mp6pSvR0c","zpqOOtu9Qf0","CpwqV1H9ZVo","z3V6-fGaH9c","VzFsp8dbfdw","02S3jnoAY2k","SKuFg8kt1EI","ZwVSFJsjNlE","SzGtLMf3xJY","a77YrcF3QNg","HJM994cn1Fs","ICgxYb1X9I0","XoaQvMIXXf8","S4RN6imMO8Y","2R30TkTj1tY","Abr1lkUweTU","Mbkz_olg0Qw","XunR9qLCaco","Fa4qJZsXkcc","gWhVvANWOQs","R8D7rztcLkY","hbLAXTzKokU","O_H8_-OK5bI","Y2sfUdJ4e6o","-I2wz7rof0k","j4nxAfTOtdo","9JqOsNS8c8w","YPH1OZ0Zcow","tvznSJbFQ7M","ruZgKdhE1Os","R3t9ePIzleU","OS5PTyEB4gQ","AcVtT2d8-kk"];
