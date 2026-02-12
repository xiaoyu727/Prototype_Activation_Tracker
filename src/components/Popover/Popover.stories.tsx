import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverListItem, type PopoverGroup } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Single Select Example (no checkmark, legacy)
export const SingleSelect: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const items: PopoverListItem[] = [
      { id: '1', label: 'Option 1', selected: selectedId === '1', onClick: (id) => setSelectedId(id) },
      { id: '2', label: 'Option 2', selected: selectedId === '2', onClick: (id) => setSelectedId(id) },
      { id: '3', label: 'Option 3', selected: selectedId === '3', onClick: (id) => setSelectedId(id) },
      { id: '4', label: 'Option 4', selected: selectedId === '4', onClick: (id) => setSelectedId(id) },
      { id: '5', label: 'Option 5 (Disabled)', selected: false, onClick: (id) => setSelectedId(id), disabled: true },
    ];

    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedId || 'None'}</p>
        <Popover
          template="single-select"
          items={items}
          size="medium"
          position={{ top: 40, left: 0 }}
        />
      </div>
    );
  },
};

/** Option = Single selection, Size = Medium: one option selectable with checkmark next to selected item. */
export const SingleSelectMedium: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single selection with checkmark next to the selected item. Size = Medium (40px row height).',
      },
    },
  },
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('2');

    const items: PopoverListItem[] = [
      { id: '1', label: 'Option 1', selected: selectedId === '1', onClick: (id) => setSelectedId(id) },
      { id: '2', label: 'Option 2', selected: selectedId === '2', onClick: (id) => setSelectedId(id) },
      { id: '3', label: 'Option 3', selected: selectedId === '3', onClick: (id) => setSelectedId(id) },
      { id: '4', label: 'Option 4', selected: selectedId === '4', onClick: (id) => setSelectedId(id) },
      { id: '5', label: 'Option 5 (Disabled)', selected: false, onClick: () => {}, disabled: true },
    ];

    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedId || 'None'}</p>
        <Popover
          template="single-select"
          size="medium"
          items={items}
          position={{ top: 40, left: 0 }}
        />
      </div>
    );
  },
};

// Checkboxes Example
export const Checkboxes: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const items: PopoverListItem[] = [
      { id: '1', label: 'Checkbox Option 1', selected: selectedIds.includes('1') },
      { id: '2', label: 'Checkbox Option 2', selected: selectedIds.includes('2') },
      { id: '3', label: 'Checkbox Option 3', selected: selectedIds.includes('3') },
      { id: '4', label: 'Checkbox Option 4', selected: selectedIds.includes('4') },
      { id: '5', label: 'Checkbox Option 5', selected: selectedIds.includes('5') },
    ];

    const handleItemChange = (id: string, selected: boolean) => {
      if (selected) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    };

    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedIds.join(', ') || 'None'}</p>
        <Popover
          template="checkboxes"
          items={items}
          onItemChange={handleItemChange}
          position={{ top: 40, left: 0 }}
        />
      </div>
    );
  },
};

/** Option = Multiple, Size = Medium: checkboxes, 40px row height. */
export const MultipleMedium: Story = {
  parameters: {
    docs: { description: { story: 'Multiple selection (checkboxes), Size = Medium (40px row).' } },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const items: PopoverListItem[] = [
      { id: '1', label: 'Option 1', selected: selectedIds.includes('1') },
      { id: '2', label: 'Option 2', selected: selectedIds.includes('2') },
      { id: '3', label: 'Option 3', selected: selectedIds.includes('3') },
      { id: '4', label: 'Option 4', selected: selectedIds.includes('4') },
    ];
    const handleItemChange = (id: string, selected: boolean) => {
      if (selected) setSelectedIds((prev) => [...prev, id]);
      else setSelectedIds((prev) => prev.filter((x) => x !== id));
    };
    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedIds.join(', ') || 'None'}</p>
        <Popover template="checkboxes" size="medium" items={items} onItemChange={handleItemChange} position={{ top: 40, left: 0 }} />
      </div>
    );
  },
};

/** Option = Multiple, Size = Small: checkboxes, 32px row height. */
export const MultipleSmall: Story = {
  parameters: {
    docs: { description: { story: 'Multiple selection (checkboxes), Size = Small (32px row).' } },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const items: PopoverListItem[] = [
      { id: '1', label: 'Option 1', selected: selectedIds.includes('1') },
      { id: '2', label: 'Option 2', selected: selectedIds.includes('2') },
      { id: '3', label: 'Option 3', selected: selectedIds.includes('3') },
      { id: '4', label: 'Option 4', selected: selectedIds.includes('4') },
    ];
    const handleItemChange = (id: string, selected: boolean) => {
      if (selected) setSelectedIds((prev) => [...prev, id]);
      else setSelectedIds((prev) => prev.filter((x) => x !== id));
    };
    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedIds.join(', ') || 'None'}</p>
        <Popover template="checkboxes" size="small" items={items} onItemChange={handleItemChange} position={{ top: 40, left: 0 }} />
      </div>
    );
  },
};

