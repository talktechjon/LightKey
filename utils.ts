import { TOTAL_SLICES, SLICE_DATA } from './constants.ts';
import type { SliceData } from './types.ts';

/**
 * Converts polar coordinates (radius, angle) to Cartesian coordinates (x, y).
 * @param centerX The x-coordinate of the center point.
 * @param centerY The y-coordinate of the center point.
 * @param radius The radius from the center point.
 * @param angleInDegrees The angle in degrees.
 * @returns An object with x and y properties.
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
 * @param pointValue The static point on the dial's circumference (1-114).
 * @param rotation The current rotation of the dial in degrees.
 * @returns The SliceData for the aligned slice.
 */
export const getSliceAtPoint = (pointValue: number, rotation: number): SliceData => {
    const offset = rotation / 360 * TOTAL_SLICES;
    // The pointValue is 1-based, so we adjust. The offset is subtracted because
    // a positive rotation moves the slices clockwise, meaning a point aligns with a "previous" slice index.
    const effectivePoint = (pointValue - 1) - offset;
    const wrappedIndex = Math.round(effectivePoint);
    // Modulo arithmetic to wrap around the 114 slices correctly for both positive and negative results.
    const finalIndex = ((wrappedIndex % TOTAL_SLICES) + TOTAL_SLICES) % TOTAL_SLICES;
    return SLICE_DATA[finalIndex];
}

/**
 * A convenience wrapper around getSliceAtPoint to directly get the chapter ID.
 * @param pointValue The static point on the dial's circumference (1-114).
 * @param rotation The current rotation of the dial in degrees.
 * @returns The ID of the aligned slice (chapter number).
 */
export const getSliceIdAtPoint = (pointValue: number, rotation: number): number => {
    return getSliceAtPoint(pointValue, rotation).id;
};

/**
 * Processes an array of items by applying an async function to them in batches.
 * This helps to avoid sending too many concurrent requests.
 * @param items The array of items to process.
 * @param asyncFn The async function to apply to each item.
 * @param batchSize The number of items to process in each batch.
 * @returns A promise that resolves to an array of results.
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