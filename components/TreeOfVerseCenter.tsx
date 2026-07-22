import React, { useState, useEffect } from 'react';
import { KATHARA_GRID_NODES, KATHARA_GRID_LINES } from '../constants.ts';

interface TreeOfVerseCenterProps {
  rotation: number;
  treeRootVerse: { surah: number, ayah: number };
  treeTrines: { surah: number, ayah: number }[][];
  onVerseSelect: (surah: number, ayah: number) => void;
}

const TREE_LABELS = [
    'The Seed', 'The Rupture', 'The Search', 
    'The Cleanse', 'The Trunk', 'The Branching', 
    'The Flowering', 'The Ripening', 'The Harvest', 
    'The Pressing', 'The Extraction', 'The Oil (Light)'
];

const NODE_COLORS = [
    '#cbd5e1', // 1: The Seed
    '#f5c842', // 2: The Rupture
    '#06b6d4', // 3: The Search
    '#3b82f6', // 4: The Cleanse
    '#4ade80', // 5: The Trunk
    '#22c55e', // 6: The Branching
    '#84cc16', // 7: The Flowering
    '#eab308', // 8: The Ripening
    '#f97316', // 9: The Harvest
    '#ef4444', // 10: The Pressing
    '#ec4899', // 11: The Extraction
    '#a855f7'  // 12: The Oil (Light)
];