// Checkboxes with Select All
export const CheckboxesWithSelectAll: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const items: PopoverListItem[] = [
      { id: '1', label: 'Checkbox Option 1', selected: selectedIds.includes('1') },
      { id: '2', label: 'Checkbox Option 2', selected: selectedIds.includes('2') },
      { id: '3', label: 'Checkbox Option 3', selected: selectedIds.includes('3') },
      { id: '4', label: 'Checkbox Option 4', selected: selectedIds.includes('4') },
      { id: '5', label: 'Checkbox Option 5', selected: selectedIds.includes('5') },
    ];

    const allSelected = selectedIds.length === items.length;

    const handleItemChange = (id: string, selected: boolean) => {
      if (selected) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    };

    const handleSelectAll = (selected: boolean) => {
      if (selected) {
        setSelectedIds(items.map((item) => item.id));
      } else {
        setSelectedIds([]);
      }
    };

    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedIds.join(', ') || 'None'}</p>
        <Popover
          template="checkboxes"
          items={items}
          showSelectAll
          allSelected={allSelected}
          onItemChange={handleItemChange}
          onSelectAll={handleSelectAll}
          position={{ top: 40, left: 0 }}
        />
      </div>
    );
  },
};

// Radio Buttons Example
export const RadioButtons: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>('1');

    const items: PopoverListItem[] = [
      { id: '1', label: 'Radio Option 1', selected: selectedId === '1' },
      { id: '2', label: 'Radio Option 2', selected: selectedId === '2' },
      { id: '3', label: 'Radio Option 3', selected: selectedId === '3' },
      { id: '4', label: 'Radio Option 4', selected: selectedId === '4' },
      { id: '5', label: 'Radio Option 5 (Disabled)', selected: selectedId === '5', disabled: true },
    ];

    const handleItemChange = (id: string) => {
      setSelectedId(id);
    };

    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedId}</p>
        <Popover
          template="radios"
          items={items}
          onItemChange={handleItemChange}
          radioGroupName="example-radio-group"
          position={{ top: 40, left: 0 }}
        />
      </div>
    );
  },
};

// Nested Interaction Example
export const NestedInteraction: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);
    const [showSubPopover, setShowSubPopover] = useState(false);

    const categoryItems: PopoverListItem[] = [
      {
        id: 'category1',
        label: 'Category 1 (Click to see options)',
        onClick: (id) => {
          setSelectedCategory(id);
          setShowSubPopover(true);
        },
      },
      {
        id: 'category2',
        label: 'Category 2',
        onClick: (id) => {
          setSelectedCategory(id);
          setShowSubPopover(false);
        },
      },
      {
        id: 'category3',
        label: 'Category 3',
        onClick: (id) => {
          setSelectedCategory(id);
          setShowSubPopover(false);
        },
      },
    ];

    const subItems: PopoverListItem[] = [
      { id: 'sub1', label: 'Sub Option 1', selected: selectedSubOptions.includes('sub1') },
      { id: 'sub2', label: 'Sub Option 2', selected: selectedSubOptions.includes('sub2') },
      { id: 'sub3', label: 'Sub Option 3', selected: selectedSubOptions.includes('sub3') },
    ];

    const handleSubItemChange = (id: string, selected: boolean) => {
      if (selected) {
        setSelectedSubOptions([...selectedSubOptions, id]);
      } else {
        setSelectedSubOptions(selectedSubOptions.filter((item) => item !== id));
      }
    };

    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>
          Selected Category: {selectedCategory || 'None'}
          <br />
          Selected Sub-Options: {selectedSubOptions.join(', ') || 'None'}
        </p>
        
        {/* Main Popover */}
        <Popover
          template="single-select"
          items={categoryItems}
          position={{ top: 60, left: 0 }}
        />

        {/* Nested Popover (appears when Category 1 is selected) */}
        {showSubPopover && (
          <Popover
            template="checkboxes"
            items={subItems}
            onItemChange={handleSubItemChange}
            width={200}
            position={{ top: 60, left: 260 }}
          />
        )}
      </div>
    );
  },
};

/** Option = Nested, Size = Medium: parent opens sub-popover with checkboxes, 40px rows. */
export const NestedMedium: Story = {
  parameters: {
    docs: { description: { story: 'Nested: main list opens a sub-popover with checkboxes. Size = Medium (40px).' } },
  },
  render: () => {
    const [selectedSub, setSelectedSub] = useState<string[]>([]);
    const [showSub, setShowSub] = useState(false);
    const mainItems: PopoverListItem[] = [
      { id: 'a', label: 'Group A →', onClick: (id) => setShowSub(id === 'a') },
      { id: 'b', label: 'Group B', onClick: (id) => setShowSub(id === 'a') },
    ];
    const subItems: PopoverListItem[] = [
      { id: 'a1', label: 'Option A1', selected: selectedSub.includes('a1') },
      { id: 'a2', label: 'Option A2', selected: selectedSub.includes('a2') },
    ];
    const handleSub = (id: string, selected: boolean) => {
      if (selected) setSelectedSub((p) => [...p, id]);
      else setSelectedSub((p) => p.filter((x) => x !== id));
    };
    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Sub selected: {selectedSub.join(', ') || 'None'}</p>
        <Popover template="single-select" size="medium" items={mainItems} position={{ top: 40, left: 0 }} />
        {showSub && (
          <Popover template="checkboxes" size="medium" items={subItems} onItemChange={handleSub} position={{ top: 40, left: 250 }} />
        )}
      </div>
    );
  },
};

