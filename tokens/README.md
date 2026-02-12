# Design Tokens

Complete design token system for the Emporos UI Library (Alchemy), based on the Figma variable structure analysis.

## Overview

This token system follows a **7-tier architecture** that mirrors the Figma variable structure:

```
Raw Values → Base → Usage → Color/Component → Semantic → Aliased → Components
```

## Directory Structure

```
tokens/
├── base/              # Primitive values (foundation)
│   ├── colors.ts      # Base color palette
│   ├── sizes.ts       # Base sizing units
│   ├── typography.ts  # Base font families
│   └── index.ts
├── usage/             # Semantic application layer
│   ├── spacing.ts     # Spacing tokens
│   ├── typography.ts  # Typography styles (composite)
│   ├── sizing.ts      # Size tokens
│   ├── borderRadius.ts
│   ├── borderWidth.ts
│   ├── iconColors.ts
│   └── index.ts
├── color/             # Brand and UI colors
│   ├── brand.ts       # Brand-specific colors
│   ├── ui.ts          # UI element colors
│   └── index.ts
├── component/         # Component-specific tokens
│   ├── button.ts
│   ├── input.ts
│   ├── control.ts
│   ├── iconButton.ts
│   ├── selectButton.ts
│   ├── checkbox.ts
│   ├── tag.ts
│   └── index.ts
├── semantic/          # Human-readable aliases
│   ├── colors.ts      # Text, Surface, Border colors
│   └── index.ts
├── utils/             # Token utilities
│   ├── getTypographyStyles.ts
│   ├── toCSSVariables.ts
│   └── index.ts
├── index.ts           # Main entry point
├── tokens.css         # Generated CSS custom properties
└── README.md          # This file
```

## Usage

### Import Tokens in TypeScript/JavaScript

```typescript
import { tokens } from './tokens';

// Access semantic colors (recommended)
const textColor = tokens.semantic.colors.text.neutral; // '#181818'
const surfaceColor = tokens.semantic.colors.surface.default; // '#F1F1F1'

// Access spacing
const padding = tokens.usage.spacing.medium; // 16

// Access typography
const labelStyle = tokens.usage.typography.label.small.default;
// {
//   fontFamily: 'SF Pro, ...',
//   fontSize: 14,
//   fontWeight: 510,
//   lineHeight: 20,
//   letterSpacing: -0.01
// }

// Access component tokens
const buttonRadius = tokens.component.button.borderRadius; // 9999
const controlHeight = tokens.component.control.small.height; // 36
```

### Use Typography Utilities

```typescript
import { getTypographyStyles } from './tokens/utils';
import { tokens } from './tokens';

// Convert to CSS-ready format
const typographyCSS = getTypographyStyles(
  tokens.usage.typography.label.small.default
);
// {
//   fontFamily: 'SF Pro, ...',
//   fontSize: '14px',
//   fontWeight: 510,
//   lineHeight: '20px',
//   letterSpacing: '-0.01px'
// }

// Use in styled-components or CSS-in-JS
const Label = styled.span`
  ${getTypographyStyles(tokens.usage.typography.label.small.default)}
  color: ${tokens.semantic.colors.text.neutral};
`;
```

### Use CSS Custom Properties

Import the CSS file in your app:

```typescript
import './tokens/tokens.css';
```

Then use in CSS:

```css
.button {
  padding: var(--button-padding-y-small) var(--button-padding-x-small);
  border-radius: var(--button-border-radius);
  background-color: var(--brand-bg-fill-brand);
  color: var(--brand-text-on-bg-fill-brand);
  
  /* Typography */
  font-family: var(--typography-label-small-strong-font-family);
  font-size: var(--typography-label-small-strong-font-size);
  font-weight: var(--typography-label-small-strong-font-weight);
  line-height: var(--typography-label-small-strong-line-height);
  letter-spacing: var(--typography-label-small-strong-letter-spacing);
}

.card {
  background: var(--color-surface-raised);
  border: var(--border-width-thin) solid var(--color-border-subdued);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-medium);
}

.icon {
  color: var(--icon-color-default);
  width: var(--size-x-small);
  height: var(--size-x-small);
}
```

### Generate Custom CSS Variables

```typescript
import { toCSSVariables, toCSSString } from './tokens/utils';

// Get as object
const cssVars = toCSSVariables();
// { '--color-text-neutral': '#181818', ... }

// Get as CSS string
const cssString = toCSSString();
// :root {
//   --color-text-neutral: #181818;
//   --spacing-medium: 16px;
//   ...
// }
```

