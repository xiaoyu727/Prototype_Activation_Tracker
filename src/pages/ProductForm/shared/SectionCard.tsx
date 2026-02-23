import React, { useState } from 'react';
import { tokens } from '../../../../tokens';
import ChevronDownMediumSvg from '../../../icons/24/Chevron down medium.svg';

/**
 * Shared section card with collapsible content.
 * Uses CSS grid-template-rows for smooth open/close animation.
 */

export interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  /** Controlled mode: pass collapsed state and onToggle handler */
  collapsed?: boolean;
  onToggle?: () => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onToggle,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;
  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };
  return (
    <div
      data-section-card
      style={{
        width: '100%',
        backgroundColor: tokens.semantic.colors.surface.raised,
        borderRadius: 32,
        overflow: 'hidden',
      }}
    >
      <style>
        {`[data-section-card] label {
          color: var(--Text-Neutral, var(--color-color-text, #181818));
          font-family: inherit;
          font-size: var(--usage-type-label-small-default-font-size, 14px);
          font-style: normal;
          font-weight: 500;
          line-height: var(--usage-type-label-small-default-line-height, 20px);
          letter-spacing: var(--usage-type-label-small-default-letter-spacing, -0.01px);
        }`}
      </style>
      <button
        type="button"
        onClick={handleToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          overflow: 'hidden',
          color: 'var(--Text-Neutral, #181818)',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontFamily: 'inherit',
          fontSize: 'var(--usage-type-title-large-font-size, 20px)',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'var(--usage-type-title-large-line-height, 24px)',
          letterSpacing: 'var(--usage-type-title-large-letter-spacing, -0.01px)',
          textAlign: 'left',
        }}
      >
        {title}
        <img
          src={ChevronDownMediumSvg}
          alt=""
          style={{
            width: 24,
            height: 24,
            transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: collapsed ? '0fr' : '1fr',
          transition: 'grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              padding: '0 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
