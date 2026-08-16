"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    couponDiscountAmount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    updateCartQuantity, 
    removeFromCart, 
    shippingFee, 
    grandTotal, 
    settings 
  } = useEcommerce();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, settings.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / settings.freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-900" />
              <h2 className="text-lg font-serif font-bold text-stone-900">Your Shopping Bag ({cartCount})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="bg-amber-50/80 px-4 py-3 border-b border-amber-200/60 text-xs text-amber-950">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-800" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">Yay! You unlocked Free Express Shipping</span>
                ) : (
                  <span>Add <strong>₹{amountNeededForFreeShipping.toLocaleString()}</strong> more for Free Shipping</span>
                )}
              </span>
              <span>{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 text-base">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                    Explore our pure mul cotton sarees and artisanal kurtis to curate your ethnic wardrobe.
                  </p>
                </div>
                <Button 
                  onClick={() => { onClose(); navigate('/shop'); }}
                  className="bg-rose-900 hover:bg-rose-800 text-white rounded-full text-xs px-6"
                >
                  Explore Catalog
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-stone-50/70 border border-stone-100 rounded-xl relative group">
                  <img
                    src={item.variant.image || item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg border border-stone-200"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{item.product.name}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Size: <span className="font-medium text-stone-800">{item.variant.size}</span> | Color: <span className="font-medium text-stone-800">{item.variant.colorName}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-stone-950">₹{item.variant.sellingPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-stone-400 line-through">₹{item.variant.mrp.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-700 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Calculations */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 space-y-3">
              {/* Coupon Bar */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{couponDiscountAmount})</span>
                  </div>
                  <button 
                    onClick={removeCoupon} 
                    className="text-xs text-rose-700 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter Coupon (e.g. FIRST10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="text-xs uppercase bg-white border-stone-300"
                  />
                  <Button type="submit" variant="outline" className="text-xs px-4 border-stone-300 font-semibold">
                    Apply
                  </Button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Savings</span>
                    <span>-₹{couponDiscountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping & Delivery</span>
                  <span>{shippingFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-900 pt-2 border-t border-stone-200">
                  <span>Estimated Total (Incl. GST)</span>
                  <span className="text-rose-950">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* CTA Checkout */}
              <Button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full bg-rose-900 hover:bg-rose-800 text-white py-5 rounded-xl font-medium tracking-wide shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-[10px] text-stone-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                100% Genuine Handloom Quality Guarantee | 7-Day Easy Returns
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};