import React from 'react';
import { tokens } from '../../../tokens';

export interface BadgeProps {
  /**
   * Badge content (e.g. count or short label)
   */
  children: React.ReactNode;
  /**
   * @deprecated Single style from Figma (209-1249); kept for API compatibility. All variants render the same.
   */
  variant?: 'default' | 'positive' | 'neutral' | 'subdued';
  /**
   * Badge size. Maps to Figma: small = 12px label, medium = 16px label.
   */
  size?: 'small' | 'medium';
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Badge – single style from Figma Emporos UI Library (node 209-1249).
 * One visual style (subdued border + subdued text on default background), two sizes.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  size = 'medium',
  className,
}) => {
  const b = tokens.component.badge;
  const isSmall = size === 'small';
  const sizeConfig = isSmall ? b.small : b.medium;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${sizeConfig.paddingY}px ${sizeConfig.paddingX}px`,
        borderRadius: `${b.borderRadius}px`,
        background: 'var(--color-color-border-subdued, #D9DADA)',
        color: 'var(--Text-Subdued, var(--color-color-text-subdued, #6C6C6C))',
        border: 'none',
        boxSizing: 'border-box',
        fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily,
        fontWeight: tokens.usage.typography.label.xSmall.strong.fontWeight,
        letterSpacing: tokens.usage.typography.label.xSmall.strong.letterSpacing,
        fontSize: `${sizeConfig.fontSize}px`,
        lineHeight: `${sizeConfig.lineHeight}px`,
      }}
    >
      {children}
    </span>
  );
};
