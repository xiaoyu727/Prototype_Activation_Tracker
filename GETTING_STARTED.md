# 🚀 Getting Started with Your Component Library

## ✅ What You Have Now

You now have a **complete React component development environment** with:

### 1. Design Token System (Complete)
- ✅ 185+ design tokens
- ✅ TypeScript type safety
- ✅ CSS custom properties
- ✅ Full Figma parity

### 2. React Development Environment (Ready)
- ✅ **Vite** - Fast build tool
- ✅ **React 18** + TypeScript
- ✅ **Storybook 7** - Component playground
- ✅ Hot module replacement
- ✅ Type checking

### 3. Initial Components (4 Built)
- ✅ **Button** - Multiple variants and sizes
- ✅ **IconButton** - Icon-only buttons
- ✅ **Badge** - Status badges
- ✅ **Search** - Search input with icon

---

## 🎯 Quick Start (2 Commands)

### Step 1: Install Dependencies

```bash
cd "/Users/bohdan/Downloads/cursor search prototype"
npm install
```

This will install all necessary packages (~200MB, takes 1-2 minutes).

### Step 2: Launch Storybook

```bash
npm run storybook
```

This will:
1. Start the Storybook dev server
2. Automatically open your browser to `http://localhost:6006`
3. Show all your components in an interactive playground

**That's it!** You're ready to test and develop components.

---

## 🎨 Component Overview

### Button Component

**Features:**
- 3 variants: Primary, Secondary, Tertiary
- 3 sizes: Small, Medium, Large
- Icon support (leading icon)
- Disabled state
- Full width option
- Hover & click animations

**Storybook Stories:** 9 different examples

```tsx
<Button variant="primary" size="small" icon={<AddIcon />}>
  Add Item
</Button>
```

---

### IconButton Component

**Features:**
- 3 variants: Primary, Secondary, Tertiary
- 3 sizes: X-Small (28px), Small (36px), Medium (40px)
- Hover effects
- Disabled state
- Accessibility (aria-label required)

**Storybook Stories:** 7 different examples

```tsx
<IconButton 
  icon={<SearchIcon />} 
  aria-label="Search"
  variant="tertiary"
  size="small"
/>
```

---

### Badge Component

**Features:**
- 4 variants: Default, Positive, Neutral, Subdued
- 2 sizes: Small, Medium
- Pill-shaped design
- Status indicators

**Storybook Stories:** 7 different examples

```tsx
<Badge variant="positive" size="medium">
  Active
</Badge>
```

---

### Search Component

**Features:**
- Search icon included
- Focus states
- Value states
- Full width option
- Disabled state
- Controlled component

**Storybook Stories:** 5 different examples

```tsx
<Search 
  value={searchValue}
  onChange={setSearchValue}
  placeholder="Search..."
/>
```

---

## 🧪 Testing Components in Storybook

Once Storybook is running at `http://localhost:6006`:

### 1. Navigate Components

Use the sidebar to browse:
```
Components/
├── Badge
├── Button
├── IconButton
└── Search
```

### 2. Use Interactive Controls

Each component has a **Controls** panel where you can:
- Change props dynamically
- Toggle boolean values
- Select different variants
- Test disabled states
- Try different sizes

### 3. View Multiple States

Each component has multiple stories showing:
- Default state
- Different variants
- Different sizes
- Disabled state
- Interactive examples
- Comparison views (All Variants, All Sizes)

### 4. Test Interactions

- Hover over buttons
- Click to test animations
- Type in search fields
- Test keyboard navigation

---

## 📚 Documentation Available

| Document | Purpose | Location |
|----------|---------|----------|
| **GETTING_STARTED.md** | This file - Quick start | Root |
| **COMPONENT_SETUP.md** | Detailed component guide | Root |
| **tokens/README.md** | Token documentation | `tokens/` |
| **tokens/USAGE_EXAMPLES.md** | Token usage examples | `tokens/` |
| **README.md** | Project overview | Root |
| **TOKENS_SUMMARY.md** | Token system summary | Root |

---

## 🏗️ Project Structure

```
cursor search prototype/
├── 📁 src/
│   ├── 📁 components/          # React components
│   │   ├── Button/
│   │   │   ├── Button.tsx          ✅ Component
│   │   │   ├── Button.stories.tsx  ✅ 9 stories
│   │   │   └── index.ts
│   │   ├── IconButton/             ✅ 7 stories
│   │   ├── Badge/                  ✅ 7 stories
│   │   ├── Search/                 ✅ 5 stories
│   │   └── index.ts                # All exports
│   ├── App.tsx
│   └── main.tsx
│
├── 📁 tokens/                  # Design tokens ✅ Complete
│   ├── base/
│   ├── usage/
│   ├── color/
│   ├── component/
│   ├── semantic/
│   ├── utils/
│   └── tokens.css
│
├── 📁 .storybook/              # Storybook config ✅
│   ├── main.ts
│   └── preview.ts
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
└── 📄 index.html
```

