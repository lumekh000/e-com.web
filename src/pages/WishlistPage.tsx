import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigate } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#17231E]">
              Your Saved Wishlist
            </h1>
            <p className="text-xs text-[#6D746E] mt-1">
              You have {wishlistedProducts.length} items saved for future purchase.
            </p>
          </div>

          <button
            onClick={() => navigate('shop')}
            className="text-xs font-semibold text-[#063D30] hover:underline flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#063D30]/10 text-center space-y-4 shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-[#EAE6D8] text-[#F0787B] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-[#F0787B]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17231E]">Your wishlist is currently empty</h3>
            <p className="text-xs text-[#6D746E] max-w-sm mx-auto">
              Click the heart icon on any product card or quick view modal to save your favorite items.
            </p>
            <button
              onClick={() => navigate('shop')}
              className="bg-[#063D30] text-white font-semibold text-xs py-2.5 px-6 rounded-full hover:bg-[#022C23]"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
