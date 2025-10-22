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
    { number: 82, englishName: 'The Shattering', transliteration: 'Al-Infitar', arabicName: 'الإِنْفِطَار', revelationType: 'Makki', juz: '30' },
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

// Data from youtubeData.ts
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
  'dMBxnQ9qbOo', // 50
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
  "MG8a19ER2IU",
  "1aDXh6yELHQ",
  "Wm8v3qytyoM",
  "zehctqI3fLI",
  "7BnqH1MGv4s",
  "FpSvOtVJDmk",
  "j9F8ruNHT_g",
  "Sw8iARA2WKw",
  "lB9lbU4NL6s",
  "fuRTbMV_KjA",
  "47IS2H7MpV8",
  "vtS8pw64Fp4",
  "NS-pDhYYzX4",
  "hut4cO0fBEw",
  "z4riptWsrGU",
  "4xU6bXVdDGw",
  "qHx9RANh5ms",
  "p9ao_uu_DL8",
  "K-X0YrHhgq0",
  "9ovoJSIjLCM",
  "gTF6RUYXtO4",
  "NSk4IfazBLM",
  "PV7HofmlvZk",
  "HG6onfnWI78",
  "SRDWh2FD-VU",
  "-gE8Z0N1WbM",
  "ymK7Uqu2hbo",
  "Z4dckv2-ldM",
  "hVQpebO1UcE",
  "CGCzgyf3t6o",
  "-dv8cEan4Wo",
  "Ejwq6JdxQFM",
  "oOBAWMrQqXA",
  "xmy7lwF3gxY",
  "dXaIES5yqNs",
  "b1T08QyiJtQ",
  "3hKGmZjxAwI",
  "0fPevHa24wo",
  "xG4QhjsTrN4",
  "cXFdzt54hSc",
  "_D_X_SOdXqc",
  "uyW1RIJLb8I",
  "BDuWEefYq7s",
  "roY7au_m-zE",
  "OieW42O96Xs",
  "xQ5Bk0x8dBo",
  "u8EEQdR-A0A",
  "NTLSD54BQNc",
  "_gxYfAUkl2w",
  "THIWLQizMEQ",
  "HQdJKlZOVt8",
  "qluScXL4oW8",
  "Evjb_RYrxZw",
  "_HtgfvQjw6M",
  "sHDmxMrCfCw",
  "jYCkj6i7Hxw",
  "C9m5JqCsLXg",
  "PagK0WnXovU",
  "V1lkUUMMMCg",
  "8UAKQEyfOFg",
  "eHH0hewLkDU",
  "gx_KOhLQDWI",
  "pjWXlu9dNj0",
  "F2o2ZDCYOsE",
  "xW4zIgcAdpI",
  "E2vuACBEZvY",
  "WT54-syfquk",
  "baGn0xBJGw0",
  "oe7vpzYCcD0",
  "i4IDBl9w0EA",
  "cIV7RsHzuUQ",
  "n8B0yfGVGOg",
  "PaA7uidkWTU",
  "ef00iLphJBM",
  "VRNNUWq36Mw",
  "JRn8Xc41nUI",
  "m8DVFQJ6GT8",
  "YhwKADryGhk",
  "Qat4LUGQz5w",
  "urmD67gU3M4",
  "5834C9bq7nI",
  "v-6XSGNCJqY",
  "MtLBLpB6ADo",
  "gLxHheIzo38",
  "nKCYk0GzDOw",
  "_IEeJWRAI9g",
  "iWYWP6zwA10",
  "hdq35MXNOd0",
  "IiWiB5PsJGk",
  "1iRI30_KBTc",
  "hmn4m9BEN9k",
  "r97OsWe8aJ4",
  "2GJA1g2QORc",
  "lqJIWX3xMH4",
  "66_8PJl9IoI",
  "6SY_Uw_9IvI",
  "xwqZSPBz7_s",
  "jieBtPczZHA",
  "_udvZk39sL4",
  "luwB1e5gm6U",
  "gZtuaPKs9M4",
  "5R2PS4wMlqg",
  "ZYy9vR8Depw",
  "wqgK14ZYV80",
  "r4f6wMDk-vs",
  "wYHkkbq_pg4",
  "uDwEHtQnPkY",
  "X1SZl_5az3s",
  "_czP4pUmYLI",
  "1oxdXlIXdqQ",
  "h9PsHYthiuk",
  "6FM3Mt0EYtY",
  "Uc1vj2dlJ8o",
  "7mb7yXbGkTE"
];


// Data from verseData.ts
interface VerseContent {
  english: string;
  bangla: string;
}

