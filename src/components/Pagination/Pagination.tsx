import React from 'react';
import { tokens } from '../../../tokens';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  resultsText?: string;
  className?: string;
}

const NavigationButton: React.FC<{
  direction: 'prev' | 'next';
  disabled?: boolean;
  onClick?: () => void;
}> = ({ direction, disabled, onClick }) => {
  const ChevronIcon = direction === 'prev' ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 12L6 8L10 4"
        stroke={disabled ? tokens.semantic.colors.text.disabled : tokens.semantic.colors.text.neutral}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4L10 8L6 12"
        stroke={tokens.semantic.colors.text.neutral}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        maxWidth: '36px',
        height: '36px',
        maxHeight: '36px',
        minWidth: '36px',
        minHeight: '36px',
        padding: '6px',
        borderRadius: `${tokens.usage.borderRadius.medium}px`,
        backgroundColor: tokens.semantic.colors.surface.raised,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {ChevronIcon}
    </button>
  );
};

const PageButton: React.FC<{
  page: number;
  active?: boolean;
  onClick?: () => void;
}> = ({ page, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        maxWidth: '36px',
        height: '36px',
        maxHeight: '36px',
        minWidth: '36px',
        minHeight: '36px',
        padding: '6px',
        borderRadius: active ? `${tokens.usage.borderRadius.full}px` : `${tokens.usage.borderRadius.medium}px`,
        backgroundColor: tokens.semantic.colors.surface.raised,
        border: active ? `2px solid ${tokens.semantic.colors.border.selected}` : 'none',
        cursor: 'pointer',
        fontFamily: tokens.usage.typography.label.small.default.fontFamily,
        fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
        fontWeight: tokens.usage.typography.label.small.default.fontWeight,
        lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
        letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
        color: tokens.semantic.colors.text.neutral,
      }}
    >
      {page}
    </button>
  );
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  resultsText,
  className,
}) => {
  const pages = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 0',
      }}
    >
      {resultsText && (
        <div
          style={{
            flex: '1',
            fontFamily: tokens.usage.typography.label.small.default.fontFamily,
            fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
            fontWeight: tokens.usage.typography.label.small.default.fontWeight,
            lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
            letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
            color: tokens.semantic.colors.text.subdued,
          }}
        >
          {resultsText}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '2px',
        }}
      >
        <NavigationButton
          direction="prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        {pages.map((page) => (
          <PageButton
            key={page}
            page={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          />
        ))}
        <NavigationButton
          direction="next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};
