/**
 * Usage Tokens
 * 
 * Semantic tokens for specific use cases.
 * These provide context-specific values that reference base tokens.
 */

export { spacing, legacySpacing, type Spacing, type LegacySpacing } from './spacing';
export { typography, type Typography, type TypographyStyle } from './typography';
export { sizing, type Sizing } from './sizing';
export { borderRadius, type BorderRadius } from './borderRadius';
export { borderWidth, type BorderWidth } from './borderWidth';
export { iconColors, type IconColors } from './iconColors';

import { spacing, legacySpacing } from './spacing';
import { typography } from './typography';
import { sizing } from './sizing';
import { borderRadius } from './borderRadius';
import { borderWidth } from './borderWidth';
import { iconColors } from './iconColors';

export const usage = {
  spacing,
  legacySpacing,
  typography,
  sizing,
  borderRadius,
  borderWidth,
  iconColors,
} as const;

export type UsageTokens = typeof usage;
