import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '200px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

/**
 * Default product card with image
 */
export const Default: Story = {
  args: {
    id: '1',
    name: 'Apples Pink Lady 1000g',
    price: '€3.85',
    image: 'https://via.placeholder.com/120',
    selected: false,
  },
};

/**
 * Selected product card
 */
export const Selected: Story = {
  args: {
    id: '2',
    name: 'Bananas Fresh 1000g',
    price: '€2.99',
    image: 'https://via.placeholder.com/120',
    selected: true,
  },
};

/**
 * Product card without image
 */
export const NoImage: Story = {
  args: {
    id: '3',
    name: 'Product Without Image',
    price: '€5.49',
    selected: false,
  },
};

/**
 * Long product name (truncates to 2 lines)
 */
export const LongName: Story = {
  args: {
    id: '4',
    name: 'Extra Long Product Name That Should Truncate After Two Lines Of Text',
    price: '€12.99',
    image: 'https://via.placeholder.com/120',
    selected: false,
  },
};

/**
 * Interactive card with callbacks
 */
export const Interactive: Story = {
  args: {
    id: '5',
    name: 'Interactive Product',
    price: '€7.50',
    image: 'https://via.placeholder.com/120',
    selected: false,
    onToggleSelect: (id) => console.log('Toggle select:', id),
    onClick: () => console.log('Card clicked'),
    onMoreClick: (e) => {
      e.stopPropagation();
      console.log('More menu clicked');
    },
  },
};

/**
 * Grid layout example
 */
export const GridLayout: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px',
          width: '800px',
          padding: '20px',
        }}
      >
        <ProductCard
          id="1"
          name="Apples Pink Lady 1000g"
          price="€3.85"
          image="https://via.placeholder.com/120"
          selected={false}
        />
        <ProductCard
          id="2"
          name="Bananas Fresh 1000g"
          price="€2.99"
          image="https://via.placeholder.com/120"
          selected={true}
        />
        <ProductCard
          id="3"
          name="Oranges Valencia 1000g"
          price="€3.99"
          image="https://via.placeholder.com/120"
          selected={false}
        />
        <ProductCard
          id="4"
          name="Grapes Thompson Seedless 500g"
          price="€6.99"
          image="https://via.placeholder.com/120"
          selected={false}
        />
        <ProductCard
          id="5"
          name="Strawberries Fresh 250g"
          price="€4.49"
          image="https://via.placeholder.com/120"
          selected={true}
        />
      </div>
    ),
  ],
  args: {},
};
