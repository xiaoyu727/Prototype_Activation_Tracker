import React, { useState } from 'react';
import { tokens } from '../../../tokens';
import { ActionMenu, type ActionMenuItem } from '../ActionMenu/ActionMenu';
import { FilterChip } from '../FilterChip';
import { Field } from './Field';

const CHEVRON_DOWN_SRC = new URL(
  '../../icons/16/chevron-down.svg',
  import.meta.url
).href;

/**
 * Dropdown field: Field styling + dropdown arrow; click or focus opens Action Menu.
 * Uses existing ActionMenu (position relative to field, close on outside click / Escape).
 * Variant 'default': single selection. Variant 'chips': multiple selection shown as removable chips.
 */

export interface DropdownFieldOption {
  id: string;
  label: string;
}

export interface DropdownFieldProps {
  options: DropdownFieldOption[];
  /** Single selection: selected option id. Ignored when variant is 'chips'. */
  value?: string;
  /** Chips variant: selected option ids. */
  valueChips?: string[];
  /** Called when selection changes (single) or when adding from menu (chips). */
  onSelect?: (id: string) => void;
  /** Chips variant: called when user removes a chip (X). */
  onRemoveChip?: (id: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Size: small = 36px, medium = 40px, large = 48px. Default small. */
  size?: 'small' | 'medium' | 'large';
  /** 'default' = single value; 'chips' = multiple values as removable chips. */
  variant?: 'default' | 'chips';
  /** Chips variant: optional image URL per chip id (enables chip with image style). */
  getChipImageUrl?: (id: string) => string | undefined;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  options,
  value,
  valueChips = [],
  onSelect,
  onRemoveChip,
  placeholder = '',
  disabled = false,
  size = 'small',
  variant = 'default',
  getChipImageUrl,
  width,
  className,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isChips = variant === 'chips';
  const selectedOption = !isChips && value != null ? options.find((o) => o.id === value) : undefined;
  const selectedLabel = selectedOption?.label ?? placeholder;

  const availableOptions = isChips ? options.filter((o) => !valueChips.includes(o.id)) : options;
  const menuItems: ActionMenuItem[] = availableOptions.map((opt) => ({
    id: opt.id,
    label: opt.label,
    onClick: () => {
      onSelect?.(opt.id);
      setOpen(false);
    },
  }));

  const triggerContent = isChips ? (
    <>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
        }}
      >
        {valueChips.length === 0 ? (
          <span
            style={{
              fontFamily: tokens.usage.typography.label.small.default.fontFamily,
              fontSize: tokens.usage.typography.label.small.default.fontSize,
              fontWeight: tokens.usage.typography.label.small.default.fontWeight,
              lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
              letterSpacing: tokens.usage.typography.label.small.default.letterSpacing,
              color: tokens.semantic.colors.text.subdued,
            }}
          >
            {placeholder}
          </span>
        ) : (
          valueChips.map((id) => {
            const opt = options.find((o) => o.id === id);
            const label = opt?.label ?? id;
            return (
              <span key={id} onClick={(e) => e.stopPropagation()} style={{ display: 'inline-flex' }}>
                <FilterChip
                  label={label}
                  hasSelections
                  onRemove={() => onRemoveChip?.(id)}
                  size="small"
                  appearance="filled"
                  imageUrl={getChipImageUrl?.(id)}
                />
              </span>
            );
          })
        )}
      </div>
      <img
        src={CHEVRON_DOWN_SRC}
        alt=""
        width={16}
        height={16}
        style={{
          flexShrink: 0,
          marginLeft: 8,
          opacity: disabled ? 0.5 : 1,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}
      />
    </>
  ) : (
    <>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: tokens.usage.typography.label.small.default.fontFamily,
          fontSize: tokens.usage.typography.label.small.default.fontSize,
          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
          letterSpacing: tokens.usage.typography.label.small.default.letterSpacing,
          color: selectedOption
            ? tokens.semantic.colors.text.neutral
            : tokens.semantic.colors.text.subdued,
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {selectedLabel}
      </span>
      <img
        src={CHEVRON_DOWN_SRC}
        alt=""
        width={16}
        height={16}
        style={{
          flexShrink: 0,
          marginLeft: 8,
          opacity: disabled ? 0.5 : 1,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}
      />
    </>
  );

  const trigger = (
    <Field
      focused={open}
      hovered={hovered}
      disabled={disabled}
      focusStyle="default"
      size={size}
      width="100%"
      tabIndex={disabled ? undefined : 0}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-disabled={disabled}
      onFocus={() => !disabled && setOpen(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={style}
    >
      {triggerContent}
    </Field>
  );

  return (
    <div style={{ width: width ?? '100%', minWidth: 0 }}>
      <ActionMenu
        items={menuItems}
        selectedItemId={isChips ? undefined : value}
        size="small"
        trigger={trigger}
        open={open}
        onOpenChange={setOpen}
        triggerFullWidth
      />
    </div>
  );
};
