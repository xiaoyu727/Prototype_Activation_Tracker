import React from 'react';
import { Button } from '../../../components/Button';

export interface ProductFormActionBarProps {
  visible: boolean;
  onCancel: () => void;
  onSaveProduct: () => void;
}

/**
 * Sticky action bar for product form (detail and new product).
 * Cancel (secondary) + Save product (primary), right-aligned, size large.
 */
export const ProductFormActionBar: React.FC<ProductFormActionBarProps> = ({
  visible,
  onCancel,
  onSaveProduct,
}) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 16,
        backgroundColor: 'transparent',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      <Button variant="secondary" size="large" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" size="large" onClick={onSaveProduct}>
        Save product
      </Button>
    </div>
  );
};
