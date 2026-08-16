"use client";

import React, { useState } from 'react';
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
  ChevronDown
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

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { cartCount, wishlist } = useEcommerce();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'Kurtis & Tunics', path: '/shop?category=kurtis' },
    { label: 'Co-ord Sets', path: '/shop?category=coord-sets' },
    { label: 'Mul Cotton Sarees', path: '/shop?category=mul-cotton-sarees' },
    { label: 'Printed Sarees', path: '/shop?category=printed-sarees' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm"><dyad-write path="src/components/layout/Navbar.tsx" description="Premium luxury Indian fashion navbar with announcement banner, brand typography, live search, wishlist badge, cart drawer trigger, and navigation links">
"use client";

import React, { useState } from 'react';
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
  ChevronDown
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

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { cartCount, wishlist } = useEcommerce();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'Kurtis & Tunics', path: '/shop?category=kurtis' },
    { label: 'Co-ord Sets', path: '/shop?category=coord-sets' },
    { label: 'Mul Cotton Sarees', path: '/shop?category=mul-cotton-sarees' },
    { label: 'Printed Sarees', path: '/shop?category=printed-sarees' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-amber-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Handcrafted Indian Luxury | Free Express Delivery on orders above ₹1,999</span>
        <span className="hidden md:inline font-bold text-amber-300 ml-2 bg-amber-400/20 px-2 py-0.5 rounded text-[11px]">Use Code: FIRST10</span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="inline-block group">
              <span className="font-serif tracking-[0.25em] text-2xl sm:text-3xl font-extrabold text-stone-900 group-hover:text-rose-900 transition-colors">
                TIRZAH
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-rose-800 uppercase font-semibold -mt-1">
                Luxury Indian Ethnic
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-stone-700 hover:text-rose-900 text-sm font-medium tracking-wide transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rose-900 hover:after:w-full after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Input on Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="text"
                placeholder="Search kurtis, sarees, prints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 lg:w-64 pl-9 pr-4 py-1.5 text-xs rounded-full border-stone-200 bg-stone-50 focus:bg-white focus:ring-1 focus:ring-rose-800"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-rose-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/account?tab=wishlist"
              className="p-2 text-stone-700 hover:text-rose-900 relative transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-800 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 text-stone-700 hover:text-rose-900 relative transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account & Admin Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="p-2 text-stone-700 hover:text-rose-900 flex items-center gap-1"
                  aria-label="Account options"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3 h-3 hidden sm:inline" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 bg-white shadow-lg border border-stone-100">
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-stone-900">Welcome to TIRZAH</p>
                  <p className="text-[11px] text-stone-500">Priyanka Verma</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account?tab=orders" className="cursor-pointer text-xs py-2">My Orders & Tracking</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account?tab=wishlist" className="cursor-pointer text-xs py-2">My Wishlist ({wishlist.length})</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account?tab=addresses" className="cursor-pointer text-xs py-2">Saved Addresses</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="cursor-pointer text-xs py-2 font-semibold text-rose-900 flex items-center justify-between">
                    <span>Admin Portal</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-900" />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        {/* Mobile Search Expanded Bar */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="pb-3 md:hidden">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search kurtis, mul sarees, prints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border-stone-300"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </form>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-800 hover:text-rose-900 border-b border-stone-200/60"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-semibold text-rose-950"
            >
              <ShieldCheck className="w-4 h-4 text-rose-800" />
              <span>Admin Management Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};