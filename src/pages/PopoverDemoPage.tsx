import React, { useState } from 'react';
import { Popover, PopoverListItem, Button } from '../components';
import { tokens } from '../../tokens';

/**
 * PopoverDemoPage - Demonstrates the Popover component with nested interactions
 */
export const PopoverDemoPage: React.FC = () => {
  // Single Select State
  const [showSingleSelect, setShowSingleSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Checkbox State
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  // Radio State
  const [showRadios, setShowRadios] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<string>('radio1');

  // Nested Popover State
  const [showNestedMain, setShowNestedMain] = useState(false);
  const [showNestedSub, setShowNestedSub] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);

  // Single Select Items
  const singleSelectItems: PopoverListItem[] = [
    { id: 'option1', label: 'First Option', onClick: (id) => setSelectedOption(id) },
    { id: 'option2', label: 'Second Option', onClick: (id) => setSelectedOption(id) },
    { id: 'option3', label: 'Third Option', onClick: (id) => setSelectedOption(id) },
    { id: 'option4', label: 'Fourth Option', onClick: (id) => setSelectedOption(id) },
    { id: 'option5', label: 'Disabled Option', onClick: (id) => setSelectedOption(id), disabled: true },
  ];

  // Checkbox Items
  const checkboxItems: PopoverListItem[] = [
    { id: 'check1', label: 'Checkbox Option 1', selected: selectedCheckboxes.includes('check1') },
    { id: 'check2', label: 'Checkbox Option 2', selected: selectedCheckboxes.includes('check2') },
    { id: 'check3', label: 'Checkbox Option 3', selected: selectedCheckboxes.includes('check3') },
    { id: 'check4', label: 'Checkbox Option 4', selected: selectedCheckboxes.includes('check4') },
    { id: 'check5', label: 'Checkbox Option 5', selected: selectedCheckboxes.includes('check5') },
  ];

  // Radio Items
  const radioItems: PopoverListItem[] = [
    { id: 'radio1', label: 'Radio Option 1', selected: selectedRadio === 'radio1' },
    { id: 'radio2', label: 'Radio Option 2', selected: selectedRadio === 'radio2' },
    { id: 'radio3', label: 'Radio Option 3', selected: selectedRadio === 'radio3' },
    { id: 'radio4', label: 'Radio Option 4', selected: selectedRadio === 'radio4' },
  ];

  // Nested Main Items
  const nestedMainItems: PopoverListItem[] = [
    {
      id: 'category1',
      label: 'Fruits (Click to see options) →',
      onClick: (id) => {
        setSelectedCategory(id);
        setShowNestedSub(true);
      },
    },
    {
      id: 'category2',
      label: 'Vegetables →',
      onClick: (id) => {
        setSelectedCategory(id);
        setShowNestedSub(false);
      },
    },
    {
      id: 'category3',
      label: 'Dairy Products →',
      onClick: (id) => {
        setSelectedCategory(id);
        setShowNestedSub(false);
      },
    },
  ];

  // Nested Sub Items (only shown for "Fruits" category)
  const nestedSubItems: PopoverListItem[] = [
    { id: 'apple', label: 'Apple', selected: selectedSubOptions.includes('apple') },
    { id: 'banana', label: 'Banana', selected: selectedSubOptions.includes('banana') },
    { id: 'orange', label: 'Orange', selected: selectedSubOptions.includes('orange') },
    { id: 'grape', label: 'Grape', selected: selectedSubOptions.includes('grape') },
  ];

  // Handlers
  const handleCheckboxChange = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedCheckboxes(checkboxItems.map((item) => item.id));
    } else {
      setSelectedCheckboxes([]);
    }
  };

  const handleRadioChange = (id: string) => {
    setSelectedRadio(id);
  };

  const handleNestedSubChange = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedSubOptions([...selectedSubOptions, id]);
    } else {
      setSelectedSubOptions(selectedSubOptions.filter((item) => item !== id));
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: tokens.usage.typography.label.small.default.fontFamily,
        backgroundColor: tokens.semantic.colors.background.subdued,
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '24px',
          color: tokens.semantic.colors.text.neutral,
        }}
      >
        Popover Component Demo
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}
      >
        {/* Single Select Demo */}
        <div
          style={{
            backgroundColor: tokens.semantic.colors.surface.raised,
            padding: '24px',
            borderRadius: `${tokens.usage.borderRadius.medium}px`,
            position: 'relative',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 590,
              marginBottom: '16px',
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Single Select
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: tokens.semantic.colors.text.subdued,
              marginBottom: '16px',
            }}
          >
            Click the button to open a single-select popover.
          </p>
          <Button
            variant="secondary"
            onClick={() => setShowSingleSelect(!showSingleSelect)}
          >
            {showSingleSelect ? 'Close Popover' : 'Open Popover'}
          </Button>
          <p
            style={{
              fontSize: '14px',
              marginTop: '16px',
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Selected: <strong>{selectedOption || 'None'}</strong>
          </p>
          {showSingleSelect && (
            <Popover
              template="single-select"
              items={singleSelectItems}
              position={{ top: 140, left: 24 }}
            />
          )}
        </div>

        {/* Checkboxes Demo */}
        <div
          style={{
            backgroundColor: tokens.semantic.colors.surface.raised,
            padding: '24px',
            borderRadius: `${tokens.usage.borderRadius.medium}px`,
            position: 'relative',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 590,
              marginBottom: '16px',
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Checkboxes with Select All
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: tokens.semantic.colors.text.subdued,
              marginBottom: '16px',
            }}
          >
            Multiple selections with a "Select All" option.
          </p>
          <Button
            variant="secondary"
            onClick={() => setShowCheckboxes(!showCheckboxes)}
          >
            {showCheckboxes ? 'Close Popover' : 'Open Popover'}
          </Button>
          <p
            style={{
              fontSize: '14px',
              marginTop: '16px',
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Selected: <strong>{selectedCheckboxes.join(', ') || 'None'}</strong>
          </p>
          {showCheckboxes && (
            <Popover
              template="checkboxes"
              items={checkboxItems}
              showSelectAll
              allSelected={selectedCheckboxes.length === checkboxItems.length}
              onItemChange={handleCheckboxChange}
              onSelectAll={handleSelectAll}
              position={{ top: 140, left: 24 }}
            />
          )}
        </div>

        {/* Radio Buttons Demo */}
        <div
          style={{
            backgroundColor: tokens.semantic.colors.surface.raised,
            padding: '24px',
            borderRadius: `${tokens.usage.borderRadius.medium}px`,
            position: 'relative',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 590,
              marginBottom: '16px',
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Radio Buttons
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: tokens.semantic.colors.text.subdued,
              marginBottom: '16px',
            }}
          >
            Single selection from a group of options.
          </p>
          <Button
            variant="secondary"
            onClick={() => setShowRadios(!showRadios)}
          >
            {showRadios ? 'Close Popover' : 'Open Popover'}
          </Button>
          <p
            style={{
              fontSize: '14px',
              marginTop: '16px',
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Selected: <strong>{selectedRadio}</strong>
          </p>
          {showRadios && (
            <Popover
              template="radios"
              items={radioItems}
              onItemChange={handleRadioChange}
              radioGroupName="demo-radio-group"
              position={{ top: 140, left: 24 }}
            />
          )}
        </div>

        {/* Nested Interaction Demo */}
        <div
          style={{
            backgroundColor: tokens.semantic.colors.surface.raised,
            padding: '24px',
            borderRadius: `${tokens.usage.borderRadius.medium}px`,
            position: 'relative',
            gridColumn: '1 / -1',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 590,
              marginBottom: '16px',
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            Nested Interactions
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: tokens.semantic.colors.text.subdued,
              marginBottom: '16px',
            }}
          >
            Click on a category to open a nested popover with checkboxes. Try clicking on "Fruits" to see the sub-options.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setShowNestedMain(!showNestedMain);
              if (!showNestedMain) {
                setShowNestedSub(false);
              }
            }}
          >
            {showNestedMain ? 'Close Popover' : 'Open Popover'}
          </Button>
          <div style={{ marginTop: '16px' }}>
            <p
              style={{
                fontSize: '14px',
                marginBottom: '8px',
                color: tokens.semantic.colors.text.neutral,
              }}
            >
              Selected Category: <strong>{selectedCategory || 'None'}</strong>
            </p>
            <p
              style={{
                fontSize: '14px',
                color: tokens.semantic.colors.text.neutral,
              }}
            >
              Selected Fruits: <strong>{selectedSubOptions.join(', ') || 'None'}</strong>
            </p>
          </div>

          {/* Main Popover */}
          {showNestedMain && (
            <Popover
              template="single-select"
              items={nestedMainItems}
              position={{ top: 180, left: 24 }}
            />
          )}

          {/* Nested Sub Popover (only shown when Fruits is selected) */}
          {showNestedMain && showNestedSub && selectedCategory === 'category1' && (
            <Popover
              template="checkboxes"
              items={nestedSubItems}
              onItemChange={handleNestedSubChange}
              width={220}
              position={{ top: 180, left: 284 }}
            />
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: tokens.semantic.colors.surface.raised,
          borderRadius: `${tokens.usage.borderRadius.medium}px`,
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 590,
            marginBottom: '16px',
            color: tokens.semantic.colors.text.neutral,
          }}
        >
          Features
        </h2>
        <ul
          style={{
            fontSize: '14px',
            lineHeight: '24px',
            color: tokens.semantic.colors.text.neutral,
            paddingLeft: '20px',
          }}
        >
          <li>Three interaction templates: Single-select, Checkboxes, and Radio buttons</li>
          <li>Optional "Select All" functionality for checkboxes</li>
          <li>Support for nested popovers (popover triggers another popover)</li>
          <li>Disabled state support for individual items</li>
          <li>Customizable width and positioning</li>
          <li>Hover states with smooth transitions</li>
          <li>Built with design tokens for consistency</li>
          <li>Fully accessible with keyboard navigation</li>
        </ul>
      </div>
    </div>
  );
};
