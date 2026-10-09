import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Sparkles } from 'lucide-react';

export const NewArrivalsPage: React.FC = () => {
  const { products } = useStore();
  const newArrivals = products.filter(p => p.isNewArrival || new Date(p.createdAt).getTime() > new Date('2026-09-01').getTime());

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#DCE6D2] text-[#063D30] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F0787B]" />
            <span>Fresh Off The Runway</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E]">
            New Arrivals — Autumn 2026
          </h1>
          <p className="text-xs sm:text-sm text-[#6D746E] mt-1">
            The latest additions to our curated store. High performance tech, linen apparel, and home additions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
