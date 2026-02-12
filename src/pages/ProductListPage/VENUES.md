# NV and RX Use Cases

This app supports two venues:

- **NV** – New Verticals / METRO Supermarkets (default)
- **RX** – Restaurants / Lucky Burgers

## Structure

- **`venue.ts`** – `Venue` type and `VENUE_DISPLAY_NAMES`.
- **`data-nv.ts`** – NV product data and images from `src/images/NV` (fallback: `img_placeholder.png`).
- **`data-rx.ts`** – RX product data; images from `src/images/RX` with fallback `src/images/RX/img_placeholder.png`.
- **`data.ts`** – Facade: `getInitialProductsDataByVenue(venue)` and backward-compat `getInitialProductsData()` (NV).
- **`constants.ts`** – `getCategoryOptionsByVenue(venue)` for NV vs RX category lists.

## Switching

Click the **venue block** in the sidebar (venue name + avatar row) to toggle between NV and RX. The product list and category options update to the selected venue.

## Applying updates

**When adding or updating a feature, always clarify:**

- Should the change apply to **NV**, **RX**, or **both**?

Then implement accordingly (e.g. only in `data-nv.ts` / `data-rx.ts`, or in shared code).

## RX data

RX includes:

- 30 burgers (Burgers)
- Salads (Salads)
- Sides (Sides)
- Drinks (Drinks)
- Sauces (Sauces)

Categories for RX: Burgers, Salads, Sides, Drinks, Sauces.
