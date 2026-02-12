/**
 * Semantic Tokens
 * 
 * Human-readable token names that provide clear intent.
 * These are the primary tokens designers should use.
 */

export { semanticColors, type SemanticColors } from './colors';

import { semanticColors } from './colors';

export const semantic = {
  colors: semanticColors,
} as const;

export type SemanticTokens = typeof semantic;
