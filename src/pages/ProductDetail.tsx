"use client";

import React from 'react';
import { useParams, usePathname } from 'react-router-dom';
import { useEcommerce } from '@/context/EcommerceContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';
import { Loader2, Check, X, Star, Mail, MapPin, Phone, Truck } from 'lucide-react';

const ProductDetail = () => {
  const params = useParams();
  const { productId } = params;
  const { products, getProductById, cart, addToCart, wishlist, toggleWishlist, isInWishlist } = useEcommerce();

  const product = productId ? getProductById(productId) : products[0];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const variant = product.variants[0];
  const images = product.images;
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-neutral-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <Link to={`/category/${product.category}`} className="hover:text-neutral-900 transition-colors">
              {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              {variant && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">
                    {variant.size} / {variant.colorName}
                  </span>
                </div>
              )}
            </div>

            <p className="text-neutral-600 text-lg mb-6">
              {product.fabric}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-amber-600 font-semibold text-3xl">
                {formatPrice(variant?.sellingPrice || product.sellingPrice)}
              </span>
              {variant?.mrp > variant?.sellingPrice && (
                <span className="text-neutral-400 line-through text-sm">
                  {formatPrice(variant?.mrp || product.mrp)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            {variant && variant.stock > 0 && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                <Check className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-amber-800">In Stock ({variant.stock})</span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <Button
                onClick={() => addToCart(product, variant, 1)}
                className="w-full py-3 text-lg font-medium"
              >
                Add to Bag
              </Button>

              <Button
                variant="outline"
                onClick={() => toggleWishlist(product.id)}
                className="w-full py-3 mt-2 text-lg font-medium"
              >
                {isInWishlist(product.id) ? 'Removed from Wishlist' : 'Save to Wishlist'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <MadeWithDyad />
    </div>
  );
};

export default ProductDetail;