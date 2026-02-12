/**
 * Badge Component Tokens
 *
 * Single-style badge from Figma Emporos UI Library (node 209-1249).
 * One visual style: subdued border + subdued text on default background.
 * Sizes only: small (12px label), medium (16px label).
 */

export const badge = {
  /** Figma: usage/border-radius/full */
  borderRadius: 9999,
  /** Single style: background uses --color-color-border-subdued in component; text uses --Text-Subdued/--color-color-text-subdued in component; no border */
  small: {
    /** Figma: usage/space/xxx-small (2), x-small (8) */
    paddingX: 8,
    paddingY: 2,
    /** Figma: usage/type/label/x-small/strong */
    fontSize: 12,
    lineHeight: 18,
  },
  medium: {
    paddingX: 10,
    paddingY: 4,
    /** Figma: usage/type/label/medium/strong for larger badge */
    fontSize: 16,
    lineHeight: 22,
  },
} as const;

export type BadgeTokens = typeof badge;
