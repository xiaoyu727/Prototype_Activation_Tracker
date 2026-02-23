import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarState } from '../../contexts/SidebarStateContext';
import { tokens } from '../../../tokens';
import { Sidebar } from '../../components/Sidebar';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { Input } from '../../components/Field';
import { DropdownField } from '../../components/Field';
import { getBadgeCount } from '../../components/ChatPanel';
import type { ChatContext } from '../../components/ChatPanel';
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
import CalendarLineSvg from '../../icons/24/calendar-line.svg';
import LinkSvg from '../../icons/16/link.svg';
import CloseSvg from '../../icons/16/close.svg';

function SidebarIcon({ src }: { src: string }) {
  return <img src={src} alt="" role="presentation" style={{ width: 16, height: 16, flexShrink: 0, filter: 'brightness(0) invert(1)' }} />;
}

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="#909090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LEGAL_FORMS = [
  { id: 'limited', label: 'Limited company' },
  { id: 'sole', label: 'Sole proprietor' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'gmbh', label: 'GmbH' },
  { id: 'ug', label: 'UG (haftungsbeschränkt)' },
];

const INDUSTRY_OPTIONS = [
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'retail', label: 'Retail' },
  { id: 'grocery', label: 'Grocery' },
  { id: 'cafe', label: 'Café / Coffee shop' },
  { id: 'bakery', label: 'Bakery' },
];

const CITIZENSHIP_OPTIONS = [
  { id: 'de', label: 'German' },
  { id: 'fr', label: 'French' },
  { id: 'nl', label: 'Dutch' },
  { id: 'it', label: 'Italian' },
  { id: 'es', label: 'Spanish' },
  { id: 'pl', label: 'Polish' },
  { id: 'other', label: 'Other' },
];

const COUNTRY_OPTIONS = [
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'nl', label: 'Netherlands' },
  { id: 'it', label: 'Italy' },
  { id: 'es', label: 'Spain' },
  { id: 'pl', label: 'Poland' },
  { id: 'other', label: 'Other' },
];

interface BusinessDetails {
  name: string;
  businessId: string;
  address: string;
  legalForm: string;
  registrationDate: string;
  industry: string;
}

interface PersonEntry {
  id: string;
  firstName: string;
  lastName: string;
  isUBO: boolean;
  isRepresentative: boolean;
  isBoardMember: boolean;
  citizenship: string;
  dateOfBirth: string;
  countryOfResidence: string;
  nationalId: string;
}

interface BoardMember {
  id: string;
  fullName: string;
  dateOfBirth: string;
  nationalId: string;
}

interface FormData {
  business: BusinessDetails;
  people: PersonEntry[];
  taxMembers: BoardMember[];
  bankMembers: BoardMember[];
}

function getInitialData(venue: Venue): FormData {
  const isNV = venue === 'NV';
  return {
    business: {
      name: isNV ? 'Boba Bloom' : 'Burgeramt',
      businessId: isNV ? 'Boba Bloom' : 'Burgeramt',
      address: 'Musterstraße 12, 10115 Berlin, Germany',
      legalForm: 'limited',
      registrationDate: '12-09-2012',
      industry: 'restaurant',
    },
    people: [{
      id: 'p1',
      firstName: 'Janne',
      lastName: 'Tester',
      isUBO: true,
      isRepresentative: true,
      isBoardMember: false,
      citizenship: 'de',
      dateOfBirth: '12-09-1990',
      countryOfResidence: 'de',
      nationalId: '1201924',
    }],
    taxMembers: [{
      id: 'tm1',
      fullName: isNV ? 'Boba Bloom' : 'Burgeramt',
      dateOfBirth: '12-1-1994',
      nationalId: '1029101111',
    }],
    bankMembers: [{
      id: 'bm1',
      fullName: isNV ? 'Boba Bloom' : 'Burgeramt',
      dateOfBirth: '12-1-1994',
      nationalId: '1029101111',
    }],
  };
}

