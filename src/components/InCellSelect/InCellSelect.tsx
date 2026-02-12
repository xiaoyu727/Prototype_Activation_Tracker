import React from 'react';
import { tokens } from '../../../tokens';
import { ActionMenu, type ActionMenuItem } from '../ActionMenu/ActionMenu';
import { Field } from '../Field/Field';

const CHEVRON_DOWN_SRC = new URL(
  '../../icons/16/chevron-down.svg',
  import.meta.url
).href;

/**
 * In-cell single-select dropdown: Field (Size=Medium) + Action Menu (Option=Single selection, Size=Medium).
 * Uses Field for trigger styling and ActionMenu for the list; close on outside click or Escape.
 */

export interface InCellSelectProps {
  /** Current value (must match one of the option values) */
  value: string;
  /** Options to show in the dropdown (display labels) */
  options: string[];
  /** Called when user selects a new value */
  onChange: (newValue: string) => void;
  /** Whether the cell is hovered (shows clickable field) */
  isHovered: boolean;
  /** Whether the dropdown is open */
  isEditing: boolean;
  /** Called when pointer enters the cell */
  onHover: () => void;
  /** Called when pointer leaves the cell (only when not editing) */
  onHoverLeave: () => void;
  /** Called when user clicks the field to open dropdown */
  onEditRequest: (e: React.MouseEvent) => void;
  /** Called when the dropdown closes (selection, Escape, or click outside). Parent should clear editing id. */
  onClose?: () => void;
  /** Ref to attach to dropdown container for click-outside detection */
  dropdownRef?: React.RefObject<HTMLDivElement | null>;
  /** Optional custom render for the value when not editing (e.g. Tag for status) */
  renderValue?: (value: string) => React.ReactNode;
  /** For container-based hover: product id (set data-product-id so parent can track hover from onMouseMove) */
  cellProductId?: string;
  /** For container-based hover: 'category' | 'status' (set data-cell-type) */
  cellType?: 'category' | 'status';
}

export const InCellSelect: React.FC<InCellSelectProps> = ({
  value,
  options,
  onChange,
  isHovered,
  isEditing,
  onHover,
  onHoverLeave,
  onEditRequest,
  onClose,
  dropdownRef,
  renderValue,
  cellProductId,
  cellType,
}) => {
  const labelTypography = tokens.usage.typography.label.small.default;
  const labelLineHeightCss = `${labelTypography.lineHeight}px`;

  const defaultRenderValue = (v: string) => (
    <span
      style={{
        display: 'inline-block',
        fontFamily: labelTypography.fontFamily,
        fontSize: `${labelTypography.fontSize}px`,
        fontWeight: labelTypography.fontWeight,
        lineHeight: labelLineHeightCss,
        color: tokens.semantic.colors.text.neutral,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {v ?? ''}
    </span>
  );

  const displayValue = renderValue ? renderValue(value) : defaultRenderValue(value);

  const menuItems: ActionMenuItem[] = options.map((opt) => ({
    id: opt,
    label: opt,
    onClick: () => onChange(opt),
  }));

  /** Trigger content (value + chevron). When showChevron is false, chevron fades out but keeps layout. */
  const triggerContent = (showChevron: boolean) => (
    <>
      <span
        style={{
          flex: '1 1 0%',
          minWidth: 0,
          alignSelf: 'center',
          fontFamily: labelTypography.fontFamily,
          fontSize: `${labelTypography.fontSize}px`,
          fontWeight: labelTypography.fontWeight,
          lineHeight: labelLineHeightCss,
          letterSpacing: labelTypography.letterSpacing,
          color: tokens.semantic.colors.text.neutral,
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value ?? ''}
      </span>
      <img
        src={CHEVRON_DOWN_SRC}
        alt=""
        width={16}
        height={16}
        style={{
          flexShrink: 0,
          marginLeft: 8,
          opacity: showChevron ? 1 : 0,
          pointerEvents: showChevron ? 'auto' : 'none',
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  );

  const handleMouseLeave = (e: React.MouseEvent) => {
    const next = e.relatedTarget as Node | null;
    if (next && typeof (next as Element).closest === 'function') {
      if ((next as Element).closest?.('[data-in-cell-select]')) return;
    }
    onHoverLeave();
  };

  const useSmoothTransition = renderValue == null;

  return (
    <div
      data-in-cell-select
      data-product-id={cellProductId ?? undefined}
      data-cell-type={cellType ?? undefined}
      style={{
        display: 'flex',
        flex: '1',
        gap: '8px',
        alignItems: 'center',
        minHeight: '48px',
        padding: '4px 12px',
        borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
      }}
      onMouseEnter={onHover}
      onMouseMove={onHover}
      onMouseLeave={handleMouseLeave}
    >
      {useSmoothTransition ? (
        isEditing ? (
          <div
            ref={dropdownRef}
            data-dropdown-container
            style={{ position: 'relative', width: '100%' }}
          >
            <ActionMenu
              items={menuItems}
              selectedItemId={value}
              size="small"
              trigger={
                <Field
                  focused
                  hovered={false}
                  focusStyle="legacy"
                  width="100%"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded
                  style={{ cursor: 'pointer' }}
                >
                  {triggerContent(true)}
                </Field>
              }
              open={isEditing}
              onOpenChange={(open) => {
                if (!open) onClose?.();
              }}
            />
          </div>
        ) : (
          <div
            style={{ width: '100%' }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEditRequest(e);
            }}
          >
            <Field
              appearance={isHovered ? 'default' : 'minimal'}
              hovered={isHovered}
              focused={false}
              focusStyle="legacy"
              width="100%"
              style={{ cursor: 'pointer' }}
            >
              {triggerContent(isHovered)}
            </Field>
          </div>
        )
      ) : !isEditing && !isHovered ? (
        displayValue
      ) : isEditing ? (
        <div
          ref={dropdownRef}
          data-dropdown-container
          style={{ position: 'relative', width: '100%' }}
        >
          <ActionMenu
            items={menuItems}
            selectedItemId={value}
            size="small"
            trigger={
              <Field
                focused
                hovered={false}
                focusStyle="legacy"
                width="100%"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded
                style={{ cursor: 'pointer' }}
              >
                {triggerContent(true)}
              </Field>
            }
            open={isEditing}
            onOpenChange={(open) => {
              if (!open) onClose?.();
            }}
          />
        </div>
      ) : (
        <div
          style={{ width: '100%' }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEditRequest(e);
          }}
        >
          <Field hovered focused={false} focusStyle="legacy" width="100%" style={{ cursor: 'pointer' }}>
            {triggerContent(true)}
          </Field>
        </div>
      )}
    </div>
  );
};
