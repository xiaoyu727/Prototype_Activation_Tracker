/**
 * Icon Button Component Tokens
 * 
 * Tokens specific to icon-only button components.
 */

export const iconButton = {
  xSmall: {
    cornerRadius: 9999,
    size: 28,
  },
  small: {
    cornerRadius: 9999,
    size: 36,
  },
  medium: {
    cornerRadius: 9999,
    size: 40,
  },
} as const;

export type IconButtonTokens = typeof iconButton;
