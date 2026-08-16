"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useEcommerce } from '@/context/EcommerceContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useEcommerce();
  const isWishlisted = isInWishlist(product.id);

  // Total stock across variants
  const totalStock = product.variants.reduce((acc, v) => acc + (v.stock - v.reservedStock), 0);
  const isOutOfStock = totalStock <= 0;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-100/80 hover:border-rose-200/80 shadow-xs hover:shadow-md transition-all duration-300">
      {/* Thumbnail Container */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} preview`}
              className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="bg-rose-950 text-amber-200 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" /> New
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="bg-rose-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-900 shadow-sm transition-colors"
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-700 text-rose-700' : ''}`} />
        </button>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-stone-900 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-sm">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-rose-900">{product.fabric}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-800">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className="text-sm font-serif font-medium text-stone-900 hover:text-rose-900 line-clamp-1 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{product.pattern}</p>
        </div>

        {/* Price & Variant Sizes */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-stone-950">₹{product.sellingPrice.toLocaleString()}</span>
            {product.mrp > product.sellingPrice && (
              <span className="text-xs text-stone-400 line-through">₹{product.mrp.toLocaleString()}</span>
            )}
          </div>

          <div className="flex gap-1">
            {product.variants.slice(0, 3).map((v) => (
              <span 
                key={v.id} 
                className="text-[10px] px-1.5 py-0.5 border border-stone-200 text-stone-600 rounded bg-stone-50"
              >
                {v.size}
              </span>
            ))}
            {product.variants.length > 3 && (
              <span className="text-[10px] text-stone-400 self-center">+{product.variants.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};