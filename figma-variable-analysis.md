# Figma Variable Structure Analysis
## Listing Catalog Playground - Variable Architecture

---

## Overview

This document analyzes the variable structure in the "Listing Catalog playground" Figma file, focusing on the connection between local components and the ✨ Emporos UI Library (Alchemy Design System).

---

## Variable Collection Structure

The design system uses a **multi-tiered token architecture** organized into the following collections:

### 1. **Base Collection** (Primitive Tokens)
These are the foundation-level tokens that define raw values:

- **Colors**: `base/color/neutral/50`, `base/color/neutral/20`
- **Sizes**: `base/size/1` (4px), `base/size/2` (8px), `base/size/4` (16px), `base/size/6` (24px)
- **Typography**: `base/font-family/brand` ("SF Pro"), `base/font-size/xx-small` (10px)

**Purpose**: Establishes the atomic design values that all other tokens reference.

---

### 2. **Usage Collection** (Semantic Tokens)
Mid-level tokens that provide semantic meaning and reference base tokens:

#### Spacing
- `usage/space/none` (0px)
- `usage/space/xx-small` (4px)
- `usage/space/x-small` (8px)
- `usage/space/small` (12px)
- `usage/space/medium` (16px)
- `usage/space/regular-xlarge` (16px)

#### Typography Tokens (Composite)
Complex typography tokens that bundle multiple properties:

```
usage/type/label/small/default
├── font-family: "SF Pro"
├── font-weight: Medium (510)
├── font-size: 14px
├── line-height: 20px
└── letter-spacing: -0.01px

usage/type/label/small/strong
├── font-family: "SF Pro"
├── font-weight: Semibold (590)
├── font-size: 14px
├── line-height: 20px
└── letter-spacing: -0.01px

usage/type/body/small/strong
├── font-family: "SF Pro"
├── font-weight: Semibold (590)
├── font-size: 14px
├── line-height: 20px
└── letter-spacing: -0.01px

usage/type/display/large
├── font-family: "SF Pro"
├── font-weight: Bold (700)
├── font-size: 32px
├── line-height: 40px
└── letter-spacing: -0.01px
```

#### Sizes
- `usage/size/x-small` (16px)
- `usage/size/action/small` (32px)

#### Border Radius
- `usage/border-radius/full` (9999px)

