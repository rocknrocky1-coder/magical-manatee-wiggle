import React from 'react';
import { CheckCircle2, Package } from 'lucide-react';
import { Order } from '@/types/ecommerce';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OrderConfirmationProps {
  order: Order;
  onContinueShopping: () => void;
}

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onContinueShopping }) => (
  <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <Card className="w-full max-w-xl border-neutral-200 p-6 text-center shadow-sm sm:p-10">
      <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" aria-hidden="true" />
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Tirzha order confirmation</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900">Order placed successfully</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600">
        Thank you for shopping with Tirzha. Your order has been confirmed and is now being prepared.
      </p>
      <div className="mt-8 divide-y divide-neutral-200 rounded-lg border border-neutral-200 text-left">
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-sm text-neutral-500">Order number</span>
          <span className="font-semibold text-neutral-900">{order.orderNumber}</span>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-sm text-neutral-500">Order ID</span>
          <span className="max-w-[60%] break-all text-right text-sm font-medium text-neutral-900">{order.id}</span>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="flex items-center gap-2 text-sm text-neutral-500"><Package className="h-4 w-4" />Final total</span>
          <span className="text-lg font-semibold text-amber-700">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>
      <Button className="mt-8 w-full sm:w-auto" onClick={onContinueShopping}>Continue Shopping</Button>
    </Card>
  </main>
);

export default OrderConfirmation;
