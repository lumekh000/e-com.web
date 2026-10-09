import React from 'react';
import { BRANDS } from '../data/brands';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '../types';

export const BrandsPage: React.FC = () => {
  const { navigate, setSelectedCategory } = useStore();

  const handleBrandCategoryClick = (cat: string) => {
    setSelectedCategory(cat as ProductCategory);
    navigate('category');
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="bg-[#DCE6D2] text-[#063D30] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Curated Artisans & Labs
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E] mt-2">
            Featured Partner Brands
          </h1>
          <p className="text-xs sm:text-sm text-[#6D746E] mt-2 leading-relaxed">
            We partner exclusively with ethical workshops, acoustic labs, and organic botanists who share our commitment to craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map(brand => (
            <div
              key={brand.id}
              onClick={() => handleBrandCategoryClick(brand.featuredCategory)}
              className="bg-white rounded-3xl border border-[#063D30]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden relative bg-[#EAE6D8]">
                <img
                  src={brand.heroImage}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#063D30] text-[#DCE6D2] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {brand.logoText}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#17231E] group-hover:text-[#063D30] transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-[#6D746E] mt-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-[#063D30] font-semibold">
                    {brand.productCount} Signature Items
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#063D30] text-[#DCE6D2] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
