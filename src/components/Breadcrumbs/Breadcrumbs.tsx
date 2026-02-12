import React from 'react';
import { tokens } from '../../../tokens';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.usage.spacing.xSmall}px`,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {item.href ? (
              <a
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '32px',
                  padding: `${tokens.usage.spacing.xxSmall}px 0`,
                  borderRadius: `${tokens.usage.borderRadius.full}px`,
                  fontFamily: tokens.usage.typography.link.small.fontFamily,
                  fontSize: `${tokens.usage.typography.link.small.fontSize}px`,
                  fontWeight: tokens.usage.typography.link.small.fontWeight,
                  lineHeight: `${tokens.usage.typography.link.small.lineHeight}px`,
                  letterSpacing: `${tokens.usage.typography.link.small.letterSpacing}px`,
                  color: tokens.semantic.colors.text.neutral,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </a>
            ) : (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '32px',
                  fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
                  fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                  fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
                  lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                  letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                  color: isLast
                    ? tokens.semantic.colors.text.subdued
                    : tokens.semantic.colors.text.neutral,
                }}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '32px',
                  fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
                  fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                  fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
                  lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                  letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                  color: tokens.semantic.colors.text.selected,
                }}
              >
                /
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
