import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { polarToCartesian } from '../utils.ts';

interface Point {
    x: number;
    y: number;
}

interface VersePolygonProps {
    verseCount: number;
    radius: number;
    color: string;
    center: { x: number; y: number };
    fillOpacity?: number;
    strokeOpacity?: number;
    strokeWidth?: number;
    groupOpacity?: number;
    isLowResourceMode?: boolean;
}

const VersePolygon: React.FC<VersePolygonProps> = ({
    verseCount,
    radius,
    color,
    center,
    fillOpacity = 0.15,
    strokeOpacity = 1,
    strokeWidth = 1.25,
    groupOpacity = 1,
    isLowResourceMode = false,
}) => {
    const gRef = useRef<SVGGElement>(null);

    const { points, pathD } = useMemo(() => {
        if (verseCount < 1) return { points: [], pathD: '' };

        const calculatedPoints: Point[] = Array.from({ length: verseCount }, (_, i) => {
            const angleInDegrees = (i / verseCount) * 360;
            return polarToCartesian(center.x, center.y, radius, angleInDegrees);
        });

        let calculatedPathD = '';
        if (verseCount > 2) {
            calculatedPathD = 'M ' + calculatedPoints.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' L ') + ' Z';
        } else if (verseCount === 2) {
            calculatedPathD = 'M ' + calculatedPoints.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' L ');
        }

        return { points: calculatedPoints, pathD: calculatedPathD };
    }, [verseCount, radius, center.x, center.y]);

    useEffect(() => {
        if (!gRef.current) return;

        const g = d3.select(gRef.current);
        const transition = isLowResourceMode 
            ? d3.transition().duration(0) 
            : d3.transition().duration(400).ease(d3.easeLinear);

        const pathStrokeColor = d3.color(color)?.copy({ opacity: strokeOpacity })?.toString() || color;
        const pathFillColor = verseCount > 2 ? d3.color(color)?.copy({ opacity: fillOpacity })?.toString() || 'none' : 'none';

        // --- Handle Path ---
        const pathSelection = g.selectAll<SVGPathElement, string>('path.verse-path')
            .data(pathD ? [pathD] : [], d => d);

        pathSelection.exit()
            .transition(transition)
            .style('opacity', 0)
            .remove();

        pathSelection.enter()
            .append('path')
            .attr('class', 'verse-path')
            .attr('d', d => d)
            .attr('fill', pathFillColor)
            .attr('stroke', pathStrokeColor)
            .attr('stroke-width', strokeWidth)
            .style('opacity', 0)
          .merge(pathSelection)
            .transition(transition)
            .style('opacity', groupOpacity);
            
        // --- Handle Dots ---
        const dotsData = points.length > 0 ? [{ key: pathD || `dots-${verseCount}`, points }] : [];
        const dotsContainerSelection = g.selectAll<SVGGElement, typeof dotsData[0]>('g.dots-container')
            .data(dotsData, d => d.key);

        dotsContainerSelection.exit()
            .transition(transition)
            .style('opacity', 0)
            .remove();

        const dotsContainerEnter = dotsContainerSelection.enter()
            .append('g')
            .attr('class', 'dots-container')
            .style('opacity', 0);
        
        dotsContainerEnter.selectAll('circle')
            .data(d => d.points)
            .enter()
            .append('circle')
            .attr('fill', pathStrokeColor)
            .attr('r', verseCount === 1 ? 2.5 : 1.5)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        dotsContainerEnter.merge(dotsContainerSelection)
            .transition(transition)
            .style('opacity', 1);

    }, [points, pathD, color, verseCount, fillOpacity, strokeOpacity, strokeWidth, groupOpacity, isLowResourceMode]);

    return (
        <g ref={gRef} aria-hidden="true" />
    );
};

export default VersePolygon;
