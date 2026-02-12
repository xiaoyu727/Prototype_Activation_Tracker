/**
 * Variant (Size) options per product type. Used on Create New Product and Product Detail.
 * Beverages → volume (cl, L); weight-based categories → weight (g, kg); others → size (S/M/L).
 * Variants block is hidden for RX (restaurant) regular dishes (burgers, sides, etc.).
 */

/** RX categories that are regular dishes – hide Variants block for these when venue is RX. */
export const RX_DISH_CATEGORIES = new Set([
  'Beef Burger',
  'Chicken Burger',
  'Beyond Meat Burger',
  'Vegetarian Burgers',
  'Snacks',
  'Cookies',
  'Extras',
]);

/**
 * Whether to show the Variants block. When venue is RX and category is a regular dish (burger, sides, etc.), returns false.
 */
export function shouldShowVariantsBlock(venue: string, category: string): boolean {
  if (venue === 'RX' && RX_DISH_CATEGORIES.has(category)) return false;
  return true;
}

/** Volume options for beverages (cl, L). */
export const VARIANT_OPTIONS_BEVERAGES = [
  '25cl',
  '33cl',
  '50cl',
  '100cl',
  '1L',
  '1.5L',
  'Small',
  'Medium',
  'Large',
];

/** Weight options for produce, seafood, meat, snacks, ready meals. */
export const VARIANT_OPTIONS_WEIGHT = [
  '125g',
  '250g',
  '300g',
  '350g',
  '500g',
  '750g',
  '1kg',
  'Small',
  'Medium',
  'Large',
];

/** Volume in ml for e.g. Facial Care. */
export const VARIANT_OPTIONS_VOLUME_ML = [
  '50ml',
  '100ml',
  '200ml',
  '250ml',
  '300ml',
  '400ml',
  '500ml',
  'Small',
  'Medium',
  'Large',
];

/** Generic size when no unit (cl/g/ml) is relevant. */
export const VARIANT_OPTIONS_SIZE = ['Small', 'Medium', 'Large'];

/** Categories that use weight-based variants (g/kg). */
const WEIGHT_CATEGORIES = new Set([
  'Fresh Fruits',
  'Fresh Vegetables',
  'Fresh Fish & Seafood',
  'Fresh Meat',
  'Ready Made Meals',
  'Snacks',
]);

/** Categories that use volume in ml (e.g. cosmetics). */
const VOLUME_ML_CATEGORIES = new Set(['Facial Care']);

/** Beverage-like categories (volume in cl/L). */
const BEVERAGE_CATEGORIES = new Set(['Beverages', 'Non-Alcoholic Drinks', 'Milk']);

function looksLikeBeverageFromName(name: string): boolean {
  return (
    /cola|fanta|sprite|pepsi|juice|water|smoothie|energy|red bull|monster|tea|coffee|milk|oat|almond|tonic|ginger|7up|lilt|dr pepper|gatorade|powerade/i.test(
      name
    )
  );
}

function hasWeightInName(name: string): boolean {
  return /\d+\s*g|\d+\s*kg/i.test(name);
}

function hasVolumeClInName(name: string): boolean {
  return /\d+\s*cl|\d+\s*L\b/i.test(name);
}

export interface VariantOptionsResult {
  options: string[];
  prefill: string[];
}

/**
 * Returns variant (Size) options and prefill for the given category and optional product name.
 * Used globally on Create New Product (from category + name) and Product Detail (from product).
 */
export function getVariantOptionsForProduct(
  category: string,
  productName?: string
): VariantOptionsResult {
  const name = productName ?? '';

  if (BEVERAGE_CATEGORIES.has(category) || looksLikeBeverageFromName(name)) {
    return {
      options: VARIANT_OPTIONS_BEVERAGES,
      prefill: ['33cl', '50cl', '100cl'],
    };
  }

  if (VOLUME_ML_CATEGORIES.has(category) || /\d+\s*ml/i.test(name)) {
    return {
      options: VARIANT_OPTIONS_VOLUME_ML,
      prefill: ['200ml', '500ml'],
    };
  }

  if (WEIGHT_CATEGORIES.has(category) || hasWeightInName(name)) {
    return {
      options: VARIANT_OPTIONS_WEIGHT,
      prefill: ['250g', '500g'],
    };
  }

  return {
    options: VARIANT_OPTIONS_SIZE,
    prefill: [],
  };
}
