/**
 * UI Color Tokens
 * 
 * Colors for UI elements including text, backgrounds, borders, and icons.
 */

export const uiColors = {
  text: {
    default: '#181818',
    subdued: '#6c6c6c',
    selected: '#4c4c4c',
    inverseDisabled: '#424242',
    positive: '#327a34',
  },
  bg: {
    default: '#ffffff',
    dim: '#f8f8f8',
    surface: '#f1f1f1',
    surfaceDim: '#ffffff',
    surfaceSecondary: '#f8f8f8',
    surfaceTransparent: 'rgba(255, 255, 255, 0.48)',
    surfacePositive: '#e0f9de',
  },
  border: {
    subdued: '#d9dada',
  },
  icon: {
    default: '#191919',
    inverse: '#ffffff',
  },
} as const;

export type UIColors = typeof uiColors;
