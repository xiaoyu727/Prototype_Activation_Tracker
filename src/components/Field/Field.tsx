import React from 'react';
import { tokens } from '../../../tokens';

/**
 * Base Field wrapper: structure, layout, spacing, and states (Figma Prism Field).
 * Default variant only, no label. Colors use existing tokens only.
 */

const FIELD_PADDING_LEFT_RIGHT = 12;
const FIELD_BORDER_RADIUS = 12;
const BORDER_WIDTH_DEFAULT = tokens.component.input.borderWidth;
const BORDER_WIDTH_FOCUSED = tokens.component.input.borderWidthFocused;

export interface FieldProps {
  children: React.ReactNode;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is focused (keyboard or click) */
  focused?: boolean;
  /** Whether the field is hovered */
  hovered?: boolean;
  /**
   * When 'minimal', field has transparent border/background and no left padding so it blends with the cell.
   * Use for in-cell triggers that transition to full field appearance on hover (e.g. Category).
   */
  appearance?: 'default' | 'minimal';
  /** Size: small = 36px, medium = 40px, large = 48px. Default small for dropdowns/inputs. */
  size?: 'small' | 'medium' | 'large';
  /** Optional label above the field. When set, label uses label.small.default typography and 6px gap. */
  label?: React.ReactNode;
  /** Optional action (e.g. IconButton) rendered inside the field on the right. */
  action?: React.ReactNode;
  /**
   * Focus style: 'default' = constant border width, focus ring via box-shadow (no layout shift).
   * 'legacy' = thicker border on focus (previous behavior). Use legacy for existing pages that rely on it.
   */
  focusStyle?: 'default' | 'legacy';
  /** Optional width (e.g. '100%' or number) */
  width?: number | string;
  /** Forwarded to root div */
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  tabIndex?: number;
  role?: string;
  'aria-haspopup'?: 'listbox' | 'menu' | boolean;
  'aria-expanded'?: boolean;
  'aria-disabled'?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Field: React.FC<FieldProps> = ({
  children,
  disabled = false,
  focused = false,
  hovered = false,
  appearance = 'default',
  size = 'small',
  label,
  action,
  focusStyle = 'default',
  width,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  tabIndex,
  role,
  'aria-haspopup': ariaHaspopup,
  'aria-expanded': ariaExpanded,
  'aria-disabled': ariaDisabled,
  className,
  style,
}) => {
  const isInteractive = !disabled;
  const isMinimal = appearance === 'minimal';
  const useLegacyFocus = focusStyle === 'legacy';
  const borderWidth = useLegacyFocus && focused ? BORDER_WIDTH_FOCUSED : BORDER_WIDTH_DEFAULT;
  const borderColor = isMinimal
    ? 'transparent'
    : disabled
      ? tokens.semantic.colors.border.subdued
      : focused
        ? tokens.semantic.colors.border.focused
        : hovered && isInteractive
          ? tokens.semantic.colors.border.neutral
          : tokens.semantic.colors.border.subdued;
  const focusRingShadow =
    focused && !disabled && !isMinimal
      ? `inset 0 0 0 1px ${tokens.semantic.colors.border.focused}`
      : 'none';
  const backgroundColor = isMinimal
    ? 'transparent'
    : disabled
      ? tokens.semantic.colors.surface.subdued
      : tokens.semantic.colors.surface.raised;
  const paddingLeft = isMinimal ? 0 : FIELD_PADDING_LEFT_RIGHT;
  const fieldHeight = tokens.component.input[size].height;

  const labelStyle: React.CSSProperties = {
    color: 'var(--Text-Neutral, var(--color-color-text, #181818))',
    fontFamily: tokens.usage.typography.label.small.default.fontFamily,
    fontSize: 'var(--usage-type-label-small-default-font-size, 14px)',
    fontStyle: 'normal',
    fontWeight: tokens.usage.typography.label.small.default.fontWeight,
    lineHeight: 'var(--usage-type-label-small-default-line-height, 20px)',
    letterSpacing: 'var(--usage-type-label-small-default-letter-spacing, -0.01px)',
  };

  const fieldEl = (
    <div
      role={role}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      aria-disabled={ariaDisabled}
      tabIndex={tabIndex}
      onClick={isInteractive ? onClick : undefined}
      onFocus={isInteractive ? onFocus : undefined}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: action ? 8 : 0,
        minHeight: fieldHeight,
        height: fieldHeight,
        alignSelf: 'flex-start',
        flexShrink: 0,
        paddingLeft,
        paddingRight: FIELD_PADDING_LEFT_RIGHT,
        borderRadius: FIELD_BORDER_RADIUS,
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: focusRingShadow,
        backgroundColor,
        cursor: disabled ? 'not-allowed' : 'text',
        outline: 'none',
        transition: 'border-color 0.2s ease, background-color 0.2s ease, padding-left 0.2s ease, box-shadow 0.2s ease',
        opacity: disabled ? 0.7 : 1,
        width: width ?? 'auto',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
      {action}
    </div>
  );

  if (label != null && label !== '') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={labelStyle}>{label}</label>
        {fieldEl}
      </div>
    );
  }

  return fieldEl;
};