const verseContent = new Map<string, VerseContent>();
verseContent.set('1:7', { english: 'The path of those upon whom You have bestowed grace; not of those who have incurred anger, nor of those who go astray.', bangla: 'তাদের পথ, যাদের প্রতি আপনি অনুগ্রহ করেছেন—না তাদের পথ যাদের উপর রাগ নেমেছে, না তাদের পথ যারা পথভ্রষ্ট।' });
verseContent.set('2:286', { english: 'Allah does not burden a soul beyond its capacity… You are our Protector, so grant us victory over the disbelieving people.', bangla: 'আল্লাহ্‌ কাউকে তার সামর্থ্যের বাইরে বোঝা দেন না… আপনি আমাদের অভিভাবক, সুতরাং অবিশ্বাসীদের বিরুদ্ধে আমাদেরকে জয় দিন।' });
verseContent.set('3:200', { english: 'O you who believe, be patient, persevere, stand on guard, and be mindful of Allah so that you may prosper.', bangla: 'হে মুমিনরা, ধৈর্য ধরো, স্থির থাকো, সতর্ক থাকো, এবং আল্লাহকে মনে রেখো—তাহলেই সাফল্য পাবে।' });
verseContent.set('4:176', { english: 'They ask you for a ruling… Allah makes clear to you lest you go astray; and Allah is Knowing of all things.', bangla: 'তারা তোমার কাছে বিধান জিজ্ঞেস করে… আল্লাহ তোমাদের জন্য পরিষ্কার করে দেন, যাতে তোমরা পথভ্রষ্ট না হও; আল্লাহ সবকিছু জানেন।' });
verseContent.set('5:120', { english: 'To Allah belongs the dominion of the heavens and the earth and whatever is in them. He is Powerful over all things.', bangla: 'আসমান ও জমিন এবং তাতে যা আছে—সবকিছুর মালিক আল্লাহ। তিনি সবকিছুর ওপর সক্ষম।' });
verseContent.set('6:165', { english: 'He made you successors on earth… your Lord is swift in punishment, and Forgiving, Most Merciful.', bangla: 'তিনি তোমাদেরকে পৃথিবীতে প্রতিনিধি করেছেন… তোমার প্রভু শাস্তিতে দ্রুত, আর তিনি ক্ষমাশীল, পরম দয়ালু।' });
verseContent.set('7:206', { english: 'Those who are with your Lord are not too proud to worship Him; they glorify Him and fall prostrate before Him.', bangla: 'তোমার প্রভুর নিকটবর্তী যারা, তারা ইবাদতে অহংকার করে না; তারা তাঁকে পবিত্রতা ঘোষণা করে ও সেজদা করে।' });
verseContent.set('8:75', { english: 'Those who believed afterward and emigrated and strove with you… Allah is fully aware of all things.', bangla: 'যারা পরে ঈমান এনেছে, হিজরত করেছে ও তোমাদের সঙ্গে সংগ্রাম করেছে—তারা তোমাদেরই অন্তর্ভুক্ত; তবু আল্লাহর বিধানে রক্তের আত্মীয়তার অধিকার বেশি। আল্লাহ সবকিছু জানেন।' });
verseContent.set('9:127', { english: 'Whenever a surah is revealed, they look at one another, “Does anybody see you?” Then they leave…', bangla: 'যখনই একটি সূরা নাজিল হয়, তারা একে অন্যের দিকে তাকায়—“কেউ কি দেখছে?”—তারপর সরে যায়। আল্লাহ তাদের হৃদয় ঘুরিয়ে দেন, কারণ তারা বোঝে না।' });
verseContent.set('10:109', { english: 'Follow what is revealed to you and be patient until Allah judges. He is the best of judges.', bangla: 'তোমার প্রতি যা অবতীর্ণ হয়েছে তা অনুসরণ করো এবং আল্লাহ্‌ ফয়সালা না করা পর্যন্ত ধৈর্য ধরো। তিনিই শ্রেষ্ঠ বিচারক।' });
verseContent.set('11:123', { english: 'To Allah belongs the unseen of the heavens and the earth… so worship Him and rely upon Him.', bangla: 'আসমান-জমিনের অদেখা বিষয় আল্লাহরই। সমস্ত বিষয় তাঁরই দিকে ফিরে যায়; অতএব তাঁর ইবাদত করো এবং তাঁরই ওপর ভরসা করো।' });
verseContent.set('12:111', { english: 'In their stories is a lesson for people of understanding… a guidance and mercy for people who believe.', bangla: 'তাদের কাহিনিতে জ্ঞানীদের জন্য শিক্ষা আছে… এটা বানানো কথা নয়; পূর্ববর্তী বিষয়ের সত্যতা, সব কিছুর ব্যাখ্যা, হিদায়াত ও মুমিনদের জন্য দয়া।' });
verseContent.set('13:43', { english: 'The disbelievers say, “You are not a messenger.” Say, “Allah suffices as a witness between me and you, and whoever has knowledge of the Scripture.”', bangla: 'অবিশ্বাসীরা বলে, “তুমি রসূল নও।” বলো, “আমার ও তোমাদের মাঝে সাক্ষী হিসেবে আল্লাহই যথেষ্ট, আর যাদের কাছে কিতাবের জ্ঞান আছে তারাও।”' });
verseContent.set('14:52', { english: 'This is a proclamation to the people… to know that He is only one God, so people of intelligence may take heed.', bangla: 'এটি সকল মানুষের জন্য ঘোষণা—যাতে তারা সতর্ক হয়, বুঝে যে উপাস্য একমাত্র আল্লাহ; আর বুদ্ধিমানরা শিক্ষা নেয়।' });
verseContent.set('15:99', { english: 'And worship your Lord until certainty comes to you.', bangla: 'আর তোমার প্রভুর ইবাদত করো যতক্ষণ না তোমার কাছে নিশ্চিততা (মৃত্যু) আসে।' });
verseContent.set('16:128', { english: 'Allah is with those who lead a righteous life and those who are charitable.', bangla: 'আল্লাহ তাদের সঙ্গে থাকেন যারা সৎকর্ম করে এবং দানশীল হয়।' });
verseContent.set('17:111', { english: 'Praise be to Allah, who has not taken a son… magnify Him gloriously.', bangla: 'সব প্রশংসা আল্লাহর—তিনি কোন সন্তান নেননি, তাঁর শাসনে কোন অংশীদার নেই, দুর্বলতার কারণে কোন সহায়ও লাগেনি; তাঁকে মহিমায় মহিমান্বিত করো।' });
verseContent.set('18:110', { english: 'Say, “I am only a human like you; it is inspired to me that your God is One God… do righteous work and do not associate anyone in worship.”', bangla: 'বলো, “আমি তোমাদের মতোই মানুষ; আমার কাছে ওহি এসেছে যে তোমাদের উপাস্য এক আল্লাহ। যে তাঁর সাক্ষাৎ আশা করে, সে সৎকর্ম করুক এবং উপাসনায় কাউকে শরিক না করুক।”' });
verseContent.set('19:98', { english: 'How many generations We destroyed before them… do you hear from them a whisper?', bangla: 'তাদের আগে আমরা কত জাতিকে ধ্বংস করেছি—আজ কি তাদের কাউকে দেখো, বা তাদের ক্ষীণ কোন শব্দ শোনো?' });
verseContent.set('20:135', { english: 'Say, “Each of us is waiting; so wait; you will know who is on the straight path and rightly guided.”', bangla: 'বলো, “আমরা প্রত্যেকেই অপেক্ষা করছি; তোমরাও অপেক্ষা করো—শিগগিরই জানতে পারবে কে সরল পথে আছে এবং কে সঠিকভাবে পথপ্রাপ্ত।”' });
verseContent.set('21:112', { english: 'He said, “My Lord, judge with truth! Our Lord is the Gracious, whose help is sought against what you allege.”', bangla: 'তিনি বললেন, “হে আমার প্রভু, সত্যের সাথে ফয়সালা করুন। আমাদের প্রভু পরম করুণাময়—তাঁর কাছেই আমরা তোমাদের অভিযোগের বিরুদ্ধে সাহায্য চাই।”' });
verseContent.set('22:78', { english: 'Strive in Allah’s cause as you should strive… observe prayer, give charity, hold fast to Allah; an excellent Protector and Supporter.', bangla: 'আল্লাহর পথে যথাযথ চেষ্টা করো… সালাত কায়েম করো, যাকাত দাও, আল্লাহকে আঁকড়ে ধরো—তিনি কতই না উত্তম অভিভাবক ও সহায়!' });
verseContent.set('23:118', { english: 'And say, “My Lord, forgive and have mercy; You are the Best of the merciful.”', bangla: 'বলো, “হে প্রভু, ক্ষমা করুন ও দয়া করুন; আপনি তো সর্বদয়ীদের শ্রেষ্ঠ।”' });
verseContent.set('24:64', { english: 'To Allah belongs whatever is in the heavens and the earth… He will inform them of what they did.', bangla: 'আসমান-জমিনে যা কিছু আছে—সব আল্লাহর। তারা তাঁর কাছে ফিরে যাবে এবং তিনি তাদের কাজগুলো জানিয়ে দেবেন। আল্লাহ সবকিছুর খবর রাখেন।' });
verseContent.set('25:77', { english: 'Say, “My Lord would not care about you were it not for your worship… you have disbelieved, so it will be inevitable.”', bangla: 'বলো, “তোমাদের উপাসনা না থাকলে আমার প্রভু তোমাদের পরোয়া করতেন না… তোমরা অস্বীকার করেছ—অতএব পরিণাম অবশ্যম্ভাবী।”' });
verseContent.set('26:227', { english: 'Except those who believe, do righteous deeds, remember Allah often, and defend themselves after being wronged…', bangla: 'তবে তারা নয়—যারা ঈমান এনেছে, সৎকর্ম করেছে, আল্লাহকে বেশি স্মরণ করে এবং জুলুমের পর নিজের অধিকার রক্ষা করে। শিগগিরই অপরাধীরা জানতে পারবে তারা কোথায় যাবে।' });
verseContent.set('27:93', { english: 'Say, “Praise be to Allah; He will show you His signs and you will recognize them.”', bangla: 'বলো, “সব প্রশংসা আল্লাহর; তিনি তোমাদেরকে তাঁর নিদর্শন দেখাবেন—তোমরা সেগুলো চিনে নেবে।” তোমাদের কাজকর্ম থেকে তোমার প্রভু অগোচর নন।' });
verseContent.set('28:88', { english: 'Do not call on any other god with Allah… everything will perish except His Face; to Him is the judgment and to Him you will return.', bangla: 'আল্লাহ ছাড়া আর কাউকে ডাকো না—তিনি ব্যতীত কোন উপাস্য নেই। তাঁর মুখ ছাড়া সবই ধ্বংস হবে। সিদ্ধান্ত তাঁরই, এবং তোমরা তাঁর দিকেই ফিরে যাবে।' });
verseContent.set('29:69', { english: 'Those who strive in Us—We will surely guide them to Our paths. Allah is with the righteous.', bangla: 'যারা আমাদের পথে চেষ্টা করে—আমরা অবশ্যই তাদেরকে আমাদের পথগুলো দেখাই। আল্লাহ সৎকর্মশীলদের সাথে থাকেন।' });
verseContent.set('30:60', { english: 'So be patient; Allah’s promise is true. Do not be dissuaded by those who do not believe.', bangla: 'সুতরাং ধৈর্য ধরো—আল্লাহর প্রতিশ্রুতি সত্য। যারা বিশ্বাস করে না তাদের দ্বারা নিরুৎসাহিত হয়ো না।' });
verseContent.set('31:34', { english: 'With Allah is knowledge of the Hour… no soul knows what it will earn tomorrow or in which land it will die.', bangla: 'কিয়ামতের জ্ঞান আল্লাহর কাছে। তিনি বৃষ্টি নামান, গর্ভে যা আছে জানেন; কেউ জানে না কাল সে কী উপার্জন করবে, আর কোন ভূমিতে তার মৃত্যু হবে। আল্লাহ সর্বজ্ঞ, সর্ব-বিবেচক।' });
verseContent.set('32:30', { english: 'Therefore, disregard them and wait; they too are waiting.', bangla: 'অতএব তুমি তাদেরকে উপেক্ষা করো এবং অপেক্ষা করো—তরাও অপেক্ষা করছে।' });
verseContent.set('33:73', { english: 'Thus Allah will recompense the hypocrite men and women, and the idolater men and women, and Allah will turn in mercy to the believing men and women.', bangla: 'এভাবে আল্লাহ মুনাফিক পুরুষ-নারী ও মুশরিক পুরুষ-নারীদের প্রতিফল দেবেন, আর মুমিন পুরুষ-নারীদের প্রতি দয়া করবেন। আল্লাহ ক্ষমাশীল, পরম দয়ালু।' });
verseContent.set('34:54', { english: 'They rejected it before… they used to conjecture about the unseen from afar.', bangla: 'তারা আগেই তা অস্বীকার করেছিল; দূর থেকে অদৃশ্য সম্পর্কে আন্দাজ-আলোচনা করত।' });
verseContent.set('35:45', { english: 'If Allah were to punish people for their sins, He would not leave upon it any creature; but He defers them to a fixed term…', bangla: 'মানুষকে তাদের পাপের কারণে যদি আল্লাহ পাকড়াও করতেন, তবে ভূ-পৃষ্ঠে একটি প্রাণীও রক্ষা পেত না; কিন্তু তিনি নির্ধারিত সময় পর্যন্ত অবকাশ দেন। সময় এলে তিনি তাঁর বান্দাদের দেখেন।' });
verseContent.set('36:83', { english: 'Glory be to the One in whose hand is the kingship of all things, and to Him you will be returned.', bangla: 'পবিত্র সেই সত্তা, যার হাতে সব কিছুর কর্তৃত্ব—আর তোমরা তাঁরই দিকে ফিরে যাবে।' });
verseContent.set('37:182', { english: 'Praise be to Allah, Lord of the universe.', bangla: 'সব প্রশংসা আল্লাহর, বিশ্বজাহানের প্রভুর।' });
verseContent.set('38:88', { english: 'And you will surely find out its news after some time.', bangla: 'কিছুদিন পরেই তোমরা অবশ্যই এ বিষয়ের সংবাদ জেনে যাবে।' });
verseContent.set('39:75', { english: 'You will see the angels surrounding the Throne, glorifying and praising their Lord… “Praise be to Allah, Lord of the worlds.”', bangla: 'তুমি ফেরেশতাদের দেখবে আরশকে পরিবেষ্টন করে তাদের প্রভুকে তাসবিহ-তাহমিদ করছে… বলা হবে, “সব প্রশংসা আল্লাহর, বিশ্বজগতের প্রভুর।”' });
verseContent.set('40:85', { english: 'Their belief, when they saw Our punishment, did not benefit them… this is Allah’s way with His servants.', bangla: 'শাস্তি দেখার পর তাদের ঈমান কোন কাজে আসেনি—এটাই আল্লাহর আইন; আর কাফিররা ক্ষতিগ্রস্তই হয়।' });
verseContent.set('41:54', { english: 'They are in doubt about the meeting of their Lord; absolutely He encompasses all things.', bangla: 'তারা তাদের প্রভুর সাক্ষাৎ নিয়ে সন্দেহে আছে; নিশ্চিতভাবেই তিনি সবকিছুকে ঘিরে রেখেছেন।' });
verseContent.set('42:53', { english: 'The path of Allah—to Him belongs everything in the heavens and on earth; all matters are controlled by Allah.', bangla: 'আল্লাহর পথ—আসমান ও জমিনের সবই তাঁর; সমস্ত বিষয় আল্লাহরই নিয়ন্ত্রণে।' });
verseContent.set('43:89', { english: 'You shall disregard them and say, “Peace”; then wait, they will come to know.', bangla: 'তুমি তাদেরকে উপেক্ষা করো এবং বলো, “শান্তি”—তারপর অপেক্ষা করো; তারা জেনে যাবে।' });
verseContent.set('44:59', { english: 'Therefore, wait; they too are waiting.', bangla: 'সুতরাং অপেক্ষা করো; তারাও অপেক্ষায় আছে।' });
verseContent.set('45:37', { english: 'To Allah belongs all praise—Lord of the heavens, the earth, and the worlds—Almighty, Most Wise.', bangla: 'সকল প্রশংসা আল্লাহর—আসমান, জমিন ও সৃষ্টিজগতের প্রভু—তিনি পরাক্রমশালী, প্রজ্ঞাময়।' });
verseContent.set('46:35', { english: 'Be patient like the resolute messengers; when they see what they were promised, they will think they stayed but an hour.', bangla: 'দৃঢ়প্রতিজ্ঞ রসূলদের মতো ধৈর্য ধরো; তারা প্রতিশ্রুত জিনিস দেখলে মনে করবে, যেন মাত্র এক ঘন্টার মতো ছিল।' });
verseContent.set('47:38', { english: 'If you turn away, He will replace you with other people, and they will not be like you.', bangla: 'তোমরা ফিরলে তিনি তোমাদের বদলে অন্য জাতি আনবেন—তারা তোমাদের মতো হবে না।' });
verseContent.set('48:29', { english: 'Muhammad is the messenger of Allah… stern against disbelievers, compassionate among themselves… Allah promises forgiveness and a great reward.', bangla: 'মুহাম্মদ আল্লাহর রসূল… অবিশ্বাসীদের প্রতি দৃঢ়, নিজেদের মাঝে দয়ালু… আল্লাহ তাদেরকে ক্ষমা ও মহান প্রতিদান প্রতিশ্রুতি দেন।' });
verseContent.set('49:18', { english: 'Indeed, Allah knows the unseen of the heavens and the earth, and He sees what you do.', bangla: 'আল্লাহ আসমান-জমিনের অদেখা জানেন; তোমরা যা করো তিনি দেখেন।' });
verseContent.set('50:45', { english: 'We know what they say; you are not a controller over them—so remind with the Quran whoever fears My warning.', bangla: 'তারা যা বলে আমরা জানি; তুমি তাদের ওপর জবরদস্তি কর্তা নও—অতএব যে আমার সতর্কতাকে ভয় করে তাকে কুরআন দিয়ে স্মরণ করাও।' });
verseContent.set('51:60', { english: 'Woe to the disbelievers on that Day.', bangla: 'সেদিন অবিশ্বাসীদের জন্য ধ্বংস।' });
verseContent.set('52:49', { english: 'And during part of the night, and at dawn—glorify Him.', bangla: 'রাতের একাংশে ও ভোরে—তাঁর তাসবিh করো।' });
verseContent.set('53:62', { english: 'So fall prostrate before Allah and worship Him.', bangla: 'অতএব আল্লাহকে সেজদা করো এবং তাঁরই ইবাদত করো।' });
verseContent.set('54:55', { english: 'In a seat of truth, with an Omnipotent King.', bangla: 'সত্যের আসনে, সর্বশক্তিমান বাদশাহর সান্নিধ্যে।' });
verseContent.set('55:78', { english: 'Blessed is the name of your Lord, Possessor of Majesty and Honor.', bangla: 'মহিমা ও মর্যাদার অধিকারী তোমার প্রভুর নাম কত বরকতময়!' });
verseContent.set('56:96', { english: 'So glorify the name of your Lord, the Most Great.', bangla: 'সুতরাং তোমার মহান প্রভুর নাম পবিত্রতা ঘোষণা করো।' });
verseContent.set('57:29', { english: 'That the People of the Scripture may know they have no control over Allah’s grace; it is in Allah’s hand, He gives to whom He wills.', bangla: 'কিতাবওয়ালারা যেন জানে—আল্লাহর অনুগ্রহের ওপর তাদের কোন কর্তৃত্ব নেই; অনুগ্রহ আল্লাহর হাতে, তিনি যাকে ইচ্ছা দেন।' });
verseContent.set('58:22', { english: 'You will not find people who believe in Allah and the Last Day loving those who oppose Allah and His messenger… they are Allah’s party, the successful.', bangla: 'আল্লাহ ও পরকালে বিশ্বাসীরা আল্লাহ ও তাঁর রসূলের বিরোধীদেরকে ভালোবাসে না… তারাই আল্লাহর দল—সফল।' });
verseContent.set('59:24', { english: 'He is Allah—no god except Him: the King, the Holy, the Peace, the Faithful, the Protector, the Almighty, the Compeller, the Supreme.', bangla: 'তিনিই আল্লাহ—তাঁকে ছাড়া কোন উপাস্য নেই: বাদশাহ, পবিত্র, শান্তির দাতা, বিশ্বাসযোগ্য, রক্ষাকারী, পরাক্রমশালী, জবরদস্ত, মহীয়ান।' });
verseContent.set('60:13', { english: 'O you who believe, do not ally with a people upon whom is Allah’s wrath; they despair of the Hereafter like the disbelievers of the graves.', bangla: 'হে মুমিনরা, যাদের ওপর আল্লাহর রাগ নেমেছে তাদেরকে বন্ধু করো না; তারা আখিরাত থেকে বঞ্চিত—যেমন কবরবাসীদের ব্যাপারে কাফিররা হতাশ।' });
verseContent.set('61:14', { english: 'O you who believe, be Allah’s supporters—like Jesus son of Mary said to the disciples… We supported the believers and they became dominant.', bangla: 'হে মুমিনরা, আল্লাহর সহায়ক হও—যেমন মরিয়মপুত্র ঈসা হাওয়ারিদের বলেছিলেন… আমরা মুমিনদের সাহায্য করেছি, তারা বিজয়ী হয়েছে।' });
verseContent.set('62:11', { english: 'When they see trade or entertainment they rush to it and leave you standing—say, what is with Allah is better than entertainment and trade.', bangla: 'তারা যখন বাণিজ্য বা খেলাধুলা দেখে তখন তড়িঘড়ি ছুটে যায় এবং তোমাকে দাঁড় করিয়ে রাখে—বল, আল্লাহর নিকট যা আছে তা খেলাধুলা ও বাণিজ্যের চেয়ে উত্তম।' });
verseContent.set('63:11', { english: 'Allah will not delay a soul when its time has come; Allah is fully aware of what you do.', bangla: 'নির্দিষ্ট সময় এলে আল্লাহ কোন প্রাণের সময় বাড়ান না; তোমরা যা করো তিনি অবগত।' });
verseContent.set('64:18', { english: 'Knower of the unseen and the seen—the Almighty, the All-Wise.', bangla: 'অদেখা ও দৃশ্যমানের জ্ঞানী—পরাক্রমশালী, প্রজ্ঞাময়।' });
verseContent.set('65:12', { english: 'Allah created seven heavens, and of the earth the like of them; the command descends between them… Allah has encompassed all things in knowledge.', bangla: 'আল্লাহ সাত আসমান সৃষ্টি করেছেন এবং তদ্রূপ জমিন; তাদের মাঝে আদেশ নাজিল হয়… আল্লাহ সবকিছুকে জ্ঞানে পরিবেষ্টন করেছেন।' });
verseContent.set('66:12', { english: 'And Mary, daughter of Imran, who guarded her chastity; We blew into her of Our spirit; she believed in her Lord’s words and scriptures and was obedient.', bangla: 'ইমরানের কন্যা মরিয়ম—তিনি লজ্জাস্থান রক্ষা করেছিলেন; আমরা তাঁর মধ্যে নিজেদের পক্ষ থেকে রূহ ফুঁকে দিয়েছিলাম; তিনি প্রভুর বাণী ও কিতাবে বিশ্বাস করেছিলেন এবং অনুগত ছিলেন।' });
verseContent.set('67:30', { english: 'Say, if your water were to vanish, who then could bring you flowing water?', bangla: 'বলো, যদি তোমাদের পানি মাটির নিচে ডুবে যায়, তবে কে তোমাদেরকে প্রবহমান পানি এনে দেবে?' });
verseContent.set('68:52', { english: 'It is nothing but a reminder for the worlds.', bangla: 'এটি তো শুধু বিশ্বজগতের জন্য এক উপদেশ।' });
verseContent.set('69:52', { english: 'So glorify the name of your Lord, the Most Great.', bangla: 'সুতরাং তোমার মহান প্রভুর নাম পবিত্রতা ঘোষণা করো।' });
verseContent.set('70:44', { english: 'Their eyes humbled, humiliation will cover them; that is the Day which they were promised.', bangla: 'তাদের চোখ নিচু, লাঞ্ছনা তাদের ঢেকে নেবে—এটাই সেই দিন যা তাদেরকে প্রতিশ্রুতি দেওয়া হয়েছিল।' });
verseContent.set('71:28', { english: '“My Lord, forgive me, my parents, and the believers on the Day of Reckoning.”', bangla: '“হে আমার প্রভু, আমাকে, আমার পিতা-মাতাকে এবং মুমিনদেরকে হিসাবের দিনে ক্ষমা করুন।”' });
verseContent.set('72:28', { english: 'So that He may know that they have conveyed their Lord’s messages; He encompasses what is with them and has counted everything in number.', bangla: 'যাতে তিনি জানতে পারেন যে তারা প্রভুর বার্তা পৌঁছে দিয়েছে; তিনি তাদেরকে ঘিরে রেখেছেন এবং সবকিছুকে সংখ্যা অনুযায়ী গণনা করেছেন।' });
verseContent.set('73:20', { english: 'Recite what is easy for you of the Quran… establish prayer, give charity… seek Allah’s forgiveness; Allah is Forgiving, Merciful.', bangla: 'কুরআন থেকে যা তোমাদের পক্ষে সহজ—তা পড়ো… সালাত কায়েম করো, যাকাত দাও… আল্লাহর কাছে ক্ষমা চাও; আল্লাহ ক্ষমাশীল, দয়ালু।' });
verseContent.set('74:56', { english: 'It is only a reminder—whoever wills will remember; but they will not remember unless Allah wills; He is worthy of fear and worthy of granting forgiveness.', bangla: 'এটা তো শুধুই উপদেশ—যে ইচ্ছা করে সে স্মরণ করবে; কিন্তু আল্লাহ না চাইলে তারা স্মরণ করতে পারে না; তিনিই ভয়ের উপযুক্ত, ক্ষমারও মালিক।' });
verseContent.set('75:40', { english: 'Is He not able to give life to the dead?', bangla: 'তিনি কি মৃতকে জীবন দিতে অক্ষম?' });
verseContent.set('76:31', { english: 'He admits whom He wills into His mercy; for the wrongdoers He has prepared a painful punishment.', bangla: 'তিনি যাকে ইচ্ছা দয়ার অন্তর্ভুক্ত করেন; আর অবাধ্যদের জন্য তিনি কষ্টদায়ক শাস্তি প্রস্তুত রেখেছেন।' });
verseContent.set('77:50', { english: 'So in which statement after this will they believe?', bangla: 'তাহলে এ কথার পর আর কোন কথায় তারা বিশ্বাস করবে?' });
verseContent.set('78:40', { english: 'We have warned you of an imminent punishment—the Day each soul will see what it sent ahead, and the disbeliever will say, “I wish I were dust.”', bangla: 'আমরা তোমাদেরকে আসন্ন শাস্তির কথা সতর্ক করেছি—সেদিন প্রত্যেকেই তার পাঠানো কাজ দেখবে, আর অবিশ্বাসী বলবে, “হায়, যদি আমি ধুলো হতাম!”' });
verseContent.set('79:46', { english: 'The day they see it, they will feel as if they stayed but an evening or its morning.', bangla: 'যেদিন তারা সেটা দেখবে, মনে হবে যেন এক সন্ধ্যা বা তার সকালটুকুই ছিল।' });
verseContent.set('80:42', { english: 'Those are the disbelievers, the wicked.', bangla: 'তারাই অবিশ্বাসী, পাপী।' });
verseContent.set('81:29', { english: 'You do not will unless Allah wills—the Lord of the worlds.', bangla: 'তোমরা ইচ্ছা করতে পারো না—যদি না আল্লাহ চান; তিনি বিশ্বজগতের প্রভু।' });
verseContent.set('82:19', { english: 'A Day when no soul will have power for another soul; the command on that Day is Allah’s.', bangla: 'সেদিন কোন প্রাণ অন্য প্রাণের জন্য কিছুই করতে পারবে না; সেদিন সব আদেশ আল্লাহরই।' });
verseContent.set('83:36', { english: 'Are the disbelievers not paid in full for what they used to do?', bangla: 'অবিশ্বাসীরা কি তাদের কাজের পূর্ণ প্রতিফল পায় না?' });
verseContent.set('84:25', { english: 'Except those who believe and do righteous deeds—for them is an unending reward.', bangla: 'তবে যারা ঈমান এনেছে ও সৎকর্ম করেছে—তাদের জন্য অবিরাম প্রতিদান।' });
verseContent.set('85:22', { english: 'In a preserved Tablet.', bangla: 'এক সংরক্ষিত তক্তায়।' });
verseContent.set('86:17', { english: 'So give the disbelievers a little respite.', bangla: 'অতএব অবিশ্বাসীদেরকে একটু অবকাশ দাও।' });
verseContent.set('87:19', { english: 'The scriptures of Abraham and Moses.', bangla: 'ইবরাহিম ও মূসার সহীফাগুলো।' });
verseContent.set('88:26', { english: 'Then upon Us is their account.', bangla: 'তারপর তাদের হিসাব আমাদেরই দায়িত্ব।' });
verseContent.set('89:30', { english: '“Enter My Paradise.”', bangla: '“আমার জান্নাতে প্রবেশ করো।”' });
verseContent.set('90:20', { english: 'A Fire will be closed in on them.', bangla: 'তাদেরকে ঘিরে আগুন চাপিয়ে দেওয়া হবে।' });
verseContent.set('91:15', { english: 'So He leveled it, and He does not fear its consequence.', bangla: 'অতঃপর তিনি সব সমান করে দিয়েছেন; তিনি তার পরিণামকে ভয় করেন না।' });
verseContent.set('92:21', { english: 'And soon he will be satisfied—who seeks the Face of his Lord, the Most High.', bangla: 'শীঘ্রই তৃপ্ত হবে সে—যে মহাউচ্চ প্রভুর সন্তুষ্টি চায়।' });
verseContent.set('93:11', { english: 'As for the favor of your Lord—proclaim it.', bangla: 'আর তোমার প্রভুর অনুগ্রহ—তা প্রকাশ করো।' });
verseContent.set('94:8', { english: 'And to your Lord turn your longing.', bangla: 'আর তোমার আকাঙ্ক্ষা তোমার প্রভুর দিকেই ফেরাও।' });
verseContent.set('95:8', { english: 'Is not Allah the wisest of judges?', bangla: 'আল্লাহ কি সর্বশ্রেষ্ঠ বিচারক নন?' });
verseContent.set('96:19', { english: 'No! Do not obey him; but prostrate and draw near.', bangla: 'কখনো না! তাকে মানবে না; বরং সেজদা করো এবং নিকটবর্তী হও।' });
verseContent.set('97:5', { english: 'Peace it is until the break of dawn.', bangla: 'এ রাত শান্তি—ফজর উদয় হওয়া পর্যন্ত।' });
verseContent.set('98:8', { english: 'Their reward with their Lord is Gardens of Eternity beneath which rivers flow… Allah is pleased with them and they are pleased with Him.', bangla: 'তাদের প্রতিদান তাদের প্রভুর কাছে—চিরস্থায়ী উদ্যান, যার তলদেশে নদী প্রবাহিত… আল্লাহ তাদের প্রতি সন্তুষ্ট, আর তারা আল্লাহর প্রতি সন্তুষ্ট।' });
verseContent.set('99:8', { english: 'And whoever does an atom’s weight of evil will see it.', bangla: 'যে অণু পরিমাণ মন্দ করবে—সে তা দেখবে।' });
verseContent.set('100:11', { english: 'Indeed, their Lord on that Day is fully aware of them.', bangla: 'নিশ্চয়ই সেদিন তাদের প্রভু তাদের ব্যাপারে সম্পূর্ণ অবগত।' });
verseContent.set('101:11', { english: 'A blazing Fire.', bangla: 'জ্বলে ওঠা আগুন।' });
verseContent.set('102:8', { english: 'Then you will surely be asked that Day about the delights.', bangla: 'তারপর সেদিন তোমাদেরকে অবশ্যই নিয়ামত সম্পর্কে জিজ্ঞেস করা হবে।' });
verseContent.set('103:3', { english: 'Except those who believe, do righteous deeds, and enjoin one another to truth and patience.', bangla: 'তবে তারা নয়—যারা ঈমান এনেছে, সৎকর্ম করেছে, এবং একে অন্যকে সত্য ও ধৈর্যের উপদেশ দিয়েছে।' });
verseContent.set('104:9', { english: 'In columns extended.', bangla: 'লম্বা লম্বা খুঁটির মতো (শাস্তিতে)।' });
verseContent.set('105:5', { english: 'So He made them like eaten straw.', bangla: 'অতঃপর তিনি তাদেরকে খাওয়া ভুসির মতো করে দিলেন।' });
verseContent.set('106:4', { english: 'Who fed them against hunger and secured them against fear.', bangla: 'যিনি তাদেরকে ক্ষুধা থেকে খাদ্য দিয়েছেন এবং ভয় থেকে নিরাপত্তা দিয়েছেন।' });
verseContent.set('107:7', { english: 'Yet they withhold small kindnesses.', bangla: 'তবু তারা ক্ষুদ্র উপকারও বঞ্চিত করে।' });
verseContent.set('108:3', { english: 'Indeed, your hater—he is the one cut off.', bangla: 'নিশ্চয়ই তোমার শত্রুই বিচ্ছিন্ন-সন্তানহীন।' });
verseContent.set('109:6', { english: 'To you your religion, and to me my religion.', bangla: 'তোমাদের জন্য তোমাদের ধর্ম, আর আমার জন্য আমার ধর্ম।' });
verseContent.set('110:3', { english: 'Then glorify the praise of your Lord and seek His forgiveness; He is Oft-Returning.', bangla: 'তখন তোমার প্রভুর প্রশংসা ঘোষণা করো ও তাঁর কাছে ক্ষমা চাও; নিশ্চয়ই তিনি বারংবার ফেরেন (দয়া করেন)।' });
verseContent.set('111:5', { english: 'Around her neck is a rope of twisted palm-fiber.', bangla: 'তার গলায় খেজুরের আঁশের পাকানো দড়ি।' });
verseContent.set('112:4', { english: 'And none is comparable to Him.', bangla: 'এবং তাঁর সমতুল্য কেউ নেই।' });
verseContent.set('113:5', { english: 'From the evil of the envier when he envies.', bangla: 'হিংসুক যখন হিংসা করে—তার অনিষ্ট থেকে।' });
verseContent.set('114:6', { english: 'From among jinn and among mankind.', bangla: 'জিন ও মানুষের মধ্য থেকে।' });
verseContent.set('9:129', { english: 'But if they turn away, say, “Allah is sufficient for me; there is no god except Him. In Him I place my trust, and He is the Lord of the Mighty Throne.”', bangla: 'তারা যদি মুখ ফিরিয়ে নেয়, বলো — “আমার জন্য আল্লাহই যথেষ্ট; তাঁছাড়া আর কোনো উপাস্য নেই। তাঁরই উপর আমি ভরসা করি, এবং তিনিই মহান আরশের অধিপতি।”' });

interface FullVerseData {
  englishText: string;
  banglaText: string;
}

export const getVerse = (surah: number, verse: number): FullVerseData => {
  const cacheKey = `${surah}:${verse}`;
  const content = verseContent.get(cacheKey);

  if (content) {
    return {
      englishText: content.english,
      banglaText: content.bangla,
    };
  }

  // Return a default/error state if not found
  return {
    englishText: `Could not load verse ${surah}:${verse}.`,
    banglaText: `আয়াত ${surah}:${verse} লোড করা যায়নি।`,
  };
};