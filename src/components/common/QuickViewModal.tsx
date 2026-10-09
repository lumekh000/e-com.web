import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    navigate
  } = useStore();

  if (!quickViewProduct) return null;

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    quickViewProduct.colors ? quickViewProduct.colors[0] : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    quickViewProduct.sizes ? quickViewProduct.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleClose = () => {
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setSelectedProduct(quickViewProduct);
    setQuickViewProduct(null);
    navigate('product-details');
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#F8F7F2] rounded-3xl max-w-4xl w-full border border-[#063D30]/10 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#063D30] flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Gallery Column */}
          <div className="p-6 bg-[#EAE6D8]/50 flex flex-col justify-between">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white mb-4 shadow-sm relative">
              <img
                src={quickViewProduct.images[selectedImg] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.discountPercentage && (
                <span className="absolute top-3 left-3 bg-[#F0787B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  -{quickViewProduct.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImg === idx ? 'border-[#063D30] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#063D30]/70">{quickViewProduct.brand}</span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17231E] mt-1 mb-2 leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="font-bold text-[#17231E]">{quickViewProduct.rating.toFixed(1)}</span>
                <span className="text-[#6D746E]">({quickViewProduct.reviewCount} customer reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#063D30]">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base text-[#6D746E] line-through font-normal">
                    ${quickViewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6D746E] leading-relaxed mb-6 line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Colors */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#17231E] mb-2">
                    Color: <span className="text-[#063D30] font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selectedColor === color
                            ? 'bg-[#063D30] text-white border-[#063D30] shadow-sm'
                            : 'bg-[#F8F7F2] text-[#17231E] border-[#063D30]/20 hover:border-[#063D30]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#17231E] mb-2">
                    Size: <span className="text-[#063D30] font-normal">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center ${
                          selectedSize === size
                            ? 'bg-[#063D30] text-white border-[#063D30] shadow-sm'
                            : 'bg-[#F8F7F2] text-[#17231E] border-[#063D30]/20 hover:border-[#063D30]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions & Buttons */}
            <div>
              <div className="flex items-center gap-3 mb-4">

                {/* Quantity Controls */}
                <div className="flex items-center border border-[#063D30]/20 rounded-full bg-[#F8F7F2] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#063D30] font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#17231E]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#063D30] font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#063D30] hover:bg-[#022C23] text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 text-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DCE6D2]" />
                  <span>Add to Cart — ${(quickViewProduct.price * quantity).toFixed(2)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-full border transition-all ${
                    isWishlisted
                      ? 'bg-[#F0787B] text-white border-[#F0787B]'
                      : 'border-[#063D30]/20 hover:bg-[#F8F7F2] text-[#063D30]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>

              </div>

              {/* View Full Product link */}
              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs text-[#063D30] font-semibold hover:underline flex items-center justify-center gap-1.5 py-1"
              >
                <span>View Full Specifications & Customer Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
