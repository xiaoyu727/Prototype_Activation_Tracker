# Image Coverage Filter Implementation

## Overview

The Image Coverage filter has been implemented with **radio buttons** for mutually exclusive selection between products with images and products without images.

## Filter Options

The Image Coverage filter provides 2 mutually exclusive options:

1. **With images** - Show only products that have images
2. **Without images** - Show only products without images

## Template Type: Radio Buttons

Unlike the Status filter (which uses checkboxes for multi-select), the Image Coverage filter uses **radio buttons** because:
- Users can only select ONE option at a time
- The options are mutually exclusive (a product either has an image or doesn't)
- Selecting one option automatically deselects the other

## Implementation Details

### State Management

```typescript
const [selectedImageCoverage, setSelectedImageCoverage] = useState<string | null>(null);
```

**Note:** Unlike Status (array), Image Coverage uses a **single string** or **null** because only one option can be selected.

### Child Items Definition

```typescript
const imageCoverageFilterItems: PopoverListItem[] = [
  { 
    id: 'with-images', 
    label: 'With images', 
    selected: selectedImageCoverage === 'with-images' 
  },
  { 
    id: 'without-images', 
    label: 'Without images', 
    selected: selectedImageCoverage === 'without-images' 
  },
];
```

### Template Type Selector

```typescript
const getTemplateType = (): 'checkboxes' | 'radios' => {
  switch (selectedFilterParent) {
    case 'status':
      return 'checkboxes';  // Multi-select
    case 'image-coverage':
      return 'radios';      // Single-select
    default:
      return 'checkboxes';
  }
};
```

### Selection Handler

```typescript
const handleChildItemChange = (id: string, selected: boolean) => {
  if (selectedFilterParent === 'status') {
    // Checkboxes - multi-select
    if (selected) {
      setSelectedStatusFilters([...selectedStatusFilters, id]);
    } else {
      setSelectedStatusFilters(selectedStatusFilters.filter(item => item !== id));
    }
  } else if (selectedFilterParent === 'image-coverage') {
    // Radio buttons - single select
    setSelectedImageCoverage(id);
  }
};
```

## User Flow

### Step 1: Open Filter
```
Click Filter Button
       ↓
┌──────────────────────┐
│ Status               │
│ Image coverage       │ ← Click this
│ Description coverage │
│ ...                  │
└──────────────────────┘
```

### Step 2: Select Image Coverage Category
```
Click "Image coverage"
       ↓
┌──────────────────┐
│ Image coverage ✕ │ ← Chip
└──────────────────┘
       ↓ 8px gap
┌──────────────────────┐
│ ○ With images        │
│ ○ Without images     │
└──────────────────────┘
```

### Step 3: Select Option
```
Click "With images"
       ↓
┌──────────────────┐
│ Image coverage ✕ │
└──────────────────┘
┌──────────────────────┐
│ ● With images        │ ← Selected (filled radio)
│ ○ Without images     │
└──────────────────────┘
```

### Step 4: Change Selection
```
Click "Without images"
       ↓
┌──────────────────┐
│ Image coverage ✕ │
└──────────────────┘
┌──────────────────────┐
│ ○ With images        │ ← Deselected
│ ● Without images     │ ← Selected (automatically)
└──────────────────────┘
```

## Visual Differences: Radio vs Checkbox

### Radio Buttons (Image Coverage)
- **Shape**: Circle ○ / ●
- **Behavior**: Only one can be selected
- **Selection**: Clicking one deselects the other
- **Icon**: Filled circle when selected

### Checkboxes (Status)
- **Shape**: Square ☐ / ☑
- **Behavior**: Multiple can be selected
- **Selection**: Independent toggle
- **Icon**: Checkmark when selected

## Features

### ✅ Single Selection
- Only one option can be active at a time
- Selecting "With images" automatically deselects "Without images"
- And vice versa

### ✅ Clear State
- Can deselect by returning to parent and re-selecting
- State persists when navigating between categories

### ✅ Visual Feedback
- Selected radio shows filled circle
- Hover state shows grey background
- Cursor indicates clickable items

## Popover Configuration

```typescript
<Popover
  template={getTemplateType()}  // Returns 'radios' for image-coverage
  items={getChildItems()}       // Returns imageCoverageFilterItems
  onItemChange={handleChildItemChange}
  radioGroupName="image-coverage-radio-group"
  position={{ top: 0, left: 0 }}
  style={{ position: 'relative' }}
/>
```

## Testing

### To Test Image Coverage Filter:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Open filter:**
   - Click Filter button

3. **Select Image coverage:**
   - Click "Image coverage" in parent popover

4. **Test radio behavior:**
   - Click "With images" → Radio fills
   - Click "Without images" → "With images" deselects, "Without images" selects
   - Confirm only one can be selected at a time

5. **Test navigation:**
   - Click chip or X → Returns to parent
   - Re-select "Image coverage" → Selection is remembered

## Integration with Product List

### Future Implementation: Filtering Logic

```typescript
const filteredProducts = productsData.filter(product => {
  // Image coverage filter
  if (selectedImageCoverage === 'with-images') {
    if (!product.image) return false; // Hide products without images
  } else if (selectedImageCoverage === 'without-images') {
    if (product.image) return false; // Hide products with images
  }
  
  // Other filters...
  return true;
});
```

### Active Filter Chip Display

When a selection is made, show it above the product list:

```typescript
{selectedImageCoverage && (
  <FilterChip
    label={`Image coverage: ${
      selectedImageCoverage === 'with-images' 
        ? 'With images' 
        : 'Without images'
    }`}
    onRemove={() => setSelectedImageCoverage(null)}
    onClick={() => {
      setSelectedFilterParent('image-coverage');
      setShowFilterPopover(true);
    }}
  />
)}
```

## Comparison: Checkboxes vs Radios

| Feature | Status (Checkboxes) | Image Coverage (Radios) |
|---------|-------------------|------------------------|
| **Selection Type** | Multi-select | Single-select |
| **State Type** | Array of strings | Single string or null |
| **Visual** | Square with checkmark | Circle with dot |
| **Use Case** | Multiple independent options | Mutually exclusive choices |
| **Example** | Active, Inactive, Enabled | With images OR Without images |
| **Deselection** | Click to toggle | Select another option |

## When to Use Radio vs Checkbox

### Use Radio Buttons When:
- ✅ Options are mutually exclusive
- ✅ Only one choice makes sense
- ✅ User must choose exactly one option
- **Examples:** Yes/No, Male/Female, With/Without

### Use Checkboxes When:
- ✅ Multiple selections are allowed
- ✅ Options are independent
- ✅ User can select 0, 1, or many options
- **Examples:** Categories, Features, Status types

## Code Pattern for Other Filters

### For Radio Button Filters (Single-Select):

```typescript
// 1. State (single value)
const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

// 2. Items
const filterItems: PopoverListItem[] = [
  { id: 'option1', label: 'Option 1', selected: selectedFilter === 'option1' },
  { id: 'option2', label: 'Option 2', selected: selectedFilter === 'option2' },
];

// 3. Template type
case 'filter-name':
  return 'radios';

// 4. Handler
setSelectedFilter(id);
```

### For Checkbox Filters (Multi-Select):

```typescript
// 1. State (array)
const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

// 2. Items
const filterItems: PopoverListItem[] = [
  { id: 'option1', label: 'Option 1', selected: selectedFilters.includes('option1') },
  { id: 'option2', label: 'Option 2', selected: selectedFilters.includes('option2') },
];

// 3. Template type
case 'filter-name':
  return 'checkboxes';

// 4. Handler
if (selected) {
  setSelectedFilters([...selectedFilters, id]);
} else {
  setSelectedFilters(selectedFilters.filter(item => item !== id));
}
```

## Next Steps

### Other Filters to Implement:

**Single-Select (Radio Buttons):**
- Description coverage (With/Without description)
- Discount (Has discount / No discount)
- GTIN (Has GTIN / No GTIN)
- Duplicates (Has duplicates / No duplicates)
- Venue overrides (Has overrides / No overrides)

**Multi-Select (Checkboxes):**
- Product catalog (Multiple catalogs)
- Brand (Multiple brands)

## Notes

- ✅ Radio buttons implemented with Radio component
- ✅ Proper state management (single value, not array)
- ✅ Dynamic template selection based on filter type
- ✅ Mutually exclusive behavior works correctly
- ✅ Visual design matches Figma specifications
- ✅ No linter errors

## Files Modified

- ✅ `src/pages/ProductListPage.tsx` - Added Image coverage filter
- 📄 `IMAGE_COVERAGE_FILTER.md` - This documentation
