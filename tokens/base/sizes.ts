/**
 * Base Size Tokens
 * 
 * Primitive size values in pixels.
 * Foundation for spacing, dimensions, and component sizing.
 */

export const baseSizes = {
  1: 4,
  2: 8,
  4: 16,
  6: 24,
} as const;

export type BaseSizes = typeof baseSizes;
