import React, { useState, useEffect, useCallback } from 'react';
import { tokens } from '../../../tokens';
import confirmIcon from '../../icons/Input/confirm.svg';
import cancelIcon from '../../icons/Input/cancel.svg';

/** Typography variant for display and input (matches usage tokens) */
export type EditableCellVariant = 'label.small.strong' | 'label.small.default';

export interface EditableCellProps {
  /** Current value (displayed when not editing; used as original when comparing for confirm/discard visibility) */
  value: string;
  /** Whether the cell is in edit mode */
  isEditing: boolean;
  /** Called when user clicks the display to start editing */
  onEditRequest: (e: React.MouseEvent) => void;
  /** Called when user confirms (check icon or Enter). Passes the current draft value. */
  onSave: (value: string) => void;
  /** Called when user cancels (discard icon, blur, or Escape) */
  onCancel: () => void;
  /** Optional prefix shown before the input in edit mode (e.g. "$" for price) */
  prefix?: React.ReactNode;
  /** Transform raw input (e.g. digits-only for price). Default: identity. */
  parseInput?: (raw: string) => string;
  /** Compare draft to original to show confirm/discard. Default: draft !== value. Use (d, o) => d.trim() !== o.trim() for trim-aware. */
  hasChange?: (draft: string, original: string) => boolean;
  /** Typography: label.small.strong (e.g. name) or label.small.default (e.g. price) */
  variant?: EditableCellVariant;
  /** Optional placeholder when value is empty in edit mode */
  placeholder?: string;
  /** Optional: format value for display mode only (e.g. (v) => `$ ${v}` for price) */
  formatDisplay?: (value: string) => React.ReactNode;
  /** Optional class name for the root */
  className?: string;
  /** Stop propagation on click so parent row/cell doesn't handle it */
  stopPropagation?: boolean;
}

/**
 * In-cell editable text: display mode (click to edit) and edit mode (input + confirm/discard icons).
 * Reusable for table cells or any inline edit with save/cancel (e.g. name, price).
 * Parent owns isEditing and value; onSave(value) and onCancel() drive state updates.
 */
export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isEditing,
  onEditRequest,
  onSave,
  onCancel,
  prefix,
  parseInput = (s) => s,
  hasChange = (draft, original) => draft !== original,
  variant = 'label.small.default',
  placeholder,
  formatDisplay,
  className,
  stopPropagation = true,
}) => {
  const typo = variant === 'label.small.strong'
    ? tokens.usage.typography.label.small.strong
    : tokens.usage.typography.label.small.default;

  const [draft, setDraft] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showHoverStyle = isHovered || isFocused;

  // When entering edit mode, sync draft from value; when value changes externally, keep draft in sync if not editing
  useEffect(() => {
    if (isEditing) {
      setDraft(value);
    } else {
      setDraft(value);
    }
  }, [value, isEditing]);

  // After save or discard, return to default display state (no hover/focus style)
  useEffect(() => {
    if (!isEditing) {
      setIsHovered(false);
      setIsFocused(false);
    }
  }, [isEditing]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSave(draft);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    },
    [draft, onSave, onCancel]
  );

  const handleConfirm = useCallback(
    (e: React.MouseEvent) => {
      if (stopPropagation) e.stopPropagation();
      e.preventDefault();
      onSave(draft);
    },
    [draft, onSave, stopPropagation]
  );

  const handleDiscard = useCallback(
    (e: React.MouseEvent) => {
      if (stopPropagation) e.stopPropagation();
      e.preventDefault();
      onCancel();
    },
    [onCancel, stopPropagation]
  );

  const changed = hasChange(draft, value);

  if (!isEditing) {
    return (
      <span
        role="textbox"
        tabIndex={0}
        className={className}
        onClick={(e) => {
          if (stopPropagation) e.stopPropagation();
          onEditRequest(e);
        }}
        onMouseDown={(e) => stopPropagation && e.stopPropagation()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          height: 36,
          minHeight: 36,
          boxSizing: 'border-box',
          flex: '1',
          minWidth: 0,
          fontFamily: typo.fontFamily,
          fontSize: `${typo.fontSize}px`,
          fontWeight: typo.fontWeight,
          lineHeight: `${typo.lineHeight}px`,
          color: tokens.semantic.colors.text.neutral,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          cursor: 'text',
          padding: showHoverStyle ? '8px 8px 8px 8px' : '8px 24px 8px 0',
          borderRadius: '8px',
          border: `1px solid ${showHoverStyle ? tokens.semantic.colors.border.subdued : 'transparent'}`,
          backgroundColor: showHoverStyle ? tokens.semantic.colors.surface.raised : 'transparent',
          transition: 'border-color 0.2s ease, background-color 0.2s ease, padding 0.2s ease',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {formatDisplay ? formatDisplay(value) : value}
      </span>
    );
  }

  const inputStyles: React.CSSProperties = {
    flex: '1',
    minWidth: 0,
    width: '100%',
    fontFamily: typo.fontFamily,
    fontSize: `${typo.fontSize}px`,
    fontWeight: typo.fontWeight,
    lineHeight: variant === 'label.small.strong' ? `${typo.lineHeight}px` : '1.4',
    color: tokens.semantic.colors.text.neutral,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: 0,
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        height: 36,
        minHeight: 36,
        boxSizing: 'border-box',
        padding: '6px 7px 6px 8px',
        backgroundColor: tokens.semantic.colors.surface.raised,
        border: `2px solid ${tokens.semantic.colors.border.focused}`,
        boxShadow: `inset 0 0 0 1px ${tokens.semantic.colors.border.focused}`,
        borderRadius: '8px',
        flex: '1',
        minWidth: 0,
      }}
      onClick={(e) => stopPropagation && e.stopPropagation()}
    >
      <div style={{ display: 'flex', alignItems: 'center', flex: '1', minWidth: '0', overflow: 'hidden' }}>
        {prefix != null && (
          <span
            style={{
              fontFamily: typo.fontFamily,
              fontSize: `${typo.fontSize}px`,
              fontWeight: typo.fontWeight,
              lineHeight: '1.4',
              color: tokens.semantic.colors.text.neutral,
              marginRight: '4px',
              flexShrink: 0,
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(parseInput(e.target.value))}
          onBlur={onCancel}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder={placeholder}
          style={inputStyles}
          aria-label="Edit value"
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          flexShrink: 0,
          opacity: changed ? 1 : 0,
          pointerEvents: changed ? 'auto' : 'none',
        }}
      >
        <button
          type="button"
          aria-label="Save"
          style={{
            width: 20,
            height: 20,
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseDown={handleConfirm}
        >
          <img src={confirmIcon} alt="" width={16} height={16} />
        </button>
        <button
          type="button"
          aria-label="Discard"
          style={{
            width: 20,
            height: 20,
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseDown={handleDiscard}
        >
          <img src={cancelIcon} alt="" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};
