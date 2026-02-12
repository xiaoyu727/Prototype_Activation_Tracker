# Component Library Setup & Testing Guide

## ✅ What's Been Built

### Development Environment
- ✅ **Vite** - Fast build tool and dev server
- ✅ **React 18** - UI library
- ✅ **TypeScript** - Type safety
- ✅ **Storybook 7** - Component development and testing

### Components Built (4/13)
- ✅ **Button** - Primary, secondary, tertiary variants with icon support
- ✅ **IconButton** - Icon-only buttons in 3 sizes
- ✅ **Badge** - Status badges in 4 variants
- ✅ **Search** - Search input with icon and states

### Components Remaining (9/13)
- ⏭️ **Editable Cell** - Inline editable table cell
- ⏭️ **Tab** - Tab navigation
- ⏭️ **Breadcrumbs** - Breadcrumb navigation
- ⏭️ **List Item** - Navigation list item
- ⏭️ **Header** - Table/section header
- ⏭️ **Row** - Table row
- ⏭️ **Segmented Control** - Toggle control
- ⏭️ **Search Icon** - Search icon with states
- ⏭️ **Table Icon Button** - Table-specific icon button

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd "/Users/bohdan/Downloads/cursor search prototype"
npm install
```

This will install:
- React & React DOM
- Vite
- Storybook 7
- TypeScript
- All necessary dev dependencies

### 2. Start Storybook

```bash
npm run storybook
```

This will:
- Start Storybook dev server
- Open browser at `http://localhost:6006`
- Show all available components
- Enable interactive testing

### 3. View Components

In Storybook, you can:
- **Navigate** through components in the sidebar
- **Interact** with controls to change props
- **View** different variants and states
- **Test** component behavior
- **Read** auto-generated documentation

---

## 📚 Component Documentation

### Button

**Location**: `src/components/Button/`

```tsx
import { Button } from './src/components';

// Basic usage
<Button variant="primary">Click me</Button>

// With icon
<Button variant="primary" icon={<AddIcon />}>
  Add Item
</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
```

**Props**:
- `children`: Button text
- `variant`: 'primary' | 'secondary' | 'tertiary'
- `size`: 'small' | 'medium' | 'large'
- `icon`: React element for leading icon
- `disabled`: boolean
- `onClick`: () => void
- `fullWidth`: boolean

---

### IconButton

**Location**: `src/components/IconButton/`

```tsx
import { IconButton } from './src/components';

// Basic usage
<IconButton 
  icon={<SearchIcon />} 
  aria-label="Search"
  variant="tertiary"
/>

// Different sizes
<IconButton icon={<Icon />} aria-label="X-Small" size="xSmall" />
<IconButton icon={<Icon />} aria-label="Small" size="small" />
<IconButton icon={<Icon />} aria-label="Medium" size="medium" />

// Different variants
<IconButton icon={<Icon />} aria-label="Primary" variant="primary" />
<IconButton icon={<Icon />} aria-label="Secondary" variant="secondary" />
<IconButton icon={<Icon />} aria-label="Tertiary" variant="tertiary" />
```

**Props**:
- `icon`: React element
- `aria-label`: string (required for accessibility)
- `variant`: 'primary' | 'secondary' | 'tertiary'
- `size`: 'xSmall' | 'small' | 'medium'
- `disabled`: boolean
- `onClick`: () => void

---

### Badge

**Location**: `src/components/Badge/`

```tsx
import { Badge } from './src/components';

// Basic usage
<Badge variant="default">Label</Badge>

// Different variants
<Badge variant="default">Default</Badge>
<Badge variant="positive">Active</Badge>
<Badge variant="neutral">Info</Badge>
<Badge variant="subdued">Draft</Badge>

// Different sizes
<Badge size="small">Small</Badge>
<Badge size="medium">Medium</Badge>
```

**Props**:
- `children`: Badge text
- `variant`: 'default' | 'positive' | 'neutral' | 'subdued'
- `size`: 'small' | 'medium'

---

### Search

**Location**: `src/components/Search/`

```tsx
import { Search } from './src/components';
import { useState } from 'react';

// Controlled component
function MyComponent() {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <Search
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Search..."
    />
  );
}

// Full width
<Search fullWidth placeholder="Search everywhere..." />

// Disabled
<Search disabled placeholder="Disabled" />
```

**Props**:
- `value`: string
- `onChange`: (value: string) => void
- `placeholder`: string
- `disabled`: boolean
- `fullWidth`: boolean

---

## 🎨 Using Design Tokens in Components

All components use design tokens for consistent styling:

```typescript
import { tokens } from '../../tokens';

// Example from Button component
style={{
  padding: `${tokens.component.button.paddingY.small}px ${tokens.component.button.paddingX.small}px`,
  backgroundColor: tokens.colors.brand.bgFillBrand,
  color: tokens.colors.brand.textOnBgFillBrand,
  borderRadius: `${tokens.component.button.borderRadius}px`,
  fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
  fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
}}
```

---

## 🧪 Testing Components in Storybook

### Interactive Controls

