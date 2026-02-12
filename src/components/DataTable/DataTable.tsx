import React from 'react';
import { tokens } from '../../../tokens';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';
import type { DataTableColumn, DataTableSelection, DataTableDragDrop, DataTableHover } from './types';

/**
 * Props for the generic DataTable component.
 * T is the row type (e.g. Product). All content is provided via render props so the table stays generic.
 */
export interface DataTableProps<T> {
  /** Column definitions (id, label, optional widthRatio for flex) */
  columns: DataTableColumn<T>[];
  /** Data rows to display */
  rows: T[];
  /** Get unique id for a row (used for keys, selection, hover) */
  getRowId: (row: T) => string;
  /** Render cell content for a given column and row */
  renderCell: (columnId: string, row: T) => React.ReactNode;
  /** Optional custom header renderer; if not provided, uses column label with default styling */
  renderHeader?: (columnId: string, label: string) => React.ReactNode;
  /** Optional selection state and callbacks (shows checkbox column when provided) */
  selection?: DataTableSelection;
  /** Optional render for the row actions cell (e.g. "More" menu button) */
  rowActions?: (row: T) => React.ReactNode;
  /** Optional drag-and-drop (shows drag handle when provided) */
  dragDrop?: DataTableDragDrop<T>;
  /** Optional row hover state (e.g. for drag handle visibility and in-cell dropdowns) */
  hover?: DataTableHover;
  /** Optional: called on mouse move over the body (e.g. to track hover inside InCellSelect by data attributes) */
  onBodyMouseMove?: (e: React.MouseEvent) => void;
  /** Optional: called when mouse leaves the body */
  onBodyMouseLeave?: () => void;
  /** Optional: called when the row is clicked. Not called when clicking checkbox, in-cell dropdowns, or row actions. */
  onRowClick?: (row: T) => void;
  /** Padding for each row (horizontal). Default '0 24px' */
  rowPadding?: string;
  /** Width of the selection (checkbox) column. Default '48px' */
  selectionColumnWidth?: string;
  /** Width of the actions column. Default '44px' */
  actionsColumnWidth?: string;
  /** Border radius for bottom of table when content is short (e.g. '32px'). Set to '0' when paginated. */
  borderBottomRadius?: string;
  /** Whether the header row is sticky. Default true */
  stickyHeader?: boolean;
  /** Custom drag handle renderer. Receives row and index-in-full-list. If dragDrop is set but this is not provided, no handle is shown. */
  renderDragHandle?: (row: T, indexInFullList: number) => React.ReactNode;
  /** Icon for the default row actions slot when rowActions is not provided (e.g. More icon). Not used if rowActions is provided. */
  defaultActionsIcon?: React.ReactNode;
  /** Aria label for the default actions button */
  defaultActionsAriaLabel?: string;
}

/**
 * Computes flex value for a column (used for both header and body cells so widths align).
 */
function columnFlex(widthRatio: number = 1): string {
  return `${widthRatio} 1 0%`;
}

/**
 * Generic data table with optional selection, drag-and-drop, row actions, and custom cell/header rendering.
 * Column widths are driven by columns[].widthRatio (default 1); same ratio is applied to header and body so they align.
 */
