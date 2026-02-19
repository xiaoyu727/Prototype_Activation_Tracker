import type React from 'react';
import type { ChatContext } from '../ChatPanel/types';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  /** Route path for navigation. When set, clicking the item navigates to this path. */
  path?: string;
}

export interface SidebarProps {
  /** Whether the sidebar is expanded (labels, sections, chat input) or collapsed (icons only). */
  expanded: boolean;
  /** Called when user toggles expanded state. */
  onExpandedChange: (expanded: boolean) => void;
  /** Logo image URL. Required – provide from Figma/assets. */
  logoSrc: string;
  /** Alt text for the logo. */
  logoAlt?: string;
  /** Venue avatar image URL (circular, top). Required – provide from Figma/assets. */
  venueAvatarSrc: string;
  /** Alt text for the venue avatar. */
  venueAvatarAlt?: string;
  /** Venue display name (e.g. "METRO Supermarkets"). Shown in expanded state only. */
  venueName?: string;
  /** Main nav items: Home, Search, Inbox. Each needs icon (16x16, color #FBFBFB). */
  mainNavItems: SidebarNavItem[];
  /** Tools section items: Menu, Orders, Money, Analytics, Marketing, Settings. Shown under "Tools" when expanded. */
  toolsNavItems: SidebarNavItem[];
  /** Placeholder for bottom chat input when expanded. Default "Ask us anything". */
  chatInputPlaceholder?: string;
  /** Called when send button (purple circle) is clicked. */
  onSendClick?: () => void;
  /** Called when venue block (name/avatar row) is clicked. Use to switch between NV and RX. */
  onVenueSwitch?: () => void;
  /** Whether the AI chat panel is currently open */
  chatOpen?: boolean;
  /** Called when the AI chat toggle button is clicked */
  onChatToggle?: () => void;
  /** Badge count for AI chat (issues to resolve, etc.) */
  chatBadgeCount?: number;
  /** Context for the AI chat (current page, product data, etc.) */
  chatContext?: ChatContext;
  /** Callback when AI triggers an action on the page (e.g., filter products) */
  onChatAction?: (actionId: string, payload?: Record<string, unknown>) => void;
}
