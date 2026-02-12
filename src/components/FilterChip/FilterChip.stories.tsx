import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip } from './FilterChip';

const meta: Meta<typeof FilterChip> = {
  title: 'Components/FilterChip',
  component: FilterChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {
  args: {
    label: 'Status: Active',
    onRemove: () => console.log('Remove clicked'),
    onClick: () => console.log('Chip clicked'),
  },
};

export const Focused: Story = {
  args: {
    label: 'Status: Active, Inactive',
    isFocused: true,
    hasSelections: true,
    onRemove: () => {},
    onClick: () => {},
  },
};

export const NoSelections: Story = {
  args: {
    label: 'Status',
    hasSelections: false,
    onRemove: () => {},
    onClick: () => {},
  },
};

export const InteractiveGroup: Story = {
  render: () => {
    const [filters, setFilters] = useState([
      { id: 1, label: 'Status: Active' },
      { id: 2, label: 'Category: Fresh Fruits' },
      { id: 3, label: 'Price: $5-$10' },
      { id: 4, label: 'Has image' },
    ]);

    const removeFilter = (id: number) => {
      setFilters(filters.filter((f) => f.id !== id));
    };

    const editFilter = (id: number) => {
      console.log(`Edit filter ${id}`);
    };

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '20px' }}>
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            onRemove={() => removeFilter(filter.id)}
            onClick={() => editFilter(filter.id)}
            hasSelections
          />
        ))}
        {filters.length === 0 && (
          <p style={{ color: '#666', fontSize: '14px' }}>No filters applied</p>
        )}
      </div>
    );
  },
};

export const MultipleChips: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '500px' }}>
      <FilterChip label="Status: Active" onRemove={() => {}} />
      <FilterChip label="Category: Fresh Fruits" onRemove={() => {}} />
      <FilterChip label="Price: $5-$10" onRemove={() => {}} />
      <FilterChip label="Brand: Organic" onRemove={() => {}} />
      <FilterChip label="Has discount" onRemove={() => {}} />
      <FilterChip label="Image coverage: 100%" onRemove={() => {}} />
    </div>
  ),
};

export const LongLabel: Story = {
  args: {
    label: 'Description coverage: Products with complete descriptions',
    onRemove: () => console.log('Remove clicked'),
    onClick: () => console.log('Chip clicked'),
  },
};
