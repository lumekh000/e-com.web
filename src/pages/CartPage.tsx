import React from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag, Truck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    navigate
  } = useStore();

  const [couponInput, setCouponInput] = React.useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#17231E]">
              Shopping Cart Review
            </h1>
            <p className="text-xs text-[#6D746E] mt-1">
              Review items, apply coupons, and proceed to secure checkout.
            </p>
          </div>

          <button
            onClick={() => navigate('shop')}
            className="text-xs font-semibold text-[#063D30] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#063D30]/10 text-center space-y-4 shadow-sm">
            <ShoppingBag className="w-12 h-12 text-[#063D30]/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#17231E]">Your Cart is Currently Empty</h3>
            <p className="text-xs text-[#6D746E]">Add items to your cart to begin checkout.</p>
            <button
              onClick={() => navigate('shop')}
              className="bg-[#063D30] text-white font-semibold text-xs py-2.5 px-6 rounded-full"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Cart Table List (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-[#063D30]/10 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-serif font-bold text-base text-[#17231E]">Cart Items ({cart.length})</h3>
                <button onClick={clearCart} className="text-xs text-[#F0787B] font-semibold hover:underline">
                  Clear All Items
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-20 h-20 rounded-xl object-cover bg-[#F2EEE5] shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-[#17231E]">{item.product.name}</h4>
                      <p className="text-xs text-[#6D746E]">{item.product.brand}</p>
                      {item.selectedColor && <span className="text-[11px] text-gray-500 mr-3">Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span className="text-[11px] text-gray-500">Size: {item.selectedSize}</span>}
                    </div>

                    <div className="flex items-center border rounded-full bg-[#F8F7F2]">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-xs"
                      >-</button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-xs"
                      >+</button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-[#063D30]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      className="text-gray-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Panel (4 Cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#063D30]/10 p-6 shadow-sm space-y-4 h-fit">
              <h3 className="font-serif font-bold text-base text-[#17231E] pb-3 border-b border-gray-100">
                Order Summary
              </h3>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-[#F8F7F2] border text-xs p-2.5 rounded-full px-4"
                />
                <button type="submit" className="bg-[#063D30] text-white text-xs font-semibold px-4 rounded-full">
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg">
                  <span>Coupon: {appliedCoupon.code}</span>
                  <button onClick={removeCoupon} className="underline text-xs">Remove</button>
                </div>
              )}

              <div className="space-y-2 text-xs text-[#6D746E]">
                <div className="flex justify-between"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                {cartDiscount > 0 && <div className="flex justify-between text-emerald-700"><span>Discount</span><span>-${cartDiscount.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span>Shipping</span><span>{cartShippingFee === 0 ? 'FREE' : `$${cartShippingFee.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span>Tax (8%)</span><span>${cartTax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-base text-[#063D30] pt-2 border-t">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('checkout')}
                className="w-full bg-[#063D30] hover:bg-[#022C23] text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#DCE6D2]" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
