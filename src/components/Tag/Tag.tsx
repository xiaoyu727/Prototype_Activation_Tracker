import React from 'react';
import { tokens } from '../../../tokens';

export type TagSize = 'small' | 'medium' | 'large';
export type TagStyle = 'neutral' | 'positive' | 'negative' | 'warning';
export type TagVariant = 'default' | 'prominent';

/** Default icons (same as src/icons/16). Inlined so fill=currentColor works and Storybook loads. */
const InfoLineIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
    <path d="M8 7C8.55229 6.99999 8.99999 7.44772 9 8V11.5C8.99999 12.0523 8.55227 12.5 8 12.5C7.44776 12.5 7.00001 12.0523 7 11.5V8C6.99999 7.44772 7.44772 7.00001 8 7Z" fill="currentColor" />
    <path d="M8 3.5C8.69036 3.5 9.25 4.05964 9.25 4.75C9.25 5.44036 8.69036 6 8 6C7.30964 6 6.75 5.44036 6.75 4.75C6.75 4.05964 7.30964 3.5 8 3.5Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58174 16 3.29867e-05 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 2C4.68629 2 2 4.68629 2 8C2.00003 11.3137 4.68631 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" fill="currentColor" />
  </svg>
);
const CheckCircleLineIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
    <path d="M11.0644 6.49388C11.3372 6.18215 11.3056 5.70833 10.9939 5.43557C10.6822 5.16281 10.2083 5.1944 9.93557 5.50612L6.96347 8.90281L6.03033 7.96967C5.73744 7.67678 5.26256 7.67678 4.96967 7.96967C4.67678 8.26257 4.67678 8.73744 4.96967 9.03033L6.46967 10.5303C6.61645 10.6771 6.8175 10.7565 7.02496 10.7496C7.23242 10.7427 7.42774 10.6501 7.56443 10.4939L11.0644 6.49388Z" fill="currentColor" />
    <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8Z" fill="currentColor" />
  </svg>
);
const WarningLineIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
    <path d="M8.00022 9.99998C8.69058 9.99998 9.25022 10.5596 9.25022 11.25C9.25022 11.9403 8.69058 12.5 8.00022 12.5C7.30987 12.5 6.75022 11.9403 6.75022 11.25C6.75022 10.5596 7.30987 9.99998 8.00022 9.99998Z" fill="currentColor" />
    <path d="M8.00022 4.99998C8.55251 4.99998 9.00022 5.4477 9.00022 5.99998V8.49998C9.00022 9.05227 8.55251 9.49998 8.00022 9.49998C7.44794 9.49998 7.00022 9.05227 7.00022 8.49998V5.99998C7.00022 5.4477 7.44794 4.99998 8.00022 4.99998Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M6.58616 0.775371C7.26731 -0.292744 8.85604 -0.257374 9.47678 0.881816L15.7893 12.4746C16.4073 13.61 15.5941 14.9998 14.3117 15H1.68772C0.405595 14.9996 -0.406811 13.6099 0.21116 12.4746L6.52268 0.881816L6.58616 0.775371ZM2.24632 12.9629H13.7532L7.99925 2.39451L2.24632 12.9629Z" fill="currentColor" />
  </svg>
);

function getDefaultIconForStyle(style: TagStyle, iconSize: number): React.ReactNode {
  switch (style) {
    case 'neutral':
      return <InfoLineIcon size={iconSize} />;
    case 'positive':
      return <CheckCircleLineIcon size={iconSize} />;
    case 'negative':
    case 'warning':
      return <WarningLineIcon size={iconSize} />;
  }
}

export interface TagProps {
  children: React.ReactNode;
  /** Custom icon; color follows tag style. Omit to show no icon. */
  icon?: React.ReactNode;
  /** When true, show the default icon for the style (info-line / check-circle / warning-line). Ignored if icon is passed. */
  showDefaultIcon?: boolean;
  /** Visual variant: default (surface bg) or prominent (filled/inverse). */
  variant?: TagVariant;
  /** Semantic style; drives background and text/icon color. */
  style?: TagStyle;
  size?: TagSize;
  className?: string;
}

function getTagColors(variant: TagVariant, style: TagStyle): { backgroundColor: string; color: string } {
  const s = tokens.semantic.colors;
  if (variant === 'prominent') {
    switch (style) {
      case 'neutral':
        return { backgroundColor: s.fill.neutral, color: s.text.inverse };
      case 'positive':
        return { backgroundColor: s.text.positive, color: s.text.inverse };
      case 'negative':
        return { backgroundColor: s.text.negative, color: s.text.inverse };
      case 'warning':
        return { backgroundColor: s.text.warning, color: s.text.inverse };
    }
  }
  // default
  switch (style) {
    case 'neutral':
      return { backgroundColor: s.surface.default, color: s.text.neutral };
    case 'positive':
      return { backgroundColor: s.surface.positive, color: s.text.positive };
    case 'negative':
      return { backgroundColor: s.surface.negative, color: s.text.negative };
    case 'warning':
      return { backgroundColor: s.surface.warning, color: s.text.warning };
  }
}

export const Tag: React.FC<TagProps> = ({
  children,
  icon,
  showDefaultIcon = false,
  variant = 'default',
  style: styleProp = 'neutral',
  size = 'medium',
  className,
}) => {
  const resolvedVariant: TagVariant = variant;
  const resolvedStyle: TagStyle = styleProp;

  const colors = getTagColors(resolvedVariant, resolvedStyle);
  const config = tokens.component.tag[size];
  const typo = tokens.usage.typography.label.small.default;

  const iconContent =
    icon != null ? icon : showDefaultIcon ? getDefaultIconForStyle(resolvedStyle, config.iconSize) : null;

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        minHeight: `${config.minHeight}px`,
        minWidth: '20px',
        padding: `${config.paddingY}px ${config.paddingX}px`,
        backgroundColor: colors.backgroundColor,
        borderRadius: `${tokens.usage.borderRadius.large}px`,
      }}
    >
      {iconContent != null && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${config.iconSize}px`,
            height: `${config.iconSize}px`,
            color: colors.color,
          }}
        >
          {iconContent}
        </span>
      )}
      <span
        style={{
          fontFamily: typo.fontFamily,
          fontSize: `${config.fontSize}px`,
          fontWeight: typo.fontWeight,
          lineHeight: `${config.lineHeight}px`,
          letterSpacing: typo.letterSpacing,
          color: colors.color,
        }}
      >
        {children}
      </span>
    </div>
  );
};
