import React from 'react';
import { tokens } from '../../../tokens';
import CheckmarkSvg from '../../icons/16/checkmark.svg';

/**
 * Single menu item for ActionMenu. Matches Figma Menu item states (3008-7617).
 *
 * States (background + text only; no input-style focus border):
 * - Default: transparent background, neutral text
 * - Hover: surfaceHovered (#F6F6F6)
 * - Focused (keyboard): same as hover – surfaceHovered, no blue outline
 * - Pressed (active): surfacePressed (#E4E4E4)
 * - Disabled: transparent background, text.disabled color
 *
 * Single-selection variant (Figma 3008-7523): pass selected=true to show checkmark on the left (before label). Size=Medium: 40px row height.
 */

const ITEM_PADDING_V = 4; // space-narrow-small
const ITEM_PADDING_H = 6; // space-narrow-medium
const ITEM_GAP = 4;
/** Left padding when no icon/checkmark (align label with selected items: 6 + 16 + 4 = 26) */
const ITEM_PADDING_LEFT_NO_ICON = 26;

const SIZE_MIN_HEIGHT = { small: 36, medium: 40 } as const;
export type MenuItemSize = keyof typeof SIZE_MIN_HEIGHT;

export interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  /** Single-selection (Figma 3008-7523): show checkmark on the left when true */
  selected?: boolean;
  /** Row height: small 36px, medium 40px. Default medium for single-selection menus. */
  size?: MenuItemSize;
  disabled?: boolean;
  destructive?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
  isPressed?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  tabIndex?: number;
  'aria-disabled'?: boolean;
  children?: never;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  selected = false,
  size = 'medium',
  disabled = false,
  destructive = false,
  isHovered = false,
  isFocused = false,
  isPressed = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onMouseDown,
  onMouseUp,
  buttonRef,
  tabIndex = -1,
  'aria-disabled': ariaDisabled,
}) => {
  const minHeight = SIZE_MIN_HEIGHT[size];
  // Figma 3008-7617: no blue border; focus = same visual as hover (background only)
  const isInteractive = isHovered || isFocused;
  const bg = disabled
    ? 'transparent'
    : isPressed
      ? tokens.semantic.colors.interaction.surfacePressed
      : destructive && isInteractive
        ? tokens.semantic.colors.surface.negative
        : isInteractive
          ? tokens.semantic.colors.interaction.surfaceHovered
          : 'transparent';

  const textColor = disabled
    ? tokens.semantic.colors.text.disabled
    : destructive
      ? tokens.semantic.colors.text.negative
      : tokens.semantic.colors.text.neutral;

  const typography = tokens.usage.typography.label.small.default;
  const hasLeftSlot = icon != null || selected;
  const paddingLeft = hasLeftSlot ? ITEM_PADDING_H : ITEM_PADDING_LEFT_NO_ICON;

  return (
    <button
      ref={buttonRef}
      type="button"
      role="menuitem"
      aria-disabled={ariaDisabled ?? disabled}
      tabIndex={tabIndex}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: ITEM_GAP,
        minHeight: minHeight,
        padding: `${ITEM_PADDING_V}px ${ITEM_PADDING_H}px`,
        paddingLeft,
        alignSelf: 'stretch',
        flex: '0 0 auto',
        backgroundColor: bg,
        borderRadius: tokens.usage.borderRadius.medium,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.15s ease',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        outline: 'none',
      }}
    >
      {/* Left slot: icon (action items) or checkmark (single-selection, Figma 3008-7523) */}
      {icon != null ? (
        typeof icon === 'string' ? (
          <img
            src={icon}
            alt=""
            style={{
              width: 16,
              height: 16,
              flexShrink: 0,
              opacity: disabled ? 0.4 : 1,
            }}
          />
        ) : (
          <span
            style={{
              width: 16,
              height: 16,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: disabled ? tokens.semantic.colors.text.disabled : undefined,
            }}
          >
            {icon}
          </span>
        )
      ) : selected ? (
        <img
          src={CheckmarkSvg}
          alt=""
          aria-hidden
          style={{ width: 16, height: 16, flexShrink: 0 }}
        />
      ) : null}
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: typography.fontFamily,
          fontSize: typography.fontSize,
          fontWeight: typography.fontWeight,
          lineHeight: `${typography.lineHeight}px`,
          letterSpacing: `${typography.letterSpacing}px`,
          color: textColor,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
};
