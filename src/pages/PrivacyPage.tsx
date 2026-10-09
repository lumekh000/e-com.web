import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-4 text-xs text-[#6D746E] leading-relaxed">
        <h1 className="font-serif text-3xl font-bold text-[#17231E]">Privacy Policy</h1>
        <p>Your privacy is important to VIVA. We do not sell your personal data to third parties. All personal and transaction details are protected under 256-bit SSL encryption.</p>
        <p>We collect name, email, and shipping information strictly to process orders and improve store customer service.</p>
      </div>
    </div>
  );
};
