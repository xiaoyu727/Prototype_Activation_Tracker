import React, { useState } from 'react';
import { tokens } from '../../../tokens';

/** Fill-version close icon for chip remove button. 12×12, subdued color. */
const CLOSE_ICON_SIZE = 12;
const CLOSE_ICON_COLOR = 'rgba(32, 33, 37, 0.64)'; /* #202125 at 64% opacity (text.subdued) */

const CloseCircleFillIcon = ({ color }: { color: string }) => (
  <svg width={CLOSE_ICON_SIZE} height={CLOSE_ICON_SIZE} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.2071 4.79289C11.5976 5.18342 11.5976 5.81658 11.2071 6.20711L9.41421 8L11.2071 9.79289C11.5976 10.1834 11.5976 10.8166 11.2071 11.2071C10.8166 11.5976 10.1834 11.5976 9.79289 11.2071L8 9.41421L6.20711 11.2071C5.81658 11.5976 5.18342 11.5976 4.79289 11.2071C4.40237 10.8166 4.40237 10.1834 4.79289 9.79289L6.58579 8L4.79289 6.20711C4.40237 5.81658 4.40237 5.18342 4.79289 4.79289C5.18342 4.40237 5.81658 4.40237 6.20711 4.79289L8 6.58579L9.79289 4.79289C10.1834 4.40237 10.8166 4.40237 11.2071 4.79289Z" fill={color}/>
  </svg>
);

const AddCircleLineIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8ZM7 11V8.99512H5.00488C4.45269 8.99505 4.00495 8.54731 4.00488 7.99512C4.00488 7.44287 4.45265 6.99518 5.00488 6.99512H7V5C7 4.44772 7.44772 4.00001 8 4C8.55229 4 9 4.44772 9 5V6.99512H11.0049C11.5572 6.99512 12.0049 7.44283 12.0049 7.99512C12.0048 8.54735 11.5571 8.99512 11.0049 8.99512H9V11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill={color}/>
  </svg>
);

export interface FilterChipProps {
  /**
   * The filter label (e.g., "Status: Active" or just "Active")
   */
  label: string;
  /**
   * Callback when the chip is removed (close button clicked)
   */
  onRemove?: () => void;
  /**
   * Callback when the chip is clicked (for editing the filter)
   */
  onClick?: () => void;
  /**
   * Whether the chip is in focused state (being edited)
   */
  isFocused?: boolean;
  /**
   * Whether the filter has selections (affects icon display: remove vs add)
   */
  hasSelections?: boolean;
  /**
   * When true, hide the add/remove icon (e.g. for size chips in preview)
   */
  hideActionButton?: boolean;
  /**
   * Chip size. Small: padding 4px top/bottom, 12px left/right.
   */
  size?: 'default' | 'small';
  /**
   * 'default' = raised surface + inset border. 'filled' = fill only, no border (background #F6F6F6).
   */
  appearance?: 'default' | 'filled';
  /**
   * Optional image URL for chip with image variant. Rendered on the left: 16×16 container, 16×16 rounded image, 1px border.
   */
  imageUrl?: string;
}

const FILLED_BACKGROUND = '#F6F6F6';
const CHIP_IMAGE_SIZE = 16;
const CHIP_IMAGE_CONTAINER_SIZE = 16;

/**
 * FilterChip component for displaying active filters with remove functionality.
 * Always clickable, always removable, default style only.
 */
const PADDING = {
  default: { y: tokens.usage.spacing.xSmall, x: tokens.usage.spacing.medium },
  small: { y: 4, x: 12 },
} as const;

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onRemove,
  onClick,
  isFocused = false,
  hasSelections = false,
  hideActionButton = false,
  size = 'default',
  appearance = 'default',
  imageUrl,
}) => {
  const [, setIsHovered] = useState(false);
  const padding = PADDING[size];

  const getVariantStyles = () => {
    if (appearance === 'filled') {
      return {
        backgroundColor: FILLED_BACKGROUND,
        color: tokens.semantic.colors.text.neutral,
        border: 'none',
        boxShadow: 'none',
      };
    }
    if (isFocused) {
      return {
        backgroundColor: tokens.semantic.colors.surface.raised,
        color: tokens.semantic.colors.text.neutral,
        border: 'none',
        boxShadow: `inset 0 0 0 2px ${tokens.semantic.colors.border.selected}`,
      };
    }
    return {
      backgroundColor: tokens.semantic.colors.surface.raised,
      color: tokens.semantic.colors.text.neutral,
      border: 'none',
      boxShadow: `inset 0 0 0 1px ${tokens.semantic.colors.border.subdued}`,
    };
  };

  const variantStyles = getVariantStyles();

  const handleChipClick = () => {
    onClick?.();
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: `${padding.y}px ${padding.x}px`,
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${tokens.usage.spacing.xxSmall}px`,
        borderRadius: `${tokens.usage.borderRadius.full}px`,
        border: variantStyles.border,
        boxShadow: variantStyles.boxShadow ?? 'none',
        background: variantStyles.backgroundColor,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        userSelect: 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
        maxWidth: '280px',
      }}
      onClick={handleChipClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div
          style={{
            width: CHIP_IMAGE_CONTAINER_SIZE,
            height: CHIP_IMAGE_CONTAINER_SIZE,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imageUrl}
            alt=""
            width={CHIP_IMAGE_SIZE}
            height={CHIP_IMAGE_SIZE}
            style={{
              width: CHIP_IMAGE_SIZE,
              height: CHIP_IMAGE_SIZE,
              borderRadius: 9999,
              border: `1px solid ${tokens.semantic.colors.border.subdued}`,
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}
      <span
        style={{
          fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
          fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
          fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
          letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
          color: hasSelections ? variantStyles.color : tokens.semantic.colors.text.subdued,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </span>

      {!hideActionButton && (
        <button
          onClick={handleRemoveClick}
          aria-label={hasSelections ? 'Remove filter' : 'Add filter'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            padding: 0,
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {hasSelections ? (
            <CloseCircleFillIcon color={CLOSE_ICON_COLOR} />
          ) : (
            <AddCircleLineIcon color={tokens.semantic.colors.text.subdued} />
          )}
        </button>
      )}
    </div>
  );
};
