import React, { ReactNode, CSSProperties } from 'react';
import { tokens } from '../../../tokens';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import CheckmarkSvg from '../../icons/Checkbox/checkmark.svg';

export interface PopoverListItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Label text to display
   */
  label: string;
  /**
   * Whether this item is selected (for checkboxes and radios)
   */
  selected?: boolean;
  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
  /**
   * Optional icon to display
   */
  icon?: ReactNode;
  /**
   * Callback when the item is clicked
   */
  onClick?: (id: string) => void;
}

/** Item row size – Medium is the default single-select size. */
export type PopoverSize = 'small' | 'medium' | 'large';

/** Option = Grouped: group label + items (checkboxes only). */
export interface PopoverGroup {
  label: string;
  items: PopoverListItem[];
}

export interface PopoverProps {
  /**
   * Template type for the popover
   */
  template?: 'single-select' | 'checkboxes' | 'radios';
  /**
   * List of items to display (flat list). Ignored when `groups` is provided.
   */
  items: PopoverListItem[];
  /**
   * Option = Grouped: sections with a header and items. Only for template="checkboxes".
   */
  groups?: PopoverGroup[];
  /**
   * Size of list items (row height). Medium = default for single selection with checkmark.
   */
  size?: PopoverSize;
  /**
   * Whether to show a "Select All" option (only for checkboxes)
   */
  showSelectAll?: boolean;
  /**
   * Callback when an item is selected/deselected
   */
  onItemChange?: (id: string, selected: boolean) => void;
  /**
   * Callback when "Select All" is toggled (only for checkboxes)
   */
  onSelectAll?: (selected: boolean) => void;
  /**
   * Whether all items are selected (for Select All checkbox state)
   */
  allSelected?: boolean;
  /**
   * Custom width for the popover
   */
  width?: number;
  /**
   * Custom styles
   */
  style?: CSSProperties;
  /**
   * Radio group name (for radio templates)
   */
  radioGroupName?: string;
  /**
   * Position of the popover relative to its anchor
   */
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}

/**
 * Popover component that displays a list of selectable items
 * Supports single-select, checkbox, and radio button templates
 */
const SIZE_ROW_HEIGHT: Record<PopoverSize, number> = {
  small: 32,
  medium: 40,
  large: 48,
};

