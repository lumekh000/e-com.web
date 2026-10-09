import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { REVIEWS } from '../data/reviews';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2]">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold">No product selected</h2>
          <button onClick={() => navigate('shop')} className="mt-4 bg-[#063D30] text-white px-6 py-2 rounded-full text-xs font-semibold">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedProduct.colors ? selectedProduct.colors[0] : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    selectedProduct.sizes ? selectedProduct.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  // New review state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isWishlisted = isInWishlist(selectedProduct.id);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    navigate('checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    setReviewSubmitted(true);
  };

  // Related products under same category
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#6D746E]">
          <button onClick={() => navigate('shop')} className="hover:text-[#063D30] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Shop</span>
          </button>
          <span>/</span>
          <span>{selectedProduct.categoryName}</span>
          <span>/</span>
          <span className="text-[#063D30] font-semibold truncate max-w-xs">{selectedProduct.name}</span>
        </div>

        {/* Product Hero Section (Image Gallery + Buy Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-[#063D30]/10 shadow-sm mb-12">

          {/* Gallery Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#F2EEE5] relative mb-4 shadow-sm">
              <img
                src={selectedProduct.images[selectedImg] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {selectedProduct.discountPercentage && (
                <span className="absolute top-4 left-4 bg-[#F0787B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase">
                  -{selectedProduct.discountPercentage}% OFF
                </span>
              )}
              {selectedProduct.isNewArrival && (
                <span className="absolute top-4 right-4 bg-[#063D30] text-[#DCE6D2] text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase">
                  New Arrival
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImg === idx ? 'border-[#063D30] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase Panel Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6D746E] mb-2">
                <span className="uppercase font-bold tracking-widest text-[#063D30]">{selectedProduct.brand}</span>
                <span>SKU: VIVA-{selectedProduct.id.toUpperCase()}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17231E] leading-tight mb-3">
                {selectedProduct.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-4 text-xs">
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="font-bold text-[#17231E]">{selectedProduct.rating.toFixed(1)}</span>
                <span className="text-[#6D746E]">({selectedProduct.reviewCount} customer reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6 p-3 bg-[#F8F7F2] rounded-2xl border border-[#063D30]/10">
                <span className="text-3xl font-bold text-[#063D30]">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-base text-[#6D746E] line-through">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                {selectedProduct.discountPercentage && (
                  <span className="text-xs font-bold text-[#F0787B] ml-auto">
                    Save ${(selectedProduct.originalPrice! - selectedProduct.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Colors */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#17231E] mb-2">
                    Select Color: <span className="text-[#063D30] font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                          selectedColor === color
                            ? 'bg-[#063D30] text-white border-[#063D30] shadow-sm'
                            : 'bg-[#F8F7F2] text-[#17231E] border-gray-200 hover:border-[#063D30]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#17231E] mb-2">
                    Select Size: <span className="text-[#063D30] font-normal">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center ${
                          selectedSize === size
                            ? 'bg-[#063D30] text-white border-[#063D30] shadow-sm'
                            : 'bg-[#F8F7F2] text-[#17231E] border-gray-200 hover:border-[#063D30]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#17231E] mb-2">Quantity:</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#063D30]/20 rounded-full bg-[#F8F7F2] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white text-[#063D30] font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white text-[#063D30] font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    In Stock ({selectedProduct.stockCount} units available)
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(selectedProduct, quantity, selectedColor, selectedSize)}
                  className="flex-1 bg-[#063D30] hover:bg-[#022C23] text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 text-xs tracking-wider uppercase"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DCE6D2]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-4 rounded-full border transition-all ${
                    isWishlisted ? 'bg-[#F0787B] text-white border-[#F0787B]' : 'border-gray-200 hover:bg-[#F8F7F2] text-[#063D30]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#DCE6D2] hover:bg-white text-[#063D30] font-bold py-3.5 px-6 rounded-full border border-[#063D30]/20 shadow-md transition-all text-xs tracking-wider uppercase"
              >
                Instant Buy Now
              </button>

              {/* Delivery info strip */}
              <div className="pt-4 space-y-2 text-xs text-[#6D746E]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#063D30]" />
                  <span>Estimated Delivery: <strong>3 - 5 Business Days</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#063D30]" />
                  <span>Free 30-Day Returns & Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#063D30]" />
                  <span>2-Year Manufacturer Warranty Included</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-3xl border border-[#063D30]/10 p-6 sm:p-10 shadow-sm mb-16">
          <div className="flex border-b border-gray-100 gap-8 text-sm font-serif font-bold mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'description' ? 'border-[#063D30] text-[#063D30]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'specs' ? 'border-[#063D30] text-[#063D30]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'reviews' ? 'border-[#063D30] text-[#063D30]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Customer Reviews ({selectedProduct.reviewCount})
            </button>
          </div>

          {/* Tab 1: Description & Features */}
          {activeTab === 'description' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#6D746E] leading-relaxed">
              <p className="text-[#17231E] font-serif text-lg leading-snug">
                {selectedProduct.description}
              </p>
              <h4 className="font-bold text-[#063D30] uppercase text-xs tracking-wider">Key Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProduct.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#F8F7F2] p-3 rounded-2xl border border-[#063D30]/10 text-xs text-[#17231E]">
                    <CheckCircle2 className="w-4 h-4 text-[#063D30] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab 2: Specifications Table */}
          {activeTab === 'specs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-[#F8F7F2]' : 'bg-white'}>
                      <td className="p-3.5 font-bold text-[#063D30] w-1/3 border-b border-gray-100">{key}</td>
                      <td className="p-3.5 text-[#17231E] border-b border-gray-100">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REVIEWS.map(rev => (
                  <div key={rev.id} className="p-5 bg-[#F8F7F2] rounded-2xl border border-[#063D30]/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#6D746E]">{rev.date}</span>
                    </div>
                    <h5 className="font-bold text-xs text-[#17231E] mb-1">{rev.title}</h5>
                    <p className="text-xs text-[#6D746E] leading-relaxed mb-3">{rev.comment}</p>
                    <span className="text-[11px] font-semibold text-[#063D30]">— {rev.author}</span>
                  </div>
                ))}
              </div>

              {/* Submit a Review Form */}
              <div className="pt-6 border-t border-gray-100 max-w-xl">
                <h4 className="font-serif font-bold text-base text-[#17231E] mb-4">Write a Verified Review</h4>
                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-semibold">
                    Thank you! Your review has been submitted and is pending verification.
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="text-xs bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Review Headline"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        className="text-xs bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Share details of your experience with this product..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows={3}
                      className="w-full text-xs bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#063D30] text-white font-bold text-xs py-2.5 px-6 rounded-full hover:bg-[#022C23]"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Carousel/Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#17231E] mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
