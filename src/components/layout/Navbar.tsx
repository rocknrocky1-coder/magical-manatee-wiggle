"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  User, 
  Sparkles,
  ChevronDown,
  Truck,
  RotateCcw,
  Lock
} from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { 
    cartCount, 
    wishlist, 
    adminRole, 
    setAdminRole,
    products 
  } = useEcommerce();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5);

  const categories = [
    { id: 'kurtis', label: 'Kurtis & Tunics', href: '/category/kurtis' },
    { id: 'coord-sets', label: 'Co-ord Sets', href: '/category/coord-sets' },
    { id: 'mul-cotton-sarees', label: 'Mul Cotton Sarees', href: '/category/mul-cotton-sarees' },
    { id: 'printed-sarees', label: 'Printed Sarees', href: '/category/printed-sarees' },
    { id: 'festive-edits', label: 'Festive Edits', href: '/category/festive-edits' },
    { id: 'daily-wear', label: 'Daily Wear', href: '/category/daily-wear' },
  ];

  const formatPrice = (price: number) => {
    if (currency === 'USD') {
      return `$${(price / 83).toFixed(2)}`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-amber-900 text-amber-50 py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 text-sm font-medium tracking-wide">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Free shipping on orders above ₹1,999
          </span>
          <span className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            7-day easy returns & exchanges
          </span>
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Secure COD & UPI payments
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Handcrafted with natural dyes
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200' 
          : 'bg-transparent'
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-18">
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 z-10"
              aria-label="TIRZAH - Home"
            >
              <span className="text-2xl lg:text-3xl font-serif font-light tracking-widest text-neutral-900">
                TIRZAH
              </span>
              <span className="hidden sm:inline-block w-px h-6 bg-neutral-300 mx-2" />
              <span className="text-xs font-medium tracking-widest uppercase text-neutral-500 hidden sm:block">
                Indian Luxury
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.href}
                    className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors relative py-2"
                  >
                    {cat.label}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 scale-x-0 origin-bottom-right transition-transform hover:scale-x-100 hover:origin-bottom-left" />
                  </Link>
                ))}
              </div>

              {/* Search */}
              <div className="relative ml-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    type="search"
                    placeholder="Search kurtis, sarees, co-ords..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                    className="w-64 pl-10 pr-10 py-2 text-sm bg-neutral-50 border-neutral-200 focus:border-neutral-400 focus:bg-white"
                    aria-label="Search products"
                  />
                  {showSearchResults && searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden z-50">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            className="flex items-center gap-3 p-3 hover:bg-neutral-50 transition-colors"
                            onClick={() => setShowSearchResults(false)}
                          >
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-900 truncate">{product.name}</p>
                              <p className="text-xs text-neutral-500">{product.category}</p>
                            </div>
                            <span className="text-sm font-semibold text-neutral-900">
                              {formatPrice(product.sellingPrice)}
                            </span>
                          </Link>
                        ))
                      ) : (
                        <p className="p-3 text-sm text-neutral-500">No results found</p>
                      )}
                    </div>
                  )}
                </form>
              </div>

              {/* Currency Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 px-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 gap-1">
                    {currency}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem 
                    onClick={() => setCurrency('INR')}
                    className={currency === 'INR' ? 'bg-amber-50 text-amber-900' : ''}
                  >
                    INR - Indian Rupee
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrency('USD')}
                    className={currency === 'USD' ? 'bg-amber-50 text-amber-900' : ''}
                  >
                    USD - US Dollar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="relative p-2 rounded-lg text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                aria-label={`Wishlist, ${wishlist.length} items`}
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {wishlist.length > 9 ? '9+' : wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 rounded-lg text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 px-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 gap-1">
                    <User className="w-4 h-4" />
                    Account
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/account/orders" className="flex items-center gap-2 w-full">
                      <ShieldCheck className="w-4 h-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/addresses" className="flex items-center gap-2 w-full">
                      <Truck className="w-4 h-4" />
                      Addresses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="flex items-center gap-2 w-full">
                      <Heart className="w-4 h-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {adminRole && (
                    <DropdownMenuItem 
                      onClick={() => navigate('/admin')}
                      className="flex items-center gap-2 text-amber-700 font-medium"
                    >
                      <Sparkles className="w-4 h-4" />
                      Admin Portal
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-neutral-200 animate-slide-down">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 pt-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={cat.href}
                      className="text-sm font-medium text-neutral-700 hover:text-neutral-900 py-2 px-2 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-neutral-200">
                  <Link to="/wishlist" className="flex items-center gap-2 text-sm font-medium text-neutral-700" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart className="w-5 h-5" />
                    Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                  </Link>
                  <button onClick={() => { onOpenCart(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <ShoppingBag className="w-5 h-5" />
                    Bag {cartCount > 0 && `(${cartCount})`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Trust Badges Bar - Desktop only */}
      <div className="hidden lg:block bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-8 text-xs font-medium text-neutral-600">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Authentic Handcrafted
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            Free Shipping ₹1,999+
          </span>
          <span className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            7-Day Returns
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            Secure Payments
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Natural Dyes
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </>
  );
};
</arg_value>