import React, { useState, useEffect } from 'react';
import { tokens } from '../../../tokens';

const CloseIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.293 2.29295C12.6835 1.90243 13.3165 1.90243 13.707 2.29295C14.0975 2.68348 14.0975 3.31649 13.707 3.70702L9.41405 7.99999L13.707 12.293C14.0975 12.6835 14.0975 13.3165 13.707 13.707C13.3165 14.0975 12.6835 14.0975 12.293 13.707L7.99999 9.41405L3.70702 13.707C3.31649 14.0975 2.68348 14.0975 2.29295 13.707C1.90243 13.3165 1.90243 12.6835 2.29295 12.293L6.58592 7.99999L2.29295 3.70702C1.90243 3.31649 1.90243 2.68348 2.29295 2.29295C2.68348 1.90243 3.31649 1.90243 3.70702 2.29295L7.99999 6.58592L12.293 2.29295Z"
      fill={color}
    />
  </svg>
);

const ANIMATION_DURATION_MS = 300;
const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';

export interface BaseModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when the modal should close (backdrop click, close button, Escape) */
  onClose: () => void;
  /** Title shown in the header */
  title: string;
  /** Main content (scrollable body) */
  children: React.ReactNode;
  /** Optional footer (e.g. actions + checkbox). Rendered fixed at bottom. */
  footer?: React.ReactNode;
  /** Modal width (default '776px') */
  width?: string | number;
  /** Modal height (default '540px'). Use 'auto' or maxHeight for variable height. */
  height?: string | number;
  /** Whether clicking the backdrop closes the modal (default true) */
  closeOnBackdropClick?: boolean;
  /** Optional aria-label for the close button */
  closeButtonAriaLabel?: string;
  /**
   * Optional controlled open animation. When provided, parent can set to false to run exit animation
   * before unmounting (e.g. when user clicks "Save"). If not provided, BaseModal manages it internally.
   */
  isAnimating?: boolean;
  /** Animation style: 'slide' (translateY, default) or 'scale' (scale from center) */
  animationVariant?: 'slide' | 'scale';
}

/**
 * Reusable modal shell: backdrop, animated container, header (title + close), scrollable body, optional footer.
 * Use for confirmation dialogs, forms, and any modal that shares this layout.
 */
export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = '776px',
  height = '540px',
  closeOnBackdropClick = true,
  closeButtonAriaLabel = 'Close',
  isAnimating: controlledAnimating,
  animationVariant = 'slide',
}) => {
  const [internalAnimating, setInternalAnimating] = useState(false);
  const isControlled = controlledAnimating !== undefined;
  const isAnimating = isControlled ? controlledAnimating : internalAnimating;

  useEffect(() => {
    if (isOpen) {
      if (isControlled) {
        // Parent will control; assume they set it true when opening
      } else {
        setInternalAnimating(true);
      }
    }
  }, [isOpen, isControlled]);

  const handleClose = () => {
    if (isControlled) {
      onClose();
    } else {
      setInternalAnimating(false);
      setTimeout(() => onClose(), ANIMATION_DURATION_MS);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={closeOnBackdropClick ? handleClose : undefined}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        opacity: isAnimating ? 1 : 0,
        transition: `opacity ${ANIMATION_DURATION_MS}ms ${ease}`,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...(animationVariant === 'scale'
            ? {
                position: 'fixed' as const,
                top: '50%',
                left: '50%',
                transform: isAnimating
                  ? 'translate(-50%, -50%) scale(1)'
                  : 'translate(-50%, -50%) scale(0.95)',
                maxHeight: '90vh',
              }
            : {
                transform: isAnimating ? 'translateY(0)' : 'translateY(40px)',
              }),
          backgroundColor: tokens.semantic.colors.surface.raised,
          borderRadius: '24px',
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: isAnimating ? 1 : 0,
          transition: `transform ${ANIMATION_DURATION_MS}ms ${ease}, opacity ${ANIMATION_DURATION_MS}ms ${ease}`,
          zIndex: 10001,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <h2
            id="modal-title"
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '24px',
              letterSpacing: '-0.01px',
              color: tokens.semantic.colors.text.neutral,
              margin: 0,
            }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label={closeButtonAriaLabel}
            style={{
              backgroundColor: tokens.semantic.colors.surface.subdued,
              border: 'none',
              borderRadius: '9999px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <CloseIcon color={tokens.semantic.colors.text.neutral} />
          </button>
        </div>

        {/* Body - scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingBottom: footer ? '96px' : '24px',
            minHeight: 0,
          }}
        >
          {children}
        </div>

        {/* Footer - fixed to bottom when present */}
        {footer != null && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              backgroundColor: tokens.semantic.colors.surface.raised,
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
