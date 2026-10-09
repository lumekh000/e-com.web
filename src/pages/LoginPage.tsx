import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginUser, navigate } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      loginUser(email);
      navigate('account');
    }
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4">

        <div className="bg-white rounded-3xl border border-[#063D30]/10 p-8 shadow-xl text-center">

          <div className="w-12 h-12 rounded-full bg-[#EAE6D8] text-[#063D30] flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#17231E]">
            {isRegister ? 'Create VIVA Account' : 'Welcome Back to VIVA'}
          </h2>
          <p className="text-xs text-[#6D746E] mt-1 mb-6">
            {isRegister ? 'Join our store for order tracking & exclusive perks.' : 'Access your saved addresses, order history, and wishlist.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-[#17231E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Camille Laurent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#17231E] mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="camille@viva.lifestyle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17231E] mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-[#F8F7F2] p-3 rounded-xl border border-gray-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#063D30] hover:bg-[#022C23] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{isRegister ? 'Register Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-[#DCE6D2]" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#6D746E]">
            <span>{isRegister ? 'Already have an account?' : "Don't have an account?"}</span>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#063D30] font-bold hover:underline"
            >
              {isRegister ? 'Sign In' : 'Create One'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