export const Popover: React.FC<PopoverProps> = ({
  template = 'single-select',
  items,
  groups,
  size = 'medium',
  showSelectAll = false,
  onItemChange,
  onSelectAll,
  allSelected = false,
  width = 240, // Default 240px for all templates
  style,
  radioGroupName = 'popover-radio-group',
  position,
}) => {
  const isSingleSelect = template === 'single-select';
  const isCheckboxes = template === 'checkboxes';
  const isRadios = template === 'radios';
  const isGrouped = isCheckboxes && groups != null && groups.length > 0;
  const rowMinHeight = SIZE_ROW_HEIGHT[size];

  // Force 240px width for consistency across all templates
  const popoverWidth = 240;

  const handleItemClick = (item: PopoverListItem) => {
    if (item.disabled) return;

    if (isSingleSelect) {
      item.onClick?.(item.id);
    } else if (isCheckboxes || isRadios) {
      onItemChange?.(item.id, !item.selected);
    }
  };

  const handleSelectAllClick = () => {
    if (onSelectAll) {
      onSelectAll(!allSelected);
    }
  };

  const renderControl = (item: PopoverListItem) => {
    if (isCheckboxes) {
      return (
        <Checkbox
          checked={item.selected || false}
          onChange={() => onItemChange?.(item.id, !item.selected)}
        />
      );
    }

    if (isRadios) {
      return (
        <Radio
          checked={item.selected || false}
          onChange={() => onItemChange?.(item.id, true)}
          name={radioGroupName}
          value={item.id}
        />
      );
    }

    if (isSingleSelect) {
      return item.selected ? (
        <img
          src={CheckmarkSvg}
          alt=""
          aria-hidden
          style={{ width: 16, height: 16, flexShrink: 0 }}
        />
      ) : null;
    }

    return null;
  };

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: tokens.semantic.colors.surface.raised,
        borderRadius: `${tokens.usage.borderRadius.medium}px`,
        boxShadow: '0px 4px 16px 0px rgba(25, 25, 25, 0.2)',
        width: `${popoverWidth}px`, // Always 240px
        maxHeight: '450px', // Maximum height
        overflowY: 'auto', // Scroll if content exceeds maxHeight
        paddingTop: `${tokens.usage.spacing.xSmall}px`,
        paddingBottom: `${tokens.usage.spacing.xSmall}px`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        ...position,
        ...style,
      }}
    >
      {/* Select All option (only for checkboxes) */}
      {isCheckboxes && showSelectAll && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.usage.spacing.xSmall}px`,
            minHeight: `${rowMinHeight}px`,
            paddingLeft: `${tokens.usage.spacing.medium}px`,
            paddingRight: `${tokens.usage.spacing.medium}px`,
            paddingTop: `${tokens.usage.spacing.small}px`,
            paddingBottom: `${tokens.usage.spacing.small}px`,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            transition: 'background-color 0.15s ease',
          }}
          onClick={handleSelectAllClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = tokens.semantic.colors.surface.subdued;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Checkbox
            checked={allSelected}
            onChange={handleSelectAllClick}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              borderBottom: `1px solid ${tokens.semantic.colors.border.neutral}`,
              minHeight: `${rowMinHeight}px`,
              minWidth: 0,
            }}
          >
            <span
              style={{
                flex: 1,
                fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                color: tokens.semantic.colors.text.neutral,
                letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
              }}
            >
              Select All
            </span>
          </div>
        </div>
      )}

      {/* List items: flat or grouped */}
      {isGrouped
        ? groups!.map((group) => (
            <React.Fragment key={group.label}>
              {/* Group header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: `${rowMinHeight}px`,
                  paddingLeft: `${tokens.usage.spacing.medium}px`,
                  paddingRight: `${tokens.usage.spacing.medium}px`,
                  paddingTop: `${tokens.usage.spacing.xSmall}px`,
                  paddingBottom: 2,
                  fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
                  fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                  fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
                  lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                  color: tokens.semantic.colors.text.neutral,
                  letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                }}
              >
                {group.label}
              </div>
              {group.items.map((item) => renderItemRow(item))}
            </React.Fragment>
          ))
        : items.map((item) => renderItemRow(item))}
    </div>
  );

  function renderItemRow(item: PopoverListItem) {
    return (
      <div
        key={item.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${tokens.usage.spacing.xSmall}px`,
          minHeight: `${rowMinHeight}px`,
          paddingLeft: `${tokens.usage.spacing.medium}px`,
          paddingRight: `${tokens.usage.spacing.medium}px`,
          paddingTop: `${tokens.usage.spacing.small}px`,
          paddingBottom: `${tokens.usage.spacing.small}px`,
          cursor: item.disabled ? 'not-allowed' : 'pointer',
          backgroundColor: 'transparent',
          opacity: item.disabled ? 0.5 : 1,
          transition: 'background-color 0.15s ease',
        }}
        onClick={() => handleItemClick(item)}
        onMouseEnter={(e) => {
          if (!item.disabled) {
            e.currentTarget.style.backgroundColor = tokens.semantic.colors.surface.subdued;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {(isSingleSelect || isCheckboxes || isRadios) && renderControl(item)}

        <div
          style={{
            flex: 1,
            display: 'flex',
            gap: `${tokens.usage.spacing.xSmall}px`,
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          {item.icon && (
            <div style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</div>
          )}
          <span
            style={{
              flex: 1,
              fontFamily: tokens.usage.typography.label.small.default.fontFamily,
              fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
              fontWeight: tokens.usage.typography.label.small.default.fontWeight,
              lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
              color: tokens.semantic.colors.text.neutral,
              letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.label}
          </span>
        </div>
      </div>
    );
  }
};
