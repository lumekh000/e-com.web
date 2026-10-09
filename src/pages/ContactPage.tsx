import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast, navigate } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('order');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message Sent', 'Our concierge team will respond within 2 hours.');
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-[#DCE6D2] text-[#063D30] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            24/7 Support Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231E]">
            Contact VIVA Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#6D746E]">
            Have questions about an order, custom sizing, or product specifications? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Contact Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 space-y-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#EAE6D8] text-[#063D30] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#17231E]">Email Support</h4>
                  <p className="text-xs text-[#6D746E]">support@viva.lifestyle</p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Avg. response under 2 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t">
                <div className="w-10 h-10 rounded-full bg-[#EAE6D8] text-[#063D30] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#17231E]">Phone Concierge</h4>
                  <p className="text-xs text-[#6D746E]">+1 (800) 848-2838</p>
                  <span className="text-[10px] text-[#6D746E]">Mon - Sun: 8am - 10pm EST</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t">
                <div className="w-10 h-10 rounded-full bg-[#EAE6D8] text-[#063D30] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#17231E]">Flagship Showroom</h4>
                  <p className="text-xs text-[#6D746E]">742 Evergreen Terrace, San Francisco, CA 94107</p>
                </div>
              </div>
            </div>

            <div className="bg-[#063D30] text-white p-6 rounded-3xl space-y-3">
              <h4 className="font-serif font-bold text-base">Quick FAQ Help</h4>
              <p className="text-xs text-[#DCE6D2]/80">Check our comprehensive FAQ section for instant answers regarding returns, shipping, and coupons.</p>
              <button
                onClick={() => navigate('faq')}
                className="bg-[#DCE6D2] text-[#063D30] font-bold text-xs py-2 px-4 rounded-full"
              >
                View FAQ Portal
              </button>
            </div>
          </div>

          {/* Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#063D30]/10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#17231E]">Message Received!</h3>
                <p className="text-xs text-[#6D746E] max-w-sm mx-auto">
                  Thank you, {name}. A member of our concierge team will reach out to <strong>{email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif font-bold text-xl text-[#17231E]">Send us a message</h3>

                <div>
                  <label className="block font-semibold text-[#17231E] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Camille Laurent"
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17231E] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="camille@viva.lifestyle"
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17231E] mb-1">Inquiry Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none font-semibold text-[#063D30]"
                  >
                    <option value="order">Order Tracking & Status</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="product">Product Advice & Sizing</option>
                    <option value="press">Press & Wholesale</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17231E] mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you today?"
                    className="w-full bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#063D30] hover:bg-[#022C23] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#DCE6D2]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
