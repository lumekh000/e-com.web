import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Flame, Clock } from 'lucide-react';

export const DealsPage: React.FC = () => {
  const { products } = useStore();
  const dealProducts = products.filter(p => p.discountPercentage || p.isDeal);

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Sale Header Banner */}
        <div className="bg-[#063D30] text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#F0787B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Flame className="w-4 h-4 animate-pulse" />
              <span>Limited Time Seasonal Event</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold">
              Exclusive Deals & Discounts
            </h1>
            <p className="text-xs sm:text-sm text-[#DCE6D2]/90 leading-relaxed font-light">
              Save up to 40% off select audio gear, French linen apparel, bio-active skincare, and ceramic decor. Limited stock remaining.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#DCE6D2] pt-2">
              <Clock className="w-4 h-4 text-[#F0787B]" />
              <span>Event Ends: October 31, 2026 • Code <strong>WELCOME20</strong> for extra 20% off</span>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
