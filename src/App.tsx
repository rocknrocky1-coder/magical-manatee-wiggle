import { Toaster } from "@/components/ui/toaster"; 
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound"; 
import ProductDetail from "./pages/ProductDetail";
import { EcommerceProvider } from "./context/EcommerceContext";

const App = () => ( 
  <TooltipProvider> 
    <Toaster /> 
    <EcommerceProvider> 
      <BrowserRouter> 
        <Routes> 
          <Route path="/" element={<Index />} /> 
          <Route path="/category/*" element={<Index />} /> 
          <Route path="/product/:slug" element={<ProductDetail />} /> 
          <Route path="*" element={<NotFound />} /> 
        </Routes> 
      </BrowserRouter> 
    </EcommerceProvider> 
  </TooltipProvider> 
); 

export default App;