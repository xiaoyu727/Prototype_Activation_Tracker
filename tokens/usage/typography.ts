/**
 * Usage Typography Tokens
 * 
 * Composite typography tokens that bundle multiple properties.
 * Each token includes font-family, size, weight, line-height, and letter-spacing.
 */

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}

export const typography = {
  display: {
    large: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 32,
      fontWeight: 700, // Bold
      lineHeight: 40,
      letterSpacing: -0.01,
    },
  },
  label: {
    small: {
      default: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 14,
        fontWeight: 500, // Medium
        lineHeight: 20,
        letterSpacing: -0.01,
      },
      strong: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 14,
        fontWeight: 600, // Semibold
        lineHeight: 20,
        letterSpacing: -0.01,
      },
    },
    xSmall: {
      strong: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 12,
        fontWeight: 600, // Semibold
        lineHeight: 18,
        letterSpacing: -0.01,
      },
    },
    /** Figma: usage/type/label/medium/strong - for Button medium */
    medium: {
      strong: {
        fontFamily: '"SF Pro", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 16,
        fontWeight: 590,
        lineHeight: 22,
        letterSpacing: -0.01,
      },
    },
    /** Figma: usage/type/label/large/strong - for Button large */
    large: {
      strong: {
        fontFamily: '"SF Pro", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 24,
        letterSpacing: -0.01,
      },
    },
  },
  body: {
    small: {
      default: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 14,
        fontWeight: 400, // Regular
        lineHeight: 20,
        letterSpacing: -0.01,
      },
      strong: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 14,
        fontWeight: 600, // Semibold
        lineHeight: 20,
        letterSpacing: -0.01,
      },
    },
    medium: {
      strong: {
        fontFamily: '"SF Pro", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 16,
        fontWeight: 590, // SF Pro Semibold
        lineHeight: 22,
        letterSpacing: -0.01,
      },
    },
  },
  link: {
    small: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
      fontWeight: 600, // Semibold
      lineHeight: 20,
      letterSpacing: -0.01,
    },
  },
  caption: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontWeight: 400, // Regular
    lineHeight: 19.6,
    letterSpacing: 0,
  },
} as const;

export type Typography = typeof typography;
