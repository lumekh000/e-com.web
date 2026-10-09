import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Leaf,
  ShieldAlert
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const {
    navigate,
    currentRoute,
    cartItemCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsSearchOpen,
    isLoggedIn,
    user
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      navigate('shop');
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#063D30]/95 backdrop-blur-md text-white shadow-lg border-b border-[#022C23]'
        : 'bg-[#063D30] text-white border-b border-[#022C23]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-[#DCE6D2]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#DCE6D2] flex items-center justify-center text-[#063D30] shadow-inner group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-[#063D30]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#DCE6D2] transition-colors leading-none">
                VIVA
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-medium text-[#DCE6D2]/80 mt-0.5">
                Live Better
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg mx-6 relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search across 500+ premium products, brands & categories..."
                className="w-full bg-white/10 border border-white/15 text-white placeholder-white/60 text-xs rounded-full py-2.5 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-[#DCE6D2] focus:bg-white/20 transition-all"
              />
              <Search className="w-4 h-4 text-white/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#DCE6D2] text-[#063D30] p-1.5 rounded-full hover:bg-white transition-colors"
                title="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* Admin Switch Link */}
            <button
              onClick={() => navigate('admin')}
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                currentRoute === 'admin'
                  ? 'bg-[#F0787B] text-white border-transparent'
                  : 'bg-white/10 hover:bg-white/20 text-[#DCE6D2] border-white/15'
              }`}
              title="Store Admin Management"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Quick Search Mobile Modal Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 text-[#DCE6D2] transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => navigate(isLoggedIn ? 'account' : 'login')}
              className="p-2 rounded-full hover:bg-white/10 text-[#DCE6D2] transition-colors flex items-center gap-1.5"
              title={isLoggedIn ? `Account: ${user?.name}` : 'Login / Register'}
            >
              <User className="w-5 h-5" />
              {isLoggedIn && (
                <span className="hidden sm:inline text-xs font-medium text-white/90 max-w-[80px] truncate">
                  {user?.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigate('wishlist')}
              className="p-2 rounded-full hover:bg-white/10 text-[#DCE6D2] transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F0787B] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full bg-[#DCE6D2] text-[#063D30] hover:bg-white transition-all transform active:scale-95 flex items-center gap-2 shadow-sm font-semibold text-xs"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 fill-[#063D30]" />
              <span className="font-bold">{cartItemCount}</span>
            </button>

          </div>

        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 text-xs rounded-full py-2 pl-9 pr-8 focus:outline-none focus:bg-white/20"
            />
            <Search className="w-3.5 h-3.5 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </form>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#022C23] border-t border-[#063D30] px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3 text-sm">
            <button
              onClick={() => { navigate('home'); setMobileMenuOpen(false); }}
              className={`text-left font-medium py-1.5 px-3 rounded-lg ${currentRoute === 'home' ? 'bg-[#063D30] text-[#DCE6D2]' : 'text-white/80 hover:text-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => { navigate('shop'); setMobileMenuOpen(false); }}
              className={`text-left font-medium py-1.5 px-3 rounded-lg ${currentRoute === 'shop' ? 'bg-[#063D30] text-[#DCE6D2]' : 'text-white/80 hover:text-white'}`}
            >
              Shop All Products
            </button>
            <button
              onClick={() => { navigate('deals'); setMobileMenuOpen(false); }}
              className={`text-left font-medium py-1.5 px-3 rounded-lg flex items-center justify-between ${currentRoute === 'deals' ? 'bg-[#063D30] text-[#DCE6D2]' : 'text-white/80 hover:text-white'}`}
            >
              <span>Deals & Discounts</span>
              <span className="bg-[#F0787B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">UP TO 40%</span>
            </button>
            <button
              onClick={() => { navigate('new-arrivals'); setMobileMenuOpen(false); }}
              className={`text-left font-medium py-1.5 px-3 rounded-lg ${currentRoute === 'new-arrivals' ? 'bg-[#063D30] text-[#DCE6D2]' : 'text-white/80 hover:text-white'}`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => { navigate('brands'); setMobileMenuOpen(false); }}
              className={`text-left font-medium py-1.5 px-3 rounded-lg ${currentRoute === 'brands' ? 'bg-[#063D30] text-[#DCE6D2]' : 'text-white/80 hover:text-white'}`}
            >
              Brands
            </button>
            <button
              onClick={() => { navigate('track-order'); setMobileMenuOpen(false); }}
              className={`text-left font-medium py-1.5 px-3 rounded-lg ${currentRoute === 'track-order' ? 'bg-[#063D30] text-[#DCE6D2]' : 'text-white/80 hover:text-white'}`}
            >
              Track Order
            </button>
            <button
              onClick={() => { navigate('about'); setMobileMenuOpen(false); }}
              className="text-left font-medium py-1.5 px-3 rounded-lg text-white/80 hover:text-white"
            >
              About VIVA
            </button>
            <button
              onClick={() => { navigate('contact'); setMobileMenuOpen(false); }}
              className="text-left font-medium py-1.5 px-3 rounded-lg text-white/80 hover:text-white"
            >
              Contact Us
            </button>
            <button
              onClick={() => { navigate('admin'); setMobileMenuOpen(false); }}
              className="text-left font-medium py-1.5 px-3 rounded-lg text-[#F0787B] font-semibold flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
