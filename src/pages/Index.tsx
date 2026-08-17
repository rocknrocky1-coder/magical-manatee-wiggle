"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEcommerce } from '@/context/EcommerceContext';
import { Navbar } from '@/components/layout/Navbar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { products, cartCount } = useEcommerce();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get category from URL params (e.g., /category/kurtis -> kurtis)
  // We use the params directly in useMemo to ensure reactivity to URL changes
  const categorySlug = params['*'] || searchParams.get('category') || null;

  // Filter products based on current category slug
  const filteredProducts = useMemo(() => {
    if (!categorySlug) {
      // Home page - show featured/best seller products
      return products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 8);
    }
    // Category page - filter by category
    // We match the slug from URL to the product.category field
    return products.filter(p => p.category === categorySlug && p.isPublished);
  }, [products, categorySlug]);

  useEffect(() => {
    setFeaturedProducts(products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 8));
    setIsLoading(false);
  }, [products]);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const getCategoryTitle = (slug: string) => {
    const titles: Record<string, string> = {
      'kurtis': 'Kurtis & Tunics',
      'coord-sets': 'Co-ord Sets',
      'mul-cotton-sarees': 'Mul Cotton Sarees',
      'printed-sarees': 'Printed Sarees',
      'festive-edits': 'Festive Edits',
      'daily-wear': 'Daily Wear'
    };
    return titles[slug] || 'Collection';
  };

  const getCategorySubtitle = (slug: string) => {
    const subtitles: Record<string, string> = {
      'kurtis': 'From breezy daily pure cottons to zari-touched celebratory silhouettes',
      'coord-sets': 'Contemporary 2-piece ensembles tailored for modern Indian luxury',
      'mul-cotton-sarees': '100s count superfine artisanal mul drapes crafted for all-day grace',
      'printed-sarees': 'Kalamkari, Bagru, Ajrakh and floral heritage hand-prints',
      'festive-edits': 'Curated festive ensembles for celebrations and gatherings',
      'daily-wear': 'Comfortable everyday essentials in breathable natural fabrics'
    };
    return subtitles[slug] || 'Discover our curated collection';
  };

  // If on a category page, show category-specific content
  if (categorySlug) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onOpenCart={() => navigate('/cart')} />

        <main className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <section className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
              {getCategoryTitle(categorySlug)}
            </h1>
            <p className="text-neutral-600 max-w-2xl">
              {getCategorySubtitle(categorySlug)}
            </p>
          </section>

          {/* Product Grid */}
          <section>
            {filteredProducts.length === 0? (
              <div className="text-center py-16">
                <p className="text-neutral-500 text-lg">No products found in this category</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="border-neutral-200 hover:border-amber-500 transition-colors group"
                  >
                    <Link to={`/product/${product.slug}`} className="block">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.isNewArrival && (
                          <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
                            New Arrival
                          </span>
                        )}
                        {product.discountPercentage > 0 && (
                          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                            {product.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                          {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <h3 className="font-medium text-neutral-900 truncate group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-amber-600 font-semibold">
                            {formatPrice(product.sellingPrice)}
                          </span>
                          {product.mrp > product.sellingPrice && (
                            <span className="text-neutral-400 line-through text-sm">
                              {formatPrice(product.mrp)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                          {product.fabric}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </main>

        <MadeWithDyad />
      </div>
    );
  }

  // Home page content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onOpenCart={() => navigate('/cart')} />

      <main className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Featured Products */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="border-neutral-200 hover:border-amber-500 transition-colors group">
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isNewArrival && (
                      <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
                        New Arrival
                      </span>
                    )}
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                      {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <h3 className="font-medium text-neutral-900 truncate group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-amber-600 font-semibold">
                        {formatPrice(product.sellingPrice)}
                      </span>
                      {product.mrp > product.sellingPrice && (
                        <span className="text-neutral-400 line-through text-sm">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'kurtis', label: 'Kurtis & Tunics', count: '32+' },
              { id: 'coord-sets', label: 'Co-ord Sets', count: '24+' },
              { id: 'mul-cotton-sarees', label: 'Mul Cotton Sarees', count: '40+' },
              { id: 'printed-sarees', label: 'Printed Sarees', count: '28+' },
            ].map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group flex flex-col items-center gap-2 p-6 border rounded-xl border-neutral-200 hover:border-amber-500 hover:bg-amber-50 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-3xl group-hover:bg-amber-100 transition-colors">
                  {cat.id === 'kurtis' ? '👘' : cat.id === 'coord-sets' ? '👚' : cat.id === 'mul-cotton-sarees' ? '🧣' : '🧣'}
                </div>
                <h3 className="font-medium text-neutral-900 group-hover:text-amber-600 transition-colors text-center">{cat.label}</h3>
                <p className="text-xs text-neutral-500">{cat.count}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <Card key={product.id} className="border-neutral-200 hover:border-amber-500 transition-colors group">
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isNewArrival && (
                      <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
                        New Arrival
                      </span>
                    )}
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                      {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <h3 className="font-medium text-neutral-900 truncate group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-amber-600 font-semibold">
                        {formatPrice(product.sellingPrice)}
                      </span>
                      {product.mrp > product.sellingPrice && (
                        <span className="text-neutral-400 line-through text-sm">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <MadeWithDyad />
    </div>
  );
};

export default Index;