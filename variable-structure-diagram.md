# Figma Variable Structure - Visual Diagram

## Variable Collection Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    RAW VALUES (Literals)                        │
│                   #181818, 16px, "SF Pro"                       │
└─────────────────────────────────────────────────────────────────┘
                              ↑
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    BASE COLLECTION                              │
│  ┌──────────────────┬──────────────────┬──────────────────┐   │
│  │ base/color/      │ base/size/       │ base/font-       │   │
│  │   neutral/50     │   1 = 4px        │   family/brand   │   │
│  │   neutral/20     │   2 = 8px        │                  │   │
│  │                  │   4 = 16px       │                  │   │
│  │                  │   6 = 24px       │                  │   │
│  └──────────────────┴──────────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↑
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    USAGE COLLECTION                             │
│  ┌──────────────────┬──────────────────┬──────────────────┐   │
│  │ usage/space/     │ usage/type/      │ usage/color/     │   │
│  │   xx-small: 4px  │   label/small/   │   icon/default   │   │
│  │   x-small: 8px   │     default:     │   text/subdued   │   │
│  │   small: 12px    │     - font-fam   │                  │   │
│  │   medium: 16px   │     - font-size  │                  │   │
│  │                  │     - font-wght  │                  │   │
│  │                  │     - line-hght  │                  │   │
│  │                  │     - letter-sp  │                  │   │
│  └──────────────────┴──────────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↑
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                            │
┌───────────────────────┐              ┌─────────────────────────┐
│  COLOR COLLECTION     │              │  COMPONENT COLLECTION   │
│  ┌─────────────────┐  │              │  ┌───────────────────┐ │
│  │ color/brand/    │  │              │  │ component.shared. │ │
│  │   sidebar-bg    │  │              │  │   control.small.  │ │
│  │   bg-fill-brand │  │              │  │   height          │ │
│  │   text-on-brand │  │              │  │                   │ │
│  │                 │  │              │  │ component.input.  │ │
│  │ color/icon/     │  │              │  │   borderWidth     │ │
│  │   default       │  │              │  │   cornerRadius    │ │
│  │   inverse       │  │              │  │                   │ │
│  │                 │  │              │  │ component.button  │ │
│  │ color/color-*   │  │              │  │   border-radius   │ │
│  │   text          │  │              │  └───────────────────┘ │
│  │   bg-surface    │  │              └─────────────────────────┘
│  └─────────────────┘  │
└───────────────────────┘
        │                                            │
        └─────────────────────┬─────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│            SEMANTIC NAMED VARIABLES (Aliases)                   │
│  ┌──────────────────┬──────────────────┬──────────────────┐   │
│  │ Text/            │ Surface/         │ Border/          │   │
│  │   Neutral        │   Default        │   Subdued        │   │
│  │   Subdued        │   Subdued        │   Neutral        │   │
│  │   Inverse        │   Raised         │   Selected       │   │
│  │   Positive       │   Transparent    │   Focused        │   │
│  └──────────────────┴──────────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↑
                              │
┌─────────────────────────────────────────────────────────────────┐
│               ALIASED VARIABLES (Dynamic References)            │
│  ┌──────────────────┬──────────────────┬──────────────────┐   │
│  │ ${color.text}    │ ${color.border}  │ ${color.bg       │   │
│  │ ${color.text     │ ${color.border   │   SurfaceTertiary│   │
│  │   Subdued}       │   Subdued}       │ }                │   │
│  │ ${color.text     │ ${color.outline  │                  │   │
│  │   Inverse}       │   Focused}       │                  │   │
│  └──────────────────┴──────────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↑
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                            │
┌───────────────────────┐              ┌─────────────────────────┐
│  LIBRARY COMPONENTS   │              │  LOCAL COMPONENTS       │
│  (Emporos UI/Alchemy) │              │  (Project-Specific)     │
│  ┌─────────────────┐  │              │  ┌───────────────────┐ │
│  │ .SideNav        │  │              │  │ Button            │ │
│  │ .List item      │  │              │  │ Editable cell     │ │
│  │ .Subcomponent/  │  │              │  │ Row               │ │
│  │  Table icon btn │  │              │  │ Search Icon       │ │
│  │                 │  │              │  │ Header            │ │
│  │ Avatar          │  │              │  │ Table             │ │
│  │ Pagination      │  │              │  └───────────────────┘ │
│  │ Segmented Ctrl  │  │              └─────────────────────────┘
│  └─────────────────┘  │
└───────────────────────┘
        │                                            │
        └─────────────────────┬─────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   CODE IMPLEMENTATION                           │
│  import { Avatar } from '@creditornot/alchemy-react'           │
│                                                                 │
│  <Button style={{                                               │
│    padding: "var(--usage/space/medium, 16px)",                 │
│    borderRadius: "var(--usage/border-radius/full, 9999px)",    │
│    backgroundColor: "var(--color/brand/bg-fill-brand, #4c4c4c)"│
│  }} />                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Connection Flow: Library ↔ Local Components

