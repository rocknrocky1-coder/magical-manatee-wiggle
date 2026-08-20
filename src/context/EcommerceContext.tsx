"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ProductVariant, 
  CartItem, 
  Coupon, 
  Order, 
  Address, 
  InventoryLog,
  UserReview,
  OrderStatus,
  PaymentMethod,
  CustomerAccount
} from '../types/ecommerce';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_REVIEWS } from '../data/mockData';
import { toast } from 'sonner';

interface SystemSettings {
  returnsEnabled: boolean;
  exchangesEnabled: boolean;
  returnWindowDays: number;
  exchangeWindowDays: number;
  freeShippingThreshold: number;
  defaultShippingFee: number;
  defaultGstPercentage: number;
  storeName: string;
  supportEmail: string;
  supportPhone: string;
}

interface EcommerceContextType {
  // Customer account
  account: CustomerAccount | null;
  signIn: (email: string, password: string) => { success: boolean; message: string };
  signUp: (name: string, email: string, phone: string, password: string) => { success: boolean; message: string };
  signOut: () => void;
  updateAccount: (details: Pick<CustomerAccount, 'name' | 'email' | 'phone'>) => { success: boolean; message: string };

  // Catalog
  products: Product[];
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  appliedCoupon: Coupon | null;
  couponDiscountAmount: number;
  gstAmount: number;
  shippingFee: number;
  grandTotal: number;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => boolean;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Wishlist
  wishlist: string[]; // product ids
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Address;
  deleteAddress: (id: string) => void;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
  }) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
  requestReturn: (orderId: string, reason: string) => boolean;
  requestExchange: (orderId: string, reason: string) => boolean;

  // Admin Controls
  adminRole: 'super_admin' | 'inventory_manager' | 'order_manager' | null;
  setAdminRole: (role: 'super_admin' | 'inventory_manager' | 'order_manager' | null) => void;
  inventoryLogs: InventoryLog[];
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  updateProductStock: (variantId: string, newStock: number, note?: string) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string, trackingNumber?: string) => void;
  coupons: Coupon[];
  saveCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Reviews
  reviews: Record<string, UserReview[]>;
  addReview: (productId: string, review: Omit<UserReview, 'id' | 'date'>) => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<CustomerAccount[]>(() => {
    const saved = localStorage.getItem('tirzah_accounts');
    return saved ? JSON.parse(saved) : [];
  });

  const [account, setAccount] = useState<CustomerAccount | null>(() => {
    const saved = localStorage.getItem('tirzah_current_account');
    return saved ? JSON.parse(saved) : null;
  });

  // Hydrated State from LocalStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('tirzah_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tirzah_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tirzah_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('tirzah_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('tirzah_addresses');
    return saved ? JSON.parse(saved) : [
      {
        id: 'addr-default-1',
        name: 'Priyanka Verma',
        phone: '9876543210',
        addressLine1: 'Flat 402, Lotus Greens, Sector 50',
        addressLine2: 'Near Central Park',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301',
        isDefault: true,
        type: 'home'
      }
    ];
  });

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses[0]?.id || null
  );

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('tirzah_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(() => {
    const saved = localStorage.getItem('tirzah_inv_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('tirzah_coupons_list');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [reviews, setReviews] = useState<Record<string, UserReview[]>>(() => {
    const saved = localStorage.getItem('tirzah_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('tirzah_settings');
    return saved ? JSON.parse(saved) : {
      returnsEnabled: true,
      exchangesEnabled: true,
      returnWindowDays: 7,
      exchangeWindowDays: 10,
      freeShippingThreshold: 1999,
      defaultShippingFee: 99,
      defaultGstPercentage: 5,
      storeName: 'TIRZAH Indian Luxury',
      supportEmail: 'care@tirzahfashion.com',
      supportPhone: '+91 8000 123 456'
    };
  });

  const [adminRole, setAdminRole] = useState<'super_admin' | 'inventory_manager' | 'order_manager' | null>('super_admin');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('tirzah_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (account) {
      localStorage.setItem('tirzah_current_account', JSON.stringify(account));
    } else {
      localStorage.removeItem('tirzah_current_account');
    }
  }, [account]);

  useEffect(() => {
    localStorage.setItem('tirzah_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tirzah_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tirzah_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tirzah_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('tirzah_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('tirzah_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('tirzah_inv_logs', JSON.stringify(inventoryLogs));
  }, [inventoryLogs]);

  useEffect(() => {
    localStorage.setItem('tirzah_coupons_list', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('tirzah_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('tirzah_settings', JSON.stringify(settings));
  }, [settings]);

  // Helpers
  const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
  const getProductById = (id: string) => products.find(p => p.id === id);
  const getOrderById = (id: string) => orders.find(o => o.id === id || o.orderNumber === id);

  const signIn = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = accounts.find(item => item.email.toLowerCase() === normalizedEmail);
    if (!found || found.password !== password) {
      return { success: false, message: 'The email or password is incorrect.' };
    }
    setAccount(found);
    toast.success(`Welcome back, ${found.name}`);
    return { success: true, message: 'Signed in successfully.' };
  };

  const signUp = (name: string, email: string, phone: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (accounts.some(item => item.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newAccount: CustomerAccount = {
      id: `customer-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
    };
    setAccounts(previous => [...previous, newAccount]);
    setAccount(newAccount);
    toast.success('Your Tirzha account is ready');
    return { success: true, message: 'Account created successfully.' };
  };

  const signOut = () => {
    setAccount(null);
    toast.success('You have been signed out');
  };

  const updateAccount = (details: Pick<CustomerAccount, 'name' | 'email' | 'phone'>) => {
    if (!account) return { success: false, message: 'Please sign in first.' };
    const normalizedEmail = details.email.trim().toLowerCase();
    const emailInUse = accounts.some(item => item.id !== account.id && item.email.toLowerCase() === normalizedEmail);
    if (emailInUse) return { success: false, message: 'That email is already linked to another account.' };
    const updated = { ...account, ...details, name: details.name.trim(), email: normalizedEmail, phone: details.phone.trim() };
    setAccounts(previous => previous.map(item => item.id === account.id ? updated : item));
    setAccount(updated);
    toast.success('Profile updated');
    return { success: true, message: 'Profile updated successfully.' };
  };

  // Cart Computations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.variant.sellingPrice * item.quantity), 0);

  // Coupon calculation
  let couponDiscountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.discountValue) / 100;
      couponDiscountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else {
      couponDiscountAmount = appliedCoupon.discountValue;
    }
  }

  // GST Calculation (Embedded in MRP, but computed for invoice transparency)
  const taxableTotal = Math.max(0, cartSubtotal - couponDiscountAmount);
  const gstAmount = Math.round((taxableTotal * (settings.defaultGstPercentage / 100)));
  const shippingFee = cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0 ? 0 : settings.defaultShippingFee;
  const grandTotal = Math.max(0, taxableTotal + shippingFee);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1): boolean => {
    // Check available stock
    const available = variant.stock - variant.reservedStock;
    if (available < quantity) {
      toast.error(`Only ${available} item(s) left in stock for size ${variant.size}`);
      return false;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.variant.id === variant.id);
      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        if (currentQty + quantity > available) {
          toast.error(`Cannot add more than available stock (${available})`);
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: currentQty + quantity
        };
        toast.success(`Updated ${product.name} quantity to ${currentQty + quantity}`);
        return updated;
      } else {
        toast.success(`Added ${product.name} (${variant.size}) to your bag`);
        return [...prev, {
          id: `${variant.id}-${Date.now()}`,
          product,
          variant,
          quantity
        }];
      }
    });
    return true;
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const maxAvail = item.variant.stock - item.variant.reservedStock;
          if (quantity > maxAvail) {
            toast.error(`Only ${maxAvail} items available`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    toast.info('Item removed from shopping bag');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === normalized && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return { 
        success: false, 
        message: `Min order value of ₹${found.minOrderValue.toLocaleString()} required for this coupon` 
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon "${found.code}" applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        toast.info('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        toast.success('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Address
  const addAddress = (addrData: Omit<Address, 'id'>): Address => {
    const newAddr: Address = {
      ...addrData,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [newAddr, ...prev]);
    setSelectedAddressId(newAddr.id);
    toast.success('Address saved successfully');
    return newAddr;
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(addresses.find(a => a.id !== id)?.id || null);
    }
  };

  // Order Creation & Inventory Deductions
  const createOrder = async (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
  }): Promise<Order> => {
    const orderNum = `TRZ-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      variantId: item.variant.id,
      productName: item.product.name,
      size: item.variant.size,
      colorName: item.variant.colorName,
      sku: item.variant.sku,
      barcode: item.variant.barcode,
      unitPrice: item.variant.sellingPrice,
      mrp: item.variant.mrp,
      quantity: item.quantity,
      gstAmount: Math.round((item.variant.sellingPrice * item.quantity * (item.product.gstRate / 100))),
      total: item.variant.sellingPrice * item.quantity,
      image: item.product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      items: orderItems,
      subtotal: cartSubtotal,
      couponDiscount: couponDiscountAmount,
      couponCode: appliedCoupon?.code,
      gstAmount,
      shippingFee,
      totalAmount: grandTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'PENDING' : 'PAID',
      orderStatus: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'CONFIRMED',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${orderData.paymentMethod}. Awaiting dispatch processing.`
        }
      ]
    };

    // Deduct inventory & create audit logs
    const newLogs: InventoryLog[] = [];
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        let hasChanges = false;
        const updatedVariants = prod.variants.map(v => {
          const cartItem = cart.find(ci => ci.variant.id === v.id);
          if (cartItem) {
            hasChanges = true;
            const newStock = Math.max(0, v.stock - cartItem.quantity);
            newLogs.push({
              id: `log-${Date.now()}-${v.id}`,
              variantId: v.id,
              sku: v.sku,
              productName: prod.name,
              changeType: 'ORDER_PLACED',
              quantityChange: -cartItem.quantity,
              previousStock: v.stock,
              newStock,
              timestamp: new Date().toISOString(),
              performedBy: 'Checkout System',
              note: `Order #${orderNum}`
            });
            return {
              ...v,
              stock: newStock
            };
          }
          return v;
        });
        return hasChanges ? { ...prod, variants: updatedVariants } : prod;
      });
    });

    setInventoryLogs(prev => [...newLogs, ...prev]);
    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    return newOrder;
  };

  const requestReturn = (orderId: string, reason: string): boolean => {
    if (!settings.returnsEnabled) {
      toast.error('Returns are currently disabled by store administration');
      return false;
    }

    setOrders(prev => {
      return prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            orderStatus: 'RETURN_REQUESTED',
            returnReason: reason,
            timeline: [
              ...order.timeline,
              {
                status: 'RETURN_REQUESTED',
                timestamp: new Date().toISOString(),
                note: `Customer requested return: "${reason}"`
              }
            ]
          };
        }
        return order;
      });
    });

    toast.success('Return request initiated. Our logistics partner will schedule a quality pickup.');
    return true;
  };

  const requestExchange = (orderId: string, reason: string): boolean => {
    if (!settings.exchangesEnabled) {
      toast.error('Exchanges are currently disabled');
      return false;
    }

    setOrders(prev => {
      return prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            orderStatus: 'EXCHANGE_REQUESTED',
            exchangeReason: reason,
            timeline: [
              ...order.timeline,
              {
                status: 'EXCHANGE_REQUESTED',
                timestamp: new Date().toISOString(),
                note: `Customer requested size/color exchange: "${reason}"`
              }
            ]
          };
        }
        return order;
      });
    });

    toast.success('Exchange request submitted! We will dispatch the replacement upon receipt.');
    return true;
  };

  // Admin Stock Updates
  const updateProductStock = (variantId: string, newStock: number, note?: string) => {
    let logToCreate: InventoryLog | null = null;

    setProducts(prevProducts => {
      return prevProducts.map(product => {
        const variantIndex = product.variants.findIndex(v => v.id === variantId);
        if (variantIndex > -1) {
          const oldVariant = product.variants[variantIndex];
          const diff = newStock - oldVariant.stock;

          logToCreate = {
            id: `log-${Date.now()}-${variantId}`,
            variantId: oldVariant.id,
            sku: oldVariant.sku,
            productName: product.name,
            changeType: 'MANUAL_ADJUSTMENT',
            quantityChange: diff,
            previousStock: oldVariant.stock,
            newStock,
            timestamp: new Date().toISOString(),
            performedBy: 'Admin User',
            note: note || 'Manual inventory update'
          };

          const updatedVariants = [...product.variants];
          updatedVariants[variantIndex] = {
            ...oldVariant,
            stock: newStock
          };
          return { ...product, variants: updatedVariants };
        }
        return product;
      });
    });

    if (logToCreate) {
      setInventoryLogs(prev => [logToCreate!, ...prev]);
      toast.success('Inventory balance updated and logged');
    }
  };

  const saveProduct = (productData: Product) => {
    setProducts(prev => {
      const exists = prev.findIndex(p => p.id === productData.id);
      if (exists > -1) {
        const updated = [...prev];
        updated[exists] = { ...productData, updatedAt: new Date().toISOString() };
        toast.success(`Product "${productData.name}" updated successfully`);
        return updated;
      } else {
        toast.success(`Product "${productData.name}" created!`);
        return [{ ...productData, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...prev];
      }
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast.info('Product archived and removed from catalog');
  };

  const updateOrderStatus = (
    orderId: string, 
    newStatus: OrderStatus, 
    note?: string,
    trackingNumber?: string
  ) => {
    setOrders(prev => {
      return prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: newStatus,
            trackingNumber: trackingNumber || o.trackingNumber,
            shippingProvider: trackingNumber ? 'Shiprocket / Blue Dart' : o.shippingProvider,
            timeline: [
              ...o.timeline,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                note: note || `Status updated to ${newStatus}`
              }
            ]
          };
        }
        return o;
      });
    });
    toast.success(`Order #${orderId} marked as ${newStatus}`);
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    toast.success('System settings saved');
  };

  const saveCoupon = (coupon: Coupon) => {
    setCoupons(prev => {
      const idx = prev.findIndex(c => c.code.toUpperCase() === coupon.code.toUpperCase());
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = coupon;
        return updated;
      }
      return [coupon, ...prev];
    });
    toast.success(`Coupon ${coupon.code} updated`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code.toUpperCase() !== code.toUpperCase()));
    toast.info(`Coupon ${code} removed`);
  };

  const addReview = (productId: string, reviewData: Omit<UserReview, 'id' | 'date'>) => {
    const newRev: UserReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [newRev, ...(prev[productId] || [])]
    }));
    toast.success('Thank you! Your verified review is published.');
  };

  return (
    <EcommerceContext.Provider value={{
      account,
      signIn,
      signUp,
      signOut,
      updateAccount,
      products,
      activeCategory,
      setActiveCategory,
      getProductBySlug,
      getProductById,
      cart,
      cartCount,
      cartSubtotal,
      appliedCoupon,
      couponDiscountAmount,
      gstAmount,
      shippingFee,
      grandTotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      applyCoupon,
      removeCoupon,
      wishlist,
      toggleWishlist,
      isInWishlist,
      addresses,
      addAddress,
      deleteAddress,
      selectedAddressId,
      setSelectedAddressId,
      orders,
      createOrder,
      getOrderById,
      requestReturn,
      requestExchange,
      adminRole,
      setAdminRole,
      inventoryLogs,
      settings,
      updateSettings,
      updateProductStock,
      saveProduct,
      deleteProduct,
      updateOrderStatus,
      coupons,
      saveCoupon,
      deleteCoupon,
      reviews,
      addReview
    }}>
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};