import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubscribed(true);
    addToast('Subscribed!', 'Welcome to the VIVA inner circle. Check your inbox for your 10% discount code.');
  };

  return (
    <section className="py-20 bg-[#022C23] text-white relative overflow-hidden border-t border-[#063D30]">

      {/* Decorative Botanical Leaf Accents */}
      <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none">
        <Leaf className="w-full h-full text-[#DCE6D2]" />
      </div>
      <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none rotate-180">
        <Leaf className="w-full h-full text-[#DCE6D2]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Newsletter Icon Header */}
        <div className="w-14 h-14 rounded-full bg-[#063D30] text-[#DCE6D2] border border-[#DCE6D2]/20 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Mail className="w-7 h-7" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          Stay in the Loop
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#DCE6D2]/80 max-w-lg mx-auto font-light leading-relaxed mb-8">
          Join over 45,000 lifestyle enthusiasts. Receive exclusive early access to new seasonal drops, subscriber-only secret sales, and architectural design inspiration.
        </p>

        {/* Form / Success view */}
        {isSubscribed ? (
          <div className="bg-[#063D30] border border-[#DCE6D2]/30 rounded-2xl p-6 max-w-md mx-auto space-y-2 animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-serif font-bold text-lg text-white">You're on the VIVA Guestlist!</h4>
            <p className="text-xs text-[#DCE6D2]/90">
              We've sent a 10% welcome coupon to <strong>{email}</strong>. Check your inbox!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 p-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-2xl">
              <div className="relative flex-1 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter your email address..."
                  className="w-full bg-transparent text-white placeholder-white/60 text-xs py-3 pl-10 pr-4 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-[#DCE6D2] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#DCE6D2] hover:bg-white text-[#063D30] font-bold text-xs py-3 px-7 rounded-full shadow-lg transition-all active:scale-95 shrink-0 uppercase tracking-wider"
              >
                Subscribe
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-300 font-medium text-center">{errorMsg}</p>
            )}
          </form>
        )}

        {/* Privacy Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#DCE6D2]/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>We respect your privacy. Zero spam, unsubscribe anytime in 1 click.</span>
        </div>

      </div>
    </section>
  );
};