Each component story has controls in Storybook:

1. **Open Storybook**: `npm run storybook`
2. **Select a component** from the sidebar
3. **Use the Controls panel** at the bottom to:
   - Change props
   - Toggle states
   - Test different variants
   - View component behavior

### Story Examples

Each component has multiple stories:

**Button Stories**:
- Primary
- PrimaryWithIcon
- Secondary
- Tertiary
- Small / Medium / Large
- Disabled
- FullWidth
- All Variants (comparison)
- All Sizes (comparison)

**IconButton Stories**:
- Primary / Secondary / Tertiary
- XSmall / Small / Medium
- Disabled
- All Variants
- All Sizes

**Badge Stories**:
- Default / Positive / Neutral / Subdued
- Small / Medium
- All Variants
- All Sizes

**Search Stories**:
- Default
- WithValue
- Disabled
- FullWidth
- Controlled (interactive)

---

## 📁 Project Structure

```
cursor search prototype/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx          # Component implementation
│   │   │   ├── Button.stories.tsx  # Storybook stories
│   │   │   └── index.ts            # Exports
│   │   ├── IconButton/
│   │   ├── Badge/
│   │   ├── Search/
│   │   └── index.ts                # All component exports
│   ├── App.tsx                     # Demo app
│   └── main.tsx                    # Entry point
│
├── tokens/                         # Design tokens
│   ├── base/
│   ├── usage/
│   ├── color/
│   ├── component/
│   ├── semantic/
│   └── tokens.css
│
├── .storybook/                     # Storybook config
│   ├── main.ts
│   └── preview.ts
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

---

## 🔧 Development Workflow

### 1. Create a New Component

```bash
# Create component directory
mkdir src/components/MyComponent

# Create component files
touch src/components/MyComponent/MyComponent.tsx
touch src/components/MyComponent/MyComponent.stories.tsx
touch src/components/MyComponent/index.ts
```

### 2. Implement Component

```tsx
// MyComponent.tsx
import React from 'react';
import { tokens } from '../../../tokens';

export interface MyComponentProps {
  // Define props
}

export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return (
    <div style={{
      // Use design tokens
      padding: tokens.usage.spacing.medium,
      color: tokens.semantic.colors.text.neutral,
    }}>
      {/* Component content */}
    </div>
  );
};
```

### 3. Create Storybook Stories

```tsx
// MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### 4. Export Component

```tsx
// index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### 5. Add to Main Index

```tsx
// src/components/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### 6. Test in Storybook

```bash
npm run storybook
```

Navigate to your component and test all variants!

---

## 🎯 Next Steps

### Immediate Actions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Storybook**:
   ```bash
   npm run storybook
   ```

3. **Test existing components**:
   - Navigate through the component tree
   - Try different variants
   - Use the Controls panel
   - Check responsiveness

### Build Remaining Components

Priority order:
1. **Editable Cell** - For table editing
2. **Tab** - Navigation element
3. **Segmented Control** - Toggle control
4. **Breadcrumbs** - Page navigation
5. **List Item** - For sidebar navigation
6. **Row** - Table row component
7. **Header** - Table header
8. **Search Icon** - Standalone search icon
9. **Table Icon Button** - Table-specific variant

---

## 📊 Component Status

| Component | Status | Stories | Location |
|-----------|--------|---------|----------|
| Button | ✅ Complete | 9 stories | `src/components/Button/` |
| IconButton | ✅ Complete | 7 stories | `src/components/IconButton/` |
| Badge | ✅ Complete | 7 stories | `src/components/Badge/` |
| Search | ✅ Complete | 5 stories | `src/components/Search/` |
| Editable Cell | ⏭️ Pending | - | - |
| Tab | ⏭️ Pending | - | - |
| Breadcrumbs | ⏭️ Pending | - | - |
| List Item | ⏭️ Pending | - | - |
| Header | ⏭️ Pending | - | - |
| Row | ⏭️ Pending | - | - |
| Segmented Control | ⏭️ Pending | - | - |
| Search Icon | ⏭️ Pending | - | - |
| Table Icon Button | ⏭️ Pending | - | - |

---

## 🐛 Troubleshooting

### Port Already in Use

If port 6006 is in use:
```bash
# Kill the process
lsof -ti:6006 | xargs kill -9

# Or use a different port
npm run storybook -- -p 6007
```

### TypeScript Errors

```bash
# Run type checking
npm run typecheck

# Check specific file
npx tsc src/components/Button/Button.tsx --noEmit
```

### Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Notes

### Design Token Usage

All components **must** use design tokens from `tokens/`:
- ✅ Use `tokens.usage.spacing.medium`
- ❌ Don't use hardcoded `16px`

### Type Safety

All components are fully typed with TypeScript:
- Props interfaces exported
- Ref forwarding where appropriate
- Proper event typing

### Accessibility

Components include accessibility features:
- Proper ARIA labels
- Keyboard navigation support
- Focus states
- Semantic HTML

---

**Ready to test!** 🎉

Run `npm install && npm run storybook` to start developing!
