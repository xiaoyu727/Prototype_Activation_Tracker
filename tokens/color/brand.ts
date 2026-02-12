/**
 * Brand Color Tokens
 * 
 * Brand-specific colors used throughout the application.
 * These define the core visual identity of the product.
 */

/**
 * From Figma Emporos UI Library: color/brand/*, Fill/Brand, Text/Disabled, Surface/Disabled.
 */
export const brandColors = {
  sidebarBg: '#181818',
  bgFillBrand: '#4c4c4c',
  textOnBgFillBrand: '#f1f1f1',
  /** Figma: color/brand/color-bg-fill-brand-disabled */
  bgFillBrandDisabled: '#e9e9e9',
  /** Figma: color/brand/color-text-on-bg-fill-brand-disabled */
  textOnBgFillBrandDisabled: '#bfbfbf',
  /** Figma: color/color-bg-surface-disabled (for secondary disabled) */
  surfaceDisabled: '#f8f8f8',
  /** Figma: color/color-text-disabled */
  textDisabled: '#bfbfbf',
  borderSelected: '#9a9a9a',
  canvasBg: '#f8f8f8',
} as const;

export type BrandColors = typeof brandColors;
