import React from 'react';

/**
 * Reusable container for grouping content inside SectionCards or other layouts.
 * Use to visually group related fields (e.g. Product name, Description, Media).
 *
 * Styles:
 * - padding: 20px
 * - borderRadius: 20px
 * - background: var(--usage-color-background-plain-default, #FBFBFB)
 * - flex column with gap 16 between children
 */

const CARD_GROUP_STYLE: React.CSSProperties = {
  padding: 20,
  borderRadius: 20,
  background: 'var(--usage-color-background-plain-default, #FBFBFB)',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  overflow: 'hidden',
  width: '100%',
  boxSizing: 'border-box',
};

const TITLE_STYLE: React.CSSProperties = {
  overflow: 'hidden',
  color: 'var(--Text-Neutral, #181818)',
  textOverflow: 'ellipsis',
  fontFamily: 'inherit',
  fontSize: 'var(--usage-type-label-medium-strong-font-size, 16px)',
  fontStyle: 'normal',
  fontWeight: 590,
  lineHeight: 'var(--usage-type-label-medium-strong-line-height, 22px)',
  letterSpacing: 'var(--usage-type-label-medium-strong-letter-spacing, -0.01px)',
};

export interface CardGroupProps {
  /** Optional title (e.g. "Details") shown at the top. Uses label/medium/strong typography. */
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CardGroup: React.FC<CardGroupProps> = ({ title, children, className, style }) => (
  <div className={className} style={{ ...CARD_GROUP_STYLE, ...style }}>
    {title != null && title !== '' && <div style={TITLE_STYLE}>{title}</div>}
    {children}
  </div>
);
