import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useSidebarState } from '../../contexts/SidebarStateContext';
import { tokens } from '../../../tokens';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';
import { Input, DropdownField } from '../../components/Field';
import { CardGroup } from '../../components/CardGroup';
import { ImageUploadSlots } from '../../components/ImageUploadSlots';
import { FileUploader } from '../../components/FileUploader';
import { FilterChip } from '../../components/FilterChip';
import { SegmentedControl } from '../../components/SegmentedControl';
import { ProductFormLayout, SectionCard } from '../ProductForm/shared';
import { getVariantOptionsForProduct, shouldShowVariantsBlock } from '../ProductForm/variantOptions';
import { GoLiveConfirmModal } from '../../components/Modal';
import type { Product } from '../ProductListPage/types';
import type { Venue } from '../ProductListPage/venue';
import { getInitialProductsDataByVenue, productPlaceholder } from '../ProductListPage/data';
import { CATEGORY_OPTIONS_GLOBAL } from '../ProductListPage/constants';
import { getProductDescription } from './getProductDescription';
import TvLineSvg from '../../icons/16/tv-line.svg';
import DevicePhoneSvg from '../../icons/16/device-phone.svg';
import MoreHorizontalSvg from '../../icons/16/more-horizontal.svg';
import LinkSvg from '../../icons/16/link.svg';
import CameraLineSvg from '../../icons/16/camera-line.svg';
import newProductPreviewImage from '../../images/new product preview.png';
import venueChipImage from '../../images/Flags (chips)/Shell/Vector.png';

const AVAILABILITY_OPTIONS = ['Within opening hours', 'Always', 'Custom'];

