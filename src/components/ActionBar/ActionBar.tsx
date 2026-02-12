import React from 'react';
import { tokens } from '../../../tokens';

export interface ActionBarProps {
  selectedCount: number;
  visible: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onMore: () => void;
}

// More icon (three dots) SVG component with dynamic color
const MoreIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="1" fill={color} />
    <circle cx="12" cy="8" r="1" fill={color} />
    <circle cx="4" cy="8" r="1" fill={color} />
  </svg>
);

export const ActionBar: React.FC<ActionBarProps> = ({
  selectedCount,
  visible,
  onCancel,
  onEdit,
  onMore,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: visible ? '24px' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: tokens.semantic.colors.surface.default,
        borderRadius: '9999px',
        padding: '8px 8px 8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.12), 0px 2px 6px 0px rgba(0, 0, 0, 0.12), 0px 8px 28px 0px rgba(0, 0, 0, 0.12)',
        transition: 'bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 10000,
        pointerEvents: visible ? 'auto' : 'none',
        minHeight: '52px',
        width: '400px',
      }}
    >
      {/* Selected count */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <span
          style={{
            fontFamily: tokens.usage.typography.label.small.default.fontFamily,
            fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
            fontWeight: tokens.usage.typography.label.small.default.fontWeight,
            lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
            letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
            color: tokens.semantic.colors.text.neutral,
          }}
        >
          {selectedCount} selected
        </span>
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Cancel button */}
        <button
          onClick={onCancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.48)',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <span
            style={{
              fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
              fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
              fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
              lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
              letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Cancel
          </span>
        </button>

        {/* Edit button */}
        <button
          onClick={onEdit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            background: 'linear-gradient(90deg, #181818 0%, #181818 100%)',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <span
            style={{
              fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
              fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
              fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
              lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
              letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
              color: '#F1F1F1',
            }}
          >
            Edit
          </span>
        </button>

        {/* More button */}
        <button
          onClick={onMore}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <MoreIcon color={tokens.semantic.colors.text.neutral} />
        </button>
      </div>
    </div>
  );
};
