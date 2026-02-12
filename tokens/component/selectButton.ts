/**
 * Select Button Component Tokens
 * 
 * Tokens specific to select/dropdown button components.
 */

export const selectButton = {
  borderWidth: 1,
  color: {
    bg: 'transparent',
    bgHovered: '#f6f6f6',
  },
} as const;

export type SelectButtonTokens = typeof selectButton;
