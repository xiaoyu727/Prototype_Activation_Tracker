# Popover Component

A flexible container that displays additional content for web platforms. The Popover component supports multiple interaction templates including single-select lists, checkboxes, and radio buttons.

## Features

- **Multiple Templates**: Single-select, checkboxes, and radio buttons
- **Nested Interactions**: Support for popovers that trigger other popovers
- **Select All**: Optional "Select All" functionality for checkbox templates
- **Customizable**: Adjustable width, positioning, and styling
- **Accessible**: Keyboard and screen reader friendly
- **Disabled States**: Individual items can be disabled

## Usage

### Basic Single Select (with checkmark, Size = Medium)

Single selection: user picks one option; the selected item shows a checkmark. Use `size="medium"` (default) for 40px row height.

```tsx
import { Popover, PopoverListItem } from '@/components';

const [selectedId, setSelectedId] = useState<string | null>(null);

const items: PopoverListItem[] = [
  { id: '1', label: 'Option 1', selected: selectedId === '1', onClick: (id) => setSelectedId(id) },
  { id: '2', label: 'Option 2', selected: selectedId === '2', onClick: (id) => setSelectedId(id) },
  { id: '3', label: 'Option 3', selected: selectedId === '3', onClick: (id) => setSelectedId(id) },
];

<Popover
  template="single-select"
  size="medium"
  items={items}
  position={{ top: 40, left: 0 }}
/>
```

**Size variants:** `size="small"` (32px), `size="medium"` (40px), `size="large"` (48px).

### Checkboxes with Select All

```tsx
const [selectedIds, setSelectedIds] = useState<string[]>([]);

const items: PopoverListItem[] = [
  { id: '1', label: 'Option 1', selected: selectedIds.includes('1') },
  { id: '2', label: 'Option 2', selected: selectedIds.includes('2') },
  { id: '3', label: 'Option 3', selected: selectedIds.includes('3') },
];

const handleItemChange = (id: string, selected: boolean) => {
  if (selected) {
    setSelectedIds([...selectedIds, id]);
  } else {
    setSelectedIds(selectedIds.filter((item) => item !== id));
  }
};

const handleSelectAll = (selected: boolean) => {
  if (selected) {
    setSelectedIds(items.map((item) => item.id));
  } else {
    setSelectedIds([]);
  }
};

<Popover
  template="checkboxes"
  items={items}
  showSelectAll
  allSelected={selectedIds.length === items.length}
  onItemChange={handleItemChange}
  onSelectAll={handleSelectAll}
  position={{ top: 40, left: 0 }}
/>
```

### Radio Buttons

```tsx
const [selectedId, setSelectedId] = useState<string>('1');

const items: PopoverListItem[] = [
  { id: '1', label: 'Option 1', selected: selectedId === '1' },
  { id: '2', label: 'Option 2', selected: selectedId === '2' },
  { id: '3', label: 'Option 3', selected: selectedId === '3' },
];

<Popover
  template="radios"
  items={items}
  onItemChange={(id) => setSelectedId(id)}
  radioGroupName="my-radio-group"
  position={{ top: 40, left: 0 }}
/>
```

### Nested Interactions

You can create nested popovers by conditionally rendering a second popover based on the selection in the first:

```tsx
const [showSubPopover, setShowSubPopover] = useState(false);

const mainItems: PopoverListItem[] = [
  {
    id: 'category1',
    label: 'Category 1 (Click for options)',
    onClick: () => setShowSubPopover(true),
  },
];

const subItems: PopoverListItem[] = [
  { id: 'sub1', label: 'Sub Option 1', selected: false },
  { id: 'sub2', label: 'Sub Option 2', selected: false },
];

<>
  <Popover
    template="single-select"
    items={mainItems}
    position={{ top: 40, left: 0 }}
  />
  
  {showSubPopover && (
    <Popover
      template="checkboxes"
      items={subItems}
      onItemChange={handleSubItemChange}
      position={{ top: 40, left: 260 }}
    />
  )}
</>
```

## Props

### PopoverProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `template` | `'single-select' \| 'checkboxes' \| 'radios'` | `'single-select'` | The interaction template for the popover |
| `items` | `PopoverListItem[]` | **required** | Array of items to display |
| `showSelectAll` | `boolean` | `false` | Show "Select All" option (checkboxes only) |
| `onItemChange` | `(id: string, selected: boolean) => void` | - | Callback when item selection changes |
| `onSelectAll` | `(selected: boolean) => void` | - | Callback when "Select All" is toggled |
| `allSelected` | `boolean` | `false` | Whether all items are selected |
| `width` | `number` | `240` | Width of the popover in pixels |
| `style` | `CSSProperties` | - | Additional custom styles |
| `radioGroupName` | `string` | `'popover-radio-group'` | Name for radio button group |
| `position` | `{ top?, left?, right?, bottom? }` | - | Position of the popover |

### PopoverListItem

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the item |
| `label` | `string` | Label text to display |
| `selected` | `boolean` | Whether the item is selected (checkboxes/radios) |
| `disabled` | `boolean` | Whether the item is disabled |
| `icon` | `ReactNode` | Optional icon to display |
| `onClick` | `(id: string) => void` | Callback when item is clicked (single-select) |

## Accessibility

- Uses semantic HTML with proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- Disabled states are properly announced

## Design Tokens

The component uses the following design tokens:

- **Colors**: `tokens.semantic.colors.surface.raised`, `tokens.semantic.colors.text.neutral`
- **Spacing**: `tokens.usage.spacing.*`
- **Typography**: `tokens.usage.typography.label.small.default`
- **Border Radius**: `tokens.usage.borderRadius.medium`

## Related Components

- **Checkbox**: Used in checkbox template
- **Radio**: Used in radio button template