```
┌──────────────────────────────────────────────────────────────────┐
│                    SHARED VARIABLE COLLECTIONS                   │
│     (The "Contract" between Library and Local Components)       │
└──────────────────────────────────────────────────────────────────┘
                    ↓                           ↓
    ┌───────────────────────────┐   ┌───────────────────────────┐
    │  LIBRARY COMPONENTS       │   │  LOCAL COMPONENTS         │
    │  (.ComponentName)         │   │  (ComponentName)          │
    │                           │   │                           │
    │  Uses:                    │   │  Uses:                    │
    │  • color/brand/*          │   │  • usage/type/*           │
    │  • space-regular-*        │   │  • usage/space/*          │
    │  • ${color.*} aliases     │   │  • color/color-*          │
    │  • base/* tokens          │   │  • component/* tokens     │
    │                           │   │  • Text/*, Surface/*      │
    │  Example:                 │   │                           │
    │  .SideNav                 │   │  Example:                 │
    │    bg: color/brand/       │   │  Button                   │
    │        color-sidebar-bg   │   │    padding: usage/space/  │
    │    padding: space-        │   │             medium        │
    │             regular-xlarge│   │    color: color/brand/    │
    │    gap: space-regular-    │   │           color-text-on-  │
    │          xlarge           │   │           bg-fill-brand   │
    └───────────────────────────┘   └───────────────────────────┘
                    ↓                           ↓
    ┌───────────────────────────────────────────────────────────┐
    │                  CODE CONNECT MAPPING                     │
    │  (Links Figma components to React implementations)       │
    │                                                           │
    │  .SideNav → renders with nested <Avatar> from library    │
    │  Avatar → import { Avatar } from '@creditornot/alchemy-  │
    │           react'                                          │
    └───────────────────────────────────────────────────────────┘
                              ↓
    ┌───────────────────────────────────────────────────────────┐
    │               RENDERED APPLICATION UI                     │
    │  Library and local components share visual consistency   │
    │  through unified variable system                          │
    └───────────────────────────────────────────────────────────┘
```

---

## Variable Reference Pattern Example

### Typography Token Resolution

```
Designer applies → "Text/Neutral"
                      ↓
Figma resolves to → "color/color-text"
                      ↓
References       → "base/color/neutral/50" (conceptual)
                      ↓
Final value      → #181818

In CSS:
.text {
  color: var(--color\/color-text, #181818);
}
```

### Spacing Token Resolution

```
Designer applies → "Medium spacing"
                      ↓
Figma resolves to → "usage/space/medium"
                      ↓
References       → "base/size/4"
                      ↓
Final value      → 16px

In CSS:
.container {
  padding: var(--usage\/space\/medium, 16px);
}
```

### Composite Typography Token Resolution

```
Designer applies → "Label Small Default"
                      ↓
Figma resolves to → "usage/type/label/small/default"
                      ↓
Expands to:
  ├─ font-family: var(--usage/type/label/small/default/font-family, 'SF Pro')
  ├─ font-weight: var(--usage/type/label/small/default/font-weight, 510)
  ├─ font-size: var(--usage/type/label/small/default/font-size, 14px)
  ├─ line-height: var(--usage/type/label/small/default/line-height, 20px)
  └─ letter-spacing: var(--usage/type/label/small/default/letter-spacing, -0.01px)

In CSS:
.label {
  font-family: var(--usage\/type\/label\/small\/default\/font-family, 'SF Pro');
  font-weight: var(--usage\/type\/label\/small\/default\/font-weight, 510);
  font-size: var(--usage\/type\/label\/small\/default\/font-size, 14px);
  line-height: var(--usage\/type\/label\/small\/default\/line-height, 20px);
  letter-spacing: var(--usage\/type\/label\/small\/default\/letter-spacing, -0.01px);
}
```

---

## Integration Points

### 1. Variable Layer (Shared Tokens)

```
┌─────────────────────────────────────────┐
│      SHARED VARIABLE COLLECTIONS        │
│                                         │
│  • Base tokens                          │
│  • Usage tokens                         │
│  • Color tokens                         │
│  • Component tokens                     │
│  • Semantic names                       │
│  • Aliased variables                    │
└─────────────────────────────────────────┘
            ↓                 ↓
    ┌───────────┐     ┌──────────────┐
    │  Library  │     │    Local     │
    │Components │     │ Components   │
    └───────────┘     └──────────────┘
```

### 2. Component Layer (Code Connect)

```
Figma Component     Code Connect     React Implementation
      ↓                  →           import { Avatar } from
  .SideNav                           '@creditornot/alchemy-react'
      ↓                  →           
  Avatar                             <Avatar 
                                       shape="square"
                                       size="xSmall"
                                     />
```

### 3. Naming Layer (Convention)

```
Component Name         Type              Source
─────────────────────────────────────────────────────────
.SideNav          →    Library      →    Emporos UI/Alchemy
.List item        →    Library      →    Emporos UI/Alchemy
Button            →    Local        →    Project-specific
Editable cell     →    Local        →    Project-specific
Search Icon       →    Local        →    Project-specific
```

---

## Design Token Export Structure (Conceptual)

If exported to JSON, the structure would look like:

