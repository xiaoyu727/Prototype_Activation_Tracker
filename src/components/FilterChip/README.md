# FilterChip Component

A compact, interactive component for displaying active filters with the ability to remove or edit them.

## Features

- **Always clickable**: Chip body opens filter for editing
- **Always removable**: Close/add button to remove or add filter
- **Focus state**: Inset focus ring when filter popover is open
- **hasSelections**: Shows remove icon when filter has values, add icon when empty
- **Responsive**: Adapts to content width (max 280px)
- **Accessible**: ARIA labels on the action button

## Usage

### Basic Filter Chip

```tsx
import { FilterChip } from '@/components';

<FilterChip
  label="Status: Active"
  onRemove={() => console.log('Remove filter')}
  onClick={() => console.log('Edit filter')}
/>
```

### With focus and selections (e.g. in filter bar)

```tsx
<FilterChip
  label={getFilterChipLabel(filterKey)}
  onRemove={() => handleRemoveFilter(filterKey)}
  onClick={() => setSelectedFilterParent(filterKey)}
  isFocused={filterKey === selectedFilterParent}
  hasSelections={hasFilterSelection(filterKey)}
/>
```

### Multiple Chips

```tsx
const [activeFilters, setActiveFilters] = useState([
  { id: 1, label: 'Status: Active' },
  { id: 2, label: 'Category: Fresh Fruits' },
]);

<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
  {activeFilters.map(filter => (
    <FilterChip
      key={filter.id}
      label={filter.label}
      onRemove={() => removeFilter(filter.id)}
      onClick={() => editFilter(filter.id)}
      hasSelections
    />
  ))}
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | The filter label text |
| `onRemove` | `() => void` | - | Callback when remove/add button is clicked |
| `onClick` | `() => void` | - | Callback when chip is clicked |
| `isFocused` | `boolean` | `false` | Whether the filter is focused (e.g. popover open) |
| `hasSelections` | `boolean` | `false` | When true, shows remove icon; when false, shows add icon |

## Visual Design

- **Default**: Raised surface, 1px inset border (subdued)
- **Focused**: Same background, 2px inset focus ring (selected border color)
- **Border**: Always drawn inside (inset box-shadow)
- Pill shape (full border radius)

## Related Components

- **Badge**: For non-interactive count indicators
- **Tag**: For categorization labels
- **Popover**: For filter selection interface
