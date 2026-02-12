import React, { useState, useRef, useEffect, useCallback } from 'react';
import { tokens } from '../../../tokens';
import { MenuItem } from './MenuItem';

/**
 * Action Menu – reusable dropdown/context menu (Figma: Action menu 3008:7523).
 * Item states follow Figma 3008-7617: hover/focus/pressed/disabled via background + text only (no input-style focus border).
 *
 * Design tokens used:
 * - surface.elevated: menu background (#FBFBFB)
 * - interaction.surfaceHovered / surfacePressed: item hover, focus, pressed
 * - text.neutral / text.negative / text.disabled: label colors
 * - usage.borderRadius.medium: menu and item corners (8px)
 * - shadow: Figma shadow/medium (3-layer drop shadow)
 */

export interface ActionMenuItem {
  id: string;
  label: string;
  /** Icon: ReactNode (e.g. SVG component) or string URL for <img src> */
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  /** Destructive action (red label, distinct hover) */
  destructive?: boolean;
}

/** Item row size: Medium = 40px, Small = 36px. */
export type ActionMenuSize = 'small' | 'medium';

export interface ActionMenuProps {
  items: ActionMenuItem[];
  /**
   * Single-selection: id of the selected item. When set, that item shows a checkmark and size is used for row height.
   */
  selectedItemId?: string;
  /**
   * Row height: medium (40px) or small (36px). Default small for dropdowns.
   */
  size?: ActionMenuSize;
  /**
   * Optional trigger element. When provided, menu opens on trigger click and
   * positions relative to trigger (flips near viewport edges).
   */
  trigger?: React.ReactNode;
  /**
   * Controlled open state. When trigger is used without open/onOpenChange,
   * component is uncontrolled (internal state).
   */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Position when used without trigger (e.g. legacy: parent sets position).
   */
  position?: { top?: number; left?: number; right?: number; bottom?: number };
  /**
   * When used with trigger: fixed width of the menu (e.g. 167).
   */
  menuWidth?: number;
  /**
   * When used with trigger: align menu to 'left' (default) or 'right' edge of the trigger.
   */
  alignMenu?: 'left' | 'right';
  /**
   * When true, the trigger container fills its parent (block, 100% width). Use for form dropdowns.
   */
  triggerFullWidth?: boolean;
  onClose?: () => void;
}

const MENU_SHADOW =
  '0px 0px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 4px 12px 0px rgba(0, 0, 0, 0.12)';
const MENU_PADDING = 6;
const GAP_TRIGGER_MENU = 4;

