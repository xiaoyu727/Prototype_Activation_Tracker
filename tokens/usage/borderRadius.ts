/**
 * Usage Border Radius Tokens
 * 
 * Semantic border radius values for consistent rounded corners.
 */

export const borderRadius = {
  none: 0,
  small: 4,
  medium: 8,
  large: 12,
  xLarge: 16,
  full: 9999, // Pill shape
} as const;

export type BorderRadius = typeof borderRadius;
