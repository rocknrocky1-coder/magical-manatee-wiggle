import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster"; 
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound"; 
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import { EcommerceProvider } from "./context/EcommerceContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return ( 
    <TooltipProvider> 
      <Toaster /> 
      <EcommerceProvider> 
        <BrowserRouter> 
          <Navbar onOpenCart={toggleCart} />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Routes> 
            <Route path="/" element={<Index />} /> 
            <Route path="/category/*" element={<Index />} /> 
            <Route path="/product/:slug" element={<ProductDetail />} /> 
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes> 
        </BrowserRouter> 
      </EcommerceProvider> 
    </TooltipProvider> 
  ); 
};

export default App;