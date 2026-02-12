/**
 * Typography Style Utility
 * 
 * Converts typography tokens to CSS styles.
 */

import type { TypographyStyle } from '../usage/typography';

export interface TypographyCSS {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
}

/**
 * Converts a typography token to CSS-ready styles
 * 
 * @example
 * const styles = getTypographyStyles(tokens.usage.typography.label.small.default);
 * // Returns: {
 * //   fontFamily: 'SF Pro, ...',
 * //   fontSize: '14px',
 * //   fontWeight: 510,
 * //   lineHeight: '20px',
 * //   letterSpacing: '-0.01px'
 * // }
 */
export function getTypographyStyles(typography: TypographyStyle): TypographyCSS {
  return {
    fontFamily: typography.fontFamily,
    fontSize: `${typography.fontSize}px`,
    fontWeight: typography.fontWeight,
    lineHeight: `${typography.lineHeight}px`,
    letterSpacing: `${typography.letterSpacing}px`,
  };
}

/**
 * Converts typography token to a React style object
 */
export function getTypographyReactStyles(typography: TypographyStyle): React.CSSProperties {
  return getTypographyStyles(typography) as React.CSSProperties;
}
