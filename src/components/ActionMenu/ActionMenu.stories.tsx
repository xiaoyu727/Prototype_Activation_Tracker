import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenu, type ActionMenuItem } from './ActionMenu';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import EditIconSvg from '../../icons/16/edit-line.svg';
import CopyIconSvg from '../../icons/16/copy-line.svg';
import TrashIconSvg from '../../icons/16/trash-line.svg';
import MoreHorizontalIconSvg from '../../icons/16/more-horizontal.svg';

const meta = {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown / context menu. Icons from src/icons/16/ (edit-line, copy-line, trash-line, more-horizontal). Use **Default** to see closed state; **Open** to see the menu with all item variants (hover and focus appear on interaction).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Show menu open on load (for preview)' },
    items: { control: false },
    trigger: { control: false },
    position: { control: false },
    open: { control: false },
    onOpenChange: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems: ActionMenuItem[] = [
  { id: 'edit', label: 'Edit', icon: EditIconSvg, onClick: () => {} },
  { id: 'copy', label: 'Copy', icon: CopyIconSvg, onClick: () => {} },
  { id: 'delete', label: 'Delete', icon: TrashIconSvg, destructive: true, onClick: () => {} },
];

/** Default (closed): click the trigger to open. */
export const Default: Story = {
  args: {
    trigger: <Button variant="secondary" size="small">Actions</Button>,
    items: baseItems,
  },
};

/** Menu open on load so you can see all item variants. Hover/focus states appear on interaction. */
export const Open: Story = {
  args: {
    trigger: <Button variant="secondary" size="small">Actions</Button>,
    items: baseItems,
    defaultOpen: true,
  },
};

/** Items with icons (Edit, Copy, Delete). */
export const WithIcons: Story = {
  args: {
    trigger: <Button variant="secondary" size="small">With icons</Button>,
    items: baseItems,
    defaultOpen: true,
  },
};

/** Text-only items (no icons). */
export const WithoutIcons: Story = {
  args: {
    trigger: <Button variant="secondary" size="small">Text only</Button>,
    items: [
      { id: '1', label: 'Option 1', onClick: () => {} },
      { id: '2', label: 'Option 2', onClick: () => {} },
      { id: '3', label: 'Option 3', onClick: () => {} },
    ],
    defaultOpen: true,
  },
};

/** One item disabled (greyed out, not clickable). */
export const WithDisabledItem: Story = {
  args: {
    trigger: <Button variant="secondary" size="small">With disabled</Button>,
    items: [
      { id: 'edit', label: 'Edit', icon: EditIconSvg, onClick: () => {} },
      { id: 'copy', label: 'Copy', icon: CopyIconSvg, disabled: true, onClick: () => {} },
      { id: 'delete', label: 'Delete', icon: TrashIconSvg, destructive: true, onClick: () => {} },
    ],
    defaultOpen: true,
  },
};

/** Destructive item (red label, distinct hover). */
export const WithDestructiveItem: Story = {
  args: {
    trigger: <Button variant="secondary" size="small">With destructive</Button>,
    items: [
      { id: 'edit', label: 'Edit', icon: EditIconSvg, onClick: () => {} },
      { id: 'delete', label: 'Delete', icon: TrashIconSvg, destructive: true, onClick: () => {} },
    ],
    defaultOpen: true,
  },
};

/** All variants in one menu: default, with icon, disabled, destructive. Hover/focus visible on interaction. */
export const AllVariants: Story = {
  args: {
    trigger: <Button variant="secondary" size="small">All variants</Button>,
    items: [
      { id: 'plain', label: 'Plain item', onClick: () => {} },
      { id: 'with-icon', label: 'With icon', icon: EditIconSvg, onClick: () => {} },
      { id: 'disabled', label: 'Disabled item', disabled: true, onClick: () => {} },
      { id: 'destructive', label: 'Destructive', icon: TrashIconSvg, destructive: true, onClick: () => {} },
    ],
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows default item, item with icon, disabled item, and destructive item. Hover and keyboard focus states appear when you interact.',
      },
    },
  },
};

/** Ellipsis (“…”) trigger (IconButton). */
export const EllipsisTrigger: Story = {
  args: {
    trigger: (
      <IconButton
        icon={<img src={MoreHorizontalIconSvg} alt="" width={16} height={16} />}
        aria-label="More actions"
        variant="tertiary"
        size="small"
      />
    ),
    items: baseItems,
  },
};

/** Legacy usage: no trigger, parent controls position (e.g. from getBoundingClientRect). */
export const PositionedWithoutTrigger: Story = {
  args: {
    items: baseItems,
    position: { top: 80, left: 80 },
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu without a trigger; parent passes position. Typically used when opening from a custom button and positioning from its rect.',
      },
    },
  },
};
