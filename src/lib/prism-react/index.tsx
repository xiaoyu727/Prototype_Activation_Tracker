/**
 * Local shim for @doordash/prism-react ListCell and List components.
 *
 * Implements the subset of the Prism Web ListCell API used by the onboarding checklist.
 * Once `@doordash/prism-react` is installed from JFrog, remove this file and the
 * Vite / tsconfig alias that points here.
 */
import React from 'react';
import { tokens } from '../../../tokens';

/* ------------------------------------------------------------------ */
/*  Enums                                                              */
/* ------------------------------------------------------------------ */

export enum ListCellMediaSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ListCellIconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export enum ListCellIconType {
  ICON = 'icon',
  IMAGE = 'image',
}

export enum ListCellIconColor {
  DEFAULT = 'default',
  SUBDUED = 'subdued',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  WARNING = 'warning',
}

export enum ListCellTagIconType {
  NONE = 'none',
  ICON = 'icon',
}

export enum ListCellTagType {
  NONE = 'none',
  TAG = 'tag',
}

export enum ListCellSeparator {
  NONE = 'none',
  FULL = 'full',
  INSET = 'inset',
}

export enum ListCellAlignment {
  TOP = 'top',
  CENTER = 'center',
}

/* ------------------------------------------------------------------ */
/*  ListCell                                                           */
/* ------------------------------------------------------------------ */

export interface ListCellProps {
  /** Primary label text */
  label: string;
  /** Secondary description text */
  description?: string;
  /** Leading icon/image element */
  leadingIcon?: React.ReactNode;
  /** Leading icon size */
  leadingIconSize?: ListCellIconSize;
  /** Leading icon color */
  leadingIconColor?: ListCellIconColor;
  /** Trailing icon element (e.g. chevron) */
  trailingIcon?: React.ReactNode;
  /** Separator style between cells */
  separator?: ListCellSeparator;
  /** Vertical alignment of content */
  alignment?: ListCellAlignment;
  /** Click handler */
  onClick?: () => void;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ListCell: React.FC<ListCellProps> = ({
  label,
  description,
  leadingIcon,
  trailingIcon,
  separator = ListCellSeparator.NONE,
  alignment = ListCellAlignment.CENTER,
  onClick,
  className,
  style,
}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        display: 'flex',
        alignItems: alignment === ListCellAlignment.TOP ? 'flex-start' : 'center',
        gap: 0,
        minHeight: 48,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 16,
        backgroundColor: hover && onClick ? '#F0F0F0' : '#F8F8F8',
        cursor: onClick ? 'pointer' : 'default',
        borderBottom:
          separator === ListCellSeparator.FULL
            ? `1px solid ${tokens.semantic.colors.border.subdued}`
            : separator === ListCellSeparator.INSET
              ? `1px solid ${tokens.semantic.colors.border.subdued}`
              : 'none',
        transition: 'background-color 0.15s ease',
        ...style,
      }}
    >
      {/* Leading content */}
      {leadingIcon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            paddingRight: 12,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {leadingIcon}
          </div>
        </div>
      )}

      {/* Body */}
      <div
        style={{
          display: 'flex',
          flex: '1 0 0',
          alignItems: 'center',
          alignSelf: 'stretch',
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            paddingTop: 12,
            paddingBottom: 12,
            minWidth: 0,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
              fontSize: tokens.usage.typography.label.small.strong.fontSize,
              fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
              lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
              letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            {label}
          </p>
          {description && (
            <p
              style={{
                margin: 0,
                fontFamily: tokens.usage.typography.body.small.default.fontFamily,
                fontSize: tokens.usage.typography.body.small.default.fontSize,
                fontWeight: tokens.usage.typography.body.small.default.fontWeight,
                lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
                letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
                color: tokens.semantic.colors.text.subdued,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Trailing content */}
      {trailingIcon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            paddingLeft: 12,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: 24 }}>
            {trailingIcon}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  List container + helpers                                           */
/* ------------------------------------------------------------------ */

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const List: React.FC<ListProps> = ({ children, className, style }) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
      padding: '4px 0',
      ...style,
    }}
  >
    {children}
  </div>
);

export interface ListLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const ListLabel: React.FC<ListLabelProps> = ({ children, className }) => (
  <div
    className={className}
    style={{
      paddingTop: 12,
      paddingBottom: 4,
      paddingLeft: 16,
      paddingRight: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    {typeof children === 'string' ? (
      <p
        style={{
          margin: 0,
          fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
          fontSize: tokens.usage.typography.label.small.strong.fontSize,
          fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
          letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
          color: tokens.semantic.colors.text.subdued,
          textTransform: 'uppercase',
        }}
      >
        {children}
      </p>
    ) : (
      children
    )}
  </div>
);

export interface ListErrorProps {
  children: React.ReactNode;
}

export const ListError: React.FC<ListErrorProps> = ({ children }) => (
  <div
    style={{
      padding: '4px 16px 8px',
      fontFamily: tokens.usage.typography.body.small.default.fontFamily,
      fontSize: tokens.usage.typography.body.small.default.fontSize,
      fontWeight: tokens.usage.typography.body.small.default.fontWeight,
      lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
      letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
      color: tokens.semantic.colors.text.negative,
    }}
  >
    {children}
  </div>
);

export interface ListHintProps {
  children: React.ReactNode;
}

export const ListHint: React.FC<ListHintProps> = ({ children }) => (
  <div
    style={{
      padding: '4px 16px 8px',
      fontFamily: tokens.usage.typography.body.small.default.fontFamily,
      fontSize: tokens.usage.typography.body.small.default.fontSize,
      fontWeight: tokens.usage.typography.body.small.default.fontWeight,
      lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
      letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
      color: tokens.semantic.colors.text.subdued,
    }}
  >
    {children}
  </div>
);