#### Colors (Semantic)
- `usage/color/icon/default` (#191919)
- `usage/color/icon/subdued/default` (#606060)
- `usage/color/text/subdued/default` (#606060)

**Purpose**: Provides context-specific tokens for different UI elements and states.

---

### 3. **Color Collection** (Brand & Context Colors)
Design-specific color tokens organized by purpose:

#### Brand Colors
- `color/brand/color-sidebar-bg` (#181818)
- `color/brand/color-bg-fill-brand` (#4c4c4c)
- `color/brand/color-text-on-bg-fill-brand` (#f1f1f1)
- `color/brand/color-border-selected` (#9a9a9a)
- `color/brand/color-canvas-bg` (#f8f8f8)

#### UI Element Colors
- `color/color-text` (#181818)
- `color/color-text-subdued` (#6c6c6c)
- `color/color-text-selected` (#4c4c4c)
- `color/color-text-inverse-disabled` (#424242)
- `color/color-text-positive` (#327a34)

#### Background/Surface Colors
- `color/color-bg-surface` (#f1f1f1)
- `color/color-bg-surface-dim` (#ffffff)
- `color/color-bg-surface-secondary` (#f8f8f8)
- `color/color-bg-surface-transparent` (#ffffff7a)
- `color/color-bg-surface-positive` (#e0f9de)
- `color/color-bg-dim` (#f8f8f8)

#### Border Colors
- `color/color-border-subdued` (#d9dada)

#### Icon Colors
- `color/icon/default` (#191919)
- `color/icon/inverse` (#ffffff)

**Purpose**: Provides the actual color palette used throughout the design system.

---

### 4. **Component Collection** (Component-Specific Tokens)
Tokens scoped to specific component requirements:

#### Control Sizes
- `component.shared.control.small.height` (36px)
- `component.shared.control.xsmall.height` (28px)
- `control-dimension/small-height` (36px)

#### Button Styles
- `comp/border-radius/button` (9999px)

#### Select Button
- `component.select-button.borderWidth` (1px)
- `component.select-button.color.bg` (transparent)
- `component.select-button.color.bg-hovered` (#f6f6f6)

#### Input Styles
- `component.input.small.cornerRadius` (8px)
- `component.input.borderWidthFocused` (2px)
- `component.input-search.color.bg` (#ededee)

#### Input Focus Shadow (Multi-layer)
```
component/input/focus-shadow
├── layer-1: color (#0000001f), blur (0), offset (0,0)
├── layer-2: color (#0000001f), blur (0), offset (0,0)
└── layer-3: color (#0000001f), blur (0), offset (0,0)
```

#### Icon Buttons
- `component.icon-button.small.cornerRadius` (9999px)
- `component.icon-button.xsmall.cornerRadius` (9999px)

#### Tags
- `component.tag.medium.paddingX` (8px)

#### Checkbox
- `component/checkbox/corner-radius` (4px)

**Purpose**: Provides component-level customization while maintaining system consistency.

---

### 5. **Semantic Named Variables** (Human-Readable Aliases)
User-friendly names that map to the token system:

#### Text Colors
- `Text/Neutral` → #181818
- `Text/Subdued` → #202125
- `Text/Inverse` → #FFFFFF
- `Text/Disabled` → #424242
- `Text/Positive` → #327A34

#### Surface Colors
- `Surface/Default` → #F1F1F1
- `Surface/Subdued` → #F8F8F8
- `Surface/Raised` → #FFFFFF
- `Surface/Neutral tertiary` → #FFFFFF
- `Surface/Transparent` → #FFFFFF
- `Surface/Positive` → #E0F9DE

#### Border Colors
- `Border/Subdued` → #EDEDEE
- `Border/Neutral` → #E4E4E5
- `Border/Selected` → #9A9A9A
- `Border/Focused` → #0F2594

#### Background
- `Background/Subdued` → #F8F8F8
- `bg/default` → #ffffff

#### Typography Styles
- `Caption` → Font(SF Pro, Regular, 14px, line-height: 19.6px)

**Purpose**: Makes the design system more accessible to designers without deep token knowledge.

---

### 6. **Aliased Variables** (Variable References)
Variables that reference other variables using the `${}` syntax:

- `${color.text}` → #202125
- `${color.textSubdued}` → #202125 (with opacity)
- `${color.textInverse}` → #ffffff
- `${color.border}` → #e4e4e5
- `${color.borderSubdued}` → #ededee
- `${color.bgSurfaceTertiary}` → transparent
- `${color.outlineFocused}` → #0F2594

**Purpose**: Creates a reference layer that can dynamically switch themes or modes.

---

### 7. **Primitive Dimension Tokens**
Direct pixel values used across the system:

- `dimension/2` (2px)
- `dimension/4` (4px)
- `dimension/8` (8px)
- `0px`, `2px`, `4px`, `6px`, `8px`, `12px`, `32px`, `36px`

**Purpose**: Quick-access tokens for common spacing/sizing needs.

---

### 8. **Legacy/Alternative Naming Patterns**
Tokens with different naming conventions (possibly from earlier versions):

#### Spacing
- `space-narrow-xsmall` (2px)
- `space-narrow-medium` (6px)
- `space-regular-medium` (8px)
- `space-regular-large` (12px)
- `space-regular-xlarge` (16px)
- `space-broad-medium` (28px)
- `space-broad-xlarge` (36px)

#### Border Radius
- `corner-radius-none` (0px)
- `corner-radius-small` (4px)
- `corner-radius-medium` (8px)
- `corner-radius-large` (12px)
- `corner-radius/max` (9999px)
- `corner-radius/large` (12px)

#### Border Width
- `border-width-regular-medium` (1px)
- `border-width-regular-large` (2px)

#### Typography
- `font-size-body-small` (14px)
- `font-tracking-medium` (0px)
- `font-weight-medium` (500px)
- `typography/font-family-sans` ("SF Pro")
- `typography/style-caption/*` (composite font style)

#### Colors
- `color.text` (#202125)
- `color.textSubdued` (#202125a3 - with opacity)
- `color.border` (#e4e4e5)
- `color.borderSubdued` (#ededee)
- `color.bgSurfaceTertiary` (transparent)
- `color.outlineFocused` (#0f2594)
- `light-graphite-4` (#e9e9e9)

**Purpose**: Maintains backward compatibility with older component versions.

---

## Connection Architecture: Local Components ↔ Emporos UI Library

### How the Connection Works

The connection between local components and the ✨ Emporos UI Library (implemented as `@creditornot/alchemy-react`) happens through **three key mechanisms**:

---

### 1. **Shared Variable Collections**

Both library components and local components reference the **same variable collections**. This creates a unified design language:

#### Example: Library Component (`.SideNav`)
```jsx
// Uses shared variables from the collection
<div className="bg-[var(--color/brand/color-sidebar-bg,#181818)]">
  <div className="gap-[var(--space-regular-xlarge,16px)]">
    <div className="rounded-[var(--corner-radius-large,12px)]">
```

#### Example: Local Component (`Button`)
```jsx
// Uses the SAME shared variables
<div className="px-[var(--usage/space/medium,16px)]">
  <div className="py-[var(--usage/space/x-small,8px)]">
    <div className="rounded-[var(--usage/border-radius/full,9999px)]">
```

**Key Insight**: Variables act as the **"contract"** between library and local components, ensuring visual consistency.

---

### 2. **Code Connect Integration**

Components are linked to actual React code via **Figma Code Connect**, mapping design components to implementation:

#### Example from `.SideNav`
```jsx
import { Avatar } from '@creditornot/alchemy-react';

<CodeConnectSnippet data-snippet-language="React">
  <Avatar
    shape="square"
    size="xSmall"
    imgProps={{
      src: "", // image source to use
    }}
  />
</CodeConnectSnippet>
```

This tells developers:
- **What component to use**: `Avatar` from `@creditornot/alchemy-react`
- **What props to apply**: `shape="square"`, `size="xSmall"`
- **Where it lives in code**: The actual import path

**Key Insight**: Code Connect bridges the design-to-code gap by explicitly mapping Figma components to their code implementations.

---

### 3. **Component Naming Convention**

The design system uses a **dot-prefix naming convention** to distinguish component types:

- **`.ComponentName`** = Library component from Emporos UI/Alchemy
  - Example: `.SideNav`, `.List item`, `.Subcomponent / Table icon button`
  
- **`ComponentName`** (no prefix) = Local/custom component
  - Example: `Button`, `Editable cell`, `Row`, `Search Icon`

**Key Insight**: This naming convention provides instant visual recognition of component provenance.

---

## Variable Usage Patterns

### In Library Components (Emporos UI/Alchemy)

Library components primarily use:

1. **Brand color tokens**: `color/brand/*`
2. **Base spacing tokens**: `space-regular-*`, `space-narrow-*`
3. **Aliased variables**: `${color.textSubdued}`, `${color.text}`

Example from `.SideNav`:
```css
background: var(--color/brand/color-sidebar-bg, #181818)
padding: 16px
gap: var(--space-regular-xlarge, 16px)
border-radius: var(--corner-radius-large, 12px)
```

---

### In Local Components

Local components use a mix of:

1. **Usage-level tokens**: `usage/type/*`, `usage/space/*`, `usage/color/*`
2. **Semantic named variables**: `Text/Neutral`, `Surface/Default`
3. **Component-specific tokens**: `component/*`

Example from `Editable cell`:
```css
color: var(--color/color-text, #181818)
font-family: var(--usage/type/label/small/default/font-family, 'SF Pro')
font-size: var(--usage/type/label/small/default/font-size, 14px)
line-height: var(--usage/type/label/small/default/line-height, 20px)
```

Example from `Button`:
```css
background: linear-gradient(90deg, rgb(24, 24, 24), rgb(76, 76, 76))
padding: var(--usage/space/medium, 16px) var(--usage/space/x-small, 8px)
border-radius: var(--usage/border-radius/full, 9999px)
color: var(--color/brand/color-text-on-bg-fill-brand, #f1f1f1)
```

---

## Token Reference Architecture

The variable system follows a **hierarchical reference pattern**:

```
Semantic Names → Usage Tokens → Base Tokens → Raw Values
     ↓                ↓              ↓             ↓
Text/Neutral  →  color/color  → base/color  →  #181818
              →     -text      → /neutral/50
```

### Example Flow:

1. **Designer applies**: `Text/Neutral`
2. **Figma resolves to**: `color/color-text`
3. **Which references**: `base/color/neutral/50` (hypothetically)
4. **Final value**: `#181818`

This allows **changes to propagate** through the entire system when base values are updated.

---

## Design System Benefits

### 1. **Consistency Across Library and Local Components**
Both component types use the same variable collections, ensuring visual harmony.

### 2. **Scalability**
New components (local or library) can immediately leverage the existing token system.

### 3. **Maintainability**
Changes to base tokens automatically propagate to all components.

### 4. **Developer Handoff**
Code Connect makes it explicit which React components to use, reducing implementation ambiguity.

### 5. **Theming Support**
The aliased variable layer (`${color.*}`) enables theme switching without touching components.

### 6. **Flexibility**
Multiple token tiers (base → usage → component) allow for different levels of customization.

---

## Key Observations

### Variable Collection Organization

The design system demonstrates a **mature token architecture** with:

- ✅ **Clear separation of concerns** (base → usage → component)
- ✅ **Comprehensive coverage** (colors, spacing, typography, effects)
- ✅ **Multiple abstraction layers** for flexibility
- ✅ **Fallback values** in all variable references (e.g., `var(--token, fallback)`)

### Integration Points

The connection between local and library components happens at:

1. **Variable layer**: Shared token collections
2. **Component layer**: Code Connect mappings to `@creditornot/alchemy-react`
3. **Naming layer**: Dot-prefix convention for instant recognition

### Design System Maturity Indicators

- ✅ Composite tokens (typography bundles)
- ✅ Multi-layer effects (input focus shadows)
- ✅ Semantic aliasing (`Text/Neutral` → `color/color-text`)
- ✅ Component-specific customization tokens
- ✅ Code Connect integration for design-to-code workflow
- ✅ Systematic naming conventions

---

## Recommendations for Implementation

### For Developers:

1. **Install the Alchemy React library**: `@creditornot/alchemy-react`
2. **Export Figma variables to CSS Custom Properties** or design tokens (JSON)
3. **Use Code Connect mappings** as the source of truth for component selection
4. **Respect the token hierarchy**: Prefer `usage/*` tokens over `base/*` tokens
5. **Leverage semantic names** (`Text/Neutral`) for readability in code

### For Designers:

1. **Use library components** (`.ComponentName`) wherever possible
2. **Create local components** only when library components don't meet needs
3. **Always reference variables** instead of hard-coded values
4. **Use semantic names** for better communication with developers
5. **Document custom components** with Code Connect if they become reusable

---

## Component Inventory (Sample)

### Library Components (from Emporos UI/Alchemy)
- `.SideNav` - Main navigation sidebar
- `.List item` - Navigation list item
- `.Subcomponent / Table icon button` - Table action button
- `Avatar` - User/entity avatar (Code Connect → `@creditornot/alchemy-react`)
- `Button` - Primary action button
- `Icon button` - Icon-only button
- `Segmented Control` - Toggle control
- `Pagination` - Table pagination
- `Cell` - Table cell

### Local Components (Project-Specific)
- `Editable cell` - Inline editable table cell
- `Row` - Table row with states (Default, Hover)
- `Search Icon` - Search input with states (default, hover, focused, value)
- `Header` - Table header
- `Table` - Main data table component

---

## Summary

The **Listing Catalog playground** demonstrates a sophisticated design system with:

- **Multi-tiered token architecture** (base → usage → component → semantic)
- **Strong connection** between local and library components via shared variables
- **Clear integration path** from design to code via Code Connect
- **Mature organization** with systematic naming and reference patterns

The ✨ Emporos UI Library (Alchemy) serves as the **component foundation**, while local components **extend the system** for project-specific needs—all unified through a **shared variable collection** that ensures consistency and maintainability.
