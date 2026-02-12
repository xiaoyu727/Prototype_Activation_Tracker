import React, { useRef, useState } from 'react';
import { tokens } from '../../../tokens';

/** Focus/hover border color (same as other fields). Figma: color/light-azure-17 */
const BORDER_FOCUS_COLOR = '#002F4C';

export interface FileUploaderProps {
  /** Primary instruction; "Select file" is emphasized. */
  primaryText?: React.ReactNode;
  /** Accepted formats line, e.g. "We accept CSV, PDF, JPG, PNG files." */
  acceptText?: string;
  /** Max file size line, e.g. "Maximum file size: 5GB" */
  maxSizeText?: string;
  /** Accepted input accept attribute. */
  accept?: string;
  /** Called with selected/dropped files. */
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

const defaultPrimary = (
  <>
    <span style={{ fontWeight: tokens.usage.typography.label.small.strong.fontWeight }}>Select file</span>
    {' or drop it here'}
  </>
);

/**
 * File uploader zone matching Figma (Listing-Catalog-playground node 4100-11985).
 * 2px dashed border, white background, centered text. Supports click and drag-and-drop.
 */
export const FileUploader: React.FC<FileUploaderProps> = ({
  primaryText = defaultPrimary,
  acceptText = 'We accept CSV, PDF, JPG, PNG files.',
  maxSizeText = 'Maximum file size: 5GB',
  accept,
  onFilesSelected,
  className,
  style,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files?.length || !onFilesSelected) return;
    onFilesSelected(Array.from(files));
  };

  const handleClick = () => inputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const borderColor = isHovered && onFilesSelected ? BORDER_FOCUS_COLOR : tokens.semantic.colors.border.neutral;

  return (
    <div
      role="button"
      tabIndex={0}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '24px 16px',
        borderRadius: 16,
        border: `1px dashed ${borderColor}`,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        cursor: onFilesSelected ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease',
        ...style,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-hidden
      />
      <span
        style={{
          fontFamily: tokens.base.typography.fontFamily.brand,
          fontSize: tokens.usage.typography.label.small.default.fontSize,
          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
          letterSpacing: tokens.usage.typography.label.small.default.letterSpacing,
          color: tokens.semantic.colors.text.neutral,
        }}
      >
        {primaryText}
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: tokens.base.typography.fontFamily.brand,
            fontSize: 12,
            lineHeight: '16px',
            color: tokens.semantic.colors.text.subdued,
            width: 'fit-content',
          }}
        >
          {acceptText}
        </span>
        <span
          style={{
            fontFamily: tokens.base.typography.fontFamily.brand,
            fontSize: 12,
            lineHeight: '16px',
            color: tokens.semantic.colors.text.subdued,
            width: 'fit-content',
          }}
        >
          {maxSizeText}
        </span>
      </div>
    </div>
  );
};
