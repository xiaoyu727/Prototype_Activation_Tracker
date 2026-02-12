import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable } from './DataTable';
import { tokens } from '../../../tokens';

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Sample row type for stories */
interface SampleRow {
  id: string;
  name: string;
  status: string;
  count: number;
}

const sampleRows: SampleRow[] = [
  { id: '1', name: 'Item One', status: 'Active', count: 42 },
  { id: '2', name: 'Item Two', status: 'Inactive', count: 7 },
  { id: '3', name: 'Item Three', status: 'Active', count: 128 },
  { id: '4', name: 'Item Four', status: 'Scheduled', count: 0 },
  { id: '5', name: 'Item Five', status: 'Active', count: 256 },
];

const columns = [
  { id: 'name', label: 'Name', widthRatio: 1.3 },
  { id: 'status', label: 'Status', widthRatio: 1 },
  { id: 'count', label: 'Count', widthRatio: 1 },
];

const cellStyle = {
  display: 'flex',
  alignItems: 'center',
  minHeight: '48px',
  padding: '4px 12px',
  borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
  fontFamily: tokens.usage.typography.label.small.default.fontFamily,
  fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
  color: tokens.semantic.colors.text.neutral,
};

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="3" cy="8" r="1.5" fill={tokens.semantic.colors.text.neutral} />
    <circle cx="8" cy="8" r="1.5" fill={tokens.semantic.colors.text.neutral} />
    <circle cx="13" cy="8" r="1.5" fill={tokens.semantic.colors.text.neutral} />
  </svg>
);

/** Basic table with default header and row actions */
export const Default: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <DataTable<SampleRow>
        columns={columns}
        rows={sampleRows}
        getRowId={(row) => row.id}
        renderCell={(columnId, row) => (
          <div key={columnId} style={cellStyle}>
            {columnId === 'name' && row.name}
            {columnId === 'status' && row.status}
            {columnId === 'count' && String(row.count)}
          </div>
        )}
        borderBottomRadius="32px"
        defaultActionsIcon={<MoreIcon />}
        defaultActionsAriaLabel="More actions"
      />
    </div>
  ),
};

/** With row selection (checkboxes) */
export const WithSelection: Story = {
  render: function WithSelectionStory() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <div style={{ width: '600px' }}>
        <DataTable<SampleRow>
          columns={columns}
          rows={sampleRows}
          getRowId={(row) => row.id}
          renderCell={(columnId, row) => (
            <div key={columnId} style={cellStyle}>
              {columnId === 'name' && row.name}
              {columnId === 'status' && row.status}
              {columnId === 'count' && String(row.count)}
            </div>
          )}
          selection={{
            selectedIds,
            onToggle: (id) =>
              setSelectedIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              ),
            onToggleAll: (checked) =>
              setSelectedIds(checked ? sampleRows.map((r) => r.id) : []),
          }}
          borderBottomRadius="32px"
          defaultActionsIcon={<MoreIcon />}
          defaultActionsAriaLabel="More actions"
        />
      </div>
    );
  },
};

/** With row hover highlight */
export const WithHover: Story = {
  render: function WithHoverStory() {
    const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
    return (
      <div style={{ width: '600px' }}>
        <DataTable<SampleRow>
          columns={columns}
          rows={sampleRows}
          getRowId={(row) => row.id}
          renderCell={(columnId, row) => (
            <div key={columnId} style={cellStyle}>
              {columnId === 'name' && row.name}
              {columnId === 'status' && row.status}
              {columnId === 'count' && String(row.count)}
            </div>
          )}
          hover={{
            hoveredRowId,
            onRowHover: setHoveredRowId,
          }}
          borderBottomRadius="32px"
          defaultActionsIcon={<MoreIcon />}
          defaultActionsAriaLabel="More actions"
        />
      </div>
    );
  },
};

/** Minimal: no selection, no actions, custom border radius */
export const Minimal: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <DataTable<SampleRow>
        columns={columns.slice(0, 2)}
        rows={sampleRows.slice(0, 3)}
        getRowId={(row) => row.id}
        renderCell={(columnId, row) => (
          <div key={columnId} style={cellStyle}>
            {columnId === 'name' && row.name}
            {columnId === 'status' && row.status}
          </div>
        )}
        borderBottomRadius="32px"
      />
    </div>
  ),
};
