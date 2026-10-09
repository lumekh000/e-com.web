import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, Tag } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSearchQuery, navigate, setSelectedCategory } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Noise Cancelling Headphones',
    'Linen Shirt',
    'Niacinamide Serum',
    'Espresso Machine',
    'Travel Backpack',
    'Wireless Charger'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm);
      setIsSearchOpen(false);
      navigate('shop');
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setIsSearchOpen(false);
    navigate('shop');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Container */}
      <div className="relative bg-[#F8F7F2] rounded-3xl max-w-2xl w-full border border-[#063D30]/20 shadow-2xl p-6 z-10 animate-in fade-in duration-200">

        {/* Header Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search VIVA products, categories, materials..."
            className="w-full bg-white text-[#17231E] border border-[#063D30]/20 text-sm rounded-full py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[#063D30] shadow-inner"
            autoFocus
          />
          <Search className="w-5 h-5 text-[#063D30] absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Popular Searches */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D30]/70 mb-3 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>Popular Trending Keywords</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map(term => (
              <button
                key={term}
                onClick={() => handleTagClick(term)}
                className="bg-white hover:bg-[#063D30] hover:text-white text-[#17231E] text-xs font-medium py-1.5 px-3.5 rounded-full border border-[#063D30]/10 transition-colors shadow-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Explore Categories */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D30]/70 mb-3">
            Browse By Category
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.slice(0, 8).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsSearchOpen(false);
                  navigate('category');
                }}
                className="bg-white hover:border-[#063D30] p-3 rounded-2xl border border-[#063D30]/10 text-left transition-all group flex flex-col justify-between"
              >
                <span className="font-semibold text-xs text-[#17231E] group-hover:text-[#063D30]">{cat.name}</span>
                <span className="text-[10px] text-[#6D746E] mt-1">{cat.itemCount} items</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
