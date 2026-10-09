import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { navigate } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#063D30] text-white pt-10 pb-16 md:py-24">
      {/* Background Subtle Gradient & Mesh Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#022C23] via-[#063D30] to-[#022C23] opacity-90" />

      {/* Decorative Botanical Ambient Shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#DCE6D2]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#022C23] blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 bg-[#DCE6D2]/15 border border-[#DCE6D2]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DCE6D2] tracking-wider uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F0787B] animate-pulse" />
              <span>Autumn Collection 2026 — Up to 40% Off</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Elevate Your <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#DCE6D2]">Everyday Living</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#DCE6D2]/90 font-sans max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover curated quality products across electronics, fashion, home decor, skincare, and travel — meticulously made for the way you live.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">

              {/* Primary Island Button */}
              <button
                onClick={() => navigate('shop')}
                className="w-full sm:w-auto bg-[#DCE6D2] hover:bg-white text-[#063D30] font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 shadow-xl transition-all duration-300 hover:scale-105 active:scale-98 group text-sm tracking-wider uppercase"
              >
                <span>Shop Collection</span>
                <div className="w-7 h-7 rounded-full bg-[#063D30] text-[#DCE6D2] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => navigate('deals')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-7 rounded-full border border-white/20 transition-all text-sm backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>Explore Deals</span>
                <span className="bg-[#F0787B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  SAVE 40%
                </span>
              </button>

            </div>

            {/* Trust Indicators Strip */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-xs text-[#DCE6D2]/90 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif font-bold text-lg text-white">4.9 / 5.0</span>
                <div className="flex items-center text-amber-400 gap-0.5 my-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <span className="text-[10px] opacity-80">14k+ Reviews</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif font-bold text-lg text-white">100%</span>
                <span className="font-medium text-white/90">Sustainable</span>
                <span className="text-[10px] opacity-80">Ethical Sourcing</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif font-bold text-lg text-white">Express</span>
                <span className="font-medium text-white/90">Free Delivery</span>
                <span className="text-[10px] opacity-80">Orders Over $150</span>
              </div>
            </div>

          </div>

          {/* Visual Editorial Composition Column (Double-Bezel Card) */}
          <div className="lg:col-span-5 relative">

            {/* Outer Shell Double Bezel */}
            <div className="relative rounded-[2.5rem] bg-white/10 p-3 border border-white/20 shadow-2xl backdrop-blur-md">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-[#EAE6D8]">

                {/* Hero Composite Lifestyle Image */}
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
                  alt="VIVA Lifestyle Showcase"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                />

                {/* Floating Product Callout Pill 1: Headphones */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3 animate-subtle-pulse max-w-[200px]">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                    alt="Headphones"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-[11px] font-bold text-[#17231E] truncate">Lumina ANC Audio</h4>
                    <span className="text-[10px] font-bold text-[#063D30]">$249.00</span>
                  </div>
                </div>

                {/* Floating Product Callout Pill 2: Skincare */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3 max-w-[210px]">
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80"
                    alt="Serum"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-[11px] font-bold text-[#17231E] truncate">Botanica Elixir</h4>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-[#063D30]">$34.00</span>
                      <span className="text-[9px] text-[#F0787B] font-bold">-24%</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
