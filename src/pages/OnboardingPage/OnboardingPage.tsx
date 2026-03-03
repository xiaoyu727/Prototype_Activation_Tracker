/**
 * Onboarding (Home) page.
 * Route: /
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarState } from '../../contexts/SidebarStateContext';
import { tokens } from '../../../tokens';
import { Button } from '../../components/Button';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Sidebar } from '../../components/Sidebar';
import {
  ListCell,
  List,
} from '@doordash/prism-react';
import type { Venue } from '../ProductListPage/venue';
import { VENUE_DISPLAY_NAMES } from '../ProductListPage/venue';
import pedregalLogo from '../../images/.Nav/Pedregal.svg';
import bobaBloomLogoSidebar from '../../images/boba-bloom-logo.png';
import burgeramtLogoImage from '../../images/RX/Burgeramt Prenzlauer Berg.avif';
import HomeLineSvg from '../../icons/16/home-line.svg';
import SearchLineSvg from '../../icons/16/search-line.svg';
import ChatDefaultLineSvg from '../../icons/16/chat-default-line.svg';
import MenuEditLineSvg from '../../icons/16/menu-edit-line.svg';
import OrderBagLineSvg from '../../icons/16/order-bag-line.svg';
import CoinBagLineSvg from '../../icons/16/coin-bag-line.svg';
import DashboardLineSvg from '../../icons/16/dashboard-line.svg';
import PromoBullhornLineSvg from '../../icons/16/promo-bullhorn-line.svg';
import SettingsLineSvg from '../../icons/16/settings-line.svg';
import CheckCircleFillSvg from '../../icons/24/check-circle-fill.svg';
import ChevronRightSvg from '../../icons/16/chevron-right.svg';
import ChevronLeftSvg from '../../icons/16/chevron-left.svg';
import EditLineSvg from '../../icons/16/edit-line.svg';
import CaretDownSvg from '../../icons/16/caret-down.svg';
import PersonPlusSvg from '../../icons/24/person-plus.svg';
import CloseSvg from '../../icons/24/close.svg';
import CalendarLineSvg from '../../icons/24/calendar-line.svg';
import LinkExternalLineSvg from '../../icons/24/link-external-line.svg';
import PersonUserFillSvg from '../../icons/24/person-user-fill.svg';
import LockedLineSvg from '../../icons/24/locked-line.svg';
import CaretRightSvg from '../../icons/24/caret-right.svg';
import mapBobaBloom from '../../images/map-boba-bloom.png';
import LogoDoordashSvg from '../../icons/16/logo-doordash.svg';
import VehicleCarSvg from '../../icons/16/vehicle-car.svg';
import VenueSvg from '../../icons/16/venue.svg';
import ArrowUpRightSvg from '../../icons/16/arrow-up-right.svg';
import MerchantLineSvg from '../../icons/16/merchant-line.svg';
import WarningLineSvg from '../../icons/16/warning-line.svg';
import CheckSvg from '../../icons/16/check.svg';

type TabletDeliveryStatus = 'ordered' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'activated' | 'delayed';
const TABLET_DEMO_SEQUENCE: TabletDeliveryStatus[] = ['ordered', 'in-transit', 'out-for-delivery', 'delivered', 'activated'];
const DEMO_STEP_DELAY = 2000;
import StarFillSvg from '../../icons/16/star-fill.svg';
import TvLineSvg from '../../icons/16/tv-line.svg';
import DevicePhoneSvg from '../../icons/16/device-phone.svg';
import ViewExpandSvg from '../../icons/24/view-expand.svg';
import PhotoLineSvg from '../../icons/24/photo-line.svg';
import ViewCollapseSvg from '../../icons/24/view-collapse.svg';
import StatusDotOpenSvg from '../../icons/24/status-dot-open-monocolor.svg';
import InfoLine24Svg from '../../icons/24/info-line.svg';
import CalendarAddFillSvg from '../../icons/24/calendar-add-fill.svg';
import imgPlaceholder from '../../images/img_placeholder.png';
import bobaBloomCover from '../../images/boba-bloom-cover.png';
import callWidgetCard from '../../images/call-widget-card.png';
import bobaBloomLogo from '../../images/boba-bloom-logo.png';
import { SegmentedControl } from '../../components/SegmentedControl';
import { getBadgeCount } from '../../components/ChatPanel';
import type { ChatContext } from '../../components/ChatPanel';

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

const ONBOARDING_TASKS_INITIAL = [
  { id: 'store', label: 'Set up your store', time: '5 min', done: true },
  { id: 'menu', label: 'Set up your menu', time: '8 min', done: false },
  { id: 'verify', label: 'Verify your business', time: '8 min', done: false },
  { id: 'bank', label: 'Connect to your bank', time: '2 min', done: false },
  { id: 'orders', label: 'Set up order management', time: '5 min', done: false },
];

const PREVIEW_CATEGORIES = ['Classic boba', 'Specials', 'Fruit tea', 'Milk tea', 'Signature drinks'];

type PreviewItem = { id: string; name: string; price: string; image: string | null };

const CATEGORY_ITEMS: Record<string, PreviewItem[]> = {
  'Classic boba': [
    { id: 'brown-sugar-daddy-500', name: 'Brown Sugar Daddy', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1fe33174-e1b9-11ec-8b48-8286b74c13c6_brown_sugar_daddy.jpeg' },
    { id: 'mango-with-love-500', name: 'Mango with Love', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3023e614-e1b9-11ec-87cc-824c185fa319_mango_with_love.jpeg' },
    { id: 'strawberry-creamy-shake-500', name: 'Strawberry Creamy Shake', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3cc43432-e1b9-11ec-adfc-4e1abe6c4042_strawberry_creamy_shake.jpeg' },
    { id: 'mango-without-love-500', name: 'Mango without Love', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/119ea908-e1ba-11ec-a862-6e57b258b00b_mango_without_love.jpeg' },
    { id: 'strawberry-kiss-500', name: 'Strawberry Kiss', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/2186f104-e1ba-11ec-80aa-2acea55ca2fe_strawberrykiss.jpeg' },
    { id: 'lychee-butterfly-pea-500', name: 'Lychee Butterfly Pea', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/29260ee0-e1ba-11ec-a266-f6aec82f0961_lychee_butterfly_pea.jpeg' },
    { id: 'brown-sugar-daddy-choco-500', name: 'Brown Sugar Daddy Choco', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1784be6c-e1b9-11ec-95b5-ce1f61d61672_brown_sugar_daddy_choco.jpeg' },
    { id: 'burning-sugar-daddy-700', name: 'Burning Sugar Daddy 0,7l', price: '€7.20', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/9f33926e-f156-11ec-bd8a-0ef4ff66a715_burningsugardaddy.jpeg' },
    { id: 'classic-but-not-boring-500', name: 'Classic but not Boring', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/72ba0d82-e1b9-11ec-a525-ce1f61d61672_classic_but_not_boring_milk_tea.jpeg' },
    { id: 'peach-please-500', name: 'Peach Please', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/17e113e6-e1ba-11ec-ba49-568fb4aa13f7_peach_please.jpeg' },
    { id: 'matcha-yes-i-am-green-latte-500', name: 'Matcha Yes I am Green Latte', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/4b8f14d2-e1b9-11ec-84f7-568fb4aa13f7_matcha_yes_i_am__green_latte.jpeg' },
    { id: 'fizzy-green-apple-500', name: 'Fizzy Green Apple', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/7d8f2684-e1b9-11ec-93d1-6ad5f248b449_fizzy_green_apple.jpeg' },
  ],
  'Specials': [
    { id: 'burning-sugar-daddy-700-s', name: 'Burning Sugar Daddy 0,7l', price: '€7.20', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/9f33926e-f156-11ec-bd8a-0ef4ff66a715_burningsugardaddy.jpeg' },
  ],
  'Fruit tea': [
    { id: 'lychee-butterfly-pea-500-f', name: 'Lychee Butterfly Pea', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/29260ee0-e1ba-11ec-a266-f6aec82f0961_lychee_butterfly_pea.jpeg' },
    { id: 'strawberry-kiss-500-f', name: 'Strawberry Kiss', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/2186f104-e1ba-11ec-80aa-2acea55ca2fe_strawberrykiss.jpeg' },
    { id: 'peach-please-500-f', name: 'Peach Please', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/17e113e6-e1ba-11ec-ba49-568fb4aa13f7_peach_please.jpeg' },
    { id: 'mango-without-love-500-f', name: 'Mango without Love', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/119ea908-e1ba-11ec-a862-6e57b258b00b_mango_without_love.jpeg' },
    { id: 'passion-fruit-temptation-500', name: 'Passion Fruit Temptation', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/8c563950-e1b9-11ec-b5b9-ca69c06f9b34_maracuja_temptation.jpeg' },
    { id: 'kiwi-mar-tea-ni-500', name: 'Kiwi Mar-Tea-Ni', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/85f438be-e1b9-11ec-9c4c-aa05e0781374_kiwi_mar_tea_ni.jpeg' },
    { id: 'fizzy-green-apple-500-f', name: 'Fizzy Green Apple', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/7d8f2684-e1b9-11ec-93d1-6ad5f248b449_fizzy_green_apple.jpeg' },
  ],
  'Milk tea': [
    { id: 'classic-but-not-boring-500-m', name: 'Classic but not Boring', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/72ba0d82-e1b9-11ec-a525-ce1f61d61672_classic_but_not_boring_milk_tea.jpeg' },
    { id: 'matcha-yes-i-am-green-latte-500-m', name: 'Matcha Yes I am Green Latte', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/4b8f14d2-e1b9-11ec-84f7-568fb4aa13f7_matcha_yes_i_am__green_latte.jpeg' },
    { id: 'strawberry-creamy-shake-500-m', name: 'Strawberry Creamy Shake', price: '€6.30', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3cc43432-e1b9-11ec-adfc-4e1abe6c4042_strawberry_creamy_shake.jpeg' },
  ],
  'Signature drinks': [
    { id: 'mango-with-love-500-sig', name: 'Mango with Love', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3023e614-e1b9-11ec-87cc-824c185fa319_mango_with_love.jpeg' },
    { id: 'tropical-passion-500', name: 'Tropical Passion', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/27e8016a-e1b9-11ec-9391-568fb4aa13f7_tropical_passion.jpeg' },
    { id: 'brown-sugar-daddy-500-sig', name: 'Brown Sugar Daddy', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1fe33174-e1b9-11ec-8b48-8286b74c13c6_brown_sugar_daddy.jpeg' },
    { id: 'brown-sugar-daddy-choco-500-sig', name: 'Brown Sugar Daddy Choco', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1784be6c-e1b9-11ec-95b5-ce1f61d61672_brown_sugar_daddy_choco.jpeg' },
    { id: 'brown-sugar-daddy-matcha-500', name: 'Brown Sugar Daddy Matcha', price: '€6.80', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/00aadf32-e1b9-11ec-abb2-6e57b258b00b_brown_sugar_daddy_matcha.jpeg' },
  ],
};

/* ─── Schedule-a-Call helpers ─── */
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
];

