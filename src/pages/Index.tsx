"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  Truck, 
  Gem, 
  Star, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/shop/ProductCard';
import { CATEGORIES_META } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { products } = useEcommerce();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const featuredProducts = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col">
      <Navbar onOpenCart={() => setIsCartOpen(true)}<dyad-write path="src/pages/Index.tsx" description="Editorial Homepage for TIRZAH featuring hero banners, category tiles, curated bestseller carousel, artisanal storytelling, and client reviews">
"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  Truck, 
  Gem, 
  Star, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/shop/ProductCard';
import { CATEGORIES_META } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { products } = useEcommerce();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const featuredProducts = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-rose-950 to-stone-900 text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80"
            alt="Handcrafted Indian Fabrics"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-300/30 px-4 py-1.5 rounded-full text-amber-200 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Spring/Summer 2025 Handloom Chapter</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-amber-50 leading-[1.15]">
            Poetry in Pure Mul Cotton <br className="hidden sm:inline" />
            & Heritage Silhouettes
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            Featherlight handblock Mul Sarees, breathable everyday Kurtas, and tailored 2-piece Co-ord sets hand-printed by master craftspeople across Rajasthan and Andhra Pradesh.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-8 py-6 rounded-full text-sm shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              <Link to="/shop">
                Explore The Collection <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-amber-200/40 text-amber-100 hover:bg-white/10 hover:text-white px-8 py-6 rounded-full text-sm font-medium"
            >
              <Link to="/shop?category=mul-cotton-sarees">
                Shop Mul Cotton Sarees
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Value Pillars */}
      <section className="bg-white border-b border-stone-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
              <Gem className="w-5 h-5 text-rose-900" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">100% Pure Mul & Silk</h4>
              <p className="text-[11px] text-stone-500">Certified natural fibers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Free Express Delivery</h4>
              <p className="text-[11px] text-stone-500">Orders above ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">7-Day Easy Returns</h4>
              <p className="text-[11px] text-stone-500">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-purple-900" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Artisan Authenticity</h4>
              <p className="text-[11px] text-stone-500">Bagru & Kalahasti craft</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-rose-900 font-bold">Curated Ensembles</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">Shop by Category</h2>
          </div>
          <Link to="/shop" className="text-xs font-semibold text-rose-900 hover:text-rose-800 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_META.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider mb-1">{cat.count}</span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors">{cat.title}</h3>
                <p className="text-xs text-stone-300 line-clamp-2 mt-1 font-light">{cat.subtitle}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Styles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Showcase */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-rose-900 font-bold">Most Treasured</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">Bestselling Handcrafted Silhouettes</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Loved by thousands of women across India for their all-day comfort, effortless drape, and vivid natural dyes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Artisanal Heritage Feature */}
      <section className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-rose-950 text-white rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 relative">
          <div className="space-y-6">
            <span className="bg-amber-400/20 text-amber-300 text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full inline-block">
              Artisanal Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50 leading-tight">
              Rooted in the Ancient Dyeing Vats of Bagru & Kalahasti
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Every single metre of our signature Mul Cotton fabric undergoes up to 14 meticulous steps — from washing in running river water to hand-carving Sheesham wood blocks, stamping natural madder root paste, and curing under the desert sun.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-2xl font-serif font-bold text-amber-300">100s</span>
                <p className="text-xs text-stone-300 mt-1">Count superfine yarn count for whisper-light softness</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-2xl font-serif font-bold text-amber-300">100%</span>
                <p className="text-xs text-stone-300 mt-1">Natural vegetable extracts and azo-free safe colors</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
              alt="Artisans at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-rose-900 font-bold">Just Dropped</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">New Arrivals</h2>
          </div>
          <Link to="/shop" className="text-xs font-semibold text-rose-900 hover:text-rose-800 flex items-center gap-1">
            Shop All New <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Customer Love & Reviews */}
      <section className="bg-stone-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-rose-900 font-bold">Community Love</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">Words from Our Patrons</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200/80 space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                &ldquo;The Mul Cotton saree is so featherlight and soft! I wore it to an outdoor afternoon wedding in Delhi and was comfortable all 8 hours. Truly royal quality.&rdquo;
              </p>
              <div className="pt-2 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-900">Dr. Sunita Rao</p>
                <p className="text-[11px] text-stone-500">Verified Buyer, Bengaluru</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200/80 space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                &ldquo;The Indigo Modal co-ord set has become my staple airport and work outfit. Deep pockets, zero itchiness, and beautiful handblock detailing.&rdquo;
              </p>
              <div className="pt-2 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-900">Meenakshi Chhabra</p>
                <p className="text-[11px] text-stone-500">Verified Buyer, Mumbai</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200/80 space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                &ldquo;Quick 3-day delivery and stunning muslin cloth packaging. The Anarkali kurti fitting was exact according to their size guide.&rdquo;
              </p>
              <div className="pt-2 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-900">Ritika Sengupta</p>
                <p className="text-[11px] text-stone-500">Verified Buyer, Kolkata</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-serif tracking-[0.25em] text-xl font-extrabold text-white">TIRZAH</span>
            <p className="text-stone-400 leading-relaxed">
              Curators of timeless Indian ethnic wear. Celebrating the heritage handloom crafts of India with ethical artisan partnerships.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3">Collections</h4>
            <ul className="space-y-2">
              <li><Link to="/shop?category=kurtis" className="hover:text-amber-300">Kurtis & Tunics</Link></li>
              <li><Link to="/shop?category=coord-sets" className="hover:text-amber-300">Co-ord Sets</Link></li>
              <li><Link to="/shop?category=mul-cotton-sarees" className="hover:text-amber-300">Mul Cotton Sarees</Link></li>
              <li><Link to="/shop?category=printed-sarees" className="hover:text-amber-300">Printed Sarees</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3">Customer Support</h4>
            <ul className="space-y-2">
              <li><Link to="/account?tab=orders" className="hover:text-amber-300">Track Orders</Link></li>
              <li><Link to="/account?tab=orders" className="hover:text-amber-300">Returns & Exchanges</Link></li>
              <li><Link to="/shop" className="hover:text-amber-300">Fabric & Care Guide</Link></li>
              <li><a href="mailto:care@tirzahfashion.com" className="hover:text-amber-300">care@tirzahfashion.com</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider mb-1">Administrative Access</h4>
            <p className="text-stone-500">Access store inventory, order processing, and discount manager.</p>
            <Button asChild size="sm" className="bg-rose-900 hover:bg-rose-800 text-white rounded-lg text-xs w-full">
              <Link to="/admin">Open Admin Portal</Link>
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-500">
          <p>© {new Date().getFullYear()} TIRZAH Luxury Indian Ethnic. All rights reserved.</p>
          <div className="flex gap-4">
            <span>GST Registered</span>
            <span>Made with Indian Artisanal Pride</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;