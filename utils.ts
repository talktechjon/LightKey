
import { TOTAL_SLICES, SLICE_DATA, MAKKI_ICON_SVG, MADANI_ICON_SVG, CUMULATIVE_VERSES, TOTAL_VERSES } from './constants.ts';
import type { SliceData, VerseAddress } from './types.ts';
import * as d3 from 'd3';

/**
 * Converts polar coordinates (radius, angle) to Cartesian coordinates (x, y).
 */
export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
};

/**
 * Calculates which slice is currently aligned with a given point on the dial.
 */
export const getSliceAtPoint = (pointValue: number, rotation: number): SliceData => {
    const offset = rotation / 360 * TOTAL_SLICES;
    const effectivePoint = (pointValue - 1) - offset;
    const wrappedIndex = Math.round(effectivePoint);
    const finalIndex = ((wrappedIndex % TOTAL_SLICES) + TOTAL_SLICES) % TOTAL_SLICES;
    return SLICE_DATA[finalIndex];
}

/**
 * A convenience wrapper around getSliceAtPoint to directly get the chapter ID.
 */
export const getSliceIdAtPoint = (pointValue: number, rotation: number): number => {
    return getSliceAtPoint(pointValue, rotation).id;
};

/**
 * Returns the appropriate SVG icon data URI based on the revelation type.
 */
export const getChapterIcon = (revelationType: string) => {
    return revelationType === 'Makki' ? MAKKI_ICON_SVG : MADANI_ICON_SVG;
};

/**
 * Processes an array of items by applying an async function to them in batches.
 */
export async function processInBatches<T, R>(
  items: T[],
  asyncFn: (item: T) => Promise<R>,
  batchSize: number
): Promise<R[]> {
  let results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batchItems = items.slice(i, i + batchSize);
    const batchPromises = batchItems.map(asyncFn);
    const batchResults = await Promise.all(batchPromises);
    results = [...results, ...batchResults];
  }
  return results;
}

export const colorScale = d3.scaleLinear<string>()
    .domain([1, TOTAL_SLICES * 0.25, TOTAL_SLICES * 0.5, TOTAL_SLICES * 0.75, TOTAL_SLICES * 0.875, TOTAL_SLICES])
    .range(['#87CEFA', '#4682B4', '#FFD700', '#FF4500', '#483D8B', '#87CEFA'])
    .interpolate(d3.interpolateHcl);

/**
 * Gets the global index (1-6236) for a given Surah:Ayah address.
 */
export const getGlobalVerseIndex = (surah: number, ayah: number): number => {
  if (surah < 1 || surah > 114) return 1;
  const base = CUMULATIVE_VERSES[surah - 1];
  return Math.min(base + ayah, TOTAL_VERSES);
};

/**
 * Gets the Surah:Ayah address for a given global index (1-6236).
 */
export const getVerseAddressFromGlobalIndex = (index: number): VerseAddress => {
  const normalizedIndex = ((index - 1) % TOTAL_VERSES + TOTAL_VERSES) % TOTAL_VERSES + 1;
  for (let i = 0; i < CUMULATIVE_VERSES.length; i++) {
    if (CUMULATIVE_VERSES[i] >= normalizedIndex) {
      const surah = i;
      const ayah = normalizedIndex - CUMULATIVE_VERSES[i - 1];
      return { surah, ayah };
    }
  }
  return { surah: 1, ayah: 1 };
};