/** Option = Nested, Size = Small: parent opens sub-popover, 32px rows. */
export const NestedSmall: Story = {
  parameters: {
    docs: { description: { story: 'Nested with Size = Small (32px row).' } },
  },
  render: () => {
    const [selectedSub, setSelectedSub] = useState<string[]>([]);
    const [showSub, setShowSub] = useState(false);
    const mainItems: PopoverListItem[] = [
      { id: 'a', label: 'Group A →', onClick: (id) => setShowSub(id === 'a') },
      { id: 'b', label: 'Group B', onClick: (id) => setShowSub(id === 'a') },
    ];
    const subItems: PopoverListItem[] = [
      { id: 'a1', label: 'Option A1', selected: selectedSub.includes('a1') },
      { id: 'a2', label: 'Option A2', selected: selectedSub.includes('a2') },
    ];
    const handleSub = (id: string, selected: boolean) => {
      if (selected) setSelectedSub((p) => [...p, id]);
      else setSelectedSub((p) => p.filter((x) => x !== id));
    };
    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Sub selected: {selectedSub.join(', ') || 'None'}</p>
        <Popover template="single-select" size="small" items={mainItems} position={{ top: 40, left: 0 }} />
        {showSub && (
          <Popover template="checkboxes" size="small" items={subItems} onItemChange={handleSub} position={{ top: 40, left: 250 }} />
        )}
      </div>
    );
  },
};

/** Option = Grouped, Size = Medium: sections with headers + checkboxes, 40px rows. */
export const GroupedMedium: Story = {
  parameters: {
    docs: { description: { story: 'Grouped checkboxes with section headers. Size = Medium (40px row).' } },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const handleChange = (id: string, selected: boolean) => {
      if (selected) setSelectedIds((p) => [...p, id]);
      else setSelectedIds((p) => p.filter((x) => x !== id));
    };
    const groups: PopoverGroup[] = [
      {
        label: 'Group 1',
        items: [
          { id: 'g1a', label: 'Option A', selected: selectedIds.includes('g1a') },
          { id: 'g1b', label: 'Option B', selected: selectedIds.includes('g1b') },
        ],
      },
      {
        label: 'Group 2',
        items: [
          { id: 'g2a', label: 'Option A', selected: selectedIds.includes('g2a') },
          { id: 'g2b', label: 'Option B', selected: selectedIds.includes('g2b') },
        ],
      },
    ];
    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedIds.join(', ') || 'None'}</p>
        <Popover template="checkboxes" size="medium" groups={groups} items={[]} onItemChange={handleChange} position={{ top: 40, left: 0 }} />
      </div>
    );
  },
};

/** Option = Grouped, Size = Small: sections with headers + checkboxes, 32px rows. */
export const GroupedSmall: Story = {
  parameters: {
    docs: { description: { story: 'Grouped checkboxes, Size = Small (32px row).' } },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const handleChange = (id: string, selected: boolean) => {
      if (selected) setSelectedIds((p) => [...p, id]);
      else setSelectedIds((p) => p.filter((x) => x !== id));
    };
    const groups: PopoverGroup[] = [
      {
        label: 'Group 1',
        items: [
          { id: 'g1a', label: 'Option A', selected: selectedIds.includes('g1a') },
          { id: 'g1b', label: 'Option B', selected: selectedIds.includes('g1b') },
        ],
      },
      {
        label: 'Group 2',
        items: [
          { id: 'g2a', label: 'Option A', selected: selectedIds.includes('g2a') },
          { id: 'g2b', label: 'Option B', selected: selectedIds.includes('g2b') },
        ],
      },
    ];
    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <p style={{ marginBottom: '20px' }}>Selected: {selectedIds.join(', ') || 'None'}</p>
        <Popover template="checkboxes" size="small" groups={groups} items={[]} onItemChange={handleChange} position={{ top: 40, left: 0 }} />
      </div>
    );
  },
};

// Custom Width Example
export const CustomWidth: Story = {
  render: () => {
    const items: PopoverListItem[] = [
      { id: '1', label: 'This is a longer option text', onClick: () => {} },
      { id: '2', label: 'Another long option', onClick: () => {} },
      { id: '3', label: 'Wide popover example', onClick: () => {} },
    ];

    return (
      <div style={{ padding: '100px', position: 'relative' }}>
        <Popover
          template="single-select"
          items={items}
          width={320}
          position={{ top: 40, left: 0 }}
        />
      </div>
    );
  },
};