export const TreeOfVerseCenter: React.FC<TreeOfVerseCenterProps> = ({ rotation, treeRootVerse, treeTrines, onVerseSelect }) => {
    const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
    const [isHorizontal, setIsHorizontal] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Horizontal layout on wide-screen desktop displays (>= 1024px)
            setIsHorizontal(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Stretched coordinate mapping for original vertical representation
    const transformY = (y: number) => 22 + (y - 20) * 1.15;

    // Direct point translator that handles horizontal rotation beautifully
    const pt = (x_orig: number, y_orig: number): { x: number; y: number } => {
        if (isHorizontal) {
            // Map Y-axis (scale/spread along spine) to Horizontal X-axis:
            // original y goes from 20 to 260. We stretch it to range between 22 and 298.
            // To read naturally Left-to-Right starting from Node 1 (origin y=260) to Node 12 (origin y=20):
            const mappedX = 22 + (260 - y_orig) * 1.15;

            // Map X-axis of vertical grid to Horizontal Y-axis:
            // Spine is kept center (y = 80).
            // Left row (x=30) goes top (y=35).
            // Right row (x=120) goes bottom (y=125).
            const mappedY = 80 + (x_orig - 75) * 1.0;
            return { x: mappedX, y: mappedY };
        } else {
            // Vertical mode
            return { x: x_orig, y: transformY(y_orig) };
        }
    };

    const renderDiagram = () => {
        return (
            <svg 
                viewBox={isHorizontal ? "-55 0 430 160" : "-40 -10 230 358"} 
                className="w-full h-full max-h-[440px] lg:max-h-[75vh] drop-shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all select-none"
                aria-hidden="true"
            >
                <style>{`
                    @keyframes pulse-cyan { 0% { opacity: 0.35; } 50% { opacity: 0.75; } 100% { opacity: 0.35; } }
                    .tree-line-pulse { animation: pulse-cyan 3.5s infinite ease-in-out; }
                    .node-circle-glow { filter: drop-shadow(0 0 6px var(--glow-color)); }
                    .node-circle-hover { filter: drop-shadow(0 0 14px var(--glow-color)); cursor: pointer; }
                `}</style>
                
                {/* Connections & Filter Bridges */}
                <g strokeWidth="1.2">
                    {KATHARA_GRID_LINES.filter(l => l.from <= 12 && l.to <= 12).map((line, index) => {
                        const fromNode = KATHARA_GRID_NODES.find(n => n.id === line.from);
                        const toNode = KATHARA_GRID_NODES.find(n => n.id === line.to);
                        if (!fromNode || !toNode) return null;

                        const fromPt = pt(fromNode.x, fromNode.y);
                        const toPt = pt(toNode.x, toNode.y);

                        // Special rendering for vertical/diagonal paths in the image
                        const isMainVerticalRightUpper = (line.from === 10 && line.to === 7) || (line.from === 7 && line.to === 10);
                        const isMainVerticalRightLower = (line.from === 7 && line.to === 4) || (line.from === 4 && line.to === 7);
                        const isMainVerticalLeftUpper = (line.from === 9 && line.to === 6) || (line.from === 6 && line.to === 9);
                        const isMainVerticalLeftLower = (line.from === 6 && line.to === 3) || (line.from === 3 && line.to === 6);

                        if (isMainVerticalRightUpper) {
                            // Wavy line: 10 to 7
                            if (isHorizontal) {
                                // Side horizontal wave control offsets in horizontal projection
                                const pathData = `M ${fromPt.x} ${fromPt.y} C ${fromPt.x - 15} ${fromPt.y + 4}, ${toPt.x + 15} ${fromPt.y - 4}, ${toPt.x} ${toPt.y}`;
                                return (
                                    <path 
                                        key={`line-${index}`}
                                        d={pathData}
                                        fill="none"
                                        stroke="#cbd5e1"
                                        strokeWidth="1.8"
                                        className="tree-line-pulse"
                                    />
                                );
                            } else {
                                const pathData = `M 120 ${fromPt.y} C 124 ${fromPt.y + 15}, 116 ${fromPt.y + 25}, 120 ${toPt.y}`;
                                return (
                                    <path 
                                        key={`line-${index}`}
                                        d={pathData}
                                        fill="none"
                                        stroke="#cbd5e1"
                                        strokeWidth="1.8"
                                        className="tree-line-pulse"
                                    />
                                );
                            }
                        }

                        if (isMainVerticalRightLower) {
                            // Dashed blue line: 7 to 4
                            return (
                                <line 
                                    key={`line-${index}`}
                                    x1={fromPt.x} y1={fromPt.y} 
                                    x2={toPt.x} y2={toPt.y} 
                                    stroke="#3b82f6" 
                                    strokeWidth="1.8"
                                    strokeDasharray="3 3"
                                    className="tree-line-pulse"
                                />
                            );
                        }

                        if (isMainVerticalLeftUpper) {
                            // Dotted white line: 9 to 6
                            return (
                                <line 
                                    key={`line-${index}`}
                                    x1={fromPt.x} y1={fromPt.y} 
                                    x2={toPt.x} y2={toPt.y} 
                                    stroke="#ffffff" 
                                    strokeWidth="1.8"
                                    strokeDasharray="1.5 2.5"
                                    className="tree-line-pulse"
                                />
                            );
                        }

                        if (isMainVerticalLeftLower) {
                            // Solid glowing cyan/blue line: 6 to 3
                            return (
                                <line 
                                    key={`line-${index}`}
                                    x1={fromPt.x} y1={fromPt.y} 
                                    x2={toPt.x} y2={toPt.y} 
                                    stroke="#06b6d4" 
                                    strokeWidth="2.2"
                                    style={{ filter: 'drop-shadow(0 0 3px #06b6d4)' }}
                                />
                            );
                        }

                        return (
                            <line 
                                key={`line-${index}`}
                                x1={fromPt.x} y1={fromPt.y} 
                                x2={toPt.x} y2={toPt.y} 
                                stroke="rgba(255,255,255,0.08)" 
                                strokeWidth="1" 
                            />
                        );
                    })}
                </g>

                {/* Filter Bridges & Labels (108, 103, 110) */}
                {[
                    { id: 13, y: 200, label: '108', leftSym: '△', rightSym: '🔥' },
                    { id: 14, y: 140, label: '103', leftSym: '🔥', rightSym: '🐟' },
                    { id: 15, y: 80, label: '110', leftSym: '🐟', rightSym: '🌳' }
                ].map(bridge => {
                    const center = pt(75, bridge.y);
                    if (isHorizontal) {
                        return (
                            <g key={bridge.id}>
                                {/* Vertical bridge line in Horizontal layout */}
                                <line x1={center.x} y1="35" x2={center.x} y2="125" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                                
                                {/* Bridge center index box */}
                                <rect x={center.x - 12} y="73.5" width="24" height="13" rx="3.5" fill="#02040a" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                                <text x={center.x} y="80" textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="950" fill="#ffffff" className="font-sans">
                                    {bridge.label}
                                </text>

                                {/* Top and Bottom symbols on the bridge */}
                                <text x={center.x} y="55" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={bridge.leftSym === '△' ? '#fff' : undefined} className="font-semibold select-none">
                                    {bridge.leftSym}
                                </text>
                                <text x={center.x} y="105" textAnchor="middle" dominantBaseline="middle" fontSize="9" className="font-semibold select-none">
                                    {bridge.rightSym}
                                </text>
                            </g>
                        );
                    } else {
                        return (
                            <g key={bridge.id}>
                                {/* Horizontal bridge line backing */}
                                <line x1="30" y1={center.y} x2="120" y2={center.y} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                                
                                {/* Bridge center index box */}
                                <rect x="63" y={center.y - 6.5} width="24" height="13" rx="3.5" fill="#02040a" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                                <text x="75" y={center.y} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="950" fill="#ffffff" className="font-sans">
                                    {bridge.label}
                                </text>

                                {/* Left and Right symbols on the bridge */}
                                <text x="51" y={center.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={bridge.leftSym === '△' ? '#fff' : undefined} className="font-semibold select-none">
                                    {bridge.leftSym}
                                </text>
                                <text x="99" y={center.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" className="font-semibold select-none">
                                    {bridge.rightSym}
                                </text>
                            </g>
                        );
                    }
                })}

                {/* Vertical labels (verse addresses next to left/right vertical paths) */}
                {(() => {
                    const v3_6 = treeTrines[2]?.[0] ? `${treeTrines[2][0].surah}:${treeTrines[2][0].ayah}` : '';
                    const v9_6 = treeTrines[8]?.[0] ? `${treeTrines[8][0].surah}:${treeTrines[8][0].ayah}` : '';
                    const v10_7 = treeTrines[9]?.[0] ? `${treeTrines[9][0].surah}:${treeTrines[9][0].ayah}` : '';
                    const v7_4 = treeTrines[6]?.[0] ? `${treeTrines[6][0].surah}:${treeTrines[6][0].ayah}` : '';

                    const midY_3_6 = (200 + 140) / 2;
                    const midY_9_6 = (80 + 140) / 2;
                    const midY_10_7 = (80 + 140) / 2;
                    const midY_7_4 = (140 + 200) / 2;

                    const p3_6 = pt(30, midY_3_6);
                    const p9_6 = pt(30, midY_9_6);
                    const p10_7 = pt(120, midY_10_7);
                    const p7_4 = pt(120, midY_7_4);

                    if (isHorizontal) {
                        return (
                            <g style={{ opacity: 0.9 }}>
                                {v3_6 && (
                                    <text 
                                        x={p3_6.x} y="28" 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="6.5" fontWeight="bold" fill="#06b6d4" 
                                        className="font-mono tracking-tighter" 
                                        style={{ textShadow: '0 0 3px rgba(6,182,212,0.3)' }}
                                    >
                                        {v3_6}
                                    </text>
                                )}
                                {v9_6 && (
                                    <text 
                                        x={p9_6.x} y="28" 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="6.5" fontWeight="bold" fill="#ec4899" 
                                        className="font-mono tracking-tighter" 
                                        style={{ textShadow: '0 0 3px rgba(236,72,153,0.3)' }}
                                    >
                                        {v9_6}
                                    </text>
                                )}
                                {v10_7 && (
                                    <text 
                                        x={p10_7.x} y="132" 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="6.5" fontWeight="bold" fill="#ec4899" 
                                        className="font-mono tracking-tighter" 
                                        style={{ textShadow: '0 0 3px rgba(236,72,153,0.3)' }}
                                    >
                                        {v10_7}
                                    </text>
                                )}
                                {v7_4 && (
                                    <text 
                                        x={p7_4.x} y="132" 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="6.5" fontWeight="bold" fill="#3b82f6" 
                                        className="font-mono tracking-tighter" 
                                        style={{ textShadow: '0 0 3px rgba(59,130,246,0.3)' }}
                                    >
                                        {v7_4}
                                    </text>
                                )}
                            </g>
                        );
                    } else {
                        return (
                            <g style={{ opacity: 0.9 }}>
                                {v3_6 && (
                                    <text 
                                        x="16" y={p3_6.y} 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="7" fontWeight="bold" fill="#06b6d4" 
                                        className="font-mono tracking-tighter" 
                                        transform={`rotate(-90 16 ${p3_6.y})`}
                                        style={{ textShadow: '0 0 3px rgba(6,182,212,0.3)' }}
                                    >
                                        {v3_6}
                                    </text>
                                )}

                                {v9_6 && (
                                    <text 
                                        x="16" y={p9_6.y} 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="7" fontWeight="bold" fill="#ec4899" 
                                        className="font-mono tracking-tighter" 
                                        transform={`rotate(-90 16 ${p9_6.y})`}
                                        style={{ textShadow: '0 0 3px rgba(236,72,153,0.3)' }}
                                    >
                                        {v9_6}
                                    </text>
                                )}

                                {v10_7 && (
                                    <text 
                                        x="134" y={p10_7.y} 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="7" fontWeight="bold" fill="#ec4899" 
                                        className="font-mono tracking-tighter" 
                                        transform={`rotate(90 134 ${p10_7.y})`}
                                        style={{ textShadow: '0 0 3px rgba(236,72,153,0.3)' }}
                                    >
                                        {v10_7}
                                    </text>
                                )}

                                {v7_4 && (
                                    <text 
                                        x="134" y={p7_4.y} 
                                        textAnchor="middle" dominantBaseline="middle" 
                                        fontSize="7" fontWeight="bold" fill="#3b82f6" 
                                        className="font-mono tracking-tighter" 
                                        transform={`rotate(90 134 ${p7_4.y})`}
                                        style={{ textShadow: '0 0 3px rgba(59,130,246,0.3)' }}
                                    >
                                        {v7_4}
                                    </text>
                                )}
                            </g>
                        );
                    }
                })()}

                {/* Circle Nodes 1 to 12 */}
                {KATHARA_GRID_NODES.slice(0, 12).map((node, index) => {
                    const nodeColor = NODE_COLORS[index] || '#06b6d4';
                    const point = pt(node.x, node.y);
                    const isHovered = hoveredNodeId === node.id;
                    const nodeVerse = treeTrines[index]?.[0];
                    const label = TREE_LABELS[index];

                    // Determine text anchors & offset coordinates for node labels
                    let labelX = point.x;
                    let labelY = point.y;
                    let labelAnchor: 'start' | 'middle' | 'end' = 'middle';
                    let verseX = point.x;
                    let verseY = point.y;
                    let verseAnchor: 'start' | 'middle' | 'end' = 'middle';

                    const isSpineNode = node.x === 75;

                    if (isHorizontal) {
                        const isTopRow = node.x < 75; // 3, 6, 9
                        const isBottomRow = node.x > 75; // 4, 7, 10

                        if (isTopRow) {
                            labelX = point.x;
                            labelY = point.y - 20;
                            labelAnchor = 'middle';
                            verseX = point.x;
                            verseY = point.y - 13;
                            verseAnchor = 'middle';
                        } else if (isBottomRow) {
                            labelX = point.x;
                            labelY = point.y + 20;
                            labelAnchor = 'middle';
                            verseX = point.x;
                            verseY = point.y + 13;
                            verseAnchor = 'middle';
                        } else {
                            // Spine nodes: 1, 2, 5, 8, 11, 12
                            if (node.id === 1) {
                                labelX = point.x - 15;
                                labelY = point.y - 3;
                                labelAnchor = 'end';
                                verseX = point.x - 15;
                                verseY = point.y + 5;
                                verseAnchor = 'end';
                            } else if (node.id === 12) {
                                labelX = point.x + 15;
                                labelY = point.y - 3;
                                labelAnchor = 'start';
                                verseX = point.x + 15;
                                verseY = point.y + 5;
                                verseAnchor = 'start';
                            } else if (node.id === 5 || node.id === 11) {
                                // Above
                                labelX = point.x;
                                labelY = point.y - 20;
                                labelAnchor = 'middle';
                                verseX = point.x;
                                verseY = point.y - 13;
                                verseAnchor = 'middle';
                            } else {
                                // 2, 8: Below
                                labelX = point.x;
                                labelY = point.y + 20;
                                labelAnchor = 'middle';
                                verseX = point.x;
                                verseY = point.y + 13;
                                verseAnchor = 'middle';
                            }
                        }
                    } else {
                        // Vertical mode
                        const isLeftSide = node.x < 75;

                        if (!isSpineNode) {
                            // Left & Right sides of vertical layout
                            const anchor = isLeftSide ? 'end' : 'start';
                            const xOffset = isLeftSide ? -15 : 15;
                            labelX = point.x + xOffset;
                            labelY = point.y - 3;
                            labelAnchor = anchor;
                            verseX = point.x + xOffset;
                            verseY = point.y + 5;
                            verseAnchor = anchor;
                        } else {
                            // Central spine nodes of vertical layout: always below the node circle
                            const tYOffset = 18;
                            labelX = point.x;
                            labelY = point.y + tYOffset;
                            labelAnchor = 'middle';
                            verseX = point.x;
                            verseY = point.y + tYOffset + 7.5;
                            verseAnchor = 'middle';
                        }
                    }

                    return (
                        <g 
                            key={node.id}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            onClick={() => nodeVerse && onVerseSelect(nodeVerse.surah, nodeVerse.ayah)}
                            className={isHovered ? 'node-circle-hover' : 'node-circle-glow'}
                            style={{ '--glow-color': nodeColor } as React.CSSProperties}
                        >
                            {/* Inner Circle backing */}
                            <circle 
                                cx={point.x} cy={point.y} r="11" 
                                fill="#03040a" 
                                stroke={nodeColor} 
                                strokeWidth="2.0" 
                                style={{ transition: 'all 0.25s ease' }}
                            />

                            {/* Node Core ID Number */}
                            <text 
                                x={point.x} y={point.y} 
                                textAnchor="middle" dy=".32em" 
                                fontSize="9" fontWeight="950" 
                                fill={nodeColor}
                                className="font-sans"
                            >
                                {node.id}
                            </text>

                            {/* Interactive Verse Tooltip anchor label or direct placement */}
                            <g style={{ opacity: isHovered ? 1.0 : 0.75, transition: 'all 0.25s' }}>
                                {/* Label Text (our side data label like 'The Seed') */}
                                <text 
                                    x={labelX} 
                                    y={labelY} 
                                    textAnchor={labelAnchor} 
                                    fontSize="6" 
                                    fill="#eaeaea" 
                                    fontWeight="bold" 
                                    className="uppercase tracking-wide"
                                >
                                    {label}
                                </text>

                                {/* Verse address value */}
                                {nodeVerse && (
                                    <text 
                                        x={verseX} 
                                        y={verseY} 
                                        textAnchor={verseAnchor} 
                                        fontSize="5.5" 
                                        fill={nodeColor} 
                                        fontWeight="semibold" 
                                        className="font-mono"
                                    >
                                        {nodeVerse.surah}:{nodeVerse.ayah}
                                    </text>
                                )}
                            </g>
                        </g>
                    );
                })}
            </svg>
        );
    };

    return (
        <div className={`flex flex-col items-center justify-between w-full min-h-[420px] sm:min-h-[460px] p-4 bg-slate-950/45 border border-white/5 rounded-2xl backdrop-blur-md animate-in fade-in duration-500 ${isHorizontal ? 'max-w-3xl' : 'max-w-lg'} mx-auto overflow-hidden gap-y-3`}>
            {/* Elegant HUD branding line */}
            <div className="w-full flex justify-between items-center opacity-65 border-b border-cyan-500/10 pb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-cyan-400">Mursalin Path</span>
                <span className="text-[10px] font-mono font-bold text-gray-500">Root: {treeRootVerse.surah}:{treeRootVerse.ayah}</span>
            </div>

            <div className="w-full flex-1 flex items-center justify-center min-h-0">
                {renderDiagram()}
            </div>

            <div className="w-full flex justify-between items-center opacity-50 text-[8px] font-mono font-bold pt-1 border-t border-cyan-500/5">
                <span>ROTATION: {Math.round(rotation)}°</span>
                <span>HARVEST RATIO: 12-PHASE</span>
            </div>
        </div>
    );
};

export default TreeOfVerseCenter;
