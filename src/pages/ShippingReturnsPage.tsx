import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-6 text-xs text-[#6D746E] leading-relaxed">
        <h1 className="font-serif text-3xl font-bold text-[#17231E]">Shipping & Return Policy</h1>

        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#063D30] flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#063D30]" />
            <span>Shipping Destinations & Times</span>
          </h3>
          <p>
            We ship to all 50 US States and over 80 international countries. All orders over $150 qualify for complimentary carbon-neutral shipping. Orders are packed and dispatched within 24 hours of receipt.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-serif font-bold text-lg text-[#063D30] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#063D30]" />
            <span>30-Day Money Back Guarantee</span>
          </h3>
          <p>
            You may return any unused item in its original condition within 30 days of delivery. Returns are free of charge within the US. Simply contact our support concierge to receive a prepaid shipping label.
          </p>
        </div>
      </div>
    </div>
  );
};
