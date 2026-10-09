import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { ShippingAddress } from '../types';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    createOrder,
    user,
    navigate
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2]">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold">Your cart is empty</h2>
          <button onClick={() => navigate('shop')} className="mt-4 bg-[#063D30] text-white px-6 py-2 rounded-full text-xs font-semibold">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>(
    user?.addresses[0] || {
      fullName: 'Camille Laurent',
      email: 'camille@viva.lifestyle',
      phone: '+1 (555) 234-8901',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States'
    }
  );

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      createOrder(address, paymentMethod === 'card' ? 'Visa ending in 4242' : paymentMethod === 'apple' ? 'Apple Pay' : 'PayPal');
      setIsSubmitting(false);
      navigate('order-confirmation');
    }, 1000);
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#063D30] bg-[#DCE6D2] px-3 py-1 rounded-full font-semibold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5 text-[#063D30]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E]">
            Secure Order Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Checkout Steps Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step 1: Contact & Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-[#063D30] text-white text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-serif font-bold text-lg text-[#17231E]">Shipping Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#17231E] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17231E] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#17231E] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17231E] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-[#17231E] mb-1">State / Prov</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17231E] mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#063D30]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Speed */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-[#063D30] text-white text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-serif font-bold text-lg text-[#17231E]">Delivery Options</h3>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === 'standard' ? 'border-[#063D30] bg-[#F8F7F2]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#063D30]" />
                    <div>
                      <h4 className="font-semibold text-xs text-[#17231E]">Standard Carbon-Neutral Express</h4>
                      <p className="text-[11px] text-[#6D746E]">3-5 Business Days Delivery</p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-emerald-700">FREE</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === 'express' ? 'border-[#063D30] bg-[#F8F7F2]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#F0787B]" />
                    <div>
                      <h4 className="font-semibold text-xs text-[#17231E]">VIP Overnight Courier</h4>
                      <p className="text-[11px] text-[#6D746E]">Guaranteed 1-2 Business Days</p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#063D30]">$25.00</span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-[#063D30] text-white text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-serif font-bold text-lg text-[#17231E]">Payment Method</h3>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card' ? 'bg-[#063D30] text-white border-[#063D30]' : 'bg-[#F8F7F2] text-[#17231E] border-gray-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'apple' ? 'bg-[#063D30] text-white border-[#063D30]' : 'bg-[#F8F7F2] text-[#17231E] border-gray-200'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-[#17231E] mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#17231E] mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17231E] mb-1">CVC Code</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Order Review & Place Order Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-6 h-fit">
            <h3 className="font-serif font-bold text-lg text-[#17231E] pb-3 border-b border-gray-100">
              Order Review ({cart.length} items)
            </h3>

            {/* Items summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-100">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-[#F2EEE5]" />
                    <div>
                      <h5 className="font-semibold text-[#17231E] line-clamp-1">{item.product.name}</h5>
                      <span className="text-[#6D746E]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#063D30]">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-[#6D746E] pt-3 border-t border-gray-100">
              <div className="flex justify-between"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
              {cartDiscount > 0 && <div className="flex justify-between text-emerald-700 font-semibold"><span>Discount</span><span>-${cartDiscount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span>Shipping</span><span>{cartShippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${cartShippingFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span>Taxes</span><span>${cartTax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg text-[#063D30] pt-3 border-t">
                <span>Total Payable</span>
                <span>${(cartTotal + (deliveryMethod === 'express' ? 25 : 0)).toFixed(2)}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#063D30] hover:bg-[#022C23] text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-xl transition-all text-xs tracking-wider uppercase disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Processing Encrypted Order...</span>
              ) : (
                <>
                  <span>Place Order & Pay — ${(cartTotal + (deliveryMethod === 'express' ? 25 : 0)).toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 text-[#DCE6D2]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#6D746E]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Includes 30-day money back guarantee</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