function CollapsibleSection({
  title,
  expanded,
  onToggle,
  children,
  sectionRef,
  highlighted,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  sectionRef?: React.Ref<HTMLDivElement>;
  highlighted?: boolean;
}) {
  return (
    <div
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        border: highlighted ? '2px solid #191919' : '1px solid #E7E7E7',
        transition: 'border-color 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '20px 24px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: tokens.base.typography.fontFamily.brand,
          fontSize: 18,
          fontWeight: 700,
          lineHeight: '24px',
          color: '#191919',
        }}>
          {title}
        </span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          color: '#909090',
        }}>
          <ChevronDownIcon />
        </span>
      </button>
      {expanded && (
        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: tokens.usage.typography.label.small.default.fontFamily,
      fontSize: tokens.usage.typography.label.small.default.fontSize,
      fontWeight: 700,
      lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
      color: '#191919',
    }}>
      {children}
    </span>
  );
}

function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {children}
    </div>
  );
}

function DropdownFormField({ label, children, flex = 1 }: { label: string; children: React.ReactNode; flex?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  );
}

function CheckboxRow({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <label style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
      <div style={{
        width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
        border: checked ? '2px solid #191919' : '2px solid #191919',
        backgroundColor: checked ? '#191919' : '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
          fontSize: tokens.usage.typography.label.small.strong.fontSize,
          fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
          color: '#191919',
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: tokens.usage.typography.body.small.default.fontFamily,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          color: tokens.semantic.colors.text.subdued,
        }}>
          {description}
        </span>
      </div>
    </label>
  );
}

function BoardMemberCard({
  member,
  onChange,
  onRemove,
}: {
  member: BoardMember;
  onChange: (updated: BoardMember) => void;
  onRemove: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 0', borderBottom: '1px solid #E7E7E7' }}>
      <FormRow>
        <Input
          label="Full name"
          value={member.fullName}
          onChange={(v) => onChange({ ...member, fullName: v })}
          action={<EditIcon />}
          style={{ flex: 1 }}
        />
        <Input
          label="Date of birth"
          value={member.dateOfBirth}
          onChange={(v) => onChange({ ...member, dateOfBirth: v })}
          action={<img src={CalendarLineSvg} alt="" style={{ width: 16, height: 16, opacity: 0.45 }} />}
          style={{ flex: 1 }}
        />
      </FormRow>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <Input
          label="National ID number"
          value={member.nationalId}
          onChange={(v) => onChange({ ...member, nationalId: v })}
          action={<EditIcon />}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          onClick={onRemove}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 8, border: 'none',
            background: 'transparent', cursor: 'pointer', flexShrink: 0,
          }}
        >
          <img src={CloseSvg} alt="Remove" style={{ width: 16, height: 16, opacity: 0.45 }} />
        </button>
      </div>
    </div>
  );
}

