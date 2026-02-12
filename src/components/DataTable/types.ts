import type React from 'react';

/**
 * Column definition for the data table.
 * id and label are required; widthRatio is used for flex sizing (e.g. 1.3 for a wider column).
 */
export interface DataTableColumn<T = unknown> {
  id: string;
  label: string;
  /** Flex grow ratio for column width (default 1). e.g. 1.3 gives ~30% more space than 1. */
  widthRatio?: number;
}

/**
 * Selection state and callbacks for row selection (checkbox column).
 */
export interface DataTableSelection {
  /** Currently selected row ids */
  selectedIds: string[];
  /** Toggle a single row by id */
  onToggle: (id: string) => void;
  /** Toggle all visible rows (e.g. "select all on page") */
  onToggleAll: (checked: boolean) => void;
}

/**
 * Drag-and-drop configuration for reordering rows.
 * Indices are in the context of the full data set (e.g. filtered list), not just the current page.
 */
export interface DataTableDragDrop<T = unknown> {
  /** Called when drag starts; e.g. for setDragImage. Index is the row's index in the full list. */
  onDragStart: (e: React.DragEvent, index: number) => void;
  /** Called when dragging over another row */
  onDragOver: (e: React.DragEvent, index: number) => void;
  /** Called when drag ends */
  onDragEnd: () => void;
  /** Index of the row currently being dragged (in full list), or null */
  draggedIndex: number | null;
  /** Map row to its index in the full list (used for opacity and drag events) */
  getRowIndex: (row: T) => number;
}

/**
 * Row hover state (e.g. for showing drag handle or in-cell dropdowns).
 */
export interface DataTableHover {
  hoveredRowId: string | null;
  onRowHover: (id: string | null) => void;
}
