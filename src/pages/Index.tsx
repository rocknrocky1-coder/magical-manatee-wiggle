"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '@/context/EcommerceContext';
import { Navbar } from '@/components/layout/Navbar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import { INITIAL_PRODUCTS } from '@/data/mockData';

const Index = () => {
  const navigate = useNavigate();
  const { products, cartCount } = useEcommerce();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFeaturedProducts(products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 8));
    setIsLoading(false);
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onOpenCart={() => navigate('/cart')} />

      <main className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl mx-auto">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="border-neutral-200 hover:border-amber-500 transition-colors">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900 truncate">{product.name}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">
                    {product.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-amber-600 font-medium">{formatPrice(product.sellingPrice)}</span>
                    <span className="text-neutral-400 line-through mr-2">{formatPrice(product.mrp)}</span>
                    <span className="text-amber-400 text-xs font-medium">
                      {product.discountPercentage}% off
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'kurtis', label: 'Kurtis & Tunics', count: '32+' },
              { id: 'coord-sets', label: 'Co-ord Sets', count: '24+' },
              { id: 'mul-cotton-sarees', label: 'Mul Cotton Sarees', count: '40+' },
              { id: 'printed-sarees', label: 'Printed Sarees', count: '28+' },
            ].map((cat) => (
              <a
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group flex flex-col items-center gap-2 p-4 border rounded-xl border-neutral-200 hover:border-amber-500 hover:bg-amber-50 transition-all duration-300"
              >
                <span className="text-3xl">{cat.id === 'kurtis' ? '👘' : cat.id === 'coord-sets' ? '👚' : cat.id === 'mul-cotton-sarees' ? '🧣' : '🧣'}</span>
                <h3 className="font-medium text-neutral-900 group-hover:text-amber-600 transition-colors">{cat.label}</h3>
                <p className="text-xs text-neutral-500">{cat.count}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <Card
                key={product.id}
                className="border-neutral-200 hover:border-amber-500 transition-colors"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900 truncate">{product.name}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">
                    {product.description.substring(0, 80)}...
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-amber-600 font-medium">{formatPrice(product.sellingPrice)}</span>
                    <span className="text-neutral-400 line-through mr-2">{formatPrice(product.mrp)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <MadeWithDyad />
    </div>
  );
};

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export default Index;