import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarState } from '../../contexts/SidebarStateContext';
import { tokens } from '../../../tokens';
import { Sidebar } from '../../components/Sidebar';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { Input, Field } from '../../components/Field';
import { SegmentedControl } from '../../components/SegmentedControl';
import { PrismTextField, PrismDateField, PrismToggle, PrismButtonTabs } from '@doordash/prism-react';
import { SectionCard } from '../ProductForm/shared';
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
import PromoLineSvg from '../../icons/16/promo-line.svg';
import SettingsLineSvg from '../../icons/16/settings-line.svg';
import TvLineSvg from '../../icons/16/tv-line.svg';
import DevicePhoneSvg from '../../icons/16/device-phone.svg';
import StarFillSvg from '../../icons/16/star-fill.svg';
import CaretDownSvg from '../../icons/16/caret-down.svg';
import EditLineSvg from '../../icons/16/edit-line.svg';
import ShareLineSvg from '../../icons/16/share-line.svg';
import CaretRightSvg from '../../icons/16/caret-right.svg';
import LocationPinSvg from '../../icons/24/location-pin-enabled-line.svg';

import coverImg1 from '../../images/branding/cover-1.jpg';
import coverImg2 from '../../images/branding/cover-2.jpg';
import coverImg3 from '../../images/branding/cover-3.jpg';
import coverImg4 from '../../images/branding/cover-4.jpg';
import coverImg5 from '../../images/branding/cover-5.jpg';
import logoLight from '../../images/branding/logo-light.jpg';
import logoDark from '../../images/branding/logo-dark.jpg';
import EmailLineSvg from '../../icons/24/email-line.svg';
import GlobeLineSvg from '../../icons/24/globe-line.svg';
import TimeLineSvg from '../../icons/24/time-line.svg';
import OrderBagLine24Svg from '../../icons/24/order-bag-line.svg';
import CalendarLineSvg from '../../icons/24/calendar-line.svg';
import TrashLineSvg from '../../icons/16/trash-line.svg';
import CopyLineSvg from '../../icons/16/copy-line.svg';
import AddSvg from '../../icons/16/add.svg';

function SidebarIcon({ src }: { src: string }) {
  return <img src={src} alt="" role="presentation" style={{ width: 16, height: 16, flexShrink: 0, filter: 'brightness(0) invert(1)' }} />;
}

const PhoneCallIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.01l-2.2 2.21z" fill="#191919"/>
  </svg>
);

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 9999, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{
          fontFamily: tokens.usage.typography.label.small.default.fontFamily,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '22px',
          color: '#606060',
        }}>{label}</span>
        <span style={{
          fontFamily: tokens.usage.typography.label.small.default.fontFamily,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '22px',
          color: '#191919',
          whiteSpace: 'pre-line',
        }}>{value}</span>
      </div>
    </div>
  );
}

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: tokens.usage.typography.label.small.default.fontFamily,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '20px',
  color: '#191919',
};

function FieldLabel({ label, trailing }: { label: string; trailing?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
      <span style={fieldLabelStyle}>{label}</span>
      {trailing}
    </div>
  );
}

interface TimeSlot { open: string; close: string; }
interface DayHours { day: string; enabled: boolean; slots: TimeSlot[]; }
interface SpecialHourEntry { note: string; date: string; closed: boolean; slots: TimeSlot[]; }

interface StoreData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  regularHours: DayHours[];
  lastOrderCutoff: string;
  specialHours: SpecialHourEntry[];
}

const NV_STORE_DATA: StoreData = {
  name: 'Boba Bloom',
  description: 'A modern boba shop serving small-batch brewed teas, house-made syrups, and premium toppings.',
  address: 'Musterstraße 12, 10115 Berlin, Germany',
  phone: '(314) 867-5309',
  email: 'hello@bobabloom.de',
  website: 'hello@bobabloom.de',
  regularHours: [
    { day: 'Monday', enabled: true, slots: [{ open: '08:00', close: '16:00' }, { open: '17:00', close: '20:00' }] },
    { day: 'Tuesday', enabled: true, slots: [{ open: '08:00', close: '20:00' }] },
    { day: 'Wednesday', enabled: true, slots: [{ open: '08:00', close: '20:00' }] },
    { day: 'Thursday', enabled: true, slots: [{ open: '08:00', close: '20:00' }] },
    { day: 'Friday', enabled: true, slots: [{ open: '08:00', close: '20:00' }] },
    { day: 'Saturday', enabled: true, slots: [{ open: '08:00', close: '20:00' }] },
    { day: 'Sunday', enabled: true, slots: [{ open: '08:00', close: '20:00' }] },
  ],
  lastOrderCutoff: '20 minutes before close',
  specialHours: [
    { note: 'Thanksgiving', date: '2026-11-27', closed: true, slots: [] },
    { note: 'Christmas', date: '2026-12-25', closed: true, slots: [] },
  ],
};

const RX_STORE_DATA: StoreData = {
  name: 'Burgeramt Prenzlauer Berg',
  description: 'Award-winning burgers made with locally sourced ingredients in the heart of Prenzlauer Berg.',
  address: 'Krossener Str. 21-22, 10245 Berlin, Germany',
  phone: '(030) 2936-4646',
  email: 'info@burgeramt.de',
  website: 'burgeramt.de',
  regularHours: [
    { day: 'Monday', enabled: true, slots: [{ open: '11:00', close: '22:00' }] },
    { day: 'Tuesday', enabled: true, slots: [{ open: '11:00', close: '22:00' }] },
    { day: 'Wednesday', enabled: true, slots: [{ open: '11:00', close: '22:00' }] },
    { day: 'Thursday', enabled: true, slots: [{ open: '11:00', close: '22:00' }] },
    { day: 'Friday', enabled: true, slots: [{ open: '11:00', close: '22:00' }] },
    { day: 'Saturday', enabled: true, slots: [{ open: '12:00', close: '22:00' }] },
    { day: 'Sunday', enabled: true, slots: [{ open: '12:00', close: '22:00' }] },
  ],
  lastOrderCutoff: '30 minutes before close',
  specialHours: [
    { note: 'Thanksgiving', date: '2026-11-27', closed: true, slots: [] },
  ],
};

const CUTOFF_OPTIONS = ['10 minutes before close', '20 minutes before close', '30 minutes before close', '45 minutes before close', '60 minutes before close'];

function formatSpecialDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function groupRegularHoursForDisplay(hours: DayHours[]) {
  const groups: { label: string; slots: TimeSlot[] }[] = [];
  for (const dh of hours) {
    if (!dh.enabled) continue;
    const slotsKey = dh.slots.map(s => `${s.open}-${s.close}`).join(',');
    const last = groups[groups.length - 1];
    if (last && last.slots.map(s => `${s.open}-${s.close}`).join(',') === slotsKey) {
      const parts = last.label.split(' - ');
      last.label = `${parts[0]} - ${dh.day}`;
    } else {
      groups.push({ label: dh.day, slots: [...dh.slots] });
    }
  }
  return groups;
}

