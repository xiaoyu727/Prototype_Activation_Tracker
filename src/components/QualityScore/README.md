# QualityScore Component

A visual indicator for displaying quality scores with a circular progress spinner and percentage text.

## Features

- **Circular Progress Indicator**: Visual representation of the quality score
- **Color-coded**: Automatically changes color based on score thresholds
  - 🟢 Green (80-100%): High quality
  - 🟠 Orange (50-79%): Medium quality
  - 🔴 Red (0-49%): Low quality
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Includes proper color contrast and semantic markup

## Usage

```tsx
import { QualityScore } from '../components/QualityScore';

// Basic usage
<QualityScore score={95} />

// In a table
<QualityScore score={product.qualityScore} />
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `score` | `number` | ✓ | - | Quality score percentage (0-100) |

## Examples

### High Quality (Green)
```tsx
<QualityScore score={95} />
```

### Medium Quality (Orange)
```tsx
<QualityScore score={65} />
```

### Low Quality (Red)
```tsx
<QualityScore score={35} />
```

## Design Tokens

The component uses the following design tokens:
- `tokens.semantic.colors.text.positive` - Green text color
- `tokens.semantic.colors.surface.positive` - Light green background
- `tokens.semantic.colors.text.negative` - Red text color
- `tokens.semantic.colors.surface.negative` - Light red background
- `tokens.usage.typography.label.small.default` - Typography styles
- `tokens.component.tag.medium.paddingX` - Horizontal padding
- `tokens.usage.borderRadius.large` - Border radius

## Visual Design

The component consists of:
1. **Circular Progress**: A 16x16px SVG circle that fills clockwise based on the score
2. **Percentage Text**: The numeric score displayed next to the circle
3. **Container**: A tag-like container with rounded corners and colored background

## Accessibility

- Uses semantic HTML structure
- Proper color contrast ratios
- Score is displayed as text for screen readers

## Related Components

- `Tag` - For simple labeled content
- `Badge` - For count indicators
