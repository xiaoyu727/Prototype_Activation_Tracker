# Filter Popover Interaction Update

## Overview

The filter popover interaction has been updated to use a **drill-down pattern** instead of nested side-by-side popovers. This provides a cleaner, more focused user experience.

## Changes Made

### 1. Consistent Width

All popover templates now have a consistent **240px width**:
- ✅ Single-select (parent categories)
- ✅ Checkboxes (child options)
- ✅ Radio buttons (child options)

This was enforced in `Popover.tsx` by setting a fixed `popoverWidth = 240`.

### 2. New Interaction Pattern

**Previous Pattern (Side-by-side nested):**
```
┌─────────────────┐     ┌─────────────────┐
│ Parent Popover  │────▶│ Child Popover   │
│ - Status        │     │ ☑ Active        │
│ - Image coverage│     │ ☐ Inactive      │
│ - Discount      │     └─────────────────┘
└─────────────────┘
```

**New Pattern (Drill-down with chip):**
```
Step 1: Click Filter button
┌─────────────────────┐
│ Parent Popover      │
│ - Status            │
│ - Image coverage    │
│ - Discount          │
└─────────────────────┘

Step 2: Click "Status"
┌────────────────┐
│ [Status ✕]     │ ← Filter Chip
└────────────────┘
┌─────────────────────┐
│ Child Popover       │
│ ☑ Active           │
│ ☐ Inactive         │
└─────────────────────┘
```

### 3. User Flow

1. **User clicks Filter button**
   - Parent popover appears with all filter categories
   - Width: 240px
   - Position: Below filter button

2. **User clicks a category (e.g., "Status")**
   - Parent popover disappears
   - FilterChip appears showing the selected category
   - Child popover appears below the chip
   - Both positioned below filter button

3. **User can:**
   - **Select/deselect options** in the child popover
   - **Click the chip's X** to go back to parent view
   - **Click the chip** to go back to parent view
   - **Click outside** to close everything

4. **Navigation:**
   - Chip X button → Returns to parent popover
   - Chip click → Returns to parent popover
   - Click outside → Closes all popovers

## Implementation Details

### State Management

```typescript
// Filter popover state
const [showFilterPopover, setShowFilterPopover] = useState(false);
const [selectedFilterParent, setSelectedFilterParent] = useState<string | null>(null);
const filterButtonRef = useRef<HTMLDivElement>(null);
const filterChipRef = useRef<HTMLDivElement>(null);
```

### Filter Labels Mapping

```typescript
const filterLabels: Record<string, string> = {
  'status': 'Status',
  'image-coverage': 'Image coverage',
  'description-coverage': 'Description coverage',
  'discount': 'Discount',
  'product-catalog': 'Product catalog',
  'gtin': 'GTIN',
  'duplicates': 'Duplicates',
  'brand': 'Brand',
  'venue-overrides': 'Venue overrides',
};
```

### Conditional Rendering

```typescript
{/* Parent popover - only show when no parent is selected */}
{!selectedFilterParent && (
  <Popover
    template="single-select"
    items={filterParentItems}
    position={...}
  />
)}

{/* Chip + Child popover - show when parent is selected */}
{selectedFilterParent && (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <FilterChip
      label={filterLabels[selectedFilterParent]}
      onRemove={handleBackToParentFilter}
      onClick={handleBackToParentFilter}
    />
    <Popover
      template="checkboxes"
      items={childItems}
      position={{ top: 0, left: 0 }}
      style={{ position: 'relative' }}
    />
  </div>
)}
```

### Back Navigation

```typescript
const handleBackToParentFilter = () => {
  setSelectedFilterParent(null);
};
```

This is called when:
- User clicks the chip's X button
- User clicks the chip itself

## Visual Layout

### Parent View (No Filter Selected)

```
Filter Button
    ↓
┌─────────────────────────┐
│ Status                  │
│ Image coverage          │
│ Description coverage    │
│ Discount                │
│ Product catalog         │
│ GTIN                    │
│ Duplicates              │
│ Brand                   │
│ Venue overrides         │
└─────────────────────────┘
Width: 240px
```

### Child View (Category Selected)

