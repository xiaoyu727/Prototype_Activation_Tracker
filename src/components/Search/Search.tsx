import React, { useState } from 'react';
import { tokens } from '../../../tokens';

export interface SearchProps {
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Current search value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Full width
   */
  fullWidth?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      placeholder = 'Search...',
      value,
      onChange,
      disabled = false,
      fullWidth = false,
      className,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setHasValue(!!newValue);
      onChange?.(newValue);
    };

    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: fullWidth ? '100%' : 'auto',
        }}
        className={className}
      >
        {/* Search Icon – align with page (12px from left) */}
        <div
          style={{
            position: 'absolute',
            left: `${tokens.usage.spacing.small}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
            color: tokens.usage.iconColors.subdued,
            pointerEvents: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 14L10.3536 10.3536M11.5 7C11.5 9.48528 9.48528 11.5 7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Input – match page search: rounded corners, white background, right padding */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: fullWidth ? '100%' : '312px',
            height: '36px',
            paddingTop: '6px',
            paddingBottom: '6px',
            paddingLeft: '36px',
            paddingRight: `${tokens.usage.spacing.small}px`,
            borderRadius: '9999px',
            border: isFocused
              ? `${tokens.component.input.borderWidthFocused}px solid ${tokens.semantic.colors.border.focused}`
              : hasValue
                ? `${tokens.component.input.borderWidth}px solid ${tokens.semantic.colors.border.subdued}`
                : `1px solid ${tokens.semantic.colors.border.neutral}`,
            backgroundColor: '#FFFFFF',
            color: tokens.semantic.colors.text.neutral,
            fontFamily: tokens.usage.typography.label.small.default.fontFamily,
            fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
            fontWeight: tokens.usage.typography.label.small.default.fontWeight,
            lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
            letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
            outline: 'none',
            transition: 'all 0.2s ease',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.5 : 1,
            boxSizing: 'border-box',
            boxShadow: isFocused ? `inset 0 0 0 1px ${tokens.semantic.colors.border.focused}` : 'none',
          }}
        />
      </div>
    );
  }
);

Search.displayName = 'Search';
