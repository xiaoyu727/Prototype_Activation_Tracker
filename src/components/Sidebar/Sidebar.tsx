import React, { useState } from 'react';
import { tokens } from '../../../tokens';
import type { SidebarProps } from './types';
import aiChatImage from '../../images/AI-chat.png';
import aiImage from '../../images/AI.png';
import plusSmallSvg from '../../icons/16/Plus small.svg';
import dockLeftFillSvg from '../../icons/16/dock-left-fill.svg';
import swapSvg from '../../icons/16/swap.svg';

const SIDEBAR_WIDTH_COLLAPSED = 64;
const SIDEBAR_WIDTH_EXPANDED = 320;
const ICON_COLOR = '#FBFBFB';
/** Dock (expand/collapse) icon: color/light-graphite-12 */
const DOCK_ICON_COLOR = '#7D7D7D';
const HOVER_BG = '#2c2c2c';
const SECTION_LABEL_COLOR = '#9B9B9B';
const INPUT_BG = '#2c2c2c';
const SEND_BUTTON_PURPLE = '#6B4EFF';

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function NavItemRow({
  item,
  expanded,
  iconColor,
  hoverBg,
  borderRadius,
  paddingLeft,
}: {
  item: { id: string; label: string; icon: React.ReactNode; active?: boolean };
  expanded: boolean;
  iconColor: string;
  hoverBg: string;
  borderRadius: number;
  paddingLeft: string | number;
}) {
  const [hover, setHover] = React.useState(false);
  const bg = item.active ? hoverBg : hover ? hoverBg : 'transparent';
  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: expanded ? 'flex-start' : 'center',
        width: expanded ? '100%' : '40px',
        minWidth: expanded ? undefined : '40px',
        height: '40px',
        padding: expanded ? '2px 4px' : 0,
        borderRadius: `${borderRadius}px`,
        cursor: 'pointer',
        backgroundColor: bg,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', flexShrink: 0, color: iconColor }}>
        {item.icon}
      </div>
      {expanded && (
        <span
          style={{
            marginLeft: '12px',
            fontFamily: tokens.usage.typography.label.small.default.fontFamily,
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            color: iconColor,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.label}
        </span>
      )}
    </div>
  );
}

