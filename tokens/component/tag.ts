/**
 * Tag Component Tokens
 * Figma Emporos UI Library node 124-143998.
 * Sizes: small (12px), medium (14px), large (16px). Padding from Figma component.tag.*.paddingX.
 */

export const tag = {
  small: {
    paddingX: 6,
    paddingY: 2,
    fontSize: 12,
    lineHeight: 18,
    minHeight: 20,
    iconSize: 12,
  },
  medium: {
    paddingX: 8,
    paddingY: 4,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 28,
    iconSize: 16,
  },
  large: {
    paddingX: 8,
    paddingY: 4,
    fontSize: 16,
    lineHeight: 22,
    minHeight: 32,
    iconSize: 16,
  },
} as const;

export type TagTokens = typeof tag;
