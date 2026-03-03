/**
 * Create New Product page.
 * Uses the same shared layout and form structure as Product Detail View, with empty initial state.
 * Route: /product/new
 */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarState } from '../../contexts/SidebarStateContext';
import { tokens } from '../../../tokens';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';
import { Input, SearchSuggestionsField, DropdownField } from '../../components/Field';
import { CardGroup } from '../../components/CardGroup';
import { ImageUploadSlots } from '../../components/ImageUploadSlots';
import { FileUploader } from '../../components/FileUploader';
import { FilterChip } from '../../components/FilterChip';
import { SegmentedControl } from '../../components/SegmentedControl';
import { ProductFormLayout, SectionCard } from './shared';
import { getVariantOptionsForProduct, shouldShowVariantsBlock } from './variantOptions';
import { GoLiveConfirmModal } from '../../components/Modal';
import { productPlaceholder } from '../ProductListPage/data';
import type { Product } from '../ProductListPage/types';
import type { Venue } from '../ProductListPage/venue';
import { CATEGORY_OPTIONS_GLOBAL } from '../ProductListPage/constants';
import TvLineSvg from '../../icons/16/tv-line.svg';
import DevicePhoneSvg from '../../icons/16/device-phone.svg';
import LinkSvg from '../../icons/16/link.svg';
import CameraLineSvg from '../../icons/16/camera-line.svg';
import MoreHorizontalSvg from '../../icons/16/more-horizontal.svg';
import newProductPreviewImage from '../../images/new product preview.png';
import searchSuggestionsThumbnail from '../../images/Search suggestions/Thumbnail.png';
import searchSuggestionsColaZero50 from '../../images/Search suggestions/Coca-Cola Zero Sugar 50cl.png';
import searchSuggestionsColaZero33 from '../../images/Search suggestions/Coca-Cola Zero Sugar 33cl.png';
import searchSuggestionsColaOriginal50 from '../../images/Search suggestions/Coca-Cola Original 50cl.png';
import searchSuggestionsColaOriginalTaste33 from '../../images/Search suggestions/Coca-Cola Original Taste 33cl.png';
import searchSuggestionsColaOriginalGlass33 from '../../images/Search suggestions/Coca-Cola Original Taste Glass Bottle 33cl.png';
import searchSuggestionsColaVanilla33 from '../../images/Search suggestions/Coca-Cola Vanilla 33cl.png';
import venueChipImage from '../../images/Flags (chips)/Shell/Vector.png';

/** Availability options for Availability dropdown. */
const AVAILABILITY_OPTIONS = ['Within opening hours', 'Always', 'Custom'];

/** Venue options for Venue connections dropdown (chips variant). */
const VENUE_OPTIONS = [
  'Metreon, San Francisco, California 94103',
  'METRO Supermarkets',
  'Burgeramt Prenzlauer Berg',
];

const PREVIEW_DESCRIPTION_MAX_LENGTH = 200;

/** Prefill data for form when a suggestion is selected. */
interface ProductPrefill {
  description: string;
  brand: string;
  category: string;
  gtin: string;
  price: string;
  imageUrls: string[];
}

