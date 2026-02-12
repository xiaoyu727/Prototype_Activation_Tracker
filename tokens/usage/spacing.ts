/**
 * Usage Spacing Tokens
 * 
 * Semantic spacing values for consistent layouts.
 * Use these for padding, margin, and gap properties.
 */

export const spacing = {
  none: 0,
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
} as const;

// Legacy spacing tokens (for backward compatibility)
export const legacySpacing = {
  narrow: {
    xSmall: 2,
    medium: 6,
  },
  regular: {
    medium: 8,
    large: 12,
    xLarge: 16,
  },
  broad: {
    medium: 28,
    xLarge: 36,
  },
} as const;

export type Spacing = typeof spacing;
export type LegacySpacing = typeof legacySpacing;
