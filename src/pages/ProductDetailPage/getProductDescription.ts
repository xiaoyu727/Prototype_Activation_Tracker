import type { Product } from '../ProductListPage/types';

/**
 * Returns a placeholder description when the product has no real description.
 * Realistic, neutral, and consistent with the product or menu context.
 */
export function getProductDescription(product: Product): string {
  const { name, category, brand } = product;
  const brandPart = brand ? `${brand} ` : '';
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('burger') || categoryLower.includes('fries') || categoryLower.includes('chicken')) {
    return `${brandPart}${name} is a menu item in the ${category} category. Prepared with quality ingredients for a satisfying option.`;
  }
  if (categoryLower.includes('fruit') || categoryLower.includes('fish') || categoryLower.includes('seafood')) {
    return `${brandPart}${name} is a ${category} product. Ideal for everyday cooking and healthy eating.`;
  }
  if (categoryLower.includes('facial') || categoryLower.includes('care')) {
    return `${brandPart}${name} is part of our ${category} range. Designed for effective daily use.`;
  }
  if (categoryLower.includes('meal') || categoryLower.includes('ready')) {
    return `${brandPart}${name} is a convenient ${category.toLowerCase()} option. Ready to enjoy with minimal preparation.`;
  }
  return `${brandPart}${name} is available in the ${category} category. A reliable choice for your needs.`;
}
