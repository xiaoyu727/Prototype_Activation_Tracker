/**
 * Button Component Tokens
 *
 * Aligned with Figma Emporos UI Library (node 120-25620).
 * Design control heights: xsmall 28, small 36, medium 48.
 * We map: small → 36px, medium → 48px, large → 52px (see SIZE DIFFERENCES below).
 */

export const button = {
  /** Figma: usage/border-radius/full */
  borderRadius: 9999,
  /** Figma: usage/space/medium (16), usage/space/large (24) for horizontal padding. compact = 12 for tight inline actions. */
  paddingX: {
    compact: 12,
    small: 16,
    medium: 20,
    large: 24,
  },
  /** Vertical padding to hit design heights with label line-heights. compact = 4 for hug height. */
  paddingY: {
    compact: 4,
    small: 8,   // 8+8+20 = 36 (Figma component.shared.control.small.height)
    medium: 13, // 13+13+22 = 48 (Figma component.shared.control.medium.height)
    large: 14,  // 14+14+24 = 52 — not in Figma (design max height 48)
  },
  /**
   * Min heights from design system. large is beyond Figma (design stops at 48px).
   * compact has no minHeight (hug content). SIZE DIFFERENCES: Figma has no "large" control; our large = 52px.
   */
  minHeight: {
    small: 36,
    medium: 48,
    large: 52,
  },
} as const;

export type ButtonTokens = typeof button;
