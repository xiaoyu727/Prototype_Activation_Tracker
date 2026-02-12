# Figma Variable System - Quick Reference Guide

## When to Use Which Token Collection

### 🎨 For Colors

| Scenario | Use This Collection | Example |
|----------|---------------------|---------|
| Brand-specific colors (sidebar, brand fills) | `color/brand/*` | `color/brand/color-sidebar-bg` |
| UI element colors (text, backgrounds) | `color/color-*` | `color/color-text`, `color/color-bg-surface` |
| Icon colors | `color/icon/*` | `color/icon/default`, `color/icon/inverse` |
| Human-readable in design | Semantic names | `Text/Neutral`, `Surface/Default`, `Border/Subdued` |
| Theme-aware implementations | Aliased variables | `${color.text}`, `${color.bgSurfaceTertiary}` |

---

### 📏 For Spacing

| Scenario | Use This Collection | Example |
|----------|---------------------|---------|
| Component internal spacing | `usage/space/*` | `usage/space/medium` (16px) |
| Legacy/alternative spacing | `space-regular-*` | `space-regular-xlarge` (16px) |
| Narrow spacing (tight layouts) | `space-narrow-*` | `space-narrow-xsmall` (2px) |
| Broad spacing (loose layouts) | `space-broad-*` | `space-broad-medium` (28px) |
| Direct pixel values | `dimension/*` or `4px`, `8px` | `dimension/4` (4px) |

**Recommendation**: Prefer `usage/space/*` for new components.

---

### 🔤 For Typography

| Scenario | Use This Collection | Example |
|----------|---------------------|---------|
| Complete typography style (recommended) | `usage/type/*` | `usage/type/label/small/default` |
| Individual font properties | `usage/type/*/*/font-*` | `usage/type/label/small/default/font-size` |
| Base font family | `base/font-family/brand` | "SF Pro" |
| Legacy typography | `typography/style-*` | `typography/style-caption` |

**Recommendation**: Use composite tokens like `usage/type/label/small/default` to ensure consistent typography.

---

### 🔄 For Border Radius

| Scenario | Use This Collection | Example |
|----------|---------------------|---------|
| Semantic border radius | `usage/border-radius/*` | `usage/border-radius/full` (9999px) |
| Legacy corner radius | `corner-radius-*` | `corner-radius-large` (12px) |
| Component-specific | `component/*/corner-radius` | `component/checkbox/corner-radius` (4px) |

---

### 📐 For Sizes

| Scenario | Use This Collection | Example |
|----------|---------------------|---------|
| Icon/element sizes | `usage/size/*` | `usage/size/x-small` (16px) |
| Component sizes | `usage/size/action/*` | `usage/size/action/small` (32px) |
| Base sizes | `base/size/*` | `base/size/1` (4px) |
| Direct pixel values | `32px`, `36px` | `36px` |

---

### 🧩 For Component-Specific Styles

| Scenario | Use This Collection | Example |
|----------|---------------------|---------|
| Button styles | `component.button.*` | `comp/border-radius/button` |
| Input styles | `component.input.*` | `component.input.small.cornerRadius` |
| Checkbox styles | `component/checkbox/*` | `component/checkbox/corner-radius` |
| Select button styles | `component.select-button.*` | `component.select-button.color.bg` |
| Control heights | `component.shared.control.*` | `component.shared.control.small.height` |

---

## Token Selection Decision Tree

