import React, { useState } from 'react';
import {
  ChevronDown,
  Sparkles,
  PackageCheck,
  Grid,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

export const CategoryNav: React.FC = () => {
  const { currentRoute, navigate, setSelectedCategory } = useStore();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Shop All', route: 'shop' },
    { label: 'Deals & Sale', route: 'deals', badge: 'Up to 40%' },
    { label: 'New Arrivals', route: 'new-arrivals', icon: Sparkles },
    { label: 'Brands', route: 'brands' },
    { label: 'Inspiration & About', route: 'about' },
    { label: 'Track Order', route: 'track-order', icon: PackageCheck },
  ];

  return (
    <div className="hidden lg:block bg-[#022C23] border-b border-[#063D30]/60 text-white text-xs font-medium relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* All Categories Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button
              onClick={() => { navigate('shop'); setSelectedCategory('all'); }}
              className="flex items-center gap-2 bg-[#063D30] hover:bg-[#063D30]/90 text-[#DCE6D2] font-semibold py-3 px-5 transition-colors border-r border-[#022C23]"
            >
              <Grid className="w-4 h-4 text-[#DCE6D2]" />
              <span>All Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            {megaMenuOpen && (
              <div className="absolute top-full left-0 w-[680px] bg-white text-[#17231E] rounded-b-2xl shadow-2xl border border-[#063D30]/10 p-6 grid grid-cols-2 gap-4 animate-in fade-in duration-200 z-50">
                {CATEGORIES.map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      navigate('category');
                      setMegaMenuOpen(false);
                    }}
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F8F7F2] cursor-pointer group transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#EAE6D8] relative">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#063D30] group-hover:text-[#022C23] flex items-center gap-1.5">
                        <span>{cat.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-[11px] text-[#6D746E] line-clamp-1">{cat.description}</p>
                      <span className="text-[10px] text-[#063D30]/60 font-semibold">{cat.itemCount} Items</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.route as any)}
                  className={`px-4 py-3 rounded-md transition-colors relative flex items-center gap-1.5 tracking-wide ${
                    isActive
                      ? 'text-[#DCE6D2] font-bold bg-[#063D30]/40'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#DCE6D2]" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-[#F0787B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ml-1 animate-subtle-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#DCE6D2] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Helpline Tag */}
          <div className="text-right text-[11px] text-[#DCE6D2]/80 font-normal">
            Need advice? <span className="text-white font-semibold cursor-pointer hover:underline" onClick={() => navigate('contact')}>Live Support</span>
          </div>

        </div>
      </div>
    </div>
  );
};
