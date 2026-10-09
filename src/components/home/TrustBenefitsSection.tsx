import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';

export const TrustBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Carbon-Neutral Shipping',
      description: 'Complimentary express delivery on all US & global orders over $150.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Hassle-Free Returns',
      description: 'Not quite right? Return or exchange seamlessly within 30 days.'
    },
    {
      icon: ShieldCheck,
      title: '100% Encrypted Payments',
      description: 'Bank-level 256-bit SSL encryption & instant PCI-compliant checkout.'
    },
    {
      icon: Headset,
      title: '24/7 Dedicated Support',
      description: 'Our expert customer concierge team is here for you around the clock.'
    }
  ];

  return (
    <section className="py-14 bg-[#F8F7F2] border-b border-[#063D30]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-[#063D30]/5 hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EAE6D8] text-[#063D30] flex items-center justify-center shrink-0 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#17231E]">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#6D746E] mt-1 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
