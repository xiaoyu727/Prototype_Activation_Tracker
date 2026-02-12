/**
 * Control Component Tokens
 * 
 * Shared tokens for interactive controls (buttons, inputs, selects, etc.).
 */

export const control = {
  xSmall: {
    height: 28,
  },
  small: {
    height: 36,
  },
  medium: {
    height: 40,
  },
  large: {
    height: 44,
  },
} as const;

export type ControlTokens = typeof control;
