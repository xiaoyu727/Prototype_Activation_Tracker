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
}
