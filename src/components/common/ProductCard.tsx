import React from 'react';
import type { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setSelectedProduct,
    navigate
  } = useStore();

  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    navigate('product-details');
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-[#063D30]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

      {/* Image Container */}
      <div className="relative aspect-square w-full bg-[#F2EEE5] overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage && (
            <span className="bg-[#F0787B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase">
              -{product.discountPercentage}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#063D30] text-[#DCE6D2] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase">
              NEW ARRIVAL
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 shadow-md ${
            isWishlisted
              ? 'bg-[#F0787B] text-white scale-105'
              : 'bg-white/90 text-[#063D30] hover:bg-white hover:scale-110'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full bg-white/95 hover:bg-white text-[#063D30] text-xs font-semibold py-2 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">

        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-[11px] text-[#6D746E] mb-1">
            <span className="uppercase font-semibold tracking-wider text-[#063D30]/70">{product.brand}</span>
            <span>{product.categoryName}</span>
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="font-semibold text-sm text-[#17231E] group-hover:text-[#063D30] transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-semibold text-[#17231E]">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#6D746E]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-3 border-t border-[#063D30]/5 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base text-[#063D30]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#6D746E] line-through font-normal">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.inStock ? (
              <span className="text-[10px] text-emerald-700 font-medium">In Stock</span>
            ) : (
              <span className="text-[10px] text-rose-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="bg-[#063D30] hover:bg-[#022C23] text-white p-2.5 rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group/btn shadow-md flex items-center justify-center"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#DCE6D2] group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};
