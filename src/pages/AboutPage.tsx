import React from 'react';
import { Leaf, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="bg-[#DCE6D2] text-[#063D30] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Our Philosophy & Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#17231E]">
            VIVA — Live Better
          </h1>
          <p className="text-xs sm:text-base text-[#6D746E] max-w-xl mx-auto font-light leading-relaxed">
            Founded on the belief that everyday tools and apparel should bring joy, longevity, and calm into your home.
          </p>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-xl border border-[#063D30]/10">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
            alt="VIVA Living Space"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#063D30]/10 shadow-sm space-y-6 text-xs sm:text-sm text-[#6D746E] leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-[#17231E]">
            Thoughtful Living, Crafted Without Compromise
          </h2>
          <p>
            VIVA was established as an antidote to fast, disposable consumer products. We collaborate directly with boutique workshops, acoustic labs, and organic cosmetic laboratories across Europe and Asia to create products designed to last decades.
          </p>
          <p>
            Whether it is our Normandy French flax linen shirts stone-washed for supreme comfort, or our studio-grade noise cancelling headphones, every single item in our catalog passes rigorous durability and ethical sourcing criteria.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 space-y-2">
            <Leaf className="w-8 h-8 text-[#063D30]" />
            <h3 className="font-serif font-bold text-base text-[#17231E]">100% Sustainable</h3>
            <p className="text-xs text-[#6D746E]">Plastic-free packaging and 100% carbon-neutral shipping on every single package.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 space-y-2">
            <Award className="w-8 h-8 text-[#063D30]" />
            <h3 className="font-serif font-bold text-base text-[#17231E]">Uncompromising Quality</h3>
            <p className="text-xs text-[#6D746E]">Rigorous 50-point quality inspections prior to entering our distribution center.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 space-y-2">
            <Heart className="w-8 h-8 text-[#F0787B]" />
            <h3 className="font-serif font-bold text-base text-[#17231E]">Customer Concierge</h3>
            <p className="text-xs text-[#6D746E]">24/7 dedicated human support, hassle-free 30-day returns, and 2-year warranty.</p>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => navigate('shop')}
            className="bg-[#063D30] text-[#DCE6D2] font-bold text-xs py-4 px-8 rounded-full shadow-lg hover:bg-[#022C23]"
          >
            Explore VIVA Store Catalog
          </button>
        </div>

      </div>
    </div>
  );
};
