import React from 'react';
import { tokens } from '../../../tokens';
import { Tag } from '../Tag';
import { IconButton } from '../IconButton';
import moreHorizontalIcon from '../../icons/16/more-horizontal.svg';

export interface ImageCardProps {
  /** Card title (e.g. collection name) */
  title: string;
  /** Image URL */
  image?: string;
  /** Optional status tag shown top-left (e.g. Active, Inactive, Scheduled) */
  statusTag?: React.ReactNode;
  /** Lines shown below the title. Each item is a string (uses default icon) or { icon, text } for custom icon. */
  labelLines?: Array<string | { icon?: React.ReactNode; text: string }>;
  /** Callback when card is clicked */
  onClick?: () => void;
  /** Callback when more (ellipsis) is clicked */
  onMoreClick?: (e: React.MouseEvent) => void;
}

/** Small tag/label icon for label lines (grey) */
const LabelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M2 8L8 2L14 8V14H8L2 8Z"
      stroke={tokens.semantic.colors.text.subdued}
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Image card layout per Figma (Emporos UI Library): horizontal layout with
 * left content (status tag, title, label lines) and right image. Used for Collections card view.
 */
export const ImageCard: React.FC<ImageCardProps> = ({
  title,
  image,
  statusTag,
  labelLines = [],
  onClick,
  onMoreClick,
}) => {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: tokens.semantic.colors.surface.raised,
        border: `1px solid ${tokens.semantic.colors.border.subdued}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        minHeight: '140px',
      }}
      onClick={onClick}
    >
      {/* Content column: status row + (title/labels left | image right) */}
      <div
        style={{
          flex: '1 1 0',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '12px',
        }}
      >
        {/* Top row: status tag (left) + more (right) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          {statusTag != null ? <div>{statusTag}</div> : <div />}
          {onMoreClick && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onMoreClick(e);
              }}
              style={{ marginTop: -4, marginRight: -4 }}
            >
              <IconButton
                icon={<img src={moreHorizontalIcon} alt="" width={16} height={16} />}
                aria-label="More options"
                variant="flat"
                size="xSmall"
              />
            </div>
          )}
        </div>

        {/* One container: content left, image right */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 0,
            minWidth: 0,
            flex: 1,
          }}
        >
          {/* Left: title + label lines */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              minWidth: 0,
              flex: '1 1 0',
              paddingRight: '24px',
            }}
          >
            <div
              style={{
                fontFamily: tokens.usage.typography.body.medium.strong.fontFamily,
                fontSize: `${tokens.usage.typography.body.medium.strong.fontSize}px`,
                fontWeight: tokens.usage.typography.body.medium.strong.fontWeight,
                lineHeight: `${tokens.usage.typography.body.medium.strong.lineHeight}px`,
                letterSpacing: `${tokens.usage.typography.body.medium.strong.letterSpacing}px`,
                color: tokens.semantic.colors.text.neutral,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </div>
            {labelLines.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {labelLines.map((line, i) => {
                  const text = typeof line === 'string' ? line : line.text;
                  const icon = typeof line === 'string' ? undefined : line.icon;
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: 0,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {icon ?? <LabelIcon />}
                      </div>
                      <span
                        style={{
                          fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                          fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                          lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                          color: tokens.semantic.colors.text.subdued,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: image mask (clips content, 16px corner radius) */}
          <div
            style={{
              width: '140px',
              minWidth: '140px',
              flexShrink: 0,
              alignSelf: 'stretch',
              backgroundColor: tokens.semantic.colors.surface.default,
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {image ? (
              <img
                src={image}
                alt=""
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
          </div>
        </div>
      </div>
    </div>
  );
};
