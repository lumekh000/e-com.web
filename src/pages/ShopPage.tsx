import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import {
  Filter,
  X,
  Search,
  RotateCcw
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  // Filters State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyDeals, setOnlyDeals] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');

  // Mobile filter drawer toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state
  const [itemsToShow, setItemsToShow] = useState(8);

  const toggleBrand = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMaxPrice(400);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlyDeals(false);
    setSearchQuery('');
  };

  // Filtered & Sorted Products computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCat = p.categoryName.toLowerCase().includes(query);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTags) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;

      // Stock filter
      if (onlyInStock && !p.inStock) return false;

      // Deals filter
      if (onlyDeals && !p.discountPercentage) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, selectedBrands, maxPrice, minRating, onlyInStock, onlyDeals, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (maxPrice < 400 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlyDeals ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Title & Breadcrumb Header */}
        <div className="mb-8 pb-6 border-b border-[#063D30]/10">
          <div className="flex items-center gap-2 text-xs text-[#6D746E] mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#063D30] font-semibold">Shop Catalog</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E]">
                All Products & Collections
              </h1>
              <p className="text-xs sm:text-sm text-[#6D746E] mt-1">
                Showing {filteredProducts.length} results across premium electronics, linen, skincare & decor.
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden w-full sm:w-auto bg-[#063D30] text-[#DCE6D2] px-5 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters & Sorting ({activeFilterCount})</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-2xl border border-[#063D30]/10 shadow-sm">
            <span className="text-xs font-bold text-[#063D30] mr-2">Active Filters:</span>

            {searchQuery && (
              <span className="bg-[#063D30] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                Search: "{searchQuery}"
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="bg-[#063D30] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                Category: {selectedCategory}
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}

            {selectedBrands.map(b => (
              <span key={b} className="bg-[#063D30] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                Brand: {b}
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => toggleBrand(b)} />
              </span>
            ))}

            {maxPrice < 400 && (
              <span className="bg-[#063D30] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                Under ${maxPrice}
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setMaxPrice(400)} />
              </span>
            )}

            {minRating > 0 && (
              <span className="bg-[#063D30] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                {minRating}+ Stars
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setMinRating(0)} />
              </span>
            )}

            {onlyInStock && (
              <span className="bg-[#063D30] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                In Stock Only
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setOnlyInStock(false)} />
              </span>
            )}

            {onlyDeals && (
              <span className="bg-[#063D30] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                On Sale
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setOnlyDeals(false)} />
              </span>
            )}

            <button
              onClick={handleClearFilters}
              className="text-xs text-[#F0787B] font-bold hover:underline ml-auto flex items-center gap-1 px-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-6">

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-serif font-bold text-base text-[#17231E] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#063D30]" />
                  <span>Filter Products</span>
                </h3>
                {activeFilterCount > 0 && (
                  <button onClick={handleClearFilters} className="text-[11px] text-[#F0787B] font-bold hover:underline">
                    Reset
                  </button>
                )}
              </div>

              {/* Categories Accordion */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D30] mb-3">Categories</h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left py-1.5 px-3 rounded-xl transition-colors font-medium flex items-center justify-between ${
                      selectedCategory === 'all' ? 'bg-[#063D30] text-white' : 'hover:bg-[#F8F7F2] text-[#17231E]'
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{products.length}</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left py-1.5 px-3 rounded-xl transition-colors font-medium flex items-center justify-between ${
                        selectedCategory === cat.id ? 'bg-[#063D30] text-white' : 'hover:bg-[#F8F7F2] text-[#17231E]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="opacity-70">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D30]">Max Price</h4>
                  <span className="text-xs font-bold text-[#063D30]">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="400"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#063D30] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6D746E] mt-1">
                  <span>$20</span>
                  <span>$400+</span>
                </div>
              </div>

              {/* Brands Checkboxes */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D30] mb-3">Brands</h4>
                <div className="space-y-2 text-xs">
                  {BRANDS.map(b => (
                    <label key={b.id} className="flex items-center gap-2 cursor-pointer text-[#17231E]">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b.name)}
                        onChange={() => toggleBrand(b.name)}
                        className="rounded accent-[#063D30] w-4 h-4"
                      />
                      <span>{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D30] mb-3">Minimum Rating</h4>
                <div className="space-y-1.5 text-xs">
                  {[4.5, 4.0, 3.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(minRating === r ? 0 : r)}
                      className={`w-full text-left py-1.5 px-3 rounded-xl transition-colors font-medium flex items-center gap-2 ${
                        minRating === r ? 'bg-[#063D30] text-white' : 'hover:bg-[#F8F7F2] text-[#17231E]'
                      }`}
                    >
                      <span>★ {r} Stars & Above</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="flex items-center justify-between text-xs font-semibold cursor-pointer text-[#17231E]">
                  <span>In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 accent-[#063D30]"
                  />
                </label>

                <label className="flex items-center justify-between text-xs font-semibold cursor-pointer text-[#17231E]">
                  <span>On Sale & Deals</span>
                  <input
                    type="checkbox"
                    checked={onlyDeals}
                    onChange={(e) => setOnlyDeals(e.target.checked)}
                    className="w-4 h-4 accent-[#F0787B]"
                  />
                </label>
              </div>

            </div>
          </div>

          {/* Main Products Grid Column */}
          <div className="lg:col-span-3">

            {/* Sorting Header */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-[#063D30]/10 shadow-sm">
              <span className="text-xs text-[#6D746E] font-medium">
                Showing <strong className="text-[#063D30]">{Math.min(itemsToShow, filteredProducts.length)}</strong> of <strong className="text-[#063D30]">{filteredProducts.length}</strong> products
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6D746E] font-medium hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#F8F7F2] border border-[#063D30]/20 text-xs text-[#063D30] font-semibold py-2 px-3 rounded-full focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#063D30]/10 text-center space-y-4 shadow-sm my-6">
                <div className="w-16 h-16 rounded-full bg-[#EAE6D8] text-[#063D30] flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#17231E]">No matching products found</h3>
                <p className="text-xs text-[#6D746E] max-w-sm mx-auto">
                  We couldn't find any items matching your current filters or search query. Try resetting your filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-[#063D30] text-[#DCE6D2] font-semibold text-xs py-2.5 px-6 rounded-full hover:bg-[#022C23] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.slice(0, itemsToShow).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {itemsToShow < filteredProducts.length && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setItemsToShow(prev => prev + 6)}
                      className="bg-white border border-[#063D30]/20 hover:bg-[#063D30] hover:text-white text-[#063D30] font-bold text-xs py-3.5 px-8 rounded-full transition-all shadow-sm uppercase tracking-wider"
                    >
                      Load More Products ({filteredProducts.length - itemsToShow} Remaining)
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

        </div>

        {/* Mobile Filter Modal Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                  <h3 className="font-serif font-bold text-lg text-[#17231E]">Filters & Sorting</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-[#6D746E] mb-4">Refine catalog products on mobile.</p>
                <button
                  onClick={() => { handleClearFilters(); setMobileFilterOpen(false); }}
                  className="w-full bg-[#063D30] text-[#DCE6D2] py-2.5 rounded-full text-xs font-bold mb-4"
                >
                  Reset All Filters
                </button>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#063D30] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Apply & View ({filteredProducts.length}) Results
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
