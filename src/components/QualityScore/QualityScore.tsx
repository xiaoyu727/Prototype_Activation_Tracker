import React from 'react';
import { tokens } from '../../../tokens';

export interface QualityScoreProps {
  /**
   * Quality score percentage (0-100)
   */
  score: number;
}

/**
 * Displays a quality score with a circular progress indicator
 */
export const QualityScore: React.FC<QualityScoreProps> = ({ score }) => {
  // Clamp score between 0 and 100
  const clampedScore = Math.min(100, Math.max(0, score));
  
  // Calculate the stroke-dashoffset for the progress circle
  const radius = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  // Determine color based on score
  const getColor = () => {
    if (clampedScore >= 80) return tokens.semantic.colors.text.positive; // Green
    if (clampedScore >= 50) return '#F5A623'; // Orange/Yellow
    return tokens.semantic.colors.text.negative; // Red
  };

  const getBackgroundColor = () => {
    if (clampedScore >= 80) return tokens.semantic.colors.surface.positive; // Light green
    if (clampedScore >= 50) return '#FFF4E0'; // Light orange
    return tokens.semantic.colors.surface.negative; // Light red
  };

  const color = getColor();
  const backgroundColor = getBackgroundColor();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        maxHeight: '28px',
        minHeight: '28px',
        minWidth: '20px',
        padding: `0 ${tokens.component.tag.medium.paddingX}px`,
        backgroundColor: backgroundColor,
        borderRadius: `${tokens.usage.borderRadius.large}px`,
      }}
    >
      {/* Circular progress indicator */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          flexShrink: 0,
        }}
      >
        {/* Background circle */}
        <circle
          cx="8"
          cy="8"
          r={radius}
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="2"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="8"
          cy="8"
          r={radius}
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 8 8)"
          style={{
            transition: 'stroke-dashoffset 0.3s ease',
          }}
        />
      </svg>

      {/* Percentage text */}
      <span
        style={{
          fontFamily: tokens.usage.typography.label.small.default.fontFamily,
          fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
          fontWeight: 510,
          lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
          letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
          color: color,
        }}
      >
        {clampedScore}%
      </span>
    </div>
  );
};