export const StoreSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const venue: Venue = (location.state as { venue?: Venue })?.venue ?? 'NV';
  const { expanded: sidebarExpanded, setExpanded: setSidebarExpanded } = useSidebarState();
  const [previewView, setPreviewView] = useState<'tv' | 'phone'>('phone');

  const defaults = venue === 'RX' ? RX_STORE_DATA : NV_STORE_DATA;
  const [storeData, setStoreData] = useState<StoreData>(defaults);
  const [editingInfo, setEditingInfo] = useState(false);
  const [draft, setDraft] = useState<StoreData>(defaults);
  const coverImages = [coverImg1, coverImg2, coverImg3, coverImg4, coverImg5];
  const logoImages = [logoLight, logoDark];
  const [selectedCover, setSelectedCover] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState(1);
  const [openSection, setOpenSection] = useState<'info' | 'branding' | 'hours' | null>('info');
  const toggleSection = (section: 'info' | 'branding' | 'hours') =>
    setOpenSection(prev => prev === section ? null : section);

  const [layoutVariant, setLayoutVariant] = useState<'A' | 'B'>('A');
  const [activeTab, setActiveTab] = useState<'info' | 'branding' | 'hours'>('info');

  // Hours editing state
  const [editingRegular, setEditingRegular] = useState(false);
  const [editingSpecial, setEditingSpecial] = useState(false);
  const [draftRegular, setDraftRegular] = useState<DayHours[]>([]);
  const [draftCutoff, setDraftCutoff] = useState('');
  const [draftSpecial, setDraftSpecial] = useState<SpecialHourEntry[]>([]);

  const startEditRegular = useCallback(() => {
    setDraftRegular(storeData.regularHours.map(d => ({ ...d, slots: d.slots.map(s => ({ ...s })) })));
    setDraftCutoff(storeData.lastOrderCutoff);
    setEditingRegular(true);
  }, [storeData]);

  const startEditSpecial = useCallback(() => {
    setDraftSpecial(storeData.specialHours.map(s => ({ ...s, slots: s.slots.map(sl => ({ ...sl })) })));
    setEditingSpecial(true);
  }, [storeData]);

  // AI rewrite state
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [aiDisplayed, setAiDisplayed] = useState('');
  const aiTypewriterRef = useRef<number | null>(null);
  const aiInputRef = useRef<HTMLInputElement>(null);

  const AI_PRESETS = [
    { label: 'More professional', prompt: 'Rewrite in a professional tone' },
    { label: 'Shorter', prompt: 'Make it shorter and punchier' },
    { label: 'More fun', prompt: 'Rewrite in a fun, playful tone' },
    { label: 'Highlight quality', prompt: 'Emphasize quality ingredients' },
  ];

  const AI_RESPONSES: Record<string, string> = {
    'Rewrite in a professional tone': 'Boba Bloom offers an expertly curated selection of small-batch brewed teas paired with artisanal syrups and premium toppings, delivering a refined boba experience in every cup.',
    'Make it shorter and punchier': 'Small-batch teas. House-made syrups. Premium toppings. Boba, perfected.',
    'Rewrite in a fun, playful tone': 'Welcome to Boba Bloom — where every sip is a party! We brew our teas fresh, whip up magical house-made syrups, and top it all off with the good stuff. Come thirsty, leave happy! 🧋✨',
    'Emphasize quality ingredients': 'At Boba Bloom, quality comes first. Our teas are brewed in small batches for peak flavor, our syrups are crafted in-house with real ingredients, and every topping is sourced from premium suppliers.',
  };
  const AI_FALLBACK = 'Boba Bloom is your go-to destination for thoughtfully crafted boba drinks, featuring small-batch brewed teas, house-made syrups, and carefully selected premium toppings.';

  const handleAiGenerate = useCallback((prompt: string) => {
    if (!prompt.trim()) return;
    setAiGenerating(true);
    setAiResult('');
    setAiDisplayed('');
    if (aiTypewriterRef.current) clearInterval(aiTypewriterRef.current);

    const response = AI_RESPONSES[prompt] || AI_FALLBACK;

    // Simulate network delay
    setTimeout(() => {
      setAiResult(response);
      setAiGenerating(false);
      let idx = 0;
      aiTypewriterRef.current = window.setInterval(() => {
        idx++;
        setAiDisplayed(response.slice(0, idx));
        if (idx >= response.length) {
          if (aiTypewriterRef.current) clearInterval(aiTypewriterRef.current);
        }
      }, 18);
    }, 1200);
  }, []);

  const handleAiAccept = useCallback(() => {
    setDraft(d => ({ ...d, description: aiResult }));
    setAiOpen(false);
    setAiPrompt('');
    setAiResult('');
    setAiDisplayed('');
  }, [aiResult]);

  const handleAiDiscard = useCallback(() => {
    setAiOpen(false);
    setAiPrompt('');
    setAiResult('');
    setAiDisplayed('');
    if (aiTypewriterRef.current) clearInterval(aiTypewriterRef.current);
  }, []);

  useEffect(() => {
    if (aiOpen && aiInputRef.current) {
      aiInputRef.current.focus();
    }
  }, [aiOpen]);

  useEffect(() => {
    return () => {
      if (aiTypewriterRef.current) clearInterval(aiTypewriterRef.current);
    };
  }, []);

  // Image AI edit state
  type ImgEffect = 'video' | 'expand' | 'center' | 'autofit' | null;
  const [imgAiTarget, setImgAiTarget] = useState<'cover' | 'logo' | null>(null);
  const [imgAiPrompt, setImgAiPrompt] = useState('');
  const [imgAiGenerating, setImgAiGenerating] = useState(false);
  const [imgAiDone, setImgAiDone] = useState(false);
  const imgAiInputRef = useRef<HTMLInputElement>(null);
  const [coverEffect, setCoverEffect] = useState<ImgEffect>(null);
  const [logoEffect, setLogoEffect] = useState<ImgEffect>(null);

  const IMG_AI_PRESETS: { label: string; icon: string; effect: ImgEffect }[] = [
    { label: 'Make into video', icon: '▶', effect: 'video' },
    { label: 'Expand image', icon: '↔', effect: 'expand' },
    { label: 'Auto-fit to frame', icon: '⬒', effect: 'autofit' },
  ];

  const pendingEffectRef = useRef<ImgEffect>(null);

  const handleImgAiOpen = useCallback((target: 'cover' | 'logo') => {
    if (imgAiTarget === target) {
      setImgAiTarget(null);
      setImgAiPrompt('');
      setImgAiGenerating(false);
      setImgAiDone(false);
    } else {
      setImgAiTarget(target);
      setImgAiPrompt('');
      setImgAiGenerating(false);
      setImgAiDone(false);
    }
  }, [imgAiTarget]);

  const handleImgAiGenerate = useCallback((prompt: string, effect?: ImgEffect) => {
    if (!prompt.trim()) return;
    pendingEffectRef.current = effect ?? null;
    setImgAiGenerating(true);
    setImgAiDone(false);
    setTimeout(() => {
      setImgAiGenerating(false);
      setImgAiDone(true);
      const eff = pendingEffectRef.current;
      if (eff) {
        setImgAiTarget(prev => {
          if (prev === 'cover') setCoverEffect(eff);
          if (prev === 'logo') setLogoEffect(eff);
          return prev;
        });
      }
    }, 1800);
  }, []);

  const handleImgAiClose = useCallback(() => {
    setImgAiTarget(null);
    setImgAiPrompt('');
    setImgAiGenerating(false);
    setImgAiDone(false);
  }, []);

  const getImgStyle = (effect: ImgEffect, isPreviewHero?: boolean): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '100%', height: '100%', display: 'block',
      transition: 'transform 0.6s ease, object-fit 0.6s ease, object-position 0.6s ease',
    };
    switch (effect) {
      case 'video':
        return { ...base, objectFit: 'cover', animation: 'imgKenBurns 8s ease-in-out infinite alternate' };
      case 'expand':
        return { ...base, objectFit: 'cover', transform: 'scale(0.85)', objectPosition: 'center center' };
      case 'center':
        return { ...base, objectFit: 'cover', objectPosition: 'center center' };
      case 'autofit':
        return { ...base, objectFit: 'contain', backgroundColor: isPreviewHero ? '#1a1a1a' : '#f0f0f0' };
      default:
        return { ...base, objectFit: 'cover', objectPosition: isPreviewHero ? 'center 40%' : 'center center' };
    }
  };

  useEffect(() => {
    if (imgAiTarget && imgAiInputRef.current) {
      imgAiInputRef.current.focus();
    }
  }, [imgAiTarget]);

  const renderImageAiPanel = (target: 'cover' | 'logo') => {
    const isOpen = imgAiTarget === target;
    return (
      <>
        {/* AI edit trigger button */}
        <div
          onClick={() => handleImgAiOpen(target)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
            padding: '6px 12px', borderRadius: 9999, alignSelf: 'flex-start',
            background: isOpen ? 'rgba(25,25,25,0.06)' : 'transparent',
            border: isOpen ? '1px solid rgba(25,25,25,0.12)' : '1px solid transparent',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
        >
          <img src={PromoLineSvg} alt="" style={{ width: 16, height: 16 }} />
          <span style={{
            fontSize: 13, fontWeight: 600, lineHeight: '18px',
            color: '#191919',
          }}>Edit image with prompt</span>
        </div>

        {/* AI prompt panel */}
        <div style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12,
              padding: 16, borderRadius: 16,
              background: '#F5F5F5',
              border: '1px solid #E4E4E4',
            }}>
              {/* Prompt input */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src={PromoLineSvg} alt="" style={{ width: 20, height: 20, flexShrink: 0 }} />
                <input
                  ref={isOpen ? imgAiInputRef : undefined}
                  type="text"
                  placeholder={`Describe how to edit this ${target === 'cover' ? 'cover image' : 'logo'}…`}
                  value={imgAiPrompt}
                  onChange={e => setImgAiPrompt(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleImgAiGenerate(imgAiPrompt); }}
                  disabled={imgAiGenerating}
                  style={{
                    flex: 1, border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                    fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#191919',
                  }}
                />
                <button
                  onClick={() => handleImgAiGenerate(imgAiPrompt)}
                  disabled={imgAiGenerating || !imgAiPrompt.trim()}
                  style={{
                    flexShrink: 0, width: 32, height: 32, borderRadius: 9999,
                    border: 'none',
                    cursor: imgAiGenerating || !imgAiPrompt.trim() ? 'default' : 'pointer',
                    background: imgAiGenerating || !imgAiPrompt.trim()
                      ? 'rgba(25,25,25,0.15)'
                      : '#191919',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: imgAiGenerating || !imgAiPrompt.trim() ? 0.5 : 1,
                    transition: 'background 0.2s ease, opacity 0.2s ease',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2.667V13.333M8 2.667L4 6.667M8 2.667l4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              {/* Preset chips */}
              <div style={{ display: 'flex', gap: 6 }}>
                {IMG_AI_PRESETS.map(p => (
                  <button
                    key={p.label}
                    onClick={() => { setImgAiPrompt(p.label); handleImgAiGenerate(p.label, p.effect); }}
                    disabled={imgAiGenerating}
                    style={{
                      padding: '6px 12px', borderRadius: 9999,
                      border: '1px solid #E4E4E4',
                      background: '#FFFFFF',
                      fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                      fontSize: 13, fontWeight: 500, lineHeight: '18px',
                      color: '#191919', cursor: imgAiGenerating ? 'default' : 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Generating / done state */}
              {(imgAiGenerating || imgAiDone) && (
                <div style={{
                  padding: 12, borderRadius: 12, backgroundColor: '#FFFFFF',
                  border: '1px solid #E4E4E4',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {imgAiGenerating ? (
                    <>
                      <div style={{
                        width: 16, height: 16, borderRadius: 9999,
                        border: '2px solid rgba(25,25,25,0.2)',
                        borderTopColor: '#191919',
                        animation: 'aiSpin 0.6s linear infinite',
                      }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#606060' }}>Processing image…</span>
                      <style>{`@keyframes aiSpin { to { transform: rotate(360deg); } }`}</style>
                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#327A34"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#327A34' }}>Edit applied to preview</span>
                      </div>
                      <button
                        onClick={handleImgAiClose}
                        style={{
                          padding: '4px 12px', borderRadius: 9999, border: '1px solid #E4E4E4',
                          background: 'transparent', color: '#6E6E71',
                          fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}
                      >Done</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderPreviewContent = (view: 'phone' | 'tv') => (
    <div style={{ flex: 1, minHeight: 0, padding: '0 24px 24px', display: 'flex', flexDirection: 'column', alignItems: view === 'phone' ? 'center' : 'stretch', overflowY: 'auto' }}>
      <div
        style={{
          ...(view === 'phone' ? { width: 375, height: 812, flexShrink: 0 } : { width: '100%', flex: 1, minHeight: 0 }),
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
        <div style={{ position: 'relative', width: '100%', height: view === 'phone' ? 360 : 325, backgroundColor: coverEffect === 'autofit' ? '#1a1a1a' : '#B5E3D8', flexShrink: 0, overflow: 'hidden', transition: 'background-color 0.4s ease' }}>
          <img src={coverImages[selectedCover]} alt="" style={{ ...getImgStyle(coverEffect, true), transition: 'transform 0.6s ease, object-fit 0.4s ease, object-position 0.4s ease' }} />
          {coverEffect === 'video' && (
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2,
              width: 56, height: 56, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              <svg width="24" height="24" viewBox="0 0 12 12" fill="none"><path d="M3 2l7 4-7 4V2z" fill="#191919"/></svg>
            </div>
          )}
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
          <div style={{ position: 'absolute', left: 24, bottom: 0, right: 24, display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={logoImages[selectedLogo]} alt="" style={{
                width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                objectFit: logoEffect === 'autofit' ? 'contain' : 'cover',
                objectPosition: 'center center',
                backgroundColor: logoEffect === 'autofit' ? '#f0f0f0' : 'transparent',
                transition: 'object-fit 0.4s ease, background-color 0.4s ease',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 24, fontWeight: 800, lineHeight: 'normal', color: '#FFFFFF' }}>
                  {storeData.name}
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#FFFFFF', letterSpacing: '-0.01px' }}>
                  $0 delivery on $12+ · 4.2 mi · Pricing & fees
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 9999, backgroundColor: 'rgba(247,247,247,0.15)' }}>
                <img src={StarFillSvg} alt="" style={{ width: 16, height: 16 }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}>Customer favorite</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 9999, backgroundColor: 'rgba(247,247,247,0.15)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}>More store info</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery bar */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 16px' }}>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: '#F7F7F7', borderRadius: 20, padding: '4px 8px 4px 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '4px 16px', backgroundColor: '#FFFFFF', border: '1px solid #E4E4E4', borderRadius: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#191919' }}>Delivery</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#191919' }}>20-30 min</span>
                  <img src={CaretDownSvg} alt="" style={{ width: 16, height: 16 }} />
                </div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#191919' }}>Pick up</span>
                <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#191919' }}>10-20 min</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#191919' }}>Go out</span>
                <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#191919' }}>1.7 km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Picked for you */}
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 16, fontWeight: 700, lineHeight: '20px', color: '#191919' }}>Picked for you</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2].map((i) => (
              <div key={i} style={{ width: 165, height: 160, borderRadius: 12, backgroundColor: '#F1F1F1', flexShrink: 0 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const hoursForPreview = editingRegular ? draftRegular : storeData.regularHours;
  const DAY_ABBR: Record<string, string> = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

  const renderHoursPreviewContent = (view: 'phone' | 'tv') => (
    <div style={{ flex: 1, minHeight: 0, padding: '0 24px 24px', display: 'flex', flexDirection: 'column', alignItems: view === 'phone' ? 'center' : 'stretch', overflowY: 'auto' }}>
      <div
        style={{
          ...(view === 'phone' ? { width: 375, height: 812, flexShrink: 0 } : { width: '100%', flex: 1, minHeight: 0 }),
          backgroundColor: '#FFFFFF',
          borderRadius: 36,
          boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.16)',
          overflowX: 'hidden',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', flexShrink: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#191919' }}>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="#191919"/><rect x="4" y="2" width="3" height="10" rx="1" fill="#191919"/><rect x="8" y="1" width="3" height="11" rx="1" fill="#191919"/><rect x="12" y="0" width="3" height="12" rx="1" fill="#191919"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2.5c2.1 0 4 .8 5.5 2.1l-1.1 1.3C11.2 4.7 9.7 4 8 4S4.8 4.7 3.6 5.9L2.5 4.6C4 3.3 5.9 2.5 8 2.5zm0 4c1.2 0 2.3.5 3.1 1.2L9.9 9C9.4 8.5 8.7 8.2 8 8.2s-1.4.3-1.9.8L4.9 7.7C5.7 7 6.8 6.5 8 6.5zM8 10.5c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z" fill="#191919"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0" y="1" width="21" height="10" rx="2" stroke="#191919" strokeWidth="1"/><rect x="1.5" y="2.5" width="18" height="7" rx="1" fill="#191919"/><rect x="22" y="4" width="2" height="4" rx="1" fill="#191919"/></svg>
          </div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: tokens.base.typography.fontFamily.brand, fontSize: 18, fontWeight: 700, color: '#191919' }}>{storeData.name}</span>
        </div>

        {/* Address placeholder */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderBottom: '1px solid #F1F1F1' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="3" stroke="#B0B0B0" strokeWidth="1.5"/><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" stroke="#B0B0B0" strokeWidth="1.5"/></svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: 180, height: 12, borderRadius: 6, backgroundColor: '#E8E8E8' }} />
            <div style={{ width: 120, height: 12, borderRadius: 6, backgroundColor: '#E8E8E8' }} />
          </div>
        </div>

        {/* Store hours section */}
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px solid #F1F1F1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={TimeLineSvg} alt="" style={{ width: 24, height: 24, opacity: 0.7 }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#191919' }}>Store hours</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 36 }}>
            {hoursForPreview.filter(d => d.enabled).map(dh => (
              <div key={dh.day}>
                {dh.slots.map((slot, si) => (
                  <div key={si} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#191919', width: 40 }}>{si === 0 ? DAY_ABBR[dh.day] || dh.day : ''}</span>
                    <span style={{ fontSize: 14, fontWeight: 400, color: '#191919' }}>{slot.open} - {slot.close}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Website placeholder */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderBottom: '1px solid #F1F1F1' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#B0B0B0" strokeWidth="1.5"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" stroke="#B0B0B0" strokeWidth="1.5"/></svg>
          <div style={{ width: 200, height: 12, borderRadius: 6, backgroundColor: '#E8E8E8' }} />
        </div>

        {/* Phone placeholder */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderBottom: '1px solid #F1F1F1' }}>
          <PhoneCallIcon />
          <div style={{ width: 120, height: 12, borderRadius: 6, backgroundColor: '#E8E8E8' }} />
        </div>

        {/* Home indicator */}
        {view === 'phone' && (
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', padding: '8px 0 12px' }}>
            <div style={{ width: 134, height: 5, borderRadius: 100, backgroundColor: '#191919' }} />
          </div>
        )}
      </div>
    </div>
  );

  const sectionBg = layoutVariant === 'A' ? '#F8F8F8' : 'transparent';

  const infoContent = (
        <div style={{ backgroundColor: sectionBg, borderRadius: layoutVariant === 'A' ? 20 : 0, padding: layoutVariant === 'A' ? 20 : 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {editingInfo ? (
            <>
              {/* --- Edit mode --- */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <FieldLabel label="Store name" />
                <Input
                  value={draft.name}
                  onChange={v => setDraft({ ...draft, name: v })}
                  size="large"
                  width="100%"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <FieldLabel
                  label="Store descriptions"
                  trailing={
                    <div
                      onClick={() => setAiOpen(!aiOpen)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                        padding: '6px 12px', borderRadius: 9999,
                        background: aiOpen ? 'rgba(25,25,25,0.06)' : 'transparent',
                        border: aiOpen ? '1px solid rgba(25,25,25,0.12)' : '1px solid transparent',
                        transition: 'background 0.15s ease, border-color 0.15s ease',
                      }}
                    >
                      <img src={PromoLineSvg} alt="" style={{ width: 16, height: 16 }} />
                      <span style={{ fontSize: 13, fontWeight: 600, lineHeight: '18px', color: '#191919' }}>
                        Re-write this
                      </span>
                    </div>
                  }
                />

                {/* AI prompt panel */}
                <div style={{
                  display: 'grid',
                  gridTemplateRows: aiOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      display: 'flex', flexDirection: 'column', gap: 12,
                      padding: 16, borderRadius: 16,
                      background: '#F5F5F5',
                      border: '1px solid #E4E4E4',
                    }}>
                      {/* Prompt input */}
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <img src={PromoLineSvg} alt="" style={{ width: 20, height: 20, flexShrink: 0 }} />
                        <input
                          ref={aiInputRef}
                          type="text"
                          placeholder="Tell AI how to rewrite your description…"
                          value={aiPrompt}
                          onChange={e => setAiPrompt(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') handleAiGenerate(aiPrompt); }}
                          disabled={aiGenerating}
                          style={{
                            flex: 1, border: 'none', outline: 'none',
                            background: 'transparent',
                            fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                            fontSize: 14, fontWeight: 500, lineHeight: '20px',
                            color: '#191919',
                          }}
                        />
                        <button
                          onClick={() => handleAiGenerate(aiPrompt)}
                          disabled={aiGenerating || !aiPrompt.trim()}
                          style={{
                            flexShrink: 0, width: 32, height: 32, borderRadius: 9999,
                            border: 'none', cursor: aiGenerating || !aiPrompt.trim() ? 'default' : 'pointer',
                            background: aiGenerating || !aiPrompt.trim()
                              ? 'rgba(25,25,25,0.15)'
                              : '#191919',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.2s ease, opacity 0.2s ease',
                            opacity: aiGenerating || !aiPrompt.trim() ? 0.5 : 1,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2.667V13.333M8 2.667L4 6.667M8 2.667l4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>

                      {/* Preset chips */}
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {AI_PRESETS.map(p => (
                          <button
                            key={p.label}
                            onClick={() => { setAiPrompt(p.prompt); handleAiGenerate(p.prompt); }}
                            disabled={aiGenerating}
                            style={{
                              padding: '6px 12px', borderRadius: 9999,
                              border: '1px solid #E4E4E4',
                              background: '#FFFFFF',
                              fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                              fontSize: 13, fontWeight: 500, lineHeight: '18px',
                              color: '#191919', cursor: aiGenerating ? 'default' : 'pointer',
                              transition: 'background 0.15s ease',
                            }}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>

                      {/* Generating / result area */}
                      {(aiGenerating || aiResult) && (
                        <div style={{
                          padding: 12, borderRadius: 12, backgroundColor: '#FFFFFF',
                          border: '1px solid #E4E4E4',
                          minHeight: 60, display: 'flex', flexDirection: 'column', gap: 8,
                        }}>
                          {aiGenerating ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{
                                width: 16, height: 16, borderRadius: 9999,
                                border: '2px solid rgba(25,25,25,0.2)',
                                borderTopColor: '#191919',
                                animation: 'aiSpin 0.6s linear infinite',
                              }} />
                              <span style={{ fontSize: 13, fontWeight: 500, color: '#606060' }}>Generating…</span>
                              <style>{`@keyframes aiSpin { to { transform: rotate(360deg); } }`}</style>
                            </div>
                          ) : (
                            <>
                              <p style={{
                                margin: 0,
                                fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                                fontSize: 14, fontWeight: 400, lineHeight: '20px',
                                color: '#191919', whiteSpace: 'pre-wrap',
                              }}>
                                {aiDisplayed}
                                {aiDisplayed.length < aiResult.length && (
                                  <span style={{
                                    display: 'inline-block', width: 2, height: 14,
                                    backgroundColor: '#191919', marginLeft: 1,
                                    animation: 'aiBlink 0.6s steps(2) infinite',
                                    verticalAlign: 'text-bottom',
                                  }} />
                                )}
                              </p>
                              <style>{`@keyframes aiBlink { 50% { opacity: 0; } }`}</style>
                              {aiDisplayed.length >= aiResult.length && (
                                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                  <button
                                    onClick={handleAiAccept}
                                    style={{
                                      padding: '6px 16px', borderRadius: 9999, border: 'none',
                                      background: '#191919',
                                      color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                    }}
                                  >Accept</button>
                                  <button
                                    onClick={() => handleAiGenerate(aiPrompt)}
                                    style={{
                                      padding: '6px 16px', borderRadius: 9999,
                                      border: '1px solid #E4E4E4',
                                      background: 'transparent',
                                      color: '#191919', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                    }}
                                  >Regenerate</button>
                                  <button
                                    onClick={handleAiDiscard}
                                    style={{
                                      padding: '6px 16px', borderRadius: 9999,
                                      border: '1px solid #E4E4E4',
                                      background: 'transparent',
                                      color: '#6E6E71', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                    }}
                                  >Discard</button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Field size="large" width="100%" style={{ height: 89, alignItems: 'flex-start', padding: 0 }}>
                  <textarea
                    value={draft.description}
                    onChange={e => setDraft({ ...draft, description: e.target.value })}
                    rows={3}
                    style={{
                      flex: 1, minWidth: 0, width: '100%', height: '100%',
                      border: 'none', outline: 'none', background: 'transparent', resize: 'vertical',
                      fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                      fontSize: tokens.usage.typography.label.small.default.fontSize,
                      fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                      lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                      color: tokens.semantic.colors.text.neutral,
                      padding: '12px 12px',
                      boxSizing: 'border-box',
                    }}
                  />
                </Field>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <FieldLabel label="Store address" />
                <Input
                  value={draft.address}
                  onChange={v => setDraft({ ...draft, address: v })}
                  size="large"
                  width="100%"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <FieldLabel label="Phone" />
                <Input
                  value={draft.phone}
                  onChange={v => setDraft({ ...draft, phone: v })}
                  size="large"
                  width="100%"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <FieldLabel label="Email" />
                <Input
                  value={draft.email}
                  onChange={v => setDraft({ ...draft, email: v })}
                  size="large"
                  width="100%"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <FieldLabel label="Website" />
                <Input
                  value={draft.website}
                  onChange={v => setDraft({ ...draft, website: v })}
                  size="large"
                  width="100%"
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => { setStoreData({ ...draft }); setEditingInfo(false); }}
                >Save</Button>
                <Button
                  variant="tertiary"
                  size="large"
                  onClick={() => { setDraft({ ...storeData }); setEditingInfo(false); }}
                >Cancel</Button>
              </div>
            </>
          ) : (
            <>
              {/* --- Read mode --- */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{
                    fontFamily: tokens.usage.typography.label.medium.strong.fontFamily,
                    fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#191919',
                  }}>{storeData.name}</span>
                  <span style={{
                    fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                    fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#606060',
                  }}>{storeData.description}</span>
                </div>
                <Button
                  variant="secondary"
                  size="medium"
                  icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />}
                  onClick={() => { setDraft({ ...storeData }); setEditingInfo(true); }}
                >
                  Edit
                </Button>
              </div>

              <InfoRow
                icon={<img src={LocationPinSvg} alt="" style={{ width: 24, height: 24 }} />}
                label="Store address"
                value={storeData.address}
              />
              <InfoRow
                icon={<PhoneCallIcon />}
                label="Phone"
                value={storeData.phone}
              />
              <InfoRow
                icon={<img src={EmailLineSvg} alt="" style={{ width: 24, height: 24 }} />}
                label="Email"
                value={storeData.email}
              />
              <InfoRow
                icon={<img src={GlobeLineSvg} alt="" style={{ width: 24, height: 24 }} />}
                label="Website"
                value={storeData.website}
              />
            </>
          )}
        </div>
  );

  const brandingContent = (
        <>
        {/* Cover image card */}
        <div style={{ backgroundColor: sectionBg, borderRadius: layoutVariant === 'A' ? 20 : 0, padding: layoutVariant === 'A' ? 20 : 0, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#191919' }}>Your cover image</span>
              <span style={{ fontFamily: tokens.usage.typography.label.small.default.fontFamily, fontSize: 16, fontWeight: 500, lineHeight: '22px', color: 'rgba(32,33,37,0.64)' }}>Upload the image that best shows off your store.</span>
            </div>
            <Button variant="secondary" size="medium" icon={<img src={ShareLineSvg} alt="" style={{ width: 16, height: 16 }} />}>Upload</Button>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {coverImages.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCover(i)}
                  style={{
                    flex: '1 0 0',
                    aspectRatio: '131.75 / 158.45',
                    borderRadius: 16,
                    border: i === selectedCover ? '2px solid #191919' : '2px solid transparent',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                    backgroundColor: i === selectedCover && coverEffect === 'autofit' ? '#1a1a1a' : undefined,
                  }}
                >
                  <img src={src} alt="" style={i === selectedCover ? getImgStyle(coverEffect) : { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {i === selectedCover && coverEffect === 'video' && (
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.25)', pointerEvents: 'none',
                    }}>
                      <div style={{ width: 28, height: 28, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 2l7 4-7 4V2z" fill="#191919"/></svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {renderImageAiPanel('cover')}
        </div>

        {/* Store logo card */}
        <div style={{ backgroundColor: sectionBg, borderRadius: layoutVariant === 'A' ? 20 : 0, padding: layoutVariant === 'A' ? 20 : 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
            <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#191919' }}>Your store logo</span>
              <span style={{ fontFamily: tokens.usage.typography.label.small.default.fontFamily, fontSize: 16, fontWeight: 500, lineHeight: '22px', color: 'rgba(32,33,37,0.64)' }}>Upload the logo you want customers to see.</span>
            </div>
            <Button variant="secondary" size="medium" icon={<img src={ShareLineSvg} alt="" style={{ width: 16, height: 16 }} />}>Upload</Button>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
            {logoImages.map((src, i) => (
              <div
                key={i}
                onClick={() => setSelectedLogo(i)}
                style={{
                  width: 'calc((100% - 48px) / 5)', aspectRatio: '1 / 1', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
                  border: i === selectedLogo ? '2px solid #191919' : '2px solid #E4E4E4',
                  transition: 'border-color 0.15s ease',
                  position: 'relative',
                  backgroundColor: i === selectedLogo && logoEffect === 'autofit' ? '#f0f0f0' : undefined,
                }}
              >
                <img src={src} alt="" style={i === selectedLogo ? getImgStyle(logoEffect) : { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {i === selectedLogo && logoEffect === 'video' && (
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.25)', pointerEvents: 'none',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 2l7 4-7 4V2z" fill="#191919"/></svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {renderImageAiPanel('logo')}
        </div>
        </>
  );

  const hoursContent = (
        <>
        {/* ===== Regular hours card ===== */}
        <div style={{ backgroundColor: sectionBg, borderRadius: layoutVariant === 'A' ? 20 : 0, padding: layoutVariant === 'A' ? 20 : 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#191919' }}>Regular hours</span>
              <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#606060' }}>These are the hours your store is available on DoorDash.</span>
            </div>
            {!editingRegular && (
              <Button variant="secondary" size="medium" onClick={startEditRegular}
                icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />}>
                Edit
              </Button>
            )}
          </div>

          {editingRegular ? (
            <>
              {draftRegular.map((dh, di) => (
                <div key={dh.day} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {dh.slots.map((slot, si) => (
                    <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {si === 0 && (
                        <>
                          <button
                            onClick={() => {
                              const next = [...draftRegular];
                              next[di] = { ...next[di], enabled: !next[di].enabled };
                              setDraftRegular(next);
                            }}
                            style={{
                              width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative',
                              backgroundColor: dh.enabled ? '#191919' : '#E4E4E4', transition: 'background-color 0.2s',
                            }}
                            aria-label={`Toggle ${dh.day}`}
                          >
                            <div style={{
                              width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', position: 'absolute', top: 2,
                              left: dh.enabled ? 22 : 2, transition: 'left 0.2s',
                            }} />
                          </button>
                          <span style={{ width: 90, fontSize: 14, fontWeight: 500, color: '#191919' }}>{dh.day}</span>
                        </>
                      )}
                      {si > 0 && <div style={{ width: 134 }} />}
                      <select
                        value={slot.open}
                        onChange={e => {
                          const next = [...draftRegular];
                          next[di] = { ...next[di], slots: next[di].slots.map((s, idx) => idx === si ? { ...s, open: e.target.value } : s) };
                          setDraftRegular(next);
                        }}
                        disabled={!dh.enabled}
                        style={{
                          width: 100, height: 40, borderRadius: 8, border: '1px solid #E4E4E4', padding: '0 8px',
                          fontSize: 14, backgroundColor: '#fff', cursor: 'pointer', appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                        }}
                      >
                        {Array.from({ length: 48 }, (_, i) => {
                          const h = String(Math.floor(i / 2)).padStart(2, '0');
                          const m = i % 2 === 0 ? '00' : '30';
                          return <option key={i} value={`${h}:${m}`}>{`${h}:${m}`}</option>;
                        })}
                      </select>
                      <span style={{ color: '#606060' }}>-</span>
                      <select
                        value={slot.close}
                        onChange={e => {
                          const next = [...draftRegular];
                          next[di] = { ...next[di], slots: next[di].slots.map((s, idx) => idx === si ? { ...s, close: e.target.value } : s) };
                          setDraftRegular(next);
                        }}
                        disabled={!dh.enabled}
                        style={{
                          width: 100, height: 40, borderRadius: 8, border: '1px solid #E4E4E4', padding: '0 8px',
                          fontSize: 14, backgroundColor: '#fff', cursor: 'pointer', appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                        }}
                      >
                        {Array.from({ length: 48 }, (_, i) => {
                          const h = String(Math.floor(i / 2)).padStart(2, '0');
                          const m = i % 2 === 0 ? '00' : '30';
                          return <option key={i} value={`${h}:${m}`}>{`${h}:${m}`}</option>;
                        })}
                      </select>
                      {si === 0 && (
                        <button
                          onClick={() => {
                            const next = [...draftRegular];
                            next[di] = { ...next[di], slots: [...next[di].slots, { open: '17:00', close: '20:00' }] };
                            setDraftRegular(next);
                          }}
                          disabled={!dh.enabled}
                          style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E4E4E4', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          aria-label="Add time slot"
                        >
                          <img src={AddSvg} alt="" style={{ width: 16, height: 16 }} />
                        </button>
                      )}
                      {si === 0 && di === 0 && (
                        <button
                          onClick={() => {
                            const firstSlots = draftRegular[0].slots.map(s => ({ ...s }));
                            setDraftRegular(draftRegular.map(d => ({ ...d, enabled: true, slots: firstSlots.map(s => ({ ...s })) })));
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#191919', whiteSpace: 'nowrap' }}
                        >
                          <img src={CopyLineSvg} alt="" style={{ width: 16, height: 16 }} /> Apply to all
                        </button>
                      )}
                      {si > 0 && (
                        <button
                          onClick={() => {
                            const next = [...draftRegular];
                            next[di] = { ...next[di], slots: next[di].slots.filter((_, idx) => idx !== si) };
                            setDraftRegular(next);
                          }}
                          style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          aria-label="Remove time slot"
                        >
                          <img src={TrashLineSvg} alt="" style={{ width: 16, height: 16, filter: 'invert(22%) sepia(93%) saturate(6245%) hue-rotate(355deg) brightness(89%) contrast(97%)' }} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* Last order cutoff */}
              <div style={{ borderTop: '1px solid #E4E4E4', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#191919' }}>Last order cutoff</span>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#606060' }}>When store will stop accepting orders.</span>
                <select
                  value={draftCutoff}
                  onChange={e => setDraftCutoff(e.target.value)}
                  style={{
                    width: 280, height: 44, borderRadius: 8, border: '1px solid #E4E4E4', padding: '0 12px',
                    fontSize: 14, backgroundColor: '#fff', cursor: 'pointer', appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
                  }}
                >
                  {CUTOFF_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* Save / Cancel */}
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button variant="primary" size="large" onClick={() => setEditingRegular(false)}>Save</Button>
                <Button variant="tertiary" size="large" onClick={() => setEditingRegular(false)}>Cancel</Button>
              </div>
            </>
          ) : (
            <>
              {groupRegularHoursForDisplay(storeData.regularHours).map((g, i) => (
                <InfoRow
                  key={i}
                  icon={<img src={TimeLineSvg} alt="" style={{ width: 24, height: 24 }} />}
                  label={g.label}
                  value={g.slots.map(s => `${s.open} - ${s.close}`).join('\n')}
                />
              ))}
              <InfoRow
                icon={<img src={OrderBagLine24Svg} alt="" style={{ width: 24, height: 24 }} />}
                label="Last order cutoff"
                value={storeData.lastOrderCutoff}
              />
            </>
          )}
        </div>

        {/* ===== Special hours card ===== */}
        <div style={{ backgroundColor: sectionBg, borderRadius: layoutVariant === 'A' ? 20 : 0, padding: layoutVariant === 'A' ? 20 : 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#191919' }}>Special hours</span>
              <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#606060' }}>
                Special hours or closures for holidays, special events, or other exceptional events. This will temporarily replace your regular menu hours.
              </span>
            </div>
            {!editingSpecial && (
              <Button variant="secondary" size="medium" onClick={startEditSpecial}
                icon={<img src={EditLineSvg} alt="" style={{ width: 16, height: 16 }} />}>
                Edit
              </Button>
            )}
          </div>

          {editingSpecial ? (
            <>
              {draftSpecial.map((entry, ei) => (
                <div key={ei} style={{ display: 'flex', flexDirection: 'column', gap: 12, borderBottom: ei < draftSpecial.length - 1 ? '1px solid #E4E4E4' : undefined, paddingBottom: ei < draftSpecial.length - 1 ? 16 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#191919' }}>New hours</span>
                    <button
                      onClick={() => setDraftSpecial(draftSpecial.filter((_, idx) => idx !== ei))}
                      style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      aria-label="Remove special hours entry"
                    >
                      <img src={TrashLineSvg} alt="" style={{ width: 16, height: 16, filter: 'invert(22%) sepia(93%) saturate(6245%) hue-rotate(355deg) brightness(89%) contrast(97%)' }} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <PrismTextField
                        label="Note"
                        value={entry.note}
                        onChange={(val: string) => {
                          const next = [...draftSpecial];
                          next[ei] = { ...next[ei], note: val };
                          setDraftSpecial(next);
                        }}
                        placeholder="e.g. Thanksgiving"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <PrismDateField
                        label="Date"
                        value={entry.date}
                        onChange={(dateStr: string) => {
                          const next = [...draftSpecial];
                          next[ei] = { ...next[ei], date: dateStr };
                          setDraftSpecial(next);
                        }}
                      />
                    </div>
                  </div>
                  {/* Toggle + time slots inline */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {entry.slots.map((slot, si) => (
                      <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {si === 0 ? (
                          <div style={{ width: 110, flexShrink: 0 }}>
                            <PrismToggle
                              label={entry.closed ? 'Closed' : 'Open'}
                              isSelected={!entry.closed}
                              onChange={(isSelected: boolean) => {
                                const next = [...draftSpecial];
                                next[ei] = { ...next[ei], closed: !isSelected, slots: isSelected && next[ei].slots.length === 0 ? [{ open: '08:00', close: '16:00' }] : next[ei].slots };
                                setDraftSpecial(next);
                              }}
                            />
                          </div>
                        ) : (
                          <div style={{ width: 110, flexShrink: 0 }} />
                        )}
                        <select
                          value={slot.open}
                          onChange={e => {
                            const next = [...draftSpecial];
                            next[ei] = { ...next[ei], slots: next[ei].slots.map((s, idx) => idx === si ? { ...s, open: e.target.value } : s) };
                            setDraftSpecial(next);
                          }}
                          style={{
                            width: 100, height: 40, borderRadius: 8, border: '1px solid #E4E4E4', padding: '0 8px',
                            fontSize: 14, backgroundColor: '#fff', cursor: 'pointer', appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                          }}
                        >
                          {Array.from({ length: 48 }, (_, i) => {
                            const h = String(Math.floor(i / 2)).padStart(2, '0');
                            const m = i % 2 === 0 ? '00' : '30';
                            return <option key={i} value={`${h}:${m}`}>{`${h}:${m}`}</option>;
                          })}
                        </select>
                        <span style={{ color: '#606060' }}>-</span>
                        <select
                          value={slot.close}
                          onChange={e => {
                            const next = [...draftSpecial];
                            next[ei] = { ...next[ei], slots: next[ei].slots.map((s, idx) => idx === si ? { ...s, close: e.target.value } : s) };
                            setDraftSpecial(next);
                          }}
                          style={{
                            width: 100, height: 40, borderRadius: 8, border: '1px solid #E4E4E4', padding: '0 8px',
                            fontSize: 14, backgroundColor: '#fff', cursor: 'pointer', appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                          }}
                        >
                          {Array.from({ length: 48 }, (_, i) => {
                            const h = String(Math.floor(i / 2)).padStart(2, '0');
                            const m = i % 2 === 0 ? '00' : '30';
                            return <option key={i} value={`${h}:${m}`}>{`${h}:${m}`}</option>;
                          })}
                        </select>
                        {si === 0 ? (
                          <button
                            onClick={() => {
                              const next = [...draftSpecial];
                              next[ei] = { ...next[ei], slots: [...next[ei].slots, { open: '18:00', close: '20:00' }] };
                              setDraftSpecial(next);
                            }}
                            style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E4E4E4', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label="Add time slot"
                          >
                            <img src={AddSvg} alt="" style={{ width: 16, height: 16 }} />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const next = [...draftSpecial];
                              next[ei] = { ...next[ei], slots: next[ei].slots.filter((_, idx) => idx !== si) };
                              setDraftSpecial(next);
                            }}
                            style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label="Remove time slot"
                          >
                            <img src={TrashLineSvg} alt="" style={{ width: 16, height: 16, filter: 'invert(22%) sepia(93%) saturate(6245%) hue-rotate(355deg) brightness(89%) contrast(97%)' }} />
                          </button>
                        )}
                      </div>
                    ))}
                    {entry.closed && (
                      <PrismToggle
                        label="Closed"
                        isSelected={false}
                        onChange={(isSelected: boolean) => {
                          const next = [...draftSpecial];
                          next[ei] = { ...next[ei], closed: !isSelected, slots: isSelected && next[ei].slots.length === 0 ? [{ open: '08:00', close: '16:00' }] : next[ei].slots };
                          setDraftSpecial(next);
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => setDraftSpecial([...draftSpecial, { note: '', date: '', closed: true, slots: [] }])}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#191919', padding: 0 }}
              >
                <img src={AddSvg} alt="" style={{ width: 16, height: 16 }} /> Add special hours
              </button>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button variant="primary" size="large" onClick={() => setEditingSpecial(false)}>Save</Button>
                <Button variant="tertiary" size="large" onClick={() => setEditingSpecial(false)}>Cancel</Button>
              </div>
            </>
          ) : (
            <>
              {storeData.specialHours.map((sh, i) => (
                <InfoRow
                  key={i}
                  icon={<img src={CalendarLineSvg} alt="" style={{ width: 24, height: 24 }} />}
                  label={sh.note}
                  value={`${formatSpecialDate(sh.date)} - ${sh.closed ? 'Closed' : 'Open'}`}
                />
              ))}
            </>
          )}
        </div>
        </>
  );

  const leftColumn = (
    <>
      <SectionCard title="Store info" collapsed={openSection !== 'info'} onToggle={() => toggleSection('info')}>
        {infoContent}
      </SectionCard>
      <SectionCard title="Branding" collapsed={openSection !== 'branding'} onToggle={() => toggleSection('branding')}>
        {brandingContent}
      </SectionCard>
      <SectionCard title="Store hours" collapsed={openSection !== 'hours'} onToggle={() => toggleSection('hours')}>
        {hoursContent}
      </SectionCard>
    </>
  );

  const rightColumn = (
    <div
      style={{
        width: '100%',
        backgroundColor: tokens.semantic.colors.surface.raised,
        borderRadius: 32,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 160px)',
      }}
    >
      {/* Preview header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, gap: 16 }}>
        <span style={{
          flex: 1,
          fontFamily: 'inherit',
          fontSize: 'var(--usage-type-title-large-font-size, 20px)',
          fontWeight: 700,
          lineHeight: 'var(--usage-type-title-large-line-height, 24px)',
          letterSpacing: 'var(--usage-type-title-large-letter-spacing, -0.01px)',
          color: 'var(--Text-Neutral, #181818)',
        }}>Preview</span>
        <SegmentedControl
          value={previewView}
          onChange={(v) => setPreviewView(v as 'tv' | 'phone')}
          options={[
            { value: 'tv', icon: <img src={TvLineSvg} alt="Desktop view" style={{ width: 16, height: 16 }} /> },
            { value: 'phone', icon: <img src={DevicePhoneSvg} alt="Phone view" style={{ width: 16, height: 16 }} /> },
          ]}
        />
      </div>

      {/* Preview content */}
      {openSection === 'hours' ? renderHoursPreviewContent(previewView) : renderPreviewContent(previewView)}
    </div>
  );

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', backgroundColor: tokens.colors.brand.sidebarBg, overflow: 'hidden' }}>
      <Sidebar
        expanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
        logoSrc={pedregalLogo}
        logoAlt="Pedregal"
        venueAvatarSrc={venue === 'NV' ? bobaBloomLogoSidebar : burgeramtLogoImage}
        venueAvatarAlt={venue === 'NV' ? 'Boba Bloom' : 'Burgeramt'}
        venueName={VENUE_DISPLAY_NAMES[venue]}
        onVenueSwitch={() => navigate('/', { state: { venue } })}
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
        onSendClick={() => {}}
        chatOpen={false}
        onChatToggle={() => {}}
        chatBadgeCount={0}
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
          }}
        >
          {/* Header */}
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
              <Breadcrumbs items={[
                { label: 'Home', href: '/', onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate('/', { state: { venue } }); } },
                { label: 'Settings', href: '#' },
                { label: 'Store settings' },
              ]} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{
                  margin: 0,
                  fontFamily: tokens.base.typography.fontFamily.brand,
                  fontSize: `${tokens.usage.typography.display.large.fontSize}px`,
                  fontWeight: tokens.usage.typography.display.large.fontWeight,
                  lineHeight: `${tokens.usage.typography.display.large.lineHeight}px`,
                  letterSpacing: tokens.usage.typography.display.large.letterSpacing,
                  color: '#202125',
                }}>
                  Store settings
                </h1>
                <SegmentedControl
                  value={layoutVariant}
                  onChange={v => setLayoutVariant(v as 'A' | 'B')}
                  options={[
                    {
                      value: 'A',
                      label: 'Layout A',
                      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="3" rx="1" fill="currentColor"/><rect x="1" y="7" width="14" height="3" rx="1" fill="currentColor" opacity=".4"/><rect x="1" y="12" width="14" height="3" rx="1" fill="currentColor" opacity=".2"/></svg>,
                    },
                    {
                      value: 'B',
                      label: 'Layout B',
                      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="4" height="2" rx=".5" fill="currentColor"/><rect x="6" y="1" width="4" height="2" rx=".5" fill="currentColor" opacity=".4"/><rect x="11" y="1" width="4" height="2" rx=".5" fill="currentColor" opacity=".2"/><rect x="1" y="5" width="14" height="10" rx="1" fill="currentColor" opacity=".15"/></svg>,
                    },
                  ]}
                />
              </div>
            </div>

            {layoutVariant === 'B' && (
              <div style={{ marginTop: 16 }}>
                <PrismButtonTabs
                  tabs={[
                    { value: 'branding', label: 'Brand assets' },
                    { value: 'info', label: 'Store info' },
                    { value: 'hours', label: 'Store hours' },
                  ]}
                  value={activeTab}
                  onChange={v => { setActiveTab(v as 'info' | 'branding' | 'hours'); setOpenSection(v as 'info' | 'branding' | 'hours'); }}
                  size="medium"
                />
              </div>
            )}
          </div>

          {/* Two columns */}
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
            }}
          >
            <div style={{ flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
              {layoutVariant === 'A' ? (
                leftColumn
              ) : (
                <>
                  {activeTab === 'info' && (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 }}>
                      {infoContent}
                    </div>
                  )}
                  {activeTab === 'branding' && (
                    <>
                      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
                          {/* Cover image section */}
                          {React.Children.toArray((brandingContent as React.ReactElement).props.children)[0]}
                        </div>
                      </div>
                      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {/* Store logo section */}
                          {React.Children.toArray((brandingContent as React.ReactElement).props.children)[1]}
                        </div>
                      </div>
                    </>
                  )}
                  {activeTab === 'hours' && (
                    <>
                      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {/* Regular hours section */}
                          {React.Children.toArray((hoursContent as React.ReactElement).props.children)[0]}
                        </div>
                      </div>
                      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {/* Special hours section */}
                          {React.Children.toArray((hoursContent as React.ReactElement).props.children)[1]}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div style={{ width: 434, flexShrink: 0, position: 'sticky', top: 0, alignSelf: 'flex-start' }}>
              {rightColumn}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