function getDetailedDescription(label: string): string {
  if (/Coca-Cola/i.test(label)) {
    return "Coca-Cola Classic is the world's most well-known and beloved soft drink. " +
      "Coca-Cola has a long history and has been a highly appreciated drink by people around the world since it was created by pharmacist Dr. John Pemberton in Atlanta, USA, in 1886. " +
      "Since 1886, the drink has been sold as a thirst quencher that suits everyone and 98 percent of the world's population is familiar with the brand.";
  }
  if (/Fanta/i.test(label)) {
    return "Fanta is a global soft drink brand originally created in Germany. " +
      "Today Fanta is sold in more than 190 countries with a wide range of fruit flavours. " +
      "The brand has been part of The Coca-Cola Company portfolio for decades and is known for its bold, refreshing taste and vibrant personality.";
  }
  if (/Sprite/i.test(label)) {
    return "Sprite is a lemon-lime flavoured soft drink that has been refreshing people around the world since 1961. " +
      "Known for its crisp, clean taste and iconic green bottle, Sprite is one of the world's leading lemon-lime carbonated beverages and is available in regular and zero-sugar variants.";
  }
  if (/Pepsi|7UP|Mirinda/i.test(label)) {
    return "This iconic beverage has been a favourite for generations. " +
      "With a distinct taste and global presence, it continues to be a popular choice for consumers worldwide. " +
      "The brand is committed to quality and innovation in the beverage industry.";
  }
  if (/Red Bull|Monster/i.test(label)) {
    return "Energy drinks are designed to help boost mental and physical performance. " +
      "This product has become a leading choice for consumers seeking an extra boost during busy days. " +
      "It is formulated with a blend of ingredients to support alertness and concentration.";
  }
  if (/Water/i.test(label)) {
    return "Water is essential for life and good health. " +
      "This product provides a refreshing way to stay hydrated throughout the day. " +
      "Whether still or sparkling, quality water is a staple in households and on the go.";
  }
  if (/Juice|Smoothie/i.test(label)) {
    return "Fruit juices and smoothies offer a convenient way to enjoy the goodness of fruit. " +
      "This product is made with quality ingredients to deliver a refreshing and nutritious option. " +
      "Ideal for breakfast, a midday refreshment, or as part of a balanced diet.";
  }
  if (/Milk|Oat|Almond/i.test(label)) {
    return "Dairy and plant-based milk alternatives provide essential nutrients and versatility. " +
      "This product is a popular choice for drinking, cereal, coffee, and cooking. " +
      "It is produced to high quality standards to meet consumer expectations.";
  }
  if (/Tea|Coffee/i.test(label)) {
    return "Ready-to-drink tea and coffee offer convenience without compromising on taste. " +
      "This product is crafted for consumers who want quality refreshment on the go. " +
      "It has become a favourite in the cold beverage category.";
  }
  if (/Lay's|Doritos|Pringles|Snickers|Twix|Mars|Haribo|Nutella/i.test(label)) {
    return "This product is a well-loved snack enjoyed by people of all ages. " +
      "With a reputation for quality and taste, it has become a household name. " +
      "Perfect for sharing or enjoying as a treat any time of day.";
  }
  return `${label}. A popular choice for customers looking for quality and taste. This product is widely recognised and trusted by consumers.`;
}

function getPrefillForProduct(
  label: string,
  imageUrl?: string,
  imageUrls?: string[]
): ProductPrefill {
  const images = imageUrls?.length ? imageUrls : imageUrl ? [imageUrl] : [];
  const brand =
    /Coca-Cola|Fanta|Sprite|Schweppes/i.test(label) ? 'The Coca-Cola Company' :
    /Pepsi|7UP|Mirinda|Gatorade|Powerade|Lay's|Doritos|Quaker/i.test(label) ? 'PepsiCo' :
    /Red Bull/i.test(label) ? 'Red Bull GmbH' :
    /Monster/i.test(label) ? 'Monster Beverage Corporation' :
    /Haribo/i.test(label) ? 'Haribo' :
    /Nutella|Ferrero/i.test(label) ? 'Ferrero' :
    /Mars|Snickers|Twix|M&M/i.test(label) ? 'Mars, Incorporated' :
    /Pringles/i.test(label) ? 'Kellogg\'s' :
    label.split(' ')[0] || '';
  const category =
    /Water|Juice|Smoothie|Cola|Fanta|Sprite|Pepsi|Energy|Red Bull|Monster|Tea|Coffee|Milk|Oat|Almond|Tonic|Ginger|Dr Pepper|7UP|Lilt/i.test(label) ? 'Beverages' :
    /Lay's|Doritos|Pringles|Snickers|Twix|Mars|Haribo|Nutella/i.test(label) ? 'Snacks' :
    'Beverages';
  const description = getDetailedDescription(label);
  const gtin = '00000073513513';
  const price = '';
  return { description, brand, category, gtin, price, imageUrls: images };
}

