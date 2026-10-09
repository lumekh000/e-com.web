export type ProductCategory =
  | 'electronics'
  | 'fashion'
  | 'home-living'
  | 'beauty'
  | 'sports'
  | 'toys-kids'
  | 'books'
  | 'pet-supplies';

export interface ProductVariant {
  color?: string;
  size?: string;
  sku?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isTopPick?: boolean;
  isFeatured?: boolean;
  isDeal?: boolean;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend?: number;
  description: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  trackingNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: ShippingAddress[];
  savedPaymentMethods: { id: string; type: string; last4: string; exp: string }[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  iconName: string;
  description: string;
  image: string;
  itemCount: number;
  bgPastel: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  logoText: string;
  description: string;
  featuredCategory: string;
  productCount: number;
  heroImage: string;
}

export interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'category'
  | 'product-details'
  | 'search'
  | 'deals'
  | 'new-arrivals'
  | 'brands'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'login'
  | 'account'
  | 'orders'
  | 'track-order'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping-returns'
  | 'privacy'
  | 'terms'
  | 'admin'
  | '404';
