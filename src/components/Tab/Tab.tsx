import React from 'react';
import { tokens } from '../../../tokens';
import { Badge } from '../Badge';

export interface TabItemProps {
  label: string;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

export interface TabProps {
  items: TabItemProps[];
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export const TabItem: React.FC<TabItemProps & { onItemClick?: () => void }> = ({
  label,
  badge,
  active = false,
  onItemClick,
}) => {
  return (
    <button
      onClick={onItemClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${tokens.usage.spacing.xSmall}px`,
        height: '36px',
        minWidth: '44px',
        padding: `4px ${tokens.usage.spacing.small}px`,
        borderRadius: `${tokens.usage.borderRadius.full}px`,
        backgroundColor: active ? '#e9e9e9' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        fontFamily: tokens.usage.typography.body.small.strong.fontFamily,
        fontSize: `${tokens.usage.typography.body.small.strong.fontSize}px`,
        fontWeight: tokens.usage.typography.body.small.strong.fontWeight,
        lineHeight: `${tokens.usage.typography.body.small.strong.lineHeight}px`,
        letterSpacing: `${tokens.usage.typography.body.small.strong.letterSpacing}px`,
        color: active ? tokens.semantic.colors.text.neutral : tokens.semantic.colors.text.subdued,
        transition: 'background-color 0.2s ease',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {label}
      {badge !== undefined && (
        <Badge variant="subdued" size="small">
          {badge}
        </Badge>
      )}
    </button>
  );
};

export const Tab: React.FC<TabProps> = ({ items, activeIndex = 0, onTabChange, className }) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: `${tokens.usage.borderRadius.full}px`,
      }}
    >
      {items.map((item, index) => (
        <TabItem
          key={index}
          {...item}
          active={index === activeIndex}
          onItemClick={() => onTabChange?.(index)}
        />
      ))}
    </div>
  );
};