```
Need a design token?
│
├─ Is it a COLOR?
│  ├─ For brand identity? → color/brand/*
│  ├─ For UI elements? → color/color-*
│  ├─ For icons? → color/icon/*
│  └─ Designer-friendly? → Semantic names (Text/*, Surface/*)
│
├─ Is it SPACING?
│  ├─ Modern/semantic? → usage/space/*
│  ├─ Legacy/alternative? → space-regular-*, space-narrow-*
│  └─ Need exact pixels? → dimension/* or 4px, 8px
│
├─ Is it TYPOGRAPHY?
│  ├─ Complete style? → usage/type/label/small/default
│  ├─ Single property? → usage/type/*/*/font-size
│  └─ Base font? → base/font-family/brand
│
├─ Is it BORDER RADIUS?
│  ├─ Semantic? → usage/border-radius/*
│  ├─ Legacy? → corner-radius-*
│  └─ Component-specific? → component/*/corner-radius
│
├─ Is it a SIZE?
│  ├─ Icon/element? → usage/size/*
│  ├─ Base unit? → base/size/*
│  └─ Action/control? → usage/size/action/*
│
└─ Is it COMPONENT-SPECIFIC?
   └─ Use component/* or component.* tokens
```

---

## Common Use Cases & Solutions

### 1. Styling a Button

```css
/* ✅ Recommended */
.button {
  padding: var(--usage/space/medium) var(--usage/space/x-small);
  border-radius: var(--usage/border-radius/full);
  background-color: var(--color/brand/color-bg-fill-brand);
  color: var(--color/brand/color-text-on-bg-fill-brand);
  font-family: var(--usage/type/label/small/strong/font-family);
  font-size: var(--usage/type/label/small/strong/font-size);
  font-weight: var(--usage/type/label/small/strong/font-weight);
}

/* ❌ Not recommended - hardcoded values */
.button {
  padding: 16px 8px;
  border-radius: 9999px;
  background-color: #4c4c4c;
  color: #f1f1f1;
}
```

---

### 2. Creating a Card Component

```css
/* ✅ Recommended */
.card {
  background-color: var(--Surface/Default);
  border: 1px solid var(--Border/Subdued);
  border-radius: var(--corner-radius-medium);
  padding: var(--usage/space/medium);
}

/* Alternative with aliased variables */
.card {
  background-color: var(--color.bgSurfaceTertiary);
  border: 1px solid var(--color.borderSubdued);
  border-radius: var(--corner-radius-medium);
  padding: var(--usage/space/medium);
}
```

---

### 3. Text Styling

```css
/* ✅ Recommended - Use composite token */
.label {
  color: var(--Text/Neutral);
  font-family: var(--usage/type/label/small/default/font-family);
  font-size: var(--usage/type/label/small/default/font-size);
  font-weight: var(--usage/type/label/small/default/font-weight);
  line-height: var(--usage/type/label/small/default/line-height);
  letter-spacing: var(--usage/type/label/small/default/letter-spacing);
}

/* 🟡 Acceptable - Using semantic name */
.label {
  color: var(--Text/Neutral);
}

/* ❌ Not recommended - Hardcoded */
.label {
  color: #181818;
  font-size: 14px;
}
```

---

### 4. Icon Styling

```css
/* ✅ Recommended */
.icon {
  width: var(--usage/size/x-small);
  height: var(--usage/size/x-small);
  color: var(--usage/color/icon/default);
}

/* For inverse (light on dark) */
.icon-inverse {
  color: var(--color/icon/inverse);
}
```

---

### 5. Input Field

```css
/* ✅ Recommended */
.input {
  border-radius: var(--component.input.small.cornerRadius);
  border: var(--border-width-regular-medium) solid var(--Border/Subdued);
  padding: var(--usage/space/x-small) var(--usage/space/small);
}

.input:focus {
  border-width: var(--component.input.borderWidthFocused);
  border-color: var(--Border/Focused);
  box-shadow: var(--components/input-focused); /* Multi-layer shadow */
}
```

---

### 6. Navigation Sidebar

```css
/* ✅ Recommended - Following library pattern */
.sidebar {
  background-color: var(--color/brand/color-sidebar-bg);
  padding: var(--space-regular-xlarge);
  gap: var(--space-regular-xlarge);
}

.sidebar-item {
  height: var(--component.shared.control.small.height);
  border-radius: var(--corner-radius-large);
  padding: 0 var(--space-narrow-xsmall);
}

.sidebar-item:hover {
  background-color: var(--${color.textSubdued}); /* Aliased variable */
}
```

