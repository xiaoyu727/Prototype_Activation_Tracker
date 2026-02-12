import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import InactiveIconSvg from '../../icons/Tag/Inactive.svg';
import ActiveIconSvg from '../../icons/Tag/active.svg';

const ActiveIcon = () => (
  <img src={ActiveIconSvg} alt="" style={{ width: '16px', height: '16px', display: 'block' }} />
);
const InactiveIcon = () => (
  <img src={InactiveIconSvg} alt="" style={{ width: '16px', height: '16px', display: 'block' }} />
);

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'prominent'] },
    style: { control: 'select', options: ['neutral', 'positive', 'negative', 'warning'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Default', variant: 'default', style: 'neutral' },
};

export const WithIcon: Story = {
  args: { children: 'Active', style: 'positive', icon: <ActiveIcon /> },
};

export const WithoutIcon: Story = {
  args: { children: 'Label', style: 'positive' },
};

export const WithDefaultIcon: Story = {
  args: { children: 'Info', style: 'neutral', showDefaultIcon: true },
};

export const DefaultIconsByStyle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag style="neutral" showDefaultIcon>Neutral</Tag>
      <Tag style="positive" showDefaultIcon>Positive</Tag>
      <Tag style="negative" showDefaultIcon>Negative</Tag>
      <Tag style="warning" showDefaultIcon>Warning</Tag>
    </div>
  ),
};

export const Small: Story = {
  args: { children: 'Small', size: 'small', style: 'positive' },
};

export const Medium: Story = {
  args: { children: 'Medium', size: 'medium', style: 'positive' },
};

export const Large: Story = {
  args: { children: 'Large', size: 'large', style: 'positive' },
};

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag style="neutral">Neutral</Tag>
      <Tag style="positive">Positive</Tag>
      <Tag style="negative">Negative</Tag>
      <Tag style="warning">Warning</Tag>
    </div>
  ),
};

export const DefaultAndProminent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Tag variant="default" style="neutral">Neutral</Tag>
        <Tag variant="default" style="positive">Positive</Tag>
        <Tag variant="default" style="negative">Negative</Tag>
        <Tag variant="default" style="warning">Warning</Tag>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Tag variant="prominent" style="neutral">Neutral</Tag>
        <Tag variant="prominent" style="positive">Positive</Tag>
        <Tag variant="prominent" style="negative">Negative</Tag>
        <Tag variant="prominent" style="warning">Warning</Tag>
      </div>
    </div>
  ),
};

export const StatusWithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Tag style="positive" icon={<ActiveIcon />}>Active</Tag>
      <Tag style="negative" icon={<InactiveIcon />}>Inactive</Tag>
      <Tag style="neutral">Default</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Tag size="small" style="positive">Small</Tag>
      <Tag size="medium" style="positive">Medium</Tag>
      <Tag size="large" style="positive">Large</Tag>
    </div>
  ),
};
