/**
 * Collections data for NV and RX. Images from src/images/NV/Collections and src/images/RX/Collections.
 */
import type { Venue } from './venue';

export interface Collection {
  id: string;
  name: string;
  image: string;
  /** Number of products in the collection. */
  itemCount: number;
  /** Time or date frame, e.g. "Available 7AM - 10AM" or "25/12/25 – 31/01/26" when Scheduled */
  availability: string;
  status: 'Active' | 'Inactive' | 'Scheduled';
  /** Number of stores (default 1). */
  storeCount?: number;
}

// NV: from src/images/NV/Collections
import nvBaseOffer from '../../images/NV/Collections/Base offer.png';
import nvEasterSpecials from '../../images/NV/Collections/Easter Specials.png';
import nvEndOfYearSale from '../../images/NV/Collections/End of Year Sale.png';
import nvLunchDeals from '../../images/NV/Collections/Lucnh deals.png';
import nvSummerDeals from '../../images/NV/Collections/Summer deals.png';

const COLLECTIONS_NV: Collection[] = [
  { id: 'nv-col-1', name: 'Boba Bloom Menu', image: nvBaseOffer, itemCount: 33, availability: 'Needs review', status: 'Inactive' },
];

// RX: from src/images/RX/Collections
import rxComboDeals from '../../images/RX/Collections/Combo deals.png';
import rxNewArrivals from '../../images/RX/Collections/New arrivals.png';
import rxSeasonalOffer from '../../images/RX/Collections/Seasonal offer.png';

const COLLECTIONS_RX: Collection[] = [
  { id: 'rx-col-1', name: 'Seasonal offers', image: rxSeasonalOffer, itemCount: 6, availability: 'Available 7AM - 10AM', status: 'Active' },
  { id: 'rx-col-2', name: 'Combo deals', image: rxComboDeals, itemCount: 4, availability: '1/04/26 – 31/04/26', status: 'Scheduled' },
  { id: 'rx-col-3', name: 'New arrivals', image: rxNewArrivals, itemCount: 10, availability: 'Available 11AM - 2AM', status: 'Inactive' },
];

export function getCollectionsByVenue(venue: Venue): Collection[] {
  return venue === 'RX' ? [...COLLECTIONS_NV] : [...COLLECTIONS_RX];
}
