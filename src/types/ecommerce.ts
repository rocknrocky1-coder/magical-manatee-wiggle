export type PaymentStatus = 
  | 'PENDING'
  | 'PAID' | 'FAILED' | 'REFUNDED';

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
}; // Added missing semicolon

// Added missing semicolon at end of file