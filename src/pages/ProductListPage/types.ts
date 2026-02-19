/** EU LMIV 14 declarable allergens */
export const EU_ALLERGENS = [
  'Celery', 'Cereals containing gluten', 'Crustaceans', 'Eggs', 'Fish',
  'Lupin', 'Milk', 'Molluscs', 'Mustard', 'Nuts', 'Peanuts', 'Sesame',
  'Soy', 'Sulphites',
] as const;

export type Allergen = typeof EU_ALLERGENS[number];

/** Product row type for the product list table */
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  status: 'Active' | 'Inactive';
  image?: string;
  brand?: string;
  qualityScore?: number; // 0-100
  gtin?: string; // 13-digit GTIN
  description?: string;
  allergens?: Allergen[];
  /** true = merchant has confirmed allergens (even if the list is empty / allergen-free) */
  allergensDeclared?: boolean;
}
