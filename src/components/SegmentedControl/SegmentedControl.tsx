import React from 'react';
import { tokens } from '../../../tokens';

export interface SegmentedControlOption {
  icon: React.ReactNode;
  value: string;
  label?: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '36px',
        gap: '4px',
        padding: '2px 3px',
        border: `1px solid ${tokens.semantic.colors.border.subdued}`,
        borderRadius: `${tokens.usage.borderRadius.full}px`,
        overflow: 'hidden',
      }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange?.(option.value)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            height: '30px',
            minWidth: '36px',
            padding: '2px 10px',
            borderRadius: `${tokens.usage.borderRadius.full}px`,
            backgroundColor: value === option.value ? '#e9e9e9' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          aria-label={option.label}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '16px',
              height: '16px',
            }}
          >
            {option.icon}
          </span>
          {option.label && (
            <span style={{
              fontSize: 13,
              fontWeight: value === option.value ? 600 : 400,
              lineHeight: '16px',
              color: value === option.value ? '#191919' : '#6E6E71',
              whiteSpace: 'nowrap',
            }}>
              {option.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
