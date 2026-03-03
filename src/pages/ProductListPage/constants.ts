import type { ColumnConfig } from '../../components/Modal';
import type { Venue } from './venue';

export const ITEMS_PER_PAGE = 50;

export const DEFAULT_COLUMN_CONFIG: ColumnConfig[] = [
  { id: 'name', label: 'Name', selected: true, isCore: true },
  { id: 'category', label: 'Category', selected: true, isCore: true },
  { id: 'price', label: 'Price', selected: true, isCore: true },
  { id: 'status', label: 'Status', selected: true, isCore: true },
  { id: 'quality-score', label: 'Quality score', selected: false, isCore: false },
  { id: 'gtin', label: 'GTIN', selected: false, isCore: false },
];

/** NV (Boba Bloom) category options. */
export const CATEGORY_OPTIONS = [
  'Most ordered',
  'Specials',
  'Fruit tea',
  'Milk tea',
  'Signature drinks',
];

/** RX (Burgeramt Prenzlauer Berg) category options. */
export const CATEGORY_OPTIONS_RX = [
  'Beef Burger',
  'Chicken Burger',
  'Beyond Meat Burger',
  'Vegetarian Burgers',
  'Snacks',
  'Cookies',
  'Extras',
  'Non-Alcoholic Drinks',
];

/** Category options for the given venue. */
export function getCategoryOptionsByVenue(venue: Venue): string[] {
  return venue === 'RX' ? CATEGORY_OPTIONS : CATEGORY_OPTIONS_RX;
}

/** Global category list (supermarkets + restaurants) for product forms. Used on both Create New Product and Product Detail. */
export const CATEGORY_OPTIONS_GLOBAL: string[] = [
  ...CATEGORY_OPTIONS,
  ...CATEGORY_OPTIONS_RX,
];

export const STATUS_OPTIONS: Array<'Active' | 'Inactive'> = ['Active', 'Inactive'];

/** Filter IDs to display labels (for filter popover parent list) */
export const FILTER_LABELS: Record<string, string> = {
  'status': 'Status',
  'image-coverage': 'Image coverage',
  'description-coverage': 'Description coverage',
  'discount': 'Discount',
  'product-catalog': 'Product catalog',
  'gtin': 'GTIN',
  'duplicates': 'Duplicates',
  'brand': 'Brand',
  'venue-overrides': 'Venue overrides',
};
