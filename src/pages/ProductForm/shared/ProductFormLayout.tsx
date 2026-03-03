import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../../../tokens';
import { Sidebar } from '../../../components/Sidebar';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import type { BreadcrumbItem } from '../../../components/Breadcrumbs';
import { getBadgeCount } from '../../../components/ChatPanel';
import type { ChatContext } from '../../../components/ChatPanel';
import { ProductFormActionBar } from './ProductFormActionBar';
import type { Product } from '../../ProductListPage/types';
import type { Venue } from '../../ProductListPage/venue';
import { VENUE_DISPLAY_NAMES } from '../../ProductListPage/venue';
import pedregalLogo from '../../../images/.Nav/Pedregal.svg';
import bobaBloomLogoSidebar from '../../../images/boba-bloom-logo.png';
import burgeramtLogoImage from '../../../images/RX/Burgeramt Prenzlauer Berg.avif';
import HomeLineSvg from '../../../icons/16/home-line.svg';
import SearchLineSvg from '../../../icons/16/search-line.svg';
import ChatDefaultLineSvg from '../../../icons/16/chat-default-line.svg';
import MenuEditLineSvg from '../../../icons/16/menu-edit-line.svg';
import OrderBagLineSvg from '../../../icons/16/order-bag-line.svg';
import CoinBagLineSvg from '../../../icons/16/coin-bag-line.svg';
import DashboardLineSvg from '../../../icons/16/dashboard-line.svg';
import PromoBullhornLineSvg from '../../../icons/16/promo-bullhorn-line.svg';
import SettingsLineSvg from '../../../icons/16/settings-line.svg';

/**
 * Shared layout for Product Detail View and Create New Product pages.
 * Renders Sidebar + main content area with header (breadcrumbs, title, subtitle, actions) and two columns (left + right).
 * Page-specific content is passed as props.
 */

function SidebarIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      role="presentation"
      style={{ width: 16, height: 16, flexShrink: 0, filter: 'brightness(0) invert(1)' }}
    />
  );
}

export interface ProductFormLayoutProps {
  venue: Venue;
  sidebarExpanded: boolean;
  onSidebarExpandedChange: (expanded: boolean) => void;
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  subtitle?: React.ReactNode;
  headerActions: React.ReactNode;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  /** When true, shows sticky action bar (Cancel + Save product) at bottom. */
  showActionBar?: boolean;
  onActionBarCancel?: () => void;
  onActionBarSaveProduct?: () => void;
  /** Current product being viewed/edited (for AI chat context) */
  currentProduct?: Product;
}

