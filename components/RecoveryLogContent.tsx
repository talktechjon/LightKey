import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Compass, RefreshCw, Eye, Sun, Droplets, Sparkles, ArrowLeftRight, Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

/* =========================================================================
   Rubik's Cube Permutation Circles & 4D Tesseract Simulation Engine
   (AdamWhiteHat Permutation Model)
   ========================================================================= */

// Canonical 6 colors matching the video:
// U: Green (#22c55e), D: Yellow (#facc15), F: Red (#ef4444), B: Blue (#3b82f6), L: Orange (#fb923c), R: White (#ffffff)
type FaceName = 'U' | 'D' | 'F' | 'B' | 'L' | 'R';
type CubeState = Record<FaceName, string[]>;

const INITIAL_CUBE_STATE: CubeState = {
    U: Array(9).fill('#22c55e'), // Green
    D: Array(9).fill('#facc15'), // Yellow
    F: Array(9).fill('#ef4444'), // Red
    B: Array(9).fill('#3b82f6'), // Blue
    L: Array(9).fill('#fb923c'), // Orange
    R: Array(9).fill('#ffffff')  // White
};

// The 15-move sequence from the video
const PERMUTATION_SEQUENCE = [
    'F', "L'", "B'", "R'", 'M', 'U', "M'", "L'", 'U', 'E', 'B', 'M', 'U', "E'", "R'"
];

// Helper to rotate a 3x3 face array 90 deg clockwise
const rotateFaceCW = (face: string[]): string[] => [
    face[6], face[3], face[0],
    face[7], face[4], face[1],
    face[8], face[5], face[2]
];

// Helper to rotate a 3x3 face array 90 deg counter-clockwise
const rotateFaceCCW = (face: string[]): string[] => [
    face[2], face[5], face[8],
    face[1], face[4], face[7],
    face[0], face[3], face[6]
];

// Apply single move to cube state
const applyCubeMove = (state: CubeState, move: string): CubeState => {
    const s = {
        U: [...state.U],
        D: [...state.D],
        F: [...state.F],
        B: [...state.B],
        L: [...state.L],
        R: [...state.R]
    };

    switch (move) {
        case 'U': {
            s.U = rotateFaceCW(s.U);
            const temp = [s.F[0], s.F[1], s.F[2]];
            s.F[0] = s.R[0]; s.F[1] = s.R[1]; s.F[2] = s.R[2];
            s.R[0] = s.B[0]; s.R[1] = s.B[1]; s.R[2] = s.B[2];
            s.B[0] = s.L[0]; s.B[1] = s.L[1]; s.B[2] = s.L[2];
            s.L[0] = temp[0]; s.L[1] = temp[1]; s.L[2] = temp[2];
            break;
        }
        case "U'": {
            s.U = rotateFaceCCW(s.U);
            const temp = [s.F[0], s.F[1], s.F[2]];
            s.F[0] = s.L[0]; s.F[1] = s.L[1]; s.F[2] = s.L[2];
            s.L[0] = s.B[0]; s.L[1] = s.B[1]; s.L[2] = s.B[2];
            s.B[0] = s.R[0]; s.B[1] = s.R[1]; s.B[2] = s.R[2];
            s.R[0] = temp[0]; s.R[1] = temp[1]; s.R[2] = temp[2];
            break;
        }
        case 'D': {
            s.D = rotateFaceCW(s.D);
            const temp = [s.F[6], s.F[7], s.F[8]];
            s.F[6] = s.L[6]; s.F[7] = s.L[7]; s.F[8] = s.L[8];
            s.L[6] = s.B[6]; s.L[7] = s.B[7]; s.L[8] = s.B[8];
            s.B[6] = s.R[6]; s.B[7] = s.R[7]; s.B[8] = s.R[8];
            s.R[6] = temp[0]; s.R[7] = temp[1]; s.R[8] = temp[2];
            break;
        }
        case "D'": {
            s.D = rotateFaceCCW(s.D);
            const temp = [s.F[6], s.F[7], s.F[8]];
            s.F[6] = s.R[6]; s.F[7] = s.R[7]; s.F[8] = s.R[8];
            s.R[6] = s.B[6]; s.R[7] = s.B[7]; s.R[8] = s.B[8];
            s.B[6] = s.L[6]; s.B[7] = s.L[7]; s.B[8] = s.L[8];
            s.L[6] = temp[0]; s.L[7] = temp[1]; s.L[8] = temp[2];
            break;
        }
        case 'F': {
            s.F = rotateFaceCW(s.F);
            const temp = [s.U[6], s.U[7], s.U[8]];
            s.U[6] = s.L[8]; s.U[7] = s.L[5]; s.U[8] = s.L[2];
            s.L[2] = s.D[0]; s.L[5] = s.D[1]; s.L[8] = s.D[2];
            s.D[0] = s.R[6]; s.D[1] = s.R[3]; s.D[2] = s.R[0];
            s.R[0] = temp[0]; s.R[3] = temp[1]; s.R[6] = temp[2];
            break;
        }
        case "F'": {
            s.F = rotateFaceCCW(s.F);
            const temp = [s.U[6], s.U[7], s.U[8]];
            s.U[6] = s.R[0]; s.U[7] = s.R[3]; s.U[8] = s.R[6];
            s.R[0] = s.D[2]; s.R[3] = s.D[1]; s.R[6] = s.D[0];
            s.D[0] = s.L[2]; s.D[1] = s.L[5]; s.D[2] = s.L[8];
            s.L[2] = temp[2]; s.L[5] = temp[1]; s.L[8] = temp[0];
            break;
        }
        case 'B': {
            s.B = rotateFaceCW(s.B);
            const temp = [s.U[0], s.U[1], s.U[2]];
            s.U[0] = s.R[2]; s.U[1] = s.R[5]; s.U[2] = s.R[8];
            s.R[2] = s.D[8]; s.R[5] = s.D[7]; s.R[8] = s.D[6];
            s.D[6] = s.L[0]; s.D[7] = s.L[3]; s.D[8] = s.L[6];
            s.L[0] = temp[2]; s.L[3] = temp[1]; s.L[6] = temp[0];
            break;
        }
        case "B'": {
            s.B = rotateFaceCCW(s.B);
            const temp = [s.U[0], s.U[1], s.U[2]];
            s.U[0] = s.L[6]; s.U[1] = s.L[3]; s.U[2] = s.L[0];
            s.L[0] = s.D[6]; s.L[3] = s.D[7]; s.L[6] = s.D[8];
            s.D[6] = s.R[8]; s.D[7] = s.R[5]; s.D[8] = s.R[2];
            s.R[2] = temp[0]; s.R[5] = temp[1]; s.R[8] = temp[2];
            break;
        }
        case 'L': {
            s.L = rotateFaceCW(s.L);
            const temp = [s.U[0], s.U[3], s.U[6]];
            s.U[0] = s.B[8]; s.U[3] = s.B[5]; s.U[6] = s.B[2];
            s.B[2] = s.D[6]; s.B[5] = s.D[3]; s.B[8] = s.D[0];
            s.D[0] = s.F[0]; s.D[3] = s.F[3]; s.D[6] = s.F[6];
            s.F[0] = temp[0]; s.F[3] = temp[1]; s.F[6] = temp[2];
            break;
        }
        case "L'": {
            s.L = rotateFaceCCW(s.L);
            const temp = [s.U[0], s.U[3], s.U[6]];
            s.U[0] = s.F[0]; s.U[3] = s.F[3]; s.U[6] = s.F[6];
            s.F[0] = s.D[0]; s.F[3] = s.D[3]; s.F[6] = s.D[6];
            s.D[0] = s.B[8]; s.D[3] = s.B[5]; s.D[6] = s.B[2];
            s.B[2] = temp[2]; s.B[5] = temp[1]; s.B[8] = temp[0];
            break;
        }
        case 'R': {
            s.R = rotateFaceCW(s.R);
            const temp = [s.U[2], s.U[5], s.U[8]];
            s.U[2] = s.F[2]; s.U[5] = s.F[5]; s.U[8] = s.F[8];
            s.F[2] = s.D[2]; s.F[5] = s.D[5]; s.F[8] = s.D[8];
            s.D[2] = s.B[6]; s.D[5] = s.B[3]; s.D[8] = s.B[0];
            s.B[0] = temp[2]; s.B[3] = temp[1]; s.B[6] = temp[0];
            break;
        }
        case "R'": {
            s.R = rotateFaceCCW(s.R);
            const temp = [s.U[2], s.U[5], s.U[8]];
            s.U[2] = s.B[6]; s.U[5] = s.B[3]; s.U[8] = s.B[0];
            s.B[0] = s.D[8]; s.B[3] = s.D[5]; s.B[6] = s.D[2];
            s.D[2] = s.F[2]; s.D[5] = s.F[5]; s.D[8] = s.F[8];
            s.F[2] = temp[0]; s.F[5] = temp[1]; s.F[8] = temp[2];
            break;
        }
        case 'M': {
            // Middle slice follows L direction (U -> F -> D -> B)
            const temp = [s.U[1], s.U[4], s.U[7]];
            s.U[1] = s.B[7]; s.U[4] = s.B[4]; s.U[7] = s.B[1];
            s.B[1] = s.D[7]; s.B[4] = s.D[4]; s.B[7] = s.D[1];
            s.D[1] = s.F[1]; s.D[4] = s.F[4]; s.D[7] = s.F[7];
            s.F[1] = temp[0]; s.F[4] = temp[1]; s.F[7] = temp[2];
            break;
        }
        case "M'": {
            const temp = [s.U[1], s.U[4], s.U[7]];
            s.U[1] = s.F[1]; s.U[4] = s.F[4]; s.U[7] = s.F[7];
            s.F[1] = s.D[1]; s.F[4] = s.D[4]; s.F[7] = s.D[7];
            s.D[1] = s.B[7]; s.D[4] = s.B[4]; s.D[7] = s.B[1];
            s.B[1] = temp[2]; s.B[4] = temp[1]; s.B[7] = temp[0];
            break;
        }
        case 'E': {
            // Equator slice follows D direction (F -> R -> B -> L)
            const temp = [s.F[3], s.F[4], s.F[5]];
            s.F[3] = s.L[3]; s.F[4] = s.L[4]; s.F[5] = s.L[5];
            s.L[3] = s.B[3]; s.L[4] = s.B[4]; s.L[5] = s.B[5];
            s.B[3] = s.R[3]; s.B[4] = s.R[4]; s.B[5] = s.R[5];
            s.R[3] = temp[0]; s.R[4] = temp[1]; s.R[5] = temp[2];
            break;
        }
        case "E'": {
            const temp = [s.F[3], s.F[4], s.F[5]];
            s.F[3] = s.R[3]; s.F[4] = s.R[4]; s.F[5] = s.R[5];
            s.R[3] = s.B[3]; s.R[4] = s.B[4]; s.R[5] = s.B[5];
            s.B[3] = s.L[3]; s.B[4] = s.L[4]; s.B[5] = s.L[5];
            s.L[3] = temp[0]; s.L[4] = temp[1]; s.L[5] = temp[2];
            break;
        }
        case 'S': {
            // Standing slice follows F direction (U -> R -> D -> L)
            const temp = [s.U[3], s.U[4], s.U[5]];
            s.U[3] = s.L[7]; s.U[4] = s.L[4]; s.U[5] = s.L[1];
            s.L[1] = s.D[3]; s.L[4] = s.D[4]; s.L[7] = s.D[5];
            s.D[3] = s.R[7]; s.D[4] = s.R[4]; s.D[5] = s.R[1];
            s.R[1] = temp[0]; s.R[4] = temp[1]; s.R[7] = temp[2];
            break;
        }
        case "S'": {
            const temp = [s.U[3], s.U[4], s.U[5]];
            s.U[3] = s.R[1]; s.U[4] = s.R[4]; s.U[5] = s.R[7];
            s.R[1] = s.D[5]; s.R[4] = s.D[4]; s.R[7] = s.D[3];
            s.D[3] = s.L[1]; s.D[4] = s.L[4]; s.D[5] = s.L[7];
            s.L[1] = temp[2]; s.L[4] = temp[1]; s.L[7] = temp[0];
            break;
        }
        default:
            break;
    }
    return s;
};

