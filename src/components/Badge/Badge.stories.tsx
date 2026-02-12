import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'positive', 'neutral', 'subdued'],
      description: 'Deprecated: single style from Figma; all render the same.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    children: '12',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: '99',
    size: 'medium',
  },
};

/** Single style from Figma (209-1249). variant prop kept for API compat; all render the same. */
export const SingleStyleAllSizes: Story = {
  args: { children: 'Badge' },
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge {...args} size="small">Small</Badge>
      <Badge {...args} size="medium">Medium</Badge>
    </div>
  ),
};

/** Backward compat: variant is ignored; same appearance. */
export const VariantsMappedToSingleStyle: Story = {
  args: { children: 'Count' },
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge {...args} variant="default" size="small">default</Badge>
      <Badge {...args} variant="subdued" size="small">subdued</Badge>
    </div>
  ),
};
