/**
 * Input Component Tokens
 * 
 * Tokens specific to input components including text fields and search.
 */

export const input = {
  small: {
    cornerRadius: 8,
    height: 36,
  },
  medium: {
    cornerRadius: 8,
    height: 40,
  },
  large: {
    cornerRadius: 8,
    height: 48,
  },
  borderWidth: 1,
  borderWidthFocused: 2,
  search: {
    backgroundColor: '#ededee',
  },
  focusShadow: {
    layer1: {
      offsetX: 0,
      offsetY: 0,
      blur: 0,
      color: 'rgba(0, 0, 0, 0.12)',
    },
    layer2: {
      offsetX: 0,
      offsetY: 0,
      blur: 0,
      color: 'rgba(0, 0, 0, 0.12)',
    },
    layer3: {
      offsetX: 0,
      offsetY: 0,
      blur: 0,
      color: 'rgba(0, 0, 0, 0.12)',
    },
  },
} as const;

export type InputTokens = typeof input;
