import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      q: 'What is your shipping policy and delivery timeframes?',
      a: 'We offer complimentary express shipping on all orders over $150. Standard shipping takes 3-5 business days within the United States. VIP Overnight delivery is available at checkout for urgent orders.'
    },
    {
      q: 'What is your 30-day return policy?',
      a: 'If you are not completely satisfied with your purchase, you may return unwashed and unused items in original packaging within 30 days for a full refund or exchange.'
    },
    {
      q: 'Are all products 100% authentic and ethically sourced?',
      a: 'Yes. Every item in the VIVA store is produced in partnership with certified ethical workshops, organic laboratories, and sustainable textile weavers.'
    },
    {
      q: 'How do I apply coupon codes to my order?',
      a: 'You can enter coupon codes (such as VIVA10 or WELCOME20) inside the cart slide-out drawer or during final step checkout. Discounts update immediately.'
    },
    {
      q: 'How do I track my shipment after placing an order?',
      a: 'Once your order ships, you will receive an email with a tracking link. You can also track your package anytime on our Track Order page using your Order ID.'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="text-center space-y-2">
          <span className="bg-[#DCE6D2] text-[#063D30] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Help Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E]">
            Frequently Asked Questions
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQ topics..."
            className="w-full bg-white p-3.5 pl-10 rounded-full border border-[#063D30]/20 text-xs focus:outline-none shadow-sm"
          />
          <Search className="w-4 h-4 text-[#063D30] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-[#063D30]/10 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-sm text-[#17231E] flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#063D30] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#6D746E] leading-relaxed border-t border-gray-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
