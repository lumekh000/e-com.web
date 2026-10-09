import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import {
  Headphones,
  Shirt,
  Home,
  Sparkles,
  Activity,
  Gamepad2,
  BookOpen,
  Dog,
  Grid
} from 'lucide-react';
import type { ProductCategory } from '../../types';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Headphones,
  Shirt,
  Home,
  Sparkles,
  Activity,
  Gamepad2,
  BookOpen,
  Dog
};

export const ShopByCategory: React.FC = () => {
  const { navigate, setSelectedCategory } = useStore();

  const handleCategoryClick = (catId: ProductCategory | 'all') => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      navigate('shop');
    } else {
      navigate('category');
    }
  };

  return (
    <section className="py-16 bg-[#F8F7F2] border-b border-[#063D30]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title & Subheading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#063D30] bg-[#DCE6D2] px-3 py-1 rounded-full">
              Explore Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17231E] mt-2">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick('all')}
            className="text-xs font-semibold text-[#063D30] hover:underline flex items-center gap-1.5"
          >
            <span>View All Categories</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Circular Categories Grid / Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">

          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Grid;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center shrink-0 w-24 sm:w-28 cursor-pointer group"
              >
                {/* Circular Icon Enclosure */}
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${cat.bgPastel} border border-[#063D30]/10 flex items-center justify-center p-3 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 relative overflow-hidden`}>

                  {/* Subtle Background Image Mask */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                  />

                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#063D30] flex items-center justify-center shadow-inner relative z-10 group-hover:bg-[#063D30] group-hover:text-white transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Label */}
                <span className="text-xs font-semibold text-[#17231E] group-hover:text-[#063D30] text-center mt-3 line-clamp-1 transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#6D746E]">
                  {cat.itemCount} Items
                </span>
              </div>
            );
          })}

          {/* View All Circle */}
          <div
            onClick={() => handleCategoryClick('all')}
            className="flex flex-col items-center shrink-0 w-24 sm:w-28 cursor-pointer group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#063D30] text-[#DCE6D2] border border-[#022C23] flex items-center justify-center shadow-md group-hover:bg-[#022C23] group-hover:scale-105 transition-all duration-300">
              <Grid className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#063D30] text-center mt-3">
              View All
            </span>
            <span className="text-[10px] text-[#6D746E]">500+ Items</span>
          </div>

        </div>

      </div>
    </section>
  );
};
