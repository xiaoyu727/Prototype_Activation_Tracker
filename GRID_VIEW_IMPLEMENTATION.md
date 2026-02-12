# Grid View Implementation

## Overview
The product listing page now supports both **List View** (table) and **Grid View** (cards) layouts. Users can toggle between views using the segmented control in the top-right corner.

## Components Created

### 1. ProductCard Component
**Location**: `src/components/ProductCard/ProductCard.tsx`

A card component designed for displaying products in a grid layout.

**Features**:
- Product image (160px height, fills left-right-top with `objectFit: cover`)
- Checkbox and more button overlay on top of image
  - Checkbox: top-left (8px offset)
  - More button: top-right (8px offset)
- Product name (truncates to 2 lines, with padding)
- Product price (with padding)
- Hover states
- Responsive design with card stretching

**Props**:
```typescript
interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image?: string;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onClick?: () => void;
  onMoreClick?: (e: React.MouseEvent) => void;
}
```

### 2. QualityScore Component
**Location**: `src/components/QualityScore/QualityScore.tsx`

A circular progress indicator for displaying quality scores.

**Features**:
- Circular progress spinner (16x16px)
- Color-coded by score:
  - 🟢 Green (80-100%): High quality
  - 🟠 Orange (50-79%): Medium quality
  - 🔴 Red (0-49%): Low quality
- Percentage text
- Tag-like container

**Props**:
```typescript
interface QualityScoreProps {
  score: number; // 0-100
}
```

## View Mode Toggle

### State Management
```typescript
const [viewMode, setViewMode] = useState('list');
```

### UI Control
The view mode is controlled by a `SegmentedControl` with two options:
- **List view** (📋 icon) - Shows table layout
- **Grid view** (⊞ icon) - Shows card layout

```typescript
<SegmentedControl
  options={[
    { value: 'list', icon: <MenuIcon />, label: 'List view' },
    { value: 'grid', icon: <GridIcon />, label: 'Grid view' },
  ]}
  value={viewMode}
  onChange={setViewMode}
/>
```

## Grid View Layout

### Structure
```
┌──────────────────────────────────────┐
│ Category Header                       │
│ ☐ Fresh Fruits  50 items         ˅   │
├──────────────────────────────────────┤
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐     │
│  │☐ ⋮│  │☐ ⋮│  │☐ ⋮│  │☐ ⋮│     │  ← Checkbox & More overlay on image
│  │████│  │████│  │████│  │████│     │  ← Full-width product images
│  │Name│  │Name│  │Name│  │Name│     │
│  │$---│  │$---│  │$---│  │$---│     │  ← Product name & price
│  └────┘  └────┘  └────┘  └────┘     │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐     │
│  │☐ ⋮│  │☐ ⋮│  │☐ ⋮│  │☐ ⋮│     │
│  │████│  │████│  │████│  │████│     │
│  │Name│  │Name│  │Name│  │Name│     │
│  │$---│  │$---│  │$---│  │$---│     │
│  └────┘  └────┘  └────┘  └────┘     │
└──────────────────────────────────────┘
```

**Card Structure:**
- Image fills top of card (160px height, full width, no padding)
- Controls (checkbox, more button) positioned absolutely on image
- Product info section below image with 12px padding

