import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarState } from '../../contexts/SidebarStateContext';
import { tokens } from '../../../tokens';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';
import { Badge } from '../../components/Badge';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Tab } from '../../components/Tab';
import { Checkbox } from '../../components/Checkbox';
import { Tag } from '../../components/Tag';
import { QualityScore } from '../../components/QualityScore';
import { ProductCard, ImageCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { SegmentedControl } from '../../components/SegmentedControl';
import { ExpandableSearch } from '../../components/ExpandableSearch';
import { Toast } from '../../components/Toast';
import { ActionBar } from '../../components/ActionBar';
import { PriceChangeModal, NameChangeModal, EditColumnsModal, ColumnConfig } from '../../components/Modal';
import { Popover, PopoverListItem } from '../../components/Popover';
import { ActionMenu, ActionMenuItem } from '../../components/ActionMenu';
import { FilterChip } from '../../components/FilterChip';
import { InCellSelect } from '../../components/InCellSelect';
import { DataTable } from '../../components/DataTable';
import { Sidebar } from '../../components/Sidebar';
import { EditableCell } from '../../components/Field';
import type { Product } from './types';
import { getInitialProductsDataByVenue, productPlaceholder } from './data';
import { getCollectionsByVenue, type Collection } from './collections';
import type { Venue } from './venue';
import { VENUE_DISPLAY_NAMES } from './venue';
import {
  DEFAULT_COLUMN_CONFIG,
  ITEMS_PER_PAGE,
  getCategoryOptionsByVenue,
  STATUS_OPTIONS,
  FILTER_LABELS,
} from './constants';
import {
  EyeIcon,
  MoreIcon,
  FunnelIcon,
  MenuIcon,
  GridIcon,
  AddIcon,
  SortIcon,
  ActiveIcon,
  InactiveIcon,
  ChevronDownIcon,
  TimeLineIcon,
  LineChartLineIcon,
  DashmartLineIcon,
  DealsLineIcon,
} from './icons';
import bobaBloomLogoSidebar from '../../images/boba-bloom-logo.png';
import burgeramtLogoImage from '../../images/RX/Burgeramt Prenzlauer Berg.avif';
import pedregalLogo from '../../images/.Nav/Pedregal.svg';
import DragHandleIcon from '../../icons/Drag handle.svg';
import InactiveIconSvg from '../../icons/Tag/Inactive.svg';
import ActiveIconSvg from '../../icons/Tag/active.svg';
import EditIconSvg from '../../icons/16/edit-line.svg';
import PlusCircleSvg from '../../icons/16/Plus circle.svg';
import DownloadSvg from '../../icons/16/Download.svg';
import BarcodeViewfinderSvg from '../../icons/16/Barcode viewfinder.svg';
import BookSvg from '../../icons/16/Book.svg';
import HomeLineSvg from '../../icons/16/home-line.svg';
import SearchLineSvg from '../../icons/16/search-line.svg';
import ChatDefaultLineSvg from '../../icons/16/chat-default-line.svg';
import MenuEditLineSvg from '../../icons/16/menu-edit-line.svg';
import OrderBagLineSvg from '../../icons/16/order-bag-line.svg';
import CoinBagLineSvg from '../../icons/16/coin-bag-line.svg';
import DashboardLineSvg from '../../icons/16/dashboard-line.svg';
import PromoBullhornLineSvg from '../../icons/16/promo-bullhorn-line.svg';
import SettingsLineSvg from '../../icons/16/settings-line.svg';
import { getBadgeCount } from '../../components/ChatPanel';
import type { ChatContext } from '../../components/ChatPanel';

/** Renders a 16px icon from src/icons/16 as white for the sidebar. */
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

export const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { expanded: sidebarExpanded, setExpanded: setSidebarExpanded } = useSidebarState();
  const [currentPage, setCurrentPage] = useState(1);
  const venueFromNav = (location.state as { venue?: Venue } | null)?.venue;
  const [activeTab, setActiveTab] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [collectionSearchQuery, setCollectionSearchQuery] = useState('');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [editingCollectionNameId, setEditingCollectionNameId] = useState<string | null>(null);
  const [editingCollectionStatusId, setEditingCollectionStatusId] = useState<string | null>(null);
  const [hoveredCollectionStatusId, setHoveredCollectionStatusId] = useState<string | null>(null);
  const [hoveredCollectionRowId, setHoveredCollectionRowId] = useState<string | null>(null);
  const collectionStatusDropdownRef = useRef<HTMLDivElement>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);

  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  
  // Editable status states
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [hoveredStatusId, setHoveredStatusId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Editable category states
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  
  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Price change modal state
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [priceModalData, setPriceModalData] = useState<{
    productId: string;
    productName: string;
    productImage: string;
    priceBefore: string;
    priceAfter: string;
  } | null>(null);
  const [doNotShowPriceModal, setDoNotShowPriceModal] = useState(() => {
    // Load preference from localStorage (shared for both price and name change modals)
    const saved = localStorage.getItem('doNotShowPriceModal');
    return saved === 'true';
  });

  // Name change modal state (uses same doNotShow preference as price)
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [nameModalData, setNameModalData] = useState<{
    productId: string;
    productImage: string;
    nameBefore: string;
    nameAfter: string;
  } | null>(null);

  // Filter popover state
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [selectedFilterParent, setSelectedFilterParent] = useState<string | null>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const filterChipRef = useRef<HTMLDivElement>(null);
  const [chipRefReady, setChipRefReady] = useState(false);
  
  // Action menu state
  const [showActionMenu, setShowActionMenu] = useState<'header' | 'table' | null>(null);
  const [actionMenuPosition, setActionMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const headerActionButtonRef = useRef<HTMLDivElement>(null);
  const tableActionButtonRef = useRef<HTMLDivElement>(null);

  // Edit columns modal state
  const [showEditColumnsModal, setShowEditColumnsModal] = useState(false);
  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(DEFAULT_COLUMN_CONFIG);

  const tableTopRef = useRef<HTMLDivElement>(null);

  const [venue, setVenue] = useState<Venue>('NV');
  const [chatOpen, setChatOpen] = useState(false);
  const [fromOnboarding, setFromOnboarding] = useState(false);
  const [contentRevealReady, setContentRevealReady] = useState(true);
  const [productsData, setProductsData] = useState<Product[]>(() => getInitialProductsDataByVenue('NV'));
  const fullProductsRef = useRef<Product[]>(getInitialProductsDataByVenue('NV'));
  const categoryOptions = getCategoryOptionsByVenue(venue);
  const [collectionsData, setCollectionsData] = useState<Collection[]>(() => getCollectionsByVenue('NV'));

  useEffect(() => {
    if (venueFromNav !== undefined) {
      const state = location.state as { venue?: Venue; newProduct?: Product; toastMessage?: string; openChat?: boolean } | null;
      setVenue(venueFromNav);
      const initialProducts = getInitialProductsDataByVenue(venueFromNav);
      if (state?.newProduct) {
        const withNew = [state.newProduct, ...initialProducts];
        setProductsData(withNew);
        fullProductsRef.current = withNew;
        if (state.toastMessage) {
          setToastMessage(state.toastMessage);
          setToastVisible(true);
        }
      } else {
        setProductsData(initialProducts);
        fullProductsRef.current = initialProducts;
      }
      setCollectionsData(getCollectionsByVenue(venueFromNav));
      if (state?.openChat) {
        setChatOpen(true);
        setFromOnboarding(true);
        setSidebarExpanded(true);
      }
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [venueFromNav, navigate, location.pathname, location.state, setSidebarExpanded]);

  useEffect(() => {
    setCollectionsData(getCollectionsByVenue(venue));
    setEditingCollectionNameId(null);
    setEditingCollectionStatusId(null);
    setHoveredCollectionStatusId(null);
    setHoveredCollectionRowId(null);
  }, [venue]);
  const filteredCollections = React.useMemo(() => {
    if (!collectionSearchQuery.trim()) return collectionsData;
    const q = collectionSearchQuery.toLowerCase();
    return collectionsData.filter((c) => c.name.toLowerCase().includes(q));
  }, [collectionsData, collectionSearchQuery]);

  const contentRevealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleVenueSwitch = useCallback(() => {
    const next: Venue = venue === 'NV' ? 'RX' : 'NV';
    setVenue(next);
    setActiveTab(1); // Always land on Products tab when switching venue (same as initial load)
    setProductsData(getInitialProductsDataByVenue(next));
    setContentRevealReady(false);
    if (contentRevealTimeoutRef.current != null) clearTimeout(contentRevealTimeoutRef.current);
    contentRevealTimeoutRef.current = setTimeout(() => {
      setContentRevealReady(true);
      contentRevealTimeoutRef.current = null;
    }, 1000);
  }, [venue]);

  // Map filter IDs to their display labels
  const filterLabels: Record<string, string> = FILTER_LABELS;

  // Filter parent items
  const filterParentItems: PopoverListItem[] = Object.entries(filterLabels).map(([id, label]) => ({
    id,
    label,
    onClick: (selectedId) => {
      setSelectedFilterParent(selectedId);
    }
  }));

  // State for filter selections
  const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>([]);
  const [selectedImageCoverage, setSelectedImageCoverage] = useState<string | null>(null);
  const [selectedDescriptionCoverage, setSelectedDescriptionCoverage] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [selectedProductCatalog, setSelectedProductCatalog] = useState<string | null>(null);
  const [selectedGtin, setSelectedGtin] = useState<string | null>(null);
  const [selectedDuplicates, setSelectedDuplicates] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedVenueOverrides, setSelectedVenueOverrides] = useState<string | null>(null);

  // Child items for Status filter (checkboxes)
  const statusFilterItems: PopoverListItem[] = [
    { id: 'active', label: 'Active', selected: selectedStatusFilters.includes('active') },
    { id: 'inactive', label: 'Inactive', selected: selectedStatusFilters.includes('inactive') },
    { id: 'enabled', label: 'Enabled', selected: selectedStatusFilters.includes('enabled') },
    { id: 'disabled', label: 'Disabled', selected: selectedStatusFilters.includes('disabled') },
    { id: 'sold-out', label: 'Sold out', selected: selectedStatusFilters.includes('sold-out') },
  ];

  // Child items for Image coverage filter (radio buttons)
  const imageCoverageFilterItems: PopoverListItem[] = [
    { id: 'with-images', label: 'With images', selected: selectedImageCoverage === 'with-images' },
    { id: 'without-images', label: 'Without images', selected: selectedImageCoverage === 'without-images' },
  ];

  // Child items for Description coverage filter (radio buttons)
  const descriptionCoverageFilterItems: PopoverListItem[] = [
    { id: 'with-description', label: 'With description', selected: selectedDescriptionCoverage === 'with-description' },
    { id: 'without-description', label: 'Without description', selected: selectedDescriptionCoverage === 'without-description' },
  ];

  // Child items for Discount filter (radio buttons)
  const discountFilterItems: PopoverListItem[] = [
    { id: 'without-discount', label: 'Without discount', selected: selectedDiscount === 'without-discount' },
    { id: 'use-discounted-price', label: 'Use discounted price', selected: selectedDiscount === 'use-discounted-price' },
    { id: 'use-percentage', label: 'Use percentage', selected: selectedDiscount === 'use-percentage' },
  ];

  // Child items for Product catalog filter (radio buttons)
  const productCatalogFilterItems: PopoverListItem[] = [
    { id: 'connected', label: 'Connected', selected: selectedProductCatalog === 'connected' },
    { id: 'not-connected', label: 'Not connected', selected: selectedProductCatalog === 'not-connected' },
  ];

  // Child items for GTIN filter (radio buttons)
  const gtinFilterItems: PopoverListItem[] = [
    { id: 'with-gtin', label: 'With GTIN', selected: selectedGtin === 'with-gtin' },
    { id: 'without-gtin', label: 'Without GTIN', selected: selectedGtin === 'without-gtin' },
  ];

  // Child items for Duplicates filter (radio buttons)
  const duplicatesFilterItems: PopoverListItem[] = [
    { id: 'duplicated-gtin', label: 'Duplicated GTIN', selected: selectedDuplicates === 'duplicated-gtin' },
    { id: 'duplicated-merchant-sku', label: 'Duplicated Merchant SKU', selected: selectedDuplicates === 'duplicated-merchant-sku' },
  ];

  // Extract unique brands from products and create filter items (checkboxes)
  const uniqueBrands = Array.from(new Set(productsData.map(p => p.brand).filter(Boolean))).sort();
  const brandFilterItems: PopoverListItem[] = uniqueBrands.map(brand => ({
    id: brand!.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    label: brand!,
    selected: selectedBrands.includes(brand!.toLowerCase().replace(/[^a-z0-9]/g, '-')),
  }));

  // Child items for Venue overrides filter (radio buttons)
  const venueOverridesFilterItems: PopoverListItem[] = [
    { id: 'with-overrides', label: 'With overrides', selected: selectedVenueOverrides === 'with-overrides' },
    { id: 'without-overrides', label: 'Without overrides', selected: selectedVenueOverrides === 'without-overrides' },
  ];

  // Get child items based on selected parent
  const getChildItems = (): PopoverListItem[] => {
    switch (selectedFilterParent) {
      case 'status':
        return statusFilterItems;
      case 'image-coverage':
        return imageCoverageFilterItems;
      case 'description-coverage':
        return descriptionCoverageFilterItems;
      case 'discount':
        return discountFilterItems;
      case 'product-catalog':
        return productCatalogFilterItems;
      case 'gtin':
        return gtinFilterItems;
      case 'duplicates':
        return duplicatesFilterItems;
      case 'brand':
        return brandFilterItems;
      case 'venue-overrides':
        return venueOverridesFilterItems;
      default:
        return [
          { id: 'placeholder1', label: 'Child items will be added', selected: false },
          { id: 'placeholder2', label: 'Based on parent selection', selected: false },
        ];
    }
  };

  // Get template type based on selected parent
  const getTemplateType = (): 'checkboxes' | 'radios' => {
    switch (selectedFilterParent) {
      case 'status':
        return 'checkboxes';
      case 'image-coverage':
        return 'radios';
      case 'description-coverage':
        return 'radios';
      case 'discount':
        return 'radios';
      case 'product-catalog':
        return 'radios';
      case 'gtin':
        return 'radios';
      case 'duplicates':
        return 'radios';
      case 'brand':
        return 'checkboxes';
      case 'venue-overrides':
        return 'radios';
      default:
        return 'checkboxes';
    }
  };

  // Handle child item selection
  const handleChildItemChange = (id: string, selected: boolean) => {
    if (selectedFilterParent === 'status') {
      // Checkboxes - multi-select
      if (selected) {
        setSelectedStatusFilters([...selectedStatusFilters, id]);
      } else {
        setSelectedStatusFilters(selectedStatusFilters.filter(item => item !== id));
      }
    } else if (selectedFilterParent === 'image-coverage') {
      // Radio buttons - single select
      setSelectedImageCoverage(id);
    } else if (selectedFilterParent === 'description-coverage') {
      // Radio buttons - single select
      setSelectedDescriptionCoverage(id);
    } else if (selectedFilterParent === 'discount') {
      // Radio buttons - single select
      setSelectedDiscount(id);
    } else if (selectedFilterParent === 'product-catalog') {
      // Radio buttons - single select
      setSelectedProductCatalog(id);
    } else if (selectedFilterParent === 'gtin') {
      // Radio buttons - single select
      setSelectedGtin(id);
    } else if (selectedFilterParent === 'duplicates') {
      // Radio buttons - single select
      setSelectedDuplicates(id);
    } else if (selectedFilterParent === 'brand') {
      // Checkboxes - multi-select
      if (selected) {
        setSelectedBrands([...selectedBrands, id]);
      } else {
        setSelectedBrands(selectedBrands.filter(item => item !== id));
      }
    } else if (selectedFilterParent === 'venue-overrides') {
      // Radio buttons - single select
      setSelectedVenueOverrides(id);
    }
  };

  // Handle going back to parent filter view (closes child popover but keeps selections)
  const handleBackToParentFilter = () => {
    setSelectedFilterParent(null);
  };

  // Handle removing a specific filter (clears selections)
  const handleRemoveFilter = (filterKey: string) => {
    switch (filterKey) {
      case 'status':
        setSelectedStatusFilters([]);
        break;
      case 'image-coverage':
        setSelectedImageCoverage(null);
        break;
      case 'description-coverage':
        setSelectedDescriptionCoverage(null);
        break;
      case 'discount':
        setSelectedDiscount(null);
        break;
      case 'product-catalog':
        setSelectedProductCatalog(null);
        break;
      case 'gtin':
        setSelectedGtin(null);
        break;
      case 'duplicates':
        setSelectedDuplicates(null);
        break;
      case 'brand':
        setSelectedBrands([]);
        break;
      case 'venue-overrides':
        setSelectedVenueOverrides(null);
        break;
    }
    // If we're currently viewing this filter, close the popover
    if (selectedFilterParent === filterKey) {
      setSelectedFilterParent(null);
    }
  };

  // Get all filters that have active selections
  const getActiveFilters = (): string[] => {
    const active: string[] = [];
    Object.keys(filterLabels).forEach(key => {
      if (hasFilterSelection(key)) {
        active.push(key);
      }
    });
    return active;
  };

  // Check if a filter has any active selections
  const hasFilterSelection = (filterKey: string): boolean => {
    switch (filterKey) {
      case 'status':
        return selectedStatusFilters.length > 0;
      case 'image-coverage':
        return selectedImageCoverage !== null;
      case 'description-coverage':
        return selectedDescriptionCoverage !== null;
      case 'discount':
        return selectedDiscount !== null;
      case 'product-catalog':
        return selectedProductCatalog !== null;
      case 'gtin':
        return selectedGtin !== null;
      case 'duplicates':
        return selectedDuplicates !== null;
      case 'brand':
        return selectedBrands.length > 0;
      case 'venue-overrides':
        return selectedVenueOverrides !== null;
      default:
        return false;
    }
  };

  // Get visible columns based on columnConfig
  const visibleColumns = columnConfig.filter(col => col.selected);

  // Name column gets ~30% more space than others (flex 1.3 vs 1)
  const columnFlex = (columnId: string) => (columnId === 'name' ? '1.3 1 0%' : '1 1 0%');

  // Helper to render column cell based on column ID
  const renderColumnCell = (columnId: string, product: Product) => {
    switch (columnId) {
      case 'name':
        return (
          <div
            key="name"
            style={{
              display: 'flex',
              flex: columnFlex('name'),
              gap: '8px',
              alignItems: 'center',
              minHeight: '48px',
              padding: '4px 12px',
              borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '28px',
                minHeight: '28px',
                width: '28px',
                height: '28px',
                borderRadius: `${tokens.usage.borderRadius.small}px`,
                backgroundColor: tokens.semantic.colors.surface.raised,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{ width: '16px', height: '16px', opacity: 0.24 }} />
              )}
            </div>
            <EditableCell
              value={product.name}
              isEditing={editingNameId === product.id}
              onEditRequest={() => setEditingNameId(product.id)}
              onSave={(v) => handleNameSave(product.id, v)}
              onCancel={handleNameCancel}
              hasChange={(draft, original) => draft.trim() !== original.trim()}
              variant="label.small.strong"
              stopPropagation
            />
          </div>
        );

      case 'category':
        return (
          <InCellSelect
            key="category"
            value={product.category}
            options={categoryOptions}
            onChange={(newCategory) => handleCategoryChange(product.id, newCategory)}
            isHovered={hoveredCategoryId === product.id}
            isEditing={editingCategoryId === product.id}
            onHover={() => setHoveredCategoryId(product.id)}
            onHoverLeave={() => {
              if (editingCategoryId !== product.id) {
                setHoveredCategoryId(null);
              }
            }}
            onEditRequest={(e) => handleCategoryClick(e, product.id)}
            onClose={() => {
              setEditingCategoryId(null);
              setHoveredCategoryId(null);
            }}
            dropdownRef={editingCategoryId === product.id ? categoryDropdownRef : undefined}
            cellProductId={product.id}
            cellType="category"
          />
        );

      case 'price':
        return (
          <div
            key="price"
            style={{
              display: 'flex',
              flex: '1',
              gap: '8px',
              alignItems: 'center',
              minHeight: '48px',
              padding: '4px 12px',
              borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
            }}
          >
            <EditableCell
              value={product.price.replace(/[^0-9.]/g, '')}
              isEditing={editingPriceId === product.id}
              onEditRequest={() => setEditingPriceId(product.id)}
              onSave={(v) => handlePriceSave(product.id, v)}
              onCancel={handlePriceCancel}
              prefix="€ "
              parseInput={(raw) => raw.replace(/[^0-9.]/g, '')}
              formatDisplay={(v) => `€ ${v}`}
              variant="label.small.default"
              stopPropagation
            />
          </div>
        );

      case 'status':
        return (
          <InCellSelect
            key="status"
            value={product.status}
            options={STATUS_OPTIONS}
            onChange={(newStatus) => handleStatusChange(product.id, newStatus as 'Active' | 'Inactive')}
            isHovered={hoveredStatusId === product.id}
            isEditing={editingStatusId === product.id}
            onHover={() => setHoveredStatusId(product.id)}
            onHoverLeave={() => {
              if (editingStatusId !== product.id) {
                setHoveredStatusId(null);
              }
            }}
            onEditRequest={(e) => handleStatusClick(e, product.id)}
            onClose={() => {
              setEditingStatusId(null);
              setHoveredStatusId(null);
            }}
            dropdownRef={editingStatusId === product.id ? dropdownRef : undefined}
            cellProductId={product.id}
            cellType="status"
            renderValue={(status) => (
              <Tag
                style={status === 'Active' ? 'positive' : 'negative'}
                icon={status === 'Active' ? <ActiveIcon color="#327A34" /> : <InactiveIcon color="#C83527" />}
              >
                {status}
              </Tag>
            )}
          />
        );

      case 'quality-score':
        return (
          <div
            key="quality-score"
            style={{
              display: 'flex',
              flex: '1',
              gap: '8px',
              alignItems: 'center',
              minHeight: '48px',
              padding: '4px 12px',
              borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
            }}
          >
            {product.qualityScore !== undefined && (
              <QualityScore score={product.qualityScore} />
            )}
          </div>
        );

      case 'gtin':
        return (
          <div
            key="gtin"
            style={{
              display: 'flex',
              flex: '1',
              gap: '8px',
              alignItems: 'center',
              minHeight: '48px',
              padding: '4px 12px',
              borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
            }}
          >
            <span
              style={{
                fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                color: '#202125',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.gtin}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  // Helper to render column header (same flex as cells so column widths align)
  const renderColumnHeader = (columnId: string, label: string) => (
    <div
      key={columnId}
      style={{
        display: 'flex',
        flex: columnFlex(columnId),
        minWidth: 0,
        alignItems: 'center',
        gap: '8px',
        maxHeight: '48px',
        minHeight: '48px',
        padding: '12px 12px',
        borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
      }}
    >
      <span
        style={{
          fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
          fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
          fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
          lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
          color: tokens.semantic.colors.text.subdued,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '24px', minHeight: '24px' }}>
        <SortIcon color={tokens.semantic.colors.text.subdued} />
      </div>
    </div>
  );

  // Get filter chip label with selected values
  const getFilterChipLabel = (filterKey: string): string => {
    const filterName = filterLabels[filterKey];
    
    switch (filterKey) {
      case 'status':
        if (selectedStatusFilters.length === 0) return filterName;
        const statusLabels = selectedStatusFilters.map(id => {
          const item = statusFilterItems.find(i => i.id === id);
          return item?.label;
        }).filter(Boolean).join(', ');
        return `${filterName}: ${statusLabels}`;
      
      case 'image-coverage':
        if (!selectedImageCoverage) return filterName;
        const imageCoverageLabel = imageCoverageFilterItems.find(i => i.id === selectedImageCoverage)?.label;
        return imageCoverageLabel ? `${filterName}: ${imageCoverageLabel}` : filterName;
      
      case 'description-coverage':
        if (!selectedDescriptionCoverage) return filterName;
        const descCoverageLabel = descriptionCoverageFilterItems.find(i => i.id === selectedDescriptionCoverage)?.label;
        return descCoverageLabel ? `${filterName}: ${descCoverageLabel}` : filterName;
      
      case 'discount':
        if (!selectedDiscount) return filterName;
        const discountLabel = discountFilterItems.find(i => i.id === selectedDiscount)?.label;
        return discountLabel ? `${filterName}: ${discountLabel}` : filterName;
      
      case 'product-catalog':
        if (!selectedProductCatalog) return filterName;
        const catalogLabel = productCatalogFilterItems.find(i => i.id === selectedProductCatalog)?.label;
        return catalogLabel ? `${filterName}: ${catalogLabel}` : filterName;
      
      case 'gtin':
        if (!selectedGtin) return filterName;
        const gtinLabel = gtinFilterItems.find(i => i.id === selectedGtin)?.label;
        return gtinLabel ? `${filterName}: ${gtinLabel}` : filterName;
      
      case 'duplicates':
        if (!selectedDuplicates) return filterName;
        const duplicatesLabel = duplicatesFilterItems.find(i => i.id === selectedDuplicates)?.label;
        return duplicatesLabel ? `${filterName}: ${duplicatesLabel}` : filterName;
      
      case 'brand':
        if (selectedBrands.length === 0) return filterName;
        const brandLabels = selectedBrands.map(id => {
          const item = brandFilterItems.find(i => i.id === id);
          return item?.label;
        }).filter(Boolean).join(', ');
        return `${filterName}: ${brandLabels}`;
      
      case 'venue-overrides':
        if (!selectedVenueOverrides) return filterName;
        const venueLabel = venueOverridesFilterItems.find(i => i.id === selectedVenueOverrides)?.label;
        return venueLabel ? `${filterName}: ${venueLabel}` : filterName;
      
      default:
        return filterName;
    }
  };

  // Filter products based on search query and active filters
  const filteredProducts = productsData.filter((product) => {
    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      
      if (!nameMatch && !categoryMatch) return false;
    }
    
    // Status filter (checkboxes - can select multiple)
    if (selectedStatusFilters.length > 0) {
      const statusMatches = selectedStatusFilters.some(filterId => {
        // Map filter IDs to actual status values
        if (filterId === 'active' && product.status === 'Active') return true;
        if (filterId === 'inactive' && product.status === 'Inactive') return true;
        // Note: 'enabled', 'disabled', 'sold-out' are not in our data model, so we skip them
        return false;
      });
      if (!statusMatches) return false;
    }
    
    // Image coverage filter (radio - single selection)
    if (selectedImageCoverage) {
      if (selectedImageCoverage === 'with-images' && !product.image) return false;
      if (selectedImageCoverage === 'without-images' && product.image) return false;
    }
    
    // Brand filter (checkboxes - can select multiple)
    if (selectedBrands.length > 0) {
      const brandId = product.brand?.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (!brandId || !selectedBrands.includes(brandId)) return false;
    }
    
    // Note: Other filters (description coverage, discount, product catalog, GTIN, duplicates, venue overrides)
    // are not applied because we don't have corresponding data fields in the Product model
    
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedStatusFilters,
    selectedImageCoverage,
    selectedDescriptionCoverage,
    selectedDiscount,
    selectedProductCatalog,
    selectedGtin,
    selectedDuplicates,
    selectedBrands,
    selectedVenueOverrides,
  ]);

  // Scroll to top of table when page changes (skip if returning to page 1 from initial load)
  const previousPageRef = useRef<number>(1);
  
  useEffect(() => {
    // Only scroll if page actually changed (not initial render)
    if (previousPageRef.current !== currentPage && tableTopRef.current) {
      tableTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    previousPageRef.current = currentPage;
  }, [currentPage]);

  // Check if all products on current page are selected
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Toggle category collapse/expand
  const toggleCategoryCollapse = (category: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Simple drag and drop with real-time updates
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image showing the full row
    const draggedRow = e.currentTarget.closest('[data-row-id]') as HTMLElement;
    if (draggedRow) {
      const clone = draggedRow.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.top = '-9999px';
      clone.style.width = draggedRow.offsetWidth + 'px';
      clone.style.opacity = '1';
      clone.style.backgroundColor = tokens.semantic.colors.surface.raised;
      clone.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      clone.style.borderRadius = '8px';
      
      document.body.appendChild(clone);
      e.dataTransfer.setDragImage(clone, e.clientX - draggedRow.getBoundingClientRect().left, 24);
      
      setTimeout(() => {
        if (document.body.contains(clone)) {
          document.body.removeChild(clone);
        }
      }, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent, hoverIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === hoverIndex) return;

    // Update array in real-time (this is what makes it work!)
    setProductsData(prev => {
      const next = [...prev];
      const [moved] = next.splice(draggedIndex, 1);
      next.splice(hoverIndex, 0, moved);
      return next;
    });

    // Update the dragged index to the new position
    setDraggedIndex(hoverIndex);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handlePriceSave = (productId: string, newValue: string) => {
    if (!newValue.trim()) return;
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const priceAfter = `€ ${newValue.trim()}`;
    const priceBefore = product.price;

    if (doNotShowPriceModal) {
      setProductsData(prev =>
        prev.map(p => (p.id === productId ? { ...p, price: priceAfter } : p))
      );
      showToast('1 change successfully saved');
      setEditingPriceId(null);
    } else {
      setPriceModalData({
        productId,
        productName: product.name,
        productImage: product.image || productPlaceholder,
        priceBefore,
        priceAfter,
      });
      setPriceModalVisible(true);
    }
  };

  const handlePriceCancel = () => {
    setEditingPriceId(null);
  };

  const handlePriceModalConfirm = () => {
    if (priceModalData) {
      setProductsData(prev =>
        prev.map(p =>
          p.id === priceModalData.productId ? { ...p, price: priceModalData.priceAfter } : p
        )
      );
      showToast('1 change successfully saved');
      setPriceModalVisible(false);
      setPriceModalData(null);
      setEditingPriceId(null);
    }
  };

  const handlePriceModalCancel = () => {
    setPriceModalVisible(false);
    setPriceModalData(null);
    setEditingPriceId(null);
  };

  const handleDoNotShowAgainChange = (checked: boolean) => {
    setDoNotShowPriceModal(checked);
    localStorage.setItem('doNotShowPriceModal', checked.toString());
  };

  const handleNameSave = (productId: string, newValue: string) => {
    const trimmed = newValue.trim();
    if (!trimmed) return;

    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const nameBefore = product.name;
    const nameAfter = trimmed;

    if (doNotShowPriceModal) {
      setProductsData(prev => prev.map(p =>
        p.id === productId ? { ...p, name: nameAfter } : p
      ));
      showToast('1 change successfully saved');
      setEditingNameId(null);
    } else {
      setNameModalData({
        productId,
        productImage: product.image || productPlaceholder,
        nameBefore,
        nameAfter,
      });
      setNameModalVisible(true);
    }
  };

  const handleNameCancel = () => {
    setEditingNameId(null);
  };

  const handleNameModalConfirm = () => {
    if (nameModalData) {
      setProductsData(prev => prev.map(p =>
        p.id === nameModalData.productId ? { ...p, name: nameModalData.nameAfter } : p
      ));
      showToast('1 change successfully saved');
      setNameModalVisible(false);
      setNameModalData(null);
      setEditingNameId(null);
    }
  };

  const handleNameModalCancel = () => {
    setNameModalVisible(false);
    setNameModalData(null);
    setEditingNameId(null);
  };

  const handleStatusClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); // Don't trigger row click
    setEditingStatusId(productId);
  };

  const handleStatusChange = (productId: string, newStatus: 'Active' | 'Inactive') => {
    setProductsData(prev =>
      prev.map(p => (p.id === productId ? { ...p, status: newStatus } : p))
    );
    showToast('1 change successfully saved');
    setEditingStatusId(null);
    setHoveredStatusId(null);
  };

  const handleStatusCancel = () => {
    setEditingStatusId(null);
  };

  const COLLECTION_STATUS_OPTIONS: Array<'Active' | 'Inactive' | 'Scheduled'> = ['Active', 'Inactive', 'Scheduled'];

  const handleCollectionNameSave = (collectionId: string, newValue: string) => {
    const trimmed = newValue.trim();
    if (!trimmed) return;
    setCollectionsData((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, name: trimmed } : c))
    );
    showToast('1 change successfully saved');
    setEditingCollectionNameId(null);
  };

  const handleCollectionNameCancel = () => {
    setEditingCollectionNameId(null);
  };

  const handleCollectionStatusClick = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    setEditingCollectionStatusId(collectionId);
  };

  const handleCollectionStatusChange = (collectionId: string, newStatus: 'Active' | 'Inactive' | 'Scheduled') => {
    setCollectionsData((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, status: newStatus } : c))
    );
    showToast('1 change successfully saved');
    setEditingCollectionStatusId(null);
    setHoveredCollectionStatusId(null);
  };

  const handleCategoryClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setEditingCategoryId(productId);
  };

  const handleCategoryChange = (productId: string, newCategory: string) => {
    setProductsData((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, category: newCategory } : p))
    );
    showToast('1 change successfully saved');
    setEditingCategoryId(null);
    setHoveredCategoryId(null);
  };

  // Close dropdown when clicking outside (status and category)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (editingStatusId && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setEditingStatusId(null);
        setHoveredStatusId(null);
      }
      if (editingCategoryId && categoryDropdownRef.current && !categoryDropdownRef.current.contains(target)) {
        setEditingCategoryId(null);
        setHoveredCategoryId(null);
      }
      if (editingCollectionStatusId && collectionStatusDropdownRef.current && !collectionStatusDropdownRef.current.contains(target)) {
        setEditingCollectionStatusId(null);
        setHoveredCollectionStatusId(null);
      }
    };

    if (editingStatusId || editingCategoryId || editingCollectionStatusId) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [editingStatusId, editingCategoryId, editingCollectionStatusId]);

  // Close filter popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showFilterPopover && filterButtonRef.current) {
        const target = e.target as HTMLElement;
        // Check if click is outside the filter button, chip, and popovers
        const isOutsideButton = !filterButtonRef.current.contains(target);
        const isOutsideChip = !filterChipRef.current?.contains(target);
        const isOutsidePopover = !target.closest('[style*="position: absolute"]');
        
        if (isOutsideButton && isOutsideChip && isOutsidePopover) {
          setShowFilterPopover(false);
          setSelectedFilterParent(null);
        }
      }
    };

    if (showFilterPopover) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showFilterPopover]);

  // Track when chip ref becomes available (using useLayoutEffect to run after DOM updates)
  useEffect(() => {
    // Small delay to ensure ref is assigned after render
    const timer = setTimeout(() => {
      if (selectedFilterParent && filterChipRef.current) {
        setChipRefReady(true);
      } else {
        setChipRefReady(false);
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, [selectedFilterParent, showFilterPopover]);

  // Handle action menu button click
  const handleActionMenuClick = (menuType: 'header' | 'table', buttonElement: HTMLElement) => {
    const rect = buttonElement.getBoundingClientRect();
    setActionMenuPosition({
      top: rect.bottom + 8,
      left: rect.right - 160, // Position from right edge (menu width is ~160px)
    });
    setShowActionMenu(showActionMenu === menuType ? null : menuType);
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showActionMenu) {
        const target = e.target as HTMLElement;
        const isOutsideHeaderButton = !headerActionButtonRef.current?.contains(target);
        const isOutsideTableButton = !tableActionButtonRef.current?.contains(target);
        const isOutsideMenu = !target.closest('[style*="position: absolute"]') || 
                               !target.closest('div')?.textContent?.includes('Edit columns');
        
        if (isOutsideHeaderButton && isOutsideTableButton && isOutsideMenu) {
          setShowActionMenu(null);
        }
      }
    };

    if (showActionMenu) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showActionMenu]);

  // Handle edit columns modal
  const handleEditColumnsOpen = () => {
    setShowEditColumnsModal(true);
  };

  const handleEditColumnsSave = (updatedColumns: ColumnConfig[]) => {
    setColumnConfig(updatedColumns);
    setShowEditColumnsModal(false);
    // TODO: Persist column configuration or apply to table rendering
  };

  const handleEditColumnsCancel = () => {
    setShowEditColumnsModal(false);
  };

  // Action menu items
  const actionMenuItems: ActionMenuItem[] = [
    {
      id: 'edit-columns',
      label: 'Edit columns',
      icon: EditIconSvg,
      onClick: handleEditColumnsOpen,
    },
  ];

  const addProductMenuItems: ActionMenuItem[] = [
    {
      id: 'add-product',
      label: 'Add product',
      icon: PlusCircleSvg,
      onClick: () => navigate('/product/new', { state: { venue } }),
    },
    { id: 'add-via-file', label: 'Add via file', icon: DownloadSvg, onClick: () => {} },
    { id: 'qr-scanner', label: 'QR for scanner', icon: BarcodeViewfinderSvg, onClick: () => {} },
    { id: 'add-from-catalog', label: 'Add from catalog', icon: BookSvg, onClick: () => {} },
  ];

  const chatContext: ChatContext = {
    page: 'menu',
    products: fullProductsRef.current,
    fromOnboarding,
  };
  const chatBadgeCount = getBadgeCount(chatContext);

  const handleChatAction = useCallback((actionId: string) => {
    if (actionId === 'filter-no-image') {
      setProductsData((prev) => prev.filter((p) => !p.image));
    } else if (actionId === 'apply-all-allergens') {
      setProductsData((prev) =>
        prev.map((p) => {
          if (p.allergensDeclared) return p;
          return { ...p, allergensDeclared: true, allergens: p.allergens ?? [] };
        })
      );
    } else if (actionId === 'guide-allergens') {
      // Filter table to show only items missing allergen data
      setProductsData(fullProductsRef.current.filter((p) => !p.allergensDeclared));
    } else if (actionId === 'guide-apply-allergens') {
      // Apply allergen suggestions and restore full list
      const updated = fullProductsRef.current.map((p) => {
        if (p.allergensDeclared) return p;
        return { ...p, allergensDeclared: true, allergens: p.allergens ?? [] };
      });
      fullProductsRef.current = updated;
      setProductsData(updated);
    } else if (actionId === 'guide-images') {
      // Filter table to show only items missing images
      setProductsData(fullProductsRef.current.filter((p) => !p.image));
    } else if (actionId === 'guide-apply-matched-images') {
      // Apply matched images and restore full list
      const updated = fullProductsRef.current.map((p) => {
        if (p.image) return p;
        return { ...p, image: 'placeholder' };
      });
      fullProductsRef.current = updated;
      setProductsData(updated);
    } else if (actionId === 'navigate-home') {
      navigate('/', { state: { venue, menuDone: true } });
    }
  }, [navigate, venue]);

  return (
    <>
      {/* Responsive Grid Styles + spinner keyframes */}
      <style>
        {`
          @keyframes productListPageSpinner {
            to { transform: rotate(360deg); }
          }
          .product-grid-responsive {
            grid-template-columns: repeat(7, 1fr);
          }
          
          @media (max-width: 1739px) {
            .product-grid-responsive {
              grid-template-columns: repeat(6, 1fr);
            }
          }
          
          @media (max-width: 1499px) {
            .product-grid-responsive {
              grid-template-columns: repeat(5, 1fr);
            }
          }
          
          @media (max-width: 1439px) {
            .product-grid-responsive {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          
          @media (max-width: 1199px) {
            .product-grid-responsive {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          @media (max-width: 959px) {
            .product-grid-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 719px) {
            .product-grid-responsive {
              grid-template-columns: repeat(1, 1fr);
            }
          }

        `}
      </style>
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
        venueAvatarSrc={venue === 'NV' ? bobaBloomLogoSidebar : burgeramtLogoImage}
        venueAvatarAlt={venue === 'NV' ? 'Boba Bloom' : 'Burgeramt Prenzlauer Berg'}
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

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flex: '1',
          padding: '8px 8px 8px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
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
              display: 'flex',
              flexDirection: 'column',
              padding: '32px 48px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Breadcrumbs */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Breadcrumbs
                  items={[
                    { label: 'Home', href: '/' },
                    { label: venue === 'RX' ? 'Menu items' : 'Product list' },
                  ]}
                />

                {/* Title and Controls */}
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
                      alignItems: 'baseline',
                      gap: '12px',
                      flex: '1',
                    }}
                  >
                    <h1
                      style={{
                        margin: 0,
                        fontFamily: tokens.base.typography.fontFamily.brand,
                        fontSize: `${tokens.usage.typography.display.large.fontSize}px`,
                        fontWeight: tokens.usage.typography.display.large.fontWeight,
                        lineHeight: `${tokens.usage.typography.display.large.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.display.large.letterSpacing}px`,
                        color: '#202125',
                      }}
                    >
                      {venue === 'RX' ? 'Menu items' : 'Product list'}
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
                      Last updated: <span style={{ textDecoration: 'underline' }}>13:11, 12/10/2025</span>
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                    }}
                  >
                    <div ref={headerActionButtonRef} style={{ position: 'relative' }}>
                      <IconButton
                        icon={<MoreIcon color={tokens.semantic.colors.text.neutral} />}
                        aria-label="More options"
                        variant="ghost"
                        size="small"
                        onClick={() => {}}
                      />
                    </div>
                    <Button variant="secondary" icon={<EyeIcon color={tokens.semantic.colors.text.neutral} />}>
                      Preview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tabs: real counts for current venue (NV/RX) */}
              {(() => {
                const productCount = productsData.length;
                const categoryCount = new Set(productsData.map((p) => p.category)).size;
                const collectionCount = collectionsData.length;
                const formatCount = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                return (
              <Tab
                items={[
                      { label: venue === 'RX' ? 'Menus' : 'Collections', badge: formatCount(collectionCount) },
                      { label: 'Products', badge: formatCount(productCount) },
                      { label: 'Categories', badge: formatCount(categoryCount) },
                ]}
                activeIndex={activeTab}
                onTabChange={setActiveTab}
              />
                );
              })()}
            </div>
          </div>

          {/* Table Wrapper – hugs content (no min height); content disappears instantly on venue switch, appears after 1s with spinner */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flex: '0 0 auto',
              padding: '0 48px 48px',
            }}
          >
            {/* Centered spinner while content is delayed (1s after venue switch) */}
            {!contentRevealReady && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F8F8F8',
                  zIndex: 1,
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: `3px solid ${tokens.semantic.colors.border.subdued}`,
                    borderTopColor: tokens.colors.brand.bgFillBrand ?? tokens.semantic.colors.text.neutral,
                    borderRadius: '50%',
                    animation: 'productListPageSpinner 0.8s linear infinite',
                  }}
                />
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                opacity: contentRevealReady ? 1 : 0,
                transition: contentRevealReady ? 'opacity 0.2s ease' : 'none',
                pointerEvents: contentRevealReady ? 'auto' : 'none',
              }}
            >
              {activeTab === 0 ? (
                /* Collections view */
                <>
                  <div
                    ref={tableTopRef}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '24px 24px',
                      backgroundColor: tokens.semantic.colors.surface.raised,
                      borderTopLeftRadius: '32px',
                      borderTopRightRadius: '32px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}>
                      <ExpandableSearch
                        placeholder="Search collections..."
                        value={collectionSearchQuery}
                        onChange={setCollectionSearchQuery}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <IconButton
                        icon={<MoreIcon color={tokens.semantic.colors.text.neutral} />}
                        aria-label="More options"
                        variant="ghost"
                        size="small"
                        onClick={() => {}}
                      />
                      <SegmentedControl
                        options={[
                          {
                            value: 'list',
                            icon: (
                              <span style={{ color: tokens.semantic.colors.text.neutral, display: 'inline-flex' }}>
                                <MenuIcon />
                              </span>
                            ),
                            label: 'List view',
                          },
                          {
                            value: 'grid',
                            icon: (
                              <span style={{ color: tokens.semantic.colors.text.neutral, display: 'inline-flex' }}>
                                <GridIcon />
                              </span>
                            ),
                            label: 'Grid view',
                          },
                        ]}
                        value={viewMode}
                        onChange={setViewMode}
                      />
                      <ActionMenu
                        trigger={
                          <Button variant="primary" icon={<AddIcon />}>
                            Add
                          </Button>
                        }
                        items={addProductMenuItems}
                        menuWidth={167}
                        alignMenu="right"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      alignSelf: 'stretch',
                      padding: '14px 24px',
                      backgroundColor: tokens.semantic.colors.surface.raised,
                    }}
                  >
                    <div
                      style={{
                        flex: '1',
                        fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                        fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                        fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                        lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                        letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                        color: tokens.semantic.colors.text.subdued,
                      }}
                    >
                      {filteredCollections.length} result{filteredCollections.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                    {viewMode === 'list' ? (
                      <DataTable<Collection>
                        columns={[
                          { id: 'name', label: 'Name', widthRatio: 1.3 },
                          { id: 'products', label: 'Products', widthRatio: 1 },
                          { id: 'availability', label: 'Availability', widthRatio: 1 },
                          { id: 'status', label: 'Status', widthRatio: 1 },
                        ]}
                        rows={filteredCollections}
                        getRowId={(c) => c.id}
                        renderHeader={renderColumnHeader}
                        hover={{
                          hoveredRowId: hoveredCollectionRowId,
                          onRowHover: setHoveredCollectionRowId,
                        }}
                        onBodyMouseMove={(e) => {
                          const el = (e.target as Element).closest?.(
                            '[data-in-cell-select][data-product-id][data-cell-type]'
                          );
                          if (el) {
                            const id = el.getAttribute('data-product-id');
                            const type = el.getAttribute('data-cell-type');
                            if (type === 'status') setHoveredCollectionStatusId(id);
                          } else {
                            setHoveredCollectionStatusId(null);
                          }
                        }}
                        onBodyMouseLeave={() => setHoveredCollectionStatusId(null)}
                        renderCell={(columnId, row) => {
                          if (columnId === 'name') {
                            return (
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '8px',
                                  alignItems: 'center',
                                  minHeight: '48px',
                                  padding: '4px 12px',
                                  borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '28px',
                                    minHeight: '28px',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: `${tokens.usage.borderRadius.small}px`,
                                    backgroundColor: tokens.semantic.colors.surface.raised,
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                  }}
                                >
                                  {row.image ? (
                                    <img
                                      src={row.image}
                                      alt={row.name}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  ) : (
                                    <div style={{ width: '16px', height: '16px', opacity: 0.24 }} />
                                  )}
                                </div>
                                <EditableCell
                                  value={row.name}
                                  isEditing={editingCollectionNameId === row.id}
                                  onEditRequest={() => setEditingCollectionNameId(row.id)}
                                  onSave={(v) => handleCollectionNameSave(row.id, v)}
                                  onCancel={handleCollectionNameCancel}
                                  hasChange={(draft, original) => draft.trim() !== original.trim()}
                                  variant="label.small.strong"
                                  stopPropagation
                                />
                              </div>
                            );
                          }
                          if (columnId === 'products') {
                            return (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  minHeight: '48px',
                                  padding: '4px 12px',
                                  borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
                                  fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                                  fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                                  fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                                  lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                                  letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                                  color: tokens.semantic.colors.text.neutral,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {row.itemCount}
                              </div>
                            );
                          }
                          if (columnId === 'availability') {
                            return (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  minHeight: '48px',
                                  padding: '4px 12px',
                                  borderBottom: `1px solid ${tokens.semantic.colors.border.table}`,
                                  fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                                  fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                                  fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                                  lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                                  letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                                  color: tokens.semantic.colors.text.neutral,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {row.availability}
                              </div>
                            );
                          }
                          if (columnId === 'status') {
                            return (
                              <InCellSelect
                                key="status"
                                value={row.status}
                                options={COLLECTION_STATUS_OPTIONS}
                                onChange={(newStatus) =>
                                  handleCollectionStatusChange(row.id, newStatus as 'Active' | 'Inactive' | 'Scheduled')
                                }
                                isHovered={hoveredCollectionStatusId === row.id}
                                isEditing={editingCollectionStatusId === row.id}
                                onHover={() => setHoveredCollectionStatusId(row.id)}
                                onHoverLeave={() => {
                                  if (editingCollectionStatusId !== row.id) {
                                    setHoveredCollectionStatusId(null);
                                  }
                                }}
                                onEditRequest={(e) => handleCollectionStatusClick(e, row.id)}
                                onClose={() => {
                                  setEditingCollectionStatusId(null);
                                  setHoveredCollectionStatusId(null);
                                }}
                                dropdownRef={editingCollectionStatusId === row.id ? collectionStatusDropdownRef : undefined}
                                cellProductId={row.id}
                                cellType="status"
                                renderValue={(status) => {
                                  const tagStyle =
                                    status === 'Active' ? 'positive' : status === 'Inactive' ? 'negative' : 'neutral';
                                  const tagIcon =
                                    status === 'Active' ? (
                                      <ActiveIcon color="#327A34" />
                                    ) : status === 'Inactive' ? (
                                      <InactiveIcon color="#C83527" />
                                    ) : undefined;
                                  return (
                                    <Tag style={tagStyle} icon={tagIcon}>
                                      {status}
                                    </Tag>
                                  );
                                }}
                              />
                            );
                          }
                          return null;
                        }}
                        selection={{
                          selectedIds: selectedCollections,
                          onToggle: (id) => {
                            setSelectedCollections((prev) =>
                              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                            );
                          },
                          onToggleAll: (checked) => {
                            if (checked) {
                              setSelectedCollections(filteredCollections.map((c) => c.id));
                            } else {
                              setSelectedCollections([]);
                            }
                          },
                        }}
                        borderBottomRadius="32px"
                        defaultActionsIcon={<MoreIcon color={tokens.semantic.colors.text.neutral} />}
                        defaultActionsAriaLabel="More actions"
                      />
                    ) : (
                      <div
                        style={{
                          padding: '24px',
                          backgroundColor: tokens.semantic.colors.surface.raised,
                          borderBottomLeftRadius: '32px',
                          borderBottomRightRadius: '32px',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                          gap: '16px',
                        }}
                      >
                        {filteredCollections.map((col) => {
                          const statusTagStyle =
                            col.status === 'Active' ? 'positive' : col.status === 'Inactive' ? 'negative' : 'neutral';
                          const storeCount = col.storeCount ?? 1;
                          const storeLabel = `${storeCount} store${storeCount !== 1 ? 's' : ''}`;
                          const revenue =
                            col.status === 'Scheduled'
                              ? '€ 0.00'
                              : (() => {
                                  const seed = col.id.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
                                  const cents = 1000 + (seed % 49000);
                                  return `€ ${(cents / 100).toFixed(2)}`;
                                })();
                          const labelColor = tokens.semantic.colors.text.subdued;
                          return (
                            <ImageCard
                              key={col.id}
                              title={col.name}
                              image={col.image}
                              statusTag={
                                <Tag size="small" style={statusTagStyle}>
                                  {col.status}
                                </Tag>
                              }
                              labelLines={[
                                { icon: <DealsLineIcon color={labelColor} />, text: `${col.itemCount} product${col.itemCount !== 1 ? 's' : ''}` },
                                { icon: <TimeLineIcon color={labelColor} />, text: col.availability },
                                { icon: <DashmartLineIcon color={labelColor} />, text: storeLabel },
                                { icon: <LineChartLineIcon color={labelColor} />, text: revenue },
                              ]}
                              onClick={() => {}}
                              onMoreClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              ) : activeTab === 1 ? (
                <>
              {/* Table Header with Search */}
              <div
                ref={tableTopRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px 24px',
                  backgroundColor: tokens.semantic.colors.surface.raised,
                  borderTopLeftRadius: '32px',
                  borderTopRightRadius: '32px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <ExpandableSearch 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                  <div ref={filterButtonRef} style={{ position: 'relative' }}>
                    <IconButton
                      icon={<FunnelIcon color={tokens.semantic.colors.text.neutral} />}
                      aria-label="Filter"
                      variant="tertiary"
                      size="small"
                      onClick={() => setShowFilterPopover(!showFilterPopover)}
                    />
                  </div>

                  {/* Filter Chips - show chips for filters with selections OR currently editing */}
                  {(() => {
                    const activeFilters = getActiveFilters();
                    const filtersToShow = selectedFilterParent && !activeFilters.includes(selectedFilterParent)
                      ? [...activeFilters, selectedFilterParent]
                      : activeFilters;
                    
                    if (filtersToShow.length === 0) return null;
                    
                    return (
                      <div
                        style={{
                          display: 'flex',
                          gap: `${tokens.usage.spacing.xxSmall}px`,
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        {filtersToShow.map((filterKey) => (
                          <div 
                            key={filterKey}
                            ref={filterKey === selectedFilterParent ? filterChipRef : null}
                          >
                            <FilterChip
                              label={getFilterChipLabel(filterKey)}
                              onRemove={() => handleRemoveFilter(filterKey)}
                              onClick={() => {
                                // If clicking the currently selected filter, close it
                                if (selectedFilterParent === filterKey) {
                                  setShowFilterPopover(false);
                                  setSelectedFilterParent(null);
                                } else {
                                  // Otherwise, open this filter for editing
                                  setShowFilterPopover(true);
                                  setSelectedFilterParent(filterKey);
                                }
                              }}
                              isFocused={filterKey === selectedFilterParent}
                              hasSelections={hasFilterSelection(filterKey)}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <div ref={tableActionButtonRef} style={{ position: 'relative' }}>
                    <IconButton
                      icon={<MoreIcon color={tokens.semantic.colors.text.neutral} />}
                      aria-label="More options"
                      variant="ghost"
                      size="small"
                      onClick={() => {
                        if (tableActionButtonRef.current) {
                          handleActionMenuClick('table', tableActionButtonRef.current);
                        }
                      }}
                    />
                  </div>
                  <SegmentedControl
                    options={[
                      {
                        value: 'list',
                        icon: (
                          <span style={{ color: tokens.semantic.colors.text.neutral, display: 'inline-flex' }}>
                            <MenuIcon />
                          </span>
                        ),
                        label: 'List view',
                      },
                      {
                        value: 'grid',
                        icon: (
                          <span style={{ color: tokens.semantic.colors.text.neutral, display: 'inline-flex' }}>
                            <GridIcon />
                          </span>
                        ),
                        label: 'Grid view',
                      },
                    ]}
                    value={viewMode}
                    onChange={setViewMode}
                  />
                  <ActionMenu
                    trigger={
                      <Button variant="primary" icon={<AddIcon />}>
                        Add
                      </Button>
                    }
                    items={addProductMenuItems}
                    menuWidth={167}
                    alignMenu="right"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'stretch',
                  padding: '14px 24px',
                  backgroundColor: tokens.semantic.colors.surface.raised,
                }}
              >
                <div
                  style={{
                    flex: '1',
                    fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                    fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                    fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                    lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                    letterSpacing: `${tokens.usage.typography.label.small.default.letterSpacing}px`,
                    color: tokens.semantic.colors.text.subdued,
                  }}
                >
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Table/grid */}
              <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {viewMode === 'list' ? (
                <>
              {/* Reusable DataTable: columns from config, cell/header content from render props */}
              <DataTable<Product>
                columns={visibleColumns.map((c) => ({
                  id: c.id,
                  label: c.label,
                  widthRatio: c.id === 'name' ? 1.3 : 1,
                }))}
                rows={paginatedProducts}
                getRowId={(p) => p.id}
                renderCell={(columnId, product) => {
                  // Reuse same status cell pattern as collections table (inline so row is always current)
                  if (columnId === 'status') {
                    return (
                      <InCellSelect
                        key="status"
                        value={product.status}
                        options={STATUS_OPTIONS}
                        onChange={(newStatus) =>
                          handleStatusChange(product.id, newStatus as 'Active' | 'Inactive')
                        }
                        isHovered={hoveredStatusId === product.id}
                        isEditing={editingStatusId === product.id}
                        onHover={() => setHoveredStatusId(product.id)}
                        onHoverLeave={() => {
                          if (editingStatusId !== product.id) setHoveredStatusId(null);
                        }}
                        onEditRequest={(e) => handleStatusClick(e, product.id)}
                        onClose={() => {
                          setEditingStatusId(null);
                          setHoveredStatusId(null);
                        }}
                        dropdownRef={editingStatusId === product.id ? dropdownRef : undefined}
                        cellProductId={product.id}
                        cellType="status"
                        renderValue={(status) => {
                          const tagStyle =
                            status === 'Active' ? 'positive' : 'negative';
                          const tagIcon =
                            status === 'Active' ? (
                              <ActiveIcon color="#327A34" />
                            ) : (
                              <InactiveIcon color="#C83527" />
                            );
                          return (
                            <Tag style={tagStyle} icon={tagIcon}>
                              {status}
                            </Tag>
                          );
                        }}
                      />
                    );
                  }
                  return renderColumnCell(columnId, product);
                }}
                renderHeader={renderColumnHeader}
                onRowClick={(product) =>
                  navigate(`/product/${product.id}`, { state: { venue } })
                }
                selection={{
                  selectedIds: selectedProducts,
                  onToggle: toggleSelectProduct,
                  onToggleAll: (checked) => {
                    if (checked) {
                      setSelectedProducts((prev) =>
                        Array.from(new Set([...prev, ...paginatedProducts.map((p) => p.id)]))
                      );
                    } else {
                      setSelectedProducts((prev) =>
                        prev.filter((id) => !paginatedProducts.some((p) => p.id === id))
                      );
                    }
                  },
                }}
                dragDrop={
                  venue === 'RX'
                    ? {
                  onDragStart: handleDragStart,
                  onDragOver: handleDragOver,
                  onDragEnd: handleDragEnd,
                  draggedIndex,
                  getRowIndex: (row) => filteredProducts.findIndex((p) => p.id === row.id),
                      }
                    : undefined
                }
                hover={{
                  hoveredRowId: hoveredRow,
                  onRowHover: setHoveredRow,
                }}
                onBodyMouseMove={(e) => {
                  const el = (e.target as Element).closest?.(
                    '[data-in-cell-select][data-product-id][data-cell-type]'
                  );
                  if (el) {
                    const id = el.getAttribute('data-product-id');
                    const type = el.getAttribute('data-cell-type');
                    if (type === 'category') setHoveredCategoryId(id);
                    else if (type === 'status') setHoveredStatusId(id);
                  } else {
                    setHoveredCategoryId(null);
                    setHoveredStatusId(null);
                  }
                }}
                onBodyMouseLeave={() => {
                  setHoveredCategoryId(null);
                  setHoveredStatusId(null);
                }}
                borderBottomRadius={
                  filteredProducts.length <= ITEMS_PER_PAGE ? '32px' : '0px'
                }
                renderDragHandle={
                  venue === 'RX'
                    ? () => (
                  <img
                    src={DragHandleIcon}
                    alt="Drag handle"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                    draggable={false}
                  />
                      )
                    : undefined
                }
                defaultActionsIcon={
                  <MoreIcon color={tokens.semantic.colors.text.neutral} />
                }
                defaultActionsAriaLabel="More actions"
              />

              {/* Pagination Bottom - only show if more than 50 items */}
              {filteredProducts.length > ITEMS_PER_PAGE && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 24px',
                    backgroundColor: tokens.semantic.colors.surface.raised,
                    borderBottomLeftRadius: '32px',
                    borderBottomRightRadius: '32px',
                  }}
                >
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    resultsText={`${startIndex + 1}–${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length}`}
                  />
                </div>
              )}
                </>
              ) : (
                /* Grid view */
                <div
                  style={{
                    padding: '24px',
                    backgroundColor: tokens.semantic.colors.surface.raised,
                    borderBottomLeftRadius: '32px',
                    borderBottomRightRadius: '32px',
                  }}
                >
                  {/* Group products by category */}
                  {(() => {
                    const groupedProducts: Record<string, typeof filteredProducts> = {};
                    filteredProducts.forEach(product => {
                      if (!groupedProducts[product.category]) {
                        groupedProducts[product.category] = [];
                      }
                      groupedProducts[product.category].push(product);
                    });

                    return Object.entries(groupedProducts).map(([category, products]) => (
                      <div key={category} style={{ marginBottom: '32px' }}>
                        {/* Category Header */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '16px',
                            cursor: 'pointer',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <Checkbox
                              checked={products.every(p => selectedProducts.includes(p.id))}
                              indeterminate={
                                products.some(p => selectedProducts.includes(p.id)) &&
                                !products.every(p => selectedProducts.includes(p.id))
                              }
                              onChange={() => {
                                const allSelected = products.every(p => selectedProducts.includes(p.id));
                                if (allSelected) {
                                  setSelectedProducts(prev =>
                                    prev.filter(id => !products.find(p => p.id === id))
                                  );
                                } else {
                                  setSelectedProducts(prev => [
                                    ...prev,
                                    ...products.filter(p => !prev.includes(p.id)).map(p => p.id),
                                  ]);
                                }
                              }}
                            />
                            <span
                              style={{
                                fontFamily: tokens.usage.typography.label.small.strong.fontFamily,
                                fontSize: `${tokens.usage.typography.label.small.strong.fontSize}px`,
                                fontWeight: tokens.usage.typography.label.small.strong.fontWeight,
                                lineHeight: `${tokens.usage.typography.label.small.strong.lineHeight}px`,
                                color: tokens.semantic.colors.text.neutral,
                              }}
                            >
                              {category}
                            </span>
                            <span
                              style={{
                                fontFamily: tokens.usage.typography.label.small.default.fontFamily,
                                fontSize: `${tokens.usage.typography.label.small.default.fontSize}px`,
                                fontWeight: tokens.usage.typography.label.small.default.fontWeight,
                                lineHeight: `${tokens.usage.typography.label.small.default.lineHeight}px`,
                                color: tokens.semantic.colors.text.subdued,
                              }}
                            >
                              {products.length} item{products.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategoryCollapse(category);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '28px',
                              height: '28px',
                              borderRadius: '9999px',
                              backgroundColor: tokens.semantic.colors.surface.default,
                              cursor: 'pointer',
                            }}
                          >
                            <div
                              style={{ 
                                transition: 'transform 0.2s ease',
                                transform: collapsedCategories.has(category) ? 'rotate(0deg)' : 'rotate(180deg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <ChevronDownIcon color={tokens.semantic.colors.text.subdued} />
                            </div>
                          </div>
                        </div>

                        {/* Product Grid - conditionally rendered */}
                        {!collapsedCategories.has(category) && (
                          <div
                            className="product-grid-responsive"
                            style={{
                              display: 'grid',
                              gap: '16px',
                            }}
                          >
                            {products.map(product => (
                              <ProductCard
                              key={product.id}
                              id={product.id}
                              name={product.name}
                              price={product.price}
                              image={product.image}
                              selected={selectedProducts.includes(product.id)}
                              onToggleSelect={toggleSelectProduct}
                              onClick={() => console.log('Product clicked:', product.id)}
                              onMoreClick={(e) => {
                                // Handle more menu click
                                console.log('More clicked for product:', product.id);
                              }}
                            />
                          ))}
                          </div>
                        )}
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
                </>
              ) : (
                <div
                  style={{
                    padding: '48px',
                    fontFamily: tokens.usage.typography.body.small.default.fontFamily,
                    fontSize: `${tokens.usage.typography.body.small.default.fontSize}px`,
                    color: tokens.semantic.colors.text.subdued,
                  }}
                >
                  Categories view – coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast notification */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
        duration={2500}
      />

      {/* Action bar */}
      <ActionBar
        selectedCount={selectedProducts.length}
        visible={selectedProducts.length > 0}
        onCancel={() => setSelectedProducts([])}
        onEdit={() => console.log('Edit clicked')}
        onMore={() => console.log('More clicked')}
      />

      {/* Price change confirmation modal */}
      {priceModalData && (
        <PriceChangeModal
          isOpen={priceModalVisible}
          onClose={handlePriceModalCancel}
          onConfirm={handlePriceModalConfirm}
          productName={priceModalData.productName}
          productImage={priceModalData.productImage}
          priceBefore={priceModalData.priceBefore}
          priceAfter={priceModalData.priceAfter}
          doNotShowAgain={doNotShowPriceModal}
          onDoNotShowAgainChange={handleDoNotShowAgainChange}
        />
      )}

      {/* Name change confirmation modal (shared "Do not show again" with price) */}
      {nameModalData && (
        <NameChangeModal
          isOpen={nameModalVisible}
          onClose={handleNameModalCancel}
          onConfirm={handleNameModalConfirm}
          productImage={nameModalData.productImage}
          nameBefore={nameModalData.nameBefore}
          nameAfter={nameModalData.nameAfter}
          doNotShowAgain={doNotShowPriceModal}
          onDoNotShowAgainChange={handleDoNotShowAgainChange}
        />
      )}

      {/* Filter Popover */}
      {showFilterPopover && filterButtonRef.current && (
        <>
          {/* Parent filter popover - only show when no parent is selected */}
          {!selectedFilterParent && (
            <Popover
              template="single-select"
              items={filterParentItems}
              position={{
                top: filterButtonRef.current.getBoundingClientRect().bottom + 8,
                left: filterButtonRef.current.getBoundingClientRect().left,
              }}
            />
          )}

          {/* Child popover - show below the chip when parent is selected */}
          {selectedFilterParent && chipRefReady && filterChipRef.current && (() => {
            // Always position below the chip, left-aligned
            const chipRect = filterChipRef.current.getBoundingClientRect();
            
            return (
              <Popover
                template={getTemplateType()}
                items={getChildItems()}
                onItemChange={handleChildItemChange}
                radioGroupName={selectedFilterParent ? `${selectedFilterParent}-radio-group` : undefined}
                position={{
                  top: chipRect.bottom + 8,
                  left: chipRect.left,
                }}
              />
            );
          })()}
        </>
      )}

      {/* Action Menu */}
      {showActionMenu && (
        <ActionMenu
          items={actionMenuItems}
          position={actionMenuPosition}
          onClose={() => setShowActionMenu(null)}
        />
      )}

      {/* Edit Columns Modal */}
      <EditColumnsModal
        visible={showEditColumnsModal}
        columns={columnConfig}
        onSave={handleEditColumnsSave}
        onCancel={handleEditColumnsCancel}
      />
    </div>

    </>
  );
};