---

## 💻 Available Commands

### Development

```bash
# Start Storybook (component development)
npm run storybook

# Start Vite dev server
npm run dev

# Type checking
npm run typecheck
```

### Building

```bash
# Build library
npm run build

# Build Storybook (static site)
npm run build-storybook

# Preview build
npm run preview
```

---

## 🎯 What's Next

### Immediate (You Can Do Right Now)

1. ✅ **Test existing components**
   ```bash
   npm install
   npm run storybook
   ```

2. ✅ **Explore in Storybook**
   - Try all variants
   - Use the Controls panel
   - Test interactions
   - Check different states

3. ✅ **Review code**
   - Check component implementation
   - See how tokens are used
   - Review TypeScript types

### Next Phase (Remaining Components)

Build the remaining 9 components from your Figma file:

**Priority 1 (Essential)**
- 📋 Editable Cell
- 📋 Tab
- 📋 Segmented Control

**Priority 2 (Navigation)**
- 📋 Breadcrumbs
- 📋 List Item

**Priority 3 (Data Display)**
- 📋 Row
- 📋 Header

**Priority 4 (Specialized)**
- 📋 Search Icon (standalone)
- 📋 Table Icon Button (variant)

---

## 🎨 Using Components in Your App

### Import

```tsx
import { 
  Button, 
  IconButton, 
  Badge, 
  Search,
  tokens 
} from './src/components';
```

### Example Usage

```tsx
import { Button, IconButton, Badge, Search } from './src/components';
import { useState } from 'react';

function MyApp() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div style={{ padding: '24px' }}>
      {/* Search */}
      <Search
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search products..."
      />

      {/* Buttons */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
        <Button variant="primary" icon={<AddIcon />}>
          Add Product
        </Button>
        <Button variant="secondary">
          Cancel
        </Button>
        <IconButton icon={<SettingsIcon />} aria-label="Settings" />
      </div>

      {/* Badges */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Badge variant="positive">Active</Badge>
        <Badge variant="subdued">Draft</Badge>
      </div>
    </div>
  );
}
```

---

## ✨ Key Features

### 1. Design Token Integration

All components use your design tokens:

```tsx
// Example from Button component
style={{
  padding: `${tokens.component.button.paddingY.small}px 
           ${tokens.component.button.paddingX.small}px`,
  backgroundColor: tokens.colors.brand.bgFillBrand,
  color: tokens.colors.brand.textOnBgFillBrand,
  borderRadius: `${tokens.component.button.borderRadius}px`,
}}
```

### 2. Type Safety

Full TypeScript support:

```tsx
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  // ... more props
}
```

### 3. Accessibility

Built-in accessibility features:
- ARIA labels
- Keyboard navigation
- Focus states
- Semantic HTML

### 4. Interactive Testing

Storybook provides:
- Live component preview
- Interactive controls
- Auto-generated docs
- Visual regression testing capability

---

## 🐛 Troubleshooting

### "Cannot find module"

```bash
npm install
```

### "Port 6006 already in use"

```bash
# Kill existing process
lsof -ti:6006 | xargs kill -9

# Or use different port
npm run storybook -- -p 6007
```

### TypeScript Errors

```bash
npm run typecheck
```

### Storybook Not Opening

Manually navigate to: `http://localhost:6006`

---

## 📊 Component Checklist

| Component | Built | Stories | Tested |
|-----------|-------|---------|--------|
| Button | ✅ | ✅ 9 | ⏭️ Ready |
| IconButton | ✅ | ✅ 7 | ⏭️ Ready |
| Badge | ✅ | ✅ 7 | ⏭️ Ready |
| Search | ✅ | ✅ 5 | ⏭️ Ready |
| Editable Cell | ⏭️ | - | - |
| Tab | ⏭️ | - | - |
| Breadcrumbs | ⏭️ | - | - |
| List Item | ⏭️ | - | - |
| Header | ⏭️ | - | - |
| Row | ⏭️ | - | - |
| Segmented Control | ⏭️ | - | - |
| Search Icon | ⏭️ | - | - |
| Table Icon Button | ⏭️ | - | - |

**Progress: 4/13 components (31%)**

---

## 🎉 Success Checklist

Before moving forward, verify:

- [ ] Dependencies installed (`npm install`)
- [ ] Storybook running (`npm run storybook`)
- [ ] Components visible in Storybook
- [ ] Can interact with component controls
- [ ] All 4 components load without errors
- [ ] Stories display correctly

Once all checked, you're ready to:
1. Test the existing components
2. Build the remaining components
3. Integrate into your application

---

## 🚀 You're Ready!

**Two commands away from testing:**

```bash
npm install
npm run storybook
```

Then open `http://localhost:6006` and start exploring!

---

**Questions or issues?** Check:
- `COMPONENT_SETUP.md` for detailed guides
- `tokens/README.md` for token documentation
- Component source code in `src/components/`
- Storybook documentation at your components

**Happy coding!** 🎨✨
