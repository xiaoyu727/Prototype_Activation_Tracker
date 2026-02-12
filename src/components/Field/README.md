# Field components

Input and dropdown field components aligned with Figma Prism (node 31847-184938). Structure, layout, spacing, and states only; **colors use existing tokens** (no changes).

## Scope

- **Field** – Base wrapper: structure, padding (8px L/R), size small (36px) or medium (40px), border-radius 8px, border 1px default / 2px focused. States: default, hover, focus, disabled.
- **Input** – Text input using Field; default variant, no label.
- **DropdownField** – Field with value + dropdown arrow; click or focus opens Action Menu (positioned relative to field; closes on outside click or Escape).

## Usage

```tsx
import { Input, DropdownField } from '@/components/Field';

<Input
  value={text}
  onChange={setText}
  placeholder="Search"
  disabled={false}
/>

<DropdownField
  options={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]}
  value={selectedId}
  onSelect={setSelectedId}
  placeholder="Select"
  disabled={false}
/>
```

## Tokens

- **Layout**: `tokens.component.input.small` (36px) / `tokens.component.input.medium` (40px), cornerRadius 8, padding 8px L/R, border 1px / 2px focused.
- **Colors**: `tokens.semantic.colors` (border.subdued, border.neutral, border.focused, surface.raised, surface.subdued, text.neutral, text.subdued).
- **Typography**: `tokens.usage.typography.label.small.default` for input and dropdown value.

## Notes

- Hover: border/background follow Figma behavior; colors unchanged.
- Dropdown arrow: 16×16 chevron-down, 8px left of icon; no rotation when open (per scope).
- Error state and label variant are out of scope for now.
