/**
 * Base Color Tokens
 * 
 * Primitive color values that serve as the foundation for the design system.
 * These should rarely be used directly - prefer semantic or usage tokens.
 */

export const baseColors = {
  neutral: {
    50: '#8b8b8b',
    20: '#c4c4c4',
  },
} as const;

export type BaseColors = typeof baseColors;
