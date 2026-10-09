import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, Home, Cpu } from 'lucide-react';
import type { ProductCategory } from '../../types';

export const PromoBannersSection: React.FC = () => {
  const { navigate, setSelectedCategory } = useStore();

  const banners = [
    {
      id: 'b1',
      title: 'Fresh Styles Just In',
      subtitle: 'New Arrivals 2026',
      description: 'Discover organic French flax linen shirts, breathable dresses & minimalist accessories.',
      category: 'fashion' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
      bgColor: 'bg-[#F4EFE6]',
      badge: 'NEW ARRIVAL',
      icon: Sparkles
    },
    {
      id: 'b2',
      title: 'Make Your Space Better',
      subtitle: 'Home & Living Refresh',
      description: 'Handcrafted ceramic lamps, espresso makers & artisanal living room accents.',
      category: 'home-living' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      bgColor: 'bg-[#EBEFEA]',
      badge: 'HOME EDIT',
      icon: Home
    },
    {
      id: 'b3',
      title: 'Upgrade Your Lifestyle',
      subtitle: 'Tech Essentials',
      description: 'Studio-grade noise cancelling acoustics, titanium smartwatches & power accessories.',
      category: 'electronics' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      bgColor: 'bg-[#EAF0EC]',
      badge: 'PRO TECH',
      icon: Cpu
    }
  ];

  const handleBannerClick = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    navigate('category');
  };

  return (
    <section className="py-16 bg-[#F8F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => {
            const Icon = banner.icon;
            return (
              <div
                key={banner.id}
                onClick={() => handleBannerClick(banner.category)}
                className={`relative rounded-3xl ${banner.bgColor} border border-[#063D30]/10 overflow-hidden p-6 sm:p-8 flex flex-col justify-between h-[360px] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                {/* Background Image Overlay with Gradient */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-[#063D30] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    <Icon className="w-3 h-3 text-[#F0787B]" />
                    <span>{banner.badge}</span>
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 text-white space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#DCE6D2]">
                    {banner.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-tight group-hover:text-[#DCE6D2] transition-colors">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-light">
                    {banner.description}
                  </p>

                  <div className="pt-2">
                    <button className="inline-flex items-center gap-2 bg-[#063D30] group-hover:bg-[#022C23] text-white text-xs font-bold py-2.5 px-5 rounded-full shadow-md transition-all">
                      <span>Shop Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#DCE6D2] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
