export type ProductCategory = 'kurtis' | 'coord-sets' | 'mul-cotton-sarees' | 'printed-sarees';

export type ProductFabric = 
  | 'Mul Cotton' 
  | 'Chanderi Silk' 
  | 'Modal Silk' 
  | 'Pure Cotton' 
  | 'Georgette' 
  | 'Linen Cotton' 
  | 'Organza';

export type ProductPattern = 
  | 'Ajrakh Handblock' 
  | 'Bagru Block Print' 
  | 'Floral Kalamkari' 
  | 'Sanganeri Print' 
  | 'Solid with Zari' 
  | 'Geometric Shibori' 
  | 'Ikat Weave';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | 'Free Size';

export interface ProductVariant {
  id: string;
  sku: string;
  barcode: string;
  size: ProductSize;
  colorName: string;
  colorHex: string;
  mrp: number;
  sellingPrice: number;
  costPrice?: number;
  inventory: number;
  reservedInventory: number;
  lowStockThreshold: number;
  image?: string;
  weightGrams?: number;
}

export interface ProductSpecification {
  fabric: ProductFabric;
  weave?: string;
  pattern: ProductPattern;
  neckline?: string;
  sleeveLength?: string;
  sareeLengthMeters?: number;
  blousePieceIncluded?: boolean;
  craftTechnique?: string;
  careInstructions: string[];
  originState?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  titleTag?: string;
  metaDescription?: string;
  category: ProductCategory;
  subCategory?: string;
  description: string;
  specifications: ProductSpecification;
  images: string[];
  videoUrl?: string;
  variants: ProductVariant[];
  baseMrp: number;
  baseSellingPrice: number;
  gstPercentage: number; // e.g. 5 or 12
  isNewArrival: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  isReturnable: boolean;
  isExchangeable: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // unique item id (productId + variantId)
  productId: string;
  variantId: string;
  productName: string;
  productSlug: string;
  category: ProductCategory;
  image: string;
  size: ProductSize;
  colorName: string;
  colorHex: string;
  sku: string;
  barcode: string;
  mrp: number;
  price: number;
  quantity: number;
  gstPercentage: number;
  maxStock: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  applicableCategory?: ProductCategory | 'all';
  firstOrderOnly?: boolean;
  expiresAt: string;
  isActive: boolean;
  usageCount: number;
}

export type OrderStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled'
  | 'return_requested'
  | 'returned';

export type PaymentMethod = 'razorpay' | 'cod' | 'upi' | 'card' | 'netbanking';
export type PaymentStatus = 'pending' | 'captured' | 'failed' | 'refunded';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'home' | 'work' | 'other';
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  productName: string;
  productSlug: string;
  image: string;
  size: ProductSize;
  colorName: string;
  sku: string;
  barcode: string;
  quantity: number;
  unitPrice: number;
  unitMrp: number;
  gstPercentage: number;
  total: number;
}

export interface OrderTimeline {
  status: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  couponDiscount: number;
  couponCode?: string;
  gstTotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  orderStatus: OrderStatus;
  awbNumber?: string;
  courierPartner?: string;
  trackingUrl?: string;
  timeline: OrderTimeline[];
  createdAt: string;
  estimatedDelivery: string;
  internalNotes?: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: 'return' | 'exchange';
  items: {
    productId: string;
    variantId: string;
    productName: string;
    size: ProductSize;
    quantity: number;
    reason: string;
    targetExchangeSize?: ProductSize;
  }[];
  reasonDetail: string;
  refundPreference: 'store_credit' | 'source_account';
  status: 'pending' | 'approved' | 'pickup_scheduled' | 'received' | 'completed' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  defaultGstRate: number;
  enableCod: boolean;
  enableReturns: boolean;
  enableExchanges: boolean;
  returnWindowDays: number;
  exchangeWindowDays: number;
  announcementText: string;
  announcementActive: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'catalog_manager' | 'inventory_manager' | 'order_manager' | 'support';
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedAddresses: ShippingAddress[];
  createdAt: string;
}