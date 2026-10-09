import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Product,
  CartItem,
  Coupon,
  Order,
  OrderStatus,
  ShippingAddress,
  UserProfile,
  PageRoute,
  NotificationToast,
  ProductCategory
} from '../types';
import { PRODUCTS } from '../data/products';
import confetti from 'canvas-confetti';

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'VIVA10', discountType: 'percentage', value: 10, description: '10% off your entire order' },
  { code: 'WELCOME20', discountType: 'percentage', value: 20, minSpend: 100, description: '20% off orders above $100' },
  { code: 'FREESHIP', discountType: 'fixed', value: 15, description: 'Free shipping discount ($15 off)' },
  { code: 'SUMMER40', discountType: 'percentage', value: 40, minSpend: 200, description: '40% seasonal sale discount' },
];

const DEFAULT_USER: UserProfile = {
  id: 'usr-1',
  name: 'Camille Laurent',
  email: 'camille@viva.lifestyle',
  phone: '+1 (555) 234-8901',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  addresses: [
    {
      fullName: 'Camille Laurent',
      email: 'camille@viva.lifestyle',
      phone: '+1 (555) 234-8901',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
      isDefault: true
    }
  ],
  savedPaymentMethods: [
    { id: 'pm-1', type: 'Visa', last4: '4242', exp: '12/28' }
  ]
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-89201',
    trackingNumber: 'TRK-98214059',
    date: '2026-10-01',
    items: [
      {
        productId: 'p1',
        productName: 'Acoustic Clarity Noise Cancelling Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        price: 249.00,
        quantity: 1,
        selectedColor: 'Forest Green'
      },
      {
        productId: 'p3',
        productName: 'Minimalist 10% Niacinamide + Zinc Serum',
        productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
        price: 34.00,
        quantity: 2
      }
    ],
    subtotal: 317.00,
    discount: 31.70,
    shippingFee: 0,
    tax: 22.82,
    total: 308.12,
    status: 'shipped',
    shippingAddress: DEFAULT_USER.addresses[0],
    paymentMethod: 'Visa ending in 4242',
    estimatedDelivery: 'October 12, 2026'
  },
  {
    id: 'ORD-89144',
    trackingNumber: 'TRK-77123904',
    date: '2026-09-18',
    items: [
      {
        productId: 'p2',
        productName: 'French Flax Linen Casual Shirt',
        productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
        price: 89.00,
        quantity: 1,
        selectedColor: 'Sage Green',
        selectedSize: 'M'
      }
    ],
    subtotal: 89.00,
    discount: 0,
    shippingFee: 10,
    tax: 7.12,
    total: 106.12,
    status: 'delivered',
    shippingAddress: DEFAULT_USER.addresses[0],
    paymentMethod: 'Apple Pay',
    estimatedDelivery: 'September 22, 2026'
  }
];

interface StoreContextType {
  // Navigation & Route
  currentRoute: PageRoute;
  routeParams: Record<string, any>;
  navigate: (route: PageRoute, params?: Record<string, any>) => void;

  // Products
  products: Product[];
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartDiscount: number;
  cartShippingFee: number;
  cartTax: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  user: UserProfile | null;
  isLoggedIn: boolean;
  loginUser: (email: string) => void;
  logoutUser: () => void;

  // Orders
  orders: Order[];
  createOrder: (shippingAddress: ShippingAddress, paymentMethod: string) => Order;
  lastPlacedOrder: Order | null;
  trackingOrderSearch: Order | null;
  searchOrderTracking: (query: string) => Order | null;