```json
{
  "base": {
    "color": {
      "neutral": {
        "50": { "value": "#8b8b8b" },
        "20": { "value": "#c4c4c4" }
      }
    },
    "size": {
      "1": { "value": "4px" },
      "2": { "value": "8px" },
      "4": { "value": "16px" },
      "6": { "value": "24px" }
    },
    "font-family": {
      "brand": { "value": "SF Pro" }
    }
  },
  "usage": {
    "space": {
      "xx-small": { "value": "4px" },
      "x-small": { "value": "8px" },
      "small": { "value": "12px" },
      "medium": { "value": "16px" }
    },
    "type": {
      "label": {
        "small": {
          "default": {
            "font-family": { "value": "{base.font-family.brand}" },
            "font-size": { "value": "14px" },
            "font-weight": { "value": "510" },
            "line-height": { "value": "20px" },
            "letter-spacing": { "value": "-0.01px" }
          }
        }
      }
    },
    "border-radius": {
      "full": { "value": "9999px" }
    }
  },
  "color": {
    "brand": {
      "color-sidebar-bg": { "value": "#181818" },
      "color-bg-fill-brand": { "value": "#4c4c4c" },
      "color-text-on-bg-fill-brand": { "value": "#f1f1f1" }
    },
    "icon": {
      "default": { "value": "#191919" },
      "inverse": { "value": "#ffffff" }
    }
  },
  "component": {
    "shared": {
      "control": {
        "small": {
          "height": { "value": "36px" }
        }
      }
    },
    "input": {
      "small": {
        "cornerRadius": { "value": "8px" }
      },
      "borderWidthFocused": { "value": "2px" }
    }
  },
  "semantic": {
    "Text": {
      "Neutral": { "value": "{color.color-text}" },
      "Inverse": { "value": "#FFFFFF" }
    },
    "Surface": {
      "Default": { "value": "#F1F1F1" },
      "Subdued": { "value": "#F8F8F8" }
    },
    "Border": {
      "Subdued": { "value": "#EDEDEE" },
      "Selected": { "value": "#9A9A9A" }
    }
  }
}
```

---

## CSS Custom Properties Output

When implemented in CSS, the variables would be structured as:

```css
:root {
  /* Base tokens */
  --base-color-neutral-50: #8b8b8b;
  --base-color-neutral-20: #c4c4c4;
  --base-size-1: 4px;
  --base-size-2: 8px;
  --base-size-4: 16px;
  --base-font-family-brand: "SF Pro";
  
  /* Usage tokens */
  --usage-space-xx-small: 4px;
  --usage-space-x-small: 8px;
  --usage-space-small: 12px;
  --usage-space-medium: 16px;
  
  --usage-type-label-small-default-font-family: var(--base-font-family-brand);
  --usage-type-label-small-default-font-size: 14px;
  --usage-type-label-small-default-font-weight: 510;
  --usage-type-label-small-default-line-height: 20px;
  --usage-type-label-small-default-letter-spacing: -0.01px;
  
  --usage-border-radius-full: 9999px;
  
  /* Color tokens */
  --color-brand-color-sidebar-bg: #181818;
  --color-brand-color-bg-fill-brand: #4c4c4c;
  --color-brand-color-text-on-bg-fill-brand: #f1f1f1;
  --color-icon-default: #191919;
  --color-icon-inverse: #ffffff;
  
  /* Component tokens */
  --component-shared-control-small-height: 36px;
  --component-input-small-cornerRadius: 8px;
  --component-input-borderWidthFocused: 2px;
  
  /* Semantic tokens */
  --text-neutral: var(--color-color-text);
  --text-inverse: #FFFFFF;
  --surface-default: #F1F1F1;
  --surface-subdued: #F8F8F8;
  --border-subdued: #EDEDEE;
  --border-selected: #9A9A9A;
}
```

---

## Usage in Components

### Library Component Example

```jsx
// .SideNav component
import { Avatar } from '@creditornot/alchemy-react';

export function SideNav() {
  return (
    <div style={{
      backgroundColor: 'var(--color-brand-color-sidebar-bg)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-regular-xlarge)'
    }}>
      <div style={{
        borderRadius: 'var(--corner-radius-large)'
      }}>
        <Avatar shape="square" size="xSmall" />
      </div>
    </div>
  );
}
```

### Local Component Example

```jsx
// Button component
export function Button({ children }) {
  return (
    <button style={{
      padding: 'var(--usage-space-x-small) var(--usage-space-medium)',
      borderRadius: 'var(--usage-border-radius-full)',
      backgroundColor: 'var(--color-brand-color-bg-fill-brand)',
      color: 'var(--color-brand-color-text-on-bg-fill-brand)',
      fontFamily: 'var(--usage-type-label-small-strong-font-family)',
      fontSize: 'var(--usage-type-label-small-strong-font-size)',
      fontWeight: 'var(--usage-type-label-small-strong-font-weight)',
      lineHeight: 'var(--usage-type-label-small-strong-line-height)',
      letterSpacing: 'var(--usage-type-label-small-strong-letter-spacing)'
    }}>
      {children}
    </button>
  );
}
```

Both components use the same underlying variable system, ensuring visual consistency!