---

## Best Practices

### ✅ DO

1. **Use semantic names in design** (`Text/Neutral`, `Surface/Default`)
   - Easier for designers to understand
   - More maintainable

2. **Use `usage/*` tokens in code**
   - Better semantic meaning
   - Built for specific use cases

3. **Reference variables instead of hardcoding**
   - Enables theming
   - Easier to maintain

4. **Use composite typography tokens**
   - Ensures consistent typography
   - Example: `usage/type/label/small/default`

5. **Follow the token hierarchy**
   ```
   Semantic → Usage → Base → Raw
   ```

6. **Include fallback values**
   ```css
   var(--token-name, fallback-value)
   ```

---

### ❌ DON'T

1. **Don't hardcode values**
   ```css
   /* ❌ */
   color: #181818;
   
   /* ✅ */
   color: var(--Text/Neutral);
   ```

2. **Don't mix token systems**
   ```css
   /* ❌ Inconsistent */
   padding: var(--usage/space/medium) 8px;
   
   /* ✅ Consistent */
   padding: var(--usage/space/medium) var(--usage/space/x-small);
   ```

3. **Don't skip the variable layer**
   - Always use variables for themability

4. **Don't reference base tokens directly in components**
   ```css
   /* ❌ */
   color: var(--base/color/neutral/50);
   
   /* ✅ */
   color: var(--Text/Subdued);
   ```

5. **Don't create local overrides without consulting the design system**
   - Breaks consistency
   - Harder to maintain

---

## Token Naming Convention Patterns

### Pattern Recognition Guide

| Token Name Pattern | Collection | Purpose |
|-------------------|------------|---------|
| `base/*` | Base | Primitive values |
| `usage/*` | Usage | Semantic application |
| `color/brand/*` | Color | Brand-specific colors |
| `color/color-*` | Color | UI element colors |
| `color/icon/*` | Color | Icon colors |
| `component.*` | Component | Component-specific (dot notation) |
| `component/*` | Component | Component-specific (slash notation) |
| `Text/*`, `Surface/*`, `Border/*` | Semantic | Human-readable aliases |
| `${color.*}` | Aliased | Dynamic references |
| `space-*` | Legacy Spacing | Alternative spacing tokens |
| `corner-radius-*` | Legacy Radius | Alternative radius tokens |
| `4px`, `8px`, `12px` | Direct | Quick-access pixel values |
| `dimension/*` | Primitive | Base dimension values |

---

## Variable Collection Cheat Sheet

### Most Commonly Used Tokens

#### Spacing
```
usage/space/none      →  0px
usage/space/xx-small  →  4px
usage/space/x-small   →  8px
usage/space/small     →  12px
usage/space/medium    →  16px
```

#### Colors
```
Text/Neutral          →  #181818
Text/Subdued          →  #202125
Text/Inverse          →  #FFFFFF
Surface/Default       →  #F1F1F1
Surface/Subdued       →  #F8F8F8
Border/Subdued        →  #EDEDEE
```

#### Typography
```
usage/type/label/small/default  →  SF Pro, 14px, Medium
usage/type/label/small/strong   →  SF Pro, 14px, Semibold
usage/type/body/small/strong    →  SF Pro, 14px, Semibold
```

#### Border Radius
```
usage/border-radius/full  →  9999px (pill shape)
corner-radius-small       →  4px
corner-radius-medium      →  8px
corner-radius-large       →  12px
```

#### Component Heights
```
component.shared.control.xsmall.height  →  28px
component.shared.control.small.height   →  36px
```

---

## Integration with Emporos UI Library (Alchemy)

### Using Library Components

```jsx
import { Avatar, Button } from '@creditornot/alchemy-react';

// Library components already use the variable system internally
<Avatar shape="square" size="xSmall" />
<Button variant="primary">Add</Button>
```

### Creating Local Components that Match Library Style

