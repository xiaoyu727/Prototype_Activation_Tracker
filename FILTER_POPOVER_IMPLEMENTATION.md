# Filter Popover Implementation

## Overview

The Filter button in the Product List Page now opens a nested Popover showing filter categories. Clicking on a parent filter category will open a child popover for specific filter options.

## What Was Implemented

### 1. Parent Filter Popover

When clicking the Filter button, a Popover appears with the following parent items:

- **Status** - Filter by product status
- **Image coverage** - Filter by image availability
- **Description coverage** - Filter by description availability
- **Discount** - Filter by discount status
- **Product catalog** - Filter by catalog
- **GTIN** - Filter by GTIN presence
- **Duplicates** - Filter by duplicate products
- **Brand** - Filter by brand
- **Venue overrides** - Filter by venue-specific overrides

### 2. Nested Interaction Structure

- Clicking on any parent item triggers the child popover to appear
- The child popover appears to the right of the parent popover
- Currently shows placeholder items (to be replaced with actual filter options)
- Click-outside behavior closes both popovers

### 3. State Management

Added the following state variables:

```typescript
const [showFilterPopover, setShowFilterPopover] = useState(false);
const [showChildPopover, setShowChildPopover] = useState(false);
const [selectedFilterParent, setSelectedFilterParent] = useState<string | null>(null);
const filterButtonRef = useRef<HTMLDivElement>(null);
```

### 4. Integration Points

- **Filter Button** (`src/pages/ProductListPage.tsx` line ~1070):
  - Wrapped in a div with ref for positioning
  - onClick handler toggles the popover
  
- **Popover Rendering** (bottom of ProductListPage component):
  - Parent popover positioned below the filter button
  - Child popover positioned to the right of parent popover
  - Uses `getBoundingClientRect()` for dynamic positioning

- **Click-Outside Handler**:
  - Closes popovers when clicking outside
  - Uses `useEffect` with event listener cleanup

## What's Next

The user will provide:
1. **Child items** for each parent category
2. **Behavior** for each child popover:
   - Whether it should use checkboxes or multi-select
   - What options should be available
   - How selections should filter the product list

## Current Structure

```typescript
// Parent items (implemented)
const filterParentItems: PopoverListItem[] = [
  { id: 'status', label: 'Status', onClick: ... },
  { id: 'image-coverage', label: 'Image coverage', onClick: ... },
  // ... 7 more items
];

// Child items (placeholder - to be replaced)
{showChildPopover && selectedFilterParent && (
  <Popover
    template="checkboxes"  // Will vary per parent
    items={[
      // Placeholder items to be replaced with actual options
    ]}
    // ... positioning
  />
)}
```

## Technical Details

### Positioning

- Parent popover: 8px below the filter button
- Child popover: Same vertical position as parent, 260px to the right
- Uses fixed positioning with absolute coordinates

### Templates

- **Parent popover**: `single-select` - clicking an item opens child popover
- **Child popover**: Will vary based on user requirements (checkboxes or multi-select)

### Accessibility

- Uses the existing Popover component with full accessibility support
- Keyboard navigation works out of the box
- Screen reader friendly with ARIA attributes

## Files Modified

1. **`src/pages/ProductListPage.tsx`**:
   - Added Popover import
   - Added filter popover state
   - Added filter parent items definition
   - Updated filter button with ref and onClick
   - Added popover rendering at component bottom
   - Added click-outside useEffect handler

2. **`src/App.tsx`**:
   - Removed demo page switcher
   - Restored simple ProductListPage render

## Testing

To test the current implementation:

1. Run `npm run dev`
2. Click the Filter button (funnel icon next to the search bar)
3. Parent popover appears with 9 filter categories
4. Click on any category (e.g., "Status")
5. Child popover appears to the right with placeholder items
6. Click outside to close both popovers

## Next Steps

1. Wait for user to provide child items and behavior for each parent category
2. Update the child popover rendering to:
   - Show different items based on `selectedFilterParent`
   - Use appropriate template (checkboxes/radios) based on filter type
   - Implement actual filtering logic for the product list
3. Add filter indicator badges to show active filters
4. Add "Clear All" functionality if needed
5. Possibly add search within filter options for long lists

## Notes

- The Popover component supports both checkboxes and radio buttons
- The nested interaction pattern is working correctly
- Positioning is dynamic based on button location
- The implementation follows Material Design motion guidelines (from the Popover component)
- All styling uses design tokens for consistency
