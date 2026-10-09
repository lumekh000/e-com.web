import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { TopPicksSection } from '../components/home/TopPicksSection';
import { PromoBannersSection } from '../components/home/PromoBannersSection';
import { CustomerReviewsSection } from '../components/home/CustomerReviewsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { TrustBenefitsSection } from '../components/home/TrustBenefitsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroBanner />
      <ShopByCategory />
      <TopPicksSection />
      <PromoBannersSection />
      <CustomerReviewsSection />
      <TrustBenefitsSection />
      <NewsletterSection />
    </div>
  );
};
