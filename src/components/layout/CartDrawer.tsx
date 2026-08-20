"use client";

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, Heart, Tag, Truck, RotateCcw, Lock, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import type { Order } from '@/types/ecommerce';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart,
    appliedCoupon,
    couponDiscountAmount,
    gstAmount,
    shippingFee,
    grandTotal,
    cartSubtotal,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    isInWishlist
  } = useEcommerce();

  const [couponCode, setCouponCode] = React.useState('');
  const [couponMessage, setCouponMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [completedOrder, setCompletedOrder] = React.useState<Order | null>(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const handleCheckoutSuccess = (order: Order) => {
    setCompletedOrder(order);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
    onClose();
  };

  const handleContinueShopping = () => {
    handleClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className={cn(
        'fixed right-0 top-0 h-full w-full max-w-md lg:max-w-xl z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-neutral-900">Shopping Bag</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          <OrderConfirmation order={completedOrder} onContinueShopping={handleContinueShopping} />
        ) : isCheckoutOpen ? (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <CheckoutForm
              onSuccess={handleCheckoutSuccess}
              onCancel={() => setIsCheckoutOpen(false)}
            />
          </div>
        ) : <>
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
              <p className="text-neutral-500 mb-2">Your bag is empty</p>
              <p className="text-sm text-neutral-400 mb-6">Looks like you haven't picked any treasures yet.</p>
              <Button onClick={handleClose} className="w-full max-w-xs">
                Continue Shopping
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-neutral-50 rounded-xl">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-neutral-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {item.variant.colorName} • {item.variant.size}
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">
                        {formatPrice(item.variant.sellingPrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        toggleWishlist(item.product.id);
                        removeFromCart(item.id);
                      }}
                      className="p-1 text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label={isInWishlist(item.product.id) ? 'Remove from wishlist' : 'Move to wishlist'}
                    >
                      <Heart className={cn('w-4 h-4', isInWishlist(item.product.id) ? 'fill-current text-red-500' : '')} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-2 text-sm font-medium text-neutral-900 w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.variant.stock - item.variant.reservedStock)}
                        className="p-2 text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="border-t border-neutral-200 p-4 space-y-4 bg-white">
          {/* Coupon Section */}
          <div className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-neutral-900">Apply Coupon</span>
            </div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-700" />
                  <span className="font-medium text-amber-900">{appliedCoupon.code}</span>
                  <span className="text-xs text-amber-700">-{formatPrice(couponDiscountAmount)}</span>
                </div>
                <button
                  onClick={() => { removeCoupon(); setCouponMessage(null); }}
                  className="text-xs text-amber-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                <Button 
                  size="sm" 
                  onClick={handleApplyCoupon}
                  className="whitespace-nowrap"
                >
                  Apply
                </Button>
              </div>
            )}
            {couponMessage && (
              <p className={cn(
                'mt-2 text-sm',
                couponMessage.type === 'success' ? 'text-green-700' : 'text-red-600'
              )}>
                {couponMessage.text}
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span className="font-medium text-neutral-900">{formatPrice(cartSubtotal)}</span>
            </div>
            {couponDiscountAmount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Coupon Discount</span>
                <span className="font-medium">-{formatPrice(couponDiscountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>GST (incl.)</span>
              <span className="font-medium text-neutral-900">{formatPrice(gstAmount)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span className="font-medium text-neutral-900">
                {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
              </span>
            </div>
            {cartSubtotal > 0 && cartSubtotal < 1999 && (
              <p className="text-xs text-amber-700 flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Add {formatPrice(1999 - cartSubtotal)} more for free shipping
              </p>
            )}
            <div className="border-t border-neutral-200 pt-2 flex justify-between text-lg font-semibold text-neutral-900">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-xs text-neutral-500 pt-2 border-t border-neutral-200">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Secure Checkout
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              Easy Returns
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Authentic
            </span>
          </div>

          {/* Checkout Button */}
          <Button 
            className="w-full py-3 text-lg"
            onClick={() => setIsCheckoutOpen(true)}
            disabled={cart.length === 0}
          >
            Checkout <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-center text-xs text-neutral-500">
            By proceeding, you agree to our <a href="/terms" className="underline hover:text-neutral-700">Terms</a> & <a href="/privacy" className="underline hover:text-neutral-700">Privacy Policy</a>
          </p>
        </div>
        </>}
      </div>
    </>
  );

  function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    const result = applyCoupon(couponCode);
    setCouponMessage({ 
      type: result.success ? 'success' : 'error', 
      text: result.message 
    });
    if (result.success) setCouponCode('');
  }
};