/** Product name suggestions: supermarket-style products; images from Search suggestions where available, else Thumbnail. */
const PRODUCT_NAME_OPTIONS: Array<{
  id: string;
  label: string;
  imageUrl?: string;
  imageUrls?: string[];
}> = [
  // Coca-Cola (single image per product from Search suggestions folder)
  { id: 'cola-zero-50', label: 'Coca-Cola Zero Sugar 50cl', imageUrl: searchSuggestionsColaZero50 },
  { id: 'cola-zero-33', label: 'Coca-Cola Zero Sugar 33cl', imageUrl: searchSuggestionsColaZero33 },
  { id: 'cola-original-50', label: 'Coca-Cola Original 50cl', imageUrl: searchSuggestionsColaOriginal50 },
  { id: 'cola-original-taste-33', label: 'Coca-Cola Original Taste 33cl', imageUrl: searchSuggestionsColaOriginalTaste33 },
  { id: 'cola-original-glass-33', label: 'Coca-Cola Original Taste Glass Bottle 33cl', imageUrl: searchSuggestionsColaOriginalGlass33 },
  { id: 'cola-vanilla-33', label: 'Coca-Cola Vanilla 33cl', imageUrl: searchSuggestionsColaVanilla33 },
  { id: 'cola-cherry-33', label: 'Coca-Cola Cherry 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'cola-diet-33', label: 'Coca-Cola Diet 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'cola-energy-25', label: 'Coca-Cola Energy 25cl', imageUrl: searchSuggestionsThumbnail },
  // Fanta
  { id: 'fanta-orange-33', label: 'Fanta Orange 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'fanta-orange-50', label: 'Fanta Orange 50cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'fanta-lemon-33', label: 'Fanta Lemon 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'fanta-grape-33', label: 'Fanta Grape 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'fanta-strawberry-33', label: 'Fanta Strawberry 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'fanta-zero-orange-33', label: 'Fanta Zero Orange 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'fanta-exotic-33', label: 'Fanta Exotic 33cl', imageUrl: searchSuggestionsThumbnail },
  // Sprite
  { id: 'sprite-33', label: 'Sprite 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'sprite-50', label: 'Sprite 50cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'sprite-zero-33', label: 'Sprite Zero 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'sprite-lemonade-33', label: 'Sprite Lemonade 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'sprite-cucumber-33', label: 'Sprite Cucumber 33cl', imageUrl: searchSuggestionsThumbnail },
  // Other soft drinks
  { id: 'schweppes-tonic-33', label: 'Schweppes Tonic Water 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'schweppes-ginger-33', label: 'Schweppes Ginger Ale 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'pepsi-33', label: 'Pepsi 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'pepsi-max-33', label: 'Pepsi Max 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: '7up-33', label: '7UP 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'mirinda-orange-33', label: 'Mirinda Orange 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'lilt-33', label: 'Lilt 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'dr-pepper-33', label: 'Dr Pepper 33cl', imageUrl: searchSuggestionsThumbnail },
  // Water
  { id: 'water-still-50', label: 'Still Water 50cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'water-still-15', label: 'Still Water 1.5L', imageUrl: searchSuggestionsThumbnail },
  { id: 'water-sparkling-33', label: 'Sparkling Water 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'water-sparkling-50', label: 'Sparkling Water 50cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'water-flavoured-lemon-50', label: 'Flavoured Water Lemon 50cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'water-flavoured-peach-50', label: 'Flavoured Water Peach 50cl', imageUrl: searchSuggestionsThumbnail },
  // Juices
  { id: 'juice-orange-25', label: 'Orange Juice 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'juice-orange-1l', label: 'Orange Juice 1L', imageUrl: searchSuggestionsThumbnail },
  { id: 'juice-apple-25', label: 'Apple Juice 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'juice-multivitamin-25', label: 'Multivitamin Juice 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'juice-tropical-25', label: 'Tropical Juice 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'juice-cranberry-25', label: 'Cranberry Juice 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'smoothie-mango-25', label: 'Mango Smoothie 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'smoothie-berry-25', label: 'Mixed Berry Smoothie 25cl', imageUrl: searchSuggestionsThumbnail },
  // Energy & sports
  { id: 'redbull-25', label: 'Red Bull 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'redbull-sugarfree-25', label: 'Red Bull Sugarfree 25cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'monster-50', label: 'Monster Energy 50cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'gatorade-citrus-50', label: 'Gatorade Citrus 50cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'powerade-50', label: 'Powerade 50cl', imageUrl: searchSuggestionsThumbnail },
  // Milk & dairy drinks
  { id: 'milk-full-1l', label: 'Full Fat Milk 1L', imageUrl: searchSuggestionsThumbnail },
  { id: 'milk-semi-1l', label: 'Semi-Skimmed Milk 1L', imageUrl: searchSuggestionsThumbnail },
  { id: 'milk-chocolate-33', label: 'Chocolate Milk 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'oat-milk-1l', label: 'Oat Milk 1L', imageUrl: searchSuggestionsThumbnail },
  { id: 'almond-milk-1l', label: 'Almond Milk 1L', imageUrl: searchSuggestionsThumbnail },
  // Tea & coffee (ready to drink)
  { id: 'ice-tea-peach-33', label: 'Iced Tea Peach 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'ice-tea-lemon-33', label: 'Iced Tea Lemon 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'cold-brew-33', label: 'Cold Brew Coffee 33cl', imageUrl: searchSuggestionsThumbnail },
  { id: 'latte-27', label: 'Latte 27cl', imageUrl: searchSuggestionsThumbnail },
  // Snacks (supermarket staples)
  { id: 'lays-classic-150', label: 'Lay\'s Classic 150g', imageUrl: searchSuggestionsThumbnail },
  { id: 'doritos-nacho-180', label: 'Doritos Nacho 180g', imageUrl: searchSuggestionsThumbnail },
  { id: 'pringles-original-124', label: 'Pringles Original 124g', imageUrl: searchSuggestionsThumbnail },
  { id: 'snickers-50', label: 'Snickers 50g', imageUrl: searchSuggestionsThumbnail },
  { id: 'twix-50', label: 'Twix 50g', imageUrl: searchSuggestionsThumbnail },
  { id: 'mars-51', label: 'Mars 51g', imageUrl: searchSuggestionsThumbnail },
  { id: 'haribo-goldbears-200', label: 'Haribo Gold-Bears 200g', imageUrl: searchSuggestionsThumbnail },
  { id: 'nutella-350', label: 'Nutella 350g', imageUrl: searchSuggestionsThumbnail },
];

export const CreateNewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const venue: Venue = (location.state as { venue?: Venue })?.venue ?? 'RX';
  const { expanded: sidebarExpanded, setExpanded: setSidebarExpanded } = useSidebarState();

  const [productName, setProductName] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [gtin, setGtin] = useState('');
  const [category, setCategory] = useState('');
  const [selectedVenues, setSelectedVenues] = useState<string[]>(['Metreon, San Francisco, California 94103']);
  const [availability, setAvailability] = useState('Within opening hours');
  const [goLiveModalOpen, setGoLiveModalOpen] = useState(false);
  const [doNotShowGoLiveModal, setDoNotShowGoLiveModal] = useState(() => {
    const saved = localStorage.getItem('doNotShowGoLiveModal');
    return saved === 'true';
  });
  /** Selected product name suggestion id (for SearchSuggestionsField). */
  const [productNameSelectedId, setProductNameSelectedId] = useState<string | undefined>(undefined);
  const [variantOptions, setVariantOptions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPreviewSize, setSelectedPreviewSize] = useState<string | null>(null);
  const [previewView, setPreviewView] = useState<'tv' | 'phone'>('phone');

  const listLabel = venue === 'RX' ? 'Menu items' : 'Product list';

  const handleSaveProduct = () => {
    setGoLiveModalOpen(true);
  };

  const handleGoLiveConfirm = () => {
    setGoLiveModalOpen(false);
    const newProduct: Product = {
      id: `new-${Date.now()}`,
      name: productName || 'New product',
      category: category || 'Special Offers',
      price: price ? `€ ${price}` : '€ 0',
      status: 'Active',
      image: productImages[0] || productPlaceholder,
      brand: brand || undefined,
      gtin: gtin || undefined,
    };
    navigate('/', { state: { venue, newProduct, toastMessage: 'Product added and published' } });
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: listLabel, href: '/' },
    { label: 'Create new product' },
  ];

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
              <SearchSuggestionsField
                options={PRODUCT_NAME_OPTIONS}
                value={productNameSelectedId}
                onSelect={(id) => {
                  setProductNameSelectedId(id);
                  const opt = PRODUCT_NAME_OPTIONS.find((o) => o.id === id);
                  if (!opt) return;
                  setProductName(opt.label);
                  const prefill = getPrefillForProduct(
                    opt.label,
                    opt.imageUrl,
                    opt.imageUrls
                  );
                  setDescriptionText(prefill.description);
                  setBrand(prefill.brand);
                  setCategory(prefill.category);
                  setGtin(prefill.gtin);
                  setPrice(prefill.price);
                  setProductImages(opt.imageUrl === searchSuggestionsThumbnail ? [] : prefill.imageUrls);
                  const variant = getVariantOptionsForProduct(prefill.category, opt.label);
                  setVariantOptions(variant.options);
                  setSelectedSizes(variant.prefill);
                }}
                actionLabel="Add"
                placeholder="Search or select product"
                size="large"
                width="100%"
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
                  boxShadow: descriptionFocused
                    ? `inset 0 0 0 1px ${tokens.semantic.colors.border.focused}`
                    : 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  alignSelf: 'flex-start',
                  flexShrink: 0,
                  width: '100%',
                }}
              >
                <textarea
                  value={descriptionText}
                  onChange={(e) => setDescriptionText(e.target.value)}
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
                value={brand}
                onChange={(value) => setBrand(value)}
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
                value={price}
                onChange={(value) => setPrice(value)}
              width="100%"
              size="large"
              action={
                <span
                  style={{
                    fontFamily: 'inherit',
                    fontSize: tokens.usage.typography.label.small.default.fontSize,
                    color: tokens.semantic.colors.text.subdued,
                  }}
                >
                  EUR
                </span>
              }
            />
            <div style={{ marginTop: 8 }}>
              <Button variant="secondary" size="small">
                + Add discount
              </Button>
            </div>
          </CardGroup>
        </div>
      </SectionCard>

      {productNameSelectedId && shouldShowVariantsBlock(venue, category) && (
        <SectionCard title="Variants">
          <div
            style={{
              backgroundColor: '#F8F8F8',
              padding: 20,
              borderRadius: 32,
            }}
          >
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
                Size
              </label>
              <DropdownField
                variant="chips"
                options={variantOptions.map((s) => ({ id: s, label: s }))}
                valueChips={selectedSizes}
                onSelect={(id) => setSelectedSizes((prev) => (prev.includes(id) ? prev : [...prev, id]))}
                onRemoveChip={(id) => setSelectedSizes((prev) => prev.filter((x) => x !== id))}
                placeholder="Select size"
                size="large"
                width="100%"
              />
            </div>
          </div>
        </SectionCard>
      )}

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
                Identifier
              </label>
              <Input value={gtin} onChange={(value) => setGtin(value)} width="100%" size="large" />
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
                Category
              </label>
              <DropdownField
                options={CATEGORY_OPTIONS_GLOBAL.map((c) => ({ id: c, label: c }))}
                value={category || undefined}
                onSelect={(id) => {
                  setCategory(id);
                  if (productNameSelectedId) {
                    const variant = getVariantOptionsForProduct(id, productName);
                    setVariantOptions(variant.options);
                    setSelectedSizes(variant.prefill);
                  }
                }}
                placeholder="Select category"
                size="large"
                width="100%"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Venue connections">
        <div
          style={{
            backgroundColor: '#F8F8F8',
            padding: 20,
            borderRadius: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                Venues
              </label>
              <DropdownField
                variant="chips"
                options={VENUE_OPTIONS.map((v) => ({ id: v, label: v }))}
                valueChips={selectedVenues}
                onSelect={(id) => setSelectedVenues((prev) => (prev.includes(id) ? prev : [...prev, id]))}
                onRemoveChip={(id) => setSelectedVenues((prev) => prev.filter((x) => x !== id))}
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
        <div
          style={{
            backgroundColor: '#F8F8F8',
            padding: 20,
            borderRadius: 32,
          }}
        >
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
              Available for purchase
            </label>
            <DropdownField
              options={AVAILABILITY_OPTIONS.map((a) => ({ id: a, label: a }))}
              value={availability}
              onSelect={setAvailability}
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

  const previewImage = productImages[0];
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
          {previewImage ? (
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
                src={previewImage}
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
            {productName || 'Add product'}
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
            {descriptionText
              ? descriptionText.length <= PREVIEW_DESCRIPTION_MAX_LENGTH
                ? descriptionText
                : `${descriptionText.slice(0, PREVIEW_DESCRIPTION_MAX_LENGTH).trim()}…`
              : 'An example of how your product will look for your customers. For illustrative purposes only.'}
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
                    onClick={() =>
                      setSelectedPreviewSize(selectedPreviewSize === size ? null : size)
                    }
                  />
                ))}
              </div>
            </div>
          )}
          {price != null && price !== '' && (
            <p
              style={{
                margin: '16px 0 0',
                fontFamily: 'inherit',
                fontSize: 'var(--usage-type-label-medium-default-font-size, 16px)',
                fontWeight: 600,
                color: tokens.semantic.colors.text.neutral,
              }}
            >
              Price: € {price}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const showActionBar =
    productNameSelectedId != null ||
    !!(
      productName ||
      descriptionText ||
      brand ||
      price ||
      gtin ||
      category ||
      productImages.length > 0
    );

  return (
    <>
      <ProductFormLayout
        venue={venue}
        sidebarExpanded={sidebarExpanded}
        onSidebarExpandedChange={setSidebarExpanded}
        breadcrumbItems={breadcrumbItems}
        title="Create new product"
        subtitle={undefined}
        headerActions={
          <IconButton
            icon={<img src={MoreHorizontalSvg} alt="" style={{ width: 16, height: 16 }} />}
            aria-label="More"
            variant="secondary"
            onClick={() => navigate('/', { state: { venue } })}
          />
        }
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        showActionBar={showActionBar}
        onActionBarCancel={() => navigate('/', { state: { venue } })}
        onActionBarSaveProduct={handleSaveProduct}
      />
      <GoLiveConfirmModal
        isOpen={goLiveModalOpen}
        onClose={() => setGoLiveModalOpen(false)}
        onConfirm={handleGoLiveConfirm}
        productName={productName || 'New product'}
        productImage={productImages[0] || productPlaceholder}
        price={price ? `€ ${price}` : undefined}
        isNewProduct
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
