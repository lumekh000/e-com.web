import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const TopPicksSection: React.FC = () => {
  const { products, navigate } = useStore();

  // Filter top picks or featured items
  const topPicks = products.filter(p => p.isTopPick || p.isFeatured).slice(0, 8);

  return (
    <section className="py-20 bg-[#F8F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#063D30] bg-[#DCE6D2] px-3.5 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 text-[#F0787B]" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E]">
              Top Picks For You
            </h2>
            <p className="text-xs sm:text-sm text-[#6D746E] mt-1 max-w-md">
              Handpicked customer favorites across audio tech, French linen fashion, organic skincare, and home essentials.
            </p>
          </div>

          <button
            onClick={() => navigate('shop')}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#063D30] hover:text-[#022C23] transition-colors"
          >
            <span>See All Deals & Products</span>
            <div className="w-7 h-7 rounded-full bg-[#063D30] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-[#DCE6D2]" />
            </div>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