## Token Categories

### 1. Semantic Colors (Recommended for Components)

Use these human-readable tokens in your components:

```typescript
tokens.semantic.colors.text.neutral      // #181818
tokens.semantic.colors.text.subdued      // #202125
tokens.semantic.colors.text.inverse      // #FFFFFF
tokens.semantic.colors.text.positive     // #327A34

tokens.semantic.colors.surface.default   // #F1F1F1
tokens.semantic.colors.surface.raised    // #FFFFFF
tokens.semantic.colors.surface.subdued   // #F8F8F8

tokens.semantic.colors.border.subdued    // #EDEDEE
tokens.semantic.colors.border.focused    // #0F2594
tokens.semantic.colors.border.selected   // #9A9A9A
```

### 2. Spacing

```typescript
tokens.usage.spacing.none        // 0
tokens.usage.spacing.xxSmall     // 4
tokens.usage.spacing.xSmall      // 8
tokens.usage.spacing.small       // 12
tokens.usage.spacing.medium      // 16
tokens.usage.spacing.large       // 20
tokens.usage.spacing.xLarge      // 24
tokens.usage.spacing.xxLarge     // 32
```

### 3. Typography

Composite tokens that include all typography properties:

```typescript
tokens.usage.typography.display.large
tokens.usage.typography.label.small.default
tokens.usage.typography.label.small.strong
tokens.usage.typography.label.xSmall.strong
tokens.usage.typography.body.small.strong
tokens.usage.typography.link.small
tokens.usage.typography.caption
```

Each includes: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`

### 4. Border Radius

```typescript
tokens.usage.borderRadius.none       // 0
tokens.usage.borderRadius.small      // 4
tokens.usage.borderRadius.medium     // 8
tokens.usage.borderRadius.large      // 12
tokens.usage.borderRadius.xLarge     // 16
tokens.usage.borderRadius.full       // 9999 (pill shape)
```

### 5. Component Tokens

Fine-tuned tokens for specific components:

```typescript
// Button
tokens.component.button.borderRadius
tokens.component.button.paddingX.small
tokens.component.button.paddingY.small

// Input
tokens.component.input.small.cornerRadius
tokens.component.input.borderWidthFocused
tokens.component.input.search.backgroundColor

// Control Heights
tokens.component.control.xSmall.height   // 28
tokens.component.control.small.height    // 36
tokens.component.control.medium.height   // 40
tokens.component.control.large.height    // 44

// Icon Button
tokens.component.iconButton.small.size
tokens.component.iconButton.small.cornerRadius
```

## Best Practices

### ✅ DO

1. **Use semantic tokens** for better readability:
   ```typescript
   color: tokens.semantic.colors.text.neutral
   ```

2. **Use composite typography tokens** to ensure consistency:
   ```typescript
   const styles = getTypographyStyles(tokens.usage.typography.label.small.default);
   ```

3. **Reference tokens, not raw values**:
   ```typescript
   padding: tokens.usage.spacing.medium  // ✅
   padding: 16  // ❌
   ```

4. **Use CSS custom properties** for themability:
   ```css
   color: var(--color-text-neutral);  /* ✅ */
   color: #181818;  /* ❌ */
   ```

### ❌ DON'T

1. **Don't hardcode values**:
   ```typescript
   fontSize: 14  // ❌
   fontSize: tokens.usage.typography.label.small.default.fontSize  // ✅
   ```

2. **Don't mix different token systems**:
   ```typescript
   padding: `${tokens.usage.spacing.medium}px 8px`  // ❌
   padding: `${tokens.usage.spacing.medium}px ${tokens.usage.spacing.xSmall}px`  // ✅
   ```

3. **Don't reference base tokens directly** in components:
   ```typescript
   color: tokens.base.colors.neutral[50]  // ❌
   color: tokens.semantic.colors.text.subdued  // ✅
   ```

## Token Hierarchy

### When to Use Each Tier

| Tier | When to Use | Example |
|------|-------------|---------|
| **Semantic** | Primary choice for components | `tokens.semantic.colors.text.neutral` |
| **Usage** | Spacing, typography, sizing | `tokens.usage.spacing.medium` |
| **Color** | Brand-specific needs | `tokens.colors.brand.sidebarBg` |
| **Component** | Component-specific customization | `tokens.component.button.borderRadius` |
| **Base** | Rarely (only for new token creation) | `tokens.base.sizes[4]` |

## Examples

### Button Component

```typescript
import { tokens, getTypographyStyles } from './tokens';

