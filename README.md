# MX Pedregal Portal Prototype

A high-fidelity prototype for a product catalog management portal.


## Quick Start

### Standalone Development (Recommended)

```bash
cd apps/mx-pedregal-portal-proto

# Install dependencies (standalone mode)
pnpm install --ignore-workspace --no-frozen-lockfile

# Start dev server
npm run dev

# Or start Storybook for component development
npm run storybook
```

### With Monorepo

If the monorepo dependencies are properly installed:

```bash
pnpm --filter mx-pedregal-portal-proto dev
```

## Features

- Product list with search and filtering
- Grid and list view toggles
- Status badges (Active/Inactive)
- Category filtering
- Pagination
- Design token system for consistent styling
- Storybook component playground

## Tech Stack

- React 18 + TypeScript
- Vite for development/build
- Storybook 7 for component development
- Custom design token system

## Components

The prototype includes several reusable components:

- **Button** - Primary, secondary, tertiary variants
- **IconButton** - Icon-only buttons
- **Badge** - Status indicators
- **Search** - Search input with icon
- **FilterChip** - Filter selection chips
- **ProductCard** - Product display cards
- **Checkbox** - Selection controls
- **Pagination** - Page navigation

## Design Tokens

Design tokens are in the `tokens/` directory:

```typescript
import { tokens } from './tokens';

// Use in styles
const styles = {
  padding: tokens.usage.spacing.medium,
  color: tokens.semantic.colors.text.neutral,
};
```

## Development

### Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run storybook` - Start Storybook
- `npm run build` - Build for production
- `npm run typecheck` - TypeScript type checking
