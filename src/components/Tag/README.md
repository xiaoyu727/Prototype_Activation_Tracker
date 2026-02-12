# Tag Component

Tag for labels and status (Figma Emporos UI Library node 124-143998).

## API

- **variant**: `'default'` | `'prominent'` — default = surface background; prominent = filled (e.g. neutral = dark bg + inverse text).
- **style**: `'neutral'` | `'positive'` | `'negative'` | `'warning'` — semantic color (background + text/icon).
- **size**: `'small'` | `'medium'` | `'large'` (12px, 14px, 16px).
- **icon**: optional custom icon; color is set from the tag style.
- **showDefaultIcon**: when true and no `icon` is passed, shows the default icon for the style (same color as text):
  - **neutral** → info-line
  - **positive** → check-circle
  - **negative** / **warning** → warning-line

## Variants × styles

| variant   | neutral     | positive     | negative     | warning     |
|----------|-------------|--------------|--------------|-------------|
| default  | surface + text neutral | surface positive + text positive | surface negative + text negative | surface warning + text warning |
| prominent| fill #181818 + inverse text | fill green + inverse | fill red + inverse | fill warning + inverse |

## Sizes

- **small**: 12px label, padding 2×6, minHeight 20, icon 12px.
- **medium**: 14px label, padding 4×8, minHeight 28, icon 16px.
- **large**: 16px label, padding 4×8, minHeight 32, icon 16px.

## Icon color

The icon container has `color` set from the tag style. Use icons that respect `currentColor` (e.g. SVG with `fill="currentColor"`) so the icon color follows the tag style.

## Usage

```tsx
<Tag style="positive">Active</Tag>
<Tag variant="prominent" style="neutral">Neutral</Tag>
<Tag style="positive" icon={<ActiveIcon />}>Active</Tag>
<Tag size="small" style="negative">Inactive</Tag>
```
