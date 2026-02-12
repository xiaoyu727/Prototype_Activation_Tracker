# Modal components

Reusable, scalable modal layer built around a shared **BaseModal** shell.

## BaseModal

Use `BaseModal` for any dialog that needs: backdrop, title bar with close button, scrollable body, and optional fixed footer.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | boolean | Whether the modal is visible |
| `onClose` | () => void | Called when closing (backdrop, close button, Escape) |
| `title` | string | Header title |
| `children` | ReactNode | Scrollable body content |
| `footer` | ReactNode | Optional; fixed bottom bar (e.g. actions, checkbox) |
| `width` | string \| number | Default `'776px'` |
| `height` | string \| number | Default `'540px'`; use `'auto'` for variable height |
| `closeOnBackdropClick` | boolean | Default `true` |
| `closeButtonAriaLabel` | string | Default `'Close'` |
| `isAnimating` | boolean | Optional controlled open/close animation (for exit-on-Save flows) |
| `animationVariant` | `'slide'` \| `'scale'` | Default `'slide'`; use `'scale'` for smaller centered modals |

**Controlled animation:** Pass `isAnimating` when the modal must run an exit animation before closing (e.g. user clicks “Save”). Parent sets `isAnimating` to `false`, then after ~300ms calls the close/confirm handler so the modal unmounts after the animation.

**Example:**

```tsx
<BaseModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="My dialog"
  footer={
    <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </div>
  }
  width={500}
  height="auto"
  animationVariant="scale"
>
  <p>Body content here.</p>
</BaseModal>
```

## Specific modals

- **PriceChangeModal** – Price change confirmation (table, “Do not show again”, Back to editing / Save).
- **NameChangeModal** – Name change confirmation (same footer pattern).
- **EditColumnsModal** – Edit visible columns (checkboxes, Cancel / Save), uses `BaseModal` with `animationVariant="scale"` and `width={510}`.

All three use `BaseModal` for backdrop, header, body scroll, and footer so new modals can follow the same pattern.
