import React, { useState, useEffect } from 'react';
import { tokens } from '../../../tokens';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Tag } from '../Tag';
import { BaseModal } from './BaseModal';
import moneyCashLineIcon from '../../icons/16/money-cash-line.svg';
import tagLineIcon from '../../icons/16/tag-line.svg';
import storeIcon from '../../icons/16/Store.svg';

export interface PriceChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  productImage: string;
  priceBefore: string;
  priceAfter: string;
  doNotShowAgain: boolean;
  onDoNotShowAgainChange: (checked: boolean) => void;
}

export const PriceChangeModal: React.FC<PriceChangeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  productImage,
  priceBefore,
  priceAfter,
  doNotShowAgain,
  onDoNotShowAgainChange,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(() => onConfirm(), 300);
  };

  if (!isOpen) return null;

  const footer = (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: 1,
          cursor: 'pointer',
        }}
        onClick={() => onDoNotShowAgainChange(!doNotShowAgain)}
      >
        <Checkbox checked={doNotShowAgain} onChange={onDoNotShowAgainChange} />
        <span
          style={{
            ...tokens.usage.typography.body.small.default,
            fontSize: `${tokens.usage.typography.body.small.default.fontSize}px`,
            lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
            letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
            color: 'black',
            userSelect: 'none',
          }}
        >
          Do not show me this again
        </span>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="secondary" onClick={handleClose}>
          Back to editing
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Save
        </Button>
      </div>
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Price change"
      footer={footer}
      isAnimating={isAnimating}
    >
      <div
        style={{
          padding: '0 24px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
              style={{
                backgroundColor: tokens.semantic.colors.surface.subdued,
                borderRadius: '16px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    minHeight: '32px',
                    padding: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    border: `1px solid ${tokens.semantic.colors.surface.default}`,
                    backgroundColor: tokens.semantic.colors.surface.default,
                  }}
                >
                  <img src={moneyCashLineIcon} alt="" width={16} height={16} />
                </div>
                <span
                  style={{
                    ...tokens.usage.typography.label.small.default,
                    fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                    lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                    letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                    color: tokens.semantic.colors.text.neutral,
                  }}
                >
                  1 price change
                </span>
              </div>

              <div
                style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: '#D9DADA',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    minHeight: '32px',
                    padding: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    border: `1px solid ${tokens.semantic.colors.surface.default}`,
                    backgroundColor: tokens.semantic.colors.surface.default,
                  }}
                >
                  <img src={tagLineIcon} alt="" width={16} height={16} />
                </div>
                <span
                  style={{
                    ...tokens.usage.typography.label.small.default,
                    fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                    lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                    letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                    color: tokens.semantic.colors.text.neutral,
                  }}
                >
                  1 product
                </span>
              </div>
            </div>

            {/* Table – name column ~2.5× others, rest equal */}
            <div style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  borderBottom: `1px solid ${tokens.semantic.colors.border.subdued}`,
                  minHeight: '48px',
                }}
              >
                <div
                  style={{
                    flex: '2.5 1 0%',
                    minWidth: 0,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.strong,
                      fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                      color: tokens.semantic.colors.text.subdued,
                    }}
                  >
                    Name
                  </span>
                </div>
                <div
                  style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.strong,
                      fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                      color: tokens.semantic.colors.text.subdued,
                    }}
                  >
                    Before
                  </span>
                </div>
                <div
                  style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.strong,
                      fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                      color: tokens.semantic.colors.text.subdued,
                    }}
                  >
                    After
                  </span>
                </div>
                <div
                  style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.strong,
                      fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                      color: tokens.semantic.colors.text.subdued,
                    }}
                  >
                    Change
                  </span>
                </div>
                <div style={{ flex: '0 0 48px', width: '48px' }} />
              </div>

              <div
                style={{
                  display: 'flex',
                  borderBottom: `1px solid ${tokens.semantic.colors.border.subdued}`,
                  minHeight: '48px',
                }}
              >
                <div
                  style={{
                    flex: '2.5 1 0%',
                    minWidth: 0,
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <img
                    src={productImage}
                    alt={productName}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.default,
                      fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                      color: tokens.semantic.colors.text.neutral,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {productName}
                  </span>
                </div>

                <div
                  style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.default,
                      fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                      color: tokens.semantic.colors.text.subdued,
                      textDecoration: 'line-through',
                      textDecorationThickness: '1.5px',
                    }}
                  >
                    {priceBefore}
                  </span>
                </div>

                <div
                  style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.default,
                      fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                      color: tokens.semantic.colors.text.neutral,
                    }}
                  >
                    {priceAfter}
                  </span>
                </div>

                <div
                  style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.48)',
                  }}
                >
                  <Tag style="neutral">Price change</Tag>
                </div>

                <div style={{ flex: '0 0 48px', width: '48px' }} />
              </div>
            </div>
      </div>
    </BaseModal>
  );
};

export interface NameChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productImage: string;
  nameBefore: string;
  nameAfter: string;
  doNotShowAgain: boolean;
  onDoNotShowAgainChange: (checked: boolean) => void;
}

