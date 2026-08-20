"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '@/context/EcommerceContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import type { Order } from '@/types/ecommerce';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart,
    cartSubtotal,
    appliedCoupon,
    couponDiscountAmount,
    gstAmount,
    shippingFee,
    grandTotal,
    updateCartQuantity,
    removeFromCart
  } = useEcommerce();

  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [completedOrder, setCompletedOrder] = React.useState<Order | null>(null);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const handleCheckoutSuccess = (order: Order) => {
    setCompletedOrder(order);
  };

  if (completedOrder) {
    return <OrderConfirmation order={completedOrder} onContinueShopping={() => navigate('/')} />;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your bag is empty</h2>
          <p className="text-neutral-500 mb-6">Add some treasures from our collection</p>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900">{item.product.name}</h3>
                    <p className="text-sm text-neutral-500">
                      {item.variant.colorName} • {item.variant.size}
                    </p>
                    <p className="text-sm font-semibold text-amber-600">
                      {formatPrice(item.variant.sellingPrice)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.variant.stock - item.variant.reservedStock)}
                        className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-neutral-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            {isCheckoutOpen ? (
              <Card className="p-5 sm:p-6">
                <CheckoutForm
                  onSuccess={handleCheckoutSuccess}
                  onCancel={() => setIsCheckoutOpen(false)}
                />
              </Card>
            ) : <Card className="p-4 space-y-4">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(couponDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>{formatPrice(gstAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Button className="w-full py-3" onClick={() => setIsCheckoutOpen(true)}>
                Proceed to Checkout
              </Button>
            </Card>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;