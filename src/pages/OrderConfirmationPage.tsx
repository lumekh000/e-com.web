import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Truck } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastPlacedOrder, navigate } = useStore();

  if (!lastPlacedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2]">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold">No order found</h2>
          <button onClick={() => navigate('shop')} className="mt-4 bg-[#063D30] text-white px-6 py-2 rounded-full text-xs font-semibold">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-3xl border border-[#063D30]/10 p-8 sm:p-12 shadow-lg text-center space-y-6">

          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <div>
            <span className="bg-[#DCE6D2] text-[#063D30] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#17231E] mt-2">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#6D746E] mt-1">
              We've sent an order receipt & tracking details to <strong>{lastPlacedOrder.shippingAddress.email}</strong>.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#F8F7F2] p-6 rounded-2xl border border-[#063D30]/10 text-left text-xs space-y-4">
            <div className="flex justify-between border-b pb-3">
              <div>
                <span className="text-[#6D746E]">Order Number:</span>
                <p className="font-bold text-sm text-[#063D30]">{lastPlacedOrder.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[#6D746E]">Tracking Number:</span>
                <p className="font-mono font-semibold text-[#17231E]">{lastPlacedOrder.trackingNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#6D746E] font-semibold">Shipping To:</span>
                <p className="font-medium text-[#17231E]">{lastPlacedOrder.shippingAddress.fullName}</p>
                <p className="text-[#6D746E]">{lastPlacedOrder.shippingAddress.street}</p>
                <p className="text-[#6D746E]">{lastPlacedOrder.shippingAddress.city}, {lastPlacedOrder.shippingAddress.state} {lastPlacedOrder.shippingAddress.zipCode}</p>
              </div>
              <div>
                <span className="text-[#6D746E] font-semibold">Payment Info:</span>
                <p className="font-medium text-[#17231E]">{lastPlacedOrder.paymentMethod}</p>
                <span className="text-[#6D746E] font-semibold mt-2 block">Estimated Delivery:</span>
                <p className="font-bold text-emerald-700">{lastPlacedOrder.estimatedDelivery}</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <span className="font-bold text-[#063D30] block mb-2">Order Items:</span>
              <div className="space-y-2">
                {lastPlacedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span>{item.quantity}x {item.productName}</span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t flex justify-between font-bold text-sm text-[#063D30]">
              <span>Total Paid</span>
              <span>${lastPlacedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('track-order')}
              className="w-full sm:w-auto bg-[#063D30] text-[#DCE6D2] font-semibold text-xs py-3.5 px-8 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#022C23]"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Track Live Order Status</span>
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-white border border-[#063D30]/20 text-[#063D30] font-semibold text-xs py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-[#F8F7F2]"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