function generateAvailableDates(): Set<string> {
  const dates = new Set<string>();
  const now = new Date();
  for (let offset = 2; offset <= 28; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    if (Math.random() > 0.55) {
      dates.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }
  }
  if (dates.size < 8) {
    for (let offset = 2; offset <= 28 && dates.size < 10; offset++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        dates.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
      }
    }
  }
  return dates;
}
const AVAILABLE_DATES = generateAvailableDates();

function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getCalendarDays(monthStart: Date): (Date | null)[] {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function formatScheduledDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

/** Placeholder removed – now using StatusDotOpenSvg import. */

/** Retail Item Card – matches Figma 61:39038 */
function RetailItemCard({ item, compact }: { item: PreviewItem; compact?: boolean }) {
  const imgH = compact ? 92 : 134;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        ...(compact ? { width: 160, minWidth: 160, flexShrink: 0 } : { width: '100%' }),
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: imgH,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: item.image ? 'transparent' : '#F7F7F7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {item.image ? (
          <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <img src={PhotoLineSvg} alt="" style={{ width: 24, height: 24, opacity: 0.35 }} />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <span
          style={{
            fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
            fontSize: tokens.usage.typography.label.small.strong.fontSize,
            fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
            lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
            letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
            color: tokens.semantic.colors.text.neutral,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
            fontSize: tokens.usage.typography.label.small.strong.fontSize,
            fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
            lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
            letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
            color: tokens.semantic.colors.text.subdued,
          }}
        >
          {item.price}
        </span>
      </div>
    </div>
  );
}

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { expanded: sidebarExpanded, setExpanded: setSidebarExpanded } = useSidebarState();
  const navState = location.state as { venue?: Venue; menuDone?: boolean } | null;
  const venueFromNav = navState?.venue;
  const [venue, setVenue] = useState<Venue>(venueFromNav ?? 'RX');
  const menuJustCompleted = navState?.menuDone === true;
  const [tasks, setTasks] = useState(() =>
    ONBOARDING_TASKS_INITIAL.map(t => ({ ...t })),
  );
  // 'idle' → 'fade-out' (dot shrinks) → 'fade-in' (check appears) → 'done' (static)
  const [animPhase, setAnimPhase] = useState<'idle' | 'fade-out' | 'fade-in' | 'done'>('idle');

  useEffect(() => {
    if (!menuJustCompleted) return;
    const t1 = setTimeout(() => setAnimPhase('fade-out'), 400);
    const t2 = setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === 'menu' ? { ...t, done: true } : t));
      setAnimPhase('fade-in');
    }, 700);
    const t3 = setTimeout(() => setAnimPhase('done'), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [menuJustCompleted]);

  const [previewView, setPreviewView] = useState<'tv' | 'phone'>('phone');
  // Animation state for expand/collapse: 'closed' | 'opening' | 'open' | 'closing'
  const [overlayState, setOverlayState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [revealedPassword, setRevealedPassword] = useState<string | null>(null);

  // AI Chat state
  const [chatOpen, setChatOpen] = useState(false);

  // Schedule a Call modal state
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledCall, setScheduledCall] = useState<{ date: Date; time: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [scheduleConfirmed, setScheduleConfirmed] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const handleExpandPreview = useCallback(() => {
    setOverlayState('opening');
    // Allow a frame for the initial styles to paint, then trigger transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayState('open');
      });
    });
  }, []);

  const handleCollapsePreview = useCallback(() => {
    setOverlayState('closing');
    // Fallback: ensure we unmount even if transitionEnd doesn't fire
    setTimeout(() => setOverlayState((s) => (s === 'closing' ? 'closed' : s)), 180);
  }, []);

  const handleOverlayTransitionEnd = useCallback(() => {
    if (overlayState === 'closing') {
      setOverlayState('closed');
    }
  }, [overlayState]);

  const previewExpanded = overlayState === 'open' || overlayState === 'opening';
  const overlayVisible = overlayState !== 'closed';

  const [activeCategory, setActiveCategory] = useState(PREVIEW_CATEGORIES[0]);
  // Ref + measured height for left column so preview matches its height
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftColHeight, setLeftColHeight] = useState<number | undefined>(undefined);
  const [tabletStatus, setTabletStatus] = useState<TabletDeliveryStatus>('ordered');
  const tabletDemoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabletDemoRunning = useRef(false);
  useEffect(() => {
    if (!leftColRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setLeftColHeight(entry.contentRect.height + (entry.target as HTMLElement).offsetHeight - (entry.target as HTMLElement).clientHeight);
    });
    ro.observe(leftColRef.current);
    return () => ro.disconnect();
  }, []);
  // Refs for scrollable content containers and section elements
  const inlineScrollRef = useRef<HTMLDivElement>(null);
  const expandedScrollRef = useRef<HTMLDivElement>(null);
  const inlineSectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const expandedSectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const handleCategoryClick = useCallback((cat: string, isExpanded: boolean) => {
    setActiveCategory(cat);
    const refs = isExpanded ? expandedSectionRefs.current : inlineSectionRefs.current;
    const scrollContainer = isExpanded ? expandedScrollRef.current : inlineScrollRef.current;
    const el = refs[cat];
    if (el && scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollTop + (elTop - containerTop),
        behavior: 'smooth',
      });
    }
  }, []);

  React.useEffect(() => {
    if (venueFromNav !== undefined) setVenue(venueFromNav);
  }, [venueFromNav]);

  const handleVenueSwitch = () => {
    const next: Venue = venue === 'NV' ? 'RX' : 'NV';
    setVenue(next);
    navigate(location.pathname, { replace: true, state: { venue: next } });
  };

  const chatContext: ChatContext = {
    page: 'onboarding',
    onboardingTasks: tasks.map((t) => ({ id: t.id, label: t.label, done: t.done })),
  };
  const chatBadgeCount = getBadgeCount(chatContext);

  const handleChatAction = useCallback((actionId: string) => {
    if (actionId === 'navigate-menu') {
      navigate('/menu', { state: { venue } });
    }
  }, [navigate, venue]);

  return (
    <>
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
          onExpandedChange={setSidebarExpanded}
          logoSrc={pedregalLogo}
          logoAlt="Pedregal"
          venueAvatarSrc={venue === 'NV' ? burgeramtLogoImage : bobaBloomLogoSidebar}
          venueAvatarAlt={venue === 'NV' ? 'METRO Supermarkets' : 'Boba Bloom'}
          venueName={VENUE_DISPLAY_NAMES[venue]}
          onVenueSwitch={handleVenueSwitch}
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
          onSendClick={() => { setChatOpen((o) => !o); if (!sidebarExpanded) setSidebarExpanded(true); }}
          chatOpen={chatOpen}
          onChatToggle={() => { setChatOpen((o) => !o); if (!sidebarExpanded) setSidebarExpanded(true); }}
          chatBadgeCount={chatBadgeCount}
          chatContext={chatContext}
          onChatAction={handleChatAction}
        />

        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '8px 8px 8px 0',
            minWidth: 0,
          }}
        >
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
            }}
          >
            {/* Header: scrolls with page content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 48px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Breadcrumbs items={[{ label: 'Home' }]} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
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
                    Welcome, Janni
                  </h1>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: tokens.semantic.colors.text.subdued,
                    }}
                  >
                    Just a few more quick set up things before you can go live.
                  </p>
                </div>
              </div>
            </div>

            {/* Two columns: left fixed-width checklist, right responsive Preview */}
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
              {/* Left column: fixed 434px (same width as Preview in product pages) */}
              <div
                ref={leftColRef}
                style={{
                  width: 434,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  alignSelf: 'flex-start',
                }}
              >
                {/* Get ready to go live */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: 24,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 32,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: tokens.base.typography.fontFamily.brand,
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: '24px',
                        letterSpacing: '-0.01px',
                        color: tokens.semantic.colors.text.neutral,
                      }}
                    >
                      Get ready to go live
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: tokens.usage.typography.body.small.default.fontFamily,
                        fontSize: tokens.usage.typography.body.small.default.fontSize,
                        fontWeight: tokens.usage.typography.body.small.default.fontWeight,
                        lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
                        color: tokens.semantic.colors.text.subdued,
                      }}
                    >
                      Complete these tasks to start accepting orders.
                    </p>
                  </div>

                  <List>
                    {tasks.map((task) => (
                      <ListCell
                        key={task.id}
                        label={task.label}
                        description={task.time}
                        leadingIcon={
                          task.done ? (
                            <div style={{ width: 24, height: 24, flexShrink: 0, position: 'relative' }}>
                              {animPhase === 'fade-in' && task.id === 'menu' ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ animation: 'checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
                                  <circle cx="12" cy="12" r="10" fill="#327A34" />
                                  <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ strokeDasharray: 14, strokeDashoffset: 14, animation: 'checkDraw 0.35s ease-out 0.15s forwards' }} />
                                </svg>
                              ) : (
                                <img src={CheckCircleFillSvg} alt="Completed" style={{ width: 24, height: 24 }} />
                              )}
                            </div>
                          ) : (
                            <div style={{ width: 24, height: 24, flexShrink: 0, position: 'relative' }}>
                              <img
                                src={StatusDotOpenSvg}
                                alt="To do"
                                style={{
                                  width: 24, height: 24,
                                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                                  ...(animPhase === 'fade-out' && task.id === 'menu'
                                    ? { transform: 'scale(0.3)', opacity: 0 }
                                    : { transform: 'scale(1)', opacity: 1 }),
                                }}
                              />
                            </div>
                          )
                        }
                        trailingIcon={
                          <img src={ChevronRightSvg} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
                        }
                        onClick={() => { if (task.id === 'store') navigate('/settings/store', { state: { venue } }); if (task.id === 'menu') navigate('/menu', { state: { venue, openChat: true } }); if (task.id === 'verify') navigate('/settings/verification', { state: { venue, openChat: true } }); }}
                      />
                    ))}
                  </List>

                  <Button variant="primary" size="large" fullWidth onClick={() => navigate('/menu')}>
                    Go live
                  </Button>
                </div>

                {/* Tablet delivery tracker — click to cycle status */}
                {(() => {
                  const isDelayed = tabletStatus === 'delayed';
                  const step2Active = tabletStatus !== 'ordered';
                  const step3Active = tabletStatus === 'delivered' || tabletStatus === 'activated';
                  const isActivated = tabletStatus === 'activated';

                  const titleMap: Record<TabletDeliveryStatus, string> = {
                    'ordered': 'Your tablet has been ordered',
                    'in-transit': 'Your tablet is on the way',
                    'out-for-delivery': 'Your tablet arrives today',
                    'delivered': 'Your tablet has been delivered!',
                    'activated': 'Your tablet has been activated!',
                    'delayed': 'Your tablet is delayed',
                  };
                  const subtitleMap: Record<TabletDeliveryStatus, string | null> = {
                    'ordered': 'You\u2019ll need this to start taking orders',
                    'in-transit': 'Tracking number',
                    'out-for-delivery': 'Between 10:37am \u2013 11:37am',
                    'delivered': null,
                    'activated': null,
                    'delayed': 'Tracking number',
                  };
                  const showArrow = !step3Active;
                  const showGreenDot = tabletStatus === 'out-for-delivery';
                  const subtitle = subtitleMap[tabletStatus];
                  const hasTracking = subtitle === 'Tracking number';

                  const trackFillPct = step3Active ? 100 : isDelayed ? 50 : step2Active ? 75 : 25;

                  const step2Icon = isDelayed ? WarningLineSvg : VehicleCarSvg;
                  const step3Icon = isActivated ? CheckSvg : MerchantLineSvg;
                  const step3Bg = isActivated ? '#00A352' : step3Active ? '#191919' : '#F1F1F1';
                  const step2Bg = isDelayed ? '#E03B31' : step2Active ? '#191919' : '#F1F1F1';

                  const labelStyle = {
                    margin: 0,
                    fontFamily: tokens.usage.typography.label.medium.strong.fontFamily,
                    fontSize: tokens.usage.typography.label.medium.strong.fontSize,
                    fontWeight: tokens.usage.typography.label.medium.strong.fontWeight,
                    lineHeight: `${tokens.usage.typography.label.medium.strong.lineHeight}px`,
                    letterSpacing: `${tokens.usage.typography.label.medium.strong.letterSpacing}px`,
                    color: '#202125',
                  };
                  const subStyle = {
                    margin: 0,
                    fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                    fontSize: tokens.usage.typography.label.small.default.fontSize,
                    fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                    lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                    letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                    color: '#606060',
                  };
                  const circleBase: React.CSSProperties = {
                    position: 'relative',
                    width: 32,
                    height: 32,
                    borderRadius: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                    transition: 'background-color 0.4s ease',
                  };

                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 24,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 32,
                        cursor: 'pointer',
                        overflow: 'clip',
                      }}
                      onClick={() => {
                        if (tabletDemoRunning.current) return;
                        tabletDemoRunning.current = true;
                        let step = 0;
                        const advance = () => {
                          step++;
                          if (step < TABLET_DEMO_SEQUENCE.length) {
                            setTabletStatus(TABLET_DEMO_SEQUENCE[step]);
                            tabletDemoRef.current = setTimeout(advance, DEMO_STEP_DELAY);
                          } else {
                            tabletDemoRunning.current = false;
                            tabletDemoRef.current = setTimeout(() => {
                              setTabletStatus('ordered');
                              tabletDemoRunning.current = false;
                            }, 3000);
                          }
                        };
                        setTabletStatus(TABLET_DEMO_SEQUENCE[0]);
                        tabletDemoRef.current = setTimeout(advance, DEMO_STEP_DELAY);
                      }}
                    >
                      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
                        {/* Title + subtitle */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              {showGreenDot && (
                                <span style={{ width: 12, height: 12, borderRadius: 9999, backgroundColor: '#00A352', flexShrink: 0 }} />
                              )}
                              <p style={labelStyle}>{titleMap[tabletStatus]}</p>
                            </div>
                            {showArrow && <img src={ArrowUpRightSvg} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />}
                          </div>
                          {subtitle && (
                            <p style={subStyle}>
                              {hasTracking ? (
                                <>Tracking number{' '}<span style={{ textDecoration: 'underline' }}>1Z 3RA 349 20 0158956 5.</span></>
                              ) : subtitle}
                            </p>
                          )}
                        </div>

                        {/* Timeline tracker */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                          {/* Track background */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: 16,
                              right: 16,
                              height: 4,
                              transform: 'translateY(-50%)',
                              backgroundColor: '#F1F1F1',
                              borderRadius: 2,
                              overflow: 'hidden',
                            }}
                          >
                            {/* Black fill — transitions smoothly between statuses */}
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                borderRadius: 2,
                                backgroundColor: '#191919',
                                width: `${trackFillPct}%`,
                                transition: 'width 1s ease-out',
                              }}
                            />
                            {/* Red overlay for delayed */}
                            {isDelayed && (
                              <div
                                key="delayed-red"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: '50%',
                                  height: '100%',
                                  backgroundColor: '#E03B31',
                                  borderRadius: '0 2px 2px 0',
                                  animation: 'tabletTrackDelayed 0.8s 0.4s ease-out forwards',
                                  width: 0,
                                }}
                              />
                            )}
                          </div>

                          {/* Step 1: DoorDash (always completed) */}
                          <div style={{ ...circleBase, backgroundColor: '#191919' }}>
                            <img src={LogoDoordashSvg} alt="" style={{ width: 16, height: 16 }} />
                          </div>

                          {/* Step 2: Car / Warning */}
                          <div style={{ ...circleBase, backgroundColor: step2Bg }}>
                            <img
                              src={step2Icon}
                              alt=""
                              style={{
                                width: 16,
                                height: 16,
                                filter: (isDelayed || step2Active) ? 'brightness(0) invert(1)' : 'none',
                                transition: 'filter 0.4s ease',
                              }}
                            />
                          </div>

                          {/* Step 3: Merchant / Check */}
                          <div style={{ ...circleBase, backgroundColor: step3Bg }}>
                            <img
                              src={step3Icon}
                              alt=""
                              style={{
                                width: 16,
                                height: 16,
                                filter: (step3Active || isActivated) ? 'brightness(0) invert(1)' : 'none',
                                transition: 'filter 0.4s ease',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* We'll call you soon / Call scheduled widget */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: 24,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 32,
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: tokens.usage.typography.label.medium.strong.fontFamily,
                          fontSize: tokens.usage.typography.label.medium.strong.fontSize,
                          fontWeight: tokens.usage.typography.label.medium.strong.fontWeight,
                          lineHeight: `${tokens.usage.typography.label.medium.strong.lineHeight}px`,
                          letterSpacing: `${tokens.usage.typography.label.medium.strong.letterSpacing}px`,
                          color: '#202125',
                        }}
                      >
                        {scheduledCall ? 'Call scheduled' : "We\u2019ll call you soon"}
                      </p>
                      {scheduledCall ? (
                        <p
                          style={{
                            margin: 0,
                            fontFamily: tokens.usage.typography.body.small.default.fontFamily,
                            fontSize: tokens.usage.typography.body.small.default.fontSize,
                            fontWeight: tokens.usage.typography.body.small.default.fontWeight,
                            lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
                            letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
                            color: tokens.semantic.colors.text.subdued,
                          }}
                        >
                          Your call is scheduled for{' '}
                          <span style={{ fontWeight: 700, color: '#191919' }}>
                            {formatScheduledDate(scheduledCall.date)} at {scheduledCall.time}
                          </span>
                          . If something comes up, you can easily reschedule.
                        </p>
                      ) : (
                        <p
                          style={{
                            margin: 0,
                            fontFamily: tokens.usage.typography.body.small.default.fontFamily,
                            fontSize: tokens.usage.typography.body.small.default.fontSize,
                            fontWeight: tokens.usage.typography.body.small.default.fontWeight,
                            lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
                            letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
                            color: tokens.semantic.colors.text.subdued,
                          }}
                        >
                          Our team will call you in 2 days to help you get started. Want to pick the time? Schedule a time that works for you.
                        </p>
                      )}
                    </div>
                    {/* Decorative photo card */}
                    <div style={{
                      width: 90, height: 90, borderRadius: 12,
                      flexShrink: 0, overflow: 'hidden',
                    }}>
                      <img src={callWidgetCard} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  {scheduledCall ? (
                    <Button
                      variant="tertiary"
                      size="medium"
                      fullWidth
                      onClick={() => {
                        setSelectedDate(scheduledCall.date);
                        setSelectedTime(scheduledCall.time);
                        setScheduleConfirmed(true);
                        setCalendarMonth(new Date(scheduledCall.date.getFullYear(), scheduledCall.date.getMonth(), 1));
                        setScheduleModalOpen(true);
                      }}
                    >
                      View details
                    </Button>
                  ) : (
                    <Button
                      variant="tertiary"
                      size="medium"
                      fullWidth
                      icon={<img src={CalendarAddFillSvg} alt="" style={{ width: 24, height: 24 }} />}
                      onClick={() => {
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setScheduleConfirmed(false);
                        setScheduleModalOpen(true);
                      }}
                    >
                      Schedule a Call
                    </Button>
                  )}
                </div>
              </div>

              {/* Right column: responsive Preview (same wrapper as product page preview panel) */}
              {overlayState === 'closed' && (
              <div
                style={{
                  flex: '1 1 0%',
                  minWidth: 0,
                  backgroundColor: tokens.semantic.colors.surface.raised,
                  borderRadius: 32,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  ...(leftColHeight ? { height: leftColHeight } : {}),
                }}
              >
                {/* Preview header */}
                <div
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 24,
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontFamily: 'inherit',
                      fontSize: 'var(--usage-type-title-large-font-size, 20px)',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'var(--usage-type-title-large-line-height, 24px)',
                      letterSpacing: 'var(--usage-type-title-large-letter-spacing, -0.01px)',
                      color: 'var(--Text-Neutral, #181818)',
                    }}
                  >
                    Preview
                  </span>
                  <SegmentedControl
                    value={previewView}
                    onChange={(v) => setPreviewView(v as 'tv' | 'phone')}
                    options={[
                      {
                        value: 'tv',
                        icon: <img src={TvLineSvg} alt="Desktop view" style={{ width: 16, height: 16 }} />,
                      },
                      {
                        value: 'phone',
                        icon: <img src={DevicePhoneSvg} alt="Phone view" style={{ width: 16, height: 16 }} />,
                      },
                    ]}
                  />
                  <button
                    type="button"
                    onClick={handleExpandPreview}
                    aria-label="Expand preview"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <img src={ViewExpandSvg} alt="" style={{ width: 24, height: 24 }} />
                  </button>
                </div>

                {/* Preview content area */}
                <div
                  ref={inlineScrollRef}
                  style={{
                    flex: 1,
                    minHeight: 0,
                    padding: '0 24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: previewView === 'phone' ? 'center' : 'stretch',
                    overflowY: 'auto',
                  }}
                >
                  {/* Device frame – phone: fixed 375×812 centred; desktop: full-width */}
                  <div
                    style={{
                      ...(previewView === 'phone'
                        ? { width: 375, height: 812, flexShrink: 0 }
                        : { width: '100%' }),
                      backgroundColor: '#FFFFFF',
                      borderRadius: 36,
                      boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.16)',
                      overflowX: 'hidden',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Store hero */}
                    <div style={{ position: 'relative', width: '100%', height: previewView === 'phone' ? 451 : 325, backgroundColor: '#B5E3D8', flexShrink: 0, overflow: 'hidden' }}>
                      <img src={bobaBloomCover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
                      <div style={{ position: 'absolute', top: 27, right: 26 }}>
                        <Button variant="floating" size="medium" icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />} onClick={() => navigate('/settings/store', { state: { venue } })}>
                          Edit store
                        </Button>
                      </div>
                      {/* Gradient overlay at the bottom of hero — layered blur for smooth transition */}
                      {[
                        { bottom: '0%', height: '50%', blur: 16, opacity: 0.35 },
                        { bottom: '0%', height: '40%', blur: 12, opacity: 0.25 },
                        { bottom: '0%', height: '30%', blur: 8, opacity: 0.15 },
                        { bottom: '0%', height: '20%', blur: 4, opacity: 0.05 },
                      ].map((layer, i) => (
                        <div
                          key={i}
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: layer.bottom,
                            height: layer.height,
                            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,${layer.opacity}) 100%)`,
                            backdropFilter: `blur(${layer.blur}px)`,
                            WebkitBackdropFilter: `blur(${layer.blur}px)`,
                            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
                            pointerEvents: 'none',
                          }}
                        />
                      ))}
                      {/* Store name & metadata on hero */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 24,
                          bottom: 0,
                          right: 24,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 24,
                          paddingBottom: 16,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <img
                            src={bobaBloomLogo}
                            alt="Boba Bloom"
                            style={{
                              width: 66,
                              height: 66,
                              borderRadius: 12,
                              objectFit: 'cover',
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <span
                              style={{
                                fontFamily: tokens.base.typography.fontFamily.brand,
                                fontSize: 32,
                                fontWeight: 800,
                                lineHeight: 'normal',
                                color: '#FFFFFF',
                              }}
                            >
                              Boba Bloom
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#FFFFFF', letterSpacing: '-0.01px' }}>
                              €0 delivery on €12+ · 4.2 km · Pricing & fees
                            </span>
                          </div>
                        </div>
                        {/* Attribute pills on hero */}
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 9999, backgroundColor: 'rgba(247,247,247,0.15)', flexShrink: 0 }}>
                            <img src={StarFillSvg} alt="" style={{ width: 16, height: 16 }} />
                            <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#FFFFFF', letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>Your store rating</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 9999, backgroundColor: 'rgba(247,247,247,0.15)', flexShrink: 0 }}>
                            <img src={InfoLine24Svg} alt="" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
                            <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#FFFFFF', letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>Your store info</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inner scrollable content */}
                    <div
                      style={{
                        flex: 1,
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {previewView === 'phone' ? (
                        /* ─── MOBILE LAYOUT ─── */
                        <>
                          {/* Delivery / Pick up / Go out scheduling bar */}
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 16px' }}>
                            {/* Pill container */}
                            <div style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: '#F7F7F7', borderRadius: 20, padding: '4px 8px 4px 4px' }}>
                              {/* Delivery — active tab (raised card) */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 118, flexShrink: 0, padding: '4px 16px', backgroundColor: '#FFFFFF', border: '1px solid #E4E4E4', borderRadius: 16, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                                  <span style={{ fontFamily: tokens.usage.typography.label.small.strong.fontFamily, fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>Delivery</span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919' }}>20-30 min</span>
                                    <img src={CaretDownSvg} alt="" style={{ width: 24, height: 24 }} />
                                  </div>
                                </div>
                              </div>
                              {/* Pick up */}
                              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                  <span style={{ fontFamily: tokens.usage.typography.label.small.strong.fontFamily, fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>Pick up</span>
                                  <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919' }}>10-20 min</span>
                                </div>
                              </div>
                              {/* Go out */}
                              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                  <span style={{ fontFamily: tokens.usage.typography.label.small.strong.fontFamily, fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>Go out</span>
                                  <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919' }}>1.7 km</span>
                                </div>
                              </div>
                            </div>
                            {/* Invite button */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 56, padding: '2px 4px', borderRadius: 16, flexShrink: 0 }}>
                              <img src={PersonPlusSvg} alt="" style={{ width: 24, height: 24 }} />
                              <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919', textAlign: 'center' }}>Invite</span>
                            </div>
                          </div>

                          {/* Mobile category sections */}
                          {PREVIEW_CATEGORIES.map((cat, catIdx) => (
                            <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 16, fontWeight: 700, lineHeight: '20px', color: tokens.semantic.colors.text.neutral }}>{cat}</span>
                                {catIdx === 0 && (
                                  <Button variant="floating" size="medium" icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />} onClick={() => navigate('/menu')}>
                                    Edit menu
                                  </Button>
                                )}
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: 8,
                                  overflowX: 'auto',
                                  scrollBehavior: 'smooth',
                                  WebkitOverflowScrolling: 'touch',
                                  scrollSnapType: 'x mandatory',
                                  msOverflowStyle: 'none',
                                  scrollbarWidth: 'none',
                                }}
                              >
                                {(CATEGORY_ITEMS[cat] ?? []).map((item) => (
                                  <div key={item.id} style={{ scrollSnapAlign: 'start' }}>
                                    <RetailItemCard item={item} compact />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        /* ─── DESKTOP LAYOUT ─── */
                        <div style={{ display: 'flex', gap: 24, padding: '24px 32px 0', width: '100%', boxSizing: 'border-box' }}>
                          {/* Left sidebar: store hours + category nav */}
                          <div style={{ width: 205, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8, paddingBottom: 20 }}>
                              <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 16, fontWeight: 700, lineHeight: '20px', color: '#000000', letterSpacing: '-0.01px' }}>Store hours</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#606060', letterSpacing: '-0.01px' }}>6:00 am to 10:00 am</span>
                                <img src={CaretDownSvg} alt="" style={{ width: 24, height: 24 }} />
                              </div>
                            </div>
                            {/* Category nav */}
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                              {PREVIEW_CATEGORIES.map((cat, i) => {
                                const isActive = cat === activeCategory;
                                return (
                                  <div
                                    key={cat}
                                    onClick={() => handleCategoryClick(cat, false)}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      height: 40,
                                      paddingLeft: 16,
                                      borderTopRightRadius: isActive ? 12 : 0,
                                      borderBottomRightRadius: isActive ? 12 : 0,
                                      backgroundColor: isActive ? '#F7F7F7' : 'transparent',
                                      cursor: 'pointer',
                                      position: 'relative',
                                    }}
                                  >
                                    {isActive && (
                                      <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: 40, borderRadius: 8, backgroundColor: '#191919' }} />
                                    )}
                                    <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#000000', letterSpacing: '-0.01px' }}>{cat}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right content: item sections */}
                          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 48 }}>
                            {PREVIEW_CATEGORIES.map((cat, catIdx) => (
                              <div
                                key={cat}
                                ref={(el) => { inlineSectionRefs.current[cat] = el; }}
                                style={{ display: 'flex', flexDirection: 'column' }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 20, fontWeight: 700, lineHeight: '20px', color: '#000000' }}>{cat}</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    {catIdx === 0 && (
                                      <Button variant="floating" size="medium" icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />} onClick={() => navigate('/menu')}>
                                        Edit menu
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                {/* Item grid – responsive wrap */}
                                <div
                                  style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: 16,
                                    paddingBottom: 12,
                                  }}
                                >
                                  {(CATEGORY_ITEMS[cat] ?? []).map((item) => (
                                    <RetailItemCard key={item.id} item={item} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULLSCREEN PREVIEW OVERLAY ─── */}
      {overlayVisible && (
        <div
          onTransitionEnd={handleOverlayTransitionEnd}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#F8F8F8',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            opacity: overlayState === 'open' ? 1 : 0,
            transform: overlayState === 'open' ? 'scale(1)' : 'scale(0.96)',
            transition: overlayState === 'closing'
              ? 'opacity 0.15s cubic-bezier(0.4, 0, 1, 1), transform 0.15s cubic-bezier(0.4, 0, 1, 1)'
              : 'opacity 0.2s cubic-bezier(0, 0, 0.2, 1), transform 0.2s cubic-bezier(0, 0, 0.2, 1)',
            willChange: 'opacity, transform',
          }}
        >
          {/* Expanded preview header */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 24,
              gap: 16,
              backgroundColor: tokens.semantic.colors.surface.raised,
            }}
          >
            <span
              style={{
                flex: 1,
                fontFamily: 'inherit',
                fontSize: 'var(--usage-type-title-large-font-size, 20px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--usage-type-title-large-line-height, 24px)',
                letterSpacing: 'var(--usage-type-title-large-letter-spacing, -0.01px)',
                color: 'var(--Text-Neutral, #181818)',
              }}
            >
              Preview
            </span>
            <SegmentedControl
              value={previewView}
              onChange={(v) => setPreviewView(v as 'tv' | 'phone')}
              options={[
                {
                  value: 'tv',
                  icon: <img src={TvLineSvg} alt="Desktop view" style={{ width: 16, height: 16 }} />,
                },
                {
                  value: 'phone',
                  icon: <img src={DevicePhoneSvg} alt="Phone view" style={{ width: 16, height: 16 }} />,
                },
              ]}
            />
            <button
              type="button"
              onClick={handleCollapsePreview}
              aria-label="Collapse preview"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <img src={ViewCollapseSvg} alt="" style={{ width: 24, height: 24 }} />
            </button>
          </div>

          {/* Expanded preview content area */}
          <div
            ref={expandedScrollRef}
            style={{
              flex: 1,
              minHeight: 0,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: previewView === 'phone' ? 'center' : 'stretch',
              overflowY: 'auto',
              backgroundColor: tokens.semantic.colors.surface.raised,
            }}
          >
            {/* Device frame – phone: fixed 375×812 centred; desktop: full-width responsive */}
            <div
              style={{
                ...(previewView === 'phone'
                  ? { width: 375, height: 812, flexShrink: 0 }
                  : { width: '100%', flex: 1, minHeight: 0 }),
                backgroundColor: '#FFFFFF',
                borderRadius: 36,
                boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.16)',
                overflowX: 'hidden',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Store hero */}
              <div style={{ position: 'relative', width: '100%', height: previewView === 'phone' ? 451 : 325, backgroundColor: '#B5E3D8', flexShrink: 0, overflow: 'hidden' }}>
                <img src={bobaBloomCover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
                <div style={{ position: 'absolute', top: 27, right: 26 }}>
                  <Button variant="floating" size="medium" icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />} onClick={() => navigate('/settings/store', { state: { venue } })}>
                    Edit store
                  </Button>
                </div>
                {/* Gradient overlay — layered blur for smooth transition */}
                {[
                  { bottom: '0%', height: '50%', blur: 16, opacity: 0.35 },
                  { bottom: '0%', height: '40%', blur: 12, opacity: 0.25 },
                  { bottom: '0%', height: '30%', blur: 8, opacity: 0.15 },
                  { bottom: '0%', height: '20%', blur: 4, opacity: 0.05 },
                ].map((layer, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: layer.bottom,
                      height: layer.height,
                      background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,${layer.opacity}) 100%)`,
                      backdropFilter: `blur(${layer.blur}px)`,
                      WebkitBackdropFilter: `blur(${layer.blur}px)`,
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
                      pointerEvents: 'none',
                    }}
                  />
                ))}
                {/* Store name & metadata */}
                <div
                  style={{
                    position: 'absolute',
                    left: 24,
                    bottom: 0,
                    right: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    paddingBottom: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img
                      src={bobaBloomLogo}
                      alt="Boba Bloom"
                      style={{
                        width: 66,
                        height: 66,
                        borderRadius: 12,
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span
                        style={{
                          fontFamily: tokens.base.typography.fontFamily.brand,
                          fontSize: 32,
                          fontWeight: 800,
                          lineHeight: 'normal',
                          color: '#FFFFFF',
                        }}
                      >
                        Boba Bloom
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#FFFFFF', letterSpacing: '-0.01px' }}>
                        €0 delivery on €12+ · 4.2 km · Pricing & fees
                      </span>
                    </div>
                  </div>
                  {/* Attribute pills */}
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 9999, backgroundColor: 'rgba(247,247,247,0.15)', flexShrink: 0 }}>
                      <img src={StarFillSvg} alt="" style={{ width: 16, height: 16 }} />
                      <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#FFFFFF', letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>Your store rating</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 9999, backgroundColor: 'rgba(247,247,247,0.15)', flexShrink: 0 }}>
                      <img src={InfoLine24Svg} alt="" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
                      <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#FFFFFF', letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>Your store info</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inner scrollable content */}
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {previewView === 'phone' ? (
                  /* ─── MOBILE LAYOUT (expanded) ─── */
                  <>
                    {/* Delivery / Pick up / Go out scheduling bar (expanded) */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 16px' }}>
                      <div style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: '#F7F7F7', borderRadius: 20, padding: '4px 8px 4px 4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 118, flexShrink: 0, padding: '4px 16px', backgroundColor: '#FFFFFF', border: '1px solid #E4E4E4', borderRadius: 16, overflow: 'hidden' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                            <span style={{ fontFamily: tokens.usage.typography.label.small.strong.fontFamily, fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>Delivery</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919' }}>20-30 min</span>
                              <img src={CaretDownSvg} alt="" style={{ width: 24, height: 24 }} />
                            </div>
                          </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontFamily: tokens.usage.typography.label.small.strong.fontFamily, fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>Pick up</span>
                            <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919' }}>10-20 min</span>
                          </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontFamily: tokens.usage.typography.label.small.strong.fontFamily, fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>Go out</span>
                            <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919' }}>1.7 km</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 56, padding: '2px 4px', borderRadius: 16, flexShrink: 0 }}>
                        <img src={PersonPlusSvg} alt="" style={{ width: 24, height: 24 }} />
                        <span style={{ fontFamily: tokens.usage.typography.label.xSmall.strong.fontFamily, fontSize: 12, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.01px', color: '#191919', textAlign: 'center' }}>Invite</span>
                      </div>
                    </div>
                    {/* Mobile category sections (expanded) */}
                    {PREVIEW_CATEGORIES.map((cat, catIdx) => (
                      <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 16, fontWeight: 700, lineHeight: '20px', color: tokens.semantic.colors.text.neutral }}>{cat}</span>
                          {catIdx === 0 && (
                            <Button variant="floating" size="medium" icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />} onClick={() => navigate('/menu')}>
                              Edit menu
                            </Button>
                          )}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            gap: 8,
                            overflowX: 'auto',
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch',
                            scrollSnapType: 'x mandatory',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                          }}
                        >
                          {(CATEGORY_ITEMS[cat] ?? []).map((item) => (
                            <div key={item.id} style={{ scrollSnapAlign: 'start' }}>
                              <RetailItemCard item={item} compact />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  /* ─── DESKTOP LAYOUT (expanded – responsive) ─── */
                  <div style={{ display: 'flex', gap: 24, padding: '24px 32px 0', width: '100%', boxSizing: 'border-box' }}>
                    {/* Left sidebar */}
                    <div style={{ width: 205, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8, paddingBottom: 20 }}>
                        <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 16, fontWeight: 700, lineHeight: '20px', color: '#000000', letterSpacing: '-0.01px' }}>Store hours</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#606060', letterSpacing: '-0.01px' }}>6:00 am to 10:00 am</span>
                          <img src={CaretDownSvg} alt="" style={{ width: 24, height: 24 }} />
                        </div>
                      </div>
                      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        {PREVIEW_CATEGORIES.map((cat) => {
                          const isActive = cat === activeCategory;
                          return (
                            <div
                              key={cat}
                              onClick={() => handleCategoryClick(cat, true)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 40,
                                paddingLeft: 16,
                                borderTopRightRadius: isActive ? 12 : 0,
                                borderBottomRightRadius: isActive ? 12 : 0,
                                backgroundColor: isActive ? '#F7F7F7' : 'transparent',
                                cursor: 'pointer',
                                position: 'relative',
                              }}
                            >
                              {isActive && (
                                <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: 40, borderRadius: 8, backgroundColor: '#191919' }} />
                              )}
                              <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#000000', letterSpacing: '-0.01px' }}>{cat}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right content */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 48 }}>
                      {PREVIEW_CATEGORIES.map((cat, catIdx) => (
                        <div
                          key={cat}
                          ref={(el) => { expandedSectionRefs.current[cat] = el; }}
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 20, fontWeight: 700, lineHeight: '20px', color: '#000000' }}>{cat}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              {catIdx === 0 && (
                                <Button variant="floating" size="medium" icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />} onClick={() => navigate('/menu')}>
                                  Edit menu
                                </Button>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                              gap: 16,
                              paddingBottom: 12,
                            }}
                          >
                            {(CATEGORY_ITEMS[cat] ?? []).map((item) => (
                              <RetailItemCard key={item.id} item={item} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Order Management Modal */}
      {orderModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onClick={() => setOrderModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0px 6px 20px 0px rgba(25,25,25,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              width: 920,
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 20, fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.01px', color: '#202125', margin: 0 }}>
                  Receive and manage customer orders
                </p>
                <p style={{ fontFamily: tokens.usage.typography.body.small.default.fontFamily, fontSize: 16, fontWeight: 500, lineHeight: '22px', letterSpacing: '-0.01px', color: '#606060', margin: 0 }}>
                  Track your tablet and get set up when it arrives
                </p>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 9999,
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 2px 8px 0px rgba(25,25,25,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <img src={CloseSvg} alt="Close" style={{ width: 24, height: 24 }} />
              </button>
            </div>

            {/* Two cards */}
            <div style={{ display: 'flex', gap: 20, height: 447 }}>
              {/* Left card: Wait for your tablet */}
              <div style={{ flex: 1, backgroundColor: '#F7F7F7', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
                {/* Text content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 18, fontWeight: 700, lineHeight: '22px', letterSpacing: '-0.01px', color: '#191919' }}>
                    Wait for your tablet
                  </span>
                  <span style={{ fontFamily: tokens.usage.typography.body.small.default.fontFamily, fontSize: 14, fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.01px', color: '#606060' }}>
                    Tracking number <span style={{ textDecoration: 'underline' }}>1Z 3RA 349 20 0158956 5</span>. Once it's delivered, follow the instructions to set up your tablet.
                  </span>
                </div>

                {/* Map */}
                <div style={{ position: 'relative', flex: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid #FFFFFF', marginTop: 16 }}>
                  <img src={mapBobaBloom} alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* Boba bloom marker */}
                  <div style={{ position: 'absolute', top: '45%', left: '42%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 36, height: 44, position: 'relative' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9999, overflow: 'hidden', border: '2px solid #FFFFFF', position: 'absolute', top: 2, left: 2 }}>
                        <img src={bobaBloomLogo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#181818', textAlign: 'center', whiteSpace: 'nowrap' }}>Boba bloom</span>
                  </div>
                </div>

                {/* Delivery timeline (same as activation tracker) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', padding: '28px 4px 0' }}>
                  {/* In transit tooltip — positioned at the right end of the filled track */}
                  <div style={{ position: 'absolute', top: 0, left: 20, right: 20, height: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', left: '25%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ backgroundColor: '#191919', padding: 8, borderRadius: 8, boxShadow: '0px 4px 16px 0px rgba(25,25,25,0.2)' }}>
                        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>In transit</span>
                      </div>
                      {/* Arrow pointing down */}
                      <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #191919' }} />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: '50%', left: 20, right: 20, height: 4, display: 'flex', marginTop: 14 }}>
                    <div style={{ flex: 1, backgroundColor: '#191919', borderRadius: '2px 0 0 2px' }} />
                    <div style={{ flex: 3, backgroundColor: '#F1F1F1', borderRadius: '0 2px 2px 0' }} />
                  </div>
                  {/* Step 1: DoorDash */}
                  <div style={{ position: 'relative', width: 32, height: 32, borderRadius: 9999, backgroundColor: '#191919', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={LogoDoordashSvg} alt="" style={{ width: 16, height: 16 }} />
                  </div>
                  {/* Step 2: In transit */}
                  <div style={{ position: 'relative', width: 32, height: 32, borderRadius: 9999, backgroundColor: '#F1F1F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={VehicleCarSvg} alt="" style={{ width: 16, height: 16 }} />
                  </div>
                  {/* Step 3: Delivered */}
                  <div style={{ position: 'relative', width: 32, height: 32, borderRadius: 9999, backgroundColor: '#F1F1F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={MerchantLineSvg} alt="" style={{ width: 16, height: 16 }} />
                  </div>
                </div>
              </div>

              {/* Right card: Set up your tablet */}
              <div style={{ flex: 1, backgroundColor: '#F7F7F7', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', gap: 32, overflow: 'hidden' }}>
                {/* Text content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 18, fontWeight: 700, lineHeight: '22px', letterSpacing: '-0.01px', color: '#191919' }}>
                    Set up your tablet
                  </span>
                  <span style={{ fontFamily: tokens.usage.typography.body.small.default.fontFamily, fontSize: 14, fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.01px', color: '#606060' }}>
                    Once your tablet arrives, use the details below to log in. Then follow the on screen instructions to complete set up and start receiving, confirming, and managing orders.
                  </span>
                </div>

                {/* Credentials card */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 32, padding: 16, display: 'flex', flexDirection: 'column' }}>
                  {/* Username row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
                    <img src={PersonUserFillSvg} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.01px', color: '#606060' }}>Username:</span>
                      <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>bobabloom123</span>
                    </div>
                  </div>
                  {/* Password row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
                    <img src={LockedLineSvg} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.01px', color: '#606060' }}>Password:</span>
                      <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', letterSpacing: '-0.01px', color: '#191919' }}>{revealedPassword ?? '••••••••••'}</span>
                    </div>
                    <span
                      style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#191919', cursor: 'pointer', padding: '8px 0' }}
                      onClick={() => {
                        if (!revealedPassword) {
                          const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
                          let pw = '';
                          for (let i = 0; i < 12; i++) pw += chars[Math.floor(Math.random() * chars.length)];
                          setRevealedPassword(pw);
                        } else {
                          setRevealedPassword(null);
                        }
                      }}
                    >
                      {revealedPassword ? 'Hide' : 'Reveal'}
                    </span>
                  </div>
                </div>

                {/* Get help button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="tertiary" size="medium">
                    Get help
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Schedule a Call Modal */}
      {scheduleModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onClick={() => setScheduleModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0px 6px 20px 0px rgba(25,25,25,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              width: 768,
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {scheduleConfirmed ? (
              /* ─── Confirmation state ─── */
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeScaleIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both' }}>
                {/* Success hero */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '32px 24px 24px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 9999, backgroundColor: '#A4C639', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
                    <img src={CheckCircleFillSvg} alt="" style={{ width: 28, height: 28, filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 20, fontWeight: 700, lineHeight: '24px', color: '#191919' }}>
                      You&apos;re all set!
                    </span>
                    <span style={{ fontFamily: tokens.usage.typography.body.small.default.fontFamily, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#606060', textAlign: 'center' }}>
                      A calendar invitation has been sent to your email address.
                    </span>
                  </div>
                </div>

                {/* Details list (List Cell pattern) */}
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px', flex: 1 }}>
                  {/* Host */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, minHeight: 48 }}>
                    <img src={PersonUserFillSvg} alt="" style={{ width: 24, height: 24, opacity: 0.45, flexShrink: 0 }} />
                    <div style={{ flex: 1, borderBottom: '1px solid #E7E7E7', padding: '12px 0' }}>
                      <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#191919' }}>
                        Julie Logue, julie.logue@doordash.com
                      </span>
                    </div>
                  </div>
                  {/* Date & Time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, minHeight: 48 }}>
                    <img src={CalendarLineSvg} alt="" style={{ width: 24, height: 24, opacity: 0.45, flexShrink: 0 }} />
                    <div style={{ flex: 1, borderBottom: '1px solid #E7E7E7', padding: '12px 0' }}>
                      <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#191919' }}>
                        {selectedTime}, {selectedDate ? `${DAY_NAMES[selectedDate.getDay()]} ${MONTH_NAMES[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getDate()}${getOrdinalSuffix(selectedDate.getDate())}, ${selectedDate.getFullYear()}` : ''}
                      </span>
                    </div>
                  </div>
                  {/* Zoom link */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, minHeight: 48 }}>
                    <img src={LinkExternalLineSvg} alt="" style={{ width: 24, height: 24, opacity: 0.45, flexShrink: 0, marginTop: 12 }} />
                    <div style={{ flex: 1, padding: '12px 0' }}>
                      <a
                        href="https://doordash.zoom.us/j/9688684440?pwd=bzJSaWVGWVZOYTBGYTVka1dFdDA1dz09"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 500, lineHeight: '20px',
                          color: '#191919', textDecoration: 'none', wordBreak: 'break-all',
                        }}
                      >
                        https://doordash.zoom.us/j/9688684440?pwd=bzJSaWVGWVZOYTBGYTVka1dFdDA1dz09
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom button group bar (Button Group pattern) */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: 16,
                  flexShrink: 0,
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setScheduleConfirmed(false);
                      setSelectedDate(null);
                      setSelectedTime(null);
                      setScheduledCall(null);
                      setScheduleModalOpen(false);
                    }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: tokens.usage.typography.label.medium.strong.fontFamily,
                      fontSize: `${tokens.usage.typography.label.medium.strong.fontSize}px`,
                      fontWeight: tokens.usage.typography.label.medium.strong.fontWeight,
                      lineHeight: `${tokens.usage.typography.label.medium.strong.lineHeight}px`,
                      color: '#E03B3B',
                      padding: `${tokens.component.button.paddingY.medium}px ${tokens.component.button.paddingX.medium}px`,
                      borderRadius: `${tokens.component.button.borderRadius}px`,
                    }}
                  >
                    Cancel meeting
                  </button>
                  <div style={{ flex: 1 }} />
                  <Button
                    variant="tertiary"
                    size="medium"
                    onClick={() => {
                      setScheduleConfirmed(false);
                    }}
                  >
                    Re-schedule
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => {
                      if (selectedDate && selectedTime) {
                        setScheduledCall({ date: selectedDate, time: selectedTime });
                      }
                      setScheduleModalOpen(false);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              /* ─── Calendar + time slot picker ─── */
              <>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 20, fontWeight: 700, lineHeight: '24px', color: '#191919' }}>
                      Schedule a [Zoom] call
                    </span>
                    <span style={{ fontFamily: tokens.usage.typography.body.small.default.fontFamily, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#606060' }}>
                      Pick a date and time that works for you. All time displayed in your local time zone.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScheduleModalOpen(false)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <img src={CloseSvg} alt="Close" style={{ width: 24, height: 24 }} />
                  </button>
                </div>

                {/* Two-column layout */}
                <div style={{ display: 'flex', gap: 24, minHeight: 360 }}>
                  {/* Left column: Calendar */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Month navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <button
                        type="button"
                        onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
                      >
                        <img src={ChevronLeftSvg} alt="Previous month" style={{ width: 16, height: 16 }} />
                      </button>
                      <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 16, fontWeight: 700, lineHeight: '22px', color: '#191919' }}>
                        {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
                      >
                        <img src={ChevronRightSvg} alt="Next month" style={{ width: 16, height: 16 }} />
                      </button>
                    </div>

                    {/* Weekday headers */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
                      {WEEKDAY_LABELS.map((wd) => (
                        <div key={wd} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32, fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 12, fontWeight: 600, lineHeight: '16px', color: '#909090' }}>
                          {wd}
                        </div>
                      ))}
                    </div>

                    {/* Day grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, justifyItems: 'center' }}>
                      {getCalendarDays(calendarMonth).map((day, idx) => {
                        if (!day) return <div key={`empty-${idx}`} style={{ height: 40 }} />;
                        const key = dateKey(day);
                        const isAvailable = AVAILABLE_DATES.has(key);
                        const isSelected = selectedDate !== null && dateKey(selectedDate) === key;
                        const today = new Date();
                        const isToday = day.getFullYear() === today.getFullYear() && day.getMonth() === today.getMonth() && day.getDate() === today.getDate();
                        const isPast = day < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        return (
                          <button
                            key={key}
                            type="button"
                            disabled={!isAvailable || isPast}
                            onClick={() => {
                              setSelectedDate(day);
                              setSelectedTime(null);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 40,
                              width: 40,
                              borderRadius: 9999,
                              border: 'none',
                              cursor: isAvailable && !isPast ? 'pointer' : 'default',
                              backgroundColor: isSelected ? '#191919' : (isAvailable && !isPast) ? '#EDEDEE' : 'transparent',
                              color: isSelected ? '#FFFFFF' : (!isAvailable || isPast) ? '#D0D0D0' : '#191919',
                              fontFamily: tokens.base.typography.fontFamily.brand,
                              fontSize: 14,
                              fontWeight: isSelected || isToday ? 700 : 500,
                              lineHeight: '20px',
                              transition: 'background-color 0.15s ease',
                            }}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ width: 1, backgroundColor: '#E4E4E4', flexShrink: 0 }} />

                  {/* Right column: Time slots */}
                  <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
                    {selectedDate ? (
                      <>
                        <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#191919' }}>
                          {`${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}${getOrdinalSuffix(selectedDate.getDate())}`}
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', flex: 1 }}>
                          {TIME_SLOTS.map((slot) => {
                            const isSlotSelected = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTime(slot)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 40,
                                  borderRadius: 9999,
                                  border: isSlotSelected ? '2px solid #191919' : '1px solid #E4E4E4',
                                  backgroundColor: '#FFFFFF',
                                  color: '#191919',
                                  cursor: 'pointer',
                                  fontFamily: tokens.base.typography.fontFamily.brand,
                                  fontSize: 14,
                                  fontWeight: isSlotSelected ? 700 : 500,
                                  lineHeight: '20px',
                                  transition: 'all 0.15s ease',
                                  flexShrink: 0,
                                }}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 8 }}>
                        <img src={CalendarAddFillSvg} alt="" style={{ width: 32, height: 32, opacity: 0.25 }} />
                        <span style={{ fontFamily: tokens.usage.typography.body.small.default.fontFamily, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#909090', textAlign: 'center' }}>
                          Select a date to see available times
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <Button
                    variant="tertiary"
                    size="medium"
                    onClick={() => setScheduleModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => setScheduleConfirmed(true)}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </>
  );
};