export function DataTable<T>({
  columns,
  rows,
  getRowId,
  renderCell,
  renderHeader,
  selection,
  rowActions,
  dragDrop,
  hover,
  onBodyMouseMove,
  onBodyMouseLeave,
  onRowClick,
  rowPadding = '0 24px',
  selectionColumnWidth = '48px',
  actionsColumnWidth = '44px',
  borderBottomRadius = '0px',
  stickyHeader = true,
  renderDragHandle,
  defaultActionsIcon,
  defaultActionsAriaLabel = 'More actions',
}: DataTableProps<T>): React.ReactElement {
  const hasSelection = selection != null;
  const hasDragDrop = dragDrop != null;
  const hasHover = hover != null;
  const showDragHandle = hasDragDrop && renderDragHandle != null;

  /** Selection: "all on page" and "some on page" for header checkbox (indeterminate when only some rows selected) */
  const selectedIdsSet = React.useMemo(
    () => (selection ? new Set(selection.selectedIds) : new Set<string>()),
    [selection?.selectedIds]
  );
  const allOnPageSelected =
    hasSelection && rows.length > 0 && rows.every((row) => selectedIdsSet.has(getRowId(row)));
  const someOnPageSelected =
    hasSelection && rows.some((row) => selectedIdsSet.has(getRowId(row))) && !allOnPageSelected;

  const toggleSelectAll = React.useCallback(() => {
    if (!selection) return;
    selection.onToggleAll(!allOnPageSelected);
  }, [selection, allOnPageSelected]);

  /** Default header: label with simple styling (caller can override with renderHeader) */
  const defaultRenderHeader = React.useCallback(
    (columnId: string, label: string) => (
      <div
        key={columnId}
        style={{
          display: 'flex',
          flex: columnFlex(columns.find((c) => c.id === columnId)?.widthRatio ?? 1),
          minWidth: 0,
          alignItems: 'center',
          gap: '8px',
          maxHeight: '48px',
          minHeight: '48px',
          padding: '12px 12px',
          borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
        }}
      >
        <span
          style={{
            fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
            fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
            fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
            lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
            color: tokens.semantic.colors.text.subdued,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>
      </div>
    ),
    [columns]
  );

  const headerRenderer = renderHeader ?? defaultRenderHeader;

  return (
    <>
      {/* Header row: same flex as body cells so column widths align; optional sticky for scroll */}
      <div
        style={{
          position: stickyHeader ? 'sticky' : undefined,
          top: stickyHeader ? 0 : undefined,
          zIndex: stickyHeader ? 10 : undefined,
          display: 'flex',
          alignItems: 'center',
          padding: rowPadding,
          backgroundColor: tokens.semantic.colors.surface.raised,
        }}
      >
        {hasSelection && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: selectionColumnWidth,
              maxWidth: selectionColumnWidth,
              minWidth: selectionColumnWidth,
              minHeight: '48px',
              padding: '4px 12px',
              borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
            }}
          >
            <Checkbox
              checked={allOnPageSelected}
              indeterminate={someOnPageSelected}
              onChange={toggleSelectAll}
            />
          </div>
        )}
        {columns.map((col) => headerRenderer(col.id, col.label))}
        <div
          style={{
            flex: `0 0 ${actionsColumnWidth}`,
            width: actionsColumnWidth,
            minHeight: '48px',
            borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
          }}
        />
      </div>

      {/* Body: onMouseMove/onMouseLeave let parent track hover inside custom cells (e.g. InCellSelect via data attributes) */}
      <div
        style={{
          borderBottomLeftRadius: borderBottomRadius,
          borderBottomRightRadius: borderBottomRadius,
          overflow: 'hidden',
        }}
        onMouseMove={onBodyMouseMove}
        onMouseLeave={onBodyMouseLeave}
      >
        {rows.map((row, indexInPage) => {
          const rowId = getRowId(row);
          const indexInFullList = dragDrop ? dragDrop.getRowIndex(row) : indexInPage;
          const isHovered = hasHover && hover.hoveredRowId === rowId;
          const isDragging = hasDragDrop && dragDrop.draggedIndex === indexInFullList;

          const handleRowClick = (e: React.MouseEvent) => {
            if (!onRowClick) return;
            const target = e.target as HTMLElement;
            if (
              target.closest('[data-in-cell-select]') ||
              target.closest('input[type="checkbox"]') ||
              target.closest('button') ||
              target.closest('[role="button"]')
            ) {
              return;
            }
            onRowClick(row);
          };

          return (
            <div
              key={rowId}
              data-row-id={rowId}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: rowPadding,
                backgroundColor: isHovered
                  ? tokens.semantic.colors.surface.subdued
                  : tokens.semantic.colors.surface.raised,
                position: 'relative',
                cursor: onRowClick ? 'pointer' : undefined,
                opacity: isDragging ? 0.4 : 1,
                minHeight: '48px',
              }}
              onClick={onRowClick ? handleRowClick : undefined}
              onMouseEnter={
                hasHover && (!hasDragDrop || dragDrop.draggedIndex === null)
                  ? () => hover.onRowHover(rowId)
                  : undefined
              }
              onMouseLeave={
                hasHover && (!hasDragDrop || dragDrop.draggedIndex === null)
                  ? () => hover.onRowHover(null)
                  : undefined
              }
              onDragOver={hasDragDrop ? (e) => dragDrop.onDragOver(e, indexInFullList) : undefined}
            >
              {/* Drag handle: only when dragDrop + renderDragHandle and (hovered or dragging) */}
              {showDragHandle && (isHovered || isDragging) && (
                <div
                  draggable
                  onDragStart={(e) => dragDrop!.onDragStart(e, indexInFullList)}
                  onDragEnd={dragDrop!.onDragEnd}
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '16px',
                    width: '16px',
                    height: '16px',
                    zIndex: 10,
                    cursor: 'grab',
                    userSelect: 'none',
                  }}
                >
                  {renderDragHandle(row, indexInFullList)}
                </div>
              )}

              {hasSelection && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: selectionColumnWidth,
                    maxWidth: selectionColumnWidth,
                    minWidth: selectionColumnWidth,
                    minHeight: '48px',
                    padding: '4px 12px',
                    borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
                  }}
                >
                  <Checkbox
                    checked={selectedIdsSet.has(rowId)}
                    onChange={() => selection!.onToggle(rowId)}
                  />
                </div>
              )}

              {/* Data cells: one per column, same flex as header */}
              {columns.map((col) => (
                <div
                  key={`${rowId}-${col.id}`}
                  style={{
                    flex: columnFlex(col.widthRatio ?? 1),
                    minWidth: 0,
                    width: '100%',
                  }}
                >
                  <div style={{ width: '100%', minWidth: 0 }}>{renderCell(col.id, row)}</div>
                </div>
              ))}

              {/* Actions cell */}
              <div
                style={{
                  flex: `0 0 ${actionsColumnWidth}`,
                  width: actionsColumnWidth,
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  minHeight: '48px',
                  padding: '4px 12px',
                  borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
                }}
              >
                {rowActions
                  ? rowActions(row)
                  : defaultActionsIcon != null && (
                      <IconButton
                        icon={defaultActionsIcon}
                        aria-label={defaultActionsAriaLabel}
                        variant="flat"
                        size="xSmall"
                      />
                    )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
