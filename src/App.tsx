import { CartDrawer } from "@/components/layout/CartDrawer";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return ( 
    <TooltipProvider> 
      <Toaster /> 
      <EcommerceProvider> 
        <BrowserRouter> 
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
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