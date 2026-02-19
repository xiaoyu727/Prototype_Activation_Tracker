import type { Product } from '../../pages/ProductListPage/types';

/** Which page the chat is being viewed from */
export type ChatPage = 'onboarding' | 'menu' | 'product-detail' | 'other';

/** Context fed into the AI mock engine */
export interface ChatContext {
  page: ChatPage;
  /** Product data summary for menu-related pages */
  products?: Product[];
  /** Currently viewed product (product detail page) */
  currentProduct?: Product;
  /** Onboarding tasks status */
  onboardingTasks?: { id: string; label: string; done: boolean }[];
  /** When true, the menu page was opened from onboarding "Set up your menu" task */
  fromOnboarding?: boolean;
}

/** Supported message content types */
export type MessageType =
  | 'text'
  | 'suggestion-card'
  | 'data-table'
  | 'action-confirmation'
  | 'progress-update'
  | 'image-upload'
  | 'image-match-preview';

/** A single item in a suggestion card or data table */
export interface MessageDataItem {
  id: string;
  name: string;
  detail?: string;
  actionLabel?: string;
}

/** A matched file-to-product pair for image-match-preview */
export interface ImageMatch {
  fileName: string;
  productId: string;
  productName: string;
}

/** A chat message */
export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  type: MessageType;
  text: string;
  /** Items for suggestion-card or data-table messages */
  items?: MessageDataItem[];
  /** Action buttons shown below the message */
  actions?: { label: string; actionId: string }[];
  /** For progress-update: 0-100 */
  progress?: number;
  /** For image-match-preview: matched files to products */
  imageMatches?: ImageMatch[];
  timestamp: number;
}

/** Suggested action chip */
export interface SuggestedChip {
  label: string;
  actionId: string;
}

/** Props for the ChatPanel component */
export interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  context: ChatContext;
  /** Callback when AI triggers an action on the page (e.g., filter products) */
  onAction?: (actionId: string, payload?: Record<string, unknown>) => void;
}
