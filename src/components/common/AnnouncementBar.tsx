import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#022C23] text-[#DCE6D2] text-xs py-2.5 px-4 font-medium tracking-wide border-b border-[#063D30]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F0787B] animate-pulse" />
          <span>Complimentary Carbon-Neutral Express Shipping on Orders Above $150</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[11px] text-[#DCE6D2]/80">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            <span>30-Day Hassle Free Returns</span>
          </div>
          <span className="text-[#063D30]">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Encrypted & Secure Checkout</span>
          </div>
          <span className="text-[#063D30]">•</span>
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>24/7 Dedicated Concierge</span>
          </div>
        </div>
      </div>
    </div>
  );
};
