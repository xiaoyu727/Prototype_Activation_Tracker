import React from 'react';
import { tokens } from '../../../tokens';

export interface SearchButtonProps {
  onClick?: () => void;
  className?: string;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick, className }) => {
  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke={tokens.semantic.colors.text.neutral}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10.5 10.5L13.5 13.5"
        stroke={tokens.semantic.colors.text.neutral}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        minWidth: '36px',
        height: '36px',
        minHeight: '36px',
        maxWidth: '36px',
        backgroundColor: tokens.semantic.colors.surface.raised,
        border: `1px solid ${tokens.semantic.colors.border.neutral}`,
        borderRadius: `${tokens.usage.borderRadius.full}px`,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = tokens.semantic.colors.surface.subdued;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = tokens.semantic.colors.surface.raised;
      }}
    >
      {SearchIcon}
    </button>
  );
};