export const Sidebar: React.FC<SidebarProps> = ({
  expanded,
  onExpandedChange,
  logoSrc,
  logoAlt = 'Logo',
  venueAvatarSrc,
  venueAvatarAlt = 'Venue',
  venueName,
  mainNavItems,
  toolsNavItems,
  chatInputPlaceholder = 'Ask us anything',
  onSendClick,
  onVenueSwitch,
}) => {
  const width = expanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;
  const borderRadius = tokens.usage.borderRadius.large;
  const paddingLeft = '8px';
  const [logoAreaHover, setLogoAreaHover] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width,
        minWidth: width,
        backgroundColor: tokens.colors.brand.sidebarBg,
        padding: expanded ? '24px 16px 16px 16px' : '24px 12px 16px 12px',
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'width 0.2s ease, min-width 0.2s ease, padding 0.2s ease',
        boxSizing: 'border-box',
      }}
    >
      {/* Top row: Logo (or dock-left icon on hover when collapsed) + collapse control (expanded). Container always 40x40 when collapsed. */}
      <div
        role={expanded ? undefined : 'button'}
        tabIndex={expanded ? undefined : 0}
        onClick={expanded ? undefined : () => onExpandedChange(true)}
        onKeyDown={expanded ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExpandedChange(true); } }}
        onMouseEnter={expanded ? undefined : () => setLogoAreaHover(true)}
        onMouseLeave={expanded ? undefined : () => setLogoAreaHover(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'space-between' : 'center',
          width: expanded ? '100%' : '40px',
          height: '40px',
          minWidth: expanded ? undefined : '40px',
          marginBottom: '16px',
          paddingLeft: expanded ? '2px' : 0,
          paddingRight: expanded ? '2px' : 0,
          borderRadius: 0,
          cursor: expanded ? undefined : 'pointer',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      >
        {expanded ? (
          <img
            src={logoSrc}
            alt={logoAlt}
            style={{ width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0, objectFit: 'cover' }}
          />
        ) : logoAreaHover ? (
          <div
            role="img"
            aria-label="Expand sidebar"
            style={{
              width: '16px',
              height: '16px',
              flexShrink: 0,
              borderRadius: 0,
              padding: 0,
              backgroundColor: DOCK_ICON_COLOR,
              maskImage: `url(${dockLeftFillSvg})`,
              maskSize: '16px 16px',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${dockLeftFillSvg})`,
              WebkitMaskSize: '16px 16px',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              animation: 'sidebarIconFadeIn 0.2s ease',
            }}
          />
        ) : (
          <img
            src={logoSrc}
            alt={logoAlt}
            style={{ width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0, objectFit: 'cover' }}
          />
        )}
        {expanded && (
          <button
            type="button"
            onClick={() => onExpandedChange(false)}
            aria-label="Collapse sidebar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              border: 'none',
              background: 'transparent',
              borderRadius: `${borderRadius}px`,
              cursor: 'pointer',
              color: ICON_COLOR,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = HOVER_BG;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div
              role="img"
              aria-hidden
              style={{
                width: '16px',
                height: '16px',
                flexShrink: 0,
                borderRadius: 0,
                padding: 0,
                backgroundColor: DOCK_ICON_COLOR,
                maskImage: `url(${dockLeftFillSvg})`,
                maskSize: '16px 16px',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: `url(${dockLeftFillSvg})`,
                WebkitMaskSize: '16px 16px',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                animation: 'sidebarIconFadeIn 0.2s ease',
              }}
            />
          </button>
        )}
      </div>

      {/* Venue block: avatar + (expanded) name, "Venue", switch icon. Click to switch NV/RX when onVenueSwitch provided. */}
      <div
        role={onVenueSwitch ? 'button' : undefined}
        tabIndex={onVenueSwitch ? 0 : undefined}
        onClick={onVenueSwitch}
        onKeyDown={onVenueSwitch ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onVenueSwitch(); } } : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'flex-start' : 'center',
          width: expanded ? '100%' : '40px',
          minWidth: expanded ? undefined : '40px',
          minHeight: '40px',
          marginBottom: '16px',
          padding: '0 2px',
          borderRadius: 12,
          cursor: onVenueSwitch ? 'pointer' : 'pointer',
          transition: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = HOVER_BG;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 0,
            overflow: 'hidden',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'none',
          }}
        >
          <img
            src={venueAvatarSrc}
            alt={venueAvatarAlt}
            style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '8px', transition: 'none' }}
          />
        </div>
        {expanded && (
          <>
            <div style={{ marginLeft: '12px', flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  color: ICON_COLOR,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {venueName ?? 'Venue'}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: SECTION_LABEL_COLOR,
                }}
              >
                Venue
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                flexShrink: 0,
                borderRadius: 0,
                padding: 0,
              }}
            >
              <div
                role="img"
                aria-hidden
                style={{
                  width: '16px',
                  height: '16px',
                  flexShrink: 0,
                  borderRadius: 0,
                  backgroundColor: tokens.semantic.colors.text.subdued,
                  maskImage: `url(${swapSvg})`,
                  maskSize: '16px 16px',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${swapSvg})`,
                  WebkitMaskSize: '16px 16px',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Main nav: Home, Search, Inbox */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {mainNavItems.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            expanded={expanded}
            iconColor={ICON_COLOR}
            hoverBg={HOVER_BG}
            borderRadius={borderRadius}
            paddingLeft={paddingLeft}
          />
        ))}
      </div>

      {/* Collapsed: separator line. Expanded: "Tools" heading */}
      {expanded ? (
        <div
          style={{
            marginTop: '16px',
            marginBottom: '8px',
            paddingLeft,
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '16px',
            color: SECTION_LABEL_COLOR,
            letterSpacing: '0.02em',
          }}
        >
          Tools
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: SECTION_LABEL_COLOR,
            margin: '8px 0',
            opacity: 0.5,
          }}
        />
      )}

      {/* Tools nav: Menu, Orders, Money, Analytics, Marketing, Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {toolsNavItems.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            expanded={expanded}
            iconColor={ICON_COLOR}
            hoverBg={HOVER_BG}
            borderRadius={borderRadius}
            paddingLeft={paddingLeft}
          />
        ))}
      </div>

      {/* Expanded: "Add solutions" section */}
      {expanded && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '16px',
              marginBottom: '8px',
              paddingLeft,
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '16px',
                color: SECTION_LABEL_COLOR,
                letterSpacing: '0.02em',
              }}
            >
              Add solutions
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                color: ICON_COLOR,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 0,
                  backgroundColor: DOCK_ICON_COLOR,
                  maskImage: `url(${plusSmallSvg})`,
                  maskSize: '16px 16px',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${plusSmallSvg})`,
                  WebkitMaskSize: '16px 16px',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* Spacer */}
      <div style={{ flex: 1, minHeight: 16 }} />

      {/* Bottom: collapsed = 40x40 container with 28x28 image; expanded = full-width AI-chat image */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? undefined : 'center',
          width: expanded ? '100%' : '40px',
          height: expanded ? '76px' : '40px',
          marginTop: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          borderRadius: 0,
        }}
      >
        {expanded ? (
          <img
            src={aiChatImage}
            alt=""
            role="presentation"
            style={{
              width: '100%',
              height: '76px',
              objectFit: 'cover',
              objectPosition: 'left center',
              borderRadius: 0,
            }}
          />
        ) : (
          <img
            src={aiImage}
            alt="Send"
            role="button"
            tabIndex={0}
            onClick={onSendClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSendClick?.(); } }}
            style={{
              width: '28px',
              height: '28px',
              objectFit: 'contain',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
