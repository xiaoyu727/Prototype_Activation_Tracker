import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';

const meta = {
  title: 'Components/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    focused: { control: 'boolean' },
    hovered: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    label: { control: 'text' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Field value',
    width: 280,
  },
};

export const Hovered: Story = {
  args: {
    children: 'Hovered field',
    hovered: true,
    width: 280,
  },
};

export const Focused: Story = {
  args: {
    children: 'Focused field',
    focused: true,
    width: 280,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled field',
    disabled: true,
    width: 280,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full width',
    width: '100%',
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Field>Default</Field>
      <Field hovered>Hovered</Field>
      <Field focused>Focused</Field>
      <Field disabled>Disabled</Field>
    </div>
  ),
};

export const Small: Story = {
  args: {
    children: 'Small (36px)',
    size: 'small',
    width: 280,
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium (40px)',
    size: 'medium',
    width: 280,
  },
};

export const Large: Story = {
  args: {
    children: 'Large (48px)',
    size: 'large',
    width: 280,
  },
};

export const WithLabel: Story = {
  args: {
    children: 'Field value',
    label: 'Field label',
    width: 280,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <Field size="small">Small (36px)</Field>
      <Field size="medium">Medium (40px)</Field>
      <Field size="large">Large (48px)</Field>
    </div>
  ),
};

export const SizesWithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <Field size="small" label="Small">
        Content
      </Field>
      <Field size="medium" label="Medium">
        Content
      </Field>
      <Field size="large" label="Large">
        Content
      </Field>
    </div>
  ),
};
