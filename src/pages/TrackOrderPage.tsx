import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const { orders, searchOrderTracking } = useStore();
  const [query, setQuery] = useState('ORD-89201');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [error, setError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const res = searchOrderTracking(query);
    if (res) {
      setSearchedOrder(res);
      setError(false);
    } else {
      setError(true);
    }
  };

  const steps: { key: OrderStatus; title: string; desc: string }[] = [
    { key: 'placed', title: 'Order Placed', desc: 'Order received and verified' },
    { key: 'processing', title: 'Processing in Fulfillment Center', desc: 'Item packed in eco-friendly wrapping' },
    { key: 'shipped', title: 'Shipped via Express Logistics', desc: 'In transit to distribution hub' },
    { key: 'out_for_delivery', title: 'Out for Local Delivery', desc: 'Courier en route to address' },
    { key: 'delivered', title: 'Delivered', desc: 'Package signed & received' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    const map: Record<OrderStatus, number> = {
      placed: 0,
      processing: 1,
      shipped: 2,
      out_for_delivery: 3,
      delivered: 4,
      cancelled: 0
    };
    return map[status] || 0;
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <span className="bg-[#DCE6D2] text-[#063D30] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Real-Time Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E] mt-2">
            Track Order & Shipment Status
          </h1>
          <p className="text-xs sm:text-sm text-[#6D746E] mt-1 max-w-md mx-auto">
            Enter your Order ID (e.g. ORD-89201) or Tracking Number to inspect your delivery timeline.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-10 max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. ORD-89201) or TRK-..."
              className="w-full bg-white text-[#17231E] text-xs p-3.5 pl-10 rounded-full border border-[#063D30]/20 focus:outline-none shadow-sm font-mono"
            />
            <Search className="w-4 h-4 text-[#063D30] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="bg-[#063D30] text-[#DCE6D2] font-semibold text-xs py-3.5 px-6 rounded-full hover:bg-[#022C23] shadow-md"
          >
            Track Order
          </button>
        </form>

        {error && (
          <div className="bg-rose-50 text-rose-800 p-4 rounded-2xl text-xs text-center font-medium max-w-md mx-auto mb-8 border border-rose-200">
            No order found matching "{query}". Try demo order ID <strong>ORD-89201</strong> or <strong>ORD-89144</strong>.
          </div>
        )}

        {searchedOrder && (
          <div className="bg-white rounded-3xl border border-[#063D30]/10 p-6 sm:p-10 shadow-lg space-y-8">

            {/* Status Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="text-xs text-[#6D746E]">Order Reference</span>
                <h3 className="font-serif font-bold text-2xl text-[#063D30]">{searchedOrder.id}</h3>
                <span className="text-xs text-[#6D746E]">Tracking #: <strong>{searchedOrder.trackingNumber}</strong></span>
              </div>
              <div className="text-left sm:text-right">
                <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full uppercase text-xs">
                  {searchedOrder.status.replace('_', ' ')}
                </span>
                <p className="text-xs text-[#6D746E] mt-1">Estimated Delivery: <strong>{searchedOrder.estimatedDelivery}</strong></p>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div className="py-6 space-y-8">
              <h4 className="font-serif font-bold text-base text-[#17231E]">Shipment Journey Timeline</h4>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.key} className="relative flex items-start gap-4">
                      {/* Step Circle Icon */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center -ml-6 relative z-10 font-bold text-[10px] ${
                        isCompleted ? 'bg-[#063D30] text-[#DCE6D2] shadow-md' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#DCE6D2]" /> : idx + 1}
                      </div>

                      <div className="flex-1">
                        <h5 className={`font-semibold text-xs ${isCurrent ? 'text-[#063D30] font-bold text-sm' : 'text-[#17231E]'}`}>
                          {step.title}
                        </h5>
                        <p className="text-xs text-[#6D746E] mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination Card */}
            <div className="bg-[#F8F7F2] p-5 rounded-2xl border border-[#063D30]/10 flex items-center gap-4 text-xs">
              <div className="w-10 h-10 rounded-full bg-[#EAE6D8] text-[#063D30] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#17231E]">Destination Address:</span>
                <p className="text-[#6D746E]">
                  {searchedOrder.shippingAddress.fullName} — {searchedOrder.shippingAddress.street}, {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.zipCode}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
