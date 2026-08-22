"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEcommerce } from '@/context/EcommerceContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, Check, X, Star, Mail, MapPin, Phone, Truck } from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import type { ProductVariant } from '@/types/ecommerce';

const ProductDetail = () => {
  const params = useParams();
  const { slug } = params;
  const { products, getProductBySlug, cart, addToCart, wishlist, toggleWishlist, isInWishlist } = useEcommerce();
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | undefined>();

  const product = slug ? getProductBySlug(slug) : undefined;

  React.useEffect(() => {
    setSelectedVariant(product?.variants[0]);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Product Not Found</h1>
          <p className="text-neutral-500 mb-6">The product you're looking for doesn't exist or is not available.</p>
          <Link to="/" className="text-amber-600 hover:text-amber-500 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const allSizes = product.variants.map(v => v.size);
  const uniqueSizes = [...new Set(allSizes)];

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  // Update selected variant when size clicked
  const handleSizeChange = (size: string) => {
    const variant = product.variants.find(v => v.size === size);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
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
            {product.images.map((img, idx) => (
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
              {selectedVariant && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">
                    {selectedVariant.size}
                  </span>
                </div>
              )}
            </div>

            <p className="text-neutral-600 text-lg mb-6">
              {product.fabric}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-amber-600 font-semibold text-3xl">
                {formatPrice(selectedVariant?.sellingPrice || product.sellingPrice)}
              </span>
              {selectedVariant?.mrp > selectedVariant?.sellingPrice && (
                <span className="text-neutral-400 line-through text-sm">
                  {formatPrice(selectedVariant?.mrp || product.mrp)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            {selectedVariant && selectedVariant.stock > 0 && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                <Check className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-amber-800">In Stock ({selectedVariant.stock})</span>
              </div>
            )}

            {/* Size Selection */}
            {uniqueSizes.length > 1 && (
              <div className="mb-6">
                <p className="text-neutral-600 text-sm mb-3">Select Size</p>
                <div className="flex gap-2 flex-wrap">
                  {uniqueSizes.map((size) => {
                    const variant = product.variants.find(v => v.size === size);
                    const hasStock = variant?.stock > 0;
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium',
                          'transition-colors',
                          selectedVariant?.size === size 
                            ? 'bg-amber-600 text-amber-900' 
                            : 'text-neutral-500 hover:text-neutral-900 border border-neutral-300',
                          hasStock ? '' : 'opacity-50 cursor-not-allowed'
                        )}
                        disabled={!hasStock}
                        aria-pressed={selectedVariant?.size === size}
                        aria-label={`Select ${size}`}
                      >
                        {size}
                        {hasStock && selectedVariant?.size === size && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"/>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {uniqueSizes.length === 1 && selectedVariant && selectedVariant.size !== 'Free Size' && (
              <p className="text-neutral-600 text-sm mb-3">Size: {selectedVariant.size}</p>
            )}

            {/* Actions */}
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <Button
                onClick={() => addToCart(product, selectedVariant!, 1)}
                className="w-full py-3 text-lg font-medium"
                disabled={!selectedVariant}
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