import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';
import { useState } from 'react';

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search...',
    value: 'Example search',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search...',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Search...',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div>
        <Search
          value={value}
          onChange={setValue}
          placeholder="Type to search..."
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#6c6c6c' }}>
          Current value: {value || '(empty)'}
        </div>
      </div>
    );
  },
};
