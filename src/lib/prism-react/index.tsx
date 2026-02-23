/**
 * Local shim for @doordash/prism-react ListCell and List components.
 *
 * Implements the subset of the Prism Web ListCell API used by the onboarding checklist.
 * Once `@doordash/prism-react` is installed from JFrog, remove this file and the
 * Vite / tsconfig alias that points here.
 */
import React from 'react';
import { tokens } from '../../../tokens';

/* ------------------------------------------------------------------ */
/*  Enums                                                              */
/* ------------------------------------------------------------------ */

export enum ListCellMediaSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ListCellIconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export enum ListCellIconType {
  ICON = 'icon',
  IMAGE = 'image',
}

export enum ListCellIconColor {
  DEFAULT = 'default',
  SUBDUED = 'subdued',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  WARNING = 'warning',
}

export enum ListCellTagIconType {
  NONE = 'none',
  ICON = 'icon',
}

export enum ListCellTagType {
  NONE = 'none',
  TAG = 'tag',
}

export enum ListCellSeparator {
  NONE = 'none',
  FULL = 'full',
  INSET = 'inset',
}

export enum ListCellAlignment {
  TOP = 'top',
  CENTER = 'center',
}

/* ------------------------------------------------------------------ */
/*  ListCell                                                           */
/* ------------------------------------------------------------------ */

export interface ListCellProps {
  /** Primary label text */
  label: string;
  /** Secondary description text */
  description?: string;
  /** Leading icon/image element */
  leadingIcon?: React.ReactNode;
  /** Leading icon size */
  leadingIconSize?: ListCellIconSize;
  /** Leading icon color */
  leadingIconColor?: ListCellIconColor;
  /** Trailing icon element (e.g. chevron) */
  trailingIcon?: React.ReactNode;
  /** Separator style between cells */
  separator?: ListCellSeparator;
  /** Vertical alignment of content */
  alignment?: ListCellAlignment;
  /** Click handler */
  onClick?: () => void;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ListCell: React.FC<ListCellProps> = ({
  label,
  description,
  leadingIcon,
  trailingIcon,
  separator = ListCellSeparator.NONE,
  alignment = ListCellAlignment.CENTER,
  onClick,
  className,
  style,
}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        display: 'flex',
        alignItems: alignment === ListCellAlignment.TOP ? 'flex-start' : 'center',
        gap: 0,
        minHeight: 48,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 16,
        backgroundColor: hover && onClick ? '#F0F0F0' : '#F8F8F8',
        cursor: onClick ? 'pointer' : 'default',
        borderBottom:
          separator === ListCellSeparator.FULL
            ? `1px solid ${tokens.semantic.colors.border.subdued}`
            : separator === ListCellSeparator.INSET
              ? `1px solid ${tokens.semantic.colors.border.subdued}`
              : 'none',
        transition: 'background-color 0.15s ease',
        ...style,
      }}
    >
      {/* Leading content */}
      {leadingIcon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            paddingRight: 12,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {leadingIcon}
          </div>
        </div>
      )}

      {/* Body */}
      <div
        style={{
          display: 'flex',
          flex: '1 0 0',
          alignItems: 'center',
          alignSelf: 'stretch',
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            paddingTop: 12,
            paddingBottom: 12,
            minWidth: 0,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
              fontSize: tokens.usage.typography.label.small.strong.fontSize,
              fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
              lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
              letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
              color: tokens.semantic.colors.text.neutral,
            }}
          >
            {label}
          </p>
          {description && (
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
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Trailing content */}
      {trailingIcon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            paddingLeft: 12,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: 24 }}>
            {trailingIcon}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  List container + helpers                                           */
/* ------------------------------------------------------------------ */

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const List: React.FC<ListProps> = ({ children, className, style }) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
      padding: '4px 0',
      ...style,
    }}
  >
    {children}
  </div>
);

