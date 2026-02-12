/**
 * Semantic Color Tokens
 *
 * Human-readable aliases. Where possible, values come from Figma Prism (usage/color).
 * See tokens/PRISM_MAPPING.md for mapping and for tokens that have no Prism match.
 */

import { prismUsageColors } from '../prism/colors';

// ---- From Prism ----
const { text: prismText, background: prismBg, border: prismBorder, positive: prismPositive, negative: prismNegative } =
  prismUsageColors;

/** Prism: usage/color/text/default */
const textNeutral = prismText.default;
/** Mapped to --Text-Subdued; fallback #6E6E71 (was Prism text/subdued #606060) */
const textSubdued = '#6E6E71';
/** Prism: usage/color/text/inverse/default */
const textInverse = prismText.inverse;
/** No Prism match: Prism text/disabled is #b2b2b2; kept #424242 for contrast */
const textDisabled = '#424242';
/** No Prism match: Prism positive/default is #00832d; kept for tag/status green */
const textPositive = '#327A34';
/** No Prism match: Prism negative/default is #d91400; kept for tag/status red */
const textNegative = '#C83527';
/** Figma: color/color-text-warning */
const textWarning = '#9D5D00';

/** Prism: usage/color/background/strong/default */
const surfaceDefault = prismBg.strong;
/** Prism: usage/color/background/subdued/default */
const surfaceSubdued = prismBg.subdued;
/** Prism: usage/color/background/default */
const surfaceRaised = prismBg.default;
/** No Prism match: Prism elevated is #ffffff; kept for dropdowns */
const surfaceElevated = '#FBFBFB';

/** Prism: usage/color/positive/subdued/default */
const surfacePositive = prismPositive.subdued;
/** Prism: usage/color/negative/subdued/default */
const surfaceNegative = prismNegative.subdued;
/** Figma: color/color-bg-surface-warning */
const surfaceWarning = '#FFEFDA';

/** Prism: usage/color/background/hovered */
const interactionSurfaceHovered = prismBg.hovered;
/** Prism: usage/color/background/pressed */
const interactionSurfacePressed = prismBg.pressed;

/** Prism: usage/color/border/default */
const borderDefault = prismBorder.default;
/** Figma: Border/Neutral. Matches --color-border-neutral in tokens.css */
const borderNeutral = '#E4E4E5';
/** No Prism match: table cell borders */
const borderTable = '#EDEDEE';
/** No Prism match: focus ring; Prism border/focused is #191919a8 */
const borderFocused = '#0F2594';
/** No Prism match: Prism border/selected is #191919 */
const borderSelected = '#9A9A9A';

/** Prism: usage/color/overlay (modal backdrop) */
const overlayBackdrop = prismUsageColors.overlay;

export const semanticColors = {
  text: {
    neutral: textNeutral,
    subdued: textSubdued,
    inverse: textInverse,
    disabled: textDisabled,
    positive: textPositive,
    negative: textNegative,
    warning: textWarning,
  },
  surface: {
    default: surfaceDefault,
    subdued: surfaceSubdued,
    raised: surfaceRaised,
    elevated: surfaceElevated,
    neutralTertiary: surfaceRaised,
    transparent: surfaceRaised,
    positive: surfacePositive,
    negative: surfaceNegative,
    warning: surfaceWarning,
  },
  /** Figma: color/color-bg-fill for prominent neutral tag */
  fill: {
    neutral: '#181818',
  },
  interaction: {
    surfaceHovered: interactionSurfaceHovered,
    surfacePressed: interactionSurfacePressed,
  },
  border: {
    subdued: borderDefault,
    table: borderTable,
    neutral: borderNeutral,
    selected: borderSelected,
    focused: borderFocused,
  },
  background: {
    default: surfaceRaised,
    subdued: surfaceSubdued,
  },
  overlay: {
    backdrop: overlayBackdrop,
  },
} as const;

export type SemanticColors = typeof semanticColors;
