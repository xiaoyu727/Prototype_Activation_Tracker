import React from 'react';
import { tokens } from '../../../tokens';

export interface IconButtonProps {
  /**
   * Icon element to display
   */
  icon: React.ReactNode;
  /**
   * Aria label for accessibility
   */
  'aria-label': string;
  /**
   * Button variant. Secondary = surface background; tertiary = white with border; flat = no background.
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'flat' | 'ghost';
  /**
   * Button size
   */
  size?: 'xSmall' | 'small' | 'medium';
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Additional className
   */
  className?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      'aria-label': ariaLabel,
      variant = 'flat',
      size = 'small',
      disabled = false,
      onClick,
      type = 'button',
      className,
    },
    ref
  ) => {
    const getSizeStyles = () => {
      switch (size) {
        case 'xSmall':
          return {
            width: `${tokens.component.iconButton.xSmall.size}px`,
            height: `${tokens.component.iconButton.xSmall.size}px`,
            borderRadius: `${tokens.component.iconButton.xSmall.cornerRadius}px`,
          };
        case 'small':
          return {
            width: `${tokens.component.iconButton.small.size}px`,
            height: `${tokens.component.iconButton.small.size}px`,
            borderRadius: `${tokens.component.iconButton.small.cornerRadius}px`,
          };
        case 'medium':
          return {
            width: `${tokens.component.iconButton.medium.size}px`,
            height: `${tokens.component.iconButton.medium.size}px`,
            borderRadius: `${tokens.component.iconButton.medium.cornerRadius}px`,
          };
      }
    };

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: tokens.colors.brand.bgFillBrand,
            color: tokens.colors.brand.textOnBgFillBrand,
            border: 'none',
          };
        case 'secondary':
          return {
            backgroundColor: 'var(--color-color-bg-surface, #F1F1F1)',
            color: tokens.semantic.colors.text.neutral,
            border: 'none',
          };
        case 'tertiary':
          return {
            backgroundColor: '#FFFFFF',
            color: tokens.semantic.colors.text.neutral,
            border: `1px solid ${tokens.semantic.colors.border.neutral}`,
          };
        case 'flat':
          return {
            backgroundColor: 'transparent',
            color: tokens.semantic.colors.text.neutral,
            border: 'none',
          };
        case 'ghost':
          return {
            backgroundColor: '#F1F1F1',
            color: tokens.semantic.colors.text.neutral,
            border: 'none',
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        style={{
          ...sizeStyles,
          ...variantStyles,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s ease',
          padding: 0,
          flexShrink: 0,
          ...(disabled && { pointerEvents: 'none' }),
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            if (variant === 'flat') {
              e.currentTarget.style.backgroundColor = tokens.semantic.colors.surface.subdued;
            } else if (variant === 'secondary') {
              e.currentTarget.style.backgroundColor = tokens.semantic.colors.interaction.surfaceHovered ?? '#E9E9E9';
            } else if (variant === 'tertiary') {
              e.currentTarget.style.backgroundColor = '#F6F6F6';
              e.currentTarget.style.border = '1px solid #F6F6F6';
            }
            // ghost variant has no hover effect
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            if (variant === 'flat') {
              e.currentTarget.style.backgroundColor = 'transparent';
            } else if (variant === 'secondary') {
              e.currentTarget.style.backgroundColor = 'var(--color-color-bg-surface, #F1F1F1)';
            } else if (variant === 'tertiary') {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.border = `1px solid ${tokens.semantic.colors.border.neutral}`;
            }
          }
        }}
        onMouseDown={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(0.95)';
          }
        }}
        onMouseUp={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${tokens.usage.sizing.xSmall}px`,
            height: `${tokens.usage.sizing.xSmall}px`,
          }}
        >
          {icon}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
