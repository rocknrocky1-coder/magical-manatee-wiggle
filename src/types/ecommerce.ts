export type ProductCategory = 
  | 'kurtis'
  | 'coord-sets'
  | 'mul-cotton-sarees'
  | 'printed-sarees'
  | 'festive-edits'
  | 'daily-wear';

export type ProductFabric = 
  | 'Pure Mul Cotton'
  | 'Chanderi Silk'
  | 'Cotton Silk'
  | 'Modal Silk'
  | 'Linen Cotton'
  | 'Georgette'
  | 'Organza';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size';

export interface ProductVariant {
  id: string;
  productId: string;
  size: ProductSize;
  colorName: string;
  colorHex: string;
  sku: string;
  barcode: string;
  mrp: number;
  sellingPrice: number;
  costPrice: number;
  stock: number;
  reservedStock: number;
  lowStockThreshold: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  fabric: ProductFabric;
  pattern: string;
  craftDetails?: string;
  description: string;
  specifications: {
    fit: string;
    length: string;
    weave?: string;
    neckline?: string;
    sleeve?: string;
    lining?: string;
    blousePiece?: string;
    transparency?: string;
  };
  careInstructions: string[];
  images: string[];
  videoUrl?: string;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  gstRate: number; // e.g. 5 for apparel < 1000 or 12 for > 1000
  hsnCode: string;
  variants: ProductVariant[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // cart item unique id
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  applicableCategories?: ProductCategory[];
  expiresAt: string;
  isActive: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type: 'home' | 'work' | 'other';
}

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED'
  | 'EXCHANGE_REQUESTED'<dyad-write path="src/types/ecommerce.ts" description="Comprehensive TypeScript interfaces for products, variants, inventory, orders, returns, and customers">
export type ProductCategory = 
  | 'kurtis'
  | 'coord-sets'
  | 'mul-cotton-sarees'
  | 'printed-sarees'
  | 'festive-edits'
  | 'daily-wear';

export type ProductFabric = 
  | 'Pure Mul Cotton'
  | 'Chanderi Silk'
  | 'Cotton Silk'
  | 'Modal Silk'
  | 'Linen Cotton'
  | 'Georgette'
  | 'Organza';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size';

export interface ProductVariant {
  id: string;
  productId: string;
  size: ProductSize;
  colorName: string;
  colorHex: string;
  sku: string;
  barcode: string;
  mrp: number;
  sellingPrice: number;
  costPrice: number;
  stock: number;
  reservedStock: number;
  lowStockThreshold: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  fabric: ProductFabric;
  pattern: string;
  craftDetails?: string;
  description: string;
  specifications: {
    fit: string;
    length: string;
    weave?: string;
    neckline?: string;
    sleeve?: string;
    lining?: string;
    blousePiece?: string;
    transparency?: string;
  };
  careInstructions: string[];
  images: string[];
  videoUrl?: string;
  mrp: number;
  sellingPrice: number;
  discountPercentage: number;
  gstRate: number; // e.g. 5 for apparel < 1000 or 12 for > 1000
  hsnCode: string;
  variants: ProductVariant[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  applicableCategories?: ProductCategory[];
  expiresAt: string;
  isActive: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type: 'home' | 'work' | 'other';
}

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED'
  | 'EXCHANGE_REQUESTED'
  | 'EXCHANGED';

export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'COD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  productId: string;
  variantId: string;
  productName: string;
  size: ProductSize;
  colorName: string;
  sku: string;
  barcode: string;
  unitPrice: number;
  mrp: number;
  quantity: number;
  gstAmount: number;
  total: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  couponDiscount: number;
  couponCode?: string;
  gstAmount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  shippingProvider?: string;
  createdAt: string;
  timeline: {
    status: string;
    timestamp: string;
    note: string;
  }[];
  returnReason?: string;
  exchangeReason?: string;
}

export interface InventoryLog {
  id: string;
  variantId: string;
  sku: string;
  productName: string;
  changeType: 'RESTOCK' | 'ORDER_PLACED' | 'ORDER_CANCELLED' | 'RETURN_RESTOCK' | 'MANUAL_ADJUSTMENT';
  quantityChange: number;
  previousStock: number;
  newStock: number;
  timestamp: string;
  performedBy: string;
  note?: string;
}

export interface UserReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  date: string;
  images?: string[];
}