export const SettingsVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { expanded: sidebarExpanded, setExpanded: setSidebarExpanded } = useSidebarState();
  const locationState = (location.state as { venue?: Venue; openChat?: boolean }) ?? {};
  const venue: Venue = locationState.venue ?? 'NV';
  const openChatOnMount = locationState.openChat ?? false;

  const [chatOpen, setChatOpen] = useState(openChatOnMount);
  const [formData, setFormData] = useState<FormData>(() => getInitialData(venue));
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    business: true,
    people: false,
    tax: false,
    bank: false,
  });
  const [savedSections, setSavedSections] = useState<Record<string, boolean>>({
    business: false,
    people: false,
    tax: false,
    bank: false,
  });
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  const businessRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  const taxRef = useRef<HTMLDivElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    business: businessRef,
    people: peopleRef,
    tax: taxRef,
    bank: bankRef,
  };

  useEffect(() => {
    if (openChatOnMount && !sidebarExpanded) {
      setSidebarExpanded(true);
    }
  }, []);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const scrollToSection = useCallback((section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: true }));
    setHighlightedSection(section);
    setTimeout(() => {
      sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    setTimeout(() => setHighlightedSection(null), 2000);
  }, []);

  const handleSaveSection = useCallback((section: string) => {
    setSavedSections((prev) => ({ ...prev, [section]: true }));
  }, []);

  const addBoardMember = useCallback((section: 'taxMembers' | 'bankMembers') => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: `${section}-${Date.now()}`, fullName: '', dateOfBirth: '', nationalId: '' }],
    }));
  }, []);

  const removeBoardMember = useCallback((section: 'taxMembers' | 'bankMembers', id: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((m) => m.id !== id),
    }));
  }, []);

  const updateBoardMember = useCallback((section: 'taxMembers' | 'bankMembers', updated: BoardMember) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((m) => m.id === updated.id ? updated : m),
    }));
  }, []);

  const chatContext: ChatContext = {
    page: 'settings-verification',
    fromOnboarding: openChatOnMount,
    verificationStatus: {
      businessDetails: savedSections.business,
      people: savedSections.people,
      tax: savedSections.tax,
      bank: savedSections.bank,
    },
  };
  const chatBadgeCount = getBadgeCount(chatContext);

  const handleChatAction = useCallback((actionId: string) => {
    if (actionId === 'navigate-home') {
      navigate('/', { state: { venue } });
    } else if (actionId === 'guide-business-details') {
      scrollToSection('business');
    } else if (actionId === 'guide-people') {
      scrollToSection('people');
    } else if (actionId === 'guide-tax') {
      scrollToSection('tax');
    } else if (actionId === 'guide-bank') {
      scrollToSection('bank');
    } else if (actionId === 'verify-saved-business') {
      handleSaveSection('business');
    } else if (actionId === 'verify-saved-people') {
      handleSaveSection('people');
    } else if (actionId === 'verify-saved-tax') {
      handleSaveSection('tax');
    } else if (actionId === 'verify-saved-bank') {
      handleSaveSection('bank');
    }
  }, [navigate, venue, scrollToSection, handleSaveSection]);

  const person = formData.people[0];

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
          { id: 'settings', label: 'Settings', icon: <SidebarIcon src={SettingsLineSvg} />, active: true, path: '#' },
        ]}
        chatInputPlaceholder="Ask us anything"
        onSendClick={() => { setChatOpen((o) => !o); if (!sidebarExpanded) setSidebarExpanded(true); }}
        chatOpen={chatOpen}
        onChatToggle={() => { setChatOpen((o) => !o); if (!sidebarExpanded) setSidebarExpanded(true); }}
        chatBadgeCount={chatBadgeCount}
        chatContext={chatContext}
        onChatAction={handleChatAction}
      />

      <div style={{ display: 'flex', flex: 1, padding: '8px 8px 8px 0', minWidth: 0 }}>
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0,
          backgroundColor: '#F8F8F8', borderRadius: 32, overflow: 'hidden', overflowY: 'auto',
        }}>
          {/* Sticky header */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 100,
            display: 'flex', flexDirection: 'column', padding: '32px 48px',
            background: 'linear-gradient(0deg, rgba(247,247,247,0) -11.05%, rgba(248,248,248,0.9) 42.15%)',
            backdropFilter: 'blur(5.55px)', WebkitBackdropFilter: 'blur(5.55px)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Breadcrumbs items={[
                { label: 'Settings', href: '#' },
                { label: 'Verification' },
              ]} />
              <h1 style={{
                margin: 0,
                fontFamily: tokens.base.typography.fontFamily.brand,
                fontSize: `${tokens.usage.typography.display.large.fontSize}px`,
                fontWeight: tokens.usage.typography.display.large.fontWeight,
                lineHeight: `${tokens.usage.typography.display.large.lineHeight}px`,
                letterSpacing: tokens.usage.typography.display.large.letterSpacing,
                color: '#202125',
              }}>
                Verification
              </h1>
            </div>
          </div>

          {/* Form sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 48px 48px', maxWidth: 720 }}>

            {/* Business details */}
            <CollapsibleSection
              title="Business details"
              expanded={expandedSections.business}
              onToggle={() => toggleSection('business')}
              sectionRef={businessRef}
              highlighted={highlightedSection === 'business'}
            >
              <FormRow>
                <Input
                  label="Registered business name"
                  value={formData.business.name}
                  onChange={(v) => setFormData((prev) => ({ ...prev, business: { ...prev.business, name: v } }))}
                  style={{ flex: 1 }}
                />
                <Input
                  label="Business ID"
                  value={formData.business.businessId}
                  onChange={(v) => setFormData((prev) => ({ ...prev, business: { ...prev.business, businessId: v } }))}
                  style={{ flex: 1 }}
                />
              </FormRow>
              <FormRow>
                <Input
                  label="Registered business address"
                  value={formData.business.address}
                  onChange={(v) => setFormData((prev) => ({ ...prev, business: { ...prev.business, address: v } }))}
                  style={{ flex: 1 }}
                />
                <DropdownFormField label="Legal form">
                  <DropdownField
                    options={LEGAL_FORMS}
                    value={formData.business.legalForm}
                    onSelect={(id) => setFormData((prev) => ({ ...prev, business: { ...prev.business, legalForm: id } }))}
                  />
                </DropdownFormField>
              </FormRow>
              <FormRow>
                <Input
                  label="Business registration date"
                  value={formData.business.registrationDate}
                  onChange={(v) => setFormData((prev) => ({ ...prev, business: { ...prev.business, registrationDate: v } }))}
                  action={<img src={CalendarLineSvg} alt="" style={{ width: 16, height: 16, opacity: 0.45 }} />}
                  style={{ flex: 1 }}
                />
                <DropdownFormField label="Field of industry">
                  <DropdownField
                    options={INDUSTRY_OPTIONS}
                    value={formData.business.industry}
                    onSelect={(id) => setFormData((prev) => ({ ...prev, business: { ...prev.business, industry: id } }))}
                  />
                </DropdownFormField>
              </FormRow>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button variant="primary" size="medium" onClick={() => handleSaveSection('business')}>
                  Save
                </Button>
              </div>
            </CollapsibleSection>

            {/* People connected to your business */}
            <CollapsibleSection
              title="People connected to your business"
              expanded={expandedSections.people}
              onToggle={() => toggleSection('people')}
              sectionRef={peopleRef}
              highlighted={highlightedSection === 'people'}
            >
              <FormRow>
                <Input
                  label="First name"
                  value={person?.firstName ?? ''}
                  onChange={(v) => setFormData((prev) => {
                    const updated = [...prev.people];
                    if (updated[0]) updated[0] = { ...updated[0], firstName: v };
                    return { ...prev, people: updated };
                  })}
                  style={{ flex: 1 }}
                />
                <Input
                  label="Last name"
                  value={person?.lastName ?? ''}
                  onChange={(v) => setFormData((prev) => {
                    const updated = [...prev.people];
                    if (updated[0]) updated[0] = { ...updated[0], lastName: v };
                    return { ...prev, people: updated };
                  })}
                  style={{ flex: 1 }}
                />
              </FormRow>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <SectionLabel>What&apos;s this person&apos;s role?</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
                  <CheckboxRow
                    checked={person?.isUBO ?? false}
                    onChange={(v) => setFormData((prev) => {
                      const updated = [...prev.people];
                      if (updated[0]) updated[0] = { ...updated[0], isUBO: v };
                      return { ...prev, people: updated };
                    })}
                    label="Ultimate Beneficial Owner"
                    description="A natural person holding more than 25% of the shares or has the sole decision-making authority of the company"
                  />
                  <CheckboxRow
                    checked={person?.isRepresentative ?? false}
                    onChange={(v) => setFormData((prev) => {
                      const updated = [...prev.people];
                      if (updated[0]) updated[0] = { ...updated[0], isRepresentative: v };
                      return { ...prev, people: updated };
                    })}
                    label="Company representative"
                    description="Natural or a legal person having the legal right to represent the company"
                  />
                  <CheckboxRow
                    checked={person?.isBoardMember ?? false}
                    onChange={(v) => setFormData((prev) => {
                      const updated = [...prev.people];
                      if (updated[0]) updated[0] = { ...updated[0], isBoardMember: v };
                      return { ...prev, people: updated };
                    })}
                    label="Board member"
                    description="Natural or a legal person belonging to the Company's Board of Directors"
                  />
                </div>
              </div>

              <SectionLabel>Additional details</SectionLabel>
              <FormRow>
                <DropdownFormField label="Citizenship">
                  <DropdownField
                    options={CITIZENSHIP_OPTIONS}
                    value={person?.citizenship ?? ''}
                    onSelect={(id) => setFormData((prev) => {
                      const updated = [...prev.people];
                      if (updated[0]) updated[0] = { ...updated[0], citizenship: id };
                      return { ...prev, people: updated };
                    })}
                  />
                </DropdownFormField>
                <Input
                  label="Date of birth"
                  value={person?.dateOfBirth ?? ''}
                  onChange={(v) => setFormData((prev) => {
                    const updated = [...prev.people];
                    if (updated[0]) updated[0] = { ...updated[0], dateOfBirth: v };
                    return { ...prev, people: updated };
                  })}
                  action={<img src={CalendarLineSvg} alt="" style={{ width: 16, height: 16, opacity: 0.45 }} />}
                  style={{ flex: 1 }}
                />
              </FormRow>
              <FormRow>
                <DropdownFormField label="Country of residence">
                  <DropdownField
                    options={COUNTRY_OPTIONS}
                    value={person?.countryOfResidence ?? ''}
                    onSelect={(id) => setFormData((prev) => {
                      const updated = [...prev.people];
                      if (updated[0]) updated[0] = { ...updated[0], countryOfResidence: id };
                      return { ...prev, people: updated };
                    })}
                  />
                </DropdownFormField>
                <Input
                  label="National ID number"
                  value={person?.nationalId ?? ''}
                  onChange={(v) => setFormData((prev) => {
                    const updated = [...prev.people];
                    if (updated[0]) updated[0] = { ...updated[0], nationalId: v };
                    return { ...prev, people: updated };
                  })}
                  style={{ flex: 1 }}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Registered business name"
                  value={formData.business.name}
                  disabled
                  style={{ flex: 1 }}
                />
                <Input
                  label="Business ID"
                  value={formData.business.businessId}
                  disabled
                  style={{ flex: 1 }}
                />
              </FormRow>

              <Input
                label="Address of residency"
                value={formData.business.address}
                disabled
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src={LinkSvg} alt="" style={{ width: 16, height: 16, opacity: 0.5 }} />
                <span style={{
                  fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
                  fontSize: tokens.usage.typography.label.small.strong.fontSize,
                  fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
                  color: '#191919',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                  Identity verification
                </span>
              </div>

              <div style={{ display: 'flex', gap: 12, paddingTop: 8, alignItems: 'center' }}>
                <Button variant="primary" size="medium" onClick={() => handleSaveSection('people')}>
                  Save
                </Button>
                <span style={{
                  fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
                  fontSize: tokens.usage.typography.label.small.strong.fontSize,
                  fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
                  color: '#191919',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                  Learn more
                </span>
              </div>
            </CollapsibleSection>

            {/* Tax */}
            <CollapsibleSection
              title="Tax"
              expanded={expandedSections.tax}
              onToggle={() => toggleSection('tax')}
              sectionRef={taxRef}
              highlighted={highlightedSection === 'tax'}
            >
              <SectionLabel>Board members</SectionLabel>
              {formData.taxMembers.map((member) => (
                <BoardMemberCard
                  key={member.id}
                  member={member}
                  onChange={(updated) => updateBoardMember('taxMembers', updated)}
                  onRemove={() => removeBoardMember('taxMembers', member.id)}
                />
              ))}
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button
                  variant="tertiary"
                  size="medium"
                  onClick={() => addBoardMember('taxMembers')}
                >
                  + Board member
                </Button>
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button variant="primary" size="medium" onClick={() => handleSaveSection('tax')}>
                  Save
                </Button>
              </div>
            </CollapsibleSection>

            {/* Bank */}
            <CollapsibleSection
              title="Bank"
              expanded={expandedSections.bank}
              onToggle={() => toggleSection('bank')}
              sectionRef={bankRef}
              highlighted={highlightedSection === 'bank'}
            >
              <SectionLabel>Board members</SectionLabel>
              {formData.bankMembers.map((member) => (
                <BoardMemberCard
                  key={member.id}
                  member={member}
                  onChange={(updated) => updateBoardMember('bankMembers', updated)}
                  onRemove={() => removeBoardMember('bankMembers', member.id)}
                />
              ))}
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button
                  variant="tertiary"
                  size="medium"
                  onClick={() => addBoardMember('bankMembers')}
                >
                  + Board member
                </Button>
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button variant="primary" size="medium" onClick={() => handleSaveSection('bank')}>
                  Save
                </Button>
              </div>
            </CollapsibleSection>

          </div>
        </div>
      </div>
    </div>
  );
};
