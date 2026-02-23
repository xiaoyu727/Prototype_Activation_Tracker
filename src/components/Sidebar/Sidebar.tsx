import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokens } from '../../../tokens';
import type { SidebarProps } from './types';
import type { ChatMessage, SuggestedChip } from '../ChatPanel/types';
import { getGreeting, getSuggestedChips, generateResponse } from '../ChatPanel/mockEngine';
import CheckCircleFillSvg from '../../icons/24/check-circle-fill.svg';
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

/** Dark-theme chat colors */
const CHAT_AI_BUBBLE_BG = 'rgba(255,255,255,0.06)';
const CHAT_USER_BUBBLE_BG = 'rgba(255,255,255,0.15)';
const CHAT_TEXT_COLOR = '#FBFBFB';
const CHAT_CHIP_BORDER = 'rgba(255,255,255,0.15)';
const CHAT_SUBDUED = '#9B9B9B';

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
  onClick,
}: {
  item: { id: string; label: string; icon: React.ReactNode; active?: boolean };
  expanded: boolean;
  iconColor: string;
  hoverBg: string;
  borderRadius: number;
  paddingLeft: string | number;
  onClick?: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  const bg = item.active ? hoverBg : hover ? hoverBg : 'transparent';
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
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
  chatOpen,
  onChatToggle,
  chatBadgeCount = 0,
  chatContext,
  onChatAction,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const width = expanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;
  const borderRadius = tokens.usage.borderRadius.large;
  const paddingLeft = '8px';
  const [logoAreaHover, setLogoAreaHover] = useState(false);

  /* ---- Chat state (managed internally) ---- */
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatChips, setChatChips] = useState<SuggestedChip[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatInitializedRef = useRef(false);

  const scrollChatToBottom = useCallback(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (chatOpen && expanded && chatContext && !chatInitializedRef.current) {
      chatInitializedRef.current = true;
      setChatMessages(getGreeting(chatContext));
      setChatChips(getSuggestedChips(chatContext));
    }
  }, [chatOpen, expanded, chatContext]);

  useEffect(() => { scrollChatToBottom(); }, [chatMessages, scrollChatToBottom]);

  useEffect(() => {
    if (chatOpen && expanded) chatInputRef.current?.focus();
  }, [chatOpen, expanded]);

  const handleChatAIResponse = useCallback((input: string, actionId: string | null) => {
    if (!chatContext) return;
    setChatTyping(true);
    setTimeout(() => {
      const responses = generateResponse(input, actionId, chatContext);
      setChatMessages((prev) => [...prev, ...responses]);
      setChatTyping(false);
    }, 600 + Math.random() * 400);
  }, [chatContext]);

  const handleChatSend = useCallback(() => {
    const text = chatInput.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`, role: 'user', type: 'text', text, timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    handleChatAIResponse(text, null);
  }, [chatInput, handleChatAIResponse]);

  const handleChatChipClick = useCallback((chip: SuggestedChip) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`, role: 'user', type: 'text', text: chip.label, timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    handleChatAIResponse(chip.label, chip.actionId);
  }, [handleChatAIResponse]);

  const handleFileDrop = useCallback(() => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`, role: 'user', type: 'text',
      text: 'Dropped images', timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    handleChatAIResponse('', 'guide-confirm-images');
  }, [handleChatAIResponse]);

  const FORWARDED_ACTIONS = new Set([
    'navigate-menu', 'filter-no-image', 'apply-all-allergens',
    'guide-allergens', 'guide-apply-allergens',
    'guide-images', 'guide-apply-matched-images',
    'navigate-home',
    'guide-business-details', 'guide-people', 'guide-tax', 'guide-bank',
    'verify-saved-business', 'verify-saved-people', 'verify-saved-tax', 'verify-saved-bank',
  ]);

  const handleChatActionClick = useCallback((actionId: string) => {
    if (FORWARDED_ACTIONS.has(actionId)) {
      onChatAction?.(actionId);
    }
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`, role: 'user', type: 'text', text: `[Action: ${actionId}]`, timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    handleChatAIResponse('', actionId);
  }, [handleChatAIResponse, onChatAction]);

  const showChatView = chatOpen && expanded && chatContext;

  const isNavItemActive = (item: { path?: string; active?: boolean }) => {
    if (item.active !== undefined) return item.active;
    const path = item.path;
    if (path == null) return false;
    if (path === '/menu') return pathname === '/menu' || pathname.startsWith('/product');
    return pathname === path;
  };

  const getNavItemClickHandler = (path: string | undefined) => {
    if (path == null || path === '#') return undefined;
    return () => navigate(path);
  };

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

      {showChatView ? (
        /* ============= CHAT VIEW (replaces nav) ============= */
        <>
          {/* Context label */}
          <div style={{
            fontSize: 12, fontWeight: 500, lineHeight: '16px', color: CHAT_SUBDUED,
            paddingLeft: 6, marginBottom: 12, flexShrink: 0,
          }}>
            {chatContext.page === 'menu' ? 'Opened Menu' : chatContext.page === 'onboarding' ? 'Onboarding' : chatContext.page === 'product-detail' ? 'Product Detail' : 'Store'}
          </div>

          {/* Message thread (scrollable) */}
          <div style={{
            flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10,
            paddingRight: 2, minHeight: 0,
            scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          }}>
            {chatMessages.map((msg) => (
              <DarkMessageBubble key={msg.id} message={msg} onActionClick={handleChatActionClick} onFileDrop={handleFileDrop} />
            ))}
            {chatTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 0' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: CHAT_SUBDUED, animation: 'pulse 1s infinite' }} />
                <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: CHAT_SUBDUED, animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: CHAT_SUBDUED, animation: 'pulse 1s infinite 0.4s' }} />
              </div>
            )}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Action chips */}
          {chatChips.length > 0 && (
            <div style={{
              display: 'flex', gap: 6, flexWrap: 'wrap', padding: '10px 0',
              flexShrink: 0,
            }}>
              {chatChips.map((chip) => (
                <button
                  key={chip.actionId}
                  type="button"
                  onClick={() => handleChatChipClick(chip)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '5px 12px',
                    borderRadius: 9999, border: `1px solid ${CHAT_CHIP_BORDER}`, backgroundColor: 'transparent',
                    cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                    fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 13, fontWeight: 600, color: CHAT_TEXT_COLOR,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 0', flexShrink: 0,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, flex: 1,
              backgroundColor: INPUT_BG, borderRadius: 12, padding: '0 12px', height: 40,
            }}>
              {/* + icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M8 3v10M3 8h10" stroke={CHAT_SUBDUED} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={chatInputRef}
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
                placeholder="Or ask anything else..."
                style={{
                  flex: 1, height: '100%', border: 'none', outline: 'none',
                  backgroundColor: 'transparent',
                  fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 13, fontWeight: 500,
                  color: CHAT_TEXT_COLOR,
                }}
              />
              {/* Attachment icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, cursor: 'pointer' }}>
                <path d="M14 8l-5.3 5.3a3.5 3.5 0 01-5 0 3.5 3.5 0 010-5L9.5 2.5a2 2 0 012.8 0 2 2 0 010 2.8l-5.8 5.8a.5.5 0 01-.7 0 .5.5 0 010-.7L11 5.2" stroke={CHAT_SUBDUED} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            {/* Send button */}
            <button
              type="button"
              onClick={handleChatSend}
              disabled={!chatInput.trim()}
              style={{
                width: 32, height: 32, borderRadius: 9999, border: 'none',
                background: chatInput.trim() ? 'linear-gradient(135deg, #8B5CF6, #A855F7)' : 'rgba(255,255,255,0.08)',
                cursor: chatInput.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 0.2s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 14V2M8 2L3 7M8 2L13 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        /* ============= NORMAL NAV VIEW ============= */
        <>
          {/* Main nav: Home, Search, Inbox */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {mainNavItems.map((item) => (
              <NavItemRow
                key={item.id}
                item={{ ...item, active: isNavItemActive(item) }}
                expanded={expanded}
                iconColor={ICON_COLOR}
                hoverBg={HOVER_BG}
                borderRadius={borderRadius}
                paddingLeft={paddingLeft}
                onClick={getNavItemClickHandler(item.path)}
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
                item={{ ...item, active: isNavItemActive(item) }}
                expanded={expanded}
                iconColor={ICON_COLOR}
                hoverBg={HOVER_BG}
                borderRadius={borderRadius}
                paddingLeft={paddingLeft}
                onClick={getNavItemClickHandler(item.path)}
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

          {/* Bottom: AI chat toggle */}
          <div
            role="button"
            tabIndex={0}
            onClick={onChatToggle ?? onSendClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (onChatToggle ?? onSendClick)?.(); } }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: expanded ? 'flex-start' : 'center',
              width: expanded ? '100%' : '40px',
              height: expanded ? '48px' : '40px',
              marginTop: 'auto',
              padding: expanded ? '0 8px' : 0,
              borderRadius: 12,
              cursor: 'pointer',
              backgroundColor: chatOpen ? '#3B2E7A' : 'transparent',
              transition: 'background-color 0.15s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              if (!chatOpen) e.currentTarget.style.backgroundColor = HOVER_BG;
            }}
            onMouseLeave={(e) => {
              if (!chatOpen) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* AI icon — purple gradient circle with sparkle */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, position: 'relative',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" fill="white" />
              </svg>
              {/* Badge */}
              {chatBadgeCount > 0 && (
                <div style={{
                  position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16,
                  borderRadius: 9999, backgroundColor: '#EF4444', border: '2px solid #191919',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 4px', boxSizing: 'border-box',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, fontFamily: tokens.base.typography.fontFamily.brand }}>
                    {chatBadgeCount > 99 ? '99+' : chatBadgeCount}
                  </span>
                </div>
              )}
            </div>
            {expanded && (
              <div style={{ marginLeft: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                  fontSize: 14, fontWeight: 500, lineHeight: '20px', color: ICON_COLOR,
                }}>
                  {chatInputPlaceholder}
                </span>
                <ChevronRightIcon />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const UploadCloudIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke={CHAT_SUBDUED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 16.7C21.2 15.9 22 14.5 22 13C22 10.8 20.4 8.9 18.2 8.5C17.7 5.4 15.1 3 12 3C8.7 3 6 5.7 6 9C6 9.2 6 9.3 6 9.5C3.7 10.1 2 12.1 2 14.5C2 17 3.8 19 6.5 19" stroke={CHAT_SUBDUED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ImageFileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke={CHAT_SUBDUED} strokeWidth="1.2"/>
    <circle cx="6" cy="6" r="1.5" stroke={CHAT_SUBDUED} strokeWidth="1"/>
    <path d="M2 11L5.5 7.5L8 10L10 8L14 12" stroke={CHAT_SUBDUED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/** Dark-themed message bubble for sidebar chat */
function DarkMessageBubble({ message, onActionClick, onFileDrop }: {
  message: ChatMessage;
  onActionClick: (actionId: string) => void;
  onFileDrop?: () => void;
}) {
  const isUser = message.role === 'user';
  const [dragOver, setDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (isUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          maxWidth: '85%', padding: '8px 12px', borderRadius: '12px 12px 4px 12px',
          backgroundColor: CHAT_USER_BUBBLE_BG, color: CHAT_TEXT_COLOR,
          fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 13, fontWeight: 500, lineHeight: '18px',
        }}>
          {message.text}
        </div>
      </div>
    );
  }

  // Image upload drop zone
  if (message.type === 'image-upload') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: '95%' }}>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFileDrop?.();
          }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '20px 12px',
            borderRadius: 12,
            border: `2px dashed ${dragOver ? 'rgba(107,78,255,0.7)' : CHAT_CHIP_BORDER}`,
            backgroundColor: dragOver ? 'rgba(107,78,255,0.08)' : 'rgba(255,255,255,0.03)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, background-color 0.2s ease',
          }}
        >
          <UploadCloudIcon />
          <span style={{
            fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 13, fontWeight: 600,
            color: CHAT_TEXT_COLOR, textAlign: 'center',
          }}>
            Drag images here
          </span>
          <span style={{
            fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 11, fontWeight: 500,
            color: CHAT_SUBDUED, textAlign: 'center',
          }}>
            or <span style={{ color: '#8B7AFF', textDecoration: 'underline' }}>browse files</span>
          </span>
          <span style={{
            fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 10, fontWeight: 500,
            color: CHAT_SUBDUED, marginTop: 2,
          }}>
            {message.text}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={() => { onFileDrop?.(); }}
          />
        </div>
      </div>
    );
  }

  // Image match preview
  if (message.type === 'image-match-preview' && message.imageMatches) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: '95%' }}>
        <div style={{
          padding: '8px 12px', borderRadius: '12px 12px 12px 4px',
          backgroundColor: CHAT_AI_BUBBLE_BG,
          fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 13, fontWeight: 500, lineHeight: '18px',
          color: CHAT_TEXT_COLOR, whiteSpace: 'pre-line',
        }}>
          {message.text}
        </div>

        <div style={{
          padding: '6px 10px', borderRadius: 10, border: `1px solid ${CHAT_CHIP_BORDER}`,
          backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {message.imageMatches.map((match, i) => (
            <div key={match.productId} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
              borderBottom: i < message.imageMatches!.length - 1 ? `1px solid ${CHAT_CHIP_BORDER}` : 'none',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                backgroundColor: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ImageFileIcon />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minWidth: 0 }}>
                <span style={{
                  fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 11, fontWeight: 500,
                  color: CHAT_SUBDUED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {match.fileName}
                </span>
                <span style={{
                  fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 12, fontWeight: 600,
                  color: CHAT_TEXT_COLOR, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  → {match.productName}
                </span>
              </div>
            </div>
          ))}
        </div>

        {message.actions && message.actions.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {message.actions.map((action) => (
              <button
                key={action.actionId}
                type="button"
                onClick={() => onActionClick(action.actionId)}
                style={{
                  padding: '5px 12px', borderRadius: 9999, border: `1px solid ${CHAT_CHIP_BORDER}`,
                  backgroundColor: 'transparent', color: CHAT_TEXT_COLOR, cursor: 'pointer',
                  fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 12, fontWeight: 700,
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: '95%' }}>
      <div style={{
        padding: '8px 12px', borderRadius: '12px 12px 12px 4px',
        backgroundColor: message.type === 'action-confirmation' ? 'rgba(50,122,52,0.2)' : CHAT_AI_BUBBLE_BG,
        fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 13, fontWeight: 500, lineHeight: '18px',
        color: CHAT_TEXT_COLOR, whiteSpace: 'pre-line',
      }}>
        {message.type === 'action-confirmation' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
            <img src={CheckCircleFillSvg} alt="" style={{ width: 14, height: 14, filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontWeight: 700, fontSize: 12 }}>Done</span>
          </div>
        )}
        {message.text}
      </div>

      {/* Items list */}
      {message.items && message.items.length > 0 && (
        <div style={{
          padding: '6px 10px', borderRadius: 10, border: `1px solid ${CHAT_CHIP_BORDER}`,
          backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {(message.type === 'suggestion-card') && message.text && (
            <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 11, fontWeight: 700, color: CHAT_SUBDUED, marginBottom: 1 }}>
              {message.text}
            </span>
          )}
          {message.items.map((item, idx) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, padding: '3px 0', borderBottom: idx < message.items!.length - 1 ? `1px solid ${CHAT_CHIP_BORDER}` : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minWidth: 0 }}>
                <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 12, fontWeight: 600, color: CHAT_TEXT_COLOR, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                {item.detail && (
                  <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 11, fontWeight: 500, color: CHAT_SUBDUED }}>{item.detail}</span>
                )}
              </div>
              {item.actionLabel && (
                <button
                  type="button"
                  onClick={() => onActionClick(item.id)}
                  style={{
                    padding: '2px 6px', borderRadius: 6, border: `1px solid ${CHAT_CHIP_BORDER}`, backgroundColor: 'transparent',
                    cursor: 'pointer', fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 10, fontWeight: 600, color: CHAT_TEXT_COLOR, flexShrink: 0,
                  }}
                >
                  {item.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {message.actions && message.actions.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {message.actions.map((action) => (
            <button
              key={action.actionId}
              type="button"
              onClick={() => onActionClick(action.actionId)}
              style={{
                padding: '5px 12px', borderRadius: 9999, border: `1px solid ${CHAT_CHIP_BORDER}`,
                backgroundColor: 'transparent', color: CHAT_TEXT_COLOR, cursor: 'pointer',
                fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 12, fontWeight: 700,
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