const ButtonStyles = {
  padding: `${tokens.component.button.paddingY.small}px ${tokens.component.button.paddingX.small}px`,
  borderRadius: `${tokens.component.button.borderRadius}px`,
  backgroundColor: tokens.colors.brand.bgFillBrand,
  color: tokens.colors.brand.textOnBgFillBrand,
  ...getTypographyStyles(tokens.usage.typography.label.small.strong),
};
```

### Card Component

```typescript
const CardStyles = {
  backgroundColor: tokens.semantic.colors.surface.raised,
  border: `${tokens.usage.borderWidth.thin}px solid ${tokens.semantic.colors.border.subdued}`,
  borderRadius: `${tokens.usage.borderRadius.medium}px`,
  padding: `${tokens.usage.spacing.medium}px`,
};
```

### Input Component

```typescript
const InputStyles = {
  height: `${tokens.component.control.small.height}px`,
  borderRadius: `${tokens.component.input.small.cornerRadius}px`,
  border: `${tokens.component.input.borderWidth}px solid ${tokens.semantic.colors.border.subdued}`,
  padding: `${tokens.usage.spacing.xSmall}px ${tokens.usage.spacing.small}px`,
  ...getTypographyStyles(tokens.usage.typography.label.small.default),
  
  '&:focus': {
    borderWidth: `${tokens.component.input.borderWidthFocused}px`,
    borderColor: tokens.semantic.colors.border.focused,
  },
};
```

## TypeScript Support

All tokens are fully typed with TypeScript:

```typescript
import type { Tokens, TypographyStyle } from './tokens';

// Tokens are type-safe
const spacing: number = tokens.usage.spacing.medium;
const color: string = tokens.semantic.colors.text.neutral;

// Typography styles are typed
const labelStyle: TypographyStyle = tokens.usage.typography.label.small.default;
```

## Integration with React Components

### With styled-components

```typescript
import styled from 'styled-components';
import { tokens, getTypographyStyles } from './tokens';

const Button = styled.button`
  padding: ${tokens.component.button.paddingY.small}px ${tokens.component.button.paddingX.small}px;
  border-radius: ${tokens.component.button.borderRadius}px;
  background-color: ${tokens.colors.brand.bgFillBrand};
  color: ${tokens.colors.brand.textOnBgFillBrand};
  ${getTypographyStyles(tokens.usage.typography.label.small.strong)}
`;
```

### With CSS Modules

```css
/* styles.module.css */
.button {
  padding: var(--button-padding-y-small) var(--button-padding-x-small);
  border-radius: var(--button-border-radius);
  background-color: var(--brand-bg-fill-brand);
  color: var(--brand-text-on-bg-fill-brand);
  font-family: var(--typography-label-small-strong-font-family);
  font-size: var(--typography-label-small-strong-font-size);
  font-weight: var(--typography-label-small-strong-font-weight);
}
```

### With Tailwind CSS

You can extend Tailwind config with these tokens:

```javascript
// tailwind.config.js
const { tokens } = require('./tokens');

module.exports = {
  theme: {
    extend: {
      colors: {
        'text-neutral': tokens.semantic.colors.text.neutral,
        'surface-default': tokens.semantic.colors.surface.default,
        // ... add more colors
      },
      spacing: {
        'xs': `${tokens.usage.spacing.xSmall}px`,
        'sm': `${tokens.usage.spacing.small}px`,
        'md': `${tokens.usage.spacing.medium}px`,
        // ... add more spacing
      },
    },
  },
};
```

## Maintenance

When updating tokens:

1. **Modify source TypeScript files** in appropriate directories
2. **Run type checking**: `tsc --noEmit`
3. **Regenerate CSS** if needed (or use the utility functions)
4. **Update documentation** if structure changes
5. **Sync with Figma** to ensure consistency

## Related Documentation

- [Figma Variable Analysis](../figma-variable-analysis.md) - Detailed analysis of the Figma structure
- [Variable Structure Diagram](../variable-structure-diagram.md) - Visual hierarchy and flows
- [Quick Reference](../variable-quick-reference.md) - Quick lookup guide

---

**Last Updated**: January 30, 2026
