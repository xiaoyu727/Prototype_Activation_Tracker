import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Default Radio
export const Default: Story = {
  args: {
    checked: false,
  },
};

// Checked Radio
export const Checked: Story = {
  args: {
    checked: true,
  },
};

// Disabled Radio
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

// Disabled and Checked
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

// Interactive Radio Group
export const RadioGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string>('option1');

    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
          Select an option:
        </p>
        {options.map((option) => (
          <div
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              opacity: option.disabled ? 0.5 : 1,
            }}
            onClick={() => {
              if (!option.disabled) {
                setSelectedValue(option.value);
              }
            }}
          >
            <Radio
              checked={selectedValue === option.value}
              onChange={() => setSelectedValue(option.value)}
              name="radio-group-demo"
              value={option.value}
              disabled={option.disabled}
            />
            <span style={{ fontSize: '14px' }}>{option.label}</span>
          </div>
        ))}
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Selected: <strong>{selectedValue}</strong>
        </p>
      </div>
    );
  },
};