### Grid Layout CSS
```css
.product-grid-responsive {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(7, 1fr); /* Default: 7 cards */
}

/* Responsive breakpoints */
@media (max-width: 1739px) {
  .product-grid-responsive {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 1499px) {
  .product-grid-responsive {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1439px) {
  .product-grid-responsive {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1199px) {
  .product-grid-responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 959px) {
  .product-grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 719px) {
  .product-grid-responsive {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

### Responsive Breakpoints
- **≥ 1740px**: 7 cards per row
- **≥ 1500px**: 6 cards per row
- **≥ 1440px**: 5 cards per row
- **≥ 1200px**: 4 cards per row
- **≥ 960px**: 3 cards per row
- **≥ 720px**: 2 cards per row
- **< 720px**: 1 card per row

**Cards stretch evenly to fill each row** using CSS Grid's `1fr` units.

## Category Grouping

Products are grouped by category in grid view:

```typescript
const groupedProducts: Record<string, typeof paginatedProducts> = {};
paginatedProducts.forEach(product => {
  if (!groupedProducts[product.category]) {
    groupedProducts[product.category] = [];
  }
  groupedProducts[product.category].push(product);
});
```

### Category Header Features
- **Checkbox**: Select/deselect all items in category
  - Checked: All items selected
  - Indeterminate: Some items selected
  - Unchecked: No items selected
- **Category name**: e.g., "Fresh Fruits"
- **Item count**: e.g., "50 items"
- **Expand/collapse icon**: Chevron (future feature)

## Selection Behavior

### Individual Selection
- Click checkbox on card to select/deselect
- Selection state synchronized across both views

### Category Selection
- Click checkbox in category header
- Selects/deselects all products in that category
- Shows indeterminate state when partially selected

### Select All
- Header checkbox in list view
- Selects all items on current page

## Pagination

Both views support pagination:
- **List view**: Pagination at bottom of table
- **Grid view**: Pagination centered at bottom
- Shows: "1–50 of 150 results"
- ITEMS_PER_PAGE: 50

## Implementation Details

### Conditional Rendering
```typescript
{viewMode === 'list' ? (
  <>
    {/* Table Header */}
    {/* Table Rows */}
    {/* Pagination */}
  </>
) : (
  /* Grid View */
  <div>
    {/* Category Groups */}
    {/* Product Cards */}
    {/* Pagination */}
  </div>
)}
```

### Data Flow
1. Same `filteredProducts` array for both views
2. Same `paginatedProducts` for current page
3. Same `selectedProducts` state
4. Same search and filter logic

## Figma Design Reference

**Grid View Design**: 
https://www.figma.com/design/m2pbkYg79kaxGHYRnMLaoz/Listing-Catalog-playground?node-id=3600-44500

## Related Files

### Components
- `src/components/ProductCard/ProductCard.tsx`
- `src/components/ProductCard/ProductCard.stories.tsx`
- `src/components/ProductCard/README.md`
- `src/components/QualityScore/QualityScore.tsx`
- `src/components/QualityScore/QualityScore.stories.tsx`
- `src/components/QualityScore/README.md`

### Pages
- `src/pages/ProductListPage.tsx` (main implementation)

### Components Used
- `SegmentedControl` - View mode toggle
- `Checkbox` - Selection (with indeterminate state)
- `IconButton` - More menu in cards
- `Pagination` - Page navigation
- `FilterChip` - Active filters (shared between views)

## Features Shared Between Views

Both list and grid views support:
- ✅ Multi-select with checkboxes
- ✅ Search functionality
- ✅ Filter functionality
- ✅ Pagination
- ✅ Action bar when items selected
- ✅ Toast notifications
- ✅ Price editing (via modal)
- ✅ Status changes
- ✅ Product images
- ✅ Category grouping (grid only)
- ✅ Column configuration (list only)

## Testing

### Storybook Stories
- ProductCard: Various states (default, selected, no image, long name, interactive, grid layout)
- QualityScore: Different score ranges (high, medium, low, perfect, zero)

### Manual Testing Checklist
- [ ] Toggle between list and grid views
- [ ] Select individual products in grid view
- [ ] Select all products in a category
- [ ] Verify selection persists when switching views
- [ ] Test search in grid view
- [ ] Test filters in grid view
- [ ] Test pagination in grid view
- [ ] Verify responsive grid layout
- [ ] Test action bar in grid view
- [ ] Verify product card hover states

## Future Enhancements

1. **Category Collapse/Expand**
   - Make category headers collapsible
   - Persist collapse state

2. **Sorting in Grid View**
   - Add sort dropdown
   - Sort by: Name, Price, Category, Date

3. **Drag and Drop**
   - Reorder products
   - Move between categories

4. **Quick Actions**
   - Edit directly from card
   - Quick status toggle

5. **Card Size Options**
   - Small, Medium, Large cards
   - Adjust grid density

6. **Bulk Actions from Grid**
   - Edit multiple prices
   - Change multiple statuses
   - Bulk delete
