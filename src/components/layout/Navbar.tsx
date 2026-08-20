import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenCart: () => void;
}

const navItems = [
  { label: 'New Arrivals', href: '/?sort=new' },
  { label: 'Kurtis', href: '/category/kurtis' },
  { label: 'Co-ord Sets', href: '/category/coord-sets' },
  { label: 'Sarees', href: '/category/mul-cotton-sarees' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useEcommerce();
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <Link to="/" className="font-serif text-xl font-semibold tracking-[0.18em] text-neutral-900">TIRZAH</Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} to={item.href} className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-700">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" title="Search"><Search /></Button>
          <Button variant="ghost" size="icon" onClick={onOpenCart} aria-label="Open shopping bag" title="Shopping bag">
            <ShoppingBag />
            {cartCount > 0 && <span className="absolute ml-6 mt-[-1.25rem] min-w-4 rounded-full bg-amber-600 px-1 text-center text-[10px] leading-4 text-white">{cartCount}</span>}
          </Button>
        </div>
      </div>
      {isMenuOpen && <nav className="border-t border-neutral-200 bg-white px-4 py-3 lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => <Link key={item.href} to={item.href} onClick={() => setIsMenuOpen(false)} className={`block border-b border-neutral-100 py-3 text-sm font-medium ${location.pathname === item.href ? 'text-amber-700' : 'text-neutral-700'}`}>{item.label}</Link>)}
      </nav>}
    </header>
  );
};