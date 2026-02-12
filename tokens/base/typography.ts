/**
 * Base Typography Tokens
 * 
 * Foundation typography values including font families and base sizes.
 */

export const baseTypography = {
  fontFamily: {
    brand: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    xxSmall: 10,
  },
} as const;

export type BaseTypography = typeof baseTypography;
