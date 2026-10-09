import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Leaf, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setSelectedCategory } = useStore();

  return (
    <footer className="bg-[#022C23] text-white border-t border-[#063D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#063D30]">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-[#DCE6D2] flex items-center justify-center text-[#063D30] shadow-inner">
                <Leaf className="w-5 h-5 fill-[#063D30]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  VIVA
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-[#DCE6D2]/80 mt-0.5">
                  Live Better
                </span>
              </div>
            </div>

            <p className="text-xs text-[#DCE6D2]/80 leading-relaxed max-w-sm">
              Discover quality products across every category — made for the way you live. Elevated craftsmanship, sustainable materials, and timeless design.
            </p>

            {/* Social Icons (Inline SVGs) */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DCE6D2] hover:text-[#063D30] text-[#DCE6D2] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DCE6D2] hover:text-[#063D30] text-[#DCE6D2] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DCE6D2] hover:text-[#063D30] text-[#DCE6D2] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DCE6D2] hover:text-[#063D30] text-[#DCE6D2] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Categories Column */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#DCE6D2] tracking-wide uppercase">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => { setSelectedCategory('electronics'); navigate('category'); }} className="hover:text-[#DCE6D2] transition-colors">
                  Electronics & Tech
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('fashion'); navigate('category'); }} className="hover:text-[#DCE6D2] transition-colors">
                  French Linen Apparel
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('home-living'); navigate('category'); }} className="hover:text-[#DCE6D2] transition-colors">
                  Home Decor & Living
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('beauty'); navigate('category'); }} className="hover:text-[#DCE6D2] transition-colors">
                  Botanica Beauty Elixirs
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('sports'); navigate('category'); }} className="hover:text-[#DCE6D2] transition-colors">
                  Sports & Travel Gear
                </button>
              </li>
              <li>
                <button onClick={() => navigate('deals')} className="hover:text-[#DCE6D2] transition-colors text-[#F0787B] font-semibold">
                  Deals & Up to 40% Off
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#DCE6D2] tracking-wide uppercase">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => navigate('track-order')} className="hover:text-[#DCE6D2] transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shipping-returns')} className="hover:text-[#DCE6D2] transition-colors">
                  Shipping & Free Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-[#DCE6D2] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#DCE6D2] transition-colors">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={() => navigate('account')} className="hover:text-[#DCE6D2] transition-colors">
                  My Account Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#DCE6D2] tracking-wide uppercase">
              About VIVA
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#DCE6D2] transition-colors">
                  Our Story & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('privacy')} className="hover:text-[#DCE6D2] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('terms')} className="hover:text-[#DCE6D2] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('admin')} className="hover:text-[#F0787B] transition-colors text-white/60">
                  Store Administration
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Currency & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DCE6D2]/60">

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-white">
              <Globe className="w-3.5 h-3.5 text-[#DCE6D2]" />
              <span>United States (USD $)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">VISA</span>
              <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">MC</span>
              <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">AMEX</span>
              <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">APPLE PAY</span>
            </div>
          </div>

          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} VIVA — Live Better Store Inc. All Rights Reserved. Designed for modern living.
          </p>

        </div>

      </div>
    </footer>
  );
};
