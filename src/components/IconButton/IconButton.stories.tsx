import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'flat', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['xSmall', 'small', 'medium'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock icons for demos
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M14 14L10.3536 10.3536M11.5 7C11.5 9.48528 9.48528 11.5 7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 8C13 8.6 13.3 9.2 13.7 9.6L13.8 9.7C14.1 10 14.3 10.3 14.3 10.7C14.3 11.1 14.1 11.4 13.8 11.7C13.5 12 13.2 12.2 12.8 12.2C12.4 12.2 12.1 12 11.8 11.7L11.7 11.6C11.3 11.2 10.7 10.9 10.1 10.9C9.5 10.9 9 11.2 8.7 11.7C8.5 12.1 8.4 12.5 8.4 12.9V13C8.4 13.8 7.8 14.4 7 14.4C6.2 14.4 5.6 13.8 5.6 13V12.9C5.6 12.3 5.4 11.7 4.9 11.3C4.5 10.9 3.9 10.7 3.3 10.7C2.9 10.7 2.5 10.8 2.1 11.1L2 11.2C1.7 11.5 1.4 11.7 1 11.7C0.6 11.7 0.3 11.5 0 11.2C-0.3 10.9 -0.5 10.6 -0.5 10.2C-0.5 9.8 -0.3 9.5 0 9.2L0.1 9.1C0.5 8.7 0.8 8.1 0.8 7.5C0.8 6.9 0.5 6.3 0.1 6L0 5.9C-0.3 5.6 -0.5 5.3 -0.5 4.9C-0.5 4.5 -0.3 4.2 0 3.9C0.3 3.6 0.6 3.4 1 3.4C1.4 3.4 1.7 3.6 2 3.9L2.1 4C2.5 4.4 3.1 4.7 3.7 4.7C4.3 4.7 4.9 4.4 5.2 3.9C5.4 3.5 5.5 3.1 5.5 2.7V2.6C5.5 1.8 6.1 1.2 6.9 1.2C7.7 1.2 8.3 1.8 8.3 2.6V2.7C8.3 3.3 8.5 3.9 9 4.3C9.4 4.7 10 4.9 10.6 4.9C11 4.9 11.4 4.8 11.8 4.5L11.9 4.4C12.2 4.1 12.5 3.9 12.9 3.9C13.3 3.9 13.6 4.1 13.9 4.4C14.2 4.7 14.4 5 14.4 5.4C14.4 5.8 14.2 6.1 13.9 6.4L13.8 6.5C13.4 6.9 13.1 7.5 13.1 8.1L13 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 3.5V12.5M3.5 8H12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Primary: Story = {
  args: {
    icon: <AddIcon />,
    'aria-label': 'Add item',
    variant: 'primary',
    size: 'small',
  },
};

export const Secondary: Story = {
  args: {
    icon: <SearchIcon />,
    'aria-label': 'Search',
    variant: 'secondary',
    size: 'small',
  },
};

export const Tertiary: Story = {
  args: {
    icon: <SearchIcon />,
    'aria-label': 'Search',
    variant: 'tertiary',
    size: 'small',
  },
};

export const Flat: Story = {
  args: {
    icon: <SettingsIcon />,
    'aria-label': 'Settings',
    variant: 'flat',
    size: 'small',
  },
};

export const XSmall: Story = {
  args: {
    icon: <SearchIcon />,
    'aria-label': 'Search',
    variant: 'flat',
    size: 'xSmall',
  },
};

export const Small: Story = {
  args: {
    icon: <SearchIcon />,
    'aria-label': 'Search',
    variant: 'flat',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    icon: <SearchIcon />,
    'aria-label': 'Search',
    variant: 'flat',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    icon: <SettingsIcon />,
    'aria-label': 'Settings',
    variant: 'flat',
    size: 'small',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <IconButton icon={<AddIcon />} aria-label="Primary" variant="primary" />
      <IconButton icon={<SearchIcon />} aria-label="Secondary" variant="secondary" />
      <IconButton icon={<SearchIcon />} aria-label="Tertiary" variant="tertiary" />
      <IconButton icon={<SettingsIcon />} aria-label="Flat" variant="flat" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <IconButton icon={<SearchIcon />} aria-label="X-Small" size="xSmall" />
      <IconButton icon={<SearchIcon />} aria-label="Small" size="small" />
      <IconButton icon={<SearchIcon />} aria-label="Medium" size="medium" />
    </div>
  ),
};
