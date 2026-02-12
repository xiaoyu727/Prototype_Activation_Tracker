/**
 * Prism color tokens (Figma Prism Foundations / Prism Base).
 * Sourced from: usage/color and selected comp/color variables.
 * Use these as the single source of truth; semantic layer references these where applicable.
 *
 * References:
 * - Prism Base: https://www.figma.com/design/Mp8dBTFCjNZsLGrG4A5O9V/Prism-Base?node-id=0-211
 * - Prism Foundations: https://www.figma.com/design/4dTVxONyPrT1oiEyUkYhIy/Prism-Foundations
 */

// ---- Usage colors (semantic primitives from Prism) ----
export const prismUsageColors = {
  text: {
    default: '#191919',
    subdued: '#606060',
    inverse: '#ffffff',
    disabled: '#b2b2b2',
    link: { default: '#4969f5', hovered: '#2a4de4', pressed: '#1537c7' },
  },
  icon: {
    default: '#191919',
    subdued: '#606060',
    inverse: '#ffffff',
    /** Prism primitive: icon on inverse/dark background (e.g. light graphite 12) */
    subduedOnInverse: '#7D7D7D',
    disabled: '#b2b2b2',
  },
  background: {
    default: '#ffffff',
    subdued: '#f7f7f7',
    strong: '#f1f1f1',
    elevated: '#ffffff',
    hovered: '#f7f7f7',
    pressed: '#f1f1f1',
    disabled: '#f7f7f7',
    inverse: '#191919',
  },
  border: {
    default: '#e4e4e4',
    hovered: '#d6d6d6',
    pressed: '#c4c4c4',
    disabled: '#f7f7f7',
    focused: '#191919a8',
  },
  positive: {
    default: '#00832d',
    subdued: '#e7fbef',
  },
  negative: {
    default: '#d91400',
    subdued: '#fff0ed',
  },
  overlay: '#19191980',
} as const;

// ---- Component colors (where we align components to Prism) ----
export const prismCompColors = {
  button: {
    tertiary: {
      text: '#191919',
      background: '#f1f1f1',
    },
  },
} as const;

export type PrismUsageColors = typeof prismUsageColors;
export type PrismCompColors = typeof prismCompColors;
