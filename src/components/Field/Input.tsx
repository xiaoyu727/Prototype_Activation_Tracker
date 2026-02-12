import React from 'react';
import { tokens } from '../../../tokens';
import { Field } from './Field';

/**
 * Input field (default variant, no label). Uses Field for structure and states.
 * Structure/layout/spacing from Figma; colors from existing tokens.
 */

export interface InputProps {
  value?: string;
  /** Placeholder when empty. Not shown by default; pass explicitly to show. */
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  /** Size: small = 36px, medium = 40px, large = 48px. Default small. */
  size?: 'small' | 'medium' | 'large';
  /** Optional label above the input (uses label.small.default typography, 6px gap). */
  label?: React.ReactNode;
  /** Optional action (e.g. IconButton) rendered inside the input on the right. */
  action?: React.ReactNode;
  /**
   * Focus style: 'default' = no layout shift on focus (ring via box-shadow). 'legacy' = thicker border on focus.
   */
  focusStyle?: 'default' | 'legacy';
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
  /** Forward ref to the native input */
  inputRef?: React.Ref<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      placeholder = '',
      onChange,
      onFocus,
      onBlur,
      disabled = false,
      size,
      label,
      action,
      focusStyle = 'default',
      width,
      className,
      style,
      inputRef,
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const setRefs = React.useCallback(
      (el: HTMLInputElement | null) => {
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
        if (typeof inputRef === 'function') inputRef(el);
        else if (inputRef) inputRef.current = el;
      },
      [ref, inputRef]
    );

    return (
      <Field
        disabled={disabled}
        focused={focused}
        hovered={hovered}
        size={size}
        label={label}
        action={action}
        focusStyle={focusStyle}
        width={width}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={className}
        style={style}
      >
        <input
          ref={setRefs}
          type="text"
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          disabled={disabled}
          readOnly={false}
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
  }
);

Input.displayName = 'Input';
