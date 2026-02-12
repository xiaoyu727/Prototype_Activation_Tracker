# ActionMenu

Reusable dropdown / context menu. Matches Figma: Action menu (node 3008:7523).

**Icons (from `src/icons/16/`):** Stories use `edit-line.svg`, `copy-line.svg`, `trash-line.svg`, `more-horizontal.svg`. The component accepts `icon` as a prop (ReactNode or string URL). **Single-selection (Figma 3008-7523):** When `selectedItemId` is set, the selected item shows a checkmark on the **left** (before the label), using `src/icons/16/checkmark.svg`. Row size = Small (36px) by default; medium = 40px.

## Design tokens

- **surface.elevated** – menu background (`#FBFBFB`)
- **interaction.surfaceHovered** – item hover/focus background
- **text.neutral** / **text.negative** – label and destructive
- **usage.borderRadius.medium** – 8px corners
- **usage.typography.label.small.default** – item text
- Shadow: Figma shadow/medium (3-layer drop shadow)

## API

| Prop | Type | Description |
|------|------|-------------|
| `items` | `ActionMenuItem[]` | Menu entries (id, label, icon?, onClick?, disabled?, destructive?) |
| `trigger` | `ReactNode` | Optional. When set, menu opens on trigger click and positions relative to it (flips near viewport edges). |
| `open` | `boolean` | Controlled open (when using `trigger`) |
| `defaultOpen` | `boolean` | Uncontrolled initial open |
| `onOpenChange` | `(open: boolean) => void` | Called when open state changes |
| `position` | `{ top?, left?, right?, bottom? }` | Used when there is no `trigger` (parent-controlled position) |
| `onClose` | `() => void` | Called when menu closes |

**ActionMenuItem:** `id`, `label`, `icon?` (ReactNode or string URL), `onClick?`, `disabled?`, `destructive?`.

## Usage

### Dropdown trigger (with trigger prop)

```tsx
<ActionMenu
  trigger={<Button variant="secondary">Actions</Button>}
  items={[
    { id: 'edit', label: 'Edit', icon: <EditIcon />, onClick: () => {} },
    { id: 'delete', label: 'Delete', destructive: true, onClick: () => {} },
  ]}
  onClose={() => {}}
/>
```

### Ellipsis overflow menu (trigger = “…”)

```tsx
<ActionMenu
  trigger={
    <IconButton
      icon={<MoreHorizontalIcon />}
      aria-label="More actions"
    />
  }
  items={actionMenuItems}
/>
```

### Legacy: parent-controlled position (no trigger)

```tsx
{showMenu && (
  <ActionMenu
    items={items}
    position={{ top: 100, left: 200 }}
    onClose={() => setShowMenu(false)}
  />
)}
```

## Behaviour

- **Keyboard:** Arrow Up/Down move focus, Enter/Space activate, Escape closes.
- **ARIA:** `role="menu"`, `role="menuitem"`, `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-disabled`.
- **Click outside** or **Escape** closes the menu.
- **Positioning:** With `trigger`, menu is placed below the trigger and flips above when near the bottom of the viewport.

## Item states (Figma 3008-7617)

Menu items use **background + text color only**; there is no input-style blue focus border.

- **Default** – transparent background, neutral text.
- **Hover** – `interaction.surfaceHovered` (#F6F6F6) background.
- **Focused (keyboard)** – same as hover (surfaceHovered); no outline.
- **Pressed (active)** – `interaction.surfacePressed` (#E4E4E4) background.
- **Disabled** – transparent background, `text.disabled` color (and icon at 40% opacity).
- **Destructive** – `text.negative`; hover/focus/pressed use `surface.negative` background.

## MenuItem subcomponent

`MenuItem` is a dedicated subcomponent used inside ActionMenu. It can be imported for reuse in other menus:

```ts
import { MenuItem } from '../ActionMenu';
```

Props: `label`, `icon?`, `disabled?`, `destructive?`, `isHovered?`, `isFocused?`, `isPressed?`, plus event handlers and `buttonRef`.

## Variants

- **Default (closed)** – trigger visible, menu hidden.
- **Open** – menu visible, first item focusable.
- **Item hover / focused / pressed / disabled** – see “Item states” above.
