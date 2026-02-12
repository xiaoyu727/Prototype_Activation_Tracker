/**
 * CSS Variables Generator
 * 
 * Converts design tokens to CSS custom properties.
 */

import { tokens } from '../index';

type CSSVariables = Record<string, string | number>;

/**
 * Converts design tokens to CSS custom property format
 * 
 * @example
 * const cssVars = toCSSVariables(tokens);
 * // Returns: {
 * //   '--color-text-neutral': '#181818',
 * //   '--spacing-medium': '16px',
 * //   ...
 * // }
 */
export function toCSSVariables(): CSSVariables {
  const cssVars: CSSVariables = {};

  // Semantic colors
  Object.entries(tokens.semantic.colors.text).forEach(([key, value]) => {
    cssVars[`--color-text-${kebabCase(key)}`] = value;
  });

  Object.entries(tokens.semantic.colors.surface).forEach(([key, value]) => {
    cssVars[`--color-surface-${kebabCase(key)}`] = value;
  });

  Object.entries(tokens.semantic.colors.border).forEach(([key, value]) => {
    cssVars[`--color-border-${kebabCase(key)}`] = value;
  });

  Object.entries(tokens.semantic.colors.background).forEach(([key, value]) => {
    cssVars[`--color-background-${kebabCase(key)}`] = value;
  });

  // Spacing
  Object.entries(tokens.usage.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${kebabCase(key)}`] = `${value}px`;
  });

  // Border radius
  Object.entries(tokens.usage.borderRadius).forEach(([key, value]) => {
    cssVars[`--border-radius-${kebabCase(key)}`] = `${value}px`;
  });

  // Border width
  Object.entries(tokens.usage.borderWidth).forEach(([key, value]) => {
    cssVars[`--border-width-${kebabCase(key)}`] = `${value}px`;
  });

  // Icon colors
  Object.entries(tokens.usage.iconColors).forEach(([key, value]) => {
    cssVars[`--icon-color-${kebabCase(key)}`] = value;
  });

  // Sizing
  Object.entries(tokens.usage.sizing).forEach(([key, value]) => {
    if (typeof value === 'number') {
      cssVars[`--size-${kebabCase(key)}`] = `${value}px`;
    }
  });

  // Brand colors
  Object.entries(tokens.colors.brand).forEach(([key, value]) => {
    cssVars[`--brand-${kebabCase(key)}`] = value;
  });

  // Component control sizes
  Object.entries(tokens.component.control).forEach(([size, props]) => {
    cssVars[`--control-${kebabCase(size)}-height`] = `${props.height}px`;
  });

  return cssVars;
}

/**
 * Generates a CSS string with custom properties
 * 
 * @example
 * const css = toCSSString();
 * // Returns:
 * // :root {
 * //   --color-text-neutral: #181818;
 * //   --spacing-medium: 16px;
 * //   ...
 * // }
 */
export function toCSSString(): string {
  const cssVars = toCSSVariables();
  const properties = Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${properties}\n}`;
}

/**
 * Helper to convert camelCase to kebab-case
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
