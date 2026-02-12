/**
 * Usage Border Width Tokens
 * 
 * Semantic border width values for outlines and dividers.
 */

export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 3,
} as const;

export type BorderWidth = typeof borderWidth;
