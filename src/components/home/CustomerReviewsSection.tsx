import React, { useState } from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-20 bg-[#063D30] text-white relative overflow-hidden">

      {/* Subtle Mesh Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCE6D2]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#022C23] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#DCE6D2]/15 border border-[#DCE6D2]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#DCE6D2] uppercase tracking-widest">
            <Quote className="w-3.5 h-3.5 text-[#F0787B]" />
            <span>Real Customer Feedback</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Loved By Thousands
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="flex items-center text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-lg text-white">4.9 / 5.0</span>
            <span className="text-xs text-[#DCE6D2]/80 font-medium">Based on 14,280+ Verified Reviews</span>
          </div>
        </div>

        {/* Reviews Carousel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {REVIEWS.map((rev, idx) => (
            <div
              key={rev.id}
              className={`bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/15 flex flex-col justify-between transition-all duration-300 ${
                idx === activeIndex ? 'ring-2 ring-[#DCE6D2] scale-102 bg-white/15' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <div>
                {/* Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#DCE6D2]/60">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="font-serif font-bold text-base text-white mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                {/* Review Body */}
                <p className="text-xs text-[#DCE6D2]/90 leading-relaxed font-light mb-6">
                  {rev.comment}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#DCE6D2]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-semibold text-xs text-white">{rev.author}</h5>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-medium bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#DCE6D2]/70">Verified Buyer</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Carousel Navigation Dots */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prevReview}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === idx ? 'w-8 bg-[#DCE6D2]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
