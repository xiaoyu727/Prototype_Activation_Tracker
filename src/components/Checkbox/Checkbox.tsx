import React from 'react';
import { tokens } from '../../../tokens';
import CheckmarkSvg from '../../icons/Checkbox/checkmark.svg';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onChange, disabled = false, indeterminate = false, className }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onChange) {
        onChange(e.target.checked);
      }
    };

    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '24px',
          height: '24px',
          borderRadius: `${tokens.usage.borderRadius.medium}px`,
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: disabled ? 'not-allowed' : 'pointer',
            zIndex: 1,
            margin: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '18px',
            height: '18px',
            borderRadius: `${tokens.component.checkbox.cornerRadius}px`,
            border: `2px solid ${
              checked || indeterminate
                ? tokens.semantic.colors.text.neutral
                : tokens.semantic.colors.text.subdued
            }`,
            backgroundColor: checked || indeterminate ? tokens.semantic.colors.text.neutral : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            pointerEvents: 'none',
          }}
        >
          {checked && !indeterminate && (
            <img src={CheckmarkSvg} alt="Checked" style={{ width: '8.5px', height: '6.5px' }} />
          )}
          {indeterminate && (
            <div
              style={{
                width: '10px',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '1px',
              }}
            />
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
