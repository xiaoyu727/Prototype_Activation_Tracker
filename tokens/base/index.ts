/**
 * Base Tokens
 * 
 * Primitive design values that form the foundation of the design system.
 * These tokens should rarely be referenced directly in components.
 * Instead, use semantic or usage tokens that reference these base values.
 */

export { baseColors, type BaseColors } from './colors';
export { baseSizes, type BaseSizes } from './sizes';
export { baseTypography, type BaseTypography } from './typography';

import { baseColors } from './colors';
import { baseSizes } from './sizes';
import { baseTypography } from './typography';

export const base = {
  colors: baseColors,
  sizes: baseSizes,
  typography: baseTypography,
} as const;

export type BaseTokens = typeof base;
