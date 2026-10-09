import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { CategoryNav } from './components/common/CategoryNav';
import { Footer } from './components/common/Footer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DealsPage } from './pages/DealsPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { BrandsPage } from './pages/BrandsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { LoginPage } from './pages/LoginPage';
import { AccountPage } from './pages/AccountPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const MainLayout: React.FC = () => {
  const { currentRoute } = useStore();

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'category':
        return <CategoryPage />;
      case 'product-details':
        return <ProductDetailPage />;
      case 'deals':
        return <DealsPage />;
      case 'new-arrivals':
        return <NewArrivalsPage />;
      case 'brands':
        return <BrandsPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'login':
        return <LoginPage />;
      case 'account':
        return <AccountPage />;
      case 'orders':
        return <OrdersPage />;
      case 'track-order':
        return <TrackOrderPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'shipping-returns':
        return <ShippingReturnsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#17231E]">
      <AnnouncementBar />
      <Header />
      <CategoryNav />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />

      {/* Overlays & Portals */}
      <QuickViewModal />
      <CartDrawer />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}

export default App;
