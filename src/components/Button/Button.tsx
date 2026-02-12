import React from 'react';
import { tokens } from '../../../tokens';

export interface ButtonProps {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button variant style. Use "flat" for no background and no border (text-only).
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'flat';
  /**
   * Button size. compact = padding 4/12, gap 4, hug height/width (no minHeight).
   */
  size?: 'compact' | 'small' | 'medium' | 'large';
  /**
   * Leading icon element
   */
  icon?: React.ReactNode;
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
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'small',
      icon,
      disabled = false,
      onClick,
      type = 'button',
      fullWidth = false,
      className,
    },
    ref
  ) => {
    const getSizeStyles = () => {
      const smallTypo = tokens.usage.typography.label.small.strong;
      const mediumTypo = tokens.usage.typography.label.medium.strong;
      const largeTypo = tokens.usage.typography.label.large.strong;
      switch (size) {
        case 'compact':
          return {
            padding: `${tokens.component.button.paddingY.compact}px ${tokens.component.button.paddingX.compact}px`,
            fontFamily: smallTypo.fontFamily,
            fontSize: `${smallTypo.fontSize}px`,
            fontWeight: smallTypo.fontWeight,
            lineHeight: `${smallTypo.lineHeight}px`,
            letterSpacing: `${smallTypo.letterSpacing}px`,
          };
        case 'small':
          return {
            padding: `${tokens.component.button.paddingY.small}px ${tokens.component.button.paddingX.small}px`,
            minHeight: `${tokens.component.button.minHeight.small}px`,
            fontFamily: smallTypo.fontFamily,
            fontSize: `${smallTypo.fontSize}px`,
            fontWeight: smallTypo.fontWeight,
            lineHeight: `${smallTypo.lineHeight}px`,
            letterSpacing: `${smallTypo.letterSpacing}px`,
          };
        case 'medium':
          return {
            padding: `${tokens.component.button.paddingY.medium}px ${tokens.component.button.paddingX.medium}px`,
            minHeight: `${tokens.component.button.minHeight.medium}px`,
            fontFamily: mediumTypo.fontFamily,
            fontSize: `${mediumTypo.fontSize}px`,
            fontWeight: mediumTypo.fontWeight,
            lineHeight: `${mediumTypo.lineHeight}px`,
            letterSpacing: `${mediumTypo.letterSpacing}px`,
          };
        case 'large':
          return {
            padding: `${tokens.component.button.paddingY.large}px ${tokens.component.button.paddingX.large}px`,
            minHeight: `${tokens.component.button.minHeight.large}px`,
            fontFamily: largeTypo.fontFamily,
            fontSize: `${largeTypo.fontSize}px`,
            fontWeight: largeTypo.fontWeight,
            lineHeight: `${largeTypo.lineHeight}px`,
            letterSpacing: `${largeTypo.letterSpacing}px`,
          };
      }
    };

    const getVariantStyles = () => {
      const borderSubdued = tokens.semantic.colors.border.subdued;
      const thin = tokens.usage.borderWidth.thin;
      if (disabled) {
        switch (variant) {
          case 'primary':
            return {
              backgroundColor: tokens.colors.brand.bgFillBrandDisabled,
              color: tokens.colors.brand.textOnBgFillBrandDisabled,
              border: 'none',
              boxShadow: 'none',
            };
          case 'secondary':
            return {
              backgroundColor: tokens.colors.brand.surfaceDisabled,
              color: tokens.colors.brand.textDisabled,
              border: 'none',
              boxShadow: 'none',
            };
          case 'tertiary':
          case 'flat':
            return {
              backgroundColor: 'transparent',
              color: tokens.colors.brand.textDisabled,
              border: 'none',
              boxShadow: 'none',
            };
        }
      }
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: tokens.colors.brand.bgFillBrand,
            color: tokens.colors.brand.textOnBgFillBrand,
            border: 'none',
            boxShadow: 'none',
          };
        case 'secondary':
          return {
            backgroundColor: tokens.semantic.colors.surface.default,
            color: tokens.semantic.colors.text.neutral,
            border: 'none',
            boxShadow: 'none',
          };
        case 'tertiary':
          return {
            backgroundColor: 'transparent',
            color: tokens.semantic.colors.text.neutral,
            border: 'none',
            boxShadow: `inset 0 0 0 ${thin}px ${borderSubdued}`,
          };
        case 'flat':
          return {
            backgroundColor: 'transparent',
            color: tokens.semantic.colors.text.neutral,
            border: 'none',
            boxShadow: 'none',
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
        className={className}
        style={{
          ...sizeStyles,
          ...variantStyles,
          borderRadius: `${tokens.component.button.borderRadius}px`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: size === 'compact' ? 4 : `${tokens.usage.spacing.xxSmall}px`,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          width: fullWidth ? '100%' : 'auto',
          border: variantStyles.border,
          boxSizing: 'border-box',
          ...(disabled && { pointerEvents: 'none' }),
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.opacity = '0.9';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.opacity = '1';
          }
        }}
        onMouseDown={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(0.98)';
          }
        }}
        onMouseUp={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        {icon && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: `${tokens.usage.sizing.xSmall}px`,
              height: `${tokens.usage.sizing.xSmall}px`,
            }}
          >
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
