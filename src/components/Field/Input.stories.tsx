import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Field/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    label: { control: 'text' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    value: '',
    width: 280,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search',
    value: 'Some text',
    width: 280,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    value: '',
    disabled: true,
    width: 280,
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small (36px)',
    value: '',
    size: 'small',
    width: 280,
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Medium (40px)',
    value: '',
    size: 'medium',
    width: 280,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large (48px)',
    value: '',
    size: 'large',
    width: 280,
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter value',
    value: '',
    label: 'Input label',
    width: 280,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <Input placeholder="Small" size="small" />
      <Input placeholder="Medium" size="medium" />
      <Input placeholder="Large" size="large" />
    </div>
  ),
};

export const SizesWithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <Input label="Small" placeholder="Small (36px)" size="small" />
      <Input label="Medium" placeholder="Medium (40px)" size="medium" />
      <Input label="Large" placeholder="Large (48px)" size="large" />
    </div>
  ),
};
