import React, { useState, useRef, useEffect } from 'react';
import { tokens } from '../../../tokens';

export interface ExpandableSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const ExpandableSearch: React.FC<ExpandableSearchProps> = ({
  placeholder = 'Placeholder',
  value = '',
  onChange,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus when expanded with a small delay for smooth animation
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      // Delay focus slightly to allow the expansion animation to start
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isExpanded && !searchValue) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, searchValue]);

  const closeSearch = () => {
    setSearchValue('');
    setIsExpanded(false);
    onChange?.('');
  };

  // Handle Escape key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      closeSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    if (!searchValue) {
      setIsExpanded(false);
    }
  };

  const SearchIcon = (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none"
      style={{
        display: 'block',
      }}
    >
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

  const CloseIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M12.293 2.29295C12.6835 1.90243 13.3165 1.90243 13.707 2.29295C14.0975 2.68348 14.0975 3.31649 13.707 3.70702L9.41405 7.99999L13.707 12.293C14.0975 12.6835 14.0975 13.3165 13.707 13.707C13.3165 14.0975 12.6835 14.0975 12.293 13.707L7.99999 9.41405L3.70702 13.707C3.31649 14.0975 2.68348 14.0975 2.29295 13.707C1.90243 13.3165 1.90243 12.6835 2.29295 12.293L6.58592 7.99999L2.29295 3.70702C1.90243 3.31649 1.90243 2.68348 2.29295 2.29295C2.68348 1.90243 3.31649 1.90243 3.70702 2.29295L7.99999 6.58592L12.293 2.29295Z" fill="var(--color-color-text, #181818)"/>
    </svg>
  );

  // Unified container with smooth morphing animation
  return (
    <div
      ref={containerRef}
      className={className}
      onClick={() => {
        if (!isExpanded) {
          setIsExpanded(true);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isExpanded ? '8px' : '0px',
        width: isExpanded ? '312px' : '36px',
        height: '36px',
        padding: isExpanded ? '6px 12px' : '0px',
        backgroundColor: isExpanded 
          ? 'var(--color-color-bg-surface-dim, #FFFFF)' 
          : isHovered 
            ? '#F6F6F6' 
            : tokens.semantic.colors.surface.raised,
        border: isExpanded 
          ? `2px solid ${tokens.semantic.colors.border.focused}` 
          : isHovered
            ? '1px solid #F6F6F6'
            : `1px solid ${tokens.semantic.colors.border.neutral}`,
        borderRadius: isExpanded ? '9999px' : '20px',
        cursor: isExpanded ? 'text' : 'pointer',
        overflow: 'hidden',
        // Synchronized transitions with custom easing for smooth morphing
        transition: `
          width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1),
          border-radius 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
          padding 0.3s cubic-bezier(0.4, 0.0, 0.2, 1),
          gap 0.3s cubic-bezier(0.4, 0.0, 0.2, 1),
          background-color 0.2s cubic-bezier(0.4, 0.0, 0.2, 1),
          border 0.2s cubic-bezier(0.4, 0.0, 0.2, 1),
          box-shadow 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)
        `,
        boxShadow: isExpanded 
          ? `inset 0 0 0 1px ${tokens.semantic.colors.border.focused}, 0px 2px 8px rgba(15, 37, 148, 0.08)` 
          : '0px 1px 2px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isExpanded ? '16px' : '36px',
          height: isExpanded ? '16px' : '36px',
          flexShrink: 0,
          // Icon fades slightly when expanded to emphasize input
          opacity: isExpanded ? 0.7 : 1,
          transition: 'width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)',
        }}
      >
        {SearchIcon}
      </div>
      {/* Input with staggered fade-in animation */}
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{
          flex: '1',
          minWidth: 0,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          color: tokens.semantic.colors.text.neutral,
          fontFamily: tokens.usage.typography.label.small.default.fontFamily,
          fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
          letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
          pointerEvents: isExpanded ? 'auto' : 'none',
          // Staggered animation: fade in after width expansion starts
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? 'translateX(0)' : 'translateX(-8px)',
          transition: `
            opacity 0.15s cubic-bezier(0.0, 0.0, 0.2, 1) ${isExpanded ? '0.05s' : '0s'},
            transform 0.2s cubic-bezier(0.0, 0.0, 0.2, 1) ${isExpanded ? '0.05s' : '0s'}
          `,
        }}
      />
      {isExpanded && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            closeSearch();
          }}
          aria-label="Close search"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 0',
            margin: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {CloseIcon}
        </button>
      )}
    </div>
  );
};