export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  selectedItemId,
  size: sizeProp,
  trigger,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  position: positionProp,
  menuWidth: menuWidthProp,
  alignMenu = 'left',
  triggerFullWidth = false,
  onClose,
}) => {
  const size = sizeProp ?? 'small';
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
      if (!value) onClose?.();
    },
    [isControlled, onOpenChange, onClose]
  );

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  /** -1 = no item has keyboard focus (all items default state); 0+ = index into enabledItems */
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledItems = items.filter((i) => !i.disabled);
  const enabledIndexToId = enabledItems.map((i) => i.id);

  const isMenuVisible = trigger != null ? open : true;

  // Position menu relative to trigger (with flip); when no trigger, parent passes positionProp.
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!trigger || !isMenuVisible || !triggerRef.current) return;
    const triggerEl = triggerRef.current;
    const rect = triggerEl.getBoundingClientRect();
    const w = menuWidthProp ?? rect.width;
    setMenuStyle({
      position: 'absolute',
      top: '100%',
      marginTop: GAP_TRIGGER_MENU,
      left: alignMenu === 'right' ? undefined : 0,
      right: alignMenu === 'right' ? 0 : undefined,
      width: w,
      zIndex: 1001,
      boxSizing: 'border-box',
    });
  }, [isMenuVisible, trigger, menuWidthProp, alignMenu]);

  // Close on Escape
  useEffect(() => {
    if (!isMenuVisible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuVisible, setOpen]);

  // Keyboard: Arrow keys, Enter (no initial focus – all items start in default state)
  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((i) => (i < 0 ? 0 : (i + 1) % enabledItems.length));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((i) =>
        i < 0 ? enabledItems.length - 1 : (i - 1 + enabledItems.length) % enabledItems.length
      );
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIndex < 0) return;
      const id = enabledIndexToId[focusedIndex];
      const item = items.find((x) => x.id === id);
      if (item && !item.disabled) {
        item.onClick?.();
        setOpen(false);
      }
      return;
    }
  };

  // On open: no item focused (all items default state). On close: clear pressed.
  useEffect(() => {
    if (!isMenuVisible) {
      setPressedId(null);
      setFocusedIndex(-1);
      return;
    }
    setFocusedIndex(-1);
  }, [isMenuVisible]);

  // When user has arrowed to an item, move DOM focus to it
  useEffect(() => {
    if (focusedIndex >= 0) itemRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  // Click outside to close
  useEffect(() => {
    if (!isMenuVisible) return;
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    const t = setTimeout(() => document.addEventListener('mousedown', handlePointerDown), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isMenuVisible, setOpen]);

  const handleItemClick = (item: ActionMenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
    setOpen(false);
  };

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  const menuContent = (
    <div
      id="action-menu-list"
      ref={menuRef}
      role="menu"
      aria-orientation="vertical"
      onKeyDown={onMenuKeyDown}
      style={{
        position: positionProp && !trigger ? 'absolute' : 'fixed',
        backgroundColor: tokens.semantic.colors.surface.elevated ?? '#FBFBFB',
        borderRadius: tokens.usage.borderRadius.medium,
        boxShadow: MENU_SHADOW,
        padding: MENU_PADDING,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        minWidth: trigger ? (menuWidthProp != null ? menuWidthProp : undefined) : 160,
        boxSizing: 'border-box',
        ...(trigger ? menuStyle : { position: 'absolute', ...positionProp, zIndex: 1001 }),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item) => {
        const isEnabled = !item.disabled;
        const enabledIdx = isEnabled ? enabledItems.findIndex((x) => x.id === item.id) : -1;
        const isFocused =
          focusedIndex >= 0 && isEnabled && enabledIndexToId[focusedIndex] === item.id;
        const isHovered = hoveredId === item.id && isEnabled;
        const isPressed = pressedId === item.id && isEnabled;

        return (
          <MenuItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            selected={selectedItemId != null && item.id === selectedItemId}
            size={size}
            disabled={item.disabled}
            destructive={item.destructive}
            isHovered={isHovered}
            isFocused={isFocused}
            isPressed={isPressed}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => {
              setHoveredId(null);
              setPressedId(null);
            }}
            onFocus={() => isEnabled && setFocusedIndex(enabledIdx)}
            onMouseDown={() => isEnabled && setPressedId(item.id)}
            onMouseUp={() => setPressedId(null)}
            buttonRef={(el) => {
              if (isEnabled) itemRefs.current[enabledIdx] = el;
            }}
            tabIndex={-1}
            aria-disabled={item.disabled}
          />
        );
      })}
    </div>
  );

  if (trigger != null) {
    const triggerContainerStyle: React.CSSProperties = triggerFullWidth
      ? { position: 'relative', display: 'block', width: '100%', minWidth: 0 }
      : { position: 'relative', display: 'inline-block' };
    const triggerWrapperStyle: React.CSSProperties = triggerFullWidth
      ? { cursor: 'pointer', display: 'block', width: '100%', minWidth: 0 }
      : { cursor: 'pointer', display: 'inline-block' };
    return (
      <div style={triggerContainerStyle}>
        <div
          ref={triggerRef}
          role="button"
          aria-haspopup="menu"
          aria-expanded={isMenuVisible}
          aria-controls={isMenuVisible ? 'action-menu-list' : undefined}
          onClick={handleTriggerClick}
          style={triggerWrapperStyle}
        >
          {trigger}
        </div>
        {isMenuVisible && menuContent}
      </div>
    );
  }

  // Without trigger, parent controls visibility by mounting/unmounting; always show when mounted.
  return isMenuVisible ? menuContent : null;
};
