import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { ArrowLeft, Grid } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { selectedCategory, products, navigate, setSelectedCategory } = useStore();

  const currentCatInfo = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];
  const categoryProducts = products.filter(p => p.category === currentCatInfo.id);

  return (
    <div className="bg-[#F8F7F2] min-h-screen pb-16">

      {/* Category Hero Banner */}
      <div className="relative bg-[#063D30] text-white py-16 overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-20">
          <img src={currentCatInfo.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs text-[#DCE6D2] hover:underline mb-4 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <span className="bg-[#DCE6D2] text-[#063D30] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Category Collection
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
                {currentCatInfo.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#DCE6D2]/90 mt-2 max-w-xl font-light">
                {currentCatInfo.description}
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-2xl font-serif font-bold text-[#DCE6D2]">{categoryProducts.length}</span>
              <p className="text-xs text-[#DCE6D2]/80">Curated Items Available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Pills Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#063D30] text-[#DCE6D2] shadow-md'
                  : 'bg-white text-[#17231E] hover:bg-[#EAE6D8] border border-[#063D30]/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#063D30]/10 text-center space-y-4 shadow-sm">
            <Grid className="w-12 h-12 text-[#063D30]/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#17231E]">No items currently in this category</h3>
            <p className="text-xs text-[#6D746E]">Check back soon or explore our full shop catalog.</p>
            <button
              onClick={() => navigate('shop')}
              className="bg-[#063D30] text-white font-semibold text-xs py-2.5 px-6 rounded-full"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
