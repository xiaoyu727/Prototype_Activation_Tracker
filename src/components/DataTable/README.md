# DataTable

Reusable, generic data table component with optional selection, drag-and-drop, row actions, and custom cell/header rendering.

## Features

- **Generic over row type** – Use with any `T` via `getRowId` and `renderCell(columnId, row)`.
- **Column definitions** – Pass `columns` with `id`, `label`, and optional `widthRatio` (e.g. `1.3` for a wider column). Header and body cells share the same flex so column widths align.
- **Optional selection** – Checkbox column and “select all” when `selection` prop is provided.
- **Optional drag-and-drop** – Row reorder via `dragDrop` and `renderDragHandle`. Indices are in full-list space (e.g. filtered list), not just current page.
- **Optional row hover** – For drag handle visibility and in-cell dropdowns; use `hover` and optionally `onBodyMouseMove` / `onBodyMouseLeave` for hover-by-data-attributes (e.g. InCellSelect).
- **Row actions** – Last column can be custom (`rowActions`) or default icon button (`defaultActionsIcon` + `defaultActionsAriaLabel`).
- **Custom headers** – Use `renderHeader(columnId, label)` or rely on the default label-only header.
- **No hardcoded data** – All content comes from props and render props; the table does not assume Product or any domain type.

## Usage

```tsx
<DataTable<Product>
  columns={visibleColumns.map((c) => ({
    id: c.id,
    label: c.label,
    widthRatio: c.id === 'name' ? 1.3 : 1,
  }))}
  rows={paginatedProducts}
  getRowId={(p) => p.id}
  renderCell={renderColumnCell}
  renderHeader={renderColumnHeader}
  selection={{ selectedIds, onToggle, onToggleAll }}
  dragDrop={{ onDragStart, onDragOver, onDragEnd, draggedIndex, getRowIndex }}
  hover={{ hoveredRowId, onRowHover }}
  onBodyMouseMove={handleInCellSelectHover}
  onBodyMouseLeave={clearInCellSelectHover}
  borderBottomRadius={...}
  renderDragHandle={() => <img src={DragHandleIcon} ... />}
  defaultActionsIcon={<MoreIcon />}
  defaultActionsAriaLabel="More actions"
/>
```

The parent owns all state and handlers (editing, modals, filters, etc.) and passes `renderCell` / `renderHeader` that close over that state.

## Files

- `DataTable.tsx` – Main component.
- `types.ts` – `DataTableColumn`, `DataTableSelection`, `DataTableDragDrop`, `DataTableHover`.
- `index.ts` – Exports.
