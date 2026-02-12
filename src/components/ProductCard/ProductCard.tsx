import React from 'react';
import { tokens } from '../../../tokens';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';

export interface ProductCardProps {
  /**
   * Product ID
   */
  id: string;
  /**
   * Product name
   */
  name: string;
  /**
   * Product price
   */
  price: string;
  /**
   * Product image URL
   */
  image?: string;
  /**
   * Whether the card is selected
   */
  selected?: boolean;
  /**
   * Callback when checkbox is toggled
   */
  onToggleSelect?: (id: string) => void;
  /**
   * Callback when card is clicked
   */
  onClick?: () => void;
  /**
   * Callback when more menu is clicked
   */
  onMoreClick?: (e: React.MouseEvent) => void;
}

/**
 * Product card for grid view
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  selected = false,
  onToggleSelect,
  onClick,
  onMoreClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const MoreIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="3" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tokens.semantic.colors.surface.raised,
        border: `1px solid ${tokens.semantic.colors.border.subdued}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        height: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Product image - fills from left to right and top */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '160px',
          backgroundColor: '#FAFAFA',
        }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '48px',
              height: '48px',
              opacity: 0.24,
              backgroundColor: tokens.semantic.colors.border.subdued,
              borderRadius: '4px',
            }}
          />
        )}

        {/* Checkbox - positioned on top left of image */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            zIndex: 10,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Checkbox 
            checked={selected} 
            onChange={(checked) => {
              if (onToggleSelect) {
                onToggleSelect(id);
              }
            }} 
          />
        </div>

        {/* More button - positioned on top right of image */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 10,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onMoreClick?.(e);
          }}
        >
          <IconButton
            icon={<MoreIcon />}
            aria-label="More options"
            variant="ghost"
            size="xSmall"
          />
        </div>
      </div>

      {/* Product info section with padding */}
      <div
        style={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Product name */}
        <div
          style={{
            fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
            fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
            fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
            lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
            color: tokens.semantic.colors.text.neutral,
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '40px',
          }}
        >
          {name}
        </div>

        {/* Product price */}
        <div
          style={{
            fontFamily: tokens.usage.typography.label.small.default.fontFamily,
            fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
            fontWeight: 510,
            lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
            color: tokens.semantic.colors.text.neutral,
            marginTop: 'auto',
          }}
        >
          {price}
        </div>
      </div>
    </div>
  );
};
