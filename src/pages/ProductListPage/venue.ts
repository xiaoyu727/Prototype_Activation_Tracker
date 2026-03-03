/**
 * Use case / venue identifier.
 * - NV: New Verticals (METRO Supermarkets)
 * - RX: Restaurants (Lucky Burgers)
 */
export type Venue = 'NV' | 'RX';

export const VENUE_DISPLAY_NAMES: Record<Venue, string> = {
  NV: 'METRO Supermarkets',
  RX: 'Boba Bloom',
};
