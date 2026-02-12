import React, { useState, useEffect, useMemo } from 'react';
import { tokens } from '../../../tokens';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import { BaseModal } from './BaseModal';

export interface ColumnConfig {
  id: string;
  label: string;
  selected: boolean;
  isCore: boolean; // Core columns are always in "Selected" section
}

export interface EditColumnsModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  /**
   * Array of column configurations
   */
  columns: ColumnConfig[];
  /**
   * Callback when Save is clicked
   */
  onSave: (columns: ColumnConfig[]) => void;
  /**
   * Callback when Cancel or close is clicked
   */
  onCancel: () => void;
}

/**
 * Modal for editing which columns are visible in the table
 */
export const EditColumnsModal: React.FC<EditColumnsModalProps> = ({
  visible,
  columns,
  onSave,
  onCancel,
}) => {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>(columns);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setLocalColumns(columns);
  }, [columns]);

  useEffect(() => {
    if (visible) setIsAnimating(true);
  }, [visible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onCancel(), 300);
  };

  const handleSave = () => {
    onSave(localColumns);
    handleClose();
  };

  const handleColumnToggle = (columnId: string) => {
    setLocalColumns(prev =>
      prev.map(col =>
        col.id === columnId ? { ...col, selected: !col.selected } : col
      )
    );
  };

  // Check if there are any changes
  const hasChanges = JSON.stringify(localColumns) !== JSON.stringify(columns);

  // Filter based on the ORIGINAL columns prop, not localColumns
  // This keeps columns in their original sections until Save is clicked
  const selectedColumns = useMemo(
    () => localColumns.filter(col => {
      const originalCol = columns.find(c => c.id === col.id);
      return originalCol?.selected === true;
    }),
    [localColumns, columns]
  );
  const otherColumns = useMemo(
    () => localColumns.filter(col => {
      const originalCol = columns.find(c => c.id === col.id);
      return originalCol?.selected === false;
    }),
    [localColumns, columns]
  );

  if (!visible && !isAnimating) return null;

  const footer = (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', flex: 1 }}>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave} disabled={!hasChanges}>
        Save
      </Button>
    </div>
  );

  return (
    <BaseModal
      isOpen={visible}
      onClose={handleClose}
      title="Edit columns"
      footer={footer}
      isAnimating={isAnimating}
      width={510}
      height="auto"
      animationVariant="scale"
    >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 24px 24px 24px',
            paddingBottom: '96px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Selected columns section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '22px',
                letterSpacing: '-0.1px',
                color: tokens.semantic.colors.text.subdued,
                padding: '1px 0',
              }}
            >
              Selected columns
            </div>
            {selectedColumns.map((column) => (
              <div
                key={column.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Checkbox
                  checked={column.selected}
                  onChange={() => handleColumnToggle(column.id)}
                />
                <label
                  style={{
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    letterSpacing: '-0.1px',
                    color: tokens.semantic.colors.text.neutral,
                    cursor: 'pointer',
                    flex: 1,
                  }}
                  onClick={() => handleColumnToggle(column.id)}
                >
                  {column.label}
                </label>
              </div>
            ))}
          </div>

          {/* Other columns section */}
          {otherColumns.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  letterSpacing: '-0.1px',
                  color: tokens.semantic.colors.text.subdued,
                  padding: '1px 0',
                }}
              >
                Other columns
              </div>
              {otherColumns.map((column) => (
                <div
                  key={column.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Checkbox
                    checked={column.selected}
                    onChange={() => handleColumnToggle(column.id)}
                  />
                  <label
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      letterSpacing: '-0.1px',
                      color: tokens.semantic.colors.text.neutral,
                      cursor: 'pointer',
                      flex: 1,
                    }}
                    onClick={() => handleColumnToggle(column.id)}
                  >
                    {column.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
    </BaseModal>
  );
};
