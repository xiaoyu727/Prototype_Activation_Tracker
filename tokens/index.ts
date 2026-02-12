/**
 * Design Tokens
 * 
 * Complete design token system for the Emporos UI Library (Alchemy).
 * 
 * Token Hierarchy:
 * 1. Base - Primitive values (colors, sizes, typography)
 * 2. Usage - Semantic application (spacing, typography styles, sizing)
 * 3. Color - Brand and UI colors
 * 4. Component - Component-specific customization
 * 5. Semantic - Human-readable aliases
 * 
 * Usage:
 * import { tokens } from './tokens';
 * 
 * const buttonPadding = tokens.usage.spacing.medium; // 16
 * const primaryColor = tokens.semantic.colors.text.neutral; // Prism text/default
 */

export * from './base';
export * from './prism';
export * from './usage';
export * from './color';
export * from './component';
export * from './semantic';

import { base } from './base';
import { usage } from './usage';
import { colors } from './color';
import { component } from './component';
import { semantic } from './semantic';
import * as prism from './prism';

export const tokens = {
  base,
  usage,
  colors,
  component,
  semantic,
  prism,
} as const;

export type Tokens = typeof tokens;

// Re-export commonly used types
export type { TypographyStyle } from './usage/typography';
