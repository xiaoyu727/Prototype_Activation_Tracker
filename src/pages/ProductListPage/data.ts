/**
 * Product data facade: NV (METRO Supermarkets) and RX (Lucky Burgers).
 * Use getInitialProductsDataByVenue(venue) for venue-aware loading.
 */
import type { Product } from './types';
import type { Venue } from './venue';
import { getInitialProductsDataNV, productPlaceholderNV } from './data-nv';
import { getInitialProductsDataRX } from './data-rx';

export { productPlaceholderNV as productPlaceholder };

/** Default (NV) initial product list. Kept for backward compatibility. */
export function getInitialProductsData(): Product[] {
  return getInitialProductsDataNV();
}

/** Initial product list for the given venue (NV or RX). */
export function getInitialProductsDataByVenue(venue: Venue): Product[] {
  return venue === 'RX' ? getInitialProductsDataNV() : getInitialProductsDataRX();
}
