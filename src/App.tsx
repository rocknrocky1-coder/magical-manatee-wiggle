import { Toaster } from "@/components/ui/toaster"; 
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound"; 
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { EcommerceProvider } from "./context/EcommerceContext";
import { Navbar } from "@/components/layout/Navbar";

const App = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return ( 
    <TooltipProvider> 
      <Toaster /> 
      <EcommerceProvider> 
        <BrowserRouter> 
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <Routes> 
            <Route path="/" element={<Index />} /> 
            <Route path="/category/*" element={<Index />} /> 
            <Route path="/product/:slug" element={<ProductDetail />} /> 
            <Route path="/cart" element={<Cart />} /> 
            <Route path="*" element={<NotFound />} /> 
          </Routes> 
        </BrowserRouter> 
      </EcommerceProvider> 
    </TooltipProvider> 
  ); 
}; 

export default App;