export const NameChangeModal: React.FC<NameChangeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productImage,
  nameBefore,
  nameAfter,
  doNotShowAgain,
  onDoNotShowAgainChange,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(() => onConfirm(), 300);
  };

  if (!isOpen) return null;

  const footer = (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: 1,
          cursor: 'pointer',
        }}
        onClick={() => onDoNotShowAgainChange(!doNotShowAgain)}
      >
        <Checkbox checked={doNotShowAgain} onChange={onDoNotShowAgainChange} />
<span
        style={{
          ...tokens.usage.typography.body.small.default,
          fontSize: `${tokens.usage.typography.body.small.default.fontSize}px`,
          lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
          letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
          color: 'black',
          userSelect: 'none',
        }}
      >
        Do not show me this again
      </span>
    </div>
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button variant="secondary" onClick={handleClose}>
        Back to editing
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Save
      </Button>
    </div>
  </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Name change"
      footer={footer}
      isAnimating={isAnimating}
    >
      <div style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  backgroundColor: '#F8F8F8',
                  borderRadius: '16px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      width: '32px',
                      height: '32px',
                      minWidth: '32px',
                      minHeight: '32px',
                      padding: '8px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '9999px',
                      border: `1px solid ${tokens.semantic.colors.surface.default}`,
                      backgroundColor: tokens.semantic.colors.surface.default,
                    }}
                  >
                    <img src={tagLineIcon} alt="" width={16} height={16} />
                  </div>
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.default,
                      fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                      color: tokens.semantic.colors.text.neutral,
                    }}
                  >
                    1 name change
                  </span>
                </div>
                <div style={{ width: '1px', height: '24px', backgroundColor: '#D9DADA' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span
                    style={{
                      ...tokens.usage.typography.label.small.default,
                      fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                      lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                      letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                      color: tokens.semantic.colors.text.neutral,
                    }}
                  >
                    1 product
                  </span>
                </div>
              </div>

              {/* Table – Before/After (name columns) 30% more each (flex 1.3), Change flex 1; header and cells share same flex */}
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    borderBottom: `1px solid ${tokens.semantic.colors.border.subdued}`,
                    minHeight: '48px',
                  }}
                >
                  <div
                    style={{
                      flex: '1.3 1 0%',
                      minWidth: 0,
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        ...tokens.usage.typography.label.small.strong,
                        fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                        lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                        color: tokens.semantic.colors.text.subdued,
                      }}
                    >
                      Before
                    </span>
                  </div>
                  <div
                    style={{
                      flex: '1.3 1 0%',
                      minWidth: 0,
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        ...tokens.usage.typography.label.small.strong,
                        fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                        lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                        color: tokens.semantic.colors.text.subdued,
                      }}
                    >
                      After
                    </span>
                  </div>
                  <div
                    style={{
                      flex: '1 1 0%',
                      minWidth: 0,
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        ...tokens.usage.typography.label.small.strong,
                        fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                        lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                        color: tokens.semantic.colors.text.subdued,
                      }}
                    >
                      Change
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    borderBottom: `1px solid ${tokens.semantic.colors.border.subdued}`,
                    minHeight: '48px',
                  }}
                >
                  <div
                    style={{
                      flex: '1.3 1 0%',
                      minWidth: 0,
                      padding: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <img
                      src={productImage}
                      alt={nameBefore}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        ...tokens.usage.typography.label.small.default,
                        fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                        lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                        color: tokens.semantic.colors.text.subdued,
                        textDecoration: 'line-through',
                        textDecorationThickness: '1.5px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                      }}
                    >
                      {nameBefore}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: '1.3 1 0%',
                      minWidth: 0,
                      padding: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <img
                      src={productImage}
                      alt={nameAfter}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        ...tokens.usage.typography.label.small.default,
                        fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                        lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                        color: tokens.semantic.colors.text.neutral,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                      }}
                    >
                      {nameAfter}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: '1 1 0%',
                      minWidth: 0,
                      padding: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.48)',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap', minWidth: 0 }}>
                      <Tag style="neutral">Name change</Tag>
                    </span>
                  </div>
                </div>
              </div>
            </div>
    </BaseModal>
  );
};

export interface GoLiveConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  productImage: string;
  /** Price to show when present (single column; no Before/After). */
  price?: string;
  /** When true, Change column shows "New product" tag; otherwise "Price change". */
  isNewProduct?: boolean;
  /** Product count for summary (e.g. 1 → "1 product"). */
  productCount?: number;
  /** Venue names from the Venues block (affected venues). */
  venuesAffected?: string[];
  /** When true (e.g. create new / product detail page), hide the "Do not show me this again" row. */
  hideDoNotShowAgain?: boolean;
  doNotShowAgain: boolean;
  onDoNotShowAgainChange: (checked: boolean) => void;
}

