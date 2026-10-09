import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartItemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    navigate
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_LIMIT = 150;
  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_LIMIT) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMsg({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponMsg({ type: 'error', text: res.message });
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F7F2] border-l border-[#063D30]/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">

          {/* Header */}
          <div className="p-5 bg-[#063D30] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#DCE6D2]" />
              <h2 className="font-serif font-bold text-lg tracking-wide text-white">Your Shopping Cart</h2>
              <span className="bg-[#DCE6D2] text-[#063D30] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#EBEFEA] p-3.5 px-5 border-b border-[#063D30]/10 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div className="flex items-center gap-2 text-[#17231E]">
                <Truck className="w-4 h-4 text-[#063D30] shrink-0" />
                <span>
                  Add <strong className="text-[#063D30]">${amountNeededForFreeShipping.toFixed(2)}</strong> more for <strong>Free Carbon-Neutral Shipping!</strong>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Congratulations! You unlocked Free Express Shipping!</span>
              </div>
            )}
            <div className="w-full bg-black/10 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-[#063D30] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAE6D8] flex items-center justify-center text-[#063D30]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#17231E]">Your Cart is Empty</h3>
                  <p className="text-xs text-[#6D746E] mt-1 max-w-xs">
                    Explore our curated categories and add premium items to your collection.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('shop');
                  }}
                  className="bg-[#063D30] text-[#DCE6D2] font-semibold text-xs py-2.5 px-6 rounded-full hover:bg-[#022C23] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="bg-white p-3.5 rounded-2xl border border-[#063D30]/10 shadow-sm flex gap-3.5 relative group"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F2EEE5] shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#17231E] line-clamp-2 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-[#6D746E] hover:text-[#F0787B] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex flex-wrap gap-2 text-[10px] text-[#6D746E] mt-1">
                        {item.selectedColor && (
                          <span className="bg-[#F8F7F2] px-2 py-0.5 rounded-md border border-black/5">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-[#F8F7F2] px-2 py-0.5 rounded-md border border-black/5">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="font-bold text-xs text-[#063D30]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center border border-[#063D30]/20 rounded-full bg-[#F8F7F2]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[#063D30] hover:bg-white"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[#063D30] hover:bg-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#063D30]/10 shadow-lg space-y-3">

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon Code (e.g. VIVA10)"
                    className="w-full text-xs bg-[#F8F7F2] border border-[#063D30]/20 rounded-full py-2 pl-8 pr-3 uppercase focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#063D30]/60 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="bg-[#063D30] text-[#DCE6D2] text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#022C23] transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 px-3 rounded-lg border border-emerald-200">
                  <span>Applied: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.description})</span>
                  <button onClick={removeCoupon} className="text-xs underline text-emerald-900">Remove</button>
                </div>
              )}

              {couponMsg && !appliedCoupon && (
                <p className={`text-[11px] ${couponMsg.type === 'error' ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6D746E] pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#17231E]">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{cartShippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${cartShippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#063D30] pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-[#063D30] hover:bg-[#022C23] text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 text-xs tracking-wider uppercase"
              >
                <span>Checkout Now — ${cartTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 text-[#DCE6D2]" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