  // Admin Management
  adminProducts: Product[];
  adminAddProduct: (product: Product) => void;
  adminUpdateProduct: (product: Product) => void;
  adminDeleteProduct: (productId: string) => void;
  adminOrders: Order[];
  adminUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Notifications
  toasts: NotificationToast[];
  addToast: (title: string, message: string, type?: NotificationToast['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});

  // Products
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Cart & Wishlist (with localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('viva_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1, selectedColor: 'Forest Green' },
        { product: PRODUCTS[2], quantity: 1 }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('viva_wishlist');
      return saved ? JSON.parse(saved) : ['p1', 'p4'];
    } catch {
      return ['p1', 'p4'];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // User
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [trackingOrderSearch, setTrackingOrderSearch] = useState<Order | null>(null);

  // Admin Editable State
  const [adminProducts, setAdminProducts] = useState<Product[]>(PRODUCTS);
  const [adminOrders, setAdminOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Toasts
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  // Persist cart & wishlist
  useEffect(() => {
    localStorage.setItem('viva_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('viva_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const addToast = (title: string, message: string, type: NotificationToast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation Helper
  const navigate = (route: PageRoute, params?: Record<string, any>) => {
    setCurrentRoute(route);
    if (params) setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
    const size = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart(prev => {
      const existingIndex = prev.findIndex(item =>
        item.product.id === product.id &&
        item.selectedColor === color &&
        item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });

    addToast('Added to Cart', `${product.name} has been added to your shopping cart.`);
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
    setCart(prev => prev.filter(item => !(
      item.product.id === productId &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize
    )));
    addToast('Removed from Cart', 'Item removed from your cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.value) / 100;
    } else {
      cartDiscount = appliedCoupon.value;
    }
  }

  const FREE_SHIPPING_THRESHOLD = 150;
  const cartShippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 15;
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.08 * 100) / 100;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee + cartTax);

  // Coupon Logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find(c => c.code === cleanCode);

    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try VIVA10 or WELCOME20.' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return { success: false, message: `Minimum order spend of $${found.minSpend} required for code ${cleanCode}.` };
    }

    setAppliedCoupon(found);
    addToast('Coupon Applied', `Code ${found.code} applied! ${found.description}`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'Coupon code removed.', 'info');
  };

  // Wishlist Logic
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const targetProduct = PRODUCTS.find(p => p.id === productId);
      if (exists) {
        addToast('Removed from Wishlist', `${targetProduct?.name || 'Item'} removed from wishlist.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to Wishlist', `${targetProduct?.name || 'Item'} saved to your wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User Auth
  const loginUser = (email: string) => {
    setIsLoggedIn(true);
    setUser({
      ...DEFAULT_USER,
      email
    });
    addToast('Welcome Back', `Logged in as ${email}`);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
    addToast('Logged Out', 'You have been logged out safely.', 'info');
  };

  // Create Order
  const createOrder = (shippingAddress: ShippingAddress, paymentMethod: string): Order => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNum = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: orderId,
      trackingNumber: trackingNum,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(c => ({
        productId: c.product.id,
        productName: c.product.name,
        productImage: c.product.images[0],
        price: c.product.price,
        quantity: c.quantity,
        selectedColor: c.selectedColor,
        selectedSize: c.selectedSize
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: cartShippingFee,
      tax: cartTax,
      total: cartTotal,
      status: 'placed',
      shippingAddress,
      paymentMethod,
      estimatedDelivery: 'Estimated 3-5 Business Days'
    };

    setOrders(prev => [newOrder, ...prev]);
    setAdminOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    addToast('Order Placed Successfully!', `Order #${newOrder.id} has been confirmed.`);
    return newOrder;
  };

  const searchOrderTracking = (query: string): Order | null => {
    const found = orders.find(o =>
      o.id.toLowerCase() === query.trim().toLowerCase() ||
      o.trackingNumber.toLowerCase() === query.trim().toLowerCase()
    );
    setTrackingOrderSearch(found || null);
    return found || null;
  };

  // Admin Operations
  const adminAddProduct = (product: Product) => {
    setAdminProducts(prev => [product, ...prev]);
    addToast('Product Created', `${product.name} added to catalog.`);
  };

  const adminUpdateProduct = (updated: Product) => {
    setAdminProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    addToast('Product Updated', `${updated.name} updated successfully.`);
  };

  const adminDeleteProduct = (productId: string) => {
    setAdminProducts(prev => prev.filter(p => p.id !== productId));
    addToast('Product Removed', 'Product archived from catalog.', 'warning');
  };

  const adminUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addToast('Order Status Updated', `Order #${orderId} status changed to ${status}.`);
  };

  return (
    <StoreContext.Provider value={{
      currentRoute,
      routeParams,
      navigate,
      products: adminProducts,
      selectedCategory,
      setSelectedCategory,
      selectedProduct,
      setSelectedProduct,
      searchQuery,
      setSearchQuery,
      quickViewProduct,
      setQuickViewProduct,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      cartSubtotal,
      cartItemCount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      cartDiscount,
      cartShippingFee,
      cartTax,
      cartTotal,
      wishlist,
      toggleWishlist,
      isInWishlist,
      user,
      isLoggedIn,
      loginUser,
      logoutUser,
      orders,
      createOrder,
      lastPlacedOrder,
      trackingOrderSearch,
      searchOrderTracking,
      adminProducts,
      adminAddProduct,
      adminUpdateProduct,
      adminDeleteProduct,
      adminOrders,
      adminUpdateOrderStatus,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