export const GoLiveConfirmModal: React.FC<GoLiveConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  productImage,
  price,
  isNewProduct = false,
  productCount = 1,
  venuesAffected = [],
  hideDoNotShowAgain = false,
  doNotShowAgain,
  onDoNotShowAgainChange,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(() => onConfirm(), 300);
  };

  if (!isOpen) return null;

  const footer = (
    <>
      {!hideDoNotShowAgain && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
            cursor: 'pointer',
          }}
          onClick={() => onDoNotShowAgainChange(!doNotShowAgain)}
        >
          <Checkbox checked={doNotShowAgain} onChange={onDoNotShowAgainChange} />
          <span
            style={{
              ...tokens.usage.typography.body.small.default,
              fontSize: `${tokens.usage.typography.body.small.default.fontSize}px`,
              lineHeight: `${tokens.usage.typography.body.small.default.lineHeight}px`,
              letterSpacing: `${tokens.usage.typography.body.small.default.letterSpacing}px`,
              color: 'black',
              userSelect: 'none',
            }}
          >
            Do not show me this again
          </span>
        </div>
      )}
      <div style={{ display: 'flex', gap: '16px', marginLeft: hideDoNotShowAgain ? 'auto' : undefined }}>
        <Button variant="secondary" onClick={handleClose}>
          Back to editing
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Save
        </Button>
      </div>
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Are you sure you want to go live with this product?"
      footer={footer}
      isAnimating={isAnimating}
    >
      <div
        style={{
          padding: '0 24px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            backgroundColor: tokens.semantic.colors.surface.subdued,
            borderRadius: '16px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                width: '32px',
                height: '32px',
                minWidth: '32px',
                minHeight: '32px',
                padding: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '9999px',
                border: `1px solid ${tokens.semantic.colors.surface.default}`,
                backgroundColor: tokens.semantic.colors.surface.default,
              }}
            >
              <img src={tagLineIcon} alt="" width={16} height={16} />
            </div>
            <span
              style={{
                ...tokens.usage.typography.label.small.default,
                fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                color: tokens.semantic.colors.text.neutral,
              }}
            >
              {productCount === 1 ? '1 product' : `${productCount} products`}
            </span>
          </div>

          <div
            style={{
              width: '1px',
              height: '24px',
              backgroundColor: '#D9DADA',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                width: '32px',
                height: '32px',
                minWidth: '32px',
                minHeight: '32px',
                padding: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '9999px',
                border: `1px solid ${tokens.semantic.colors.surface.default}`,
                backgroundColor: tokens.semantic.colors.surface.default,
              }}
            >
              <img src={storeIcon} alt="" width={16} height={16} />
            </div>
            <span
              style={{
                ...tokens.usage.typography.label.small.default,
                fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                color: tokens.semantic.colors.text.neutral,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0,
              }}
            >
              {venuesAffected.length === 0
                ? '0 venues'
                : venuesAffected.length === 1
                  ? venuesAffected[0]
                  : `${venuesAffected.length} venues`}
            </span>
          </div>
        </div>

        {/* Table – name column ~2.5× others, rest equal */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              borderBottom: `1px solid ${tokens.semantic.colors.border.subdued}`,
              minHeight: '48px',
            }}
          >
            <div
              style={{
                flex: '2.5 1 0%',
                minWidth: 0,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  ...tokens.usage.typography.label.small.strong,
                  fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                  lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                  letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                  color: tokens.semantic.colors.text.subdued,
                }}
              >
                Name
              </span>
            </div>
            <div
              style={{
                flex: '1 1 0%',
                minWidth: 0,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  ...tokens.usage.typography.label.small.strong,
                  fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                  lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                  letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                  color: tokens.semantic.colors.text.subdued,
                }}
              >
                Price
              </span>
            </div>
            <div
              style={{
                flex: '1 1 0%',
                minWidth: 0,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  ...tokens.usage.typography.label.small.strong,
                  fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                  lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                  letterSpacing: `${tokens.usage.typography.label.small.strong.letterSpacing}px`,
                  color: tokens.semantic.colors.text.subdued,
                }}
              >
                Change
              </span>
            </div>
            <div style={{ flex: '0 0 48px', width: '48px' }} />
          </div>

          <div
            style={{
              display: 'flex',
              borderBottom: `1px solid ${tokens.semantic.colors.border.subdued}`,
              minHeight: '48px',
            }}
          >
            <div
              style={{
                flex: '2.5 1 0%',
                minWidth: 0,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <img
                src={productImage}
                alt={productName}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  ...tokens.usage.typography.label.small.default,
                  fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                  lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                  letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                  color: tokens.semantic.colors.text.neutral,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}
              >
                {productName}
              </span>
            </div>

            <div
              style={{
                flex: '1 1 0%',
                minWidth: 0,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {price != null && price !== '' && (
                <span
                  style={{
                    ...tokens.usage.typography.label.small.default,
                    fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                    lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                    letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                    color: tokens.semantic.colors.text.neutral,
                  }}
                >
                  {price}
                </span>
              )}
            </div>

            <div
              style={{
                flex: '1 1 0%',
                minWidth: 0,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.48)',
              }}
            >
              <Tag style="neutral">{isNewProduct ? 'New product' : 'Price change'}</Tag>
            </div>

            <div style={{ flex: '0 0 48px', width: '48px' }} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
