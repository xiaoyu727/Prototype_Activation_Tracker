import type { Meta, StoryObj } from '@storybook/react';
import { DropdownField } from './DropdownField';

const meta = {
  title: 'Components/Field/DropdownField',
  component: DropdownField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    options: [
      { id: 'a', label: 'Option A' },
      { id: 'b', label: 'Option B' },
      { id: 'c', label: 'Option C' },
    ],
    placeholder: 'Select',
    width: 280,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    value: { control: 'select', options: ['a', 'b', 'c'] },
    width: { control: 'text' },
  },
} satisfies Meta<typeof DropdownField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'b',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'a',
  },
};