const VENUE_OPTIONS = [
  'Metreon, San Francisco, California 94103',
  'METRO Supermarkets',
  'Burgeramt Prenzlauer Berg',
];

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const venue: Venue = (location.state as { venue?: Venue })?.venue ?? 'RX';
  const { expanded: sidebarExpanded, setExpanded: setSidebarExpanded } = useSidebarState();
  const [descriptionText, setDescriptionText] = useState('');
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedPreviewSize, setSelectedPreviewSize] = useState<string | null>(null);
  const [previewView, setPreviewView] = useState<'tv' | 'phone'>('phone');
  const [hasChanges, setHasChanges] = useState(false);
  const [variantOptions, setVariantOptions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const products = getInitialProductsDataByVenue(venue);
  const product = id ? products.find((p) => p.id === id) : null;
  const [category, setCategory] = useState(product?.category ?? '');
  const [selectedVenues, setSelectedVenues] = useState<string[]>(['Metreon, San Francisco, California 94103']);
  const [availability, setAvailability] = useState('Within opening hours');
  const [goLiveModalOpen, setGoLiveModalOpen] = useState(false);
  const [doNotShowGoLiveModal, setDoNotShowGoLiveModal] = useState(() => {
    const saved = localStorage.getItem('doNotShowGoLiveModal');
    return saved === 'true';
  });

  useEffect(() => {
    if (product) setDescriptionText(getProductDescription(product));
  }, [product?.id]);

  useEffect(() => {
    if (product) setProductImages(product.image ? [product.image] : []);
  }, [product?.id]);

  useEffect(() => {
    setHasChanges(false);
  }, [product?.id]);

  useEffect(() => {
    if (product) setCategory(product.category);
  }, [product?.id, product?.category]);

  useEffect(() => {
    if (product) {
      const variant = getVariantOptionsForProduct(product.category, product.name);
      setVariantOptions(variant.options);
      setSelectedSizes(variant.prefill);
    }
  }, [product?.id, product?.category, product?.name]);

  if (!product) {
    return (
      <div style={{ padding: 48, fontFamily: 'inherit', maxWidth: 560 }}>
        <p style={{ marginBottom: 16, fontFamily: 'inherit', color: tokens.semantic.colors.text.neutral }}>Product not found.</p>
        <Link to="/" style={{ fontFamily: 'inherit', color: tokens.semantic.colors.border.focused, textDecoration: 'underline' }}>
          Back to product list
        </Link>
      </div>
    );
  }

  const listLabel = venue === 'RX' ? 'Menu items' : 'Product list';

  const leftColumn = (
    <>
              <SectionCard title="Product details">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <CardGroup title="Details">
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: 6,
                          fontFamily: 'inherit',
                          fontSize: tokens.usage.typography.label.small.default.fontSize,
                          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                          color: tokens.semantic.colors.text.neutral,
                        }}
                      >
                        Product name *
                      </label>
                      <Input
                        value={product.name}
                        width="100%"
                        size="large"
                        action={
                          <IconButton
                            icon={<img src={LinkSvg} alt="" style={{ width: 16, height: 16 }} />}
                            aria-label="Link"
                            variant="flat"
                            size="xSmall"
                          />
                        }
                      />
                    </div>
                    <div style={{ alignSelf: 'flex-start', flexShrink: 0, width: '100%' }}>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: 6,
                          fontFamily: 'inherit',
                          fontSize: tokens.usage.typography.label.small.default.fontSize,
                          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                          color: tokens.semantic.colors.text.neutral,
                        }}
                      >
                        Description
                      </label>
                      <div
                        style={{
                          padding: 12,
                          borderRadius: 12,
                          border: `1px solid ${descriptionFocused ? tokens.semantic.colors.border.focused : tokens.semantic.colors.border.subdued}`,
                          backgroundColor: tokens.semantic.colors.surface.raised,
                          boxSizing: 'border-box',
                          boxShadow: descriptionFocused ? `inset 0 0 0 1px ${tokens.semantic.colors.border.focused}` : 'none',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                          alignSelf: 'flex-start',
                          flexShrink: 0,
                          width: '100%',
                        }}
                      >
                        <textarea
                          value={descriptionText}
                          onChange={(e) => {
                            setDescriptionText(e.target.value);
                            setHasChanges(true);
                          }}
                          onFocus={() => setDescriptionFocused(true)}
                          onBlur={() => setDescriptionFocused(false)}
                          rows={4}
                          style={{
                            width: '100%',
                            height: 4 * tokens.usage.typography.label.small.default.lineHeight,
                            minHeight: 4 * tokens.usage.typography.label.small.default.lineHeight,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontFamily: 'inherit',
                            fontSize: tokens.usage.typography.label.small.default.fontSize,
                            fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                            lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                            resize: 'vertical',
                            boxSizing: 'border-box',
                            display: 'block',
                            padding: 0,
                            color: tokens.semantic.colors.text.neutral,
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ alignSelf: 'flex-start', flexShrink: 0, width: '100%' }}>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: 6,
                          fontFamily: 'inherit',
                          fontSize: tokens.usage.typography.label.small.default.fontSize,
                          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                          color: tokens.semantic.colors.text.neutral,
                        }}
                      >
                        Media
                      </label>
                      {productImages.length === 0 ? (
                        <FileUploader
                          acceptText="We accept CSV, PDF, JPG, PNG files."
                          maxSizeText="Maximum file size: 10MB"
                          accept="image/jpeg,image/png,image/webp"
                          onFilesSelected={(files) => {
                            setHasChanges(true);
                            const urls = files
                              .filter((f) => f.type.startsWith('image/'))
                              .slice(0, 5)
                              .map((f) => URL.createObjectURL(f));
                            setProductImages(urls);
                          }}
                        />
                      ) : (
                        <ImageUploadSlots
                          images={productImages}
                          onImageSelected={(slotIndex, url) => {
                            setHasChanges(true);
                            setProductImages((prev) => {
                              const next = [...prev];
                              while (next.length <= slotIndex) next.push('');
                              next[slotIndex] = url;
                              return next.slice(0, 5);
                            });
                          }}
                        />
                      )}
                    </div>
                    <div style={{ alignSelf: 'flex-start', width: 'fit-content' }}>
                      <Button
                        variant="secondary"
                        size="small"
                        icon={<img src={CameraLineSvg} alt="" style={{ width: 16, height: 16 }} />}
                      >
                        How can I improve my images
                      </Button>
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: 6,
                          fontFamily: 'inherit',
                          fontSize: tokens.usage.typography.label.small.default.fontSize,
                          fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                          color: tokens.semantic.colors.text.neutral,
                        }}
                      >
                        Brand
                      </label>
                      <Input
                        value={product.brand ?? ''}
                        width="100%"
                        size="large"
                        action={
                          <IconButton
                            icon={<img src={LinkSvg} alt="" style={{ width: 16, height: 16 }} />}
                            aria-label="Link"
                            variant="flat"
                            size="xSmall"
                          />
                        }
                      />
                    </div>
                  </CardGroup>
                  <CardGroup title="Price">
                    <Input
                      value={product.price.replace(/[^0-9.]/g, '')}
                      width="100%"
                      size="large"
                      action={
                        <span style={{ fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, color: tokens.semantic.colors.text.subdued }}>EUR</span>
                      }
                    />
                    <div style={{ marginTop: 8 }}>
                      <Button variant="secondary" size="small">+ Add discount</Button>
                    </div>
                  </CardGroup>
                </div>
              </SectionCard>

              <SectionCard title="Product identifier">
                <div
                  style={{
                    backgroundColor: '#F8F8F8',
                    padding: 20,
                    borderRadius: 32,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 6, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, fontWeight: tokens.usage.typography.label.small.default.fontWeight, color: tokens.semantic.colors.text.neutral }}>
                        Identifier
                      </label>
                      <Input value={product.gtin ?? ''} width="100%" size="large" />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: 6, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, fontWeight: tokens.usage.typography.label.small.default.fontWeight, color: tokens.semantic.colors.text.neutral }}>
                        Category
                      </label>
                      <DropdownField
                        options={CATEGORY_OPTIONS_GLOBAL.map((c) => ({ id: c, label: c }))}
                        value={category || undefined}
                        onSelect={(id) => {
                          setCategory(id);
                          setHasChanges(true);
                          const variant = getVariantOptionsForProduct(id, product.name);
                          setVariantOptions(variant.options);
                          setSelectedSizes(variant.prefill);
                        }}
                        placeholder="Select category"
                        size="large"
                        width="100%"
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {shouldShowVariantsBlock(venue, category) && (
                <SectionCard title="Variants">
                  <div style={{ backgroundColor: '#F8F8F8', padding: 20, borderRadius: 32 }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 6, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, fontWeight: tokens.usage.typography.label.small.default.fontWeight, color: tokens.semantic.colors.text.neutral }}>
                        Size
                      </label>
                      <DropdownField
                        variant="chips"
                        options={variantOptions.map((s) => ({ id: s, label: s }))}
                        valueChips={selectedSizes}
                        onSelect={(id) => { setSelectedSizes((prev) => (prev.includes(id) ? prev : [...prev, id])); setHasChanges(true); }}
                        onRemoveChip={(id) => { setSelectedSizes((prev) => prev.filter((x) => x !== id)); setHasChanges(true); }}
                        placeholder="Select size"
                        size="large"
                        width="100%"
                      />
                    </div>
                  </div>
                </SectionCard>
              )}

              <SectionCard title="Venue connections">
                <div style={{ backgroundColor: '#F8F8F8', padding: 20, borderRadius: 32 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 6, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, fontWeight: tokens.usage.typography.label.small.default.fontWeight, color: tokens.semantic.colors.text.neutral }}>
                        Venues
                      </label>
                      <DropdownField
                        variant="chips"
                        options={VENUE_OPTIONS.map((v) => ({ id: v, label: v }))}
                        valueChips={selectedVenues}
                        onSelect={(id) => { setSelectedVenues((prev) => (prev.includes(id) ? prev : [...prev, id])); setHasChanges(true); }}
                        onRemoveChip={(id) => { setSelectedVenues((prev) => prev.filter((x) => x !== id)); setHasChanges(true); }}
                        getChipImageUrl={() => venueChipImage}
                        placeholder="Select venue"
                        size="large"
                        width="100%"
                      />
                    </div>
                    <div style={{ marginTop: 0 }}>
                      <Button variant="secondary" size="small" onClick={() => {}}>
                        + Add venue
                      </Button>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Availability">
                <div style={{ backgroundColor: '#F8F8F8', padding: 20, borderRadius: 32 }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 6, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, fontWeight: tokens.usage.typography.label.small.default.fontWeight, color: tokens.semantic.colors.text.neutral }}>
                      Available for purchase
                    </label>
                    <DropdownField
                      options={AVAILABILITY_OPTIONS.map((a) => ({ id: a, label: a }))}
                      value={availability}
                      onSelect={(id) => { setAvailability(id); setHasChanges(true); }}
                      placeholder="Select"
                      size="large"
                      width="100%"
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Tags" defaultCollapsed>
                <p style={{ margin: 0, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, color: tokens.semantic.colors.text.subdued }}>+ Add tag</p>
              </SectionCard>

              <SectionCard title="Delivery methods" defaultCollapsed>
                <p style={{ margin: 0, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, color: tokens.semantic.colors.text.subdued }}>+ Add delivery method</p>
              </SectionCard>

              <SectionCard title="Inventory" defaultCollapsed>
                <p style={{ margin: 0, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, color: tokens.semantic.colors.text.subdued }}>+ Set inventory</p>
              </SectionCard>

              <SectionCard title="Advanced details" defaultCollapsed>
                <p style={{ margin: 0, fontFamily: 'inherit', fontSize: tokens.usage.typography.label.small.default.fontSize, color: tokens.semantic.colors.text.subdued }}>+ Configure advanced options</p>
              </SectionCard>
    </>
  );

  const rightColumn = (
    <div
      style={{
        width: 434,
        flexShrink: 0,
        backgroundColor: tokens.semantic.colors.surface.raised,
        borderRadius: 32,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 655,
      }}
    >
              <div
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 24,
                }}
              >
                <span
                  style={{
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
              </div>
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  padding: '0 24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    backgroundColor: '#F8F8F8',
                    padding: 20,
                    borderRadius: 32,
                    overflow: 'auto',
                  }}
                >
                  {product.image ? (
                    <div
                      style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 32,
                        overflow: 'hidden',
                        backgroundColor: tokens.semantic.colors.surface.subdued,
                        marginBottom: 16,
                      }}
                    >
                      <img
                        src={product.image}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 32,
                        overflow: 'hidden',
                        backgroundColor: tokens.semantic.colors.surface.subdued,
                        marginBottom: 16,
                      }}
                    >
                      <img
                        src={newProductPreviewImage}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  {productImages.some(Boolean) && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 8,
                        marginBottom: 16,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {productImages.filter(Boolean).map((src, index) => (
                        <div
                          key={`${src}-${index}`}
                          style={{
                            width: 64,
                            height: 36,
                            borderRadius: 8,
                            overflow: 'hidden',
                            flexShrink: 0,
                            border: `2px solid ${tokens.semantic.colors.surface.raised}`,
                            backgroundColor: tokens.semantic.colors.surface.subdued,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={src}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <h2
                    style={{
                      margin: '0 0 8px',
                      fontFamily: 'inherit',
                      fontSize: 18,
                      fontWeight: tokens.usage.typography.label.large.strong.fontWeight,
                      lineHeight: '24px',
                      color: tokens.semantic.colors.text.neutral,
                    }}
                  >
                    {product.name || 'Add product'}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'inherit',
                      fontSize: tokens.usage.typography.label.small.default.fontSize,
                      lineHeight: 1.5,
                      color: tokens.semantic.colors.text.subdued,
                    }}
                  >
                    {descriptionText || 'An example of how your product will look for your customers. For illustrative purposes only.'}
                  </p>
                  {shouldShowVariantsBlock(venue, category) && selectedSizes.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                        marginTop: 16,
                        marginBottom: 12,
                      }}
                    >
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'inherit',
                          fontSize: 'var(--usage-type-label-medium-default-font-size, 16px)',
                          fontWeight: 500,
                          lineHeight: 'var(--usage-type-label-medium-default-line-height, 22px)',
                          letterSpacing: 'var(--usage-type-label-medium-default-letter-spacing, -0.01px)',
                          color: tokens.semantic.colors.text.neutral,
                        }}
                      >
                        Size
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {selectedSizes.map((size) => (
                          <FilterChip
                            key={size}
                            label={size}
                            size="small"
                            hasSelections={selectedPreviewSize === size}
                            hideActionButton
                            onClick={() => setSelectedPreviewSize(selectedPreviewSize === size ? null : size)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {product.price != null && product.price !== '' && (
                    <p
                      style={{
                        margin: '16px 0 0',
                        fontFamily: 'inherit',
                        fontSize: 'var(--usage-type-label-medium-default-font-size, 16px)',
                        fontWeight: 600,
                        color: tokens.semantic.colors.text.neutral,
                      }}
                    >
                      Price: {product.price}
                    </p>
                  )}
                </div>
              </div>
    </div>
  );

  return (
    <>
      <ProductFormLayout
        venue={venue}
        sidebarExpanded={sidebarExpanded}
        onSidebarExpandedChange={setSidebarExpanded}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: listLabel, href: '/' },
          { label: product.name },
        ]}
        title={product.name}
        subtitle="Last updated: 10/11, 12:17"
        headerActions={
          <IconButton
            icon={<img src={MoreHorizontalSvg} alt="" style={{ width: 16, height: 16 }} />}
            aria-label="More"
            variant="ghost"
            size="small"
          />
        }
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        showActionBar={hasChanges}
        onActionBarCancel={() => {
          setDescriptionText(getProductDescription(product));
          setProductImages(product.image ? [product.image] : []);
          setHasChanges(false);
        }}
        onActionBarSaveProduct={() => setGoLiveModalOpen(true)}
        currentProduct={product}
      />
      <GoLiveConfirmModal
        isOpen={goLiveModalOpen}
        onClose={() => setGoLiveModalOpen(false)}
        onConfirm={() => {
          setGoLiveModalOpen(false);
          setHasChanges(false);
          navigate('/', { state: { venue } });
        }}
        productName={product.name}
        productImage={product.image || productPlaceholder}
        price={product.price ?? undefined}
        isNewProduct={false}
        productCount={1}
        venuesAffected={selectedVenues}
        hideDoNotShowAgain
        doNotShowAgain={doNotShowGoLiveModal}
        onDoNotShowAgainChange={(checked) => {
          setDoNotShowGoLiveModal(checked);
          localStorage.setItem('doNotShowGoLiveModal', String(checked));
        }}
      />
    </>
  );
};