export const TesseractRoseCubeVisual: React.FC = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cubeHistory, setCubeHistory] = useState<CubeState[]>([INITIAL_CUBE_STATE]);
    const [activeMoveName, setActiveMoveName] = useState<string | null>(null);

    // Pre-calculate full 15-step sequence history
    useEffect(() => {
        let current = INITIAL_CUBE_STATE;
        const history = [INITIAL_CUBE_STATE];
        for (const mv of PERMUTATION_SEQUENCE) {
            current = applyCubeMove(current, mv);
            history.push(current);
        }
        setCubeHistory(history);
    }, []);

    const currentCube = cubeHistory[stepIndex] || INITIAL_CUBE_STATE;
    const currentMove = stepIndex > 0 ? PERMUTATION_SEQUENCE[stepIndex - 1] : null;

    // Auto-play timer
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isPlaying) {
            timer = setTimeout(() => {
                setStepIndex((prev) => {
                    if (prev >= PERMUTATION_SEQUENCE.length) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 800);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, stepIndex]);

    const handleNext = () => {
        if (stepIndex < PERMUTATION_SEQUENCE.length) {
            setStepIndex(stepIndex + 1);
        }
    };

    const handlePrev = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };

    const handleReset = () => {
        setIsPlaying(false);
        setStepIndex(0);
    };

    const handleTriggerManualMove = (mv: string) => {
        setIsPlaying(false);
        setActiveMoveName(mv);
        setCubeHistory((prevHistory) => {
            const lastState = prevHistory[stepIndex] || INITIAL_CUBE_STATE;
            const nextState = applyCubeMove(lastState, mv);
            const newHistory = [...prevHistory.slice(0, stepIndex + 1), nextState];
            setStepIndex(stepIndex + 1);
            return newHistory;
        });
        setTimeout(() => setActiveMoveName(null), 600);
    };

    // 9 Track Circle Geometry Constants (Trefoil / 3-Axis System)
    // Top Cluster (Y-Axis: U, E, D) Center: (210, 130)
    // Bottom-Left Cluster (Z-Axis: F, S, B) Center: (145, 230)
    // Bottom-Right Cluster (X-Axis: R, M, L) Center: (275, 230)
    const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
    const [hoveredBead, setHoveredBead] = useState<{ face: FaceName; index: number; label: string; track: string } | null>(null);
    const [hoveredCubeFacet, setHoveredCubeFacet] = useState<{ face: FaceName; index: number } | null>(null);
    const [showBeadLabels, setShowBeadLabels] = useState<boolean>(false);

    const activeHighlightTrack = activeMoveName 
        ? activeMoveName.replace("'", "") 
        : (selectedTrack !== 'ALL' ? selectedTrack : (currentMove ? currentMove.replace("'", "") : null));

    // Dynamic sticker colors mapping for the 54 beads on the permutation circles
    // U face: Green, D face: Yellow, F face: Red, B face: Blue, L face: Orange, R face: White
    const getBeadColor = (face: FaceName, idx: number) => {
        return currentCube[face]?.[idx] || '#cbd5e1';
    };

    // Helper to calculate exact coordinates of 8 beads along a circle of radius R at center (cx, cy)
    // Start angle offset ensures natural orientation matching the face unfoldings
    const getPerimeterCoords = (cx: number, cy: number, r: number, startAngleDeg: number = -90) => {
        const coords: { x: number; y: number }[] = [];
        for (let i = 0; i < 8; i++) {
            const angleRad = ((startAngleDeg + i * 45) * Math.PI) / 180;
            coords.push({
                x: cx + r * Math.cos(angleRad),
                y: cy + r * Math.sin(angleRad)
            });
        }
        return coords;
    };

    // Face perimeter 8-indices in clockwise order around the face: [0, 1, 2, 5, 8, 7, 6, 3]
    const FACE_INDICES = [0, 1, 2, 5, 8, 7, 6, 3];

    // Definitions of the 9 tracks with geometry, beads, and metadata
    const TRACK_CONFIGS: Record<string, {
        name: string;
        fullName: string;
        axis: string;
        color: string;
        cx: number;
        cy: number;
        r: number;
        labelX: number;
        labelY: number;
        beads: { face: FaceName; index: number; label: string }[];
        startAngle: number;
    }> = {
        // Top Cluster (Y-Axis)
        D: {
            name: 'D',
            fullName: 'Down Face (Outer Ring)',
            axis: 'Y-Axis / Gravitropism',
            color: '#facc15',
            cx: 210, cy: 130, r: 110,
            labelX: 210, labelY: 16,
            startAngle: -90,
            beads: FACE_INDICES.map((idx) => ({ face: 'D' as FaceName, index: idx, label: `D${idx}` }))
        },
        E: {
            name: 'E',
            fullName: 'Equator Slice (Middle Ring)',
            axis: 'Y-Axis Slice',
            color: '#22d3ee',
            cx: 210, cy: 130, r: 90,
            labelX: 210, labelY: 36,
            startAngle: -90,
            beads: [
                { face: 'F', index: 3, label: 'F3' },
                { face: 'L', index: 5, label: 'L5' },
                { face: 'L', index: 3, label: 'L3' },
                { face: 'B', index: 5, label: 'B5' },
                { face: 'B', index: 3, label: 'B3' },
                { face: 'R', index: 5, label: 'R5' },
                { face: 'R', index: 3, label: 'R3' },
                { face: 'F', index: 5, label: 'F5' }
            ]
        },
        U: {
            name: 'U',
            fullName: 'Up Face (Inner Ring)',
            axis: 'Y-Axis / Phototropism',
            color: '#4ade80',
            cx: 210, cy: 130, r: 70,
            labelX: 210, labelY: 56,
            startAngle: -90,
            beads: FACE_INDICES.map((idx) => ({ face: 'U' as FaceName, index: idx, label: `U${idx}` }))
        },

        // Bottom-Left Cluster (Z-Axis)
        B: {
            name: 'B',
            fullName: 'Back Face (Outer Ring)',
            axis: 'Z-Axis / Past Horizon',
            color: '#38bdf8',
            cx: 145, cy: 230, r: 110,
            labelX: 28, labelY: 235,
            startAngle: 180,
            beads: FACE_INDICES.map((idx) => ({ face: 'B' as FaceName, index: idx, label: `B${idx}` }))
        },
        S: {
            name: 'S',
            fullName: 'Standing Slice (Middle Ring)',
            axis: 'Z-Axis Slice',
            color: '#f59e0b',
            cx: 145, cy: 230, r: 90,
            labelX: 50, labelY: 235,
            startAngle: 180,
            beads: [
                { face: 'U', index: 3, label: 'U3' },
                { face: 'R', index: 1, label: 'R1' },
                { face: 'R', index: 7, label: 'R7' },
                { face: 'D', index: 5, label: 'D5' },
                { face: 'D', index: 3, label: 'D3' },
                { face: 'L', index: 7, label: 'L7' },
                { face: 'L', index: 1, label: 'L1' },
                { face: 'U', index: 5, label: 'U5' }
            ]
        },
        F: {
            name: 'F',
            fullName: 'Front Face (Inner Ring)',
            axis: 'Z-Axis / Future Horizon',
            color: '#ef4444',
            cx: 145, cy: 230, r: 70,
            labelX: 72, labelY: 235,
            startAngle: 180,
            beads: FACE_INDICES.map((idx) => ({ face: 'F' as FaceName, index: idx, label: `F${idx}` }))
        },

        // Bottom-Right Cluster (X-Axis)
        L: {
            name: 'L',
            fullName: 'Left Face (Outer Ring)',
            axis: 'X-Axis / Left Debit Arm',
            color: '#fb923c',
            cx: 275, cy: 230, r: 110,
            labelX: 392, labelY: 235,
            startAngle: 0,
            beads: FACE_INDICES.map((idx) => ({ face: 'L' as FaceName, index: idx, label: `L${idx}` }))
        },
        M: {
            name: 'M',
            fullName: 'Middle Slice (Middle Ring)',
            axis: 'X-Axis Slice',
            color: '#ec4899',
            cx: 275, cy: 230, r: 90,
            labelX: 370, labelY: 235,
            startAngle: 0,
            beads: [
                { face: 'U', index: 1, label: 'U1' },
                { face: 'F', index: 1, label: 'F1' },
                { face: 'F', index: 7, label: 'F7' },
                { face: 'D', index: 1, label: 'D1' },
                { face: 'D', index: 7, label: 'D7' },
                { face: 'B', index: 7, label: 'B7' },
                { face: 'B', index: 1, label: 'B1' },
                { face: 'U', index: 7, label: 'U7' }
            ]
        },
        R: {
            name: 'R',
            fullName: 'Right Face (Inner Ring)',
            axis: 'X-Axis / Right Credit Arm',
            color: '#ffffff',
            cx: 275, cy: 230, r: 70,
            labelX: 348, labelY: 235,
            startAngle: 0,
            beads: FACE_INDICES.map((idx) => ({ face: 'R' as FaceName, index: idx, label: `R${idx}` }))
        }
    };

    return (
        <div className="relative w-full flex flex-col items-center justify-center my-10 bg-black/60 border border-cyan-500/25 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden select-none">
            {/* Ambient Background Atmosphere */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-2 mb-6 z-10 w-full">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
                    <Box className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Rubik's Cube as Permutations • AdamWhiteHat Engine</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-pink-300 font-serif tracking-wide">
                    The 9-Track Permutation Circles & 3D Hypercube
                </h3>
                <p className="text-xs text-gray-400 font-mono max-w-xl leading-relaxed">
                    1 → 15:87 Sabʿan al-Mathānī ← 1 | 9 Move Tracks (I9 ⇄ 3n ⇄ D10) | 15-Move Zero-Sum Sequence
                </p>
            </div>

            {/* Track Selector Bar & Trace Filter */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2.5 z-10 mb-5 p-3 rounded-2xl bg-black/50 border border-white/10">
                <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-400 mr-1 flex items-center gap-1">
                        <Compass className="w-3 h-3 text-cyan-400" /> Trace Ring:
                    </span>
                    <button
                        onClick={() => setSelectedTrack('ALL')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                            selectedTrack === 'ALL'
                                ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                                : 'bg-white/5 hover:bg-white/10 text-gray-300'
                        }`}
                    >
                        ALL RINGS
                    </button>
                    {['U', 'D', 'F', 'B', 'L', 'R', 'M', 'E', 'S'].map((trk) => {
                        const isSel = selectedTrack === trk || (selectedTrack === 'ALL' && activeHighlightTrack === trk);
                        const cfg = TRACK_CONFIGS[trk];
                        return (
                            <button
                                key={trk}
                                onClick={() => setSelectedTrack(selectedTrack === trk ? 'ALL' : trk)}
                                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 border ${
                                    isSel
                                        ? 'bg-white/15 text-white border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] scale-105'
                                        : 'bg-black/40 hover:bg-white/10 text-gray-400 border-white/5 hover:text-white'
                                }`}
                                style={{ borderLeftColor: cfg.color, borderLeftWidth: '3px' }}
                                title={`Trace ${cfg.fullName}`}
                            >
                                {trk}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => setShowBeadLabels(!showBeadLabels)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
                        showBeadLabels
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-white/5 text-gray-400 border-white/5 hover:text-gray-200'
                    }`}
                >
                    {showBeadLabels ? '✓ Labels (0-7) Shown' : 'Show Dot Labels (0-7)'}
                </button>
            </div>

            {/* Active Trace Status Bar */}
            <div className="w-full mb-4 px-4 py-2 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between text-xs font-mono text-cyan-300 z-10">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>
                        {selectedTrack !== 'ALL' ? (
                            <>
                                <strong className="text-white">Active Trace: Track [{selectedTrack}]</strong> — {TRACK_CONFIGS[selectedTrack]?.fullName} ({TRACK_CONFIGS[selectedTrack]?.axis})
                            </>
                        ) : activeHighlightTrack ? (
                            <>
                                <strong className="text-white">Current Move Track: [{activeHighlightTrack}]</strong> — {TRACK_CONFIGS[activeHighlightTrack]?.fullName || 'Active Permutation'}
                            </>
                        ) : (
                            <>Showing all 9 interlocking orbits. Click any track badge or button above to isolate and trace.</>
                        )}
                    </span>
                </span>
                {hoveredBead && (
                    <span className="text-amber-300 font-bold bg-black/60 px-2.5 py-0.5 rounded border border-amber-500/30">
                        {hoveredBead.track} • {hoveredBead.label} ({hoveredBead.face} Face)
                    </span>
                )}
            </div>

            {/* Main Interactive Stage: 3D Cube (Left) & Permutation Circles (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center z-10">
                {/* Left: Isometric 3D Rubik's Cube Display */}
                <div className="lg:col-span-5 flex flex-col items-center bg-black/40 border border-white/10 rounded-2xl p-5 relative shadow-inner">
                    <div className="flex justify-between items-center w-full mb-3 border-b border-white/5 pb-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                            <Box className="w-3.5 h-3.5" /> 3D Cube State
                        </span>
                        <div className="flex items-center gap-2">
                            {currentMove && (
                                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono font-black text-xs border border-cyan-500/40 animate-pulse">
                                    {currentMove}
                                </span>
                            )}
                            <span className="text-xs font-mono font-bold text-gray-400">
                                {stepIndex} / {PERMUTATION_SEQUENCE.length}
                            </span>
                        </div>
                    </div>

                    {/* Isometric 3D SVG Cube */}
                    <svg viewBox="0 0 320 280" className="w-full max-w-[260px] h-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.2)] select-none">
                        {/* Top Face: Up (U) - Green Base */}
                        <g>
                            {/* Row 0 */}
                            <polygon 
                                points="160,20 190,37 160,54 130,37" 
                                fill={getBeadColor('U', 0)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 0 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 0 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 0 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="190,37 220,54 190,71 160,54" 
                                fill={getBeadColor('U', 1)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 1 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 1 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 1 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="220,54 250,71 220,88 190,71" 
                                fill={getBeadColor('U', 2)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 2 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 2 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 2 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            {/* Row 1 */}
                            <polygon 
                                points="130,37 160,54 130,71 100,54" 
                                fill={getBeadColor('U', 3)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 3 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 3 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 3 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="160,54 190,71 160,88 130,71" 
                                fill={getBeadColor('U', 4)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 4 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 4 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 4 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="190,71 220,88 190,105 160,88" 
                                fill={getBeadColor('U', 5)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 5 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 5 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 5 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            {/* Row 2 */}
                            <polygon 
                                points="100,54 130,71 100,88 70,71" 
                                fill={getBeadColor('U', 6)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 6 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 6 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 6 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="130,71 160,88 130,105 100,88" 
                                fill={getBeadColor('U', 7)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 7 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 7 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 7 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="160,88 190,105 160,122 130,105" 
                                fill={getBeadColor('U', 8)} 
                                stroke={hoveredBead?.face === 'U' && hoveredBead?.index === 8 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'U' && hoveredBead?.index === 8 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'U', index: 8 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                        </g>

                        {/* Front Face: Front (F) - Red Base */}
                        <g>
                            {/* Col 0 */}
                            <polygon 
                                points="70,71 100,88 100,128 70,111" 
                                fill={getBeadColor('F', 0)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 0 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 0 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 0 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="70,111 100,128 100,168 70,151" 
                                fill={getBeadColor('F', 3)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 3 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 3 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 3 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="70,151 100,168 100,208 70,191" 
                                fill={getBeadColor('F', 6)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 6 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 6 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 6 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            {/* Col 1 */}
                            <polygon 
                                points="100,88 130,105 130,145 100,128" 
                                fill={getBeadColor('F', 1)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 1 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 1 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 1 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="100,128 130,145 130,185 100,168" 
                                fill={getBeadColor('F', 4)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 4 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 4 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 4 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="100,168 130,185 130,225 100,208" 
                                fill={getBeadColor('F', 7)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 7 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 7 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 7 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            {/* Col 2 */}
                            <polygon 
                                points="130,105 160,122 160,162 130,145" 
                                fill={getBeadColor('F', 2)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 2 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 2 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 2 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="130,145 160,162 160,202 130,185" 
                                fill={getBeadColor('F', 5)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 5 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 5 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 5 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="130,185 160,202 160,242 130,225" 
                                fill={getBeadColor('F', 8)} 
                                stroke={hoveredBead?.face === 'F' && hoveredBead?.index === 8 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'F' && hoveredBead?.index === 8 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'F', index: 8 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                        </g>

                        {/* Right Face: Right (R) - White Base */}
                        <g>
                            {/* Col 0 */}
                            <polygon 
                                points="160,122 190,105 190,145 160,162" 
                                fill={getBeadColor('R', 0)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 0 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 0 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 0 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="160,162 190,145 190,185 160,202" 
                                fill={getBeadColor('R', 3)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 3 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 3 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 3 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="160,202 190,185 190,225 160,242" 
                                fill={getBeadColor('R', 6)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 6 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 6 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 6 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            {/* Col 1 */}
                            <polygon 
                                points="190,105 220,88 220,128 190,145" 
                                fill={getBeadColor('R', 1)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 1 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 1 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 1 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="190,145 220,128 220,168 190,185" 
                                fill={getBeadColor('R', 4)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 4 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 4 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 4 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="190,185 220,168 220,208 190,225" 
                                fill={getBeadColor('R', 7)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 7 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 7 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 7 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            {/* Col 2 */}
                            <polygon 
                                points="220,88 250,71 250,111 220,128" 
                                fill={getBeadColor('R', 2)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 2 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 2 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 2 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="220,128 250,111 250,151 220,168" 
                                fill={getBeadColor('R', 5)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 5 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 5 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 5 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                            <polygon 
                                points="220,168 250,151 250,191 220,208" 
                                fill={getBeadColor('R', 8)} 
                                stroke={hoveredBead?.face === 'R' && hoveredBead?.index === 8 ? '#ffffff' : '#090d14'} 
                                strokeWidth={hoveredBead?.face === 'R' && hoveredBead?.index === 8 ? '3.5' : '2.5'}
                                className="cursor-pointer transition-all hover:opacity-80"
                                onMouseEnter={() => setHoveredCubeFacet({ face: 'R', index: 8 })}
                                onMouseLeave={() => setHoveredCubeFacet(null)}
                            />
                        </g>

                        {/* Active Slice Marker Overlay */}
                        {(activeHighlightTrack === 'M' || activeHighlightTrack === 'E' || activeHighlightTrack === 'S') && (
                            <line 
                                x1="160" y1="20" x2="160" y2="242" 
                                stroke="#22d3ee" strokeWidth="3" strokeDasharray="5 3" 
                                className="animate-pulse" 
                            />
                        )}
                    </svg>

                    <div className="flex justify-between w-full text-[9px] font-mono text-gray-400 mt-3 border-t border-white/5 pt-2">
                        <span>Top: Up (Green)</span>
                        <span>Front: Red</span>
                        <span>Right: White</span>
                    </div>
                </div>

                {/* Right: The 9 Permutation Circles Diagram with Exact On-Ring Beads */}
                <div className="lg:col-span-7 flex flex-col items-center bg-black/40 border border-white/10 rounded-2xl p-5 relative shadow-inner">
                    <div className="flex justify-between items-center w-full mb-3 border-b border-white/5 pb-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" /> Permutation Circles (Trefoil 9-Track Topology)
                        </span>
                        <span className="text-[10px] font-mono text-cyan-300">
                            {activeHighlightTrack ? `Active Track: [${activeHighlightTrack}]` : 'Interlocking Orbits'}
                        </span>
                    </div>

                    {/* SVG Permutation Circles Engine with Math-Aligned Bead Tracks */}
                    <svg viewBox="0 0 420 380" className="w-full max-w-[390px] h-auto drop-shadow-[0_0_20px_rgba(6,182,212,0.15)] select-none">
                        <defs>
                            {/* Radial Bead Specular Shader */}
                            <radialGradient id="beadGlow" cx="35%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                                <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                            </radialGradient>
                        </defs>

                        {/* RENDER THE 9 CIRCULAR TRACKS */}
                        {Object.entries(TRACK_CONFIGS).map(([trkKey, cfg]) => {
                            const isIsolated = selectedTrack !== 'ALL' && selectedTrack !== trkKey;
                            const isActive = activeHighlightTrack === trkKey;
                            const strokeColor = isActive ? cfg.color : (isIsolated ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.18)');
                            const strokeW = isActive ? 3.5 : (isIsolated ? 1 : 1.5);
                            const isDashed = trkKey === 'E' || trkKey === 'M' || trkKey === 'S';

                            return (
                                <g key={trkKey} className="transition-all duration-300">
                                    {/* Active Track Halo / Glow */}
                                    {isActive && (
                                        <circle
                                            cx={cfg.cx}
                                            cy={cfg.cy}
                                            r={cfg.r}
                                            fill="none"
                                            stroke={cfg.color}
                                            strokeWidth="8"
                                            opacity="0.2"
                                            className="animate-pulse"
                                        />
                                    )}

                                    {/* Track Ring Circumference Line */}
                                    <circle
                                        cx={cfg.cx}
                                        cy={cfg.cy}
                                        r={cfg.r}
                                        fill="none"
                                        stroke={strokeColor}
                                        strokeWidth={strokeW}
                                        strokeDasharray={isDashed ? (isActive ? '8 4' : '4 3') : 'none'}
                                        className="transition-all duration-300"
                                    />

                                    {/* On-Ring Track Label Badge */}
                                    <g 
                                        className="cursor-pointer transition-all hover:scale-110"
                                        onClick={() => setSelectedTrack(selectedTrack === trkKey ? 'ALL' : trkKey)}
                                    >
                                        <rect
                                            x={cfg.labelX - 11}
                                            y={cfg.labelY - 11}
                                            width="22"
                                            height="22"
                                            rx="6"
                                            fill={isActive ? cfg.color : '#0f172a'}
                                            stroke={isActive ? '#ffffff' : (isIsolated ? 'rgba(255,255,255,0.1)' : cfg.color)}
                                            strokeWidth="1.5"
                                            className="transition-all"
                                        />
                                        <text
                                            x={cfg.labelX}
                                            y={cfg.labelY + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="900"
                                            fontFamily="monospace"
                                            fill={isActive ? '#000000' : '#ffffff'}
                                        >
                                            {trkKey}
                                        </text>
                                    </g>
                                </g>
                            );
                        })}

                        {/* RENDER BEADS PRECISELY ON CIRCULAR TRACKS */}
                        {Object.entries(TRACK_CONFIGS).map(([trkKey, cfg]) => {
                            const isIsolated = selectedTrack !== 'ALL' && selectedTrack !== trkKey;
                            const isActive = activeHighlightTrack === trkKey;
                            const coords = getPerimeterCoords(cfg.cx, cfg.cy, cfg.r, cfg.startAngle);

                            return (
                                <g key={`beads-${trkKey}`} opacity={isIsolated ? 0.15 : 1} className="transition-opacity duration-300">
                                    {cfg.beads.map((bead, bIdx) => {
                                        const pt = coords[bIdx];
                                        const beadColor = getBeadColor(bead.face, bead.index);
                                        const isHovered = (hoveredBead?.face === bead.face && hoveredBead?.index === bead.index) ||
                                                          (hoveredCubeFacet?.face === bead.face && hoveredCubeFacet?.index === bead.index);

                                        return (
                                            <g 
                                                key={`${trkKey}-b-${bIdx}`}
                                                className="cursor-pointer"
                                                onMouseEnter={() => setHoveredBead({ face: bead.face, index: bead.index, label: bead.label, track: cfg.fullName })}
                                                onMouseLeave={() => setHoveredBead(null)}
                                            >
                                                {/* Hover / Active Pulse Ring */}
                                                {(isHovered || (isActive && !isIsolated)) && (
                                                    <circle
                                                        cx={pt.x}
                                                        cy={pt.y}
                                                        r={isHovered ? 12 : 9}
                                                        fill="none"
                                                        stroke={isHovered ? '#ffffff' : cfg.color}
                                                        strokeWidth={isHovered ? 2 : 1}
                                                        opacity={isHovered ? 0.9 : 0.4}
                                                        className="animate-pulse"
                                                    />
                                                )}

                                                {/* Base Colored Bead Sphere */}
                                                <circle
                                                    cx={pt.x}
                                                    cy={pt.y}
                                                    r={isHovered ? 8 : (isActive ? 7 : 6)}
                                                    fill={beadColor}
                                                    stroke={isHovered ? '#ffffff' : '#090d14'}
                                                    strokeWidth={isHovered ? 2.5 : 1.2}
                                                    className="transition-all duration-200"
                                                />

                                                {/* Radial Specular Highlight Overlay */}
                                                <circle
                                                    cx={pt.x}
                                                    cy={pt.y}
                                                    r={isHovered ? 8 : (isActive ? 7 : 6)}
                                                    fill="url(#beadGlow)"
                                                    pointerEvents="none"
                                                />

                                                {/* Optional Index Label Inside / Next to Bead */}
                                                {showBeadLabels && (
                                                    <text
                                                        x={pt.x}
                                                        y={pt.y + 3}
                                                        textAnchor="middle"
                                                        fontSize="7"
                                                        fontWeight="900"
                                                        fontFamily="monospace"
                                                        fill={bead.face === 'R' || beadColor === '#ffffff' ? '#000000' : '#ffffff'}
                                                        pointerEvents="none"
                                                    >
                                                        {bead.index}
                                                    </text>
                                                )}
                                            </g>
                                        );
                                    })}
                                </g>
                            );
                        })}

                        {/* Centroid / Hidden 8th Cell Indicator (36:9 ⇄ 50:21) */}
                        <circle cx="210" cy="195" r="14" fill="rgba(6,182,212,0.2)" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="210" y="199" textAnchor="middle" fontSize="10" fontWeight="black" fontFamily="monospace" fill="#22d3ee">THE 7</text>
                    </svg>

                    {/* Sequence Ribbon showing all 15 moves */}
                    <div className="w-full flex items-center justify-start gap-1.5 overflow-x-auto no-scrollbar py-2 px-3 bg-black/60 rounded-xl border border-white/5 mt-2">
                        <span className="text-[10px] uppercase font-mono text-gray-500 font-bold shrink-0 mr-1">Seq:</span>
                        {PERMUTATION_SEQUENCE.map((mv, idx) => {
                            const isPast = idx < stepIndex;
                            const isCurrent = idx === stepIndex - 1;
                            return (
                                <span
                                    key={idx}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 transition-all ${
                                        isCurrent
                                            ? 'bg-cyan-500 text-black font-black scale-110 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                                            : isPast
                                            ? 'bg-white/10 text-gray-300 font-bold'
                                            : 'text-gray-600 font-normal'
                                    }`}
                                >
                                    {mv}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Sequence Playback Controls & Manual Move Triggers */}
            <div className="flex flex-wrap items-center justify-between gap-4 w-full mt-6 z-10 border-t border-white/10 pt-5">
                {/* 15-Move Sequence Step Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlaying ? 'Pause Sequence' : 'Play 15-Move Sequence'}</span>
                    </button>

                    <button
                        onClick={handlePrev}
                        disabled={stepIndex === 0}
                        className="p-2 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Step Back"
                    >
                        <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={stepIndex >= PERMUTATION_SEQUENCE.length}
                        className="p-2 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Step Forward"
                    >
                        <SkipForward className="w-4 h-4" />
                    </button>

                    <button
                        onClick={handleReset}
                        className="p-2 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
                        title="Reset Cube to Solved State"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>

                {/* Manual 9-Track Move Triggers */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono uppercase text-gray-500 font-bold mr-1">Rotate Tracks:</span>
                    {['U', 'D', 'F', 'B', 'L', 'R', 'M', 'E', 'S'].map((mv) => (
                        <button
                            key={mv}
                            onClick={() => handleTriggerManualMove(mv)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-black/50 hover:bg-cyan-950 border border-white/10 hover:border-cyan-500/50 text-xs font-mono font-bold text-gray-300 hover:text-cyan-300 transition-all"
                            title={`Trigger Move ${mv}`}
                        >
                            {mv}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* =========================================================================
   Interactive Reader Between Source and Wall Component
   ========================================================================= */
const ReaderSourceWallInteractive: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [mode, setMode] = useState<'wall' | 'book'>('wall');
    const [wallFilter, setWallFilter] = useState<'both' | 'shadow' | 'water'>('both');
    const [metrics, setMetrics] = useState({
        dist: '0%',
        loops: 0,
        ghost: '100%',
        dry: '100%'
    });

    const stateRef = useRef({
        mode: 'wall',
        wallFilter: 'both',
        phase: 'fall',
        x: 0,
        v: 0,
        hitT: 0,
        rt: 0,
        rf: 0,
        g: 0,
        lift: 0,
        loops: 0,
        wet: 0,
        t: 0,
        face: 1,
        dry: 100,
        W: 800,
        H: 360,
        DPR: 1,
        S: 1,
        L: {
            stripW: 40,
            wallX: 700,
            ax: 40,
            oy: 180,
            lo: { x: 56, y: 194 },
            wo: { x: 56, y: 166 },
            mw: 34,
            mh: 90,
            startX: 280,
            endX: 680,
            tan: 0.42,
            top: 22,
            bot: 350
        }
    });

    // Water particles pool
    const particlesRef = useRef({
        N: 700,
        px: new Float32Array(700),
        py: new Float32Array(700),
        pvx: new Float32Array(700),
        pvy: new Float32Array(700),
        pa: new Uint8Array(700),
        pIdx: 0,
        emitAcc: 0
    });

    // Off-screen canvas for dynamic water absorption/dry patch on wall
    const wetCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const updateLayout = useCallback(() => {
        const cv = canvasRef.current;
        if (!cv || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const W = Math.max(280, Math.floor(rect.width));
        const H = W < 560 ? Math.round(W * 0.85) : Math.round(Math.min(W * 0.48, 400));
        const DPR = Math.min(window.devicePixelRatio || 1, 2);

        cv.style.height = `${H}px`;
        cv.width = Math.round(W * DPR);
        cv.height = Math.round(H * DPR);

        const ctx = cv.getContext('2d');
        if (ctx) ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        const st = stateRef.current;
        st.W = W;
        st.H = H;
        st.DPR = DPR;
        st.S = Math.max(0.55, Math.min(1.2, W / 900));

        const L = st.L;
        L.stripW = Math.max(28, Math.min(56, W * 0.065));
        L.wallX = W - (L.stripW * 2 + 12);
        L.ax = Math.max(26, W * 0.06);
        L.oy = H / 2;
        L.lo = { x: L.ax + 16 * st.S, y: L.oy + 14 * st.S };
        L.wo = { x: L.ax + 16 * st.S, y: L.oy - 14 * st.S };
        L.mw = Math.max(20, 34 * st.S);
        L.mh = H * 0.28;
        L.startX = L.lo.x + (L.wallX - L.lo.x) * 0.36;
        L.endX = L.wallX - L.mw / 2 - 4;
        L.top = 22;
        L.bot = H - 8;

        if (!wetCanvasRef.current) {
            wetCanvasRef.current = document.createElement('canvas');
        }
        const wetC = wetCanvasRef.current;
        wetC.width = Math.max(1, Math.round(L.stripW * DPR));
        wetC.height = Math.max(1, Math.round(H * DPR));
        const wctx = wetC.getContext('2d', { willReadFrequently: true });
        if (wctx) wctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        if (!st.x) st.x = L.startX;
        st.x = Math.min(Math.max(st.x, L.startX), L.endX);
    }, []);

    const emitParticles = (n: number) => {
        const pt = particlesRef.current;
        const st = stateRef.current;
        const L = st.L;
        for (let k = 0; k < n; k++) {
            const i = pt.pIdx;
            pt.pIdx = (pt.pIdx + 1) % pt.N;
            const ang = (Math.random() - 0.5) * 2 * 0.38 - 0.012;
            const sp = (9 + Math.random() * 3.5) * st.S;
            pt.px[i] = L.wo.x;
            pt.py[i] = L.wo.y;
            pt.pvx[i] = Math.cos(ang) * sp;
            pt.pvy[i] = Math.sin(ang) * sp;
            pt.pa[i] = 1;
        }
    };

    const handleSetMode = (newMode: 'wall' | 'book') => {
        setMode(newMode);
        stateRef.current.mode = newMode;
    };

    const handleRestart = () => {
        const st = stateRef.current;
        st.x = st.L.startX;
        st.v = 0;
        st.phase = 'fall';
        st.loops = 0;
        st.g = 0;
        st.lift = 0;
        st.wet = 0;
        st.face = 1;
        if (wetCanvasRef.current) {
            const wctx = wetCanvasRef.current.getContext('2d');
            if (wctx) wctx.clearRect(0, 0, st.L.stripW, st.H);
        }
        handleSetMode('wall');
    };

    // Keep wall filter in ref
    useEffect(() => {
        stateRef.current.wallFilter = wallFilter;
    }, [wallFilter]);

    // Keyboard support
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleSetMode('wall');
            if (e.key === 'ArrowLeft') handleSetMode('book');
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    // Main Animation Loop
    useEffect(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);

        let animationFrameId: number;
        let lastTime = 0;
        let frameCount = 0;

        const cv = canvasRef.current;
        const ctx = cv?.getContext('2d');

        const stepAndRender = (timestamp: number) => {
            if (!lastTime) lastTime = timestamp;
            const dt = Math.min(0.05, (timestamp - lastTime) / 1000);
            lastTime = timestamp;

            const st = stateRef.current;
            const L = st.L;
            const W = st.W;
            const H = st.H;
            const n = Math.min(2, dt * 60);
            st.t += dt;

            // Physics step
            const a = 0.03 * (W / 900);
            if (st.mode === 'wall') {
                if (st.phase === 'float') {
                    st.phase = 'fall';
                    st.v = 0;
                }
                if (st.phase === 'fall') {
                    st.v += a * n;
                    st.x += st.v * n;
                    if (st.x >= L.endX) {
                        st.x = L.endX;
                        st.phase = 'hit';
                        st.hitT = 0;
                        st.loops++;
                    }
                } else if (st.phase === 'hit') {
                    st.hitT += dt;
                    if (st.hitT > 0.4) {
                        st.phase = 'rewind';
                        st.rt = 0;
                        st.rf = st.x;
                    }
                } else if (st.phase === 'rewind') {
                    st.rt += dt / 0.75;
                    const k = Math.min(1, st.rt);
                    const e = 1 - Math.pow(1 - k, 3);
                    st.x = st.rf + (L.startX - st.rf) * e;
                    if (k >= 1) {
                        st.phase = 'fall';
                        st.v = 0;
                    }
                }
                st.g += (0 - st.g) * Math.min(1, 0.1 * n);
                st.lift += (0 - st.lift) * Math.min(1, 0.08 * n);
                st.face += (1 - st.face) * Math.min(1, 0.2 * n);
            } else {
                st.phase = 'float';
                st.v *= Math.pow(0.86, n);
                st.x += st.v * n;
                st.g += (1 - st.g) * Math.min(1, 0.04 * n);
                st.lift += (1 - st.lift) * Math.min(1, 0.05 * n);
                st.face += (-1 - st.face) * Math.min(1, 0.2 * n);
            }
            st.x = Math.max(L.startX, Math.min(L.endX, st.x));

            const my = L.oy - st.lift * H * 0.035 + Math.sin(st.t * 2.4) * 3 * st.S * st.lift;
            const massRect = {
                cx: st.x,
                cy: my,
                x1: st.x - L.mw / 2,
                x2: st.x + L.mw / 2,
                y1: my - L.mh / 2,
                y2: my + L.mh / 2
            };

            // Emit water particles
            const pt = particlesRef.current;
            pt.emitAcc += 22 * n;
            const wholeEmit = Math.floor(pt.emitAcc);
            pt.emitAcc -= wholeEmit;
            emitParticles(wholeEmit);

            // Water particle physics on off-screen wet canvas
            const wetC = wetCanvasRef.current;
            const wctx = wetC?.getContext('2d');
            const G = 0.012 * st.S;

            for (let i = 0; i < pt.N; i++) {
                if (!pt.pa[i]) continue;
                pt.px[i] += pt.pvx[i] * n;
                pt.py[i] += pt.pvy[i] * n;
                pt.pvy[i] += G * n;

                if (pt.px[i] >= L.wallX) {
                    pt.pa[i] = 0;
                    const y = pt.py[i];
                    if (y > 0 && y < H && wctx) {
                        wctx.fillStyle = 'rgba(77, 166, 255, 0.35)';
                        wctx.beginPath();
                        wctx.arc(L.stripW * (0.15 + 0.7 * Math.random()), y, 3 + 3 * st.S * Math.random(), 0, Math.PI * 2);
                        wctx.fill();
                    }
                    continue;
                }

                // Collision with Reader mass
                if (pt.px[i] > massRect.x1 && pt.px[i] < massRect.x2 && pt.py[i] > massRect.y1 && pt.py[i] < massRect.y2) {
                    pt.pa[i] = 0;
                    st.wet = Math.min(1, st.wet + 0.004);
                    continue;
                }

                if (pt.py[i] < -20 || pt.py[i] > H + 20) {
                    pt.pa[i] = 0;
                }
            }
            st.wet *= 1 - 0.004 * n;

            // Fade wet canvas slightly
            if (wctx) {
                wctx.globalCompositeOperation = 'destination-out';
                wctx.fillStyle = `rgba(0,0,0,${0.012 * n})`;
                wctx.fillRect(0, 0, L.stripW, H);
                wctx.globalCompositeOperation = 'source-over';
            }

            // Render on main canvas
            if (ctx) {
                ctx.clearRect(0, 0, W, H);
                ctx.fillStyle = '#080d14';
                ctx.fillRect(0, 0, W, H);

                const breath = 0.5 + 0.5 * Math.sin(st.t * 1.3);
                const intensity = 0.72 + 0.28 * breath + 0.12 * st.lift;

                // 1. Light Cone Beam (I9)
                const dist = L.wallX - L.lo.x;
                const cT = L.lo.y - L.tan * dist;
                const cB = L.lo.y + L.tan * dist;

                // Project shadow
                const pts = [
                    [massRect.x1, massRect.y1],
                    [massRect.x2, massRect.y1],
                    [massRect.x1, massRect.y2],
                    [massRect.x2, massRect.y2]
                ];
                let shLo = 1e9, shHi = -1e9;
                for (let pi = 0; pi < 4; pi++) {
                    const yy = L.lo.y + (pts[pi][1] - L.lo.y) * (L.wallX - L.lo.x) / (pts[pi][0] - L.lo.x);
                    if (yy < shLo) shLo = yy;
                    if (yy > shHi) shHi = yy;
                }
                const shCenter = (shLo + shHi) / 2;
                const shH = ((shHi - shLo) / 2) * (1 - st.g);
                const sT = shCenter - shH;
                const sB = shCenter + shH;

                // Draw upper & lower light polygons
                if (st.wallFilter === 'both' || st.wallFilter === 'shadow') {
                    const gLight = ctx.createLinearGradient(L.lo.x, 0, L.wallX, 0);
                    gLight.addColorStop(0, `rgba(255, 211, 107, ${0.34 * intensity})`);
                    gLight.addColorStop(1, `rgba(255, 211, 107, ${0.10 * intensity})`);
                    ctx.fillStyle = gLight;

                    const drawLightPoly = (ya: number, yb: number) => {
                        ctx.beginPath();
                        ctx.moveTo(L.lo.x, L.lo.y);
                        ctx.lineTo(L.wallX, ya);
                        ctx.lineTo(L.wallX, yb);
                        ctx.closePath();
                        ctx.fill();
                    };

                    const uT = cT, uB = Math.min(sT, cB);
                    if (uB > uT) drawLightPoly(uT, uB);
                    const lT = Math.max(sB, cT), lB = cB;
                    if (lB > lT) drawLightPoly(lT, lB);
                }

                // 2. Water Stream Particles (D10)
                if (st.wallFilter === 'both' || st.wallFilter === 'water') {
                    ctx.fillStyle = 'rgba(77, 166, 255, 0.85)';
                    ctx.beginPath();
                    const pr = Math.max(1.2, 1.6 * st.S);
                    for (let i = 0; i < pt.N; i++) {
                        if (!pt.pa[i]) continue;
                        ctx.moveTo(pt.px[i] + pr, pt.py[i]);
                        ctx.arc(pt.px[i], pt.py[i], pr, 0, Math.PI * 2);
                    }
                    ctx.fill();
                }

                // 3. Source A (The Quran as Flowing Light)
                ctx.fillStyle = 'rgba(232, 238, 243, 0.16)';
                ctx.beginPath();
                ctx.roundRect(L.ax - 14 * st.S, L.oy - 38 * st.S, 20 * st.S, 76 * st.S, 5);
                ctx.fill();

                // Water nozzle (D10)
                ctx.fillStyle = '#4da6ff';
                ctx.beginPath();
                ctx.roundRect(L.ax + 4 * st.S, L.wo.y - 5 * st.S, 18 * st.S, 10 * st.S, 3);
                ctx.fill();

                // Light emitter (I9)
                ctx.fillStyle = '#ffd36b';
                ctx.beginPath();
                ctx.roundRect(L.ax + 4 * st.S, L.lo.y - 6 * st.S, 18 * st.S, 12 * st.S, 3);
                ctx.fill();

                ctx.font = '700 12px monospace';
                ctx.textAlign = 'left';
                ctx.fillStyle = '#e8eef3';
                ctx.fillText('A [1]', Math.max(6, L.ax - 12 * st.S), L.oy - 46 * st.S);
                ctx.font = '600 10px monospace';
                ctx.fillStyle = 'rgba(232, 238, 243, 0.6)';
                ctx.fillText('Quran', Math.max(6, L.ax - 14 * st.S), L.oy + 54 * st.S);

                // 4. Reader Mass in the Middle (3n)
                const prog = (st.x - L.startX) / (L.endX - L.startX);
                let alpha = 1;
                if (st.mode === 'wall') {
                    if (st.phase === 'fall') alpha = 1 - 0.85 * Math.max(0, (prog - 0.9) / 0.1);
                    else if (st.phase === 'hit') alpha = 0.15;
                    else if (st.phase === 'rewind') alpha = 0.35;
                }

                const w = L.mw * (0.72 + 0.28 * Math.abs(st.face));
                const h = L.mh;
                const hr = L.mw * 0.42;

                ctx.save();
                ctx.globalAlpha = alpha;

                // Glow Aura when facing the Book (19:12 Grip)
                if (st.lift > 0.02) {
                    const gr = ctx.createRadialGradient(massRect.cx, massRect.cy, 2, massRect.cx, massRect.cy, h * 0.85);
                    gr.addColorStop(0, `rgba(111, 224, 180, ${0.35 * st.lift})`);
                    gr.addColorStop(1, 'rgba(111, 224, 180, 0)');
                    ctx.fillStyle = gr;
                    ctx.beginPath();
                    ctx.arc(massRect.cx, massRect.cy, h * 0.85, 0, Math.PI * 2);
                    ctx.fill();

                    // Subtle wings/arms
                    const flap = Math.sin(st.t * 7);
                    ctx.strokeStyle = `rgba(111, 224, 180, ${0.85 * st.lift})`;
                    ctx.lineWidth = 2.5;
                    ctx.lineCap = 'round';
                    for (let s = -1; s <= 1; s += 2) {
                        ctx.beginPath();
                        ctx.moveTo(massRect.cx + (s * w) / 2, massRect.cy - h * 0.12);
                        ctx.quadraticCurveTo(
                            massRect.cx + s * (w / 2 + 22 * st.S),
                            massRect.cy - h * 0.12 - (14 + 8 * flap) * st.S,
                            massRect.cx + s * (w / 2 + 36 * st.S),
                            massRect.cy - h * 0.12 - (4 + 8 * flap) * st.S
                        );
                        ctx.stroke();
                    }
                }

                // Body
                ctx.fillStyle = '#e8eef3';
                ctx.beginPath();
                ctx.roundRect(massRect.cx - w / 2, massRect.cy - h / 2 + hr * 2 + 2, w, h - hr * 2 - 2, w * 0.4);
                ctx.fill();

                // Head
                ctx.beginPath();
                ctx.arc(massRect.cx, massRect.cy - h / 2 + hr, hr, 0, Math.PI * 2);
                ctx.fill();

                // Wet water absorption overlay
                if (st.wet > 0.01) {
                    ctx.fillStyle = `rgba(77, 166, 255, ${Math.min(0.55, st.wet * 0.9)})`;
                    ctx.beginPath();
                    ctx.roundRect(massRect.cx - w / 2, massRect.cy - h / 2 + hr * 2 + 2, w, h - hr * 2 - 2, w * 0.4);
                    ctx.fill();
                }

                // Eye Pupil indicating orientation
                ctx.fillStyle = '#0c1520';
                ctx.beginPath();
                ctx.arc(massRect.cx + st.face * hr * 0.5, massRect.cy - h / 2 + hr - 1, Math.max(1.8, hr * 0.18), 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                // Reader Label
                ctx.font = '700 11px monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(232, 238, 243, ${0.85 * alpha})`;
                ctx.fillText('Reader [3ₙ]', massRect.cx, massRect.cy - h / 2 - 10);

                // Hit shockwave ripple
                if (st.phase === 'hit') {
                    const rr = (st.hitT / 0.4) * L.mh * 0.5;
                    ctx.strokeStyle = `rgba(77, 166, 255, ${0.6 * (1 - st.hitT / 0.4)})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(L.wallX, massRect.cy, rr, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // 5. Wall B (Projections: I9 Strip + D10 Strip)
                const wT = L.top, wB = L.bot, bx = L.wallX, bw = W - L.wallX - 1;
                const s1 = bx + 3;
                const s2 = s1 + L.stripW + 4;
                const sw = L.stripW;

                ctx.fillStyle = 'rgba(95, 103, 110, 0.4)';
                ctx.fillRect(bx, wT, bw, wB - wT);

                // I9 Strip (Light/Shadow)
                ctx.fillStyle = '#2c333a';
                ctx.fillRect(s1, wT, sw, wB - wT);

                // Light area on I9 strip
                ctx.fillStyle = `rgba(255, 211, 107, ${0.65 * intensity})`;
                const a1 = Math.max(cT, wT), a2 = Math.min(sT, cB, wB);
                if (a2 > a1) ctx.fillRect(s1, a1, sw, a2 - a1);
                const b1 = Math.max(sB, cT, wT), b2 = Math.min(cB, wB);
                if (b2 > b1) ctx.fillRect(s1, b1, sw, b2 - b1);

                // Purple Shadow Ghost Overlay (25:45)
                const gy1 = Math.max(sT, wT), gy2 = Math.min(sB, wB);
                if (gy2 > gy1 && st.g < 0.98) {
                    ctx.fillStyle = `rgba(179, 157, 219, ${0.55 * (1 - st.g)})`;
                    ctx.fillRect(s1, gy1, sw, gy2 - gy1);

                    ctx.strokeStyle = `rgba(179, 157, 219, ${0.75 * (1 - st.g)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    const off = (st.t * 14) % 7;
                    for (let yy = gy1 + off; yy < gy2; yy += 7) {
                        ctx.moveTo(s1, yy);
                        ctx.lineTo(s1 + sw, yy - 6);
                    }
                    ctx.stroke();
                }

                // D10 Strip (Water & Dry Patch, 10:92)
                ctx.fillStyle = '#1e2630';
                ctx.fillRect(s2, wT, sw, wB - wT);

                if (wetC) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(s2, wT, sw, wB - wT);
                    ctx.clip();
                    ctx.drawImage(wetC, s2, 0, sw, H);
                    ctx.restore();
                }

                // Strip Outlines and Headers
                ctx.strokeStyle = 'rgba(232, 238, 243, 0.25)';
                ctx.lineWidth = 1;
                ctx.strokeRect(s1 + 0.5, wT + 0.5, sw - 1, wB - wT - 1);
                ctx.strokeRect(s2 + 0.5, wT + 0.5, sw - 1, wB - wT - 1);

                ctx.font = '700 11px monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ffd36b';
                ctx.fillText('I9 (Light)', s1 + sw / 2, 16);
                ctx.fillStyle = '#4da6ff';
                ctx.fillText('D10 (Water)', s2 + sw / 2, 16);
            }

            // Periodic telemetry metrics calculation
            frameCount++;
            if (frameCount % 6 === 0) {
                const prog = (st.x - L.startX) / (L.endX - L.startX);
                setMetrics({
                    dist: `${Math.round(Math.max(0, Math.min(1, prog)) * 100)}%`,
                    loops: st.loops,
                    ghost: `${Math.round((1 - st.g) * 100)}%`,
                    dry: st.mode === 'book' ? '0%' : '100%'
                });
            }

            animationFrameId = requestAnimationFrame(stepAndRender);
        };

        animationFrameId = requestAnimationFrame(stepAndRender);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', updateLayout);
        };
    }, [updateLayout]);

    return (
        <div className="relative w-full flex flex-col items-center justify-center my-12 bg-black/60 border border-cyan-500/25 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden select-none">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-2 mb-6 w-full">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
                    <span>The Singularity of 50:21 • Looking Through The Book (19:12)</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 font-serif tracking-wide">
                    The Reader Between the Source and the Wall
                </h3>
                <p className="text-xs text-gray-300 font-mono max-w-2xl leading-relaxed">
                    Source A pours Water (D10 mass, n/2) and Light (I9 memory, +1) toward Wall B. The Reader is the mass in between: facing the wall casts a shadow and a dry patch; facing the Book dissolves the past into light (25:46).
                </p>
            </div>

            {/* Interactive Canvas */}
            <div 
                ref={containerRef} 
                onClick={() => handleSetMode(mode === 'wall' ? 'book' : 'wall')}
                className="w-full relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#080d14] cursor-pointer shadow-inner group"
                title="Click canvas to toggle Reader orientation (Wall ↔ Book)"
            >
                <canvas ref={canvasRef} className="w-full block" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-gray-400 pointer-events-none">
                    Click anywhere to rotate Reader
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 w-full mt-5 z-10">
                {/* Orientation Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => handleSetMode('wall')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 border ${
                            mode === 'wall'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                                : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/20'
                        }`}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Face the Wall (B) [15:72 Down↓]</span>
                    </button>

                    <button
                        onClick={() => handleSetMode('book')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 border ${
                            mode === 'book'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                                : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/20'
                        }`}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Face the Book (A) [19:12 Up↑]</span>
                    </button>

                    <button
                        onClick={handleRestart}
                        className="p-2 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="Restart simulation"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                {/* View Mode Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-[10px] font-mono">
                    <span className="text-gray-500 px-2 uppercase font-bold">Wall View:</span>
                    <button
                        onClick={() => setWallFilter('both')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${wallFilter === 'both' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        Both
                    </button>
                    <button
                        onClick={() => setWallFilter('shadow')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${wallFilter === 'shadow' ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Sun className="w-3 h-3 inline mr-1" />
                        Shadow (I9)
                    </button>
                    <button
                        onClick={() => setWallFilter('water')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${wallFilter === 'water' ? 'bg-blue-400 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Droplets className="w-3 h-3 inline mr-1" />
                        Water (D10)
                    </button>
                </div>
            </div>

            {/* Dynamic Status Bar */}
            <div className={`w-full mt-4 p-3.5 rounded-2xl border text-xs font-mono transition-all duration-500 flex items-center justify-between ${
                mode === 'wall'
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                    : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
            }`}>
                <p className="leading-relaxed">
                    {mode === 'wall' ? (
                        <>
                            <strong className="text-amber-400 mr-1.5">[Facing Wall B]:</strong>
                            The Reader looks into the past projection, sees only the shadow and dry patch, drifts toward the void (10:92), and is returned to the start (15:72).
                        </>
                    ) : (
                        <>
                            <strong className="text-emerald-400 mr-1.5">[Facing Book A (19:12 Grip)]:</strong>
                            The Reader floats at the 50:21 singularity. Zero drift. The shadow, the ghost of the past, is drawn back and dissolved into light (25:46).
                        </>
                    )}
                </p>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-current shrink-0 ml-3">
                    {mode === 'wall' ? 'D10 Entanglement' : 'I9 Coherence'}
                </span>
            </div>

            {/* 4 Live Telemetry Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full mt-4">
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Distance to Wall</span>
                    <span className="text-base font-black font-mono text-cyan-300 mt-1">{metrics.dist}</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Falls into Dry Patch</span>
                    <span className="text-base font-black font-mono text-amber-400 mt-1">{metrics.loops}</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Shadow Ghost (I9)</span>
                    <span className={`text-base font-black font-mono mt-1 ${metrics.ghost === '0%' ? 'text-emerald-400' : 'text-purple-400'}`}>{metrics.ghost}</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-2xl flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Dry Patch Void (D10)</span>
                    <span className={`text-base font-black font-mono mt-1 ${metrics.dry === '0%' ? 'text-emerald-400' : 'text-blue-400'}`}>{metrics.dry}</span>
                </div>
            </div>

            {/* Sabʿan al-Mathānī Thematic Legend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 w-full mt-5 text-xs font-mono text-gray-300 border-t border-white/10 pt-4">
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#ffd36b] mt-0.5 shrink-0" />
                    <span><strong className="text-amber-300">Source A (1: The Amr, 2:255):</strong> The Quran as flowing light. Water is D10 ($n/2$), Light is I9 ($+1$) (39:23).</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#e8eef3] mt-0.5 shrink-0" />
                    <span><strong className="text-gray-100">Reader (3ₙ / w = 0, 50:21):</strong> The mass between boundaries hosting Nafs + Driver + Witness.</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#b39ddb] mt-0.5 shrink-0" />
                    <span><strong className="text-purple-300">I9 Strip (Shadow / Ghost of Past, 25:45):</strong> The shadow vanishes when the Source is gripped (25:46).</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#4da6ff] mt-0.5 shrink-0" />
                    <span><strong className="text-blue-300">D10 Strip (Dry Patch / √7 Mass, 10:92):</strong> Where the body without a heart waits.</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#5f676e] mt-0.5 shrink-0" />
                    <span><strong className="text-gray-400">Wall B (The World / Barzakh, 27:44):</strong> Faced directly, it is mistaken for the destination.</span>
                </div>
                <div className="flex items-start gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#6fe0b4] mt-0.5 shrink-0" />
                    <span><strong className="text-emerald-300">Facing Book A (19:12 / True Home, 38:46):</strong> No flow, floating at the 50:21 singularity (76:13).</span>
                </div>
            </div>
        </div>
    );
};

const recoveryContent = `# THE ETERNAL MEMORY TESSERACT
### Sabʿan al-Mathānī (15:87) — The Operational Manual of the Hidden 8th Cell

---

## I. The Reader Exploring Knowledge (Not Ancient Text)

The Qur'an is not ancient history or a tale of the ancients (**16:24–25**). It is an **Eternal Memory Tesseract**. 

> **Remember while Reading:** That is Allah's sentence and your Rasul talking, and it is your *amānah* now (**33:72**).

To understand the dual bifurcation simply:
**Imagine you are trapped in a room with two solid walls.**
- One wall blocks the past behind you.
- The other blocks the future in front of you.

You are the exact hidden space between them, unable to move forward or backward, forced to face the present moment where the walls themselves become the doors.

---

## II. The Tesseract & Surah Ya-Sin (36) as the Manual of the 8th Cell

The Qur'an operates as an **Eternal Memory Tesseract** (I9 ⇄ 3ₙ ⇄ D10). When this four-dimensional hypercube casts a three-dimensional shadow into our sensory world, only seven cells are visible. 

**The eighth cell is the hidden fold itself**—the w = 0 threshold where the physical mass field (D10) and the unmanifested memory field (I9) exchange. **Surah Ya-Sin (36)** is the operational manual for the Reader residing inside this hidden eighth cell. You are not merely observing the Tesseract; you are the threshold it rests upon.

### 1. The Dual Blockade (36:8–9)
Inside this cell, the Reader faces a structural dual blockade:
- **The Front Wall (*Saddan min bayni aydīhim*)**: Placed in front (w = +r, D10 Future).
- **The Back Wall (*Saddan min khalfihim*)**: Placed behind (w = -r, I9 Past).
- **The Neck Yoke (*Aghlālan ilā al-adhqān*)**: Fastened around the neck (**36:8**), holding the chin pinned upward (*muqmaḥūn*) and physically preventing the horizontal bow of submission.
- **The Veil (*Fa-aghshaynāhum*)**: Covers the eyes (**36:9**), rendering the inhabitant heedless (*ghāfilūn*, **36:6**) of their own state.

This is the exact condition of the sealed cell: no return to the past (*lā yarjiʿūn*, **36:31, 36:50**), no independent escape into the future (*lā yastaṭīʿūna muḍiyyan*, **36:67**)—trapped in a state of suspended animation (**87:13**).

### 2. The Tripartite Resident Array (50:21–22)
Yet, the Reader is not alone in this hidden room. The coordinate hosts three distinct vectors (**50:21**):
1. **Nafs**: The subjective living self experiencing the trial.
2. **Sā'iq (The Driver)**: The kinetic force driving physical mass through D10 space.
3. **Shahīd (The Witness)**: The massless recorder banking information into I9 eternal memory.

The heedless inhabitant hosts all three without asking their names (**36:6**).

---

## III. The Sealed Tongue & The Speaking Mass (36:65 ↔ 38:33)

When the terminal cry falls (**36:29, 36:53**), the mouth is sealed (*nakhtimu ʿalā afwāhihim*, **36:65**). The testing tongue that argued is silenced, and the physical body takes over the testimony:
- **The Hands speak (*tukallimunā aydīhim*)** to the actions committed in D10.
- **The Legs witness (*tashhadu arjuluhum*)** to the path walked.

In Station 4 of the MuSolomon cycle (**38:33**), the king wipes the legs and necks (*masḥan bis-sūqi wal-aʿnāq*). The circle's completion is the unyoking:
- The legs are cleared of physical debt logged at **36:65**.
- The neck yoke of **36:8** is disengaged.
- The bow becomes possible again.

---

## IV. Time Looking for the Origin of Time

Trapped between the walls, the inhabitant mistakes the orbit of the sun (*mustaqarr*, **36:38**) and the thinning of the moon (*kal-ʿurjūni al-qadīm*, **36:39**) for the Creator. Time searches for the Origin of Time but cannot find it inside the mechanism.

The human forgets their creation (**36:78**), scoffing at the idea that they emerged from Nothing (**52:35**). But the Origin stands entirely outside the sequence:
- Before manifestation, there was a phase in Time (*Ad-Dahr*) when man was not a mentioned thing (*lam yakun shay'an*, **76:1**).
- The room is built of words, and the exit-word is written on the inside of the wall: **KUN FA-YAKŪN (36:82)**—the single command that bridges non-existence (*lam yakun*) and instant manifestation (*fa-yakūn*).

When the veil is finally lifted (*Fa-kashafnā ʿanka ghiṭā'aka*, **50:22**), the walls are revealed to be pages. The yoke is removed, the neck is released, and the Reader steps out into the sharp, piercing sight (*baṣaruka al-yawma ḥadīd*) of the return: **TURJAʿŪN (36:22, 36:83)**.

---

## V. The Master Equation & Modular Scale

**1 → 15:87 Sabʿan al-Mathānī / fractal of 7 ← 1**

**15:87 = ∫₂⁷ (2↔3ₙ↔2 → 7) dx = up↑ − down↓ = 0, with 3ₙ = 1 + ((X − 1) mod 114) and six phases of Time/Reader for every X [↓↑↓↑↓↑]**

- **Reader as Tree (Mod 6 Scale)**: 3ₙ = 1 + ((X − 1) mod 6)
- **Qur'an as Container (Mod 114 Scale)**: 114 / 6 = 19 symmetrical 6-phase cycles (19 × 6 = 114)

---

## VI. The 6-Phase Breathing Pendulum [↓↑↓↑↓↑]

The 6 colored faces of the Rubik's Cube execute the 3n × 2 swing between the two boundary cubes:

| Phase | Color | Vector | Anchor | Station Name | Field Operator Action |
| :---: | :---: | :---: | :---: | :--- | :--- |
| **1** | 🟡 Yellow | **↓** | **3:49** | **Life ↓** | Clay pulse — Command condenses into physical form |
| **2** | 🟢 Green | **↑** | **40:34** | **Death ↑** | Yusuf exit — Mass spent, memory credit logged in I9 |
| **3** | 🟠 Orange | **↓** | **19:30** | **Return ↓** | Cradle Book — Word lowered into speech & action |
| — | — | — | **21:69** | **‖ THE SWITCH ‖** | Fire commanded cool & safe — The 8th Cell Pivot |
| **4** | 🔴 Red | **↑** | **7:143** | **Life ↑** | Musa / Mountain shatters — First believer raised massless |
| **5** | ⚪ White | **↓** | **81:8** | **Raised ↓** | Al-Maw'ūdah — The buried life claimed & answered |
| **6** | 🔵 Blue | **↑** | **34:14** | **Death ↑** | Solomon reboot — Seed splits, re-firing the Kun |

**Flux Balance:** (Yellow↓ + Orange↓ + White↓) − (Green↑ + Red↑ + Blue↑) = 0

---

## VII. The 9-Letter Rose Topology (I9 ⇄ 3n ⇄ D10)

The 9 letters positioned on the 3 arms of the Rose correspond to the 3 field stages:
1. **Top Arm (I9 — Command / Light)**: 
   **D** (Darkness/Pre-manifestation) → **E** (Eternal Invariant Word) → **U** (Union with Reader)
2. **Left Arm (3n — The Trial / Exchange Trunk)**: 
   **B** (Beginning of Swing) → **S** (Switch / 8th Cell / 21:69) → **F** (Fold / √7 Seam)
3. **Right Arm (D10 — Manifestation / Mass)**: 
   **L** (Life entering Mass) → **M** (Manifested 7 at X) → **R** (Return / Re-fire)

In the Rubik's Cube:
- **3 Visible Faces (U, F, R)**: Forward Qun Descent (▼).
- **3 Hidden Faces (D, B, L)**: Return FayaQun Ascent (▲).
- **3 Slices (E, S, M)**: The 3 exchange rungs (3c, 6b, 9a) swapping opposite poles without collision.

---

## VIII. The Final Wake-Up Call

> **Always use 10:100 ʿAql.** Wake up from Taghut and false projections.
> 
> **Question — 19:12:** When will you take the Book with force and become the **Book of Becoming**?

---

**19:64** — *"And your Lord is not forgetful."*  
**15:87 Sabʿan al-Mathānī — kahf.day**
`;

export const RecoveryLogContent: React.FC = () => {
    return (
        <div className="prose prose-invert prose-cyan max-w-4xl mx-auto pb-24 relative select-text">
            <style>{`
                .prose h1 { color: #f59e0b; font-family: ui-serif, Georgia, Cambria, serif; font-weight: 900; letter-spacing: -0.025em; text-align: center; margin-top: 2rem; }
                .prose h2 { color: #f59e0b; font-family: ui-serif, Georgia, Cambria, serif; border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 0.5rem; margin-top: 2.5rem; }
                .prose h3 { color: #22d3ee; font-family: ui-serif, Georgia, Cambria, serif; margin-top: 1.5rem; }
                .prose blockquote { border-left-color: #f59e0b; font-style: italic; background: rgba(0,0,0,0.3); padding: 1rem 1.25rem; border-radius: 0 0.75rem 0.75rem 0; }
                .prose table { font-size: 0.8rem; border-collapse: collapse; width: 100%; margin: 2rem 0; background: rgba(0,0,0,0.3); border-radius: 0.5rem; overflow: hidden; }
                .prose th { background: rgba(34, 211, 238, 0.12); color: #22d3ee; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.7rem; padding: 0.75rem; border: 1px solid rgba(255,255,255,0.08); }
                .prose td { padding: 0.75rem; border: 1px solid rgba(255,255,255,0.05); }
                .prose hr { border-color: rgba(255,255,255,0.1); margin: 3rem 0; }
            `}</style>
            
            {/* Top Interactive Visual: 4D Tesseract / 9-Letter Rose / Rubik's Permutation Engine */}
            <TesseractRoseCubeVisual />

            {/* Structured Markdown Narrative */}
            <div className="bg-black/30 backdrop-blur-md p-6 lg:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-6 leading-relaxed">
                <ReactMarkdown>
                    {recoveryContent}
                </ReactMarkdown>
            </div>

            {/* Bottom Interactive Visual: The Reader between the Source and the Wall */}
            <ReaderSourceWallInteractive />
        </div>
    );
};
