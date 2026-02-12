/**
 * Usage Sizing Tokens
 * 
 * Semantic size values for UI elements, icons, and components.
 */

export const sizing = {
  xSmall: 16,
  small: 24,
  medium: 32,
  large: 40,
  xLarge: 48,
  action: {
    small: 32,
    medium: 36,
  },
} as const;

export type Sizing = typeof sizing;
