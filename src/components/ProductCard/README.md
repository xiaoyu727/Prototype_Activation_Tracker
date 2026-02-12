# ProductCard Component

A card component for displaying products in a grid view layout.

## Features

- **Product Image**: Full-width image (160px height, `objectFit: cover`)
  - Fills left to right with no padding
  - Uses entire card width
- **Overlapping Controls**: Checkbox and more button positioned on top of image
  - Checkbox: top-left corner (8px offset)
  - More button: top-right corner (8px offset)
- **Selection**: Checkbox for multi-select functionality
- **Actions**: Three-dot menu for additional actions
- **Responsive**: Adapts to grid layout with stretching
- **Hover States**: Visual feedback on interaction
- **Truncation**: Product name truncates to 2 lines max

## Usage

```tsx
import { ProductCard } from '../components/ProductCard';

// Basic usage
<ProductCard
  id="1"
  name="Apples Pink Lady 1000g"
  price="€3.85"
  image={appleImage}
  selected={false}
  onToggleSelect={(id) => handleSelect(id)}
  onClick={() => handleCardClick()}
  onMoreClick={(e) => handleMoreClick(e)}
/>

// In a grid layout
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
  {products.map(product => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      selected={selectedIds.includes(product.id)}
      onToggleSelect={handleToggle}
    />
  ))}
</div>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | ✓ | - | Unique product identifier |
| `name` | `string` | ✓ | - | Product name (truncates to 2 lines) |
| `price` | `string` | ✓ | - | Product price with currency |
| `image` | `string` | - | - | Product image URL |
| `selected` | `boolean` | - | `false` | Whether the card is selected |
| `onToggleSelect` | `(id: string) => void` | - | - | Callback when checkbox is toggled |
| `onClick` | `() => void` | - | - | Callback when card is clicked |
| `onMoreClick` | `(e: React.MouseEvent) => void` | - | - | Callback when more menu is clicked |

## Layout

```
┌─────────────────────┐
│ ☐            ⋮     │  ← Checkbox & More menu (overlapping image)
│                     │
│     Full-width      │  ← Product image (160px height, fills left-right-top)
│     Product         │     objectFit: cover
│     Image           │
│                     │
│                     │
├─────────────────────┤
│  Product Name Here  │  ← Name (max 2 lines, with padding)
│  Second Line...     │
│                     │
│  €3.85             │  ← Price (with padding)
└─────────────────────┘
```

**Key Layout Features:**
- Image fills the entire width from left to right with no padding
- Image uses `objectFit: cover` to fill the 160px height
- Checkbox positioned absolutely at `top: 8px, left: 8px` on image
- More button positioned absolutely at `top: 8px, right: 8px` on image
- Product info section has 12px padding on all sides

## Grid Layout Recommendations

- **Gap**: 16px between cards
- **Cards stretch**: Each card uses `1fr` to fill available width evenly
- **Responsive breakpoints**:
  - **≥ 1740px**: 7 cards per row
  - **≥ 1500px**: 6 cards per row
  - **≥ 1440px**: 5 cards per row
  - **≥ 1200px**: 4 cards per row
  - **≥ 960px**: 3 cards per row
  - **≥ 720px**: 2 cards per row
  - **< 720px**: 1 card per row

### Implementation
```css
.product-grid-responsive {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(7, 1fr); /* Adjusts at breakpoints */
}
```

## Design Tokens

The component uses the following design tokens:
- `tokens.semantic.colors.surface.raised` - Card background
- `tokens.semantic.colors.border.subdued` - Card border
- `tokens.semantic.colors.text.neutral` - Text color
- `tokens.usage.typography.label.small.strong` - Name typography
- `tokens.usage.typography.label.small.default` - Price typography

## Interactions

1. **Card Click**: Entire card is clickable via `onClick`
2. **Checkbox**: Independent click area for selection
3. **More Menu**: Independent click area for actions
4. **Hover**: Subtle visual feedback

## Accessibility

- Checkbox has proper ARIA labels
- More button has `aria-label="More options"`
- Image has alt text from product name
- Keyboard navigation supported

## Related Components

- `Checkbox` - For selection functionality
- `IconButton` - For the more menu button
- `ProductListPage` - Uses ProductCard in grid view