```
Filter Button
    ↓
┌────────────────┐
│ [Status ✕]     │ ← Filter Chip (clickable, removable)
└────────────────┘
    ↓ 8px gap
┌─────────────────────────┐
│ ☑ Active               │
│ ☐ Inactive             │
│ ☐ Out of stock         │
└─────────────────────────┘
Width: 240px
```

## Components Modified

### 1. `Popover.tsx`

**Changes:**
- Added `popoverWidth = 240` constant
- All templates now use this fixed width
- Width prop is effectively ignored in favor of consistent 240px

**Before:**
```typescript
width: `${width}px`,  // Could vary per instance
```

**After:**
```typescript
const popoverWidth = 240;  // Fixed for all templates
width: `${popoverWidth}px`,
```

### 2. `ProductListPage.tsx`

**Changes:**
- Imported `FilterChip` component
- Updated state to remove `showChildPopover` (now derived from `selectedFilterParent`)
- Added `filterChipRef` for click-outside detection
- Created `filterLabels` mapping for clean label access
- Simplified `filterParentItems` using `Object.entries()`
- Added `handleBackToParentFilter()` function
- Updated render logic to show either parent popover OR (chip + child popover)
- Wrapped chip and child popover in flex column container with 8px gap

## Benefits of New Pattern

1. **✅ Cleaner UI**: Only one popover visible at a time
2. **✅ Better Focus**: User attention on current selection level
3. **✅ Clear Navigation**: Chip shows current context and provides way back
4. **✅ Consistent Width**: All popovers same size (240px)
5. **✅ Better Mobile**: Drill-down works better on small screens than side-by-side
6. **✅ Space Efficient**: No need for horizontal space for nested popover
7. **✅ Familiar Pattern**: Similar to mobile app navigation

## Next Steps

### To Complete the Implementation:

1. **Add Child Items for Each Category**
   - Define checkbox/radio items for each parent category
   - Store selections in state
   - Apply filters to product list

2. **Show Active Filters**
   - Display FilterChips for active selections above the product list
   - Each chip should be removable
   - Clicking chip should open that category's child popover

3. **Filter Logic**
   - Implement actual filtering of products based on selections
   - Update product list when filters change
   - Show count of filtered results

### Example of Future State:

```typescript
// Active filter state
const [activeFilters, setActiveFilters] = useState({
  status: ['Active'],
  discount: ['Has discount'],
  brand: ['Organic', 'Premium'],
});

// Show active filter chips above product list
<div className="active-filters">
  {activeFilters.status?.map(value => (
    <FilterChip
      key={`status-${value}`}
      label={`Status: ${value}`}
      onRemove={() => removeFilter('status', value)}
      onClick={() => openFilterCategory('status')}
    />
  ))}
  {/* ... other filter chips */}
</div>
```

## Testing

### To Test the Current Implementation:

1. **Run the app:** `npm run dev`
2. **Click Filter button** → See parent popover with 9 categories
3. **Click "Status"** → Parent popover disappears, chip + child popover appear
4. **Click chip or X** → Returns to parent popover
5. **Click outside** → Everything closes
6. **Verify width** → All popovers should be exactly 240px wide

## Files Modified

- ✅ `src/components/Popover/Popover.tsx` - Fixed 240px width
- ✅ `src/pages/ProductListPage.tsx` - New drill-down interaction
- ✅ `src/components/FilterChip/FilterChip.tsx` - Already implemented
- 📄 `FILTER_INTERACTION_UPDATE.md` - This documentation

## Design Rationale

### Why Drill-Down Instead of Side-by-Side?

1. **Mobile-First**: Drill-down patterns work better on narrow screens
2. **Cognitive Load**: One decision at a time is easier to process
3. **Vertical Space**: Better use of vertical space, which is more abundant
4. **Clarity**: Current context is always clear from the chip
5. **Consistency**: Matches common patterns in modern web apps

### Why 240px Width?

- **Readable**: Enough width for typical filter labels
- **Compact**: Doesn't take too much screen space
- **Consistent**: Same across all templates prevents jarring resizes
- **Mobile**: Works well on tablet and desktop

## Notes

- The FilterChip provides clear visual feedback about current selection
- Both clicking the chip and clicking the X return to parent view
- The 8px gap between chip and popover provides clear visual separation
- The position is calculated relative to the filter button for consistency
- Click-outside detection works for both chip and popover