export const ProductFormLayout: React.FC<ProductFormLayoutProps> = ({
  venue,
  sidebarExpanded,
  onSidebarExpandedChange,
  breadcrumbItems,
  title,
  subtitle,
  headerActions,
  leftColumn,
  rightColumn,
  showActionBar = false,
  onActionBarCancel,
  onActionBarSaveProduct,
  currentProduct,
}) => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  const chatContext: ChatContext = {
    page: 'product-detail',
    currentProduct,
  };
  const chatBadgeCount = getBadgeCount(chatContext);

  const handleChatAction = useCallback((_actionId: string) => {
    // Product detail chat actions (e.g., applying descriptions/allergens) handled here
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        backgroundColor: tokens.colors.brand.sidebarBg,
        overflow: 'hidden',
      }}
    >
      <Sidebar
        expanded={sidebarExpanded}
        onExpandedChange={onSidebarExpandedChange}
        logoSrc={pedregalLogo}
        logoAlt="Pedregal"
        venueAvatarSrc={venue === 'NV' ? burgeramtLogoImage : bobaBloomLogoSidebar}
        venueAvatarAlt={venue === 'NV' ? 'METRO Supermarkets' : 'Boba Bloom'}
        venueName={VENUE_DISPLAY_NAMES[venue]}
        onVenueSwitch={() => navigate('/menu', { state: { venue } })}
        mainNavItems={[
          { id: 'home', label: 'Home', icon: <SidebarIcon src={HomeLineSvg} />, path: '/' },
          { id: 'search', label: 'Search', icon: <SidebarIcon src={SearchLineSvg} />, path: '#' },
          { id: 'inbox', label: 'Inbox', icon: <SidebarIcon src={ChatDefaultLineSvg} />, path: '#' },
        ]}
        toolsNavItems={[
          { id: 'menu', label: 'Menu', icon: <SidebarIcon src={MenuEditLineSvg} />, path: '/menu' },
          { id: 'orders', label: 'Orders', icon: <SidebarIcon src={OrderBagLineSvg} />, path: '#' },
          { id: 'money', label: 'Money', icon: <SidebarIcon src={CoinBagLineSvg} />, path: '#' },
          { id: 'analytics', label: 'Analytics', icon: <SidebarIcon src={DashboardLineSvg} />, path: '#' },
          { id: 'marketing', label: 'Marketing', icon: <SidebarIcon src={PromoBullhornLineSvg} />, path: '#' },
          { id: 'settings', label: 'Settings', icon: <SidebarIcon src={SettingsLineSvg} />, path: '#' },
        ]}
        chatInputPlaceholder="Ask us anything"
        onSendClick={() => { setChatOpen((o) => !o); if (!sidebarExpanded) onSidebarExpandedChange(true); }}
        chatOpen={chatOpen}
        onChatToggle={() => { setChatOpen((o) => !o); if (!sidebarExpanded) onSidebarExpandedChange(true); }}
        chatBadgeCount={chatBadgeCount}
        chatContext={chatContext}
        onChatAction={handleChatAction}
      />

      <div style={{ display: 'flex', flex: 1, padding: '8px 8px 8px 0', minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            backgroundColor: '#F8F8F8',
            borderRadius: '32px',
            overflow: 'hidden',
            overflowY: 'auto',
            paddingBottom: showActionBar ? 100 : 0,
          }}
        >
          {/* Header: sticky at top with gradient + blur */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              padding: '32px 48px',
              background: 'linear-gradient(0deg, rgba(247, 247, 247, 0) -11.05%, rgba(248, 248, 248, 0.9) 42.15%)',
              backdropFilter: 'blur(5.55px)',
              WebkitBackdropFilter: 'blur(5.55px)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Breadcrumbs items={breadcrumbItems} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    flex: 1,
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      fontFamily: tokens.base.typography.fontFamily.brand,
                      fontSize: `${tokens.usage.typography.display.large.fontSize}px`,
                      fontWeight: tokens.usage.typography.display.large.fontWeight,
                      lineHeight: `${tokens.usage.typography.display.large.lineHeight}px`,
                      letterSpacing: tokens.usage.typography.display.large.letterSpacing,
                      color: '#202125',
                    }}
                  >
                    {title}
                  </h1>
                  {subtitle != null && (
                    <p
                      style={{
                        margin: 0,
                        fontFamily:
                          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: tokens.semantic.colors.text.subdued,
                      }}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{headerActions}</div>
              </div>
            </div>
          </div>

          {/* Two columns: left sections, right Preview; 16px gap between them */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              padding: '0 48px 48px',
              flex: 1,
              minHeight: 0,
              width: '100%',
              boxSizing: 'border-box',
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              backgroundColor: tokens.colors.ui.bg.surfaceSecondary,
            }}
          >
            <div
              style={{
                flex: '1 1 0%',
                minWidth: 0,
                width: '100%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                paddingBottom: 24,
              }}
            >
              {leftColumn}
            </div>
            {rightColumn}
          </div>

          {showActionBar && onActionBarCancel != null && onActionBarSaveProduct != null && (
            <ProductFormActionBar
              visible={showActionBar}
              onCancel={onActionBarCancel}
              onSaveProduct={onActionBarSaveProduct}
            />
          )}
        </div>
      </div>

    </div>
  );
};