```jsx
// Local component using shared variables
export function CustomButton({ children }) {
  return (
    <button className="custom-button">
      {children}
    </button>
  );
}

// CSS
.custom-button {
  /* Use the same variables the library uses */
  background: var(--color/brand/color-bg-fill-brand);
  color: var(--color/brand/color-text-on-bg-fill-brand);
  padding: var(--usage/space/x-small) var(--usage/space/medium);
  border-radius: var(--usage/border-radius/full);
  font-family: var(--usage/type/label/small/strong/font-family);
  font-size: var(--usage/type/label/small/strong/font-size);
  font-weight: var(--usage/type/label/small/strong/font-weight);
}
```

### Component Naming Convention

- **Library components**: Prefix with `.` in Figma (`.SideNav`, `.List item`)
- **Local components**: No prefix in Figma (`Button`, `Editable cell`)
- **Code Connect**: Links Figma to React implementations

---

## Exporting Variables for Development

### Option 1: CSS Custom Properties

```css
:root {
  --text-neutral: #181818;
  --surface-default: #F1F1F1;
  --usage-space-medium: 16px;
  /* ... etc */
}
```

### Option 2: JavaScript/TypeScript Tokens

```typescript
export const tokens = {
  color: {
    text: {
      neutral: '#181818',
      subdued: '#202125',
      inverse: '#FFFFFF',
    },
    surface: {
      default: '#F1F1F1',
      subdued: '#F8F8F8',
    },
  },
  spacing: {
    xxSmall: '4px',
    xSmall: '8px',
    small: '12px',
    medium: '16px',
  },
};
```

### Option 3: Design Tokens (JSON)

```json
{
  "color": {
    "text": {
      "neutral": {
        "value": "#181818",
        "type": "color"
      }
    }
  },
  "spacing": {
    "medium": {
      "value": "16px",
      "type": "dimension"
    }
  }
}
```

---

## Troubleshooting

### Issue: Variable not appearing in dropdown

**Solution**: Check that:
1. You're in the correct Figma file
2. The variable collection is published (for library components)
3. You're applying it to a compatible property (color variable → fill/stroke)

---

### Issue: Variable value seems wrong

**Solution**: Check the reference chain:
1. Inspect the variable in Figma
2. See if it references another variable
3. Follow the chain to the base value
4. Verify each step resolves correctly

---

### Issue: Local component doesn't match library style

**Solution**: 
1. Check which variables the library component uses
2. Apply the same variables to your local component
3. Verify you're using the correct variable tier (usage vs base)

---

### Issue: Theme switching not working

**Solution**:
1. Ensure you're using aliased variables (`${color.*}`)
2. Check that your CSS updates the aliased variable values
3. Verify the reference chain is intact

---

## Quick Reference Card

### For Developers

| Need | Use This Token |
|------|----------------|
| Text color | `Text/Neutral`, `Text/Subdued` |
| Background | `Surface/Default`, `Surface/Subdued` |
| Border | `Border/Subdued`, `Border/Neutral` |
| Spacing | `usage/space/medium`, `usage/space/small` |
| Typography | `usage/type/label/small/default` |
| Border radius | `corner-radius-medium`, `usage/border-radius/full` |
| Icon size | `usage/size/x-small` |
| Button height | `component.shared.control.small.height` |

### For Designers

| Need | Use This Token |
|------|----------------|
| Text color | `Text/Neutral`, `Text/Subdued`, `Text/Inverse` |
| Background | `Surface/Default`, `Surface/Raised`, `Surface/Subdued` |
| Border | `Border/Subdued`, `Border/Selected`, `Border/Focused` |
| Positive state | `Text/Positive`, `Surface/Positive` |
| Spacing | Medium (16px), Small (12px), X-Small (8px) |

---

## Resources

- **Figma File**: [Listing Catalog playground](https://www.figma.com/design/m2pbkYg79kaxGHYRnMLaoz/)
- **Component Library**: `@creditornot/alchemy-react`
- **Design System**: ✨ Emporos UI Library (Alchemy)

---

**Last Updated**: January 30, 2026
