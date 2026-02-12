/**
 * Color Tokens
 * 
 * Complete color system including brand colors, UI colors, and themed variants.
 */

export { brandColors, type BrandColors } from './brand';
export { uiColors, type UIColors } from './ui';

import { brandColors } from './brand';
import { uiColors } from './ui';

export const colors = {
  brand: brandColors,
  ui: uiColors,
} as const;

export type ColorTokens = typeof colors;
