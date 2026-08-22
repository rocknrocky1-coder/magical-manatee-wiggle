import type { Address, Order, PaymentMethod } from '@/types/ecommerce';
import { isSupabaseConfigured } from './supabase';

export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  items: Array<{ variantId: string; quantity: number }>;
  couponCode?: string;
}

export const orderRepository = {
  async createOrder(request: CreateOrderRequest): Promise<Order | null> {
    if (!isSupabaseConfigured) return null;
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || 'Unable to place order');
    }
    return response.json();
  },
};
