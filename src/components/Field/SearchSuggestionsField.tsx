import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { tokens } from '../../../tokens';
import { Field } from './Field';
import { Button } from '../Button';
import LinkSvg from '../../icons/16/link.svg';

const POPOVER_SHADOW =
  '0px 0px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 4px 12px 0px rgba(0, 0, 0, 0.12)';
const GAP_TRIGGER_MENU = 4;
const MAX_POPOVER_HEIGHT = 320;

/**
 * Option for search-suggestions style list (image + label + optional secondary + action).
 */
export interface SearchSuggestionsOption {
  id: string;
  label: string;
  /** Image URL or data URL for thumbnail */
  imageUrl?: string;
  /** Optional secondary line (e.g. size or subtitle) */
  secondaryLabel?: string;
}

export interface SearchSuggestionsFieldProps {
  options: SearchSuggestionsOption[];
  /** Selected option id (controlled); shown in trigger when set */
  value?: string;
  onSelect?: (id: string) => void;
  /** Header text above the list. If not set, shows "{count} results..." or "No results". */
  headerText?: string;
  /** Label for the action button on each row (e.g. "Add") */
  actionLabel?: string;
  /** Whether to show the link icon before the action button */
  showLinkIcon?: boolean;
  /** Placeholder when empty. Not shown by default; pass explicitly to show. */
  placeholder?: string;
  disabled?: boolean;
  /** Field size: small (36px), medium (40px), large (48px). Default small. */
  size?: 'small' | 'medium' | 'large';
  width?: number | string;
  /** Popover width; defaults to trigger width */
  popoverWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Field that opens a search-suggestions style popover: list with image thumbnails,
 * label (and optional secondary), optional link icon, and action button per item.
 * Use when the user selects from a list where each option has an image (e.g. products).
 */
export const SearchSuggestionsField: React.FC<SearchSuggestionsFieldProps> = ({
  options,
  value,
  onSelect,
  headerText,
  actionLabel = 'Add',
  showLinkIcon = true,
  placeholder = '',
  disabled = false,
  size = 'small',
  width,
  popoverWidth,
  className,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = value != null ? options.find((o) => o.id === value) : undefined;

  // Filter options by typed text (case-insensitive match on label)
  const filteredOptions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (q === '') return [];
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, inputValue]);

  const displayHeaderText =
    headerText != null && headerText !== ''
      ? headerText
      : filteredOptions.length === 0
        ? 'No results'
        : `${filteredOptions.length} result${filteredOptions.length === 1 ? '' : 's'}...`;

  // Sync input value when selected option changes from parent
  useEffect(() => {
    setInputValue(selectedOption?.label ?? '');
  }, [value, selectedOption?.label]);

  const setOpenState = useCallback((next: boolean) => {
    setOpen(next);
  }, []);

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    marginTop: GAP_TRIGGER_MENU,
    left: 0,
    right: 0,
    zIndex: 1001,
    width: popoverWidth ?? undefined,
    boxSizing: 'border-box',
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpenState(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpenState]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpenState(false);
    };
    const t = setTimeout(() => document.addEventListener('mousedown', handlePointerDown), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [open, setOpenState]);

  const handleAdd = (id: string) => {
    const opt = options.find((o) => o.id === id);
    if (opt) setInputValue(opt.label);
    onSelect?.(id);
    setOpenState(false);
  };

  const trigger = (
    <Field
      focused={inputFocused}
      hovered={hovered}
      disabled={disabled}
      size={size}
      focusStyle="default"
      width="100%"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={style}
    >
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpenState(true);
        }}
        onFocus={() => {
          if (!disabled) {
            setInputFocused(true);
            setOpenState(true);
          }
        }}
        onBlur={() => setInputFocused(false)}
        disabled={disabled}
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          height: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: tokens.usage.typography.label.small.default.fontFamily,
          fontSize: tokens.usage.typography.label.small.default.fontSize,
          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
          lineHeight: tokens.usage.typography.label.small.default.lineHeight,
          letterSpacing: tokens.usage.typography.label.small.default.letterSpacing,
          color: tokens.semantic.colors.text.neutral,
          padding: 0,
        }}
      />
    </Field>
  );

  return (
    <div style={{ position: 'relative', width: width ?? '100%', minWidth: 0 }}>
      <div ref={triggerRef} style={{ display: 'inline-block', width: '100%' }}>
        {trigger}
      </div>
      {open && filteredOptions.length > 0 && (
        <div
          ref={menuRef}
          role="listbox"
          aria-label={displayHeaderText}
          style={{
            backgroundColor: tokens.semantic.colors.surface.elevated ?? '#FBFBFB',
            borderRadius: 12,
            boxShadow: POPOVER_SHADOW,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: MAX_POPOVER_HEIGHT,
            boxSizing: 'border-box',
            ...menuStyle,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '12px 12px 4px 12px',
              fontFamily: tokens.usage.typography.body.small.strong.fontFamily,
              fontSize: tokens.usage.typography.body.small.strong.fontSize,
              fontWeight: tokens.usage.typography.body.small.strong.fontWeight,
              lineHeight: `${tokens.usage.typography.body.small.strong.lineHeight}px`,
              letterSpacing: `${tokens.usage.typography.body.small.strong.letterSpacing}px`,
              color: tokens.semantic.colors.text.subdued,
              flexShrink: 0,
            }}
          >
            {displayHeaderText}
          </div>
          <div
            style={{
              overflowY: 'auto',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {filteredOptions.map((opt) => (
              <div
                key={opt.id}
                role="button"
                tabIndex={0}
                onClick={() => handleAdd(opt.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAdd(opt.id);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 12px',
                  borderRadius: tokens.usage.borderRadius.small,
                  height: 'fit-content',
                  width: '100%',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                }}
              >
                {opt.imageUrl != null && (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: tokens.semantic.colors.surface.subdued,
                    }}
                  >
                    <img
                      src={opt.imageUrl}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: tokens.base.typography.fontFamily.brand,
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: tokens.semantic.colors.text.neutral,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: 'fit-content',
                      }}
                    >
                      {opt.label}
                    </span>
                    {showLinkIcon && (
                      <button
                        type="button"
                        aria-label="Link"
                        style={{
                          width: 24,
                          height: 24,
                          padding: 0,
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img src={LinkSvg} alt="" width={12} height={12} />
                      </button>
                    )}
                  </div>
                  {opt.secondaryLabel != null && opt.secondaryLabel !== '' && (
                    <span
                      style={{
                        fontFamily: tokens.base.typography.fontFamily.brand,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: tokens.semantic.colors.text.subdued,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {opt.secondaryLabel}
                    </span>
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="compact"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdd(opt.id);
                  }}
                >
                  {actionLabel}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
