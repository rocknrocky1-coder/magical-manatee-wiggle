export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'COD' | 'RAZORPAY' | 'UPI' | 'CARD';
export type OrderStatus =
	| 'CONFIRMED'
	| 'PROCESSING'
	| 'SHIPPED'
	| 'DELIVERED'
	| 'CANCELLED'
	| 'RETURN_REQUESTED'
	| 'EXCHANGE_REQUESTED'
	| 'RETURNED'
	| 'REFUNDED';

export interface ProductVariant {
	id: string;
	productId: string;
	size: string;
	colorName: string;
	colorHex: string;
	sku: string;
	barcode?: string;
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
	category: string;
	subcategory: string;
	fabric: string;
	pattern: string;
	craftDetails: string;
	description: string;
	specifications: Record<string, string>;
	careInstructions: string[];
	images: string[];
	mrp: number;
	sellingPrice: number;
	discountPercentage: number;
	gstRate: number;
	hsnCode: string;
	isNewArrival: boolean;
	isBestSeller: boolean;
	isFeatured: boolean;
	isPublished: boolean;
	rating: number;
	reviewCount: number;
	tags: string[];
	seoTitle: string;
	seoDescription: string;
	createdAt: string;
	updatedAt: string;
	variants: ProductVariant[];
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
	isActive: boolean;
	validFrom: string;
	validUntil: string;
	usageLimit?: number;
	usedCount?: number;
}

export interface Address {
	id: string;
	name: string;
	phone: string;
	addressLine1: string;
	addressLine2?: string;
	city: string;
	state: string;
	pincode: string;
	isDefault?: boolean;
	type: 'home' | 'work' | 'other';
}

export interface OrderItem {
	productId: string;
	variantId: string;
	productName: string;
	size: string;
	colorName: string;
	sku: string;
	barcode?: string;
	unitPrice: number;
	mrp: number;
	quantity: number;
	gstAmount: number;
	total: number;
	image: string;
}

export interface OrderTimelineEntry {
	status: OrderStatus;
	timestamp: string;
	note?: string;
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
	returnReason?: string;
	exchangeReason?: string;
	createdAt: string;
	timeline: OrderTimelineEntry[];
}

export interface InventoryLog {
	id: string;
	variantId: string;
	sku: string;
	productName: string;
	changeType: 'ORDER_PLACED' | 'MANUAL_ADJUSTMENT';
	quantityChange: number;
	previousStock: number;
	newStock: number;
	timestamp: string;
	performedBy: string;
	note?: string;
}

export interface UserReview {
	id: string;
	productId?: string;
	userName: string;
	rating: number;
	title?: string;
	comment: string;
	date: string;
	verifiedPurchase?: boolean;
}