export interface ListLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const ListLabel: React.FC<ListLabelProps> = ({ children, className }) => (
  <div
    className={className}
    style={{
      paddingTop: 12,
      paddingBottom: 4,
      paddingLeft: 16,
      paddingRight: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    {typeof children === 'string' ? (
      <p
        style={{
          margin: 0,
          fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
          fontSize: tokens.usage.typography.label.small.strong.fontSize,
          fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
          letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
          color: tokens.semantic.colors.text.subdued,
          textTransform: 'uppercase',
        }}
      >
        {children}
      </p>
    ) : (
      children
    )}
  </div>
);

export interface ListErrorProps {
  children: React.ReactNode;
}

export const ListError: React.FC<ListErrorProps> = ({ children }) => (
  <div
    style={{
      padding: '4px 16px 8px',
      fontFamily: tokens.usage.typography.body.small.default.fontFamily,
      fontSize: tokens.usage.typography.body.small.default.fontSize,
      fontWeight: tokens.usage.typography.body.small.default.fontWeight,
      lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
      letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
      color: tokens.semantic.colors.text.negative,
    }}
  >
    {children}
  </div>
);

export interface ListHintProps {
  children: React.ReactNode;
}

export const ListHint: React.FC<ListHintProps> = ({ children }) => (
  <div
    style={{
      padding: '4px 16px 8px',
      fontFamily: tokens.usage.typography.body.small.default.fontFamily,
      fontSize: tokens.usage.typography.body.small.default.fontSize,
      fontWeight: tokens.usage.typography.body.small.default.fontWeight,
      lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
      letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
      color: tokens.semantic.colors.text.subdued,
    }}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/*  TextField                                                          */
/* ------------------------------------------------------------------ */

interface PrismTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  error?: string | boolean;
  isMultiline?: boolean | number;
}

export const PrismTextField: React.FC<PrismTextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isDisabled,
  isLabelHidden,
  error,
}) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {!isLabelHidden && (
        <label style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#191919' }}>{label}</label>
      )}
      <input
        value={value}
        onChange={e => onChange(e.target.value, e)}
        placeholder={placeholder}
        disabled={isDisabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', height: 44, borderRadius: 12, padding: '0 12px', fontSize: 14,
          border: `1px solid ${error ? '#C83527' : focused ? '#191919' : '#E4E4E4'}`,
          backgroundColor: '#fff', outline: 'none', transition: 'border-color 0.15s',
          boxSizing: 'border-box',
        }}
      />
      {typeof error === 'string' && error && (
        <span style={{ fontSize: 12, color: '#C83527' }}>{error}</span>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  DateField with calendar dropdown                                   */
/* ------------------------------------------------------------------ */

interface PrismDateFieldProps {
  label: string;
  value: string;
  onChange: (dateStr: string) => void;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function buildCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells: { day: number; current: boolean }[] = [];
  for (let i = startDay - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, current: false });
  return cells;
}

export const PrismDateField: React.FC<PrismDateFieldProps> = ({
  label,
  value,
  onChange,
  isDisabled,
  isLabelHidden,
}) => {
  const [open, setOpen] = React.useState(false);
  const parsed = value ? new Date(value + 'T00:00:00') : null;
  const [viewYear, setViewYear] = React.useState(parsed?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = React.useState(parsed?.getMonth() ?? new Date().getMonth());
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const displayVal = value
    ? (() => { const [y, m, d] = value.split('-'); return `${m}/${d}/${y}`; })()
    : 'Select date';

  const cells = buildCalendarDays(viewYear, viewMonth);
  const selectedKey = parsed ? `${parsed.getFullYear()}-${parsed.getMonth()}-${parsed.getDate()}` : '';

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
      {!isLabelHidden && (
        <label style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#191919' }}>{label}</label>
      )}
      <button
        type="button"
        onClick={() => !isDisabled && setOpen(!open)}
        disabled={isDisabled}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, width: '100%', height: 44, borderRadius: 12,
          padding: '0 12px', fontSize: 14, border: `1px solid ${open ? '#191919' : '#E4E4E4'}`,
          backgroundColor: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s',
          boxSizing: 'border-box',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#606060" strokeWidth="1.5"/>
          <path d="M3 10h18M8 2v4M16 2v4" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ flex: 1, color: value ? '#191919' : '#999' }}>{displayVal}</span>
        <svg width="12" height="12" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0 }}>
          <path d="M1 1l4 4 4-4" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 100,
          width: 280, backgroundColor: '#fff', borderRadius: 16, border: '1px solid #E4E4E4',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button type="button" onClick={prevMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#191919' }}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {DOW_HEADERS.map(d => (
              <div key={d} style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#999' }}>{d}</div>
            ))}
            {cells.map((c, i) => {
              const cellKey = `${viewYear}-${viewMonth}-${c.day}`;
              const isSelected = c.current && cellKey === selectedKey;
              const isToday = c.current && c.day === new Date().getDate() && viewMonth === new Date().getMonth() && viewYear === new Date().getFullYear();
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    if (!c.current) return;
                    const m = String(viewMonth + 1).padStart(2, '0');
                    const d = String(c.day).padStart(2, '0');
                    onChange(`${viewYear}-${m}-${d}`);
                    setOpen(false);
                  }}
                  style={{
                    width: 32, height: 32, borderRadius: 9999, border: 'none',
                    backgroundColor: isSelected ? '#191919' : 'transparent',
                    color: isSelected ? '#fff' : c.current ? '#191919' : '#ccc',
                    fontSize: 13, fontWeight: isToday ? 700 : 400,
                    cursor: c.current ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    outline: isToday && !isSelected ? '1px solid #191919' : 'none',
                    margin: '0 auto',
                  }}
                >
                  {c.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Toggle                                                             */
/* ------------------------------------------------------------------ */

interface PrismToggleProps {
  label: string;
  isSelected: boolean;
  onChange?: (isSelected: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
}

export const PrismToggle: React.FC<PrismToggleProps> = ({
  label,
  isSelected,
  onChange,
  isDisabled,
  isLabelHidden,
}) => {
  const id = React.useId();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <label
        htmlFor={id}
        style={{
          width: 44, height: 24, borderRadius: 12, position: 'relative', display: 'inline-block',
          backgroundColor: isSelected ? '#191919' : '#E4E4E4', transition: 'background-color 0.2s',
          cursor: isDisabled ? 'default' : 'pointer', opacity: isDisabled ? 0.5 : 1,
        }}
      >
        <input
          id={id}
          type="checkbox"
          checked={isSelected}
          disabled={isDisabled}
          onChange={e => onChange?.(e.target.checked, e)}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute', top: 2, left: isSelected ? 22 : 2,
          width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff',
          transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }} />
      </label>
      {!isLabelHidden && (
        <span style={{ fontSize: 14, fontWeight: 400, color: '#191919' }}>{label}</span>
      )}
    </div>
  );
};
