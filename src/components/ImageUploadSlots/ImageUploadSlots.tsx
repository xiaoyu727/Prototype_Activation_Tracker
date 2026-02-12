import React, { useRef, useState } from 'react';
import { tokens } from '../../../tokens';
import PlusIcon from '../../icons/24/Shell/Plus.svg';

const MAX_IMAGES = 5;

const ACCEPT_IMAGES = 'image/jpeg,image/png,image/webp,image/gif';

/** Slot: fixed height 64px, width flexible (flex: 1). */
const slotBaseStyle: React.CSSProperties = {
  flex: '1 1 0%',
  minWidth: 0,
  height: 64,
  minHeight: 64,
  maxHeight: 64,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  transition: 'background-color 0.2s ease',
};

/** Shadow color for image slot hover (aligns with design color.shadow). */
const shadowColor = 'rgba(0, 0, 0, 0.12)';
const imageSlotHoverShadow = `0 0 1px 0 ${shadowColor}, 0 1px 2px 0 ${shadowColor}`;

/** Image button style for empty add-image slot (not a tertiary button). */
const imageButtonBorderWidth = 2; // var(--border-width-regular-large, 2px)
const imageButtonStyle: React.CSSProperties = {
  borderRadius: 'var(--corner-radius-xlarge, 16px)',
  border: `${imageButtonBorderWidth}px solid ${tokens.semantic.colors.surface.raised}`,
  backgroundColor: tokens.semantic.colors.surface.subdued,
};

export interface ImageUploadSlotsProps {
  /** Current image URLs (max 5). Empty string = empty slot. */
  images: string[];
  /** Called when user clicks an empty slot to add image. (slotIndex: 0..4) */
  onAddClick?: (slotIndex: number) => void;
  /** When provided, clicking an empty slot opens a file picker; selected image URL is passed here so parent can add it. */
  onImageSelected?: (slotIndex: number, imageUrl: string) => void;
  /** Optional: called when user clicks a filled slot (e.g. to replace/remove). */
  onImageClick?: (slotIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Up to 5 image slots. Empty slots show a + icon with default/hover state.
 * Cards stretch to fill the container (flex: 1).
 */
export const ImageUploadSlots: React.FC<ImageUploadSlotsProps> = ({
  images,
  onAddClick,
  onImageSelected,
  onImageClick,
  className,
  style,
}) => {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingSlotRef = useRef<number>(0);

  const slots = Array.from({ length: MAX_IMAGES }, (_, i) => images[i] ?? '');

  const handleEmptySlotClick = (slotIndex: number) => {
    if (onImageSelected) {
      pendingSlotRef.current = slotIndex;
      fileInputRef.current?.click();
    } else {
      onAddClick?.(slotIndex);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !file.type.startsWith('image/')) return;
    const slotIndex = pendingSlotRef.current;
    const url = URL.createObjectURL(file);
    onImageSelected?.(slotIndex, url);
  };

  return (
    <>
      {onImageSelected && (
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT_IMAGES}
          multiple={false}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      )}
    <div
      className={className}
      style={{
        display: 'flex',
        gap: 16,
        padding: 0,
        width: '100%',
        boxSizing: 'border-box',
        alignSelf: 'flex-start',
        flexShrink: 0,
        minHeight: 0,
        alignItems: 'flex-start',
        ...style,
      }}
    >
      {slots.map((src, index) => {
        const isEmpty = !src;
        const isHovered = hoveredSlot === index;

        if (isEmpty) {
          return (
            <button
              key={index}
              type="button"
              aria-label="Add image"
              onMouseEnter={() => setHoveredSlot(index)}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => handleEmptySlotClick(index)}
              style={{
                ...slotBaseStyle,
                ...imageButtonStyle,
                backgroundColor: isHovered ? tokens.semantic.colors.surface.default : tokens.semantic.colors.surface.subdued,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <img src={PlusIcon} alt="" style={{ width: 24, height: 24, opacity: isHovered ? 1 : 0.6 }} />
            </button>
          );
        }

        const isSlotHovered = hoveredSlot === index;
        return (
          <div
            key={index}
            role={onImageClick ? 'button' : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            onMouseEnter={() => setHoveredSlot(index)}
            onMouseLeave={() => setHoveredSlot(null)}
            onClick={() => onImageClick?.(index)}
            style={{
              ...slotBaseStyle,
              borderRadius: 'var(--corner-radius-xlarge, 16px)',
              border: `${imageButtonBorderWidth}px solid ${tokens.semantic.colors.surface.raised}`,
              backgroundColor: tokens.semantic.colors.surface.subdued,
              boxShadow: isSlotHovered ? imageSlotHoverShadow : 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              cursor: onImageClick ? 'pointer' : 'default',
            }}
          >
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      );
      })}
    </div>
    </>
  );
};
