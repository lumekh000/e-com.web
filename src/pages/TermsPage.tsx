import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-4 text-xs text-[#6D746E] leading-relaxed">
        <h1 className="font-serif text-3xl font-bold text-[#17231E]">Terms & Conditions</h1>
        <p>By accessing the VIVA store, you agree to comply with our store policies and guidelines.</p>
        <p>Prices and product availability are subject to change. Promotional coupons cannot be combined unless explicitly stated.</p>
      </div>
    </div>
  );
};
