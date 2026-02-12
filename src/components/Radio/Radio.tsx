import React from 'react';
import { tokens } from '../../../tokens';

export interface RadioProps {
  /**
   * Whether the radio is checked
   */
  checked?: boolean;
  /**
   * Callback when the radio is clicked
   */
  onChange?: (checked: boolean) => void;
  /**
   * Whether the radio is disabled
   */
  disabled?: boolean;
  /**
   * The radio button name (for grouping)
   */
  name?: string;
  /**
   * The value of this radio option
   */
  value?: string;
}

/**
 * Radio component for single selection from a set of options
 */
export const Radio: React.FC<RadioProps> = ({
  checked = false,
  onChange,
  disabled = false,
  name,
  value,
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={handleChange}
    >
      {/* Hidden native input for accessibility */}
      <input
        type="radio"
        name={name}
        value={value}
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
      
      {/* Visual radio button */}
      <div
        style={{
          position: 'relative',
          width: '18px',
          height: '18px',
          borderRadius: tokens.usage.borderRadius.full,
          border: `2px solid ${disabled ? tokens.semantic.colors.border.subdued : tokens.semantic.colors.text.neutral}`,
          backgroundColor: tokens.semantic.colors.surface.raised,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner circle when checked */}
        {checked && (
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: tokens.usage.borderRadius.full,
              backgroundColor: disabled ? tokens.semantic.colors.border.subdued : tokens.semantic.colors.text.neutral,
            }}
          />
        )}
      </div>
    </div>
  );
};
