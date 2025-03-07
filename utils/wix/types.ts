// utils/wix/types.ts

// Shared media types
interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Image {
  url: string;
  width: number;
  height: number;
}

interface MainMedia {
  thumbnail: Thumbnail;
  mediaType: string;
  title: string;
  image: Image;
  _id: string;
}

interface MediaItem {
  thumbnail: Thumbnail;
  mediaType: string;
  title: string;
  image: Image;
  _id: string;
}

interface Media {
  mainMedia: MainMedia;
  items: MediaItem[];
}

// Price related types
interface FormattedPrice {
  price: string;
  discountedPrice: string;
}

interface PriceData {
  currency: string;
  price: number;
  discountedPrice?: number;
  formatted: FormattedPrice;
}

// Stock types
interface VariantStock {
  trackQuantity: boolean;
  quantity: number;
  inStock: boolean;
}

interface ProductStock {
  trackInventory: boolean;
  inStock: boolean;
  inventoryStatus: string;
}

// Range types
interface ValueRange {
  minValue: number;
  maxValue: number;
}

// Product Option types
interface ProductOptionChoice {
  value: string;
  description: string;
  media: Media;
  inStock: boolean;
  visible: boolean;
}

interface ProductOption {
  optionType: string;
  name: string;
  choices: ProductOptionChoice[];
}

// Main interfaces
export interface Variant {
  choices: Record<string, string>;
  variant: {
    priceData: PriceData;
    convertedPriceData: PriceData;
    weight: number;
    sku: string;
    visible: boolean;
  };
  stock: VariantStock;
  _id: string;
}

export interface Product {
  name: string;
  slug: string;
  visible: boolean;
  productType: string;
  description: string;
  weightRange: ValueRange;
  stock: ProductStock;
  price: PriceData;
  priceData: PriceData;
  convertedPriceData: PriceData;
  priceRange: ValueRange;
  costRange: ValueRange;
  additionalInfoSections: string[];
  ribbons: string[];
  media: Media;
  customTextFields: string[];
  manageVariants: boolean;
  productOptions: ProductOption[];
  productPageUrl: {
    base: string;
    path: string;
  };
  numericId: string;
  inventoryItemId: string;
  discount: {
    type: string;
    value: number;
  };
  collectionIds: string[];
  variants: Variant[];
  lastUpdated: string;
  ribbon: string;
  exportProductId: string;
  _id: string;
  _createdDate: string;
}

export interface Collection {
  name: string;
  media: Media;
  numberOfProducts: number;
  description: string;
  slug: string;
  visible: boolean;
  _id: string;
}